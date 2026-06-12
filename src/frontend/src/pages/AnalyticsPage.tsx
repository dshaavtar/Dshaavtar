import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bot,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Download,
  HeartPulse,
  IndianRupee,
  MapPin,
  MessageSquare,
  Package,
  RefreshCw,
  Search,
  ShoppingCart,
  Star,
  Store,
  Terminal,
  TrendingUp,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "../components/StatCard";
import {
  useBotLogs,
  useDPAnalytics,
  useDashboardStats,
  useEnhancedAnalytics,
  useFlowAgentSummary,
  useGetAllBusBookings,
  useGetAllFlightBookings,
  useGetAllLendingItems,
  useGetAllPaySprintAPILogs,
  useGetAllTrainBookings,
  useGetAllUtilityTransactions,
  useGetLendingItemsDueSoon,
  useGetScriptRunResults,
  useMerchantAnalytics,
  useMerchants,
  useMonthlyStats,
  useTopMerchants,
} from "../hooks/useBackend";
import { safeCount } from "../utils";

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
  "Dec",
];

type SortKey = "orders" | "revenue" | "rating";
type Tab =
  | "overview"
  | "services"
  | "bookings"
  | "merchant"
  | "dp"
  | "flows"
  | "lending"
  | "payments";

const TOOLTIP_STYLE = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  fontSize: 12,
};

// ── Lending Analytics Tab ──────────────────────────────────────────────

function LendingAnalyticsTab() {
  const { data: allItems = [], isLoading } = useGetAllLendingItems();
  const { data: dueSoon = [] } = useGetLendingItemsDueSoon();

  const active = allItems.filter((i) => i.status === "active").length;
  const overdue = allItems.filter((i) => i.status === "overdue").length;
  const returned = allItems.filter((i) => i.status === "returned").length;

  const categoryMap = allItems.reduce((acc: Record<string, number>, item) => {
    const k = item.itemCategory || "other";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  const freqMap = allItems.reduce((acc: Record<string, number>, item) => {
    const k = item.reminderFrequency || "monthly";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  const freqData = Object.entries(freqMap).map(([name, count]) => ({
    name,
    count,
  }));

  const lenderMap = allItems.reduce((acc: Record<string, number>, item) => {
    if (item.status === "active")
      acc[item.lenderPhone] = (acc[item.lenderPhone] ?? 0) + 1;
    return acc;
  }, {});
  const topLenders = Object.entries(lenderMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const borrowerMap = allItems.reduce((acc: Record<string, number>, item) => {
    if (item.status === "active")
      acc[item.borrowerPhone] = (acc[item.borrowerPhone] ?? 0) + 1;
    return acc;
  }, {});
  const topBorrowers = Object.entries(borrowerMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#a855f7",
    "#ef4444",
    "#0ea5e9",
  ];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );

  return (
    <div className="space-y-6" data-ocid="analytics.lending">
      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Items",
            value: allItems.length,
            color: "bg-primary/10 text-primary",
          },
          {
            label: "Active",
            value: active,
            color: "bg-emerald-100 text-emerald-700",
          },
          {
            label: "Overdue",
            value: overdue,
            color: "bg-red-100 text-red-700",
          },
          {
            label: "Due Soon (7d)",
            value: dueSoon.length,
            color: "bg-amber-100 text-amber-700",
          },
          {
            label: "Returned",
            value: returned,
            color: "bg-blue-100 text-blue-700",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4 shadow-sm"
          >
            <p
              className={`text-2xl font-bold tabular-nums ${color.split(" ")[1]}`}
            >
              {value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category pie */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Items by Category
          </h3>
          {categoryData.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No data yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {categoryData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[categoryData.indexOf(entry) % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Reminder frequency bar */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Reminder Frequency Distribution
          </h3>
          {freqData.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No data yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={freqData}
                margin={{ top: 8, right: 8, left: -20, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top lenders */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Top Lenders (Active)
          </h3>
          {topLenders.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4">
              No active loans yet
            </p>
          ) : (
            <div className="space-y-2">
              {topLenders.map(([phone, count], i) => (
                <div key={phone} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-5 text-right">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-xs font-mono truncate">
                    {phone}
                  </span>
                  <span className="text-xs font-semibold tabular-nums">
                    {count} item{count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top borrowers */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Top Borrowers (Active)
          </h3>
          {topBorrowers.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4">
              No active borrows yet
            </p>
          ) : (
            <div className="space-y-2">
              {topBorrowers.map(([phone, count], i) => (
                <div key={phone} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-5 text-right">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-xs font-mono truncate">
                    {phone}
                  </span>
                  <span className="text-xs font-semibold tabular-nums">
                    {count} item{count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Order status colors ───────────────────────────────────────────────────────
const ORDER_STATUS_COLORS: Record<string, string> = {
  completed: "#22c55e",
  "in transit": "#3b82f6",
  accepted: "#a855f7",
  pending: "#f59e0b",
  cancelled: "#ef4444",
};

function exportCSV(
  topMerchants: {
    merchantName: string;
    orderCount: number;
    revenue: number;
    avgRating: number;
  }[],
) {
  const header = "Merchant Name,Orders,Revenue,Avg Rating\n";
  const rows = topMerchants
    .map(
      (m) => `"${m.merchantName}",${m.orderCount},${m.revenue},${m.avgRating}`,
    )
    .join("\n");
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
  color = "text-primary",
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div>
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div
      className="py-8 text-center text-sm text-muted-foreground"
      data-ocid="analytics.empty_state"
    >
      <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
      {label}
    </div>
  );
}

// ─── Payment Services Tab ──────────────────────────────────────────────────────────────

function PaymentServicesTab({
  busBookingsRaw,
  trainBookingsRaw,
  flightBookingsRaw,
  utilTxnsRaw,
  apiLogsRaw,
}: {
  busBookingsRaw: Record<string, unknown>[];
  trainBookingsRaw: Record<string, unknown>[];
  flightBookingsRaw: Record<string, unknown>[];
  utilTxnsRaw: Record<string, unknown>[];
  apiLogsRaw: Record<string, unknown>[];
}) {
  const totalBookings =
    busBookingsRaw.length + trainBookingsRaw.length + flightBookingsRaw.length;
  const totalTxns = utilTxnsRaw.length;
  const totalRevenue =
    [...busBookingsRaw, ...trainBookingsRaw, ...flightBookingsRaw].reduce(
      (s, r) => s + Number(r.fare ?? 0),
      0,
    ) + utilTxnsRaw.reduce((s, r) => s + Number(r.amount ?? 0), 0);
  const successCount = [
    ...busBookingsRaw,
    ...trainBookingsRaw,
    ...flightBookingsRaw,
    ...utilTxnsRaw,
  ].filter((r) => {
    const st = String(r.status ?? r.paymentStatus ?? "").toLowerCase();
    return st === "confirmed" || st === "success";
  }).length;
  const totalAll = totalBookings + totalTxns;
  const successRate =
    totalAll > 0 ? Math.round((successCount / totalAll) * 100) : 0;

  const bookingBarData = [
    {
      name: "Bus",
      count: busBookingsRaw.length,
      revenue: busBookingsRaw.reduce((s, r) => s + Number(r.fare ?? 0), 0),
    },
    {
      name: "Train",
      count: trainBookingsRaw.length,
      revenue: trainBookingsRaw.reduce((s, r) => s + Number(r.fare ?? 0), 0),
    },
    {
      name: "Flight",
      count: flightBookingsRaw.length,
      revenue: flightBookingsRaw.reduce((s, r) => s + Number(r.fare ?? 0), 0),
    },
  ];

  const utilBreak: Record<string, { count: number; sum: number }> = {};
  for (const r of utilTxnsRaw) {
    const svc = String(r.serviceType ?? "other");
    if (!utilBreak[svc]) utilBreak[svc] = { count: 0, sum: 0 };
    utilBreak[svc].count += 1;
    utilBreak[svc].sum += Number(r.amount ?? 0);
  }
  const utilBarData = Object.entries(utilBreak).map(([name, d]) => ({
    name,
    count: d.count,
    amount: d.sum,
  }));

  const statusCount: Record<string, number> = {};
  for (const r of [
    ...busBookingsRaw,
    ...trainBookingsRaw,
    ...flightBookingsRaw,
    ...utilTxnsRaw,
  ]) {
    const s = String(r.status ?? r.paymentStatus ?? "pending");
    statusCount[s] = (statusCount[s] ?? 0) + 1;
  }
  const statusDonut = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));
  const DONUT_COLORS: Record<string, string> = {
    confirmed: "#22c55e",
    success: "#22c55e",
    pending: "#f59e0b",
    failed: "#ef4444",
    cancelled: "#ef4444",
    refunded: "#3b82f6",
  };

  const recent = [
    ...busBookingsRaw.map((r) => ({
      type: "Bus",
      route: `${String(r.source ?? "")} → ${String(r.destination ?? "")}`,
      customer: String(r.customerId ?? r.passengerPhone ?? "—").slice(0, 12),
      amount: `₹${Number(r.fare ?? 0).toLocaleString("en-IN")}`,
      status: String(r.status ?? "pending"),
      date: r.createdAt
        ? new Date(Number(r.createdAt)).toLocaleDateString("en-IN")
        : "—",
    })),
    ...trainBookingsRaw.map((r) => ({
      type: "Train",
      route: `${String(r.source ?? "")} → ${String(r.destination ?? "")}`,
      customer: String(r.customerId ?? "—").slice(0, 12),
      amount: `₹${Number(r.fare ?? 0).toLocaleString("en-IN")}`,
      status: String(r.status ?? "pending"),
      date: r.createdAt
        ? new Date(Number(r.createdAt)).toLocaleDateString("en-IN")
        : "—",
    })),
    ...flightBookingsRaw.map((r) => ({
      type: "Flight",
      route: `${String(r.source ?? "")} → ${String(r.destination ?? "")}`,
      customer: String(r.customerId ?? "—").slice(0, 12),
      amount: `₹${Number(r.fare ?? 0).toLocaleString("en-IN")}`,
      status: String(r.status ?? "pending"),
      date: r.createdAt
        ? new Date(Number(r.createdAt)).toLocaleDateString("en-IN")
        : "—",
    })),
  ].slice(0, 10);

  const healthMap: Record<
    string,
    {
      total: number;
      success: number;
      errors: number;
      latencies: number[];
      lastTs: number;
    }
  > = {};
  for (const l of apiLogsRaw) {
    const svc = String(l.serviceType ?? "unknown");
    if (!healthMap[svc])
      healthMap[svc] = {
        total: 0,
        success: 0,
        errors: 0,
        latencies: [],
        lastTs: 0,
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
    avgLatency: d.latencies.length
      ? Math.round(d.latencies.reduce((a, b) => a + b, 0) / d.latencies.length)
      : 0,
    lastCalled: d.lastTs ? new Date(d.lastTs).toLocaleString("en-IN") : "—",
  }));

  if (totalAll === 0) {
    return (
      <div
        className="bg-card border border-border rounded-xl p-8 text-center"
        data-ocid="analytics.payments.empty_state"
      >
        <CreditCard className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-sm font-medium text-muted-foreground">
          No PaySprint transactions yet. Configure credentials in PaySprint API
          settings and start taking bookings!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="analytics.payments">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Total Bookings",
            value: String(totalBookings),
            color: "text-blue-600",
          },
          {
            label: "Total Transactions",
            value: String(totalTxns),
            color: "text-violet-600",
          },
          {
            label: "Total Revenue",
            value: `₹${(totalRevenue / 1000).toFixed(1)}K`,
            color: "text-emerald-600",
          },
          {
            label: "Success Rate",
            value: `${successRate}%`,
            color:
              successRate >= 80
                ? "text-emerald-600"
                : successRate >= 50
                  ? "text-amber-600"
                  : "text-red-500",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4 shadow-sm"
          >
            <p className={`text-2xl font-bold tabular-nums ${color}`}>
              {value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <SectionHeader
            icon={BarChart3}
            title="Bookings by Type"
            subtitle="Count and revenue"
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={bookingBarData}
              margin={{ top: 0, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                formatter={(v: number, n: string) => [
                  n === "revenue" ? `₹${v.toLocaleString("en-IN")}` : v,
                  n,
                ]}
              />
              <Legend iconSize={8} />
              <Bar
                dataKey="count"
                name="Count"
                fill="oklch(0.55 0.17 250)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="oklch(0.65 0.17 148)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <SectionHeader
            icon={Activity}
            title="Utility Payments"
            subtitle="By service category"
          />
          {utilBarData.length === 0 ? (
            <EmptyState label="No utility transactions yet" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={utilBarData}
                margin={{ top: 0, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v: number, n: string) => [
                    n === "amount" ? `₹${v.toLocaleString("en-IN")}` : v,
                    n,
                  ]}
                />
                <Legend iconSize={8} />
                <Bar
                  dataKey="count"
                  name="Count"
                  fill="oklch(0.62 0.17 200)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="amount"
                  name="Amount"
                  fill="oklch(0.65 0.2 55)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Donut + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <SectionHeader icon={TrendingUp} title="Transaction Status" />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusDonut}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {statusDonut.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={DONUT_COLORS[entry.name.toLowerCase()] ?? "#94a3b8"}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v: string) => (
                  <span style={{ fontSize: "11px" }}>{v}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/20">
            <h3 className="font-semibold text-sm text-foreground">
              Recent Bookings (Last 10)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {[
                    "Type",
                    "Route",
                    "Customer",
                    "Amount",
                    "Status",
                    "Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-xs text-muted-foreground"
                      data-ocid="analytics.payments.recent.empty_state"
                    >
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  recent.map((b, i) => {
                    const sCls =
                      b.status.toLowerCase() === "confirmed" ||
                      b.status.toLowerCase() === "success"
                        ? "bg-emerald-100 text-emerald-700"
                        : b.status.toLowerCase() === "failed" ||
                            b.status.toLowerCase() === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700";
                    return (
                      <tr
                        key={`${b.type}-${b.route}-${b.date}`}
                        className="border-b border-border/40 hover:bg-muted/20"
                        data-ocid={`analytics.payments.booking.${i + 1}`}
                      >
                        <td className="px-3 py-2 font-medium text-foreground">
                          {b.type}
                        </td>
                        <td className="px-3 py-2 max-w-[120px] truncate text-foreground">
                          {b.route}
                        </td>
                        <td className="px-3 py-2 font-mono text-muted-foreground">
                          {b.customer}
                        </td>
                        <td className="px-3 py-2 tabular-nums font-semibold">
                          {b.amount}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${sCls}`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                          {b.date}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Service Health */}
      <div
        className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
        data-ocid="analytics.payments.service-health"
      >
        <div className="px-5 py-3 border-b border-border bg-muted/20">
          <h3 className="font-semibold text-sm text-foreground">
            PaySprint Service Health
          </h3>
          <p className="text-xs text-muted-foreground">
            API statistics grouped by service type
          </p>
        </div>
        {healthRows.length === 0 ? (
          <EmptyState label="No API logs yet. Logs appear after PaySprint API calls are made." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {[
                    "Service",
                    "Total Calls",
                    "Success",
                    "Errors",
                    "Avg Latency",
                    "Last Called",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {healthRows.map((row, i) => (
                  <tr
                    key={row.svc}
                    className="border-b border-border/40 hover:bg-muted/20"
                    data-ocid={`analytics.payments.health.${i + 1}`}
                  >
                    <td className="px-4 py-2.5 font-medium text-foreground">
                      {row.svc}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums">{row.total}</td>
                    <td className="px-4 py-2.5 tabular-nums text-emerald-600">
                      {row.success}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={
                          row.errors > 0
                            ? "text-red-500 font-semibold"
                            : "text-muted-foreground"
                        }
                      >
                        {row.errors}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-muted-foreground">
                      {row.avgLatency}ms
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">
                      {row.lastCalled}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [merchantSearch, setMerchantSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("orders");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useDashboardStats();
  const { data: monthlyStats = [], isLoading: monthlyLoading } =
    useMonthlyStats(year, month + 1);
  const { data: topMerchants = [], isLoading: merchantsLoading } =
    useTopMerchants(10);
  const { data: enhancedData } = useEnhancedAnalytics();
  const { data: merchantAnalytics } = useMerchantAnalytics(
    merchantSearch || "m1",
  );
  const { data: dpAnalytics } = useDPAnalytics("dp1");
  const { data: allMerchants = [] } = useMerchants();

  // Real data for Flows & Bots tab
  const { data: flowSummary, isLoading: flowSummaryLoading } =
    useFlowAgentSummary();
  const { data: waLogs = [] } = useBotLogs("whatsapp");
  const { data: tgLogs = [] } = useBotLogs("telegram");
  const { data: smsLogs = [] } = useBotLogs("sms");
  const { data: scriptResults = [] } = useGetScriptRunResults();

  // ── PaySprint data for payments tab ───────────────────────────────────────────
  const { data: busBookingsRaw = [] } = useGetAllBusBookings();
  const { data: trainBookingsRaw = [] } = useGetAllTrainBookings();
  const { data: flightBookingsRaw = [] } = useGetAllFlightBookings();
  const { data: utilTxnsRaw = [] } = useGetAllUtilityTransactions();
  const { data: apiLogsRaw = [] } = useGetAllPaySprintAPILogs();

  // ── Derived bot activity from real logs ───────────────────────────────────
  const botActivity = useMemo(() => {
    const now24h = Date.now() - 86_400_000;
    function countChannel(logs: typeof waLogs) {
      const recent = logs.filter((l) => l.timestamp > now24h);
      return {
        total: recent.length,
        errors: recent.filter((l) => l.status === "error").length,
      };
    }
    return [
      {
        channel: "WhatsApp",
        icon: MessageSquare,
        color: "text-emerald-500",
        bg: "bg-emerald-100",
        ...countChannel(waLogs),
      },
      {
        channel: "Telegram",
        icon: Bot,
        color: "text-blue-500",
        bg: "bg-blue-100",
        ...countChannel(tgLogs),
      },
      {
        channel: "SMS",
        icon: MessageSquare,
        color: "text-purple-500",
        bg: "bg-purple-100",
        ...countChannel(smsLogs),
      },
    ];
  }, [waLogs, tgLogs, smsLogs]);

  // ── Derived script executor summary from real results ─────────────────────
  const scriptSummary = useMemo(() => {
    if (!scriptResults.length) return null;
    const totalRuns = scriptResults.length;
    const passedRuns = scriptResults.filter(
      (r) => r.overallResult === "passed",
    ).length;
    const passRate = Math.round((passedRuns / totalRuns) * 100);
    const lastRun = scriptResults[0]
      ? new Date(scriptResults[0].ranAt).toLocaleString("en-IN", {
          dateStyle: "short",
          timeStyle: "short",
        })
      : "—";
    return { totalRuns, passRate, lastRun };
  }, [scriptResults]);

  // ── Derived order status breakdown from stats ─────────────────────────────
  const orderStatusData = useMemo(() => {
    if (!stats) return [];
    const total = Number(stats.totalOrders ?? 0);
    const active = Number(stats.activeOrders ?? 0);
    const completed = Math.max(0, total - active);
    if (total === 0) return [];
    return [
      {
        name: "Completed",
        value: completed,
        color: ORDER_STATUS_COLORS.completed,
      },
      { name: "Active", value: active, color: ORDER_STATUS_COLORS.accepted },
    ];
  }, [stats]);

  const top5Merchants = useMemo(
    () =>
      [...allMerchants]
        .sort((a, b) => Number(b.orderCount ?? 0) - Number(a.orderCount ?? 0))
        .slice(0, 5),
    [allMerchants],
  );
  const top5MaxOrders = top5Merchants.length
    ? Number(top5Merchants[0].orderCount ?? 0) || 1
    : 1;

  const totalMonthlyOrders = monthlyStats.reduce((s, d) => s + d.orderCount, 0);
  const totalMonthlyRevenue = monthlyStats.reduce((s, d) => s + d.revenue, 0);

  const dailyData = monthlyStats.map((d) => ({
    day: d.day,
    orders: d.orderCount,
    revenue: d.revenue,
  }));

  const sortedTopMerchants = useMemo(() => {
    return [...topMerchants].sort((a, b) => {
      const av = a[sortKey as keyof typeof a] as number;
      const bv = b[sortKey as keyof typeof b] as number;
      return sortDir === "desc" ? bv - av : av - bv;
    });
  }, [topMerchants, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
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

  const dailyActiveUsers =
    enhancedData?.dailyActiveUsers ?? safeCount(stats?.totalUsers);
  void merchantAnalytics;

  const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "services", label: "Service Modules", icon: HeartPulse },
    { key: "bookings", label: "Bookings", icon: Calendar },
    { key: "merchant", label: "Merchants", icon: Store },
    { key: "dp", label: "Delivery", icon: Truck },
    { key: "flows", label: "Flows & Bots", icon: Bot },
    { key: "lending", label: "Lending", icon: TrendingUp },
    { key: "payments", label: "Payment Services", icon: CreditCard },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Live performance across all modules
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchStats()}
            className="gap-1.5"
            data-ocid="analytics.refresh_button"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
          <div className="flex items-center gap-1 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="text-sm font-semibold text-foreground w-28 text-center tabular-nums">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              disabled={year === now.getFullYear() && month === now.getMonth()}
              className="p-1 hover:bg-muted rounded transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1.5 bg-muted/40 p-1 rounded-xl border border-border flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            data-ocid={`analytics.tab.${tab.key}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              activeTab === tab.key
                ? "bg-card text-foreground border-border shadow-sm"
                : "text-muted-foreground border-transparent hover:text-foreground hover:bg-card/60"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top metrics row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
            data-ocid="analytics.overview.metrics-row"
          >
            <StatCard
              title="Total Users"
              value={safeCount(stats?.totalUsers)}
              icon={Users}
              loading={statsLoading}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Total Orders"
              value={totalMonthlyOrders}
              icon={ShoppingCart}
              loading={monthlyLoading}
              change={0}
              changeLabel="this month"
              iconBg="bg-indigo-100"
              iconColor="text-indigo-600"
            />
            <StatCard
              title="Revenue"
              value={`₹${(totalMonthlyRevenue / 1000).toFixed(0)}K`}
              icon={IndianRupee}
              loading={monthlyLoading}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
            />
            <StatCard
              title="Merchants"
              value={safeCount(stats?.totalMerchants)}
              icon={Store}
              loading={statsLoading}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
            />
            <StatCard
              title="Delivery Partners"
              value={safeCount(stats?.totalDeliveryPartners)}
              icon={Truck}
              loading={statsLoading}
              iconBg="bg-cyan-100"
              iconColor="text-cyan-600"
            />
          </div>

          {/* DAU + Order Status donut */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col items-center justify-center gap-2"
              data-ocid="analytics.overview.dau-card"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-foreground tabular-nums">
                {dailyActiveUsers.toLocaleString("en-IN")}
              </p>
              <p className="text-sm font-medium text-foreground">
                Daily Active Users
              </p>
              <p className="text-xs text-muted-foreground">
                Active users today
              </p>
            </div>

            <div
              className="bg-card border border-border rounded-xl p-5 shadow-sm"
              data-ocid="analytics.overview.order-status-donut"
            >
              <h3 className="font-display font-semibold text-foreground mb-3">
                Order Status
              </h3>
              {statsLoading ? (
                <Skeleton className="h-32 w-full" />
              ) : orderStatusData.length === 0 ? (
                <EmptyState label="No order data yet" />
              ) : (
                <div className="flex items-center gap-3">
                  <ResponsiveContainer width={130} height={130}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {orderStatusData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-1">
                    {orderStatusData.map((s) => (
                      <div
                        key={s.name}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: s.color }}
                        />
                        <span className="text-muted-foreground flex-1">
                          {s.name}
                        </span>
                        <span className="font-medium tabular-nums">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              className="bg-card border border-border rounded-xl p-5 shadow-sm"
              data-ocid="analytics.overview.daily-orders-chart"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">
                Daily Orders — {MONTHS[month]}
              </h3>
              {monthlyLoading ? (
                <div className="h-52 bg-muted animate-pulse rounded-lg" />
              ) : dailyData.length === 0 ? (
                <EmptyState label="No order data for this month" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={dailyData}
                    margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      interval={4}
                    />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v: number, name: string) => [
                        name === "revenue"
                          ? `₹${v.toLocaleString("en-IN")}`
                          : v,
                        name === "revenue" ? "Revenue" : "Orders",
                      ]}
                    />
                    <Bar
                      dataKey="orders"
                      fill="oklch(0.55 0.17 148)"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div
              className="bg-card border border-border rounded-xl p-5 shadow-sm"
              data-ocid="analytics.overview.daily-revenue-chart"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">
                Daily Revenue — {MONTHS[month]}
              </h3>
              {monthlyLoading ? (
                <div className="h-52 bg-muted animate-pulse rounded-lg" />
              ) : dailyData.length === 0 ? (
                <EmptyState label="No revenue data for this month" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={dailyData}
                    margin={{ top: 0, right: 0, bottom: 0, left: -10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      interval={4}
                    />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v: number) => [
                        `₹${v.toLocaleString("en-IN")}`,
                        "Revenue",
                      ]}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="oklch(0.65 0.17 202)"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Top Merchants */}
          <div
            className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
            data-ocid="analytics.overview.top-merchants"
          >
            <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Top Merchants
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sorted by most orders
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Top {top5Merchants.length}
              </Badge>
            </div>
            {top5Merchants.length === 0 ? (
              <div
                className="px-5 py-8 text-center text-sm text-muted-foreground"
                data-ocid="analytics.overview.top-merchants.empty_state"
              >
                No merchant data yet
              </div>
            ) : (
              <div className="divide-y divide-border">
                {top5Merchants.map((m, i) => {
                  const orderCount = Number(m.orderCount ?? 0);
                  const customerCount = Number(m.customerCount ?? 0);
                  const pct = Math.round((orderCount / top5MaxOrders) * 100);
                  return (
                    <div
                      key={m.id}
                      className="flex items-center gap-4 px-5 py-3"
                      data-ocid={`analytics.overview.merchant.${i + 1}`}
                    >
                      <span className="text-sm font-bold text-muted-foreground w-5 tabular-nums shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {m.businessName}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <ShoppingCart className="w-3 h-3" />
                            {orderCount.toLocaleString("en-IN")} orders
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {customerCount.toLocaleString("en-IN")} customers
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold tabular-nums text-primary">
                          {orderCount.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          orders
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SERVICE MODULES ───────────────────────────────────────────────── */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
            data-ocid="analytics.services.overview"
          >
            <SectionHeader
              icon={BarChart3}
              title="Service Modules"
              subtitle="Orders and activity by service category"
            />
            <EmptyState label="Service category analytics will appear here once orders are placed across modules" />
          </div>

          {/* City/Module controls summary */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            data-ocid="analytics.services.city-controls"
          >
            {[
              {
                label: "Total Users",
                value: safeCount(stats?.totalUsers),
                color: "text-blue-600",
                bg: "bg-blue-100",
              },
              {
                label: "Total Orders",
                value: safeCount(stats?.totalOrders),
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                label: "Merchants",
                value: safeCount(stats?.totalMerchants),
                color: "text-amber-600",
                bg: "bg-amber-100",
              },
              {
                label: "Delivery Partners",
                value: safeCount(stats?.totalDeliveryPartners),
                color: "text-cyan-600",
                bg: "bg-cyan-100",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border rounded-xl p-4 shadow-sm text-center"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center mx-auto mb-2`}
                />
                <p className={`text-2xl font-bold ${item.color}`}>
                  {statsLoading ? "—" : item.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BOOKINGS ──────────────────────────────────────────────────────── */}
      {activeTab === "bookings" && (
        <div className="space-y-6">
          <div
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
            data-ocid="analytics.bookings.healthcare"
          >
            <div className="flex items-center gap-2 mb-3">
              <HeartPulse className="w-4 h-4 text-pink-500" />
              <h3 className="font-semibold text-sm text-foreground">
                Top Healthcare Specializations
              </h3>
            </div>
            <EmptyState label="Healthcare booking analytics will appear once appointments are created" />
          </div>

          <div
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
            data-ocid="analytics.bookings.tours"
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-violet-500" />
              <h3 className="font-semibold text-sm text-foreground">
                Top Tour Destinations
              </h3>
            </div>
            <EmptyState label="Tour booking analytics will appear once bookings are made" />
          </div>

          <div
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
            data-ocid="analytics.bookings.services"
          >
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="w-4 h-4 text-teal-500" />
              <h3 className="font-semibold text-sm text-foreground">
                Top Professional Service Skills
              </h3>
            </div>
            <EmptyState label="Professional service analytics will appear once service bookings are created" />
          </div>
        </div>
      )}

      {/* ── MERCHANT ──────────────────────────────────────────────────────── */}
      {activeTab === "merchant" && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={merchantSearch}
                onChange={(e) => setMerchantSearch(e.target.value)}
                placeholder="Search merchant…"
                className="pl-9"
                data-ocid="analytics.merchant.search_input"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => exportCSV(sortedTopMerchants)}
              className="gap-1.5"
              data-ocid="analytics.merchant.export_button"
            >
              <Download className="w-4 h-4" /> Export
            </Button>
          </div>

          {merchantAnalytics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Top Products",
                  value: merchantAnalytics.topProductsByProfit?.length ?? 0,
                  color: "text-emerald-600",
                },
                {
                  label: "Running Products",
                  value: merchantAnalytics.runningProducts?.length ?? 0,
                  color: "text-blue-600",
                },
                {
                  label: "Retention Rate",
                  value: `${((merchantAnalytics.customerRetentionRate ?? 0) * 100).toFixed(0)}%`,
                  color: "text-primary",
                },
                {
                  label: "Branches",
                  value: merchantAnalytics.branchComparison?.length ?? 0,
                  color: "text-amber-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-4 shadow-sm"
                >
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className={`text-xl font-bold mt-1 ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div
            className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
            data-ocid="analytics.merchant.table"
          >
            <div className="px-5 py-3 border-b border-border bg-muted/20">
              <h3 className="font-semibold text-sm text-foreground">
                Merchant Performance — Sorted by Most Orders
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    {[
                      { label: "Merchant", key: null },
                      { label: "Orders", key: "orders" as SortKey },
                      { label: "Revenue", key: "revenue" as SortKey },
                      { label: "Avg Rating", key: "rating" as SortKey },
                    ].map((col) => (
                      <th
                        key={col.label}
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                      >
                        {col.key ? (
                          <button
                            type="button"
                            onClick={() => handleSort(col.key!)}
                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                          >
                            {col.label}
                            <ArrowUpRight
                              className={`w-3 h-3 transition-transform ${sortKey === col.key ? (sortDir === "asc" ? "rotate-180" : "") : "opacity-30"}`}
                            />
                          </button>
                        ) : (
                          col.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {merchantsLoading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center">
                        <Skeleton className="h-4 w-48 mx-auto" />
                      </td>
                    </tr>
                  ) : sortedTopMerchants.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-muted-foreground text-xs"
                        data-ocid="analytics.merchant.empty_state"
                      >
                        No merchant data available yet.
                      </td>
                    </tr>
                  ) : (
                    sortedTopMerchants.map((m, idx) => (
                      <tr
                        key={`${m.merchantName}-${idx}`}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`analytics.merchant.row.${idx + 1}`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {m.merchantName}
                        </td>
                        <td className="px-4 py-3 tabular-nums font-medium">
                          {m.orderCount}
                        </td>
                        <td className="px-4 py-3 tabular-nums font-medium">
                          ₹{m.revenue.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {m.avgRating.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── DELIVERY PARTNER ─────────────────────────────────────────────── */}
      {activeTab === "dp" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Completion Rate",
                value: dpAnalytics
                  ? `${dpAnalytics.completionRate.toFixed(0)}%`
                  : "—",
                color: "text-emerald-600",
              },
              {
                label: "Avg Delivery Time",
                value: dpAnalytics
                  ? `${dpAnalytics.avgDeliveryMinutes.toFixed(0)} min`
                  : "—",
                color: "text-blue-600",
              },
              {
                label: "Avg Rating",
                value: dpAnalytics
                  ? `⭐ ${dpAnalytics.avgRating.toFixed(1)}`
                  : "—",
                color: "text-primary",
              },
              {
                label: "Coverage Areas",
                value: dpAnalytics ? `${dpAnalytics.areaHeatmap.length}` : "—",
                color: "text-amber-600",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-4 shadow-sm"
              >
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`text-xl font-bold mt-1 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div
            className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
            data-ocid="analytics.dp.area-heatmap"
          >
            <div className="px-5 py-3 border-b border-border bg-muted/20">
              <h3 className="font-semibold text-sm text-foreground">
                Delivery Area Heatmap
              </h3>
              <p className="text-xs text-muted-foreground">
                Orders per area — last 30 days
              </p>
            </div>
            {dpAnalytics?.areaHeatmap && dpAnalytics.areaHeatmap.length > 0 ? (
              <div className="divide-y divide-border">
                {dpAnalytics.areaHeatmap.slice(0, 6).map((area, i: number) => {
                  const deliveries =
                    typeof area === "object" && area !== null && "count" in area
                      ? Number((area as Record<string, unknown>).count)
                      : 0;
                  const areaName =
                    typeof area === "object" && area !== null && "area" in area
                      ? String((area as Record<string, unknown>).area)
                      : `Area ${i + 1}`;
                  const maxD = dpAnalytics.areaHeatmap.reduce((acc, a) => {
                    const c =
                      typeof a === "object" && a !== null && "count" in a
                        ? Number((a as Record<string, unknown>).count)
                        : 0;
                    return Math.max(acc, c);
                  }, 1);
                  const pct = (deliveries / maxD) * 100;
                  return (
                    <div
                      key={areaName}
                      className="flex items-center gap-3 px-5 py-3"
                      data-ocid={`analytics.dp.area.${i + 1}`}
                    >
                      <span className="text-xs text-muted-foreground w-5 tabular-nums">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground w-36 shrink-0">
                        {areaName}
                      </span>
                      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold tabular-nums text-foreground w-12 text-right">
                        {deliveries}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState label="Area heatmap will appear once deliveries are completed" />
            )}
          </div>
        </div>
      )}

      {/* ── FLOWS & BOTS ──────────────────────────────────────────────────── */}
      {activeTab === "flows" && (
        <div className="space-y-6">
          {/* Flow Health */}
          <div
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
            data-ocid="analytics.flows.health"
          >
            <SectionHeader
              icon={Activity}
              title="Flow Health"
              subtitle="Registry diagnostics summary"
              color="text-emerald-600"
            />
            {flowSummaryLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            ) : !flowSummary ? (
              <EmptyState label="Run Flow Agent diagnostics to see health summary" />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Flows",
                    value: flowSummary.totalFlows,
                    color: "text-foreground",
                    bg: "bg-muted",
                  },
                  {
                    label: "Passing",
                    value: flowSummary.passed,
                    color: "text-emerald-600",
                    bg: "bg-emerald-100",
                  },
                  {
                    label: "Failed",
                    value: flowSummary.failed,
                    color: "text-red-500",
                    bg: "bg-red-100",
                  },
                  {
                    label: "Warnings",
                    value: flowSummary.warnings,
                    color: "text-amber-600",
                    bg: "bg-amber-100",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`${item.bg} rounded-xl p-4 text-center`}
                    data-ocid={`analytics.flows.${item.label.toLowerCase().replace(" ", "_")}`}
                  >
                    <p className={`text-2xl font-bold ${item.color}`}>
                      {item.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bot Activity */}
          <div
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
            data-ocid="analytics.flows.bot-activity"
          >
            <SectionHeader
              icon={Bot}
              title="Bot Activity (Last 24h)"
              subtitle="Messages across all channels"
              color="text-blue-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {botActivity.map((bot) => (
                <div
                  key={bot.channel}
                  className={`${bot.bg} dark:bg-opacity-20 rounded-xl p-4 flex items-start gap-3`}
                  data-ocid={`analytics.flows.bot.${bot.channel.toLowerCase()}`}
                >
                  <bot.icon
                    className={`w-6 h-6 ${bot.color} flex-shrink-0 mt-0.5`}
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {bot.channel}
                    </p>
                    <p className="text-2xl font-bold text-foreground tabular-nums">
                      {bot.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      messages ·{" "}
                      <span className="text-red-500">{bot.errors} errors</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Script Executor Summary */}
          <div
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
            data-ocid="analytics.flows.script-executor"
          >
            <SectionHeader
              icon={Terminal}
              title="Script Executor Summary"
              subtitle="Automated test run statistics"
              color="text-purple-600"
            />
            {!scriptSummary ? (
              <EmptyState label="Run the Script Executor to see test statistics" />
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground tabular-nums">
                      {scriptSummary.totalRuns}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total Runs
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-600 tabular-nums">
                      {scriptSummary.passRate}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pass Rate
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-muted-foreground mt-2">
                      {scriptSummary.lastRun}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last Run
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${scriptSummary.passRate}%` }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── LENDING ─────────────────────────────────────────────────────────────── */}
      {activeTab === "lending" && <LendingAnalyticsTab />}
      {activeTab === "payments" && (
        <PaymentServicesTab
          busBookingsRaw={busBookingsRaw as Record<string, unknown>[]}
          trainBookingsRaw={trainBookingsRaw as Record<string, unknown>[]}
          flightBookingsRaw={flightBookingsRaw as Record<string, unknown>[]}
          utilTxnsRaw={utilTxnsRaw as Record<string, unknown>[]}
          apiLogsRaw={apiLogsRaw as Record<string, unknown>[]}
        />
      )}
    </div>
  );
}
