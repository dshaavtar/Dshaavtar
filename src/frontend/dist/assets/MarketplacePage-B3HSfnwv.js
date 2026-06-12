import { r as reactExports, h as useMarketplaceItems, j as jsxRuntimeExports, cE as useDeactivateMarketplaceItem, cF as useUserListings, bS as useCreateMarketplaceItem, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Dx8tJeYi.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C1kYAn3i.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { S as ShoppingBag } from "./shopping-bag-DlKZ3RXf.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
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
  "Electronics",
  "Vehicle",
  "Utensils",
  "Clothing",
  "Furniture",
  "Kitchen Equipment",
  "Equipment"
];
const STATUS_FILTERS = ["all", "active", "inactive"];
const LISTING_TYPES = ["all", "sale", "rent"];
function formatDate(ts) {
  const ms = typeof ts === "bigint" ? Number(ts) : ts;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function ListingTypeBadge({ type }) {
  const isSale = type === "sale" || type === "For Sale";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: isSale ? "border-blue-400 text-blue-600 bg-blue-50" : "border-amber-400 text-amber-600 bg-amber-50",
      children: isSale ? "For Sale" : "For Rent"
    }
  );
}
function AllListingsTab() {
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [listingTypeFilter, setListingTypeFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const { data: items = [], isLoading } = useMarketplaceItems(
    categoryFilter !== "all" ? categoryFilter : void 0,
    listingTypeFilter !== "all" ? listingTypeFilter : void 0
  );
  const deactivate = useDeactivateMarketplaceItem();
  const filtered = items.filter((item) => {
    if (statusFilter === "active") return item.isActive;
    if (statusFilter === "inactive") return !item.isActive;
    return true;
  });
  function handleDeactivate(id) {
    deactivate.mutate(id, {
      onSuccess: () => ue.success("Listing deactivated"),
      onError: () => ue.error("Failed to deactivate listing")
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap gap-3 items-center",
        "data-ocid": "marketplace.filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-44",
                "data-ocid": "marketplace.category_filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Categories" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
              CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: listingTypeFilter, onValueChange: setListingTypeFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36", "data-ocid": "marketplace.type_filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Types" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LISTING_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t === "all" ? "All Types" : t === "sale" ? "For Sale" : "For Rent" }, t)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36", "data-ocid": "marketplace.status_filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Status" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s === "all" ? "All Status" : s === "active" ? "Active" : "Inactive" }, s)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground ml-auto", children: [
            filtered.length,
            " listing",
            filtered.length !== 1 ? "s" : ""
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "marketplace.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" })
    ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center gap-3",
        "data-ocid": "marketplace.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: "No listings found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your filters or add a new listing." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Year" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Invoice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Posted By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Photo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `marketplace.item.${idx + 1}`,
          className: !item.isActive ? "opacity-60" : "",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium max-w-[140px] truncate", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right font-mono tabular-nums", children: [
              "₹",
              item.price.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: item.category }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: Number(item.yearOfManufacture) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListingTypeBadge, { type: item.listingType }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: item.invoiceAvailable ? "default" : "outline",
                children: item.invoiceAvailable ? "Yes" : "No"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: item.isActive ? "default" : "secondary", children: item.isActive ? "Active" : "Inactive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground max-w-[100px] truncate text-sm", children: item.createdBy }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm whitespace-nowrap", children: formatDate(item.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: item.instagramPhotoLink ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: item.instagramPhotoLink,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
                "data-ocid": `marketplace.photo_link.${idx + 1}`,
                children: [
                  "View ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: item.isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "text-destructive hover:text-destructive hover:bg-destructive/10 h-7",
                onClick: () => handleDeactivate(item.id),
                disabled: deactivate.isPending,
                "data-ocid": `marketplace.deactivate_button.${idx + 1}`,
                "aria-label": "Deactivate listing",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1" }),
                  "Deactivate"
                ]
              }
            ) })
          ]
        },
        item.id
      )) })
    ] }) })
  ] });
}
const INITIAL_FORM = {
  title: "",
  price: "",
  category: "",
  yearOfManufacture: "",
  instagramPhotoLink: "",
  listingType: "sale",
  invoiceAvailable: false,
  createdBy: ""
};
function AddListingTab({ onSuccess }) {
  var _a;
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const createItem = useCreateMarketplaceItem();
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.price || !form.category || !form.yearOfManufacture) {
      ue.error("Please fill in all required fields");
      return;
    }
    const year = Number.parseInt(form.yearOfManufacture, 10);
    if (!Number.isFinite(year) || year < 1900 || year > (/* @__PURE__ */ new Date()).getFullYear()) {
      ue.error("Please enter a valid year of manufacture");
      return;
    }
    const price = Number.parseFloat(form.price);
    if (!Number.isFinite(price) || price <= 0) {
      ue.error("Please enter a valid price");
      return;
    }
    createItem.mutate(
      {
        title: form.title.trim(),
        price,
        category: form.category,
        yearOfManufacture: BigInt(year),
        instagramPhotoLink: form.instagramPhotoLink.trim(),
        listingType: form.listingType,
        invoiceAvailable: form.invoiceAvailable,
        createdBy: form.createdBy.trim() || "admin"
      },
      {
        onSuccess: () => {
          ue.success("Listing created successfully!");
          setForm(INITIAL_FORM);
          onSuccess();
        },
        onError: (err) => {
          ue.error(`Failed to create listing: ${err.message}`);
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
      "Add Old Item Listing"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-5",
        "data-ocid": "marketplace.add_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "mp-title", children: [
              "Title ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "mp-title",
                placeholder: "e.g. Honda Activa 2018",
                value: form.title,
                onChange: (e) => setForm({ ...form, title: e.target.value }),
                "data-ocid": "marketplace.title.input",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "mp-price", children: [
              "Price (₹) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm", children: "₹" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "mp-price",
                  type: "number",
                  min: 1,
                  step: 1,
                  placeholder: "0",
                  className: "pl-7",
                  value: form.price,
                  onChange: (e) => setForm({ ...form, price: e.target.value }),
                  "data-ocid": "marketplace.price.input",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Category ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.category,
                onValueChange: (v) => setForm({ ...form, category: v }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "marketplace.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "mp-year", children: [
              "Year of Manufacture ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "mp-year",
                type: "number",
                min: 1900,
                max: (/* @__PURE__ */ new Date()).getFullYear(),
                placeholder: "e.g. 2018",
                value: form.yearOfManufacture,
                onChange: (e) => setForm({ ...form, yearOfManufacture: e.target.value }),
                "data-ocid": "marketplace.year.input",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mp-photo", children: "Instagram / Photo Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "mp-photo",
                type: "url",
                placeholder: "https://instagram.com/p/...",
                value: form.instagramPhotoLink,
                onChange: (e) => setForm({ ...form, instagramPhotoLink: e.target.value }),
                "data-ocid": "marketplace.photo_link.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Listing Type ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-4",
                "data-ocid": "marketplace.listing_type.radio",
                children: ["sale", "rent"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "radio",
                          name: "listingType",
                          value: type,
                          checked: form.listingType === type,
                          onChange: () => setForm({ ...form, listingType: type }),
                          className: "accent-primary",
                          "data-ocid": `marketplace.listing_type.${type}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: type === "sale" ? "For Sale" : "For Rent" })
                    ]
                  },
                  type
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "mp-invoice",
                checked: form.invoiceAvailable,
                onCheckedChange: (v) => setForm({ ...form, invoiceAvailable: v }),
                "data-ocid": "marketplace.invoice.switch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mp-invoice", className: "cursor-pointer", children: "Invoice Available" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mp-poster", children: "Posted By (phone / name)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "mp-poster",
                placeholder: "e.g. +91-9876543210 or admin",
                value: form.createdBy,
                onChange: (e) => setForm({ ...form, createdBy: e.target.value }),
                "data-ocid": "marketplace.posted_by.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: createItem.isPending,
                "data-ocid": "marketplace.submit_button",
                children: createItem.isPending ? "Saving…" : "Add Listing"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setForm(INITIAL_FORM),
                "data-ocid": "marketplace.cancel_button",
                children: "Reset"
              }
            )
          ] }),
          createItem.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-destructive",
              "data-ocid": "marketplace.error_state",
              children: ((_a = createItem.error) == null ? void 0 : _a.message) ?? "Something went wrong"
            }
          )
        ]
      }
    ) })
  ] });
}
function MyListingsTab({ userId }) {
  const { data: items = [], isLoading } = useUserListings(userId);
  const deactivate = useDeactivateMarketplaceItem();
  function handleDeactivate(id) {
    deactivate.mutate(id, {
      onSuccess: () => ue.success("Listing deactivated"),
      onError: () => ue.error("Failed to deactivate listing")
    });
  }
  if (!userId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center gap-3",
        "data-ocid": "marketplace.my_listings_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: "Enter your phone / user ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Type your registered phone number in "Posted By" and switch to this tab.' })
        ]
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-2",
        "data-ocid": "marketplace.my_listings_loading_state",
        children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }, i))
      }
    );
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center gap-3",
        "data-ocid": "marketplace.my_listings_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: "No listings yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Add your first listing using the "Add New Listing" tab.' })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Year" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Action" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      TableRow,
      {
        "data-ocid": `marketplace.my_listing.${idx + 1}`,
        className: !item.isActive ? "opacity-60" : "",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium max-w-[140px] truncate", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right font-mono tabular-nums", children: [
            "₹",
            item.price.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: item.category }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: Number(item.yearOfManufacture) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListingTypeBadge, { type: item.listingType }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: item.isActive ? "default" : "secondary", children: item.isActive ? "Active" : "Inactive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: item.isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "text-destructive hover:text-destructive hover:bg-destructive/10 h-7",
              onClick: () => handleDeactivate(item.id),
              disabled: deactivate.isPending,
              "data-ocid": `marketplace.my_listing_deactivate_button.${idx + 1}`,
              "aria-label": "Deactivate listing",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1" }),
                "Deactivate"
              ]
            }
          ) })
        ]
      },
      item.id
    )) })
  ] }) });
}
function MarketplacePage() {
  const [tab, setTab] = reactExports.useState(
    "listings"
  );
  const [myListingsUserId, setMyListingsUserId] = reactExports.useState("");
  const { data: allItems = [] } = useMarketplaceItems();
  const activeCount = allItems.filter(
    (i) => i.isActive
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "marketplace.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 text-primary" }),
          "Old Items Marketplace"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage sell, buy, and rent listings for used items" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-sm px-3 py-1", children: [
          activeCount,
          " active listing",
          activeCount !== 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setTab("add"),
            "data-ocid": "marketplace.add_listing_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
              "Add Listing"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: tab,
        onValueChange: (v) => setTab(v),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "marketplace.tabs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "listings",
                "data-ocid": "marketplace.all_listings.tab",
                children: [
                  "All Listings",
                  allItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs bg-muted rounded-full px-1.5 py-0.5", children: allItems.length })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "my-listings",
                "data-ocid": "marketplace.my_listings.tab",
                children: "My Listings"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "add", "data-ocid": "marketplace.add_new.tab", children: "Add New Listing" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "listings", className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AllListingsTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "my-listings", className: "pt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "my-listings-user",
                  className: "text-xs text-muted-foreground mb-1 block",
                  children: "Your phone number or user ID"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "my-listings-user",
                  placeholder: "e.g. +91-9876543210",
                  value: myListingsUserId,
                  onChange: (e) => setMyListingsUserId(e.target.value),
                  "data-ocid": "marketplace.my_listings_user.input"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MyListingsTab, { userId: myListingsUserId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "add", className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddListingTab, { onSuccess: () => setTab("listings") }) })
        ]
      }
    )
  ] });
}
export {
  MarketplacePage as default
};
