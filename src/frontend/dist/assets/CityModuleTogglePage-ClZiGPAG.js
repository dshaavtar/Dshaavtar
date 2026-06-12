import { _ as useBackendActor, ac as useListCities, c8 as useSetCityModuleEnabled, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { C as Card, a as CardContent } from "./card-Dx8tJeYi.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { S as Settings } from "./settings-CDqnrNMc.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-DYndF6Sn.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
const MODULE_LABELS = {
  healthcare: "Healthcare",
  travel: "Travel & Tourism",
  "professional-services": "Professional Services",
  manufacturer: "Manufacturer",
  "fun-learning": "Fun Learning",
  "bus-booking": "Bus Booking",
  "train-booking": "Train Booking",
  "flight-booking": "Flight Booking",
  recharge: "Mobile Recharge",
  "bill-payments": "Bill Payments",
  fastag: "FASTag",
  insurance: "Insurance",
  municipality: "Municipality Payment",
  "old-items": "Old Items Marketplace",
  lending: "Lending",
  donation: "Donation",
  blog: "Blog",
  finance: "Finance",
  shopping: "Shopping",
  jobs: "Jobs",
  property: "Property",
  events: "Events",
  community: "Community",
  matrimony: "Matrimony"
};
const ALL_MODULES = Object.keys(MODULE_LABELS);
function CityModuleTogglePage() {
  const { actor } = useBackendActor();
  const citiesQuery = useListCities();
  const setModuleEnabled = useSetCityModuleEnabled();
  const [selectedCity, setSelectedCity] = reactExports.useState("");
  const [modules, setModules] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(null);
  const cityList = Array.isArray(citiesQuery) ? citiesQuery : (citiesQuery == null ? void 0 : citiesQuery.data) && Array.isArray(citiesQuery.data) ? citiesQuery.data : [];
  reactExports.useEffect(() => {
    if (!actor || !selectedCity) return;
    setLoading(true);
    actor.getCityModules(selectedCity).then((mods) => {
      const map = new Map((mods ?? []).map((m) => [m.moduleName, m.enabled]));
      setModules(
        ALL_MODULES.map((n) => ({
          moduleName: n,
          enabled: map.has(n) ? !!map.get(n) : true
        }))
      );
    }).catch(
      () => setModules(ALL_MODULES.map((n) => ({ moduleName: n, enabled: true })))
    ).finally(() => setLoading(false));
  }, [actor, selectedCity]);
  const handleToggle = async (moduleName, enabled) => {
    if (!selectedCity) return;
    setSaving(moduleName);
    try {
      await setModuleEnabled.mutateAsync({
        cityId: selectedCity,
        module_: moduleName,
        enabled
      });
      setModules(
        (prev) => prev.map((m) => m.moduleName === moduleName ? { ...m, enabled } : m)
      );
      ue.success(
        `${MODULE_LABELS[moduleName] ?? moduleName} ${enabled ? "enabled" : "disabled"}`
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      ue.error(msg || "Failed to update module");
    } finally {
      setSaving(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-6 w-6 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "City Module Toggles" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Enable or disable service modules per city. Disabled modules are hidden from chatbot menus." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-1 block", children: "Select City" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedCity, onValueChange: setSelectedCity, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-72",
            "data-ocid": "city-modules.city_select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a city..." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: cityList.map((c) => {
          const id = c.id ?? c.cityId ?? c.name ?? "";
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: id, children: c.name ?? c.cityName ?? id }, id);
        }) })
      ] })
    ] }) }),
    !selectedCity && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "Select a city to manage its modules." }),
    selectedCity && loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-8 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin h-5 w-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading modules..." })
    ] }),
    selectedCity && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", children: modules.map(({ moduleName, enabled }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: `transition-all ${enabled ? "border-primary/30" : "opacity-60"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between py-3 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 mr-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: MODULE_LABELS[moduleName] ?? moduleName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: enabled ? "default" : "secondary",
                className: "mt-1 text-xs",
                children: enabled ? "On" : "Off"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: enabled,
              disabled: saving === moduleName,
              onCheckedChange: (val) => handleToggle(moduleName, val),
              "data-ocid": `city-modules.toggle.${moduleName}`
            }
          )
        ] })
      },
      moduleName
    )) })
  ] });
}
export {
  CityModuleTogglePage as default
};
