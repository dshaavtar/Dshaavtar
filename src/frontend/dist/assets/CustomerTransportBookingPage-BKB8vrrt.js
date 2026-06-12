import { j as jsxRuntimeExports, L as Link } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { B as Bus } from "./bus-D032N2K-.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { T as TramFront, P as Plane } from "./tram-front-J33t6Mel.js";
import { M as MessageCircle } from "./message-circle-C1ZVIbte.js";
import { A as ArrowRight } from "./arrow-right-ARugd4PE.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
const TRANSPORT_SERVICES = [
  {
    id: "bus",
    icon: Bus,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    accentBorder: "border-blue-200 dark:border-blue-800",
    title: "Bus Booking",
    description: "Book bus tickets across India. Select your route, date, and seat preference via chatbot.",
    chatbotPath: "/chatbot",
    badges: ["AC Sleeper", "AC Seater", "Non-AC", "Volvo"]
  },
  {
    id: "train",
    icon: TramFront,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    accentBorder: "border-emerald-200 dark:border-emerald-800",
    title: "Train Booking",
    description: "Book IRCTC train tickets, check PNR status, and manage your reservations seamlessly.",
    chatbotPath: "/chatbot",
    badges: ["Sleeper", "3A", "2A", "1A", "CC"]
  },
  {
    id: "flight",
    icon: Plane,
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    accentBorder: "border-violet-200 dark:border-violet-800",
    title: "Flight Booking",
    description: "Search and book domestic and international flights at the best fares.",
    chatbotPath: "/chatbot",
    badges: ["Economy", "Business", "One-way", "Round-trip"]
  }
];
function CustomerTransportBookingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "transport.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-6 h-6 text-primary" }),
        "Book Transport"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Book buses, trains, and flights across India — powered by our smart chatbot." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4",
        "data-ocid": "transport.info_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-800 dark:text-blue-300", children: "Transport bookings are powered by the chatbot — start a conversation to search routes, check availability, and complete your booking in minutes." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", "data-ocid": "transport.services_list", children: TRANSPORT_SERVICES.map((service, idx) => {
      const Icon = service.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `bg-card border ${service.accentBorder} rounded-2xl p-5 shadow-card`,
          "data-ocid": `transport.service.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${service.bg}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-6 h-6 ${service.color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base mb-1", children: service.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: service.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: service.badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground",
                    children: badge
                  },
                  badge
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: service.chatbotPath,
                "data-ocid": `transport.book_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "default",
                    size: "sm",
                    className: "flex-shrink-0 flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                      "Book via Chatbot",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                    ]
                  }
                )
              }
            )
          ] })
        },
        service.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/customer-dashboard",
        className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "transport.back_link",
        children: "← Back to Dashboard"
      }
    ) })
  ] }) });
}
export {
  CustomerTransportBookingPage as default
};
