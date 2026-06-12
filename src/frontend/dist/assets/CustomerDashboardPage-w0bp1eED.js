import { dy as useOrdersByCustomer, a7 as useFamilyMembers, aV as usePlans, aO as useGetAllBusBookings, aP as useGetAllTrainBookings, aQ as useGetAllFlightBookings, aR as useGetAllUtilityTransactions, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { D as DashboardLinkBanner, L as LendingSection, C as CommunitySection } from "./LendingSection-DCcY51Rg.js";
import { u as useLanguageLearning } from "./useLanguageLearning-CqRAiv3Y.js";
import { B as Bus } from "./bus-D032N2K-.js";
import { T as TramFront, P as Plane } from "./tram-front-J33t6Mel.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { C as Car } from "./car-C3Ivr9eE.js";
import { W as Wrench } from "./wrench-B6FcmCok.js";
import { S as Stethoscope } from "./stethoscope-Dd6PCJkW.js";
import { P as Package } from "./package-CosknzeL.js";
import { S as ShoppingBag } from "./shopping-bag-DlKZ3RXf.js";
import { U as User } from "./user-BCyag2Xe.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { R as ResponsiveContainer, C as Cell, T as Tooltip, L as Legend } from "./generateCategoricalChart--dgqj_9a.js";
import { P as PieChart, a as Pie } from "./PieChart-nhWQW90t.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { U as UserPlus } from "./user-plus-m_STRtv4.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { A as Activity } from "./activity-RT92R42G.js";
import { S as Star } from "./star-DbleSGPY.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { H as HandCoins } from "./hand-coins-D5RW6D6g.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { B as Briefcase } from "./briefcase-CIHVnHgq.js";
import { F as Factory } from "./factory-Cr4Qe-Ze.js";
import { L as Languages } from "./languages-DcxfvxWL.js";
import { C as CreditCard } from "./credit-card-CP3NtRg6.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { H as House } from "./house-DQF9lC4w.js";
import { R as Receipt } from "./receipt-ClJm2r1y.js";
import { F as Flame } from "./flame-34E6_5Fg.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./phone-sT0WBdc4.js";
import "./map-pin-DGvTRx32.js";
import "./input-BAihtL8f.js";
import "./check-CO9wi49t.js";
import "./copy-ox5Tlh0O.js";
import "./rotate-ccw-BCahGsp7.js";
import "./indian-rupee-4FVPRNFh.js";
import "./bell-Bilc9tB3.js";
import "./circle-check-0H_z7k0M.js";
import "./triangle-alert-BhhO8CMW.js";
import "./clock-CO75OdmO.js";
import "./calendar-DOvJee1H.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
];
const Coffee = createLucideIcon("coffee", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "3", x2: "15", y1: "22", y2: "22", key: "xegly4" }],
  ["line", { x1: "4", x2: "14", y1: "9", y2: "9", key: "xcnuvu" }],
  ["path", { d: "M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18", key: "16j0yd" }],
  [
    "path",
    {
      d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5",
      key: "7cu91f"
    }
  ]
];
const Fuel = createLucideIcon("fuel", __iconNode);
const CATEGORY_COLORS = {
  Products: "#a855f7",
  Healthcare: "#ec4899",
  Travel: "#3b82f6",
  Services: "#f59e0b",
  Transport: "#06b6d4",
  Food: "#22c55e"
};
const CATEGORY_META = {
  Products: {
    icon: Package,
    color: "text-violet-500 bg-violet-100 dark:bg-violet-900/30"
  },
  Healthcare: {
    icon: Stethoscope,
    color: "text-pink-500 bg-pink-100 dark:bg-pink-900/30"
  },
  Travel: {
    icon: Car,
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
  },
  Services: {
    icon: Wrench,
    color: "text-amber-500 bg-amber-100 dark:bg-amber-900/30"
  },
  Transport: {
    icon: Car,
    color: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30"
  },
  Food: {
    icon: Coffee,
    color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"
  }
};
const TOOLTIP_STYLE = {
  background: "var(--color-card, #1e293b)",
  border: "1px solid var(--color-border, #334155)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--color-card-foreground, #f1f5f9)"
};
function ActivityStatusBadge({ status }) {
  const MAP = {
    delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    completed: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${MAP[status]}`,
      children: status
    }
  );
}
function MyLearningSection({ customerId }) {
  const ll = useLanguageLearning();
  const [enrollments, setEnrollments] = reactExports.useState([]);
  const [streak, setStreak] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    Promise.all([
      ll.getUserEnrollments(customerId).catch(() => []),
      ll.getDailyStreak(customerId).catch(() => 0)
    ]).then(([e, s]) => {
      if (cancelled) return;
      setEnrollments(e);
      setStreak(Number(s));
      setError(null);
    }).catch((err) => {
      if (cancelled) return;
      const msg = err instanceof Error ? err.message : (err == null ? void 0 : err.errorDetail) ?? "Failed to load";
      setError(msg);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [customerId, ll.getUserEnrollments, ll.getDailyStreak]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 shadow-card",
      "data-ocid": "customer.my-learning-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-violet-500" }),
            " My Learning"
          ] }),
          streak > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
              "data-ocid": "customer.my-learning.streak_badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5" }),
                streak,
                " day streak"
              ]
            }
          )
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-3",
            "data-ocid": "customer.my-learning.loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i))
          }
        ) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "py-6 text-center",
            "data-ocid": "customer.my-learning.error_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
          }
        ) : enrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-8 text-center",
            "data-ocid": "customer.my-learning.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Start learning today — browse free and paid language courses." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "gap-1.5",
                    onClick: () => {
                      window.location.href = "/language-learning";
                    },
                    "data-ocid": "customer.my-learning.browse_courses_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                      " Browse Courses"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "gap-1.5",
                    onClick: () => {
                      window.location.href = "/language-learning?create=1";
                    },
                    "data-ocid": "customer.my-learning.create_course_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                      " Create Course"
                    ]
                  }
                )
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          enrollments.slice(0, 5).map((enrollment, i) => {
            const pct = Math.min(
              100,
              Math.max(0, Number(enrollment.progressPercent))
            );
            const isComplete = pct >= 100;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-4 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors",
                "data-ocid": `customer.my-learning.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-violet-500" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: String(enrollment.courseId ?? "Course") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full bg-violet-500 rounded-full transition-all duration-300",
                          style: { width: `${pct}%` }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums text-muted-foreground flex-shrink-0", children: [
                        pct,
                        "%"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${isComplete ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"}`,
                        children: isComplete ? "Completed" : "In Progress"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "text-xs h-7 px-2.5",
                        onClick: () => {
                          window.location.href = "/my-learning";
                        },
                        "data-ocid": `customer.my-learning.resume_button.${i + 1}`,
                        children: isComplete ? "Review" : "Resume"
                      }
                    )
                  ] })
                ]
              },
              String(enrollment.courseId ?? i)
            );
          }),
          enrollments.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground pt-1", children: [
            "+",
            enrollments.length - 5,
            " more courses in",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/my-learning",
                className: "text-violet-500 hover:underline",
                children: "My Learning"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function CustomerDashboardPage() {
  const customerId = typeof window !== "undefined" ? localStorage.getItem("wc_customer_id") ?? void 0 : void 0;
  const customerPhone = typeof window !== "undefined" ? localStorage.getItem("wc_phone") ?? customerId ?? void 0 : void 0;
  const {
    data: liveOrders = [],
    isLoading: ordersLoading,
    refetch: refetchOrders,
    dataUpdatedAt
  } = useOrdersByCustomer(customerId);
  const { data: allFamilyMembers = [], isLoading: familyLoading } = useFamilyMembers();
  const { data: allPlans = [], isLoading: plansLoading } = usePlans();
  const { data: allBusRaw = [] } = useGetAllBusBookings();
  const { data: allTrainRaw = [] } = useGetAllTrainBookings();
  const { data: allFlightRaw = [] } = useGetAllFlightBookings();
  const { data: allUtilRaw = [] } = useGetAllUtilityTransactions();
  const filterByCustomer = (rows, limit) => {
    const filtered = customerId ? rows.filter(
      (r) => r.customerId === customerId || r.passengerPhone === customerPhone
    ) : rows;
    return limit ? filtered.slice(0, limit) : filtered;
  };
  const busList = filterByCustomer(
    allBusRaw,
    customerId ? void 0 : 3
  );
  const trainList = filterByCustomer(
    allTrainRaw,
    customerId ? void 0 : 3
  );
  const flightList = filterByCustomer(
    allFlightRaw,
    customerId ? void 0 : 3
  );
  const utilList = filterByCustomer(
    allUtilRaw,
    customerId ? void 0 : 10
  );
  const recentBookings = [
    ...busList.map((r) => ({
      type: "Bus",
      Icon: Bus,
      route: `${String(r.source ?? "—")} → ${String(r.destination ?? "—")}`,
      date: String(r.journeyDate ?? "—"),
      fare: Number(r.fare ?? 0),
      status: String(r.status ?? "pending"),
      ref: String(r.pnr ?? r.ticketRef ?? "—")
    })),
    ...trainList.map((r) => ({
      type: "Train",
      Icon: TramFront,
      route: `${String(r.source ?? "—")} → ${String(r.destination ?? "—")}`,
      date: String(r.journeyDate ?? "—"),
      fare: Number(r.fare ?? 0),
      status: String(r.status ?? "pending"),
      ref: String(r.pnr ?? "—")
    })),
    ...flightList.map((r) => ({
      type: "Flight",
      Icon: Plane,
      route: `${String(r.source ?? "—")} → ${String(r.destination ?? "—")}`,
      date: String(r.journeyDate ?? "—"),
      fare: Number(r.fare ?? 0),
      status: String(r.status ?? "pending"),
      ref: String(r.pnr ?? r.bookingRef ?? "—")
    }))
  ].slice(0, 5);
  const utilSummary = utilList.reduce(
    (acc, r) => {
      const svcRaw = String(r.serviceType ?? "").toLowerCase();
      const amount = Number(r.amount ?? 0);
      const cat = svcRaw.includes("recharge") ? "recharge" : svcRaw.includes("bill") ? "bill" : svcRaw.includes("fastag") || svcRaw.includes("fasttag") ? "fastag" : svcRaw.includes("lpg") || svcRaw.includes("gas") ? "lpg" : "other";
      if (!acc[cat]) acc[cat] = { count: 0, sum: 0 };
      acc[cat].count += 1;
      if (String(r.status ?? "").toLowerCase() === "success")
        acc[cat].sum += amount;
      return acc;
    },
    {}
  );
  function bookingStatusCls(s) {
    if (s === "confirmed")
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    if (s === "cancelled" || s === "failed")
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  }
  const [lastRefreshed, setLastRefreshed] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    if (dataUpdatedAt) setLastRefreshed(new Date(dataUpdatedAt));
  }, [dataUpdatedAt]);
  const familyMembers = customerPhone ? allFamilyMembers.filter(
    (m) => m.ownerPhone === customerPhone || m.relationPhone === customerPhone
  ) : [];
  const spendByCategory = (() => {
    if (liveOrders.length === 0) return [];
    const totals = {};
    for (const order of liveOrders) {
      const o = order;
      const cat = String(o.category ?? o.serviceType ?? "Products");
      const amount = Number(o.totalAmount ?? o.total ?? 0);
      totals[cat] = (totals[cat] ?? 0) + amount;
    }
    const COLORS = [
      "#a855f7",
      "#ec4899",
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#22c55e"
    ];
    return Object.entries(totals).map(([name, value], i) => ({
      name,
      value,
      color: CATEGORY_COLORS[name] ?? COLORS[i % COLORS.length]
    }));
  })();
  const totalSpent = spendByCategory.reduce((s, c) => s + c.value, 0);
  const monthSpent = (() => {
    const now = /* @__PURE__ */ new Date();
    return liveOrders.reduce((sum, order) => {
      const o = order;
      const ts = o.createdAt ? Number(o.createdAt) : 0;
      if (!ts) return sum;
      const d = new Date(ts < 1e13 ? ts * 1e3 : ts);
      if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
        return sum + Number(o.totalAmount ?? o.total ?? 0);
      }
      return sum;
    }, 0);
  })();
  const categoryOrders = (() => {
    if (liveOrders.length === 0) return [];
    const groups = {};
    for (const order of liveOrders) {
      const o = order;
      const cat = String(o.category ?? o.serviceType ?? "Products");
      const ts = o.createdAt ? Number(o.createdAt) : 0;
      if (!groups[cat]) groups[cat] = { count: 0, lastTs: 0 };
      groups[cat].count += 1;
      if (ts > groups[cat].lastTs) groups[cat].lastTs = ts;
    }
    return Object.entries(groups).map(([label, { count, lastTs }]) => {
      const meta = CATEGORY_META[label] ?? {
        icon: ShoppingBag,
        color: "text-foreground bg-muted"
      };
      const lastDate = lastTs ? new Date(lastTs < 1e13 ? lastTs * 1e3 : lastTs).toLocaleDateString(
        "en-IN",
        { month: "short", day: "numeric" }
      ) : "—";
      return { label, count, lastDate, icon: meta.icon, color: meta.color };
    });
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "role-header-customer rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-violet-600 dark:text-violet-400 text-lg", children: customerPhone ? customerPhone.slice(-2).toUpperCase() : "ME" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: customerPhone ? `Customer ${customerPhone}` : "My Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: customerId ? `ID: ${customerId}` : "Log in to see your data" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200 dark:border-violet-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 mr-1" }),
        " Customer"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DashboardLinkBanner,
      {
        dashboardUrl: `${window.location.origin}/customer-dashboard`,
        roleLabel: "Customer",
        accentClass: "border-violet-300 dark:border-violet-700/50",
        iconBgClass: "bg-violet-100 dark:bg-violet-900/30",
        iconColorClass: "text-violet-600"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "xl:col-span-1 bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "customer.expenditure-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Expenditure by Category" }),
            ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, i)) }) : spendByCategory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-8 text-center",
                "data-ocid": "customer.expenditure.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: customerId ? "No spend data yet" : "Log in to see your spend" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-violet-500 mt-1", children: [
                    "₹",
                    (totalSpent / 1e3).toFixed(1),
                    "K"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This Month" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground mt-1", children: [
                    "₹",
                    (monthSpent / 1e3).toFixed(1),
                    "K"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Pie,
                  {
                    data: spendByCategory,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 55,
                    outerRadius: 85,
                    paddingAngle: 3,
                    dataKey: "value",
                    children: spendByCategory.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    contentStyle: TOOLTIP_STYLE,
                    formatter: (v) => [
                      `₹${v.toLocaleString("en-IN")}`,
                      ""
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Legend,
                  {
                    iconType: "circle",
                    iconSize: 8,
                    formatter: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "11px" }, children: value })
                  }
                )
              ] }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "customer.category-orders",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Orders by Category" }),
            ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) }) : categoryOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-8 text-center",
                "data-ocid": "customer.category-orders.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: customerId ? "No orders yet" : "Log in to see your orders" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: categoryOrders.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/30 border border-border rounded-xl p-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors cursor-pointer",
                "data-ocid": `customer.category.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${cat.color}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(cat.icon, { className: "w-5 h-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: cat.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-0.5", children: cat.count }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "Last: ",
                    cat.lastDate
                  ] })
                ]
              },
              cat.label
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "customer.family-connections",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-violet-500" }),
                " Family Connections"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1.5 text-xs",
                  "data-ocid": "customer.family.add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                    " Add Member"
                  ]
                }
              )
            ] }),
            familyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)) }) : familyMembers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-8 text-center",
                "data-ocid": "customer.family.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: customerPhone ? "No family members connected yet" : "Log in to see your family connections" }),
                  customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "mt-3",
                      "data-ocid": "customer.family.add_first_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                        " Connect First Member"
                      ]
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: familyMembers.map((member, i) => {
              const m = member;
              const initials = String(m.relationName ?? m.ownerName ?? "?").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
              const connectedAt = m.createdAt ? new Date(
                Number(m.createdAt) < 1e13 ? Number(m.createdAt) * 1e3 : Number(m.createdAt)
              ).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric"
              }) : "";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border hover:bg-muted/50 transition-colors",
                  "data-ocid": `customer.family.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-violet-600 dark:text-violet-400", children: initials }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: String(m.relationName ?? m.ownerName ?? "Member") }),
                      connectedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "Connected since ",
                        connectedAt
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: String(m.relationship ?? "Family") })
                  ]
                },
                String(m.id ?? i)
              );
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "customer.subscriptions-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-violet-500" }),
              " Active Subscriptions"
            ] }),
            plansLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, i)) }) : allPlans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-8 text-center",
                "data-ocid": "customer.subscriptions.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active subscriptions" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: allPlans.filter((p) => {
              const pr = p;
              return !customerPhone || pr.userPhone === customerPhone || pr.phone === customerPhone;
            }).slice(0, 5).map((plan, i) => {
              const pr = plan;
              const isExpiring = String(pr.status ?? "") === "expiring";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "p-4 bg-muted/30 border border-border rounded-xl",
                  "data-ocid": `customer.subscription.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: String(pr.name ?? pr.planType ?? "Subscription") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: String(pr.price ?? pr.description ?? "") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: isExpiring ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200",
                        children: isExpiring ? "⚠ Expiring Soon" : "Active"
                      }
                    )
                  ] })
                },
                String(pr.id ?? i)
              );
            }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 shadow-card",
        "data-ocid": "customer.recent-activity",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Recent Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                "Auto-refreshes every 15s · Last",
                " ",
                lastRefreshed.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "gap-1.5 text-xs",
                onClick: () => refetchOrders(),
                "data-ocid": "customer.recent-activity.refresh_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                  " Refresh"
                ]
              }
            )
          ] }),
          ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-12 bg-muted/30 rounded-xl animate-pulse"
            },
            i
          )) }) : liveOrders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: liveOrders.slice(0, 6).map((order, i) => {
            const o = order;
            const rawStatus = String(o.status ?? "pending");
            const validStatuses = [
              "delivered",
              "confirmed",
              "pending",
              "completed"
            ];
            const safeStatus = validStatuses.includes(rawStatus) ? rawStatus : "pending";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-4 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors",
                "data-ocid": `customer.activity.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: String(o.merchantName ?? o.merchantId ?? "Order") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      o.createdAt ? new Date(Number(o.createdAt)).toLocaleDateString(
                        "en-IN"
                      ) : "—",
                      " ",
                      "·",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: String(o.id ?? "").slice(0, 12) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground tabular-nums", children: [
                      "₹",
                      Number(o.totalAmount ?? o.total ?? 0).toLocaleString(
                        "en-IN"
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityStatusBadge, { status: safeStatus })
                  ] })
                ]
              },
              String(o.id ?? i)
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-8 text-center",
              "data-ocid": "customer.recent-activity.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: customerId ? "No orders yet" : "Log in to see your live orders" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 shadow-card",
        "data-ocid": "customer.lending-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-4 h-4 text-violet-500" }),
            " My Lending"
          ] }),
          customerId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            LendingSection,
            {
              phone: customerId,
              showMarkReturned: true,
              accentClass: "bg-violet-50/40 dark:bg-violet-950/20"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Log in to see your lending items." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 shadow-card",
        "data-ocid": "customer.services-panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 text-violet-500" }),
            " Services & More"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-5", children: [
            { label: "Shop", icon: ShoppingBag, to: "/marketplace" },
            { label: "Healthcare", icon: Stethoscope, to: "/healthcare" },
            { label: "Travel", icon: Plane, to: "/tours" },
            {
              label: "Professional",
              icon: Briefcase,
              to: "/professional-services"
            },
            {
              label: "Mfr. Products",
              icon: Factory,
              to: "/merchant-manufacturer-products"
            },
            {
              label: "Learn Language",
              icon: Languages,
              to: "/language-learning"
            },
            {
              label: "Book Transport",
              icon: Bus,
              to: "/customer/transport-booking"
            },
            {
              label: "Bill Payments",
              icon: CreditCard,
              to: "/customer/bill-payments"
            },
            { label: "Old Items", icon: Package, to: "/marketplace" },
            { label: "Blogs", icon: BookOpen, to: "/blogs" },
            { label: "Jobs", icon: Briefcase, to: "/jobs" },
            { label: "Properties", icon: House, to: "/property-listings" }
          ].map(({ label, icon: Icon, to }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              className: "flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 hover:bg-accent/60 border border-transparent hover:border-border transition-all duration-200 group",
              "data-ocid": `customer.service-tile.${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-center text-muted-foreground group-hover:text-foreground leading-tight font-medium", children: label })
              ]
            },
            label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
            { label: "Recipes", to: "/recipes" },
            { label: "Lending", to: "/lending" },
            { label: "Donations", to: "/donations" },
            { label: "Family Group", to: "/family" },
            { label: "Support Tickets", to: "/support-tickets" },
            { label: "Matrimony", to: "/matrimony" },
            { label: "Community", to: "/community" }
          ].map(({ label, to }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to,
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 hover:bg-accent border border-border/50 hover:border-border text-muted-foreground hover:text-foreground transition-all duration-200",
              "data-ocid": `customer.service-pill.${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
              children: label
            },
            label
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 shadow-card",
        "data-ocid": "customer.community-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-violet-500" }),
            " Nearby Community"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySection, { city: "Gandhidham", maxItems: 5 })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MyLearningSection, { customerId }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 shadow-card",
        "data-ocid": "customer.bookings-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-4 h-4 text-violet-500" }),
            " My Bookings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [
            {
              label: "Bus Bookings",
              count: busList.length,
              Icon: Bus,
              color: "text-blue-600",
              bg: "bg-blue-100 dark:bg-blue-900/30"
            },
            {
              label: "Train Bookings",
              count: trainList.length,
              Icon: TramFront,
              color: "text-emerald-600",
              bg: "bg-emerald-100 dark:bg-emerald-900/30"
            },
            {
              label: "Flight Bookings",
              count: flightList.length,
              Icon: Plane,
              color: "text-violet-600",
              bg: "bg-violet-100 dark:bg-violet-900/30"
            }
          ].map(({ label, count, Icon, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-muted/30 border border-border rounded-xl p-3 flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${color}` })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold tabular-nums ${color}`, children: count }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
                ] })
              ]
            },
            label
          )) }),
          recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-8 text-center",
              "data-ocid": "customer.bookings.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No bookings yet. Book your first bus, train, or flight from the chatbot!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: [
              "Type",
              "Route",
              "Date",
              "Fare",
              "Status",
              "Ticket/PNR"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentBookings.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/40 hover:bg-muted/20 transition-colors",
                "data-ocid": `customer.bookings.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(b.Icon, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: b.type })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground max-w-[160px] truncate", children: b.route }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground whitespace-nowrap", children: b.date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 tabular-nums font-semibold text-foreground", children: [
                    "₹",
                    b.fare.toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${bookingStatusCls(b.status)}`,
                      children: b.status
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-muted-foreground", children: b.ref })
                ]
              },
              `${b.type}-${b.ref}-${b.date}`
            )) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 shadow-card",
        "data-ocid": "customer.payment-history",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-violet-500" }),
            " Payment History"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4", children: [
            {
              key: "recharge",
              label: "Mobile Recharges",
              Icon: Receipt,
              color: "text-blue-600",
              bg: "bg-blue-100 dark:bg-blue-900/30"
            },
            {
              key: "bill",
              label: "Bills Paid",
              Icon: Receipt,
              color: "text-emerald-600",
              bg: "bg-emerald-100 dark:bg-emerald-900/30"
            },
            {
              key: "fastag",
              label: "FastTag",
              Icon: Fuel,
              color: "text-amber-600",
              bg: "bg-amber-100 dark:bg-amber-900/30"
            },
            {
              key: "lpg",
              label: "LPG",
              Icon: Fuel,
              color: "text-orange-600",
              bg: "bg-orange-100 dark:bg-orange-900/30"
            }
          ].map(({ key, label, Icon, color, bg }) => {
            const d = utilSummary[key] ?? { count: 0, sum: 0 };
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/30 border border-border rounded-xl p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${bg}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-bold tabular-nums ${color}`, children: d.count }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label }),
                  d.sum > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mt-0.5", children: [
                    "₹",
                    d.sum.toLocaleString("en-IN")
                  ] })
                ]
              },
              key
            );
          }) }),
          utilList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-8 text-center",
              "data-ocid": "customer.payment-history.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No payment history yet. Recharge or pay bills from the chatbot!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: utilList.slice(0, 10).map((t, i) => {
            const r = t;
            const st = String(r.status ?? "pending").toLowerCase();
            const statusCls = st === "success" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : st === "failed" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors",
                "data-ocid": `customer.payment-history.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: String(r.operatorName ?? r.serviceType ?? "Payment") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      String(r.consumerNumber ?? ""),
                      " ·",
                      " ",
                      r.createdAt ? new Date(Number(r.createdAt)).toLocaleDateString(
                        "en-IN"
                      ) : "—"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold tabular-nums text-foreground", children: [
                      "₹",
                      Number(r.amount ?? 0).toLocaleString("en-IN")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${statusCls}`,
                        children: String(r.status ?? "pending")
                      }
                    )
                  ] })
                ]
              },
              String(r.id ?? i)
            );
          }) })
        ]
      }
    )
  ] });
}
export {
  CustomerDashboardPage as default
};
