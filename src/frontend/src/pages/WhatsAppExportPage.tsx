import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCopy,
  FileJson,
  FileText,
  LayoutDashboard,
  MessageSquare,
  RefreshCw,
  Search,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  useExportWhatsAppScript,
  useGetAllMenuOptions,
  useListBotLogs,
} from "../hooks/useBackend";
import { useRegistryFlows } from "../hooks/useRegistryFlows";

const SETUP_STEPS = [
  { n: 1, text: "Download the JSON file using the button above." },
  { n: 2, text: "Open Meta Business Manager → WhatsApp → Flows." },
  { n: 3, text: 'Click "Create Flow" → select "Import JSON" option.' },
  {
    n: 4,
    text: "Upload the downloaded JSON. Review all flow nodes and connections.",
  },
  { n: 5, text: 'Publish each flow once reviewed by clicking "Publish".' },
  {
    n: 6,
    text: "Configure your Webhook URL in WhatsApp Config to point to your deployed app endpoint.",
  },
];

function syntaxHighlight(json: string): string {
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
    },
  );
}

export default function WhatsAppExportPage() {
  const { data: script, isFetching, refetch } = useExportWhatsAppScript();
  const {
    data: waLogs = [],
    refetch: refetchLogs,
    isFetching: logsFetching,
  } = useListBotLogs("whatsapp");
  const { data: menuOptionsData = [] } = useGetAllMenuOptions();
  const menuOptionCount = menuOptionsData.length;
  const [search, setSearch] = useState("");
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [flowsAccordionOpen, setFlowsAccordionOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const preRef = useRef<HTMLPreElement>(null);

  // All enabled flows from registry — reactive, re-renders when backend loads
  const { flows: registryFlows, refresh: refreshFlows } = useRegistryFlows();
  const registryFlowCount = registryFlows.length;

  const filteredLines = useMemo(() => {
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
    toast.success("Download started");
  }

  function handleExportTxt() {
    const lines = [
      "# WhatsApp Script Export",
      `# Generated: ${new Date().toLocaleString("en-IN")}`,
      "# Channel: WhatsApp",
      `# Flows: ${registryFlows.length}`,
      "",
      ...registryFlows.flatMap((f) => [
        "---",
        `Flow: ${f.name}`,
        `Trigger: ${f.triggerPayload}`,
        `Module: ${f.moduleKey ?? "general"}`,
        `Description: ${f.description}`,
        "",
      ]),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-script-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("WhatsApp Script exported as .txt");
  }

  async function handleCopy() {
    if (!script) return;
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  }

  const lineCount = script?.split("\n").length ?? 0;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileJson className="w-5 h-5 text-primary" />
            <h1 className="font-display text-xl font-bold text-foreground">
              WhatsApp Script Export
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Generate a ready-to-configure script for Meta Business Dashboard
          </p>
          <span className="inline-flex items-center text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded mt-1">
            Live menu source: {menuOptionCount} options loaded
          </span>
        </div>
        <Badge
          variant="outline"
          className={`text-xs gap-1.5 ${registryFlowCount === 0 ? "text-destructive border-destructive/40" : "text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"}`}
          data-ocid="whatsapp-export.flow_count_badge"
        >
          {registryFlowCount === 0
            ? "⚠ No flows — click Reload Flows"
            : `${registryFlowCount} flows loaded`}
        </Badge>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            refreshFlows();
            void refetch();
          }}
          data-ocid="whatsapp-export.reload_flows_button"
          className="gap-1.5 text-xs self-start sm:self-auto"
        >
          <Zap className="w-3.5 h-3.5" />
          Reload Flows
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          data-ocid="whatsapp-export.refresh_button"
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw
            className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportTxt}
          data-ocid="whatsapp-export.export_txt_button"
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Export .txt
        </Button>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleDownload}
          disabled={!script || isFetching}
          data-ocid="whatsapp-export.download_button"
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Export .txt
        </Button>
        <Button
          variant="outline"
          onClick={handleCopy}
          disabled={!script || isFetching}
          data-ocid="whatsapp-export.copy_button"
          className="gap-2"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardCopy className="w-4 h-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </div>

      {/* Dashboard Shortcut callout per role */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-primary/20">
          <LayoutDashboard className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm text-foreground">
            Dashboard Shortcuts — Add these to each role's main menu
          </span>
        </div>
        <div className="divide-y divide-primary/10">
          {[
            {
              role: "Merchant",
              emoji: "🏪",
              option: "8",
              command: "8",
              url: "https://localbazarkart.app/merchant-dashboard",
              botResponse:
                "🏪 My Dashboard — https://localbazarkart.app/merchant-dashboard",
            },
            {
              role: "Delivery Partner",
              emoji: "🚚",
              option: "6",
              command: "6",
              url: "https://localbazarkart.app/delivery-dashboard",
              botResponse:
                "🚚 My Dashboard — https://localbazarkart.app/delivery-dashboard",
            },
            {
              role: "Customer",
              emoji: "📊",
              option: "11",
              command: "11",
              url: "https://localbazarkart.app/customer-dashboard",
              botResponse:
                "📊 My Dashboard — https://localbazarkart.app/customer-dashboard",
            },
          ].map((item) => (
            <div
              key={item.role}
              className="px-5 py-3 flex items-start gap-4"
              data-ocid={`whatsapp-export.dashboard-shortcut.${item.role.toLowerCase().replace(" ", "-")}`}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {item.role} Menu
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">
                    💡 Dashboard link: type
                  </span>
                  <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-primary font-bold">
                    {item.command}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    to open your dashboard (option {item.option})
                  </span>
                </div>
                <p className="text-[11px] font-mono text-muted-foreground truncate">
                  → Bot response: {item.botResponse}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JSON Preview pane */}
      <div className="rounded-xl border border-border bg-[#0d1117] overflow-hidden shadow-md">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-[#161b22] border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="text-xs text-muted-foreground ml-1 font-mono">
              WhatsCart_Flows.json
              {!isFetching && lineCount > 0 && (
                <span className="ml-2 opacity-50">— {lineCount} lines</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#0d1117] border border-border/40 rounded-md px-2 py-1">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter lines..."
              data-ocid="whatsapp-export.search_input"
              className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-32 sm:w-48"
            />
          </div>
        </div>

        {/* Code area */}
        <div
          className="overflow-auto font-mono text-xs"
          style={{ height: "calc(100vh - 380px)", minHeight: "280px" }}
        >
          {isFetching ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
              <div className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-xs">Generating WhatsApp script...</p>
            </div>
          ) : script ? (
            <pre
              ref={preRef}
              className="p-4 leading-relaxed text-[#e6edf3] whitespace-pre-wrap break-all"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: used for JSON syntax highlighting only
              dangerouslySetInnerHTML={{
                __html: filteredLines
                  .map((line) => syntaxHighlight(line))
                  .join("\n"),
              }}
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground"
              data-ocid="whatsapp-export.empty_state"
            >
              <FileJson className="w-10 h-10 opacity-30" />
              <p className="text-sm">No script generated yet</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Generate
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Live Data Preview — WhatsApp messages */}
      <div
        className="rounded-xl border border-border bg-card overflow-hidden"
        data-ocid="whatsapp-export.live_logs"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              Live Data Preview — Recent WhatsApp Messages (Last 10)
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs h-7"
            onClick={() => refetchLogs()}
            disabled={logsFetching}
            data-ocid="whatsapp-export.live_logs_refresh"
          >
            <RefreshCw
              className={`w-3 h-3 ${logsFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
        {waLogs.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            No recent WhatsApp messages logged yet.
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {waLogs.map((log, idx) => (
              <div
                key={log.id || idx}
                className="px-5 py-3 flex items-start gap-3 hover:bg-muted/10 transition-colors"
                data-ocid={`whatsapp-export.live_log.${idx + 1}`}
              >
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                    log.status === "success"
                      ? "bg-green-100 text-green-700"
                      : log.status === "error" || log.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {log.status || "unknown"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-foreground truncate">
                      {log.messageText || "(empty)"}
                    </span>
                    {log.flowTriggered && (
                      <span className="text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded flex-shrink-0">
                        {log.flowTriggered}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">
                      {log.userId || "—"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {log.timestamp
                        ? new Date(log.timestamp).toLocaleString("en-IN")
                        : "—"}
                    </span>
                    {log.errorDetail && (
                      <span className="text-[10px] text-destructive truncate">
                        {log.errorDetail}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Data Context */}
      <div
        className="rounded-xl border border-border bg-card overflow-hidden"
        data-ocid="whatsapp-export.data_context"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm text-foreground">
            Data Context — What the script serves to users
          </span>
        </div>
        <div className="px-5 py-4">
          <p className="text-xs text-muted-foreground mb-3">
            Script uses this live data when users browse. Update via Data
            Explorer.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[{ label: "Active Flows", value: registryFlows.length }].map(
              ({ label, value }) => (
                <div key={label} className="bg-muted/30 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-foreground tabular-nums">
                    {value}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Flow Registry summary — all flows that will be exported */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <button
          type="button"
          onClick={() => setFlowsAccordionOpen(!flowsAccordionOpen)}
          data-ocid="whatsapp-export.flows_accordion"
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              All Flows in Export ({registryFlows.length})
            </span>
          </div>
          {flowsAccordionOpen ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {flowsAccordionOpen && (
          <div className="border-t border-border divide-y divide-border/60">
            {registryFlows.map((f, idx) => (
              <div
                key={f.id}
                className="flex items-start gap-3 px-5 py-2.5 hover:bg-muted/10 transition-colors"
                data-ocid={`whatsapp-export.flow.${idx + 1}`}
              >
                <span className="text-[10px] text-muted-foreground tabular-nums w-6 flex-shrink-0 pt-0.5">
                  {idx + 1}
                </span>
                <code className="text-[11px] font-mono bg-muted/60 px-2 py-0.5 rounded text-primary flex-shrink-0">
                  {f.triggerPayload}
                </code>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {f.name}
                  </p>
                  {f.moduleKey && (
                    <p className="text-[10px] text-muted-foreground">
                      {f.moduleKey}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {registryFlows.length === 0 && (
              <p className="px-5 py-4 text-sm text-muted-foreground">
                No flows registered yet. Create flows in the Flow Designer.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Setup Instructions accordion */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen(!accordionOpen)}
          data-ocid="whatsapp-export.setup_accordion"
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
        >
          <span className="font-semibold text-sm text-foreground">
            How to use this script in Meta Business Dashboard
          </span>
          {accordionOpen ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {accordionOpen && (
          <div className="px-5 pb-5 border-t border-border">
            <ol className="mt-4 space-y-3">
              {SETUP_STEPS.map((step) => (
                <li key={step.n} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                    {step.n}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-5 p-3 rounded-lg bg-muted/60 border border-border">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Note:</strong> After
                importing, make sure your webhook URL in{" "}
                <span className="text-primary font-mono">/whatsapp-config</span>{" "}
                points to your live canister endpoint before publishing flows.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
