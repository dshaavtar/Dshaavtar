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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddPurchaseRecord,
  useGetPurchaseRecords,
} from "@/hooks/useBackend";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MFR_ID = "manufacturer-1";
type ProductRow = {
  id: string;
  productName: string;
  qty: number;
  unitPrice: number;
};
const SKEL_PURCH = ["p1", "p2", "p3", "p4"];
const _SKEL_PROD = ["pr1", "pr2"];
const PAYMENT_STATUSES = ["pending", "paid", "partial"];

function PurchaseForm({ onSuccess }: { onSuccess: () => void }) {
  const addPurchase = useAddPurchaseRecord();
  const [form, setForm] = useState({
    supplierName: "",
    invoiceNo: "",
    paymentStatus: "pending",
  });
  const [products, setProducts] = useState<ProductRow[]>([
    { id: crypto.randomUUID(), productName: "", qty: 1, unitPrice: 0 },
  ]);

  const addRow = () =>
    setProducts((p) => [
      ...p,
      { id: crypto.randomUUID(), productName: "", qty: 1, unitPrice: 0 },
    ]);
  const removeRow = (id: string) =>
    setProducts((p) => p.filter((r) => r.id !== id));
  const updateRow = (
    id: string,
    field: keyof ProductRow,
    value: string | number,
  ) =>
    setProducts((p) =>
      p.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );

  const totalAmount = products.reduce((sum, r) => sum + r.qty * r.unitPrice, 0);

  const handleSubmit = async () => {
    if (!form.supplierName) {
      toast.error("Supplier name required");
      return;
    }
    if (products.some((r) => !r.productName)) {
      toast.error("All product names required");
      return;
    }
    try {
      await addPurchase.mutateAsync({
        manufacturerId: MFR_ID,
        ...form,
        products,
        totalAmount,
      });
      toast.success("Purchase record added");
      setForm({ supplierName: "", invoiceNo: "", paymentStatus: "pending" });
      setProducts([
        { id: crypto.randomUUID(), productName: "", qty: 1, unitPrice: 0 },
      ]);
      onSuccess();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">New Purchase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Supplier Name</Label>
            <Input
              value={form.supplierName}
              onChange={(e) =>
                setForm((f) => ({ ...f, supplierName: e.target.value }))
              }
              placeholder="Supplier / vendor name"
              data-ocid="mfr-purchases.supplier_input"
            />
          </div>
          <div>
            <Label>Invoice No</Label>
            <Input
              value={form.invoiceNo}
              onChange={(e) =>
                setForm((f) => ({ ...f, invoiceNo: e.target.value }))
              }
              placeholder="PUR-2025-001"
              data-ocid="mfr-purchases.invoice_input"
            />
          </div>
          <div>
            <Label>Payment Status</Label>
            <Select
              value={form.paymentStatus}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, paymentStatus: v }))
              }
            >
              <SelectTrigger data-ocid="mfr-purchases.payment_status_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Products Purchased</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRow}
              data-ocid="mfr-purchases.add_row_button"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Row
            </Button>
          </div>
          {products.map((row, idx) => (
            <div key={row.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-5">
                {idx === 0 && <Label className="text-xs">Product Name</Label>}
                <Input
                  value={row.productName}
                  onChange={(e) =>
                    updateRow(row.id, "productName", e.target.value)
                  }
                  placeholder="Raw material / component"
                />
              </div>
              <div className="col-span-2">
                {idx === 0 && <Label className="text-xs">Qty</Label>}
                <Input
                  type="number"
                  min={1}
                  value={row.qty}
                  onChange={(e) =>
                    updateRow(row.id, "qty", Number(e.target.value))
                  }
                />
              </div>
              <div className="col-span-3">
                {idx === 0 && <Label className="text-xs">Unit Price (₹)</Label>}
                <Input
                  type="number"
                  min={0}
                  value={row.unitPrice}
                  onChange={(e) =>
                    updateRow(row.id, "unitPrice", Number(e.target.value))
                  }
                />
              </div>
              <div className="col-span-2 text-right">
                {idx === 0 && <Label className="text-xs">Subtotal</Label>}
                <p className="py-2 text-sm font-mono">
                  ₹{(row.qty * row.unitPrice).toFixed(2)}
                </p>
              </div>
              {products.length > 1 && (
                <button
                  type="button"
                  className="col-span-12 flex justify-end"
                  onClick={() => removeRow(row.id)}
                >
                  <Minus className="h-4 w-4 text-destructive" />
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <p className="text-base font-semibold">
              Total: ₹{totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={addPurchase.isPending}
            data-ocid="mfr-purchases.submit_button"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {addPurchase.isPending ? "Saving..." : "Record Purchase"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const paymentColor: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  partial: "bg-orange-100 text-orange-700",
};

export default function ManufacturerPurchasesPage() {
  const { data: purchases = [], isLoading } = useGetPurchaseRecords(MFR_ID);
  const [showForm, setShowForm] = useState(false);

  const totalSpend = purchases.reduce((s, r) => s + r.totalAmount, 0);
  const pendingCount = purchases.filter(
    (r) => r.paymentStatus === "pending",
  ).length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Purchase Records
            </h1>
            <p className="text-sm text-muted-foreground">
              Raw material and supplier purchases with restock tracking
            </p>
          </div>
        </div>
        <Button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          data-ocid="mfr-purchases.toggle_form_button"
        >
          {showForm ? "Hide Form" : "+ New Purchase"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Purchases</p>
            <p className="text-2xl font-bold">{purchases.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Spend</p>
            <p className="text-2xl font-bold">₹{totalSpend.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pending Payment</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      {showForm && <PurchaseForm onSuccess={() => setShowForm(false)} />}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {SKEL_PURCH.map((k) => (
                <Skeleton key={k} className="h-12 w-full" />
              ))}
            </div>
          ) : purchases.length === 0 ? (
            <div
              className="flex flex-col items-center gap-2 py-12 text-center"
              data-ocid="mfr-purchases.empty_state"
            >
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                No purchases recorded yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Invoice
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Supplier
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Products
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Payment
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {purchases.map((p, i) => (
                    <tr
                      key={p.id}
                      className="hover:bg-muted/20"
                      data-ocid={`mfr-purchases.item.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs">
                        {p.invoiceNo || "—"}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {p.supplierName}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {p.products.slice(0, 2).map((pr) => (
                            <Badge
                              key={pr.productName}
                              variant="outline"
                              className="text-xs"
                            >
                              {pr.productName}
                            </Badge>
                          ))}
                          {p.products.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{p.products.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        ₹{p.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${paymentColor[p.paymentStatus] ?? ""}`}
                        >
                          {p.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(
                          Number(p.createdAt) / 1_000_000,
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
