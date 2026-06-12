import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle,
  Copy,
  Database,
  ExternalLink,
  Factory,
  FileCode2,
  Home,
  IndianRupee,
  Megaphone,
  MessageSquare,
  Monitor,
  Package,
  Phone,
  Send,
  Settings,
  ShoppingCart,
  Star,
  Store,
  Terminal,
  TrendingDown,
  TrendingUp,
  Trophy,
  Truck,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import {
  buildSeedSummaryMessage,
  useBotPerformanceStats,
  useDailyBotStats,
  useDashboardStats,
  useMonthlyStats,
  useOrders,
  useSeedSampleData,
  useTopMerchants,
} from "../hooks/useBackend";

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

function POSAccessCard() {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://your-app.ic0.app";
  // Unified dashboard URLs (no separate /merchant-pos or /delivery-pos)
  const merchantUrl = `${origin}/merchant-dashboard`;
  const deliveryUrl = `${origin}/delivery-dashboard`;

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 shadow-card"
      data-ocid="dashboard.pos-access-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-foreground">
          Dashboard Access URLs
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Share these links with merchants and delivery partners. They log in via
        WhatsApp OTP in the POS tab inside their dashboard.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            label: "Merchant Dashboard + POS",
            url: merchantUrl,
            icon: Store,
            color: "text-violet-600",
            bg: "bg-violet-100",
            ocid: "dashboard.merchant-dashboard-link",
          },
          {
            label: "Delivery Partner Dashboard + POS",
            url: deliveryUrl,
            icon: Truck,
            color: "text-cyan-600",
            bg: "bg-cyan-100",
            ocid: "dashboard.delivery-dashboard-link",
          },
        ].map(({ label, url, icon: Icon, color, bg, ocid }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border"
            data-ocid={ocid}
          >
            <div
              className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">{label}</p>
              <p className="text-[11px] font-mono text-muted-foreground truncate mt-0.5">
                {url}
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
              aria-label={`Open ${label}`}
              data-ocid={`${ocid}-open`}
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
            </a>
            <button
              type="button"
              onClick={() => {
                copyToClipboard(url);
                toast.success("URL copied");
              }}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
              aria-label={`Copy ${label} URL`}
              data-ocid={`${ocid}-copy`}
              title="Copy URL"
            >
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const ADMIN_QUICK_LINKS = [
  {
    label: "Chatbot Simulator",
    desc: "Test WhatsApp flows",
    path: "/chatbot",
    icon: Bot,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Flow Agent",
    desc: "Auto-fix & diagnose flows",
    path: "/flow-agent",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    label: "Bot Logs",
    desc: "Telegram, WhatsApp, SMS",
    path: "/bot-logs",
    icon: Activity,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Script Executor",
    desc: "Run & validate all flows",
    path: "/script-executor",
    icon: Terminal,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    label: "Flow Designer",
    desc: "Visual flow builder",
    path: "/flow-designer",
    icon: FileCode2,
    color: "text-teal-600",
    bg: "bg-teal-100",
  },
  {
    label: "Data Explorer",
    desc: "Query backend tables",
    path: "/data-explorer",
    icon: Database,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
] as const;

// ─── Bot Performance Analytics Section ──────────────────────────────────────

const CHANNEL_COLORS: Record<string, string> = {
  Telegram: "#2563eb",
  WhatsApp: "#16a34a",
  SMS: "#d97706",
  Simulator: "#7c3aed",
};

function BotPerformanceSection() {
  const { data: perfStats } = useBotPerformanceStats();
  const { data: dailyStats = [] } = useDailyBotStats(30);

  const channels = ["Telegram", "WhatsApp", "SMS"] as const;

  // Build per-channel summary cards
  const channelSummaries = channels.map((ch) => {
    const key = ch.toLowerCase() as "telegram" | "whatsapp" | "sms";
    const msgs = perfStats?.messagesByChannel[key] ?? 0;
    const users = perfStats?.usersByChannel[key] ?? 0;
    const orders = perfStats?.ordersByChannel[key] ?? 0;
    return { ch, msgs, users, orders, color: CHANNEL_COLORS[ch] };
  });

  // Most progressive channel (highest users)
  const topChannel = channelSummaries.reduce((a, b) =>
    b.users > a.users ? b : a,
  );
  const totalMsgs = channelSummaries.reduce((s, c) => s + c.msgs, 0);
  const totalUsers = channelSummaries.reduce((s, c) => s + c.users, 0);
  const totalOrders = channelSummaries.reduce((s, c) => s + c.orders, 0);

  const hasData = totalMsgs > 0 || totalUsers > 0;

  // Chart: last 14 days
  const chartData = (dailyStats.length > 0 ? dailyStats : [])
    .slice(-14)
    .map((d) => ({
      date: d.date ? d.date.slice(5) : "", // "MM-DD"
      Telegram: d.telegram,
      WhatsApp: d.whatsapp,
      SMS: d.sms,
    }));

  // Users breakdown for donut-like table
  const breakdown = channels.map((ch) => {
    const key = ch.toLowerCase() as "telegram" | "whatsapp" | "sms";
    const users = perfStats?.usersByChannel[key] ?? 0;
    const pct = totalUsers > 0 ? Math.round((users / totalUsers) * 100) : 0;
    const orders = perfStats?.ordersByChannel[key] ?? 0;
    const ordersPct =
      totalOrders > 0 ? Math.round((orders / totalOrders) * 100) : 0;
    return { ch, users, pct, orders, ordersPct, color: CHANNEL_COLORS[ch] };
  });

  return (
    <div className="space-y-4" data-ocid="dashboard.bot_performance.section">
      {/* Most progressive callout */}
      {hasData && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/25">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">
              Most Progressive Bot:{" "}
              <span style={{ color: topChannel.color }}>{topChannel.ch}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {topChannel.users} users · {topChannel.msgs} messages ·{" "}
              {topChannel.orders} orders via {topChannel.ch}
            </p>
          </div>
          <Badge variant="outline" className="text-xs flex-shrink-0">
            🏆 Top Channel
          </Badge>
        </div>
      )}

      {/* Channel comparison cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {channelSummaries.map(({ ch, msgs, users, orders, color }) => (
          <div
            key={ch}
            className="bg-card border border-border rounded-xl p-4 space-y-3"
            data-ocid={`dashboard.bot_performance.${ch.toLowerCase()}_card`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="font-semibold text-sm text-foreground">
                {ch}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Messages", value: msgs, icon: MessageSquare },
                { label: "Users", value: users, icon: Users },
                { label: "Orders", value: orders, icon: ShoppingCart },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="w-3 h-3 text-muted-foreground mx-auto mb-0.5" />
                  <p className="text-sm font-bold text-foreground tabular-nums">
                    {value}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Volume chart */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h4 className="font-semibold text-sm text-foreground mb-4">
          Message Volume — Last 14 Days
        </h4>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, left: -22, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                strokeOpacity={0.5}
              />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar
                dataKey="Telegram"
                fill={CHANNEL_COLORS.Telegram}
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="WhatsApp"
                fill={CHANNEL_COLORS.WhatsApp}
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="SMS"
                fill={CHANNEL_COLORS.SMS}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[160px] flex items-center justify-center text-sm text-muted-foreground">
            No bot activity data yet. Send messages via Telegram, WhatsApp, or
            SMS to see analytics.
          </div>
        )}
      </div>

      {/* Channel breakdown table */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h4 className="font-semibold text-sm text-foreground mb-3">
          Channel Source Breakdown
        </h4>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              {["Channel", "Users", "% Users", "Orders", "% Orders"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left pb-2 pr-4 font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {breakdown.map(({ ch, users, pct, orders, ordersPct, color }) => (
              <tr key={ch} className="border-b border-border/40 last:border-0">
                <td className="py-2 pr-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-medium text-foreground">{ch}</span>
                  </div>
                </td>
                <td className="py-2 pr-4 tabular-nums font-medium text-foreground">
                  {users}
                </td>
                <td className="py-2 pr-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden"
                      style={{ maxWidth: 60 }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>
                    <span className="tabular-nums text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                </td>
                <td className="py-2 pr-4 tabular-nums font-medium text-foreground">
                  {orders}
                </td>
                <td className="py-2">
                  <span className="tabular-nums text-muted-foreground">
                    {ordersPct}%
                  </span>
                </td>
              </tr>
            ))}
            {!hasData && (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-muted-foreground"
                >
                  No bot activity data yet. Send messages via Telegram,
                  WhatsApp, or SMS to see analytics.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: topMerchants, isLoading: merchantsLoading } =
    useTopMerchants(5);
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const seedData = useSeedSampleData();
  const [seeding, setSeeding] = useState(false);
  const [seedModalOpen, setSeedModalOpen] = useState(false);
  // Re-seed confirmation dialog state
  const [reseedDialogOpen, setReseedDialogOpen] = useState(false);
  const [existingDataSummary, setExistingDataSummary] = useState("");
  const [seedProgress, setSeedProgress] = useState<
    Array<{
      label: string;
      status: "pending" | "in_progress" | "done" | "warning" | "error";
      count?: number;
    }>
  >([]);
  const [seedDone, setSeedDone] = useState(false);

  const now = new Date();
  const { data: monthlyStats = [] } = useMonthlyStats(
    now.getFullYear(),
    now.getMonth() + 1,
  );

  const normStats = stats
    ? {
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
        activePromotions: Number(stats.activePromotions ?? 0),
      }
    : null;

  const recentOrders = orders?.slice(0, 10) ?? [];
  const chartData = monthlyStats.slice(-14).map((d) => ({
    day: `Day ${d.day}`,
    orders: d.orderCount,
    revenue: Math.round(d.revenue / 1000),
  }));

  const isEmpty =
    normStats &&
    normStats.totalOrders === 0 &&
    normStats.totalMerchants === 0 &&
    normStats.totalCustomers === 0;

  /** Check if data already exists (non-empty stats) and prompt user if so */
  async function handleSeedDataClick() {
    const hasData =
      normStats &&
      (normStats.totalCustomers > 0 ||
        normStats.totalMerchants > 0 ||
        normStats.totalOrders > 0);
    if (hasData) {
      const parts: string[] = [];
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
      "Word Definitions",
    ];
    const initialProgress = STEPS.map((label, i) => ({
      label,
      status: i === 0 ? ("in_progress" as const) : ("pending" as const),
    }));
    setReseedDialogOpen(false);
    setSeedProgress(initialProgress);
    setSeedDone(false);
    setSeedModalOpen(true);
    setSeeding(true);

    // Progressive animation: advance one step every 400ms
    let currentStep = 0;
    const intervalId = setInterval(() => {
      currentStep += 1;
      if (currentStep >= STEPS.length) {
        clearInterval(intervalId);
        return;
      }
      setSeedProgress((prev) =>
        prev.map((s, i) => {
          if (i < currentStep) return { ...s, status: "in_progress" as const }; // will be overwritten by real data later
          if (i === currentStep)
            return { ...s, status: "in_progress" as const };
          return s;
        }),
      );
    }, 400);

    try {
      const summary = await seedData.mutateAsync();
      clearInterval(intervalId);
      // Map summary fields to steps in order
      const counts: number[] = [
        summary.cities,
        summary.cities, // city controls (derived from cities)
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
        Number(summary.languageWordDefs ?? 0),
      ];
      setSeedProgress(
        STEPS.map((label, i) => ({
          label,
          status:
            (counts[i] ?? 0) > 0 ? ("done" as const) : ("warning" as const),
          count: counts[i] ?? 0,
        })),
      );
      setSeedDone(true);
    } catch (err) {
      clearInterval(intervalId);
      const msg = err instanceof Error ? err.message : "Seed failed";
      setSeedProgress((prev) =>
        prev.map((s) =>
          s.status === "pending" || s.status === "in_progress"
            ? { ...s, status: "error" as const, count: 0 }
            : s,
        ),
      );
      toast.error(msg);
    } finally {
      setSeeding(false);
    }
  }

  // Seed progress modal
  const SeedModal = seedModalOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            Loading Sample Data
          </h3>
          <button
            type="button"
            onClick={() => setSeedModalOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
            data-ocid="dashboard.seed_modal.close_button"
          >
            <span className="text-base leading-none">✕</span>
          </button>
        </div>
        <div className="px-5 py-4 max-h-[60vh] overflow-y-auto space-y-2">
          {seedProgress.map(({ label, status, count }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <span className="w-5 flex-shrink-0 text-center">
                {status === "pending" && (
                  <span className="text-muted-foreground">⬜</span>
                )}
                {status === "in_progress" && (
                  <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
                {status === "done" && (
                  <span className="text-emerald-500">✅</span>
                )}
                {status === "warning" && (
                  <span className="text-amber-500">⚠️</span>
                )}
                {status === "error" && <span className="text-red-500">❌</span>}
              </span>
              <span
                className={`flex-1 ${
                  status === "done"
                    ? "text-foreground font-medium"
                    : status === "in_progress"
                      ? "text-primary"
                      : status === "warning"
                        ? "text-amber-600"
                        : status === "error"
                          ? "text-red-600"
                          : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {status === "done" && (
                <span className="text-xs text-emerald-600 tabular-nums font-medium">
                  {count ?? 0} created
                </span>
              )}
              {status === "warning" && (
                <span className="text-xs text-amber-600 tabular-nums">
                  0 created
                </span>
              )}
              {status === "in_progress" && (
                <span className="text-xs text-primary animate-pulse">
                  loading…
                </span>
              )}
            </div>
          ))}
          {seedDone && (
            <div className="mt-3 pt-3 border-t border-border text-center">
              <p className="text-sm font-semibold text-emerald-600">
                ✅ Done! All sample data loaded.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                You can now explore the chatbot simulator and data explorer.
              </p>
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-border flex justify-end">
          <button
            type="button"
            onClick={() => setSeedModalOpen(false)}
            className="text-sm px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            data-ocid="dashboard.seed_modal.done_button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {SeedModal}
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Overview
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Today's activity ·{" "}
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleSeedDataClick}
              disabled={seeding}
              data-ocid="dashboard-seed-data"
            >
              <Database className="w-4 h-4" />
              {seeding ? "Seeding…" : "Load Sample Data"}
            </Button>
            {/* Re-seed confirmation dialog */}
            {reseedDialogOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4">
                  <div className="px-5 py-4 border-b border-border">
                    <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <Database className="w-4 h-4 text-amber-500" />
                      Sample Data Already Loaded
                    </h3>
                  </div>
                  <div className="px-5 py-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Sample data already exists: {existingDataSummary}.
                    </p>
                    <p className="text-sm text-foreground">
                      Do you want to add more sample data on top of existing
                      records, or clear everything and start fresh?
                    </p>
                  </div>
                  <div className="px-5 py-3 border-t border-border flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleSeedData()}
                      className="w-full text-sm px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      data-ocid="dashboard.reseed_dialog.add_button"
                    >
                      ➕ Add More Sample Data
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReseedDialogOpen(false);
                        toast.info(
                          "To reset all data, use Data Explorer → clear tables individually.",
                        );
                      }}
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border text-foreground hover:bg-muted/50 transition-colors"
                      data-ocid="dashboard.reseed_dialog.cancel_button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Link to="/chatbot">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                data-ocid="dashboard-open-chatbot"
              >
                <Bot className="w-4 h-4" /> Chatbot Simulator
              </Button>
            </Link>
            <Link to="/orders">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                data-ocid="dashboard-manage-orders"
              >
                <ShoppingCart className="w-4 h-4" /> Manage Orders
              </Button>
            </Link>
            <Link to="/merchants">
              <Button
                size="sm"
                className="gap-2"
                data-ocid="dashboard-pending-kyc"
              >
                <CheckCircle className="w-4 h-4" /> Pending KYC
              </Button>
            </Link>
          </div>
        </div>

        {/* Empty state notice */}
        {isEmpty && !statsLoading && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-200">
            <Settings className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">No data yet</p>
              <p className="text-xs mt-0.5">
                Click <strong>Load Sample Data</strong> to populate the system
                with demo merchants, customers, orders, events, and promotions
                to explore the dashboard.
              </p>
            </div>
          </div>
        )}

        {/* Primary stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          <StatCard
            title="Total Orders"
            value={normStats?.totalOrders ?? 0}
            icon={TrendingUp}
            loading={statsLoading}
            iconBg="bg-indigo-100"
            iconColor="text-indigo-600"
          />
          <StatCard
            title="Active Orders"
            value={normStats?.activeOrders ?? 0}
            icon={Package}
            loading={statsLoading}
            iconBg="bg-amber-100"
            iconColor="text-amber-600"
          />
          <StatCard
            title="Merchants"
            value={
              normStats
                ? `${normStats.activeMerchants}/${normStats.totalMerchants}`
                : "0/0"
            }
            icon={Store}
            change={3}
            changeLabel="new this week"
            loading={statsLoading}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Customers"
            value={normStats?.totalCustomers ?? 0}
            icon={Users}
            change={18}
            changeLabel="this month"
            loading={statsLoading}
            iconBg="bg-rose-100"
            iconColor="text-rose-600"
          />
          <StatCard
            title="Delivery Partners"
            value={normStats?.totalDeliveryPartners ?? 0}
            icon={Truck}
            loading={statsLoading}
            iconBg="bg-cyan-100"
            iconColor="text-cyan-600"
          />
          <StatCard
            title="Orders Today"
            value={normStats?.ordersToday ?? 0}
            icon={ShoppingCart}
            change={12}
            changeLabel="vs yesterday"
            loading={statsLoading}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Revenue Today"
            value={
              normStats
                ? `₹${normStats.revenueToday.toLocaleString("en-IN")}`
                : "₹0"
            }
            icon={IndianRupee}
            change={8}
            changeLabel="vs yesterday"
            loading={statsLoading}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard
            title="Job Listings"
            value={normStats?.totalJobListings ?? 0}
            icon={Briefcase}
            loading={statsLoading}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />
          <StatCard
            title="Properties"
            value={normStats?.totalPropertyListings ?? 0}
            icon={Home}
            loading={statsLoading}
            iconBg="bg-teal-100"
            iconColor="text-teal-600"
          />
          <StatCard
            title="Total Events"
            value={normStats?.totalEvents ?? 0}
            icon={Calendar}
            loading={statsLoading}
            iconBg="bg-violet-100"
            iconColor="text-violet-600"
          />
          <StatCard
            title="Family Groups"
            value={normStats?.totalFamilyMembers ?? 0}
            icon={UserCheck}
            loading={statsLoading}
            iconBg="bg-pink-100"
            iconColor="text-pink-600"
          />
          <StatCard
            title="Total Promotions"
            value={normStats?.totalPromotions ?? 0}
            icon={Megaphone}
            loading={statsLoading}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Active Promotions"
            value={normStats?.activePromotions ?? 0}
            icon={Megaphone}
            loading={statsLoading}
            change={2}
            changeLabel="new today"
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />
        </div>

        {/* Charts + panels */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">
                Orders & Revenue (Last 14 Days)
              </h3>
              <Link
                to="/analytics"
                className="text-xs text-primary hover:underline"
              >
                Full Analytics
              </Link>
            </div>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={chartData}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "var(--color-card-foreground)",
                    }}
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  />
                  <Bar
                    dataKey="orders"
                    fill="#25a56a"
                    radius={[4, 4, 0, 0]}
                    name="Orders"
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#25a56a55"
                    radius={[4, 4, 0, 0]}
                    name="Revenue (₹K)"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[180px] flex items-center justify-center">
                <div className="w-full h-full bg-muted/30 rounded-lg animate-pulse" />
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">
                Top Merchants
              </h3>
              <Link
                to="/merchants"
                className="text-xs text-primary hover:underline"
                data-ocid="dashboard-view-all-merchants"
              >
                View all
              </Link>
            </div>
            {merchantsLoading ? (
              <div className="space-y-3">
                {["sk1", "sk2", "sk3"].map((id) => (
                  <div
                    key={id}
                    className="h-12 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {(topMerchants ?? []).map((merchant, idx) => (
                  <div
                    key={merchant.merchantName}
                    className="flex items-center gap-3 p-2.5 bg-muted/30 rounded-lg"
                    data-ocid="dashboard-merchant-row"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {merchant.merchantName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {merchant.orderCount} orders
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-foreground">
                        ₹{(merchant.revenue / 1000).toFixed(0)}K
                      </p>
                      <div className="flex items-center gap-0.5 justify-end">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs text-muted-foreground">
                          {merchant.avgRating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">
              Recent Orders
            </h3>
            <Link
              to="/orders"
              className="text-xs text-primary hover:underline"
              data-ocid="dashboard-view-all-orders"
            >
              View all
            </Link>
          </div>
          {ordersLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((id) => (
                <div
                  key={id}
                  className="h-12 bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div
              className="py-8 text-center text-sm text-muted-foreground"
              data-ocid="dashboard.orders.empty_state"
            >
              No orders yet. Click <strong>Load Sample Data</strong> to get
              started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {[
                      "Order ID",
                      "Customer",
                      "Merchant",
                      "Items",
                      "Total",
                      "Status",
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-2 pr-4 ${i === 4 ? "text-right" : "text-left"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid="dashboard-order-row"
                    >
                      <td className="py-2.5 pr-4 font-mono text-xs font-medium">
                        {order.id}
                      </td>
                      <td className="py-2.5 pr-4 text-muted-foreground truncate max-w-[80px]">
                        {order.customerId}
                      </td>
                      <td className="py-2.5 pr-4 text-muted-foreground truncate max-w-[80px]">
                        {order.merchantId}
                      </td>
                      <td className="py-2.5 pr-4 text-muted-foreground">
                        {order.items.length}
                      </td>
                      <td className="py-2.5 pr-4 text-right font-medium tabular-nums">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-2.5">
                        <StatusBadge type="order" value={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bot Performance Analytics */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="font-display font-semibold text-foreground">
                Bot Performance Analytics
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {(["Telegram", "WhatsApp", "SMS"] as const).map((ch) => (
                  <span
                    key={ch}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: CHANNEL_COLORS[ch] }}
                    />
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <BotPerformanceSection />
        </div>

        {/* Quick links to all major admin sections */}
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">
            Quick Access — Admin Tools
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ADMIN_QUICK_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-ocid={`dashboard.quick-link.${link.path.replace("/", "")}`}
              >
                <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group text-center">
                  <div
                    className={`w-10 h-10 rounded-lg ${link.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <link.icon className={`w-5 h-5 ${link.color}`} />
                  </div>
                  <p className="font-semibold text-xs text-foreground">
                    {link.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {link.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dashboard Access URLs */}
        <POSAccessCard />
      </div>
    </>
  );
}
