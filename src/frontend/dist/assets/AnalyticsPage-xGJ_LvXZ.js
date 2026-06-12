import { r as reactExports, k as useDashboardStats, o as useMonthlyStats, l as useTopMerchants, aI as useEnhancedAnalytics, aJ as useMerchantAnalytics, aK as useDPAnalytics, D as useMerchants, aL as useFlowAgentSummary, aM as useBotLogs, aN as useGetScriptRunResults, aO as useGetAllBusBookings, aP as useGetAllTrainBookings, aQ as useGetAllFlightBookings, aR as useGetAllUtilityTransactions, aS as useGetAllPaySprintAPILogs, j as jsxRuntimeExports, aT as useGetAllLendingItems, aU as useGetLendingItemsDueSoon } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as StatCard } from "./StatCard-DTRGtXU8.js";
import { s as safeCount } from "./utils-BlceAbYT.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { B as Bot } from "./bot-egkDiXjP.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as ChevronLeft } from "./chevron-left-DzxTPwXv.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { C as ChartColumn } from "./chart-column-1UICj-Tf.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { S as Store } from "./store-CaCzKt5a.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { C as CreditCard } from "./credit-card-CP3NtRg6.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { I as IndianRupee } from "./indian-rupee-4FVPRNFh.js";
import { R as ResponsiveContainer, C as Cell, T as Tooltip, B as Bar, L as Legend } from "./generateCategoricalChart--dgqj_9a.js";
import { P as PieChart, a as Pie } from "./PieChart-nhWQW90t.js";
import { B as BarChart } from "./BarChart-fezhxBKo.js";
import { C as CartesianGrid, X as XAxis, Y as YAxis } from "./YAxis-BEF0I4n4.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { A as ArrowUpRight } from "./arrow-up-right-tXBfpouL.js";
import { S as Star } from "./star-DbleSGPY.js";
import { A as Activity } from "./activity-RT92R42G.js";
import { T as Terminal } from "./terminal-D73Q7VO6.js";
import { P as Package } from "./package-CosknzeL.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./minus-BPUUsZPQ.js";
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
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "1uw2ng" }]
];
const HeartPulse = createLucideIcon("heart-pulse", __iconNode);
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const TOOLTIP_STYLE = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  fontSize: 12
};
function LendingAnalyticsTab() {
  const { data: allItems = [], isLoading } = useGetAllLendingItems();
  const { data: dueSoon = [] } = useGetLendingItemsDueSoon();
  const active = allItems.filter((i) => i.status === "active").length;
  const overdue = allItems.filter((i) => i.status === "overdue").length;
  const returned = allItems.filter((i) => i.status === "returned").length;
  const categoryMap = allItems.reduce((acc, item) => {
    const k = item.itemCategory || "other";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value
  }));
  const freqMap = allItems.reduce((acc, item) => {
    const k = item.reminderFrequency || "monthly";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  const freqData = Object.entries(freqMap).map(([name, count]) => ({
    name,
    count
  }));
  const lenderMap = allItems.reduce((acc, item) => {
    if (item.status === "active")
      acc[item.lenderPhone] = (acc[item.lenderPhone] ?? 0) + 1;
    return acc;
  }, {});
  const topLenders = Object.entries(lenderMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const borrowerMap = allItems.reduce((acc, item) => {
    if (item.status === "active")
      acc[item.borrowerPhone] = (acc[item.borrowerPhone] ?? 0) + 1;
    return acc;
  }, {});
  const topBorrowers = Object.entries(borrowerMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#a855f7",
    "#ef4444",
    "#0ea5e9"
  ];
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "analytics.lending", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Total Items",
        value: allItems.length,
        color: "bg-primary/10 text-primary"
      },
      {
        label: "Active",
        value: active,
        color: "bg-emerald-100 text-emerald-700"
      },
      {
        label: "Overdue",
        value: overdue,
        color: "bg-red-100 text-red-700"
      },
      {
        label: "Due Soon (7d)",
        value: dueSoon.length,
        color: "bg-amber-100 text-amber-700"
      },
      {
        label: "Returned",
        value: returned,
        color: "bg-blue-100 text-blue-700"
      }
    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 shadow-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-2xl font-bold tabular-nums ${color.split(" ")[1]}`,
              children: value
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Items by Category" }),
        categoryData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-8", children: "No data yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: categoryData,
              dataKey: "value",
              nameKey: "name",
              cx: "50%",
              cy: "50%",
              outerRadius: 70,
              label: ({ name, value }) => `${name} (${value})`,
              children: categoryData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: COLORS[categoryData.indexOf(entry) % COLORS.length]
                },
                entry.name
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TOOLTIP_STYLE })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Reminder Frequency Distribution" }),
        freqData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-8", children: "No data yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: freqData,
            margin: { top: 8, right: 8, left: -20, bottom: 4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "var(--color-border)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { allowDecimals: false, tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TOOLTIP_STYLE }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "#f59e0b", radius: [4, 4, 0, 0] })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Top Lenders (Active)" }),
        topLenders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-4", children: "No active loans yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topLenders.map(([phone, count], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-5 text-right", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-xs font-mono truncate", children: phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold tabular-nums", children: [
            count,
            " item",
            count !== 1 ? "s" : ""
          ] })
        ] }, phone)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Top Borrowers (Active)" }),
        topBorrowers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-4", children: "No active borrows yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topBorrowers.map(([phone, count], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-5 text-right", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-xs font-mono truncate", children: phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold tabular-nums", children: [
            count,
            " item",
            count !== 1 ? "s" : ""
          ] })
        ] }, phone)) })
      ] })
    ] })
  ] });
}
const ORDER_STATUS_COLORS = {
  completed: "#22c55e",
  accepted: "#a855f7"
};
function exportCSV(topMerchants) {
  const header = "Merchant Name,Orders,Revenue,Avg Rating\n";
  const rows = topMerchants.map(
    (m) => `"${m.merchantName}",${m.orderCount},${m.revenue},${m.avgRating}`
  ).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "merchant-analytics.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  color = "text-primary"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subtitle })
    ] })
  ] });
}
function EmptyState({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "py-8 text-center text-sm text-muted-foreground",
      "data-ocid": "analytics.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
        label
      ]
    }
  );
}
function PaymentServicesTab({
  busBookingsRaw,
  trainBookingsRaw,
  flightBookingsRaw,
  utilTxnsRaw,
  apiLogsRaw
}) {
  const totalBookings = busBookingsRaw.length + trainBookingsRaw.length + flightBookingsRaw.length;
  const totalTxns = utilTxnsRaw.length;
  const totalRevenue = [...busBookingsRaw, ...trainBookingsRaw, ...flightBookingsRaw].reduce(
    (s, r) => s + Number(r.fare ?? 0),
    0
  ) + utilTxnsRaw.reduce((s, r) => s + Number(r.amount ?? 0), 0);
  const successCount = [
    ...busBookingsRaw,
    ...trainBookingsRaw,
    ...flightBookingsRaw,
    ...utilTxnsRaw
  ].filter((r) => {
    const st = String(r.status ?? r.paymentStatus ?? "").toLowerCase();
    return st === "confirmed" || st === "success";
  }).length;
  const totalAll = totalBookings + totalTxns;
  const successRate = totalAll > 0 ? Math.round(successCount / totalAll * 100) : 0;
  const bookingBarData = [
    {
      name: "Bus",
      count: busBookingsRaw.length,
      revenue: busBookingsRaw.reduce((s, r) => s + Number(r.fare ?? 0), 0)
    },
    {
      name: "Train",
      count: trainBookingsRaw.length,
      revenue: trainBookingsRaw.reduce((s, r) => s + Number(r.fare ?? 0), 0)
    },
    {
      name: "Flight",
      count: flightBookingsRaw.length,
      revenue: flightBookingsRaw.reduce((s, r) => s + Number(r.fare ?? 0), 0)
    }
  ];
  const utilBreak = {};
  for (const r of utilTxnsRaw) {
    const svc = String(r.serviceType ?? "other");
    if (!utilBreak[svc]) utilBreak[svc] = { count: 0, sum: 0 };
    utilBreak[svc].count += 1;
    utilBreak[svc].sum += Number(r.amount ?? 0);
  }
  const utilBarData = Object.entries(utilBreak).map(([name, d]) => ({
    name,
    count: d.count,
    amount: d.sum
  }));
  const statusCount = {};
  for (const r of [
    ...busBookingsRaw,
    ...trainBookingsRaw,
    ...flightBookingsRaw,
    ...utilTxnsRaw
  ]) {
    const s = String(r.status ?? r.paymentStatus ?? "pending");
    statusCount[s] = (statusCount[s] ?? 0) + 1;
  }
  const statusDonut = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value
  }));
  const DONUT_COLORS = {
    confirmed: "#22c55e",
    success: "#22c55e",
    pending: "#f59e0b",
    failed: "#ef4444",
    cancelled: "#ef4444",
    refunded: "#3b82f6"
  };
  const recent = [
    ...busBookingsRaw.map((r) => ({
      type: "Bus",
      route: `${String(r.source ?? "")} → ${String(r.destination ?? "")}`,
      customer: String(r.customerId ?? r.passengerPhone ?? "—").slice(0, 12),
      amount: `₹${Number(r.fare ?? 0).toLocaleString("en-IN")}`,
      status: String(r.status ?? "pending"),
      date: r.createdAt ? new Date(Number(r.createdAt)).toLocaleDateString("en-IN") : "—"
    })),
    ...trainBookingsRaw.map((r) => ({
      type: "Train",
      route: `${String(r.source ?? "")} → ${String(r.destination ?? "")}`,
      customer: String(r.customerId ?? "—").slice(0, 12),
      amount: `₹${Number(r.fare ?? 0).toLocaleString("en-IN")}`,
      status: String(r.status ?? "pending"),
      date: r.createdAt ? new Date(Number(r.createdAt)).toLocaleDateString("en-IN") : "—"
    })),
    ...flightBookingsRaw.map((r) => ({
      type: "Flight",
      route: `${String(r.source ?? "")} → ${String(r.destination ?? "")}`,
      customer: String(r.customerId ?? "—").slice(0, 12),
      amount: `₹${Number(r.fare ?? 0).toLocaleString("en-IN")}`,
      status: String(r.status ?? "pending"),
      date: r.createdAt ? new Date(Number(r.createdAt)).toLocaleDateString("en-IN") : "—"
    }))
  ].slice(0, 10);
  const healthMap = {};
  for (const l of apiLogsRaw) {
    const svc = String(l.serviceType ?? "unknown");
    if (!healthMap[svc])
      healthMap[svc] = {
        total: 0,
        success: 0,
        errors: 0,
        latencies: [],
        lastTs: 0
      };
    healthMap[svc].total += 1;
    if (l.isError) healthMap[svc].errors += 1;
    else healthMap[svc].success += 1;
    if (l.latencyMs != null) healthMap[svc].latencies.push(Number(l.latencyMs));
    const ts = Number(l.createdAt ?? 0);
    if (ts > healthMap[svc].lastTs) healthMap[svc].lastTs = ts;
  }
  const healthRows = Object.entries(healthMap).map(([svc, d]) => ({
    svc,
    total: d.total,
    success: d.success,
    errors: d.errors,
    avgLatency: d.latencies.length ? Math.round(d.latencies.reduce((a, b) => a + b, 0) / d.latencies.length) : 0,
    lastCalled: d.lastTs ? new Date(d.lastTs).toLocaleString("en-IN") : "—"
  }));
  if (totalAll === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-8 text-center",
        "data-ocid": "analytics.payments.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No PaySprint transactions yet. Configure credentials in PaySprint API settings and start taking bookings!" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "analytics.payments", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      {
        label: "Total Bookings",
        value: String(totalBookings),
        color: "text-blue-600"
      },
      {
        label: "Total Transactions",
        value: String(totalTxns),
        color: "text-violet-600"
      },
      {
        label: "Total Revenue",
        value: `₹${(totalRevenue / 1e3).toFixed(1)}K`,
        color: "text-emerald-600"
      },
      {
        label: "Success Rate",
        value: `${successRate}%`,
        color: successRate >= 80 ? "text-emerald-600" : successRate >= 50 ? "text-amber-600" : "text-red-500"
      }
    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 shadow-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold tabular-nums ${color}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: ChartColumn,
            title: "Bookings by Type",
            subtitle: "Count and revenue"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: bookingBarData,
            margin: { top: 0, right: 8, left: -16, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "var(--color-border)",
                  vertical: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "name",
                  tick: { fontSize: 11 },
                  tickLine: false,
                  axisLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 11 },
                  tickLine: false,
                  axisLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: TOOLTIP_STYLE,
                  formatter: (v, n) => [
                    n === "revenue" ? `₹${v.toLocaleString("en-IN")}` : v,
                    n
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { iconSize: 8 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "count",
                  name: "Count",
                  fill: "oklch(0.55 0.17 250)",
                  radius: [4, 4, 0, 0]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "revenue",
                  name: "Revenue",
                  fill: "oklch(0.65 0.17 148)",
                  radius: [4, 4, 0, 0]
                }
              )
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: Activity,
            title: "Utility Payments",
            subtitle: "By service category"
          }
        ),
        utilBarData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "No utility transactions yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: utilBarData,
            margin: { top: 0, right: 8, left: -16, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "var(--color-border)",
                  vertical: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "name",
                  tick: { fontSize: 10 },
                  tickLine: false,
                  axisLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 11 },
                  tickLine: false,
                  axisLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: TOOLTIP_STYLE,
                  formatter: (v, n) => [
                    n === "amount" ? `₹${v.toLocaleString("en-IN")}` : v,
                    n
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { iconSize: 8 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "count",
                  name: "Count",
                  fill: "oklch(0.62 0.17 200)",
                  radius: [4, 4, 0, 0]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "amount",
                  name: "Amount",
                  fill: "oklch(0.65 0.2 55)",
                  radius: [4, 4, 0, 0]
                }
              )
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: TrendingUp, title: "Transaction Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: statusDonut,
              cx: "50%",
              cy: "50%",
              innerRadius: 55,
              outerRadius: 80,
              paddingAngle: 3,
              dataKey: "value",
              children: statusDonut.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: DONUT_COLORS[entry.name.toLowerCase()] ?? "#94a3b8"
                },
                entry.name
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TOOLTIP_STYLE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Legend,
            {
              iconType: "circle",
              iconSize: 8,
              formatter: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "11px" }, children: v })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Recent Bookings (Last 10)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: [
            "Type",
            "Route",
            "Customer",
            "Amount",
            "Status",
            "Date"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 6,
              className: "px-4 py-6 text-center text-xs text-muted-foreground",
              "data-ocid": "analytics.payments.recent.empty_state",
              children: "No bookings yet"
            }
          ) }) : recent.map((b, i) => {
            const sCls = b.status.toLowerCase() === "confirmed" || b.status.toLowerCase() === "success" ? "bg-emerald-100 text-emerald-700" : b.status.toLowerCase() === "failed" || b.status.toLowerCase() === "cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/40 hover:bg-muted/20",
                "data-ocid": `analytics.payments.booking.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium text-foreground", children: b.type }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 max-w-[120px] truncate text-foreground", children: b.route }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-muted-foreground", children: b.customer }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 tabular-nums font-semibold", children: b.amount }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${sCls}`,
                      children: b.status
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground whitespace-nowrap", children: b.date })
                ]
              },
              `${b.type}-${b.route}-${b.date}`
            );
          }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden",
        "data-ocid": "analytics.payments.service-health",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "PaySprint Service Health" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "API statistics grouped by service type" })
          ] }),
          healthRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "No API logs yet. Logs appear after PaySprint API calls are made." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: [
              "Service",
              "Total Calls",
              "Success",
              "Errors",
              "Avg Latency",
              "Last Called"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-4 py-2.5 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: healthRows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/40 hover:bg-muted/20",
                "data-ocid": `analytics.payments.health.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground", children: row.svc }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 tabular-nums", children: row.total }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 tabular-nums text-emerald-600", children: row.success }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: row.errors > 0 ? "text-red-500 font-semibold" : "text-muted-foreground",
                      children: row.errors
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 tabular-nums text-muted-foreground", children: [
                    row.avgLatency,
                    "ms"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground whitespace-nowrap", children: row.lastCalled })
                ]
              },
              row.svc
            )) })
          ] }) })
        ]
      }
    )
  ] });
}
function AnalyticsPage() {
  var _a, _b, _c;
  const now = /* @__PURE__ */ new Date();
  const [year, setYear] = reactExports.useState(now.getFullYear());
  const [month, setMonth] = reactExports.useState(now.getMonth());
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [merchantSearch, setMerchantSearch] = reactExports.useState("");
  const [sortKey, setSortKey] = reactExports.useState("orders");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats
  } = useDashboardStats();
  const { data: monthlyStats = [], isLoading: monthlyLoading } = useMonthlyStats(year, month + 1);
  const { data: topMerchants = [], isLoading: merchantsLoading } = useTopMerchants(10);
  const { data: enhancedData } = useEnhancedAnalytics();
  const { data: merchantAnalytics } = useMerchantAnalytics(
    merchantSearch || "m1"
  );
  const { data: dpAnalytics } = useDPAnalytics("dp1");
  const { data: allMerchants = [] } = useMerchants();
  const { data: flowSummary, isLoading: flowSummaryLoading } = useFlowAgentSummary();
  const { data: waLogs = [] } = useBotLogs();
  const { data: tgLogs = [] } = useBotLogs();
  const { data: smsLogs = [] } = useBotLogs();
  const { data: scriptResults = [] } = useGetScriptRunResults();
  const { data: busBookingsRaw = [] } = useGetAllBusBookings();
  const { data: trainBookingsRaw = [] } = useGetAllTrainBookings();
  const { data: flightBookingsRaw = [] } = useGetAllFlightBookings();
  const { data: utilTxnsRaw = [] } = useGetAllUtilityTransactions();
  const { data: apiLogsRaw = [] } = useGetAllPaySprintAPILogs();
  const botActivity = reactExports.useMemo(() => {
    const now24h = Date.now() - 864e5;
    function countChannel(logs) {
      const recent = logs.filter((l) => l.timestamp > now24h);
      return {
        total: recent.length,
        errors: recent.filter((l) => l.status === "error").length
      };
    }
    return [
      {
        channel: "WhatsApp",
        icon: MessageSquare,
        color: "text-emerald-500",
        bg: "bg-emerald-100",
        ...countChannel(waLogs)
      },
      {
        channel: "Telegram",
        icon: Bot,
        color: "text-blue-500",
        bg: "bg-blue-100",
        ...countChannel(tgLogs)
      },
      {
        channel: "SMS",
        icon: MessageSquare,
        color: "text-purple-500",
        bg: "bg-purple-100",
        ...countChannel(smsLogs)
      }
    ];
  }, [waLogs, tgLogs, smsLogs]);
  const scriptSummary = reactExports.useMemo(() => {
    if (!scriptResults.length) return null;
    const totalRuns = scriptResults.length;
    const passedRuns = scriptResults.filter(
      (r) => r.overallResult === "passed"
    ).length;
    const passRate = Math.round(passedRuns / totalRuns * 100);
    const lastRun = scriptResults[0] ? new Date(scriptResults[0].ranAt).toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short"
    }) : "—";
    return { totalRuns, passRate, lastRun };
  }, [scriptResults]);
  const orderStatusData = reactExports.useMemo(() => {
    if (!stats) return [];
    const total = Number(stats.totalOrders ?? 0);
    const active = Number(stats.activeOrders ?? 0);
    const completed = Math.max(0, total - active);
    if (total === 0) return [];
    return [
      {
        name: "Completed",
        value: completed,
        color: ORDER_STATUS_COLORS.completed
      },
      { name: "Active", value: active, color: ORDER_STATUS_COLORS.accepted }
    ];
  }, [stats]);
  const top5Merchants = reactExports.useMemo(
    () => [...allMerchants].sort((a, b) => Number(b.orderCount ?? 0) - Number(a.orderCount ?? 0)).slice(0, 5),
    [allMerchants]
  );
  const top5MaxOrders = top5Merchants.length ? Number(top5Merchants[0].orderCount ?? 0) || 1 : 1;
  const totalMonthlyOrders = monthlyStats.reduce((s, d) => s + d.orderCount, 0);
  const totalMonthlyRevenue = monthlyStats.reduce((s, d) => s + d.revenue, 0);
  const dailyData = monthlyStats.map((d) => ({
    day: d.day,
    orders: d.orderCount,
    revenue: d.revenue
  }));
  const sortedTopMerchants = reactExports.useMemo(() => {
    return [...topMerchants].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      return sortDir === "desc" ? bv - av : av - bv;
    });
  }, [topMerchants, sortKey, sortDir]);
  function handleSort(key) {
    if (sortKey === key) setSortDir((d) => d === "desc" ? "asc" : "desc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }
  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  }
  function nextMonth() {
    const isCurrent = year === now.getFullYear() && month === now.getMonth();
    if (isCurrent) return;
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  }
  const dailyActiveUsers = (enhancedData == null ? void 0 : enhancedData.dailyActiveUsers) ?? safeCount(stats == null ? void 0 : stats.totalUsers);
  const TABS = [
    { key: "overview", label: "Overview", icon: ChartColumn },
    { key: "services", label: "Service Modules", icon: HeartPulse },
    { key: "bookings", label: "Bookings", icon: Calendar },
    { key: "merchant", label: "Merchants", icon: Store },
    { key: "dp", label: "Delivery", icon: Truck },
    { key: "flows", label: "Flows & Bots", icon: Bot },
    { key: "lending", label: "Lending", icon: TrendingUp },
    { key: "payments", label: "Payment Services", icon: CreditCard }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Live performance across all modules" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => refetchStats(),
            className: "gap-1.5",
            "data-ocid": "analytics.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
              " Refresh"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: prevMonth,
              className: "p-1 hover:bg-muted rounded transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground w-28 text-center tabular-nums", children: [
            MONTHS[month],
            " ",
            year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: nextMonth,
              disabled: year === now.getFullYear() && month === now.getMonth(),
              className: "p-1 hover:bg-muted rounded transition-colors disabled:opacity-30",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 bg-muted/40 p-1 rounded-xl border border-border flex-wrap", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab.key),
        "data-ocid": `analytics.tab.${tab.key}`,
        className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${activeTab === tab.key ? "bg-card text-foreground border-border shadow-sm" : "text-muted-foreground border-transparent hover:text-foreground hover:bg-card/60"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "w-3.5 h-3.5" }),
          tab.label
        ]
      },
      tab.key
    )) }),
    activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3",
          "data-ocid": "analytics.overview.metrics-row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Total Users",
                value: safeCount(stats == null ? void 0 : stats.totalUsers),
                icon: Users,
                loading: statsLoading,
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Total Orders",
                value: totalMonthlyOrders,
                icon: ShoppingCart,
                loading: monthlyLoading,
                change: 0,
                changeLabel: "this month",
                iconBg: "bg-indigo-100",
                iconColor: "text-indigo-600"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Revenue",
                value: `₹${(totalMonthlyRevenue / 1e3).toFixed(0)}K`,
                icon: IndianRupee,
                loading: monthlyLoading,
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-600"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Merchants",
                value: safeCount(stats == null ? void 0 : stats.totalMerchants),
                icon: Store,
                loading: statsLoading,
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                title: "Delivery Partners",
                value: safeCount(stats == null ? void 0 : stats.totalDeliveryPartners),
                icon: Truck,
                loading: statsLoading,
                iconBg: "bg-cyan-100",
                iconColor: "text-cyan-600"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col items-center justify-center gap-2",
            "data-ocid": "analytics.overview.dau-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-foreground tabular-nums", children: dailyActiveUsers.toLocaleString("en-IN") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Daily Active Users" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Active users today" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-sm",
            "data-ocid": "analytics.overview.order-status-donut",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-3", children: "Order Status" }),
              statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }) : orderStatusData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "No order data yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 130, height: 130, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Pie,
                    {
                      data: orderStatusData,
                      cx: "50%",
                      cy: "50%",
                      innerRadius: 40,
                      outerRadius: 60,
                      paddingAngle: 3,
                      dataKey: "value",
                      children: orderStatusData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TOOLTIP_STYLE })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1", children: orderStatusData.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-2 h-2 rounded-full flex-shrink-0",
                          style: { background: s.color }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-1", children: s.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium tabular-nums", children: s.value })
                    ]
                  },
                  s.name
                )) })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-sm",
            "data-ocid": "analytics.overview.daily-orders-chart",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4", children: [
                "Daily Orders — ",
                MONTHS[month]
              ] }),
              monthlyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 bg-muted animate-pulse rounded-lg" }) : dailyData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "No order data for this month" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                BarChart,
                {
                  data: dailyData,
                  margin: { top: 0, right: 0, bottom: 0, left: -20 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "var(--color-border)",
                        vertical: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "day",
                        tick: { fontSize: 10 },
                        tickLine: false,
                        axisLine: false,
                        interval: 4
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 10 },
                        tickLine: false,
                        axisLine: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        contentStyle: TOOLTIP_STYLE,
                        formatter: (v, name) => [
                          name === "revenue" ? `₹${v.toLocaleString("en-IN")}` : v,
                          name === "revenue" ? "Revenue" : "Orders"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bar,
                      {
                        dataKey: "orders",
                        fill: "oklch(0.55 0.17 148)",
                        radius: [3, 3, 0, 0]
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-sm",
            "data-ocid": "analytics.overview.daily-revenue-chart",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4", children: [
                "Daily Revenue — ",
                MONTHS[month]
              ] }),
              monthlyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 bg-muted animate-pulse rounded-lg" }) : dailyData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "No revenue data for this month" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                BarChart,
                {
                  data: dailyData,
                  margin: { top: 0, right: 0, bottom: 0, left: -10 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "var(--color-border)",
                        vertical: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "day",
                        tick: { fontSize: 10 },
                        tickLine: false,
                        axisLine: false,
                        interval: 4
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 10 },
                        tickLine: false,
                        axisLine: false,
                        tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}K`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        contentStyle: TOOLTIP_STYLE,
                        formatter: (v) => [
                          `₹${v.toLocaleString("en-IN")}`,
                          "Revenue"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bar,
                      {
                        dataKey: "revenue",
                        fill: "oklch(0.65 0.17 202)",
                        radius: [3, 3, 0, 0]
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden",
          "data-ocid": "analytics.overview.top-merchants",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border bg-muted/20 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                  "Top Merchants"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sorted by most orders" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                "Top ",
                top5Merchants.length
              ] })
            ] }),
            top5Merchants.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-5 py-8 text-center text-sm text-muted-foreground",
                "data-ocid": "analytics.overview.top-merchants.empty_state",
                children: "No merchant data yet"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: top5Merchants.map((m, i) => {
              const orderCount = Number(m.orderCount ?? 0);
              const customerCount = Number(m.customerCount ?? 0);
              const pct = Math.round(orderCount / top5MaxOrders * 100);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-4 px-5 py-3",
                  "data-ocid": `analytics.overview.merchant.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-muted-foreground w-5 tabular-nums shrink-0", children: i + 1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: m.businessName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3 h-3" }),
                          orderCount.toLocaleString("en-IN"),
                          " orders"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                          customerCount.toLocaleString("en-IN"),
                          " customers"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full rounded-full bg-primary transition-all",
                          style: { width: `${pct}%` }
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold tabular-nums text-primary", children: orderCount.toLocaleString("en-IN") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "orders" })
                    ] })
                  ]
                },
                m.id
              );
            }) })
          ]
        }
      )
    ] }),
    activeTab === "services" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-sm",
          "data-ocid": "analytics.services.overview",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: ChartColumn,
                title: "Service Modules",
                subtitle: "Orders and activity by service category"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "Service category analytics will appear here once orders are placed across modules" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-4 gap-4",
          "data-ocid": "analytics.services.city-controls",
          children: [
            {
              label: "Total Users",
              value: safeCount(stats == null ? void 0 : stats.totalUsers),
              color: "text-blue-600",
              bg: "bg-blue-100"
            },
            {
              label: "Total Orders",
              value: safeCount(stats == null ? void 0 : stats.totalOrders),
              color: "text-primary",
              bg: "bg-primary/10"
            },
            {
              label: "Merchants",
              value: safeCount(stats == null ? void 0 : stats.totalMerchants),
              color: "text-amber-600",
              bg: "bg-amber-100"
            },
            {
              label: "Delivery Partners",
              value: safeCount(stats == null ? void 0 : stats.totalDeliveryPartners),
              color: "text-cyan-600",
              bg: "bg-cyan-100"
            }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-4 shadow-sm text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center mx-auto mb-2`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${item.color}`, children: statsLoading ? "—" : item.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.label })
              ]
            },
            item.label
          ))
        }
      )
    ] }),
    activeTab === "bookings" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-sm",
          "data-ocid": "analytics.bookings.healthcare",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "w-4 h-4 text-pink-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Top Healthcare Specializations" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "Healthcare booking analytics will appear once appointments are created" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-sm",
          "data-ocid": "analytics.bookings.tours",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-violet-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Top Tour Destinations" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "Tour booking analytics will appear once bookings are made" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-sm",
          "data-ocid": "analytics.bookings.services",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 text-teal-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Top Professional Service Skills" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "Professional service analytics will appear once service bookings are created" })
          ]
        }
      )
    ] }),
    activeTab === "merchant" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: merchantSearch,
              onChange: (e) => setMerchantSearch(e.target.value),
              placeholder: "Search merchant…",
              className: "pl-9",
              "data-ocid": "analytics.merchant.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => exportCSV(sortedTopMerchants),
            className: "gap-1.5",
            "data-ocid": "analytics.merchant.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export"
            ]
          }
        )
      ] }),
      merchantAnalytics && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        {
          label: "Top Products",
          value: ((_a = merchantAnalytics.topProductsByProfit) == null ? void 0 : _a.length) ?? 0,
          color: "text-emerald-600"
        },
        {
          label: "Running Products",
          value: ((_b = merchantAnalytics.runningProducts) == null ? void 0 : _b.length) ?? 0,
          color: "text-blue-600"
        },
        {
          label: "Retention Rate",
          value: `${((merchantAnalytics.customerRetentionRate ?? 0) * 100).toFixed(0)}%`,
          color: "text-primary"
        },
        {
          label: "Branches",
          value: ((_c = merchantAnalytics.branchComparison) == null ? void 0 : _c.length) ?? 0,
          color: "text-amber-600"
        }
      ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold mt-1 ${stat.color}`, children: stat.value })
          ]
        },
        stat.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden",
          "data-ocid": "analytics.merchant.table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Merchant Performance — Sorted by Most Orders" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: [
                { label: "Merchant", key: null },
                { label: "Orders", key: "orders" },
                { label: "Revenue", key: "revenue" },
                { label: "Avg Rating", key: "rating" }
              ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
                  children: col.key ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleSort(col.key),
                      className: "flex items-center gap-1 hover:text-foreground transition-colors",
                      children: [
                        col.label,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ArrowUpRight,
                          {
                            className: `w-3 h-3 transition-transform ${sortKey === col.key ? sortDir === "asc" ? "rotate-180" : "" : "opacity-30"}`
                          }
                        )
                      ]
                    }
                  ) : col.label
                },
                col.label
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: merchantsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mx-auto" }) }) }) : sortedTopMerchants.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 4,
                  className: "px-4 py-6 text-center text-muted-foreground text-xs",
                  "data-ocid": "analytics.merchant.empty_state",
                  children: "No merchant data available yet."
                }
              ) }) : sortedTopMerchants.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
                  "data-ocid": `analytics.merchant.row.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: m.merchantName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 tabular-nums font-medium", children: m.orderCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 tabular-nums font-medium", children: [
                      "₹",
                      m.revenue.toLocaleString("en-IN")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-amber-500 fill-amber-500" }),
                      m.avgRating.toFixed(1)
                    ] }) })
                  ]
                },
                `${m.merchantName}-${idx}`
              )) })
            ] }) })
          ]
        }
      )
    ] }),
    activeTab === "dp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        {
          label: "Completion Rate",
          value: dpAnalytics ? `${dpAnalytics.completionRate.toFixed(0)}%` : "—",
          color: "text-emerald-600"
        },
        {
          label: "Avg Delivery Time",
          value: dpAnalytics ? `${dpAnalytics.avgDeliveryMinutes.toFixed(0)} min` : "—",
          color: "text-blue-600"
        },
        {
          label: "Avg Rating",
          value: dpAnalytics ? `⭐ ${dpAnalytics.avgRating.toFixed(1)}` : "—",
          color: "text-primary"
        },
        {
          label: "Coverage Areas",
          value: dpAnalytics ? `${dpAnalytics.areaHeatmap.length}` : "—",
          color: "text-amber-600"
        }
      ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold mt-1 ${stat.color}`, children: stat.value })
          ]
        },
        stat.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden",
          "data-ocid": "analytics.dp.area-heatmap",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Delivery Area Heatmap" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Orders per area — last 30 days" })
            ] }),
            (dpAnalytics == null ? void 0 : dpAnalytics.areaHeatmap) && dpAnalytics.areaHeatmap.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: dpAnalytics.areaHeatmap.slice(0, 6).map((area, i) => {
              const deliveries = typeof area === "object" && area !== null && "count" in area ? Number(area.count) : 0;
              const areaName = typeof area === "object" && area !== null && "area" in area ? String(area.area) : `Area ${i + 1}`;
              const maxD = dpAnalytics.areaHeatmap.reduce((acc, a) => {
                const c = typeof a === "object" && a !== null && "count" in a ? Number(a.count) : 0;
                return Math.max(acc, c);
              }, 1);
              const pct = deliveries / maxD * 100;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 px-5 py-3",
                  "data-ocid": `analytics.dp.area.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-5 tabular-nums", children: i + 1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground w-36 shrink-0", children: areaName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-3 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full bg-primary transition-all",
                        style: { width: `${pct}%` }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tabular-nums text-foreground w-12 text-right", children: deliveries })
                  ]
                },
                areaName
              );
            }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "Area heatmap will appear once deliveries are completed" })
          ]
        }
      )
    ] }),
    activeTab === "flows" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-sm",
          "data-ocid": "analytics.flows.health",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: Activity,
                title: "Flow Health",
                subtitle: "Registry diagnostics summary",
                color: "text-emerald-600"
              }
            ),
            flowSummaryLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, i)) }) : !flowSummary ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "Run Flow Agent diagnostics to see health summary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
              {
                label: "Total Flows",
                value: flowSummary.totalFlows,
                color: "text-foreground",
                bg: "bg-muted"
              },
              {
                label: "Passing",
                value: flowSummary.passed,
                color: "text-emerald-600",
                bg: "bg-emerald-100"
              },
              {
                label: "Failed",
                value: flowSummary.failed,
                color: "text-red-500",
                bg: "bg-red-100"
              },
              {
                label: "Warnings",
                value: flowSummary.warnings,
                color: "text-amber-600",
                bg: "bg-amber-100"
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `${item.bg} rounded-xl p-4 text-center`,
                "data-ocid": `analytics.flows.${item.label.toLowerCase().replace(" ", "_")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${item.color}`, children: item.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: item.label })
                ]
              },
              item.label
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-sm",
          "data-ocid": "analytics.flows.bot-activity",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: Bot,
                title: "Bot Activity (Last 24h)",
                subtitle: "Messages across all channels",
                color: "text-blue-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: botActivity.map((bot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `${bot.bg} dark:bg-opacity-20 rounded-xl p-4 flex items-start gap-3`,
                "data-ocid": `analytics.flows.bot.${bot.channel.toLowerCase()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    bot.icon,
                    {
                      className: `w-6 h-6 ${bot.color} flex-shrink-0 mt-0.5`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: bot.channel }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: bot.total.toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "messages ·",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-500", children: [
                        bot.errors,
                        " errors"
                      ] })
                    ] })
                  ] })
                ]
              },
              bot.channel
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-sm",
          "data-ocid": "analytics.flows.script-executor",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: Terminal,
                title: "Script Executor Summary",
                subtitle: "Automated test run statistics",
                color: "text-purple-600"
              }
            ),
            !scriptSummary ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "Run the Script Executor to see test statistics" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-foreground tabular-nums", children: scriptSummary.totalRuns }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total Runs" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-emerald-600 tabular-nums", children: [
                    scriptSummary.passRate,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Pass Rate" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground mt-2", children: scriptSummary.lastRun }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Last Run" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-3 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full bg-emerald-500 transition-all",
                  style: { width: `${scriptSummary.passRate}%` }
                }
              ) })
            ] })
          ]
        }
      )
    ] }),
    activeTab === "lending" && /* @__PURE__ */ jsxRuntimeExports.jsx(LendingAnalyticsTab, {}),
    activeTab === "payments" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaymentServicesTab,
      {
        busBookingsRaw,
        trainBookingsRaw,
        flightBookingsRaw,
        utilTxnsRaw,
        apiLogsRaw
      }
    )
  ] });
}
export {
  AnalyticsPage as default
};
