import { r as reactExports, a4 as useProfessionalServices, dD as useCityAreas, j as jsxRuntimeExports, dE as useGetServiceBookings, dF as useBookProfessionalService, dG as useAddProfessionalService, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { W as Wrench } from "./wrench-B6FcmCok.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { H as House } from "./house-DQF9lC4w.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { C as ChevronUp } from "./chevron-up-BzRcvKHL.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
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
import "./check-CO9wi49t.js";
import "./index-BNXq-E6T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m11 10 3 3", key: "fzmg1i" }],
  [
    "path",
    { d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z", key: "p4q2r7" }
  ],
  ["path", { d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031", key: "wy6l02" }]
];
const Brush = createLucideIcon("brush", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
      key: "9m4mmf"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
  ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
      key: "1t2c92"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
];
const Dumbbell = createLucideIcon("dumbbell", __iconNode);
const CATEGORY_ICONS = {
  Massage: {
    icon: Brush,
    color: "text-pink-500 bg-pink-100 dark:bg-pink-900/30"
  },
  Plumbing: {
    icon: Wrench,
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
  },
  Electrical: {
    icon: Zap,
    color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30"
  },
  Training: {
    icon: Dumbbell,
    color: "text-green-500 bg-green-100 dark:bg-green-900/30"
  },
  Cleaning: {
    icon: House,
    color: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30"
  },
  Beauty: {
    icon: Brush,
    color: "text-violet-500 bg-violet-100 dark:bg-violet-900/30"
  },
  Carpentry: {
    icon: Wrench,
    color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30"
  },
  default: { icon: Wrench, color: "text-muted-foreground bg-muted" }
};
const TIME_SLOTS = [
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 4pm)" },
  { value: "evening", label: "Evening (4pm – 8pm)" }
];
const DURATION_OPTIONS = [1, 2, 3, 4];
function getCategoryMeta(serviceType) {
  const lower = serviceType.toLowerCase();
  for (const [key, meta] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key.toLowerCase())) return meta;
  }
  return CATEGORY_ICONS.default;
}
function BookingPanel({
  service,
  customerArea,
  onClose
}) {
  const [date, setDate] = reactExports.useState("");
  const [timeSlot, setTimeSlot] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState(1);
  const [notes, setNotes] = reactExports.useState("");
  const [bookingId, setBookingId] = reactExports.useState(null);
  const [bookingError, setBookingError] = reactExports.useState(null);
  const bookMutation = useBookProfessionalService();
  const effectiveRate = customerArea && service.appliedRate != null && service.appliedRate > 0 ? service.appliedRate : service.pricePerHour ?? 0;
  const total = duration * effectiveRate;
  const { icon: Icon, color } = getCategoryMeta(service.skillType);
  async function handleBook() {
    if (!date || !timeSlot) {
      ue.error("Select date and time slot");
      return;
    }
    setBookingError(null);
    try {
      const result = await bookMutation.mutateAsync({
        serviceId: service.id,
        customerPhone: "9999999999",
        date,
        timeSlot,
        duration,
        notes,
        customerArea: customerArea ?? null
      });
      setBookingId(String(result.id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Booking failed";
      setBookingError(`Booking failed: ${msg}`);
    }
  }
  if (bookingId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm",
        "data-ocid": "services.booking.success_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm text-center p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✅" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: "Service Booked!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
            "Your booking with",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: service.name || service.skillType }),
            " is confirmed."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono bg-muted rounded-lg px-3 py-2 mb-4", children: [
            "Booking ID: ",
            bookingId
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full",
              onClick: onClose,
              "data-ocid": "services.booking.close_button",
              children: "Done"
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm",
      "data-ocid": "services.booking.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Book Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1 rounded-lg hover:bg-muted",
                "aria-label": "Close",
                "data-ocid": "services.booking.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${color}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: service.name || service.skillType }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                service.description || service.skillType,
                effectiveRate > 0 ? ` · ₹${effectiveRate}/hr` : ""
              ] })
            ] })
          ] }),
          customerArea && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-600 dark:text-amber-400 font-medium", children: [
            "Area: ",
            customerArea
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                "data-ocid": "services.booking.date.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Time Slot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: timeSlot, onValueChange: setTimeSlot, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "services.booking.timeslot.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select time slot" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIME_SLOTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Duration (hours)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: String(duration),
                onValueChange: (v) => setDuration(Number(v)),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "services.booking.duration.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DURATION_OPTIONS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(d), children: [
                    d,
                    " hour",
                    d > 1 ? "s" : ""
                  ] }, d)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Notes (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "Describe the work needed...",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                className: "resize-none h-20",
                "data-ocid": "services.booking.notes.textarea"
              }
            )
          ] }),
          effectiveRate > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              duration,
              "hr \\u00d7 \\u20b9",
              effectiveRate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-amber-500", children: [
              "\\u20b9",
              total.toLocaleString("en-IN")
            ] })
          ] }) }),
          bookingError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "services.booking.error_state",
              children: bookingError
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-border flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: onClose,
              "data-ocid": "services.booking.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 bg-amber-500 hover:bg-amber-600 text-white",
              onClick: handleBook,
              disabled: bookMutation.isPending,
              "data-ocid": "services.booking.confirm_button",
              children: bookMutation.isPending ? "Booking..." : effectiveRate > 0 ? `Book · ₹${total.toLocaleString("en-IN")}` : "Book Service"
            }
          )
        ] })
      ] })
    }
  );
}
function AreaRatesSection({
  city,
  areaRates,
  onChange
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const { data: areas = [], isLoading } = useCityAreas(city);
  if (!city.trim()) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((p) => !p),
        className: "w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-sm font-medium text-foreground",
        "data-ocid": "services.register.arearates.toggle",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Area Rates (Optional)" }),
          expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Set a specific rate for each area. Leave blank to use the global rate." }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }, i)) }),
      !isLoading && areas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic", children: [
        "No areas found for \\u201c",
        city,
        "\\u201d. Enter a valid city name above."
      ] }),
      !isLoading && areas.map((area) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground w-36 shrink-0 truncate", children: area }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "\\u20b9" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              placeholder: "e.g. 400",
              className: "pl-7",
              value: areaRates[area] ?? "",
              onChange: (e) => onChange({ ...areaRates, [area]: e.target.value }),
              "data-ocid": `services.register.arearate.${area.toLowerCase().replace(/\s+/g, "-")}.input`
            }
          )
        ] })
      ] }, area))
    ] })
  ] });
}
const ALL_SERVICE_CATEGORIES = [
  "Massage/Spa",
  "Plumbing",
  "Electrical",
  "Personal Training",
  "Cleaning",
  "Beauty/Salon",
  "Carpentry",
  "Other"
];
function RegisterServiceForm({ onClose }) {
  const [form, setForm] = reactExports.useState({
    serviceType: "",
    specialization: "",
    pricePerHour: "",
    address: "",
    city: "",
    availability: "",
    phone: ""
  });
  const [areaRates, setAreaRates] = reactExports.useState({});
  const addService = useAddProfessionalService();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.serviceType || !form.specialization) {
      ue.error("Fill all required fields");
      return;
    }
    try {
      const areaRatesPairs = Object.entries(areaRates).filter(([, v]) => v.trim() !== "").map(([area, v]) => [area, Number.parseFloat(v)]);
      const result = await addService.mutateAsync({
        name: form.specialization,
        serviceType: form.serviceType,
        location: [form.address, form.city].filter(Boolean).join(", "),
        phone: form.phone,
        experience: form.availability,
        hourlyRate: Number.parseFloat(form.pricePerHour) || 0,
        description: form.specialization,
        areaRates: areaRatesPairs
      });
      const id = result && typeof result === "object" && "id" in result ? String(result.id) : "";
      ue.success(
        id ? `Service registered successfully! ID: ${id}` : "Service registered successfully!"
      );
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      ue.error(`Failed to register: ${msg}`);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm",
      "data-ocid": "services.register.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Register Your Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Close",
              className: "p-1 rounded-lg hover:bg-muted",
              "data-ocid": "services.register.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Service Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.serviceType,
                onValueChange: (v) => setForm((f) => ({ ...f, serviceType: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "services.register.servicetype.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select service type" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_SERVICE_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                ]
              }
            )
          ] }),
          [
            {
              key: "specialization",
              label: "Specialization",
              placeholder: "e.g. Home Wiring & Repairs",
              type: "text"
            },
            {
              key: "pricePerHour",
              label: "Global Rate Per Hour (₹)",
              placeholder: "350",
              type: "number"
            },
            {
              key: "address",
              label: "Service Area / Address",
              placeholder: "Green Park, Delhi",
              type: "text"
            },
            {
              key: "city",
              label: "City",
              placeholder: "Delhi",
              type: "text"
            },
            {
              key: "availability",
              label: "Availability",
              placeholder: "Mon–Sat, 8am–6pm",
              type: "text"
            },
            {
              key: "phone",
              label: "Phone Number",
              placeholder: "9876543210",
              type: "text"
            }
          ].map(({ key, label, placeholder, type }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type,
                placeholder,
                value: form[key],
                onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
                "data-ocid": `services.register.${key}.input`
              }
            )
          ] }, key)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AreaRatesSection,
            {
              city: form.city,
              areaRates,
              onChange: setAreaRates
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "services.register.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1 bg-amber-500 hover:bg-amber-600 text-white",
                disabled: addService.isPending,
                "data-ocid": "services.register.submit_button",
                children: addService.isPending ? "Registering..." : "Register"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function ServiceCard({
  service,
  onBook
}) {
  const { icon: Icon, color } = getCategoryMeta(service.skillType);
  const displayRate = service.appliedRate != null && service.appliedRate > 0 ? service.appliedRate : service.pricePerHour ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 hover:border-amber-300 dark:hover:border-amber-700 transition-all shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${color}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground truncate", children: service.name || service.skillType }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs mt-0.5", children: service.skillType })
      ] }),
      displayRate > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-amber-500", children: [
        "\\u20b9",
        displayRate,
        "/hr"
      ] }) })
    ] }),
    service.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: service.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mb-4 text-xs text-muted-foreground", children: [
      service.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: service.location })
      ] }),
      service.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: service.phone })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        className: "w-full bg-amber-500 hover:bg-amber-600 text-white",
        size: "sm",
        onClick: () => onBook(service),
        "data-ocid": "services.provider.book_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 mr-2" }),
          " Book Service"
        ]
      }
    )
  ] });
}
function MyBookingsTab() {
  const {
    data: bookings = [],
    isLoading,
    isError
  } = useGetServiceBookings(null, null);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
    ] }, i)) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-16 text-center",
        "data-ocid": "services.bookings.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-destructive mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Failed to load bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Please refresh and try again." })
        ]
      }
    );
  }
  if (bookings.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-16 text-center",
        "data-ocid": "services.bookings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No bookings yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Browse services and book your first appointment" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "services.bookings.list", children: bookings.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4",
      "data-ocid": `services.bookings.item.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground", children: [
            "Booking #",
            b.id.slice(-6).toUpperCase()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: String(b.status) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
            b.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            b.timeSlot
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
            b.customerPhone
          ] })
        ] }),
        b.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground italic", children: b.notes }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm font-medium text-foreground", children: [
          "₹",
          b.totalPrice.toFixed(2)
        ] })
      ]
    },
    b.id
  )) });
}
function ProfessionalServicesPage() {
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [bookingService, setBookingService] = reactExports.useState(null);
  const [showRegister, setShowRegister] = reactExports.useState(false);
  const [cityInput, setCityInput] = reactExports.useState("");
  const [selectedArea, setSelectedArea] = reactExports.useState("__none__");
  const [committedCity, setCommittedCity] = reactExports.useState("");
  const customerArea = selectedArea && selectedArea !== "__none__" ? selectedArea : null;
  const {
    data: services = [],
    isLoading,
    isError,
    refetch
  } = useProfessionalServices(customerArea);
  const { data: areas = [], isLoading: areasLoading } = useCityAreas(committedCity);
  const categories = [
    "All",
    ...Array.from(new Set(services.map((s) => s.skillType).filter(Boolean)))
  ];
  const filtered = services.filter((s) => {
    const matchSearch = (s.name || s.skillType).toLowerCase().includes(search.toLowerCase()) || (s.description ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || s.skillType === activeCategory;
    return matchSearch && matchCat;
  });
  function handleCityBlur() {
    setCommittedCity(cityInput.trim());
    setSelectedArea("__none__");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-5 h-5 text-amber-500" }),
          " Professional Services"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Book skilled professionals for home and personal services" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "gap-2 bg-amber-500 hover:bg-amber-600 text-white",
          onClick: () => setShowRegister(true),
          "data-ocid": "services.register.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Register Your Service"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-wrap gap-2",
        "data-ocid": "services.category-filter",
        children: categories.map((cat) => {
          const isActive = activeCategory === cat;
          const meta = cat !== "All" ? getCategoryMeta(cat) : null;
          const Icon = meta == null ? void 0 : meta.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory(cat),
              className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isActive ? "bg-amber-500 text-white shadow-sm" : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"}`,
              "data-ocid": `services.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
              children: [
                Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                cat
              ]
            },
            cat
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "browse", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", "data-ocid": "services.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "browse", "data-ocid": "services.browse.tab", children: "Browse Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "bookings", "data-ocid": "services.bookings.tab", children: "My Bookings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "browse", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search services...",
                className: "pl-9 w-52",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                "data-ocid": "services.search.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. Mumbai",
                className: "w-40",
                value: cityInput,
                onChange: (e) => {
                  setCityInput(e.target.value);
                  if (selectedArea !== "__none__") setSelectedArea("__none__");
                },
                onBlur: handleCityBlur,
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setCommittedCity(cityInput.trim());
                    setSelectedArea("__none__");
                  }
                },
                "data-ocid": "services.search.city.input"
              }
            )
          ] }),
          committedCity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Your area" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: selectedArea,
                onValueChange: (v) => setSelectedArea(v),
                disabled: areasLoading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-48",
                      "data-ocid": "services.search.area.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your area" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none__", children: "All areas" }),
                    areas.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, children: a }, a)),
                    !areasLoading && areas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none__", disabled: true, children: "No areas found" })
                  ] })
                ]
              }
            )
          ] }),
          customerArea && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end pb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "border-amber-300 text-amber-600 dark:text-amber-400 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                customerArea
              ]
            }
          ) })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full mt-4" })
            ]
          },
          i
        )) }),
        !isLoading && isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-16 text-center bg-card border border-border rounded-xl",
            "data-ocid": "services.providers.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Unable to load services" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Could not connect to the backend. Please try again." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: () => void refetch(),
                  className: "gap-2",
                  "data-ocid": "services.providers.retry_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                    " Retry"
                  ]
                }
              )
            ]
          }
        ),
        !isLoading && !isError && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-16 text-center",
            "data-ocid": "services.providers.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: services.length === 0 ? "No services registered yet" : "No services found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: services.length === 0 ? "Register a professional service to get started" : "Try a different category or search term" }),
              services.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "mt-4 gap-2 bg-amber-500 hover:bg-amber-600 text-white",
                  onClick: () => setShowRegister(true),
                  "data-ocid": "services.providers.empty_register_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    " Register Service"
                  ]
                }
              )
            ]
          }
        ),
        !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            "data-ocid": "services.providers.list",
            children: filtered.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": `services.provider.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { service, onBook: setBookingService })
              },
              service.id
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bookings", className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MyBookingsTab, {}) })
    ] }),
    bookingService && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingPanel,
      {
        service: bookingService,
        customerArea,
        onClose: () => setBookingService(null)
      }
    ),
    showRegister && /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterServiceForm, { onClose: () => setShowRegister(false) })
  ] });
}
export {
  ProfessionalServicesPage as default
};
