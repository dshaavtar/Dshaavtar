import Types "../Types";
import POSTypes "../types/POSTypes";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Char "mo:core/Char";

module {

  // ── QR Token helpers ─────────────────────────────────────────────────────

  /// Build UPI QR data string from UPI id, name, amount and note.
  public func buildUpiQRData(upiId : Text, name : Text, amount : Float, note : Text) : Text {
    "upi://pay?pa=" # upiId # "&pn=" # name # "&am=" # amount.toText() # "&cu=INR&tn=" # note
  };

  /// Check whether a QR token is still within its expiry window (expiresAt is nanoseconds).
  public func isQRExpired(expiresAt : Int) : Bool {
    Time.now() > expiresAt
  };

  /// Generate a deterministic token from orderId + timestamp seed.
  public func generateQRToken(seed : Text, timestamp : Int) : Text {
    let combined = seed # "_" # timestamp.toText();
    // Simple hash-like token: fold chars into a number using Char.toNat32
    let hashVal = combined.foldLeft(0, func(acc : Int, c : Char) : Int {
      let charCode = Nat.fromNat32(c.toNat32());
      (acc * 31 + charCode.toInt()) % 1_000_000_007
    });
    Int.abs(hashVal).toText()
  };

  // ── Merchant POS ─────────────────────────────────────────────────────────

  public func generateOrderPaymentQR(
    orderId : Text,
    amount  : Float,
    upiId   : Text,
    upiName : Text,
  ) : POSTypes.OrderPaymentQR {
    let now = Time.now();
    // 2-minute expiry window in nanoseconds (2 * 60 * 1_000_000_000)
    let expiresAt = now + 120_000_000_000;
    let token = generateQRToken(orderId, now);
    let qrData = buildUpiQRData(upiId, upiName, amount, "Order-" # orderId);
    {
      orderId;
      qrData;
      amount;
      expiresAt;
      token;
    }
  };

  public func validateOrderQRPayment(
    qr      : POSTypes.OrderPaymentQR,
    qrToken : Text,
  ) : Types.Result<Bool, Types.ApiError> {
    if (isQRExpired(qr.expiresAt)) {
      return #err(#invalidInput("QR code has expired. Please generate a new one."));
    };
    if (qr.token != qrToken) {
      return #err(#invalidInput("Invalid QR token."));
    };
    #ok(true)
  };

  public func computeMerchantEarnings(
    orders      : [Types.Order],
    merchantId  : Text,
    branchId    : ?Text,
    _dateFilter : ?Text,
  ) : POSTypes.MerchantEarnings {
    var totalRevenue   : Float = 0.0;
    var orderCount     : Nat   = 0;
    var pendingPayouts : Float = 0.0;

    for (order in orders.values()) {
      if (order.merchantId == merchantId) {
        let shouldInclude = switch (branchId) {
          case null true;
          case (?_bId) {
            switch (order.merchantBranch) {
              case null false;
              case (?branch) branch.address == _bId;
            }
          };
        };
        if (shouldInclude) {
          switch (order.status) {
            case (#completed) {
              totalRevenue += order.totalAmount;
              orderCount += 1;
            };
            case (#delivered) {
              totalRevenue += order.totalAmount;
              orderCount   += 1;
              pendingPayouts += order.totalAmount;
            };
            case (#paymentCollected) {
              totalRevenue += order.totalAmount;
              orderCount   += 1;
              pendingPayouts += order.totalAmount;
            };
            case (#vendorSettled) {
              totalRevenue += order.totalAmount;
              orderCount   += 1;
              pendingPayouts += order.totalAmount;
            };
            case _ {};
          };
        };
      };
    };

    let avgOrderValue = if (orderCount == 0) 0.0 else totalRevenue / orderCount.toFloat();
    {
      totalRevenue;
      orderCount;
      avgOrderValue;
      pendingPayouts;
    }
  };

  public func computeTopProducts(
    orders     : [Types.Order],
    merchantId : Text,
  ) : [POSTypes.ProductRevenue] {
    // Aggregate per product
    let productMap = Map.empty<Text, (Text, Nat, Float)>(); // productId -> (name, count, revenue)
    for (order in orders.values()) {
      let isRelevant = order.merchantId == merchantId and (
        order.status == #completed or order.status == #delivered or order.status == #paymentCollected
      );
      if (isRelevant) {
        for (item in order.items.values()) {
          switch (productMap.get(item.productId)) {
            case null {
              productMap.add(item.productId, (item.productName, 1, item.totalRate));
            };
            case (?(name, cnt, rev)) {
              productMap.add(item.productId, (name, cnt + 1, rev + item.totalRate));
            };
          };
        };
      };
    };

    let results = List.empty<POSTypes.ProductRevenue>();
    for ((pid, (pname, cnt, rev)) in productMap.entries()) {
      results.add({
        productId    = pid;
        productName  = pname;
        orderCount   = cnt;
        totalRevenue = rev;
      });
    };
    // Sort by revenue descending
    let arr = results.toArray();
    arr.sort(func(a : POSTypes.ProductRevenue, b : POSTypes.ProductRevenue) : { #less; #equal; #greater } {
      if (a.totalRevenue > b.totalRevenue) #less
      else if (a.totalRevenue < b.totalRevenue) #greater
      else #equal
    })
  };

  // ── Delivery Partner POS ─────────────────────────────────────────────────

  public func generateDeliveryPaymentQR(
    orderId   : Text,
    amount    : Float,
    partnerId : Text,
    upiId     : Text,
    upiName   : Text,
  ) : POSTypes.DeliveryPaymentQR {
    let now = Time.now();
    let expiresAt = now + 120_000_000_000; // 2 minutes
    let token = generateQRToken(orderId # partnerId, now);
    let qrData = buildUpiQRData(upiId, upiName, amount, "Delivery-" # orderId);
    {
      orderId;
      partnerId;
      qrData;
      amount;
      expiresAt;
      token;
    }
  };

  public func computeDPEarnings(
    orders    : [Types.Order],
    partnerId : Text,
    _date     : ?Text,
  ) : POSTypes.DPEarnings {
    var totalEarned    : Float = 0.0;
    var completedCount : Nat   = 0;
    var pendingCount   : Nat   = 0;
    var pendingPayouts : Float = 0.0;

    for (order in orders.values()) {
      switch (order.deliveryPartnerId) {
        case null {};
        case (?dpId) {
          if (dpId == partnerId) {
            switch (order.status) {
              case (#completed) {
                totalEarned    += order.deliveryCharge;
                completedCount += 1;
              };
              case (#delivered) {
                totalEarned    += order.deliveryCharge;
                pendingCount   += 1;
                pendingPayouts += order.deliveryCharge;
              };
              case (#paymentCollected) {
                totalEarned    += order.deliveryCharge;
                pendingCount   += 1;
                pendingPayouts += order.deliveryCharge;
              };
              case (#vendorSettled) {
                totalEarned    += order.deliveryCharge;
                pendingCount   += 1;
                pendingPayouts += order.deliveryCharge;
              };
              case (#assigned) { pendingCount += 1 };
              case (#inTransit) { pendingCount += 1 };
              case _ {};
            };
          };
        };
      };
    };
    { totalEarned; completedCount; pendingCount; pendingPayouts }
  };

  public func computeDPEarningsWithExpenses(
    orders    : [Types.Order],
    expenses  : [POSTypes.PetrolExpense],
    partnerId : Text,
    _fromDate : Text,
    _toDate   : Text,
  ) : POSTypes.DPEarningsWithExpenses {
    let earnings = computeDPEarnings(orders, partnerId, null);
    let totalExpenses = expenses.foldLeft(0.0, func(acc : Float, e : POSTypes.PetrolExpense) : Float {
      acc + e.amount
    });
    {
      totalEarned    = earnings.totalEarned;
      totalExpenses;
      netProfit      = earnings.totalEarned - totalExpenses;
      expenseEntries = expenses;
    }
  };

  // ── Customer Budget ───────────────────────────────────────────────────────

  public func checkBudget(
    budget      : POSTypes.CustomerBudget,
    orderAmount : Float,
  ) : POSTypes.BudgetCheckResult {
    let newSpend = budget.currentMonthSpend + orderAmount;
    let limit    = budget.monthlyBudget;

    if (limit <= 0.0) {
      // No budget set — always within budget
      return {
        withinBudget = true;
        warningLevel = #none;
        currentSpend = budget.currentMonthSpend;
        limit;
      };
    };

    let percentAfter = newSpend / limit * 100.0;
    let withinBudget = newSpend <= limit;
    let warningLevel : POSTypes.BudgetWarningLevel = if (newSpend > limit) {
      #exceeded
    } else if (percentAfter >= 80.0) {
      #approaching
    } else {
      #none
    };

    {
      withinBudget;
      warningLevel;
      currentSpend = budget.currentMonthSpend;
      limit;
    }
  };

  public func computeSpendAnalysis(
    orders  : [Types.Order],
    budget  : ?POSTypes.CustomerBudget,
    period  : Text,
  ) : POSTypes.SpendAnalysis {
    let now = Time.now();
    // Period boundaries in nanoseconds
    let periodNs : Int = if (period == "daily") {
      86_400_000_000_000
    } else if (period == "weekly") {
      7 * 86_400_000_000_000
    } else {
      30 * 86_400_000_000_000 // monthly
    };
    let cutoff = now - periodNs;

    let catSpendMap = Map.empty<Text, Float>();
    var totalSpent  : Float = 0.0;
    var orderCount  : Nat   = 0;

    for (order in orders.values()) {
      if (order.createdAt >= cutoff and (order.status == #completed or order.status == #delivered or order.status == #paymentCollected)) {
        totalSpent += order.totalAmount;
        orderCount += 1;
        // Accumulate category spend from items
        for (item in order.items.values()) {
          let cat = item.productName; // use product name as category proxy
          switch (catSpendMap.get(cat)) {
            case null  { catSpendMap.add(cat, item.totalRate) };
            case (?v)  { catSpendMap.add(cat, v + item.totalRate) };
          };
        };
      };
    };

    let catList = List.empty<POSTypes.CategorySpend>();
    for ((cat, amt) in catSpendMap.entries()) {
      catList.add({ category = cat; amount = amt });
    };
    let topCats = catList.toArray()
      .sort(func(a : POSTypes.CategorySpend, b : POSTypes.CategorySpend) : { #less; #equal; #greater } {
        if (a.amount > b.amount) #less else if (a.amount < b.amount) #greater else #equal
      });
    let topCategories = if (topCats.size() > 5) topCats.sliceToArray(0, 5) else topCats;

    let trend : POSTypes.SpendTrend = if (orderCount == 0) #flat else if (totalSpent > 500.0) #up else #flat;

    let remainingBudget = switch (budget) {
      case null  0.0;
      case (?b)  if (b.monthlyBudget > 0.0) b.monthlyBudget - b.currentMonthSpend else 0.0;
    };

    { period; totalSpent; orderCount; topCategories; trend; remainingBudget }
  };

  // ── Enhanced Analytics ────────────────────────────────────────────────────

  public func computeOrderFunnel(orders : [Types.Order]) : POSTypes.OrderFunnel {
    var placed    : Nat = 0;
    var accepted  : Nat = 0;
    var delivered : Nat = 0;
    var cancelled : Nat = 0;

    for (order in orders.values()) {
      placed += 1;
      switch (order.status) {
        case (#accepted)         { accepted += 1 };
        case (#assigned)         { accepted += 1 };
        case (#inTransit)        { accepted += 1 };
        case (#delivered)        { accepted += 1; delivered += 1 };
        case (#paymentCollected) { accepted += 1; delivered += 1 };
        case (#vendorSettled)    { accepted += 1; delivered += 1 };
        case (#completed)        { accepted += 1; delivered += 1 };
        case (#cancelled)        { cancelled += 1 };
        case _                   {};
      };
    };

    let acceptRate   = if (placed == 0) 0.0 else accepted.toFloat() / placed.toFloat() * 100.0;
    let deliveryRate = if (placed == 0) 0.0 else delivered.toFloat() / placed.toFloat() * 100.0;
    let cancelRate   = if (placed == 0) 0.0 else cancelled.toFloat() / placed.toFloat() * 100.0;
    { placed; accepted; delivered; cancelled; acceptRate; deliveryRate; cancelRate }
  };

  public func computeMerchantTiers(
    orders    : [Types.Order],
    merchants : [Types.Merchant],
  ) : [POSTypes.MerchantPerformance] {
    let revenueMap = Map.empty<Text, Float>();
    let countMap   = Map.empty<Text, Nat>();

    for (order in orders.values()) {
      if (order.status == #completed) {
        switch (revenueMap.get(order.merchantId)) {
          case null  { revenueMap.add(order.merchantId, order.totalAmount) };
          case (?v)  { revenueMap.add(order.merchantId, v + order.totalAmount) };
        };
        switch (countMap.get(order.merchantId)) {
          case null  { countMap.add(order.merchantId, 1) };
          case (?c)  { countMap.add(order.merchantId, c + 1) };
        };
      };
    };

    let results = List.empty<POSTypes.MerchantPerformance>();
    for (m in merchants.values()) {
      let revenue = switch (revenueMap.get(m.id)) { case null 0.0; case (?v) v };
      let cnt     = switch (countMap.get(m.id))   { case null 0;   case (?v) v };
      let tier : POSTypes.MerchantPerformanceTier = if (revenue > 100_000.0) #platinum
        else if (revenue > 50_000.0) #gold
        else if (revenue > 10_000.0) #silver
        else #bronze;
      results.add({
        merchantId   = m.id;
        businessName = m.businessName;
        tier;
        revenue;
        orderCount   = cnt;
        avgRating    = m.avgRating;
      });
    };
    results.toArray()
  };

  public func computeDPEfficiency(
    orders   : [Types.Order],
    partners : [Types.DeliveryPartner],
  ) : [POSTypes.DPEfficiency] {
    let completedMap = Map.empty<Text, Nat>();
    let totalMap     = Map.empty<Text, Nat>();

    for (order in orders.values()) {
      switch (order.deliveryPartnerId) {
        case null {};
        case (?dpId) {
          switch (totalMap.get(dpId)) {
            case null  { totalMap.add(dpId, 1) };
            case (?v)  { totalMap.add(dpId, v + 1) };
          };
          if (order.status == #completed) {
            switch (completedMap.get(dpId)) {
              case null  { completedMap.add(dpId, 1) };
              case (?v)  { completedMap.add(dpId, v + 1) };
            };
          };
        };
      };
    };

    let results = List.empty<POSTypes.DPEfficiency>();
    for (dp in partners.values()) {
      let total     = switch (totalMap.get(dp.id))     { case null 0; case (?v) v };
      let completed = switch (completedMap.get(dp.id)) { case null 0; case (?v) v };
      let rate = if (total == 0) 0.0 else completed.toFloat() / total.toFloat() * 100.0;
      results.add({
        partnerId           = dp.id;
        name                = dp.name;
        completionRate      = rate;
        avgDeliveryMinutes  = 30.0; // placeholder — no delivery time tracking yet
        ordersCompleted     = completed;
      });
    };
    results.toArray()
  };

  public func computeTopCustomers(
    orders : [Types.Order],
    users  : [Types.User],
    limit  : Nat,
  ) : [POSTypes.TopCustomer] {
    let spendMap = Map.empty<Text, Float>();
    let countMap = Map.empty<Text, Nat>();

    for (order in orders.values()) {
      if (order.status == #completed) {
        switch (spendMap.get(order.customerId)) {
          case null  { spendMap.add(order.customerId, order.totalAmount) };
          case (?v)  { spendMap.add(order.customerId, v + order.totalAmount) };
        };
        switch (countMap.get(order.customerId)) {
          case null  { countMap.add(order.customerId, 1) };
          case (?c)  { countMap.add(order.customerId, c + 1) };
        };
      };
    };

    let results = List.empty<POSTypes.TopCustomer>();
    for (u in users.values()) {
      let spend = switch (spendMap.get(u.id)) { case null 0.0; case (?v) v };
      let cnt   = switch (countMap.get(u.id)) { case null 0;   case (?v) v };
      if (spend > 0.0) {
        results.add({
          userId     = u.id;
          name       = u.name;
          phone      = u.phone;
          totalSpend = spend;
          orderCount = cnt;
        });
      };
    };

    let sorted = results.toArray().sort(func(a : POSTypes.TopCustomer, b : POSTypes.TopCustomer) : { #less; #equal; #greater } {
      if (a.totalSpend > b.totalSpend) #less else if (a.totalSpend < b.totalSpend) #greater else #equal
    });

    if (sorted.size() > limit) sorted.sliceToArray(0, limit) else sorted
  };

  // ── Module-Role helpers ───────────────────────────────────────────────────

  /// Composite key for per-role module toggle.
  public func moduleRoleKey(moduleName : Text, role : Text) : Text {
    moduleName # ":" # role
  };

};
