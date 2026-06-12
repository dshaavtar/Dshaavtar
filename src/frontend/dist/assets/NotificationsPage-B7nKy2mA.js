import { bg as useNotifications, r as reactExports, bh as NotificationStatus, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { B as Bell } from "./bell-Bilc9tB3.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { S as Send } from "./send-DoOOMmv0.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const SquareCheckBig = createLucideIcon("square-check-big", __iconNode);
const TYPE_LABELS = {
  order_status: "Order Update",
  order_pending: "Order Pending",
  job_lead: "Job Lead",
  property_lead: "Property Lead",
  otp: "OTP",
  subscription: "Subscription",
  lending_reminder: "Lending Reminder"
};
const TYPE_COLORS = {
  order_status: "bg-blue-100 text-blue-700 border-blue-200",
  order_pending: "bg-amber-100 text-amber-700 border-amber-200",
  job_lead: "bg-violet-100 text-violet-700 border-violet-200",
  property_lead: "bg-emerald-100 text-emerald-700 border-emerald-200",
  otp: "bg-orange-100 text-orange-700 border-orange-200",
  subscription: "bg-cyan-100 text-cyan-700 border-cyan-200",
  lending_reminder: "bg-amber-100 text-amber-700 border-amber-200"
};
const STATUS_BADGE = {
  [NotificationStatus.sent]: { label: "Sent", variant: "default" },
  [NotificationStatus.pending]: { label: "Pending", variant: "secondary" },
  [NotificationStatus.failed]: { label: "Failed", variant: "destructive" }
};
function maskPhone(phone) {
  return phone;
}
function StatTile({
  label,
  value,
  color,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 shadow-card flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-9 h-9 rounded-lg flex items-center justify-center ${color}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground tabular-nums", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
    ] })
  ] });
}
const ALL_TYPES = [
  "all",
  "order_status",
  "order_pending",
  "job_lead",
  "property_lead",
  "otp",
  "subscription",
  "lending_reminder"
];
function NotificationsPage() {
  var _a, _b;
  const { data: allNotifications = [], isLoading } = useNotifications();
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [phoneSearch, setPhoneSearch] = reactExports.useState("");
  const [viewMessage, setViewMessage] = reactExports.useState(null);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const totalSent = allNotifications.filter(
    (n) => n.status === NotificationStatus.sent
  ).length;
  const totalFailed = allNotifications.filter(
    (n) => n.status === NotificationStatus.failed
  ).length;
  const totalPending = allNotifications.filter(
    (n) => n.status === NotificationStatus.pending
  ).length;
  const filtered = allNotifications.filter((n) => {
    if (statusFilter !== "all" && n.status !== statusFilter) return false;
    if (typeFilter !== "all" && n.notificationType !== typeFilter) return false;
    if (phoneSearch && !n.recipientPhone.includes(phoneSearch)) return false;
    return true;
  });
  const failedIds = filtered.filter((n) => n.status === NotificationStatus.failed).map((n) => n.id);
  const allSelected = filtered.length > 0 && filtered.every((n) => selectedIds.has(n.id));
  function toggleSelect(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    if (allSelected) setSelectedIds(/* @__PURE__ */ new Set());
    else setSelectedIds(new Set(filtered.map((n) => n.id)));
  }
  const STATUS_FILTERS = [
    { label: "All", value: "all" },
    { label: "Sent", value: NotificationStatus.sent },
    { label: "Pending", value: NotificationStatus.pending },
    { label: "Failed", value: NotificationStatus.failed }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "WhatsApp message delivery tracking" })
        ] })
      ] }),
      selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => setSelectedIds(/* @__PURE__ */ new Set()),
            "data-ocid": "notifications-retry-failed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5" }),
              " Retry Failed (",
              failedIds.filter((id) => selectedIds.has(id)).length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            "data-ocid": "notifications-mark-sent",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3.5 h-3.5 mr-1.5" }),
              " Mark Sent (",
              selectedIds.size,
              ")"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatTile,
        {
          label: "Total",
          value: allNotifications.length,
          color: "bg-primary/10 text-primary",
          icon: MessageSquare
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatTile,
        {
          label: "Delivered",
          value: totalSent,
          color: "bg-emerald-100 text-emerald-600",
          icon: SquareCheckBig
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatTile,
        {
          label: "Failed",
          value: totalFailed,
          color: "bg-red-100 text-red-600",
          icon: RefreshCw
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatTile,
        {
          label: "Pending",
          value: totalPending,
          color: "bg-amber-100 text-amber-600",
          icon: Bell
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 shadow-sm space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap gap-1.5",
          "data-ocid": "notifications-status-filter",
          children: STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setStatusFilter(f.value),
              className: `px-3 py-1.5 text-xs rounded-full border transition-colors font-medium ${statusFilter === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`,
              children: f.label
            },
            f.value
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: typeFilter,
            onChange: (e) => setTypeFilter(e.target.value),
            className: "text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
            "data-ocid": "notifications-type-filter",
            children: ALL_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t === "all" ? "All Types" : TYPE_LABELS[t] ?? t }, t))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search phone...",
            value: phoneSearch,
            onChange: (e) => setPhoneSearch(e.target.value),
            className: "w-44 h-8 text-xs",
            "data-ocid": "notifications-phone-search"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: allSelected,
            onChange: toggleAll,
            className: "rounded",
            "aria-label": "Select all",
            "data-ocid": "notifications-select-all"
          }
        ) }),
        [
          "Recipient",
          "User ID",
          "Type",
          "Message",
          "Status",
          "Created At",
          "Sent At",
          "Actions"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
            children: h
          },
          h
        ))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 9,
          className: "py-8 text-center text-muted-foreground text-sm",
          children: "Loading notifications..."
        }
      ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 9, className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 text-muted-foreground/30 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No notifications found" })
      ] }) }) : filtered.map((n) => {
        const badgeCfg = STATUS_BADGE[n.status] ?? {
          label: n.status,
          variant: "secondary"
        };
        const typeCls = TYPE_COLORS[n.notificationType] ?? "bg-muted text-muted-foreground border-border";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors ${selectedIds.has(n.id) ? "bg-primary/5" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: selectedIds.has(n.id),
                  onChange: () => toggleSelect(n.id),
                  className: "rounded",
                  "aria-label": `Select notification ${n.id}`,
                  "data-ocid": `notifications-select-${n.id}`
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap", children: maskPhone(n.recipientPhone) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: n.userId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${typeCls}`,
                  children: TYPE_LABELS[n.notificationType] ?? n.notificationType
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground line-clamp-2 block", children: n.message }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: badgeCfg.variant,
                  className: "text-xs capitalize",
                  children: badgeCfg.label
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: new Date(Number(n.createdAt)).toLocaleString("en-IN", {
                dateStyle: "short",
                timeStyle: "short"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: n.sentAt ? new Date(Number(n.sentAt)).toLocaleString("en-IN", {
                dateStyle: "short",
                timeStyle: "short"
              }) : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 px-2",
                    onClick: () => setViewMessage(n),
                    "data-ocid": `notifications-view-${n.id}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                  }
                ),
                n.status === NotificationStatus.failed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 px-2 text-primary border-primary/30 hover:bg-primary/5",
                    "data-ocid": `notifications-resend-${n.id}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          n.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: "WhatsApp Delivery Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Read receipts and delivery confirmations" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-muted/40 rounded-lg px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-amber-500 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground flex-1", children: "Connect WhatsApp API to see delivery receipts and read confirmations in real-time." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "#/whatsapp-config",
            className: "flex items-center gap-1.5",
            "data-ocid": "notifications-wa-config-link",
            children: [
              "WhatsApp Config ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-3", children: [
        {
          label: "Delivered ✓✓",
          value: `${totalSent} messages`,
          color: "text-emerald-600"
        },
        {
          label: "Read ✓✓ (blue)",
          value: "API required",
          color: "text-blue-500"
        },
        {
          label: "Failed ✗",
          value: `${totalFailed} messages`,
          color: "text-destructive"
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center bg-muted/30 rounded-lg py-2.5 px-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-bold ${item.color}`, children: item.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: item.label })
          ]
        },
        item.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!viewMessage,
        onOpenChange: (open) => {
          if (!open) setViewMessage(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Full Message" }) }),
          viewMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs bg-muted/40 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Recipient" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-medium mt-0.5", children: maskPhone(viewMessage.recipientPhone) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-0.5", children: TYPE_LABELS[viewMessage.notificationType] ?? viewMessage.notificationType })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Created" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-0.5", children: new Date(Number(viewMessage.createdAt)).toLocaleString(
                  "en-IN"
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: ((_a = STATUS_BADGE[viewMessage.status]) == null ? void 0 : _a.variant) ?? "secondary",
                    className: "text-xs capitalize",
                    children: ((_b = STATUS_BADGE[viewMessage.status]) == null ? void 0 : _b.label) ?? viewMessage.status
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Message Content" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: viewMessage.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              viewMessage.status === NotificationStatus.failed && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1", "data-ocid": "msg-modal-resend", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
                " Resend"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setViewMessage(null),
                  children: "Close"
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  NotificationsPage as default
};
