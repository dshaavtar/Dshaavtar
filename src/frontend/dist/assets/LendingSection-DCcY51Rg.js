import { dh as useGetCommunityMembersByCity, j as jsxRuntimeExports, L as Link, r as reactExports, di as useGetLendingItemsByLender, dj as useGetLendingItemsByBorrower, dk as useTriggerLendingReminder, dl as useUpdateLendingStatus, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { C as Check } from "./check-CO9wi49t.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
import { H as HandCoins } from "./hand-coins-D5RW6D6g.js";
import { R as RotateCcw } from "./rotate-ccw-BCahGsp7.js";
import { P as Package } from "./package-CosknzeL.js";
import { I as IndianRupee } from "./indian-rupee-4FVPRNFh.js";
import { B as Bell } from "./bell-Bilc9tB3.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode);
function CommunitySection({
  city,
  maxItems = 10,
  accentClass = ""
}) {
  const { data: members = [], isLoading } = useGetCommunityMembersByCity(city);
  const displayed = members.slice(0, maxItems);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "community.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: city ? `Community — ${city}` : "Community" }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: members.length })
      ] }),
      members.length > maxItems && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/community",
          className: "text-xs text-primary hover:underline",
          "data-ocid": "community.view-all_link",
          children: "View All"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, k)) }) : displayed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-6 text-muted-foreground text-sm",
        "data-ocid": "community.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 mx-auto mb-1 opacity-30" }),
          "No community members found for this city"
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: displayed.map((m, idx) => {
      var _a, _b;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/40 transition-colors ${accentClass}`,
          "data-ocid": `community.member.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: ((_b = (_a = m.name) == null ? void 0 : _a.charAt(0)) == null ? void 0 : _b.toUpperCase()) ?? "?" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: m.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                  " ",
                  m.phone
                ] }),
                m.apartmentName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 truncate", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                  " ",
                  m.apartmentName
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 shrink-0", children: m.roles.slice(0, 2).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] px-1.5 py-0.5",
                children: r
              },
              r
            )) })
          ]
        },
        m.phone
      );
    }) })
  ] });
}
function DashboardLinkBanner({
  dashboardUrl,
  roleLabel,
  accentClass = "border-primary/30 dark:border-primary/20",
  iconBgClass = "bg-primary/10 dark:bg-primary/20",
  iconColorClass = "text-primary"
}) {
  const [copied, setCopied] = reactExports.useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(dashboardUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border ${accentClass} rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3`,
      "data-ocid": "dashboard.link-banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-7 h-7 rounded-lg ${iconBgClass} flex items-center justify-center`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: `w-3.5 h-3.5 ${iconColorClass}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
              "Your ",
              roleLabel,
              " Dashboard Link"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Share this link to open your dashboard directly" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              readOnly: true,
              value: dashboardUrl,
              className: "h-8 text-xs font-mono bg-muted/40 border-input cursor-text select-all min-w-0",
              onFocus: (e) => e.target.select(),
              "data-ocid": "dashboard.link-banner.url_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 flex-shrink-0 gap-1.5 text-xs min-w-[88px] transition-colors",
              onClick: handleCopy,
              "data-ocid": "dashboard.link-banner.copy_button",
              children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-success" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "Copied!" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                "Copy Link"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function daysUntil(returnDateBigInt) {
  const returnMs = Number(returnDateBigInt);
  const nowMs = Date.now();
  return Math.ceil((returnMs - nowMs) / (1e3 * 60 * 60 * 24));
}
function returnDateLabel(returnDateBigInt) {
  return new Date(Number(returnDateBigInt)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function LendingStatusBadge({ status }) {
  const map = {
    active: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    returned: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    disputed: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${map[status] ?? "bg-muted text-muted-foreground"}`,
      children: status
    }
  );
}
function CountdownBadge({ days }) {
  if (days < 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-destructive font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
      " ",
      Math.abs(days),
      "d overdue"
    ] });
  if (days === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-orange-600 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      " Due today"
    ] });
  if (days <= 7)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-amber-600 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      " ",
      days,
      "d left"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
    " ",
    days,
    "d left"
  ] });
}
function LentItemRow({ item, idx }) {
  const triggerReminder = useTriggerLendingReminder();
  const days = daysUntil(item.returnDate);
  async function handleRemind() {
    try {
      await triggerReminder.mutateAsync(item.id);
      ue.success("Reminder sent to both parties");
    } catch {
      ue.error("Failed to send reminder");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-3 bg-muted/20 border border-border rounded-xl",
      "data-ocid": `lending.lent.item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground truncate", children: item.itemName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LendingStatusBadge, { status: item.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownBadge, { days })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
            "Borrower:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: item.borrowerPhone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Return: ",
              returnDateLabel(item.returnDate)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3 h-3" }),
              item.charge
            ] }),
            item.reminderFrequency && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: item.reminderFrequency })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1 text-xs shrink-0",
            onClick: handleRemind,
            disabled: triggerReminder.isPending,
            "data-ocid": `lending.lent.remind.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3.5 h-3.5" }),
              " Remind"
            ]
          }
        )
      ]
    }
  );
}
function BorrowedItemRow({
  item,
  idx,
  showMarkReturned
}) {
  const updateStatus = useUpdateLendingStatus();
  const days = daysUntil(item.returnDate);
  async function handleMarkReturned() {
    try {
      await updateStatus.mutateAsync({ id: item.id, status: "returned" });
      ue.success("Item marked as returned");
    } catch {
      ue.error("Failed to update status");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-3 bg-muted/20 border border-border rounded-xl",
      "data-ocid": `lending.borrowed.item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground truncate", children: item.itemName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LendingStatusBadge, { status: item.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownBadge, { days })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
            "Lender:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: item.lenderPhone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Return by: ",
              returnDateLabel(item.returnDate)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3 h-3" }),
              item.charge,
              " owed"
            ] })
          ] })
        ] }),
        showMarkReturned && item.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1 text-xs shrink-0 border-emerald-400 text-emerald-600 hover:bg-emerald-50",
            onClick: handleMarkReturned,
            disabled: updateStatus.isPending,
            "data-ocid": `lending.borrowed.return.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
              " Returned"
            ]
          }
        )
      ]
    }
  );
}
function LendingSummary({
  lentItems,
  accentClass
}) {
  const totalLent = lentItems.length;
  const activeLent = lentItems.filter((i) => i.status === "active").length;
  const overdueLent = lentItems.filter(
    (i) => i.status === "overdue" || daysUntil(i.returnDate) < 0
  ).length;
  const chargePending = lentItems.filter((i) => i.status === "active").reduce((s, i) => s + i.charge, 0);
  const stats = [
    { label: "Total Lent", value: totalLent },
    { label: "Active", value: activeLent },
    { label: "Overdue", value: overdueLent },
    { label: "Charge Pending", value: `₹${chargePending}` }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border border-border p-3 text-center ${accentClass}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground mt-0.5", children: s.value })
      ]
    },
    s.label
  )) });
}
function LendingSection({
  phone,
  showMarkReturned,
  accentClass = "bg-card"
}) {
  const { data: lentItems = [], isLoading: lentLoading } = useGetLendingItemsByLender(phone);
  const { data: borrowedItems = [], isLoading: borrowedLoading } = useGetLendingItemsByBorrower(phone);
  const isLoading = lentLoading || borrowedLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "lending.section", children: [
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LendingSummary, { lentItems, accentClass }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-4 h-4 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "Items Lent Out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: lentItems.length })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }) : lentItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-6 text-muted-foreground text-sm",
          "data-ocid": "lending.lent.empty_state",
          children: "No items lent out"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: lentItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(LentItemRow, { item, idx }, item.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 text-violet-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "Items Borrowed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: borrowedItems.length })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }) : borrowedItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-6 text-muted-foreground text-sm",
          "data-ocid": "lending.borrowed.empty_state",
          children: "No items borrowed"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: borrowedItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        BorrowedItemRow,
        {
          item,
          idx,
          showMarkReturned
        },
        item.id
      )) })
    ] })
  ] });
}
export {
  CommunitySection as C,
  DashboardLinkBanner as D,
  LendingSection as L
};
