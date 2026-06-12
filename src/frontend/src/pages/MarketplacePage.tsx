import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Plus, ShoppingBag, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateMarketplaceItem,
  useDeactivateMarketplaceItem,
  useMarketplaceItems,
  useUserListings,
} from "../hooks/useBackend";
import type { MarketplaceItem } from "../types";

const CATEGORIES = [
  "Electronics",
  "Vehicle",
  "Utensils",
  "Clothing",
  "Furniture",
  "Kitchen Equipment",
  "Equipment",
] as const;

type Category = (typeof CATEGORIES)[number];

const STATUS_FILTERS = ["all", "active", "inactive"] as const;
const LISTING_TYPES = ["all", "sale", "rent"] as const;

function formatDate(ts: bigint | number): string {
  const ms = typeof ts === "bigint" ? Number(ts) : ts;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ListingTypeBadge({ type }: { type: string }) {
  const isSale = type === "sale" || type === "For Sale";
  return (
    <Badge
      variant="outline"
      className={
        isSale
          ? "border-blue-400 text-blue-600 bg-blue-50"
          : "border-amber-400 text-amber-600 bg-amber-50"
      }
    >
      {isSale ? "For Sale" : "For Rent"}
    </Badge>
  );
}

// ─── All Listings Tab ─────────────────────────────────────────────────────────

function AllListingsTab() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [listingTypeFilter, setListingTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: items = [], isLoading } = useMarketplaceItems(
    categoryFilter !== "all" ? categoryFilter : undefined,
    listingTypeFilter !== "all" ? listingTypeFilter : undefined,
  );

  const deactivate = useDeactivateMarketplaceItem();

  const filtered = items.filter((item: MarketplaceItem) => {
    if (statusFilter === "active") return item.isActive;
    if (statusFilter === "inactive") return !item.isActive;
    return true;
  });

  function handleDeactivate(id: string) {
    deactivate.mutate(id, {
      onSuccess: () => toast.success("Listing deactivated"),
      onError: () => toast.error("Failed to deactivate listing"),
    });
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div
        className="flex flex-wrap gap-3 items-center"
        data-ocid="marketplace.filters"
      >
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger
            className="w-44"
            data-ocid="marketplace.category_filter"
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={listingTypeFilter} onValueChange={setListingTypeFilter}>
          <SelectTrigger className="w-36" data-ocid="marketplace.type_filter">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            {LISTING_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t === "all"
                  ? "All Types"
                  : t === "sale"
                    ? "For Sale"
                    : "For Rent"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36" data-ocid="marketplace.status_filter">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((s) => (
              <SelectItem key={s} value={s}>
                {s === "all"
                  ? "All Status"
                  : s === "active"
                    ? "Active"
                    : "Inactive"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground ml-auto">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-2" data-ocid="marketplace.loading_state">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center gap-3"
          data-ocid="marketplace.empty_state"
        >
          <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-40" />
          <p className="font-medium text-muted-foreground">No listings found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or add a new listing.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item: MarketplaceItem, idx: number) => (
                <TableRow
                  key={item.id}
                  data-ocid={`marketplace.item.${idx + 1}`}
                  className={!item.isActive ? "opacity-60" : ""}
                >
                  <TableCell className="font-medium max-w-[140px] truncate">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    ₹{item.price.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{Number(item.yearOfManufacture)}</TableCell>
                  <TableCell>
                    <ListingTypeBadge type={item.listingType} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.invoiceAvailable ? "default" : "outline"}
                    >
                      {item.invoiceAvailable ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.isActive ? "default" : "secondary"}>
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[100px] truncate text-sm">
                    {item.createdBy}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell>
                    {item.instagramPhotoLink ? (
                      <a
                        href={item.instagramPhotoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        data-ocid={`marketplace.photo_link.${idx + 1}`}
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.isActive && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7"
                        onClick={() => handleDeactivate(item.id)}
                        disabled={deactivate.isPending}
                        data-ocid={`marketplace.deactivate_button.${idx + 1}`}
                        aria-label="Deactivate listing"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" />
                        Deactivate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ─── Add New Listing Form ─────────────────────────────────────────────────────

const INITIAL_FORM = {
  title: "",
  price: "",
  category: "" as Category | "",
  yearOfManufacture: "",
  instagramPhotoLink: "",
  listingType: "sale" as "sale" | "rent",
  invoiceAvailable: false,
  createdBy: "",
};

function AddListingTab({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const createItem = useCreateMarketplaceItem();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.price ||
      !form.category ||
      !form.yearOfManufacture
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const year = Number.parseInt(form.yearOfManufacture, 10);
    if (
      !Number.isFinite(year) ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      toast.error("Please enter a valid year of manufacture");
      return;
    }
    const price = Number.parseFloat(form.price);
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    createItem.mutate(
      {
        title: form.title.trim(),
        price,
        category: form.category,
        yearOfManufacture: BigInt(year),
        instagramPhotoLink: form.instagramPhotoLink.trim(),
        listingType: form.listingType,
        invoiceAvailable: form.invoiceAvailable,
        createdBy: form.createdBy.trim() || "admin",
      },
      {
        onSuccess: () => {
          toast.success("Listing created successfully!");
          setForm(INITIAL_FORM);
          onSuccess();
        },
        onError: (err) => {
          toast.error(`Failed to create listing: ${err.message}`);
        },
      },
    );
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Old Item Listing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          data-ocid="marketplace.add_form"
        >
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="mp-title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="mp-title"
              placeholder="e.g. Honda Activa 2018"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              data-ocid="marketplace.title.input"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <Label htmlFor="mp-price">
              Price (₹) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                ₹
              </span>
              <Input
                id="mp-price"
                type="number"
                min={1}
                step={1}
                placeholder="0"
                className="pl-7"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                data-ocid="marketplace.price.input"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label>
              Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.category}
              onValueChange={(v) =>
                setForm({ ...form, category: v as Category })
              }
            >
              <SelectTrigger data-ocid="marketplace.category.select">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year of Manufacture */}
          <div className="space-y-1.5">
            <Label htmlFor="mp-year">
              Year of Manufacture <span className="text-destructive">*</span>
            </Label>
            <Input
              id="mp-year"
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              placeholder="e.g. 2018"
              value={form.yearOfManufacture}
              onChange={(e) =>
                setForm({ ...form, yearOfManufacture: e.target.value })
              }
              data-ocid="marketplace.year.input"
              required
            />
          </div>

          {/* Instagram Photo Link */}
          <div className="space-y-1.5">
            <Label htmlFor="mp-photo">Instagram / Photo Link</Label>
            <Input
              id="mp-photo"
              type="url"
              placeholder="https://instagram.com/p/..."
              value={form.instagramPhotoLink}
              onChange={(e) =>
                setForm({ ...form, instagramPhotoLink: e.target.value })
              }
              data-ocid="marketplace.photo_link.input"
            />
          </div>

          {/* Listing Type */}
          <div className="space-y-2">
            <Label>
              Listing Type <span className="text-destructive">*</span>
            </Label>
            <div
              className="flex gap-4"
              data-ocid="marketplace.listing_type.radio"
            >
              {(["sale", "rent"] as const).map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="listingType"
                    value={type}
                    checked={form.listingType === type}
                    onChange={() => setForm({ ...form, listingType: type })}
                    className="accent-primary"
                    data-ocid={`marketplace.listing_type.${type}`}
                  />
                  <span className="text-sm font-medium">
                    {type === "sale" ? "For Sale" : "For Rent"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Invoice Available */}
          <div className="flex items-center gap-3">
            <Switch
              id="mp-invoice"
              checked={form.invoiceAvailable}
              onCheckedChange={(v) => setForm({ ...form, invoiceAvailable: v })}
              data-ocid="marketplace.invoice.switch"
            />
            <Label htmlFor="mp-invoice" className="cursor-pointer">
              Invoice Available
            </Label>
          </div>

          {/* Posted By */}
          <div className="space-y-1.5">
            <Label htmlFor="mp-poster">Posted By (phone / name)</Label>
            <Input
              id="mp-poster"
              placeholder="e.g. +91-9876543210 or admin"
              value={form.createdBy}
              onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
              data-ocid="marketplace.posted_by.input"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex gap-3">
            <Button
              type="submit"
              disabled={createItem.isPending}
              data-ocid="marketplace.submit_button"
            >
              {createItem.isPending ? "Saving…" : "Add Listing"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setForm(INITIAL_FORM)}
              data-ocid="marketplace.cancel_button"
            >
              Reset
            </Button>
          </div>

          {createItem.isError && (
            <p
              className="text-sm text-destructive"
              data-ocid="marketplace.error_state"
            >
              {createItem.error?.message ?? "Something went wrong"}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

// ─── My Listings Tab ──────────────────────────────────────────────────────────

function MyListingsTab({ userId }: { userId: string }) {
  const { data: items = [], isLoading } = useUserListings(userId);
  const deactivate = useDeactivateMarketplaceItem();

  function handleDeactivate(id: string) {
    deactivate.mutate(id, {
      onSuccess: () => toast.success("Listing deactivated"),
      onError: () => toast.error("Failed to deactivate listing"),
    });
  }

  if (!userId) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center gap-3"
        data-ocid="marketplace.my_listings_empty_state"
      >
        <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-40" />
        <p className="font-medium text-muted-foreground">
          Enter your phone / user ID
        </p>
        <p className="text-sm text-muted-foreground">
          Type your registered phone number in "Posted By" and switch to this
          tab.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="space-y-2"
        data-ocid="marketplace.my_listings_loading_state"
      >
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center gap-3"
        data-ocid="marketplace.my_listings_empty_state"
      >
        <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-40" />
        <p className="font-medium text-muted-foreground">No listings yet</p>
        <p className="text-sm text-muted-foreground">
          Add your first listing using the "Add New Listing" tab.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: MarketplaceItem, idx: number) => (
            <TableRow
              key={item.id}
              data-ocid={`marketplace.my_listing.${idx + 1}`}
              className={!item.isActive ? "opacity-60" : ""}
            >
              <TableCell className="font-medium max-w-[140px] truncate">
                {item.title}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                ₹{item.price.toLocaleString("en-IN")}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{item.category}</Badge>
              </TableCell>
              <TableCell>{Number(item.yearOfManufacture)}</TableCell>
              <TableCell>
                <ListingTypeBadge type={item.listingType} />
              </TableCell>
              <TableCell>
                <Badge variant={item.isActive ? "default" : "secondary"}>
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {item.isActive && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7"
                    onClick={() => handleDeactivate(item.id)}
                    disabled={deactivate.isPending}
                    data-ocid={`marketplace.my_listing_deactivate_button.${idx + 1}`}
                    aria-label="Deactivate listing"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Deactivate
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const [tab, setTab] = useState<"listings" | "my-listings" | "add">(
    "listings",
  );
  const [myListingsUserId, setMyListingsUserId] = useState("");
  const { data: allItems = [] } = useMarketplaceItems();
  const activeCount = allItems.filter(
    (i: MarketplaceItem) => i.isActive,
  ).length;

  return (
    <div className="space-y-6" data-ocid="marketplace.page">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Old Items Marketplace
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage sell, buy, and rent listings for used items
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {activeCount} active listing{activeCount !== 1 ? "s" : ""}
          </Badge>
          <Button
            size="sm"
            onClick={() => setTab("add")}
            data-ocid="marketplace.add_listing_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Listing
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "listings" | "my-listings" | "add")}
      >
        <TabsList data-ocid="marketplace.tabs">
          <TabsTrigger
            value="listings"
            data-ocid="marketplace.all_listings.tab"
          >
            All Listings
            {allItems.length > 0 && (
              <span className="ml-1.5 text-xs bg-muted rounded-full px-1.5 py-0.5">
                {allItems.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="my-listings"
            data-ocid="marketplace.my_listings.tab"
          >
            My Listings
          </TabsTrigger>
          <TabsTrigger value="add" data-ocid="marketplace.add_new.tab">
            Add New Listing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="pt-4">
          <AllListingsTab />
        </TabsContent>

        <TabsContent value="my-listings" className="pt-4 space-y-4">
          <div className="flex gap-3 items-center">
            <div className="flex-1 max-w-sm">
              <Label
                htmlFor="my-listings-user"
                className="text-xs text-muted-foreground mb-1 block"
              >
                Your phone number or user ID
              </Label>
              <Input
                id="my-listings-user"
                placeholder="e.g. +91-9876543210"
                value={myListingsUserId}
                onChange={(e) => setMyListingsUserId(e.target.value)}
                data-ocid="marketplace.my_listings_user.input"
              />
            </div>
          </div>
          <MyListingsTab userId={myListingsUserId} />
        </TabsContent>

        <TabsContent value="add" className="pt-4">
          <AddListingTab onSuccess={() => setTab("listings")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
