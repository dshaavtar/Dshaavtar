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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type AccountEntry,
  type BillRecord,
  useAddAccountEntry,
  useAddBillRecord,
  useGetAccountEntries,
  useGetBillRecords,
  useGetPendingBills,
  useMarkBillPaid,
  useUpdateBillRecord,
} from "@/hooks/useBackend";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  BookOpen,
  CheckCircle,
  DollarSign,
  FileText,
  Plus,
  Receipt,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MFR_ID = "manufacturer-1";

const ENTRY_TYPES = ["income", "expense", "receivable", "payable"];
const INCOME_CATEGORIES = [
  "Product Sales",
  "Commission",
  "Royalty",
  "Interest",
  "Other",
];
const EXPENSE_CATEGORIES = [
  "Raw Material",
  "Labour",
  "Utilities",
  "Transport",
  "Rent",
  "Marketing",
  "Other",
];
const BILL_TYPES = [
  "supplier",
  "utility",
  "rent",
  "salary",
  "loan",
  "tax",
  "other",
];

type EntryType = "income" | "expense" | "receivable" | "payable";

function SummaryCards({ entries }: { entries: AccountEntry[] }) {
  const totals = entries.reduce<Record<EntryType, number>>(
    (acc, e) => {
      acc[e.entryType as EntryType] =
        (acc[e.entryType as EntryType] ?? 0) + e.amount;
      return acc;
    },
    { income: 0, expense: 0, receivable: 0, payable: 0 },
  );

  const cards: Array<{
    label: string;
    type: EntryType;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      label: "Total Income",
      type: "income",
      icon: <ArrowUpCircle className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      label: "Total Expense",
      type: "expense",
      icon: <ArrowDownCircle className="h-5 w-5" />,
      color: "text-red-500",
    },
    {
      label: "Receivable",
      type: "receivable",
      icon: <ArrowUpCircle className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      label: "Payable",
      type: "payable",
      icon: <ArrowDownCircle className="h-5 w-5" />,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.type}>
          <CardContent className="p-4">
            <div className={`flex items-center gap-2 ${c.color} mb-1`}>
              {c.icon}
              <span className="text-xs font-medium">{c.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              ₹{(totals[c.type] ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AccountEntriesTab() {
  const { data: entries = [], isLoading } = useGetAccountEntries(MFR_ID);
  const addEntry = useAddAccountEntry();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    entryType: "income",
    category: "",
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
    referenceId: "",
  });

  const categories =
    form.entryType === "income" || form.entryType === "receivable"
      ? INCOME_CATEGORIES
      : EXPENSE_CATEGORIES;

  const handleAdd = async () => {
    if (!form.category || !form.description) {
      toast.error("Category and description required");
      return;
    }
    if (form.amount <= 0) {
      toast.error("Amount must be > 0");
      return;
    }
    try {
      await addEntry.mutateAsync({
        manufacturerId: MFR_ID,
        ...form,
        referenceId: form.referenceId || undefined,
      });
      toast.success("Entry recorded");
      setShowForm(false);
      setForm({
        entryType: "income",
        category: "",
        amount: 0,
        description: "",
        date: new Date().toISOString().split("T")[0],
        referenceId: "",
      });
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const entryColor: Record<string, string> = {
    income: "text-green-600",
    expense: "text-red-500",
    receivable: "text-blue-600",
    payable: "text-orange-500",
  };

  return (
    <div className="space-y-4">
      <SummaryCards entries={entries} />

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">All Entries</h3>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowForm((v) => !v)}
          data-ocid="mfr-accounts.add_button"
        >
          <Plus className="mr-1 h-4 w-4" />
          {showForm ? "Cancel" : "Add Entry"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 bg-card">
          <CardContent className="space-y-3 pt-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label>Entry Type</Label>
                <Select
                  value={form.entryType}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, entryType: v, category: "" }))
                  }
                >
                  <SelectTrigger data-ocid="mfr-accounts.entry_type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ENTRY_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger data-ocid="mfr-accounts.category_select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: Number(e.target.value) }))
                  }
                  data-ocid="mfr-accounts.amount_input"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="What is this for?"
                  data-ocid="mfr-accounts.description_input"
                />
              </div>
              <div>
                <Label>Reference ID (optional)</Label>
                <Input
                  value={form.referenceId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, referenceId: e.target.value }))
                  }
                  placeholder="Invoice / order no"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="mfr-accounts.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAdd}
                disabled={addEntry.isPending}
                data-ocid="mfr-accounts.submit_button"
              >
                {addEntry.isPending ? "Saving..." : "Add Entry"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {["s1", "s2", "s3", "s4"].map((k) => (
            <Skeleton key={k} className="h-12 w-full" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div
          className="flex flex-col items-center gap-2 py-12 text-center"
          data-ocid="mfr-accounts.empty_state"
        >
          <BookOpen className="h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">No account entries yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Category
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.map((e, i) => (
                <tr
                  key={e.id}
                  className="hover:bg-muted/20"
                  data-ocid={`mfr-accounts.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold uppercase ${entryColor[e.entryType] ?? ""}`}
                    >
                      {e.entryType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {e.category}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-semibold font-mono ${entryColor[e.entryType] ?? ""}`}
                  >
                    {["expense", "payable"].includes(e.entryType) ? "-" : "+"}₹
                    {e.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-foreground">{e.description}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function BillsTab() {
  const { data: bills = [], isLoading } = useGetBillRecords(MFR_ID);
  const addBill = useAddBillRecord();
  const markPaid = useMarkBillPaid();
  const updateBill = useUpdateBillRecord();
  const [billFilter, setBillFilter] = useState<"all" | "pending">("all");
  const { data: pendingBills = [], isLoading: isPendingLoading } =
    useGetPendingBills(MFR_ID);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    billType: "supplier",
    partyName: "",
    amount: 0,
    dueDate: "",
    pendingPayment: false,
    pendingNote: "",
  });

  const displayedBills = billFilter === "pending" ? pendingBills : bills;

  const handleAdd = async () => {
    if (!form.partyName) {
      toast.error("Party name required");
      return;
    }
    if (form.amount <= 0) {
      toast.error("Amount must be > 0");
      return;
    }
    if (!form.dueDate) {
      toast.error("Due date required");
      return;
    }
    try {
      await addBill.mutateAsync({
        manufacturerId: MFR_ID,
        billType: form.billType,
        partyName: form.partyName,
        amount: form.amount,
        dueDate: form.dueDate,
        pendingPayment: form.pendingPayment,
        pendingNote: form.pendingNote,
      });
      toast.success("Bill added");
      setShowForm(false);
      setForm({
        billType: "supplier",
        partyName: "",
        amount: 0,
        dueDate: "",
        pendingPayment: false,
        pendingNote: "",
      });
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleMarkPaid = async (bill: BillRecord) => {
    try {
      await markPaid.mutateAsync({
        billId: bill.id,
        manufacturerId: bill.manufacturerId,
      });
      toast.success("Bill marked as paid");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleMarkCleared = async (bill: BillRecord) => {
    try {
      await updateBill.mutateAsync({
        billId: bill.id,
        manufacturerId: bill.manufacturerId,
        pendingPayment: false,
        pendingNote: bill.pendingNote ?? "",
      });
      toast.success("Bill marked as cleared");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const unpaid = bills.filter((b) => !b.isPaid);
  const totalUnpaid = unpaid.reduce((s, b) => s + b.amount, 0);
  const isTableLoading =
    billFilter === "pending" ? isPendingLoading : isLoading;

  return (
    <div className="space-y-4">
      {unpaid.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <p className="text-sm font-medium text-orange-700">
                {unpaid.length} unpaid bill{unpaid.length > 1 ? "s" : ""}
              </p>
            </div>
            <p className="font-bold text-orange-700">
              ₹{totalUnpaid.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Bills</h3>
          <div className="flex rounded-md border border-border overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setBillFilter("all")}
              className={`px-3 py-1 transition-colors ${
                billFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
              data-ocid="mfr-bills.filter_all"
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setBillFilter("pending")}
              className={`px-3 py-1 transition-colors ${
                billFilter === "pending"
                  ? "bg-amber-500 text-white"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
              data-ocid="mfr-bills.filter_pending"
            >
              Pending Payment
            </button>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowForm((v) => !v)}
          data-ocid="mfr-bills.add_button"
        >
          <Plus className="mr-1 h-4 w-4" />
          {showForm ? "Cancel" : "Add Bill"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20">
          <CardContent className="space-y-3 pt-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label>Bill Type</Label>
                <Select
                  value={form.billType}
                  onValueChange={(v) => setForm((f) => ({ ...f, billType: v }))}
                >
                  <SelectTrigger data-ocid="mfr-bills.type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BILL_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Party Name</Label>
                <Input
                  value={form.partyName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, partyName: e.target.value }))
                  }
                  placeholder="Supplier / vendor"
                  data-ocid="mfr-bills.party_input"
                />
              </div>
              <div>
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: Number(e.target.value) }))
                  }
                  data-ocid="mfr-bills.amount_input"
                />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dueDate: e.target.value }))
                  }
                  data-ocid="mfr-bills.due_date_input"
                />
              </div>
              <div className="sm:col-span-2">
                <div className="flex items-center gap-2 mt-1">
                  <input
                    id="pending-payment-checkbox"
                    type="checkbox"
                    checked={form.pendingPayment}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        pendingPayment: e.target.checked,
                        pendingNote: e.target.checked ? f.pendingNote : "",
                      }))
                    }
                    className="h-4 w-4 rounded border-input accent-primary cursor-pointer"
                    data-ocid="mfr-bills.pending_payment_checkbox"
                  />
                  <Label
                    htmlFor="pending-payment-checkbox"
                    className="cursor-pointer select-none"
                  >
                    Pending Payment from Merchant Party
                  </Label>
                </div>
              </div>
              {form.pendingPayment && (
                <div className="sm:col-span-2">
                  <Label>Payment Note</Label>
                  <Input
                    value={form.pendingNote}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, pendingNote: e.target.value }))
                    }
                    placeholder="Reason or note for pending payment…"
                    data-ocid="mfr-bills.pending_note_input"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="mfr-bills.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAdd}
                disabled={addBill.isPending}
                data-ocid="mfr-bills.submit_button"
              >
                {addBill.isPending ? "Saving..." : "Add Bill"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isTableLoading ? (
        <div className="space-y-2">
          {["s1", "s2", "s3", "s4"].map((k) => (
            <Skeleton key={k} className="h-12 w-full" />
          ))}
        </div>
      ) : displayedBills.length === 0 ? (
        <div
          className="flex flex-col items-center gap-2 py-12 text-center"
          data-ocid="mfr-bills.empty_state"
        >
          <Receipt className="h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">
            {billFilter === "pending"
              ? "No pending bills."
              : "No bills added yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Party
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Merchant Pending
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayedBills.map((b, i) => (
                <tr
                  key={b.id}
                  className="hover:bg-muted/20"
                  data-ocid={`mfr-bills.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {b.billType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-medium">{b.partyName}</td>
                  <td className="px-4 py-3 text-right font-semibold font-mono">
                    ₹{b.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {b.dueDate}
                  </td>
                  <td className="px-4 py-3">
                    {b.isPaid ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        Paid
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      {b.pendingPayment ? (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 text-xs w-fit">
                          Pending
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100 text-xs w-fit">
                          Cleared
                        </Badge>
                      )}
                      {b.pendingNote && (
                        <p className="text-xs text-muted-foreground mt-0.5 max-w-[160px] truncate">
                          {b.pendingNote}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {!b.isPaid && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkPaid(b)}
                          disabled={markPaid.isPending}
                          data-ocid={`mfr-bills.mark_paid.${i + 1}`}
                        >
                          Mark Paid
                        </Button>
                      )}
                      {b.pendingPayment && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="border-green-300 text-green-700 hover:bg-green-50"
                          onClick={() => handleMarkCleared(b)}
                          disabled={updateBill.isPending}
                          data-ocid={`mfr-bills.mark_cleared.${i + 1}`}
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Mark Cleared
                        </Button>
                      )}
                    </div>
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

export default function ManufacturerAccountsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <DollarSign className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Accounts & Bills
          </h1>
          <p className="text-sm text-muted-foreground">
            Income, expenses, receivables, payables, and bills
          </p>
        </div>
      </div>

      <Tabs defaultValue="entries" className="space-y-4">
        <TabsList data-ocid="mfr-accounts.tab">
          <TabsTrigger value="entries">
            <BookOpen className="mr-1 h-4 w-4" />
            Account Entries
          </TabsTrigger>
          <TabsTrigger value="bills">
            <Receipt className="mr-1 h-4 w-4" />
            Bills
          </TabsTrigger>
        </TabsList>
        <TabsContent value="entries">
          <Card>
            <CardContent className="pt-6">
              <AccountEntriesTab />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bills">
          <Card>
            <CardContent className="pt-6">
              <BillsTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
