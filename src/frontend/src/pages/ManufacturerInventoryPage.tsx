import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type InventoryItem,
  useAddInventoryItem,
  useGetInventoryItems,
  useGetInventoryTransactions,
  useUpdateInventoryStock,
} from "@/hooks/useBackend";
import {
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MFR_ID = "manufacturer-1";

const TXN_TYPES = [
  "sale",
  "purchase",
  "restock",
  "expiry_write_off",
  "return_item",
  "adjustment",
] as const;

type TxnType = (typeof TXN_TYPES)[number];

function StockBadge({ item }: { item: InventoryItem }) {
  if (item.currentStock <= item.reorderLevel) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
        <AlertTriangle className="h-3 w-3" /> {item.currentStock} {item.unit}
      </span>
    );
  }
  if (item.currentStock <= item.reorderLevel * 2) {
    return (
      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">
        {item.currentStock} {item.unit}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
      {item.currentStock} {item.unit}
    </span>
  );
}

function InventoryItemsTab() {
  const { data: items = [], isLoading } = useGetInventoryItems(MFR_ID);
  const addItem = useAddInventoryItem();
  const updateStock = useUpdateInventoryStock();
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [addForm, setAddForm] = useState({
    productName: "",
    batchCode: "",
    currentStock: 0,
    reorderLevel: 10,
    unit: "pcs",
    expiryDate: "",
  });
  const [updateForm, setUpdateForm] = useState<{
    txnType: TxnType;
    quantity: number;
    notes: string;
  }>({
    txnType: "restock",
    quantity: 0,
    notes: "",
  });

  const handleAdd = async () => {
    if (!addForm.productName) {
      toast.error("Product name required");
      return;
    }
    try {
      await addItem.mutateAsync({
        manufacturerId: MFR_ID,
        ...addForm,
        expiryDate: addForm.expiryDate || undefined,
      });
      toast.success("Item added to inventory");
      setShowAdd(false);
      setAddForm({
        productName: "",
        batchCode: "",
        currentStock: 0,
        reorderLevel: 10,
        unit: "pcs",
        expiryDate: "",
      });
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;
    if (updateForm.quantity <= 0) {
      toast.error("Quantity must be > 0");
      return;
    }
    try {
      await updateStock.mutateAsync({
        itemId: selectedItem.id,
        manufacturerId: MFR_ID,
        txnType: updateForm.txnType,
        quantity: updateForm.quantity,
        notes: updateForm.notes,
      });
      toast.success("Stock updated");
      setShowUpdate(false);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const lowStock = items.filter((i) => i.currentStock <= i.reorderLevel);

  return (
    <div className="space-y-4">
      {lowStock.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-2 p-4">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-red-700">
              {lowStock.length} item{lowStock.length > 1 ? "s" : ""} at or below
              reorder level
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Inventory Items</h3>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowAdd(true)}
          data-ocid="mfr-inventory.add_button"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Item
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {["s1", "s2", "s3", "s4"].map((k) => (
            <Skeleton key={k} className="h-12 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent
            className="flex flex-col items-center gap-2 py-12 text-center"
            data-ocid="mfr-inventory.empty_state"
          >
            <Package className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">No inventory items yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Product
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Batch Code
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Current Stock
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Reorder Level
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Expiry
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item, i) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/20"
                  data-ocid={`mfr-inventory.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {item.productName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.batchCode || "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <StockBadge item={item} />
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {item.reorderLevel} {item.unit}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.expiryDate ?? "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowUpdate(true);
                      }}
                      data-ocid={`mfr-inventory.update_button.${i + 1}`}
                    >
                      <RefreshCw className="mr-1 h-3 w-3" /> Update Stock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Item Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent data-ocid="mfr-inventory.add_dialog">
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Product Name</Label>
              <Input
                value={addForm.productName}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, productName: e.target.value }))
                }
                placeholder="e.g. Raw Sugar"
                data-ocid="mfr-inventory.product_name_input"
              />
            </div>
            <div>
              <Label>Batch Code</Label>
              <Input
                value={addForm.batchCode}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, batchCode: e.target.value }))
                }
                placeholder="Optional"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Current Stock</Label>
                <Input
                  type="number"
                  min={0}
                  value={addForm.currentStock}
                  onChange={(e) =>
                    setAddForm((f) => ({
                      ...f,
                      currentStock: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <Label>Reorder Level</Label>
                <Input
                  type="number"
                  min={0}
                  value={addForm.reorderLevel}
                  onChange={(e) =>
                    setAddForm((f) => ({
                      ...f,
                      reorderLevel: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label>Unit</Label>
              <Input
                value={addForm.unit}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, unit: e.target.value }))
                }
                placeholder="pcs / kg / ltr"
              />
            </div>
            <div>
              <Label>Expiry Date (optional)</Label>
              <Input
                type="date"
                value={addForm.expiryDate}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, expiryDate: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdd(false)}
                data-ocid="mfr-inventory.add_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAdd}
                disabled={addItem.isPending}
                data-ocid="mfr-inventory.add_submit_button"
              >
                {addItem.isPending ? "Adding..." : "Add Item"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Stock Dialog */}
      <Dialog open={showUpdate} onOpenChange={setShowUpdate}>
        <DialogContent data-ocid="mfr-inventory.update_dialog">
          <DialogHeader>
            <DialogTitle>
              Update Stock — {selectedItem?.productName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Transaction Type</Label>
              <Select
                value={updateForm.txnType}
                onValueChange={(v) =>
                  setUpdateForm((f) => ({ ...f, txnType: v as TxnType }))
                }
              >
                <SelectTrigger data-ocid="mfr-inventory.txn_type_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TXN_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                min={1}
                value={updateForm.quantity}
                onChange={(e) =>
                  setUpdateForm((f) => ({
                    ...f,
                    quantity: Number(e.target.value),
                  }))
                }
                data-ocid="mfr-inventory.qty_input"
              />
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Input
                value={updateForm.notes}
                onChange={(e) =>
                  setUpdateForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUpdate(false)}
                data-ocid="mfr-inventory.update_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleUpdate}
                disabled={updateStock.isPending}
                data-ocid="mfr-inventory.update_submit_button"
              >
                {updateStock.isPending ? "Saving..." : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TransactionsTab() {
  const { data: items = [] } = useGetInventoryItems(MFR_ID);
  const [selectedItemId, setSelectedItemId] = useState("");
  const { data: txns = [], isLoading } =
    useGetInventoryTransactions(selectedItemId);

  return (
    <div className="space-y-4">
      <div>
        <Label>Filter by Item</Label>
        <Select value={selectedItemId} onValueChange={setSelectedItemId}>
          <SelectTrigger
            className="w-64"
            data-ocid="mfr-inventory.filter_select"
          >
            <SelectValue placeholder="Select item" />
          </SelectTrigger>
          <SelectContent>
            {items.map((i) => (
              <SelectItem key={i.id} value={i.id}>
                {i.productName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!selectedItemId ? (
        <p className="text-sm text-muted-foreground">
          Select an item to view its transactions.
        </p>
      ) : isLoading ? (
        <Skeleton className="h-32 w-full" />
      ) : txns.length === 0 ? (
        <Card>
          <CardContent
            className="py-10 text-center"
            data-ocid="mfr-inventory-txns.empty_state"
          >
            <p className="text-muted-foreground">
              No transactions recorded for this item.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Reference
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Notes
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {txns.map((t, i) => (
                <tr
                  key={t.id}
                  className="hover:bg-muted/20"
                  data-ocid={`mfr-inventory-txns.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      {["sale", "expiry_write_off"].includes(t.txnType) ? (
                        <ArrowDownCircle className="h-3 w-3 text-red-500" />
                      ) : (
                        <ArrowUpCircle className="h-3 w-3 text-green-500" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {t.txnType.replace(/_/g, " ")}
                      </Badge>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {t.quantity}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {t.referenceId ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {t.notes ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(
                      Number(t.createdAt) / 1_000_000,
                    ).toLocaleDateString()}
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

export default function ManufacturerInventoryPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Inventory Register
          </h1>
          <p className="text-sm text-muted-foreground">
            Track stock levels, batches, and movement
          </p>
        </div>
      </div>

      <Tabs defaultValue="items" className="space-y-4">
        <TabsList data-ocid="mfr-inventory.tab">
          <TabsTrigger value="items">
            <Package className="mr-1 h-4 w-4" />
            Inventory Items
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <RefreshCw className="mr-1 h-4 w-4" />
            Transactions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="items">
          <Card>
            <CardContent className="pt-6">
              <InventoryItemsTab />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardContent className="pt-6">
              <TransactionsTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
