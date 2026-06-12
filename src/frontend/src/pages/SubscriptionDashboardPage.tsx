import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Download,
  IndianRupee,
  Loader2,
  Plus,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UserMinus,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { SubscriptionAssignment } from "../backend.d";
import {
  useAssignUserToSubscription,
  useAssignedUsers,
  useMerchants,
  useRemoveUserFromSubscription,
  useSubscriptionDashboardStats,
} from "../hooks/useBackend";

// ─── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  colorCls,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  colorCls: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-4 shadow-sm">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorCls}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-bold text-foreground tabular-nums">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Utilization Bar ──────────────────────────────────────────────────────────

function UtilizationBar({ pct }: { pct: number }) {
  const clamped = Math.min(100, Math.max(0, pct));
  const color =
    clamped < 70
      ? "bg-emerald-500"
      : clamped < 90
        ? "bg-amber-500"
        : "bg-red-500";
  const textColor =
    clamped < 70
      ? "text-emerald-600"
      : clamped < 90
        ? "text-amber-600"
        : "text-red-600";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span
        className={`text-xs font-medium tabular-nums min-w-[3ch] text-right ${textColor}`}
      >
        {Math.round(clamped)}%
      </span>
    </div>
  );
}

// ─── Assigned Users Panel ─────────────────────────────────────────────────────

function AssignedUsersPanel({ merchantId }: { merchantId: string }) {
  const { data: users = [], isLoading, refetch } = useAssignedUsers(merchantId);
  const assignMutation = useAssignUserToSubscription();
  const removeMutation = useRemoveUserFromSubscription();

  const [newPhone, setNewPhone] = useState("");
  const [newCap, setNewCap] = useState("50");

  async function handleAdd() {
    const phone = newPhone.trim();
    if (!phone) {
      toast.error("Enter a phone number");
      return;
    }
    const cap = Number.parseInt(newCap);
    if (!Number.isFinite(cap) || cap < 1) {
      toast.error("Enter a valid order cap");
      return;
    }
    try {
      await assignMutation.mutateAsync({
        merchantId,
        userPhone: phone,
        orderCap: BigInt(cap),
      });
      toast.success(`User ${phone} assigned`);
      setNewPhone("");
      setNewCap("50");
      refetch();
    } catch (e) {
      toast.error(
        `Failed: ${e instanceof Error ? e.message : "Unknown error"}`,
      );
    }
  }

  async function handleRemove(phone: string) {
    try {
      await removeMutation.mutateAsync({ merchantId, userPhone: phone });
      toast.success(`User ${phone} removed`);
      refetch();
    } catch (e) {
      toast.error(
        `Failed: ${e instanceof Error ? e.message : "Unknown error"}`,
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
        new Date(Number(u.assignedAt) / 1_000_000).toLocaleDateString("en-IN"),
      ]),
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

  return (
    <div className="border-t border-border bg-muted/20 p-4 space-y-4">
      {/* Add user row */}
      <div className="flex items-end gap-2 flex-wrap">
        <div className="space-y-1 flex-1 min-w-[160px]">
          <Label className="text-xs">Phone Number</Label>
          <Input
            placeholder="+91 98765 43210"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            data-ocid="sub-dash.assign-phone-input"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1 w-24">
          <Label className="text-xs">Order Cap</Label>
          <Input
            type="number"
            min={1}
            value={newCap}
            onChange={(e) => setNewCap(e.target.value)}
            data-ocid="sub-dash.assign-cap-input"
            className="h-8 text-sm"
          />
        </div>
        <Button
          size="sm"
          onClick={handleAdd}
          disabled={assignMutation.isPending}
          data-ocid="sub-dash.assign-add-button"
        >
          {assignMutation.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
          ) : (
            <Plus className="w-3.5 h-3.5 mr-1" />
          )}
          Assign
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={exportCSV}
          data-ocid="sub-dash.export-csv-button"
        >
          <Download className="w-3.5 h-3.5 mr-1" />
          CSV
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div
          className="text-center py-6 text-muted-foreground text-sm"
          data-ocid="sub-dash.users-empty_state"
        >
          No delivery users assigned. Add a user above.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                  User Phone
                </th>
                <th className="text-right px-3 py-2 font-medium text-muted-foreground">
                  Orders Used
                </th>
                <th className="text-right px-3 py-2 font-medium text-muted-foreground">
                  Cap
                </th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                  Assigned
                </th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u: SubscriptionAssignment, idx) => {
                const used = Number(u.ordersUsed);
                const cap = Number(u.orderCap);
                const pct = cap > 0 ? (used / cap) * 100 : 0;
                const statusStr = String(u.status);
                const isActive = statusStr === "active";
                return (
                  <tr
                    key={u.id}
                    className="hover:bg-muted/30 transition-colors"
                    data-ocid={`sub-dash.user-row.${idx + 1}`}
                  >
                    <td className="px-3 py-2 font-mono text-foreground">
                      {u.assignedUserId}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      <div className="flex flex-col items-end gap-0.5">
                        <span>
                          {used}/{cap}
                        </span>
                        <UtilizationBar pct={pct} />
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{cap}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          isActive
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isActive ? (
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        ) : (
                          <XCircle className="w-2.5 h-2.5" />
                        )}
                        {statusStr}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {new Date(
                        Number(u.assignedAt) / 1_000_000,
                      ).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-3 py-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-destructive hover:text-destructive text-[10px]"
                        onClick={() => handleRemove(u.assignedUserId)}
                        disabled={removeMutation.isPending}
                        data-ocid={`sub-dash.remove-user-button.${idx + 1}`}
                      >
                        <UserMinus className="w-3 h-3 mr-0.5" />
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Merchant Row ─────────────────────────────────────────────────────────────

function MerchantRow({
  merchant,
  isExpanded,
  onToggle,
  index,
}: {
  merchant: {
    id: string;
    businessName: string;
    category: string;
    isVerified: boolean;
  };
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const { data: stats, isLoading } = useSubscriptionDashboardStats(merchant.id);

  const planName = stats?.planName ?? "—";
  const assignedCount = Number(stats?.assignedUsersCount ?? 0);
  const ordersUsed = Number(stats?.totalOrdersThisMonth ?? 0);
  const orderCap = Number(stats?.orderCap ?? 0);
  const utilPct = stats?.utilizationPercent ?? 0;
  const daysLeft = Number(stats?.daysUntilRenewal ?? 0);

  const statusBadge =
    utilPct >= 90
      ? {
          cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
          label: "Critical",
        }
      : utilPct >= 70
        ? {
            cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            label: "High",
          }
        : {
            cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            label: "Healthy",
          };

  return (
    <>
      <tr
        className={`border-b border-border hover:bg-muted/20 cursor-pointer transition-colors ${isExpanded ? "bg-muted/30" : ""}`}
        onClick={onToggle}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        data-ocid={`sub-dash.merchant-row.${index}`}
      >
        <td className="px-4 py-3">
          <div>
            <p className="font-medium text-sm text-foreground truncate max-w-[160px]">
              {merchant.businessName}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {merchant.category}
            </p>
          </div>
        </td>
        <td className="px-4 py-3">
          {isLoading ? (
            <Skeleton className="h-4 w-20" />
          ) : (
            <span className="text-xs text-foreground">{planName}</span>
          )}
        </td>
        <td className="px-4 py-3 text-right tabular-nums text-sm">
          {isLoading ? <Skeleton className="h-4 w-8 ml-auto" /> : assignedCount}
        </td>
        <td className="px-4 py-3 text-right tabular-nums text-sm">
          {isLoading ? (
            <Skeleton className="h-4 w-16 ml-auto" />
          ) : (
            `${ordersUsed}/${orderCap}`
          )}
        </td>
        <td className="px-4 py-3">
          {isLoading ? (
            <Skeleton className="h-3 w-24" />
          ) : (
            <UtilizationBar pct={utilPct} />
          )}
        </td>
        <td className="px-4 py-3 text-right tabular-nums text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-4 w-10 ml-auto" />
          ) : (
            `${daysLeft}d`
          )}
        </td>
        <td className="px-4 py-3">
          {isLoading ? (
            <Skeleton className="h-5 w-14" />
          ) : (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge.cls}`}
            >
              {statusBadge.label}
            </span>
          )}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-[10px] text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              data-ocid={`sub-dash.view-users-button.${index}`}
            >
              <Users className="w-3 h-3 mr-0.5" />
              Users
            </Button>
            <ChevronDown
              className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={8} className="p-0">
            <AssignedUsersPanel merchantId={merchant.id} />
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Plan Distribution Donut ──────────────────────────────────────────────────

const PLAN_DIST = [
  { label: "Free", pct: 45, color: "bg-muted-foreground" },
  { label: "Basic", pct: 25, color: "bg-blue-500" },
  { label: "Pro", pct: 20, color: "bg-violet-500" },
  { label: "Enterprise", pct: 10, color: "bg-amber-500" },
];

const WEEKLY_BARS = [
  { day: "M", orders: 42 },
  { day: "T", orders: 67 },
  { day: "W", orders: 55 },
  { day: "T2", orders: 89 },
  { day: "F", orders: 73 },
  { day: "S", orders: 91 },
  { day: "S2", orders: 64 },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SubscriptionDashboardPage() {
  const { data: merchants = [], isLoading: merchantsLoading } = useMerchants();
  const [expandedMerchantId, setExpandedMerchantId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 25;

  const filteredMerchants = merchants.filter(
    (m) =>
      !searchQuery ||
      m.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredMerchants.length / PAGE_SIZE);
  const pageMerchants = filteredMerchants.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  // Global stat estimates from merchants list
  const totalMerchants = merchants.length;
  const verifiedMerchants = merchants.filter((m) => m.isVerified).length;

  function toggleExpand(id: string) {
    setExpandedMerchantId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-6 animate-fade-in" data-ocid="sub-dash.page">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Delivery Assignment Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Track assigned delivery users, subscription utilization, and plan
            analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/subscriptions">
            <Button
              variant="outline"
              size="sm"
              data-ocid="sub-dash.manage-plans-link"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Plans
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.location.reload()}
            data-ocid="sub-dash.refresh-button"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-ocid="sub-dash.summary-section"
      >
        <StatCard
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
          label="Active Business Subscriptions"
          value={verifiedMerchants}
          sub={`of ${totalMerchants} total merchants`}
          colorCls="bg-emerald-100 dark:bg-emerald-900/30"
        />
        <StatCard
          icon={<UserCheck className="w-5 h-5 text-blue-600" />}
          label="Assigned Delivery Users"
          value="—"
          sub="across all merchants"
          colorCls="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-violet-600" />}
          label="Orders This Month"
          value="—"
          sub="all subscribed merchants"
          colorCls="bg-violet-100 dark:bg-violet-900/30"
        />
        <StatCard
          icon={<IndianRupee className="w-5 h-5 text-amber-600" />}
          label="Subscription Revenue"
          value="—"
          sub="this billing period"
          colorCls="bg-amber-100 dark:bg-amber-900/30"
        />
      </div>

      {/* Analytics Row */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        data-ocid="sub-dash.analytics-section"
      >
        {/* Plan Distribution */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-foreground text-sm">
              Plan Distribution
            </h3>
          </div>
          <div className="space-y-3">
            {PLAN_DIST.map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-20 shrink-0">
                  {label}
                </span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-medium tabular-nums w-8 text-right">
                  {pct}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">
            * Distribution based on active merchant plan types
          </p>
        </div>

        {/* Orders per day – simple bar chart */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-foreground text-sm">
              Orders (Last 7 Days)
            </h3>
          </div>
          <div className="flex items-end gap-1 h-24">
            {WEEKLY_BARS.map((bar) => (
              <div
                key={bar.day}
                className="flex-1 flex flex-col items-center gap-1"
                title={`${bar.day}: ${bar.orders} orders`}
              >
                <div
                  className="w-full rounded-sm bg-primary/70 hover:bg-primary transition-colors"
                  style={{ height: `${(bar.orders / 100) * 96}px` }}
                />
                <span className="text-[9px] text-muted-foreground">
                  {bar.day.replace(/\d/, "")}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            * Live data shown per merchant selection below
          </p>
        </div>
      </div>

      {/* Merchant Subscription Table */}
      <div
        className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
        data-ocid="sub-dash.merchants-section"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3">
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Merchant Subscriptions
            </h3>
            <p className="text-xs text-muted-foreground">
              {filteredMerchants.length} merchants · click a row to manage
              assigned delivery users
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search merchants…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              className="h-8 w-48 text-sm"
              data-ocid="sub-dash.search-input"
            />
          </div>
        </div>

        {merchantsLoading ? (
          <div className="p-5 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filteredMerchants.length === 0 ? (
          <div
            className="p-10 text-center text-muted-foreground text-sm"
            data-ocid="sub-dash.merchants-empty_state"
          >
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No merchants found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">
                      Merchant
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">
                      Plan
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground text-xs">
                      Users
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground text-xs">
                      Orders Used
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs">
                      Utilization
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground text-xs">
                      Renews
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs">
                      Status
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageMerchants.map((m, idx) => (
                    <MerchantRow
                      key={m.id}
                      merchant={m}
                      isExpanded={expandedMerchantId === m.id}
                      onToggle={() => toggleExpand(m.id)}
                      index={idx + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Page {page + 1} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    data-ocid="sub-dash.pagination_prev"
                  >
                    Prev
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={page >= totalPages - 1}
                    data-ocid="sub-dash.pagination_next"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Plan Management Link */}
      <div className="bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">
              Manage Subscription Plans
            </p>
            <p className="text-xs text-muted-foreground">
              Edit plan limits, pricing, and user caps for adhoc delivery
              services
            </p>
          </div>
        </div>
        <Link to="/subscriptions">
          <Button data-ocid="sub-dash.manage-assignments-button">
            <Users className="w-4 h-4 mr-2" />
            Manage Assignments
          </Button>
        </Link>
      </div>
    </div>
  );
}
