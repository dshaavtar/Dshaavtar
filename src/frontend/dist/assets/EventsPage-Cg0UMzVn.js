import { a6 as useEvents, bq as useUpdateEventStatus, br as useDeleteEvent, r as reactExports, j as jsxRuntimeExports, p as ue, bs as useMyEventListings, bt as useCreateEvent, N as useEntityLeads } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { X } from "./x-Chksmd6i.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { T as Ticket } from "./ticket-CID_kmnS.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { U as Users } from "./users-BCFHEKUR.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
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
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode);
const STATUS_META = {
  published: {
    label: "Published",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
  },
  pending: {
    label: "Pending",
    cls: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
  },
  expired: {
    label: "Expired",
    cls: "bg-muted text-muted-foreground border-border"
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
  }
};
function StatCard({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-1 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold font-display ${color}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
function EventLeadsPanel({
  eventId,
  onClose
}) {
  const { data: leads, isLoading } = useEntityLeads("event", eventId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: () => onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "events.leads_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
      " Event Leads"
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-4", children: ["l1", "l2", "l3"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, s)) }) : !leads ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-sm text-muted-foreground py-8 text-center",
        "data-ocid": "events.leads.empty_state",
        children: "No leads data"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Views" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-primary", children: leads.views })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Interested" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400", children: leads.interested })
        ] })
      ] }),
      leads.viewers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
          " Viewers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-48 overflow-y-auto", children: leads.viewers.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-2 bg-muted/20 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono", children: v.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(v.timestamp).toLocaleDateString("en-IN") })
            ]
          },
          `${v.phone}-${i}`
        )) })
      ] }),
      leads.interestedList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
          " Interested"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-48 overflow-y-auto", children: leads.interestedList.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-2 bg-muted/20 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono", children: v.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(v.timestamp).toLocaleDateString("en-IN") })
            ]
          },
          `${v.phone}-${i}`
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full",
          onClick: onClose,
          "data-ocid": "events.leads_close_button",
          children: "Close"
        }
      )
    ] })
  ] }) });
}
const AI_DESCRIPTIONS = [
  "Join us for an unforgettable experience filled with entertainment, activities, and surprises. Open to all ages!",
  "A premier gathering bringing together community members for networking, learning, and celebration.",
  "Don't miss this one-of-a-kind event with live performances, food stalls, and exciting activities for the whole family."
];
function CreateEventDialog({ onClose }) {
  const createEvent = useCreateEvent();
  const [form, setForm] = reactExports.useState({
    eventName: "",
    description: "",
    isPaid: false,
    price: "",
    locationAddress: "",
    startDate: "",
    endDate: "",
    ticketVenue: "",
    organizerName: "Admin",
    organizerPhone: "+910000000000"
  });
  function generateDescription() {
    const desc = AI_DESCRIPTIONS[Math.floor(Math.random() * AI_DESCRIPTIONS.length)];
    setForm((f) => ({ ...f, description: desc }));
  }
  async function handleSubmit() {
    if (!form.eventName || !form.locationAddress || !form.startDate || !form.endDate) {
      ue.error("Please fill all required fields");
      return;
    }
    try {
      await createEvent.mutateAsync({
        organizerPhone: form.organizerPhone,
        organizerName: form.organizerName,
        eventName: form.eventName,
        description: form.description,
        isPaid: form.isPaid,
        price: form.isPaid ? Number.parseFloat(form.price) || 0 : 0,
        locationAddress: form.locationAddress,
        startDate: form.startDate,
        endDate: form.endDate,
        ticketVenue: form.ticketVenue
      });
      ue.success("Event created successfully");
      onClose();
    } catch {
      ue.error("Failed to create event");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "events.create_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Post New Event" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Event Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. Diwali Mela 2026",
                value: form.eventName,
                onChange: (e) => setForm((f) => ({ ...f, eventName: e.target.value })),
                "data-ocid": "events.create.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 gap-1.5 text-xs text-primary",
                  onClick: generateDescription,
                  "data-ocid": "events.create.generate_desc_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-3.5 h-3.5" }),
                    " Generate (AI)"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "Describe the event...",
                rows: 3,
                value: form.description,
                onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                "data-ocid": "events.create.desc_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-muted/30 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "isPaid",
                checked: form.isPaid,
                onCheckedChange: (v) => setForm((f) => ({ ...f, isPaid: v })),
                "data-ocid": "events.create.paid_switch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "isPaid", className: "cursor-pointer", children: "Paid Event" })
          ] }),
          form.isPaid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ticket Price (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "e.g. 500",
                value: form.price,
                onChange: (e) => setForm((f) => ({ ...f, price: e.target.value })),
                "data-ocid": "events.create.price_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location Address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Full address or venue name",
                value: form.locationAddress,
                onChange: (e) => setForm((f) => ({ ...f, locationAddress: e.target.value })),
                "data-ocid": "events.create.location_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Start Date *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: form.startDate,
                  onChange: (e) => setForm((f) => ({ ...f, startDate: e.target.value })),
                  "data-ocid": "events.create.start_date"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "End Date *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: form.endDate,
                  onChange: (e) => setForm((f) => ({ ...f, endDate: e.target.value })),
                  "data-ocid": "events.create.end_date"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ticket/Venue Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. City Hall, Gate 2 — tickets at the door",
                value: form.ticketVenue,
                onChange: (e) => setForm((f) => ({ ...f, ticketVenue: e.target.value })),
                "data-ocid": "events.create.venue_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Organizer Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.organizerName,
                  onChange: (e) => setForm((f) => ({ ...f, organizerName: e.target.value })),
                  "data-ocid": "events.create.organizer_name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Organizer Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.organizerPhone,
                  onChange: (e) => setForm((f) => ({ ...f, organizerPhone: e.target.value })),
                  "data-ocid": "events.create.organizer_phone"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground", children: [
            "📅 Event will be published for ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "1 month" }),
            " from today. Paid subscription required to post."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "events.create.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: handleSubmit,
                disabled: createEvent.isPending,
                "data-ocid": "events.create.submit_button",
                children: createEvent.isPending ? "Creating…" : "Post Event"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function MyEventsTab() {
  const [phone, setPhone] = reactExports.useState("");
  const [queryPhone, setQueryPhone] = reactExports.useState("");
  const {
    data: myEvents = [],
    isLoading,
    error
  } = useMyEventListings(queryPhone);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "my-events.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-3", children: "Enter your phone number to view your posted events" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "+91 98765 43210",
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            className: "max-w-xs",
            "data-ocid": "my-events.phone_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => setQueryPhone(phone.trim()),
            disabled: !phone.trim(),
            "data-ocid": "my-events.search_button",
            children: "View My Events"
          }
        )
      ] })
    ] }),
    !queryPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "my-events.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Enter your phone number above to view your posted events" })
        ]
      }
    ),
    queryPhone && isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2", "s3"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, s)) }),
    queryPhone && !isLoading && (error || myEvents.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "my-events.no_results",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-8 h-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: error ? "Failed to load listings" : "No listings yet. Post your first one!" }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setQueryPhone(""),
              "data-ocid": "my-events.retry_button",
              children: "Retry"
            }
          )
        ]
      }
    ),
    queryPhone && !isLoading && myEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
        myEvents.length,
        " event",
        myEvents.length !== 1 ? "s" : "",
        " posted"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "my-events.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Event" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Dates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Created" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: myEvents.map((event, i) => {
          var _a;
          const meta = STATUS_META[event.status];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
              "data-ocid": `my-events.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-medium text-foreground max-w-[180px] truncate", children: event.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs", children: event.isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold", children: [
                  "₹",
                  (_a = event.price) == null ? void 0 : _a.toLocaleString("en-IN")
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 dark:text-emerald-400 font-medium", children: "Free" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-xs text-muted-foreground whitespace-nowrap", children: [
                  event.startDate,
                  " → ",
                  event.endDate
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground max-w-[120px] truncate", children: event.location }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${meta.cls}`,
                    children: meta.label
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground whitespace-nowrap", children: new Date(event.createdAt).toLocaleDateString("en-IN") })
              ]
            },
            event.id
          );
        }) })
      ] }) })
    ] })
  ] });
}
function EventsPage() {
  var _a;
  const { data: events = [], isLoading, isError, refetch } = useEvents();
  const updateEventStatus = useUpdateEventStatus();
  const deleteEvent = useDeleteEvent();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [selectedEvent, setSelectedEvent] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [rejectId, setRejectId] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [leadsEventId, setLeadsEventId] = reactExports.useState(null);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const filtered = events.filter((e) => {
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    if (typeFilter === "paid" && !e.isPaid) return false;
    if (typeFilter === "free" && e.isPaid) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.organizerName.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });
  const total = events.length;
  const published = events.filter((e) => e.status === "published").length;
  const pending = events.filter((e) => e.status === "pending").length;
  const paid = events.filter((e) => e.isPaid).length;
  async function handlePublish(id) {
    try {
      await updateEventStatus.mutateAsync({
        id,
        status: "published"
      });
      ue.success("Event published");
    } catch {
      ue.error("Failed to publish event");
    }
  }
  async function handleRejectConfirm() {
    if (!rejectId) return;
    try {
      await updateEventStatus.mutateAsync({
        id: rejectId,
        status: "cancelled"
      });
      setRejectId(null);
      setRejectReason("");
      ue.success("Event rejected");
    } catch {
      ue.error("Failed to reject event");
    }
  }
  async function handleStatusChange(id, status) {
    try {
      await updateEventStatus.mutateAsync({
        id,
        status
      });
      ue.success("Event status updated");
    } catch {
      ue.error("Failed to update status");
    }
  }
  async function handleDelete(id) {
    try {
      await deleteEvent.mutateAsync(id);
      setSelectedEvent(null);
      setDeleteId(null);
      ue.success("Event deleted");
    } catch {
      ue.error("Failed to delete event");
    }
  }
  function handleExport() {
    const rows = events.map(
      (e) => [
        e.id,
        e.name,
        e.organizerName,
        e.organizerPhone,
        e.location,
        e.startDate,
        e.endDate,
        e.isPaid ? "Paid" : "Free",
        e.price ?? 0,
        e.ticketVenue,
        e.status,
        e.publishedUntil,
        new Date(e.createdAt).toLocaleDateString("en-IN")
      ].join(",")
    );
    const csv = [
      "ID,Event Name,Organizer,Phone,Location,Start Date,End Date,Type,Price,Ticket Venue,Status,Published Until,Created At",
      ...rows
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  const hasFilters = statusFilter !== "all" || typeFilter !== "all" || search;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Events" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage community events, approvals, and ticket listings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "gap-2",
            onClick: handleExport,
            "data-ocid": "events.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "gap-2",
            onClick: () => setShowCreateDialog(true),
            "data-ocid": "events.create_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Post Event"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Events", value: total, color: "text-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Published",
          value: published,
          color: "text-emerald-600 dark:text-emerald-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending Approval",
          value: pending,
          color: "text-amber-600 dark:text-amber-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Paid Events", value: paid, color: "text-primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", "data-ocid": "events.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "events.tab.all", children: "All Events" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "my", "data-ocid": "events.tab.my", children: "My Events" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: statusFilter,
                onValueChange: (v) => setStatusFilter(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-36 h-8 text-sm",
                      "data-ocid": "events.status_filter.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Published" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "expired", children: "Expired" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: typeFilter,
                onValueChange: (v) => setTypeFilter(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-28 h-8 text-sm",
                      "data-ocid": "events.type_filter.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Type" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "paid", children: "Paid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "free", children: "Free" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search event or organizer...",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-8 h-8 text-sm w-56",
                  "data-ocid": "events.search_input"
                }
              )
            ] }),
            hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 gap-1 text-muted-foreground",
                onClick: () => {
                  setStatusFilter("all");
                  setTypeFilter("all");
                  setSearch("");
                },
                "data-ocid": "events.clear_filters_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                  " Clear"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            filtered.length,
            " of ",
            events.length,
            " events"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["e1", "e2", "e3", "e4", "e5"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, s)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center",
            "data-ocid": "events.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Unable to load events. Please try again." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => void refetch(),
                  "data-ocid": "events.retry_button",
                  children: "Retry"
                }
              )
            ]
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center",
            "data-ocid": "events.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No events found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setShowCreateDialog(true),
                  "data-ocid": "events.empty_create_button",
                  children: "Post an Event"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "events.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Event Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Organizer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Dates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Ticket/Venue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Published Until" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Created" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((event, idx) => {
            var _a2;
            const meta = STATUS_META[event.status];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                "data-ocid": `events.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "font-medium text-foreground hover:text-primary transition-colors max-w-[180px] truncate block text-left",
                      onClick: () => setSelectedEvent(event),
                      "data-ocid": `events.view_button.${idx + 1}`,
                      children: event.name
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: event.organizerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono", children: event.organizerPhone })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground max-w-[120px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: event.location })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: event.startDate }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "→ ",
                      event.endDate
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: event.isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-primary", children: [
                    "💰 ₹",
                    (_a2 = event.price) == null ? void 0 : _a2.toLocaleString("en-IN")
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-600 dark:text-emerald-400 font-medium", children: "Free" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-3 h-3 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[80px]", children: event.ticketVenue })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: event.status,
                      onValueChange: (v) => handleStatusChange(event.id, v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-7 w-32 border-0 p-0 focus:ring-0",
                            "data-ocid": `events.status_select.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${meta.cls}`,
                                children: meta.label
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Published" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "expired", children: "Expired" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
                        ] })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 whitespace-nowrap text-xs text-muted-foreground", children: event.publishedUntil }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 whitespace-nowrap text-xs text-muted-foreground", children: new Date(event.createdAt).toLocaleDateString(
                    "en-IN"
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    event.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "h-7 px-2 text-xs gap-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
                          onClick: () => handlePublish(event.id),
                          disabled: updateEventStatus.isPending,
                          "data-ocid": `events.publish_button.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                            " ",
                            "Publish"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10",
                          onClick: () => setRejectId(event.id),
                          "data-ocid": `events.reject_button.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                            " Reject"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-7 px-2 text-xs gap-1 text-blue-600 hover:bg-blue-50",
                        onClick: () => setLeadsEventId(event.id),
                        "data-ocid": `events.leads_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-7 w-7 p-0 text-destructive hover:bg-destructive/10",
                        onClick: () => setDeleteId(event.id),
                        "data-ocid": `events.delete_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              event.id
            );
          }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "my", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MyEventsTab, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCreateDialog, onOpenChange: setShowCreateDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreateEventDialog, { onClose: () => setShowCreateDialog(false) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedEvent,
        onOpenChange: () => setSelectedEvent(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "sm:max-w-lg max-h-[90vh] overflow-y-auto",
            "data-ocid": "events.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: selectedEvent == null ? void 0 : selectedEvent.name }) }),
              selectedEvent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_META[selectedEvent.status].cls}`,
                      children: STATUS_META[selectedEvent.status].label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: selectedEvent.isPaid ? `Paid – ₹${(_a = selectedEvent.price) == null ? void 0 : _a.toLocaleString("en-IN")}` : "Free" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: selectedEvent.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Organizer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: selectedEvent.organizerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: selectedEvent.organizerPhone })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Location" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: selectedEvent.location })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Event Dates" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
                      selectedEvent.startDate,
                      " → ",
                      selectedEvent.endDate
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Ticket/Venue" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: selectedEvent.ticketVenue })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Published Until" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: selectedEvent.publishedUntil })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Created At" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: new Date(selectedEvent.createdAt).toLocaleDateString(
                      "en-IN"
                    ) })
                  ] })
                ] }),
                selectedEvent.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "flex-1 bg-emerald-600 hover:bg-emerald-700",
                      onClick: () => {
                        handlePublish(selectedEvent.id);
                        setSelectedEvent(null);
                      },
                      "data-ocid": "events.modal_publish_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-1.5" }),
                        " Publish Event"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "destructive",
                      onClick: () => {
                        setRejectId(selectedEvent.id);
                        setSelectedEvent(null);
                      },
                      "data-ocid": "events.modal_reject_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mr-1.5" }),
                        " Reject"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => {
                        setLeadsEventId(selectedEvent.id);
                        setSelectedEvent(null);
                      },
                      "data-ocid": "events.modal_leads_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 mr-1.5" }),
                        " View Leads"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "destructive",
                      className: "gap-1.5",
                      onClick: () => handleDelete(selectedEvent.id),
                      "data-ocid": "events.confirm_delete_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                        " Delete"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!rejectId,
        onOpenChange: () => {
          setRejectId(null);
          setRejectReason("");
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "events.reject_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject Event" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Provide a reason for rejection. The organizer will be notified." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rejection Reason" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "e.g. Incomplete information, inappropriate content...",
                  rows: 3,
                  value: rejectReason,
                  onChange: (e) => setRejectReason(e.target.value),
                  "data-ocid": "events.reject_reason_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => {
                    setRejectId(null);
                    setRejectReason("");
                  },
                  "data-ocid": "events.reject_cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "destructive",
                  className: "flex-1",
                  onClick: handleRejectConfirm,
                  disabled: updateEventStatus.isPending,
                  "data-ocid": "events.reject_confirm_button",
                  children: updateEventStatus.isPending ? "Rejecting…" : "Reject Event"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteId, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-sm",
        "data-ocid": "events.confirm_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Event?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This action cannot be undone." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteId(null),
                "data-ocid": "events.delete_cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: () => {
                  if (deleteId) handleDelete(deleteId);
                },
                "data-ocid": "events.delete_confirm_button",
                children: "Delete"
              }
            )
          ] })
        ]
      }
    ) }),
    leadsEventId && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EventLeadsPanel,
      {
        eventId: leadsEventId,
        onClose: () => setLeadsEventId(null)
      }
    )
  ] });
}
export {
  EventsPage as default
};
