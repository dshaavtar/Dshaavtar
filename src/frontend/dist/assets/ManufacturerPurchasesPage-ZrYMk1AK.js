import { eM as useGetPurchaseRecords, r as reactExports, j as jsxRuntimeExports, eN as useAddPurchaseRecord, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-Dx8tJeYi.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Separator } from "./separator-DqiCXh2l.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as ShoppingBag } from "./shopping-bag-DlKZ3RXf.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { M as Minus } from "./minus-BPUUsZPQ.js";
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
const MFR_ID = "manufacturer-1";
const SKEL_PURCH = ["p1", "p2", "p3", "p4"];
const PAYMENT_STATUSES = ["pending", "paid", "partial"];
function PurchaseForm({ onSuccess }) {
  const addPurchase = useAddPurchaseRecord();
  const [form, setForm] = reactExports.useState({
    supplierName: "",
    invoiceNo: "",
    paymentStatus: "pending"
  });
  const [products, setProducts] = reactExports.useState([
    { id: crypto.randomUUID(), productName: "", qty: 1, unitPrice: 0 }
  ]);
  const addRow = () => setProducts((p) => [
    ...p,
    { id: crypto.randomUUID(), productName: "", qty: 1, unitPrice: 0 }
  ]);
  const removeRow = (id) => setProducts((p) => p.filter((r) => r.id !== id));
  const updateRow = (id, field, value) => setProducts(
    (p) => p.map((r) => r.id === id ? { ...r, [field]: value } : r)
  );
  const totalAmount = products.reduce((sum, r) => sum + r.qty * r.unitPrice, 0);
  const handleSubmit = async () => {
    if (!form.supplierName) {
      ue.error("Supplier name required");
      return;
    }
    if (products.some((r) => !r.productName)) {
      ue.error("All product names required");
      return;
    }
    try {
      await addPurchase.mutateAsync({
        manufacturerId: MFR_ID,
        ...form,
        products,
        totalAmount
      });
      ue.success("Purchase record added");
      setForm({ supplierName: "", invoiceNo: "", paymentStatus: "pending" });
      setProducts([
        { id: crypto.randomUUID(), productName: "", qty: 1, unitPrice: 0 }
      ]);
      onSuccess();
    } catch (e) {
      ue.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "New Purchase" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Supplier Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.supplierName,
              onChange: (e) => setForm((f) => ({ ...f, supplierName: e.target.value })),
              placeholder: "Supplier / vendor name",
              "data-ocid": "mfr-purchases.supplier_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Invoice No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.invoiceNo,
              onChange: (e) => setForm((f) => ({ ...f, invoiceNo: e.target.value })),
              placeholder: "PUR-2025-001",
              "data-ocid": "mfr-purchases.invoice_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Payment Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.paymentStatus,
              onValueChange: (v) => setForm((f) => ({ ...f, paymentStatus: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "mfr-purchases.payment_status_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAYMENT_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s.charAt(0).toUpperCase() + s.slice(1) }, s)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Products Purchased" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: addRow,
              "data-ocid": "mfr-purchases.add_row_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-3 w-3" }),
                "Add Row"
              ]
            }
          )
        ] }),
        products.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-5", children: [
            idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Product Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: row.productName,
                onChange: (e) => updateRow(row.id, "productName", e.target.value),
                placeholder: "Raw material / component"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Qty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 1,
                value: row.qty,
                onChange: (e) => updateRow(row.id, "qty", Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3", children: [
            idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Unit Price (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: row.unitPrice,
                onChange: (e) => updateRow(row.id, "unitPrice", Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 text-right", children: [
            idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "py-2 text-sm font-mono", children: [
              "₹",
              (row.qty * row.unitPrice).toFixed(2)
            ] })
          ] }),
          products.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "col-span-12 flex justify-end",
              onClick: () => removeRow(row.id),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4 text-destructive" })
            }
          )
        ] }, row.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-semibold", children: [
          "Total: ₹",
          totalAmount.toFixed(2)
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: handleSubmit,
          disabled: addPurchase.isPending,
          "data-ocid": "mfr-purchases.submit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }),
            addPurchase.isPending ? "Saving..." : "Record Purchase"
          ]
        }
      ) })
    ] })
  ] });
}
const paymentColor = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  partial: "bg-orange-100 text-orange-700"
};
function ManufacturerPurchasesPage() {
  const { data: purchases = [], isLoading } = useGetPurchaseRecords(MFR_ID);
  const [showForm, setShowForm] = reactExports.useState(false);
  const totalSpend = purchases.reduce((s, r) => s + r.totalAmount, 0);
  const pendingCount = purchases.filter(
    (r) => r.paymentStatus === "pending"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-primary/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Purchase Records" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Raw material and supplier purchases with restock tracking" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: () => setShowForm((v) => !v),
          "data-ocid": "mfr-purchases.toggle_form_button",
          children: showForm ? "Hide Form" : "+ New Purchase"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Purchases" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: purchases.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Spend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold", children: [
          "₹",
          totalSpend.toLocaleString()
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pending Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-yellow-600", children: pendingCount })
      ] }) })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(PurchaseForm, { onSuccess: () => setShowForm(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "All Purchases" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SKEL_PURCH.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : purchases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-2 py-12 text-center",
          "data-ocid": "mfr-purchases.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-8 w-8 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No purchases recorded yet." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Invoice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Supplier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium text-muted-foreground", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: purchases.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "hover:bg-muted/20",
            "data-ocid": `mfr-purchases.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: p.invoiceNo || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: p.supplierName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                p.products.slice(0, 2).map((pr) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs",
                    children: pr.productName
                  },
                  pr.productName
                )),
                p.products.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                  "+",
                  p.products.length - 2
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold", children: [
                "₹",
                p.totalAmount.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `rounded-full px-2 py-0.5 text-xs font-medium ${paymentColor[p.paymentStatus] ?? ""}`,
                  children: p.paymentStatus
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: new Date(
                Number(p.createdAt) / 1e6
              ).toLocaleDateString() })
            ]
          },
          p.id
        )) })
      ] }) }) })
    ] })
  ] });
}
export {
  ManufacturerPurchasesPage as default
};
