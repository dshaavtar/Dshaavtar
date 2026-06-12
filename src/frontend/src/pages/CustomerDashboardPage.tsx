import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  Briefcase,
  Bus,
  Car,
  Coffee,
  CreditCard,
  Factory,
  Flame,
  Fuel,
  HandCoins,
  Heart,
  Home,
  Languages,
  Package,
  Plane,
  Plus,
  Receipt,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  Star,
  Stethoscope,
  Train,
  TrendingUp,
  User,
  UserPlus,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CommunitySection from "../components/CommunitySection";
import DashboardLinkBanner from "../components/DashboardLinkBanner";
import LendingSection from "../components/LendingSection";
import {
  useFamilyMembers,
  useGetAllBusBookings,
  useGetAllFlightBookings,
  useGetAllTrainBookings,
  useGetAllUtilityTransactions,
  useOrdersByCustomer,
  usePlans,
} from "../hooks/useBackend";
import { useLanguageLearning } from "../hooks/useLanguageLearning";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RecentActivity {
  id: string;
  category: string;
  title: string;
  date: string;
  amount: number;
  status: "delivered" | "confirmed" | "pending" | "completed";
  icon: React.ElementType;
  color: string;
}
interface CategoryOrder {
  label: string;
  count: number;
  lastDate: string;
  icon: React.ElementType;
  color: string;
}

// ─── Category colour palette (static metadata, no spend amounts) ─────────────

const CATEGORY_COLORS: Record<string, string> = {
  Products: "#a855f7",
  Healthcare: "#ec4899",
  Travel: "#3b82f6",
  Services: "#f59e0b",
  Transport: "#06b6d4",
  Food: "#22c55e",
};
// ─── Category icon/colour metadata (no hardcoded counts/dates) ───────────────

const CATEGORY_META: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  Products: {
    icon: Package,
    color: "text-violet-500 bg-violet-100 dark:bg-violet-900/30",
  },
  Healthcare: {
    icon: Stethoscope,
    color: "text-pink-500 bg-pink-100 dark:bg-pink-900/30",
  },
  Travel: {
    icon: Car,
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
  },
  Services: {
    icon: Wrench,
    color: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
  },
  Transport: {
    icon: Car,
    color: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30",
  },
  Food: {
    icon: Coffee,
    color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30",
  },
};

const TOOLTIP_STYLE = {
  background: "var(--color-card, #1e293b)",
  border: "1px solid var(--color-border, #334155)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--color-card-foreground, #f1f5f9)",
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

function ActivityStatusBadge({ status }: { status: RecentActivity["status"] }) {
  const MAP: Record<RecentActivity["status"], string> = {
    delivered:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    confirmed:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    completed:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${MAP[status]}`}
    >
      {status}
    </span>
  );
}

// ─── My Learning Section ────────────────────────────────────────────────────

function MyLearningSection({ customerId }: { customerId: string | undefined }) {
  const ll = useLanguageLearning();
  const [enrollments, setEnrollments] = useState<
    import("../hooks/useLanguageLearning").NormalisedEnrollment[]
  >([]);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    Promise.all([
      ll.getUserEnrollments(customerId).catch(() => []),
      ll.getDailyStreak(customerId).catch(() => 0),
    ])
      .then(([e, s]) => {
        if (cancelled) return;
        setEnrollments(e);
        setStreak(Number(s));
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg =
          err instanceof Error
            ? err.message
            : ((err as { errorDetail?: string })?.errorDetail ??
              "Failed to load");
        setError(msg);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [customerId, ll.getUserEnrollments, ll.getDailyStreak]);

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 shadow-card"
      data-ocid="customer.my-learning-section"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-500" /> My Learning
        </h3>
        {streak > 0 && (
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
            data-ocid="customer.my-learning.streak_badge"
          >
            <Flame className="w-3.5 h-3.5" />
            {streak} day streak
          </span>
        )}
      </div>

      {loading ? (
        <div
          className="space-y-3"
          data-ocid="customer.my-learning.loading_state"
        >
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div
          className="py-6 text-center"
          data-ocid="customer.my-learning.error_state"
        >
          <p className="text-sm text-destructive">{error}</p>
        </div>
      ) : enrollments.length === 0 ? (
        <div
          className="py-8 text-center"
          data-ocid="customer.my-learning.empty_state"
        >
          <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-3">
            Start learning today — browse free and paid language courses.
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => {
                window.location.href = "/language-learning";
              }}
              data-ocid="customer.my-learning.browse_courses_button"
            >
              <BookOpen className="w-3.5 h-3.5" /> Browse Courses
            </Button>
            <Button
              size="sm"
              className="gap-1.5"
              onClick={() => {
                window.location.href = "/language-learning?create=1";
              }}
              data-ocid="customer.my-learning.create_course_button"
            >
              <Plus className="w-3.5 h-3.5" /> Create Course
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {enrollments.slice(0, 5).map((enrollment, i) => {
            const pct = Math.min(
              100,
              Math.max(0, Number(enrollment.progressPercent)),
            );
            const isComplete = pct >= 100;
            return (
              <div
                key={String(enrollment.courseId ?? i)}
                className="flex items-center gap-4 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors"
                data-ocid={`customer.my-learning.item.${i + 1}`}
              >
                <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-violet-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {String(enrollment.courseId ?? "Course")}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground flex-shrink-0">
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isComplete
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    }`}
                  >
                    {isComplete ? "Completed" : "In Progress"}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 px-2.5"
                    onClick={() => {
                      window.location.href = "/my-learning";
                    }}
                    data-ocid={`customer.my-learning.resume_button.${i + 1}`}
                  >
                    {isComplete ? "Review" : "Resume"}
                  </Button>
                </div>
              </div>
            );
          })}
          {enrollments.length > 5 && (
            <p className="text-xs text-center text-muted-foreground pt-1">
              +{enrollments.length - 5} more courses in{" "}
              <a
                href="/my-learning"
                className="text-violet-500 hover:underline"
              >
                My Learning
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CustomerDashboardPage() {
  // ── Phone / customer ID from session ────────────────────────────────────────
  const customerId =
    typeof window !== "undefined"
      ? (localStorage.getItem("wc_customer_id") ?? undefined)
      : undefined;
  const customerPhone =
    typeof window !== "undefined"
      ? (localStorage.getItem("wc_phone") ?? customerId ?? undefined)
      : undefined;

  // ── Live data hooks ──────────────────────────────────────────────────────────
  const {
    data: liveOrders = [],
    isLoading: ordersLoading,
    refetch: refetchOrders,
    dataUpdatedAt,
  } = useOrdersByCustomer(customerId);

  const { data: allFamilyMembers = [], isLoading: familyLoading } =
    useFamilyMembers();

  const { data: allPlans = [], isLoading: plansLoading } = usePlans();

  // ── PaySprint booking hooks ─────────────────────────────────────────────────
  const { data: allBusRaw = [] } = useGetAllBusBookings();
  const { data: allTrainRaw = [] } = useGetAllTrainBookings();
  const { data: allFlightRaw = [] } = useGetAllFlightBookings();
  const { data: allUtilRaw = [] } = useGetAllUtilityTransactions();

  const filterByCustomer = (
    rows: Record<string, unknown>[],
    limit?: number,
  ) => {
    const filtered = customerId
      ? rows.filter(
          (r) =>
            r.customerId === customerId || r.passengerPhone === customerPhone,
        )
      : rows;
    return limit ? filtered.slice(0, limit) : filtered;
  };

  const busList = filterByCustomer(
    allBusRaw as Record<string, unknown>[],
    customerId ? undefined : 3,
  );
  const trainList = filterByCustomer(
    allTrainRaw as Record<string, unknown>[],
    customerId ? undefined : 3,
  );
  const flightList = filterByCustomer(
    allFlightRaw as Record<string, unknown>[],
    customerId ? undefined : 3,
  );
  const utilList = filterByCustomer(
    allUtilRaw as Record<string, unknown>[],
    customerId ? undefined : 10,
  );

  const recentBookings = [
    ...busList.map((r) => ({
      type: "Bus",
      Icon: Bus,
      route: `${String(r.source ?? "—")} → ${String(r.destination ?? "—")}`,
      date: String(r.journeyDate ?? "—"),
      fare: Number(r.fare ?? 0),
      status: String(r.status ?? "pending"),
      ref: String(r.pnr ?? r.ticketRef ?? "—"),
    })),
    ...trainList.map((r) => ({
      type: "Train",
      Icon: Train,
      route: `${String(r.source ?? "—")} → ${String(r.destination ?? "—")}`,
      date: String(r.journeyDate ?? "—"),
      fare: Number(r.fare ?? 0),
      status: String(r.status ?? "pending"),
      ref: String(r.pnr ?? "—"),
    })),
    ...flightList.map((r) => ({
      type: "Flight",
      Icon: Plane,
      route: `${String(r.source ?? "—")} → ${String(r.destination ?? "—")}`,
      date: String(r.journeyDate ?? "—"),
      fare: Number(r.fare ?? 0),
      status: String(r.status ?? "pending"),
      ref: String(r.pnr ?? r.bookingRef ?? "—"),
    })),
  ].slice(0, 5);

  const utilSummary = utilList.reduce(
    (acc: Record<string, { count: number; sum: number }>, r) => {
      const svcRaw = String(r.serviceType ?? "").toLowerCase();
      const amount = Number(r.amount ?? 0);
      const cat = svcRaw.includes("recharge")
        ? "recharge"
        : svcRaw.includes("bill")
          ? "bill"
          : svcRaw.includes("fastag") || svcRaw.includes("fasttag")
            ? "fastag"
            : svcRaw.includes("lpg") || svcRaw.includes("gas")
              ? "lpg"
              : "other";
      if (!acc[cat]) acc[cat] = { count: 0, sum: 0 };
      acc[cat].count += 1;
      if (String(r.status ?? "").toLowerCase() === "success")
        acc[cat].sum += amount;
      return acc;
    },
    {},
  );

  function bookingStatusCls(s: string) {
    if (s === "confirmed")
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    if (s === "cancelled" || s === "failed")
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  }

  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  useEffect(() => {
    if (dataUpdatedAt) setLastRefreshed(new Date(dataUpdatedAt));
  }, [dataUpdatedAt]);

  // ── Derive family members connected to this customer ────────────────────────
  const familyMembers = customerPhone
    ? allFamilyMembers.filter(
        (m) =>
          (m as unknown as Record<string, unknown>).ownerPhone ===
            customerPhone ||
          (m as unknown as Record<string, unknown>).relationPhone ===
            customerPhone,
      )
    : [];

  // ── Derive spend by category from live orders ────────────────────────────────
  const spendByCategory = (() => {
    if (liveOrders.length === 0) return [];
    const totals: Record<string, number> = {};
    for (const order of liveOrders) {
      const o = order as Record<string, unknown>;
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
      "#22c55e",
    ];
    return Object.entries(totals).map(([name, value], i) => ({
      name,
      value,
      color: CATEGORY_COLORS[name] ?? COLORS[i % COLORS.length],
    }));
  })();

  const totalSpent = spendByCategory.reduce((s, c) => s + c.value, 0);

  // This month spend
  const monthSpent: number = (() => {
    const now = new Date();
    return liveOrders.reduce((sum: number, order) => {
      const o = order as Record<string, unknown>;
      const ts = o.createdAt ? Number(o.createdAt) : 0;
      if (!ts) return sum;
      const d = new Date(ts < 1e13 ? ts * 1000 : ts);
      if (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      ) {
        return sum + Number(o.totalAmount ?? o.total ?? 0);
      }
      return sum;
    }, 0);
  })();

  // ── Derive orders by category ────────────────────────────────────────────────
  const categoryOrders: CategoryOrder[] = (() => {
    if (liveOrders.length === 0) return [];
    const groups: Record<string, { count: number; lastTs: number }> = {};
    for (const order of liveOrders) {
      const o = order as Record<string, unknown>;
      const cat = String(o.category ?? o.serviceType ?? "Products");
      const ts = o.createdAt ? Number(o.createdAt) : 0;
      if (!groups[cat]) groups[cat] = { count: 0, lastTs: 0 };
      groups[cat].count += 1;
      if (ts > groups[cat].lastTs) groups[cat].lastTs = ts;
    }
    return Object.entries(groups).map(([label, { count, lastTs }]) => {
      const meta = CATEGORY_META[label] ?? {
        icon: ShoppingBag,
        color: "text-foreground bg-muted",
      };
      const lastDate = lastTs
        ? new Date(lastTs < 1e13 ? lastTs * 1000 : lastTs).toLocaleDateString(
            "en-IN",
            { month: "short", day: "numeric" },
          )
        : "—";
      return { label, count, lastDate, icon: meta.icon, color: meta.color };
    });
  })();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role Header */}
      <div className="role-header-customer rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
            <span className="font-bold text-violet-600 dark:text-violet-400 text-lg">
              {customerPhone ? customerPhone.slice(-2).toUpperCase() : "ME"}
            </span>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {customerPhone ? `Customer ${customerPhone}` : "My Dashboard"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {customerId ? `ID: ${customerId}` : "Log in to see your data"}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200 dark:border-violet-700">
              <User className="w-3 h-3 mr-1" /> Customer
            </Badge>
          </div>
        </div>
      </div>

      {/* Dashboard Link Banner */}
      <DashboardLinkBanner
        dashboardUrl={`${window.location.origin}/customer-dashboard`}
        roleLabel="Customer"
        accentClass="border-violet-300 dark:border-violet-700/50"
        iconBgClass="bg-violet-100 dark:bg-violet-900/30"
        iconColorClass="text-violet-600"
      />

      {/* Expenditure + Orders Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Spend Summary + Donut */}
        <div
          className="xl:col-span-1 bg-card border border-border rounded-xl p-5 shadow-card"
          data-ocid="customer.expenditure-card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">
            Expenditure by Category
          </h3>
          {ordersLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : spendByCategory.length === 0 ? (
            <div
              className="py-8 text-center"
              data-ocid="customer.expenditure.empty_state"
            >
              <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {customerId ? "No spend data yet" : "Log in to see your spend"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted/40 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">All Time</p>
                  <p className="text-xl font-bold text-violet-500 mt-1">
                    ₹{(totalSpent / 1000).toFixed(1)}K
                  </p>
                </div>
                <div className="bg-muted/40 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">This Month</p>
                  <p className="text-xl font-bold text-foreground mt-1">
                    ₹{(monthSpent / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={spendByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {spendByCategory.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v: number) => [
                      `₹${v.toLocaleString("en-IN")}`,
                      "",
                    ]}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => (
                      <span style={{ fontSize: "11px" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        {/* Orders by Category */}
        <div
          className="xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-card"
          data-ocid="customer.category-orders"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">
            Orders by Category
          </h3>
          {ordersLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : categoryOrders.length === 0 ? (
            <div
              className="py-8 text-center"
              data-ocid="customer.category-orders.empty_state"
            >
              <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {customerId ? "No orders yet" : "Log in to see your orders"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categoryOrders.map((cat, i) => (
                <div
                  key={cat.label}
                  className="bg-muted/30 border border-border rounded-xl p-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors cursor-pointer"
                  data-ocid={`customer.category.item.${i + 1}`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${cat.color}`}
                  >
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-muted-foreground">{cat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-0.5">
                    {cat.count}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Last: {cat.lastDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Family Connections + Active Subscriptions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Family Connections */}
        <div
          className="bg-card border border-border rounded-xl p-5 shadow-card"
          data-ocid="customer.family-connections"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-violet-500" /> Family Connections
            </h3>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs"
              data-ocid="customer.family.add_button"
            >
              <UserPlus className="w-3.5 h-3.5" /> Add Member
            </Button>
          </div>
          {familyLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : familyMembers.length === 0 ? (
            <div
              className="py-8 text-center"
              data-ocid="customer.family.empty_state"
            >
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {customerPhone
                  ? "No family members connected yet"
                  : "Log in to see your family connections"}
              </p>
              {customerPhone && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  data-ocid="customer.family.add_first_button"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Connect First Member
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {familyMembers.map((member, i) => {
                const m = member as unknown as Record<string, unknown>;
                const initials = String(m.relationName ?? m.ownerName ?? "?")
                  .split(" ")
                  .map((w: string) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);
                const connectedAt = m.createdAt
                  ? new Date(
                      Number(m.createdAt) < 1e13
                        ? Number(m.createdAt) * 1000
                        : Number(m.createdAt),
                    ).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })
                  : "";
                return (
                  <div
                    key={String(m.id ?? i)}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                    data-ocid={`customer.family.item.${i + 1}`}
                  >
                    <div className="w-9 h-9 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                        {initials}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {String(m.relationName ?? m.ownerName ?? "Member")}
                      </p>
                      {connectedAt && (
                        <p className="text-xs text-muted-foreground">
                          Connected since {connectedAt}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {String(m.relationship ?? "Family")}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Active Subscriptions */}
        <div
          className="bg-card border border-border rounded-xl p-5 shadow-card"
          data-ocid="customer.subscriptions-card"
        >
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-violet-500" /> Active
            Subscriptions
          </h3>
          {plansLoading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : allPlans.length === 0 ? (
            <div
              className="py-8 text-center"
              data-ocid="customer.subscriptions.empty_state"
            >
              <Star className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No active subscriptions
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {allPlans
                .filter((p) => {
                  const pr = p as unknown as Record<string, unknown>;
                  return (
                    !customerPhone ||
                    pr.userPhone === customerPhone ||
                    pr.phone === customerPhone
                  );
                })
                .slice(0, 5)
                .map((plan, i) => {
                  const pr = plan as unknown as Record<string, unknown>;
                  const isExpiring = String(pr.status ?? "") === "expiring";
                  return (
                    <div
                      key={String(pr.id ?? i)}
                      className="p-4 bg-muted/30 border border-border rounded-xl"
                      data-ocid={`customer.subscription.item.${i + 1}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {String(pr.name ?? pr.planType ?? "Subscription")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {String(pr.price ?? pr.description ?? "")}
                          </p>
                        </div>
                        <Badge
                          className={
                            isExpiring
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200"
                          }
                        >
                          {isExpiring ? "⚠ Expiring Soon" : "Active"}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-card"
        data-ocid="customer.recent-activity"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Recent Orders
            </h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Auto-refreshes every 15s &middot; Last{" "}
              {lastRefreshed.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => refetchOrders()}
            data-ocid="customer.recent-activity.refresh_button"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
        </div>
        {ordersLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 bg-muted/30 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : liveOrders.length > 0 ? (
          <div className="space-y-3">
            {liveOrders.slice(0, 6).map((order, i) => {
              const o = order as Record<string, unknown>;
              const rawStatus = String(o.status ?? "pending");
              const validStatuses: RecentActivity["status"][] = [
                "delivered",
                "confirmed",
                "pending",
                "completed",
              ];
              const safeStatus: RecentActivity["status"] =
                validStatuses.includes(rawStatus as RecentActivity["status"])
                  ? (rawStatus as RecentActivity["status"])
                  : "pending";
              return (
                <div
                  key={String(o.id ?? i)}
                  className="flex items-center gap-4 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors"
                  data-ocid={`customer.activity.item.${i + 1}`}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-muted">
                    <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {String(o.merchantName ?? o.merchantId ?? "Order")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {o.createdAt
                        ? new Date(Number(o.createdAt)).toLocaleDateString(
                            "en-IN",
                          )
                        : "\u2014"}{" "}
                      &middot;{" "}
                      <span className="font-mono">
                        {String(o.id ?? "").slice(0, 12)}
                      </span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-foreground tabular-nums">
                      &#x20B9;
                      {Number(o.totalAmount ?? o.total ?? 0).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                    <ActivityStatusBadge status={safeStatus} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="py-8 text-center"
            data-ocid="customer.recent-activity.empty_state"
          >
            <ShoppingBag className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              {customerId ? "No orders yet" : "Log in to see your live orders"}
            </p>
          </div>
        )}
      </div>

      {/* Lending Section */}
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-card"
        data-ocid="customer.lending-section"
      >
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <HandCoins className="w-4 h-4 text-violet-500" /> My Lending
        </h3>
        {customerId ? (
          <LendingSection
            phone={customerId}
            showMarkReturned
            accentClass="bg-violet-50/40 dark:bg-violet-950/20"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Log in to see your lending items.
          </p>
        )}
      </div>

      {/* Services & More Panel */}
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-card"
        data-ocid="customer.services-panel"
      >
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-violet-500" /> Services &amp;
          More
        </h3>

        {/* Main service grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-5">
          {[
            { label: "Shop", icon: ShoppingBag, to: "/marketplace" },
            { label: "Healthcare", icon: Stethoscope, to: "/healthcare" },
            { label: "Travel", icon: Plane, to: "/tours" },
            {
              label: "Professional",
              icon: Briefcase,
              to: "/professional-services",
            },
            {
              label: "Mfr. Products",
              icon: Factory,
              to: "/merchant-manufacturer-products",
            },
            {
              label: "Learn Language",
              icon: Languages,
              to: "/language-learning",
            },
            {
              label: "Book Transport",
              icon: Bus,
              to: "/customer/transport-booking",
            },
            {
              label: "Bill Payments",
              icon: CreditCard,
              to: "/customer/bill-payments",
            },
            { label: "Old Items", icon: Package, to: "/marketplace" },
            { label: "Blogs", icon: BookOpen, to: "/blogs" },
            { label: "Jobs", icon: Briefcase, to: "/jobs" },
            { label: "Properties", icon: Home, to: "/property-listings" },
          ].map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to as "/marketplace"}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 hover:bg-accent/60 border border-transparent hover:border-border transition-all duration-200 group"
              data-ocid={`customer.service-tile.${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-center text-muted-foreground group-hover:text-foreground leading-tight font-medium">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Secondary pill links */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Recipes", to: "/recipes" },
            { label: "Lending", to: "/lending" },
            { label: "Donations", to: "/donations" },
            { label: "Family Group", to: "/family" },
            { label: "Support Tickets", to: "/support-tickets" },
            { label: "Matrimony", to: "/matrimony" },
            { label: "Community", to: "/community" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to as "/recipes"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 hover:bg-accent border border-border/50 hover:border-border text-muted-foreground hover:text-foreground transition-all duration-200"
              data-ocid={`customer.service-pill.${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-card"
        data-ocid="customer.community-section"
      >
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-violet-500" /> Nearby Community
        </h3>
        <CommunitySection city="Gandhidham" maxItems={5} />
      </div>

      {/* My Learning Section */}
      <MyLearningSection customerId={customerId} />

      {/* My Bookings Section */}
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-card"
        data-ocid="customer.bookings-section"
      >
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bus className="w-4 h-4 text-violet-500" /> My Bookings
        </h3>

        {/* Booking count cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              label: "Bus Bookings",
              count: busList.length,
              Icon: Bus,
              color: "text-blue-600",
              bg: "bg-blue-100 dark:bg-blue-900/30",
            },
            {
              label: "Train Bookings",
              count: trainList.length,
              Icon: Train,
              color: "text-emerald-600",
              bg: "bg-emerald-100 dark:bg-emerald-900/30",
            },
            {
              label: "Flight Bookings",
              count: flightList.length,
              Icon: Plane,
              color: "text-violet-600",
              bg: "bg-violet-100 dark:bg-violet-900/30",
            },
          ].map(({ label, count, Icon, color, bg }) => (
            <div
              key={label}
              className="bg-muted/30 border border-border rounded-xl p-3 flex items-center gap-3"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold tabular-nums ${color}`}>
                  {count}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {recentBookings.length === 0 ? (
          <div
            className="py-8 text-center"
            data-ocid="customer.bookings.empty_state"
          >
            <Bus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No bookings yet. Book your first bus, train, or flight from the
              chatbot!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {[
                    "Type",
                    "Route",
                    "Date",
                    "Fare",
                    "Status",
                    "Ticket/PNR",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b, i) => (
                  <tr
                    key={`${b.type}-${b.ref}-${b.date}`}
                    className="border-b border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`customer.bookings.item.${i + 1}`}
                  >
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <b.Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {b.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-foreground max-w-[160px] truncate">
                      {b.route}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                      {b.date}
                    </td>
                    <td className="px-3 py-2 tabular-nums font-semibold text-foreground">
                      ₹{b.fare.toLocaleString("en-IN")}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${bookingStatusCls(b.status)}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">
                      {b.ref}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment History Section */}
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-card"
        data-ocid="customer.payment-history"
      >
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-violet-500" /> Payment History
        </h3>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            {
              key: "recharge",
              label: "Mobile Recharges",
              Icon: Receipt,
              color: "text-blue-600",
              bg: "bg-blue-100 dark:bg-blue-900/30",
            },
            {
              key: "bill",
              label: "Bills Paid",
              Icon: Receipt,
              color: "text-emerald-600",
              bg: "bg-emerald-100 dark:bg-emerald-900/30",
            },
            {
              key: "fastag",
              label: "FastTag",
              Icon: Fuel,
              color: "text-amber-600",
              bg: "bg-amber-100 dark:bg-amber-900/30",
            },
            {
              key: "lpg",
              label: "LPG",
              Icon: Fuel,
              color: "text-orange-600",
              bg: "bg-orange-100 dark:bg-orange-900/30",
            },
          ].map(({ key, label, Icon, color, bg }) => {
            const d = utilSummary[key] ?? { count: 0, sum: 0 };
            return (
              <div
                key={key}
                className="bg-muted/30 border border-border rounded-xl p-3"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${bg}`}
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className={`text-lg font-bold tabular-nums ${color}`}>
                  {d.count}
                </p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
                {d.sum > 0 && (
                  <p className="text-xs font-semibold text-foreground mt-0.5">
                    ₹{d.sum.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {utilList.length === 0 ? (
          <div
            className="py-8 text-center"
            data-ocid="customer.payment-history.empty_state"
          >
            <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No payment history yet. Recharge or pay bills from the chatbot!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {utilList.slice(0, 10).map((t, i) => {
              const r = t as Record<string, unknown>;
              const st = String(r.status ?? "pending").toLowerCase();
              const statusCls =
                st === "success"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : st === "failed"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
              return (
                <div
                  key={String(r.id ?? i)}
                  className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors"
                  data-ocid={`customer.payment-history.item.${i + 1}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Receipt className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {String(r.operatorName ?? r.serviceType ?? "Payment")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {String(r.consumerNumber ?? "")} &middot;{" "}
                      {r.createdAt
                        ? new Date(Number(r.createdAt)).toLocaleDateString(
                            "en-IN",
                          )
                        : "—"}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold tabular-nums text-foreground">
                      ₹{Number(r.amount ?? 0).toLocaleString("en-IN")}
                    </p>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${statusCls}`}
                    >
                      {String(r.status ?? "pending")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
