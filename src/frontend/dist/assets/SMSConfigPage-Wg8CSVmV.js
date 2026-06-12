import { ao as useQueryClient, _ as useBackendActor, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { W as WifiOff, C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DsyjSJkZ.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { W as Wifi } from "./wifi-M1a8JQvE.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { C as CircleHelp } from "./circle-help-CUB1AuXK.js";
import { E as EyeOff } from "./eye-off-DrNsJOxE.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
import { S as Send } from "./send-DoOOMmv0.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./index-BrZkK7cW.js";
import "./index-CUcO6jhF.js";
import "./index-BNXq-E6T.js";
import "./index-DYndF6Sn.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-z5OST4d2.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
const PLATFORM_WEBHOOK_URL = "https://bot.localbazar.shop/sms/webhook";
const SMS_PROVIDERS = [
  { value: "twilio", label: "Twilio" },
  { value: "msg91", label: "MSG91" },
  { value: "fast2sms", label: "Fast2SMS" },
  { value: "custom", label: "Custom HTTP API" }
];
const SETUP_STEPS = [
  {
    step: 1,
    title: "Sign up for your SMS provider",
    detail: "Twilio: https://www.twilio.com/try-twilio\nMSG91: https://msg91.com/signup\nFast2SMS: https://www.fast2sms.com/register\n\nAfter signup you will receive credentials (Account SID / Auth Token / API Key)."
  },
  {
    step: 2,
    title: "Get your credentials",
    detail: "Twilio → Console Dashboard → Account SID + Auth Token.\nMSG91 → API → Authkey.\nFast2SMS → Dev API → API key.\nCustom → refer to your provider docs for API key and base URL."
  },
  {
    step: 3,
    title: "Get a sender phone number or Sender ID",
    detail: "Twilio → Buy a phone number in the Console.\nMSG91 → Register a Sender ID (e.g. LBKART).\nFast2SMS → Default Sender ID is available. Custom sender IDs require DLT registration in India.\nPaste the number or Sender ID into the Sender ID / From Number field."
  },
  {
    step: 4,
    title: "Enter credentials and save",
    detail: "Enter your API credentials in the form on this page. For Twilio, Account SID goes in API Key and Auth Token goes in Auth Token. Then click Save Configuration."
  },
  {
    step: 5,
    title: "Configure the webhook URL in your provider",
    detail: `Copy the webhook URL below and paste it into your provider console:

${PLATFORM_WEBHOOK_URL}

Twilio: Phone Numbers → Manage → Active Numbers → click number → Messaging → Webhook URL.
MSG91: Settings → SMS Webhook.
Fast2SMS: Reseller → Webhook URL.`
  },
  {
    step: 6,
    title: "Enable SMS and send a test",
    detail: "Toggle Enable SMS to ON, save again, then click Send Test SMS below to verify the integration end-to-end. The test message will be sent to your From Number."
  }
];
function getFieldLabels(provider) {
  switch (provider) {
    case "twilio":
      return {
        apiKeyLabel: "Account SID",
        authTokenLabel: "Auth Token",
        apiKeyPlaceholder: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        authTokenPlaceholder: "Your Twilio Auth Token",
        showAuthToken: true,
        showBaseUrl: false
      };
    case "msg91":
      return {
        apiKeyLabel: "Auth Key",
        authTokenLabel: "Sender ID",
        apiKeyPlaceholder: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
        authTokenPlaceholder: "LBKART",
        showAuthToken: true,
        showBaseUrl: false
      };
    case "fast2sms":
      return {
        apiKeyLabel: "API Key",
        authTokenLabel: "Route (dlt / trans / p2p)",
        apiKeyPlaceholder: "Your Fast2SMS API key",
        authTokenPlaceholder: "dlt",
        showAuthToken: true,
        showBaseUrl: false
      };
    case "custom":
      return {
        apiKeyLabel: "API Key",
        authTokenLabel: "Auth Token (optional)",
        apiKeyPlaceholder: "Your API key",
        authTokenPlaceholder: "Optional auth token",
        showAuthToken: true,
        showBaseUrl: true
      };
  }
}
function SMSConfigPage() {
  const queryClient = useQueryClient();
  const { actor } = useBackendActor();
  const [form, setForm] = reactExports.useState({
    provider: "twilio",
    apiKey: "",
    authToken: "",
    fromNumber: "",
    webhookUrl: PLATFORM_WEBHOOK_URL,
    providerBaseUrl: "",
    isEnabled: false
  });
  const [showApiKey, setShowApiKey] = reactExports.useState(false);
  const [showAuthToken, setShowAuthToken] = reactExports.useState(false);
  const [openStep, setOpenStep] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [testing, setTesting] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [savedRows, setSavedRows] = reactExports.useState([]);
  const [isConnected, setIsConnected] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor) return;
    void (async () => {
      setLoading(true);
      try {
        const actorAny = actor;
        const raw = await actorAny.getSMSConfig();
        if (raw && typeof raw === "object") {
          const c = raw;
          setForm({
            provider: c.provider || "twilio",
            apiKey: String(c.apiKey ?? ""),
            authToken: String(c.authToken ?? ""),
            fromNumber: String(c.fromNumber ?? ""),
            webhookUrl: String(c.webhookUrl ?? PLATFORM_WEBHOOK_URL),
            providerBaseUrl: String(c.providerBaseUrl ?? ""),
            isEnabled: Boolean(c.isEnabled ?? false)
          });
          setIsConnected(Boolean(c.isConnected ?? false));
          const rows = [
            { field: "Provider", value: String(c.provider ?? "—") },
            {
              field: "API Key",
              value: c.apiKey ? `${"*".repeat(8)}${String(c.apiKey).slice(-4)}` : "—"
            },
            {
              field: "Sender ID / From Number",
              value: String(c.fromNumber ?? "—")
            },
            { field: "Webhook URL", value: String(c.webhookUrl ?? "—") },
            { field: "Status", value: c.isEnabled ? "Enabled" : "Disabled" }
          ];
          setSavedRows(rows);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, [actor]);
  function copyToClipboard(text, label) {
    if (!text) {
      ue.error(`${label} is empty`);
      return;
    }
    navigator.clipboard.writeText(text).then(() => ue.success(`${label} copied!`));
  }
  async function handleSave(e) {
    e.preventDefault();
    if (!actor) return;
    if (!form.apiKey.trim()) {
      ue.error("API Key is required");
      return;
    }
    if (!form.fromNumber.trim()) {
      ue.error("Sender ID / From Number is required");
      return;
    }
    setSaving(true);
    try {
      const actorAny = actor;
      await actorAny.updateSMSConfig(form);
      await queryClient.invalidateQueries({ queryKey: ["sms-config"] });
      setSavedRows([
        { field: "Provider", value: form.provider },
        {
          field: "API Key",
          value: form.apiKey ? `${"*".repeat(8)}${form.apiKey.slice(-4)}` : "—"
        },
        { field: "Sender ID / From Number", value: form.fromNumber || "—" },
        {
          field: "Webhook URL",
          value: form.webhookUrl || PLATFORM_WEBHOOK_URL
        },
        { field: "Status", value: form.isEnabled ? "Enabled" : "Disabled" }
      ]);
      ue.success("SMS configuration saved successfully!");
    } catch (err) {
      ue.error(
        `Failed to save: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setSaving(false);
    }
  }
  async function handleTestSMS() {
    if (!actor) return;
    if (!form.apiKey) {
      ue.error("Save your configuration first before testing");
      return;
    }
    setTesting(true);
    try {
      const actorAny = actor;
      await actorAny.testSMSConnection();
      ue.success("SMS test sent successfully! Check your phone.");
      setIsConnected(true);
    } catch (err) {
      ue.error(
        `Test failed: ${err instanceof Error ? err.message : "Check your API credentials"}`
      );
    } finally {
      setTesting(false);
    }
  }
  const fieldLabels = getFieldLabels(form.provider);
  const isConfigured = Boolean(form.apiKey);
  const statusLabel = isConnected ? "Connected" : isConfigured ? "Configured — Not Tested" : "Not Configured";
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 max-w-5xl", children: ["s1", "s2", "s3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted animate-pulse rounded-xl" }, id)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-6 animate-fade-in max-w-5xl overflow-x-hidden",
      "data-ocid": "sms_config.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary" }),
              "SMS Integration"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Two-way SMS chatbot flows — users text to interact with all major flows" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs ${isConnected ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-muted"}`,
                children: statusLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => queryClient.invalidateQueries({ queryKey: ["sms-config"] }),
                className: "gap-1.5 text-xs",
                "data-ocid": "sms_config.refresh_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                  "Refresh"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-4 p-4 rounded-xl border ${isConnected ? "bg-emerald-50 border-emerald-200" : isConfigured ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200"}`,
            "data-ocid": "sms_config.status_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isConnected ? "bg-emerald-100" : isConfigured ? "bg-blue-100" : "bg-amber-100"}`,
                  children: isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-emerald-600" }) : isConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-blue-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-600" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-semibold ${isConnected ? "text-emerald-800" : isConfigured ? "text-blue-800" : "text-amber-800"}`,
                    children: statusLabel
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-sm ${isConnected ? "text-emerald-600" : isConfigured ? "text-blue-600" : "text-amber-600"}`,
                    children: isConnected ? "SMS gateway connected — users can interact via SMS." : isConfigured ? "Credentials saved — click Send Test SMS to verify." : "Enter your SMS provider credentials below to get started."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-5 h-5 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-5 h-5 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: handleTestSMS,
                    disabled: testing || !isConfigured,
                    "data-ocid": "sms_config.test_button",
                    className: "gap-1.5 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: `w-3.5 h-3.5 ${testing ? "animate-pulse" : ""}` }),
                      testing ? "Sending…" : "Send Test SMS"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSave, className: "space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "SMS Provider Configuration" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-provider", children: "SMS Provider" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.provider,
                    onValueChange: (v) => setForm((f) => ({ ...f, provider: v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "sms-provider",
                          "data-ocid": "sms_config.provider_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select provider" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SMS_PROVIDERS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, children: p.label }, p.value)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-api-key", children: fieldLabels.apiKeyLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-3.5 h-3.5 text-muted-foreground" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "sms-api-key",
                      type: showApiKey ? "text" : "password",
                      value: form.apiKey,
                      onChange: (e) => setForm((f) => ({ ...f, apiKey: e.target.value })),
                      placeholder: fieldLabels.apiKeyPlaceholder,
                      className: "pr-16",
                      "data-ocid": "sms_config.api_key_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowApiKey((v) => !v),
                        className: "p-1 text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": showApiKey ? "Hide API key" : "Show API key",
                        children: showApiKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => copyToClipboard(form.apiKey, "API Key"),
                        className: "p-1 text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Copy API key",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] })
                ] })
              ] }),
              fieldLabels.showAuthToken && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-auth-token", children: fieldLabels.authTokenLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "sms-auth-token",
                      type: showAuthToken ? "text" : "password",
                      value: form.authToken,
                      onChange: (e) => setForm((f) => ({ ...f, authToken: e.target.value })),
                      placeholder: fieldLabels.authTokenPlaceholder,
                      className: "pr-16",
                      "data-ocid": "sms_config.auth_token_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowAuthToken((v) => !v),
                      className: "p-1 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": showAuthToken ? "Hide" : "Show",
                      children: showAuthToken ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                    }
                  ) })
                ] })
              ] }),
              fieldLabels.showBaseUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-base-url", children: "Provider Base URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "sms-base-url",
                    value: form.providerBaseUrl,
                    onChange: (e) => setForm((f) => ({
                      ...f,
                      providerBaseUrl: e.target.value
                    })),
                    placeholder: "https://api.yourprovider.com/v1/sms",
                    className: "font-mono text-xs",
                    "data-ocid": "sms_config.base_url_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-from", children: "Sender ID / From Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "sms-from",
                    value: form.fromNumber,
                    onChange: (e) => setForm((f) => ({ ...f, fromNumber: e.target.value })),
                    placeholder: form.provider === "twilio" ? "+14155552671" : "LBKART",
                    "data-ocid": "sms_config.from_number_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: form.provider === "twilio" ? "Your Twilio phone number in E.164 format (e.g. +14155552671)" : "Your registered Sender ID or from number" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-webhook", children: "Webhook URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "sms-webhook",
                      value: form.webhookUrl || PLATFORM_WEBHOOK_URL,
                      onChange: (e) => setForm((f) => ({ ...f, webhookUrl: e.target.value })),
                      className: "pr-9 font-mono text-xs",
                      "data-ocid": "sms_config.webhook_url_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => copyToClipboard(
                        form.webhookUrl || PLATFORM_WEBHOOK_URL,
                        "Webhook URL"
                      ),
                      className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Copy webhook URL",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Copy this URL and paste it into your SMS provider's webhook / callback settings." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Enable SMS Integration" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "When disabled, incoming SMS messages are ignored" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: form.isEnabled,
                    onCheckedChange: (v) => setForm((f) => ({ ...f, isEnabled: v })),
                    "data-ocid": "sms_config.enabled_toggle"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    disabled: saving,
                    "data-ocid": "sms_config.save_button",
                    className: "flex-1 gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                      saving ? "Saving…" : "Save Configuration"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => {
                      setForm({
                        provider: "twilio",
                        apiKey: "",
                        authToken: "",
                        fromNumber: "",
                        webhookUrl: PLATFORM_WEBHOOK_URL,
                        providerBaseUrl: "",
                        isEnabled: false
                      });
                      ue.info("Form cleared");
                    },
                    "data-ocid": "sms_config.reset_button",
                    children: "Reset"
                  }
                )
              ] })
            ] }) }),
            savedRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Stored Configuration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Last 5 saved fields — queryable from Data Explorer" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wide text-[10px]", children: "Field" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wide text-[10px]", children: "Value" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: savedRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border/50 last:border-0",
                    "data-ocid": "sms_config.table_row",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground", children: row.field }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-mono text-muted-foreground break-all", children: row.value })
                    ]
                  },
                  row.field
                )) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-2.5 h-2.5 rounded-full ${isConnected ? "bg-emerald-500" : "bg-amber-400"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: isConnected ? "Connected" : "Not Connected" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-xs", children: [
                { label: "Provider", value: form.provider || "—" },
                { label: "Sender ID", value: form.fromNumber || "—" },
                { label: "Webhook", value: "SMS HTTP webhook" },
                { label: "Status", value: statusLabel }
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: row.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-right truncate max-w-[120px]", children: row.value })
              ] }, row.label)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-2 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground mb-2", children: "Provider Docs" }),
              [
                {
                  label: "Twilio Console",
                  url: "https://console.twilio.com"
                },
                {
                  label: "MSG91 Dashboard",
                  url: "https://control.msg91.com/app/"
                },
                {
                  label: "Fast2SMS Dashboard",
                  url: "https://www.fast2sms.com/dashboard"
                }
              ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: link.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "sms_config.quick_link",
                  className: "flex items-center gap-2 text-xs text-primary hover:text-primary/80 hover:underline transition-colors py-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                    link.label
                  ]
                },
                link.url
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-blue-800", children: "Webhook URL to paste in provider console:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-[11px] font-mono text-blue-700 break-all select-all block bg-blue-100 rounded px-2 py-1.5", children: PLATFORM_WEBHOOK_URL }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => copyToClipboard(PLATFORM_WEBHOOK_URL, "Webhook URL"),
                  className: "flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                    "Copy webhook URL"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-5 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Setup Guide" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SETUP_STEPS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Collapsible,
            {
              open: openStep === item.step,
              onOpenChange: (open) => setOpenStep(open ? item.step : null),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  CollapsibleTrigger,
                  {
                    className: "flex w-full items-center justify-between px-4 py-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors",
                    "data-ocid": `sms_config.setup_step.${item.step}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold flex-shrink-0", children: item.step }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground text-left", children: item.title })
                      ] }),
                      openStep === item.step ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 px-4 py-3 bg-card/50 rounded-lg border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-sm text-muted-foreground whitespace-pre-wrap break-words font-sans", children: item.detail }) }) })
              ]
            },
            item.step
          )) })
        ] })
      ]
    }
  );
}
export {
  SMSConfigPage as default
};
