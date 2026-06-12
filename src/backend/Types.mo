module {

  // ── Enumerations ──────────────────────────────────────────────────────────

  public type UserRole = { #customer; #merchant; #deliveryPartner; #sarthi; #admin };

  public type VerificationStatus = { #pending; #verified; #rejected };

  public type OrderStatus = {
    #new_;
    #pending;
    #accepted;
    #rejected;
    #assigned;
    #inTransit;
    #delivered;
    #paymentCollected;
    #vendorSettled;
    #completed;
    #cancelled;
    #expired;
  };

  public type OrderStatusHistory = {
    status    : OrderStatus;
    actor_    : Text;
    note      : ?Text;
    timestamp : Int;
  };

  public type PaymentMode = { #cod; #online; #qrCode };

  public type PaymentStatus = { #pending; #partialPaid; #paid; #refunded };

  public type DeliveryType = { #takeaway; #delivery };

  public type MerchantType = { #order_; #inquiry };

  public type VehicleType = {
    #bike;
    #scooter;
    #car;
    #auto;
    #van;
    #truck;
    #tempo;
    #bus;
  };

  public type ServiceType = { #delivery; #sarthi };

  public type PropertyListingType = { #rent; #lease; #buy; #sale };

  public type ProductCondition = { #new_; #refurbished };

  public type JobListingType = { #looking; #posting };

  public type TransportStatus = {
    #pending;
    #accepted;
    #headingToPickup;
    #arrived;
    #rideStarted;
    #onTheWay;
    #arrivedDestination;
    #paymentCollected;
    #completed;
    #cancelled;
  };

  public type SubscriptionPlanType = {
    #free_;
    #weekly;
    #monthly;
    #category;
    #duration;
    #flat;
    #percentage;
  };

  public type KYCStatus = { #pending; #approved; #rejected };

  public type ConversationState = {
    // ── Entry / Auth ──────────────────────────────────────────────────────────
    #welcome;
    #roleSelect;
    #authPassdigit;
    #authPassdigitWrong;
    #authOtpSent;
    #authOtpVerify;
    #authSetNewPassdigit;
    #authConfirmPassdigit;
    #authSessionLocked;
    // ── Customer Registration ─────────────────────────────────────────────────
    #custRegName;
    #custRegLocation;
    #custRegOtp;
    #custSetPassdigit;
    #custConfirmPassdigit;
    // ── Merchant Registration ─────────────────────────────────────────────────
    #merchantRegName;
    #merchantRegOutlet;
    #merchantRegCategory;
    #merchantRegDeliveryType;
    #merchantRegType;
    #merchantRegPayment;
    #merchantRegAdvance;
    #merchantRegBooking;
    #merchantRegRental;
    #merchantRegRadius;
    #merchantRegMultibranch;
    #merchantRegBranchAddr;
    #merchantRegBranchRadius;
    #merchantRegBranchMore;
    #merchantSetPassdigit;
    #merchantConfirmPassdigit;
    // ── Delivery Partner Registration ─────────────────────────────────────────
    #dpRegName;
    #dpRegType;
    #dpRegAadhaar;
    #dpRegRc;
    #dpRegPan;
    #dpRegVehicle;
    #dpSetPassdigit;
    #dpConfirmPassdigit;
    // ── Customer Menu / Location ──────────────────────────────────────────────
    #customerMenu;
    #customerLocation;
    #customerLocationConfirm;
    // ── Order / Shopping ──────────────────────────────────────────────────────
    #orderCategory;
    #orderSearch;
    #orderSearchInput;
    #orderResults;
    #orderNotFound;
    #orderSearchFurther;
    #orderCart;
    #orderConfirm;
    #orderPlaced;
    #orderTracking;
    #inquirySent;
    #inquiryResult;
    // ── Custom / Manual Order Flow ────────────────────────────────────────────
    #customOrderItem;       // customer enters item name/brand/quantity
    #customOrderConfirm;    // customer confirms custom order
    #customOrderTracking;   // customer waits for merchant to price
    // ── Merchant Menu ─────────────────────────────────────────────────────────
    #merchantMenu;
    #merchantOrders;
    #merchantOrderDetail;
    #merchantAddProductTitle;
    #merchantAddProductDesc;
    #merchantAddProductImage;
    #merchantAddProductImageLink;
    #merchantAddProductVideo;
    #merchantAddProductCondition;
    #merchantAddProductRate;
    #merchantAddProductBulk;
    #merchantAddProductDiscount;
    #merchantAddProductConfirm;
    // ── Delivery Partner Menu ─────────────────────────────────────────────────
    #dpMenu;
    #dpOrders;
    #dpOrderDetail;
    // ── Job Board ─────────────────────────────────────────────────────────────
    #jobMenu;
    #jobPostTitle;
    #jobPostDesc;
    #jobPostSalary;
    #jobPostLocation;
    #jobPostConfirm;
    #jobSearchResults;
    #jobContactRequest;
    // ── Property Board ────────────────────────────────────────────────────────
    #propertyMenu;
    #propertyPostCategory;
    #propertyPostType;
    #propertyPostDesc;
    #propertyPostPrice;
    #propertyPostLocation;
    #propertyPostConfirm;
    #propertySearchResults;
    #propertyContactRequest;
    // ── Transport / Sarthi ────────────────────────────────────────────────────
    #transportMenu;
    #transportOrigin;
    #transportDest;
    #transportVehicle;
    #transportEstimate;
    #transportBooked;
    #transportTracking;
    #sarthiMenu;
    #sarthiOrders;
    #sarthiOrderDetail;
    // ── Legacy / Aliases (kept for backward compat) ───────────────────────────
    #registerType;
    #registerCustomer;
    #registerMerchant;
    #registerDeliveryPartner;
    #mainMenu;
    #orderSearch2; // alias
    #merchantActions;
    #merchantOrderList;
    #merchantViewOrder;
    #merchantAccept;
    #merchantReject;
    #merchantFulfill;
    #merchantCollectionPending;
    #merchantComplete;
    #deliveryActions;
    #dpAvailableOrders;
    #dpAccept;
    #dpPickupInstructions;
    #dpPickupConfirmed;
    #dpDeliveryInstructions;
    #dpCollectPayment;
    #dpPaymentConfirmed;
    #dpVendorSettlement;
    #dpComplete;
    #jobBrowse;
    #jobSearch;
    #jobRequestContact;
    #jobPost;
    #jobPostTitle2;
    #jobPostDesc2;
    #jobPostCategory;
    #jobPostSalaryMin;
    #jobPostSalaryMax;
    #jobPostLocation2;
    #jobPublished;
    #jobMyListings;
    #jobMyListings2;
    #approveJobContact;
    #jobContactApproval;
    #propertyBrowse;
    #propertySearch;
    #propertyRequestContact;
    #propertyPost;
    #propertyPostType2;
    #propertyPostDesc2;
    #propertyPostPrice2;
    #propertyPostLocation2;
    #propertyPublished;
    #propertyMyListings;
    #approvePropertyContact;
    #propertyContactApproval;
    #otpVerify;
    #subscriptionPrompt;
    // ── Event Flow ────────────────────────────────────────────────────────────
    #eventMenu;
    #eventPostName;
    #eventPostDesc;
    #eventPostPaid;
    #eventPostPrice;
    #eventPostLocation;
    #eventPostDates;
    #eventPostTickets;
    #eventPublished;
    #eventSearch;
    // ── Family Flow ───────────────────────────────────────────────────────────
    #familyMenu;
    #familyAddSelfName;
    #familyAddSelfSurname;
    #familyAddRelationship;
    #familyAddRelationName;
    #familyAddPhone;
    #familyAddAddress;
    #familyAddGender;
    #familyAddMatrimonyEligible;
    #familyAddCaste;
    #familyAddOccupation;
    #familyAddEducation;
    #familyAddLocationPref;
    #familyAddBloodGroup;
    #familySaved;
    // ── New Service Flows ─────────────────────────────────────────────────────
    #healthcareMenu;
    #healthcareSearch;
    #healthcareBooking;
    #professionalServicesMenu;
    #professionalServicesSearch;
    #toursMenu;
    #toursSearch;
    #donationsMenu;
    // ── Promotion / Advertisement Flow ────────────────────────────────────────
    #promotionMenu;
    #promotionPostTitle;
    #promotionPostReelLink;
    #promotionPostImageLink;
    #promotionPostLocation;
    #promotionPlanSelect;
    #promotionPayment;
    #promotionPendingApproval;
    // ── Sarthi Free Ride / OTP ────────────────────────────────────────────────
    #sarthiFreeRideOTP;
    #sarthiPassengerOTPVerify;
    // ── Free Ride Sharing (customer-side) ─────────────────────────────────────
    #freeRideSearch;        // customer: enter source
    #freeRideSearchDest;    // customer: enter destination
    #freeRideResults;       // customer: view matching sarthis
    #freeRideOTPEntry;      // customer: enter OTP given by driver
    #freeRideCompleted;     // customer: ride done, rate
    #freeRideIncoming;      // sarthi: incoming free ride request to accept/reject
    #freeRideSearchAgain;   // customer: no rides / ride declined → search again
    #rideDeclined;          // customer: sarthi declined regular ride, search again option
    // ── Support Ticket Flow ───────────────────────────────────────────────────
    #supportMenu;
    #supportDescInput;
    #supportConfirm;
    // ── Shuttle Service ───────────────────────────────────────────────────────
    #shuttleMenu;
    #shuttleSearchSource;
    #shuttleSearchDest;
    #shuttleResults;
    #shuttleBookConfirm;
    #shuttleBooked;
    // ── Supplier Order Flow ────────────────────────────────────────────────────
    #supplierOrderSupplier;   // merchant enters supplier name/phone
    #supplierOrderItem;       // merchant enters item name
    #supplierOrderQty;        // merchant enters quantity and unit
    #supplierOrderNotes;      // merchant enters optional notes
    #supplierOrderConfirm;    // merchant confirms supplier order
    #supplierOrderDone;       // supplier order placed

    // ── PaySprint Flow States ──────────────────────────────────────────────────
    #payBillsMenu;    // customer: pick bill/recharge sub-service
    #busBookingMenu;  // customer: bus ticket flow entry
    #trainBookingMenu; // customer: train ticket flow entry
    #flightBookingMenu; // customer: flight booking flow entry
    #supplierOrderList;       // view my supplier orders
  };

  public type NotificationStatus = { #pending; #sent; #failed };

  public type MessageSender = { #user; #bot };

  // ── Primitives ────────────────────────────────────────────────────────────

  public type Location = { lat : Float; lng : Float; address : Text };

  public type KYCDocuments = {
    panNumber : ?Text;
    panImageUrl : ?Text;
    aadhaarNumber : ?Text;
    aadhaarImageUrl : ?Text;
    gstNumber : ?Text;
    gstImageUrl : ?Text;
    outletPhotoUrl : ?Text;
    cancelledChequeUrl : ?Text;
    personalQRUrl : ?Text;
    verificationStatus : VerificationStatus;
  };

  public type Branch = {
    address : Text;
    location : Location;
    deliveryRadius : Float;
    isActive : Bool;
  };

  public type BulkRate = { minQuantity : Nat; rate : Float };

  // ── Core Entities ─────────────────────────────────────────────────────────

  public type User = {
    id : Text;
    phone : Text;
    name : Text;
    gender : Text;   // "Male" | "Female" | "Other" | ""
    role : UserRole;
    location : ?Location;
    address : ?Text;
    registrationDate : Int;
    subscriptionPlanId : ?Text;
    conversationState : ConversationState;
    stateData : Text;
    isActive : Bool;
    otpVerified : Bool;
    passdigit : Text;
    passdigitAttempts : Nat;
    sessionLocked : Bool;
    sessionLockExpiry : Int;
    otpCode : Text;
    otpExpiry : Int;
    // ── Localization ──────────────────────────────────────────────────────────
    countryCode  : Text;   // e.g. "IN", "US", "AE"
    currency     : Text;   // e.g. "INR", "USD", "AED"
    countryName  : Text;   // e.g. "India", "USA", "UAE"
    // ── Contact Import ────────────────────────────────────────────────────────
    importedByMerchant : ?Text;  // merchant name who uploaded this contact
    promotionalOptOut  : Bool;   // default false
    importBatchId      : ?Text;  // batch ID from bulk import
  };

  public type Merchant = {
    id : Text;
    userId : Text;
    phone : Text;              // merchant contact phone — never masked
    businessName : Text;
    category : Text;
    merchantType : MerchantType;
    bookingAllowed : Bool;
    rentalAllowed : Bool;
    location : Location;
    deliveryType : DeliveryType;
    deliveryRadius : Float;
    branches : [Branch];
    menuProductIds : [Text];
    kyc : KYCDocuments;
    codAvailable : Bool;
    avgRating : Float;
    ratingCount : Nat;
    isOndcEnrolled : Bool;
    isActive : Bool;
    isVerified : Bool;
    rejectionReason : ?Text;
    boostedOrderCount : Nat;   // admin-set fake order count to boost displayed sales
    blockedUntil : ?Int;       // nanosecond timestamp; null = not blocked
    customerCount : Nat;       // number of unique customers who ordered from this merchant
    orderCount    : Nat;       // total number of completed orders for this merchant
  };

  public type DeliveryPartner = {
    id : Text;
    userId : Text;
    phone : Text;           // delivery partner contact phone — never masked
    name : Text;
    vehicleType : VehicleType;
    serviceType : ServiceType;
    ratePerKm : Float;
    otherPlatforms : [Text];
    selfieUrl : ?Text;
    aadhaarUrl : ?Text;
    panUrl : ?Text;
    rcUrl : ?Text;
    avgRating : Float;
    ratingCount : Nat;
    isOnline : Bool;
    currentLocation : ?Location;
    isOndcEnrolled : Bool;
    isVerified : Bool;
    kycStatus : KYCStatus;
    aadhaarNo : Text;
    rcBook : Text;
    panNo : Text;
    rejectionReason : ?Text;
    blockedUntil : ?Int;   // nanosecond timestamp; null = not blocked
  };

  public type Product = {
    id : Text;
    merchantId : Text;
    title : Text;
    imageUrls : [Text];
    videoUrl : ?Text;
    description : Text;
    isNew : Bool;
    baseRate : Float;
    bulkRates : [BulkRate];
    specialDiscount : Float;
    isActive : Bool;
    // ── Extended fields ───────────────────────────────────────────────────────
    qty          : Nat;    // quantity available in stock
    packing      : Text;   // packing info e.g. "500ml", "1kg", "12 pcs"
    expiry       : Text;   // expiry date as text e.g. "Dec 2025", "NA"
    barcodeValue : ?Text;  // optional barcode / EAN / QR value
  };

  /// Scan history entry — records every product barcode scan by a merchant device
  public type ProductScanHistory = {
    id           : Text;
    productId    : Text;
    barcodeValue : Text;
    merchantId   : Text;
    scanTime     : Int;
    deviceInfo   : ?Text;
  };

  /// Input for creating a scan history entry
  public type ProductScanHistoryInput = {
    productId    : Text;
    barcodeValue : Text;
    merchantId   : Text;
    deviceInfo   : ?Text;
  };

  /// Input record for bulk product creation (from Excel / photo menu upload)
  public type ProductInput = {
    title           : Text;
    description     : Text;
    brand           : Text;
    imageUrl        : Text;          // primary image URL
    imageUrls       : [Text];
    instagramLink   : ?Text;         // Instagram/Pinterest image link
    youtubeLink     : ?Text;         // YouTube video link
    videoUrl        : ?Text;
    condition       : Text;          // "new" | "refurbished"
    isNew           : Bool;
    mrp             : Float;         // maximum retail price
    baseRate        : Float;
    bulkRate        : Float;         // bulk price per unit
    bulkMinQty      : Nat;           // minimum qty for bulk rate
    bulkRates       : [BulkRate];
    schemeDiscount  : Float;         // promotional/scheme discount %
    specialDiscount : Float;
    purchaseRate    : Float;         // cost price
    purchasedFrom   : Text;          // supplier name
    // ── Extended fields ───────────────────────────────────────────────────────
    qty     : Nat;    // quantity available
    packing : Text;   // packing info
    expiry  : Text;   // expiry date as text
  };

  // ── Manual / Custom Order ─────────────────────────────────────────────────

  public type ManualOrderItem = {
    itemName  : Text;
    brand     : Text;
    quantity  : Nat;
  };

  // ── Customer Rating ───────────────────────────────────────────────────────

  public type CustomerRating = { #good; #neutral; #bad };

  public type OrderItem = {
    productId : Text;
    productName : Text;
    quantity : Nat;
    unitRate : Float;
    totalRate : Float;
  };

  public type CartItem = {
    productId : Text;
    merchantId : Text;
    title : Text;
    quantity : Nat;
    rate : Float;
  };

  public type Order = {
    id : Text;
    customerId : Text;
    merchantId : Text;
    deliveryPartnerId : ?Text;
    items : [OrderItem];
    manualItems : [ManualOrderItem];   // for manual/custom orders
    isManualOrder : Bool;
    ondcSource    : Bool;              // true when order comes via ONDC
    status : OrderStatus;
    totalAmount : Float;
    deliveryCharge : Float;
    surgeCharge : Float;
    paymentMode : PaymentMode;
    paymentStatus : PaymentStatus;
    customerAddress : ?Location;
    merchantBranch : ?Branch;
    createdAt : Int;
    acceptedAt : ?Int;
    assignedAt : ?Int;
    completedAt : ?Int;
    cancelledAt : ?Int;
    notes : ?Text;
    searchQuery : ?Text;
    searchImageUrl : ?Text;
    merchantAcceptedAt      : ?Int;
    dpAcceptedAt            : ?Int;
    pickedUpAt              : ?Int;
    deliveredAt             : ?Int;
    paymentCollectedAt      : ?Int;
    vendorSettledAt         : ?Int;
    rejectionReason         : ?Text;
    customerRatingValue     : ?CustomerRating;
    customerRating          : ?Nat;
    merchantRating          : ?Nat;
    dpRating                : ?Nat;
    paymentCollectedAmount  : Nat;
    vendorSettlementAmount  : Nat;
    statusHistory           : [OrderStatusHistory];
  };

  public type Lead = {
    id : Text;
    phone : Text;
    searchQuery : Text;
    category : Text;
    location : Location;
    status : LeadStatus;
    createdAt : Int;
  };

  public type LeadStatus = { #open; #responded; #closed };

  public type TransportBooking = {
    id : Text;
    customerId : Text;
    customerContactNo : Text;
    sarthiPartnerId : ?Text;
    partnerContactNo : Text;
    origin : Location;
    destination : Location;
    vehicleType : VehicleType;
    estimatedCharge : Float;
    status : TransportStatus;
    statusHistory : [OrderStatusHistory];
    createdAt : Int;
    updatedAt : Int;
  };

  public type EarningsSummary = {
    totalEarnings : Float;
    dailyEarnings : Float;
    monthlyEarnings : Float;
    completedTrips : Nat;
  };

  public type OrderGroup = {
    merchantId : Text;
    items : [OrderItem];
    subtotal : Float;
    deliveryCharge : Float;
  };

  public type JobType = { #permanent; #adhoc_daily; #adhoc_weekly; #oneoff };

  public type Job = {
    id : Text;
    posterId : Text;
    title : Text;
    description : Text;
    category : Text;
    salaryMin : Float;
    salaryMax : Float;
    location : Location;
    publishDate : Int;
    endDate : Int;
    isOpen : Bool;
    leads : [ContactRequest];
    // ── Adhoc fields ──────────────────────────────────────────────────────────
    jobType        : JobType;          // defaults to #permanent for existing jobs
    pricePerDay    : ?Float;           // price for adhoc jobs
    educationLevel : ?Text;            // e.g. "No requirement", "10th Pass", "Graduate"
    expiresAt      : ?Int;             // adhoc jobs expire after 24h (nanoseconds timestamp)
    isAdhoc        : Bool;             // true when jobType != #permanent
    contactPhone   : ?Text;            // direct contact phone for adhoc jobs
  };

  public type Property = {
    id : Text;
    posterId : Text;
    listingType : PropertyListingType;
    description : Text;
    expectedPrice : Float;
    location : Location;
    publishDate : Int;
    endDate : Int;
    isActive : Bool;
    leads : [ContactRequest];
  };

  public type ContactRequest = {
    requesterId : Text;
    requesterPhone : Text;
    requesterName : Text;
    status : ContactRequestStatus;
    requestedAt : Int;
  };

  public type ContactRequestStatus = { #pending; #approved; #declined };

  // ── Sarthi Pending Ride Summary ───────────────────────────────────────────

  /// Summary of a pending ride for sarthi partner — exposes only total fare.
  public type SarthiPendingRide = {
    id                 : Text;
    customerId         : Text;
    customerName       : Text;
    pickupAddress      : Text;
    destinationAddress : Text;
    vehicleType        : VehicleType;
    estimatedFare      : Float;
    status             : TransportStatus;
    createdAt          : Int;
  };

  // ── AI Moderation ────────────────────────────────────────────────────────

  public type ModerationStatus = {
    status    : Text;   // "pending" | "approved" | "rejected"
    remark    : Text;
    checkedAt : Int;
  };

  public type ModerationItem = {
    entityType : Text;   // "merchant" | "product" | "deliveryPartner" | "promotion" | "event"
    entityId   : Text;
    status     : Text;   // "pending" | "approved" | "rejected"
    remark     : Text;
    checkedAt  : Int;
  };

  // ── Tip System ────────────────────────────────────────────────────────────

  public type TipRecord = {
    id           : Text;
    entityId     : Text;   // orderId or rideId
    entityType   : Text;   // "order" | "ride"
    amount       : Nat;    // 20 | 50 | 70 | 100
    fromCustomerId : Text;
    toPartnerId  : Text;
    timestamp    : Int;
  };

  // ── Chatbot / Conversation ────────────────────────────────────────────────

  public type ConversationMessage = {
    id : Text;
    sender : MessageSender;
    content : Text;
    timestamp : Int;
    messageType : Text;
  };

  public type ConversationSession = {
    phoneNumber  : Text;
    userId       : ?Text;
    currentState : ConversationState;
    stateData    : Text;
    messages     : [ConversationMessage];
    lastActivity : Int;
    language     : Text;   // e.g. "en", "hi", "mr", "ta", "te" etc.
  };

  public type QuickReply = { id : Text; title : Text; payload : Text };

  public type BotMessage = {
    to          : Text;
    messageType : Text;
    body        : Text;
    quickReplies : [QuickReply];
    footer      : ?Text;
    languageKey : Text;   // e.g. "en", "hi" — so frontend can localise
  };

  // ── Subscriptions ─────────────────────────────────────────────────────────

  public type SubscriptionPlan = {
    id : Text;
    name : Text;
    planType : SubscriptionPlanType;
    targetRole : UserRole;
    priceFlat : Float;
    pricePercentage : Float;
    orderLimit : Nat;
    inquiryLimit : Nat;
    durationDays : Nat;
    features : [Text];
    isActive : Bool;
    categoryScope : ?Text;
    flatFee : ?Float;
    percentageFee : ?Float;
    minTransactionAmount : ?Float;
    maxTransactionAmount : ?Float;
    applicableRoles : [UserRole];
    // WhatsApp Meta message category alignment
    messageType : Text;   // "utility" | "authentication" | "marketing" | "service"
    utilityLimit : Nat;   // monthly utility messages
    authLimit    : Nat;   // monthly authentication messages
    marketingLimit : Nat; // monthly marketing messages
    // Dynamic QR code data: "upi://pay?pa=whatscart@upi&pn=WhatsCart&am={amount}&cu=INR&tn=Plan-{planName}"
    qrCodeData : Text;
  };

  public type UserSubscription = {
    id : Text;
    userId : Text;
    planId : Text;
    startDate : Int;
    endDate : Int;
    ordersUsed : Nat;
    inquiriesUsed : Nat;
    isActive : Bool;
  };

  public type SubscriptionStatus = {
    #active : UserSubscription;
    #assignedFree : UserSubscription;
    #noSubscription;
  };

  // ── Notifications ─────────────────────────────────────────────────────────

  public type Notification = {
    id : Text;
    userId : Text;
    recipientPhone : Text;
    notificationType : Text;
    message : Text;
    status : NotificationStatus;
    createdAt : Int;
    sentAt : ?Int;
  };

  // ── Delivery ──────────────────────────────────────────────────────────────

  public type DeliveryRateCard = {
    id : Text;
    vehicleType : VehicleType;
    serviceType : ServiceType;
    baseRate : Float;
    perKmRate : Float;
    surgeMultiplier : Float;
    isActive : Bool;
  };

  // ── Rate Card (alias for admin panel) ────────────────────────────────────

  public type RateCard = {
    id : Text;
    vehicleType : VehicleType;
    serviceType : ServiceType;
    baseRate : Float;
    perKmRate : Float;
    surgeMultiplier : Float;
    isActive : Bool;
    updatedAt : Int;
  };

  // ── ONDC ──────────────────────────────────────────────────────────────────

  public type OndcSetupGuide = {
    step : Nat;
    title : Text;
    description : Text;
    actionRequired : Text;
    helpUrl : Text;
    isRequired : Bool;
  };

  public type OndcFAQ = {
    question : Text;
    answer : Text;
  };

  public type OndcEnrollment = {
    id : Text;
    userId : Text;
    role : UserRole;
    businessName : Text;
    gstin : ?Text;
    fssaiLicense : ?Text;
    bankAccount : Text;
    ifscCode : Text;
    enrollmentStatus : VerificationStatus;
    submittedAt : Int;
    reviewedAt : ?Int;
    notes : ?Text;
  };

  // ── WhatsApp / Admin ──────────────────────────────────────────────────────

  public type WhatsAppConfig = {
    apiKey : Text;
    phoneNumberId : Text;
    webhookUrl : Text;
    verifyToken : Text;
    isTestMode : Bool;
    isConnected : Bool;
  };

  public type AdminUser = {
    id : Text;
    principal : Text;
    name : Text;
    email : Text;
    createdAt : Int;
    lastLogin : ?Int;
  };

  // ── Employee / Role Management ────────────────────────────────────────────

  public type EmployeeRole = { #admin; #manager; #agent };

  public type Employee = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    passwordHash : Text;
    role : EmployeeRole;
    permissions : [Text];
    isActive : Bool;
    createdAt : Int;
  };

  // ── API Keys ──────────────────────────────────────────────────────────────

  public type ApiKey = {
    id : Text;
    key : Text;
    ownerId : Text;
    keyLabel : Text;
    usageCount : Nat;
    lastUsed : ?Int;
    isActive : Bool;
    createdAt : Int;
  };

  public type ApiUsageLog = {
    keyId : Text;
    endpoint : Text;
    timestamp : Int;
    statusCode : Nat;
  };

  // ── Dashboard Stats ───────────────────────────────────────────────────────

  public type DashboardStats = {
    totalUsers : Nat;
    totalMerchants : Nat;
    totalDeliveryPartners : Nat;
    totalOrders : Nat;
    totalJobs : Nat;
    totalProperties : Nat;
    totalLeads : Nat;
    totalRevenue : Float;
    pendingKYC : Nat;
    activeOrders : Nat;
    totalEvents : Nat;
    totalFamilyMembers : Nat;
    totalPromotions : Nat;
    activePromotions : Nat;
  };

  // ── Shuttle Service ───────────────────────────────────────────────────────

  /// Rich stop record for shuttle routes
  public type ShuttleStop = {
    stopName               : Text;
    fareDescription        : Text;   // e.g. "₹30 from Andheri"
    estimatedArrivalMinutes : Nat;   // minutes from route start
    location               : Text;   // address / landmark
  };

  public type ShuttleRoute = {
    id            : Text;
    routeName     : Text;
    serviceName   : Text;
    vehicleNumber : Text;          // vehicle registration number e.g. MH12AB1234
    source        : Text;
    destination   : Text;
    stops         : [Text];        // legacy simple stop names (kept for compat)
    stopDetails   : [ShuttleStop]; // rich stop details
    vehicleType   : VehicleType;
    departureTime : Text;
    arrivalTime   : Text;
    fare          : Nat;
    pricePerKm    : Float;         // price per km for fare calculation
    availableSeats : Nat;
    driverId      : Text;
    operatorPhone : Text;
    isActive      : Bool;          // active/deactivated by admin or operator
    status        : { #active; #inactive };
    createdAt     : Int;
  };

  // ── Supplier Order ────────────────────────────────────────────────────────

  public type SupplierOrderStatus = { #pending; #confirmed; #shipped; #received; #cancelled };

  public type SupplierOrder = {
    id              : Text;
    merchantId      : Text;
    supplierContact : Text;   // phone or name of supplier
    itemName        : Text;
    quantity        : Text;   // e.g. "50 kg", "100 pcs"
    notes           : Text;
    status          : SupplierOrderStatus;
    createdAt       : Int;
    updatedAt       : Int;
  };

  // ── Restock Order ─────────────────────────────────────────────────────────

  public type RestockStatus = { #pending; #accepted; #delivered; #cancelled };

  public type RestockOrder = {
    id            : Text;
    merchantId    : Text;
    merchantPhone : Text;
    supplierName  : Text;
    itemName      : Text;
    quantity      : Nat;
    notes         : Text;
    status        : RestockStatus;
    createdAt     : Int;
    updatedAt     : Int;
  };

  // ── Free Ride Sarthi Registration ─────────────────────────────────────────

  public type FreeRideSarthi = {
    id          : Text;
    sarthiPhone : Text;
    vehicleType : VehicleType;
    serviceArea : Text;
    isActive    : Bool;
    createdAt   : Int;
  };

  public type ShuttleBookingStatus = { #confirmed; #boarded; #completed; #cancelled };

  public type ShuttleBooking = {
    id             : Text;
    passengerPhone : Text;
    routeId        : Text;
    boardingStop   : Text;
    dropStop       : Text;
    fare           : Nat;
    otp            : Text;
    status         : ShuttleBookingStatus;
    createdAt      : Int;
  };

  // ── Entity View / Interest Tracking ──────────────────────────────────────

  public type EntityView = {
    phone     : Text;
    timestamp : Int;
  };

  public type EntityLeads = {
    entityType   : Text;
    entityId     : Text;
    viewers      : [EntityView];
    interested   : [EntityView];
  };

  // ── Flow Designer / Pipeline ──────────────────────────────────────────────

  public type FlowDefinition = {
    id          : Text;
    name        : Text;
    environment : Text;   // "live" or "test"
    flowJson    : Text;   // serialized flow graph JSON
    version     : Nat;
    createdAt   : Int;
    updatedAt   : Int;
  };

  // ── Family Connect Request ─────────────────────────────────────────────────

  public type FamilyConnectRequestStatus = { #pending; #accepted; #cancelled };

  public type FamilyConnectRequest = {
    id           : Text;
    fromPhone    : Text;
    toPhone      : Text;
    relationship : Text;
    groupName    : Text;
    address      : Text;
    status       : FamilyConnectRequestStatus;
    createdAt    : Int;
  };

  // ── Admin Config (for UPI and system settings) ────────────────────────────

  public type AdminConfig = {
    upiId   : Text;
    upiName : Text;
    baseUrl : Text;
    webhookUrl : Text;
  };

  // ── POS OTP ───────────────────────────────────────────────────────────────

  public type POSOTPRecord = {
    phone     : Text;
    role      : Text;   // "merchant" | "deliveryPartner"
    otp       : Text;
    expiresAt : Int;    // nanoseconds
    used      : Bool;
  };

  // ── Customer Rating History ───────────────────────────────────────────────

  public type CustomerRatingHistoryEntry = {
    orderId    : Text;
    rating     : CustomerRating;
    merchantId : Text;
    date       : Int;
  };

  // ── Support Tickets ───────────────────────────────────────────────────────

  public type SupportTicketCategory = { #payment_stuck; #behaviour_complaint; #other };

  public type SupportTicketStatus = { #new_; #assigned; #in_progress; #resolved; #closed };

  public type SupportTicketPriority = { #high; #medium; #low };

  public type SupportTicket = {
    ticketId           : Text;
    fromPhone          : Text;
    fromRole           : UserRole;
    category           : SupportTicketCategory;
    description        : Text;
    orderId            : ?Text;   // optional order ID linked to this ticket
    status             : SupportTicketStatus;
    priority           : SupportTicketPriority;
    createdAt          : Int;
    updatedAt          : Int;
    resolvedAt         : ?Int;
    resolutionDeadline : Int;   // nanosecond timestamp
    remarks            : Text;
    adminNote          : Text;
  };

  // ── Recipe ───────────────────────────────────────────────────────────────

  public type RecipeIngredient = {
    name  : Text;
    grams : Float;
  };

  public type Recipe = {
    id          : Text;
    ownerId     : Text;
    title       : Text;
    ingredients : [RecipeIngredient];
    steps       : [Text];
    imageLink   : Text;
    videoLink   : Text;
    benefits    : Text;
    tips        : Text;
    rating      : Float;
    ratingCount : Nat;
    createdAt   : Int;
    updatedAt   : Int;
  };

  // ── Subscription Assignment (User-Based Model) ───────────────────────────

  public type SubscriptionAssignmentStatus = { #active; #paused; #blocked; #expired };

  public type SubscriptionAssignment = {
    id           : Text;
    merchantId   : Text;
    assignedUserId : Text;   // phone number of the assigned user/delivery partner
    planId       : Text;
    ordersUsed   : Nat;
    orderCap     : Nat;      // per-user order cap set by merchant
    status       : SubscriptionAssignmentStatus;
    assignedAt   : Int;
    lastOrderAt  : ?Int;
  };

  public type SubscriptionDashboardStats = {
    planName             : Text;
    totalOrdersThisMonth : Nat;
    orderCap             : Nat;
    daysUntilRenewal     : Int;
    assignedUsersCount   : Nat;
    activeUsersCount     : Nat;
    utilizationPercent   : Float;
    topUser              : ?{ phone : Text; ordersCount : Nat };
  };

  // ── Result / Error ────────────────────────────────────────────────────────

  public type ApiError = {
    #notFound;
    #unauthorized;
    #invalidInput : Text;
    #alreadyExists;
    #subscriptionLimitReached;
    #otpFailed;
    #internalError : Text;
  };

  public type Result<T, E> = { #ok : T; #err : E };


  // ── Election Result ─────────────────────────────────────────────────────────────

  /// One candidate/party result for a constituency in an election.
  public type ElectionResult = {
    id             : Text;   // unique: state#constituency#partyName
    state          : Text;   // e.g. "Maharashtra", "Delhi"
    constituency   : Text;   // e.g. "Andheri East", "New Delhi"
    partyName      : Text;   // e.g. "INC", "BJP", "AAP"
    candidateName  : Text;   // e.g. "Rahul Gandhi"
    votes          : Nat;    // vote count
    voteShare      : Float;  // 0.0-100.0
    isLeading      : Bool;   // true when this candidate is currently leading in the constituency
    isWon          : Bool;   // true when result is declared and this candidate won
    timestamp      : Int;    // nanoseconds epoch of last update
    source         : Text;   // "eci" | "sample" | "api"
  };

  // ── Donation Module ──────────────────────────────────────────────────────────

  public type DonationItem = {
    id          : Text;
    category    : Text;   // "FoodItems" | "Clothes" | "Books"
    description : Text;
    quantity    : Text;
    location    : Text;
    contactPhone : Text;
    donorPhone  : Text;
    donorName   : Text;
    status      : Text;   // "Available" | "Claimed" | "Removed"
    createdAt   : Int;
    source      : Text;   // "chatbot" | "dashboard" | "telegram" | ...
  };

  public type DonationRequest = {
    id              : Text;
    category        : Text;   // "FoodItems" | "Clothes" | "Books"
    description     : Text;
    quantityNeeded  : Text;
    location        : Text;
    requesterPhone  : Text;
    requesterName   : Text;
    status          : Text;   // "Pending" | "Fulfilled" | "Cancelled"
    createdAt       : Int;
    source          : Text;
  };

  // ── Script Executor Results ───────────────────────────────────────────────

  /// A single step in a script-executor run.
  public type ScriptRunStep = {
    stepIndex      : Nat;
    input          : Text;
    expectedOutput : Text;
    actualOutput   : Text;
    passed         : Bool;
    error          : ?Text;
  };

  /// The persisted result of one complete Script Executor run.
  public type ScriptRunResult = {
    id           : Text;
    flowName     : Text;
    runAt        : Int;
    totalSteps   : Nat;
    passedSteps  : Nat;
    failedSteps  : Nat;
    overallPass  : Bool;
    steps        : [ScriptRunStep];
  };

  /// Input type accepted by saveScriptRunResult.
  /// Identical to ScriptRunResult but without `id` (generated server-side).
  public type ScriptRunResultInput = {
    flowName     : Text;
    runAt        : Int;
    totalSteps   : Nat;
    passedSteps  : Nat;
    failedSteps  : Nat;
    overallPass  : Bool;
    steps        : [ScriptRunStep];
  };

  /// A single entity record created by a script executor run.
  public type ScriptEntityRecord = {
    entityType : Text;   // "customer" | "merchant" | "order"
    entityId   : Text;
    entityData : Text;   // JSON snapshot
  };

  // ── Bot Message Log ───────────────────────────────────────────────────────

  /// Persisted log entry for every incoming/outgoing bot message across
  /// Telegram, WhatsApp, and SMS channels.
  public type BotLog = {
    id           : Text;    // auto-generated sequential ID
    platform     : Text;    // "telegram", "whatsapp", or "sms"
    direction    : Text;    // "incoming" or "outgoing"
    timestamp    : Int;     // nanoseconds since epoch
    senderId     : Text;    // chat_id for telegram, phone for whatsapp/sms
    messageText  : Text;    // raw message content
    flowTriggered : Text;   // flow name or "unknown"
    status       : Text;    // "success", "error", or "pending"
    errorDetail  : Text;    // empty string if success, specific error if failed
    rawPayload   : ?Text;   // raw request body (for debugging incoming webhooks; null for legacy entries)
  };

  // ── Flow Agent ────────────────────────────────────────────────────────────

  public type FlowAgentRun = {
    id           : Text;
    startedAt    : Int;
    completedAt  : ?Int;
    status       : Text;   // "running" | "completed" | "failed"
    flowsScoped  : [Text]; // empty = all flows
    totalFlows   : Nat;
    passedFlows  : Nat;
    failedFlows  : Nat;
    issuesFound  : Nat;
    fixesApplied : Nat;
    triggeredBy  : Text;
  };

  public type StepDiagnostic = {
    stepIndex            : Nat;
    nodeName             : Text;
    nodeType             : Text;
    inputReceived        : Text;
    inputExpected        : Text;
    outputProduced       : Text;
    outputExpected       : Text;
    prevNodeOutput       : Text;
    nextNodeExpectedInput : Text;
    status               : Text;   // "pass" | "fail"
    issueType            : ?Text;  // "missing_param" | "type_mismatch" | "broken_connection" | "save_failure" | "null_output" | "config_missing"
    diagnosticMessage    : Text;
    executionMs          : Nat;
  };

  public type FlowIssue = {
    issueId          : Text;
    severity         : Text;   // "critical" | "warning" | "info"
    issueType        : Text;
    affectedNode     : Text;
    affectedStep     : Nat;
    description      : Text;
    rootCause        : Text;
    downstreamImpact : Text;
    suggestedFix     : Text;   // human-readable fix suggestion for this issue
  };

  public type FlowFix = {
    fixId         : Text;
    issueId       : Text;
    description   : Text;
    beforeConfig  : Text;   // JSON
    afterConfig   : Text;   // JSON
    fixType       : Text;   // "add_param" | "correct_value" | "rewire_connection" | "add_null_check" | "add_validation"
    paramName     : ?Text;
    paramValue    : ?Text;
    adminOverride : ?Text;
    approved      : Bool;   // true when admin approved this fix
    applied       : Bool;   // true when fix has been applied
  };

  public type FlowDiagnosticResult = {
    runId          : Text;
    flowId         : Text;
    flowName       : Text;
    status         : Text;   // "pass" | "fail" | "error"
    healthScore    : Nat;    // 0-100
    stepResults    : [StepDiagnostic];
    issues         : [FlowIssue];
    suggestedFixes : [FlowFix];
    approvalStatus : Text;   // "pending" | "approved" | "rejected" | "skipped"
    approvedAt     : ?Int;
    deployedAt     : ?Int;
    testedAt       : Int;    // timestamp when this diagnostic was run
  };

  public type AgentDeployment = {
    id               : Text;
    deployedAt       : Int;
    deployedBy       : Text;
    flowsDeployed    : [Text];
    fixesApplied     : [Text];
    channelsSynced   : [Text]; // "whatsapp" | "telegram" | "sms"
    rollbackSnapshot : Text;   // JSON snapshot of pre-deploy registry state
  };

  public type FlowAgentSchedule = {
    isEnabled    : Bool;
    intervalHours : Nat;
    lastRunAt    : ?Int;
    nextRunAt    : ?Int;
  };

  /// Tracks how many real entities were saved to backend tables during a Flow Agent diagnostic run.
  public type AgentEntitySummary = {
    customersCreated : Nat;
    merchantsCreated : Nat;
    ordersCreated    : Nat;
  };

};

