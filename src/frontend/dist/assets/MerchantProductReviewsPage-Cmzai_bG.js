import { ef as useManufacturerByUser, d5 as useGetMerchantSubscriptionStatus, ek as useManufacturerRatings, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Star } from "./star-DbleSGPY.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
function StarRow({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-500 text-sm", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `inline w-3.5 h-3.5 ${n <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`
    },
    n
  )) });
}
function MerchantProductReviewsPage() {
  const { data: profileRaw } = useManufacturerByUser();
  const profile = profileRaw;
  const merchantId = profile == null ? void 0 : profile.id;
  const { data: subStatus, isLoading: subLoading } = useGetMerchantSubscriptionStatus(merchantId);
  const { data: ratingsRaw = [], isLoading: ratingsLoading } = useManufacturerRatings();
  const ratings = ratingsRaw;
  if (subLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 p-4", "data-ocid": "merchant.reviews.loading_state", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, n)) });
  }
  const isActive = (subStatus == null ? void 0 : subStatus.isActive) ?? true;
  if (!isActive) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-4",
        "data-ocid": "merchant.reviews.upgrade_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Paid Subscription Required" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Upgrade to a paid plan to view customer and distributor reviews." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "default",
              asChild: true,
              "data-ocid": "merchant.reviews.upgrade_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/subscriptions", children: "Upgrade Plan" })
            }
          )
        ]
      }
    );
  }
  const grouped = ratings.reduce(
    (acc, r) => {
      const key = r.productId;
      if (!acc[key]) acc[key] = [];
      acc[key].push(r);
      return acc;
    },
    {}
  );
  const productIds = Object.keys(grouped);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "merchant.reviews.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-yellow-500" }),
        "Product Reviews"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        ratings.length,
        " total reviews across ",
        productIds.length,
        " products"
      ] })
    ] }),
    ratingsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "merchant.reviews.loading_state", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, n)) }),
    !ratingsLoading && productIds.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-3",
        "data-ocid": "merchant.reviews.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No reviews yet" })
        ]
      }
    ),
    !ratingsLoading && productIds.map((productId, pi) => {
      const group = grouped[productId];
      const avg = group.reduce((s, r) => s + Number(r.rating), 0) / group.length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg overflow-hidden",
          "data-ocid": `merchant.reviews.product.${pi + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: [
                  "Product: ",
                  productId.slice(0, 12),
                  "…"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: Math.round(avg) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    avg.toFixed(1),
                    " · ",
                    group.length,
                    " review",
                    group.length !== 1 ? "s" : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                group.length,
                " review",
                group.length !== 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: group.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-3",
                "data-ocid": `merchant.reviews.item.${pi + 1}.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: r.ratedBy }),
                    r.review && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 line-clamp-2", children: r.review }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: new Date(
                      Number(r.createdAt) / 1e6
                    ).toLocaleDateString() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: Number(r.rating) })
                ] })
              },
              r.id
            )) })
          ]
        },
        productId
      );
    })
  ] });
}
export {
  MerchantProductReviewsPage as default
};
