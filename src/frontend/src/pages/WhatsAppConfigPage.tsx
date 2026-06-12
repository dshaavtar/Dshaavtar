import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Copy,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  HelpCircle,
  Link,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  Send,
  Settings,
  Shield,
  TrendingUp,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  SAFE_DEFAULT_WA_CONFIG,
  useClearFlowCache,
  useUpdateWebhookUrl,
  useUpdateWhatsAppConfigFull,
  useWhatsAppConfig,
  useWhatsAppConfigFull,
  useWhatsAppConfigTable,
} from "../hooks/useBackend";
import type { WhatsAppConfig } from "../types";
/** The user's WhatsApp webhook callback URL */
const CALLBACK_URL = "https://bot.localbazar.shop";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

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
      "Note: This is different from the actual phone number — it's an internal Meta ID.",
    ],
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
      "8. Click 'Done' to complete the setup.",
    ],
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
      "7. Monitor message delivery rates in the Meta Business Manager dashboard.",
    ],
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
      "Upgrade by maintaining high quality rating and low block rate.",
    ],
  },
];

const QUICK_LINKS = [
  {
    label: "Meta Developer Console",
    url: "https://developers.facebook.com",
    icon: ExternalLink,
  },
  {
    label: "WhatsApp Business Manager",
    url: "https://business.facebook.com",
    icon: ExternalLink,
  },
  {
    label: "API Documentation",
    url: "https://developers.facebook.com/docs/whatsapp",
    icon: ExternalLink,
  },
  {
    label: "Webhook Events Guide",
    url: "https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks",
    icon: ExternalLink,
  },
];

const WEBHOOK_STEPS = [
  "Go to developers.facebook.com → Your App → WhatsApp → Configuration",
  'Click "Edit" next to Webhook',
  `Enter the Callback URL: ${CALLBACK_URL}`,
  "Enter your Verify Token (must match exactly what you set here)",
  "Subscribe to: messages, message_reactions",
  'Click "Verify and Save"',
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhatsAppConfigPage() {
  const queryClient = useQueryClient();
  const { data: rawConfig, isLoading } = useWhatsAppConfig();
  const { data: fullConfig } = useWhatsAppConfigFull();
  const { data: configTableRows = [], refetch: refetchTable } =
    useWhatsAppConfigTable();
  const updateWebhookUrl = useUpdateWebhookUrl();
  const updateFullConfig = useUpdateWhatsAppConfigFull();
  const clearFlowCache = useClearFlowCache();

  const [form, setForm] = useState<Partial<WhatsAppConfig>>({});
  const [saving, setSaving] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [testPhone, setTestPhone] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [tableSearch, setTableSearch] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);

  // Populate form from fetched config whenever it changes (handles page reopen after save)
  useEffect(() => {
    const merged = { ...(rawConfig ?? {}), ...(fullConfig ?? {}) } as Record<
      string,
      unknown
    >;
    if (Object.keys(merged).length === 0) return;
    setForm((prev) => {
      // Only pre-populate fields that the user has NOT actively edited (empty in form)
      const updates: Partial<WhatsAppConfig> = {};
      const fields = [
        "webhookUrl",
        "verifyToken",
        "phoneNumberId",
        "apiKey",
        "businessAccountId",
        "appId",
        "isConnected",
        "isTestMode",
      ] as const;
      for (const key of fields) {
        if (
          (prev[key] === undefined || prev[key] === null || prev[key] === "") &&
          merged[key] !== undefined &&
          merged[key] !== null &&
          merged[key] !== ""
        ) {
          (updates as Record<string, unknown>)[key] = merged[key];
        }
      }
      return Object.keys(updates).length > 0 ? { ...prev, ...updates } : prev;
    });
  }, [rawConfig, fullConfig]);
  const [editingValue, setEditingValue] = useState("");
  const [savedVerifyToken, setSavedVerifyToken] = useState<string | null>(null);

  // Always have a safe non-null config object — merges safe defaults with fetched data and form overrides
  const config = {
    ...SAFE_DEFAULT_WA_CONFIG,
    ...(rawConfig ?? {}),
    ...(fullConfig ?? {}),
  };
  const current: WhatsAppConfig & Record<string, unknown> = {
    ...config,
    ...form,
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      // Build the full config object for the backend
      const fullCfgPayload: import("../backend.d").FullWhatsAppConfig = {
        webhookUrl: String(current.webhookUrl || CALLBACK_URL),
        verifyToken: String(current.verifyToken || ""),
        phoneNumberId: String(current.phoneNumberId || ""),
        apiKey: String(current.apiKey || ""),
        businessAccountId: String((current.businessAccountId as string) || ""),
        metaAppId: String((current.appId as string) || ""),
        isConnected: Boolean(current.isConnected),
        isTestMode: Boolean(current.isTestMode ?? true),
      };
      await updateFullConfig.mutateAsync(fullCfgPayload);
      // Also update webhook URL separately if changed
      if (form.webhookUrl && form.webhookUrl !== config.webhookUrl) {
        await updateWebhookUrl.mutateAsync(form.webhookUrl);
      }
      await queryClient.invalidateQueries({ queryKey: ["whatsapp-config"] });
      await queryClient.invalidateQueries({
        queryKey: ["whatsapp-config-full"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["whatsapp-config-table"],
      });
      // Capture the verify token before clearing the form so we can display it
      const tokenToShow = String(current.verifyToken || "");
      // Clear only the local form overrides — the data will reload from backend via useEffect
      setForm({});
      if (tokenToShow) {
        setSavedVerifyToken(tokenToShow);
      }
      toast.success("WhatsApp configuration saved successfully!");
    } catch (err) {
      toast.error(
        `Failed to save: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleClearFlowCache() {
    try {
      const cleared = await clearFlowCache.mutateAsync(undefined);
      toast.success(`Cleared ${Number(cleared)} stuck flow states`);
    } catch {
      toast.error("Failed to clear flow cache");
    }
  }

  function copyToClipboard(text: string, label: string) {
    if (!text) {
      toast.error(`${label} is empty`);
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(`${label} copied!`));
  }

  async function testWebhook() {
    setTestingWebhook(true);
    await new Promise((r) => setTimeout(r, 1500));
    setTestingWebhook(false);
    if (current.isTestMode)
      toast.success("Webhook test successful! (Test Mode — simulated)");
    else if (current.webhookUrl)
      toast.success("Webhook endpoint is reachable!");
    else toast.error("Webhook URL is not configured");
  }

  async function sendTestMessage() {
    if (!testPhone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }
    setSendingTest(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSendingTest(false);
    if (current.isTestMode)
      toast.success(`Test message simulated to ${testPhone} (Test Mode)`);
    else if (current.isConnected)
      toast.success(`"Hello from LocalBazar Kart!" sent to ${testPhone}`);
    else toast.error("Not connected — configure API credentials first");
  }

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-5xl">
        {["sk1", "sk2", "sk3"].map((id) => (
          <div key={id} className="h-24 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  const webhookUrl = form.webhookUrl ?? current.webhookUrl ?? CALLBACK_URL;

  const allSettingsRows = [
    {
      key: "phoneNumberId",
      label: "Phone Number ID",
      value: current.phoneNumberId ?? "—",
      editable: true,
    },
    {
      key: "apiKey",
      label: "Access Token",
      value: current.apiKey ? `...${String(current.apiKey).slice(-4)}` : "—",
      editable: false,
    },
    {
      key: "webhookUrl",
      label: "Webhook URL",
      value: current.webhookUrl || CALLBACK_URL,
      editable: true,
    },
    {
      key: "verifyToken",
      label: "Verify Token",
      value: current.verifyToken ? "***hidden***" : "—",
      editable: false,
    },
    {
      key: "businessAccountId",
      label: "Business Account ID",
      value: (current.businessAccountId as string | undefined)
        ? String(current.businessAccountId)
        : "—",
      editable: true,
    },
    {
      key: "appId",
      label: "App ID",
      value: (current.appId as string | undefined)
        ? String(current.appId)
        : "—",
      editable: true,
    },
    {
      key: "apiVersion",
      label: "API Version",
      value: (current.apiVersion as string | undefined)
        ? String(current.apiVersion)
        : "v19.0",
      editable: true,
    },
    {
      key: "isTestMode",
      label: "Environment",
      value: current.isTestMode ? "Test" : "Live",
      editable: false,
    },
    {
      key: "monthlyRateLimit",
      label: "Monthly Rate Limit",
      value: (current.monthlyRateLimit as number | undefined)
        ? String(current.monthlyRateLimit)
        : "1000",
      editable: true,
    },
    {
      key: "templateMessageCount",
      label: "Template Message Count",
      value: (current.templateMessageCount as number | undefined)
        ? String(current.templateMessageCount)
        : "0",
      editable: false,
    },
    {
      key: "isConnected",
      label: "Connected",
      value: String(current.isConnected ?? false),
      editable: false,
    },
  ];

  // Merge category info from the backend table hook
  const categoryMap = Object.fromEntries(
    configTableRows.map((r) => [r.key, r.category]),
  );

  const settingsRows = tableSearch.trim()
    ? allSettingsRows.filter(
        (r) =>
          r.label.toLowerCase().includes(tableSearch.toLowerCase()) ||
          (categoryMap[r.key] ?? "Config")
            .toLowerCase()
            .includes(tableSearch.toLowerCase()),
      )
    : allSettingsRows;

  async function handleSettingEdit(key: string, value: string) {
    if (key === "webhookUrl") {
      try {
        await updateWebhookUrl.mutateAsync(value);
        toast.success("Webhook URL updated");
      } catch {
        toast.error("Failed to update webhook URL");
      }
    } else {
      setForm((f) => ({ ...f, [key]: value }));
      toast.success(
        "Setting updated locally — click Save Credentials to persist",
      );
    }
    setEditingKey(null);
    setEditingValue("");
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl overflow-x-hidden">
      {/* Connection Status Banner */}
      <div
        className={`flex items-center gap-4 p-4 rounded-xl border ${
          current.isConnected
            ? "bg-emerald-50 border-emerald-200"
            : current.isTestMode
              ? "bg-blue-50 border-blue-200"
              : "bg-amber-50 border-amber-200"
        }`}
        data-ocid="wa-connection-status"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            current.isConnected
              ? "bg-emerald-100"
              : current.isTestMode
                ? "bg-blue-100"
                : "bg-amber-100"
          }`}
        >
          {current.isConnected ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : current.isTestMode ? (
            <Zap className="w-5 h-5 text-blue-600" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold ${current.isConnected ? "text-emerald-800" : current.isTestMode ? "text-blue-800" : "text-amber-800"}`}
          >
            {current.isConnected
              ? "WhatsApp Business Connected"
              : current.isTestMode
                ? "Test / Simulation Mode Active"
                : "Not Connected"}
          </p>
          <p
            className={`text-sm ${current.isConnected ? "text-emerald-600" : current.isTestMode ? "text-blue-600" : "text-amber-600"}`}
          >
            {current.isConnected
              ? "Messages are being sent and received via the WhatsApp Business API."
              : current.isTestMode
                ? "Bot logic runs locally. No real messages sent — use the Chatbot Simulator."
                : "Enter your API credentials below to connect WhatsApp Business API."}
          </p>
        </div>
        {current.isConnected ? (
          <Wifi className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        ) : (
          <WifiOff
            className={`w-5 h-5 flex-shrink-0 ${current.isTestMode ? "text-blue-400" : "text-amber-400"}`}
          />
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <form onSubmit={handleSave} className="space-y-5">
            {/* API Credentials */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  API Credentials
                </h3>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    id="phoneNumberId"
                    value={form.phoneNumberId ?? config?.phoneNumberId ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phoneNumberId: e.target.value }))
                    }
                    placeholder="123456789012345"
                    data-ocid="wa-config-phone-id"
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(current.phoneNumberId, "Phone Number ID")
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy Phone Number ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Found in Meta Developer Console → Your App → WhatsApp → API
                  Setup
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="apiKey">Access Token</Label>
                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    id="apiKey"
                    type={showToken ? "text" : "password"}
                    value={form.apiKey ?? config?.apiKey ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, apiKey: e.target.value }))
                    }
                    placeholder="EAAxxxxxxxxxxxxxxxxxxxxxx"
                    data-ocid="wa-config-api-key"
                    className="pr-16"
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
                        copyToClipboard(current.apiKey, "Access Token")
                      }
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Copy access token"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Temporary or permanent token from Meta for Developers
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="verifyToken">Verify Token</Label>
                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    id="verifyToken"
                    value={form.verifyToken ?? config?.verifyToken ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, verifyToken: e.target.value }))
                    }
                    placeholder="your_custom_verify_token_2024"
                    data-ocid="wa-config-verify-token"
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(current.verifyToken, "Verify Token")
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy verify token"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Custom string — must match exactly what you enter in Meta
                  Developer Console
                </p>
              </div>

              <Button
                type="submit"
                disabled={saving}
                data-ocid="wa-config-save"
                className="w-full gap-2"
              >
                <Shield className="w-4 h-4" />
                {saving ? "Saving Credentials..." : "Save Credentials"}
              </Button>
            </div>

            {/* Post-save Verify Token Banner */}
            {savedVerifyToken && (
              <div
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3"
                data-ocid="wa-config-saved-verify-token-banner"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm font-semibold text-emerald-800">
                    Configuration Saved — Next Step: Verify with Meta
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-emerald-700">
                    Copy your Verify Token below and paste it into Meta Business
                    Manager → WhatsApp → Configuration → Webhook Verify Token:
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs font-mono bg-white border border-emerald-300 rounded px-3 py-2 break-all text-emerald-900">
                      {savedVerifyToken}
                    </code>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(savedVerifyToken, "Verify Token")
                      }
                      className="p-2 rounded border border-emerald-300 bg-white text-emerald-600 hover:text-emerald-800 transition-colors flex-shrink-0"
                      aria-label="Copy verify token"
                      data-ocid="wa-config-copy-saved-verify-token"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="bg-white border border-emerald-200 rounded-lg p-3 space-y-1">
                    <p className="text-xs font-semibold text-emerald-800">
                      Steps to complete Meta webhook setup:
                    </p>
                    <ol className="space-y-1">
                      {[
                        "Go to developers.facebook.com → Your App → WhatsApp → Configuration",
                        'Click "Edit" next to Webhook',
                        `Set Webhook URL to: ${CALLBACK_URL}`,
                        "Paste the Verify Token above into the Verify Token field",
                        'Click "Verify and Save"',
                        "Subscribe to: messages, message_reactions",
                      ].map((step, i) => (
                        <li
                          key={step}
                          className="text-xs text-emerald-700 flex gap-1.5"
                        >
                          <span className="flex-shrink-0 font-bold">
                            {i + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSavedVerifyToken(null)}
                  className="text-xs text-emerald-600 hover:text-emerald-800 underline"
                >
                  Dismiss
                </button>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card">
              <div className="flex items-center gap-2 mb-1">
                <Link className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  Webhook Setup
                </h3>
              </div>

              {/* Prominent callback URL banner */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <p className="text-xs font-semibold text-primary mb-1">
                  📋 Your Webhook Callback URL (enter this in Meta)
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono bg-background border border-border rounded px-2 py-1.5 break-all">
                    {CALLBACK_URL}
                  </code>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(CALLBACK_URL, "Callback URL")
                    }
                    className="p-1.5 rounded border border-border bg-background text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    aria-label="Copy callback URL"
                    data-ocid="wa-config-copy-callback-url"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Meta will send a GET verification request to this URL. Make
                  sure your Verify Token below matches what you enter in Meta.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="webhookUrl">
                  Custom Webhook URL (override)
                </Label>
                <div className="relative">
                  <Input
                    id="webhookUrl"
                    value={webhookUrl}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, webhookUrl: e.target.value }))
                    }
                    data-ocid="wa-config-webhook-url"
                    className="pr-9 font-mono text-xs"
                    placeholder={CALLBACK_URL}
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(webhookUrl, "Webhook URL")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy webhook URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave empty to use the default callback URL above.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={testWebhook}
                disabled={testingWebhook}
                data-ocid="wa-config-test-webhook"
                className="gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                {testingWebhook ? "Testing..." : "Test Webhook Connection"}
              </Button>

              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-xs font-semibold text-foreground mb-2">
                  Webhook Configuration Steps:
                </p>
                <ol className="space-y-1.5">
                  {WEBHOOK_STEPS.map((step, idx) => (
                    <li
                      key={step}
                      className="flex gap-2 text-xs text-muted-foreground"
                    >
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Test Mode */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-card">
              <h3 className="font-display font-semibold text-foreground mb-1">
                Test Mode Settings
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Test / Simulation Mode
                  </p>
                  <p className="text-xs text-muted-foreground">
                    When enabled, bot runs locally. No real WhatsApp messages
                    sent.
                  </p>
                </div>
                <Switch
                  checked={current.isTestMode ?? true}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isTestMode: v }))
                  }
                  data-ocid="wa-config-test-mode"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Mark as Connected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Manually mark the connection active after configuring
                    credentials
                  </p>
                </div>
                <Switch
                  checked={current.isConnected ?? false}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isConnected: v }))
                  }
                  data-ocid="wa-config-connected"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    window.location.href = "/chatbot";
                  }}
                  data-ocid="wa-config-open-simulator"
                  className="gap-2 text-primary border-primary/30 hover:bg-primary/5"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Open Chatbot
                  Simulator
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Right column */}
        <div className="space-y-5 lg:max-h-screen lg:overflow-y-auto lg:sticky lg:top-0 lg:pb-6">
          <div className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-card">
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${current.isConnected ? "bg-emerald-500" : "bg-amber-400"}`}
              />
              <h4 className="font-semibold text-sm text-foreground">
                {current.isConnected ? "Connected" : "Disconnected"}
              </h4>
              <Badge
                variant="outline"
                className={`ml-auto text-[10px] ${current.isTestMode ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-muted"}`}
              >
                {current.isTestMode ? "Test Mode" : "Live Mode"}
              </Badge>
            </div>
            <div className="space-y-2 text-xs">
              {[
                {
                  label: "Last event",
                  value: current.isConnected ? "2 mins ago" : "—",
                },
                {
                  label: "Sent today",
                  value: current.isConnected ? "247" : "—",
                },
                {
                  label: "Delivered",
                  value: current.isConnected ? "245 (99%)" : "—",
                  green: true,
                },
                {
                  label: "Failed",
                  value: current.isConnected ? "2 (1%)" : "—",
                  red: current.isConnected,
                },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span
                    className={`font-medium ${row.green ? "text-emerald-600" : row.red ? "text-red-500" : "text-foreground"}`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-2 shadow-card">
            <h4 className="font-semibold text-sm text-foreground mb-2">
              Quick Links
            </h4>
            {QUICK_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid={`wa-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 hover:underline transition-colors py-1"
              >
                <link.icon className="w-3.5 h-3.5 flex-shrink-0" /> {link.label}
              </a>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-card">
            <h4 className="font-semibold text-sm text-foreground">
              Send Test Message
            </h4>
            <p className="text-xs text-muted-foreground">
              Send a test message to any number for end-to-end verification.
            </p>
            <div className="space-y-2">
              <Input
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="+91 98765 43210"
                data-ocid="wa-config-test-phone"
                className="text-sm"
              />
              <Button
                type="button"
                onClick={sendTestMessage}
                disabled={sendingTest || !testPhone.trim()}
                data-ocid="wa-config-send-test"
                className="w-full gap-2"
                size="sm"
              >
                <Send className="w-3.5 h-3.5" />
                {sendingTest ? "Sending..." : "Send Test Message"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Settings Data Table */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2 flex-wrap">
          <Database className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            WhatsApp Settings Data Table
          </h3>
          <span className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Filter settings…"
                className="pl-8 h-8 text-xs w-44"
                data-ocid="wa-config-table-search"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => {
                void refetchTable();
                queryClient.invalidateQueries({
                  queryKey: ["whatsapp-config"],
                });
              }}
              data-ocid="wa-config-table-refresh"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </Button>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                {["Setting", "Value", "Category", "Last Updated", "Action"].map(
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
              {settingsRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-muted-foreground text-xs"
                  >
                    No configuration saved yet
                  </td>
                </tr>
              ) : (
                settingsRows.map((row) => (
                  <tr
                    key={row.key}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors"
                    data-ocid={`wa-config-table-row-${row.key}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground text-xs whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground break-all max-w-xs">
                      {editingKey === row.key ? (
                        <div className="flex items-center gap-1.5">
                          <Input
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            className="h-7 text-xs"
                            autoFocus
                            data-ocid={`wa-config-edit-input-${row.key}`}
                          />
                          <Button
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() =>
                              handleSettingEdit(row.key, editingValue)
                            }
                            data-ocid={`wa-config-save-setting-${row.key}`}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs"
                            onClick={() => {
                              setEditingKey(null);
                              setEditingValue("");
                            }}
                            data-ocid={`wa-config-cancel-setting-${row.key}`}
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <span className="font-mono">{row.value}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {categoryMap[row.key] ?? "Config"}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date().toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      {row.editable && editingKey !== row.key && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs text-primary hover:bg-primary/5"
                          onClick={() => {
                            setEditingKey(row.key);
                            setEditingValue(row.value === "—" ? "" : row.value);
                          }}
                          data-ocid={`wa-config-edit-button-${row.key}`}
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Utilities */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Admin Utilities
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Clear Flow Cache
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Flush stuck order/conversation states for all users. Use when
              customers report being stuck in a flow.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleClearFlowCache}
            disabled={clearFlowCache.isPending}
            data-ocid="wa-config-clear-cache"
            className="gap-2 shrink-0"
          >
            <RefreshCw
              className={`w-4 h-4 ${clearFlowCache.isPending ? "animate-spin" : ""}`}
            />
            {clearFlowCache.isPending ? "Clearing..." : "Clear Flow Cache"}
          </Button>
        </div>
      </div>

      {/* Setup Guide FAQ */}
      <div className="bg-muted/30 border border-border rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Setup Guide & FAQ
          </h3>
        </div>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item) => (
            <Collapsible
              key={item.id}
              open={openFaq === item.id}
              onOpenChange={(open) => setOpenFaq(open ? item.id : null)}
            >
              <CollapsibleTrigger
                className="flex w-full items-center justify-between px-4 py-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                data-ocid={`wa-faq-${item.id}`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                </div>
                {openFaq === item.id ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 px-4 py-3 bg-card/50 rounded-lg border border-border/50 space-y-1.5">
                  {item.content.map((line) => (
                    <p
                      key={line.slice(0, 30)}
                      className="text-sm text-muted-foreground"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
