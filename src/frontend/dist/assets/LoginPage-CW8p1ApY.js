import { u as useNavigate, a as useAuth, b as useInternetIdentity, r as reactExports, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { M as MessageCircle } from "./message-circle-C1ZVIbte.js";
import { L as Lock } from "./lock-_3m7dyMM.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { S as ShieldCheck } from "./shield-check-DNUGUjo-.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
function LoginPage() {
  const navigate = useNavigate();
  const { setIdentityAuth } = useAuth();
  const { login: iiLogin, isLoginSuccess, identity } = useInternetIdentity();
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isLoginSuccess && identity) {
      const principalId = identity.getPrincipal().toText();
      setIdentityAuth(principalId);
      navigate({ to: "/dashboard" });
    }
  }, [isLoginSuccess, identity, setIdentityAuth, navigate]);
  function handleIILogin() {
    setError("");
    setLoading(true);
    try {
      iiLogin();
    } catch {
      setError("Internet Identity login failed. Please try again.");
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:w-1/2 bg-sidebar flex-col items-center justify-center p-12 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 -translate-x-1/2 -translate-y-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/10 translate-x-1/3 translate-y-1/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-8 h-8 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-sidebar-foreground mb-3", children: "LocalBazar Kart 🛒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sidebar-foreground/60 text-base leading-relaxed mb-8", children: "WhatsApp-powered local commerce platform for merchants, delivery partners, and customers." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-left", children: [
          "🛒 WhatsApp chatbot ordering",
          "📦 Real-time order tracking",
          "🚴 Delivery partner management",
          "💼 Jobs & Property listings",
          "📊 Advanced analytics"
        ].map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-3 text-sidebar-foreground/70 text-sm",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feature })
          },
          feature
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-primary rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "LocalBazar Kart 🛒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Admin Dashboard" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Admin Sign In" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Authenticate with Internet Identity to access the admin dashboard." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 mb-6 bg-primary/5 border border-primary/20 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Admin access is secured via",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Internet Identity" }),
          ". Your claimed principal is permanently linked to this admin session."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: handleIILogin,
          disabled: loading,
          "data-ocid": "login.ii_button",
          className: "w-full gap-2",
          size: "lg",
          children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
            loading ? "Opening Internet Identity…" : "Login with Internet Identity"
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 mt-4 bg-destructive/10 text-destructive rounded-lg text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6", children: "Your Internet Computer principal will be registered as the admin on first login." })
    ] }) })
  ] });
}
export {
  LoginPage as default
};
