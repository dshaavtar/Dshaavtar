import ManufacturerTypes "../types/ManufacturerTypes";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Option "mo:core/Option";

module {

  public func ManufacturerEmployeeService(
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
  ) : MfgEmployeeServiceType {
    object {

      // ── ID generation ────────────────────────────────────────────────────

      func nextId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGEMP-" # debug_show(mfgEmpIdState.nextId)
      };

      func nextAttId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGATT-" # debug_show(mfgEmpIdState.nextId)
      };

      func nextLeaveId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGLV-" # debug_show(mfgEmpIdState.nextId)
      };

      func nextInvId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGINV-" # debug_show(mfgEmpIdState.nextId)
      };

      func nextTxnId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGTXN-" # debug_show(mfgEmpIdState.nextId)
      };

      func nextSaleId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGSL-" # debug_show(mfgEmpIdState.nextId)
      };

      func nextPurchaseId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGPR-" # debug_show(mfgEmpIdState.nextId)
      };

      func nextAccId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGACC-" # debug_show(mfgEmpIdState.nextId)
      };

      func nextBillId() : Text {
        mfgEmpIdState.nextId += 1;
        "MFGBILL-" # debug_show(mfgEmpIdState.nextId)
      };

      func todayStr() : Text {
        let ns   = Time.now();
        let secs = ns / 1_000_000_000;
        let days = secs / 86400;
        let y    = 1970 + days / 365;
        y.toText() # "-01-01"
      };

      // ── Manufacturer Employees ───────────────────────────────────────────

      public func addManufacturerEmployee(
        manufacturerId : Text,
        name           : Text,
        phone          : Text,
        role           : ManufacturerTypes.ManufacturerEmployeeRole,
      ) : { #ok : ManufacturerTypes.ManufacturerEmployee; #err : Text } {
        if (name == "") return #err("Employee name cannot be empty");
        if (phone == "") return #err("Employee phone cannot be empty");
        let id = nextId();
        let emp : ManufacturerTypes.ManufacturerEmployee = {
          id;
          manufacturerId;
          name;
          phone;
          role;
          isActive  = true;
          createdAt = Time.now();
        };
        mfgEmployeesById.add(id, emp);
        #ok(emp)
      };

      public func getManufacturerEmployees(manufacturerId : Text) : [ManufacturerTypes.ManufacturerEmployee] {
        mfgEmployeesById.values().toArray().filter(
          func(e : ManufacturerTypes.ManufacturerEmployee) : Bool { e.manufacturerId == manufacturerId }
        )
      };

      public func updateManufacturerEmployee(
        id       : Text,
        newName  : ?Text,
        newRole  : ?ManufacturerTypes.ManufacturerEmployeeRole,
        isActive : ?Bool,
      ) : { #ok; #err : Text } {
        switch (mfgEmployeesById.get(id)) {
          case null { #err("Employee not found: " # id) };
          case (?emp) {
            let updated : ManufacturerTypes.ManufacturerEmployee = {
              emp with
              name     = switch (newName)  { case (?n) n;    case null emp.name     };
              role     = switch (newRole)  { case (?r) r;    case null emp.role     };
              isActive = switch (isActive) { case (?a) a;    case null emp.isActive };
            };
            mfgEmployeesById.add(id, updated);
            #ok
          };
        }
      };

      // ── Attendance ───────────────────────────────────────────────────────

      public func recordAttendance(
        employeeId : Text,
        checkIn    : Bool,
        notes      : Text,
      ) : { #ok; #err : Text } {
        if (checkIn) {
          let rid = nextAttId();
          let rec : ManufacturerTypes.EmployeeAttendanceRecord = {
            id           = rid;
            employeeId;
            checkInTime  = Time.now();
            checkOutTime = null;
            date         = todayStr();
            notes;
          };
          mfgAttendanceById.add(rid, rec);
          #ok
        } else {
          // Find open record for this employee
          let openRec = mfgAttendanceById.values().toArray().find(
            func(r : ManufacturerTypes.EmployeeAttendanceRecord) : Bool {
              r.employeeId == employeeId and r.checkOutTime == null
            }
          );
          switch (openRec) {
            case null { #err("No open check-in found for employee: " # employeeId) };
            case (?r) {
              let updated : ManufacturerTypes.EmployeeAttendanceRecord = {
                r with checkOutTime = ?Time.now()
              };
              mfgAttendanceById.add(r.id, updated);
              #ok
            };
          }
        }
      };

      public func getEmployeeAttendance(employeeId : Text, date : Text) : [ManufacturerTypes.EmployeeAttendanceRecord] {
        mfgAttendanceById.values().toArray().filter(
          func(r : ManufacturerTypes.EmployeeAttendanceRecord) : Bool {
            r.employeeId == employeeId and (date == "" or r.date == date)
          }
        )
      };

      // ── Leave Requests ───────────────────────────────────────────────────

      public func submitLeaveRequest(
        employeeId : Text,
        leaveType  : Text,
        fromDate   : Text,
        toDate     : Text,
        reason     : Text,
      ) : { #ok; #err : Text } {
        let lid = nextLeaveId();
        let req : ManufacturerTypes.EmployeeLeaveRequest = {
          id         = lid;
          employeeId;
          leaveType;
          fromDate;
          toDate;
          reason;
          status    = #pending;
          createdAt = Time.now();
        };
        mfgLeaveRequestsById.add(lid, req);
        #ok
      };

      public func approveLeaveRequest(requestId : Text, approve : Bool) : { #ok; #err : Text } {
        switch (mfgLeaveRequestsById.get(requestId)) {
          case null { #err("Leave request not found: " # requestId) };
          case (?req) {
            let newStatus : ManufacturerTypes.EmployeeLeaveStatus = if (approve) #approved else #rejected;
            mfgLeaveRequestsById.add(requestId, { req with status = newStatus });
            #ok
          };
        }
      };

      public func getLeaveRequests(manufacturerId : Text) : [ManufacturerTypes.EmployeeLeaveRequest] {
        // Collect employeeIds for this manufacturer
        let empIds : [Text] = mfgEmployeesById.values().toArray()
          .filter(func(e : ManufacturerTypes.ManufacturerEmployee) : Bool { e.manufacturerId == manufacturerId })
          .map<ManufacturerTypes.ManufacturerEmployee, Text>(func(e) { e.id });
        mfgLeaveRequestsById.values().toArray().filter(
          func(r : ManufacturerTypes.EmployeeLeaveRequest) : Bool {
            empIds.find(func(eid : Text) : Bool { eid == r.employeeId }) != null
          }
        )
      };

      // ── Inventory Items ──────────────────────────────────────────────────

      public func addInventoryItem(
        manufacturerId : Text,
        productId      : Text,
        productName    : Text,
        batchCode      : Text,
        currentStock   : Nat,
        reorderLevel   : Nat,
        unit           : Text,
        expiryDate     : ?Text,
      ) : { #ok : ManufacturerTypes.InventoryItem; #err : Text } {
        if (productName == "") return #err("Product name cannot be empty");
        if (unit == "") return #err("Unit cannot be empty");
        let iid = nextInvId();
        let item : ManufacturerTypes.InventoryItem = {
          id             = iid;
          manufacturerId;
          productId;
          productName;
          batchCode;
          currentStock;
          reorderLevel;
          unit;
          lastUpdated    = Time.now();
          expiryDate;
        };
        mfgInventoryItemsById.add(iid, item);
        #ok(item)
      };

      public func getInventoryItems(manufacturerId : Text) : [ManufacturerTypes.InventoryItem] {
        mfgInventoryItemsById.values().toArray().filter(
          func(item : ManufacturerTypes.InventoryItem) : Bool { item.manufacturerId == manufacturerId }
        )
      };

      public func updateInventoryStock(
        itemId          : Text,
        transactionType : ManufacturerTypes.InventoryTransactionType,
        quantity        : Int,
        referenceId     : ?Text,
        notes           : Text,
      ) : { #ok; #err : Text } {
        switch (mfgInventoryItemsById.get(itemId)) {
          case null { #err("Inventory item not found: " # itemId) };
          case (?item) {
            let absQty = Int.abs(quantity).toNat();
            let newStock : Nat = switch (transactionType) {
              case (#sale or #expiry_write_off) {
                if (absQty > item.currentStock) 0 else item.currentStock - absQty
              };
              case _ { item.currentStock + absQty };
            };
            let tid = nextTxnId();
            let txn : ManufacturerTypes.InventoryTransaction = {
              id              = tid;
              inventoryItemId = itemId;
              transactionType;
              quantity;
              referenceId;
              notes;
              createdAt       = Time.now();
            };
            mfgInventoryTxnsById.add(tid, txn);
            mfgInventoryItemsById.add(itemId, { item with currentStock = newStock; lastUpdated = Time.now() });
            #ok
          };
        }
      };

      public func getInventoryTransactions(itemId : Text) : [ManufacturerTypes.InventoryTransaction] {
        mfgInventoryTxnsById.values().toArray().filter(
          func(t : ManufacturerTypes.InventoryTransaction) : Bool { t.inventoryItemId == itemId }
        )
      };

      // ── Sale Records ─────────────────────────────────────────────────────

      public func addSaleRecord(
        manufacturerId : Text,
        buyerId        : Text,
        buyerType      : ManufacturerTypes.BuyerType,
        items          : [(Text, Text, Nat, Float)],
        totalAmount    : Float,
        invoiceNo      : Text,
      ) : { #ok : ManufacturerTypes.SaleRecord; #err : Text } {
        let sid = nextSaleId();
        let rec : ManufacturerTypes.SaleRecord = {
          id             = sid;
          manufacturerId;
          buyerId;
          buyerType;
          items;
          totalAmount;
          paymentStatus  = #pending;
          invoiceNo;
          createdAt      = Time.now();
        };
        mfgSaleRecordsById.add(sid, rec);
        #ok(rec)
      };

      public func getSaleRecords(manufacturerId : Text) : [ManufacturerTypes.SaleRecord] {
        mfgSaleRecordsById.values().toArray().filter(
          func(r : ManufacturerTypes.SaleRecord) : Bool { r.manufacturerId == manufacturerId }
        )
      };

      // ── Purchase Records ─────────────────────────────────────────────────

      public func addPurchaseRecord(
        manufacturerId : Text,
        supplierName   : Text,
        supplierId     : ?Text,
        items          : [(Text, Text, Nat, Float)],
        totalAmount    : Float,
        invoiceNo      : Text,
      ) : { #ok : ManufacturerTypes.PurchaseRecord; #err : Text } {
        let pid = nextPurchaseId();
        let rec : ManufacturerTypes.PurchaseRecord = {
          id             = pid;
          manufacturerId;
          supplierId;
          supplierName;
          items;
          totalAmount;
          paymentStatus  = #pending;
          invoiceNo;
          createdAt      = Time.now();
        };
        mfgPurchaseRecordsById.add(pid, rec);
        #ok(rec)
      };

      public func getPurchaseRecords(manufacturerId : Text) : [ManufacturerTypes.PurchaseRecord] {
        mfgPurchaseRecordsById.values().toArray().filter(
          func(r : ManufacturerTypes.PurchaseRecord) : Bool { r.manufacturerId == manufacturerId }
        )
      };

      // ── Account Entries ──────────────────────────────────────────────────

      public func addAccountEntry(
        manufacturerId : Text,
        entryType      : ManufacturerTypes.AccountEntryType,
        category       : Text,
        amount         : Float,
        description    : Text,
        referenceId    : ?Text,
        entryDate      : Text,
      ) : { #ok : ManufacturerTypes.AccountEntry; #err : Text } {
        let aid = nextAccId();
        let entry : ManufacturerTypes.AccountEntry = {
          id             = aid;
          manufacturerId;
          entryType;
          category;
          amount;
          description;
          referenceId;
          entryDate;
          createdAt      = Time.now();
        };
        mfgAccountEntriesById.add(aid, entry);
        #ok(entry)
      };

      public func getAccountEntries(manufacturerId : Text) : [ManufacturerTypes.AccountEntry] {
        mfgAccountEntriesById.values().toArray().filter(
          func(e : ManufacturerTypes.AccountEntry) : Bool { e.manufacturerId == manufacturerId }
        )
      };

      // ── Bill Records ─────────────────────────────────────────────────────

      public func addBillRecord(
        manufacturerId : Text,
        billType       : ManufacturerTypes.BillType,
        partyName      : Text,
        amount         : Float,
        dueDate        : ?Text,
        isPaid         : Bool,
        pendingPayment : Bool,
        pendingNote    : Text,
        notes          : Text,
      ) : { #ok : ManufacturerTypes.BillRecord; #err : Text } {
        let bid = nextBillId();
        let rec : ManufacturerTypes.BillRecord = {
          id             = bid;
          manufacturerId;
          billType;
          partyName;
          amount;
          dueDate;
          isPaid;
          pendingPayment = ?pendingPayment;
          pendingNote    = ?pendingNote;
          notes;
          createdAt      = Time.now();
        };
        mfgBillRecordsById.add(bid, rec);
        #ok(rec)
      };

      public func updateBillRecord(
        billId         : Text,
        pendingPayment : Bool,
        pendingNote    : Text,
      ) : { #ok : ManufacturerTypes.BillRecord; #err : Text } {
        switch (mfgBillRecordsById.get(billId)) {
          case null { #err("Bill not found: " # billId) };
          case (?rec) {
            let updated = { rec with pendingPayment = ?pendingPayment; pendingNote = ?pendingNote };
            mfgBillRecordsById.add(billId, updated);
            #ok(updated)
          };
        }
      };

      public func getPendingBills(manufacturerId : Text) : [ManufacturerTypes.BillRecord] {
        mfgBillRecordsById.values().toArray().filter(
          func(r : ManufacturerTypes.BillRecord) : Bool {
            r.manufacturerId == manufacturerId and r.pendingPayment.get(false)
          }
        )
      };

      public func getBillRecords(manufacturerId : Text) : [ManufacturerTypes.BillRecord] {
        mfgBillRecordsById.values().toArray().filter(
          func(r : ManufacturerTypes.BillRecord) : Bool { r.manufacturerId == manufacturerId }
        )
      };

      public func markBillPaid(billId : Text) : { #ok; #err : Text } {
        switch (mfgBillRecordsById.get(billId)) {
          case null { #err("Bill not found: " # billId) };
          case (?rec) {
            mfgBillRecordsById.add(billId, { rec with isPaid = true });
            #ok
          };
        }
      };

    }
  };

  public type MfgEmployeeServiceType = {
    addManufacturerEmployee     : (Text, Text, Text, ManufacturerTypes.ManufacturerEmployeeRole) -> { #ok : ManufacturerTypes.ManufacturerEmployee; #err : Text };
    getManufacturerEmployees    : (Text) -> [ManufacturerTypes.ManufacturerEmployee];
    updateManufacturerEmployee  : (Text, ?Text, ?ManufacturerTypes.ManufacturerEmployeeRole, ?Bool) -> { #ok; #err : Text };
    recordAttendance            : (Text, Bool, Text) -> { #ok; #err : Text };
    getEmployeeAttendance       : (Text, Text) -> [ManufacturerTypes.EmployeeAttendanceRecord];
    submitLeaveRequest          : (Text, Text, Text, Text, Text) -> { #ok; #err : Text };
    approveLeaveRequest         : (Text, Bool) -> { #ok; #err : Text };
    getLeaveRequests            : (Text) -> [ManufacturerTypes.EmployeeLeaveRequest];
    addInventoryItem            : (Text, Text, Text, Text, Nat, Nat, Text, ?Text) -> { #ok : ManufacturerTypes.InventoryItem; #err : Text };
    getInventoryItems           : (Text) -> [ManufacturerTypes.InventoryItem];
    updateInventoryStock        : (Text, ManufacturerTypes.InventoryTransactionType, Int, ?Text, Text) -> { #ok; #err : Text };
    getInventoryTransactions    : (Text) -> [ManufacturerTypes.InventoryTransaction];
    addSaleRecord               : (Text, Text, ManufacturerTypes.BuyerType, [(Text, Text, Nat, Float)], Float, Text) -> { #ok : ManufacturerTypes.SaleRecord; #err : Text };
    getSaleRecords              : (Text) -> [ManufacturerTypes.SaleRecord];
    addPurchaseRecord           : (Text, Text, ?Text, [(Text, Text, Nat, Float)], Float, Text) -> { #ok : ManufacturerTypes.PurchaseRecord; #err : Text };
    getPurchaseRecords          : (Text) -> [ManufacturerTypes.PurchaseRecord];
    addAccountEntry             : (Text, ManufacturerTypes.AccountEntryType, Text, Float, Text, ?Text, Text) -> { #ok : ManufacturerTypes.AccountEntry; #err : Text };
    getAccountEntries           : (Text) -> [ManufacturerTypes.AccountEntry];
    addBillRecord               : (Text, ManufacturerTypes.BillType, Text, Float, ?Text, Bool, Bool, Text, Text) -> { #ok : ManufacturerTypes.BillRecord; #err : Text }; // pendingPayment stored as ?Bool
    getBillRecords              : (Text) -> [ManufacturerTypes.BillRecord];
    markBillPaid                : (Text) -> { #ok; #err : Text };
    updateBillRecord            : (Text, Bool, Text) -> { #ok : ManufacturerTypes.BillRecord; #err : Text }; // pendingPayment stored as ?Bool
    getPendingBills             : (Text) -> [ManufacturerTypes.BillRecord];
  };

};
