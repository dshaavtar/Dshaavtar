import { r as reactExports, D as useMerchants, ex as useGetManufacturerProductsForMerchant, ey as usePlaceManufacturerOrder, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { P as Package } from "./package-CosknzeL.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { T as Tag } from "./tag-DM1LGoN5.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { B as Building2 } from "./building-2-B0h7D8pK.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
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
const CATEGORIES = [
  "All Categories",
  "Food & Beverages",
  "Electronics",
  "Clothing & Apparel",
  "Healthcare",
  "Agriculture",
  "Chemicals",
  "Plastics",
  "Machinery",
  "Automobiles",
  "Construction",
  "Textiles",
  "Other"
];
function normalizeProduct(raw) {
  const tiers = Array.isArray(raw.bulkPricingTiers) ? raw.bulkPricingTiers.map((t) => ({
    minQty: Number(t.minQty ?? 1),
    maxQty: Number(t.maxQty ?? 50),
    pricePerUnit: Number(t.pricePerUnit ?? 0)
  })) : [];
  return {
    id: String(raw.id ?? ""),
    productName: String(raw.productName ?? ""),
    manufacturerName: String(raw.manufacturerName ?? raw.manufacturerId ?? ""),
    manufacturerId: String(raw.manufacturerId ?? ""),
    originCity: String(raw.originCity ?? ""),
    batchCode: raw.batchCode ? String(raw.batchCode) : null,
    hsnCode: raw.hsnCode ? String(raw.hsnCode) : null,
    expiryDate: raw.expiryDate ? String(raw.expiryDate) : null,
    priceToDistributor: Number(raw.priceToDistributor ?? 0),
    priceToCustomer: Number(raw.priceToCustomer ?? 0),
    bulkPricingTiers: tiers,
    isB2B: !!(raw.isB2B ?? raw.isReturnable),
    category: String(raw.category ?? "Other"),
    stockQty: Number(raw.stockQty ?? 0)
  };
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" })
  ] });
}
function BulkPricingTable({ tiers }) {
  if (!tiers || tiers.length === 0) return null;
  const labels = ["1–50 units", "51–100 units", "100+ units"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-1.5 text-left font-medium text-muted-foreground", children: "Qty Range" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-1.5 text-right font-medium text-muted-foreground", children: "Price / Unit" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: tiers.map((tier, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-t border-border/50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 text-foreground", children: labels[i] ?? `${Number(tier.minQty)}–${Number(tier.maxQty)} units` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-1.5 text-right font-semibold text-primary", children: [
            "₹",
            tier.pricePerUnit.toFixed(2)
          ] })
        ]
      },
      `tier-${i}-${tier.minQty}`
    )) })
  ] }) });
}
function ProductCard({
  product,
  onOrder,
  isOrdering
}) {
  const [qty, setQty] = reactExports.useState(1);
  const effectivePrice = () => {
    if (!product.bulkPricingTiers || product.bulkPricingTiers.length === 0) {
      return product.priceToDistributor;
    }
    for (const tier of product.bulkPricingTiers) {
      if (qty >= Number(tier.minQty) && qty <= Number(tier.maxQty)) {
        return tier.pricePerUnit;
      }
    }
    return product.priceToDistributor;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "mfg_product.card",
      className: "bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate", children: product.productName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: product.manufacturerName || "Unknown Manufacturer" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
            product.isB2B && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "B2B" }),
            product.category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: product.category })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1 text-xs", children: [
          product.originCity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Origin:" }),
            " ",
            product.originCity
          ] }),
          product.batchCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Batch:" }),
            " ",
            product.batchCode
          ] }),
          product.hsnCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "HSN:" }),
            " ",
            product.hsnCode
          ] }),
          product.expiryDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Expiry:" }),
            " ",
            product.expiryDate
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Distributor price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground", children: [
              "₹",
              product.priceToDistributor.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "MRP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
              "₹",
              product.priceToCustomer.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BulkPricingTable, { tiers: product.bulkPricingTiers ?? [] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-input rounded-md overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "px-2 py-1 text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors",
                onClick: () => setQty((q) => Math.max(1, q - 1)),
                "data-ocid": "mfg_product.qty_decrease",
                children: "−"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: 1,
                value: qty,
                onChange: (e) => setQty(Math.max(1, Number.parseInt(e.target.value) || 1)),
                className: "w-14 text-center text-sm bg-background border-x border-input py-1 focus:outline-none text-foreground",
                "data-ocid": "mfg_product.qty_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "px-2 py-1 text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors",
                onClick: () => setQty((q) => q + 1),
                "data-ocid": "mfg_product.qty_increase",
                children: "+"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-xs text-muted-foreground", children: [
            "Total:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              "₹",
              (effectivePrice() * qty).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => onOrder(product.id, qty, product),
              disabled: isOrdering,
              "data-ocid": "mfg_product.add_to_order_button",
              className: "shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Add to Order"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function MerchantManufacturerProductsPage() {
  var _a;
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All Categories");
  const { data: merchants } = useMerchants();
  const merchantPhone = Array.isArray(merchants) && merchants.length > 0 ? String(
    ((_a = merchants[0]) == null ? void 0 : _a.phone) ?? ""
  ) : "";
  const {
    data: rawProducts,
    isLoading,
    isError,
    refetch
  } = useGetManufacturerProductsForMerchant(merchantPhone);
  const placeOrder = usePlaceManufacturerOrder();
  const products = (Array.isArray(rawProducts) ? rawProducts : []).map((p) => normalizeProduct(p)).filter((p) => !!p.productName);
  const filtered = products.filter((p) => {
    const matchSearch = search === "" || p.productName.toLowerCase().includes(search.toLowerCase()) || (p.manufacturerName ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All Categories" || p.category === category;
    return matchSearch && matchCategory;
  });
  const handleOrder = (productId, qty, product) => {
    placeOrder.mutate(
      {
        productId,
        merchantPhone,
        quantity: qty,
        pricePerUnit: product.priceToDistributor
      },
      {
        onSuccess: () => ue.success(`Order placed for ${qty}× ${product.productName}`),
        onError: (err) => ue.error(
          `Order failed: ${err instanceof Error ? err.message : String(err)}`
        )
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Browse Manufacturer Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Products available through your registered distributor networks" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col sm:flex-row gap-3",
        "data-ocid": "mfg_products.filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by product name or manufacturer…",
                className: "pl-9",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                "data-ocid": "mfg_products.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              SelectTrigger,
              {
                className: "w-full sm:w-52",
                "data-ocid": "mfg_products.category_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 mr-1.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
          ] })
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "mfg_products.loading_state",
        children: Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, sk))
      }
    ),
    isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-4",
        "data-ocid": "mfg_products.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-10 w-10 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Failed to load products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => void refetch(),
              "data-ocid": "mfg_products.retry_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 mr-2" }),
                "Retry"
              ]
            }
          )
        ]
      }
    ),
    !isLoading && !isError && products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
        "data-ocid": "mfg_products.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground", children: "No products available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mt-1", children: "You are not registered in any manufacturer distributor network. Contact a manufacturer to get a distributor code." })
          ] })
        ]
      }
    ),
    !isLoading && !isError && products.length > 0 && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "mfg_products.no_results_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No products match your filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setSearch("");
                setCategory("All Categories");
              },
              children: "Clear filters"
            }
          )
        ]
      }
    ),
    !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Showing ",
        filtered.length,
        " of ",
        products.length,
        " product",
        products.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "mfg_products.list",
          children: filtered.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": `mfg_products.item.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProductCard,
                {
                  product,
                  onOrder: handleOrder,
                  isOrdering: placeOrder.isPending
                }
              )
            },
            product.id || idx
          ))
        }
      )
    ] })
  ] });
}
export {
  MerchantManufacturerProductsPage as default
};
