import { a9 as useGetAllMenuOptions, r as reactExports, j as jsxRuntimeExports, p as ue, bL as useListBotLogs } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { u as useRegistryFlows } from "./useRegistryFlows-BarM70x9.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
import { F as FileText } from "./file-text-ZAufnVPm.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { F as FileJson } from "./file-json-Bc56XVYn.js";
import { L as LayoutDashboard } from "./layout-dashboard-C8a8ykvu.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
function parseFlowJsonForSMS(flowJson) {
  var _a, _b, _c;
  if (!flowJson) return { triggerKeywords: [], nodeCount: 0, firstLabel: "" };
  try {
    const parsed = JSON.parse(flowJson);
    const nodes = Array.isArray(parsed.blocks) ? parsed.blocks : Array.isArray(parsed.nodes) ? parsed.nodes : [];
    const nonStartNodes = nodes.filter(
      (n) => n.type !== "start" && n.type !== "end" && n.id !== "start" && n.id !== "end"
    );
    const firstLabel = typeof ((_a = nonStartNodes[0]) == null ? void 0 : _a.label) === "string" ? nonStartNodes[0].label : typeof ((_b = nonStartNodes[0]) == null ? void 0 : _b.data) === "object" && ((_c = nonStartNodes[0]) == null ? void 0 : _c.data) !== null ? String(
      nonStartNodes[0].data.label ?? ""
    ) : "";
    const kws = [];
    if (typeof parsed.triggerPayload === "string" && parsed.triggerPayload)
      kws.push(parsed.triggerPayload);
    if (Array.isArray(parsed.keywords)) {
      for (const k of parsed.keywords)
        if (typeof k === "string") kws.push(k);
    }
    return {
      triggerKeywords: kws,
      nodeCount: nonStartNodes.length,
      firstLabel
    };
  } catch {
    return { triggerKeywords: [], nodeCount: 0, firstLabel: "" };
  }
}
const STATUS_CLS = {
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700"
};
function SmsLiveLogsPanel() {
  const { data: logs = [], refetch, isFetching } = useListBotLogs("sms");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden",
      "data-ocid": "sms_script.live_logs",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Live Data Preview — Recent SMS Messages" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 text-xs h-7",
              onClick: () => refetch(),
              disabled: isFetching,
              "data-ocid": "sms_script.live_logs_refresh",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    className: `w-3 h-3 ${isFetching ? "animate-spin" : ""}`
                  }
                ),
                "Refresh"
              ]
            }
          )
        ] }),
        logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No recent SMS messages logged yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60", children: logs.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-3 flex items-start gap-3 hover:bg-muted/10 transition-colors",
            "data-ocid": `sms_script.live_log.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 pt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-semibold px-1.5 py-0.5 rounded ${STATUS_CLS[log.status] ?? "bg-muted text-muted-foreground"}`,
                  children: log.status || "unknown"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground truncate", children: log.messageText || "(empty)" }),
                  log.flowTriggered && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded flex-shrink-0", children: log.flowTriggered })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: log.userId || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: log.timestamp ? new Date(log.timestamp).toLocaleString("en-IN") : "—" }),
                  log.errorDetail && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-destructive truncate", children: log.errorDetail })
                ] })
              ] })
            ]
          },
          log.id || idx
        )) })
      ]
    }
  );
}
function SMSFlowCard({
  entry,
  idx,
  registryFlows
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const flow = registryFlows.find((f) => f.id === entry.flowId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden",
      "data-ocid": `sms_script.flow.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors",
            onClick: () => setExpanded((v) => !v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary", children: idx + 1 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: entry.flowName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-mono mt-0.5", children: [
                    "keyword: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: entry.trigger })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                (flow == null ? void 0 : flow.moduleKey) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: flow.moduleKey }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200",
                    children: "SMS"
                  }
                ),
                expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
              ] })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 space-y-2 border-t border-border/60 pt-3", children: [
          entry.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: entry.description }),
          entry.steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex gap-3 ${step.type === "sms_in" ? "justify-end" : "justify-start"}`,
              children: [
                step.type === "sms_out" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-2.5 h-2.5 text-emerald-600" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `max-w-[80%] px-3 py-2 rounded-xl text-xs ${step.type === "sms_in" ? "bg-blue-100 text-blue-900" : step.type === "system" ? "bg-muted/60 border border-border text-muted-foreground italic" : "bg-emerald-50 border border-emerald-200 text-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-0.5", children: step.type === "sms_out" ? "SMS Sent" : step.type === "sms_in" ? "SMS Received" : "System" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "break-words", children: step.message }),
                      step.expectedReply && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
                        "Expected reply:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: step.expectedReply })
                      ] })
                    ]
                  }
                ),
                step.type === "sms_in" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-2.5 h-2.5 text-blue-600" }) })
              ]
            },
            step.step
          ))
        ] })
      ]
    }
  );
}
function SMSScriptPage() {
  const { flows: registryFlows, loading: registryLoading } = useRegistryFlows();
  const { data: menuOptions = [] } = useGetAllMenuOptions();
  const menuOptionCount = menuOptions.length;
  const [script, setScript] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [copiedJSON, setCopiedJSON] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!registryLoading) {
      if (registryFlows.length > 0) {
        const mapped = registryFlows.map((f) => {
          const { triggerKeywords, nodeCount, firstLabel } = parseFlowJsonForSMS(f.flowJson);
          const trigger = triggerKeywords[0] ?? f.triggerPayload;
          const sampleMsg = firstLabel || f.description.slice(0, 80);
          return {
            flowId: f.id,
            flowName: f.name,
            trigger,
            description: f.description,
            steps: [
              {
                step: 1,
                message: `SMS IN: "${trigger}" or numbered option`,
                type: "sms_in"
              },
              {
                step: 2,
                message: `LocalBazar Kart: ${f.name} started. ${sampleMsg}`,
                type: "sms_out"
              },
              ...nodeCount > 0 ? [
                {
                  step: 3,
                  message: "Reply with: 1) Yes  2) No  3) Help",
                  type: "sms_out",
                  expectedReply: "1, 2, or 3"
                }
              ] : [
                {
                  step: 3,
                  message: "Reply with: 1) Continue  2) Back  3) Help",
                  type: "sms_out",
                  expectedReply: "1, 2, or 3"
                }
              ]
            ]
          };
        });
        setScript({
          generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          totalFlows: mapped.length,
          flows: mapped
        });
        setError(null);
      } else {
        setError("No flows loaded from registry. Try reloading.");
      }
      setLoading(false);
    }
  }, [registryFlows, registryLoading]);
  const filteredFlows = (script == null ? void 0 : script.flows.filter(
    (f) => !search || f.flowName.toLowerCase().includes(search.toLowerCase()) || f.trigger.toLowerCase().includes(search.toLowerCase())
  )) ?? [];
  function handleCopyJSON() {
    if (!script) return;
    navigator.clipboard.writeText(JSON.stringify(script, null, 2)).then(() => {
      setCopiedJSON(true);
      ue.success("SMS Script JSON copied");
      setTimeout(() => setCopiedJSON(false), 2e3);
    });
  }
  function handleDownload() {
    if (!script) return;
    const lines = [
      "# SMS Script Export",
      `# Generated: ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}`,
      "# Channel: SMS",
      `# Total Flows: ${script.totalFlows}`,
      "",
      ...script.flows.flatMap((f) => [
        "---",
        `Flow: ${f.flowName}`,
        `Keyword: ${f.trigger}`,
        `Description: ${f.description}`,
        ...f.steps.map(
          (s) => `  [${s.type}] ${s.message}${s.expectedReply ? ` (reply: ${s.expectedReply})` : ""}`
        ),
        ""
      ])
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sms-script-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("SMS Script downloaded as .txt");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-6 max-w-4xl animate-fade-in",
      "data-ocid": "sms_script.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary" }),
              "SMS Script"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "All flows and messages sent via SMS — keywords that trigger each flow and the exact messages the system sends at every step" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded mt-1", children: [
              "Live menu source: ",
              menuOptionCount,
              " options loaded"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded mt-1 ml-2", children: [
              registryFlows.length,
              " flows loaded from live registry"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleCopyJSON,
                disabled: !script,
                "data-ocid": "sms_script.copy_button",
                className: "gap-1.5 text-xs",
                children: [
                  copiedJSON ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-emerald-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                  copiedJSON ? "Copied!" : "Copy JSON"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleDownload,
                disabled: !script,
                "data-ocid": "sms_script.download_button",
                className: "gap-1.5 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
                  "Export .txt"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs ${((script == null ? void 0 : script.totalFlows) ?? 0) === 0 ? "text-destructive border-destructive/40" : "text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"}`,
                "data-ocid": "sms_script.flow_count_badge",
                children: ((script == null ? void 0 : script.totalFlows) ?? registryFlows.length) === 0 ? "⚠ No flows — click Reload" : `${(script == null ? void 0 : script.totalFlows) ?? registryFlows.length} flows loaded`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => {
                  setLoading(true);
                  setError(null);
                  setScript(null);
                  setTimeout(() => setLoading(false), 300);
                  ue.success("Reloaded flows from registry");
                },
                "data-ocid": "sms_script.reload_flows_button",
                className: "gap-1.5 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                  "Reload Flows"
                ]
              }
            )
          ] })
        ] }),
        script && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
          {
            label: "Total Flows",
            value: String(script.totalFlows || filteredFlows.length),
            icon: FileJson
          },
          {
            label: "Total Steps",
            value: String(
              script.flows.reduce((acc, f) => acc + f.steps.length, 0)
            ),
            icon: Zap
          },
          {
            label: "Generated",
            value: new Date(script.generatedAt).toLocaleDateString("en-IN"),
            icon: CircleCheckBig
          },
          { label: "Channel", value: "SMS", icon: Phone }
        ].map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl px-4 py-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-semibold", children: label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: value })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/30 rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Dashboard Shortcuts — per role (SMS)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-primary/10", children: [
            {
              role: "Merchant",
              emoji: "🏪",
              optionNum: 8,
              keyword: "DASHBOARD",
              url: "https://localbazarkart.app/merchant-dashboard",
              smsReply: "LocalBazar: Your merchant dashboard - https://localbazarkart.app/merchant-dashboard"
            },
            {
              role: "Delivery Partner",
              emoji: "🚚",
              optionNum: 6,
              keyword: "DASHBOARD",
              url: "https://localbazarkart.app/delivery-dashboard",
              smsReply: "LocalBazar: Your delivery dashboard - https://localbazarkart.app/delivery-dashboard"
            },
            {
              role: "Customer",
              emoji: "📊",
              optionNum: 11,
              keyword: "DASHBOARD",
              url: "https://localbazarkart.app/customer-dashboard",
              smsReply: "LocalBazar: Your customer dashboard - https://localbazarkart.app/customer-dashboard"
            }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-4 px-4 py-3",
              "data-ocid": `sms_script.dashboard_shortcut.${item.role.toLowerCase().replace(" ", "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm mt-0.5", children: item.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
                    item.role,
                    " — Option ",
                    item.optionNum
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
                    "💡 Dashboard link: reply",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-muted px-1.5 py-0.5 rounded text-primary font-bold", children: item.keyword }),
                    " ",
                    "or type",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-muted px-1.5 py-0.5 rounded text-primary font-bold", children: item.optionNum })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-mono text-muted-foreground mt-0.5 truncate", children: [
                    "→ SMS response: ",
                    item.smsReply
                  ] })
                ] })
              ]
            },
            item.role
          )) })
        ] }),
        script && script.flows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "What fires for each keyword" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60", children: script.flows.map((f) => {
            const firstOut = f.steps.find((s) => s.type === "sms_out");
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-4 px-4 py-3 hover:bg-muted/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-[11px] font-mono bg-muted/60 px-2 py-1 rounded text-primary flex-shrink-0 mt-0.5", children: f.trigger }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: f.flowName }),
                    firstOut && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
                      "→ ",
                      firstOut.message
                    ] })
                  ] })
                ]
              },
              f.flowId
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search flows…",
              className: "flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "sms_script.search_input"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setSearch(""),
              className: "text-xs",
              children: "Clear"
            }
          )
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "sms_script.loading_state", children: Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)
        )) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center",
            "data-ocid": "sms_script.error_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm", children: error })
          }
        ) : filteredFlows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center",
            "data-ocid": "sms_script.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-10 h-10 text-muted-foreground/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: search ? `No flows match "${search}"` : "No SMS flows found" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "sms_script.list", children: filteredFlows.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SMSFlowCard,
          {
            entry,
            idx,
            registryFlows
          },
          entry.flowId
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SmsLiveLogsPanel, {})
      ]
    }
  );
}
export {
  SMSScriptPage as default
};
