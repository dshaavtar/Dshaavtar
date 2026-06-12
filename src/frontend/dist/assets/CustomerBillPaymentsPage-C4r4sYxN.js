import { j as jsxRuntimeExports, L as Link } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as CreditCard } from "./credit-card-CP3NtRg6.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { S as Smartphone } from "./smartphone-CYA8tykz.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { C as Car } from "./car-C3Ivr9eE.js";
import { F as Flame } from "./flame-34E6_5Fg.js";
import { S as Shield } from "./shield-Bz48lUZV.js";
import { B as Building2 } from "./building-2-B0h7D8pK.js";
import { M as MessageCircle } from "./message-circle-C1ZVIbte.js";
import { A as ArrowRight } from "./arrow-right-ARugd4PE.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
const PAYMENT_SERVICES = [
  {
    id: "mobile-recharge",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    accentBorder: "border-blue-200 dark:border-blue-800",
    title: "Mobile Recharge",
    description: "Prepaid and postpaid recharge for all operators — Jio, Airtel, Vi, BSNL and more.",
    chatbotPath: "/chatbot",
    badges: ["Jio", "Airtel", "Vi", "BSNL", "Prepaid", "Postpaid"]
  },
  {
    id: "utility-bill",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    accentBorder: "border-amber-200 dark:border-amber-800",
    title: "Utility Bill Payment",
    description: "Pay electricity, water, and gas bills for all major state utilities instantly.",
    chatbotPath: "/chatbot",
    badges: ["Electricity", "Water", "Gas", "Broadband"]
  },
  {
    id: "fastag",
    icon: Car,
    color: "text-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    accentBorder: "border-cyan-200 dark:border-cyan-800",
    title: "FASTag Recharge",
    description: "Recharge your FASTag account for seamless toll payments across all highways.",
    chatbotPath: "/chatbot",
    badges: ["NHAI", "All Banks", "Vehicle No."]
  },
  {
    id: "lpg",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    accentBorder: "border-orange-200 dark:border-orange-800",
    title: "LPG Cylinder Booking",
    description: "Book LPG refills for HP Gas, Indane, and Bharat Gas with home delivery.",
    chatbotPath: "/chatbot",
    badges: ["HP Gas", "Indane", "Bharat Gas"]
  },
  {
    id: "insurance",
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    accentBorder: "border-emerald-200 dark:border-emerald-800",
    title: "Insurance Payment",
    description: "Pay premiums for life, health, vehicle, and property insurance from all major insurers.",
    chatbotPath: "/chatbot",
    badges: ["Life", "Health", "Vehicle", "Property"]
  },
  {
    id: "municipality",
    icon: Building2,
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    accentBorder: "border-violet-200 dark:border-violet-800",
    title: "Municipality Payment",
    description: "Pay property tax, trade license, water connection, and other municipal dues.",
    chatbotPath: "/chatbot",
    badges: ["Property Tax", "Trade License", "Water"]
  }
];
function CustomerBillPaymentsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "bill-payments.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6 text-primary" }),
        "Bill Payments & Recharge"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Recharge, pay bills, and manage all your utility payments in one place." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4",
        "data-ocid": "bill-payments.info_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-emerald-800 dark:text-emerald-300", children: "Payments are powered by the chatbot — start a conversation to enter your account details and complete your payment securely." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid sm:grid-cols-2 gap-4",
        "data-ocid": "bill-payments.services_list",
        children: PAYMENT_SERVICES.map((service, idx) => {
          const Icon = service.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `bg-card border ${service.accentBorder} rounded-2xl p-4 shadow-card`,
              "data-ocid": `bill-payments.service.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${service.bg}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${service.color}` })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: service.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: service.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-3", children: service.badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground",
                    children: badge
                  },
                  badge
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: service.chatbotPath,
                    "data-ocid": `bill-payments.pay_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        className: "w-full flex items-center gap-1.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                          "Pay via Chatbot",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-auto" })
                        ]
                      }
                    )
                  }
                )
              ]
            },
            service.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/customer-dashboard",
        className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "bill-payments.back_link",
        children: "← Back to Dashboard"
      }
    ) })
  ] }) });
}
export {
  CustomerBillPaymentsPage as default
};
