import { a2 as useHealthcareProviders, r as reactExports, j as jsxRuntimeExports, dz as useBookHealthcareAppointment, dA as useAddHealthcareProvider, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { S as Stethoscope } from "./stethoscope-Dd6PCJkW.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
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
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
import "./index-BNXq-E6T.js";
const SPECIALIZATIONS = [
  "All",
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Cardiologist",
  "Orthopedist",
  "Dentist",
  "Psychiatrist",
  "Neurologist"
];
const TIME_SLOTS = [
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 4pm)" },
  { value: "evening", label: "Evening (4pm – 8pm)" }
];
function BookingPanel({
  provider,
  onClose
}) {
  const [date, setDate] = reactExports.useState("");
  const [timeSlot, setTimeSlot] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [bookingId, setBookingId] = reactExports.useState(null);
  const [bookingError, setBookingError] = reactExports.useState(null);
  const bookMutation = useBookHealthcareAppointment();
  async function handleBook() {
    if (!date || !timeSlot) {
      ue.error("Please select date and time slot");
      return;
    }
    setBookingError(null);
    try {
      const result = await bookMutation.mutateAsync({
        providerId: provider.id,
        customerPhone: "9999999999",
        date,
        timeSlot,
        notes
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
        "data-ocid": "healthcare.booking.success_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm text-center p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✅" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: "Booking Confirmed!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
            "Your appointment with ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: provider.name }),
            " is booked."
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
              "data-ocid": "healthcare.booking.close_button",
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
      "data-ocid": "healthcare.booking.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Book Appointment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1 rounded-lg hover:bg-muted transition-colors",
                "aria-label": "Close",
                "data-ocid": "healthcare.booking.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3 p-3 bg-pink-50 dark:bg-pink-950/20 rounded-xl border border-pink-100 dark:border-pink-900/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-5 h-5 text-pink-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: provider.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                provider.specialization,
                provider.fee ? ` · ₹${provider.fee}` : ""
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Appointment Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                "data-ocid": "healthcare.booking.date.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Time Slot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: timeSlot, onValueChange: setTimeSlot, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "healthcare.booking.timeslot.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select time slot" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIME_SLOTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Notes (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "Describe symptoms or any specific concern...",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                className: "resize-none h-24",
                "data-ocid": "healthcare.booking.notes.textarea"
              }
            )
          ] }),
          bookingError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive mt-2",
              "data-ocid": "healthcare.booking.error_state",
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
              "data-ocid": "healthcare.booking.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 bg-pink-500 hover:bg-pink-600 text-white",
              onClick: handleBook,
              disabled: bookMutation.isPending,
              "data-ocid": "healthcare.booking.confirm_button",
              children: bookMutation.isPending ? "Booking..." : provider.fee ? `Book · ₹${provider.fee}` : "Book Appointment"
            }
          )
        ] })
      ] })
    }
  );
}
function RegisterProviderForm({ onClose }) {
  const [form, setForm] = reactExports.useState({
    name: "",
    specialization: "",
    fee: "",
    address: "",
    city: "",
    availability: "",
    phone: ""
  });
  const addProvider = useAddHealthcareProvider();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.specialization || !form.fee) {
      ue.error("Fill all required fields");
      return;
    }
    try {
      const result = await addProvider.mutateAsync({
        name: form.name,
        specialization: form.specialization,
        location: [form.address, form.city].filter(Boolean).join(", "),
        phone: form.phone,
        availableDays: form.availability,
        fee: Number.parseFloat(form.fee)
      });
      const id = result && typeof result === "object" && "id" in result ? String(result.id) : "";
      ue.success(
        id ? `Provider registered! ID: ${id}` : "Provider registered!"
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
      "data-ocid": "healthcare.register.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Register as Healthcare Provider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Close",
              className: "p-1 rounded-lg hover:bg-muted",
              "data-ocid": "healthcare.register.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
          [
            { key: "name", label: "Full Name", placeholder: "Dr. John Doe" },
            {
              key: "fee",
              label: "Consultation Fee (₹)",
              placeholder: "500",
              type: "number"
            },
            {
              key: "address",
              label: "Clinic Address",
              placeholder: "123 Main Street"
            },
            { key: "city", label: "City", placeholder: "Delhi" },
            {
              key: "availability",
              label: "Availability",
              placeholder: "Mon–Sat, 9am–5pm"
            },
            { key: "phone", label: "Phone Number", placeholder: "9876543210" }
          ].map(({ key, label, placeholder, type }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: type ?? "text",
                placeholder,
                value: form[key],
                onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
                "data-ocid": `healthcare.register.${key}.input`
              }
            )
          ] }, key)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Specialization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.specialization,
                onValueChange: (v) => setForm((f) => ({ ...f, specialization: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "healthcare.register.specialization.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select specialization" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SPECIALIZATIONS.filter((s) => s !== "All").map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "healthcare.register.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1 bg-pink-500 hover:bg-pink-600 text-white",
                disabled: addProvider.isPending,
                "data-ocid": "healthcare.register.submit_button",
                children: addProvider.isPending ? "Registering..." : "Register"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function ProviderCard({
  provider,
  onBook
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 hover:border-pink-300 dark:hover:border-pink-700 transition-all shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-pink-500/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-6 h-6 text-pink-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground truncate", children: provider.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: provider.specialization }),
        provider.availableDays && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          "🕐 ",
          provider.availableDays
        ] })
      ] }),
      provider.fee ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-pink-500", children: [
          "₹",
          provider.fee
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "per visit" })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mb-4", children: [
      provider.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-pink-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: provider.location })
      ] }),
      provider.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-pink-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: provider.phone })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        className: "w-full bg-pink-500 hover:bg-pink-600 text-white",
        size: "sm",
        onClick: () => onBook(provider),
        "data-ocid": "healthcare.provider.book_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 mr-2" }),
          " Book Appointment"
        ]
      }
    )
  ] });
}
function HealthcarePage() {
  const {
    data: providers = [],
    isLoading,
    isError,
    refetch
  } = useHealthcareProviders();
  const [search, setSearch] = reactExports.useState("");
  const [specialization, setSpecialization] = reactExports.useState("All");
  const [bookingProvider, setBookingProvider] = reactExports.useState(null);
  const [showRegister, setShowRegister] = reactExports.useState(false);
  const filtered = providers.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specialization === "All" || p.specialization.toLowerCase().includes(specialization.toLowerCase());
    return matchSearch && matchSpec;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-5 h-5 text-pink-500" }),
          " Healthcare"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Book consultations with qualified healthcare professionals" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "gap-2 bg-pink-500 hover:bg-pink-600 text-white",
          onClick: () => setShowRegister(true),
          "data-ocid": "healthcare.register.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Register as Provider"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "browse", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", "data-ocid": "healthcare.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "browse", "data-ocid": "healthcare.browse.tab", children: "Browse Providers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "appointments",
            "data-ocid": "healthcare.appointments.tab",
            children: "My Appointments"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "browse", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search doctors...",
                className: "pl-9",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                "data-ocid": "healthcare.search.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: specialization, onValueChange: setSpecialization, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-48",
                "data-ocid": "healthcare.filter.specialization.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Specialization" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SPECIALIZATIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
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
            "data-ocid": "healthcare.providers.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Unable to load providers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Could not connect to the backend. Please try again." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: () => void refetch(),
                  className: "gap-2",
                  "data-ocid": "healthcare.providers.retry_button",
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
            "data-ocid": "healthcare.providers.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: providers.length === 0 ? "No providers registered yet" : "No providers found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: providers.length === 0 ? "Register a healthcare provider to get started" : "Try adjusting your filters" }),
              providers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "mt-4 gap-2 bg-pink-500 hover:bg-pink-600 text-white",
                  onClick: () => setShowRegister(true),
                  "data-ocid": "healthcare.providers.empty_register_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    " Register Provider"
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
            "data-ocid": "healthcare.providers.list",
            children: filtered.map((provider, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": `healthcare.provider.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProviderCard,
                  {
                    provider,
                    onBook: setBookingProvider
                  }
                )
              },
              provider.id
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "appointments", className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-16 text-center",
          "data-ocid": "healthcare.appointments.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No appointments yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Browse providers and book your first appointment" })
          ]
        }
      ) })
    ] }),
    bookingProvider && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingPanel,
      {
        provider: bookingProvider,
        onClose: () => setBookingProvider(null)
      }
    ),
    showRegister && /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterProviderForm, { onClose: () => setShowRegister(false) })
  ] });
}
export {
  HealthcarePage as default
};
