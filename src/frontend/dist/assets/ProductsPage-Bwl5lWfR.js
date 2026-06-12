import { r as reactExports, K as useProducts, D as useMerchants, j as jsxRuntimeExports, P as useCheckProductPriceUniformity, Q as useProductLocationPrices, R as useSetProductLocationPrice, S as useDeleteProductLocationPrice, p as ue, W as useAddProduct, X as useAddProductsBulk } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-g1LGwGv2.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { S as StatusBadge } from "./StatusBadge-DNkrizJz.js";
import { u as useDebounce, a as usePagination } from "./usePagination-hWnqFD6I.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { P as Package } from "./package-CosknzeL.js";
import { C as ChevronLeft } from "./chevron-left-DzxTPwXv.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { F as FileSpreadsheet } from "./file-spreadsheet-BWshsFOO.js";
import { I as Image } from "./image-Bu0hC9Tq.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { U as Upload } from "./upload-Ci34DUN7.js";
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
function PriceUniformityBadge({ productId }) {
  const { data } = useCheckProductPriceUniformity(productId);
  if (!data || data.locationCount === 0) return null;
  return data.isUniform ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border bg-green-100 text-green-700 border-green-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
    "Uniform pricing"
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border bg-amber-100 text-amber-700 border-amber-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 mr-1" }),
    "Variable (",
    data.locationCount,
    " locations)"
  ] });
}
function ProductImage({ urls }) {
  if (urls.length > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: urls[0],
        alt: "Product",
        className: "w-full h-full object-cover",
        onError: (e) => {
          e.currentTarget.style.display = "none";
          const next = e.currentTarget.nextElementSibling;
          if (next instanceof HTMLElement) next.classList.remove("hidden");
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 text-muted-foreground/40" }) });
}
function LocationPricingSection({ productId }) {
  const {
    data: prices = [],
    isLoading,
    refetch
  } = useProductLocationPrices(productId);
  const setPrice = useSetProductLocationPrice();
  const deletePrice = useDeleteProductLocationPrice();
  const [form, setForm] = reactExports.useState({ city: "", branch: "", price: "" });
  const [adding, setAdding] = reactExports.useState(false);
  async function handleAdd() {
    if (!form.city.trim() || !form.price.trim()) {
      ue.error("City and price are required");
      return;
    }
    try {
      await setPrice.mutateAsync({
        productId,
        city: form.city,
        branch: form.branch,
        price: Number.parseFloat(form.price)
      });
      ue.success("Location price saved");
      setForm({ city: "", branch: "", price: "" });
      setAdding(false);
      refetch();
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to save price");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Location Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "h-7 px-2 text-xs gap-1",
          onClick: () => setAdding((p) => !p),
          "data-ocid": "product.location-pricing.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            " Add"
          ]
        }
      )
    ] }),
    adding && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg p-3 space-y-2 bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1", children: "City *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.city,
              onChange: (e) => setForm((f) => ({ ...f, city: e.target.value })),
              placeholder: "Mumbai",
              className: "h-7 text-xs",
              "data-ocid": "product.location-pricing.city.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1", children: "Branch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.branch,
              onChange: (e) => setForm((f) => ({ ...f, branch: e.target.value })),
              placeholder: "Main Store",
              className: "h-7 text-xs",
              "data-ocid": "product.location-pricing.branch.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1", children: "Price *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: form.price,
              onChange: (e) => setForm((f) => ({ ...f, price: e.target.value })),
              placeholder: "450",
              className: "h-7 text-xs",
              "data-ocid": "product.location-pricing.price.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "h-7 px-3 text-xs",
            onClick: handleAdd,
            disabled: setPrice.isPending,
            "data-ocid": "product.location-pricing.save_button",
            children: setPrice.isPending ? "Saving…" : "Save"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-7 px-3 text-xs",
            onClick: () => setAdding(false),
            "data-ocid": "product.location-pricing.cancel_button",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted animate-pulse rounded-lg" }, i)) }) : prices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic py-2", children: "No location-specific prices set. Base rate applies everywhere." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 pr-2 font-medium", children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 pr-2 font-medium", children: "Branch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-1.5 pr-2 font-medium", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-1.5 font-medium", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: prices.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/40",
          "data-ocid": `product.location-pricing.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-medium", children: String(p.city ?? "—") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-muted-foreground", children: String(p.branch ?? "—") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1.5 pr-2 text-right tabular-nums font-semibold", children: [
              "₹",
              String(p.price ?? 0)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Delete location price",
                className: "p-1 rounded hover:bg-destructive/10 text-destructive",
                onClick: async () => {
                  try {
                    await deletePrice.mutateAsync({
                      productId,
                      city: String(p.city ?? ""),
                      branch: String(p.branch ?? "")
                    });
                    ue.success("Location price deleted");
                    refetch();
                  } catch {
                    ue.error("Failed to delete");
                  }
                },
                "data-ocid": `product.location-pricing.delete_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            ) })
          ]
        },
        String(p.id ?? idx)
      )) })
    ] }) })
  ] });
}
function ProductDetailSheet({
  product,
  onClose
}) {
  if (!product) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!product, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-md overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: product.title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 rounded-xl overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductImage, { urls: product.imageUrls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
        { label: "Product ID", value: product.id },
        { label: "Merchant ID", value: product.merchantId },
        {
          label: "Base Rate",
          value: `₹${product.baseRate.toLocaleString("en-IN")}`
        },
        {
          label: "Discount",
          value: product.specialDiscount > 0 ? `${product.specialDiscount}%` : "None"
        },
        {
          label: "Condition",
          value: product.isNew ? "New" : "Refurbished"
        },
        {
          label: "Status",
          value: product.isActive ? "Active" : "Inactive"
        },
        ...product.qty !== void 0 && product.qty !== null && product.qty !== 0n ? [
          {
            label: "Qty Available",
            value: String(Number(product.qty))
          }
        ] : [],
        ...product.packing ? [{ label: "Packing / Size", value: product.packing }] : [],
        ...product.expiry ? [{ label: "Expiry", value: product.expiry }] : []
      ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mt-0.5", children: value })
      ] }, label)) }),
      product.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: product.description })
      ] }),
      product.bulkRates && product.bulkRates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Bulk Rates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: product.bulkRates.map((br) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm p-2.5 bg-muted/20 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "Min ",
                Number(br.minQuantity),
                " units"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "₹",
                br.rate,
                "/unit"
              ] })
            ]
          },
          `${Number(br.minQuantity)}-${br.rate}`
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LocationPricingSection, { productId: product.id })
    ] })
  ] }) });
}
function ManualProductTab({
  merchantId,
  onClose
}) {
  const addProduct = useAddProduct();
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    baseRate: "",
    specialDiscount: "0",
    isNew: true,
    imageUrls: "",
    bulkRates: [],
    qty: "",
    packing: "",
    expiry: ""
  });
  function addBulkRow() {
    setForm((f) => ({
      ...f,
      bulkRates: [
        ...f.bulkRates,
        { id: `br-${Date.now()}`, minQty: "", rate: "" }
      ]
    }));
  }
  function removeBulkRow(id) {
    setForm((f) => ({
      ...f,
      bulkRates: f.bulkRates.filter((r) => r.id !== id)
    }));
  }
  function updateBulkRow(id, field, value) {
    setForm((f) => ({
      ...f,
      bulkRates: f.bulkRates.map(
        (r) => r.id === id ? { ...r, [field]: value } : r
      )
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!merchantId) {
      ue.error("Please select a merchant first");
      return;
    }
    if (!form.title || !form.baseRate) {
      ue.error("Product title and base rate are required");
      return;
    }
    try {
      const imageUrls = form.imageUrls.split("\n").map((u) => u.trim()).filter(Boolean);
      await addProduct.mutateAsync({
        merchantId,
        title: form.title,
        description: form.description,
        imageUrls,
        isNew: form.isNew,
        baseRate: Number.parseFloat(form.baseRate) || 0,
        specialDiscount: Number.parseFloat(form.specialDiscount) || 0,
        qty: form.qty ? BigInt(Number.parseInt(form.qty, 10)) : void 0,
        packing: form.packing || void 0,
        expiry: form.expiry || void 0
      });
      ue.success("Product added successfully");
      onClose();
    } catch {
      ue.error("Failed to add product");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Product Title *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "title",
          required: true,
          value: form.title,
          onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
          placeholder: "e.g. Basmati Rice 5kg",
          "data-ocid": "product-form-title"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "description",
          value: form.description,
          onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
          placeholder: "Describe the product…",
          rows: 2,
          "data-ocid": "product-form-description"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "baseRate", children: "Base Rate (₹) *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "baseRate",
            required: true,
            type: "number",
            min: "0",
            value: form.baseRate,
            onChange: (e) => setForm((f) => ({ ...f, baseRate: e.target.value })),
            placeholder: "0",
            "data-ocid": "product-form-base-rate"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "discount", children: "Special Discount (%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "discount",
            type: "number",
            min: "0",
            max: "100",
            value: form.specialDiscount,
            onChange: (e) => setForm((f) => ({ ...f, specialDiscount: e.target.value })),
            placeholder: "0",
            "data-ocid": "product-form-discount"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "qty", children: "Qty Available" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "qty",
            type: "number",
            min: "0",
            value: form.qty,
            onChange: (e) => setForm((f) => ({ ...f, qty: e.target.value })),
            placeholder: "e.g. 50",
            "data-ocid": "product-form-qty"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "packing", children: "Packing / Size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "packing",
            value: form.packing,
            onChange: (e) => setForm((f) => ({ ...f, packing: e.target.value })),
            placeholder: "e.g. 500ml, 1kg",
            "data-ocid": "product-form-packing"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "expiry", children: "Expiry Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "expiry",
            value: form.expiry,
            onChange: (e) => setForm((f) => ({ ...f, expiry: e.target.value })),
            placeholder: "e.g. Dec 2025",
            "data-ocid": "product-form-expiry"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "imageUrls", children: "Image URLs (one per line)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "imageUrls",
          value: form.imageUrls,
          onChange: (e) => setForm((f) => ({ ...f, imageUrls: e.target.value })),
          placeholder: "https://…",
          rows: 2,
          "data-ocid": "product-form-images"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          checked: form.isNew,
          onCheckedChange: (v) => setForm((f) => ({ ...f, isNew: v })),
          id: "isNew",
          "data-ocid": "product-form-condition"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "isNew", children: "New condition (uncheck for refurbished)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bulk Rates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            onClick: addBulkRow,
            className: "gap-1 h-7 text-xs",
            "data-ocid": "product-form-add-bulk",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
              " Add Row"
            ]
          }
        )
      ] }),
      form.bulkRates.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            placeholder: "Min qty",
            value: row.minQty,
            onChange: (e) => updateBulkRow(row.id, "minQty", e.target.value),
            className: "flex-1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            placeholder: "Rate (₹)",
            value: row.rate,
            onChange: (e) => updateBulkRow(row.id, "rate", e.target.value),
            className: "flex-1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: () => removeBulkRow(row.id),
            className: "p-1 h-8 w-8",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-destructive" })
          }
        )
      ] }, row.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "flex-1",
          disabled: addProduct.isPending,
          "data-ocid": "product-form-submit",
          children: addProduct.isPending ? "Adding…" : "Save Product"
        }
      )
    ] })
  ] });
}
function ExcelUploadTab({
  merchantId,
  onClose
}) {
  const addProductsBulk = useAddProductsBulk();
  const fileRef = reactExports.useRef(null);
  const [parsedRows, setParsedRows] = reactExports.useState([]);
  const [fileName, setFileName] = reactExports.useState("");
  const [parseError, setParseError] = reactExports.useState("");
  function downloadTemplate() {
    const headers = "name,description,imageUrl,rate,bulkRate,bulkQuantity,condition,specialDiscount,youtubeLink";
    const sample = "Basmati Rice 5kg,Premium long grain rice,https://example.com/rice.jpg,299,249,10,new,5,";
    const sample2 = "Toor Dal 1kg,High quality toor dal,https://example.com/dal.jpg,120,100,20,new,0,";
    const csv = `${headers}
${sample}
${sample2}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product-upload-template.csv";
    a.click();
    URL.revokeObjectURL(url);
    ue.success("Template downloaded — fill in the CSV and upload it");
  }
  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return [];
    const dataLines = lines.slice(1);
    return dataLines.map((line) => {
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
        youtubeLink: (cols[8] ?? "").trim()
      };
    }).filter((r) => r.title && r.rate > 0);
  }
  function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setParseError("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      var _a2;
      try {
        const text = (_a2 = evt.target) == null ? void 0 : _a2.result;
        const rows = parseCSV(text);
        if (rows.length === 0) {
          setParseError(
            "No valid rows found. Make sure the file matches the template format."
          );
          setParsedRows([]);
        } else {
          setParsedRows(rows);
          ue.success(`Parsed ${rows.length} products — review and import`);
        }
      } catch {
        setParseError("Failed to parse file. Please use the template format.");
        setParsedRows([]);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }
  async function handleImport() {
    if (!merchantId) {
      ue.error("Please select a merchant first");
      return;
    }
    if (parsedRows.length === 0) {
      ue.error("No products to import");
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
        bulkRates: r.bulkRate > 0 && r.bulkQuantity > 0 ? [{ minQuantity: BigInt(r.bulkQuantity), rate: r.bulkRate }] : [],
        videoUrl: r.youtubeLink || void 0
      }));
      await addProductsBulk.mutateAsync({ merchantId, products });
      ue.success(`${products.length} products imported successfully`);
      onClose();
    } catch {
      ue.error("Failed to import products");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "1" }),
        "Download the CSV template"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-7", children: "Fill in your product details using the template format, then upload the completed file below." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2 ml-7",
          onClick: downloadTemplate,
          "data-ocid": "product-excel-download-template",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
            "Download Template (CSV)"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "2" }),
        "Upload completed CSV / Excel file"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: ".csv,.xlsx,.xls,.txt",
          className: "hidden",
          onChange: handleFile,
          "data-ocid": "product-excel-upload-input",
          "aria-label": "Upload product CSV file"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            var _a;
            return (_a = fileRef.current) == null ? void 0 : _a.click();
          },
          className: "ml-7 flex items-center gap-3 w-full border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 hover:bg-muted/20 transition-colors text-left",
          "data-ocid": "product-excel-upload-dropzone",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-8 h-8 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: fileName || "Choose CSV or Excel file" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: fileName ? "Click to replace" : "Supports .csv, .xlsx, .xls files" })
            ] })
          ]
        }
      ),
      parseError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1 ml-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
        " ",
        parseError
      ] })
    ] }),
    parsedRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold", children: "3" }),
        "Preview — ",
        parsedRows.length,
        " products ready to import"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-48 overflow-y-auto border border-border rounded-xl ml-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 font-medium text-muted-foreground", children: "Rate (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 font-medium text-muted-foreground", children: "Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground", children: "Condition" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: parsedRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-t border-border/50 hover:bg-muted/20",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium max-w-[150px] truncate", children: row.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-right tabular-nums", children: [
                "₹",
                row.rate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums text-muted-foreground", children: row.specialDiscount > 0 ? `${row.specialDiscount}%` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 capitalize text-muted-foreground", children: row.condition })
            ]
          },
          `${row.title}-${row.rate}`
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "flex-1",
            onClick: onClose,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            className: "flex-1 gap-2",
            onClick: handleImport,
            disabled: addProductsBulk.isPending,
            "data-ocid": "product-excel-import-button",
            children: addProductsBulk.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 border border-primary-foreground border-t-transparent rounded-full animate-spin" }),
              "Importing…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
              "Import ",
              parsedRows.length,
              " Products"
            ] })
          }
        )
      ] })
    ] }),
    parsedRows.length === 0 && !parseError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        className: "flex-1",
        onClick: onClose,
        children: "Cancel"
      }
    ) })
  ] });
}
function PhotoMenuTab({
  merchantId,
  onClose
}) {
  const fileRef = reactExports.useRef(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState("");
  const [fileName, setFileName] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setFileName(file.name);
    setSaved(false);
    const reader = new FileReader();
    reader.onload = (evt) => {
      var _a2;
      setPreviewUrl((_a2 = evt.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  async function handleSave() {
    if (!merchantId) {
      ue.error("Please select a merchant first");
      return;
    }
    if (!previewUrl) {
      ue.error("Please select a photo menu image first");
      return;
    }
    setSaving(true);
    try {
      ue.info(
        "Photo parsing is not yet available. Please use Manual Entry or Excel Upload to add your products.",
        { duration: 6e3 }
      );
      setSaved(false);
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload a photo of your full menu (e.g. a handwritten or printed menu board). Customers will see this when browsing your store." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFile,
        "data-ocid": "product-photo-menu-upload-input",
        "aria-label": "Upload photo menu"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        className: "w-full border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 hover:bg-muted/20 transition-colors text-center",
        "data-ocid": "product-photo-menu-dropzone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: fileName || "Choose menu photo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: fileName ? "Click to replace" : "JPG, PNG, WebP — max 10MB" })
        ]
      }
    ),
    previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-border max-h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: previewUrl,
          alt: "Menu preview",
          className: "w-full object-contain"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          className: "flex-1 gap-2",
          onClick: handleSave,
          disabled: !previewUrl || saving || saved,
          "data-ocid": "product-photo-menu-save-button",
          children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 border border-primary-foreground border-t-transparent rounded-full animate-spin" }),
            "Saving…"
          ] }) : saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
            "Saved"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
            "Save Photo Menu"
          ] })
        }
      )
    ] })
  ] });
}
function AddProductModal({ onClose }) {
  const { data: merchants = [] } = useMerchants();
  const [merchantId, setMerchantId] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("manual");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add Products" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "merchant-select", children: "Select Merchant *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: merchantId, onValueChange: setMerchantId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            id: "merchant-select",
            "data-ocid": "product-form-merchant",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a merchant" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: merchants.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id, children: m.businessName }, m.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "manual",
            className: "text-xs gap-1",
            "data-ocid": "product-tab-manual",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
              " Manual"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "excel",
            className: "text-xs gap-1",
            "data-ocid": "product-tab-excel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-3 h-3" }),
              " Excel"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "photo",
            className: "text-xs gap-1",
            "data-ocid": "product-tab-photo",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
              " Photo Menu"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "manual", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ManualProductTab, { merchantId, onClose }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "excel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExcelUploadTab, { merchantId, onClose }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "photo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoMenuTab, { merchantId, onClose }) })
    ] })
  ] }) });
}
function ProductCard({
  product,
  merchantName,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full text-left bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-md transition-all group",
      "data-ocid": "products-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-36 overflow-hidden bg-muted relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductImage, { urls: product.imageUrls }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex gap-1 flex-wrap justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "boolean", value: product.isActive }),
            product.specialDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-emerald-100 text-emerald-700 border-emerald-200", children: [
              product.specialDiscount,
              "% off"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: merchantName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-bold text-foreground", children: [
              "₹",
              product.baseRate.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              product.packing && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground", children: product.packing }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground capitalize", children: product.isNew ? "New" : "Refurbished" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceUniformityBadge, { productId: product.id }),
          (product.expiry || product.qty !== void 0 && product.qty !== 0n) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            product.qty !== void 0 && product.qty !== 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              "Qty: ",
              Number(product.qty)
            ] }),
            product.expiry && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              "Exp: ",
              product.expiry
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ProductsPage() {
  const [searchInput, setSearchInput] = reactExports.useState("");
  const search = useDebounce(searchInput, 300);
  const [merchantFilter, setMerchantFilter] = reactExports.useState("all");
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [detailProduct, setDetailProduct] = reactExports.useState(null);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const merchantIdForQuery = merchantFilter !== "all" ? merchantFilter : void 0;
  const {
    data: products = [],
    isLoading,
    refetch
  } = useProducts(merchantIdForQuery);
  const { data: merchants = [] } = useMerchants();
  const merchantMap = reactExports.useMemo(() => {
    const m = {};
    for (const merchant of merchants) m[merchant.id] = merchant.businessName;
    return m;
  }, [merchants]);
  const filtered = reactExports.useMemo(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          products.length,
          " products",
          merchantFilter !== "all" ? ` for ${merchantMap[merchantFilter] ?? merchantFilter}` : " across all merchants",
          filtered.length !== products.length && ` · ${filtered.length} matching filters`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAddModal(true),
          className: "gap-2",
          "data-ocid": "products-add-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Add Product"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: searchInput,
            onChange: (e) => {
              setSearchInput(e.target.value);
              pagination.resetPage();
            },
            className: "pl-9",
            placeholder: "Search products…",
            "data-ocid": "products-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: merchantFilter,
          onValueChange: (v) => {
            setMerchantFilter(v);
            pagination.resetPage();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-48",
                "data-ocid": "products-filter-merchant",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Merchants" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Merchants" }),
              merchants.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id, children: m.businessName }, m.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: activeFilter,
          onValueChange: (v) => {
            setActiveFilter(v);
            pagination.resetPage();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-36",
                "data-ocid": "products-filter-status",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" })
            ] })
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: Array.from({ length: 8 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 bg-muted animate-pulse rounded-2xl" }, id)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-3 text-center",
        "data-ocid": "products-empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: merchantFilter !== "all" ? "No products yet for this merchant" : "No products match your filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => setShowAddModal(true),
              size: "sm",
              variant: "outline",
              "data-ocid": "products-empty-add",
              children: "Add First Product"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: pagination.items.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductCard,
        {
          product,
          merchantName: merchantMap[product.merchantId] ?? product.merchantId,
          onClick: () => setDetailProduct(product)
        },
        product.id
      )) }),
      pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between pt-2",
          "data-ocid": "products.pagination",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Page ",
              pagination.page,
              " of ",
              pagination.totalPages,
              " ·",
              " ",
              filtered.length,
              " products"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-8 w-8 p-0",
                  onClick: pagination.prevPage,
                  disabled: pagination.page === 1,
                  "data-ocid": "products.pagination_prev",
                  "aria-label": "Previous page",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
                }
              ),
              Array.from(
                { length: Math.min(pagination.totalPages, 7) },
                (_, i) => {
                  const start = Math.max(1, pagination.page - 3);
                  const p = start + i;
                  if (p > pagination.totalPages) return null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: p === pagination.page ? "default" : "outline",
                      className: "h-8 w-8 p-0 text-xs",
                      onClick: () => pagination.goToPage(p),
                      "data-ocid": `products.pagination.page.${p}`,
                      children: p
                    },
                    p
                  );
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-8 w-8 p-0",
                  onClick: pagination.nextPage,
                  disabled: pagination.page === pagination.totalPages,
                  "data-ocid": "products.pagination_next",
                  "aria-label": "Next page",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductDetailSheet,
      {
        product: detailProduct,
        onClose: () => setDetailProduct(null)
      }
    ),
    showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddProductModal,
      {
        onClose: () => {
          setShowAddModal(false);
          void refetch();
        }
      }
    )
  ] });
}
export {
  ProductsPage as default
};
