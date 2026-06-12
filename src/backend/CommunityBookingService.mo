import CommunityTypes "types/CommunityTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Nat "mo:core/Nat";

module {

  public class CommunityBookingService(
    parkingStore  : Map.Map<Text, CommunityTypes.CommunityParkingBooking>,
    roomStore     : Map.Map<Text, CommunityTypes.CommunityRoomBooking>,
    foodStore     : Map.Map<Text, CommunityTypes.CommunityFoodOrder>,
    workStore     : Map.Map<Text, CommunityTypes.CommunityWorkOrder>,
    nextIdState   : { var nextId : Nat },
  ) {

    // ── Internal helpers ───────────────────────────────────────────────────

    func genId(prefix : Text) : Text {
      let id = nextIdState.nextId;
      nextIdState.nextId += 1;
      prefix # "-" # id.toText()
    };

    // ── Parking Bookings ───────────────────────────────────────────────────

    public func createParkingBooking(
      memberPhone : Text,
      communityId : Text,
      parkingType : CommunityTypes.ParkingType,
      startDate   : Text,
      endDate     : Text,
      cost        : Float,
    ) : CommunityTypes.CommunityParkingBooking {
      let now = Time.now();
      let b : CommunityTypes.CommunityParkingBooking = {
        id = genId("PKG");
        memberPhone;
        communityId;
        parkingType;
        startDate;
        endDate;
        cost;
        status    = #pending;
        createdAt = now;
        updatedAt = now;
      };
      parkingStore.add(b.id, b);
      b
    };

    public func getAllParkingBookings() : [CommunityTypes.CommunityParkingBooking] {
      parkingStore.values().toArray()
    };

    public func getParkingBookingById(id : Text) : ?CommunityTypes.CommunityParkingBooking {
      parkingStore.get(id)
    };

    public func getParkingBookingsByPhone(phone : Text) : [CommunityTypes.CommunityParkingBooking] {
      let r = List.empty<CommunityTypes.CommunityParkingBooking>();
      for ((_, b) in parkingStore.entries()) {
        if (b.memberPhone == phone) r.add(b);
      };
      r.toArray()
    };

    public func getParkingBookingsByCommunity(communityId : Text) : [CommunityTypes.CommunityParkingBooking] {
      let lower = communityId.toLower();
      let r = List.empty<CommunityTypes.CommunityParkingBooking>();
      for ((_, b) in parkingStore.entries()) {
        if (b.communityId.toLower() == lower) r.add(b);
      };
      r.toArray()
    };

    public func updateParkingBookingStatus(
      id     : Text,
      status : CommunityTypes.BookingStatus,
    ) : Bool {
      switch (parkingStore.get(id)) {
        case null false;
        case (?b) {
          parkingStore.add(id, { b with status; updatedAt = Time.now() });
          true
        };
      }
    };

    // ── Room Bookings ──────────────────────────────────────────────────────

    public func createRoomBooking(
      memberPhone  : Text,
      communityId  : Text,
      facilityType : CommunityTypes.FacilityType,
      bookingDate  : Text,
      timeSlot     : Text,
      description  : Text,
    ) : CommunityTypes.CommunityRoomBooking {
      let now = Time.now();
      let b : CommunityTypes.CommunityRoomBooking = {
        id = genId("ROOM");
        memberPhone;
        communityId;
        facilityType;
        bookingDate;
        timeSlot;
        description;
        status    = #pending;
        createdAt = now;
        updatedAt = now;
      };
      roomStore.add(b.id, b);
      b
    };

    public func getAllRoomBookings() : [CommunityTypes.CommunityRoomBooking] {
      roomStore.values().toArray()
    };

    public func getRoomBookingById(id : Text) : ?CommunityTypes.CommunityRoomBooking {
      roomStore.get(id)
    };

    public func getRoomBookingsByPhone(phone : Text) : [CommunityTypes.CommunityRoomBooking] {
      let r = List.empty<CommunityTypes.CommunityRoomBooking>();
      for ((_, b) in roomStore.entries()) {
        if (b.memberPhone == phone) r.add(b);
      };
      r.toArray()
    };

    public func getRoomBookingsByCommunity(communityId : Text) : [CommunityTypes.CommunityRoomBooking] {
      let lower = communityId.toLower();
      let r = List.empty<CommunityTypes.CommunityRoomBooking>();
      for ((_, b) in roomStore.entries()) {
        if (b.communityId.toLower() == lower) r.add(b);
      };
      r.toArray()
    };

    public func updateRoomBookingStatus(
      id     : Text,
      status : CommunityTypes.BookingStatus,
    ) : Bool {
      switch (roomStore.get(id)) {
        case null false;
        case (?b) {
          roomStore.add(id, { b with status; updatedAt = Time.now() });
          true
        };
      }
    };

    // ── Food Orders ────────────────────────────────────────────────────────

    public func createFoodOrder(
      buyerPhone      : Text,
      sellerPhone     : Text,
      communityId     : Text,
      mealDescription : Text,
      cuisineType     : Text,
      dietary         : CommunityTypes.DietaryType,
      deliveryTime    : Text,
      quantity        : Nat,
      cost            : Float,
    ) : CommunityTypes.CommunityFoodOrder {
      let now = Time.now();
      let o : CommunityTypes.CommunityFoodOrder = {
        id = genId("FOOD");
        buyerPhone;
        sellerPhone;
        communityId;
        mealDescription;
        cuisineType;
        dietary;
        deliveryTime;
        quantity;
        cost;
        status    = #pending;
        createdAt = now;
        updatedAt = now;
      };
      foodStore.add(o.id, o);
      o
    };

    public func getAllFoodOrders() : [CommunityTypes.CommunityFoodOrder] {
      foodStore.values().toArray()
    };

    public func getFoodOrderById(id : Text) : ?CommunityTypes.CommunityFoodOrder {
      foodStore.get(id)
    };

    public func getFoodOrdersByPhone(phone : Text) : [CommunityTypes.CommunityFoodOrder] {
      let r = List.empty<CommunityTypes.CommunityFoodOrder>();
      for ((_, o) in foodStore.entries()) {
        if (o.buyerPhone == phone or o.sellerPhone == phone) r.add(o);
      };
      r.toArray()
    };

    public func getFoodOrdersByCommunity(communityId : Text) : [CommunityTypes.CommunityFoodOrder] {
      let lower = communityId.toLower();
      let r = List.empty<CommunityTypes.CommunityFoodOrder>();
      for ((_, o) in foodStore.entries()) {
        if (o.communityId.toLower() == lower) r.add(o);
      };
      r.toArray()
    };

    public func updateFoodOrderStatus(
      id     : Text,
      status : CommunityTypes.BookingStatus,
    ) : Bool {
      switch (foodStore.get(id)) {
        case null false;
        case (?o) {
          foodStore.add(id, { o with status; updatedAt = Time.now() });
          true
        };
      }
    };

    // ── Work Orders ────────────────────────────────────────────────────────

    public func createWorkOrder(
      memberPhone   : Text,
      communityId   : Text,
      serviceType   : CommunityTypes.WorkServiceType,
      description   : Text,
      scheduledDate : Text,
    ) : CommunityTypes.CommunityWorkOrder {
      let now = Time.now();
      let w : CommunityTypes.CommunityWorkOrder = {
        id = genId("WORK");
        memberPhone;
        communityId;
        serviceType;
        description;
        scheduledDate;
        status    = #pending;
        createdAt = now;
        updatedAt = now;
      };
      workStore.add(w.id, w);
      w
    };

    public func getAllWorkOrders() : [CommunityTypes.CommunityWorkOrder] {
      workStore.values().toArray()
    };

    public func getWorkOrderById(id : Text) : ?CommunityTypes.CommunityWorkOrder {
      workStore.get(id)
    };

    public func getWorkOrdersByPhone(phone : Text) : [CommunityTypes.CommunityWorkOrder] {
      let r = List.empty<CommunityTypes.CommunityWorkOrder>();
      for ((_, w) in workStore.entries()) {
        if (w.memberPhone == phone) r.add(w);
      };
      r.toArray()
    };

    public func getWorkOrdersByCommunity(communityId : Text) : [CommunityTypes.CommunityWorkOrder] {
      let lower = communityId.toLower();
      let r = List.empty<CommunityTypes.CommunityWorkOrder>();
      for ((_, w) in workStore.entries()) {
        if (w.communityId.toLower() == lower) r.add(w);
      };
      r.toArray()
    };

    public func updateWorkOrderStatus(
      id     : Text,
      status : CommunityTypes.BookingStatus,
    ) : Bool {
      switch (workStore.get(id)) {
        case null false;
        case (?w) {
          workStore.add(id, { w with status; updatedAt = Time.now() });
          true
        };
      }
    };

  };

};
