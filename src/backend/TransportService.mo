import Types "Types";
import PromotionTypes "types/PromotionTypes";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {

  public class TransportService(
    bookingsById : Map.Map<Text, Types.TransportBooking>,
    otpVerifications : Map.Map<Text, PromotionTypes.SarthiOTPVerification>,
  ) {

    var nextId : Nat = 0;
    var nextOtpId : Nat = 0;
    var nextFreeRideId : Nat = 0;

    // Free ride sarthi registrations (in-memory, keyed by phone)
    let freeRideSarthis = Map.empty<Text, Types.FreeRideSarthi>();

    func genFreeRideId() : Text {
      nextFreeRideId += 1;
      "fr_" # nextFreeRideId.toText()
    };

    func genId() : Text {
      nextId += 1;
      "tb_" # nextId.toText()
    };

    func genOtpId() : Text {
      nextOtpId += 1;
      "otp_" # nextOtpId.toText()
    };

    func putBooking(b : Types.TransportBooking) {
      bookingsById.add(b.id, b);
    };

    func isLegalTransition(from : Types.TransportStatus, to : Types.TransportStatus) : Bool {
      switch (from, to) {
        case (#pending,         #accepted)           { true };
        case (#pending,         #cancelled)          { true };
        case (#accepted,        #headingToPickup)    { true };
        case (#accepted,        #cancelled)          { true };
        case (#headingToPickup, #arrived)             { true };
        case (#arrived,         #rideStarted)         { true };
        case (#arrived,         #cancelled)           { true };
        case (#rideStarted,     #onTheWay)            { true };
        case (#onTheWay,        #arrivedDestination)  { true };
        case (#arrivedDestination, #paymentCollected) { true };
        case (#paymentCollected, #completed)          { true };
        case _ { false };
      }
    };

    func appendHistory(
      existing   : [Types.OrderStatusHistory],
      status     : Types.OrderStatus,
      actorPhone : Text,
      note       : ?Text,
    ) : [Types.OrderStatusHistory] {
      let entry : Types.OrderStatusHistory = {
        status;
        actor_ = actorPhone;
        note;
        timestamp = Utils.getCurrentTimestamp();
      };
      existing.concat([entry])
    };

    func transportToOrderStatus(ts : Types.TransportStatus) : Types.OrderStatus {
      switch (ts) {
        case (#pending)             #pending;
        case (#accepted)            #accepted;
        case (#headingToPickup)     #assigned;
        case (#arrived)             #inTransit;
        case (#rideStarted)         #inTransit;
        case (#onTheWay)            #inTransit;
        case (#arrivedDestination)  #delivered;
        case (#paymentCollected)    #paymentCollected;
        case (#completed)           #completed;
        case (#cancelled)           #cancelled;
      }
    };

    /// Generate a pseudo-random 6-digit OTP from timestamp and seed.
    func generateOTP(seed : Nat) : Text {
      let ts = Int.abs(Time.now());
      let combined = ts + seed;
      let otp = combined % 1_000_000;
      // Zero-pad to 6 digits
      let raw = otp.toText();
      if (raw.size() >= 6) raw
      else {
        var padded = raw;
        var pad : Nat = if (raw.size() < 6) (6 - raw.size() : Nat) else 0;
        while (pad > 0) {
          padded := "0" # padded;
          pad -= 1;
        };
        padded
      }
    };

    public func createBooking(
      customerId      : Text,
      origin          : Types.Location,
      destination     : Types.Location,
      vehicleType     : Types.VehicleType,
      estimatedCharge : Float,
    ) : Types.Result<Types.TransportBooking, Types.ApiError> {
      createBookingWithContact(customerId, customerId, origin, destination, vehicleType, estimatedCharge)
    };

    public func createBookingWithContact(
      customerId        : Text,
      customerContactNo : Text,
      origin            : Types.Location,
      destination       : Types.Location,
      vehicleType       : Types.VehicleType,
      estimatedCharge   : Float,
    ) : Types.Result<Types.TransportBooking, Types.ApiError> {
      let now = Utils.getCurrentTimestamp();
      let booking : Types.TransportBooking = {
        id                = genId();
        customerId;
        customerContactNo;
        sarthiPartnerId   = null;
        partnerContactNo  = "";
        origin;
        destination;
        vehicleType;
        estimatedCharge;
        status            = #pending;
        statusHistory     = appendHistory([], #pending, customerId, ?"Booking created");
        createdAt         = now;
        updatedAt         = now;
      };
      putBooking(booking);
      #ok(booking)
    };

    public func getBookingById(id : Text) : ?Types.TransportBooking {
      bookingsById.get(id)
    };

    public func getBookingsByCustomer(customerId : Text) : [Types.TransportBooking] {
      let all = List.fromIter<Types.TransportBooking>(bookingsById.values());
      all.filter(func(b : Types.TransportBooking) : Bool { b.customerId == customerId }).toArray()
    };

    public func getBookingsBySarthi(sarthiPartnerId : Text) : [Types.TransportBooking] {
      let all = List.fromIter<Types.TransportBooking>(bookingsById.values());
      all.filter(func(b : Types.TransportBooking) : Bool {
        switch (b.sarthiPartnerId) {
          case (?id) id == sarthiPartnerId;
          case null false;
        }
      }).toArray()
    };

    public func updateBookingStatus(
      bookingId  : Text,
      newStatus  : Types.TransportStatus,
      actorPhone : Text,
      note       : Text,
    ) : Types.Result<Types.TransportBooking, Types.ApiError> {
      switch (bookingsById.get(bookingId)) {
        case null #err(#notFound);
        case (?b) {
          if (not isLegalTransition(b.status, newStatus)) {
            return #err(#invalidInput("Illegal transport status transition"));
          };
          let now = Utils.getCurrentTimestamp();
          let orderStatus = transportToOrderStatus(newStatus);
          let history = appendHistory(b.statusHistory, orderStatus, actorPhone, ?note);
          let updated = { b with status = newStatus; statusHistory = history; updatedAt = now };
          putBooking(updated);
          #ok(updated)
        };
      }
    };

    public func assignSarthiPartner(bookingId : Text, sarthiPartnerId : Text) : Types.Result<Types.TransportBooking, Types.ApiError> {
      assignSarthiPartnerWithContact(bookingId, sarthiPartnerId, sarthiPartnerId)
    };

    public func assignSarthiPartnerWithContact(bookingId : Text, sarthiPartnerId : Text, partnerContactNo : Text) : Types.Result<Types.TransportBooking, Types.ApiError> {
      switch (bookingsById.get(bookingId)) {
        case null #err(#notFound);
        case (?b) {
          if (b.status != #pending) {
            return #err(#invalidInput("Booking is not in pending state"));
          };
          let now = Utils.getCurrentTimestamp();
          let history = appendHistory(b.statusHistory, #accepted, sarthiPartnerId, ?"Sarthi partner assigned");
          let updated = {
            b with
            sarthiPartnerId  = ?sarthiPartnerId;
            partnerContactNo;
            status           = #accepted;
            statusHistory    = history;
            updatedAt        = now;
          };
          putBooking(updated);
          #ok(updated)
        };
      }
    };

    /// Get booking details including both contact numbers.
    public func getBookingDetails(bookingId : Text) : ?Types.TransportBooking {
      bookingsById.get(bookingId)
    };

    public func getActiveBookings() : [Types.TransportBooking] {
      let all = List.fromIter<Types.TransportBooking>(bookingsById.values());
      all.filter(func(b : Types.TransportBooking) : Bool {
        switch (b.status) {
          case (#completed) false;
          case (#cancelled)  false;
          case _ true;
        }
      }).toArray()
    };

    public func getAllBookings() : [Types.TransportBooking] {
      let all = List.fromIter<Types.TransportBooking>(bookingsById.values());
      all.toArray()
    };

    // ── Sarthi OTP Verification ───────────────────────────────────────────────

    /// Generate OTP for a free-ride sharing booking.
    /// Passenger receives their OTP privately.
    /// Driver is only prompted to ask passenger for their OTP.
    public func generateSarthiOTP(bookingId : Text) : Types.Result<PromotionTypes.SarthiOTPVerification, Types.ApiError> {
      switch (bookingsById.get(bookingId)) {
        case null #err(#notFound);
        case (?_) {
          // Only generate passenger OTP — driver gets NO OTP value
          let passengerOTP = generateOTP(999983);
          let otpRecord : PromotionTypes.SarthiOTPVerification = {
            id                = genOtpId();
            bookingId;
            driverOTP         = ""; // Driver has no OTP — they ask passenger
            passengerOTP;
            driverVerified    = false;
            passengerVerified = false;
            createdAt         = Time.now();
          };
          otpVerifications.add(bookingId, otpRecord);
          #ok(otpRecord)
        };
      }
    };

    public func verifyDriverOTP(bookingId : Text, otp : Text) : Types.Result<PromotionTypes.SarthiOTPVerification, Types.ApiError> {
      // Driver verification is done by the driver entering the PASSENGER's OTP
      // Delegate to verifyPassengerOTP
      verifyPassengerOTP(bookingId, otp)
    };

    public func verifyPassengerOTP(bookingId : Text, otp : Text) : Types.Result<PromotionTypes.SarthiOTPVerification, Types.ApiError> {
      switch (otpVerifications.get(bookingId)) {
        case null #err(#notFound);
        case (?record) {
          if (record.passengerOTP != otp) {
            return #err(#otpFailed);
          };
          // Mark as verified and clear the OTP value to prevent replay attacks
          let updated = { record with passengerVerified = true; driverVerified = true; passengerOTP = "" };
          otpVerifications.add(bookingId, updated);
          // Update booking status to rideStarted only after OTP verified
          switch (bookingsById.get(bookingId)) {
            case (?b) {
              if (b.status == #arrived or b.status == #accepted) {
                let now = Utils.getCurrentTimestamp();
                let history = appendHistory(b.statusHistory, #inTransit, "system", ?"Passenger OTP verified - ride started");
                let updatedBooking = { b with status = #rideStarted; statusHistory = history; updatedAt = now };
                putBooking(updatedBooking);
              };
            };
            case null {};
          };
          #ok(updated)
        };
      }
    };

    /// Get full ride details for a customer — returns sarthiPhone UNMASKED.
    /// Only call this after ride is confirmed (sarthi has been assigned).
    public func getRideDetails(rideId : Text) : Types.Result<Types.TransportBooking, Types.ApiError> {
      switch (bookingsById.get(rideId)) {
        case null #err(#notFound);
        case (?b) #ok(b);  // partnerContactNo is stored unmasked
      }
    };

    /// Returns all pending rides + accepted rides belonging to this sarthi.
    /// Only exposes total estimatedFare — no baseFare/perKmRate breakdown.
    public func getSarthiPendingRides(sarthiId : Text) : [Types.SarthiPendingRide] {
      let all = List.fromIter<Types.TransportBooking>(bookingsById.values());
      let filtered = all.filter(func(b : Types.TransportBooking) : Bool {
        switch (b.status) {
          case (#pending) true;
          case (#accepted) {
            switch (b.sarthiPartnerId) {
              case (?sid) sid == sarthiId;
              case null false;
            }
          };
          case _ false;
        }
      });
      filtered.map<Types.TransportBooking, Types.SarthiPendingRide>(func(b) {
        {
          id                 = b.id;
          customerId         = b.customerId;
          customerName       = "";
          pickupAddress      = b.origin.address;
          destinationAddress = b.destination.address;
          vehicleType        = b.vehicleType;
          estimatedFare      = b.estimatedCharge;
          status             = b.status;
          createdAt          = b.createdAt;
        }
      }).toArray()
    };

    /// Generate OTP for a free-ride sharing booking.
    /// Passenger gets their OTP privately. Driver NEVER sees it — they ask the passenger.
    public func generateFreeRideOTP(rideId : Text) : Types.Result<PromotionTypes.SarthiOTPVerification, Types.ApiError> {
      generateSarthiOTP(rideId)
    };

    /// Returns true if the booking is a free sharing ride (estimatedCharge == 0).
    public func isFreeRide(bookingId : Text) : Bool {
      switch (bookingsById.get(bookingId)) {
        case null false;
        case (?b) b.estimatedCharge == 0.0;
      }
    };

    public func getFreeRideOTPStatus(bookingId : Text) : ?PromotionTypes.SarthiOTPVerification {
      otpVerifications.get(bookingId)
    };

    /// Register a sarthi for free ride sharing service.
    public func registerFreeRideSarthi(sarthiPhone : Text, vehicleType : Types.VehicleType, serviceArea : Text) : Types.Result<Types.FreeRideSarthi, Types.ApiError> {
      switch (freeRideSarthis.get(sarthiPhone)) {
        case (?existing) {
          // Update existing registration
          let updated = { existing with serviceArea; isActive = true };
          freeRideSarthis.add(sarthiPhone, updated);
          #ok(updated)
        };
        case null {
          let reg : Types.FreeRideSarthi = {
            id          = genFreeRideId();
            sarthiPhone;
            vehicleType;
            serviceArea;
            isActive    = true;
            createdAt   = Time.now();
          };
          freeRideSarthis.add(sarthiPhone, reg);
          #ok(reg)
        };
      }
    };

    /// Check if a sarthi is registered for free ride service.
    public func isRegisteredFreeRideSarthi(sarthiPhone : Text) : Bool {
      switch (freeRideSarthis.get(sarthiPhone)) {
        case (?r) r.isActive;
        case null false;
      }
    };

    /// List all registered free-ride sarthis (active).
    public func listFreeRideSarthis() : [Types.FreeRideSarthi] {
      let results = List.empty<Types.FreeRideSarthi>();
      for ((_, r) in freeRideSarthis.entries()) {
        if (r.isActive) results.add(r);
      };
      results.toArray()
    };

    /// Find a free-ride sarthi by their registration ID.
    public func getFreeRideSarthiById(sarthiId : Text) : ?Types.FreeRideSarthi {
      for ((_, r) in freeRideSarthis.entries()) {
        if (r.id == sarthiId) return ?r;
      };
      null
    };

    /// Complete a ride (marks booking as completed after payment).
    public func completeRide(bookingId : Text) : Types.Result<Types.TransportBooking, Types.ApiError> {
      switch (bookingsById.get(bookingId)) {
        case null #err(#notFound);
        case (?b) {
          let now = Utils.getCurrentTimestamp();
          let history = appendHistory(b.statusHistory, #completed, "system", ?"Ride completed");
          let updated = { b with status = #completed; statusHistory = history; updatedAt = now };
          putBooking(updated);
          #ok(updated)
        };
      }
    };

    /// Set online/offline status for a free ride sharer.
    public func setFreeRideSharerOnlineStatus(sarthiPhone : Text, isOnline : Bool) : Types.Result<Types.FreeRideSarthi, Types.ApiError> {
      switch (freeRideSarthis.get(sarthiPhone)) {
        case null { #err(#notFound) };
        case (?r) {
          let updated = { r with isActive = isOnline };
          freeRideSarthis.add(sarthiPhone, updated);
          #ok(updated)
        };
      }
    };

    /// List only online free-ride sarthis.
    public func listOnlineFreeRideSarthis() : [Types.FreeRideSarthi] {
      let results = List.empty<Types.FreeRideSarthi>();
      for ((_, r) in freeRideSarthis.entries()) {
        if (r.isActive) results.add(r);
      };
      results.toArray()
    };

  }; // end class TransportService
};
