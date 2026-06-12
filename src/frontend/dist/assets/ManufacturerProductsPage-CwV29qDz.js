import { ef as useManufacturerByUser, eg as useManufacturerProducts, en as useAddManufacturerProduct, eo as useDiscontinueProduct, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Checkbox } from "./checkbox-DuAbI53w.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, f as DialogFooter } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { P as Package } from "./package-CosknzeL.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { M as Mail } from "./mail-HmwVVC70.js";
import { P as Plus } from "./plus-ty49Yili.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CUcO6jhF.js";
import "./index-z5OST4d2.js";
import "./index-BNXq-E6T.js";
import "./check-CO9wi49t.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./index-CmjKy1Fn.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./x-Chksmd6i.js";
import "./index-BtrS4JsN.js";
const EMPTY_FORM = {
  productName: "",
  batchNumber: "",
  expiryDate: "",
  priceToDistributor: "",
  priceToCustomer: "",
  stockQty: "",
  originCity: "",
  hsnCode: "",
  batchCode: "",
  isB2B: false,
  isReturnable: false,
  isDiscontinued: false,
  bulkTier1Price: "",
  bulkTier2Price: "",
  bulkTier3Price: ""
};
function ManufacturerProductsPage() {
  const { data: profileRaw } = useManufacturerByUser();
  const profile = profileRaw;
  const { data: productsRaw = [], isLoading } = useManufacturerProducts();
  const products = productsRaw;
  const addMutation = useAddManufacturerProduct();
  const discontinueMutation = useDiscontinueProduct();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [showFilter, setShowFilter] = reactExports.useState("active");
  const [manufactureDatePreset, setManufactureDatePreset] = reactExports.useState("");
  const [hasExpiryDate, setHasExpiryDate] = reactExports.useState(false);
  function field(key) {
    const v = form[key];
    return {
      value: typeof v === "boolean" ? String(v) : v,
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
    };
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.productName || !form.batchNumber) {
      ue.error("Please fill all required fields");
      return;
    }
    try {
      if (!profile) {
        ue.error("Manufacturer profile not loaded");
        return;
      }
      const manufactureDateMs = manufactureDatePreset === "1week" ? Date.now() - 7 * 864e5 : manufactureDatePreset === "1month" ? Date.now() - 30 * 864e5 : manufactureDatePreset === "1year" ? Date.now() - 365 * 864e5 : Date.now();
      const manufactureDateBigInt = BigInt(Math.floor(manufactureDateMs)) * 1000000n;
      const expiryDateStr = hasExpiryDate && form.expiryDate ? form.expiryDate : null;
      const t1 = Number(form.bulkTier1Price);
      const t2 = Number(form.bulkTier2Price);
      const t3 = Number(form.bulkTier3Price);
      const bulkTiers = t1 > 0 || t2 > 0 || t3 > 0 ? [
        { minQty: 1n, maxQty: 50n, pricePerUnit: t1 },
        { minQty: 51n, maxQty: 100n, pricePerUnit: t2 },
        { minQty: 101n, maxQty: 999999n, pricePerUnit: t3 }
      ] : [];
      await addMutation.mutateAsync({
        manufacturerId: profile.id,
        productName: form.productName,
        batchNumber: form.batchNumber,
        hsnCode: form.hsnCode || null,
        batchCode: form.batchCode || null,
        manufactureDate: manufactureDateBigInt,
        expiryDate: expiryDateStr,
        priceToDistributor: Number(form.priceToDistributor),
        priceToCustomer: Number(form.priceToCustomer),
        bulkPricingTiers: bulkTiers,
        isReturnable: form.isReturnable,
        stockQty: BigInt(Number(form.stockQty)),
        originCity: form.originCity
      });
      ue.success("Product added!");
      setDialogOpen(false);
      setForm({ ...EMPTY_FORM });
      setManufactureDatePreset("");
      setHasExpiryDate(false);
    } catch (err) {
      ue.error(`Failed: ${String(err)}`);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "manufacturer.products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }),
          "Manufacturer Products"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mt-1", children: ["active", "all"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowFilter(f),
            className: `px-2.5 py-0.5 rounded text-xs font-medium capitalize transition-colors ${showFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `manufacturer.products.filter.${f}`,
            children: f === "active" ? "Active" : "All"
          },
          f
        )) }),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
            profile.customerCarePhone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
            profile.customerCareEmail
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setDialogOpen(true),
          "data-ocid": "manufacturer.products.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            " Add Product"
          ]
        }
      )
    ] }),
    profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 flex flex-wrap items-center gap-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Customer Care:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `tel:${profile.customerCarePhone}`,
          className: "flex items-center gap-1 text-primary hover:underline",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
            profile.customerCarePhone
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `mailto:${profile.customerCareEmail}`,
          className: "flex items-center gap-1 text-primary hover:underline",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
            profile.customerCareEmail
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, n)) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-3",
        "data-ocid": "manufacturer.products.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No products yet. Add your first product." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "Product",
        "Batch",
        "Origin City",
        "Mfg. Date",
        "Expiry",
        "Dist. Price",
        "Cust. Price",
        "Stock",
        "Status",
        "Action"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: products.filter(
        (p) => showFilter === "active" ? !p.isDiscontinued : true
      ).map((p, i) => {
        var _a, _b;
        const mfgMs = Number(p.manufactureDate) / 1e6;
        const daysAgo = Math.floor((Date.now() - mfgMs) / 864e5);
        const mfgLabel = daysAgo < 30 ? `${daysAgo}d ago` : `${Math.floor(daysAgo / 30)}mo ago`;
        const expStr = ((_a = p.expiryDate) == null ? void 0 : _a[0]) ? new Date(
          Number(p.expiryDate[0]) / 1e6
        ).toLocaleDateString() : "No expiry";
        const soon = ((_b = p.expiryDate) == null ? void 0 : _b[0]) ? Number(p.expiryDate[0]) / 1e6 <= Date.now() + 30 * 864e5 : false;
        const pAny = p;
        const discontinued = Boolean(pAny.isDiscontinued);
        const hsnCode = pAny.hsnCode;
        const b2bCode = pAny.b2bCode;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `hover:bg-muted/20 transition-colors ${discontinued ? "opacity-60" : ""}`,
            "data-ocid": `manufacturer.products.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.productName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
                  b2bCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-amber-500/10 text-amber-600 border-amber-500/30", children: [
                    "B2B: ",
                    b2bCode
                  ] }),
                  hsnCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "HSN: ",
                    hsnCode
                  ] }),
                  discontinued && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "destructive",
                      className: "text-xs",
                      children: "Discontinued"
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground font-mono text-xs", children: p.batchNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: p.originCity || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground text-xs", children: mfgLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium ${soon ? "text-orange-500" : "text-muted-foreground"}`,
                  children: expStr
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-right", children: [
                "₹",
                p.priceToDistributor.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-right", children: [
                "₹",
                p.priceToCustomer.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: Number(p.stockQty) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: discontinued ? "destructive" : Number(p.stockQty) > 0 ? "outline" : "secondary",
                  className: "text-xs",
                  children: discontinued ? "Discontinued" : Number(p.stockQty) > 0 ? "In Stock" : "Out of Stock"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: !discontinued && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-xs text-red-600 border-red-500/30 hover:bg-red-500/10",
                  disabled: discontinueMutation.isPending,
                  onClick: async () => {
                    if (!profile) return;
                    try {
                      await discontinueMutation.mutateAsync({
                        productId: p.id,
                        manufacturerId: profile.id
                      });
                      ue.success("Product discontinued");
                    } catch (err) {
                      ue.error(`Failed: ${String(err)}`);
                    }
                  },
                  "data-ocid": `manufacturer.products.discontinue_button.${i + 1}`,
                  children: "Discontinue"
                }
              ) })
            ]
          },
          p.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-md",
        "data-ocid": "manufacturer.products.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Product" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. Turmeric Powder 500g",
                  ...field("productName"),
                  "data-ocid": "manufacturer.products.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Batch Number *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "BATCH-001",
                    ...field("batchNumber"),
                    "data-ocid": "manufacturer.products.batch_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Origin City" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. Mumbai, Delhi",
                    ...field("originCity"),
                    "data-ocid": "manufacturer.products.origin_city_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Manufacture Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [
                { key: "1week", label: "1 Week Ago" },
                { key: "1month", label: "1 Month Ago" },
                { key: "1year", label: "1 Year Ago" }
              ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: manufactureDatePreset === opt.key ? "default" : "outline",
                  size: "sm",
                  onClick: () => setManufactureDatePreset(opt.key),
                  "data-ocid": `manufacturer.products.mfg_${opt.key}_button`,
                  children: opt.label
                },
                opt.key
              )) }),
              manufactureDatePreset && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Selected:",
                " ",
                new Date(
                  manufactureDatePreset === "1week" ? Date.now() - 7 * 864e5 : manufactureDatePreset === "1month" ? Date.now() - 30 * 864e5 : Date.now() - 365 * 864e5
                ).toLocaleDateString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: "hasExpiry",
                  checked: hasExpiryDate,
                  onCheckedChange: (v) => setHasExpiryDate(Boolean(v)),
                  "data-ocid": "manufacturer.products.has_expiry_checkbox"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hasExpiry", className: "cursor-pointer", children: "Product has an expiry date" })
            ] }),
            hasExpiryDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expiry Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  ...field("expiryDate"),
                  "data-ocid": "manufacturer.products.expiry_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price to Distributor (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: "0",
                    placeholder: "0",
                    ...field("priceToDistributor"),
                    "data-ocid": "manufacturer.products.dist_price_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price to Customer (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: "0",
                    placeholder: "0",
                    ...field("priceToCustomer"),
                    "data-ocid": "manufacturer.products.cust_price_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Stock Quantity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  placeholder: "0",
                  ...field("stockQty"),
                  "data-ocid": "manufacturer.products.stock_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "HSN Code (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. 0910",
                    value: form.hsnCode,
                    onChange: (e) => setForm((f) => ({ ...f, hsnCode: e.target.value })),
                    "data-ocid": "manufacturer.products.hsn_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Batch Code (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. BC-2024",
                    value: form.batchCode,
                    onChange: (e) => setForm((f) => ({ ...f, batchCode: e.target.value })),
                    "data-ocid": "manufacturer.products.batch_code_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: "isB2B",
                  checked: form.isB2B,
                  onCheckedChange: (v) => setForm((f) => ({ ...f, isB2B: Boolean(v) })),
                  "data-ocid": "manufacturer.products.b2b_checkbox"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "isB2B", className: "cursor-pointer", children: "B2B Product" })
            ] }),
            form.isB2B && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: "isReturnable",
                  checked: form.isReturnable,
                  onCheckedChange: (v) => setForm((f) => ({ ...f, isReturnable: Boolean(v) })),
                  "data-ocid": "manufacturer.products.returnable_checkbox"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "isReturnable", className: "cursor-pointer", children: "Returnable / Exchangeable" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Bulk Pricing Tiers (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-20", children: "Qty 1–50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: "0",
                      placeholder: "Price per unit",
                      value: form.bulkTier1Price,
                      onChange: (e) => setForm((f) => ({ ...f, bulkTier1Price: e.target.value })),
                      "data-ocid": "manufacturer.products.bulk_tier1_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-20", children: "Qty 51–100" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: "0",
                      placeholder: "Price per unit",
                      value: form.bulkTier2Price,
                      onChange: (e) => setForm((f) => ({ ...f, bulkTier2Price: e.target.value })),
                      "data-ocid": "manufacturer.products.bulk_tier2_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-20", children: "Qty 100+" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: "0",
                      placeholder: "Price per unit",
                      value: form.bulkTier3Price,
                      onChange: (e) => setForm((f) => ({ ...f, bulkTier3Price: e.target.value })),
                      "data-ocid": "manufacturer.products.bulk_tier3_input"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setDialogOpen(false),
                  "data-ocid": "manufacturer.products.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: addMutation.isPending,
                  "data-ocid": "manufacturer.products.submit_button",
                  children: addMutation.isPending ? "Adding…" : "Add Product"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  ManufacturerProductsPage as default
};
