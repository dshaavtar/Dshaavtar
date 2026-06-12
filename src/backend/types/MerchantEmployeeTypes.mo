module {

  // ── Merchant Employee ─────────────────────────────────────────────────────

  public type EmployeeRole = {
    #cashier;
    #store_manager;
    #delivery_coordinator;
  };

  public type MerchantEmployee = {
    id         : Text;
    merchantId : Text;
    name       : Text;
    phone      : Text;
    role       : EmployeeRole;
    isActive   : Bool;
    createdAt  : Int;
  };

  // ── Employee Attendance ───────────────────────────────────────────────────

  public type EmployeeAttendance = {
    id          : Text;
    employeeId  : Text;
    merchantId  : Text;
    checkInTime : Int;
    checkOutTime: ?Int;
    date        : Text;   // ISO date string e.g. "2026-06-05"
    notes       : Text;
  };

  // ── Leave Request ─────────────────────────────────────────────────────────

  public type LeaveStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type LeaveRequest = {
    id           : Text;
    employeeId   : Text;
    merchantId   : Text;
    startDate    : Text;   // ISO date string
    endDate      : Text;   // ISO date string
    reason       : Text;
    status       : LeaveStatus;
    approverNote : Text;
    createdAt    : Int;
  };

  // ── Visitor Checkin ───────────────────────────────────────────────────────

  public type VisitorApprovalStatus = {
    #pending;
    #approved;
    #denied;
  };

  public type VisitorCheckin = {
    id                : Text;
    visitorName       : Text;
    visitorPhone      : Text;
    purpose           : Text;
    communityId       : Text;
    communityMemberId : Text;   // host member phone
    vehicleDetails    : Text;
    checkInTime       : Int;
    checkOutTime      : ?Int;
    approvalStatus    : VisitorApprovalStatus;
    date              : Text;   // ISO date string
  };

};
