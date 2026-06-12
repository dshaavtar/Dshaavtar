import { ek as useManufacturerRatings, r as reactExports, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Star } from "./star-DbleSGPY.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
function StarDisplay({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `w-3.5 h-3.5 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`
    },
    `star-${star}`
  )) });
}
function ManufacturerRatingsPage() {
  const { data: ratingsRaw = [], isLoading } = useManufacturerRatings();
  const ratings = ratingsRaw;
  const [filterStar, setFilterStar] = reactExports.useState(null);
  const filtered = filterStar ? ratings.filter((r) => Number(r.rating) === filterStar) : ratings;
  const avgRating = ratings.length > 0 ? ratings.reduce(
    (sum, r) => sum + Number(r.rating),
    0
  ) / ratings.length : 0;
  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratings.filter((r) => Number(r.rating) === star).length
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "manufacturer.ratings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-yellow-500" }),
          "Product Ratings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          ratings.length,
          " total ratings · avg ",
          avgRating.toFixed(1)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-muted rounded-lg p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilterStar(null),
            className: `px-3 py-1 rounded text-xs font-medium transition-colors ${filterStar === null ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": "manufacturer.ratings.filter.all",
            children: "All"
          }
        ),
        [5, 4, 3, 2, 1].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setFilterStar(filterStar === s ? null : s),
            className: `px-2.5 py-1 rounded text-xs font-medium transition-colors ${filterStar === s ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `manufacturer.ratings.filter.${s}`,
            children: [
              s,
              "★"
            ]
          },
          s
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-foreground", children: avgRating.toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { rating: Math.round(avgRating) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          ratings.length,
          " reviews"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1.5", children: ratingDist.map(({ star, count }) => {
        const pct = ratings.length > 0 ? count / ratings.length * 100 : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 text-right text-muted-foreground", children: star }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-yellow-500 fill-yellow-500 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-yellow-500 rounded-full transition-all",
              style: { width: `${pct}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-right text-muted-foreground", children: count })
        ] }, star);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-3",
        "data-ocid": "manufacturer.ratings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No ratings yet" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: filtered.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-4 py-3",
        "data-ocid": `manufacturer.ratings.item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: r.ratedBy }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                "Product: ",
                r.productId.slice(0, 8),
                "…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Reviewer:",
              " ",
              r.reviewerPhone ?? r.reviewerUserId ?? "Anonymous"
            ] }),
            r.review && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: r.review }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: new Date(
              Number(r.createdAt) / 1e6
            ).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { rating: Number(r.rating) }) })
        ] })
      },
      r.id
    )) }) })
  ] });
}
export {
  ManufacturerRatingsPage as default
};
