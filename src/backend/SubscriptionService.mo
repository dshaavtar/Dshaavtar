import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Float "mo:core/Float";

module {
  // Helper: build dynamic UPI QR code data for a plan
  func buildQrCodeData(planName : Text, amount : Float) : Text {
    "upi://pay?pa=localbazarkart@upi&pn=LocalBazarKart&am=" # amount.toText() # "&cu=INR&tn=Plan-" # planName
  };
  let FREE_PLAN_ID = "plan_free_default";
  let FREE_PLAN_ORDER_LIMIT  = 45;   // 45 orders per month
  let FREE_PLAN_INQUIRY_LIMIT = 0;   // 0 = unlimited inquiries
  let FREE_PLAN_DURATION_DAYS = 30;  // monthly recurring

  // Nanoseconds in one calendar month (30 days): 30*24*60*60*1_000_000_000
  let MONTH_NS : Int = 2_592_000_000_000_000;

  public class SubscriptionService(
    plans : Map.Map<Text, Types.SubscriptionPlan>,
    subscriptions : Map.Map<Text, Types.UserSubscription>,
    assignments : Map.Map<Text, Types.SubscriptionAssignment>,
  ) {

    var nextPlanId : Nat = 0;
    var nextSubId : Nat = 0;

    func genPlanId() : Text {
      nextPlanId += 1;
      "plan_" # Utils.generateId("sp") # "_" # debug_show(nextPlanId)
    };

    func genSubId() : Text {
      nextSubId += 1;
      "sub_" # Utils.generateId("us") # "_" # debug_show(nextSubId)
    };

    // ── Seed helpers ──────────────────────────────────────────────────────────

    // Seed the default free plan if it doesn't exist yet
    public func seedFreePlan() {
      switch (plans.get(FREE_PLAN_ID)) {
        case (?_) {};
        case null {
          let freePlan : Types.SubscriptionPlan = {
            id = FREE_PLAN_ID;
            name = "Free";
            planType = #free_;
            targetRole = #customer;
            priceFlat = 0.0;
            pricePercentage = 0.0;
            orderLimit = FREE_PLAN_ORDER_LIMIT;   // 45 orders per month
            inquiryLimit = FREE_PLAN_INQUIRY_LIMIT; // 0 = unlimited
            durationDays = FREE_PLAN_DURATION_DAYS;
            features = ["45 orders per month", "Unlimited inquiries", "Basic search", "Order placement", "100 utility + 50 authentication messages/month"];
            isActive = true;
            categoryScope = null;
            flatFee = null;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#customer];
            messageType    = "utility";
            utilityLimit   = 100;
            authLimit      = 50;
            marketingLimit = 0;
            qrCodeData = buildQrCodeData("Free", 0.0);
          };
          plans.add(FREE_PLAN_ID, freePlan);
        };
      }
    };

    // Seed all default sample plans aligned with WhatsApp Meta rate card (idempotent — skips existing IDs)
    public func seedDefaultPlans() {
      seedFreePlan();

      let samples : [(Text, Types.SubscriptionPlan)] = [
        (
          "plan_basic_meta",
          {
            id = "plan_basic_meta";
            name = "Basic (Meta Aligned)";
            planType = #monthly;
            targetRole = #customer;
            priceFlat = 299.0;
            pricePercentage = 0.0;
            orderLimit = 0;
            inquiryLimit = 50;
            durationDays = 30;
            features = ["1000 utility messages/month", "500 authentication messages/month", "200 marketing messages/month", "Priority search", "Order tracking"];
            isActive = true;
            categoryScope = null;
            flatFee = ?299.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#customer, #merchant];
            messageType    = "utility";
            utilityLimit   = 1000;
            authLimit      = 500;
            marketingLimit = 200;
            qrCodeData = buildQrCodeData("Basic-Meta", 299.0);
          },
        ),
        (
          "plan_standard_meta",
          {
            id = "plan_standard_meta";
            name = "Standard (Meta Aligned)";
            planType = #monthly;
            targetRole = #merchant;
            priceFlat = 799.0;
            pricePercentage = 0.0;
            orderLimit = 0; // unlimited
            inquiryLimit = 0; // unlimited
            durationDays = 30;
            features = ["5000 utility messages/month", "2000 authentication messages/month", "1000 marketing messages/month", "Unlimited orders", "Analytics dashboard", "Priority listing"];
            isActive = true;
            categoryScope = null;
            flatFee = ?799.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#merchant, #deliveryPartner];
            messageType    = "marketing";
            utilityLimit   = 5000;
            authLimit      = 2000;
            marketingLimit = 1000;
            qrCodeData = buildQrCodeData("Standard-Meta", 799.0);
          },
        ),
        (
          "plan_premium_meta",
          {
            id = "plan_premium_meta";
            name = "Premium (Meta Aligned)";
            planType = #monthly;
            targetRole = #merchant;
            priceFlat = 1999.0;
            pricePercentage = 0.0;
            orderLimit = 0;
            inquiryLimit = 0;
            durationDays = 30;
            features = ["Unlimited utility messages", "5000 authentication messages/month", "3000 marketing messages/month", "Unlimited orders", "Premium support", "ONDC enrollment support", "Analytics dashboard"];
            isActive = true;
            categoryScope = null;
            flatFee = ?1999.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#merchant, #deliveryPartner, #sarthi];
            messageType    = "marketing";
            utilityLimit   = 0; // 0 = unlimited
            authLimit      = 5000;
            marketingLimit = 3000;
            qrCodeData = buildQrCodeData("Premium-Meta", 1999.0);
          },
        ),
        (
          "plan_commission_percentage",
          {
            id = "plan_commission_percentage";
            name = "Commission Plan";
            planType = #percentage;
            targetRole = #merchant;
            priceFlat = 0.0;
            pricePercentage = 5.0;
            orderLimit = 0;
            inquiryLimit = 0;
            durationDays = 30;
            features = ["5% per transaction", "No upfront cost", "Pay as you sell", "Service messages included"];
            isActive = true;
            categoryScope = null;
            flatFee = null;
            percentageFee = ?5.0;
            minTransactionAmount = ?100.0;
            maxTransactionAmount = ?10000.0;
            applicableRoles = [#merchant, #deliveryPartner];
            messageType    = "service";
            utilityLimit   = 0;
            authLimit      = 0;
            marketingLimit = 0;
            qrCodeData = buildQrCodeData("Commission-Plan", 0.0);
          },
        ),
        (
          "plan_promotion_100",
          {
            id = "plan_promotion_100";
            name = "Promote to 100 Users";
            planType = #flat;
            targetRole = #customer;
            priceFlat = 99.0;
            pricePercentage = 0.0;
            orderLimit = 0;
            inquiryLimit = 0;
            durationDays = 30;
            features = ["Reach 100 users", "Marketing messages", "Promotion analytics"];
            isActive = true;
            categoryScope = ?"promotions";
            flatFee = ?99.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#customer, #merchant];
            messageType    = "marketing";
            utilityLimit   = 0;
            authLimit      = 0;
            marketingLimit = 100;
            qrCodeData = buildQrCodeData("Promote-100", 99.0);
          },
        ),
        (
          "plan_promotion_500",
          {
            id = "plan_promotion_500";
            name = "Promote to 500 Users";
            planType = #flat;
            targetRole = #customer;
            priceFlat = 349.0;
            pricePercentage = 0.0;
            orderLimit = 0;
            inquiryLimit = 0;
            durationDays = 30;
            features = ["Reach 500 users", "Marketing messages", "Promotion analytics", "Priority placement"];
            isActive = true;
            categoryScope = ?"promotions";
            flatFee = ?349.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#customer, #merchant];
            messageType    = "marketing";
            utilityLimit   = 0;
            authLimit      = 0;
            marketingLimit = 500;
            qrCodeData = buildQrCodeData("Promote-500", 349.0);
          },
        ),
        (
          "plan_promotion_2000",
          {
            id = "plan_promotion_2000";
            name = "Promote to 2000 Users";
            planType = #flat;
            targetRole = #customer;
            priceFlat = 999.0;
            pricePercentage = 0.0;
            orderLimit = 0;
            inquiryLimit = 0;
            durationDays = 30;
            features = ["Reach 2000 users", "Marketing messages", "Promotion analytics", "Premium placement", "Detailed analytics"];
            isActive = true;
            categoryScope = ?"promotions";
            flatFee = ?999.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#customer, #merchant];
            messageType    = "marketing";
            utilityLimit   = 0;
            authLimit      = 0;
            marketingLimit = 2000;
            qrCodeData = buildQrCodeData("Promote-2000", 999.0);
          },
        ),
        // ── Adhoc / Prepaid Delivery Subscription Plans ──────────────────────
        (
          "plan_adhoc_delivery_basic",
          {
            id = "plan_adhoc_delivery_basic";
            name = "Adhoc Delivery Basic";
            planType = #monthly;
            targetRole = #merchant;
            priceFlat = 999.0;
            pricePercentage = 0.0;
            orderLimit = 500;
            inquiryLimit = 0;
            durationDays = 30;
            features = ["10 assigned users", "500 orders/month", "User-based order tracking", "Delivery partner assignment", "Basic analytics"];
            isActive = true;
            categoryScope = ?"adhoc_delivery";
            flatFee = ?999.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#merchant];
            messageType    = "utility";
            utilityLimit   = 1000;
            authLimit      = 200;
            marketingLimit = 0;
            qrCodeData = buildQrCodeData("Adhoc-Basic", 999.0);
          },
        ),
        (
          "plan_adhoc_delivery_pro",
          {
            id = "plan_adhoc_delivery_pro";
            name = "Adhoc Delivery Pro";
            planType = #monthly;
            targetRole = #merchant;
            priceFlat = 4999.0;
            pricePercentage = 0.0;
            orderLimit = 5000;
            inquiryLimit = 0;
            durationDays = 30;
            features = ["50 assigned users", "5000 orders/month", "User-based order tracking", "Priority delivery assignment", "Advanced analytics", "Dedicated support"];
            isActive = true;
            categoryScope = ?"adhoc_delivery";
            flatFee = ?4999.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#merchant];
            messageType    = "utility";
            utilityLimit   = 5000;
            authLimit      = 1000;
            marketingLimit = 500;
            qrCodeData = buildQrCodeData("Adhoc-Pro", 4999.0);
          },
        ),
        (
          "plan_adhoc_delivery_enterprise",
          {
            id = "plan_adhoc_delivery_enterprise";
            name = "Adhoc Delivery Enterprise";
            planType = #monthly;
            targetRole = #merchant;
            priceFlat = 14999.0;
            pricePercentage = 0.0;
            orderLimit = 0;  // unlimited
            inquiryLimit = 0;
            durationDays = 30;
            features = ["200 assigned users", "Unlimited orders", "User-based order tracking", "Priority delivery assignment", "Full analytics dashboard", "24/7 dedicated support", "Custom integrations"];
            isActive = true;
            categoryScope = ?"adhoc_delivery";
            flatFee = ?14999.0;
            percentageFee = null;
            minTransactionAmount = null;
            maxTransactionAmount = null;
            applicableRoles = [#merchant];
            messageType    = "utility";
            utilityLimit   = 0;  // unlimited
            authLimit      = 5000;
            marketingLimit = 2000;
            qrCodeData = buildQrCodeData("Adhoc-Enterprise", 14999.0);
          },
        ),
      ];

      for ((id, plan) in samples.vals()) {
        switch (plans.get(id)) {
          case (?_) {}; // already exists — skip
          case null { plans.add(id, plan) };
        };
      };
    };

    // ── CRUD ──────────────────────────────────────────────────────────────────

    public func createPlan(
      name : Text,
      planType : Types.SubscriptionPlanType,
      targetRole : Types.UserRole,
      priceFlat : Float,
      pricePercentage : Float,
      orderLimit : Nat,
      inquiryLimit : Nat,
      durationDays : Nat,
      features : [Text],
      categoryScope : ?Text,
      flatFee : ?Float,
      percentageFee : ?Float,
      minTransactionAmount : ?Float,
      maxTransactionAmount : ?Float,
      applicableRoles : [Types.UserRole],
    ) : Types.Result<Types.SubscriptionPlan, Types.ApiError> {
      let plan : Types.SubscriptionPlan = {
        id = genPlanId();
        name;
        planType;
        targetRole;
        priceFlat;
        pricePercentage;
        orderLimit;
        inquiryLimit;
        durationDays;
        features;
        isActive = true;
        categoryScope;
        flatFee;
        percentageFee;
        minTransactionAmount;
        maxTransactionAmount;
        applicableRoles;
        messageType    = "utility";
        utilityLimit   = 0;
        authLimit      = 0;
        marketingLimit = 0;
        qrCodeData = buildQrCodeData(name, priceFlat);
      };
      plans.add(plan.id, plan);
      #ok(plan)
    };

    public func updatePlan(
      id : Text,
      name : Text,
      planType : Types.SubscriptionPlanType,
      targetRole : Types.UserRole,
      priceFlat : Float,
      pricePercentage : Float,
      orderLimit : Nat,
      inquiryLimit : Nat,
      durationDays : Nat,
      features : [Text],
      isActive : Bool,
      categoryScope : ?Text,
      flatFee : ?Float,
      percentageFee : ?Float,
      minTransactionAmount : ?Float,
      maxTransactionAmount : ?Float,
      applicableRoles : [Types.UserRole],
    ) : Types.Result<Types.SubscriptionPlan, Types.ApiError> {
      switch (plans.get(id)) {
        case null #err(#notFound);
        case (?existing) {
          let updated : Types.SubscriptionPlan = {
            existing with
            name;
            planType;
            targetRole;
            priceFlat;
            pricePercentage;
            orderLimit;
            inquiryLimit;
            durationDays;
            features;
            isActive;
            categoryScope;
            flatFee;
            percentageFee;
            minTransactionAmount;
            maxTransactionAmount;
            applicableRoles;
            qrCodeData = buildQrCodeData(name, priceFlat);
          };
          plans.add(id, updated);
          #ok(updated)
        };
      }
    };

    public func deletePlan(id : Text) : Types.Result<Text, Types.ApiError> {
      switch (plans.get(id)) {
        case null #err(#notFound);
        case (?_) {
          plans.remove(id);
          #ok(id)
        };
      }
    };

    // Alias used by main.mo (getPlan / getPlans mirror existing names)
    public func getPlan(id : Text) : Types.Result<Types.SubscriptionPlan, Types.ApiError> {
      getPlanById(id)
    };

    public func getPlans(
      targetRole : ?Types.UserRole,
      planType : ?Types.SubscriptionPlanType,
    ) : [Types.SubscriptionPlan] {
      let results = List.empty<Types.SubscriptionPlan>();
      for ((_, plan) in plans.entries()) {
        let roleMatch = switch (targetRole) {
          case null true;
          case (?role) plan.targetRole == role;
        };
        let typeMatch = switch (planType) {
          case null true;
          case (?pt) plan.planType == pt;
        };
        if (roleMatch and typeMatch and plan.isActive) results.add(plan);
      };
      results.toArray()
    };

    public func getPlanById(id : Text) : Types.Result<Types.SubscriptionPlan, Types.ApiError> {
      switch (plans.get(id)) {
        case (?p) #ok(p);
        case null #err(#notFound);
      }
    };

    public func getAllPlans(targetRole : ?Types.UserRole) : [Types.SubscriptionPlan] {
      let results = List.empty<Types.SubscriptionPlan>();
      for ((_, plan) in plans.entries()) {
        let match = switch (targetRole) {
          case null true;
          case (?role) plan.targetRole == role;
        };
        if (match and plan.isActive) results.add(plan);
      };
      results.toArray()
    };

    // ── User subscription management ──────────────────────────────────────────

    public func assignPlanToUser(
      userId : Text,
      planId : Text,
    ) : Types.Result<Types.UserSubscription, Types.ApiError> {
      switch (plans.get(planId)) {
        case null #err(#notFound);
        case (?plan) {
          let now = Time.now();
          let durationNs : Int = plan.durationDays.toInt() * 86_400_000_000_000;
          let sub : Types.UserSubscription = {
            id = genSubId();
            userId;
            planId;
            startDate = now;
            endDate = now + durationNs;
            ordersUsed = 0;
            inquiriesUsed = 0;
            isActive = true;
          };
          subscriptions.add(userId, sub);
          #ok(sub)
        };
      }
    };

    public func getUserSubscription(userId : Text) : Types.Result<Types.UserSubscription, Types.ApiError> {
      switch (subscriptions.get(userId)) {
        case (?sub) #ok(sub);
        case null #err(#notFound);
      }
    };

    // Alias: getUserPlan returns the plan record (not the subscription record)
    public func getUserPlan(userId : Text) : Types.Result<Types.SubscriptionPlan, Types.ApiError> {
      switch (subscriptions.get(userId)) {
        case null #err(#notFound);
        case (?sub) {
          switch (plans.get(sub.planId)) {
            case null #err(#notFound);
            case (?plan) #ok(plan);
          }
        };
      }
    };

    // ── Limit checks ──────────────────────────────────────────────────────────

    public func checkInquiryLimit(userId : Text) : Types.Result<Bool, Types.ApiError> {
      switch (subscriptions.get(userId)) {
        case null {
          // No subscription — allow up to free plan default
          #ok(true)
        };
        case (?sub) {
          switch (plans.get(sub.planId)) {
            case null #err(#notFound);
            case (?plan) {
              let now = Time.now();
              if (not sub.isActive or sub.endDate <= now) {
                #ok(false)
              } else if (plan.inquiryLimit == 0) {
                #ok(true) // 0 = unlimited
              } else {
                #ok(sub.inquiriesUsed < plan.inquiryLimit)
              }
            };
          }
        };
      }
    };

    public func incrementInquiryCount(userId : Text) : Types.Result<Nat, Types.ApiError> {
      switch (subscriptions.get(userId)) {
        case null #err(#notFound);
        case (?sub) {
          let updated = { sub with inquiriesUsed = sub.inquiriesUsed + 1 };
          subscriptions.add(userId, updated);
          #ok(updated.inquiriesUsed)
        };
      }
    };

    public func checkOrderLimit(userId : Text) : Types.Result<Bool, Types.ApiError> {
      resetMonthlyCountsIfNeeded(userId);
      switch (subscriptions.get(userId)) {
        case null {
          #ok(true) // No subscription = unlimited orders for customers
        };
        case (?sub) {
          switch (plans.get(sub.planId)) {
            case null #err(#notFound);
            case (?plan) {
              let now = Time.now();
              if (not sub.isActive or sub.endDate <= now) {
                #ok(false)
              } else if (plan.orderLimit == 0) {
                #ok(true) // 0 = unlimited
              } else {
                #ok(sub.ordersUsed < plan.orderLimit)
              }
            };
          }
        };
      }
    };

    /// Reset monthly counters (ordersUsed, inquiriesUsed) if a new calendar month has started
    /// relative to when the subscription period began. This ensures the 45-order limit is per month.
    public func resetMonthlyCountsIfNeeded(userId : Text) {
      switch (subscriptions.get(userId)) {
        case null {};
        case (?sub) {
          let now = Time.now();
          // Check if more than one month has passed since startDate
          let elapsed : Int = now - sub.startDate;
          if (elapsed >= MONTH_NS) {
            // How many full months have elapsed
            let monthsElapsed : Nat = Int.abs(elapsed) / Int.abs(MONTH_NS);
            let newStartDate : Int = sub.startDate + monthsElapsed.toInt() * MONTH_NS;
            let updated = {
              sub with
              startDate = newStartDate;
              endDate   = newStartDate + MONTH_NS;
              ordersUsed    = 0;
              inquiriesUsed = 0;
            };
            subscriptions.add(userId, updated);
          };
        };
      }
    };

    public func incrementOrderCount(userId : Text) : Types.Result<Nat, Types.ApiError> {
      switch (subscriptions.get(userId)) {
        case null #err(#notFound);
        case (?sub) {
          let updated = { sub with ordersUsed = sub.ordersUsed + 1 };
          subscriptions.add(userId, updated);
          #ok(updated.ordersUsed)
        };
      }
    };

    // ── Helpers ───────────────────────────────────────────────────────────────

    /// Check if user is within limits for the given limitType.
    /// limitType: "merchant" | "delivery" | "listing" | "order"
    public func enforceSubscriptionLimit(userId : Text, limitType : Text) : Types.Result<Bool, Types.ApiError> {
      if (limitType == "order") { resetMonthlyCountsIfNeeded(userId) };
      switch (subscriptions.get(userId)) {
        case null {
          // No subscription — allow (free tier)
          #ok(true)
        };
        case (?sub) {
          let now = Time.now();
          if (not sub.isActive or sub.endDate <= now) {
            return #err(#subscriptionLimitReached);
          };
          switch (plans.get(sub.planId)) {
            case null #err(#notFound);
            case (?plan) {
              if (limitType == "order") {
                if (plan.orderLimit == 0) #ok(true)
                else if (sub.ordersUsed < plan.orderLimit) #ok(true)
                else #err(#subscriptionLimitReached)
              } else {
                // merchant, delivery, listing — use inquiryLimit as proxy
                if (plan.inquiryLimit == 0) #ok(true)
                else if (sub.inquiriesUsed < plan.inquiryLimit) #ok(true)
                else #err(#subscriptionLimitReached)
              }
            };
          }
        };
      }
    };

    public func isSubscriptionActive(userId : Text) : Bool {
      switch (subscriptions.get(userId)) {
        case null false;
        case (?sub) {
          let now = Time.now();
          sub.isActive and sub.endDate > now
        };
      }
    };

    public func getDefaultFreePlan() : ?Types.SubscriptionPlan {
      plans.get(FREE_PLAN_ID)
    };

    /// Check if user has an active subscription. If not, assign the free plan automatically.
    /// Returns the current subscription status.
    public func checkAndAssignSubscription(userId : Text) : Types.SubscriptionStatus {
      switch (subscriptions.get(userId)) {
        case (?sub) {
          let now = Time.now();
          if (sub.isActive and sub.endDate > now) {
            #active(sub)
          } else {
            // Expired — assign free plan
            switch (assignPlanToUser(userId, FREE_PLAN_ID)) {
              case (#ok(newSub)) #assignedFree(newSub);
              case (#err(_))     #noSubscription;
            }
          }
        };
        case null {
          // No subscription — assign free plan automatically
          switch (assignPlanToUser(userId, FREE_PLAN_ID)) {
            case (#ok(newSub)) #assignedFree(newSub);
            case (#err(_))     #noSubscription;
          }
        };
      }
    };
    /// Check subscription status and return plans if none active.
    /// Returns {hasActive: Bool, plans: [SubscriptionPlan]}.
    public func checkAndEnforceSubscription(userId : Text) : { hasActive : Bool; plans : [Types.SubscriptionPlan] } {
      let active = isSubscriptionActive(userId);
      if (active) {
        { hasActive = true; plans = [] }
      } else {
        let allPlans = getAllPlans(null);
        { hasActive = false; plans = allPlans }
      }
    };

    public func getDiscountedPrice(discountPct : Nat, planPrice : Float) : Float {
      let factor = 1.0 - (discountPct.toFloat() / 100.0);
      planPrice * factor
    };

    // ── Subscription Assignment (User-Based Model) ────────────────────────────

    // Composite key: merchantId # ":" # userPhone
    func assignmentKey(merchantId : Text, userPhone : Text) : Text {
      merchantId # ":" # userPhone
    };

    /// Assign a user (delivery partner phone) to the merchant's subscription with an order cap.
    public func assignUserToSubscription(
      merchantId : Text,
      userPhone  : Text,
      orderCap   : Nat,
    ) : Types.Result<Types.SubscriptionAssignment, Text> {
      let key = assignmentKey(merchantId, userPhone);
      let now = Time.now();
      // Get the merchant's active plan to derive planId
      let planId = switch (subscriptions.get(merchantId)) {
        case (?sub) sub.planId;
        case null   FREE_PLAN_ID;
      };
      let assignment : Types.SubscriptionAssignment = {
        id             = Utils.generateId("assign");
        merchantId;
        assignedUserId = userPhone;
        planId;
        ordersUsed     = 0;
        orderCap;
        status         = #active;
        assignedAt     = now;
        lastOrderAt    = null;
      };
      assignments.add(key, assignment);
      #ok(assignment)
    };

    /// Remove a user assignment from the merchant's subscription.
    public func removeUserFromSubscription(
      merchantId : Text,
      userPhone  : Text,
    ) : Types.Result<(), Text> {
      let key = assignmentKey(merchantId, userPhone);
      switch (assignments.get(key)) {
        case null { #err("Assignment not found") };
        case (?_) {
          assignments.remove(key);
          #ok(())
        };
      }
    };

    /// List all assigned users for a merchant.
    public func getAssignedUsers(merchantId : Text) : [Types.SubscriptionAssignment] {
      let results = List.empty<Types.SubscriptionAssignment>();
      for ((_, a) in assignments.entries()) {
        if (a.merchantId == merchantId) results.add(a);
      };
      results.toArray()
    };

    /// Get assignment stats for a specific user under a merchant.
    public func getAssignedUserStats(merchantId : Text, userPhone : Text) : ?Types.SubscriptionAssignment {
      assignments.get(assignmentKey(merchantId, userPhone))
    };

    /// Increment order count for an assigned user. Called when the user places an order.
    public func incrementAssignedUserOrders(merchantId : Text, userPhone : Text) {
      let key = assignmentKey(merchantId, userPhone);
      switch (assignments.get(key)) {
        case null {};
        case (?a) {
          let updated = {
            a with
            ordersUsed  = a.ordersUsed + 1;
            lastOrderAt = ?Time.now();
          };
          assignments.add(key, updated);
        };
      }
    };

    /// Returns true if the assigned user is still within their order cap.
    public func checkAssignedUserOrderCap(merchantId : Text, userPhone : Text) : Bool {
      switch (assignments.get(assignmentKey(merchantId, userPhone))) {
        case null false;  // not assigned
        case (?a) {
          if (a.status != #active) { return false };
          if (a.orderCap == 0) { return true };  // 0 = unlimited
          a.ordersUsed < a.orderCap
        };
      }
    };

    /// Get aggregated subscription dashboard stats for a merchant.
    public func getSubscriptionDashboardStats(merchantId : Text) : Types.SubscriptionDashboardStats {
      let now = Time.now();
      // Plan info
      let (planName, orderCap, renewalNs) = switch (subscriptions.get(merchantId)) {
        case null ("Free", 45, now + MONTH_NS);
        case (?sub) {
          let pName = switch (plans.get(sub.planId)) {
            case (?p) p.name;
            case null "Free";
          };
          let cap = switch (plans.get(sub.planId)) {
            case (?p) p.orderLimit;
            case null 45;
          };
          (pName, cap, sub.endDate)
        };
      };
      let daysUntilRenewal : Int = (renewalNs - now) / 86_400_000_000_000;

      // Assigned users stats
      let assignedList = getAssignedUsers(merchantId);
      let totalAssigned = assignedList.size();
      var activeCount : Nat = 0;
      var totalOrders : Nat = 0;
      var topPhone : Text = "";
      var topOrders : Nat = 0;

      for (a in assignedList.vals()) {
        if (a.status == #active) { activeCount += 1 };
        totalOrders += a.ordersUsed;
        if (a.ordersUsed > topOrders) {
          topOrders := a.ordersUsed;
          topPhone  := a.assignedUserId;
        };
      };

      let utilizationPercent : Float = if (orderCap == 0) {
        0.0
      } else {
        (totalOrders.toFloat() / orderCap.toFloat()) * 100.0
      };

      let topUser : ?{ phone : Text; ordersCount : Nat } = if (topPhone == "") {
        null
      } else {
        ?{ phone = topPhone; ordersCount = topOrders }
      };

      {
        planName;
        totalOrdersThisMonth = totalOrders;
        orderCap;
        daysUntilRenewal;
        assignedUsersCount   = totalAssigned;
        activeUsersCount     = activeCount;
        utilizationPercent;
        topUser;
      }
    };

  };
};
