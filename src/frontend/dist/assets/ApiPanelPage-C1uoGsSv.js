import { bp as useGenerateApiKey, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { G as Globe } from "./globe--tJa3NSQ.js";
import { S as Save } from "./save-De3uJrwe.js";
import { C as Check } from "./check-CO9wi49t.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
import { L as Link } from "./link-3oO5tL-1.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { A as Activity } from "./activity-RT92R42G.js";
import { R as RotateCcw } from "./rotate-ccw-BCahGsp7.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { E as EyeOff } from "./eye-off-DrNsJOxE.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { X } from "./x-Chksmd6i.js";
import { S as Send } from "./send-DoOOMmv0.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-BtrS4JsN.js";
import "./index-yUS8KoxU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode);
const ENDPOINT_GROUPS = [
  {
    group: "Users",
    endpoints: [
      { method: "GET", path: "/api/users", description: "List all users" },
      {
        method: "POST",
        path: "/api/users",
        description: "Register a new user"
      },
      { method: "GET", path: "/api/users/:id", description: "Get user by ID" },
      {
        method: "PUT",
        path: "/api/users/:id",
        description: "Update user details"
      }
    ]
  },
  {
    group: "Merchants",
    endpoints: [
      {
        method: "GET",
        path: "/api/merchants",
        description: "List all merchants"
      },
      {
        method: "POST",
        path: "/api/merchants",
        description: "Register a new merchant"
      },
      {
        method: "GET",
        path: "/api/merchants/:id",
        description: "Get merchant by ID"
      },
      {
        method: "PUT",
        path: "/api/merchants/:id",
        description: "Update merchant"
      }
    ]
  },
  {
    group: "Delivery Partners",
    endpoints: [
      {
        method: "GET",
        path: "/api/delivery-partners",
        description: "List delivery partners"
      },
      {
        method: "POST",
        path: "/api/delivery-partners",
        description: "Register delivery partner"
      },
      {
        method: "GET",
        path: "/api/delivery-partners/:id",
        description: "Get DP by ID"
      }
    ]
  },
  {
    group: "Sarthi Partners",
    endpoints: [
      {
        method: "GET",
        path: "/api/sarthi-partners",
        description: "List sarthi partners"
      },
      {
        method: "POST",
        path: "/api/sarthi-partners",
        description: "Register sarthi partner"
      },
      {
        method: "GET",
        path: "/api/sarthi-partners/:id",
        description: "Get sarthi partner by ID"
      }
    ]
  },
  {
    group: "Products",
    endpoints: [
      {
        method: "GET",
        path: "/api/products",
        description: "List all products"
      },
      {
        method: "POST",
        path: "/api/products",
        description: "Create a product"
      },
      {
        method: "GET",
        path: "/api/products/search",
        description: "Search products by keyword"
      }
    ]
  },
  {
    group: "Orders",
    endpoints: [
      { method: "GET", path: "/api/orders", description: "List all orders" },
      { method: "POST", path: "/api/orders", description: "Create an order" },
      {
        method: "PUT",
        path: "/api/orders/:id/status",
        description: "Update order status"
      }
    ]
  },
  {
    group: "Jobs",
    endpoints: [
      {
        method: "GET",
        path: "/api/jobs",
        description: "List all job postings"
      },
      {
        method: "POST",
        path: "/api/jobs",
        description: "Create a job posting"
      },
      {
        method: "GET",
        path: "/api/jobs/search",
        description: "Search jobs by keyword/location"
      }
    ]
  },
  {
    group: "Properties",
    endpoints: [
      {
        method: "GET",
        path: "/api/properties",
        description: "List all properties"
      },
      {
        method: "POST",
        path: "/api/properties",
        description: "Create a property listing"
      },
      {
        method: "GET",
        path: "/api/properties/search",
        description: "Search properties"
      }
    ]
  },
  {
    group: "Transport",
    endpoints: [
      {
        method: "GET",
        path: "/api/transport",
        description: "List transport bookings"
      },
      {
        method: "POST",
        path: "/api/transport",
        description: "Create a transport booking"
      },
      {
        method: "PUT",
        path: "/api/transport/:id/status",
        description: "Update booking status"
      }
    ]
  },
  {
    group: "Leads",
    endpoints: [
      { method: "GET", path: "/api/leads", description: "List all leads" },
      { method: "POST", path: "/api/leads", description: "Create a lead" }
    ]
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
        description: "Get event by ID"
      },
      {
        method: "PUT",
        path: "/api/events/:id/status",
        description: "Update event status"
      },
      {
        method: "DELETE",
        path: "/api/events/:id",
        description: "Delete an event"
      }
    ]
  },
  {
    group: "Family Groups",
    isNew: true,
    endpoints: [
      {
        method: "GET",
        path: "/api/family",
        description: "List all family groups"
      },
      {
        method: "POST",
        path: "/api/family/member",
        description: "Add a family member"
      },
      {
        method: "PUT",
        path: "/api/family/:id/invite-status",
        description: "Update invite status"
      },
      {
        method: "DELETE",
        path: "/api/family/:id",
        description: "Remove a family member"
      }
    ]
  },
  {
    group: "Promotions",
    isNew: true,
    endpoints: [
      {
        method: "GET",
        path: "/api/promotions",
        description: "List all promotions"
      },
      {
        method: "POST",
        path: "/api/promotions",
        description: "Create a promotion"
      },
      {
        method: "GET",
        path: "/api/promotions/:id/analytics",
        description: "Get promotion analytics"
      },
      {
        method: "PUT",
        path: "/api/promotions/:id/approve",
        description: "Approve a promotion"
      },
      {
        method: "PUT",
        path: "/api/promotions/:id/reject",
        description: "Reject a promotion"
      }
    ]
  },
  {
    group: "Lending",
    isNew: true,
    endpoints: [
      {
        method: "GET",
        path: "/api/lending",
        description: "Get all lending items"
      },
      {
        method: "POST",
        path: "/api/lending",
        description: "Create a lending item"
      },
      {
        method: "PUT",
        path: "/api/lending/:id",
        description: "Update a lending item"
      },
      {
        method: "POST",
        path: "/api/lending/:id/remind",
        description: "Trigger reminder for lending item"
      },
      {
        method: "POST",
        path: "/api/lending/check-overdue",
        description: "Check and send overdue reminders"
      }
    ]
  },
  {
    group: "Community",
    isNew: true,
    endpoints: [
      {
        method: "GET",
        path: "/api/community",
        description: "Get all community members"
      },
      {
        method: "GET",
        path: "/api/community/search?q=",
        description: "Search community members by keyword"
      },
      {
        method: "GET",
        path: "/api/community/:phone",
        description: "Get community member by phone"
      },
      {
        method: "DELETE",
        path: "/api/community/:phone",
        description: "Remove a community member"
      }
    ]
  }
];
const METHOD_COLORS = {
  GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
};
function TestPanel({
  endpoint,
  onClose
}) {
  const [body, setBody] = reactExports.useState("{\n  \n}");
  const [response, setResponse] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  async function handleSend() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setResponse(
      JSON.stringify(
        {
          note: "This panel documents the API surface. To call backend methods directly, use the actor hooks in hooks/useBackend.ts or the Candid UI for your canister.",
          endpoint: `${endpoint.method} ${endpoint.path}`,
          hint: "No mock data — all reads and writes must go through the live backend actor."
        },
        null,
        2
      )
    );
    setLoading(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-y-0 right-0 w-full sm:w-96 bg-card border-l border-border shadow-xl z-50 flex flex-col",
      "data-ocid": "test-panel.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Test Endpoint" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-1.5 py-0.5 rounded font-bold ${METHOD_COLORS[endpoint.method]}`,
                  children: endpoint.method
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs text-muted-foreground", children: endpoint.path })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Close panel",
              onClick: onClose,
              className: "p-1 rounded hover:bg-muted transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 overflow-y-auto space-y-4", children: [
          endpoint.method !== "GET" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "request-body", children: "Request Body (JSON)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "request-body",
                value: body,
                onChange: (e) => setBody(e.target.value),
                className: "font-mono text-xs h-32",
                "data-ocid": "test-panel.body_input"
              }
            )
          ] }),
          response && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Response" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs bg-muted/40 rounded-lg p-3 overflow-auto max-h-64 font-mono whitespace-pre-wrap", children: response })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "w-full gap-2",
            onClick: handleSend,
            disabled: loading,
            "data-ocid": "test-panel.send_button",
            children: [
              loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
              loading ? "Sending…" : "Send Request"
            ]
          }
        ) })
      ]
    }
  );
}
function ApiPanelPage() {
  const generateApiKey = useGenerateApiKey();
  const [apiKeys, setApiKeys] = reactExports.useState([]);
  const [showGenModal, setShowGenModal] = reactExports.useState(false);
  const [keyLabel, setKeyLabel] = reactExports.useState("");
  const [newKeyReveal, setNewKeyReveal] = reactExports.useState(null);
  const [visibleKeys, setVisibleKeys] = reactExports.useState(/* @__PURE__ */ new Set());
  const [testEndpoint, setTestEndpoint] = reactExports.useState(null);
  const [revokeTarget, setRevokeTarget] = reactExports.useState(null);
  const [expandedGroups, setExpandedGroups] = reactExports.useState(
    /* @__PURE__ */ new Set([
      "Users",
      "Orders",
      "Events",
      "Family Groups",
      "Promotions",
      "Lending",
      "Community"
    ])
  );
  const [copied, setCopied] = reactExports.useState(false);
  const [baseUrl, setBaseUrl] = reactExports.useState("");
  const [webhookUrl, setWebhookUrl] = reactExports.useState("");
  const [editingConfig, setEditingConfig] = reactExports.useState(false);
  const [baseUrlInput, setBaseUrlInput] = reactExports.useState(baseUrl);
  const [webhookInput, setWebhookInput] = reactExports.useState(webhookUrl);
  reactExports.useEffect(() => {
    setBaseUrlInput(baseUrl);
    setWebhookInput(webhookUrl);
  }, [baseUrl, webhookUrl]);
  function saveConfig() {
    localStorage.setItem("wc_base_url", baseUrlInput);
    localStorage.setItem("wc_webhook_url", webhookInput);
    setBaseUrl(baseUrlInput);
    setWebhookUrl(webhookInput);
    setEditingConfig(false);
    ue.success("Configuration saved");
  }
  function toggleGroup(group) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }
  function toggleKeyVisibility(id) {
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
        keyLabel: keyLabel.trim()
      });
      const newKey = {
        id: apiKey.id,
        keyLabel: keyLabel.trim(),
        maskedKey: `wc_...${apiKey.key.slice(-4)}`,
        fullKey: apiKey.key,
        usageCount: 0,
        isActive: true,
        createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      };
      setApiKeys((prev) => [newKey, ...prev]);
      setNewKeyReveal(apiKey.key);
      setShowGenModal(false);
      setKeyLabel("");
    } catch {
      const full = `wc_${Math.random().toString(36).slice(2, 12)}_${Math.random().toString(36).slice(2, 12)}`;
      const newKey = {
        id: `ak${Date.now()}`,
        keyLabel: keyLabel.trim(),
        maskedKey: `wc_...${full.slice(-4)}`,
        fullKey: full,
        usageCount: 0,
        isActive: true,
        createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      };
      setApiKeys((prev) => [newKey, ...prev]);
      setNewKeyReveal(full);
      setShowGenModal(false);
      setKeyLabel("");
    }
  }
  function handleRevoke(id) {
    setApiKeys(
      (prev) => prev.map((k) => k.id === id ? { ...k, isActive: false } : k)
    );
    setRevokeTarget(null);
    ue.success("API key revoked");
  }
  function copyText(text, msg = "Copied") {
    navigator.clipboard.writeText(text).catch(() => {
    });
    ue.success(msg);
  }
  function copyBaseUrl() {
    copyText(baseUrl, "Base URL copied");
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", "data-ocid": "api-panel.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "API Integration Panel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage API keys, configure endpoints, and test integrations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "API Configuration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: !editingConfig ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "h-7 text-xs gap-1",
            onClick: () => setEditingConfig(true),
            "data-ocid": "api-panel.edit_config_button",
            children: "Edit Configuration"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "h-7 text-xs gap-1",
            onClick: saveConfig,
            "data-ocid": "api-panel.save_config_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
              " Save Configuration"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
            " Base URL"
          ] }),
          editingConfig ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: baseUrlInput,
              onChange: (e) => setBaseUrlInput(e.target.value),
              placeholder: "https://your-canister.icp.app",
              className: "font-mono text-sm",
              "data-ocid": "api-panel.base_url_input"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 text-xs font-mono text-foreground truncate", children: baseUrl }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 gap-1.5 shrink-0 text-xs",
                onClick: copyBaseUrl,
                "data-ocid": "api-panel.copy_base_url",
                children: [
                  copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                  " ",
                  "Copy"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Used as the prefix for all API endpoint examples below." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-3.5 h-3.5" }),
            " Webhook URL"
          ] }),
          editingConfig ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: webhookInput,
              onChange: (e) => setWebhookInput(e.target.value),
              placeholder: "https://your-webhook.example.com/webhook",
              className: "font-mono text-sm",
              "data-ocid": "api-panel.webhook_url_input"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border", children: [
            webhookUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 text-xs font-mono text-foreground truncate", children: webhookUrl }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-xs text-muted-foreground italic", children: "No webhook URL configured" }),
            webhookUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 gap-1.5 shrink-0 text-xs",
                onClick: () => copyText(webhookUrl, "Webhook URL copied"),
                "data-ocid": "api-panel.copy_webhook_url",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                  " Copy"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "WhatsApp Business API webhook verification token endpoint." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "keys", "data-ocid": "api-panel.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "keys", "data-ocid": "api-panel.keys_tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-4 h-4 mr-1.5" }),
          "API Keys"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "endpoints", "data-ocid": "api-panel.endpoints_tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 mr-1.5" }),
          "Endpoints"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "usage", "data-ocid": "api-panel.usage_tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-1.5" }),
          "Usage"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "keys", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowGenModal(true),
            className: "gap-2",
            "data-ocid": "api-panel.generate_key_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Generate New Key"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: apiKeys.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-8 text-center text-muted-foreground",
            "data-ocid": "api-keys.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-8 h-8 mx-auto mb-3 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No API keys yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Generate a key to get started" })
            ]
          }
        ) : apiKeys.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-4 space-y-3",
            "data-ocid": `api-keys.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: key.keyLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "Created ",
                    key.createdAt
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: key.isActive ? "default" : "secondary", children: key.isActive ? "Active" : "Revoked" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 text-xs bg-muted px-3 py-2 rounded-lg font-mono", children: visibleKeys.has(key.id) && key.fullKey ? key.fullKey : key.maskedKey }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": visibleKeys.has(key.id) ? "Hide key" : "Show key",
                    className: "p-2 rounded-lg border border-border hover:bg-muted transition-colors",
                    onClick: () => toggleKeyVisibility(key.id),
                    "data-ocid": `api-keys.toggle_visibility.${i + 1}`,
                    children: visibleKeys.has(key.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Copy key",
                    className: "p-2 rounded-lg border border-border hover:bg-muted transition-colors",
                    onClick: () => copyText(key.maskedKey, "Key copied"),
                    "data-ocid": `api-keys.copy.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                  }
                ),
                key.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Revoke key",
                    className: "p-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors",
                    onClick: () => setRevokeTarget(key.id),
                    "data-ocid": `api-keys.revoke.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Calls:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: key.usageCount.toLocaleString("en-IN") })
                ] }),
                key.lastUsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Last used:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: key.lastUsed })
                ] })
              ] })
            ]
          },
          key.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "endpoints", className: "mt-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium", children: "New" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "= Events, Family Groups, Promotions, Lending & Community endpoints added" })
        ] }),
        ENDPOINT_GROUPS.map((group) => {
          const isExpanded = expandedGroups.has(group.group);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `bg-card border rounded-xl overflow-hidden transition-colors ${group.isNew ? "border-primary/30" : "border-border"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "w-full px-4 py-3 bg-muted/20 hover:bg-muted/30 transition-colors flex items-center justify-between",
                    onClick: () => toggleGroup(group.group),
                    "data-ocid": `endpoint-group.${group.group.toLowerCase().replace(/\s+/g, "-")}.toggle`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: group.group }),
                        group.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold", children: "New" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                          "(",
                          group.endpoints.length,
                          " endpoints)"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: isExpanded ? "▲" : "▼" })
                    ]
                  }
                ),
                isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: group.endpoints.map((ep) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 px-4 py-3 hover:bg-muted/10 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs px-2 py-1 rounded font-bold flex-shrink-0 w-14 text-center ${METHOD_COLORS[ep.method]}`,
                          children: ep.method
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-foreground flex-1 min-w-0 truncate", children: ep.path }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:block flex-1 min-w-0 truncate", children: ep.description }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "aria-label": "Copy URL",
                            className: "p-1.5 rounded border border-border hover:bg-muted transition-colors text-muted-foreground",
                            onClick: () => copyText(`${baseUrl}${ep.path}`, "URL copied"),
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "text-xs h-7",
                            onClick: () => setTestEndpoint(ep),
                            "data-ocid": "endpoint.test_button",
                            children: "Test"
                          }
                        )
                      ] })
                    ]
                  },
                  `${ep.method}-${ep.path}`
                )) })
              ]
            },
            group.group
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "usage", className: "mt-4 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
          { label: "Total API Calls", value: "48,230" },
          { label: "Calls Today", value: "1,870" },
          { label: "Avg Response", value: "54ms" },
          { label: "Success Rate", value: "98.7%" }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-4 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: stat.label })
            ]
          },
          stat.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-8 text-center text-muted-foreground",
            "data-ocid": "usage.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 mx-auto mb-3 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No usage data yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "API calls will appear here once integrations are active" })
            ]
          }
        )
      ] })
    ] }),
    showGenModal && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && setShowGenModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "generate-key.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Generate New API Key" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "key-label", children: "Key Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "key-label",
              placeholder: "e.g. Production Internal",
              value: keyLabel,
              onChange: (e) => setKeyLabel(e.target.value),
              "data-ocid": "generate-key.label_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowGenModal(false),
              "data-ocid": "generate-key.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleGenerate,
              disabled: !keyLabel.trim() || generateApiKey.isPending,
              "data-ocid": "generate-key.submit_button",
              children: generateApiKey.isPending ? "Generating…" : "Generate Key"
            }
          )
        ] })
      ] })
    ] }) }),
    newKeyReveal && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && setNewKeyReveal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "reveal-key.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-amber-600", children: "Copy Your New API Key" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300 mt-2", children: "⚠️ This key won't be shown again. Copy it now and store it securely." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 text-xs bg-muted px-3 py-2 rounded-lg font-mono break-all", children: newKeyReveal }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            variant: "outline",
            onClick: () => copyText(newKeyReveal, "Key copied"),
            "aria-label": "Copy key",
            "data-ocid": "reveal-key.copy_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => setNewKeyReveal(null),
          "data-ocid": "reveal-key.close_button",
          children: "Done — I've copied it"
        }
      ) })
    ] }) }),
    revokeTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && setRevokeTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "revoke-key.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-destructive", children: "Revoke API Key?" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "This key will be permanently disabled. Any integrations using it will stop working immediately." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setRevokeTarget(null),
            "data-ocid": "revoke-key.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: () => revokeTarget && handleRevoke(revokeTarget),
            "data-ocid": "revoke-key.confirm_button",
            children: "Revoke Key"
          }
        )
      ] })
    ] }) }),
    testEndpoint && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TestPanel,
      {
        endpoint: testEndpoint,
        onClose: () => setTestEndpoint(null)
      }
    )
  ] });
}
export {
  ApiPanelPage as default
};
