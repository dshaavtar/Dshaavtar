import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Result_20 = {
    __kind__: "ok";
    ok: ModerationItem;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface LessonLike {
    id: string;
    lessonId: string;
    userId: string;
    likeType: string;
    timestamp: bigint;
}
export interface Merchant {
    id: string;
    kyc: KYCDocuments;
    blockedUntil?: bigint;
    merchantType: MerchantType;
    deliveryRadius: number;
    ratingCount: bigint;
    userId: string;
    rejectionReason?: string;
    businessName: string;
    deliveryType: DeliveryType;
    isActive: boolean;
    orderCount: bigint;
    codAvailable: boolean;
    isVerified: boolean;
    isOndcEnrolled: boolean;
    category: string;
    menuProductIds: Array<string>;
    customerCount: bigint;
    phone: string;
    rentalAllowed: boolean;
    branches: Array<Branch>;
    bookingAllowed: boolean;
    location: Location;
    boostedOrderCount: bigint;
    avgRating: number;
}
export interface FamilyConnectRequest {
    id: string;
    status: FamilyConnectRequestStatus;
    relationship: string;
    createdAt: bigint;
    fromPhone: string;
    toPhone: string;
    address: string;
    groupName: string;
}
export interface EarningsSummary {
    monthlyEarnings: number;
    dailyEarnings: number;
    completedTrips: bigint;
    totalEarnings: number;
}
export type Result_4 = {
    __kind__: "ok";
    ok: Merchant;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_40 = {
    __kind__: "ok";
    ok: Job;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface Lead {
    id: string;
    status: LeadStatus;
    createdAt: bigint;
    category: string;
    phone: string;
    searchQuery: string;
    location: Location;
}
export interface InventoryItem {
    id: string;
    expiryDate?: string;
    unit: string;
    lastUpdated: bigint;
    productId: string;
    productName: string;
    manufacturerId: string;
    reorderLevel: bigint;
    currentStock: bigint;
    batchCode: string;
}
export interface SaleRecord {
    id: string;
    paymentStatus: PaymentStatusSale;
    createdAt: bigint;
    invoiceNo: string;
    totalAmount: number;
    buyerId: string;
    manufacturerId: string;
    items: Array<[string, string, bigint, number]>;
    buyerType: BuyerType;
}
export interface FamilyGroup {
    id: string;
    createdAt: bigint;
    ownerPhone: string;
    memberPhones: Array<string>;
    groupName: string;
    groupType: GroupType;
}
export interface TransportBooking {
    id: string;
    status: TransportStatus;
    vehicleType: VehicleType;
    destination: Location;
    createdAt: bigint;
    origin: Location;
    statusHistory: Array<OrderStatusHistory>;
    updatedAt: bigint;
    customerId: string;
    estimatedCharge: number;
    sarthiPartnerId?: string;
    customerContactNo: string;
    partnerContactNo: string;
}
export interface CityControl {
    cityId: string;
    cityName: string;
    moduleToggles: Array<[string, boolean]>;
    pincode: string;
}
export interface SarthiPendingRide {
    id: string;
    customerName: string;
    status: TransportStatus;
    vehicleType: VehicleType;
    destinationAddress: string;
    createdAt: bigint;
    pickupAddress: string;
    customerId: string;
    estimatedFare: number;
}
export type Result_34 = {
    __kind__: "ok";
    ok: AppVersion;
} | {
    __kind__: "err";
    err: string;
};
export interface RestockOrder {
    id: string;
    status: RestockStatus;
    supplierName: string;
    createdAt: bigint;
    merchantPhone: string;
    merchantId: string;
    updatedAt: bigint;
    notes: string;
    itemName: string;
    quantity: bigint;
}
export interface DeliveryPaymentQR {
    token: string;
    expiresAt: bigint;
    orderId: string;
    partnerId: string;
    amount: number;
    qrData: string;
}
export interface OrderGroup {
    deliveryCharge: number;
    merchantId: string;
    items: Array<OrderItem>;
    subtotal: number;
}
export interface Event {
    id: string;
    status: EventStatus;
    endDate: string;
    publishUntil: bigint;
    createdAt: bigint;
    ticketVenue: string;
    description: string;
    organizerName: string;
    isPaid: boolean;
    distance?: number;
    organizerPhone: string;
    price: number;
    locationAddress: string;
    eventName: string;
    startDate: string;
}
export type Result_57 = {
    __kind__: "ok";
    ok: PetrolExpense;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface FlowAgentSchedule {
    intervalHours: bigint;
    lastRunAt?: bigint;
    isEnabled: boolean;
    nextRunAt?: bigint;
}
export type Result_26 = {
    __kind__: "ok";
    ok: BrandingConfig;
} | {
    __kind__: "err";
    err: string;
};
export interface BlogReview {
    id: string;
    createdAt: bigint;
    reviewerName: string;
    reviewerId: string;
    comment: string;
    blogId: string;
    rating: bigint;
}
export interface WordDefinition {
    id: string;
    ipa: string;
    word: string;
    ancientTranslation: string;
    language: string;
    translations: Array<[string, string]>;
    examples: Array<string>;
}
export interface ShuttleStop {
    fareDescription: string;
    estimatedArrivalMinutes: bigint;
    stopName: string;
    location: string;
}
export type Result = {
    __kind__: "ok";
    ok: ShuttleBooking;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_10 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Result_8 = {
    __kind__: "ok";
    ok: User;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface EmployeeLeaveRequest {
    id: string;
    status: EmployeeLeaveStatus;
    createdAt: bigint;
    toDate: string;
    employeeId: string;
    fromDate: string;
    leaveType: string;
    reason: string;
}
export interface Recipe {
    id: string;
    title: string;
    imageLink: string;
    ratingCount: bigint;
    ownerId: string;
    createdAt: bigint;
    tips: string;
    videoLink: string;
    updatedAt: bigint;
    steps: Array<string>;
    benefits: string;
    rating: number;
    ingredients: Array<RecipeIngredient>;
}
export interface POSOrderLine {
    tier: string;
    productId: string;
    productName: string;
    quantity: bigint;
    unitPrice: number;
}
export interface TipRecord {
    id: string;
    entityId: string;
    timestamp: bigint;
    fromCustomerId: string;
    entityType: string;
    amount: bigint;
    toPartnerId: string;
}
export type Result_56 = {
    __kind__: "ok";
    ok: TipRecord;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_25 = {
    __kind__: "ok";
    ok: Employee;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface TelegramConfig {
    botUsername: string;
    alertChatId: string;
    isEnabled: boolean;
    botToken: string;
    webhookUrl: string;
}
export interface ScriptRunResultInput {
    passedSteps: bigint;
    failedSteps: bigint;
    flowName: string;
    steps: Array<ScriptRunStep>;
    overallPass: boolean;
    totalSteps: bigint;
    runAt: bigint;
}
export interface DPEfficiency {
    completionRate: number;
    ordersCompleted: bigint;
    name: string;
    partnerId: string;
    avgDeliveryMinutes: number;
}
export interface WordDefinitionRow {
    id: string;
    ipa: string;
    word: string;
    ancientTranslation: string;
    language: string;
}
export interface InventoryTransaction {
    id: string;
    transactionType: InventoryTransactionType;
    inventoryItemId: string;
    createdAt: bigint;
    referenceId?: string;
    notes: string;
    quantity: bigint;
}
export type Result_11 = {
    __kind__: "ok";
    ok: SupportTicket;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface PassengerDetail {
    age: bigint;
    name: string;
    email: string;
    idNumber: string;
    gender: string;
    phone: string;
    idType: string;
}
export interface TopCustomer {
    userId: string;
    name: string;
    orderCount: bigint;
    totalSpend: number;
    phone: string;
}
export interface Job {
    id: string;
    title: string;
    posterId: string;
    expiresAt?: bigint;
    endDate: bigint;
    publishDate: bigint;
    jobType: JobType;
    description: string;
    isOpen: boolean;
    leads: Array<ContactRequest>;
    pricePerDay?: number;
    category: string;
    salaryMax: number;
    salaryMin: number;
    isAdhoc: boolean;
    educationLevel?: string;
    location: Location;
    contactPhone?: string;
}
export interface FullWhatsAppConfig {
    verifyToken: string;
    isConnected: boolean;
    apiKey: string;
    phoneNumberId: string;
    metaAppId: string;
    isTestMode: boolean;
    businessAccountId: string;
    webhookUrl: string;
}
export type Result_46 = {
    __kind__: "ok";
    ok: UserSubscription;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface ProfessionalService {
    id: string;
    areaRates: Array<[string, number]>;
    serviceType: string;
    city: string;
    createdAt: bigint;
    merchantPhone: string;
    pricePerHour: number;
    availability: Array<string>;
    updatedAt: bigint;
    address: string;
    specialization: string;
    rating: number;
}
export interface TourOperator {
    id: string;
    duration: string;
    city: string;
    name: string;
    createdAt: bigint;
    pricePerPerson: number;
    maxPassengers: bigint;
    updatedAt: bigint;
    tourTypes: Array<string>;
    destinations: Array<string>;
    rating: number;
    phone: string;
}
export interface PromotionSubscriptionPlan {
    id: string;
    name: string;
    userReach: bigint;
    price: number;
}
export interface Promotion {
    id: string;
    status: PromotionStatus;
    reachedCount: bigint;
    title: string;
    expiresAt: bigint;
    imageLink: string;
    createdAt: bigint;
    subscriptionPlan: PromotionReach;
    viewedCount: bigint;
    targetUserCount: bigint;
    locationCountry: string;
    advertiserPhone: string;
    reelLink: string;
    locationArea: string;
    locationCity: string;
    moderationFlags: Array<string>;
}
export interface ProductPriceUniformity {
    maxPrice: number;
    locationCount: bigint;
    isUniform: boolean;
    minPrice: number;
}
export interface ManufacturerProduct {
    id: string;
    bulkPricingTiers: Array<BulkPricingTier>;
    stockQty: bigint;
    isDiscontinued: boolean;
    expiryDate?: string;
    createdAt: bigint;
    priceToCustomer: number;
    hsnCode?: string;
    productName: string;
    b2bCode?: string;
    batchNumber: string;
    manufacturerId: string;
    isReturnable: boolean;
    manufactureDate: bigint;
    priceToDistributor: number;
    batchCode?: string;
    originCity: string;
}
export interface User {
    id: string;
    otpCode: string;
    stateData: string;
    otpVerified: boolean;
    name: string;
    sessionLocked: boolean;
    role: UserRole;
    sessionLockExpiry: bigint;
    importedByMerchant?: string;
    isActive: boolean;
    conversationState: ConversationState;
    countryCode: string;
    passdigit: string;
    countryName: string;
    otpExpiry: bigint;
    currency: string;
    address?: string;
    gender: string;
    subscriptionPlanId?: string;
    phone: string;
    importBatchId?: string;
    registrationDate: bigint;
    passdigitAttempts: bigint;
    location?: Location;
    promotionalOptOut: boolean;
}
export type Result_21 = {
    __kind__: "ok";
    ok: MenuOption;
} | {
    __kind__: "err";
    err: string;
};
export interface DonationRequest {
    id: string;
    status: string;
    source: string;
    createdAt: bigint;
    description: string;
    category: string;
    requesterName: string;
    location: string;
    quantityNeeded: string;
    requesterPhone: string;
}
export interface CommunityFoodOrder {
    id: string;
    status: BookingStatus__1;
    communityId: string;
    sellerPhone: string;
    cost: number;
    createdAt: bigint;
    cuisineType: string;
    buyerPhone: string;
    deliveryTime: string;
    updatedAt: bigint;
    mealDescription: string;
    quantity: bigint;
    dietary: DietaryType;
}
export type Result_42 = {
    __kind__: "ok";
    ok: Array<Product>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_18 = {
    __kind__: "ok";
    ok: Order;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_51 = {
    __kind__: "ok";
    ok: SubscriptionQR;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_3 = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_15 = {
    __kind__: "ok";
    ok: DeliveryRateCard;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_38 = {
    __kind__: "ok";
    ok: Lead;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface QuickReply {
    id: string;
    title: string;
    payload: string;
}
export interface ManufacturerComplaint {
    id: string;
    status: ComplaintStatus;
    subject: string;
    filedById: string;
    createdAt: bigint;
    description: string;
    manufacturerId: string;
    filedBy: string;
}
export interface FlowIssue {
    issueType: string;
    affectedNode: string;
    affectedStep: bigint;
    downstreamImpact: string;
    description: string;
    issueId: string;
    suggestedFix: string;
    severity: string;
    rootCause: string;
}
export interface Product {
    id: string;
    qty: bigint;
    title: string;
    imageUrls: Array<string>;
    packing: string;
    specialDiscount: number;
    merchantId: string;
    description: string;
    barcodeValue?: string;
    isActive: boolean;
    bulkRates: Array<BulkRate>;
    isNew: boolean;
    expiry: string;
    videoUrl?: string;
    baseRate: number;
}
export interface DailyLessonRow {
    id: string;
    topic: string;
    isCompleted: boolean;
    userId: string;
    difficulty: string;
    streakDate: bigint;
    languagePair: string;
}
export interface MarketplaceItemInput {
    title: string;
    instagramPhotoLink: string;
    cityId?: string;
    yearOfManufacture: bigint;
    invoiceAvailable: boolean;
    listingType: string;
    category: string;
    price: number;
}
export interface ScriptExecutionResult {
    passedSteps: bigint;
    flowId: string;
    flowName: string;
    executionId: string;
    stepResults: Array<StepResult>;
    totalSteps: bigint;
    timestamp: bigint;
}
export type Result_50 = {
    __kind__: "ok";
    ok: Array<OrderGroup>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface DistributorNetwork {
    id: string;
    status: string;
    totalOrders: bigint;
    routeDescription: string;
    assignedDeliveryPartnerPhone?: string;
    city: string;
    createdAt: bigint;
    distributorCode: string;
    distributorName: string;
    marginEarned: number;
    schemeApplicable: string;
    manufacturerId: string;
    assignedDeliveryPartnerName?: string;
    marginPercent: number;
    pincode: string;
    distributorPhone: string;
}
export interface MerchantPerformance {
    revenue: number;
    tier: MerchantPerformanceTier;
    businessName: string;
    merchantId: string;
    orderCount: bigint;
    avgRating: number;
}
export interface PaySprintCredential {
    id: string;
    serviceType: PaySprintServiceType;
    baseUrl: string;
    createdAt: bigint;
    authorisedKey: string;
    isActive: boolean;
    partnerId: string;
    updatedAt: bigint;
    lastTestResult?: string;
    environment: PaySprintEnvironment;
    lastTestedAt?: bigint;
    partnerKey: string;
}
export type Result_31 = {
    __kind__: "ok";
    ok: Array<BotMessage>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface CustomerRating__1 {
    id: string;
    customerName: string;
    createdAt: bigint;
    orderId: string;
    comment: string;
    ratedById: string;
    customerId: string;
    rating: bigint;
    ratedByName: string;
    ratedByRole: string;
}
export type Result_7 = {
    __kind__: "ok";
    ok: FullWhatsAppConfig;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface ChatSimulatorSession {
    flowId: string;
    role: string;
    userInput: string;
    stepNumber: bigint;
    timestamp: bigint;
    botOutput: string;
    createdEntityIds: Array<string>;
    sessionId: string;
}
export interface SupplierOrder {
    id: string;
    supplierContact: string;
    status: SupplierOrderStatus;
    createdAt: bigint;
    merchantId: string;
    updatedAt: bigint;
    notes: string;
    itemName: string;
    quantity: string;
}
export interface SarthiOTPVerification {
    id: string;
    bookingId: string;
    driverVerified: boolean;
    createdAt: bigint;
    passengerVerified: boolean;
    driverOTP: string;
    passengerOTP: string;
}
export interface MarketSearchResult {
    currentPrice: number;
    name: string;
    createdAt: bigint;
    lastUpdated: bigint;
    exchangeName: string;
    updatedAt: bigint;
    instrumentType: string;
    currency: string;
    changePercent: number;
    symbol: string;
}
export interface ProductInput {
    mrp: number;
    qty: bigint;
    bulkMinQty: bigint;
    title: string;
    instagramLink?: string;
    youtubeLink?: string;
    imageUrls: Array<string>;
    purchaseRate: number;
    packing: string;
    specialDiscount: number;
    description: string;
    purchasedFrom: string;
    imageUrl: string;
    schemeDiscount: number;
    bulkRates: Array<BulkRate>;
    brand: string;
    isNew: boolean;
    expiry: string;
    videoUrl?: string;
    bulkRate: number;
    condition: string;
    baseRate: number;
}
export interface ProductRevenue {
    productId: string;
    productName: string;
    orderCount: bigint;
    totalRevenue: number;
}
export interface BotMessage {
    to: string;
    languageKey: string;
    body: string;
    messageType: string;
    quickReplies: Array<QuickReply>;
    footer?: string;
}
export interface ScriptRunStep {
    expectedOutput: string;
    stepIndex: bigint;
    error?: string;
    input: string;
    actualOutput: string;
    passed: boolean;
}
export interface SpendAnalysis {
    remainingBudget: number;
    trend: SpendTrend;
    period: string;
    topCategories: Array<CategorySpend>;
    orderCount: bigint;
    totalSpent: number;
}
export interface ShuttleBooking {
    id: string;
    otp: string;
    status: ShuttleBookingStatus;
    fare: bigint;
    createdAt: bigint;
    routeId: string;
    boardingStop: string;
    passengerPhone: string;
    dropStop: string;
}
export interface SMSConfig {
    id: string;
    providerBaseUrl: string;
    provider: string;
    authToken: string;
    isEnabled: boolean;
    apiKey: string;
    fromNumber: string;
    webhookUrl: string;
}
export interface AdminUPIProfile {
    name: string;
    upiId: string;
}
export interface MerchantEarnings {
    orderCount: bigint;
    pendingPayouts: number;
    totalRevenue: number;
    avgOrderValue: number;
}
export interface ManufacturerRating {
    id: string;
    review: string;
    createdAt: bigint;
    ratedBy: string;
    productId: string;
    manufacturerId: string;
    rating: bigint;
}
export interface AppVersion {
    id: string;
    createdAt: bigint;
    platform: string;
    isActive: boolean;
    version: string;
    brandName: string;
    releaseDate: bigint;
    buildNumber: bigint;
}
export interface BulkRate {
    rate: number;
    minQuantity: bigint;
}
export interface ManufacturerDashboardStats {
    totalProducts: bigint;
    totalOrders: bigint;
    totalDistributors: bigint;
    totalMarginPaid: number;
    pendingReturns: bigint;
    openComplaints: bigint;
    activeDistributors: bigint;
    avgRating: number;
}
export interface ShuttleRoute {
    id: string;
    status: Variant_active_inactive;
    driverId: string;
    serviceName: string;
    vehicleType: VehicleType;
    destination: string;
    source: string;
    arrivalTime: string;
    departureTime: string;
    vehicleNumber: string;
    fare: bigint;
    operatorPhone: string;
    createdAt: bigint;
    pricePerKm: number;
    isActive: boolean;
    routeName: string;
    stops: Array<string>;
    availableSeats: bigint;
    stopDetails: Array<ShuttleStop>;
}
export type Result_30 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface PaySprintAPILog {
    id: string;
    httpStatus: bigint;
    isError: boolean;
    serviceType: PaySprintServiceType;
    endpoint: string;
    createdAt: bigint;
    errorMessage?: string;
    latencyMs: bigint;
    environment: PaySprintEnvironment;
    responseBody: string;
    requestBody: string;
}
export interface LessonRow {
    id: string;
    title: string;
    content: string;
    order: bigint;
    courseId: string;
}
export interface DeliveryRateCard {
    id: string;
    vehicleType: VehicleType;
    serviceType: ServiceType;
    surgeMultiplier: number;
    perKmRate: number;
    isActive: boolean;
    baseRate: number;
}
export interface FlowFix {
    fixId: string;
    afterConfig: string;
    paramName?: string;
    applied: boolean;
    description: string;
    issueId: string;
    approved: boolean;
    adminOverride?: string;
    paramValue?: string;
    fixType: string;
    beforeConfig: string;
}
export interface MerchantBranch {
    name: string;
    isActive: boolean;
    address: string;
    upiId: string;
    branchId: string;
}
export interface Advertisement {
    title: string;
    active: boolean;
    adId: string;
    createdAt: bigint;
    cityId?: string;
    description: string;
    targetRole: string;
}
export type Result_16 = {
    __kind__: "ok";
    ok: ProfessionalService;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: SarthiOTPVerification;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface BulkPricingTier {
    minQty: bigint;
    pricePerUnit: number;
    maxQty: bigint;
}
export type Result_22 = {
    __kind__: "ok";
    ok: FamilyMember;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface MarketSearchQuery {
    id: string;
    country: string;
    scriptName: string;
    recommendations: Array<TradeRecommendation>;
    createdAt: bigint;
    results: Array<MarketSearchResult>;
    matchedSymbols: Array<string>;
    updatedAt: bigint;
    searchedAt: bigint;
}
export interface EnhancedShuttleStop {
    sequenceOrder: bigint;
    arrivalTime: string;
    ticketFee: bigint;
    stopName: string;
    location: string;
}
export type Result_19 = {
    __kind__: "ok";
    ok: OndcEnrollment;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_29 = {
    __kind__: "ok";
    ok: Promotion;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface SubscriptionPlan {
    id: string;
    durationDays: bigint;
    inquiryLimit: bigint;
    utilityLimit: bigint;
    features: Array<string>;
    qrCodeData: string;
    percentageFee?: number;
    name: string;
    maxTransactionAmount?: number;
    applicableRoles: Array<UserRole>;
    isActive: boolean;
    marketingLimit: bigint;
    messageType: string;
    authLimit: bigint;
    pricePercentage: number;
    targetRole: UserRole;
    orderLimit: bigint;
    priceFlat: number;
    categoryScope?: string;
    minTransactionAmount?: number;
    flatFee?: number;
    planType: SubscriptionPlanType;
}
export interface LendingItem {
    id: string;
    status: string;
    itemDescription: string;
    borrowDate: bigint;
    createdAt: bigint;
    specificReminderDate?: bigint;
    updatedAt: bigint;
    lenderPhone: string;
    itemCategory: string;
    borrowerPhone: string;
    itemName: string;
    reminderFrequency: string;
    charge: number;
    returnDate: bigint;
    lastReminderSent?: bigint;
    chargeDescription: string;
}
export type Result_49 = {
    __kind__: "ok";
    ok: Array<OrderStatusHistory>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type SubscriptionStatus = {
    __kind__: "active";
    active: UserSubscription;
} | {
    __kind__: "assignedFree";
    assignedFree: UserSubscription;
} | {
    __kind__: "noSubscription";
    noSubscription: null;
};
export interface AssignedPartner {
    name: string;
    partnerId: string;
    phone: string;
    route: string;
}
export interface OrderNotification {
    data: string;
    orderId: string;
    event: string;
    timestamp: bigint;
}
export interface SavedWordRow {
    id: string;
    userId: string;
    word: string;
    ancientTranslation: string;
    language: string;
    translation: string;
}
export interface FlowSession {
    id: string;
    status: string;
    role: string;
    flowName: string;
    steps: Array<FlowStep>;
    timestamp: bigint;
}
export interface AgentDeployment {
    id: string;
    fixesApplied: Array<string>;
    deployedAt: bigint;
    deployedBy: string;
    rollbackSnapshot: string;
    flowsDeployed: Array<string>;
    channelsSynced: Array<string>;
}
export interface ScriptEntityRecord {
    entityId: string;
    entityData: string;
    entityType: string;
}
export interface FlowDefinition {
    id: string;
    name: string;
    createdAt: bigint;
    flowJson: string;
    version: bigint;
    updatedAt: bigint;
    environment: string;
}
export interface FlowDiagnosticResult {
    status: string;
    suggestedFixes: Array<FlowFix>;
    deployedAt?: bigint;
    flowId: string;
    approvedAt?: bigint;
    testedAt: bigint;
    flowName: string;
    approvalStatus: string;
    stepResults: Array<StepDiagnostic>;
    issues: Array<FlowIssue>;
    healthScore: bigint;
    runId: string;
}
export interface EntityView {
    timestamp: bigint;
    phone: string;
}
export interface LanguageCourse {
    id: string;
    status: string;
    title: string;
    createdDate: bigint;
    description: string;
    lessons: Array<string>;
    creatorPhone: string;
    languagePair: string;
    price: bigint;
    enrollmentCount: bigint;
}
export type Result_35 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface PetrolExpense {
    id: string;
    date: string;
    createdAt: bigint;
    partnerId: string;
    notes: string;
    amount: number;
    liters: number;
}
export interface OrderFunnel {
    cancelled: bigint;
    placed: bigint;
    deliveryRate: number;
    delivered: bigint;
    cancelRate: number;
    acceptRate: number;
    accepted: bigint;
}
export interface CommunityWorkOrder {
    id: string;
    status: BookingStatus__1;
    serviceType: WorkServiceType;
    communityId: string;
    scheduledDate: string;
    createdAt: bigint;
    description: string;
    updatedAt: bigint;
    memberPhone: string;
}
export interface CityRow {
    id: string;
    createdAt: bigint;
    cityName: string;
    isEnabled: boolean;
    pincode: string;
}
export interface HealthcareAppointment {
    id: string;
    status: AppointmentStatus;
    customerPhone: string;
    date: string;
    createdAt: bigint;
    updatedAt: bigint;
    notes: string;
    providerId: string;
    timeSlot: string;
}
export interface MarketplaceItem {
    id: string;
    title: string;
    instagramPhotoLink: string;
    createdAt: bigint;
    createdBy: string;
    cityId?: string;
    yearOfManufacture: bigint;
    isActive: boolean;
    invoiceAvailable: boolean;
    listingType: string;
    category: string;
    price: number;
}
export type Result_45 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface Manufacturer {
    id: string;
    userId: string;
    createdAt: bigint;
    productCategories: Array<string>;
    customerCareEmail: string;
    businessName: string;
    updatedAt: bigint;
    customerCarePhone: string;
    registeredCity: string;
}
export interface HttpRequest {
    url: string;
    method: string;
    body: Uint8Array;
    headers: Array<[string, string]>;
}
export interface CustomerDashboardData {
    ordersByCategory: Array<[string, bigint]>;
    expenditureByCategory: Array<[string, number]>;
    totalExpenditure: number;
    familyMemberCount: bigint;
    activeSubscriptions: bigint;
}
export interface BotLog {
    id: string;
    status: string;
    direction: string;
    flowTriggered: string;
    errorDetail: string;
    platform: string;
    messageText: string;
    timestamp: bigint;
    rawPayload?: string;
    senderId: string;
}
export type Result_32 = {
    __kind__: "ok";
    ok: ProductLocationPrice;
} | {
    __kind__: "err";
    err: string;
};
export type Result_2 = {
    __kind__: "ok";
    ok: {
        id: string;
        name: string;
    };
} | {
    __kind__: "err";
    err: ApiError;
};
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OndcEnrollment {
    id: string;
    bankAccount: string;
    ifscCode: string;
    userId: string;
    role: UserRole;
    businessName: string;
    submittedAt: bigint;
    enrollmentStatus: VerificationStatus;
    reviewedAt?: bigint;
    fssaiLicense?: string;
    gstin?: string;
    notes?: string;
}
export interface ExpiryReturn {
    id: string;
    status: ExpiryReturnStatus;
    returnedById: string;
    createdAt: bigint;
    productId: string;
    manufacturerId: string;
    quantity: bigint;
    returnedBy: string;
    reason: string;
}
export type Result__1 = {
    __kind__: "ok";
    ok: LessonLike;
} | {
    __kind__: "err";
    err: {
        errorDetail: string;
    };
};
export interface SubscriptionAssignment {
    id: string;
    status: SubscriptionAssignmentStatus;
    ordersUsed: bigint;
    assignedAt: bigint;
    lastOrderAt?: bigint;
    planId: string;
    merchantId: string;
    orderCap: bigint;
    assignedUserId: string;
}
export interface FreeRideSarthi {
    id: string;
    serviceArea: string;
    vehicleType: VehicleType;
    createdAt: bigint;
    isActive: boolean;
    sarthiPhone: string;
}
export interface EmployeeAttendanceRecord {
    id: string;
    date: string;
    checkInTime: bigint;
    employeeId: string;
    notes: string;
    checkOutTime?: bigint;
}
export interface ProductScanHistoryInput {
    merchantId: string;
    productId: string;
    barcodeValue: string;
    deviceInfo?: string;
}
export interface UtilityTransaction {
    id: string;
    status: TransactionStatus;
    serviceType: PaySprintServiceType;
    createdAt: bigint;
    consumerNumber: string;
    referenceId: string;
    operatorCode: string;
    operatorName: string;
    updatedAt: bigint;
    environment: PaySprintEnvironment;
    customerId: string;
    amount: number;
    billAmount?: number;
    receiptNumber?: string;
    transactionId?: string;
}
export interface HealthcareProvider {
    id: string;
    city: string;
    name: string;
    createdAt: bigint;
    availability: Array<string>;
    updatedAt: bigint;
    address: string;
    specialization: string;
    rating: number;
    phone: string;
    consultationFee: number;
}
export interface OrderStatusHistory {
    status: OrderStatus;
    actor: string;
    note?: string;
    timestamp: bigint;
}
export interface MerchantAnalytics {
    branchComparison: Array<[string, number]>;
    runningProducts: Array<string>;
    revenueTrend: Array<MerchantRevenueTrendEntry>;
    orderFunnel: OrderFunnel;
    customerRetentionRate: number;
    topProductsByProfit: Array<ProductRevenue>;
}
export interface DPAnalytics {
    completionRate: number;
    areaHeatmap: Array<[string, bigint]>;
    revenueTrend: Array<MerchantRevenueTrendEntry>;
    avgDeliveryMinutes: number;
    avgRating: number;
}
export type Result_6 = {
    __kind__: "ok";
    ok: DeliveryPartner;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_48 = {
    __kind__: "ok";
    ok: Product;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface PaySprintCallback {
    id: string;
    status: string;
    serviceType: PaySprintServiceType;
    createdAt: bigint;
    referenceId: string;
    orderId?: string;
    processedAt: bigint;
    amount?: number;
    rawPayload: string;
    merchantCode?: string;
    eventType: string;
}
export interface BrandingConfig {
    createdAt: bigint;
    updatedAt: bigint;
    logoUrl: string;
    brandName: string;
    welcomeMessage: string;
}
export interface EnhancedAnalytics {
    topCustomers: Array<TopCustomer>;
    dailyActiveUsers: bigint;
    revenueByCategoryEntries: Array<[string, number]>;
    orderFunnel: OrderFunnel;
    merchantTiers: Array<MerchantPerformance>;
    dpEfficiencyScores: Array<DPEfficiency>;
}
export type Result_12 = {
    __kind__: "ok";
    ok: ShuttleRoute;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface Order {
    id: string;
    status: OrderStatus;
    completedAt?: bigint;
    surgeCharge: number;
    deliveryCharge: number;
    paymentCollectedAt?: bigint;
    paymentStatus: PaymentStatus;
    deliveredAt?: bigint;
    assignedAt?: bigint;
    paymentCollectedAmount: bigint;
    vendorSettledAt?: bigint;
    isManualOrder: boolean;
    merchantBranch?: Branch;
    createdAt: bigint;
    customerRating?: bigint;
    rejectionReason?: string;
    pickedUpAt?: bigint;
    merchantId: string;
    statusHistory: Array<OrderStatusHistory>;
    dpRating?: bigint;
    cancelledAt?: bigint;
    customerAddress?: Location;
    totalAmount: number;
    notes?: string;
    vendorSettlementAmount: bigint;
    paymentMode: PaymentMode;
    searchImageUrl?: string;
    customerId: string;
    customerRatingValue?: CustomerRating;
    merchantAcceptedAt?: bigint;
    items: Array<OrderItem>;
    searchQuery?: string;
    manualItems: Array<ManualOrderItem>;
    acceptedAt?: bigint;
    dpAcceptedAt?: bigint;
    ondcSource: boolean;
    deliveryPartnerId?: string;
    merchantRating?: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface WhatsAppConfig {
    verifyToken: string;
    isConnected: boolean;
    apiKey: string;
    phoneNumberId: string;
    isTestMode: boolean;
    webhookUrl: string;
}
export interface RecipeIngredient {
    name: string;
    grams: number;
}
export interface SubscriptionQR {
    expiresAt: bigint;
    planId: string;
    userId: string;
    amount: number;
    qrData: string;
}
export interface PurchaseRecord {
    id: string;
    paymentStatus: PaymentStatusPurchase;
    supplierName: string;
    createdAt: bigint;
    invoiceNo: string;
    totalAmount: number;
    manufacturerId: string;
    items: Array<[string, string, bigint, number]>;
    supplierId?: string;
}
export interface OndcSetupGuide {
    title: string;
    isRequired: boolean;
    step: bigint;
    description: string;
    helpUrl: string;
    actionRequired: string;
}
export interface Notification {
    id: string;
    status: NotificationStatus;
    userId: string;
    notificationType: string;
    recipientPhone: string;
    createdAt: bigint;
    sentAt?: bigint;
    message: string;
}
export interface FlowAgentDiagnostic {
    fixStatus: string;
    flowId: string;
    flowName: string;
    timestamp: bigint;
    severity: string;
    issue: string;
    proposedFix: string;
    diagnosticId: string;
}
export interface DeliveryPartner {
    id: string;
    blockedUntil?: bigint;
    vehicleType: VehicleType;
    serviceType: ServiceType;
    ratePerKm: number;
    ratingCount: bigint;
    userId: string;
    name: string;
    rejectionReason?: string;
    isOnline: boolean;
    selfieUrl?: string;
    otherPlatforms: Array<string>;
    kycStatus: KYCStatus;
    aadhaarNo: string;
    isVerified: boolean;
    isOndcEnrolled: boolean;
    currentLocation?: Location;
    panNo: string;
    rcBook: string;
    phone: string;
    rcUrl?: string;
    panUrl?: string;
    aadhaarUrl?: string;
    avgRating: number;
}
export interface DashboardStats {
    activePromotions: bigint;
    totalOrders: bigint;
    totalProperties: bigint;
    totalEvents: bigint;
    totalJobs: bigint;
    totalMerchants: bigint;
    totalLeads: bigint;
    totalDeliveryPartners: bigint;
    totalFamilyMembers: bigint;
    activeOrders: bigint;
    totalUsers: bigint;
    pendingKYC: bigint;
    totalRevenue: number;
    totalPromotions: bigint;
}
export interface ScriptRunResult {
    id: string;
    passedSteps: bigint;
    failedSteps: bigint;
    flowName: string;
    steps: Array<ScriptRunStep>;
    overallPass: boolean;
    totalSteps: bigint;
    runAt: bigint;
}
export interface CommunityMember {
    id: string;
    city: string;
    name: string;
    updatedAt: bigint;
    address: string;
    phone: string;
    registeredAt: bigint;
    location: string;
    roles: Array<string>;
    apartmentName: string;
}
export type Result_55 = {
    __kind__: "ok";
    ok: SubscriptionAssignment;
} | {
    __kind__: "err";
    err: string;
};
export interface Blog {
    id: string;
    status: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: bigint;
    authorName: string;
    updatedAt: bigint;
    category: string;
    location: string;
}
export type Result_44 = {
    __kind__: "ok";
    ok: JobCityFavorite;
} | {
    __kind__: "err";
    err: string;
};
export interface DonationItem {
    id: string;
    status: string;
    donorPhone: string;
    source: string;
    createdAt: bigint;
    donorName: string;
    description: string;
    quantity: string;
    category: string;
    location: string;
    contactPhone: string;
}
export type Result_13 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface ManufacturerReviewsAndComplaints {
    ratings: Array<ManufacturerRating>;
    complaints: Array<ManufacturerComplaint>;
}
export type Result_39 = {
    __kind__: "ok";
    ok: Property;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface BusBooking {
    id: string;
    pnr?: string;
    status: BookingStatus;
    seatNumbers: Array<string>;
    destination: string;
    paymentStatus: PaymentStatus__1;
    blockKey?: string;
    source: string;
    arrivalTime: string;
    departureTime: string;
    fare: number;
    createdAt: bigint;
    ticketRef?: string;
    operatorName: string;
    passengerName: string;
    updatedAt: bigint;
    passengerEmail: string;
    environment: PaySprintEnvironment;
    customerId: string;
    journeyDate: string;
    passengerPhone: string;
    transactionId?: string;
}
export type Result_27 = {
    __kind__: "ok";
    ok: TransportBooking;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface ContactRequest {
    status: ContactRequestStatus;
    requesterName: string;
    requestedAt: bigint;
    requesterId: string;
    requesterPhone: string;
}
export interface CourseLikeSummary {
    totalDislikes: bigint;
    totalLikes: bigint;
    likeRatio: bigint;
    courseId: string;
}
export interface SubscriptionAccessResult {
    expiresAt: bigint;
    hasActiveSubscription: boolean;
    dailyLimitRemaining: bigint;
    planName: string;
}
export type Result_54 = {
    __kind__: "ok";
    ok: ApiKey;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface DeliveryPartnerShift {
    id: string;
    status: ShiftStatus;
    ordersCompleted: bigint;
    checkInTime: bigint;
    partnerId: string;
    checkOutTime?: bigint;
    earningsDuringShift: number;
}
export interface SupportTicket {
    status: SupportTicketStatus;
    createdAt: bigint;
    description: string;
    ticketId: string;
    orderId?: string;
    fromPhone: string;
    adminNote: string;
    updatedAt: bigint;
    fromRole: UserRole;
    category: SupportTicketCategory;
    priority: SupportTicketPriority;
    resolutionDeadline: bigint;
    remarks: string;
    resolvedAt?: bigint;
}
export interface FlowStep {
    stepIndex: bigint;
    dataNote: string;
    response: string;
    input: string;
}
export interface UserEnrollment {
    id: string;
    completionDate: bigint;
    isCompleted: boolean;
    userId: string;
    progressPercent: bigint;
    lastViewedDate: bigint;
    enrollmentDate: bigint;
    courseId: string;
}
export interface EarningsByDate {
    date: string;
    earnings: number;
}
export interface TourBooking {
    id: string;
    status: TourBookingStatus;
    destination: string;
    customerPhone: string;
    date: string;
    createdAt: bigint;
    passengerCount: bigint;
    updatedAt: bigint;
    tourType: string;
    operatorId: string;
    totalPrice: number;
}
export interface ManualOrderItem {
    itemName: string;
    quantity: bigint;
    brand: string;
}
export type Result_36 = {
    __kind__: "ok";
    ok: ScriptRunResult;
} | {
    __kind__: "err";
    err: string;
};
export interface CommunityParkingBooking {
    id: string;
    status: BookingStatus__1;
    communityId: string;
    endDate: string;
    cost: number;
    createdAt: bigint;
    updatedAt: bigint;
    parkingType: ParkingType;
    memberPhone: string;
    startDate: string;
}
export interface SubscriptionDashboardStats {
    totalOrdersThisMonth: bigint;
    assignedUsersCount: bigint;
    activeUsersCount: bigint;
    orderCap: bigint;
    utilizationPercent: number;
    planName: string;
    daysUntilRenewal: bigint;
    topUser?: {
        phone: string;
        ordersCount: bigint;
    };
}
export interface HttpResponse {
    body: Uint8Array;
    headers: Array<[string, string]>;
    upgrade?: boolean;
    status_code: number;
}
export type Result_23 = {
    __kind__: "ok";
    ok: HealthcareProvider;
} | {
    __kind__: "err";
    err: string;
};
export interface AccountEntry {
    id: string;
    entryDate: string;
    entryType: AccountEntryType;
    createdAt: bigint;
    referenceId?: string;
    description: string;
    manufacturerId: string;
    category: string;
    amount: number;
}
export interface UserSubscription {
    id: string;
    ordersUsed: bigint;
    endDate: bigint;
    planId: string;
    userId: string;
    isActive: boolean;
    inquiriesUsed: bigint;
    startDate: bigint;
}
export interface OrderPaymentQR {
    token: string;
    expiresAt: bigint;
    orderId: string;
    amount: number;
    qrData: string;
}
export interface ConversationMessage {
    id: string;
    content: string;
    sender: MessageSender;
    messageType: string;
    timestamp: bigint;
}
export interface AdminConfig {
    baseUrl: string;
    upiName: string;
    upiId: string;
    webhookUrl: string;
}
export interface DPEarningsWithExpenses {
    totalEarned: number;
    expenseEntries: Array<PetrolExpense>;
    totalExpenses: number;
    netProfit: number;
}
export interface MerchantEmployee {
    id: string;
    name: string;
    createdAt: bigint;
    role: EmployeeRole__1;
    merchantId: string;
    isActive: boolean;
    phone: string;
}
export interface FamilyMember {
    id: string;
    age?: bigint;
    occupation?: string;
    inviteStatus: FamilyInviteStatus;
    relationName: string;
    ownerName: string;
    relationship: Relationship;
    locationPreference?: string;
    relationAddress: string;
    caste?: string;
    createdAt: bigint;
    education?: string;
    ownerPhone: string;
    bloodGroup?: string;
    relationPhone: string;
    gender: string;
    isMatrimonyEligible: boolean;
    ownerSurname: string;
}
export type Result_5 = {
    __kind__: "ok";
    ok: Employee;
} | {
    __kind__: "err";
    err: string;
};
export interface StepResult {
    stepId: string;
    output: string;
    input: string;
    createdEntityId?: string;
    passed: boolean;
}
export interface MatrimonyProfile {
    age?: bigint;
    occupation?: string;
    memberId: string;
    locationPreference?: string;
    ownerRelationship: string;
    caste?: string;
    education?: string;
    ownerPhone: string;
    bloodGroup?: string;
    memberName: string;
    gender: string;
}
export interface JobCityFavorite {
    id: string;
    city: string;
    userId: string;
    createdAt: bigint;
    employerPhone: string;
}
export type Result_41 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface FlightBooking {
    id: string;
    pnr?: string;
    status: BookingStatus;
    destination: string;
    cabinClass: string;
    paymentStatus: PaymentStatus__1;
    source: string;
    flightNumber: string;
    fare: number;
    createdAt: bigint;
    passengers: Array<PassengerDetail>;
    updatedAt: bigint;
    airline: string;
    environment: PaySprintEnvironment;
    customerId: string;
    journeyDate: string;
    bookingRef?: string;
    transactionId?: string;
}
export type Result_28 = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export interface OndcFAQ {
    question: string;
    answer: string;
}
export interface ModerationItem {
    remark: string;
    status: string;
    entityId: string;
    checkedAt: bigint;
    entityType: string;
}
export interface ServiceBooking {
    id: string;
    status: ServiceBookingStatus;
    duration: bigint;
    customerPhone: string;
    date: string;
    createdAt: bigint;
    updatedAt: bigint;
    notes: string;
    serviceId: string;
    totalPrice: number;
    timeSlot: string;
}
export interface ElectionResult {
    id: string;
    isLeading: boolean;
    source: string;
    votes: bigint;
    voteShare: number;
    state: string;
    timestamp: bigint;
    constituency: string;
    candidateName: string;
    partyName: string;
    isWon: boolean;
}
export interface ProductScanHistory {
    id: string;
    scanTime: bigint;
    merchantId: string;
    productId: string;
    barcodeValue: string;
    deviceInfo?: string;
}
export type Result_9 = {
    __kind__: "ok";
    ok: TourOperator;
} | {
    __kind__: "err";
    err: string;
};
export interface EmployeeAttendance {
    id: string;
    date: string;
    merchantId: string;
    checkInTime: bigint;
    employeeId: string;
    notes: string;
    checkOutTime?: bigint;
}
export interface JobLocation {
    id: string;
    city: string;
    createdAt: bigint;
    jobId: string;
    pincode?: string;
}
export interface ModuleRoleStatus {
    moduleName: string;
    role: string;
    enabled: boolean;
}
export interface BudgetCheckResult {
    warningLevel: BudgetWarningLevel;
    limit: number;
    withinBudget: boolean;
    currentSpend: number;
}
export type ApiError = {
    __kind__: "alreadyExists";
    alreadyExists: null;
} | {
    __kind__: "subscriptionLimitReached";
    subscriptionLimitReached: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "internalError";
    internalError: string;
} | {
    __kind__: "otpFailed";
    otpFailed: null;
} | {
    __kind__: "unauthorized";
    unauthorized: null;
};
export interface Branch {
    deliveryRadius: number;
    isActive: boolean;
    address: string;
    location: Location;
}
export interface TradeRecommendation {
    action: string;
    createdAt: bigint;
    accuracyPrediction: string;
    targetPrice: number;
    reasoning: string;
    updatedAt: bigint;
    stopLossPrice: number;
    targetDate: string;
    confidence: number;
    symbol: string;
}
export interface CustomerBudget {
    monthlyBudget: number;
    userId: string;
    currentMonthSpend: number;
    percentUsed: number;
}
export interface BillRecord {
    id: string;
    createdAt: bigint;
    dueDate?: string;
    isPaid: boolean;
    pendingPayment?: boolean;
    billType: BillType;
    notes: string;
    manufacturerId: string;
    partyName: string;
    pendingNote?: string;
    amount: number;
}
export interface Location {
    lat: number;
    lng: number;
    address: string;
}
export interface TrainBooking {
    id: string;
    pnr?: string;
    status: BookingStatus;
    destination: string;
    paymentStatus: PaymentStatus__1;
    trainNumber: string;
    source: string;
    fare: number;
    createdAt: bigint;
    trainName: string;
    quota: string;
    passengers: Array<PassengerDetail>;
    updatedAt: bigint;
    environment: PaySprintEnvironment;
    customerId: string;
    journeyDate: string;
    classType: string;
    transactionId?: string;
}
export type Result_37 = {
    __kind__: "ok";
    ok: FlowDefinition;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_17 = {
    __kind__: "ok";
    ok: SubscriptionPlan;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface EnrollmentRow {
    id: string;
    isCompleted: boolean;
    userId: string;
    progressPercent: bigint;
    enrollmentDate: bigint;
    courseId: string;
}
export interface CommunityRoomBooking {
    id: string;
    status: BookingStatus__1;
    communityId: string;
    createdAt: bigint;
    facilityType: FacilityType;
    description: string;
    updatedAt: bigint;
    bookingDate: string;
    memberPhone: string;
    timeSlot: string;
}
export interface OrderItem {
    productId: string;
    productName: string;
    totalRate: number;
    quantity: bigint;
    unitRate: number;
}
export type Result_47 = {
    __kind__: "ok";
    ok: {
        status: PromotionStatus;
        reachedCount: bigint;
        viewedCount: bigint;
        targetUserCount: bigint;
    };
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_53 = {
    __kind__: "ok";
    ok: DeliveryPaymentQR;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface City {
    id: string;
    name: string;
    createdAt: bigint;
    isEnabled: boolean;
    pincode: string;
}
export interface ApiKey {
    id: string;
    key: string;
    ownerId: string;
    createdAt: bigint;
    usageCount: bigint;
    isActive: boolean;
    keyLabel: string;
    lastUsed?: bigint;
}
export interface Property {
    id: string;
    posterId: string;
    endDate: bigint;
    publishDate: bigint;
    description: string;
    isActive: boolean;
    leads: Array<ContactRequest>;
    listingType: PropertyListingType;
    expectedPrice: number;
    location: Location;
}
export interface LeaveRequest {
    id: string;
    status: LeaveStatus;
    endDate: string;
    createdAt: bigint;
    merchantId: string;
    approverNote: string;
    employeeId: string;
    startDate: string;
    reason: string;
}
export interface MerchantRevenueTrendEntry {
    revenue: number;
    period: string;
}
export interface StepDiagnostic {
    status: string;
    outputExpected: string;
    issueType?: string;
    diagnosticMessage: string;
    stepIndex: bigint;
    inputReceived: string;
    executionMs: bigint;
    outputProduced: string;
    prevNodeOutput: string;
    nextNodeExpectedInput: string;
    inputExpected: string;
    nodeName: string;
    nodeType: string;
}
export interface MatchScore {
    id: string;
    matchTime: string;
    status: string;
    fetchedAt: bigint;
    homeTeam: string;
    createdAt: bigint;
    sport: string;
    updatedAt: bigint;
    homeScore: string;
    awayTeam: string;
    awayScore: string;
    leagueName: string;
}
export interface ManufacturerEmployee {
    id: string;
    name: string;
    createdAt: bigint;
    role: ManufacturerEmployeeRole;
    isActive: boolean;
    manufacturerId: string;
    phone: string;
}
export type Result_24 = {
    __kind__: "ok";
    ok: Event;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface VisitorCheckin {
    id: string;
    communityMemberId: string;
    communityId: string;
    vehicleDetails: string;
    date: string;
    checkInTime: bigint;
    approvalStatus: VisitorApprovalStatus;
    visitorName: string;
    checkOutTime?: bigint;
    purpose: string;
    visitorPhone: string;
}
export type Result_14 = {
    __kind__: "ok";
    ok: RestockOrder;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface Employee {
    id: string;
    permissions: Array<string>;
    name: string;
    createdAt: bigint;
    role: EmployeeRole;
    isActive: boolean;
    email: string;
    passwordHash: string;
    phone: string;
}
export interface POSOrder {
    id: string;
    status: string;
    total: number;
    source: string;
    buyerPhone: string;
    timestamp: bigint;
    manufacturerId: string;
    buyerName: string;
    products: Array<POSOrderLine>;
    deliveryPartnerId?: string;
}
export interface DPEarnings {
    pendingCount: bigint;
    totalEarned: number;
    completedCount: bigint;
    pendingPayouts: number;
}
export interface CourseRow {
    id: string;
    status: string;
    title: string;
    createdDate: bigint;
    description: string;
    languagePair: string;
    price: bigint;
    enrollmentCount: bigint;
}
export type Result_33 = {
    __kind__: "ok";
    ok: FreeRideSarthi;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_43 = {
    __kind__: "ok";
    ok: Notification;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface ProductLocationPrice {
    id: string;
    createdAt: bigint;
    cityId: string;
    productId: string;
    updatedAt: bigint;
    price: number;
    branchId: string;
}
export interface DeliveryDashboardData {
    activeDeliveries: bigint;
    passdigitRequired: boolean;
    subscriptionStatus: string;
    totalEarnings: number;
    rating: number;
}
export interface MenuOption {
    id: string;
    optionLabel: string;
    sortOrder: bigint;
    flowId: string;
    createdAt: bigint;
    isActive: boolean;
    updatedAt: bigint;
    roles: Array<string>;
    cityModuleKey: string;
}
export interface KYCDocuments {
    personalQRUrl?: string;
    outletPhotoUrl?: string;
    aadhaarImageUrl?: string;
    gstImageUrl?: string;
    gstNumber?: string;
    panImageUrl?: string;
    cancelledChequeUrl?: string;
    panNumber?: string;
    aadhaarNumber?: string;
    verificationStatus: VerificationStatus;
}
export interface DeliveryAssignment {
    id: string;
    status: string;
    city: string;
    createdAt: bigint;
    description: string;
    requesterType: string;
    assignedPartners: Array<AssignedPartner>;
    requestedCount: bigint;
    requesterId: string;
}
export interface CourseApprovalRow {
    id: string;
    status: string;
    adminNotes: string;
    courseId: string;
}
export interface CategorySpend {
    category: string;
    amount: number;
}
export interface MerchantDashboardData {
    pendingBookings: bigint;
    passdigitRequired: boolean;
    earningsByDate: Array<EarningsByDate>;
    subscriptionStatus: string;
    recentOrders: bigint;
    servicesByType: Array<[string, bigint]>;
}
export interface FlowAgentRun {
    id: string;
    status: string;
    completedAt?: bigint;
    totalFlows: bigint;
    startedAt: bigint;
    issuesFound: bigint;
    fixesApplied: bigint;
    triggeredBy: string;
    passedFlows: bigint;
    flowsScoped: Array<string>;
    failedFlows: bigint;
}
export type Result_52 = {
    __kind__: "ok";
    ok: OrderPaymentQR;
} | {
    __kind__: "err";
    err: ApiError;
};
export enum AccountEntryType {
    expense = "expense",
    receivable = "receivable",
    income = "income",
    payable = "payable"
}
export enum BillType {
    utility = "utility",
    other = "other",
    rent = "rent",
    sale_bill = "sale_bill",
    purchase_bill = "purchase_bill"
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    initiated = "initiated",
    refunded = "refunded",
    confirmed = "confirmed",
    failed = "failed"
}
export enum BudgetWarningLevel {
    exceeded = "exceeded",
    none = "none",
    approaching = "approaching"
}
export enum BuyerType {
    distributor = "distributor",
    customer = "customer",
    merchant = "merchant"
}
export enum ComplaintStatus {
    resolved = "resolved",
    in_progress = "in_progress",
    open = "open"
}
export enum ContactRequestStatus {
    pending = "pending",
    approved = "approved",
    declined = "declined"
}
export enum ConversationState {
    familyMenu = "familyMenu",
    promotionPostLocation = "promotionPostLocation",
    merchantMenu = "merchantMenu",
    custConfirmPassdigit = "custConfirmPassdigit",
    familyAddOccupation = "familyAddOccupation",
    orderTracking = "orderTracking",
    jobContactApproval = "jobContactApproval",
    customerMenu = "customerMenu",
    merchantAddProductVideo = "merchantAddProductVideo",
    familyAddGender = "familyAddGender",
    merchantAddProductConfirm = "merchantAddProductConfirm",
    dpOrders = "dpOrders",
    authOtpVerify = "authOtpVerify",
    merchantAddProductBulk = "merchantAddProductBulk",
    propertyPostDesc2 = "propertyPostDesc2",
    merchantAddProductDesc = "merchantAddProductDesc",
    familyAddEducation = "familyAddEducation",
    eventPostTickets = "eventPostTickets",
    promotionPostTitle = "promotionPostTitle",
    merchantAddProductRate = "merchantAddProductRate",
    dpRegAadhaar = "dpRegAadhaar",
    propertySearch = "propertySearch",
    supplierOrderDone = "supplierOrderDone",
    merchantAddProductDiscount = "merchantAddProductDiscount",
    propertyRequestContact = "propertyRequestContact",
    orderNotFound = "orderNotFound",
    merchantRegBooking = "merchantRegBooking",
    authPassdigit = "authPassdigit",
    professionalServicesSearch = "professionalServicesSearch",
    merchantFulfill = "merchantFulfill",
    propertyMyListings = "propertyMyListings",
    supplierOrderItem = "supplierOrderItem",
    customerLocation = "customerLocation",
    supplierOrderList = "supplierOrderList",
    rideDeclined = "rideDeclined",
    propertyContactRequest = "propertyContactRequest",
    jobPostSalary = "jobPostSalary",
    jobPostTitle = "jobPostTitle",
    propertyPostLocation2 = "propertyPostLocation2",
    merchantRegBranchRadius = "merchantRegBranchRadius",
    promotionPayment = "promotionPayment",
    authConfirmPassdigit = "authConfirmPassdigit",
    shuttleResults = "shuttleResults",
    propertyMenu = "propertyMenu",
    welcome = "welcome",
    jobPostTitle2 = "jobPostTitle2",
    propertyPost = "propertyPost",
    healthcareBooking = "healthcareBooking",
    transportOrigin = "transportOrigin",
    registerCustomer = "registerCustomer",
    orderCategory = "orderCategory",
    merchantReject = "merchantReject",
    jobPostConfirm = "jobPostConfirm",
    subscriptionPrompt = "subscriptionPrompt",
    customOrderTracking = "customOrderTracking",
    jobMenu = "jobMenu",
    jobPost = "jobPost",
    merchantAccept = "merchantAccept",
    freeRideIncoming = "freeRideIncoming",
    roleSelect = "roleSelect",
    supplierOrderQty = "supplierOrderQty",
    familyAddCaste = "familyAddCaste",
    merchantAddProductCondition = "merchantAddProductCondition",
    inquirySent = "inquirySent",
    dpAvailableOrders = "dpAvailableOrders",
    transportBooked = "transportBooked",
    jobPostSalaryMax = "jobPostSalaryMax",
    jobPostSalaryMin = "jobPostSalaryMin",
    jobPostLocation2 = "jobPostLocation2",
    flightBookingMenu = "flightBookingMenu",
    propertyPostType2 = "propertyPostType2",
    supplierOrderNotes = "supplierOrderNotes",
    eventPublished = "eventPublished",
    merchantOrderDetail = "merchantOrderDetail",
    propertyPostCategory = "propertyPostCategory",
    jobPostDesc = "jobPostDesc",
    jobMyListings = "jobMyListings",
    merchantRegCategory = "merchantRegCategory",
    familyAddMatrimonyEligible = "familyAddMatrimonyEligible",
    merchantComplete = "merchantComplete",
    sarthiOrders = "sarthiOrders",
    shuttleSearchSource = "shuttleSearchSource",
    orderCart = "orderCart",
    dpCollectPayment = "dpCollectPayment",
    familyAddLocationPref = "familyAddLocationPref",
    jobBrowse = "jobBrowse",
    toursMenu = "toursMenu",
    dpRegVehicle = "dpRegVehicle",
    customOrderConfirm = "customOrderConfirm",
    otpVerify = "otpVerify",
    orderPlaced = "orderPlaced",
    shuttleBookConfirm = "shuttleBookConfirm",
    professionalServicesMenu = "professionalServicesMenu",
    merchantRegMultibranch = "merchantRegMultibranch",
    propertyPostDesc = "propertyPostDesc",
    merchantAddProductImageLink = "merchantAddProductImageLink",
    merchantSetPassdigit = "merchantSetPassdigit",
    familySaved = "familySaved",
    authOtpSent = "authOtpSent",
    busBookingMenu = "busBookingMenu",
    donationsMenu = "donationsMenu",
    supportDescInput = "supportDescInput",
    payBillsMenu = "payBillsMenu",
    propertyPostPrice2 = "propertyPostPrice2",
    propertyPostType = "propertyPostType",
    merchantOrders = "merchantOrders",
    custRegLocation = "custRegLocation",
    orderSearchFurther = "orderSearchFurther",
    customOrderItem = "customOrderItem",
    merchantRegRadius = "merchantRegRadius",
    propertySearchResults = "propertySearchResults",
    dpRegRc = "dpRegRc",
    inquiryResult = "inquiryResult",
    custRegOtp = "custRegOtp",
    healthcareMenu = "healthcareMenu",
    merchantRegPayment = "merchantRegPayment",
    dpDeliveryInstructions = "dpDeliveryInstructions",
    promotionPlanSelect = "promotionPlanSelect",
    dpOrderDetail = "dpOrderDetail",
    merchantRegAdvance = "merchantRegAdvance",
    eventPostPrice = "eventPostPrice",
    merchantAddProductImage = "merchantAddProductImage",
    transportEstimate = "transportEstimate",
    propertyPostLocation = "propertyPostLocation",
    jobMyListings2 = "jobMyListings2",
    orderConfirm = "orderConfirm",
    supportConfirm = "supportConfirm",
    custSetPassdigit = "custSetPassdigit",
    merchantRegDeliveryType = "merchantRegDeliveryType",
    orderSearchInput = "orderSearchInput",
    orderSearch = "orderSearch",
    freeRideOTPEntry = "freeRideOTPEntry",
    customerLocationConfirm = "customerLocationConfirm",
    eventPostDates = "eventPostDates",
    familyAddBloodGroup = "familyAddBloodGroup",
    dpPickupConfirmed = "dpPickupConfirmed",
    promotionPendingApproval = "promotionPendingApproval",
    custRegName = "custRegName",
    registerMerchant = "registerMerchant",
    freeRideSearchAgain = "freeRideSearchAgain",
    merchantCollectionPending = "merchantCollectionPending",
    merchantRegBranchAddr = "merchantRegBranchAddr",
    mainMenu = "mainMenu",
    jobPublished = "jobPublished",
    dpRegName = "dpRegName",
    shuttleSearchDest = "shuttleSearchDest",
    familyAddRelationName = "familyAddRelationName",
    jobSearchResults = "jobSearchResults",
    eventPostLocation = "eventPostLocation",
    dpRegType = "dpRegType",
    jobSearch = "jobSearch",
    merchantRegBranchMore = "merchantRegBranchMore",
    authSetNewPassdigit = "authSetNewPassdigit",
    dpPickupInstructions = "dpPickupInstructions",
    propertyPostConfirm = "propertyPostConfirm",
    dpMenu = "dpMenu",
    familyAddSelfSurname = "familyAddSelfSurname",
    transportTracking = "transportTracking",
    sarthiOrderDetail = "sarthiOrderDetail",
    supportMenu = "supportMenu",
    transportDest = "transportDest",
    merchantActions = "merchantActions",
    sarthiPassengerOTPVerify = "sarthiPassengerOTPVerify",
    merchantRegName = "merchantRegName",
    eventSearch = "eventSearch",
    shuttleMenu = "shuttleMenu",
    registerDeliveryPartner = "registerDeliveryPartner",
    orderSearch2 = "orderSearch2",
    jobPostCategory = "jobPostCategory",
    transportMenu = "transportMenu",
    merchantRegType = "merchantRegType",
    eventPostDesc = "eventPostDesc",
    familyAddSelfName = "familyAddSelfName",
    familyAddRelationship = "familyAddRelationship",
    trainBookingMenu = "trainBookingMenu",
    dpRegPan = "dpRegPan",
    dpPaymentConfirmed = "dpPaymentConfirmed",
    dpComplete = "dpComplete",
    promotionPostReelLink = "promotionPostReelLink",
    eventPostName = "eventPostName",
    familyAddPhone = "familyAddPhone",
    merchantOrderList = "merchantOrderList",
    propertyPublished = "propertyPublished",
    eventPostPaid = "eventPostPaid",
    authPassdigitWrong = "authPassdigitWrong",
    shuttleBooked = "shuttleBooked",
    dpAccept = "dpAccept",
    registerType = "registerType",
    merchantConfirmPassdigit = "merchantConfirmPassdigit",
    healthcareSearch = "healthcareSearch",
    propertyBrowse = "propertyBrowse",
    merchantRegRental = "merchantRegRental",
    merchantViewOrder = "merchantViewOrder",
    authSessionLocked = "authSessionLocked",
    supplierOrderSupplier = "supplierOrderSupplier",
    approvePropertyContact = "approvePropertyContact",
    deliveryActions = "deliveryActions",
    merchantRegOutlet = "merchantRegOutlet",
    freeRideResults = "freeRideResults",
    jobRequestContact = "jobRequestContact",
    sarthiMenu = "sarthiMenu",
    freeRideSearch = "freeRideSearch",
    merchantAddProductTitle = "merchantAddProductTitle",
    propertyContactApproval = "propertyContactApproval",
    approveJobContact = "approveJobContact",
    jobContactRequest = "jobContactRequest",
    freeRideSearchDest = "freeRideSearchDest",
    promotionMenu = "promotionMenu",
    dpVendorSettlement = "dpVendorSettlement",
    jobPostDesc2 = "jobPostDesc2",
    freeRideCompleted = "freeRideCompleted",
    toursSearch = "toursSearch",
    orderResults = "orderResults",
    promotionPostImageLink = "promotionPostImageLink",
    jobPostLocation = "jobPostLocation",
    familyAddAddress = "familyAddAddress",
    dpSetPassdigit = "dpSetPassdigit",
    sarthiFreeRideOTP = "sarthiFreeRideOTP",
    eventMenu = "eventMenu",
    dpConfirmPassdigit = "dpConfirmPassdigit",
    propertyPostPrice = "propertyPostPrice",
    transportVehicle = "transportVehicle",
    supplierOrderConfirm = "supplierOrderConfirm"
}
export enum CustomerRating {
    bad = "bad",
    good = "good",
    neutral = "neutral"
}
export enum DeliveryType {
    delivery = "delivery",
    takeaway = "takeaway"
}
export enum DietaryType {
    veg = "veg",
    nonveg = "nonveg",
    vegan = "vegan"
}
export enum EmployeeLeaveStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum EmployeeRole {
    manager = "manager",
    admin = "admin",
    agent = "agent"
}
export enum EmployeeRole__1 {
    delivery_coordinator = "delivery_coordinator",
    store_manager = "store_manager",
    cashier = "cashier"
}
export enum EventStatus {
    cancelled = "cancelled",
    expired = "expired",
    pending = "pending",
    published = "published"
}
export enum FacilityType {
    gym = "gym",
    other = "other",
    garden = "garden",
    meetingRoom = "meetingRoom",
    commonHall = "commonHall"
}
export enum FamilyConnectRequestStatus {
    cancelled = "cancelled",
    pending = "pending",
    accepted = "accepted"
}
export enum FamilyInviteStatus {
    cancelled = "cancelled",
    pending = "pending",
    inactive = "inactive",
    connected = "connected"
}
export enum GroupType {
    friends = "friends",
    family = "family"
}
export enum InventoryTransactionType {
    adjustment = "adjustment",
    expiry_write_off = "expiry_write_off",
    sale = "sale",
    restock = "restock",
    return_item = "return_item",
    purchase = "purchase"
}
export enum JobType {
    permanent = "permanent",
    adhoc_daily = "adhoc_daily",
    adhoc_weekly = "adhoc_weekly",
    oneoff = "oneoff"
}
export enum LeadStatus {
    closed = "closed",
    responded = "responded",
    open = "open"
}
export enum ManufacturerEmployeeRole {
    inventory = "inventory",
    sale = "sale",
    restock = "restock",
    accounts = "accounts",
    complaints = "complaints",
    bills = "bills",
    general = "general",
    expiry = "expiry",
    purchase = "purchase"
}
export enum MerchantPerformanceTier {
    bronze = "bronze",
    gold = "gold",
    platinum = "platinum",
    silver = "silver"
}
export enum MerchantType {
    order = "order",
    inquiry = "inquiry"
}
export enum MessageSender {
    bot = "bot",
    user = "user"
}
export enum NotificationStatus {
    pending = "pending",
    sent = "sent",
    failed = "failed"
}
export enum OrderStatus {
    new_ = "new",
    assigned = "assigned",
    cancelled = "cancelled",
    expired = "expired",
    pending = "pending",
    completed = "completed",
    inTransit = "inTransit",
    vendorSettled = "vendorSettled",
    rejected = "rejected",
    delivered = "delivered",
    accepted = "accepted",
    paymentCollected = "paymentCollected"
}
export enum ParkingType {
    open = "open",
    covered = "covered"
}
export enum PaySprintEnvironment {
    uat = "uat",
    live = "live"
}
export enum PaySprintServiceType {
    bus = "bus",
    lpg = "lpg",
    billPayment = "billPayment",
    train = "train",
    municipality = "municipality",
    flight = "flight",
    insurance = "insurance",
    recharge = "recharge",
    fastTag = "fastTag"
}
export enum PaymentMode {
    cod = "cod",
    qrCode = "qrCode",
    online = "online"
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    partialPaid = "partialPaid"
}
export enum PaymentStatusPurchase {
    pending = "pending",
    paid = "paid"
}
export enum PaymentStatusSale {
    pending = "pending",
    paid = "paid",
    partial = "partial"
}
export enum PaymentStatus__1 {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    unpaid = "unpaid",
    failed = "failed"
}
export enum PromotionReach {
    reach1000 = "reach1000",
    reach2000 = "reach2000",
    reach100 = "reach100",
    reach200 = "reach200",
    reach500 = "reach500"
}
export enum PromotionStatus {
    active = "active",
    completed = "completed",
    pendingApproval = "pendingApproval",
    pendingPayment = "pendingPayment",
    approved = "approved",
    rejected = "rejected"
}
export enum PropertyListingType {
    buy = "buy",
    rent = "rent",
    sale = "sale",
    lease = "lease"
}
export enum Relationship {
    son = "son",
    husband = "husband",
    relative = "relative",
    wife = "wife",
    daughter = "daughter",
    friend = "friend",
    brother = "brother",
    sister = "sister",
    mother = "mother",
    father = "father"
}
export enum RestockStatus {
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    accepted = "accepted"
}
export enum ServiceType {
    sarthi = "sarthi",
    delivery = "delivery"
}
export enum ShiftStatus {
    active = "active",
    completed = "completed"
}
export enum ShuttleBookingStatus {
    cancelled = "cancelled",
    completed = "completed",
    boarded = "boarded",
    confirmed = "confirmed"
}
export enum SpendTrend {
    up = "up",
    down = "down",
    flat = "flat"
}
export enum SubscriptionAssignmentStatus {
    active = "active",
    expired = "expired",
    blocked = "blocked",
    paused = "paused"
}
export enum SubscriptionPlanType {
    duration = "duration",
    flat = "flat",
    free = "free",
    category = "category",
    monthly = "monthly",
    percentage = "percentage",
    weekly = "weekly"
}
export enum SupplierOrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed",
    received = "received"
}
export enum SupportTicketCategory {
    other = "other",
    payment_stuck = "payment_stuck",
    behaviour_complaint = "behaviour_complaint"
}
export enum SupportTicketPriority {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum SupportTicketStatus {
    new_ = "new",
    resolved = "resolved",
    closed = "closed",
    assigned = "assigned",
    in_progress = "in_progress"
}
export enum TourBookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum TransactionStatus {
    pending = "pending",
    refunded = "refunded",
    success = "success",
    failed = "failed"
}
export enum TransportStatus {
    cancelled = "cancelled",
    pending = "pending",
    rideStarted = "rideStarted",
    arrived = "arrived",
    headingToPickup = "headingToPickup",
    completed = "completed",
    onTheWay = "onTheWay",
    accepted = "accepted",
    paymentCollected = "paymentCollected",
    arrivedDestination = "arrivedDestination"
}
export enum UserRole {
    admin = "admin",
    sarthi = "sarthi",
    customer = "customer",
    deliveryPartner = "deliveryPartner",
    merchant = "merchant"
}
export enum Variant_active_inactive {
    active = "active",
    inactive = "inactive"
}
export enum Variant_deliveryPartner_merchant {
    deliveryPartner = "deliveryPartner",
    merchant = "merchant"
}
export enum VehicleType {
    bus = "bus",
    car = "car",
    van = "van",
    tempo = "tempo",
    truck = "truck",
    auto = "auto",
    bike = "bike",
    scooter = "scooter"
}
export enum VerificationStatus {
    verified = "verified",
    pending = "pending",
    rejected = "rejected"
}
export enum VisitorApprovalStatus {
    pending = "pending",
    denied = "denied",
    approved = "approved"
}
export enum WorkServiceType {
    cleaning = "cleaning",
    security = "security",
    electrician = "electrician",
    accounts = "accounts",
    maintenance = "maintenance",
    pestControl = "pestControl"
}
export interface backendInterface {
    activateShuttleRoute(routeId: string): Promise<Result_12>;
    addAccountEntry(manufacturerId: string, entryType: AccountEntryType, category: string, amount: number, description: string, referenceId: string | null, entryDate: string): Promise<{
        __kind__: "ok";
        ok: AccountEntry;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Add an Internet Identity principal to the admin whitelist.
     * / Only existing admins can call this.
     */
    addAdminPrincipal(p: Principal): Promise<Result_28>;
    addAppVersion(brandName: string, platform: string, version: string, buildNumber: bigint): Promise<Result_34>;
    addBillRecord(manufacturerId: string, billType: BillType, partyName: string, amount: number, dueDate: string | null, isPaid: boolean, pendingPayment: boolean, pendingNote: string, notes: string): Promise<{
        __kind__: "ok";
        ok: BillRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addBlogReview(review: BlogReview): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addCity(name: string, pincode: string): Promise<{
        __kind__: "ok";
        ok: City;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Add a CityControl record for a city (creates if missing, returns existing if already present).
     */
    addCityControl(cityId: string): Promise<{
        __kind__: "ok";
        ok: CityControl;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addCourse(creatorPhone: string, title: string, languagePair: string, description: string, price: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    addCustomerRating(rating: CustomerRating__1): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addDPPetrolExpense(partnerId: string, date: string, amount: number, liters: number, notes: string): Promise<PetrolExpense>;
    addDeliveryPartnerToDistributor(distributorId: string, phone: string, name: string, route: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    addDistributorToNetwork(manufacturerId: string, distributorName: string, distributorPhone: string, city: string, pincode: string, schemeApplicable: string, marginPercent: number, routeDescription: string): Promise<{
        __kind__: "ok";
        ok: DistributorNetwork;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    /**
     * / Add a donation offer.
     */
    addDonation(category: string, description: string, quantity: string, location: string, contactPhone: string, donorPhone: string, donorName: string, source: string): Promise<Result_30>;
    addEmployee(name: string, email: string, phone: string, passwordHash: string, role: EmployeeRole, permissions: Array<string>): Promise<Result_25>;
    addFamilyMember(ownerPhone: string, ownerName: string, ownerSurname: string, relationship: Relationship, relationName: string, relationPhone: string, relationAddress: string, gender: string): Promise<Result_22>;
    addFriend(ownerPhone: string, friendName: string, friendPhone: string): Promise<Result_22>;
    addHealthcareProvider(name: string, specialization: string, location: string, phone: string, availableDays: string, fee: bigint): Promise<Result_23>;
    addInventoryItem(manufacturerId: string, productId: string, productName: string, batchCode: string, currentStock: bigint, reorderLevel: bigint, unit: string, expiryDate: string | null): Promise<{
        __kind__: "ok";
        ok: InventoryItem;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addJobLocation(loc: JobLocation): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addManufacturerEmployee(manufacturerId: string, name: string, phone: string, role: ManufacturerEmployeeRole): Promise<{
        __kind__: "ok";
        ok: ManufacturerEmployee;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addManufacturerPOSOrder(order: POSOrder): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addManufacturerProduct(manufacturerId: string, productName: string, batchNumber: string, hsnCode: string | null, batchCode: string | null, originCity: string, manufactureDate: bigint, expiryDate: string | null, priceToDistributor: number, priceToCustomer: number, bulkPricingTiers: Array<BulkPricingTier>, isReturnable: boolean, stockQty: bigint): Promise<{
        __kind__: "ok";
        ok: ManufacturerProduct;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    addMenuOption(option: MenuOption): Promise<Result_21>;
    addMerchantBranch(merchantId: string, branch: Branch): Promise<Result_4>;
    addMerchantEmployee(merchantId: string, name: string, phone: string, role: string): Promise<MerchantEmployee>;
    addOrUpdateCommunityMember(member: CommunityMember): Promise<void>;
    addOrderStatusHistory(id: string, actor: string, note: string): Promise<Result_18>;
    addPetrolExpense(dpId: string, date: string, amount: number, liters: number, notes: string | null): Promise<Result_57>;
    addProduct(merchantId: string, title: string, imageUrls: Array<string>, videoUrl: string | null, description: string, isNew: boolean, baseRate: number, bulkRates: Array<BulkRate>, specialDiscount: number, qty: bigint, packing: string, expiry: string): Promise<Result_48>;
    /**
     * / Record a product barcode scan event for a merchant device.
     */
    addProductScanHistory(entry: ProductScanHistoryInput): Promise<{
        __kind__: "ok";
        ok: ProductScanHistory;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    /**
     * / Bulk-add products from Excel or photo menu upload.
     */
    addProductsBulk(merchantId: string, products: Array<ProductInput>): Promise<Result_42>;
    addProfessionalService(name: string, serviceType: string, location: string, phone: string, experience: string, hourlyRate: bigint, description: string, areaRates: Array<[string, number]>): Promise<Result_16>;
    addPurchaseRecord(manufacturerId: string, supplierName: string, supplierId: string | null, items: Array<[string, string, bigint, number]>, totalAmount: number, invoiceNo: string): Promise<{
        __kind__: "ok";
        ok: PurchaseRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addSaleRecord(manufacturerId: string, buyerId: string, buyerType: BuyerType, items: Array<[string, string, bigint, number]>, totalAmount: number, invoiceNo: string): Promise<{
        __kind__: "ok";
        ok: SaleRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addTip(entityId: string, entityType: string, amount: bigint, fromCustomerId: string, toPartnerId: string): Promise<Result_56>;
    addTourOperator(name: string, destination: string, tourType: string, duration: string, price: bigint, phone: string, description: string): Promise<Result_9>;
    addVisitorCheckin(visitorName: string, visitorPhone: string, purpose: string, communityId: string, communityMemberId: string, vehicleDetails: string): Promise<VisitorCheckin>;
    applyApprovedFixes(runId: string): Promise<{
        reTestRunId: string;
    }>;
    applyLeave(employeeId: string, merchantId: string, startDate: string, endDate: string, reason: string): Promise<LeaveRequest>;
    approveCourse(courseId: string, adminNotes: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    approveExpiryReturn(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    approveFlowFixes(runId: string, flowId: string, fixIds: Array<string>, adminOverrides: Array<[string, string]>): Promise<boolean>;
    approveJobContactShare(jobId: string, leadUserId: string): Promise<Result_35>;
    approveLeave(id: string, approverNote: string): Promise<{
        __kind__: "ok";
        ok: LeaveRequest;
    } | {
        __kind__: "err";
        err: string;
    }>;
    approveManufacturerLeave(requestId: string, approve: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    approvePromotion(id: string): Promise<Result_29>;
    /**
     * / Admin approves a promotion so it can be fired.
     */
    approvePromotionAdmin(id: string): Promise<{
        __kind__: "ok";
        ok: Promotion;
    } | {
        __kind__: "err";
        err: string;
    }>;
    approvePropertyContactShare(propertyId: string, leadUserId: string): Promise<Result_35>;
    approveVisitorEntry(id: string, status: string): Promise<{
        __kind__: "ok";
        ok: VisitorCheckin;
    } | {
        __kind__: "err";
        err: string;
    }>;
    assignDeliveryPartner(orderId: string, dpId: string): Promise<Result_18>;
    assignPlanToUser(userId: string, planId: string): Promise<Result_46>;
    assignSarthiPartner(bookingId: string, sarthiPartnerId: string): Promise<Result_27>;
    /**
     * / Assign a delivery user (by phone) to a merchant's subscription slot with an order cap.
     */
    assignUserToSubscription(merchantId: string, userPhone: string, orderCap: bigint): Promise<Result_55>;
    blockBusSeat(tripId: string, seatName: string, fare: number, baseFare: number, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    blockBusSeatPub(tripId: string, seatName: string, fare: number, baseFare: number, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    bookBusTicket(booking: BusBooking, blockKey: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: BusBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    bookBusTicketPub(booking: BusBooking, blockKey: string, credId: string): Promise<{
        __kind__: "ok";
        ok: BusBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    bookFlight(booking: FlightBooking, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: FlightBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    bookFlightPub(booking: FlightBooking, credId: string): Promise<{
        __kind__: "ok";
        ok: FlightBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    bookHealthcareAppointment(providerId: string, customerPhone: string, date: string, timeSlot: string, notes: string): Promise<HealthcareAppointment>;
    bookProfessionalService(serviceId: string, customerPhone: string, date: string, timeSlot: string, duration: bigint, notes: string, customerArea: string | null): Promise<ServiceBooking>;
    bookShuttle(passengerPhone: string, routeId: string, boardingStop: string, dropStop: string): Promise<Result>;
    bookTour(operatorId: string, customerPhone: string, destination: string, tourType: string, date: string, passengerCount: bigint): Promise<TourBooking>;
    bookTrainTicket(booking: TrainBooking, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: TrainBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    bookTrainTicketPub(booking: TrainBooking, credId: string): Promise<{
        __kind__: "ok";
        ok: TrainBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    calculateFare(vehicleType: VehicleType, serviceType: ServiceType, distanceKm: number): Promise<number>;
    cancelBusTicket(bookingId: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: BusBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    cancelBusTicketPub(bookingId: string, credId: string): Promise<{
        __kind__: "ok";
        ok: BusBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    cancelFlight(bookingId: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: FlightBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    cancelFlightPub(bookingId: string, credId: string): Promise<{
        __kind__: "ok";
        ok: FlightBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    cancelTrainTicket(bookingId: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: TrainBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    cancelTrainTicketPub(bookingId: string, credId: string): Promise<{
        __kind__: "ok";
        ok: TrainBooking;
    } | {
        __kind__: "err";
        err: string;
    }>;
    checkAndAssignSubscription(userId: string): Promise<SubscriptionStatus>;
    checkAndEnforceSubscription(userId: string): Promise<{
        hasActive: boolean;
        plans: Array<SubscriptionPlan>;
    }>;
    checkAndSendOverdueReminders(): Promise<bigint>;
    /**
     * / Returns true if the assigned user is still within their per-user order cap.
     */
    checkAssignedUserOrderCap(merchantId: string, userPhone: string): Promise<boolean>;
    /**
     * / Moderate a custom order via internet-based HTTP outcall check (async).
     * / Falls back to keyword-based if outcall fails.
     */
    checkCustomOrderModeration(orderText: string): Promise<{
        categories: Array<string>;
        isIllegal: boolean;
        confidence: number;
    }>;
    checkCustomerBudget(userId: string, orderAmount: number): Promise<BudgetCheckResult>;
    checkCustomerExists(phone: string): Promise<boolean>;
    checkInquiryLimit(userId: string): Promise<Result_3>;
    /**
     * / Check text content for illegal/inappropriate items using keyword moderation.
     * / Returns { approved: Bool; flaggedCategories: [Text]; reason: Text }.
     */
    checkItemModeration(text: string): Promise<{
        flaggedCategories: Array<string>;
        approved: boolean;
        reason: string;
    }>;
    checkOrderLimit(userId: string): Promise<Result_3>;
    checkOutVisitor(id: string): Promise<{
        __kind__: "ok";
        ok: VisitorCheckin;
    } | {
        __kind__: "err";
        err: string;
    }>;
    checkProductPriceUniformity(productId: string): Promise<ProductPriceUniformity>;
    checkUserSubscriptionAccess(userId: string): Promise<SubscriptionAccessResult>;
    /**
     * / Clear all bot logs for the specified platform ("telegram", "whatsapp", "sms", or "all").
     */
    clearBotLogs(platform: string): Promise<void>;
    /**
     * / Clear ALL stuck flow caches immediately (admin full flush).
     */
    clearFlowCache(): Promise<void>;
    clearScriptRunResults(): Promise<void>;
    /**
     * / Clear the simulator session for a given phone — resets state to #welcome.
     */
    clearSimulatorSession(phone: string): Promise<void>;
    /**
     * / Clear stuck custom-order flow states.
     * / If userId is provided, clears only that user's pending state.
     * / If null, clears all states that have been pending for more than 30 minutes.
     * / Returns the number of states cleared.
     */
    clearUserFlowCache(userId: string | null): Promise<bigint>;
    /**
     * / Clear the registered Telegram webhook (calls Telegram's deleteWebhook API), then
     * / immediately drain any pending updates via getUpdates. This is the "diagnostic drain"
     * / tool — use it to switch from webhook mode to polling mode and flush queued messages.
     * /
     * / Steps:
     * /   1. Calls https://api.telegram.org/bot{TOKEN}/deleteWebhook
     * /   2. Clears webhookUrl in the stored config so pollUpdates conflict guard allows polling
     * /   3. Drains all pending updates via getUpdates, processes each through the chatbot engine
     * /   4. Returns the count of messages processed
     * /
     * / After calling this you MUST either:
     * /   a) Re-register the webhook (setWebhook) to restore webhook mode, OR
     * /   b) Call pollTelegramUpdates() periodically (no webhook registered)
     */
    clearWebhookAndPoll(): Promise<Result_41>;
    closeExpiredJobs(): Promise<bigint>;
    closeExpiredProperties(): Promise<bigint>;
    closeLead(leadId: string): Promise<Result_38>;
    compareShuttleRoutesWithLiveData(): Promise<Array<ShuttleRoute>>;
    completeOrder(orderId: string): Promise<Result_18>;
    completeRide(bookingId: string): Promise<Result_27>;
    completeShuttleRide(bookingId: string): Promise<Result>;
    configureAgentChannelSync(whatsapp: boolean, telegram: boolean, sms: boolean): Promise<boolean>;
    confirmManualOrder(orderId: string, paymentMode: PaymentMode): Promise<Result_18>;
    confirmPromotionPayment(id: string): Promise<Result_29>;
    confirmSubscriptionQRPayment(planId: string, userId: string, _transactionRef: string): Promise<Result_46>;
    createAdhocJob(title: string, category: string, pricePerDay: number, educationLevel: string, location: Location, phone: string, description: string, posterId: string, jobType: JobType): Promise<Result_40>;
    /**
     * / Admin: create a new adhoc job directly (bypasses chatbot flow).
     */
    createAdhocJobAdmin(title: string, category: string, pricePerDay: number, educationLevel: string, address: string, phone: string, description: string, posterId: string, jobType: JobType): Promise<string>;
    createBlog(blog: Blog): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createCommunityFoodOrder(buyerPhone: string, sellerPhone: string, communityId: string, mealDescription: string, cuisineType: string, dietary: string, deliveryTime: string, quantity: bigint, cost: number): Promise<CommunityFoodOrder>;
    createCommunityParkingBooking(memberPhone: string, communityId: string, parkingType: string, startDate: string, endDate: string, cost: number): Promise<CommunityParkingBooking>;
    createCommunityRoomBooking(memberPhone: string, communityId: string, facilityType: string, bookingDate: string, timeSlot: string, description: string): Promise<CommunityRoomBooking>;
    createCommunityWorkOrder(memberPhone: string, communityId: string, serviceType: string, description: string, scheduledDate: string): Promise<CommunityWorkOrder>;
    /**
     * / Create a delivery assignment for a merchant or manufacturer.
     * / Assigns up to requestedCount available delivery partners from the pool.
     */
    createDeliveryAssignment(requesterId: string, requesterType: string, requestedCount: bigint, city: string, description: string, partnerPhones: Array<string>): Promise<{
        __kind__: "ok";
        ok: DeliveryAssignment;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createEvent(organizerPhone: string, organizerName: string, eventName: string, description: string, isPaid: boolean, price: number, locationAddress: string, startDate: string, endDate: string, ticketVenue: string): Promise<Result_24>;
    createLead(phone: string, searchQuery: string, category: string, location: Location): Promise<Lead>;
    createLendingItem(item: LendingItem): Promise<string>;
    createManualOrder(customerPhone: string, merchantId: string, manualItems: Array<ManualOrderItem>, customerAddress: Location | null): Promise<Result_18>;
    createMarketplaceItem(input: MarketplaceItemInput, createdBy: string): Promise<MarketplaceItem>;
    /**
     * / Admin: create a marketplace item directly.
     */
    createMarketplaceItemAdmin(title: string, price: number, category: string, listingType: string, createdBy: string): Promise<string>;
    createMerchant(userId: string, phone: string, businessName: string, category: string, merchantType: MerchantType, location: Location, deliveryType: DeliveryType, deliveryRadius: number): Promise<Result_4>;
    createMerchantV2(userId: string, phone: string, businessName: string, category: string, merchantType: MerchantType, location: Location, deliveryType: DeliveryType, deliveryRadius: number): Promise<{
        __kind__: "ok";
        ok: Merchant;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    /**
     * / Manually flag a piece of content for moderation review.
     */
    createModerationItem(contentType: string, contentId: string, reason: string): Promise<string>;
    /**
     * / Admin: create a moderation item with a structured input record.
     */
    createModerationItemAdmin(entityType: string, entityId: string, remark: string): Promise<string>;
    createNotification(userId: string, recipientPhone: string, notificationType: string, message: string): Promise<Result_43>;
    createOndcOrder(customerId: string, merchantId: string, items: Array<OrderItem>, customerAddress: Location | null, paymentMode: PaymentMode, searchQuery: string | null): Promise<Result_18>;
    createOrder(customerId: string, merchantId: string, items: Array<OrderItem>, customerAddress: Location | null, paymentMode: PaymentMode, searchQuery: string | null): Promise<Result_18>;
    createPlan(name: string, planType: SubscriptionPlanType, targetRole: UserRole, priceFlat: number, pricePercentage: number, orderLimit: bigint, inquiryLimit: bigint, durationDays: bigint, features: Array<string>, categoryScope: string | null, flatFee: number | null, percentageFee: number | null, minTransactionAmount: number | null, maxTransactionAmount: number | null, applicableRoles: Array<UserRole>): Promise<Result_17>;
    createPromotion(advertiserPhone: string, title: string, reelLink: string, imageLink: string, locationArea: string, locationCity: string, locationCountry: string, subscriptionPlan: string): Promise<Result_29>;
    createRateCard(vehicleType: VehicleType, serviceType: ServiceType, baseRate: number, perKmRate: number, surgeMultiplier: number): Promise<Result_15>;
    createRecipe(ownerId: string, title: string, ingredients: Array<RecipeIngredient>, steps: Array<string>, imageLink: string, videoLink: string, benefits: string, tips: string): Promise<Recipe>;
    /**
     * / Create a restock order from merchant to supplier (via chatbot or admin).
     */
    createRestockOrder(merchantId: string, merchantPhone: string, supplierName: string, itemName: string, quantity: bigint, notes: string): Promise<Result_14>;
    /**
     * / Restock Orders API ──────────────────────────────────────────────────────
     * / Admin: create a restock order with a full input record.
     */
    createRestockOrderAdmin(merchantId: string, merchantPhone: string, supplierName: string, itemName: string, quantity: bigint, notes: string): Promise<string>;
    createShuttleRoute(routeName: string, source: string, destination: string, stops: Array<string>, vehicleType: VehicleType, departureTime: string, arrivalTime: string, fare: bigint, availableSeats: bigint, driverId: string): Promise<ShuttleRoute>;
    /**
     * / Save a supplier order (called when merchant confirms order via chatbot or admin).
     */
    createSupplierOrder(merchantId: string, supplierContact: string, itemName: string, quantity: string, notes: string): Promise<SupplierOrder>;
    createSupportTicket(fromPhone: string, role: UserRole, category: SupportTicketCategory, description: string, orderId: string | null): Promise<Result_11>;
    /**
     * / Create a test order (created by Script Executor / Flow Agent).
     * / Marks the order ID in testOrderIds so getTestOrders can return it.
     */
    createTestOrder(merchantId: string, items: Array<OrderItem>, customerId: string, deliveryPartnerId: string | null): Promise<Result_30>;
    createTransportBooking(customerId: string, origin: Location, destination: Location, vehicleType: VehicleType, estimatedCharge: number): Promise<Result_27>;
    createUser(phone: string, name: string, role: UserRole, location: Location | null, address: string | null): Promise<Result_8>;
    createUserV2(phone: string, name: string, role: UserRole, location: Location | null, address: string | null): Promise<{
        __kind__: "ok";
        ok: User;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    deactivateMarketplaceItem(id: string): Promise<boolean>;
    deactivateShuttleRoute(routeId: string, callerPhone: string, isAdmin: boolean): Promise<Result_12>;
    /**
     * / Permanently delete an adhoc job.
     */
    deleteAdhocJob(jobId: string): Promise<boolean>;
    /**
     * / Admin: delete an adhoc job (alias with consistent naming).
     */
    deleteAdhocJobAdmin(jobId: string): Promise<boolean>;
    deleteBlog(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteBlogReview(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteCity(cityId: string): Promise<boolean>;
    /**
     * / Delete a CityControl record by cityId.
     */
    deleteCityControlRecord(cityId: string): Promise<boolean>;
    deleteCustomerRating(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Delete a donation item.
     */
    deleteDonation(id: string): Promise<Result_10>;
    /**
     * / Delete a donation request.
     */
    deleteDonationRequest(id: string): Promise<Result_10>;
    deleteEmployee(id: string): Promise<Result_35>;
    deleteEvent(id: string): Promise<Result_35>;
    deleteFamilyLink(ownerPhone: string, relationPhone: string): Promise<Result_35>;
    deleteFamilyMember(id: string): Promise<Result_35>;
    deleteFlow(id: string): Promise<Result_35>;
    deleteHealthcareProvider(id: string): Promise<Result_28>;
    deleteJobLocation(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteMarketSearch(id: string): Promise<boolean>;
    deleteMarketplaceItem(id: string): Promise<boolean>;
    /**
     * / Admin: delete a marketplace item by id.
     */
    deleteMarketplaceItemAdmin(id: string): Promise<boolean>;
    deleteMatchScore(id: string): Promise<boolean>;
    deleteMenuOption(id: string): Promise<Result_28>;
    /**
     * / Delete a moderation item by composite key.
     */
    deleteModerationItem(contentId: string, contentType: string): Promise<boolean>;
    /**
     * / Admin: delete a moderation item by composite key (entityType:entityId).
     */
    deleteModerationItemAdmin(id: string): Promise<boolean>;
    deletePlan(id: string): Promise<Result_35>;
    deleteProductLocationPrice(productId: string, cityId: string, branchId: string): Promise<Result_28>;
    /**
     * / Delete a scan history entry — only allowed for the owning merchant.
     */
    deleteProductScanEntry(entryId: string, merchantId: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    deleteProfessionalService(id: string): Promise<Result_28>;
    deleteRateCard(id: string): Promise<Result_35>;
    deleteRecipe(id: string): Promise<boolean>;
    /**
     * / Admin: delete a recipe by id.
     */
    deleteRecipeAdmin(id: string): Promise<boolean>;
    /**
     * / Delete a restock order by id.
     */
    deleteRestockOrder(orderId: string): Promise<boolean>;
    /**
     * / Admin: delete a restock order by id.
     */
    deleteRestockOrderAdmin(orderId: string): Promise<boolean>;
    /**
     * / Delete a support ticket by id.
     */
    deleteSupportTicket(ticketId: string): Promise<boolean>;
    /**
     * / Admin alias — delete a support ticket by id.
     */
    deleteSupportTicketAdmin(id: string): Promise<boolean>;
    deleteTourOperator(id: string): Promise<Result_28>;
    deployFixesToLive(runId: string): Promise<boolean>;
    deployFlowToLive(flowId: string): Promise<boolean>;
    discontinueProduct(productId: string, manufacturerId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    dislikeLesson(userId: string, lessonId: string): Promise<Result__1>;
    doFastTagRecharge(tx: UtilityTransaction, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    doFastTagRechargePub(tx: UtilityTransaction, credId: string): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    doFetchElectionResults(state: string, transform: [Principal, string]): Promise<Array<ElectionResult>>;
    doGetAllElectionResults(): Promise<Array<ElectionResult>>;
    doGetElectionResults(state: string): Promise<Array<ElectionResult>>;
    doGetUpcomingElections(): Promise<Array<{
        date: string;
        name: string;
        state: string;
        electionType: string;
    }>>;
    doRecharge(tx: UtilityTransaction, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    doRechargePub(tx: UtilityTransaction, credId: string): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    doSearchMarket(scriptName: string, country: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: MarketSearchQuery;
    } | {
        __kind__: "err";
        err: string;
    }>;
    dpAcceptOrder(orderId: string, dpId: string): Promise<Result_18>;
    dpCollectPayment(orderId: string, dpId: string, amount: bigint): Promise<Result_18>;
    dpConfirmDelivery(orderId: string, dpId: string): Promise<Result_18>;
    dpConfirmPickup(orderId: string, dpId: string): Promise<Result_18>;
    dpSettleVendor(orderId: string, dpId: string, amount: bigint): Promise<Result_18>;
    employeeCheckIn(employeeId: string, merchantId: string, notes: string): Promise<EmployeeAttendance>;
    employeeCheckOut(attendanceId: string): Promise<{
        __kind__: "ok";
        ok: EmployeeAttendance;
    } | {
        __kind__: "err";
        err: string;
    }>;
    endDeliveryShift(shiftId: string): Promise<boolean>;
    enforceSubscriptionLimit(userId: string, limitType: string): Promise<Result_3>;
    enrollUser(userId: string, courseId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    executeFlowStep(flowId: string, stepIndex: bigint, userInput: string, sessionId: string): Promise<{
        nextStepHint: string;
        entityCreated?: {
            entityId: string;
            entityType: string;
        };
        response: string;
        stepPassed: boolean;
        errorMsg?: string;
    }>;
    exportDeliveryPartners(): Promise<Array<DeliveryPartner>>;
    exportEvents(): Promise<Array<Event>>;
    exportFamilyMembers(): Promise<Array<FamilyMember>>;
    exportJobs(): Promise<Array<Job>>;
    exportLeads(): Promise<Array<Lead>>;
    exportMerchants(): Promise<Array<Merchant>>;
    exportOrders(): Promise<Array<Order>>;
    exportPromotions(): Promise<Array<Promotion>>;
    exportProperties(): Promise<Array<Property>>;
    exportUsers(): Promise<Array<User>>;
    /**
     * / Export all flows as a WhatsApp-compatible script structure.
     * / Dynamically generated from flowsStore — no hardcoded entries.
     */
    exportWhatsAppScript(): Promise<string>;
    fetchBill(operator: string, consumerNum: string, refId: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    fetchBillPub(operator: string, consumerNum: string, refId: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Wrapper: fetch election results from ECI for the given state.
     */
    fetchElectionResults(state: string): Promise<Array<ElectionResult>>;
    fetchLPGDetails(operator: string, caNumber: string, bookingMethod: bigint, additionalFields: string, refId: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    fetchLPGDetailsPub(operator: string, caNumber: string, bookingMethod: bigint, additionalFields: string, refId: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    fetchMunicipalityBill(operator: string, consumerNum: string, refId: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    fetchMunicipalityBillPub(operator: string, consumerNum: string, refId: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    fetchTodayMatchScores(transform: [Principal, string]): Promise<Array<MatchScore>>;
    fileExpiryReturn(productId: string, manufacturerId: string, returnedBy: string, returnedById: string, quantity: bigint, reason: string): Promise<{
        __kind__: "ok";
        ok: ExpiryReturn;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    fileManufacturerComplaint(mfgId: string, filedBy: string, filedById: string, subject: string, description: string): Promise<{
        __kind__: "ok";
        ok: ManufacturerComplaint;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    /**
     * / Admin fires a promotion to up to targetUserCount users.
     */
    firePromotion(id: string, targetUserCount: bigint): Promise<{
        __kind__: "ok";
        ok: Promotion;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Force-clear webhookUrl in stored Telegram config WITHOUT calling deleteWebhook via HTTP.
     * / Use when the HTTP outcall to Telegram is also failing (e.g. network issues, invalid token).
     * / This unblocks pollTelegramUpdates() which is guarded against running alongside a webhook.
     * / Returns a message describing what was cleared.
     */
    forceClearWebhookForPolling(): Promise<Result_30>;
    generateApiKey(ownerId: string, keyLabel: string): Promise<Result_54>;
    generateDailyLesson(userId: string, languagePair: string, topic: string, difficulty: string, content: string, quizQuestion: string, quizChoices: Array<string>, correctAnswer: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    generateDeliveryPaymentQR(orderId: string, amount: number, partnerId: string): Promise<Result_53>;
    generateFreeRideOTP(rideId: string): Promise<Result_1>;
    generateOrderPaymentQR(orderId: string, amount: number, upiId: string): Promise<Result_52>;
    generatePOSOTP(phone: string, role: Variant_deliveryPartner_merchant): Promise<Result_35>;
    generateSarthiOTP(bookingId: string): Promise<Result_1>;
    generateSubscriptionQR(planId: string, userId: string): Promise<Result_51>;
    getAccountEntries(manufacturerId: string): Promise<Array<AccountEntry>>;
    getActiveDelivery(partnerId: string): Promise<Order | null>;
    getActiveTransportBookings(): Promise<Array<TransportBooking>>;
    getAdhocJobCategories(): Promise<Array<string>>;
    getAdhocJobStats(): Promise<{
        categoryBreakdown: Array<[string, bigint]>;
        totalActive: bigint;
    }>;
    getAdminConfig(): Promise<AdminConfig>;
    getAdminDashboardStats(): Promise<DashboardStats>;
    /**
     * / Return all admin principals as text IDs.
     */
    getAdminPrincipals(): Promise<Array<string>>;
    getAdminUPIProfile(): Promise<AdminUPIProfile | null>;
    getAdvertisements(): Promise<Array<Advertisement>>;
    getAgentChannelSync(): Promise<{
        sms: boolean;
        whatsapp: boolean;
        telegram: boolean;
    }>;
    getAgentRun(runId: string): Promise<FlowAgentRun | null>;
    getAgentSchedule(): Promise<FlowAgentSchedule>;
    /**
     * / Returns a plain-text explanation of how to find the Telegram Alert Chat ID.
     * / Display this in the admin panel Telegram configuration form.
     */
    getAlertChatIdHelper(): Promise<string>;
    /**
     * / All adhoc/daily jobs as flat rows for Data Explorer.
     */
    getAllAdhocJobs(): Promise<Array<{
        id: string;
        title: string;
        posterId: string;
        jobType: string;
        createdAt: bigint;
        isActive: boolean;
        category: string;
        price: number;
    }>>;
    getAllAppVersions(): Promise<Array<AppVersion>>;
    getAllBillPayments(): Promise<Array<UtilityTransaction>>;
    getAllBlogReviews(): Promise<Array<BlogReview>>;
    getAllBlogs(): Promise<Array<Blog>>;
    getAllBusBookings(): Promise<Array<BusBooking>>;
    getAllCities(): Promise<Array<City>>;
    /**
     * / Return all city controls as a flat array for Data Explorer.
     */
    getAllCityControls(): Promise<Array<CityControl>>;
    getAllCommunityFoodOrders(): Promise<Array<CommunityFoodOrder>>;
    getAllCommunityMembers(): Promise<Array<CommunityMember>>;
    getAllCommunityParkingBookings(): Promise<Array<CommunityParkingBooking>>;
    getAllCommunityRoomBookings(): Promise<Array<CommunityRoomBooking>>;
    getAllCommunityWorkOrders(): Promise<Array<CommunityWorkOrder>>;
    getAllCustomerRatings(): Promise<Array<CustomerRating__1>>;
    /**
     * / All daily jobs (jobType == #adhoc_daily) as flat rows for Data Explorer.
     */
    getAllDailyJobs(): Promise<Array<{
        id: string;
        title: string;
        posterId: string;
        jobType: string;
        createdAt: bigint;
        isActive: boolean;
        category: string;
        price: number;
    }>>;
    getAllDeliveryAssignments(): Promise<Array<DeliveryAssignment>>;
    getAllDistributors(): Promise<Array<DistributorNetwork>>;
    /**
     * / Returns all stored election results across all states.
     * / Lazily seeds sample data if the store is empty.
     */
    getAllElectionResults(): Promise<Array<ElectionResult>>;
    getAllEvents(): Promise<Array<Event>>;
    getAllExpiryReturns(): Promise<Array<ExpiryReturn>>;
    getAllFamilyMembers(): Promise<Array<FamilyMember>>;
    getAllFastagTransactions(): Promise<Array<UtilityTransaction>>;
    getAllFlightBookings(): Promise<Array<FlightBooking>>;
    /**
     * / Returns ALL flows from the registry deduplicated by name (highest version wins).
     * / Use this as the canonical source for all surfaces (Flow Agent, Chat Simulator,
     * / Flow Designer, Script Executor, Telegram/WhatsApp/SMS scripts).
     */
    getAllFlows(): Promise<Array<{
        id: string;
        name: string;
        createdAt: bigint;
        flowJson: string;
        version: bigint;
        updatedAt: bigint;
        environment: string;
    }>>;
    getAllHealthcareProviders(): Promise<Array<HealthcareProvider>>;
    getAllInsurancePayments(): Promise<Array<UtilityTransaction>>;
    getAllJobCityFavorites(): Promise<Array<JobCityFavorite>>;
    getAllJobLocations(): Promise<Array<JobLocation>>;
    getAllJobs(isOpen: boolean | null): Promise<Array<Job>>;
    getAllLendingItems(): Promise<Array<LendingItem>>;
    getAllLpgBookings(): Promise<Array<UtilityTransaction>>;
    getAllManufacturerComplaints(): Promise<Array<ManufacturerComplaint>>;
    getAllManufacturerProducts(): Promise<Array<ManufacturerProduct>>;
    getAllManufacturerRatings(): Promise<Array<ManufacturerRating>>;
    getAllManufacturers(): Promise<Array<Manufacturer>>;
    /**
     * / All marketplace (old items) listings as flat rows for Data Explorer.
     */
    getAllMarketplaceItems(): Promise<Array<{
        id: string;
        title: string;
        userId: string;
        createdAt: bigint;
        isActive: boolean;
        invoiceAvailable: boolean;
        category: string;
        rentOrSale: string;
        price: number;
    }>>;
    /**
     * / Alias: returns all stored match scores (no outcall) for frontend display.
     * / Alias: returns all stored match scores (no outcall) for frontend display.
     */
    getAllMatchScores(): Promise<Array<MatchScore>>;
    getAllMatrimonyProfiles(): Promise<Array<MatrimonyProfile>>;
    getAllMenuOptions(): Promise<Array<MenuOption>>;
    /**
     * / All moderation items as flat rows for Data Explorer.
     */
    getAllModerationItems(): Promise<Array<{
        id: string;
        status: string;
        contentId: string;
        contentType: string;
        flagReason: string;
        createdAt: bigint;
        remarks: string;
    }>>;
    getAllModerationRecords(): Promise<Array<ModerationItem>>;
    getAllMunicipalityPayments(): Promise<Array<UtilityTransaction>>;
    getAllNotifications(status: NotificationStatus | null, from: bigint | null, to: bigint | null): Promise<Array<Notification>>;
    getAllOndcEnrollments(status: VerificationStatus | null): Promise<Array<OndcEnrollment>>;
    getAllOrders(status: OrderStatus | null, from: bigint | null, to: bigint | null): Promise<Array<Order>>;
    getAllPaySprintAPILogs(): Promise<Array<PaySprintAPILog>>;
    getAllPaySprintCallbacks(): Promise<Array<PaySprintCallback>>;
    getAllPaySprintCredentials(): Promise<Array<PaySprintCredential>>;
    getAllPlans(targetRole: UserRole | null): Promise<Array<SubscriptionPlan>>;
    getAllProductLocationPrices(): Promise<Array<ProductLocationPrice>>;
    /**
     * / Returns every product across all merchants — used by the admin All Products view.
     * / Never returns a negative count or undefined — guaranteed to return [] when empty.
     */
    getAllProducts(): Promise<Array<Product>>;
    getAllProfessionalServices(): Promise<Array<ProfessionalService>>;
    getAllPromotions(): Promise<Array<Promotion>>;
    getAllProperties(listingType: PropertyListingType | null, isActive: boolean | null): Promise<Array<Property>>;
    getAllRateCards(): Promise<Array<DeliveryRateCard>>;
    getAllRecharges(): Promise<Array<UtilityTransaction>>;
    getAllRecipes(): Promise<Array<Recipe>>;
    /**
     * / All recipes as flat summary rows for Data Explorer.
     */
    getAllRecipesTable(): Promise<Array<{
        id: string;
        title: string;
        ingredientCount: bigint;
        userId: string;
        createdAt: bigint;
        rating: number;
    }>>;
    /**
     * / List all restock orders (admin view).
     */
    getAllRestockOrders(): Promise<Array<RestockOrder>>;
    /**
     * / All support tickets as flat rows for Data Explorer.
     */
    getAllSupportTickets(): Promise<Array<{
        id: string;
        resolutionDate?: bigint;
        status: string;
        issueType: string;
        createdAt: bigint;
        creatorId: string;
        creatorRole: string;
        orderId: string;
    }>>;
    /**
     * / Alias: get all support tickets as full records (not flattened Data Explorer rows).
     */
    getAllSupportTicketsFull(filter: string | null): Promise<Array<SupportTicket>>;
    getAllTourOperators(): Promise<Array<TourOperator>>;
    getAllTrainBookings(): Promise<Array<TrainBooking>>;
    getAllUtilityTransactions(): Promise<Array<UtilityTransaction>>;
    getAllVisitorCheckins(): Promise<Array<VisitorCheckin>>;
    getAllowedTipAmounts(): Promise<Array<bigint>>;
    getApiKeys(ownerId: string): Promise<Array<ApiKey>>;
    getAppVersions(brandName: string): Promise<Array<AppVersion>>;
    getAreaRates(serviceId: string): Promise<Array<[string, number]>>;
    /**
     * / Get stats for a specific assigned user under a merchant.
     */
    getAssignedUserStats(merchantId: string, userPhone: string): Promise<SubscriptionAssignment | null>;
    /**
     * / List all users assigned to a merchant's subscription.
     */
    getAssignedUsers(merchantId: string): Promise<Array<SubscriptionAssignment>>;
    getAvailableDeliveryPartners(lat: number, lng: number, radiusKm: number): Promise<Array<DeliveryPartner>>;
    getBillPaymentOperators(category: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBillPaymentOperatorsPub(category: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBillRecords(manufacturerId: string): Promise<Array<BillRecord>>;
    getBlogById(id: string): Promise<Blog | null>;
    getBlogReviews(blogId: string): Promise<Array<BlogReview>>;
    getBlogsByAuthor(authorId: string): Promise<Array<Blog>>;
    getBookingDetails(bookingId: string): Promise<TransportBooking | null>;
    getBookingsByCustomer(customerId: string): Promise<Array<TransportBooking>>;
    getBookingsBySarthi(sarthiPartnerId: string): Promise<Array<TransportBooking>>;
    getBookingsByStatus(status: TransportStatus): Promise<Array<TransportBooking>>;
    /**
     * / Alias: get bot logs by platform — frontend may call getBotLogs instead of listBotLogs.
     */
    getBotLogs(platform: string): Promise<Array<BotLog>>;
    /**
     * / Returns message/user/order counts broken down by channel (telegram/whatsapp/sms/simulator).
     * / Message counts come from BotLogs; user/order counts are computed from address/stateData tags.
     */
    getBotPerformanceStats(): Promise<{
        usersByChannel: {
            sms: bigint;
            simulator: bigint;
            whatsapp: bigint;
            telegram: bigint;
        };
        ordersByChannel: {
            sms: bigint;
            simulator: bigint;
            whatsapp: bigint;
            telegram: bigint;
        };
        messagesByChannel: {
            sms: bigint;
            simulator: bigint;
            whatsapp: bigint;
            telegram: bigint;
        };
    }>;
    getBrandingConfig(): Promise<BrandingConfig>;
    getBusBooking(id: string): Promise<BusBooking | null>;
    getBusBookingsByCustomer(customerId: string): Promise<Array<BusBooking>>;
    getBusSeatAvailability(tripId: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBusSeatAvailabilityPub(tripId: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Returns the build ID string. Call this from the admin panel or browser to
     * / confirm that the newly deployed wasm is live.
     * / Expected response: "localbazar-kart-v4-telegram-fix-20260430"
     */
    getCanisterVersion(): Promise<string>;
    getChatConversationHistory(phoneNumber: string): Promise<Array<ConversationMessage>>;
    getChatSimulatorSessions(role: string): Promise<Array<ChatSimulatorSession>>;
    getCitiesForDataExplorer(): Promise<Array<CityRow>>;
    getCityAreas(city: string): Promise<Array<string>>;
    getCityAreasForPromotion(cityId: string): Promise<Array<string>>;
    getCityControl(cityId: string): Promise<CityControl | null>;
    /**
     * / Alias: getCityControls returns all city controls (flat array, empty if none).
     */
    getCityControls(): Promise<Array<CityControl>>;
    getCityControlsForCity(cityId: string): Promise<CityControl | null>;
    getCityControlsForDataExplorer(): Promise<Array<{
        moduleName: string;
        cityId: string;
        cityName: string;
        enabled: boolean;
    }>>;
    getCityList(): Promise<Array<string>>;
    getCityModules(cityId: string): Promise<Array<{
        moduleName: string;
        enabled: boolean;
    }>>;
    getCommoditySymbolsForCountry(country: string): Promise<Array<string>>;
    getCommunityFoodOrderById(id: string): Promise<CommunityFoodOrder | null>;
    getCommunityFoodOrdersByCommunity(communityId: string): Promise<Array<CommunityFoodOrder>>;
    getCommunityFoodOrdersByPhone(phone: string): Promise<Array<CommunityFoodOrder>>;
    getCommunityMemberByPhone(phone: string): Promise<CommunityMember | null>;
    getCommunityMembersByCity(city: string): Promise<Array<CommunityMember>>;
    getCommunityParkingBookingById(id: string): Promise<CommunityParkingBooking | null>;
    getCommunityParkingBookingsByCommunity(communityId: string): Promise<Array<CommunityParkingBooking>>;
    getCommunityParkingBookingsByPhone(phone: string): Promise<Array<CommunityParkingBooking>>;
    getCommunityRoomBookingById(id: string): Promise<CommunityRoomBooking | null>;
    getCommunityRoomBookingsByCommunity(communityId: string): Promise<Array<CommunityRoomBooking>>;
    getCommunityRoomBookingsByPhone(phone: string): Promise<Array<CommunityRoomBooking>>;
    getCommunityVisitorHistory(communityId: string): Promise<Array<VisitorCheckin>>;
    getCommunityWorkOrderById(id: string): Promise<CommunityWorkOrder | null>;
    getCommunityWorkOrdersByCommunity(communityId: string): Promise<Array<CommunityWorkOrder>>;
    getCommunityWorkOrdersByPhone(phone: string): Promise<Array<CommunityWorkOrder>>;
    getCountryInfoForPhone(phone: string): Promise<{
        currencySymbol: string;
        countryCode: string;
        countryName: string;
        currency: string;
    }>;
    getCourse(id: string): Promise<LanguageCourse | null>;
    getCourseApprovalsForDataExplorer(): Promise<Array<CourseApprovalRow>>;
    getCourseLikeSummary(courseId: string): Promise<CourseLikeSummary>;
    getCurrencyForUser(phone: string): Promise<string>;
    getCurrentDeliveryShift(partnerId: string): Promise<DeliveryPartnerShift | null>;
    getCustomerBudget(userId: string): Promise<CustomerBudget>;
    getCustomerDashboardData(customerPhone: string): Promise<CustomerDashboardData>;
    getCustomerRatingHistory(customerPhone: string): Promise<Array<{
        date: bigint;
        merchantId: string;
        orderId: string;
        rating: CustomerRating;
    }>>;
    getCustomerRatings(customerId: string): Promise<Array<CustomerRating__1>>;
    getCustomerSpendAnalysis(userId: string, period: string): Promise<SpendAnalysis>;
    getCustomerTips(customerId: string): Promise<Array<TipRecord>>;
    getDPActiveDeliveries(partnerId: string): Promise<Array<Order>>;
    getDPAnalytics(partnerId: string): Promise<DPAnalytics>;
    getDPEarnings(partnerId: string, date: string | null): Promise<DPEarnings>;
    getDPEarningsWithExpenses(partnerId: string, fromDate: string, toDate: string): Promise<DPEarningsWithExpenses>;
    getDPPetrolExpenses(partnerId: string, fromDate: string, toDate: string): Promise<Array<PetrolExpense>>;
    /**
     * / Returns per-day message counts for the last N days from BotLogs.
     * / DailyStat: { date: Text (YYYY-MM-DD); telegram: Nat; whatsapp: Nat; sms: Nat }
     */
    getDailyBotStats(days: bigint): Promise<Array<{
        sms: bigint;
        date: string;
        whatsapp: bigint;
        telegram: bigint;
    }>>;
    getDailyLessonsForDataExplorer(): Promise<Array<DailyLessonRow>>;
    getDailyStreak(userId: string): Promise<bigint>;
    getDefaultFreePlan(): Promise<SubscriptionPlan | null>;
    getDeliveryAssignments(requesterId: string): Promise<Array<DeliveryAssignment>>;
    getDeliveryDashboardData(partnerPhone: string): Promise<DeliveryDashboardData>;
    getDeliveryOrders(): Promise<Array<Order>>;
    getDeliveryPartnerOndcSetupGuide(): Promise<Array<OndcSetupGuide>>;
    getDeliveryShiftHistory(partnerId: string): Promise<Array<DeliveryPartnerShift>>;
    getDeploymentHistory(limit: bigint): Promise<Array<AgentDeployment>>;
    getDiscountedSubscriptionPrice(merchantName: string, planPrice: number): Promise<number>;
    getDisplayTotalOrders(merchantId: string): Promise<bigint>;
    getDistributorNetwork(manufacturerId: string): Promise<Array<DistributorNetwork>>;
    /**
     * / Admin: get all donation requests.
     */
    getDonationRequests(): Promise<Array<DonationRequest>>;
    /**
     * / Admin: get all donations.
     */
    getDonations(): Promise<Array<DonationItem>>;
    /**
     * / Returns stored election results for a state.  Pass "" to get all results.
     */
    getElectionResults(state: string): Promise<Array<ElectionResult>>;
    getEmployeeAttendance(employeeId: string): Promise<Array<EmployeeAttendance>>;
    getEmployeeLeaves(employeeId: string): Promise<Array<LeaveRequest>>;
    getEnabledCities(): Promise<Array<string>>;
    getEnhancedAnalytics(): Promise<EnhancedAnalytics>;
    getEnrollmentsForDataExplorer(): Promise<Array<EnrollmentRow>>;
    getEntitiesCreatedByRun(runId: string): Promise<Array<ScriptEntityRecord>>;
    getEquitySymbolsForCountry(country: string): Promise<Array<string>>;
    getEventById(id: string): Promise<Result_24>;
    getEventsForLocation(city: string): Promise<Array<Event>>;
    getEventsForUser(city: string): Promise<Array<Event>>;
    getExpiryReturns(manufacturerId: string): Promise<Array<ExpiryReturn>>;
    getFamilyByOwner(ownerPhone: string): Promise<Array<FamilyMember>>;
    getFamilyBySurname(surname: string): Promise<Array<FamilyMember>>;
    getFamilyConnectRequests(phone: string): Promise<Array<FamilyConnectRequest>>;
    /**
     * / Return all family groups across all owners.
     * / Returns empty array when none exist.
     */
    getFamilyGroups(): Promise<Array<FamilyGroup>>;
    getFavoriteEmployers(userId: string): Promise<Array<JobCityFavorite>>;
    getFlightBookingsByCustomer(customerId: string): Promise<Array<FlightBooking>>;
    getFlow(id: string): Promise<FlowDefinition | null>;
    getFlowAgentDiagnostics(): Promise<Array<FlowAgentDiagnostic>>;
    getFlowAgentEntitySummary(runId: string): Promise<{
        ordersCreated: bigint;
        merchantsCreated: bigint;
        customersCreated: bigint;
    }>;
    getFlowAgentSummary(): Promise<{
        totalFlows: bigint;
        lastRunAt?: bigint;
        warnings: bigint;
        pendingFixes: bigint;
        healthScore: bigint;
        failed: bigint;
        passed: bigint;
    }>;
    getFlowDefinitions(_environment: string): Promise<Array<{
        id: string;
        name: string;
        createdAt: bigint;
        flowJson: string;
        version: bigint;
        updatedAt: bigint;
        environment: string;
    }>>;
    getFlowDiagnosticDetail(runId: string, flowId: string): Promise<FlowDiagnosticResult | null>;
    getFlowDiagnostics(runId: string): Promise<Array<FlowDiagnosticResult>>;
    getFlowFixStatus(runId: string): Promise<{
        totalFlows: bigint;
        pending: bigint;
        allApproved: boolean;
        approved: bigint;
        rejected: bigint;
        allRetestPassed: boolean;
    }>;
    getFlowHealthSummary(): Promise<{
        totalFlows: bigint;
        healthyFlows: bigint;
        lastRunAt?: bigint;
        criticalFlows: bigint;
        warningFlows: bigint;
        overallHealthScore: bigint;
    }>;
    getFlowRegistryHealth(): Promise<{
        menuOptionCount: bigint;
        flowCount: bigint;
    }>;
    getFlowSessions(role: string): Promise<{
        __kind__: "ok";
        ok: Array<FlowSession>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getFriendsByOwner(phone: string): Promise<Array<FamilyMember>>;
    /**
     * / Returns the full WhatsApp config (including businessAccountId, metaAppId).
     */
    getFullWhatsAppConfig(): Promise<FullWhatsAppConfig>;
    getHealthcareAppointments(customerPhone: string | null, providerId: string | null): Promise<Array<HealthcareAppointment>>;
    getInventoryItems(manufacturerId: string): Promise<Array<InventoryItem>>;
    getInventoryTransactions(itemId: string): Promise<Array<InventoryTransaction>>;
    getJobById(id: string): Promise<Result_40>;
    getJobCitiesAvailable(): Promise<Array<string>>;
    getJobLocations(jobId: string): Promise<Array<JobLocation>>;
    getJobsByEmployer(employerPhone: string): Promise<Array<Job>>;
    getJobsLookingFor(category: string | null): Promise<Array<Job>>;
    getLanguageCoursesForDataExplorer(): Promise<Array<CourseRow>>;
    getLanguageLearningAnalytics(): Promise<{
        totalEnrollments: bigint;
        totalSavedWords: bigint;
        activeStreakUsers: bigint;
        totalCourses: bigint;
        totalDailyLessons: bigint;
    }>;
    getLeads(): Promise<Array<Lead>>;
    getLeadsForEntity(entityType: string, entityId: string): Promise<{
        interestedList: Array<EntityView>;
        views: bigint;
        viewers: Array<EntityView>;
        interested: bigint;
    }>;
    getLendingItemById(id: string): Promise<LendingItem | null>;
    getLendingItemsByBorrower(phone: string): Promise<Array<LendingItem>>;
    getLendingItemsByLender(phone: string): Promise<Array<LendingItem>>;
    getLendingItemsDueSoon(): Promise<Array<LendingItem>>;
    getLessonLikeCounts(lessonId: string): Promise<{
        likes: bigint;
        dislikes: bigint;
    }>;
    getLessonsForDataExplorer(): Promise<Array<LessonRow>>;
    getManufacturerById(mfgId: string): Promise<Manufacturer | null>;
    getManufacturerByUser(userId: string): Promise<Manufacturer | null>;
    getManufacturerComplaints(mfgId: string): Promise<Array<ManufacturerComplaint>>;
    getManufacturerDashboardStats(manufacturerId: string): Promise<ManufacturerDashboardStats>;
    getManufacturerEmployeeAttendance(employeeId: string, date: string): Promise<Array<EmployeeAttendanceRecord>>;
    getManufacturerEmployees(manufacturerId: string): Promise<Array<ManufacturerEmployee>>;
    getManufacturerLeaveRequests(manufacturerId: string): Promise<Array<EmployeeLeaveRequest>>;
    getManufacturerPOSOrders(manufacturerId: string): Promise<{
        __kind__: "ok";
        ok: Array<POSOrder>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getManufacturerProducts(manufacturerId: string): Promise<Array<ManufacturerProduct>>;
    getManufacturerProductsForMerchant(merchantPhone: string): Promise<{
        __kind__: "ok";
        ok: Array<ManufacturerProduct>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getManufacturerRatings(manufacturerId: string): Promise<Array<ManufacturerRating>>;
    getManufacturerReviewsAndComplaints(manufacturerId: string): Promise<ManufacturerReviewsAndComplaints>;
    getManufacturerVersion(): Promise<string>;
    getMarketSearchByCountry(country: string): Promise<Array<MarketSearchQuery>>;
    getMarketSearchById(id: string): Promise<MarketSearchQuery | null>;
    getMarketSearchHistory(): Promise<Array<MarketSearchQuery>>;
    getMarketplaceItemById(id: string): Promise<MarketplaceItem | null>;
    /**
     * / Alias: getMarketplaceItems returns all marketplace items as flat rows for frontend/Data Explorer.
     */
    getMarketplaceItems(): Promise<Array<{
        id: string;
        title: string;
        userId: string;
        createdAt: bigint;
        isActive: boolean;
        invoiceAvailable: boolean;
        category: string;
        rentOrSale: string;
        price: number;
    }>>;
    getMatchScores(): Promise<Array<MatchScore>>;
    getMatchScoresBySport(sport: string): Promise<Array<MatchScore>>;
    /**
     * / Search matrimony-eligible family members with optional filters.
     */
    getMatrimonyMembers(casteFilter: string | null, locationFilter: string | null, educationFilter: string | null, bloodGrpFilter: string | null): Promise<Array<MatrimonyProfile>>;
    getMenuOptions(role: string, city: string): Promise<Array<MenuOption>>;
    getMenuOptionsByRole(role: string): Promise<Array<MenuOption>>;
    getMenuRepositoryHealth(): Promise<{
        menuOptionCount: bigint;
        seededAt?: bigint;
        flowCount: bigint;
    }>;
    getMenuWebhookUpdateLog(): Promise<Array<string>>;
    getMerchantAnalytics(merchantId: string): Promise<MerchantAnalytics>;
    getMerchantBranches(merchantId: string): Promise<Array<MerchantBranch>>;
    getMerchantById(id: string): Promise<Result_4>;
    getMerchantDashboardData(merchantPhone: string): Promise<MerchantDashboardData>;
    getMerchantEarnings(merchantId: string, branchId: string | null, date: string | null): Promise<MerchantEarnings>;
    getMerchantImportStats(merchantName: string): Promise<{
        totalImported: bigint;
        lastImportDate?: bigint;
    }>;
    getMerchantOndcSetupGuide(): Promise<Array<OndcSetupGuide>>;
    getMerchantPOSOrders(merchantId: string, branchId: string | null, status: OrderStatus | null): Promise<Array<Order>>;
    getMerchantPendingLeaves(merchantId: string): Promise<Array<LeaveRequest>>;
    /**
     * / Return the merchant's subscription status along with product count and limit info.
     */
    getMerchantSubscriptionStatus(merchantId: string): Promise<{
        isAtLimit: boolean;
        productCount: bigint;
        isActive: boolean;
        productLimit?: bigint;
        daysRemaining?: bigint;
        planName: string;
    }>;
    getMerchantTopProducts(merchantId: string): Promise<Array<ProductRevenue>>;
    getMerchantsNearby(lat: number, lng: number, radiusKm: number): Promise<Array<Merchant>>;
    getModerationQueue(): Promise<Array<ModerationItem>>;
    getModerationStatusForEntity(entityType: string, entityId: string): Promise<ModerationItem | null>;
    getModuleStatuses(): Promise<Array<[string, boolean]>>;
    getModuleStatusesWithRoles(): Promise<Array<ModuleRoleStatus>>;
    getMonthlyOrderStats(year: bigint, month: bigint): Promise<Array<{
        day: bigint;
        revenue: number;
        orderCount: bigint;
    }>>;
    getMonthlyPetrolExpenses(dpId: string, month: string): Promise<Array<PetrolExpense>>;
    getMyEvents(phone: string): Promise<Array<Event>>;
    /**
     * / Get jobs posted by a specific phone number (posterId).
     */
    getMyJobListings(phone: string | null): Promise<Array<Job>>;
    getMyListings(phone: string): Promise<{
        promotions: Array<Promotion>;
        jobs: Array<Job>;
        properties: Array<Property>;
        events: Array<Event>;
    }>;
    getMyListingsWithProducts(phone: string): Promise<{
        promotions: Array<Promotion>;
        jobs: Array<Job>;
        properties: Array<Property>;
        events: Array<Event>;
        products: Array<Product>;
    }>;
    getMyProductListings(phone: string): Promise<Array<Product>>;
    getMyPromotions(phone: string): Promise<Array<Promotion>>;
    /**
     * / Get properties posted by a specific phone number (posterId).
     */
    getMyPropertyListings(phone: string | null): Promise<Array<Property>>;
    /**
     * / Alias: get support tickets for a user phone (frontend may call getMySupportTickets).
     */
    getMySupportTickets(phone: string): Promise<Array<SupportTicket>>;
    getMyTickets(phone: string): Promise<Array<SupportTicket>>;
    getNotificationsByUser(userId: string): Promise<Array<Notification>>;
    getOndcEnrollment(enrollmentId: string): Promise<Result_19>;
    getOndcEnrollmentByUserId(userId: string): Promise<Result_19>;
    getOndcFAQ(): Promise<Array<OndcFAQ>>;
    /**
     * / Get only online delivery partners.
     */
    getOnlineDeliveryPartners(): Promise<Array<DeliveryPartner>>;
    /**
     * / Get only online sarthi partners.
     */
    getOnlineSarthiPartners(): Promise<Array<DeliveryPartner>>;
    getOpenLeads(): Promise<Array<Lead>>;
    getOptOutCustomers(merchantName: string): Promise<Array<string>>;
    getOrderById(id: string): Promise<Result_18>;
    getOrderGroups(orderId: string): Promise<Result_50>;
    getOrderStatusLabel(status: OrderStatus): Promise<string>;
    getOrderTracking(orderId: string): Promise<Result_49>;
    getOrdersByCustomer(customerId: string): Promise<Array<Order>>;
    getOrdersByDeliveryPartner(dpId: string): Promise<Array<Order>>;
    getOrdersByDeliveryPartnerQuery(partnerId: string): Promise<Array<Order>>;
    getOrdersByMerchant(merchantId: string, from: bigint | null, to: bigint | null): Promise<Array<Order>>;
    /**
     * / Order counts grouped by status — always returns at least one entry per status.
     */
    getOrdersByStatus(): Promise<Array<[string, bigint]>>;
    /**
     * / Order counts by day (last 30 days). Format: ("YYYY-MM-DD", count).
     */
    getOrdersTimeline(): Promise<Array<[string, bigint]>>;
    getOverdueTickets(): Promise<Array<SupportTicket>>;
    getPartnerEarnings(partnerId: string): Promise<EarningsSummary>;
    getPartnerTips(partnerId: string): Promise<Array<TipRecord>>;
    getPaySprintCredential(serviceType: PaySprintServiceType, env: PaySprintEnvironment): Promise<PaySprintCredential | null>;
    getPendingApprovals(): Promise<Array<CourseRow>>;
    getPendingBills(manufacturerId: string): Promise<Array<BillRecord>>;
    getPendingMerchants(): Promise<Array<Merchant>>;
    getPendingOndcEnrollments(): Promise<Array<OndcEnrollment>>;
    getPendingOrdersForDP(lat: number, lng: number, radiusKm: number): Promise<Array<Order>>;
    getPendingPromotions(): Promise<Array<Promotion>>;
    getPetrolExpenseSummary(dpId: string): Promise<{
        expenses: Array<PetrolExpense>;
        todayTotal: number;
        monthlyTotal: number;
    }>;
    getPipelineEnvironment(): Promise<string>;
    getPlan(id: string): Promise<Result_17>;
    getPlanById(id: string): Promise<Result_17>;
    getPlans(targetRole: UserRole | null, planType: SubscriptionPlanType | null): Promise<Array<SubscriptionPlan>>;
    /**
     * / Look up a product by its barcode value OR by its product ID.
     * / Iterates productsByIdCurrent and returns the first match.
     */
    getProductByBarcode(barcodeValue: string): Promise<Product | null>;
    getProductById(id: string): Promise<Result_48>;
    getProductLocationPrices(productId: string): Promise<Array<ProductLocationPrice>>;
    /**
     * / Return the most recent scan history entries for a merchant, ordered by scanTime descending.
     */
    getProductScanHistory(merchantId: string, limit: bigint): Promise<Array<ProductScanHistory>>;
    getProductTemplate(): Promise<string>;
    getProductsByMerchant(merchantId: string): Promise<Array<Product>>;
    getProductsForDistributor(manufacturerId: string): Promise<Array<ManufacturerProduct>>;
    getProjectDocumentationData(): Promise<{
        menuOptionCount: bigint;
        flowCount: bigint;
        menuByRole: Array<[string, bigint]>;
    }>;
    getPromotionAnalytics(id: string): Promise<Result_47>;
    getPromotionById(id: string): Promise<Result_29>;
    getPromotionPlans(): Promise<Array<PromotionSubscriptionPlan>>;
    getPromotionsForLocation(city: string, area: string): Promise<Array<Promotion>>;
    getPromotionsForUser(city: string, area: string): Promise<Array<Promotion>>;
    getPropertyById(id: string): Promise<Result_39>;
    getPurchaseRecords(manufacturerId: string): Promise<Array<PurchaseRecord>>;
    getRateCard(vehicleType: VehicleType): Promise<Result_15>;
    getReTestResults(reTestRunId: string): Promise<Array<FlowDiagnosticResult>>;
    getRechargeOperators(operatorType: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getRechargeOperatorsPub(operatorType: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getRecipeById(id: string): Promise<Recipe | null>;
    getRecipesByOwner(ownerId: string): Promise<Array<Recipe>>;
    getRegisteredDeliveryPartners(): Promise<Array<DeliveryPartner>>;
    getRegisteredMerchants(): Promise<Array<Merchant>>;
    /**
     * / Alias: getRestockOrders returns all restock orders (frontend may call getRestockOrders).
     */
    getRestockOrders(): Promise<Array<RestockOrder>>;
    /**
     * / List all restock orders for a given merchant.
     */
    getRestockOrdersByMerchant(merchantId: string): Promise<Array<RestockOrder>>;
    /**
     * / Revenue grouped by merchant — returns empty array when no completed orders.
     */
    getRevenueByMerchant(): Promise<Array<[string, number]>>;
    getRideDetails(rideId: string): Promise<Result_27>;
    /**
     * / Returns the currently stored SMS config, or null if not yet configured.
     */
    getSMSConfig(): Promise<SMSConfig | null>;
    /**
     * / Returns all SMS config fields as flat rows for the Data Explorer.
     */
    getSMSConfigTable(): Promise<Array<{
        field: string;
        value: string;
    }>>;
    /**
     * / Returns a JSON array describing SMS-specific flows.
     * / Dynamically generated from flowsStore — no hardcoded entries.
     */
    getSMSFlowScript(): Promise<string>;
    getSaleRecords(manufacturerId: string): Promise<Array<SaleRecord>>;
    getSarthiPendingRides(sarthiId: string): Promise<Array<SarthiPendingRide>>;
    getSarthiRideBookings(): Promise<Array<TransportBooking>>;
    getSavedWordsForDataExplorer(): Promise<Array<SavedWordRow>>;
    getScriptExecutionResults(flowId: string): Promise<Array<ScriptExecutionResult>>;
    getScriptExecutorFlowSteps(flowId: string): Promise<Array<{
        stepIndex: bigint;
        promptText: string;
        stepName: string;
        stepType: string;
        validationPattern?: string;
        testValue: string;
    }>>;
    getScriptRunResult(id: string): Promise<ScriptRunResult | null>;
    getScriptRunResults(): Promise<Array<ScriptRunResult>>;
    getServiceBookings(customerPhone: string | null, merchantPhone: string | null): Promise<Array<ServiceBooking>>;
    getSessionLanguage(phone: string): Promise<string>;
    getShuttleBookingsByPassenger(passengerPhone: string): Promise<Array<ShuttleBooking>>;
    getShuttleRouteWithStops(routeId: string): Promise<Result_12>;
    /**
     * / Get shuttle routes with optional inactive routes included (for admin panel).
     */
    getShuttleRoutes(includeInactive: boolean): Promise<Array<ShuttleRoute>>;
    /**
     * / Returns the current session state label for the simulator (e.g. "merchantMenu").
     */
    getSimulatorSessionState(phone: string): Promise<string | null>;
    /**
     * / Get aggregated subscription dashboard stats for a merchant (plan utilisation, top user, etc.).
     */
    getSubscriptionDashboardStats(merchantId: string): Promise<SubscriptionDashboardStats>;
    getSubscriptionDiscountForMerchant(merchantName: string): Promise<bigint>;
    /**
     * / List supplier orders for a merchant.
     */
    getSupplierOrdersByMerchant(merchantId: string): Promise<Array<SupplierOrder>>;
    getSupportTicketById(ticketId: string): Promise<Result_11>;
    getSupportTickets(filter: string | null): Promise<Array<SupportTicket>>;
    /**
     * / Returns row counts for all backend tables — used by the Data Explorer.
     */
    getTableRowCounts(): Promise<{
        promotions: bigint;
        subscriptions: bigint;
        deliveryPartners: bigint;
        recipes: bigint;
        employees: bigint;
        shuttleRoutes: bigint;
        jobs: bigint;
        orders: bigint;
        telegramConfigs: bigint;
        familyMembers: bigint;
        properties: bigint;
        leads: bigint;
        whatsAppConfigs: bigint;
        restockOrders: bigint;
        moduleToggles: bigint;
        events: bigint;
        supportTickets: bigint;
        merchants: bigint;
        users: bigint;
        supplierOrders: bigint;
        ondcEnrollments: bigint;
        products: bigint;
    }>;
    /**
     * / Returns the currently stored Telegram config, or null if not yet configured.
     */
    getTelegramConfig(): Promise<TelegramConfig | null>;
    /**
     * / Returns all Telegram config fields as flat rows for the Data Explorer.
     */
    getTelegramConfigTable(): Promise<Array<{
        field: string;
        value: string;
    }>>;
    /**
     * / Makes a live HTTP outcall to Telegram's getWebhookInfo API and returns the result
     * / along with canister-side delivery mode. Use from the admin Telegram Config page
     * / to see what Telegram actually sees (registered URL, errors, pending updates).
     */
    getTelegramDebugInfo(): Promise<{
        botTokenSet: boolean;
        deliveryMode: string;
        lastErrorDate: bigint;
        lastErrorMessage: string;
        pollingActive: boolean;
        webhookConfigured: boolean;
        rawResponse: string;
        pendingUpdateCount: bigint;
        webhookUrl: string;
    }>;
    /**
     * / Returns the current Telegram delivery mode — "Webhook" if a webhook URL is
     * / configured and polling is disabled, "Polling" if polling is active, or "Inactive".
     * / Also returns whether pollingEnabled flag is set and the stored webhook URL.
     */
    getTelegramDeliveryMode(): Promise<{
        botTokenSet: boolean;
        pollingEnabled: boolean;
        deliveryMode: string;
        webhookConfigured: boolean;
        webhookUrl: string;
    }>;
    /**
     * / Returns a JSON array describing all active flows available on the Telegram channel.
     * / Dynamically generated from flowsStore — no hardcoded entries.
     */
    getTelegramFlowScript(): Promise<string>;
    /**
     * / Get the current Telegram polling offset (last processed update_id).
     */
    getTelegramPollOffset(): Promise<bigint>;
    /**
     * / Return up to 20 most-recent test orders (orders created by Script Executor / Flow Agent).
     */
    getTestOrders(): Promise<Array<Order>>;
    getTodayAttendance(merchantId: string): Promise<Array<EmployeeAttendance>>;
    /**
     * / Delegates to MatchScoreMixin.fetchTodayMatchScores — passes the canister's
     * / shared query transform function required for ICP HTTP outcalls.
     */
    getTodayMatchScores(): Promise<Array<MatchScore>>;
    getTodayPetrolExpense(dpId: string): Promise<number>;
    getTopMerchants(limit: bigint): Promise<Array<{
        revenue: number;
        orderCount: bigint;
        merchant: Merchant;
        avgRating: number;
    }>>;
    getTopRatedRecipes(limit: bigint): Promise<Array<Recipe>>;
    getTotalCompletedOrdersByCustomer(customerPhone: string, merchantId: string): Promise<bigint>;
    /**
     * / Total delivery partners. Returns 0 if none.
     */
    getTotalDeliveryPartners(): Promise<bigint>;
    /**
     * / Total registered merchants. Returns 0 if none.
     */
    getTotalMerchants(): Promise<bigint>;
    /**
     * / Total orders stored. Returns 0 if none.
     */
    getTotalOrders(): Promise<bigint>;
    /**
     * / Total active products. Returns 0 if none.
     */
    getTotalProducts(): Promise<bigint>;
    getTotalTipsEarned(partnerId: string): Promise<bigint>;
    /**
     * / Total registered users (all roles). Returns 0 if none.
     */
    getTotalUsers(): Promise<bigint>;
    getTourBookings(customerPhone: string | null, operatorId: string | null): Promise<Array<TourBooking>>;
    getTrainBookingsByCustomer(customerId: string): Promise<Array<TrainBooking>>;
    getTransportBookings(): Promise<Array<TransportBooking>>;
    /**
     * / Returns upcoming Indian elections.
     */
    getUpcomingElections(): Promise<Array<{
        date: string;
        name: string;
        state: string;
        electionType: string;
    }>>;
    getUserByPhone(phone: string): Promise<Result_8>;
    getUserEnrollments(userId: string): Promise<Array<UserEnrollment>>;
    getUserLessonLike(userId: string, lessonId: string): Promise<LessonLike | null>;
    getUserListings(userId: string): Promise<Array<MarketplaceItem>>;
    getUserPlan(userId: string): Promise<Result_17>;
    getUserSubscription(userId: string): Promise<Result_46>;
    getUtilityTransactionsByCustomer(customerId: string): Promise<Array<UtilityTransaction>>;
    getVisitorsByDate(date: string): Promise<Array<VisitorCheckin>>;
    /**
     * / Call Telegram's getWebhookInfo API and return a structured diagnostic record.
     * / Useful for debugging 404 errors — shows the registered webhook URL, pending update
     * / count, last error message, and whether polling is currently safe to use.
     */
    getWebhookDiagnostics(): Promise<{
        pendingUpdates?: bigint;
        pollingActive: boolean;
        lastError: string;
        rawResponse: string;
        webhookUrl: string;
    }>;
    /**
     * / Returns the stored WhatsApp config (full), or null if not yet configured.
     */
    getWhatsAppConfig(): Promise<FullWhatsAppConfig | null>;
    /**
     * / Returns all stored WhatsApp settings as a queryable flat table for the Data Explorer.
     */
    getWhatsAppConfigTable(): Promise<Array<{
        key: string;
        value: string;
        category: string;
    }>>;
    getWordDefinitionsForDataExplorer(): Promise<Array<WordDefinitionRow>>;
    getYahooChartUrl(symbol: string): Promise<string>;
    /**
     * / Returns true if the phone owner has at least one matrimony-eligible family member.
     */
    hasMatrimonyEligibleMember(ownerPhone: string): Promise<boolean>;
    /**
     * / Query handler — upgrades ALL POST requests to http_request_update (for outcall capability).
     * / GET /telegram/webhook returns 200 {"ok":true} for Telegram health checks.
     * / GET /sms/webhook returns 200 for SMS provider health checks.
     * / All other GET requests return 200 so health probes never see 404.
     * /
     * / IMPORTANT: Motoko requires `public query func` to have `async` return type syntactically,
     * / but the ICP HTTP gateway reads the Candid interface which strips the async wrapper from
     * / query methods. The generated Candid signature is:
     * /   http_request : (HttpRequest) -> (HttpResponse) query
     * / This is correct — the gateway treats it as synchronous. Do NOT remove `async`.
     */
    http_request(req: HttpRequest): Promise<HttpResponse>;
    /**
     * / Update handler — routes incoming POST webhooks to Telegram or SMS handlers.
     * / All POST requests are upgraded here (see http_request), so we check the path
     * / and dispatch to the correct handler. Body must be read BEFORE any async call.
     * / NOTE: ICP HTTP gateway calls this as an update method (has async capability for outcalls).
     */
    http_request_update(req: HttpRequest): Promise<HttpResponse>;
    importMerchantContacts(merchantPhone: string, merchantName: string, contacts: Array<string>): Promise<{
        skippedMerchants: bigint;
        imported: bigint;
        duplicates: bigint;
        skippedDPs: bigint;
    }>;
    /**
     * / Increment the order count for an assigned user. Called when the user places an order.
     */
    incrementAssignedUserOrders(merchantId: string, userPhone: string): Promise<void>;
    incrementInquiryCount(userId: string): Promise<Result_45>;
    incrementOrderCount(userId: string): Promise<Result_45>;
    /**
     * / One-time bootstrap: the first Internet Identity caller claims admin.
     * / After that this call is a no-op (returns false).
     */
    initAdminPrincipal(): Promise<boolean>;
    isCityEnabled(cityId: string): Promise<boolean>;
    isCityModuleEnabled(cityId: string, moduleName: string): Promise<boolean>;
    isDeliveryPartnerBlocked(dpId: string): Promise<boolean>;
    isDistributorRegistered(manufacturerId: string, userPhone: string): Promise<boolean>;
    isMerchantBlocked(merchantId: string): Promise<boolean>;
    isModuleEnabled(moduleName: string): Promise<boolean>;
    isSubscriptionActive(userId: string): Promise<boolean>;
    /**
     * / Returns true when the given order ID was created as a test run.
     */
    isTestOrder(orderId: string): Promise<boolean>;
    likeLesson(userId: string, lessonId: string): Promise<Result__1>;
    listAdhocJobs(categoryFilter: string | null, minPrice: number | null, maxPrice: number | null, location: string | null): Promise<Array<Job>>;
    /**
     * / List adhoc jobs for Data Explorer (all adhoc jobs, optionally filtered by category).
     */
    listAdhocJobsAdmin(categoryFilter: string | null): Promise<Array<Job>>;
    listAgentRuns(limit: bigint): Promise<Array<FlowAgentRun>>;
    /**
     * / Return all adhoc jobs as [Types.Job] — used by frontend pages that need full Job records.
     */
    listAllAdhocJobs(): Promise<Array<Job>>;
    listAllDeliveryPartners(): Promise<Array<DeliveryPartner>>;
    listAllMerchants(): Promise<Array<Merchant>>;
    listAllShuttleRoutesAdmin(): Promise<Array<ShuttleRoute>>;
    listAllUsers(): Promise<Array<User>>;
    /**
     * / Return bot message logs filtered by platform.
     * / Pass "telegram", "whatsapp", or "all" for `platform`.
     */
    listBotLogs(platform: string): Promise<Array<BotLog>>;
    listCities(): Promise<Array<City>>;
    listDeliveryPartners(isVerified: boolean | null): Promise<Array<DeliveryPartner>>;
    listEmployees(): Promise<Array<Employee>>;
    /**
     * / List all events, optionally filtered by city (matched against locationAddress).
     */
    listEvents(city: string | null): Promise<Array<Event>>;
    listFlows(): Promise<Array<FlowDefinition>>;
    listFreeRideSarthis(): Promise<Array<FreeRideSarthi>>;
    /**
     * / List all jobs, optionally filtered by city (matched against location.address).
     */
    listJobs(city: string | null): Promise<Array<Job>>;
    listMarketplaceItems(category: string | null, listingType: string | null): Promise<Array<MarketplaceItem>>;
    listMerchantEmployees(merchantId: string): Promise<Array<MerchantEmployee>>;
    listMerchants(isActive: boolean | null, isVerified: boolean | null): Promise<Array<Merchant>>;
    /**
     * / List moderation items, optionally filtered by status.
     */
    listModerationItems(statusFilter: string | null): Promise<Array<ModerationItem>>;
    listMyShuttleRoutes(dpPhone: string): Promise<Array<ShuttleRoute>>;
    listOndcOrders(): Promise<Array<Order>>;
    /**
     * / List all properties, optionally filtered by city (matched against location.address).
     */
    listProperties(city: string | null): Promise<Array<Property>>;
    /**
     * / Alias: list all recipes (frontend may call listRecipes instead of getAllRecipes).
     */
    listRecipes(): Promise<Array<Recipe>>;
    /**
     * / List restock orders, optionally filtered by merchant id.
     */
    listRestockOrders(merchantId: string | null): Promise<Array<RestockOrder>>;
    listShuttleRoutes(): Promise<Array<ShuttleRoute>>;
    /**
     * / List all support tickets, optionally filtered by status string ("new", "resolved", etc.).
     */
    listSupportTickets(statusFilter: string | null): Promise<Array<SupportTicket>>;
    listUsers(role: UserRole | null): Promise<Array<User>>;
    manualUnblock(entityId: string, entityType: Variant_deliveryPartner_merchant): Promise<Result_35>;
    markBillPaid(billId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markDeliveryPaymentCollected(orderId: string, partnerId: string): Promise<Result_18>;
    markEmployerFavorite(userId: string, employerPhone: string, city: string): Promise<Result_44>;
    markLessonComplete(dailyLessonId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    markNotificationFailed(id: string): Promise<Result_43>;
    markNotificationSent(id: string): Promise<Result_43>;
    migrateFlowJson(): Promise<void>;
    migrateFlowTimestamps(): Promise<void>;
    /**
     * / Moderate a custom order text — keyword-based sync check.
     */
    moderateCustomOrderSync(orderText: string): Promise<{
        flaggedCategories: Array<string>;
        approved: boolean;
        reason: string;
    }>;
    /**
     * / Moderate a job posting for illegal/inappropriate content.
     */
    moderateJobPosting(jobTitle: string, description: string): Promise<{
        flaggedCategories: Array<string>;
        approved: boolean;
        reason: string;
    }>;
    /**
     * / Moderate a property listing for illegal/inappropriate content.
     */
    moderatePropertyPosting(title: string, description: string): Promise<{
        flaggedCategories: Array<string>;
        approved: boolean;
        reason: string;
    }>;
    /**
     * / Parse products from an uploaded Excel CSV payload and save them to the merchant.
     */
    parseProductsFromExcel(merchantId: string, csvText: string): Promise<Result_42>;
    /**
     * / Parse products from a photo menu description and save them to the merchant.
     */
    parseProductsFromPhoto(merchantId: string, photoDescription: string): Promise<Result_42>;
    parseProductsFromText(merchantId: string, rawText: string): Promise<Array<ProductInput>>;
    payBill(tx: UtilityTransaction, _billFetchData: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    payBillPub(tx: UtilityTransaction, billFetchData: string, credId: string): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    payLPGBooking(tx: UtilityTransaction, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    payLPGBookingPub(tx: UtilityTransaction, credId: string): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    payMunicipalityBill(tx: UtilityTransaction, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    payMunicipalityBillPub(tx: UtilityTransaction, credId: string): Promise<{
        __kind__: "ok";
        ok: UtilityTransaction;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Alias for admin panel usage.
     */
    performMarketSearch(scriptName: string, country: string): Promise<{
        __kind__: "ok";
        ok: MarketSearchQuery;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Poll pending order notifications for a customer. Clears queue after returning.
     */
    pollCustomerNotifications(customerId: string): Promise<Array<OrderNotification>>;
    /**
     * / Poll pending order notifications for a delivery partner. Clears queue after returning.
     */
    pollDeliveryNotifications(partnerId: string): Promise<Array<OrderNotification>>;
    /**
     * / Poll pending order notifications for a merchant. Clears queue after returning.
     */
    pollMerchantNotifications(merchantId: string): Promise<Array<OrderNotification>>;
    /**
     * / Poll Telegram for new messages using getUpdates (long-polling alternative to webhook).
     * / This is the fallback when the ICP HTTP gateway cannot receive inbound POST webhooks
     * / from Telegram (e.g. 404 routing issues). Call this periodically from the admin panel
     * / or a heartbeat. Returns the number of updates processed.
     * /
     * / IMPORTANT: Calling this when a webhook URL is registered will result in Telegram
     * / returning 409 Conflict — both modes cannot run simultaneously. This method now
     * / checks pollingEnabled AND the stored webhook URL before proceeding.
     * /
     * / pollingEnabled is set to false whenever updateTelegramConfig is called with a
     * / webhook URL, ensuring polling cannot accidentally run alongside a webhook.
     * /
     * / The offset is persisted in telegramUpdateOffset so replays never occur across calls.
     */
    pollTelegramUpdates(): Promise<Result_41>;
    /**
     * / Alias: postEvent (thin wrapper so frontend can call postEvent or createEvent).
     */
    postEvent(organizerPhone: string, organizerName: string, eventName: string, description: string, isPaid: boolean, price: number, locationAddress: string, startDate: string, endDate: string, ticketVenue: string): Promise<Result_24>;
    postJob(posterId: string, title: string, description: string, category: string, salaryMin: number, salaryMax: number, location: Location): Promise<Result_40>;
    postProperty(posterId: string, listingType: PropertyListingType, description: string, expectedPrice: number, location: Location): Promise<Result_39>;
    /**
     * / Alias: postRecipe (thin wrapper so frontend can call postRecipe or createRecipe).
     */
    postRecipe(ownerId: string, title: string, ingredients: Array<RecipeIngredient>, steps: Array<string>, imageLink: string, videoLink: string, benefits: string, tips: string): Promise<Recipe>;
    postShuttleRoute(routeName: string, serviceName: string, vehicleNumber: string, source: string, destination: string, stops: Array<string>, price: bigint, vehicleType: VehicleType, departureTime: string, driverId: string): Promise<ShuttleRoute>;
    postShuttleRouteWithStops(routeName: string, serviceName: string, vehicleNumber: string, source: string, destination: string, stopDetails: Array<ShuttleStop>, pricePerKm: number, baseFare: bigint, vehicleType: VehicleType, departureTime: string, driverId: string, operatorPhone: string): Promise<ShuttleRoute>;
    processPaySprintCallback(body: string, _headers: Array<[string, string]>): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Route an inbound Telegram webhook message through the shared chatbot engine.
     * / Returns a Telegram-compatible JSON response string (with inline_keyboard for
     * / quick replies) that the frontend/webhook handler can relay back to the user.
     */
    processTelegramWebhook(chatId: string, userId: string, messageText: string, messageType: string): Promise<string>;
    processWebhookEvent(body: string): Promise<Result_31>;
    progressComplaint(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    rateManufacturerProduct(manufacturerId: string, productId: string, ratedBy: string, rating: bigint, review: string): Promise<{
        __kind__: "ok";
        ok: ManufacturerRating;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    rateRecipe(id: string, rating: number): Promise<Recipe | null>;
    /**
     * / Record that a user has a pending custom order (used by chatbot engine to track timestamps).
     */
    recordCustomOrderPending(userId: string): Promise<void>;
    recordDistributorOrder(distributorId: string, orderValue: number): Promise<boolean>;
    recordManufacturerEmployeeAttendance(employeeId: string, checkIn: boolean, notes: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerDeliveryPartner(userId: string, phone: string, name: string, vehicleType: VehicleType, serviceType: ServiceType, ratePerKm: number, aadhaarNo: string, rcBook: string, panNo: string): Promise<Result_6>;
    registerDeliveryPartnerV2(userId: string, phone: string, name: string, vehicleType: VehicleType, serviceType: ServiceType, ratePerKm: number, aadhaarNo: string, rcBook: string, panNo: string): Promise<{
        __kind__: "ok";
        ok: DeliveryPartner;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    registerFreeRideSarthi(phone: string, vehicleType: VehicleType, area: string): Promise<Result_33>;
    registerHealthcareProvider(name: string, specialization: string, consultationFee: number, address: string, city: string, availability: string, phone: string): Promise<HealthcareProvider>;
    registerManufacturer(userId: string, businessName: string, customerCarePhone: string, customerCareEmail: string, productCategories: Array<string>, registeredCity: string): Promise<{
        __kind__: "ok";
        ok: Manufacturer;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    registerProfessionalService(merchantPhone: string, serviceType: string, specialization: string, pricePerHour: number, address: string, city: string, availability: string, areaRates: Array<[string, number]>): Promise<ProfessionalService>;
    registerTourOperator(name: string, destinations: Array<string>, tourTypes: Array<string>, duration: string, pricePerPerson: number, maxPassengers: bigint, phone: string, city: string): Promise<TourOperator>;
    rejectCourse(courseId: string, adminNotes: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    rejectExpiryReturn(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    rejectFlowFixes(runId: string, flowId: string): Promise<boolean>;
    rejectLeave(id: string, approverNote: string): Promise<{
        __kind__: "ok";
        ok: LeaveRequest;
    } | {
        __kind__: "err";
        err: string;
    }>;
    rejectPromotion(id: string, reason: string): Promise<Result_29>;
    /**
     * / Remove an Internet Identity principal from the admin whitelist.
     * / Only existing admins can call this. Cannot remove yourself.
     */
    removeAdminPrincipal(p: Principal): Promise<Result_28>;
    removeAreaRate(serviceId: string, merchantPhone: string, area: string): Promise<Result_16>;
    removeCommunityMember(phone: string): Promise<boolean>;
    removeLessonLike(userId: string, lessonId: string): Promise<boolean>;
    /**
     * / Remove a user assignment from a merchant's subscription.
     */
    removeUserFromSubscription(merchantId: string, userPhone: string): Promise<Result_10>;
    /**
     * / Place a donation request.
     */
    requestDonation(category: string, description: string, quantityNeeded: string, location: string, requesterPhone: string, requesterName: string, source: string): Promise<Result_30>;
    requestJobContact(jobId: string, requesterId: string, requesterName: string, requesterPhone: string): Promise<Result_35>;
    requestPropertyContact(propertyId: string, requesterId: string, requesterName: string, requesterPhone: string): Promise<Result_35>;
    resetChatConversation(phoneNumber: string): Promise<Result_35>;
    /**
     * / Reset monthly order/inquiry counts for a user if a new calendar month has started.
     */
    resetMonthlyCountsIfNeeded(userId: string): Promise<void>;
    /**
     * / Reset the Telegram polling offset to 0 (re-processes all pending updates from Telegram).
     */
    resetTelegramPollOffset(): Promise<void>;
    resolveComplaint(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    respondToFamilyConnectRequest(requestId: string, accept: boolean): Promise<Result_13>;
    respondToLead(leadId: string, responseText: string): Promise<Result_38>;
    revokeApiKey(keyId: string): Promise<Result_35>;
    runFlowDiagnostics(flowIds: Array<string>, triggeredBy: string): Promise<{
        runId: string;
    }>;
    saveAdvertisement(ad: Advertisement): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    saveChatSimulatorSession(session: ChatSimulatorSession): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    saveCityControl(cityId: string, moduleName: string, enabled: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveFlow(flow: FlowDefinition): Promise<Result_37>;
    saveFlowAgentDiagnostic(diag: FlowAgentDiagnostic): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    saveFlowDefinition(name: string, environment: string, flowJson: string): Promise<string>;
    saveFlowSession(session: FlowSession): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveFlowsBatch(flows: Array<FlowDefinition>): Promise<Result_35>;
    saveMarketSearchRecord(scriptName: string, country: string, results: Array<MarketSearchResult>, recommendations: Array<TradeRecommendation>): Promise<MarketSearchQuery>;
    saveMatchScores(scores: Array<MatchScore>): Promise<void>;
    savePaySprintCredential(cred: PaySprintCredential): Promise<{
        __kind__: "ok";
        ok: PaySprintCredential;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveScriptExecutionResult(result: ScriptExecutionResult): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    saveScriptRunResult(input: ScriptRunResultInput): Promise<Result_36>;
    saveScriptRunResultWithData(input: ScriptRunResultInput): Promise<Result_36>;
    saveWord(userId: string, word: string, language: string, translation: string, ancientTranslation: string, ipa: string, examples: Array<string>): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    searchBuses(source: string, destination: string, date: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchBusesPub(source: string, destination: string, date: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchCommunityMembers(searchTerm: string): Promise<Array<CommunityMember>>;
    searchCourses(keyword: string, languagePair: string): Promise<Array<LanguageCourse>>;
    /**
     * / Search donations with optional category and location filters.
     */
    searchDonations(categoryFilter: string | null, locationFilter: string | null): Promise<Array<DonationItem>>;
    searchEvents(keyword: string): Promise<Array<Event>>;
    searchFlights(source: string, destination: string, date: string, passengers: bigint, cabinClass: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchFlightsPub(source: string, destination: string, date: string, passengers: bigint, cabinClass: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchHealthcareProviders(specialization: string | null, city: string | null): Promise<Array<HealthcareProvider>>;
    searchJobs(keyword: string | null, category: string | null, location: Location | null, radiusKm: number): Promise<Array<Job>>;
    searchJobsByCity(city: string, willingToRelocate: boolean, relocateCities: Array<string>): Promise<Array<Job>>;
    /**
     * / Public 2-arg searchMarket matching the frontend API (scriptName, country).
     * / Calls doSearchMarket from the mixin, passing the canister's transform function.
     */
    searchMarket(scriptName: string, country: string): Promise<{
        __kind__: "ok";
        ok: MarketSearchQuery;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchOndcProducts(keyword: string, location: string): Promise<Array<{
        merchant: Merchant;
        product: Product;
    }>>;
    /**
     * / Search ONDC products with lat/lng coordinates (for future live ONDC API integration).
     */
    searchOndcProductsWithLocation(keyword: string, latitude: number, longitude: number): Promise<Array<{
        id: string;
        merchantName: string;
        title: string;
        merchantId: string;
        isOndc: boolean;
        category: string;
        price: number;
    }>>;
    searchProductsByKeyword(keyword: string): Promise<Array<Product>>;
    searchProfessionalServices(serviceType: string | null, city: string | null, customerArea: string | null): Promise<Array<[ProfessionalService, number]>>;
    searchProfessionalServicesByArea(category: string, city: string, area: string): Promise<Array<[ProfessionalService, number]>>;
    searchProperties(listingType: PropertyListingType | null, location: Location | null, radiusKm: number, maxPrice: number | null): Promise<Array<Property>>;
    searchRecipes(keyword: string): Promise<Array<Recipe>>;
    searchShuttles(source: string, dest: string): Promise<Array<ShuttleRoute>>;
    searchTourOperators(destination: string | null, city: string | null): Promise<Array<TourOperator>>;
    searchTrains(source: string, destination: string, date: string, classType: string, credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchTrainsPub(source: string, destination: string, date: string, classType: string, credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchWordDefinition(word: string, language: string): Promise<WordDefinition | null>;
    seedElectionResults(): Promise<bigint>;
    seedSampleData(): Promise<{
        healthcareProviders: bigint;
        promotions: bigint;
        communityMembers: bigint;
        deliveryPartners: bigint;
        languageCourses: bigint;
        recipes: bigint;
        shuttleRoutes: bigint;
        languageEnrollments: bigint;
        professionalServices: bigint;
        distributorNetworks: bigint;
        jobs: bigint;
        cities: bigint;
        properties: bigint;
        lendingItems: bigint;
        languageWordDefs: bigint;
        restockOrders: bigint;
        languageLessons: bigint;
        familyGroups: bigint;
        events: bigint;
        supportTickets: bigint;
        merchants: bigint;
        oldItems: bigint;
        rateCards: bigint;
        manufacturers: bigint;
        adhocJobs: bigint;
        products: bigint;
        manufacturerProducts: bigint;
        tourOperators: bigint;
        donations: bigint;
        customers: bigint;
        subscriptionPlans: bigint;
    }>;
    /**
     * / Same as seedSampleData() but with optional reset. If resetFirst=true, ALL sample-tagged
     * / records (IDs starting with "sample-") are cleared first so the call is a true re-seed.
     */
    seedSampleDataFull(resetFirst: boolean): Promise<{
        created: {
            healthcareProviders: bigint;
            promotions: bigint;
            communityMembers: bigint;
            deliveryPartners: bigint;
            languageCourses: bigint;
            recipes: bigint;
            shuttleRoutes: bigint;
            languageEnrollments: bigint;
            professionalServices: bigint;
            distributorNetworks: bigint;
            jobs: bigint;
            cities: bigint;
            properties: bigint;
            lendingItems: bigint;
            languageWordDefs: bigint;
            restockOrders: bigint;
            languageLessons: bigint;
            familyGroups: bigint;
            events: bigint;
            supportTickets: bigint;
            merchants: bigint;
            oldItems: bigint;
            rateCards: bigint;
            manufacturers: bigint;
            adhocJobs: bigint;
            products: bigint;
            manufacturerProducts: bigint;
            tourOperators: bigint;
            donations: bigint;
            customers: bigint;
            subscriptionPlans: bigint;
        };
        reset: boolean;
    }>;
    seedWordDefinitions(defs: Array<WordDefinition>): Promise<void>;
    sendFamilyConnectRequest(fromPhone: string, toPhone: string, relationship: string, groupName: string, address: string): Promise<Result_35>;
    sendMerchantPromotion(merchantName: string, messageText: string): Promise<{
        skipped: bigint;
        sent: bigint;
        recipients: Array<string>;
    }>;
    /**
     * / Send an alert message to the configured Telegram alert chat.
     */
    sendTelegramAlert(text: string): Promise<void>;
    setAdminBaseUrl(baseUrl: string): Promise<boolean>;
    setAdminUPI(upiId: string, upiName: string): Promise<Result_13>;
    setAdminUPIProfile(upiId: string, name: string): Promise<boolean>;
    setAdminWebhookUrl(webhookUrl: string): Promise<boolean>;
    setAgentSchedule(schedule: FlowAgentSchedule): Promise<boolean>;
    setAppVersionActive(id: string, isActive: boolean): Promise<Result_34>;
    setAreaRate(serviceId: string, merchantPhone: string, area: string, rate: number): Promise<Result_16>;
    setBoostedOrderCount(merchantId: string, count: bigint): Promise<Result_4>;
    setCityModuleEnabled(cityId: string, moduleName: string, enabled: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setCustomerBudget(userId: string, monthlyBudget: number): Promise<CustomerBudget>;
    setCustomerRating(orderId: string, rating: CustomerRating): Promise<Result_18>;
    /**
     * / Alias for admin panel.
     */
    setDeliveryPartnerOnlineStatus(phone: string, isOnline: boolean): Promise<Result_6>;
    setEmployeeActive(id: string, isActive: boolean): Promise<Result_25>;
    /**
     * / Set online/offline status for a free ride sharer.
     */
    setFreeRideSharerOnlineStatus(phone: string, isOnline: boolean): Promise<Result_33>;
    setManualOrderAmount(orderId: string, amount: number, deliveryCharges: number): Promise<Result_18>;
    setMerchantEmployeeActive(id: string, isActive: boolean): Promise<boolean>;
    setMerchantOndcEnrollment(merchantId: string, enrolled: boolean): Promise<Result_4>;
    /**
     * / Set merchant online/offline status (used by merchant to appear/disappear in search).
     */
    setMerchantOnlineStatus(merchantId: string, isOnline: boolean): Promise<Result_4>;
    setModuleEnabled(moduleName: string, enabled: boolean): Promise<boolean>;
    setModuleEnabledForRole(moduleName: string, role: string, enabled: boolean): Promise<boolean>;
    setPassdigit(phone: string, passdigit: string): Promise<Result_8>;
    setPaySprintCredentialActive(id: string, isActive: boolean): Promise<{
        __kind__: "ok";
        ok: PaySprintCredential;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setPipelineEnvironment(env: string): Promise<void>;
    setProductLocationPrice(productId: string, cityId: string, branchId: string, price: number): Promise<Result_32>;
    setPromotionalOptOut(customerPhone: string, optOut: boolean): Promise<Result_13>;
    setSessionLanguage(phone: string, language: string): Promise<void>;
    simulateChatMessage(phoneNumber: string, message: string, messageType: string): Promise<Result_31>;
    startDeliveryShift(partnerId: string): Promise<DeliveryPartnerShift>;
    stopAgentRun(runId: string): Promise<boolean>;
    submitManufacturerLeave(employeeId: string, leaveType: string, fromDate: string, toDate: string, reason: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitOndcEnrollment(userId: string, role: UserRole, businessName: string, gstin: string | null, fssaiLicense: string | null, bankAccount: string, ifscCode: string): Promise<Result_19>;
    syncMenuOptionsFromRegistry(): Promise<{
        byRole: Array<[string, bigint]>;
        total: bigint;
        added: bigint;
    }>;
    /**
     * / Verify the bot token via /getMe only — does NOT require alertChatId.
     * / Use this when alertChatId is not yet configured.
     */
    testBotToken(): Promise<Result_30>;
    testPaySprintConnection(credId: string, transform: [Principal, string]): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    testPaySprintConnectionPub(credId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Send a test SMS to verify provider credentials.
     */
    testSMSConnection(toPhone: string): Promise<Result_30>;
    /**
     * / Send a test message to verify the Telegram bot token and alert chat ID.
     */
    testTelegramConnection(): Promise<Result_30>;
    /**
     * / Full Telegram diagnostic: calls /getMe (extracts bot name) AND /sendMessage to alertChatId.
     * / Uses the exact same sendMessageWithLog code path as the real webhook handler.
     * / If this succeeds, real bot messages will also succeed.
     */
    testTelegramOutcall(): Promise<{
        status: string;
        body: string;
        error: string;
    }>;
    /**
     * / Send a test message to the given Telegram chatId using the EXACT same code path
     * / as the real webhook handler. Returns a plain-text result with success or error details.
     */
    testTelegramSendMessage(chatId: string): Promise<string>;
    toggleRateCardActive(id: string): Promise<Result_15>;
    trackApiUsage(keyId: string, endpoint: string, statusCode: bigint): Promise<void>;
    trackEntityInterest(entityType: string, entityId: string, phone: string): Promise<void>;
    trackEntityView(entityType: string, entityId: string, phone: string): Promise<void>;
    trackPromotionReach(id: string): Promise<Result_29>;
    trackPromotionView(id: string): Promise<Result_29>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    triggerLendingReminder(itemId: string): Promise<boolean>;
    triggerMenuSeed(): Promise<bigint>;
    unmarkEmployerFavorite(userId: string, employerPhone: string, city: string): Promise<Result_28>;
    /**
     * / Update all fields of an adhoc job (title, category, price, description, location, phone).
     */
    updateAdhocJob(jobId: string, title: string, category: string, pricePerDay: number, educationLevel: string, description: string, phone: string, isOpen: boolean): Promise<boolean>;
    /**
     * / Close/reopen an adhoc job.
     */
    updateAdhocJobStatus(jobId: string, isOpen: boolean): Promise<boolean>;
    /**
     * / Admin: update open/close status of an adhoc job (alias with consistent naming).
     */
    updateAdhocJobStatusAdmin(jobId: string, isOpenStr: string): Promise<boolean>;
    updateAdminUPISettings(upiId: string, upiName: string): Promise<Result_13>;
    updateAreaRates(serviceId: string, areaRates: Array<[string, number]>): Promise<Result_16>;
    updateAssignmentRoute(assignmentId: string, partnerId: string, route: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateBillRecord(billId: string, pendingPayment: boolean, pendingNote: string): Promise<{
        __kind__: "ok";
        ok: BillRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateBlog(id: string, title: string, location: string, category: string, content: string, status: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateBookingStatus(bookingId: string, newStatus: TransportStatus, actorPhone: string, note: string): Promise<Result_27>;
    updateBrandingConfig(brandName: string, logoUrl: string): Promise<Result_26>;
    updateCity(cityId: string, name: string, pincode: string): Promise<{
        __kind__: "ok";
        ok: City;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateCityEnabled(cityId: string, enabled: boolean): Promise<{
        __kind__: "ok";
        ok: City;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateCityPincode(cityId: string, pincode: string): Promise<{
        __kind__: "ok";
        ok: City;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateCommunityFoodOrderStatus(id: string, status: string): Promise<boolean>;
    updateCommunityParkingBookingStatus(id: string, status: string): Promise<boolean>;
    updateCommunityRoomBookingStatus(id: string, status: string): Promise<boolean>;
    updateCommunityWorkOrderStatus(id: string, status: string): Promise<boolean>;
    updateDeliveryPartnerKYC(dpId: string, aadhaarNo: string, rcBook: string, panNo: string): Promise<Result_6>;
    updateDeliveryPartnerOnlineStatus(id: string, isOnline: boolean, location: Location | null): Promise<Result_6>;
    /**
     * / Update a donation request's status.
     */
    updateDonationRequestStatus(id: string, status: string): Promise<Result_10>;
    /**
     * / Update a donation item's status.
     */
    updateDonationStatus(id: string, status: string): Promise<Result_10>;
    updateEmployee(id: string, name: string, email: string, phone: string, role: EmployeeRole, permissions: Array<string>): Promise<Result_25>;
    updateEventStatus(id: string, status: EventStatus): Promise<Result_24>;
    updateFamilyInviteStatus(id: string, status: FamilyInviteStatus): Promise<Result_22>;
    /**
     * / Save the FULL WhatsApp config — all fields persisted atomically.
     * / This is the canonical save method used by the admin panel.
     */
    updateFullWhatsAppConfig(cfg: FullWhatsAppConfig): Promise<Result_7>;
    updateHealthcareAppointmentStatus(appointmentId: string, status: AppointmentStatus): Promise<HealthcareAppointment | null>;
    updateHealthcareProvider(id: string, name: string, specialization: string, location: string, phone: string, availableDays: string, fee: bigint): Promise<Result_23>;
    updateInventoryStock(itemId: string, transactionType: InventoryTransactionType, quantity: bigint, referenceId: string | null, notes: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateLendingItem(id: string, item: LendingItem): Promise<boolean>;
    updateLendingStatus(id: string, status: string): Promise<boolean>;
    updateManufacturerEmployee(id: string, newName: string | null, newRole: ManufacturerEmployeeRole | null, isActive: boolean | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateMarketplaceItem(id: string, title: string, price: number, isActive: boolean): Promise<boolean>;
    /**
     * / Admin: update a marketplace item.
     */
    updateMarketplaceItemAdmin(id: string, title: string, price: number, isActive: boolean): Promise<boolean>;
    /**
     * / Update matrimony eligibility and profile for a family member.
     */
    updateMatrimonyEligibility(memberId: string, eligible: boolean, caste: string | null, occupation: string | null, education: string | null, locationPreference: string | null, bloodGroup: string | null, age: bigint | null): Promise<Result_22>;
    updateMenuOption(id: string, optionLabel: string, sortOrder: bigint, isActive: boolean): Promise<Result_21>;
    updateMerchantEmployee(id: string, name: string, phone: string, role: string): Promise<{
        __kind__: "ok";
        ok: MerchantEmployee;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateMerchantKYCDocuments(merchantId: string, panNo: string, panUrl: string, aadhaarNo: string, aadhaarUrl: string, gstNo: string, gstUrl: string, outletPhotoUrl: string, chequeUrl: string, qrUrl: string): Promise<Result_4>;
    updateMerchantStatus(id: string, isActive: boolean, isVerified: boolean): Promise<Result_4>;
    /**
     * / Update the status and remarks on a moderation item (approve/reject/clear).
     */
    updateModerationItemStatus(contentId: string, contentType: string, status: string, notes: string): Promise<boolean>;
    /**
     * / Admin: update status of a moderation item by composite key (entityType:entityId).
     */
    updateModerationItemStatusAdmin(id: string, status: string): Promise<boolean>;
    updateModerationStatus(entityType: string, entityId: string, status: string, remark: string): Promise<Result_20>;
    /**
     * / Update moderation status by entityType+entityId (frontend-compatible wrapper).
     */
    updateModerationStatusById(entityType: string, entityId: string, status: string): Promise<Result_20>;
    updateOndcEnrollmentStatus(id: string, status: VerificationStatus, notes: string | null): Promise<Result_19>;
    updateOrderStatus(id: string, status: OrderStatus, actorPhone: string, note: string | null, rejectionReason: string | null): Promise<Result_18>;
    updatePOSOrderStatus(orderId: string, status: string, deliveryPartnerId: string | null): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updatePlan(id: string, name: string, planType: SubscriptionPlanType, targetRole: UserRole, priceFlat: number, pricePercentage: number, orderLimit: bigint, inquiryLimit: bigint, durationDays: bigint, features: Array<string>, isActive: boolean, categoryScope: string | null, flatFee: number | null, percentageFee: number | null, minTransactionAmount: number | null, maxTransactionAmount: number | null, applicableRoles: Array<UserRole>): Promise<Result_17>;
    updateProfessionalService(id: string, name: string, serviceType: string, location: string, phone: string, experience: string, hourlyRate: bigint, description: string): Promise<Result_16>;
    updateRateCard(id: string, baseRate: number, perKmRate: number, surgeMultiplier: number): Promise<Result_15>;
    updateRecipe(id: string, title: string | null, ingredients: Array<RecipeIngredient> | null, steps: Array<string> | null, imageLink: string | null, videoLink: string | null, benefits: string | null, tips: string | null): Promise<Recipe | null>;
    /**
     * / Admin: update a recipe by id.
     */
    updateRecipeAdmin(id: string, title: string, benefits: string, tips: string): Promise<boolean>;
    /**
     * / Update all fields of a restock order.
     */
    updateRestockOrder(orderId: string, supplierName: string, itemName: string, quantity: bigint, notes: string, status: RestockStatus): Promise<Result_14>;
    /**
     * / Admin: update restock order fields (supplier name, item name, quantity, notes).
     * / Pass empty string for fields you do not want to update.
     */
    updateRestockOrderAdmin(orderId: string, supplierName: string, itemName: string, quantity: bigint, notes: string): Promise<boolean>;
    /**
     * / Update the status of a restock order.
     */
    updateRestockOrderStatus(orderId: string, status: RestockStatus): Promise<Result_13>;
    /**
     * / Save SMS provider configuration.
     */
    updateSMSConfig(config: SMSConfig): Promise<Result_10>;
    updateServiceBookingStatus(bookingId: string, status: ServiceBookingStatus): Promise<ServiceBooking | null>;
    updateShuttleRouteStops(routeId: string, stops: Array<EnhancedShuttleStop>): Promise<Result_12>;
    /**
     * / Update the status of a supplier order.
     */
    updateSupplierOrderStatus(orderId: string, newStatus: SupplierOrderStatus): Promise<SupplierOrder | null>;
    updateSupportTicket(ticketId: string, status: SupportTicketStatus, adminNote: string): Promise<Result_11>;
    /**
     * / Update support ticket status by string status label (used by Data Explorer).
     */
    updateSupportTicketStatus(ticketId: string, statusStr: string, adminNote: string): Promise<Result_11>;
    /**
     * / Save Telegram bot configuration (bot token, webhook URL, alert chat ID, username).
     * / When a webhook URL is set, pollingEnabled is forced to false so the two modes
     * / cannot run simultaneously (Telegram would return 409 Conflict).
     */
    updateTelegramConfig(config: TelegramConfig): Promise<Result_10>;
    updateTourBookingStatus(bookingId: string, status: TourBookingStatus): Promise<TourBooking | null>;
    updateTourOperator(id: string, name: string, destination: string, tourType: string, duration: string, price: bigint, phone: string, description: string): Promise<Result_9>;
    updateUserLocation(id: string, location: Location): Promise<Result_8>;
    /**
     * / Update only the webhook callback URL (editable separately).
     */
    updateWebhookUrl(webhookUrl: string): Promise<Result_7>;
    /**
     * / Convenience alias — saves base fields only (businessAccountId / metaAppId default to "").
     */
    updateWhatsAppConfig(newConfig: WhatsAppConfig): Promise<Result_7>;
    /**
     * / Save or update a PaySprint credential (public update wrapper).
     * / serviceType: "bus" | "train" | "flight" | "recharge" | "billPayment" | "fastTag" | "lpg" | "municipality" | "insurance"
     * / environment: "uat" | "live"
     */
    upsertPaySprintCredential(serviceType: string, environment: string, partnerId: string, partnerKey: string, authorisedKey: string, baseUrl: string, credId: string): Promise<{
        __kind__: "ok";
        ok: PaySprintCredential;
    } | {
        __kind__: "err";
        err: string;
    }>;
    validateMerchantForDistributor(phone: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: {
            errorDetail: string;
        };
    }>;
    validateOrderQRPayment(orderId: string, qrToken: string): Promise<Result_3>;
    verifyDeliveryPartner(dpId: string, isApproved: boolean, reason: string): Promise<Result_6>;
    verifyDriverOTP(bookingId: string, otp: string): Promise<Result_1>;
    verifyEmployeeLogin(email: string, passwordHash: string): Promise<Result_5>;
    verifyMerchant(merchantId: string, isApproved: boolean, reason: string): Promise<Result_4>;
    verifyOTP(phone: string, otp: string): Promise<Result_3>;
    verifyPOSOTP(phone: string, otp: string, role: Variant_deliveryPartner_merchant): Promise<Result_2>;
    verifyPassengerOTP(bookingId: string, otp: string): Promise<Result_1>;
    verifyShuttleOTP(bookingId: string, otp: string): Promise<Result>;
    verifyWebhookToken(token: string): Promise<boolean>;
    /**
     * / Meta webhook verification: echo ?challenge back to Meta when mode and token match.
     * / Returns null if verification fails (Meta will retry with a different request).
     */
    verifyWhatsAppWebhook(mode: string, token: string, challenge: string): Promise<string | null>;
}
