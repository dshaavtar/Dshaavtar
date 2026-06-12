module {

  /// One entry per unique phone number in the community.
  /// id is identical to phone so lookups are O(log n) by phone.
  public type CommunityMember = {
    id            : Text;   // == phone
    phone         : Text;
    name          : Text;
    apartmentName : Text;
    address       : Text;
    location      : Text;
    city          : Text;
    roles         : [Text]; // e.g. ["customer", "merchant"]
    registeredAt  : Int;
    updatedAt     : Int;
  };

  /// communityId = city # ":" # location — scopes bookings to a community.
  public type ParkingType = { #covered; #open };

  public type BookingStatus = { #pending; #confirmed; #completed; #cancelled };

  public type CommunityParkingBooking = {
    id          : Text;
    memberPhone : Text;
    communityId : Text;   // city ++ ":" ++ location
    parkingType : ParkingType;
    startDate   : Text;   // ISO date string
    endDate     : Text;
    cost        : Float;
    status      : BookingStatus;
    createdAt   : Int;
    updatedAt   : Int;
  };

  public type FacilityType = { #meetingRoom; #commonHall; #gym; #garden; #other };

  public type CommunityRoomBooking = {
    id           : Text;
    memberPhone  : Text;
    communityId  : Text;
    facilityType : FacilityType;
    bookingDate  : Text;
    timeSlot     : Text;   // e.g. "10:00-12:00"
    description  : Text;
    status       : BookingStatus;
    createdAt    : Int;
    updatedAt    : Int;
  };

  public type DietaryType = { #veg; #nonveg; #vegan };

  public type CommunityFoodOrder = {
    id             : Text;
    buyerPhone     : Text;
    sellerPhone    : Text;
    communityId    : Text;
    mealDescription: Text;
    cuisineType    : Text;
    dietary        : DietaryType;
    deliveryTime   : Text;
    quantity       : Nat;
    cost           : Float;
    status         : BookingStatus;
    createdAt      : Int;
    updatedAt      : Int;
  };

  public type WorkServiceType = {
    #maintenance; #pestControl; #security;
    #accounts; #cleaning; #electrician;
  };

  public type CommunityWorkOrder = {
    id            : Text;
    memberPhone   : Text;
    communityId   : Text;
    serviceType   : WorkServiceType;
    description   : Text;
    scheduledDate : Text;
    status        : BookingStatus;
    createdAt     : Int;
    updatedAt     : Int;
  };

  // ── Visitor Check-in / Check-out ─────────────────────────────────────────

  public type VisitorCheckinStatus = { #pending; #approved; #rejected; #checkedOut };

  public type VisitorCheckin = {
    id           : Text;
    communityId  : Text;   // city ++ ":" ++ location
    visitorPhone : Text;
    visitorName  : Text;
    reason       : Text;
    hostPhone    : Text;   // community member being visited
    checkInTime  : Int;
    checkOutTime : ?Int;
    status       : VisitorCheckinStatus;
    createdAt    : Int;
    updatedAt    : Int;
  };
};
