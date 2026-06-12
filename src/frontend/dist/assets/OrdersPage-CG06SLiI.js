import { r as reactExports, m as useOrders, t as useDeliveryOrders, v as useSarthiRideBookings, j as jsxRuntimeExports, w as useUpdateOrderStatus, x as OrderStatus, y as useDeliveryPartners, A as useAssignDeliveryPartner, T as TransportStatus } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Checkbox } from "./checkbox-DuAbI53w.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-g1LGwGv2.js";
import { S as StatusBadge } from "./StatusBadge-DNkrizJz.js";
import { u as useDebounce, a as usePagination } from "./usePagination-hWnqFD6I.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { Q as QrCode } from "./qr-code-CVNmsjZi.js";
import { C as ChevronLeft } from "./chevron-left-DzxTPwXv.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { P as Package } from "./package-CosknzeL.js";
import { U as User } from "./user-BCyag2Xe.js";
import { S as Star } from "./star-DbleSGPY.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
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
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./chevron-down-gIU8OsEH.js";
import "./chevron-up-BzRcvKHL.js";
const STATUSES = [
  { label: "All", value: "all" },
  { label: "New Order", value: OrderStatus.new_ },
  { label: "Waiting for Merchant", value: OrderStatus.pending },
  { label: "Merchant Accepted", value: OrderStatus.accepted },
  { label: "Rejected", value: OrderStatus.rejected },
  { label: "DP Assigned", value: OrderStatus.assigned },
  { label: "Out for Delivery", value: OrderStatus.inTransit },
  { label: "Delivered", value: OrderStatus.delivered },
  { label: "Payment Collected", value: OrderStatus.paymentCollected },
  { label: "Vendor Settled", value: OrderStatus.vendorSettled },
  { label: "Order Completed", value: OrderStatus.completed },
  { label: "Cancelled", value: OrderStatus.cancelled }
];
const STATUS_OPTIONS = [
  { label: "New Order", value: OrderStatus.new_ },
  { label: "Waiting for Merchant", value: OrderStatus.pending },
  { label: "Merchant Accepted", value: OrderStatus.accepted },
  { label: "Rejected", value: OrderStatus.rejected },
  { label: "Delivery Partner Assigned", value: OrderStatus.assigned },
  { label: "Out for Delivery", value: OrderStatus.inTransit },
  { label: "Delivered", value: OrderStatus.delivered },
  { label: "Payment Collected", value: OrderStatus.paymentCollected },
  { label: "Vendor Settled", value: OrderStatus.vendorSettled },
  { label: "Order Completed", value: OrderStatus.completed },
  { label: "Cancelled", value: OrderStatus.cancelled }
];
const TRANSPORT_STATUS_CONFIG = {
  [TransportStatus.pending]: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 border-amber-200"
  },
  [TransportStatus.accepted]: {
    label: "Accepted",
    className: "bg-blue-100 text-blue-700 border-blue-200"
  },
  [TransportStatus.headingToPickup]: {
    label: "Heading to Pickup",
    className: "bg-blue-100 text-blue-700 border-blue-200"
  },
  [TransportStatus.arrived]: {
    label: "Arrived",
    className: "bg-indigo-100 text-indigo-700 border-indigo-200"
  },
  [TransportStatus.rideStarted]: {
    label: "Ride Started",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200"
  },
  [TransportStatus.onTheWay]: {
    label: "On the Way",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200"
  },
  [TransportStatus.arrivedDestination]: {
    label: "Arrived Destination",
    className: "bg-green-100 text-green-700 border-green-200"
  },
  [TransportStatus.paymentCollected]: {
    label: "Payment Collected",
    className: "bg-purple-100 text-purple-700 border-purple-200"
  },
  [TransportStatus.completed]: {
    label: "Completed",
    className: "bg-muted text-muted-foreground border-border"
  },
  [TransportStatus.cancelled]: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border-red-200"
  }
};
function exportToCSV(orders) {
  const headers = [
    "Order ID",
    "Customer",
    "Merchant",
    "Items",
    "Total",
    "Delivery",
    "Status",
    "Payment",
    "Created At"
  ];
  const rows = orders.map((o) => [
    o.id,
    o.customerId,
    o.merchantId,
    o.items.length,
    o.totalAmount,
    o.deliveryCharge,
    o.status,
    o.paymentMode,
    new Date(Number(o.createdAt)).toLocaleDateString("en-IN")
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orders-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function buildUpiQrUrl(upiId, name, amount, ref) {
  const data = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(ref)}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
}
function useQRTimer(active) {
  const TWO_MIN = 12e4;
  const [secondsLeft, setSecondsLeft] = reactExports.useState(TWO_MIN / 1e3);
  const [expired, setExpired] = reactExports.useState(false);
  const [refreshCount, setRefreshCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!active) return;
    setExpired(false);
    setSecondsLeft(TWO_MIN / 1e3);
    const end = Date.now() + TWO_MIN;
    const iv = setInterval(() => {
      const rem = Math.max(0, Math.floor((end - Date.now()) / 1e3));
      setSecondsLeft(rem);
      if (rem === 0) {
        setExpired(true);
        clearInterval(iv);
      }
    }, 1e3);
    return () => clearInterval(iv);
  }, [active, refreshCount]);
  return {
    secondsLeft,
    expired,
    refresh: () => setRefreshCount((c) => c + 1)
  };
}
function PaymentQRModal({
  order,
  onClose
}) {
  const { secondsLeft, expired, refresh } = useQRTimer(!!order);
  if (!order) return null;
  const upiId = "localbazar@upi";
  const merchantName = order.merchantId ?? "Merchant";
  const amount = order.totalAmount;
  const orderId = order.id;
  const isCritical = secondsLeft <= 30 && !expired;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const qrUrl = buildUpiQrUrl(upiId, merchantName, amount, `Order-${orderId}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!order, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "order_payment.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-primary" }),
      "Payment QR — Order ",
      orderId
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-sm space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Merchant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: merchantName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: order.items.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border pt-1 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
          "₹",
          amount.toLocaleString("en-IN")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      expired ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[200px] h-[200px] bg-muted rounded-xl border-2 border-dashed border-destructive flex flex-col items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive text-center", children: "QR Expired" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center px-4", children: "Do not accept payment on this QR" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-2 border-border rounded-xl p-2 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: qrUrl,
          alt: "Payment QR Code",
          width: 200,
          height: 200,
          className: `rounded-lg transition-all ${isCritical ? "animate-qr-pulse" : ""}`,
          "data-ocid": "order_payment.qr_code"
        }
      ) }),
      !expired ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Expires in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-mono text-xl font-semibold tabular-nums ${isCritical ? "text-destructive" : "text-foreground"}`,
            "data-ocid": "order_payment.timer",
            children: timeStr
          }
        ),
        isCritical && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-medium", children: "QR expiring soon!" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "gap-2",
          onClick: refresh,
          "data-ocid": "order_payment.refresh_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
            "Generate New QR"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center max-w-[180px]", children: "Use any UPI app to scan. Valid for 2 minutes only." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "flex-1",
          onClick: onClose,
          "data-ocid": "order_payment.cancel_button",
          children: "Cancel Order"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "flex-1",
          onClick: onClose,
          "data-ocid": "order_payment.paid_button",
          children: "I've Paid ✓"
        }
      )
    ] })
  ] }) });
}
function EmptyState({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 px-4 text-center",
      "data-ocid": "orders.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-7 h-7 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground mb-1", children: [
          "No ",
          label,
          " records yet"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Load sample data from the dashboard to get started, or wait for new records to appear." })
      ]
    }
  );
}
function OrderDetailSheet({
  order,
  onClose
}) {
  if (!order) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!order, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-lg overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base", children: order.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "order", value: order.status })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: order.customerId })
        ] }),
        order.customerAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: order.customerAddress.address })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Merchant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: order.merchantId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-muted/20 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: item.productName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Qty: ",
                  Number(item.quantity),
                  " × ₹",
                  item.unitRate
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-sm", children: [
                "₹",
                item.totalRate.toLocaleString("en-IN")
              ] })
            ]
          },
          item.productId
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between px-4 py-2.5 bg-muted/20 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            (order.totalAmount - order.deliveryCharge - (order.surgeCharge ?? 0)).toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between px-4 py-2.5 text-sm border-t border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            order.deliveryCharge
          ] })
        ] }),
        (order.surgeCharge ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between px-4 py-2.5 text-sm border-t border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Surge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            order.surgeCharge
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between px-4 py-2.5 text-sm font-semibold border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            order.totalAmount.toLocaleString("en-IN")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-muted/20 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: order.paymentMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "custom", value: order.paymentStatus })
        ] })
      ] }),
      order.deliveryPartnerId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1", children: "Delivery Partner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: order.deliveryPartnerId })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Status Timeline" }),
        order.statusHistory && order.statusHistory.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: order.statusHistory.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary flex-shrink-0" }),
                i < order.statusHistory.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "order", value: h.status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: new Date(Number(h.timestamp)).toLocaleString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 capitalize", children: [
                  "by ",
                  String(h.actor).replace(/([A-Z])/g, " $1"),
                  h.note ? ` · ${h.note}` : ""
                ] })
              ] })
            ]
          },
          `${h.status}-${i}`
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [
          { label: "Order Created", ts: order.createdAt },
          { label: "Merchant Accepted", ts: order.merchantAcceptedAt },
          { label: "DP Assigned", ts: order.assignedAt },
          { label: "Picked Up", ts: order.pickedUpAt },
          { label: "Delivered", ts: order.deliveredAt },
          { label: "Payment Collected", ts: order.paymentCollectedAt },
          { label: "Vendor Settled", ts: order.vendorSettledAt },
          { label: "Order Completed", ts: order.completedAt },
          { label: "Cancelled", ts: order.cancelledAt }
        ].filter((e) => e.ts).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: e.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: new Date(Number(e.ts)).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ]
          },
          e.label
        )) })
      ] })
    ] })
  ] }) });
}
function SarthiDetailSheet({
  booking,
  onClose
}) {
  if (!booking) return null;
  const cfg = TRANSPORT_STATUS_CONFIG[String(booking.status)] ?? {
    label: String(booking.status),
    className: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!booking, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-lg overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base", children: booking.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`,
          children: cfg.label
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: booking.customerId })
        ] })
      ] }),
      booking.sarthiPartnerId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Sarthi Partner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: booking.sarthiPartnerId })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "From" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: booking.origin.address })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: booking.destination.address })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Vehicle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium capitalize", children: String(booking.vehicleType) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Est. Charge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
            "₹",
            booking.estimatedCharge.toLocaleString("en-IN")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: new Date(Number(booking.createdAt)).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) })
      ] }),
      booking.statusHistory && booking.statusHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Status Timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: booking.statusHistory.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary flex-shrink-0" }),
                i < booking.statusHistory.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium capitalize", children: String(h.status).replace(/([A-Z])/g, " $1") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(Number(h.timestamp)).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                }) })
              ] })
            ]
          },
          `${String(h.status)}-${i}`
        )) })
      ] })
    ] })
  ] }) });
}
function AssignDPModal({
  order,
  onClose,
  onAssigned
}) {
  const { data: dps = [] } = useDeliveryPartners();
  const [selectedDp, setSelectedDp] = reactExports.useState("");
  const assignDP = useAssignDeliveryPartner();
  if (!order) return null;
  async function handleAssign() {
    if (!selectedDp || !order) return;
    try {
      await assignDP.mutateAsync({ orderId: order.id, dpId: selectedDp });
      onAssigned();
      onClose();
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!order, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Assign Delivery Partner" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Order: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: order.id })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-60 overflow-y-auto", children: dps.map((dp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setSelectedDp(dp.id),
        className: `w-full text-left p-3 rounded-xl border transition-colors ${selectedDp === dp.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: dp.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground capitalize", children: [
              dp.vehicleType,
              " · ₹",
              dp.ratePerKm,
              "/km"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-amber-500 fill-amber-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: dp.avgRating })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-medium ${dp.isOnline ? "text-emerald-600" : "text-muted-foreground"}`,
                children: dp.isOnline ? "Online" : "Offline"
              }
            )
          ] })
        ] })
      },
      dp.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: handleAssign,
          disabled: !selectedDp || assignDP.isPending,
          "data-ocid": "assign-dp-confirm",
          children: assignDP.isPending ? "Assigning…" : "Assign"
        }
      )
    ] })
  ] }) });
}
function UpdateStatusModal({
  order,
  onClose,
  onUpdated
}) {
  const [newStatus, setNewStatus] = reactExports.useState("");
  const updateStatus = useUpdateOrderStatus();
  if (!order) return null;
  async function handleUpdate() {
    if (!newStatus || !order) return;
    try {
      await updateStatus.mutateAsync({
        id: order.id,
        status: newStatus
      });
      onUpdated();
      onClose();
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!order, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Update Order Status" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Order: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: order.id })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-status", children: "New Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: newStatus,
          onValueChange: (v) => setNewStatus(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "new-status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select status" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: handleUpdate,
          disabled: !newStatus || updateStatus.isPending,
          "data-ocid": "update-status-confirm",
          children: updateStatus.isPending ? "Updating…" : "Update Status"
        }
      )
    ] })
  ] }) });
}
function CommerceOrdersTab() {
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [ondcFilter, setOndcFilter] = reactExports.useState(
    "all"
  );
  const [searchInput, setSearchInput] = reactExports.useState("");
  const search = useDebounce(searchInput, 300);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [detailOrder, setDetailOrder] = reactExports.useState(null);
  const [assignDPOrder, setAssignDPOrder] = reactExports.useState(null);
  const [updateStatusOrder, setUpdateStatusOrder] = reactExports.useState(
    null
  );
  const [paymentQROrder, setPaymentQROrder] = reactExports.useState(null);
  const [bulkStatusDialog, setBulkStatusDialog] = reactExports.useState(false);
  const [bulkNewStatus, setBulkNewStatus] = reactExports.useState("");
  const [orderIdSort, setOrderIdSort] = reactExports.useState(null);
  const { data: allOrders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const ondcCount = allOrders.filter(
    (o) => o.ondcSource === true
  ).length;
  const filtered = reactExports.useMemo(() => {
    let result = allOrders;
    if (statusFilter !== "all")
      result = result.filter((o) => o.status === statusFilter);
    if (ondcFilter === "ondc")
      result = result.filter(
        (o) => o.ondcSource === true
      );
    else if (ondcFilter === "regular")
      result = result.filter(
        (o) => o.ondcSource !== true
      );
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) => o.id.toLowerCase().includes(q) || o.customerId.toLowerCase().includes(q) || o.merchantId.toLowerCase().includes(q)
      );
    }
    if (orderIdSort === "asc")
      result = [...result].sort((a, b) => a.id.localeCompare(b.id));
    else if (orderIdSort === "desc")
      result = [...result].sort((a, b) => b.id.localeCompare(a.id));
    return result;
  }, [allOrders, statusFilter, ondcFilter, search, orderIdSort]);
  const pagination = usePagination(filtered);
  function toggleRow(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    if (selected.size === filtered.length) setSelected(/* @__PURE__ */ new Set());
    else setSelected(new Set(filtered.map((o) => o.id)));
  }
  async function handleBulkUpdate() {
    if (!bulkNewStatus) return;
    try {
      await Promise.all(
        Array.from(selected).map(
          (id) => updateStatus.mutateAsync({
            id,
            status: bulkNewStatus
          })
        )
      );
      setSelected(/* @__PURE__ */ new Set());
      setBulkStatusDialog(false);
      setBulkNewStatus("");
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by order ID, customer, merchant…",
            value: searchInput,
            onChange: (e) => {
              setSearchInput(e.target.value);
              pagination.resetPage();
            },
            className: "pl-9",
            "data-ocid": "orders-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setBulkStatusDialog(true),
            "data-ocid": "orders-bulk-update",
            children: [
              "Bulk Update (",
              selected.size,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => exportToCSV(filtered),
            className: "gap-2",
            "data-ocid": "orders-export",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Export CSV"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", "data-ocid": "orders-status-filter", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setStatusFilter(s.value),
        className: `px-3 py-1.5 text-xs rounded-full border transition-colors font-medium ${statusFilter === s.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`,
        children: [
          s.label,
          s.value !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 opacity-70", children: allOrders.filter((o) => o.status === s.value).length })
        ]
      },
      s.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", "data-ocid": "orders.ondc_filter", children: [
      { label: "All Sources", value: "all" },
      {
        label: `ONDC (${ondcCount})`,
        value: "ondc"
      },
      { label: "Regular", value: "regular" }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setOndcFilter(f.value),
        className: `px-3 py-1.5 text-xs rounded-full border transition-colors font-medium ${ondcFilter === f.value ? "bg-blue-600 text-white border-blue-600" : "bg-card text-muted-foreground border-border hover:border-blue-400 hover:text-foreground"}`,
        "data-ocid": `orders.ondc_filter.${f.value}`,
        children: f.label
      },
      f.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: selected.size === filtered.length && filtered.length > 0,
            onCheckedChange: toggleAll,
            "aria-label": "Select all",
            "data-ocid": "orders-select-all"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOrderIdSort(
              (prev) => prev === null ? "asc" : prev === "asc" ? "desc" : null
            ),
            className: "inline-flex items-center gap-1 hover:text-foreground transition-colors",
            "data-ocid": "orders.order-id-sort",
            "aria-label": "Sort by Order ID",
            children: [
              "Order ID",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: orderIdSort === "asc" ? "↑" : orderIdSort === "desc" ? "↓" : "↕" })
            ]
          }
        ) }),
        [
          "Customer",
          "Merchant",
          "Items",
          "Total (₹)",
          "Delivery (₹)",
          "Status",
          "Payment",
          "Created",
          "Actions"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
            children: h
          },
          h
        ))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: Array.from({ length: 10 }, (_, j) => `sk-cell-${j}`).map(
        (cid) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted animate-pulse rounded" }) }, cid)
      ) }, id)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 11, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "commerce order" }) }) }) : pagination.items.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
          "data-ocid": `commerce-orders.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: selected.has(order.id),
                onCheckedChange: () => toggleRow(order.id),
                "aria-label": `Select order ${order.id}`,
                "data-ocid": "orders-row-checkbox"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
              order.id,
              order.ondcSource === true && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200", children: "ONDC" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[100px]", children: order.customerId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[100px]", children: order.merchantId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: order.items.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium tabular-nums", children: [
              "₹",
              order.totalAmount.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 tabular-nums text-muted-foreground", children: [
              "₹",
              order.deliveryCharge
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "order", value: order.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: order.paymentMode }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs whitespace-nowrap", children: new Date(Number(order.createdAt)).toLocaleDateString(
              "en-IN"
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-nowrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDetailOrder(order),
                  className: "px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors whitespace-nowrap",
                  "data-ocid": "orders-view-detail",
                  children: "View"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setUpdateStatusOrder(order),
                  className: "px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors whitespace-nowrap",
                  "data-ocid": "orders-update-status",
                  children: "Status"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPaymentQROrder(order),
                  className: "px-2 py-1 text-xs rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors whitespace-nowrap",
                  "data-ocid": "orders-show-payment-qr",
                  "aria-label": "Show payment QR",
                  title: "Show Payment QR",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setAssignDPOrder(order),
                  className: "px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors whitespace-nowrap",
                  "data-ocid": "orders-assign-dp",
                  "aria-label": "Assign delivery partner",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3 h-3" })
                }
              )
            ] }) })
          ]
        },
        order.id
      )) })
    ] }) }),
    pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between",
        "data-ocid": "commerce-orders.pagination",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            pagination.page,
            " of ",
            pagination.totalPages,
            " ·",
            " ",
            filtered.length,
            " orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 w-8 p-0",
                onClick: pagination.prevPage,
                disabled: pagination.page === 1,
                "data-ocid": "commerce-orders.pagination_prev",
                "aria-label": "Previous page",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            Array.from(
              { length: Math.min(pagination.totalPages, 7) },
              (_, i) => {
                const start = Math.max(1, pagination.page - 3);
                const p = start + i;
                if (p > pagination.totalPages) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: p === pagination.page ? "default" : "outline",
                    className: "h-8 w-8 p-0 text-xs",
                    onClick: () => pagination.goToPage(p),
                    "data-ocid": `commerce-orders.pagination.page.${p}`,
                    children: p
                  },
                  p
                );
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 w-8 p-0",
                onClick: pagination.nextPage,
                disabled: pagination.page === pagination.totalPages,
                "data-ocid": "commerce-orders.pagination_next",
                "aria-label": "Next page",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: bulkStatusDialog,
        onOpenChange: (o) => !o && setBulkStatusDialog(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Bulk Update Status" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            selected.size,
            " orders selected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: bulkNewStatus,
              onValueChange: (v) => setBulkNewStatus(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select new status" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setBulkStatusDialog(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: handleBulkUpdate,
                disabled: !bulkNewStatus || updateStatus.isPending,
                "data-ocid": "orders-bulk-confirm",
                children: updateStatus.isPending ? "Updating…" : `Update ${selected.size} Orders`
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderDetailSheet,
      {
        order: detailOrder,
        onClose: () => setDetailOrder(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AssignDPModal,
      {
        order: assignDPOrder,
        onClose: () => setAssignDPOrder(null),
        onAssigned: () => {
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UpdateStatusModal,
      {
        order: updateStatusOrder,
        onClose: () => setUpdateStatusOrder(null),
        onUpdated: () => {
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaymentQRModal,
      {
        order: paymentQROrder,
        onClose: () => setPaymentQROrder(null)
      }
    )
  ] });
}
function DeliveryOrdersTab() {
  const { data: deliveryOrders = [], isLoading } = useDeliveryOrders();
  const [detailOrder, setDetailOrder] = reactExports.useState(null);
  const [updateStatusOrder, setUpdateStatusOrder] = reactExports.useState(
    null
  );
  const [searchInput, setSearchInput] = reactExports.useState("");
  const search = useDebounce(searchInput, 300);
  const filtered = reactExports.useMemo(() => {
    if (!search.trim()) return deliveryOrders;
    const q = search.toLowerCase();
    return deliveryOrders.filter(
      (o) => o.id.toLowerCase().includes(q) || o.customerId.toLowerCase().includes(q) || o.merchantId.toLowerCase().includes(q) || (o.deliveryPartnerId ?? "").toLowerCase().includes(q)
    );
  }, [deliveryOrders, search]);
  const pagination = usePagination(filtered);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by order ID, customer, merchant, DP…",
          value: searchInput,
          onChange: (e) => {
            setSearchInput(e.target.value);
            pagination.resetPage();
          },
          className: "pl-9",
          "data-ocid": "delivery-orders-search"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
        "Order ID",
        "Customer",
        "Merchant",
        "Delivery Partner",
        "Items",
        "Total (₹)",
        "Status",
        "Updated At",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: Array.from({ length: 9 }, (_, j) => `sk-${j}`).map((cid) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted animate-pulse rounded" }) }, cid)) }, id)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "delivery order" }) }) }) : pagination.items.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
          "data-ocid": `delivery-orders.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs font-medium", children: order.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[100px]", children: order.customerId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[100px]", children: order.merchantId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs truncate max-w-[100px]", children: order.deliveryPartnerId ?? "—" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: order.items.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium tabular-nums", children: [
              "₹",
              order.totalAmount.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "order", value: order.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs whitespace-nowrap", children: new Date(
              Number(
                order.deliveredAt ?? order.assignedAt ?? order.acceptedAt ?? order.createdAt
              )
            ).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDetailOrder(order),
                  className: "px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors",
                  "data-ocid": "delivery-orders-view-detail",
                  children: "View"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setUpdateStatusOrder(order),
                  className: "px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors",
                  "data-ocid": "delivery-orders-update-status",
                  children: "Status"
                }
              )
            ] }) })
          ]
        },
        order.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderDetailSheet,
      {
        order: detailOrder,
        onClose: () => setDetailOrder(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UpdateStatusModal,
      {
        order: updateStatusOrder,
        onClose: () => setUpdateStatusOrder(null),
        onUpdated: () => {
        }
      }
    ),
    pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between",
        "data-ocid": "delivery-orders.pagination",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            pagination.page,
            " of ",
            pagination.totalPages,
            " ·",
            " ",
            filtered.length,
            " orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 gap-1.5",
                onClick: pagination.prevPage,
                disabled: pagination.page === 1,
                "data-ocid": "delivery-orders.pagination_prev",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  " Prev"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground tabular-nums", children: [
              pagination.page,
              " / ",
              pagination.totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 gap-1.5",
                onClick: pagination.nextPage,
                disabled: pagination.page === pagination.totalPages,
                "data-ocid": "delivery-orders.pagination_next",
                children: [
                  "Next ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function SarthiRidesTab() {
  const { data: rides = [], isLoading } = useSarthiRideBookings();
  const [detailBooking, setDetailBooking] = reactExports.useState(
    null
  );
  const [searchInput, setSearchInput] = reactExports.useState("");
  const search = useDebounce(searchInput, 300);
  const filtered = reactExports.useMemo(() => {
    if (!search.trim()) return rides;
    const q = search.toLowerCase();
    return rides.filter(
      (r) => r.id.toLowerCase().includes(q) || r.customerId.toLowerCase().includes(q) || (r.sarthiPartnerId ?? "").toLowerCase().includes(q) || r.origin.address.toLowerCase().includes(q) || r.destination.address.toLowerCase().includes(q)
    );
  }, [rides, search]);
  const pagination = usePagination(filtered);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by booking ID, customer, partner, location…",
          value: searchInput,
          onChange: (e) => {
            setSearchInput(e.target.value);
            pagination.resetPage();
          },
          className: "pl-9",
          "data-ocid": "sarthi-rides-search"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
        "Booking ID",
        "Customer",
        "Sarthi Partner",
        "Vehicle",
        "Origin",
        "Destination",
        "Charge (₹)",
        "Status",
        "Created At",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: Array.from({ length: 10 }, (_, j) => `sk-${j}`).map(
        (cid) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted animate-pulse rounded" }) }, cid)
      ) }, id)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 10, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "Sarthi ride" }) }) }) : pagination.items.map((ride, idx) => {
        const cfg = TRANSPORT_STATUS_CONFIG[String(ride.status)] ?? {
          label: String(ride.status),
          className: "bg-muted text-muted-foreground border-border"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
            "data-ocid": `sarthi-rides.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs font-medium", children: ride.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[90px]", children: ride.customerId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[90px]", children: ride.sarthiPartnerId ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 capitalize text-muted-foreground", children: String(ride.vehicleType) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 truncate max-w-[100px] text-muted-foreground", children: ride.origin.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 truncate max-w-[100px] text-muted-foreground", children: ride.destination.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium tabular-nums", children: [
                "₹",
                ride.estimatedCharge.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`,
                  children: cfg.label
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs whitespace-nowrap", children: new Date(Number(ride.createdAt)).toLocaleDateString(
                "en-IN"
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDetailBooking(ride),
                  className: "px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors",
                  "data-ocid": "sarthi-rides-view-detail",
                  children: "View"
                }
              ) })
            ]
          },
          ride.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SarthiDetailSheet,
      {
        booking: detailBooking,
        onClose: () => setDetailBooking(null)
      }
    ),
    pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between",
        "data-ocid": "sarthi-rides.pagination",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            pagination.page,
            " of ",
            pagination.totalPages,
            " ·",
            " ",
            filtered.length,
            " rides"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 gap-1.5",
                onClick: pagination.prevPage,
                disabled: pagination.page === 1,
                "data-ocid": "sarthi-rides.pagination_prev",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  " Prev"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground tabular-nums", children: [
              pagination.page,
              " / ",
              pagination.totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 gap-1.5",
                onClick: pagination.nextPage,
                disabled: pagination.page === pagination.totalPages,
                "data-ocid": "sarthi-rides.pagination_next",
                children: [
                  "Next ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function OrdersPage() {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const initialTab = searchParams.get("tab") ?? "commerce";
  const [activeTab, setActiveTab] = reactExports.useState(
    ["commerce", "delivery", "sarthi"].includes(initialTab) ? initialTab : "commerce"
  );
  const { data: allOrders = [] } = useOrders();
  const { data: deliveryOrders = [] } = useDeliveryOrders();
  const { data: sarthiRides = [] } = useSarthiRideBookings();
  function switchTab(tab) {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
  }
  const tabs = [
    {
      id: "commerce",
      label: "Commerce Orders",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
      count: allOrders.length
    },
    {
      id: "delivery",
      label: "Delivery Orders",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }),
      count: deliveryOrders.length
    },
    {
      id: "sarthi",
      label: "Sarthi Rides",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
      count: sarthiRides.length
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        allOrders.length,
        " commerce · ",
        deliveryOrders.length,
        " delivery ·",
        " ",
        sarthiRides.length,
        " rides"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-0.5 bg-muted/40 rounded-xl p-1 w-fit border border-border",
        "data-ocid": "orders.tab",
        role: "tablist",
        "aria-label": "Orders tabs",
        children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": activeTab === tab.id,
            onClick: () => switchTab(tab.id),
            "data-ocid": `orders.tab.${tab.id}`,
            className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-card text-foreground shadow-sm border border-border/50" : "text-muted-foreground hover:text-foreground hover:bg-card/60"}`,
            children: [
              tab.icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: tab.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: tab.id === "commerce" ? "Commerce" : tab.id === "delivery" ? "Delivery" : "Sarthi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `min-w-[20px] text-center text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                  children: tab.count
                }
              )
            ]
          },
          tab.id
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "tabpanel", children: [
      activeTab === "commerce" && /* @__PURE__ */ jsxRuntimeExports.jsx(CommerceOrdersTab, {}),
      activeTab === "delivery" && /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryOrdersTab, {}),
      activeTab === "sarthi" && /* @__PURE__ */ jsxRuntimeExports.jsx(SarthiRidesTab, {})
    ] })
  ] });
}
export {
  OrdersPage as default
};
