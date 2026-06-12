import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetManufacturerProductsForMerchant,
  usePlaceManufacturerOrder,
} from "@/hooks/useBackend";
import { useMerchants } from "@/hooks/useBackend";
import {
  AlertCircle,
  Building2,
  Package,
  RefreshCw,
  Search,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "All Categories",
  "Food & Beverages",
  "Electronics",
  "Clothing & Apparel",
  "Healthcare",
  "Agriculture",
  "Chemicals",
  "Plastics",
  "Machinery",
  "Automobiles",
  "Construction",
  "Textiles",
  "Other",
];

type BulkTier = {
  minQty: bigint | number;
  maxQty: bigint | number;
  pricePerUnit: number;
};

type MfgProduct = {
  id: string;
  productName: string;
  manufacturerName?: string;
  manufacturerId?: string;
  originCity?: string;
  batchCode?: string | null;
  hsnCode?: string | null;
  expiryDate?: string | null;
  priceToDistributor: number;
  priceToCustomer: number;
  bulkPricingTiers?: BulkTier[];
  isB2B?: boolean;
  category?: string;
  stockQty?: bigint | number;
};

function normalizeProduct(raw: Record<string, unknown>): MfgProduct {
  const tiers = Array.isArray(raw.bulkPricingTiers)
    ? (raw.bulkPricingTiers as Array<Record<string, unknown>>).map((t) => ({
        minQty: Number(t.minQty ?? 1),
        maxQty: Number(t.maxQty ?? 50),
        pricePerUnit: Number(t.pricePerUnit ?? 0),
      }))
    : [];
  return {
    id: String(raw.id ?? ""),
    productName: String(raw.productName ?? ""),
    manufacturerName: String(raw.manufacturerName ?? raw.manufacturerId ?? ""),
    manufacturerId: String(raw.manufacturerId ?? ""),
    originCity: String(raw.originCity ?? ""),
    batchCode: raw.batchCode ? String(raw.batchCode) : null,
    hsnCode: raw.hsnCode ? String(raw.hsnCode) : null,
    expiryDate: raw.expiryDate ? String(raw.expiryDate) : null,
    priceToDistributor: Number(raw.priceToDistributor ?? 0),
    priceToCustomer: Number(raw.priceToCustomer ?? 0),
    bulkPricingTiers: tiers,
    isB2B: !!(raw.isB2B ?? raw.isReturnable),
    category: String(raw.category ?? "Other"),
    stockQty: Number(raw.stockQty ?? 0),
  };
}

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

function BulkPricingTable({ tiers }: { tiers: BulkTier[] }) {
  if (!tiers || tiers.length === 0) return null;
  const labels = ["1–50 units", "51–100 units", "100+ units"];
  return (
    <div className="mt-3 rounded-lg border border-border overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-3 py-1.5 text-left font-medium text-muted-foreground">
              Qty Range
            </th>
            <th className="px-3 py-1.5 text-right font-medium text-muted-foreground">
              Price / Unit
            </th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, i) => (
            <tr
              key={`tier-${i}-${tier.minQty}`}
              className="border-t border-border/50"
            >
              <td className="px-3 py-1.5 text-foreground">
                {labels[i] ??
                  `${Number(tier.minQty)}–${Number(tier.maxQty)} units`}
              </td>
              <td className="px-3 py-1.5 text-right font-semibold text-primary">
                ₹{tier.pricePerUnit.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductCard({
  product,
  onOrder,
  isOrdering,
}: {
  product: MfgProduct;
  onOrder: (productId: string, qty: number, product: MfgProduct) => void;
  isOrdering: boolean;
}) {
  const [qty, setQty] = useState(1);

  const effectivePrice = () => {
    if (!product.bulkPricingTiers || product.bulkPricingTiers.length === 0) {
      return product.priceToDistributor;
    }
    for (const tier of product.bulkPricingTiers) {
      if (qty >= Number(tier.minQty) && qty <= Number(tier.maxQty)) {
        return tier.pricePerUnit;
      }
    }
    return product.priceToDistributor;
  };

  return (
    <div
      data-ocid="mfg_product.card"
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {product.productName}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Building2 className="h-3 w-3 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground truncate">
              {product.manufacturerName || "Unknown Manufacturer"}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {product.isB2B && (
            <Badge variant="secondary" className="text-xs">
              B2B
            </Badge>
          )}
          {product.category && (
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Meta info */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {product.originCity && (
          <div className="text-muted-foreground">
            <span className="font-medium">Origin:</span> {product.originCity}
          </div>
        )}
        {product.batchCode && (
          <div className="text-muted-foreground">
            <span className="font-medium">Batch:</span> {product.batchCode}
          </div>
        )}
        {product.hsnCode && (
          <div className="text-muted-foreground">
            <span className="font-medium">HSN:</span> {product.hsnCode}
          </div>
        )}
        {product.expiryDate && (
          <div className="text-muted-foreground">
            <span className="font-medium">Expiry:</span> {product.expiryDate}
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="flex items-center gap-3 text-sm">
        <div>
          <span className="text-muted-foreground text-xs">
            Distributor price
          </span>
          <p className="font-bold text-foreground">
            ₹{product.priceToDistributor.toFixed(2)}
          </p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div>
          <span className="text-muted-foreground text-xs">MRP</span>
          <p className="font-medium text-foreground">
            ₹{product.priceToCustomer.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Bulk pricing tiers */}
      <BulkPricingTable tiers={product.bulkPricingTiers ?? []} />

      {/* Order controls */}
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center border border-input rounded-md overflow-hidden">
          <button
            type="button"
            className="px-2 py-1 text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            data-ocid="mfg_product.qty_decrease"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Number.parseInt(e.target.value) || 1))
            }
            className="w-14 text-center text-sm bg-background border-x border-input py-1 focus:outline-none text-foreground"
            data-ocid="mfg_product.qty_input"
          />
          <button
            type="button"
            className="px-2 py-1 text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors"
            onClick={() => setQty((q) => q + 1)}
            data-ocid="mfg_product.qty_increase"
          >
            +
          </button>
        </div>
        <div className="flex-1 text-xs text-muted-foreground">
          Total:{" "}
          <span className="font-semibold text-foreground">
            ₹{(effectivePrice() * qty).toFixed(2)}
          </span>
        </div>
        <Button
          size="sm"
          onClick={() => onOrder(product.id, qty, product)}
          disabled={isOrdering}
          data-ocid="mfg_product.add_to_order_button"
          className="shrink-0"
        >
          <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
          Add to Order
        </Button>
      </div>
    </div>
  );
}

export default function MerchantManufacturerProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  // Derive merchant phone from merchant list (first record owned by current user)
  // In this app merchants are identified by phone; use the current actor's registered merchant phone
  const { data: merchants } = useMerchants();
  const merchantPhone =
    Array.isArray(merchants) && merchants.length > 0
      ? String(
          (merchants[0] as unknown as Record<string, unknown>)?.phone ?? "",
        )
      : "";

  const {
    data: rawProducts,
    isLoading,
    isError,
    refetch,
  } = useGetManufacturerProductsForMerchant(merchantPhone);

  const placeOrder = usePlaceManufacturerOrder();

  const products: MfgProduct[] = (Array.isArray(rawProducts) ? rawProducts : [])
    .map((p) => normalizeProduct(p as Record<string, unknown>))
    .filter((p) => !!p.productName);

  const filtered = products.filter((p) => {
    const matchSearch =
      search === "" ||
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      (p.manufacturerName ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "All Categories" || p.category === category;
    return matchSearch && matchCategory;
  });

  const handleOrder = (productId: string, qty: number, product: MfgProduct) => {
    placeOrder.mutate(
      {
        productId,
        merchantPhone,
        quantity: qty,
        pricePerUnit: product.priceToDistributor,
      },
      {
        onSuccess: () =>
          toast.success(`Order placed for ${qty}× ${product.productName}`),
        onError: (err) =>
          toast.error(
            `Order failed: ${err instanceof Error ? err.message : String(err)}`,
          ),
      },
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Browse Manufacturer Products
          </h1>
          <p className="text-sm text-muted-foreground">
            Products available through your registered distributor networks
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        className="flex flex-col sm:flex-row gap-3"
        data-ocid="mfg_products.filters"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by product name or manufacturer…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="mfg_products.search_input"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger
            className="w-full sm:w-52"
            data-ocid="mfg_products.category_select"
          >
            <Tag className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Category" />
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

      {/* Loading */}
      {isLoading && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="mfg_products.loading_state"
        >
          {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((sk) => (
            <SkeletonCard key={sk} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div
          className="flex flex-col items-center justify-center py-16 gap-4"
          data-ocid="mfg_products.error_state"
        >
          <AlertCircle className="h-10 w-10 text-destructive" />
          <p className="text-foreground font-medium">Failed to load products</p>
          <Button
            variant="outline"
            onClick={() => void refetch()}
            data-ocid="mfg_products.retry_button"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      )}

      {/* Empty — not in any network */}
      {!isLoading && !isError && products.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          data-ocid="mfg_products.empty_state"
        >
          <div className="p-4 rounded-full bg-muted">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              No products available
            </p>
            <p className="text-sm text-muted-foreground max-w-sm mt-1">
              You are not registered in any manufacturer distributor network.
              Contact a manufacturer to get a distributor code.
            </p>
          </div>
        </div>
      )}

      {/* Filtered empty (have products but filters exclude all) */}
      {!isLoading &&
        !isError &&
        products.length > 0 &&
        filtered.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3 text-center"
            data-ocid="mfg_products.no_results_state"
          >
            <Search className="h-8 w-8 text-muted-foreground" />
            <p className="text-foreground font-medium">
              No products match your filters
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

      {/* Product grid */}
      {!isLoading && !isError && filtered.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {products.length} product
            {products.length !== 1 ? "s" : ""}
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="mfg_products.list"
          >
            {filtered.map((product, idx) => (
              <div
                key={product.id || idx}
                data-ocid={`mfg_products.item.${idx + 1}`}
              >
                <ProductCard
                  product={product}
                  onOrder={handleOrder}
                  isOrdering={placeOrder.isPending}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
