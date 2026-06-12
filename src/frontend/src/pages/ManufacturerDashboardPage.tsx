import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  ChevronRight,
  Mail,
  Package,
  Phone,
  RefreshCw,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import type {
  DistributorNetwork,
  ExpiryReturn,
  Manufacturer,
  ManufacturerComplaint,
  ManufacturerDashboardStats,
  ManufacturerProduct,
  ManufacturerRating,
} from "../backend.d";
import {
  useDistributorNetwork,
  useExpiryReturns,
  useGetManufacturerReviewsAndComplaints,
  useManufacturerByUser,
  useManufacturerComplaints,
  useManufacturerDashboardStats,
  useManufacturerProducts,
  useManufacturerRatings,
} from "../hooks/useBackend";

function ReviewsComplaintsSummary({
  manufacturerId,
  ratings,
  complaints,
}: {
  manufacturerId?: string;
  ratings: ManufacturerRating[];
  complaints: ManufacturerComplaint[];
}) {
  const { data: rcData } =
    useGetManufacturerReviewsAndComplaints(manufacturerId);
  const avgRating =
    ratings.length > 0
      ? ratings.reduce((s, r) => s + Number(r.rating), 0) / ratings.length
      : 0;
  const recentComplaints = complaints.slice(0, 3);
  const recentRatings = ratings.slice(0, 3);
  const totalComplaints =
    (rcData as { complaints?: unknown[] } | null)?.complaints?.length ??
    complaints.length;

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 space-y-4"
      data-ocid="manufacturer.reviews_complaints.card"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm text-foreground">
          Reviews &amp; Complaints Summary
        </h2>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="text-xs">
            {totalComplaints} complaints
          </Badge>
          <Badge variant="outline" className="text-xs">
            {avgRating.toFixed(1)} ★ avg
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Recent Complaints
          </p>
          <div className="space-y-2">
            {recentComplaints.length === 0 && (
              <p className="text-xs text-muted-foreground">No complaints</p>
            )}
            {recentComplaints.map((c) => (
              <div key={c.id} className="flex items-center gap-2">
                <span className="text-xs text-foreground truncate flex-1">
                  {c.subject}
                </span>
                <Badge
                  className={`text-xs ${String(c.status) === "open" ? "bg-red-500/10 text-red-600 border-red-500/30" : "bg-green-500/10 text-green-600 border-green-500/30"}`}
                >
                  {String(c.status)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Recent Ratings
          </p>
          <div className="space-y-2">
            {recentRatings.length === 0 && (
              <p className="text-xs text-muted-foreground">No ratings</p>
            )}
            {recentRatings.map((r) => (
              <div key={r.id} className="flex items-center gap-2">
                <span className="text-xs text-yellow-500">
                  {Array.from({ length: Number(r.rating) }, () => "★").join("")}
                </span>
                {r.review && (
                  <span className="text-xs text-muted-foreground truncate flex-1">
                    {r.review}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  loading,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  loading?: boolean;
}) {
  return (
    <div className="stat-card" data-ocid="manufacturer.stat_card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      {loading ? (
        <Skeleton className="h-7 w-20" />
      ) : (
        <p className="text-2xl font-bold text-foreground">{value}</p>
      )}
    </div>
  );
}

export default function ManufacturerDashboardPage() {
  const {
    data: statsRaw,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useManufacturerDashboardStats();
  const stats = statsRaw as ManufacturerDashboardStats | null;
  const { data: profileRaw, isLoading: profileLoading } =
    useManufacturerByUser();
  const profile = profileRaw as Manufacturer | null;
  const { data: productsRaw = [] } = useManufacturerProducts();
  const products = productsRaw as ManufacturerProduct[];
  const { data: distributorsRaw = [] } = useDistributorNetwork();
  const distributors = distributorsRaw as DistributorNetwork[];
  const { data: returnsRaw = [] } = useExpiryReturns();
  const returns = returnsRaw as ExpiryReturn[];
  const { data: complaintsRaw = [] } = useManufacturerComplaints();
  const complaints = complaintsRaw as ManufacturerComplaint[];
  const { data: ratingsRaw = [] } = useManufacturerRatings();
  const ratings = ratingsRaw as ManufacturerRating[];

  const pendingReturns = returns.filter((r) => String(r.status) === "pending");
  const openComplaintsCount = complaints.filter(
    (c) => String(c.status) === "open",
  ).length;
  const recentRatings = ratings.slice(0, 5);

  if (!profileLoading && !profile) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 gap-4"
        data-ocid="manufacturer.empty_state"
      >
        <Building2 className="w-12 h-12 text-muted-foreground" />
        <div className="text-center">
          <p className="font-semibold text-foreground">
            No Manufacturer Profile
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Register as a manufacturer to manage your network
          </p>
        </div>
        <Button asChild data-ocid="manufacturer.register_button">
          <Link to="/manufacturer-registration">Register as Manufacturer</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="manufacturer.page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Manufacturer Dashboard
          </h1>
          {profile && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {profile.businessName}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {profile && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {profile.customerCarePhone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {profile.customerCareEmail}
              </span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetchStats();
              toast.success("Refreshed");
            }}
            data-ocid="manufacturer.refresh_button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Distributors"
          value={stats ? Number(stats.totalDistributors) : "—"}
          icon={Users}
          color="bg-blue-500/10 text-blue-500"
          loading={statsLoading}
        />
        <StatCard
          label="Products"
          value={stats ? Number(stats.totalProducts) : "—"}
          icon={Package}
          color="bg-primary/10 text-primary"
          loading={statsLoading}
        />
        <StatCard
          label="Total Orders"
          value={stats ? Number(stats.totalOrders) : "—"}
          icon={ShoppingCart}
          color="bg-purple-500/10 text-purple-500"
          loading={statsLoading}
        />
        <StatCard
          label="Avg Rating"
          value={stats ? `${stats.avgRating.toFixed(1)} ★` : "—"}
          icon={Star}
          color="bg-yellow-500/10 text-yellow-500"
          loading={statsLoading}
        />
        <StatCard
          label="Active Distributors"
          value={stats ? Number(stats.activeDistributors) : "—"}
          icon={TrendingUp}
          color="bg-green-500/10 text-green-500"
          loading={statsLoading}
        />
        <StatCard
          label="Pending Returns"
          value={stats ? Number(stats.pendingReturns) : "—"}
          icon={AlertCircle}
          color="bg-orange-500/10 text-orange-500"
          loading={statsLoading}
        />
        <StatCard
          label="Open Complaints"
          value={stats ? Number(stats.openComplaints) : openComplaintsCount}
          icon={AlertCircle}
          color="bg-red-500/10 text-red-500"
          loading={statsLoading}
        />
        <StatCard
          label="Margin Paid"
          value={stats ? `₹${stats.totalMarginPaid.toLocaleString()}` : "—"}
          icon={TrendingUp}
          color="bg-indigo-500/10 text-indigo-500"
          loading={statsLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distributor Network Preview */}
        <div className="bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-semibold text-sm text-foreground">
              Distributor Network
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link
                to="/manufacturer-distributors"
                data-ocid="manufacturer.distributor_network_link"
              >
                View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-border">
            {distributors.slice(0, 4).map((d, i) => (
              <div
                key={d.id}
                className="flex items-center justify-between px-4 py-2.5"
                data-ocid={`manufacturer.distributor.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {d.distributorName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {d.city} · {d.pincode}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="outline" className="text-xs">
                    {d.marginPercent}% margin
                  </Badge>
                  <span
                    className={`w-2 h-2 rounded-full ${d.status === "active" ? "bg-green-500" : "bg-muted-foreground"}`}
                  />
                </div>
              </div>
            ))}
            {distributors.length === 0 && (
              <p className="text-sm text-muted-foreground px-4 py-4 text-center">
                No distributors yet
              </p>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-semibold text-sm text-foreground">Products</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link
                to="/manufacturer-products"
                data-ocid="manufacturer.products_link"
              >
                View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-border">
            {products.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-4 py-2.5"
                data-ocid={`manufacturer.product.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {p.productName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Batch: {p.batchNumber} · Exp: {p.expiryDate}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  Qty: {Number(p.stockQty)}
                </span>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-sm text-muted-foreground px-4 py-4 text-center">
                No products yet
              </p>
            )}
          </div>
        </div>

        {/* Pending Returns */}
        <div className="bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
              Expiry Returns
              {pendingReturns.length > 0 && (
                <Badge className="text-xs" variant="destructive">
                  {pendingReturns.length} pending
                </Badge>
              )}
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link
                to="/manufacturer-returns"
                data-ocid="manufacturer.returns_link"
              >
                View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-border">
            {pendingReturns.slice(0, 3).map((r, i) => (
              <div
                key={r.id}
                className="flex items-center justify-between px-4 py-2.5"
                data-ocid={`manufacturer.return.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {r.returnedBy}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.reason}</p>
                </div>
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  Qty: {Number(r.quantity)}
                </Badge>
              </div>
            ))}
            {pendingReturns.length === 0 && (
              <p className="text-sm text-muted-foreground px-4 py-4 text-center">
                No pending returns
              </p>
            )}
          </div>
        </div>

        {/* Recent Ratings */}
        <div className="bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-semibold text-sm text-foreground">
              Recent Ratings
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link
                to="/manufacturer-ratings"
                data-ocid="manufacturer.ratings_link"
              >
                View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-border">
            {recentRatings.map((r, i) => (
              <div
                key={r.id}
                className="px-4 py-2.5"
                data-ocid={`manufacturer.rating.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {r.ratedBy}
                  </p>
                  <span className="text-xs text-yellow-500 font-semibold">
                    {Array.from({ length: Number(r.rating) }, () => "★").join(
                      "",
                    )}
                  </span>
                </div>
                {r.review && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {r.review}
                  </p>
                )}
              </div>
            ))}
            {recentRatings.length === 0 && (
              <p className="text-sm text-muted-foreground px-4 py-4 text-center">
                No ratings yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reviews & Complaints Summary */}
      <ReviewsComplaintsSummary
        manufacturerId={profile?.id}
        ratings={ratings}
        complaints={complaints}
      />

      {/* Quick Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Products",
            path: "/manufacturer-products",
            icon: Package,
            color: "text-primary",
          },
          {
            label: "Distributors",
            path: "/manufacturer-distributors",
            icon: Users,
            color: "text-blue-500",
          },
          {
            label: "Returns",
            path: "/manufacturer-returns",
            icon: AlertCircle,
            color: "text-orange-500",
          },
          {
            label: "Complaints",
            path: "/manufacturer-complaints",
            icon: AlertCircle,
            color: "text-red-500",
          },
          {
            label: "Ratings",
            path: "/manufacturer-ratings",
            icon: Star,
            color: "text-yellow-500",
          },
        ].map(({ label, path, icon: Icon, color }) => (
          <Button
            key={path}
            variant="outline"
            asChild
            className="h-12 justify-start gap-2"
          >
            <Link
              to={path}
              data-ocid={`manufacturer.nav.${label.toLowerCase()}`}
            >
              <Icon className={`w-4 h-4 ${color}`} />
              {label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
