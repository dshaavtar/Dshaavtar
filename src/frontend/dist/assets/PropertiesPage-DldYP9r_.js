import { aE as useProperties, aF as usePostProperty, r as reactExports, aG as PropertyListingType, j as jsxRuntimeExports, p as ue, aw as ContactRequestStatus, aH as useMyPropertyListings } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-g1LGwGv2.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { X } from "./x-Chksmd6i.js";
import { B as Building2 } from "./building-2-B0h7D8pK.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
const PAGE_SIZE = 20;
const LISTING_TYPE_META = {
  rent: {
    label: "Rent",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800"
  },
  lease: {
    label: "Lease",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-200 dark:border-violet-800"
  },
  buy: {
    label: "Buy",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800"
  },
  sale: {
    label: "Sale",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800"
  }
};
function formatPrice(price, type) {
  const suffix = type === "rent" || type === "lease" ? "/mo" : "";
  if (price >= 1e7) return `₹${(price / 1e7).toFixed(1)} Cr${suffix}`;
  if (price >= 1e5) return `₹${(price / 1e5).toFixed(1)} L${suffix}`;
  return `₹${price.toLocaleString("en-IN")}${suffix}`;
}
function StatCard({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-1 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold font-display ${color}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
function ListingTypePill({
  type,
  active,
  onClick
}) {
  const meta = LISTING_TYPE_META[type] ?? {
    label: type,
    bg: "",
    text: "",
    border: ""
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      onKeyDown: (e) => e.key === "Enter" && onClick(),
      className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${active ? `${meta.bg} ${meta.text} ${meta.border}` : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"}`,
      "data-ocid": `filter-type-${type}`,
      children: meta.label
    }
  );
}
function LeadsTable({
  leads,
  onApprove,
  onReject
}) {
  if (!leads.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground text-sm", children: "No leads yet" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 font-medium", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/50 hover:bg-muted/30 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-3 font-medium", children: lead.requesterName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-3 text-muted-foreground font-mono text-xs", children: lead.requesterPhone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-3 text-muted-foreground text-xs whitespace-nowrap", children: new Date(Number(lead.requestedAt)).toLocaleDateString("en-IN") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-3", children: lead.status === ContactRequestStatus.approved ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Approved" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-muted-foreground text-xs",
              children: "Pending"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", children: lead.status !== ContactRequestStatus.approved ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "h-6 px-2 text-xs",
                onClick: () => onApprove(lead.requesterId),
                "data-ocid": "prop-lead-approve-btn",
                children: "Approve"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-6 px-2 text-xs",
                onClick: () => onReject(lead.requesterId),
                "data-ocid": "prop-lead-reject-btn",
                children: "Reject"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) })
        ]
      },
      lead.requesterId
    )) })
  ] }) });
}
function MyPropertyListingsTab() {
  const [phone, setPhone] = reactExports.useState("");
  const [queryPhone, setQueryPhone] = reactExports.useState("");
  const {
    data: myProps = [],
    isLoading,
    error
  } = useMyPropertyListings(queryPhone);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "my-properties.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-3", children: "Enter your phone number to view your property listings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "+91 98765 43210",
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            className: "max-w-xs",
            "data-ocid": "my-properties.phone_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => setQueryPhone(phone.trim()),
            disabled: !phone.trim(),
            "data-ocid": "my-properties.search_button",
            children: "View My Listings"
          }
        )
      ] })
    ] }),
    !queryPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "my-properties.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Enter your phone number above to view your property listings" })
        ]
      }
    ),
    queryPhone && isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2", "s3"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, s)) }),
    queryPhone && !isLoading && (error || myProps.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "my-properties.no_results",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-8 h-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: error ? "Failed to load listings" : "No listings yet. Post your first one!" }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setQueryPhone(""),
              "data-ocid": "my-properties.retry_button",
              children: "Retry"
            }
          )
        ]
      }
    ),
    queryPhone && !isLoading && myProps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
        myProps.length,
        " propert",
        myProps.length !== 1 ? "ies" : "y",
        " ",
        "posted"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "my-properties.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Posted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-3 font-medium", children: "Leads" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: myProps.map((prop, i) => {
          const meta = LISTING_TYPE_META[prop.listingType] ?? LISTING_TYPE_META.rent;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
              "data-ocid": `my-properties.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${meta.bg} ${meta.text} ${meta.border}`,
                    children: meta.label
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground max-w-[180px] truncate", children: prop.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs font-medium tabular-nums whitespace-nowrap", children: formatPrice(prop.expectedPrice, prop.listingType) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground max-w-[120px] truncate", children: prop.location.address }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: prop.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-muted-foreground text-xs",
                    children: "Inactive"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground whitespace-nowrap", children: new Date(Number(prop.publishDate)).toLocaleDateString(
                  "en-IN"
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-right tabular-nums font-semibold", children: prop.leads.length })
              ]
            },
            prop.id
          );
        }) })
      ] }) })
    ] })
  ] });
}
function PropertiesPage() {
  var _a;
  const {
    data: properties = [],
    isLoading,
    isError,
    refetch
  } = useProperties();
  const postProperty = usePostProperty();
  const [leadApprovals, setLeadApprovals] = reactExports.useState(
    {}
  );
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [locationSearch, setLocationSearch] = reactExports.useState("");
  const [priceMin, setPriceMin] = reactExports.useState("");
  const [priceMax, setPriceMax] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [selectedProp, setSelectedProp] = reactExports.useState(null);
  const [showPostModal, setShowPostModal] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    listingType: "",
    description: "",
    expectedPrice: "",
    location: "",
    address: ""
  });
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const totalListings = properties.length;
  const activeListings = properties.filter((p) => p.isActive).length;
  const forRent = properties.filter(
    (p) => p.listingType === PropertyListingType.rent
  ).length;
  const forSale = properties.filter(
    (p) => p.listingType === PropertyListingType.sale
  ).length;
  const totalLeads = properties.reduce((s, p) => s + p.leads.length, 0);
  const filtered = reactExports.useMemo(
    () => properties.filter((p) => {
      if (typeFilter !== "all" && p.listingType !== typeFilter) return false;
      if (locationSearch && !p.location.address.toLowerCase().includes(locationSearch.toLowerCase()))
        return false;
      if (priceMin && p.expectedPrice < Number.parseInt(priceMin))
        return false;
      if (priceMax && p.expectedPrice > Number.parseInt(priceMax))
        return false;
      if (dateFrom && Number(p.publishDate) < new Date(dateFrom).getTime())
        return false;
      if (dateTo && Number(p.publishDate) > new Date(dateTo).getTime())
        return false;
      return true;
    }),
    [
      properties,
      typeFilter,
      locationSearch,
      priceMin,
      priceMax,
      dateFrom,
      dateTo
    ]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const locationCounts = {};
  for (const p of properties) {
    const city = ((_a = p.location.address.split(",").pop()) == null ? void 0 : _a.trim()) ?? p.location.address;
    locationCounts[city] = (locationCounts[city] ?? 0) + 1;
  }
  const locationRows = Object.entries(locationCounts).sort(
    (a, b) => b[1] - a[1]
  );
  async function handleSubmitProperty() {
    if (!form.listingType || !form.description || !form.expectedPrice) return;
    setIsSubmitting(true);
    try {
      await postProperty.mutateAsync({
        posterId: "admin",
        description: form.description,
        listingType: form.listingType,
        expectedPrice: Number.parseInt(form.expectedPrice) || 0,
        location: {
          lat: 28.6139,
          lng: 77.209,
          address: form.address || form.location || "India"
        }
      });
      ue.success("Property posted successfully");
      setIsSubmitting(false);
      setShowPostModal(false);
      setForm({
        listingType: "",
        description: "",
        expectedPrice: "",
        location: "",
        address: ""
      });
    } catch {
      ue.error("Failed to post property");
      setIsSubmitting(false);
    }
  }
  function handleApproveLead(propId, requesterId) {
    setLeadApprovals((prev) => ({
      ...prev,
      [`${propId}_${requesterId}`]: true
    }));
    if (selectedProp) {
      const lead = selectedProp.leads.find(
        (l) => l.requesterId === requesterId
      );
      if (lead) lead.status = ContactRequestStatus.approved;
    }
  }
  function handleRejectLead(propId, requesterId) {
    setLeadApprovals((prev) => ({
      ...prev,
      [`${propId}_${requesterId}`]: false
    }));
  }
  const enrichedLeads = (p) => p.leads.map((lead) => ({
    ...lead,
    status: leadApprovals[`${p.id}_${lead.requesterId}`] !== void 0 ? leadApprovals[`${p.id}_${lead.requesterId}`] ? ContactRequestStatus.approved : ContactRequestStatus.declined : lead.status
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Property Listings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Browse, manage, and approve property leads" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowPostModal(true),
          className: "gap-2 shrink-0",
          "data-ocid": "post-property-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Post Property (Admin)"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Listings",
          value: totalListings,
          color: "text-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Listings",
          value: activeListings,
          color: "text-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "For Rent",
          value: forRent,
          color: "text-blue-600 dark:text-blue-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "For Sale",
          value: forSale,
          color: "text-amber-600 dark:text-amber-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Leads",
          value: totalLeads,
          color: "text-[oklch(0.6_0.18_202)]"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", "data-ocid": "properties.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "properties.tab.all", children: "All Listings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "my", "data-ocid": "properties.tab.my", children: "My Listings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setTypeFilter("all"),
                className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${typeFilter === "all" ? "bg-foreground text-background border-foreground" : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"}`,
                "data-ocid": "filter-type-all",
                children: "All"
              }
            ),
            ["rent", "lease", "buy", "sale"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ListingTypePill,
              {
                type: t,
                active: typeFilter === t,
                onClick: () => setTypeFilter(t)
              },
              t
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Location...",
                  value: locationSearch,
                  onChange: (e) => setLocationSearch(e.target.value),
                  className: "pl-8 h-8 text-sm w-40",
                  "data-ocid": "prop-filter-location"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "Price min (₹)",
                value: priceMin,
                onChange: (e) => setPriceMin(e.target.value),
                className: "h-8 text-sm w-32",
                "data-ocid": "prop-filter-price-min"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "Price max (₹)",
                value: priceMax,
                onChange: (e) => setPriceMax(e.target.value),
                className: "h-8 text-sm w-32",
                "data-ocid": "prop-filter-price-max"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: dateFrom,
                onChange: (e) => setDateFrom(e.target.value),
                className: "h-8 text-sm w-36",
                "data-ocid": "prop-filter-date-from"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: dateTo,
                onChange: (e) => setDateTo(e.target.value),
                className: "h-8 text-sm w-36",
                "data-ocid": "prop-filter-date-to"
              }
            ),
            (typeFilter !== "all" || locationSearch || priceMin || priceMax || dateFrom || dateTo) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 gap-1 text-muted-foreground",
                onClick: () => {
                  setTypeFilter("all");
                  setLocationSearch("");
                  setPriceMin("");
                  setPriceMax("");
                  setDateFrom("");
                  setDateTo("");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                  "Clear"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            paginated.length,
            " of ",
            filtered.length,
            " listings (page",
            " ",
            page,
            " of ",
            totalPages,
            ")"
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["p-sk-1", "p-sk-2", "p-sk-3", "p-sk-4", "p-sk-5", "p-sk-6"].map(
          (s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-xl" }, s)
        ) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center bg-card border border-border rounded-xl",
            "data-ocid": "properties.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Unable to load listings. Please try again." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => void refetch(),
                  "data-ocid": "properties.retry_button",
                  children: "Retry"
                }
              )
            ]
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center bg-card border border-border rounded-xl",
            "data-ocid": "properties-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No property listings found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setShowPostModal(true),
                  children: "Post a Property"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
            "data-ocid": "properties-grid",
            children: paginated.map((prop) => {
              const meta = LISTING_TYPE_META[prop.listingType] ?? LISTING_TYPE_META.rent;
              const endDate = new Date(Number(prop.endDate));
              const isExpired = endDate < /* @__PURE__ */ new Date();
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "bg-card border border-border rounded-xl p-4 space-y-3 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer text-left w-full",
                  onClick: () => setSelectedProp(prop),
                  "data-ocid": `prop-card-${prop.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${meta.bg} ${meta.text} ${meta.border}`,
                          children: meta.label
                        }
                      ),
                      prop.isActive && !isExpired ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-muted-foreground text-xs",
                          children: isExpired ? "Expired" : "Inactive"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2 leading-relaxed", children: prop.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold font-display text-foreground", children: formatPrice(prop.expectedPrice, prop.listingType) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: prop.location.address })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border/50", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: prop.leads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                        prop.leads.length,
                        " leads"
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(Number(prop.publishDate)).toLocaleDateString(
                        "en-IN"
                      ) })
                    ] })
                  ]
                },
                prop.id
              );
            })
          }
        ),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page <= 1,
                onClick: () => setPage((p) => p - 1),
                "data-ocid": "properties.pagination_prev",
                children: "Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page >= totalPages,
                onClick: () => setPage((p) => p + 1),
                "data-ocid": "properties.pagination_next",
                children: "Next"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "Location Breakdown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
              locationRows.length,
              " cities/areas"
            ] })
          ] }),
          locationRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-sm text-muted-foreground", children: "No location data" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-sm",
              "data-ocid": "location-heatmap-table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-4 font-medium", children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-4 font-medium", children: "Listings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-4 font-medium", children: "Distribution" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-4 font-medium", children: "Action" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: locationRows.map(([city, count]) => {
                  const pct = Math.round(count / totalListings * 100) || 0;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4 font-medium", children: city }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4 text-right tabular-nums font-semibold", children: count }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-1.5 max-w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "bg-primary h-1.5 rounded-full",
                              style: { width: `${pct}%` }
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-8 text-right", children: [
                            pct,
                            "%"
                          ] })
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "ghost",
                            className: "h-6 px-2 text-xs gap-1",
                            onClick: () => setLocationSearch(city),
                            "data-ocid": `view-location-${city.replace(/\s/g, "-")}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3 h-3" }),
                              "View"
                            ]
                          }
                        ) })
                      ]
                    },
                    city
                  );
                }) })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "my", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MyPropertyListingsTab, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!selectedProp, onOpenChange: () => setSelectedProp(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SheetContent,
      {
        side: "right",
        className: "w-full sm:max-w-xl overflow-y-auto",
        children: selectedProp && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "text-base font-bold font-display leading-snug", children: [
              selectedProp.description.slice(0, 60),
              selectedProp.description.length > 60 ? "…" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5 flex-wrap", children: [
              (() => {
                const m = LISTING_TYPE_META[selectedProp.listingType] ?? LISTING_TYPE_META.rent;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${m.bg} ${m.text} ${m.border}`,
                    children: m.label
                  }
                );
              })(),
              selectedProp.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-muted-foreground text-xs",
                  children: "Inactive"
                }
              )
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "details", className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "details", className: "flex-1", children: "Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "leads", className: "flex-1", children: [
                "Leads (",
                selectedProp.leads.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "details", className: "space-y-4 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Full Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: selectedProp.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Expected Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold font-display", children: formatPrice(
                    selectedProp.expectedPrice,
                    selectedProp.listingType
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Listing Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium capitalize", children: selectedProp.listingType })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: selectedProp.location.address })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border rounded-md p-2 mt-2 text-xs font-mono text-muted-foreground", children: [
                  "📍 Lat: ",
                  selectedProp.location.lat.toFixed(6),
                  " | Lng:",
                  " ",
                  selectedProp.location.lng.toFixed(6)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Posted By" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: selectedProp.posterId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Timeline" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-6 bg-border" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-2.5 h-2.5 rounded-full ${new Date(Number(selectedProp.endDate)) < /* @__PURE__ */ new Date() ? "bg-destructive" : "bg-primary"}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Published" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: new Date(
                        Number(selectedProp.publishDate)
                      ).toLocaleDateString("en-IN") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Expires" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: new Date(Number(selectedProp.endDate)) < /* @__PURE__ */ new Date() ? "text-destructive" : "text-muted-foreground",
                          children: new Date(
                            Number(selectedProp.endDate)
                          ).toLocaleDateString("en-IN")
                        }
                      )
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "leads", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              LeadsTable,
              {
                leads: enrichedLeads(selectedProp),
                onApprove: (userId) => handleApproveLead(selectedProp.id, userId),
                onReject: (userId) => handleRejectLead(selectedProp.id, userId)
              }
            ) })
          ] })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPostModal, onOpenChange: setShowPostModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Post a Property" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Listing Type *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.listingType,
              onValueChange: (v) => setForm((f) => ({ ...f, listingType: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "prop-form-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select type" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rent", children: "Rent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "lease", children: "Lease" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "buy", children: "Buy" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sale", children: "Sale" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Describe the property — type, size, amenities, condition...",
              rows: 3,
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              "data-ocid": "prop-form-description"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expected Price (₹) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              placeholder: "e.g. 28000 for rent or 8500000 for sale",
              value: form.expectedPrice,
              onChange: (e) => setForm((f) => ({ ...f, expectedPrice: e.target.value })),
              "data-ocid": "prop-form-price"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "City or area",
              value: form.location,
              onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
              "data-ocid": "prop-form-location"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Full address including society/locality",
              value: form.address,
              onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
              "data-ocid": "prop-form-address"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground", children: [
          "📅 Duration: auto-set to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "2 weeks" }),
          " from today (expires",
          " ",
          new Date(Date.now() + 14 * 864e5).toLocaleDateString("en-IN"),
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => setShowPostModal(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1",
              onClick: handleSubmitProperty,
              disabled: isSubmitting || !form.listingType || !form.description || !form.expectedPrice,
              "data-ocid": "prop-form-submit",
              children: isSubmitting ? "Posting..." : "Post Property"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PropertiesPage as default
};
