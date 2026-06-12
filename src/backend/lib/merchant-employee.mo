import MerchantEmployeeTypes "../types/MerchantEmployeeTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import List "mo:core/List";

module {

  public class MerchantEmployeeLib(
    employeesStore      : Map.Map<Text, MerchantEmployeeTypes.MerchantEmployee>,
    attendanceStore     : Map.Map<Text, MerchantEmployeeTypes.EmployeeAttendance>,
    leaveRequestsStore  : Map.Map<Text, MerchantEmployeeTypes.LeaveRequest>,
    visitorCheckinsStore: Map.Map<Text, MerchantEmployeeTypes.VisitorCheckin>,
    empIdState          : { var nextId : Nat },
  ) {

    // ── Helpers ───────────────────────────────────────────────────────────

    func genId(prefix : Text) : Text {
      empIdState.nextId += 1;
      prefix # "-" # empIdState.nextId.toText() # "-" # Time.now().toText()
    };

    func parseRole(r : Text) : MerchantEmployeeTypes.EmployeeRole {
      switch (r) {
        case "store_manager"        #store_manager;
        case "delivery_coordinator" #delivery_coordinator;
        case _                      #cashier;
      }
    };

    func _parseLeaveStatus(s : Text) : MerchantEmployeeTypes.LeaveStatus {
      switch (s) {
        case "approved" #approved;
        case "rejected" #rejected;
        case _          #pending;
      }
    };

    func parseApprovalStatus(s : Text) : MerchantEmployeeTypes.VisitorApprovalStatus {
      switch (s) {
        case "approved" #approved;
        case "denied"   #denied;
        case _          #pending;
      }
    };

    func currentDate() : Text {
      ignore (empIdState);  // side-effect-free
      // ISO date derived from nanosecond timestamp
      let secs : Int = Time.now() / 1_000_000_000;
      let days : Int = secs / 86400;
      // simple epoch-based date: 1970-01-01 + days
      let year400 = days / 146097;
      var rem     = days - year400 * 146097;
      let year100 = rem / 36524;
      rem         := rem - year100 * 36524;
      let year4   = rem / 1461;
      rem         := rem - year4 * 1461;
      let year1   = rem / 365;
      rem         := rem - year1 * 365;
      let y : Int = year400 * 400 + year100 * 100 + year4 * 4 + year1 + 1970;
      let monthDays = [31, if ((y % 4 == 0 and y % 100 != 0) or y % 400 == 0) 29 else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var mo = 1;
      var d  = rem + 1;
      label ml for (md in monthDays.values()) {
        if (d <= md) { break ml };
        d  -= md;
        mo += 1;
      };
      let pad = func(n : Int) : Text {
        if (n < 10) "0" # n.toText() else n.toText()
      };
      y.toText() # "-" # pad(mo) # "-" # pad(d)
    };

    // ── Employee CRUD ─────────────────────────────────────────────────────

    public func addMerchantEmployee(
      merchantId : Text,
      name       : Text,
      phone      : Text,
      role       : Text,
    ) : MerchantEmployeeTypes.MerchantEmployee {
      let id = genId("emp");
      let emp : MerchantEmployeeTypes.MerchantEmployee = {
        id;
        merchantId;
        name;
        phone;
        role     = parseRole(role);
        isActive = true;
        createdAt = Time.now();
      };
      employeesStore.add(id, emp);
      emp
    };

    public func listMerchantEmployees(merchantId : Text) : [MerchantEmployeeTypes.MerchantEmployee] {
      let results = List.empty<MerchantEmployeeTypes.MerchantEmployee>();
      for ((_, emp) in employeesStore.entries()) {
        if (emp.merchantId == merchantId) { results.add(emp) };
      };
      results.toArray()
    };

    public func updateMerchantEmployee(
      id    : Text,
      name  : Text,
      phone : Text,
      role  : Text,
    ) : { #ok : MerchantEmployeeTypes.MerchantEmployee; #err : Text } {
      switch (employeesStore.get(id)) {
        case null { #err("Employee not found") };
        case (?emp) {
          let updated = { emp with name; phone; role = parseRole(role) };
          employeesStore.add(id, updated);
          #ok(updated)
        };
      }
    };

    public func setMerchantEmployeeActive(id : Text, isActive : Bool) : Bool {
      switch (employeesStore.get(id)) {
        case null { false };
        case (?emp) {
          employeesStore.add(id, { emp with isActive });
          true
        };
      }
    };

    // ── Attendance ────────────────────────────────────────────────────────

    public func employeeCheckIn(employeeId : Text, merchantId : Text, notes : Text) : MerchantEmployeeTypes.EmployeeAttendance {
      let id = genId("att");
      let rec : MerchantEmployeeTypes.EmployeeAttendance = {
        id;
        employeeId;
        merchantId;
        checkInTime  = Time.now();
        checkOutTime = null;
        date         = currentDate();
        notes;
      };
      attendanceStore.add(id, rec);
      rec
    };

    public func employeeCheckOut(attendanceId : Text) : { #ok : MerchantEmployeeTypes.EmployeeAttendance; #err : Text } {
      switch (attendanceStore.get(attendanceId)) {
        case null { #err("Attendance record not found") };
        case (?rec) {
          let updated = { rec with checkOutTime = ?(Time.now()) };
          attendanceStore.add(attendanceId, updated);
          #ok(updated)
        };
      }
    };

    public func getEmployeeAttendance(employeeId : Text) : [MerchantEmployeeTypes.EmployeeAttendance] {
      let results = List.empty<MerchantEmployeeTypes.EmployeeAttendance>();
      for ((_, rec) in attendanceStore.entries()) {
        if (rec.employeeId == employeeId) { results.add(rec) };
      };
      results.toArray()
    };

    public func getTodayAttendance(merchantId : Text) : [MerchantEmployeeTypes.EmployeeAttendance] {
      let today = currentDate();
      let results = List.empty<MerchantEmployeeTypes.EmployeeAttendance>();
      for ((_, rec) in attendanceStore.entries()) {
        if (rec.merchantId == merchantId and rec.date == today) { results.add(rec) };
      };
      results.toArray()
    };

    // ── Leave Requests ────────────────────────────────────────────────────

    public func applyLeave(
      employeeId : Text,
      merchantId : Text,
      startDate  : Text,
      endDate    : Text,
      reason     : Text,
    ) : MerchantEmployeeTypes.LeaveRequest {
      let id = genId("leave");
      let req : MerchantEmployeeTypes.LeaveRequest = {
        id;
        employeeId;
        merchantId;
        startDate;
        endDate;
        reason;
        status       = #pending;
        approverNote = "";
        createdAt    = Time.now();
      };
      leaveRequestsStore.add(id, req);
      req
    };

    public func getEmployeeLeaves(employeeId : Text) : [MerchantEmployeeTypes.LeaveRequest] {
      let results = List.empty<MerchantEmployeeTypes.LeaveRequest>();
      for ((_, req) in leaveRequestsStore.entries()) {
        if (req.employeeId == employeeId) { results.add(req) };
      };
      results.toArray()
    };

    public func getMerchantPendingLeaves(merchantId : Text) : [MerchantEmployeeTypes.LeaveRequest] {
      let results = List.empty<MerchantEmployeeTypes.LeaveRequest>();
      for ((_, req) in leaveRequestsStore.entries()) {
        if (req.merchantId == merchantId and req.status == #pending) { results.add(req) };
      };
      results.toArray()
    };

    public func approveLeave(id : Text, approverNote : Text) : { #ok : MerchantEmployeeTypes.LeaveRequest; #err : Text } {
      switch (leaveRequestsStore.get(id)) {
        case null { #err("Leave request not found") };
        case (?req) {
          let updated = { req with status = #approved; approverNote };
          leaveRequestsStore.add(id, updated);
          #ok(updated)
        };
      }
    };

    public func rejectLeave(id : Text, approverNote : Text) : { #ok : MerchantEmployeeTypes.LeaveRequest; #err : Text } {
      switch (leaveRequestsStore.get(id)) {
        case null { #err("Leave request not found") };
        case (?req) {
          let updated = { req with status = #rejected; approverNote };
          leaveRequestsStore.add(id, updated);
          #ok(updated)
        };
      }
    };

    // ── Visitor Checkin ───────────────────────────────────────────────────

    public func addVisitorCheckin(
      visitorName       : Text,
      visitorPhone      : Text,
      purpose           : Text,
      communityId       : Text,
      communityMemberId : Text,
      vehicleDetails    : Text,
    ) : MerchantEmployeeTypes.VisitorCheckin {
      let id = genId("vis");
      let rec : MerchantEmployeeTypes.VisitorCheckin = {
        id;
        visitorName;
        visitorPhone;
        purpose;
        communityId;
        communityMemberId;
        vehicleDetails;
        checkInTime    = Time.now();
        checkOutTime   = null;
        approvalStatus = #pending;
        date           = currentDate();
      };
      visitorCheckinsStore.add(id, rec);
      rec
    };

    public func checkOutVisitor(id : Text) : { #ok : MerchantEmployeeTypes.VisitorCheckin; #err : Text } {
      switch (visitorCheckinsStore.get(id)) {
        case null { #err("Visitor record not found") };
        case (?rec) {
          let updated = { rec with checkOutTime = ?(Time.now()) };
          visitorCheckinsStore.add(id, updated);
          #ok(updated)
        };
      }
    };

    public func getCommunityVisitorHistory(communityId : Text) : [MerchantEmployeeTypes.VisitorCheckin] {
      let results = List.empty<MerchantEmployeeTypes.VisitorCheckin>();
      for ((_, rec) in visitorCheckinsStore.entries()) {
        if (rec.communityId == communityId) { results.add(rec) };
      };
      results.toArray()
    };

    public func getVisitorsByDate(date : Text) : [MerchantEmployeeTypes.VisitorCheckin] {
      let results = List.empty<MerchantEmployeeTypes.VisitorCheckin>();
      for ((_, rec) in visitorCheckinsStore.entries()) {
        if (rec.date == date) { results.add(rec) };
      };
      results.toArray()
    };

    public func approveVisitorEntry(id : Text, status : Text) : { #ok : MerchantEmployeeTypes.VisitorCheckin; #err : Text } {
      switch (visitorCheckinsStore.get(id)) {
        case null { #err("Visitor record not found") };
        case (?rec) {
          let updated = { rec with approvalStatus = parseApprovalStatus(status) };
          visitorCheckinsStore.add(id, updated);
          #ok(updated)
        };
      }
    };

  };

};
