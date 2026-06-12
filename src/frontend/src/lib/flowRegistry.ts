// ─── Unified Flow Registry ────────────────────────────────────────────────────
// Single source of truth for all chatbot flows across the platform.
// ChatbotSimulatorPage, ScriptExecutorPage, TelegramConfigPage, FlowDesignerPage,
// and ModulesPage all import from here — never maintain separate lists.
// ALL flows come from the backend. No hardcoded flow data anywhere.

export type FlowCategory =
  | "customer"
  | "merchant"
  | "delivery"
  | "sarthi"
  | "jobs"
  | "marketplace"
  | "transport"
  | "social"
  | "support";

export interface FlowDefinition {
  id: string;
  name: string;
  description: string;
  category: FlowCategory;
  triggerPayload: string;
  moduleKey?: string;
  roles: ("customer" | "merchant" | "delivery" | "sarthi" | "all")[];
  /** Serialised node/edge graph — populated from backend FlowDefinition.flowJson */
  flowJson?: string;
}

// ─── Dynamic Registry Layer ───────────────────────────────────────────────────
// Starts EMPTY. Populated by initRegistryFromBackend() which is called once on
// app startup and whenever the Flow Designer saves a new/updated flow.

const _dynamicRegistry = new Map<string, FlowDefinition>();

// Track which flows have been customized (created or edited by an admin)
const _customizedIds = new Set<string>();

// ─── Backend actor accessor ───────────────────────────────────────────────────
// Weak reference to the actor — set externally by App.tsx / main.tsx once
// the actor becomes available, so the registry can call backend methods.

let _backendActor: Record<string, unknown> | null = null;

export function setRegistryActor(actor: Record<string, unknown>): void {
  _backendActor = actor;
}

// ─── Infer helpers ────────────────────────────────────────────────────────────

function inferCategoryFromName(name: string, env: string): FlowCategory {
  const n = `${name} ${env}`.toLowerCase();
  if (
    n.includes("merchant") ||
    n.includes("product") ||
    n.includes("restock") ||
    n.includes("supplier")
  )
    return "merchant";
  if (n.includes("delivery") || n.includes("dp_")) return "delivery";
  if (
    n.includes("sarthi") ||
    n.includes("shuttle") ||
    n.includes("ride") ||
    n.includes("transport")
  )
    return "transport";
  if (n.includes("job") || n.includes("employ")) return "jobs";
  if (n.includes("property")) return "marketplace";
  if (
    n.includes("recipe") ||
    n.includes("family") ||
    n.includes("social") ||
    n.includes("matrimony") ||
    n.includes("donation")
  )
    return "social";
  if (n.includes("support") || n.includes("ticket")) return "support";
  if (
    n.includes("sms") ||
    n.includes("old_item") ||
    n.includes("ondc") ||
    n.includes("event")
  )
    return "marketplace";
  return "customer";
}

function inferModuleKeyFromName(name: string): string | undefined {
  const n = name.toLowerCase();
  if (n.includes("restock") || n.includes("supplier")) return "Restock";
  if (n.includes("job") && !n.includes("daily") && !n.includes("adhoc"))
    return "Jobs";
  if (n.includes("daily_job") || n.includes("adhoc")) return "AdhocJobs";
  if (n.includes("property")) return "Property";
  if (n.includes("shuttle")) return "Shuttle";
  if (n.includes("sarthi") || n.includes("transport")) return "Transport";
  if (n.includes("free_ride") || n.includes("ride_shar")) return "FreeRide";
  if (n.includes("event")) return "Events";
  if (n.includes("matrimony") || n.includes("search_partner"))
    return "Matrimony";
  if (n.includes("donation")) return "Donations";
  if (n.includes("family")) return "Family";
  if (n.includes("recipe")) return "Recipes";
  if (n.includes("promo") || n.includes("ads") || n.includes("influencer"))
    return "Promotions";
  if (n.includes("support") || n.includes("ticket")) return "SupportTickets";
  if (n.includes("ondc")) return "ONDC";
  if (n.includes("sms")) return "SMS";
  if (
    n.includes("old_item") ||
    n.includes("sell_item") ||
    n.includes("buy_item")
  )
    return "old_items";
  if (
    n.includes("shopping") ||
    n.includes("order") ||
    n.includes("product") ||
    n.includes("merchant") ||
    n.includes("browse")
  )
    return "Shopping";
  if (
    n.includes("market") ||
    n.includes("commodity") ||
    n.includes("stock") ||
    n.includes("share price") ||
    n.includes("exchange")
  )
    return "MarketSearch";
  if (
    n.includes("match") ||
    n.includes("score") ||
    n.includes("sport") ||
    n.includes("cricket") ||
    n.includes("football")
  )
    return "sports";
  if (n.includes("lending")) return "lending";
  if (n.includes("election") || n.includes("vote")) return "elections";
  if (
    n.includes("community_parking") ||
    (n.includes("community") && n.includes("parking"))
  )
    return "community-parking";
  if (
    n.includes("community_room") ||
    (n.includes("community") && n.includes("room"))
  )
    return "community-rooms";
  if (
    n.includes("community_food") ||
    (n.includes("community") && n.includes("food"))
  )
    return "community-food";
  if (
    n.includes("community_manager") ||
    n.includes("community_service") ||
    (n.includes("community") && (n.includes("work") || n.includes("manager")))
  )
    return "community-manager";
  return undefined;
}

function inferTriggerFromId(id: string): string {
  // Use the flow id itself as trigger fallback — it's always unique
  return id;
}

function inferRolesFromName(name: string): FlowDefinition["roles"] {
  const n = name.toLowerCase();
  if (n.includes("merchant")) return ["merchant"];
  if (n.includes("delivery") || n.includes("dp_")) return ["delivery"];
  if (n.includes("sarthi")) return ["sarthi"];
  if (
    n.includes("customer") ||
    n.includes("browse") ||
    n.includes("buy") ||
    n.includes("book_ride") ||
    n.includes("search_job")
  )
    return ["customer"];
  return ["all"];
}

/** Convert a backend FlowDefinition record to a frontend FlowDefinition. */
function backendFlowToFrontend(raw: {
  id: string;
  name: string;
  flowJson: string;
  environment?: string;
  createdAt?: bigint | number;
  updatedAt?: bigint | number;
  version?: bigint | number;
}): FlowDefinition {
  // Try to extract metadata from flowJson if available
  let description = "";
  let moduleKey: string | undefined;
  let triggerPayload: string | undefined;
  let category: FlowCategory | undefined;
  let roles: FlowDefinition["roles"] | undefined;

  try {
    const json = JSON.parse(raw.flowJson || "{}") as Record<string, unknown>;
    if (typeof json.description === "string") description = json.description;
    if (typeof json.moduleKey === "string") moduleKey = json.moduleKey;
    if (typeof json.triggerPayload === "string")
      triggerPayload = json.triggerPayload;
    if (typeof json.category === "string")
      category = json.category as FlowCategory;
    if (Array.isArray(json.roles))
      roles = json.roles as FlowDefinition["roles"];
  } catch {
    /* ignore parse errors */
  }

  return {
    id: raw.id,
    name: raw.name,
    description: description || `Flow: ${raw.name}`,
    category:
      category ?? inferCategoryFromName(raw.name, raw.environment ?? ""),
    triggerPayload: triggerPayload ?? inferTriggerFromId(raw.id),
    moduleKey: moduleKey ?? inferModuleKeyFromName(raw.name),
    roles: roles ?? inferRolesFromName(raw.name),
    flowJson: raw.flowJson || undefined,
  };
}

// ─── Change listeners — notified when registry contents change ────────────────
// React hooks subscribe here so they re-render when flows load from backend.

const _changeListeners = new Set<() => void>();

export function subscribeRegistryChanges(fn: () => void): () => void {
  _changeListeners.add(fn);
  return () => _changeListeners.delete(fn);
}

function _notifyListeners(): void {
  for (const fn of _changeListeners) {
    try {
      fn();
    } catch {
      /* ignore */
    }
  }
}

// ─── Backend Initialization ───────────────────────────────────────────────────

let _initPromise: Promise<void> | null = null;
let _initialized = false;
let _lastActor: Record<string, unknown> | null = null;

/**
 * Load all flows from the backend and populate the registry.
 * If called with a NEW actor reference, re-runs (allows retrying after actor
 * becomes available for the first time).
 * Does NOT fall back to hardcoded flows on failure.
 */
export async function initRegistryFromBackend(
  actor?: Record<string, unknown>,
): Promise<void> {
  if (actor) {
    // If actor changed (first time actor is available), reset so we re-fetch
    if (actor !== _lastActor) {
      _backendActor = actor;
      _lastActor = actor;
      // Reset so we re-run the init with the real actor
      _initPromise = null;
      _initialized = false;
    }
  }
  if (_initPromise) return _initPromise;
  _initPromise = _doInit();
  return _initPromise;
}

/** Force a fresh reload from backend (e.g. after Flow Designer saves a flow). */
export async function refreshRegistryFromBackend(): Promise<void> {
  _initPromise = null;
  _initialized = false;
  return initRegistryFromBackend();
}
/** Force a complete reload — resets init state and re-runs from scratch. */
export async function forceRefreshRegistry(
  actor?: Record<string, unknown>,
): Promise<void> {
  _initPromise = null;
  _initialized = false;
  if (actor) {
    _backendActor = actor;
    _lastActor = actor;
  }
  return initRegistryFromBackend(actor);
}

async function _doInit(): Promise<void> {
  if (_initialized) return;

  const MAX_RETRIES = 10;
  const RETRY_DELAY_MS = 500;
  const MIN_FLOWS_EXPECTED = 30;

  let lastError: unknown = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const actor = _backendActor;
    if (!actor) {
      if (attempt < MAX_RETRIES - 1) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
      continue;
    }

    try {
      // Try getAllFlows first (preferred), fall back to listFlows
      const actorAny = actor as Record<string, unknown>;
      let flows: Array<{
        id: string;
        name: string;
        flowJson: string;
        environment?: string;
        createdAt?: bigint | number;
        updatedAt?: bigint | number;
        version?: bigint | number;
      }> = [];

      if (typeof actorAny.getAllFlows === "function") {
        try {
          const raw = await (actorAny.getAllFlows as () => Promise<unknown>)();
          if (Array.isArray(raw)) flows = raw as typeof flows;
        } catch {
          /* fall through to listFlows */
        }
      }

      if (flows.length === 0 && typeof actorAny.listFlows === "function") {
        try {
          const raw = await (actorAny.listFlows as () => Promise<unknown>)();
          if (Array.isArray(raw)) flows = raw as typeof flows;
        } catch {
          /* fall through */
        }
      }

      if (Array.isArray(flows)) {
        // Deduplicate: if two records share the same id, keep the one with higher version
        const seen = new Map<string, (typeof flows)[0]>();
        for (const raw of flows) {
          if (!raw?.id) continue;
          const existing = seen.get(raw.id);
          if (!existing) {
            seen.set(raw.id, raw);
          } else {
            const newVer = Number(raw.version ?? 0);
            const existVer = Number(existing.version ?? 0);
            if (newVer > existVer) seen.set(raw.id, raw);
          }
        }
        for (const raw of seen.values()) {
          const fd = backendFlowToFrontend(raw);
          _dynamicRegistry.set(fd.id, fd);
        }
      }

      if (_dynamicRegistry.size >= MIN_FLOWS_EXPECTED) {
        _initialized = true;
        break;
      }

      // Too few flows — try to trigger a reseed on the backend
      if (attempt === 0 || attempt === 2) {
        try {
          if (typeof actorAny.seedDefaultFlows === "function") {
            await (actorAny.seedDefaultFlows as () => Promise<unknown>)();
          } else if (typeof actorAny.initDefaultFlows === "function") {
            await (actorAny.initDefaultFlows as () => Promise<unknown>)();
          }
          await new Promise((r) => setTimeout(r, 800));
        } catch {
          /* reseed call is optional */
        }
      }

      if (attempt < MAX_RETRIES - 1) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      } else {
        _initialized = true;
      }
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES - 1) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }

  if (!_initialized) {
    _initialized = true;
    if (lastError) {
      console.warn(
        "[FlowRegistry] Backend load failed after retries:",
        lastError,
      );
    }
  }

  _notifyListeners();
}

// ─── Registry API ─────────────────────────────────────────────────────────────

/** Register or update a flow in the dynamic registry. */
export function registerFlow(flow: FlowDefinition): void {
  _dynamicRegistry.set(flow.id, flow);
  _customizedIds.add(flow.id);
  // Fire-and-forget backend sync
  _syncFlowToBackend(flow);
}

/** Update specific fields on an existing flow. */
export function updateFlow(id: string, updates: Partial<FlowDefinition>): void {
  const existing = _dynamicRegistry.get(id);
  if (existing) {
    const updated = { ...existing, ...updates };
    _dynamicRegistry.set(id, updated);
    _customizedIds.add(id);
    // Fire-and-forget backend sync
    _syncFlowToBackend(updated);
  }
}

/** Asynchronously persist a flow to the backend via saveFlow(). */
async function _syncFlowToBackend(flow: FlowDefinition): Promise<void> {
  const actor = _backendActor;
  if (!actor) return;
  try {
    const nowNs = BigInt(Date.now()) * BigInt(1_000_000);
    const backendFlow = {
      id: flow.id,
      name: flow.name,
      flowJson:
        flow.flowJson ??
        JSON.stringify({
          description: flow.description,
          moduleKey: flow.moduleKey,
          triggerPayload: flow.triggerPayload,
          category: flow.category,
          roles: flow.roles,
        }),
      environment: "live",
      createdAt: nowNs,
      updatedAt: nowNs,
      version: BigInt(1),
    };
    if (typeof actor.saveFlow === "function") {
      await (actor.saveFlow as (f: unknown) => Promise<unknown>)(backendFlow);
    }
  } catch (err) {
    console.warn("[FlowRegistry] Backend sync failed for flow", flow.id, err);
  }
}

/** Get all flows from the dynamic registry. */
/** Get all flows from the dynamic registry. Triggers lazy backend init if actor is available but registry is empty. */
export function getAllRegistryFlows(): FlowDefinition[] {
  // Lazy init: if registry is empty and actor is available but not yet initialized, kick off init
  if (_dynamicRegistry.size === 0 && _backendActor && !_initPromise) {
    _initPromise = _doInit();
  }
  return Array.from(_dynamicRegistry.values());
}

// ─── Registration flow IDs (used for ordering) ────────────────────────────────
const REGISTRATION_FLOW_IDS = [
  "customer_registration",
  "register_customer",
  "merchant_registration",
  "register_merchant",
  "delivery_registration",
  "register_delivery",
  "dp_registration",
  "sarthi_registration",
  "register_sarthi",
];

/**
 * Returns all flows ordered for sequential execution:
 * 1. customer_registration (always index 0)
 * 2. Other registration flows (merchant, delivery, sarthi)
 * 3. All remaining flows alphabetically by id
 *
 * This ensures registration always runs before dependent flows.
 */
export function getOrderedFlowsForExecution(): FlowDefinition[] {
  const all = getAllRegistryFlows();

  const customerReg = all.filter(
    (f) => f.id === "customer_registration" || f.id === "register_customer",
  );
  const otherReg = all.filter(
    (f) =>
      !customerReg.some((c) => c.id === f.id) &&
      REGISTRATION_FLOW_IDS.some((rid) => f.id.includes(rid) || f.id === rid),
  );
  const rest = all
    .filter(
      (f) =>
        !customerReg.some((c) => c.id === f.id) &&
        !otherReg.some((o) => o.id === f.id),
    )
    .sort((a, b) => a.id.localeCompare(b.id));

  return [...customerReg, ...otherReg, ...rest];
}

/** Returns true if a flow id is a registration flow. */
export function isRegistrationFlow(flowId: string): boolean {
  return REGISTRATION_FLOW_IDS.some(
    (rid) => flowId === rid || flowId.includes("registration"),
  );
}

/** IDs of flows that depend on a registered customer existing. */
const CUSTOMER_DEPENDENT_FLOW_IDS = [
  "place_order",
  "order_status",
  "track_order",
  "cancel_order",
  "browse_products",
  "checkout",
  "cart",
  "my_orders",
  "reorder",
  "rate_order",
];

/** Returns true if a flow requires a registered customer session. */
export function isCustomerDependentFlow(flowId: string): boolean {
  return CUSTOMER_DEPENDENT_FLOW_IDS.some(
    (dep) => flowId === dep || flowId.startsWith(dep),
  );
}

/** Get a single flow from the registry. */
export function getRegistryFlow(id: string): FlowDefinition | undefined {
  return _dynamicRegistry.get(id);
}

/** Returns true if a flow has been customized vs what the backend provides. */
export function isFlowCustomized(id: string): boolean {
  return _customizedIds.has(id);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns flows that are enabled given the current module status map.
 * moduleStatuses: { [moduleKey]: boolean } — false means disabled.
 */
export function getEnabledFlows(
  moduleStatuses: Record<string, boolean>,
): FlowDefinition[] {
  return getAllRegistryFlows().filter((f) => {
    if (!f.moduleKey) return true;
    return moduleStatuses[f.moduleKey] !== false;
  });
}

/** Returns true if the given flow is currently enabled. */
export function isFlowEnabled(
  flowId: string,
  moduleStatuses: Record<string, boolean>,
): boolean {
  const flow = _dynamicRegistry.get(flowId);
  if (!flow || !flow.moduleKey) return true;
  return moduleStatuses[flow.moduleKey] !== false;
}

/** Find a flow by its triggerPayload string. */
export function getFlowByTrigger(
  triggerPayload: string,
): FlowDefinition | undefined {
  return getAllRegistryFlows().find((f) => f.triggerPayload === triggerPayload);
}

// ─── Module helpers ───────────────────────────────────────────────────────────

export interface ModuleInfo {
  moduleKey: string;
  name: string;
  description: string;
  flowCount: number;
  enabled: boolean;
}

/** Module display names — UI metadata only, not flow data. */
const MODULE_DISPLAY: Record<string, { name: string; description: string }> = {
  MarketSearch: {
    name: "Market & Commodity Search",
    description:
      "Search stock prices, commodities, currencies, and metals from any exchange with buy/sell recommendations and stop-loss.",
  },
  Shopping: {
    name: "Shopping & Orders",
    description:
      "Customer browsing, cart, merchant orders, custom orders, delivery tracking.",
  },
  old_items: {
    name: "Old Items Marketplace",
    description:
      "Users can sell, buy, or rent second-hand items (electronics, vehicles, furniture, etc.)",
  },
  Restock: {
    name: "Restock Orders",
    description: "Merchants can order from suppliers to restock inventory.",
  },
  Jobs: {
    name: "Job Listings",
    description: "Post and search regular job listings, lead management.",
  },
  AdhocJobs: {
    name: "Adhoc Daily Jobs",
    description:
      "Post and apply for daily/one-off jobs with category and price.",
  },
  Property: {
    name: "Property Listings",
    description: "Property rental and sale listings with lead tracking.",
  },
  Transport: {
    name: "Sarthi Passenger Pickup",
    description:
      "Ride booking with sarthi partners, fare estimates, OTP verification.",
  },
  Shuttle: {
    name: "Shuttle Service",
    description: "Shuttle route posting, booking, stop-based ticketing.",
  },
  FreeRide: {
    name: "Free Ride Sharing",
    description: "Customers and riders can offer/find free shared rides.",
  },
  Events: {
    name: "Events",
    description: "Post and discover local events with ticketing info.",
  },
  Matrimony: {
    name: "Matrimony",
    description:
      "Elite matrimony search for eligible family members — filter by caste, location, education, blood group.",
  },
  Donations: {
    name: "Donations",
    description:
      "Add, search, and request donations for food items, clothes, and books.",
  },
  Healthcare: {
    name: "Healthcare",
    description:
      "Healthcare providers register with specialization; customers search and book appointments.",
  },
  Tours: {
    name: "Tours & Travel",
    description:
      "Tour operators list destinations; customers browse and book packages.",
  },
  Professional: {
    name: "Professional Services",
    description:
      "Skilled service providers register; customers browse by skill type and book a slot.",
  },
  Family: {
    name: "Family Groups",
    description: "Family group creation, member invites, group management.",
  },
  Recipes: {
    name: "Recipes",
    description: "Users can add, search, and rate recipes with ingredients.",
  },
  Promotions: {
    name: "Promotions & Advertising",
    description:
      "Influencer advertisements, location-based reach, AI moderation.",
  },
  SupportTickets: {
    name: "Support Tickets",
    description:
      "Users, merchants, and partners can raise and track support tickets.",
  },
  ONDC: {
    name: "ONDC Network",
    description:
      "ONDC Product Search and Browse & Order flows for customer access to network merchants.",
  },
  Telegram: {
    name: "Telegram Integration",
    description:
      "Telegram bot mirroring all chatbot flows with full configuration.",
  },
  SMS: {
    name: "SMS Integration",
    description:
      "Two-way SMS chatbot flows — users text to interact with all major flows.",
  },
  DeliveryAssignment: {
    name: "Business Delivery Assignment",
    description:
      "Prepaid business plans with dedicated delivery user pools and tracking.",
  },
  lending: {
    name: "Lending & Borrowing",
    description:
      "Lend items with category, description, return date, and charges. Automatic reminders for both parties on monthly, quarterly, yearly, or custom schedules.",
  },
  "community-parking": {
    name: "Community Parking",
    description:
      "Rent parking spaces within the community — open, covered, or reserved slots with monthly/quarterly billing.",
  },
  "community-rooms": {
    name: "Community Rooms",
    description:
      "Book community halls, function rooms, and shared spaces for events and gatherings.",
  },
  "community-food": {
    name: "Community Food Service",
    description:
      "Order meals and food services from within the community — tiffin, catering, and daily meal plans.",
  },
  "community-manager": {
    name: "Community Manager Services",
    description:
      "Society management services — maintenance requests, complaint tracking, and facility coordination.",
  },
};

/**
 * Derives the unique module list from the full flow registry.
 * Returns [{moduleKey, name, description, flowCount, enabled}].
 * Reads enabled status from backend via readModuleStatuses().
 */
export function getModulesFromRegistry(
  moduleStatuses?: Record<string, boolean>,
): ModuleInfo[] {
  const statuses = moduleStatuses ?? {};
  const flows = getAllRegistryFlows();

  // Collect unique moduleKeys (preserving insertion order)
  const seen = new Set<string>();
  const orderedKeys: string[] = [];

  // First pass: static known order from MODULE_DISPLAY
  for (const key of Object.keys(MODULE_DISPLAY)) {
    if (!seen.has(key)) {
      seen.add(key);
      orderedKeys.push(key);
    }
  }

  // Second pass: any additional keys from dynamic/custom flows
  for (const f of flows) {
    if (f.moduleKey && !seen.has(f.moduleKey)) {
      seen.add(f.moduleKey);
      orderedKeys.push(f.moduleKey);
    }
  }

  return orderedKeys.map((key) => {
    const flowCount = flows.filter((f) => f.moduleKey === key).length;
    const display = MODULE_DISPLAY[key] ?? {
      name: key,
      description: `Module: ${key}`,
    };
    const enabled = statuses[key] !== false;
    return {
      moduleKey: key,
      name: display.name,
      description: display.description,
      flowCount,
      enabled,
    };
  });
}

/**
 * Returns all flows (static + dynamic) whose moduleKey matches the given key.
 */
export function getFlowsForModule(moduleKey: string): FlowDefinition[] {
  return getAllRegistryFlows().filter((f) => f.moduleKey === moduleKey);
}

/** Read module statuses from backend. Returns empty object if backend unavailable. */
export async function readModuleStatuses(): Promise<Record<string, boolean>> {
  const actor = _backendActor;
  if (!actor) return {};
  try {
    const actorAny = actor as Record<string, unknown>;
    if (typeof actorAny.getCityControls === "function") {
      const raw = await (actorAny.getCityControls as () => Promise<unknown>)();
      if (Array.isArray(raw)) {
        const map: Record<string, boolean> = {};
        for (const entry of raw) {
          const rec = entry as Record<string, unknown>;
          const key =
            typeof rec.moduleKey === "string"
              ? rec.moduleKey
              : typeof rec.module === "string"
                ? rec.module
                : undefined;
          if (key) {
            map[key] = rec.enabled === true || rec.status === "enabled";
          }
        }
        return map;
      }
    }
  } catch {
    /* ignore */
  }
  return {};
}
export function getFlowsByRole(role: string) {
  return getAllRegistryFlows().filter((f: any) =>
    Array.isArray(f.roles) ? f.roles.includes(role) : f.role === role,
  );
}
