import { ee as useManufacturerDashboardStats, ef as useManufacturerByUser, eg as useManufacturerProducts, eh as useDistributorNetwork, ei as useExpiryReturns, ej as useManufacturerComplaints, ek as useManufacturerRatings, j as jsxRuntimeExports, L as Link, p as ue, el as useGetManufacturerReviewsAndComplaints } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { B as Building2 } from "./building-2-B0h7D8pK.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { M as Mail } from "./mail-HmwVVC70.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { P as Package } from "./package-CosknzeL.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { S as Star } from "./star-DbleSGPY.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { A as ArrowRight } from "./arrow-right-ARugd4PE.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
function ReviewsComplaintsSummary({
  manufacturerId,
  ratings,
  complaints
}) {
  var _a;
  const { data: rcData } = useGetManufacturerReviewsAndComplaints(manufacturerId);
  const avgRating = ratings.length > 0 ? ratings.reduce((s, r) => s + Number(r.rating), 0) / ratings.length : 0;
  const recentComplaints = complaints.slice(0, 3);
  const recentRatings = ratings.slice(0, 3);
  const totalComplaints = ((_a = rcData == null ? void 0 : rcData.complaints) == null ? void 0 : _a.length) ?? complaints.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 space-y-4",
      "data-ocid": "manufacturer.reviews_complaints.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-foreground", children: "Reviews & Complaints Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-xs", children: [
              totalComplaints,
              " complaints"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
              avgRating.toFixed(1),
              " ★ avg"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase mb-2", children: "Recent Complaints" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              recentComplaints.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No complaints" }),
              recentComplaints.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground truncate flex-1", children: c.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${String(c.status) === "open" ? "bg-red-500/10 text-red-600 border-red-500/30" : "bg-green-500/10 text-green-600 border-green-500/30"}`,
                    children: String(c.status)
                  }
                )
              ] }, c.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase mb-2", children: "Recent Ratings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              recentRatings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No ratings" }),
              recentRatings.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-yellow-500", children: Array.from({ length: Number(r.rating) }, () => "★").join("") }),
                r.review && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate flex-1", children: r.review })
              ] }, r.id))
            ] })
          ] })
        ] })
      ]
    }
  );
}
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", "data-ocid": "manufacturer.stat_card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-lg flex items-center justify-center ${color}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: value })
  ] });
}
function ManufacturerDashboardPage() {
  const {
    data: statsRaw,
    isLoading: statsLoading,
    refetch: refetchStats
  } = useManufacturerDashboardStats();
  const stats = statsRaw;
  const { data: profileRaw, isLoading: profileLoading } = useManufacturerByUser();
  const profile = profileRaw;
  const { data: productsRaw = [] } = useManufacturerProducts();
  const products = productsRaw;
  const { data: distributorsRaw = [] } = useDistributorNetwork();
  const distributors = distributorsRaw;
  const { data: returnsRaw = [] } = useExpiryReturns();
  const returns = returnsRaw;
  const { data: complaintsRaw = [] } = useManufacturerComplaints();
  const complaints = complaintsRaw;
  const { data: ratingsRaw = [] } = useManufacturerRatings();
  const ratings = ratingsRaw;
  const pendingReturns = returns.filter((r) => String(r.status) === "pending");
  const openComplaintsCount = complaints.filter(
    (c) => String(c.status) === "open"
  ).length;
  const recentRatings = ratings.slice(0, 5);
  if (!profileLoading && !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-64 gap-4",
        "data-ocid": "manufacturer.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-12 h-12 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No Manufacturer Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Register as a manufacturer to manage your network" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "manufacturer.register_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/manufacturer-registration", children: "Register as Manufacturer" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "manufacturer.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }),
          "Manufacturer Dashboard"
        ] }),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: profile.businessName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
            profile.customerCarePhone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
            profile.customerCareEmail
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              refetchStats();
              ue.success("Refreshed");
            },
            "data-ocid": "manufacturer.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1" }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Distributors",
          value: stats ? Number(stats.totalDistributors) : "—",
          icon: Users,
          color: "bg-blue-500/10 text-blue-500",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Products",
          value: stats ? Number(stats.totalProducts) : "—",
          icon: Package,
          color: "bg-primary/10 text-primary",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Orders",
          value: stats ? Number(stats.totalOrders) : "—",
          icon: ShoppingCart,
          color: "bg-purple-500/10 text-purple-500",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Avg Rating",
          value: stats ? `${stats.avgRating.toFixed(1)} ★` : "—",
          icon: Star,
          color: "bg-yellow-500/10 text-yellow-500",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Distributors",
          value: stats ? Number(stats.activeDistributors) : "—",
          icon: TrendingUp,
          color: "bg-green-500/10 text-green-500",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending Returns",
          value: stats ? Number(stats.pendingReturns) : "—",
          icon: CircleAlert,
          color: "bg-orange-500/10 text-orange-500",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Open Complaints",
          value: stats ? Number(stats.openComplaints) : openComplaintsCount,
          icon: CircleAlert,
          color: "bg-red-500/10 text-red-500",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Margin Paid",
          value: stats ? `₹${stats.totalMarginPaid.toLocaleString()}` : "—",
          icon: TrendingUp,
          color: "bg-indigo-500/10 text-indigo-500",
          loading: statsLoading
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-foreground", children: "Distributor Network" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/manufacturer-distributors",
              "data-ocid": "manufacturer.distributor_network_link",
              children: [
                "View All ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          distributors.slice(0, 4).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-4 py-2.5",
              "data-ocid": `manufacturer.distributor.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: d.distributorName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    d.city,
                    " · ",
                    d.pincode
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                    d.marginPercent,
                    "% margin"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `w-2 h-2 rounded-full ${d.status === "active" ? "bg-green-500" : "bg-muted-foreground"}`
                    }
                  )
                ] })
              ]
            },
            d.id
          )),
          distributors.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground px-4 py-4 text-center", children: "No distributors yet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-foreground", children: "Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/manufacturer-products",
              "data-ocid": "manufacturer.products_link",
              children: [
                "View All ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-1" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          products.slice(0, 4).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-4 py-2.5",
              "data-ocid": `manufacturer.product.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: p.productName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Batch: ",
                    p.batchNumber,
                    " · Exp: ",
                    p.expiryDate
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: [
                  "Qty: ",
                  Number(p.stockQty)
                ] })
              ]
            },
            p.id
          )),
          products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground px-4 py-4 text-center", children: "No products yet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-sm text-foreground flex items-center gap-1.5", children: [
            "Expiry Returns",
            pendingReturns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs", variant: "destructive", children: [
              pendingReturns.length,
              " pending"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/manufacturer-returns",
              "data-ocid": "manufacturer.returns_link",
              children: [
                "View All ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-1" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          pendingReturns.slice(0, 3).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-4 py-2.5",
              "data-ocid": `manufacturer.return.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: r.returnedBy }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: r.reason })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs flex-shrink-0", children: [
                  "Qty: ",
                  Number(r.quantity)
                ] })
              ]
            },
            r.id
          )),
          pendingReturns.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground px-4 py-4 text-center", children: "No pending returns" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-foreground", children: "Recent Ratings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/manufacturer-ratings",
              "data-ocid": "manufacturer.ratings_link",
              children: [
                "View All ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-1" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          recentRatings.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-4 py-2.5",
              "data-ocid": `manufacturer.rating.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: r.ratedBy }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-yellow-500 font-semibold", children: Array.from({ length: Number(r.rating) }, () => "★").join(
                    ""
                  ) })
                ] }),
                r.review && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1", children: r.review })
              ]
            },
            r.id
          )),
          recentRatings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground px-4 py-4 text-center", children: "No ratings yet" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReviewsComplaintsSummary,
      {
        manufacturerId: profile == null ? void 0 : profile.id,
        ratings,
        complaints
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
      {
        label: "Products",
        path: "/manufacturer-products",
        icon: Package,
        color: "text-primary"
      },
      {
        label: "Distributors",
        path: "/manufacturer-distributors",
        icon: Users,
        color: "text-blue-500"
      },
      {
        label: "Returns",
        path: "/manufacturer-returns",
        icon: CircleAlert,
        color: "text-orange-500"
      },
      {
        label: "Complaints",
        path: "/manufacturer-complaints",
        icon: CircleAlert,
        color: "text-red-500"
      },
      {
        label: "Ratings",
        path: "/manufacturer-ratings",
        icon: Star,
        color: "text-yellow-500"
      }
    ].map(({ label, path, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        asChild: true,
        className: "h-12 justify-start gap-2",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: path,
            "data-ocid": `manufacturer.nav.${label.toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` }),
              label
            ]
          }
        )
      },
      path
    )) })
  ] });
}
export {
  ManufacturerDashboardPage as default
};
