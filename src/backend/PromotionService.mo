import Types "Types";
import PromotionTypes "types/PromotionTypes";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";

module {

  public let PROMOTION_PLANS : [PromotionTypes.PromotionSubscriptionPlan] = [
    { id = "plan1"; name = "100 Users";  userReach = 100;  price = 99.0   },
    { id = "plan2"; name = "200 Users";  userReach = 200;  price = 179.0  },
    { id = "plan3"; name = "500 Users";  userReach = 500;  price = 399.0  },
    { id = "plan4"; name = "1000 Users"; userReach = 1000; price = 699.0  },
    { id = "plan5"; name = "2000 Users"; userReach = 2000; price = 1199.0 },
  ];

  // Banned keywords for AI moderation mock
  let BANNED_KEYWORDS : [Text] = [
    "hate", "violence", "porn", "nudity", "spam", "misleading", "scam", "fake"
  ];

  public class PromotionService(
    promotionsById : Map.Map<Text, PromotionTypes.Promotion>,
  ) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "promo_" # nextId.toText()
    };

    func putPromotion(p : PromotionTypes.Promotion) {
      promotionsById.add(p.id, p);
    };

    func planToReach(planId : Text) : Nat {
      for (p in PROMOTION_PLANS.values()) {
        if (p.id == planId) return p.userReach;
      };
      100 // default
    };

    func planToReachVariant(planId : Text) : PromotionTypes.PromotionReach {
      switch (planId) {
        case "plan1" #reach100;
        case "plan2" #reach200;
        case "plan3" #reach500;
        case "plan4" #reach1000;
        case "plan5" #reach2000;
        case _ #reach100;
      }
    };

    /// AI moderation mock — checks title for banned keywords, returns list of flags
    func moderateContent(title : Text) : [Text] {
      let titleLower = title.toLower();
      let flags = List.empty<Text>();
      for (kw in BANNED_KEYWORDS.values()) {
        if (titleLower.contains(#text kw)) {
          flags.add(kw);
        };
      };
      flags.toArray()
    };

    public func createPromotion(
      advertiserPhone  : Text,
      title            : Text,
      reelLink         : Text,
      imageLink        : Text,
      locationArea     : Text,
      locationCity     : Text,
      locationCountry  : Text,
      subscriptionPlan : Text,
    ) : Types.Result<PromotionTypes.Promotion, Types.ApiError> {
      let now = Time.now();
      let thirtyDaysNs : Int = 30 * 86_400_000_000_000;
      let promo : PromotionTypes.Promotion = {
        id               = genId();
        advertiserPhone;
        title;
        reelLink;
        imageLink;
        locationArea;
        locationCity;
        locationCountry;
        subscriptionPlan = planToReachVariant(subscriptionPlan);
        status           = #pendingPayment;
        moderationFlags  = [];
        targetUserCount  = planToReach(subscriptionPlan);
        reachedCount     = 0;
        viewedCount      = 0;
        createdAt        = now;
        expiresAt        = now + thirtyDaysNs;
      };
      putPromotion(promo);
      #ok(promo)
    };

    /// Confirm payment: run AI moderation and set status to #pendingApproval.
    public func confirmPayment(id : Text) : Types.Result<PromotionTypes.Promotion, Types.ApiError> {
      switch (promotionsById.get(id)) {
        case null #err(#notFound);
        case (?p) {
          let flags = moderateContent(p.title);
          let updated = {
            p with
            status          = #pendingApproval;
            moderationFlags = flags;
          };
          putPromotion(updated);
          #ok(updated)
        };
      }
    };

    public func approvePromotion(id : Text) : Types.Result<PromotionTypes.Promotion, Types.ApiError> {
      switch (promotionsById.get(id)) {
        case null #err(#notFound);
        case (?p) {
          let updated = { p with status = #active };
          putPromotion(updated);
          #ok(updated)
        };
      }
    };

    public func rejectPromotion(id : Text, reason : Text) : Types.Result<PromotionTypes.Promotion, Types.ApiError> {
      switch (promotionsById.get(id)) {
        case null #err(#notFound);
        case (?p) {
          let updated = { p with status = #rejected; moderationFlags = [reason] };
          putPromotion(updated);
          #ok(updated)
        };
      }
    };

    /// Get active promotions targeting a specific location.
    public func getPromotionsForLocation(city : Text, area : Text) : [PromotionTypes.Promotion] {
      let cityLower = city.toLower();
      let areaLower = area.toLower();
      let results = List.empty<PromotionTypes.Promotion>();
      for ((_, p) in promotionsById.entries()) {
        if (p.status == #active) {
          let cityMatch = p.locationCity.toLower().contains(#text cityLower) or cityLower.contains(#text (p.locationCity.toLower()));
          let areaMatch = area.size() == 0 or p.locationArea.toLower().contains(#text areaLower) or areaLower.contains(#text (p.locationArea.toLower()));
          if (cityMatch and areaMatch and p.reachedCount < p.targetUserCount) {
            results.add(p);
          };
        };
      };
      results.toArray()
    };

    /// Increment reached count (called when a promotion card is shown to a user).
    public func trackReach(id : Text) : Types.Result<PromotionTypes.Promotion, Types.ApiError> {
      switch (promotionsById.get(id)) {
        case null #err(#notFound);
        case (?p) {
          let updated = { p with reachedCount = p.reachedCount + 1 };
          putPromotion(updated);
          #ok(updated)
        };
      }
    };

    /// Increment viewed count (called when a user views/plays the promotion).
    public func trackView(id : Text) : Types.Result<PromotionTypes.Promotion, Types.ApiError> {
      switch (promotionsById.get(id)) {
        case null #err(#notFound);
        case (?p) {
          let updated = { p with viewedCount = p.viewedCount + 1 };
          putPromotion(updated);
          #ok(updated)
        };
      }
    };

    public func getAllPromotions() : [PromotionTypes.Promotion] {
      let results = List.empty<PromotionTypes.Promotion>();
      for ((_, p) in promotionsById.entries()) { results.add(p) };
      results.toArray()
    };

    public func getPromotionById(id : Text) : Types.Result<PromotionTypes.Promotion, Types.ApiError> {
      switch (promotionsById.get(id)) {
        case (?p) #ok(p);
        case null #err(#notFound);
      }
    };

    public func getPromotionAnalytics(id : Text) : Types.Result<{ reachedCount : Nat; viewedCount : Nat; targetUserCount : Nat; status : PromotionTypes.PromotionStatus }, Types.ApiError> {
      switch (promotionsById.get(id)) {
        case null #err(#notFound);
        case (?p) {
          #ok({
            reachedCount    = p.reachedCount;
            viewedCount     = p.viewedCount;
            targetUserCount = p.targetUserCount;
            status          = p.status;
          })
        };
      }
    };

    /// Get all promotions posted by a specific advertiser phone.
    public func getMyPromotions(phone : Text) : [PromotionTypes.Promotion] {
      let results = List.empty<PromotionTypes.Promotion>();
      for ((_, p) in promotionsById.entries()) {
        if (p.advertiserPhone == phone) results.add(p);
      };
      results.toArray()
    };


    /// Returns city IDs of all known promotions (distinct cities referenced in promotions).
    public func getEnabledCities() : [Text] {
      let seen = Map.empty<Text, Bool>();
      for ((_, p) in promotionsById.entries()) {
        if (p.locationCity.size() > 0) {
          seen.add(p.locationCity, true);
        };
      };
      seen.keys().toArray()
    };

    /// Returns a fixed list of common areas for a city.
    public func getCityAreas(city : Text) : [Text] {
      let cityLower = city.toLower();
      if (cityLower.contains(#text "mumbai") or cityLower.contains(#text "bombay")) {
        ["Andheri", "Bandra", "Borivali", "Dadar", "Dharavi", "Goregaon",
         "Juhu", "Kurla", "Malad", "Mulund", "Thane", "Vikhroli"]
      } else if (cityLower.contains(#text "delhi") or cityLower.contains(#text "ncr")) {
        ["Connaught Place", "Dwarka", "Janakpuri", "Karol Bagh",
         "Lajpat Nagar", "Nehru Place", "Rohini", "Saket", "Vasant Kunj"]
      } else if (cityLower.contains(#text "bangalore") or cityLower.contains(#text "bengaluru")) {
        ["Bellandur", "Hebbal", "HSR Layout", "Indiranagar",
         "Jayanagar", "Koramangala", "Marathahalli", "Whitefield"]
      } else if (cityLower.contains(#text "hyderabad")) {
        ["Ameerpet", "Banjara Hills", "Gachibowli", "Hitech City",
         "Jubilee Hills", "Kukatpally", "Madhapur", "Secunderabad"]
      } else if (cityLower.contains(#text "chennai")) {
        ["Adyar", "Anna Nagar", "Egmore", "Kilpauk",
         "Mylapore", "Porur", "T Nagar", "Velachery"]
      } else if (cityLower.contains(#text "pune")) {
        ["Baner", "Hadapsar", "Kharadi", "Koregaon Park",
         "Magarpatta", "Pimpri", "Shivajinagar", "Viman Nagar"]
      } else if (cityLower.contains(#text "kolkata")) {
        ["Alipore", "Ballygunge", "Behala", "Dumdum",
         "Howrah", "Lake Town", "Salt Lake", "Shyambazar"]
      } else {
        ["Zone 1 - North", "Zone 2 - South", "Zone 3 - East",
         "Zone 4 - West", "Zone 5 - Central", "Zone 6 - Outskirts"]
      }
    };

    /// Returns all promotions with status #pendingApproval.
    public func getPendingPromotions() : [PromotionTypes.Promotion] {
      let results = List.empty<PromotionTypes.Promotion>();
      for ((_, p) in promotionsById.entries()) {
        if (p.status == #pendingApproval) results.add(p);
      };
      results.toArray()
    };

    /// Fire a promotion: set status to #active and record targetUserCount override.
    public func firePromotion(id : Text, targetUserCount : Nat) : Types.Result<PromotionTypes.Promotion, Types.ApiError> {
      switch (promotionsById.get(id)) {
        case null #err(#notFound);
        case (?p) {
          let count = if (targetUserCount == 0) p.targetUserCount else targetUserCount;
          let updated = { p with status = #active; targetUserCount = count };
          putPromotion(updated);
          #ok(updated)
        };
      }
    };

  }; // end class PromotionService
};
