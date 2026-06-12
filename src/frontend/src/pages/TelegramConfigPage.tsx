import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Bot,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  HelpCircle,
  MessageSquare,
  Radio,
  RefreshCw,
  Send,
  Trash2,
  Wifi,
  WifiOff,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  type TelegramDebugInfo,
  type TelegramOutcallTestResult,
  type TelegramSendMessageTestResult,
  type WebhookDiagnostics,
  useClearWebhookAndPoll,
  useForceClearWebhookConfig,
  useGetTelegramDebugInfo,
  useGetWebhookDiagnostics,
  useTelegramConfig,
  useTelegramConfigTable,
  useTelegramDeliveryMode,
  useTestTelegramConnection,
  useTestTelegramOutcall,
  useTestTelegramSendMessage,
  useUpdateTelegramConfig,
} from "../hooks/useBackend";
import { getEnabledFlows, readModuleStatuses } from "../lib/flowRegistry";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TelegramConfigForm {
  botToken: string;
  webhookUrl: string;
  alertChatId: string;
  botUsername: string;
  isEnabled: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PLATFORM_WEBHOOK_URL = "https://bot.localbazar.shop/telegram/webhook";

// Derived from unified flow registry — only includes ENABLED flows
// Reads module statuses from backend so globally disabled modules are excluded
let MIRRORED_FLOWS: Array<{ name: string; key: string }> = [];
readModuleStatuses().then((statuses) => {
  MIRRORED_FLOWS = getEnabledFlows(statuses).map((f) => ({
    name: f.name,
    key: f.id,
  }));
});

const SETUP_STEPS = [
  {
    step: 1,
    title: "Create a Telegram Bot via @BotFather",
    detail:
      "Open Telegram, search for @BotFather and send /newbot. Follow the prompts to name your bot. Copy the token it gives you.",
  },
  {
    step: 2,
    title: "Paste the bot token above",
    detail:
      "Copy the token from BotFather (format: 123456:ABC-DEF...) and paste it into the Bot Token field on this page.",
  },
  {
    step: 3,
    title: "Register the webhook with Telegram",
    detail: `Call this URL in your browser:\nhttps://api.telegram.org/bot{TOKEN}/setWebhook?url=${PLATFORM_WEBHOOK_URL}`,
  },
  {
    step: 4,
    title: "Get your Alert Chat ID",
    detail:
      'Message your bot once, then call: https://api.telegram.org/bot{TOKEN}/getUpdates\nLook for "chat" in the JSON response — the "id" field is your Chat ID.',
  },
  {
    step: 5,
    title: "Test the connection",
    detail:
      "Click the Test Connection button above. A test message will be sent to your Alert Chat ID to confirm everything is working.",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TelegramConfigPage() {
  const queryClient = useQueryClient();
  const { data: config, isLoading } = useTelegramConfig();
  const { data: tableRows = [], refetch: refetchTable } =
    useTelegramConfigTable();
  const updateConfig = useUpdateTelegramConfig();
  const testConnection = useTestTelegramConnection();
  const clearWebhookAndPoll = useClearWebhookAndPoll();
  const getWebhookDiagnostics = useGetWebhookDiagnostics();
  const forceClearWebhook = useForceClearWebhookConfig();
  const testOutcall = useTestTelegramOutcall();
  const testSendMsg = useTestTelegramSendMessage();
  const { data: deliveryModeData, refetch: refetchDeliveryMode } =
    useTelegramDeliveryMode();
  const getDebugInfo = useGetTelegramDebugInfo();

  const [form, setForm] = useState<TelegramConfigForm>({
    botToken: "",
    webhookUrl: PLATFORM_WEBHOOK_URL,
    alertChatId: "",
    botUsername: "",
    isEnabled: false,
  });
  const [showToken, setShowToken] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [flowStatuses, setFlowStatuses] = useState<
    Record<string, { active: boolean; lastTriggered: string | null }>
  >({});
  const [pollResult, setPollResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [diagnostics, setDiagnostics] = useState<WebhookDiagnostics | null>(
    null,
  );
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [forceClearResult, setForceClearResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [outcallResult, setOutcallResult] =
    useState<TelegramOutcallTestResult | null>(null);
  const [showOutcallPanel, setShowOutcallPanel] = useState(false);
  const [sendMsgChatId, setSendMsgChatId] = useState("");
  const [sendMsgResult, setSendMsgResult] =
    useState<TelegramSendMessageTestResult | null>(null);
  const [debugInfo, setDebugInfo] = useState<TelegramDebugInfo | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [testConnectionResult, setTestConnectionResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Populate form from fetched config
  useEffect(() => {
    if (!config) return;
    const c = config as Record<string, unknown>;
    setForm({
      botToken: String(c.botToken ?? ""),
      webhookUrl: String(c.webhookUrl ?? PLATFORM_WEBHOOK_URL),
      alertChatId: String(c.alertChatId ?? ""),
      botUsername: String(c.botUsername ?? ""),
      isEnabled: Boolean(c.isEnabled ?? false),
    });
    // Hydrate flow statuses from config if present
    if (c.flowStatuses && typeof c.flowStatuses === "object") {
      setFlowStatuses(c.flowStatuses as typeof flowStatuses);
    }
  }, [config]);

  const isConnected = Boolean(
    (config as Record<string, unknown> | undefined)?.isConnected,
  );
  const isConfigured = Boolean(form.botToken);

  // Webhook status indicator logic
  const hasWebhookError = Boolean(diagnostics?.lastErrorMessage);
  const webhookStatusLabel =
    form.webhookUrl && form.isEnabled
      ? hasWebhookError
        ? "Webhook Error"
        : "Webhook Active"
      : "Not Configured";
  const webhookStatusColor =
    form.webhookUrl && form.isEnabled
      ? hasWebhookError
        ? "bg-amber-50 text-amber-700 border-amber-300"
        : "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-muted text-muted-foreground border-border";
  const webhookStatusDot =
    form.webhookUrl && form.isEnabled
      ? hasWebhookError
        ? "bg-amber-500"
        : "bg-emerald-500"
      : "bg-muted-foreground/40";

  const statusLabel = isConnected
    ? "Connected"
    : isConfigured
      ? "Configured — Not Connected"
      : "Not Configured";

  const statusColor = isConnected
    ? "bg-emerald-50 border-emerald-200"
    : isConfigured
      ? "bg-blue-50 border-blue-200"
      : "bg-amber-50 border-amber-200";

  const statusIconColor = isConnected
    ? "bg-emerald-100"
    : isConfigured
      ? "bg-blue-100"
      : "bg-amber-100";

  const statusTextColor = isConnected
    ? "text-emerald-800"
    : isConfigured
      ? "text-blue-800"
      : "text-amber-800";

  function copyToClipboard(text: string, label: string) {
    if (!text) {
      toast.error(`${label} is empty`);
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(`${label} copied!`));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Ensure webhookUrl is never empty — default to platform URL
      const payload: TelegramConfigForm = {
        ...form,
        webhookUrl: form.webhookUrl?.trim() || PLATFORM_WEBHOOK_URL,
      };
      await updateConfig.mutateAsync(payload);
      await queryClient.invalidateQueries({ queryKey: ["telegram-config"] });
      await queryClient.invalidateQueries({
        queryKey: ["telegram-config-table"],
      });
      toast.success("Telegram configuration saved successfully!");
    } catch (err) {
      toast.error(
        `Failed to save: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  function handleReset() {
    setForm({
      botToken: "",
      webhookUrl: PLATFORM_WEBHOOK_URL,
      alertChatId: "",
      botUsername: "",
      isEnabled: false,
    });
    toast.info("Form cleared");
  }

  async function handleTestConnection() {
    setTestConnectionResult(null);
    try {
      const result = await testConnection.mutateAsync(undefined);
      // Extract bot username if returned
      const username =
        (result as Record<string, unknown> | undefined)?.botUsername ||
        (result as Record<string, unknown> | undefined)?.username ||
        form.botUsername ||
        null;
      const msg = username
        ? `✓ Bot token is valid. Bot: @${username}`
        : "✓ Bot token is valid and connection succeeded.";
      setTestConnectionResult({ type: "success", message: msg });
      toast.success(msg);
      await queryClient.invalidateQueries({ queryKey: ["telegram-config"] });
    } catch (err) {
      const raw = err instanceof Error ? err.message : "Unknown error";
      // Provide context when Alert Chat ID is missing
      const hint = raw.toLowerCase().includes("chat")
        ? `${raw} — Note: this basic connection test only needs your bot token, not a Chat ID. Enter a Chat ID in the "Test Send Message" section below to test actual message delivery.`
        : raw;
      setTestConnectionResult({ type: "error", message: hint });
      toast.error(`Connection test failed — ${raw}`);
    }
  }

  async function handlePollNow() {
    setPollResult(null);
    try {
      const result = await clearWebhookAndPoll.mutateAsync();
      const count = result.messagesProcessed;
      const msg = `Drained ${count} message${count !== 1 ? "s" : ""} from Telegram queue. Check Bot Logs → Telegram tab to see them.`;
      setPollResult({ type: "success", message: msg });
      toast.success(msg);
      await queryClient.invalidateQueries({ queryKey: ["bot-logs-telegram"] });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Poll failed — unknown error";
      setPollResult({ type: "error", message: msg });
      toast.error(msg);
    }
  }

  async function handleGetDiagnostics() {
    try {
      const result = await getWebhookDiagnostics.mutateAsync();
      setDiagnostics(result);
      setShowDiagnostics(true);
    } catch (err) {
      toast.error(
        `Diagnostics failed — ${err instanceof Error ? err.message : "unknown error"}`,
      );
    }
  }

  async function handleForceClearWebhook() {
    setForceClearResult(null);
    try {
      const result = await forceClearWebhook.mutateAsync();
      setForceClearResult({
        type: result.cleared ? "success" : "error",
        message: result.message,
      });
      if (result.cleared) {
        toast.success(result.message);
        // Update form to show empty webhook URL
        setForm((f) => ({ ...f, webhookUrl: "" }));
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Force clear failed";
      setForceClearResult({ type: "error", message: msg });
      toast.error(msg);
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
        const botLabel = result.botUsername
          ? ` — Bot: @${result.botUsername}`
          : "";
        toast.success(
          `HTTP outcall succeeded (${result.httpStatus})${botLabel}`,
        );
      } else {
        toast.error(
          `HTTP outcall returned ${result.httpStatus} — ${result.errorMessage ?? "check bot token"}`,
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Test outcall failed";
      toast.error(msg);
    }
  }

  async function handleGetDebugInfo() {
    try {
      const result = await getDebugInfo.mutateAsync();
      setDebugInfo(result);
      setShowDebugPanel(true);
      void refetchDeliveryMode();
    } catch (err) {
      toast.error(
        `Debug info failed — ${
          err instanceof Error ? err.message : "unknown error"
        }`,
      );
    }
  }

  async function handleTestSendMessage() {
    if (!sendMsgChatId.trim()) {
      toast.error("Enter a Chat ID first");
      return;
    }
    setSendMsgResult(null);
    try {
      const result = await testSendMsg.mutateAsync(sendMsgChatId.trim());
      setSendMsgResult(result);
      if (result.success) {
        toast.success(`Test message delivered to ${sendMsgChatId}`);
      } else {
        toast.error(`Send failed: ${result.errorMessage ?? "unknown error"}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Send test failed";
      toast.error(msg);
      setSendMsgResult({
        success: false,
        chatId: sendMsgChatId,
        timestamp: new Date().toLocaleString("en-IN"),
        errorMessage: msg,
      });
    }
  }

  // ─── Recent messages (simulated from config data) ─────────────────────────
  const recentMessages =
    ((config as Record<string, unknown> | undefined)?.recentMessages as
      | Array<{
          chatId: string;
          text: string;
          timestamp: number;
          flowTriggered: string;
          status: string;
        }>
      | undefined) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-5xl">
        {["sk1", "sk2", "sk3"].map((id) => (
          <div key={id} className="h-24 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="space-y-6 animate-fade-in max-w-5xl overflow-x-hidden"
      data-ocid="telegram_config.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            Telegram Integration
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Mirror WhatsApp chatbot flows through Telegram Bot API
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`text-xs ${isConnected ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-muted"}`}
          >
            {statusLabel}
          </Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              void queryClient.invalidateQueries({
                queryKey: ["telegram-config"],
              });
              void refetchTable();
            }}
            data-ocid="telegram_config.refresh_button"
            className="gap-1.5 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Connection Status Banner */}
      <div
        className={`flex items-center gap-4 p-4 rounded-xl border ${statusColor}`}
        data-ocid="telegram_config.status_banner"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${statusIconColor}`}
        >
          {isConnected ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : isConfigured ? (
            <Zap className="w-5 h-5 text-blue-600" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${statusTextColor}`}>{statusLabel}</p>
          <p
            className={`text-sm ${isConnected ? "text-emerald-600" : isConfigured ? "text-blue-600" : "text-amber-600"}`}
          >
            {isConnected
              ? `Bot @${form.botUsername || "your-bot"} is active and receiving messages.`
              : isConfigured
                ? "Bot token saved — click Test Connection to verify."
                : "Enter your bot token below to get started."}
          </p>
          {form.botUsername && isConnected && (
            <p className="text-xs text-emerald-700 mt-0.5 font-mono">
              @{form.botUsername}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          {isConnected ? (
            <Wifi className="w-5 h-5 text-emerald-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-amber-400" />
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestConnection}
            disabled={testConnection.isPending || !isConfigured}
            data-ocid="telegram_config.test_connection_button"
            className="gap-1.5 text-xs border-border bg-white/80 hover:bg-white"
          >
            <Zap
              className={`w-3.5 h-3.5 ${testConnection.isPending ? "animate-pulse" : ""}`}
            />
            {testConnection.isPending ? "Testing…" : "Test Connection"}
          </Button>
        </div>
      </div>

      {/* Delivery Mode Indicator */}
      {deliveryModeData && (
        <div
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium ${
            deliveryModeData.deliveryMode === "Webhook"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : deliveryModeData.deliveryMode === "Polling"
                ? "bg-blue-50 border-blue-200 text-blue-800"
                : "bg-muted border-border text-muted-foreground"
          }`}
          data-ocid="telegram_config.delivery_mode"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
              deliveryModeData.deliveryMode === "Webhook"
                ? "bg-emerald-500"
                : deliveryModeData.deliveryMode === "Polling"
                  ? "bg-blue-500"
                  : "bg-muted-foreground/40"
            }`}
          />
          <span>
            <span className="font-semibold">Delivery Mode:</span>{" "}
            {deliveryModeData.deliveryMode}
          </span>
          {deliveryModeData.webhookUrl && (
            <span
              className="text-xs font-normal truncate max-w-[260px]"
              title={deliveryModeData.webhookUrl}
            >
              — {deliveryModeData.webhookUrl}
            </span>
          )}
          <button
            type="button"
            onClick={() => void refetchDeliveryMode()}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Refresh delivery mode"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Webhook Status + Diagnostic Actions */}
      <div className="flex flex-wrap gap-3 items-start">
        {/* Webhook status indicator */}
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${webhookStatusColor}`}
          data-ocid="telegram_config.webhook_status"
        >
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${webhookStatusDot}`}
          />
          {webhookStatusLabel}
          {hasWebhookError && diagnostics?.lastErrorMessage && (
            <span
              className="ml-1 text-amber-700 font-normal truncate max-w-[180px]"
              title={diagnostics.lastErrorMessage}
            >
              — {diagnostics.lastErrorMessage.slice(0, 60)}
              {diagnostics.lastErrorMessage.length > 60 ? "…" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Poll Now button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePollNow}
            disabled={clearWebhookAndPoll.isPending || !isConfigured}
            data-ocid="telegram_config.poll_now_button"
            className="gap-1.5 text-xs"
          >
            <Radio
              className={`w-3.5 h-3.5 ${clearWebhookAndPoll.isPending ? "animate-pulse" : ""}`}
            />
            {clearWebhookAndPoll.isPending
              ? "Polling Telegram…"
              : "Poll Now (Diagnostic)"}
          </Button>

          {/* Webhook Diagnostics button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGetDiagnostics}
            disabled={getWebhookDiagnostics.isPending || !isConfigured}
            data-ocid="telegram_config.diagnostics_button"
            className="gap-1.5 text-xs"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${getWebhookDiagnostics.isPending ? "animate-spin" : ""}`}
            />
            {getWebhookDiagnostics.isPending
              ? "Fetching…"
              : "Webhook Diagnostics"}
          </Button>

          {/* Force Clear Webhook button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleForceClearWebhook}
            disabled={forceClearWebhook.isPending || !isConfigured}
            data-ocid="telegram_config.force_clear_webhook_button"
            className="gap-1.5 text-xs text-amber-700 border-amber-300 hover:bg-amber-50"
          >
            <Trash2
              className={`w-3.5 h-3.5 ${forceClearWebhook.isPending ? "animate-pulse" : ""}`}
            />
            {forceClearWebhook.isPending ? "Clearing…" : "Force Clear Webhook"}
          </Button>

          {/* Live Webhook Status button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void handleGetDebugInfo()}
            disabled={getDebugInfo.isPending || !isConfigured}
            data-ocid="telegram_config.debug_info_button"
            className="gap-1.5 text-xs"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${getDebugInfo.isPending ? "animate-spin" : ""}`}
            />
            {getDebugInfo.isPending ? "Checking…" : "Live Webhook Status"}
          </Button>

          {/* Test HTTP Outcall button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestOutcall}
            disabled={testOutcall.isPending || !isConfigured}
            data-ocid="telegram_config.test_outcall_button"
            className="gap-1.5 text-xs"
          >
            <Zap
              className={`w-3.5 h-3.5 ${testOutcall.isPending ? "animate-pulse" : ""}`}
            />
            {testOutcall.isPending ? "Testing Outcall…" : "Test HTTP Outcall"}
          </Button>
        </div>
      </div>

      {/* Test Connection result feedback */}
      {testConnectionResult && (
        <div
          className={`flex items-start gap-3 p-3 rounded-lg border ${
            testConnectionResult.type === "success"
              ? "bg-emerald-50 border-emerald-200"
              : "bg-amber-50 border-amber-200"
          }`}
          data-ocid="telegram_config.test_connection_result"
        >
          {testConnectionResult.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <p
            className={`text-xs flex-1 ${
              testConnectionResult.type === "success"
                ? "text-emerald-800"
                : "text-amber-800"
            }`}
          >
            {testConnectionResult.message}
          </p>
          <button
            type="button"
            onClick={() => setTestConnectionResult(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Poll Now warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800">
          <strong>⚠ Poll Now</strong> temporarily removes the webhook to drain
          queued messages, then restores it. Use only for diagnostics.{" "}
          <strong>If your webhook is active</strong>, getUpdates will return
          empty — that is expected. Telegram sends all messages to the webhook
          instead of queuing them for polling.
        </p>
      </div>

      {/* Poll result feedback */}
      {pollResult && (
        <div
          className={`flex items-start gap-3 p-3 rounded-lg border ${pollResult.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
          data-ocid="telegram_config.poll_result"
        >
          {pollResult.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <p
            className={`text-xs flex-1 ${pollResult.type === "success" ? "text-emerald-800" : "text-red-800"}`}
          >
            {pollResult.message}
          </p>
          <button
            type="button"
            onClick={() => setPollResult(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Force Clear Webhook result */}
      {forceClearResult && (
        <div
          className={`flex items-start gap-3 p-3 rounded-lg border ${forceClearResult.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
          data-ocid="telegram_config.force_clear_result"
        >
          {forceClearResult.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <p
            className={`text-xs flex-1 ${forceClearResult.type === "success" ? "text-emerald-800" : "text-red-800"}`}
          >
            <strong>Force Clear Webhook:</strong> {forceClearResult.message}
          </p>
          <button
            type="button"
            onClick={() => setForceClearResult(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* HTTP Outcall test result panel */}
      {showOutcallPanel && outcallResult && (
        <div
          className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card"
          data-ocid="telegram_config.outcall_result_panel"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              HTTP Outcall Test Result
            </h3>
            <button
              type="button"
              onClick={() => setShowOutcallPanel(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close outcall result"
              data-ocid="telegram_config.close_outcall_button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bot name — prominent display */}
          {outcallResult.botUsername && (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">
                  Bot Connected
                </p>
                <p className="text-lg font-bold text-emerald-800 font-mono">
                  @{outcallResult.botUsername}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-muted/30 rounded-lg px-3 py-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                HTTP Status
              </p>
              <p
                className={`text-sm font-bold font-mono mt-0.5 ${outcallResult.httpStatus >= 200 && outcallResult.httpStatus < 300 ? "text-emerald-600" : "text-red-600"}`}
              >
                {outcallResult.httpStatus || "—"}
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg px-3 py-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                Token Valid
              </p>
              <p
                className={`text-sm font-bold mt-0.5 ${outcallResult.botTokenValid ? "text-emerald-600" : "text-red-600"}`}
              >
                {outcallResult.botTokenValid ? "✓ Yes" : "✗ No"}
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg px-3 py-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                /getMe
              </p>
              <p className="text-sm font-mono mt-0.5 text-foreground">
                {outcallResult.getMeStatus ??
                  (outcallResult.botTokenValid ? "✓ ok" : "✗ failed")}
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg px-3 py-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                /sendMessage
              </p>
              <p className="text-sm font-mono mt-0.5 text-foreground">
                {outcallResult.sendMessageStatus ?? "—"}
              </p>
            </div>
          </div>
          {outcallResult.errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-[10px] text-red-700 uppercase tracking-wide font-semibold mb-1">
                Error Detail
              </p>
              <p className="text-xs font-mono text-red-800 break-words">
                {outcallResult.errorMessage}
              </p>
            </div>
          )}
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Response Body
            </p>
            <pre className="text-[11px] font-mono text-foreground bg-muted/40 border border-border rounded-lg p-3 overflow-x-auto max-h-36 whitespace-pre-wrap break-words">
              {outcallResult.responseBody || "— no response —"}
            </pre>
          </div>
          {!outcallResult.botTokenValid && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                HTTP outcall to Telegram API failed. The ICP canister cannot
                reach Telegram's servers. Check that HTTP outcalls are enabled
                for this canister.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Test Send Message panel */}
      <div
        className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card"
        data-ocid="telegram_config.send_test_panel"
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-sm text-foreground">
            Test Send Message
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] ml-1 bg-blue-50 text-blue-700 border-blue-200"
          >
            Diagnostic
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Sends a test message using the exact same code path as the real
          webhook handler. If this succeeds, the bot can send messages and real
          flows will work.
        </p>
        <div className="flex items-center gap-2">
          <Input
            value={sendMsgChatId}
            onChange={(e) => setSendMsgChatId(e.target.value)}
            placeholder={form.alertChatId || "-1001234567890"}
            className="flex-1 font-mono text-xs"
            data-ocid="telegram_config.send_test_chat_id_input"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (form.alertChatId && !sendMsgChatId) {
                setSendMsgChatId(form.alertChatId);
              }
            }}
            className="text-xs gap-1 shrink-0"
            data-ocid="telegram_config.use_alert_chat_id_button"
          >
            Use Alert ID
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleTestSendMessage}
            disabled={testSendMsg.isPending || !isConfigured}
            data-ocid="telegram_config.send_test_message_button"
            className="gap-1.5 text-xs shrink-0"
          >
            <Send
              className={`w-3.5 h-3.5 ${testSendMsg.isPending ? "animate-pulse" : ""}`}
            />
            {testSendMsg.isPending ? "Sending…" : "Send Test Message"}
          </Button>
        </div>
        {sendMsgResult && (
          <div
            className={`flex items-start gap-3 p-3 rounded-lg border ${sendMsgResult.success ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
            data-ocid="telegram_config.send_test_result"
          >
            {sendMsgResult.success ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs font-semibold ${sendMsgResult.success ? "text-emerald-800" : "text-red-800"}`}
              >
                {sendMsgResult.success
                  ? `✓ Test message sent to ${sendMsgResult.chatId}`
                  : `✗ Failed to send to ${sendMsgResult.chatId}`}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {sendMsgResult.timestamp}
              </p>
              {sendMsgResult.errorMessage && (
                <p className="text-xs font-mono text-red-700 mt-1 break-words">
                  {sendMsgResult.errorMessage}
                </p>
              )}
              {sendMsgResult.rawResponse && (
                <pre className="text-[10px] font-mono bg-muted/40 rounded p-2 mt-1.5 overflow-x-auto max-h-24 break-words whitespace-pre-wrap">
                  {sendMsgResult.rawResponse}
                </pre>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSendMsgResult(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Live Webhook Status (from getTelegramDebugInfo) */}
      {showDebugPanel && debugInfo && (
        <div
          className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card"
          data-ocid="telegram_config.live_debug_panel"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
              <Radio className="w-4 h-4 text-primary" />
              Live Webhook Status
            </h3>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => void handleGetDebugInfo()}
                disabled={getDebugInfo.isPending}
                data-ocid="telegram_config.refresh_debug_button"
              >
                <RefreshCw
                  className={`w-3 h-3 ${getDebugInfo.isPending ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <button
                type="button"
                onClick={() => setShowDebugPanel(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close live status"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delivery mode badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              debugInfo.deliveryMode === "Webhook"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : debugInfo.deliveryMode === "Polling"
                  ? "bg-blue-50 border-blue-200 text-blue-800"
                  : "bg-muted border-border text-muted-foreground"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                debugInfo.deliveryMode === "Webhook"
                  ? "bg-emerald-500"
                  : debugInfo.deliveryMode === "Polling"
                    ? "bg-blue-500"
                    : "bg-muted-foreground/40"
              }`}
            />
            {debugInfo.deliveryMode} Mode
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "Webhook URL (Telegram)",
                value: debugInfo.webhookUrl || "— not registered —",
                mono: true,
                color: debugInfo.webhookConfigured
                  ? "text-emerald-700"
                  : "text-muted-foreground",
              },
              {
                label: "Pending Updates",
                value: String(debugInfo.pendingUpdateCount),
                mono: true,
                color:
                  debugInfo.pendingUpdateCount > 0
                    ? "text-amber-700"
                    : "text-foreground",
              },
              {
                label: "Last Error",
                value: debugInfo.lastErrorMessage || "— none —",
                mono: false,
                color: debugInfo.lastErrorMessage
                  ? "text-red-700"
                  : "text-foreground",
              },
              {
                label: "Last Error Date",
                value: debugInfo.lastErrorDate
                  ? new Date(debugInfo.lastErrorDate * 1000).toLocaleString(
                      "en-IN",
                    )
                  : "—",
                mono: false,
                color: "text-foreground",
              },
              {
                label: "Bot Token Set",
                value: debugInfo.botTokenSet ? "✓ Yes" : "✗ No",
                mono: false,
                color: debugInfo.botTokenSet
                  ? "text-emerald-700"
                  : "text-red-700",
              },
              {
                label: "Polling Active",
                value: debugInfo.pollingActive ? "Yes" : "No",
                mono: false,
                color: debugInfo.pollingActive
                  ? "text-blue-700"
                  : "text-muted-foreground",
              },
            ].map((row) => (
              <div key={row.label} className="bg-muted/30 rounded-lg px-3 py-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                  {row.label}
                </p>
                <p
                  className={`text-xs mt-0.5 break-all ${
                    row.mono ? "font-mono" : ""
                  } ${row.color}`}
                >
                  {row.value}
                </p>
              </div>
            ))}
          </div>

          {/* Pending update warning */}
          {debugInfo.pendingUpdateCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                Telegram has <strong>{debugInfo.pendingUpdateCount}</strong>{" "}
                messages queued. If you have a webhook registered, Telegram is
                failing to deliver them. Check the Last Error field above and
                click <strong>Poll Now</strong> to drain the queue.
              </p>
            </div>
          )}

          {/* Conflict warning: both webhook and polling */}
          {debugInfo.webhookConfigured && debugInfo.pollingActive && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-800">
                <strong>⚠ Conflict detected:</strong> Both webhook and polling
                appear active simultaneously. Telegram will return 409 Conflict
                on getUpdates calls and messages will be silently dropped. Click{" "}
                <strong>Force Clear Webhook</strong> to resolve.
              </p>
            </div>
          )}

          {debugInfo.rawResponse && (
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                Raw Telegram getWebhookInfo Response
              </p>
              <pre className="text-[11px] font-mono text-foreground bg-muted/40 border border-border rounded-lg p-3 overflow-x-auto max-h-36 whitespace-pre-wrap break-words">
                {debugInfo.rawResponse}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Diagnostics panel */}
      {showDiagnostics && diagnostics && (
        <div
          className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card"
          data-ocid="telegram_config.diagnostics_panel"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-primary" />
              Webhook Diagnostics
            </h3>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => {
                  navigator.clipboard
                    .writeText(diagnostics.rawJson)
                    .then(() => toast.success("Raw JSON copied!"));
                }}
                data-ocid="telegram_config.copy_diagnostics_button"
              >
                <Copy className="w-3 h-3" />
                Copy Raw JSON
              </Button>
              <button
                type="button"
                onClick={() => setShowDiagnostics(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close diagnostics"
                data-ocid="telegram_config.close_diagnostics_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                label: "Registered Webhook URL",
                value: diagnostics.webhookUrl || "— not set —",
              },
              {
                label: "Pending Update Count",
                value: String(diagnostics.pendingUpdateCount),
              },
              {
                label: "Last Error",
                value: diagnostics.lastErrorMessage || "— none —",
              },
              {
                label: "Last Error Date",
                value: diagnostics.lastErrorDate
                  ? new Date(diagnostics.lastErrorDate * 1000).toLocaleString(
                      "en-IN",
                    )
                  : "—",
              },
              {
                label: "Polling Active",
                value: diagnostics.isPollingActive ? "Yes" : "No",
              },
            ].map((row) => (
              <div key={row.label} className="bg-muted/30 rounded-lg px-3 py-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                  {row.label}
                </p>
                <p
                  className={`text-xs font-mono mt-0.5 break-all ${row.label === "Last Error" && diagnostics.lastErrorMessage ? "text-red-600" : "text-foreground"}`}
                >
                  {row.value}
                </p>
              </div>
            ))}
          </div>
          {diagnostics.pendingUpdateCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                There are <strong>{diagnostics.pendingUpdateCount}</strong>{" "}
                messages queued with Telegram. Click <strong>Poll Now</strong>{" "}
                to drain them.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Config Form */}
        <div className="lg:col-span-2 space-y-5">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  Bot Configuration
                </h3>
              </div>

              {/* Bot Token */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="tg-bot-token">Bot Token</Label>
                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    id="tg-bot-token"
                    type={showToken ? "text" : "password"}
                    value={form.botToken}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, botToken: e.target.value }))
                    }
                    placeholder="123456789:ABCDefGhIJklmnoPQRstuvwXYZ"
                    className="pr-16"
                    data-ocid="telegram_config.bot_token_input"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowToken((v) => !v)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showToken ? "Hide token" : "Show token"}
                    >
                      {showToken ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(form.botToken, "Bot Token")
                      }
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Copy bot token"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get this from @BotFather on Telegram using the /newbot command
                </p>
              </div>

              {/* Webhook URL */}
              <div className="space-y-1.5">
                <Label htmlFor="tg-webhook-url">Webhook URL</Label>
                <div className="relative">
                  <Input
                    id="tg-webhook-url"
                    value={form.webhookUrl}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, webhookUrl: e.target.value }))
                    }
                    placeholder={PLATFORM_WEBHOOK_URL}
                    className="pr-9 font-mono text-xs"
                    data-ocid="telegram_config.webhook_url_input"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        form.webhookUrl || PLATFORM_WEBHOOK_URL,
                        "Webhook URL",
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy webhook URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Edit this URL if needed, then save. After saving, register it
                  with Telegram by opening this URL in your browser:
                </p>
                <div className="bg-muted/50 border border-border rounded-lg p-2.5">
                  <code className="text-[11px] font-mono text-foreground break-all select-all">
                    https://api.telegram.org/bot
                    <span className="text-primary font-bold">
                      {"{YOUR_BOT_TOKEN}"}
                    </span>
                    /setWebhook?url=
                    <span className="text-primary">
                      {form.webhookUrl || PLATFORM_WEBHOOK_URL}
                    </span>
                  </code>
                  {form.botToken && (
                    <a
                      href={`https://api.telegram.org/bot${form.botToken}/setWebhook?url=${encodeURIComponent(form.webhookUrl || PLATFORM_WEBHOOK_URL)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium mt-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Register webhook for your bot (opens in browser)
                    </a>
                  )}
                </div>
              </div>

              {/* Alert Chat ID */}
              <div className="space-y-1.5">
                <Label htmlFor="tg-chat-id">Alert Chat ID</Label>
                <Badge
                  variant="outline"
                  className="text-[10px] text-muted-foreground"
                >
                  Optional — not needed for Test Connection
                </Badge>
                <div className="relative">
                  <Input
                    id="tg-chat-id"
                    value={form.alertChatId}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, alertChatId: e.target.value }))
                    }
                    placeholder="-1001234567890"
                    data-ocid="telegram_config.alert_chat_id_input"
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(form.alertChatId, "Alert Chat ID")
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy Alert Chat ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-blue-800">
                    How to get your Alert Chat ID:
                  </p>
                  <ol className="space-y-1">
                    <li className="text-xs text-blue-700 flex gap-1.5">
                      <span className="flex-shrink-0 font-bold">1.</span>
                      <span>
                        Start a conversation with your bot on Telegram (search
                        for it and send any message).
                      </span>
                    </li>
                    <li className="text-xs text-blue-700 flex gap-1.5">
                      <span className="flex-shrink-0 font-bold">2.</span>
                      <span>
                        Open in browser:{" "}
                        <code className="font-mono bg-blue-100 px-1 rounded break-all">
                          https://api.telegram.org/bot{"{YOUR_BOT_TOKEN}"}
                          /getUpdates
                        </code>
                      </span>
                    </li>
                    <li className="text-xs text-blue-700 flex gap-1.5">
                      <span className="flex-shrink-0 font-bold">3.</span>
                      <span>
                        Find{" "}
                        <code className="font-mono bg-blue-100 px-1 rounded">
                          "chat": {"{"}
                          "id": XXXXXX{"}"}
                        </code>{" "}
                        — that number is your Alert Chat ID. Copy and paste it
                        above.
                      </span>
                    </li>
                  </ol>
                  {form.botToken && (
                    <a
                      href={`https://api.telegram.org/bot${form.botToken}/getUpdates`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium mt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open getUpdates for your bot
                    </a>
                  )}
                </div>
              </div>

              {/* Bot Username */}
              <div className="space-y-1.5">
                <Label htmlFor="tg-bot-username">
                  Bot Username (auto-populated on connect)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    @
                  </span>
                  <Input
                    id="tg-bot-username"
                    value={form.botUsername}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, botUsername: e.target.value }))
                    }
                    placeholder="localbazarkart_bot"
                    className="pl-7"
                    data-ocid="telegram_config.bot_username_input"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Auto-populated when you click Test Connection
                </p>
              </div>

              {/* Enable toggle */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Enable Telegram Bot
                  </p>
                  <p className="text-xs text-muted-foreground">
                    When disabled, incoming Telegram messages are ignored
                  </p>
                </div>
                <Switch
                  checked={form.isEnabled}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isEnabled: v }))
                  }
                  data-ocid="telegram_config.enabled_toggle"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button
                  type="submit"
                  disabled={updateConfig.isPending}
                  data-ocid="telegram_config.save_button"
                  className="flex-1 gap-2"
                >
                  <Send className="w-4 h-4" />
                  {updateConfig.isPending ? "Saving…" : "Save Configuration"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  data-ocid="telegram_config.reset_button"
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>

          {/* Active Flows */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
            <div className="px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  Mirrored Flows
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                WhatsApp chatbot flows mirrored through the Telegram bot
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {["Flow Name", "Status", "Last Triggered"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MIRRORED_FLOWS.map((flow, idx) => {
                  const fs = flowStatuses[flow.key];
                  const isActive = fs?.active ?? form.isEnabled;
                  return (
                    <tr
                      key={flow.key}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors"
                      data-ocid={`telegram_config.flow.${idx + 1}`}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {flow.name}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground"}`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                        {fs?.lastTriggered ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Recent Messages */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
            <div className="px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  Recent Messages
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Last 10 Telegram messages processed by the bot
              </p>
            </div>
            {recentMessages.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-12 gap-2 text-center"
                data-ocid="telegram_config.messages_empty_state"
              >
                <MessageSquare className="w-10 h-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  No messages received yet
                </p>
                <p className="text-xs text-muted-foreground">
                  Messages will appear here once users interact with your bot
                </p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    {["Chat ID", "Message", "Timestamp", "Flow", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {recentMessages.map((msg, idx) => (
                    <tr
                      key={`msg-${msg.chatId}-${msg.timestamp}`}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors"
                      data-ocid={`telegram_config.message.${idx + 1}`}
                    >
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                        {msg.chatId}
                      </td>
                      <td
                        className="px-4 py-3 text-xs text-foreground max-w-[160px] truncate"
                        title={msg.text}
                      >
                        {msg.text.length > 40
                          ? `${msg.text.slice(0, 40)}…`
                          : msg.text}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(msg.timestamp).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {msg.flowTriggered || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            msg.status === "processed"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {msg.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Config summary card */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-card">
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-emerald-500" : "bg-amber-400"}`}
              />
              <h4 className="font-semibold text-sm text-foreground">
                {isConnected ? "Connected" : "Disconnected"}
              </h4>
            </div>
            <div className="space-y-2 text-xs">
              {[
                {
                  label: "Bot username",
                  value: form.botUsername ? `@${form.botUsername}` : "—",
                },
                { label: "Alert Chat ID", value: form.alertChatId || "—" },
                { label: "Webhook", value: "Telegram Bot API" },
                {
                  label: "Flows mirrored",
                  value: `${MIRRORED_FLOWS.length}`,
                },
                { label: "Status", value: statusLabel },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-foreground text-right truncate max-w-[120px]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Status Card */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-card">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-primary" />
              Diagnostic Status
            </h4>
            <div className="space-y-2 text-xs">
              {[
                {
                  label: "Bot Token",
                  value: form.botToken ? "Configured ✓" : "Not configured",
                  ok: Boolean(form.botToken),
                },
                {
                  label: "Webhook URL",
                  value: form.webhookUrl
                    ? form.webhookUrl.replace("https://", "").slice(0, 35) +
                      (form.webhookUrl.length > 40 ? "…" : "")
                    : "Not set",
                  ok: Boolean(form.webhookUrl),
                },
                {
                  label: "Last Webhook Error",
                  value:
                    diagnostics?.lastErrorMessage ||
                    (diagnostics ? "None ✓" : "Not checked"),
                  ok: !diagnostics?.lastErrorMessage,
                },
                {
                  label: "Polling Mode",
                  value: !form.webhookUrl
                    ? "Active (no webhook set)"
                    : "Inactive (webhook active)",
                  ok: Boolean(form.webhookUrl),
                },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span
                    className={`font-medium text-right truncate max-w-[150px] ${
                      row.ok ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">
              Run "Webhook Diagnostics" above to refresh last error status.
            </p>
          </div>

          {/* Quick links */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-2 shadow-card">
            <h4 className="font-semibold text-sm text-foreground mb-2">
              Quick Links
            </h4>
            {[
              {
                label: "Telegram BotFather",
                url: "https://t.me/BotFather",
              },
              {
                label: "Telegram Bot API Docs",
                url: "https://core.telegram.org/bots/api",
              },
              {
                label: "Get Updates (check Chat ID)",
                url: `https://api.telegram.org/bot${form.botToken || "{TOKEN}"}/getUpdates`,
              },
            ].map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="telegram_config.quick_link"
                className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 hover:underline transition-colors py-1"
              >
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                {link.label}
              </a>
            ))}
          </div>

          {/* Config table */}
          {tableRows.length > 0 && (
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
              <div className="px-4 py-3 border-b border-border">
                <h4 className="font-semibold text-sm text-foreground">
                  Stored Configuration
                </h4>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide text-[10px]">
                      Field
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide text-[10px]">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr
                      key={row.key}
                      className="border-b border-border/50 last:border-0"
                      data-ocid="telegram_config.table_row"
                    >
                      <td className="px-3 py-2 font-medium text-foreground">
                        {row.key}
                      </td>
                      <td className="px-3 py-2 font-mono text-muted-foreground break-all">
                        {String(row.value ?? "—").slice(0, 30)}
                        {String(row.value ?? "").length > 30 ? "…" : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-muted/30 border border-border rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Setup Guide
          </h3>
        </div>
        <div className="space-y-2">
          {SETUP_STEPS.map((item) => (
            <Collapsible
              key={item.step}
              open={openStep === item.step}
              onOpenChange={(open) => setOpenStep(open ? item.step : null)}
            >
              <CollapsibleTrigger
                className="flex w-full items-center justify-between px-4 py-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                data-ocid={`telegram_config.setup_step.${item.step}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-sm font-medium text-foreground text-left">
                    {item.title}
                  </span>
                </div>
                {openStep === item.step ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 px-4 py-3 bg-card/50 rounded-lg border border-border/50">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap break-words font-sans">
                    {item.detail}
                  </pre>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
