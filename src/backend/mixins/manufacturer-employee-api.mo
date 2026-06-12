import ManufacturerTypes "../types/ManufacturerTypes";
import MfgEmployeeLib "../lib/manufacturer-employee";
import Map "mo:core/Map";

mixin (
  mfgEmployeesById       : Map.Map<Text, ManufacturerTypes.ManufacturerEmployee>,
  mfgAttendanceById      : Map.Map<Text, ManufacturerTypes.EmployeeAttendanceRecord>,
  mfgLeaveRequestsById   : Map.Map<Text, ManufacturerTypes.EmployeeLeaveRequest>,
  mfgInventoryItemsById  : Map.Map<Text, ManufacturerTypes.InventoryItem>,
  mfgInventoryTxnsById   : Map.Map<Text, ManufacturerTypes.InventoryTransaction>,
  mfgSaleRecordsById     : Map.Map<Text, ManufacturerTypes.SaleRecord>,
  mfgPurchaseRecordsById : Map.Map<Text, ManufacturerTypes.PurchaseRecord>,
  mfgAccountEntriesById  : Map.Map<Text, ManufacturerTypes.AccountEntry>,
  mfgBillRecordsById     : Map.Map<Text, ManufacturerTypes.BillRecord>,
  mfgEmpIdState          : { var nextId : Nat },
) {

  transient let mfgEmpSvc = MfgEmployeeLib.ManufacturerEmployeeService(
    mfgEmployeesById,
    mfgAttendanceById,
    mfgLeaveRequestsById,
    mfgInventoryItemsById,
    mfgInventoryTxnsById,
    mfgSaleRecordsById,
    mfgPurchaseRecordsById,
    mfgAccountEntriesById,
    mfgBillRecordsById,
    mfgEmpIdState,
  );

  // ── Manufacturer Employees ────────────────────────────────────────────────

  public shared func addManufacturerEmployee(
    manufacturerId : Text,
    name           : Text,
    phone          : Text,
    role           : ManufacturerTypes.ManufacturerEmployeeRole,
  ) : async { #ok : ManufacturerTypes.ManufacturerEmployee; #err : Text } {
    mfgEmpSvc.addManufacturerEmployee(manufacturerId, name, phone, role)
  };

  public query func getManufacturerEmployees(manufacturerId : Text) : async [ManufacturerTypes.ManufacturerEmployee] {
    mfgEmpSvc.getManufacturerEmployees(manufacturerId)
  };

  public shared func updateManufacturerEmployee(
    id       : Text,
    newName  : ?Text,
    newRole  : ?ManufacturerTypes.ManufacturerEmployeeRole,
    isActive : ?Bool,
  ) : async { #ok; #err : Text } {
    mfgEmpSvc.updateManufacturerEmployee(id, newName, newRole, isActive)
  };

  // ── Attendance ────────────────────────────────────────────────────────────

  public shared func recordManufacturerEmployeeAttendance(
    employeeId : Text,
    checkIn    : Bool,
    notes      : Text,
  ) : async { #ok; #err : Text } {
    mfgEmpSvc.recordAttendance(employeeId, checkIn, notes)
  };

  public query func getManufacturerEmployeeAttendance(
    employeeId : Text,
    date       : Text,
  ) : async [ManufacturerTypes.EmployeeAttendanceRecord] {
    mfgEmpSvc.getEmployeeAttendance(employeeId, date)
  };

  // ── Leave Requests ─────────────────────────────────────────────────────────

  public shared func submitManufacturerLeave(
    employeeId : Text,
    leaveType  : Text,
    fromDate   : Text,
    toDate     : Text,
    reason     : Text,
  ) : async { #ok; #err : Text } {
    mfgEmpSvc.submitLeaveRequest(employeeId, leaveType, fromDate, toDate, reason)
  };

  public shared func approveManufacturerLeave(requestId : Text, approve : Bool) : async { #ok; #err : Text } {
    mfgEmpSvc.approveLeaveRequest(requestId, approve)
  };

  public query func getManufacturerLeaveRequests(manufacturerId : Text) : async [ManufacturerTypes.EmployeeLeaveRequest] {
    mfgEmpSvc.getLeaveRequests(manufacturerId)
  };

  // ── Inventory ────────────────────────────────────────────────────────────────

  public shared func addInventoryItem(
    manufacturerId : Text,
    productId      : Text,
    productName    : Text,
    batchCode      : Text,
    currentStock   : Nat,
    reorderLevel   : Nat,
    unit           : Text,
    expiryDate     : ?Text,
  ) : async { #ok : ManufacturerTypes.InventoryItem; #err : Text } {
    mfgEmpSvc.addInventoryItem(manufacturerId, productId, productName, batchCode, currentStock, reorderLevel, unit, expiryDate)
  };

  public query func getInventoryItems(manufacturerId : Text) : async [ManufacturerTypes.InventoryItem] {
    mfgEmpSvc.getInventoryItems(manufacturerId)
  };

  public shared func updateInventoryStock(
    itemId          : Text,
    transactionType : ManufacturerTypes.InventoryTransactionType,
    quantity        : Int,
    referenceId     : ?Text,
    notes           : Text,
  ) : async { #ok; #err : Text } {
    mfgEmpSvc.updateInventoryStock(itemId, transactionType, quantity, referenceId, notes)
  };

  public query func getInventoryTransactions(itemId : Text) : async [ManufacturerTypes.InventoryTransaction] {
    mfgEmpSvc.getInventoryTransactions(itemId)
  };

  // ── Sale Records ────────────────────────────────────────────────────────────

  public shared func addSaleRecord(
    manufacturerId : Text,
    buyerId        : Text,
    buyerType      : ManufacturerTypes.BuyerType,
    items          : [(Text, Text, Nat, Float)],
    totalAmount    : Float,
    invoiceNo      : Text,
  ) : async { #ok : ManufacturerTypes.SaleRecord; #err : Text } {
    mfgEmpSvc.addSaleRecord(manufacturerId, buyerId, buyerType, items, totalAmount, invoiceNo)
  };

  public query func getSaleRecords(manufacturerId : Text) : async [ManufacturerTypes.SaleRecord] {
    mfgEmpSvc.getSaleRecords(manufacturerId)
  };

  // ── Purchase Records ─────────────────────────────────────────────────────────

  public shared func addPurchaseRecord(
    manufacturerId : Text,
    supplierName   : Text,
    supplierId     : ?Text,
    items          : [(Text, Text, Nat, Float)],
    totalAmount    : Float,
    invoiceNo      : Text,
  ) : async { #ok : ManufacturerTypes.PurchaseRecord; #err : Text } {
    mfgEmpSvc.addPurchaseRecord(manufacturerId, supplierName, supplierId, items, totalAmount, invoiceNo)
  };

  public query func getPurchaseRecords(manufacturerId : Text) : async [ManufacturerTypes.PurchaseRecord] {
    mfgEmpSvc.getPurchaseRecords(manufacturerId)
  };

  // ── Account Entries ──────────────────────────────────────────────────────────

  public shared func addAccountEntry(
    manufacturerId : Text,
    entryType      : ManufacturerTypes.AccountEntryType,
    category       : Text,
    amount         : Float,
    description    : Text,
    referenceId    : ?Text,
    entryDate      : Text,
  ) : async { #ok : ManufacturerTypes.AccountEntry; #err : Text } {
    mfgEmpSvc.addAccountEntry(manufacturerId, entryType, category, amount, description, referenceId, entryDate)
  };

  public query func getAccountEntries(manufacturerId : Text) : async [ManufacturerTypes.AccountEntry] {
    mfgEmpSvc.getAccountEntries(manufacturerId)
  };

  // ── Bill Records ────────────────────────────────────────────────────────────

  public shared func addBillRecord(
    manufacturerId : Text,
    billType       : ManufacturerTypes.BillType,
    partyName      : Text,
    amount         : Float,
    dueDate        : ?Text,
    isPaid         : Bool,
    pendingPayment : Bool,
    pendingNote    : Text,
    notes          : Text,
  ) : async { #ok : ManufacturerTypes.BillRecord; #err : Text } {
    mfgEmpSvc.addBillRecord(manufacturerId, billType, partyName, amount, dueDate, isPaid, pendingPayment, pendingNote, notes)
  };

  public query func getBillRecords(manufacturerId : Text) : async [ManufacturerTypes.BillRecord] {
    mfgEmpSvc.getBillRecords(manufacturerId)
  };

  public shared func markBillPaid(billId : Text) : async { #ok; #err : Text } {
    mfgEmpSvc.markBillPaid(billId)
  };

  public shared func updateBillRecord(
    billId         : Text,
    pendingPayment : Bool,
    pendingNote    : Text,
  ) : async { #ok : ManufacturerTypes.BillRecord; #err : Text } {
    mfgEmpSvc.updateBillRecord(billId, pendingPayment, pendingNote)
  };

  public query func getPendingBills(manufacturerId : Text) : async [ManufacturerTypes.BillRecord] {
    mfgEmpSvc.getPendingBills(manufacturerId)
  };

};
