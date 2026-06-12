import { bK as useExportWhatsAppScript, bL as useListBotLogs, a9 as useGetAllMenuOptions, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { u as useRegistryFlows } from "./useRegistryFlows-BarM70x9.js";
import { F as FileJson } from "./file-json-Bc56XVYn.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { F as FileText } from "./file-text-ZAufnVPm.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as ClipboardCopy } from "./clipboard-copy-C_TqIbk0.js";
import { L as LayoutDashboard } from "./layout-dashboard-C8a8ykvu.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
const SETUP_STEPS = [
  { n: 1, text: "Download the JSON file using the button above." },
  { n: 2, text: "Open Meta Business Manager → WhatsApp → Flows." },
  { n: 3, text: 'Click "Create Flow" → select "Import JSON" option.' },
  {
    n: 4,
    text: "Upload the downloaded JSON. Review all flow nodes and connections."
  },
  { n: 5, text: 'Publish each flow once reviewed by clicking "Publish".' },
  {
    n: 6,
    text: "Configure your Webhook URL in WhatsApp Config to point to your deployed app endpoint."
  }
];
function syntaxHighlight(json) {
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          return `<span class="text-blue-400">${match}</span>`;
        }
        return `<span class="text-yellow-300">${match}</span>`;
      }
      if (/true|false/.test(match)) {
        return `<span class="text-green-400">${match}</span>`;
      }
      if (/null/.test(match)) {
        return `<span class="text-red-400">${match}</span>`;
      }
      return `<span class="text-orange-300">${match}</span>`;
    }
  );
}
function WhatsAppExportPage() {
  const { data: script, isFetching, refetch } = useExportWhatsAppScript();
  const {
    data: waLogs = [],
    refetch: refetchLogs,
    isFetching: logsFetching
  } = useListBotLogs("whatsapp");
  const { data: menuOptionsData = [] } = useGetAllMenuOptions();
  const menuOptionCount = menuOptionsData.length;
  const [search, setSearch] = reactExports.useState("");
  const [accordionOpen, setAccordionOpen] = reactExports.useState(false);
  const [flowsAccordionOpen, setFlowsAccordionOpen] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const preRef = reactExports.useRef(null);
  const { flows: registryFlows, refresh: refreshFlows } = useRegistryFlows();
  const registryFlowCount = registryFlows.length;
  const filteredLines = reactExports.useMemo(() => {
    if (!script) return [];
    const lines = script.split("\n");
    if (!search.trim()) return lines;
    return lines.filter((l) => l.toLowerCase().includes(search.toLowerCase()));
  }, [script, search]);
  function handleDownload() {
    if (!script) return;
    const blob = new Blob([script], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `WhatsCart_Flows_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("Download started");
  }
  function handleExportTxt() {
    const lines = [
      "# WhatsApp Script Export",
      `# Generated: ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}`,
      "# Channel: WhatsApp",
      `# Flows: ${registryFlows.length}`,
      "",
      ...registryFlows.flatMap((f) => [
        "---",
        `Flow: ${f.name}`,
        `Trigger: ${f.triggerPayload}`,
        `Module: ${f.moduleKey ?? "general"}`,
        `Description: ${f.description}`,
        ""
      ])
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-script-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("WhatsApp Script exported as .txt");
  }
  async function handleCopy() {
    if (!script) return;
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      ue.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 3e3);
    } catch {
      ue.error("Failed to copy to clipboard");
    }
  }
  const lineCount = (script == null ? void 0 : script.split("\n").length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "WhatsApp Script Export" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Generate a ready-to-configure script for Meta Business Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded mt-1", children: [
          "Live menu source: ",
          menuOptionCount,
          " options loaded"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: `text-xs gap-1.5 ${registryFlowCount === 0 ? "text-destructive border-destructive/40" : "text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"}`,
          "data-ocid": "whatsapp-export.flow_count_badge",
          children: registryFlowCount === 0 ? "⚠ No flows — click Reload Flows" : `${registryFlowCount} flows loaded`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => {
            refreshFlows();
            void refetch();
          },
          "data-ocid": "whatsapp-export.reload_flows_button",
          className: "gap-1.5 text-xs self-start sm:self-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
            "Reload Flows"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => refetch(),
          disabled: isFetching,
          "data-ocid": "whatsapp-export.refresh_button",
          className: "gap-2 self-start sm:self-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `w-4 h-4 ${isFetching ? "animate-spin" : ""}`
              }
            ),
            "Refresh"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleExportTxt,
          "data-ocid": "whatsapp-export.export_txt_button",
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
            "Export .txt"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleDownload,
          disabled: !script || isFetching,
          "data-ocid": "whatsapp-export.download_button",
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
            "Export .txt"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: handleCopy,
          disabled: !script || isFetching,
          "data-ocid": "whatsapp-export.copy_button",
          className: "gap-2",
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-green-500" }),
            "Copied!"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "w-4 h-4" }),
            "Copy to Clipboard"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/30 bg-primary/5 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-5 py-3 border-b border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Dashboard Shortcuts — Add these to each role's main menu" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-primary/10", children: [
        {
          role: "Merchant",
          emoji: "🏪",
          option: "8",
          command: "8",
          url: "https://localbazarkart.app/merchant-dashboard",
          botResponse: "🏪 My Dashboard — https://localbazarkart.app/merchant-dashboard"
        },
        {
          role: "Delivery Partner",
          emoji: "🚚",
          option: "6",
          command: "6",
          url: "https://localbazarkart.app/delivery-dashboard",
          botResponse: "🚚 My Dashboard — https://localbazarkart.app/delivery-dashboard"
        },
        {
          role: "Customer",
          emoji: "📊",
          option: "11",
          command: "11",
          url: "https://localbazarkart.app/customer-dashboard",
          botResponse: "📊 My Dashboard — https://localbazarkart.app/customer-dashboard"
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 py-3 flex items-start gap-4",
          "data-ocid": `whatsapp-export.dashboard-shortcut.${item.role.toLowerCase().replace(" ", "-")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm", children: item.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                item.role,
                " Menu"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "💡 Dashboard link: type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono bg-muted px-2 py-0.5 rounded text-primary font-bold", children: item.command }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "to open your dashboard (option ",
                  item.option,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-mono text-muted-foreground truncate", children: [
                "→ Bot response: ",
                item.botResponse
              ] })
            ] })
          ]
        },
        item.role
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-[#0d1117] overflow-hidden shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-4 py-2 bg-[#161b22] border-b border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-destructive/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-green-500/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1 font-mono", children: [
            "WhatsCart_Flows.json",
            !isFetching && lineCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 opacity-50", children: [
              "— ",
              lineCount,
              " lines"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-[#0d1117] border border-border/40 rounded-md px-2 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Filter lines...",
              "data-ocid": "whatsapp-export.search_input",
              className: "bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-32 sm:w-48"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "overflow-auto font-mono text-xs",
          style: { height: "calc(100vh - 380px)", minHeight: "280px" },
          children: isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Generating WhatsApp script..." })
          ] }) : script ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "pre",
            {
              ref: preRef,
              className: "p-4 leading-relaxed text-[#e6edf3] whitespace-pre-wrap break-all",
              dangerouslySetInnerHTML: {
                __html: filteredLines.map((line) => syntaxHighlight(line)).join("\n")
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground",
              "data-ocid": "whatsapp-export.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "w-10 h-10 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No script generated yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => refetch(),
                    className: "gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                      "Generate"
                    ]
                  }
                )
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border bg-card overflow-hidden",
        "data-ocid": "whatsapp-export.live_logs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Live Data Preview — Recent WhatsApp Messages (Last 10)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-xs h-7",
                onClick: () => refetchLogs(),
                disabled: logsFetching,
                "data-ocid": "whatsapp-export.live_logs_refresh",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-3 h-3 ${logsFetching ? "animate-spin" : ""}`
                    }
                  ),
                  "Refresh"
                ]
              }
            )
          ] }),
          waLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-8 text-center text-sm text-muted-foreground", children: "No recent WhatsApp messages logged yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60", children: waLogs.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-5 py-3 flex items-start gap-3 hover:bg-muted/10 transition-colors",
              "data-ocid": `whatsapp-export.live_log.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${log.status === "success" ? "bg-green-100 text-green-700" : log.status === "error" || log.status === "failed" ? "bg-red-100 text-red-700" : "bg-muted text-muted-foreground"}`,
                    children: log.status || "unknown"
                  }
                ),
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
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border bg-card overflow-hidden",
        "data-ocid": "whatsapp-export.data_context",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Data Context — What the script serves to users" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Script uses this live data when users browse. Update via Data Explorer." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [{ label: "Active Flows", value: registryFlows.length }].map(
              ({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground tabular-nums", children: value })
              ] }, label)
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setFlowsAccordionOpen(!flowsAccordionOpen),
          "data-ocid": "whatsapp-export.flows_accordion",
          className: "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm text-foreground", children: [
                "All Flows in Export (",
                registryFlows.length,
                ")"
              ] })
            ] }),
            flowsAccordionOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      flowsAccordionOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border divide-y divide-border/60", children: [
        registryFlows.map((f, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 px-5 py-2.5 hover:bg-muted/10 transition-colors",
            "data-ocid": `whatsapp-export.flow.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground tabular-nums w-6 flex-shrink-0 pt-0.5", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-[11px] font-mono bg-muted/60 px-2 py-0.5 rounded text-primary flex-shrink-0", children: f.triggerPayload }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: f.name }),
                f.moduleKey && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: f.moduleKey })
              ] })
            ]
          },
          f.id
        )),
        registryFlows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 py-4 text-sm text-muted-foreground", children: "No flows registered yet. Create flows in the Flow Designer." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setAccordionOpen(!accordionOpen),
          "data-ocid": "whatsapp-export.setup_accordion",
          className: "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "How to use this script in Meta Business Dashboard" }),
            accordionOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      accordionOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-4 space-y-3", children: SETUP_STEPS.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5", children: step.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.text })
        ] }, step.n)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 p-3 rounded-lg bg-muted/60 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Note:" }),
          " After importing, make sure your webhook URL in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono", children: "/whatsapp-config" }),
          " ",
          "points to your live canister endpoint before publishing flows."
        ] }) })
      ] })
    ] })
  ] });
}
export {
  WhatsAppExportPage as default
};
