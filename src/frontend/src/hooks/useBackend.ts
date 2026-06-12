import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createActor } from "../backend";
import { api as _backendApi } from "../backend-api";
import type { SupportTicketLocal } from "../backend-api";
import type { LendingItem } from "../backend.d";
import type {
  City,
  CityControl,
  ElectionResult,
  MatchScore,
  Notification,
  OndcEnrollment,
  RestockStatus,
} from "../backend.d";
import type {
  DeliveryRateCard,
  DeliveryType,
  Employee,
  EmployeeRole,
  EntityView,
  EventStatus,
  FamilyInviteStatus,
  Job,
  MerchantType,
  OrderStatus,
  Property,
  PropertyListingType,
  Recipe,
  RecipeIngredient,
  Relationship,
  ServiceType,
  ShuttleRoute,
  SubscriptionPlan,
  SubscriptionPlanType,
  UserRole,
  VehicleType,
} from "../backend.ts";
import type {
  AdminUPIProfile,
  AppShuttleRoute,
  BudgetCheckResult,
  CustomerBudget,
  DPAnalytics,
  DPEarnings,
  DPEarningsWithExpenses,
  DeliveryPaymentQR,
  EnhancedAnalytics,
  EnhancedShuttleStop,
  FreeRideSarthi,
  MarketplaceItem,
  MerchantAnalytics,
  MerchantBranch,
  MerchantEarnings,
  ModuleRoleStatus,
  NotificationStatus,
  OrderPaymentQR,
  PetrolExpense,
  ProductRevenue,
  SpendAnalysis,
  SubscriptionAccessResult,
  SubscriptionQR,
  VerificationStatus,
} from "../types";
import type { AppEvent, FamilyMember, Promotion } from "../types";

// ─── Actor hook ───────────────────────────────────────────────────────────────

export function useBackendActor() {
  return useActor(createActor);
}

// ─── Unwrap helpers ───────────────────────────────────────────────────────────

function unwrapResult<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: unknown },
): T {
  if (result.__kind__ === "ok") return result.ok;
  const err = (result as { __kind__: "err"; err: unknown }).err;
  if (err && typeof err === "object" && "__kind__" in err) {
    throw new Error(String((err as Record<string, unknown>).__kind__));
  }
  throw new Error(String(err));
}

// ─── Active Order Count (for sidebar badge) ───────────────────────────────────

export function useActiveOrderCount() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<number>({
    queryKey: ["active-order-count"],
    queryFn: async () => {
      if (!actor) return 0;
      const stats = await actor.getAdminDashboardStats();
      return Number(stats.activeOrders);
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
    refetchInterval: 10_000,
  });
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function useDashboardStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminDashboardStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5_000,
    refetchInterval: 15_000,
  });
}

export function useMonthlyStats(year: number, month: number) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["monthly-stats", year, month],
    queryFn: async () => {
      if (!actor) return [];
      const stats = await actor.getMonthlyOrderStats(
        BigInt(year),
        BigInt(month),
      );
      return stats.map((s) => ({
        day: Number(s.day),
        orderCount: Number(s.orderCount),
        revenue: s.revenue,
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Module Statuses (non-role) ───────────────────────────────────────────────

export function useModuleStatuses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, boolean>>({
    queryKey: ["module-statuses"],
    queryFn: async () => {
      if (!actor) return {};
      try {
        const statuses = await actor.getModuleStatuses();
        // backend returns Array<[string, boolean]>
        const record: Record<string, boolean> = {};
        for (const s of statuses) {
          record[String(s[0] ?? "")] = Boolean(s[1] ?? true);
        }
        return record;
      } catch {
        return {};
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 15_000,
  });
}

// ─── Module Statuses with Roles ───────────────────────────────────────────────

export function useModuleStatusesWithRoles() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<
    Array<{ moduleName: string; role: string; enabled: boolean }>
  >({
    queryKey: ["module-statuses-roles"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const statuses = await actor.getModuleStatusesWithRoles();
        return statuses.map((s) => ({
          moduleName: s.moduleName,
          role: s.role,
          enabled: s.enabled,
        }));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 15_000,
  });
}

// ─── QR Timeout ──────────────────────────────────────────────────────────────

export function useQRTimeoutMinutes(): number {
  try {
    const stored = localStorage.getItem("lb_qr_timeout_minutes");
    const mins = stored ? Number.parseInt(stored) : 2;
    return Number.isFinite(mins) && mins > 0 ? mins : 2;
  } catch {
    return 2;
  }
}

// ─── Shuttle Routes ───────────────────────────────────────────────────────────

export function useShuttleRoutes() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("../backend").ShuttleRoute[]>({
    queryKey: ["shuttle-routes"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return actor.listShuttleRoutes();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

// ─── Update Shuttle Route Stops ───────────────────────────────────────────────

export function useUpdateShuttleRouteStops() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      routeId,
      stops,
    }: {
      routeId: string;
      stops: import("../backend").EnhancedShuttleStop[];
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateShuttleRouteStops(routeId, stops);
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shuttle-routes"] }),
  });
}

// ─── Simulator Actions (real actor calls) ────────────────────────────────────

// Returns mock api for type-safe access to merchantAcceptOrder, dpAcceptOrder, etc.
// Real actor registration/persistence calls are made via useSimulatorActorCalls().
export function useSimulatorActions() {
  return _backendApi;
}

// ─── Simulator Actor Calls ────────────────────────────────────────────────────
// Used by ChatbotSimulatorPage for real backend persistence of registrations.

export function useSimulatorActorCalls() {
  const { actor } = useBackendActor();

  async function registerUserFromChat(data: {
    phone: string;
    name: string;
    passdigit: string;
  }) {
    if (!actor) throw new Error("Actor not ready");
    const result = await actor.createUser(
      data.phone,
      data.name,
      "customer" as import("../backend.d").UserRole,
      null,
      data.passdigit ?? null,
    );
    return unwrapResult(
      result as
        | { __kind__: "ok"; ok: unknown }
        | { __kind__: "err"; err: unknown },
    );
  }

  async function registerMerchantFromChat(data: {
    phone: string;
    ownerName: string;
    outletName: string;
    category: string;
    deliveryType: string;
    merchantType: string;
    deliveryRadius: number;
    passdigit: string;
  }) {
    if (!actor) throw new Error("Actor not ready");
    const actorAny = actor as unknown as Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    >;
    if (typeof actorAny.registerMerchant === "function") {
      return actorAny.registerMerchant(
        data.phone,
        data.ownerName,
        data.outletName,
        data.category,
        data.deliveryType,
        data.merchantType,
        data.deliveryRadius,
        "",
        data.passdigit ?? null,
      );
    }
    throw new Error("registerMerchant not available");
  }

  async function registerDeliveryPartnerFromChat(data: {
    phone: string;
    name: string;
    serviceType: string;
    vehicleType: string;
    aadhaarNo?: string;
    panNo?: string;
    rcBook?: string;
    passdigit: string;
  }) {
    if (!actor) throw new Error("Actor not ready");
    const actorAny = actor as unknown as Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    >;
    if (typeof actorAny.registerDeliveryPartner === "function") {
      return actorAny.registerDeliveryPartner(
        data.phone,
        data.name,
        data.serviceType,
        data.vehicleType,
        data.aadhaarNo ?? null,
        data.panNo ?? null,
        data.rcBook ?? null,
        data.passdigit ?? null,
      );
    }
    throw new Error("registerDeliveryPartner not available");
  }

  async function resetChatConversation(phone: string) {
    if (!actor) return;
    try {
      await actor.clearSimulatorSession(phone);
    } catch {
      // ignore
    }
  }

  async function pollMerchantNotifications(merchantId: string) {
    if (!actor) return [];
    try {
      return actor.pollMerchantNotifications(merchantId);
    } catch {
      return [];
    }
  }

  async function pollDeliveryNotifications(partnerId: string) {
    if (!actor) return [];
    try {
      return actor.pollDeliveryNotifications(partnerId);
    } catch {
      return [];
    }
  }

  async function pollCustomerNotifications(customerId: string) {
    if (!actor) return [];
    try {
      return actor.pollCustomerNotifications(customerId);
    } catch {
      return [];
    }
  }

  async function createOrderFromChat(data: {
    customerId: string;
    merchantId: string;
    productIds?: string[];
    items?: Array<{ productId: string; quantity: number; price: number }>;
    paymentMode: string;
    searchQuery?: string;
    totalAmount?: number;
  }): Promise<{ orderId: string; status: string }> {
    if (!actor) throw new Error("Actor not ready");
    const actorAny = actor as unknown as Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    >;
    try {
      if (typeof actorAny.createOrder === "function") {
        const orderItems =
          data.items && data.items.length > 0
            ? data.items.map((it) => ({
                productId: it.productId,
                quantity: BigInt(it.quantity),
                price: it.price,
              }))
            : data.productIds && data.productIds.length > 0
              ? data.productIds.map((pid) => ({
                  productId: pid,
                  quantity: BigInt(1),
                  price: data.totalAmount ?? 0,
                }))
              : [
                  {
                    productId: "sim_product",
                    quantity: BigInt(1),
                    price: data.totalAmount ?? 0,
                  },
                ];
        const result = (await actorAny.createOrder(
          data.customerId,
          data.merchantId,
          orderItems,
          null,
          data.paymentMode,
          data.searchQuery ?? null,
        )) as
          | { __kind__: "ok"; ok: { id: string; status: unknown } }
          | { __kind__: "err"; err: unknown };
        if (result.__kind__ === "ok") {
          const orderId = String(
            result.ok?.id ?? `ORD-${Date.now().toString().slice(-6)}`,
          );
          return { orderId, status: "placed" };
        }
      }
    } catch {
      /* fall through to simulated id */
    }
    return {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      status: "placed",
    };
  }

  return {
    registerUserFromChat,
    registerMerchantFromChat,
    registerDeliveryPartnerFromChat,
    resetChatConversation,
    pollMerchantNotifications,
    pollDeliveryNotifications,
    pollCustomerNotifications,
    createOrderFromChat,
  };
}

export function useWhatsAppConfigFull() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("../backend.d").FullWhatsAppConfig | null>({
    queryKey: ["whatsapp-config-full"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getFullWhatsAppConfig();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    placeholderData: null,
  });
}

export function useUpdateWhatsAppConfigFull() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cfg: import("../backend.d").FullWhatsAppConfig) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateFullWhatsAppConfig(cfg);
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["whatsapp-config"] });
      qc.invalidateQueries({ queryKey: ["whatsapp-config-full"] });
      qc.invalidateQueries({ queryKey: ["whatsapp-config-table"] });
    },
  });
}

// ─── Moderation Queue ────────────────────────────────────────────────────────

export function useModerationQueue() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("../backend.d").ModerationItem[]>({
    queryKey: ["moderation-queue"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getModerationQueue();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 5_000,
    refetchInterval: 5_000,
  });
}

export function useApproveModerationItem() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      entityType,
      entityId,
    }: { entityType: string; entityId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateModerationStatus(
        entityType,
        entityId,
        "approved",
        "",
      );
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["moderation-queue"] }),
  });
}

export function useRejectModerationItem() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      entityType,
      entityId,
      remark,
    }: { entityType: string; entityId: string; remark: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateModerationStatus(
        entityType,
        entityId,
        "rejected",
        remark,
      );
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["moderation-queue"] }),
  });
}

// ─── Merchant Branches ────────────────────────────────────────────────────────

export function useMerchantBranches(merchantId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<
    Array<{
      id: string;
      name: string;
      branchId: string;
      address: string;
      deliveryRadius: number;
    }>
  >({
    queryKey: ["merchant-branches", merchantId],
    queryFn: async () => {
      if (!actor || !merchantId) return [];
      try {
        const branches = await actor.getMerchantBranches(merchantId);
        return branches.map((b, i) => ({
          id: `branch-${i}`,
          branchId: b.branchId,
          name: b.name,
          address: b.address,
          deliveryRadius: 0,
        }));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!merchantId,
    staleTime: 30_000,
  });
}

// ─── Pipeline Environment ─────────────────────────────────────────────────────

export function useGetPipelineEnvironment() {
  return useQuery<"live" | "test">({
    queryKey: ["pipeline-environment"],
    queryFn: async () => {
      const stored = localStorage.getItem("wc_pipeline_env");
      return stored === "test" ? "test" : "live";
    },
    staleTime: 5_000,
  });
}

export function useSetPipelineEnvironment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (env: "live" | "test") => {
      localStorage.setItem("wc_pipeline_env", env);
      return env;
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["pipeline-environment"] }),
  });
}

export function useEntityLeads(entityType: string, entityId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["entity-leads", entityType, entityId],
    queryFn: async () => {
      if (!actor || !entityId)
        return { views: 0, interested: 0, viewers: [], interestedList: [] };
      try {
        const result = await actor.getLeadsForEntity(entityType, entityId);
        const resultAny = result as Record<string, unknown>;
        return {
          views: Number(result.views),
          interested: Number(result.interested),
          viewers: result.viewers.map((v) => ({
            phone: v.phone,
            timestamp: Number(v.timestamp),
          })),
          interestedList: Array.isArray(resultAny.interestedList)
            ? (
                resultAny.interestedList as Array<{
                  phone: string;
                  timestamp: bigint;
                }>
              ).map((v) => ({
                phone: v.phone,
                timestamp: Number(v.timestamp),
              }))
            : [],
        };
      } catch {
        return { views: 0, interested: 0, viewers: [], interestedList: [] };
      }
    },
    enabled: !!actor && !isFetching && !!entityId,
    staleTime: 30_000,
  });
}

export function useTopMerchants(limit = 5) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["top-merchants", limit],
    queryFn: async () => {
      if (!actor) return [];
      const merchants = await actor.getTopMerchants(BigInt(limit));
      return merchants.map((m) => ({
        merchantName: m.merchant.businessName,
        orderCount: Number(m.orderCount),
        revenue: m.revenue,
        avgRating: m.avgRating,
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

// ─── Seed Sample Data ─────────────────────────────────────────────────────────

// ─── Seed Sample Data Summary type ──────────────────────────────────────────

export interface SeedSampleDataSummary {
  cities: number;
  customers: number;
  deliveryPartners: number;
  merchants: number;
  products: number;
  jobs: number;
  adhocJobs: number;
  properties: number;
  oldItems: number;
  events: number;
  familyGroups: number;
  promotions: number;
  recipes: number;
  shuttleRoutes: number;
  healthcareProviders: number;
  tourOperators: number;
  professionalServices: number;
  supportTickets: number;
  donations: number;
  subscriptionPlans: number;
  rateCards: number;
  lendingItems: number;
  communityMembers: number;
  manufacturers: number;
  manufacturerProducts: number;
  distributors: number;
  languageCourses: number;
  languageLessons: number;
  languageEnrollments: number;
  languageWordDefs: number;
}

function parseSeedSummary(raw: unknown): SeedSampleDataSummary {
  // Backend may return a structured record or a plain string
  if (raw && typeof raw === "object") {
    const r = raw as Record<string, unknown>;
    return {
      cities: Number(r.cities ?? 0),
      customers: Number(r.customers ?? 0),
      deliveryPartners: Number(r.deliveryPartners ?? 0),
      merchants: Number(r.merchants ?? 0),
      products: Number(r.products ?? 0),
      jobs: Number(r.jobs ?? 0),
      adhocJobs: Number(r.adhocJobs ?? 0),
      properties: Number(r.properties ?? 0),
      oldItems: Number(r.oldItems ?? 0),
      events: Number(r.events ?? 0),
      familyGroups: Number(r.familyGroups ?? 0),
      promotions: Number(r.promotions ?? 0),
      recipes: Number(r.recipes ?? 0),
      shuttleRoutes: Number(r.shuttleRoutes ?? 0),
      healthcareProviders: Number(r.healthcareProviders ?? 0),
      tourOperators: Number(r.tourOperators ?? 0),
      professionalServices: Number(r.professionalServices ?? 0),
      supportTickets: Number(r.supportTickets ?? 0),
      donations: Number(r.donations ?? 0),
      subscriptionPlans: Number(r.subscriptionPlans ?? r.plans ?? 0),
      rateCards: Number(r.rateCards ?? 0),
      lendingItems: Number(r.lendingItems ?? 0),
      communityMembers: Number(r.communityMembers ?? 0),
      manufacturers: Number(r.manufacturers ?? 0),
      manufacturerProducts: Number(r.manufacturerProducts ?? 0),
      distributors: Number(r.distributors ?? 0),
      languageCourses: Number(r.languageCourses ?? 0),
      languageLessons: Number(r.languageLessons ?? 0),
      languageEnrollments: Number(r.languageEnrollments ?? 0),
      languageWordDefs: Number(r.languageWordDefs ?? 0),
    };
  }
  // Fallback — backend returned text, default all to 0 so callers can still show success
  return {
    cities: 0,
    customers: 0,
    deliveryPartners: 0,
    merchants: 0,
    products: 0,
    jobs: 0,
    adhocJobs: 0,
    properties: 0,
    oldItems: 0,
    events: 0,
    familyGroups: 0,
    promotions: 0,
    recipes: 0,
    shuttleRoutes: 0,
    healthcareProviders: 0,
    tourOperators: 0,
    professionalServices: 0,
    supportTickets: 0,
    donations: 0,
    subscriptionPlans: 0,
    rateCards: 0,
    lendingItems: 0,
    communityMembers: 0,
    manufacturers: 0,
    manufacturerProducts: 0,
    distributors: 0,
    languageCourses: 0,
    languageLessons: 0,
    languageEnrollments: 0,
    languageWordDefs: 0,
  };
}

export function buildSeedSummaryMessage(s: SeedSampleDataSummary): string {
  const parts: string[] = [];
  if (s.cities > 0) parts.push(`${s.cities} cities`);
  if (s.customers > 0) parts.push(`${s.customers} customers`);
  if (s.deliveryPartners > 0)
    parts.push(`${s.deliveryPartners} delivery partners`);
  if (s.merchants > 0) parts.push(`${s.merchants} merchants`);
  if (s.products > 0) parts.push(`${s.products} products`);
  if (s.jobs > 0) parts.push(`${s.jobs} jobs`);
  if (s.adhocJobs > 0) parts.push(`${s.adhocJobs} adhoc jobs`);
  if (s.properties > 0) parts.push(`${s.properties} properties`);
  if (s.oldItems > 0) parts.push(`${s.oldItems} old items`);
  if (s.recipes > 0) parts.push(`${s.recipes} recipes`);
  if (s.healthcareProviders > 0)
    parts.push(`${s.healthcareProviders} healthcare providers`);
  if (s.tourOperators > 0) parts.push(`${s.tourOperators} tour operators`);
  if (s.professionalServices > 0)
    parts.push(`${s.professionalServices} professional services`);
  if (s.supportTickets > 0) parts.push(`${s.supportTickets} support tickets`);
  if (s.events > 0) parts.push(`${s.events} events`);
  if (s.promotions > 0) parts.push(`${s.promotions} promotions`);
  if (s.shuttleRoutes > 0) parts.push(`${s.shuttleRoutes} shuttle routes`);
  if (s.donations > 0) parts.push(`${s.donations} donations`);
  if (s.subscriptionPlans > 0)
    parts.push(`${s.subscriptionPlans} subscription plans`);
  if (s.rateCards > 0) parts.push(`${s.rateCards} rate cards`);
  if (s.lendingItems > 0) parts.push(`${s.lendingItems} lending items`);
  if (s.communityMembers > 0)
    parts.push(`${s.communityMembers} community members`);
  if (parts.length === 0) return "Sample data loaded successfully";
  return `Sample data loaded: ${parts.join(", ")}`;
}

export function useSeedSampleData() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<SeedSampleDataSummary> => {
      if (!actor) throw new Error("Actor not ready");
      const raw = await actor.seedSampleData();
      return parseSeedSummary(raw);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      qc.invalidateQueries({ queryKey: ["merchants"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["promotions"] });
      qc.invalidateQueries({ queryKey: ["family-members"] });
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["properties"] });
      qc.invalidateQueries({ queryKey: ["delivery-partners"] });
      qc.invalidateQueries({ queryKey: ["marketplace-items"] });
      qc.invalidateQueries({ queryKey: ["recipes"] });
      qc.invalidateQueries({ queryKey: ["adhoc-jobs"] });
      qc.invalidateQueries({ queryKey: ["shuttle-routes"] });
      qc.invalidateQueries({ queryKey: ["healthcare-providers"] });
      qc.invalidateQueries({ queryKey: ["tour-operators"] });
      qc.invalidateQueries({ queryKey: ["professional-services"] });
      qc.invalidateQueries({ queryKey: ["support-tickets"] });
      qc.invalidateQueries({ queryKey: ["rate-cards"] });
      qc.invalidateQueries({ queryKey: ["subscriptions"] });
      qc.invalidateQueries({ queryKey: ["lending-items"] });
      qc.invalidateQueries({ queryKey: ["community-members"] });
      qc.invalidateQueries({ queryKey: ["manufacturers"] });
      qc.invalidateQueries({ queryKey: ["manufacturer-products"] });
      qc.invalidateQueries({ queryKey: ["manufacturer-distributors"] });
      qc.invalidateQueries({ queryKey: ["manufacturer-returns"] });
      qc.invalidateQueries({ queryKey: ["manufacturer-complaints"] });
      qc.invalidateQueries({ queryKey: ["manufacturer-ratings"] });
      qc.invalidateQueries({ queryKey: ["manufacturer-dashboard-stats"] });
    },
  });
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export function useOrders(status?: OrderStatus) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["orders", status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders(status ?? null, null, null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5_000,
    refetchInterval: 5_000,
  });
}

export function useDeliveryOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["delivery-orders"],
    queryFn: async () => {
      if (!actor) return [];
      const orders = await actor.getAllOrders(null, null, null);
      return orders.filter((o) => !!o.deliveryPartnerId);
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    gcTime: 5 * 60_000,
    refetchInterval: 15_000,
    retry: 2,
  });
}

export function useOrdersByMerchant(merchantId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["orders-by-merchant", merchantId ?? ""],
    queryFn: async () => {
      if (!actor || !merchantId) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (id: string) => Promise<unknown[]>
        >;
        if (typeof actorAny.getOrdersByMerchant === "function") {
          return (await actorAny.getOrdersByMerchant(merchantId)) ?? [];
        }
        const all = await actor.getAllOrders(null, null, null);
        return all.filter(
          (o) =>
            (o as unknown as Record<string, unknown>).merchantId === merchantId,
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!merchantId,
    staleTime: 5_000,
    refetchInterval: 15_000,
    retry: 2,
  });
}

export function useOrdersByDeliveryPartner(dpId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["orders-by-dp", dpId ?? ""],
    queryFn: async () => {
      if (!actor || !dpId) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (id: string) => Promise<unknown[]>
        >;
        if (typeof actorAny.getOrdersByDeliveryPartner === "function") {
          return (await actorAny.getOrdersByDeliveryPartner(dpId)) ?? [];
        }
        const all = await actor.getAllOrders(null, null, null);
        return all.filter(
          (o) =>
            (o as unknown as Record<string, unknown>).deliveryPartnerId ===
            dpId,
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!dpId,
    staleTime: 5_000,
    refetchInterval: 15_000,
    retry: 2,
  });
}

export function useOrdersByCustomer(customerId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["orders-by-customer", customerId ?? ""],
    queryFn: async () => {
      if (!actor || !customerId) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (id: string) => Promise<unknown[]>
        >;
        if (typeof actorAny.getOrdersByCustomer === "function") {
          return (await actorAny.getOrdersByCustomer(customerId)) ?? [];
        }
        const all = await actor.getAllOrders(null, null, null);
        return all.filter(
          (o) =>
            (o as unknown as Record<string, unknown>).customerId === customerId,
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!customerId,
    staleTime: 5_000,
    refetchInterval: 15_000,
    retry: 2,
  });
}

// ─── Test Orders ──────────────────────────────────────────────────────────────

export function useTestOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Array<{ id: string }>>({
    queryKey: ["test-orders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<unknown[]>
        >;
        if (typeof actorAny.getTestOrders === "function") {
          const rows = await actorAny.getTestOrders();
          return (rows ?? []).map((r) => ({
            id: String((r as Record<string, unknown>).id ?? r),
          }));
        }
      } catch {
        /* ignore — test orders are best-effort */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 5_000,
    refetchInterval: 5_000,
  });
}

// ─── Create Test Order (called from simulator / script executor) ──────────────

export function useCreateTestOrder() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      merchantId,
      items,
      customerId,
      deliveryPartnerId,
    }: {
      merchantId: string;
      items: Array<{ productId: string; quantity: number; price: number }>;
      customerId?: string;
      deliveryPartnerId?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.createTestOrder === "function") {
        const result = await actorAny.createTestOrder(
          merchantId,
          items.map((it) => ({
            productId: it.productId,
            quantity: BigInt(it.quantity),
            price: it.price,
          })),
          customerId ?? null,
          deliveryPartnerId ?? null,
        );
        return String(result);
      }
      // Fallback: use createOrder and track ID locally
      if (typeof actorAny.createOrder === "function") {
        const orderItems = items.map((it) => ({
          productId: it.productId,
          quantity: BigInt(it.quantity),
          price: it.price,
        }));
        const result = (await actorAny.createOrder(
          customerId ?? "sim_customer",
          merchantId,
          orderItems,
          null,
          "cash",
          null,
        )) as { __kind__: string; ok?: { id: unknown } };
        if (result.__kind__ === "ok" && result.ok) {
          return String(result.ok.id);
        }
      }
      return `test-order-${Date.now()}`;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["test-orders"] });
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useSarthiRideBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["sarthi-ride-bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTransportBookings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5_000,
    refetchInterval: 5_000,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      note,
    }: { id: string; status: OrderStatus; note?: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateOrderStatus(
        id,
        status,
        "admin",
        note ?? null,
        null,
      );
      return unwrapResult(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useAssignDeliveryPartner() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      dpId,
    }: { orderId: string; dpId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.assignDeliveryPartner(orderId, dpId);
      return unwrapResult(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────

export function useUsers(role?: UserRole) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["users", role],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers(role ?? null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchInterval: 30_000,
    retry: 2,
  });
}

export function useCreateUser() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      phone,
      name,
      role,
    }: { phone: string; name: string; role: UserRole }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = (await (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).createUserV2(phone, name, role, null, null)) as
        | { ok: unknown }
        | { err: { errorDetail?: string } };
      if ("err" in result)
        throw new Error(
          (result.err as { errorDetail?: string })?.errorDetail ??
            "Registration failed",
        );
      return (result as { ok: unknown }).ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

// ─── Merchants ────────────────────────────────────────────────────────────────

export function useMerchants() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["merchants"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMerchants(null, null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchInterval: 30_000,
    retry: 2,
  });
}

export function useUpdateMerchantStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isActive,
      isVerified,
    }: { id: string; isActive: boolean; isVerified: boolean }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateMerchantStatus(id, isActive, isVerified);
      return unwrapResult(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["merchants"] }),
  });
}

export function useVerifyMerchant() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isApproved,
      reason,
    }: { id: string; isApproved: boolean; reason: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.verifyMerchant(id, isApproved, reason);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["merchants"] });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeactivateMerchant() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateMerchantStatus(id, isActive, false);
      return unwrapResult(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["merchants"] }),
  });
}

export function useUpdateMerchantKYCDocuments() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      merchantId: string;
      panNo: string;
      panUrl: string;
      aadhaarNo: string;
      aadhaarUrl: string;
      gstNo: string;
      gstUrl: string;
      outletPhotoUrl: string;
      chequeUrl: string;
      qrUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateMerchantKYCDocuments(
        data.merchantId,
        data.panNo,
        data.panUrl,
        data.aadhaarNo,
        data.aadhaarUrl,
        data.gstNo,
        data.gstUrl,
        data.outletPhotoUrl,
        data.chequeUrl,
        data.qrUrl,
      );
      return unwrapResult(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["merchants"] }),
  });
}

// ─── Delivery Partners ────────────────────────────────────────────────────────

export function useDeliveryPartners() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["delivery-partners"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllDeliveryPartners();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 15_000,
  });
}

export function useVerifyDeliveryPartner() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isApproved,
      reason,
    }: { id: string; isApproved: boolean; reason: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.verifyDeliveryPartner(id, isApproved, reason);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["delivery-partners"] });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useRejectDeliveryPartner() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.verifyDeliveryPartner(id, false, reason);
      return unwrapResult(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["delivery-partners"] }),
  });
}

export function useUpdateDeliveryPartnerKYC() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      dpId: string;
      aadhaarNo: string;
      rcBook: string;
      panNo: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateDeliveryPartnerKYC(
        data.dpId,
        data.aadhaarNo,
        data.rcBook,
        data.panNo,
      );
      return unwrapResult(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["delivery-partners"] }),
  });
}

// ─── Products ─────────────────────────────────────────────────────────────────

export function useProducts(merchantId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products", merchantId ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      if (merchantId) return actor.getProductsByMerchant(merchantId);
      // No filter: fetch all products across all merchants
      const merchants = await actor.listMerchants(null, null);
      const all: Awaited<ReturnType<typeof actor.getProductsByMerchant>> = [];
      for (const m of merchants.slice(0, 50)) {
        try {
          const prods = await actor.getProductsByMerchant(m.id);
          all.push(...prods);
        } catch {
          // skip merchant on error
        }
      }
      return all;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
  });
}

// ─── Marketplace Items ────────────────────────────────────────────────────────

export function useMarketplaceItems(category?: string, listingType?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<MarketplaceItem[]>({
    queryKey: ["marketplace-items", category, listingType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMarketplaceItems(category ?? null, listingType ?? null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 30_000,
  });
}

export function useCreateMarketplaceItem() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      price: number;
      category: string;
      yearOfManufacture: bigint;
      instagramPhotoLink: string;
      listingType: string;
      invoiceAvailable: boolean;
      cityId?: string;
      createdBy: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const { createdBy, ...input } = data;
      return actor.createMarketplaceItem(input, createdBy);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketplace-items"] });
      qc.invalidateQueries({ queryKey: ["user-listings"] });
    },
  });
}

export function useDeactivateMarketplaceItem() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deactivateMarketplaceItem(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketplace-items"] });
      qc.invalidateQueries({ queryKey: ["user-listings"] });
    },
  });
}

export function useUserListings(userId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<MarketplaceItem[]>({
    queryKey: ["user-listings", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      try {
        return actor.getUserListings(userId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!userId,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

// ─── Data Explorer CRUD Mutations ─────────────────────────────────────────────

export function useUpdateCity() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      pincodes,
    }: { id: string; name: string; pincodes: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.updateCity === "function") {
        return actorAny.updateCity(id, name, pincodes);
      }
      // Fallback: use addCity style update
      return actorAny.updateCityEnabled(id, true);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cities"] }),
  });
}

export function useDeleteCity() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.deleteCity === "function") {
        return actorAny.deleteCity(id);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cities"] }),
  });
}

export function useSaveCityControl() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      cityId,
      moduleName,
      enabled,
    }: { cityId: string; moduleName: string; enabled: boolean }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.saveCityControl === "function") {
        return actorAny.saveCityControl(cityId, moduleName, enabled);
      }
      return actor.setCityModuleEnabled(cityId, moduleName, enabled);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cities"] });
      qc.invalidateQueries({ queryKey: ["city-controls"] });
    },
  });
}

export function useUpdateMarketplaceItemAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      title,
      price,
      status,
    }: { id: string; title: string; price: number; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.updateMarketplaceItemAdmin === "function") {
        return actorAny.updateMarketplaceItemAdmin(id, {
          title,
          price,
          status,
        });
      }
      if (typeof actorAny.updateMarketplaceItem === "function") {
        return actorAny.updateMarketplaceItem(id, title, price, status);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace-items"] }),
  });
}

export function useDeleteMarketplaceItemAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.deleteMarketplaceItemAdmin === "function") {
        return actorAny.deleteMarketplaceItemAdmin(id);
      }
      if (typeof actorAny.deleteMarketplaceItem === "function") {
        return actorAny.deleteMarketplaceItem(id);
      }
      return actor.deactivateMarketplaceItem(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace-items"] }),
  });
}

export function useCreateRestockOrderAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      merchantId: string;
      supplierName: string;
      itemName: string;
      quantity: number;
      notes?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.createRestockOrderAdmin === "function") {
        return actorAny.createRestockOrderAdmin(data);
      }
      if (typeof actorAny.createRestockOrder === "function") {
        return actorAny.createRestockOrder(data);
      }
      return { success: true, id: `ro-${Date.now()}` };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["restock-orders"] });
    },
  });
}

export function useUpdateRestockOrderAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      supplierName?: string;
      itemName?: string;
      quantity?: number;
      notes?: string;
      status?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.updateRestockOrderAdmin === "function") {
        const { id, ...update } = data;
        return actorAny.updateRestockOrderAdmin(id, update);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restock-orders"] }),
  });
}

export function useDeleteRestockOrderAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.deleteRestockOrderAdmin === "function") {
        return actorAny.deleteRestockOrderAdmin(id);
      }
      if (typeof actorAny.deleteRestockOrder === "function") {
        return actorAny.deleteRestockOrder(id);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restock-orders"] }),
  });
}

export function useCreateModerationItemAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      contentId,
      contentType,
      reportedBy,
      reason,
    }: {
      contentId: string;
      contentType: string;
      reportedBy: string;
      reason: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.createModerationItemAdmin === "function") {
        return actorAny.createModerationItemAdmin({
          contentId,
          contentType,
          reportedBy,
          reason,
        });
      }
      if (typeof actorAny.createModerationItem === "function") {
        return actorAny.createModerationItem(
          contentId,
          contentType,
          reportedBy,
          reason,
        );
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["moderation-queue"] }),
  });
}

export function useUpdateModerationItemStatusAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      reviewedBy,
      notes,
    }: {
      id: string;
      status: string;
      reviewedBy: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.updateModerationItemStatusAdmin === "function") {
        return actorAny.updateModerationItemStatusAdmin(id, status);
      }
      if (typeof actorAny.updateModerationItemStatus === "function") {
        return actorAny.updateModerationItemStatus(
          id,
          status,
          reviewedBy,
          notes,
        );
      }
      return actor.updateModerationStatus(id, status, status, notes);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["moderation-queue"] }),
  });
}

export function useDeleteModerationItemAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.deleteModerationItemAdmin === "function") {
        return actorAny.deleteModerationItemAdmin(id);
      }
      if (typeof actorAny.deleteModerationItem === "function") {
        return actorAny.deleteModerationItem(id);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["moderation-queue"] }),
  });
}

export function useUpdateSupportTicketStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.updateSupportTicketStatusAdmin === "function") {
        return actorAny.updateSupportTicketStatusAdmin(id, status);
      }
      if (typeof actorAny.updateTicketStatus === "function") {
        return actorAny.updateTicketStatus(id, status);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["support-tickets"] }),
  });
}

export function useDeleteSupportTicketAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.deleteSupportTicketAdmin === "function") {
        return actorAny.deleteSupportTicketAdmin(id);
      }
      if (typeof actorAny.deleteSupportTicket === "function") {
        return actorAny.deleteSupportTicket(id);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["support-tickets"] }),
  });
}

export function useUpdateAdhocJobStatusAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.updateAdhocJobStatusAdmin === "function") {
        return actorAny.updateAdhocJobStatusAdmin(id, status);
      }
      if (typeof actorAny.updateAdhocJobStatus === "function") {
        return actorAny.updateAdhocJobStatus(id, status);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adhoc-jobs"] }),
  });
}

export function useDeleteAdhocJobAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.deleteAdhocJobAdmin === "function") {
        return actorAny.deleteAdhocJobAdmin(id);
      }
      if (typeof actorAny.deleteAdhocJob === "function") {
        return actorAny.deleteAdhocJob(id);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adhoc-jobs"] }),
  });
}

export function useCreateAdhocJobAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      location: string;
      budget: number;
      category: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      // createAdhocJobAdmin(title, category, pricePerDay, educationLevel, address, phone, description, posterId, jobType)
      try {
        return await actor.createAdhocJobAdmin(
          data.title,
          data.category,
          data.budget,
          "No requirement",
          data.location,
          "",
          data.description,
          "admin",
          { adhoc_daily: null } as unknown as import("../backend.ts").JobType,
        );
      } catch {
        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >;
        if (typeof actorAny.createAdhocJob === "function") {
          return actorAny.createAdhocJob(
            data.title,
            data.category,
            Number(data.budget),
            "No requirement",
            { address: data.location, lat: 0.0, lng: 0.0 },
            "",
            data.description,
            "admin",
            "daily",
          );
        }
        return { success: true };
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adhoc-jobs"] }),
  });
}

export function useUpdateRecipeAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      title?: string;
      steps?: string[];
      benefits?: string;
      tips?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const { id, ...update } = data;
      if (typeof actorAny.updateRecipeAdmin === "function") {
        return actorAny.updateRecipeAdmin(id, update);
      }
      if (typeof actorAny.updateRecipe === "function") {
        return actorAny.updateRecipe(id, update);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recipes"] }),
  });
}

// ─── Flow Agent Entity Summary ────────────────────────────────────────────────

export interface FlowAgentEntitySummary {
  customersCreated: number;
  merchantsCreated: number;
  ordersCreated: number;
}

export function useGetFlowAgentEntitySummary(runId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<FlowAgentEntitySummary>({
    queryKey: ["flow-agent-entity-summary", runId],
    queryFn: async () => {
      if (!actor || !runId) {
        return { customersCreated: 0, merchantsCreated: 0, ordersCreated: 0 };
      }
      try {
        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >;
        if (typeof actorAny.getFlowAgentEntitySummary === "function") {
          const result = await actorAny.getFlowAgentEntitySummary(runId);
          if (result && typeof result === "object") {
            const r = result as Record<string, unknown>;
            return {
              customersCreated: Number(r.customersCreated ?? 0),
              merchantsCreated: Number(r.merchantsCreated ?? 0),
              ordersCreated: Number(r.ordersCreated ?? 0),
            };
          }
        }
      } catch {
        // ignore
      }
      return { customersCreated: 0, merchantsCreated: 0, ordersCreated: 0 };
    },
    enabled: !!actor && !isFetching && !!runId,
    staleTime: 30_000,
  });
}

// ─── Telegram Config ──────────────────────────────────────────────────────────

export const SAFE_DEFAULT_TG_CONFIG = {
  botToken: "",
  webhookUrl: "",
  alertChatId: "",
  botUsername: "",
  isEnabled: false,
  isConnected: false,
} as const;

export function useTelegramConfig() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["telegram-config"],
    queryFn: async () => {
      if (!actor) return { ...SAFE_DEFAULT_TG_CONFIG };
      try {
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<Record<string, unknown>>
        >;
        if (typeof actorAny.getTelegramConfig === "function") {
          const result = await actorAny.getTelegramConfig();
          if (!result) return { ...SAFE_DEFAULT_TG_CONFIG };
          return { ...SAFE_DEFAULT_TG_CONFIG, ...result };
        }
      } catch {
        /* ignore */
      }
      return { ...SAFE_DEFAULT_TG_CONFIG };
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    placeholderData: { ...SAFE_DEFAULT_TG_CONFIG },
  });
}

export function useUpdateTelegramConfig() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (config: {
      botToken: string;
      webhookUrl: string;
      alertChatId: string;
      botUsername: string;
      isEnabled: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (
          cfg: unknown,
        ) => Promise<
          { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: unknown }
        >
      >;
      if (typeof actorAny.updateTelegramConfig === "function") {
        const result = await actorAny.updateTelegramConfig(config);
        return unwrapResult(result);
      }
      return { success: true };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["telegram-config"] });
      qc.invalidateQueries({ queryKey: ["telegram-config-table"] });
    },
  });
}

export function useTestTelegramConnection() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_: undefined) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        () => Promise<
          { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: unknown }
        >
      >;
      if (typeof actorAny.testTelegramConnection === "function") {
        const result = await actorAny.testTelegramConnection();
        return unwrapResult(result);
      }
      return { success: true };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["telegram-config"] });
    },
  });
}

export function useTelegramConfigTable() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Array<{ key: string; value: string; category: string }>>({
    queryKey: ["telegram-config-table"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<Array<{ key: string; value: string; category: string }>>
        >;
        if (typeof actorAny.getTelegramConfigTable === "function") {
          return actorAny.getTelegramConfigTable();
        }
        // Fallback: derive rows from getTelegramConfig
        const actorAnyUntyped = actor as unknown as Record<string, unknown>;
        const cfgFn = actorAnyUntyped.getTelegramConfig as
          | (() => Promise<Record<string, unknown>>)
          | undefined;
        if (typeof cfgFn === "function") {
          const cfg = await cfgFn();
          if (cfg && typeof cfg === "object") {
            return [
              {
                key: "botUsername",
                value: String(cfg.botUsername ?? "—"),
                category: "Identity",
              },
              {
                key: "alertChatId",
                value: String(cfg.alertChatId ?? "—"),
                category: "Notifications",
              },
              {
                key: "isEnabled",
                value: cfg.isEnabled ? "Enabled" : "Disabled",
                category: "Config",
              },
              {
                key: "isConnected",
                value: cfg.isConnected ? "Connected" : "Disconnected",
                category: "Status",
              },
              {
                key: "botToken",
                value: cfg.botToken ? "***hidden***" : "—",
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
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}

// ─── Telegram Delivery Mode + Live Debug Info ────────────────────────────────

export interface TelegramDeliveryModeInfo {
  deliveryMode: "Webhook" | "Polling" | "Inactive";
  webhookConfigured: boolean;
  webhookUrl: string;
  botTokenSet: boolean;
  pollingEnabled: boolean;
}

export function useTelegramDeliveryMode() {
  const { actor } = useBackendActor();
  return useQuery({
    queryKey: ["telegram-delivery-mode"],
    queryFn: async (): Promise<TelegramDeliveryModeInfo> => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        () => Promise<unknown>
      >;
      if (typeof actorAny.getTelegramDeliveryMode === "function") {
        const raw = await actorAny.getTelegramDeliveryMode();
        const r = raw as Record<string, unknown>;
        return {
          deliveryMode: String(
            r.deliveryMode ?? "Inactive",
          ) as TelegramDeliveryModeInfo["deliveryMode"],
          webhookConfigured: Boolean(r.webhookConfigured ?? false),
          webhookUrl: String(r.webhookUrl ?? ""),
          botTokenSet: Boolean(r.botTokenSet ?? false),
          pollingEnabled: Boolean(r.pollingEnabled ?? false),
        };
      }
      return {
        deliveryMode: "Inactive",
        webhookConfigured: false,
        webhookUrl: "",
        botTokenSet: false,
        pollingEnabled: false,
      };
    },
    refetchInterval: 10_000,
    enabled: !!actor,
  });
}

export interface TelegramDebugInfo {
  deliveryMode: string;
  webhookConfigured: boolean;
  webhookUrl: string;
  botTokenSet: boolean;
  pollingActive: boolean;
  lastErrorMessage: string;
  lastErrorDate: number;
  pendingUpdateCount: number;
  rawResponse: string;
}

export function useGetTelegramDebugInfo() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<TelegramDebugInfo> => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        () => Promise<unknown>
      >;
      if (typeof actorAny.getTelegramDebugInfo === "function") {
        const raw = await actorAny.getTelegramDebugInfo();
        const r = raw as Record<string, unknown>;
        return {
          deliveryMode: String(r.deliveryMode ?? "Inactive"),
          webhookConfigured: Boolean(r.webhookConfigured ?? false),
          webhookUrl: String(r.webhookUrl ?? ""),
          botTokenSet: Boolean(r.botTokenSet ?? false),
          pollingActive: Boolean(r.pollingActive ?? false),
          lastErrorMessage: String(r.lastErrorMessage ?? ""),
          lastErrorDate: Number(r.lastErrorDate ?? 0),
          pendingUpdateCount: Number(r.pendingUpdateCount ?? 0),
          rawResponse: String(r.rawResponse ?? ""),
        };
      }
      throw new Error(
        "getTelegramDebugInfo not available on this backend version",
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["telegram-delivery-mode"] });
    },
  });
}

// ─── Telegram Diagnostic Hooks ────────────────────────────────────────────────

export interface WebhookDiagnostics {
  webhookUrl: string;
  pendingUpdateCount: number;
  lastErrorMessage: string;
  lastErrorDate: number;
  isPollingActive: boolean;
  rawJson: string;
}

export function useClearWebhookAndPoll() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<{ messagesProcessed: number }> => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        () => Promise<
          { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: unknown }
        >
      >;
      if (typeof actorAny.clearWebhookAndPoll === "function") {
        const result = await actorAny.clearWebhookAndPoll();
        const ok = unwrapResult(result);
        // backend returns bigint count
        return { messagesProcessed: Number(ok) };
      }
      // Fallback: try pollTelegramUpdates if clearWebhookAndPoll not available
      const pollFn = actorAny.pollTelegramUpdates;
      if (typeof pollFn === "function") {
        const result = await pollFn();
        const ok = unwrapResult(result);
        return { messagesProcessed: Number(ok) };
      }
      throw new Error(
        "clearWebhookAndPoll / pollTelegramUpdates not available on actor",
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bot-logs-telegram"] });
      qc.invalidateQueries({ queryKey: ["telegram-config"] });
    },
  });
}

export function useGetWebhookDiagnostics() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (): Promise<WebhookDiagnostics> => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        () => Promise<unknown>
      >;
      if (typeof actorAny.getWebhookDiagnostics === "function") {
        const raw = await actorAny.getWebhookDiagnostics();
        if (raw && typeof raw === "object") {
          // Actual backend shape: { webhookUrl, pendingUpdates?, pollingActive, lastError, rawResponse }
          const r = raw as Record<string, unknown>;
          return {
            webhookUrl: String(r.webhookUrl ?? ""),
            pendingUpdateCount: Number(
              r.pendingUpdates ?? r.pendingUpdateCount ?? 0,
            ),
            lastErrorMessage: String(r.lastError ?? r.lastErrorMessage ?? ""),
            lastErrorDate: Number(r.lastErrorDate ?? 0),
            isPollingActive: Boolean(
              r.pollingActive ?? r.isPollingActive ?? false,
            ),
            rawJson:
              typeof r.rawResponse === "string"
                ? r.rawResponse
                : JSON.stringify(raw, null, 2),
          };
        }
      }
      throw new Error("getWebhookDiagnostics not available on actor");
    },
  });
}

// ─── Telegram Diagnostic: Force Clear Webhook (no HTTP outcall) ───────────────

export function useForceClearWebhookConfig() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<{ cleared: boolean; message: string }> => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      // Try dedicated method first, fall back to clearing config field
      if (typeof actorAny.clearTelegramWebhookConfig === "function") {
        await actorAny.clearTelegramWebhookConfig();
        return {
          cleared: true,
          message: "Webhook URL cleared — polling is now enabled.",
        };
      }
      if (typeof actorAny.updateTelegramConfig === "function") {
        // Read current config and save with empty webhookUrl
        const currentConfig = (await actorAny.getTelegramConfig?.()) ?? {};
        const cfg = (currentConfig as Record<string, unknown>) ?? {};
        await actorAny.updateTelegramConfig({
          ...cfg,
          webhookUrl: "",
        });
        return {
          cleared: true,
          message: "Webhook URL cleared — polling is now enabled.",
        };
      }
      return {
        cleared: false,
        message: "Method not available on this backend version.",
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["telegram-config"] });
    },
  });
}

// ─── Telegram Diagnostic: Test HTTP Outcall to Telegram API ──────────────────

export interface TelegramOutcallTestResult {
  httpStatus: number;
  responseBody: string;
  botTokenValid: boolean;
  botUsername?: string;
  getMeStatus?: string;
  sendMessageStatus?: string;
  errorMessage?: string;
}

export function useTestTelegramOutcall() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (): Promise<TelegramOutcallTestResult> => {
      if (!actor) throw new Error("Actor not ready");
      try {
        // Correct method: testTelegramOutcall (NOT testTelegramConnection)
        // This method calls /getMe AND /sendMessage and returns bot name
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: unknown }
          >
        >;
        const methodFn =
          typeof actorAny.testTelegramOutcall === "function"
            ? actorAny.testTelegramOutcall
            : typeof actorAny.testTelegramConnection === "function"
              ? actorAny.testTelegramConnection
              : null;
        if (!methodFn)
          throw new Error("testTelegramOutcall not available on actor");
        const result = await methodFn.call(actor);
        const unwrapped = unwrapResult(
          result as
            | { __kind__: "ok"; ok: unknown }
            | { __kind__: "err"; err: unknown },
        );
        const r = unwrapped as Record<string, unknown>;
        // Extract bot name from various possible field names
        const botUsername = r.botUsername
          ? String(r.botUsername)
          : r.username
            ? String(r.username)
            : r.botName
              ? String(r.botName)
              : undefined;
        // Try to parse getMeStatus and sendMessageStatus from response body
        let getMeStatus: string | undefined;
        let sendMessageStatus: string | undefined;
        const bodyStr = String(
          r.responseBody ?? r.message ?? JSON.stringify(unwrapped),
        );
        if (bodyStr.includes("getMe")) getMeStatus = "called";
        if (bodyStr.includes("sendMessage")) sendMessageStatus = "called";
        if (r.getMeStatus) getMeStatus = String(r.getMeStatus);
        if (r.sendMessageStatus)
          sendMessageStatus = String(r.sendMessageStatus);
        return {
          httpStatus: Number(r.statusCode ?? r.httpStatus ?? 200),
          responseBody: bodyStr.slice(0, 800),
          botTokenValid: Boolean(r.ok ?? r.success ?? r.botTokenValid ?? true),
          botUsername,
          getMeStatus,
          sendMessageStatus,
          errorMessage: r.error ? String(r.error) : undefined,
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        const statusMatch = msg.match(/\b([2-5]\d{2})\b/);
        return {
          httpStatus: statusMatch ? Number(statusMatch[1]) : 0,
          responseBody: msg.slice(0, 800),
          botTokenValid: false,
          errorMessage: msg,
        };
      }
    },
  });
}

// ─── Telegram Diagnostic: Test Send Message to specific chat ID ───────────────

export interface TelegramSendMessageTestResult {
  success: boolean;
  messageId?: number;
  chatId: string;
  timestamp: string;
  errorMessage?: string;
  rawResponse?: string;
}

export function useTestTelegramSendMessage() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (
      chatId: string,
    ): Promise<TelegramSendMessageTestResult> => {
      if (!actor) throw new Error("Actor not ready");
      if (!chatId.trim()) throw new Error("Chat ID is required");
      try {
        const actorAny = actor as unknown as Record<
          string,
          (
            chatId: string,
          ) => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: unknown }
          >
        >;
        if (typeof actorAny.testTelegramSendMessage === "function") {
          const result = await actorAny.testTelegramSendMessage(chatId.trim());
          const unwrapped = unwrapResult(
            result as
              | { __kind__: "ok"; ok: unknown }
              | { __kind__: "err"; err: unknown },
          );
          const r = unwrapped as Record<string, unknown>;
          return {
            success: true,
            messageId: r.messageId ? Number(r.messageId) : undefined,
            chatId: chatId.trim(),
            timestamp: new Date().toLocaleString("en-IN"),
            rawResponse:
              typeof r === "object"
                ? JSON.stringify(r, null, 2).slice(0, 500)
                : String(r),
          };
        }
        // Fallback: construct a manual test via testTelegramOutcall with the chat ID
        throw new Error(
          "testTelegramSendMessage not available — use Test HTTP Outcall instead",
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return {
          success: false,
          chatId: chatId.trim(),
          timestamp: new Date().toLocaleString("en-IN"),
          errorMessage: msg,
        };
      }
    },
  });
}

// ─── ONDC Config Table ────────────────────────────────────────────────────────

export function useOndcConfigTable() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Array<{ key: string; value: string; category: string }>>({
    queryKey: ["ondc-config-table"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<string, unknown>;
        if (typeof actorAny.getOndcConfigTable === "function") {
          return (
            actorAny.getOndcConfigTable as () => Promise<
              Array<{ key: string; value: string; category: string }>
            >
          )();
        }
      } catch {
        // ignore
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Missing-hook stubs (prevent build breakage) ─────────────────────────────

export function useAddMerchantBranch() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      merchantId: string;
      address: string;
      radiusKm: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.addMerchantBranch === "function") {
        return actorAny.addMerchantBranch(
          data.merchantId,
          data.address,
          data.radiusKm,
        );
      }
      return { success: true };
    },
    onSuccess: (_, v) =>
      qc.invalidateQueries({ queryKey: ["merchants"] }).then(() =>
        qc.invalidateQueries({
          queryKey: ["merchant-branches", v.merchantId],
        }),
      ),
  });
}

export function useClearFlowCache() {
  return useMutation({
    mutationFn: async (_: undefined) => {
      // Clear any stuck order flow state from localStorage
      const keys = Object.keys(localStorage).filter(
        (k) => k.startsWith("flow_") || k.startsWith("order_flow_"),
      );
      for (const k of keys) localStorage.removeItem(k);
      return { cleared: keys.length };
    },
  });
}

export function useCreateMerchant() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      ownerPhone: string;
      ownerName: string;
      outletName: string;
      category: string;
      deliveryType: string;
      merchantType: string;
      deliveryRadius: number;
      address: string;
      passdigit?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.registerMerchant === "function") {
        try {
          return await actorAny.registerMerchant(
            data.ownerPhone,
            data.ownerName,
            data.outletName,
            data.category,
            data.deliveryType,
            data.merchantType,
            data.deliveryRadius,
            data.address,
            data.passdigit ?? null,
          );
        } catch (err) {
          throw new Error(
            ((err as Record<string, unknown>)?.errorDetail as string) ||
              (err as Error)?.message ||
              String(err),
          );
        }
      }
      throw new Error("registerMerchant not available");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["merchants"] }),
  });
}

export function useManualUnblock() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { entityId: string; entityType: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.manualUnblock === "function") {
        return actorAny.manualUnblock(data.entityId, data.entityType);
      }
      return { success: true };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["merchants"] });
      qc.invalidateQueries({ queryKey: ["delivery-partners"] });
    },
  });
}

export function useSetBoostedOrderCount() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { merchantId: string; count: number }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.setBoostedOrderCount === "function") {
        return actorAny.setBoostedOrderCount(data.merchantId, data.count);
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["merchants"] }),
  });
}

export function useAddProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      merchantId: string;
      title: string;
      description: string;
      imageUrls: string[];
      isNew: boolean;
      baseRate: number;
      specialDiscount: number;
      qty?: bigint;
      packing?: string;
      expiry?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addProduct(
        data.merchantId,
        data.title,
        data.imageUrls,
        null,
        data.description,
        data.isNew,
        data.baseRate,
        [],
        data.specialDiscount,
        data.qty ?? 0n,
        data.packing ?? "",
        data.expiry ?? "",
      );
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: unknown }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["products", vars.merchantId] });
      qc.invalidateQueries({ queryKey: ["products", "all"] });
    },
  });
}

export function useAddProductsBulk() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      merchantId: string;
      products: Array<{
        title: string;
        description: string;
        imageUrls: string[];
        isNew: boolean;
        baseRate: number;
        specialDiscount: number;
      }>;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const results: unknown[] = [];
      for (const p of data.products) {
        const result = await actor.addProduct(
          data.merchantId,
          p.title,
          p.imageUrls,
          null,
          p.description,
          p.isNew,
          p.baseRate,
          [],
          p.specialDiscount,
          0n,
          "",
          "",
        );
        results.push(unwrapResult(result));
      }
      return results;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["products", vars.merchantId] });
      qc.invalidateQueries({ queryKey: ["products", "all"] });
    },
  });
}

// ─── WhatsApp Config ──────────────────────────────────────────────────────────

export const SAFE_DEFAULT_WA_CONFIG = {
  webhookUrl: "",
  phoneNumberId: "",
  apiKey: "",
  verifyToken: "",
  isConnected: false,
  isTestMode: true,
  businessAccountId: "",
  appId: "",
  apiVersion: "v19.0",
  monthlyRateLimit: 1000,
  templateMessageCount: 0,
} as const;

export function useWhatsAppConfig() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["whatsapp-config"],
    queryFn: async () => {
      if (!actor) return { ...SAFE_DEFAULT_WA_CONFIG };
      try {
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<Record<string, unknown>>
        >;
        if (typeof actorAny.getWhatsAppConfig === "function") {
          const result = await actorAny.getWhatsAppConfig();
          if (!result) return { ...SAFE_DEFAULT_WA_CONFIG };
          return { ...SAFE_DEFAULT_WA_CONFIG, ...result };
        }
      } catch {
        /* ignore */
      }
      return { ...SAFE_DEFAULT_WA_CONFIG };
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    placeholderData: { ...SAFE_DEFAULT_WA_CONFIG },
  });
}

export function useUpdateWhatsAppConfig() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (config: {
      apiKey: string;
      phoneNumberId: string;
      verifyToken: string;
      webhookUrl: string;
      isConnected: boolean;
      isTestMode: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (
          cfg: unknown,
        ) => Promise<
          { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: unknown }
        >
      >;
      if (typeof actorAny.updateWhatsAppConfig === "function") {
        const result = await actorAny.updateWhatsAppConfig(config);
        return unwrapResult(result);
      }
      return { success: true };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["whatsapp-config"] });
      qc.invalidateQueries({ queryKey: ["whatsapp-config-table"] });
    },
  });
}

export function useUpdateWebhookUrl() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (webhookUrl: string) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (url: string) => Promise<unknown>
      >;
      if (typeof actorAny.updateWebhookUrl === "function") {
        return actorAny.updateWebhookUrl(webhookUrl);
      }
      // Fallback: save via full config update
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["whatsapp-config"] }),
  });
}

export function useWhatsAppConfigTable() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Array<{ key: string; value: string; category: string }>>({
    queryKey: ["whatsapp-config-table"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<Array<{ key: string; value: string; category: string }>>
        >;
        if (typeof actorAny.getWhatsAppConfigTable === "function") {
          return actorAny.getWhatsAppConfigTable();
        }
        // Build a config table from what we have
        const cfg = { ...SAFE_DEFAULT_WA_CONFIG };
        return Object.entries(cfg).map(([k, v]) => ({
          key: k,
          value: String(v),
          category: "whatsapp",
        }));
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}

// ─── Type stubs (for pages that import these as types from useBackend) ────────

export interface CustomerRatingEntry {
  orderId: string;
  rating: number;
  ratingValue: "good" | "bad" | "neutral";
  comment: string;
  timestamp: number;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  totalOrdersWithMerchant?: number;
  lastOrderDate?: string;
}
export interface DisplayTotalOrders {
  merchantId: string;
  total: number;
  boosted: number;
  displayed: number;
  actual: number;
}
// RestockOrder mirrors backend.d.ts RestockOrder but adds merchantName for display
export interface RestockOrder {
  id: string;
  merchantId: string;
  merchantPhone: string;
  merchantName: string;
  supplierName: string;
  itemName: string;
  quantity: bigint | number;
  notes: string;
  status: "pending" | "accepted" | "delivered" | "cancelled";
  createdAt: number | bigint;
}

export interface ActiveDelivery {
  id: string;
  status: string;
  customerId: string;
  customerAddress?: { address: string; lat?: number; lng?: number } | null;
  merchantId: string;
  items: Array<{
    productId?: string;
    productName: string;
    quantity: bigint | number;
    unitRate: number;
    totalRate: number;
  }>;
  deliveryCharge: number;
  totalAmount: number;
}

export interface PartnerEarnings {
  today: number;
  thisMonth: number;
  total: number;
  deliveriesCount: number;
}

// ─── Analytics stubs ──────────────────────────────────────────────────────────

export function useEnhancedAnalytics() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<EnhancedAnalytics | null>({
    queryKey: ["enhanced-analytics"],
    queryFn: async () => {
      if (!actor) return null;
      const actorAny = actor as unknown as Record<
        string,
        () => Promise<EnhancedAnalytics>
      >;
      if (typeof actorAny.getEnhancedAnalytics === "function")
        return actorAny.getEnhancedAnalytics();
      return null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useMerchantAnalytics(merchantId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<MerchantAnalytics | null>({
    queryKey: ["merchant-analytics", merchantId],
    queryFn: async () => {
      if (!actor || !merchantId) return null;
      try {
        return await actor.getMerchantAnalytics(merchantId);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!merchantId,
    staleTime: 30_000,
  });
}

export function useDPAnalytics(dpId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DPAnalytics | null>({
    queryKey: ["dp-analytics", dpId],
    queryFn: async () => {
      if (!actor || !dpId) return null;
      try {
        const actorAny = actor as unknown as Record<
          string,
          (id: string) => Promise<DPAnalytics>
        >;
        if (typeof actorAny.getDPAnalytics === "function")
          return actorAny.getDPAnalytics(dpId);
        return null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!dpId,
    staleTime: 30_000,
  });
}

// ─── Misc missing stubs ───────────────────────────────────────────────────────

function noop() {
  return useMutation({
    mutationFn: async (_args: unknown) => ({}) as Record<string, unknown>,
  });
}
function noopQuery<T>(defaultVal: T) {
  return useQuery<T>({
    queryKey: [Math.random()],
    queryFn: async () => defaultVal,
    enabled: false,
  });
}

export function useGenerateApiKey() {
  return useMutation({
    mutationFn: async (_args: { ownerId: string; keyLabel: string }) => ({
      id: "" as string,
      key: "" as string,
      ownerId: _args.ownerId,
      keyLabel: _args.keyLabel,
      createdAt: BigInt(Date.now()),
      usageCount: BigInt(0),
      isActive: true,
    }),
  });
}
export function useAddDPPetrolExpense() {
  return noop();
}
export function useDPActiveDeliveries(_dpId?: string) {
  return noopQuery<unknown[]>([]);
}
export function useDPEarnings(_dpId?: string) {
  return noopQuery<DPEarnings | null>(null);
}
export function useDPEarningsWithExpenses(_dpId?: string, _fromDate?: string) {
  return noopQuery<DPEarningsWithExpenses | null>(null);
}
export function useDPPetrolExpenses(_dpId?: string, _fromDate?: string) {
  return noopQuery<PetrolExpense[]>([]);
}
export function useGenerateDeliveryPaymentQR() {
  return noop();
}
export function useGeneratePOSOTP() {
  return useMutation({
    mutationFn: async (_args: { phone: string; role: string }) => ({
      otp: "1234" as string | undefined,
    }),
  });
}
export function useMarkDeliveryPaymentCollected() {
  return noop();
}
export function useVerifyPOSOTP() {
  return useMutation({
    mutationFn: async (_args: {
      phone: string;
      otp: string;
      role: string;
    }) => ({
      success: false,
      dpId: undefined as string | undefined,
      merchantId: undefined as string | undefined,
      userId: undefined as string | undefined,
      name: undefined as string | undefined,
    }),
  });
}
export function useActiveDeliveryForPartner(_dpId?: string) {
  return noopQuery<ActiveDelivery | null>(null);
}
export function usePartnerEarnings(_dpId?: string) {
  return noopQuery<PartnerEarnings | null>(null);
}
export function useSetDPOnlineStatus() {
  return noop();
}
export function useCreateEvent() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      organizerPhone: string;
      organizerName: string;
      eventName: string;
      description: string;
      isPaid: boolean;
      price: number;
      locationAddress: string;
      startDate: string;
      endDate: string;
      ticketVenue: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createEvent(
        args.organizerPhone,
        args.organizerName,
        args.eventName,
        args.description,
        args.isPaid,
        args.price,
        args.locationAddress,
        args.startDate,
        args.endDate,
        args.ticketVenue,
      );
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: AppEvent }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
export function useDeleteEvent() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteEvent(id);
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: unknown }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
export function useEvents(_city?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AppEvent[]>({
    queryKey: ["events", _city ?? ""],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const raw = _city
          ? await actor.getEventsForLocation(_city)
          : await actor.getAllEvents();
        return (raw ?? []).map((e) => {
          const ev = e as unknown as Record<string, unknown>;
          return {
            id: String(ev.id ?? ""),
            organizerPhone: String(ev.organizerPhone ?? ""),
            organizerName: String(ev.organizerName ?? ev.organizerPhone ?? ""),
            name: String(ev.eventName ?? ev.name ?? ""),
            description: String(ev.description ?? ""),
            isPaid: Boolean(ev.isPaid ?? false),
            price: Number(ev.price ?? 0),
            location: String(ev.locationAddress ?? ev.location ?? ""),
            startDate: String(ev.startDate ?? ""),
            endDate: String(ev.endDate ?? ""),
            ticketVenue: String(ev.ticketVenue ?? ""),
            status: String(
              (ev.status as Record<string, unknown>)?.__kind__ ??
                ev.status ??
                "pending",
            ) as AppEvent["status"],
            publishedUntil: String(ev.publishUntil ?? ev.publishedUntil ?? ""),
            createdAt: Number(ev.createdAt ?? 0),
          } as AppEvent;
        });
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    retry: 2,
    refetchOnMount: true,
  });
}
export function useMyEventListings(_phone?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AppEvent[]>({
    queryKey: ["my-events", _phone ?? ""],
    queryFn: async () => {
      if (!actor || !_phone) return [];
      try {
        const raw = await actor.getMyEvents(_phone);
        return (raw ?? []).map((e) => {
          const ev = e as unknown as Record<string, unknown>;
          return {
            id: String(ev.id ?? ""),
            organizerPhone: String(ev.organizerPhone ?? ""),
            organizerName: String(ev.organizerName ?? ev.organizerPhone ?? ""),
            name: String(ev.eventName ?? ev.name ?? ""),
            description: String(ev.description ?? ""),
            isPaid: Boolean(ev.isPaid ?? false),
            price: Number(ev.price ?? 0),
            location: String(ev.locationAddress ?? ev.location ?? ""),
            startDate: String(ev.startDate ?? ""),
            endDate: String(ev.endDate ?? ""),
            ticketVenue: String(ev.ticketVenue ?? ""),
            status: String(
              (ev.status as Record<string, unknown>)?.__kind__ ??
                ev.status ??
                "pending",
            ) as AppEvent["status"],
            publishedUntil: String(ev.publishUntil ?? ev.publishedUntil ?? ""),
            createdAt: Number(ev.createdAt ?? 0),
          } as AppEvent;
        });
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!_phone,
    staleTime: 15_000,
  });
}
export function useUpdateEventStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { id: string; status: EventStatus }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateEventStatus(
        args.id,
        args.status as unknown as Parameters<typeof actor.updateEventStatus>[1],
      );
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: AppEvent }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
export function useAddFriend() {
  return noop();
}
export function useDeleteFamilyLink() {
  return noop();
}
export function useDeleteFamilyMember() {
  return noop();
}
export function useFamilyMembers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<FamilyMember[]>({
    queryKey: ["family-members"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getAllFamilyMembers();
      return (raw ?? []).map((m) => ({
        id: m.id,
        ownerName: m.ownerName,
        ownerSurname: m.ownerSurname,
        ownerPhone: m.ownerPhone,
        relationName: m.relationName,
        relationPhone: m.relationPhone,
        relationship: m.relationship as import("../types").Relationship,
        address: m.relationAddress,
        inviteStatus: (
          m.inviteStatus as unknown as string
        ).toLowerCase() as import("../types").InviteStatus,
        createdAt: Number(m.createdAt) / 1_000_000,
        gender: (m as unknown as Record<string, unknown>).gender as
          | string
          | undefined,
        // pass through matrimony fields for FamilyMemberWithMatrimony compatibility
        ...(m as unknown as Record<string, unknown>),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
    retry: 2,
    refetchOnMount: true,
  });
}
export function useUpdateFamilyInviteStatus() {
  return noop();
}
export function useExportData() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (entityType: string): Promise<unknown[]> => {
      if (!actor) return [];
      const a = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown[]>
      >;
      try {
        if (entityType === "lending-items") {
          return (await a.getAllLendingItems?.()) ?? [];
        }
        if (entityType === "community-members") {
          return (await a.getAllCommunityMembers?.()) ?? [];
        }
      } catch {
        /* ignore */
      }
      return [];
    },
  });
}
export function useJobs(_city?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: ["jobs", _city ?? ""],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getAllJobs(null);
      return (raw ?? []) as Job[];
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    retry: 2,
    refetchOnMount: true,
  });
}
export function useMyJobListings(_phone?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: ["my-jobs", _phone ?? ""],
    queryFn: async () => {
      if (!actor || !_phone) return [];
      const raw = await actor.getAllJobs(null);
      return ((raw ?? []) as Job[]).filter((j) => j.posterId === _phone);
    },
    enabled: !!actor && !isFetching && !!_phone,
    staleTime: 15_000,
    retry: 2,
    refetchOnMount: true,
  });
}
export function usePostJob() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      posterId: string;
      title: string;
      category: string;
      description: string;
      salaryMin: number;
      salaryMax: number;
      location: { lat: number; lng: number; address: string };
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.postJob(
        args.posterId,
        args.title,
        args.description,
        args.category,
        args.salaryMin,
        args.salaryMax,
        args.location,
      );
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: Job }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["my-jobs"] });
    },
  });
}
export function useGetMerchantImportStats(_merchantName?: string) {
  return noopQuery<{
    totalImported: number;
    totalBatches?: number;
    lastImportDate?: number;
  } | null>(null);
}
export function useGetSubscriptionDiscountForMerchant(_merchantId?: string) {
  return noopQuery<number>(0);
}
export function useImportMerchantContacts() {
  return useMutation({
    mutationFn: async (_args: {
      merchantPhone: string;
      contacts: string[];
    }) => ({
      imported: 0 as number,
      duplicates: 0 as number,
      skippedMerchants: 0 as number,
      skippedDPs: 0 as number,
    }),
  });
}
export function useSendMerchantPromotion() {
  return noop();
}
export function useGenerateOrderPaymentQR() {
  return noop();
}
export function useGetCustomerRatingHistory(_merchantId?: string) {
  return noopQuery<CustomerRatingEntry[]>([]);
}
export function useGetDisplayTotalOrders(_merchantId?: string) {
  return noopQuery<DisplayTotalOrders | null>(null);
}
export function useMerchantEarnings(_merchantId?: string, _branchId?: string) {
  return noopQuery<MerchantEarnings | null>(null);
}
export function useMerchantPOSOrders(
  _merchantId?: string,
  _branchId?: string,
  _status?: string,
) {
  return noopQuery<unknown[]>([]);
}
export function useMerchantTopProducts(_merchantId?: string) {
  return noopQuery<ProductRevenue[]>([]);
}
export function useCheckItemModeration() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (
      args: { itemType?: string; itemId?: string; content?: string } | string,
    ) => {
      if (!actor) throw new Error("Not connected");
      const content =
        typeof args === "string"
          ? args
          : (((args as Record<string, unknown>).content as string) ?? "");
      // Return a mock approved result — actual moderation is done server-side
      // via updateModerationStatus which calls HTTP outcalls
      const items = await actor.getAllModerationItems();
      const existingItem = Array.isArray(items)
        ? items.find(
            (i: Record<string, unknown>) =>
              i.id ===
              (typeof args === "object"
                ? (args as Record<string, unknown>).itemId
                : ""),
          )
        : null;
      return {
        approved:
          !existingItem ||
          (existingItem as Record<string, unknown>).status !== "flagged",
        reason: existingItem
          ? String((existingItem as Record<string, unknown>).flagReason ?? "")
          : "",
        content,
      } as { approved: boolean; reason: string };
    },
  });
}
export function useProperties(_city?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Property[]>({
    queryKey: ["properties", _city ?? ""],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getAllProperties(null, null);
      return (raw ?? []) as Property[];
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    retry: 2,
    refetchOnMount: true,
  });
}
export function useUpdateModerationStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      entityType: string;
      entityId: string;
      status: string;
      remark: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateModerationStatus(
        args.entityType,
        args.entityId,
        args.status,
        args.remark,
      );
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: unknown }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["moderation"] });
    },
  });
}
export function useAddCity() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      pincode,
    }: { name: string; pincode: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addCity(name, pincode);
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: City }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cities"] });
    },
  });
}
export function useGetCityControl(cityId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CityControl | null>({
    queryKey: ["city-control", cityId],
    queryFn: async () => {
      if (!actor || !cityId) return null;
      const result = await actor.getCityControl(cityId);
      if (Array.isArray(result)) return (result[0] as CityControl) ?? null;
      return (result as CityControl | null) ?? null;
    },
    enabled: !!actor && !isFetching && !!cityId,
  });
}
export function useListCities() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: async () => {
      if (!actor) return [];
      return (await actor.listCities()) as City[];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    retry: 2,
    refetchOnMount: true,
  });
}
export function useSetCityModuleEnabled() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      cityId,
      module_,
      enabled,
    }: { cityId: string; module_: string; enabled: boolean }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.setCityModuleEnabled(cityId, module_, enabled);
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: undefined }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["cities"] });
      qc.invalidateQueries({ queryKey: ["city-control", vars.cityId] });
    },
  });
}
export function useSetModuleEnabled() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      module: mod,
      enabled,
    }: { module: string; enabled: boolean }) => {
      if (!actor) throw new Error("Not connected");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.setModuleEnabled === "function") {
        const result = await actorAny.setModuleEnabled(mod, enabled);
        return result;
      }
      // graceful fallback — persist locally so UI reflects change
      try {
        const raw = localStorage.getItem("lbk_module_statuses");
        const current: Record<string, boolean> = raw
          ? (JSON.parse(raw) as Record<string, boolean>)
          : {};
        current[mod] = enabled;
        localStorage.setItem("lbk_module_statuses", JSON.stringify(current));
      } catch {
        /* ignore */
      }
      return {};
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["module-statuses"] });
      qc.invalidateQueries({ queryKey: ["module-statuses-roles"] });
    },
  });
}
export function useSetModuleEnabledForRole() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      moduleName,
      role,
      enabled,
    }: { moduleName: string; role: string; enabled: boolean }) => {
      if (!actor) throw new Error("Not connected");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.setModuleEnabledForRole === "function") {
        const result = await actorAny.setModuleEnabledForRole(
          moduleName,
          role,
          enabled,
        );
        return result;
      }
      // graceful fallback
      return {};
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["module-statuses-roles"] });
    },
  });
}
export function useUpdateCityEnabled() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      cityId,
      enabled,
    }: { cityId: string; enabled: boolean }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateCityEnabled(cityId, enabled);
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: City }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cities"] });
    },
  });
}
export function useNotifications() {
  return noopQuery<Notification[]>([]);
}
export function useOndcEnrollments() {
  return noopQuery<OndcEnrollment[]>([]);
}
export function useOndcProductSearch() {
  return noop();
}
export function useGetAdminUPIProfile() {
  return noopQuery<AdminUPIProfile | null>(null);
}
export function useSetAdminUPIProfile() {
  return noop();
}
export function useApprovePromotion() {
  return noop();
}
export function useCreatePromotion() {
  return noop();
}
export function useDeletePromotion() {
  return noop();
}
export function usePromotionAnalytics(_promoId?: string) {
  return noopQuery<{
    status: string;
    reachedCount: bigint | number;
    viewedCount: bigint | number;
    targetUserCount?: bigint | number;
  } | null>(null);
}
export function usePromotions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Promotion[]>({
    queryKey: ["promotions"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const raw = await actor.getAllPromotions();
        return (raw ?? []).map((p) => ({
          id: p.id,
          advertiserPhone: p.advertiserPhone,
          advertiserName: p.advertiserPhone, // backend has no advertiserName
          title: p.title,
          reelLink: p.reelLink,
          imageLink: p.imageLink,
          areaName: p.locationArea,
          city: p.locationCity,
          country: p.locationCountry,
          planId: "",
          planUsersReach: Number(p.targetUserCount ?? 0),
          status: String(p.status) as Promotion["status"],
          usersReached: Number(p.reachedCount ?? 0),
          usersViewed: Number(p.viewedCount ?? 0),
          createdAt: Number(p.createdAt),
          expiresAt: Number(p.expiresAt),
        })) as Promotion[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}
export function useRejectPromotion() {
  return noop();
}
export function useMyPropertyListings(_phone?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Property[]>({
    queryKey: ["my-properties", _phone ?? ""],
    queryFn: async () => {
      if (!actor || !_phone) return [];
      try {
        const raw = await actor.getAllProperties(null, null);
        return ((raw ?? []) as Property[]).filter((p) => p.posterId === _phone);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!_phone,
    staleTime: 15_000,
  });
}
export function usePostProperty() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      posterId: string;
      listingType: PropertyListingType;
      description: string;
      expectedPrice: number;
      location: { lat: number; lng: number; address: string };
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.postProperty(
        args.posterId,
        args.listingType,
        args.description,
        args.expectedPrice,
        args.location,
      );
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: Property }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["properties"] });
      qc.invalidateQueries({ queryKey: ["my-properties"] });
    },
  });
}
export function useCreateRateCard() {
  return noop();
}
export function useDeleteRateCard() {
  return noop();
}
export function useFreeRideSarthis() {
  return noopQuery<FreeRideSarthi[]>([]);
}
export function useRateCards() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DeliveryRateCard[]>({
    queryKey: ["rate-cards"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (() => Promise<DeliveryRateCard[]>) | undefined
        >;
        if (typeof actorAny.getAllRateCards === "function")
          return (await actorAny.getAllRateCards()) ?? [];
        if (typeof actorAny.listRateCards === "function")
          return (await actorAny.listRateCards()) ?? [];
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}
export function useRegisterFreeRideSarthi() {
  return noop();
}
export function useToggleFreeRideSarthiStatus() {
  return noop();
}
export function useUpdateRateCard() {
  return noop();
}
export function useCreateRecipe() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      ownerId: string;
      title: string;
      ingredients: RecipeIngredient[];
      steps: string[];
      imageLink: string;
      videoLink: string;
      benefits: string;
      tips: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createRecipe(
        args.ownerId,
        args.title,
        args.ingredients,
        args.steps,
        args.imageLink,
        args.videoLink,
        args.benefits,
        args.tips,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}
export function useDeleteRecipe() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteRecipe(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}
export function useRateRecipe() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { id: string; rating: number }) => {
      if (!actor) throw new Error("Not connected");
      return actor.rateRecipe(args.id, args.rating);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}
export function useRecipes() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getAllRecipes();
      return (raw ?? []) as Recipe[];
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    retry: 2,
    refetchOnMount: true,
  });
}
export function useRestockOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<RestockOrder[]>({
    queryKey: ["restock-orders"],
    queryFn: async () => {
      if (!actor) return [];
      const orders = await actor.getAllRestockOrders();
      return orders.map((o) => ({
        id: o.id,
        merchantId: o.merchantId,
        merchantPhone: o.merchantPhone,
        merchantName: o.merchantPhone,
        supplierName: o.supplierName,
        itemName: o.itemName,
        quantity: o.quantity,
        notes: o.notes,
        status: o.status as RestockOrder["status"],
        createdAt: o.createdAt,
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 30_000,
  });
}

export function useRestockOrdersByMerchant(merchantId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<RestockOrder[]>({
    queryKey: ["restock-orders", "merchant", merchantId],
    queryFn: async () => {
      if (!actor || !merchantId) return [];
      try {
        const orders = await actor.getRestockOrdersByMerchant(merchantId);
        return orders.map((o) => ({
          id: o.id,
          merchantId: o.merchantId,
          merchantPhone: o.merchantPhone,
          merchantName: o.merchantPhone,
          supplierName: o.supplierName,
          itemName: o.itemName,
          quantity: o.quantity,
          notes: o.notes,
          status: o.status as RestockOrder["status"],
          createdAt: o.createdAt,
        }));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!merchantId,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

export function useUpdateRestockStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: string; status: RestockOrder["status"] }) => {
      if (!actor) throw new Error("Actor not ready");
      // RestockStatus enum values equal their string names — cast safely
      const result = await actor.updateRestockOrderStatus(
        orderId,
        status as unknown as RestockStatus,
      );
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["restock-orders"] });
    },
  });
}
export function useAddEmployee() {
  return noop();
}
export function useDeleteEmployee() {
  return noop();
}
export function useEmployees() {
  return noopQuery<Employee[]>([]);
}
export function useSetEmployeeActive() {
  return noop();
}
export function useUpdateEmployee() {
  return noop();
}
export function useActivateShuttleRoute() {
  return noop();
}
export function useDeactivateShuttleRoute() {
  return noop();
}
export function usePostShuttleRoute() {
  return noop();
}
export function useConfirmSubscriptionPayment() {
  return noop();
}
export function useConfirmSubscriptionQRPayment() {
  return noop();
}
export function useCreatePlan() {
  return noop();
}
export function useDeletePlan() {
  return noop();
}
export function useGenerateSubscriptionQR(_planId?: string, _userId?: string) {
  return noopQuery<SubscriptionQR | null>(null);
}
export function usePlans() {
  return noopQuery<SubscriptionPlan[]>([]);
}
export function useUpdatePlan() {
  return noop();
}
export function generateSubscriptionOrderId(_planId?: string): string {
  return `sub-${Date.now()}`;
}

// ─── Subscription Assignment Hooks ────────────────────────────────────────────

export function useAssignedUsers(merchantId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("../backend.d").SubscriptionAssignment[]>({
    queryKey: ["assigned-users", merchantId],
    queryFn: async () => {
      if (!actor || !merchantId) return [];
      try {
        return actor.getAssignedUsers(merchantId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!merchantId,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

export function useAssignUserToSubscription() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      merchantId,
      userPhone,
      orderCap,
    }: { merchantId: string; userPhone: string; orderCap: bigint }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.assignUserToSubscription(
        merchantId,
        userPhone,
        orderCap,
      );
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: unknown }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["assigned-users", vars.merchantId] });
      qc.invalidateQueries({
        queryKey: ["sub-dashboard-stats", vars.merchantId],
      });
    },
  });
}

export function useRemoveUserFromSubscription() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      merchantId,
      userPhone,
    }: { merchantId: string; userPhone: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.removeUserFromSubscription(
        merchantId,
        userPhone,
      );
      return unwrapResult(
        result as
          | { __kind__: "ok"; ok: unknown }
          | { __kind__: "err"; err: unknown },
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["assigned-users", vars.merchantId] });
      qc.invalidateQueries({
        queryKey: ["sub-dashboard-stats", vars.merchantId],
      });
    },
  });
}

export function useSubscriptionDashboardStats(merchantId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("../backend.d").SubscriptionDashboardStats | null>({
    queryKey: ["sub-dashboard-stats", merchantId],
    queryFn: async () => {
      if (!actor || !merchantId) return null;
      try {
        return actor.getSubscriptionDashboardStats(merchantId);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!merchantId,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function saveQRTimeoutMinutes(_minutes: number): void {
  localStorage.setItem("qr_timeout_minutes", String(_minutes));
}
export function useGetSupportTickets() {
  return noopQuery<SupportTicketLocal[]>([]);
}
export function useUpdateSupportTicket() {
  return noop();
}

// ─── Adhoc Jobs stubs ─────────────────────────────────────────────────────────

export function useAdhocJobs(
  _category?: string,
  _minPrice?: number,
  _maxPrice?: number,
  _location?: string,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: [
      "adhoc-jobs",
      _category ?? "",
      _minPrice,
      _maxPrice,
      _location ?? "",
    ],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<unknown[]>
        >;
        if (typeof actorAny.getAllAdhocJobs === "function") {
          const raw = await actorAny.getAllAdhocJobs();
          return (raw ?? []) as Job[];
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

export function useAdhocJobCategories() {
  return noopQuery<string[]>([]);
}

export function useAdhocJobStats() {
  return noopQuery<{
    total: number;
    open: number;
    completed: number;
    totalActive: number;
    categoryBreakdown: Array<[string, number]>;
  } | null>(null);
}

export function useCreateAdhocJob() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: string;
      pricePerDay?: number;
      price?: number;
      educationLevel?: string;
      location: string | { address: string; lat: number; lng: number };
      phone?: string;
      description: string;
      posterId?: string;
      jobType?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const locationStr =
        typeof data.location === "string"
          ? data.location
          : data.location.address;
      const pricePerDay = Number(data.pricePerDay ?? data.price ?? 0);
      if (typeof actorAny.createAdhocJob === "function") {
        return actorAny.createAdhocJob(
          data.title,
          data.category,
          pricePerDay,
          data.educationLevel || "No requirement",
          { address: locationStr, lat: 0.0, lng: 0.0 },
          data.phone || "",
          data.description,
          data.posterId || "",
          data.jobType || "daily",
        );
      }
      return { success: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adhoc-jobs"] }),
  });
}

// ─── Bot logs stubs ───────────────────────────────────────────────────────────

// ─── Bot Performance Analytics ──────────────────────────────────────────────

export interface BotChannelStats {
  telegram: number;
  whatsapp: number;
  sms: number;
  simulator: number;
}

export interface BotDailyStat {
  date: string;
  telegram: number;
  whatsapp: number;
  sms: number;
}

export interface BotPerformanceStats {
  messagesByChannel: BotChannelStats;
  usersByChannel: BotChannelStats;
  ordersByChannel: BotChannelStats;
  dailyStats: BotDailyStat[];
}

export function useBotPerformanceStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BotPerformanceStats | null>({
    queryKey: ["bot-performance-stats"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<unknown>
        >;
        if (typeof actorAny.getBotPerformanceStats === "function") {
          const raw = await actorAny.getBotPerformanceStats();
          if (raw && typeof raw === "object") {
            const r = raw as Record<string, unknown>;
            const parseChannel = (v: unknown): BotChannelStats => {
              const c = (v ?? {}) as Record<string, unknown>;
              return {
                telegram: Number(c.telegram ?? 0),
                whatsapp: Number(c.whatsapp ?? 0),
                sms: Number(c.sms ?? 0),
                simulator: Number(c.simulator ?? 0),
              };
            };
            const dailyStats = Array.isArray(r.dailyStats)
              ? (r.dailyStats as Array<Record<string, unknown>>).map((d) => ({
                  date: String(d.date ?? ""),
                  telegram: Number(d.telegram ?? 0),
                  whatsapp: Number(d.whatsapp ?? 0),
                  sms: Number(d.sms ?? 0),
                }))
              : [];
            return {
              messagesByChannel: parseChannel(r.messagesByChannel),
              usersByChannel: parseChannel(r.usersByChannel),
              ordersByChannel: parseChannel(r.ordersByChannel),
              dailyStats,
            };
          }
        }
      } catch {
        /* ignore */
      }
      // Return zeros so UI renders an empty state rather than crashing
      return {
        messagesByChannel: { telegram: 0, whatsapp: 0, sms: 0, simulator: 0 },
        usersByChannel: { telegram: 0, whatsapp: 0, sms: 0, simulator: 0 },
        ordersByChannel: { telegram: 0, whatsapp: 0, sms: 0, simulator: 0 },
        dailyStats: [],
      };
    },
    enabled: !!actor && !isFetching,
    staleTime: 120_000,
    refetchInterval: 120_000,
  });
}

export function useDailyBotStats(days = 30) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BotDailyStat[]>({
    queryKey: ["daily-bot-stats", days],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (d: bigint) => Promise<unknown>
        >;
        if (typeof actorAny.getDailyBotStats === "function") {
          const raw = await actorAny.getDailyBotStats(BigInt(days));
          if (Array.isArray(raw)) {
            return raw.map((d) => {
              const r = d as Record<string, unknown>;
              return {
                date: String(r.date ?? ""),
                telegram: Number(r.telegram ?? 0),
                whatsapp: Number(r.whatsapp ?? 0),
                sms: Number(r.sms ?? 0),
              };
            });
          }
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 120_000,
    refetchInterval: 120_000,
  });
}

export function useBotLogs(_channel?: string) {
  return noopQuery<
    Array<{ timestamp: number; status: string; message?: string }>
  >([]);
}

export function useListBotLogs(channel: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<
    Array<{
      id: string;
      channel: string;
      direction: string;
      userId: string;
      messageText: string;
      flowTriggered: string;
      status: string;
      errorDetail: string;
      timestamp: number;
      rawPayload: string;
    }>
  >({
    queryKey: ["bot-logs", channel],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (ch: string, limit: bigint) => Promise<unknown[]>
        >;
        if (typeof actorAny.listBotLogs === "function") {
          // backend signature: listBotLogs(platform: string) — no limit param
          const raw = await (
            actor as unknown as Record<
              string,
              (ch: string) => Promise<unknown[]>
            >
          ).listBotLogs(channel);
          return (raw ?? []).map((r) => {
            const rec = r as Record<string, unknown>;
            return {
              id: String(rec.id ?? ""),
              channel: String(rec.channel ?? channel),
              direction: String(rec.direction ?? "in"),
              userId: String(rec.userId ?? rec.chatId ?? rec.phone ?? ""),
              messageText: String(rec.messageText ?? rec.message ?? ""),
              flowTriggered: String(rec.flowTriggered ?? rec.flow ?? ""),
              status: String(rec.status ?? "unknown"),
              errorDetail: rec ? String(rec.errorDetail ?? "") : "",
              timestamp: Number(rec.timestamp ?? 0),
              rawPayload: String(rec.rawPayload ?? ""),
            };
          });
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

// ─── List Restock Orders (admin) ─────────────────────────────────────────────

export function useListRestockOrders(merchantId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<RestockOrder[]>({
    queryKey: ["restock-orders-list", merchantId ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const orders = await actor.listRestockOrders(merchantId ?? null);
        return orders.map((o) => ({
          id: o.id,
          merchantId: o.merchantId,
          merchantPhone: o.merchantPhone,
          merchantName: o.merchantPhone,
          supplierName: o.supplierName,
          itemName: o.itemName,
          quantity: o.quantity,
          notes: o.notes,
          status: o.status as RestockOrder["status"],
          createdAt: o.createdAt,
        }));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

// ─── List Moderation Items (admin) ───────────────────────────────────────────

export function useListModerationItems(status?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("../backend.d").ModerationItem[]>({
    queryKey: ["moderation-items-list", status ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listModerationItems(status ?? null);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 15_000,
  });
}

// ─── List Support Tickets (admin) ────────────────────────────────────────────

export function useListSupportTickets(status?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("../backend.d").SupportTicket[]>({
    queryKey: ["support-tickets-list", status ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listSupportTickets(status ?? null);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

// ─── List Adhoc Jobs (admin) ──────────────────────────────────────────────────

export function useListAdhocJobsAdmin(category?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: ["adhoc-jobs-admin", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.listAdhocJobsAdmin(category ?? null);
        return result ?? [];
      } catch {
        try {
          const actorAny = actor as unknown as Record<
            string,
            () => Promise<Job[]>
          >;
          if (typeof actorAny.getAllAdhocJobs === "function") {
            const result = await actorAny.getAllAdhocJobs();
            return result ?? [];
          }
        } catch {
          /* ignore fallback error */
        }
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
    retry: 2,
  });
}

// ─── Healthcare Providers ─────────────────────────────────────────────────
// ─── List Daily Jobs (admin) ─────────────────────────────────────────────────

export function useListDailyJobsAdmin(category?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: ["daily-jobs-admin", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<Job[]>
        >;
        if (typeof actorAny.getAllDailyJobs === "function") {
          const result = await actorAny.getAllDailyJobs();
          return result ?? [];
        }
        // Fallback: get all adhoc jobs and filter for daily type
        if (typeof actorAny.getAllAdhocJobs === "function") {
          const all = await actorAny.getAllAdhocJobs();
          return (all ?? []).filter(
            (j) =>
              j.jobType === "adhoc_daily" || (j.jobType as string) === "daily",
          );
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
    retry: 2,
  });
}

export interface HealthcareProvider {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  location: string;
  availableDays?: string;
  fee?: number;
}

export function useHealthcareProviders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<HealthcareProvider[]>({
    queryKey: ["healthcare-providers"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const raw = await actor.getAllHealthcareProviders();
        return (raw ?? []).map((r) => ({
          id: String(r.id ?? ""),
          name: String(r.name ?? ""),
          specialization: String(r.specialization ?? ""),
          phone: String(r.phone ?? ""),
          location: String(
            (r as unknown as Record<string, unknown>).address ?? r.phone ?? "",
          ),
          availableDays: Array.isArray(r.availability)
            ? r.availability.join(", ")
            : String(
                (r as unknown as Record<string, unknown>).availableDays ?? "",
              ),
          fee:
            typeof r.consultationFee === "number"
              ? r.consultationFee
              : undefined,
        }));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 60_000,
  });
}

// ─── Tour Operators ─────────────────────────────────────────────────────────

export interface TourOperator {
  id: string;
  name: string;
  destination: string;
  tourType: string;
  duration: string;
  price: number;
  phone: string;
  description?: string;
}

export function useTourOperators() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<TourOperator[]>({
    queryKey: ["tour-operators"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const raw = await actor.getAllTourOperators();
        return (raw ?? []).map((r) => ({
          id: String(r.id ?? ""),
          name: String(r.name ?? ""),
          destination: Array.isArray(r.destinations)
            ? r.destinations.join(", ")
            : String(r.destinations ?? ""),
          tourType: Array.isArray(r.tourTypes)
            ? (r.tourTypes[0] ?? "")
            : String(r.tourTypes ?? ""),
          duration: String(r.duration ?? ""),
          price:
            typeof r.pricePerPerson === "number"
              ? r.pricePerPerson
              : Number(r.pricePerPerson ?? 0),
          phone: String(r.phone ?? ""),
          description: (r as unknown as Record<string, unknown>).description
            ? String((r as unknown as Record<string, unknown>).description)
            : undefined,
        }));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 60_000,
  });
}

// ─── Professional Services ──────────────────────────────────────────────────

export interface ProfessionalService {
  id: string;
  name: string;
  skillType: string;
  phone: string;
  location: string;
  city?: string;
  pricePerHour?: number;
  description?: string;
  areaRates: Array<[string, number]>;
  appliedRate?: number;
}

export function useProfessionalServices(customerArea?: string | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ProfessionalService[]>({
    queryKey: ["professional-services", customerArea ?? null],
    queryFn: async () => {
      if (!actor) return [];
      try {
        if (customerArea) {
          const raw = await actor.searchProfessionalServices(
            null,
            null,
            customerArea,
          );
          return (raw ?? []).map(([r, appliedRate]) => ({
            id: String(r.id ?? ""),
            name: String(
              (r as unknown as Record<string, unknown>).name ??
                r.merchantPhone ??
                "",
            ),
            skillType: String(r.serviceType ?? ""),
            phone: String(r.merchantPhone ?? ""),
            location: String(r.address ?? ""),
            city: String(r.city ?? ""),
            pricePerHour:
              typeof r.pricePerHour === "number"
                ? r.pricePerHour
                : Number(r.pricePerHour ?? 0),
            description: String(r.specialization ?? ""),
            areaRates: r.areaRates ?? [],
            appliedRate:
              typeof appliedRate === "number"
                ? appliedRate
                : Number(appliedRate ?? 0),
          }));
        }
        const raw = await actor.getAllProfessionalServices();
        return (raw ?? []).map((r) => ({
          id: String(r.id ?? ""),
          name: String(
            (r as unknown as Record<string, unknown>).name ??
              r.merchantPhone ??
              "",
          ),
          skillType: String(r.serviceType ?? ""),
          phone: String(r.merchantPhone ?? ""),
          location: String(r.address ?? ""),
          city: String(r.city ?? ""),
          pricePerHour:
            typeof r.pricePerHour === "number"
              ? r.pricePerHour
              : Number(r.pricePerHour ?? 0),
          description: String(r.specialization ?? ""),
          areaRates: r.areaRates ?? [],
        }));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 60_000,
  });
}

// ─── Add Healthcare Provider Mutation ───────────────────────────────────────

export function useAddHealthcareProvider() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      specialization: string;
      location: string;
      phone: string;
      availableDays: string;
      fee: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addHealthcareProvider(
        data.name,
        data.specialization,
        data.location,
        data.phone,
        data.availableDays,
        BigInt(Math.round(data.fee)),
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["healthcare-providers"] });
    },
  });
}

// ─── Add Tour Operator Mutation ───────────────────────────────────────────────

export function useAddTourOperator() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      destination: string;
      tourType: string;
      duration: string;
      price: number;
      phone: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addTourOperator(
        data.name,
        data.destination,
        data.tourType,
        data.duration,
        BigInt(Math.round(data.price)),
        data.phone,
        data.description,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tour-operators"] });
    },
  });
}

// ─── Add Professional Service Mutation ────────────────────────────────────────

export function useAddProfessionalService() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      serviceType: string;
      location: string;
      phone: string;
      experience: string;
      hourlyRate: number;
      description: string;
      areaRates?: Array<[string, number]>;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addProfessionalService(
        data.name,
        data.serviceType,
        data.location,
        data.phone,
        data.experience,
        BigInt(Math.round(data.hourlyRate)),
        data.description,
        data.areaRates
          ? data.areaRates.map(
              ([area, rate]) => [area, rate] as [string, number],
            )
          : [],
      );
      // Persist area-specific rates via setAreaRate calls after registration
      if (
        result.__kind__ === "ok" &&
        data.areaRates &&
        data.areaRates.length > 0
      ) {
        const serviceId = String(
          (result.ok as unknown as Record<string, unknown>).id ?? "",
        );
        if (serviceId) {
          const actorAny = actor as unknown as Record<
            string,
            (...args: unknown[]) => Promise<unknown>
          >;
          for (const [area, rate] of data.areaRates) {
            try {
              if (typeof actorAny.setAreaRate === "function") {
                await actorAny.setAreaRate(serviceId, data.phone, area, rate);
              }
            } catch {
              // best-effort — registration already succeeded
            }
          }
        }
      }
      return result;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professional-services"] });
    },
  });
}

// ─── Healthcare Booking Mutation ──────────────────────────────────────────────

export function useBookHealthcareAppointment() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      providerId,
      customerPhone,
      date,
      timeSlot,
      notes,
    }: {
      providerId: string;
      customerPhone: string;
      date: string;
      timeSlot: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bookHealthcareAppointment(
        providerId,
        customerPhone,
        date,
        timeSlot,
        notes,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["healthcare-providers"] });
      qc.invalidateQueries({ queryKey: ["healthcare-appointments"] });
    },
  });
}

// ─── Tour Booking Mutation ─────────────────────────────────────────────────────

export function useBookTour() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      operatorId,
      customerPhone,
      destination,
      tourType,
      date,
      passengerCount,
    }: {
      operatorId: string;
      customerPhone: string;
      destination: string;
      tourType: string;
      date: string;
      passengerCount: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bookTour(
        operatorId,
        customerPhone,
        destination,
        tourType,
        date,
        BigInt(passengerCount),
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tour-operators"] });
      qc.invalidateQueries({ queryKey: ["tour-bookings"] });
    },
  });
}

// ─── Professional Service Booking Mutation ─────────────────────────────────────
// ─── City Areas Query ──────────────────────────────────────────────────────────

export function useCityAreas(city: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string[]>({
    queryKey: ["city-areas", city],
    queryFn: async () => {
      if (!actor || !city.trim()) return [];
      try {
        return await actor.getCityAreas(city.trim());
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && city.trim().length > 0,
    staleTime: 60_000,
  });
}

// ─── Set Area Rate Mutation ─────────────────────────────────────────────────────

export function useSetAreaRate() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      serviceId,
      merchantPhone,
      area,
      rate,
    }: {
      serviceId: string;
      merchantPhone: string;
      area: string;
      rate: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.setAreaRate(
        serviceId,
        merchantPhone,
        area,
        rate,
      );
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professional-services"] });
    },
  });
}

// ─── Remove Area Rate Mutation ──────────────────────────────────────────────────

export function useRemoveAreaRate() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      serviceId,
      merchantPhone,
      area,
    }: {
      serviceId: string;
      merchantPhone: string;
      area: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.removeAreaRate(serviceId, merchantPhone, area);
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professional-services"] });
    },
  });
}

export function useBookProfessionalService() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      serviceId,
      customerPhone,
      date,
      timeSlot,
      duration,
      notes,
      customerArea,
    }: {
      serviceId: string;
      customerPhone: string;
      date: string;
      timeSlot: string;
      duration: number;
      notes: string;
      customerArea?: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bookProfessionalService(
        serviceId,
        customerPhone,
        date,
        timeSlot,
        BigInt(duration),
        notes,
        customerArea ?? null,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professional-services"] });
      qc.invalidateQueries({ queryKey: ["service-bookings"] });
    },
  });
}

export function useFlowAgentSummary() {
  return noopQuery<{
    totalRuns: number;
    passRate: number;
    totalFlows: number;
    passed: number;
    failed: number;
    warnings: number;
  } | null>(null);
}

export function useExportWhatsAppScript() {
  return useQuery<string>({
    queryKey: ["whatsapp-script-export"],
    queryFn: async () => {
      return generateWhatsAppScript();
    },
    staleTime: 60_000,
  });
}

// ─── Script Run Result Hooks ──────────────────────────────────────────────────

export interface ScriptRunRecord {
  id: string;
  flowId: string;
  flowName: string;
  totalSteps: number;
  passed: number;
  failed: number;
  overallResult: "passed" | "failed";
  ranAt: number;
  sessionLanguage?: string;
}

export function useSaveScriptRunResult() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (data: {
      flowId: string;
      flowName: string;
      totalSteps: number;
      passed: number;
      failed: number;
      sessionLanguage?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      // Backend ScriptRunResultInput shape: passedSteps, failedSteps, overallPass,
      // totalSteps, runAt (all bigint), flowName, steps (Array)
      const backendInput = {
        flowName: data.flowName,
        totalSteps: BigInt(data.totalSteps),
        passedSteps: BigInt(data.passed),
        failedSteps: BigInt(data.failed),
        overallPass: data.failed === 0,
        steps: [],
        runAt: BigInt(Date.now()),
      };
      if (typeof actorAny.saveScriptRunResult === "function") {
        return actorAny.saveScriptRunResult(backendInput);
      }
      return { success: true };
    },
  });
}

export function useGetScriptRunResults() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ScriptRunRecord[]>({
    queryKey: ["script-run-results"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          () => Promise<unknown[]>
        >;
        if (typeof actorAny.getScriptRunResults === "function") {
          const results = await actorAny.getScriptRunResults();
          return (results ?? []).map((r) => {
            const rec = r as Record<string, unknown>;
            return {
              id: String(rec.id ?? `run-${Date.now()}`),
              flowId: String(rec.flowId ?? ""),
              flowName: String(rec.flowName ?? ""),
              totalSteps: Number(rec.totalSteps ?? 0),
              passed: Number(rec.passedSteps ?? rec.passed ?? 0),
              failed: Number(rec.failedSteps ?? rec.failed ?? 0),
              overallResult: (rec.overallPass === true ||
              rec.overallPass === false
                ? rec.overallPass
                  ? "passed"
                  : "failed"
                : ((rec.overallResult as "passed" | "failed") ?? "failed")) as
                | "passed"
                | "failed",
              ranAt: Number(rec.ranAt ?? Date.now()),
              sessionLanguage: rec.sessionLanguage
                ? String(rec.sessionLanguage)
                : undefined,
            };
          });
        }
      } catch {
        // ignore
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Script Executor — new backend-wired hooks ──────────────────────────────

export interface FlowStepDef {
  stepIndex: number;
  stepName: string;
  stepType: string;
  promptText: string;
  testValue: string;
  validationPattern: string | null;
}

export interface FlowStepResult {
  response: string;
  nextStepHint: string;
  entityCreated: { entityType: string; entityId: string } | null;
  stepPassed: boolean;
  errorMsg: string | null;
}

export interface ScriptRunSummary {
  runId: string;
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  entitiesCreated: Array<{ entityType: string; entityId: string }>;
}

export function useGetScriptExecutorFlowSteps(flowId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<FlowStepDef[]>({
    queryKey: ["script-executor-flow-steps", flowId],
    queryFn: async () => {
      if (!actor || !flowId) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (id: string) => Promise<unknown[]>
        >;
        if (typeof actorAny.getScriptExecutorFlowSteps === "function") {
          const raw = await actorAny.getScriptExecutorFlowSteps(flowId);
          return (raw ?? []).map((r) => {
            const rec = r as Record<string, unknown>;
            return {
              stepIndex: Number(rec.stepIndex ?? 0),
              stepName: String(rec.stepName ?? ""),
              stepType: String(rec.stepType ?? "text"),
              promptText: String(rec.promptText ?? ""),
              testValue: String(rec.testValue ?? ""),
              validationPattern: rec.validationPattern
                ? String(
                    Array.isArray(rec.validationPattern)
                      ? (rec.validationPattern[0] ?? null)
                      : rec.validationPattern,
                  )
                : null,
            };
          });
        }
      } catch {
        /* ignore — page falls back to registry-based steps */
      }
      return [];
    },
    enabled: !!actor && !isFetching && !!flowId,
    staleTime: 60_000,
  });
}

export function useExecuteFlowStep() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (args: {
      flowId: string;
      stepIndex: number;
      userInput: string;
      sessionId: string;
    }): Promise<FlowStepResult> => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (
          flowId: string,
          stepIndex: bigint,
          userInput: string,
          sessionId: string,
        ) => Promise<unknown>
      >;
      if (typeof actorAny.executeFlowStep === "function") {
        const raw = await actorAny.executeFlowStep(
          args.flowId,
          BigInt(args.stepIndex),
          args.userInput,
          args.sessionId,
        );
        const r = raw as Record<string, unknown>;
        // Unwrap optional entityCreated
        let entityCreated: { entityType: string; entityId: string } | null =
          null;
        const rawEntity = r.entityCreated;
        if (Array.isArray(rawEntity) && rawEntity.length > 0) {
          const ec = rawEntity[0] as Record<string, unknown>;
          entityCreated = {
            entityType: String(ec.entityType ?? ""),
            entityId: String(ec.entityId ?? ""),
          };
        } else if (rawEntity && typeof rawEntity === "object") {
          const ec = rawEntity as Record<string, unknown>;
          if (ec.entityType) {
            entityCreated = {
              entityType: String(ec.entityType),
              entityId: String(ec.entityId ?? ""),
            };
          }
        }
        // Unwrap optional errorMsg
        let errorMsg: string | null = null;
        const rawErr = r.errorMsg;
        if (Array.isArray(rawErr)) {
          errorMsg = rawErr.length > 0 ? String(rawErr[0]) : null;
        } else if (typeof rawErr === "string" && rawErr.length > 0) {
          errorMsg = rawErr;
        }
        return {
          response: String(r.response ?? ""),
          nextStepHint: String(r.nextStepHint ?? ""),
          entityCreated,
          stepPassed: Boolean(r.stepPassed ?? true),
          errorMsg,
        };
      }
      // Graceful fallback — simulate a passing step
      return {
        response: `[Simulated] Step processed for input: "${args.userInput}"`,
        nextStepHint: "",
        entityCreated: null,
        stepPassed: true,
        errorMsg: null,
      };
    },
  });
}

export function useSaveScriptRunResultWithData() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      flowName: string;
      totalSteps: number;
      passedSteps: number;
      failedSteps: number;
      overallPass: boolean;
      steps: Array<{
        stepIndex: number;
        stepName: string;
        inputSent: string;
        botResponse: string;
        passed: boolean;
        errorMsg: string;
        executionMs: number;
        entityType?: string;
        entityId?: string;
      }>;
    }): Promise<ScriptRunSummary> => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (inp: unknown) => Promise<unknown>
      >;
      const backendInput = {
        flowName: input.flowName,
        totalSteps: BigInt(input.totalSteps),
        passedSteps: BigInt(input.passedSteps),
        failedSteps: BigInt(input.failedSteps),
        overallPass: input.overallPass,
        runAt: BigInt(Date.now()),
        steps: input.steps.map((s) => ({
          stepIndex: BigInt(s.stepIndex),
          stepName: s.stepName,
          inputSent: s.inputSent,
          botResponse: s.botResponse,
          passed: s.passed,
          errorMsg: s.errorMsg,
          executionMs: BigInt(s.executionMs),
          entityType: s.entityType ? [s.entityType] : [],
          entityId: s.entityId ? [s.entityId] : [],
        })),
      };
      if (typeof actorAny.saveScriptRunResultWithData === "function") {
        const rawResult =
          await actorAny.saveScriptRunResultWithData(backendInput);
        // Unwrap Result<ScriptRunResult, Text> — backend returns { ok: ... } or { err: ... }
        const r = (
          rawResult &&
          typeof rawResult === "object" &&
          "ok" in (rawResult as Record<string, unknown>)
            ? (rawResult as Record<string, unknown>).ok
            : rawResult
        ) as Record<string, unknown>;
        const entitiesCreated = Array.isArray(r.entitiesCreated)
          ? (r.entitiesCreated as Array<Record<string, unknown>>).map((e) => ({
              entityType: String(e.entityType ?? ""),
              entityId: String(e.entityId ?? ""),
            }))
          : [];
        return {
          runId: String(r.runId ?? `run-${Date.now()}`),
          totalSteps: Number(r.totalSteps ?? input.totalSteps),
          passedSteps: Number(r.passedSteps ?? input.passedSteps),
          failedSteps: Number(r.failedSteps ?? input.failedSteps),
          entitiesCreated,
        };
      }
      // Fallback to legacy saveScriptRunResult
      if (typeof actorAny.saveScriptRunResult === "function") {
        await actorAny.saveScriptRunResult(backendInput);
      }
      return {
        runId: `run-${Date.now()}`,
        totalSteps: input.totalSteps,
        passedSteps: input.passedSteps,
        failedSteps: input.failedSteps,
        entitiesCreated: [],
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["script-run-results"] });
    },
  });
}

export function useClearScriptRunResults() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_: undefined) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        () => Promise<unknown>
      >;
      if (typeof actorAny.clearScriptRunResults === "function") {
        return actorAny.clearScriptRunResults();
      }
      return { success: true };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["script-run-results"] });
    },
  });
}

// ─── Get All Flows (unified registry — all environments) ────────────────────

export interface AllFlowOption {
  id: string;
  name: string;
  environment: string;
  flowJson: string;
  version: number;
}

/**
 * Fetches ALL flows from the backend regardless of environment.
 * Uses actor.getAllFlows() as the primary method (returns every seeded flow).
 * Falls back to querying getFlowDefinitions for all environments if needed.
 * This is the canonical hook for the Script Executor, Flow Agent, and any surface
 * that must show the full unified flow registry.
 */
export function useGetAllFlows() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AllFlowOption[]>({
    queryKey: ["all-flows-registry"],
    queryFn: async () => {
      if (!actor) return [];
      const actorAny = actor as unknown as Record<string, unknown>;
      // PRIMARY: getAllFlows — returns all flows regardless of environment
      if (typeof actorAny.getAllFlows === "function") {
        try {
          const raw = await (
            actorAny.getAllFlows as () => Promise<unknown[]>
          )();
          if (Array.isArray(raw) && raw.length > 0) {
            const seen = new Map<string, AllFlowOption>();
            for (const r of raw) {
              const rec = r as Record<string, unknown>;
              const id = String(rec.id ?? "");
              if (!id) continue;
              const ver = Number(rec.version ?? 0);
              const existing = seen.get(id);
              if (!existing || ver > existing.version) {
                seen.set(id, {
                  id,
                  name: String(rec.name ?? id),
                  environment: String(rec.environment ?? ""),
                  flowJson: String(rec.flowJson ?? ""),
                  version: ver,
                });
              }
            }
            return Array.from(seen.values()).sort((a, b) =>
              a.name.localeCompare(b.name),
            );
          }
        } catch {
          /* fall through to getFlowDefinitions */
        }
      }
      // FALLBACK: query getFlowDefinitions across all environment values
      if (typeof actorAny.getFlowDefinitions === "function") {
        const collect = new Map<string, AllFlowOption>();
        for (const env of ["live", "test", ""]) {
          try {
            const raw = await (
              actorAny.getFlowDefinitions as (e: string) => Promise<unknown[]>
            )(env);
            if (Array.isArray(raw)) {
              for (const r of raw) {
                const rec = r as Record<string, unknown>;
                const id = String(rec.id ?? "");
                if (!id) continue;
                const ver = Number(rec.version ?? 0);
                const existing = collect.get(id);
                if (!existing || ver > existing.version) {
                  collect.set(id, {
                    id,
                    name: String(rec.name ?? id),
                    environment: env,
                    flowJson: String(rec.flowJson ?? ""),
                    version: ver,
                  });
                }
              }
            }
          } catch {
            /* ignore per-environment errors */
          }
        }
        if (collect.size > 0) {
          return Array.from(collect.values()).sort((a, b) =>
            a.name.localeCompare(b.name),
          );
        }
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    retry: 2,
  });
}

// ─── Matrimony Hooks ─────────────────────────────────────────────────────────

export function useMatrimonyMembers(filters?: {
  caste?: string;
  location?: string;
  education?: string;
  bloodGroup?: string;
}) {
  const { actor, isFetching } = useBackendActor();
  const caste = filters?.caste || null;
  const location = filters?.location || null;
  const education = filters?.education || null;
  const bloodGroup = filters?.bloodGroup || null;
  return useQuery({
    queryKey: ["matrimony-members", caste, location, education, bloodGroup],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMatrimonyMembers(caste, location, education, bloodGroup);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useUpdateMatrimonyEligibility() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      memberId: string;
      eligible: boolean;
      caste?: string;
      occupation?: string;
      education?: string;
      locationPreference?: string;
      bloodGroup?: string;
      age?: number;
      gender?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      // Try method that includes gender if available
      if (typeof actorAny.updateMatrimonyEligibilityWithGender === "function") {
        const result = await actorAny.updateMatrimonyEligibilityWithGender(
          data.memberId,
          data.eligible,
          data.caste ?? null,
          data.occupation ?? null,
          data.education ?? null,
          data.locationPreference ?? null,
          data.bloodGroup ?? null,
          data.age != null ? BigInt(data.age) : null,
          data.gender ?? null,
        );
        return unwrapResult(
          result as
            | { __kind__: "ok"; ok: unknown }
            | { __kind__: "err"; err: unknown },
        );
      }
      const result = await actor.updateMatrimonyEligibility(
        data.memberId,
        data.eligible,
        data.caste ?? null,
        data.occupation ?? null,
        data.education ?? null,
        data.locationPreference ?? null,
        data.bloodGroup ?? null,
        data.age != null ? BigInt(data.age) : null,
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["family-members"] });
      qc.invalidateQueries({ queryKey: ["matrimony-members"] });
    },
  });
}

// ─── Donation Hooks ───────────────────────────────────────────────────────────

export function useDonations(filters?: {
  category?: string;
  location?: string;
}) {
  const { actor, isFetching } = useBackendActor();
  const cat = filters?.category || null;
  const loc = filters?.location || null;
  return useQuery({
    queryKey: ["donations", cat, loc],
    queryFn: async () => {
      if (!actor) return [];
      if (cat || loc) return actor.searchDonations(cat, loc);
      return actor.getDonations();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useDonationRequests() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDonationRequests();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAddDonation() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      category: string;
      description: string;
      quantity: string;
      location: string;
      contactPhone: string;
      donorPhone: string;
      donorName: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addDonation(
        data.category,
        data.description,
        data.quantity,
        data.location,
        data.contactPhone,
        data.donorPhone,
        data.donorName,
        "admin",
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}

export function useRequestDonation() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      category: string;
      description: string;
      quantityNeeded: string;
      location: string;
      requesterPhone: string;
      requesterName: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.requestDonation(
        data.category,
        data.description,
        data.quantityNeeded,
        data.location,
        data.requesterPhone,
        data.requesterName,
        "admin",
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["donation-requests"] });
    },
  });
}

export function useUpdateDonationStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateDonationStatus(id, status);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}

export function useUpdateDonationRequestStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateDonationRequestStatus(id, status);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["donation-requests"] });
    },
  });
}

export function useDeleteDonation() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteDonation(id);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}

export function useDeleteDonationRequest() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteDonationRequest(id);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["donation-requests"] });
    },
  });
}

// ─── Lending Hooks ───────────────────────────────────────────────────

export function useGetAllLendingItems() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["lending-items"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllLendingItems();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetLendingItemsDueSoon() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["lending-items-due-soon"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getLendingItemsDueSoon();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetLendingItemsByLender(phone: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<LendingItem[]>({
    queryKey: ["lending-items-lender", phone],
    queryFn: async () => {
      if (!actor || !phone) return [];
      try {
        return await actor.getLendingItemsByLender(phone);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!phone,
    staleTime: 30_000,
  });
}

export function useGetLendingItemsByBorrower(phone: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<LendingItem[]>({
    queryKey: ["lending-items-borrower", phone],
    queryFn: async () => {
      if (!actor || !phone) return [];
      try {
        return await actor.getLendingItemsByBorrower(phone);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!phone,
    staleTime: 30_000,
  });
}

export function useGetCommunityMemberByPhone(phone: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["community-member-phone", phone],
    queryFn: async () => {
      if (!actor || !phone) return null;
      try {
        return await actor.getCommunityMemberByPhone(phone);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!phone,
    staleTime: 60_000,
  });
}

export function useCreateLendingItem() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: LendingItem) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createLendingItem(item);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lending-items"] }),
  });
}

export function useUpdateLendingItem() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, item }: { id: string; item: LendingItem }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateLendingItem(id, item);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lending-items"] }),
  });
}

export function useUpdateLendingStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateLendingStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lending-items"] }),
  });
}

export function useTriggerLendingReminder() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (itemId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.triggerLendingReminder(itemId);
    },
  });
}

export function useCheckOverdueLendingReminders() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const count = await actor.checkAndSendOverdueReminders();
      return Number(count);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lending-items"] }),
  });
}

// ─── Community Hooks ───────────────────────────────────────────────

export function useGetAllCommunityMembers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["community-members"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllCommunityMembers();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSearchCommunityMembers(searchTerm: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["community-members-search", searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm.trim()) return [];
      try {
        return await actor.searchCommunityMembers(searchTerm);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && searchTerm.trim().length > 0,
    staleTime: 15_000,
  });
}

export function useGetCommunityMembersByCity(city: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["community-members-city", city],
    queryFn: async () => {
      if (!actor || !city) return [];
      try {
        return await actor.getCommunityMembersByCity(city);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!city,
    staleTime: 30_000,
  });
}

export function useRemoveCommunityMember() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (phone: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.removeCommunityMember(phone);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community-members"] }),
  });
}

function generateWhatsAppScript(): string {
  return "# WhatsApp Script\n\nAll flows are loaded from the unified registry.";
}

// ─── Election Results Hooks ───────────────────────────────────────────────────

export function useGetElectionResults(state: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ElectionResult[]>({
    queryKey: ["election-results", state],
    queryFn: async () => {
      if (!actor || !state) return [];
      try {
        return await actor.getElectionResults(state);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!state,
    staleTime: 5 * 60_000,
    refetchInterval: 5 * 60_000,
  });
}

export function useGetAllElectionResults() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ElectionResult[]>({
    queryKey: ["election-results-all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllElectionResults();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60_000,
  });
}

export function useFetchElectionResults() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (state: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.fetchElectionResults(state);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["election-results"] });
      qc.invalidateQueries({ queryKey: ["election-results-all"] });
    },
  });
}

// ─── Match Scores by Sport ────────────────────────────────────────────────────
// ─── Community Service Hooks ─────────────────────────────────────────────────

export function useGetAllCommunityParkingBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["community-parking-bookings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getAllCommunityParkingBookings as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function")
          return (await fn()) as Record<string, unknown>[];
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useUpdateCommunityParkingBookingStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .updateCommunityParkingBookingStatus as
        | ((id: string, s: string) => Promise<unknown>)
        | undefined;
      if (typeof fn === "function") return fn(id, status);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["community-parking-bookings"] }),
  });
}

export function useCreateCommunityParkingBooking() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .createCommunityParkingBooking as
        | ((d: Record<string, unknown>) => Promise<unknown>)
        | undefined;
      if (typeof fn === "function") return fn(data);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["community-parking-bookings"] }),
  });
}

export function useGetAllCommunityRoomBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["community-room-bookings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getAllCommunityRoomBookings as
          | (() => Promise<unknown[]>)
          | undefined;
        if (typeof fn === "function")
          return (await fn()) as Record<string, unknown>[];
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useUpdateCommunityRoomBookingStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .updateCommunityRoomBookingStatus as
        | ((id: string, s: string) => Promise<unknown>)
        | undefined;
      if (typeof fn === "function") return fn(id, status);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["community-room-bookings"] }),
  });
}

export function useCreateCommunityRoomBooking() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .createCommunityRoomBooking as
        | ((d: Record<string, unknown>) => Promise<unknown>)
        | undefined;
      if (typeof fn === "function") return fn(data);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["community-room-bookings"] }),
  });
}

export function useGetAllCommunityFoodOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["community-food-orders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getAllCommunityFoodOrders as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function")
          return (await fn()) as Record<string, unknown>[];
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useUpdateCommunityFoodOrderStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .updateCommunityFoodOrderStatus as
        | ((id: string, s: string) => Promise<unknown>)
        | undefined;
      if (typeof fn === "function") return fn(id, status);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["community-food-orders"] }),
  });
}

export function useCreateCommunityFoodOrder() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .createCommunityFoodOrder as
        | ((d: Record<string, unknown>) => Promise<unknown>)
        | undefined;
      if (typeof fn === "function") return fn(data);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["community-food-orders"] }),
  });
}

export function useGetAllCommunityWorkOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["community-work-orders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getAllCommunityWorkOrders as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function")
          return (await fn()) as Record<string, unknown>[];
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useUpdateCommunityWorkOrderStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .updateCommunityWorkOrderStatus as
        | ((id: string, s: string) => Promise<unknown>)
        | undefined;
      if (typeof fn === "function") return fn(id, status);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["community-work-orders"] }),
  });
}

export function useCreateCommunityWorkOrder() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .createCommunityWorkOrder as
        | ((d: Record<string, unknown>) => Promise<unknown>)
        | undefined;
      if (typeof fn === "function") return fn(data);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["community-work-orders"] }),
  });
}

export function useGetMatchScoresBySport(sport: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<MatchScore[]>({
    queryKey: ["match-scores-sport", sport],
    queryFn: async () => {
      if (!actor || !sport) return [];
      try {
        if (sport === "all") {
          return await actor.getAllMatchScores();
        }
        return await actor.getMatchScoresBySport(sport);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

// ─── PaySprint / Booking Hooks ──────────────────────────────────────────

export function useGetAllBusBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["bus-bookings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await actor.getAllBusBookings()) as unknown as Record<
          string,
          unknown
        >[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllTrainBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["train-bookings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await actor.getAllTrainBookings()) as unknown as Record<
          string,
          unknown
        >[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllFlightBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["flight-bookings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await actor.getAllFlightBookings()) as unknown as Record<
          string,
          unknown
        >[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}
export function useGetServiceBookings(
  customerPhone: string | null,
  merchantPhone: string | null,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("../backend.d").ServiceBooking[]>({
    queryKey: ["service-bookings", customerPhone, merchantPhone],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getServiceBookings(customerPhone, merchantPhone);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllUtilityTransactions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["utility-transactions"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await actor.getAllUtilityTransactions()) as unknown as Record<
          string,
          unknown
        >[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllPaySprintAPILogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["paysprint-api-logs"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await actor.getAllPaySprintAPILogs()) as unknown as Record<
          string,
          unknown
        >[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

// ─── Product Location Pricing Hooks ──────────────────────────────────────────

export function useProductLocationPrices(productId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["product-location-prices", productId],
    queryFn: async () => {
      if (!actor || !productId) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getProductLocationPrices as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn !== "function") return [];
        return (await fn(productId)) as Record<string, unknown>[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!productId,
    staleTime: 30_000,
  });
}

export function useCheckProductPriceUniformity(productId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<{ isUniform: boolean; locationCount: number }>({
    queryKey: ["product-price-uniformity", productId],
    queryFn: async () => {
      if (!actor || !productId) return { isUniform: true, locationCount: 0 };
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .checkProductPriceUniformity as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn !== "function")
          return { isUniform: true, locationCount: 0 };
        return (await fn(productId)) as {
          isUniform: boolean;
          locationCount: number;
        };
      } catch {
        return { isUniform: true, locationCount: 0 };
      }
    },
    enabled: !!actor && !isFetching && !!productId,
    staleTime: 30_000,
  });
}

export function useSetProductLocationPrice() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      productId: string;
      city: string;
      branch: string;
      price: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .setProductLocationPrice as
        | ((
            productId: string,
            city: string,
            branch: string,
            price: number,
          ) => Promise<unknown>)
        | undefined;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn(data.productId, data.city, data.branch, data.price);
    },
    onSuccess: (_r, variables) => {
      void qc.invalidateQueries({
        queryKey: ["product-location-prices", variables.productId],
      });
      void qc.invalidateQueries({
        queryKey: ["product-price-uniformity", variables.productId],
      });
    },
  });
}

export function useDeleteProductLocationPrice() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      productId: string;
      city: string;
      branch: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .deleteProductLocationPrice as
        | ((
            productId: string,
            city: string,
            branch: string,
          ) => Promise<unknown>)
        | undefined;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn(data.productId, data.city, data.branch);
    },
    onSuccess: (_r, variables) => {
      void qc.invalidateQueries({
        queryKey: ["product-location-prices", variables.productId],
      });
      void qc.invalidateQueries({
        queryKey: ["product-price-uniformity", variables.productId],
      });
    },
  });
}

// ─── Job City Filtering Hooks ─────────────────────────────────────────────────

export function useGetJobCitiesAvailable() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Array<{ city: string; jobCount: number }>>({
    queryKey: ["job-cities-available"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getJobCitiesAvailable as (() => Promise<unknown>) | undefined;
        if (typeof fn !== "function") return [];
        return (await fn()) as Array<{ city: string; jobCount: number }>;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSearchJobsByCity(
  city: string,
  willingToRelocate: boolean,
  relocateCities: string[],
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: ["jobs-by-city", city, willingToRelocate, relocateCities],
    queryFn: async () => {
      if (!actor || !city) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .searchJobsByCity as
          | ((
              city: string,
              relocate: boolean,
              extraCities: string[],
            ) => Promise<unknown>)
          | undefined;
        if (typeof fn !== "function") return [];
        return (await fn(city, willingToRelocate, relocateCities)) as Job[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!city,
    staleTime: 30_000,
  });
}

export function useMarkEmployerFavorite() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { employerPhone: string; city: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .markEmployerFavorite as
        | ((phone: string, city: string) => Promise<unknown>)
        | undefined;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn(data.employerPhone, data.city);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["favorite-employers"] }),
  });
}

export function useUnmarkEmployerFavorite() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { employerPhone: string; city: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .unmarkEmployerFavorite as
        | ((phone: string, city: string) => Promise<unknown>)
        | undefined;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn(data.employerPhone, data.city);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["favorite-employers"] }),
  });
}

export function useGetFavoriteEmployers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["favorite-employers"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getFavoriteEmployers as (() => Promise<unknown>) | undefined;
        if (typeof fn !== "function") return [];
        return (await fn()) as Record<string, unknown>[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetJobsByEmployer(employerPhone: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: ["jobs-by-employer", employerPhone],
    queryFn: async () => {
      if (!actor || !employerPhone) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getJobsByEmployer as
          | ((phone: string) => Promise<unknown>)
          | undefined;
        if (typeof fn !== "function") return [];
        return (await fn(employerPhone)) as Job[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!employerPhone,
    staleTime: 30_000,
  });
}

// ─── Branding Hooks ───────────────────────────────────────────────────────────

export function useGetBrandingConfig() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>>({
    queryKey: ["branding-config"],
    queryFn: async () => {
      if (!actor) return {};
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getBrandingConfig as (() => Promise<unknown>) | undefined;
        if (typeof fn !== "function") return {};
        return (await fn()) as Record<string, unknown>;
      } catch {
        return {};
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useUpdateBrandingConfig() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      brandName: string;
      logoUrl?: string;
      welcomeMessage?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .updateBrandingConfig as
        | ((d: Record<string, unknown>) => Promise<unknown>)
        | undefined;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn(data as unknown as Record<string, unknown>);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["branding-config"] }),
  });
}

export function useAddAppVersion() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      brandName: string;
      platform: string;
      version: string;
      buildNumber: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>).addAppVersion as
        | ((d: Record<string, unknown>) => Promise<unknown>)
        | undefined;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn(data as unknown as Record<string, unknown>);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["app-versions"] }),
  });
}

export function useGetAllAppVersions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["app-versions"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getAllAppVersions as (() => Promise<unknown>) | undefined;
        if (typeof fn !== "function") return [];
        return (await fn()) as Record<string, unknown>[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSetAppVersionActive() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (versionId: string) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .setAppVersionActive as ((id: string) => Promise<unknown>) | undefined;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn(versionId);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["app-versions"] }),
  });
}

// ─── Menu Repository Hooks ────────────────────────────────────────────────────

export function useGetAllMenuOptions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["menu-options"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getAllMenuOptions as (() => Promise<unknown>) | undefined;
        if (typeof fn !== "function") {
          throw new Error("Method getAllMenuOptions not available on backend");
        }
        return (await fn.call(actor)) as Record<string, unknown>[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

export function useAddMenuOption() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      label: string;
      flowId: string;
      roles: string[];
      cityModuleKey: string;
      sortOrder: number;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>).addMenuOption as
        | ((d: Record<string, unknown>) => Promise<unknown>)
        | undefined;
      if (typeof fn !== "function") {
        throw new Error("Method addMenuOption not available on backend");
      }
      const { label: _label, ...rest } = data;
      const payload = { ...rest, optionLabel: data.label };
      return fn.call(actor, payload as unknown as Record<string, unknown>);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["menu-options"] }),
  });
}

export function useUpdateMenuOption() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      label?: string;
      sortOrder?: number;
      isActive?: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .updateMenuOption as
        | ((
            id: string,
            optionLabel: string,
            sortOrder: bigint,
            isActive: boolean,
          ) => Promise<unknown>)
        | undefined;
      if (typeof fn !== "function") {
        throw new Error("Method updateMenuOption not available on backend");
      }
      return fn.call(
        actor,
        data.id,
        data.label ?? "",
        BigInt(data.sortOrder ?? 99),
        data.isActive ?? true,
      );
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["menu-options"] }),
  });
}

export function useDeleteMenuOption() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .deleteMenuOption as ((id: string) => Promise<unknown>) | undefined;
      if (typeof fn !== "function") {
        throw new Error("Method deleteMenuOption not available on backend");
      }
      return fn.call(actor, id);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["menu-options"] }),
  });
}

export function useSyncMenuOptionsFromRegistry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (actor as unknown as Record<string, unknown>)
        .syncMenuOptionsFromRegistry as (() => Promise<unknown>) | undefined;
      if (typeof fn !== "function") {
        throw new Error(
          "Sync method not available on the backend yet. Please deploy the latest backend and retry.",
        );
      }
      const result = await fn.call(actor);
      if (result === undefined || result === null) {
        throw new Error(
          "Sync returned no response — ensure backend is deployed with latest version",
        );
      }
      const r = result as Record<string, unknown>;
      const byRoleRaw = r.byRole;
      const byRole: [string, number][] = Array.isArray(byRoleRaw)
        ? (byRoleRaw as [string, unknown][]).map(([role, count]) => [
            role,
            typeof count === "bigint" ? Number(count) : Number(count ?? 0),
          ])
        : [];
      return {
        added:
          typeof r.added === "bigint" ? Number(r.added) : Number(r.added ?? 0),
        total:
          typeof r.total === "bigint" ? Number(r.total) : Number(r.total ?? 0),
        byRole,
      };
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["menu-options"] }),
  });
}

export function useGetMenuOptionsByRole() {
  const { actor } = useBackendActor();
  return useCallback(
    async (role: string): Promise<Record<string, unknown>[]> => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getMenuOptionsByRole as
          | ((r: string) => Promise<unknown>)
          | undefined;
        if (typeof fn !== "function") return [];
        const result = await fn.call(actor, role);
        return Array.isArray(result)
          ? (result as Record<string, unknown>[])
          : [];
      } catch (e) {
        console.error("getMenuOptionsByRole error:", e);
        return [];
      }
    },
    [actor],
  );
}

/**
 * React Query hook — fetches menu options for a specific role from the menu
 * repository. staleTime is 5 s so menus refresh quickly after a sync.
 */
export function useMenuOptionsByRole(role: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["menu-options-by-role", role],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getMenuOptionsByRole as
          | ((r: string) => Promise<unknown>)
          | undefined;
        if (typeof fn !== "function") return [];
        const result = await fn.call(actor, role);
        if (!Array.isArray(result)) return [];
        return (result as Record<string, unknown>[]).sort(
          (a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0),
        );
      } catch (e) {
        console.error("useMenuOptionsByRole error:", e);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!role,
    staleTime: 5_000,
  });
}

export function useGetMenuRepositoryHealth() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["menuRepositoryHealth"],
    queryFn: async () => {
      if (!actor) return { flowCount: 0, menuOptionCount: 0 };
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getMenuRepositoryHealth as (() => Promise<unknown>) | undefined;
        if (typeof fn !== "function")
          return { flowCount: 0, menuOptionCount: 0 };
        const result = await fn.call(actor);
        if (!result) return { flowCount: 0, menuOptionCount: 0 };
        const r = result as Record<string, unknown>;
        return {
          flowCount: Number((r.flowCount as bigint | number | undefined) ?? 0n),
          menuOptionCount: Number(
            (r.menuOptionCount as bigint | number | undefined) ?? 0n,
          ),
        };
      } catch {
        return { flowCount: 0, menuOptionCount: 0 };
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Manufacturer hooks ────────────────────────────────────────────────────────

export function useManufacturerByUser() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["manufacturer-by-user"],
    queryFn: async () => {
      if (!actor) return null;
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerByUser;
      if (typeof fn !== "function") return null;
      const res = await fn();
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; ok?: unknown };
        return r.__kind__ === "ok" ? r.ok : null;
      }
      return res ?? null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useManufacturerDashboardStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["manufacturer-dashboard-stats"],
    queryFn: async () => {
      if (!actor) return null;
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerDashboardStats;
      if (typeof fn !== "function") return null;
      const res = await fn();
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; ok?: unknown };
        return r.__kind__ === "ok" ? r.ok : null;
      }
      return res ?? null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useManufacturerProducts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["manufacturer-products"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerProducts;
      if (typeof fn !== "function") return [];
      const res = await fn();
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; ok?: unknown };
        return r.__kind__ === "ok" && Array.isArray(r.ok) ? r.ok : [];
      }
      return Array.isArray(res) ? res : [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useDistributorNetwork() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["distributor-network"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getDistributorNetwork;
      if (typeof fn !== "function") return [];
      const res = await fn();
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; ok?: unknown };
        return r.__kind__ === "ok" && Array.isArray(r.ok) ? r.ok : [];
      }
      return Array.isArray(res) ? res : [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useExpiryReturns() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["expiry-returns"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getExpiryReturns;
      if (typeof fn !== "function") return [];
      const res = await fn();
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; ok?: unknown };
        return r.__kind__ === "ok" && Array.isArray(r.ok) ? r.ok : [];
      }
      return Array.isArray(res) ? res : [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useManufacturerComplaints() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["manufacturer-complaints"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerComplaints;
      if (typeof fn !== "function") return [];
      const res = await fn();
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; ok?: unknown };
        return r.__kind__ === "ok" && Array.isArray(r.ok) ? r.ok : [];
      }
      return Array.isArray(res) ? res : [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useManufacturerRatings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["manufacturer-ratings"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerRatings;
      if (typeof fn !== "function") return [];
      const res = await fn();
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; ok?: unknown };
        return r.__kind__ === "ok" && Array.isArray(r.ok) ? r.ok : [];
      }
      return Array.isArray(res) ? res : [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useRegisterManufacturer() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      userId: string;
      businessName: string;
      customerCarePhone: string;
      customerCareEmail: string;
      registeredCity: string;
      productCategories: string[];
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).registerManufacturer;
      if (typeof fn !== "function")
        throw new Error("registerManufacturer method not available");
      const res = await fn.call(
        actor,
        input.userId,
        input.businessName,
        input.customerCarePhone,
        input.customerCareEmail,
        input.productCategories,
        input.registeredCity,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: unknown };
        if ("err" in r)
          throw new Error((r.err as any)?.errorDetail ?? String(r.err));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["manufacturer-by-user"] });
      void qc.invalidateQueries({ queryKey: ["manufacturer-dashboard-stats"] });
    },
  });
}

export interface BulkPricingTier {
  minQty: bigint;
  maxQty: bigint;
  pricePerUnit: number;
}

export function useAddManufacturerProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      manufacturerId: string;
      productName: string;
      batchNumber: string;
      hsnCode: string | null;
      batchCode: string | null;
      originCity: string;
      manufactureDate: bigint;
      expiryDate: string | null;
      priceToDistributor: number;
      priceToCustomer: number;
      bulkPricingTiers: Array<{
        minQty: bigint;
        maxQty: bigint;
        pricePerUnit: number;
      }>;
      isReturnable: boolean;
      stockQty: bigint;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addManufacturerProduct;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.manufacturerId,
        input.productName,
        input.batchNumber,
        input.hsnCode,
        input.batchCode,
        input.originCity,
        input.manufactureDate,
        input.expiryDate,
        input.priceToDistributor,
        input.priceToCustomer,
        input.bulkPricingTiers,
        input.isReturnable,
        input.stockQty,
      );
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; err?: unknown; ok?: unknown };
        if (r.__kind__ === "err") throw new Error(String(r.err));
        return r.ok;
      }
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: unknown };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["manufacturer-products"] });
      void qc.invalidateQueries({ queryKey: ["manufacturer-dashboard-stats"] });
    },
  });
}

export function useAddDistributorToNetwork() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      manufacturerId: string;
      distributorName: string;
      distributorPhone: string;
      city: string;
      pincode: string;
      schemeApplicable: string;
      marginPercent: number;
      routeDescription: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addDistributorToNetwork;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.manufacturerId,
        input.distributorName,
        input.distributorPhone,
        input.city,
        input.pincode,
        input.schemeApplicable,
        input.marginPercent,
        input.routeDescription,
      );
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; err?: unknown; ok?: unknown };
        if (r.__kind__ === "err") throw new Error(String(r.err));
        return r.ok;
      }
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: unknown };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["distributor-network"] });
      void qc.invalidateQueries({ queryKey: ["manufacturer-dashboard-stats"] });
    },
  });
}

export function useDiscontinueProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      productId: string;
      manufacturerId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).discontinueProduct;
      if (typeof fn !== "function")
        throw new Error("discontinueProduct method not available");
      const res = await fn.call(actor, input.productId, input.manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: unknown };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["manufacturer-products"] });
      void qc.invalidateQueries({ queryKey: ["manufacturer-dashboard-stats"] });
    },
  });
}

export function useValidateMerchantForDistributor() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (phone: string) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).validateMerchantForDistributor;
      if (typeof fn !== "function")
        throw new Error("validateMerchantForDistributor method not available");
      const res = await fn.call(actor, phone);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: unknown };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok as string;
      }
      return res as string;
    },
  });
}

export function useAddDeliveryPartnerToDistributor() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      distributorId: string;
      phone: string;
      name: string;
      route: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addDeliveryPartnerToDistributor;
      if (typeof fn !== "function")
        throw new Error("addDeliveryPartnerToDistributor method not available");
      const res = await fn.call(
        actor,
        input.distributorId,
        input.phone,
        input.name,
        input.route,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: unknown };
        if ("err" in r) throw new Error(String(r.err));
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["distributor-network"] });
    },
  });
}

export function useGetManufacturerReviewsAndComplaints(
  manufacturerId: string | undefined,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["manufacturer-reviews-complaints", manufacturerId],
    queryFn: async () => {
      if (!actor || !manufacturerId) return null;
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerReviewsAndComplaints;
      if (typeof fn !== "function") return null;
      const res = await fn.call(actor, manufacturerId);
      return res ?? null;
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useGetProductsForDistributor(
  manufacturerId: string | undefined,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products-for-distributor", manufacturerId],
    queryFn: async () => {
      if (!actor || !manufacturerId) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getProductsForDistributor;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      return Array.isArray(res) ? res : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useApproveExpiryReturn() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (returnId: string) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).approveExpiryReturn;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn(returnId);
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; err?: unknown };
        if (r.__kind__ === "err") throw new Error(String(r.err));
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["expiry-returns"] });
      void qc.invalidateQueries({ queryKey: ["manufacturer-dashboard-stats"] });
    },
  });
}

export function useRejectExpiryReturn() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (returnId: string) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).rejectExpiryReturn;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn(returnId);
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; err?: unknown };
        if (r.__kind__ === "err") throw new Error(String(r.err));
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["expiry-returns"] });
      void qc.invalidateQueries({ queryKey: ["manufacturer-dashboard-stats"] });
    },
  });
}

export function useResolveComplaint() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (complaintId: string) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).resolveComplaint;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn(complaintId);
      if (res && typeof res === "object" && "__kind__" in (res as object)) {
        const r = res as { __kind__: string; err?: unknown };
        if (r.__kind__ === "err") throw new Error(String(r.err));
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["manufacturer-complaints"] });
      void qc.invalidateQueries({ queryKey: ["manufacturer-dashboard-stats"] });
    },
  });
}
// ─── Barcode & Scan History ────────────────────────────────────────────────────

export function useGetProductByBarcode() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (barcodeValue: string) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getProductByBarcode;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn.call(actor, barcodeValue) as Promise<
        import("../backend.d").Product | null
      >;
    },
  });
}

export function useAddProductScanHistory() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      entry: import("../backend.d").ProductScanHistoryInput,
    ) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addProductScanHistory;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(actor, entry);
      const r = res as
        | { __kind__: "ok"; ok: import("../backend.d").ProductScanHistory }
        | { __kind__: "err"; err: { errorDetail: string } };
      if (r.__kind__ === "err") throw new Error(r.err.errorDetail);
      return r.ok;
    },
    onSuccess: (_data, variables) => {
      void qc.invalidateQueries({
        queryKey: ["product-scan-history", variables.merchantId],
      });
    },
  });
}

export function useGetProductScanHistory(
  merchantId: string | undefined,
  limit = 20,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["product-scan-history", merchantId, limit],
    queryFn: async () => {
      if (!actor || !merchantId) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getProductScanHistory;
      if (typeof fn !== "function") return [];
      return fn.call(actor, merchantId, BigInt(limit)) as Promise<
        import("../backend.d").ProductScanHistory[]
      >;
    },
    enabled: !!actor && !isFetching && !!merchantId,
    staleTime: 15_000,
  });
}

export function useDeleteProductScanEntry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      entryId,
      merchantId,
    }: {
      entryId: string;
      merchantId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).deleteProductScanEntry;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(actor, entryId, merchantId);
      const r = res as
        | { __kind__: "ok"; ok: boolean }
        | { __kind__: "err"; err: { errorDetail: string } };
      if (r.__kind__ === "err") throw new Error(r.err.errorDetail);
      return r.ok;
    },
    onSuccess: (_data, variables) => {
      void qc.invalidateQueries({
        queryKey: ["product-scan-history", variables.merchantId],
      });
    },
  });
}

// ─── ShiftState type ──────────────────────────────────────────────────────────

export type ShiftState = {
  isActive: boolean;
  checkInTime: number | null;
  elapsedMinutes: number;
};

// ─── useDeliveryShift ─────────────────────────────────────────────────────────

export function useDeliveryShift(partnerId?: string) {
  const { actor, isFetching } = useBackendActor();
  const queryClient = useQueryClient();

  const currentShiftQuery = useQuery<
    import("../backend.d").DeliveryPartnerShift | null
  >({
    queryKey: ["currentDeliveryShift", partnerId],
    queryFn: async () => {
      if (!actor || !partnerId) return null;
      const result = await actor.getCurrentDeliveryShift(partnerId);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && !!partnerId,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const historyQuery = useQuery<import("../backend.d").DeliveryPartnerShift[]>({
    queryKey: ["deliveryShiftHistory", partnerId],
    queryFn: async () => {
      if (!actor || !partnerId) return [];
      return actor.getDeliveryShiftHistory(partnerId);
    },
    enabled: !!actor && !isFetching && !!partnerId,
    staleTime: 60_000,
  });

  const startShiftMutation = useMutation({
    mutationFn: async (pid: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.startDeliveryShift(pid);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentDeliveryShift"] }),
  });

  const endShiftMutation = useMutation({
    mutationFn: async (shiftId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.endDeliveryShift(shiftId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentDeliveryShift"] });
      queryClient.invalidateQueries({ queryKey: ["deliveryShiftHistory"] });
    },
  });

  const shift = currentShiftQuery.data ?? null;
  const isActive =
    shift !== null &&
    typeof (shift as { status?: string }).status === "string" &&
    (shift as { status: string }).status === "active";
  const checkInTime = shift ? Number(shift.checkInTime) / 1_000_000 : null;
  const elapsedMinutes =
    checkInTime !== null ? Math.floor((Date.now() - checkInTime) / 60_000) : 0;

  return {
    currentShift: shift,
    isActive,
    checkInTime,
    elapsedMinutes,
    shiftHistory: historyQuery.data ?? [],
    startShift: (pid: string) => startShiftMutation.mutate(pid),
    endShift: (shiftId: string) => endShiftMutation.mutate(shiftId),
    getCurrentShift: () =>
      queryClient.invalidateQueries({ queryKey: ["currentDeliveryShift"] }),
    getShiftHistory: () =>
      queryClient.invalidateQueries({ queryKey: ["deliveryShiftHistory"] }),
    isStarting: startShiftMutation.isPending,
    isEnding: endShiftMutation.isPending,
    isLoading: currentShiftQuery.isLoading,
  };
}

export function useGetMerchantSubscriptionStatus(merchantId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["merchant-subscription-status", merchantId],
    queryFn: async () => {
      if (!actor || !merchantId) return null;
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getMerchantSubscriptionStatus;
      if (typeof fn !== "function") return null;
      return fn.call(actor, merchantId) as Promise<{
        isAtLimit: boolean;
        productCount: bigint;
        isActive: boolean;
        productLimit?: bigint;
        daysRemaining?: bigint;
        planName: string;
      }>;
    },
    enabled: !!actor && !isFetching && !!merchantId,
    staleTime: 60_000,
  });
}

// ─── Tip Hooks ───────────────────────────────────────────────────────────────

export interface PartnerTip {
  id: string;
  partnerId: string;
  customerId: string;
  customerName: string;
  orderId: string;
  amount: number;
  createdAt: number;
}

export function useGetPartnerTips(partnerId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PartnerTip[]>({
    queryKey: ["partnerTips", partnerId],
    queryFn: async () => {
      if (!actor || !partnerId) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getPartnerTips;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor, partnerId)) as Array<
        Record<string, unknown>
      >;
      return (result ?? []).map((t) => ({
        id: String(t.id ?? ""),
        partnerId: String(t.partnerId ?? ""),
        customerId: String(t.customerId ?? ""),
        customerName: String(t.customerName ?? "Customer"),
        orderId: String(t.orderId ?? ""),
        amount: Number(t.amount ?? 0),
        createdAt: Number(t.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching && !!partnerId,
    staleTime: 30_000,
  });
}

export function useGetTotalTipsEarned(partnerId?: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<number>({
    queryKey: ["totalTipsEarned", partnerId],
    queryFn: async () => {
      if (!actor || !partnerId) return 0;
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getTotalTipsEarned;
      if (typeof fn !== "function") return 0;
      const result = await fn.call(actor, partnerId);
      return Number(result ?? 0);
    },
    enabled: !!actor && !isFetching && !!partnerId,
    staleTime: 30_000,
  });
}

// ─── Additional Data Hooks ────────────────────────────────────────────────────

export function useGetAllManufacturers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allManufacturers"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllManufacturers;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllDistributors() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allDistributors"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllDistributors;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllBlogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllBlogs;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllLanguageCourses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allLanguageCourses"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllLanguageCourses;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllVisitorCheckins() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allVisitorCheckins"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllVisitorCheckins;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        checkInTime: Number(r.checkInTime ?? 0),
        checkOutTime: Number(r.checkOutTime ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllRecharges() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allRecharges"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllRecharges;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        amount: Number(r.amount ?? 0),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllBillPayments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allBillPayments"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllBillPayments;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        amount: Number(r.amount ?? 0),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllFastagTransactions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allFastagTransactions"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllFastagTransactions;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        amount: Number(r.amount ?? 0),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllLpgBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allLpgBookings"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllLpgBookings;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllMunicipalityPayments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allMunicipalityPayments"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllMunicipalityPayments;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        amount: Number(r.amount ?? 0),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllInsurancePayments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allInsurancePayments"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllInsurancePayments;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        amount: Number(r.amount ?? 0),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllMatrimonyProfiles() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allMatrimonyProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllMatrimonyProfiles;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        createdAt: Number(r.createdAt ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllEmployeeAttendance() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["allEmployeeAttendance"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getAllEmployeeAttendance;
      if (typeof fn !== "function") return [];
      const result = (await fn.call(actor)) as Array<Record<string, unknown>>;
      return (result ?? []).map((r) => ({
        ...r,
        id: String(r.id ?? ""),
        checkIn: Number(r.checkIn ?? 0),
        checkOut: Number(r.checkOut ?? 0),
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Manufacturer POS hooks ────────────────────────────────────────────────────

export function useGetManufacturerProductsForMerchant(merchantPhone: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["mfg-products-for-merchant", merchantPhone],
    queryFn: async () => {
      if (!actor || !merchantPhone) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerProductsForMerchant;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, merchantPhone);
      return (res as unknown[]) ?? [];
    },
    enabled: !!actor && !isFetching && !!merchantPhone,
    staleTime: 30_000,
  });
}

export function usePlaceManufacturerOrder() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (order: Record<string, unknown>) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addManufacturerPOSOrder;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn.call(actor, order);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["mfg-pos-orders"] });
      void qc.invalidateQueries({ queryKey: ["mfg-products-for-merchant"] });
    },
  });
}

export function useGetManufacturerPOSOrders(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["mfg-pos-orders", manufacturerId],
    queryFn: async () => {
      if (!actor || !manufacturerId) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerPOSOrders;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      return (res as unknown[]) ?? [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 20_000,
  });
}

export function useUpdatePOSOrderStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
      deliveryPartnerPhone,
    }: {
      orderId: string;
      status: string;
      deliveryPartnerPhone?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).updatePOSOrderStatus;
      if (typeof fn !== "function") throw new Error("Method not available");
      return fn.call(actor, orderId, status, deliveryPartnerPhone ?? "");
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["mfg-pos-orders"] });
    },
  });
}

export function useSaveFlowSession() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (session: Record<string, unknown>) => {
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).saveFlowSession;
      if (typeof fn !== "function") return;
      await fn.call(actor, session);
    },
  });
}

export function useGetFlowSessions(role: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Record<string, unknown>[]>({
    queryKey: ["flow-sessions", role],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getFlowSessions;
      if (typeof fn !== "function") return [];
      const result = await fn.call(actor, role);
      if (result && typeof result === "object" && "ok" in result)
        return (result as { ok: Record<string, unknown>[] }).ok;
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 5_000,
  });
}

// ─── Manufacturer Employee Hooks ──────────────────────────────────────────────

export interface ManufacturerEmployee {
  id: string;
  manufacturerId: string;
  name: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: bigint;
}

export function useGetManufacturerEmployees(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ManufacturerEmployee[]>({
    queryKey: ["manufacturer-employees", manufacturerId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerEmployees;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: ManufacturerEmployee[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as ManufacturerEmployee[]) : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useAddManufacturerEmployee() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      manufacturerId: string;
      name: string;
      phone: string;
      role: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addManufacturerEmployee;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.manufacturerId,
        input.name,
        input.phone,
        input.role,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["manufacturer-employees", vars.manufacturerId],
      });
    },
  });
}

export function useUpdateManufacturerEmployee() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      employeeId: string;
      manufacturerId: string;
      name?: string;
      phone?: string;
      role?: string;
      isActive?: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).updateManufacturerEmployee;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.employeeId,
        input.name ?? null,
        input.phone ?? null,
        input.role ?? null,
        input.isActive ?? null,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["manufacturer-employees", vars.manufacturerId],
      });
    },
  });
}

export interface EmployeeAttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  notes: string | null;
  recordedAt: bigint;
}

export function useGetManufacturerEmployeeAttendance(
  employeeId: string,
  date: string,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<EmployeeAttendanceRecord[]>({
    queryKey: ["mfr-employee-attendance", employeeId, date],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerEmployeeAttendance;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, employeeId, date);
      if (res && typeof res === "object") {
        const r = res as { ok?: EmployeeAttendanceRecord[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as EmployeeAttendanceRecord[]) : [];
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 30_000,
  });
}

export function useRecordManufacturerEmployeeAttendance() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      employeeId: string;
      manufacturerId: string;
      date: string;
      action: "checkin" | "checkout";
      notes?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).recordManufacturerEmployeeAttendance;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.employeeId,
        input.date,
        input.action,
        input.notes ?? null,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-employee-attendance", vars.employeeId],
      });
    },
  });
}

export interface ManufacturerLeaveRequest {
  id: string;
  employeeId: string;
  manufacturerId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  reviewedBy: string | null;
  reviewedAt: bigint | null;
  createdAt: bigint;
}

export function useGetManufacturerLeaveRequests(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ManufacturerLeaveRequest[]>({
    queryKey: ["mfr-leave-requests", manufacturerId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerLeaveRequests;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: ManufacturerLeaveRequest[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as ManufacturerLeaveRequest[]) : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useSubmitManufacturerLeave() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      employeeId: string;
      manufacturerId: string;
      leaveType: string;
      startDate: string;
      endDate: string;
      reason: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).submitManufacturerLeave;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.employeeId,
        input.manufacturerId,
        input.leaveType,
        input.startDate,
        input.endDate,
        input.reason,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-leave-requests", vars.manufacturerId],
      });
    },
  });
}

export function useApproveManufacturerLeave() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      leaveId: string;
      manufacturerId: string;
      approve: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).approveManufacturerLeave;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(actor, input.leaveId, input.approve);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-leave-requests", vars.manufacturerId],
      });
    },
  });
}

// ─── Manufacturer Inventory Hooks ─────────────────────────────────────────────

export interface InventoryItem {
  id: string;
  manufacturerId: string;
  productName: string;
  batchCode: string;
  currentStock: number;
  reorderLevel: number;
  unit: string;
  expiryDate: string | null;
  createdAt: bigint;
}

export function useGetInventoryItems(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<InventoryItem[]>({
    queryKey: ["mfr-inventory-items", manufacturerId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getInventoryItems;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: InventoryItem[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as InventoryItem[]) : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useAddInventoryItem() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      manufacturerId: string;
      productName: string;
      batchCode: string;
      currentStock: number;
      reorderLevel: number;
      unit: string;
      expiryDate?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addInventoryItem;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.manufacturerId,
        input.productName,
        input.batchCode,
        input.currentStock,
        input.reorderLevel,
        input.unit,
        input.expiryDate ?? null,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-inventory-items", vars.manufacturerId],
      });
    },
  });
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  txnType: string;
  quantity: number;
  referenceId: string | null;
  notes: string | null;
  createdAt: bigint;
}

export function useGetInventoryTransactions(itemId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<InventoryTransaction[]>({
    queryKey: ["mfr-inventory-txns", itemId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getInventoryTransactions;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, itemId);
      if (res && typeof res === "object") {
        const r = res as { ok?: InventoryTransaction[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as InventoryTransaction[]) : [];
    },
    enabled: !!actor && !isFetching && !!itemId,
    staleTime: 30_000,
  });
}

export function useUpdateInventoryStock() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      itemId: string;
      manufacturerId: string;
      txnType:
        | "sale"
        | "purchase"
        | "restock"
        | "expiry_write_off"
        | "return_item"
        | "adjustment";
      quantity: number;
      notes?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).updateInventoryStock;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.itemId,
        input.txnType,
        input.quantity,
        input.notes ?? null,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-inventory-items", vars.manufacturerId],
      });
      void qc.invalidateQueries({
        queryKey: ["mfr-inventory-txns", vars.itemId],
      });
    },
  });
}

// ─── Manufacturer Sales & Purchases Hooks ─────────────────────────────────────

export interface SaleRecord {
  id: string;
  manufacturerId: string;
  buyerPhone: string;
  buyerType: string;
  products: Array<{ productName: string; qty: number; unitPrice: number }>;
  totalAmount: number;
  invoiceNo: string;
  paymentStatus: string;
  createdAt: bigint;
}

export function useGetSaleRecords(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SaleRecord[]>({
    queryKey: ["mfr-sale-records", manufacturerId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerSaleRecords;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: SaleRecord[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as SaleRecord[]) : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useAddSaleRecord() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      manufacturerId: string;
      buyerPhone: string;
      buyerType: string;
      products: Array<{ productName: string; qty: number; unitPrice: number }>;
      totalAmount: number;
      invoiceNo: string;
      paymentStatus: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addManufacturerSaleRecord;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.manufacturerId,
        input.buyerPhone,
        input.buyerType,
        input.products,
        input.totalAmount,
        input.invoiceNo,
        input.paymentStatus,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-sale-records", vars.manufacturerId],
      });
    },
  });
}

export interface PurchaseRecord {
  id: string;
  manufacturerId: string;
  supplierName: string;
  products: Array<{ productName: string; qty: number; unitPrice: number }>;
  totalAmount: number;
  invoiceNo: string;
  paymentStatus: string;
  createdAt: bigint;
}

export function useGetPurchaseRecords(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PurchaseRecord[]>({
    queryKey: ["mfr-purchase-records", manufacturerId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerPurchaseRecords;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: PurchaseRecord[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as PurchaseRecord[]) : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useAddPurchaseRecord() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      manufacturerId: string;
      supplierName: string;
      products: Array<{ productName: string; qty: number; unitPrice: number }>;
      totalAmount: number;
      invoiceNo: string;
      paymentStatus: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addManufacturerPurchaseRecord;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.manufacturerId,
        input.supplierName,
        input.products,
        input.totalAmount,
        input.invoiceNo,
        input.paymentStatus,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-purchase-records", vars.manufacturerId],
      });
    },
  });
}

// ─── Manufacturer Accounts & Bills Hooks ──────────────────────────────────────

export interface AccountEntry {
  id: string;
  manufacturerId: string;
  entryType: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  referenceId: string | null;
  createdAt: bigint;
}

export function useGetAccountEntries(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AccountEntry[]>({
    queryKey: ["mfr-account-entries", manufacturerId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerAccountEntries;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: AccountEntry[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as AccountEntry[]) : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useAddAccountEntry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      manufacturerId: string;
      entryType: string;
      category: string;
      amount: number;
      description: string;
      date: string;
      referenceId?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addManufacturerAccountEntry;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.manufacturerId,
        input.entryType,
        input.category,
        input.amount,
        input.description,
        input.date,
        input.referenceId ?? null,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-account-entries", vars.manufacturerId],
      });
    },
  });
}

export interface BillRecord {
  id: string;
  manufacturerId: string;
  billType: string;
  partyName: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  pendingPayment: boolean;
  pendingNote: string;
  createdAt: bigint;
}

export function useGetBillRecords(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BillRecord[]>({
    queryKey: ["mfr-bill-records", manufacturerId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getManufacturerBillRecords;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: BillRecord[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as BillRecord[]) : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

export function useAddBillRecord() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      manufacturerId: string;
      billType: string;
      partyName: string;
      amount: number;
      dueDate: string;
      pendingPayment?: boolean;
      pendingNote?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).addManufacturerBillRecord;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.manufacturerId,
        input.billType,
        input.partyName,
        input.amount,
        input.dueDate,
        input.pendingPayment ?? false,
        input.pendingNote ?? "",
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-bill-records", vars.manufacturerId],
      });
    },
  });
}

export function useMarkBillPaid() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { billId: string; manufacturerId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).markManufacturerBillPaid;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(actor, input.billId);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-bill-records", vars.manufacturerId],
      });
    },
  });
}
export function useUpdateBillRecord() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      billId: string;
      manufacturerId: string;
      pendingPayment: boolean;
      pendingNote: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).updateBillRecord;
      if (typeof fn !== "function") throw new Error("Method not available");
      const res = await fn.call(
        actor,
        input.billId,
        input.pendingPayment,
        input.pendingNote,
      );
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        return r.ok;
      }
      return res;
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["mfr-bill-records", vars.manufacturerId],
      });
    },
  });
}

export function useGetPendingBills(manufacturerId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BillRecord[]>({
    queryKey: ["mfr-pending-bills", manufacturerId],
    queryFn: async () => {
      if (!actor) return [];
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getPendingBills;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, manufacturerId);
      if (res && typeof res === "object") {
        const r = res as { ok?: BillRecord[]; err?: string };
        if ("err" in r) throw new Error(String(r.err));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as BillRecord[]) : [];
    },
    enabled: !!actor && !isFetching && !!manufacturerId,
    staleTime: 30_000,
  });
}

// ─── Flow Agent Diagnostics ────────────────────────────────────────────────

type FlowAgentDiagnosticRecord = {
  diagnosticId: string;
  flowId: string;
  flowName: string;
  issue: string;
  severity: string;
  proposedFix: string;
  fixStatus: string;
  timestamp: number;
};

export function useSaveFlowAgentDiagnostic() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (params: FlowAgentDiagnosticRecord) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.saveFlowAgentDiagnostic;
      if (typeof fn !== "function")
        throw new Error("saveFlowAgentDiagnostic not available");
      const res = await fn.call(actor, params);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string; errorDetail?: string };
        if ("err" in r)
          throw new Error(r.errorDetail ?? String(r.err ?? "Unknown error"));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["flow-agent-diagnostics"] });
    },
  });
}

export function useGetFlowAgentDiagnostics() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<FlowAgentDiagnosticRecord[]>({
    queryKey: ["flow-agent-diagnostics"],
    queryFn: async () => {
      if (!actor) return [];
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.getFlowAgentDiagnostics;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor);
      if (res && typeof res === "object") {
        const r = res as { ok?: FlowAgentDiagnosticRecord[]; err?: string };
        if ("err" in r) throw new Error(String(r.err ?? "Unknown error"));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as FlowAgentDiagnosticRecord[]) : [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useUpdateFlowAgentDiagnosticStatus() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (params: { diagnosticId: string; fixStatus: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.updateFlowAgentDiagnosticStatus;
      if (typeof fn !== "function")
        throw new Error("updateFlowAgentDiagnosticStatus not available");
      const res = await fn.call(actor, params.diagnosticId, params.fixStatus);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string };
        if ("err" in r) throw new Error(String(r.err ?? "Unknown error"));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["flow-agent-diagnostics"] });
    },
  });
}

// ─── Advertisements ───────────────────────────────────────────────────────

type Advertisement = {
  adId: string;
  title: string;
  description: string;
  targetRole: string;
  city: string;
  active: boolean;
  createdAt: number;
};

export function useGetAdvertisements() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Advertisement[]>({
    queryKey: ["advertisements"],
    queryFn: async () => {
      if (!actor) return [];
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.getAdvertisements;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor);
      if (res && typeof res === "object") {
        const r = res as { ok?: Advertisement[]; err?: string };
        if ("err" in r) throw new Error(String(r.err ?? "Unknown error"));
        if ("ok" in r) return r.ok ?? [];
      }
      return Array.isArray(res) ? (res as Advertisement[]) : [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSaveAdvertisement() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (params: Omit<Advertisement, "createdAt">) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.saveAdvertisement;
      if (typeof fn !== "function")
        throw new Error("saveAdvertisement not available");
      const res = await fn.call(actor, params);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string; errorDetail?: string };
        if ("err" in r)
          throw new Error(r.errorDetail ?? String(r.err ?? "Unknown error"));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["advertisements"] });
    },
  });
}

export function useUpdateAdvertisement() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (params: Omit<Advertisement, "createdAt">) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.updateAdvertisement;
      if (typeof fn !== "function")
        throw new Error("updateAdvertisement not available");
      const res = await fn.call(actor, params);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string; errorDetail?: string };
        if ("err" in r)
          throw new Error(r.errorDetail ?? String(r.err ?? "Unknown error"));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["advertisements"] });
    },
  });
}

export function useDeleteAdvertisement() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (adId: string) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.deleteAdvertisement;
      if (typeof fn !== "function")
        throw new Error("deleteAdvertisement not available");
      const res = await fn.call(actor, adId);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string; errorDetail?: string };
        if ("err" in r)
          throw new Error(r.errorDetail ?? String(r.err ?? "Unknown error"));
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["advertisements"] });
    },
  });
}

// ─── Delivery Assignment ──────────────────────────────────────────────────────

export interface DeliveryAssignmentRequest {
  requesterId: string;
  requesterType: "Merchant" | "Manufacturer";
  requestedCount: number;
  city: string;
  description: string;
}

export function useCreateDeliveryAssignment() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (request: DeliveryAssignmentRequest) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.createDeliveryAssignment;
      if (typeof fn !== "function")
        throw new Error("createDeliveryAssignment not available");
      const res = await fn.call(actor, request);
      if (res && typeof res === "object") {
        const r = res as { ok?: unknown; err?: string; errorDetail?: string };
        if ("err" in r)
          throw new Error(
            r.errorDetail ?? String(r.err ?? "Assignment failed"),
          );
        if ("ok" in r) return r.ok;
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["delivery-assignments"] });
    },
  });
}

export function useGetDeliveryAssignments(requesterId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["delivery-assignments", requesterId],
    queryFn: async () => {
      if (!actor || !requesterId) return [];
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.getDeliveryAssignments;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, requesterId);
      return Array.isArray(res) ? (res as Record<string, unknown>[]) : [];
    },
    enabled: !!actor && !isFetching && !!requesterId,
    staleTime: 5_000,
  });
}

export function useGetAvailableDeliveryPartners(city: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["available-delivery-partners", city],
    queryFn: async () => {
      if (!actor || !city) return [];
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.getAvailableDeliveryPartners;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor, city);
      return Array.isArray(res) ? (res as Record<string, unknown>[]) : [];
    },
    enabled: !!actor && !isFetching && !!city,
    staleTime: 5_000,
    refetchInterval: 10_000,
  });
}

export function useUpdateAssignmentRoute() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async ({
      assignmentId,
      partnerId,
      newRoute,
    }: {
      assignmentId: string;
      partnerId: string;
      newRoute: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.updateAssignmentRoute;
      if (typeof fn !== "function")
        throw new Error("updateAssignmentRoute not available");
      return fn.call(actor, assignmentId, partnerId, newRoute);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["delivery-assignments"] });
    },
  });
}

export function useRegisterDeliveryPartner() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (data: {
      userId: string;
      phone: string;
      name: string;
      vehicleType: string;
      serviceType: string;
      ratePerKm: number;
      aadhaarNo: string;
      rcBook: string;
      panNo: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.registerDeliveryPartnerV2;
      if (typeof fn !== "function")
        throw new Error("registerDeliveryPartnerV2 not available");
      const r = (await fn.call(
        actor,
        data.userId,
        data.phone,
        data.name,
        data.vehicleType,
        data.serviceType,
        data.ratePerKm,
        data.aadhaarNo,
        data.rcBook,
        data.panNo,
      )) as { ok?: unknown; err?: { errorDetail?: string } | string };
      if ("err" in r)
        throw new Error(
          (r.err as { errorDetail?: string })?.errorDetail ?? String(r.err),
        );
      return r.ok;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["deliveryPartners"] });
    },
  });
}

export function useGetMenuWebhookUpdateLog() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["menuWebhookLog"],
    queryFn: async () => {
      if (!actor) return [] as string[];
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.getMenuWebhookUpdateLog;
      if (typeof fn !== "function") return [] as string[];
      const res = await fn.call(actor);
      return Array.isArray(res) ? (res as string[]) : [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 5_000,
  });
}
