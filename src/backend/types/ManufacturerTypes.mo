module {

  // ── Bulk Pricing ─────────────────────────────────────────────────────────

  public type BulkPricingTier = {
    minQty       : Nat;
    maxQty       : Nat;
    pricePerUnit : Float;
  };

  // ── Manufacturer ─────────────────────────────────────────────────────────

  public type Manufacturer = {
    id                 : Text;
    userId             : Text;
    businessName       : Text;
    customerCarePhone  : Text;
    customerCareEmail  : Text;
    productCategories  : [Text];
    registeredCity     : Text;
    createdAt          : Int;
    updatedAt          : Int;
  };

  // ── Distributor Network ───────────────────────────────────────────────────

  public type DistributorNetwork = {
    id                             : Text;
    manufacturerId                 : Text;
    distributorName                : Text;
    distributorPhone               : Text;
    distributorCode                : Text;  // auto-generated, no manual entry
    city                           : Text;
    pincode                        : Text;
    schemeApplicable               : Text;   // e.g. "Scheme A", "No Scheme"
    marginPercent                  : Float;
    marginEarned                   : Float;  // cumulative margin earned so far
    totalOrders                    : Nat;
    status                         : Text;   // "active" | "inactive"
    routeDescription               : Text;   // free-text zone description
    assignedDeliveryPartnerPhone   : ?Text;
    assignedDeliveryPartnerName    : ?Text;
    createdAt                      : Int;
  };

  // ── Manufacturer Product ──────────────────────────────────────────────────

  public type ManufacturerProduct = {
    id                  : Text;
    manufacturerId      : Text;
    productName         : Text;
    batchNumber         : Text;
    hsnCode             : ?Text;  // HSN classification code
    batchCode           : ?Text;  // Internal batch code
    b2bCode             : ?Text;  // Auto-generated code for B2B products
    originCity          : Text;
    manufactureDate     : Int;    // Unix timestamp (nanoseconds)
    expiryDate          : ?Text;  // Optional date string; null = no expiry
    priceToDistributor  : Float;
    priceToCustomer     : Float;
    bulkPricingTiers    : [BulkPricingTier];  // quantity-based tiers: 1-50, 51-100, 100+
    isReturnable        : Bool;   // returnable/exchange flag (B2B only)
    isDiscontinued      : Bool;   // manufacturer can discontinue product
    stockQty            : Nat;
    createdAt           : Int;
  };

  // ── Expiry Return ─────────────────────────────────────────────────────────

  public type ExpiryReturnStatus = { #pending; #approved; #rejected };

  public type ExpiryReturn = {
    id             : Text;
    productId      : Text;
    manufacturerId : Text;
    returnedBy     : Text;   // "distributor" | "customer"
    returnedById   : Text;   // distributorId or customerId
    quantity       : Nat;
    reason         : Text;
    status         : ExpiryReturnStatus;
    createdAt      : Int;
  };

  // ── Manufacturer Complaint ────────────────────────────────────────────────

  public type ComplaintStatus = { #open; #in_progress; #resolved };

  public type ManufacturerComplaint = {
    id             : Text;
    manufacturerId : Text;
    filedBy        : Text;   // "distributor" | "customer"
    filedById      : Text;
    subject        : Text;
    description    : Text;
    status         : ComplaintStatus;
    createdAt      : Int;
  };

  // ── Manufacturer Rating ───────────────────────────────────────────────────

  public type ManufacturerRating = {
    id             : Text;
    manufacturerId : Text;
    productId      : Text;
    ratedBy        : Text;   // customerId / phone
    rating         : Nat;    // 1-5
    review         : Text;
    createdAt      : Int;
  };

  // ── Reviews and Complaints (combined view) ───────────────────────────────

  public type ManufacturerReviewsAndComplaints = {
    complaints : [ManufacturerComplaint];
    ratings    : [ManufacturerRating];
  };

  // ── Dashboard Stats ───────────────────────────────────────────────────────

  public type ManufacturerDashboardStats = {
    totalDistributors    : Nat;
    activeDistributors   : Nat;
    totalProducts        : Nat;
    totalOrders          : Nat;
    pendingReturns       : Nat;
    openComplaints       : Nat;
    avgRating            : Float;
    totalMarginPaid      : Float;
  };

  // ── Manufacturer Employee ─────────────────────────────────────────────────

  public type ManufacturerEmployeeRole = {
    #sale;
    #purchase;
    #restock;
    #inventory;
    #expiry;
    #complaints;
    #accounts;
    #bills;
    #general;
  };

  public type ManufacturerEmployee = {
    id             : Text;
    manufacturerId : Text;
    name           : Text;
    phone          : Text;
    role           : ManufacturerEmployeeRole;
    isActive       : Bool;
    createdAt      : Int;
  };

  // ── Employee Attendance ───────────────────────────────────────────────────

  public type EmployeeAttendanceRecord = {
    id           : Text;
    employeeId   : Text;
    checkInTime  : Int;    // nanoseconds
    checkOutTime : ?Int;   // nanoseconds, null if not yet checked out
    date         : Text;   // ISO date string e.g. "2026-06-05"
    notes        : Text;
  };

  // ── Employee Leave Request ────────────────────────────────────────────────

  public type EmployeeLeaveStatus = { #pending; #approved; #rejected };

  public type EmployeeLeaveRequest = {
    id         : Text;
    employeeId : Text;
    leaveType  : Text;              // e.g. "sick", "casual", "earned"
    fromDate   : Text;
    toDate     : Text;
    reason     : Text;
    status     : EmployeeLeaveStatus;
    createdAt  : Int;
  };

  // ── Inventory ─────────────────────────────────────────────────────────────

  public type InventoryItem = {
    id            : Text;
    manufacturerId : Text;
    productId     : Text;
    productName   : Text;
    batchCode     : Text;
    currentStock  : Nat;
    reorderLevel  : Nat;
    unit          : Text;   // e.g. "kg", "pcs", "litre"
    lastUpdated   : Int;
    expiryDate    : ?Text;
  };

  public type InventoryTransactionType = {
    #sale;
    #purchase;
    #restock;
    #expiry_write_off;
    #return_item;
    #adjustment;
  };

  public type InventoryTransaction = {
    id              : Text;
    inventoryItemId : Text;
    transactionType : InventoryTransactionType;
    quantity        : Int;   // positive = in, negative = out
    referenceId     : ?Text;
    notes           : Text;
    createdAt       : Int;
  };

  // ── Sales ─────────────────────────────────────────────────────────────────

  public type BuyerType = { #distributor; #customer; #merchant };

  public type PaymentStatusSale = { #pending; #paid; #partial };

  public type SaleRecord = {
    id            : Text;
    manufacturerId : Text;
    buyerId       : Text;
    buyerType     : BuyerType;
    items         : [(Text, Text, Nat, Float)];  // (productId, name, qty, unitPrice)
    totalAmount   : Float;
    paymentStatus : PaymentStatusSale;
    invoiceNo     : Text;
    createdAt     : Int;
  };

  // ── Purchases ─────────────────────────────────────────────────────────────

  public type PaymentStatusPurchase = { #pending; #paid };

  public type PurchaseRecord = {
    id            : Text;
    manufacturerId : Text;
    supplierId    : ?Text;
    supplierName  : Text;
    items         : [(Text, Text, Nat, Float)];  // (itemCode, name, qty, unitPrice)
    totalAmount   : Float;
    paymentStatus : PaymentStatusPurchase;
    invoiceNo     : Text;
    createdAt     : Int;
  };

  // ── Accounts ─────────────────────────────────────────────────────────────

  public type AccountEntryType = { #income; #expense; #receivable; #payable };

  public type AccountEntry = {
    id            : Text;
    manufacturerId : Text;
    entryType     : AccountEntryType;
    category      : Text;
    amount        : Float;
    description   : Text;
    referenceId   : ?Text;
    entryDate     : Text;
    createdAt     : Int;
  };

  // ── Bills ─────────────────────────────────────────────────────────────────

  public type BillType = {
    #purchase_bill;
    #sale_bill;
    #utility;
    #rent;
    #other;
  };

  public type BillRecord = {
    id             : Text;
    manufacturerId : Text;
    billType       : BillType;
    partyName      : Text;
    amount         : Float;
    dueDate        : ?Text;
    isPaid         : Bool;
    pendingPayment : ?Bool;
    pendingNote    : ?Text;
    notes          : Text;
    createdAt      : Int;
  };

};
