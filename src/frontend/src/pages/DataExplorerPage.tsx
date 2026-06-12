import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Car,
  CheckCircle,
  ChefHat,
  ClipboardCopy,
  Clock,
  Database,
  DoorOpen,
  Edit2,
  ExternalLink,
  Flag,
  Flame,
  Gift,
  Globe,
  Heart,
  Home,
  Library,
  LifeBuoy,
  MapPin,
  Megaphone,
  MessageSquare,
  Package,
  Plus,
  RefreshCw,
  Route,
  Search,
  Send,
  ShoppingCart,
  Store,
  Trash2,
  TrendingUp,
  Truck,
  Users,
  Users2,
  UtensilsCrossed,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddCity,
  useBackendActor,
  useCreateAdhocJobAdmin,
  useCreateMarketplaceItem,
  useCreateModerationItemAdmin,
  useCreateRecipe,
  useCreateRestockOrderAdmin,
  useDeleteAdhocJobAdmin,
  useDeleteCity,
  useDeleteMarketplaceItemAdmin,
  useDeleteModerationItemAdmin,
  useDeleteRecipe,
  useDeleteRestockOrderAdmin,
  useDeleteSupportTicketAdmin,
  useSaveCityControl,
  useUpdateAdhocJobStatusAdmin,
  useUpdateCity,
  useUpdateMarketplaceItemAdmin,
  useUpdateModerationItemStatusAdmin,
  useUpdateRecipeAdmin,
  useUpdateRestockOrderAdmin,
  useUpdateRestockStatus,
  useUpdateSupportTicketStatus,
} from "../hooks/useBackend";
import { useLanguageLearning } from "../hooks/useLanguageLearning";
import { safeCount } from "../utils";

// ─── Source badge helper ────────────────────────────────────────────────────

const SOURCE_STYLE: Record<string, { label: string; cls: string }> = {
  whatsapp: {
    label: "WhatsApp",
    cls: "bg-green-100 text-green-700 border-green-200",
  },
  telegram: {
    label: "Telegram",
    cls: "bg-blue-100 text-blue-700 border-blue-200",
  },
  sms: { label: "SMS", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  simulator: {
    label: "Simulator",
    cls: "bg-violet-100 text-violet-700 border-violet-200",
  },
  dashboard: {
    label: "Dashboard",
    cls: "bg-muted text-muted-foreground border-border",
  },
  "admin sample": {
    label: "Admin Sample",
    cls: "bg-orange-100 text-orange-700 border-orange-200",
  },
};

const ALL_SOURCES = [
  "All Sources",
  "WhatsApp",
  "Telegram",
  "SMS",
  "Simulator",
  "Dashboard",
];

function SourceBadge({ source }: { source: string }) {
  const key = (source ?? "").toLowerCase();
  const cfg = SOURCE_STYLE[key];
  if (!cfg)
    return (
      <span className="text-muted-foreground text-[10px]">{source || "—"}</span>
    );
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${cfg.cls}`}
    >
      {cfg.label}
    </span>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type EntityKey =
  | "users"
  | "merchants"
  | "products"
  | "orders"
  | "promotions"
  | "events"
  | "familyGroups"
  | "jobs"
  | "properties"
  | "deliveryPartners"
  | "sarthiPartners"
  | "subscriptions"
  | "rateCards"
  | "shuttleRoutes"
  | "whatsappConfig"
  | "telegramConfig"
  | "ondcEnrollments"
  | "ondcSetupConfig"
  | "cities"
  | "cityControls"
  | "restockOrders"
  | "marketplaceItems"
  | "moderationQueue"
  | "supportTickets"
  | "recipes"
  | "adhocJobs"
  | "healthcareProviders"
  | "healthcareAppointments"
  | "tourOperators"
  | "tourBookings"
  | "professionalServices"
  | "serviceBookings"
  | "donations"
  | "donationRequests"
  | "marketSearches"
  | "electionResults"
  | "lendingItems"
  | "communityMembers"
  | "communityParkingBookings"
  | "communityRoomBookings"
  | "communityFoodOrders"
  | "communityWorkOrders"
  | "busBookings"
  | "trainBookings"
  | "flightBookings"
  | "mobileRecharges"
  | "billPayments"
  | "fastagTransactions"
  | "lpgBookings"
  | "municipalityPayments"
  | "insurancePremiums"
  | "paysprintAPILogs"
  | "language_courses"
  | "language_lessons"
  | "language_enrollments"
  | "language_approvals"
  | "word_definitions"
  | "daily_lessons";

interface EntityDef {
  key: EntityKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  columns: string[];
  fetchFn: (actor: Record<string, unknown>) => Promise<unknown[]>;
  mapRow: (row: unknown) => Record<string, unknown>;
  /** Keys that identify the raw record for mutations */
  idField?: string;
  /** Which write ops are supported */
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canStatusUpdate?: boolean;
  statusOptions?: string[];
}

// ─── Short ID helper ──────────────────────────────────────────────────────────

function sid(v: unknown, len = 12): string {
  const s = String(v ?? "");
  return s.length > len ? `${s.slice(0, len)}…` : s;
}

// ─── Entity definitions ───────────────────────────────────────────────────────

const ENTITIES: EntityDef[] = [
  {
    key: "users",
    label: "Users",
    icon: Users,
    columns: ["id", "phone", "name", "role", "createdAt"],
    fetchFn: (a) => (a.listUsers as (r: null) => Promise<unknown[]>)(null),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        phone: row.phone,
        name: row.name,
        role: String(row.role ?? ""),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
        source: String(row.source ?? row.registeredVia ?? ""),
      };
    },
  },
  {
    key: "merchants",
    label: "Merchants",
    icon: Building2,
    columns: ["id", "phone", "businessName", "category", "status", "verified"],
    fetchFn: (a) =>
      (a.listMerchants as (a: null, b: null) => Promise<unknown[]>)(null, null),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        phone: row.ownerPhone,
        businessName: row.businessName,
        category: row.category,
        status: row.isActive ? "Active" : "Inactive",
        verified: row.isVerified ? "✅ Yes" : "⏳ Pending",
      };
    },
  },
  {
    key: "products",
    label: "Products",
    icon: Package,
    columns: ["id", "title", "merchantId", "baseRate", "discount", "condition"],
    fetchFn: async (a) => {
      const merchants = await (
        a.listMerchants as (x: null, y: null) => Promise<{ id: string }[]>
      )(null, null);
      const all: unknown[] = [];
      for (const m of merchants.slice(0, 50)) {
        try {
          const prods = await (
            a.getProductsByMerchant as (id: string) => Promise<unknown[]>
          )(m.id);
          all.push(...prods);
        } catch {
          // skip merchant on error
        }
      }
      return all;
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        title: row.title,
        merchantId: sid(row.merchantId, 10),
        baseRate: `₹${safeCount(row.baseRate)}`,
        discount: `${safeCount(row.specialDiscount)}%`,
        condition: row.isNew ? "New" : "Refurb",
      };
    },
  },
  {
    key: "orders",
    label: "Orders",
    icon: ShoppingCart,
    columns: ["id", "customerId", "merchantId", "status", "total", "createdAt"],
    fetchFn: (a) =>
      (a.getAllOrders as (x: null, y: null, z: null) => Promise<unknown[]>)(
        null,
        null,
        null,
      ),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        customerId: sid(row.customerId, 10),
        merchantId: sid(row.merchantId, 10),
        status: String(row.status ?? ""),
        total: `₹${safeCount(row.totalAmount ?? row.total)}`,
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
        source: String(row.source ?? row.channel ?? row.placedVia ?? ""),
      };
    },
  },
  {
    key: "promotions",
    label: "Promotions",
    icon: Megaphone,
    columns: ["id", "title", "advertiser", "city", "reach", "status"],
    fetchFn: (a) => (a.getAllPromotions as () => Promise<unknown[]>)(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        title: row.title,
        advertiser: row.advertiserPhone,
        city: row.locationCity,
        reach: `${safeCount(row.reachedCount)}/${safeCount(row.targetUserCount)}`,
        status: String(row.status ?? ""),
      };
    },
  },
  {
    key: "events",
    label: "Events",
    icon: Calendar,
    columns: ["id", "name", "organizer", "location", "paid", "status"],
    fetchFn: (a) => (a.getAllEvents as () => Promise<unknown[]>)(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        name: row.eventName,
        organizer: row.organizerPhone,
        location: row.locationAddress,
        paid: row.isPaid ? `₹${row.price}` : "Free",
        status: String(row.status ?? ""),
      };
    },
  },
  {
    key: "familyGroups",
    label: "Family Groups",
    icon: Users2,
    columns: ["id", "owner", "relation", "phone", "relationship", "status"],
    fetchFn: (a) => (a.getAllFamilyMembers as () => Promise<unknown[]>)(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id, 10),
        owner: `${row.ownerName} ${row.ownerSurname ?? ""}`,
        relation: row.relationName,
        phone: row.relationPhone,
        relationship: String(row.relationship ?? ""),
        status: String(row.inviteStatus ?? ""),
      };
    },
  },
  {
    key: "jobs",
    label: "Jobs",
    icon: Briefcase,
    columns: ["id", "title", "category", "salary", "location", "open"],
    fetchFn: (a) =>
      (a.getAllJobs as (isOpen: null) => Promise<unknown[]>)(null),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        title: row.title,
        category: row.category,
        salary: `₹${row.salaryMin ?? 0}–₹${row.salaryMax ?? 0}`,
        location: (row.location as Record<string, unknown>)?.address ?? "—",
        open: row.isOpen ? "Open" : "Closed",
      };
    },
  },
  {
    key: "properties",
    label: "Properties",
    icon: Home,
    columns: ["id", "type", "price", "location", "posterId", "active"],
    fetchFn: (a) =>
      (a.getAllProperties as (x: null, y: null) => Promise<unknown[]>)(
        null,
        null,
      ),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        type: String(row.listingType ?? ""),
        price: `₹${row.expectedPrice ?? 0}`,
        location: (row.location as Record<string, unknown>)?.address ?? "—",
        posterId: sid(row.posterId, 10),
        active: row.isActive ? "Active" : "Inactive",
      };
    },
  },
  {
    key: "deliveryPartners",
    label: "Delivery Partners",
    icon: Truck,
    columns: [
      "id",
      "phone",
      "name",
      "vehicle",
      "service",
      "verified",
      "online",
    ],
    fetchFn: (a) => (a.listAllDeliveryPartners as () => Promise<unknown[]>)(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        phone: row.phone ?? row.ownerPhone ?? row.contactPhone ?? "—",
        name: row.name,
        vehicle: String(row.vehicleType ?? ""),
        service: String(row.serviceType ?? ""),
        verified: row.isVerified ? "✅" : "⏳",
        online: row.isOnline ? "🟢 Online" : "⚫ Offline",
      };
    },
  },
  {
    key: "sarthiPartners",
    label: "Sarthi Partners",
    icon: Zap,
    columns: ["id", "phone", "name", "vehicle", "verified", "online"],
    fetchFn: async (a) => {
      const all = await (
        a.listAllDeliveryPartners as () => Promise<{ serviceType: string }[]>
      )();
      return all.filter((p) => p.serviceType === "sarthi");
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        phone: row.phone ?? row.ownerPhone ?? row.contactPhone ?? "—",
        name: row.name,
        vehicle: String(row.vehicleType ?? ""),
        verified: row.isVerified ? "✅ Yes" : "⏳ Pending",
        online: row.isOnline ? "🟢 Online" : "⚫ Offline",
      };
    },
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    icon: Zap,
    columns: ["id", "name", "targetRole", "price", "duration", "active"],
    fetchFn: (a) => (a.getAllPlans as (x: null) => Promise<unknown[]>)(null),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        name: row.name,
        targetRole: String(row.targetRole ?? ""),
        price: `₹${row.priceFlat ?? 0}`,
        duration: `${row.durationDays ?? 0}d`,
        active: row.isActive !== false ? "Active" : "Inactive",
      };
    },
  },
  {
    key: "rateCards",
    label: "Rate Cards",
    icon: Truck,
    columns: ["id", "vehicle", "service", "baseRate", "perKm", "active"],
    fetchFn: (a) => (a.getAllRateCards as () => Promise<unknown[]>)(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        vehicle: String(row.vehicleType ?? ""),
        service: String(row.serviceType ?? ""),
        baseRate: `₹${row.baseRate ?? 0}`,
        perKm: `₹${row.perKmRate ?? 0}/km`,
        active: row.isActive ? "Active" : "Inactive",
      };
    },
  },
  {
    key: "shuttleRoutes",
    label: "Shuttle Routes",
    icon: Route,
    columns: ["id", "route", "source", "dest", "fare", "seats"],
    fetchFn: (a) => (a.listShuttleRoutes as () => Promise<unknown[]>)(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        route: row.routeName,
        source: row.source,
        dest: row.destination,
        fare: `₹${safeCount(row.fare)}`,
        seats: String(safeCount(row.availableSeats)),
      };
    },
  },
  {
    key: "whatsappConfig",
    label: "WhatsApp Config",
    icon: MessageSquare,
    columns: ["key", "value", "category"],
    fetchFn: async (a) => {
      try {
        const fn = a.getWhatsAppConfigTable as
          | (() => Promise<
              Array<{ key: string; value: string; category: string }>
            >)
          | undefined;
        if (typeof fn === "function") {
          const rows = await fn();
          if (Array.isArray(rows) && rows.length > 0) return rows;
        }
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getWhatsAppConfig as (() => Promise<unknown>) | undefined;
        if (typeof fn === "function") {
          const raw = await fn();
          if (
            raw &&
            typeof raw === "object" &&
            !("__kind__" in (raw as object))
          ) {
            const c = raw as Record<string, unknown>;
            return [
              {
                key: "webhookUrl",
                value: String(c.webhookUrl ?? "—"),
                category: "Webhook",
              },
              {
                key: "phoneNumberId",
                value: String(c.phoneNumberId ?? "—"),
                category: "Credentials",
              },
              {
                key: "verifyToken",
                value: c.verifyToken ? "***hidden***" : "—",
                category: "Security",
              },
              {
                key: "isTestMode",
                value: c.isTestMode ? "Test Mode" : "Live Mode",
                category: "Config",
              },
              {
                key: "isConnected",
                value: c.isConnected ? "Connected" : "Disconnected",
                category: "Status",
              },
              {
                key: "businessAccountId",
                value: String(c.businessAccountId ?? "—"),
                category: "Credentials",
              },
            ];
          }
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        key: row.key,
        value: row.value
          ? String(row.value).slice(0, 30) +
            (String(row.value).length > 30 ? "…" : "")
          : "—",
        category: row.category ?? "—",
      };
    },
  },
  {
    key: "telegramConfig",
    label: "Telegram Config",
    icon: Send,
    columns: ["key", "value", "category"],
    fetchFn: async (a) => {
      try {
        const fn = a.getTelegramConfigTable as
          | (() => Promise<
              Array<{ key: string; value: string; category: string }>
            >)
          | undefined;
        if (typeof fn === "function") {
          const rows = await fn();
          if (Array.isArray(rows) && rows.length > 0) return rows;
        }
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getTelegramConfig as
          | (() => Promise<Record<string, unknown>>)
          | undefined;
        if (typeof fn === "function") {
          const cfg = await fn();
          if (
            cfg &&
            typeof cfg === "object" &&
            !("__kind__" in (cfg as object))
          ) {
            const c = cfg as Record<string, unknown>;
            return [
              {
                key: "botUsername",
                value: String(c.botUsername ?? "—"),
                category: "Identity",
              },
              {
                key: "alertChatId",
                value: String(c.alertChatId ?? "—"),
                category: "Notifications",
              },
              {
                key: "isEnabled",
                value: c.isEnabled ? "Enabled" : "Disabled",
                category: "Config",
              },
              {
                key: "isConnected",
                value: c.isConnected ? "Connected" : "Disconnected",
                category: "Status",
              },
              {
                key: "botToken",
                value: c.botToken ? "***hidden***" : "—",
                category: "Security",
              },
            ];
          }
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        key: row.key ?? "—",
        value:
          String(row.value ?? "—").slice(0, 30) +
          (String(row.value ?? "").length > 30 ? "…" : ""),
        category: row.category ?? "Config",
      };
    },
  },
  {
    key: "ondcEnrollments",
    label: "ONDC Enrollments",
    icon: Globe,
    columns: ["id", "businessName", "role", "gstin", "status", "submittedAt"],
    fetchFn: async (a) => {
      try {
        const fn = a.getOndcEnrollments as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        id: sid(row.id),
        businessName: row.businessName ?? "—",
        role: String(row.role ?? ""),
        gstin: row.gstin ?? "—",
        status: String(row.enrollmentStatus ?? ""),
        submittedAt: row.submittedAt
          ? new Date(Number(row.submittedAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  {
    key: "ondcSetupConfig",
    label: "ONDC Setup Config",
    icon: Globe,
    columns: ["key", "value", "category"],
    fetchFn: async (a) => {
      try {
        const fn = a.getOndcConfigTable as
          | (() => Promise<
              Array<{ key: string; value: string; category: string }>
            >)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [
        { key: "network", value: "ONDC", category: "Setup" },
        { key: "version", value: "2.0", category: "Setup" },
        { key: "environment", value: "staging", category: "Setup" },
      ];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        key: row.key ?? "—",
        value: String(row.value ?? "—").slice(0, 40),
        category: row.category ?? "Config",
      };
    },
  },
  // ── Cities ────────────────────────────────────────────────────────────────
  {
    key: "cities",
    label: "Cities",
    icon: Building2,
    idField: "id",
    canAdd: true,
    canEdit: true,
    canDelete: true,
    columns: ["cityName", "pincode", "status", "createdAt"],
    fetchFn: async (a) => {
      try {
        const fn = a.listCities as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") {
          const result = await fn();
          if (Array.isArray(result)) return result;
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        cityName: row.cityName ?? row.name ?? "—",
        pincode: row.pincode ?? "—",
        status: row.isEnabled ? "Active" : "Disabled",
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── City Controls ─────────────────────────────────────────────────────────
  {
    key: "cityControls",
    label: "City Controls",
    icon: Building2,
    canAdd: true,
    columns: ["cityName", "moduleName", "enabled"],
    fetchFn: async (a) => {
      try {
        // Try direct getCityControls
        const fn = a.listCityControls as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getCityControls as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getCityControlsForDataExplorer as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.cityId ?? row.id ?? "",
        _raw: row,
        cityName: row.cityName ?? "—",
        moduleName: row.moduleName ?? "—",
        enabled: row.enabled ? "Active" : "Disabled",
      };
    },
  },
  // ── Restock Orders ────────────────────────────────────────────────────────
  {
    key: "restockOrders",
    label: "Restock Orders",
    icon: Package,
    idField: "id",
    canAdd: true,
    canDelete: true,
    canStatusUpdate: true,
    statusOptions: ["pending", "accepted", "delivered", "cancelled"],
    columns: [
      "id",
      "merchantId",
      "supplierName",
      "items",
      "status",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.listRestockOrders as
          | ((id: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null);
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getAllRestockOrders as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      const items = Array.isArray(row.items)
        ? `${(row.items as unknown[]).length} item(s)`
        : String(row.items ?? "—");
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "pending"),
        _raw: row,
        id: sid(row.id),
        merchantId: sid(row.merchantId, 10),
        supplierName: row.supplierName ?? "—",
        items,
        status: String(row.status ?? "—"),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
        source: String(row.source ?? row.channel ?? ""),
      };
    },
  },
  // ── Marketplace Items ─────────────────────────────────────────────────────
  {
    key: "marketplaceItems",
    label: "Marketplace Items",
    icon: Store,
    idField: "id",
    canAdd: true,
    canEdit: true,
    canDelete: true,
    columns: [
      "title",
      "price",
      "category",
      "rentOrSale",
      "active",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.listMarketplaceItems as
          | ((c: null, t: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null, null);
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getAllMarketplaceItems as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        title: row.title ?? "—",
        price: `₹${safeCount(row.price)}`,
        category: row.category ?? "—",
        rentOrSale: String(row.rentOrSale ?? row.listingType ?? "—"),
        active: row.isActive ? "Active" : "Disabled",
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
        source: String(row.source ?? row.channel ?? row.listedVia ?? ""),
      };
    },
  },
  // ── Moderation Queue ──────────────────────────────────────────────────────
  {
    key: "moderationQueue",
    label: "Moderation Queue",
    icon: Flag,
    idField: "id",
    canAdd: true,
    canDelete: true,
    canStatusUpdate: true,
    statusOptions: ["pending", "approved", "rejected", "flagged"],
    columns: [
      "contentType",
      "contentId",
      "flagReason",
      "status",
      "remarks",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.listModerationItems as
          | ((s: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null);
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getAllModerationItems as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "pending"),
        _raw: row,
        contentType: String(row.contentType ?? "—"),
        contentId: sid(row.contentId),
        flagReason: String(row.flagReason ?? row.reason ?? "—"),
        status: String(row.status ?? "—"),
        remarks: String(row.remarks ?? "—"),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Support Tickets ───────────────────────────────────────────────────────
  {
    key: "supportTickets",
    label: "Support Tickets",
    icon: LifeBuoy,
    idField: "id",
    canDelete: true,
    canStatusUpdate: true,
    statusOptions: ["open", "in-progress", "resolved", "closed"],
    columns: [
      "id",
      "creatorRole",
      "issueType",
      "orderId",
      "status",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllSupportTicketsFull as
          | ((s: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null);
      } catch {
        /* ignore */
      }
      try {
        const fn = a.listSupportTickets as
          | ((s: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null);
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getAllSupportTickets as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "open"),
        _raw: row,
        id: sid(row.id),
        creatorRole: String(row.creatorRole ?? row.role ?? "—"),
        issueType: String(row.issueType ?? row.type ?? "—"),
        orderId: row.orderId ? sid(row.orderId) : "—",
        status: String(row.status ?? "—"),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
        source: String(row.source ?? row.channel ?? row.raisedVia ?? ""),
      };
    },
  },
  // ── Recipes ───────────────────────────────────────────────────────────────
  {
    key: "recipes",
    label: "Recipes",
    icon: ChefHat,
    idField: "id",
    canAdd: true,
    canDelete: true,
    columns: ["title", "userId", "ingredientCount", "rating", "createdAt"],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllRecipes as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getAllRecipesTable as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      const ingredients = Array.isArray(row.ingredients)
        ? (row.ingredients as unknown[]).length
        : safeCount(row.ingredientCount);
      return {
        _id: row.id ?? "",
        _raw: row,
        title: row.title ?? "—",
        userId: sid(row.userId ?? row.authorId, 10),
        ingredientCount: String(ingredients),
        rating: row.rating ? `${Number(row.rating).toFixed(1)} ★` : "—",
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Adhoc Jobs ────────────────────────────────────────────────────────────
  {
    key: "adhocJobs",
    label: "Adhoc Jobs",
    icon: Clock,
    idField: "id",
    canAdd: true,
    canDelete: true,
    canStatusUpdate: true,
    statusOptions: ["open", "in-progress", "completed", "cancelled"],
    columns: ["title", "category", "price", "jobType", "active", "createdAt"],
    fetchFn: async (a) => {
      try {
        const fn = a.listAllAdhocJobs as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      try {
        const fn = a.listAdhocJobsAdmin as
          | ((c: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null);
      } catch {
        /* ignore */
      }
      try {
        const fn = a.getAllAdhocJobs as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "open"),
        _raw: row,
        title: row.title ?? "—",
        category: row.category ?? "—",
        price: `₹${safeCount(row.price)}`,
        jobType: String(row.jobType ?? row.type ?? "—"),
        active: row.isActive ? "Active" : "Disabled",
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
        source: String(row.source ?? row.channel ?? row.postedVia ?? ""),
      };
    },
  },
  // ── Healthcare Providers ──────────────────────────────────────────────────────
  {
    key: "healthcareProviders" as EntityKey,
    label: "Healthcare Providers",
    icon: Users,
    idField: "id",
    canAdd: true,
    canEdit: true,
    canDelete: true,
    columns: [
      "ID",
      "Name",
      "Specialization",
      "Location",
      "Phone",
      "Available Days",
      "Fee",
      "Created",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllHealthcareProviders as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        ID: sid(row.id),
        Name: row.name ?? "—",
        Specialization: row.specialization ?? "—",
        Location: row.location ?? "—",
        Phone: row.phone ?? "—",
        "Available Days": row.availableDays ?? "—",
        Fee: row.fee !== undefined ? `₹${safeCount(row.fee)}` : "—",
        Created: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Tour Operators ────────────────────────────────────────────────────────────
  {
    key: "tourOperators" as EntityKey,
    label: "Tour Operators",
    icon: Globe,
    idField: "id",
    canAdd: true,
    canEdit: true,
    canDelete: true,
    columns: [
      "ID",
      "Name",
      "Destination",
      "Type",
      "Duration",
      "Price",
      "Phone",
      "Created",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllTourOperators as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        ID: sid(row.id),
        Name: row.name ?? "—",
        Destination: row.destination ?? "—",
        Type: row.tourType ?? "—",
        Duration: row.duration ?? "—",
        Price: row.price !== undefined ? `₹${safeCount(row.price)}` : "—",
        Phone: row.phone ?? "—",
        Created: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Professional Services ─────────────────────────────────────────────────────
  {
    key: "professionalServices" as EntityKey,
    label: "Professional Services",
    icon: Briefcase,
    idField: "id",
    canAdd: true,
    canEdit: true,
    canDelete: true,
    columns: [
      "ID",
      "Name",
      "Service Type",
      "Location",
      "Phone",
      "Experience",
      "Hourly Rate",
      "Created",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllProfessionalServices as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        ID: sid(row.id),
        Name: row.name ?? "—",
        "Service Type": row.serviceType ?? "—",
        Location: row.location ?? "—",
        Phone: row.phone ?? "—",
        Experience: row.experience ?? "—",
        "Hourly Rate":
          row.hourlyRate !== undefined
            ? `₹${safeCount(row.hourlyRate)}/hr`
            : "—",
        Created: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Healthcare Appointments ───────────────────────────────────────────────────
  {
    key: "healthcareAppointments" as EntityKey,
    label: "Healthcare Appointments",
    icon: Heart,
    idField: "id",
    canDelete: true,
    columns: [
      "id",
      "providerId",
      "customerPhone",
      "date",
      "timeSlot",
      "status",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getHealthcareAppointments as
          | ((cp: null, pid: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null, null);
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? ""),
        _raw: row,
        id: sid(row.id),
        providerId: sid(row.providerId, 10),
        customerPhone: row.customerPhone ?? "—",
        date: row.date ?? "—",
        timeSlot: row.timeSlot ?? "—",
        status: String(row.status ?? "—"),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Tour Bookings ─────────────────────────────────────────────────────────────
  {
    key: "tourBookings" as EntityKey,
    label: "Tour Bookings",
    icon: MapPin,
    idField: "id",
    canDelete: true,
    columns: [
      "id",
      "operatorId",
      "customerPhone",
      "destination",
      "passengerCount",
      "date",
      "status",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getTourBookings as
          | ((cp: null, oid: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null, null);
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? ""),
        _raw: row,
        id: sid(row.id),
        operatorId: sid(row.operatorId, 10),
        customerPhone: row.customerPhone ?? "—",
        destination: row.destination ?? "—",
        passengerCount: String(Number(row.passengerCount ?? 0)),
        date: row.date ?? "—",
        status: String(row.status ?? "—"),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Service Bookings ──────────────────────────────────────────────────────────
  {
    key: "serviceBookings" as EntityKey,
    label: "Service Bookings",
    icon: Briefcase,
    idField: "id",
    canDelete: true,
    columns: [
      "id",
      "serviceId",
      "customerPhone",
      "date",
      "timeSlot",
      "duration",
      "status",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getServiceBookings as
          | ((cp: null, mp: null) => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn(null, null);
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? ""),
        _raw: row,
        id: sid(row.id),
        serviceId: sid(row.serviceId, 10),
        customerPhone: row.customerPhone ?? "—",
        date: row.date ?? "—",
        timeSlot: row.timeSlot ?? "—",
        duration: `${Number(row.duration ?? 0)}h`,
        status: String(row.status ?? "—"),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Donations ─────────────────────────────────────────────────────────────────
  {
    key: "donations" as EntityKey,
    label: "Donations",
    icon: Gift,
    idField: "id",
    canAdd: true,
    canDelete: true,
    canStatusUpdate: true,
    statusOptions: ["Available", "Claimed", "Removed"],
    columns: [
      "id",
      "category",
      "description",
      "quantity",
      "location",
      "donorName",
      "donorPhone",
      "status",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getDonations as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "Available"),
        _raw: row,
        id: sid(row.id),
        category: row.category ?? "—",
        description: String(row.description ?? "—").slice(0, 30),
        quantity: String(row.quantity ?? "—"),
        location: row.location ?? "—",
        donorName: row.donorName ?? "—",
        donorPhone: row.donorPhone ?? row.contactPhone ?? "—",
        status: String(row.status ?? "—"),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
        source: String(row.source ?? ""),
      };
    },
  },
  // ── Donation Requests ─────────────────────────────────────────────────────────
  {
    key: "donationRequests" as EntityKey,
    label: "Donation Requests",
    icon: Gift,
    idField: "id",
    canAdd: true,
    canDelete: true,
    canStatusUpdate: true,
    statusOptions: ["Pending", "Fulfilled", "Cancelled"],
    columns: [
      "id",
      "category",
      "description",
      "quantityNeeded",
      "location",
      "requesterName",
      "requesterPhone",
      "status",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getDonationRequests as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "Pending"),
        _raw: row,
        id: sid(row.id),
        category: row.category ?? "—",
        description: String(row.description ?? "—").slice(0, 30),
        quantityNeeded: String(row.quantityNeeded ?? "—"),
        location: row.location ?? "—",
        requesterName: row.requesterName ?? "—",
        requesterPhone: row.requesterPhone ?? "—",
        status: String(row.status ?? "—"),
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
        source: String(row.source ?? ""),
      };
    },
  },
  // ── Election Results ──────────────────────────────────────────────────────
  {
    key: "electionResults" as EntityKey,
    label: "Election Results",
    icon: Flag,
    idField: "id",
    canDelete: false,
    columns: [
      "id",
      "state",
      "constituency",
      "partyName",
      "candidateName",
      "votes",
      "voteShare",
      "status",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllElectionResults as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        state: row.state ?? "—",
        constituency: row.constituency ?? "—",
        partyName: row.partyName ?? "—",
        candidateName: row.candidateName ?? "—",
        votes: Number(row.votes ?? 0).toLocaleString("en-IN"),
        voteShare: row.voteShare ? `${Number(row.voteShare).toFixed(1)}%` : "—",
        status: row.isWon ? "🏆 Won" : row.isLeading ? "🔊 Leading" : "Behind",
      };
    },
  },
  // ── Market Searches ───────────────────────────────────────────────────────────
  {
    key: "marketSearches" as EntityKey,
    label: "Market Searches",
    icon: TrendingUp,
    idField: "id",
    canDelete: true,
    columns: [
      "id",
      "scriptName",
      "country",
      "resultsCount",
      "recommendations",
      "searchedAt",
      "createdAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getMarketSearchHistory as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      const results = Array.isArray(row.results) ? row.results : [];
      const recs = Array.isArray(row.recommendations)
        ? row.recommendations
        : [];
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        scriptName: row.scriptName ?? "—",
        country: row.country ?? "—",
        resultsCount: String(results.length),
        recommendations: String(recs.length),
        searchedAt: row.searchedAt
          ? new Date(Number(row.searchedAt)).toLocaleDateString("en-IN")
          : "—",
        createdAt: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ── Lending Items ───────────────────────────────────────────────────
  {
    key: "lendingItems" as EntityKey,
    label: "Lending Items",
    icon: Package,
    idField: "id",
    canAdd: false,
    canDelete: false,
    columns: [
      "id",
      "itemName",
      "category",
      "lender",
      "borrower",
      "returnDate",
      "charge",
      "reminder",
      "status",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllLendingItems as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        itemName: row.itemName ?? "—",
        category: String(row.itemCategory ?? "—"),
        lender: row.lenderPhone ?? "—",
        borrower: row.borrowerPhone ?? "—",
        returnDate: row.returnDate
          ? new Date(Number(row.returnDate) / 1_000_000).toLocaleDateString(
              "en-IN",
            )
          : "—",
        charge: row.charge ? `₹${row.charge}` : "—",
        reminder: String(row.reminderFrequency ?? "—"),
        status: String(row.status ?? "—"),
      };
    },
  },
  // -- Community Parking Bookings --
  {
    key: "communityParkingBookings" as EntityKey,
    label: "Community Parking",
    icon: Car,
    idField: "id",
    canAdd: true,
    canStatusUpdate: true,
    statusOptions: ["pending", "confirmed", "completed", "cancelled"],
    columns: [
      "id",
      "memberPhone",
      "communityId",
      "parkingType",
      "startDate",
      "endDate",
      "cost",
      "status",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllCommunityParkingBookings as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "pending"),
        _raw: row,
        id: sid(row.id),
        memberPhone: row.memberPhone ?? "—",
        communityId: row.communityId ?? "—",
        parkingType: String(row.parkingType ?? "—"),
        startDate: row.startDate ?? "—",
        endDate: row.endDate ?? "—",
        cost: row.cost !== undefined ? `₹${safeCount(row.cost)}` : "—",
        status: String(row.status ?? "—"),
      };
    },
  },
  // -- Community Room Bookings --
  {
    key: "communityRoomBookings" as EntityKey,
    label: "Community Rooms",
    icon: DoorOpen,
    idField: "id",
    canAdd: true,
    canStatusUpdate: true,
    statusOptions: ["pending", "confirmed", "completed", "cancelled"],
    columns: [
      "id",
      "memberPhone",
      "communityId",
      "facilityType",
      "bookingDate",
      "timeSlot",
      "status",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllCommunityRoomBookings as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "pending"),
        _raw: row,
        id: sid(row.id),
        memberPhone: row.memberPhone ?? "—",
        communityId: row.communityId ?? "—",
        facilityType: row.facilityType ?? "—",
        bookingDate: row.bookingDate ?? "—",
        timeSlot: row.timeSlot ?? "—",
        status: String(row.status ?? "—"),
      };
    },
  },
  // -- Community Food Orders --
  {
    key: "communityFoodOrders" as EntityKey,
    label: "Community Food",
    icon: UtensilsCrossed,
    idField: "id",
    canAdd: true,
    canStatusUpdate: true,
    statusOptions: [
      "pending",
      "confirmed",
      "preparing",
      "delivered",
      "cancelled",
    ],
    columns: [
      "id",
      "buyerPhone",
      "sellerPhone",
      "communityId",
      "mealDescription",
      "cuisineType",
      "dietary",
      "quantity",
      "cost",
      "status",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllCommunityFoodOrders as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "pending"),
        _raw: row,
        id: sid(row.id),
        buyerPhone: row.buyerPhone ?? "—",
        sellerPhone: row.sellerPhone ?? "—",
        communityId: row.communityId ?? "—",
        mealDescription: String(row.mealDescription ?? "—").slice(0, 30),
        cuisineType: row.cuisineType ?? "—",
        dietary: row.dietary ?? "—",
        quantity: String(row.quantity ?? "1"),
        cost: row.cost !== undefined ? `₹${safeCount(row.cost)}` : "—",
        status: String(row.status ?? "—"),
      };
    },
  },
  // -- Community Work Orders --
  {
    key: "communityWorkOrders" as EntityKey,
    label: "Community Services",
    icon: Wrench,
    idField: "id",
    canAdd: true,
    canStatusUpdate: true,
    statusOptions: [
      "pending",
      "assigned",
      "in-progress",
      "completed",
      "cancelled",
    ],
    columns: [
      "id",
      "memberPhone",
      "communityId",
      "serviceType",
      "description",
      "scheduledDate",
      "status",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllCommunityWorkOrders as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _status: String(row.status ?? "pending"),
        _raw: row,
        id: sid(row.id),
        memberPhone: row.memberPhone ?? "—",
        communityId: row.communityId ?? "—",
        serviceType: row.serviceType ?? "—",
        description: String(row.description ?? "—").slice(0, 40),
        scheduledDate: row.scheduledDate ?? "—",
        status: String(row.status ?? "—"),
      };
    },
  },
  // -- Community Members --
  {
    key: "communityMembers" as EntityKey,
    label: "Community Members",
    icon: Users,
    idField: "phone",
    canAdd: false,
    canDelete: true,
    columns: [
      "phone",
      "name",
      "apartment",
      "city",
      "location",
      "roles",
      "registeredAt",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllCommunityMembers as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      const roles = Array.isArray(row.roles)
        ? row.roles.join(", ")
        : String(row.roles ?? "");
      return {
        _id: row.phone ?? "",
        _raw: row,
        phone: row.phone ?? "—",
        name: row.name ?? "—",
        apartment: row.apartmentName ?? "—",
        city: row.city ?? "—",
        location: row.location ?? "—",
        roles: roles || "—",
        registeredAt: row.registeredAt
          ? new Date(Number(row.registeredAt) / 1_000_000).toLocaleDateString(
              "en-IN",
            )
          : "—",
      };
    },
  },
  // ─── Bus Bookings ─────────────────────────────────────────────────────────
  {
    key: "busBookings" as EntityKey,
    label: "Bus Bookings",
    icon: Route,
    columns: [
      "id",
      "customer",
      "route",
      "journeyDate",
      "operator",
      "fare",
      "seats",
      "status",
      "payStatus",
      "pnr",
      "env",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllBusBookings as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      const seats = Array.isArray(row.seatNumbers)
        ? (row.seatNumbers as string[]).join(", ")
        : String(row.seatNumbers ?? "—");
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? row.passengerPhone ?? "—").slice(
          0,
          14,
        ),
        route: `${String(row.source ?? "—")} → ${String(row.destination ?? "—")}`,
        journeyDate: String(row.journeyDate ?? "—"),
        operator: String(row.operatorName ?? "—"),
        fare:
          row.fare !== undefined
            ? `₹${Number(row.fare).toLocaleString("en-IN")}`
            : "—",
        seats,
        status: String(row.status ?? "—"),
        payStatus: String(row.paymentStatus ?? "—"),
        pnr: String(row.pnr ?? "—"),
        env: String(row.environment ?? "—"),
      };
    },
  },
  // ─── Train Bookings ──────────────────────────────────────────────────────────
  {
    key: "trainBookings" as EntityKey,
    label: "Train Bookings",
    icon: Route,
    columns: [
      "id",
      "customer",
      "route",
      "date",
      "train",
      "class",
      "fare",
      "pnr",
      "status",
      "payStatus",
      "env",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllTrainBookings as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? "—").slice(0, 14),
        route: `${String(row.source ?? "—")} → ${String(row.destination ?? "—")}`,
        date: String(row.journeyDate ?? "—"),
        train:
          `${String(row.trainNumber ?? "—")} ${String(row.trainName ?? "")}`.trim(),
        class: String(row.classType ?? "—"),
        fare:
          row.fare !== undefined
            ? `₹${Number(row.fare).toLocaleString("en-IN")}`
            : "—",
        pnr: String(row.pnr ?? "—"),
        status: String(row.status ?? "—"),
        payStatus: String(row.paymentStatus ?? "—"),
        env: String(row.environment ?? "—"),
      };
    },
  },
  // ─── Flight Bookings ─────────────────────────────────────────────────────────
  {
    key: "flightBookings" as EntityKey,
    label: "Flight Bookings",
    icon: Route,
    columns: [
      "id",
      "customer",
      "route",
      "date",
      "airline",
      "flight",
      "class",
      "fare",
      "bookingRef",
      "pnr",
      "status",
      "env",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllFlightBookings as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? "—").slice(0, 14),
        route: `${String(row.source ?? "—")} → ${String(row.destination ?? "—")}`,
        date: String(row.journeyDate ?? "—"),
        airline: String(row.airline ?? "—"),
        flight: String(row.flightNumber ?? "—"),
        class: String(row.cabinClass ?? "—"),
        fare:
          row.fare !== undefined
            ? `₹${Number(row.fare).toLocaleString("en-IN")}`
            : "—",
        bookingRef: String(row.bookingRef ?? "—"),
        pnr: String(row.pnr ?? "—"),
        status: String(row.status ?? "—"),
        env: String(row.environment ?? "—"),
      };
    },
  },
  // ─── Mobile Recharges ─────────────────────────────────────────────────────────
  {
    key: "mobileRecharges" as EntityKey,
    label: "Mobile Recharges",
    icon: Zap,
    columns: [
      "id",
      "customer",
      "operator",
      "number",
      "amount",
      "status",
      "txnId",
      "date",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllUtilityTransactions as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") {
          const all = await fn();
          return (all as Record<string, unknown>[]).filter((r) =>
            String(r.serviceType ?? "")
              .toLowerCase()
              .includes("recharge"),
          );
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? "—").slice(0, 14),
        operator: String(row.operatorName ?? row.operatorCode ?? "—"),
        number: String(row.consumerNumber ?? "—"),
        amount:
          row.amount !== undefined
            ? `₹${Number(row.amount).toLocaleString("en-IN")}`
            : "—",
        status: String(row.status ?? "—"),
        txnId: sid(row.transactionId ?? row.referenceId, 14),
        date: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ─── Bill Payments ────────────────────────────────────────────────────────────
  {
    key: "billPayments" as EntityKey,
    label: "Bill Payments",
    icon: Package,
    columns: [
      "id",
      "customer",
      "category",
      "operator",
      "consumerNo",
      "billAmt",
      "paidAmt",
      "status",
      "txnId",
      "date",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllUtilityTransactions as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") {
          const all = await fn();
          return (all as Record<string, unknown>[]).filter((r) =>
            String(r.serviceType ?? "")
              .toLowerCase()
              .includes("bill"),
          );
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? "—").slice(0, 14),
        category: String(row.serviceType ?? "—"),
        operator: String(row.operatorName ?? row.operatorCode ?? "—"),
        consumerNo: String(row.consumerNumber ?? "—"),
        billAmt:
          row.billAmount !== undefined
            ? `₹${Number(row.billAmount).toLocaleString("en-IN")}`
            : "—",
        paidAmt:
          row.amount !== undefined
            ? `₹${Number(row.amount).toLocaleString("en-IN")}`
            : "—",
        status: String(row.status ?? "—"),
        txnId: sid(row.transactionId ?? row.referenceId, 14),
        date: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ─── FastTag Transactions ─────────────────────────────────────────────────────
  {
    key: "fastagTransactions" as EntityKey,
    label: "FastTag",
    icon: Car,
    columns: ["id", "customer", "vehicle", "amount", "status", "txnId", "date"],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllUtilityTransactions as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") {
          const all = await fn();
          return (all as Record<string, unknown>[]).filter(
            (r) =>
              String(r.serviceType ?? "")
                .toLowerCase()
                .includes("fastag") ||
              String(r.serviceType ?? "")
                .toLowerCase()
                .includes("fasttag"),
          );
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? "—").slice(0, 14),
        vehicle: String(row.consumerNumber ?? "—"),
        amount:
          row.amount !== undefined
            ? `₹${Number(row.amount).toLocaleString("en-IN")}`
            : "—",
        status: String(row.status ?? "—"),
        txnId: sid(row.transactionId ?? row.referenceId, 14),
        date: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ─── LPG Bookings ─────────────────────────────────────────────────────────────
  {
    key: "lpgBookings" as EntityKey,
    label: "LPG Bookings",
    icon: Package,
    columns: [
      "id",
      "customer",
      "consumerNo",
      "amount",
      "status",
      "txnId",
      "date",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllUtilityTransactions as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") {
          const all = await fn();
          return (all as Record<string, unknown>[]).filter(
            (r) =>
              String(r.serviceType ?? "")
                .toLowerCase()
                .includes("lpg") ||
              String(r.serviceType ?? "")
                .toLowerCase()
                .includes("gas"),
          );
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? "—").slice(0, 14),
        consumerNo: String(row.consumerNumber ?? "—"),
        amount:
          row.amount !== undefined
            ? `₹${Number(row.amount).toLocaleString("en-IN")}`
            : "—",
        status: String(row.status ?? "—"),
        txnId: sid(row.transactionId ?? row.referenceId, 14),
        date: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ─── Municipality Payments ────────────────────────────────────────────────────
  {
    key: "municipalityPayments" as EntityKey,
    label: "Municipality",
    icon: Building2,
    columns: [
      "id",
      "customer",
      "operator",
      "propertyNo",
      "amount",
      "status",
      "txnId",
      "date",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllUtilityTransactions as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") {
          const all = await fn();
          return (all as Record<string, unknown>[]).filter(
            (r) =>
              String(r.serviceType ?? "")
                .toLowerCase()
                .includes("municipal") ||
              String(r.serviceType ?? "")
                .toLowerCase()
                .includes("municipality"),
          );
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? "—").slice(0, 14),
        operator: String(row.operatorName ?? row.operatorCode ?? "—"),
        propertyNo: String(row.consumerNumber ?? "—"),
        amount:
          row.amount !== undefined
            ? `₹${Number(row.amount).toLocaleString("en-IN")}`
            : "—",
        status: String(row.status ?? "—"),
        txnId: sid(row.transactionId ?? row.referenceId, 14),
        date: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ─── Insurance Premiums ───────────────────────────────────────────────────────
  {
    key: "insurancePremiums" as EntityKey,
    label: "Insurance",
    icon: Heart,
    columns: [
      "id",
      "customer",
      "policyType",
      "policyNo",
      "premium",
      "status",
      "receipt",
      "date",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllUtilityTransactions as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") {
          const all = await fn();
          return (all as Record<string, unknown>[]).filter((r) =>
            String(r.serviceType ?? "")
              .toLowerCase()
              .includes("insurance"),
          );
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: sid(row.id),
        customer: String(row.customerId ?? "—").slice(0, 14),
        policyType: String(row.operatorName ?? "—"),
        policyNo: String(row.consumerNumber ?? "—"),
        premium:
          row.amount !== undefined
            ? `₹${Number(row.amount).toLocaleString("en-IN")}`
            : "—",
        status: String(row.status ?? "—"),
        receipt: String(row.receiptNumber ?? "—"),
        date: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN")
          : "—",
      };
    },
  },
  // ─── PaySprint API Logs ────────────────────────────────────────────────────────
  {
    key: "paysprintAPILogs" as EntityKey,
    label: "PaySprint API Logs",
    icon: TrendingUp,
    columns: [
      "service",
      "env",
      "endpoint",
      "httpStatus",
      "latency",
      "error",
      "timestamp",
    ],
    fetchFn: async (a) => {
      try {
        const fn = a.getAllPaySprintAPILogs as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function") return fn();
      } catch {
        /* ignore */
      }
      return [];
    },
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      const isErr = Boolean(row.isError);
      return {
        _id: row.id ?? "",
        _raw: row,
        service: String(row.serviceType ?? "—"),
        env: String(row.environment ?? "—"),
        endpoint: String(row.endpoint ?? "—").slice(0, 40),
        httpStatus: String(Number(row.httpStatus ?? 0)),
        latency:
          row.latencyMs !== undefined ? `${Number(row.latencyMs)}ms` : "—",
        error: isErr ? String(row.errorMessage ?? "Error").slice(0, 40) : "—",
        timestamp: row.createdAt
          ? new Date(Number(row.createdAt)).toLocaleString("en-IN")
          : "—",
      };
    },
  },
];

// ─── Language Learning entity registry (populated at runtime by hook) ─────────
// These methods are injected by the DataExplorerPage component via Object.assign
// so that module-level EntityDef closures can call hook-backed async methods.
const _ll = {
  getLanguageCoursesForDataExplorer: async () =>
    [] as Record<string, unknown>[],
  getLessonsForDataExplorer: async () => [] as Record<string, unknown>[],
  getEnrollmentsForDataExplorer: async () => [] as Record<string, unknown>[],
  getCourseApprovalsForDataExplorer: async () =>
    [] as Record<string, unknown>[],
  getWordDefinitionsForDataExplorer: async () =>
    [] as Record<string, unknown>[],
  getDailyLessonsForDataExplorer: async () => [] as Record<string, unknown>[],
};

const LANGUAGE_LEARNING_ENTITIES: EntityDef[] = [
  {
    key: "language_courses" as EntityKey,
    label: "Language Courses",
    icon: BookOpen,
    columns: [
      "id",
      "title",
      "creatorPhone",
      "languagePair",
      "price",
      "status",
      "enrollmentCount",
      "createdDate",
    ],
    fetchFn: async (_a) => _ll.getLanguageCoursesForDataExplorer(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: String(row.id ?? "").slice(0, 8),
        title: String(row.title ?? "—"),
        creatorPhone: String(row.creatorPhone ?? "—"),
        languagePair: String(row.languagePair ?? "—"),
        price: row.price !== undefined ? `₹${Number(row.price)}` : "Free",
        status: String(row.status ?? "—"),
        enrollmentCount: Number(row.enrollmentCount ?? 0),
        createdDate: row.createdDate
          ? new Date(Number(row.createdDate)).toLocaleDateString("en-IN")
          : "—",
      };
    },
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canStatusUpdate: true,
    statusOptions: ["pending", "approved", "rejected", "draft"],
  },
  {
    key: "language_lessons" as EntityKey,
    label: "Lessons",
    icon: Library,
    columns: ["id", "courseId", "title", "order", "wordCount"],
    fetchFn: async (_a) => _ll.getLessonsForDataExplorer(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: String(row.id ?? "").slice(0, 8),
        courseId: String(row.courseId ?? "—").slice(0, 8),
        title: String(row.title ?? "—"),
        order: Number(row.order ?? 0),
        wordCount: Number(row.wordCount ?? 0),
      };
    },
    canAdd: true,
    canEdit: true,
    canDelete: true,
  },
  {
    key: "language_enrollments" as EntityKey,
    label: "Enrollments",
    icon: Users,
    columns: [
      "id",
      "userPhone",
      "courseId",
      "enrollmentDate",
      "progressPercent",
      "paymentStatus",
    ],
    fetchFn: async (_a) => _ll.getEnrollmentsForDataExplorer(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: String(row.id ?? "").slice(0, 8),
        userPhone: String(row.userPhone ?? "—"),
        courseId: String(row.courseId ?? "—").slice(0, 8),
        enrollmentDate: row.enrollmentDate
          ? new Date(Number(row.enrollmentDate)).toLocaleDateString("en-IN")
          : "—",
        progressPercent: `${Number(row.progressPercent ?? 0)}%`,
        paymentStatus: String(row.paymentStatus ?? "—"),
      };
    },
    canAdd: false,
    canEdit: true,
    canDelete: true,
  },
  {
    key: "language_approvals" as EntityKey,
    label: "Course Approvals",
    icon: CheckCircle,
    columns: [
      "id",
      "courseId",
      "adminNotes",
      "approverId",
      "approvalDate",
      "status",
    ],
    fetchFn: async (_a) => _ll.getCourseApprovalsForDataExplorer(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: String(row.id ?? "").slice(0, 8),
        courseId: String(row.courseId ?? "—").slice(0, 8),
        adminNotes: String(row.adminNotes ?? "—"),
        approverId: String(row.approverId ?? "—").slice(0, 8),
        approvalDate: row.approvalDate
          ? new Date(Number(row.approvalDate)).toLocaleDateString("en-IN")
          : "—",
        status: String(row.status ?? "—"),
      };
    },
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
  {
    key: "word_definitions" as EntityKey,
    label: "Word Definitions",
    icon: Globe,
    columns: ["id", "word", "language", "ancientTranslation", "ipa"],
    fetchFn: async (_a) => _ll.getWordDefinitionsForDataExplorer(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      const translations = row.translations as
        | Array<[string, string]>
        | undefined;
      const ancientTranslation = String(
        row.ancientTranslation ??
          translations?.find(([lang]) =>
            ["Sanskrit", "Latin", "Old Arabic"].includes(lang),
          )?.[1] ??
          "—",
      );
      return {
        _id: row.id ?? "",
        _raw: row,
        id: String(row.id ?? "").slice(0, 8),
        word: String(row.word ?? "—"),
        language: String(row.language ?? "—"),
        ancientTranslation,
        ipa: String(row.ipa ?? row.pronunciation ?? "—"),
      };
    },
    canAdd: true,
    canEdit: true,
    canDelete: true,
  },
  {
    key: "daily_lessons" as EntityKey,
    label: "Daily Lessons",
    icon: Flame,
    columns: [
      "id",
      "userPhone",
      "languagePair",
      "lessonDate",
      "isCompleted",
      "streakDate",
    ],
    fetchFn: async (_a) => _ll.getDailyLessonsForDataExplorer(),
    mapRow: (r) => {
      const row = r as Record<string, unknown>;
      return {
        _id: row.id ?? "",
        _raw: row,
        id: String(row.id ?? "").slice(0, 8),
        userPhone: String(row.userPhone ?? "—"),
        languagePair: String(row.languagePair ?? "—"),
        lessonDate: row.lessonDate
          ? new Date(Number(row.lessonDate)).toLocaleDateString("en-IN")
          : "—",
        isCompleted: row.isCompleted ? "✅ Yes" : "⏳ No",
        streakDate: row.streakDate
          ? new Date(Number(row.streakDate)).toLocaleDateString("en-IN")
          : "—",
      };
    },
    canAdd: false,
    canEdit: true,
    canDelete: true,
  },
];

// ─── Modal component ──────────────────────────────────────────────────────────

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-sm text-foreground">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

// ─── Inline Status Update ─────────────────────────────────────────────────────

function InlineStatusSelect({
  currentStatus,
  options,
  onSave,
  saving,
}: {
  currentStatus: string;
  options: string[];
  onSave: (status: string) => void;
  saving: boolean;
}) {
  const [val, setVal] = useState(currentStatus);
  return (
    <div className="flex items-center gap-1.5">
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="text-xs h-7 px-2 rounded border border-border bg-muted/30 text-foreground"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {val !== currentStatus && (
        <Button
          size="sm"
          className="h-6 text-[10px] px-2"
          onClick={() => onSave(val)}
          disabled={saving}
        >
          {saving ? "…" : "Save"}
        </Button>
      )}
    </div>
  );
}

// ─── Form fields per entity ───────────────────────────────────────────────────

function CityForm({
  initial,
  onSave,
  saving,
}: {
  initial?: Record<string, unknown>;
  onSave: (data: Record<string, string>) => void;
  saving: boolean;
}) {
  const [name, setName] = useState(
    String(initial?.cityName ?? initial?.name ?? ""),
  );
  const [pincodes, setPincodes] = useState(String(initial?.pincode ?? ""));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ name, pincodes });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">City Name *</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Mumbai"
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">
          Pincode(s) (comma-separated)
        </Label>
        <Input
          value={pincodes}
          onChange={(e) => setPincodes(e.target.value)}
          placeholder="e.g. 400001, 400002"
          className="h-8 text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Save City"}
      </Button>
    </form>
  );
}

function CityControlForm({
  onSave,
  saving,
}: {
  onSave: (d: { cityId: string; moduleName: string; enabled: boolean }) => void;
  saving: boolean;
}) {
  const [cityId, setCityId] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [enabled, setEnabled] = useState(true);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ cityId, moduleName, enabled });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">City ID *</Label>
        <Input
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          placeholder="City ID"
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Module Name *</Label>
        <Input
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="e.g. marketplace"
          required
          className="h-8 text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="ctrl-enabled"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
        <Label htmlFor="ctrl-enabled" className="text-xs">
          Enabled
        </Label>
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Save Control"}
      </Button>
    </form>
  );
}

function MarketplaceItemForm({
  initial,
  onSave,
  saving,
}: {
  initial?: Record<string, unknown>;
  onSave: (d: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const isAdd = !initial?._id;
  const [title, setTitle] = useState(String(initial?.title ?? ""));
  const [price, setPrice] = useState(String(safeCount(initial?.price)));
  const [category, setCategory] = useState(
    String(initial?.category ?? "General"),
  );
  const [listingType, setListingType] = useState(
    String(initial?.rentOrSale ?? initial?.listingType ?? "sell"),
  );
  const [condition, setCondition] = useState("used");
  const [status, setStatus] = useState(
    initial?.active === "Active" ? "active" : "inactive",
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isAdd) {
          onSave({
            title,
            price: Number(price),
            category,
            listingType,
            condition,
            yearOfManufacture: BigInt(new Date().getFullYear()),
            instagramPhotoLink: "",
            invoiceAvailable: false,
            createdBy: "admin",
          });
        } else {
          onSave({
            id: String(initial?._id ?? ""),
            title,
            price: Number(price),
            status,
          });
        }
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Title *</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Price (₹) *</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="h-8 text-sm"
        />
      </div>
      {isAdd && (
        <>
          <div>
            <Label className="text-xs mb-1 block">Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Electronics"
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs mb-1 block">Sell or Rent</Label>
            <select
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
            >
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div>
            <Label className="text-xs mb-1 block">Condition</Label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </div>
        </>
      )}
      {!isAdd && (
        <div>
          <Label className="text-xs mb-1 block">Status</Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      )}
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : isAdd ? "Add Item" : "Save Item"}
      </Button>
    </form>
  );
}

function RestockOrderForm({
  onSave,
  saving,
}: {
  onSave: (d: {
    merchantId: string;
    supplierName: string;
    itemName: string;
    quantity: number;
    notes: string;
  }) => void;
  saving: boolean;
}) {
  const [merchantId, setMerchantId] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          merchantId,
          supplierName,
          itemName,
          quantity: Number(quantity),
          notes,
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Merchant ID *</Label>
        <Input
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          placeholder="e.g. merchant-001"
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Supplier Name *</Label>
        <Input
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          placeholder="e.g. ABC Distributors"
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Item Name *</Label>
        <Input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g. Rice 25kg"
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Quantity *</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Notes</Label>
        <Input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes"
          className="h-8 text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Create Restock Order"}
      </Button>
    </form>
  );
}

function ModerationFlagForm({
  onSave,
  saving,
}: {
  onSave: (d: {
    contentId: string;
    contentType: string;
    reportedBy: string;
    reason: string;
  }) => void;
  saving: boolean;
}) {
  const [contentId, setContentId] = useState("");
  const [contentType, setContentType] = useState("product");
  const [reportedBy, setReportedBy] = useState("");
  const [reason, setReason] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ contentId, contentType, reportedBy, reason });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Content ID *</Label>
        <Input
          value={contentId}
          onChange={(e) => setContentId(e.target.value)}
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Content Type</Label>
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {[
            "product",
            "order",
            "user",
            "merchant",
            "job",
            "property",
            "event",
          ].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Reported By (phone)</Label>
        <Input
          value={reportedBy}
          onChange={(e) => setReportedBy(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Reason *</Label>
        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="h-8 text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Flagging…" : "Flag Content"}
      </Button>
    </form>
  );
}

function RecipeForm({
  onSave,
  saving,
}: {
  onSave: (d: {
    title: string;
    category: string;
    ingredients: string;
    instructions: string;
  }) => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title, category, ingredients, instructions });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Recipe Title *</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Category</Label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Ingredients (one per line)</Label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full min-h-[80px] px-3 py-2 rounded-md border border-border bg-muted/30 text-sm text-foreground resize-none"
          placeholder="e.g. 2 cups flour&#10;1 tsp salt"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Instructions</Label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full min-h-[80px] px-3 py-2 rounded-md border border-border bg-muted/30 text-sm text-foreground resize-none"
          placeholder="Step by step instructions…"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Save Recipe"}
      </Button>
    </form>
  );
}

// ─── Healthcare Provider Form ────────────────────────────────────────────────
function HealthcareProviderForm({
  initial,
  onSave,
  saving,
}: {
  initial?: Record<string, unknown>;
  onSave: (d: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [name, setName] = useState(
    String(initial?.Name ?? initial?.name ?? ""),
  );
  const [specialization, setSpecialization] = useState(
    String(initial?.Specialization ?? initial?.specialization ?? ""),
  );
  const [location, setLocation] = useState(
    String(initial?.Location ?? initial?.location ?? ""),
  );
  const [phone, setPhone] = useState(
    String(initial?.Phone ?? initial?.phone ?? ""),
  );
  const [availableDays, setAvailableDays] = useState(
    String(initial?.["Available Days"] ?? initial?.availableDays ?? ""),
  );
  const [fee, setFee] = useState(String(safeCount(initial?.fee)));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          name,
          specialization,
          location,
          phone,
          availableDays,
          fee: Number(fee),
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Name *</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Dr. Ravi Kumar"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Specialization *</Label>
        <Input
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="General Physician"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Location</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-8 text-sm"
          placeholder="Mumbai"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Phone</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Available Days</Label>
        <Input
          value={availableDays}
          onChange={(e) => setAvailableDays(e.target.value)}
          className="h-8 text-sm"
          placeholder="Mon-Sat"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Consultation Fee (₹)</Label>
        <Input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="h-8 text-sm"
          min="0"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : initial?._id ? "Save Changes" : "Add Provider"}
      </Button>
    </form>
  );
}

// ─── Tour Operator Form ───────────────────────────────────────────────────────
const TOUR_TYPES = [
  "Day Trip",
  "Multi-Day",
  "Adventure",
  "Cultural",
  "Religious",
  "Wildlife",
  "Beach",
  "Hill Station",
  "Other",
];

function TourOperatorForm({
  initial,
  onSave,
  saving,
}: {
  initial?: Record<string, unknown>;
  onSave: (d: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [name, setName] = useState(
    String(initial?.Name ?? initial?.name ?? ""),
  );
  const [destination, setDestination] = useState(
    String(initial?.Destination ?? initial?.destination ?? ""),
  );
  const [tourType, setTourType] = useState(
    String(initial?.Type ?? initial?.tourType ?? TOUR_TYPES[0]),
  );
  const [duration, setDuration] = useState(
    String(initial?.Duration ?? initial?.duration ?? ""),
  );
  const [price, setPrice] = useState(String(safeCount(initial?.price)));
  const [phone, setPhone] = useState(
    String(initial?.Phone ?? initial?.phone ?? ""),
  );
  const [description, setDescription] = useState(
    String(initial?.description ?? ""),
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          name,
          destination,
          tourType,
          duration,
          price: Number(price),
          phone,
          description,
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Operator Name *</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Explore India Tours"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Destination *</Label>
        <Input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Goa, Kerala, Himachal…"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Tour Type</Label>
        <select
          value={tourType}
          onChange={(e) => setTourType(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {TOUR_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Duration</Label>
        <Input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="h-8 text-sm"
          placeholder="3 Days / 2 Nights"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Price (₹ per person)</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-8 text-sm"
          min="0"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Phone</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-8 text-sm"
          placeholder="Brief tour details…"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : initial?._id ? "Save Changes" : "Add Tour"}
      </Button>
    </form>
  );
}

// ─── Professional Service Form ────────────────────────────────────────────────
const PROF_SERVICE_TYPES = [
  "Doctor",
  "Nurse",
  "Physiotherapist",
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Cleaner",
  "Driver",
  "Cook",
  "Teacher",
  "Personal Trainer",
  "Yoga Instructor",
  "Masseur",
  "Other",
];

function ProfessionalServiceForm({
  initial,
  onSave,
  saving,
}: {
  initial?: Record<string, unknown>;
  onSave: (d: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [name, setName] = useState(
    String(initial?.Name ?? initial?.name ?? ""),
  );
  const [serviceType, setServiceType] = useState(
    String(
      initial?.["Service Type"] ??
        initial?.serviceType ??
        PROF_SERVICE_TYPES[0],
    ),
  );
  const [location, setLocation] = useState(
    String(initial?.Location ?? initial?.location ?? ""),
  );
  const [phone, setPhone] = useState(
    String(initial?.Phone ?? initial?.phone ?? ""),
  );
  const [experience, setExperience] = useState(
    String(initial?.Experience ?? initial?.experience ?? ""),
  );
  const [hourlyRate, setHourlyRate] = useState(
    String(safeCount(initial?.hourlyRate)),
  );
  const [description, setDescription] = useState(
    String(initial?.description ?? ""),
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          name,
          serviceType,
          location,
          phone,
          experience,
          hourlyRate: Number(hourlyRate),
          description,
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Full Name *</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Ramesh Gupta"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Service Type</Label>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {PROF_SERVICE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Location</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-8 text-sm"
          placeholder="Mumbai"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Phone</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Experience</Label>
        <Input
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="h-8 text-sm"
          placeholder="5 years"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Hourly Rate (₹)</Label>
        <Input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          className="h-8 text-sm"
          min="0"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-8 text-sm"
          placeholder="Brief description of services…"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : initial?._id ? "Save Changes" : "Add Service"}
      </Button>
    </form>
  );
}

function AdhocJobForm({
  onSave,
  saving,
}: {
  onSave: (d: {
    title: string;
    description: string;
    location: string;
    budget: number;
    category: string;
  }) => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("0");
  const [category, setCategory] = useState("General");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          title,
          description,
          location,
          budget: Number(budget),
          category,
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Job Title *</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Location</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Budget (₹)</Label>
        <Input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Category</Label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Posting…" : "Post Job"}
      </Button>
    </form>
  );
}

// ─── Donation Form ────────────────────────────────────────────────────────────
function DonationForm({
  onSave,
  saving,
}: {
  onSave: (d: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [category, setCategory] = useState("Food Items");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [location, setLocation] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          category,
          description,
          quantity,
          location,
          donorName,
          donorPhone,
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Category *</Label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {["Food Items", "Clothes", "Books"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Description *</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="e.g. 5kg rice, good condition"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Quantity</Label>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="h-8 text-sm"
          placeholder="e.g. 10 kg / 5 books"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Location *</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="City / Area"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Donor Name *</Label>
        <Input
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Donor Phone *</Label>
        <Input
          value={donorPhone}
          onChange={(e) => setDonorPhone(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Adding…" : "Add Donation"}
      </Button>
    </form>
  );
}

// ─── Donation Request Form ─────────────────────────────────────────────────────
function DonationRequestForm({
  onSave,
  saving,
}: {
  onSave: (d: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [category, setCategory] = useState("Food Items");
  const [description, setDescription] = useState("");
  const [quantityNeeded, setQuantityNeeded] = useState("1");
  const [location, setLocation] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [requesterPhone, setRequesterPhone] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          category,
          description,
          quantityNeeded,
          location,
          requesterName,
          requesterPhone,
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Category *</Label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {["Food Items", "Clothes", "Books"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Description *</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="What you need"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Quantity Needed</Label>
        <Input
          value={quantityNeeded}
          onChange={(e) => setQuantityNeeded(e.target.value)}
          className="h-8 text-sm"
          placeholder="e.g. 5 kg / 3 books"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Location *</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="City / Area"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Requester Name *</Label>
        <Input
          value={requesterName}
          onChange={(e) => setRequesterName(e.target.value)}
          required
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Requester Phone *</Label>
        <Input
          value={requesterPhone}
          onChange={(e) => setRequesterPhone(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Requesting…" : "Submit Request"}
      </Button>
    </form>
  );
}

// ─── Community Service Forms ─────────────────────────────────────────────────

function CommunityParkingForm({
  onSave,
  saving,
}: { onSave: (d: Record<string, unknown>) => void; saving: boolean }) {
  const [memberPhone, setMemberPhone] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [parkingType, setParkingType] = useState("open");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cost, setCost] = useState("0");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          memberPhone,
          communityId,
          parkingType,
          startDate,
          endDate,
          cost: Number(cost),
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Member Phone *</Label>
        <Input
          value={memberPhone}
          onChange={(e) => setMemberPhone(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">
          Community ID (city:location) *
        </Label>
        <Input
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Gandhidham:Sector7"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Parking Type</Label>
        <select
          value={parkingType}
          onChange={(e) => setParkingType(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          <option value="open">Open</option>
          <option value="covered">Covered</option>
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Start Date</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">End Date</Label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Monthly Cost (₹)</Label>
        <Input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Create Booking"}
      </Button>
    </form>
  );
}

function CommunityRoomForm({
  onSave,
  saving,
}: { onSave: (d: Record<string, unknown>) => void; saving: boolean }) {
  const [memberPhone, setMemberPhone] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [facilityType, setFacilityType] = useState("Clubhouse");
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("09:00-11:00");
  const [description, setDescription] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          memberPhone,
          communityId,
          facilityType,
          bookingDate,
          timeSlot,
          description,
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Member Phone *</Label>
        <Input
          value={memberPhone}
          onChange={(e) => setMemberPhone(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">
          Community ID (city:location) *
        </Label>
        <Input
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Gandhidham:Sector7"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Facility Type</Label>
        <select
          value={facilityType}
          onChange={(e) => setFacilityType(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {[
            "Clubhouse",
            "Party Hall",
            "Meeting Room",
            "Gym",
            "Swimming Pool",
            "Terrace",
            "Garden",
          ].map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Booking Date</Label>
        <Input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Time Slot</Label>
        <Input
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="h-8 text-sm"
          placeholder="e.g. 10:00-12:00"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Description / Purpose</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-8 text-sm"
          placeholder="Birthday party, meeting…"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Create Booking"}
      </Button>
    </form>
  );
}

function CommunityFoodOrderForm({
  onSave,
  saving,
}: { onSave: (d: Record<string, unknown>) => void; saving: boolean }) {
  const [buyerPhone, setBuyerPhone] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [cuisineType, setCuisineType] = useState("Indian");
  const [dietary, setDietary] = useState("none");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [cost, setCost] = useState("0");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          buyerPhone,
          sellerPhone,
          communityId,
          mealDescription,
          cuisineType,
          dietary,
          deliveryTime,
          quantity: Number(quantity),
          cost: Number(cost),
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Buyer Phone *</Label>
        <Input
          value={buyerPhone}
          onChange={(e) => setBuyerPhone(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Seller Phone *</Label>
        <Input
          value={sellerPhone}
          onChange={(e) => setSellerPhone(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">
          Community ID (city:location) *
        </Label>
        <Input
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Gandhidham:Sector7"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Meal Description *</Label>
        <Input
          value={mealDescription}
          onChange={(e) => setMealDescription(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="e.g. Dal rice, roti sabzi"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Cuisine Type</Label>
        <select
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {[
            "Indian",
            "Chinese",
            "Continental",
            "South Indian",
            "North Indian",
            "Street Food",
          ].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Dietary</Label>
        <select
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {["none", "vegetarian", "vegan", "jain", "non-vegetarian"].map(
            (d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ),
          )}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Delivery Time</Label>
        <Input
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          className="h-8 text-sm"
          placeholder="e.g. 1:00 PM"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Quantity</Label>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Cost (₹)</Label>
        <Input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Place Food Order"}
      </Button>
    </form>
  );
}

function CommunityWorkOrderForm({
  onSave,
  saving,
}: { onSave: (d: Record<string, unknown>) => void; saving: boolean }) {
  const [memberPhone, setMemberPhone] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [serviceType, setServiceType] = useState("Plumbing");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          memberPhone,
          communityId,
          serviceType,
          description,
          scheduledDate,
        });
      }}
      className="space-y-3"
    >
      <div>
        <Label className="text-xs mb-1 block">Member Phone *</Label>
        <Input
          value={memberPhone}
          onChange={(e) => setMemberPhone(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">
          Community ID (city:location) *
        </Label>
        <Input
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Gandhidham:Sector7"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Service Type *</Label>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full h-8 px-2 rounded border border-border bg-muted/30 text-sm text-foreground"
        >
          {[
            "Plumbing",
            "Electrical",
            "Carpentry",
            "Cleaning",
            "Pest Control",
            "Painting",
            "CCTV/Security",
            "Lift Maintenance",
            "Garden Maintenance",
            "Society Manager",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs mb-1 block">Description *</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="h-8 text-sm"
          placeholder="Describe the issue or service needed"
        />
      </div>
      <div>
        <Label className="text-xs mb-1 block">Scheduled Date</Label>
        <Input
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={saving} className="w-full">
        {saving ? "Saving…" : "Create Work Order"}
      </Button>
    </form>
  );
}

// ─── Market Search Detail Modal ────────────────────────────────────────────────
function MarketSearchDetailModal({
  row,
  onClose,
}: {
  row: Record<string, unknown>;
  onClose: () => void;
}) {
  const raw = row._raw as Record<string, unknown>;
  const results = Array.isArray(raw?.results)
    ? (raw.results as Record<string, unknown>[])
    : [];
  const recs = Array.isArray(raw?.recommendations)
    ? (raw.recommendations as Record<string, unknown>[])
    : [];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              {String(raw?.scriptName ?? "Market Search")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {String(raw?.country ?? "")} · {String(row.searchedAt ?? "")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <ScrollArea className="flex-1 min-h-0 px-5 py-4">
          {results.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Results ({results.length})
              </h4>
              <div className="space-y-2">
                {results.map((r, i) => (
                  <div
                    key={`res-${i}-${String(r.symbol ?? r.name ?? "")}`}
                    className="p-3 rounded-lg bg-muted/30 border border-border text-xs"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-foreground">
                        {String(r.symbol ?? r.name ?? r.ticker ?? "—")}
                      </span>
                      <span className="text-muted-foreground">
                        {String(r.exchange ?? "")}
                      </span>
                    </div>
                    <div className="flex gap-4 text-muted-foreground">
                      <span>
                        Price:{" "}
                        <strong className="text-foreground">
                          {String(r.price ?? r.currentPrice ?? "—")}
                        </strong>
                      </span>
                      {Boolean(r.change != null) && (
                        <span>
                          Change:{" "}
                          <strong
                            className={
                              String(r.change).startsWith("-")
                                ? "text-destructive"
                                : "text-green-600"
                            }
                          >
                            {String(r.change)}
                          </strong>
                        </span>
                      )}
                      {Boolean(r.type != null) && (
                        <span>Type: {String(r.type)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {recs.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Recommendations ({recs.length})
              </h4>
              <div className="space-y-2">
                {recs.map((rec, i) => (
                  <div
                    key={`rec-${i}-${String(rec.symbol ?? rec.asset ?? "")}`}
                    className="p-3 rounded-lg border text-xs"
                    style={{
                      borderColor:
                        String(rec.action) === "buy"
                          ? "oklch(0.7 0.2 145)"
                          : String(rec.action) === "sell"
                            ? "oklch(0.65 0.22 25)"
                            : undefined,
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">
                        {String(rec.symbol ?? rec.asset ?? "—")}
                      </span>
                      <Badge
                        variant={
                          String(rec.action).toLowerCase() === "buy"
                            ? "default"
                            : "destructive"
                        }
                        className="text-[10px] uppercase"
                      >
                        {String(rec.action ?? "—")}
                      </Badge>
                    </div>
                    {Boolean(rec.stopLoss != null) && (
                      <p className="text-muted-foreground mt-1">
                        Stop Loss: <strong>{String(rec.stopLoss)}</strong>
                      </p>
                    )}
                    {Boolean(rec.reason != null) && (
                      <p className="text-muted-foreground mt-0.5">
                        {String(rec.reason)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {results.length === 0 && recs.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-8">
              No results stored for this search.
            </p>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DataExplorerPage() {
  const { actor } = useBackendActor();
  const llHook = useLanguageLearning();
  // Inject language learning methods into module-level _ll so ENTITIES closures work
  Object.assign(_ll, {
    getLanguageCoursesForDataExplorer: llHook.getLanguageCoursesForDataExplorer,
    getLessonsForDataExplorer: llHook.getLessonsForDataExplorer,
    getEnrollmentsForDataExplorer: llHook.getEnrollmentsForDataExplorer,
    getCourseApprovalsForDataExplorer: llHook.getCourseApprovalsForDataExplorer,
    getWordDefinitionsForDataExplorer: llHook.getWordDefinitionsForDataExplorer,
    getDailyLessonsForDataExplorer: llHook.getDailyLessonsForDataExplorer,
  });
  const [selectedKey, setSelectedKey] = useState<EntityKey>("users");
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [rawData, setRawData] = useState<unknown[]>([]);
  const [fetched, setFetched] = useState(false);
  const [activeTab, setActiveTab] = useState<"table" | "json">("table");

  // Modal state
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [modalRow, setModalRow] = useState<Record<string, unknown> | null>(
    null,
  );
  const [saving, setSaving] = useState(false);
  const [statusSavingId, setStatusSavingId] = useState<string | null>(null);
  const [marketSearchDetailRow, setMarketSearchDetailRow] = useState<Record<
    string,
    unknown
  > | null>(null);

  const entity = [...ENTITIES, ...LANGUAGE_LEARNING_ENTITIES].find(
    (e) => e.key === selectedKey,
  )!;

  // Mutation hooks
  const addCity = useAddCity();
  const updateCity = useUpdateCity();
  const deleteCity = useDeleteCity();
  const saveCityControl = useSaveCityControl();
  const createRestockOrder = useCreateRestockOrderAdmin();
  const updateMarketplaceItem = useUpdateMarketplaceItemAdmin();
  const createMarketplaceItem = useCreateMarketplaceItem();
  const deleteMarketplaceItem = useDeleteMarketplaceItemAdmin();
  const deleteRestockOrder = useDeleteRestockOrderAdmin();
  const updateRestockStatus = useUpdateRestockStatus();
  const createModerationItem = useCreateModerationItemAdmin();
  const updateModerationStatus = useUpdateModerationItemStatusAdmin();
  const deleteModerationItem = useDeleteModerationItemAdmin();
  const updateTicketStatus = useUpdateSupportTicketStatus();
  const deleteTicket = useDeleteSupportTicketAdmin();
  const createRecipe = useCreateRecipe();
  const deleteRecipe = useDeleteRecipe();
  const createAdhocJob = useCreateAdhocJobAdmin();
  const updateAdhocJobStatus = useUpdateAdhocJobStatusAdmin();
  const deleteAdhocJob = useDeleteAdhocJobAdmin();

  async function fetchEntity(key: EntityKey) {
    if (!actor) {
      toast.error(
        "Backend not connected yet — please wait a moment and try again",
      );
      return;
    }
    setLoading(true);
    setFetched(false);
    setRows([]);
    setRawData([]);
    try {
      const def = [...ENTITIES, ...LANGUAGE_LEARNING_ENTITIES].find(
        (e) => e.key === key,
      )!;
      const actorAny = actor as unknown as Record<string, unknown>;
      const raw = await def.fetchFn(actorAny);
      const safeRaw = Array.isArray(raw) ? raw : [];
      setRawData(safeRaw);
      setRows(safeRaw.map(def.mapRow));
      setFetched(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      // Distinguish between JS runtime errors (method not on actor) and real backend errors
      const isRuntimeError =
        msg.includes("errorDetail") ||
        msg.includes("Cannot read properties") ||
        msg.includes("is not a function") ||
        msg.includes("not a function") ||
        msg.includes("undefined");
      if (isRuntimeError) {
        // Backend method not yet deployed — show empty state quietly, no scary toast
        setFetched(true);
        setRows([]);
        setRawData([]);
      } else {
        toast.error(`Failed to fetch ${key}: ${msg}`);
        setFetched(true);
        setRows([]);
        setRawData([]);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSelectEntity(key: EntityKey) {
    setSelectedKey(key);
    setSearch("");
    setFetched(false);
    setRows([]);
    setRawData([]);
    fetchEntity(key);
  }

  function copyJson() {
    const text = JSON.stringify(
      rawData,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      2,
    );
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard"));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this record? This cannot be undone.")) return;
    try {
      if (selectedKey === "cities") await deleteCity.mutateAsync(id);
      else if (selectedKey === "restockOrders")
        await deleteRestockOrder.mutateAsync(id);
      else if (selectedKey === "marketplaceItems")
        await deleteMarketplaceItem.mutateAsync(id);
      else if (selectedKey === "moderationQueue")
        await deleteModerationItem.mutateAsync(id);
      else if (selectedKey === "supportTickets")
        await deleteTicket.mutateAsync(id);
      else if (selectedKey === "recipes") await deleteRecipe.mutateAsync(id);
      else if (selectedKey === "adhocJobs")
        await deleteAdhocJob.mutateAsync(id);
      else if (selectedKey === "healthcareProviders") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteHealthcareProvider as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "tourOperators") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteTourOperator as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "professionalServices") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteProfessionalService as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "healthcareAppointments") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteHealthcareAppointment as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "tourBookings") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteTourBooking as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "serviceBookings") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteServiceBooking as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "donations") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteDonation as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "donationRequests") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteDonationRequest as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "marketSearches") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.deleteMarketSearch as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      } else if (selectedKey === "communityMembers") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.removeCommunityMember as
          | ((phone: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id);
      }
      toast.success("Record deleted");
      fetchEntity(selectedKey);
    } catch (err) {
      toast.error(
        `Delete failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  async function handleStatusUpdate(id: string, status: string) {
    setStatusSavingId(id);
    try {
      if (selectedKey === "restockOrders") {
        await updateRestockStatus.mutateAsync({
          orderId: id,
          status: status as "pending" | "accepted" | "delivered" | "cancelled",
        });
      } else if (selectedKey === "moderationQueue") {
        await updateModerationStatus.mutateAsync({
          id,
          status,
          reviewedBy: "admin",
          notes: "",
        });
      } else if (selectedKey === "supportTickets") {
        await updateTicketStatus.mutateAsync({ id, status });
      } else if (selectedKey === "adhocJobs") {
        await updateAdhocJobStatus.mutateAsync({ id, status });
      } else if (selectedKey === "donations") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.updateDonationStatus as
          | ((id: string, status: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id, status);
      } else if (selectedKey === "donationRequests") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.updateDonationRequestStatus as
          | ((id: string, status: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id, status);
      } else if (selectedKey === "communityParkingBookings") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.updateCommunityParkingBookingStatus as
          | ((id: string, status: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id, status);
      } else if (selectedKey === "communityRoomBookings") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.updateCommunityRoomBookingStatus as
          | ((id: string, status: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id, status);
      } else if (selectedKey === "communityFoodOrders") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.updateCommunityFoodOrderStatus as
          | ((id: string, status: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id, status);
      } else if (selectedKey === "communityWorkOrders") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.updateCommunityWorkOrderStatus as
          | ((id: string, status: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") await fn(id, status);
      }
      fetchEntity(selectedKey);
    } catch (err) {
      toast.error(
        `Update failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setStatusSavingId(null);
    }
  }

  async function handleModalSave(data: Record<string, unknown>) {
    setSaving(true);
    try {
      if (selectedKey === "cities") {
        if (modalMode === "edit" && modalRow?._id) {
          await updateCity.mutateAsync({
            id: String(modalRow._id),
            name: String(data.name),
            pincodes: String(data.pincodes),
          });
        } else {
          await addCity.mutateAsync({
            name: String(data.name),
            pincode: String(data.pincodes),
          });
        }
      } else if (selectedKey === "cityControls") {
        await saveCityControl.mutateAsync({
          cityId: String(data.cityId),
          moduleName: String(data.moduleName),
          enabled: Boolean(data.enabled),
        });
      } else if (selectedKey === "restockOrders") {
        await createRestockOrder.mutateAsync({
          merchantId: String(data.merchantId),
          supplierName: String(data.supplierName),
          itemName: String(data.itemName),
          quantity: Number(data.quantity),
          notes: String(data.notes ?? ""),
        });
      } else if (selectedKey === "marketplaceItems" && modalMode === "add") {
        await createMarketplaceItem.mutateAsync({
          title: String(data.title),
          price: Number(data.price),
          category: String(data.category),
          listingType: String(data.listingType),
          yearOfManufacture: data.yearOfManufacture as bigint,
          instagramPhotoLink: "",
          invoiceAvailable: false,
          createdBy: "admin",
        });
      } else if (
        selectedKey === "marketplaceItems" &&
        modalMode === "edit" &&
        modalRow?._id
      ) {
        await updateMarketplaceItem.mutateAsync({
          id: String(modalRow._id),
          title: String(data.title),
          price: Number(data.price),
          status: String(data.status),
        });
      } else if (selectedKey === "moderationQueue") {
        await createModerationItem.mutateAsync({
          contentId: String(data.contentId),
          contentType: String(data.contentType),
          reportedBy: String(data.reportedBy),
          reason: String(data.reason),
        });
      } else if (selectedKey === "recipes") {
        const ingredientLines = String(data.ingredients)
          .split("\n")
          .filter(Boolean);
        const steps = String(data.instructions).split("\n").filter(Boolean);
        await createRecipe.mutateAsync({
          ownerId: "admin",
          title: String(data.title),
          ingredients: ingredientLines.map((l) => ({ name: l, grams: 0 })),
          steps,
          imageLink: "",
          videoLink: "",
          benefits: String(data.category),
          tips: "",
        });
      } else if (selectedKey === "adhocJobs") {
        await createAdhocJob.mutateAsync({
          title: String(data.title),
          description: String(data.description),
          location: String(data.location),
          budget: Number(data.budget),
          category: String(data.category),
        });
      } else if (selectedKey === "healthcareProviders") {
        const actorAny = actor as unknown as Record<string, unknown>;
        if (modalMode === "edit" && modalRow?._id) {
          const fn = actorAny.updateHealthcareProvider as
            | ((
                id: string,
                name: string,
                spec: string,
                loc: string,
                phone: string,
                days: string,
                fee: bigint,
              ) => Promise<unknown>)
            | undefined;
          if (typeof fn === "function")
            await fn(
              String(modalRow._id),
              String(data.name),
              String(data.specialization),
              String(data.location),
              String(data.phone),
              String(data.availableDays),
              BigInt(Number(data.fee)),
            );
        } else {
          const fn = actorAny.addHealthcareProvider as
            | ((
                name: string,
                spec: string,
                loc: string,
                phone: string,
                days: string,
                fee: bigint,
              ) => Promise<unknown>)
            | undefined;
          if (typeof fn === "function")
            await fn(
              String(data.name),
              String(data.specialization),
              String(data.location),
              String(data.phone),
              String(data.availableDays),
              BigInt(Number(data.fee)),
            );
        }
      } else if (selectedKey === "tourOperators") {
        const actorAny = actor as unknown as Record<string, unknown>;
        if (modalMode === "edit" && modalRow?._id) {
          const fn = actorAny.updateTourOperator as
            | ((
                id: string,
                name: string,
                dest: string,
                type: string,
                dur: string,
                price: bigint,
                phone: string,
                desc: string,
              ) => Promise<unknown>)
            | undefined;
          if (typeof fn === "function")
            await fn(
              String(modalRow._id),
              String(data.name),
              String(data.destination),
              String(data.tourType),
              String(data.duration),
              BigInt(Number(data.price)),
              String(data.phone),
              String(data.description),
            );
        } else {
          const fn = actorAny.addTourOperator as
            | ((
                name: string,
                dest: string,
                type: string,
                dur: string,
                price: bigint,
                phone: string,
                desc: string,
              ) => Promise<unknown>)
            | undefined;
          if (typeof fn === "function")
            await fn(
              String(data.name),
              String(data.destination),
              String(data.tourType),
              String(data.duration),
              BigInt(Number(data.price)),
              String(data.phone),
              String(data.description),
            );
        }
      } else if (selectedKey === "professionalServices") {
        const actorAny = actor as unknown as Record<string, unknown>;
        if (modalMode === "edit" && modalRow?._id) {
          const fn = actorAny.updateProfessionalService as
            | ((
                id: string,
                name: string,
                type: string,
                loc: string,
                phone: string,
                exp: string,
                rate: bigint,
                desc: string,
              ) => Promise<unknown>)
            | undefined;
          if (typeof fn === "function")
            await fn(
              String(modalRow._id),
              String(data.name),
              String(data.serviceType),
              String(data.location),
              String(data.phone),
              String(data.experience),
              BigInt(Number(data.hourlyRate)),
              String(data.description),
            );
        } else {
          const fn = actorAny.addProfessionalService as
            | ((
                name: string,
                type: string,
                loc: string,
                phone: string,
                exp: string,
                rate: bigint,
                desc: string,
              ) => Promise<unknown>)
            | undefined;
          if (typeof fn === "function")
            await fn(
              String(data.name),
              String(data.serviceType),
              String(data.location),
              String(data.phone),
              String(data.experience),
              BigInt(Number(data.hourlyRate)),
              String(data.description),
            );
        }
      } else if (selectedKey === "donations") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.addDonation as
          | ((
              cat: string,
              desc: string,
              qty: string,
              loc: string,
              contact: string,
              donorPhone: string,
              donorName: string,
              source: string,
            ) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function")
          await fn(
            String(data.category),
            String(data.description),
            String(data.quantity),
            String(data.location),
            String(data.donorPhone),
            String(data.donorPhone),
            String(data.donorName),
            "dashboard",
          );
      } else if (selectedKey === "donationRequests") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.requestDonation as
          | ((
              cat: string,
              desc: string,
              qty: string,
              loc: string,
              reqPhone: string,
              reqName: string,
              source: string,
            ) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function")
          await fn(
            String(data.category),
            String(data.description),
            String(data.quantityNeeded),
            String(data.location),
            String(data.requesterPhone),
            String(data.requesterName),
            "dashboard",
          );
      } else if (selectedKey === "communityParkingBookings") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.createCommunityParkingBooking as
          | ((d: Record<string, unknown>) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function")
          await fn({
            memberPhone: String(data.memberPhone),
            communityId: String(data.communityId),
            parkingType: String(data.parkingType ?? "open"),
            startDate: String(data.startDate),
            endDate: String(data.endDate),
            cost: Number(data.cost ?? 0),
            status: "pending",
          });
      } else if (selectedKey === "communityRoomBookings") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.createCommunityRoomBooking as
          | ((d: Record<string, unknown>) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function")
          await fn({
            memberPhone: String(data.memberPhone),
            communityId: String(data.communityId),
            facilityType: String(data.facilityType),
            bookingDate: String(data.bookingDate),
            timeSlot: String(data.timeSlot),
            description: String(data.description ?? ""),
            status: "pending",
          });
      } else if (selectedKey === "communityFoodOrders") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.createCommunityFoodOrder as
          | ((d: Record<string, unknown>) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function")
          await fn({
            buyerPhone: String(data.buyerPhone),
            sellerPhone: String(data.sellerPhone),
            communityId: String(data.communityId),
            mealDescription: String(data.mealDescription),
            cuisineType: String(data.cuisineType ?? "Indian"),
            dietary: String(data.dietary ?? "none"),
            deliveryTime: String(data.deliveryTime ?? ""),
            quantity: Number(data.quantity ?? 1),
            cost: Number(data.cost ?? 0),
            status: "pending",
          });
      } else if (selectedKey === "communityWorkOrders") {
        const actorAny = actor as unknown as Record<string, unknown>;
        const fn = actorAny.createCommunityWorkOrder as
          | ((d: Record<string, unknown>) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function")
          await fn({
            memberPhone: String(data.memberPhone),
            communityId: String(data.communityId),
            serviceType: String(data.serviceType),
            description: String(data.description),
            scheduledDate: String(data.scheduledDate ?? ""),
            status: "pending",
          });
      }
      setModalRow(null);
      fetchEntity(selectedKey);
    } catch (err) {
      toast.error(
        `Save failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setSaving(false);
    }
  }

  // Tables that support source field
  const SOURCE_TABLES: EntityKey[] = [
    "users",
    "orders",
    "adhocJobs",
    "marketplaceItems",
    "supportTickets",
    "restockOrders",
    "donations",
    "donationRequests",
  ];
  const showSourceFilter = SOURCE_TABLES.includes(selectedKey);

  const filtered = rows.filter((r) => {
    const matchSearch =
      !search ||
      Object.values(r).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase()),
      );
    const matchSource =
      !showSourceFilter ||
      sourceFilter === "All Sources" ||
      String(r.source ?? "").toLowerCase() === sourceFilter.toLowerCase();
    return matchSearch && matchSource;
  });

  const displayCols = entity.columns;
  const actionCols =
    entity.canEdit || entity.canDelete || entity.canStatusUpdate;

  return (
    <div
      className="flex h-[calc(100vh-64px)] overflow-hidden"
      data-ocid="data_explorer.page"
    >
      {/* Left sidebar */}
      <aside className="w-52 shrink-0 border-r border-border bg-card overflow-y-auto flex flex-col">
        <div className="px-3 py-3 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              Data Explorer
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Live backend query viewer
          </p>
        </div>
        <nav className="py-2 px-2 flex-1 overflow-y-auto">
          {[...ENTITIES, ...LANGUAGE_LEARNING_ENTITIES].map((ent) => {
            const Icon = ent.icon;
            const isActive = selectedKey === ent.key;
            return (
              <button
                type="button"
                key={ent.key}
                onClick={() => handleSelectEntity(ent.key)}
                data-ocid={`data_explorer.entity.${ent.key}`}
                className={[
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all text-left mb-0.5",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{ent.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col bg-background overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card flex-shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {(() => {
              const Icon = entity.icon;
              return <Icon className="w-4 h-4 text-primary shrink-0" />;
            })()}
            <h2 className="font-semibold text-sm text-foreground">
              {entity.label}
            </h2>
            {fetched && (
              <Badge variant="secondary" className="text-xs tabular-nums">
                {Math.max(0, filtered.length)}&nbsp;record
                {filtered.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {entity.canAdd && fetched && (
              <Button
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={() => {
                  setModalMode("add");
                  setModalRow(null);
                }}
                data-ocid="data_explorer.add_button"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New
              </Button>
            )}
            {showSourceFilter && fetched && (
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="h-8 px-2 rounded border border-border bg-muted/30 text-xs text-foreground"
                data-ocid="data_explorer.source_filter"
              >
                {ALL_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Filter records…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs w-52"
                data-ocid="data_explorer.search_input"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => fetchEntity(selectedKey)}
              disabled={loading}
              data-ocid="data_explorer.refresh_button"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Loading…" : "Refresh"}
            </Button>
            {activeTab === "json" && fetched && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={copyJson}
                data-ocid="data_explorer.copy_json_button"
              >
                <ClipboardCopy className="w-3.5 h-3.5" />
                Copy JSON
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "table" | "json")}
          className="flex-1 min-h-0 flex flex-col overflow-hidden"
        >
          <TabsList className="h-9 rounded-none border-b border-border bg-muted/30 shrink-0 w-full justify-start px-4 gap-1">
            <TabsTrigger
              value="table"
              className="text-xs h-7"
              data-ocid="data_explorer.table_tab"
            >
              Table View
            </TabsTrigger>
            <TabsTrigger
              value="json"
              className="text-xs h-7"
              data-ocid="data_explorer.json_tab"
            >
              Raw JSON
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="table"
            className="flex-1 min-h-0 m-0 overflow-auto"
          >
            {!fetched && !loading ? (
              <div
                className="flex flex-col items-center justify-center h-full gap-3 text-center py-20"
                data-ocid="data_explorer.empty_state"
              >
                <Database className="w-12 h-12 text-muted-foreground/30" />
                <p className="text-muted-foreground text-sm font-medium">
                  Select an entity and click Load to explore backend data
                </p>
                <Button
                  size="sm"
                  onClick={() => fetchEntity(selectedKey)}
                  data-ocid="data_explorer.load_button"
                >
                  Load {entity.label}
                </Button>
              </div>
            ) : loading ? (
              <div className="p-4 space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                  <Skeleton key={i} className="h-10 w-full rounded" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-full gap-2 py-16"
                data-ocid="data_explorer.no_results_state"
              >
                <p className="text-muted-foreground text-sm font-medium">
                  {search
                    ? `No records matching "${search}"`
                    : `No ${entity.label.toLowerCase()} yet`}
                </p>
                {!search && (
                  <p className="text-muted-foreground text-xs">
                    {entity.canAdd
                      ? "Use the Add button to create the first record, or load sample data from the dashboard."
                      : "Records will appear here once data is created via chatbot or dashboard."}
                  </p>
                )}
                {search && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearch("")}
                  >
                    Clear search
                  </Button>
                )}
                {entity.canAdd && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setModalMode("add");
                      setModalRow(null);
                    }}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Add First {entity.label.replace(/s$/, "")}
                  </Button>
                )}
              </div>
            ) : (
              <table className="w-full text-xs" data-ocid="data_explorer.table">
                <thead className="sticky top-0 bg-muted/60 border-b border-border z-10">
                  <tr>
                    {displayCols.map((col) => (
                      <th
                        key={col}
                        className="text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                    {showSourceFilter && (
                      <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap">
                        Source
                      </th>
                    )}
                    {actionCols && (
                      <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => {
                    const rowId = String(row._id ?? "");
                    const rowStatus = String(row._status ?? "");
                    return (
                      <tr
                        // biome-ignore lint/suspicious/noArrayIndexKey: indexed rows
                        key={idx}
                        tabIndex={
                          selectedKey === "marketSearches" ? 0 : undefined
                        }
                        role={
                          selectedKey === "marketSearches"
                            ? "button"
                            : undefined
                        }
                        className={`border-b border-border/40 hover:bg-muted/20 transition-colors${selectedKey === "marketSearches" ? " cursor-pointer" : ""}`}
                        data-ocid={`data_explorer.row.${idx + 1}`}
                        onClick={
                          selectedKey === "marketSearches"
                            ? () => setMarketSearchDetailRow(row)
                            : undefined
                        }
                        onKeyDown={
                          selectedKey === "marketSearches"
                            ? (e) =>
                                e.key === "Enter" &&
                                setMarketSearchDetailRow(row)
                            : undefined
                        }
                      >
                        {displayCols.map((col) => (
                          <td
                            key={col}
                            className="py-2 px-3 font-mono text-foreground max-w-[200px] truncate whitespace-nowrap"
                            title={String(row[col] ?? "")}
                          >
                            {String(row[col] ?? "—")}
                          </td>
                        ))}
                        {showSourceFilter && (
                          <td className="py-2 px-3 whitespace-nowrap">
                            <SourceBadge source={String(row.source ?? "")} />
                          </td>
                        )}
                        {actionCols && (
                          <td className="py-2 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              {entity.canStatusUpdate &&
                                entity.statusOptions && (
                                  <InlineStatusSelect
                                    currentStatus={rowStatus}
                                    options={entity.statusOptions}
                                    onSave={(s) => handleStatusUpdate(rowId, s)}
                                    saving={statusSavingId === rowId}
                                  />
                                )}
                              {entity.canEdit && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-1.5"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalMode("edit");
                                    setModalRow(row);
                                  }}
                                  data-ocid={`data_explorer.edit_button.${idx + 1}`}
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                              )}
                              {selectedKey === "marketSearches" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-1.5 text-primary hover:text-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMarketSearchDetailRow(row);
                                  }}
                                  data-ocid={`data_explorer.view_button.${idx + 1}`}
                                  title="View search results & recommendations"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              )}
                              {entity.canDelete && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-1.5 text-destructive hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(rowId);
                                  }}
                                  data-ocid={`data_explorer.delete_button.${idx + 1}`}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </TabsContent>

          <TabsContent
            value="json"
            className="flex-1 min-h-0 m-0 overflow-hidden"
          >
            <ScrollArea className="h-full">
              {!fetched ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground text-sm">
                    Load data first using the Refresh button
                  </p>
                </div>
              ) : (
                <pre
                  className="p-4 text-xs font-mono text-foreground leading-relaxed whitespace-pre-wrap break-all"
                  data-ocid="data_explorer.json_output"
                >
                  {JSON.stringify(
                    rawData,
                    (_, v) => (typeof v === "bigint" ? v.toString() : v),
                    2,
                  )}
                </pre>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>

      {/* CRUD Modals */}
      {modalMode !== null && (
        <Modal
          title={`${modalMode === "add" ? "Add New" : "Edit"} ${entity.label.replace(/s$/, "")}`}
          onClose={() => {
            setModalMode(null);
            setModalRow(null);
          }}
        >
          {selectedKey === "cities" && (
            <CityForm
              initial={modalRow ?? undefined}
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "cityControls" && (
            <CityControlForm
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "restockOrders" && modalMode === "add" && (
            <RestockOrderForm
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "marketplaceItems" && (
            <MarketplaceItemForm
              initial={modalRow ?? undefined}
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "moderationQueue" && modalMode === "add" && (
            <ModerationFlagForm
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "recipes" && modalMode === "add" && (
            <RecipeForm onSave={(d) => handleModalSave(d)} saving={saving} />
          )}
          {selectedKey === "adhocJobs" && modalMode === "add" && (
            <AdhocJobForm onSave={(d) => handleModalSave(d)} saving={saving} />
          )}
          {selectedKey === "healthcareProviders" && (
            <HealthcareProviderForm
              initial={modalRow ?? undefined}
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "tourOperators" && (
            <TourOperatorForm
              initial={modalRow ?? undefined}
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "professionalServices" && (
            <ProfessionalServiceForm
              initial={modalRow ?? undefined}
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "donations" && modalMode === "add" && (
            <DonationForm onSave={(d) => handleModalSave(d)} saving={saving} />
          )}
          {selectedKey === "donationRequests" && modalMode === "add" && (
            <DonationRequestForm
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "communityParkingBookings" &&
            modalMode === "add" && (
              <CommunityParkingForm
                onSave={(d) => handleModalSave(d)}
                saving={saving}
              />
            )}
          {selectedKey === "communityRoomBookings" && modalMode === "add" && (
            <CommunityRoomForm
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "communityFoodOrders" && modalMode === "add" && (
            <CommunityFoodOrderForm
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
          {selectedKey === "communityWorkOrders" && modalMode === "add" && (
            <CommunityWorkOrderForm
              onSave={(d) => handleModalSave(d)}
              saving={saving}
            />
          )}
        </Modal>
      )}
      {marketSearchDetailRow !== null && (
        <MarketSearchDetailModal
          row={marketSearchDetailRow}
          onClose={() => setMarketSearchDetailRow(null)}
        />
      )}
    </div>
  );
}
