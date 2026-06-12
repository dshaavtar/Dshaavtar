import { k as useDashboardStats, l as useTopMerchants, m as useOrders, n as useSeedSampleData, r as reactExports, o as useMonthlyStats, j as jsxRuntimeExports, p as ue, L as Link, q as useBotPerformanceStats, s as useDailyBotStats } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as StatCard } from "./StatCard-DTRGtXU8.js";
import { S as StatusBadge } from "./StatusBadge-DNkrizJz.js";
import { D as Database } from "./database-CADlqd_q.js";
import { B as Bot } from "./bot-egkDiXjP.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { S as Settings } from "./settings-CDqnrNMc.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { P as Package } from "./package-CosknzeL.js";
import { S as Store } from "./store-CaCzKt5a.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { I as IndianRupee } from "./indian-rupee-4FVPRNFh.js";
import { B as Briefcase } from "./briefcase-CIHVnHgq.js";
import { H as House } from "./house-DQF9lC4w.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { M as Megaphone } from "./megaphone-BO0GtYln.js";
import { R as ResponsiveContainer, T as Tooltip, B as Bar, L as Legend } from "./generateCategoricalChart--dgqj_9a.js";
import { B as BarChart } from "./BarChart-fezhxBKo.js";
import { X as XAxis, Y as YAxis, C as CartesianGrid } from "./YAxis-BEF0I4n4.js";
import { S as Star } from "./star-DbleSGPY.js";
import { A as Activity } from "./activity-RT92R42G.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { T as Terminal } from "./terminal-D73Q7VO6.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { T as Trophy } from "./trophy-KLTjPb1v.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { M as Monitor } from "./monitor-DDfWmnBf.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
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
  ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m5 12-3 3 3 3", key: "oke12k" }],
  ["path", { d: "m9 18 3-3-3-3", key: "112psh" }]
];
const FileCode2 = createLucideIcon("file-code-2", __iconNode);
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {
  });
}
function POSAccessCard() {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://your-app.ic0.app";
  const merchantUrl = `${origin}/merchant-dashboard`;
  const deliveryUrl = `${origin}/delivery-dashboard`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 shadow-card",
      "data-ocid": "dashboard.pos-access-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Dashboard Access URLs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Share these links with merchants and delivery partners. They log in via WhatsApp OTP in the POS tab inside their dashboard." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          {
            label: "Merchant Dashboard + POS",
            url: merchantUrl,
            icon: Store,
            color: "text-violet-600",
            bg: "bg-violet-100",
            ocid: "dashboard.merchant-dashboard-link"
          },
          {
            label: "Delivery Partner Dashboard + POS",
            url: deliveryUrl,
            icon: Truck,
            color: "text-cyan-600",
            bg: "bg-cyan-100",
            ocid: "dashboard.delivery-dashboard-link"
          }
        ].map(({ label, url, icon: Icon, color, bg, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border",
            "data-ocid": ocid,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground truncate mt-0.5", children: url })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0",
                  "aria-label": `Open ${label}`,
                  "data-ocid": `${ocid}-open`,
                  title: "Open in new tab",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 text-primary" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    copyToClipboard(url);
                    ue.success("URL copied");
                  },
                  className: "p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0",
                  "aria-label": `Copy ${label} URL`,
                  "data-ocid": `${ocid}-copy`,
                  title: "Copy URL",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 text-muted-foreground" })
                }
              )
            ]
          },
          label
        )) })
      ]
    }
  );
}
const ADMIN_QUICK_LINKS = [
  {
    label: "Chatbot Simulator",
    desc: "Test WhatsApp flows",
    path: "/chatbot",
    icon: Bot,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    label: "Flow Agent",
    desc: "Auto-fix & diagnose flows",
    path: "/flow-agent",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-100"
  },
  {
    label: "Bot Logs",
    desc: "Telegram, WhatsApp, SMS",
    path: "/bot-logs",
    icon: Activity,
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    label: "Script Executor",
    desc: "Run & validate all flows",
    path: "/script-executor",
    icon: Terminal,
    color: "text-purple-600",
    bg: "bg-purple-100"
  },
  {
    label: "Flow Designer",
    desc: "Visual flow builder",
    path: "/flow-designer",
    icon: FileCode2,
    color: "text-teal-600",
    bg: "bg-teal-100"
  },
  {
    label: "Data Explorer",
    desc: "Query backend tables",
    path: "/data-explorer",
    icon: Database,
    color: "text-indigo-600",
    bg: "bg-indigo-100"
  }
];
const CHANNEL_COLORS = {
  Telegram: "#2563eb",
  WhatsApp: "#16a34a",
  SMS: "#d97706",
  Simulator: "#7c3aed"
};
function BotPerformanceSection() {
  const { data: perfStats } = useBotPerformanceStats();
  const { data: dailyStats = [] } = useDailyBotStats(30);
  const channels = ["Telegram", "WhatsApp", "SMS"];
  const channelSummaries = channels.map((ch) => {
    const key = ch.toLowerCase();
    const msgs = (perfStats == null ? void 0 : perfStats.messagesByChannel[key]) ?? 0;
    const users = (perfStats == null ? void 0 : perfStats.usersByChannel[key]) ?? 0;
    const orders = (perfStats == null ? void 0 : perfStats.ordersByChannel[key]) ?? 0;
    return { ch, msgs, users, orders, color: CHANNEL_COLORS[ch] };
  });
  const topChannel = channelSummaries.reduce(
    (a, b) => b.users > a.users ? b : a
  );
  const totalMsgs = channelSummaries.reduce((s, c) => s + c.msgs, 0);
  const totalUsers = channelSummaries.reduce((s, c) => s + c.users, 0);
  const totalOrders = channelSummaries.reduce((s, c) => s + c.orders, 0);
  const hasData = totalMsgs > 0 || totalUsers > 0;
  const chartData = (dailyStats.length > 0 ? dailyStats : []).slice(-14).map((d) => ({
    date: d.date ? d.date.slice(5) : "",
    // "MM-DD"
    Telegram: d.telegram,
    WhatsApp: d.whatsapp,
    SMS: d.sms
  }));
  const breakdown = channels.map((ch) => {
    const key = ch.toLowerCase();
    const users = (perfStats == null ? void 0 : perfStats.usersByChannel[key]) ?? 0;
    const pct = totalUsers > 0 ? Math.round(users / totalUsers * 100) : 0;
    const orders = (perfStats == null ? void 0 : perfStats.ordersByChannel[key]) ?? 0;
    const ordersPct = totalOrders > 0 ? Math.round(orders / totalOrders * 100) : 0;
    return { ch, users, pct, orders, ordersPct, color: CHANNEL_COLORS[ch] };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "dashboard.bot_performance.section", children: [
    hasData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
          "Most Progressive Bot:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: topChannel.color }, children: topChannel.ch })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          topChannel.users,
          " users · ",
          topChannel.msgs,
          " messages ·",
          " ",
          topChannel.orders,
          " orders via ",
          topChannel.ch
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs flex-shrink-0", children: "🏆 Top Channel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: channelSummaries.map(({ ch, msgs, users, orders, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 space-y-3",
        "data-ocid": `dashboard.bot_performance.${ch.toLowerCase()}_card`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                style: { backgroundColor: color }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: ch })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
            { label: "Messages", value: msgs, icon: MessageSquare },
            { label: "Users", value: users, icon: Users },
            { label: "Orders", value: orders, icon: ShoppingCart }
          ].map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3 text-muted-foreground mx-auto mb-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground tabular-nums", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label })
          ] }, label)) })
        ]
      },
      ch
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground mb-4", children: "Message Volume — Last 14 Days" }),
      chartData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: chartData,
          margin: { top: 0, right: 0, left: -22, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "var(--color-border)",
                strokeOpacity: 0.5
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: { fontSize: 10 }, tickLine: false }),
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
                contentStyle: {
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px"
                },
                cursor: { fill: "rgba(0,0,0,0.04)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 11 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "Telegram",
                fill: CHANNEL_COLORS.Telegram,
                radius: [2, 2, 0, 0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "WhatsApp",
                fill: CHANNEL_COLORS.WhatsApp,
                radius: [2, 2, 0, 0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "SMS",
                fill: CHANNEL_COLORS.SMS,
                radius: [2, 2, 0, 0]
              }
            )
          ]
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[160px] flex items-center justify-center text-sm text-muted-foreground", children: "No bot activity data yet. Send messages via Telegram, WhatsApp, or SMS to see analytics." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground mb-3", children: "Channel Source Breakdown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["Channel", "Users", "% Users", "Orders", "% Orders"].map(
          (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-left pb-2 pr-4 font-semibold text-muted-foreground uppercase tracking-wide",
              children: h
            },
            h
          )
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          breakdown.map(({ ch, users, pct, orders, ordersPct, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40 last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-2 h-2 rounded-full flex-shrink-0",
                  style: { backgroundColor: color }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: ch })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 tabular-nums font-medium text-foreground", children: users }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden",
                  style: { maxWidth: 60 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full rounded-full",
                      style: { width: `${pct}%`, backgroundColor: color }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums text-muted-foreground", children: [
                pct,
                "%"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 tabular-nums font-medium text-foreground", children: orders }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums text-muted-foreground", children: [
              ordersPct,
              "%"
            ] }) })
          ] }, ch)),
          !hasData && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 5,
              className: "py-6 text-center text-muted-foreground",
              children: "No bot activity data yet. Send messages via Telegram, WhatsApp, or SMS to see analytics."
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: topMerchants, isLoading: merchantsLoading } = useTopMerchants(5);
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const seedData = useSeedSampleData();
  const [seeding, setSeeding] = reactExports.useState(false);
  const [seedModalOpen, setSeedModalOpen] = reactExports.useState(false);
  const [reseedDialogOpen, setReseedDialogOpen] = reactExports.useState(false);
  const [existingDataSummary, setExistingDataSummary] = reactExports.useState("");
  const [seedProgress, setSeedProgress] = reactExports.useState([]);
  const [seedDone, setSeedDone] = reactExports.useState(false);
  const now = /* @__PURE__ */ new Date();
  const { data: monthlyStats = [] } = useMonthlyStats(
    now.getFullYear(),
    now.getMonth() + 1
  );
  const normStats = stats ? {
    totalOrders: Number(stats.totalOrders ?? 0),
    activeOrders: Number(stats.activeOrders ?? 0),
    totalMerchants: Number(stats.totalMerchants ?? 0),
    activeMerchants: Number(stats.totalMerchants ?? 0),
    totalDeliveryPartners: Number(stats.totalDeliveryPartners ?? 0),
    totalCustomers: Number(stats.totalUsers ?? 0),
    totalJobListings: Number(stats.totalJobs ?? 0),
    totalPropertyListings: Number(stats.totalProperties ?? 0),
    ordersToday: Number(stats.activeOrders ?? 0),
    revenueToday: stats.totalRevenue ?? 0,
    totalEvents: Number(stats.totalEvents ?? 0),
    totalFamilyMembers: Number(stats.totalFamilyMembers ?? 0),
    totalPromotions: Number(stats.totalPromotions ?? 0),
    activePromotions: Number(stats.activePromotions ?? 0)
  } : null;
  const recentOrders = (orders == null ? void 0 : orders.slice(0, 10)) ?? [];
  const chartData = monthlyStats.slice(-14).map((d) => ({
    day: `Day ${d.day}`,
    orders: d.orderCount,
    revenue: Math.round(d.revenue / 1e3)
  }));
  const isEmpty = normStats && normStats.totalOrders === 0 && normStats.totalMerchants === 0 && normStats.totalCustomers === 0;
  async function handleSeedDataClick() {
    const hasData = normStats && (normStats.totalCustomers > 0 || normStats.totalMerchants > 0 || normStats.totalOrders > 0);
    if (hasData) {
      const parts = [];
      if (normStats.totalCustomers > 0)
        parts.push(`${normStats.totalCustomers} customers`);
      if (normStats.totalMerchants > 0)
        parts.push(`${normStats.totalMerchants} merchants`);
      if (normStats.totalOrders > 0)
        parts.push(`${normStats.totalOrders} orders`);
      setExistingDataSummary(parts.join(", "));
      setReseedDialogOpen(true);
      return;
    }
    await handleSeedData();
  }
  async function handleSeedData() {
    const STEPS = [
      "Cities",
      "City Controls",
      "Merchants",
      "Products",
      "Customers",
      "Delivery Partners",
      "Jobs",
      "Daily Jobs",
      "Properties",
      "Old Items",
      "Events",
      "Family Groups",
      "Promotions",
      "Recipes",
      "Healthcare Providers",
      "Tour Operators",
      "Professional Services",
      "Shuttle Routes",
      "Donations",
      "Support Tickets",
      "Lending Items",
      "Community Members",
      "Manufacturers",
      "Mfr. Products",
      "Distributors",
      "Language Courses",
      "Language Lessons",
      "Enrollments",
      "Word Definitions"
    ];
    const initialProgress = STEPS.map((label, i) => ({
      label,
      status: i === 0 ? "in_progress" : "pending"
    }));
    setReseedDialogOpen(false);
    setSeedProgress(initialProgress);
    setSeedDone(false);
    setSeedModalOpen(true);
    setSeeding(true);
    let currentStep = 0;
    const intervalId = setInterval(() => {
      currentStep += 1;
      if (currentStep >= STEPS.length) {
        clearInterval(intervalId);
        return;
      }
      setSeedProgress(
        (prev) => prev.map((s, i) => {
          if (i < currentStep) return { ...s, status: "in_progress" };
          if (i === currentStep)
            return { ...s, status: "in_progress" };
          return s;
        })
      );
    }, 400);
    try {
      const summary = await seedData.mutateAsync();
      clearInterval(intervalId);
      const counts = [
        summary.cities,
        summary.cities,
        // city controls (derived from cities)
        summary.merchants,
        summary.products,
        summary.customers,
        summary.deliveryPartners,
        summary.jobs,
        summary.adhocJobs,
        summary.properties,
        summary.oldItems,
        summary.events,
        summary.familyGroups,
        summary.promotions,
        summary.recipes,
        summary.healthcareProviders,
        summary.tourOperators,
        summary.professionalServices,
        summary.shuttleRoutes,
        summary.donations,
        summary.supportTickets,
        summary.lendingItems,
        summary.communityMembers,
        summary.manufacturers,
        summary.manufacturerProducts,
        summary.distributors,
        Number(summary.languageCourses ?? 0),
        Number(summary.languageLessons ?? 0),
        Number(summary.languageEnrollments ?? 0),
        Number(summary.languageWordDefs ?? 0)
      ];
      setSeedProgress(
        STEPS.map((label, i) => ({
          label,
          status: (counts[i] ?? 0) > 0 ? "done" : "warning",
          count: counts[i] ?? 0
        }))
      );
      setSeedDone(true);
    } catch (err) {
      clearInterval(intervalId);
      const msg = err instanceof Error ? err.message : "Seed failed";
      setSeedProgress(
        (prev) => prev.map(
          (s) => s.status === "pending" || s.status === "in_progress" ? { ...s, status: "error", count: 0 } : s
        )
      );
      ue.error(msg);
    } finally {
      setSeeding(false);
    }
  }
  const SeedModal = seedModalOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4 text-primary" }),
        "Loading Sample Data"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSeedModalOpen(false),
          className: "text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "Close",
          "data-ocid": "dashboard.seed_modal.close_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: "✕" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 max-h-[60vh] overflow-y-auto space-y-2", children: [
      seedProgress.map(({ label, status, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-5 flex-shrink-0 text-center", children: [
          status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "⬜" }),
          status === "in_progress" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" }),
          status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-500", children: "✅" }),
          status === "warning" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500", children: "⚠️" }),
          status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "❌" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `flex-1 ${status === "done" ? "text-foreground font-medium" : status === "in_progress" ? "text-primary" : status === "warning" ? "text-amber-600" : status === "error" ? "text-red-600" : "text-muted-foreground"}`,
            children: label
          }
        ),
        status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-emerald-600 tabular-nums font-medium", children: [
          count ?? 0,
          " created"
        ] }),
        status === "warning" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-600 tabular-nums", children: "0 created" }),
        status === "in_progress" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary animate-pulse", children: "loading…" })
      ] }, label)),
      seedDone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-600", children: "✅ Done! All sample data loaded." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "You can now explore the chatbot simulator and data explorer." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-t border-border flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setSeedModalOpen(false),
        className: "text-sm px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
        "data-ocid": "dashboard.seed_modal.done_button",
        children: "Close"
      }
    ) })
  ] }) }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    SeedModal,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            "Today's activity ·",
            " ",
            (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-2",
              onClick: handleSeedDataClick,
              disabled: seeding,
              "data-ocid": "dashboard-seed-data",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
                seeding ? "Seeding…" : "Load Sample Data"
              ]
            }
          ),
          reseedDialogOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4 text-amber-500" }),
              "Sample Data Already Loaded"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Sample data already exists: ",
                existingDataSummary,
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Do you want to add more sample data on top of existing records, or clear everything and start fresh?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-t border-border flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleSeedData(),
                  className: "w-full text-sm px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
                  "data-ocid": "dashboard.reseed_dialog.add_button",
                  children: "➕ Add More Sample Data"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setReseedDialogOpen(false);
                    ue.info(
                      "To reset all data, use Data Explorer → clear tables individually."
                    );
                  },
                  className: "w-full text-sm px-3 py-2 rounded-lg border border-border text-foreground hover:bg-muted/50 transition-colors",
                  "data-ocid": "dashboard.reseed_dialog.cancel_button",
                  children: "Cancel"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/chatbot", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-2",
              "data-ocid": "dashboard-open-chatbot",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4" }),
                " Chatbot Simulator"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-2",
              "data-ocid": "dashboard-manage-orders",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                " Manage Orders"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/merchants", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "gap-2",
              "data-ocid": "dashboard-pending-kyc",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                " Pending KYC"
              ]
            }
          ) })
        ] })
      ] }),
      isEmpty && !statsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "No data yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-0.5", children: [
            "Click ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Load Sample Data" }),
            " to populate the system with demo merchants, customers, orders, events, and promotions to explore the dashboard."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Total Orders",
            value: (normStats == null ? void 0 : normStats.totalOrders) ?? 0,
            icon: TrendingUp,
            loading: statsLoading,
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Active Orders",
            value: (normStats == null ? void 0 : normStats.activeOrders) ?? 0,
            icon: Package,
            loading: statsLoading,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Merchants",
            value: normStats ? `${normStats.activeMerchants}/${normStats.totalMerchants}` : "0/0",
            icon: Store,
            change: 3,
            changeLabel: "new this week",
            loading: statsLoading,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Customers",
            value: (normStats == null ? void 0 : normStats.totalCustomers) ?? 0,
            icon: Users,
            change: 18,
            changeLabel: "this month",
            loading: statsLoading,
            iconBg: "bg-rose-100",
            iconColor: "text-rose-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Delivery Partners",
            value: (normStats == null ? void 0 : normStats.totalDeliveryPartners) ?? 0,
            icon: Truck,
            loading: statsLoading,
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Orders Today",
            value: (normStats == null ? void 0 : normStats.ordersToday) ?? 0,
            icon: ShoppingCart,
            change: 12,
            changeLabel: "vs yesterday",
            loading: statsLoading,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Revenue Today",
            value: normStats ? `₹${normStats.revenueToday.toLocaleString("en-IN")}` : "₹0",
            icon: IndianRupee,
            change: 8,
            changeLabel: "vs yesterday",
            loading: statsLoading,
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Job Listings",
            value: (normStats == null ? void 0 : normStats.totalJobListings) ?? 0,
            icon: Briefcase,
            loading: statsLoading,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Properties",
            value: (normStats == null ? void 0 : normStats.totalPropertyListings) ?? 0,
            icon: House,
            loading: statsLoading,
            iconBg: "bg-teal-100",
            iconColor: "text-teal-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Total Events",
            value: (normStats == null ? void 0 : normStats.totalEvents) ?? 0,
            icon: Calendar,
            loading: statsLoading,
            iconBg: "bg-violet-100",
            iconColor: "text-violet-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Family Groups",
            value: (normStats == null ? void 0 : normStats.totalFamilyMembers) ?? 0,
            icon: UserCheck,
            loading: statsLoading,
            iconBg: "bg-pink-100",
            iconColor: "text-pink-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Total Promotions",
            value: (normStats == null ? void 0 : normStats.totalPromotions) ?? 0,
            icon: Megaphone,
            loading: statsLoading,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Active Promotions",
            value: (normStats == null ? void 0 : normStats.activePromotions) ?? 0,
            icon: Megaphone,
            loading: statsLoading,
            change: 2,
            changeLabel: "new today",
            iconBg: "bg-primary/10",
            iconColor: "text-primary"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Orders & Revenue (Last 14 Days)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/analytics",
                className: "text-xs text-primary hover:underline",
                children: "Full Analytics"
              }
            )
          ] }),
          chartData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: chartData,
              margin: { top: 0, right: 0, left: -20, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "day",
                    tick: { fontSize: 10 },
                    tickLine: false
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
                    contentStyle: {
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "var(--color-card-foreground)"
                    },
                    cursor: { fill: "rgba(0,0,0,0.05)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bar,
                  {
                    dataKey: "orders",
                    fill: "#25a56a",
                    radius: [4, 4, 0, 0],
                    name: "Orders"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bar,
                  {
                    dataKey: "revenue",
                    fill: "#25a56a55",
                    radius: [4, 4, 0, 0],
                    name: "Revenue (₹K)"
                  }
                )
              ]
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[180px] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-muted/30 rounded-lg animate-pulse" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Top Merchants" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/merchants",
                className: "text-xs text-primary hover:underline",
                "data-ocid": "dashboard-view-all-merchants",
                children: "View all"
              }
            )
          ] }),
          merchantsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk1", "sk2", "sk3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-12 bg-muted animate-pulse rounded-lg"
            },
            id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (topMerchants ?? []).map((merchant, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-2.5 bg-muted/30 rounded-lg",
              "data-ocid": "dashboard-merchant-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0", children: idx + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: merchant.merchantName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    merchant.orderCount,
                    " orders"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                    "₹",
                    (merchant.revenue / 1e3).toFixed(0),
                    "K"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 justify-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-amber-500 fill-amber-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: merchant.avgRating })
                  ] })
                ] })
              ]
            },
            merchant.merchantName
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Recent Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/orders",
              className: "text-xs text-primary hover:underline",
              "data-ocid": "dashboard-view-all-orders",
              children: "View all"
            }
          )
        ] }),
        ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-12 bg-muted animate-pulse rounded-lg"
          },
          id
        )) }) : recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-8 text-center text-sm text-muted-foreground",
            "data-ocid": "dashboard.orders.empty_state",
            children: [
              "No orders yet. Click ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Load Sample Data" }),
              " to get started."
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [
            "Order ID",
            "Customer",
            "Merchant",
            "Items",
            "Total",
            "Status"
          ].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: `text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-2 pr-4 ${i === 4 ? "text-right" : "text-left"}`,
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors",
              "data-ocid": "dashboard-order-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 font-mono text-xs font-medium", children: order.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground truncate max-w-[80px]", children: order.customerId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground truncate max-w-[80px]", children: order.merchantId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: order.items.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 pr-4 text-right font-medium tabular-nums", children: [
                  "₹",
                  order.totalAmount.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "order", value: order.status }) })
              ]
            },
            order.id
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Bot Performance Analytics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: ["Telegram", "WhatsApp", "SMS"].map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1 text-xs text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-2 h-2 rounded-full inline-block",
                    style: { backgroundColor: CHANNEL_COLORS[ch] }
                  }
                ),
                ch
              ]
            },
            ch
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BotPerformanceSection, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-3", children: "Quick Access — Admin Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: ADMIN_QUICK_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: link.path,
            "data-ocid": `dashboard.quick-link.${link.path.replace("/", "")}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-lg ${link.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: `w-5 h-5 ${link.color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-xs text-foreground", children: link.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: link.desc })
            ] })
          },
          link.path
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(POSAccessCard, {})
    ] })
  ] });
}
export {
  DashboardPage as default
};
