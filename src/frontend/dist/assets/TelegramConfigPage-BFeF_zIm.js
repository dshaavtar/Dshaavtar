import { ao as useQueryClient, cP as useTelegramConfig, cQ as useTelegramConfigTable, cR as useUpdateTelegramConfig, cS as useTestTelegramConnection, cT as useClearWebhookAndPoll, cU as useGetWebhookDiagnostics, cV as useForceClearWebhookConfig, cW as useTestTelegramOutcall, cX as useTestTelegramSendMessage, cY as useTelegramDeliveryMode, cZ as useGetTelegramDebugInfo, r as reactExports, j as jsxRuntimeExports, p as ue, ai as readModuleStatuses, c_ as getEnabledFlows } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { W as WifiOff, C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DsyjSJkZ.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { S as Send } from "./send-DoOOMmv0.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { W as Wifi } from "./wifi-M1a8JQvE.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { X } from "./x-Chksmd6i.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
import { B as Bot } from "./bot-egkDiXjP.js";
import { C as CircleHelp } from "./circle-help-CUB1AuXK.js";
import { E as EyeOff } from "./eye-off-DrNsJOxE.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BrZkK7cW.js";
import "./index-CUcO6jhF.js";
import "./index-BNXq-E6T.js";
import "./index-DYndF6Sn.js";
import "./index-BtrS4JsN.js";
import "./index-z5OST4d2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
];
const Radio = createLucideIcon("radio", __iconNode);
const PLATFORM_WEBHOOK_URL = "https://bot.localbazar.shop/telegram/webhook";
let MIRRORED_FLOWS = [];
readModuleStatuses().then((statuses) => {
  MIRRORED_FLOWS = getEnabledFlows(statuses).map((f) => ({
    name: f.name,
    key: f.id
  }));
});
const SETUP_STEPS = [
  {
    step: 1,
    title: "Create a Telegram Bot via @BotFather",
    detail: "Open Telegram, search for @BotFather and send /newbot. Follow the prompts to name your bot. Copy the token it gives you."
  },
  {
    step: 2,
    title: "Paste the bot token above",
    detail: "Copy the token from BotFather (format: 123456:ABC-DEF...) and paste it into the Bot Token field on this page."
  },
  {
    step: 3,
    title: "Register the webhook with Telegram",
    detail: `Call this URL in your browser:
https://api.telegram.org/bot{TOKEN}/setWebhook?url=${PLATFORM_WEBHOOK_URL}`
  },
  {
    step: 4,
    title: "Get your Alert Chat ID",
    detail: 'Message your bot once, then call: https://api.telegram.org/bot{TOKEN}/getUpdates\nLook for "chat" in the JSON response — the "id" field is your Chat ID.'
  },
  {
    step: 5,
    title: "Test the connection",
    detail: "Click the Test Connection button above. A test message will be sent to your Alert Chat ID to confirm everything is working."
  }
];
function TelegramConfigPage() {
  const queryClient = useQueryClient();
  const { data: config, isLoading } = useTelegramConfig();
  const { data: tableRows = [], refetch: refetchTable } = useTelegramConfigTable();
  const updateConfig = useUpdateTelegramConfig();
  const testConnection = useTestTelegramConnection();
  const clearWebhookAndPoll = useClearWebhookAndPoll();
  const getWebhookDiagnostics = useGetWebhookDiagnostics();
  const forceClearWebhook = useForceClearWebhookConfig();
  const testOutcall = useTestTelegramOutcall();
  const testSendMsg = useTestTelegramSendMessage();
  const { data: deliveryModeData, refetch: refetchDeliveryMode } = useTelegramDeliveryMode();
  const getDebugInfo = useGetTelegramDebugInfo();
  const [form, setForm] = reactExports.useState({
    botToken: "",
    webhookUrl: PLATFORM_WEBHOOK_URL,
    alertChatId: "",
    botUsername: "",
    isEnabled: false
  });
  const [showToken, setShowToken] = reactExports.useState(false);
  const [openStep, setOpenStep] = reactExports.useState(null);
  const [flowStatuses, setFlowStatuses] = reactExports.useState({});
  const [pollResult, setPollResult] = reactExports.useState(null);
  const [diagnostics, setDiagnostics] = reactExports.useState(
    null
  );
  const [showDiagnostics, setShowDiagnostics] = reactExports.useState(false);
  const [forceClearResult, setForceClearResult] = reactExports.useState(null);
  const [outcallResult, setOutcallResult] = reactExports.useState(null);
  const [showOutcallPanel, setShowOutcallPanel] = reactExports.useState(false);
  const [sendMsgChatId, setSendMsgChatId] = reactExports.useState("");
  const [sendMsgResult, setSendMsgResult] = reactExports.useState(null);
  const [debugInfo, setDebugInfo] = reactExports.useState(null);
  const [showDebugPanel, setShowDebugPanel] = reactExports.useState(false);
  const [testConnectionResult, setTestConnectionResult] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!config) return;
    const c = config;
    setForm({
      botToken: String(c.botToken ?? ""),
      webhookUrl: String(c.webhookUrl ?? PLATFORM_WEBHOOK_URL),
      alertChatId: String(c.alertChatId ?? ""),
      botUsername: String(c.botUsername ?? ""),
      isEnabled: Boolean(c.isEnabled ?? false)
    });
    if (c.flowStatuses && typeof c.flowStatuses === "object") {
      setFlowStatuses(c.flowStatuses);
    }
  }, [config]);
  const isConnected = Boolean(
    config == null ? void 0 : config.isConnected
  );
  const isConfigured = Boolean(form.botToken);
  const hasWebhookError = Boolean(diagnostics == null ? void 0 : diagnostics.lastErrorMessage);
  const webhookStatusLabel = form.webhookUrl && form.isEnabled ? hasWebhookError ? "Webhook Error" : "Webhook Active" : "Not Configured";
  const webhookStatusColor = form.webhookUrl && form.isEnabled ? hasWebhookError ? "bg-amber-50 text-amber-700 border-amber-300" : "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground border-border";
  const webhookStatusDot = form.webhookUrl && form.isEnabled ? hasWebhookError ? "bg-amber-500" : "bg-emerald-500" : "bg-muted-foreground/40";
  const statusLabel = isConnected ? "Connected" : isConfigured ? "Configured — Not Connected" : "Not Configured";
  const statusColor = isConnected ? "bg-emerald-50 border-emerald-200" : isConfigured ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200";
  const statusIconColor = isConnected ? "bg-emerald-100" : isConfigured ? "bg-blue-100" : "bg-amber-100";
  const statusTextColor = isConnected ? "text-emerald-800" : isConfigured ? "text-blue-800" : "text-amber-800";
  function copyToClipboard(text, label) {
    if (!text) {
      ue.error(`${label} is empty`);
      return;
    }
    navigator.clipboard.writeText(text).then(() => ue.success(`${label} copied!`));
  }
  async function handleSave(e) {
    var _a;
    e.preventDefault();
    try {
      const payload = {
        ...form,
        webhookUrl: ((_a = form.webhookUrl) == null ? void 0 : _a.trim()) || PLATFORM_WEBHOOK_URL
      };
      await updateConfig.mutateAsync(payload);
      await queryClient.invalidateQueries({ queryKey: ["telegram-config"] });
      await queryClient.invalidateQueries({
        queryKey: ["telegram-config-table"]
      });
      ue.success("Telegram configuration saved successfully!");
    } catch (err) {
      ue.error(
        `Failed to save: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  }
  function handleReset() {
    setForm({
      botToken: "",
      webhookUrl: PLATFORM_WEBHOOK_URL,
      alertChatId: "",
      botUsername: "",
      isEnabled: false
    });
    ue.info("Form cleared");
  }
  async function handleTestConnection() {
    setTestConnectionResult(null);
    try {
      const result = await testConnection.mutateAsync(void 0);
      const username = (result == null ? void 0 : result.botUsername) || (result == null ? void 0 : result.username) || form.botUsername || null;
      const msg = username ? `✓ Bot token is valid. Bot: @${username}` : "✓ Bot token is valid and connection succeeded.";
      setTestConnectionResult({ type: "success", message: msg });
      ue.success(msg);
      await queryClient.invalidateQueries({ queryKey: ["telegram-config"] });
    } catch (err) {
      const raw = err instanceof Error ? err.message : "Unknown error";
      const hint = raw.toLowerCase().includes("chat") ? `${raw} — Note: this basic connection test only needs your bot token, not a Chat ID. Enter a Chat ID in the "Test Send Message" section below to test actual message delivery.` : raw;
      setTestConnectionResult({ type: "error", message: hint });
      ue.error(`Connection test failed — ${raw}`);
    }
  }
  async function handlePollNow() {
    setPollResult(null);
    try {
      const result = await clearWebhookAndPoll.mutateAsync();
      const count = result.messagesProcessed;
      const msg = `Drained ${count} message${count !== 1 ? "s" : ""} from Telegram queue. Check Bot Logs → Telegram tab to see them.`;
      setPollResult({ type: "success", message: msg });
      ue.success(msg);
      await queryClient.invalidateQueries({ queryKey: ["bot-logs-telegram"] });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Poll failed — unknown error";
      setPollResult({ type: "error", message: msg });
      ue.error(msg);
    }
  }
  async function handleGetDiagnostics() {
    try {
      const result = await getWebhookDiagnostics.mutateAsync();
      setDiagnostics(result);
      setShowDiagnostics(true);
    } catch (err) {
      ue.error(
        `Diagnostics failed — ${err instanceof Error ? err.message : "unknown error"}`
      );
    }
  }
  async function handleForceClearWebhook() {
    setForceClearResult(null);
    try {
      const result = await forceClearWebhook.mutateAsync();
      setForceClearResult({
        type: result.cleared ? "success" : "error",
        message: result.message
      });
      if (result.cleared) {
        ue.success(result.message);
        setForm((f) => ({ ...f, webhookUrl: "" }));
      } else {
        ue.error(result.message);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Force clear failed";
      setForceClearResult({ type: "error", message: msg });
      ue.error(msg);
    }
  }
  async function handleTestOutcall() {
    setOutcallResult(null);
    setShowOutcallPanel(false);
    try {
      const result = await testOutcall.mutateAsync();
      setOutcallResult(result);
      setShowOutcallPanel(true);
      if (result.botTokenValid) {
        const botLabel = result.botUsername ? ` — Bot: @${result.botUsername}` : "";
        ue.success(
          `HTTP outcall succeeded (${result.httpStatus})${botLabel}`
        );
      } else {
        ue.error(
          `HTTP outcall returned ${result.httpStatus} — ${result.errorMessage ?? "check bot token"}`
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Test outcall failed";
      ue.error(msg);
    }
  }
  async function handleGetDebugInfo() {
    try {
      const result = await getDebugInfo.mutateAsync();
      setDebugInfo(result);
      setShowDebugPanel(true);
      void refetchDeliveryMode();
    } catch (err) {
      ue.error(
        `Debug info failed — ${err instanceof Error ? err.message : "unknown error"}`
      );
    }
  }
  async function handleTestSendMessage() {
    if (!sendMsgChatId.trim()) {
      ue.error("Enter a Chat ID first");
      return;
    }
    setSendMsgResult(null);
    try {
      const result = await testSendMsg.mutateAsync(sendMsgChatId.trim());
      setSendMsgResult(result);
      if (result.success) {
        ue.success(`Test message delivered to ${sendMsgChatId}`);
      } else {
        ue.error(`Send failed: ${result.errorMessage ?? "unknown error"}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Send test failed";
      ue.error(msg);
      setSendMsgResult({
        success: false,
        chatId: sendMsgChatId,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleString("en-IN"),
        errorMessage: msg
      });
    }
  }
  const recentMessages = (config == null ? void 0 : config.recentMessages) ?? [];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 max-w-5xl", children: ["sk1", "sk2", "sk3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted animate-pulse rounded-xl" }, id)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-6 animate-fade-in max-w-5xl overflow-x-hidden",
      "data-ocid": "telegram_config.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5 text-primary" }),
              "Telegram Integration"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Mirror WhatsApp chatbot flows through Telegram Bot API" })
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
                onClick: () => {
                  void queryClient.invalidateQueries({
                    queryKey: ["telegram-config"]
                  });
                  void refetchTable();
                },
                "data-ocid": "telegram_config.refresh_button",
                className: "gap-1.5 text-xs",
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
            className: `flex items-center gap-4 p-4 rounded-xl border ${statusColor}`,
            "data-ocid": "telegram_config.status_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${statusIconColor}`,
                  children: isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-emerald-600" }) : isConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-blue-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-600" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-semibold ${statusTextColor}`, children: statusLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-sm ${isConnected ? "text-emerald-600" : isConfigured ? "text-blue-600" : "text-amber-600"}`,
                    children: isConnected ? `Bot @${form.botUsername || "your-bot"} is active and receiving messages.` : isConfigured ? "Bot token saved — click Test Connection to verify." : "Enter your bot token below to get started."
                  }
                ),
                form.botUsername && isConnected && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-700 mt-0.5 font-mono", children: [
                  "@",
                  form.botUsername
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 flex-wrap", children: [
                isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-5 h-5 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-5 h-5 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: handleTestConnection,
                    disabled: testConnection.isPending || !isConfigured,
                    "data-ocid": "telegram_config.test_connection_button",
                    className: "gap-1.5 text-xs border-border bg-white/80 hover:bg-white",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Zap,
                        {
                          className: `w-3.5 h-3.5 ${testConnection.isPending ? "animate-pulse" : ""}`
                        }
                      ),
                      testConnection.isPending ? "Testing…" : "Test Connection"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        deliveryModeData && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium ${deliveryModeData.deliveryMode === "Webhook" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : deliveryModeData.deliveryMode === "Polling" ? "bg-blue-50 border-blue-200 text-blue-800" : "bg-muted border-border text-muted-foreground"}`,
            "data-ocid": "telegram_config.delivery_mode",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `w-2.5 h-2.5 rounded-full flex-shrink-0 ${deliveryModeData.deliveryMode === "Webhook" ? "bg-emerald-500" : deliveryModeData.deliveryMode === "Polling" ? "bg-blue-500" : "bg-muted-foreground/40"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Delivery Mode:" }),
                " ",
                deliveryModeData.deliveryMode
              ] }),
              deliveryModeData.webhookUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-normal truncate max-w-[260px]",
                  title: deliveryModeData.webhookUrl,
                  children: [
                    "— ",
                    deliveryModeData.webhookUrl
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => void refetchDeliveryMode(),
                  className: "ml-auto text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Refresh delivery mode",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${webhookStatusColor}`,
              "data-ocid": "telegram_config.webhook_status",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-2 h-2 rounded-full flex-shrink-0 ${webhookStatusDot}`
                  }
                ),
                webhookStatusLabel,
                hasWebhookError && (diagnostics == null ? void 0 : diagnostics.lastErrorMessage) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "ml-1 text-amber-700 font-normal truncate max-w-[180px]",
                    title: diagnostics.lastErrorMessage,
                    children: [
                      "— ",
                      diagnostics.lastErrorMessage.slice(0, 60),
                      diagnostics.lastErrorMessage.length > 60 ? "…" : ""
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handlePollNow,
                disabled: clearWebhookAndPoll.isPending || !isConfigured,
                "data-ocid": "telegram_config.poll_now_button",
                className: "gap-1.5 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Radio,
                    {
                      className: `w-3.5 h-3.5 ${clearWebhookAndPoll.isPending ? "animate-pulse" : ""}`
                    }
                  ),
                  clearWebhookAndPoll.isPending ? "Polling Telegram…" : "Poll Now (Diagnostic)"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleGetDiagnostics,
                disabled: getWebhookDiagnostics.isPending || !isConfigured,
                "data-ocid": "telegram_config.diagnostics_button",
                className: "gap-1.5 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-3.5 h-3.5 ${getWebhookDiagnostics.isPending ? "animate-spin" : ""}`
                    }
                  ),
                  getWebhookDiagnostics.isPending ? "Fetching…" : "Webhook Diagnostics"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleForceClearWebhook,
                disabled: forceClearWebhook.isPending || !isConfigured,
                "data-ocid": "telegram_config.force_clear_webhook_button",
                className: "gap-1.5 text-xs text-amber-700 border-amber-300 hover:bg-amber-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Trash2,
                    {
                      className: `w-3.5 h-3.5 ${forceClearWebhook.isPending ? "animate-pulse" : ""}`
                    }
                  ),
                  forceClearWebhook.isPending ? "Clearing…" : "Force Clear Webhook"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => void handleGetDebugInfo(),
                disabled: getDebugInfo.isPending || !isConfigured,
                "data-ocid": "telegram_config.debug_info_button",
                className: "gap-1.5 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-3.5 h-3.5 ${getDebugInfo.isPending ? "animate-spin" : ""}`
                    }
                  ),
                  getDebugInfo.isPending ? "Checking…" : "Live Webhook Status"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleTestOutcall,
                disabled: testOutcall.isPending || !isConfigured,
                "data-ocid": "telegram_config.test_outcall_button",
                className: "gap-1.5 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Zap,
                    {
                      className: `w-3.5 h-3.5 ${testOutcall.isPending ? "animate-pulse" : ""}`
                    }
                  ),
                  testOutcall.isPending ? "Testing Outcall…" : "Test HTTP Outcall"
                ]
              }
            )
          ] })
        ] }),
        testConnectionResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-start gap-3 p-3 rounded-lg border ${testConnectionResult.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`,
            "data-ocid": "telegram_config.test_connection_result",
            children: [
              testConnectionResult.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-xs flex-1 ${testConnectionResult.type === "success" ? "text-emerald-800" : "text-amber-800"}`,
                  children: testConnectionResult.message
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setTestConnectionResult(null),
                  className: "text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "⚠ Poll Now" }),
            " temporarily removes the webhook to drain queued messages, then restores it. Use only for diagnostics.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "If your webhook is active" }),
            ", getUpdates will return empty — that is expected. Telegram sends all messages to the webhook instead of queuing them for polling."
          ] })
        ] }),
        pollResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-start gap-3 p-3 rounded-lg border ${pollResult.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`,
            "data-ocid": "telegram_config.poll_result",
            children: [
              pollResult.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-xs flex-1 ${pollResult.type === "success" ? "text-emerald-800" : "text-red-800"}`,
                  children: pollResult.message
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPollResult(null),
                  className: "text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        ),
        forceClearResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-start gap-3 p-3 rounded-lg border ${forceClearResult.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`,
            "data-ocid": "telegram_config.force_clear_result",
            children: [
              forceClearResult.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: `text-xs flex-1 ${forceClearResult.type === "success" ? "text-emerald-800" : "text-red-800"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Force Clear Webhook:" }),
                    " ",
                    forceClearResult.message
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setForceClearResult(null),
                  className: "text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        ),
        showOutcallPanel && outcallResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card",
            "data-ocid": "telegram_config.outcall_result_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
                  "HTTP Outcall Test Result"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowOutcallPanel(false),
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": "Close outcall result",
                    "data-ocid": "telegram_config.close_outcall_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              outcallResult.botUsername && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-emerald-600 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-700 font-semibold uppercase tracking-wide", children: "Bot Connected" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-emerald-800 font-mono", children: [
                    "@",
                    outcallResult.botUsername
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold", children: "HTTP Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-sm font-bold font-mono mt-0.5 ${outcallResult.httpStatus >= 200 && outcallResult.httpStatus < 300 ? "text-emerald-600" : "text-red-600"}`,
                      children: outcallResult.httpStatus || "—"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold", children: "Token Valid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-sm font-bold mt-0.5 ${outcallResult.botTokenValid ? "text-emerald-600" : "text-red-600"}`,
                      children: outcallResult.botTokenValid ? "✓ Yes" : "✗ No"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold", children: "/getMe" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono mt-0.5 text-foreground", children: outcallResult.getMeStatus ?? (outcallResult.botTokenValid ? "✓ ok" : "✗ failed") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold", children: "/sendMessage" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono mt-0.5 text-foreground", children: outcallResult.sendMessageStatus ?? "—" })
                ] })
              ] }),
              outcallResult.errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-red-700 uppercase tracking-wide font-semibold mb-1", children: "Error Detail" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-red-800 break-words", children: outcallResult.errorMessage })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Response Body" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[11px] font-mono text-foreground bg-muted/40 border border-border rounded-lg p-3 overflow-x-auto max-h-36 whitespace-pre-wrap break-words", children: outcallResult.responseBody || "— no response —" })
              ] }),
              !outcallResult.botTokenValid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800", children: "HTTP outcall to Telegram API failed. The ICP canister cannot reach Telegram's servers. Check that HTTP outcalls are enabled for this canister." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card",
            "data-ocid": "telegram_config.send_test_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Test Send Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] ml-1 bg-blue-50 text-blue-700 border-blue-200",
                    children: "Diagnostic"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sends a test message using the exact same code path as the real webhook handler. If this succeeds, the bot can send messages and real flows will work." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: sendMsgChatId,
                    onChange: (e) => setSendMsgChatId(e.target.value),
                    placeholder: form.alertChatId || "-1001234567890",
                    className: "flex-1 font-mono text-xs",
                    "data-ocid": "telegram_config.send_test_chat_id_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      if (form.alertChatId && !sendMsgChatId) {
                        setSendMsgChatId(form.alertChatId);
                      }
                    },
                    className: "text-xs gap-1 shrink-0",
                    "data-ocid": "telegram_config.use_alert_chat_id_button",
                    children: "Use Alert ID"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    onClick: handleTestSendMessage,
                    disabled: testSendMsg.isPending || !isConfigured,
                    "data-ocid": "telegram_config.send_test_message_button",
                    className: "gap-1.5 text-xs shrink-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Send,
                        {
                          className: `w-3.5 h-3.5 ${testSendMsg.isPending ? "animate-pulse" : ""}`
                        }
                      ),
                      testSendMsg.isPending ? "Sending…" : "Send Test Message"
                    ]
                  }
                )
              ] }),
              sendMsgResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-start gap-3 p-3 rounded-lg border ${sendMsgResult.success ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`,
                  "data-ocid": "telegram_config.send_test_result",
                  children: [
                    sendMsgResult.success ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `text-xs font-semibold ${sendMsgResult.success ? "text-emerald-800" : "text-red-800"}`,
                          children: sendMsgResult.success ? `✓ Test message sent to ${sendMsgResult.chatId}` : `✗ Failed to send to ${sendMsgResult.chatId}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: sendMsgResult.timestamp }),
                      sendMsgResult.errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-red-700 mt-1 break-words", children: sendMsgResult.errorMessage }),
                      sendMsgResult.rawResponse && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[10px] font-mono bg-muted/40 rounded p-2 mt-1.5 overflow-x-auto max-h-24 break-words whitespace-pre-wrap", children: sendMsgResult.rawResponse })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSendMsgResult(null),
                        className: "text-muted-foreground hover:text-foreground",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        showDebugPanel && debugInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card",
            "data-ocid": "telegram_config.live_debug_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-4 h-4 text-primary" }),
                  "Live Webhook Status"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 text-xs gap-1",
                      onClick: () => void handleGetDebugInfo(),
                      disabled: getDebugInfo.isPending,
                      "data-ocid": "telegram_config.refresh_debug_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          RefreshCw,
                          {
                            className: `w-3 h-3 ${getDebugInfo.isPending ? "animate-spin" : ""}`
                          }
                        ),
                        "Refresh"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowDebugPanel(false),
                      className: "text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Close live status",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${debugInfo.deliveryMode === "Webhook" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : debugInfo.deliveryMode === "Polling" ? "bg-blue-50 border-blue-200 text-blue-800" : "bg-muted border-border text-muted-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-2 h-2 rounded-full ${debugInfo.deliveryMode === "Webhook" ? "bg-emerald-500" : debugInfo.deliveryMode === "Polling" ? "bg-blue-500" : "bg-muted-foreground/40"}`
                      }
                    ),
                    debugInfo.deliveryMode,
                    " Mode"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
                {
                  label: "Webhook URL (Telegram)",
                  value: debugInfo.webhookUrl || "— not registered —",
                  mono: true,
                  color: debugInfo.webhookConfigured ? "text-emerald-700" : "text-muted-foreground"
                },
                {
                  label: "Pending Updates",
                  value: String(debugInfo.pendingUpdateCount),
                  mono: true,
                  color: debugInfo.pendingUpdateCount > 0 ? "text-amber-700" : "text-foreground"
                },
                {
                  label: "Last Error",
                  value: debugInfo.lastErrorMessage || "— none —",
                  mono: false,
                  color: debugInfo.lastErrorMessage ? "text-red-700" : "text-foreground"
                },
                {
                  label: "Last Error Date",
                  value: debugInfo.lastErrorDate ? new Date(debugInfo.lastErrorDate * 1e3).toLocaleString(
                    "en-IN"
                  ) : "—",
                  mono: false,
                  color: "text-foreground"
                },
                {
                  label: "Bot Token Set",
                  value: debugInfo.botTokenSet ? "✓ Yes" : "✗ No",
                  mono: false,
                  color: debugInfo.botTokenSet ? "text-emerald-700" : "text-red-700"
                },
                {
                  label: "Polling Active",
                  value: debugInfo.pollingActive ? "Yes" : "No",
                  mono: false,
                  color: debugInfo.pollingActive ? "text-blue-700" : "text-muted-foreground"
                }
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold", children: row.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs mt-0.5 break-all ${row.mono ? "font-mono" : ""} ${row.color}`,
                    children: row.value
                  }
                )
              ] }, row.label)) }),
              debugInfo.pendingUpdateCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-800", children: [
                  "Telegram has ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: debugInfo.pendingUpdateCount }),
                  " ",
                  "messages queued. If you have a webhook registered, Telegram is failing to deliver them. Check the Last Error field above and click ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Poll Now" }),
                  " to drain the queue."
                ] })
              ] }),
              debugInfo.webhookConfigured && debugInfo.pollingActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-800", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "⚠ Conflict detected:" }),
                  " Both webhook and polling appear active simultaneously. Telegram will return 409 Conflict on getUpdates calls and messages will be silently dropped. Click",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Force Clear Webhook" }),
                  " to resolve."
                ] })
              ] }),
              debugInfo.rawResponse && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Raw Telegram getWebhookInfo Response" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[11px] font-mono text-foreground bg-muted/40 border border-border rounded-lg p-3 overflow-x-auto max-h-36 whitespace-pre-wrap break-words", children: debugInfo.rawResponse })
              ] })
            ]
          }
        ),
        showDiagnostics && diagnostics && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card",
            "data-ocid": "telegram_config.diagnostics_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-primary" }),
                  "Webhook Diagnostics"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 text-xs gap-1",
                      onClick: () => {
                        navigator.clipboard.writeText(diagnostics.rawJson).then(() => ue.success("Raw JSON copied!"));
                      },
                      "data-ocid": "telegram_config.copy_diagnostics_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                        "Copy Raw JSON"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowDiagnostics(false),
                      className: "text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Close diagnostics",
                      "data-ocid": "telegram_config.close_diagnostics_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                {
                  label: "Registered Webhook URL",
                  value: diagnostics.webhookUrl || "— not set —"
                },
                {
                  label: "Pending Update Count",
                  value: String(diagnostics.pendingUpdateCount)
                },
                {
                  label: "Last Error",
                  value: diagnostics.lastErrorMessage || "— none —"
                },
                {
                  label: "Last Error Date",
                  value: diagnostics.lastErrorDate ? new Date(diagnostics.lastErrorDate * 1e3).toLocaleString(
                    "en-IN"
                  ) : "—"
                },
                {
                  label: "Polling Active",
                  value: diagnostics.isPollingActive ? "Yes" : "No"
                }
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold", children: row.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs font-mono mt-0.5 break-all ${row.label === "Last Error" && diagnostics.lastErrorMessage ? "text-red-600" : "text-foreground"}`,
                    children: row.value
                  }
                )
              ] }, row.label)) }),
              diagnostics.pendingUpdateCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-800", children: [
                  "There are ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: diagnostics.pendingUpdateCount }),
                  " ",
                  "messages queued with Telegram. Click ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Poll Now" }),
                  " ",
                  "to drain them."
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSave, className: "space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Bot Configuration" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tg-bot-token", children: "Bot Token" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-3.5 h-3.5 text-muted-foreground" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "tg-bot-token",
                      type: showToken ? "text" : "password",
                      value: form.botToken,
                      onChange: (e) => setForm((f) => ({ ...f, botToken: e.target.value })),
                      placeholder: "123456789:ABCDefGhIJklmnoPQRstuvwXYZ",
                      className: "pr-16",
                      "data-ocid": "telegram_config.bot_token_input"
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
                        onClick: () => copyToClipboard(form.botToken, "Bot Token"),
                        className: "p-1 text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Copy bot token",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Get this from @BotFather on Telegram using the /newbot command" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tg-webhook-url", children: "Webhook URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "tg-webhook-url",
                      value: form.webhookUrl,
                      onChange: (e) => setForm((f) => ({ ...f, webhookUrl: e.target.value })),
                      placeholder: PLATFORM_WEBHOOK_URL,
                      className: "pr-9 font-mono text-xs",
                      "data-ocid": "telegram_config.webhook_url_input"
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Edit this URL if needed, then save. After saving, register it with Telegram by opening this URL in your browser:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 border border-border rounded-lg p-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "text-[11px] font-mono text-foreground break-all select-all", children: [
                    "https://api.telegram.org/bot",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: "{YOUR_BOT_TOKEN}" }),
                    "/setWebhook?url=",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: form.webhookUrl || PLATFORM_WEBHOOK_URL })
                  ] }),
                  form.botToken && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `https://api.telegram.org/bot${form.botToken}/setWebhook?url=${encodeURIComponent(form.webhookUrl || PLATFORM_WEBHOOK_URL)}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium mt-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                        "Register webhook for your bot (opens in browser)"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tg-chat-id", children: "Alert Chat ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] text-muted-foreground",
                    children: "Optional — not needed for Test Connection"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "tg-chat-id",
                      value: form.alertChatId,
                      onChange: (e) => setForm((f) => ({ ...f, alertChatId: e.target.value })),
                      placeholder: "-1001234567890",
                      "data-ocid": "telegram_config.alert_chat_id_input",
                      className: "pr-9"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => copyToClipboard(form.alertChatId, "Alert Chat ID"),
                      className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Copy Alert Chat ID",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-blue-800", children: "How to get your Alert Chat ID:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-blue-700 flex gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 font-bold", children: "1." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Start a conversation with your bot on Telegram (search for it and send any message)." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-blue-700 flex gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 font-bold", children: "2." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "Open in browser:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "font-mono bg-blue-100 px-1 rounded break-all", children: [
                          "https://api.telegram.org/bot",
                          "{YOUR_BOT_TOKEN}",
                          "/getUpdates"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-blue-700 flex gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 font-bold", children: "3." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "Find",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "font-mono bg-blue-100 px-1 rounded", children: [
                          '"chat": ',
                          "{",
                          '"id": XXXXXX',
                          "}"
                        ] }),
                        " ",
                        "— that number is your Alert Chat ID. Copy and paste it above."
                      ] })
                    ] })
                  ] }),
                  form.botToken && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `https://api.telegram.org/bot${form.botToken}/getUpdates`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium mt-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                        "Open getUpdates for your bot"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tg-bot-username", children: "Bot Username (auto-populated on connect)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "@" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "tg-bot-username",
                      value: form.botUsername,
                      onChange: (e) => setForm((f) => ({ ...f, botUsername: e.target.value })),
                      placeholder: "localbazarkart_bot",
                      className: "pl-7",
                      "data-ocid": "telegram_config.bot_username_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Auto-populated when you click Test Connection" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Enable Telegram Bot" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "When disabled, incoming Telegram messages are ignored" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: form.isEnabled,
                    onCheckedChange: (v) => setForm((f) => ({ ...f, isEnabled: v })),
                    "data-ocid": "telegram_config.enabled_toggle"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    disabled: updateConfig.isPending,
                    "data-ocid": "telegram_config.save_button",
                    className: "flex-1 gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                      updateConfig.isPending ? "Saving…" : "Save Configuration"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: handleReset,
                    "data-ocid": "telegram_config.reset_button",
                    children: "Reset"
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Mirrored Flows" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "WhatsApp chatbot flows mirrored through the Telegram bot" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: ["Flow Name", "Status", "Last Triggered"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                    children: h
                  },
                  h
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MIRRORED_FLOWS.map((flow, idx) => {
                  const fs = flowStatuses[flow.key];
                  const isActive = (fs == null ? void 0 : fs.active) ?? form.isEnabled;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors",
                      "data-ocid": `telegram_config.flow.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-medium text-foreground", children: flow.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: `text-[10px] ${isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground"}`,
                            children: isActive ? "Active" : "Inactive"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground font-mono", children: (fs == null ? void 0 : fs.lastTriggered) ?? "—" })
                      ]
                    },
                    flow.key
                  );
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Recent Messages" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Last 10 Telegram messages processed by the bot" })
              ] }),
              recentMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center py-12 gap-2 text-center",
                  "data-ocid": "telegram_config.messages_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-10 h-10 text-muted-foreground/30" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No messages received yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Messages will appear here once users interact with your bot" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: ["Chat ID", "Message", "Timestamp", "Flow", "Status"].map(
                  (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                      children: h
                    },
                    h
                  )
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentMessages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors",
                    "data-ocid": `telegram_config.message.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs font-mono text-muted-foreground", children: msg.chatId }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "px-4 py-3 text-xs text-foreground max-w-[160px] truncate",
                          title: msg.text,
                          children: msg.text.length > 40 ? `${msg.text.slice(0, 40)}…` : msg.text
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: new Date(msg.timestamp).toLocaleString("en-IN") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: msg.flowTriggered || "—" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: `text-[10px] ${msg.status === "processed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`,
                          children: msg.status
                        }
                      ) })
                    ]
                  },
                  `msg-${msg.chatId}-${msg.timestamp}`
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: isConnected ? "Connected" : "Disconnected" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-xs", children: [
                {
                  label: "Bot username",
                  value: form.botUsername ? `@${form.botUsername}` : "—"
                },
                { label: "Alert Chat ID", value: form.alertChatId || "—" },
                { label: "Webhook", value: "Telegram Bot API" },
                {
                  label: "Flows mirrored",
                  value: `${MIRRORED_FLOWS.length}`
                },
                { label: "Status", value: statusLabel }
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: row.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-right truncate max-w-[120px]", children: row.value })
              ] }, row.label)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-sm text-foreground flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 text-primary" }),
                "Diagnostic Status"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-xs", children: [
                {
                  label: "Bot Token",
                  value: form.botToken ? "Configured ✓" : "Not configured",
                  ok: Boolean(form.botToken)
                },
                {
                  label: "Webhook URL",
                  value: form.webhookUrl ? form.webhookUrl.replace("https://", "").slice(0, 35) + (form.webhookUrl.length > 40 ? "…" : "") : "Not set",
                  ok: Boolean(form.webhookUrl)
                },
                {
                  label: "Last Webhook Error",
                  value: (diagnostics == null ? void 0 : diagnostics.lastErrorMessage) || (diagnostics ? "None ✓" : "Not checked"),
                  ok: !(diagnostics == null ? void 0 : diagnostics.lastErrorMessage)
                },
                {
                  label: "Polling Mode",
                  value: !form.webhookUrl ? "Active (no webhook set)" : "Inactive (webhook active)",
                  ok: Boolean(form.webhookUrl)
                }
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: row.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-medium text-right truncate max-w-[150px] ${row.ok ? "text-emerald-600" : "text-amber-600"}`,
                    children: row.value
                  }
                )
              ] }, row.label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: 'Run "Webhook Diagnostics" above to refresh last error status.' })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-2 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground mb-2", children: "Quick Links" }),
              [
                {
                  label: "Telegram BotFather",
                  url: "https://t.me/BotFather"
                },
                {
                  label: "Telegram Bot API Docs",
                  url: "https://core.telegram.org/bots/api"
                },
                {
                  label: "Get Updates (check Chat ID)",
                  url: `https://api.telegram.org/bot${form.botToken || "{TOKEN}"}/getUpdates`
                }
              ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: link.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "telegram_config.quick_link",
                  className: "flex items-center gap-2 text-xs text-primary hover:text-primary/80 hover:underline transition-colors py-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                    link.label
                  ]
                },
                link.url
              ))
            ] }),
            tableRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "Stored Configuration" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide text-[10px]", children: "Field" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide text-[10px]", children: "Value" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: tableRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border/50 last:border-0",
                    "data-ocid": "telegram_config.table_row",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium text-foreground", children: row.key }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 font-mono text-muted-foreground break-all", children: [
                        String(row.value ?? "—").slice(0, 30),
                        String(row.value ?? "").length > 30 ? "…" : ""
                      ] })
                    ]
                  },
                  row.key
                )) })
              ] })
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
                    "data-ocid": `telegram_config.setup_step.${item.step}`,
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
  TelegramConfigPage as default
};
