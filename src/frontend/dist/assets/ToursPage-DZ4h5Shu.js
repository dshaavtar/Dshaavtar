import { a3 as useTourOperators, r as reactExports, j as jsxRuntimeExports, dB as useBookTour, dC as useAddTourOperator, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
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
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
import "./index-BNXq-E6T.js";
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
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode);
const TOUR_TYPES = [
  { value: "all", label: "All Types" },
  { value: "day_trip", label: "Day Trip" },
  { value: "overnight", label: "Overnight" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" }
];
function BookingPanel({
  operator,
  onClose
}) {
  const [date, setDate] = reactExports.useState("");
  const [passengers, setPassengers] = reactExports.useState(1);
  const [bookingId, setBookingId] = reactExports.useState(null);
  const [bookingError, setBookingError] = reactExports.useState(null);
  const bookMutation = useBookTour();
  const pricePerPerson = operator.price ?? 0;
  const total = passengers * pricePerPerson;
  async function handleBook() {
    if (!date) {
      ue.error("Please select a tour date");
      return;
    }
    setBookingError(null);
    try {
      const result = await bookMutation.mutateAsync({
        operatorId: operator.id,
        customerPhone: "9999999999",
        destination: operator.destination,
        tourType: operator.tourType || "day_trip",
        date,
        passengerCount: passengers
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
        "data-ocid": "tours.booking.success_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm text-center p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✅" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: "Tour Booked!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
            "Your tour with ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: operator.name }),
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
              "data-ocid": "tours.booking.close_button",
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
      "data-ocid": "tours.booking.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Book Tour" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1 rounded-lg hover:bg-muted",
                "aria-label": "Close",
                "data-ocid": "tours.booking.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-5 h-5 text-blue-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: operator.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                operator.duration,
                " · from ₹",
                pricePerPerson,
                "/person"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Tour Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                "data-ocid": "tours.booking.date.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Number of Passengers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 1,
                max: 20,
                value: passengers,
                onChange: (e) => setPassengers(Math.max(1, Math.min(20, Number(e.target.value)))),
                "data-ocid": "tours.booking.passengers.input"
              }
            )
          ] }),
          pricePerPerson > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              passengers,
              " × ₹",
              pricePerPerson
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-blue-500", children: [
              "₹",
              total.toLocaleString("en-IN")
            ] })
          ] }) }),
          bookingError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive mt-2",
              "data-ocid": "tours.booking.error_state",
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
              "data-ocid": "tours.booking.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 bg-blue-500 hover:bg-blue-600 text-white",
              onClick: handleBook,
              disabled: bookMutation.isPending,
              "data-ocid": "tours.booking.confirm_button",
              children: bookMutation.isPending ? "Booking..." : pricePerPerson > 0 ? `Book · ₹${total.toLocaleString("en-IN")}` : "Book Tour"
            }
          )
        ] })
      ] })
    }
  );
}
function RegisterOperatorForm({ onClose }) {
  const [form, setForm] = reactExports.useState({
    name: "",
    destinations: "",
    tourTypes: "",
    duration: "",
    price: "",
    phone: "",
    city: ""
  });
  const addOperator = useAddTourOperator();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.destinations) {
      ue.error("Fill all required fields");
      return;
    }
    try {
      const result = await addOperator.mutateAsync({
        name: form.name,
        destination: form.destinations,
        tourType: form.tourTypes || "day_trip",
        duration: form.duration,
        price: Number.parseFloat(form.price) || 0,
        phone: form.phone,
        description: form.city ? `City: ${form.city}` : ""
      });
      const id = result && typeof result === "object" && "id" in result ? String(result.id) : "";
      ue.success(
        id ? `Tour operator registered! ID: ${id}` : "Tour operator registered!"
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
      "data-ocid": "tours.register.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Register as Tour Operator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Close",
              className: "p-1 rounded-lg hover:bg-muted",
              "data-ocid": "tours.register.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
          [
            {
              key: "name",
              label: "Operator/Company Name",
              placeholder: "Himalayan Adventures"
            },
            {
              key: "destinations",
              label: "Destinations (comma separated)",
              placeholder: "Shimla, Manali"
            },
            {
              key: "tourTypes",
              label: "Tour Types (comma separated)",
              placeholder: "day_trip, adventure"
            },
            { key: "duration", label: "Duration", placeholder: "2–5 days" },
            {
              key: "price",
              label: "Price Per Person (₹)",
              placeholder: "3500",
              type: "number"
            },
            { key: "phone", label: "Contact Phone", placeholder: "9876543210" },
            { key: "city", label: "City", placeholder: "Delhi" }
          ].map(({ key, label, placeholder, type }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: type ?? "text",
                placeholder,
                value: form[key],
                onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
                "data-ocid": `tours.register.${key}.input`
              }
            )
          ] }, key)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "tours.register.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1 bg-blue-500 hover:bg-blue-600 text-white",
                disabled: addOperator.isPending,
                "data-ocid": "tours.register.submit_button",
                children: addOperator.isPending ? "Registering..." : "Register"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function OperatorCard({
  operator,
  onBook
}) {
  var _a;
  const destinations = operator.destination ? operator.destination.split(",").map((d) => d.trim()) : [];
  const tourTypeLabel = ((_a = TOUR_TYPES.find((t) => t.value === operator.tourType)) == null ? void 0 : _a.label) ?? operator.tourType;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-blue-500/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-6 h-6 text-blue-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground truncate", children: operator.name }),
        operator.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          "⏱ ",
          operator.duration
        ] })
      ] }),
      operator.price > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-blue-500", children: [
          "₹",
          operator.price
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "per person" })
      ] })
    ] }),
    destinations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: destinations.slice(0, 4).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: d }, d)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mb-4 text-xs text-muted-foreground", children: [
      operator.tourType && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium capitalize", children: tourTypeLabel }),
      operator.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-blue-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: operator.phone })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        className: "w-full bg-blue-500 hover:bg-blue-600 text-white",
        size: "sm",
        onClick: () => onBook(operator),
        "data-ocid": "tours.operator.book_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 mr-2" }),
          " Book Tour"
        ]
      }
    )
  ] });
}
function ToursPage() {
  const {
    data: operators = [],
    isLoading,
    isError,
    refetch
  } = useTourOperators();
  const [search, setSearch] = reactExports.useState("");
  const [tourType, setTourType] = reactExports.useState("all");
  const [bookingOperator, setBookingOperator] = reactExports.useState(
    null
  );
  const [showRegister, setShowRegister] = reactExports.useState(false);
  const filtered = operators.filter((o) => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.destination.toLowerCase().includes(search.toLowerCase());
    const matchType = tourType === "all" || o.tourType.toLowerCase().includes(tourType.toLowerCase());
    return matchSearch && matchType;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-5 h-5 text-blue-500" }),
          " Tours & Travel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Discover and book curated tours across India" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "gap-2 bg-blue-500 hover:bg-blue-600 text-white",
          onClick: () => setShowRegister(true),
          "data-ocid": "tours.register.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Register as Operator"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "browse", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", "data-ocid": "tours.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "browse", "data-ocid": "tours.browse.tab", children: "Browse Tours" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "bookings", "data-ocid": "tours.bookings.tab", children: "My Bookings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "browse", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search tours or destinations...",
                className: "pl-9",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                "data-ocid": "tours.search.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tourType, onValueChange: setTourType, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-44",
                "data-ocid": "tours.filter.type.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Tour Type" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TOUR_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.value, children: t.label }, t.value)) })
          ] })
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
            "data-ocid": "tours.operators.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Unable to load tours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Could not connect to the backend. Please try again." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: () => void refetch(),
                  className: "gap-2",
                  "data-ocid": "tours.operators.retry_button",
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
            "data-ocid": "tours.operators.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: operators.length === 0 ? "No tour operators registered yet" : "No tours found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: operators.length === 0 ? "Register a tour operator to get started" : "Try adjusting your search or filters" }),
              operators.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "mt-4 gap-2 bg-blue-500 hover:bg-blue-600 text-white",
                  onClick: () => setShowRegister(true),
                  "data-ocid": "tours.operators.empty_register_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    " Register Operator"
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
            "data-ocid": "tours.operators.list",
            children: filtered.map((operator, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": `tours.operator.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  OperatorCard,
                  {
                    operator,
                    onBook: setBookingOperator
                  }
                )
              },
              operator.id
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bookings", className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-16 text-center",
          "data-ocid": "tours.bookings.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No bookings yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Browse tours and book your next adventure" })
          ]
        }
      ) })
    ] }),
    bookingOperator && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingPanel,
      {
        operator: bookingOperator,
        onClose: () => setBookingOperator(null)
      }
    ),
    showRegister && /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterOperatorForm, { onClose: () => setShowRegister(false) })
  ] });
}
export {
  ToursPage as default
};
