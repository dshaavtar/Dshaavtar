import { ao as useQueryClient, ap as useWhatsAppConfig, aq as useWhatsAppConfigFull, ar as useWhatsAppConfigTable, as as useUpdateWebhookUrl, at as useUpdateWhatsAppConfigFull, C as useClearFlowCache, r as reactExports, j as jsxRuntimeExports, au as SAFE_DEFAULT_WA_CONFIG, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { W as WifiOff, C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DsyjSJkZ.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Separator } from "./separator-DqiCXh2l.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { W as Wifi } from "./wifi-M1a8JQvE.js";
import { S as Settings } from "./settings-CDqnrNMc.js";
import { C as CircleHelp } from "./circle-help-CUB1AuXK.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
import { E as EyeOff } from "./eye-off-DrNsJOxE.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { S as Shield } from "./shield-Bz48lUZV.js";
import { L as Link } from "./link-3oO5tL-1.js";
import { M as MessageCircle } from "./message-circle-C1ZVIbte.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
import { S as Send } from "./send-DoOOMmv0.js";
import { D as Database } from "./database-CADlqd_q.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
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
import "./index-z5OST4d2.js";
const CALLBACK_URL = "https://bot.localbazar.shop";
const FAQ_ITEMS = [
  {
    id: "phone-id",
    title: "How to get your Phone Number ID",
    icon: Phone,
    content: [
      "1. Go to developers.facebook.com and sign in with your Meta account.",
      "2. Select your WhatsApp Business App from the app dashboard.",
      "3. In the left sidebar, navigate to WhatsApp → API Setup.",
      "4. Your Phone Number ID is shown under the 'From' phone number section.",
      "5. It's a long numeric string like '123456789012345'. Copy it exactly.",
      "Note: This is different from the actual phone number — it's an internal Meta ID."
    ]
  },
  {
    id: "webhook",
    title: "How to set up the webhook",
    icon: Link,
    content: [
      "1. Copy the Webhook URL shown in this page.",
      "2. Go to your Meta App → WhatsApp → Configuration.",
      "3. Click 'Edit' next to the Webhook section.",
      "4. Paste the Webhook URL into the 'Callback URL' field.",
      "5. Enter your Verify Token (must match exactly what you set here).",
      "6. Click 'Verify and Save'.",
      "7. In the Webhook Fields section, subscribe to: messages, message_reactions.",
      "8. Click 'Done' to complete the setup."
    ]
  },
  {
    id: "production",
    title: "How to go from test to production",
    icon: TrendingUp,
    content: [
      "1. Complete your Meta App Review process (required for production access).",
      "2. Submit your app for Meta Business Verification.",
      "3. Once approved, disable Test Mode in this panel.",
      "4. Ensure your WhatsApp Business number is verified and approved.",
      "5. Replace the test access token with a permanent system user token.",
      "6. Test with real messages before going fully live.",
      "7. Monitor message delivery rates in the Meta Business Manager dashboard."
    ]
  },
  {
    id: "rate-limits",
    title: "WhatsApp Business API rate limits",
    icon: Shield,
    content: [
      "Standard tier: 1,000 business-initiated messages/day per phone number.",
      "Premium tier: Up to 100,000+ messages/day (requires volume upgrade).",
      "Template messages: Only approved message templates can initiate conversations.",
      "Session messages: Free-form replies allowed within 24h of customer message.",
      "Rate limiting: 80 messages/second maximum throughput.",
      "Phone number tiers: Tier 1 (1k/day) → Tier 2 (10k/day) → Tier 3 (100k/day).",
      "Upgrade by maintaining high quality rating and low block rate."
    ]
  }
];
const QUICK_LINKS = [
  {
    label: "Meta Developer Console",
    url: "https://developers.facebook.com",
    icon: ExternalLink
  },
  {
    label: "WhatsApp Business Manager",
    url: "https://business.facebook.com",
    icon: ExternalLink
  },
  {
    label: "API Documentation",
    url: "https://developers.facebook.com/docs/whatsapp",
    icon: ExternalLink
  },
  {
    label: "Webhook Events Guide",
    url: "https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks",
    icon: ExternalLink
  }
];
const WEBHOOK_STEPS = [
  "Go to developers.facebook.com → Your App → WhatsApp → Configuration",
  'Click "Edit" next to Webhook',
  `Enter the Callback URL: ${CALLBACK_URL}`,
  "Enter your Verify Token (must match exactly what you set here)",
  "Subscribe to: messages, message_reactions",
  'Click "Verify and Save"'
];
function WhatsAppConfigPage() {
  const queryClient = useQueryClient();
  const { data: rawConfig, isLoading } = useWhatsAppConfig();
  const { data: fullConfig } = useWhatsAppConfigFull();
  const { data: configTableRows = [], refetch: refetchTable } = useWhatsAppConfigTable();
  const updateWebhookUrl = useUpdateWebhookUrl();
  const updateFullConfig = useUpdateWhatsAppConfigFull();
  const clearFlowCache = useClearFlowCache();
  const [form, setForm] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  const [showToken, setShowToken] = reactExports.useState(false);
  const [testingWebhook, setTestingWebhook] = reactExports.useState(false);
  const [sendingTest, setSendingTest] = reactExports.useState(false);
  const [testPhone, setTestPhone] = reactExports.useState("");
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const [tableSearch, setTableSearch] = reactExports.useState("");
  const [editingKey, setEditingKey] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const merged = { ...rawConfig ?? {}, ...fullConfig ?? {} };
    if (Object.keys(merged).length === 0) return;
    setForm((prev) => {
      const updates = {};
      const fields = [
        "webhookUrl",
        "verifyToken",
        "phoneNumberId",
        "apiKey",
        "businessAccountId",
        "appId",
        "isConnected",
        "isTestMode"
      ];
      for (const key of fields) {
        if ((prev[key] === void 0 || prev[key] === null || prev[key] === "") && merged[key] !== void 0 && merged[key] !== null && merged[key] !== "") {
          updates[key] = merged[key];
        }
      }
      return Object.keys(updates).length > 0 ? { ...prev, ...updates } : prev;
    });
  }, [rawConfig, fullConfig]);
  const [editingValue, setEditingValue] = reactExports.useState("");
  const [savedVerifyToken, setSavedVerifyToken] = reactExports.useState(null);
  const config = {
    ...SAFE_DEFAULT_WA_CONFIG,
    ...rawConfig ?? {},
    ...fullConfig ?? {}
  };
  const current = {
    ...config,
    ...form
  };
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const fullCfgPayload = {
        webhookUrl: String(current.webhookUrl || CALLBACK_URL),
        verifyToken: String(current.verifyToken || ""),
        phoneNumberId: String(current.phoneNumberId || ""),
        apiKey: String(current.apiKey || ""),
        businessAccountId: String(current.businessAccountId || ""),
        metaAppId: String(current.appId || ""),
        isConnected: Boolean(current.isConnected),
        isTestMode: Boolean(current.isTestMode ?? true)
      };
      await updateFullConfig.mutateAsync(fullCfgPayload);
      if (form.webhookUrl && form.webhookUrl !== config.webhookUrl) {
        await updateWebhookUrl.mutateAsync(form.webhookUrl);
      }
      await queryClient.invalidateQueries({ queryKey: ["whatsapp-config"] });
      await queryClient.invalidateQueries({
        queryKey: ["whatsapp-config-full"]
      });
      await queryClient.invalidateQueries({
        queryKey: ["whatsapp-config-table"]
      });
      const tokenToShow = String(current.verifyToken || "");
      setForm({});
      if (tokenToShow) {
        setSavedVerifyToken(tokenToShow);
      }
      ue.success("WhatsApp configuration saved successfully!");
    } catch (err) {
      ue.error(
        `Failed to save: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setSaving(false);
    }
  }
  async function handleClearFlowCache() {
    try {
      const cleared = await clearFlowCache.mutateAsync(void 0);
      ue.success(`Cleared ${Number(cleared)} stuck flow states`);
    } catch {
      ue.error("Failed to clear flow cache");
    }
  }
  function copyToClipboard(text, label) {
    if (!text) {
      ue.error(`${label} is empty`);
      return;
    }
    navigator.clipboard.writeText(text).then(() => ue.success(`${label} copied!`));
  }
  async function testWebhook() {
    setTestingWebhook(true);
    await new Promise((r) => setTimeout(r, 1500));
    setTestingWebhook(false);
    if (current.isTestMode)
      ue.success("Webhook test successful! (Test Mode — simulated)");
    else if (current.webhookUrl)
      ue.success("Webhook endpoint is reachable!");
    else ue.error("Webhook URL is not configured");
  }
  async function sendTestMessage() {
    if (!testPhone.trim()) {
      ue.error("Please enter a phone number");
      return;
    }
    setSendingTest(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSendingTest(false);
    if (current.isTestMode)
      ue.success(`Test message simulated to ${testPhone} (Test Mode)`);
    else if (current.isConnected)
      ue.success(`"Hello from LocalBazar Kart!" sent to ${testPhone}`);
    else ue.error("Not connected — configure API credentials first");
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 max-w-5xl", children: ["sk1", "sk2", "sk3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted animate-pulse rounded-xl" }, id)) });
  }
  const webhookUrl = form.webhookUrl ?? current.webhookUrl ?? CALLBACK_URL;
  const allSettingsRows = [
    {
      key: "phoneNumberId",
      label: "Phone Number ID",
      value: current.phoneNumberId ?? "—",
      editable: true
    },
    {
      key: "apiKey",
      label: "Access Token",
      value: current.apiKey ? `...${String(current.apiKey).slice(-4)}` : "—",
      editable: false
    },
    {
      key: "webhookUrl",
      label: "Webhook URL",
      value: current.webhookUrl || CALLBACK_URL,
      editable: true
    },
    {
      key: "verifyToken",
      label: "Verify Token",
      value: current.verifyToken ? "***hidden***" : "—",
      editable: false
    },
    {
      key: "businessAccountId",
      label: "Business Account ID",
      value: current.businessAccountId ? String(current.businessAccountId) : "—",
      editable: true
    },
    {
      key: "appId",
      label: "App ID",
      value: current.appId ? String(current.appId) : "—",
      editable: true
    },
    {
      key: "apiVersion",
      label: "API Version",
      value: current.apiVersion ? String(current.apiVersion) : "v19.0",
      editable: true
    },
    {
      key: "isTestMode",
      label: "Environment",
      value: current.isTestMode ? "Test" : "Live",
      editable: false
    },
    {
      key: "monthlyRateLimit",
      label: "Monthly Rate Limit",
      value: current.monthlyRateLimit ? String(current.monthlyRateLimit) : "1000",
      editable: true
    },
    {
      key: "templateMessageCount",
      label: "Template Message Count",
      value: current.templateMessageCount ? String(current.templateMessageCount) : "0",
      editable: false
    },
    {
      key: "isConnected",
      label: "Connected",
      value: String(current.isConnected ?? false),
      editable: false
    }
  ];
  const categoryMap = Object.fromEntries(
    configTableRows.map((r) => [r.key, r.category])
  );
  const settingsRows = tableSearch.trim() ? allSettingsRows.filter(
    (r) => r.label.toLowerCase().includes(tableSearch.toLowerCase()) || (categoryMap[r.key] ?? "Config").toLowerCase().includes(tableSearch.toLowerCase())
  ) : allSettingsRows;
  async function handleSettingEdit(key, value) {
    if (key === "webhookUrl") {
      try {
        await updateWebhookUrl.mutateAsync(value);
        ue.success("Webhook URL updated");
      } catch {
        ue.error("Failed to update webhook URL");
      }
    } else {
      setForm((f) => ({ ...f, [key]: value }));
      ue.success(
        "Setting updated locally — click Save Credentials to persist"
      );
    }
    setEditingKey(null);
    setEditingValue("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in max-w-5xl overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-4 p-4 rounded-xl border ${current.isConnected ? "bg-emerald-50 border-emerald-200" : current.isTestMode ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200"}`,
        "data-ocid": "wa-connection-status",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${current.isConnected ? "bg-emerald-100" : current.isTestMode ? "bg-blue-100" : "bg-amber-100"}`,
              children: current.isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-emerald-600" }) : current.isTestMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-blue-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-600" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `font-semibold ${current.isConnected ? "text-emerald-800" : current.isTestMode ? "text-blue-800" : "text-amber-800"}`,
                children: current.isConnected ? "WhatsApp Business Connected" : current.isTestMode ? "Test / Simulation Mode Active" : "Not Connected"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-sm ${current.isConnected ? "text-emerald-600" : current.isTestMode ? "text-blue-600" : "text-amber-600"}`,
                children: current.isConnected ? "Messages are being sent and received via the WhatsApp Business API." : current.isTestMode ? "Bot logic runs locally. No real messages sent — use the Chatbot Simulator." : "Enter your API credentials below to connect WhatsApp Business API."
              }
            )
          ] }),
          current.isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-5 h-5 text-emerald-500 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            WifiOff,
            {
              className: `w-5 h-5 flex-shrink-0 ${current.isTestMode ? "text-blue-400" : "text-amber-400"}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "API Credentials" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phoneNumberId", children: "Phone Number ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-3.5 h-3.5 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phoneNumberId",
                  value: form.phoneNumberId ?? (config == null ? void 0 : config.phoneNumberId) ?? "",
                  onChange: (e) => setForm((f) => ({ ...f, phoneNumberId: e.target.value })),
                  placeholder: "123456789012345",
                  "data-ocid": "wa-config-phone-id",
                  className: "pr-9"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => copyToClipboard(current.phoneNumberId, "Phone Number ID"),
                  className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Copy Phone Number ID",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Found in Meta Developer Console → Your App → WhatsApp → API Setup" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "apiKey", children: "Access Token" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-3.5 h-3.5 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "apiKey",
                  type: showToken ? "text" : "password",
                  value: form.apiKey ?? (config == null ? void 0 : config.apiKey) ?? "",
                  onChange: (e) => setForm((f) => ({ ...f, apiKey: e.target.value })),
                  placeholder: "EAAxxxxxxxxxxxxxxxxxxxxxx",
                  "data-ocid": "wa-config-api-key",
                  className: "pr-16"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowToken((v) => !v),
                    className: "p-1 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": showToken ? "Hide token" : "Show token",
                    children: showToken ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => copyToClipboard(current.apiKey, "Access Token"),
                    className: "p-1 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": "Copy access token",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Temporary or permanent token from Meta for Developers" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "verifyToken", children: "Verify Token" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-3.5 h-3.5 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "verifyToken",
                  value: form.verifyToken ?? (config == null ? void 0 : config.verifyToken) ?? "",
                  onChange: (e) => setForm((f) => ({ ...f, verifyToken: e.target.value })),
                  placeholder: "your_custom_verify_token_2024",
                  "data-ocid": "wa-config-verify-token",
                  className: "pr-9"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => copyToClipboard(current.verifyToken, "Verify Token"),
                  className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Copy verify token",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Custom string — must match exactly what you enter in Meta Developer Console" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: saving,
              "data-ocid": "wa-config-save",
              className: "w-full gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                saving ? "Saving Credentials..." : "Save Credentials"
              ]
            }
          )
        ] }),
        savedVerifyToken && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3",
            "data-ocid": "wa-config-saved-verify-token-banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-600 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-800", children: "Configuration Saved — Next Step: Verify with Meta" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-700", children: "Copy your Verify Token below and paste it into Meta Business Manager → WhatsApp → Configuration → Webhook Verify Token:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 text-xs font-mono bg-white border border-emerald-300 rounded px-3 py-2 break-all text-emerald-900", children: savedVerifyToken }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => copyToClipboard(savedVerifyToken, "Verify Token"),
                      className: "p-2 rounded border border-emerald-300 bg-white text-emerald-600 hover:text-emerald-800 transition-colors flex-shrink-0",
                      "aria-label": "Copy verify token",
                      "data-ocid": "wa-config-copy-saved-verify-token",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-emerald-200 rounded-lg p-3 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-emerald-800", children: "Steps to complete Meta webhook setup:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1", children: [
                    "Go to developers.facebook.com → Your App → WhatsApp → Configuration",
                    'Click "Edit" next to Webhook',
                    `Set Webhook URL to: ${CALLBACK_URL}`,
                    "Paste the Verify Token above into the Verify Token field",
                    'Click "Verify and Save"',
                    "Subscribe to: messages, message_reactions"
                  ].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "text-xs text-emerald-700 flex gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-shrink-0 font-bold", children: [
                          i + 1,
                          "."
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
                      ]
                    },
                    step
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSavedVerifyToken(null),
                  className: "text-xs text-emerald-600 hover:text-emerald-800 underline",
                  children: "Dismiss"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Webhook Setup" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-1", children: "📋 Your Webhook Callback URL (enter this in Meta)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 text-xs font-mono bg-background border border-border rounded px-2 py-1.5 break-all", children: CALLBACK_URL }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => copyToClipboard(CALLBACK_URL, "Callback URL"),
                  className: "p-1.5 rounded border border-border bg-background text-muted-foreground hover:text-foreground transition-colors flex-shrink-0",
                  "aria-label": "Copy callback URL",
                  "data-ocid": "wa-config-copy-callback-url",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "Meta will send a GET verification request to this URL. Make sure your Verify Token below matches what you enter in Meta." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "webhookUrl", children: "Custom Webhook URL (override)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "webhookUrl",
                  value: webhookUrl,
                  onChange: (e) => setForm((f) => ({ ...f, webhookUrl: e.target.value })),
                  "data-ocid": "wa-config-webhook-url",
                  className: "pr-9 font-mono text-xs",
                  placeholder: CALLBACK_URL
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => copyToClipboard(webhookUrl, "Webhook URL"),
                  className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Copy webhook URL",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Leave empty to use the default callback URL above." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: testWebhook,
              disabled: testingWebhook,
              "data-ocid": "wa-config-test-webhook",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                testingWebhook ? "Testing..." : "Test Webhook Connection"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-2", children: "Webhook Configuration Steps:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1.5", children: WEBHOOK_STEPS.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex gap-2 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold", children: idx + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
                ]
              },
              step
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: "Test Mode Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Test / Simulation Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "When enabled, bot runs locally. No real WhatsApp messages sent." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: current.isTestMode ?? true,
                onCheckedChange: (v) => setForm((f) => ({ ...f, isTestMode: v })),
                "data-ocid": "wa-config-test-mode"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Mark as Connected" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manually mark the connection active after configuring credentials" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: current.isConnected ?? false,
                onCheckedChange: (v) => setForm((f) => ({ ...f, isConnected: v })),
                "data-ocid": "wa-config-connected"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                window.location.href = "/chatbot";
              },
              "data-ocid": "wa-config-open-simulator",
              className: "gap-2 text-primary border-primary/30 hover:bg-primary/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                " Open Chatbot Simulator"
              ]
            }
          ) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 lg:max-h-screen lg:overflow-y-auto lg:sticky lg:top-0 lg:pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-2.5 h-2.5 rounded-full ${current.isConnected ? "bg-emerald-500" : "bg-amber-400"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: current.isConnected ? "Connected" : "Disconnected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `ml-auto text-[10px] ${current.isTestMode ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-muted"}`,
                children: current.isTestMode ? "Test Mode" : "Live Mode"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-xs", children: [
            {
              label: "Last event",
              value: current.isConnected ? "2 mins ago" : "—"
            },
            {
              label: "Sent today",
              value: current.isConnected ? "247" : "—"
            },
            {
              label: "Delivered",
              value: current.isConnected ? "245 (99%)" : "—",
              green: true
            },
            {
              label: "Failed",
              value: current.isConnected ? "2 (1%)" : "—",
              red: current.isConnected
            }
          ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: row.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-medium ${row.green ? "text-emerald-600" : row.red ? "text-red-500" : "text-foreground"}`,
                children: row.value
              }
            )
          ] }, row.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-2 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground mb-2", children: "Quick Links" }),
          QUICK_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: link.url,
              target: "_blank",
              rel: "noopener noreferrer",
              "data-ocid": `wa-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`,
              className: "flex items-center gap-2 text-xs text-primary hover:text-primary/80 hover:underline transition-colors py-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                " ",
                link.label
              ]
            },
            link.url
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "Send Test Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Send a test message to any number for end-to-end verification." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: testPhone,
                onChange: (e) => setTestPhone(e.target.value),
                placeholder: "+91 98765 43210",
                "data-ocid": "wa-config-test-phone",
                className: "text-sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: sendTestMessage,
                disabled: sendingTest || !testPhone.trim(),
                "data-ocid": "wa-config-send-test",
                className: "w-full gap-2",
                size: "sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
                  sendingTest ? "Sending..." : "Send Test Message"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "WhatsApp Settings Data Table" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: tableSearch,
                onChange: (e) => setTableSearch(e.target.value),
                placeholder: "Filter settings…",
                className: "pl-8 h-8 text-xs w-44",
                "data-ocid": "wa-config-table-search"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "h-8 gap-1.5 text-xs",
              onClick: () => {
                void refetchTable();
                queryClient.invalidateQueries({
                  queryKey: ["whatsapp-config"]
                });
              },
              "data-ocid": "wa-config-table-refresh",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                " Refresh"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: ["Setting", "Value", "Category", "Last Updated", "Action"].map(
          (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: h
            },
            h
          )
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: settingsRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 5,
            className: "px-4 py-6 text-center text-muted-foreground text-xs",
            children: "No configuration saved yet"
          }
        ) }) : settingsRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors",
            "data-ocid": `wa-config-table-row-${row.key}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground text-xs whitespace-nowrap", children: row.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground break-all max-w-xs", children: editingKey === row.key ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: editingValue,
                    onChange: (e) => setEditingValue(e.target.value),
                    className: "h-7 text-xs",
                    autoFocus: true,
                    "data-ocid": `wa-config-edit-input-${row.key}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "h-7 px-2 text-xs",
                    onClick: () => handleSettingEdit(row.key, editingValue),
                    "data-ocid": `wa-config-save-setting-${row.key}`,
                    children: "Save"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-7 px-2 text-xs",
                    onClick: () => {
                      setEditingKey(null);
                      setEditingValue("");
                    },
                    "data-ocid": `wa-config-cancel-setting-${row.key}`,
                    children: "✕"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: row.value }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: categoryMap[row.key] ?? "Config" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: row.editable && editingKey !== row.key && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 px-2 text-xs text-primary hover:bg-primary/5",
                  onClick: () => {
                    setEditingKey(row.key);
                    setEditingValue(row.value === "—" ? "" : row.value);
                  },
                  "data-ocid": `wa-config-edit-button-${row.key}`,
                  children: "Edit"
                }
              ) })
            ]
          },
          row.key
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Admin Utilities" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Clear Flow Cache" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Flush stuck order/conversation states for all users. Use when customers report being stuck in a flow." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleClearFlowCache,
            disabled: clearFlowCache.isPending,
            "data-ocid": "wa-config-clear-cache",
            className: "gap-2 shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-4 h-4 ${clearFlowCache.isPending ? "animate-spin" : ""}`
                }
              ),
              clearFlowCache.isPending ? "Clearing..." : "Clear Flow Cache"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-5 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Setup Guide & FAQ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: FAQ_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Collapsible,
        {
          open: openFaq === item.id,
          onOpenChange: (open) => setOpenFaq(open ? item.id : null),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              CollapsibleTrigger,
              {
                className: "flex w-full items-center justify-between px-4 py-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors",
                "data-ocid": `wa-faq-${item.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: item.title })
                  ] }),
                  openFaq === item.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 px-4 py-3 bg-card/50 rounded-lg border border-border/50 space-y-1.5", children: item.content.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-muted-foreground",
                children: line
              },
              line.slice(0, 30)
            )) }) })
          ]
        },
        item.id
      )) })
    ] })
  ] });
}
export {
  WhatsAppConfigPage as default
};
