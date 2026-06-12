import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  BarChart3,
  Building2,
  ChevronDown,
  ChevronRight,
  Info,
  Package,
  Plus,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useAddCity,
  useGetCityControl,
  useListCities,
  useModuleStatuses,
  useModuleStatusesWithRoles,
  useSetCityModuleEnabled,
  useSetModuleEnabled,
  useSetModuleEnabledForRole,
  useUpdateCityEnabled,
} from "../hooks/useBackend";
import {
  type ModuleInfo,
  getModulesFromRegistry,
  readModuleStatuses,
} from "../lib/flowRegistry";

// ─── Analytics modules (static — not derived from flows) ─────────────────────

interface AnalyticsModuleConfig {
  key: string;
  label: string;
  description: string;
}

const ANALYTICS_MODULES: AnalyticsModuleConfig[] = [
  {
    key: "analytics.enhanced",
    label: "Enhanced Analytics",
    description:
      "Daily active users, order funnel, top customers, merchant tiers.",
  },
  {
    key: "analytics.merchant-earnings",
    label: "Merchant Earnings Dashboard",
    description:
      "Revenue, profitable products, running products for merchants.",
  },
  {
    key: "analytics.dp-earnings",
    label: "Delivery Partner Analytics",
    description: "Completion rate, avg delivery time, area heatmap for DPs.",
  },
];

const ROLES = [
  { key: "customer", label: "Customer" },
  { key: "merchant", label: "Merchant" },
  { key: "deliveryPartner", label: "Delivery Partner" },
];

// ─── City Row ──────────────────────────────────────────────────────────────────

function CityRow({
  cityId,
  cityName,
  isEnabled,
  modules,
  globalStatuses,
}: {
  cityId: string;
  cityName: string;
  isEnabled: boolean;
  modules: ModuleInfo[];
  globalStatuses: Record<string, boolean>;
}) {
  const [expanded, setExpanded] = useState(false);
  const updateCityEnabled = useUpdateCityEnabled();
  const setCityModuleEnabled = useSetCityModuleEnabled();
  const { data: cityControl, isLoading: controlLoading } = useGetCityControl(
    expanded ? cityId : "",
  );

  const moduleTogglesMap: Record<string, boolean> = {};
  if (cityControl?.moduleToggles) {
    for (const [mod, val] of cityControl.moduleToggles) {
      moduleTogglesMap[mod] = val;
    }
  }

  async function handleCityToggle(enabled: boolean) {
    try {
      await updateCityEnabled.mutateAsync({ cityId, enabled });
      toast.success(
        `${cityName} ${enabled ? "enabled — all flows active" : "disabled — only registration allowed"}`,
      );
    } catch {
      toast.error(`Failed to update ${cityName}`);
    }
  }

  async function handleModuleToggle(mod: string, enabled: boolean) {
    // Optimistic UI: no-op if globally disabled
    try {
      await setCityModuleEnabled.mutateAsync({ cityId, module_: mod, enabled });
      toast.success(
        `${mod} ${enabled ? "enabled" : "disabled"} for ${cityName}`,
      );
    } catch {
      toast.error(`Failed to update module for ${cityName}`);
    }
  }

  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-ocid={`city.item.${cityId}`}
    >
      <button
        type="button"
        className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer select-none transition-colors hover:bg-muted/30 text-left ${!isEnabled ? "bg-destructive/5" : "bg-card"}`}
        onClick={() => setExpanded((v) => !v)}
        data-ocid={`city.${cityId}.expand`}
      >
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm text-foreground">{cityName}</p>
            {!isEnabled && (
              <Badge
                variant="destructive"
                className="text-[10px] py-0 px-1.5 shrink-0"
              >
                All flows blocked · Registration only
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {isEnabled
              ? `${modules.length} modules — expand to configure city-level overrides`
              : "City disabled — only customer registration allowed"}
          </p>
        </div>
        <div
          className="flex items-center gap-3 shrink-0"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Switch
            checked={isEnabled}
            onCheckedChange={handleCityToggle}
            disabled={updateCityEnabled.isPending}
            aria-label={`Toggle ${cityName} enabled`}
            data-ocid={`city.${cityId}.toggle`}
          />
        </div>
        <div className="text-muted-foreground shrink-0">
          {expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border bg-muted/10">
          <div className="px-4 py-2 border-b border-border bg-muted/20">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Module overrides for {cityName}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                City On
              </span>
              {" · "}
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                City Off
              </span>
              {" · "}
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-destructive inline-block" />
                Global Off (cannot re-enable)
              </span>
            </p>
          </div>
          {controlLoading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {modules.map((mod) => {
                // True = globally enabled, false = disabled everywhere (cannot override)
                const globallyEnabled = globalStatuses[mod.moduleKey] !== false;
                // City-level: default true (inherit global) unless explicitly set
                const cityModEnabled =
                  mod.moduleKey in moduleTogglesMap
                    ? moduleTogglesMap[mod.moduleKey]
                    : true;
                // Effective state = global AND city
                const effectiveEnabled = globallyEnabled
                  ? cityModEnabled
                  : false;

                // Three-state label
                let stateLabel: string;
                let stateDot: string;
                if (!globallyEnabled) {
                  stateLabel = "Global Off";
                  stateDot = "bg-destructive";
                } else if (!effectiveEnabled) {
                  stateLabel = "City Off";
                  stateDot = "bg-amber-400";
                } else {
                  stateLabel = "City On";
                  stateDot = "bg-emerald-500";
                }

                return (
                  <div
                    key={mod.moduleKey}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-all ${
                      !effectiveEnabled || !isEnabled ? "opacity-60" : ""
                    }`}
                    data-ocid={`city.${cityId}.module.${mod.moduleKey.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  >
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-muted shrink-0">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-foreground">
                          {mod.name}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[9px] font-medium">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${stateDot}`}
                          />
                          {stateLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {mod.description}
                      </p>
                      {!globallyEnabled && (
                        <p className="text-[10px] text-destructive mt-0.5">
                          Globally disabled — city cannot re-enable
                        </p>
                      )}
                    </div>
                    <Switch
                      checked={effectiveEnabled}
                      onCheckedChange={(v) =>
                        handleModuleToggle(mod.moduleKey, v)
                      }
                      disabled={
                        setCityModuleEnabled.isPending ||
                        !isEnabled ||
                        !globallyEnabled
                      }
                      aria-label={`Toggle ${mod.name} for ${cityName}`}
                      data-ocid={`city.${cityId}.module.${mod.moduleKey.toLowerCase().replace(/[^a-z0-9]/g, "_")}.toggle`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ModulesPage() {
  // useModuleStatuses now returns Record<string, boolean> directly
  const { data: moduleStatuses = {}, isLoading } = useModuleStatuses();
  const { data: roleStatuses = [], isLoading: roleLoading } =
    useModuleStatusesWithRoles();
  const setModuleEnabled = useSetModuleEnabled();
  const setModuleEnabledForRole = useSetModuleEnabledForRole();

  // City state
  const { data: cities = [], isLoading: citiesLoading } = useListCities();
  const addCity = useAddCity();
  const [newCityName, setNewCityName] = useState("");
  const [newCityPincode, setNewCityPincode] = useState("");
  const [showAddCity, setShowAddCity] = useState(false);

  // Dynamic module list from unified flow registry — async because readModuleStatuses is async
  const [registryModules, setRegistryModules] = useState<ModuleInfo[]>([]);
  const [_modulesLoading, setModulesLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadModules() {
      setModulesLoading(true);
      try {
        const statuses = await readModuleStatuses();
        if (!cancelled) {
          setRegistryModules(getModulesFromRegistry(statuses));
        }
      } catch {
        if (!cancelled) setRegistryModules(getModulesFromRegistry({}));
      } finally {
        if (!cancelled) setModulesLoading(false);
      }
    }
    loadModules();
    return () => {
      cancelled = true;
    };
  }, []);

  // Build lookup: moduleKey_role → enabled
  const roleStatusMap: Record<string, boolean> = {};
  for (const item of roleStatuses) {
    if (
      item &&
      typeof item === "object" &&
      "moduleName" in item &&
      "role" in item
    ) {
      const rs = item as { moduleName: string; role: string; enabled: boolean };
      roleStatusMap[`${rs.moduleName}_${rs.role}`] = rs.enabled;
    }
  }

  function getRoleEnabled(moduleKey: string, role: string): boolean {
    const k = `${moduleKey}_${role}`;
    if (k in roleStatusMap) return roleStatusMap[k];
    return moduleStatuses[moduleKey] !== false;
  }

  async function handleGlobalToggle(moduleKey: string, enabled: boolean) {
    try {
      await setModuleEnabled.mutateAsync({ module: moduleKey, enabled });
      toast.success(
        `${moduleKey} module ${enabled ? "enabled" : "disabled"} globally`,
      );
    } catch {
      toast.error(`Failed to update ${moduleKey} module`);
    }
  }

  async function handleRoleToggle(
    moduleKey: string,
    role: string,
    enabled: boolean,
  ) {
    try {
      await setModuleEnabledForRole.mutateAsync({
        moduleName: moduleKey,
        role,
        enabled,
      });
      toast.success(
        `${moduleKey} ${enabled ? "enabled" : "disabled"} for ${role}`,
      );
    } catch {
      toast.error(`Failed to update ${moduleKey} for ${role}`);
    }
  }

  async function handleAddCity() {
    const trimmedName = newCityName.trim();
    const trimmedPincode = newCityPincode.trim();

    // Client-side validation before calling the backend
    if (!trimmedName) {
      toast.error("City name is required");
      return;
    }
    if (!trimmedPincode) {
      toast.error("Pincode is required");
      return;
    }
    if (!/^\d{4,10}$/.test(trimmedPincode)) {
      toast.error("Pincode must be 4–10 digits");
      return;
    }

    try {
      await addCity.mutateAsync({ name: trimmedName, pincode: trimmedPincode });
      toast.success(`${trimmedName} (${trimmedPincode}) added successfully`);
      setNewCityName("");
      setNewCityPincode("");
      setShowAddCity(false);
    } catch (err) {
      // Extract specific error message from backend Result #err
      let msg = "Failed to add city";
      if (err instanceof Error) {
        const m = err.message;
        // Strip wrapper noise like "Error: " prefix
        msg = m.startsWith("Error: ") ? m.slice(7) : m;
      }
      toast.error(msg);
    }
  }

  const enabledCount = registryModules.filter((m) => m.enabled).length;
  const enabledCities = cities.filter((c) => c.isEnabled).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Module Toggle
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Enable or disable platform modules per role. The module list is{" "}
          <strong>dynamically derived from the unified flow registry</strong> —
          new flows added in Flow Designer appear here automatically.
        </p>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm text-blue-700 dark:text-blue-300">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
        <div>
          <p className="font-semibold">
            Chatbot, WhatsApp Script &amp; Telegram Integration
          </p>
          <p className="text-xs mt-1">
            Toggling a module here disables it in the{" "}
            <strong>chatbot simulator</strong>, removes it from the{" "}
            <strong>WhatsApp script export</strong>, and excludes it from{" "}
            <strong>Telegram mirroring</strong>. Changes apply within{" "}
            <strong>30 seconds</strong>. A globally disabled module{" "}
            <strong>cannot be re-enabled at city level</strong>. Backend data
            and logic remain completely intact.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {enabledCount} of {registryModules.length} modules active globally
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Module list auto-updates as flows are added to the registry
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"
          >
            {enabledCount} enabled
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            {registryModules.length - enabledCount} disabled
          </Badge>
        </div>
      </div>

      {/* Module list */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/20">
          <h3 className="font-display font-semibold text-sm text-foreground">
            Platform Modules ({registryModules.length} total · from unified flow
            registry)
          </h3>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-5 py-2 border-b border-border bg-muted/10 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <span>Module</span>
          <span className="w-16 text-center">Global</span>
          <span className="w-20 text-center">Customer</span>
          <span className="w-20 text-center">Merchant</span>
          <span className="w-24 text-center">Delivery</span>
        </div>

        <div className="divide-y divide-border">
          {isLoading || roleLoading ? (
            Array.from({ length: 10 }, (_, i) => `sk-${i}`).map((id) => (
              <div key={id} className="h-16 bg-muted animate-pulse" />
            ))
          ) : registryModules.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              No modules found in registry
            </div>
          ) : (
            registryModules.map((mod) => {
              const globalEnabled = moduleStatuses[mod.moduleKey] !== false;
              const ocidKey = mod.moduleKey
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "_");
              return (
                <div
                  key={mod.moduleKey}
                  className={`grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-5 py-3 transition-all ${!globalEnabled ? "bg-muted/10 opacity-60" : ""}`}
                  data-ocid={`module.${ocidKey}.row`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${globalEnabled ? "bg-muted" : "bg-muted/40"}`}
                    >
                      <Zap
                        className={`w-4 h-4 ${globalEnabled ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm text-foreground truncate">
                          {mod.name}
                        </p>
                        <Badge
                          variant="outline"
                          className="text-[9px] px-1 py-0 text-muted-foreground shrink-0"
                        >
                          {mod.flowCount} flow{mod.flowCount !== 1 ? "s" : ""}
                        </Badge>
                        {!globalEnabled && (
                          <Badge
                            variant="outline"
                            className="text-xs text-muted-foreground shrink-0"
                          >
                            Disabled
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-16 flex justify-center">
                    <Switch
                      checked={globalEnabled}
                      onCheckedChange={(v) =>
                        handleGlobalToggle(mod.moduleKey, v)
                      }
                      disabled={setModuleEnabled.isPending}
                      aria-label={`Toggle ${mod.name} globally`}
                      data-ocid={`module.${ocidKey}.global-toggle`}
                    />
                  </div>

                  {ROLES.map((role) => (
                    <div
                      key={role.key}
                      className="w-20 flex flex-col items-center gap-0.5"
                    >
                      <Switch
                        checked={getRoleEnabled(mod.moduleKey, role.key)}
                        onCheckedChange={(v) =>
                          handleRoleToggle(mod.moduleKey, role.key, v)
                        }
                        disabled={
                          setModuleEnabledForRole.isPending || !globalEnabled
                        }
                        aria-label={`Toggle ${mod.name} for ${role.label}`}
                        data-ocid={`module.${ocidKey}.${role.key}-toggle`}
                      />
                      <span className="text-[9px] text-muted-foreground">
                        {role.label}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Dashboard Visibility */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-sm text-foreground">
              Dashboard Visibility
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Control which analytics dashboards are visible to each role
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-5 py-2 border-b border-border bg-muted/10 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <span>Analytics Module</span>
          <span className="w-16 text-center">Global</span>
          <span className="w-20 text-center">Customer</span>
          <span className="w-20 text-center">Merchant</span>
          <span className="w-24 text-center">Delivery</span>
        </div>

        <div className="divide-y divide-border">
          {ANALYTICS_MODULES.map((mod) => {
            const globalEnabled = moduleStatuses[mod.key] !== false;
            const ocidKey = mod.key.replace(/\./g, "-");
            return (
              <div
                key={mod.key}
                className={`grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-5 py-3 transition-all ${!globalEnabled ? "bg-muted/10 opacity-60" : ""}`}
                data-ocid={`module.${ocidKey}.row`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${globalEnabled ? "bg-muted" : "bg-muted/40"}`}
                  >
                    {mod.key === "analytics.enhanced" ? (
                      <BarChart3
                        className={`w-4 h-4 ${globalEnabled ? "text-blue-600" : "text-muted-foreground"}`}
                      />
                    ) : mod.key === "analytics.merchant-earnings" ? (
                      <ShoppingCart
                        className={`w-4 h-4 ${globalEnabled ? "text-emerald-600" : "text-muted-foreground"}`}
                      />
                    ) : (
                      <Package
                        className={`w-4 h-4 ${globalEnabled ? "text-violet-600" : "text-muted-foreground"}`}
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {mod.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {mod.description}
                    </p>
                  </div>
                </div>
                <div className="w-16 flex justify-center">
                  <Switch
                    checked={globalEnabled}
                    onCheckedChange={(v) => handleGlobalToggle(mod.key, v)}
                    disabled={setModuleEnabled.isPending}
                    aria-label={`Toggle ${mod.label} globally`}
                    data-ocid={`module.${ocidKey}.global-toggle`}
                  />
                </div>
                {ROLES.map((role) => (
                  <div
                    key={role.key}
                    className="w-20 flex flex-col items-center gap-0.5"
                  >
                    <Switch
                      checked={getRoleEnabled(mod.key, role.key)}
                      onCheckedChange={(v) =>
                        handleRoleToggle(mod.key, role.key, v)
                      }
                      disabled={
                        setModuleEnabledForRole.isPending || !globalEnabled
                      }
                      aria-label={`Toggle ${mod.label} for ${role.label}`}
                      data-ocid={`module.${ocidKey}.${role.key}-toggle`}
                    />
                    <span className="text-[9px] text-muted-foreground">
                      {role.label}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* City Controls */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="font-display text-base font-bold text-foreground">
                City Controls
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Enable or disable operations city-wise. When a city is disabled,
              only customer registration is allowed — all other flows are
              blocked. Existing data remains visible.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddCity((v) => !v)}
            data-ocid="city.add_button"
            className="shrink-0"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add City
          </Button>
        </div>

        <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm text-amber-700 dark:text-amber-300">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
          <p className="text-xs">
            When a city is <strong>disabled</strong>, users in that city see
            "This service is temporarily unavailable" for all flows except
            customer registration. Existing listings, orders, and data remain
            intact.{" "}
            <strong>
              Globally disabled modules cannot be re-enabled at the city level.
            </strong>
          </p>
        </div>

        {!citiesLoading && cities.length > 0 && (
          <div className="flex items-center gap-3 p-3.5 bg-card border border-border rounded-xl">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {enabledCities} of {cities.length}{" "}
                {cities.length === 1 ? "city" : "cities"} active
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Expand a city to configure per-module overrides
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"
              >
                {enabledCities} active
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                {cities.length - enabledCities} blocked
              </Badge>
            </div>
          </div>
        )}

        {showAddCity && (
          <div
            className="flex flex-col gap-2 p-3 bg-card border border-primary/30 rounded-xl"
            data-ocid="city.add_form"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary shrink-0" />
              <Input
                placeholder="City name (e.g. Mumbai, Delhi)"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCity();
                  if (e.key === "Escape") {
                    setShowAddCity(false);
                    setNewCityName("");
                    setNewCityPincode("");
                  }
                }}
                className="flex-1"
                autoFocus
                data-ocid="city.name.input"
              />
              <Input
                placeholder="Pincode (e.g. 400001)"
                value={newCityPincode}
                onChange={(e) => setNewCityPincode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCity();
                }}
                className="w-36"
                data-ocid="city.pincode.input"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                onClick={handleAddCity}
                disabled={addCity.isPending || !newCityName.trim()}
                data-ocid="city.save_button"
              >
                {addCity.isPending ? "Saving…" : "Save"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowAddCity(false);
                  setNewCityName("");
                  setNewCityPincode("");
                }}
                data-ocid="city.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {citiesLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : cities.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 bg-muted/20 border border-dashed border-border rounded-xl text-center"
            data-ocid="city.empty_state"
          >
            <Building2 className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground">
              No cities configured
            </p>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              No cities found. Run <strong>Load Sample Data</strong> first to
              create sample cities, or add cities manually using the button
              above.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAddCity(true)}
              data-ocid="city.empty_add_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add your first city
            </Button>
          </div>
        ) : (
          <div className="space-y-2" data-ocid="city.list">
            {cities.map((city) => (
              <CityRow
                key={city.id}
                cityId={city.id}
                cityName={city.name}
                isEnabled={city.isEnabled}
                modules={registryModules}
                globalStatuses={moduleStatuses}
              />
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div className="bg-muted/40 border border-border rounded-xl p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">
          How module toggle works
        </p>
        <ul className="space-y-1 text-xs list-disc list-inside">
          <li>
            The module list is derived dynamically from the unified flow
            registry — new flows in Flow Designer appear here automatically
          </li>
          <li>
            Disabled modules are suppressed in the chatbot simulator, WhatsApp
            script export, and Telegram mirroring
          </li>
          <li>
            All data (orders, listings, etc.) is preserved when a module is
            disabled
          </li>
          <li>Re-enabling a module restores full access immediately</li>
          <li>
            Per-role toggles allow fine-grained control — e.g. disable Jobs for
            customers but keep it for merchants
          </li>
          <li>
            <strong>
              Global disable cannot be overridden by city overrides
            </strong>{" "}
            — a globally disabled module stays off everywhere
          </li>
          <li>
            City controls gate all flows for users in that city — only customer
            registration is allowed when a city is disabled
          </li>
        </ul>
      </div>
    </div>
  );
}
