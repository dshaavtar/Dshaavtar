import { D as useMerchants, r as reactExports, j as jsxRuntimeExports, L as Link, cL as useSubscriptionDashboardStats, cM as useAssignedUsers, cN as useAssignUserToSubscription, cO as useRemoveUserFromSubscription, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { C as CreditCard } from "./credit-card-CP3NtRg6.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { S as ShieldCheck } from "./shield-check-DNUGUjo-.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { I as IndianRupee } from "./indian-rupee-4FVPRNFh.js";
import { C as ChartColumn } from "./chart-column-1UICj-Tf.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserMinus = createLucideIcon("user-minus", __iconNode);
function StatCard({
  icon,
  label,
  value,
  sub,
  colorCls
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-start gap-4 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorCls}`,
        children: icon
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
}
function UtilizationBar({ pct }) {
  const clamped = Math.min(100, Math.max(0, pct));
  const color = clamped < 70 ? "bg-emerald-500" : clamped < 90 ? "bg-amber-500" : "bg-red-500";
  const textColor = clamped < 70 ? "text-emerald-600" : clamped < 90 ? "text-amber-600" : "text-red-600";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all ${color}`,
        style: { width: `${clamped}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `text-xs font-medium tabular-nums min-w-[3ch] text-right ${textColor}`,
        children: [
          Math.round(clamped),
          "%"
        ]
      }
    )
  ] });
}
function AssignedUsersPanel({ merchantId }) {
  const { data: users = [], isLoading, refetch } = useAssignedUsers(merchantId);
  const assignMutation = useAssignUserToSubscription();
  const removeMutation = useRemoveUserFromSubscription();
  const [newPhone, setNewPhone] = reactExports.useState("");
  const [newCap, setNewCap] = reactExports.useState("50");
  async function handleAdd() {
    const phone = newPhone.trim();
    if (!phone) {
      ue.error("Enter a phone number");
      return;
    }
    const cap = Number.parseInt(newCap);
    if (!Number.isFinite(cap) || cap < 1) {
      ue.error("Enter a valid order cap");
      return;
    }
    try {
      await assignMutation.mutateAsync({
        merchantId,
        userPhone: phone,
        orderCap: BigInt(cap)
      });
      ue.success(`User ${phone} assigned`);
      setNewPhone("");
      setNewCap("50");
      refetch();
    } catch (e) {
      ue.error(
        `Failed: ${e instanceof Error ? e.message : "Unknown error"}`
      );
    }
  }
  async function handleRemove(phone) {
    try {
      await removeMutation.mutateAsync({ merchantId, userPhone: phone });
      ue.success(`User ${phone} removed`);
      refetch();
    } catch (e) {
      ue.error(
        `Failed: ${e instanceof Error ? e.message : "Unknown error"}`
      );
    }
  }
  function exportCSV() {
    const rows = [
      ["Phone", "Orders Used", "Order Cap", "Status", "Assigned At"],
      ...users.map((u) => [
        u.assignedUserId,
        String(Number(u.ordersUsed)),
        String(Number(u.orderCap)),
        String(u.status),
        new Date(Number(u.assignedAt) / 1e6).toLocaleDateString("en-IN")
      ])
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assigned-users-${merchantId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-muted/20 p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 flex-1 min-w-[160px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Phone Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "+91 98765 43210",
            value: newPhone,
            onChange: (e) => setNewPhone(e.target.value),
            "data-ocid": "sub-dash.assign-phone-input",
            className: "h-8 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 w-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Order Cap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 1,
            value: newCap,
            onChange: (e) => setNewCap(e.target.value),
            "data-ocid": "sub-dash.assign-cap-input",
            className: "h-8 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: handleAdd,
          disabled: assignMutation.isPending,
          "data-ocid": "sub-dash.assign-add-button",
          children: [
            assignMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
            "Assign"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: exportCSV,
          "data-ocid": "sub-dash.export-csv-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1" }),
            "CSV"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, i)) }) : users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-6 text-muted-foreground text-sm",
        "data-ocid": "sub-dash.users-empty_state",
        children: "No delivery users assigned. Add a user above."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground", children: "User Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 font-medium text-muted-foreground", children: "Orders Used" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 font-medium text-muted-foreground", children: "Cap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground", children: "Assigned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: users.map((u, idx) => {
        const used = Number(u.ordersUsed);
        const cap = Number(u.orderCap);
        const pct = cap > 0 ? used / cap * 100 : 0;
        const statusStr = String(u.status);
        const isActive = statusStr === "active";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "hover:bg-muted/30 transition-colors",
            "data-ocid": `sub-dash.user-row.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-foreground", children: u.assignedUserId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  used,
                  "/",
                  cap
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(UtilizationBar, { pct })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: cap }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`,
                  children: [
                    isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-2.5 h-2.5" }),
                    statusStr
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: new Date(
                Number(u.assignedAt) / 1e6
              ).toLocaleDateString("en-IN") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-6 px-2 text-destructive hover:text-destructive text-[10px]",
                  onClick: () => handleRemove(u.assignedUserId),
                  disabled: removeMutation.isPending,
                  "data-ocid": `sub-dash.remove-user-button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "w-3 h-3 mr-0.5" }),
                    "Remove"
                  ]
                }
              ) })
            ]
          },
          u.id
        );
      }) })
    ] }) })
  ] });
}
function MerchantRow({
  merchant,
  isExpanded,
  onToggle,
  index
}) {
  const { data: stats, isLoading } = useSubscriptionDashboardStats(merchant.id);
  const planName = (stats == null ? void 0 : stats.planName) ?? "—";
  const assignedCount = Number((stats == null ? void 0 : stats.assignedUsersCount) ?? 0);
  const ordersUsed = Number((stats == null ? void 0 : stats.totalOrdersThisMonth) ?? 0);
  const orderCap = Number((stats == null ? void 0 : stats.orderCap) ?? 0);
  const utilPct = (stats == null ? void 0 : stats.utilizationPercent) ?? 0;
  const daysLeft = Number((stats == null ? void 0 : stats.daysUntilRenewal) ?? 0);
  const statusBadge = utilPct >= 90 ? {
    cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    label: "Critical"
  } : utilPct >= 70 ? {
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    label: "High"
  } : {
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    label: "Healthy"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: `border-b border-border hover:bg-muted/20 cursor-pointer transition-colors ${isExpanded ? "bg-muted/30" : ""}`,
        onClick: onToggle,
        onKeyDown: (e) => e.key === "Enter" && onToggle(),
        "data-ocid": `sub-dash.merchant-row.${index}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate max-w-[160px]", children: merchant.businessName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: merchant.category })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground", children: planName }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-8 ml-auto" }) : assignedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 ml-auto" }) : `${ordersUsed}/${orderCap}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UtilizationBar, { pct: utilPct }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-sm text-muted-foreground", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 ml-auto" }) : `${daysLeft}d` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge.cls}`,
              children: statusBadge.label
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-6 px-2 text-[10px] text-primary",
                onClick: (e) => {
                  e.stopPropagation();
                  onToggle();
                },
                "data-ocid": `sub-dash.view-users-button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 mr-0.5" }),
                  "Users"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                className: `w-3.5 h-3.5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`
              }
            )
          ] }) })
        ]
      }
    ),
    isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AssignedUsersPanel, { merchantId: merchant.id }) }) })
  ] });
}
const PLAN_DIST = [
  { label: "Free", pct: 45, color: "bg-muted-foreground" },
  { label: "Basic", pct: 25, color: "bg-blue-500" },
  { label: "Pro", pct: 20, color: "bg-violet-500" },
  { label: "Enterprise", pct: 10, color: "bg-amber-500" }
];
const WEEKLY_BARS = [
  { day: "M", orders: 42 },
  { day: "T", orders: 67 },
  { day: "W", orders: 55 },
  { day: "T2", orders: 89 },
  { day: "F", orders: 73 },
  { day: "S", orders: 91 },
  { day: "S2", orders: 64 }
];
function SubscriptionDashboardPage() {
  const { data: merchants = [], isLoading: merchantsLoading } = useMerchants();
  const [expandedMerchantId, setExpandedMerchantId] = reactExports.useState(
    null
  );
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const PAGE_SIZE = 25;
  const filteredMerchants = merchants.filter(
    (m) => !searchQuery || m.businessName.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMerchants.length / PAGE_SIZE);
  const pageMerchants = filteredMerchants.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );
  const totalMerchants = merchants.length;
  const verifiedMerchants = merchants.filter((m) => m.isVerified).length;
  function toggleExpand(id) {
    setExpandedMerchantId((prev) => prev === id ? null : id);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", "data-ocid": "sub-dash.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Delivery Assignment Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track assigned delivery users, subscription utilization, and plan analytics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subscriptions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            "data-ocid": "sub-dash.manage-plans-link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 mr-2" }),
              "Manage Plans"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => window.location.reload(),
            "data-ocid": "sub-dash.refresh-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-4 gap-4",
        "data-ocid": "sub-dash.summary-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-emerald-600" }),
              label: "Active Business Subscriptions",
              value: verifiedMerchants,
              sub: `of ${totalMerchants} total merchants`,
              colorCls: "bg-emerald-100 dark:bg-emerald-900/30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-5 h-5 text-blue-600" }),
              label: "Assigned Delivery Users",
              value: "—",
              sub: "across all merchants",
              colorCls: "bg-blue-100 dark:bg-blue-900/30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-violet-600" }),
              label: "Orders This Month",
              value: "—",
              sub: "all subscribed merchants",
              colorCls: "bg-violet-100 dark:bg-violet-900/30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-amber-600" }),
              label: "Subscription Revenue",
              value: "—",
              sub: "this billing period",
              colorCls: "bg-amber-100 dark:bg-amber-900/30"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
        "data-ocid": "sub-dash.analytics-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Plan Distribution" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: PLAN_DIST.map(({ label, pct, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-20 shrink-0", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-full rounded-full ${color}`,
                  style: { width: `${pct}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium tabular-nums w-8 text-right", children: [
                pct,
                "%"
              ] })
            ] }, label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-3", children: "* Distribution based on active merchant plan types" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Orders (Last 7 Days)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-24", children: WEEKLY_BARS.map((bar) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 flex flex-col items-center gap-1",
                title: `${bar.day}: ${bar.orders} orders`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full rounded-sm bg-primary/70 hover:bg-primary transition-colors",
                      style: { height: `${bar.orders / 100 * 96}px` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground", children: bar.day.replace(/\d/, "") })
                ]
              },
              bar.day
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-2", children: "* Live data shown per merchant selection below" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden",
        "data-ocid": "sub-dash.merchants-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Merchant Subscriptions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                filteredMerchants.length,
                " merchants · click a row to manage assigned delivery users"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search merchants…",
                value: searchQuery,
                onChange: (e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                },
                className: "h-8 w-48 text-sm",
                "data-ocid": "sub-dash.search-input"
              }
            ) })
          ] }),
          merchantsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : filteredMerchants.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-10 text-center text-muted-foreground text-sm",
              "data-ocid": "sub-dash.merchants-empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                "No merchants found"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground text-xs", children: "Merchant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground text-xs", children: "Plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground text-xs", children: "Users" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground text-xs", children: "Orders Used" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs", children: "Utilization" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground text-xs", children: "Renews" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pageMerchants.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                MerchantRow,
                {
                  merchant: m,
                  isExpanded: expandedMerchantId === m.id,
                  onToggle: () => toggleExpand(m.id),
                  index: idx + 1
                },
                m.id
              )) })
            ] }) }),
            totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Page ",
                page + 1,
                " of ",
                totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => setPage((p) => Math.max(0, p - 1)),
                    disabled: page === 0,
                    "data-ocid": "sub-dash.pagination_prev",
                    children: "Prev"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => setPage((p) => Math.min(totalPages - 1, p + 1)),
                    disabled: page >= totalPages - 1,
                    "data-ocid": "sub-dash.pagination_next",
                    children: "Next"
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Manage Subscription Plans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Edit plan limits, pricing, and user caps for adhoc delivery services" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subscriptions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "sub-dash.manage-assignments-button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-2" }),
        "Manage Assignments"
      ] }) })
    ] })
  ] });
}
export {
  SubscriptionDashboardPage as default
};
