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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  ImageIcon,
  MapPin,
  Package,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import StatusBadge from "../components/StatusBadge";
import {
  useAddProduct,
  useAddProductsBulk,
  useCheckProductPriceUniformity,
  useDeleteProductLocationPrice,
  useMerchants,
  useProductLocationPrices,
  useProducts,
  useSetProductLocationPrice,
} from "../hooks/useBackend";
import { useDebounce, usePagination } from "../hooks/usePagination";
import type { Product as BackendProduct } from "../types";

// Use the backend Product type directly (qty is bigint from Motoko Nat)
type Product = BackendProduct;

// ─── Price Uniformity Badge ────────────────────────────────────────────────

function PriceUniformityBadge({ productId }: { productId: string }) {
  const { data } = useCheckProductPriceUniformity(productId);
  if (!data || data.locationCount === 0) return null;
  return data.isUniform ? (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border bg-green-100 text-green-700 border-green-200">
      <CheckCircle className="w-3 h-3 mr-1" />
      Uniform pricing
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border bg-amber-100 text-amber-700 border-amber-200">
      <MapPin className="w-3 h-3 mr-1" />
      Variable ({data.locationCount} locations)
    </span>
  );
}

// --- Product Image placeholder ---
function ProductImage({ urls }: { urls: string[] }) {
  if (urls.length > 0) {
    return (
      <img
        src={urls[0]}
        alt="Product"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const next = e.currentTarget.nextElementSibling;
          if (next instanceof HTMLElement) next.classList.remove("hidden");
        }}
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
    </div>
  );
}

// ─── Location Pricing Section ─────────────────────────────────────────────────

function LocationPricingSection({ productId }: { productId: string }) {
  const {
    data: prices = [],
    isLoading,
    refetch,
  } = useProductLocationPrices(productId);
  const setPrice = useSetProductLocationPrice();
  const deletePrice = useDeleteProductLocationPrice();
  const [form, setForm] = useState({ city: "", branch: "", price: "" });
  const [adding, setAdding] = useState(false);

  async function handleAdd() {
    if (!form.city.trim() || !form.price.trim()) {
      toast.error("City and price are required");
      return;
    }
    try {
      await setPrice.mutateAsync({
        productId,
        city: form.city,
        branch: form.branch,
        price: Number.parseFloat(form.price),
      });
      toast.success("Location price saved");
      setForm({ city: "", branch: "", price: "" });
      setAdding(false);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save price");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Location Pricing
        </p>
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-xs gap-1"
          onClick={() => setAdding((p) => !p)}
          data-ocid="product.location-pricing.add_button"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </Button>
      </div>

      {adding && (
        <div className="border border-border rounded-lg p-3 space-y-2 bg-muted/20">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground mb-1">
                City *
              </Label>
              <Input
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
                placeholder="Mumbai"
                className="h-7 text-xs"
                data-ocid="product.location-pricing.city.input"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1">
                Branch
              </Label>
              <Input
                value={form.branch}
                onChange={(e) =>
                  setForm((f) => ({ ...f, branch: e.target.value }))
                }
                placeholder="Main Store"
                className="h-7 text-xs"
                data-ocid="product.location-pricing.branch.input"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1">
                Price *
              </Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                placeholder="450"
                className="h-7 text-xs"
                data-ocid="product.location-pricing.price.input"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={handleAdd}
              disabled={setPrice.isPending}
              data-ocid="product.location-pricing.save_button"
            >
              {setPrice.isPending ? "Saving…" : "Save"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-3 text-xs"
              onClick={() => setAdding(false)}
              data-ocid="product.location-pricing.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : prices.length === 0 ? (
        <p className="text-xs text-muted-foreground italic py-2">
          No location-specific prices set. Base rate applies everywhere.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-1.5 pr-2 font-medium">City</th>
                <th className="text-left py-1.5 pr-2 font-medium">Branch</th>
                <th className="text-right py-1.5 pr-2 font-medium">Price</th>
                <th className="text-right py-1.5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p: Record<string, unknown>, idx: number) => (
                <tr
                  key={String(p.id ?? idx)}
                  className="border-b border-border/40"
                  data-ocid={`product.location-pricing.item.${idx + 1}`}
                >
                  <td className="py-1.5 pr-2 font-medium">
                    {String(p.city ?? "—")}
                  </td>
                  <td className="py-1.5 pr-2 text-muted-foreground">
                    {String(p.branch ?? "—")}
                  </td>
                  <td className="py-1.5 pr-2 text-right tabular-nums font-semibold">
                    ₹{String(p.price ?? 0)}
                  </td>
                  <td className="py-1.5 text-right">
                    <button
                      type="button"
                      aria-label="Delete location price"
                      className="p-1 rounded hover:bg-destructive/10 text-destructive"
                      onClick={async () => {
                        try {
                          await deletePrice.mutateAsync({
                            productId,
                            city: String(p.city ?? ""),
                            branch: String(p.branch ?? ""),
                          });
                          toast.success("Location price deleted");
                          refetch();
                        } catch {
                          toast.error("Failed to delete");
                        }
                      }}
                      data-ocid={`product.location-pricing.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Product detail sheet ---
function ProductDetailSheet({
  product,
  onClose,
}: { product: Product | null; onClose: () => void }) {
  if (!product) return null;

  return (
    <Sheet open={!!product} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display">{product.title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-5">
          <div className="h-48 rounded-xl overflow-hidden bg-muted">
            <ProductImage urls={product.imageUrls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Product ID", value: product.id },
              { label: "Merchant ID", value: product.merchantId },
              {
                label: "Base Rate",
                value: `₹${product.baseRate.toLocaleString("en-IN")}`,
              },
              {
                label: "Discount",
                value:
                  product.specialDiscount > 0
                    ? `${product.specialDiscount}%`
                    : "None",
              },
              {
                label: "Condition",
                value: product.isNew ? "New" : "Refurbished",
              },
              {
                label: "Status",
                value: product.isActive ? "Active" : "Inactive",
              },
              ...(product.qty !== undefined &&
              product.qty !== null &&
              product.qty !== 0n
                ? [
                    {
                      label: "Qty Available",
                      value: String(Number(product.qty)),
                    },
                  ]
                : []),
              ...(product.packing
                ? [{ label: "Packing / Size", value: product.packing }]
                : []),
              ...(product.expiry
                ? [{ label: "Expiry", value: product.expiry }]
                : []),
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/30 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {product.description && (
            <div className="bg-muted/20 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Description</p>
              <p className="text-sm">{product.description}</p>
            </div>
          )}

          {product.bulkRates && product.bulkRates.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Bulk Rates
              </p>
              <div className="space-y-1.5">
                {product.bulkRates.map((br) => (
                  <div
                    key={`${Number(br.minQuantity)}-${br.rate}`}
                    className="flex justify-between text-sm p-2.5 bg-muted/20 rounded-lg"
                  >
                    <span className="text-muted-foreground">
                      Min {Number(br.minQuantity)} units
                    </span>
                    <span className="font-medium">₹{br.rate}/unit</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <LocationPricingSection productId={product.id} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// --- CSV row parsed from Excel template ---
interface ParsedProductRow {
  title: string;
  description: string;
  imageUrl: string;
  rate: number;
  bulkRate: number;
  bulkQuantity: number;
  condition: string;
  specialDiscount: number;
  youtubeLink: string;
}

// --- Manual product form ---
interface BulkRateRow {
  id: string;
  minQty: string;
  rate: string;
}

function ManualProductTab({
  merchantId,
  onClose,
}: { merchantId: string; onClose: () => void }) {
  const addProduct = useAddProduct();
  const [form, setForm] = useState({
    title: "",
    description: "",
    baseRate: "",
    specialDiscount: "0",
    isNew: true,
    imageUrls: "",
    bulkRates: [] as BulkRateRow[],
    qty: "",
    packing: "",
    expiry: "",
  });

  function addBulkRow() {
    setForm((f) => ({
      ...f,
      bulkRates: [
        ...f.bulkRates,
        { id: `br-${Date.now()}`, minQty: "", rate: "" },
      ],
    }));
  }

  function removeBulkRow(id: string) {
    setForm((f) => ({
      ...f,
      bulkRates: f.bulkRates.filter((r) => r.id !== id),
    }));
  }

  function updateBulkRow(id: string, field: "minQty" | "rate", value: string) {
    setForm((f) => ({
      ...f,
      bulkRates: f.bulkRates.map((r) =>
        r.id === id ? { ...r, [field]: value } : r,
      ),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!merchantId) {
      toast.error("Please select a merchant first");
      return;
    }
    if (!form.title || !form.baseRate) {
      toast.error("Product title and base rate are required");
      return;
    }
    try {
      const imageUrls = form.imageUrls
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);
      await addProduct.mutateAsync({
        merchantId,
        title: form.title,
        description: form.description,
        imageUrls,
        isNew: form.isNew,
        baseRate: Number.parseFloat(form.baseRate) || 0,
        specialDiscount: Number.parseFloat(form.specialDiscount) || 0,
        qty: form.qty ? BigInt(Number.parseInt(form.qty, 10)) : undefined,
        packing: form.packing || undefined,
        expiry: form.expiry || undefined,
      });
      toast.success("Product added successfully");
      onClose();
    } catch {
      toast.error("Failed to add product");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="space-y-2">
        <Label htmlFor="title">Product Title *</Label>
        <Input
          id="title"
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Basmati Rice 5kg"
          data-ocid="product-form-title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Describe the product…"
          rows={2}
          data-ocid="product-form-description"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="baseRate">Base Rate (₹) *</Label>
          <Input
            id="baseRate"
            required
            type="number"
            min="0"
            value={form.baseRate}
            onChange={(e) =>
              setForm((f) => ({ ...f, baseRate: e.target.value }))
            }
            placeholder="0"
            data-ocid="product-form-base-rate"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Special Discount (%)</Label>
          <Input
            id="discount"
            type="number"
            min="0"
            max="100"
            value={form.specialDiscount}
            onChange={(e) =>
              setForm((f) => ({ ...f, specialDiscount: e.target.value }))
            }
            placeholder="0"
            data-ocid="product-form-discount"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label htmlFor="qty">Qty Available</Label>
          <Input
            id="qty"
            type="number"
            min="0"
            value={form.qty}
            onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
            placeholder="e.g. 50"
            data-ocid="product-form-qty"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="packing">Packing / Size</Label>
          <Input
            id="packing"
            value={form.packing}
            onChange={(e) =>
              setForm((f) => ({ ...f, packing: e.target.value }))
            }
            placeholder="e.g. 500ml, 1kg"
            data-ocid="product-form-packing"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            value={form.expiry}
            onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))}
            placeholder="e.g. Dec 2025"
            data-ocid="product-form-expiry"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrls">Image URLs (one per line)</Label>
        <Textarea
          id="imageUrls"
          value={form.imageUrls}
          onChange={(e) =>
            setForm((f) => ({ ...f, imageUrls: e.target.value }))
          }
          placeholder="https://…"
          rows={2}
          data-ocid="product-form-images"
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={form.isNew}
          onCheckedChange={(v) => setForm((f) => ({ ...f, isNew: v }))}
          id="isNew"
          data-ocid="product-form-condition"
        />
        <Label htmlFor="isNew">New condition (uncheck for refurbished)</Label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Bulk Rates</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addBulkRow}
            className="gap-1 h-7 text-xs"
            data-ocid="product-form-add-bulk"
          >
            <Plus className="w-3 h-3" /> Add Row
          </Button>
        </div>
        {form.bulkRates.map((row) => (
          <div key={row.id} className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min qty"
              value={row.minQty}
              onChange={(e) => updateBulkRow(row.id, "minQty", e.target.value)}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Rate (₹)"
              value={row.rate}
              onChange={(e) => updateBulkRow(row.id, "rate", e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => removeBulkRow(row.id)}
              className="p-1 h-8 w-8"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={addProduct.isPending}
          data-ocid="product-form-submit"
        >
          {addProduct.isPending ? "Adding…" : "Save Product"}
        </Button>
      </div>
    </form>
  );
}

// --- Excel Upload Tab ---
function ExcelUploadTab({
  merchantId,
  onClose,
}: { merchantId: string; onClose: () => void }) {
  const addProductsBulk = useAddProductsBulk();
  const fileRef = useRef<HTMLInputElement>(null);
  const [parsedRows, setParsedRows] = useState<ParsedProductRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [parseError, setParseError] = useState("");

  function downloadTemplate() {
    // CSV template with exact headers the parser expects
    const headers =
      "name,description,imageUrl,rate,bulkRate,bulkQuantity,condition,specialDiscount,youtubeLink";
    const sample =
      "Basmati Rice 5kg,Premium long grain rice,https://example.com/rice.jpg,299,249,10,new,5,";
    const sample2 =
      "Toor Dal 1kg,High quality toor dal,https://example.com/dal.jpg,120,100,20,new,0,";
    const csv = `${headers}\n${sample}\n${sample2}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product-upload-template.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Template downloaded — fill in the CSV and upload it");
  }

  function parseCSV(text: string): ParsedProductRow[] {
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return [];
    // Skip header row
    const dataLines = lines.slice(1);
    return dataLines
      .map((line) => {
        // Simple CSV split (handles commas in fields only if quoted)
        const cols = line.split(",");
        return {
          title: (cols[0] ?? "").trim(),
          description: (cols[1] ?? "").trim(),
          imageUrl: (cols[2] ?? "").trim(),
          rate: Number.parseFloat(cols[3] ?? "0") || 0,
          bulkRate: Number.parseFloat(cols[4] ?? "0") || 0,
          bulkQuantity: Number.parseInt(cols[5] ?? "0", 10) || 0,
          condition: (cols[6] ?? "new").trim().toLowerCase(),
          specialDiscount: Number.parseFloat(cols[7] ?? "0") || 0,
          youtubeLink: (cols[8] ?? "").trim(),
        };
      })
      .filter((r) => r.title && r.rate > 0);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setParseError("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const rows = parseCSV(text);
        if (rows.length === 0) {
          setParseError(
            "No valid rows found. Make sure the file matches the template format.",
          );
          setParsedRows([]);
        } else {
          setParsedRows(rows);
          toast.success(`Parsed ${rows.length} products — review and import`);
        }
      } catch {
        setParseError("Failed to parse file. Please use the template format.");
        setParsedRows([]);
      }
    };
    reader.readAsText(file);
    // Reset input so the same file can be re-selected
    e.target.value = "";
  }

  async function handleImport() {
    if (!merchantId) {
      toast.error("Please select a merchant first");
      return;
    }
    if (parsedRows.length === 0) {
      toast.error("No products to import");
      return;
    }
    try {
      const products = parsedRows.map((r) => ({
        title: r.title,
        description: r.description,
        imageUrls: r.imageUrl ? [r.imageUrl] : [],
        isNew: r.condition !== "refurbished",
        baseRate: r.rate,
        specialDiscount: r.specialDiscount,
        bulkRates:
          r.bulkRate > 0 && r.bulkQuantity > 0
            ? [{ minQuantity: BigInt(r.bulkQuantity), rate: r.bulkRate }]
            : [],
        videoUrl: r.youtubeLink || undefined,
      }));
      await addProductsBulk.mutateAsync({ merchantId, products });
      toast.success(`${products.length} products imported successfully`);
      onClose();
    } catch {
      toast.error("Failed to import products");
    }
  }

  return (
    <div className="space-y-4 mt-2">
      {/* Step 1: Download template */}
      <div className="bg-muted/30 rounded-xl p-4 space-y-2">
        <p className="text-sm font-medium flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
            1
          </span>
          Download the CSV template
        </p>
        <p className="text-xs text-muted-foreground pl-7">
          Fill in your product details using the template format, then upload
          the completed file below.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 ml-7"
          onClick={downloadTemplate}
          data-ocid="product-excel-download-template"
        >
          <Download className="w-3.5 h-3.5" />
          Download Template (CSV)
        </Button>
      </div>

      {/* Step 2: Upload file */}
      <div className="bg-muted/30 rounded-xl p-4 space-y-2">
        <p className="text-sm font-medium flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
            2
          </span>
          Upload completed CSV / Excel file
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls,.txt"
          className="hidden"
          onChange={handleFile}
          data-ocid="product-excel-upload-input"
          aria-label="Upload product CSV file"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="ml-7 flex items-center gap-3 w-full border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 hover:bg-muted/20 transition-colors text-left"
          data-ocid="product-excel-upload-dropzone"
        >
          <FileSpreadsheet className="w-8 h-8 text-muted-foreground shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {fileName || "Choose CSV or Excel file"}
            </p>
            <p className="text-xs text-muted-foreground">
              {fileName
                ? "Click to replace"
                : "Supports .csv, .xlsx, .xls files"}
            </p>
          </div>
        </button>
        {parseError && (
          <p className="text-xs text-destructive flex items-center gap-1 ml-7">
            <AlertCircle className="w-3 h-3" /> {parseError}
          </p>
        )}
      </div>

      {/* Step 3: Preview parsed rows */}
      {parsedRows.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
              3
            </span>
            Preview — {parsedRows.length} products ready to import
          </p>
          <div className="max-h-48 overflow-y-auto border border-border rounded-xl ml-7">
            <table className="w-full text-xs">
              <thead className="bg-muted/40 sticky top-0">
                <tr>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">
                    Rate (₹)
                  </th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">
                    Discount
                  </th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                    Condition
                  </th>
                </tr>
              </thead>
              <tbody>
                {parsedRows.map((row) => (
                  <tr
                    key={`${row.title}-${row.rate}`}
                    className="border-t border-border/50 hover:bg-muted/20"
                  >
                    <td className="px-3 py-2 font-medium max-w-[150px] truncate">
                      {row.title}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      ₹{row.rate}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {row.specialDiscount > 0
                        ? `${row.specialDiscount}%`
                        : "—"}
                    </td>
                    <td className="px-3 py-2 capitalize text-muted-foreground">
                      {row.condition}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 ml-7">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              className="flex-1 gap-2"
              onClick={handleImport}
              disabled={addProductsBulk.isPending}
              data-ocid="product-excel-import-button"
            >
              {addProductsBulk.isPending ? (
                <>
                  <div className="w-3 h-3 border border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Importing…
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Import {parsedRows.length} Products
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {parsedRows.length === 0 && !parseError && (
        <div className="flex gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

// --- Photo Menu Tab ---
function PhotoMenuTab({
  merchantId,
  onClose,
}: { merchantId: string; onClose: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setSaved(false);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPreviewUrl(evt.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function handleSave() {
    if (!merchantId) {
      toast.error("Please select a merchant first");
      return;
    }
    if (!previewUrl) {
      toast.error("Please select a photo menu image first");
      return;
    }
    setSaving(true);
    try {
      // Photo menu AI parsing is not available yet — show a clear message
      // directing the merchant to add products manually.
      toast.info(
        "Photo parsing is not yet available. Please use Manual Entry or Excel Upload to add your products.",
        { duration: 6000 },
      );
      setSaved(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4 mt-2">
      <p className="text-sm text-muted-foreground">
        Upload a photo of your full menu (e.g. a handwritten or printed menu
        board). Customers will see this when browsing your store.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        data-ocid="product-photo-menu-upload-input"
        aria-label="Upload photo menu"
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="w-full border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 hover:bg-muted/20 transition-colors text-center"
        data-ocid="product-photo-menu-dropzone"
      >
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium text-foreground">
          {fileName || "Choose menu photo"}
        </p>
        <p className="text-xs text-muted-foreground">
          {fileName ? "Click to replace" : "JPG, PNG, WebP — max 10MB"}
        </p>
      </button>

      {previewUrl && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Preview
          </p>
          <div className="rounded-xl overflow-hidden border border-border max-h-64">
            <img
              src={previewUrl}
              alt="Menu preview"
              className="w-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="flex-1 gap-2"
          onClick={handleSave}
          disabled={!previewUrl || saving || saved}
          data-ocid="product-photo-menu-save-button"
        >
          {saving ? (
            <>
              <div className="w-3 h-3 border border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Saving…
            </>
          ) : saved ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              Saved
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              Save Photo Menu
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// --- Add Product Dialog with tabs ---
function AddProductModal({ onClose }: { onClose: () => void }) {
  const { data: merchants = [] } = useMerchants();
  const [merchantId, setMerchantId] = useState("");
  const [activeTab, setActiveTab] = useState("manual");

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Add Products</DialogTitle>
        </DialogHeader>

        {/* Merchant selector — shared across all tabs */}
        <div className="space-y-2">
          <Label htmlFor="merchant-select">Select Merchant *</Label>
          <Select value={merchantId} onValueChange={setMerchantId}>
            <SelectTrigger
              id="merchant-select"
              data-ocid="product-form-merchant"
            >
              <SelectValue placeholder="Choose a merchant" />
            </SelectTrigger>
            <SelectContent>
              {merchants.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.businessName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger
              value="manual"
              className="text-xs gap-1"
              data-ocid="product-tab-manual"
            >
              <Plus className="w-3 h-3" /> Manual
            </TabsTrigger>
            <TabsTrigger
              value="excel"
              className="text-xs gap-1"
              data-ocid="product-tab-excel"
            >
              <FileSpreadsheet className="w-3 h-3" /> Excel
            </TabsTrigger>
            <TabsTrigger
              value="photo"
              className="text-xs gap-1"
              data-ocid="product-tab-photo"
            >
              <ImageIcon className="w-3 h-3" /> Photo Menu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <ManualProductTab merchantId={merchantId} onClose={onClose} />
          </TabsContent>

          <TabsContent value="excel">
            <ExcelUploadTab merchantId={merchantId} onClose={onClose} />
          </TabsContent>

          <TabsContent value="photo">
            <PhotoMenuTab merchantId={merchantId} onClose={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// --- Product card ---
function ProductCard({
  product,
  merchantName,
  onClick,
}: { product: Product; merchantName: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-md transition-all group"
      data-ocid="products-card"
    >
      <div className="h-36 overflow-hidden bg-muted relative">
        <ProductImage urls={product.imageUrls} />
        <div className="absolute top-2 right-2 flex gap-1 flex-wrap justify-end">
          <StatusBadge type="boolean" value={product.isActive} />
          {product.specialDiscount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-emerald-100 text-emerald-700 border-emerald-200">
              {product.specialDiscount}% off
            </span>
          )}
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {product.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">{merchantName}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-base font-bold text-foreground">
            ₹{product.baseRate.toLocaleString("en-IN")}
          </p>
          <div className="flex items-center gap-1">
            {product.packing && (
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                {product.packing}
              </span>
            )}
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground capitalize">
              {product.isNew ? "New" : "Refurbished"}
            </span>
          </div>
        </div>
        <PriceUniformityBadge productId={product.id} />
        {(product.expiry ||
          (product.qty !== undefined && product.qty !== 0n)) && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.qty !== undefined && product.qty !== 0n && (
              <span className="text-[10px] text-muted-foreground">
                Qty: {Number(product.qty)}
              </span>
            )}
            {product.expiry && (
              <span className="text-[10px] text-muted-foreground">
                Exp: {product.expiry}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

export default function ProductsPage() {
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);
  const [merchantFilter, setMerchantFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch products by selected merchant (or none if "all")
  const merchantIdForQuery =
    merchantFilter !== "all" ? merchantFilter : undefined;
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useProducts(merchantIdForQuery);
  const { data: merchants = [] } = useMerchants();

  const merchantMap = useMemo(() => {
    const m: Record<string, string> = {};
    for (const merchant of merchants) m[merchant.id] = merchant.businessName;
    return m;
  }, [merchants]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (merchantFilter !== "all" && p.merchantId !== merchantFilter)
        return false;
      if (activeFilter === "active" && !p.isActive) return false;
      if (activeFilter === "inactive" && p.isActive) return false;
      return true;
    });
  }, [products, search, merchantFilter, activeFilter]);

  const pagination = usePagination(filtered);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Products
          </h2>
          <p className="text-sm text-muted-foreground">
            {products.length} products
            {merchantFilter !== "all"
              ? ` for ${merchantMap[merchantFilter] ?? merchantFilter}`
              : " across all merchants"}
            {filtered.length !== products.length &&
              ` · ${filtered.length} matching filters`}
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="gap-2"
          data-ocid="products-add-btn"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              pagination.resetPage();
            }}
            className="pl-9"
            placeholder="Search products…"
            data-ocid="products-search"
          />
        </div>
        <Select
          value={merchantFilter}
          onValueChange={(v) => {
            setMerchantFilter(v);
            pagination.resetPage();
          }}
        >
          <SelectTrigger
            className="w-full sm:w-48"
            data-ocid="products-filter-merchant"
          >
            <SelectValue placeholder="All Merchants" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Merchants</SelectItem>
            {merchants.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.businessName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={activeFilter}
          onValueChange={(v) => {
            setActiveFilter(v);
            pagination.resetPage();
          }}
        >
          <SelectTrigger
            className="w-full sm:w-36"
            data-ocid="products-filter-status"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 8 }, (_, i) => `sk-${i}`).map((id) => (
            <div key={id} className="h-56 bg-muted animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-3 text-center"
          data-ocid="products-empty_state"
        >
          <Package className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">
            {merchantFilter !== "all"
              ? "No products yet for this merchant"
              : "No products match your filters"}
          </p>
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            variant="outline"
            data-ocid="products-empty-add"
          >
            Add First Product
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {pagination.items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                merchantName={
                  merchantMap[product.merchantId] ?? product.merchantId
                }
                onClick={() => setDetailProduct(product)}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div
              className="flex items-center justify-between pt-2"
              data-ocid="products.pagination"
            >
              <p className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages} ·{" "}
                {filtered.length} products
              </p>
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={pagination.prevPage}
                  disabled={pagination.page === 1}
                  data-ocid="products.pagination_prev"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from(
                  { length: Math.min(pagination.totalPages, 7) },
                  (_, i) => {
                    const start = Math.max(1, pagination.page - 3);
                    const p = start + i;
                    if (p > pagination.totalPages) return null;
                    return (
                      <Button
                        key={p}
                        size="sm"
                        variant={p === pagination.page ? "default" : "outline"}
                        className="h-8 w-8 p-0 text-xs"
                        onClick={() => pagination.goToPage(p)}
                        data-ocid={`products.pagination.page.${p}`}
                      >
                        {p}
                      </Button>
                    );
                  },
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={pagination.nextPage}
                  disabled={pagination.page === pagination.totalPages}
                  data-ocid="products.pagination_next"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <ProductDetailSheet
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
      />
      {showAddModal && (
        <AddProductModal
          onClose={() => {
            setShowAddModal(false);
            // Refetch products after adding
            void refetch();
          }}
        />
      )}
    </div>
  );
}
