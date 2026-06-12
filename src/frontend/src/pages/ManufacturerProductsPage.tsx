import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Package, Phone, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Manufacturer, ManufacturerProduct } from "../backend.d";
import {
  useAddManufacturerProduct,
  useDiscontinueProduct,
  useManufacturerByUser,
  useManufacturerProducts,
} from "../hooks/useBackend";

type ShowFilter = "active" | "all";

const EMPTY_FORM = {
  productName: "",
  batchNumber: "",
  expiryDate: "",
  priceToDistributor: "",
  priceToCustomer: "",
  stockQty: "",
  originCity: "",
  hsnCode: "",
  batchCode: "",
  isB2B: false,
  isReturnable: false,
  isDiscontinued: false,
  bulkTier1Price: "",
  bulkTier2Price: "",
  bulkTier3Price: "",
};

type ManufactureDatePreset = "1week" | "1month" | "1year" | "";

export default function ManufacturerProductsPage() {
  const { data: profileRaw } = useManufacturerByUser();
  const profile = profileRaw as Manufacturer | null;
  const { data: productsRaw = [], isLoading } = useManufacturerProducts();
  const products = productsRaw as ManufacturerProduct[];
  const addMutation = useAddManufacturerProduct();
  const discontinueMutation = useDiscontinueProduct();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showFilter, setShowFilter] = useState<ShowFilter>("active");
  const [manufactureDatePreset, setManufactureDatePreset] =
    useState<ManufactureDatePreset>("");
  const [hasExpiryDate, setHasExpiryDate] = useState(false);

  function field(key: keyof typeof EMPTY_FORM) {
    const v = form[key];
    return {
      value: typeof v === "boolean" ? String(v) : (v as string),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.productName || !form.batchNumber) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      if (!profile) {
        toast.error("Manufacturer profile not loaded");
        return;
      }
      const manufactureDateMs =
        manufactureDatePreset === "1week"
          ? Date.now() - 7 * 86400000
          : manufactureDatePreset === "1month"
            ? Date.now() - 30 * 86400000
            : manufactureDatePreset === "1year"
              ? Date.now() - 365 * 86400000
              : Date.now();
      const manufactureDateBigInt =
        BigInt(Math.floor(manufactureDateMs)) * 1_000_000n;
      const expiryDateStr: string | null =
        hasExpiryDate && form.expiryDate ? form.expiryDate : null;
      const t1 = Number(form.bulkTier1Price);
      const t2 = Number(form.bulkTier2Price);
      const t3 = Number(form.bulkTier3Price);
      const bulkTiers =
        t1 > 0 || t2 > 0 || t3 > 0
          ? [
              { minQty: 1n, maxQty: 50n, pricePerUnit: t1 },
              { minQty: 51n, maxQty: 100n, pricePerUnit: t2 },
              { minQty: 101n, maxQty: 999999n, pricePerUnit: t3 },
            ]
          : [];
      await addMutation.mutateAsync({
        manufacturerId: profile.id,
        productName: form.productName,
        batchNumber: form.batchNumber,
        hsnCode: form.hsnCode || null,
        batchCode: form.batchCode || null,
        manufactureDate: manufactureDateBigInt,
        expiryDate: expiryDateStr,
        priceToDistributor: Number(form.priceToDistributor),
        priceToCustomer: Number(form.priceToCustomer),
        bulkPricingTiers: bulkTiers,
        isReturnable: form.isReturnable,
        stockQty: BigInt(Number(form.stockQty)),
        originCity: form.originCity,
      });
      toast.success("Product added!");
      setDialogOpen(false);
      setForm({ ...EMPTY_FORM });
      setManufactureDatePreset("");
      setHasExpiryDate(false);
    } catch (err) {
      toast.error(`Failed: ${String(err)}`);
    }
  }

  return (
    <div className="space-y-5" data-ocid="manufacturer.products.page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Manufacturer Products
          </h1>
          <div className="flex items-center gap-1 mt-1">
            {(["active", "all"] as ShowFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setShowFilter(f)}
                className={`px-2.5 py-0.5 rounded text-xs font-medium capitalize transition-colors ${
                  showFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`manufacturer.products.filter.${f}`}
              >
                {f === "active" ? "Active" : "All"}
              </button>
            ))}
          </div>
          {profile && (
            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {profile.customerCarePhone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {profile.customerCareEmail}
              </span>
            </div>
          )}
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          data-ocid="manufacturer.products.add_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Product
        </Button>
      </div>

      {/* Customer Care Banner */}
      {profile && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 flex flex-wrap items-center gap-4 text-sm">
          <span className="font-medium text-foreground">Customer Care:</span>
          <a
            href={`tel:${profile.customerCarePhone}`}
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            {profile.customerCarePhone}
          </a>
          <a
            href={`mailto:${profile.customerCareEmail}`}
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <Mail className="w-3.5 h-3.5" />
            {profile.customerCareEmail}
          </a>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-12 w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 gap-3"
            data-ocid="manufacturer.products.empty_state"
          >
            <Package className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No products yet. Add your first product.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  {[
                    "Product",
                    "Batch",
                    "Origin City",
                    "Mfg. Date",
                    "Expiry",
                    "Dist. Price",
                    "Cust. Price",
                    "Stock",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products
                  .filter((p: ManufacturerProduct) =>
                    showFilter === "active"
                      ? !(p as unknown as Record<string, unknown>)
                          .isDiscontinued
                      : true,
                  )
                  .map((p: ManufacturerProduct, i: number) => {
                    const mfgMs = Number(p.manufactureDate) / 1_000_000;
                    const daysAgo = Math.floor((Date.now() - mfgMs) / 86400000);
                    const mfgLabel =
                      daysAgo < 30
                        ? `${daysAgo}d ago`
                        : `${Math.floor(daysAgo / 30)}mo ago`;
                    const expStr = p.expiryDate?.[0]
                      ? new Date(
                          Number(p.expiryDate[0]) / 1_000_000,
                        ).toLocaleDateString()
                      : "No expiry";
                    const soon = p.expiryDate?.[0]
                      ? Number(p.expiryDate[0]) / 1_000_000 <=
                        Date.now() + 30 * 86400000
                      : false;
                    const pAny = p as unknown as Record<string, unknown>;
                    const discontinued = Boolean(pAny.isDiscontinued);
                    const hsnCode = pAny.hsnCode as string | null | undefined;
                    const b2bCode = pAny.b2bCode as string | null | undefined;
                    return (
                      <tr
                        key={p.id}
                        className={`hover:bg-muted/20 transition-colors ${discontinued ? "opacity-60" : ""}`}
                        data-ocid={`manufacturer.products.item.${i + 1}`}
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          <div className="flex flex-col gap-0.5">
                            <span>{p.productName}</span>
                            <div className="flex items-center gap-1 flex-wrap">
                              {b2bCode && (
                                <Badge className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/30">
                                  B2B: {b2bCode}
                                </Badge>
                              )}
                              {hsnCode && (
                                <span className="text-xs text-muted-foreground">
                                  HSN: {hsnCode}
                                </span>
                              )}
                              {discontinued && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  Discontinued
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">
                          {p.batchNumber}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {p.originCity || "—"}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">
                          {mfgLabel}
                        </td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`text-xs font-medium ${soon ? "text-orange-500" : "text-muted-foreground"}`}
                          >
                            {expStr}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          ₹{p.priceToDistributor.toLocaleString()}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          ₹{p.priceToCustomer.toLocaleString()}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          {Number(p.stockQty)}
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge
                            variant={
                              discontinued
                                ? "destructive"
                                : Number(p.stockQty) > 0
                                  ? "outline"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {discontinued
                              ? "Discontinued"
                              : Number(p.stockQty) > 0
                                ? "In Stock"
                                : "Out of Stock"}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5">
                          {!discontinued && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs text-red-600 border-red-500/30 hover:bg-red-500/10"
                              disabled={discontinueMutation.isPending}
                              onClick={async () => {
                                if (!profile) return;
                                try {
                                  await discontinueMutation.mutateAsync({
                                    productId: p.id,
                                    manufacturerId: profile.id,
                                  });
                                  toast.success("Product discontinued");
                                } catch (err) {
                                  toast.error(`Failed: ${String(err)}`);
                                }
                              }}
                              data-ocid={`manufacturer.products.discontinue_button.${i + 1}`}
                            >
                              Discontinue
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="sm:max-w-md"
          data-ocid="manufacturer.products.dialog"
        >
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Product Name *</Label>
              <Input
                placeholder="e.g. Turmeric Powder 500g"
                {...field("productName")}
                data-ocid="manufacturer.products.name_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Batch Number *</Label>
                <Input
                  placeholder="BATCH-001"
                  {...field("batchNumber")}
                  data-ocid="manufacturer.products.batch_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Origin City</Label>
                <Input
                  placeholder="e.g. Mumbai, Delhi"
                  {...field("originCity")}
                  data-ocid="manufacturer.products.origin_city_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Manufacture Date</Label>
              <div className="flex gap-2">
                {[
                  { key: "1week" as const, label: "1 Week Ago" },
                  { key: "1month" as const, label: "1 Month Ago" },
                  { key: "1year" as const, label: "1 Year Ago" },
                ].map((opt) => (
                  <Button
                    key={opt.key}
                    type="button"
                    variant={
                      manufactureDatePreset === opt.key ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setManufactureDatePreset(opt.key)}
                    data-ocid={`manufacturer.products.mfg_${opt.key}_button`}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
              {manufactureDatePreset && (
                <p className="text-xs text-muted-foreground">
                  Selected:{" "}
                  {new Date(
                    manufactureDatePreset === "1week"
                      ? Date.now() - 7 * 86400000
                      : manufactureDatePreset === "1month"
                        ? Date.now() - 30 * 86400000
                        : Date.now() - 365 * 86400000,
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="hasExpiry"
                checked={hasExpiryDate}
                onCheckedChange={(v) => setHasExpiryDate(Boolean(v))}
                data-ocid="manufacturer.products.has_expiry_checkbox"
              />
              <Label htmlFor="hasExpiry" className="cursor-pointer">
                Product has an expiry date
              </Label>
            </div>
            {hasExpiryDate && (
              <div className="space-y-1.5">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  {...field("expiryDate")}
                  data-ocid="manufacturer.products.expiry_input"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Price to Distributor (₹)</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  {...field("priceToDistributor")}
                  data-ocid="manufacturer.products.dist_price_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Price to Customer (₹)</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  {...field("priceToCustomer")}
                  data-ocid="manufacturer.products.cust_price_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                {...field("stockQty")}
                data-ocid="manufacturer.products.stock_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>HSN Code (optional)</Label>
                <Input
                  placeholder="e.g. 0910"
                  value={form.hsnCode}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, hsnCode: e.target.value }))
                  }
                  data-ocid="manufacturer.products.hsn_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Batch Code (optional)</Label>
                <Input
                  placeholder="e.g. BC-2024"
                  value={form.batchCode}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, batchCode: e.target.value }))
                  }
                  data-ocid="manufacturer.products.batch_code_input"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="isB2B"
                checked={form.isB2B}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, isB2B: Boolean(v) }))
                }
                data-ocid="manufacturer.products.b2b_checkbox"
              />
              <Label htmlFor="isB2B" className="cursor-pointer">
                B2B Product
              </Label>
            </div>
            {form.isB2B && (
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isReturnable"
                  checked={form.isReturnable}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isReturnable: Boolean(v) }))
                  }
                  data-ocid="manufacturer.products.returnable_checkbox"
                />
                <Label htmlFor="isReturnable" className="cursor-pointer">
                  Returnable / Exchangeable
                </Label>
              </div>
            )}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Bulk Pricing Tiers (optional)
              </Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-20">
                    Qty 1–50
                  </span>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Price per unit"
                    value={form.bulkTier1Price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bulkTier1Price: e.target.value }))
                    }
                    data-ocid="manufacturer.products.bulk_tier1_input"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-20">
                    Qty 51–100
                  </span>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Price per unit"
                    value={form.bulkTier2Price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bulkTier2Price: e.target.value }))
                    }
                    data-ocid="manufacturer.products.bulk_tier2_input"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-20">
                    Qty 100+
                  </span>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Price per unit"
                    value={form.bulkTier3Price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bulkTier3Price: e.target.value }))
                    }
                    data-ocid="manufacturer.products.bulk_tier3_input"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="manufacturer.products.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addMutation.isPending}
                data-ocid="manufacturer.products.submit_button"
              >
                {addMutation.isPending ? "Adding…" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
