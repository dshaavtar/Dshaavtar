import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  FlaskConical,
  Info,
  Play,
  RefreshCw,
  Rocket,
  Square,
  ThumbsDown,
  ThumbsUp,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useBackendActor } from "../hooks/useBackend";
import {
  useGetFlowAgentDiagnostics,
  useGetFlowAgentEntitySummary,
  useGetScriptRunResults,
  useSaveFlowAgentDiagnostic,
} from "../hooks/useBackend";
import {
  ensureFlowTimestamps,
  useApplyApprovedFixes,
  useApproveFlowFixes,
  useConfigureChannelSync,
  useDeployFixesToLive,
  useFlowHealthSummary,
  useGetAgentSchedule,
  useGetChannelSync,
  useGetDeploymentHistory,
  useGetFlowDiagnostics,
  useGetFlowFixStatus,
  useListAgentRuns,
  useRejectFlowFixes,
  useRunFlowDiagnostics,
  useSetAgentSchedule,
  useStopAgentRun,
} from "../hooks/useFlowAgent";
import { useOrderedFlows, useRegistryFlows } from "../hooks/useRegistryFlows";
import {
  getAllRegistryFlows,
  getEnabledFlows,
  getOrderedFlowsForExecution,
  isCustomerDependentFlow,
  readModuleStatuses,
} from "../lib/flowRegistry";
import type {
  AgentDeployment,
  FlowDiagnosticResult,
  FlowFix,
  FlowIssue,
} from "../types/flowAgent";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function healthColor(score: number) {
  if (score >= 71) return "bg-green-500";
  if (score >= 41) return "bg-amber-500";
  return "bg-red-500";
}

function healthTextColor(score: number) {
  if (score >= 71) return "text-green-400";
  if (score >= 41) return "text-amber-400";
  return "text-red-400";
}

function severityBadge(severity: FlowIssue["severity"]) {
  if (severity === "critical")
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        Critical
      </Badge>
    );
  if (severity === "warning")
    return (
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
        Warning
      </Badge>
    );
  return (
    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
      Info
    </Badge>
  );
}

function statusBadge(status: string) {
  const map: Record<string, React.ReactElement> = {
    healthy: (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        Healthy
      </Badge>
    ),
    warning: (
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
        Warning
      </Badge>
    ),
    critical: (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        Critical
      </Badge>
    ),
    pass: (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        Pass
      </Badge>
    ),
    fail: (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        Fail
      </Badge>
    ),
    skip: (
      <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
        Skip
      </Badge>
    ),
    running: (
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
        Running
      </Badge>
    ),
    completed: (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        Completed
      </Badge>
    ),
    pending: (
      <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
        Pending
      </Badge>
    ),
    stopped: (
      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
        Stopped
      </Badge>
    ),
    failed: (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        Failed
      </Badge>
    ),
    blocked: (
      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
        Blocked
      </Badge>
    ),
    pending_approval: (
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
        Pending Approval
      </Badge>
    ),
    approved: (
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
        Approved
      </Badge>
    ),
    rejected: (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        Rejected
      </Badge>
    ),
    re_test_running: (
      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
        Re-testing
      </Badge>
    ),
    re_test_failed: (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        Re-test Failed
      </Badge>
    ),
    ready_to_deploy: (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        Ready to Deploy
      </Badge>
    ),
    deployed: (
      <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
        Deployed
      </Badge>
    ),
  };
  return (
    map[status] ?? (
      <Badge className="bg-slate-500/20 text-slate-400">{status}</Badge>
    )
  );
}

function HealthBar({ score }: { score: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all ${healthColor(score)}`}
        style={{ width: `${Math.max(2, score)}%` }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          <Icon className={`w-8 h-8 opacity-50 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );
}

function JsonDiff({ before, after }: { before: string; after: string }) {
  let beforeObj: unknown = before;
  let afterObj: unknown = after;
  try {
    beforeObj = JSON.parse(before);
  } catch {
    /* keep as string */
  }
  try {
    afterObj = JSON.parse(after);
  } catch {
    /* keep as string */
  }
  const beforeStr =
    typeof beforeObj === "string"
      ? beforeObj
      : JSON.stringify(beforeObj, null, 2);
  const afterStr =
    typeof afterObj === "string" ? afterObj : JSON.stringify(afterObj, null, 2);
  return (
    <div className="text-xs font-mono rounded-md overflow-hidden border border-border">
      {beforeStr.split("\n").map((line, index) => (
        <div
          key={`b-${index}-${line}`}
          className="px-3 py-0.5 bg-red-950/40 text-red-300"
        >
          - {line}
        </div>
      ))}
      {afterStr.split("\n").map((line, index) => (
        <div
          key={`a-${index}-${line}`}
          className="px-3 py-0.5 bg-green-950/40 text-green-300"
        >
          + {line}
        </div>
      ))}
    </div>
  );
}

// ─── Issue Type Icons & Display ──────────────────────────────────────────────

function IssueTypeIndicator({ issue }: { issue: FlowIssue }) {
  const type = issue.issueType ?? "";

  if (type === "date_missing" || type === "date_issue") {
    return (
      <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-500/10 border border-amber-500/20 px-2.5 py-2">
        <Calendar className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs min-w-0">
          <p className="font-medium text-amber-300 mb-0.5">
            Date Field Missing:{" "}
            <span className="font-mono">{issue.fieldName ?? "timestamp"}</span>
          </p>
          <p className="text-amber-400/80">
            Proposed fix: Set{" "}
            <span className="font-mono">{issue.fieldName ?? "createdAt"}</span>{" "}
            to current timestamp (ms)
          </p>
        </div>
      </div>
    );
  }

  if (type === "script_test_fail") {
    return (
      <div className="mt-2 flex items-start gap-2 rounded-md bg-red-500/10 border border-red-500/20 px-2.5 py-2">
        <FlaskConical className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs min-w-0 space-y-1">
          <p className="font-medium text-red-300">
            Script Executor test failure
            {issue.stepName ? `: ${issue.stepName}` : ""}
          </p>
          {issue.expectedValue && (
            <p className="text-red-400/80">
              Expected:{" "}
              <span className="font-mono text-red-300">
                {issue.expectedValue}
              </span>
            </p>
          )}
          {issue.actualValue && (
            <p className="text-red-400/80">
              Received:{" "}
              <span className="font-mono text-red-300">
                {issue.actualValue}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ─── Fix Type Indicator ───────────────────────────────────────────────────────

function FixTypeChip({ fix }: { fix: FlowFix }) {
  const isDateFix =
    fix.fieldName?.includes("At") ||
    fix.fieldName?.includes("date") ||
    fix.fieldName?.includes("time") ||
    fix.proposedValue === "Auto-set";

  if (isDateFix && fix.fieldName) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-amber-400/90 mt-1.5">
        <Calendar className="w-3 h-3 flex-shrink-0" />
        <span>
          Sets <span className="font-mono">{fix.fieldName}</span> → current
          timestamp
        </span>
      </div>
    );
  }

  return null;
}

// ─── Script Executor Results Tab ─────────────────────────────────────────────

function ScriptResultsTab({ linkedRunId }: { linkedRunId: string }) {
  const { data: allHistory = [], isLoading } = useGetScriptRunResults();

  // Show a summary header and a table of all script run results
  const totalRuns = allHistory.length;
  const passedRuns = allHistory.filter(
    (r) => r.overallResult === "passed",
  ).length;
  const failedRuns = totalRuns - passedRuns;
  const successRate =
    totalRuns > 0 ? Math.round((passedRuns / totalRuns) * 100) : 0;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-foreground mb-0.5">
          Script Executor Results
        </p>
        <p className="text-xs text-muted-foreground">
          Script Executor results triggered by the Flow Agent. Results are saved
          automatically each time a diagnostic run executes flows.
          {linkedRunId && (
            <span className="ml-1 font-mono text-purple-400">
              (Active run: {linkedRunId.slice(0, 8)}…)
            </span>
          )}
        </p>
      </div>

      {isLoading ? (
        <div
          className="space-y-2"
          data-ocid="flow_agent.script_results.loading_state"
        >
          {["sr1", "sr2", "sr3"].map((sk) => (
            <Skeleton key={sk} className="h-10 rounded-lg" />
          ))}
        </div>
      ) : allHistory.length === 0 ? (
        <div
          className="text-center py-14 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border"
          data-ocid="flow_agent.script_results.empty_state"
        >
          <FlaskConical className="w-9 h-9 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-medium mb-1">
            No Script Executor results yet
          </p>
          <p className="text-xs">
            Run diagnostics to trigger Script Executor tests. Results appear
            here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary strip */}
          <div className="flex flex-wrap items-center gap-4 p-3.5 bg-card border border-border rounded-xl text-sm">
            <div className="flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">
                {totalRuns} runs
              </span>
            </div>
            <div className="h-3 w-px bg-border" />
            <span className="font-semibold text-green-400">
              {passedRuns} passed
            </span>
            {failedRuns > 0 && (
              <>
                <div className="h-3 w-px bg-border" />
                <span className="font-semibold text-red-400">
                  {failedRuns} failed
                </span>
              </>
            )}
            <div className="h-3 w-px bg-border" />
            <Badge
              className={
                successRate >= 80
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              }
            >
              {successRate}% pass rate
            </Badge>
          </div>

          {/* Results table */}
          <div
            className="overflow-x-auto rounded-xl border border-border"
            data-ocid="flow_agent.script_results.table"
          >
            <table className="w-full text-xs min-w-[600px]">
              <thead className="bg-muted/40">
                <tr>
                  {[
                    "Flow",
                    "Run At",
                    "Steps",
                    "Passed",
                    "Failed",
                    "Result",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2.5 text-muted-foreground font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allHistory.map((rec, idx) => (
                  <tr
                    key={rec.id}
                    className="border-t border-border hover:bg-muted/10 transition-colors"
                    data-ocid={`flow_agent.script_results.item.${idx + 1}`}
                  >
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-foreground">
                        {rec.flowName}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {rec.flowId}
                      </p>
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground tabular-nums">
                      {new Date(rec.ranAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-2.5 text-center text-muted-foreground">
                      {rec.totalSteps}
                    </td>
                    <td className="px-3 py-2.5 text-center font-semibold text-green-400">
                      {rec.passed}
                    </td>
                    <td className="px-3 py-2.5 text-center font-semibold text-red-400">
                      {rec.failed > 0 ? (
                        rec.failed
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      {rec.overallResult === "passed" ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                          PASS
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px]">
                          FAIL
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function FlowDiagnosticCard({
  result,
  onViewFixes,
}: {
  result: FlowDiagnosticResult;
  runId: string;
  onViewFixes: (flowId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="bg-card border-border">
      <CardHeader
        className="cursor-pointer pb-3 pt-4"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
            <span className="font-medium truncate text-sm text-foreground">
              {result.flowName}
            </span>
            {result.passed ? (
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <div className="w-24">
              <HealthBar score={result.healthScore} />
            </div>
            <span
              className={`text-xs font-bold ${healthTextColor(result.healthScore)}`}
            >
              {result.healthScore}%
            </span>
            {result.issues.length > 0 && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                {result.issues.length} issue
                {result.issues.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0 pb-4">
          {result.steps.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Steps
              </p>
              <div className="overflow-x-auto rounded-md border border-border">
                <table className="w-full text-xs min-w-[700px]">
                  <thead className="bg-muted/40">
                    <tr>
                      {[
                        "#",
                        "Node",
                        "Input Received",
                        "Expected Input",
                        "Output",
                        "Expected Output",
                        "Status",
                        "Issue",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-3 py-2 text-muted-foreground font-medium"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.steps.map((step) => (
                      <tr
                        key={step.stepNumber}
                        className="border-t border-border hover:bg-muted/20"
                      >
                        <td className="px-3 py-2 text-muted-foreground">
                          {step.stepNumber}
                        </td>
                        <td className="px-3 py-2 font-mono text-purple-300">
                          {step.node}
                        </td>
                        <td
                          className="px-3 py-2 max-w-[120px] truncate"
                          title={step.inputReceived}
                        >
                          {step.inputReceived || "—"}
                        </td>
                        <td
                          className="px-3 py-2 max-w-[120px] truncate text-muted-foreground"
                          title={step.expectedInput}
                        >
                          {step.expectedInput || "—"}
                        </td>
                        <td
                          className="px-3 py-2 max-w-[120px] truncate"
                          title={step.output}
                        >
                          {step.output || "—"}
                        </td>
                        <td
                          className="px-3 py-2 max-w-[120px] truncate text-muted-foreground"
                          title={step.expectedOutput}
                        >
                          {step.expectedOutput || "—"}
                        </td>
                        <td className="px-3 py-2">
                          {statusBadge(step.status)}
                        </td>
                        <td
                          className="px-3 py-2 text-amber-400 max-w-[140px] truncate"
                          title={step.diagnosticMessage}
                        >
                          {step.diagnosticMessage || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {result.issues.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Issues
              </p>
              <div className="space-y-2">
                {result.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-md bg-muted/30 px-3 py-2 border border-border"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {severityBadge(issue.severity)}
                      <span className="text-xs font-mono text-purple-300">
                        {issue.affectedNode}
                      </span>
                    </div>
                    <p className="text-xs text-foreground mb-0.5">
                      {issue.rootCause}
                    </p>
                    {issue.downstreamImpact && (
                      <p className="text-xs text-muted-foreground">
                        Impact: {issue.downstreamImpact}
                      </p>
                    )}
                    <IssueTypeIndicator issue={issue} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.issues.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewFixes(result.flowId)}
              className="mt-1"
              data-ocid="flow_agent.view_fixes_button"
            >
              View Fixes ({result.fixes.length})
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}

// ─── Fix Approval Card ────────────────────────────────────────────────────────

function FixApprovalCard({
  result,
  runId,
}: {
  result: FlowDiagnosticResult;
  runId: string;
}) {
  const [expandedFix, setExpandedFix] = useState<string | null>(null);
  const approve = useApproveFlowFixes();
  const reject = useRejectFlowFixes();
  const apply = useApplyApprovedFixes();

  function handleApproveAll() {
    if (!runId) return;
    approve.mutate(
      {
        runId,
        flowId: result.flowId,
        fixIds: result.fixes.map((f: FlowFix) => f.id),
      },
      {
        onSuccess: () => {
          toast.success(`All fixes approved for ${result.flowName}`);
          apply.mutate(
            { runId, flowId: result.flowId },
            {
              onSuccess: () =>
                toast.info(`Re-test started for ${result.flowName}`),
            },
          );
        },
      },
    );
  }

  function handleRejectAll() {
    if (!runId) return;
    reject.mutate(
      { runId, flowId: result.flowId, reason: "Rejected by admin" },
      { onSuccess: () => toast.info(`Fixes rejected for ${result.flowName}`) },
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium text-foreground">
              {result.flowName}
            </CardTitle>
            {result.reTestStatus && statusBadge(result.reTestStatus)}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              onClick={handleRejectAll}
              disabled={reject.isPending}
              data-ocid="flow_agent.reject_all_button"
            >
              <ThumbsDown className="w-3 h-3 mr-1" />
              Reject All
            </Button>
            <Button
              size="sm"
              className="bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
              onClick={handleApproveAll}
              disabled={approve.isPending || apply.isPending}
              data-ocid="flow_agent.approve_all_button"
            >
              <ThumbsUp className="w-3 h-3 mr-1" />
              Approve All &amp; Re-test
            </Button>
          </div>
        </div>
        <CardDescription className="text-xs mt-1">
          {result.issues.length} issue(s) · {result.fixes.length} fix(es)
          suggested
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="space-y-3">
          {result.fixes.map((fix: FlowFix) => (
            <div
              key={fix.id}
              className="rounded-md border border-border bg-muted/20 overflow-hidden"
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-3 py-2 hover:bg-muted/30 text-left"
                onClick={() =>
                  setExpandedFix(expandedFix === fix.id ? null : fix.id)
                }
              >
                <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 min-w-0">
                    {expandedFix === fix.id ? (
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="text-xs text-foreground truncate">
                      {fix.description}
                    </span>
                  </div>
                  <div className="pl-5">
                    <FixTypeChip fix={fix} />
                  </div>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs flex-shrink-0 ml-2">
                  {fix.fixType}
                </Badge>
              </button>
              {expandedFix === fix.id && (
                <div className="px-3 pb-3 pt-1 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">
                    Config diff:
                  </p>
                  <JsonDiff before={fix.beforeConfig} after={fix.afterConfig} />
                </div>
              )}
            </div>
          ))}
        </div>
        {(apply.isPending || result.reTestStatus === "running") && (
          <div
            className="mt-3 flex items-center gap-2 text-xs text-purple-400"
            data-ocid="flow_agent.retest_loading_state"
          >
            <RefreshCw className="w-3 h-3 animate-spin" />
            Re-testing flow…
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Entity Persistence Summary ──────────────────────────────────────────────

function RunEntityBadge({ runId }: { runId: string }) {
  const { data: summary } = useGetFlowAgentEntitySummary(runId);
  if (!summary) return <span className="text-muted-foreground text-xs">—</span>;
  const total =
    (summary.customersCreated ?? 0) +
    (summary.merchantsCreated ?? 0) +
    (summary.ordersCreated ?? 0);
  if (total === 0)
    return <span className="text-muted-foreground text-xs">0</span>;
  return (
    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px]">
      {total} records
    </Badge>
  );
}

function EntityPersistenceSummary({ runId }: { runId: string }) {
  const { data: summary, isLoading } = useGetFlowAgentEntitySummary(runId);

  if (isLoading) return null;
  if (!summary) return null;

  const total =
    (summary.customersCreated ?? 0) +
    (summary.merchantsCreated ?? 0) +
    (summary.ordersCreated ?? 0);
  if (total === 0) return null;

  return (
    <div
      className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-md"
      data-ocid="flow_agent.entity_summary"
    >
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
        <p className="text-xs font-semibold text-blue-400">
          Data Created by This Run
        </p>
        <span className="ml-auto text-[10px] text-blue-300 font-medium">
          {total} records saved
        </span>
      </div>
      <div className="flex gap-4 flex-wrap">
        {summary.customersCreated > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Users className="w-3 h-3 text-blue-400" />
            <span>Customers created: </span>
            <span className="font-bold text-blue-300">
              {summary.customersCreated}
            </span>
          </div>
        )}
        {summary.merchantsCreated > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Zap className="w-3 h-3 text-purple-400" />
            <span>Merchants created: </span>
            <span className="font-bold text-purple-300">
              {summary.merchantsCreated}
            </span>
          </div>
        )}
        {summary.ordersCreated > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Activity className="w-3 h-3 text-green-400" />
            <span>Orders created: </span>
            <span className="font-bold text-green-300">
              {summary.ordersCreated}
            </span>
          </div>
        )}
      </div>
      <div className="mt-2 flex gap-2">
        <a
          href="/admin/data-explorer?table=users"
          className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5 underline underline-offset-2"
          data-ocid="flow_agent.entity_summary.view_customers_link"
        >
          View in Data Explorer
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FlowAgentPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedRunId, setSelectedRunId] = useState<string>("");
  const [selectedFlowId, setSelectedFlowId] = useState<string>("all-flows");
  const [fixApprovalRunId, setFixApprovalRunId] = useState<string>("");
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "syncing" | "done" | "error"
  >("idle");
  const [syncWarning, setSyncWarning] = useState<string>("");
  const [runError, setRunError] = useState<string>("");
  const [runSuccess, setRunSuccess] = useState<string>("");

  // Track whether sync has been completed for this actor instance
  const syncDoneRef = useRef(false);

  // All flows from registry (ordered for execution: registration first)
  // useOrderedFlows() is reactive — re-renders when backend loads complete
  const orderedAllFlows = useOrderedFlows();
  const allFlows = orderedAllFlows;
  const { actor, isFetching: actorFetching } = useBackendActor();

  // Sync all flows from the unified registry to the backend on mount.
  // Guards: won't run until actor is ready, won't run twice for same actor.
  useEffect(() => {
    if (!actor || actorFetching) return;
    if (syncDoneRef.current) return;
    let cancelled = false;

    async function syncFlows() {
      setSyncStatus("syncing");
      setSyncWarning("");
      try {
        const rawFlows = getAllRegistryFlows();

        // Convert frontend FlowDefinition → backend FlowDefinition shape.
        // Backend Motoko type: { id, name, flowJson, environment, createdAt, updatedAt, version }
        // Extra frontend-only fields (description, category, triggerPayload, moduleKey, roles)
        // must NOT be included — Candid strict-encodes the record and rejects unknown fields.
        // ensureFlowTimestamps also builds a valid flowJson from frontend metadata when needed.
        const flows = rawFlows.map((f) => {
          const stamped = ensureFlowTimestamps(
            f as unknown as Record<string, unknown>,
          );
          // Return only the 7 fields the backend FlowDefinition record accepts.
          return {
            id: stamped.id as string,
            name: stamped.name as string,
            flowJson: stamped.flowJson as string,
            environment: stamped.environment as string,
            createdAt: stamped.createdAt as bigint,
            updatedAt: stamped.updatedAt as bigint,
            version: stamped.version as bigint,
          };
        });

        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >;
        if (typeof actorAny.saveFlowsBatch === "function") {
          await actorAny.saveFlowsBatch(flows);
        } else if (typeof actorAny.saveFlow === "function") {
          for (const flow of flows) {
            await actorAny.saveFlow(flow);
          }
        }
        // Backend method may not exist — that's fine, diagnostics still work
        if (!cancelled) {
          syncDoneRef.current = true;
          setSyncStatus("done");
        }
      } catch (err) {
        if (!cancelled) {
          // Sync failure is non-fatal — diagnostics can still run against
          // flows already on the backend from a previous session
          syncDoneRef.current = true;
          setSyncStatus("done");
          const msg = err instanceof Error ? err.message : "Sync warning";
          setSyncWarning(msg);
        }
      }
    }

    syncFlows();
    return () => {
      cancelled = true;
    };
  }, [actor, actorFetching]);

  const healthQuery = useFlowHealthSummary();
  const runsQuery = useListAgentRuns(50);
  const diagnosticsQuery = useGetFlowDiagnostics(selectedRunId);
  const fixStatusQuery = useGetFlowFixStatus(fixApprovalRunId || selectedRunId);
  const deployHistoryQuery = useGetDeploymentHistory(20);
  const scheduleQuery = useGetAgentSchedule();
  const channelSyncQuery = useGetChannelSync();

  const runDiagnostics = useRunFlowDiagnostics();
  const stopRun = useStopAgentRun();
  const deployFixes = useDeployFixesToLive();
  const setSchedule = useSetAgentSchedule();
  const setChannelSync = useConfigureChannelSync();

  const summary = healthQuery.data;
  const runs = runsQuery.data ?? [];
  const diagnostics = diagnosticsQuery.data ?? [];
  const fixStatuses = fixStatusQuery.data ?? [];
  const deployHistory = deployHistoryQuery.data ?? [];

  const activeRun = runs.find((r) => r.status === "running");

  // Shared run handler — used by both "Run All" (header button) and "Run Selected".
  // Awaits sync completion before firing; shows visible error on failure.
  const handleRunDiagnostics = useCallback(
    (mode: "all" | "selected") => {
      setRunError("");
      setRunSuccess("");

      // If sync is still in progress, show a message and block
      if (syncStatus === "syncing") {
        toast.info("Flows are still syncing — please wait a moment");
        return;
      }

      // Run All → empty array (backend treats [] as "all flows").
      // Run Selected → single-element array with the chosen flow ID.
      // Never pass null or undefined — the backend rejects non-vec arguments.
      const flowIds: string[] =
        mode === "all" || selectedFlowId === "all-flows"
          ? []
          : [selectedFlowId];

      runDiagnostics.mutate(flowIds, {
        onSuccess: (data) => {
          const runData = data as {
            runId: string;
            diagnostics?: {
              flowId?: string;
              flowName?: string;
              issue?: string;
              severity?: string;
              proposedFix?: string;
            }[];
          };
          if (!runData.runId) {
            setRunError(
              "Diagnostic started but no run ID was returned. Check the History tab.",
            );
            return;
          }
          setSelectedRunId(runData.runId);
          setFixApprovalRunId(runData.runId);
          setRunSuccess(
            `Run complete (ID: ${runData.runId.slice(0, 8)}…) — check Diagnostics tab for results.`,
          );
          toast.success(
            `Diagnostics run started (ID: ${runData.runId.slice(0, 8)}…)`,
          );
          // Save each diagnostic item to backend for history
          if (Array.isArray(runData.diagnostics)) {
            for (const item of runData.diagnostics as {
              flowId?: string;
              flowName?: string;
              issue?: string;
              severity?: string;
              proposedFix?: string;
            }[]) {
              saveFlowAgentDiagnostic.mutate({
                diagnosticId: `${data.runId}-${Math.random().toString(36).slice(2, 9)}`,
                flowId: item.flowId ?? data.runId,
                flowName: item.flowName ?? "Unknown Flow",
                issue: item.issue ?? "",
                severity: item.severity ?? "info",
                proposedFix: item.proposedFix ?? "",
                fixStatus: "proposed",
                timestamp: Date.now(),
              });
            }
          }
          setActiveTab("diagnostics");
        },
        onError: (err) => {
          const msg =
            err instanceof Error ? err.message : "Failed to start diagnostics";
          setRunError(msg);
          toast.error(msg);
        },
      });
    },
    [syncStatus, selectedFlowId, runDiagnostics],
  );

  const saveFlowAgentDiagnostic = useSaveFlowAgentDiagnostic();
  const { data: savedDiagnostics = [] } = useGetFlowAgentDiagnostics();

  function handleDeploy() {
    const readyFlows = fixStatuses
      .filter((f) => f.status === "ready_to_deploy")
      .map((f) => f.flowId);
    if (!readyFlows.length) {
      toast.error("No flows are ready to deploy");
      return;
    }
    deployFixes.mutate(
      { runId: selectedRunId, flowIds: readyFlows },
      {
        onSuccess: () => toast.success("Fixes deployed to live!"),
        onError: () => toast.error("Deploy failed"),
      },
    );
  }

  const allReadyToDeploy =
    fixStatuses.length > 0 &&
    fixStatuses.every(
      (f) => f.status === "ready_to_deploy" || f.status === "deployed",
    );

  const isBusy =
    runDiagnostics.isPending || !!activeRun || syncStatus === "syncing";

  return (
    <div
      className="flex flex-col h-full bg-background"
      data-ocid="flow_agent.page"
    >
      {/* Page Header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                Flow Health Agent
              </h1>
              <p className="text-xs text-muted-foreground">
                Automated flow analysis, fix suggestions &amp; deployment
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeRun && (
              <Button
                size="sm"
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={() => stopRun.mutate(activeRun.id)}
                data-ocid="flow_agent.stop_run_button"
              >
                <Square className="w-3 h-3 mr-1.5" />
                Stop Run
              </Button>
            )}
            <Button
              size="sm"
              className="bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
              onClick={() => handleRunDiagnostics("all")}
              disabled={isBusy}
              data-ocid="flow_agent.run_all_button"
            >
              {isBusy ? (
                <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" />
              ) : (
                <Play className="w-3 h-3 mr-1.5" />
              )}
              {syncStatus === "syncing"
                ? "Syncing flows…"
                : runDiagnostics.isPending
                  ? "Starting…"
                  : `Run All (${orderedAllFlows.length} flows)`}
            </Button>
          </div>
        </div>

        {/* Banners — non-blocking warnings and errors */}
        {syncWarning && (
          <div className="mt-3 flex items-start gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-md text-xs text-amber-400">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold">
                Sync warning (non-blocking):
              </span>{" "}
              {syncWarning} — diagnostics will still run.
            </div>
          </div>
        )}
        {runSuccess && (
          <div
            className="mt-3 flex items-start gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-md text-xs text-green-400"
            data-ocid="flow_agent.run_success"
          >
            <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>{runSuccess}</span>
          </div>
        )}
        {/* Entity Persistence Summary — shown after a diagnostic run completes */}
        {selectedRunId && runSuccess && (
          <EntityPersistenceSummary runId={selectedRunId} />
        )}
        {runError && (
          <div
            className="mt-3 flex items-start gap-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-md text-xs text-red-400"
            data-ocid="flow_agent.run_error"
          >
            <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold">Run error:</span>{" "}
              {runError.includes("missing key") ||
              runError.includes("createdAt") ? (
                <>
                  {runError}
                  <span className="block mt-0.5 text-red-300">
                    A flow record is missing a required timestamp field. Run
                    diagnostics to detect and auto-fix date issues.
                  </span>
                </>
              ) : (
                runError
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <TabsList
            className="flex-shrink-0 bg-muted/40 border-b border-border rounded-none px-6 h-10 justify-start gap-0"
            data-ocid="flow_agent.tabs"
          >
            {[
              { value: "dashboard", label: "Dashboard" },
              { value: "diagnostics", label: "Diagnostics" },
              { value: "fixes", label: "Fix Approval" },
              { value: "deploy", label: "Deploy" },
              { value: "script-results", label: "Script Results" },
              { value: "settings", label: "Settings" },
              { value: "history", label: "History" },
              { value: "diag-history", label: "Diagnostic History" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none text-xs px-4 h-full data-[state=active]:border-b-2 data-[state=active]:border-purple-400 data-[state=active]:bg-transparent"
                data-ocid={`flow_agent.tab.${tab.value}`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            {/* ── TAB: Dashboard ─────────────────────────────────── */}
            <TabsContent value="dashboard" className="mt-0 p-6 space-y-6">
              {healthQuery.isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                    <Skeleton key={sk} className="h-20 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div
                  className="grid grid-cols-2 md:grid-cols-5 gap-4"
                  data-ocid="flow_agent.summary_cards"
                >
                  <StatCard
                    label="Total Flows Tested"
                    value={summary?.totalFlows ?? 0}
                    icon={Activity}
                    color="text-foreground"
                  />
                  <StatCard
                    label="Passed"
                    value={summary?.passed ?? 0}
                    icon={CheckCircle}
                    color="text-green-400"
                  />
                  <StatCard
                    label="Failed"
                    value={summary?.failed ?? 0}
                    icon={XCircle}
                    color="text-red-400"
                  />
                  <StatCard
                    label="Issues Found"
                    value={summary?.issuesFound ?? 0}
                    icon={AlertTriangle}
                    color="text-amber-400"
                  />
                  <Card className="bg-card border-border">
                    <CardContent className="pt-5 pb-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        Health Score
                      </p>
                      <p
                        className={`text-2xl font-bold ${healthTextColor(summary?.healthScore ?? 100)}`}
                      >
                        {summary?.healthScore ?? 100}%
                      </p>
                      <HealthBar score={summary?.healthScore ?? 100} />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Run Controls */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Run Diagnostics
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Select a specific flow or run diagnostics on all{" "}
                    {orderedAllFlows.length} registered flows. Registration
                    flows run first.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <Select
                        value={selectedFlowId}
                        onValueChange={setSelectedFlowId}
                      >
                        <SelectTrigger
                          className="bg-muted/30 border-border text-sm"
                          data-ocid="flow_agent.flow_select"
                        >
                          <SelectValue placeholder="Select flow" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          <SelectItem value="all-flows">
                            All Flows ({allFlows.length})
                          </SelectItem>
                          {allFlows
                            .filter((f) => f.id && f.id.trim() !== "")
                            .map((flow) => (
                              <SelectItem key={flow.id} value={flow.id}>
                                {flow.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => handleRunDiagnostics("selected")}
                      disabled={isBusy}
                      data-ocid="flow_agent.run_specific_button"
                    >
                      {runDiagnostics.isPending ? (
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      ) : (
                        <Play className="w-3.5 h-3.5 mr-1.5" />
                      )}
                      {selectedFlowId === "all-flows"
                        ? "Run All Flows"
                        : "Run Selected"}
                    </Button>
                  </div>

                  {/* Status indicator */}
                  {syncStatus === "syncing" && (
                    <div
                      className="mt-3 flex items-center gap-2 text-xs text-purple-400"
                      data-ocid="flow_agent.sync_loading_state"
                    >
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Syncing {getAllRegistryFlows().length} flows to backend…
                      buttons will unlock automatically.
                    </div>
                  )}
                  {syncStatus === "done" && (
                    <p className="mt-2 text-xs text-green-400">
                      ✓ {getAllRegistryFlows().length} flows synced — ready to
                      run diagnostics.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Active Run Progress */}
              {activeRun && (
                <Card
                  className="bg-purple-900/20 border-purple-500/30"
                  data-ocid="flow_agent.active_run_card"
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-purple-300">
                          Diagnostics running…
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activeRun.flowsChecked} /{" "}
                          {summary?.totalFlows ?? "?"} flows checked
                        </p>
                      </div>
                      <div className="w-32">
                        <HealthBar
                          score={
                            summary?.totalFlows
                              ? Math.round(
                                  (activeRun.flowsChecked /
                                    summary.totalFlows) *
                                    100,
                                )
                              : 0
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Flow Health Table */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Flow Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {diagnosticsQuery.isLoading ? (
                    <div className="space-y-2">
                      {["h1", "h2", "h3", "h4"].map((sk) => (
                        <Skeleton key={`skel-health-${sk}`} className="h-10" />
                      ))}
                    </div>
                  ) : diagnostics.length === 0 ? (
                    <div
                      className="text-center py-10 text-muted-foreground"
                      data-ocid="flow_agent.health_table.empty_state"
                    >
                      <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">
                        No diagnostics data yet. Click "Run Diagnostics" to
                        start.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table
                        className="w-full text-sm min-w-[600px]"
                        data-ocid="flow_agent.health_table"
                      >
                        <thead className="bg-muted/40">
                          <tr>
                            {[
                              "Flow Name",
                              "Status",
                              "Health Score",
                              "Issues",
                              "Last Tested",
                              "Actions",
                            ].map((h) => (
                              <th
                                key={h}
                                className="text-left px-3 py-2 text-xs text-muted-foreground font-medium"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {diagnostics.map((d, idx) => (
                            <tr
                              key={d.flowId}
                              className="border-t border-border hover:bg-muted/20"
                              data-ocid={`flow_agent.health_table.item.${idx + 1}`}
                            >
                              <td className="px-3 py-2.5 font-medium text-foreground">
                                {d.flowName}
                              </td>
                              <td className="px-3 py-2.5">
                                {d.passed
                                  ? statusBadge("healthy")
                                  : d.healthScore >= 41
                                    ? statusBadge("warning")
                                    : statusBadge("critical")}
                              </td>
                              <td className="px-3 py-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-20">
                                    <HealthBar score={d.healthScore} />
                                  </div>
                                  <span
                                    className={`text-xs font-semibold ${healthTextColor(d.healthScore)}`}
                                  >
                                    {d.healthScore}%
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-2.5 text-amber-400">
                                {d.issues.length}
                              </td>
                              <td className="px-3 py-2.5 text-xs text-muted-foreground">
                                Just now
                              </td>
                              <td className="px-3 py-2.5">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 text-xs text-purple-400"
                                  onClick={() => {
                                    setActiveTab("diagnostics");
                                    setFixApprovalRunId(selectedRunId);
                                  }}
                                  data-ocid={`flow_agent.health_table.edit_button.${idx + 1}`}
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── TAB: Diagnostics ──────────────────────────────── */}
            <TabsContent value="diagnostics" className="mt-0 p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-sm font-medium text-foreground">
                  Diagnostics for run:
                </p>
                <Select
                  value={selectedRunId || "no-run-selected"}
                  onValueChange={setSelectedRunId}
                >
                  <SelectTrigger
                    className="w-64 bg-muted/30 border-border text-sm"
                    data-ocid="flow_agent.run_select"
                  >
                    <SelectValue placeholder="Select a run" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-run-selected">
                      Latest / Most Recent
                    </SelectItem>
                    {runs.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        Run {r.id.slice(0, 8)} ·{" "}
                        {new Date(r.startedAt).toLocaleString("en-IN", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {diagnosticsQuery.isLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="flow_agent.diagnostics.loading_state"
                >
                  {["d1", "d2", "d3"].map((sk) => (
                    <Skeleton key={sk} className="h-16 rounded-xl" />
                  ))}
                </div>
              ) : diagnostics.length === 0 ? (
                <div
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="flow_agent.diagnostics.empty_state"
                >
                  <Cpu className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium mb-1">
                    No diagnostics data
                  </p>
                  <p className="text-xs">
                    Run diagnostics from the Dashboard tab to see results here.
                  </p>
                  <Button
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      setActiveTab("dashboard");
                      handleRunDiagnostics("all");
                    }}
                    disabled={isBusy}
                    data-ocid="flow_agent.diagnostics.run_cta"
                  >
                    <Play className="w-3.5 h-3.5 mr-1.5" />
                    Run Now
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Summary strip */}
                  {diagnostics.length > 0 &&
                    (() => {
                      const registrationFailed = diagnostics.some(
                        (d) =>
                          !d.passed &&
                          (d.flowId === "customer_registration" ||
                            d.flowId === "register_customer"),
                      );
                      const passed = diagnostics.filter((d) => d.passed).length;
                      const blocked = registrationFailed
                        ? diagnostics.filter((d) =>
                            isCustomerDependentFlow(d.flowId),
                          ).length
                        : 0;
                      const failed =
                        diagnostics.filter((d) => !d.passed).length - blocked;
                      const issuesTotal = diagnostics.reduce(
                        (sum, d) => sum + d.issues.length,
                        0,
                      );
                      return (
                        <div
                          className="flex flex-wrap items-center gap-4 p-3 bg-card border border-border rounded-xl text-xs"
                          data-ocid="flow_agent.diagnostics.summary"
                        >
                          <span className="font-semibold text-foreground">
                            {diagnostics.length} flows checked
                          </span>
                          <div className="h-3 w-px bg-border" />
                          <span className="text-green-400 font-semibold">
                            {passed} passed
                          </span>
                          {failed > 0 && (
                            <>
                              <div className="h-3 w-px bg-border" />
                              <span className="text-red-400 font-semibold">
                                {failed} failed
                              </span>
                            </>
                          )}
                          {blocked > 0 && (
                            <>
                              <div className="h-3 w-px bg-border" />
                              <span className="text-orange-400 font-semibold">
                                {blocked} blocked
                              </span>
                            </>
                          )}
                          {issuesTotal > 0 && (
                            <>
                              <div className="h-3 w-px bg-border" />
                              <span className="text-amber-400 font-semibold">
                                {issuesTotal} issues
                              </span>
                            </>
                          )}
                        </div>
                      );
                    })()}
                  {/* Sort: registration flows first, then others */}
                  {[
                    ...diagnostics.filter(
                      (d) =>
                        d.flowId === "customer_registration" ||
                        d.flowId === "register_customer",
                    ),
                    ...diagnostics.filter(
                      (d) =>
                        d.flowId !== "customer_registration" &&
                        d.flowId !== "register_customer" &&
                        (d.flowId.includes("registration") ||
                          d.flowId.includes("register")),
                    ),
                    ...diagnostics.filter(
                      (d) =>
                        !d.flowId.includes("registration") &&
                        !d.flowId.includes("register"),
                    ),
                  ].map((result) => {
                    // Mark as "blocked" if registration failed and this flow depends on a customer
                    const registrationFailed = diagnostics.some(
                      (d) =>
                        !d.passed &&
                        (d.flowId === "customer_registration" ||
                          d.flowId === "register_customer"),
                    );
                    const isBlocked =
                      registrationFailed &&
                      isCustomerDependentFlow(result.flowId);
                    return (
                      <div key={result.flowId} className="relative">
                        {isBlocked && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]">
                              Blocked — awaits registration
                            </Badge>
                          </div>
                        )}
                        <FlowDiagnosticCard
                          result={result}
                          runId={selectedRunId}
                          onViewFixes={(_flowId) => {
                            setFixApprovalRunId(selectedRunId);
                            setActiveTab("fixes");
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* ── TAB: Fix Approval ──────────────────────────────── */}
            <TabsContent value="fixes" className="mt-0 p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">
                  Fix suggestions requiring approval
                </p>
              </div>
              {diagnosticsQuery.isLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="flow_agent.fixes.loading_state"
                >
                  {["f1", "f2"].map((sk) => (
                    <Skeleton key={sk} className="h-32 rounded-xl" />
                  ))}
                </div>
              ) : diagnostics.filter((d) => d.fixes.length > 0).length === 0 ? (
                <div
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="flow_agent.fixes.empty_state"
                >
                  <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium mb-1">No fixes pending</p>
                  <p className="text-xs">
                    All flows are healthy, or no diagnostics have been run yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {diagnostics
                    .filter((d) => d.fixes.length > 0)
                    .map((result) => (
                      <FixApprovalCard
                        key={result.flowId}
                        result={result}
                        runId={fixApprovalRunId || selectedRunId}
                      />
                    ))}
                </div>
              )}
            </TabsContent>

            {/* ── TAB: Deploy ───────────────────────────────────── */}
            <TabsContent value="deploy" className="mt-0 p-6 space-y-6">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Fix Status per Flow
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Flows must pass re-test before they can be deployed to live
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {fixStatuses.length === 0 ? (
                    <div
                      className="text-center py-8 text-muted-foreground"
                      data-ocid="flow_agent.deploy.empty_state"
                    >
                      <Rocket className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">
                        Approve fixes to see deploy status here.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table
                        className="w-full text-sm min-w-[400px]"
                        data-ocid="flow_agent.deploy.status_table"
                      >
                        <thead className="bg-muted/40">
                          <tr>
                            {["Flow", "Status", "Re-test"].map((h) => (
                              <th
                                key={h}
                                className="text-left px-3 py-2 text-xs text-muted-foreground font-medium"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {fixStatuses.map((fs, idx) => (
                            <tr
                              key={fs.flowId}
                              className="border-t border-border"
                              data-ocid={`flow_agent.deploy.item.${idx + 1}`}
                            >
                              <td className="px-3 py-2.5 font-medium text-foreground">
                                {fs.flowName}
                              </td>
                              <td className="px-3 py-2.5">
                                {statusBadge(fs.status)}
                              </td>
                              <td className="px-3 py-2.5">
                                {fs.reTestPassed === true && (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                )}
                                {fs.reTestPassed === false && (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                )}
                                {fs.reTestPassed === undefined && (
                                  <span className="text-muted-foreground text-xs">
                                    —
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  onClick={handleDeploy}
                  disabled={!allReadyToDeploy || deployFixes.isPending}
                  className="gap-2"
                  data-ocid="flow_agent.deploy_button"
                >
                  {deployFixes.isPending ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Rocket className="w-4 h-4" />
                  )}
                  Deploy to Live
                </Button>
              </div>

              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Deployment History
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {deployHistoryQuery.isLoading ? (
                    <div
                      className="space-y-2"
                      data-ocid="flow_agent.deploy_history.loading_state"
                    >
                      {["dh1", "dh2", "dh3"].map((sk) => (
                        <Skeleton key={sk} className="h-10" />
                      ))}
                    </div>
                  ) : deployHistory.length === 0 ? (
                    <div
                      className="text-center py-8 text-muted-foreground"
                      data-ocid="flow_agent.deploy_history.empty_state"
                    >
                      <Clock className="w-6 h-6 mx-auto mb-2 opacity-30" />
                      <p className="text-xs">No deployments yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table
                        className="w-full text-xs min-w-[600px]"
                        data-ocid="flow_agent.deploy_history.table"
                      >
                        <thead className="bg-muted/40">
                          <tr>
                            {[
                              "Date",
                              "Flows Deployed",
                              "Fixes Applied",
                              "By",
                              "Status",
                              "Channels",
                            ].map((h) => (
                              <th
                                key={h}
                                className="text-left px-3 py-2 text-muted-foreground font-medium"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {deployHistory.map((d: AgentDeployment, idx) => (
                            <tr
                              key={d.id}
                              className="border-t border-border"
                              data-ocid={`flow_agent.deploy_history.item.${idx + 1}`}
                            >
                              <td className="px-3 py-2">
                                {new Date(d.deployedAt).toLocaleString(
                                  "en-IN",
                                  { dateStyle: "short", timeStyle: "short" },
                                )}
                              </td>
                              <td className="px-3 py-2">{d.flowIds.length}</td>
                              <td className="px-3 py-2">{d.fixesApplied}</td>
                              <td className="px-3 py-2 text-muted-foreground">
                                {d.deployedBy}
                              </td>
                              <td className="px-3 py-2">
                                {statusBadge(d.status)}
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex gap-1">
                                  {d.channelSync.whatsapp && (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] px-1">
                                      WA
                                    </Badge>
                                  )}
                                  {d.channelSync.telegram && (
                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] px-1">
                                      TG
                                    </Badge>
                                  )}
                                  {d.channelSync.sms && (
                                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] px-1">
                                      SMS
                                    </Badge>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── TAB: Script Executor Results ──────────────────── */}
            <TabsContent value="script-results" className="mt-0 p-6 space-y-4">
              <ScriptResultsTab linkedRunId={selectedRunId} />
            </TabsContent>

            {/* ── TAB: Settings ─────────────────────────────────── */}
            <TabsContent value="settings" className="mt-0 p-6">
              <div className="max-w-lg space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      Automatic Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="schedule-enabled"
                        className="text-sm text-foreground"
                      >
                        Enable scheduled runs
                      </label>
                      <Switch
                        id="schedule-enabled"
                        checked={scheduleQuery.data?.enabled ?? false}
                        onCheckedChange={(checked) =>
                          setSchedule.mutate({
                            ...(scheduleQuery.data ?? {
                              enabled: false,
                              intervalHours: 24,
                              targetFlowId: "all",
                            }),
                            enabled: checked,
                          })
                        }
                        data-ocid="flow_agent.schedule_toggle"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="schedule-interval"
                        className="text-sm text-foreground flex-shrink-0"
                      >
                        Interval (hours)
                      </label>
                      <input
                        id="schedule-interval"
                        type="number"
                        min={1}
                        max={168}
                        className="flex h-9 w-24 rounded-md border border-input bg-muted/30 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                        value={scheduleQuery.data?.intervalHours ?? 24}
                        onChange={(e) =>
                          setSchedule.mutate({
                            ...(scheduleQuery.data ?? {
                              enabled: false,
                              intervalHours: 24,
                              targetFlowId: "all",
                            }),
                            intervalHours: Number(e.target.value),
                          })
                        }
                        data-ocid="flow_agent.schedule_interval_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="schedule-flow"
                        className="text-sm text-foreground block mb-1.5"
                      >
                        Default flow to test
                      </label>
                      <Select
                        value={
                          (scheduleQuery.data?.targetFlowId === "all"
                            ? "all-flows"
                            : scheduleQuery.data?.targetFlowId) ?? "all-flows"
                        }
                        onValueChange={(v) =>
                          setSchedule.mutate({
                            ...(scheduleQuery.data ?? {
                              enabled: false,
                              intervalHours: 24,
                              targetFlowId: "all",
                            }),
                            targetFlowId: v === "all-flows" ? "all" : v,
                          })
                        }
                      >
                        <SelectTrigger
                          className="bg-muted/30 border-border"
                          data-ocid="flow_agent.schedule_flow_select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[280px] overflow-y-auto">
                          <SelectItem value="all-flows">All Flows</SelectItem>
                          {allFlows
                            .filter((f) => f.id && f.id.trim() !== "")
                            .map((flow) => (
                              <SelectItem key={flow.id} value={flow.id}>
                                {flow.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      Channel Sync on Deploy
                    </CardTitle>
                    <CardDescription className="text-xs">
                      When fixes are deployed, sync updated flows to these
                      channels automatically.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {(["whatsapp", "telegram", "sms"] as const).map((ch) => (
                      <div
                        key={ch}
                        className="flex items-center justify-between"
                      >
                        <label
                          htmlFor={`channel-sync-${ch}`}
                          className="text-sm text-foreground capitalize"
                        >
                          {ch === "sms"
                            ? "SMS"
                            : ch === "whatsapp"
                              ? "WhatsApp"
                              : "Telegram"}
                        </label>
                        <Switch
                          id={`channel-sync-${ch}`}
                          checked={channelSyncQuery.data?.[ch] ?? true}
                          onCheckedChange={(checked) =>
                            setChannelSync.mutate({
                              ...(channelSyncQuery.data ?? {
                                whatsapp: true,
                                telegram: true,
                                sms: true,
                              }),
                              [ch]: checked,
                            })
                          }
                          data-ocid={`flow_agent.channel_sync_${ch}_toggle`}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ── TAB: History ──────────────────────────────────── */}
            <TabsContent value="history" className="mt-0 p-6">
              {runsQuery.isLoading ? (
                <div
                  className="space-y-2"
                  data-ocid="flow_agent.history.loading_state"
                >
                  {["r1", "r2", "r3", "r4", "r5"].map((sk) => (
                    <Skeleton key={sk} className="h-12" />
                  ))}
                </div>
              ) : runs.length === 0 ? (
                <div
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="flow_agent.history.empty_state"
                >
                  <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium mb-1">No agent runs yet</p>
                  <p className="text-xs">
                    Run diagnostics from the Dashboard to build your history.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm min-w-[700px]"
                    data-ocid="flow_agent.history.table"
                  >
                    <thead className="bg-muted/40 sticky top-0">
                      <tr>
                        {[
                          "Run ID",
                          "Timestamp",
                          "Flows Checked",
                          "Passed",
                          "Failed",
                          "Issues",
                          "Status",
                          "Records Saved",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left px-3 py-2.5 text-xs text-muted-foreground font-medium"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {runs.map((run, idx) => (
                        <tr
                          key={run.id}
                          className="border-t border-border hover:bg-muted/20 cursor-pointer"
                          onClick={() => {
                            setSelectedRunId(run.id);
                            setActiveTab("diagnostics");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setSelectedRunId(run.id);
                              setActiveTab("diagnostics");
                            }
                          }}
                          tabIndex={0}
                          data-ocid={`flow_agent.history.item.${idx + 1}`}
                        >
                          <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">
                            {run.id.slice(0, 12)}…
                          </td>
                          <td className="px-3 py-2.5 text-xs">
                            {new Date(run.startedAt).toLocaleString("en-IN", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {run.flowsChecked}
                          </td>
                          <td className="px-3 py-2.5 text-center text-green-400">
                            {run.passed}
                          </td>
                          <td className="px-3 py-2.5 text-center text-red-400">
                            {run.failed}
                          </td>
                          <td className="px-3 py-2.5 text-center text-amber-400">
                            {run.issuesFound}
                          </td>
                          <td className="px-3 py-2.5">
                            {statusBadge(run.status)}
                          </td>
                          <td className="px-3 py-2.5">
                            <RunEntityBadge runId={run.id} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* ── TAB: Diagnostic History ────────────────────────── */}
            <TabsContent value="diag-history" className="mt-0 p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Saved Diagnostic History
                </h3>
                <span className="text-xs text-muted-foreground">
                  {savedDiagnostics.length} record
                  {savedDiagnostics.length !== 1 ? "s" : ""}
                </span>
              </div>
              {savedDiagnostics.length === 0 ? (
                <div
                  className="text-center py-12 text-muted-foreground text-sm"
                  data-ocid="flow_agent.diag_history.empty_state"
                >
                  No diagnostic history yet. Run diagnostics to start recording
                  results.
                </div>
              ) : (
                <div
                  className="overflow-x-auto rounded-lg border border-border"
                  data-ocid="flow_agent.diag_history.table"
                >
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          Flow
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          Issue
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          Severity
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          Proposed Fix
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...savedDiagnostics]
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((d) => (
                          <tr
                            key={d.diagnosticId}
                            className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                            data-ocid={"flow_agent.diag_history.row"}
                          >
                            <td className="px-3 py-2.5 font-medium text-foreground max-w-[140px] truncate">
                              {d.flowName}
                            </td>
                            <td className="px-3 py-2.5 text-muted-foreground max-w-[200px] truncate">
                              {d.issue}
                            </td>
                            <td className="px-3 py-2.5">
                              <Badge
                                variant="outline"
                                className={
                                  d.severity === "critical"
                                    ? "border-red-500 text-red-400"
                                    : d.severity === "high"
                                      ? "border-orange-500 text-orange-400"
                                      : d.severity === "medium"
                                        ? "border-amber-500 text-amber-400"
                                        : "border-blue-500 text-blue-400"
                                }
                              >
                                {d.severity}
                              </Badge>
                            </td>
                            <td className="px-3 py-2.5">
                              <Badge
                                variant="outline"
                                className={
                                  d.fixStatus === "applied"
                                    ? "border-green-500 text-green-400"
                                    : d.fixStatus === "rejected"
                                      ? "border-red-500 text-red-400"
                                      : "border-yellow-500 text-yellow-400"
                                }
                              >
                                {d.fixStatus}
                              </Badge>
                            </td>
                            <td className="px-3 py-2.5 text-muted-foreground max-w-[200px] truncate">
                              {d.proposedFix || "—"}
                            </td>
                            <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap">
                              {new Date(d.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
