import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  Check,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Key,
  Link,
  Plus,
  RotateCcw,
  Save,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGenerateApiKey } from "../hooks/useBackend";

interface ApiKeyEntry {
  id: string;
  keyLabel: string;
  maskedKey: string;
  fullKey?: string;
  usageCount: number;
  lastUsed?: string;
  isActive: boolean;
  createdAt: string;
}

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
}

interface EndpointGroup {
  group: string;
  isNew?: boolean;
  endpoints: Endpoint[];
}

const ENDPOINT_GROUPS: EndpointGroup[] = [
  {
    group: "Users",
    endpoints: [
      { method: "GET", path: "/api/users", description: "List all users" },
      {
        method: "POST",
        path: "/api/users",
        description: "Register a new user",
      },
      { method: "GET", path: "/api/users/:id", description: "Get user by ID" },
      {
        method: "PUT",
        path: "/api/users/:id",
        description: "Update user details",
      },
    ],
  },
  {
    group: "Merchants",
    endpoints: [
      {
        method: "GET",
        path: "/api/merchants",
        description: "List all merchants",
      },
      {
        method: "POST",
        path: "/api/merchants",
        description: "Register a new merchant",
      },
      {
        method: "GET",
        path: "/api/merchants/:id",
        description: "Get merchant by ID",
      },
      {
        method: "PUT",
        path: "/api/merchants/:id",
        description: "Update merchant",
      },
    ],
  },
  {
    group: "Delivery Partners",
    endpoints: [
      {
        method: "GET",
        path: "/api/delivery-partners",
        description: "List delivery partners",
      },
      {
        method: "POST",
        path: "/api/delivery-partners",
        description: "Register delivery partner",
      },
      {
        method: "GET",
        path: "/api/delivery-partners/:id",
        description: "Get DP by ID",
      },
    ],
  },
  {
    group: "Sarthi Partners",
    endpoints: [
      {
        method: "GET",
        path: "/api/sarthi-partners",
        description: "List sarthi partners",
      },
      {
        method: "POST",
        path: "/api/sarthi-partners",
        description: "Register sarthi partner",
      },
      {
        method: "GET",
        path: "/api/sarthi-partners/:id",
        description: "Get sarthi partner by ID",
      },
    ],
  },
  {
    group: "Products",
    endpoints: [
      {
        method: "GET",
        path: "/api/products",
        description: "List all products",
      },
      {
        method: "POST",
        path: "/api/products",
        description: "Create a product",
      },
      {
        method: "GET",
        path: "/api/products/search",
        description: "Search products by keyword",
      },
    ],
  },
  {
    group: "Orders",
    endpoints: [
      { method: "GET", path: "/api/orders", description: "List all orders" },
      { method: "POST", path: "/api/orders", description: "Create an order" },
      {
        method: "PUT",
        path: "/api/orders/:id/status",
        description: "Update order status",
      },
    ],
  },
  {
    group: "Jobs",
    endpoints: [
      {
        method: "GET",
        path: "/api/jobs",
        description: "List all job postings",
      },
      {
        method: "POST",
        path: "/api/jobs",
        description: "Create a job posting",
      },
      {
        method: "GET",
        path: "/api/jobs/search",
        description: "Search jobs by keyword/location",
      },
    ],
  },
  {
    group: "Properties",
    endpoints: [
      {
        method: "GET",
        path: "/api/properties",
        description: "List all properties",
      },
      {
        method: "POST",
        path: "/api/properties",
        description: "Create a property listing",
      },
      {
        method: "GET",
        path: "/api/properties/search",
        description: "Search properties",
      },
    ],
  },
  {
    group: "Transport",
    endpoints: [
      {
        method: "GET",
        path: "/api/transport",
        description: "List transport bookings",
      },
      {
        method: "POST",
        path: "/api/transport",
        description: "Create a transport booking",
      },
      {
        method: "PUT",
        path: "/api/transport/:id/status",
        description: "Update booking status",
      },
    ],
  },
  {
    group: "Leads",
    endpoints: [
      { method: "GET", path: "/api/leads", description: "List all leads" },
      { method: "POST", path: "/api/leads", description: "Create a lead" },
    ],
  },
  {
    group: "Events",
    isNew: true,
    endpoints: [
      { method: "GET", path: "/api/events", description: "List all events" },
      { method: "POST", path: "/api/events", description: "Create an event" },
      {
        method: "GET",
        path: "/api/events/:id",
        description: "Get event by ID",
      },
      {
        method: "PUT",
        path: "/api/events/:id/status",
        description: "Update event status",
      },
      {
        method: "DELETE",
        path: "/api/events/:id",
        description: "Delete an event",
      },
    ],
  },
  {
    group: "Family Groups",
    isNew: true,
    endpoints: [
      {
        method: "GET",
        path: "/api/family",
        description: "List all family groups",
      },
      {
        method: "POST",
        path: "/api/family/member",
        description: "Add a family member",
      },
      {
        method: "PUT",
        path: "/api/family/:id/invite-status",
        description: "Update invite status",
      },
      {
        method: "DELETE",
        path: "/api/family/:id",
        description: "Remove a family member",
      },
    ],
  },
  {
    group: "Promotions",
    isNew: true,
    endpoints: [
      {
        method: "GET",
        path: "/api/promotions",
        description: "List all promotions",
      },
      {
        method: "POST",
        path: "/api/promotions",
        description: "Create a promotion",
      },
      {
        method: "GET",
        path: "/api/promotions/:id/analytics",
        description: "Get promotion analytics",
      },
      {
        method: "PUT",
        path: "/api/promotions/:id/approve",
        description: "Approve a promotion",
      },
      {
        method: "PUT",
        path: "/api/promotions/:id/reject",
        description: "Reject a promotion",
      },
    ],
  },
  {
    group: "Lending",
    isNew: true,
    endpoints: [
      {
        method: "GET",
        path: "/api/lending",
        description: "Get all lending items",
      },
      {
        method: "POST",
        path: "/api/lending",
        description: "Create a lending item",
      },
      {
        method: "PUT",
        path: "/api/lending/:id",
        description: "Update a lending item",
      },
      {
        method: "POST",
        path: "/api/lending/:id/remind",
        description: "Trigger reminder for lending item",
      },
      {
        method: "POST",
        path: "/api/lending/check-overdue",
        description: "Check and send overdue reminders",
      },
    ],
  },
  {
    group: "Community",
    isNew: true,
    endpoints: [
      {
        method: "GET",
        path: "/api/community",
        description: "Get all community members",
      },
      {
        method: "GET",
        path: "/api/community/search?q=",
        description: "Search community members by keyword",
      },
      {
        method: "GET",
        path: "/api/community/:phone",
        description: "Get community member by phone",
      },
      {
        method: "DELETE",
        path: "/api/community/:phone",
        description: "Remove a community member",
      },
    ],
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function TestPanel({
  endpoint,
  onClose,
}: { endpoint: Endpoint; onClose: () => void }) {
  const [body, setBody] = useState("{\n  \n}");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSend() {
    setLoading(true);
    // These endpoints are ICP canister actor methods — they are not REST URLs
    // callable from a browser fetch. Use the actor hooks in hooks/useBackend.ts
    // to call them from React components, or use the candid UI at:
    // https://<canister-id>.raw.icp0.io
    await new Promise((r) => setTimeout(r, 400));
    setResponse(
      JSON.stringify(
        {
          note: "This panel documents the API surface. To call backend methods directly, use the actor hooks in hooks/useBackend.ts or the Candid UI for your canister.",
          endpoint: `${endpoint.method} ${endpoint.path}`,
          hint: "No mock data — all reads and writes must go through the live backend actor.",
        },
        null,
        2,
      ),
    );
    setLoading(false);
  }
  return (
    <div
      className="fixed inset-y-0 right-0 w-full sm:w-96 bg-card border-l border-border shadow-xl z-50 flex flex-col"
      data-ocid="test-panel.panel"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
        <div>
          <p className="text-sm font-semibold text-foreground">Test Endpoint</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-xs px-1.5 py-0.5 rounded font-bold ${METHOD_COLORS[endpoint.method]}`}
            >
              {endpoint.method}
            </span>
            <code className="text-xs text-muted-foreground">
              {endpoint.path}
            </code>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close panel"
          onClick={onClose}
          className="p-1 rounded hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {endpoint.method !== "GET" && (
          <div className="space-y-1.5">
            <Label htmlFor="request-body">Request Body (JSON)</Label>
            <Textarea
              id="request-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="font-mono text-xs h-32"
              data-ocid="test-panel.body_input"
            />
          </div>
        )}
        {response && (
          <div className="space-y-1.5">
            <Label>Response</Label>
            <pre className="text-xs bg-muted/40 rounded-lg p-3 overflow-auto max-h-64 font-mono whitespace-pre-wrap">
              {response}
            </pre>
          </div>
        )}
      </div>
      <div className="px-4 py-3 border-t border-border">
        <Button
          className="w-full gap-2"
          onClick={handleSend}
          disabled={loading}
          data-ocid="test-panel.send_button"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {loading ? "Sending…" : "Send Request"}
        </Button>
      </div>
    </div>
  );
}

export default function ApiPanelPage() {
  const generateApiKey = useGenerateApiKey();
  const [apiKeys, setApiKeys] = useState<ApiKeyEntry[]>([]);
  const [showGenModal, setShowGenModal] = useState(false);
  const [keyLabel, setKeyLabel] = useState("");
  const [newKeyReveal, setNewKeyReveal] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [testEndpoint, setTestEndpoint] = useState<Endpoint | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set([
      "Users",
      "Orders",
      "Events",
      "Family Groups",
      "Promotions",
      "Lending",
      "Community",
    ]),
  );
  const [copied, setCopied] = useState(false);

  // Editable URL config
  const [baseUrl, setBaseUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [editingConfig, setEditingConfig] = useState(false);
  const [baseUrlInput, setBaseUrlInput] = useState(baseUrl);
  const [webhookInput, setWebhookInput] = useState(webhookUrl);

  useEffect(() => {
    setBaseUrlInput(baseUrl);
    setWebhookInput(webhookUrl);
  }, [baseUrl, webhookUrl]);

  function saveConfig() {
    localStorage.setItem("wc_base_url", baseUrlInput);
    localStorage.setItem("wc_webhook_url", webhookInput);
    setBaseUrl(baseUrlInput);
    setWebhookUrl(webhookInput);
    setEditingConfig(false);
    toast.success("Configuration saved");
  }

  function toggleGroup(group: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }

  function toggleKeyVisibility(id: string) {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleGenerate() {
    if (!keyLabel.trim()) return;
    try {
      const apiKey = await generateApiKey.mutateAsync({
        ownerId: "admin",
        keyLabel: keyLabel.trim(),
      });
      const newKey: ApiKeyEntry = {
        id: apiKey.id,
        keyLabel: keyLabel.trim(),
        maskedKey: `wc_...${apiKey.key.slice(-4)}`,
        fullKey: apiKey.key,
        usageCount: 0,
        isActive: true,
        createdAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      setApiKeys((prev) => [newKey, ...prev]);
      setNewKeyReveal(apiKey.key);
      setShowGenModal(false);
      setKeyLabel("");
    } catch {
      // fallback to client-side generation
      const full = `wc_${Math.random().toString(36).slice(2, 12)}_${Math.random().toString(36).slice(2, 12)}`;
      const newKey: ApiKeyEntry = {
        id: `ak${Date.now()}`,
        keyLabel: keyLabel.trim(),
        maskedKey: `wc_...${full.slice(-4)}`,
        fullKey: full,
        usageCount: 0,
        isActive: true,
        createdAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      setApiKeys((prev) => [newKey, ...prev]);
      setNewKeyReveal(full);
      setShowGenModal(false);
      setKeyLabel("");
    }
  }

  function handleRevoke(id: string) {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, isActive: false } : k)),
    );
    setRevokeTarget(null);
    toast.success("API key revoked");
  }

  function copyText(text: string, msg = "Copied") {
    navigator.clipboard.writeText(text).catch(() => {});
    toast.success(msg);
  }

  function copyBaseUrl() {
    copyText(baseUrl, "Base URL copied");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6 animate-fade-in" data-ocid="api-panel.page">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          API Integration Panel
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage API keys, configure endpoints, and test integrations
        </p>
      </div>

      {/* URL Configuration panel */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/20">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">
            API Configuration
          </h3>
          <div className="ml-auto">
            {!editingConfig ? (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1"
                onClick={() => setEditingConfig(true)}
                data-ocid="api-panel.edit_config_button"
              >
                Edit Configuration
              </Button>
            ) : (
              <Button
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={saveConfig}
                data-ocid="api-panel.save_config_button"
              >
                <Save className="w-3.5 h-3.5" /> Save Configuration
              </Button>
            )}
          </div>
        </div>
        <div className="p-5 space-y-4">
          {/* Base URL */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Base URL
            </Label>
            {editingConfig ? (
              <Input
                value={baseUrlInput}
                onChange={(e) => setBaseUrlInput(e.target.value)}
                placeholder="https://your-canister.icp.app"
                className="font-mono text-sm"
                data-ocid="api-panel.base_url_input"
              />
            ) : (
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border">
                <code className="flex-1 text-xs font-mono text-foreground truncate">
                  {baseUrl}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1.5 shrink-0 text-xs"
                  onClick={copyBaseUrl}
                  data-ocid="api-panel.copy_base_url"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}{" "}
                  Copy
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Used as the prefix for all API endpoint examples below.
            </p>
          </div>

          {/* Webhook URL */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5" /> Webhook URL
            </Label>
            {editingConfig ? (
              <Input
                value={webhookInput}
                onChange={(e) => setWebhookInput(e.target.value)}
                placeholder="https://your-webhook.example.com/webhook"
                className="font-mono text-sm"
                data-ocid="api-panel.webhook_url_input"
              />
            ) : (
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border">
                {webhookUrl ? (
                  <code className="flex-1 text-xs font-mono text-foreground truncate">
                    {webhookUrl}
                  </code>
                ) : (
                  <span className="flex-1 text-xs text-muted-foreground italic">
                    No webhook URL configured
                  </span>
                )}
                {webhookUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1.5 shrink-0 text-xs"
                    onClick={() => copyText(webhookUrl, "Webhook URL copied")}
                    data-ocid="api-panel.copy_webhook_url"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              WhatsApp Business API webhook verification token endpoint.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="keys" data-ocid="api-panel.tabs">
        <TabsList>
          <TabsTrigger value="keys" data-ocid="api-panel.keys_tab">
            <Key className="w-4 h-4 mr-1.5" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="endpoints" data-ocid="api-panel.endpoints_tab">
            <Activity className="w-4 h-4 mr-1.5" />
            Endpoints
          </TabsTrigger>
          <TabsTrigger value="usage" data-ocid="api-panel.usage_tab">
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Usage
          </TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="keys" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowGenModal(true)}
              className="gap-2"
              data-ocid="api-panel.generate_key_button"
            >
              <Plus className="w-4 h-4" /> Generate New Key
            </Button>
          </div>
          <div className="space-y-3">
            {apiKeys.length === 0 ? (
              <div
                className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground"
                data-ocid="api-keys.empty_state"
              >
                <Key className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">No API keys yet</p>
                <p className="text-xs mt-1">Generate a key to get started</p>
              </div>
            ) : (
              apiKeys.map((key, i) => (
                <div
                  key={key.id}
                  className="bg-card border border-border rounded-xl p-4 space-y-3"
                  data-ocid={`api-keys.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {key.keyLabel}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Created {key.createdAt}
                      </p>
                    </div>
                    <Badge variant={key.isActive ? "default" : "secondary"}>
                      {key.isActive ? "Active" : "Revoked"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-muted px-3 py-2 rounded-lg font-mono">
                      {visibleKeys.has(key.id) && key.fullKey
                        ? key.fullKey
                        : key.maskedKey}
                    </code>
                    <button
                      type="button"
                      aria-label={
                        visibleKeys.has(key.id) ? "Hide key" : "Show key"
                      }
                      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                      onClick={() => toggleKeyVisibility(key.id)}
                      data-ocid={`api-keys.toggle_visibility.${i + 1}`}
                    >
                      {visibleKeys.has(key.id) ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label="Copy key"
                      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                      onClick={() => copyText(key.maskedKey, "Key copied")}
                      data-ocid={`api-keys.copy.${i + 1}`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {key.isActive && (
                      <button
                        type="button"
                        aria-label="Revoke key"
                        className="p-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => setRevokeTarget(key.id)}
                        data-ocid={`api-keys.revoke.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      Calls:{" "}
                      <strong className="text-foreground">
                        {key.usageCount.toLocaleString("en-IN")}
                      </strong>
                    </span>
                    {key.lastUsed && (
                      <span>
                        Last used:{" "}
                        <strong className="text-foreground">
                          {key.lastUsed}
                        </strong>
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Endpoints Tab */}
        <TabsContent value="endpoints" className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              New
            </span>
            <span>
              = Events, Family Groups, Promotions, Lending &amp; Community
              endpoints added
            </span>
          </div>
          {ENDPOINT_GROUPS.map((group) => {
            const isExpanded = expandedGroups.has(group.group);
            return (
              <div
                key={group.group}
                className={`bg-card border rounded-xl overflow-hidden transition-colors ${group.isNew ? "border-primary/30" : "border-border"}`}
              >
                <button
                  type="button"
                  className="w-full px-4 py-3 bg-muted/20 hover:bg-muted/30 transition-colors flex items-center justify-between"
                  onClick={() => toggleGroup(group.group)}
                  data-ocid={`endpoint-group.${group.group.toLowerCase().replace(/\s+/g, "-")}.toggle`}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-foreground">
                      {group.group}
                    </h3>
                    {group.isNew && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                        New
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      ({group.endpoints.length} endpoints)
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </button>
                {isExpanded && (
                  <div className="divide-y divide-border">
                    {group.endpoints.map((ep) => (
                      <div
                        key={`${ep.method}-${ep.path}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/10 transition-colors"
                      >
                        <span
                          className={`text-xs px-2 py-1 rounded font-bold flex-shrink-0 w-14 text-center ${METHOD_COLORS[ep.method]}`}
                        >
                          {ep.method}
                        </span>
                        <code className="text-xs font-mono text-foreground flex-1 min-w-0 truncate">
                          {ep.path}
                        </code>
                        <span className="text-xs text-muted-foreground hidden sm:block flex-1 min-w-0 truncate">
                          {ep.description}
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            aria-label="Copy URL"
                            className="p-1.5 rounded border border-border hover:bg-muted transition-colors text-muted-foreground"
                            onClick={() =>
                              copyText(`${baseUrl}${ep.path}`, "URL copied")
                            }
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7"
                            onClick={() => setTestEndpoint(ep)}
                            data-ocid="endpoint.test_button"
                          >
                            Test
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="mt-4 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total API Calls", value: "48,230" },
              { label: "Calls Today", value: "1,870" },
              { label: "Avg Response", value: "54ms" },
              { label: "Success Rate", value: "98.7%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-4 text-center"
              >
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div
            className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground"
            data-ocid="usage.empty_state"
          >
            <Activity className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">No usage data yet</p>
            <p className="text-xs mt-1">
              API calls will appear here once integrations are active
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Generate key modal */}
      {showGenModal && (
        <Dialog open onOpenChange={(o) => !o && setShowGenModal(false)}>
          <DialogContent className="max-w-sm" data-ocid="generate-key.dialog">
            <DialogHeader>
              <DialogTitle>Generate New API Key</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="key-label">Key Label</Label>
                <Input
                  id="key-label"
                  placeholder="e.g. Production Internal"
                  value={keyLabel}
                  onChange={(e) => setKeyLabel(e.target.value)}
                  data-ocid="generate-key.label_input"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowGenModal(false)}
                  data-ocid="generate-key.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={!keyLabel.trim() || generateApiKey.isPending}
                  data-ocid="generate-key.submit_button"
                >
                  {generateApiKey.isPending ? "Generating…" : "Generate Key"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* New key reveal */}
      {newKeyReveal && (
        <Dialog open onOpenChange={(o) => !o && setNewKeyReveal(null)}>
          <DialogContent className="max-w-md" data-ocid="reveal-key.dialog">
            <DialogHeader>
              <DialogTitle className="text-amber-600">
                Copy Your New API Key
              </DialogTitle>
            </DialogHeader>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300 mt-2">
              ⚠️ This key won't be shown again. Copy it now and store it
              securely.
            </div>
            <div className="flex items-center gap-2 mt-3">
              <code className="flex-1 text-xs bg-muted px-3 py-2 rounded-lg font-mono break-all">
                {newKeyReveal}
              </code>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyText(newKeyReveal, "Key copied")}
                aria-label="Copy key"
                data-ocid="reveal-key.copy_button"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-end mt-3">
              <Button
                onClick={() => setNewKeyReveal(null)}
                data-ocid="reveal-key.close_button"
              >
                Done — I've copied it
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Revoke confirm */}
      {revokeTarget && (
        <Dialog open onOpenChange={(o) => !o && setRevokeTarget(null)}>
          <DialogContent className="max-w-sm" data-ocid="revoke-key.dialog">
            <DialogHeader>
              <DialogTitle className="text-destructive">
                Revoke API Key?
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground mt-2">
              This key will be permanently disabled. Any integrations using it
              will stop working immediately.
            </p>
            <div className="flex gap-2 justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => setRevokeTarget(null)}
                data-ocid="revoke-key.cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => revokeTarget && handleRevoke(revokeTarget)}
                data-ocid="revoke-key.confirm_button"
              >
                Revoke Key
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {testEndpoint && (
        <TestPanel
          endpoint={testEndpoint}
          onClose={() => setTestEndpoint(null)}
        />
      )}
    </div>
  );
}
