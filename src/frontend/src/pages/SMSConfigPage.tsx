import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  HelpCircle,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useBackendActor } from "../hooks/useBackend";

// ─── Types ────────────────────────────────────────────────────────────────────

type SMSProvider = "twilio" | "msg91" | "fast2sms" | "custom";

interface SMSConfigForm {
  provider: SMSProvider;
  apiKey: string;
  authToken: string;
  fromNumber: string;
  webhookUrl: string;
  providerBaseUrl: string;
  isEnabled: boolean;
}

interface SavedConfigRow {
  field: string;
  value: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PLATFORM_WEBHOOK_URL = "https://bot.localbazar.shop/sms/webhook";

const SMS_PROVIDERS: { value: SMSProvider; label: string }[] = [
  { value: "twilio", label: "Twilio" },
  { value: "msg91", label: "MSG91" },
  { value: "fast2sms", label: "Fast2SMS" },
  { value: "custom", label: "Custom HTTP API" },
];

const SETUP_STEPS: { step: number; title: string; detail: string }[] = [
  {
    step: 1,
    title: "Sign up for your SMS provider",
    detail:
      "Twilio: https://www.twilio.com/try-twilio\nMSG91: https://msg91.com/signup\nFast2SMS: https://www.fast2sms.com/register\n\nAfter signup you will receive credentials (Account SID / Auth Token / API Key).",
  },
  {
    step: 2,
    title: "Get your credentials",
    detail:
      "Twilio → Console Dashboard → Account SID + Auth Token.\nMSG91 → API → Authkey.\nFast2SMS → Dev API → API key.\nCustom → refer to your provider docs for API key and base URL.",
  },
  {
    step: 3,
    title: "Get a sender phone number or Sender ID",
    detail:
      "Twilio → Buy a phone number in the Console.\nMSG91 → Register a Sender ID (e.g. LBKART).\nFast2SMS → Default Sender ID is available. Custom sender IDs require DLT registration in India.\nPaste the number or Sender ID into the Sender ID / From Number field.",
  },
  {
    step: 4,
    title: "Enter credentials and save",
    detail:
      "Enter your API credentials in the form on this page. For Twilio, Account SID goes in API Key and Auth Token goes in Auth Token. Then click Save Configuration.",
  },
  {
    step: 5,
    title: "Configure the webhook URL in your provider",
    detail: `Copy the webhook URL below and paste it into your provider console:\n\n${PLATFORM_WEBHOOK_URL}\n\nTwilio: Phone Numbers → Manage → Active Numbers → click number → Messaging → Webhook URL.\nMSG91: Settings → SMS Webhook.\nFast2SMS: Reseller → Webhook URL.`,
  },
  {
    step: 6,
    title: "Enable SMS and send a test",
    detail:
      "Toggle Enable SMS to ON, save again, then click Send Test SMS below to verify the integration end-to-end. The test message will be sent to your From Number.",
  },
];

// ─── Provider-specific field labels ───────────────────────────────────────────

function getFieldLabels(provider: SMSProvider): {
  apiKeyLabel: string;
  authTokenLabel: string;
  apiKeyPlaceholder: string;
  authTokenPlaceholder: string;
  showAuthToken: boolean;
  showBaseUrl: boolean;
} {
  switch (provider) {
    case "twilio":
      return {
        apiKeyLabel: "Account SID",
        authTokenLabel: "Auth Token",
        apiKeyPlaceholder: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        authTokenPlaceholder: "Your Twilio Auth Token",
        showAuthToken: true,
        showBaseUrl: false,
      };
    case "msg91":
      return {
        apiKeyLabel: "Auth Key",
        authTokenLabel: "Sender ID",
        apiKeyPlaceholder: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
        authTokenPlaceholder: "LBKART",
        showAuthToken: true,
        showBaseUrl: false,
      };
    case "fast2sms":
      return {
        apiKeyLabel: "API Key",
        authTokenLabel: "Route (dlt / trans / p2p)",
        apiKeyPlaceholder: "Your Fast2SMS API key",
        authTokenPlaceholder: "dlt",
        showAuthToken: true,
        showBaseUrl: false,
      };
    case "custom":
      return {
        apiKeyLabel: "API Key",
        authTokenLabel: "Auth Token (optional)",
        apiKeyPlaceholder: "Your API key",
        authTokenPlaceholder: "Optional auth token",
        showAuthToken: true,
        showBaseUrl: true,
      };
  }
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SMSConfigPage() {
  const queryClient = useQueryClient();
  const { actor } = useBackendActor();

  const [form, setForm] = useState<SMSConfigForm>({
    provider: "twilio",
    apiKey: "",
    authToken: "",
    fromNumber: "",
    webhookUrl: PLATFORM_WEBHOOK_URL,
    providerBaseUrl: "",
    isEnabled: false,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAuthToken, setShowAuthToken] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedRows, setSavedRows] = useState<SavedConfigRow[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Load config on mount
  useEffect(() => {
    if (!actor) return;
    void (async () => {
      setLoading(true);
      try {
        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >;
        const raw = await actorAny.getSMSConfig();
        if (raw && typeof raw === "object") {
          const c = raw as Record<string, unknown>;
          setForm({
            provider: (c.provider as SMSProvider) || "twilio",
            apiKey: String(c.apiKey ?? ""),
            authToken: String(c.authToken ?? ""),
            fromNumber: String(c.fromNumber ?? ""),
            webhookUrl: String(c.webhookUrl ?? PLATFORM_WEBHOOK_URL),
            providerBaseUrl: String(c.providerBaseUrl ?? ""),
            isEnabled: Boolean(c.isEnabled ?? false),
          });
          setIsConnected(Boolean(c.isConnected ?? false));

          // Build table rows from saved config
          const rows: SavedConfigRow[] = [
            { field: "Provider", value: String(c.provider ?? "—") },
            {
              field: "API Key",
              value: c.apiKey
                ? `${"*".repeat(8)}${String(c.apiKey).slice(-4)}`
                : "—",
            },
            {
              field: "Sender ID / From Number",
              value: String(c.fromNumber ?? "—"),
            },
            { field: "Webhook URL", value: String(c.webhookUrl ?? "—") },
            { field: "Status", value: c.isEnabled ? "Enabled" : "Disabled" },
          ];
          setSavedRows(rows);
        }
      } catch {
        // Config not set yet — keep defaults
      } finally {
        setLoading(false);
      }
    })();
  }, [actor]);

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
    if (!actor) return;
    if (!form.apiKey.trim()) {
      toast.error("API Key is required");
      return;
    }
    if (!form.fromNumber.trim()) {
      toast.error("Sender ID / From Number is required");
      return;
    }
    setSaving(true);
    try {
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      await actorAny.updateSMSConfig(form);
      await queryClient.invalidateQueries({ queryKey: ["sms-config"] });
      // Rebuild saved rows
      setSavedRows([
        { field: "Provider", value: form.provider },
        {
          field: "API Key",
          value: form.apiKey ? `${"*".repeat(8)}${form.apiKey.slice(-4)}` : "—",
        },
        { field: "Sender ID / From Number", value: form.fromNumber || "—" },
        {
          field: "Webhook URL",
          value: form.webhookUrl || PLATFORM_WEBHOOK_URL,
        },
        { field: "Status", value: form.isEnabled ? "Enabled" : "Disabled" },
      ]);
      toast.success("SMS configuration saved successfully!");
    } catch (err) {
      toast.error(
        `Failed to save: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleTestSMS() {
    if (!actor) return;
    if (!form.apiKey) {
      toast.error("Save your configuration first before testing");
      return;
    }
    setTesting(true);
    try {
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      await actorAny.testSMSConnection();
      toast.success("SMS test sent successfully! Check your phone.");
      setIsConnected(true);
    } catch (err) {
      toast.error(
        `Test failed: ${err instanceof Error ? err.message : "Check your API credentials"}`,
      );
    } finally {
      setTesting(false);
    }
  }

  const fieldLabels = getFieldLabels(form.provider);
  const isConfigured = Boolean(form.apiKey);

  const statusLabel = isConnected
    ? "Connected"
    : isConfigured
      ? "Configured — Not Tested"
      : "Not Configured";

  if (loading) {
    return (
      <div className="space-y-4 max-w-5xl">
        {["s1", "s2", "s3"].map((id) => (
          <div key={id} className="h-24 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="space-y-6 animate-fade-in max-w-5xl overflow-x-hidden"
      data-ocid="sms_config.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            SMS Integration
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Two-way SMS chatbot flows — users text to interact with all major
            flows
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
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["sms-config"] })
            }
            className="gap-1.5 text-xs"
            data-ocid="sms_config.refresh_button"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      <div
        className={`flex items-center gap-4 p-4 rounded-xl border ${
          isConnected
            ? "bg-emerald-50 border-emerald-200"
            : isConfigured
              ? "bg-blue-50 border-blue-200"
              : "bg-amber-50 border-amber-200"
        }`}
        data-ocid="sms_config.status_banner"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isConnected
              ? "bg-emerald-100"
              : isConfigured
                ? "bg-blue-100"
                : "bg-amber-100"
          }`}
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
          <p
            className={`font-semibold ${isConnected ? "text-emerald-800" : isConfigured ? "text-blue-800" : "text-amber-800"}`}
          >
            {statusLabel}
          </p>
          <p
            className={`text-sm ${isConnected ? "text-emerald-600" : isConfigured ? "text-blue-600" : "text-amber-600"}`}
          >
            {isConnected
              ? "SMS gateway connected — users can interact via SMS."
              : isConfigured
                ? "Credentials saved — click Send Test SMS to verify."
                : "Enter your SMS provider credentials below to get started."}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isConnected ? (
            <Wifi className="w-5 h-5 text-emerald-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-amber-400" />
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestSMS}
            disabled={testing || !isConfigured}
            data-ocid="sms_config.test_button"
            className="gap-1.5 text-xs"
          >
            <Zap className={`w-3.5 h-3.5 ${testing ? "animate-pulse" : ""}`} />
            {testing ? "Sending…" : "Send Test SMS"}
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Config Form */}
        <div className="lg:col-span-2 space-y-5">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  SMS Provider Configuration
                </h3>
              </div>

              {/* Provider select */}
              <div className="space-y-1.5">
                <Label htmlFor="sms-provider">SMS Provider</Label>
                <Select
                  value={form.provider}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, provider: v as SMSProvider }))
                  }
                >
                  <SelectTrigger
                    id="sms-provider"
                    data-ocid="sms_config.provider_select"
                  >
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {SMS_PROVIDERS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* API Key */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="sms-api-key">{fieldLabels.apiKeyLabel}</Label>
                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    id="sms-api-key"
                    type={showApiKey ? "text" : "password"}
                    value={form.apiKey}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, apiKey: e.target.value }))
                    }
                    placeholder={fieldLabels.apiKeyPlaceholder}
                    className="pr-16"
                    data-ocid="sms_config.api_key_input"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowApiKey((v) => !v)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showApiKey ? "Hide API key" : "Show API key"}
                    >
                      {showApiKey ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(form.apiKey, "API Key")}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Copy API key"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Auth Token */}
              {fieldLabels.showAuthToken && (
                <div className="space-y-1.5">
                  <Label htmlFor="sms-auth-token">
                    {fieldLabels.authTokenLabel}
                  </Label>
                  <div className="relative">
                    <Input
                      id="sms-auth-token"
                      type={showAuthToken ? "text" : "password"}
                      value={form.authToken}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, authToken: e.target.value }))
                      }
                      placeholder={fieldLabels.authTokenPlaceholder}
                      className="pr-16"
                      data-ocid="sms_config.auth_token_input"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setShowAuthToken((v) => !v)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showAuthToken ? "Hide" : "Show"}
                      >
                        {showAuthToken ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom base URL */}
              {fieldLabels.showBaseUrl && (
                <div className="space-y-1.5">
                  <Label htmlFor="sms-base-url">Provider Base URL</Label>
                  <Input
                    id="sms-base-url"
                    value={form.providerBaseUrl}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        providerBaseUrl: e.target.value,
                      }))
                    }
                    placeholder="https://api.yourprovider.com/v1/sms"
                    className="font-mono text-xs"
                    data-ocid="sms_config.base_url_input"
                  />
                </div>
              )}

              {/* From Number / Sender ID */}
              <div className="space-y-1.5">
                <Label htmlFor="sms-from">Sender ID / From Number</Label>
                <Input
                  id="sms-from"
                  value={form.fromNumber}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fromNumber: e.target.value }))
                  }
                  placeholder={
                    form.provider === "twilio" ? "+14155552671" : "LBKART"
                  }
                  data-ocid="sms_config.from_number_input"
                />
                <p className="text-xs text-muted-foreground">
                  {form.provider === "twilio"
                    ? "Your Twilio phone number in E.164 format (e.g. +14155552671)"
                    : "Your registered Sender ID or from number"}
                </p>
              </div>

              {/* Webhook URL */}
              <div className="space-y-1.5">
                <Label htmlFor="sms-webhook">Webhook URL</Label>
                <div className="relative">
                  <Input
                    id="sms-webhook"
                    value={form.webhookUrl || PLATFORM_WEBHOOK_URL}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, webhookUrl: e.target.value }))
                    }
                    className="pr-9 font-mono text-xs"
                    data-ocid="sms_config.webhook_url_input"
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
                  Copy this URL and paste it into your SMS provider's webhook /
                  callback settings.
                </p>
              </div>

              {/* Enable toggle */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Enable SMS Integration
                  </p>
                  <p className="text-xs text-muted-foreground">
                    When disabled, incoming SMS messages are ignored
                  </p>
                </div>
                <Switch
                  checked={form.isEnabled}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isEnabled: v }))
                  }
                  data-ocid="sms_config.enabled_toggle"
                />
              </div>

              {/* Save / Reset */}
              <div className="flex gap-2 pt-1">
                <Button
                  type="submit"
                  disabled={saving}
                  data-ocid="sms_config.save_button"
                  className="flex-1 gap-2"
                >
                  <Send className="w-4 h-4" />
                  {saving ? "Saving…" : "Save Configuration"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForm({
                      provider: "twilio",
                      apiKey: "",
                      authToken: "",
                      fromNumber: "",
                      webhookUrl: PLATFORM_WEBHOOK_URL,
                      providerBaseUrl: "",
                      isEnabled: false,
                    });
                    toast.info("Form cleared");
                  }}
                  data-ocid="sms_config.reset_button"
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>

          {/* Saved config table */}
          {savedRows.length > 0 && (
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
              <div className="px-5 py-3 border-b border-border bg-muted/20">
                <h3 className="font-display font-semibold text-sm text-foreground">
                  Stored Configuration
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Last 5 saved fields — queryable from Data Explorer
                </p>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wide text-[10px]">
                      Field
                    </th>
                    <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wide text-[10px]">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedRows.map((row) => (
                    <tr
                      key={row.field}
                      className="border-b border-border/50 last:border-0"
                      data-ocid="sms_config.table_row"
                    >
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        {row.field}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-muted-foreground break-all">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Status card */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-card">
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-emerald-500" : "bg-amber-400"}`}
              />
              <h4 className="font-semibold text-sm text-foreground">
                {isConnected ? "Connected" : "Not Connected"}
              </h4>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { label: "Provider", value: form.provider || "—" },
                { label: "Sender ID", value: form.fromNumber || "—" },
                { label: "Webhook", value: "SMS HTTP webhook" },
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

          {/* Quick links */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-2 shadow-card">
            <h4 className="font-semibold text-sm text-foreground mb-2">
              Provider Docs
            </h4>
            {[
              {
                label: "Twilio Console",
                url: "https://console.twilio.com",
              },
              {
                label: "MSG91 Dashboard",
                url: "https://control.msg91.com/app/",
              },
              {
                label: "Fast2SMS Dashboard",
                url: "https://www.fast2sms.com/dashboard",
              },
            ].map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="sms_config.quick_link"
                className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 hover:underline transition-colors py-1"
              >
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                {link.label}
              </a>
            ))}
          </div>

          {/* Webhook info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-blue-800">
              Webhook URL to paste in provider console:
            </p>
            <code className="text-[11px] font-mono text-blue-700 break-all select-all block bg-blue-100 rounded px-2 py-1.5">
              {PLATFORM_WEBHOOK_URL}
            </code>
            <button
              type="button"
              onClick={() =>
                copyToClipboard(PLATFORM_WEBHOOK_URL, "Webhook URL")
              }
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium"
            >
              <Copy className="w-3 h-3" />
              Copy webhook URL
            </button>
          </div>
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
                data-ocid={`sms_config.setup_step.${item.step}`}
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
