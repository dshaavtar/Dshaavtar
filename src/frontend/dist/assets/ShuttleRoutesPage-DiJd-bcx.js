import { a0 as useShuttleRoutes, cv as useDeactivateShuttleRoute, cw as useActivateShuttleRoute, r as reactExports, j as jsxRuntimeExports, p as ue, cx as usePostShuttleRoute, cy as VehicleType } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { B as Bus } from "./bus-D032N2K-.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { T as Ticket } from "./ticket-CID_kmnS.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode);
function AddRouteDialog({
  open,
  onClose
}) {
  const [routeName, setRouteName] = reactExports.useState("");
  const [serviceName, setServiceName] = reactExports.useState("");
  const [vehicleNumber, setVehicleNumber] = reactExports.useState("");
  const [pricePerTicket, setPricePerTicket] = reactExports.useState("");
  const [postedBy, setPostedBy] = reactExports.useState("");
  const [stops, setStops] = reactExports.useState([
    { stopName: "", ticketFee: "0", arrivalTime: "" },
    { stopName: "", ticketFee: "0", arrivalTime: "" }
  ]);
  const postShuttleRoute = usePostShuttleRoute();
  function addStop() {
    setStops((s) => [...s, { stopName: "", ticketFee: "0", arrivalTime: "" }]);
  }
  function removeStop(idx) {
    if (stops.length <= 2) return;
    setStops((s) => s.filter((_, i) => i !== idx));
  }
  function updateStop(idx, field, value) {
    setStops(
      (s) => s.map((stop, i) => i === idx ? { ...stop, [field]: value } : stop)
    );
  }
  async function handleSubmit(e) {
    var _a, _b;
    e.preventDefault();
    if (!routeName || !serviceName || stops.some((s) => !s.stopName)) {
      ue.error("Route name, service name, and all stop names are required");
      return;
    }
    const source = ((_a = stops[0]) == null ? void 0 : _a.stopName) ?? routeName;
    const destination = ((_b = stops[stops.length - 1]) == null ? void 0 : _b.stopName) ?? routeName;
    const firstStop = stops[0];
    const lastStop = stops[stops.length - 1];
    try {
      await postShuttleRoute.mutateAsync({
        routeName,
        source,
        destination,
        stops: stops.map((s) => s.stopName),
        vehicleType: VehicleType.bus,
        vehicleNumber: vehicleNumber || void 0,
        departureTime: (firstStop == null ? void 0 : firstStop.arrivalTime) ?? "",
        arrivalTime: (lastStop == null ? void 0 : lastStop.arrivalTime) ?? "",
        fare: Number.parseFloat(pricePerTicket) || 0,
        availableSeats: 20,
        driverId: postedBy || "admin"
      });
      ue.success(
        `Shuttle route created successfully${vehicleNumber ? ` (Vehicle: ${vehicleNumber})` : ""}`
      );
      onClose();
    } catch {
      ue.error("Failed to create shuttle route");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-2xl max-h-[90vh] overflow-y-auto",
      "data-ocid": "shuttle.add-route-dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-5 h-5 text-primary" }),
          " Add Shuttle Route"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Route Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: routeName,
                  onChange: (e) => setRouteName(e.target.value),
                  placeholder: "e.g. Connaught Place → Gurgaon",
                  "data-ocid": "shuttle.route-name-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Service Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: serviceName,
                  onChange: (e) => setServiceName(e.target.value),
                  placeholder: "e.g. City Shuttle Express",
                  "data-ocid": "shuttle.service-name-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vehicle Number *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: vehicleNumber,
                  onChange: (e) => setVehicleNumber(e.target.value),
                  placeholder: "e.g. MH12AB1234",
                  "data-ocid": "shuttle.vehicle-number-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Base Price per Ticket (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: pricePerTicket,
                  onChange: (e) => setPricePerTicket(e.target.value),
                  placeholder: "50",
                  "data-ocid": "shuttle.price-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Posted By (phone)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: postedBy,
                  onChange: (e) => setPostedBy(e.target.value),
                  placeholder: "+91 98765 43210",
                  "data-ocid": "shuttle.posted-by-input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Stops (",
                stops.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "gap-1.5 text-xs h-7",
                  onClick: addStop,
                  "data-ocid": "shuttle.add-stop-button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
                    " Add Stop"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-60 overflow-y-auto pr-1", children: stops.map((stop, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/30 rounded-lg p-3 space-y-2",
                "data-ocid": `shuttle.stop.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-primary" }),
                      " Stop ",
                      idx + 1
                    ] }),
                    stops.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        className: "h-6 w-6 p-0 text-destructive",
                        onClick: () => removeStop(idx),
                        "data-ocid": `shuttle.remove-stop.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Stop Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "h-7 text-xs",
                          value: stop.stopName,
                          onChange: (e) => updateStop(idx, "stopName", e.target.value),
                          placeholder: "Stop name",
                          "data-ocid": `shuttle.stop-name.${idx + 1}`
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Ticket Fee (₹)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "h-7 text-xs",
                          type: "number",
                          value: stop.ticketFee,
                          onChange: (e) => updateStop(idx, "ticketFee", e.target.value),
                          placeholder: "0",
                          "data-ocid": `shuttle.stop-fee.${idx + 1}`
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Arrival Time" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "h-7 text-xs",
                          value: stop.arrivalTime,
                          onChange: (e) => updateStop(idx, "arrivalTime", e.target.value),
                          placeholder: "08:00 AM",
                          "data-ocid": `shuttle.stop-time.${idx + 1}`
                        }
                      )
                    ] })
                  ] })
                ]
              },
              `stop-${idx + 1}`
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "shuttle.add-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1",
                disabled: postShuttleRoute.isPending,
                "data-ocid": "shuttle.add-submit",
                children: postShuttleRoute.isPending ? "Creating…" : "Create Route"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function ShuttleRoutesPage() {
  const { data: rawRoutes = [], isLoading } = useShuttleRoutes();
  const routes = rawRoutes.map((r) => ({
    ...r,
    price: Number(
      r.fare ?? r.price ?? 0
    ),
    status: r.isActive ? "active" : "inactive",
    availableSeats: Number(r.availableSeats),
    vehicleType: String(r.vehicleType),
    createdAt: r.createdAt ? Number(r.createdAt) : void 0
  }));
  const deactivate = useDeactivateShuttleRoute();
  const activate = useActivateShuttleRoute();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [showAddDialog, setShowAddDialog] = reactExports.useState(false);
  const filtered = routes.filter((r) => {
    if (statusFilter === "active" && r.status !== "active") return false;
    if (statusFilter === "inactive" && r.status !== "inactive") return false;
    if (search && !r.routeName.toLowerCase().includes(search.toLowerCase()) && !r.serviceName.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });
  const activeCount = routes.filter((r) => r.status === "active").length;
  async function handleToggle(routeId, currentlyActive) {
    try {
      if (currentlyActive) {
        await deactivate.mutateAsync(routeId);
        ue.success("Route deactivated");
      } else {
        await activate.mutateAsync(routeId);
        ue.success("Route activated");
      }
    } catch {
      ue.error("Failed to update route status");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", "data-ocid": "shuttle-routes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-5 h-5 text-primary" }),
          " Shuttle Routes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          routes.length,
          " routes · ",
          activeCount,
          " active"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "gap-2 shrink-0",
          onClick: () => setShowAddDialog(true),
          "data-ocid": "shuttle-routes.add-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Route"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
      {
        label: "Total Routes",
        value: routes.length,
        color: "text-foreground"
      },
      { label: "Active", value: activeCount, color: "text-emerald-600" },
      {
        label: "Inactive",
        value: routes.length - activeCount,
        color: "text-muted-foreground"
      }
    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold font-display ${color}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            placeholder: "Search routes…",
            "data-ocid": "shuttle-routes.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => setStatusFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-36",
                "data-ocid": "shuttle-routes.status-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Show All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active Only" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive Only" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["r1", "r2", "r3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-16 text-center",
        "data-ocid": "shuttle-routes.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No shuttle routes found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: () => setShowAddDialog(true),
              "data-ocid": "shuttle-routes.empty-add-button",
              children: "Add First Route"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "shuttle-routes.table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Route" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Route Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium hidden md:table-cell", children: "Vehicle No." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium hidden lg:table-cell", children: "Driver ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((route, idx) => {
        const isActive = route.status === "active";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
            "data-ocid": `shuttle-routes.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: route.routeName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: route.id })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground", children: route.serviceName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[100px]", children: route.source })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground px-3", children: "↓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5 shrink-0 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[100px]", children: route.destination })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium", children: [
                  "₹",
                  route.price
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 hidden md:table-cell text-xs font-mono text-muted-foreground", children: route.vehicleNumber ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-100 text-emerald-700 border-emerald-200 text-xs gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                " Active"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-muted-foreground text-xs gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                    " Inactive"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 hidden lg:table-cell text-xs text-muted-foreground font-mono", children: route.driverId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: isActive ? "destructive" : "outline",
                  className: `h-7 text-xs ${!isActive ? "text-emerald-700 border-emerald-300 hover:bg-emerald-50" : ""}`,
                  onClick: () => handleToggle(route.id, isActive),
                  disabled: deactivate.isPending || activate.isPending,
                  "data-ocid": `shuttle-routes.toggle-button.${idx + 1}`,
                  children: isActive ? "Deactivate" : "Activate"
                }
              ) })
            ]
          },
          route.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddRouteDialog,
      {
        open: showAddDialog,
        onClose: () => setShowAddDialog(false)
      }
    )
  ] });
}
export {
  ShuttleRoutesPage as default
};
