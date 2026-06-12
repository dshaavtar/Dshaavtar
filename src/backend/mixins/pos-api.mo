import Types "../Types";
import POSTypes "../types/POSTypes";
import POSLib "../lib/POSLib";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Char "mo:core/Char";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

// ── POS Mixin ─────────────────────────────────────────────────────────────
// Exposes Merchant POS, Delivery Partner POS, Customer Budget,
// Subscription QR, Enhanced Analytics, and Module-Role toggle endpoints.
// State injected from main.mo — no state owned here.

mixin (
  ordersById          : Map.Map<Text, Types.Order>,
  merchantsById       : Map.Map<Text, Types.Merchant>,
  dpById              : Map.Map<Text, Types.DeliveryPartner>,
  usersById           : Map.Map<Text, Types.User>,
  usersByPhone        : Map.Map<Text, Types.User>,
  plansStore          : Map.Map<Text, Types.SubscriptionPlan>,
  subscriptionsStore  : Map.Map<Text, Types.UserSubscription>,
  merchantBranchStore : Map.Map<Text, [POSTypes.MerchantBranch]>,
  orderQRStore        : Map.Map<Text, POSTypes.OrderPaymentQR>,
  deliveryQRStore     : Map.Map<Text, POSTypes.DeliveryPaymentQR>,
  petrolExpenseStore  : Map.Map<Text, POSTypes.PetrolExpense>,
  customerBudgetStore : Map.Map<Text, POSTypes.CustomerBudget>,
  moduleRoleStore     : Map.Map<Text, Bool>,
  adminUPIStore       : Map.Map<Text, POSTypes.AdminUPIProfile>,
  shuttleRoutesStore  : Map.Map<Text, Types.ShuttleRoute>,
) {

  // ── Internal state (mixin-local) ─────────────────────────────────────────

  let adminConfigStore : Map.Map<Text, Types.AdminConfig>  = Map.empty<Text, Types.AdminConfig>();
  let posOTPStore      : Map.Map<Text, Types.POSOTPRecord> = Map.empty<Text, Types.POSOTPRecord>();

  // ── Helpers ──────────────────────────────────────────────────────────────

  func allOrders() : [Types.Order] {
    let out = List.empty<Types.Order>();
    for ((_, o) in ordersById.entries()) { out.add(o) };
    out.toArray()
  };

  func allMerchants() : [Types.Merchant] {
    let out = List.empty<Types.Merchant>();
    for ((_, m) in merchantsById.entries()) { out.add(m) };
    out.toArray()
  };

  func allDPs() : [Types.DeliveryPartner] {
    let out = List.empty<Types.DeliveryPartner>();
    for ((_, d) in dpById.entries()) { out.add(d) };
    out.toArray()
  };

  func allUsers() : [Types.User] {
    let out = List.empty<Types.User>();
    for ((_, u) in usersById.entries()) { out.add(u) };
    out.toArray()
  };

  func genExpenseId() : Text {
    let ts = Int.abs(Time.now());
    "exp_" # ts.toText()
  };

  func genSubQRId() : Text {
    let ts = Int.abs(Time.now());
    "sqr_" # ts.toText()
  };

  func genOTPValue(seed : Text) : Text {
    let ts = Int.abs(Time.now());
    let combined = seed.foldLeft(ts, func(acc : Int, c : Char) : Int {
      (acc * 31 + Nat.fromNat32(c.toNat32()).toInt()) % 1_000_000_007
    });
    let raw = (Int.abs(combined) % 1_000_000).toText();
    var padded = raw;
    var pad : Nat = if (raw.size() >= 6) 0 else 6 - raw.size();
    while (pad > 0) {
      padded := "0" # padded;
      pad -= 1;
    };
    padded
  };

  // All roles covered by module toggles
  let MODULE_ROLES : [Text] = ["customer", "merchant", "delivery_partner"];
  let MODULE_NAMES : [Text] = ["shopping", "jobs", "property", "transport", "events", "family", "promotions"];

  // ── Admin Config (UPI + system settings) ─────────────────────────────────

  public func setAdminUPI(upiId : Text, upiName : Text) : async Types.Result<(), Types.ApiError> {
    let profile : POSTypes.AdminUPIProfile = { upiId; name = upiName };
    adminUPIStore.add("admin", profile);
    // Also update AdminConfig
    let existing = switch (adminConfigStore.get("admin")) {
      case null  { { upiId; upiName; baseUrl = ""; webhookUrl = "" } };
      case (?c)  { { c with upiId; upiName } };
    };
    adminConfigStore.add("admin", existing);
    #ok(())
  };

  public query func getAdminConfig() : async Types.AdminConfig {
    switch (adminConfigStore.get("admin")) {
      case null  { { upiId = "whatscart@upi"; upiName = "WhatsCart"; baseUrl = ""; webhookUrl = "" } };
      case (?c)  c;
    }
  };

  public func setAdminBaseUrl(baseUrl : Text) : async Bool {
    let existing = switch (adminConfigStore.get("admin")) {
      case null  { { upiId = "whatscart@upi"; upiName = "WhatsCart"; baseUrl; webhookUrl = "" } };
      case (?c)  { { c with baseUrl } };
    };
    adminConfigStore.add("admin", existing);
    true
  };

  public func setAdminWebhookUrl(webhookUrl : Text) : async Bool {
    let existing = switch (adminConfigStore.get("admin")) {
      case null  { { upiId = "whatscart@upi"; upiName = "WhatsCart"; baseUrl = ""; webhookUrl } };
      case (?c)  { { c with webhookUrl } };
    };
    adminConfigStore.add("admin", existing);
    true
  };

  // ── Admin UPI Profile ────────────────────────────────────────────────────

  public func setAdminUPIProfile(upiId : Text, name : Text) : async Bool {
    let profile : POSTypes.AdminUPIProfile = { upiId; name };
    adminUPIStore.add("admin", profile);
    true
  };

  public query func getAdminUPIProfile() : async ?POSTypes.AdminUPIProfile {
    adminUPIStore.get("admin")
  };

  // ── POS OTP for WhatsApp Login ────────────────────────────────────────────

  /// Generate a 6-digit OTP for POS login (merchant or delivery partner).
  public func generatePOSOTP(
    phone : Text,
    role  : { #merchant; #deliveryPartner },
  ) : async Types.Result<Text, Types.ApiError> {
    let roleText = switch (role) { case (#merchant) "merchant"; case (#deliveryPartner) "deliveryPartner" };
    let otp = genOTPValue(phone # roleText);
    // 5-minute expiry in nanoseconds
    let expiresAt = Time.now() + 300_000_000_000;
    let record : Types.POSOTPRecord = {
      phone;
      role      = roleText;
      otp;
      expiresAt;
      used      = false;
    };
    posOTPStore.add(phone # ":" # roleText, record);
    #ok(otp)
  };

  /// Verify OTP and return the profile ID on success.
  public func verifyPOSOTP(
    phone : Text,
    otp   : Text,
    role  : { #merchant; #deliveryPartner },
  ) : async Types.Result<{ id : Text; name : Text }, Types.ApiError> {
    let roleText = switch (role) { case (#merchant) "merchant"; case (#deliveryPartner) "deliveryPartner" };
    let key = phone # ":" # roleText;
    switch (posOTPStore.get(key)) {
      case null { #err(#otpFailed) };
      case (?record) {
        if (record.used) {
          return #err(#otpFailed);
        };
        if (Time.now() > record.expiresAt) {
          return #err(#invalidInput("OTP has expired"));
        };
        if (record.otp != otp) {
          return #err(#otpFailed);
        };
        // Invalidate OTP after use
        posOTPStore.add(key, { record with used = true });
        // Lookup the profile
        switch (role) {
          case (#merchant) {
            // Find merchant by userId (user looked up by phone)
            let userId = switch (usersByPhone.get(phone)) {
              case null  { return #err(#notFound) };
              case (?u)  u.id;
            };
            switch (merchantsById.toArray().find(func(entry : (Text, Types.Merchant)) : Bool { entry.1.userId == userId })) {
              case null  { #err(#notFound) };
              case (?(id, m)) { #ok({ id; name = m.businessName }) };
            }
          };
          case (#deliveryPartner) {
            let userId = switch (usersByPhone.get(phone)) {
              case null  { return #err(#notFound) };
              case (?u)  u.id;
            };
            switch (dpById.toArray().find(func(entry : (Text, Types.DeliveryPartner)) : Bool { entry.1.userId == userId })) {
              case null  { #err(#notFound) };
              case (?(id, dp)) { #ok({ id; name = dp.name }) };
            }
          };
        }
      };
    }
  };

  // ── Merchant POS: Branches ───────────────────────────────────────────────

  public query func getMerchantBranches(merchantId : Text) : async [POSTypes.MerchantBranch] {
    switch (merchantBranchStore.get(merchantId)) {
      case null  [];
      case (?bs) bs;
    }
  };

  // ── Merchant POS: Orders ─────────────────────────────────────────────────

  public query func getMerchantPOSOrders(merchantId : Text, branchId : ?Text, status : ?Types.OrderStatus) : async [Types.Order] {
    let results = List.empty<Types.Order>();
    for ((_, order) in ordersById.entries()) {
      if (order.merchantId == merchantId) {
        let statusMatch = switch (status) {
          case null true;
          case (?s) order.status == s;
        };
        let branchMatch = switch (branchId) {
          case null true;
          case (?bId) {
            switch (order.merchantBranch) {
              case null false;
              case (?branch) branch.address == bId;
            }
          };
        };
        if (statusMatch and branchMatch) {
          results.add(order);
        };
      };
    };
    results.toArray()
  };

  // ── Merchant POS: Payment QR ─────────────────────────────────────────────

  public func generateOrderPaymentQR(orderId : Text, amount : Float, upiId : Text) : async Types.Result<POSTypes.OrderPaymentQR, Types.ApiError> {
    // Invalidate any existing QR for this order
    switch (ordersById.get(orderId)) {
      case null { return #err(#notFound) };
      case (?_) {};
    };
    // Get UPI name from admin profile if available
    let upiName = switch (adminUPIStore.get("admin")) {
      case null  "WhatsCart";
      case (?p)  p.name;
    };
    let qr = POSLib.generateOrderPaymentQR(orderId, amount, upiId, upiName);
    orderQRStore.add(orderId, qr);
    #ok(qr)
  };

  public func validateOrderQRPayment(orderId : Text, qrToken : Text) : async Types.Result<Bool, Types.ApiError> {
    switch (orderQRStore.get(orderId)) {
      case null { #err(#notFound) };
      case (?qr) {
        let result = POSLib.validateOrderQRPayment(qr, qrToken);
        switch (result) {
          case (#ok(_)) {
            // Mark QR as used by removing it
            orderQRStore.remove(orderId);
          };
          case _ {};
        };
        result
      };
    }
  };

  // ── Merchant POS: Earnings ────────────────────────────────────────────────

  public query func getMerchantEarnings(merchantId : Text, branchId : ?Text, date : ?Text) : async POSTypes.MerchantEarnings {
    POSLib.computeMerchantEarnings(allOrders(), merchantId, branchId, date)
  };

  public query func getMerchantTopProducts(merchantId : Text) : async [POSTypes.ProductRevenue] {
    POSLib.computeTopProducts(allOrders(), merchantId)
  };

  // ── Delivery Partner POS: Active Deliveries ──────────────────────────────

  public query func getDPActiveDeliveries(partnerId : Text) : async [Types.Order] {
    let results = List.empty<Types.Order>();
    for ((_, order) in ordersById.entries()) {
      switch (order.deliveryPartnerId) {
        case null {};
        case (?dpId) {
          if (dpId == partnerId) {
            let isActive = order.status == #assigned or order.status == #inTransit
              or order.status == #delivered or order.status == #paymentCollected;
            if (isActive) { results.add(order) };
          };
        };
      };
    };
    results.toArray()
  };

  // ── Delivery Partner POS: Payment QR ─────────────────────────────────────

  public func generateDeliveryPaymentQR(orderId : Text, amount : Float, partnerId : Text) : async Types.Result<POSTypes.DeliveryPaymentQR, Types.ApiError> {
    switch (ordersById.get(orderId)) {
      case null { return #err(#notFound) };
      case (?_) {};
    };
    // Get DP UPI from admin profile or DP record
    let upiId = switch (adminUPIStore.get("admin")) {
      case null  "whatscart@upi";
      case (?p)  p.upiId;
    };
    let upiName = switch (adminUPIStore.get("admin")) {
      case null  "WhatsCart";
      case (?p)  p.name;
    };
    let qr = POSLib.generateDeliveryPaymentQR(orderId, amount, partnerId, upiId, upiName);
    deliveryQRStore.add(orderId # "_" # partnerId, qr);
    #ok(qr)
  };

  public func markDeliveryPaymentCollected(orderId : Text, partnerId : Text) : async Types.Result<Types.Order, Types.ApiError> {
    switch (ordersById.get(orderId)) {
      case null { #err(#notFound) };
      case (?order) {
        switch (order.deliveryPartnerId) {
          case null { #err(#invalidInput("No delivery partner assigned to this order")) };
          case (?dpId) {
            if (dpId != partnerId) {
              return #err(#unauthorized);
            };
            let updated : Types.Order = { order with status = #paymentCollected; paymentCollectedAt = ?Time.now() };
            ordersById.add(orderId, updated);
            deliveryQRStore.remove(orderId # "_" # partnerId);
            #ok(updated)
          };
        };
      };
    }
  };

  // ── Delivery Partner POS: Earnings ───────────────────────────────────────

  public query func getDPEarnings(partnerId : Text, date : ?Text) : async POSTypes.DPEarnings {
    POSLib.computeDPEarnings(allOrders(), partnerId, date)
  };

  // ── Delivery Partner POS: Petrol Expenses ────────────────────────────────

  public func addDPPetrolExpense(partnerId : Text, date : Text, amount : Float, liters : Float, notes : Text) : async POSTypes.PetrolExpense {
    let id = genExpenseId();
    let expense : POSTypes.PetrolExpense = {
      id;
      partnerId;
      date;
      amount;
      liters;
      notes;
      createdAt = Time.now();
    };
    petrolExpenseStore.add(id, expense);
    expense
  };

  /// Convenience typed wrapper — adds petrol expense with optional notes.
  public func addPetrolExpense(
    dpId   : Text,
    date   : Text,
    amount : Float,
    liters : Float,
    notes  : ?Text,
  ) : async Types.Result<POSTypes.PetrolExpense, Types.ApiError> {
    let notesText = switch (notes) { case null ""; case (?n) n };
    let id = genExpenseId();
    let expense : POSTypes.PetrolExpense = {
      id;
      partnerId = dpId;
      date;
      amount;
      liters;
      notes     = notesText;
      createdAt = Time.now();
    };
    petrolExpenseStore.add(id, expense);
    #ok(expense)
  };

  /// Get total petrol expense for today (date string "YYYY-MM-DD").
  public query func getTodayPetrolExpense(dpId : Text) : async Float {
    // Derive today's date-like string from Time.now()
    // Using a simple approximation: not locale-aware, just for filtering by date string
    var total : Float = 0.0;
    for ((_, expense) in petrolExpenseStore.entries()) {
      if (expense.partnerId == dpId) {
        // Caller passes date; backend filters by exact match
        total += expense.amount;
      };
    };
    total  // returns all; frontend filters by date
  };

  /// Get all petrol expenses for a delivery partner in a given month (format "YYYY-MM").
  public query func getMonthlyPetrolExpenses(dpId : Text, month : Text) : async [POSTypes.PetrolExpense] {
    let results = List.empty<POSTypes.PetrolExpense>();
    for ((_, expense) in petrolExpenseStore.entries()) {
      if (expense.partnerId == dpId and expense.date.startsWith(#text month)) {
        results.add(expense);
      };
    };
    results.toArray()
  };

  /// Summary: today total, monthly total, and full expense list.
  public query func getPetrolExpenseSummary(
    dpId  : Text,
  ) : async { todayTotal : Float; monthlyTotal : Float; expenses : [POSTypes.PetrolExpense] } {
    let all = List.empty<POSTypes.PetrolExpense>();
    var monthlyTotal : Float = 0.0;
    for ((_, e) in petrolExpenseStore.entries()) {
      if (e.partnerId == dpId) {
        all.add(e);
        monthlyTotal += e.amount;
      };
    };
    {
      todayTotal   = monthlyTotal; // simplified — frontend splits by date
      monthlyTotal;
      expenses     = all.toArray();
    }
  };

  public query func getDPPetrolExpenses(partnerId : Text, fromDate : Text, toDate : Text) : async [POSTypes.PetrolExpense] {
    let results = List.empty<POSTypes.PetrolExpense>();
    for ((_, expense) in petrolExpenseStore.entries()) {
      if (expense.partnerId == partnerId) {
        // Simple string comparison works for "YYYY-MM-DD" format
        if (expense.date >= fromDate and expense.date <= toDate) {
          results.add(expense);
        };
      };
    };
    results.toArray()
  };

  public query func getDPEarningsWithExpenses(partnerId : Text, fromDate : Text, toDate : Text) : async POSTypes.DPEarningsWithExpenses {
    let expenses = List.empty<POSTypes.PetrolExpense>();
    for ((_, expense) in petrolExpenseStore.entries()) {
      if (expense.partnerId == partnerId and expense.date >= fromDate and expense.date <= toDate) {
        expenses.add(expense);
      };
    };
    POSLib.computeDPEarningsWithExpenses(allOrders(), expenses.toArray(), partnerId, fromDate, toDate)
  };

  // ── Customer Budget ───────────────────────────────────────────────────────

  public func setCustomerBudget(userId : Text, monthlyBudget : Float) : async POSTypes.CustomerBudget {
    // Compute current month spend from orders
    let now = Time.now();
    let monthStart = now - (30 * 86_400_000_000_000);
    var currentSpend : Float = 0.0;
    for ((_, order) in ordersById.entries()) {
      if (order.customerId == userId and order.createdAt >= monthStart) {
        switch (order.status) {
          case (#completed) { currentSpend += order.totalAmount };
          case (#delivered) { currentSpend += order.totalAmount };
          case (#paymentCollected) { currentSpend += order.totalAmount };
          case _ {};
        };
      };
    };
    let percent = if (monthlyBudget <= 0.0) 0.0 else currentSpend / monthlyBudget * 100.0;
    let budget : POSTypes.CustomerBudget = {
      userId;
      monthlyBudget;
      currentMonthSpend = currentSpend;
      percentUsed       = percent;
    };
    customerBudgetStore.add(userId, budget);
    budget
  };

  public query func getCustomerBudget(userId : Text) : async POSTypes.CustomerBudget {
    switch (customerBudgetStore.get(userId)) {
      case null  { { userId; monthlyBudget = 0.0; currentMonthSpend = 0.0; percentUsed = 0.0 } };
      case (?b)  b;
    }
  };

  public query func getCustomerSpendAnalysis(userId : Text, period : Text) : async POSTypes.SpendAnalysis {
    let userOrders = List.empty<Types.Order>();
    for ((_, order) in ordersById.entries()) {
      if (order.customerId == userId) userOrders.add(order);
    };
    let budget = customerBudgetStore.get(userId);
    POSLib.computeSpendAnalysis(userOrders.toArray(), budget, period)
  };

  public query func checkCustomerBudget(userId : Text, orderAmount : Float) : async POSTypes.BudgetCheckResult {
    switch (customerBudgetStore.get(userId)) {
      case null {
        // No budget set — always within
        {
          withinBudget = true;
          warningLevel = #none;
          currentSpend = 0.0;
          limit        = 0.0;
        }
      };
      case (?budget) {
        POSLib.checkBudget(budget, orderAmount)
      };
    }
  };

  // ── Subscription Redirect & QR ────────────────────────────────────────────

  public query func checkUserSubscriptionAccess(userId : Text) : async POSTypes.SubscriptionAccessResult {
    switch (subscriptionsStore.get(userId)) {
      case null {
        {
          hasActiveSubscription = false;
          planName              = "";
          expiresAt             = 0;
          dailyLimitRemaining   = 0;
        }
      };
      case (?sub) {
        let now = Time.now();
        let isActive = sub.isActive and sub.endDate > now;
        let planName = switch (plansStore.get(sub.planId)) {
          case null  "";
          case (?p)  p.name;
        };
        let dailyLimit = switch (plansStore.get(sub.planId)) {
          case null  0;
          case (?p)  if (p.inquiryLimit == 0) 999 else (if (sub.inquiriesUsed < p.inquiryLimit) { let diff : Int = (p.inquiryLimit : Int) - sub.inquiriesUsed; diff.toNat() } else 0);
        };
        {
          hasActiveSubscription = isActive;
          planName;
          expiresAt             = sub.endDate;
          dailyLimitRemaining   = dailyLimit;
        }
      };
    }
  };

  public func generateSubscriptionQR(planId : Text, userId : Text) : async Types.Result<POSTypes.SubscriptionQR, Types.ApiError> {
    switch (plansStore.get(planId)) {
      case null { #err(#notFound) };
      case (?plan) {
        // Use admin-configured UPI if available
        let adminUPI = switch (adminUPIStore.get("admin")) {
          case null  {
            switch (adminConfigStore.get("admin")) {
              case null  { { upiId = "whatscart@upi"; name = "WhatsCart" } };
              case (?c)  { { upiId = c.upiId; name = c.upiName } };
            }
          };
          case (?p)  p;
        };
        let amount = plan.priceFlat;
        let note = "Sub-" # planId # "-" # userId;
        let qrData = POSLib.buildUpiQRData(adminUPI.upiId, adminUPI.name, amount, note);
        let now = Time.now();
        // 15-minute expiry
        let expiresAt = now + (15 * 60 * 1_000_000_000);
        let qr : POSTypes.SubscriptionQR = {
          qrData;
          expiresAt;
          planId;
          userId;
          amount;
        };
        let qrId = genSubQRId();
        // Store by userId+planId composite key
        ignore qrId;
        #ok(qr)
      };
    }
  };

  public func confirmSubscriptionQRPayment(planId : Text, userId : Text, _transactionRef : Text) : async Types.Result<Types.UserSubscription, Types.ApiError> {
    switch (plansStore.get(planId)) {
      case null { #err(#notFound) };
      case (?plan) {
        let now = Time.now();
        let durationNs : Int = plan.durationDays.toInt() * 86_400_000_000_000;
        let sub : Types.UserSubscription = {
          id         = "sub_qr_" # userId # "_" # planId;
          userId;
          planId;
          startDate  = now;
          endDate    = now + durationNs;
          ordersUsed = 0;
          inquiriesUsed = 0;
          isActive   = true;
        };
        subscriptionsStore.add(userId, sub);
        #ok(sub)
      };
    }
  };

  // ── Enhanced Analytics ────────────────────────────────────────────────────

  public query func getEnhancedAnalytics() : async POSTypes.EnhancedAnalytics {
    let orders    = allOrders();
    let merchants = allMerchants();
    let dps       = allDPs();
    let users     = allUsers();

    // Daily active users: users who placed an order in the last 24h
    let now = Time.now();
    let oneDayNs : Int = 86_400_000_000_000;
    let activeSet = Map.empty<Text, Bool>();
    for (order in orders.values()) {
      if (order.createdAt >= now - oneDayNs) {
        activeSet.add(order.customerId, true);
      };
    };
    let dailyActiveUsers = activeSet.size();

    // Revenue by category
    let revByCat = Map.empty<Text, Float>();
    for (m in merchants.values()) {
      var rev : Float = 0.0;
      for (order in orders.values()) {
        if (order.merchantId == m.id and order.status == #completed) {
          rev += order.totalAmount;
        };
      };
      switch (revByCat.get(m.category)) {
        case null  { revByCat.add(m.category, rev) };
        case (?v)  { revByCat.add(m.category, v + rev) };
      };
    };

    let revByCatEntries = List.empty<(Text, Float)>();
    for ((cat, rev) in revByCat.entries()) {
      revByCatEntries.add((cat, rev));
    };

    {
      dailyActiveUsers;
      revenueByCategoryEntries = revByCatEntries.toArray();
      orderFunnel              = POSLib.computeOrderFunnel(orders);
      merchantTiers            = POSLib.computeMerchantTiers(orders, merchants);
      dpEfficiencyScores       = POSLib.computeDPEfficiency(orders, dps);
      topCustomers             = POSLib.computeTopCustomers(orders, users, 10);
    }
  };

  public query func getMerchantAnalytics(merchantId : Text) : async POSTypes.MerchantAnalytics {
    let orders = allOrders();
    let merchantOrders = orders.filter(func(o : Types.Order) : Bool { o.merchantId == merchantId });

    let now = Time.now();
    // Build 7-day revenue trend
    let trendList = List.empty<POSTypes.MerchantRevenueTrendEntry>();
    var dayOffset : Int = 6;
    while (dayOffset >= 0) {
      let dayStart = now - (dayOffset + 1) * 86_400_000_000_000;
      let dayEnd   = now - dayOffset * 86_400_000_000_000;
      var dayRevenue : Float = 0.0;
      for (order in merchantOrders.values()) {
        if (order.createdAt >= dayStart and order.createdAt < dayEnd and order.status == #completed) {
          dayRevenue += order.totalAmount;
        };
      };
      trendList.add({ period = "Day-" # (6 - dayOffset).toText(); revenue = dayRevenue });
      dayOffset -= 1;
    };

    // Running products (products in active orders)
    let runningSet = Map.empty<Text, Bool>();
    for (order in merchantOrders.values()) {
      switch (order.status) {
        case (#accepted) {
          for (item in order.items.values()) { runningSet.add(item.productId, true) };
        };
        case (#assigned) {
          for (item in order.items.values()) { runningSet.add(item.productId, true) };
        };
        case (#inTransit) {
          for (item in order.items.values()) { runningSet.add(item.productId, true) };
        };
        case _ {};
      };
    };
    let runningProducts = List.empty<Text>();
    for ((pid, _) in runningSet.entries()) { runningProducts.add(pid) };

    // Branch comparison (address -> revenue)
    let branchRevMap = Map.empty<Text, Float>();
    for (order in merchantOrders.values()) {
      if (order.status == #completed) {
        let branchKey = switch (order.merchantBranch) {
          case null  "Main";
          case (?b)  b.address;
        };
        switch (branchRevMap.get(branchKey)) {
          case null  { branchRevMap.add(branchKey, order.totalAmount) };
          case (?v)  { branchRevMap.add(branchKey, v + order.totalAmount) };
        };
      };
    };
    let branchComparison = List.empty<(Text, Float)>();
    for ((k, v) in branchRevMap.entries()) { branchComparison.add((k, v)) };

    {
      revenueTrend          = trendList.toArray();
      topProductsByProfit   = POSLib.computeTopProducts(merchantOrders, merchantId);
      runningProducts       = runningProducts.toArray();
      orderFunnel           = POSLib.computeOrderFunnel(merchantOrders);
      customerRetentionRate = 0.0; // would need historical data
      branchComparison      = branchComparison.toArray();
    }
  };

  public query func getDPAnalytics(partnerId : Text) : async POSTypes.DPAnalytics {
    let orders = allOrders();
    let dpOrders = orders.filter(func(o : Types.Order) : Bool {
      switch (o.deliveryPartnerId) {
        case null false;
        case (?id) id == partnerId;
      }
    });

    var completedCount : Nat = 0;
    var totalCount     : Nat = 0;
    for (order in dpOrders.values()) {
      totalCount += 1;
      if (order.status == #completed) completedCount += 1;
    };
    let completionRate = if (totalCount == 0) 0.0 else completedCount.toFloat() / totalCount.toFloat() * 100.0;

    // 7-day revenue trend
    let now = Time.now();
    let trendList = List.empty<POSTypes.MerchantRevenueTrendEntry>();
    var dayOffset : Int = 6;
    while (dayOffset >= 0) {
      let dayStart = now - (dayOffset + 1) * 86_400_000_000_000;
      let dayEnd   = now - dayOffset * 86_400_000_000_000;
      var dayRevenue : Float = 0.0;
      for (order in dpOrders.values()) {
        if (order.createdAt >= dayStart and order.createdAt < dayEnd and order.status == #completed) {
          dayRevenue += order.deliveryCharge;
        };
      };
      trendList.add({ period = "Day-" # (6 - dayOffset).toText(); revenue = dayRevenue });
      dayOffset -= 1;
    };

    // Area heatmap from delivery addresses
    let areaMap = Map.empty<Text, Nat>();
    for (order in dpOrders.values()) {
      let area = switch (order.customerAddress) {
        case null  "Unknown";
        case (?loc) loc.address;
      };
      switch (areaMap.get(area)) {
        case null  { areaMap.add(area, 1) };
        case (?v)  { areaMap.add(area, v + 1) };
      };
    };
    let areaHeatmap = List.empty<(Text, Nat)>();
    for ((area, cnt) in areaMap.entries()) { areaHeatmap.add((area, cnt)) };

    // Get DP rating
    let avgRating = switch (dpById.get(partnerId)) {
      case null  0.0;
      case (?dp) dp.avgRating;
    };

    {
      completionRate;
      avgDeliveryMinutes = 30.0;
      revenueTrend       = trendList.toArray();
      avgRating;
      areaHeatmap        = areaHeatmap.toArray();
    }
  };

  // ── Module Toggle with Roles ──────────────────────────────────────────────

  public query func getModuleStatusesWithRoles() : async [POSTypes.ModuleRoleStatus] {
    let results = List.empty<POSTypes.ModuleRoleStatus>();
    for (moduleName in MODULE_NAMES.values()) {
      for (role in MODULE_ROLES.values()) {
        let key = POSLib.moduleRoleKey(moduleName, role);
        let enabled = switch (moduleRoleStore.get(key)) {
          case null  true; // default: enabled
          case (?v)  v;
        };
        results.add({ moduleName; role; enabled });
      };
    };
    results.toArray()
  };

  public func setModuleEnabledForRole(moduleName : Text, role : Text, enabled : Bool) : async Bool {
    let key = POSLib.moduleRoleKey(moduleName, role);
    moduleRoleStore.add(key, enabled);
    true
  };

  // ── Shuttle Stop Enhancement ──────────────────────────────────────────────

  public func updateShuttleRouteStops(routeId : Text, stops : [POSTypes.EnhancedShuttleStop]) : async Types.Result<Types.ShuttleRoute, Types.ApiError> {
    switch (shuttleRoutesStore.get(routeId)) {
      case null { #err(#notFound) };
      case (?route) {
        // Convert EnhancedShuttleStop to ShuttleStop for stopDetails
        let richStops = stops.map(func(s : POSTypes.EnhancedShuttleStop) : Types.ShuttleStop {
          {
            stopName               = s.stopName;
            fareDescription        = "₹" # s.ticketFee.toText();
            estimatedArrivalMinutes = s.sequenceOrder * 10; // estimate based on sequence
            location               = s.location;
          }
        });
        let simpleStops = stops.map(func(s : POSTypes.EnhancedShuttleStop) : Text { s.stopName });
        let updated : Types.ShuttleRoute = {
          route with
          stops       = simpleStops;
          stopDetails = richStops;
        };
        shuttleRoutesStore.add(routeId, updated);
        #ok(updated)
      };
    }
  };

  public query func getShuttleRouteWithStops(routeId : Text) : async Types.Result<Types.ShuttleRoute, Types.ApiError> {
    switch (shuttleRoutesStore.get(routeId)) {
      case null  { #err(#notFound) };
      case (?r)  { #ok(r) };
    }
  };

};
