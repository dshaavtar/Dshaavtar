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
import { useAddSaleRecord, useGetSaleRecords } from "@/hooks/useBackend";
import { IndianRupee, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MFR_ID = "manufacturer-1";

type ProductRow = {
  id: string;
  productName: string;
  qty: number;
  unitPrice: number;
};

const PAYMENT_STATUSES = ["pending", "paid", "partial"];
const BUYER_TYPES = ["distributor", "customer", "merchant"];
const SKEL_SALES = ["s1", "s2", "s3", "s4"];

function SaleForm({ onSuccess }: { onSuccess: () => void }) {
  const addSale = useAddSaleRecord();
  const [form, setForm] = useState({
    buyerPhone: "",
    buyerType: "distributor",
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
    if (!form.buyerPhone) {
      toast.error("Buyer phone required");
      return;
    }
    if (products.some((r) => !r.productName)) {
      toast.error("All product names required");
      return;
    }
    try {
      await addSale.mutateAsync({
        manufacturerId: MFR_ID,
        ...form,
        products,
        totalAmount,
      });
      toast.success("Sale record added");
      setForm({
        buyerPhone: "",
        buyerType: "distributor",
        invoiceNo: "",
        paymentStatus: "pending",
      });
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
        <CardTitle className="text-base">New Sale</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Buyer Phone</Label>
            <Input
              value={form.buyerPhone}
              onChange={(e) =>
                setForm((f) => ({ ...f, buyerPhone: e.target.value }))
              }
              placeholder="+91 XXXXX XXXXX"
              data-ocid="mfr-sales.buyer_phone_input"
            />
          </div>
          <div>
            <Label>Buyer Type</Label>
            <Select
              value={form.buyerType}
              onValueChange={(v) => setForm((f) => ({ ...f, buyerType: v }))}
            >
              <SelectTrigger data-ocid="mfr-sales.buyer_type_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BUYER_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Invoice No</Label>
            <Input
              value={form.invoiceNo}
              onChange={(e) =>
                setForm((f) => ({ ...f, invoiceNo: e.target.value }))
              }
              placeholder="INV-2025-001"
              data-ocid="mfr-sales.invoice_input"
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
              <SelectTrigger data-ocid="mfr-sales.payment_status_select">
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
            <Label>Products</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRow}
              data-ocid="mfr-sales.add_row_button"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Row
            </Button>
          </div>
          {products.map((row, idx) => (
            <div
              key={row.id}
              className="grid grid-cols-12 gap-2 items-end"
              data-ocid={`mfr-sales.product_row.${idx + 1}`}
            >
              <div className="col-span-5">
                {idx === 0 && <Label className="text-xs">Product Name</Label>}
                <Input
                  value={row.productName}
                  onChange={(e) =>
                    updateRow(row.id, "productName", e.target.value)
                  }
                  placeholder="Product"
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
                  data-ocid={`mfr-sales.remove_row.${idx + 1}`}
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
            disabled={addSale.isPending}
            data-ocid="mfr-sales.submit_button"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {addSale.isPending ? "Saving..." : "Record Sale"}
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

export default function ManufacturerSalesPage() {
  const { data: sales = [], isLoading } = useGetSaleRecords(MFR_ID);
  const [showForm, setShowForm] = useState(false);

  const totalRevenue = sales.reduce((s, r) => s + r.totalAmount, 0);
  const paidCount = sales.filter((r) => r.paymentStatus === "paid").length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Sales Records
            </h1>
            <p className="text-sm text-muted-foreground">
              Direct-to-distributor, merchant, and customer sales
            </p>
          </div>
        </div>
        <Button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          data-ocid="mfr-sales.toggle_form_button"
        >
          {showForm ? "Hide Form" : "+ New Sale"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Sales</p>
            <p className="text-2xl font-bold">{sales.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">
              ₹{totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold">{paidCount}</p>
          </CardContent>
        </Card>
      </div>

      {showForm && <SaleForm onSuccess={() => setShowForm(false)} />}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Sales</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {SKEL_SALES.map((k) => (
                <Skeleton key={k} className="h-12 w-full" />
              ))}
            </div>
          ) : sales.length === 0 ? (
            <div
              className="flex flex-col items-center gap-2 py-12 text-center"
              data-ocid="mfr-sales.empty_state"
            >
              <IndianRupee className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">No sales recorded yet.</p>
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
                      Buyer
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Type
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
                  {sales.map((s, i) => (
                    <tr
                      key={s.id}
                      className="hover:bg-muted/20"
                      data-ocid={`mfr-sales.item.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs">
                        {s.invoiceNo || "—"}
                      </td>
                      <td className="px-4 py-3">{s.buyerPhone}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{s.buyerType}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        ₹{s.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${paymentColor[s.paymentStatus] ?? ""}`}
                        >
                          {s.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(
                          Number(s.createdAt) / 1_000_000,
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
