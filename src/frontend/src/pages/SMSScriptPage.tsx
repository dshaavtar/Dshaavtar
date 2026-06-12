import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  FileJson,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Phone,
  RefreshCw,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetAllMenuOptions, useListBotLogs } from "../hooks/useBackend";
import { useRegistryFlows } from "../hooks/useRegistryFlows";
import type { FlowDefinition } from "../lib/flowRegistry";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SMSFlowStep {
  step: number;
  message: string;
  type: "sms_out" | "sms_in" | "system";
  expectedReply?: string;
}

interface SMSFlowEntry {
  flowId: string;
  flowName: string;
  trigger: string;
  description: string;
  steps: SMSFlowStep[];
}

interface SMSScript {
  generatedAt: string;
  totalFlows: number;
  flows: SMSFlowEntry[];
}

// ─── Build local SMS script from registry (fallback) ─────────────────────────

/** Extract node labels from flowJson for display. */
function parseFlowJsonForSMS(flowJson: string | undefined): {
  triggerKeywords: string[];
  nodeCount: number;
  firstLabel: string;
} {
  if (!flowJson) return { triggerKeywords: [], nodeCount: 0, firstLabel: "" };
  try {
    const parsed = JSON.parse(flowJson) as Record<string, unknown>;
    const nodes = Array.isArray(parsed.blocks)
      ? (parsed.blocks as Array<Record<string, unknown>>)
      : Array.isArray(parsed.nodes)
        ? (parsed.nodes as Array<Record<string, unknown>>)
        : [];
    const nonStartNodes = nodes.filter(
      (n) =>
        n.type !== "start" &&
        n.type !== "end" &&
        n.id !== "start" &&
        n.id !== "end",
    );
    const firstLabel =
      typeof nonStartNodes[0]?.label === "string"
        ? nonStartNodes[0].label
        : typeof nonStartNodes[0]?.data === "object" &&
            nonStartNodes[0]?.data !== null
          ? String(
              (nonStartNodes[0].data as Record<string, unknown>).label ?? "",
            )
          : "";
    const kws: string[] = [];
    if (typeof parsed.triggerPayload === "string" && parsed.triggerPayload)
      kws.push(parsed.triggerPayload);
    if (Array.isArray(parsed.keywords))
      for (const k of parsed.keywords as unknown[])
        if (typeof k === "string") kws.push(k);
    return {
      triggerKeywords: kws,
      nodeCount: nonStartNodes.length,
      firstLabel,
    };
  } catch {
    return { triggerKeywords: [], nodeCount: 0, firstLabel: "" };
  }
}

// ─── Live Logs Panel ────────────────────────────────────────────────────────────────

const STATUS_CLS: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
};

function SmsLiveLogsPanel() {
  const { data: logs = [], refetch, isFetching } = useListBotLogs("sms");
  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-ocid="sms_script.live_logs"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">
            Live Data Preview — Recent SMS Messages
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs h-7"
          onClick={() => refetch()}
          disabled={isFetching}
          data-ocid="sms_script.live_logs_refresh"
        >
          <RefreshCw
            className={`w-3 h-3 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
      {logs.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
          No recent SMS messages logged yet.
        </div>
      ) : (
        <div className="divide-y divide-border/60">
          {logs.map((log, idx) => (
            <div
              key={log.id || idx}
              className="px-4 py-3 flex items-start gap-3 hover:bg-muted/10 transition-colors"
              data-ocid={`sms_script.live_log.${idx + 1}`}
            >
              <div className="flex-shrink-0 pt-0.5">
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${STATUS_CLS[log.status] ?? "bg-muted text-muted-foreground"}`}
                >
                  {log.status || "unknown"}
                </span>
              </div>
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
  );
}

// ─── SMS Flow Card ────────────────────────────────────────────────────────────

function SMSFlowCard({
  entry,
  idx,
  registryFlows,
}: {
  entry: SMSFlowEntry;
  idx: number;
  registryFlows: FlowDefinition[];
}) {
  const [expanded, setExpanded] = useState(false);
  const flow = registryFlows.find((f) => f.id === entry.flowId);

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-ocid={`sms_script.flow.${idx + 1}`}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-primary">
              {idx + 1}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">
              {entry.flowName}
            </p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
              keyword: <span className="text-primary">{entry.trigger}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {flow?.moduleKey && (
            <Badge variant="outline" className="text-[10px]">
              {flow.moduleKey}
            </Badge>
          )}
          <Badge
            variant="outline"
            className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            SMS
          </Badge>
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-border/60 pt-3">
          {entry.description && (
            <p className="text-xs text-muted-foreground italic">
              {entry.description}
            </p>
          )}
          {entry.steps.map((step) => (
            <div
              key={step.step}
              className={`flex gap-3 ${step.type === "sms_in" ? "justify-end" : "justify-start"}`}
            >
              {step.type === "sms_out" && (
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-2.5 h-2.5 text-emerald-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${
                  step.type === "sms_in"
                    ? "bg-blue-100 text-blue-900"
                    : step.type === "system"
                      ? "bg-muted/60 border border-border text-muted-foreground italic"
                      : "bg-emerald-50 border border-emerald-200 text-foreground"
                }`}
              >
                <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-0.5">
                  {step.type === "sms_out"
                    ? "SMS Sent"
                    : step.type === "sms_in"
                      ? "SMS Received"
                      : "System"}
                </p>
                <p className="break-words">{step.message}</p>
                {step.expectedReply && (
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Expected reply:{" "}
                    <span className="font-mono font-medium">
                      {step.expectedReply}
                    </span>
                  </p>
                )}
              </div>
              {step.type === "sms_in" && (
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-2.5 h-2.5 text-blue-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SMSScriptPage() {
  // Reactive registry — re-renders when backend loads flows
  const { flows: registryFlows, loading: registryLoading } = useRegistryFlows();
  const { data: menuOptions = [] } = useGetAllMenuOptions();
  const menuOptionCount = menuOptions.length;
  const [script, setScript] = useState<SMSScript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [copiedJSON, setCopiedJSON] = useState(false);

  // Build script from live registry flows only — no fallback
  useEffect(() => {
    if (!registryLoading) {
      if (registryFlows.length > 0) {
        const mapped: SMSFlowEntry[] = registryFlows.map((f) => {
          const { triggerKeywords, nodeCount, firstLabel } =
            parseFlowJsonForSMS(f.flowJson);
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
                type: "sms_in" as const,
              },
              {
                step: 2,
                message: `LocalBazar Kart: ${f.name} started. ${sampleMsg}`,
                type: "sms_out" as const,
              },
              ...(nodeCount > 0
                ? [
                    {
                      step: 3,
                      message: "Reply with: 1) Yes  2) No  3) Help",
                      type: "sms_out" as const,
                      expectedReply: "1, 2, or 3",
                    },
                  ]
                : [
                    {
                      step: 3,
                      message: "Reply with: 1) Continue  2) Back  3) Help",
                      type: "sms_out" as const,
                      expectedReply: "1, 2, or 3",
                    },
                  ]),
            ],
          };
        });
        setScript({
          generatedAt: new Date().toISOString(),
          totalFlows: mapped.length,
          flows: mapped,
        });
        setError(null);
      } else {
        setError("No flows loaded from registry. Try reloading.");
      }
      setLoading(false);
    }
  }, [registryFlows, registryLoading]);

  const filteredFlows =
    script?.flows.filter(
      (f) =>
        !search ||
        f.flowName.toLowerCase().includes(search.toLowerCase()) ||
        f.trigger.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  function handleCopyJSON() {
    if (!script) return;
    navigator.clipboard.writeText(JSON.stringify(script, null, 2)).then(() => {
      setCopiedJSON(true);
      toast.success("SMS Script JSON copied");
      setTimeout(() => setCopiedJSON(false), 2000);
    });
  }

  function handleDownload() {
    if (!script) return;
    const lines: string[] = [
      "# SMS Script Export",
      `# Generated: ${new Date().toLocaleString("en-IN")}`,
      "# Channel: SMS",
      `# Total Flows: ${script.totalFlows}`,
      "",
      ...script.flows.flatMap((f) => [
        "---",
        `Flow: ${f.flowName}`,
        `Keyword: ${f.trigger}`,
        `Description: ${f.description}`,
        ...f.steps.map(
          (s) =>
            `  [${s.type}] ${s.message}${s.expectedReply ? ` (reply: ${s.expectedReply})` : ""}`,
        ),
        "",
      ]),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sms-script-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("SMS Script downloaded as .txt");
  }

  return (
    <div
      className="space-y-6 max-w-4xl animate-fade-in"
      data-ocid="sms_script.page"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            SMS Script
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            All flows and messages sent via SMS — keywords that trigger each
            flow and the exact messages the system sends at every step
          </p>
          <span className="inline-flex items-center text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded mt-1">
            Live menu source: {menuOptionCount} options loaded
          </span>
          <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded mt-1 ml-2">
            {registryFlows.length} flows loaded from live registry
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyJSON}
            disabled={!script}
            data-ocid="sms_script.copy_button"
            className="gap-1.5 text-xs"
          >
            {copiedJSON ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copiedJSON ? "Copied!" : "Copy JSON"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={!script}
            data-ocid="sms_script.download_button"
            className="gap-1.5 text-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            Export .txt
          </Button>
          <Badge
            variant="outline"
            className={`text-xs ${(script?.totalFlows ?? 0) === 0 ? "text-destructive border-destructive/40" : "text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"}`}
            data-ocid="sms_script.flow_count_badge"
          >
            {(script?.totalFlows ?? registryFlows.length) === 0
              ? "⚠ No flows — click Reload"
              : `${script?.totalFlows ?? registryFlows.length} flows loaded`}
          </Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true);
              setError(null);
              setScript(null);
              // The useEffect above will rebuild from registryFlows
              setTimeout(() => setLoading(false), 300);
              toast.success("Reloaded flows from registry");
            }}
            data-ocid="sms_script.reload_flows_button"
            className="gap-1.5 text-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            Reload Flows
          </Button>
        </div>
      </div>

      {/* Summary */}
      {script && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Total Flows",
              value: String(script.totalFlows || filteredFlows.length),
              icon: FileJson,
            },
            {
              label: "Total Steps",
              value: String(
                script.flows.reduce((acc, f) => acc + f.steps.length, 0),
              ),
              icon: Zap,
            },
            {
              label: "Generated",
              value: new Date(script.generatedAt).toLocaleDateString("en-IN"),
              icon: CheckCircle,
            },
            { label: "Channel", value: "SMS", icon: Phone },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-primary" />
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">
                  {label}
                </p>
              </div>
              <p className="text-lg font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Dashboard Shortcut section */}
      <div className="bg-primary/5 border border-primary/30 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/20">
          <LayoutDashboard className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">
            Dashboard Shortcuts — per role (SMS)
          </h3>
        </div>
        <div className="divide-y divide-primary/10">
          {[
            {
              role: "Merchant",
              emoji: "🏪",
              optionNum: 8,
              keyword: "DASHBOARD",
              url: "https://localbazarkart.app/merchant-dashboard",
              smsReply:
                "LocalBazar: Your merchant dashboard - https://localbazarkart.app/merchant-dashboard",
            },
            {
              role: "Delivery Partner",
              emoji: "🚚",
              optionNum: 6,
              keyword: "DASHBOARD",
              url: "https://localbazarkart.app/delivery-dashboard",
              smsReply:
                "LocalBazar: Your delivery dashboard - https://localbazarkart.app/delivery-dashboard",
            },
            {
              role: "Customer",
              emoji: "📊",
              optionNum: 11,
              keyword: "DASHBOARD",
              url: "https://localbazarkart.app/customer-dashboard",
              smsReply:
                "LocalBazar: Your customer dashboard - https://localbazarkart.app/customer-dashboard",
            },
          ].map((item) => (
            <div
              key={item.role}
              className="flex items-start gap-4 px-4 py-3"
              data-ocid={`sms_script.dashboard_shortcut.${item.role.toLowerCase().replace(" ", "-")}`}
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  {item.role} — Option {item.optionNum}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  💡 Dashboard link: reply{" "}
                  <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-primary font-bold">
                    {item.keyword}
                  </code>{" "}
                  or type{" "}
                  <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-primary font-bold">
                    {item.optionNum}
                  </code>
                </p>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5 truncate">
                  → SMS response: {item.smsReply}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyword → first message */}
      {script && script.flows.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">
              What fires for each keyword
            </h3>
          </div>
          <div className="divide-y divide-border/60">
            {script.flows.map((f) => {
              const firstOut = f.steps.find((s) => s.type === "sms_out");
              return (
                <div
                  key={f.flowId}
                  className="flex items-start gap-4 px-4 py-3 hover:bg-muted/10 transition-colors"
                >
                  <code className="text-[11px] font-mono bg-muted/60 px-2 py-1 rounded text-primary flex-shrink-0 mt-0.5">
                    {f.trigger}
                  </code>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">
                      {f.flowName}
                    </p>
                    {firstOut && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        → {firstOut.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search flows…"
          className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          data-ocid="sms_script.search_input"
        />
        {search && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearch("")}
            className="text-xs"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Flow list */}
      {loading ? (
        <div className="space-y-3" data-ocid="sms_script.loading_state">
          {Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div
          className="flex flex-col items-center gap-3 py-16 text-center"
          data-ocid="sms_script.error_state"
        >
          <p className="text-destructive text-sm">{error}</p>
        </div>
      ) : filteredFlows.length === 0 ? (
        <div
          className="flex flex-col items-center gap-3 py-16 text-center"
          data-ocid="sms_script.empty_state"
        >
          <Phone className="w-10 h-10 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            {search ? `No flows match "${search}"` : "No SMS flows found"}
          </p>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="sms_script.list">
          {filteredFlows.map((entry, idx) => (
            <SMSFlowCard
              key={entry.flowId}
              entry={entry}
              idx={idx}
              registryFlows={registryFlows}
            />
          ))}
        </div>
      )}

      {/* Live Data Preview */}
      <SmsLiveLogsPanel />
    </div>
  );
}
