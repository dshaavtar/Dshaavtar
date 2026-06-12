/// PaySprint integration types for bus, train, flight, recharge, bill payment,
/// fastTag, LPG, municipality, and insurance services.
/// Each credential is per-service and per-environment (UAT / Live).
module {

  // ---------------------------------------------------------------------------
  // Environment & service classification
  // ---------------------------------------------------------------------------

  public type PaySprintEnvironment = {
    #uat;
    #live;
  };

  public type PaySprintServiceType = {
    #bus;
    #train;
    #flight;
    #recharge;
    #billPayment;
    #fastTag;
    #lpg;
    #municipality;
    #insurance;
  };

  // ---------------------------------------------------------------------------
  // Booking / transaction status enumerations
  // ---------------------------------------------------------------------------

  public type BookingStatus = {
    #initiated;
    #pending;
    #confirmed;
    #cancelled;
    #failed;
    #refunded;
  };

  public type PaymentStatus = {
    #unpaid;
    #pending;
    #paid;
    #failed;
    #refunded;
  };

  public type TransactionStatus = {
    #pending;
    #success;
    #failed;
    #refunded;
  };

  // ---------------------------------------------------------------------------
  // Admin credential record (one per service × environment)
  // ---------------------------------------------------------------------------

  /// Stores PaySprint API credentials for a specific service and environment.
  /// UAT and Live credentials are kept completely separate.
  public type PaySprintCredential = {
    id             : Text;
    serviceType    : PaySprintServiceType;
    environment    : PaySprintEnvironment;
    partnerId      : Text;
    partnerKey     : Text;
    authorisedKey  : Text;
    baseUrl        : Text;
    isActive       : Bool;
    lastTestedAt   : ?Nat;
    lastTestResult : ?Text;
    createdAt      : Nat;
    updatedAt      : Nat;
  };

  // ---------------------------------------------------------------------------
  // Passenger helper (shared across train and flight)
  // ---------------------------------------------------------------------------

  public type PassengerDetail = {
    name     : Text;
    age      : Nat;
    gender   : Text;
    idType   : Text;
    idNumber : Text;
    phone    : Text;
    email    : Text;
  };

  // ---------------------------------------------------------------------------
  // Bus booking
  // ---------------------------------------------------------------------------

  public type BusBooking = {
    id              : Text;
    customerId      : Text;
    source          : Text;
    destination     : Text;
    journeyDate     : Text;
    operatorName    : Text;
    departureTime   : Text;
    arrivalTime     : Text;
    fare            : Float;
    seatNumbers     : [Text];
    passengerName   : Text;
    passengerPhone  : Text;
    passengerEmail  : Text;
    blockKey        : ?Text;
    ticketRef       : ?Text;
    pnr             : ?Text;
    status          : BookingStatus;
    paymentStatus   : PaymentStatus;
    transactionId   : ?Text;
    environment     : PaySprintEnvironment;
    createdAt       : Nat;
    updatedAt       : Nat;
  };

  // ---------------------------------------------------------------------------
  // Train booking
  // ---------------------------------------------------------------------------

  public type TrainBooking = {
    id            : Text;
    customerId    : Text;
    source        : Text;
    destination   : Text;
    journeyDate   : Text;
    trainNumber   : Text;
    trainName     : Text;
    classType     : Text;
    quota         : Text;
    fare          : Float;
    passengers    : [PassengerDetail];
    pnr           : ?Text;
    status        : BookingStatus;
    paymentStatus : PaymentStatus;
    transactionId : ?Text;
    environment   : PaySprintEnvironment;
    createdAt     : Nat;
    updatedAt     : Nat;
  };

  // ---------------------------------------------------------------------------
  // Flight booking
  // ---------------------------------------------------------------------------

  public type FlightBooking = {
    id            : Text;
    customerId    : Text;
    source        : Text;
    destination   : Text;
    journeyDate   : Text;
    airline       : Text;
    flightNumber  : Text;
    cabinClass    : Text;
    fare          : Float;
    passengers    : [PassengerDetail];
    bookingRef    : ?Text;
    pnr           : ?Text;
    status        : BookingStatus;
    paymentStatus : PaymentStatus;
    transactionId : ?Text;
    environment   : PaySprintEnvironment;
    createdAt     : Nat;
    updatedAt     : Nat;
  };

  // ---------------------------------------------------------------------------
  // Utility transaction (recharge, bill payment, fastTag, LPG, municipality, insurance)
  // ---------------------------------------------------------------------------

  public type UtilityTransaction = {
    id             : Text;
    customerId     : Text;
    serviceType    : PaySprintServiceType;
    operatorName   : Text;
    operatorCode   : Text;
    consumerNumber : Text;
    amount         : Float;
    billAmount     : ?Float;
    status         : TransactionStatus;
    transactionId  : ?Text;
    referenceId    : Text;
    receiptNumber  : ?Text;
    environment    : PaySprintEnvironment;
    createdAt      : Nat;
    updatedAt      : Nat;
  };

  // ---------------------------------------------------------------------------
  // Webhook callback payload (recorded verbatim for audit / replay)
  // ---------------------------------------------------------------------------

  public type PaySprintCallback = {
    id           : Text;
    eventType    : Text;
    serviceType  : PaySprintServiceType;
    referenceId  : Text;
    orderId      : ?Text;
    merchantCode : ?Text;
    amount       : ?Float;
    status       : Text;
    rawPayload   : Text;
    processedAt  : Nat;
    createdAt    : Nat;
  };

  // ---------------------------------------------------------------------------
  // API call log (one row per outgoing HTTP request)
  // ---------------------------------------------------------------------------

  public type PaySprintAPILog = {
    id           : Text;
    serviceType  : PaySprintServiceType;
    endpoint     : Text;
    environment  : PaySprintEnvironment;
    requestBody  : Text;
    responseBody : Text;
    httpStatus   : Nat;
    latencyMs    : Nat;
    isError      : Bool;
    errorMessage : ?Text;
    createdAt    : Nat;
  };

};
