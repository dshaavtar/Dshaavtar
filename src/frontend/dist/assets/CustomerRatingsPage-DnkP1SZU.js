import { _ as useBackendActor, r as reactExports, bE as useQuery, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { C as Card, a as CardContent } from "./card-Dx8tJeYi.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Star } from "./star-DbleSGPY.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { U as User } from "./user-BCyag2Xe.js";
import { S as Store } from "./store-CaCzKt5a.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
function StarRating({ rating, size = 14 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      size,
      className: i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
    },
    `rating-star-${i}`
  )) });
}
function CustomerRatingsPage() {
  const { actor } = useBackendActor();
  const [search, setSearch] = reactExports.useState("");
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const { data: ratings = [], isLoading } = useQuery({
    queryKey: ["customer-ratings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor;
        if (typeof actorAny.getAllCustomerRatings === "function") {
          const result = await actorAny.getAllCustomerRatings();
          return result ?? [];
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor,
    staleTime: 15e3
  });
  const filtered = ratings.filter((r) => {
    var _a, _b, _c, _d;
    const matchesSearch = !search || ((_a = r.customerName) == null ? void 0 : _a.toLowerCase().includes(search.toLowerCase())) || ((_b = r.customerPhone) == null ? void 0 : _b.includes(search)) || ((_c = r.ratedByName) == null ? void 0 : _c.toLowerCase().includes(search.toLowerCase())) || ((_d = r.comment) == null ? void 0 : _d.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = roleFilter === "all" || r.ratedByRole === roleFilter;
    return matchesSearch && matchesRole;
  });
  const avgRating = ratings.length > 0 ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1) : "0.0";
  const merchantRatings = ratings.filter((r) => r.ratedByRole === "merchant");
  const dpRatings = ratings.filter((r) => r.ratedByRole === "delivery_partner");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6 text-amber-400 fill-amber-400" }),
        "Customer Ratings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Ratings given by merchants and delivery partners for customers" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-foreground", children: ratings.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Ratings" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-amber-500", children: avgRating }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Average Rating" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold text-foreground", children: [
          merchantRatings.length,
          " / ",
          dpRatings.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Merchant / DP Ratings" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by customer, phone, or rater...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "ratings.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["all", "merchant", "delivery_partner"].map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setRoleFilter(role),
          className: [
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            roleFilter === role ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          ].join(" "),
          "data-ocid": `ratings.filter.${role}`,
          children: role === "all" ? "All" : role === "merchant" ? "Merchant" : "Delivery"
        },
        role
      )) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "animate-pulse",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-24 bg-muted" })
      },
      `rating-skel-${i}`
    )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 bg-card rounded-lg border border-border",
        "data-ocid": "ratings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "No ratings found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: ratings.length === 0 ? "Ratings will appear here when merchants or delivery partners rate customers" : "No ratings match your search criteria" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((rating, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": `ratings.item.${index + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: rating.customerName || "Unknown Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: rating.customerPhone })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            rating.ratedByRole === "merchant" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3 h-3" }),
            "Rated by",
            " ",
            rating.ratedByRole === "merchant" ? "Merchant" : "Delivery Partner"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: rating.ratedByName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Order ",
            rating.orderId
          ] })
        ] }),
        rating.comment && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground italic", children: [
          '"',
          rating.comment,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: rating.rating, size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-amber-500", children: rating.rating.toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(Number(rating.createdAt)).toLocaleDateString() })
      ] })
    ] }) }) }, rating.id)) })
  ] });
}
export {
  CustomerRatingsPage as default
};
