import type {
  BotMessage,
  ContactRequest,
  ConversationMessage,
  DashboardStats,
  DeliveryPartner,
  DeliveryRateCard,
  Employee,
  EmployeeRole,
  Job,
  Merchant,
  MonthlyStat,
  Notification,
  OndcEnrollment,
  Order,
  OrderStatusHistory,
  Product,
  Property,
  SubscriptionPlan,
  TopMerchant,
  User,
  WhatsAppConfig,
} from "./types";
import type {
  AppEvent,
  EventStatus,
  FamilyMember,
  InviteStatus,
  Promotion,
  PromotionAnalytics,
  PromotionPlan,
  PromotionStatus,
} from "./types";
import {
  ContactRequestStatus,
  ConversationState,
  DeliveryType,
  JobType,
  KYCStatus,
  MerchantType,
  MessageSender,
  NotificationStatus,
  OrderStatus,
  PaymentMode,
  PaymentStatus,
  PropertyListingType,
  ServiceType,
  StatusActor,
  SubscriptionPlanType,
  UserRole,
  VehicleType,
  VerificationStatus,
} from "./types";

// Mock data seeds
const MERCHANTS: Merchant[] = [
  {
    id: "m1",
    userId: "u2",
    businessName: "Sharma Kirana Store",
    category: "Grocery",
    merchantType: MerchantType.order,
    deliveryType: DeliveryType.delivery,
    deliveryRadius: 3,
    isActive: true,
    isVerified: true,
    isOndcEnrolled: true,
    codAvailable: true,
    rentalAllowed: false,
    bookingAllowed: false,
    avgRating: 4.5,
    ratingCount: BigInt(128),
    menuProductIds: ["p1", "p2"],
    branches: [],
    phone: "+919876543210",
    location: {
      lat: 28.6139,
      lng: 77.209,
      address: "Connaught Place, New Delhi",
    },
    kyc: {
      verificationStatus: VerificationStatus.verified,
      panNumber: "ABCDE1234F",
      gstNumber: "07ABCDE1234F1Z5",
    },
    boostedOrderCount: BigInt(0),
    orderCount: BigInt(0),
    customerCount: BigInt(0),
  },
  {
    id: "m2",
    userId: "u3",
    businessName: "Patel Fast Food",
    category: "Food & Beverages",
    merchantType: MerchantType.order,
    deliveryType: DeliveryType.delivery,
    deliveryRadius: 5,
    isActive: true,
    isVerified: true,
    isOndcEnrolled: false,
    codAvailable: true,
    rentalAllowed: false,
    bookingAllowed: true,
    avgRating: 4.2,
    ratingCount: BigInt(87),
    menuProductIds: ["p3"],
    branches: [],
    phone: "+919812345678",
    location: { lat: 19.076, lng: 72.8777, address: "Bandra West, Mumbai" },
    kyc: {
      verificationStatus: VerificationStatus.verified,
      panNumber: "FGHIJ5678K",
      gstNumber: "27FGHIJ5678K1Z3",
    },
    boostedOrderCount: BigInt(0),
    orderCount: BigInt(0),
    customerCount: BigInt(0),
  },
  {
    id: "m3",
    userId: "u4",
    businessName: "Mehta Electronics",
    category: "Electronics",
    merchantType: MerchantType.inquiry,
    deliveryType: DeliveryType.takeaway,
    deliveryRadius: 0,
    isActive: false,
    isVerified: false,
    isOndcEnrolled: false,
    codAvailable: false,
    rentalAllowed: false,
    bookingAllowed: false,
    avgRating: 3.8,
    ratingCount: BigInt(22),
    menuProductIds: [],
    branches: [],
    phone: "+919988776655",
    location: { lat: 12.9716, lng: 77.5946, address: "Koramangala, Bengaluru" },
    kyc: { verificationStatus: VerificationStatus.pending },
    boostedOrderCount: BigInt(0),
    orderCount: BigInt(0),
    customerCount: BigInt(0),
    blockedUntil: BigInt(Date.now() + 86400000), // Blocked for 1 day (for demo)
  },
];

const USERS: User[] = [
  {
    id: "u1",
    name: "Rajesh Kumar",
    phone: "+919876543210",
    role: UserRole.customer,
    isActive: true,
    otpVerified: true,
    otpCode: "",
    otpExpiry: BigInt(0),
    sessionLocked: false,
    sessionLockExpiry: BigInt(0),
    passdigit: "1234",
    passdigitAttempts: BigInt(0),
    conversationState: ConversationState.mainMenu,
    stateData: "{}",
    registrationDate: BigInt(Date.now() - 30 * 86400000),
    address: "42 MG Road, New Delhi",
    countryCode: "IN",
    currency: "INR",
    countryName: "India",
    promotionalOptOut: false,
    gender: "",
  },
  {
    id: "u5",
    name: "Priya Singh",
    phone: "+919765432109",
    role: UserRole.customer,
    isActive: true,
    otpVerified: true,
    otpCode: "",
    otpExpiry: BigInt(0),
    sessionLocked: false,
    sessionLockExpiry: BigInt(0),
    passdigit: "5678",
    passdigitAttempts: BigInt(0),
    conversationState: ConversationState.orderSearch,
    stateData: "{}",
    registrationDate: BigInt(Date.now() - 15 * 86400000),
    countryCode: "IN",
    currency: "INR",
    countryName: "India",
    promotionalOptOut: false,
    gender: "",
  },
  {
    id: "u6",
    name: "Amit Verma",
    phone: "+919654321098",
    role: UserRole.customer,
    isActive: true,
    otpVerified: false,
    otpCode: "",
    otpExpiry: BigInt(0),
    sessionLocked: false,
    sessionLockExpiry: BigInt(0),
    passdigit: "",
    passdigitAttempts: BigInt(0),
    conversationState: ConversationState.welcome,
    stateData: "{}",
    registrationDate: BigInt(Date.now() - 2 * 86400000),
    countryCode: "IN",
    currency: "INR",
    countryName: "India",
    promotionalOptOut: false,
    gender: "",
  },
  ...MERCHANTS.map((m, i) => ({
    id: m.userId,
    name: m.businessName,
    phone: `+9198765432${i + 1}1`,
    role: UserRole.merchant as UserRole,
    isActive: m.isActive,
    otpVerified: true,
    otpCode: "",
    otpExpiry: BigInt(0),
    sessionLocked: false,
    sessionLockExpiry: BigInt(0),
    passdigit: "1234",
    passdigitAttempts: BigInt(0),
    conversationState: ConversationState.merchantActions,
    stateData: "{}",
    registrationDate: BigInt(Date.now() - (60 + i * 10) * 86400000),
    countryCode: "IN",
    currency: "INR",
    countryName: "India",
    promotionalOptOut: false,
    gender: "",
  })),
];

const DELIVERY_PARTNERS: DeliveryPartner[] = [
  {
    id: "dp1",
    userId: "u7",
    name: "Ravi Thakur",
    phone: "+919876500001",
    vehicleType: VehicleType.bike,
    serviceType: ServiceType.delivery,
    ratePerKm: 8,
    isOnline: true,
    isVerified: true,
    isOndcEnrolled: true,
    avgRating: 4.7,
    ratingCount: BigInt(213),
    otherPlatforms: ["Swiggy", "Dunzo"],
    currentLocation: { lat: 28.6, lng: 77.2, address: "Central Delhi" },
    kycStatus: KYCStatus.approved,
    aadhaarNo: "1234-5678-9012",
    panNo: "ABCDE1234F",
    rcBook: "DL-01-AB-1234",
  },
  {
    id: "dp2",
    userId: "u8",
    name: "Suresh Yadav",
    phone: "+919876500002",
    vehicleType: VehicleType.scooter,
    serviceType: ServiceType.sarthi,
    ratePerKm: 7,
    isOnline: false,
    isVerified: true,
    isOndcEnrolled: false,
    avgRating: 4.1,
    ratingCount: BigInt(56),
    otherPlatforms: [],
    kycStatus: KYCStatus.approved,
    aadhaarNo: "9876-5432-1098",
    panNo: "FGHIJ5678K",
    rcBook: "MH-02-CD-5678",
  },
];

function makeStatusHistory(
  entries: Array<{ status: OrderStatus; actor: StatusActor; ts: number }>,
): OrderStatusHistory[] {
  return entries.map((e) => ({
    status: e.status,
    actor: e.actor as unknown as UserRole,
    timestamp: BigInt(e.ts),
  }));
}

const ORDERS: Order[] = [
  {
    id: "ORD-001",
    customerId: "u1",
    merchantId: "m1",
    items: [
      {
        productId: "p1",
        productName: "Basmati Rice 5kg",
        quantity: BigInt(2),
        unitRate: 420,
        totalRate: 840,
      },
      {
        productId: "p2",
        productName: "Toor Dal 1kg",
        quantity: BigInt(3),
        unitRate: 110,
        totalRate: 330,
      },
    ],
    status: OrderStatus.completed,
    paymentMode: PaymentMode.cod,
    paymentStatus: PaymentStatus.paid,
    totalAmount: 1170,
    deliveryCharge: 30,
    surgeCharge: 0,
    createdAt: BigInt(Date.now() - 2 * 3600000),
    acceptedAt: BigInt(Date.now() - 1.8 * 3600000),
    merchantAcceptedAt: BigInt(Date.now() - 1.8 * 3600000),
    dpAcceptedAt: BigInt(Date.now() - 1.5 * 3600000),
    pickedUpAt: BigInt(Date.now() - 1.3 * 3600000),
    deliveredAt: BigInt(Date.now() - 1.1 * 3600000),
    paymentCollectedAt: BigInt(Date.now() - 1.05 * 3600000),
    vendorSettledAt: BigInt(Date.now() - 1 * 3600000),
    completedAt: BigInt(Date.now() - 1 * 3600000),
    paymentCollectedAmount: BigInt(1200),
    vendorSettlementAmount: BigInt(1050),
    deliveryPartnerId: "dp1",
    customerAddress: {
      lat: 28.61,
      lng: 77.21,
      address: "42 MG Road, New Delhi",
    },
    statusHistory: makeStatusHistory([
      {
        status: OrderStatus.pending,
        actor: StatusActor.customer,
        ts: Date.now() - 2 * 3600000,
      },
      {
        status: OrderStatus.accepted,
        actor: StatusActor.merchant,
        ts: Date.now() - 1.8 * 3600000,
      },
      {
        status: OrderStatus.assigned,
        actor: StatusActor.admin,
        ts: Date.now() - 1.5 * 3600000,
      },
      {
        status: OrderStatus.inTransit,
        actor: StatusActor.deliveryPartner,
        ts: Date.now() - 1.3 * 3600000,
      },
      {
        status: OrderStatus.delivered,
        actor: StatusActor.deliveryPartner,
        ts: Date.now() - 1.1 * 3600000,
      },
      {
        status: OrderStatus.paymentCollected,
        actor: StatusActor.deliveryPartner,
        ts: Date.now() - 1.05 * 3600000,
      },
      {
        status: OrderStatus.completed,
        actor: StatusActor.merchant,
        ts: Date.now() - 1 * 3600000,
      },
    ]),
    isManualOrder: false,
    manualItems: [],
    ondcSource: false,
  },
  {
    id: "ORD-002",
    customerId: "u5",
    merchantId: "m2",
    items: [
      {
        productId: "p3",
        productName: "Veg Biryani",
        quantity: BigInt(2),
        unitRate: 180,
        totalRate: 360,
      },
      {
        productId: "p4",
        productName: "Raita",
        quantity: BigInt(2),
        unitRate: 40,
        totalRate: 80,
      },
    ],
    status: OrderStatus.inTransit,
    paymentMode: PaymentMode.online,
    paymentStatus: PaymentStatus.paid,
    totalAmount: 440,
    deliveryCharge: 25,
    surgeCharge: 0,
    createdAt: BigInt(Date.now() - 45 * 60000),
    acceptedAt: BigInt(Date.now() - 40 * 60000),
    merchantAcceptedAt: BigInt(Date.now() - 40 * 60000),
    dpAcceptedAt: BigInt(Date.now() - 35 * 60000),
    pickedUpAt: BigInt(Date.now() - 30 * 60000),
    assignedAt: BigInt(Date.now() - 35 * 60000),
    paymentCollectedAmount: BigInt(0),
    vendorSettlementAmount: BigInt(0),
    deliveryPartnerId: "dp1",
    customerAddress: { lat: 19.08, lng: 72.88, address: "Bandra West, Mumbai" },
    statusHistory: makeStatusHistory([
      {
        status: OrderStatus.pending,
        actor: StatusActor.customer,
        ts: Date.now() - 45 * 60000,
      },
      {
        status: OrderStatus.accepted,
        actor: StatusActor.merchant,
        ts: Date.now() - 40 * 60000,
      },
      {
        status: OrderStatus.assigned,
        actor: StatusActor.admin,
        ts: Date.now() - 35 * 60000,
      },
      {
        status: OrderStatus.inTransit,
        actor: StatusActor.deliveryPartner,
        ts: Date.now() - 30 * 60000,
      },
    ]),
    isManualOrder: false,
    manualItems: [],
    ondcSource: false,
  },
  {
    id: "ORD-003",
    customerId: "u6",
    merchantId: "m1",
    items: [
      {
        productId: "p1",
        productName: "Sunflower Oil 1L",
        quantity: BigInt(1),
        unitRate: 145,
        totalRate: 145,
      },
    ],
    status: OrderStatus.pending,
    paymentMode: PaymentMode.cod,
    paymentStatus: PaymentStatus.pending,
    totalAmount: 145,
    deliveryCharge: 20,
    surgeCharge: 0,
    createdAt: BigInt(Date.now() - 10 * 60000),
    paymentCollectedAmount: BigInt(0),
    vendorSettlementAmount: BigInt(0),
    customerAddress: {
      lat: 28.62,
      lng: 77.22,
      address: "Karol Bagh, New Delhi",
    },
    statusHistory: makeStatusHistory([
      {
        status: OrderStatus.pending,
        actor: StatusActor.customer,
        ts: Date.now() - 10 * 60000,
      },
    ]),
    isManualOrder: false,
    manualItems: [],
    ondcSource: false,
  },
  {
    id: "ORD-004",
    customerId: "u1",
    merchantId: "m2",
    items: [
      {
        productId: "p5",
        productName: "Paneer Butter Masala",
        quantity: BigInt(1),
        unitRate: 220,
        totalRate: 220,
      },
      {
        productId: "p6",
        productName: "Naan x4",
        quantity: BigInt(1),
        unitRate: 60,
        totalRate: 60,
      },
    ],
    status: OrderStatus.accepted,
    paymentMode: PaymentMode.qrCode,
    paymentStatus: PaymentStatus.paid,
    totalAmount: 280,
    deliveryCharge: 25,
    surgeCharge: 15,
    createdAt: BigInt(Date.now() - 25 * 60000),
    acceptedAt: BigInt(Date.now() - 20 * 60000),
    merchantAcceptedAt: BigInt(Date.now() - 20 * 60000),
    paymentCollectedAmount: BigInt(0),
    vendorSettlementAmount: BigInt(0),
    customerAddress: {
      lat: 28.65,
      lng: 77.23,
      address: "Paharganj, New Delhi",
    },
    statusHistory: makeStatusHistory([
      {
        status: OrderStatus.pending,
        actor: StatusActor.customer,
        ts: Date.now() - 25 * 60000,
      },
      {
        status: OrderStatus.accepted,
        actor: StatusActor.merchant,
        ts: Date.now() - 20 * 60000,
      },
    ]),
    isManualOrder: false,
    manualItems: [],
    ondcSource: false,
  },
  {
    id: "ORD-005",
    customerId: "u5",
    merchantId: "m1",
    items: [
      {
        productId: "p7",
        productName: "Whole Wheat Atta 10kg",
        quantity: BigInt(1),
        unitRate: 380,
        totalRate: 380,
      },
    ],
    status: OrderStatus.cancelled,
    paymentMode: PaymentMode.cod,
    paymentStatus: PaymentStatus.refunded,
    totalAmount: 380,
    deliveryCharge: 30,
    surgeCharge: 0,
    createdAt: BigInt(Date.now() - 5 * 3600000),
    cancelledAt: BigInt(Date.now() - 4.5 * 3600000),
    paymentCollectedAmount: BigInt(0),
    vendorSettlementAmount: BigInt(0),
    customerAddress: {
      lat: 19.07,
      lng: 72.87,
      address: "Andheri East, Mumbai",
    },
    statusHistory: makeStatusHistory([
      {
        status: OrderStatus.pending,
        actor: StatusActor.customer,
        ts: Date.now() - 5 * 3600000,
      },
      {
        status: OrderStatus.cancelled,
        actor: StatusActor.customer,
        ts: Date.now() - 4.5 * 3600000,
      },
    ]),
    isManualOrder: false,
    manualItems: [],
    ondcSource: false,
  },
];

const JOBS: Job[] = [
  {
    id: "j1",
    posterId: "u1",
    title: "React Developer",
    description:
      "Looking for a senior React developer with 3+ years experience. Work from home option available. Must know TypeScript and REST APIs.",
    category: "Technology",
    salaryMin: 60000,
    salaryMax: 120000,
    isOpen: true,
    leads: [],
    publishDate: BigInt(Date.now() - 3 * 86400000),
    endDate: BigInt(Date.now() + 4 * 86400000),
    location: { lat: 28.6139, lng: 77.209, address: "New Delhi" },
    jobType: JobType.permanent,
    isAdhoc: false,
  },
  {
    id: "j2",
    posterId: "u2",
    title: "Delivery Executive",
    description:
      "Immediate opening for delivery executives. Two-wheeler required. Day shift. Training provided.",
    category: "Logistics",
    salaryMin: 15000,
    salaryMax: 22000,
    isOpen: true,
    leads: [
      {
        requesterId: "u5",
        requesterName: "Priya Singh",
        requesterPhone: "+91 97654*****",
        status: ContactRequestStatus.pending,
        isContacted: false,
        requestedAt: BigInt(Date.now() - 86400000),
      } as unknown as ContactRequest,
    ],
    publishDate: BigInt(Date.now() - 1 * 86400000),
    endDate: BigInt(Date.now() + 6 * 86400000),
    location: { lat: 19.076, lng: 72.8777, address: "Mumbai" },
    jobType: JobType.permanent,
    isAdhoc: false,
  },
  {
    id: "j3",
    posterId: "u3",
    title: "Sales Manager",
    description:
      "Experienced sales manager needed for FMCG distribution network. Must have own vehicle and 5+ years B2B sales experience.",
    category: "Retail",
    salaryMin: 35000,
    salaryMax: 65000,
    isOpen: true,
    leads: [
      {
        requesterId: "u6",
        requesterName: "Amit Verma",
        requesterPhone: "+91 96543*****",
        status: ContactRequestStatus.approved,
        isContacted: true,
        requestedAt: BigInt(Date.now() - 2 * 86400000),
      } as unknown as ContactRequest,
    ],
    publishDate: BigInt(Date.now() - 4 * 86400000),
    endDate: BigInt(Date.now() + 3 * 86400000),
    location: { lat: 12.9716, lng: 77.5946, address: "Bengaluru" },
    jobType: JobType.permanent,
    isAdhoc: false,
  },
  {
    id: "j4",
    posterId: "u1",
    title: "Primary School Teacher",
    description:
      "Looking for an enthusiastic primary school teacher for CBSE curriculum. English medium. B.Ed required.",
    category: "Education",
    salaryMin: 18000,
    salaryMax: 28000,
    isOpen: true,
    leads: [],
    publishDate: BigInt(Date.now() - 2 * 86400000),
    endDate: BigInt(Date.now() + 5 * 86400000),
    location: { lat: 26.8467, lng: 80.9462, address: "Lucknow, Uttar Pradesh" },
    jobType: JobType.permanent,
    isAdhoc: false,
  },
  {
    id: "j5",
    posterId: "u5",
    title: "Accounts Executive",
    description:
      "Commerce graduate needed for GST filing and tally data entry. 1–2 years experience preferred.",
    category: "Finance",
    salaryMin: 20000,
    salaryMax: 35000,
    isOpen: false,
    leads: [],
    publishDate: BigInt(Date.now() - 10 * 86400000),
    endDate: BigInt(Date.now() - 3 * 86400000),
    location: { lat: 22.5726, lng: 88.3639, address: "Kolkata, West Bengal" },
    jobType: JobType.permanent,
    isAdhoc: false,
  },
  {
    id: "j6",
    posterId: "u2",
    title: "Cook / Chef",
    description:
      "Hotel-trained cook required for a cloud kitchen. North Indian and Chinese cuisines. Flexible shift timings.",
    category: "Food & Hospitality",
    salaryMin: 22000,
    salaryMax: 38000,
    isOpen: true,
    leads: [],
    publishDate: BigInt(Date.now() - 1 * 86400000),
    endDate: BigInt(Date.now() + 6 * 86400000),
    location: { lat: 17.385, lng: 78.4867, address: "Hyderabad, Telangana" },
    jobType: JobType.permanent,
    isAdhoc: false,
  },
];

const PROPERTIES: Property[] = [
  {
    id: "pr1",
    posterId: "u1",
    description:
      "2 BHK semi-furnished apartment with 24/7 security, gym, and swimming pool. Walking distance to metro station. South-facing with good ventilation.",
    listingType: PropertyListingType.rent,
    expectedPrice: 28000,
    isActive: true,
    leads: [],
    publishDate: BigInt(Date.now() - 5 * 86400000),
    endDate: BigInt(Date.now() + 9 * 86400000),
    location: { lat: 28.63, lng: 77.22, address: "Lajpat Nagar, New Delhi" },
  },
  {
    id: "pr2",
    posterId: "u3",
    description:
      "3 BHK ready-to-move villa in gated society. Covered parking, modular kitchen, and servant quarters.",
    listingType: PropertyListingType.sale,
    expectedPrice: 8500000,
    isActive: true,
    leads: [
      {
        requesterId: "u6",
        requesterName: "Amit Verma",
        requesterPhone: "+91 96543*****",
        status: ContactRequestStatus.approved,
        isContacted: true,
        requestedAt: BigInt(Date.now() - 2 * 86400000),
      } as unknown as ContactRequest,
    ],
    publishDate: BigInt(Date.now() - 10 * 86400000),
    endDate: BigInt(Date.now() + 4 * 86400000),
    location: { lat: 12.9716, lng: 77.5946, address: "Whitefield, Bengaluru" },
  },
  {
    id: "pr3",
    posterId: "u5",
    description:
      "Commercial shop 400 sq ft on ground floor in a busy marketplace. Ideal for retail, salon, or medical clinic.",
    listingType: PropertyListingType.lease,
    expectedPrice: 45000,
    isActive: true,
    leads: [],
    publishDate: BigInt(Date.now() - 7 * 86400000),
    endDate: BigInt(Date.now() + 7 * 86400000),
    location: { lat: 19.076, lng: 72.8777, address: "Bandra West, Mumbai" },
  },
  {
    id: "pr4",
    posterId: "u2",
    description:
      "1 BHK furnished apartment suitable for working professionals. Fully equipped kitchen, AC, Wi-Fi included.",
    listingType: PropertyListingType.rent,
    expectedPrice: 18000,
    isActive: true,
    leads: [],
    publishDate: BigInt(Date.now() - 3 * 86400000),
    endDate: BigInt(Date.now() + 11 * 86400000),
    location: { lat: 17.385, lng: 78.4867, address: "Hitech City, Hyderabad" },
  },
  {
    id: "pr5",
    posterId: "u1",
    description:
      "Plot 1200 sq ft in approved township layout with BBMP sanction. Corner plot with two road access.",
    listingType: PropertyListingType.buy,
    expectedPrice: 3200000,
    isActive: true,
    leads: [],
    publishDate: BigInt(Date.now() - 1 * 86400000),
    endDate: BigInt(Date.now() + 13 * 86400000),
    location: { lat: 13.035, lng: 77.597, address: "Yelahanka, Bengaluru" },
  },
];

const PLANS: SubscriptionPlan[] = [
  {
    id: "plan1",
    name: "Free Plan",
    planType: SubscriptionPlanType.free,
    targetRole: UserRole.merchant,
    priceFlat: 0,
    pricePercentage: 0,
    orderLimit: BigInt(20),
    inquiryLimit: BigInt(5),
    durationDays: BigInt(30),
    features: ["Up to 20 orders/month", "5 inquiries/month", "Basic analytics"],
    isActive: true,
    applicableRoles: [UserRole.merchant],
    qrCodeData: "",
    utilityLimit: BigInt(0),
    marketingLimit: BigInt(0),
    messageType: "text",
    authLimit: BigInt(0),
  },
  {
    id: "plan2",
    name: "Weekly Pro",
    planType: SubscriptionPlanType.weekly,
    targetRole: UserRole.merchant,
    priceFlat: 499,
    pricePercentage: 0,
    orderLimit: BigInt(100),
    inquiryLimit: BigInt(50),
    durationDays: BigInt(7),
    features: [
      "Up to 100 orders/week",
      "50 inquiries/week",
      "Priority support",
      "ONDC eligible",
    ],
    isActive: true,
    applicableRoles: [UserRole.merchant],
    qrCodeData: "",
    utilityLimit: BigInt(0),
    marketingLimit: BigInt(0),
    messageType: "text",
    authLimit: BigInt(0),
  },
  {
    id: "plan3",
    name: "Monthly Business",
    planType: SubscriptionPlanType.monthly,
    targetRole: UserRole.merchant,
    priceFlat: 1499,
    pricePercentage: 2,
    orderLimit: BigInt(500),
    inquiryLimit: BigInt(200),
    durationDays: BigInt(30),
    features: [
      "Unlimited orders",
      "200 inquiries/month",
      "Analytics dashboard",
      "ONDC enrolled",
      "WhatsApp API",
    ],
    isActive: true,
    applicableRoles: [UserRole.merchant],
    qrCodeData: "",
    utilityLimit: BigInt(0),
    marketingLimit: BigInt(0),
    messageType: "text",
    authLimit: BigInt(0),
  },
  {
    id: "plan4",
    name: "Category Plan – Food & Grocery",
    planType: SubscriptionPlanType.category,
    targetRole: UserRole.merchant,
    priceFlat: 799,
    pricePercentage: 0,
    orderLimit: BigInt(300),
    inquiryLimit: BigInt(100),
    durationDays: BigInt(30),
    categoryScope: "Food,Grocery,Bakery,Dairy",
    features: [
      "Food & Grocery category only",
      "300 orders/month",
      "Priority listing in category",
      "Category analytics",
    ],
    isActive: true,
    applicableRoles: [UserRole.merchant],
    qrCodeData: "",
    utilityLimit: BigInt(0),
    marketingLimit: BigInt(0),
    messageType: "text",
    authLimit: BigInt(0),
  },
  {
    id: "plan5",
    name: "Duration Plan – 90 Days",
    planType: SubscriptionPlanType.duration,
    targetRole: UserRole.merchant,
    priceFlat: 3499,
    pricePercentage: 0,
    orderLimit: BigInt(1500),
    inquiryLimit: BigInt(600),
    durationDays: BigInt(90),
    features: [
      "90-day validity",
      "1500 orders total",
      "600 inquiries",
      "Dedicated support",
      "Bulk billing",
    ],
    isActive: true,
    applicableRoles: [UserRole.merchant, UserRole.deliveryPartner],
    qrCodeData: "",
    utilityLimit: BigInt(0),
    marketingLimit: BigInt(0),
    messageType: "text",
    authLimit: BigInt(0),
  },
  {
    id: "plan6",
    name: "Flat Fee – Job Posting",
    planType: SubscriptionPlanType.flat,
    targetRole: UserRole.customer,
    priceFlat: 199,
    pricePercentage: 0,
    flatFee: 199,
    orderLimit: BigInt(0),
    inquiryLimit: BigInt(10),
    durationDays: BigInt(7),
    features: [
      "Post 1 job listing (7 days)",
      "Up to 10 applicant contacts",
      "Featured badge",
      "Shareable link",
    ],
    isActive: true,
    applicableRoles: [UserRole.customer, UserRole.merchant],
    qrCodeData: "",
    utilityLimit: BigInt(0),
    marketingLimit: BigInt(0),
    messageType: "text",
    authLimit: BigInt(0),
  },
  {
    id: "plan7",
    name: "Percentage Commission – Delivery",
    planType: SubscriptionPlanType.percentage,
    targetRole: UserRole.deliveryPartner,
    priceFlat: 0,
    pricePercentage: 5,
    percentageFee: 5,
    minTransactionAmount: 100,
    maxTransactionAmount: 5000,
    orderLimit: BigInt(200),
    inquiryLimit: BigInt(0),
    durationDays: BigInt(30),
    features: [
      "5% of each delivery amount",
      "Up to 200 deliveries/month",
      "Daily payout",
      "No fixed monthly fee",
    ],
    isActive: true,
    applicableRoles: [UserRole.deliveryPartner],
    qrCodeData: "",
    utilityLimit: BigInt(0),
    marketingLimit: BigInt(0),
    messageType: "text",
    authLimit: BigInt(0),
  },
  {
    id: "plan8",
    name: "Property Listing Plan",
    planType: SubscriptionPlanType.flat,
    targetRole: UserRole.customer,
    priceFlat: 299,
    pricePercentage: 0,
    flatFee: 299,
    orderLimit: BigInt(0),
    inquiryLimit: BigInt(20),
    durationDays: BigInt(14),
    features: [
      "Post 1 property listing (14 days)",
      "20 inquiry contacts",
      "Featured badge",
      "Photo uploads",
    ],
    isActive: true,
    applicableRoles: [UserRole.customer, UserRole.merchant],
    qrCodeData: "",
    utilityLimit: BigInt(0),
    marketingLimit: BigInt(0),
    messageType: "text",
    authLimit: BigInt(0),
  },
];

const RATE_CARDS: DeliveryRateCard[] = [
  {
    id: "rc1",
    vehicleType: VehicleType.bike,
    serviceType: ServiceType.delivery,
    baseRate: 25,
    perKmRate: 7,
    surgeMultiplier: 1.5,
    isActive: true,
  },
  {
    id: "rc2",
    vehicleType: VehicleType.scooter,
    serviceType: ServiceType.delivery,
    baseRate: 25,
    perKmRate: 7,
    surgeMultiplier: 1.5,
    isActive: true,
  },
  {
    id: "rc3",
    vehicleType: VehicleType.auto,
    serviceType: ServiceType.delivery,
    baseRate: 40,
    perKmRate: 12,
    surgeMultiplier: 1.8,
    isActive: true,
  },
  {
    id: "rc4",
    vehicleType: VehicleType.car,
    serviceType: ServiceType.delivery,
    baseRate: 60,
    perKmRate: 18,
    surgeMultiplier: 2.0,
    isActive: true,
  },
  {
    id: "rc5",
    vehicleType: VehicleType.van,
    serviceType: ServiceType.delivery,
    baseRate: 100,
    perKmRate: 25,
    surgeMultiplier: 1.8,
    isActive: false,
  },
  {
    id: "rc6",
    vehicleType: VehicleType.truck,
    serviceType: ServiceType.delivery,
    baseRate: 200,
    perKmRate: 40,
    surgeMultiplier: 1.5,
    isActive: false,
  },
  {
    id: "rc7",
    vehicleType: VehicleType.auto,
    serviceType: ServiceType.sarthi,
    baseRate: 40,
    perKmRate: 10,
    surgeMultiplier: 1.5,
    isActive: true,
  },
  {
    id: "rc8",
    vehicleType: VehicleType.car,
    serviceType: ServiceType.sarthi,
    baseRate: 70,
    perKmRate: 16,
    surgeMultiplier: 1.8,
    isActive: true,
  },
];

const ONDC_ENROLLMENTS: OndcEnrollment[] = [
  {
    id: "ondc1",
    userId: "u2",
    role: UserRole.merchant,
    businessName: "Sharma Kirana Store",
    gstin: "07ABCDE1234F1Z5",
    bankAccount: "1234567890",
    ifscCode: "HDFC0001234",
    submittedAt: BigInt(Date.now() - 7 * 86400000),
    enrollmentStatus: VerificationStatus.verified,
    reviewedAt: BigInt(Date.now() - 5 * 86400000),
  },
  {
    id: "ondc2",
    userId: "u7",
    role: UserRole.deliveryPartner,
    businessName: "Ravi Thakur Logistics",
    bankAccount: "9876543210",
    ifscCode: "SBIN0002345",
    submittedAt: BigInt(Date.now() - 3 * 86400000),
    enrollmentStatus: VerificationStatus.pending,
  },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    userId: "u1",
    recipientPhone: "+919876543210",
    notificationType: "order_status",
    message: "Your order ORD-001 has been delivered. Rate your experience!",
    status: NotificationStatus.sent,
    createdAt: BigInt(Date.now() - 3600000),
    sentAt: BigInt(Date.now() - 3500000),
  },
  {
    id: "n2",
    userId: "u5",
    recipientPhone: "+919765432109",
    notificationType: "order_status",
    message:
      "Your order ORD-002 is out for delivery. Estimated arrival: 20 mins.",
    status: NotificationStatus.sent,
    createdAt: BigInt(Date.now() - 1800000),
    sentAt: BigInt(Date.now() - 1750000),
  },
  {
    id: "n3",
    userId: "u6",
    recipientPhone: "+919654321098",
    notificationType: "order_pending",
    message: "Your order ORD-003 is waiting for merchant acceptance.",
    status: NotificationStatus.pending,
    createdAt: BigInt(Date.now() - 600000),
  },
];

const WHATSAPP_CONFIG: WhatsAppConfig = {
  apiKey: "EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  phoneNumberId: "123456789012345",
  verifyToken: "whatsapp_webhook_verify_token_2024",
  webhookUrl: "https://your-domain.ic.app/api/webhook",
  isConnected: false,
  isTestMode: true,
};

// ─── Role & Employee Seed Data ───────────────────────────────────────────────

const EMPLOYEE_ROLES: EmployeeRole[] = [
  {
    id: "role_superadmin",
    name: "Super Admin",
    description: "Full access to all sections of the admin portal.",
    permissions: [
      "Dashboard",
      "Orders",
      "Users",
      "Merchants",
      "Products",
      "Jobs",
      "Properties",
      "Events",
      "Family Groups",
      "Promotions",
      "Rate Cards",
      "Subscriptions",
      "ONDC",
      "WhatsApp Config",
      "Analytics",
      "Notifications",
      "Chatbot Simulator",
      "Role Management",
    ],
    isDefault: true,
  },
  {
    id: "role_manager",
    name: "Manager",
    description: "Access to most sections; no role management.",
    permissions: [
      "Dashboard",
      "Orders",
      "Users",
      "Merchants",
      "Products",
      "Jobs",
      "Properties",
      "Events",
      "Family Groups",
      "Promotions",
      "Rate Cards",
      "Subscriptions",
      "Analytics",
      "Notifications",
      "Chatbot Simulator",
    ],
    isDefault: true,
  },
  {
    id: "role_support",
    name: "Support",
    description: "Customer support — users, orders, and notifications only.",
    permissions: ["Dashboard", "Users", "Orders", "Notifications"],
    isDefault: true,
  },
];

const EMPLOYEES: Employee[] = [
  {
    id: "emp1",
    name: "Arjun Sharma",
    email: "arjun@whatscart.in",
    password: "admin@2024",
    roleId: "role_superadmin",
    roleName: "Super Admin",
    permissions: [...EMPLOYEE_ROLES[0].permissions],
    isActive: true,
    createdAt: BigInt(Date.now() - 90 * 86400000),
    lastLogin: BigInt(Date.now() - 3600000),
  },
  {
    id: "emp2",
    name: "Neha Patel",
    email: "neha.sales@whatscart.in",
    password: "neha@2024",
    roleId: "role_manager",
    roleName: "Manager",
    permissions: [
      "Orders",
      "Merchants",
      "Products",
      "Subscriptions",
      "Analytics",
    ],
    isActive: true,
    createdAt: BigInt(Date.now() - 45 * 86400000),
    lastLogin: BigInt(Date.now() - 86400000),
  },
  {
    id: "emp3",
    name: "Vikram Singh",
    email: "vikram.support@whatscart.in",
    password: "vikram@2024",
    roleId: "role_support",
    roleName: "Support",
    permissions: ["Dashboard", "Users", "Orders", "Notifications"],
    isActive: false,
    createdAt: BigInt(Date.now() - 20 * 86400000),
    lastLogin: BigInt(Date.now() - 7 * 86400000),
  },
];

// ─── Events Seed Data ────────────────────────────────────────────────────────

const EVENTS: AppEvent[] = [
  {
    id: "ev1",
    organizerPhone: "+919876543210",
    organizerName: "Rajesh Kumar",
    name: "Diwali Mela 2026",
    description:
      "A grand Diwali celebration featuring cultural performances, food stalls, fireworks, and artisan crafts from across India. Family-friendly event with special kids' zone.",
    isPaid: false,
    location: "Connaught Place, New Delhi",
    startDate: "2026-10-20",
    endDate: "2026-10-22",
    ticketVenue: "Online / Gate",
    status: "published",
    publishedUntil: "2026-11-15",
    createdAt: Date.now() - 5 * 86400000,
  },
  {
    id: "ev2",
    organizerPhone: "+919765432109",
    organizerName: "Priya Singh",
    name: "Bangalore Tech Summit",
    description:
      "Annual technology conference bringing together startups, investors, and industry leaders. Keynotes, panel discussions, and networking sessions across 3 days.",
    isPaid: true,
    price: 2500,
    location: "Bangalore International Exhibition Centre, Bengaluru",
    startDate: "2026-11-10",
    endDate: "2026-11-12",
    ticketVenue: "BookMyShow / Counter",
    status: "published",
    publishedUntil: "2026-12-10",
    createdAt: Date.now() - 10 * 86400000,
  },
  {
    id: "ev3",
    organizerPhone: "+919654321098",
    organizerName: "Amit Verma",
    name: "Kolkata Book Fair",
    description:
      "International book fair showcasing publishers from 30+ countries. Book launches, author meets, and literary workshops for all age groups.",
    isPaid: false,
    location: "Salt Lake, Kolkata",
    startDate: "2026-12-05",
    endDate: "2026-12-15",
    ticketVenue: "Free Entry",
    status: "pending",
    publishedUntil: "2027-01-05",
    createdAt: Date.now() - 2 * 86400000,
  },
  {
    id: "ev4",
    organizerPhone: "+919812345678",
    organizerName: "Sunita Mehta",
    name: "Mumbai Food Festival",
    description:
      "Street food extravaganza with over 200 vendors representing every state cuisine. Live music, cooking demonstrations, and food competitions.",
    isPaid: true,
    price: 500,
    location: "Bandra-Kurla Complex, Mumbai",
    startDate: "2026-09-15",
    endDate: "2026-09-17",
    ticketVenue: "Paytm / Gate",
    status: "expired",
    publishedUntil: "2026-10-17",
    createdAt: Date.now() - 45 * 86400000,
  },
  {
    id: "ev5",
    organizerPhone: "+919988776655",
    organizerName: "Vikram Nair",
    name: "Hyderabad Music Fest",
    description:
      "Three-day music festival featuring classical, fusion, and contemporary artists. Open-air amphitheatre with food and art installations.",
    isPaid: true,
    price: 1200,
    location: "Necklace Road, Hyderabad",
    startDate: "2026-10-30",
    endDate: "2026-11-01",
    ticketVenue: "BookMyShow",
    status: "published",
    publishedUntil: "2026-11-30",
    createdAt: Date.now() - 8 * 86400000,
  },
];

// ─── Family Members Seed Data ────────────────────────────────────────────────

const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "fm1",
    ownerName: "Rajesh",
    ownerSurname: "Kumar",
    ownerPhone: "+919876543210",
    relationName: "Meena Kumar",
    relationPhone: "+919876543211",
    relationship: "wife",
    address: "42 MG Road, New Delhi",
    inviteStatus: "connected",
    createdAt: Date.now() - 20 * 86400000,
  },
  {
    id: "fm2",
    ownerName: "Rajesh",
    ownerSurname: "Kumar",
    ownerPhone: "+919876543210",
    relationName: "Arjun Kumar",
    relationPhone: "+919876543212",
    relationship: "son",
    address: "42 MG Road, New Delhi",
    inviteStatus: "pending",
    createdAt: Date.now() - 5 * 86400000,
  },
  {
    id: "fm3",
    ownerName: "Priya",
    ownerSurname: "Singh",
    ownerPhone: "+919765432109",
    relationName: "Ramesh Singh",
    relationPhone: "+919765432110",
    relationship: "father",
    address: "15 Civil Lines, Jaipur",
    inviteStatus: "connected",
    createdAt: Date.now() - 30 * 86400000,
  },
  {
    id: "fm4",
    ownerName: "Priya",
    ownerSurname: "Singh",
    ownerPhone: "+919765432109",
    relationName: "Sunita Singh",
    relationPhone: "+919765432111",
    relationship: "mother",
    address: "15 Civil Lines, Jaipur",
    inviteStatus: "pending",
    createdAt: Date.now() - 3 * 86400000,
  },
  {
    id: "fm5",
    ownerName: "Amit",
    ownerSurname: "Verma",
    ownerPhone: "+919654321098",
    relationName: "Sanjay Verma",
    relationPhone: "+919654321099",
    relationship: "brother",
    address: "7 Park Street, Kolkata",
    inviteStatus: "cancelled",
    createdAt: Date.now() - 12 * 86400000,
  },
  {
    id: "fm6",
    ownerName: "Vikram",
    ownerSurname: "Nair",
    ownerPhone: "+919988776655",
    relationName: "Anita Nair",
    relationPhone: "+919988776656",
    relationship: "sister",
    address: "Necklace Road, Hyderabad",
    inviteStatus: "connected",
    createdAt: Date.now() - 7 * 86400000,
  },
];

// ─── Promotions Seed Data ────────────────────────────────────────────────────

const PROMOTION_PLANS: PromotionPlan[] = [
  { id: "pp1", usersReach: 100, price: 499, label: "Starter – 100 users" },
  { id: "pp2", usersReach: 200, price: 899, label: "Basic – 200 users" },
  { id: "pp3", usersReach: 500, price: 1999, label: "Growth – 500 users" },
  { id: "pp4", usersReach: 1000, price: 3499, label: "Pro – 1,000 users" },
  { id: "pp5", usersReach: 2000, price: 5999, label: "Scale – 2,000 users" },
];

const PROMOTIONS: Promotion[] = [
  {
    id: "promo1",
    advertiserPhone: "+919876543210",
    advertiserName: "Rajesh Kumar",
    title: "Grand Sale at Sharma Kirana Store – Flat 20% Off",
    reelLink: "https://www.instagram.com/reel/example1",
    imageLink:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    areaName: "Connaught Place",
    city: "New Delhi",
    country: "India",
    planId: "pp3",
    planUsersReach: 500,
    status: "active",
    usersReached: 312,
    usersViewed: 189,
    createdAt: Date.now() - 10 * 86400000,
    expiresAt: Date.now() + 20 * 86400000,
  },
  {
    id: "promo2",
    advertiserPhone: "+919765432109",
    advertiserName: "Priya Singh",
    title: "New Season Collection – Patel Boutique",
    reelLink: "https://www.instagram.com/reel/example2",
    imageLink:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    areaName: "Bandra West",
    city: "Mumbai",
    country: "India",
    planId: "pp4",
    planUsersReach: 1000,
    status: "pendingApproval",
    usersReached: 0,
    usersViewed: 0,
    createdAt: Date.now() - 1 * 86400000,
    expiresAt: Date.now() + 29 * 86400000,
  },
  {
    id: "promo3",
    advertiserPhone: "+919654321098",
    advertiserName: "Amit Verma",
    title: "Weekend Special – Mehta Sweets & Bakery",
    reelLink: "https://www.instagram.com/reel/example3",
    imageLink:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
    areaName: "Koramangala",
    city: "Bengaluru",
    country: "India",
    planId: "pp2",
    planUsersReach: 200,
    status: "active",
    usersReached: 187,
    usersViewed: 143,
    createdAt: Date.now() - 15 * 86400000,
    expiresAt: Date.now() + 15 * 86400000,
  },
  {
    id: "promo4",
    advertiserPhone: "+919812345678",
    advertiserName: "Sunita Mehta",
    title: "Healthcare Camp – Free BP & Sugar Test",
    reelLink: "https://www.instagram.com/reel/example4",
    imageLink:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    areaName: "Hitech City",
    city: "Hyderabad",
    country: "India",
    planId: "pp1",
    planUsersReach: 100,
    status: "rejected",
    rejectionReason: "Missing organizer credentials",
    usersReached: 0,
    usersViewed: 0,
    createdAt: Date.now() - 5 * 86400000,
    expiresAt: Date.now() + 25 * 86400000,
  },
  {
    id: "promo5",
    advertiserPhone: "+919988776655",
    advertiserName: "Vikram Nair",
    title: "Navratri Sale – Nair Jewellery & Gifts",
    reelLink: "https://www.instagram.com/reel/example5",
    imageLink:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    areaName: "Salt Lake",
    city: "Kolkata",
    country: "India",
    planId: "pp5",
    planUsersReach: 2000,
    status: "active",
    usersReached: 1456,
    usersViewed: 872,
    createdAt: Date.now() - 8 * 86400000,
    expiresAt: Date.now() + 22 * 86400000,
  },
];

// ─── Chat simulation state ────────────────────────────────────────────────────

const chatSessions: Record<string, ConversationMessage[]> = {};

function generateBotResponse(
  phoneNumber: string,
  message: string,
): BotMessage[] {
  const lower = message.toLowerCase().trim();
  const to = phoneNumber;

  if (lower === "hi" || lower === "hello" || lower === "menu") {
    return [
      {
        to,
        messageType: "text",
        languageKey: "en",
        body: "👋 Welcome to *WhatsCart*!\n\nI'm your shopping assistant. How can I help you today?\n\n1️⃣ Browse & Order\n2️⃣ Track Order\n3️⃣ Post a Job\n4️⃣ Property Listings\n5️⃣ My Account",
        quickReplies: [
          { id: "qr1", title: "🛒 Browse & Order", payload: "1" },
          { id: "qr2", title: "📦 Track Order", payload: "2" },
          { id: "qr3", title: "💼 Post a Job", payload: "3" },
          { id: "qr4", title: "🏠 Properties", payload: "4" },
        ],
      },
    ];
  }

  if (lower === "2" || lower.includes("track")) {
    return [
      {
        to,
        messageType: "text",
        languageKey: "en",
        body: "📦 *Order Tracking*\n\nHere are your recent orders:\n\n🟢 ORD-002 — *In Transit*\nPatel Fast Food → Bandra West\nEstimated: 20 mins\n\n✅ ORD-001 — *Delivered*\nSharma Kirana Store\nDelivered 1 hour ago\n\nReply with an order ID for details.",
        quickReplies: [
          { id: "qr5", title: "ORD-002 Details", payload: "ORD-002" },
          { id: "qr6", title: "🏠 Main Menu", payload: "hi" },
        ],
      },
    ];
  }

  if (lower === "1" || lower.includes("order") || lower.includes("browse")) {
    return [
      {
        to,
        messageType: "text",
        languageKey: "en",
        body: "🛒 *What are you looking for today?*\n\nPlease type a *product name or keyword* (e.g. dal, bread, vegetables, medicines) OR send a photo of the product you want to find.\n\n📸 I will search nearby merchants for you!\n\nPopular categories:\n🥗 Grocery  🍛 Food  💊 Medicine  👗 Clothing",
        quickReplies: [
          { id: "qr7", title: "🥗 Grocery", payload: "grocery" },
          { id: "qr8", title: "🍛 Food", payload: "food" },
          { id: "qr9", title: "📱 Electronics", payload: "electronics" },
          { id: "qr10", title: "💊 Medicine", payload: "medicine" },
        ],
      },
    ];
  }

  if (
    lower.includes("grocery") ||
    lower.includes("rice") ||
    lower.includes("dal")
  ) {
    return [
      {
        to,
        messageType: "text",
        languageKey: "en",
        body: "🛒 Found *2 merchants* near you for grocery:\n\n1️⃣ *Sharma Kirana Store* ⭐ 4.5\n📍 0.8 km away | 🚴 25 min\n💰 Min order: ₹150\n\n2️⃣ *Gupta General Store* ⭐ 4.0\n📍 1.2 km away | 🚴 35 min\n💰 Min order: ₹200\n\nWhich merchant would you like to order from?",
        quickReplies: [
          { id: "qr11", title: "Sharma Kirana Store", payload: "merchant_m1" },
          { id: "qr12", title: "Gupta General Store", payload: "merchant_m2" },
          { id: "qr13", title: "🏠 Main Menu", payload: "hi" },
        ],
      },
    ];
  }

  if (
    lower.includes("food") ||
    lower.includes("biryani") ||
    lower.includes("pizza")
  ) {
    return [
      {
        to,
        messageType: "text",
        languageKey: "en",
        body: "🍛 Found *1 restaurant* near you:\n\n1️⃣ *Patel Fast Food* ⭐ 4.2\n📍 1.5 km away | 🚴 30 min\n💰 Min order: ₹100\n\n🍛 Veg Biryani — ₹180\n🥗 Paneer Butter Masala — ₹220\n🫓 Naan (4 pcs) — ₹60\n\nReply with items to add to cart!",
        quickReplies: [
          { id: "qr14", title: "🍛 Add Biryani", payload: "add_biryani" },
          { id: "qr15", title: "🥗 Add Paneer", payload: "add_paneer" },
          { id: "qr16", title: "🏠 Main Menu", payload: "hi" },
        ],
      },
    ];
  }

  if (lower === "3" || lower.includes("job")) {
    return [
      {
        to,
        messageType: "text",
        languageKey: "en",
        body: "💼 *Job Listings*\n\nPost a job or browse opportunities:\n\n📋 Recent Jobs:\n• React Developer — ₹60k-1.2L/mo (Delhi)\n• Delivery Executive — ₹15k-22k/mo (Mumbai)\n\nWhat would you like to do?",
        quickReplies: [
          { id: "qr17", title: "📋 Browse Jobs", payload: "browse_jobs" },
          { id: "qr18", title: "✏️ Post a Job", payload: "post_job" },
          { id: "qr19", title: "🏠 Main Menu", payload: "hi" },
        ],
      },
    ];
  }

  if (
    lower === "4" ||
    lower.includes("property") ||
    lower.includes("flat") ||
    lower.includes("house")
  ) {
    return [
      {
        to,
        messageType: "text",
        languageKey: "en",
        body: "🏠 *Property Listings*\n\n🏢 For Rent:\n• 2 BHK Lajpat Nagar — ₹28,000/mo\n\n🏠 For Sale:\n• 3 BHK Villa Whitefield — ₹85 Lakhs\n\nWhat are you looking for?",
        quickReplies: [
          { id: "qr20", title: "🏢 Rent", payload: "rent_property" },
          { id: "qr21", title: "🏠 Buy", payload: "buy_property" },
          { id: "qr22", title: "📝 Post Property", payload: "post_property" },
          { id: "qr23", title: "🏠 Main Menu", payload: "hi" },
        ],
      },
    ];
  }

  return [
    {
      to,
      messageType: "text",
      languageKey: "en",
      body: `I received your message: "${message}"\n\nType *hi* to see the main menu, or choose an option:`,
      quickReplies: [
        { id: "qr_default1", title: "🏠 Main Menu", payload: "hi" },
        { id: "qr_default2", title: "📦 Track Order", payload: "2" },
        { id: "qr_default3", title: "🛒 Order Now", payload: "1" },
      ],
    },
  ];
}

class BackendAPI {
  async getDashboardStats(): Promise<DashboardStats> {
    await this._delay(300);
    return {
      totalOrders: 1247,
      activeOrders: 23,
      totalMerchants: 148,
      activeMerchants: 112,
      totalDeliveryPartners: 67,
      totalCustomers: 3842,
      totalJobListings: 34,
      totalPropertyListings: 18,
      ordersToday: 89,
      revenueToday: 43250,
    };
  }

  async getMonthlyStats(_year: number, _month: number): Promise<MonthlyStat[]> {
    await this._delay(300);
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      orderCount: Math.floor(Math.random() * 60 + 20),
      revenue: Math.floor(Math.random() * 30000 + 10000),
    }));
  }

  async getTopMerchants(_limit: number): Promise<TopMerchant[]> {
    await this._delay(300);
    return [
      {
        merchantName: "Sharma Kirana Store",
        orderCount: 312,
        revenue: 187400,
        avgRating: 4.5,
      },
      {
        merchantName: "Patel Fast Food",
        orderCount: 287,
        revenue: 143600,
        avgRating: 4.2,
      },
      {
        merchantName: "Meera Organic Foods",
        orderCount: 198,
        revenue: 128900,
        avgRating: 4.8,
      },
      {
        merchantName: "Delhi Spice Kitchen",
        orderCount: 167,
        revenue: 95200,
        avgRating: 4.0,
      },
      {
        merchantName: "QuickMart Daily Needs",
        orderCount: 143,
        revenue: 87300,
        avgRating: 3.9,
      },
    ];
  }

  async simulateChat(
    phoneNumber: string,
    message: string,
    _messageType: string,
  ): Promise<BotMessage[]> {
    await this._delay(500);
    const botReplies = generateBotResponse(phoneNumber, message);
    if (!chatSessions[phoneNumber]) chatSessions[phoneNumber] = [];
    chatSessions[phoneNumber].push({
      id: `msg_${Date.now()}_user`,
      content: message,
      sender: MessageSender.user,
      messageType: "text",
      timestamp: BigInt(Date.now()),
    });
    for (const reply of botReplies) {
      chatSessions[phoneNumber].push({
        id: `msg_${Date.now()}_bot`,
        content: reply.body,
        sender: MessageSender.bot,
        messageType: reply.messageType,
        timestamp: BigInt(Date.now() + 100),
      });
    }
    return botReplies;
  }

  async getChatHistory(phoneNumber: string): Promise<ConversationMessage[]> {
    await this._delay(200);
    return chatSessions[phoneNumber] ?? [];
  }

  async resetChat(phoneNumber: string): Promise<void> {
    await this._delay(200);
    chatSessions[phoneNumber] = [];
  }

  async getOrders(status?: OrderStatus): Promise<Order[]> {
    await this._delay(300);
    if (status) return ORDERS.filter((o) => o.status === status);
    return ORDERS;
  }

  async updateOrderStatus(
    id: string,
    status: OrderStatus,
    note?: string,
  ): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    const prev = order.status;
    order.status = status;
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status,
      actor: StatusActor.admin as unknown as UserRole,
      timestamp: BigInt(Date.now()),
      ...(note ? { note } : {}),
    } as OrderStatusHistory);
    const now = BigInt(Date.now());
    if (status === OrderStatus.accepted && !order.acceptedAt) {
      order.acceptedAt = now;
      order.merchantAcceptedAt = now;
    }
    if (status === OrderStatus.assigned && !order.assignedAt)
      order.assignedAt = now;
    if (status === OrderStatus.inTransit && !order.pickedUpAt)
      order.pickedUpAt = now;
    if (status === OrderStatus.delivered && !order.deliveredAt)
      order.deliveredAt = now;
    if (status === OrderStatus.paymentCollected && !order.paymentCollectedAt)
      order.paymentCollectedAt = now;
    if (status === OrderStatus.vendorSettled && !order.vendorSettledAt)
      order.vendorSettledAt = now;
    if (status === OrderStatus.completed && !order.completedAt)
      order.completedAt = now;
    if (status === OrderStatus.cancelled && !order.cancelledAt)
      order.cancelledAt = now;
    console.log(`[API] Order ${id}: ${prev} → ${status}`);
    return order;
  }

  async assignDeliveryPartner(orderId: string, dpId: string): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    order.deliveryPartnerId = dpId;
    order.status = OrderStatus.assigned;
    order.assignedAt = BigInt(Date.now());
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status: OrderStatus.assigned,
      actor: StatusActor.admin as unknown as UserRole,
      timestamp: order.assignedAt,
    } as OrderStatusHistory);
    return order;
  }

  async dpAcceptOrder(orderId: string, dpId: string): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    order.deliveryPartnerId = dpId;
    order.status = OrderStatus.assigned;
    order.dpAcceptedAt = BigInt(Date.now());
    order.assignedAt = order.dpAcceptedAt;
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status: OrderStatus.assigned,
      actor: StatusActor.deliveryPartner as unknown as UserRole,
      timestamp: order.dpAcceptedAt,
    } as OrderStatusHistory);
    return order;
  }

  async dpConfirmPickup(orderId: string, dpId: string): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    order.status = OrderStatus.inTransit;
    order.pickedUpAt = BigInt(Date.now());
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status: OrderStatus.inTransit,
      actor: StatusActor.deliveryPartner as unknown as UserRole,
      timestamp: order.pickedUpAt,
    } as OrderStatusHistory);
    console.log(`[API] DP ${dpId} picked up order ${orderId}`);
    return order;
  }

  async dpConfirmDelivery(orderId: string, dpId: string): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    order.status = OrderStatus.delivered;
    order.deliveredAt = BigInt(Date.now());
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status: OrderStatus.delivered,
      actor: StatusActor.deliveryPartner as unknown as UserRole,
      timestamp: order.deliveredAt,
    } as OrderStatusHistory);
    console.log(`[API] DP ${dpId} delivered order ${orderId}`);
    return order;
  }

  async dpCollectPayment(
    orderId: string,
    dpId: string,
    amount: number,
  ): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    order.status = OrderStatus.paymentCollected;
    order.paymentCollectedAt = BigInt(Date.now());
    order.paymentCollectedAmount = BigInt(amount);
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status: OrderStatus.paymentCollected,
      actor: StatusActor.deliveryPartner as unknown as UserRole,
      timestamp: order.paymentCollectedAt,
      note: `₹${amount} collected`,
    } as OrderStatusHistory);
    console.log(`[API] DP ${dpId} collected ₹${amount} for order ${orderId}`);
    return order;
  }

  async dpSettleVendor(
    orderId: string,
    _dpId: string,
    amount: number,
  ): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    order.status = OrderStatus.vendorSettled;
    order.vendorSettledAt = BigInt(Date.now());
    order.vendorSettlementAmount = BigInt(amount);
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status: OrderStatus.vendorSettled,
      actor: StatusActor.deliveryPartner as unknown as UserRole,
      timestamp: order.vendorSettledAt,
      note: `₹${amount} settled`,
    } as OrderStatusHistory);
    return order;
  }

  async completeOrder(orderId: string): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    order.status = OrderStatus.completed;
    order.completedAt = BigInt(Date.now());
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status: OrderStatus.completed,
      actor: StatusActor.merchant as unknown as UserRole,
      timestamp: order.completedAt,
    } as OrderStatusHistory);
    return order;
  }

  async getOrderTracking(orderId: string): Promise<OrderStatusHistory[]> {
    await this._delay(200);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) return [];
    return order.statusHistory ?? [];
  }

  async merchantAcceptOrder(orderId: string): Promise<Order> {
    return this.updateOrderStatus(
      orderId,
      OrderStatus.accepted,
      "Merchant accepted",
    );
  }

  async merchantRejectOrder(orderId: string, reason?: string): Promise<Order> {
    await this._delay(400);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    order.status = OrderStatus.rejected;
    order.cancelledAt = BigInt(Date.now());
    if (reason) order.rejectionReason = reason;
    order.statusHistory = order.statusHistory ?? [];
    order.statusHistory.push({
      status: OrderStatus.rejected,
      actor: StatusActor.merchant as unknown as UserRole,
      timestamp: order.cancelledAt,
      ...(reason ? { note: reason } : {}),
    } as OrderStatusHistory);
    return order;
  }

  async getUsers(role?: UserRole): Promise<User[]> {
    await this._delay(300);
    if (role) return USERS.filter((u) => u.role === role);
    return USERS;
  }

  async getMerchants(): Promise<Merchant[]> {
    await this._delay(300);
    return MERCHANTS;
  }

  async getDeliveryPartners(): Promise<DeliveryPartner[]> {
    await this._delay(300);
    return DELIVERY_PARTNERS;
  }

  async getProducts(_merchantId?: string): Promise<Product[]> {
    await this._delay(300);
    return [
      {
        id: "p1",
        merchantId: "m1",
        title: "Basmati Rice 5kg",
        description: "Premium quality long grain rice",
        baseRate: 420,
        bulkRates: [],
        imageUrls: [],
        isActive: true,
        isNew: false,
        specialDiscount: 0,
        qty: 0n,
        packing: "",
        expiry: "",
      },
      {
        id: "p2",
        merchantId: "m1",
        title: "Toor Dal 1kg",
        description: "Fresh toor dal",
        baseRate: 110,
        bulkRates: [],
        imageUrls: [],
        isActive: true,
        isNew: false,
        specialDiscount: 5,
        qty: 0n,
        packing: "",
        expiry: "",
      },
      {
        id: "p3",
        merchantId: "m2",
        title: "Veg Biryani",
        description: "Aromatic basmati biryani",
        baseRate: 180,
        bulkRates: [],
        imageUrls: [],
        isActive: true,
        isNew: false,
        specialDiscount: 0,
        qty: 0n,
        packing: "",
        expiry: "",
      },
      {
        id: "p4",
        merchantId: "m2",
        title: "Raita",
        description: "Fresh curd raita",
        baseRate: 40,
        bulkRates: [],
        imageUrls: [],
        isActive: true,
        isNew: false,
        specialDiscount: 0,
        qty: 0n,
        packing: "",
        expiry: "",
      },
    ];
  }

  async getJobs(isOpen?: boolean): Promise<Job[]> {
    await this._delay(300);
    if (isOpen !== undefined) return JOBS.filter((j) => j.isOpen === isOpen);
    return JOBS;
  }

  async postJob(data: Partial<Job>): Promise<Job> {
    await this._delay(400);
    const newJob: Job = {
      id: `j${Date.now()}`,
      posterId: "admin",
      title: data.title ?? "New Job",
      description: data.description ?? "",
      category: data.category ?? "General",
      salaryMin: data.salaryMin ?? 0,
      salaryMax: data.salaryMax ?? 0,
      isOpen: true,
      leads: [],
      publishDate: BigInt(Date.now()),
      endDate: BigInt(Date.now() + 7 * 86400000),
      location: data.location ?? {
        lat: 28.6139,
        lng: 77.209,
        address: "New Delhi",
      },
      jobType: data.jobType ?? JobType.permanent,
      isAdhoc: data.isAdhoc ?? false,
    };
    JOBS.push(newJob);
    return newJob;
  }

  async getProperties(): Promise<Property[]> {
    await this._delay(300);
    return PROPERTIES;
  }

  async postProperty(data: Partial<Property>): Promise<Property> {
    await this._delay(400);
    const newProp: Property = {
      id: `pr${Date.now()}`,
      posterId: "admin",
      description: data.description ?? "",
      listingType: data.listingType ?? PropertyListingType.rent,
      expectedPrice: data.expectedPrice ?? 0,
      isActive: true,
      leads: [],
      publishDate: BigInt(Date.now()),
      endDate: BigInt(Date.now() + 14 * 86400000),
      location: data.location ?? {
        lat: 28.6139,
        lng: 77.209,
        address: "New Delhi",
      },
    };
    PROPERTIES.push(newProp);
    return newProp;
  }

  async getPlans(): Promise<SubscriptionPlan[]> {
    await this._delay(300);
    return PLANS;
  }

  async createPlan(data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> {
    await this._delay(400);
    const plan: SubscriptionPlan = {
      id: `plan${Date.now()}`,
      name: data.name ?? "New Plan",
      planType: data.planType ?? SubscriptionPlanType.monthly,
      targetRole: data.targetRole ?? UserRole.merchant,
      priceFlat: data.priceFlat ?? 0,
      pricePercentage: data.pricePercentage ?? 0,
      orderLimit: data.orderLimit ?? BigInt(100),
      inquiryLimit: data.inquiryLimit ?? BigInt(50),
      durationDays: data.durationDays ?? BigInt(30),
      features: data.features ?? [],
      isActive: true,
      applicableRoles: data.applicableRoles ?? [UserRole.merchant],
      qrCodeData: "",
      utilityLimit: BigInt(0),
      marketingLimit: BigInt(0),
      messageType: "text",
      authLimit: BigInt(0),
    };
    PLANS.push(plan);
    return plan;
  }

  async getRateCards(): Promise<DeliveryRateCard[]> {
    await this._delay(300);
    return RATE_CARDS;
  }

  async updateRateCard(
    id: string,
    data: Partial<DeliveryRateCard>,
  ): Promise<DeliveryRateCard> {
    await this._delay(400);
    const card = RATE_CARDS.find((r) => r.id === id);
    if (!card) throw new Error("Rate card not found");
    Object.assign(card, data);
    return card;
  }

  async getWhatsAppConfig(): Promise<WhatsAppConfig> {
    await this._delay(300);
    return { ...WHATSAPP_CONFIG };
  }

  async updateWhatsAppConfig(
    data: Partial<WhatsAppConfig>,
  ): Promise<WhatsAppConfig> {
    await this._delay(400);
    Object.assign(WHATSAPP_CONFIG, data);
    return { ...WHATSAPP_CONFIG };
  }

  async getOndcEnrollments(
    status?: VerificationStatus,
  ): Promise<OndcEnrollment[]> {
    await this._delay(300);
    if (status)
      return ONDC_ENROLLMENTS.filter((e) => e.enrollmentStatus === status);
    return ONDC_ENROLLMENTS;
  }

  async updateOndcStatus(
    id: string,
    status: VerificationStatus,
    notes?: string,
  ): Promise<OndcEnrollment> {
    await this._delay(400);
    const enrollment = ONDC_ENROLLMENTS.find((e) => e.id === id);
    if (!enrollment) throw new Error("Enrollment not found");
    enrollment.enrollmentStatus = status;
    enrollment.notes = notes;
    enrollment.reviewedAt = BigInt(Date.now());
    return enrollment;
  }

  async getNotifications(status?: NotificationStatus): Promise<Notification[]> {
    await this._delay(300);
    if (status) return NOTIFICATIONS.filter((n) => n.status === status);
    return NOTIFICATIONS;
  }

  // ─── Role Management ──────────────────────────────────────────────────────

  getEmployeesSeed(): Employee[] {
    return EMPLOYEES;
  }
  getRolesSeed(): EmployeeRole[] {
    return EMPLOYEE_ROLES;
  }

  async getEmployees(): Promise<Employee[]> {
    await this._delay(300);
    return EMPLOYEES;
  }

  async createEmployee(
    data: Omit<Employee, "id" | "createdAt">,
  ): Promise<Employee> {
    await this._delay(400);
    const emp: Employee = {
      ...data,
      id: `emp${Date.now()}`,
      createdAt: BigInt(Date.now()),
    };
    EMPLOYEES.push(emp);
    return emp;
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    await this._delay(400);
    const emp = EMPLOYEES.find((e) => e.id === id);
    if (!emp) throw new Error("Employee not found");
    Object.assign(emp, data);
    return emp;
  }

  async deleteEmployee(id: string): Promise<void> {
    await this._delay(300);
    const idx = EMPLOYEES.findIndex((e) => e.id === id);
    if (idx !== -1) EMPLOYEES.splice(idx, 1);
  }

  async getRoles(): Promise<EmployeeRole[]> {
    await this._delay(300);
    return EMPLOYEE_ROLES;
  }

  async createRole(data: Omit<EmployeeRole, "id">): Promise<EmployeeRole> {
    await this._delay(400);
    const role: EmployeeRole = {
      ...data,
      id: `role${Date.now()}`,
      isDefault: false,
    };
    EMPLOYEE_ROLES.push(role);
    return role;
  }

  async updateRole(
    id: string,
    data: Partial<EmployeeRole>,
  ): Promise<EmployeeRole> {
    await this._delay(400);
    const role = EMPLOYEE_ROLES.find((r) => r.id === id);
    if (!role) throw new Error("Role not found");
    Object.assign(role, data);
    return role;
  }

  async deleteRole(id: string): Promise<void> {
    await this._delay(300);
    const idx = EMPLOYEE_ROLES.findIndex((r) => r.id === id);
    if (idx !== -1) EMPLOYEE_ROLES.splice(idx, 1);
  }

  // ─── Events ───────────────────────────────────────────────────────────────

  async getAllEvents(): Promise<AppEvent[]> {
    await this._delay(300);
    return EVENTS;
  }

  async updateEventStatus(id: string, status: EventStatus): Promise<AppEvent> {
    await this._delay(400);
    const event = EVENTS.find((e) => e.id === id);
    if (!event) throw new Error("Event not found");
    event.status = status;
    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    await this._delay(300);
    const idx = EVENTS.findIndex((e) => e.id === id);
    if (idx !== -1) EVENTS.splice(idx, 1);
  }

  async exportEvents(): Promise<string> {
    await this._delay(400);
    const rows = [
      "ID,Event Name,Organizer,Phone,Location,Start Date,End Date,Type,Price,Ticket Venue,Status,Published Until",
      ...EVENTS.map((e) =>
        [
          e.id,
          e.name,
          e.organizerName,
          e.organizerPhone,
          e.location,
          e.startDate,
          e.endDate,
          e.isPaid ? "Paid" : "Free",
          e.price ?? 0,
          e.ticketVenue,
          e.status,
          e.publishedUntil,
        ].join(","),
      ),
    ];
    return rows.join("\n");
  }

  // ─── Family Members ───────────────────────────────────────────────────────

  async getAllFamilyMembers(): Promise<FamilyMember[]> {
    await this._delay(300);
    return FAMILY_MEMBERS;
  }

  async updateFamilyInviteStatus(
    id: string,
    status: InviteStatus,
  ): Promise<FamilyMember> {
    await this._delay(400);
    const member = FAMILY_MEMBERS.find((m) => m.id === id);
    if (!member) throw new Error("Family member not found");
    member.inviteStatus = status;
    return member;
  }

  async deleteFamilyMember(id: string): Promise<void> {
    await this._delay(300);
    const idx = FAMILY_MEMBERS.findIndex((m) => m.id === id);
    if (idx !== -1) FAMILY_MEMBERS.splice(idx, 1);
  }

  async exportFamilyMembers(): Promise<string> {
    await this._delay(400);
    const rows = [
      "ID,Owner Name,Owner Phone,Relation Name,Relation Phone,Relationship,Address,Invite Status,Created At",
      ...FAMILY_MEMBERS.map((m) =>
        [
          m.id,
          m.ownerName,
          m.ownerPhone,
          m.relationName,
          m.relationPhone,
          m.relationship,
          m.address,
          m.inviteStatus,
          new Date(m.createdAt).toLocaleDateString("en-IN"),
        ].join(","),
      ),
    ];
    return rows.join("\n");
  }

  // ─── Promotions ───────────────────────────────────────────────────────────

  async getAllPromotions(): Promise<Promotion[]> {
    await this._delay(300);
    return PROMOTIONS;
  }

  async approvePromotion(id: string): Promise<Promotion> {
    await this._delay(400);
    const promo = PROMOTIONS.find((p) => p.id === id);
    if (!promo) throw new Error("Promotion not found");
    promo.status = "active";
    return promo;
  }

  async rejectPromotion(id: string, reason: string): Promise<Promotion> {
    await this._delay(400);
    const promo = PROMOTIONS.find((p) => p.id === id);
    if (!promo) throw new Error("Promotion not found");
    promo.status = "rejected";
    promo.rejectionReason = reason;
    return promo;
  }

  async getPromotionAnalytics(id: string): Promise<PromotionAnalytics> {
    await this._delay(400);
    const promo = PROMOTIONS.find((p) => p.id === id);
    if (!promo) throw new Error("Promotion not found");
    const days = 7;
    const dailyReach = Array.from({ length: days }, (_, i) => {
      const date = new Date(Date.now() - (days - 1 - i) * 86400000);
      const reached = Math.floor(
        (promo.usersReached / days) * (0.8 + Math.random() * 0.4),
      );
      const viewed = Math.floor(reached * (0.5 + Math.random() * 0.4));
      return { date: date.toLocaleDateString("en-IN"), reached, viewed };
    });
    return {
      promotionId: id,
      title: promo.title,
      usersReached: promo.usersReached,
      usersViewed: promo.usersViewed,
      planUsersReach: promo.planUsersReach,
      reachRate:
        promo.planUsersReach > 0
          ? Math.round((promo.usersReached / promo.planUsersReach) * 100)
          : 0,
      viewRate:
        promo.usersReached > 0
          ? Math.round((promo.usersViewed / promo.usersReached) * 100)
          : 0,
      dailyReach,
    };
  }

  async exportPromotions(): Promise<string> {
    await this._delay(400);
    const rows = [
      "ID,Title,Advertiser,Phone,Area,City,Country,Plan Users,Status,Users Reached,Users Viewed,Created At,Expires At",
      ...PROMOTIONS.map((p) =>
        [
          p.id,
          p.title,
          p.advertiserName,
          p.advertiserPhone,
          p.areaName,
          p.city,
          p.country,
          p.planUsersReach,
          p.status,
          p.usersReached,
          p.usersViewed,
          new Date(p.createdAt).toLocaleDateString("en-IN"),
          new Date(p.expiresAt).toLocaleDateString("en-IN"),
        ].join(","),
      ),
    ];
    return rows.join("\n");
  }

  async getPromotionPlans(): Promise<PromotionPlan[]> {
    await this._delay(200);
    return PROMOTION_PLANS;
  }

  // ─── Chatbot Simulator Persistence ───────────────────────────────────────

  /** Register a new customer from the chat simulator and persist to USERS array */
  async registerUserFromChat(data: {
    phone: string;
    name: string;
    address?: string;
    passdigit: string;
  }): Promise<User> {
    await this._delay(200);
    const existing = USERS.find((u) => u.phone === data.phone);
    if (existing) {
      // Update if already exists
      Object.assign(existing, {
        name: data.name,
        address: data.address,
        passdigit: data.passdigit,
        otpVerified: true,
        role: UserRole.customer,
        isActive: true,
      });
      return existing;
    }
    const newUser: User = {
      id: `u_sim_${Date.now()}`,
      name: data.name,
      phone: data.phone,
      role: UserRole.customer,
      isActive: true,
      otpVerified: true,
      otpCode: "",
      otpExpiry: BigInt(0),
      sessionLocked: false,
      sessionLockExpiry: BigInt(0),
      passdigit: data.passdigit,
      passdigitAttempts: BigInt(0),
      conversationState: ConversationState.mainMenu,
      stateData: "{}",
      registrationDate: BigInt(Date.now()),
      address: data.address ?? "",
      countryCode: "IN",
      currency: "INR",
      countryName: "India",
      promotionalOptOut: false,
      gender: "",
    };
    USERS.push(newUser);
    return newUser;
  }

  /** Register a new merchant from the chat simulator and persist to MERCHANTS + USERS arrays */
  async registerMerchantFromChat(data: {
    phone: string;
    ownerName: string;
    outletName: string;
    category: string;
    deliveryType: string;
    merchantType: string;
    paymentOptions: string;
    deliveryRadius: number;
    panNumber?: string;
    aadhaarNumber?: string;
    gstNumber?: string;
    passdigit: string;
  }): Promise<{ user: User; merchant: Merchant }> {
    await this._delay(300);
    const uid = `u_sim_m_${Date.now()}`;
    const mid = `m_sim_${Date.now()}`;

    const existingUser = USERS.find((u) => u.phone === data.phone);
    let user: User;
    if (existingUser) {
      Object.assign(existingUser, {
        name: data.ownerName,
        role: UserRole.merchant,
        passdigit: data.passdigit,
        otpVerified: true,
        isActive: true,
      });
      user = existingUser;
    } else {
      user = {
        id: uid,
        name: data.ownerName,
        phone: data.phone,
        role: UserRole.merchant,
        isActive: true,
        otpVerified: true,
        otpCode: "",
        otpExpiry: BigInt(0),
        sessionLocked: false,
        sessionLockExpiry: BigInt(0),
        passdigit: data.passdigit,
        passdigitAttempts: BigInt(0),
        conversationState: ConversationState.merchantActions,
        stateData: "{}",
        registrationDate: BigInt(Date.now()),
        countryCode: "IN",
        currency: "INR",
        countryName: "India",
        promotionalOptOut: false,
        gender: "",
      };
      USERS.push(user);
    }

    const existingMerchant = MERCHANTS.find(
      (m) => m.location?.address === data.phone,
    );
    let merchant: Merchant;
    if (!existingMerchant) {
      merchant = {
        id: mid,
        userId: user.id,
        businessName: data.outletName,
        category: data.category,
        merchantType:
          data.merchantType === "inquiry"
            ? MerchantType.inquiry
            : MerchantType.order,
        deliveryType:
          data.deliveryType === "takeaway"
            ? DeliveryType.takeaway
            : DeliveryType.delivery,
        deliveryRadius: data.deliveryRadius || 5,
        isActive: false, // Pending approval
        isVerified: false,
        isOndcEnrolled: false,
        codAvailable:
          data.paymentOptions.includes("cash") ||
          data.paymentOptions.includes("cod"),
        rentalAllowed: false,
        bookingAllowed: false,
        avgRating: 0,
        ratingCount: BigInt(0),
        menuProductIds: [],
        branches: [],
        location: {
          lat: 28.6139,
          lng: 77.209,
          address: `Registered via simulator — ${data.phone}`,
        },
        kyc: {
          verificationStatus: VerificationStatus.pending,
          panNumber: data.panNumber,
          gstNumber: data.gstNumber,
        },
        boostedOrderCount: BigInt(0),
        orderCount: BigInt(0),
        customerCount: BigInt(0),
        phone: data.phone,
      };
      MERCHANTS.push(merchant);
    } else {
      merchant = existingMerchant;
    }

    return { user, merchant };
  }

  /** Register a new delivery partner from the chat simulator */
  async registerDeliveryPartnerFromChat(data: {
    phone: string;
    name: string;
    serviceType: string;
    vehicleType: string;
    aadhaarNo?: string;
    panNo?: string;
    rcBook?: string;
    passdigit: string;
  }): Promise<{ user: User; partner: DeliveryPartner }> {
    await this._delay(300);
    const uid = `u_sim_dp_${Date.now()}`;
    const dpId = `dp_sim_${Date.now()}`;

    const existingUser = USERS.find((u) => u.phone === data.phone);
    let user: User;
    if (existingUser) {
      Object.assign(existingUser, {
        name: data.name,
        role: UserRole.deliveryPartner,
        passdigit: data.passdigit,
        otpVerified: true,
        isActive: true,
      });
      user = existingUser;
    } else {
      user = {
        id: uid,
        name: data.name,
        phone: data.phone,
        role: UserRole.deliveryPartner,
        isActive: true,
        otpVerified: true,
        otpCode: "",
        otpExpiry: BigInt(0),
        sessionLocked: false,
        sessionLockExpiry: BigInt(0),
        passdigit: data.passdigit,
        passdigitAttempts: BigInt(0),
        conversationState: ConversationState.dpMenu,
        stateData: "{}",
        registrationDate: BigInt(Date.now()),
        countryCode: "IN",
        currency: "INR",
        countryName: "India",
        promotionalOptOut: false,
        gender: "",
      };
      USERS.push(user);
    }

    const vMap: Record<string, VehicleType> = {
      Bike: VehicleType.bike,
      Van: VehicleType.van,
      Truck: VehicleType.truck,
      Tempo: VehicleType.tempo,
      Car: VehicleType.car,
      Bus: VehicleType.bus,
      Auto: VehicleType.auto,
    };

    const partner: DeliveryPartner = {
      id: dpId,
      userId: user.id,
      name: data.name,
      phone: data.phone,
      vehicleType: vMap[data.vehicleType] ?? VehicleType.bike,
      serviceType:
        data.serviceType === "sarthi"
          ? ServiceType.sarthi
          : ServiceType.delivery,
      ratePerKm: 8,
      isOnline: false,
      isVerified: false,
      isOndcEnrolled: false,
      avgRating: 0,
      ratingCount: BigInt(0),
      otherPlatforms: [],
      kycStatus: KYCStatus.pending,
      aadhaarNo: data.aadhaarNo ?? "",
      panNo: data.panNo ?? "",
      rcBook: data.rcBook ?? "",
    };
    DELIVERY_PARTNERS.push(partner);

    return { user, partner };
  }

  /** Get chat conversation history for a phone number (simulator sessions) */
  async getSimChatHistory(
    phone: string,
  ): Promise<{ role: string; content: string; ts: number }[]> {
    await this._delay(100);
    return CHAT_HISTORIES[phone] ?? [];
  }

  /** Save a chat message to history */
  async saveChatMessage(
    phone: string,
    role: "user" | "bot",
    content: string,
  ): Promise<void> {
    await this._delay(50);
    if (!CHAT_HISTORIES[phone]) CHAT_HISTORIES[phone] = [];
    CHAT_HISTORIES[phone].push({ role, content, ts: Date.now() });
    // Keep last 100 messages
    if (CHAT_HISTORIES[phone].length > 100) {
      CHAT_HISTORIES[phone] = CHAT_HISTORIES[phone].slice(-100);
    }
  }

  /** Reset chat conversation for a phone number */
  async resetChatConversation(phone: string): Promise<void> {
    await this._delay(100);
    CHAT_HISTORIES[phone] = [];
  }

  // ─── Support Tickets ─────────────────────────────────────────────────────

  async createSupportTicket(
    fromPhone: string,
    role: string,
    category: string,
    description: string,
    orderId?: string,
  ): Promise<SupportTicketLocal> {
    await this._delay(300);
    const now = Date.now();
    const deadlineDays = category === "payment_stuck" ? 3 : 7;
    const ticket: SupportTicketLocal = {
      ticketId: `TKT-${Date.now()}`,
      fromPhone,
      fromRole: role,
      category,
      description,
      orderId,
      status: "new",
      priority: category === "payment_stuck" ? "high" : "medium",
      adminNote: "",
      remarks: "",
      createdAt: now,
      updatedAt: now,
      resolutionDeadline: now + deadlineDays * 86400000,
    };
    SUPPORT_TICKETS.push(ticket);
    return ticket;
  }

  async updateSupportTicket(
    ticketId: string,
    status: string,
    adminNote: string,
  ): Promise<SupportTicketLocal> {
    await this._delay(300);
    const ticket = SUPPORT_TICKETS.find((t) => t.ticketId === ticketId);
    if (!ticket) throw new Error("Ticket not found");
    ticket.status = status;
    ticket.adminNote = adminNote;
    ticket.updatedAt = Date.now();
    if (status === "resolved") ticket.resolvedAt = Date.now();
    return ticket;
  }

  async getSupportTickets(filter?: string): Promise<SupportTicketLocal[]> {
    await this._delay(200);
    if (!filter || filter === "all") return SUPPORT_TICKETS;
    return SUPPORT_TICKETS.filter((t) => t.status === filter);
  }

  async getMyTickets(phone: string): Promise<SupportTicketLocal[]> {
    await this._delay(200);
    return SUPPORT_TICKETS.filter((t) => t.fromPhone === phone);
  }

  async getOverdueTickets(): Promise<SupportTicketLocal[]> {
    await this._delay(200);
    const now = Date.now();
    return SUPPORT_TICKETS.filter(
      (t) =>
        t.resolutionDeadline < now &&
        t.status !== "resolved" &&
        t.status !== "closed",
    );
  }

  // ─── Block / Unblock ─────────────────────────────────────────────────────

  async isMerchantBlocked(merchantId: string): Promise<boolean> {
    await this._delay(100);
    const m = MERCHANTS.find((m) => m.id === merchantId);
    if (!m?.blockedUntil) return false;
    return m.blockedUntil > Date.now();
  }

  async isDeliveryPartnerBlocked(dpId: string): Promise<boolean> {
    await this._delay(100);
    const dp = DELIVERY_PARTNERS.find((d) => d.id === dpId);
    if (!dp?.blockedUntil) return false;
    return dp.blockedUntil > Date.now();
  }

  async manualUnblock(entityId: string, entityType: string): Promise<void> {
    await this._delay(300);
    if (entityType === "merchant") {
      const m = MERCHANTS.find((m) => m.id === entityId);
      if (m) m.blockedUntil = undefined;
    } else {
      const dp = DELIVERY_PARTNERS.find((d) => d.id === entityId);
      if (dp) dp.blockedUntil = undefined;
    }
  }

  async setDeliveryPartnerOnlineStatus(
    phone: string,
    isOnline: boolean,
  ): Promise<void> {
    await this._delay(150);
    // Match by phone via user lookup
    const user = USERS.find((u) => u.phone === phone);
    if (user) {
      const dp = DELIVERY_PARTNERS.find((d) => d.userId === user.id);
      if (dp) {
        dp.isOnline = isOnline;
        return;
      }
    }
    // Fallback: match by partner id
    const dp = DELIVERY_PARTNERS.find((d) => d.id === phone);
    if (dp) dp.isOnline = isOnline;
  }

  async setFreeRideSharerOnlineStatus(
    phone: string,
    isOnline: boolean,
  ): Promise<void> {
    await this._delay(150);
    // Same as delivery partner – free ride sharers are delivery partners of type sarthi
    const user = USERS.find((u) => u.phone === phone);
    if (user) {
      const dp = DELIVERY_PARTNERS.find((d) => d.userId === user.id);
      if (dp) {
        dp.isOnline = isOnline;
        return;
      }
    }
    const dp = DELIVERY_PARTNERS.find((d) => d.id === phone);
    if (dp) dp.isOnline = isOnline;
  }

  // ─── Country / Currency ──────────────────────────────────────────────────

  async getCountryInfoForPhone(
    phone: string,
  ): Promise<{ countryCode: string; currency: string; countryName: string }> {
    await this._delay(100);
    return detectCountryInfo(phone);
  }

  // ─── Merchant Contacts ───────────────────────────────────────────────────

  async importMerchantContacts(
    merchantPhone: string,
    contacts: string[],
  ): Promise<{
    imported: number;
    duplicates: number;
    skippedMerchants: number;
    skippedDPs: number;
  }> {
    await this._delay(500);
    let imported = 0;
    let duplicates = 0;
    let skippedMerchants = 0;
    let skippedDPs = 0;

    for (const phone of contacts) {
      const cleanPhone = phone.trim();
      if (!cleanPhone) continue;
      // Check if already a merchant
      if (USERS.find((u) => u.phone === cleanPhone && u.role === "merchant")) {
        skippedMerchants++;
        continue;
      }
      // Check if already a delivery partner
      if (
        USERS.find(
          (u) => u.phone === cleanPhone && u.role === "deliveryPartner",
        )
      ) {
        skippedDPs++;
        continue;
      }
      // Check if already exists as customer
      if (USERS.find((u) => u.phone === cleanPhone)) {
        duplicates++;
        continue;
      }
      // Import as customer
      USERS.push({
        id: `u_import_${Date.now()}_${imported}`,
        name: cleanPhone,
        phone: cleanPhone,
        role: "customer" as unknown as (typeof USERS)[0]["role"],
        isActive: true,
        otpVerified: false,
        otpCode: "",
        otpExpiry: BigInt(0),
        sessionLocked: false,
        sessionLockExpiry: BigInt(0),
        passdigit: "",
        passdigitAttempts: BigInt(0),
        conversationState:
          "welcome" as unknown as (typeof USERS)[0]["conversationState"],
        stateData: "{}",
        registrationDate: BigInt(Date.now()),
        importedByMerchant: merchantPhone,
      } as (typeof USERS)[0]);
      imported++;

      // Track import batch
      if (!MERCHANT_IMPORT_STATS[merchantPhone]) {
        MERCHANT_IMPORT_STATS[merchantPhone] = {
          totalImported: 0,
          totalBatches: 0,
          lastImportDate: Date.now(),
        };
      }
    }

    if (imported > 0 && MERCHANT_IMPORT_STATS[merchantPhone]) {
      MERCHANT_IMPORT_STATS[merchantPhone].totalImported += imported;
      MERCHANT_IMPORT_STATS[merchantPhone].totalBatches += 1;
      MERCHANT_IMPORT_STATS[merchantPhone].lastImportDate = Date.now();
    } else if (imported > 0) {
      MERCHANT_IMPORT_STATS[merchantPhone] = {
        totalImported: imported,
        totalBatches: 1,
        lastImportDate: Date.now(),
      };
    }

    return { imported, duplicates, skippedMerchants, skippedDPs };
  }

  async getMerchantImportStats(merchantPhone: string): Promise<{
    totalImported: number;
    totalBatches: number;
    lastImportDate: number;
  }> {
    await this._delay(200);
    return (
      MERCHANT_IMPORT_STATS[merchantPhone] ?? {
        totalImported: 0,
        totalBatches: 0,
        lastImportDate: 0,
      }
    );
  }

  async getSubscriptionDiscountForMerchant(
    merchantPhone: string,
  ): Promise<number> {
    await this._delay(200);
    // Count imported customers for this merchant
    const importedCount = USERS.filter(
      (u) =>
        (u as (typeof USERS)[0] & { importedByMerchant?: string })
          .importedByMerchant === merchantPhone,
    ).length;
    // 5% per 150 customers, max 25%
    return Math.min(25, Math.floor(importedCount / 150) * 5);
  }

  async sendMerchantPromotion(
    merchantPhone: string,
    messageText: string,
  ): Promise<{ sent: number; skipped: number }> {
    await this._delay(500);
    const customers = USERS.filter(
      (u) =>
        (u as (typeof USERS)[0] & { importedByMerchant?: string })
          .importedByMerchant === merchantPhone &&
        !(u as (typeof USERS)[0] & { promotionalOptOut?: boolean })
          .promotionalOptOut,
    );
    const skipped = USERS.filter(
      (u) =>
        (u as (typeof USERS)[0] & { importedByMerchant?: string })
          .importedByMerchant === merchantPhone &&
        (u as (typeof USERS)[0] & { promotionalOptOut?: boolean })
          .promotionalOptOut,
    ).length;
    console.log(
      `[API] Sending promo "${messageText}" to ${customers.length} customers of ${merchantPhone}`,
    );
    return { sent: customers.length, skipped };
  }

  async setPromotionalOptOut(
    customerPhone: string,
    optOut: boolean,
  ): Promise<void> {
    await this._delay(200);
    const user = USERS.find((u) => u.phone === customerPhone);
    if (user) {
      (
        user as (typeof USERS)[0] & { promotionalOptOut?: boolean }
      ).promotionalOptOut = optOut;
    }
  }

  // ─── Shuttle Routes ───────────────────────────────────────────────────────

  async getShuttleRoutes(): Promise<LocalShuttleRoute[]> {
    await this._delay(200);
    return SHUTTLE_ROUTES_LOCAL;
  }

  async createShuttleRoute(data: {
    routeName: string;
    serviceName: string;
    stops: Array<{ stopName: string; ticketFee: number; arrivalTime: string }>;
    pricePerTicket: number;
    postedBy: string;
  }): Promise<LocalShuttleRoute> {
    await this._delay(300);
    const route: LocalShuttleRoute = {
      id: `SR-${Date.now()}`,
      routeName: data.routeName,
      serviceName: data.serviceName,
      stops: data.stops,
      pricePerTicket: data.pricePerTicket,
      postedBy: data.postedBy,
      isActive: true,
      createdAt: Date.now(),
    };
    SHUTTLE_ROUTES_LOCAL.push(route);
    return route;
  }

  async deactivateShuttleRoute(
    routeId: string,
    deactivate: boolean,
  ): Promise<void> {
    await this._delay(200);
    const route = SHUTTLE_ROUTES_LOCAL.find((r) => r.id === routeId);
    if (route) route.isActive = !deactivate;
  }

  private _delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Chat history store (in-memory, survives page within session)
const CHAT_HISTORIES: Record<
  string,
  { role: string; content: string; ts: number }[]
> = {};

// ─── Local Shuttle Route Type ─────────────────────────────────────────────────
export interface LocalShuttleRoute {
  id: string;
  routeName: string;
  serviceName: string;
  stops: Array<{ stopName: string; ticketFee: number; arrivalTime: string }>;
  pricePerTicket: number;
  postedBy: string;
  isActive: boolean;
  createdAt: number;
}

const SHUTTLE_ROUTES_LOCAL: LocalShuttleRoute[] = [
  {
    id: "SR-001",
    routeName: "Connaught Place → Gurgaon",
    serviceName: "City Shuttle Express",
    stops: [
      { stopName: "Connaught Place", ticketFee: 0, arrivalTime: "08:00 AM" },
      { stopName: "Dhaula Kuan", ticketFee: 20, arrivalTime: "08:25 AM" },
      { stopName: "IFFCO Chowk", ticketFee: 35, arrivalTime: "08:55 AM" },
      { stopName: "Cyber City", ticketFee: 50, arrivalTime: "09:20 AM" },
    ],
    pricePerTicket: 50,
    postedBy: "+919876543210",
    isActive: true,
    createdAt: Date.now() - 7 * 86400000,
  },
  {
    id: "SR-002",
    routeName: "Noida → Delhi Airport",
    serviceName: "Airport Shuttle Line",
    stops: [
      { stopName: "Sector 18 Noida", ticketFee: 0, arrivalTime: "06:00 AM" },
      { stopName: "Akshardham", ticketFee: 30, arrivalTime: "06:40 AM" },
      { stopName: "INA Market", ticketFee: 60, arrivalTime: "07:15 AM" },
      { stopName: "T3 Airport", ticketFee: 100, arrivalTime: "07:50 AM" },
    ],
    pricePerTicket: 100,
    postedBy: "+919765432109",
    isActive: true,
    createdAt: Date.now() - 3 * 86400000,
  },
  {
    id: "SR-003",
    routeName: "Rohini → Karol Bagh",
    serviceName: "Metro Feeder Shuttle",
    stops: [
      { stopName: "Rohini West", ticketFee: 0, arrivalTime: "09:00 AM" },
      {
        stopName: "Netaji Subhash Place",
        ticketFee: 15,
        arrivalTime: "09:20 AM",
      },
      { stopName: "Karol Bagh", ticketFee: 30, arrivalTime: "09:45 AM" },
    ],
    pricePerTicket: 30,
    postedBy: "+919812345678",
    isActive: false,
    createdAt: Date.now() - 14 * 86400000,
  },
];

// ─── Support Ticket Local Type ────────────────────────────────────────────────
export interface SupportTicketLocal {
  ticketId: string;
  fromPhone: string;
  fromRole: string;
  category: string;
  description: string;
  orderId?: string;
  status: string;
  priority: string;
  adminNote: string;
  remarks: string;
  createdAt: number;
  updatedAt: number;
  resolutionDeadline: number;
  resolvedAt?: number;
}

// ─── Support Ticket Seed Data ─────────────────────────────────────────────────
const SUPPORT_TICKETS: SupportTicketLocal[] = [
  {
    ticketId: "TKT-001",
    fromPhone: "+919876543210",
    fromRole: "customer",
    category: "payment_stuck",
    description:
      "I paid ₹1,200 via UPI for order ORD-001 but the order still shows pending. Transaction ID: UPI12345678. Please resolve urgently.",
    orderId: "ORD-001",
    status: "new",
    priority: "high",
    adminNote: "",
    remarks: "",
    createdAt: Date.now() - 2 * 3600000,
    updatedAt: Date.now() - 2 * 3600000,
    resolutionDeadline: Date.now() + 1 * 86400000,
  },
  {
    ticketId: "TKT-002",
    fromPhone: "+919765432109",
    fromRole: "customer",
    category: "behaviour_complaint",
    description:
      "Delivery partner Ravi Thakur was rude and unprofessional during the delivery. He spoke harshly and demanded extra cash.",
    status: "assigned",
    priority: "medium",
    adminNote: "Investigating. Spoke to DP. Will take action.",
    remarks: "",
    createdAt: Date.now() - 5 * 3600000,
    updatedAt: Date.now() - 1 * 3600000,
    resolutionDeadline: Date.now() + 2 * 86400000,
  },
  {
    ticketId: "TKT-003",
    fromPhone: "+919812345678",
    fromRole: "merchant",
    category: "payment_stuck",
    description:
      "My settlement for the week of Nov 10–16 has not been received. Total due: ₹8,450. Account: SBI ending 4321.",
    orderId: "ORD-003",
    status: "in_progress",
    priority: "high",
    adminNote: "Finance team notified. ETA: 48 hours.",
    remarks: "",
    createdAt: Date.now() - 3 * 86400000,
    updatedAt: Date.now() - 6 * 3600000,
    resolutionDeadline: Date.now() + 4 * 3600000,
  },
  {
    ticketId: "TKT-004",
    fromPhone: "+919988776655",
    fromRole: "deliveryPartner",
    category: "other",
    description:
      "App showing wrong delivery radius. I set 10km but it's only showing orders within 2km. Please fix.",
    status: "resolved",
    priority: "low",
    adminNote: "Bug fixed in latest update. Asking partner to reinstall.",
    remarks: "Resolved — app update applied",
    createdAt: Date.now() - 7 * 86400000,
    updatedAt: Date.now() - 1 * 86400000,
    resolutionDeadline: Date.now() + 1 * 86400000,
    resolvedAt: Date.now() - 1 * 86400000,
  },
  {
    ticketId: "TKT-005",
    fromPhone: "+919654321098",
    fromRole: "customer",
    category: "behaviour_complaint",
    description:
      "The Sarthi driver cancelled my confirmed ride at the last minute and was very rude over call when I asked for a reason.",
    status: "new",
    priority: "high",
    adminNote: "",
    remarks: "",
    createdAt: Date.now() - 30 * 60000,
    updatedAt: Date.now() - 30 * 60000,
    resolutionDeadline: Date.now() - 2 * 3600000, // OVERDUE
  },
];

// ─── Merchant Import Stats ────────────────────────────────────────────────────
const MERCHANT_IMPORT_STATS: Record<
  string,
  { totalImported: number; totalBatches: number; lastImportDate: number }
> = {
  "+919876543211": {
    totalImported: 312,
    totalBatches: 4,
    lastImportDate: Date.now() - 3 * 86400000,
  },
};

// ─── Country Detection Helper ─────────────────────────────────────────────────
function detectCountryInfo(phone: string): {
  countryCode: string;
  currency: string;
  countryName: string;
} {
  if (phone.startsWith("+91") || phone.startsWith("91"))
    return { countryCode: "IN", currency: "INR", countryName: "India" };
  if (phone.startsWith("+1"))
    return { countryCode: "US", currency: "USD", countryName: "United States" };
  if (phone.startsWith("+44"))
    return {
      countryCode: "GB",
      currency: "GBP",
      countryName: "United Kingdom",
    };
  if (phone.startsWith("+971"))
    return { countryCode: "AE", currency: "AED", countryName: "UAE" };
  if (phone.startsWith("+65"))
    return { countryCode: "SG", currency: "SGD", countryName: "Singapore" };
  if (phone.startsWith("+60"))
    return { countryCode: "MY", currency: "MYR", countryName: "Malaysia" };
  if (phone.startsWith("+61"))
    return { countryCode: "AU", currency: "AUD", countryName: "Australia" };
  if (phone.startsWith("+49"))
    return { countryCode: "DE", currency: "EUR", countryName: "Germany" };
  if (phone.startsWith("+33"))
    return { countryCode: "FR", currency: "EUR", countryName: "France" };
  return { countryCode: "IN", currency: "INR", countryName: "India" };
}

export const api = new BackendAPI();

// ─── Flow Agent Types (re-exported from types/flowAgent.ts) ───────────────────
export type {
  AgentDeployment,
  FlowAgentRun,
  FlowAgentSchedule,
  FlowChannelSync,
  FlowDiagnosticResult,
  FlowFix,
  FlowFixStatus,
  FlowHealthSummary,
  FlowIssue,
  ReTestResult,
  StepDiagnostic,
} from "./types/flowAgent";
