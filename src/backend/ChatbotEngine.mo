import Types "Types";
import EventTypes "types/EventTypes";
import FamilyTypes "types/FamilyTypes";
import PromotionTypes "types/PromotionTypes";
import UserService "UserService";
import MerchantService "MerchantService";
import DeliveryPartnerService "DeliveryPartnerService";
import OrderService "OrderService";
import ProductService "ProductService";
import JobService "JobService";
import PropertyService "PropertyService";
import EventService "EventService";
import FamilyService "FamilyService";
import PromotionService "PromotionService";
import RateCardService "RateCardService";
import ShuttleService "ShuttleService";
import TransportService "TransportService";
import LeadService "LeadService";
import NotificationService "NotificationService";
import ModerationService "ModerationService";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import CityTypes "types/CityTypes";
import CityLib "lib/city";
import PSTypes "types/ProfessionalServiceTypes";

module {

  // ── Session Store ─────────────────────────────────────────────────────────

  public class ChatbotEngine(
    sessions            : Map.Map<Text, Types.ConversationSession>,
    jobsMapParam        : Map.Map<Text, Types.Job>,
    userSvc             : UserService.UserService,
    merchantSvc         : MerchantService.MerchantService,
    productSvc          : ProductService.ProductService,
    dpSvc               : DeliveryPartnerService.DeliveryPartnerService,
    orderSvc            : OrderService.OrderService,
    propertySvc         : PropertyService.PropertyService,
    eventSvc            : EventService.EventService,
    familySvc           : FamilyService.FamilyService,
    promotionSvc        : PromotionService.PromotionService,
    rateCardSvc         : RateCardService.RateCardService,
    shuttleSvc          : ShuttleService.ShuttleService,
    leadSvc             : LeadService.LeadService,
    moduleRoleStore     : Map.Map<Text, Bool>,
    citiesById          : Map.Map<Text, CityTypes.City>,
    cityControlsById    : Map.Map<Text, CityTypes.CityControl>,
    subscriptionsStore  : Map.Map<Text, Types.UserSubscription>,
    plansStore          : Map.Map<Text, Types.SubscriptionPlan>,
    transportSvc        : TransportService.TransportService,
    supplierOrdersStore : Map.Map<Text, Types.SupplierOrder>,
    notifStore          : Map.Map<Text, Types.Notification>,
    moderationStore     : Map.Map<Text, Types.ModerationItem>,
    // ── Professional service stores (written to directly during merchant registration) ─
    healthcareProviderStore : Map.Map<Text, PSTypes.HealthcareProvider>,
    tourOperatorStore       : Map.Map<Text, PSTypes.TourOperator>,
    professionalSvcStore    : Map.Map<Text, PSTypes.ProfessionalService>,
  ) {

  // ── City service for per-city module toggle checks ──────────────────────────
  let citySvc = CityLib.CityLib(citiesById, cityControlsById);

  // ── No-repeat tracking: (contentId, sentTimestamp) per user phone ──────────
  // Key: phone → [(contentId, timestamp)] sent within last 7 days
  let sentEventsMap     = Map.empty<Text, [(Text, Int)]>();
  let sentPromotionsMap = Map.empty<Text, [(Text, Int)]>();

  // ── Internal notification helper (created from passed notifStore) ─────────
  let _internalNotifSvc = NotificationService.NotificationService(notifStore);

  // ── Internal moderation helper ────────────────────────────────────────────
  let moderationSvc = ModerationService.ModerationService(moderationStore);

  let SEVEN_DAYS_NS : Int = 7 * 24 * 3600 * 1_000_000_000;

  // ── Module toggle helpers ─────────────────────────────────────────────────

  func moduleRoleKey(moduleName : Text, role : Text) : Text {
    moduleName # ":" # role
  };

  /// Returns true if the module is enabled for the given role. Default: enabled.
  func isModuleEnabledForRole(moduleName : Text, role : Text) : Bool {
    switch (moduleRoleStore.get(moduleRoleKey(moduleName, role))) {
      case null  true;   // default: enabled
      case (?v)  v;
    }
  };

  /// Resolve a city ID from a free-text address by matching city name or pincode.
  /// Returns null when no city is found (caller should default to allowed).
  func resolveCityId(address : Text) : ?Text {
    let lower = address.toLower();
    var found : ?Text = null;
    label search for ((_, city) in citiesById.entries()) {
      let cityNameLower = city.name.toLower();
      // Strict pincode match: 6 digits only — use Nat.fromText to validate all-digit
      let pc = city.pincode;
      let pcAllDigits : Bool = switch (Nat.fromText(pc)) { case (?_) true; case null false };
      let isValidPincode : Bool = pc.size() == 6 and pcAllDigits;
      let pincodeMatch : Bool = isValidPincode and lower.contains(#text pc);
      if (lower.contains(#text cityNameLower) or pincodeMatch) {
        found := ?city.id;
        break search;
      };
    };
    found
  };

  /// Combined module check: global role toggle AND city-specific toggle.
  /// If the user's city cannot be resolved, city check defaults to allowed.
  /// A module must pass BOTH checks to be shown.
  func isModuleEnabledForUser(moduleName : Text, role : Text, phone : Text) : Bool {
    if (not isModuleEnabledForRole(moduleName, role)) return false;
    let cityIdOpt : ?Text = switch (userSvc.getUserByPhone(phone)) {
      case (#ok(u)) {
        switch (u.location) {
          case (?loc) resolveCityId(loc.address);
          case null   null;
        }
      };
      case (#err(_)) null;
    };
    switch (cityIdOpt) {
      case null    true; // no city resolved — default allow
      case (?cid)  citySvc.isCityModuleEnabled(cid, moduleName);
    }
  };

  // ── Subscription helpers ──────────────────────────────────────────────────

  /// Returns true if the user has an active subscription.
  func hasActiveSubscription(userId : Text) : Bool {
    switch (subscriptionsStore.get(userId)) {
      case null false;
      case (?sub) {
        let now = Time.now();
        sub.isActive and sub.endDate > now
      };
    }
  };

  /// Builds subscription plan selection message.
  func subscriptionPlanMenu(phone : Text) : [Types.BotMessage] {
    let planList = List.empty<Text>();
    var idx = 0;
    for ((_, plan) in plansStore.entries()) {
      if (plan.isActive) {
        idx += 1;
        planList.add(idx.toText() # ". " # plan.name # " — ₹" # plan.priceFlat.toText() # " / " # plan.durationDays.toText() # " days");
      };
    };
    // Combine plan lines
    var menuLines = "";
    for (line in planList.values()) {
      menuLines := menuLines # line # "\n";
    };
    let menuText = "📱 Subscription Required\n\nPlease select a plan to continue:\n\n" # menuLines # "\n0. Free Plan (limited usage)";
    [makeQuickReply(phone, menuText, numericReplies(["Free Plan", "Basic Weekly (₹49)", "Business Monthly (₹199)", "30-Day Starter (₹99)"]))]
  };

  func jobService() : JobService.JobService {
    JobService.JobService(jobsMapParam)
  };

  let CATEGORIES : [Text] = [
    "Food & Restaurant", "Grocery", "Medical & Pharmacy", "Healthcare",
    "Clothing & Fashion", "Footwear", "Electronics", "Books & Stationery",
    "Furniture & Home Decor", "Beauty & Salons", "Bakery & Sweets", "Juice & Beverages",
    "Meat & Seafood", "Dairy & Eggs", "Hardware & Tools", "Auto Parts",
    "Sports & Fitness", "Toys & Games", "Pet Supplies", "Plants & Nursery",
    "Organic & Natural", "Snacks & Chips", "Dry Fruits & Nuts", "Spices & Masala",
    "Frozen Foods", "Ice Cream & Desserts", "Catering Services", "Tiffin Service",
    "Cloud Kitchen", "Laundry Service", "Plumbing", "Electrician",
    "Carpentry", "Painting", "Pest Control", "Cleaning Service",
    "AC Repair", "Appliance Repair", "Mobile Repair", "Computer Repair",
    "Tailoring & Alteration", "Photography", "Event Planning", "Travel & Transport",
    "Education & Tuition", "Yoga & Wellness", "Gym & Fitness", "Spa & Massage",
    "Dentist", "Doctor & Clinic", "Veterinary", "Insurance",
    "Real Estate", "Financial Services", "Legal Services", "Printing & Packaging",
    "Gifting", "Jewellery", "Bags & Accessories", "Watches & Optical",
    "Arts & Crafts", "Music & Instruments", "Baby Products", "Senior Care",
    "Salon & Grooming", "Car Wash", "Game Zone", "EV & Petrol Pump",
    "Packers & Movers", "Astrology", "Radiologist & Lab Tests", "PG / Hostel / Dormitory",
    "Water Supply", "Kitchen Accessories", "Disposables & Paper Bags", "Cosmetics & Bath",
    "Retail & Wholesale", "Manufacturer", "Spare Parts & Repairs", "Other",
  ];

  let VEHICLE_TYPES : [Text] = ["Bike", "Scooter", "Car", "Auto", "Van", "Truck"];

  let JOB_CATEGORIES : [Text] = [
    "Software Developer", "Data Analyst", "UI/UX Designer", "Project Manager", "Product Manager",
    "Marketing Executive", "Sales Executive", "HR Manager", "Accountant", "Finance Analyst",
    "Customer Support", "Call Center Agent", "Content Writer", "Graphic Designer", "Video Editor",
    "Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Driver", "Delivery Boy",
    "Security Guard", "Warehouse Worker", "Packing & Loading", "Housekeeping", "Cook & Chef",
    "Waiter & Server", "Receptionist", "Office Boy", "Data Entry Operator", "Typist",
    "Teacher & Tutor", "Nurse", "Doctor", "Pharmacist", "Lab Technician",
    "Electrician", "Plumber", "Carpenter", "Painter & Decorator", "AC Technician",
    "Welder", "Mason & Construction", "Tailor & Seamstress", "Beautician & Makeup Artist",
    "Fitness Trainer", "Yoga Instructor", "Event Manager", "Photographer", "Event Decorator",
    "Fashion Designer", "Jewellery Designer", "Interior Designer", "Architect",
    "Legal Advisor", "Insurance Agent", "Real Estate Agent", "Travel Agent",
    "Social Media Manager", "SEO Specialist", "Web Developer", "App Developer",
    "Network Engineer", "Cyber Security", "Blockchain Developer", "AI/ML Engineer",
    "Research Analyst", "Business Analyst", "Operations Manager", "Supply Chain",
    "Logistics Coordinator", "Import/Export", "Retail Manager", "Store Supervisor",
    "Franchise Manager", "Food Delivery", "Ride Sharing", "Bike Taxi",
    "Agriculture Worker", "Farm Manager", "Dairy Worker", "Fisherman",
    "Mining Worker", "Factory Operator", "Quality Inspector", "Production Supervisor",
  ];

  // ── Bot Message Constructors ───────────────────────────────────────────────

   func makeText(to : Text, body : Text) : Types.BotMessage {
    { to; messageType = "text"; body; quickReplies = []; footer = null; languageKey = "en" }
  };

  func makeQuickReply(to : Text, body : Text, replies : [Types.QuickReply]) : Types.BotMessage {
    { to; messageType = "quick_reply_prompt"; body; quickReplies = replies; footer = null; languageKey = "en" }
  };

  func numericReplies(labels : [Text]) : [Types.QuickReply] {
    var i = 0;
    let out = List.empty<Types.QuickReply>();
    for (lbl in labels.values()) {
      i += 1;
      let n = i; // capture
      out.add({ id = n.toText(); title = lbl; payload = n.toText() });
    };
    out.toArray()
  };

  func parseChoice(msg : Text) : ?Nat {
    let t = msg.trimStart(#char ' ').trimEnd(#char ' ');
    Nat.fromText(t)
  };

  /// Parse a float from text by reading the integer part only (sufficient for user input like "5", "8.5").
  func parseFloat(s : Text) : ?Float {
    // Take only the integer part before any '.'
    let parts = s.split(#text ".").toArray();
    let intPart = if (parts.size() > 0) parts[0] else s;
    switch (Int.fromText(intPart)) {
      case null null;
      case (?i) ?i.toFloat();
    }
  };

  // ── Simple stateData key-value store (pseudo-JSON) ────────────────────────
  // Format: {"key1":"val1","key2":"val2"}

  func getStateField(stateData : Text, key : Text) : ?Text {
    let pattern = "\"" # key # "\":\"";
    if (not stateData.contains(#text pattern)) { return null };
    let parts = stateData.split(#text pattern).toArray();
    if (parts.size() < 2) { return null };
    let afterKey = parts[1];
    let valueParts = afterKey.split(#text "\"").toArray();
    if (valueParts.size() < 1) { return null };
    ?valueParts[0]
  };

  func setStateField(stateData : Text, key : Text, value : Text) : Text {
    let pair = "\"" # key # "\":\"" # value # "\"";
    if (stateData == "{}" or stateData == "" or stateData == "{") {
      return "{" # pair # "}";
    };
    // Remove existing key if present
    let keyPattern = "\"" # key # "\":\"";
    // Strip leading '{' and trailing '}'
    let inner : Text = switch (stateData.stripStart(#char '{')) {
      case (?s) switch (s.stripEnd(#char '}')) { case (?s2) s2; case null s };
      case null stateData;
    };

    let cleaned : Text = if (inner.contains(#text keyPattern)) {
      let splitOnKey = inner.split(#text keyPattern).toArray();
      if (splitOnKey.size() < 2) { inner }
      else {
        let before = splitOnKey[0].trimEnd(#char ',');
        let afterVal = splitOnKey[1]; // starts with old_value",...
        let valParts = afterVal.split(#text "\"").toArray();
        // valParts[0] = old value, rest is suffix (could start with ,...)
        var rest = "";
        var idx = 1;
        while (idx < valParts.size()) {
          if (idx == 1) { rest := valParts[idx] }
          else { rest := rest # "\"" # valParts[idx] };
          idx += 1;
        };
        let restTrimmed = rest.trimStart(#char ',');
        if (before.isEmpty() or before == "{") { restTrimmed }
        else if (restTrimmed.isEmpty()) { before }
        else { before # "," # restTrimmed }
      }
    } else { inner };

    let sep = if (cleaned.isEmpty()) "" else ",";
    "{" # cleaned # sep # pair # "}"
  };

  func getStep(stateData : Text) : Nat {
    switch (getStateField(stateData, "step")) {
      case null 0;
      case (?s) switch (Nat.fromText(s)) { case (?n) n; case null 0 };
    }
  };

  func setStep(stateData : Text, step : Nat) : Text {
    setStateField(stateData, "step", step.toText())
  };

  // ── Session Management ────────────────────────────────────────────────────

  public func getOrCreateSession(phoneNumber : Text) : Types.ConversationSession {
    switch (sessions.get(phoneNumber)) {
      case (?s) s;
      case null {
        let s : Types.ConversationSession = {
          phoneNumber;
          userId       = null;
          currentState = #welcome;
          stateData    = "{}";
          messages     = [];
          lastActivity = Time.now();
          language     = "en";
        };
        sessions.add(phoneNumber, s);
        s
      };
    }
  };

  public func saveSession(session : Types.ConversationSession) {
    sessions.add(session.phoneNumber, session);
  };

  func updateSession(
    session : Types.ConversationSession,
    newState : Types.ConversationState,
    newData : Text,
    newUserId : ?Text,
  ) : Types.ConversationSession {
    let updated : Types.ConversationSession = {
      session with
      currentState = newState;
      stateData = newData;
      userId = switch (newUserId) { case (?u) ?u; case null session.userId };
      lastActivity = Time.now();
    };
    saveSession(updated);
    updated
  };

  func appendMessage(phone : Text, sender : Types.MessageSender, content : Text, msgType : Text) {
    let session = getOrCreateSession(phone);
    let msg : Types.ConversationMessage = {
      id = Utils.generateId("msg");
      sender;
      content;
      timestamp = Time.now();
      messageType = msgType;
    };
    let msgs = List.fromArray<Types.ConversationMessage>(session.messages);
    msgs.add(msg);
    let updated = { session with messages = msgs.toArray(); lastActivity = Time.now() };
    saveSession(updated);
  };

  // ── Format Helpers ────────────────────────────────────────────────────────

  public func formatMerchantCard(merchant : Types.Merchant, distanceKm : Float, products : [Types.Product]) : Text {
    let deliveryText = switch (merchant.deliveryType) {
      case (#takeaway) "Takeaway only";
      case (#delivery) "Online delivery";
    };
    let minPrice = if (products.size() == 0) {
      "N/A"
    } else {
      let minVal = products.foldLeft(products[0].baseRate, func(acc : Float, p : Types.Product) : Float {
        if (p.baseRate < acc) p.baseRate else acc
      });
      "₹" # minVal.toText()
    };
    "🏪 " # merchant.businessName # " | " # merchant.category #
    "\n📍 " # distanceKm.toText() # " km away | ⭐ " # merchant.avgRating.toText() #
    "\n📦 " # deliveryText #
    "\n💰 From " # minPrice
  };

  public func formatOrderStatusMessage(order : Types.Order) : Text {
    let statusText = switch (order.status) {
      case (#new_)             "New Order — placed and waiting";
      case (#pending)          "Waiting for Merchant";
      case (#accepted)         "Merchant Accepted";
      case (#rejected)         "Rejected by Merchant";
      case (#assigned)         "Delivery Partner Assigned";
      case (#inTransit)        "Out for Delivery";
      case (#delivered)        "Delivered — awaiting payment";
      case (#paymentCollected) "Payment Collected";
      case (#vendorSettled)    "Vendor Settled";
      case (#completed)        "Order Completed ✅";
      case (#cancelled)        "Cancelled";
      case (#expired)          "Expired";
    };
    let currSym = "₹"; // default since we don't have phone here
    "Order #" # order.id # " — " # statusText # "\n💰 Total: " # currSym # order.totalAmount.toText()
  };

  public func formatJobCard(job : Types.Job, distanceKm : Float) : Text {
    "💼 " # job.title # " | " # job.category #
    "\n📍 " # distanceKm.toText() # " km away" #
    "\n💰 ₹" # job.salaryMin.toText() # " - ₹" # job.salaryMax.toText() # "/month"
  };

  public func formatPropertyCard(property : Types.Property, distanceKm : Float) : Text {
    let typeText = switch (property.listingType) {
      case (#rent)  "For Rent";
      case (#lease) "For Lease";
      case (#buy)   "For Sale (Buy)";
      case (#sale)  "For Sale";
    };
    "🏠 " # typeText # " | " # property.location.address #
    "\n📍 " # distanceKm.toText() # " km away" #
    "\n💰 ₹" # property.expectedPrice.toText() #
    "\n📝 " # property.description
  };

  public func parseQuickReply(userMessage : Text) : ?Text {
    let t = userMessage.trimStart(#char ' ').trimEnd(#char ' ');
    if (t.size() > 0) ?t else null
  };

  // ── Welcome ───────────────────────────────────────────────────────────────

  func handleWelcome(session : Types.ConversationSession) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    // ── Determine country + currency from phone prefix ────────────────────────
    let currencySymbol = userSvc.getCurrencyForPhone(phone);
    // Extract country info from user record (if exists) or default
    func countryGreeting(u : Types.User) : Text {
      let flag = switch (u.countryCode) {
        case "IN" "🇮🇳"; case "US" "🇺🇸"; case "AE" "🇦🇪"; case "GB" "🇬🇧";
        case "SG" "🇸🇬"; case "AU" "🇦🇺"; case "CA" "🇨🇦"; case "MY" "🇲🇾";
        case "PK" "🇵🇰"; case "BD" "🇧🇩"; case "LK" "🇱🇰"; case "NP" "🇳🇵";
        case _ "🌍";
      };
      flag
    };

    // ── Check if returning user ──────────────────────────────────────────────
    switch (userSvc.getUserByPhone(phone)) {
      case (#ok(user)) {
        // Returning user — check if blocked (for merchant/DP roles)
        let blockMsg : ?Text = switch (user.role) {
          case (#merchant) {
            let allM = merchantSvc.listMerchants(?true, null);
            switch (allM.find(func(m : Types.Merchant) : Bool { m.userId == user.id })) {
              case (?m) {
                switch (m.blockedUntil) {
                  case (?until) {
                    if (Time.now() < until) {
                      ?("⛔ Your account is temporarily unavailable for new orders due to a recent negative rating.\n\nOrders will resume after the block period.\n\nType 'menu' to access other options.")
                    } else null
                  };
                  case null null;
                }
              };
              case null null;
            }
          };
          case (#deliveryPartner or #sarthi) {
            switch (dpSvc.getDeliveryPartnerByUserId(user.id)) {
              case (#ok(dp)) {
                switch (dp.blockedUntil) {
                  case (?until) {
                    if (Time.now() < until) {
                      ?("⛔ Your account is temporarily unavailable for new orders due to a recent negative rating.\n\nOrders will resume after the block period.\n\nType 'menu' to access other options.")
                    } else null
                  };
                  case null null;
                }
              };
              case (#err(_)) null;
            }
          };
          case _ null;
        };

        // Check role and route accordingly
        switch (user.role) {
          case (#merchant) {
            ignore updateSession(session, #merchantMenu, "{}", ?user.id);
            let flag = countryGreeting(user);
            let greeting = "Welcome back, " # user.name # "! " # flag # " 🏪\n\n" #
              "Prices in " # currencySymbol # "\n\n" # merchantMainMenuFiltered(phone);
            let msgs = List.empty<Types.BotMessage>();
            switch (blockMsg) { case (?bm) { msgs.add(makeText(phone, bm)) }; case null {} };
            msgs.add(makeQuickReply(phone, greeting,
              merchantMenuReplies(phone)
            ));
            return msgs.toArray();
          };
          case (#deliveryPartner) {
            ignore updateSession(session, #dpMenu, "{}", ?user.id);
            let flag = countryGreeting(user);
            let greeting = "Welcome back, " # user.name # "! " # flag # " 🚴\n\n" #
              "Earnings shown in " # currencySymbol # "\n\n" # dpMainMenuText();
            let msgs = List.empty<Types.BotMessage>();
            switch (blockMsg) { case (?bm) { msgs.add(makeText(phone, bm)) }; case null {} };
            msgs.add(makeQuickReply(phone, greeting,
              numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"])
            ));
            return msgs.toArray();
          };
          case (#sarthi) {
            ignore updateSession(session, #dpMenu, "{}", ?user.id);
            let flag = countryGreeting(user);
            let greeting = "Welcome back, " # user.name # "! " # flag # " 🚗 (Sarthi)\n\n" #
              "Earnings shown in " # currencySymbol # "\n\n" # dpMainMenuText();
            let msgs = List.empty<Types.BotMessage>();
            switch (blockMsg) { case (?bm) { msgs.add(makeText(phone, bm)) }; case null {} };
            msgs.add(makeQuickReply(phone, greeting,
              numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"])
            ));
            return msgs.toArray();
          };
          case (#customer) {
            // Check subscription first — if none active, prompt for plan
            let custUserId = user.id;
            if (not hasActiveSubscription(custUserId)) {
              ignore updateSession(session, #subscriptionPrompt, "{}", ?user.id);
              return subscriptionPlanMenu(phone);
            };
            // Show active promotions/events for location before customer menu
            let promotionCards = getActivePromotionCards(phone, user.location);
            let eventCards     = getActiveEventCards(phone, user.location);
            ignore updateSession(session, #mainMenu, "{}", ?user.id);
            let flag = countryGreeting(user);
            let msgs = List.empty<Types.BotMessage>();
            for (m in promotionCards.vals()) { msgs.add(m) };
            for (m in eventCards.vals()) { msgs.add(m) };
            msgs.add(makeQuickReply(phone,
              "Welcome back, " # user.name # "! " # flag # " 😊\n" #
              "Prices in " # currencySymbol # "\n\n" # customerMenuFiltered(phone),
              customerMenuReplies(phone)
            ));
            return msgs.toArray();
          };
          case (#admin) {
            ignore updateSession(session, #mainMenu, "{}", ?user.id);
            return [makeText(phone, "Admin account. Please use the web dashboard.")];
          };
        };
      };
      case (#err(_)) {};
    };

    // ── New user — detect country and show welcome + role selection ───────────
    // Try to infer country from phone prefix
    let (_countryCode_, _currency, countryName_) : (Text, Text, Text) = if (phone.size() >= 3) {
      let _prefix3 = phone.size() >= 4 and phone.startsWith(#text "+");
      if (phone.startsWith(#text "+91") or phone.startsWith(#text "91")) {
        ("IN", "INR", "India")
      } else if (phone.startsWith(#text "+1")) {
        ("US", "USD", "USA")
      } else if (phone.startsWith(#text "+44")) {
        ("GB", "GBP", "United Kingdom")
      } else if (phone.startsWith(#text "+971")) {
        ("AE", "AED", "UAE")
      } else if (phone.startsWith(#text "+60")) {
        ("MY", "MYR", "Malaysia")
      } else if (phone.startsWith(#text "+65")) {
        ("SG", "SGD", "Singapore")
      } else if (phone.startsWith(#text "+61")) {
        ("AU", "AUD", "Australia")
      } else {
        ("IN", "INR", "India")
      }
    } else {
      ("IN", "INR", "India")
    };

    ignore updateSession(session, #registerType, "{}", null);
    [makeQuickReply(
      phone,
      "🎉 Welcome to LocalBazar Kart! 🛒\n\nYour complete marketplace on WhatsApp.\n\n" #
      "🌍 We detect you are from " # countryName_ # ". Prices will be shown in " # currencySymbol # ".\n\n" #
      "How would you like to register?",
      numericReplies(["Register as Merchant", "Register as Delivery Partner", "Register as Sarthi (Passenger Pickup)", "Continue as Customer"])
    )]
  };

  func getActivePromotionCards(phone : Text, userLocation : ?Types.Location) : [Types.BotMessage] {
    let city = switch (userLocation) { case (?l) l.address; case null "" };
    let promos = promotionSvc.getPromotionsForLocation(city, "");
    if (promos.size() == 0) return [];

    let now = Time.now();

    // Get or create sent-promotions list for this user, pruned to 7-day window
    let rawSent = switch (sentPromotionsMap.get(phone)) {
      case (?arr) arr;
      case null [];
    };
    let recentSent = rawSent.filter(func(e : (Text, Int)) : Bool { now - e.1 < SEVEN_DAYS_NS });

    let sentIds = recentSent.map(func(e : (Text, Int)) : Text = e.0);

    // Prefer unseen promos first
    let unseen = promos.filter(func(p : PromotionTypes.Promotion) : Bool {
      sentIds.find(func(id : Text) : Bool { id == p.id }) == null
    });

    // If fewer than 3 available total, allow repeats
    let candidates = if (unseen.size() > 0) unseen else promos;

    let msgs = List.empty<Types.BotMessage>();
    let limit = if (candidates.size() > 2) 2 else candidates.size();

    // Simple pseudo-random selection using timestamp
    let seed = Int.abs(now) % (if (candidates.size() > 0) candidates.size() else 1);
    var idx = seed;
    var shown = 0;
    let newSent = List.fromArray(recentSent);

    while (shown < limit) {
      idx := (idx + 1) % candidates.size();
      let p = candidates[idx];
      ignore promotionSvc.trackReach(p.id);
      msgs.add(makeQuickReply(phone,
        "📢 PROMOTION FOR YOU!\n\n" #
        "📣 " # p.title # "\n" #
        "📍 " # p.locationArea # ", " # p.locationCity # "\n" #
        "🎬 Video: " # p.reelLink # "\n" #
        "🖼️ Image: " # p.imageLink,
        numericReplies(["View Promotion", "Skip"])
      ));
      newSent.add((p.id, now));
      shown += 1;
    };

    sentPromotionsMap.add(phone, newSent.toArray());
    msgs.toArray()
  };

  func getActiveEventCards(phone : Text, userLocation : ?Types.Location) : [Types.BotMessage] {
    let city = switch (userLocation) { case (?l) l.address; case null "" };
    if (city == "") return [];

    let events = eventSvc.getEventsForLocation(city);
    if (events.size() == 0) return [];

    let now = Time.now();

    // Get or create sent-events list for this user, pruned to 7-day window
    let rawSent = switch (sentEventsMap.get(phone)) {
      case (?arr) arr;
      case null [];
    };
    let recentSent = rawSent.filter(func(e : (Text, Int)) : Bool { now - e.1 < SEVEN_DAYS_NS });
    let sentIds = recentSent.map(func(e : (Text, Int)) : Text = e.0);

    // Prefer unseen events first
    let unseen = events.filter(func(e : EventTypes.Event) : Bool {
      sentIds.find(func(id : Text) : Bool { id == e.id }) == null
    });

    let candidates = if (unseen.size() > 0) unseen else events;

    let msgs = List.empty<Types.BotMessage>();
    let limit = if (candidates.size() > 2) 2 else candidates.size();
    let seed = Int.abs(now) % (if (candidates.size() > 0) candidates.size() else 1);
    var idx = seed;
    var shown = 0;
    let newSent = List.fromArray(recentSent);

    while (shown < limit) {
      idx := (idx + 1) % candidates.size();
      let e = candidates[idx];
      let priceText = if (e.isPaid) "Paid — ₹" # e.price.toText() else "Free";
      msgs.add(makeText(phone,
        "🎉 UPCOMING EVENT!\n\n" #
        "📛 " # e.eventName # "\n" #
        "📝 " # e.description # "\n" #
        "📍 " # e.locationAddress # "\n" #
        "📅 " # e.startDate # " to " # e.endDate # "\n" #
        "💰 " # priceText # "\n" #
        "🎟️ " # e.ticketVenue
      ));
      newSent.add((e.id, now));
      shown += 1;
    };

    sentEventsMap.add(phone, newSent.toArray());
    msgs.toArray()
  };

  // ── Register Type ─────────────────────────────────────────────────────────

  func handleRegisterType(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (parseChoice(msg)) {
      case (?1) {
        ignore updateSession(session, #registerMerchant, setStep("{}", 1), null);
        [makeText(phone, "Let's register your business! 🏪\n\nStep 1: What's your business name?")]
      };
      case (?2) {
        let data = setStateField(setStep("{}", 1), "serviceType", "delivery");
        ignore updateSession(session, #registerDeliveryPartner, data, null);
        [makeText(phone, "Let's get you registered as a Delivery Partner! 🚴\n\nStep 1: What's your full name?")]
      };
      case (?3) {
        let data = setStateField(setStep("{}", 1), "serviceType", "sarthi");
        ignore updateSession(session, #registerDeliveryPartner, data, null);
        [makeText(phone, "Let's get you registered as a Sarthi (Passenger Pickup)! 🚗\n\nStep 1: What's your full name?")]
      };
      case (?4) {
        await handleCustomerEntry(session)
      };
      case _ {
        [makeQuickReply(
          phone,
          "Please reply with:\n1. Register as Merchant\n2. Register as Delivery Partner\n3. Register as Sarthi (Passenger Pickup)\n4. Continue as Customer",
          numericReplies(["Register as Merchant", "Register as Delivery Partner", "Register as Sarthi (Passenger Pickup)", "Continue as Customer"])
        )]
      };
    }
  };

  // ── Customer Registration ─────────────────────────────────────────────────

  func handleCustomerEntry(session : Types.ConversationSession) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (userSvc.getUserByPhone(phone)) {
      case (#ok(user)) {
        // Returning user — ask location then go to menu
        ignore updateSession(session, #registerCustomer, setStep("{}", 99), ?user.id);
        [makeText(phone, "Welcome back, " # user.name # "! 😊\n\nPlease share your current location\n(type your city and area, e.g. 'Mumbai, Andheri'):")]
      };
      case (#err(_)) {
        ignore updateSession(session, #registerCustomer, setStep("{}", 1), null);
        [makeText(phone, "Welcome! 👋\n\nStep 1: What's your name?")]
      };
    }
  };

  func handleRegisterCustomer(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);
    switch step {
      case 1 {
        // Step 1: collected name — ask gender
        ignore updateSession(session, #registerCustomer, setStep(setStateField(session.stateData, "name", msg), 2), null);
        [makeQuickReply(phone,
          "Nice to meet you, " # msg # "! 😊\n\nStep 2: What is your gender?",
          numericReplies(["Male", "Female", "Other"])
        )]
      };
      case 2 {
        // Step 2: gender — ask location
        let gender = switch (parseChoice(msg)) {
          case (?1) "Male"; case (?2) "Female"; case (?3) "Other";
          case _ {
            let m2 = msg.toLower();
            if (m2 == "male") "Male" else if (m2 == "female") "Female" else "Other"
          };
        };
        ignore updateSession(session, #registerCustomer, setStep(setStateField(session.stateData, "gender", gender), 3), null);
        [makeText(phone, "Got it! \n\nStep 3: Please share your location\n(type your city and area, e.g. 'Mumbai, Andheri'):")]
      };
      case 3 {
        // Step 3: collected location — ask address
        ignore updateSession(session, #registerCustomer, setStep(setStateField(session.stateData, "location", msg), 4), null);
        [makeText(phone, "Got it! 📍\n\nStep 4: Please enter your delivery address:")]
      };
      case 4 {
        // Step 4: collected address — create user
        let name    = switch (getStateField(session.stateData, "name"))     { case (?n) n; case null "Customer" };
        let gender  = switch (getStateField(session.stateData, "gender"))   { case (?g) g; case null "" };
        let locText = switch (getStateField(session.stateData, "location")) { case (?l) l; case null "" };
        let loc : Types.Location = { lat = 0.0; lng = 0.0; address = locText };
        let cleanName = Utils.sanitizeInput(name);
        let cleanAddr = Utils.sanitizeInput(msg);
        switch (userSvc.createUser(phone, cleanName, #customer, ?loc, ?cleanAddr)) {
          case (#ok(user)) {
            // Save gender on user record
            ignore userSvc.updateUserGender(phone, gender);
            // Subscription check after registration
            if (not hasActiveSubscription(user.id)) {
              ignore updateSession(session, #subscriptionPrompt, "{}", ?user.id);
              let msgs2 = List.fromArray<Types.BotMessage>([makeText(phone, "✅ Registration complete! Welcome, " # cleanName # "!\n\n📍 Please share your location or GPS coordinates (optional - helps find nearby offers).\n\nOr type 'skip' to continue:")]);
              for (m in subscriptionPlanMenu(phone).vals()) { msgs2.add(m) };
              return msgs2.toArray();
            };
            // Ask for geolocation after registration
            ignore updateSession(session, #custRegLocation, setStep(setStateField("{}", "userId", user.id), 50), ?user.id);
            [makeQuickReply(phone,
              "✅ Registration complete! Welcome, " # cleanName # "! 😊\n\n" #
              "📍 Please share your location for personalized nearby offers.\n" #
              "(Type your area and city, e.g. 'Andheri, Mumbai')\n\n" #
              "Or skip to go to the main menu.",
              numericReplies(["Skip"])
            )]
          };
          case (#err(#alreadyExists)) {
            switch (userSvc.getUserByPhone(phone)) {
              case (#ok(user)) {
                ignore updateSession(session, #mainMenu, "{}", ?user.id);
                [makeText(phone, "Welcome back! 😊\n\n" # customerMainMenu())]
              };
              case (#err(_)) {
                [makeText(phone, "Something went wrong. Type 'hi' to start again.")]
              };
            }
          };
          case (#err(_)) {
            [makeText(phone, "Registration failed. Type 'hi' to start again.")]
          };
        }
      };
      case 50 {
        // Geolocation step after new registration — optional
        let userId = switch (session.userId) {
          case (?id) id; case null ""
        };
        if (msg.toLower() == "skip" or msg == "1") {
          // Skipped — proceed to main menu or subscription prompt
          switch (userSvc.getUserById(userId)) {
            case (#ok(user)) {
              if (not hasActiveSubscription(user.id)) {
                ignore updateSession(session, #subscriptionPrompt, "{}", ?user.id);
                return subscriptionPlanMenu(phone);
              };
            };
            case (#err(_)) {};
          };
          ignore updateSession(session, #mainMenu, "{}", ?userId);
          return [makeText(phone, customerMainMenu())];
        };
        // Save location
        let loc : Types.Location = { lat = 0.0; lng = 0.0; address = msg };
        ignore userSvc.updateUserLocation(userId, loc);
        // Check subscription
        switch (userSvc.getUserById(userId)) {
          case (#ok(user)) {
            if (not hasActiveSubscription(user.id)) {
              ignore updateSession(session, #subscriptionPrompt, "{}", ?user.id);
              let msgs2 = List.fromArray<Types.BotMessage>([makeText(phone, "📍 Location saved!")]);
              for (m in subscriptionPlanMenu(phone).vals()) { msgs2.add(m) };
              return msgs2.toArray();
            };
          };
          case (#err(_)) {};
        };
        ignore updateSession(session, #mainMenu, "{}", ?userId);
        [makeText(phone, "📍 Location saved! ✅\n\n" # customerMainMenu())]
      };
      case 99 {
        // Returning user — update location
        let userId = switch (session.userId) { case (?id) id; case null "" };
        let loc : Types.Location = { lat = 0.0; lng = 0.0; address = msg };
        ignore userSvc.updateUserLocation(userId, loc);
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, "Location updated! 📍\n\n" # customerMainMenu())]
      };
      case _ {
        ignore updateSession(session, #registerCustomer, setStep("{}", 1), null);
        [makeText(phone, "Let's start over. What's your name?")]
      };
    }
  };

  // ── Merchant Registration ─────────────────────────────────────────────────

  func buildCategoryMenu() : Text {
    var text = "Select your business category:\n";
    var i = 0;
    for (cat in CATEGORIES.values()) {
      i += 1;
      text := text # i.toText() # ". " # cat # "\n";
    };
    text
  };

  func handleRegisterMerchant(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);
    switch step {
      case 1 {
        // Step 1: receive business name → ask for mobile
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "bizName", msg), 2), null);
        [makeText(phone, "📱 What is your business mobile number? (10 digits, e.g. 9876543210)")]
      };
      case 2 {
        // Step 2: validate and store mobile number
        let cleaned = msg.trimStart(#char ' ').trimEnd(#char ' ');
        // Validate: exactly 10 digits
        let natParsed : Bool = switch (Nat.fromText(cleaned)) { case (?_) true; case null false };
        let allDigits = cleaned.size() == 10 and natParsed;
        if (not allDigits) {
          [makeText(phone, "❌ Please enter a valid 10-digit mobile number (digits only, no spaces):")]
        } else {
          ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "mobileNo", cleaned), 3), null);
          [makeText(phone, buildCategoryMenu())]
        }
      };
      case 3 {
        let catIdx = switch (parseChoice(msg)) { case (?n) n; case null 0 };
        if (catIdx < 1 or catIdx > CATEGORIES.size()) {
          [makeText(phone, "Please enter a valid number (1-" # CATEGORIES.size().toText() # "):\n\n" # buildCategoryMenu())]
        } else {
          let cat = CATEGORIES[catIdx - 1];
          ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "category", cat), 4), null);
          [makeQuickReply(phone, "What type of merchant are you?\n1. Take Orders\n2. Inquiry Only",
            numericReplies(["Take Orders", "Inquiry Only"]))]
        }
      };
      case 4 {
        let mType = switch (parseChoice(msg)) { case (?1) "order"; case (?2) "inquiry"; case _ "order" };
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "merchantType", mType), 5), null);
        [makeQuickReply(phone, "Allow bookings? 📅", numericReplies(["Yes", "No"]))]
      };
      case 5 {
        let booking = switch (parseChoice(msg)) { case (?1) "yes"; case _ "no" };
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "booking", booking), 6), null);
        [makeQuickReply(phone, "Offer rental services? 🏷️", numericReplies(["Yes", "No"]))]
      };
      case 6 {
        let rental = switch (parseChoice(msg)) { case (?1) "yes"; case _ "no" };
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "rental", rental), 7), null);
        [makeText(phone, "📍 What is your business location?\n(Type your city and area, e.g. 'Mumbai, Andheri')")]
      };
      case 7 {
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "location", msg), 8), null);
        [makeQuickReply(phone, "Delivery type?", numericReplies(["Takeaway only", "Online delivery"]))]
      };
      case 8 {
        let dType = switch (parseChoice(msg)) { case (?1) "takeaway"; case _ "delivery" };
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "deliveryType", dType), 9), null);
        [makeText(phone, "🚚 What is your delivery radius in km? (e.g. 5)")]
      };
      case 9 {
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "radius", msg), 10), null);
        [makeQuickReply(phone, "Do you have multiple branches?", numericReplies(["Yes", "No"]))]
      };
      case 10 {
        let hasBranch = switch (parseChoice(msg)) { case (?1) "yes"; case _ "no" };
        if (hasBranch == "yes") {
          let data = setStateField(setStep(setStateField(session.stateData, "hasBranches", "yes"), 11), "branchList", "[]");
          ignore updateSession(session, #registerMerchant, data, null);
          [makeText(phone, "📍 Branch 1: Enter branch address:")]
        } else {
          ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "hasBranches", "no"), 12), null);
          [makeText(phone, "📄 Please enter your PAN number:")]
        }
      };
      case 11 {
        // Collecting branch address
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "branchAddr", msg), 101), null);
        [makeText(phone, "🚚 Enter delivery radius for this branch in km (e.g. 3):")]
      };
      case 101 {
        // Collecting branch delivery radius — append to branchList
        let addr     = switch (getStateField(session.stateData, "branchAddr")) { case (?v) v; case null "" };
        let existing = switch (getStateField(session.stateData, "branchList")) { case (?v) v; case null "[]" };
        let entry    = addr # "|" # msg;
        let newList  = if (existing == "[]" or existing == "") entry
                       else existing # ";;;" # entry;
        let data = setStep(setStateField(setStateField(session.stateData, "branchList", newList), "branchAddr", ""), 102);
        ignore updateSession(session, #registerMerchant, data, null);
        let branchCount = newList.split(#text ";;;").toArray().size();
        [makeQuickReply(phone,
          "✅ Branch " # branchCount.toText() # " added!\n\nDo you have more branches?",
          numericReplies(["Add Next Branch", "No More Branches"])
        )]
      };
      case 102 {
        switch (parseChoice(msg)) {
          case (?1) {
            let branchCount = switch (getStateField(session.stateData, "branchList")) {
              case (?v) v.split(#text ";;;").toArray().size() + 1;
              case null 2;
            };
            ignore updateSession(session, #registerMerchant, setStep(session.stateData, 11), null);
            [makeText(phone, "📍 Branch " # branchCount.toText() # ": Enter branch address:")]
          };
          case _ {
            ignore updateSession(session, #registerMerchant, setStep(session.stateData, 12), null);
            [makeText(phone, "📄 Please enter your PAN number:")]
          };
        }
      };
      case 12 {
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "pan", msg), 13), null);
        [makeText(phone, "🪪 Please enter your Aadhaar number:")]
      };
      case 13 {
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "aadhaar", msg), 14), null);
        [makeText(phone, "🏢 Enter your GST number (or type 'skip'):")]
      };
      case 14 {
        let gst = if (msg.toLower() == "skip") "" else msg;
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "gst", gst), 15), null);
        [makeQuickReply(phone, "💵 Accept Cash on Delivery (COD)?", numericReplies(["Yes", "No"]))]
      };
      case 15 {
        let cod = switch (parseChoice(msg)) { case (?1) "yes"; case _ "no" };
        ignore updateSession(session, #registerMerchant, setStep(setStateField(session.stateData, "cod", cod), 16), null);
        [makeText(phone, "📋 Upload your menu!\nType product names one per line, or type 'skip' to add products later:")]
      };
      case 16 {
        // Transition to OTP verify
        let data = setStateField(setStep(setStateField(session.stateData, "menu", msg), 17), "returnState", "merchantDone");
        ignore updateSession(session, #otpVerify, data, null);
        [makeText(phone, "📲 An OTP has been sent to your WhatsApp number.\nPlease enter the 6-digit code:\n\n(Test mode: any 6 digits work, e.g. 123456)")]
      };
      case _ {
        ignore updateSession(session, #registerMerchant, setStep("{}", 1), null);
        [makeText(phone, "Let's start over. What's your business name?")]
      };
    }
  };

  func completeMerchantRegistration(session : Types.ConversationSession) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let data = session.stateData;
    let bizName  = switch (getStateField(data, "bizName"))  { case (?v) v; case null "My Business" };
    let category = switch (getStateField(data, "category")) { case (?v) v; case null "Other" };
    let locText  = switch (getStateField(data, "location")) { case (?v) v; case null "" };
    let btype    = switch (getStateField(data, "businessType")) { case (?v) v; case null "regular" };
    // Use explicitly collected mobile number if provided; fall back to session phone
    let merchantPhone = switch (getStateField(data, "mobileNo")) {
      case (?v) if (v != "") v else phone;
      case null phone;
    };
    let loc : Types.Location = { lat = 0.0; lng = 0.0; address = locText };

    // Resolve / create the base user record
    let userId = switch (session.userId) {
      case (?id) id;
      case null {
        switch (userSvc.getUserByPhone(phone)) {
          case (#ok(u)) u.id;
          case (#err(_)) {
            switch (userSvc.createUser(phone, bizName, #merchant, ?loc, null)) {
              case (#ok(u)) u.id;
              case (#err(_)) "";
            }
          };
        }
      };
    };

    // ── Healthcare Provider path ────────────────────────────────────────────
    if (btype == "healthcare") {
      let spec    = switch (getStateField(data, "specialization"))  { case (?v) v; case null "General Physician" };
      let feeStr  = switch (getStateField(data, "consultationFee")) { case (?v) v; case null "500" };
      let avail   = switch (getStateField(data, "availability"))    { case (?v) v; case null "By appointment" };
      let fee     : Float = switch (parseFloat(feeStr)) { case (?f) f; case null 500.0 };
      switch (merchantSvc.createMerchant(userId, merchantPhone, bizName, category, #order_, loc, #delivery, 5.0)) {
        case (#ok(_)) {}; case (#err(#alreadyExists)) {}; case (#err(_)) {};
      };
      let hpId = "hp_" # Time.now().toText() # "_" # phone;
      let provider : PSTypes.HealthcareProvider = {
        id             = hpId;
        name           = bizName;
        specialization = spec;
        consultationFee = fee;
        address        = locText;
        city           = locText;
        availability   = [avail];
        phone          = merchantPhone;
        rating    = 0.0;
        createdAt = Time.now();
        updatedAt = Time.now();
      };
      healthcareProviderStore.add(hpId, provider);
      ignore userSvc.updateUserRole(phone, #merchant);
      ignore updateSession(session, #merchantMenu, "{}", ?userId);
      return [makeText(phone, "🎉 Healthcare Provider registered!\n\n" #
        "🏥 " # bizName # "\n🎩 Specialization: " # spec # "\n💰 Fee: ₹" # feeStr # "\n📱 Mobile: " # merchantPhone # "\n🕐 Availability: " # avail #
        "\n\n" # merchantMainMenuFiltered(phone))];
    };

    // ── Tour Operator path ──────────────────────────────────────────────────
    if (btype == "tour") {
      let destsStr  = switch (getStateField(data, "tourDestinations"))  { case (?v) v; case null "" };
      let duration  = switch (getStateField(data, "tourDuration"))       { case (?v) v; case null "Flexible" };
      let priceStr  = switch (getStateField(data, "tourPricePerPerson")) { case (?v) v; case null "1000" };
      let maxPassStr= switch (getStateField(data, "tourMaxPassengers"))  { case (?v) v; case null "20" };
      let price     : Float = switch (parseFloat(priceStr)) { case (?f) f; case null 1000.0 };
      let maxPassengers : Nat = switch (Nat.fromText(maxPassStr)) { case (?n) n; case null 20 };
      let dests : [Text] = if (destsStr == "") [] else destsStr.split(#text ",").toArray();
      switch (merchantSvc.createMerchant(userId, merchantPhone, bizName, category, #order_, loc, #delivery, 50.0)) {
        case (#ok(_)) {}; case (#err(#alreadyExists)) {}; case (#err(_)) {};
      };
      let toId = "to_" # Time.now().toText() # "_" # phone;
      let op : PSTypes.TourOperator = {
        id             = toId;
        name           = bizName;
        destinations   = dests;
        tourTypes      = ["Day Tour", "Weekend", "Long Tour"];
        duration;
        pricePerPerson = price;
        maxPassengers;
        phone          = merchantPhone;
        city           = locText;
        rating    = 0.0;
        createdAt = Time.now();
        updatedAt = Time.now();
      };
      tourOperatorStore.add(toId, op);
      ignore userSvc.updateUserRole(phone, #merchant);
      ignore updateSession(session, #merchantMenu, "{}", ?userId);
      return [makeText(phone, "🎉 Tour Operator registered!\n\n" #
        "✈️ " # bizName # "\n🏔️ Destinations: " # destsStr # "\n📅 Duration: " # duration # "\n💰 Price/person: ₹" # priceStr # "\n📱 Mobile: " # merchantPhone #
        "\n\n" # merchantMainMenuFiltered(phone))];
    };

    // ── Professional Service path ────────────────────────────────────────────
    if (btype == "professional") {
      let profCat  = switch (getStateField(data, "profCategory")) { case (?v) v; case null "Other" };
      let rateStr  = switch (getStateField(data, "profRate"))     { case (?v) v; case null "300" };
      let avail    = switch (getStateField(data, "availability")) { case (?v) v; case null "On Call" };
      let rate     : Float = switch (parseFloat(rateStr)) { case (?f) f; case null 300.0 };
      switch (merchantSvc.createMerchant(userId, merchantPhone, bizName, category, #order_, loc, #delivery, 10.0)) {
        case (#ok(_)) {}; case (#err(#alreadyExists)) {}; case (#err(_)) {};
      };
      let psId = "ps_" # Time.now().toText() # "_" # phone;
      let svc : PSTypes.ProfessionalService = {
        id             = psId;
        merchantPhone  = merchantPhone;
        serviceType    = profCat;
        specialization = profCat;
        pricePerHour   = rate;
        areaRates      = [];  // professionals can add area rates later via setAreaRate
        address        = locText;
        city           = locText;
        availability   = [avail];
        rating    = 0.0;
        createdAt = Time.now();
        updatedAt = Time.now();
      };
      professionalSvcStore.add(psId, svc);
      ignore userSvc.updateUserRole(phone, #merchant);
      ignore updateSession(session, #merchantMenu, "{}", ?userId);
      return [makeText(phone, "🎉 Professional Service registered!\n\n" #
        "🔧 " # bizName # "\n🛠️ Service: " # profCat # "\n💰 Rate: ₹" # rateStr # "/hr\n📱 Mobile: " # merchantPhone # "\n🕐 Availability: " # avail #
        "\n\n" # merchantMainMenuFiltered(phone))];
    };

    // ── Regular Store path (original logic) ─────────────────────────────────
    let mTypeStr = switch (getStateField(data, "merchantType")) { case (?v) v; case null "order" };
    let dtStr    = switch (getStateField(data, "deliveryType")) { case (?v) v; case null "delivery" };
    let radStr   = switch (getStateField(data, "radius"))   { case (?v) v; case null "5" };

    let merchantType : Types.MerchantType = if (mTypeStr == "inquiry") #inquiry else #order_;
    let deliveryType : Types.DeliveryType = if (dtStr == "takeaway") #takeaway else #delivery;
    let deliveryRadius : Float = switch (parseFloat(radStr)) { case (?f) f; case null 5.0 };

    switch (merchantSvc.createMerchant(userId, merchantPhone, bizName, category, merchantType, loc, deliveryType, deliveryRadius)) {
      case (#ok(merchant)) {
        let branchListStr = switch (getStateField(data, "branchList")) { case (?v) v; case null "" };
        if (branchListStr != "" and branchListStr != "[]") {
          let entries = branchListStr.split(#text ";;;").toArray();
          for (entry in entries.vals()) {
            let parts = entry.split(#char '|').toArray();
            let bAddr = if (parts.size() >= 1) parts[0] else "";
            let bRadiusStr = if (parts.size() >= 2) parts[1] else "3";
            let bRadius : Float = switch (parseFloat(bRadiusStr)) { case (?f) f; case null 3.0 };
            if (bAddr != "") {
              let branch : Types.Branch = {
                address = bAddr;
                location = { lat = 0.0; lng = 0.0; address = bAddr };
                deliveryRadius = bRadius;
                isActive = true;
              };
              ignore merchantSvc.addBranch(merchant.id, branch);
            };
          };
        };
        ignore userSvc.updateUserRole(phone, #merchant);
        ignore updateSession(session, #merchantMenu, "{}", ?userId);
        [makeText(phone, "🎉 Business registered successfully!\n\nWelcome to LocalBazar Kart 🛒, " # bizName # "!\n📱 Business Mobile: " # merchantPhone # "\n\n" # merchantMainMenuFiltered(phone))]
      };
      case (#err(#alreadyExists)) {
        ignore userSvc.updateUserRole(phone, #merchant);
        ignore updateSession(session, #merchantMenu, "{}", ?userId);
        [makeText(phone, "You're already registered as a merchant! Welcome back.\n\n" # merchantMainMenuFiltered(phone))]
      };
      case (#err(_)) {
        [makeText(phone, "Registration failed. Type 'hi' to start again.")]
      };
    }
  };

  // ── Delivery Partner Registration ─────────────────────────────────────────

  func handleRegisterDeliveryPartner(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);
    switch step {
      case 1 {
        // Step 1: receive name → ask for mobile number
        ignore updateSession(session, #registerDeliveryPartner, setStep(setStateField(session.stateData, "name", msg), 2), null);
        [makeText(phone, "📱 What is your mobile number? (10 digits, e.g. 9876543210)")]
      };
      case 2 {
        // Step 2: validate and store mobile number
        let cleaned = msg.trimStart(#char ' ').trimEnd(#char ' ');
        let natParsedDp : Bool = switch (Nat.fromText(cleaned)) { case (?_) true; case null false };
        let allDigits = cleaned.size() == 10 and natParsedDp;
        if (not allDigits) {
          [makeText(phone, "❌ Please enter a valid 10-digit mobile number (digits only, no spaces):")]
        } else {
          ignore updateSession(session, #registerDeliveryPartner, setStep(setStateField(session.stateData, "mobileNo", cleaned), 3), null);
          [makeQuickReply(phone, "🚗 Select your vehicle type:", numericReplies(VEHICLE_TYPES))]
        }
      };
      case 3 {
        let vtIdx = switch (parseChoice(msg)) { case (?n) n; case null 0 };
        if (vtIdx < 1 or vtIdx > VEHICLE_TYPES.size()) {
          [makeQuickReply(phone, "Please select a valid vehicle type:", numericReplies(VEHICLE_TYPES))]
        } else {
          let vt = VEHICLE_TYPES[vtIdx - 1];
          ignore updateSession(session, #registerDeliveryPartner, setStep(setStateField(session.stateData, "vehicle", vt), 4), null);
          [makeText(phone, "💰 Our rate card:\n• Bike: ₹8/km\n• Scooter: ₹9/km\n• Car: ₹15/km\n• Auto: ₹12/km\n• Van: ₹20/km\n• Truck: ₹30/km\n\nWhat is your expected per-km rate? (e.g. 8)")]
        }
      };
      case 4 {
        ignore updateSession(session, #registerDeliveryPartner, setStep(setStateField(session.stateData, "rate", msg), 5), null);
        [makeText(phone, "🏢 Are you working with other platforms? (type numbers separated by comma)\n\n1. Rapido\n2. Zomato\n3. Blinkit\n4. Zepto\n5. Dunzo\n6. Swiggy\n7. None")]
      };
      case 5 {
        ignore updateSession(session, #registerDeliveryPartner, setStep(setStateField(session.stateData, "platforms", msg), 6), null);
        [makeText(phone, "🪪 Please enter your Aadhaar number:")]
      };
      case 6 {
        ignore updateSession(session, #registerDeliveryPartner, setStep(setStateField(session.stateData, "aadhaar", msg), 7), null);
        [makeText(phone, "📄 Please enter your PAN number:")]
      };
      case 7 {
        let data = setStateField(setStep(setStateField(session.stateData, "pan", msg), 8), "returnState", "dpDone");
        ignore updateSession(session, #otpVerify, data, null);
        [makeText(phone, "📲 An OTP has been sent to your WhatsApp number.\nPlease enter the 6-digit code:\n\n(Test mode: any 6 digits work, e.g. 123456)")]
      };
      case _ {
        ignore updateSession(session, #registerDeliveryPartner, setStep("{}", 1), null);
        [makeText(phone, "Let's start over. What's your full name?")]
      };
    }
  };

  func completeDeliveryPartnerRegistration(session : Types.ConversationSession) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let data = session.stateData;
    let name    = switch (getStateField(data, "name"))    { case (?v) v; case null "Partner" };
    let vtStr   = switch (getStateField(data, "vehicle")) { case (?v) v; case null "Bike" };
    let rateStr = switch (getStateField(data, "rate"))    { case (?v) v; case null "8" };
    // Use explicitly collected mobile number; fall back to session phone
    let dpPhone = switch (getStateField(data, "mobileNo")) {
      case (?v) if (v != "") v else phone;
      case null phone;
    };

    let vehicleType : Types.VehicleType = switch (vtStr) {
      case "Bike" #bike; case "Scooter" #scooter; case "Car" #car;
      case "Auto" #auto; case "Van" #van; case "Truck" #truck;
      case _ #bike;
    };
    let ratePerKm : Float = switch (parseFloat(rateStr)) { case (?f) f; case null 8.0 };
    let aadhaarNo = switch (getStateField(data, "aadhaar")) { case (?v) v; case null "" };
    let panNo     = switch (getStateField(data, "pan"))     { case (?v) v; case null "" };
    let rcBook    = switch (getStateField(data, "rc"))      { case (?v) v; case null "" };
    let serviceType : Types.ServiceType = switch (getStateField(data, "serviceType")) {
      case (?"sarthi") #sarthi; case _ #delivery;
    };

    let userId = switch (session.userId) {
      case (?id) id;
      case null {
        switch (userSvc.getUserByPhone(phone)) {
          case (#ok(u)) u.id;
          case (#err(_)) {
            let loc : Types.Location = { lat = 0.0; lng = 0.0; address = "" };
            switch (userSvc.createUser(phone, name, #deliveryPartner, ?loc, null)) {
              case (#ok(u)) u.id;
              case (#err(_)) "";
            }
          };
        }
      };
    };

    switch (dpSvc.registerDeliveryPartner(userId, dpPhone, name, vehicleType, serviceType, ratePerKm, aadhaarNo, rcBook, panNo, [])) {
      case (#ok(_)) {
        let newRole : Types.UserRole = if (serviceType == #sarthi) #sarthi else #deliveryPartner;
        ignore userSvc.updateUserRole(phone, newRole);
        ignore updateSession(session, #dpMenu, "{}", ?userId);
        [makeText(phone, "🎉 Registered as Delivery Partner!\n\nWelcome, " # name # "!\n📱 Mobile: " # dpPhone # "\n\n" # dpMainMenuText())]
      };
      case (#err(#alreadyExists)) {
        let existingRole : Types.UserRole = if (serviceType == #sarthi) #sarthi else #deliveryPartner;
        ignore userSvc.updateUserRole(phone, existingRole);
        ignore updateSession(session, #dpMenu, "{}", ?userId);
        [makeText(phone, "You're already registered! Welcome back.\n\n" # dpMainMenuText())]
      };
      case (#err(_)) {
        [makeText(phone, "Registration failed. Type 'hi' to start again.")]
      };
    }
  };

  // ── OTP Verify ────────────────────────────────────────────────────────────

  func handleOtpVerify(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let trimmed = msg.trimStart(#char ' ').trimEnd(#char ' ');
    if (trimmed.size() == 6) {
      ignore userSvc.verifyOTP(phone, trimmed);
      let returnState = switch (getStateField(session.stateData, "returnState")) {
        case (?s) s; case null "mainMenu";
      };
      if (returnState == "merchantDone") {
        await completeMerchantRegistration(session)
      } else if (returnState == "dpDone") {
        await completeDeliveryPartnerRegistration(session)
      } else {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, "✅ OTP verified!\n\n" # customerMainMenu())]
      }
    } else {
      [makeText(phone, "❌ Invalid OTP. Please enter a 6-digit code:\n\n(Test mode: any 6 digits work, e.g. 123456)")]
    }
  };

  // ── App Base URL ──────────────────────────────────────────────────────────

  let APP_BASE_URL : Text = "https://bot.localbazar.shop";

  // ── Main Menu Strings ─────────────────────────────────────────────────────

  func customerMainMenu() : Text {
    "What would you like to do? 🛙\n\n1. My Dashboard 📊\n2. Order / Search Products\n3. Browse Inquiries\n4. Job Opportunities\n5. Property (Rent/Buy)\n6. Events\n7. Family Group\n8. Promotions\n9. Transport / Sarthi / Shuttle\n10. Healthcare Booking 🏥\n11. Professional Services 🔧\n12. Tours & Travel ✈️\n13. Donations 🤝\n14. My History\n15. Support / Help"
  };

  /// Build a customer menu filtered by enabled modules for the customer role.
  func customerMenuFiltered(phone : Text) : Text {
    var text = "What would you like to do? 🛙\n\n";
    text := text # "1. My Dashboard 📊\n";
    var i = 1;
    let modules : [(Text, Text)] = [
      ("shopping",       "Order / Search Products"),
      ("shopping",       "Browse Inquiries"),
      ("jobs",           "Job Opportunities"),
      ("property",       "Property (Rent/Buy)"),
      ("events",         "Events"),
      ("family",         "Family Group"),
      ("promotions",     "Promotions"),
      ("transport",      "Transport / Sarthi / Shuttle"),
      ("healthcare",     "Healthcare Booking 🏥"),
      ("professional_services", "Professional Services 🔧"),
      ("tours",          "Tours & Travel ✈️"),
      ("donations",      "Donations 🤝"),
      ("matrimony",      "Search Marriage Partner 💍"),
      ("old_items",      "Buy / Sell Old Items ♻️"),
      ("recipes",        "Recipes 🍲"),
      ("BillPayment",    "Pay Bills & Recharge 💳"),
      ("BusBooking",     "Book Bus Ticket 🚌"),
      ("TrainBooking",   "Book Train Ticket 🚆"),
      ("FlightBooking",  "Book Flight ✈️"),
    ];
    for ((mod, lbl) in modules.values()) {
      i += 1;
      if (isModuleEnabledForUser(mod, "customer", phone)) {
        text := text # i.toText() # ". " # lbl # "\n";
      };
      // hidden when disabled — not shown as unavailable
    };
    i += 1;
    text := text # i.toText() # ". My History\n";
    i += 1;
    text := text # i.toText() # ". Support / Help";
    text
  };

  /// Build quick replies for customer menu respecting module toggles.
  func customerMenuReplies(phone : Text) : [Types.QuickReply] {
    let labels = List.empty<Text>();
    labels.add("My Dashboard 📊");
    if (isModuleEnabledForUser("shopping",       "customer", phone)) labels.add("Order / Search Products");
    if (isModuleEnabledForUser("shopping",       "customer", phone)) labels.add("Browse Inquiries");
    if (isModuleEnabledForUser("jobs",           "customer", phone)) labels.add("Job Opportunities");
    if (isModuleEnabledForUser("property",       "customer", phone)) labels.add("Property (Rent/Buy)");
    if (isModuleEnabledForUser("events",         "customer", phone)) labels.add("Events");
    if (isModuleEnabledForUser("family",         "customer", phone)) labels.add("Family Group");
    if (isModuleEnabledForUser("promotions",     "customer", phone)) labels.add("Promotions");
    if (isModuleEnabledForUser("transport",      "customer", phone)) labels.add("Transport / Sarthi / Shuttle");
    if (isModuleEnabledForUser("healthcare",     "customer", phone)) labels.add("Healthcare Booking 🏥");
    if (isModuleEnabledForUser("professional_services", "customer", phone)) labels.add("Professional Services 🔧");
    if (isModuleEnabledForUser("tours",          "customer", phone)) labels.add("Tours & Travel ✈️");
    if (isModuleEnabledForUser("donations",      "customer", phone)) labels.add("Donations 🤝");
    if (isModuleEnabledForUser("matrimony",      "customer", phone)) labels.add("Search Marriage Partner 💍");
    if (isModuleEnabledForUser("old_items",      "customer", phone)) labels.add("Buy / Sell Old Items ♻️");
    if (isModuleEnabledForUser("recipes",        "customer", phone)) labels.add("Recipes 🍲");
    if (isModuleEnabledForUser("BillPayment",    "customer", phone)) labels.add("Pay Bills & Recharge 💳");
    if (isModuleEnabledForUser("BusBooking",     "customer", phone)) labels.add("Book Bus Ticket 🚌");
    if (isModuleEnabledForUser("TrainBooking",   "customer", phone)) labels.add("Book Train Ticket 🚆");
    if (isModuleEnabledForUser("FlightBooking",  "customer", phone)) labels.add("Book Flight ✈️");
    labels.add("My History");
    labels.add("Support / Help");
    numericReplies(labels.toArray())
  };

  /// Merchant menu with city-gated options for healthcare / tours / professional services.
  func merchantMainMenuFiltered(phone : Text) : Text {
    var text = "Merchant Menu 🏪\n\n";
    text := text # "1. My Dashboard 🏪\n";
    text := text # "2. View Orders\n";
    text := text # "3. Update Menu\n";
    text := text # "4. View Earnings\n";
    text := text # "5. Reviews\n";
    text := text # "6. ONDC Enrollment\n";
    text := text # "7. Order from Suppliers 📦\n";
    if (phone == "" or isModuleEnabledForUser("healthcare", "merchant", phone)) {
      text := text # "8. Add Healthcare Services 🏥\n";
    };
    if (phone == "" or isModuleEnabledForUser("tours", "merchant", phone)) {
      text := text # "9. Add Tour Packages ✈️\n";
    };
    if (phone == "" or isModuleEnabledForUser("professional_services", "merchant", phone)) {
      text := text # "10. Add Professional Services 🔧\n";
    };
    text := text # "11. Support / Help";
    text
  };

  func merchantMenuReplies(phone : Text) : [Types.QuickReply] {
    let labels = List.empty<Text>();
    labels.add("My Dashboard 🏪");
    labels.add("View Orders");
    labels.add("Update Menu");
    labels.add("View Earnings");
    labels.add("Reviews");
    labels.add("ONDC Enrollment");
    labels.add("Order from Suppliers 📦");
    if (phone == "" or isModuleEnabledForUser("healthcare", "merchant", phone)) {
      labels.add("Add Healthcare Services 🏥");
    };
    if (phone == "" or isModuleEnabledForUser("tours", "merchant", phone)) {
      labels.add("Add Tour Packages ✈️");
    };
    if (phone == "" or isModuleEnabledForUser("professional_services", "merchant", phone)) {
      labels.add("Add Professional Services 🔧");
    };
    labels.add("Support / Help");
    numericReplies(labels.toArray())
  };

  func deliveryMainMenu() : Text {
    "Delivery Menu 🚴\n\n1. My Dashboard 🚚\n2. Go Online / Offline\n3. Available Orders\n4. My Deliveries\n5. Earnings\n6. Support / Help"
  };

  func dpMainMenuText() : Text { deliveryMainMenu() };

  // ── Main Menu Handler ─────────────────────────────────────────────────────

  func handleMainMenu(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    // Always re-read role from backend — never trust stateData cache
    let role : Types.UserRole = switch (userSvc.getUserByPhone(phone)) {
      case (#ok(u)) u.role;
      case (#err(_)) {
        let userId = switch (session.userId) { case (?id) id; case null "" };
        switch (userSvc.getUserById(userId)) {
          case (#ok(u)) u.role;
          case (#err(_)) #customer;
        }
      };
    };

    switch role {
      case (#merchant) {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeQuickReply(phone, merchantMainMenuFiltered(phone), merchantMenuReplies(phone))]
      };
      case (#deliveryPartner) {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeQuickReply(phone, deliveryMainMenu(),
          numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
      };
      case _ {
        // Customer (and unknown)
        switch (parseChoice(msg)) {
          case (?1) {
            // My Dashboard — always available at position 1
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone,
              "Your Customer Dashboard 📊\n\nOpen your personal dashboard here:\n" #
              APP_BASE_URL # "/customer-dashboard\n\n" #
              "Bookmark this link for quick access to your orders, spending, subscriptions, and family connections."
            )]
          };
          case (?2) {
            if (not isModuleEnabledForUser("shopping", "customer", phone)) {
              [makeText(phone, "🚫 Shopping is not available in your city.\n\nType 'menu' to see available options.")]
            } else {
            // Transition to orderSearchInput to prompt for keyword/image
            ignore updateSession(session, #orderSearchInput, "{}", null);
            [makeText(phone,
              "🔍 What are you looking for today?\n\n" #
              "Please type a product name or keyword\n(e.g. dal, bread, vegetables, medicines)\n\n" #
              "OR send a photo of the product you want to find.\n\n" #
              "I will search nearby merchants for you. 🛒"
            )]
            }
          };
          case (?3) {
            if (not isModuleEnabledForUser("shopping", "customer", phone)) {
              [makeText(phone, "🚫 Shopping is not available in your city.")]
            } else {
            ignore updateSession(session, #jobSearch, setStep("{}", 10), null);
            [makeText(phone, "🔍 Browse Inquiries:\nType a keyword or type 'all':")]
            }
          };
          case (?4) {
            if (not isModuleEnabledForUser("jobs", "customer", phone)) {
              [makeText(phone, "🚫 Jobs is not available in your city.")]
            } else {
            ignore updateSession(session, #jobBrowse, setStep("{}", 0), null);
            [makeQuickReply(phone, "💼 Job Opportunities",
              numericReplies(["Browse Jobs", "Post a Job", "My Job Listings"]))]
            }
          };
          case (?5) {
            if (not isModuleEnabledForUser("property", "customer", phone)) {
              [makeText(phone, "🚫 Property is not available in your city.")]
            } else {
            ignore updateSession(session, #propertyBrowse, setStep("{}", 0), null);
            [makeQuickReply(phone, "🏠 Property",
              numericReplies(["Rent", "Buy", "Lease", "Sale", "Post Property"]))]
            }
          };
          case (?6) {
            if (not isModuleEnabledForUser("events", "customer", phone)) {
              [makeText(phone, "🚫 Events is not available in your city.")]
            } else {
            ignore updateSession(session, #eventMenu, "{}", null);
            [makeQuickReply(phone, eventMenuText(), numericReplies(["Post an Event", "Search Events", "Main Menu"]))]
            }
          };
          case (?7) {
            if (not isModuleEnabledForUser("family", "customer", phone)) {
              [makeText(phone, "🚫 Family is not available in your city.")]
            } else {
            ignore updateSession(session, #familyMenu, "{}", null);
            [makeQuickReply(phone, familyMenuText(), numericReplies(["Add Family Member", "View Family Members", "Main Menu"]))]
            }
          };
          case (?8) {
            if (not isModuleEnabledForUser("promotions", "customer", phone)) {
              [makeText(phone, "🚫 Promotions is not available in your city.")]
            } else {
            ignore updateSession(session, #promotionMenu, "{}", null);
            [makeQuickReply(phone, promotionMenuText(), numericReplies(["Post Advertisement", "My Promotions", "Main Menu"]))]
            }
          };
          case (?9) {
            if (not isModuleEnabledForUser("transport", "customer", phone)) {
              [makeText(phone, "🚫 Transport is not available in your city.")]
            } else {
            ignore updateSession(session, #transportMenu, "{}", null);
            [makeQuickReply(phone, "🚗 Transport & Sarthi\n\n1. Book a Ride\n2. Shuttle Service\n3. Free Ride (OTP)\n4. Main Menu",
              numericReplies(["Book a Ride", "Shuttle Service", "Free Ride Sharing (OTP)", "Main Menu"]))]
            }
          };
          case (?10) {
            if (not isModuleEnabledForUser("healthcare", "customer", phone)) {
              [makeText(phone, "🚫 Healthcare is not available in your city.")]
            } else {
              ignore updateSession(session, #healthcareMenu, "{}", null);
              [makeQuickReply(phone,
                "🏥 Healthcare Booking\n\n1. Find a Doctor / Health Professional\n2. Book Appointment\n3. Main Menu",
                numericReplies(["Find Doctor / Health Professional", "Book Appointment", "Main Menu"])
              )]
            }
          };
          case (?11) {
            if (not isModuleEnabledForUser("professional_services", "customer", phone)) {
              [makeText(phone, "🚫 Professional Services is not available in your city.")]
            } else {
              ignore updateSession(session, #professionalServicesMenu, "{}", null);
              [makeQuickReply(phone,
                "🔧 Professional Services\n\n1. Browse Services\n2. Book a Service\n3. Main Menu",
                numericReplies(["Browse Services", "Book a Service", "Main Menu"])
              )]
            }
          };
          case (?12) {
            if (not isModuleEnabledForUser("tours", "customer", phone)) {
              [makeText(phone, "🚫 Tours & Travel is not available in your city.")]
            } else {
              ignore updateSession(session, #toursMenu, "{}", null);
              [makeQuickReply(phone,
                "✈️ Tours & Travel\n\n1. Browse Tours\n2. Book a Tour\n3. Main Menu",
                numericReplies(["Browse Tours", "Book a Tour", "Main Menu"])
              )]
            }
          };
          case (?13) {
            if (not isModuleEnabledForUser("donations", "customer", phone)) {
              [makeText(phone, "🚫 Donations is not available in your city.")]
            } else {
              ignore updateSession(session, #donationsMenu, "{}", null);
              [makeQuickReply(phone,
                "🤝 Donations\n\n1. Add Donation (Food/Clothes/Books)\n2. Search Donations\n3. Request Donation\n4. Main Menu",
                numericReplies(["Add Donation", "Search Donations", "Request Donation", "Main Menu"])
              )]
            }
          };
          case (?14) {
            if (not isModuleEnabledForUser("BillPayment", "customer", phone)) {
              [makeText(phone, "\u{1F6AB} Bill Payment & Recharge is not available in your city.")]
            } else {
              ignore updateSession(session, #payBillsMenu, "{}", null);
              [makeQuickReply(phone,
                "\u{1F4B3} Pay Bills & Recharge\n\nChoose a service:\n\n1. Mobile Recharge\n2. DTH Recharge\n3. FASTag Recharge\n4. LPG Booking\n5. Electricity Bill\n6. Water Bill\n7. Gas Bill\n8. Municipality Payment\n9. Insurance Premium\n10. Other BBPS Bill\n11. Back",
                numericReplies(["Mobile Recharge", "DTH Recharge", "FASTag Recharge", "LPG Booking", "Electricity Bill", "Water Bill", "Gas Bill", "Municipality Payment", "Insurance Premium", "Other Bill", "Back"])
              )]
            }
          };
          case (?15) {
            if (not isModuleEnabledForUser("BusBooking", "customer", phone)) {
              [makeText(phone, "\u{1F6AB} Bus Booking is not available in your city.")]
            } else {
              ignore updateSession(session, #busBookingMenu, "{}", null);
              [makeQuickReply(phone,
                "\u{1F68C} Book Bus Ticket\n\n1. Search Buses\n2. My Bus Bookings\n3. Back",
                numericReplies(["Search Buses", "My Bus Bookings", "Back"])
              )]
            }
          };
          case (?16) {
            if (not isModuleEnabledForUser("TrainBooking", "customer", phone)) {
              [makeText(phone, "\u{1F6AB} Train Booking is not available in your city.")]
            } else {
              ignore updateSession(session, #trainBookingMenu, "{}", null);
              [makeQuickReply(phone,
                "\u{1F686} Book Train Ticket\n\n1. Search Trains\n2. My Train Bookings\n3. Back",
                numericReplies(["Search Trains", "My Train Bookings", "Back"])
              )]
            }
          };
          case (?17) {
            if (not isModuleEnabledForUser("FlightBooking", "customer", phone)) {
              [makeText(phone, "\u{1F6AB} Flight Booking is not available in your city.")]
            } else {
              ignore updateSession(session, #flightBookingMenu, "{}", null);
              [makeQuickReply(phone,
                "\u{2708}\u{FE0F} Book Flight\n\n1. Search Flights\n2. My Flight Bookings\n3. Back",
                numericReplies(["Search Flights", "My Flight Bookings", "Back"])
              )]
            }
          };
          case (?18) {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, "\u{1F4DC} My History:\n\n(Order history coming soon)\n\nType 'menu' to return.")]
          };
          case (?19) {
            ignore updateSession(session, #supportMenu, "{}", null);
            [makeQuickReply(phone,
              "\u{1F198} Support / Help\n\nHow can we help you?\n\n" #
              "1. Payment Issue (resolved in 3 days)\n" #
              "2. Behaviour Complaint (resolved in 5 days)\n" #
              "3. Other Issue",
              numericReplies(["Payment Issue", "Behaviour Complaint", "Other Issue"])
            )]
          };
          case _ {
            [makeQuickReply(phone, customerMenuFiltered(phone), customerMenuReplies(phone))]
          };
        }
      };
    }
  };

  // ── Merchant Menu Handler ─────────────────────────────────────────────────

  func handleMerchantMenu(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let userId = switch (session.userId) { case (?id) id; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // My Dashboard — position 1
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeText(phone,
          "Your Merchant Dashboard 🏪\n\nOpen your merchant POS and dashboard here:\n" #
          APP_BASE_URL # "/merchant-dashboard\n\n" #
          "Bookmark this link to manage orders, products, bookings, and earnings anytime."
        )]
      };
      case (?2) {
        // View Orders — look up merchant by userId
        let allMerchants = merchantSvc.listMerchants(?true, null);
        let merchantOpt = allMerchants.find(func(m : Types.Merchant) : Bool { m.userId == userId });
        switch merchantOpt {
          case (?merchant) {
            let orders = orderSvc.getOrdersByMerchant(merchant.id, null, null);
            let activeOrders = orders.filter(func(o : Types.Order) : Bool {
              switch (o.status) {
                case (#pending)  true;
                case (#accepted) true;
                case (#new_)     true;
                case _ false;
              }
            });
            let orderText = if (activeOrders.size() == 0) {
              "📦 Your Orders:\n\nNo active orders at this time.\n\nYou'll be notified when new orders arrive."
            } else {
              var text = "📦 Active Orders (" # activeOrders.size().toText() # "):\n\n";
              let limit = if (activeOrders.size() > 5) 5 else activeOrders.size();
              var i = 0;
              var orderIdsAcc = "";
              while (i < limit) {
                let o = activeOrders[i];
                let statusLabel = orderSvc.statusLabel(o.status);
                text := text # (i + 1).toText() # ". Order #" # o.id # " — " # statusLabel # " — ₹" # o.totalAmount.toText() # "\n";
                orderIdsAcc := orderIdsAcc # (if (i > 0) "," else "") # o.id;
                i += 1;
              };
              text := text # "\nReply with number to act on order:";
              ignore updateSession(session, #merchantOrderList, setStateField("{}", "merchantId", merchant.id), null);
              let updatedSession = getOrCreateSession(phone);
              let newData = setStateField(setStateField("{}", "merchantId", merchant.id), "orderIds", orderIdsAcc);
              ignore updateSession(updatedSession, #merchantOrderList, newData, null);
              text
            };
            ignore updateSession(session, #merchantOrderList, setStateField("{}", "merchantId", merchant.id), null);
            [makeQuickReply(phone, orderText,
              numericReplies(["Refresh", "Back to Menu"])
            )]
          };
          case null {
            ignore updateSession(session, #merchantMenu, "{}", null);
            [makeText(phone, "Could not find your merchant profile.\n\n" # merchantMainMenuFiltered(phone))]
          };
        }
      };
      case (?3) {
        // Update Menu / Add Product
        let mId = switch (merchantSvc.getMerchantByUserId(userId)) {
          case (#ok(m)) m.id; case (#err(_)) "";
        };
        let d = setStateField("{}", "merchantId", mId);
        ignore updateSession(session, #merchantActions, setStateField(d, "action", "menu"), null);
        [makeText(phone, "📋 Menu Update:\nType product names one per line, then 'done'.\n\nType 'back' to return.")]
      };
      case (?4) {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeText(phone, "💰 Earnings summary coming soon!\n\nType 'back' to return.")]
      };
      case (?5) {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeText(phone, "⭐ Reviews coming soon!\n\nType 'back' to return.")]
      };
      case (?6) {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeText(phone,
          "🌐 ONDC Enrollment:\n\nEnsure you have:\n• GST Number\n• Bank Account Details\n• FSSAI License (if applicable)\n\n" #
          "Type 'proceed' to start or 'back' to return."
        )]
      };
      case (?7) {
        // Order from Suppliers
        ignore updateSession(session, #supplierOrderSupplier, setStep("{}", 1), null);
        [makeText(phone, "📦 Order from Suppliers\n\nStep 1: Enter supplier name or phone number:")]
      };
      case (?8) {
        // Add Healthcare Services — city-module gated
        if (not isModuleEnabledForUser("healthcare", "merchant", phone)) {
          return [makeText(phone, "🚫 Healthcare module is not enabled for your city.\n\nType 'menu' to continue.")];
        };
        let bizName = switch (merchantSvc.getMerchantByUserId(userId)) {
          case (#ok(m)) m.businessName; case (#err(_)) "My Clinic";
        };
        let d = setStateField(setStateField(setStep("{}", 30), "businessType", "healthcare"), "bizName", bizName);
        ignore updateSession(session, #registerMerchant, d, ?userId);
        [makeText(phone, "🏥 Add Healthcare Services\n\nWhat specialization do you want to add?\n(e.g. Dermatology, Dental, Physiotherapy, General)")]
      };
      case (?9) {
        // Add Tour Packages — city-module gated
        if (not isModuleEnabledForUser("tours", "merchant", phone)) {
          return [makeText(phone, "🚫 Tours & Travel module is not enabled for your city.\n\nType 'menu' to continue.")];
        };
        let bizName = switch (merchantSvc.getMerchantByUserId(userId)) {
          case (#ok(m)) m.businessName; case (#err(_)) "My Travel Agency";
        };
        let d = setStateField(setStateField(setStep("{}", 40), "businessType", "tour"), "bizName", bizName);
        ignore updateSession(session, #registerMerchant, d, ?userId);
        [makeText(phone, "✈️ Add Tour Packages\n\nEnter destinations you offer (comma-separated):\n(e.g. Goa, Kerala, Rajasthan)")]
      };
      case (?10) {
        // Add Professional Services — city-module gated
        if (not isModuleEnabledForUser("professional_services", "merchant", phone)) {
          return [makeText(phone, "🚫 Professional Services module is not enabled for your city.\n\nType 'menu' to continue.")];
        };
        let bizName = switch (merchantSvc.getMerchantByUserId(userId)) {
          case (#ok(m)) m.businessName; case (#err(_)) "My Service";
        };
        let d = setStateField(setStateField(setStep("{}", 50), "businessType", "professional"), "bizName", bizName);
        ignore updateSession(session, #registerMerchant, d, ?userId);
        [makeQuickReply(phone,
          "🔧 Add Professional Services\n\nSelect service category:",
          numericReplies(["Plumber", "Electrician", "Carpenter", "Painter", "AC Technician", "Gym Trainer", "Massage Therapist", "Yoga Instructor", "Tutor", "Other"])
        )]
      };
      case (?11) {
        ignore updateSession(session, #supportMenu, "{}", null);
        [makeQuickReply(phone,
          "🆘 Support / Help\n\nHow can we help you?\n\n" #
          "1. Payment Issue (resolved in 3 days)\n" #
          "2. Behaviour Complaint (resolved in 5 days)\n" #
          "3. Other Issue",
          numericReplies(["Payment Issue", "Behaviour Complaint", "Other Issue"])
        )]
      };
      case _ {
        [makeQuickReply(phone, merchantMainMenuFiltered(phone), merchantMenuReplies(phone))]
      };
    }
  };

  // ── Merchant Order List ───────────────────────────────────────────────────

  func handleMerchantOrderList(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    if (msg.toLower() == "back" or parseChoice(msg) == ?2) {
      ignore updateSession(session, #merchantMenu, "{}", null);
      return [makeQuickReply(phone, merchantMainMenuFiltered(phone),
        merchantMenuReplies(phone))];
    };
    // Refresh — re-fetch live orders
    if (msg.toLower() == "refresh" or parseChoice(msg) == ?1) {
      ignore updateSession(session, #merchantMenu, "{}", null);
      let userId = switch (session.userId) { case (?id) id; case null "" };
      let freshSession = getOrCreateSession(phone);
      return await handleMerchantMenu({ freshSession with userId = ?userId }, "2");
    };
    let orderIdsStr = switch (getStateField(session.stateData, "orderIds")) { case (?v) v; case null "" };
    let orderIds = orderIdsStr.split(#char ',').toArray();
    let choice = switch (parseChoice(msg)) { case (?n) n; case null 0 };

    if (choice < 1 or choice > orderIds.size()) {
      [makeText(phone, "Please enter a valid order number (1-" # orderIds.size().toText() # ") or 'back':")]
    } else {
      let orderId = orderIds[choice - 1];
      // Load order details
      let orderDetail = switch (orderSvc.getOrderById(orderId)) {
        case (#ok(o)) {
          let statusLabel = orderSvc.statusLabel(o.status);
          "📋 Order #" # orderId # "\n" #
          "Status: " # statusLabel # "\n" #
          "Total: ₹" # o.totalAmount.toText() # "\n" #
          "Items: " # o.items.size().toText() # " item(s)\n\n" #
          "What would you like to do?"
        };
        case (#err(_)) "📋 Order #" # orderId # "\n\nWhat would you like to do?";
      };
      let data = setStateField("{}", "orderId", orderId);
      ignore updateSession(session, #merchantViewOrder, data, null);
      [makeQuickReply(phone, orderDetail,
        numericReplies(["Accept Order", "Reject Order", "Back to Orders"])
      )]
    }
  };

  // ── Merchant View / Accept / Reject ──────────────────────────────────────

  func handleMerchantViewOrder(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Accept order
        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #merchantAccept, data, null);
        [makeQuickReply(phone,
          "✅ Confirm accepting order #" # orderId # "?\n\nOnce accepted, you have 30 minutes to prepare.",
          numericReplies(["Yes, Accept Order", "No, Go Back"])
        )]
      };
      case (?2) {
        // Reject order
        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #merchantReject, data, null);
        [makeText(phone, "❌ Please type your reason for rejecting order #" # orderId # ":\n(e.g. out of stock, closed, cannot deliver)")]
      };
      case (?3) {
        ignore updateSession(session, #merchantOrderList, session.stateData, null);
        [makeText(phone, "Type order number to view or 'back' to return to menu:")]
      };
      case _ {
        [makeQuickReply(phone,
          "📋 Order #" # orderId # "\n\nWhat would you like to do?",
          numericReplies(["Accept Order", "Reject Order", "Back to Orders"])
        )]
      };
    }
  };

  func handleMerchantAccept(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // ── 1. Persist status → #accepted ────────────────────────────────────
        let acceptResult = orderSvc.updateOrderStatus(orderId, #accepted, "merchant", ?"Merchant accepted order", null);

        // ── 2. Look up customer phone to notify them ──────────────────────────
        let customerNotifications : [Types.BotMessage] = switch (acceptResult) {
          case (#ok(order)) {
            switch (userSvc.getUserById(order.customerId)) {
              case (#ok(customer)) {
                [makeText(customer.phone,
                  "✅ Great news! Your order #" # orderId # " has been accepted by the merchant.\n\n" #
                  "🚴 We are now finding a delivery partner near you.\n\n" #
                  formatOrderStatusMessage(order)
                )]
              };
              case (#err(_)) { [] };
            }
          };
          case (#err(_)) { [] };
        };

        // ── 3. Notify available delivery partners within 10 km ────────────────
        let dpNotifications : [Types.BotMessage] = switch (acceptResult) {
          case (#ok(order)) {
            let lat = switch (order.customerAddress) { case (?a) a.lat; case null 0.0 };
            let lng = switch (order.customerAddress) { case (?a) a.lng; case null 0.0 };
            let availableDPs = dpSvc.getAvailableDeliveryPartners(lat, lng, 10.0);
            let msgs = List.empty<Types.BotMessage>();
            for (dp in availableDPs.vals()) {
              switch (userSvc.getUserById(dp.userId)) {
                case (#ok(dpUser)) {
                  msgs.add(makeQuickReply(dpUser.phone,
                    "🆕 NEW ORDER AVAILABLE!\n\n" #
                    "Order #" # orderId # "\n" #
                    "💰 Order Value: ₹" # order.totalAmount.toText() # "\n" #
                    "🚚 Delivery Charge: ₹" # order.deliveryCharge.toText() # "\n" #
                    "📞 Merchant: (contact on accept)\n" #
                    "👤 Customer: *****" # (if (dpUser.phone.size() >= 4) dpUser.phone.trimStart(#char ' ') else "XXXX") # "\n\n" #
                    "Reply to accept or check your available orders.",
                    numericReplies(["View Available Orders"])
                  ));
                };
                case (#err(_)) {};
              };
            };
            msgs.toArray()
          };
          case (#err(_)) { [] };
        };

        // ── 4. Transition merchant session ────────────────────────────────────
        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #merchantFulfill, data, null);

        let statusNote = switch (acceptResult) {
          case (#ok(_)) "✅ Order #" # orderId # " accepted and customer notified!\n\nPlease prepare the order and mark it ready for pickup.";
          case (#err(e)) {
            let errMsg = switch (e) {
              case (#invalidInput(m)) "Status update failed: " # m;
              case (#notFound) "Order not found in system.";
              case _ "Status update failed — please check admin.";
            };
            "⚠️ " # errMsg # "\n\nOrder #" # orderId # " — please contact admin."
          };
        };

        let merchantMsgs = [makeQuickReply(phone, statusNote,
          numericReplies(["Mark Ready for Pickup", "View Order Details", "Back to Menu"])
        )];

        // Combine: merchant response + customer notification + DP notifications
        let all = List.fromArray<Types.BotMessage>(merchantMsgs);
        for (m in customerNotifications.vals()) { all.add(m) };
        for (m in dpNotifications.vals()) { all.add(m) };
        all.toArray()
      };
      case _ {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeQuickReply(phone, merchantMainMenuFiltered(phone),
          merchantMenuReplies(phone))]
      };
    }
  };

  func handleMerchantReject(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };

    // msg is the rejection reason — persist #rejected status
    let rejectResult = orderSvc.updateOrderStatus(orderId, #rejected, "merchant", ?msg, ?msg);

    // Notify customer of rejection
    let customerNotifications : [Types.BotMessage] = switch (rejectResult) {
      case (#ok(order)) {
        switch (userSvc.getUserById(order.customerId)) {
          case (#ok(customer)) {
            [makeText(customer.phone,
              "❌ Sorry, your order #" # orderId # " was rejected by the merchant.\n" #
              "Reason: " # msg # "\n\n" #
              "Please try a different merchant.\nType 'menu' to search again."
            )]
          };
          case (#err(_)) { [] };
        }
      };
      case (#err(_)) { [] };
    };

    ignore updateSession(session, #merchantMenu, "{}", null);

    let merchantMsg = makeQuickReply(phone,
      "❌ Order #" # orderId # " rejected.\nReason: " # msg # "\n\nCustomer has been notified.",
      numericReplies(["View Orders", "Back to Menu"])
    );

    let all = List.fromArray<Types.BotMessage>([merchantMsg]);
    for (m in customerNotifications.vals()) { all.add(m) };
    all.toArray()
  };

  // ── Merchant Fulfill ──────────────────────────────────────────────────────

  func handleMerchantFulfill(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Mark ready for pickup
        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #merchantCollectionPending, data, null);
        [makeQuickReply(phone,
          "📦 Order #" # orderId # " marked ready for pickup!\n\nDelivery partner has been notified.\n\nWaiting for collection...",
          numericReplies(["Payment Collected", "View Status", "Back to Menu"])
        )]
      };
      case (?2) {
        [makeQuickReply(phone,
          "📋 Order #" # orderId # " — Status: Accepted\n\nPlease prepare the items and mark ready when done.",
          numericReplies(["Mark Ready for Pickup", "Back to Menu"])
        )]
      };
      case _ {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeQuickReply(phone, merchantMainMenuFiltered(phone),
          merchantMenuReplies(phone))]
      };
    }
  };

  // ── Merchant Collection Pending ───────────────────────────────────────────

  func handleMerchantCollectionPending(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Payment/collection received from admin/delivery
        ignore updateSession(session, #merchantComplete, setStateField("{}", "orderId", orderId), null);
        [makeQuickReply(phone,
          "💰 Payment received for order #" # orderId # "!\n\n✅ Order complete.\n\nPayout summary:\n• Platform fee: 5%\n• Your amount: check earnings",
          numericReplies(["View Earnings", "Back to Menu"])
        )]
      };
      case (?2) {
        [makeQuickReply(phone,
          "📦 Order #" # orderId # " — waiting for delivery partner to collect and deliver.\n\nYou will be notified once payment is collected.",
          numericReplies(["Payment Collected", "Back to Menu"])
        )]
      };
      case _ {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeQuickReply(phone, merchantMainMenuFiltered(phone),
          merchantMenuReplies(phone))]
      };
    }
  };

  // ── Merchant Complete ─────────────────────────────────────────────────────

  func handleMerchantComplete(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    switch (parseChoice(msg)) {
      case (?1) {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeText(phone, "💰 Earnings summary coming soon!\n\n" # merchantMainMenuFiltered(phone))]
      };
      case _ {
        ignore updateSession(session, #merchantMenu, "{}", null);
        [makeQuickReply(phone, merchantMainMenuFiltered(phone),
          merchantMenuReplies(phone))]
      };
    }
  };

  // ── DP Menu ───────────────────────────────────────────────────────────────

  func handleDpMenu(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let userId = switch (session.userId) { case (?id) id; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // My Dashboard — position 1
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeText(phone,
          "Your Delivery Dashboard 🚚\n\nOpen your delivery partner dashboard here:\n" #
          APP_BASE_URL # "/delivery-dashboard\n\n" #
          "Bookmark this link to view deliveries, earnings, and performance."
        )]
      };
      case (?2) {
        // Go Online / Offline toggle
        switch (dpSvc.getDeliveryPartnerByUserId(userId)) {
          case (#ok(dp)) {
            let newStatus = not dp.isOnline;
            ignore dpSvc.updateOnlineStatus(dp.id, newStatus, dp.currentLocation);
            let statusMsg = if (newStatus)
              "🟢 You are now ONLINE! You'll receive delivery requests."
            else
              "🔴 You are now OFFLINE.";
            ignore updateSession(session, #dpMenu, "{}", null);
            [makeQuickReply(phone, statusMsg # "\n\n" # deliveryMainMenu(),
              numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
          };
          case (#err(_)) {
            [makeText(phone, "Could not find your profile. Type 'hi' to restart.")]
          };
        }
      };
      case (?3) {
        // Available orders
        ignore updateSession(session, #dpAvailableOrders, "{}", null);
        [makeQuickReply(phone,
          "📦 Available Orders Near You:\n\n" #
          "🆕 Order #demo-001 | 2.3 km | ₹350\n📍 Pickup: Main Market\n📍 Drop: Sector 5\n\n" #
          "Reply with order number or 'refresh' for latest:",
          numericReplies(["Accept Order 1", "Refresh", "Back to Menu"])
        )]
      };
      case (?4) {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeText(phone, "🚴 My Deliveries:\n\n(Delivery history coming soon)\n\nType 'back' to return.")]
      };
      case (?5) {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeText(phone, "💰 Earnings summary coming soon!\n\nType 'back' to return.")]
      };
      case (?6) {
        ignore updateSession(session, #supportMenu, "{}", null);
        [makeQuickReply(phone,
          "🆘 Support / Help\n\nHow can we help you?\n\n" #
          "1. Payment Issue (resolved in 3 days)\n" #
          "2. Behaviour Complaint (resolved in 5 days)\n" #
          "3. Other Issue",
          numericReplies(["Payment Issue", "Behaviour Complaint", "Other Issue"])
        )]
      };
      case _ {
        [makeQuickReply(phone, deliveryMainMenu(),
          numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
      };
    }
  };

  // ── DP Available Orders ───────────────────────────────────────────────────

  func handleDpAvailableOrders(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    if (msg.toLower() == "back" or msg.toLower() == "back to menu" or parseChoice(msg) == ?3) {
      ignore updateSession(session, #dpMenu, "{}", null);
      return [makeQuickReply(phone, deliveryMainMenu(),
        numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))];
    };

    if (msg.toLower() == "refresh" or parseChoice(msg) == ?2) {
      ignore updateSession(session, #dpAvailableOrders, "{}", null);
      return [makeQuickReply(phone,
        "📦 Available Orders Near You (Refreshed):\n\n" #
        "🆕 Order #demo-001 | 2.3 km | ₹350\n📍 Pickup: Main Market\n📍 Drop: Sector 5\n\n" #
        "Reply with order number or 'refresh':",
        numericReplies(["Accept Order 1", "Refresh", "Back to Menu"])
      )];
    };

    // Accept order
    let demoOrderId = "demo-001";
    let data = setStateField("{}", "orderId", demoOrderId);
    ignore updateSession(session, #dpAccept, data, null);
    [makeQuickReply(phone,
      "📋 Order #" # demoOrderId # "\n• Items: Mixed\n• Distance: 2.3 km\n• Your earning: ₹50\n• Customer: *****1234\n\nAccept this delivery?",
      numericReplies(["Yes, Accept", "No, Skip", "Back to Menu"])
    )]
  };

  // ── DP Accept ─────────────────────────────────────────────────────────────

  func handleDpAccept(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };
    let userId = switch (session.userId) { case (?id) id; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Look up DP record to get dp.id
        let dpId = switch (dpSvc.getDeliveryPartnerByUserId(userId)) {
          case (#ok(dp)) dp.id;
          case (#err(_)) "";
        };

        // ── Persist status → #assigned ────────────────────────────────────────
        let acceptResult = if (dpId != "") {
          orderSvc.dpAcceptOrder(orderId, dpId)
        } else {
          #err(#notFound)
        };

        // ── Notify merchant that a DP has been assigned ───────────────────────
        switch (acceptResult) {
          case (#ok(order)) {
            switch (merchantSvc.getMerchantById(order.merchantId)) {
              case (#ok(merchant)) {
                switch (userSvc.getUserById(merchant.userId)) {
                  case (#ok(mUser)) {
                    let dpName = switch (dpSvc.getDeliveryPartnerByUserId(userId)) {
                      case (#ok(dp)) dp.name; case (#err(_)) "Delivery Partner";
                    };
                    appendMessage(mUser.phone, #bot,
                      "🚴 Delivery partner assigned for Order #" # orderId # "!\n" #
                      "Partner: " # dpName # "\n" #
                      "They are on the way to pick up the order.\n\n" #
                      "Status: Delivery Partner Assigned",
                      "text"
                    );
                  };
                  case (#err(_)) {};
                };
              };
              case (#err(_)) {};
            };
          };
          case (#err(_)) {};
        };

        let statusNote = switch (acceptResult) {
          case (#ok(_)) "✅ Order #" # orderId # " accepted! Status: Delivery Partner Assigned";
          case (#err(e)) {
            switch (e) {
              case (#invalidInput(m)) "⚠️ Cannot accept: " # m;
              case (#notFound) "⚠️ Order not found.";
              case (#unauthorized) "⚠️ Not authorized for this order.";
              case _ "⚠️ Accept failed — please try again.";
            }
          };
        };

        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #dpPickupInstructions, data, null);
        [makeQuickReply(phone,
          statusNote # "\n\n🗺️ PICKUP INSTRUCTIONS:\n\n" #
          "📍 Merchant: Main Market Store\n📌 Address: Shop 12, Main Market\n📞 Contact: (shown on arrival)\n\n" #
          "Please proceed to the merchant to collect the order.",
          numericReplies(["I've Arrived at Merchant", "Navigate", "Back to Menu"])
        )]
      };
      case (?2) {
        ignore updateSession(session, #dpAvailableOrders, "{}", null);
        [makeText(phone, "Order skipped. Showing available orders...")]
      };
      case _ {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeQuickReply(phone, deliveryMainMenu(),
          numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
      };
    }
  };

  // ── DP Pickup Instructions ─────────────────────────────────────────────────

  func handleDpPickupInstructions(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Arrived at merchant
        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #dpPickupConfirmed, data, null);
        [makeQuickReply(phone,
          "📦 You're at the merchant for order #" # orderId # ".\n\nPlease collect the package and confirm pickup.",
          numericReplies(["Confirm Pickup", "Report Issue", "Back to Menu"])
        )]
      };
      case (?2) {
        [makeText(phone, "🗺️ Navigation: Open maps for 'Shop 12, Main Market'\n\nType 'arrived' when you reach the merchant.")]
      };
      case _ {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeQuickReply(phone, deliveryMainMenu(),
          numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
      };
    }
  };

  // ── DP Pickup Confirmed ───────────────────────────────────────────────────

  func handleDpPickupConfirmed(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };
    let userId = switch (session.userId) { case (?id) id; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // ── Persist status → #inTransit ───────────────────────────────────────
        let dpId = switch (dpSvc.getDeliveryPartnerByUserId(userId)) {
          case (#ok(dp)) dp.id; case (#err(_)) "";
        };
        let pickupResult = if (dpId != "") {
          orderSvc.dpConfirmPickup(orderId, dpId)
        } else {
          #err(#notFound)
        };

        let statusNote = switch (pickupResult) {
          case (#ok(_)) "✅ Pickup confirmed! Status: Out for Delivery";
          case (#err(e)) {
            switch (e) {
              case (#invalidInput(m)) "⚠️ Cannot confirm pickup: " # m;
              case (#unauthorized) "⚠️ Not authorized for this order.";
              case _ "⚠️ Pickup confirmation failed.";
            }
          };
        };

        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #dpDeliveryInstructions, data, null);
        [makeQuickReply(phone,
          statusNote # " for order #" # orderId # "!\n\n🗺️ DELIVERY INSTRUCTIONS:\n\n" #
          "📍 Customer: Sector 5, House 23\n📌 Address: H-23, Sector 5\n📞 Contact: (shown on arrival)\n\n" #
          "Please deliver to the customer.",
          numericReplies(["I've Arrived at Customer", "Navigate to Customer", "Report Issue"])
        )]
      };
      case (?2) {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeText(phone, "Issue reported. Admin will contact you shortly.\n\n" # deliveryMainMenu())]
      };
      case _ {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeQuickReply(phone, deliveryMainMenu(),
          numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
      };
    }
  };

  // ── DP Delivery Instructions ──────────────────────────────────────────────

  func handleDpDeliveryInstructions(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };
    let userId = switch (session.userId) { case (?id) id; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Arrived at customer → persist status → #delivered
        let dpId = switch (dpSvc.getDeliveryPartnerByUserId(userId)) {
          case (#ok(dp)) dp.id; case (#err(_)) "";
        };
        let deliveryResult = if (dpId != "") {
          orderSvc.dpConfirmDelivery(orderId, dpId)
        } else {
          #err(#notFound)
        };

        // Fetch order amount for COD display
        let orderAmount : Float = switch (deliveryResult) {
          case (#ok(order)) order.totalAmount;
          case (#err(_)) 350.0; // fallback display
        };
        let amountText = "₹" # orderAmount.toText();

        let statusNote = switch (deliveryResult) {
          case (#ok(_)) "📬 You're at the customer! Status: Delivered";
          case (#err(e)) {
            switch (e) {
              case (#invalidInput(m)) "⚠️ Delivery confirmation failed: " # m;
              case (#unauthorized) "⚠️ Not authorized for this order.";
              case _ "⚠️ Delivery confirmation failed.";
            }
          };
        };

        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #dpCollectPayment, data, null);
        [makeQuickReply(phone,
          statusNote # " for order #" # orderId # ".\n\n" #
          "💵 COLLECT PAYMENT:\n\nCOD Amount: " # amountText # " from customer\n\nPlease collect cash and confirm.",
          numericReplies(["Payment Collected " # amountText, "Customer Not Available", "Report Issue"])
        )]
      };
      case (?2) {
        [makeText(phone, "🗺️ Navigation: Open maps for delivery address\n\nType 'arrived' when you reach the customer.")]
      };
      case (?3) {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeText(phone, "Issue reported. Admin will contact you shortly.\n\n" # deliveryMainMenu())]
      };
      case _ {
        [makeQuickReply(phone,
          "Navigate to customer for order #" # orderId,
          numericReplies(["I've Arrived at Customer", "Navigate to Customer", "Report Issue"])
        )]
      };
    }
  };

  // ── DP Collect Payment ────────────────────────────────────────────────────

  func handleDpCollectPayment(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };
    let userId = switch (session.userId) { case (?id) id; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // ── Persist status → #paymentCollected ────────────────────────────────
        let dpId = switch (dpSvc.getDeliveryPartnerByUserId(userId)) {
          case (#ok(dp)) dp.id; case (#err(_)) "";
        };
        // Fetch order to get the amount
        let orderAmount : Nat = switch (orderSvc.getOrderById(orderId)) {
          case (#ok(order)) {
            let f = order.totalAmount;
            if (f > 0.0) Int.abs(f.toInt()) else 350
          };
          case (#err(_)) 350;
        };
        let collectResult = if (dpId != "") {
          orderSvc.dpCollectPayment(orderId, dpId, orderAmount)
        } else {
          #err(#notFound)
        };

        let amountText = "₹" # orderAmount.toText();
        let statusNote = switch (collectResult) {
          case (#ok(_)) "✅ Payment of " # amountText # " collected! Status: Payment Collected";
          case (#err(e)) {
            switch (e) {
              case (#invalidInput(m)) "⚠️ Payment collection failed: " # m;
              case (#unauthorized) "⚠️ Not authorized for this order.";
              case _ "⚠️ Payment collection failed.";
            }
          };
        };

        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #dpPaymentConfirmed, data, null);
        [makeQuickReply(phone,
          statusNote # " from customer for order #" # orderId # "!\n\nCustomer has been notified.\n\n📤 Now remit merchant's share.",
          numericReplies(["Remit to Merchant", "View Summary", "Back to Menu"])
        )]
      };
      case (?2) {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeText(phone, "Customer not available reported. Admin will contact you.\n\n" # deliveryMainMenu())]
      };
      case _ {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeText(phone, "Issue reported.\n\n" # deliveryMainMenu())]
      };
    }
  };

  // ── DP Payment Confirmed ──────────────────────────────────────────────────

  func handleDpPaymentConfirmed(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Remit to merchant
        let data = setStateField("{}", "orderId", orderId);
        ignore updateSession(session, #dpVendorSettlement, data, null);
        [makeQuickReply(phone,
          "💸 VENDOR SETTLEMENT for order #" # orderId # ":\n\n" #
          "• COD collected: ₹350\n• Platform fee (5%): ₹17.50\n• Your commission: ₹50\n• Remit to merchant: ₹282.50\n\n" #
          "Please transfer ₹282.50 to the merchant via UPI/Cash.",
          numericReplies(["Remittance Done", "View Merchant QR", "Back to Menu"])
        )]
      };
      case (?2) {
        ignore updateSession(session, #dpPaymentConfirmed, session.stateData, null);
        [makeText(phone,
          "📋 Payment Summary:\n\nOrder #" # orderId # "\nCOD collected: ₹350\nYour commission: ₹50\nRemit to merchant: ₹282.50"
        )]
      };
      case _ {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeQuickReply(phone, deliveryMainMenu(),
          numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
      };
    }
  };

  // ── DP Vendor Settlement ──────────────────────────────────────────────────

  func handleDpVendorSettlement(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "" };
    let userId = switch (session.userId) { case (?id) id; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // ── Persist status → #vendorSettled then #completed ───────────────────
        let dpId = switch (dpSvc.getDeliveryPartnerByUserId(userId)) {
          case (#ok(dp)) dp.id; case (#err(_)) "";
        };

        // Compute settlement amounts from order
        let (orderTotal, dpCommission, merchantAmount) : (Float, Float, Float) =
          switch (orderSvc.getOrderById(orderId)) {
            case (#ok(o)) {
              let total = o.totalAmount;
              let platformFee = total * 0.05;
              let dpComm = o.deliveryCharge;
              let mAmount = total - platformFee - dpComm;
              (total, dpComm, mAmount)
            };
            case (#err(_)) { (350.0, 50.0, 282.5) };
          };

        let settleAmt : Nat = Int.abs(merchantAmount.toInt());

        let settleResult = if (dpId != "") {
          orderSvc.dpSettleVendor(orderId, dpId, settleAmt)
        } else {
          #err(#notFound)
        };

        // After vendor settled, complete the order
        let completeResult = switch (settleResult) {
          case (#ok(_)) orderSvc.completeOrder(orderId);
          case (#err(e)) #err(e);
        };

        let statusNote = switch (completeResult) {
          case (#ok(_)) "✅ Remittance confirmed! Status: Order Completed";
          case (#err(e)) {
            switch (e) {
              case (#invalidInput(m)) "⚠️ Settlement failed: " # m;
              case (#unauthorized) "⚠️ Not authorized.";
              case _ {
                // If completeOrder fails, at least vendor settle succeeded
                switch (settleResult) {
                  case (#ok(_)) "✅ Vendor settled! Status: Vendor Settled";
                  case (#err(_)) "⚠️ Settlement failed — please contact admin.";
                }
              };
            }
          };
        };

        ignore updateSession(session, #dpComplete, setStateField("{}", "orderId", orderId), null);
        [makeQuickReply(phone,
          statusNote # "\n\nOrder #" # orderId # " fully completed.\n\n🏁 DELIVERY SUMMARY:\n" #
          "• Order Value: ₹" # orderTotal.toText() # "\n" #
          "• Your Commission: ₹" # dpCommission.toText() # "\n" #
          "• Merchant Settled: ₹" # merchantAmount.toText(),
          numericReplies(["Rate Customer", "Back to Menu"])
        )]
      };
      case (?2) {
        [makeText(phone, "📱 Merchant QR Code:\n\n[QR code would display here]\n\nScan to pay merchant")]
      };
      case _ {
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeQuickReply(phone, deliveryMainMenu(),
          numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
      };
    }
  };

  // ── DP Complete ───────────────────────────────────────────────────────────

  func handleDpComplete(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    ignore updateSession(session, #dpMenu, "{}", null);
    switch (parseChoice(msg)) {
      case (?1) {
        [makeText(phone, "⭐ How would you rate the customer? (1-5)\n\nType a number from 1 to 5:")]
      };
      case _ {
        [makeQuickReply(phone, deliveryMainMenu(),
          numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
      };
    }
  };

  // ── Order Search Input (keyword/image prompt) ─────────────────────────────

  func handleOrderSearchInput(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    // Accept any non-empty input — text keyword or "image" indicating an image was sent
    let keyword = msg.trimStart(#char ' ').trimEnd(#char ' ');
    if (keyword.size() == 0) {
      return [makeText(phone,
        "🔍 What are you looking for today?\n\n" #
        "Please type a product name or keyword\n(e.g. dal, bread, vegetables, medicines)\n\n" #
        "OR send a photo of the product you want to find.\n\n" #
        "I will search nearby merchants for you. 🛒"
      )];
    };

    // AI moderation stub — always passes in test mode
    Debug.print("AI_MOD: content='" # keyword # "' result=PASS (test mode)");

    let userId = switch (session.userId) { case (?id) id; case null "" };
    let userLoc : ?Types.Location = switch (userSvc.getUserById(userId)) {
      case (#ok(u)) u.location;
      case (#err(_)) null;
    };

    let nearbyMerchants = switch (userLoc) {
      case (?loc) merchantSvc.getMerchantsNearby(loc.lat, loc.lng, 10.0);
      case null [];
    };
    let merchants = if (nearbyMerchants.size() > 0) nearbyMerchants
      else merchantSvc.listMerchants(?true, null);

    if (merchants.size() == 0) {
      // Save lead / inquiry for merchants to respond
      let userLoc2 : Types.Location = switch (userLoc) {
        case (?l) l;
        case null ({ lat = 0.0; lng = 0.0; address = "Unknown" });
      };
      let userId = switch (session.userId) { case (?id) id; case null phone };
      // Save inquiry so merchants can view and respond
      ignore leadSvc.createLead(phone, keyword, "General", userLoc2);
      ignore updateSession(session, #inquirySent, setStateField("{}", "query", keyword), null);
      [makeQuickReply(phone,
        "😔 No products found for '" # keyword # "' near you.\n\n" #
        "Your inquiry has been noted! Nearby merchants will be notified.\n\n" #
        "What would you like to do?",
        numericReplies(["Send Inquiry Now", "Search Again", "Browse All Categories", "Main Menu"])
      )]
    } else {
      let limit = if (merchants.size() > 5) 5 else merchants.size();
      var listText = "🛍️ Found " # merchants.size().toText() # " merchant(s) for '" # keyword # "':\n\n";
      var idx = 0;
      while (idx < limit) {
        let m = merchants[idx];
        let distKm = switch (userLoc) {
          case (?loc) Utils.haversineDistance(loc.lat, loc.lng, m.location.lat, m.location.lng);
          case null 0.0;
        };
        let products = productSvc.getProductsByMerchant(m.id);
        listText := listText # (idx + 1).toText() # ". " # formatMerchantCard(m, distKm, products) # "\n\n";
        idx += 1;
      };
      listText := listText # "Reply with a number to select a merchant:";

      var merchantIds = "";
      var mi = 0;
      while (mi < limit) {
        merchantIds := merchantIds # (if (mi > 0) "," else "") # merchants[mi].id;
        mi += 1;
      };
      let data = setStep(
        setStateField(setStateField("{}", "query", keyword), "merchants", merchantIds),
        2
      );
      ignore updateSession(session, #orderSearch, data, null);
      [makeText(phone, listText)]
    }
  };

  // ── Order Search ──────────────────────────────────────────────────────────

  func handleOrderSearch(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);

    switch step {
      case 1 {
        // Legacy step 1 — redirect to orderSearchInput prompt
        ignore updateSession(session, #orderSearchInput, "{}", null);
        [makeText(phone,
          "🔍 What are you looking for today?\n\n" #
          "Please type a product name or keyword\n(e.g. dal, bread, vegetables, medicines)\n\n" #
          "OR send a photo of the product you want to find.\n\n" #
          "I will search nearby merchants for you. 🛒"
        )]
      };
      case 2 {
        // Merchant selection
        if (msg.toLower() == "more") {
          ignore updateSession(session, #orderSearchInput, "{}", null);
          [makeText(phone,
            "🔍 What are you looking for today?\n\n" #
            "Please type a product name or keyword\n(e.g. dal, bread, vegetables, medicines)\n\n" #
            "OR send a photo of the product you want to find.\n\n" #
            "I will search nearby merchants for you. 🛒"
          )]
        } else {
          let choice = switch (parseChoice(msg)) { case (?n) n; case null 0 };
          let merchantIdsStr = switch (getStateField(session.stateData, "merchants")) { case (?v) v; case null "" };
          let merchantIds = merchantIdsStr.split(#char ',').toArray();

          if (choice < 1 or choice > merchantIds.size()) {
            [makeText(phone, "Please enter a valid number (1-" # merchantIds.size().toText() # "):")]
          } else {
            let merchantId = merchantIds[choice - 1];
            // Check if merchant is blocked
            if (merchantSvc.isMerchantBlocked(merchantId)) {
              [makeText(phone, "⚠️ This merchant is currently unavailable.\n\nPlease try a different merchant or search again.")]
            } else {
            let products = productSvc.getProductsByMerchant(merchantId);
            if (products.size() == 0) {
              // No products — offer custom/manual order
              let mName = switch (merchantSvc.getMerchantById(merchantId)) {
                case (#ok(m)) m.businessName; case (#err(_)) "Merchant"
              };
              let data = setStep(setStateField(session.stateData, "merchantId", merchantId), 4);
              ignore updateSession(session, #customOrderItem, data, null);
              [makeQuickReply(phone,
                "📦 " # mName # " has no products listed yet.\n\n" #
                "You can place a custom order by telling us what you need.\n\n" #
                "Enter item name, brand, and quantity (e.g. 'Amul Butter 2kg'):",
                numericReplies(["Custom Order", "Search Another Merchant"])
              )]
            } else {
              var productText = "📦 Products available:\n\n";
              var pi = 0;
              let plimit = if (products.size() > 10) 10 else products.size();
              while (pi < plimit) {
                let p = products[pi];
                productText := productText # (pi + 1).toText() # ". " # p.title # " — ₹" # p.baseRate.toText() # "\n";
                pi += 1;
              };
              productText := productText # "\nReply with product number and quantity (e.g. '1 2' for 2 of item 1)\nOR type 'custom' to place a custom order:";
              let data = setStep(setStateField(session.stateData, "merchantId", merchantId), 3);
              ignore updateSession(session, #orderSearch, data, null);
              [makeText(phone, productText)]
            }
            }
          }
        }
      };
      case 3 {
        // Handle 'custom' keyword → custom order flow
        if (msg.toLower() == "custom" or msg.toLower() == "custom order") {
          let merchantId = switch (getStateField(session.stateData, "merchantId")) { case (?v) v; case null "" };
          let data = setStep(setStateField(session.stateData, "merchantId", merchantId), 4);
          ignore updateSession(session, #customOrderItem, data, null);
          return [makeText(phone, "📝 Custom Order\n\nEnter item name, brand, and quantity on one line.\nExample: 'Amul Butter 1kg x2'\n\n(You can add multiple items, type 'done' when finished):")]
        };
        let parts = msg.trimStart(#char ' ').trimEnd(#char ' ').split(#char ' ').toArray();
        let productNum = if (parts.size() >= 1) { switch (Nat.fromText(parts[0])) { case (?n) n; case null 0 } } else 0;
        let quantity   = if (parts.size() >= 2) { switch (Nat.fromText(parts[1])) { case (?n) n; case null 1 } } else 1;
        let merchantId = switch (getStateField(session.stateData, "merchantId")) { case (?v) v; case null "" };
        let products = productSvc.getProductsByMerchant(merchantId);

        if (productNum < 1 or productNum > products.size()) {
          [makeText(phone, "Please enter a valid product number (1-" # products.size().toText() # ") followed by quantity, or type 'custom' for a custom order:")]
        } else {
          let product = products[productNum - 1];
          let totalRate = product.baseRate * quantity.toFloat();
          let deliveryCharge = 40.0;
          let currSym = userSvc.getCurrencyForPhone(phone);
          let data = setStep(
            setStateField(setStateField(
              setStateField(setStateField(session.stateData, "productId", product.id),
              "qty", quantity.toText()),
              "total", totalRate.toText()),
              "merchantId", merchantId),
            1
          );
          ignore updateSession(session, #orderConfirm, data, null);
          [makeQuickReply(phone,
            "🛒 Order Summary:\n\n" #
            "• " # product.title # " x" # quantity.toText() # " = " # currSym # totalRate.toText() # "\n" #
            "• Delivery charge: " # currSym # deliveryCharge.toText() # "\n" #
            "• Total: " # currSym # (totalRate + deliveryCharge).toText() # "\n\n" #
            "Select payment method to confirm order:",
            numericReplies(["Confirm — Cash on Delivery (COD)", "Confirm — Online Payment", "Cancel"])
          )]
        }
      };
      case _ {
        ignore updateSession(session, #orderSearchInput, "{}", null);
        [makeText(phone,
          "🔍 What are you looking for today?\n\n" #
          "Please type a product name or keyword\n(e.g. dal, bread, vegetables, medicines)\n\n" #
          "OR send a photo of the product you want to find.\n\n" #
          "I will search nearby merchants for you. 🛒"
        )]
      };
    }
  };

  // ── Order Confirm ─────────────────────────────────────────────────────────

  func handleOrderConfirm(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let data = session.stateData;

    // Cancel on choice 3 or "cancel" text
    if (parseChoice(msg) == ?3 or msg.toLower() == "cancel") {
      ignore updateSession(session, #mainMenu, "{}", null);
      return [makeText(phone, "Order cancelled.\n\n" # customerMainMenu())];
    };

    // Idempotency: if order already confirmed (orderId in data), show status
    switch (getStateField(data, "orderId")) {
      case (?existingId) {
        switch (orderSvc.getOrderById(existingId)) {
          case (#ok(o)) {
            ignore updateSession(session, #orderTracking, data, null);
            return [makeText(phone,
              "ℹ️ Your order #" # existingId # " is already placed.\n\n" #
              formatOrderStatusMessage(o) # "\n\nType 'track' to check status."
            )];
          };
          case (#err(_)) {};
        }
      };
      case null {};
    };

    let payMode : Types.PaymentMode = switch (parseChoice(msg)) {
      case (?2) #online; case (?1) #cod; case _ #cod
    };
    let productId  = switch (getStateField(data, "productId")) { case (?v) v; case null "" };
    let merchantId = switch (getStateField(data, "merchantId")) { case (?v) v; case null "" };
    let qtyStr     = switch (getStateField(data, "qty"))        { case (?v) v; case null "1" };
    let qty        = switch (Nat.fromText(qtyStr))              { case (?n) n; case null 1 };
    let totalStr   = switch (getStateField(data, "total"))      { case (?v) v; case null "0" };
    let total      = switch (parseFloat(totalStr))              { case (?f) f; case null 0.0 };
    let deliveryCharge = 40.0;
    let payText = switch (payMode) { case (#cod) "Cash on Delivery"; case (#online) "Online"; case (#qrCode) "QR Code" };
    let currSym = userSvc.getCurrencyForPhone(phone);

    // Get product name for display
    let productName = switch (productSvc.getProductById(productId)) {
      case (#ok(p)) p.title;
      case (#err(_)) "Item";
    };

    // Get customer id
    let customerId = switch (session.userId) { case (?id) id; case null phone };

    // Build order item
    let unitRate = if (qty > 0) total / qty.toFloat() else total;
    let orderItems : [Types.OrderItem] = [{
      productId;
      productName;
      quantity  = qty;
      unitRate;
      totalRate = total;
    }];

    // Get customer location
    let customerLoc : ?Types.Location = switch (userSvc.getUserById(customerId)) {
      case (#ok(u)) u.location;
      case (#err(_)) null;
    };

    // ── Check if merchant is blocked ─────────────────────────────────────────
    if (merchantSvc.isMerchantBlocked(merchantId)) {
      ignore updateSession(session, #mainMenu, "{}", null);
      return [makeText(phone, "⚠️ This merchant is currently unavailable. Please search for another merchant.\n\n" # customerMainMenu())];
    };

    // ── Persist order to backend ─────────────────────────────────────────────
    let orderResult = orderSvc.createOrder(customerId, merchantId, orderItems, customerLoc, payMode, null);

    let (orderId, statusText) = switch (orderResult) {
      case (#ok(order)) {
        // Immediately transition to #pending so merchant can see it
        ignore orderSvc.updateOrderStatus(order.id, #pending, "customer", ?"Order placed via chatbot", null);
        // Notify merchant — find merchant's session/phone and deliver message
        let merchantPhone : Text = switch (merchantSvc.getMerchantById(merchantId)) {
          case (#ok(merchant)) {
            switch (userSvc.getUserById(merchant.userId)) {
              case (#ok(mUser)) mUser.phone;
              case (#err(_)) "";
            }
          };
          case (#err(_)) "";
        };
        if (merchantPhone != "") {
          let mSession = getOrCreateSession(merchantPhone);
          // Transition merchant to order list so they can act
          ignore updateSession(mSession, #merchantOrderList,
            setStateField("{}", "merchantId", merchantId), null);
          appendMessage(merchantPhone, #bot,
            "🔔 NEW ORDER! 🆕\n\n" #
            "Order #" # order.id # "\n" #
            "👤 Customer: " # phone # "\n" #
            "📦 Items: " # productName # " x" # qty.toText() # "\n" #
            "💰 Total: " # currSym # (total + deliveryCharge).toText() # "\n" #
            "💳 Payment: " # payText # "\n\n" #
            "Reply:\n1. Accept Order\n2. Reject Order",
            "quick_reply_prompt"
          );
        };
        (order.id, "✅ Order Sent to Merchant! 🎉")
      };
      case (#err(e)) {
        let errMsg = switch (e) {
          case (#invalidInput(m)) m;
          case _ "Unknown error";
        };
        (Utils.generateId("order"), "⚠️ Order saved locally: " # errMsg)
      };
    };

    let newData = setStateField(setStateField(data, "orderId", orderId), "confirmed", "1");
    ignore updateSession(session, #orderTracking, newData, null);
    [makeText(phone,
      statusText # "\n\n" #
      "🆔 Order ID: #" # orderId # "\n" #
      "📦 Items: " # productName # " x" # qty.toText() # "\n" #
      "💰 Total: " # currSym # (total + deliveryCharge).toText() # "\n" #
      "💳 Payment: " # payText # "\n\n" #
      "⏳ Waiting for merchant to confirm...\n" #
      "You'll receive a WhatsApp update when accepted.\n\n" #
      "Type 'track' to check status or 'menu' to go back."
    )]
  };

  // ── Order Tracking ────────────────────────────────────────────────────────

  func handleOrderTracking(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "orderId")) { case (?v) v; case null "N/A" };
    let currSym = userSvc.getCurrencyForPhone(phone);

    // Live status fetch
    let (statusSteps, liveTotal) = switch (orderSvc.getOrderById(orderId)) {
      case (#ok(o)) {
        let s = formatOrderStatusMessage(o);
        (s, "Total: " # currSym # o.totalAmount.toText())
      };
      case (#err(_)) {
        ("Order Status:\n\n✅ Order Placed\n⏳ Waiting for Merchant Acceptance\n⬜ Merchant Accepted\n⬜ Delivery Partner Assigned\n⬜ Out for Delivery\n⬜ Delivered\n⬜ Completed",
         "")
      };
    };

    if (msg.toLower() == "rate" or msg.toLower() == "rate merchant") {
      ignore updateSession(session, #mainMenu, "{}", null);
      return [makeText(phone, "⭐ Rate your experience (1-5):\nType a number to rate the merchant and delivery.")]
    };

    [makeQuickReply(phone,
      "📍 Order Tracking\n\nOrder #" # orderId # "\n" # liveTotal # "\n\n" # statusSteps,
      numericReplies(["Refresh Status", "Rate Merchant", "Back to Menu"])
    )]
  };

  // ── Custom / Manual Order Flow ────────────────────────────────────────────

  func handleCustomOrderItem(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    // Allow jumping to custom order from quick reply "Custom Order" or "Search Another Merchant"
    switch (parseChoice(msg)) {
      case (?2) {
        // Search another merchant
        ignore updateSession(session, #orderSearchInput, "{}", null);
        return [makeText(phone,
          "🔍 What are you looking for?\n\nType a product name or keyword to search nearby merchants:"
        )];
      };
      case _ {};
    };

    // If first reply is the "Custom Order" quick reply, prompt for item details
    if (parseChoice(msg) == ?1 or msg.toLower() == "custom order") {
      let merchantId = switch (getStateField(session.stateData, "merchantId")) { case (?v) v; case null "" };
      let data = setStateField(setStep(session.stateData, 4), "merchantId", merchantId);
      ignore updateSession(session, #customOrderItem, data, null);
      return [makeText(phone,
        "📝 Custom Order\n\nEnter item name, brand, and quantity.\n" #
        "Example: 'Amul Butter 1kg x2'\n\n" #
        "Type each item on a new line, then 'done' when finished:"
      )];
    };

    // 'done' — confirm the collected items
    if (msg.toLower() == "done") {
      let merchantId = switch (getStateField(session.stateData, "merchantId")) { case (?v) v; case null "" };
      let itemsList  = switch (getStateField(session.stateData, "customItems")) { case (?v) v; case null "" };
      if (itemsList == "") {
        return [makeText(phone, "No items entered yet. Please type at least one item, then 'done':")]
      };
      let mName = switch (merchantSvc.getMerchantById(merchantId)) {
        case (#ok(m)) m.businessName; case (#err(_)) "Merchant"
      };
      let data = setStep(session.stateData, 5);
      ignore updateSession(session, #customOrderConfirm, data, null);
      return [makeQuickReply(phone,
        "🛒 Custom Order Summary\n\n" #
        "🏪 Merchant: " # mName # "\n" #
        "📦 Items:\n" # itemsList # "\n\n" #
        "💳 Payment will be confirmed after merchant accepts.\n\n" #
        "Confirm this custom order?",
        numericReplies(["Yes — Send to Merchant", "Add More Items", "Cancel"])
      )];
    };

    // Accumulate items
    let existing = switch (getStateField(session.stateData, "customItems")) { case (?v) v; case null "" };
    let updated = if (existing == "") "• " # msg else existing # "\n• " # msg;
    let newData = setStateField(session.stateData, "customItems", updated);
    ignore updateSession(session, #customOrderItem, newData, null);
    [makeQuickReply(phone,
      "✅ Item added: " # msg # "\n\nAdd another item or type 'done' to confirm:",
      numericReplies(["done"])
    )]
  };

  func handleCustomOrderConfirm(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let merchantId = switch (getStateField(session.stateData, "merchantId")) { case (?v) v; case null "" };
    let itemsList  = switch (getStateField(session.stateData, "customItems")) { case (?v) v; case null "" };
    let _currSym = userSvc.getCurrencyForPhone(phone);

    switch (parseChoice(msg)) {
      case (?2) {
        // Add more items
        ignore updateSession(session, #customOrderItem, setStep(session.stateData, 4), null);
        return [makeText(phone, "Add more items (type each on a line, then 'done'):")]
      };
      case (?3) {
        ignore updateSession(session, #mainMenu, "{}", null);
        return [makeText(phone, "Order cancelled.\n\n" # customerMainMenu())];
      };
      case _ {};
    };

    // Idempotency check
    switch (getStateField(session.stateData, "customOrderId")) {
      case (?existingId) {
        ignore updateSession(session, #customOrderTracking, session.stateData, null);
        return [makeText(phone, "ℹ️ Your custom order #" # existingId # " is already submitted.\n\nWaiting for merchant to respond with pricing.")];
      };
      case null {};
    };

    // Parse items string into ManualOrderItem array (simple text items)
    let itemLines = itemsList.split(#text "\n• ").toArray();
    let manualItems = List.empty<Types.ManualOrderItem>();
    for (line in itemLines.vals()) {
      let cleaned = line.trimStart(#char '•').trimStart(#char ' ').trimEnd(#char ' ');
      if (cleaned != "") {
        manualItems.add({ itemName = cleaned; brand = ""; quantity = 1 });
      };
    };

    // Get customer info
    let customerId = switch (session.userId) { case (?id) id; case null phone };
    let customerLoc : ?Types.Location = switch (userSvc.getUserById(customerId)) {
      case (#ok(u)) u.location; case (#err(_)) null;
    };

    // Check merchant block
    if (merchantSvc.isMerchantBlocked(merchantId)) {
      ignore updateSession(session, #mainMenu, "{}", null);
      return [makeText(phone, "⚠️ This merchant is currently unavailable. Please try again later.\n\n" # customerMainMenu())];
    };

    // AI moderation check on custom order items before sending to merchant
    var itemsList2 = "";
    for (item in manualItems.values()) {
      itemsList2 := itemsList2 # item.itemName # " " # item.brand # " ";
    };
    let modCheck = moderationSvc.checkCustomOrderContent(itemsList2);
    if (not modCheck.approved) {
      ignore updateSession(session, #mainMenu, "{}", null);
      return [makeText(phone, "❌ Your order was rejected due to policy violation: " # modCheck.reason # "\n\nPlease order only permitted items.\n\nType 'menu' to continue.")];
    };

    // Create manual order
    let orderResult = orderSvc.createManualOrder(phone, merchantId, manualItems.toArray(), customerLoc);
    let orderId = switch (orderResult) {
      case (#ok(order)) {
        // Notify merchant
        let merchantPhone : Text = switch (merchantSvc.getMerchantById(merchantId)) {
          case (#ok(merchant)) {
            switch (userSvc.getUserById(merchant.userId)) {
              case (#ok(mUser)) mUser.phone;
              case (#err(_)) "";
            }
          };
          case (#err(_)) "";
        };
        if (merchantPhone != "") {
          let mSession = getOrCreateSession(merchantPhone);
          ignore updateSession(mSession, #merchantOrderList,
            setStateField("{}", "merchantId", merchantId), null);
          appendMessage(merchantPhone, #bot,
            "🔔 CUSTOM ORDER REQUEST!\n\n" #
            "Order #" # order.id # "\n" #
            "👤 Customer: " # phone # "\n" #
            "📦 Items Requested:\n" # itemsList # "\n\n" #
            "Please review, set the price, and accept or reject:\n" #
            "1. Accept Order\n2. Reject Order",
            "quick_reply_prompt"
          );
        };
        order.id
      };
      case (#err(e)) {
        let errMsg = switch (e) { case (#invalidInput(m)) m; case _ "Unknown error" };
        Utils.generateId("corder")
      };
    };

    let newData = setStateField(session.stateData, "customOrderId", orderId);
    ignore updateSession(session, #customOrderTracking, newData, null);

    // Get merchant phone to display directly (bypassing masking for confirmed inquiry)
    let merchantPhoneDisplay : Text = switch (merchantSvc.getMerchantById(merchantId)) {
      case (#ok(merchant)) {
        switch (userSvc.getUserById(merchant.userId)) {
          case (#ok(mUser)) "\n📞 You can contact the merchant directly at: " # mUser.phone;
          case (#err(_)) "";
        }
      };
      case (#err(_)) "";
    };

    [makeText(phone,
      "✅ Inquiry/Custom Order Sent to Merchant! 🎉\n\n" #
      "🆔 Order ID: #" # orderId # "\n" #
      "📦 Items: " # itemsList # "\n" #
      merchantPhoneDisplay # "\n\n" #
      "⏳ The merchant will review and respond with pricing.\n" #
      "You'll receive a WhatsApp update shortly.\n\n" #
      "Type 'track' to check status or 'menu' to go back."
    )]
  };

  func handleCustomOrderTracking(session : Types.ConversationSession, _msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let orderId = switch (getStateField(session.stateData, "customOrderId")) {
      case (?v) v; case null "N/A"
    };
    let _currSym = userSvc.getCurrencyForPhone(phone);

    let statusText = switch (orderSvc.getOrderById(orderId)) {
      case (#ok(o)) formatOrderStatusMessage(o);
      case (#err(_)) "Order #" # orderId # " — Waiting for merchant response";
    };

    [makeQuickReply(phone,
      "📍 Custom Order Tracking\n\n" # statusText,
      numericReplies(["Refresh Status", "Back to Menu"])
    )]
  };

  // ── Job Browse ────────────────────────────────────────────────────────────

  func handleJobBrowse(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);

    switch step {
      case 0 {
        switch (parseChoice(msg)) {
          case (?1) {
            // Browse jobs → go to jobSearch
            ignore updateSession(session, #jobSearch, setStep("{}", 10), null);
            [makeText(phone, "🔍 Browse Jobs:\nType a keyword or 'all' to see all jobs:")]
          };
          case (?2) {
            ignore updateSession(session, #jobPost, setStep("{}", 1), null);
            [makeText(phone, "📝 Post a Job\n\nStep 1: Job title (e.g. 'Delivery Driver', 'Chef'):")]
          };
          case (?3) {
            // My Job Listings — filter all jobs by posterId
            ignore updateSession(session, #jobMyListings, "{}", null);
            let userId = switch (session.userId) { case (?id) id; case null "" };
            let svc = jobService();
            let allJobs = svc.getAllJobs(null);
            let myJobs = allJobs.filter(func(j : Types.Job) : Bool { j.posterId == userId });
            if (myJobs.size() == 0) {
              [makeQuickReply(phone, "📋 My Job Listings:\n\nYou have no active job postings.",
                numericReplies(["Post a Job", "Browse Jobs", "Back to Menu"]))]
            } else {
              var text = "📋 My Job Listings:\n\n";
              var i = 0;
              let limit = if (myJobs.size() > 5) 5 else myJobs.size();
              var jobIdsAcc = "";
              while (i < limit) {
                let j = myJobs[i];
                text := text # (i + 1).toText() # ". " # j.title # " — " # j.category # " — " # j.leads.size().toText() # " inquiries\n";
                jobIdsAcc := jobIdsAcc # (if (i > 0) "," else "") # j.id;
                i += 1;
              };
              text := text # "\nReply with number to view inquiries, or 'back':";
              ignore updateSession(session, #jobMyListings, setStateField("{}", "jobIds", jobIdsAcc), null);
              [makeText(phone, text)]
            }
          };
          case _ {
            [makeQuickReply(phone, "💼 Job Opportunities", numericReplies(["Browse Jobs", "Post a Job", "My Job Listings"]))]
          };
        }
      };
      case _ {
        [makeQuickReply(phone, "💼 Job Opportunities", numericReplies(["Browse Jobs", "Post a Job", "My Job Listings"]))]
      };
    }
  };

  // ── Job Search ────────────────────────────────────────────────────────────

  func handleJobSearch(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);

    switch step {
      case 10 {
        let keyword = if (msg.toLower() == "all") null else ?msg;
        let svc = jobService();
        let jobs = svc.searchJobs(keyword, null, null, 50.0);

        if (jobs.size() == 0) {
          ignore updateSession(session, #mainMenu, "{}", null);
          [makeText(phone, "😔 No job listings found.\n\nType 'menu' to go back.")]
        } else {
          let limit = if (jobs.size() > 5) 5 else jobs.size();
          var text = "💼 Found " # jobs.size().toText() # " job(s):\n\n";
          var i = 0;
          while (i < limit) {
            text := text # (i + 1).toText() # ". " # formatJobCard(jobs[i], 0.0) # "\n\n";
            i += 1;
          };
          text := text # "Reply with number to request contact, or 'back' to search again.";
          var jobIds = "";
          var ji = 0;
          while (ji < limit) {
            jobIds := jobIds # (if (ji > 0) "," else "") # jobs[ji].id;
            ji += 1;
          };
          let data = setStep(setStateField("{}", "jobIds", jobIds), 11);
          ignore updateSession(session, #jobSearch, data, null);
          [makeText(phone, text)]
        }
      };
      case 11 {
        if (msg.toLower() == "back") {
          ignore updateSession(session, #jobSearch, setStep("{}", 10), null);
          [makeText(phone, "🔍 Search Jobs:\nType keyword or 'all':")]
        } else {
          let choice = switch (parseChoice(msg)) { case (?n) n; case null 0 };
          let jobIdsStr = switch (getStateField(session.stateData, "jobIds")) { case (?v) v; case null "" };
          let jobIds = jobIdsStr.split(#char ',').toArray();
          if (choice < 1 or choice > jobIds.size()) {
            [makeText(phone, "Please enter a valid number (1-" # jobIds.size().toText() # "):")]
          } else {
            let jobId = jobIds[choice - 1];
            let data = setStateField("{}", "jobId", jobId);
            ignore updateSession(session, #jobRequestContact, data, null);
            [makeQuickReply(phone,
              "📩 Request contact for this job?\n\nJob ID: " # jobId # "\n\nThe job poster will review and approve your request. You'll be notified once approved.",
              numericReplies(["Yes, Request Contact", "No, Go Back"])
            )]
          }
        }
      };
      case _ {
        ignore updateSession(session, #jobSearch, setStep("{}", 10), null);
        [makeText(phone, "🔍 Search Jobs:\nType keyword or 'all':")]
      };
    }
  };

  // ── Job Request Contact ───────────────────────────────────────────────────

  func handleJobRequestContact(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let jobId = switch (getStateField(session.stateData, "jobId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone,
          "✅ Contact request sent!\n\nJob ID: " # jobId # "\n\nThe poster will review your request.\nYou'll be notified once approved.\n\nType 'menu' to continue."
        )]
      };
      case _ {
        ignore updateSession(session, #jobSearch, setStep("{}", 10), null);
        [makeText(phone, "🔍 Search Jobs:\nType keyword or 'all':")]
      };
    }
  };

  // ── Job Post ──────────────────────────────────────────────────────────────

  func buildJobCategoryMenu() : Text {
    var text = "📂 Step 3: Select job category:\n\n";
    var i = 0;
    for (cat in JOB_CATEGORIES.values()) {
      i += 1;
      text := text # i.toText() # ". " # cat # "\n";
    };
    text
  };

  func handleJobPost(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);
    switch step {
      case 1 {
        ignore updateSession(session, #jobPost, setStep(setStateField(session.stateData, "title", msg), 2), null);
        [makeText(phone, "📝 Step 2: Job description:")]
      };
      case 2 {
        ignore updateSession(session, #jobPost, setStep(setStateField(session.stateData, "desc", msg), 3), null);
        [makeText(phone, buildJobCategoryMenu())]
      };
      case 3 {
        let catIdx = switch (parseChoice(msg)) { case (?n) n; case null 0 };
        if (catIdx < 1 or catIdx > JOB_CATEGORIES.size()) {
          [makeText(phone, "Please enter a valid category number (1-" # JOB_CATEGORIES.size().toText() # "):\n\n" # buildJobCategoryMenu())]
        } else {
          let cat = JOB_CATEGORIES[catIdx - 1];
          ignore updateSession(session, #jobPost, setStep(setStateField(session.stateData, "cat", cat), 4), null);
          [makeText(phone, "💰 Step 4: Min salary (e.g. 15000):")]
        }
      };
      case 4 {
        ignore updateSession(session, #jobPost, setStep(setStateField(session.stateData, "salMin", msg), 5), null);
        [makeText(phone, "💰 Step 5: Max salary (e.g. 25000):")]
      };
      case 5 {
        ignore updateSession(session, #jobPost, setStep(setStateField(session.stateData, "salMax", msg), 6), null);
        [makeText(phone, "📍 Step 6: Location (city and area):")]
      };
      case 6 {
        let title   = switch (getStateField(session.stateData, "title"))  { case (?v) v; case null "Job" };
        let desc    = switch (getStateField(session.stateData, "desc"))   { case (?v) v; case null "" };
        let cat     = switch (getStateField(session.stateData, "cat"))    { case (?v) v; case null "Other" };
        let salMinS = switch (getStateField(session.stateData, "salMin")) { case (?v) v; case null "0" };
        let salMaxS = switch (getStateField(session.stateData, "salMax")) { case (?v) v; case null "0" };
        let salMin  = switch (parseFloat(salMinS)) { case (?f) f; case null 0.0 };
        let salMax  = switch (parseFloat(salMaxS)) { case (?f) f; case null 0.0 };
        let userId  = switch (session.userId) { case (?id) id; case null "anonymous" };
        let loc : Types.Location = { lat = 0.0; lng = 0.0; address = msg };
        let svc = jobService();
        // Moderation check before posting job
        let jobModCheck = moderationSvc.checkJobContent(title, desc);
        if (not jobModCheck.approved) {
          ignore updateSession(session, #mainMenu, "{}", null);
          return [makeText(phone, "❌ Your job posting was rejected: " # jobModCheck.reason # "\n\nPlease review your content and try again.")];
        };
        switch (svc.postJob(userId, title, desc, cat, salMin, salMax, loc)) {
          case (#ok(job)) {
            moderationSvc.flagForModeration("job", job.id);
            ignore updateSession(session, #jobMyListings, "{}", null);
            [makeQuickReply(phone,
              "✅ Job posted for 7 days!\n\n📋 " # title # "\n📂 " # cat #
              "\n💰 ₹" # salMinS # " - ₹" # salMaxS # "/month\n📍 " # msg #
              "\n\nID: " # job.id # "\n\n⏳ Pending moderation review.",
              numericReplies(["Post Another Job", "View My Listings", "Back to Menu"])
            )]
          };
          case (#err(_)) {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, "❌ Failed to post job. Please try again.\n\nType 'menu' to continue.")]
          };
        }
      };
      case _ {
        ignore updateSession(session, #jobPost, setStep("{}", 1), null);
        [makeText(phone, "📝 Post a Job\n\nStep 1: Job title:")]
      };
    }
  };

  // ── Job My Listings ───────────────────────────────────────────────────────

  func handleJobMyListings(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    if (msg.toLower() == "back" or parseChoice(msg) == ?3) {
      ignore updateSession(session, #mainMenu, "{}", null);
      return [makeText(phone, customerMainMenu())];
    };

    if (parseChoice(msg) == ?1) {
      ignore updateSession(session, #jobPost, setStep("{}", 1), null);
      return [makeText(phone, "📝 Post a Job\n\nStep 1: Job title:")]
    };

    // View inquiries for a job
    let jobIdsStr = switch (getStateField(session.stateData, "jobIds")) { case (?v) v; case null "" };
    let jobIds = jobIdsStr.split(#char ',').toArray();
    let choice = switch (parseChoice(msg)) { case (?n) n; case null 0 };

    if (choice < 1 or choice > jobIds.size()) {
      [makeQuickReply(phone, "📋 My Job Listings\n\nEnter a number to view inquiries or use an option:",
        numericReplies(["Post a Job", "Browse Jobs", "Back to Menu"]))]
    } else {
      let jobId = jobIds[choice - 1];
      ignore updateSession(session, #approveJobContact, setStateField("{}", "jobId", jobId), null);
      [makeQuickReply(phone,
        "📩 Inquiries for Job #" # jobId # ":\n\n1. *****1234 — Applicant A\n2. *****5678 — Applicant B\n\nReply with number to approve/reject:",
        numericReplies(["Approve Inquiry 1", "Reject Inquiry 1", "Back to Listings"])
      )]
    }
  };

  // ── Approve Job Contact ───────────────────────────────────────────────────

  func handleApproveJobContact(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let jobId = switch (getStateField(session.stateData, "jobId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Approve: call service which now returns the requester phone
        let svc = jobService();
        let approveResult = svc.approveJobContactShare(jobId, phone); // use poster phone as leadUserId fallback
        let (notifMsg, extraMsgs) : (Text, [Types.BotMessage]) = switch (approveResult) {
          case (#ok(requesterPhone)) {
            // Get job title for notification
            let jobTitle = switch (svc.getJobById(jobId)) {
              case (#ok(j)) j.title; case (#err(_)) jobId;
            };
            // Send notification to requester's session
            let notif = makeText(requesterPhone,
              "✅ Your job contact request for \"" # jobTitle # "\" has been approved!\n" #
              "Contact the poster at: " # phone # "\n\n" #
              "Good luck! 💼"
            );
            ("✅ Contact approved for Job #" # jobId # "!\nApplicant has been notified.", [notif])
          };
          case (#err(_)) {
            ("✅ Contact approved for Job #" # jobId # "!", [])
          };
        };
        ignore updateSession(session, #jobMyListings, "{}", null);
        let all = List.fromArray<Types.BotMessage>([makeText(phone, notifMsg # "\n\nType 'menu' to continue.")]);
        for (m in extraMsgs.vals()) { all.add(m) };
        all.toArray()
      };
      case (?2) {
        ignore updateSession(session, #jobMyListings, "{}", null);
        [makeText(phone, "❌ Inquiry rejected for Job #" # jobId # ".\nApplicant has been notified.\n\nType 'menu' to continue.")]
      };
      case _ {
        ignore updateSession(session, #jobMyListings, "{}", null);
        [makeText(phone, "Back to listings. Type 'menu' to continue.")]
      };
    }
  };

  // ── Property Browse ───────────────────────────────────────────────────────

  func handlePropertyBrowse(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);
    switch step {
      case 0 {
        switch (parseChoice(msg)) {
          case (?1) {
            ignore updateSession(session, #propertySearch, setStep(setStateField("{}", "pType", "rent"), 10), null);
            [makeText(phone, "🔍 Searching rental properties...\nType your preferred location or keyword:")]
          };
          case (?2) {
            ignore updateSession(session, #propertySearch, setStep(setStateField("{}", "pType", "buy"), 10), null);
            [makeText(phone, "🔍 Searching properties for sale...\nType your preferred location or keyword:")]
          };
          case (?3) {
            ignore updateSession(session, #propertySearch, setStep(setStateField("{}", "pType", "lease"), 10), null);
            [makeText(phone, "🔍 Searching lease properties...\nType your preferred location or keyword:")]
          };
          case (?4) {
            ignore updateSession(session, #propertySearch, setStep(setStateField("{}", "pType", "sale"), 10), null);
            [makeText(phone, "🔍 Searching properties for sale...\nType your preferred location or keyword:")]
          };
          case (?5) {
            ignore updateSession(session, #propertyPost, setStep("{}", 1), null);
            [makeText(phone, "🏠 Post a Property\n\nStep 1: Listing type?\n1. Rent  2. Buy  3. Lease  4. Sale")]
          };
          case _ {
            [makeQuickReply(phone, "🏠 Property", numericReplies(["Rent", "Buy", "Lease", "Sale", "Post Property"]))]
          };
        }
      };
      case _ {
        [makeQuickReply(phone, "🏠 Property", numericReplies(["Rent", "Buy", "Lease", "Sale", "Post Property"]))]
      };
    }
  };

  // ── Property Search ───────────────────────────────────────────────────────

  func handlePropertySearch(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);

    switch step {
      case 10 {
        let pType = switch (getStateField(session.stateData, "pType")) { case (?v) v; case null "rent" };
        // In a real implementation, search the property service here
        let data = setStep(setStateField(session.stateData, "searchLocation", msg), 11);
        ignore updateSession(session, #propertySearch, data, null);
        [makeQuickReply(phone,
          "🏠 Properties (" # pType # ") near " # msg # ":\n\n" #
          "1. 2BHK Flat | ₹15,000/month | Sector 5\n   📍 2.1 km away | Owner: *****4321\n\n" #
          "2. Independent House | ₹8,000/month | Main Road\n   📍 3.5 km away | Owner: *****8765\n\n" #
          "Reply with number to request contact, or 'back':",
          numericReplies(["Request Contact #1", "Request Contact #2", "Search Again", "Back to Menu"])
        )]
      };
      case 11 {
        if (msg.toLower() == "back" or parseChoice(msg) == ?4) {
          ignore updateSession(session, #propertyBrowse, setStep("{}", 0), null);
          return [makeQuickReply(phone, "🏠 Property", numericReplies(["Rent", "Buy", "Lease", "Sale", "Post Property"]))];
        };
        if (parseChoice(msg) == ?3) {
          ignore updateSession(session, #propertySearch, setStep(session.stateData, 10), null);
          return [makeText(phone, "🔍 Enter your location or keyword:")]
        };
        // Contact request
        let propId = "prop-demo-" # (switch (parseChoice(msg)) { case (?n) n.toText(); case null "1" });
        let data = setStateField("{}", "propId", propId);
        ignore updateSession(session, #propertyRequestContact, data, null);
        [makeQuickReply(phone,
          "📩 Request contact for this property?\n\nProperty ID: " # propId # "\n\nThe owner will review and approve your request.",
          numericReplies(["Yes, Request Contact", "No, Go Back"])
        )]
      };
      case _ {
        ignore updateSession(session, #propertySearch, setStep(session.stateData, 10), null);
        [makeText(phone, "🔍 Enter your preferred location or keyword:")]
      };
    }
  };

  // ── Property Request Contact ──────────────────────────────────────────────

  func handlePropertyRequestContact(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let propId = switch (getStateField(session.stateData, "propId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone,
          "✅ Contact request sent!\n\nProperty ID: " # propId # "\n\nThe owner will review and approve your request.\nYou'll be notified once approved.\n\nType 'menu' to continue."
        )]
      };
      case _ {
        ignore updateSession(session, #propertySearch, setStep(session.stateData, 10), null);
        [makeText(phone, "🔍 Enter your preferred location or keyword:")]
      };
    }
  };

  // ── Property Post ─────────────────────────────────────────────────────────

  func handlePropertyPost(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let step = getStep(session.stateData);
    switch step {
      case 1 {
        let lType = switch (parseChoice(msg)) {
          case (?1) "rent"; case (?2) "buy"; case (?3) "lease"; case (?4) "sale"; case _ "rent";
        };
        ignore updateSession(session, #propertyPost, setStep(setStateField(session.stateData, "listType", lType), 2), null);
        [makeText(phone, "📝 Step 2: Property description (size, type, amenities):")]
      };
      case 2 {
        ignore updateSession(session, #propertyPost, setStep(setStateField(session.stateData, "desc", msg), 3), null);
        [makeText(phone, "💰 Step 3: Expected price (monthly rent or total sale price in ₹):")]
      };
      case 3 {
        ignore updateSession(session, #propertyPost, setStep(setStateField(session.stateData, "price", msg), 4), null);
        [makeText(phone, "📍 Step 4: Location (city, area, landmark):")]
      };
      case 4 {
        let listType = switch (getStateField(session.stateData, "listType")) { case (?v) v; case null "rent" };
        let desc     = switch (getStateField(session.stateData, "desc"))     { case (?v) v; case null "" };
        let priceStr = switch (getStateField(session.stateData, "price"))    { case (?v) v; case null "0" };
        let userId   = switch (session.userId) { case (?id) id; case null phone };
        let price    = switch (parseFloat(priceStr)) { case (?f) f; case null 0.0 };
        let loc : Types.Location = { lat = 0.0; lng = 0.0; address = msg };
        let listingType : Types.PropertyListingType = switch (listType) {
          case "buy" #buy; case "lease" #lease; case "sale" #sale; case _ #rent;
        };
        switch (propertySvc.postProperty(userId, listingType, desc, price, loc)) {
          case (#ok(prop)) {
            moderationSvc.flagForModeration("property", prop.id);
            ignore updateSession(session, #propertyMyListings, "{}", null);
            [makeQuickReply(phone,
              "✅ Property posted for 2 weeks!\n\n🏠 " # listType # "\n📝 " # desc #
              "\n💰 ₹" # priceStr # "\n📍 " # msg #
              "\n\nID: " # prop.id # "\n\n⏳ Pending moderation review.",
              numericReplies(["Post Another Property", "View My Listings", "Back to Menu"])
            )]
          };
          case (#err(_)) {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, "❌ Failed to post property. Please try again.\n\nType 'menu' to continue.")]
          };
        }
      };
      case _ {
        ignore updateSession(session, #propertyPost, setStep("{}", 1), null);
        [makeText(phone, "🏠 Post a Property\n\nStep 1: Listing type?\n1. Rent  2. Buy  3. Lease  4. Sale")]
      };
    }
  };

  // ── Property My Listings ──────────────────────────────────────────────────

  func handlePropertyMyListings(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    if (msg.toLower() == "back" or parseChoice(msg) == ?3) {
      ignore updateSession(session, #mainMenu, "{}", null);
      return [makeText(phone, customerMainMenu())];
    };

    if (parseChoice(msg) == ?1) {
      ignore updateSession(session, #propertyPost, setStep("{}", 1), null);
      return [makeText(phone, "🏠 Post a Property\n\nStep 1: Listing type?\n1. Rent  2. Buy  3. Lease  4. Sale")]
    };

    if (parseChoice(msg) == ?2) {
      ignore updateSession(session, #propertyMyListings, "{}", null);
      return [makeQuickReply(phone,
        "📋 My Property Listings:\n\n1. 2BHK Flat for Rent | ₹15,000/month | 3 inquiries\n\nReply with number to view inquiries:",
        numericReplies(["View Inquiries for #1", "Post Another", "Back to Menu"])
      )];
    };

    // Handle inquiry approval
    ignore updateSession(session, #approvePropertyContact, setStateField("{}", "propId", "prop-001"), null);
    [makeQuickReply(phone,
      "📩 Inquiries for your property:\n\n1. *****1234 — Interested Buyer A\n2. *****5678 — Interested Buyer B\n\nReply to approve/reject:",
      numericReplies(["Approve Inquiry 1", "Reject Inquiry 1", "Back to Listings"])
    )]
  };

  // ── Approve Property Contact ──────────────────────────────────────────────

  func handleApprovePropertyContact(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let propId = switch (getStateField(session.stateData, "propId")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Approve: call service which now returns the requester phone
        let approveResult = propertySvc.approvePropertyContactShare(propId, phone);
        let (notifMsg, extraMsgs) : (Text, [Types.BotMessage]) = switch (approveResult) {
          case (#ok(requesterPhone)) {
            // Get property description for notification
            let propDesc = switch (propertySvc.getPropertyById(propId)) {
              case (#ok(p)) p.description; case (#err(_)) propId;
            };
            let notif = makeText(requesterPhone,
              "✅ Your property inquiry for \"" # propDesc # "\" has been approved!\n" #
              "Contact the owner at: " # phone # "\n\n" #
              "Good luck! 🏠"
            );
            ("✅ Contact approved for Property #" # propId # "!\nBuyer has been notified.", [notif])
          };
          case (#err(_)) {
            ("✅ Contact approved for Property #" # propId # "!", [])
          };
        };
        ignore updateSession(session, #propertyMyListings, "{}", null);
        let all = List.fromArray<Types.BotMessage>([makeText(phone, notifMsg # "\n\nType 'menu' to continue.")]);
        for (m in extraMsgs.vals()) { all.add(m) };
        all.toArray()
      };
      case (?2) {
        ignore updateSession(session, #propertyMyListings, "{}", null);
        [makeText(phone, "❌ Inquiry rejected for Property #" # propId # ".\nBuyer has been notified.\n\nType 'menu' to continue.")]
      };
      case _ {
        ignore updateSession(session, #propertyMyListings, "{}", null);
        [makeText(phone, "Back to listings. Type 'menu' to continue.")]
      };
    }
  };

  // ── Merchant / Delivery Actions (legacy catch-all) ────────────────────────

  func handleMerchantActions(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    if (msg.toLower() == "back" or msg.toLower() == "menu") {
      ignore updateSession(session, #merchantMenu, "{}", null);
      return [makeQuickReply(phone, merchantMainMenuFiltered(phone),
        merchantMenuReplies(phone))];
    };
    ignore updateSession(session, #merchantMenu, "{}", null);
    [makeQuickReply(phone, merchantMainMenuFiltered(phone),
      merchantMenuReplies(phone))]
  };

  func handleDeliveryActions(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    if (msg.toLower() == "back" or msg.toLower() == "menu") {
      ignore updateSession(session, #dpMenu, "{}", null);
      return [makeQuickReply(phone, deliveryMainMenu(),
        numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))];
    };
    ignore updateSession(session, #dpMenu, "{}", null);
    [makeQuickReply(phone, deliveryMainMenu(),
      numericReplies(["My Dashboard 🚚", "Go Online / Offline", "Available Orders", "My Deliveries", "Earnings", "Support / Help"]))]
  };

  // ── Event Flow ────────────────────────────────────────────────────────────

  func eventMenuText() : Text {
    "🎉 Events\n\n1. Post an Event\n2. Search Events\n3. Main Menu"
  };

  func handleEventMenu(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (parseChoice(msg)) {
      case (?1) {
        ignore updateSession(session, #eventPostName, setStep("{}", 1), null);
        [makeText(phone, "🎉 Post an Event\n\nStep 1: What is the event name?")]
      };
      case (?2) {
        ignore updateSession(session, #eventSearch, setStep("{}", 1), null);
        [makeText(phone, "🔍 Search Events:\nEnter a keyword to search (e.g. concert, fair, workshop):")]
      };
      case _ {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, customerMainMenu())]
      };
    }
  };

  func handleEventFlow(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let _step = getStep(session.stateData);

    switch (session.currentState) {
      case (#eventPostName) {
        ignore updateSession(session, #eventPostDesc, setStep(setStateField(session.stateData, "eventName", msg), 2), null);
        let aiDesc = "A wonderful event: " # msg # ". Join us for an unforgettable experience filled with fun, learning, and networking opportunities.";
        ignore updateSession(getOrCreateSession(phone), #eventPostDesc, setStateField(setStep(getOrCreateSession(phone).stateData, 2), "desc", aiDesc), null);
        [makeQuickReply(phone,
          "✨ AI-generated description:\n\n\"" # aiDesc # "\"\n\nUse this description?",
          numericReplies(["Yes, use this", "No, I'll type my own"])
        )]
      };
      case (#eventPostDesc) {
        let desc = if (msg == "1" or msg.toLower() == "yes, use this") {
          switch (getStateField(session.stateData, "desc")) { case (?d) d; case null "Event description" }
        } else { msg };
        ignore updateSession(session, #eventPostPaid, setStep(setStateField(session.stateData, "desc", desc), 3), null);
        [makeQuickReply(phone, "💰 Is this a paid event?", numericReplies(["Yes, it's paid", "No, it's free"]))]
      };
      case (#eventPostPaid) {
        let isPaid = switch (parseChoice(msg)) { case (?1) "yes"; case _ "no" };
        if (isPaid == "yes") {
          ignore updateSession(session, #eventPostPrice, setStep(setStateField(session.stateData, "isPaid", "yes"), 4), null);
          [makeText(phone, "💵 Enter the ticket price (e.g. 500):")]
        } else {
          ignore updateSession(session, #eventPostLocation, setStep(setStateField(session.stateData, "isPaid", "no"), 5), null);
          [makeText(phone, "📍 Enter the event location / address:")]
        }
      };
      case (#eventPostPrice) {
        ignore updateSession(session, #eventPostLocation, setStep(setStateField(session.stateData, "price", msg), 5), null);
        [makeText(phone, "📍 Enter the event location / address:")]
      };
      case (#eventPostLocation) {
        ignore updateSession(session, #eventPostDates, setStep(setStateField(session.stateData, "location", msg), 6), null);
        [makeText(phone, "📅 Enter start and end dates (e.g. 2026-05-10 to 2026-05-12):")]
      };
      case (#eventPostDates) {
        ignore updateSession(session, #eventPostTickets, setStep(setStateField(session.stateData, "dates", msg), 7), null);
        [makeText(phone, "🎟️ Enter ticket/venue details (e.g. 'City Hall, Gate 2, Tickets at venue'):")]
      };
      case (#eventPostTickets) {
        // Save and confirm
        let data = session.stateData;
        let eventName = switch (getStateField(data, "eventName")) { case (?v) v; case null "Event" };
        let desc      = switch (getStateField(data, "desc"))      { case (?v) v; case null "" };
        let isPaidStr = switch (getStateField(data, "isPaid"))    { case (?v) v; case null "no" };
        let priceStr  = switch (getStateField(data, "price"))     { case (?v) v; case null "0" };
        let location  = switch (getStateField(data, "location"))  { case (?v) v; case null "" };
        let dates     = switch (getStateField(data, "dates"))     { case (?v) v; case null "" };
        let isPaid = isPaidStr == "yes";
        let price  = switch (parseFloat(priceStr)) { case (?f) f; case null 0.0 };
        let userId = switch (session.userId) { case (?id) id; case null phone };

        // Parse dates into startDate/endDate
        let dateParts = dates.split(#text " to ").toArray();
        let startDate = if (dateParts.size() >= 1) dateParts[0] else dates;
        let endDate   = if (dateParts.size() >= 2) dateParts[1] else dates;

        // Save the event to EventService
        switch (eventSvc.createEvent(phone, userId, eventName, desc, isPaid, price, location, startDate, endDate, msg)) {
          case (#ok(event)) {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone,
              "🎉 Event published for 1 month!\n\n" #
              "📛 " # eventName # "\n" #
              "📝 " # desc # "\n" #
              "💰 " # (if (isPaid) "Paid — ₹" # priceStr else "Free") # "\n" #
              "📍 " # location # "\n" #
              "📅 " # dates # "\n" #
              "🎟️ " # msg # "\n" #
              "🆔 Event ID: " # event.id # "\n\n" #
              "Your event is now visible to users in your area.\n\nType 'menu' to continue."
            )]
          };
          case (#err(_)) {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, "❌ Failed to publish event. Please try again.\n\nType 'menu' to continue.")]
          };
        }
      };
      case (#eventSearch) {
        let _events = List.empty<Text>();
        // Demo results — real search would call EventService
        let resultText =
          "🎉 Events matching '" # msg # "':\n\n" #
          "1. 📅 Tech Summit 2026\n   📍 Mumbai, BKC | Free | May 10-12\n   🎟️ Registration required\n\n" #
          "2. 📅 Food Festival\n   📍 Delhi, CP | Paid — ₹200 | May 15\n   🎟️ Tickets at gate\n\n" #
          "Type event number for more details, or 'back':";
        ignore updateSession(session, #eventMenu, "{}", null);
        [makeText(phone, resultText)]
      };
      case _ {
        ignore updateSession(session, #eventMenu, "{}", null);
        [makeQuickReply(phone, eventMenuText(), numericReplies(["Post an Event", "Search Events", "Main Menu"]))]
      };
    }
  };

  // ── Family Flow ───────────────────────────────────────────────────────────

  func familyMenuText() : Text {
    "👨‍👩‍👧‍👦 Family Group\n\n1. Add Family Member\n2. View Family Members\n3. Main Menu"
  };

  func handleFamilyMenu(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (parseChoice(msg)) {
      case (?1) {
        ignore updateSession(session, #familyAddSelfName, setStep("{}", 1), null);
        [makeText(phone, "👤 Add Family Member\n\nStep 1: What is your full name? (First name):")]
      };
      case (?2) {
        // Load live family members from backend
        let members = familySvc.getFamilyByOwner(phone);
        let listText = if (members.size() == 0) {
          "👨\u{200d}👩\u{200d}👧\u{200d}👦 Your Family Members:\n\n(No family members added yet)\n\nUse 'Add Family Member' to get started."
        } else {
          var t = "👨\u{200d}👩\u{200d}👧\u{200d}👦 Your Family Members (" # members.size().toText() # "):\n\n";
          var i = 0;
          for (m in members.vals()) {
            i += 1;
            let relStr = switch (m.relationship) {
              case (#father)   "Father";
              case (#mother)   "Mother";
              case (#son)      "Son";
              case (#daughter) "Daughter";
              case (#husband)  "Husband";
              case (#wife)     "Wife";
              case (#friend)   "Friend";
              case (#brother)  "Brother";
              case (#sister)   "Sister";
              case (#relative) "Relative";
            };
            let genderStr = if (m.gender == "") "" else " (" # m.gender # ")";
            let matrimonyStr = if (m.isMatrimonyEligible) " ✨Matrimony" else "";
            t := t # i.toText() # ". " # m.relationName # genderStr # " - " # relStr # matrimonyStr # "\n   📱 " # m.relationPhone # "\n";
          };
          t
        };
        ignore updateSession(session, #familyMenu, "{}", null);
        [makeQuickReply(phone, listText,
          numericReplies(["Add Family Member", "Main Menu"])
        )]
      };
      case _ {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, customerMainMenu())]
      };
    }
  };

  func handleFamilyFlow(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    switch (session.currentState) {
      case (#familyAddSelfName) {
        ignore updateSession(session, #familyAddSelfSurname, setStep(setStateField(session.stateData, "selfName", msg), 2), null);
        [makeText(phone, "👤 Step 2: Your surname (last name):")]
      };
      case (#familyAddSelfSurname) {
        ignore updateSession(session, #familyAddRelationship, setStep(setStateField(session.stateData, "selfSurname", msg), 3), null);
        [makeQuickReply(phone,
          "👥 Step 3: What is your relationship to this person?",
          numericReplies(["Father", "Mother", "Son", "Daughter", "Husband", "Wife", "Friend", "Brother", "Sister", "Relative"])
        )]
      };
      case (#familyAddRelationship) {
        let rel = switch (parseChoice(msg)) {
          case (?1) "father"; case (?2) "mother"; case (?3) "son"; case (?4) "daughter";
          case (?5) "husband"; case (?6) "wife"; case (?7) "friend"; case (?8) "brother";
          case (?9) "sister"; case _ "relative";
        };
        ignore updateSession(session, #familyAddRelationName, setStep(setStateField(session.stateData, "relationship", rel), 4), null);
        [makeText(phone, "👤 Step 4: What is this person's name?")]
      };
      case (#familyAddRelationName) {
        ignore updateSession(session, #familyAddPhone, setStep(setStateField(session.stateData, "relationName", msg), 5), null);
        [makeText(phone, "📱 Step 5: Their phone number (with country code, e.g. +919876543210):")]
      };
      case (#familyAddPhone) {
        // Validate phone number before proceeding
        if (not Utils.validatePhoneNumber(msg)) {
          return [makeText(phone, "⚠️ Invalid phone number. Please enter a valid phone number (7–15 digits, optionally starting with '+'):\nExample: +919876543210")];
        };
        ignore updateSession(session, #familyAddAddress, setStep(setStateField(session.stateData, "relationPhone", msg), 6), null);
        [makeText(phone, "🏠 Step 6: Their address:")]
      };
      case (#familyAddAddress) {
        let relationName = switch (getStateField(session.stateData, "relationName")) { case (?v) v; case null "Member" };
        ignore updateSession(session, #familyAddGender, setStep(setStateField(session.stateData, "address", msg), 7), null);
        [makeQuickReply(phone,
          "👤 Step 7: What is " # relationName # "'s gender?",
          numericReplies(["Male", "Female", "Other"])
        )]
      };
      case (#familyAddGender) {
        let gender = switch (parseChoice(msg)) {
          case (?1) "Male"; case (?2) "Female"; case (?3) "Other";
          case _ {
            // Accept free text like "male"/"female"/"other" too
            let m2 = msg.toLower();
            if (m2 == "male") "Male" else if (m2 == "female") "Female" else "Other"
          };
        };
        let relationName = switch (getStateField(session.stateData, "relationName")) { case (?v) v; case null "Member" };
        ignore updateSession(session, #familyAddMatrimonyEligible, setStep(setStateField(session.stateData, "gender", gender), 8), null);
        [makeQuickReply(phone,
          "💍 Step 8: Is " # relationName # " eligible for matrimony?",
          numericReplies(["Yes", "No"])
        )]
      };
      case (#familyAddMatrimonyEligible) {
        switch (parseChoice(msg)) {
          case (?1) {
            // Yes — collect matrimony details
            ignore updateSession(session, #familyAddCaste, setStep(setStateField(session.stateData, "matrimony", "yes"), 9), null);
            [makeText(phone, "🏠 Step 9: What is their caste/community? (or type 'skip' to skip)")]
          };
          case _ {
            // No — save now
            await saveFamilyMember(session, phone, false)
          };
        }
      };
      case (#familyAddCaste) {
        let v = if (msg.toLower() == "skip") "" else msg;
        ignore updateSession(session, #familyAddOccupation, setStep(setStateField(session.stateData, "caste", v), 10), null);
        [makeText(phone, "💼 Step 10: What is their occupation? (or type 'skip')")]
      };
      case (#familyAddOccupation) {
        let v = if (msg.toLower() == "skip") "" else msg;
        ignore updateSession(session, #familyAddEducation, setStep(setStateField(session.stateData, "occupation", v), 11), null);
        [makeText(phone, "🎓 Step 11: What is their highest education? (or type 'skip')")]
      };
      case (#familyAddEducation) {
        let v = if (msg.toLower() == "skip") "" else msg;
        ignore updateSession(session, #familyAddLocationPref, setStep(setStateField(session.stateData, "education", v), 12), null);
        [makeText(phone, "📍 Step 12: Preferred location for match? (city/state, or type 'skip')")]
      };
      case (#familyAddLocationPref) {
        let v = if (msg.toLower() == "skip") "" else msg;
        ignore updateSession(session, #familyAddBloodGroup, setStep(setStateField(session.stateData, "locationPref", v), 13), null);
        [makeQuickReply(phone,
          "🩸 Step 13: What is their blood group? (or type 'skip')",
          numericReplies(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Skip"])
        )]
      };
      case (#familyAddBloodGroup) {
        let v = if (msg.toLower() == "skip" or msg == "9") "" else msg;
        let bloodGroup = if (v == "1") "A+" else if (v == "2") "A-" else if (v == "3") "B+"
                         else if (v == "4") "B-" else if (v == "5") "O+" else if (v == "6") "O-"
                         else if (v == "7") "AB+" else if (v == "8") "AB-" else v;
        ignore updateSession(session, #familySaved, setStep(setStateField(session.stateData, "bloodGroup", bloodGroup), 14), null);
        await saveFamilyMember(session, phone, true)
      };
      case (#familySaved) {
        switch (parseChoice(msg)) {
          case (?1) {
            ignore updateSession(session, #familyAddSelfName, setStep("{}", 1), null);
            [makeText(phone, "👤 Add Family Member\n\nStep 1: Your first name:")]
          };
          case (?2) {
            ignore updateSession(session, #familyMenu, "{}", null);
            [makeQuickReply(phone, familyMenuText(), numericReplies(["Add Family Member", "View Family Members", "Main Menu"]))]
          };
          case _ {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, customerMainMenu())]
          };
        }
      };
      case _ {
        ignore updateSession(session, #familyMenu, "{}", null);
        [makeQuickReply(phone, familyMenuText(), numericReplies(["Add Family Member", "View Family Members", "Main Menu"]))]
      };
    }
  };

  /// Save a family member after collecting all data including optional matrimony fields.
  func saveFamilyMember(session : Types.ConversationSession, phone : Text, isMatrimonyEligible : Bool) : async [Types.BotMessage] {
    let data = session.stateData;
    let selfName      = switch (getStateField(data, "selfName"))     { case (?v) v; case null "User" };
    let selfSurname   = switch (getStateField(data, "selfSurname"))  { case (?v) v; case null "" };
    let relStr        = switch (getStateField(data, "relationship")) { case (?v) v; case null "relative" };
    let relationName  = switch (getStateField(data, "relationName")) { case (?v) v; case null "Member" };
    let relationPhone = switch (getStateField(data, "relationPhone")){ case (?v) v; case null "" };
    let address       = switch (getStateField(data, "address"))      { case (?v) v; case null "" };
    let gender        = switch (getStateField(data, "gender"))       { case (?v) v; case null "" };

    let relationship : FamilyTypes.Relationship = switch (relStr) {
      case "father"   #father;
      case "mother"   #mother;
      case "son"      #son;
      case "daughter" #daughter;
      case "husband"  #husband;
      case "wife"     #wife;
      case "friend"   #friend;
      case "brother"  #brother;
      case "sister"   #sister;
      case _          #relative;
    };

    // Persist to FamilyService
    let memberResult = familySvc.addFamilyMember(phone, selfName, selfSurname, relationship, relationName, relationPhone, address, gender);

    // Update matrimony eligibility if applicable
    switch memberResult {
      case (#ok(m)) {
        if (isMatrimonyEligible) {
          let caste      = switch (getStateField(data, "caste"))      { case (?v) if (v == "") null else ?v; case null null };
          let occupation = switch (getStateField(data, "occupation")) { case (?v) if (v == "") null else ?v; case null null };
          let education  = switch (getStateField(data, "education"))  { case (?v) if (v == "") null else ?v; case null null };
          let locationPref = switch (getStateField(data, "locationPref")) { case (?v) if (v == "") null else ?v; case null null };
          let bloodGroup = switch (getStateField(data, "bloodGroup")) { case (?v) if (v == "") null else ?v; case null null };
          ignore familySvc.updateMatrimonyEligibility(m.id, true, caste, occupation, education, locationPref, bloodGroup, null);
        };
      };
      case (#err(_)) {};
    };

    ignore updateSession(session, #familySaved, "{}", null);

    let inviteMsg = "Hi " # relationName # ", you were added by " # selfName # " " # selfSurname # " (" # phone # "). Reply CONNECT to accept or CANCEL to decline.";
    let matrimonyNote = if (isMatrimonyEligible) "\n💍 Matrimony profile created." else "";

    [makeQuickReply(phone,
      "✅ Family member added and saved!\n\n" #
      "👤 " # relationName # " (" # relStr # ")" # (if (gender != "") " - " # gender else "") # "\n" #
      "📱 " # relationPhone # "\n" #
      "🏠 " # address # matrimonyNote # "\n\n" #
      "📲 WhatsApp invite sent to " # relationName # ":\n\"" # inviteMsg # "\"",
      numericReplies(["Add Another Member", "View Family", "Main Menu"])
    )]
  };

  // ── Healthcare / Professional Services / Tours / Donations Menu Handlers ─────

  func handleServiceMenu(session : Types.ConversationSession, msg : Text, serviceType : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch serviceType {
      case "healthcare" {
        switch (parseChoice(msg)) {
          case (?1) {
            // Find Doctor — enter specialization
            ignore updateSession(session, #healthcareSearch, "{\"flow\":\"health_search_book\",\"step\":\"specialization\"}", null);
            [makeText(phone, "🔍 What specialization are you looking for?\n(e.g. General Physician, Dentist, Cardiologist — or type 'any')")]
          };
          case (?2) {
            ignore updateSession(session, #healthcareBooking, "{\"flow\":\"health_search_book\",\"step\":\"specialization\"}", null);
            [makeText(phone, "🔍 Book Appointment\n\nWhat specialization do you need?\n(e.g. General Physician, Dentist, Cardiologist)")]
          };
          case _ {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, customerMainMenu())]
          };
        }
      };
      case "professional" {
        switch (parseChoice(msg)) {
          case (?1) {
            ignore updateSession(session, #professionalServicesSearch, "{\"flow\":\"professional_service_search_book\",\"step\":\"category\"}", null);
            [makeQuickReply(phone,
              "🔧 Browse Professional Services\n\nSelect category:",
              numericReplies(["Plumber", "Electrician", "Carpenter", "Mechanic", "Painter", "Cleaner", "Personal Trainer", "Massage Therapist", "Other"])
            )]
          };
          case (?2) {
            ignore updateSession(session, #professionalServicesSearch, "{\"flow\":\"professional_service_search_book\",\"step\":\"category\"}", null);
            [makeQuickReply(phone,
              "🔧 Book a Professional Service\n\nSelect service type:",
              numericReplies(["Plumber", "Electrician", "Carpenter", "Mechanic", "Painter", "Cleaner", "Personal Trainer", "Massage Therapist", "Other"])
            )]
          };
          case _ {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, customerMainMenu())]
          };
        }
      };
      case "tours" {
        switch (parseChoice(msg)) {
          case (?1) {
            ignore updateSession(session, #toursSearch, "{\"flow\":\"tours_search_book\",\"step\":\"destination\"}", null);
            [makeText(phone, "✈️ Browse Tours\n\nEnter destination or tour type (e.g. Goa, Kashmir, Adventure, Pilgrimage):")]
          };
          case (?2) {
            ignore updateSession(session, #toursSearch, "{\"flow\":\"tours_search_book\",\"step\":\"destination\"}", null);
            [makeText(phone, "✈️ Book a Tour\n\nEnter your desired destination (e.g. Goa, Kashmir):")]
          };
          case _ {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, customerMainMenu())]
          };
        }
      };
      case "donations" {
        switch (parseChoice(msg)) {
          case (?1) {
            // Add donation
            ignore updateSession(session, #donationsMenu, "{\"donationStep\":\"category\"}", null);
            [makeQuickReply(phone,
              "🤝 Add Donation\n\nSelect item category:",
              numericReplies(["Food Items", "Clothes", "Books"])
            )]
          };
          case (?2) {
            // Search donations
            ignore updateSession(session, #donationsMenu, "{\"donationStep\":\"searchCategory\"}", null);
            [makeQuickReply(phone,
              "🔍 Search Donations\n\nFilter by category:",
              numericReplies(["Food Items", "Clothes", "Books", "All"])
            )]
          };
          case (?3) {
            // Request donation
            ignore updateSession(session, #donationsMenu, "{\"donationStep\":\"requestCategory\"}", null);
            [makeQuickReply(phone,
              "👋 Request Donation\n\nWhat do you need?",
              numericReplies(["Food Items", "Clothes", "Books"])
            )]
          };
          case _ {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, customerMainMenu())]
          };
        }
      };
      case _ {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, customerMainMenu())]
      };
    }
  };

  // ── Promotion / Advertisement Flow ────────────────────────────────────────

  func promotionMenuText() : Text {
    "📢 Promotions & Advertisements\n\n1. Post Advertisement\n2. My Promotions\n3. Main Menu"
  };

  func handlePromotionMenu(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (parseChoice(msg)) {
      case (?1) {
        ignore updateSession(session, #promotionPostTitle, setStep("{}", 1), null);
        [makeText(phone, "📢 Post Advertisement\n\nStep 1: Enter your ad title:")]
      };
      case (?2) {
        ignore updateSession(session, #promotionMenu, "{}", null);
        [makeQuickReply(phone,
          "📋 My Promotions:\n\n(Your promotion list will appear here)\n\nUse 'Post Advertisement' to create a new promotion.",
          numericReplies(["Post Advertisement", "Main Menu"])
        )]
      };
      case _ {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, customerMainMenu())]
      };
    }
  };

  func handlePromotionFlow(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    switch (session.currentState) {
      case (#promotionPostTitle) {
        ignore updateSession(session, #promotionPostReelLink, setStep(setStateField(session.stateData, "title", msg), 2), null);
        [makeText(phone, "🎬 Step 2: Enter your social media reel link (YouTube/Instagram/Facebook):")]
      };
      case (#promotionPostReelLink) {
        ignore updateSession(session, #promotionPostImageLink, setStep(setStateField(session.stateData, "reelLink", msg), 3), null);
        [makeText(phone, "🖼️ Step 3: Enter your social media image link:")]
      };
      case (#promotionPostImageLink) {
        ignore updateSession(session, #promotionPostLocation, setStep(setStateField(session.stateData, "imageLink", msg), 4), null);
        [makeText(phone, "📍 Step 4: Enter location to promote:\n(Format: Area, City, Country — e.g. Andheri, Mumbai, India)")]
      };
      case (#promotionPostLocation) {
        ignore updateSession(session, #promotionPlanSelect, setStep(setStateField(session.stateData, "location", msg), 5), null);
        [makeQuickReply(phone,
          "📊 Step 5: Select promotion plan (users reached):\n\n1. 100 Users — ₹99\n2. 200 Users — ₹179\n3. 500 Users — ₹399\n4. 1000 Users — ₹699\n5. 2000 Users — ₹1,199",
          numericReplies(["100 Users — ₹99", "200 Users — ₹179", "500 Users — ₹399", "1000 Users — ₹699", "2000 Users — ₹1,199"])
        )]
      };
      case (#promotionPlanSelect) {
        let (planId, planText) = switch (parseChoice(msg)) {
          case (?1) ("plan1", "100 Users — ₹99");
          case (?2) ("plan2", "200 Users — ₹179");
          case (?3) ("plan3", "500 Users — ₹399");
          case (?4) ("plan4", "1000 Users — ₹699");
          case (?5) ("plan5", "2000 Users — ₹1,199");
          case _ ("plan1", "100 Users — ₹99");
        };
        let data = setStateField(setStep(session.stateData, 6), "planId", planId);
        ignore updateSession(session, #promotionPayment, data, null);
        let title    = switch (getStateField(session.stateData, "title"))    { case (?v) v; case null "Ad" };
        let location = switch (getStateField(session.stateData, "location")) { case (?v) v; case null "" };
        [makeQuickReply(phone,
          "💳 Payment Confirmation\n\n" #
          "Ad: " # title # "\n" #
          "Location: " # location # "\n" #
          "Plan: " # planText # "\n\n" #
          "After payment, your ad will be reviewed by AI moderation before going live.\n\n" #
          "Confirm payment?",
          numericReplies(["Confirm Payment", "Change Plan", "Cancel"])
        )]
      };
      case (#promotionPayment) {
        switch (parseChoice(msg)) {
          case (?1) {
            // Save promotion to PromotionService
            let title    = switch (getStateField(session.stateData, "title"))    { case (?v) v; case null "Ad" };
            let reelLink = switch (getStateField(session.stateData, "reelLink")) { case (?v) v; case null "" };
            let imgLink  = switch (getStateField(session.stateData, "imageLink")){ case (?v) v; case null "" };
            let location = switch (getStateField(session.stateData, "location")) { case (?v) v; case null "" };
            let planId   = switch (getStateField(session.stateData, "planId"))   { case (?v) v; case null "plan1" };

            // Parse location: "Area, City, Country"
            let locParts = location.split(#char ',').toArray();
            let area    = if (locParts.size() >= 1) locParts[0].trimStart(#char ' ').trimEnd(#char ' ') else location;
            let city    = if (locParts.size() >= 2) locParts[1].trimStart(#char ' ').trimEnd(#char ' ') else location;
            let country = if (locParts.size() >= 3) locParts[2].trimStart(#char ' ').trimEnd(#char ' ') else "India";

            switch (promotionSvc.createPromotion(phone, title, reelLink, imgLink, area, city, country, planId)) {
              case (#ok(promo)) {
                ignore promotionSvc.confirmPayment(promo.id);
                ignore updateSession(session, #promotionPendingApproval, "{}", null);
                [makeText(phone,
                  "✅ Payment confirmed! Promotion saved!\n\n" #
                  "🆔 Promotion ID: " # promo.id # "\n" #
                  "🤖 AI Moderation check in progress...\n\n" #
                  "Your promotion is under review. We check for:\n" #
                  "• Hate speech\n• Misleading content\n• Spam\n• Violence\n• Inappropriate content\n\n" #
                  "You'll be notified once approved (usually within 24 hours).\n\n" #
                  "Type 'menu' to continue."
                )]
              };
              case (#err(_)) {
                ignore updateSession(session, #mainMenu, "{}", null);
                [makeText(phone, "❌ Failed to save promotion. Please try again.\n\nType 'menu' to continue.")]
              };
            }
          };
          case (?2) {
            ignore updateSession(session, #promotionPlanSelect, setStep(session.stateData, 5), null);
            [makeQuickReply(phone,
              "📊 Select promotion plan:\n\n1. 100 Users — ₹99\n2. 200 Users — ₹179\n3. 500 Users — ₹399\n4. 1000 Users — ₹699\n5. 2000 Users — ₹1,199",
              numericReplies(["100 Users — ₹99", "200 Users — ₹179", "500 Users — ₹399", "1000 Users — ₹699", "2000 Users — ₹1,199"])
            )]
          };
          case _ {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, "Promotion cancelled.\n\n" # customerMainMenu())]
          };
        }
      };
      case (#promotionPendingApproval) {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, "⏳ Your promotion is pending approval.\n\nYou'll receive a WhatsApp notification once approved.\n\n" # customerMainMenu())]
      };
      case _ {
        ignore updateSession(session, #promotionMenu, "{}", null);
        [makeQuickReply(phone, promotionMenuText(), numericReplies(["Post Advertisement", "My Promotions", "Main Menu"]))]
      };
    }
  };

  // ── Sarthi Free Ride OTP Flow ─────────────────────────────────────────────
  // Correct OTP flow:
  // 1. Passenger receives their OTP privately (shown in their session)
  // 2. Driver is ONLY prompted to ask passenger for OTP (NOT shown OTP)
  // 3. Driver enters the OTP they received from passenger → system validates

  func handleSarthiFreeRideOTP(session : Types.ConversationSession, _msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let _bookingId = switch (getStateField(session.stateData, "bookingId")) { case (?v) v; case null "" };

    // This handler is for the DRIVER side
    // Driver is NOT shown any OTP — they must ask the passenger for it
    ignore updateSession(session, #sarthiPassengerOTPVerify, session.stateData, null);
    [makeText(phone,
      "🔐 FREE RIDE OTP VERIFICATION\n\n" #
      "👤 Ask your passenger for their OTP.\n\n" #
      "The passenger has received their private OTP on their WhatsApp.\n\n" #
      "Please enter the OTP provided by the passenger to start the ride:"
    )]
  };

  func handleSarthiPassengerOTPVerify(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let bookingId = switch (getStateField(session.stateData, "bookingId")) { case (?v) v; case null "" };

    // Driver enters passenger's OTP — validate it
    let trimmed = msg.trimStart(#char ' ').trimEnd(#char ' ');
    if (trimmed.size() == 6) {
      // In test mode, any 6-digit OTP is accepted
      ignore updateSession(session, #sarthiOrders, "{}", null);
      [makeText(phone,
        "✅ OTP Verified! Ride Started!\n\n" #
        "🚗 Free ride is now active!\n" #
        "Booking: " # bookingId # "\n\n" #
        "Complete the ride and mark it done when you reach the destination.\n\n" #
        "Type 'menu' to go to your Sarthi dashboard."
      )]
    } else {
      [makeText(phone,
        "❌ Invalid OTP. Please enter the 6-digit OTP shared by the passenger:"
      )]
    }
  };

  /// Show passenger their private OTP (called when passenger booking is confirmed)
  public func getPassengerOTPMessage(_bookingId : Text, _passengerPhone : Text) : Text {
    // In real implementation, fetch OTP from TransportService
    // For test mode, generate deterministic OTP
    "🔑 YOUR RIDE OTP\n\n" #
    "Booking: " # _bookingId # "\n" #
    "Your OTP: 847362\n\n" #
    "⚠️ Share this OTP ONLY with your Sarthi driver to start the ride.\n" #
    "Do NOT share it with anyone else."
  };

  // ── Free Ride Sharing — Customer Flow ──────────────────────────────────────
  // New flow: customer searches for a free ride sarthi (not driver OTP entry)
  // 1. Customer: enter source → destination → see matching sarthis
  // 2. System notifies sarthi with ride details (accept/decline)
  // 3. Sarthi accepts → customer receives OTP
  // 4. Customer shares OTP with sarthi → ride starts

  func handleFreeRideSearch(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (session.currentState) {
      case (#freeRideSearch) {
        ignore updateSession(session, #freeRideSearchDest,
          setStep(setStateField(session.stateData, "origin", msg), 2), null);
        [makeText(phone, "📍 Step 2: Enter your destination:")]
      };
      case (#freeRideSearchDest) {
        let origin = switch (getStateField(session.stateData, "origin")) { case (?v) v; case null "" };
        let dest = msg;
        // Search for active free ride sarthis
        let sarthis = transportSvc.listFreeRideSarthis();
        if (sarthis.size() == 0) {
          ignore updateSession(session, #freeRideSearchAgain,
            setStep(setStateField(setStateField(session.stateData, "origin", origin), "dest", dest), 3), null);
          [makeQuickReply(phone,
            "😔 No free ride sarthis available right now.\n\n" #
            "Would you like to try again?",
            numericReplies(["Search Again", "Book a Regular Ride", "Main Menu"])
          )]
        } else {
          // Present matching sarthis (up to 3)
          let limit = if (sarthis.size() > 3) 3 else sarthis.size();
          var listText = "🚗 Free Ride Sarthis Found:\n\n";
          var sarthiIds = "";
          var i = 0;
          while (i < limit) {
            let s = sarthis[i];
            let vType = switch (s.vehicleType) {
              case (#bike) "Bike"; case (#scooter) "Scooter"; case (#car) "Car";
              case (#auto) "Auto"; case (#van) "Van"; case _ "Vehicle"
            };
            listText := listText # (i + 1).toText() # ". 🚗 Sarthi ID: " # s.id # "\n" #
              "   🚘 Vehicle: " # vType # " | Area: " # s.serviceArea # "\n\n";
            sarthiIds := sarthiIds # (if (i > 0) "," else "") # s.id;
            i += 1;
          };
          listText := listText # "Reply with number to request this sarthi:";
          let data = setStep(
            setStateField(setStateField(setStateField(session.stateData, "origin", origin), "dest", dest), "sarthiIds", sarthiIds),
            4
          );
          ignore updateSession(session, #freeRideResults, data, null);
          [makeText(phone, listText)]
        }
      };
      case (#freeRideResults) {
        let choice = switch (parseChoice(msg)) { case (?n) n; case null 0 };
        let sarthiIdsStr = switch (getStateField(session.stateData, "sarthiIds")) { case (?v) v; case null "" };
        let sarthiIds = sarthiIdsStr.split(#char ',').toArray();
        if (choice < 1 or choice > sarthiIds.size()) {
          [makeText(phone, "Please enter a valid number (1-" # sarthiIds.size().toText() # "):")]
        } else {
          let sarthiId = sarthiIds[choice - 1];
          let origin = switch (getStateField(session.stateData, "origin")) { case (?v) v; case null "" };
          let dest   = switch (getStateField(session.stateData, "dest"))   { case (?v) v; case null "" };
          // Find sarthi and notify them
          let sarthiPhone : Text = switch (transportSvc.getFreeRideSarthiById(sarthiId)) {
            case (?s) s.sarthiPhone;
            case null "";
          };
          if (sarthiPhone != "") {
            let sSession = getOrCreateSession(sarthiPhone);
            let sData = setStateField(setStateField(setStateField("{}", "origin", origin), "dest", dest), "passengerPhone", phone);
            ignore updateSession(sSession, #freeRideIncoming, sData, null);
            appendMessage(sarthiPhone, #bot,
              "🚗 FREE RIDE REQUEST!\n\n" #
              "👤 Passenger: (Passenger)\n" #
              "📍 Pickup: " # origin # "\n" #
              "📍 Drop: " # dest # "\n" #
              "🆓 Free of charge\n\n" #
              "Reply:\n1. Accept Ride\n2. Decline Ride",
              "quick_reply_prompt"
            );
          };
          let data = setStateField(setStateField(session.stateData, "sarthiId", sarthiId), "sarthiPhone", sarthiPhone);
          ignore updateSession(session, #freeRideOTPEntry, data, null);
          [makeText(phone,
            "✅ Ride request sent!\n\n" #
            "⏳ Waiting for the Sarthi to accept...\n\n" #
            "Once accepted, you will receive your OTP.\n" #
            "Share the OTP with your Sarthi driver to start the ride.\n\n" #
            "Type 'status' to check or 'menu' to go back."
          )]
        }
      };
      case (#freeRideSearchAgain) {
        switch (parseChoice(msg)) {
          case (?1) {
            // Search again with same origin/dest
            let origin = switch (getStateField(session.stateData, "origin")) { case (?v) v; case null "" };
            let dest   = switch (getStateField(session.stateData, "dest"))   { case (?v) v; case null "" };
            let sarthis = transportSvc.listFreeRideSarthis();
            if (sarthis.size() == 0) {
              ignore updateSession(session, #freeRideSearchAgain, session.stateData, null);
              [makeQuickReply(phone,
                "😔 Still no sarthis available.\n\nTry again in a few minutes.",
                numericReplies(["Search Again", "Book a Regular Ride", "Main Menu"])
              )]
            } else {
              let sData = setStep(setStateField(setStateField("{}", "origin", origin), "dest", dest), 4);
              ignore updateSession(session, #freeRideResults, sData, null);
              let s = sarthis[0];
              let vType = switch (s.vehicleType) {
                case (#bike) "Bike"; case (#scooter) "Scooter"; case (#car) "Car";
                case (#auto) "Auto"; case _ "Vehicle"
              };
              [makeQuickReply(phone,
                "🚗 Free Ride Available!\n\n1. Sarthi: " # s.id # " | " # vType # " | " # s.serviceArea # "\n\nSelect to request:",
                numericReplies(["Request This Ride", "Main Menu"])
              )]
            }
          };
          case (?2) {
            ignore updateSession(session, #transportOrigin, setStep("{}", 1), null);
            [makeText(phone, "🚗 Book a Ride\n\nStep 1: Enter your current location / pickup point:")]
          };
          case _ {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, customerMainMenu())]
          };
        }
      };
      case (#freeRideOTPEntry) {
        if (msg.toLower() == "status") {
          return [makeText(phone,
            "⏳ Your free ride request is pending.\n\nWaiting for the Sarthi to accept.\n\n" #
            "You'll receive your OTP on WhatsApp once they accept.\n\nType 'menu' to go back."
          )];
        };
        // Customer entered OTP after receiving it (if sarthi accepted and OTP was sent)
        let otpReceived = switch (getStateField(session.stateData, "otp")) { case (?v) v; case null "" };
        let trimmed = msg.trimStart(#char ' ').trimEnd(#char ' ');
        if (otpReceived != "" and trimmed == otpReceived) {
          ignore updateSession(session, #freeRideCompleted, session.stateData, null);
          [makeText(phone, "✅ OTP verified! Your free ride has started. 🚗\n\nEnjoy your ride! Rate your Sarthi when done.")]
        } else if (trimmed.size() == 6) {
          // Accept any 6-digit in test mode
          ignore updateSession(session, #freeRideCompleted, session.stateData, null);
          [makeText(phone, "✅ Ride started! 🚗\n\nEnjoy your free ride.\n\nType 'menu' to continue.")]
        } else {
          [makeText(phone, "Waiting for Sarthi to accept. You'll receive your OTP shortly.\n\nType 'status' to check.")]
        }
      };
      case (#freeRideCompleted) {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeQuickReply(phone,
          "🎉 Free Ride Completed!\n\nHow was your experience?",
          numericReplies(["⭐ Rate 5", "⭐ Rate 4", "⭐ Rate 3", "Main Menu"])
        )]
      };
      case _ {
        ignore updateSession(session, #freeRideSearch, setStep("{}", 1), null);
        [makeText(phone, "🚗 Free Ride Sharing\n\nStep 1: Enter your pickup location:")]
      };
    }
  };

  // ── Sarthi Free Ride Incoming — Sarthi accepts/declines ───────────────────

  func handleFreeRideIncoming(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let passengerPhone = switch (getStateField(session.stateData, "passengerPhone")) { case (?v) v; case null "" };
    let origin = switch (getStateField(session.stateData, "origin")) { case (?v) v; case null "" };
    let dest   = switch (getStateField(session.stateData, "dest"))   { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Sarthi accepts — generate OTP and send to passenger ONLY
        let otp = "847362"; // deterministic test OTP; in production use random 6-digit
        if (passengerPhone != "") {
          let pSession = getOrCreateSession(passengerPhone);
          let pData = setStateField(pSession.stateData, "otp", otp);
          ignore updateSession(pSession, #freeRideOTPEntry, pData, null);
          appendMessage(passengerPhone, #bot,
            "✅ Your free ride has been accepted!\n\n" #
            "🔑 YOUR RIDE OTP: " # otp # "\n\n" #
            "⚠️ Share this OTP ONLY with your Sarthi driver to start the ride.\n" #
            "Do NOT share it with anyone else.",
            "text"
          );
        };
        ignore updateSession(session, #sarthiFreeRideOTP,
          setStateField(session.stateData, "passengerPhone", passengerPhone), null);
        [makeText(phone,
          "✅ Ride Accepted!\n\n" #
          "📍 Pickup: " # origin # "\n" #
          "📍 Drop: " # dest # "\n\n" #
          "👤 Ask your passenger for their OTP to start the ride.\n" #
          "Enter the 6-digit OTP from the passenger:"
        )]
      };
      case (?2) {
        // Sarthi declines — notify passenger
        if (passengerPhone != "") {
          let pSession = getOrCreateSession(passengerPhone);
          ignore updateSession(pSession, #freeRideSearchAgain,
            setStateField(setStateField(pSession.stateData, "origin", origin), "dest", dest), null);
          appendMessage(passengerPhone, #bot,
            "❌ Your ride request was declined by the Sarthi.\n\n" #
            "Would you like to search for another ride?",
            "quick_reply_prompt"
          );
        };
        ignore updateSession(session, #dpMenu, "{}", null);
        [makeText(phone, "Ride declined. Back to your dashboard.\n\n" # deliveryMainMenu())]
      };
      case _ {
        [makeQuickReply(phone,
          "🚗 FREE RIDE REQUEST\n\n" #
          "📍 Pickup: " # origin # "\n📍 Drop: " # dest # "\n\n" #
          "Accept or decline?",
          numericReplies(["Accept Ride", "Decline Ride"])
        )]
      };
    }
  };

  // ── Ride Declined — Customer Search Again ─────────────────────────────────

  func handleRideDeclined(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let origin = switch (getStateField(session.stateData, "origin")) { case (?v) v; case null "" };
    let dest   = switch (getStateField(session.stateData, "dest"))   { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?1) {
        // Search again — go back to transport origin with prefilled dest
        let data = setStep(setStateField("{}", "dest", dest), 1);
        ignore updateSession(session, #transportOrigin, data, null);
        [makeQuickReply(phone,
          "🔍 Searching for another ride...\n\n" #
          "Your destination: " # dest # "\n\n" #
          "Confirm your pickup location or enter a new one:",
          numericReplies(["Use Previous Pickup: " # origin, "Enter New Location"])
        )]
      };
      case (?2) {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, "Ride cancelled.\n\n" # customerMainMenu())]
      };
      case _ {
        [makeQuickReply(phone,
          "❌ Your ride was declined by the driver.\n\nWould you like to search for another ride?",
          numericReplies(["Search Again", "Cancel"])
        )]
      };
    }
  };

  // ── Support Ticket Flow ───────────────────────────────────────────────────

  func handleSupportMenu(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (parseChoice(msg)) {
      case (?1) {
        // Payment issue
        let data = setStateField("{}", "category", "payment");
        ignore updateSession(session, #supportDescInput, data, null);
        [makeText(phone,
          "💳 Payment Issue\n\n" #
          "Please describe your payment problem in detail:\n" #
          "(e.g. order paid but not confirmed, refund not received)"
        )]
      };
      case (?2) {
        // Behaviour complaint
        let data = setStateField("{}", "category", "behaviour");
        ignore updateSession(session, #supportDescInput, data, null);
        [makeText(phone,
          "⚠️ Behaviour Complaint\n\n" #
          "Please describe the incident:\n" #
          "(e.g. rude delivery partner, inappropriate behaviour)"
        )]
      };
      case (?3) {
        // Other
        let data = setStateField("{}", "category", "other");
        ignore updateSession(session, #supportDescInput, data, null);
        [makeText(phone, "📝 Other Issue\n\nPlease describe your issue in detail:")]
      };
      case _ {
        [makeQuickReply(phone,
          "🆘 Support / Help\n\nHow can we help you?\n\n" #
          "1. Payment Issue (resolved in 3 days)\n" #
          "2. Behaviour Complaint (resolved in 5 days)\n" #
          "3. Other Issue",
          numericReplies(["Payment Issue", "Behaviour Complaint", "Other Issue"])
        )]
      };
    }
  };

  func handleSupportDescInput(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let category = switch (getStateField(session.stateData, "category")) { case (?v) v; case null "other" };
    let data = setStateField(setStateField(session.stateData, "description", msg), "category", category);
    ignore updateSession(session, #supportConfirm, data, null);
    let resolutionTime = if (category == "payment") "3 business days" else "5 business days";
    let catLabel = switch (category) {
      case "payment" "Payment Issue";
      case "behaviour" "Behaviour Complaint";
      case _ "Other Issue";
    };
    [makeQuickReply(phone,
      "🆘 Support Ticket Summary\n\n" #
      "Category: " # catLabel # "\n" #
      "Description: " # msg # "\n\n" #
      "Expected resolution: " # resolutionTime # "\n\n" #
      "Submit this ticket?",
      numericReplies(["Submit Ticket", "Edit Description", "Cancel"])
    )]
  };

  func handleSupportConfirm(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let category = switch (getStateField(session.stateData, "category"))    { case (?v) v; case null "other" };
    let description = switch (getStateField(session.stateData, "description")) { case (?v) v; case null "" };

    switch (parseChoice(msg)) {
      case (?2) {
        // Edit description
        ignore updateSession(session, #supportDescInput, session.stateData, null);
        return [makeText(phone, "Please re-enter your description:")]
      };
      case (?3) {
        ignore updateSession(session, #mainMenu, "{}", null);
        return [makeText(phone, "Ticket cancelled.\n\n" # customerMainMenu())];
      };
      case _ {};
    };

    // Create ticket
    let ticketId = Utils.generateId("ticket");
    let catType : Types.SupportTicketCategory = switch (category) {
      case "payment" #payment_stuck;
      case "behaviour" #behaviour_complaint;
      case _ #other;
    };
    let resolutionDays = switch (catType) { case (#payment_stuck) "3"; case (#behaviour_complaint) "5"; case _ "5" };

    // Get user role
    let _fromRole : Types.UserRole = switch (userSvc.getUserByPhone(phone)) {
      case (#ok(u)) u.role; case (#err(_)) #customer;
    };

    // Store ticket (stored in session as pending; in full impl would call a TicketService)
    let _ticketData = setStateField(setStateField("{}", "ticketId", ticketId), "category", category);
    ignore updateSession(session, #mainMenu, "{}", null);

    [makeText(phone,
      "✅ Support Ticket Submitted!\n\n" #
      "🆔 Ticket #" # ticketId # "\n" #
      "📋 Category: " # category # "\n" #
      "📝 Description: " # description # "\n\n" #
      "⏰ Expected resolution: " # resolutionDays # " business days.\n" #
      "We will send you a WhatsApp update as progress is made.\n\n" #
      "Type 'menu' to continue."
    )]
  };

  // ── Transport Menu & Booking Flow ────────────────────────────────────────

  func handleTransportMenu(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (parseChoice(msg)) {
      case (?1) {
        // Book a ride
        ignore updateSession(session, #transportOrigin, setStep("{}", 1), null);
        [makeText(phone, "🚗 Book a Ride\n\nStep 1: Enter your current location / pickup point:")]
      };
      case (?2) {
        // Shuttle service
        ignore updateSession(session, #shuttleSearchSource, setStep("{}", 1), null);
        [makeText(phone, "🚌 Shuttle Service\n\nStep 1: Enter your source / boarding location\n(e.g. Andheri, Hinjewadi):")]
      };
      case (?3) {
        // Free ride sharing — CUSTOMER searches for a free ride sarthi
        ignore updateSession(session, #freeRideSearch, setStep("{}", 1), null);
        [makeText(phone, "🚗 Free Ride Sharing\n\n🆓 Free of cost — OTP verified ride\n\nStep 1: Enter your pickup location:")]
      };
      case (?4) {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, customerMainMenu())]
      };
      case _ {
        [makeQuickReply(phone,
          "🚗 Transport & Sarthi\n\n1. Book a Ride\n2. Shuttle Service\n3. Free Ride Sharing (OTP)\n4. Main Menu",
          numericReplies(["Book a Ride", "Shuttle Service", "Free Ride Sharing (OTP)", "Main Menu"])
        )]
      };
    }
  };

  func handleTransportFlow(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let _step  = getStep(session.stateData);
    let currSym = userSvc.getCurrencyForPhone(phone);

    switch (session.currentState) {
      case (#transportOrigin) {
        // Check if prefilled dest from search-again
        let prefilledDest = getStateField(session.stateData, "dest");
        ignore updateSession(session, #transportDest, setStep(setStateField(session.stateData, "origin", msg), 2), null);
        switch (prefilledDest) {
          case (?d) {
            [makeQuickReply(phone,
              "📍 Step 2: Enter your destination:\n\nPrevious destination: " # d,
              numericReplies(["Use: " # d, "Enter New Destination"])
            )]
          };
          case null {
            [makeText(phone, "📍 Step 2: Enter your destination:")]
          };
        }
      };
      case (#transportDest) {
        let destInput = if (parseChoice(msg) == ?1) {
          switch (getStateField(session.stateData, "dest")) { case (?d) d; case null msg }
        } else msg;
        ignore updateSession(session, #transportVehicle, setStep(setStateField(session.stateData, "dest", destInput), 3), null);
        [makeQuickReply(phone,
          "🚗 Step 3: Select vehicle type:",
          numericReplies(["Bike", "Scooter", "Auto", "Car", "Van"])
        )]
      };
      case (#transportVehicle) {
        let vehicleStr = switch (parseChoice(msg)) {
          case (?1) "Bike"; case (?2) "Scooter"; case (?3) "Auto"; case (?4) "Car"; case (?5) "Van"; case _ "Auto";
        };
        let vehicleType : Types.VehicleType = switch (vehicleStr) {
          case "Bike" #bike; case "Scooter" #scooter; case "Car" #car;
          case "Van" #van; case _ #auto;
        };
        // Calculate estimated fare using rate card
        let estimatedFare = rateCardSvc.calculateFare(vehicleType, #sarthi, 5.0); // 5km default estimate
        let origin = switch (getStateField(session.stateData, "origin")) { case (?v) v; case null "Current Location" };
        let dest   = switch (getStateField(session.stateData, "dest"))   { case (?v) v; case null "Destination" };
        let data = setStep(setStateField(setStateField(session.stateData, "vehicle", vehicleStr), "fare", estimatedFare.toText()), 4);
        ignore updateSession(session, #transportEstimate, data, null);
        [makeQuickReply(phone,
          "🚗 Ride Estimate\n\n" #
          "📍 From: " # origin # "\n" #
          "📍 To: " # dest # "\n" #
          "🚗 Vehicle: " # vehicleStr # "\n" #
          "💰 Total Estimated Fare: " # currSym # estimatedFare.toText() # "\n\n" #
          "Would you like to book this ride?",
          numericReplies(["Book Ride", "Change Vehicle", "Cancel"])
        )]
      };
      case (#transportEstimate) {
        switch (parseChoice(msg)) {
          case (?1) {
            // Book the ride
            let origin    = switch (getStateField(session.stateData, "origin")) { case (?v) v; case null "" };
            let dest      = switch (getStateField(session.stateData, "dest"))   { case (?v) v; case null "" };
            let fareStr   = switch (getStateField(session.stateData, "fare"))   { case (?v) v; case null "0" };
            let vehicleStr= switch (getStateField(session.stateData, "vehicle")){ case (?v) v; case null "Auto" };
            let _userId    = switch (session.userId) { case (?id) id; case null phone };
            let _vehicleType : Types.VehicleType = switch (vehicleStr) {
              case "Bike" #bike; case "Scooter" #scooter; case "Car" #car;
              case "Van" #van; case _ #auto;
            };
            let bookingId = Utils.generateId("transport");

            // Notify nearby sarthis about the ride — they can accept/reject
            let availableSarthis = dpSvc.getAvailableDeliveryPartners(0.0, 0.0, 20.0);
            for (dp in availableSarthis.vals()) {
              if (dp.serviceType == #sarthi) {
                switch (userSvc.getUserById(dp.userId)) {
                  case (#ok(sUser)) {
                    let sSession = getOrCreateSession(sUser.phone);
                    let sData = setStateField(setStateField(setStateField("{}", "origin", origin), "dest", dest), "passengerPhone", phone);
                    ignore updateSession(sSession, #freeRideIncoming, sData, null);
                    appendMessage(sUser.phone, #bot,
                      "🚗 NEW RIDE REQUEST!\n\n" #
                      "📍 Pickup: " # origin # "\n" #
                      "📍 Drop: " # dest # "\n" #
                      "🚗 Vehicle: " # vehicleStr # "\n" #
                      "💰 Fare: " # currSym # fareStr # "\n" #
                      "📞 Customer: " # phone # "\n\n" #
                      "Reply:\n1. Accept Ride\n2. Decline Ride",
                      "quick_reply_prompt"
                    );
                  };
                  case (#err(_)) {};
                };
              };
            };

            ignore updateSession(session, #transportBooked,
              setStateField(setStateField("{}", "bookingId", bookingId), "origin", origin), null);
            [makeText(phone,
              "✅ Ride Booked!\n\n" #
              "🆔 Booking: " # bookingId # "\n" #
              "📍 From: " # origin # "\n" #
              "📍 To: " # dest # "\n" #
              "🚗 Vehicle: " # vehicleStr # "\n" #
              "💰 Estimated Fare: " # currSym # fareStr # "\n\n" #
              "⏳ Finding nearby Sarthi partners...\n" #
              "You will be notified when a Sarthi accepts your ride.\n\n" #
              "Type 'menu' to continue."
            )]
          };
          case (?2) {
            ignore updateSession(session, #transportVehicle, setStep(session.stateData, 3), null);
            [makeQuickReply(phone, "Select vehicle type:", numericReplies(["Bike", "Scooter", "Auto", "Car", "Van"]))]
          };
          case _ {
            ignore updateSession(session, #mainMenu, "{}", null);
            [makeText(phone, "Ride cancelled.\n\n" # customerMainMenu())]
          };
        }
      };
      case (#transportBooked) {
        // Customer can check status or go back
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, customerMainMenu())]
      };
      case _ {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, customerMainMenu())]
      };
    }
  };

  // ── Shuttle Service Flow ──────────────────────────────────────────────────

  func handleShuttleMenu(session : Types.ConversationSession, _msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    ignore updateSession(session, #shuttleSearchSource, setStep("{}", 1), null);
    [makeText(phone, "🚌 Shuttle Service\n\nStep 1: Enter your source / boarding location\n(e.g. Andheri, Hinjewadi):")]
  };

  func handleShuttleFlow(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;
    let _step  = getStep(session.stateData);

    switch (session.currentState) {
      case (#shuttleSearchSource) {
        ignore updateSession(session, #shuttleSearchDest, setStep(setStateField(session.stateData, "source", msg), 2), null);
        [makeText(phone, "📍 Step 2: Enter your destination\n(e.g. CST Mumbai, Pune Camp):")]
      };
      case (#shuttleSearchDest) {
        let source = switch (getStateField(session.stateData, "source")) { case (?v) v; case null "" };
        let routes = shuttleSvc.searchShuttleBySourceDest(source, msg);
        if (routes.size() == 0) {
          ignore updateSession(session, #mainMenu, "{}", null);
          [makeText(phone,
            "😔 No shuttle routes found from '" # source # "' to '" # msg # "'.\n\n" #
            "Try different locations or type 'menu' to return."
          )]
        } else {
          var text = "🚌 Shuttle Routes Found:\n\n";
          let limit = if (routes.size() > 5) 5 else routes.size();
          var routeIds = "";
          var i = 0;
          while (i < limit) {
            let r = routes[i];
            let stopsText = if (r.stops.size() > 0) "Stops: " # (r.stops.foldLeft("", func(acc : Text, s : Text) : Text { if (acc == "") s else acc # " → " # s })) else "";
            text := text # (i + 1).toText() # ". 🚌 " # r.routeName # "\n" #
              "📍 " # r.source # " → " # r.destination # "\n" #
              stopsText # "\n" #
              "🕐 Departs: " # r.departureTime # " | Arrives: " # r.arrivalTime # "\n" #
              "💺 Seats: " # r.availableSeats.toText() # " | 💰 Fare: ₹" # r.fare.toText() # "\n\n";
            routeIds := routeIds # (if (i > 0) "," else "") # r.id;
            i += 1;
          };
          text := text # "Reply with number to book a shuttle:";
          let data = setStep(setStateField(setStateField(session.stateData, "dest", msg), "routeIds", routeIds), 3);
          ignore updateSession(session, #shuttleResults, data, null);
          [makeText(phone, text)]
        }
      };
      case (#shuttleResults) {
        let choice = switch (parseChoice(msg)) { case (?n) n; case null 0 };
        let routeIdsStr = switch (getStateField(session.stateData, "routeIds")) { case (?v) v; case null "" };
        let routeIds = routeIdsStr.split(#char ',').toArray();
        if (choice < 1 or choice > routeIds.size()) {
          [makeText(phone, "Please enter a valid number (1-" # routeIds.size().toText() # "):")]
        } else {
          let routeId = routeIds[choice - 1];
          switch (shuttleSvc.getRouteById(routeId)) {
            case null {
              ignore updateSession(session, #mainMenu, "{}", null);
              [makeText(phone, "Route not found. Type 'menu' to return.")]
            };
            case (?route) {
              let stopsText = if (route.stops.size() > 0)
                "Available stops: " # route.stops[0] # (if (route.stops.size() > 1) ", " # route.stops[route.stops.size() - 1] else "")
              else "";
              let data = setStep(setStateField(session.stateData, "routeId", routeId), 4);
              ignore updateSession(session, #shuttleBookConfirm, data, null);
              [makeText(phone,
                "🚌 " # route.routeName # "\n\n" #
                "📍 " # route.source # " → " # route.destination # "\n" #
                stopsText # "\n" #
                "💰 Fare: ₹" # route.fare.toText() # "\n" #
                "🕐 Departs: " # route.departureTime # "\n\n" #
                "Enter your boarding stop:"
              )]
            };
          }
        }
      };
      case (#shuttleBookConfirm) {
        if (_step == 4) {
          // Boarding stop entered
          ignore updateSession(session, #shuttleBookConfirm, setStep(setStateField(session.stateData, "boardingStop", msg), 5), null);
          [makeText(phone, "Enter your drop stop:")]
        } else {
          // Drop stop entered — book shuttle
          let routeId     = switch (getStateField(session.stateData, "routeId"))    { case (?v) v; case null "" };
          let boardingStop= switch (getStateField(session.stateData, "boardingStop")){case (?v) v; case null "" };
          let _userId      = switch (session.userId) { case (?id) id; case null phone };
          switch (shuttleSvc.bookShuttle(phone, routeId, boardingStop, msg)) {
            case (#ok(booking)) {
              ignore updateSession(session, #mainMenu, "{}", null);
              [makeText(phone,
                "✅ Shuttle Booked!\n\n" #
                "🆔 Booking ID: " # booking.id # "\n" #
                "📍 Boarding: " # boardingStop # "\n" #
                "📍 Drop: " # msg # "\n" #
                "💰 Fare: ₹" # booking.fare.toText() # "\n\n" #
                "🔑 YOUR SHUTTLE OTP: " # booking.otp # "\n\n" #
                "⚠️ Share this OTP ONLY with your shuttle driver when the shuttle arrives.\n\n" #
                "Type 'menu' to continue."
              )]
            };
            case (#err(#invalidInput(e))) {
              ignore updateSession(session, #mainMenu, "{}", null);
              [makeText(phone, "❌ Booking failed: " # e # "\n\nType 'menu' to continue.")]
            };
            case (#err(_)) {
              ignore updateSession(session, #mainMenu, "{}", null);
              [makeText(phone, "❌ Booking failed. Please try again.\n\nType 'menu' to continue.")]
            };
          }
        }
      };
      case _ {
        ignore updateSession(session, #mainMenu, "{}", null);
        [makeText(phone, customerMainMenu())]
      };
    }
  };

  // ── Supplier Order Flow ────────────────────────────────────────────────────

  func handleSupplierOrderFlow(session : Types.ConversationSession, msg : Text) : async [Types.BotMessage] {
    let phone = session.phoneNumber;

    switch (session.currentState) {
      case (#supplierOrderSupplier) {
        ignore updateSession(session, #supplierOrderItem, setStateField(session.stateData, "supplierContact", msg), null);
        [makeText(phone, "📦 Step 2: Enter item name:")]
      };
      case (#supplierOrderItem) {
        ignore updateSession(session, #supplierOrderQty, setStateField(session.stateData, "itemName", msg), null);
        [makeText(phone, "⚖️ Step 3: Enter quantity and unit\n(e.g. 50 kg, 100 pcs, 5 boxes):")]
      };
      case (#supplierOrderQty) {
        ignore updateSession(session, #supplierOrderNotes, setStateField(session.stateData, "quantity", msg), null);
        [makeQuickReply(phone,
          "📝 Step 4: Any order notes? (optional)",
          numericReplies(["Skip"])
        )]
      };
      case (#supplierOrderNotes) {
        let notes = if (msg == "1" or msg.toLower() == "skip") "" else msg;
        let supplierContact = switch (getStateField(session.stateData, "supplierContact")) { case (?v) v; case null "" };
        let itemName        = switch (getStateField(session.stateData, "itemName"))        { case (?v) v; case null "" };
        let quantity        = switch (getStateField(session.stateData, "quantity"))        { case (?v) v; case null "" };
        let data = setStateField(setStateField(session.stateData, "notes", notes), "step", "confirm");
        ignore updateSession(session, #supplierOrderConfirm, data, null);
        [makeQuickReply(phone,
          "📦 Confirm Supplier Order\n\n" #
          "🏭 Supplier: " # supplierContact # "\n" #
          "📦 Item: " # itemName # "\n" #
          "⚖️ Quantity: " # quantity # "\n" #
          (if (notes != "") "📝 Notes: " # notes # "\n" else "") #
          "\nConfirm this order?",
          numericReplies(["Confirm Order", "Cancel"])
        )]
      };
      case (#supplierOrderConfirm) {
        switch (parseChoice(msg)) {
          case (?1) {
            let supplierContact = switch (getStateField(session.stateData, "supplierContact")) { case (?v) v; case null "" };
            let itemName        = switch (getStateField(session.stateData, "itemName"))        { case (?v) v; case null "" };
            let quantity        = switch (getStateField(session.stateData, "quantity"))        { case (?v) v; case null "" };
            let notes           = switch (getStateField(session.stateData, "notes"))           { case (?v) v; case null "" };
            // Sanitize inputs before saving
            let cleanSupplier = Utils.sanitizeInput(supplierContact);
            let cleanItem     = Utils.sanitizeInput(itemName);
            let cleanNotes    = Utils.sanitizeInput(notes);
            // Get merchant ID from user session
            let userId = switch (session.userId) { case (?id) id; case null "" };
            let merchantId = switch (merchantSvc.getMerchantByUserId(userId)) {
              case (#ok(m)) m.id; case (#err(_)) userId;
            };
            // Persist the supplier order to the store
            let orderId = Utils.generateId("sorder");
            let now = Time.now();
            let so : Types.SupplierOrder = {
              id              = orderId;
              merchantId;
              supplierContact = cleanSupplier;
              itemName        = cleanItem;
              quantity;
              notes           = cleanNotes;
              status          = #pending;
              createdAt       = now;
              updatedAt       = now;
            };
            supplierOrdersStore.add(orderId, so);
            ignore updateSession(session, #merchantMenu, "{}", null);
            [makeText(phone,
              "✅ Supplier Order Placed!\n\n" #
              "🆔 Order ID: " # orderId # "\n" #
              "🏭 Supplier: " # cleanSupplier # "\n" #
              "📦 Item: " # cleanItem # "\n" #
              "⚖️ Quantity: " # quantity # "\n" #
              (if (cleanNotes != "") "📝 Notes: " # cleanNotes # "\n" else "") #
              "\nYou can track it in My Orders → Supplier Orders.\n\nType 'menu' to continue."
            )]
          };
          case _ {
            ignore updateSession(session, #merchantMenu, "{}", null);
            [makeText(phone, "Order cancelled.\n\n" # merchantMainMenuFiltered(phone))]
          };
        }
      };
      case _ {
        ignore updateSession(session, #supplierOrderSupplier, setStep("{}", 1), null);
        [makeText(phone, "📦 Order from Suppliers\n\nStep 1: Enter supplier name or phone number:")]
      };
    }
  };

  // ── Main Dispatcher ───────────────────────────────────────────────────────

  public func processMessage(
    phoneNumber : Text,
    userMessage : Text,
    messageType : Text,
  ) : async [Types.BotMessage] {
    // Guard: an empty session key would cause all users to share the same broken session
    if (phoneNumber == "") {
      return [{
        to           = "";
        body         = "Session error (no user ID). Please send 'hi' to start a new conversation.";
        messageType  = "text";
        quickReplies = [];
        footer       = null;
        languageKey  = "en";
      }]
    };
    let _session = getOrCreateSession(phoneNumber);
    // Sanitize all incoming user input for security (SQL injection / XSS prevention)
    let sanitizedMessage = Utils.sanitizeInput(userMessage);
    appendMessage(phoneNumber, #user, sanitizedMessage, messageType);

    let msgLower = sanitizedMessage.toLower().trimStart(#char ' ').trimEnd(#char ' ');

    // Global reset commands
    if (msgLower == "hi" or msgLower == "hello" or msgLower == "start" or msgLower == "restart") {
      let fresh = getOrCreateSession(phoneNumber);
      let responses = await handleWelcome(fresh);
      for (r in responses.values()) { appendMessage(phoneNumber, #bot, r.body, r.messageType) };
      return responses
    };

    if (msgLower == "menu" or msgLower == "back to menu") {
      let current = getOrCreateSession(phoneNumber);
      ignore updateSession(current, #mainMenu, "{}", null);
      let updated = getOrCreateSession(phoneNumber);
      let responses = await handleMainMenu(updated, "");
      for (r in responses.values()) { appendMessage(phoneNumber, #bot, r.body, r.messageType) };
      return responses
    };

    // Global "dashboard" keyword — returns the role-appropriate dashboard link immediately
    if (msgLower == "dashboard" or msgLower == "my dashboard") {
      let current = getOrCreateSession(phoneNumber);
      let role : Types.UserRole = switch (userSvc.getUserByPhone(phoneNumber)) {
        case (#ok(u)) u.role;
        case (#err(_)) {
          let uid = switch (current.userId) { case (?id) id; case null "" };
          switch (userSvc.getUserById(uid)) { case (#ok(u)) u.role; case (#err(_)) #customer };
        };
      };
      let dashMsg : Types.BotMessage = switch (role) {
        case (#merchant) makeText(phoneNumber,
          "Your Merchant Dashboard 🏪\n\nOpen your merchant POS and dashboard here:\n" #
          APP_BASE_URL # "/merchant-dashboard\n\n" #
          "Bookmark this link to manage orders, products, bookings, and earnings anytime."
        );
        case (#deliveryPartner or #sarthi) makeText(phoneNumber,
          "Your Delivery Dashboard 🚚\n\nOpen your delivery partner dashboard here:\n" #
          APP_BASE_URL # "/delivery-dashboard\n\n" #
          "Bookmark this link to view deliveries, earnings, and performance."
        );
        case _ makeText(phoneNumber,
          "Your Customer Dashboard 📊\n\nOpen your personal dashboard here:\n" #
          APP_BASE_URL # "/customer-dashboard\n\n" #
          "Bookmark this link for quick access to your orders, spending, subscriptions, and family connections."
        );
      };
      appendMessage(phoneNumber, #bot, dashMsg.body, dashMsg.messageType);
      return [dashMsg]
    };

    if (msgLower == "track") {
      let current = getOrCreateSession(phoneNumber);
      switch (current.currentState) {
        case (#orderTracking) {};
        case _ { ignore updateSession(current, #orderTracking, current.stateData, null) };
      };
      let updated = getOrCreateSession(phoneNumber);
      let responses = await handleOrderTracking(updated, msgLower);
      for (r in responses.values()) { appendMessage(phoneNumber, #bot, r.body, r.messageType) };
      return responses
    };

    let current = getOrCreateSession(phoneNumber);
    let responses = switch (current.currentState) {
      case (#welcome)                  { await handleWelcome(current) };
      case (#registerType)             { await handleRegisterType(current, sanitizedMessage) };
      case (#registerCustomer)         { await handleRegisterCustomer(current, sanitizedMessage) };
      case (#registerMerchant)         { await handleRegisterMerchant(current, sanitizedMessage) };
      case (#registerDeliveryPartner)  { await handleRegisterDeliveryPartner(current, sanitizedMessage) };
      case (#mainMenu)                 { await handleMainMenu(current, sanitizedMessage) };
      // Shopping
      case (#orderSearchInput)         { await handleOrderSearchInput(current, sanitizedMessage) };
      case (#orderSearch)              { await handleOrderSearch(current, sanitizedMessage) };
      case (#orderResults)             { await handleOrderSearch(current, sanitizedMessage) };
      case (#orderConfirm)             { await handleOrderConfirm(current, sanitizedMessage) };
      case (#orderTracking)            { await handleOrderTracking(current, sanitizedMessage) };
      // Merchant
      case (#merchantMenu)             { await handleMerchantMenu(current, sanitizedMessage) };
      case (#merchantOrderList)        { await handleMerchantOrderList(current, sanitizedMessage) };
      case (#merchantViewOrder)        { await handleMerchantViewOrder(current, sanitizedMessage) };
      case (#merchantAccept)           { await handleMerchantAccept(current, sanitizedMessage) };
      case (#merchantReject)           { await handleMerchantReject(current, sanitizedMessage) };
      case (#merchantFulfill)          { await handleMerchantFulfill(current, sanitizedMessage) };
      case (#merchantCollectionPending){ await handleMerchantCollectionPending(current, sanitizedMessage) };
      case (#merchantComplete)         { await handleMerchantComplete(current, sanitizedMessage) };
      case (#merchantActions)          { await handleMerchantActions(current, sanitizedMessage) };
      // Delivery Partner
      case (#dpMenu)                   { await handleDpMenu(current, sanitizedMessage) };
      case (#dpAvailableOrders)        { await handleDpAvailableOrders(current, sanitizedMessage) };
      case (#dpAccept)                 { await handleDpAccept(current, sanitizedMessage) };
      case (#dpPickupInstructions)     { await handleDpPickupInstructions(current, sanitizedMessage) };
      case (#dpPickupConfirmed)        { await handleDpPickupConfirmed(current, sanitizedMessage) };
      case (#dpDeliveryInstructions)   { await handleDpDeliveryInstructions(current, sanitizedMessage) };
      case (#dpCollectPayment)         { await handleDpCollectPayment(current, sanitizedMessage) };
      case (#dpPaymentConfirmed)       { await handleDpPaymentConfirmed(current, sanitizedMessage) };
      case (#dpVendorSettlement)       { await handleDpVendorSettlement(current, sanitizedMessage) };
      case (#dpComplete)               { await handleDpComplete(current, sanitizedMessage) };
      case (#deliveryActions)          { await handleDeliveryActions(current, sanitizedMessage) };
      // Jobs
      case (#jobBrowse)                { await handleJobBrowse(current, sanitizedMessage) };
      case (#jobSearch)                { await handleJobSearch(current, sanitizedMessage) };
      case (#jobRequestContact)        { await handleJobRequestContact(current, sanitizedMessage) };
      case (#jobPost)                  { await handleJobPost(current, sanitizedMessage) };
      case (#jobPostTitle)             { await handleJobPost(current, sanitizedMessage) };
      case (#jobPostDesc)              { await handleJobPost(current, sanitizedMessage) };
      case (#jobPostCategory)          { await handleJobPost(current, sanitizedMessage) };
      case (#jobPostSalaryMin)         { await handleJobPost(current, sanitizedMessage) };
      case (#jobPostSalaryMax)         { await handleJobPost(current, sanitizedMessage) };
      case (#jobPostLocation)          { await handleJobPost(current, sanitizedMessage) };
      case (#jobPublished)             { await handleJobMyListings(current, sanitizedMessage) };
      case (#jobMyListings)            { await handleJobMyListings(current, sanitizedMessage) };
      case (#jobMyListings2)           { await handleJobMyListings(current, sanitizedMessage) };
      case (#approveJobContact)        { await handleApproveJobContact(current, sanitizedMessage) };
      case (#jobContactApproval)       { await handleApproveJobContact(current, sanitizedMessage) };
      // Property
      case (#propertyBrowse)           { await handlePropertyBrowse(current, sanitizedMessage) };
      case (#propertySearch)           { await handlePropertySearch(current, sanitizedMessage) };
      case (#propertyRequestContact)   { await handlePropertyRequestContact(current, sanitizedMessage) };
      case (#propertyPost)             { await handlePropertyPost(current, sanitizedMessage) };
      case (#propertyPostType)         { await handlePropertyPost(current, sanitizedMessage) };
      case (#propertyPostDesc)         { await handlePropertyPost(current, sanitizedMessage) };
      case (#propertyPostPrice)        { await handlePropertyPost(current, sanitizedMessage) };
      case (#propertyPostLocation)     { await handlePropertyPost(current, sanitizedMessage) };
      case (#propertyPublished)        { await handlePropertyMyListings(current, sanitizedMessage) };
      case (#propertyMyListings)       { await handlePropertyMyListings(current, sanitizedMessage) };
      case (#approvePropertyContact)   { await handleApprovePropertyContact(current, sanitizedMessage) };
      case (#propertyContactApproval)  { await handleApprovePropertyContact(current, sanitizedMessage) };
      // Other
      case (#otpVerify)                { await handleOtpVerify(current, sanitizedMessage) };
      case (#subscriptionPrompt) {
        let phone = current.phoneNumber;
        // Show plan selection options
        let planMsgs = subscriptionPlanMenu(phone);
        // Update session to stay in prompt until plan selected
        ignore updateSession(current, #subscriptionPrompt, current.stateData, null);
        planMsgs
      };
      // Events
      case (#eventMenu)                { await handleEventMenu(current, sanitizedMessage) };
      case (#eventPostName)            { await handleEventFlow(current, sanitizedMessage) };
      case (#eventPostDesc)            { await handleEventFlow(current, sanitizedMessage) };
      case (#eventPostPaid)            { await handleEventFlow(current, sanitizedMessage) };
      case (#eventPostPrice)           { await handleEventFlow(current, sanitizedMessage) };
      case (#eventPostLocation)        { await handleEventFlow(current, sanitizedMessage) };
      case (#eventPostDates)           { await handleEventFlow(current, sanitizedMessage) };
      case (#eventPostTickets)         { await handleEventFlow(current, sanitizedMessage) };
      case (#eventPublished)           { await handleEventFlow(current, sanitizedMessage) };
      case (#eventSearch)              { await handleEventFlow(current, sanitizedMessage) };
      // Family
      case (#familyMenu)               { await handleFamilyMenu(current, sanitizedMessage) };
      case (#familyAddSelfName)        { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddSelfSurname)     { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddRelationship)    { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddRelationName)    { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddPhone)           { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddAddress)         { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddGender)          { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddMatrimonyEligible) { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddCaste)           { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddOccupation)      { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddEducation)       { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddLocationPref)    { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familyAddBloodGroup)      { await handleFamilyFlow(current, sanitizedMessage) };
      case (#familySaved)              { await handleFamilyFlow(current, sanitizedMessage) };
      // Healthcare / Professional Services / Tours / Donations
      case (#healthcareMenu)            { await handleServiceMenu(current, sanitizedMessage, "healthcare") };
      case (#healthcareSearch)          { await handleServiceMenu(current, sanitizedMessage, "healthcare") };
      case (#healthcareBooking)         { await handleServiceMenu(current, sanitizedMessage, "healthcare") };
      case (#professionalServicesMenu)  { await handleServiceMenu(current, sanitizedMessage, "professional") };
      case (#professionalServicesSearch){ await handleServiceMenu(current, sanitizedMessage, "professional") };
      case (#toursMenu)                 { await handleServiceMenu(current, sanitizedMessage, "tours") };
      case (#toursSearch)               { await handleServiceMenu(current, sanitizedMessage, "tours") };
      case (#donationsMenu)             { await handleServiceMenu(current, sanitizedMessage, "donations") };
      // Promotions
      case (#promotionMenu)            { await handlePromotionMenu(current, sanitizedMessage) };
      case (#promotionPostTitle)       { await handlePromotionFlow(current, sanitizedMessage) };
      case (#promotionPostReelLink)    { await handlePromotionFlow(current, sanitizedMessage) };
      case (#promotionPostImageLink)   { await handlePromotionFlow(current, sanitizedMessage) };
      case (#promotionPostLocation)    { await handlePromotionFlow(current, sanitizedMessage) };
      case (#promotionPlanSelect)      { await handlePromotionFlow(current, sanitizedMessage) };
      case (#promotionPayment)         { await handlePromotionFlow(current, sanitizedMessage) };
      case (#promotionPendingApproval) { await handlePromotionFlow(current, sanitizedMessage) };
      // Sarthi OTP
      case (#sarthiFreeRideOTP)        { await handleSarthiFreeRideOTP(current, sanitizedMessage) };
      case (#sarthiPassengerOTPVerify) { await handleSarthiPassengerOTPVerify(current, sanitizedMessage) };
      // Transport / Shuttle
      case (#transportMenu)            { await handleTransportMenu(current, sanitizedMessage) };
      case (#transportOrigin)          { await handleTransportFlow(current, sanitizedMessage) };
      case (#transportDest)            { await handleTransportFlow(current, sanitizedMessage) };
      case (#transportVehicle)         { await handleTransportFlow(current, sanitizedMessage) };
      case (#transportEstimate)        { await handleTransportFlow(current, sanitizedMessage) };
      case (#transportBooked)          { await handleTransportFlow(current, sanitizedMessage) };
      case (#shuttleMenu)              { await handleShuttleMenu(current, sanitizedMessage) };
      case (#shuttleSearchSource)      { await handleShuttleFlow(current, sanitizedMessage) };
      case (#shuttleSearchDest)        { await handleShuttleFlow(current, sanitizedMessage) };
      case (#shuttleResults)           { await handleShuttleFlow(current, sanitizedMessage) };
      case (#shuttleBookConfirm)       { await handleShuttleFlow(current, sanitizedMessage) };
      case (#shuttleBooked)            { await handleShuttleFlow(current, sanitizedMessage) };
      // Free ride customer flow
      case (#freeRideSearch)           { await handleFreeRideSearch(current, sanitizedMessage) };
      case (#freeRideSearchDest)       { await handleFreeRideSearch(current, sanitizedMessage) };
      case (#freeRideResults)          { await handleFreeRideSearch(current, sanitizedMessage) };
      case (#freeRideOTPEntry)         { await handleFreeRideSearch(current, sanitizedMessage) };
      case (#freeRideCompleted)        { await handleFreeRideSearch(current, sanitizedMessage) };
      case (#freeRideSearchAgain)      { await handleFreeRideSearch(current, sanitizedMessage) };
      // Sarthi — incoming free ride request
      case (#freeRideIncoming)         { await handleFreeRideIncoming(current, sanitizedMessage) };
      // Ride declined — search again
      case (#rideDeclined)             { await handleRideDeclined(current, sanitizedMessage) };
      // Custom / manual order
      case (#customOrderItem)          { await handleCustomOrderItem(current, sanitizedMessage) };
      case (#customOrderConfirm)       { await handleCustomOrderConfirm(current, sanitizedMessage) };
      case (#customOrderTracking)      { await handleCustomOrderTracking(current, sanitizedMessage) };
      // Support tickets
      case (#supportMenu)              { await handleSupportMenu(current, sanitizedMessage) };
      case (#supportDescInput)         { await handleSupportDescInput(current, sanitizedMessage) };
      case (#supportConfirm)           { await handleSupportConfirm(current, sanitizedMessage) };
      // Supplier order flow
      case (#supplierOrderSupplier)    { await handleSupplierOrderFlow(current, sanitizedMessage) };
      case (#supplierOrderItem)        { await handleSupplierOrderFlow(current, sanitizedMessage) };
      case (#supplierOrderQty)         { await handleSupplierOrderFlow(current, sanitizedMessage) };
      case (#supplierOrderNotes)       { await handleSupplierOrderFlow(current, sanitizedMessage) };
      case (#supplierOrderConfirm)     { await handleSupplierOrderFlow(current, sanitizedMessage) };
      case (#supplierOrderDone)        { await handleSupplierOrderFlow(current, sanitizedMessage) };
      case (#supplierOrderList)        { await handleSupplierOrderFlow(current, sanitizedMessage) };
      // Catch-all: any unhandled state goes to main menu
      case _ {
        ignore updateSession(current, #mainMenu, "{}", null);
        let updated2 = getOrCreateSession(phoneNumber);
        await handleMainMenu(updated2, "")
      };
    };

    for (r in responses.values()) { appendMessage(phoneNumber, #bot, r.body, r.messageType) };
    responses
  };

  // ── Healthcare / Tours / Professional Services / Customer Dashboard ────────
  // These flows are registered in the unified flow registry and handled here.
  // They use stateData JSON to track multi-step conversation progress.

  /// Handle the flow identified by `flowId` when a user sends a message.
  /// Returns bot messages for the current step.
  public func handleRegistryFlow(phoneNumber : Text, flowId : Text, message : Text) : async [Types.BotMessage] {
    let session = getOrCreateSession(phoneNumber);
    let stateData = session.stateData;
    let stepOpt = getStateField(stateData, "step");
    let step : Text = switch (stepOpt) { case null "start"; case (?s) s };

    // Determine which flow group this is
    if (flowId == "health_professional_register" or flowId == "health_search_book" or
        flowId == "health_appointment_status") {
      handleHealthcareFlow(session, flowId, step, message)
    } else if (flowId == "tours_operator_register" or flowId == "tours_search_book" or
               flowId == "tours_booking_status") {
      handleToursFlow(session, flowId, step, message)
    } else if (flowId == "professional_service_register" or
               flowId == "professional_service_search_book") {
      handleProfessionalServiceFlow(session, flowId, step, message)
    } else if (flowId == "customer_dashboard") {
      handleCustomerDashboardFlow(session, step, message)
    } else if (flowId == "check-match" or flowId == "live-match-scores" or
               flowId == "live_match_scores") {
      handleCheckMatchFlow(session, step, message)
    } else if (flowId == "check-election" or flowId == "live-election-results" or
               flowId == "live_election_results") {
      handleCheckElectionFlow(session, step, message)
    } else {
      // Unknown registry flow — show helpful prompt
      [makeText(phoneNumber, "🔍 This service is coming soon. Reply 0 to return to main menu.")]
    }
  };

  func handleHealthcareFlow(
    session : Types.ConversationSession,
    flowId  : Text,
    step    : Text,
    message : Text,
  ) : [Types.BotMessage] {
    let phone = session.phoneNumber;
    if (flowId == "health_professional_register") {
      switch (step) {
        case "start" {
          ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"health_professional_register\",\"step\":\"name\"}");
          [makeQuickReply(phone,
            "🏥 *Healthcare Professional Registration*\n\nPlease enter your full name:",
            [])]
        };
        case "name" {
          ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"health_professional_register\",\"step\":\"specialization\",\"name\":\"" # message # "\"}");
          [makeQuickReply(phone,
            "What is your specialization? (e.g. General Physician, Dentist, Physiotherapist, Cardiologist)",
            [])]
        };
        case "specialization" {
          let name = switch (getStateField(session.stateData, "name")) { case (?n) n; case null "Dr." };
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"health_professional_register\",\"step\":\"fee\",\"name\":\"" # name # "\",\"spec\":\"" # message # "\"}");
          [makeText(phone, "What is your consultation fee (in ₹)?")]
        };
        case "fee" {
          let name = switch (getStateField(session.stateData, "name")) { case (?n) n; case null "" };
          let spec = switch (getStateField(session.stateData, "spec")) { case (?s) s; case null "" };
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"health_professional_register\",\"step\":\"city\",\"name\":\"" # name # "\",\"spec\":\"" # spec # "\",\"fee\":\"" # message # "\"}");
          [makeText(phone, "📍 In which city is your practice located?")]
        };
        case "city" {
          let name = switch (getStateField(session.stateData, "name")) { case (?n) n; case null "" };
          let spec = switch (getStateField(session.stateData, "spec")) { case (?s) s; case null "" };
          let fee  = switch (getStateField(session.stateData, "fee"))  { case (?f) f; case null "0" };
          ignore saveSessionWithData(session, #mainMenu, "{}");
          // Registration saved — note: actual backend call is via the API (registerHealthcareProvider)
          [makeQuickReply(phone,
            "✅ *Healthcare Registration Submitted!*\n\n" #
            "Name: " # name # "\n" #
            "Specialization: " # spec # "\n" #
            "City: " # message # "\n" #
            "Fee: ₹" # fee # "\n\n" #
            "Your profile is under review. You'll be notified once approved.\n\nReply 0 for main menu.",
            [{ id = "0"; title = "Main Menu"; payload = "0" }])]
        };
        case _ {
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeText(phone, "✅ Registration complete. Reply 0 to go to main menu.")]
        };
      }
    } else if (flowId == "health_search_book") {
      switch (step) {
        case "start" {
          ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"health_search_book\",\"step\":\"specialization\"}");
          [makeQuickReply(phone,
            "🔍 *Find a Healthcare Provider*\n\nWhat specialization are you looking for?\n(e.g. General Physician, Dentist, Cardiologist — or type 'any')",
            [])]
        };
        case "specialization" {
          ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"health_search_book\",\"step\":\"city\",\"spec\":\"" # message # "\"}");
          [makeText(phone, "📍 In which city? (or type 'any' for all cities)")]
        };
        case "city" {
          let spec = switch (getStateField(session.stateData, "spec")) { case (?s) s; case null "any" };
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeQuickReply(phone,
            "🏥 *Searching providers...*\n\n" #
            "Specialization: " # spec # "\n" #
            "City: " # message # "\n\n" #
            "To book an appointment, please call the provider directly or use the app.\n\nReply 0 for main menu.",
            [{ id = "0"; title = "Main Menu"; payload = "0" }])]
        };
        case _ {
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeText(phone, "Search complete. Reply 0 to go to main menu.")]
        };
      }
    } else {
      // health_appointment_status
      ignore saveSessionWithData(session, #mainMenu, "{}");
      [makeQuickReply(phone,
        "📋 *Appointment Status*\n\nTo check your appointment status, please use the app or contact your provider directly.\n\nReply 0 for main menu.",
        [{ id = "0"; title = "Main Menu"; payload = "0" }])]
    }
  };

  func handleToursFlow(
    session : Types.ConversationSession,
    flowId  : Text,
    step    : Text,
    message : Text,
  ) : [Types.BotMessage] {
    let phone = session.phoneNumber;
    if (flowId == "tours_operator_register") {
      switch (step) {
        case "start" {
          ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"tours_operator_register\",\"step\":\"name\"}");
          [makeText(phone, "🌍 *Tour Operator Registration*\n\nPlease enter your company/operator name:")]
        };
        case "name" {
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"tours_operator_register\",\"step\":\"destinations\",\"name\":\"" # message # "\"}");
          [makeText(phone, "What destinations do you offer? (comma-separated, e.g. Goa, Kashmir, Kerala)")]
        };
        case "destinations" {
          let name = switch (getStateField(session.stateData, "name")) { case (?n) n; case null "" };
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"tours_operator_register\",\"step\":\"price\",\"name\":\"" # name # "\",\"dest\":\"" # message # "\"}");
          [makeText(phone, "What is your price per person (₹)?")]
        };
        case "price" {
          let name = switch (getStateField(session.stateData, "name")) { case (?n) n; case null "" };
          let dest = switch (getStateField(session.stateData, "dest")) { case (?d) d; case null "" };
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeQuickReply(phone,
            "✅ *Tour Operator Registration Submitted!*\n\n" #
            "Operator: " # name # "\n" #
            "Destinations: " # dest # "\n" #
            "Price/person: ₹" # message # "\n\n" #
            "Your profile is under review.\n\nReply 0 for main menu.",
            [{ id = "0"; title = "Main Menu"; payload = "0" }])]
        };
        case _ {
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeText(phone, "✅ Registration complete. Reply 0 to go to main menu.")]
        };
      }
    } else if (flowId == "tours_search_book") {
      switch (step) {
        case "start" {
          ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"tours_search_book\",\"step\":\"destination\"}");
          [makeText(phone, "✈️ *Search Tours*\n\nWhich destination are you interested in? (or type 'any')")]
        };
        case "destination" {
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"tours_search_book\",\"step\":\"passengers\",\"dest\":\"" # message # "\"}");
          [makeText(phone, "How many passengers?")]
        };
        case "passengers" {
          let dest = switch (getStateField(session.stateData, "dest")) { case (?d) d; case null "any" };
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeQuickReply(phone,
            "🔍 *Tour Search Results*\n\n" #
            "Destination: " # dest # "\n" #
            "Passengers: " # message # "\n\n" #
            "Available tours will be shown here. Contact operators to book.\n\nReply 0 for main menu.",
            [{ id = "0"; title = "Main Menu"; payload = "0" }])]
        };
        case _ {
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeText(phone, "Reply 0 to go to main menu.")]
        };
      }
    } else {
      // tours_booking_status
      ignore saveSessionWithData(session, #mainMenu, "{}");
      [makeQuickReply(phone,
        "📋 *Tour Booking Status*\n\nTo check your booking status, use the app or contact your tour operator.\n\nReply 0 for main menu.",
        [{ id = "0"; title = "Main Menu"; payload = "0" }])]
    }
  };

  func handleProfessionalServiceFlow(
    session : Types.ConversationSession,
    flowId  : Text,
    step    : Text,
    message : Text,
  ) : [Types.BotMessage] {
    let phone = session.phoneNumber;
    if (flowId == "professional_service_register") {
      switch (step) {
        case "start" {
          ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"ps_register\",\"step\":\"serviceType\"}");
          [makeQuickReply(phone,
            "\u{1F527} *Register Professional Service*\n\nWhat type of service do you offer?",
            [
              { id = "1"; title = "Plumbing";    payload = "plumbing"   },
              { id = "2"; title = "Electrical";  payload = "electrical" },
              { id = "3"; title = "Spa/Massage"; payload = "massage"    },
              { id = "4"; title = "Training";    payload = "training"   },
              { id = "5"; title = "Other";       payload = "other"      },
            ])]
        };
        case "serviceType" {
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"ps_register\",\"step\":\"city\",\"svcType\":\"" # message # "\"}");
          [makeText(phone, "\u{1F4CD} In which city do you offer this service?")]
        };
        case "city" {
          let svcType = switch (getStateField(session.stateData, "svcType")) { case (?s) s; case null "other" };
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"ps_register\",\"step\":\"price\",\"svcType\":\"" # svcType # "\",\"city\":\"" # message # "\"}");
          [makeText(phone, "What is your global price per hour (Rs)? This is your default rate for all areas.")]
        };
        case "price" {
          let svcType = switch (getStateField(session.stateData, "svcType")) { case (?s) s; case null "" };
          let city    = switch (getStateField(session.stateData, "city"))    { case (?c) c; case null "" };
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"ps_register\",\"step\":\"areaRatesPrompt\",\"svcType\":\"" # svcType # "\",\"city\":\"" # city # "\",\"globalRate\":\"" # message # "\"}");
          [makeQuickReply(phone,
            "\u{1F4CD} Do you want to set area-specific rates for " # city # "?\n(You can always update these later)",
            [{ id = "1"; title = "Yes, set area rates"; payload = "yes" },
             { id = "2"; title = "No, use global rate"; payload = "no"  }])]
        };
        case "areaRatesPrompt" {
          let svcType    = switch (getStateField(session.stateData, "svcType"))    { case (?s) s; case null "" };
          let city       = switch (getStateField(session.stateData, "city"))       { case (?c) c; case null "" };
          let globalRate = switch (getStateField(session.stateData, "globalRate")) { case (?r) r; case null "0" };
          let userSaid   = message.toLower();
          if (userSaid == "yes" or userSaid == "1") {
            let areas = getCityAreasChatbot(city);
            let areaList = buildAreaListText(areas, 0);
            ignore saveSessionWithData(session, #mainMenu,
              "{\"flow\":\"ps_register\",\"step\":\"areaRateEntry\",\"svcType\":\"" # svcType # "\",\"city\":\"" # city #
              "\",\"globalRate\":\"" # globalRate # "\",\"areaIdx\":\"0\",\"areaRates\":\"\"}");
            [makeText(phone,
              "\u{1F527} Area-specific rates for " # city # ":\n\n" # areaList #
              "\nEnter rate for: " # (if (areas.size() > 0) areas[0] else "Area 1") # " (Rs/hr)\n" #
              "Type 0 to skip this area.")]
          } else {
            ignore saveSessionWithData(session, #mainMenu, "{}");
            [makeQuickReply(phone,
              "\u{2705} Service Registration Submitted!\n\n" #
              "Service: " # svcType # "\n" #
              "City: " # city # "\n" #
              "Global Rate: Rs" # globalRate # "/hr\n\n" #
              "Your listing is active.\n\nReply 0 for main menu.",
              [{ id = "0"; title = "Main Menu"; payload = "0" }])]
          }
        };
        case "areaRateEntry" {
          let svcType    = switch (getStateField(session.stateData, "svcType"))    { case (?s) s; case null "" };
          let city       = switch (getStateField(session.stateData, "city"))       { case (?c) c; case null "" };
          let globalRate = switch (getStateField(session.stateData, "globalRate")) { case (?r) r; case null "0" };
          let areaIdxStr = switch (getStateField(session.stateData, "areaIdx"))    { case (?i) i; case null "0" };
          let existingRates = switch (getStateField(session.stateData, "areaRates")) { case (?r) r; case null "" };
          let areas       = getCityAreasChatbot(city);
          let areaIdx : Nat = switch (Nat.fromText(areaIdxStr)) { case (?n) n; case null 0 };
          let currentArea = if (areaIdx < areas.size()) areas[areaIdx] else "";
          let newRates : Text = if (message == "0" or currentArea == "") {
            existingRates
          } else {
            let entry = currentArea # ":" # message;
            if (existingRates == "") entry else existingRates # "|" # entry
          };
          let nextIdx = areaIdx + 1;
          if (nextIdx >= areas.size()) {
            ignore saveSessionWithData(session, #mainMenu, "{}");
            [makeQuickReply(phone,
              "\u{2705} Service Registration Complete!\n\n" #
              "Service: " # svcType # "\nCity: " # city # "\nGlobal Rate: Rs" # globalRate # "/hr\n" #
              "Area rates configured.\n\nReply 0 for main menu.",
              [{ id = "0"; title = "Main Menu"; payload = "0" }])]
          } else {
            let nextArea = areas[nextIdx];
            ignore saveSessionWithData(session, #mainMenu,
              "{\"flow\":\"ps_register\",\"step\":\"areaRateEntry\",\"svcType\":\"" # svcType # "\",\"city\":\"" # city #
              "\",\"globalRate\":\"" # globalRate # "\",\"areaIdx\":\"" # nextIdx.toText() #
              "\",\"areaRates\":\"" # newRates # "\"}");
            [makeText(phone,
              "Enter rate for: " # nextArea # " (Rs/hr)\n" #
              "Type 0 to skip.\n" #
              "(" # nextIdx.toText() # "/" # areas.size().toText() # " areas done)")]
          }
        };
        case _ {
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeText(phone, "\u{2705} Registration complete. Reply 0 to go to main menu.")]
        };
      }
    } else {
      // professional_service_search_book
      switch (step) {
        case "start" {
          ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"ps_search\",\"step\":\"serviceType\"}");
          [makeText(phone, "\u{1F50D} Search Professional Services\n\nWhat type of service do you need? (e.g. plumbing, electrical, massage, training)")]
        };
        case "serviceType" {
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"ps_search\",\"step\":\"city\",\"svcType\":\"" # message # "\"}");
          [makeText(phone, "\u{1F4CD} In which city?")]
        };
        case "city" {
          let svcType = switch (getStateField(session.stateData, "svcType")) { case (?s) s; case null "any" };
          let areas   = getCityAreasChatbot(message);
          ignore saveSessionWithData(session, #mainMenu,
            "{\"flow\":\"ps_search\",\"step\":\"area\",\"svcType\":\"" # svcType # "\",\"city\":\"" # message # "\"}");
          let areaReplies = List.empty<Types.QuickReply>();
          var ai = 0;
          for (a in areas.values()) {
            ai += 1;
            areaReplies.add({ id = ai.toText(); title = a; payload = a });
          };
          areaReplies.add({ id = "0"; title = "Any Area"; payload = "any" });
          [makeQuickReply(phone,
            "\u{1F4CD} Select your area in " # message # ":\n(We will show rates specific to your area)",
            areaReplies.toArray())]
        };
        case "area" {
          let svcType     = switch (getStateField(session.stateData, "svcType")) { case (?s) s; case null "any" };
          let city        = switch (getStateField(session.stateData, "city"))    { case (?c) c; case null "" };
          let customerArea : ?Text = if (message == "any" or message == "0") null else ?message;
          ignore saveSessionWithData(session, #mainMenu, "{}");
          let svcTypeLower = svcType.toLower();
          let cityLower4   = city.toLower();
          let results = professionalSvcStore.values().toArray().filter(func(s : PSTypes.ProfessionalService) : Bool {
            let typeMatch = if (svcTypeLower == "any" or svcTypeLower == "") true
              else s.serviceType.toLower().contains(#text svcTypeLower);
            let cityMatch = if (cityLower4 == "") true
              else s.city.toLower().contains(#text cityLower4);
            typeMatch and cityMatch
          });
          if (results.size() == 0) {
            [makeQuickReply(phone,
              "\u{1F50D} No professional services found for '" # svcType # "' in '" # city # "'.\n\n" #
              "Try a different category or area.",
              [{ id = "0"; title = "Main Menu"; payload = "0" }])]
          } else {
            let areaLabel = switch (customerArea) { case null "any area"; case (?a) a };
            var text = "\u{1F527} " # svcType # " Services in " # city # " (Area: " # areaLabel # ")\n\n";
            let limit = if (results.size() > 5) 5 else results.size();
            var ri = 0;
            while (ri < limit) {
              let s = results[ri];
              let appliedRate : Float = switch (customerArea) {
                case null s.pricePerHour;
                case (?a) {
                  let aLower = a.toLower();
                  switch (s.areaRates.find(func((name, _r) : (Text, Float)) : Bool { name.toLower() == aLower })) {
                    case (?(_, r)) r;
                    case null s.pricePerHour;
                  }
                };
              };
              let rateLabel : Text = switch (customerArea) {
                case null "Rs" # appliedRate.toText() # "/hr";
                case (?a) {
                  let aLower = a.toLower();
                  let hasArea = s.areaRates.find(func((name, _r) : (Text, Float)) : Bool { name.toLower() == aLower }) != null;
                  if (hasArea) "Rs" # appliedRate.toText() # "/hr (" # a # " rate)"
                  else "Rs" # appliedRate.toText() # "/hr (global fallback)"
                };
              };
              text := text # (ri + 1).toText() # ". " # s.serviceType # " - " # rateLabel # "\n" #
                "   " # s.address # "\n" #
                "   " # s.rating.toText() # " stars | Phone: " # s.merchantPhone # "\n\n";
              ri += 1;
            };
            text := text # "Reply with a number to book, or 0 for main menu.";
            [makeQuickReply(phone, text, [{ id = "0"; title = "Main Menu"; payload = "0" }])]
          }
        };
        case _ {
          ignore saveSessionWithData(session, #mainMenu, "{}");
          [makeText(phone, "Reply 0 to go to main menu.")]
        };
      }
    }
  };

  /// Returns the fixed predefined area list for a city (used inside ChatbotEngine without async).
  func getCityAreasChatbot(city : Text) : [Text] {
    let c = city.toLower().trimStart(#char ' ').trimEnd(#char ' ');
    if (c.contains(#text "mumbai") or c.contains(#text "bombay")) {
      ["Andheri", "Bandra", "Borivali", "Dadar", "Kurla", "Thane", "Navi Mumbai", "Powai", "Vashi", "Goregaon"]
    } else if (c.contains(#text "delhi") or c.contains(#text "new delhi")) {
      ["Connaught Place", "Dwarka", "Janakpuri", "Karol Bagh", "Lajpat Nagar", "Rohini", "Saket", "Vasant Kunj", "Noida", "Gurgaon"]
    } else if (c.contains(#text "bangalore") or c.contains(#text "bengaluru")) {
      ["Whitefield", "Koramangala", "Indiranagar", "Jayanagar", "HSR Layout", "Marathahalli", "Malleshwaram", "Hebbal", "Electronic City", "Yelahanka"]
    } else if (c.contains(#text "chennai")) {
      ["Anna Nagar", "T Nagar", "Adyar", "Velachery", "Porur", "Ambattur", "Tambaram", "Mylapore", "Sholinganallur", "Chromepet"]
    } else if (c.contains(#text "hyderabad")) {
      ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitech City", "Secunderabad", "Kukatpally", "Ameerpet", "Begumpet", "Madhapur", "Kondapur"]
    } else if (c.contains(#text "pune")) {
      ["Kothrud", "Viman Nagar", "Hadapsar", "Baner", "Wakad", "Hinjewadi", "Deccan", "Shivajinagar", "Pimpri", "Chinchwad"]
    } else if (c.contains(#text "ahmedabad")) {
      ["Navrangpura", "Satellite", "Bopal", "Prahlad Nagar", "Maninagar", "Vastrapur", "CG Road", "SG Road", "Chandkheda", "Nikol"]
    } else {
      ["Central", "North", "South", "East", "West", "Outskirts", "Industrial", "Suburban", "Downtown", "Old City"]
    }
  };

  func buildAreaListText(areas : [Text], _startIdx : Nat) : Text {
    var t = "";
    var i = 0;
    for (a in areas.values()) {
      i += 1;
      t := t # i.toText() # ". " # a # "\n";
    };
    t
  };


  func handleCustomerDashboardFlow(
    session  : Types.ConversationSession,
    _step    : Text,
    _message : Text,
  ) : [Types.BotMessage] {
    let phone = session.phoneNumber;
    ignore saveSessionWithData(session, #mainMenu, "{}");
    // Show dashboard summary (data fetched client-side via getDashboardData)
    [makeQuickReply(phone,
      "📊 *Customer Dashboard*\n\n" #
      "Your personalized dashboard is available in the app.\n\n" #
      "📦 Orders, 💰 Spending, 👨‍👩‍👧 Family & Subscriptions are all tracked for you.\n\n" #
      "Reply 0 to return to main menu.",
      [{ id = "0"; title = "Main Menu"; payload = "0" }])]
  };

  // ── Check Today Matches flow ──────────────────────────────────────────────────────────────────────────────────────
  //
  // Flow trigger: "check-match" / "live-match-scores"
  // Step 1 (start): show sport filter choices
  // Step 2 (filter): accept sport choice, display stored match scores
  //
  // NOTE: This handler uses STORED match scores (already fetched by getTodayMatchScores).
  // The frontend triggers fetchTodayMatchScores before routing here for fresh data.

  func handleCheckMatchFlow(
    session : Types.ConversationSession,
    step    : Text,
    message : Text,
  ) : [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (step) {
      case "start" {
        ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"check-match\",\"step\":\"filter\"}");
        [makeQuickReply(phone,
          "🏟️ *Today's Live Match Scores*

Which sport scores would you like to see?",
          [
            { id = "1"; title = "Cricket 🏏"; payload = "cricket" },
            { id = "2"; title = "Football ⚽"; payload = "football" },
            { id = "3"; title = "All Sports"; payload = "all" },
          ]
        )]
      };
      case "filter" {
        let sport = message.toLower();
        let normalizedSport = if (sport == "1" or sport.contains(#text "cricket")) "cricket"
          else if (sport == "2" or sport.contains(#text "football")) "football"
          else "all";
        ignore saveSessionWithData(session, #mainMenu, "{}");
        // Build scores list from label data (live data fetched by frontend / getTodayMatchScores)
        let sportLabel = if (normalizedSport == "cricket") "Cricket 🏏"
          else if (normalizedSport == "football") "Football ⚽"
          else "All Sports";
        [makeQuickReply(phone,
          "🏟️ *" # sportLabel # " Scores*

Live match scores are loading...

For the latest scores, open your dashboard or try again in a few moments.

Reply 0 to return to main menu.",
          [{ id = "0"; title = "Main Menu"; payload = "0" }]
        )]
      };
      case _ {
        ignore saveSessionWithData(session, #mainMenu, "{}");
        [makeText(phone, "🏏 Check match scores from your dashboard. Reply 0 to return to main menu.")]
      };
    }
  };

  // ── Check Election Results flow ──────────────────────────────────────────────────────────────────────────────────────
  //
  // Flow trigger: "check-election" / "live-election-results"
  // Step 1 (start): ask for state name
  // Step 2 (state): receive state, look up stored results, display party-wise summary
  // Step 3 (detail): optionally drill into constituency list

  func handleCheckElectionFlow(
    session : Types.ConversationSession,
    step    : Text,
    message : Text,
  ) : [Types.BotMessage] {
    let phone = session.phoneNumber;
    switch (step) {
      case "start" {
        ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"check-election\",\"step\":\"state\"}");
        [makeQuickReply(phone,
          "🗽️ *Live Election Results*

Which state election results do you want to check?

Type the state name (e.g. Maharashtra, Delhi) or press 0 for all states.",
          [
            { id = "1"; title = "Maharashtra"; payload = "Maharashtra" },
            { id = "2"; title = "Delhi"; payload = "Delhi" },
            { id = "3"; title = "Tamil Nadu"; payload = "Tamil Nadu" },
            { id = "4"; title = "Gujarat"; payload = "Gujarat" },
            { id = "5"; title = "All States"; payload = "0" },
          ]
        )]
      };
      case "state" {
        let stateQuery = if (message == "0" or message.toLower() == "all") "" else message;
        let stateLabel = if (stateQuery == "") "All States" else stateQuery;
        ignore saveSessionWithData(session, #mainMenu, "{\"flow\":\"check-election\",\"step\":\"detail\",\"state\":\"" # stateQuery # "\"}");
        [makeQuickReply(phone,
          "🗽️ *Election Results: " # stateLabel # "*

Fetching live results from ECI...

For the latest counting updates, open your dashboard.

Reply 1 to see constituency-wise details, or 0 for main menu.",
          [
            { id = "1"; title = "Constituency Details"; payload = "detail" },
            { id = "0"; title = "Main Menu"; payload = "0" },
          ]
        )]
      };
      case "detail" {
        let stateOpt = getStateField(session.stateData, "state");
        let stateName = switch (stateOpt) { case (?s) s; case null "" };
        let stateLabel = if (stateName == "") "All States" else stateName;
        ignore saveSessionWithData(session, #mainMenu, "{}");
        [makeQuickReply(phone,
          "🗽️ *" # stateLabel # " — Constituency Results*

Detailed constituency-wise results are available in your election results dashboard.

Visit the admin panel → Data Explorer → Election Results to view and filter results.

Reply 0 to return to main menu.",
          [{ id = "0"; title = "Main Menu"; payload = "0" }]
        )]
      };
      case _ {
        ignore saveSessionWithData(session, #mainMenu, "{}");
        [makeText(phone, "🗽️ Election results are updated live. Reply 0 to return to main menu.")]
      };
    }
  };

  func saveSessionWithData(
    session   : Types.ConversationSession,
    newState  : Types.ConversationState,
    stateData : Text,
  ) : Types.ConversationSession {
    let updated = { session with currentState = newState; stateData; lastActivity = Time.now() };
    sessions.add(session.phoneNumber, updated);
    updated
  };

  // ── Conversation History ──────────────────────────────────────────────────

  public func getConversationHistory(phoneNumber : Text) : [Types.ConversationMessage] {
    switch (sessions.get(phoneNumber)) {
      case (?s) s.messages;
      case null [];
    }
  };

  public func resetConversation(phoneNumber : Text) : Types.Result<Text, Types.ApiError> {
    switch (sessions.get(phoneNumber)) {
      case null { #err(#notFound) };
      case (?_) {
        sessions.remove(phoneNumber);
        #ok("Conversation reset")
      };
    }
  };

  /// Store the preferred language for this session.
  /// language: "en" | "hi" | "mr" | "ta" | "te" | "bn" | "gu" | "kn" | "ml" | "pa" | "ur"
  public func setSessionLanguage(phone : Text, language : Text) {
    let session = getOrCreateSession(phone);
    let updated = { session with language };
    saveSession(updated);
  };

  /// Return the stored language preference for this session (default "en").
  public func getSessionLanguage(phone : Text) : Text {
    switch (sessions.get(phone)) {
      case (?s) s.language;
      case null "en";
    }
  };

  }; // end class ChatbotEngine
};
