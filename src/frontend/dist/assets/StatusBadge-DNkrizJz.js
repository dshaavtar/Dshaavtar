import { j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
const ORDER_STATUS_MAP = {
  // new_ enum value maps to string "new" in backend
  new: { label: "New Order", variant: "info" },
  new_: { label: "New Order", variant: "info" },
  pending: { label: "Waiting for Merchant", variant: "warning" },
  accepted: { label: "Merchant Accepted", variant: "purple" },
  rejected: { label: "Rejected", variant: "error" },
  assigned: { label: "Delivery Partner Assigned", variant: "info" },
  inTransit: { label: "Out for Delivery", variant: "orange" },
  delivered: { label: "Delivered", variant: "teal" },
  paymentCollected: { label: "Payment Collected", variant: "success" },
  vendorSettled: { label: "Vendor Settled", variant: "success-dark" },
  completed: { label: "Order Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "neutral" }
};
const VERIFICATION_STATUS_MAP = {
  verified: { label: "Verified", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  rejected: { label: "Rejected", variant: "error" }
};
const NOTIFICATION_STATUS_MAP = {
  sent: { label: "Sent", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  failed: { label: "Failed", variant: "error" }
};
const VARIANT_CLASSES = {
  success: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  "success-dark": "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700",
  warning: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  error: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  info: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  neutral: "bg-muted text-muted-foreground border-border",
  purple: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800",
  teal: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800",
  orange: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
};
function StatusBadge({
  type,
  value,
  trueLabel = "Active",
  falseLabel = "Inactive"
}) {
  let config;
  if (type === "boolean") {
    config = value ? { label: trueLabel, variant: "success" } : { label: falseLabel, variant: "neutral" };
  } else if (type === "order") {
    config = ORDER_STATUS_MAP[value] ?? {
      label: String(value),
      variant: "neutral"
    };
  } else if (type === "verification") {
    config = VERIFICATION_STATUS_MAP[value] ?? {
      label: String(value),
      variant: "neutral"
    };
  } else if (type === "notification") {
    config = NOTIFICATION_STATUS_MAP[value] ?? {
      label: String(value),
      variant: "neutral"
    };
  } else {
    config = { label: String(value), variant: "neutral" };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${VARIANT_CLASSES[config.variant]}`,
      children: config.label
    }
  );
}
export {
  ORDER_STATUS_MAP as O,
  StatusBadge as S
};
