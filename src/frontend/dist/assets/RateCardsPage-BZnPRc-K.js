import { r as reactExports, j as jsxRuntimeExports, b6 as useRateCards, b7 as useUpdateRateCard, b8 as useCreateRateCard, b9 as useDeleteRateCard, ba as useFreeRideSarthis, bb as useToggleFreeRideSarthiStatus, bc as VehicleType, p as ue, bd as useRegisterFreeRideSarthi } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { P as Pencil } from "./pencil-9uzHrD9X.js";
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
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode);
const VEHICLE_EMOJI = {
  bike: "🏍️",
  scooter: "🛵",
  car: "🚗",
  auto: "🛺",
  van: "🚐",
  truck: "🚛",
  tempo: "🚌",
  bus: "🚌"
};
const VEHICLE_DISPLAY = {
  bike: "Bike",
  scooter: "Scooter",
  car: "Car",
  auto: "Auto",
  van: "Van",
  truck: "Truck",
  tempo: "Tempo",
  bus: "Bus"
};
const SERVICE_LABELS = {
  delivery: "Delivery",
  sarthi: "Sarthi (Passenger)"
};
const EMPTY_FORM = {
  vehicleType: "",
  serviceType: "delivery",
  baseRate: "0",
  perKmRate: "0",
  surgeMultiplier: "1.0",
  isActive: true
};
function sampleFare(base, perKm, surge, km) {
  return ((base + perKm * km) * surge).toFixed(2);
}
function CardFormModal({
  title,
  form,
  setForm,
  onSave,
  onClose,
  isNew
}) {
  const base = Number.parseFloat(form.baseRate) || 0;
  const perKm = Number.parseFloat(form.perKmRate) || 0;
  const surge = Number.parseFloat(form.surgeMultiplier) || 1;
  const preview = sampleFare(base, perKm, surge, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
      isNew && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "modal-vehicle", children: "Vehicle Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.vehicleType,
              onValueChange: (v) => setForm((f) => ({ ...f, vehicleType: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "modal-vehicle",
                    "data-ocid": "rate-form.vehicle_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select vehicle" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(VehicleType).map(([, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: v, children: [
                  VEHICLE_EMOJI[v] ?? "🚗",
                  " ",
                  VEHICLE_DISPLAY[v] ?? v
                ] }, v)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "modal-service", children: "Service Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.serviceType,
              onValueChange: (v) => setForm((f) => ({ ...f, serviceType: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "modal-service",
                    "data-ocid": "rate-form.service_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "delivery", children: "Delivery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sarthi", children: "Sarthi (Passenger)" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      !isNew && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "modal-service-edit", children: "Service Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.serviceType,
            onValueChange: (v) => setForm((f) => ({ ...f, serviceType: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "modal-service-edit",
                  "data-ocid": "rate-form.service_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "delivery", children: "Delivery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sarthi", children: "Sarthi (Passenger)" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "modal-base", children: "Base Rate (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "modal-base",
            type: "number",
            min: "0",
            value: form.baseRate,
            onChange: (e) => setForm((f) => ({ ...f, baseRate: e.target.value })),
            "data-ocid": "rate-form.base_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "modal-perkm", children: "Per Km Rate (₹/km)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "modal-perkm",
            type: "number",
            min: "0",
            value: form.perKmRate,
            onChange: (e) => setForm((f) => ({ ...f, perKmRate: e.target.value })),
            "data-ocid": "rate-form.perkm_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "modal-surge", children: [
          "Surge Multiplier (",
          form.surgeMultiplier,
          "×)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "modal-surge",
            type: "range",
            min: "1.0",
            max: "3.0",
            step: "0.1",
            value: form.surgeMultiplier,
            onChange: (e) => setForm((f) => ({ ...f, surgeMultiplier: e.target.value })),
            className: "w-full accent-primary",
            "data-ocid": "rate-form.surge_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1.0× Normal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3.0× Peak" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sample fare (5 km): " }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
          "₹",
          preview
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "modal-active",
            checked: form.isActive,
            onCheckedChange: (v) => setForm((f) => ({ ...f, isActive: v })),
            "data-ocid": "rate-form.active_toggle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "modal-active", children: "Rate card active" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: onClose, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1",
            onClick: onSave,
            "data-ocid": "rate-form.save_button",
            children: "Save Changes"
          }
        )
      ] })
    ] })
  ] }) });
}
const EMPTY_FREE_RIDE = {
  phone: "",
  name: "",
  vehicleType: "bike",
  aadhaarNo: "",
  rcBook: "",
  panNo: ""
};
function FreeRideFormModal({ onClose }) {
  const register = useRegisterFreeRideSarthi();
  const [form, setForm] = reactExports.useState(EMPTY_FREE_RIDE);
  async function handleSave() {
    if (!form.phone || !form.name) {
      ue.error("Phone and name are required");
      return;
    }
    try {
      await register.mutateAsync({
        phone: form.phone,
        name: form.name,
        vehicleType: form.vehicleType,
        aadhaarNo: form.aadhaarNo,
        rcBook: form.rcBook,
        panNo: form.panNo
      });
      ue.success("Free ride sarthi registered");
      onClose();
    } catch (e) {
      ue.error(
        `Registration failed: ${e instanceof Error ? e.message : "unknown error"}`
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-5 h-5 text-primary" }),
      " Register Free Ride Sarthi"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "+91XXXXXXXXXX",
            value: form.phone,
            onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
            "data-ocid": "free-ride-form.phone_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.name,
            onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
            "data-ocid": "free-ride-form.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vehicle Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.vehicleType,
            onValueChange: (v) => setForm((f) => ({ ...f, vehicleType: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "free-ride-form.vehicle_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(VehicleType).map(([, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: v, children: [
                VEHICLE_EMOJI[v] ?? "🚗",
                " ",
                VEHICLE_DISPLAY[v] ?? v
              ] }, v)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Aadhaar Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "XXXX XXXX XXXX",
            value: form.aadhaarNo,
            onChange: (e) => setForm((f) => ({ ...f, aadhaarNo: e.target.value })),
            "data-ocid": "free-ride-form.aadhaar_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "RC Book No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.rcBook,
              onChange: (e) => setForm((f) => ({ ...f, rcBook: e.target.value })),
              "data-ocid": "free-ride-form.rc_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "PAN Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.panNo,
              onChange: (e) => setForm((f) => ({ ...f, panNo: e.target.value })),
              "data-ocid": "free-ride-form.pan_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "free-ride-form.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1",
            onClick: handleSave,
            disabled: register.isPending,
            "data-ocid": "free-ride-form.submit_button",
            children: "Register"
          }
        )
      ] })
    ] })
  ] }) });
}
function FreeRideSection() {
  const { data: sarthis = [], isLoading } = useFreeRideSarthis();
  const toggle = useToggleFreeRideSarthiStatus();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  async function handleToggle(id, current) {
    try {
      await toggle.mutateAsync({ dpId: id, isActive: !current });
      ue.success(`Sarthi ${!current ? "activated" : "deactivated"}`);
    } catch {
      ue.error("Failed to update status");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Free Ride Sarthis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sarthi partners registered for free passenger-sharing service" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setAddOpen(true),
          className: "gap-2",
          "data-ocid": "free-ride.register_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Register Free Ride Sarthi"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-muted animate-pulse rounded-xl" }, k)) }) : sarthis.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 text-muted-foreground text-sm",
        "data-ocid": "free-ride.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No free-ride sarthis registered" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Register the first one to enable passenger sharing" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "Name",
        "Vehicle Type",
        "RC / Plate",
        "Service Area",
        "Status",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: sarthis.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20 transition-colors",
          "data-ocid": `free-ride.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              VEHICLE_EMOJI[s.vehicleType] ?? "🚗",
              " ",
              VEHICLE_DISPLAY[s.vehicleType] ?? s.vehicleType
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs", children: s.vehiclePlate || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: s.serviceArea }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: s.status === "active" ? "default" : "secondary",
                className: "text-xs",
                children: s.status === "active" ? "Active" : "Inactive"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: s.status === "active",
                onCheckedChange: () => handleToggle(s.id, s.status === "active"),
                "data-ocid": `free-ride.toggle.${i + 1}`
              }
            ) })
          ]
        },
        s.id
      )) })
    ] }) }),
    addOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(FreeRideFormModal, { onClose: () => setAddOpen(false) })
  ] });
}
function RateCardItem({
  card,
  onEdit,
  onDelete
}) {
  const fare5km = sampleFare(
    card.baseRate,
    card.perKmRate,
    card.surgeMultiplier,
    5
  );
  const serviceType = card.serviceType ?? "delivery";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border rounded-xl p-5 shadow-card flex flex-col gap-4 transition-all hover:shadow-md ${!card.isActive ? "opacity-60" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: VEHICLE_EMOJI[card.vehicleType] ?? "🚗" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground capitalize", children: VEHICLE_DISPLAY[card.vehicleType] ?? card.vehicleType }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: card.isActive ? "default" : "secondary",
                  className: "text-xs",
                  children: card.isActive ? "Active" : "Inactive"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs ${serviceType === "sarthi" ? "border-amber-400 text-amber-600" : "border-blue-400 text-blue-600"}`,
                  children: serviceType === "sarthi" ? "🚗 Sarthi" : "🚴 Delivery"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center bg-muted/40 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Base" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-sm mt-0.5", children: [
              "₹",
              card.baseRate
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Per Km" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-sm mt-0.5", children: [
              "₹",
              card.perKmRate
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Surge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `font-bold text-sm mt-0.5 ${card.surgeMultiplier > 1.5 ? "text-amber-600" : "text-foreground"}`,
                children: [
                  "×",
                  card.surgeMultiplier
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "5 km est:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              "₹",
              fare5km
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => onEdit(card),
                "data-ocid": `rate-card.edit.${card.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5 mr-1.5" }),
                  " Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-destructive border-destructive/30 hover:bg-destructive/5",
                onClick: () => onDelete(card),
                "data-ocid": `rate-card.delete.${card.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function RateCardsSection() {
  const { data: rateCards = [], isLoading } = useRateCards();
  const updateRateCard = useUpdateRateCard();
  const createRateCard = useCreateRateCard();
  const deleteRateCard = useDeleteRateCard();
  const [editCard, setEditCard] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState(EMPTY_FORM);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [addForm, setAddForm] = reactExports.useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(
    null
  );
  const [calcVehicle, setCalcVehicle] = reactExports.useState("");
  const [calcService, setCalcService] = reactExports.useState("delivery");
  const [calcDist, setCalcDist] = reactExports.useState("5");
  const [serviceFilter, setServiceFilter] = reactExports.useState("all");
  function openEdit(card) {
    setEditCard(card);
    setEditForm({
      vehicleType: card.vehicleType,
      serviceType: card.serviceType ?? "delivery",
      baseRate: String(card.baseRate),
      perKmRate: String(card.perKmRate),
      surgeMultiplier: String(card.surgeMultiplier),
      isActive: card.isActive
    });
  }
  async function handleSaveEdit() {
    if (!editCard) return;
    try {
      await updateRateCard.mutateAsync({
        id: editCard.id,
        baseRate: Number.parseFloat(editForm.baseRate) || 0,
        perKmRate: Number.parseFloat(editForm.perKmRate) || 0,
        surgeMultiplier: Number.parseFloat(editForm.surgeMultiplier) || 1
      });
      ue.success("Rate card updated");
      setEditCard(null);
    } catch {
      ue.error("Failed to update rate card");
    }
  }
  async function handleAdd() {
    if (!addForm.vehicleType) {
      ue.error("Select a vehicle type");
      return;
    }
    try {
      await createRateCard.mutateAsync({
        vehicleType: addForm.vehicleType,
        serviceType: addForm.serviceType,
        baseRate: Number.parseFloat(addForm.baseRate) || 0,
        perKmRate: Number.parseFloat(addForm.perKmRate) || 0,
        surgeMultiplier: Number.parseFloat(addForm.surgeMultiplier) || 1
      });
      ue.success(
        `Rate card for ${VEHICLE_DISPLAY[addForm.vehicleType] ?? addForm.vehicleType} (${SERVICE_LABELS[addForm.serviceType]}) added`
      );
      setAddOpen(false);
      setAddForm(EMPTY_FORM);
    } catch {
      ue.error("Failed to add rate card");
    }
  }
  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteRateCard.mutateAsync(deleteTarget.id);
      ue.success("Rate card deleted");
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete");
    }
  }
  const filtered = rateCards.filter(
    (c) => serviceFilter === "all" || (c.serviceType ?? "delivery") === serviceFilter
  );
  const deliveryCards = filtered.filter(
    (c) => (c.serviceType ?? "delivery") === "delivery"
  );
  const sarthiCards = filtered.filter(
    (c) => (c.serviceType ?? "delivery") === "sarthi"
  );
  const calcCard = rateCards.find(
    (r) => r.vehicleType === calcVehicle && (r.serviceType ?? "delivery") === calcService
  );
  const calcDistNum = Number.parseFloat(calcDist) || 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Rate Cards" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Pricing rules for delivery and Sarthi (passenger) partners" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setAddOpen(true),
          className: "gap-2",
          "data-ocid": "rate-cards.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Rate Card"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", "data-ocid": "rate-cards.service_filter", children: ["all", "delivery", "sarthi"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setServiceFilter(s),
        className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${serviceFilter === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"}`,
        "data-ocid": `rate-cards.filter.${s}`,
        children: s === "all" ? "All" : s === "delivery" ? "🚴 Delivery" : "🚗 Sarthi (Passenger)"
      },
      s
    )) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted animate-pulse rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      (serviceFilter === "all" || serviceFilter === "delivery") && deliveryCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        serviceFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "🚴 Delivery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: deliveryCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RateCardItem,
          {
            card,
            onEdit: openEdit,
            onDelete: setDeleteTarget
          },
          card.id
        )) })
      ] }),
      (serviceFilter === "all" || serviceFilter === "sarthi") && sarthiCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        serviceFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "🚗 Sarthi (Passenger Pickup)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: sarthiCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RateCardItem,
          {
            card,
            onEdit: openEdit,
            onDelete: setDeleteTarget
          },
          card.id
        )) })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-12 text-muted-foreground text-sm",
          "data-ocid": "rate-cards.empty_state",
          children: "No rate cards for this service type."
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground", children: "Fare Calculator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Estimate delivery or sarthi cost by distance and vehicle" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "calc-from", children: "From Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "calc-from",
                placeholder: "e.g. Connaught Place, Delhi",
                "data-ocid": "fare-calc.from_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "calc-to", children: "To Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "calc-to",
                placeholder: "e.g. Karol Bagh, Delhi",
                "data-ocid": "fare-calc.to_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "calc-dist", children: "Distance (km)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "calc-dist",
                type: "number",
                min: "0.5",
                step: "0.5",
                value: calcDist,
                onChange: (e) => setCalcDist(e.target.value),
                "data-ocid": "fare-calc.distance_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "calc-service", children: "Service Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: calcService, onValueChange: setCalcService, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "calc-service",
                  "data-ocid": "fare-calc.service_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "delivery", children: "Delivery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sarthi", children: "Sarthi (Passenger)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "calc-vehicle", children: "Vehicle Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: calcVehicle, onValueChange: setCalcVehicle, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "calc-vehicle",
                  "data-ocid": "fare-calc.vehicle_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select vehicle" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: rateCards.filter(
                (r) => (r.serviceType ?? "delivery") === calcService
              ).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r.vehicleType, children: [
                VEHICLE_EMOJI[r.vehicleType],
                " ",
                VEHICLE_DISPLAY[r.vehicleType] ?? r.vehicleType
              ] }, r.id)) })
            ] })
          ] })
        ] }),
        calcCard && calcDistNum > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
            VEHICLE_EMOJI[calcCard.vehicleType],
            " ",
            VEHICLE_DISPLAY[calcCard.vehicleType],
            " ·",
            " ",
            SERVICE_LABELS[calcCard.serviceType ?? "delivery"],
            " —",
            " ",
            calcDistNum,
            " km"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Base:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                "₹",
                calcCard.baseRate
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Distance:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                "₹",
                (calcCard.perKmRate * calcDistNum).toFixed(0)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Surge ×",
              calcCard.surgeMultiplier,
              ":",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-amber-600", children: [
                "+",
                ((calcCard.baseRate + calcCard.perKmRate * calcDistNum) * (calcCard.surgeMultiplier - 1)).toFixed(0)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-primary", children: [
            "₹",
            sampleFare(
              calcCard.baseRate,
              calcCard.perKmRate,
              calcCard.surgeMultiplier,
              calcDistNum
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground ml-2", children: "estimated fare" })
          ] })
        ] })
      ] })
    ] }),
    editCard && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardFormModal,
      {
        title: `${VEHICLE_EMOJI[editCard.vehicleType] ?? "🚗"} Edit ${VEHICLE_DISPLAY[editCard.vehicleType] ?? editCard.vehicleType} Rate Card`,
        form: editForm,
        setForm: setEditForm,
        onSave: handleSaveEdit,
        onClose: () => setEditCard(null),
        isNew: false
      }
    ),
    addOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardFormModal,
      {
        title: "Add Rate Card",
        form: addForm,
        setForm: setAddForm,
        onSave: handleAdd,
        onClose: () => {
          setAddOpen(false);
          setAddForm(EMPTY_FORM);
        },
        isNew: true
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && setDeleteTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "delete-rate.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-destructive font-display", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
        " Delete Rate Card"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
        "Delete the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: VEHICLE_DISPLAY[deleteTarget.vehicleType] ?? deleteTarget.vehicleType }),
        " ",
        "(",
        SERVICE_LABELS[deleteTarget.serviceType ?? "delivery"],
        ") rate card? This cannot be undone."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setDeleteTarget(null),
            "data-ocid": "delete-rate.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: handleDelete,
            "data-ocid": "delete-rate.confirm_button",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
function RateCardsPage() {
  const [activeTab, setActiveTab] = reactExports.useState("ratecards");
  const tabs = [
    { key: "ratecards", label: "Rate Cards", icon: "💰" },
    { key: "freeride", label: "Free Ride Sarthis", icon: "🤝" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Transport Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Rate cards and free-ride sarthi registrations. Shuttle routes are managed from the Shuttle Routes page." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 border-b border-border pb-px overflow-x-auto",
        "data-ocid": "transport.tab",
        children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.key),
            className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap -mb-px ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `transport.${tab.key}_tab`,
            children: [
              tab.icon,
              " ",
              tab.label
            ]
          },
          tab.key
        ))
      }
    ),
    activeTab === "ratecards" && /* @__PURE__ */ jsxRuntimeExports.jsx(RateCardsSection, {}),
    activeTab === "freeride" && /* @__PURE__ */ jsxRuntimeExports.jsx(FreeRideSection, {})
  ] });
}
export {
  RateCardsPage as default
};
