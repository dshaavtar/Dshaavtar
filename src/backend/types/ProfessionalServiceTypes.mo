module {

  // ── Healthcare Provider ───────────────────────────────────────────────────

  public type HealthcareProvider = {
    id              : Text;
    name            : Text;
    specialization  : Text;
    consultationFee : Float;
    address         : Text;
    city            : Text;
    availability    : [Text];  // e.g. ["Mon","Tue","Sat"] or ["Mon-Sat 9am-5pm"]
    phone           : Text;
    rating          : Float;
    createdAt       : Int;
    updatedAt       : Int;
  };

  public type AppointmentStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  public type HealthcareAppointment = {
    id           : Text;
    providerId   : Text;
    customerPhone : Text;
    date         : Text;   // ISO date string e.g. "2026-05-10"
    timeSlot     : Text;   // e.g. "10:00-10:30"
    status       : AppointmentStatus;
    notes        : Text;
    createdAt    : Int;
    updatedAt    : Int;
  };

  // ── Tour Operator ─────────────────────────────────────────────────────────

  public type TourOperator = {
    id             : Text;
    name           : Text;
    destinations   : [Text];
    tourTypes      : [Text];   // e.g. ["adventure", "pilgrimage", "leisure"]
    duration       : Text;     // e.g. "3 days / 2 nights"
    pricePerPerson : Float;
    maxPassengers  : Nat;
    phone          : Text;
    city           : Text;
    rating         : Float;
    createdAt      : Int;
    updatedAt      : Int;
  };

  public type TourBookingStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  public type TourBooking = {
    id             : Text;
    operatorId     : Text;
    customerPhone  : Text;
    destination    : Text;
    tourType       : Text;
    date           : Text;
    passengerCount : Nat;
    totalPrice     : Float;
    status         : TourBookingStatus;
    createdAt      : Int;
    updatedAt      : Int;
  };

  // ── Professional Service ──────────────────────────────────────────────────

  // areaRates: list of (areaName, ratePerHour) pairs for area-specific pricing.
  // Professionals may set different rates for different city areas.
  // If an area is not present in this list, pricePerHour (global) is used as fallback.
  public type ProfessionalService = {
    id             : Text;
    merchantPhone  : Text;
    serviceType    : Text;   // "massage" | "plumbing" | "electrical" | "training" | etc.
    specialization : Text;
    pricePerHour   : Float;  // global fallback rate
    areaRates      : [(Text, Float)];  // (areaName, ratePerHour)
    address        : Text;
    city           : Text;
    availability   : [Text];  // e.g. ["Mon-Sat 9am-6pm"]
    rating         : Float;
    createdAt      : Int;
    updatedAt      : Int;
  };

  public type ServiceBookingStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  public type ServiceBooking = {
    id            : Text;
    serviceId     : Text;
    customerPhone : Text;
    date          : Text;
    timeSlot      : Text;
    duration      : Nat;     // duration in hours
    totalPrice    : Float;
    status        : ServiceBookingStatus;
    notes         : Text;
    createdAt     : Int;
    updatedAt     : Int;
  };

  // ── Dashboard Data ────────────────────────────────────────────────────────

  public type EarningsByDate = {
    date     : Text;
    earnings : Float;
  };

  public type MerchantDashboardData = {
    subscriptionStatus  : Text;   // "active" | "inactive" | "passdigit_required"
    passdigitRequired   : Bool;
    servicesByType      : [(Text, Nat)];  // serviceType -> count
    pendingBookings     : Nat;
    recentOrders        : Nat;
    earningsByDate      : [EarningsByDate];
  };

  public type DeliveryDashboardData = {
    subscriptionStatus : Text;
    passdigitRequired  : Bool;
    activeDeliveries   : Nat;
    totalEarnings      : Float;
    rating             : Float;
  };

  public type CustomerDashboardData = {
    totalExpenditure      : Float;
    expenditureByCategory : [(Text, Float)];
    ordersByCategory      : [(Text, Nat)];
    familyMemberCount     : Nat;
    activeSubscriptions   : Nat;
  };

};
