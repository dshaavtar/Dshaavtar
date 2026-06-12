import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import PST "../types/PaySprintTypes";
import OutCall "mo:caffeineai-http-outcalls/outcall";

/// PaySprint API mixin — credential management, bus/train/flight bookings,
/// utility payments (recharge, bill, fastTag, LPG, municipality),
/// callback processing, and API call logging.
mixin (
  paysprintCredentials : Map.Map<Text, PST.PaySprintCredential>,
  busBookings          : Map.Map<Text, PST.BusBooking>,
  trainBookings        : Map.Map<Text, PST.TrainBooking>,
  flightBookings       : Map.Map<Text, PST.FlightBooking>,
  utilityTransactions  : Map.Map<Text, PST.UtilityTransaction>,
  paysprintCallbacks   : Map.Map<Text, PST.PaySprintCallback>,
  paysprintAPILogs     : Map.Map<Text, PST.PaySprintAPILog>,
) {

  // ── ID generators ───────────────────────────────────────────────────────────

  var nextCredId   : Nat = 0;
  var nextBusId    : Nat = 0;
  var nextTrainId  : Nat = 0;
  var nextFlightId : Nat = 0;
  var nextUtilId   : Nat = 0;
  var nextCbId     : Nat = 0;
  var nextLogId    : Nat = 0;

  func nowNat() : Nat { Time.now().toNat() };

  func genCredId()   : Text { nextCredId   += 1; "psc_"   # nowNat().toText() # "_" # nextCredId.toText() };
  func genBusId()    : Text { nextBusId    += 1; "bus_"   # nowNat().toText() # "_" # nextBusId.toText() };
  func genTrainId()  : Text { nextTrainId  += 1; "trn_"   # nowNat().toText() # "_" # nextTrainId.toText() };
  func genFlightId() : Text { nextFlightId += 1; "flt_"   # nowNat().toText() # "_" # nextFlightId.toText() };
  func genUtilId()   : Text { nextUtilId   += 1; "utl_"   # nowNat().toText() # "_" # nextUtilId.toText() };
  func genCbId()     : Text { nextCbId     += 1; "pscb_"  # nowNat().toText() # "_" # nextCbId.toText() };
  func genLogId()    : Text { nextLogId    += 1; "pslog_" # nowNat().toText() # "_" # nextLogId.toText() };

  // ── Base URL helpers ────────────────────────────────────────────────────────

  let UAT_BASE  : Text = "https://sit.paysprint.in/service-api/api/v1/service";
  let LIVE_BASE : Text = "https://apisprint.paysprint.in/service-api/api/v1/service";

  func baseUrl(env : PST.PaySprintEnvironment) : Text {
    switch env { case (#uat) UAT_BASE; case (#live) LIVE_BASE }
  };

  // ── Header builder ──────────────────────────────────────────────────────────
  // UAT  : Token + Content-Type + Authorisedkey
  // Live : Token + Content-Type  (no Authorisedkey per PaySprint docs)
  func buildPaySprintHeaders(cred : PST.PaySprintCredential) : [OutCall.Header] {
    switch (cred.environment) {
      case (#uat) [
        { name = "Token";         value = cred.partnerKey },
        { name = "Content-Type";  value = "application/json" },
        { name = "Authorisedkey"; value = cred.authorisedKey },
      ];
      case (#live) [
        { name = "Token";        value = cred.partnerKey },
        { name = "Content-Type"; value = "application/json" },
      ];
    }
  };

  // ── JWT stub (display-only — no native HS256 in Motoko) ─────────────────────
  // NOTE: In production the signed JWT must come from a trusted signing service
  // or be pre-generated and stored in the credential record.
  func generatePaySprintJWT(
    partnerId   : Text,
    _partnerKey : Text,
    reqId       : Nat,
    timestamp   : Nat,
  ) : Text {
    let header = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";
    header # ".PAYLOAD.SIGNATURE_PLACEHOLDER_{\"iss\":\"PAYSPRINT\",\"ts\":\"" # timestamp.toText()
      # "\",\"pid\":\"" # partnerId # "\",\"rid\":\"" # reqId.toText() # "\"}"
  };

  // ── API call logger ─────────────────────────────────────────────────────────

  func logAPICall(
    svcType    : PST.PaySprintServiceType,
    endpoint   : Text,
    env        : PST.PaySprintEnvironment,
    reqBody    : Text,
    respBody   : Text,
    httpStatus : Nat,
    latencyMs  : Nat,
    isError    : Bool,
    errMsg     : ?Text,
  ) {
    let id = genLogId();
    paysprintAPILogs.add(id, {
      id;
      serviceType  = svcType;
      endpoint;
      environment  = env;
      requestBody  = reqBody;
      responseBody = respBody;
      httpStatus;
      latencyMs;
      isError;
      errorMessage = errMsg;
      createdAt    = nowNat();
    });
  };

  func getCred(credId : Text) : ?PST.PaySprintCredential {
    paysprintCredentials.get(credId)
  };

  // ── Credential management ───────────────────────────────────────────────────

  public func savePaySprintCredential(cred : PST.PaySprintCredential) : async { #ok : PST.PaySprintCredential; #err : Text } {
    let id = if (cred.id == "") genCredId() else cred.id;
    let saved : PST.PaySprintCredential = { cred with id; updatedAt = nowNat() };
    paysprintCredentials.add(id, saved);
    #ok(saved)
  };

  public query func getPaySprintCredential(
    serviceType : PST.PaySprintServiceType,
    env         : PST.PaySprintEnvironment,
  ) : async ?PST.PaySprintCredential {
    var found : ?PST.PaySprintCredential = null;
    label search for ((_, c) in paysprintCredentials.entries()) {
      if (debug_show(c.serviceType) == debug_show(serviceType)
          and debug_show(c.environment) == debug_show(env)
          and c.isActive) {
        found := ?c;
        break search;
      };
    };
    found
  };

  public query func getAllPaySprintCredentials() : async [PST.PaySprintCredential] {
    paysprintCredentials.values().toArray()
  };

  public func setPaySprintCredentialActive(id : Text, isActive : Bool) : async { #ok : PST.PaySprintCredential; #err : Text } {
    switch (paysprintCredentials.get(id)) {
      case null #err("Credential not found: " # id);
      case (?c) {
        let updated = { c with isActive; updatedAt = nowNat() };
        paysprintCredentials.add(id, updated);
        #ok(updated)
      };
    }
  };

  // ── Test connection ─────────────────────────────────────────────────────────

  public func testPaySprintConnection(
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found: " # credId);
      case (?cred) {
        let url     = baseUrl(cred.environment) # "/bus/getsource";
        let headers = buildPaySprintHeaders(cred);
        let start   = Time.now();
        let result = try {
          let body = await OutCall.httpGetRequest(url, headers, transform);
          #ok(body)
        } catch (e) {
          #err("Outcall failed: " # e.message())
        };
        let latency = Int.abs(Time.now() - start).toNat() / 1_000_000;
        let (respBody, isErr, errMsg) = switch result {
          case (#ok(b))  (b, false, null);
          case (#err(e)) (e, true,  ?e);
        };
        logAPICall(#bus, "/bus/getsource", cred.environment, "", respBody,
          if (isErr) 500 else 200, latency, isErr, errMsg);
        let updated : PST.PaySprintCredential = {
          cred with
          lastTestedAt   = ?(latency);
          lastTestResult = ?respBody;
          updatedAt      = nowNat();
        };
        paysprintCredentials.add(credId, updated);
        result
      };
    }
  };

  // ── Bus bookings ────────────────────────────────────────────────────────────

  public func searchBuses(
    source      : Text,
    destination : Text,
    date        : Text,
    credId      : Text,
    transform   : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url   = baseUrl(cred.environment) # "/bus/searchtrip";
        let body  = "{\"source\":\"" # source # "\",\"destination\":\"" # destination # "\",\"doj\":\"" # date # "\"}";
        let start = Time.now();
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        let latency = Int.abs(Time.now() - start).toNat() / 1_000_000;
        let (r, isErr, em) = switch result { case (#ok(v)) (v, false, null); case (#err(e)) (e, true, ?e) };
        logAPICall(#bus, "/bus/searchtrip", cred.environment, body, r,
          if (isErr) 500 else 200, latency, isErr, em);
        result
      };
    }
  };

  public func getBusSeatAvailability(
    tripId    : Text,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/bus/seatavailability";
        let body = "{\"id\":\"" # tripId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#bus, "/bus/seatavailability", cred.environment, body,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  public func blockBusSeat(
    tripId    : Text,
    seatName  : Text,
    fare      : Float,
    baseFare  : Float,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/bus/blockseat";
        let body = "{\"id\":\"" # tripId # "\",\"seatName\":\"" # seatName
          # "\",\"fare\":" # fare.toText() # ",\"baseFare\":" # baseFare.toText() # "}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#bus, "/bus/blockseat", cred.environment, body,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  public func bookBusTicket(
    booking   : PST.BusBooking,
    blockKey  : Text,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.BusBooking; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/bus/bookticket";
        let body = "{\"blockKey\":\"" # blockKey # "\",\"fare\":" # booking.fare.toText()
          # ",\"passengerName\":\"" # booking.passengerName
          # "\",\"passengerPhone\":\"" # booking.passengerPhone
          # "\",\"passengerEmail\":\"" # booking.passengerEmail
          # "\",\"source\":\"" # booking.source
          # "\",\"destination\":\"" # booking.destination
          # "\",\"doj\":\"" # booking.journeyDate # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        let id = genBusId();
        switch result {
          case (#err(e)) {
            logAPICall(#bus, "/bus/bookticket", cred.environment, body, e, 500, 0, true, ?e);
            #err(e)
          };
          case (#ok(resp)) {
            logAPICall(#bus, "/bus/bookticket", cred.environment, body, resp, 200, 0, false, null);
            let saved : PST.BusBooking = {
              booking with
              id;
              blockKey    = ?blockKey;
              status      = #confirmed;
              updatedAt   = nowNat();
              environment = cred.environment;
            };
            busBookings.add(id, saved);
            #ok(saved)
          };
        }
      };
    }
  };

  public func cancelBusTicket(
    bookingId : Text,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.BusBooking; #err : Text } {
    switch (busBookings.get(bookingId)) {
      case null #err("Booking not found: " # bookingId);
      case (?bk) {
        switch (getCred(credId)) {
          case null #err("Credential not found");
          case (?cred) {
            let url  = baseUrl(cred.environment) # "/bus/cancelticket";
            let tref = switch (bk.ticketRef) { case (?r) r; case null "" };
            let body = "{\"ticketRef\":\"" # tref # "\"}";
            let result = try {
              let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
              #ok(resp)
            } catch (e) { #err("Outcall failed: " # e.message()) };
            let updated = { bk with status = #cancelled; updatedAt = nowNat() };
            busBookings.add(bookingId, updated);
            logAPICall(#bus, "/bus/cancelticket", cred.environment, body,
              switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
            #ok(updated)
          };
        }
      };
    }
  };

  public query func getAllBusBookings() : async [PST.BusBooking] {
    busBookings.values().toArray()
  };

  public query func getBusBooking(id : Text) : async ?PST.BusBooking {
    busBookings.get(id)
  };

  public query func getBusBookingsByCustomer(customerId : Text) : async [PST.BusBooking] {
    busBookings.values().filter(
      func(b : PST.BusBooking) : Bool { b.customerId == customerId }
    ).toArray()
  };

  // ── Train bookings ──────────────────────────────────────────────────────────

  public func searchTrains(
    source      : Text,
    destination : Text,
    date        : Text,
    classType   : Text,
    credId      : Text,
    transform   : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/train/search";
        let body = "{\"source\":\"" # source # "\",\"destination\":\"" # destination
          # "\",\"doj\":\"" # date # "\",\"class\":\"" # classType # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#train, "/train/search", cred.environment, body,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  public func bookTrainTicket(
    booking   : PST.TrainBooking,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.TrainBooking; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/train/book";
        let body = "{\"trainNumber\":\"" # booking.trainNumber
          # "\",\"source\":\"" # booking.source
          # "\",\"destination\":\"" # booking.destination
          # "\",\"doj\":\"" # booking.journeyDate
          # "\",\"class\":\"" # booking.classType
          # "\",\"quota\":\"" # booking.quota # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        let id = genTrainId();
        switch result {
          case (#err(e)) {
            logAPICall(#train, "/train/book", cred.environment, body, e, 500, 0, true, ?e);
            #err(e)
          };
          case (#ok(resp)) {
            logAPICall(#train, "/train/book", cred.environment, body, resp, 200, 0, false, null);
            let saved : PST.TrainBooking = {
              booking with id;
              status      = #confirmed;
              updatedAt   = nowNat();
              environment = cred.environment;
            };
            trainBookings.add(id, saved);
            #ok(saved)
          };
        }
      };
    }
  };

  public func cancelTrainTicket(
    bookingId : Text,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.TrainBooking; #err : Text } {
    switch (trainBookings.get(bookingId)) {
      case null #err("Booking not found: " # bookingId);
      case (?bk) {
        switch (getCred(credId)) {
          case null #err("Credential not found");
          case (?cred) {
            let pnrVal = switch (bk.pnr) { case (?p) p; case null "" };
            let url    = baseUrl(cred.environment) # "/train/cancel";
            let body   = "{\"pnr\":\"" # pnrVal # "\"}";
            let result = try {
              let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
              #ok(resp)
            } catch (e) { #err("Outcall failed: " # e.message()) };
            let updated = { bk with status = #cancelled; updatedAt = nowNat() };
            trainBookings.add(bookingId, updated);
            logAPICall(#train, "/train/cancel", cred.environment, body,
              switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
            #ok(updated)
          };
        }
      };
    }
  };

  public query func getAllTrainBookings() : async [PST.TrainBooking] {
    trainBookings.values().toArray()
  };

  public query func getTrainBookingsByCustomer(customerId : Text) : async [PST.TrainBooking] {
    trainBookings.values().filter(
      func(b : PST.TrainBooking) : Bool { b.customerId == customerId }
    ).toArray()
  };

  // ── Flight bookings ─────────────────────────────────────────────────────────

  public func searchFlights(
    source      : Text,
    destination : Text,
    date        : Text,
    passengers  : Nat,
    cabinClass  : Text,
    credId      : Text,
    transform   : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/flight/searchflight";
        let body = "{\"source\":\"" # source # "\",\"destination\":\"" # destination
          # "\",\"doj\":\"" # date # "\",\"pax\":" # passengers.toText()
          # ",\"class\":\"" # cabinClass # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#flight, "/flight/searchflight", cred.environment, body,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  public func bookFlight(
    booking   : PST.FlightBooking,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.FlightBooking; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/flight/bookflight";
        let body = "{\"flightNumber\":\"" # booking.flightNumber
          # "\",\"source\":\"" # booking.source
          # "\",\"destination\":\"" # booking.destination
          # "\",\"doj\":\"" # booking.journeyDate
          # "\",\"class\":\"" # booking.cabinClass
          # "\",\"pax\":" # booking.passengers.size().toText() # "}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        let id = genFlightId();
        switch result {
          case (#err(e)) {
            logAPICall(#flight, "/flight/bookflight", cred.environment, body, e, 500, 0, true, ?e);
            #err(e)
          };
          case (#ok(resp)) {
            logAPICall(#flight, "/flight/bookflight", cred.environment, body, resp, 200, 0, false, null);
            let saved : PST.FlightBooking = {
              booking with id;
              status      = #confirmed;
              updatedAt   = nowNat();
              environment = cred.environment;
            };
            flightBookings.add(id, saved);
            #ok(saved)
          };
        }
      };
    }
  };

  public func cancelFlight(
    bookingId : Text,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.FlightBooking; #err : Text } {
    switch (flightBookings.get(bookingId)) {
      case null #err("Booking not found: " # bookingId);
      case (?bk) {
        switch (getCred(credId)) {
          case null #err("Credential not found");
          case (?cred) {
            let bref = switch (bk.bookingRef) { case (?r) r; case null "" };
            let url  = baseUrl(cred.environment) # "/flight/cancelflight";
            let body = "{\"bookingRef\":\"" # bref # "\"}";
            let result = try {
              let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
              #ok(resp)
            } catch (e) { #err("Outcall failed: " # e.message()) };
            let updated = { bk with status = #cancelled; updatedAt = nowNat() };
            flightBookings.add(bookingId, updated);
            logAPICall(#flight, "/flight/cancelflight", cred.environment, body,
              switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
            #ok(updated)
          };
        }
      };
    }
  };

  public query func getAllFlightBookings() : async [PST.FlightBooking] {
    flightBookings.values().toArray()
  };

  public query func getFlightBookingsByCustomer(customerId : Text) : async [PST.FlightBooking] {
    flightBookings.values().filter(
      func(b : PST.FlightBooking) : Bool { b.customerId == customerId }
    ).toArray()
  };

  // ── Utility payments ────────────────────────────────────────────────────────

  public func getRechargeOperators(
    operatorType : Text,
    credId       : Text,
    transform    : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url = baseUrl(cred.environment) # "/recharge/getoperator?type=" # operatorType;
        let result = try {
          let resp = await OutCall.httpGetRequest(url, buildPaySprintHeaders(cred), transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#recharge, "/recharge/getoperator", cred.environment,
          "type=" # operatorType,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  func saveUtilTx(
    tx      : PST.UtilityTransaction,
    env     : PST.PaySprintEnvironment,
    svcType : PST.PaySprintServiceType,
    ep      : Text,
    reqBody : Text,
    resp    : Text,
  ) : PST.UtilityTransaction {
    let id    = genUtilId();
    let saved : PST.UtilityTransaction = {
      tx with id; status = #success; updatedAt = nowNat(); environment = env;
    };
    utilityTransactions.add(id, saved);
    logAPICall(svcType, ep, env, reqBody, resp, 200, 0, false, null);
    saved
  };

  public func doRecharge(
    tx        : PST.UtilityTransaction,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.UtilityTransaction; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/recharge/dorecharge";
        let body = "{\"operator\":\"" # tx.operatorCode # "\",\"canumber\":\"" # tx.consumerNumber
          # "\",\"amount\":" # tx.amount.toText() # ",\"referenceid\":\"" # tx.referenceId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        switch result {
          case (#err(e)) {
            logAPICall(#recharge, "/recharge/dorecharge", cred.environment, body, e, 500, 0, true, ?e);
            #err(e)
          };
          case (#ok(resp)) {
            #ok(saveUtilTx(tx, cred.environment, #recharge, "/recharge/dorecharge", body, resp))
          };
        }
      };
    }
  };

  public func doFastTagRecharge(
    tx        : PST.UtilityTransaction,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.UtilityTransaction; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/recharge/dofastagrecharg";
        let body = "{\"operator\":\"" # tx.operatorCode # "\",\"canumber\":\"" # tx.consumerNumber
          # "\",\"amount\":" # tx.amount.toText() # ",\"referenceid\":\"" # tx.referenceId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        switch result {
          case (#err(e)) {
            logAPICall(#fastTag, "/recharge/dofastagrecharg", cred.environment, body, e, 500, 0, true, ?e);
            #err(e)
          };
          case (#ok(resp)) {
            #ok(saveUtilTx(tx, cred.environment, #fastTag, "/recharge/dofastagrecharg", body, resp))
          };
        }
      };
    }
  };

  public func getBillPaymentOperators(
    category  : Text,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url = baseUrl(cred.environment) # "/billpayment/getoperator?type=" # category;
        let result = try {
          let resp = await OutCall.httpGetRequest(url, buildPaySprintHeaders(cred), transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#billPayment, "/billpayment/getoperator", cred.environment, category,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  public func fetchBill(
    operator    : Text,
    consumerNum : Text,
    refId       : Text,
    credId      : Text,
    transform   : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/billpayment/fetchbill";
        let body = "{\"operator\":\"" # operator # "\",\"canumber\":\"" # consumerNum
          # "\",\"mode\":\"online\",\"ad1\":\"\",\"referenceid\":\"" # refId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#billPayment, "/billpayment/fetchbill", cred.environment, body,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  public func payBill(
    tx             : PST.UtilityTransaction,
    _billFetchData : Text,
    credId         : Text,
    transform      : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.UtilityTransaction; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/billpayment/paybill";
        let body = "{\"operator\":\"" # tx.operatorCode # "\",\"canumber\":\"" # tx.consumerNumber
          # "\",\"amount\":" # tx.amount.toText() # ",\"referenceid\":\"" # tx.referenceId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        switch result {
          case (#err(e)) {
            logAPICall(#billPayment, "/billpayment/paybill", cred.environment, body, e, 500, 0, true, ?e);
            #err(e)
          };
          case (#ok(resp)) {
            #ok(saveUtilTx(tx, cred.environment, #billPayment, "/billpayment/paybill", body, resp))
          };
        }
      };
    }
  };

  public func fetchLPGDetails(
    operator         : Text,
    caNumber         : Text,
    bookingMethod    : Nat,
    additionalFields : Text,
    refId            : Text,
    credId           : Text,
    transform        : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/lpg/fetchbill";
        let body = "{\"operator\":\"" # operator # "\",\"canumber\":\"" # caNumber
          # "\",\"ad1\":\"" # additionalFields
          # "\",\"ad2\":\"\",\"ad3\":\"\",\"ad4\":\"\",\"mode\":" # bookingMethod.toText()
          # ",\"referenceid\":\"" # refId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#lpg, "/lpg/fetchbill", cred.environment, body,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  public func payLPGBooking(
    tx        : PST.UtilityTransaction,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.UtilityTransaction; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/lpg/paybill";
        let body = "{\"operator\":\"" # tx.operatorCode # "\",\"canumber\":\"" # tx.consumerNumber
          # "\",\"amount\":" # tx.amount.toText() # ",\"referenceid\":\"" # tx.referenceId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        switch result {
          case (#err(e)) {
            logAPICall(#lpg, "/lpg/paybill", cred.environment, body, e, 500, 0, true, ?e);
            #err(e)
          };
          case (#ok(resp)) {
            #ok(saveUtilTx(tx, cred.environment, #lpg, "/lpg/paybill", body, resp))
          };
        }
      };
    }
  };

  public func fetchMunicipalityBill(
    operator    : Text,
    consumerNum : Text,
    refId       : Text,
    credId      : Text,
    transform   : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : Text; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/municipality/fetchbill";
        let body = "{\"operator\":\"" # operator # "\",\"canumber\":\"" # consumerNum
          # "\",\"mode\":\"online\",\"referenceid\":\"" # refId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        logAPICall(#municipality, "/municipality/fetchbill", cred.environment, body,
          switch result { case (#ok(v)) v; case (#err(e)) e }, 200, 0, false, null);
        result
      };
    }
  };

  public func payMunicipalityBill(
    tx        : PST.UtilityTransaction,
    credId    : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput,
  ) : async { #ok : PST.UtilityTransaction; #err : Text } {
    switch (getCred(credId)) {
      case null #err("Credential not found");
      case (?cred) {
        let url  = baseUrl(cred.environment) # "/municipality/paybill";
        let body = "{\"operator\":\"" # tx.operatorCode # "\",\"canumber\":\"" # tx.consumerNumber
          # "\",\"amount\":" # tx.amount.toText() # ",\"referenceid\":\"" # tx.referenceId # "\"}";
        let result = try {
          let resp = await OutCall.httpPostRequest(url, buildPaySprintHeaders(cred), body, transform);
          #ok(resp)
        } catch (e) { #err("Outcall failed: " # e.message()) };
        switch result {
          case (#err(e)) {
            logAPICall(#municipality, "/municipality/paybill", cred.environment, body, e, 500, 0, true, ?e);
            #err(e)
          };
          case (#ok(resp)) {
            #ok(saveUtilTx(tx, cred.environment, #municipality, "/municipality/paybill", body, resp))
          };
        }
      };
    }
  };

  public query func getAllUtilityTransactions() : async [PST.UtilityTransaction] {
    utilityTransactions.values().toArray()
  };

  public query func getUtilityTransactionsByCustomer(customerId : Text) : async [PST.UtilityTransaction] {
    utilityTransactions.values().filter(
      func(t : PST.UtilityTransaction) : Bool { t.customerId == customerId }
    ).toArray()
  };

  // ── Callback processing ─────────────────────────────────────────────────────

  public func processPaySprintCallback(
    body     : Text,
    _headers : [(Text, Text)],
  ) : async { #ok : Text; #err : Text } {
    let now = nowNat();
    let id  = genCbId();

    func extractField(src : Text, key : Text) : Text {
      let pattern = "\"" # key # "\":\"";
      if (not src.contains(#text pattern)) return "";
      let parts = src.split(#text pattern).toArray();
      if (parts.size() < 2) return "";
      let afterKey = parts[1];
      let valParts = afterKey.split(#text "\"").toArray();
      if (valParts.size() < 1) return "";
      valParts[0]
    };

    let eventType    = extractField(body, "eventType");
    let orderId      = extractField(body, "orderId");
    let status       = extractField(body, "status");
    let merchantCode = extractField(body, "merchantCode");
    let amountStr    = extractField(body, "amount");
    let amount : ?Float = switch (Int.fromText(amountStr)) {
      case null null;
      case (?i) ?i.toFloat();
    };

    let svcType : PST.PaySprintServiceType =
      if (eventType.startsWith(#text "BUS_"))         #bus
      else if (eventType.startsWith(#text "TRAIN_"))  #train
      else if (eventType.startsWith(#text "FLIGHT_")) #flight
      else if (eventType.startsWith(#text "RECHARGE_")) #recharge
      else                                             #billPayment;

    if (svcType == #bus and orderId != "") {
      switch (busBookings.get(orderId)) {
        case (?bk) {
          let newSt : PST.BookingStatus = if (status == "SUCCESS") #confirmed else #failed;
          busBookings.add(orderId, { bk with status = newSt; updatedAt = now });
        };
        case null {};
      };
    } else if (svcType == #train and orderId != "") {
      switch (trainBookings.get(orderId)) {
        case (?bk) {
          let newSt : PST.BookingStatus = if (status == "SUCCESS") #confirmed else #failed;
          trainBookings.add(orderId, { bk with status = newSt; updatedAt = now });
        };
        case null {};
      };
    } else if (svcType == #flight and orderId != "") {
      switch (flightBookings.get(orderId)) {
        case (?bk) {
          let newSt : PST.BookingStatus = if (status == "SUCCESS") #confirmed else #failed;
          flightBookings.add(orderId, { bk with status = newSt; updatedAt = now });
        };
        case null {};
      };
    };

    paysprintCallbacks.add(id, {
      id;
      eventType;
      serviceType  = svcType;
      referenceId  = orderId;
      orderId      = if (orderId == "") null else ?orderId;
      merchantCode = if (merchantCode == "") null else ?merchantCode;
      amount;
      status;
      rawPayload   = body;
      processedAt  = now;
      createdAt    = now;
    });

    logAPICall(svcType, "/paysprint/callback", #live, body, "{\"processed\":true}", 200, 0, false, null);
    #ok(id)
  };

  public query func getAllPaySprintCallbacks() : async [PST.PaySprintCallback] {
    paysprintCallbacks.values().toArray()
  };

  public query func getAllPaySprintAPILogs() : async [PST.PaySprintAPILog] {
    paysprintAPILogs.values().toArray()
  };

};
