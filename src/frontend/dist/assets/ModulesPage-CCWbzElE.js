import { g as useModuleStatuses, $ as useModuleStatusesWithRoles, c4 as useSetModuleEnabled, c5 as useSetModuleEnabledForRole, ac as useListCities, bM as useAddCity, r as reactExports, j as jsxRuntimeExports, ai as readModuleStatuses, c6 as getModulesFromRegistry, p as ue, c7 as useUpdateCityEnabled, c8 as useSetCityModuleEnabled, ad as useGetCityControl } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Separator } from "./separator-DqiCXh2l.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { C as ChartColumn } from "./chart-column-1UICj-Tf.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { P as Package } from "./package-CosknzeL.js";
import { B as Building2 } from "./building-2-B0h7D8pK.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
import "./index-CUcO6jhF.js";
import "./index-z5OST4d2.js";
import "./createLucideIcon-BGWdtUCJ.js";
const ANALYTICS_MODULES = [
  {
    key: "analytics.enhanced",
    label: "Enhanced Analytics",
    description: "Daily active users, order funnel, top customers, merchant tiers."
  },
  {
    key: "analytics.merchant-earnings",
    label: "Merchant Earnings Dashboard",
    description: "Revenue, profitable products, running products for merchants."
  },
  {
    key: "analytics.dp-earnings",
    label: "Delivery Partner Analytics",
    description: "Completion rate, avg delivery time, area heatmap for DPs."
  }
];
const ROLES = [
  { key: "customer", label: "Customer" },
  { key: "merchant", label: "Merchant" },
  { key: "deliveryPartner", label: "Delivery Partner" }
];
function CityRow({
  cityId,
  cityName,
  isEnabled,
  modules,
  globalStatuses
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const updateCityEnabled = useUpdateCityEnabled();
  const setCityModuleEnabled = useSetCityModuleEnabled();
  const { data: cityControl, isLoading: controlLoading } = useGetCityControl(
    expanded ? cityId : ""
  );
  const moduleTogglesMap = {};
  if (cityControl == null ? void 0 : cityControl.moduleToggles) {
    for (const [mod, val] of cityControl.moduleToggles) {
      moduleTogglesMap[mod] = val;
    }
  }
  async function handleCityToggle(enabled) {
    try {
      await updateCityEnabled.mutateAsync({ cityId, enabled });
      ue.success(
        `${cityName} ${enabled ? "enabled — all flows active" : "disabled — only registration allowed"}`
      );
    } catch {
      ue.error(`Failed to update ${cityName}`);
    }
  }
  async function handleModuleToggle(mod, enabled) {
    try {
      await setCityModuleEnabled.mutateAsync({ cityId, module_: mod, enabled });
      ue.success(
        `${mod} ${enabled ? "enabled" : "disabled"} for ${cityName}`
      );
    } catch {
      ue.error(`Failed to update module for ${cityName}`);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-xl overflow-hidden",
      "data-ocid": `city.item.${cityId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `w-full flex items-center gap-3 px-4 py-3 cursor-pointer select-none transition-colors hover:bg-muted/30 text-left ${!isEnabled ? "bg-destructive/5" : "bg-card"}`,
            onClick: () => setExpanded((v) => !v),
            "data-ocid": `city.${cityId}.expand`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: cityName }),
                  !isEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "destructive",
                      className: "text-[10px] py-0 px-1.5 shrink-0",
                      children: "All flows blocked · Registration only"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isEnabled ? `${modules.length} modules — expand to configure city-level overrides` : "City disabled — only customer registration allowed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center gap-3 shrink-0",
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: isEnabled,
                      onCheckedChange: handleCityToggle,
                      disabled: updateCityEnabled.isPending,
                      "aria-label": `Toggle ${cityName} enabled`,
                      "data-ocid": `city.${cityId}.toggle`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground shrink-0", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }) })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-muted/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-b border-border bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
              "Module overrides for ",
              cityName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 inline-block" }),
                "City On"
              ] }),
              " · ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-amber-400 inline-block" }),
                "City Off"
              ] }),
              " · ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-destructive inline-block" }),
                "Global Off (cannot re-enable)"
              ] })
            ] })
          ] }),
          controlLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: modules.map((mod) => {
            const globallyEnabled = globalStatuses[mod.moduleKey] !== false;
            const cityModEnabled = mod.moduleKey in moduleTogglesMap ? moduleTogglesMap[mod.moduleKey] : true;
            const effectiveEnabled = globallyEnabled ? cityModEnabled : false;
            let stateLabel;
            let stateDot;
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
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-3 px-4 py-2.5 transition-all ${!effectiveEnabled || !isEnabled ? "opacity-60" : ""}`,
                "data-ocid": `city.${cityId}.module.${mod.moduleKey.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded flex items-center justify-center bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: mod.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[9px] font-medium", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `w-1.5 h-1.5 rounded-full ${stateDot}`
                          }
                        ),
                        stateLabel
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: mod.description }),
                    !globallyEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: "Globally disabled — city cannot re-enable" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: effectiveEnabled,
                      onCheckedChange: (v) => handleModuleToggle(mod.moduleKey, v),
                      disabled: setCityModuleEnabled.isPending || !isEnabled || !globallyEnabled,
                      "aria-label": `Toggle ${mod.name} for ${cityName}`,
                      "data-ocid": `city.${cityId}.module.${mod.moduleKey.toLowerCase().replace(/[^a-z0-9]/g, "_")}.toggle`
                    }
                  )
                ]
              },
              mod.moduleKey
            );
          }) })
        ] })
      ]
    }
  );
}
function ModulesPage() {
  const { data: moduleStatuses = {}, isLoading } = useModuleStatuses();
  const { data: roleStatuses = [], isLoading: roleLoading } = useModuleStatusesWithRoles();
  const setModuleEnabled = useSetModuleEnabled();
  const setModuleEnabledForRole = useSetModuleEnabledForRole();
  const { data: cities = [], isLoading: citiesLoading } = useListCities();
  const addCity = useAddCity();
  const [newCityName, setNewCityName] = reactExports.useState("");
  const [newCityPincode, setNewCityPincode] = reactExports.useState("");
  const [showAddCity, setShowAddCity] = reactExports.useState(false);
  const [registryModules, setRegistryModules] = reactExports.useState([]);
  const [_modulesLoading, setModulesLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
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
  const roleStatusMap = {};
  for (const item of roleStatuses) {
    if (item && typeof item === "object" && "moduleName" in item && "role" in item) {
      const rs = item;
      roleStatusMap[`${rs.moduleName}_${rs.role}`] = rs.enabled;
    }
  }
  function getRoleEnabled(moduleKey, role) {
    const k = `${moduleKey}_${role}`;
    if (k in roleStatusMap) return roleStatusMap[k];
    return moduleStatuses[moduleKey] !== false;
  }
  async function handleGlobalToggle(moduleKey, enabled) {
    try {
      await setModuleEnabled.mutateAsync({ module: moduleKey, enabled });
      ue.success(
        `${moduleKey} module ${enabled ? "enabled" : "disabled"} globally`
      );
    } catch {
      ue.error(`Failed to update ${moduleKey} module`);
    }
  }
  async function handleRoleToggle(moduleKey, role, enabled) {
    try {
      await setModuleEnabledForRole.mutateAsync({
        moduleName: moduleKey,
        role,
        enabled
      });
      ue.success(
        `${moduleKey} ${enabled ? "enabled" : "disabled"} for ${role}`
      );
    } catch {
      ue.error(`Failed to update ${moduleKey} for ${role}`);
    }
  }
  async function handleAddCity() {
    const trimmedName = newCityName.trim();
    const trimmedPincode = newCityPincode.trim();
    if (!trimmedName) {
      ue.error("City name is required");
      return;
    }
    if (!trimmedPincode) {
      ue.error("Pincode is required");
      return;
    }
    if (!/^\d{4,10}$/.test(trimmedPincode)) {
      ue.error("Pincode must be 4–10 digits");
      return;
    }
    try {
      await addCity.mutateAsync({ name: trimmedName, pincode: trimmedPincode });
      ue.success(`${trimmedName} (${trimmedPincode}) added successfully`);
      setNewCityName("");
      setNewCityPincode("");
      setShowAddCity(false);
    } catch (err) {
      let msg = "Failed to add city";
      if (err instanceof Error) {
        const m = err.message;
        msg = m.startsWith("Error: ") ? m.slice(7) : m;
      }
      ue.error(msg);
    }
  }
  const enabledCount = registryModules.filter((m) => m.enabled).length;
  const enabledCities = cities.filter((c) => c.isEnabled).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Module Toggle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
        "Enable or disable platform modules per role. The module list is",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "dynamically derived from the unified flow registry" }),
        " — new flows added in Flow Designer appear here automatically."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm text-blue-700 dark:text-blue-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 mt-0.5 shrink-0 text-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Chatbot, WhatsApp Script & Telegram Integration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-1", children: [
          "Toggling a module here disables it in the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "chatbot simulator" }),
          ", removes it from the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "WhatsApp script export" }),
          ", and excludes it from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Telegram mirroring" }),
          ". Changes apply within",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "30 seconds" }),
          ". A globally disabled module",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "cannot be re-enabled at city level" }),
          ". Backend data and logic remain completely intact."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 bg-card border border-border rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
          enabledCount,
          " of ",
          registryModules.length,
          " modules active globally"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Module list auto-updates as flows are added to the registry" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30",
            children: [
              enabledCount,
              " enabled"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-muted-foreground", children: [
          registryModules.length - enabledCount,
          " disabled"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground", children: [
        "Platform Modules (",
        registryModules.length,
        " total · from unified flow registry)"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-5 py-2 border-b border-border bg-muted/10 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Module" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-center", children: "Global" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", children: "Merchant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-24 text-center", children: "Delivery" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: isLoading || roleLoading ? Array.from({ length: 10 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-muted animate-pulse" }, id)) : registryModules.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12 text-sm text-muted-foreground", children: "No modules found in registry" }) : registryModules.map((mod) => {
        const globalEnabled = moduleStatuses[mod.moduleKey] !== false;
        const ocidKey = mod.moduleKey.toLowerCase().replace(/[^a-z0-9]/g, "_");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-5 py-3 transition-all ${!globalEnabled ? "bg-muted/10 opacity-60" : ""}`,
            "data-ocid": `module.${ocidKey}.row`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${globalEnabled ? "bg-muted" : "bg-muted/40"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Zap,
                      {
                        className: `w-4 h-4 ${globalEnabled ? "text-primary" : "text-muted-foreground"}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: mod.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[9px] px-1 py-0 text-muted-foreground shrink-0",
                        children: [
                          mod.flowCount,
                          " flow",
                          mod.flowCount !== 1 ? "s" : ""
                        ]
                      }
                    ),
                    !globalEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs text-muted-foreground shrink-0",
                        children: "Disabled"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: mod.description })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: globalEnabled,
                  onCheckedChange: (v) => handleGlobalToggle(mod.moduleKey, v),
                  disabled: setModuleEnabled.isPending,
                  "aria-label": `Toggle ${mod.name} globally`,
                  "data-ocid": `module.${ocidKey}.global-toggle`
                }
              ) }),
              ROLES.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-20 flex flex-col items-center gap-0.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: getRoleEnabled(mod.moduleKey, role.key),
                        onCheckedChange: (v) => handleRoleToggle(mod.moduleKey, role.key, v),
                        disabled: setModuleEnabledForRole.isPending || !globalEnabled,
                        "aria-label": `Toggle ${mod.name} for ${role.label}`,
                        "data-ocid": `module.${ocidKey}.${role.key}-toggle`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground", children: role.label })
                  ]
                },
                role.key
              ))
            ]
          },
          mod.moduleKey
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Dashboard Visibility" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Control which analytics dashboards are visible to each role" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-5 py-2 border-b border-border bg-muted/10 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Analytics Module" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-center", children: "Global" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", children: "Merchant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-24 text-center", children: "Delivery" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: ANALYTICS_MODULES.map((mod) => {
        const globalEnabled = moduleStatuses[mod.key] !== false;
        const ocidKey = mod.key.replace(/\./g, "-");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-5 py-3 transition-all ${!globalEnabled ? "bg-muted/10 opacity-60" : ""}`,
            "data-ocid": `module.${ocidKey}.row`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${globalEnabled ? "bg-muted" : "bg-muted/40"}`,
                    children: mod.key === "analytics.enhanced" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChartColumn,
                      {
                        className: `w-4 h-4 ${globalEnabled ? "text-blue-600" : "text-muted-foreground"}`
                      }
                    ) : mod.key === "analytics.merchant-earnings" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShoppingCart,
                      {
                        className: `w-4 h-4 ${globalEnabled ? "text-emerald-600" : "text-muted-foreground"}`
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Package,
                      {
                        className: `w-4 h-4 ${globalEnabled ? "text-violet-600" : "text-muted-foreground"}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: mod.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: mod.description })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: globalEnabled,
                  onCheckedChange: (v) => handleGlobalToggle(mod.key, v),
                  disabled: setModuleEnabled.isPending,
                  "aria-label": `Toggle ${mod.label} globally`,
                  "data-ocid": `module.${ocidKey}.global-toggle`
                }
              ) }),
              ROLES.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-20 flex flex-col items-center gap-0.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: getRoleEnabled(mod.key, role.key),
                        onCheckedChange: (v) => handleRoleToggle(mod.key, role.key, v),
                        disabled: setModuleEnabledForRole.isPending || !globalEnabled,
                        "aria-label": `Toggle ${mod.label} for ${role.label}`,
                        "data-ocid": `module.${ocidKey}.${role.key}-toggle`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground", children: role.label })
                  ]
                },
                role.key
              ))
            ]
          },
          mod.key
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: "City Controls" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Enable or disable operations city-wise. When a city is disabled, only customer registration is allowed — all other flows are blocked. Existing data remains visible." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => setShowAddCity((v) => !v),
            "data-ocid": "city.add_button",
            className: "shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
              "Add City"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm text-amber-700 dark:text-amber-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 mt-0.5 shrink-0 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
          "When a city is ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "disabled" }),
          ', users in that city see "This service is temporarily unavailable" for all flows except customer registration. Existing listings, orders, and data remain intact.',
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Globally disabled modules cannot be re-enabled at the city level." })
        ] })
      ] }),
      !citiesLoading && cities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3.5 bg-card border border-border rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
            enabledCities,
            " of ",
            cities.length,
            " ",
            cities.length === 1 ? "city" : "cities",
            " active"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Expand a city to configure per-module overrides" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30",
              children: [
                enabledCities,
                " active"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-muted-foreground", children: [
            cities.length - enabledCities,
            " blocked"
          ] })
        ] })
      ] }),
      showAddCity && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col gap-2 p-3 bg-card border border-primary/30 rounded-xl",
          "data-ocid": "city.add_form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "City name (e.g. Mumbai, Delhi)",
                  value: newCityName,
                  onChange: (e) => setNewCityName(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") handleAddCity();
                    if (e.key === "Escape") {
                      setShowAddCity(false);
                      setNewCityName("");
                      setNewCityPincode("");
                    }
                  },
                  className: "flex-1",
                  autoFocus: true,
                  "data-ocid": "city.name.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Pincode (e.g. 400001)",
                  value: newCityPincode,
                  onChange: (e) => setNewCityPincode(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") handleAddCity();
                  },
                  className: "w-36",
                  "data-ocid": "city.pincode.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: handleAddCity,
                  disabled: addCity.isPending || !newCityName.trim(),
                  "data-ocid": "city.save_button",
                  children: addCity.isPending ? "Saving…" : "Save"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => {
                    setShowAddCity(false);
                    setNewCityName("");
                    setNewCityPincode("");
                  },
                  "data-ocid": "city.cancel_button",
                  children: "Cancel"
                }
              )
            ] })
          ]
        }
      ),
      citiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)) }) : cities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-10 bg-muted/20 border border-dashed border-border rounded-xl text-center",
          "data-ocid": "city.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-8 h-8 text-muted-foreground mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No cities configured" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 mb-3", children: [
              "No cities found. Run ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Load Sample Data" }),
              " first to create sample cities, or add cities manually using the button above."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => setShowAddCity(true),
                "data-ocid": "city.empty_add_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                  "Add your first city"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "city.list", children: cities.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CityRow,
        {
          cityId: city.id,
          cityName: city.name,
          isEnabled: city.isEnabled,
          modules: registryModules,
          globalStatuses: moduleStatuses
        },
        city.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-xl p-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "How module toggle works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-xs list-disc list-inside", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The module list is derived dynamically from the unified flow registry — new flows in Flow Designer appear here automatically" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Disabled modules are suppressed in the chatbot simulator, WhatsApp script export, and Telegram mirroring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All data (orders, listings, etc.) is preserved when a module is disabled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Re-enabling a module restores full access immediately" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Per-role toggles allow fine-grained control — e.g. disable Jobs for customers but keep it for merchants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Global disable cannot be overridden by city overrides" }),
          " ",
          "— a globally disabled module stays off everywhere"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "City controls gate all flows for users in that city — only customer registration is allowed when a city is disabled" })
      ] })
    ] })
  ] });
}
export {
  ModulesPage as default
};
