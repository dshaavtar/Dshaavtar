import { Badge } from "@/components/ui/badge";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Eye, MapPin, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useMyPropertyListings,
  usePostProperty,
  useProperties,
} from "../hooks/useBackend";
import type { ContactRequest, Property } from "../types";
import { ContactRequestStatus, PropertyListingType } from "../types";

const PAGE_SIZE = 20;

// ─── Main Page ────────────────────────────────────────────────────────────────
const LISTING_TYPE_META: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  rent: {
    label: "Rent",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  lease: {
    label: "Lease",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-200 dark:border-violet-800",
  },
  buy: {
    label: "Buy",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  sale: {
    label: "Sale",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
};

function formatPrice(price: number, type: string): string {
  const suffix = type === "rent" || type === "lease" ? "/mo" : "";
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr${suffix}`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L${suffix}`;
  return `₹${price.toLocaleString("en-IN")}${suffix}`;
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1 shadow-sm">
      <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function ListingTypePill({
  type,
  active,
  onClick,
}: {
  type: string;
  active: boolean;
  onClick: () => void;
}) {
  const meta = LISTING_TYPE_META[type] ?? {
    label: type,
    bg: "",
    text: "",
    border: "",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
        active
          ? `${meta.bg} ${meta.text} ${meta.border}`
          : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
      }`}
      data-ocid={`filter-type-${type}`}
    >
      {meta.label}
    </button>
  );
}

function LeadsTable({
  leads,
  onApprove,
  onReject,
}: {
  leads: ContactRequest[];
  onApprove: (requesterId: string) => void;
  onReject: (requesterId: string) => void;
}) {
  if (!leads.length) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No leads yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-xs">
            <th className="text-left py-2 pr-3 font-medium">Name</th>
            <th className="text-left py-2 pr-3 font-medium">Phone</th>
            <th className="text-left py-2 pr-3 font-medium">Date</th>
            <th className="text-left py-2 pr-3 font-medium">Status</th>
            <th className="text-left py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.requesterId}
              className="border-b border-border/50 hover:bg-muted/30 transition-colors"
            >
              <td className="py-2.5 pr-3 font-medium">{lead.requesterName}</td>
              <td className="py-2.5 pr-3 text-muted-foreground font-mono text-xs">
                {lead.requesterPhone}
              </td>
              <td className="py-2.5 pr-3 text-muted-foreground text-xs whitespace-nowrap">
                {new Date(Number(lead.requestedAt)).toLocaleDateString("en-IN")}
              </td>
              <td className="py-2.5 pr-3">
                {lead.status === ContactRequestStatus.approved ? (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    Approved
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-muted-foreground text-xs"
                  >
                    Pending
                  </Badge>
                )}
              </td>
              <td className="py-2.5">
                {lead.status !== ContactRequestStatus.approved ? (
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => onApprove(lead.requesterId)}
                      data-ocid="prop-lead-approve-btn"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-xs"
                      onClick={() => onReject(lead.requesterId)}
                      data-ocid="prop-lead-reject-btn"
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── My Property Listings Tab ─────────────────────────────────────────────────

function MyPropertyListingsTab() {
  const [phone, setPhone] = useState("");
  const [queryPhone, setQueryPhone] = useState("");
  const {
    data: myProps = [],
    isLoading,
    error,
  } = useMyPropertyListings(queryPhone);

  return (
    <div className="space-y-4" data-ocid="my-properties.section">
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-sm font-medium text-foreground mb-3">
          Enter your phone number to view your property listings
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="max-w-xs"
            data-ocid="my-properties.phone_input"
          />
          <Button
            onClick={() => setQueryPhone(phone.trim())}
            disabled={!phone.trim()}
            data-ocid="my-properties.search_button"
          >
            View My Listings
          </Button>
        </div>
      </div>

      {!queryPhone && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="my-properties.empty_state"
        >
          <Building2 className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            Enter your phone number above to view your property listings
          </p>
        </div>
      )}

      {queryPhone && isLoading && (
        <div className="space-y-3">
          {["s1", "s2", "s3"].map((s) => (
            <Skeleton key={s} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      )}

      {queryPhone && !isLoading && (error || myProps.length === 0) && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="my-properties.no_results"
        >
          <Building2 className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            {error
              ? "Failed to load listings"
              : "No listings yet. Post your first one!"}
          </p>
          {error && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQueryPhone("")}
              data-ocid="my-properties.retry_button"
            >
              Retry
            </Button>
          )}
        </div>
      )}

      {queryPhone && !isLoading && myProps.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              {myProps.length} propert{myProps.length !== 1 ? "ies" : "y"}{" "}
              posted
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="my-properties.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Description
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Price</th>
                  <th className="text-left py-3 px-3 font-medium">Location</th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium">Posted</th>
                  <th className="text-right py-3 px-3 font-medium">Leads</th>
                </tr>
              </thead>
              <tbody>
                {myProps.map((prop, i) => {
                  const meta =
                    LISTING_TYPE_META[prop.listingType] ??
                    LISTING_TYPE_META.rent!;
                  return (
                    <tr
                      key={prop.id}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      data-ocid={`my-properties.item.${i + 1}`}
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${meta.bg} ${meta.text} ${meta.border}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground max-w-[180px] truncate">
                        {prop.description}
                      </td>
                      <td className="py-3 px-3 text-xs font-medium tabular-nums whitespace-nowrap">
                        {formatPrice(prop.expectedPrice, prop.listingType)}
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground max-w-[120px] truncate">
                        {prop.location.address}
                      </td>
                      <td className="py-3 px-3">
                        {prop.isActive ? (
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground text-xs"
                          >
                            Inactive
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(Number(prop.publishDate)).toLocaleDateString(
                          "en-IN",
                        )}
                      </td>
                      <td className="py-3 px-3 text-right tabular-nums font-semibold">
                        {prop.leads.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  const {
    data: properties = [],
    isLoading,
    isError,
    refetch,
  } = useProperties();
  const postProperty = usePostProperty();

  const [leadApprovals, setLeadApprovals] = useState<Record<string, boolean>>(
    {},
  );
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationSearch, setLocationSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProp, setSelectedProp] = useState<Property | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [form, setForm] = useState({
    listingType: "",
    description: "",
    expectedPrice: "",
    location: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalListings = properties.length;
  const activeListings = properties.filter((p) => p.isActive).length;
  const forRent = properties.filter(
    (p) => p.listingType === PropertyListingType.rent,
  ).length;
  const forSale = properties.filter(
    (p) => p.listingType === PropertyListingType.sale,
  ).length;
  const totalLeads = properties.reduce((s, p) => s + p.leads.length, 0);

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        if (typeFilter !== "all" && p.listingType !== typeFilter) return false;
        if (
          locationSearch &&
          !p.location.address
            .toLowerCase()
            .includes(locationSearch.toLowerCase())
        )
          return false;
        if (priceMin && p.expectedPrice < Number.parseInt(priceMin))
          return false;
        if (priceMax && p.expectedPrice > Number.parseInt(priceMax))
          return false;
        if (dateFrom && Number(p.publishDate) < new Date(dateFrom).getTime())
          return false;
        if (dateTo && Number(p.publishDate) > new Date(dateTo).getTime())
          return false;
        return true;
      }),
    [
      properties,
      typeFilter,
      locationSearch,
      priceMin,
      priceMax,
      dateFrom,
      dateTo,
    ],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Location heatmap
  const locationCounts: Record<string, number> = {};
  for (const p of properties) {
    const city =
      p.location.address.split(",").pop()?.trim() ?? p.location.address;
    locationCounts[city] = (locationCounts[city] ?? 0) + 1;
  }
  const locationRows = Object.entries(locationCounts).sort(
    (a, b) => b[1] - a[1],
  );

  async function handleSubmitProperty() {
    if (!form.listingType || !form.description || !form.expectedPrice) return;
    setIsSubmitting(true);
    try {
      await postProperty.mutateAsync({
        posterId: "admin",
        description: form.description,
        listingType: form.listingType as PropertyListingType,
        expectedPrice: Number.parseInt(form.expectedPrice) || 0,
        location: {
          lat: 28.6139,
          lng: 77.209,
          address: form.address || form.location || "India",
        },
      });
      toast.success("Property posted successfully");
      setIsSubmitting(false);
      setShowPostModal(false);
      setForm({
        listingType: "",
        description: "",
        expectedPrice: "",
        location: "",
        address: "",
      });
    } catch {
      toast.error("Failed to post property");
      setIsSubmitting(false);
    }
  }

  function handleApproveLead(propId: string, requesterId: string) {
    setLeadApprovals((prev) => ({
      ...prev,
      [`${propId}_${requesterId}`]: true,
    }));
    if (selectedProp) {
      const lead = selectedProp.leads.find(
        (l) => l.requesterId === requesterId,
      );
      if (lead) lead.status = ContactRequestStatus.approved;
    }
  }

  function handleRejectLead(propId: string, requesterId: string) {
    setLeadApprovals((prev) => ({
      ...prev,
      [`${propId}_${requesterId}`]: false,
    }));
  }

  const enrichedLeads = (p: Property): ContactRequest[] =>
    p.leads.map((lead) => ({
      ...lead,
      status:
        leadApprovals[`${p.id}_${lead.requesterId}`] !== undefined
          ? leadApprovals[`${p.id}_${lead.requesterId}`]
            ? ContactRequestStatus.approved
            : ContactRequestStatus.declined
          : lead.status,
    }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Property Listings
          </h2>
          <p className="text-sm text-muted-foreground">
            Browse, manage, and approve property leads
          </p>
        </div>
        <Button
          onClick={() => setShowPostModal(true)}
          className="gap-2 shrink-0"
          data-ocid="post-property-btn"
        >
          <Plus className="w-4 h-4" />
          Post Property (Admin)
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard
          label="Total Listings"
          value={totalListings}
          color="text-foreground"
        />
        <StatCard
          label="Active Listings"
          value={activeListings}
          color="text-primary"
        />
        <StatCard
          label="For Rent"
          value={forRent}
          color="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          label="For Sale"
          value={forSale}
          color="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          label="Total Leads"
          value={totalLeads}
          color="text-[oklch(0.6_0.18_202)]"
        />
      </div>

      {/* Tabs: All Listings / My Listings */}
      <Tabs defaultValue="all" data-ocid="properties.tabs">
        <TabsList className="mb-4">
          <TabsTrigger value="all" data-ocid="properties.tab.all">
            All Listings
          </TabsTrigger>
          <TabsTrigger value="my" data-ocid="properties.tab.my">
            My Listings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            {/* Type pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTypeFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  typeFilter === "all"
                    ? "bg-foreground text-background border-foreground"
                    : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                }`}
                data-ocid="filter-type-all"
              >
                All
              </button>
              {["rent", "lease", "buy", "sale"].map((t) => (
                <ListingTypePill
                  key={t}
                  type={t}
                  active={typeFilter === t}
                  onClick={() => setTypeFilter(t)}
                />
              ))}
            </div>

            {/* Other filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Location..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="pl-8 h-8 text-sm w-40"
                  data-ocid="prop-filter-location"
                />
              </div>

              <Input
                type="number"
                placeholder="Price min (₹)"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="h-8 text-sm w-32"
                data-ocid="prop-filter-price-min"
              />
              <Input
                type="number"
                placeholder="Price max (₹)"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="h-8 text-sm w-32"
                data-ocid="prop-filter-price-max"
              />

              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-8 text-sm w-36"
                data-ocid="prop-filter-date-from"
              />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-8 text-sm w-36"
                data-ocid="prop-filter-date-to"
              />

              {(typeFilter !== "all" ||
                locationSearch ||
                priceMin ||
                priceMax ||
                dateFrom ||
                dateTo) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-muted-foreground"
                  onClick={() => {
                    setTypeFilter("all");
                    setLocationSearch("");
                    setPriceMin("");
                    setPriceMax("");
                    setDateFrom("");
                    setDateTo("");
                  }}
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Showing {paginated.length} of {filtered.length} listings (page{" "}
              {page} of {totalPages})
            </p>
          </div>

          {/* Property Cards Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["p-sk-1", "p-sk-2", "p-sk-3", "p-sk-4", "p-sk-5", "p-sk-6"].map(
                (s) => (
                  <Skeleton key={s} className="h-52 w-full rounded-xl" />
                ),
              )}
            </div>
          ) : isError ? (
            <div
              className="flex flex-col items-center gap-3 py-16 text-center bg-card border border-border rounded-xl"
              data-ocid="properties.error_state"
            >
              <Building2 className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm font-medium">
                Unable to load listings. Please try again.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void refetch()}
                data-ocid="properties.retry_button"
              >
                Retry
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center gap-3 py-16 text-center bg-card border border-border rounded-xl"
              data-ocid="properties-empty-state"
            >
              <Building2 className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">
                No property listings found
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPostModal(true)}
              >
                Post a Property
              </Button>
            </div>
          ) : (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="properties-grid"
            >
              {paginated.map((prop) => {
                const meta =
                  LISTING_TYPE_META[prop.listingType] ??
                  LISTING_TYPE_META.rent!;
                const endDate = new Date(Number(prop.endDate));
                const isExpired = endDate < new Date();
                return (
                  <button
                    key={prop.id}
                    type="button"
                    className="bg-card border border-border rounded-xl p-4 space-y-3 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer text-left w-full"
                    onClick={() => setSelectedProp(prop)}
                    data-ocid={`prop-card-${prop.id}`}
                  >
                    {/* Header: type badge + status */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${meta.bg} ${meta.text} ${meta.border}`}
                      >
                        {meta.label}
                      </span>
                      {prop.isActive && !isExpired ? (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground text-xs"
                        >
                          {isExpired ? "Expired" : "Inactive"}
                        </Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold font-display text-foreground">
                        {formatPrice(prop.expectedPrice, prop.listingType)}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{prop.location.address}</span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1 border-t border-border/50">
                      <div className="flex items-center gap-1.5">
                        {prop.leads.length > 0 && (
                          <Badge variant="outline" className="text-xs gap-1">
                            <Eye className="w-3 h-3" />
                            {prop.leads.length} leads
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(Number(prop.publishDate)).toLocaleDateString(
                          "en-IN",
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  data-ocid="properties.pagination_prev"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  data-ocid="properties.pagination_next"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Location Heatmap */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Location Breakdown</h3>
              <span className="text-xs text-muted-foreground ml-auto">
                {locationRows.length} cities/areas
              </span>
            </div>
            {locationRows.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No location data
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table
                  className="w-full text-sm"
                  data-ocid="location-heatmap-table"
                >
                  <thead className="bg-muted/40 border-b border-border">
                    <tr className="text-xs text-muted-foreground">
                      <th className="text-left py-2 px-4 font-medium">
                        Location
                      </th>
                      <th className="text-right py-2 px-4 font-medium">
                        Listings
                      </th>
                      <th className="text-left py-2 px-4 font-medium">
                        Distribution
                      </th>
                      <th className="text-left py-2 px-4 font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {locationRows.map(([city, count]) => {
                      const pct =
                        Math.round((count / totalListings) * 100) || 0;
                      return (
                        <tr
                          key={city}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="py-2.5 px-4 font-medium">{city}</td>
                          <td className="py-2.5 px-4 text-right tabular-nums font-semibold">
                            {count}
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-muted rounded-full h-1.5 max-w-[120px]">
                                <div
                                  className="bg-primary h-1.5 rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground w-8 text-right">
                                {pct}%
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs gap-1"
                              onClick={() => setLocationSearch(city)}
                              data-ocid={`view-location-${city.replace(/\s/g, "-")}`}
                            >
                              <Search className="w-3 h-3" />
                              View
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
        </TabsContent>

        <TabsContent value="my">
          <MyPropertyListingsTab />
        </TabsContent>
      </Tabs>

      {/* Property Detail Sheet */}
      <Sheet open={!!selectedProp} onOpenChange={() => setSelectedProp(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
        >
          {selectedProp && (
            <>
              <SheetHeader className="pb-4 border-b border-border">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <SheetTitle className="text-base font-bold font-display leading-snug">
                      {selectedProp.description.slice(0, 60)}
                      {selectedProp.description.length > 60 ? "…" : ""}
                    </SheetTitle>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {(() => {
                        const m =
                          LISTING_TYPE_META[selectedProp.listingType] ??
                          LISTING_TYPE_META.rent!;
                        return (
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${m.bg} ${m.text} ${m.border}`}
                          >
                            {m.label}
                          </span>
                        );
                      })()}
                      {selectedProp.isActive ? (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground text-xs"
                        >
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="leads" className="flex-1">
                    Leads ({selectedProp.leads.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Full Description
                    </p>
                    <p className="text-sm leading-relaxed">
                      {selectedProp.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Expected Price
                      </p>
                      <p className="text-base font-bold font-display">
                        {formatPrice(
                          selectedProp.expectedPrice,
                          selectedProp.listingType,
                        )}
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Listing Type
                      </p>
                      <p className="text-sm font-medium capitalize">
                        {selectedProp.listingType}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Location
                    </p>
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-sm">{selectedProp.location.address}</p>
                    </div>
                    <div className="bg-background border border-border rounded-md p-2 mt-2 text-xs font-mono text-muted-foreground">
                      📍 Lat: {selectedProp.location.lat.toFixed(6)} | Lng:{" "}
                      {selectedProp.location.lng.toFixed(6)}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Posted By
                    </p>
                    <p className="text-sm font-medium">
                      {selectedProp.posterId}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Timeline
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <div className="w-px h-6 bg-border" />
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${new Date(Number(selectedProp.endDate)) < new Date() ? "bg-destructive" : "bg-primary"}`}
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="font-medium">Published</p>
                          <p className="text-muted-foreground">
                            {new Date(
                              Number(selectedProp.publishDate),
                            ).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Expires</p>
                          <p
                            className={
                              new Date(Number(selectedProp.endDate)) <
                              new Date()
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }
                          >
                            {new Date(
                              Number(selectedProp.endDate),
                            ).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="leads" className="mt-4">
                  <LeadsTable
                    leads={enrichedLeads(selectedProp)}
                    onApprove={(userId) =>
                      handleApproveLead(selectedProp.id, userId)
                    }
                    onReject={(userId) =>
                      handleRejectLead(selectedProp.id, userId)
                    }
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Post Property Modal */}
      <Dialog open={showPostModal} onOpenChange={setShowPostModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Post a Property</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Listing Type *</Label>
              <Select
                value={form.listingType}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, listingType: v }))
                }
              >
                <SelectTrigger data-ocid="prop-form-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="lease">Lease</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Description *</Label>
              <Textarea
                placeholder="Describe the property — type, size, amenities, condition..."
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                data-ocid="prop-form-description"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Expected Price (₹) *</Label>
              <Input
                type="number"
                placeholder="e.g. 28000 for rent or 8500000 for sale"
                value={form.expectedPrice}
                onChange={(e) =>
                  setForm((f) => ({ ...f, expectedPrice: e.target.value }))
                }
                data-ocid="prop-form-price"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input
                placeholder="City or area"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                data-ocid="prop-form-location"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Full Address</Label>
              <Input
                placeholder="Full address including society/locality"
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                data-ocid="prop-form-address"
              />
            </div>

            <div className="bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground">
              📅 Duration: auto-set to <strong>2 weeks</strong> from today
              (expires{" "}
              {new Date(Date.now() + 14 * 86400000).toLocaleDateString("en-IN")}
              )
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPostModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmitProperty}
                disabled={
                  isSubmitting ||
                  !form.listingType ||
                  !form.description ||
                  !form.expectedPrice
                }
                data-ocid="prop-form-submit"
              >
                {isSubmitting ? "Posting..." : "Post Property"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
