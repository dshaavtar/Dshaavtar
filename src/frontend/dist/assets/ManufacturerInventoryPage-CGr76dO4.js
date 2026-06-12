import { j as jsxRuntimeExports, eG as useGetInventoryItems, eH as useAddInventoryItem, eI as useUpdateInventoryStock, r as reactExports, eJ as useGetInventoryTransactions, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent } from "./card-Dx8tJeYi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { P as Package } from "./package-CosknzeL.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { C as CircleArrowDown, a as CircleArrowUp } from "./circle-arrow-up-sBTuHrXu.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
const MFR_ID = "manufacturer-1";
const TXN_TYPES = [
  "sale",
  "purchase",
  "restock",
  "expiry_write_off",
  "return_item",
  "adjustment"
];
function StockBadge({ item }) {
  if (item.currentStock <= item.reorderLevel) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
      " ",
      item.currentStock,
      " ",
      item.unit
    ] });
  }
  if (item.currentStock <= item.reorderLevel * 2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700", children: [
      item.currentStock,
      " ",
      item.unit
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700", children: [
    item.currentStock,
    " ",
    item.unit
  ] });
}
function InventoryItemsTab() {
  const { data: items = [], isLoading } = useGetInventoryItems(MFR_ID);
  const addItem = useAddInventoryItem();
  const updateStock = useUpdateInventoryStock();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [showUpdate, setShowUpdate] = reactExports.useState(false);
  const [selectedItem, setSelectedItem] = reactExports.useState(null);
  const [addForm, setAddForm] = reactExports.useState({
    productName: "",
    batchCode: "",
    currentStock: 0,
    reorderLevel: 10,
    unit: "pcs",
    expiryDate: ""
  });
  const [updateForm, setUpdateForm] = reactExports.useState({
    txnType: "restock",
    quantity: 0,
    notes: ""
  });
  const handleAdd = async () => {
    if (!addForm.productName) {
      ue.error("Product name required");
      return;
    }
    try {
      await addItem.mutateAsync({
        manufacturerId: MFR_ID,
        ...addForm,
        expiryDate: addForm.expiryDate || void 0
      });
      ue.success("Item added to inventory");
      setShowAdd(false);
      setAddForm({
        productName: "",
        batchCode: "",
        currentStock: 0,
        reorderLevel: 10,
        unit: "pcs",
        expiryDate: ""
      });
    } catch (e) {
      ue.error(e.message);
    }
  };
  const handleUpdate = async () => {
    if (!selectedItem) return;
    if (updateForm.quantity <= 0) {
      ue.error("Quantity must be > 0");
      return;
    }
    try {
      await updateStock.mutateAsync({
        itemId: selectedItem.id,
        manufacturerId: MFR_ID,
        txnType: updateForm.txnType,
        quantity: updateForm.quantity,
        notes: updateForm.notes
      });
      ue.success("Stock updated");
      setShowUpdate(false);
    } catch (e) {
      ue.error(e.message);
    }
  };
  const lowStock = items.filter((i) => i.currentStock <= i.reorderLevel);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    lowStock.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-red-200 bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-2 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-red-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-red-700", children: [
        lowStock.length,
        " item",
        lowStock.length > 1 ? "s" : "",
        " at or below reorder level"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Inventory Items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          onClick: () => setShowAdd(true),
          "data-ocid": "mfr-inventory.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
            " Add Item"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContent,
      {
        className: "flex flex-col items-center gap-2 py-12 text-center",
        "data-ocid": "mfr-inventory.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No inventory items yet." })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Batch Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Current Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Reorder Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Expiry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20",
          "data-ocid": `mfr-inventory.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: item.productName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: item.batchCode || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StockBadge, { item }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-muted-foreground", children: [
              item.reorderLevel,
              " ",
              item.unit
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: item.expiryDate ?? "N/A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => {
                  setSelectedItem(item);
                  setShowUpdate(true);
                },
                "data-ocid": `mfr-inventory.update_button.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-1 h-3 w-3" }),
                  " Update Stock"
                ]
              }
            ) })
          ]
        },
        item.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "mfr-inventory.add_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Inventory Item" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: addForm.productName,
              onChange: (e) => setAddForm((f) => ({ ...f, productName: e.target.value })),
              placeholder: "e.g. Raw Sugar",
              "data-ocid": "mfr-inventory.product_name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Batch Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: addForm.batchCode,
              onChange: (e) => setAddForm((f) => ({ ...f, batchCode: e.target.value })),
              placeholder: "Optional"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Current Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: addForm.currentStock,
                onChange: (e) => setAddForm((f) => ({
                  ...f,
                  currentStock: Number(e.target.value)
                }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reorder Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: addForm.reorderLevel,
                onChange: (e) => setAddForm((f) => ({
                  ...f,
                  reorderLevel: Number(e.target.value)
                }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Unit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: addForm.unit,
              onChange: (e) => setAddForm((f) => ({ ...f, unit: e.target.value })),
              placeholder: "pcs / kg / ltr"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expiry Date (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: addForm.expiryDate,
              onChange: (e) => setAddForm((f) => ({ ...f, expiryDate: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowAdd(false),
              "data-ocid": "mfr-inventory.add_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleAdd,
              disabled: addItem.isPending,
              "data-ocid": "mfr-inventory.add_submit_button",
              children: addItem.isPending ? "Adding..." : "Add Item"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showUpdate, onOpenChange: setShowUpdate, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "mfr-inventory.update_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Update Stock — ",
        selectedItem == null ? void 0 : selectedItem.productName
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Transaction Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: updateForm.txnType,
              onValueChange: (v) => setUpdateForm((f) => ({ ...f, txnType: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "mfr-inventory.txn_type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TXN_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t.replace(/_/g, " ") }, t)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              value: updateForm.quantity,
              onChange: (e) => setUpdateForm((f) => ({
                ...f,
                quantity: Number(e.target.value)
              })),
              "data-ocid": "mfr-inventory.qty_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: updateForm.notes,
              onChange: (e) => setUpdateForm((f) => ({ ...f, notes: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowUpdate(false),
              "data-ocid": "mfr-inventory.update_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleUpdate,
              disabled: updateStock.isPending,
              "data-ocid": "mfr-inventory.update_submit_button",
              children: updateStock.isPending ? "Saving..." : "Update"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function TransactionsTab() {
  const { data: items = [] } = useGetInventoryItems(MFR_ID);
  const [selectedItemId, setSelectedItemId] = reactExports.useState("");
  const { data: txns = [], isLoading } = useGetInventoryTransactions(selectedItemId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Filter by Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedItemId, onValueChange: setSelectedItemId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-64",
            "data-ocid": "mfr-inventory.filter_select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select item" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: i.id, children: i.productName }, i.id)) })
      ] })
    ] }),
    !selectedItemId ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select an item to view its transactions." }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }) : txns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardContent,
      {
        className: "py-10 text-center",
        "data-ocid": "mfr-inventory-txns.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No transactions recorded for this item." })
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Quantity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Reference" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Date" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: txns.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20",
          "data-ocid": `mfr-inventory-txns.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              ["sale", "expiry_write_off"].includes(t.txnType) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "h-3 w-3 text-red-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "h-3 w-3 text-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: t.txnType.replace(/_/g, " ") })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono", children: t.quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: t.referenceId ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: t.notes ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: new Date(
              Number(t.createdAt) / 1e6
            ).toLocaleDateString() })
          ]
        },
        t.id
      )) })
    ] }) })
  ] });
}
function ManufacturerInventoryPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-primary/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Inventory Register" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track stock levels, batches, and movement" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "items", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "mfr-inventory.tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "items", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mr-1 h-4 w-4" }),
          "Inventory Items"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "transactions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-1 h-4 w-4" }),
          "Transactions"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "items", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InventoryItemsTab, {}) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "transactions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionsTab, {}) }) }) })
    ] })
  ] });
}
export {
  ManufacturerInventoryPage as default
};
