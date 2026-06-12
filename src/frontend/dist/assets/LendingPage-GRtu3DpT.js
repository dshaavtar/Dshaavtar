import { r as reactExports, aT as useGetAllLendingItems, aU as useGetLendingItemsDueSoon, dW as useCreateLendingItem, dX as useUpdateLendingItem, dl as useUpdateLendingStatus, dk as useTriggerLendingReminder, dY as useCheckOverdueLendingReminders, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { H as HandCoins } from "./hand-coins-D5RW6D6g.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { P as Pen } from "./pen-DGASRaG7.js";
import { B as Bell } from "./bell-Bilc9tB3.js";
import { X } from "./x-Chksmd6i.js";
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
const CATEGORIES = [
  "electronics",
  "furniture",
  "tools",
  "books",
  "sports",
  "clothing",
  "other"
];
const FREQUENCIES = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
  { value: "specific_date", label: "Specific Date" }
];
const STATUS_CONFIG = {
  active: {
    label: "Active",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200"
  },
  returned: {
    label: "Returned",
    cls: "bg-blue-100 text-blue-700 border-blue-200"
  },
  overdue: { label: "Overdue", cls: "bg-red-100 text-red-700 border-red-200" },
  disputed: {
    label: "Disputed",
    cls: "bg-orange-100 text-orange-700 border-orange-200"
  }
};
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status == null ? void 0 : status.toLowerCase()] ?? {
    label: status,
    cls: "bg-muted text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${cfg.cls}`,
      children: cfg.label
    }
  );
}
const EMPTY_FORM = {
  lenderPhone: "",
  borrowerPhone: "",
  itemCategory: "other",
  itemName: "",
  itemDescription: "",
  returnDate: BigInt(0),
  charge: 0,
  chargeDescription: "",
  reminderFrequency: "monthly",
  status: "active"
};
function LendingFormModal({
  initial,
  onClose,
  onSave,
  saving
}) {
  const isEdit = !!initial;
  const [form, setForm] = reactExports.useState(
    initial ? {
      lenderPhone: initial.lenderPhone,
      borrowerPhone: initial.borrowerPhone,
      itemCategory: initial.itemCategory,
      itemName: initial.itemName,
      itemDescription: initial.itemDescription,
      returnDate: initial.returnDate,
      charge: initial.charge,
      chargeDescription: initial.chargeDescription,
      reminderFrequency: initial.reminderFrequency,
      status: initial.status
    } : { ...EMPTY_FORM }
  );
  const returnDateStr = form.returnDate ? new Date(Number(form.returnDate) / 1e6).toISOString().slice(0, 10) : "";
  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: isEdit ? "Edit Lending Item" : "Add Lending Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "Close",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-5 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Lender Phone *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              required: true,
              placeholder: "+91XXXXXXXXXX",
              value: form.lenderPhone ?? "",
              onChange: (e) => setForm((f) => ({ ...f, lenderPhone: e.target.value })),
              className: "h-8 text-xs",
              "data-ocid": "lending.lender_phone.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Borrower Phone *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              required: true,
              placeholder: "+91XXXXXXXXXX",
              value: form.borrowerPhone ?? "",
              onChange: (e) => setForm((f) => ({ ...f, borrowerPhone: e.target.value })),
              className: "h-8 text-xs",
              "data-ocid": "lending.borrower_phone.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Category *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.itemCategory ?? "other",
              onValueChange: (v) => setForm((f) => ({ ...f, itemCategory: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-8 text-xs",
                    "data-ocid": "lending.category.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, className: "text-xs", children: c.charAt(0).toUpperCase() + c.slice(1) }, c)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Item Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              required: true,
              placeholder: "e.g. Canon Camera",
              value: form.itemName ?? "",
              onChange: (e) => setForm((f) => ({ ...f, itemName: e.target.value })),
              className: "h-8 text-xs",
              "data-ocid": "lending.item_name.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Item Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "Brief description of the item",
            value: form.itemDescription ?? "",
            onChange: (e) => setForm((f) => ({ ...f, itemDescription: e.target.value })),
            className: "w-full text-xs rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-16",
            "data-ocid": "lending.item_description.textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Return Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              required: true,
              type: "date",
              value: returnDateStr,
              onChange: (e) => {
                const ms = new Date(e.target.value).getTime();
                setForm((f) => ({
                  ...f,
                  returnDate: BigInt(ms * 1e6)
                }));
              },
              className: "h-8 text-xs",
              "data-ocid": "lending.return_date.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Reminder Frequency *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.reminderFrequency ?? "monthly",
              onValueChange: (v) => setForm((f) => ({ ...f, reminderFrequency: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-8 text-xs",
                    "data-ocid": "lending.reminder_frequency.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FREQUENCIES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: f.value,
                    className: "text-xs",
                    children: f.label
                  },
                  f.value
                )) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Charge (₹, optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              placeholder: "0",
              value: form.charge ?? 0,
              onChange: (e) => setForm((f) => ({ ...f, charge: Number(e.target.value) })),
              className: "h-8 text-xs",
              "data-ocid": "lending.charge.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Charge Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. ₹500/month",
              value: form.chargeDescription ?? "",
              onChange: (e) => setForm((f) => ({ ...f, chargeDescription: e.target.value })),
              className: "h-8 text-xs",
              "data-ocid": "lending.charge_description.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: onClose,
            "data-ocid": "lending.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "sm",
            disabled: saving,
            "data-ocid": "lending.submit_button",
            children: saving ? "Saving…" : isEdit ? "Update Item" : "Add Item"
          }
        )
      ] })
    ] })
  ] }) });
}
function LendingTable({
  items,
  onEdit,
  onRemind,
  onStatusChange
}) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-2",
        "data-ocid": "lending.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-10 h-10 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No lending items in this view" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/60 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
      "Item",
      "Category",
      "Lender",
      "Borrower",
      "Return Date",
      "Charge",
      "Reminder",
      "Status",
      "Last Reminded",
      "Actions"
    ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "th",
      {
        className: "text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap",
        children: col
      },
      col
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/40 hover:bg-muted/20 transition-colors",
        "data-ocid": `lending.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-medium max-w-[120px] truncate", children: item.itemName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: item.itemCategory }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono", children: item.lenderPhone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono", children: item.borrowerPhone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: item.returnDate ? new Date(
            Number(item.returnDate) / 1e6
          ).toLocaleDateString("en-IN") : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: item.charge > 0 ? `₹${item.charge}` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 capitalize", children: item.reminderFrequency }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: item.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: item.lastReminderSent ? new Date(
            Number(item.lastReminderSent) / 1e6
          ).toLocaleDateString("en-IN") : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-6 w-6 p-0",
                onClick: () => onEdit(item),
                "aria-label": "Edit",
                "data-ocid": `lending.edit_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-6 w-6 p-0 text-amber-600 hover:text-amber-700",
                onClick: () => onRemind(item.id),
                "aria-label": "Send reminder",
                "data-ocid": `lending.remind_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3 h-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: item.status,
                onChange: (e) => onStatusChange(item.id, e.target.value),
                className: "text-[10px] bg-muted border border-border rounded px-1.5 py-0.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
                "aria-label": "Update status",
                "data-ocid": `lending.status_select.${idx + 1}`,
                children: Object.keys(STATUS_CONFIG).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_CONFIG[s].label }, s))
              }
            )
          ] }) })
        ]
      },
      item.id
    )) })
  ] }) });
}
function LendingPage() {
  const [modalItem, setModalItem] = reactExports.useState(null);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const {
    data: allItems = [],
    isLoading,
    error,
    refetch
  } = useGetAllLendingItems();
  const { data: dueSoonItems = [] } = useGetLendingItemsDueSoon();
  const createItem = useCreateLendingItem();
  const updateItem = useUpdateLendingItem();
  const updateStatus = useUpdateLendingStatus();
  const triggerReminder = useTriggerLendingReminder();
  const checkOverdue = useCheckOverdueLendingReminders();
  const activeItems = reactExports.useMemo(
    () => allItems.filter((i) => i.status === "active"),
    [allItems]
  );
  const overdueItems = reactExports.useMemo(
    () => allItems.filter((i) => i.status === "overdue"),
    [allItems]
  );
  const returnedItems = reactExports.useMemo(
    () => allItems.filter((i) => i.status === "returned"),
    [allItems]
  );
  async function handleSave(data) {
    setSaving(true);
    try {
      if (modalItem == null ? void 0 : modalItem.id) {
        const merged = { ...modalItem, ...data };
        await updateItem.mutateAsync({ id: modalItem.id, item: merged });
        ue.success("Lending item updated");
      } else {
        const now = BigInt(Date.now() * 1e6);
        const item = {
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
          updatedAt: now
        };
        await createItem.mutateAsync(item);
        ue.success("Lending item added");
      }
      setModalOpen(false);
      setModalItem(null);
    } catch (e) {
      ue.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }
  async function handleRemind(id) {
    try {
      await triggerReminder.mutateAsync(id);
      ue.success("Reminder sent to both parties");
    } catch (e) {
      ue.error(e instanceof Error ? e.message : "Failed to send reminder");
    }
  }
  async function handleStatusChange(id, status) {
    try {
      await updateStatus.mutateAsync({ id, status });
      ue.success(`Status updated to ${status}`);
    } catch (e) {
      ue.error(e instanceof Error ? e.message : "Failed to update status");
    }
  }
  async function handleCheckOverdue() {
    try {
      const count = await checkOverdue.mutateAsync();
      ue.success(`${count} overdue reminder${count !== 1 ? "s" : ""} sent`);
    } catch (e) {
      ue.error(e instanceof Error ? e.message : "Failed to check overdue");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-5 h-5 text-amber-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Lending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            allItems.length,
            " item",
            allItems.length !== 1 ? "s" : "",
            " · reminders sent to both parties"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-2",
            onClick: handleCheckOverdue,
            disabled: checkOverdue.isPending,
            "data-ocid": "lending.check_overdue_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-red-500" }),
              "Check Overdue"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-2",
            onClick: () => refetch(),
            disabled: isLoading,
            "data-ocid": "lending.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`
                }
              ),
              "Refresh"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-2",
            onClick: () => {
              setModalItem(null);
              setModalOpen(true);
            },
            "data-ocid": "lending.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Add Lending Item"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Total Items",
        value: allItems.length,
        cls: "bg-primary/10 text-primary"
      },
      {
        label: "Active",
        value: activeItems.length,
        cls: "bg-emerald-100 text-emerald-700"
      },
      {
        label: "Overdue",
        value: overdueItems.length,
        cls: "bg-red-100 text-red-700"
      },
      {
        label: "Due Soon (7d)",
        value: dueSoonItems.length,
        cls: "bg-amber-100 text-amber-700"
      }
    ].map(({ label, value, cls }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 shadow-card flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-lg flex items-center justify-center ${cls}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground tabular-nums", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
          ] })
        ]
      },
      label
    )) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-center justify-between",
        "data-ocid": "lending.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed to load lending items." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => refetch(), children: "Retry" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: Array.from({ length: 6 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded" }, i)
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "all",
            className: "text-xs",
            "data-ocid": "lending.all_tab",
            children: [
              "All (",
              allItems.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "active",
            className: "text-xs",
            "data-ocid": "lending.active_tab",
            children: [
              "Active (",
              activeItems.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "overdue",
            className: "text-xs",
            "data-ocid": "lending.overdue_tab",
            children: [
              "Overdue (",
              overdueItems.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "due-soon",
            className: "text-xs",
            "data-ocid": "lending.due_soon_tab",
            children: [
              "Due Soon (",
              dueSoonItems.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "returned",
            className: "text-xs",
            "data-ocid": "lending.returned_tab",
            children: [
              "Returned (",
              returnedItems.length,
              ")"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        LendingTable,
        {
          items: allItems,
          onEdit: (i) => {
            setModalItem(i);
            setModalOpen(true);
          },
          onRemind: handleRemind,
          onStatusChange: handleStatusChange
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        LendingTable,
        {
          items: activeItems,
          onEdit: (i) => {
            setModalItem(i);
            setModalOpen(true);
          },
          onRemind: handleRemind,
          onStatusChange: handleStatusChange
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overdue", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        LendingTable,
        {
          items: overdueItems,
          onEdit: (i) => {
            setModalItem(i);
            setModalOpen(true);
          },
          onRemind: handleRemind,
          onStatusChange: handleStatusChange
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "due-soon", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        LendingTable,
        {
          items: dueSoonItems,
          onEdit: (i) => {
            setModalItem(i);
            setModalOpen(true);
          },
          onRemind: handleRemind,
          onStatusChange: handleStatusChange
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "returned", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        LendingTable,
        {
          items: returnedItems,
          onEdit: (i) => {
            setModalItem(i);
            setModalOpen(true);
          },
          onRemind: handleRemind,
          onStatusChange: handleStatusChange
        }
      ) })
    ] }) }),
    modalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LendingFormModal,
      {
        initial: modalItem ?? void 0,
        onClose: () => {
          setModalOpen(false);
          setModalItem(null);
        },
        onSave: handleSave,
        saving
      }
    )
  ] });
}
export {
  LendingPage as default
};
