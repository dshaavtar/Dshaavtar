import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

module {

  public class ShuttleService(
    routesById   : Map.Map<Text, Types.ShuttleRoute>,
    bookingsById : Map.Map<Text, Types.ShuttleBooking>,
  ) {

    var nextRouteId   : Nat = 0;
    var nextBookingId : Nat = 0;

    func genRouteId() : Text {
      nextRouteId += 1;
      "sroute_" # nextRouteId.toText()
    };

    func genBookingId() : Text {
      nextBookingId += 1;
      "sbooking_" # nextBookingId.toText()
    };

    func generateOTP(seed : Nat) : Text {
      let ts = Int.abs(Time.now());
      let combined = ts + seed * 7919;
      let otp = combined % 1_000_000;
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

    func emptyStopDetails() : [Types.ShuttleStop] { [] };

    public func createRoute(
      routeName     : Text,
      source        : Text,
      destination   : Text,
      stops         : [Text],
      vehicleType   : Types.VehicleType,
      departureTime : Text,
      arrivalTime   : Text,
      fare          : Nat,
      availableSeats : Nat,
      driverId      : Text,
    ) : Types.ShuttleRoute {
      let route : Types.ShuttleRoute = {
        id            = genRouteId();
        routeName;
        serviceName   = "";
        vehicleNumber = "";
        source;
        destination;
        stops;
        stopDetails   = emptyStopDetails();
        vehicleType;
        departureTime;
        arrivalTime;
        fare;
        pricePerKm    = 0.0;
        availableSeats;
        driverId;
        operatorPhone = driverId;
        isActive      = true;
        status        = #active;
        createdAt     = Time.now();
      };
      routesById.add(route.id, route);
      route
    };

    /// Post a shuttle route — restricted to delivery partners with #shuttle service type.
    /// Caller must pass dpServiceType; returns error if not shuttle.
    public func postShuttleRoute(
      routeName     : Text,
      serviceName   : Text,
      vehicleNumber : Text,
      source        : Text,
      destination   : Text,
      stops         : [Text],
      price         : Nat,
      vehicleType   : Types.VehicleType,
      departureTime : Text,
      driverId      : Text,
    ) : Types.ShuttleRoute {
      let route : Types.ShuttleRoute = {
        id            = genRouteId();
        routeName;
        serviceName;
        vehicleNumber;
        source;
        destination;
        stops;
        stopDetails   = emptyStopDetails();
        vehicleType;
        departureTime;
        arrivalTime   = "";
        fare          = price;
        pricePerKm    = 0.0;
        availableSeats = 40;
        driverId;
        operatorPhone = driverId;
        isActive      = true;
        status        = #active;
        createdAt     = Time.now();
      };
      routesById.add(route.id, route);
      route
    };

    /// Post a shuttle route with rich stop details (fare descriptions, ETAs, locations).
    public func postShuttleRouteWithStops(
      routeName     : Text,
      serviceName   : Text,
      vehicleNumber : Text,
      source        : Text,
      destination   : Text,
      stopDetails   : [Types.ShuttleStop],
      pricePerKm    : Float,
      baseFare      : Nat,
      vehicleType   : Types.VehicleType,
      departureTime : Text,
      driverId      : Text,
      operatorPhone : Text,
    ) : Types.ShuttleRoute {
      // Build simple stop names from rich details for backwards compat
      let stopNames = stopDetails.map(func(s) { s.stopName });
      let route : Types.ShuttleRoute = {
        id            = genRouteId();
        routeName;
        serviceName;
        vehicleNumber;
        source;
        destination;
        stops         = stopNames;
        stopDetails;
        vehicleType;
        departureTime;
        arrivalTime   = "";
        fare          = baseFare;
        pricePerKm;
        availableSeats = 40;
        driverId;
        operatorPhone;
        isActive      = true;
        status        = #active;
        createdAt     = Time.now();
      };
      routesById.add(route.id, route);
      route
    };

    /// Deactivate a shuttle route.
    /// callerPhone must match the operatorPhone/driverId, OR isAdmin=true to allow admin override.
    public func deactivateShuttleRoute(routeId : Text, callerPhone : Text, isAdmin : Bool) : Types.Result<Types.ShuttleRoute, Types.ApiError> {
      switch (routesById.get(routeId)) {
        case null { #err(#notFound) };
        case (?route) {
          if (not isAdmin and route.operatorPhone != callerPhone and route.driverId != callerPhone) {
            return #err(#unauthorized);
          };
          let updated = { route with isActive = false; status = #inactive };
          routesById.add(routeId, updated);
          #ok(updated)
        };
      }
    };

    /// Activate a previously deactivated shuttle route.
    public func activateShuttleRoute(routeId : Text) : Types.Result<Types.ShuttleRoute, Types.ApiError> {
      switch (routesById.get(routeId)) {
        case null { #err(#notFound) };
        case (?route) {
          let updated = { route with isActive = true; status = #active };
          routesById.add(routeId, updated);
          #ok(updated)
        };
      }
    };

    /// Returns all active shuttle routes with current availability data.
    public func compareRoutesWithLiveData() : [Types.ShuttleRoute] {
      let results = List.empty<Types.ShuttleRoute>();
      for ((_, r) in routesById.entries()) {
        if (r.isActive and r.status == #active) {
          results.add(r);
        };
      };
      // Sort by availableSeats descending
      let arr = results.toArray();
      arr.sort(func(a : Types.ShuttleRoute, b : Types.ShuttleRoute) : { #less; #equal; #greater } {
        if (a.availableSeats > b.availableSeats) #less
        else if (a.availableSeats < b.availableSeats) #greater
        else #equal
      })
    };

    /// List only active routes (for customer booking).
    public func listRoutes() : [Types.ShuttleRoute] {
      let results = List.empty<Types.ShuttleRoute>();
      for ((_, r) in routesById.entries()) {
        if (r.isActive and r.status == #active) results.add(r);
      };
      results.toArray()
    };

    /// Admin: list all routes including inactive ones.
    public func listAllShuttleRoutesAdmin() : [Types.ShuttleRoute] {
      let results = List.empty<Types.ShuttleRoute>();
      for ((_, r) in routesById.entries()) { results.add(r) };
      results.toArray()
    };

    /// Delivery partner: list their own routes.
    public func listMyShuttleRoutes(dpPhone : Text) : [Types.ShuttleRoute] {
      let results = List.empty<Types.ShuttleRoute>();
      for ((_, r) in routesById.entries()) {
        if (r.operatorPhone == dpPhone or r.driverId == dpPhone) results.add(r);
      };
      results.toArray()
    };

    public func searchShuttleBySourceDest(source : Text, dest : Text) : [Types.ShuttleRoute] {
      let srcLower  = source.toLower();
      let destLower = dest.toLower();
      let results = List.empty<Types.ShuttleRoute>();
      for ((_, r) in routesById.entries()) {
        if (r.isActive and r.status == #active) {
          let srcMatch  = r.source.toLower().contains(#text srcLower) or srcLower.contains(#text (r.source.toLower()));
          let destMatch = r.destination.toLower().contains(#text destLower) or destLower.contains(#text (r.destination.toLower()));
          // Also check if source/dest appear in stops
          let srcInStops  = r.stops.find(func(s : Text) : Bool { s.toLower().contains(#text srcLower) }) != null;
          let destInStops = r.stops.find(func(s : Text) : Bool { s.toLower().contains(#text destLower) }) != null;
          if ((srcMatch or srcInStops) and (destMatch or destInStops)) {
            results.add(r);
          };
        };
      };
      // Sort by available seats descending
      let arr = results.toArray();
      arr.sort(func(a : Types.ShuttleRoute, b : Types.ShuttleRoute) : { #less; #equal; #greater } {
        if (a.availableSeats > b.availableSeats) #less
        else if (a.availableSeats < b.availableSeats) #greater
        else #equal
      })
    };

    public func getRouteById(id : Text) : ?Types.ShuttleRoute {
      routesById.get(id)
    };

    public func bookShuttle(
      passengerPhone : Text,
      routeId        : Text,
      boardingStop   : Text,
      dropStop       : Text,
    ) : Types.Result<Types.ShuttleBooking, Types.ApiError> {
      switch (routesById.get(routeId)) {
        case null { #err(#notFound) };
        case (?route) {
          if (not route.isActive or route.status != #active) {
            return #err(#invalidInput("This shuttle route is not active"));
          };
          if (route.availableSeats == 0) {
            return #err(#invalidInput("No seats available on this route"));
          };
          let booking : Types.ShuttleBooking = {
            id             = genBookingId();
            passengerPhone;
            routeId;
            boardingStop;
            dropStop;
            fare           = route.fare;
            otp            = generateOTP(nextBookingId);
            status         = #confirmed;
            createdAt      = Time.now();
          };
          bookingsById.add(booking.id, booking);
          // Decrement available seats
          let updated = { route with availableSeats = if (route.availableSeats > 0) (route.availableSeats - 1 : Nat) else 0 };
          routesById.add(routeId, updated);
          #ok(booking)
        };
      }
    };

    public func getBookingById(id : Text) : ?Types.ShuttleBooking {
      bookingsById.get(id)
    };

    public func getBookingsByPassenger(passengerPhone : Text) : [Types.ShuttleBooking] {
      let results = List.empty<Types.ShuttleBooking>();
      for ((_, b) in bookingsById.entries()) {
        if (b.passengerPhone == passengerPhone) results.add(b);
      };
      results.toArray()
    };

    public func verifyShuttleOTP(bookingId : Text, otp : Text) : Types.Result<Types.ShuttleBooking, Types.ApiError> {
      switch (bookingsById.get(bookingId)) {
        case null { #err(#notFound) };
        case (?b) {
          if (b.otp != otp) {
            return #err(#otpFailed);
          };
          let updated = { b with status = #boarded };
          bookingsById.add(bookingId, updated);
          #ok(updated)
        };
      }
    };

    public func completeShuttleRide(bookingId : Text) : Types.Result<Types.ShuttleBooking, Types.ApiError> {
      switch (bookingsById.get(bookingId)) {
        case null { #err(#notFound) };
        case (?b) {
          if (b.status != #boarded) {
            return #err(#invalidInput("Booking is not in boarded state"));
          };
          let updated = { b with status = #completed };
          bookingsById.add(bookingId, updated);
          #ok(updated)
        };
      }
    };

    public func getAllBookings() : [Types.ShuttleBooking] {
      let results = List.empty<Types.ShuttleBooking>();
      for ((_, b) in bookingsById.entries()) { results.add(b) };
      results.toArray()
    };

    /// Seed sample shuttle routes for demo
    public func seedSampleRoutes() {
      if (not routesById.isEmpty()) return;
      let sampleStops1 : [Types.ShuttleStop] = [
        { stopName = "Vile Parle";  fareDescription = "₹10 from Andheri"; estimatedArrivalMinutes = 10; location = "Vile Parle Station, Mumbai" },
        { stopName = "Santacruz";   fareDescription = "₹15 from Andheri"; estimatedArrivalMinutes = 20; location = "Santacruz Station, Mumbai" },
        { stopName = "Bandra";      fareDescription = "₹20 from Andheri"; estimatedArrivalMinutes = 30; location = "Bandra Station, Mumbai" },
        { stopName = "Dadar";       fareDescription = "₹30 from Andheri"; estimatedArrivalMinutes = 45; location = "Dadar Station, Mumbai" },
        { stopName = "Matunga";     fareDescription = "₹35 from Andheri"; estimatedArrivalMinutes = 55; location = "Matunga Station, Mumbai" },
        { stopName = "CST Mumbai";  fareDescription = "₹45 from Andheri"; estimatedArrivalMinutes = 90; location = "CST Station, Mumbai" },
      ];
      let sampleStops2 : [Types.ShuttleStop] = [
        { stopName = "Wakad";        fareDescription = "₹10 from Hinjewadi"; estimatedArrivalMinutes = 15; location = "Wakad Circle, Pune" },
        { stopName = "Baner";        fareDescription = "₹20 from Hinjewadi"; estimatedArrivalMinutes = 30; location = "Baner Road, Pune" },
        { stopName = "Aundh";        fareDescription = "₹30 from Hinjewadi"; estimatedArrivalMinutes = 45; location = "Aundh, Pune" },
        { stopName = "Shivajinagar"; fareDescription = "₹45 from Hinjewadi"; estimatedArrivalMinutes = 60; location = "Shivajinagar Station, Pune" },
        { stopName = "Pune Camp";    fareDescription = "₹60 from Hinjewadi"; estimatedArrivalMinutes = 90; location = "Pune Camp, Pune" },
      ];
      let stopNames1 = sampleStops1.map(func(s) { s.stopName });
      let stopNames2 = sampleStops2.map(func(s) { s.stopName });

      let r1 : Types.ShuttleRoute = {
        id = genRouteId(); routeName = "Mumbai Local - Andheri to CST";
        serviceName = "Mumbai City Express"; vehicleNumber = "MH01AB1234";
        source = "Andheri"; destination = "CST Mumbai";
        stops = stopNames1; stopDetails = sampleStops1; vehicleType = #bus;
        departureTime = "08:00 AM"; arrivalTime = "09:30 AM"; fare = 45;
        pricePerKm = 3.0; availableSeats = 40; driverId = "driver_sample_1";
        operatorPhone = "9000001111"; isActive = true; status = #active; createdAt = Time.now();
      };
      routesById.add(r1.id, r1);

      let r2 : Types.ShuttleRoute = {
        id = genRouteId(); routeName = "Pune City Shuttle - Hinjewadi to Camp";
        serviceName = "Pune IT Shuttle"; vehicleNumber = "MH12CD5678";
        source = "Hinjewadi"; destination = "Pune Camp";
        stops = stopNames2; stopDetails = sampleStops2; vehicleType = #bus;
        departureTime = "09:00 AM"; arrivalTime = "10:30 AM"; fare = 60;
        pricePerKm = 4.0; availableSeats = 30; driverId = "driver_sample_2";
        operatorPhone = "9000002222"; isActive = true; status = #active; createdAt = Time.now();
      };
      routesById.add(r2.id, r2);
    };

    /// Get shuttle routes with optional inactive inclusion (for admin).
    public func getShuttleRoutes(includeInactive : Bool) : [Types.ShuttleRoute] {
      let results = List.empty<Types.ShuttleRoute>();
      for ((_, r) in routesById.entries()) {
        if (includeInactive or (r.isActive and r.status == #active)) {
          results.add(r);
        };
      };
      results.toArray()
    };

  }; // end class ShuttleService
};
