import Types "../Types";
import PSTypes "../types/ProfessionalServiceTypes";
import FamilyTypes "../types/FamilyTypes";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Debug "mo:core/Debug";

mixin (
  healthcareProviderStore : Map.Map<Text, PSTypes.HealthcareProvider>,
  healthcareApptStore     : Map.Map<Text, PSTypes.HealthcareAppointment>,
  tourOperatorStore       : Map.Map<Text, PSTypes.TourOperator>,
  tourBookingStore        : Map.Map<Text, PSTypes.TourBooking>,
  professionalSvcStore    : Map.Map<Text, PSTypes.ProfessionalService>,
  serviceBookingStore     : Map.Map<Text, PSTypes.ServiceBooking>,
  merchantsById           : Map.Map<Text, Types.Merchant>,
  ordersById              : Map.Map<Text, Types.Order>,
  subscriptionsStore      : Map.Map<Text, Types.UserSubscription>,
  plansStore              : Map.Map<Text, Types.SubscriptionPlan>,
  usersByPhone            : Map.Map<Text, Types.User>,
  familyStore             : Map.Map<Text, FamilyTypes.FamilyMember>,
  dpByUserId              : Map.Map<Text, Types.DeliveryPartner>,
) {


  // ── Internal helpers ──────────────────────────────────────────────────────────

  func getAppliedRateInternal(svc : PSTypes.ProfessionalService, area : ?Text) : Float {
    switch (area) {
      case null svc.pricePerHour;
      case (?a) {
        let aLower = a.toLower();
        switch (svc.areaRates.find(func((name, _rate) : (Text, Float)) : Bool {
          name.toLower() == aLower
        })) {
          case (?(_, rate)) rate;
          case null svc.pricePerHour;
        }
      };
    }
  };

  var hpCounter  : Nat = 0;
  var haCounter  : Nat = 0;
  var toCounter  : Nat = 0;
  var tbCounter  : Nat = 0;
  var psCounter  : Nat = 0;
  var sbCounter  : Nat = 0;

  func nextId(prefix : Text, counter : Nat) : Text {
    prefix # "_" # Time.now().toText() # "_" # counter.toText()
  };

  // ── Healthcare Provider API ───────────────────────────────────────────────

  public shared func registerHealthcareProvider(
    name            : Text,
    specialization  : Text,
    consultationFee : Float,
    address         : Text,
    city            : Text,
    availability    : Text,
    phone           : Text,
  ) : async PSTypes.HealthcareProvider {
    hpCounter += 1;
    let id = nextId("hp", hpCounter);
    let now = Time.now();
    let provider : PSTypes.HealthcareProvider = {
      id;
      name;
      specialization;
      consultationFee;
      address;
      city;
      availability = [availability];
      phone;
      rating    = 0.0;
      createdAt = now;
      updatedAt = now;
    };
    healthcareProviderStore.add(id, provider);
    provider
  };

  public query func searchHealthcareProviders(
    specialization : ?Text,
    city           : ?Text,
  ) : async [PSTypes.HealthcareProvider] {
    let specLower : ?Text = switch (specialization) { case null null; case (?s) ?(s.toLower()) };
    let cityLower : ?Text = switch (city) { case null null; case (?c) ?(c.toLower()) };
    healthcareProviderStore.values().toArray().filter(func(p : PSTypes.HealthcareProvider) : Bool {
      let specMatch = switch (specLower) {
        case null true;
        case (?s) p.specialization.toLower().contains(#text s);
      };
      let cityMatch = switch (cityLower) {
        case null true;
        case (?c) p.city.toLower().contains(#text c);
      };
      specMatch and cityMatch
    })
  };

  public shared func bookHealthcareAppointment(
    providerId    : Text,
    customerPhone : Text,
    date          : Text,
    timeSlot      : Text,
    notes         : Text,
  ) : async PSTypes.HealthcareAppointment {
    haCounter += 1;
    let id = nextId("ha", haCounter);
    let now = Time.now();
    let appt : PSTypes.HealthcareAppointment = {
      id;
      providerId;
      customerPhone;
      date;
      timeSlot;
      status    = #pending;
      notes;
      createdAt = now;
      updatedAt = now;
    };
    healthcareApptStore.add(id, appt);
    appt
  };

  public query func getHealthcareAppointments(
    customerPhone : ?Text,
    providerId    : ?Text,
  ) : async [PSTypes.HealthcareAppointment] {
    healthcareApptStore.values().toArray().filter(func(a : PSTypes.HealthcareAppointment) : Bool {
      let custMatch = switch (customerPhone) {
        case null true;
        case (?p) a.customerPhone == p;
      };
      let provMatch = switch (providerId) {
        case null true;
        case (?pid) a.providerId == pid;
      };
      custMatch and provMatch
    })
  };

  public shared func updateHealthcareAppointmentStatus(
    appointmentId : Text,
    status        : PSTypes.AppointmentStatus,
  ) : async ?PSTypes.HealthcareAppointment {
    switch (healthcareApptStore.get(appointmentId)) {
      case null null;
      case (?appt) {
        let updated = { appt with status; updatedAt = Time.now() };
        healthcareApptStore.add(appointmentId, updated);
        ?updated
      };
    }
  };

  // ── Tour Operator API ─────────────────────────────────────────────────────

  public shared func registerTourOperator(
    name           : Text,
    destinations   : [Text],
    tourTypes      : [Text],
    duration       : Text,
    pricePerPerson : Float,
    maxPassengers  : Nat,
    phone          : Text,
    city           : Text,
  ) : async PSTypes.TourOperator {
    toCounter += 1;
    let id = nextId("to", toCounter);
    let now = Time.now();
    let op : PSTypes.TourOperator = {
      id;
      name;
      destinations;
      tourTypes;
      duration;
      pricePerPerson;
      maxPassengers;
      phone;
      city;
      rating    = 0.0;
      createdAt = now;
      updatedAt = now;
    };
    tourOperatorStore.add(id, op);
    op
  };

  public query func searchTourOperators(
    destination : ?Text,
    city        : ?Text,
  ) : async [PSTypes.TourOperator] {
    let destLower : ?Text = switch (destination) { case null null; case (?d) ?(d.toLower()) };
    let cityLower2 : ?Text = switch (city) { case null null; case (?c) ?(c.toLower()) };
    tourOperatorStore.values().toArray().filter(func(op : PSTypes.TourOperator) : Bool {
      let destMatch = switch (destLower) {
        case null true;
        case (?d) {
          op.destinations.find(func(dd : Text) : Bool {
            dd.toLower().contains(#text d)
          }) != null
        };
      };
      let cityMatch = switch (cityLower2) {
        case null true;
        case (?c) op.city.toLower().contains(#text c);
      };
      destMatch and cityMatch
    })
  };

  public shared func bookTour(
    operatorId     : Text,
    customerPhone  : Text,
    destination    : Text,
    tourType       : Text,
    date           : Text,
    passengerCount : Nat,
  ) : async PSTypes.TourBooking {
    tbCounter += 1;
    let id = nextId("tb", tbCounter);
    let pricePerPerson : Float = switch (tourOperatorStore.get(operatorId)) {
      case (?op) op.pricePerPerson;
      case null  0.0;
    };
    let totalPrice = pricePerPerson * passengerCount.toFloat();
    let now = Time.now();
    let booking : PSTypes.TourBooking = {
      id;
      operatorId;
      customerPhone;
      destination;
      tourType;
      date;
      passengerCount;
      totalPrice;
      status    = #pending;
      createdAt = now;
      updatedAt = now;
    };
    tourBookingStore.add(id, booking);
    booking
  };

  public query func getTourBookings(
    customerPhone : ?Text,
    operatorId    : ?Text,
  ) : async [PSTypes.TourBooking] {
    tourBookingStore.values().toArray().filter(func(b : PSTypes.TourBooking) : Bool {
      let custMatch = switch (customerPhone) {
        case null true;
        case (?p) b.customerPhone == p;
      };
      let opMatch = switch (operatorId) {
        case null true;
        case (?oid) b.operatorId == oid;
      };
      custMatch and opMatch
    })
  };

  public shared func updateTourBookingStatus(
    bookingId : Text,
    status    : PSTypes.TourBookingStatus,
  ) : async ?PSTypes.TourBooking {
    switch (tourBookingStore.get(bookingId)) {
      case null null;
      case (?b) {
        let updated = { b with status; updatedAt = Time.now() };
        tourBookingStore.add(bookingId, updated);
        ?updated
      };
    }
  };

  // ── Professional Service API ──────────────────────────────────────────────

  public shared func registerProfessionalService(
    merchantPhone  : Text,
    serviceType    : Text,
    specialization : Text,
    pricePerHour   : Float,
    address        : Text,
    city           : Text,
    availability   : Text,
    areaRates      : [(Text, Float)],
  ) : async PSTypes.ProfessionalService {
    psCounter += 1;
    let id = nextId("ps", psCounter);
    let now = Time.now();
    let svc : PSTypes.ProfessionalService = {
      id;
      merchantPhone;
      serviceType;
      specialization;
      pricePerHour;
      areaRates;
      address;
      city;
      availability = [availability];
      rating    = 0.0;
      createdAt = now;
      updatedAt = now;
    };
    professionalSvcStore.add(id, svc);
    svc
  };

  /// Search professional services with optional area filter.
  /// Returns (service, appliedRate) pairs — appliedRate is area-specific if set,
  /// otherwise the global pricePerHour.
  public query func searchProfessionalServices(
    serviceType  : ?Text,
    city         : ?Text,
    customerArea : ?Text,
  ) : async [(PSTypes.ProfessionalService, Float)] {
    let typeLower : ?Text = switch (serviceType) { case null null; case (?t) ?(t.toLower()) };
    let cityLower3 : ?Text = switch (city) { case null null; case (?c) ?(c.toLower()) };
    let results = professionalSvcStore.values().toArray().filter(func(s : PSTypes.ProfessionalService) : Bool {
      let typeMatch = switch (typeLower) {
        case null true;
        case (?t) s.serviceType.toLower().contains(#text t);
      };
      let cityMatch = switch (cityLower3) {
        case null true;
        case (?c) s.city.toLower().contains(#text c);
      };
      typeMatch and cityMatch
    });
    results.map<PSTypes.ProfessionalService, (PSTypes.ProfessionalService, Float)>(
      func(s) { (s, getAppliedRateInternal(s, customerArea)) }
    )
  };

  public shared func bookProfessionalService(
    serviceId     : Text,
    customerPhone : Text,
    date          : Text,
    timeSlot      : Text,
    duration      : Nat,
    notes         : Text,
    customerArea  : ?Text,
  ) : async PSTypes.ServiceBooking {
    sbCounter += 1;
    let id = nextId("sb", sbCounter);
    let hourlyRate : Float = switch (professionalSvcStore.get(serviceId)) {
      case (?s) getAppliedRateInternal(s, customerArea);
      case null 0.0;
    };
    let totalPrice = hourlyRate * duration.toFloat();
    let now = Time.now();
    let booking : PSTypes.ServiceBooking = {
      id;
      serviceId;
      customerPhone;
      date;
      timeSlot;
      duration;
      totalPrice;
      status    = #pending;
      notes;
      createdAt = now;
      updatedAt = now;
    };
    serviceBookingStore.add(id, booking);
    booking
  };

  public query func getServiceBookings(
    customerPhone : ?Text,
    merchantPhone : ?Text,
  ) : async [PSTypes.ServiceBooking] {
    // For merchantPhone filter, we match via the serviceId → professionalSvcStore
    serviceBookingStore.values().toArray().filter(func(b : PSTypes.ServiceBooking) : Bool {
      let custMatch = switch (customerPhone) {
        case null true;
        case (?p) b.customerPhone == p;
      };
      let merchantMatch = switch (merchantPhone) {
        case null true;
        case (?mp) {
          switch (professionalSvcStore.get(b.serviceId)) {
            case null false;
            case (?svc) svc.merchantPhone == mp;
          }
        };
      };
      custMatch and merchantMatch
    })
  };

  public shared func updateServiceBookingStatus(
    bookingId : Text,
    status    : PSTypes.ServiceBookingStatus,
  ) : async ?PSTypes.ServiceBooking {
    switch (serviceBookingStore.get(bookingId)) {
      case null null;
      case (?b) {
        let updated = { b with status; updatedAt = Time.now() };
        serviceBookingStore.add(bookingId, updated);
        ?updated
      };
    }
  };

  // ── Get All (Data Explorer / frontend listing) ─────────────────────────

  public query func getAllHealthcareProviders() : async [PSTypes.HealthcareProvider] {
    healthcareProviderStore.values().toArray()
  };

  public query func getAllTourOperators() : async [PSTypes.TourOperator] {
    tourOperatorStore.values().toArray()
  };

  public query func getAllProfessionalServices() : async [PSTypes.ProfessionalService] {
    professionalSvcStore.values().toArray()
  };

  // ── Add (Data Explorer Add button) ───────────────────────────────────────

  public shared func addHealthcareProvider(
    name           : Text,
    specialization : Text,
    location       : Text,
    phone          : Text,
    availableDays  : Text,
    fee            : Nat,
  ) : async Types.Result<PSTypes.HealthcareProvider, Text> {
    hpCounter += 1;
    let id = nextId("hp", hpCounter);
    let now = Time.now();
    let provider : PSTypes.HealthcareProvider = {
      id;
      name;
      specialization;
      consultationFee = fee.toFloat();
      address         = location;
      city            = "";
      availability    = [availableDays];
      phone;
      rating          = 0.0;
      createdAt       = now;
      updatedAt       = now;
    };
    healthcareProviderStore.add(id, provider);
    #ok(provider)
  };

  public shared func updateHealthcareProvider(
    id             : Text,
    name           : Text,
    specialization : Text,
    location       : Text,
    phone          : Text,
    availableDays  : Text,
    fee            : Nat,
  ) : async Types.Result<PSTypes.HealthcareProvider, Text> {
    switch (healthcareProviderStore.get(id)) {
      case null { #err("Healthcare provider not found") };
      case (?existing) {
        let updated : PSTypes.HealthcareProvider = {
          existing with
          name;
          specialization;
          consultationFee = fee.toFloat();
          address         = location;
          availability    = [availableDays];
          phone;
          updatedAt       = Time.now();
        };
        healthcareProviderStore.add(id, updated);
        #ok(updated)
      };
    }
  };

  public shared func deleteHealthcareProvider(id : Text) : async Types.Result<Bool, Text> {
    switch (healthcareProviderStore.get(id)) {
      case null { #err("Healthcare provider not found") };
      case (?_) {
        healthcareProviderStore.remove(id);
        #ok(true)
      };
    }
  };

  // ── Tour Operator CRUD ────────────────────────────────────────────────────

  public shared func addTourOperator(
    name        : Text,
    destination : Text,
    tourType    : Text,
    duration    : Text,
    price       : Nat,
    phone       : Text,
    description : Text,
  ) : async Types.Result<PSTypes.TourOperator, Text> {
    toCounter += 1;
    let id = nextId("to", toCounter);
    let now = Time.now();
    let op : PSTypes.TourOperator = {
      id;
      name;
      destinations   = [destination];
      tourTypes      = [tourType];
      duration;
      pricePerPerson = price.toFloat();
      maxPassengers  = 20;
      phone;
      city           = description;
      rating         = 0.0;
      createdAt      = now;
      updatedAt      = now;
    };
    tourOperatorStore.add(id, op);
    #ok(op)
  };

  public shared func updateTourOperator(
    id          : Text,
    name        : Text,
    destination : Text,
    tourType    : Text,
    duration    : Text,
    price       : Nat,
    phone       : Text,
    description : Text,
  ) : async Types.Result<PSTypes.TourOperator, Text> {
    switch (tourOperatorStore.get(id)) {
      case null { #err("Tour operator not found") };
      case (?existing) {
        let updated : PSTypes.TourOperator = {
          existing with
          name;
          destinations   = [destination];
          tourTypes      = [tourType];
          duration;
          pricePerPerson = price.toFloat();
          phone;
          city           = description;
          updatedAt      = Time.now();
        };
        tourOperatorStore.add(id, updated);
        #ok(updated)
      };
    }
  };

  public shared func deleteTourOperator(id : Text) : async Types.Result<Bool, Text> {
    switch (tourOperatorStore.get(id)) {
      case null { #err("Tour operator not found") };
      case (?_) {
        tourOperatorStore.remove(id);
        #ok(true)
      };
    }
  };

  // ── Professional Service CRUD ─────────────────────────────────────────────

  public shared func addProfessionalService(
    name        : Text,
    serviceType : Text,
    location    : Text,
    phone       : Text,
    experience  : Text,
    hourlyRate  : Nat,
    description : Text,
    areaRates   : [(Text, Float)],
  ) : async Types.Result<PSTypes.ProfessionalService, Text> {
    psCounter += 1;
    let id = nextId("ps", psCounter);
    let now = Time.now();
    let svc : PSTypes.ProfessionalService = {
      id;
      merchantPhone  = phone;
      serviceType;
      specialization = experience;
      pricePerHour   = hourlyRate.toFloat();
      areaRates;
      address        = location;
      city           = description;
      availability   = ["Mon-Sat 9am-6pm"];
      rating         = 0.0;
      createdAt      = now;
      updatedAt      = now;
    };
    professionalSvcStore.add(id, svc);
    #ok(svc)
  };

  public shared func updateProfessionalService(
    id          : Text,
    name        : Text,
    serviceType : Text,
    location    : Text,
    phone       : Text,
    experience  : Text,
    hourlyRate  : Nat,
    description : Text,
  ) : async Types.Result<PSTypes.ProfessionalService, Text> {
    switch (professionalSvcStore.get(id)) {
      case null { #err("Professional service not found") };
      case (?existing) {
        let updated : PSTypes.ProfessionalService = {
          existing with
          merchantPhone  = phone;
          serviceType;
          specialization = experience;
          pricePerHour   = hourlyRate.toFloat();
          address        = location;
          city           = description;
          updatedAt      = Time.now();
        };
        professionalSvcStore.add(id, updated);
        #ok(updated)
      };
    }
  };

  public shared func deleteProfessionalService(id : Text) : async Types.Result<Bool, Text> {
    switch (professionalSvcStore.get(id)) {
      case null { #err("Professional service not found") };
      case (?_) {
        professionalSvcStore.remove(id);
        #ok(true)
      };
    }
  };

  // ── Dashboard APIs ────────────────────────────────────────────────────────

  /// Merchant dashboard — reads subscription status, checks passdigit, aggregates
  /// orders by service type, calculates recent earnings.
  public query func getMerchantDashboardData(
    merchantPhone : Text,
  ) : async PSTypes.MerchantDashboardData {
    // Find user by phone to check passdigit / session lock
    let userOpt = usersByPhone.get(merchantPhone);
    let passdigitRequired : Bool = switch (userOpt) {
      case null false;
      case (?u) u.passdigit == "" or u.sessionLocked;
    };

    // Check subscription status
    let subscriptionStatus : Text = switch (subscriptionsStore.get(merchantPhone)) {
      case null "inactive";
      case (?sub) {
        let now = Time.now();
        if (sub.isActive and sub.endDate > now) "active" else "inactive"
      };
    };

    // Find merchant by phone (userId field contains phone for phone-keyed users)
    let merchantOpt = merchantsById.values().toArray().find(func(m : Types.Merchant) : Bool {
      m.userId == merchantPhone
    });

    let merchantId : Text = switch (merchantOpt) {
      case null "";
      case (?m) m.id;
    };

    // Aggregate orders for this merchant
    let serviceTypeMap = Map.empty<Text, Nat>();
    var pendingBookings : Nat = 0;
    var recentOrders    : Nat = 0;
    let now = Time.now();
    let sevenDaysNs : Int = 7 * 24 * 3600 * 1_000_000_000;

    if (merchantId != "") {
      for ((_, o) in ordersById.entries()) {
        if (o.merchantId == merchantId) {
          recentOrders += 1;
          // Count pending/new as pending bookings
          switch (o.status) {
            case (#pending) { pendingBookings += 1 };
            case (#new_)    { pendingBookings += 1 };
            case _ {};
          };
        };
      };
    };

    // Count professional services by type registered to this merchant
    for ((_, svc) in professionalSvcStore.entries()) {
      if (svc.merchantPhone == merchantPhone) {
        let prev = switch (serviceTypeMap.get(svc.serviceType)) { case (?v) v; case null 0 };
        serviceTypeMap.add(svc.serviceType, prev + 1);
      };
    };

    // Build simple earnings by date (last 7 days, from orders)
    let earningsList = List.empty<PSTypes.EarningsByDate>();
    let dayMap = Map.empty<Text, Float>();
    if (merchantId != "") {
      for ((_, o) in ordersById.entries()) {
        if (o.merchantId == merchantId and o.status == #completed) {
          let daysAgo = Int.abs((now - o.createdAt) / (24 * 3600 * 1_000_000_000));
          if (daysAgo <= 7) {
            let key = "day-" # daysAgo.toText();
            let prev = switch (dayMap.get(key)) { case (?v) v; case null 0.0 };
            dayMap.add(key, prev + o.totalAmount);
          };
        };
      };
    };
    for ((date, earnings) in dayMap.entries()) {
      earningsList.add({ date; earnings });
    };

    {
      subscriptionStatus;
      passdigitRequired;
      servicesByType   = serviceTypeMap.toArray();
      pendingBookings;
      recentOrders;
      earningsByDate   = earningsList.toArray();
    }
  };

  /// Delivery partner dashboard — reads subscription, checks passdigit,
  /// returns active deliveries, total earnings, rating.
  public query func getDeliveryDashboardData(
    partnerPhone : Text,
  ) : async PSTypes.DeliveryDashboardData {
    let userOpt = usersByPhone.get(partnerPhone);
    let passdigitRequired : Bool = switch (userOpt) {
      case null false;
      case (?u) u.passdigit == "" or u.sessionLocked;
    };

    let subscriptionStatus : Text = switch (subscriptionsStore.get(partnerPhone)) {
      case null "inactive";
      case (?sub) {
        let now = Time.now();
        if (sub.isActive and sub.endDate > now) "active" else "inactive"
      };
    };

    // Find DP by userId (phone)
    let dpOpt = dpByUserId.get(partnerPhone);
    let dpId : Text = switch (dpOpt) { case (?dp) dp.id; case null "" };
    let rating : Float = switch (dpOpt) { case (?dp) dp.avgRating; case null 0.0 };

    var activeDeliveries : Nat = 0;
    var totalEarnings    : Float = 0.0;

    for ((_, o) in ordersById.entries()) {
      switch (o.deliveryPartnerId) {
        case null {};
        case (?pid) {
          if (pid == dpId or pid == partnerPhone) {
            switch (o.status) {
              case (#assigned) { activeDeliveries += 1 };
              case (#inTransit) { activeDeliveries += 1 };
              case (#completed) { totalEarnings += o.deliveryCharge };
              case _ {};
            };
          };
        };
      };
    };

    {
      subscriptionStatus;
      passdigitRequired;
      activeDeliveries;
      totalEarnings;
      rating;
    }
  };

  /// Customer dashboard — reads orders, calculates expenditure by category,
  /// counts family members, reads active subscriptions.
  public query func getCustomerDashboardData(
    customerPhone : Text,
  ) : async PSTypes.CustomerDashboardData {
    var totalExpenditure : Float = 0.0;
    let expByCategoryMap  = Map.empty<Text, Float>();
    let ordersByCategoryMap = Map.empty<Text, Nat>();

    // Find merchant category for each order
    for ((_, o) in ordersById.entries()) {
      if (o.customerId == customerPhone) {
        totalExpenditure += o.totalAmount;
        // Get merchant category
        let category : Text = switch (merchantsById.get(o.merchantId)) {
          case null "other";
          case (?m) m.category;
        };
        let prevExp = switch (expByCategoryMap.get(category)) { case (?v) v; case null 0.0 };
        expByCategoryMap.add(category, prevExp + o.totalAmount);
        let prevOrd = switch (ordersByCategoryMap.get(category)) { case (?v) v; case null 0 };
        ordersByCategoryMap.add(category, prevOrd + 1);
      };
    };

    // Count family members for this customer
    var familyMemberCount : Nat = 0;
    for ((_, fm) in familyStore.entries()) {
      if (fm.ownerPhone == customerPhone) {
        familyMemberCount += 1;
      };
    };

    // Count active subscriptions
    var activeSubscriptions : Nat = 0;
    switch (subscriptionsStore.get(customerPhone)) {
      case null {};
      case (?sub) {
        let now = Time.now();
        if (sub.isActive and sub.endDate > now) {
          activeSubscriptions := 1;
        };
      };
    };

    {
      totalExpenditure;
      expenditureByCategory = expByCategoryMap.toArray();
      ordersByCategory      = ordersByCategoryMap.toArray();
      familyMemberCount;
      activeSubscriptions;
    }
  };


  // ── Additional Area Rate helpers (for admin form + chatbot flow) ────────────

  /// Update the full area-rates list for a service in one call.
  /// Replaces the entire areaRates array atomically.
  public shared func updateAreaRates(
    serviceId : Text,
    areaRates : [(Text, Float)],
  ) : async Types.Result<PSTypes.ProfessionalService, Text> {
    switch (professionalSvcStore.get(serviceId)) {
      case null { #err("Professional service not found: " # serviceId) };
      case (?svc) {
        let updated : PSTypes.ProfessionalService = { svc with areaRates; updatedAt = Time.now() };
        professionalSvcStore.add(serviceId, updated);
        #ok(updated)
      };
    }
  };

  /// Return the area rates configured for a specific service.
  public query func getAreaRates(
    serviceId : Text,
  ) : async [(Text, Float)] {
    switch (professionalSvcStore.get(serviceId)) {
      case null [];
      case (?svc) svc.areaRates;
    }
  };

  /// Search professional services by category, city, and customer area.
  /// Returns (ProfessionalService, appliedRate) pairs where the appliedRate is
  /// the area-specific rate (or the global pricePerHour fallback).
  public query func searchProfessionalServicesByArea(
    category : Text,
    city     : Text,
    area     : Text,
  ) : async [(PSTypes.ProfessionalService, Float)] {
    let catLower  = category.toLower();
    let cityLower = city.toLower();
    let results = professionalSvcStore.values().toArray().filter(
      func(s : PSTypes.ProfessionalService) : Bool {
        let catMatch = catLower == "" or s.serviceType.toLower().contains(#text catLower)
                       or s.specialization.toLower().contains(#text catLower);
        let cityMatch = cityLower == "" or s.city.toLower().contains(#text cityLower);
        catMatch and cityMatch
      }
    );
    results.map<PSTypes.ProfessionalService, (PSTypes.ProfessionalService, Float)>(
      func(s) { (s, getAppliedRateInternal(s, ?area)) }
    )
  };

  // ── City Areas & Area Rates API ──────────────────────────────────────────────────────────

  /// Returns the fixed predefined area list for a given city name.
  public query func getCityAreas(city : Text) : async [Text] {
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

  /// Set or update a rate for a specific area on the professional service owned by merchantPhone.
  public shared func setAreaRate(
    serviceId     : Text,
    merchantPhone : Text,
    area          : Text,
    rate          : Float,
  ) : async Types.Result<PSTypes.ProfessionalService, Text> {
    switch (professionalSvcStore.get(serviceId)) {
      case null { #err("Service not found") };
      case (?svc) {
        if (svc.merchantPhone != merchantPhone) return #err("Not authorized");
        let aLower = area.toLower();
        let filtered = svc.areaRates.filter(func((name, _r) : (Text, Float)) : Bool {
          name.toLower() != aLower
        });
        let newRates : [(Text, Float)] = filtered.concat([(area, rate)]);
        let updated : PSTypes.ProfessionalService = { svc with areaRates = newRates; updatedAt = Time.now() };
        professionalSvcStore.add(serviceId, updated);
        #ok(updated)
      };
    }
  };

  /// Remove the area-specific rate for an area from the professional service.
  public shared func removeAreaRate(
    serviceId     : Text,
    merchantPhone : Text,
    area          : Text,
  ) : async Types.Result<PSTypes.ProfessionalService, Text> {
    switch (professionalSvcStore.get(serviceId)) {
      case null { #err("Service not found") };
      case (?svc) {
        if (svc.merchantPhone != merchantPhone) return #err("Not authorized");
        let aLower = area.toLower();
        let newRates = svc.areaRates.filter(func((name, _r) : (Text, Float)) : Bool {
          name.toLower() != aLower
        });
        let updated : PSTypes.ProfessionalService = { svc with areaRates = newRates; updatedAt = Time.now() };
        professionalSvcStore.add(serviceId, updated);
        #ok(updated)
      };
    }
  };
};
