import MerchantEmployeeTypes "../types/MerchantEmployeeTypes";
import MerchantEmployeeLib "../lib/merchant-employee";
import Map "mo:core/Map";
import Nat "mo:core/Nat";

mixin (
  employeesStore       : Map.Map<Text, MerchantEmployeeTypes.MerchantEmployee>,
  attendanceStore      : Map.Map<Text, MerchantEmployeeTypes.EmployeeAttendance>,
  leaveRequestsStore   : Map.Map<Text, MerchantEmployeeTypes.LeaveRequest>,
  visitorCheckinsStore : Map.Map<Text, MerchantEmployeeTypes.VisitorCheckin>,
  empIdState           : { var nextId : Nat },
) {

  transient let empLib = MerchantEmployeeLib.MerchantEmployeeLib(
    employeesStore, attendanceStore, leaveRequestsStore, visitorCheckinsStore, empIdState
  );

  // ── Employee management ───────────────────────────────────────────────

  public shared func addMerchantEmployee(
    merchantId : Text,
    name       : Text,
    phone      : Text,
    role       : Text,
  ) : async MerchantEmployeeTypes.MerchantEmployee {
    empLib.addMerchantEmployee(merchantId, name, phone, role)
  };

  public query func listMerchantEmployees(merchantId : Text) : async [MerchantEmployeeTypes.MerchantEmployee] {
    empLib.listMerchantEmployees(merchantId)
  };

  public shared func updateMerchantEmployee(
    id    : Text,
    name  : Text,
    phone : Text,
    role  : Text,
  ) : async { #ok : MerchantEmployeeTypes.MerchantEmployee; #err : Text } {
    empLib.updateMerchantEmployee(id, name, phone, role)
  };

  public shared func setMerchantEmployeeActive(id : Text, isActive : Bool) : async Bool {
    empLib.setMerchantEmployeeActive(id, isActive)
  };

  // ── Attendance ────────────────────────────────────────────────────────

  public shared func employeeCheckIn(
    employeeId : Text,
    merchantId : Text,
    notes      : Text,
  ) : async MerchantEmployeeTypes.EmployeeAttendance {
    empLib.employeeCheckIn(employeeId, merchantId, notes)
  };

  public shared func employeeCheckOut(attendanceId : Text) : async { #ok : MerchantEmployeeTypes.EmployeeAttendance; #err : Text } {
    empLib.employeeCheckOut(attendanceId)
  };

  public query func getEmployeeAttendance(employeeId : Text) : async [MerchantEmployeeTypes.EmployeeAttendance] {
    empLib.getEmployeeAttendance(employeeId)
  };

  public query func getTodayAttendance(merchantId : Text) : async [MerchantEmployeeTypes.EmployeeAttendance] {
    empLib.getTodayAttendance(merchantId)
  };

  // ── Leave Requests ────────────────────────────────────────────────────

  public shared func applyLeave(
    employeeId : Text,
    merchantId : Text,
    startDate  : Text,
    endDate    : Text,
    reason     : Text,
  ) : async MerchantEmployeeTypes.LeaveRequest {
    empLib.applyLeave(employeeId, merchantId, startDate, endDate, reason)
  };

  public query func getEmployeeLeaves(employeeId : Text) : async [MerchantEmployeeTypes.LeaveRequest] {
    empLib.getEmployeeLeaves(employeeId)
  };

  public query func getMerchantPendingLeaves(merchantId : Text) : async [MerchantEmployeeTypes.LeaveRequest] {
    empLib.getMerchantPendingLeaves(merchantId)
  };

  public shared func approveLeave(id : Text, approverNote : Text) : async { #ok : MerchantEmployeeTypes.LeaveRequest; #err : Text } {
    empLib.approveLeave(id, approverNote)
  };

  public shared func rejectLeave(id : Text, approverNote : Text) : async { #ok : MerchantEmployeeTypes.LeaveRequest; #err : Text } {
    empLib.rejectLeave(id, approverNote)
  };

  // ── Visitor Checkin ───────────────────────────────────────────────────

  public shared func addVisitorCheckin(
    visitorName       : Text,
    visitorPhone      : Text,
    purpose           : Text,
    communityId       : Text,
    communityMemberId : Text,
    vehicleDetails    : Text,
  ) : async MerchantEmployeeTypes.VisitorCheckin {
    empLib.addVisitorCheckin(visitorName, visitorPhone, purpose, communityId, communityMemberId, vehicleDetails)
  };

  public shared func checkOutVisitor(id : Text) : async { #ok : MerchantEmployeeTypes.VisitorCheckin; #err : Text } {
    empLib.checkOutVisitor(id)
  };

  public query func getCommunityVisitorHistory(communityId : Text) : async [MerchantEmployeeTypes.VisitorCheckin] {
    empLib.getCommunityVisitorHistory(communityId)
  };

  public query func getVisitorsByDate(date : Text) : async [MerchantEmployeeTypes.VisitorCheckin] {
    empLib.getVisitorsByDate(date)
  };

  public shared func approveVisitorEntry(id : Text, status : Text) : async { #ok : MerchantEmployeeTypes.VisitorCheckin; #err : Text } {
    empLib.approveVisitorEntry(id, status)
  };

};
