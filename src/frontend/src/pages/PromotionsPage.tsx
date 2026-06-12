import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useListCities } from "@/hooks/useBackend";
import {
  BarChart3,
  CheckCircle2,
  Download,
  Eye,
  Megaphone,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
  Video,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useApprovePromotion,
  useCreatePromotion,
  useDeletePromotion,
  usePromotionAnalytics,
  usePromotions,
  useRejectPromotion,
} from "../hooks/useBackend";
import type { Promotion, PromotionStatus } from "../types";

// Safe STATUS_META with fallback — covers ALL possible backend values
const STATUS_META: Record<string, { label: string; cls: string }> = {
  pendingApproval: {
    label: "Pending Approval",
    cls: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  },
  pendingPayment: {
    label: "Pending Payment",
    cls: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800",
  },
  active: {
    label: "Active",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  rejected: {
    label: "Rejected",
    cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
  },
  expired: {
    label: "Expired",
    cls: "bg-muted text-muted-foreground border-border",
  },
  paused: {
    label: "Paused",
    cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
  },
};

// Safe lookup — never returns undefined, always has a valid cls + label
function getStatusMeta(status: string): { label: string; cls: string } {
  return (
    STATUS_META[status] ?? {
      cls: "bg-muted text-muted-foreground border-border",
      label: status,
    }
  );
}

const REACH_PLANS = [
  { value: "plan_100", reach: 100, price: 99, label: "100 users — ₹99" },
  { value: "plan_200", reach: 200, price: 199, label: "200 users — ₹199" },
  { value: "plan_500", reach: 500, price: 399, label: "500 users — ₹399" },
  { value: "plan_1000", reach: 1000, price: 699, label: "1,000 users — ₹699" },
  {
    value: "plan_2000",
    reach: 2000,
    price: 1199,
    label: "2,000 users — ₹1,199",
  },
];

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 shadow-sm">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-bold font-display text-foreground">
          {value}
        </div>
        <div className="text-xs text-muted-foreground leading-tight">
          {label}
        </div>
      </div>
    </div>
  );
}

function ReachBar({ reached, total }: { reached: number; total: number }) {
  const pct =
    total > 0 ? Math.min(100, Math.round((reached / total) * 100)) : 0;
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 bg-muted rounded-full h-1.5">
        <div
          className="bg-primary h-1.5 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground w-8 text-right">
        {pct}%
      </span>
    </div>
  );
}

// ─── Create Promotion Dialog ──────────────────────────────────────────────────
function CreatePromotionDialog({ onClose }: { onClose: () => void }) {
  const createPromotion = useCreatePromotion();
  const citiesForPromo = useListCities();
  const [promoAreas, setPromoAreas] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [targetUserCount, setTargetUserCount] = useState<number>(100);
  const [form, setForm] = useState({
    advertiserPhone: "",
    title: "",
    reelLink: "",
    imageLink: "",
    locationArea: "",
    locationCity: "",
    locationCountry: "India",
    subscriptionPlan: "plan_100",
  });

  async function handleSubmit() {
    if (!form.advertiserPhone || !form.title || !form.locationCity) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await createPromotion.mutateAsync(form);
      toast.success("Promotion submitted — pending approval and AI moderation");
      onClose();
    } catch {
      toast.error("Failed to create promotion");
    }
  }

  const selectedPlan = REACH_PLANS.find(
    (p) => p.value === form.subscriptionPlan,
  );

  return (
    <DialogContent
      className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
      data-ocid="promotions.create_dialog"
    >
      <DialogHeader>
        <DialogTitle className="font-display">Post Advertisement</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 pt-1">
        <div className="space-y-1.5">
          <Label>Advertiser Phone *</Label>
          <Input
            placeholder="+91XXXXXXXXXX"
            value={form.advertiserPhone}
            onChange={(e) =>
              setForm((f) => ({ ...f, advertiserPhone: e.target.value }))
            }
            data-ocid="promotions.create.phone_input"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Ad Title *</Label>
          <Input
            placeholder="e.g. 50% off at Sharma Kirana this weekend!"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            data-ocid="promotions.create.title_input"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Social Media Reel Link</Label>
          <Input
            placeholder="https://instagram.com/reel/..."
            value={form.reelLink}
            onChange={(e) =>
              setForm((f) => ({ ...f, reelLink: e.target.value }))
            }
            data-ocid="promotions.create.reel_input"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Image Link</Label>
          <Input
            placeholder="https://example.com/image.jpg"
            value={form.imageLink}
            onChange={(e) =>
              setForm((f) => ({ ...f, imageLink: e.target.value }))
            }
            data-ocid="promotions.create.image_input"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Area/Locality</Label>
            <Input
              placeholder="e.g. Connaught Place"
              value={form.locationArea}
              onChange={(e) =>
                setForm((f) => ({ ...f, locationArea: e.target.value }))
              }
              data-ocid="promotions.create.area_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>City *</Label>
            <Select
              value={form.locationCity}
              onValueChange={(val) => {
                setForm((f) => ({ ...f, locationCity: val }));
                setSelectedAreas([]);
                setPromoAreas([
                  "North",
                  "South",
                  "East",
                  "West",
                  "Central",
                  "Old City",
                  "New Area",
                  "Industrial Zone",
                  "IT Hub",
                  "Suburbs",
                ]);
              }}
            >
              <SelectTrigger data-ocid="promotions.create.city_select">
                <SelectValue placeholder="Select a city..." />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(citiesForPromo)
                  ? citiesForPromo.map((c: Record<string, string>) => {
                      const id = c.id ?? c.cityId ?? c.name ?? "";
                      return (
                        <SelectItem key={id} value={id}>
                          {c.name ?? c.cityName ?? id}
                        </SelectItem>
                      );
                    })
                  : null}
              </SelectContent>
            </Select>
          </div>

          {form.locationCity && promoAreas.length > 0 && (
            <div className="space-y-1.5">
              <Label>Target Areas</Label>
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto border rounded-md p-2">
                {promoAreas.map((area) => (
                  <label
                    key={area}
                    className="flex items-center gap-1.5 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...selectedAreas, area]
                          : selectedAreas.filter((a) => a !== area);
                        setSelectedAreas(next);
                        setForm((f) => ({
                          ...f,
                          locationArea: next.join(", "),
                        }));
                      }}
                      data-ocid="promotions.create.area_checkbox"
                    />
                    {area}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label>Max Users to Receive Ad</Label>
            <Input
              type="number"
              min={10}
              max={10000}
              value={targetUserCount}
              onChange={(e) => setTargetUserCount(Number(e.target.value))}
              data-ocid="promotions.create.user_count_input"
            />
            <p className="text-xs text-muted-foreground">
              Promotion will be sent to at most this many users after admin
              approval.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Subscription Plan (Reach)</Label>
          <Select
            value={form.subscriptionPlan}
            onValueChange={(v) =>
              setForm((f) => ({ ...f, subscriptionPlan: v }))
            }
          >
            <SelectTrigger data-ocid="promotions.create.plan_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REACH_PLANS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedPlan && (
          <div className="bg-muted/40 rounded-lg p-3 text-sm">
            Promotion will reach up to{" "}
            <strong>{selectedPlan.reach.toLocaleString()} users</strong> in{" "}
            {form.locationCity || "the target city"}.{" "}
            <span className="text-primary font-medium">
              ₹{selectedPlan.price} + taxes
            </span>
          </div>
        )}

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-xs text-amber-700 dark:text-amber-300">
          🛡️ After submission, AI moderation will check for hate speech, spam,
          misleading content, violence, or nudity before approval.
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="promotions.create.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={createPromotion.isPending}
            data-ocid="promotions.create.submit_button"
          >
            {createPromotion.isPending ? "Submitting…" : "Submit for Review"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default function PromotionsPage() {
  const { data: promotions = [], isLoading } = usePromotions();
  const approvePromotion = useApprovePromotion();
  const rejectPromotion = useRejectPromotion();
  const deletePromotion = useDeletePromotion();

  const [statusFilter, setStatusFilter] = useState<PromotionStatus | "all">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [analyticsPromoId, setAnalyticsPromoId] = useState<string | null>(null);
  const [rejectPromo, setRejectPromo] = useState<Promotion | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: analyticsData } = usePromotionAnalytics(analyticsPromoId ?? "");
  const analyticsPromo = analyticsPromoId
    ? (promotions.find((p) => p.id === analyticsPromoId) ?? null)
    : null;

  const filtered = promotions.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !p.title.toLowerCase().includes(q) &&
        !p.advertiserName.toLowerCase().includes(q) &&
        !p.city.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  const totalPromos = promotions.length;
  const activePromos = promotions.filter((p) => p.status === "active").length;
  const totalReach = promotions.reduce((s, p) => s + p.usersReached, 0);
  const totalViewed = promotions.reduce((s, p) => s + p.usersViewed, 0);

  async function handleApprove(id: string) {
    try {
      await approvePromotion.mutateAsync(id);
      toast.success("Promotion approved");
    } catch {
      toast.error("Failed to approve promotion");
    }
  }

  async function handleReject() {
    if (!rejectPromo) return;
    try {
      await rejectPromotion.mutateAsync({
        id: rejectPromo.id,
        reason: rejectReason || "Does not meet community guidelines",
      });
      setRejectPromo(null);
      setRejectReason("");
      toast.success("Promotion rejected");
    } catch {
      toast.error("Failed to reject promotion");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deletePromotion.mutateAsync(id);
      setDeleteId(null);
      toast.success("Promotion deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  function handleExport() {
    const rows = promotions.map((p) =>
      [
        p.id,
        p.title,
        p.advertiserName,
        p.advertiserPhone,
        p.areaName,
        p.city,
        p.country,
        p.planUsersReach,
        p.status,
        p.usersReached,
        p.usersViewed,
        new Date(p.createdAt).toLocaleDateString("en-IN"),
        new Date(p.expiresAt).toLocaleDateString("en-IN"),
      ].join(","),
    );
    const csv = [
      "ID,Title,Advertiser,Phone,Area,City,Country,Plan Users,Status,Users Reached,Users Viewed,Created At,Expires At",
      ...rows,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "promotions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasFilters = statusFilter !== "all" || search;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Promotions
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage advertisements, approvals, and reach analytics
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            data-ocid="promotions.export_button"
          >
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button
            className="gap-2"
            onClick={() => setShowCreateDialog(true)}
            data-ocid="promotions.create_button"
          >
            <Plus className="w-4 h-4" /> Post Ad
          </Button>
        </div>
      </div>

      {/* Analytics summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Promotions"
          value={totalPromos}
          icon={Megaphone}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          label="Active"
          value={activePromos}
          icon={TrendingUp}
          color="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
        />
        <StatCard
          label="Total Reach"
          value={totalReach.toLocaleString("en-IN")}
          icon={Users}
          color="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
        />
        <StatCard
          label="Total Views"
          value={totalViewed.toLocaleString("en-IN")}
          icon={Eye}
          color="bg-violet-100 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400"
        />
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap gap-3">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as PromotionStatus | "all")}
          >
            <SelectTrigger
              className="w-44 h-8 text-sm"
              data-ocid="promotions.status_filter.select"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pendingPayment">Pending Payment</SelectItem>
              <SelectItem value="pendingApproval">Pending Approval</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search title, advertiser, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm w-56"
              data-ocid="promotions.search_input"
            />
          </div>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-muted-foreground"
              onClick={() => {
                setStatusFilter("all");
                setSearch("");
              }}
              data-ocid="promotions.clear_filters_button"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {promotions.length} promotions
        </p>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {["p1", "p2", "p3", "p4", "p5"].map((s) => (
              <Skeleton key={s} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center gap-3 py-16 text-center"
            data-ocid="promotions.empty_state"
          >
            <Megaphone className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">No promotions found</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCreateDialog(true)}
              data-ocid="promotions.empty_create_button"
            >
              Post an Ad
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="promotions.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-3 font-medium">Phone</th>
                  <th className="text-left py-3 px-3 font-medium">Location</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Plan (Reach)
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Reached / Viewed
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Created</th>
                  <th className="text-left py-3 px-3 font-medium">Expires</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((promo, idx) => {
                  // Safe lookup — never crashes even with unexpected status values
                  const meta = getStatusMeta(promo.status);
                  return (
                    <tr
                      key={promo.id}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      data-ocid={`promotions.item.${idx + 1}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          {promo.imageLink && (
                            <img
                              src={promo.imageLink}
                              alt={promo.title}
                              className="w-10 h-10 rounded-md object-cover shrink-0 border border-border"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                          <p className="font-medium text-foreground truncate max-w-[180px]">
                            {promo.title}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-xs text-muted-foreground font-mono">
                          {promo.advertiserPhone}
                        </p>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-xs">
                          <p className="font-medium text-foreground">
                            {promo.areaName}
                          </p>
                          <p className="text-muted-foreground">
                            {promo.city}, {promo.country}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="text-sm font-semibold tabular-nums">
                          {promo.planUsersReach.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          users
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${meta.cls}`}
                        >
                          {meta.label}
                        </span>
                        {promo.status === "rejected" &&
                          promo.rejectionReason && (
                            <p className="text-xs text-destructive mt-1 max-w-[120px] truncate">
                              {promo.rejectionReason}
                            </p>
                          )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <Users className="w-3 h-3 text-muted-foreground shrink-0" />
                            <span className="tabular-nums font-medium">
                              {promo.usersReached.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              reached
                            </span>
                          </div>
                          <ReachBar
                            reached={promo.usersReached}
                            total={promo.planUsersReach}
                          />
                          <div className="flex items-center gap-2 text-xs">
                            <Eye className="w-3 h-3 text-muted-foreground shrink-0" />
                            <span className="tabular-nums font-medium">
                              {promo.usersViewed.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              viewed
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(promo.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(promo.expiresAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 flex-wrap">
                          {(promo.status === "pendingApproval" ||
                            (promo.status as string) === "pendingPayment") && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs gap-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                                onClick={() => handleApprove(promo.id)}
                                data-ocid={`promotions.approve_button.${idx + 1}`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10"
                                onClick={() => setRejectPromo(promo)}
                                data-ocid={`promotions.reject_button.${idx + 1}`}
                              >
                                <XCircle className="w-3.5 h-3.5" /> Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs gap-1"
                            onClick={() => setAnalyticsPromoId(promo.id)}
                            data-ocid={`promotions.analytics_button.${idx + 1}`}
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteId(promo.id)}
                            data-ocid={`promotions.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Promotion Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <CreatePromotionDialog onClose={() => setShowCreateDialog(false)} />
      </Dialog>

      {/* Analytics modal */}
      <Dialog
        open={!!analyticsPromoId}
        onOpenChange={() => setAnalyticsPromoId(null)}
      >
        <DialogContent
          className="sm:max-w-lg"
          data-ocid="promotions.analytics_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Promotion Analytics
            </DialogTitle>
          </DialogHeader>
          {analyticsPromo && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-muted/30 rounded-lg p-3">
                {analyticsPromo.imageLink && (
                  <img
                    src={analyticsPromo.imageLink}
                    alt=""
                    className="w-14 h-14 rounded-md object-cover shrink-0 border border-border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-sm">{analyticsPromo.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {analyticsPromo.advertiserName} · {analyticsPromo.areaName},{" "}
                    {analyticsPromo.city}
                  </p>
                  {analyticsPromo.reelLink && (
                    <a
                      href={analyticsPromo.reelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                    >
                      <Video className="w-3 h-3" /> View Reel
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Target Reach
                  </p>
                  <p className="font-bold text-lg font-display">
                    {analyticsPromo.planUsersReach.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Reached</p>
                  <p className="font-bold text-lg font-display text-primary">
                    {analyticsPromo.usersReached.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {analyticsPromo.planUsersReach > 0
                      ? Math.round(
                          (analyticsPromo.usersReached /
                            analyticsPromo.planUsersReach) *
                            100,
                        )
                      : 0}
                    % of target
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Viewed</p>
                  <p className="font-bold text-lg font-display text-emerald-600 dark:text-emerald-400">
                    {analyticsPromo.usersViewed.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {analyticsPromo.usersReached > 0
                      ? Math.round(
                          (analyticsPromo.usersViewed /
                            analyticsPromo.usersReached) *
                            100,
                        )
                      : 0}
                    % view rate
                  </p>
                </div>
              </div>

              {analyticsData && (
                <div className="bg-muted/30 rounded-lg p-3 text-sm text-muted-foreground">
                  Status:{" "}
                  <span className="font-medium text-foreground capitalize">
                    {String(analyticsData.status)}
                  </span>{" "}
                  · Reached:{" "}
                  <span className="font-medium text-foreground">
                    {Number(analyticsData.reachedCount)}
                  </span>{" "}
                  · Viewed:{" "}
                  <span className="font-medium text-foreground">
                    {Number(analyticsData.viewedCount)}
                  </span>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setAnalyticsPromoId(null)}
                data-ocid="promotions.analytics_close_button"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject modal */}
      <Dialog
        open={!!rejectPromo}
        onOpenChange={() => {
          setRejectPromo(null);
          setRejectReason("");
        }}
      >
        <DialogContent
          className="sm:max-w-md"
          data-ocid="promotions.reject_dialog"
        >
          <DialogHeader>
            <DialogTitle>Reject Promotion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Provide a reason for rejection. This will be shown to the
              advertiser.
            </p>
            {rejectPromo && (
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="font-medium text-sm">{rejectPromo.title}</p>
                <p className="text-xs text-muted-foreground">
                  {rejectPromo.advertiserName}
                </p>
              </div>
            )}
            <div className="space-y-1.5">
              <Label>Rejection Reason</Label>
              <Textarea
                placeholder="e.g. Content does not meet community guidelines..."
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                data-ocid="promotions.reject_reason_textarea"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setRejectPromo(null);
                  setRejectReason("");
                }}
                data-ocid="promotions.reject_cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleReject}
                data-ocid="promotions.reject_confirm_button"
              >
                Reject Promotion
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="promotions.delete_dialog"
        >
          <DialogHeader>
            <DialogTitle>Delete Promotion?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteId(null)}
              data-ocid="promotions.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                if (deleteId) handleDelete(deleteId);
              }}
              data-ocid="promotions.delete_confirm_button"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
