import { cz as useRestockOrders, bV as useUpdateRestockStatus, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as ShoppingBag } from "./shopping-bag-DlKZ3RXf.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { P as Package } from "./package-CosknzeL.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
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
function StatusBadgeRestock({ status }) {
  const map = {
    pending: {
      label: "Pending",
      className: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
    },
    accepted: {
      label: "Accepted",
      className: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
    },
    delivered: {
      label: "Delivered",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
    }
  };
  const { label, className } = map[status] ?? map.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`,
      children: label
    }
  );
}
function RestockRowActions({
  order,
  onUpdate
}) {
  if (order.status === "delivered" || order.status === "cancelled") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: order.status === "delivered" ? "Completed" : "Cancelled" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    order.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "h-7 text-xs gap-1 text-blue-600 border-blue-200 hover:bg-blue-50",
        onClick: () => onUpdate(order.id, "accepted"),
        "data-ocid": "restock.accept_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
          " Accept"
        ]
      }
    ),
    order.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "h-7 text-xs gap-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50",
        onClick: () => onUpdate(order.id, "delivered"),
        "data-ocid": "restock.delivered_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3 h-3" }),
          " Mark Delivered"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "ghost",
        className: "h-7 text-xs gap-1 text-destructive hover:bg-destructive/10",
        onClick: () => onUpdate(order.id, "cancelled"),
        "data-ocid": "restock.cancel_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
          " Cancel"
        ]
      }
    )
  ] });
}
function RestockOrdersPage() {
  const { data: orders = [], isLoading } = useRestockOrders();
  const updateStatus = useUpdateRestockStatus();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (search && !o.merchantName.toLowerCase().includes(search.toLowerCase()) && !o.itemName.toLowerCase().includes(search.toLowerCase()) && !o.supplierName.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [orders, search, statusFilter]);
  const counts = reactExports.useMemo(() => {
    const c = { pending: 0, accepted: 0, delivered: 0, cancelled: 0 };
    for (const o of orders) c[o.status]++;
    return c;
  }, [orders]);
  async function handleUpdate(orderId, status) {
    try {
      await updateStatus.mutateAsync({ orderId, status });
      ue.success(`Order marked as ${status}`);
    } catch {
      ue.error("Failed to update status");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", "data-ocid": "restock_orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-primary" }),
        "Restock Orders"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Merchant supplier restock requests — accept, deliver, or cancel" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Pending",
        value: counts.pending,
        color: "text-amber-600"
      },
      {
        label: "Accepted",
        value: counts.accepted,
        color: "text-blue-600"
      },
      {
        label: "Delivered",
        value: counts.delivered,
        color: "text-emerald-600"
      },
      {
        label: "Cancelled",
        value: counts.cancelled,
        color: "text-muted-foreground"
      }
    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-3 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${color}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by merchant, item, supplier…",
            className: "pl-9",
            "data-ocid": "restock_orders.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => setStatusFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-44",
                "data-ocid": "restock_orders.status_filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "accepted", children: "Accepted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "delivered", children: "Delivered" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "restock_orders.table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [
        "Merchant",
        "Supplier",
        "Item",
        "Qty",
        "Status",
        "Created",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: Array.from({ length: 7 }, (_, j) => `cell-${j}`).map(
        (cellId) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) }, cellId)
      ) }, id)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 7, className: "py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-muted-foreground font-medium",
            "data-ocid": "restock_orders.empty_state",
            children: search || statusFilter !== "all" ? "No restock orders match your filters" : "No restock orders yet"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Merchants can place restock orders from their chatbot menu" })
      ] }) }) : filtered.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
          "data-ocid": `restock_orders.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: order.merchantName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: order.merchantPhone })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: order.supplierName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: order.itemName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 tabular-nums", children: order.quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadgeRestock, { status: order.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: new Date(Number(order.createdAt)).toLocaleDateString(
              "en-IN"
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              RestockRowActions,
              {
                order,
                onUpdate: handleUpdate
              }
            ) })
          ]
        },
        order.id
      )) })
    ] }) }) }),
    filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
      "Showing ",
      filtered.length,
      " of ",
      orders.length,
      " restock orders"
    ] })
  ] });
}
export {
  RestockOrdersPage as default
};
