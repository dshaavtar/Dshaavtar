// Re-export backend types for convenience
export type { ElectionResult } from "./backend.d";
export type {
  User,
  Merchant,
  DeliveryPartner,
  Product,
  Order,
  OrderItem,
  OrderStatusHistory,
  Job,
  Property,
  SubscriptionPlan,
  UserSubscription,
  Lead,
  ContactRequest,
  ConversationMessage,
  BotMessage,
  QuickReply,
  DeliveryRateCard,
  OndcEnrollment,
  WhatsAppConfig,
  Notification,
  KYCDocuments,
  Branch,
  Location,
  BulkRate,
  ShuttleRoute,
  ShuttleBooking,
  TransportBooking,
  SarthiOTPVerification,
  // New POS & analytics types from backend
  MerchantBranch,
  OrderPaymentQR,
  MerchantEarnings,
  ProductRevenue,
  AdminUPIProfile,
  DeliveryPaymentQR,
  DPEarnings,
  PetrolExpense,
  DPEarningsWithExpenses,
  CustomerBudget,
  BudgetCheckResult,
  SpendAnalysis,
  SubscriptionAccessResult,
  SubscriptionQR,
  EnhancedAnalytics,
  MerchantAnalytics,
  DPAnalytics,
  ModuleRoleStatus,
  EnhancedShuttleStop,
  OrderFunnel,
  MerchantPerformance,
  DPEfficiency,
  TopCustomer,
  MarketplaceItem,
  MarketplaceItemInput,
  // New professional services / dashboard types from backend
  HealthcareProvider,
  HealthcareAppointment,
  TourOperator,
  TourBooking,
  ProfessionalService,
  ServiceBooking,
  MerchantDashboardData,
  DeliveryDashboardData,
  CustomerDashboardData,
  MatchScore,
} from "./backend.d";

export {
  OrderStatus,
  PaymentMode,
  PaymentStatus,
  VehicleType,
  PropertyListingType,
  SubscriptionPlanType,
  ConversationState,
  MessageSender,
  NotificationStatus,
  VerificationStatus,
  DeliveryType,
  MerchantType,
  UserRole,
  ServiceType,
  ContactRequestStatus,
  ShuttleBookingStatus,
  TransportStatus,
  Variant_active_inactive,
  BudgetWarningLevel,
  SpendTrend,
  JobType,
  TourBookingStatus,
} from "./backend.d";

// KYCStatus is not re-exported from backend.d but is defined in the DID declarations
export type KYCStatus =
  | { pending: null }
  | { approved: null }
  | { rejected: null };
// Namespace object for use as value (e.g. KYCStatus.approved)
export const KYCStatus = {
  pending: { pending: null } as KYCStatus,
  approved: { approved: null } as KYCStatus,
  rejected: { rejected: null } as KYCStatus,
} as const;

// ─── Professional Services Status Types ─────────────────────────────────────
// AppointmentStatus and ServiceBookingStatus are not exported from backend.d but
// used in HealthcareAppointment and ServiceBooking — define locally as string unions.

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";
export type ServiceBookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

// StatusActor defined locally to avoid Rollup enum-from-.d.ts issue
// Maps to the same values as UserRole for status history tracking
export enum StatusActor {
  admin = "admin",
  customer = "customer",
  deliveryPartner = "deliveryPartner",
  merchant = "merchant",
}

// Dashboard stats
export interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  totalMerchants: number;
  activeMerchants: number;
  totalDeliveryPartners: number;
  totalCustomers: number;
  totalJobListings: number;
  totalPropertyListings: number;
  ordersToday: number;
  revenueToday: number;
  // New modules
  totalEvents?: number;
  publishedEvents?: number;
  totalFamilyMembers?: number;
  connectedFamilyMembers?: number;
  totalPromotions?: number;
  activePromotions?: number;
}

export interface MonthlyStat {
  day: number;
  orderCount: number;
  revenue: number;
}

export interface TopMerchant {
  merchantName: string;
  orderCount: number;
  revenue: number;
  avgRating: number;
}

// ─── Role Management ────────────────────────────────────────────────────────

export const MENU_SECTIONS = [
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
  "Import / Export",
  "API Panel",
] as const;

export type MenuSection = (typeof MENU_SECTIONS)[number];

export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  roleName: string;
  permissions: string[];
  isActive: boolean;
  createdAt: bigint;
  lastLogin?: bigint;
}

export interface EmployeeRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
}

// Auth context
export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  principal: string | null;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setIdentityAuth: (principal: string) => void;
}

// ─── Events ─────────────────────────────────────────────────────────────────

export type EventStatus = "published" | "pending" | "expired" | "cancelled";

export interface AppEvent {
  id: string;
  organizerPhone: string;
  organizerName: string;
  name: string;
  description: string;
  isPaid: boolean;
  price?: number;
  location: string;
  startDate: string;
  endDate: string;
  ticketVenue: string;
  status: EventStatus;
  publishedUntil: string;
  createdAt: number;
}

// ─── Family Members ──────────────────────────────────────────────────────────

export type InviteStatus = "pending" | "connected" | "cancelled";
export type Relationship =
  | "father"
  | "mother"
  | "son"
  | "daughter"
  | "husband"
  | "wife"
  | "friend"
  | "brother"
  | "sister"
  | "relative";

export interface FamilyMember {
  id: string;
  ownerName: string;
  ownerSurname: string;
  ownerPhone: string;
  relationName: string;
  relationPhone: string;
  relationship: Relationship;
  address: string;
  inviteStatus: InviteStatus;
  createdAt: number;
  gender?: string;
}

export interface FamilyGroup {
  groupName: string; // surname-based
  groupType: "family" | "friends";
  ownerPhone: string;
  memberPhones: string[];
  createdAt: number;
}

// ─── Promotions ──────────────────────────────────────────────────────────────

export type PromotionStatus =
  | "pendingApproval"
  | "active"
  | "rejected"
  | "expired"
  | "paused";

export interface Promotion {
  id: string;
  advertiserPhone: string;
  advertiserName: string;
  title: string;
  reelLink: string;
  imageLink: string;
  areaName: string;
  city: string;
  country: string;
  planId: string;
  planUsersReach: number;
  status: PromotionStatus;
  rejectionReason?: string;
  usersReached: number;
  usersViewed: number;
  createdAt: number;
  expiresAt: number;
}

export interface PromotionPlan {
  id: string;
  usersReach: number;
  price: number;
  label: string;
}

export interface PromotionAnalytics {
  promotionId: string;
  title: string;
  usersReached: number;
  usersViewed: number;
  planUsersReach: number;
  reachRate: number;
  viewRate: number;
  dailyReach: { date: string; reached: number; viewed: number }[];
}

// ─── Shuttle Routes ──────────────────────────────────────────────────────────

/** Frontend-normalised shuttle route (bigints converted to numbers) */
export interface AppShuttleRoute {
  id: string;
  routeName: string;
  /** Logical service name, e.g. "City Express" */
  serviceName: string;
  source: string;
  destination: string;
  stops: string[];
  price: number;
  vehicleType: string;
  /** Vehicle registration number, e.g. "MH12AB1234" */
  vehicleNumber?: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
  driverId: string;
  status: "active" | "inactive";
  createdAt?: number;
}

// ─── Free-Ride Sarthi ────────────────────────────────────────────────────────

/** A delivery partner registered for the free-ride / passenger-sharing service */
export interface FreeRideSarthi {
  id: string;
  name: string;
  phone: string;
  vehiclePlate: string;
  vehicleType: string;
  serviceArea: string;
  status: "active" | "inactive";
  registeredAt: number;
}
