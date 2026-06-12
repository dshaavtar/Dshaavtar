import { j as jsxRuntimeExports, eO as useGetAccountEntries, eP as useAddAccountEntry, r as reactExports, eQ as useGetBillRecords, eR as useAddBillRecord, eS as useMarkBillPaid, eT as useUpdateBillRecord, eU as useGetPendingBills, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent } from "./card-Dx8tJeYi.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { D as DollarSign } from "./dollar-sign-XR0nG9ah.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { R as Receipt } from "./receipt-ClJm2r1y.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { F as FileText } from "./file-text-ZAufnVPm.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { a as CircleArrowUp, C as CircleArrowDown } from "./circle-arrow-up-sBTuHrXu.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-DYndF6Sn.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
import "./index-BNXq-E6T.js";
const MFR_ID = "manufacturer-1";
const ENTRY_TYPES = ["income", "expense", "receivable", "payable"];
const INCOME_CATEGORIES = [
  "Product Sales",
  "Commission",
  "Royalty",
  "Interest",
  "Other"
];
const EXPENSE_CATEGORIES = [
  "Raw Material",
  "Labour",
  "Utilities",
  "Transport",
  "Rent",
  "Marketing",
  "Other"
];
const BILL_TYPES = [
  "supplier",
  "utility",
  "rent",
  "salary",
  "loan",
  "tax",
  "other"
];
function SummaryCards({ entries }) {
  const totals = entries.reduce(
    (acc, e) => {
      acc[e.entryType] = (acc[e.entryType] ?? 0) + e.amount;
      return acc;
    },
    { income: 0, expense: 0, receivable: 0, payable: 0 }
  );
  const cards = [
    {
      label: "Total Income",
      type: "income",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "h-5 w-5" }),
      color: "text-green-600"
    },
    {
      label: "Total Expense",
      type: "expense",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "h-5 w-5" }),
      color: "text-red-500"
    },
    {
      label: "Receivable",
      type: "receivable",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "h-5 w-5" }),
      color: "text-blue-600"
    },
    {
      label: "Payable",
      type: "payable",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "h-5 w-5" }),
      color: "text-orange-500"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 ${c.color} mb-1`, children: [
      c.icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: c.label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground", children: [
      "₹",
      (totals[c.type] ?? 0).toLocaleString()
    ] })
  ] }) }, c.type)) });
}
function AccountEntriesTab() {
  const { data: entries = [], isLoading } = useGetAccountEntries(MFR_ID);
  const addEntry = useAddAccountEntry();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    entryType: "income",
    category: "",
    amount: 0,
    description: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    referenceId: ""
  });
  const categories = form.entryType === "income" || form.entryType === "receivable" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const handleAdd = async () => {
    if (!form.category || !form.description) {
      ue.error("Category and description required");
      return;
    }
    if (form.amount <= 0) {
      ue.error("Amount must be > 0");
      return;
    }
    try {
      await addEntry.mutateAsync({
        manufacturerId: MFR_ID,
        ...form,
        referenceId: form.referenceId || void 0
      });
      ue.success("Entry recorded");
      setShowForm(false);
      setForm({
        entryType: "income",
        category: "",
        amount: 0,
        description: "",
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        referenceId: ""
      });
    } catch (e) {
      ue.error(e.message);
    }
  };
  const entryColor = {
    income: "text-green-600",
    expense: "text-red-500",
    receivable: "text-blue-600",
    payable: "text-orange-500"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCards, { entries }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "All Entries" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          onClick: () => setShowForm((v) => !v),
          "data-ocid": "mfr-accounts.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
            showForm ? "Cancel" : "Add Entry"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/20 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Entry Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.entryType,
              onValueChange: (v) => setForm((f) => ({ ...f, entryType: v, category: "" })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "mfr-accounts.entry_type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ENTRY_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t.charAt(0).toUpperCase() + t.slice(1) }, t)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.category,
              onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "mfr-accounts.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              value: form.amount,
              onChange: (e) => setForm((f) => ({ ...f, amount: Number(e.target.value) })),
              "data-ocid": "mfr-accounts.amount_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.date,
              onChange: (e) => setForm((f) => ({ ...f, date: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              placeholder: "What is this for?",
              "data-ocid": "mfr-accounts.description_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reference ID (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.referenceId,
              onChange: (e) => setForm((f) => ({ ...f, referenceId: e.target.value })),
              placeholder: "Invoice / order no"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setShowForm(false),
            "data-ocid": "mfr-accounts.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleAdd,
            disabled: addEntry.isPending,
            "data-ocid": "mfr-accounts.submit_button",
            children: addEntry.isPending ? "Saving..." : "Add Entry"
          }
        )
      ] })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-2 py-12 text-center",
        "data-ocid": "mfr-accounts.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No account entries yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Date" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: entries.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20",
          "data-ocid": `mfr-accounts.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold uppercase ${entryColor[e.entryType] ?? ""}`,
                children: e.entryType
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: e.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                className: `px-4 py-3 text-right font-semibold font-mono ${entryColor[e.entryType] ?? ""}`,
                children: [
                  ["expense", "payable"].includes(e.entryType) ? "-" : "+",
                  "₹",
                  e.amount.toLocaleString()
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: e.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: e.date })
          ]
        },
        e.id
      )) })
    ] }) })
  ] });
}
function BillsTab() {
  const { data: bills = [], isLoading } = useGetBillRecords(MFR_ID);
  const addBill = useAddBillRecord();
  const markPaid = useMarkBillPaid();
  const updateBill = useUpdateBillRecord();
  const [billFilter, setBillFilter] = reactExports.useState("all");
  const { data: pendingBills = [], isLoading: isPendingLoading } = useGetPendingBills(MFR_ID);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    billType: "supplier",
    partyName: "",
    amount: 0,
    dueDate: "",
    pendingPayment: false,
    pendingNote: ""
  });
  const displayedBills = billFilter === "pending" ? pendingBills : bills;
  const handleAdd = async () => {
    if (!form.partyName) {
      ue.error("Party name required");
      return;
    }
    if (form.amount <= 0) {
      ue.error("Amount must be > 0");
      return;
    }
    if (!form.dueDate) {
      ue.error("Due date required");
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
        pendingNote: form.pendingNote
      });
      ue.success("Bill added");
      setShowForm(false);
      setForm({
        billType: "supplier",
        partyName: "",
        amount: 0,
        dueDate: "",
        pendingPayment: false,
        pendingNote: ""
      });
    } catch (e) {
      ue.error(e.message);
    }
  };
  const handleMarkPaid = async (bill) => {
    try {
      await markPaid.mutateAsync({
        billId: bill.id,
        manufacturerId: bill.manufacturerId
      });
      ue.success("Bill marked as paid");
    } catch (e) {
      ue.error(e.message);
    }
  };
  const handleMarkCleared = async (bill) => {
    try {
      await updateBill.mutateAsync({
        billId: bill.id,
        manufacturerId: bill.manufacturerId,
        pendingPayment: false,
        pendingNote: bill.pendingNote ?? ""
      });
      ue.success("Bill marked as cleared");
    } catch (e) {
      ue.error(e.message);
    }
  };
  const unpaid = bills.filter((b) => !b.isPaid);
  const totalUnpaid = unpaid.reduce((s, b) => s + b.amount, 0);
  const isTableLoading = billFilter === "pending" ? isPendingLoading : isLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    unpaid.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-orange-200 bg-orange-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-orange-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-orange-700", children: [
          unpaid.length,
          " unpaid bill",
          unpaid.length > 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-orange-700", children: [
        "₹",
        totalUnpaid.toLocaleString()
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Bills" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-md border border-border overflow-hidden text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setBillFilter("all"),
              className: `px-3 py-1 transition-colors ${billFilter === "all" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`,
              "data-ocid": "mfr-bills.filter_all",
              children: "All"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setBillFilter("pending"),
              className: `px-3 py-1 transition-colors ${billFilter === "pending" ? "bg-amber-500 text-white" : "bg-background text-muted-foreground hover:bg-muted"}`,
              "data-ocid": "mfr-bills.filter_pending",
              children: "Pending Payment"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          onClick: () => setShowForm((v) => !v),
          "data-ocid": "mfr-bills.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
            showForm ? "Cancel" : "Add Bill"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bill Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.billType,
              onValueChange: (v) => setForm((f) => ({ ...f, billType: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "mfr-bills.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BILL_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t.charAt(0).toUpperCase() + t.slice(1) }, t)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Party Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.partyName,
              onChange: (e) => setForm((f) => ({ ...f, partyName: e.target.value })),
              placeholder: "Supplier / vendor",
              "data-ocid": "mfr-bills.party_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              value: form.amount,
              onChange: (e) => setForm((f) => ({ ...f, amount: Number(e.target.value) })),
              "data-ocid": "mfr-bills.amount_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.dueDate,
              onChange: (e) => setForm((f) => ({ ...f, dueDate: e.target.value })),
              "data-ocid": "mfr-bills.due_date_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "pending-payment-checkbox",
              type: "checkbox",
              checked: form.pendingPayment,
              onChange: (e) => setForm((f) => ({
                ...f,
                pendingPayment: e.target.checked,
                pendingNote: e.target.checked ? f.pendingNote : ""
              })),
              className: "h-4 w-4 rounded border-input accent-primary cursor-pointer",
              "data-ocid": "mfr-bills.pending_payment_checkbox"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "pending-payment-checkbox",
              className: "cursor-pointer select-none",
              children: "Pending Payment from Merchant Party"
            }
          )
        ] }) }),
        form.pendingPayment && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Payment Note" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.pendingNote,
              onChange: (e) => setForm((f) => ({ ...f, pendingNote: e.target.value })),
              placeholder: "Reason or note for pending payment…",
              "data-ocid": "mfr-bills.pending_note_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setShowForm(false),
            "data-ocid": "mfr-bills.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleAdd,
            disabled: addBill.isPending,
            "data-ocid": "mfr-bills.submit_button",
            children: addBill.isPending ? "Saving..." : "Add Bill"
          }
        )
      ] })
    ] }) }),
    isTableLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : displayedBills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-2 py-12 text-center",
        "data-ocid": "mfr-bills.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: billFilter === "pending" ? "No pending bills." : "No bills added yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Party" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Due Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Merchant Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: displayedBills.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20",
          "data-ocid": `mfr-bills.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: b.billType }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: b.partyName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold font-mono", children: [
              "₹",
              b.amount.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: b.dueDate }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: b.isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3" }),
              "Paid"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700", children: "Unpaid" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
              b.pendingPayment ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 text-xs w-fit", children: "Pending" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100 text-xs w-fit", children: "Cleared" }),
              b.pendingNote && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 max-w-[160px] truncate", children: b.pendingNote })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              !b.isPaid && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleMarkPaid(b),
                  disabled: markPaid.isPending,
                  "data-ocid": `mfr-bills.mark_paid.${i + 1}`,
                  children: "Mark Paid"
                }
              ),
              b.pendingPayment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "border-green-300 text-green-700 hover:bg-green-50",
                  onClick: () => handleMarkCleared(b),
                  disabled: updateBill.isPending,
                  "data-ocid": `mfr-bills.mark_cleared.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mr-1 h-3 w-3" }),
                    "Mark Cleared"
                  ]
                }
              )
            ] }) })
          ]
        },
        b.id
      )) })
    ] }) })
  ] });
}
function ManufacturerAccountsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-primary/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Accounts & Bills" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Income, expenses, receivables, payables, and bills" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "entries", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "mfr-accounts.tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "entries", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mr-1 h-4 w-4" }),
          "Account Entries"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "bills", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "mr-1 h-4 w-4" }),
          "Bills"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "entries", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountEntriesTab, {}) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bills", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BillsTab, {}) }) }) })
    ] })
  ] });
}
export {
  ManufacturerAccountsPage as default
};
