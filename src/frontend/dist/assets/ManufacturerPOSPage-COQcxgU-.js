import { ef as useManufacturerByUser, ev as useGetManufacturerPOSOrders, ew as useUpdatePOSOrderStatus, r as reactExports, j as jsxRuntimeExports, L as Link, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent } from "./card-Dx8tJeYi.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { P as Package } from "./package-CosknzeL.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { U as User } from "./user-BCyag2Xe.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-DYndF6Sn.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./createLucideIcon-BGWdtUCJ.js";
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}
function formatTimestamp(ts) {
  if (ts === void 0 || ts === null) return "—";
  const ms = Number(ts) / 1e6;
  if (!ms || Number.isNaN(ms)) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function statusBadge(status) {
  const map = {
    Pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200"
    },
    Confirmed: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-800 border-blue-200"
    },
    Dispatched: {
      label: "Dispatched",
      className: "bg-purple-100 text-purple-800 border-purple-200"
    },
    Delivered: {
      label: "Delivered",
      className: "bg-green-100 text-green-800 border-green-200"
    }
  };
  const s = map[status] ?? { label: status, className: "" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${s.className}`,
      children: s.label
    }
  );
}
function SourceBadge({ type }) {
  return type === "Distributor" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-600 text-white text-xs", children: "Distributor" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-600 text-white text-xs", children: "Direct Customer" });
}
function OrderSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" })
  ] }) }, `item-${i}`)) });
}
function DeliveryAssignForm({
  onDispatch,
  onCancel
}) {
  const [phone, setPhone] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-2 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Delivery partner phone",
        value: phone,
        onChange: (e) => setPhone(e.target.value),
        className: "h-8 w-48 text-sm",
        "data-ocid": "pos.delivery_phone_input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        onClick: () => onDispatch(phone),
        disabled: !phone.trim(),
        "data-ocid": "pos.dispatch_button",
        children: "Dispatch"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: "ghost",
        onClick: onCancel,
        "data-ocid": "pos.cancel_assign_button",
        type: "button",
        children: "Cancel"
      }
    )
  ] });
}
function OrderCard({
  order,
  onAction
}) {
  const [assigningDelivery, setAssigningDelivery] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border hover:shadow-sm transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { type: order.buyerType }),
        statusBadge(order.status)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatTimestamp(order.createdAt) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: order.buyerName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: order.buyerPhone })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 space-y-1", children: (order.items ?? []).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between text-xs text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "inline w-3 h-3 mr-1" }),
            item.productName,
            " × ",
            item.quantity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(item.unitPrice * item.quantity) })
        ]
      },
      `${item.productName}-${idx}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2 pt-2 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold", children: [
        "Total: ",
        formatCurrency(order.total)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        order.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => onAction(order.id, "Confirmed"),
            "data-ocid": "pos.accept_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1" }),
              "Accept"
            ]
          }
        ),
        order.status === "Confirmed" && !assigningDelivery && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "secondary",
            onClick: () => setAssigningDelivery(true),
            "data-ocid": "pos.assign_delivery_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 mr-1" }),
              "Assign & Dispatch"
            ]
          }
        ),
        order.status === "Dispatched" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => onAction(order.id, "Delivered"),
            "data-ocid": "pos.mark_delivered_button",
            children: "Mark Delivered"
          }
        )
      ] })
    ] }),
    order.status === "Confirmed" && assigningDelivery && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeliveryAssignForm,
      {
        onDispatch: (phone) => {
          setAssigningDelivery(false);
          onAction(order.id, "Dispatched", phone);
        },
        onCancel: () => setAssigningDelivery(false)
      }
    )
  ] }) });
}
const STATUS_TABS = [
  { label: "All", value: "all", icon: Package },
  { label: "Pending", value: "Pending", icon: Clock },
  { label: "Confirmed", value: "Confirmed", icon: CircleCheck },
  { label: "Dispatched", value: "Dispatched", icon: Truck },
  { label: "Delivered", value: "Delivered", icon: CircleCheck }
];
function ManufacturerPOSPage() {
  const { data: manufacturer, isLoading: mfrLoading } = useManufacturerByUser();
  const mfrId = (manufacturer == null ? void 0 : manufacturer.id) ?? "";
  const { data: rawOrders, isLoading: ordersLoading } = useGetManufacturerPOSOrders(mfrId);
  const updateStatus = useUpdatePOSOrderStatus();
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const orders = rawOrders ?? [];
  const filtered = orders.filter((o) => activeTab === "all" ? true : o.status === activeTab).filter((o) => {
    var _a;
    return (_a = o.buyerName) == null ? void 0 : _a.toLowerCase().includes(search.toLowerCase());
  });
  function handleAction(orderId, status, deliveryPartnerPhone) {
    updateStatus.mutate(
      { orderId, status, deliveryPartnerPhone: deliveryPartnerPhone ?? "" },
      {
        onSuccess: () => ue.success(`Order marked as ${status}`),
        onError: () => ue.error("Failed to update order status")
      }
    );
  }
  if (mfrLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeleton, {})
    ] });
  }
  if (!manufacturer) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-6 max-w-2xl mx-auto",
        "data-ocid": "pos.no_manufacturer_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-amber-200 bg-amber-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col items-center text-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-amber-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Register as Manufacturer First" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You need a manufacturer profile before orders can be tracked here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/manufacturer-registration", children: "Register Now" }) })
        ] }) })
      }
    );
  }
  const stats = STATUS_TABS.filter((t) => t.value !== "all").map((t) => ({
    label: t.label,
    count: orders.filter((o) => o.status === t.value).length,
    revenue: orders.filter((o) => o.status === t.value).reduce((s, o) => s + (o.total ?? 0), 0)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 md:p-6 max-w-4xl mx-auto space-y-5",
      "data-ocid": "pos.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Manufacturer POS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Unified view of direct customer and distributor orders" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
            "data-ocid": "pos.stats_panel",
            children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: s.count }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatCurrency(s.revenue) })
            ] }) }, s.label))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by buyer name…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "pos.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex flex-wrap gap-1 h-auto", children: STATUS_TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: t.value,
              "data-ocid": `pos.tab.${t.value.toLowerCase()}`,
              className: "text-xs",
              children: [
                t.label,
                t.value !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-xs text-muted-foreground", children: [
                  "(",
                  orders.filter((o) => o.status === t.value).length,
                  ")"
                ] })
              ]
            },
            t.value
          )) }),
          STATUS_TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: t.value, className: "mt-4 space-y-3", children: ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12 text-muted-foreground",
              "data-ocid": "pos.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 mx-auto mb-2 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No orders yet. Orders appear when customers or distributors place them." })
              ]
            }
          ) : filtered.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `pos.item.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, onAction: handleAction }) }, order.id)) }, t.value))
        ] })
      ]
    }
  );
}
export {
  ManufacturerPOSPage as default
};
