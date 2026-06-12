import { aV as usePlans, aW as useCreatePlan, aX as useUpdatePlan, aY as useDeletePlan, aZ as useGetAdminUPIProfile, a_ as useSetAdminUPIProfile, r as reactExports, ab as useQRTimeoutMinutes, a$ as useGetSubscriptionDiscountForMerchant, U as UserRole, b0 as SubscriptionPlanType, j as jsxRuntimeExports, L as Link, p as ue, b1 as saveQRTimeoutMinutes, b2 as generateSubscriptionOrderId, b3 as useConfirmSubscriptionQRPayment, b4 as useGenerateSubscriptionQR, b5 as useConfirmSubscriptionPayment } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Separator } from "./separator-DqiCXh2l.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { Q as QrCode } from "./qr-code-CVNmsjZi.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Sparkles, L as LayoutGrid } from "./sparkles-DWpRMJ8z.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { T as Tag } from "./tag-DM1LGoN5.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { B as Briefcase } from "./briefcase-CIHVnHgq.js";
import { H as House } from "./house-DQF9lC4w.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { M as Megaphone } from "./megaphone-BO0GtYln.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { P as Pencil } from "./pencil-9uzHrD9X.js";
import { I as IndianRupee } from "./indian-rupee-4FVPRNFh.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { S as Save } from "./save-De3uJrwe.js";
import { S as Smartphone } from "./smartphone-CYA8tykz.js";
import { S as Settings } from "./settings-CDqnrNMc.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { C as CreditCard } from "./credit-card-CP3NtRg6.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode);
function buildQrImageUrl(data, size = 200) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}
function QRTimerDisplay({
  expiresAt,
  onExpire
}) {
  const [remaining, setRemaining] = reactExports.useState(
    () => Math.max(0, expiresAt - Date.now())
  );
  reactExports.useEffect(() => {
    const tick = setInterval(() => {
      const rem = Math.max(0, expiresAt - Date.now());
      setRemaining(rem);
      if (rem === 0) {
        clearInterval(tick);
        onExpire == null ? void 0 : onExpire();
      }
    }, 1e3);
    return () => clearInterval(tick);
  }, [expiresAt, onExpire]);
  const mins = Math.floor(remaining / 6e4);
  const secs = Math.floor(remaining % 6e4 / 1e3);
  const isUrgent = remaining < 12e4;
  const expired = remaining === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono ${expired ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : isUrgent ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-muted text-muted-foreground"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 shrink-0" }),
        expired ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "QR Expired" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "QR expires in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            mins,
            ":",
            secs.toString().padStart(2, "0")
          ] })
        ] })
      ]
    }
  );
}
function SubscriptionRedirectModal({
  plans,
  userId,
  onSuccess
}) {
  const [selectedPlan, setSelectedPlan] = reactExports.useState(
    null
  );
  const [txRef, setTxRef] = reactExports.useState("");
  const [step, setStep] = reactExports.useState("plans");
  const [qrExpired, setQrExpired] = reactExports.useState(false);
  const [orderId] = reactExports.useState(() => generateSubscriptionOrderId());
  const confirmQR = useConfirmSubscriptionQRPayment();
  const { data: qrData } = useGenerateSubscriptionQR(
    (selectedPlan == null ? void 0 : selectedPlan.id) ?? ""
  );
  const amount = selectedPlan ? Number(selectedPlan.flatFee ?? selectedPlan.priceFlat ?? 0) : 0;
  const isFree = (selectedPlan == null ? void 0 : selectedPlan.planType) === SubscriptionPlanType.free || selectedPlan && amount === 0 && Number(
    selectedPlan.percentageFee ?? selectedPlan.pricePercentage ?? 0
  ) === 0;
  const qrUpiData = qrData ? qrData.qrData : selectedPlan && !isFree ? `upi://pay?pa=whatscart@upi&pn=WhatsCart&am=${amount}&cu=INR&tn=${encodeURIComponent(selectedPlan.name)}` : "";
  const qrExpiresAt = qrData ? Number(qrData.expiresAt) : Date.now() + 15 * 60 * 1e3;
  async function handleConfirmPayment() {
    if (!selectedPlan) return;
    if (!isFree && !txRef.trim()) {
      ue.error("Please enter the transaction reference");
      return;
    }
    try {
      await confirmQR.mutateAsync({
        planId: selectedPlan.id,
        userId,
        transactionRef: isFree ? "FREE_PLAN" : txRef.trim()
      });
      setStep("done");
    } catch {
      ue.error("Payment confirmation failed. Please try again.");
    }
  }
  if (step === "done") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-emerald-600 dark:text-emerald-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: "Subscription Active!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "Your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedPlan == null ? void 0 : selectedPlan.name }),
          " plan is now active."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onSuccess,
          className: "w-full max-w-xs",
          "data-ocid": "sub-redirect.done-button",
          children: "Continue to Dashboard"
        }
      )
    ] });
  }
  if (step === "qr" && selectedPlan) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: selectedPlan.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-primary mt-1", children: [
          isFree ? "Free" : `₹${amount.toLocaleString("en-IN")}`,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground ml-1", children: selectedPlan.planType === SubscriptionPlanType.weekly ? "/week" : selectedPlan.planType === SubscriptionPlanType.monthly ? "/month" : "" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1 font-mono", children: [
          "Order ID:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: orderId })
        ] })
      ] }),
      !isFree && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          qrExpired ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 h-48 rounded-xl border-2 border-dashed border-red-300 dark:border-red-700 flex flex-col items-center justify-center gap-2 bg-red-50 dark:bg-red-950/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-red-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600 dark:text-red-400 font-medium", children: "QR Expired" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => setQrExpired(false),
                className: "text-xs",
                children: "Refresh QR"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: buildQrImageUrl(qrUpiData, 180),
              alt: "UPI Payment QR Code",
              width: 180,
              height: 180,
              className: "rounded-lg",
              "data-ocid": "sub-redirect.qr-code"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QRTimerDisplay,
            {
              expiresAt: qrExpiresAt,
              onExpire: () => setQrExpired(true)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scan with PhonePe, GPay, Paytm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Transaction Reference / UTR Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: txRef,
              onChange: (e) => setTxRef(e.target.value),
              placeholder: "e.g. 413456789012",
              "data-ocid": "sub-redirect.tx-ref-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter the UTR or transaction reference from your UPI app after payment" })
        ] })
      ] }),
      isFree && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "This is a free plan — click below to activate instantly." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setStep("plans"),
            "data-ocid": "sub-redirect.back-button",
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1",
            onClick: handleConfirmPayment,
            disabled: confirmQR.isPending || qrExpired || !isFree && !txRef.trim(),
            "data-ocid": "sub-redirect.confirm-button",
            children: confirmQR.isPending ? "Activating…" : isFree ? "Activate Free Plan" : "Confirm Payment"
          }
        )
      ] })
    ] });
  }
  const visiblePlans = plans.filter((p) => p.isActive).slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choose a plan to continue. Free plans include daily usage limits." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-1", children: visiblePlans.map((plan) => {
      const planAmount = Number(plan.flatFee ?? plan.priceFlat ?? 0);
      const isFreeP = plan.planType === SubscriptionPlanType.free || planAmount === 0 && Number(plan.percentageFee ?? plan.pricePercentage ?? 0) === 0;
      const isSelected = (selectedPlan == null ? void 0 : selectedPlan.id) === plan.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedPlan(plan),
          className: `w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
          "data-ocid": `sub-redirect.plan-${plan.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: plan.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: plan.features.slice(0, 2).join(" · ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary", children: isFreeP ? "Free" : `₹${planAmount.toLocaleString("en-IN")}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: plan.planType === SubscriptionPlanType.weekly ? "/week" : plan.planType === SubscriptionPlanType.monthly ? "/month" : "" })
            ] })
          ] })
        },
        plan.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "w-full",
        disabled: !selectedPlan,
        onClick: () => setStep("qr"),
        "data-ocid": "sub-redirect.next-button",
        children: selectedPlan ? `Continue with ${selectedPlan.name}` : "Select a plan to continue"
      }
    )
  ] });
}
function PaymentModal({
  plan,
  onClose
}) {
  const [phone, setPhone] = reactExports.useState("");
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const [orderId] = reactExports.useState(() => generateSubscriptionOrderId());
  const confirmPayment = useConfirmSubscriptionPayment();
  const isFree = plan.planType === SubscriptionPlanType.free || Number(plan.flatFee ?? plan.priceFlat ?? 0) === 0 && Number(plan.percentageFee ?? plan.pricePercentage ?? 0) === 0;
  const amount = Number(plan.flatFee ?? plan.priceFlat ?? 0);
  const qrData = plan.qrCodeData || `upi://pay?pa=whatscart@upi&pn=WhatsCart&am=${amount}&cu=INR&tn=${encodeURIComponent(plan.name)}`;
  async function handleConfirm() {
    if (!phone.trim()) {
      ue.error("Please enter your phone number");
      return;
    }
    try {
      await confirmPayment.mutateAsync({
        planId: plan.id,
        phone: phone.trim()
      });
      setConfirmed(true);
      ue.success("Subscription activated!");
    } catch {
      ue.error("Payment confirmation failed. Please try again.");
    }
  }
  if (confirmed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", "data-ocid": "payment.success_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Payment Confirmed!" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-emerald-600 dark:text-emerald-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: plan.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your subscription is now active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full",
            onClick: onClose,
            "data-ocid": "payment.close_button",
            children: "Done"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-sm max-h-[92vh] overflow-y-auto",
      "data-ocid": "payment.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-primary" }),
          isFree ? "Activate Free Plan" : "Pay & Subscribe"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: plan.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-primary", children: [
              isFree ? "Free" : `₹${amount.toLocaleString("en-IN")}`,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground ml-1", children: plan.planType === SubscriptionPlanType.weekly ? "/week" : plan.planType === SubscriptionPlanType.monthly ? "/month" : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1 font-mono", children: [
              "Order ID:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: orderId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5 mt-2", children: plan.features.slice(0, 3).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-1.5 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 text-emerald-500 shrink-0" }),
                  f
                ]
              },
              f
            )) })
          ] }),
          !isFree && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: buildQrImageUrl(qrData, 200),
                alt: "UPI Payment QR Code",
                width: 200,
                height: 200,
                className: "rounded-lg",
                "data-ocid": "payment.qr_code"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scan with any UPI app (PhonePe, GPay, Paytm)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-center text-muted-foreground", children: [
              "UPI ID:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "whatscart@upi" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Your Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "+91 98765 43210",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                "data-ocid": "payment.phone_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Used to activate your subscription" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "payment.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: handleConfirm,
                disabled: confirmPayment.isPending || !phone.trim(),
                "data-ocid": "payment.confirm_button",
                children: confirmPayment.isPending ? "Activating…" : isFree ? "Activate Free Plan" : "I Have Paid"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const ACTIVE_SUBS = [
  {
    id: "sub1",
    userName: "Sharma Kirana Store",
    role: UserRole.merchant,
    planName: "Monthly Business",
    planType: SubscriptionPlanType.monthly,
    startDate: "2026-03-15",
    endDate: "2026-04-14",
    ordersUsed: 187,
    ordersLimit: 500,
    inquiriesUsed: 42,
    inquiriesLimit: 200,
    status: "active"
  },
  {
    id: "sub2",
    userName: "Patel Fast Food",
    role: UserRole.merchant,
    planName: "Weekly Pro",
    planType: SubscriptionPlanType.weekly,
    startDate: "2026-04-10",
    endDate: "2026-04-17",
    ordersUsed: 61,
    ordersLimit: 100,
    inquiriesUsed: 28,
    inquiriesLimit: 50,
    status: "active"
  },
  {
    id: "sub3",
    userName: "Ravi Thakur",
    role: UserRole.deliveryPartner,
    planName: "Delivery Monthly",
    planType: SubscriptionPlanType.monthly,
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    ordersUsed: 89,
    ordersLimit: 300,
    inquiriesUsed: 0,
    inquiriesLimit: 0,
    status: "expired"
  },
  {
    id: "sub4",
    userName: "Rajesh Kumar",
    role: UserRole.customer,
    planName: "Category Food Deal",
    planType: SubscriptionPlanType.category,
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    ordersUsed: 8,
    ordersLimit: 20,
    inquiriesUsed: 3,
    inquiriesLimit: 5,
    status: "active"
  },
  {
    id: "sub5",
    userName: "Meena Electronics",
    role: UserRole.merchant,
    planName: "90-Day Duration Plan",
    planType: SubscriptionPlanType.duration,
    startDate: "2026-02-01",
    endDate: "2026-05-01",
    ordersUsed: 230,
    ordersLimit: 1e3,
    inquiriesUsed: 15,
    inquiriesLimit: 100,
    status: "active"
  },
  {
    id: "sub6",
    userName: "Sunita Properties",
    role: UserRole.customer,
    planName: "Property Flat ₹199",
    planType: SubscriptionPlanType.flat,
    startDate: "2026-04-05",
    endDate: "2026-05-05",
    ordersUsed: 0,
    ordersLimit: 0,
    inquiriesUsed: 7,
    inquiriesLimit: 30,
    status: "active"
  },
  {
    id: "sub7",
    userName: "Arjun Job Portal",
    role: UserRole.customer,
    planName: "5% Commission Plan",
    planType: SubscriptionPlanType.percentage,
    startDate: "2026-04-10",
    endDate: "2026-05-10",
    ordersUsed: 44,
    ordersLimit: 200,
    inquiriesUsed: 11,
    inquiriesLimit: 50,
    status: "expiring"
  }
];
const PLAN_TYPE_CONFIG = {
  [SubscriptionPlanType.free]: {
    label: "Free",
    badgeCls: "bg-muted text-muted-foreground border-border",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
    tabCls: "data-[active=true]:border-border data-[active=true]:text-foreground"
  },
  [SubscriptionPlanType.monthly]: {
    label: "Subscription",
    badgeCls: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
    tabCls: "data-[active=true]:border-blue-500 data-[active=true]:text-blue-600"
  },
  [SubscriptionPlanType.weekly]: {
    label: "Subscription",
    badgeCls: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
    tabCls: "data-[active=true]:border-blue-500 data-[active=true]:text-blue-600"
  },
  [SubscriptionPlanType.duration]: {
    label: "Duration",
    badgeCls: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
    tabCls: "data-[active=true]:border-purple-500 data-[active=true]:text-purple-600"
  },
  [SubscriptionPlanType.category]: {
    label: "Category",
    badgeCls: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
    tabCls: "data-[active=true]:border-orange-500 data-[active=true]:text-orange-600"
  },
  [SubscriptionPlanType.flat]: {
    label: "Flat Rate",
    badgeCls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5" }),
    tabCls: "data-[active=true]:border-emerald-500 data-[active=true]:text-emerald-600"
  },
  [SubscriptionPlanType.percentage]: {
    label: "Percentage",
    badgeCls: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-3.5 h-3.5" }),
    tabCls: "data-[active=true]:border-yellow-500 data-[active=true]:text-yellow-600"
  }
};
const ROLE_COLORS = {
  merchant: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-700",
  delivery: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700",
  customer: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700",
  jobPoster: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-700",
  propertyPoster: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-700"
};
const STATUS_MAP = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
  expired: "bg-muted text-muted-foreground border-border",
  expiring: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
};
function roleLabel(role) {
  if (role === UserRole.deliveryPartner) return "Delivery Partner";
  if (role === "jobPoster") return "Job Poster";
  if (role === "propertyPoster") return "Property";
  return role.charAt(0).toUpperCase() + role.slice(1);
}
function priceSummary(plan) {
  const flat = Number(plan.flatFee ?? plan.priceFlat ?? 0);
  const pct = Number(plan.percentageFee ?? plan.pricePercentage ?? 0);
  if (flat > 0 && pct > 0) return `₹${flat.toLocaleString("en-IN")} + ${pct}%`;
  if (flat > 0) return `₹${flat.toLocaleString("en-IN")}`;
  if (pct > 0) return `${pct}% of txn`;
  return "Free";
}
function billingLabel(plan) {
  if (plan.planType === SubscriptionPlanType.weekly) return "/week";
  if (plan.planType === SubscriptionPlanType.monthly) return "/month";
  if (plan.planType === SubscriptionPlanType.duration)
    return `/${Number(plan.durationDays)} days`;
  if (plan.planType === SubscriptionPlanType.category)
    return plan.categoryScope ? ` (${plan.categoryScope})` : "";
  return "";
}
const DEFAULT_FORM = {
  name: "",
  planType: SubscriptionPlanType.monthly,
  targetRole: UserRole.merchant,
  applicableRoles: [UserRole.merchant],
  billingCycle: "monthly",
  priceFlat: "0",
  pricePercentage: "0",
  flatFee: "0",
  percentageFee: "0",
  minTransaction: "0",
  maxTransaction: "0",
  orderLimit: "100",
  inquiryLimit: "50",
  durationDays: "30",
  categoryScope: "",
  features: [],
  featureInput: "",
  isActive: true
};
const ALL_ROLES = [
  { value: UserRole.customer, label: "Customer" },
  { value: UserRole.merchant, label: "Merchant" },
  { value: UserRole.deliveryPartner, label: "Delivery Partner" },
  { value: "sarthi", label: "Sarthi" },
  { value: "jobPoster", label: "Job Poster" },
  { value: "propertyPoster", label: "Property Poster" },
  { value: "eventOrganiser", label: "Event Organiser" },
  { value: "promoter", label: "Promoter" },
  { value: "business", label: "Business" }
];
const SUBSCRIPTION_PLAN_TEMPLATES = [
  // ── CUSTOMER ──────────────────────────────────────────────────────────────
  {
    id: "tpl_cust_free_auto",
    name: "Customer Free Auto",
    role: "customer",
    roleLabel: "Customer",
    roleColor: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "daily",
    orderLimit: 10,
    inquiryLimit: 5,
    features: [
      "10 orders/day",
      "5 inquiries/day",
      "Browse products",
      "Track orders"
    ],
    isFree: true
  },
  {
    id: "tpl_cust_starter",
    name: "Customer Starter",
    role: "customer",
    roleLabel: "Customer",
    roleColor: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
    planType: SubscriptionPlanType.monthly,
    price: 49,
    billingCycle: "monthly",
    orderLimit: 45,
    inquiryLimit: 0,
    features: [
      "45 orders/month",
      "Unlimited inquiries",
      "Spend analysis",
      "Budget alerts"
    ],
    isFree: false
  },
  {
    id: "tpl_cust_pro",
    name: "Customer Pro",
    role: "customer",
    roleLabel: "Customer",
    roleColor: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
    planType: SubscriptionPlanType.monthly,
    price: 149,
    billingCycle: "monthly",
    orderLimit: 200,
    inquiryLimit: 0,
    features: [
      "200 orders/month",
      "Priority support",
      "Advanced spend analytics",
      "Exclusive offers"
    ],
    isFree: false,
    isPopular: true
  },
  // ── MERCHANT ──────────────────────────────────────────────────────────────
  {
    id: "tpl_merch_free",
    name: "Merchant Free",
    role: "merchant",
    roleLabel: "Merchant",
    roleColor: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 30,
    inquiryLimit: 0,
    features: ["30 orders/month", "1 branch", "Basic analytics"],
    isFree: true
  },
  {
    id: "tpl_merch_starter",
    name: "Merchant Starter",
    role: "merchant",
    roleLabel: "Merchant",
    roleColor: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    planType: SubscriptionPlanType.monthly,
    price: 299,
    billingCycle: "monthly",
    orderLimit: 200,
    inquiryLimit: 0,
    features: [
      "200 orders/month",
      "Multi-branch",
      "Excel product upload",
      "Enhanced analytics"
    ],
    isFree: false
  },
  {
    id: "tpl_merch_pro",
    name: "Merchant Pro",
    role: "merchant",
    roleLabel: "Merchant",
    roleColor: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    planType: SubscriptionPlanType.monthly,
    price: 799,
    billingCycle: "monthly",
    orderLimit: 1e3,
    inquiryLimit: 0,
    features: [
      "1000 orders/month",
      "Unlimited branches",
      "Bulk customer upload",
      "Promo broadcasts",
      "Priority listing"
    ],
    isFree: false,
    isPopular: true
  },
  {
    id: "tpl_merch_enterprise",
    name: "Merchant Enterprise",
    role: "merchant",
    roleLabel: "Merchant",
    roleColor: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    planType: SubscriptionPlanType.monthly,
    price: 1999,
    billingCycle: "monthly",
    orderLimit: 0,
    inquiryLimit: 0,
    features: [
      "Unlimited orders",
      "API access",
      "Dedicated support",
      "ONDC enrollment",
      "Fake order boost"
    ],
    isFree: false,
    isEnterprise: true
  },
  // ── DELIVERY PARTNER ──────────────────────────────────────────────────────
  {
    id: "tpl_dp_free",
    name: "Delivery Free",
    role: "delivery_partner",
    roleLabel: "Delivery Partner",
    roleColor: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 20,
    inquiryLimit: 0,
    features: ["20 deliveries/month", "Basic earnings dashboard"],
    isFree: true
  },
  {
    id: "tpl_dp_pro",
    name: "Delivery Pro",
    role: "delivery_partner",
    roleLabel: "Delivery Partner",
    roleColor: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
    planType: SubscriptionPlanType.monthly,
    price: 199,
    billingCycle: "monthly",
    orderLimit: 500,
    inquiryLimit: 0,
    features: [
      "500 deliveries/month",
      "Petrol expense tracking",
      "Earnings analytics",
      "Tips enabled"
    ],
    isFree: false,
    isPopular: true
  },
  // ── SARTHI ────────────────────────────────────────────────────────────────
  {
    id: "tpl_sarthi_free",
    name: "Sarthi Free",
    role: "sarthi",
    roleLabel: "Sarthi",
    roleColor: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 15,
    inquiryLimit: 0,
    features: ["15 rides/month", "Basic dashboard"],
    isFree: true
  },
  {
    id: "tpl_sarthi_pro",
    name: "Sarthi Pro",
    role: "sarthi",
    roleLabel: "Sarthi",
    roleColor: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400",
    planType: SubscriptionPlanType.monthly,
    price: 249,
    billingCycle: "monthly",
    orderLimit: 300,
    inquiryLimit: 0,
    features: [
      "300 rides/month",
      "Tips enabled",
      "Earnings analytics",
      "Ride history"
    ],
    isFree: false,
    isPopular: true
  },
  // ── JOB POSTING ───────────────────────────────────────────────────────────
  {
    id: "tpl_job_basic",
    name: "Job Basic",
    role: "jobPoster",
    roleLabel: "Job Poster",
    roleColor: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 3,
    inquiryLimit: 0,
    features: ["3 job postings/month", "Standard listing"],
    isFree: true
  },
  {
    id: "tpl_job_starter",
    name: "Job Starter",
    role: "jobPoster",
    roleLabel: "Job Poster",
    roleColor: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400",
    planType: SubscriptionPlanType.monthly,
    price: 199,
    billingCycle: "monthly",
    orderLimit: 10,
    inquiryLimit: 0,
    features: ["10 job postings/month", "Featured listing", "AI descriptions"],
    isFree: false
  },
  {
    id: "tpl_job_pro",
    name: "Job Pro",
    role: "jobPoster",
    roleLabel: "Job Poster",
    roleColor: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400",
    planType: SubscriptionPlanType.monthly,
    price: 499,
    billingCycle: "monthly",
    orderLimit: 50,
    inquiryLimit: 0,
    features: ["50 job postings/month", "Top placement", "Applicant analytics"],
    isFree: false,
    isPopular: true
  },
  // ── PROPERTY POSTING ──────────────────────────────────────────────────────
  {
    id: "tpl_prop_basic",
    name: "Property Basic",
    role: "propertyPoster",
    roleLabel: "Property",
    roleColor: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 2,
    inquiryLimit: 0,
    features: ["2 property listings/month", "Standard listing"],
    isFree: true
  },
  {
    id: "tpl_prop_starter",
    name: "Property Starter",
    role: "propertyPoster",
    roleLabel: "Property",
    roleColor: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
    planType: SubscriptionPlanType.monthly,
    price: 299,
    billingCycle: "monthly",
    orderLimit: 5,
    inquiryLimit: 0,
    features: [
      "5 listings/month",
      "Featured placement",
      "AI descriptions",
      "Inquiry analytics"
    ],
    isFree: false
  },
  {
    id: "tpl_prop_pro",
    name: "Property Pro",
    role: "propertyPoster",
    roleLabel: "Property",
    roleColor: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
    planType: SubscriptionPlanType.monthly,
    price: 799,
    billingCycle: "monthly",
    orderLimit: 20,
    inquiryLimit: 0,
    features: [
      "20 listings/month",
      "Priority listing",
      "Video tours",
      "Advanced analytics"
    ],
    isFree: false,
    isPopular: true
  },
  // ── EVENT ORGANISER ───────────────────────────────────────────────────────
  {
    id: "tpl_event_basic",
    name: "Event Basic",
    role: "eventOrganiser",
    roleLabel: "Event Organiser",
    roleColor: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 1,
    inquiryLimit: 0,
    features: ["1 event/month", "Standard listing", "Basic reach"],
    isFree: true
  },
  {
    id: "tpl_event_starter",
    name: "Event Starter",
    role: "eventOrganiser",
    roleLabel: "Event Organiser",
    roleColor: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400",
    planType: SubscriptionPlanType.monthly,
    price: 399,
    billingCycle: "monthly",
    orderLimit: 5,
    inquiryLimit: 0,
    features: [
      "5 events/month",
      "Featured listing",
      "Promotion reach",
      "Ticket management"
    ],
    isFree: false
  },
  {
    id: "tpl_event_pro",
    name: "Event Pro",
    role: "eventOrganiser",
    roleLabel: "Event Organiser",
    roleColor: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400",
    planType: SubscriptionPlanType.monthly,
    price: 999,
    billingCycle: "monthly",
    orderLimit: 20,
    inquiryLimit: 0,
    features: [
      "20 events/month",
      "Priority listing",
      "Multi-city reach",
      "Analytics dashboard"
    ],
    isFree: false,
    isPopular: true
  },
  // ── PROMOTION / ADVERTISING ───────────────────────────────────────────────
  {
    id: "tpl_promo_basic",
    name: "Promo Basic",
    role: "promoter",
    roleLabel: "Promoter",
    roleColor: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 2,
    inquiryLimit: 0,
    features: ["2 promotions/month", "Standard reach", "Basic analytics"],
    isFree: true
  },
  {
    id: "tpl_promo_starter",
    name: "Promo Starter",
    role: "promoter",
    roleLabel: "Promoter",
    roleColor: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
    planType: SubscriptionPlanType.monthly,
    price: 299,
    billingCycle: "monthly",
    orderLimit: 10,
    inquiryLimit: 0,
    features: ["10 promotions/month", "Enhanced reach", "Click analytics"],
    isFree: false
  },
  {
    id: "tpl_promo_pro",
    name: "Promo Pro",
    role: "promoter",
    roleLabel: "Promoter",
    roleColor: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
    planType: SubscriptionPlanType.monthly,
    price: 799,
    billingCycle: "monthly",
    orderLimit: 50,
    inquiryLimit: 0,
    features: [
      "50 promotions/month",
      "Influencer network",
      "Advanced targeting",
      "ROI analytics"
    ],
    isFree: false,
    isPopular: true
  },
  // ── BUSINESS DELIVERY ASSIGNMENT ──────────────────────────────────────────
  {
    id: "tpl_biz_25",
    name: "Business 25 Users",
    role: "business",
    roleLabel: "Business",
    roleColor: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400",
    planType: SubscriptionPlanType.monthly,
    price: 2499,
    billingCycle: "monthly",
    orderLimit: 0,
    inquiryLimit: 0,
    assignedUsers: 25,
    features: [
      "25 dedicated delivery users",
      "Real-time tracking",
      "Utilization dashboard",
      "Priority assignment",
      "Prepaid monthly",
      "Custom SLA"
    ],
    isFree: false
  },
  {
    id: "tpl_biz_50",
    name: "Business 50 Users",
    role: "business",
    roleLabel: "Business",
    roleColor: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400",
    planType: SubscriptionPlanType.monthly,
    price: 4499,
    billingCycle: "monthly",
    orderLimit: 0,
    inquiryLimit: 0,
    assignedUsers: 50,
    features: [
      "50 dedicated delivery users",
      "Real-time tracking",
      "Advanced analytics",
      "Priority assignment",
      "Prepaid monthly",
      "Dedicated support",
      "Custom SLA"
    ],
    isFree: false,
    isPopular: true
  },
  {
    id: "tpl_biz_75",
    name: "Business 75 Users",
    role: "business",
    roleLabel: "Business",
    roleColor: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400",
    planType: SubscriptionPlanType.monthly,
    price: 6499,
    billingCycle: "monthly",
    orderLimit: 0,
    inquiryLimit: 0,
    assignedUsers: 75,
    features: [
      "75 dedicated delivery users",
      "Real-time tracking",
      "Enterprise analytics",
      "Priority assignment",
      "Prepaid monthly",
      "24/7 dedicated support",
      "Custom SLA",
      "API integration"
    ],
    isFree: false,
    isEnterprise: true
  }
];
const TEMPLATE_GROUPS = [
  {
    role: "customer",
    label: "Customer",
    icon: Users,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30"
  },
  {
    role: "merchant",
    label: "Merchant",
    icon: Tag,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30"
  },
  {
    role: "delivery_partner",
    label: "Delivery Partner",
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30"
  },
  {
    role: "sarthi",
    label: "Sarthi",
    icon: Zap,
    color: "text-teal-600",
    bg: "bg-teal-50 dark:bg-teal-950/30"
  },
  {
    role: "jobPoster",
    label: "Job Posting",
    icon: Briefcase,
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30"
  },
  {
    role: "propertyPoster",
    label: "Property",
    icon: House,
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/30"
  },
  {
    role: "eventOrganiser",
    label: "Event Organiser",
    icon: Calendar,
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-950/30"
  },
  {
    role: "promoter",
    label: "Promotion / Ads",
    icon: Megaphone,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/30"
  },
  {
    role: "business",
    label: "Business Delivery",
    icon: Truck,
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-950/30"
  }
];
function MetricCard({
  icon,
  label,
  value,
  sub,
  colorCls
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-start gap-4 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorCls}`,
        children: icon
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground tabular-nums", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
}
function PlanCard({
  plan,
  onEdit,
  onAssign,
  onDelete,
  onPay
}) {
  const cfg = PLAN_TYPE_CONFIG[plan.planType];
  const isPopular = plan.planType === SubscriptionPlanType.monthly;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border rounded-xl p-5 shadow-sm flex flex-col gap-3 transition-shadow hover:shadow-md ${isPopular ? "border-primary/40 ring-1 ring-primary/10" : "border-border"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            isPopular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2", children: "⭐ Popular" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm leading-tight truncate", children: plan.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-primary mt-1", children: [
              priceSummary(plan),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground ml-1", children: billingLabel(plan) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 items-end flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.badgeCls}`,
                children: [
                  cfg.icon,
                  cfg.label
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${plan.isActive ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground border-border"}`,
                children: plan.isActive ? "Active" : "Inactive"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: (plan.applicableRoles.length > 0 ? plan.applicableRoles : [plan.targetRole]).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${ROLE_COLORS[r] ?? ""}`,
            children: roleLabel(r)
          },
          r
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs bg-muted/40 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Orders/period" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: Number(plan.orderLimit) === 0 ? "Unlimited" : Number(plan.orderLimit) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Inquiries/day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: Number(plan.inquiryLimit) === 0 ? "Unlimited" : Number(plan.inquiryLimit) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
              Number(plan.durationDays),
              " days"
            ] })
          ] }),
          plan.categoryScope && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground capitalize truncate", children: plan.categoryScope })
          ] }),
          (Number(plan.minTransactionAmount ?? 0) > 0 || Number(plan.maxTransactionAmount ?? 0) > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Transaction range" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
              "₹",
              Number(plan.minTransactionAmount ?? 0).toLocaleString("en-IN"),
              " ",
              "– ₹",
              Number(plan.maxTransactionAmount ?? 0).toLocaleString("en-IN")
            ] })
          ] })
        ] }),
        plan.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 flex-1", children: [
          plan.features.slice(0, 4).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-xs text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: f })
              ]
            },
            f
          )),
          plan.features.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-muted-foreground pl-5", children: [
            "+",
            plan.features.length - 4,
            " more"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full text-xs gap-1.5",
              size: "sm",
              onClick: () => onPay(plan),
              "data-ocid": `plan-pay-${plan.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" }),
                plan.planType === SubscriptionPlanType.free ? "Activate Free Plan" : "Pay & Subscribe"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-xs",
                onClick: () => onEdit(plan),
                "data-ocid": `plan-edit-${plan.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3 mr-1" }),
                  " Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-xs",
                onClick: () => onAssign(plan),
                "data-ocid": `plan-assign-${plan.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3 h-3 mr-1" }),
                  " Assign"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-xs text-destructive hover:text-destructive",
                onClick: () => onDelete(plan.id),
                "data-ocid": `plan-delete-${plan.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1" }),
                  " Delete"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const PLAN_TYPE_TABS = [
  {
    key: "all",
    label: "All Plans",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-3.5 h-3.5" })
  },
  {
    key: SubscriptionPlanType.monthly,
    label: "Subscription",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" })
  },
  {
    key: SubscriptionPlanType.duration,
    label: "Duration",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" })
  },
  {
    key: SubscriptionPlanType.category,
    label: "Category",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" })
  },
  {
    key: SubscriptionPlanType.flat,
    label: "Flat Rate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5" })
  },
  {
    key: SubscriptionPlanType.percentage,
    label: "Percentage",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-3.5 h-3.5" })
  },
  {
    key: SubscriptionPlanType.free,
    label: "Free",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" })
  }
];
function SubscriptionsPage() {
  const { data: plans = [], isLoading } = usePlans();
  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();
  const deletePlan = useDeletePlan();
  const { data: upiProfile, isLoading: upiLoading } = useGetAdminUPIProfile();
  const setUPIProfile = useSetAdminUPIProfile();
  const [activeTab, setActiveTab] = reactExports.useState("plans");
  const [showSubscriptionRedirect, setShowSubscriptionRedirect] = reactExports.useState(false);
  const [upiId, setUpiId] = reactExports.useState("");
  const [upiName, setUpiName] = reactExports.useState("");
  const [upiSaved, setUpiSaved] = reactExports.useState(false);
  const currentQRMinutes = useQRTimeoutMinutes();
  const [qrTimeoutInput, setQrTimeoutInput] = reactExports.useState(
    String(currentQRMinutes)
  );
  const [qrTimeoutSaved, setQrTimeoutSaved] = reactExports.useState(false);
  function handleSaveQRTimeout() {
    const mins = Number.parseInt(qrTimeoutInput);
    if (!Number.isFinite(mins) || mins < 1 || mins > 60) {
      ue.error("QR timeout must be between 1 and 60 minutes");
      return;
    }
    saveQRTimeoutMinutes(mins);
    setQrTimeoutSaved(true);
    ue.success(
      `QR payment timeout set to ${mins} minute${mins !== 1 ? "s" : ""}`
    );
    setTimeout(() => setQrTimeoutSaved(false), 3e3);
  }
  reactExports.useEffect(() => {
    if (upiProfile) {
      setUpiId(upiProfile.upiId ?? "");
      setUpiName(upiProfile.name ?? "");
    }
  }, [upiProfile]);
  const previewQrData = upiId.trim() ? `upi://pay?pa=${encodeURIComponent(upiId.trim())}&pn=${encodeURIComponent(upiName.trim() || "WhatsCart Admin")}&cu=INR` : "";
  async function handleSaveUPI() {
    if (!upiId.trim()) {
      ue.error("UPI ID is required");
      return;
    }
    try {
      await setUPIProfile.mutateAsync({
        upiId: upiId.trim(),
        name: upiName.trim()
      });
      setUpiSaved(true);
      ue.success("UPI settings saved");
      setTimeout(() => setUpiSaved(false), 3e3);
    } catch {
      ue.error("Failed to save UPI settings");
    }
  }
  const [planTypeFilter, setPlanTypeFilter] = reactExports.useState("all");
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [showPlanModal, setShowPlanModal] = reactExports.useState(false);
  const [showAssignModal, setShowAssignModal] = reactExports.useState(false);
  const [showPayModal, setShowPayModal] = reactExports.useState(false);
  const [editPlan, setEditPlan] = reactExports.useState(null);
  const [assignPlan, setAssignPlan] = reactExports.useState(null);
  const [payPlan, setPayPlan] = reactExports.useState(null);
  const [assignSearch, setAssignSearch] = reactExports.useState("");
  const [assignedMerchantPhone, setAssignedMerchantPhone] = reactExports.useState("");
  const { data: merchantDiscount = 0 } = useGetSubscriptionDiscountForMerchant();
  const [form, setForm] = reactExports.useState(DEFAULT_FORM);
  const filteredPlans = plans.filter((p) => {
    if (planTypeFilter === "all") return true;
    if (planTypeFilter === SubscriptionPlanType.monthly && (p.planType === SubscriptionPlanType.monthly || p.planType === SubscriptionPlanType.weekly))
      return true;
    return p.planType === planTypeFilter;
  });
  const activePlans = plans.filter((p) => p.isActive).length;
  const activeSubCount = ACTIVE_SUBS.filter(
    (s) => s.status === "active"
  ).length;
  const revenueMonth = plans.filter((p) => p.isActive && Number(p.flatFee ?? p.priceFlat ?? 0) > 0).reduce((acc, p) => acc + Number(p.flatFee ?? p.priceFlat ?? 0), 0);
  const avgPlanValue = plans.length > 0 ? Math.round(
    plans.reduce(
      (acc, p) => acc + Number(p.flatFee ?? p.priceFlat ?? 0),
      0
    ) / plans.length
  ) : 0;
  const filteredSubs = ACTIVE_SUBS.filter((s) => {
    if (roleFilter !== "all" && s.role !== roleFilter) return false;
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    return true;
  });
  function openCreate() {
    setEditPlan(null);
    setForm(DEFAULT_FORM);
    setShowPlanModal(true);
  }
  function openEdit(plan) {
    setEditPlan(plan);
    setForm({
      name: plan.name,
      planType: plan.planType,
      targetRole: plan.targetRole,
      applicableRoles: plan.applicableRoles.length > 0 ? [...plan.applicableRoles] : [plan.targetRole],
      billingCycle: plan.planType === SubscriptionPlanType.weekly ? "weekly" : "monthly",
      priceFlat: String(plan.priceFlat),
      pricePercentage: String(plan.pricePercentage),
      flatFee: String(Number(plan.flatFee ?? plan.priceFlat ?? 0)),
      percentageFee: String(
        Number(plan.percentageFee ?? plan.pricePercentage ?? 0)
      ),
      minTransaction: String(Number(plan.minTransactionAmount ?? 0)),
      maxTransaction: String(Number(plan.maxTransactionAmount ?? 0)),
      orderLimit: String(Number(plan.orderLimit)),
      inquiryLimit: String(Number(plan.inquiryLimit)),
      durationDays: String(Number(plan.durationDays)),
      categoryScope: plan.categoryScope ?? "",
      features: [...plan.features],
      featureInput: "",
      isActive: plan.isActive
    });
    setShowPlanModal(true);
  }
  function openAssign(plan) {
    setAssignPlan(plan);
    setAssignSearch("");
    setShowAssignModal(true);
  }
  function openPay(plan) {
    setPayPlan(plan);
    setShowPayModal(true);
  }
  function handleDelete(id) {
    deletePlan.mutate(id, {
      onSuccess: () => ue.success("Plan deleted"),
      onError: () => ue.error("Failed to delete plan")
    });
  }
  async function handleSavePlan() {
    const planData = {
      name: form.name,
      planType: form.planType,
      targetRole: form.targetRole,
      priceFlat: Number.parseFloat(form.priceFlat) || 0,
      pricePercentage: Number.parseFloat(form.pricePercentage) || 0,
      orderLimit: BigInt(Number.parseInt(form.orderLimit) || 100),
      inquiryLimit: BigInt(Number.parseInt(form.inquiryLimit) || 50),
      durationDays: BigInt(Number.parseInt(form.durationDays) || 30),
      features: form.features,
      categoryScope: form.categoryScope || void 0,
      flatFee: Number.parseFloat(form.flatFee) || void 0,
      percentageFee: Number.parseFloat(form.percentageFee) || void 0,
      minTransactionAmount: Number.parseFloat(form.minTransaction) || void 0,
      maxTransactionAmount: Number.parseFloat(form.maxTransaction) || void 0,
      applicableRoles: form.applicableRoles
    };
    try {
      if (editPlan) {
        await updatePlan.mutateAsync({
          ...planData,
          id: editPlan.id,
          isActive: form.isActive
        });
        ue.success("Plan updated");
      } else {
        await createPlan.mutateAsync(planData);
        ue.success("Plan created");
      }
      setShowPlanModal(false);
      setForm(DEFAULT_FORM);
      setEditPlan(null);
    } catch {
      ue.error("Failed to save plan");
    }
  }
  function addFeature() {
    const tag = form.featureInput.trim();
    if (tag && !form.features.includes(tag)) {
      setForm((f) => ({
        ...f,
        features: [...f.features, tag],
        featureInput: ""
      }));
    }
  }
  function toggleApplicableRole(role) {
    setForm((f) => ({
      ...f,
      applicableRoles: f.applicableRoles.includes(role) ? f.applicableRoles.filter((r) => r !== role) : [...f.applicableRoles, role]
    }));
  }
  const isSubscriptionType = form.planType === SubscriptionPlanType.monthly || form.planType === SubscriptionPlanType.weekly;
  const isDurationBased = form.planType === SubscriptionPlanType.duration;
  const isCategoryBased = form.planType === SubscriptionPlanType.category;
  const isPercentage = form.planType === SubscriptionPlanType.percentage;
  const isFlatRate = form.planType === SubscriptionPlanType.flat;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Subscription Plans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          plans.length,
          " plans · ",
          activePlans,
          " active · subscription enforcement enabled"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subscription-dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            "data-ocid": "subscription-manage-assignments",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 mr-2" }),
              " Manage Assignments"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => setShowSubscriptionRedirect(true),
            "data-ocid": "subscription-test-redirect",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 mr-2" }),
              " Test Subscription Flow"
            ]
          }
        ),
        activeTab === "plans" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, "data-ocid": "subscription-create-plan", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
          " Create Plan"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 bg-muted/40 p-1 rounded-xl border border-border", children: [
      { key: "plans", label: "Plans" },
      { key: "templates", label: "Plan Templates" },
      { key: "subscriptions", label: "User Subscriptions" },
      { key: "payment-settings", label: "Payment Settings" }
    ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab.key),
        "data-ocid": `sub-tab-${tab.key}`,
        className: `inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-medium transition-all border ${activeTab === tab.key ? "bg-card text-foreground border-border shadow-sm" : "text-muted-foreground border-transparent hover:text-foreground hover:bg-card/60"}`,
        children: tab.label
      },
      tab.key
    )) }),
    activeTab === "templates" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "sub.templates-tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Quick-Start Plan Templates" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            SUBSCRIPTION_PLAN_TEMPLATES.length,
            " pre-built templates across",
            " ",
            TEMPLATE_GROUPS.length,
            " roles. Click Activate to make a plan live or Customize to prefill the create form."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30",
              children: [
                SUBSCRIPTION_PLAN_TEMPLATES.filter((t) => t.isFree).length,
                " ",
                "free tiers"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-blue-700 border-blue-300 bg-blue-50 dark:bg-blue-950/30",
              children: [
                "₹",
                Math.max(
                  ...SUBSCRIPTION_PLAN_TEMPLATES.map((t) => t.price)
                ).toLocaleString("en-IN"),
                " ",
                "max plan"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Total Templates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: SUBSCRIPTION_PLAN_TEMPLATES.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            TEMPLATE_GROUPS.length,
            " roles covered"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Revenue Potential" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: [
            "₹",
            SUBSCRIPTION_PLAN_TEMPLATES.filter((t) => !t.isFree).reduce((s, t) => s + t.price, 0).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "if all paid plans activate" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Enterprise Plans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: SUBSCRIPTION_PLAN_TEMPLATES.filter((t) => t.isEnterprise).length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "business-grade tiers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Business Plans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: SUBSCRIPTION_PLAN_TEMPLATES.filter(
            (t) => t.role === "business"
          ).length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "delivery assignment tiers" })
        ] })
      ] }),
      TEMPLATE_GROUPS.map((group) => {
        const groupTemplates = SUBSCRIPTION_PLAN_TEMPLATES.filter(
          (t) => t.role === group.role
        );
        if (groupTemplates.length === 0) return null;
        const GroupIcon = group.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-3",
            "data-ocid": `templates.group.${group.role}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center gap-2 px-4 py-2.5 ${group.bg} border border-border rounded-xl`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(GroupIcon, { className: `w-4 h-4 ${group.color} shrink-0` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-sm text-foreground", children: group.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] px-1.5 py-0", children: [
                      groupTemplates.length,
                      " plans"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                      "₹",
                      groupTemplates.filter((t) => !t.isFree).map((t) => t.price).join(" / ₹")
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: groupTemplates.map((tpl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `bg-card border rounded-xl p-4 flex flex-col gap-3 shadow-sm transition-shadow hover:shadow-md relative overflow-hidden ${tpl.isEnterprise ? "border-primary/50 ring-1 ring-primary/10" : tpl.isPopular ? "border-primary/30" : "border-border"}`,
                  "data-ocid": `templates.card.${tpl.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        tpl.isEnterprise && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-2.5 h-2.5" }),
                          " Enterprise"
                        ] }),
                        tpl.isPopular && !tpl.isEnterprise && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5", children: "⭐ Popular" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-display font-bold text-sm text-foreground truncate", children: tpl.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-primary mt-0.5", children: [
                          tpl.isFree ? "Free" : `₹${tpl.price.toLocaleString("en-IN")}`,
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground ml-1", children: [
                            "/",
                            tpl.billingCycle
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border shrink-0 ${tpl.roleColor}`,
                          children: tpl.roleLabel
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs bg-muted/40 rounded-lg p-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Orders" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
                          tpl.orderLimit === 0 ? "Unlimited" : tpl.orderLimit,
                          "/",
                          tpl.billingCycle === "daily" ? "day" : "month"
                        ] })
                      ] }),
                      tpl.inquiryLimit !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Inquiries" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: tpl.inquiryLimit === 0 ? "Unlimited" : tpl.inquiryLimit })
                      ] }),
                      tpl.assignedUsers !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Assigned Users" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
                          tpl.assignedUsers,
                          " dedicated delivery users"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 flex-1", children: [
                      tpl.features.slice(0, 4).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex items-start gap-1.5 text-xs text-muted-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 text-emerald-500 shrink-0 mt-0.5" }),
                            f
                          ]
                        },
                        f
                      )),
                      tpl.features.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-muted-foreground pl-4.5", children: [
                        "+",
                        tpl.features.length - 4,
                        " more"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1.5 pt-2 border-t border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          className: "text-xs gap-1",
                          onClick: () => {
                            const formValues = {
                              name: tpl.name,
                              planType: tpl.planType,
                              targetRole: tpl.role,
                              applicableRoles: [tpl.role],
                              billingCycle: tpl.billingCycle === "daily" ? "monthly" : tpl.billingCycle,
                              priceFlat: String(tpl.price),
                              flatFee: String(tpl.price),
                              orderLimit: String(tpl.orderLimit),
                              inquiryLimit: String(tpl.inquiryLimit),
                              durationDays: "30",
                              features: [...tpl.features],
                              isActive: true
                            };
                            setForm({ ...DEFAULT_FORM, ...formValues });
                            setEditPlan(null);
                            setShowPlanModal(true);
                            setActiveTab("plans");
                          },
                          "data-ocid": `templates.${tpl.id}.customize_button`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
                            "Customize"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: tpl.isFree ? "outline" : "default",
                          className: "text-xs gap-1",
                          onClick: async () => {
                            try {
                              await createPlan.mutateAsync({
                                name: tpl.name,
                                planType: tpl.planType,
                                targetRole: tpl.role,
                                priceFlat: tpl.price,
                                pricePercentage: 0,
                                orderLimit: BigInt(tpl.orderLimit),
                                inquiryLimit: BigInt(tpl.inquiryLimit),
                                durationDays: BigInt(30),
                                features: tpl.features,
                                flatFee: tpl.price,
                                applicableRoles: [tpl.role]
                              });
                              ue.success(`"${tpl.name}" activated!`);
                              setActiveTab("plans");
                            } catch {
                              ue.error("Failed to activate plan");
                            }
                          },
                          disabled: createPlan.isPending,
                          "data-ocid": `templates.${tpl.id}.activate_button`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
                            "Activate"
                          ]
                        }
                      )
                    ] })
                  ]
                },
                tpl.id
              )) })
            ]
          },
          group.role
        );
      })
    ] }),
    activeTab === "payment-settings" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 shadow-sm space-y-5",
        "data-ocid": "sub.payment-settings",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Admin UPI Settings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "These UPI details are used for all subscription payment QR codes." }),
              " ",
              "The QR code generated during subscription payment will use this UPI ID."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          upiLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sub-upi-id", children: "UPI ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "sub-upi-id",
                    value: upiId,
                    onChange: (e) => setUpiId(e.target.value),
                    placeholder: "yourname@upi",
                    "data-ocid": "sub.upi-id-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "e.g. whatscart@okicici" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sub-upi-name", children: "Display Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "sub-upi-name",
                    value: upiName,
                    onChange: (e) => setUpiName(e.target.value),
                    placeholder: "WhatsCart Admin",
                    "data-ocid": "sub.upi-name-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full gap-2",
                  onClick: handleSaveUPI,
                  disabled: setUPIProfile.isPending || !upiId.trim(),
                  "data-ocid": "sub.save-upi-button",
                  children: upiSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                    "Saved!"
                  ] }) : setUPIProfile.isPending ? "Saving…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                    "Save UPI Settings"
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Preview QR Code" }),
              previewQrData ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: buildQrImageUrl(previewQrData, 160),
                  alt: "UPI QR Preview",
                  width: 160,
                  height: 160,
                  className: "rounded-lg",
                  "data-ocid": "sub.upi-qr-preview"
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-40 h-40 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-8 h-8 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center px-3", children: "Enter a UPI ID to see the preview" })
              ] }),
              upiId.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scan with PhonePe, GPay, Paytm" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "QR Payment Timeout" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Set how long generated QR codes remain valid before expiring. Shorter durations are more secure. Current: ",
            currentQRMinutes,
            " ",
            "minute",
            currentQRMinutes !== 1 ? "s" : "",
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "qr-timeout", children: "Timeout (minutes)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "qr-timeout",
                  type: "number",
                  min: "1",
                  max: "60",
                  value: qrTimeoutInput,
                  onChange: (e) => setQrTimeoutInput(e.target.value),
                  placeholder: "2",
                  "data-ocid": "sub.qr-timeout-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSaveQRTimeout,
                className: "gap-2",
                "data-ocid": "sub.save-qr-timeout-button",
                children: qrTimeoutSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  " Saved!"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                  " Save"
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Recommended: 2–5 minutes. Applies to all QR codes across chatbot simulator, orders, and subscription payments." })
        ]
      }
    ),
    activeTab === "subscriptions" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-5 h-5 text-primary" }),
          label: "Total Plans",
          value: plans.length,
          sub: `${activePlans} active`,
          colorCls: "bg-primary/10"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-blue-600" }),
          label: "Active Subscriptions",
          value: activeSubCount,
          sub: `${ACTIVE_SUBS.length - activeSubCount} expired`,
          colorCls: "bg-blue-100 dark:bg-blue-900/30"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-emerald-600" }),
          label: "Revenue This Month",
          value: `₹${revenueMonth.toLocaleString("en-IN")}`,
          sub: "flat fee plans",
          colorCls: "bg-emerald-100 dark:bg-emerald-900/30"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-amber-600" }),
          label: "Avg Plan Value",
          value: `₹${avgPlanValue.toLocaleString("en-IN")}`,
          sub: "across all plans",
          colorCls: "bg-amber-100 dark:bg-amber-900/30"
        }
      )
    ] }) }),
    activeTab === "plans" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap bg-muted/40 p-1 rounded-xl border border-border", children: PLAN_TYPE_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setPlanTypeFilter(tab.key),
          "data-active": planTypeFilter === tab.key,
          className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
              ${planTypeFilter === tab.key ? "bg-card text-foreground border-border shadow-sm" : "text-muted-foreground border-transparent hover:text-foreground hover:bg-card/60"}`,
          "data-ocid": `plan-tab-${tab.key}`,
          children: [
            tab.icon,
            tab.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-muted rounded-full px-1.5 py-0.5 text-[10px] tabular-nums", children: tab.key === "all" ? plans.length : tab.key === SubscriptionPlanType.monthly ? plans.filter(
              (p) => p.planType === SubscriptionPlanType.monthly || p.planType === SubscriptionPlanType.weekly
            ).length : plans.filter((p) => p.planType === tab.key).length })
          ]
        },
        tab.key
      )) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-72 bg-muted animate-pulse rounded-xl"
        },
        k
      )) }) : filteredPlans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center bg-card border border-border rounded-xl",
          "data-ocid": "plans-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No plans found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Create your first plan to get started" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: openCreate,
                size: "sm",
                "data-ocid": "plans-empty-create",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                  " Create Plan"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredPlans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlanCard,
        {
          plan,
          onEdit: openEdit,
          onAssign: openAssign,
          onDelete: handleDelete,
          onPay: openPay
        },
        plan.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "User Subscriptions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: ACTIVE_SUBS.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: roleFilter,
                onChange: (e) => setRoleFilter(e.target.value),
                className: "text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                "data-ocid": "subscriptions-role-filter",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Roles" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: UserRole.merchant, children: "Merchant" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: UserRole.customer, children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: UserRole.deliveryPartner, children: "Delivery Partner" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: statusFilter,
                onChange: (e) => setStatusFilter(e.target.value),
                className: "text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                "data-ocid": "subscriptions-status-filter",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "expired", children: "Expired" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "expiring", children: "Expiring Soon" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: [
            "User",
            "Role",
            "Plan",
            "Type",
            "Start",
            "Expiry",
            "Orders",
            "Inquiries",
            "Status"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredSubs.map((sub) => {
            const cfg = PLAN_TYPE_CONFIG[sub.planType];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
                "data-ocid": `sub-row-${sub.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground whitespace-nowrap", children: sub.userName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[sub.role] ?? ""}`,
                      children: roleLabel(sub.role)
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: sub.planName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.badgeCls}`,
                      children: [
                        cfg.icon,
                        cfg.label
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: sub.startDate }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: sub.endDate }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 tabular-nums", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: sub.ordersUsed }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "/",
                        sub.ordersLimit === 0 ? "∞" : sub.ordersLimit
                      ] })
                    ] }),
                    sub.ordersLimit > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-muted rounded-full mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1 bg-primary rounded-full",
                        style: {
                          width: `${Math.min(sub.ordersUsed / sub.ordersLimit * 100, 100)}%`
                        }
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: sub.inquiriesUsed }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                      "/",
                      sub.inquiriesLimit === 0 ? "∞" : sub.inquiriesLimit
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_MAP[sub.status] ?? ""}`,
                      children: sub.status === "expiring" ? "Expiring Soon" : sub.status
                    }
                  ) })
                ]
              },
              sub.id
            );
          }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showSubscriptionRedirect,
        onOpenChange: setShowSubscriptionRedirect,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "sm:max-w-lg max-h-[92vh] overflow-y-auto",
            "data-ocid": "sub-redirect.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-primary" }),
                "Choose Your Plan"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mb-2", children: "To continue using WhatsCart, please select and activate a subscription plan." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SubscriptionRedirectModal,
                {
                  plans,
                  userId: "demo_user",
                  onSuccess: () => setShowSubscriptionRedirect(false)
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPlanModal, onOpenChange: setShowPlanModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[92vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: editPlan ? "Edit Plan" : "Create Plan" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Plan Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.name,
                onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                placeholder: "e.g. Merchant Premium Monthly",
                "data-ocid": "plan-form-name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Plan Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.planType,
                onValueChange: (v) => setForm((f) => ({
                  ...f,
                  planType: v
                })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "plan-form-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: SubscriptionPlanType.free, children: "Free — No cost, basic limits" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: SubscriptionPlanType.monthly, children: "Subscription (Recurring) — Weekly / Monthly" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: SubscriptionPlanType.duration, children: "Duration-Based — Fixed number of days" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: SubscriptionPlanType.category, children: "Category-Based — Specific product/merchant category" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: SubscriptionPlanType.flat, children: "Flat Rate — Fixed ₹ amount per period" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: SubscriptionPlanType.percentage, children: "Percentage — % of each transaction" })
                  ] })
                ]
              }
            )
          ] }),
          isSubscriptionType && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Billing Cycle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.billingCycle,
                onValueChange: (v) => setForm((f) => ({
                  ...f,
                  billingCycle: v
                })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "plan-form-billing-cycle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "weekly", children: "Weekly (7 days)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "monthly", children: "Monthly (30 days)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "yearly", children: "Yearly (365 days)" })
                  ] })
                ]
              }
            )
          ] }),
          isDurationBased && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Duration (days)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "1",
                value: form.durationDays,
                onChange: (e) => setForm((f) => ({ ...f, durationDays: e.target.value })),
                "data-ocid": "plan-form-duration"
              }
            )
          ] }),
          isCategoryBased && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category Scope" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.categoryScope,
                onChange: (e) => setForm((f) => ({ ...f, categoryScope: e.target.value })),
                placeholder: "e.g. food, medical, salon",
                "data-ocid": "plan-form-category-scope"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Applicable Roles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                if (r.value === UserRole.merchant || r.value === UserRole.customer || r.value === UserRole.deliveryPartner) {
                  toggleApplicableRole(r.value);
                }
              },
              className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all ${form.applicableRoles.includes(r.value) ? `${ROLE_COLORS[r.value] ?? ""} ring-2 ring-primary/30` : "bg-muted text-muted-foreground border-border"}`,
              "data-ocid": `plan-form-role-${r.value}`,
              children: r.label
            },
            r.value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Pricing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: isFlatRate ? "Flat Fee (₹)" : "Base Price (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  value: isFlatRate ? form.flatFee : form.priceFlat,
                  onChange: (e) => setForm(
                    (f) => isFlatRate ? {
                      ...f,
                      flatFee: e.target.value,
                      priceFlat: e.target.value
                    } : { ...f, priceFlat: e.target.value }
                  ),
                  placeholder: "0",
                  "data-ocid": "plan-form-price-flat"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: isPercentage ? "Fee Percentage (%)" : "Commission (%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  max: "100",
                  step: "0.5",
                  value: isPercentage ? form.percentageFee : form.pricePercentage,
                  onChange: (e) => setForm(
                    (f) => isPercentage ? {
                      ...f,
                      percentageFee: e.target.value,
                      pricePercentage: e.target.value
                    } : { ...f, pricePercentage: e.target.value }
                  ),
                  placeholder: "0",
                  "data-ocid": "plan-form-price-pct"
                }
              )
            ] })
          ] }),
          (isPercentage || isFlatRate) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Min Transaction (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  value: form.minTransaction,
                  onChange: (e) => setForm((f) => ({
                    ...f,
                    minTransaction: e.target.value
                  })),
                  "data-ocid": "plan-form-min-txn"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Max Transaction (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  value: form.maxTransaction,
                  onChange: (e) => setForm((f) => ({
                    ...f,
                    maxTransaction: e.target.value
                  })),
                  "data-ocid": "plan-form-max-txn"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Order Limit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                value: form.orderLimit,
                onChange: (e) => setForm((f) => ({ ...f, orderLimit: e.target.value })),
                placeholder: "0=unlimited",
                "data-ocid": "plan-form-order-limit"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Inquiry Limit/day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                value: form.inquiryLimit,
                onChange: (e) => setForm((f) => ({ ...f, inquiryLimit: e.target.value })),
                "data-ocid": "plan-form-inquiry-limit"
              }
            )
          ] }),
          !isDurationBased && !isSubscriptionType && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Duration (days)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "1",
                value: form.durationDays,
                onChange: (e) => setForm((f) => ({ ...f, durationDays: e.target.value })),
                "data-ocid": "plan-form-duration-fallback"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Features" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.featureInput,
                onChange: (e) => setForm((f) => ({ ...f, featureInput: e.target.value })),
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                },
                placeholder: "Add a feature bullet…",
                "data-ocid": "plan-form-feature-input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: addFeature, children: "Add" })
          ] }),
          form.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2 p-3 bg-muted/40 rounded-lg border border-border", children: form.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full text-xs font-medium",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                f,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setForm((s) => ({
                      ...s,
                      features: s.features.filter((x) => x !== f)
                    })),
                    className: "hover:text-destructive ml-0.5 leading-none",
                    "aria-label": "Remove feature",
                    children: "×"
                  }
                )
              ]
            },
            f
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "plan-active",
              checked: form.isActive,
              onCheckedChange: (v) => setForm((f) => ({ ...f, isActive: v })),
              "data-ocid": "plan-form-active-toggle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "plan-active", className: "cursor-pointer", children: "Active — show this plan to users" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => setShowPlanModal(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1",
              onClick: handleSavePlan,
              "data-ocid": "plan-form-save",
              children: editPlan ? "Save Changes" : "Create Plan"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAssignModal, onOpenChange: setShowAssignModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
        "Assign Plan",
        assignPlan && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border align-middle ${PLAN_TYPE_CONFIG[assignPlan.planType].badgeCls}`,
            children: assignPlan.name
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: assignSearch,
                onChange: (e) => setAssignSearch(e.target.value),
                placeholder: "Name, phone, or user ID…",
                className: "pl-9",
                "data-ocid": "assign-user-search"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-52 overflow-y-auto", children: [
          {
            id: "u1",
            name: "Sharma Kirana Store",
            role: "merchant",
            phone: "+91 98765 43210"
          },
          {
            id: "u2",
            name: "Patel Fast Food",
            role: "merchant",
            phone: "+91 87654 32109"
          },
          {
            id: "u3",
            name: "Ravi Thakur",
            role: "delivery",
            phone: "+91 76543 21098"
          },
          {
            id: "u4",
            name: "Rajesh Kumar",
            role: "customer",
            phone: "+91 65432 10987"
          },
          {
            id: "u5",
            name: "Meena Electronics",
            role: "merchant",
            phone: "+91 54321 09876"
          }
        ].filter(
          (u) => !assignSearch || u.name.toLowerCase().includes(assignSearch.toLowerCase()) || u.phone.includes(assignSearch)
        ).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors cursor-pointer",
            "data-ocid": `assign-user-row-${u.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: u.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: u.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[u.role] ?? ""}`,
                    children: roleLabel(u.role)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-xs h-7",
                    onClick: () => {
                      if (u.role === "merchant") {
                        setAssignedMerchantPhone(
                          u.phone.replace(/\s/g, "")
                        );
                      }
                      setShowAssignModal(false);
                    },
                    "data-ocid": `assign-confirm-${u.id}`,
                    children: "Assign"
                  }
                )
              ] })
            ]
          },
          u.id
        )) }),
        assignedMerchantPhone && merchantDiscount > 0 && assignPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-emerald-600 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-emerald-700", children: [
              merchantDiscount,
              "% loyalty discount applied!"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-0.5", children: [
              "Original: ₹",
              Number(
                assignPlan.flatFee ?? assignPlan.priceFlat ?? 0
              ).toLocaleString("en-IN"),
              " → ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                "₹",
                Math.round(
                  Number(
                    assignPlan.flatFee ?? assignPlan.priceFlat ?? 0
                  ) * (1 - merchantDiscount / 100)
                ).toLocaleString("en-IN")
              ] }),
              " (",
              merchantDiscount,
              "% off for importing customers",
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setShowAssignModal(false),
            children: "Cancel"
          }
        ) })
      ] })
    ] }) }),
    payPlan && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showPayModal,
        onOpenChange: (open) => {
          setShowPayModal(open);
          if (!open) setPayPlan(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PaymentModal,
          {
            plan: payPlan,
            onClose: () => {
              setShowPayModal(false);
              setPayPlan(null);
            }
          }
        )
      }
    )
  ] });
}
export {
  SubscriptionsPage as default
};
