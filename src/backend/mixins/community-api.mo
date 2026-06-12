import CommunityTypes "../types/CommunityTypes";
import CommunityService "../CommunityService";
import CommunityBookingService "../CommunityBookingService";
import Map "mo:core/Map";
import Nat "mo:core/Nat";

mixin (
  communityStore   : Map.Map<Text, CommunityTypes.CommunityMember>,
  parkingStore     : Map.Map<Text, CommunityTypes.CommunityParkingBooking>,
  roomStore        : Map.Map<Text, CommunityTypes.CommunityRoomBooking>,
  foodStore        : Map.Map<Text, CommunityTypes.CommunityFoodOrder>,
  workStore        : Map.Map<Text, CommunityTypes.CommunityWorkOrder>,
  communityIdState : { var nextId : Nat },
) {

  transient let communitySvc = CommunityService.CommunityService(communityStore);
  transient let communityBookingSvc = CommunityBookingService.CommunityBookingService(
    parkingStore, roomStore, foodStore, workStore, communityIdState
  );

  // ── Community Member API ──────────────────────────────────────────────

  public shared func addOrUpdateCommunityMember(member : CommunityTypes.CommunityMember) : async () {
    communitySvc.addOrUpdateCommunityMember(member)
  };

  public query func getCommunityMemberByPhone(phone : Text) : async ?CommunityTypes.CommunityMember {
    communitySvc.getCommunityMemberByPhone(phone)
  };

  public query func getAllCommunityMembers() : async [CommunityTypes.CommunityMember] {
    communitySvc.getAllCommunityMembers()
  };

  public query func searchCommunityMembers(searchTerm : Text) : async [CommunityTypes.CommunityMember] {
    communitySvc.searchCommunityMembers(searchTerm)
  };

  public shared func removeCommunityMember(phone : Text) : async Bool {
    communitySvc.removeCommunityMember(phone)
  };

  public query func getCommunityMembersByCity(city : Text) : async [CommunityTypes.CommunityMember] {
    communitySvc.getCommunityMembersByCity(city)
  };

  // ── Parking Booking API ──────────────────────────────────────────────

  public shared func createCommunityParkingBooking(
    memberPhone : Text,
    communityId : Text,
    parkingType : Text,
    startDate   : Text,
    endDate     : Text,
    cost        : Float,
  ) : async CommunityTypes.CommunityParkingBooking {
    let pType : CommunityTypes.ParkingType = if (parkingType == "covered") #covered else #open;
    communityBookingSvc.createParkingBooking(memberPhone, communityId, pType, startDate, endDate, cost)
  };

  public query func getAllCommunityParkingBookings() : async [CommunityTypes.CommunityParkingBooking] {
    communityBookingSvc.getAllParkingBookings()
  };

  public query func getCommunityParkingBookingById(id : Text) : async ?CommunityTypes.CommunityParkingBooking {
    communityBookingSvc.getParkingBookingById(id)
  };

  public query func getCommunityParkingBookingsByPhone(phone : Text) : async [CommunityTypes.CommunityParkingBooking] {
    communityBookingSvc.getParkingBookingsByPhone(phone)
  };

  public query func getCommunityParkingBookingsByCommunity(communityId : Text) : async [CommunityTypes.CommunityParkingBooking] {
    communityBookingSvc.getParkingBookingsByCommunity(communityId)
  };

  public shared func updateCommunityParkingBookingStatus(id : Text, status : Text) : async Bool {
    communityBookingSvc.updateParkingBookingStatus(id, parseBookingStatus(status))
  };

  // ── Room Booking API ────────────────────────────────────────────────

  public shared func createCommunityRoomBooking(
    memberPhone  : Text,
    communityId  : Text,
    facilityType : Text,
    bookingDate  : Text,
    timeSlot     : Text,
    description  : Text,
  ) : async CommunityTypes.CommunityRoomBooking {
    let fType : CommunityTypes.FacilityType = switch (facilityType) {
      case "meeting-room" #meetingRoom;
      case "common-hall"  #commonHall;
      case "gym"          #gym;
      case "garden"       #garden;
      case _              #other;
    };
    communityBookingSvc.createRoomBooking(memberPhone, communityId, fType, bookingDate, timeSlot, description)
  };

  public query func getAllCommunityRoomBookings() : async [CommunityTypes.CommunityRoomBooking] {
    communityBookingSvc.getAllRoomBookings()
  };

  public query func getCommunityRoomBookingById(id : Text) : async ?CommunityTypes.CommunityRoomBooking {
    communityBookingSvc.getRoomBookingById(id)
  };

  public query func getCommunityRoomBookingsByPhone(phone : Text) : async [CommunityTypes.CommunityRoomBooking] {
    communityBookingSvc.getRoomBookingsByPhone(phone)
  };

  public query func getCommunityRoomBookingsByCommunity(communityId : Text) : async [CommunityTypes.CommunityRoomBooking] {
    communityBookingSvc.getRoomBookingsByCommunity(communityId)
  };

  public shared func updateCommunityRoomBookingStatus(id : Text, status : Text) : async Bool {
    communityBookingSvc.updateRoomBookingStatus(id, parseBookingStatus(status))
  };

  // ── Food Order API ──────────────────────────────────────────────────

  public shared func createCommunityFoodOrder(
    buyerPhone      : Text,
    sellerPhone     : Text,
    communityId     : Text,
    mealDescription : Text,
    cuisineType     : Text,
    dietary         : Text,
    deliveryTime    : Text,
    quantity        : Nat,
    cost            : Float,
  ) : async CommunityTypes.CommunityFoodOrder {
    let d : CommunityTypes.DietaryType = switch (dietary) {
      case "nonveg" #nonveg;
      case "vegan"  #vegan;
      case _        #veg;
    };
    communityBookingSvc.createFoodOrder(
      buyerPhone, sellerPhone, communityId, mealDescription,
      cuisineType, d, deliveryTime, quantity, cost
    )
  };

  public query func getAllCommunityFoodOrders() : async [CommunityTypes.CommunityFoodOrder] {
    communityBookingSvc.getAllFoodOrders()
  };

  public query func getCommunityFoodOrderById(id : Text) : async ?CommunityTypes.CommunityFoodOrder {
    communityBookingSvc.getFoodOrderById(id)
  };

  public query func getCommunityFoodOrdersByPhone(phone : Text) : async [CommunityTypes.CommunityFoodOrder] {
    communityBookingSvc.getFoodOrdersByPhone(phone)
  };

  public query func getCommunityFoodOrdersByCommunity(communityId : Text) : async [CommunityTypes.CommunityFoodOrder] {
    communityBookingSvc.getFoodOrdersByCommunity(communityId)
  };

  public shared func updateCommunityFoodOrderStatus(id : Text, status : Text) : async Bool {
    communityBookingSvc.updateFoodOrderStatus(id, parseBookingStatus(status))
  };

  // ── Work Order API ──────────────────────────────────────────────────

  public shared func createCommunityWorkOrder(
    memberPhone   : Text,
    communityId   : Text,
    serviceType   : Text,
    description   : Text,
    scheduledDate : Text,
  ) : async CommunityTypes.CommunityWorkOrder {
    let sType : CommunityTypes.WorkServiceType = switch (serviceType) {
      case "maintenance"  #maintenance;
      case "pest-control" #pestControl;
      case "security"     #security;
      case "accounts"     #accounts;
      case "cleaning"     #cleaning;
      case _              #electrician;
    };
    communityBookingSvc.createWorkOrder(memberPhone, communityId, sType, description, scheduledDate)
  };

  public query func getAllCommunityWorkOrders() : async [CommunityTypes.CommunityWorkOrder] {
    communityBookingSvc.getAllWorkOrders()
  };

  public query func getCommunityWorkOrderById(id : Text) : async ?CommunityTypes.CommunityWorkOrder {
    communityBookingSvc.getWorkOrderById(id)
  };

  public query func getCommunityWorkOrdersByPhone(phone : Text) : async [CommunityTypes.CommunityWorkOrder] {
    communityBookingSvc.getWorkOrdersByPhone(phone)
  };

  public query func getCommunityWorkOrdersByCommunity(communityId : Text) : async [CommunityTypes.CommunityWorkOrder] {
    communityBookingSvc.getWorkOrdersByCommunity(communityId)
  };

  public shared func updateCommunityWorkOrderStatus(id : Text, status : Text) : async Bool {
    communityBookingSvc.updateWorkOrderStatus(id, parseBookingStatus(status))
  };

  // ── Private helpers ──────────────────────────────────────────────────

  func parseBookingStatus(s : Text) : CommunityTypes.BookingStatus {
    switch (s) {
      case "confirmed" #confirmed;
      case "completed" #completed;
      case "cancelled" #cancelled;
      case _           #pending;
    }
  };

};
