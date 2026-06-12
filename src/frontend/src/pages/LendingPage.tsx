import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  AlertTriangle,
  Bell,
  CheckCircle,
  Edit2,
  HandCoins,
  Plus,
  RefreshCw,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { LendingItem } from "../backend.d";
import {
  useCheckOverdueLendingReminders,
  useCreateLendingItem,
  useGetAllLendingItems,
  useGetLendingItemsDueSoon,
  useTriggerLendingReminder,
  useUpdateLendingItem,
  useUpdateLendingStatus,
} from "../hooks/useBackend";

const CATEGORIES = [
  "electronics",
  "furniture",
  "tools",
  "books",
  "sports",
  "clothing",
  "other",
];

const FREQUENCIES = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
  { value: "specific_date", label: "Specific Date" },
];

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  active: {
    label: "Active",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  returned: {
    label: "Returned",
    cls: "bg-blue-100 text-blue-700 border-blue-200",
  },
  overdue: { label: "Overdue", cls: "bg-red-100 text-red-700 border-red-200" },
  disputed: {
    label: "Disputed",
    cls: "bg-orange-100 text-orange-700 border-orange-200",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status?.toLowerCase()] ?? {
    label: status,
    cls: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${cfg.cls}`}
    >
      {cfg.label}
    </span>
  );
}

const EMPTY_FORM: Partial<LendingItem> = {
  lenderPhone: "",
  borrowerPhone: "",
  itemCategory: "other",
  itemName: "",
  itemDescription: "",
  returnDate: BigInt(0),
  charge: 0,
  chargeDescription: "",
  reminderFrequency: "monthly",
  status: "active",
};

function LendingFormModal({
  initial,
  onClose,
  onSave,
  saving,
}: {
  initial?: LendingItem;
  onClose: () => void;
  onSave: (data: Partial<LendingItem>) => Promise<void>;
  saving: boolean;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<Partial<LendingItem>>(
    initial
      ? {
          lenderPhone: initial.lenderPhone,
          borrowerPhone: initial.borrowerPhone,
          itemCategory: initial.itemCategory,
          itemName: initial.itemName,
          itemDescription: initial.itemDescription,
          returnDate: initial.returnDate,
          charge: initial.charge,
          chargeDescription: initial.chargeDescription,
          reminderFrequency: initial.reminderFrequency,
          status: initial.status,
        }
      : { ...EMPTY_FORM },
  );

  const returnDateStr = form.returnDate
    ? new Date(Number(form.returnDate) / 1_000_000).toISOString().slice(0, 10)
    : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h3 className="font-semibold text-sm text-foreground">
            {isEdit ? "Edit Lending Item" : "Add Lending Item"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Lender Phone *</Label>
              <Input
                required
                placeholder="+91XXXXXXXXXX"
                value={form.lenderPhone ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lenderPhone: e.target.value }))
                }
                className="h-8 text-xs"
                data-ocid="lending.lender_phone.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Borrower Phone *</Label>
              <Input
                required
                placeholder="+91XXXXXXXXXX"
                value={form.borrowerPhone ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, borrowerPhone: e.target.value }))
                }
                className="h-8 text-xs"
                data-ocid="lending.borrower_phone.input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Category *</Label>
              <Select
                value={form.itemCategory ?? "other"}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, itemCategory: v }))
                }
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="lending.category.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Item Name *</Label>
              <Input
                required
                placeholder="e.g. Canon Camera"
                value={form.itemName ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, itemName: e.target.value }))
                }
                className="h-8 text-xs"
                data-ocid="lending.item_name.input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Item Description</Label>
            <textarea
              placeholder="Brief description of the item"
              value={form.itemDescription ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, itemDescription: e.target.value }))
              }
              className="w-full text-xs rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-16"
              data-ocid="lending.item_description.textarea"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Return Date *</Label>
              <Input
                required
                type="date"
                value={returnDateStr}
                onChange={(e) => {
                  const ms = new Date(e.target.value).getTime();
                  setForm((f) => ({
                    ...f,
                    returnDate: BigInt(ms * 1_000_000),
                  }));
                }}
                className="h-8 text-xs"
                data-ocid="lending.return_date.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Reminder Frequency *</Label>
              <Select
                value={form.reminderFrequency ?? "monthly"}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, reminderFrequency: v }))
                }
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="lending.reminder_frequency.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCIES.map((f) => (
                    <SelectItem
                      key={f.value}
                      value={f.value}
                      className="text-xs"
                    >
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Charge (₹, optional)</Label>
              <Input
                type="number"
                min={0}
                placeholder="0"
                value={form.charge ?? 0}
                onChange={(e) =>
                  setForm((f) => ({ ...f, charge: Number(e.target.value) }))
                }
                className="h-8 text-xs"
                data-ocid="lending.charge.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Charge Description</Label>
              <Input
                placeholder="e.g. ₹500/month"
                value={form.chargeDescription ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, chargeDescription: e.target.value }))
                }
                className="h-8 text-xs"
                data-ocid="lending.charge_description.input"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              data-ocid="lending.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={saving}
              data-ocid="lending.submit_button"
            >
              {saving ? "Saving…" : isEdit ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LendingTable({
  items,
  onEdit,
  onRemind,
  onStatusChange,
}: {
  items: LendingItem[];
  onEdit: (item: LendingItem) => void;
  onRemind: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 gap-2"
        data-ocid="lending.empty_state"
      >
        <HandCoins className="w-10 h-10 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">
          No lending items in this view
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-muted/60 border-b border-border">
          <tr>
            {[
              "Item",
              "Category",
              "Lender",
              "Borrower",
              "Return Date",
              "Charge",
              "Reminder",
              "Status",
              "Last Reminded",
              "Actions",
            ].map((col) => (
              <th
                key={col}
                className="text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr
              key={item.id}
              className="border-b border-border/40 hover:bg-muted/20 transition-colors"
              data-ocid={`lending.item.${idx + 1}`}
            >
              <td className="py-2 px-3 font-medium max-w-[120px] truncate">
                {item.itemName}
              </td>
              <td className="py-2 px-3">
                <span className="capitalize">{item.itemCategory}</span>
              </td>
              <td className="py-2 px-3 font-mono">{item.lenderPhone}</td>
              <td className="py-2 px-3 font-mono">{item.borrowerPhone}</td>
              <td className="py-2 px-3 whitespace-nowrap">
                {item.returnDate
                  ? new Date(
                      Number(item.returnDate) / 1_000_000,
                    ).toLocaleDateString("en-IN")
                  : "—"}
              </td>
              <td className="py-2 px-3">
                {item.charge > 0 ? `₹${item.charge}` : "—"}
              </td>
              <td className="py-2 px-3 capitalize">{item.reminderFrequency}</td>
              <td className="py-2 px-3">
                <StatusBadge status={item.status} />
              </td>
              <td className="py-2 px-3 whitespace-nowrap">
                {item.lastReminderSent
                  ? new Date(
                      Number(item.lastReminderSent) / 1_000_000,
                    ).toLocaleDateString("en-IN")
                  : "—"}
              </td>
              <td className="py-2 px-3">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => onEdit(item)}
                    aria-label="Edit"
                    data-ocid={`lending.edit_button.${idx + 1}`}
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-amber-600 hover:text-amber-700"
                    onClick={() => onRemind(item.id)}
                    aria-label="Send reminder"
                    data-ocid={`lending.remind_button.${idx + 1}`}
                  >
                    <Bell className="w-3 h-3" />
                  </Button>
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(item.id, e.target.value)}
                    className="text-[10px] bg-muted border border-border rounded px-1.5 py-0.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    aria-label="Update status"
                    data-ocid={`lending.status_select.${idx + 1}`}
                  >
                    {Object.keys(STATUS_CONFIG).map((s) => (
                      <option key={s} value={s}>
                        {STATUS_CONFIG[s].label}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LendingPage() {
  const [modalItem, setModalItem] = useState<LendingItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    data: allItems = [],
    isLoading,
    error,
    refetch,
  } = useGetAllLendingItems();
  const { data: dueSoonItems = [] } = useGetLendingItemsDueSoon();
  const createItem = useCreateLendingItem();
  const updateItem = useUpdateLendingItem();
  const updateStatus = useUpdateLendingStatus();
  const triggerReminder = useTriggerLendingReminder();
  const checkOverdue = useCheckOverdueLendingReminders();

  const activeItems = useMemo(
    () => allItems.filter((i) => i.status === "active"),
    [allItems],
  );
  const overdueItems = useMemo(
    () => allItems.filter((i) => i.status === "overdue"),
    [allItems],
  );
  const returnedItems = useMemo(
    () => allItems.filter((i) => i.status === "returned"),
    [allItems],
  );

  async function handleSave(data: Partial<LendingItem>) {
    setSaving(true);
    try {
      if (modalItem?.id) {
        const merged: LendingItem = { ...modalItem, ...data } as LendingItem;
        await updateItem.mutateAsync({ id: modalItem.id, item: merged });
        toast.success("Lending item updated");
      } else {
        const now = BigInt(Date.now() * 1_000_000);
        const item: LendingItem = {
          id: "",
          lenderPhone: data.lenderPhone ?? "",
          borrowerPhone: data.borrowerPhone ?? "",
          itemCategory: data.itemCategory ?? "other",
          itemName: data.itemName ?? "",
          itemDescription: data.itemDescription ?? "",
          returnDate: data.returnDate ?? now,
          charge: data.charge ?? 0,
          chargeDescription: data.chargeDescription ?? "",
          reminderFrequency: data.reminderFrequency ?? "monthly",
          status: "active",
          borrowDate: now,
          createdAt: now,
          updatedAt: now,
        };
        await createItem.mutateAsync(item);
        toast.success("Lending item added");
      }
      setModalOpen(false);
      setModalItem(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemind(id: string) {
    try {
      await triggerReminder.mutateAsync(id);
      toast.success("Reminder sent to both parties");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send reminder");
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update status");
    }
  }

  async function handleCheckOverdue() {
    try {
      const count = await checkOverdue.mutateAsync();
      toast.success(`${count} overdue reminder${count !== 1 ? "s" : ""} sent`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to check overdue");
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <HandCoins className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Lending
            </h2>
            <p className="text-sm text-muted-foreground">
              {allItems.length} item{allItems.length !== 1 ? "s" : ""} ·
              reminders sent to both parties
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleCheckOverdue}
            disabled={checkOverdue.isPending}
            data-ocid="lending.check_overdue_button"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            Check Overdue
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => refetch()}
            disabled={isLoading}
            data-ocid="lending.refresh_button"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => {
              setModalItem(null);
              setModalOpen(true);
            }}
            data-ocid="lending.add_button"
          >
            <Plus className="w-4 h-4" /> Add Lending Item
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Items",
            value: allItems.length,
            cls: "bg-primary/10 text-primary",
          },
          {
            label: "Active",
            value: activeItems.length,
            cls: "bg-emerald-100 text-emerald-700",
          },
          {
            label: "Overdue",
            value: overdueItems.length,
            cls: "bg-red-100 text-red-700",
          },
          {
            label: "Due Soon (7d)",
            value: dueSoonItems.length,
            cls: "bg-amber-100 text-amber-700",
          },
        ].map(({ label, value, cls }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4 shadow-card flex items-center gap-3"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${cls}`}
            >
              <HandCoins className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground tabular-nums">
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Error state */}
      {error && (
        <div
          className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-center justify-between"
          data-ocid="lending.error_state"
        >
          <span>Failed to load lending items.</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <Skeleton key={i} className="h-10 w-full rounded" />
            ))}
          </div>
        ) : (
          <Tabs defaultValue="all">
            <div className="px-4 pt-3">
              <TabsList className="h-8">
                <TabsTrigger
                  value="all"
                  className="text-xs"
                  data-ocid="lending.all_tab"
                >
                  All ({allItems.length})
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="text-xs"
                  data-ocid="lending.active_tab"
                >
                  Active ({activeItems.length})
                </TabsTrigger>
                <TabsTrigger
                  value="overdue"
                  className="text-xs"
                  data-ocid="lending.overdue_tab"
                >
                  Overdue ({overdueItems.length})
                </TabsTrigger>
                <TabsTrigger
                  value="due-soon"
                  className="text-xs"
                  data-ocid="lending.due_soon_tab"
                >
                  Due Soon ({dueSoonItems.length})
                </TabsTrigger>
                <TabsTrigger
                  value="returned"
                  className="text-xs"
                  data-ocid="lending.returned_tab"
                >
                  Returned ({returnedItems.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              <LendingTable
                items={allItems}
                onEdit={(i) => {
                  setModalItem(i);
                  setModalOpen(true);
                }}
                onRemind={handleRemind}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>
            <TabsContent value="active" className="mt-0">
              <LendingTable
                items={activeItems}
                onEdit={(i) => {
                  setModalItem(i);
                  setModalOpen(true);
                }}
                onRemind={handleRemind}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>
            <TabsContent value="overdue" className="mt-0">
              <LendingTable
                items={overdueItems}
                onEdit={(i) => {
                  setModalItem(i);
                  setModalOpen(true);
                }}
                onRemind={handleRemind}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>
            <TabsContent value="due-soon" className="mt-0">
              <LendingTable
                items={dueSoonItems}
                onEdit={(i) => {
                  setModalItem(i);
                  setModalOpen(true);
                }}
                onRemind={handleRemind}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>
            <TabsContent value="returned" className="mt-0">
              <LendingTable
                items={returnedItems}
                onEdit={(i) => {
                  setModalItem(i);
                  setModalOpen(true);
                }}
                onRemind={handleRemind}
                onStatusChange={handleStatusChange}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <LendingFormModal
          initial={modalItem ?? undefined}
          onClose={() => {
            setModalOpen(false);
            setModalItem(null);
          }}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
