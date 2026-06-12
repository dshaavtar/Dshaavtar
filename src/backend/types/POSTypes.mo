module {

  // ── Merchant POS ──────────────────────────────────────────────────────────

  public type MerchantBranch = {
    branchId   : Text;
    name       : Text;
    address    : Text;
    upiId      : Text;
    isActive   : Bool;
  };

  public type OrderPaymentQR = {
    orderId   : Text;
    qrData    : Text;
    amount    : Float;
    expiresAt : Int;   // Unix ms
    token     : Text;
  };

  public type MerchantEarnings = {
    totalRevenue    : Float;
    orderCount      : Nat;
    avgOrderValue   : Float;
    pendingPayouts  : Float;
  };

  public type ProductRevenue = {
    productId    : Text;
    productName  : Text;
    orderCount   : Nat;
    totalRevenue : Float;
  };

  public type AdminUPIProfile = {
    upiId : Text;
    name  : Text;
  };

  // ── Delivery Partner POS ──────────────────────────────────────────────────

  public type DeliveryPaymentQR = {
    orderId   : Text;
    partnerId : Text;
    qrData    : Text;
    amount    : Float;
    expiresAt : Int;  // Unix ms
    token     : Text;
  };

  public type DPEarnings = {
    totalEarned    : Float;
    completedCount : Nat;
    pendingCount   : Nat;
    pendingPayouts : Float;
  };

  public type PetrolExpense = {
    id        : Text;
    partnerId : Text;
    date      : Text;  // "YYYY-MM-DD"
    amount    : Float;
    liters    : Float;
    notes     : Text;
    createdAt : Int;
  };

  public type DPEarningsWithExpenses = {
    totalEarned    : Float;
    totalExpenses  : Float;
    netProfit      : Float;
    expenseEntries : [PetrolExpense];
  };

  // ── Customer Budget ───────────────────────────────────────────────────────

  public type CustomerBudget = {
    userId          : Text;
    monthlyBudget   : Float;
    currentMonthSpend : Float;
    percentUsed     : Float;
  };

  public type BudgetWarningLevel = { #none; #approaching; #exceeded };

  public type BudgetCheckResult = {
    withinBudget  : Bool;
    warningLevel  : BudgetWarningLevel;
    currentSpend  : Float;
    limit         : Float;
  };

  public type SpendTrend = { #up; #down; #flat };

  public type CategorySpend = {
    category : Text;
    amount   : Float;
  };

  public type SpendAnalysis = {
    period          : Text;   // "daily" | "weekly" | "monthly"
    totalSpent      : Float;
    orderCount      : Nat;
    topCategories   : [CategorySpend];
    trend           : SpendTrend;
    remainingBudget : Float;
  };

  // ── Subscription Redirect ─────────────────────────────────────────────────

  public type SubscriptionAccessResult = {
    hasActiveSubscription : Bool;
    planName              : Text;
    expiresAt             : Int;
    dailyLimitRemaining   : Nat;
  };

  public type SubscriptionQR = {
    qrData    : Text;
    expiresAt : Int;  // Unix ms (15 min)
    planId    : Text;
    userId    : Text;
    amount    : Float;
  };

  // ── Enhanced Analytics ────────────────────────────────────────────────────

  public type OrderFunnel = {
    placed     : Nat;
    accepted   : Nat;
    delivered  : Nat;
    cancelled  : Nat;
    acceptRate : Float;
    deliveryRate : Float;
    cancelRate : Float;
  };

  public type MerchantPerformanceTier = { #platinum; #gold; #silver; #bronze };

  public type MerchantPerformance = {
    merchantId   : Text;
    businessName : Text;
    tier         : MerchantPerformanceTier;
    revenue      : Float;
    orderCount   : Nat;
    avgRating    : Float;
  };

  public type DPEfficiency = {
    partnerId           : Text;
    name                : Text;
    completionRate      : Float;
    avgDeliveryMinutes  : Float;
    ordersCompleted     : Nat;
  };

  public type TopCustomer = {
    userId   : Text;
    name     : Text;
    phone    : Text;
    totalSpend : Float;
    orderCount : Nat;
  };

  public type EnhancedAnalytics = {
    dailyActiveUsers    : Nat;
    revenueByCategoryEntries : [(Text, Float)];
    orderFunnel         : OrderFunnel;
    merchantTiers       : [MerchantPerformance];
    dpEfficiencyScores  : [DPEfficiency];
    topCustomers        : [TopCustomer];
  };

  public type MerchantRevenueTrendEntry = {
    period  : Text;
    revenue : Float;
  };

  public type MerchantAnalytics = {
    revenueTrend        : [MerchantRevenueTrendEntry];
    topProductsByProfit : [ProductRevenue];
    runningProducts     : [Text];   // product IDs with active orders
    orderFunnel         : OrderFunnel;
    customerRetentionRate : Float;
    branchComparison    : [(Text, Float)];  // branchId -> revenue
  };

  public type DPAnalytics = {
    completionRate     : Float;
    avgDeliveryMinutes : Float;
    revenueTrend       : [MerchantRevenueTrendEntry];
    avgRating          : Float;
    areaHeatmap        : [(Text, Nat)];  // area -> delivery count
  };

  // ── Delivery Partner Shift ────────────────────────────────────────────────

  public type ShiftStatus = { #active; #completed };

  public type DeliveryPartnerShift = {
    id                 : Text;
    partnerId          : Text;
    checkInTime        : Int;
    checkOutTime       : ?Int;
    status             : ShiftStatus;
    ordersCompleted    : Nat;
    earningsDuringShift: Float;
  };

  // ── Module Toggle with Roles ──────────────────────────────────────────────

  public type RoleModuleKey = {
    moduleName : Text;
    role       : Text;   // "customer" | "merchant" | "delivery_partner"
  };

  public type ModuleRoleStatus = {
    moduleName : Text;
    role       : Text;
    enabled    : Bool;
  };

  // ── Shuttle Stop Enhancement ──────────────────────────────────────────────

  public type EnhancedShuttleStop = {
    stopName      : Text;
    location      : Text;
    ticketFee     : Nat;
    arrivalTime   : Text;  // "HH:MM"
    sequenceOrder : Nat;
  };

};
