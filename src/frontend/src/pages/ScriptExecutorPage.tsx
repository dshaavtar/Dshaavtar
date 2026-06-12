import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Loader2,
  Play,
  RefreshCw,
  Save,
  TerminalSquare,
  User,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useBackendActor,
  useClearScriptRunResults,
  useExecuteFlowStep,
  useGetAllFlows,
  useGetScriptExecutorFlowSteps,
  useGetScriptRunResults,
  useSaveScriptRunResultWithData,
} from "../hooks/useBackend";
import type {
  FlowStepDef,
  FlowStepResult,
  ScriptRunRecord,
  ScriptRunSummary,
} from "../hooks/useBackend";
const FLOWS_EMPTY_ERROR =
  "Could not load flows from registry — the registry may be empty or the backend is still initializing.";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FlowOption {
  id: string;
  name: string;
  isRegistration: boolean;
}

interface LiveStep {
  stepIndex: number;
  stepName: string;
  stepType: string;
  inputSent: string;
  botResponse: string;
  status: "running" | "pass" | "fail" | "pending";
  executionMs: number;
  errorMsg: string | null;
  entityCreated: { entityType: string; entityId: string } | null;
}

interface RunResult {
  flowId: string;
  flowName: string;
  sessionId: string;
  steps: LiveStep[];
  totalMs: number;
  entitiesCreated: Array<{ entityType: string; entityId: string }>;
  savedSummary: ScriptRunSummary | null;
}

type ExecutionMode = "auto" | "step";
// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function stepTypeBadge(type: string) {
  const map: Record<string, { label: string; cls: string }> = {
    phone: {
      label: "📱 Phone",
      cls: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },
    text: { label: "✏️ Text", cls: "bg-muted text-muted-foreground" },
    choice: {
      label: "🔘 Choice",
      cls: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    },
    date: {
      label: "📅 Date",
      cls: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
    address: {
      label: "📍 Address",
      cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },
    number: {
      label: "🔢 Number",
      cls: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    },
  };
  const entry = map[type.toLowerCase()] ?? {
    label: type,
    cls: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${entry.cls}`}
    >
      {entry.label}
    </span>
  );
}

// ─── HistoryRow ────────────────────────────────────────────────────────────────

function HistoryRow({
  record,
  index,
}: { record: ScriptRunRecord; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const passRate =
    record.totalSteps > 0
      ? Math.round((record.passed / record.totalSteps) * 100)
      : 100;
  const date = new Date(record.ranAt);
  const dateStr = Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div
      className="border border-border rounded-lg overflow-hidden"
      data-ocid={`script-executor.history.item.${index + 1}`}
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <Badge
          variant={
            record.overallResult === "passed" ? "default" : "destructive"
          }
          className={`text-[10px] flex-shrink-0 ${
            record.overallResult === "passed"
              ? "bg-emerald-600 hover:bg-emerald-600"
              : ""
          }`}
        >
          {record.overallResult === "passed" ? "PASS" : "FAIL"}
        </Badge>
        <span className="font-medium text-sm text-foreground flex-1 truncate min-w-0">
          {record.flowName}
        </span>
        <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
          {dateStr}
        </span>
        <span className="text-xs text-muted-foreground flex-shrink-0">
          {record.totalSteps} steps
        </span>
        <span
          className={`text-xs font-semibold flex-shrink-0 ${
            passRate === 100
              ? "text-emerald-600"
              : passRate >= 50
                ? "text-amber-600"
                : "text-red-500"
          }`}
        >
          {passRate}%
        </span>
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-3 border-t border-border bg-muted/10 space-y-2 pt-3">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-2 text-center">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                {record.passed}
              </p>
              <p className="text-muted-foreground">Passed</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-2 text-center">
              <p className="font-bold text-red-500 text-base">
                {record.failed}
              </p>
              <p className="text-muted-foreground">Failed</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-2 text-center">
              <p className="font-bold text-foreground text-base">{passRate}%</p>
              <p className="text-muted-foreground">Pass Rate</p>
            </div>
          </div>
          {record.sessionLanguage && (
            <p className="text-xs text-muted-foreground">
              Language:{" "}
              <span className="font-medium text-foreground">
                {record.sessionLanguage}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── LiveStepCard ─────────────────────────────────────────────────────────────

function LiveStepCard({ step }: { step: LiveStep }) {
  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all ${
        step.status === "running"
          ? "border-primary/30 bg-primary/5"
          : step.status === "pass"
            ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/10"
            : step.status === "fail"
              ? "border-red-200 dark:border-red-800 bg-red-50/40 dark:bg-red-950/10"
              : "border-border bg-muted/10"
      }`}
      data-ocid={`script-executor.live_step.${step.stepIndex + 1}`}
    >
      {/* Step header */}
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">
          {step.stepIndex + 1}
        </span>
        {step.status === "running" ? (
          <Loader2 className="w-3.5 h-3.5 text-primary animate-spin flex-shrink-0" />
        ) : step.status === "pass" ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
        ) : step.status === "fail" ? (
          <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
        ) : (
          <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
        )}
        <span className="text-xs font-semibold text-foreground flex-1 truncate min-w-0">
          {step.stepName}
        </span>
        {stepTypeBadge(step.stepType)}
        {step.executionMs > 0 && (
          <span className="text-[10px] text-muted-foreground flex-shrink-0 hidden sm:block">
            {step.executionMs}ms
          </span>
        )}
        {step.status !== "running" && step.status !== "pending" && (
          <Badge
            variant={step.status === "pass" ? "default" : "destructive"}
            className={`text-[10px] px-1.5 py-0.5 flex-shrink-0 ${
              step.status === "pass"
                ? "bg-emerald-600 hover:bg-emerald-600"
                : ""
            }`}
          >
            {step.status === "pass" ? "✓ PASS" : "✗ FAIL"}
          </Badge>
        )}
      </div>

      {/* Chat bubbles */}
      {(step.status === "pass" || step.status === "fail") && (
        <div className="px-3 pb-3 space-y-2">
          {/* Input bubble */}
          <div className="flex items-start gap-2 justify-end">
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3 py-1.5 text-xs max-w-[75%]">
              {step.inputSent || (
                <span className="italic opacity-60">(empty)</span>
              )}
            </div>
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-primary" />
            </div>
          </div>
          {/* Response bubble */}
          {step.botResponse && (
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-1.5 text-xs max-w-[75%] text-foreground">
                {step.botResponse}
              </div>
            </div>
          )}
          {/* Error */}
          {step.status === "fail" && step.errorMsg && (
            <div className="flex items-start gap-1.5 mt-1 pl-8">
              <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-red-600 dark:text-red-400">
                {step.errorMsg}
              </p>
            </div>
          )}
          {/* Entity created */}
          {step.entityCreated && (
            <div className="pl-8">
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                ✓ Created {step.entityCreated.entityType}:{" "}
                {step.entityCreated.entityId}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── PerFlowHistory ───────────────────────────────────────────────────────────────

function PerFlowHistory({
  flows,
  historyRecords,
  selectedFlowId,
  onSelectFlow,
}: {
  flows: FlowOption[];
  historyRecords: ScriptRunRecord[];
  selectedFlowId: string;
  onSelectFlow: (id: string) => void;
}) {
  const [filterFlowId, setFilterFlowId] = useState(selectedFlowId);

  const filtered = historyRecords
    .filter(
      (r) =>
        !filterFlowId ||
        r.flowId === filterFlowId ||
        r.flowName === filterFlowId,
    )
    .slice(0, 10);

  return (
    <div className="space-y-4" data-ocid="script-executor.flow-history-panel">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        <div className="flex-1 min-w-[200px] space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Filter by Flow
          </p>
          <Select
            value={filterFlowId || "__all__"}
            onValueChange={(v) => {
              const val = v === "__all__" ? "" : v;
              setFilterFlowId(val);
              if (val) onSelectFlow(val);
            }}
          >
            <SelectTrigger
              className="h-9"
              data-ocid="script-executor.flow-history-select"
            >
              <SelectValue placeholder="All flows" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              <SelectItem value="__all__">All Flows</SelectItem>
              {flows.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-muted-foreground pb-1">
          Showing last {filtered.length} run{filtered.length !== 1 ? "s" : ""}
          {filterFlowId ? " for selected flow" : " across all flows"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-3 text-center"
          data-ocid="script-executor.flow-history.empty_state"
        >
          <Clock className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No runs found for the selected flow.
          </p>
          <p className="text-xs text-muted-foreground">
            Run a flow in Auto-Run mode to see history here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((r, i) => (
            <HistoryRow key={r.id} record={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScriptExecutorPage() {
  useBackendActor(); // ensures actor is initialized for child hooks
  const executeStep = useExecuteFlowStep();
  const saveRunMutation = useSaveScriptRunResultWithData();
  const clearHistory = useClearScriptRunResults();
  const { data: historyRecords = [] } = useGetScriptRunResults();

  // ── Flow list from backend (unified registry) ────────────────────────────────────
  const {
    data: allFlowsRaw = [],
    isLoading: flowsLoading,
    isError: flowsError,
    refetch: refetchFlows,
  } = useGetAllFlows();

  // Derive sorted FlowOption[] from the React Query result — no state needed
  const flows: FlowOption[] = allFlowsRaw
    .filter((f) => f.id && f.id.trim() !== "")
    .map((f) => ({
      id: f.id,
      name: f.name,
      isRegistration:
        f.id.includes("registration") || f.id.includes("register"),
    }))
    .sort((a, b) => {
      if (a.isRegistration && !b.isRegistration) return -1;
      if (!a.isRegistration && b.isRegistration) return 1;
      return a.name.localeCompare(b.name);
    });

  const [selectedFlowId, setSelectedFlowId] = useState("");
  const [execMode, setExecMode] = useState<ExecutionMode>("auto");

  // ── Steps for selected flow ──────────────────────────────────────────────────
  const { data: backendSteps = [], isFetching: stepsFetching } =
    useGetScriptExecutorFlowSteps(selectedFlowId);

  // ── Run state ────────────────────────────────────────────────────────────────
  const [running, setRunning] = useState(false);
  const [liveSteps, setLiveSteps] = useState<LiveStep[]>([]);
  const [progress, setProgress] = useState(0); // 0–100
  const [runComplete, setRunComplete] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Step-by-step mode
  const [stepByStepIdx, setStepByStepIdx] = useState(0);
  const [stepByStepSteps, setStepByStepSteps] = useState<FlowStepDef[]>([]);
  const [stepByStepSession, setStepByStepSession] = useState("");
  const [retryStep, setRetryStep] = useState<{
    stepIdx: number;
    value: string;
  } | null>(null);
  const [retryValue, setRetryValue] = useState("");
  const [completedSteps, setCompletedSteps] = useState<LiveStep[]>([]);

  const liveEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("run");

  // ── Auto-select first flow when flows load ───────────────────────────────────
  useEffect(() => {
    if (flows.length > 0 && !selectedFlowId) {
      setSelectedFlowId(flows[0].id);
    }
  }, [flows, selectedFlowId]);

  // ── Elapsed timer ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (running && startTime !== null) {
      elapsedRef.current = setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 100);
    } else {
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    }
    return () => {
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    };
  }, [running, startTime]);

  // ── Auto-scroll ──────────────────────────────────────────────────────────────
  useEffect(() => {
    liveEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const selectedFlow = flows.find((f) => f.id === selectedFlowId);

  // ── Determine steps to use ────────────────────────────────────────────────────
  // Use backend-provided steps if available; otherwise fall back to a single trigger step
  const stepsToUse: FlowStepDef[] =
    backendSteps.length > 0
      ? backendSteps
      : [
          {
            stepIndex: 0,
            stepName: "Trigger Flow",
            stepType: "text",
            promptText: `Send "hi" to start the ${selectedFlow?.name ?? ""} flow`,
            testValue: "hi",
            validationPattern: null,
          },
        ];

  // ── Auto-Run ──────────────────────────────────────────────────────────────────
  const runAutoMode = useCallback(async () => {
    if (!selectedFlowId || running) return;
    const sessionId = generateSessionId();
    const steps = stepsToUse;
    const flowName = selectedFlow?.name ?? selectedFlowId;

    setRunning(true);
    setRunComplete(false);
    setRunResult(null);
    setProgress(0);
    const t0 = Date.now();
    setStartTime(t0);
    setElapsedMs(0);

    // Initialise live steps as pending
    const initial: LiveStep[] = steps.map((s) => ({
      stepIndex: s.stepIndex,
      stepName: s.stepName,
      stepType: s.stepType,
      inputSent: s.testValue,
      botResponse: "",
      status: "pending",
      executionMs: 0,
      errorMsg: null,
      entityCreated: null,
    }));
    setLiveSteps(initial);

    const completed: LiveStep[] = [];
    const allEntities: Array<{ entityType: string; entityId: string }> = [];
    const stepRecords: Parameters<
      typeof saveRunMutation.mutateAsync
    >[0]["steps"] = [];

    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      // Mark as running
      setLiveSteps((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], status: "running" };
        return next;
      });

      const stepStart = Date.now();
      let result: FlowStepResult;
      try {
        result = await executeStep.mutateAsync({
          flowId: selectedFlowId,
          stepIndex: s.stepIndex,
          userInput: s.testValue,
          sessionId,
        });
      } catch (err) {
        result = {
          response: `Error: ${err instanceof Error ? err.message : String(err)}`,
          nextStepHint: "",
          entityCreated: null,
          stepPassed: false,
          errorMsg: err instanceof Error ? err.message : String(err),
        };
      }

      const execMs = Date.now() - stepStart;
      const liveStep: LiveStep = {
        stepIndex: s.stepIndex,
        stepName: s.stepName,
        stepType: s.stepType,
        inputSent: s.testValue,
        botResponse: result.response,
        status: result.stepPassed ? "pass" : "fail",
        executionMs: execMs,
        errorMsg: result.errorMsg,
        entityCreated: result.entityCreated,
      };

      completed.push(liveStep);
      if (result.entityCreated) allEntities.push(result.entityCreated);

      stepRecords.push({
        stepIndex: s.stepIndex,
        stepName: s.stepName,
        inputSent: s.testValue,
        botResponse: result.response,
        passed: result.stepPassed,
        errorMsg: result.errorMsg ?? "",
        executionMs: execMs,
        entityType: result.entityCreated?.entityType,
        entityId: result.entityCreated?.entityId,
      });

      setLiveSteps((prev) => {
        const next = [...prev];
        next[i] = liveStep;
        return next;
      });
      setProgress(Math.round(((i + 1) / steps.length) * 100));

      // 500ms delay between steps in auto mode
      if (i < steps.length - 1) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    const totalMs = Date.now() - t0;
    const passedSteps = completed.filter((s) => s.status === "pass").length;
    const failedSteps = completed.filter((s) => s.status === "fail").length;

    // Save to backend
    let savedSummary: ScriptRunSummary | null = null;
    try {
      savedSummary = await saveRunMutation.mutateAsync({
        flowName,
        totalSteps: steps.length,
        passedSteps,
        failedSteps,
        overallPass: failedSteps === 0,
        steps: stepRecords,
      });
    } catch {
      /* non-fatal */
    }

    setRunResult({
      flowId: selectedFlowId,
      flowName,
      sessionId,
      steps: completed,
      totalMs,
      entitiesCreated: allEntities,
      savedSummary,
    });
    setRunComplete(true);
    setRunning(false);
    setProgress(100);
  }, [
    selectedFlowId,
    running,
    stepsToUse,
    selectedFlow,
    executeStep,
    saveRunMutation,
  ]);

  // ── Step-by-Step mode: start ──────────────────────────────────────────────────
  function startStepMode() {
    if (!selectedFlowId) return;
    const sessionId = generateSessionId();
    setStepByStepSession(sessionId);
    setStepByStepSteps(stepsToUse);
    setStepByStepIdx(0);
    setCompletedSteps([]);
    setRunComplete(false);
    setRunResult(null);
    setProgress(0);
    setRetryStep(null);
    setRetryValue("");
    // Show first step
  }

  // ── Step-by-Step: advance step ────────────────────────────────────────────────
  const [stepRunning, setStepRunning] = useState(false);
  const [runAllFlowsActive, setRunAllFlowsActive] = useState(false);
  const [runAllProgress, setRunAllProgress] = useState<{
    current: number;
    total: number;
  }>({ current: 0, total: 0 });

  async function advanceStep(overrideValue?: string) {
    const currentStep = stepByStepSteps[stepByStepIdx];
    if (!currentStep) return;
    const inputValue = overrideValue ?? currentStep.testValue;
    setStepRunning(true);

    const stepStart = Date.now();
    let result: FlowStepResult;
    try {
      result = await executeStep.mutateAsync({
        flowId: selectedFlowId,
        stepIndex: currentStep.stepIndex,
        userInput: inputValue,
        sessionId: stepByStepSession,
      });
    } catch (err) {
      result = {
        response: `Error: ${err instanceof Error ? err.message : String(err)}`,
        nextStepHint: "",
        entityCreated: null,
        stepPassed: false,
        errorMsg: err instanceof Error ? err.message : String(err),
      };
    }

    const execMs = Date.now() - stepStart;
    const liveStep: LiveStep = {
      stepIndex: currentStep.stepIndex,
      stepName: currentStep.stepName,
      stepType: currentStep.stepType,
      inputSent: inputValue,
      botResponse: result.response,
      status: result.stepPassed ? "pass" : "fail",
      executionMs: execMs,
      errorMsg: result.errorMsg,
      entityCreated: result.entityCreated,
    };

    const updated = [...completedSteps, liveStep];
    setCompletedSteps(updated);
    setRetryStep(null);
    setRetryValue("");
    setStepRunning(false);

    const newIdx = stepByStepIdx + 1;
    const totalSteps = stepByStepSteps.length;
    setProgress(Math.round((newIdx / totalSteps) * 100));

    if (newIdx >= totalSteps) {
      // All done
      const passedSteps = updated.filter((s) => s.status === "pass").length;
      const failedSteps = updated.filter((s) => s.status === "fail").length;
      const allEntities = updated
        .map((s) => s.entityCreated)
        .filter((e): e is NonNullable<typeof e> => e !== null);
      let savedSummary: ScriptRunSummary | null = null;
      try {
        savedSummary = await saveRunMutation.mutateAsync({
          flowName: selectedFlow?.name ?? selectedFlowId,
          totalSteps,
          passedSteps,
          failedSteps,
          overallPass: failedSteps === 0,
          steps: updated.map((s) => ({
            stepIndex: s.stepIndex,
            stepName: s.stepName,
            inputSent: s.inputSent,
            botResponse: s.botResponse,
            passed: s.status === "pass",
            errorMsg: s.errorMsg ?? "",
            executionMs: s.executionMs,
            entityType: s.entityCreated?.entityType,
            entityId: s.entityCreated?.entityId,
          })),
        });
      } catch {
        /* non-fatal */
      }
      setRunResult({
        flowId: selectedFlowId,
        flowName: selectedFlow?.name ?? selectedFlowId,
        sessionId: stepByStepSession,
        steps: updated,
        totalMs: updated.reduce((sum, s) => sum + s.executionMs, 0),
        entitiesCreated: allEntities,
        savedSummary,
      });
      setRunComplete(true);
      setProgress(100);
    } else {
      setStepByStepIdx(newIdx);
    }
  }

  function handleRetry() {
    advanceStep(retryValue.trim() || undefined);
  }

  function handleSaveRun() {
    if (!runResult?.savedSummary) {
      toast.success("Run saved — visible in Execution History");
    } else {
      toast.success(
        `Run saved — visible in Execution History (ID: ${runResult.savedSummary.runId.slice(0, 8)}…)`,
      );
    }
    setActiveTab("history");
  }

  function handleClearHistory() {
    clearHistory
      .mutateAsync(undefined)
      .then(() => toast.success("Run history cleared"))
      .catch(() => toast.error("Failed to clear history"));
  }

  // ── Run All Flows ─────────────────────────────────────────────────────────────
  const runAllFlows = useCallback(async () => {
    if (runAllFlowsActive || running) return;
    const orderedFlows = flows.slice();
    if (orderedFlows.length === 0) {
      toast.error("No flows available to run");
      return;
    }
    setRunAllFlowsActive(true);
    setRunAllProgress({ current: 0, total: orderedFlows.length });
    toast.info(`Running all ${orderedFlows.length} flows…`);
    let passed = 0;
    let failed = 0;
    for (let i = 0; i < orderedFlows.length; i++) {
      const flow = orderedFlows[i];
      setRunAllProgress({ current: i + 1, total: orderedFlows.length });
      setSelectedFlowId(flow.id);
      setRunComplete(false);
      setRunResult(null);
      setLiveSteps([]);
      setProgress(0);
      // Brief pause for state to settle
      await new Promise((r) => setTimeout(r, 300));
      try {
        await runAutoMode();
        passed++;
      } catch {
        failed++;
      }
      // 2s gap between flows
      if (i < orderedFlows.length - 1) {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
    setRunAllFlowsActive(false);
    toast.success(`All flows complete — ${passed} passed, ${failed} failed`);
  }, [runAllFlowsActive, running, flows, runAutoMode]);

  function downloadLog() {
    if (!runResult) return;
    const blob = new Blob([JSON.stringify(runResult, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lbk-executor-${runResult.flowId}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Derived values ────────────────────────────────────────────────────────────
  const currentSbsStep = stepByStepSteps[stepByStepIdx] ?? null;
  const inStepMode =
    execMode === "step" && stepByStepSteps.length > 0 && !runComplete;
  const passed = (runResult?.steps ?? []).filter(
    (s) => s.status === "pass",
  ).length;
  const failed = (runResult?.steps ?? []).filter(
    (s) => s.status === "fail",
  ).length;

  return (
    <div className="space-y-5 animate-fade-in" data-ocid="script-executor.page">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <TerminalSquare className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Script Executor
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Execute chatbot flows step-by-step with auto-generated test values
            and live validation.
            {flowsLoading && (
              <span className="ml-2 text-xs">
                <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
                Loading flows…
              </span>
            )}
          </p>
        </div>
        <Button
          onClick={() => void runAllFlows()}
          disabled={runAllFlowsActive || running || flows.length === 0}
          variant="outline"
          className="gap-2 h-9 flex-shrink-0"
          data-ocid="script-executor.run-all-button"
        >
          {runAllFlowsActive ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {runAllProgress.current}/{runAllProgress.total} flows…
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Run All ({flows.length})
            </>
          )}
        </Button>
      </div>

      {/* Flow registry error alert */}
      {flowsError && !flowsLoading && (
        <div
          className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3"
          data-ocid="script-executor.registry-error"
        >
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-destructive">
              Failed to load flow registry
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {FLOWS_EMPTY_ERROR}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="flex-shrink-0 gap-1.5 h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
            onClick={() => void refetchFlows()}
            data-ocid="script-executor.retry-registry-button"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </Button>
        </div>
      )}

      {/* Empty registry warning (loaded but 0 flows) */}
      {!flowsLoading && !flowsError && allFlowsRaw.length === 0 && (
        <div
          className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3"
          data-ocid="script-executor.empty-registry-warning"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
              No flows found in registry
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              The backend registry appears to be empty. Ensure the backend is
              deployed and try refreshing.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="flex-shrink-0 gap-1.5 h-7 text-xs"
            onClick={() => void refetchFlows()}
            data-ocid="script-executor.refresh-registry-button"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </Button>
        </div>
      )}

      {/* Controls */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          {/* Flow selector */}
          <div className="flex-1 min-w-[200px] space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Select Flow
            </p>
            <Select
              value={selectedFlowId || "__none__"}
              onValueChange={(v) => {
                if (v !== "__none__") {
                  setSelectedFlowId(v);
                  setRunComplete(false);
                  setRunResult(null);
                  setLiveSteps([]);
                  setProgress(0);
                  setCompletedSteps([]);
                  setStepByStepSteps([]);
                  setStepByStepIdx(0);
                }
              }}
            >
              <SelectTrigger
                className="h-9"
                data-ocid="script-executor.flow-select"
              >
                <SelectValue placeholder="Select a flow…" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {flowsLoading && flows.length === 0 ? (
                  <SelectItem value="__loading__" disabled>
                    Loading flows…
                  </SelectItem>
                ) : flows.length === 0 ? (
                  <SelectItem value="__empty__" disabled>
                    No flows available
                  </SelectItem>
                ) : (
                  flows.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.isRegistration ? "⭐ " : ""}
                      {f.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Mode selector */}
          <div className="space-y-1.5 min-w-[160px]">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Execution Mode
            </p>
            <div className="flex rounded-lg border border-border overflow-hidden h-9">
              <button
                type="button"
                onClick={() => setExecMode("auto")}
                className={`flex-1 text-xs font-medium px-3 transition-colors ${
                  execMode === "auto"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted/50"
                }`}
                data-ocid="script-executor.mode.auto"
              >
                Auto-Run
              </button>
              <button
                type="button"
                onClick={() => setExecMode("step")}
                className={`flex-1 text-xs font-medium px-3 transition-colors border-l border-border ${
                  execMode === "step"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted/50"
                }`}
                data-ocid="script-executor.mode.step"
              >
                Step-by-Step
              </button>
            </div>
          </div>

          {/* Run button */}
          <Button
            onClick={execMode === "auto" ? runAutoMode : startStepMode}
            disabled={running || !selectedFlowId}
            className="gap-2 h-9"
            data-ocid="script-executor.run-flow-button"
          >
            {running ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            {running ? "Running…" : "Run Flow"}
          </Button>
        </div>

        {/* Steps preview */}
        {selectedFlow && !running && !runComplete && (
          <div className="bg-muted/20 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">
                {selectedFlow.name}
              </p>
              <span className="text-xs text-muted-foreground">
                {stepsFetching ? (
                  <span className="flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" /> Loading steps…
                  </span>
                ) : (
                  `${stepsToUse.length} step${stepsToUse.length !== 1 ? "s" : ""}`
                )}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {stepsToUse.slice(0, 8).map((s, i) => (
                <div
                  key={`${s.stepIndex}-${i}`}
                  className="flex items-center gap-2 text-xs"
                >
                  <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="truncate text-muted-foreground">
                    {s.stepName}
                  </span>
                  {stepTypeBadge(s.stepType)}
                </div>
              ))}
              {stepsToUse.length > 8 && (
                <p className="text-[11px] text-muted-foreground col-span-2">
                  …and {stepsToUse.length - 8} more
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="script-executor.tabs"
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="run" data-ocid="script-executor.tab.run">
            Live Run
          </TabsTrigger>
          <TabsTrigger value="history" data-ocid="script-executor.tab.history">
            Execution History
            {historyRecords.length > 0 && (
              <span className="ml-1.5 text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                {historyRecords.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="flow-history"
            data-ocid="script-executor.tab.flow-history"
          >
            Flow History
          </TabsTrigger>
        </TabsList>

        {/* ── Live Run Tab ───────────────────────────────────────────────────── */}
        <TabsContent value="run" className="mt-4 space-y-4">
          {/* Progress bar */}
          {(running || runComplete) && (
            <div className="space-y-1" data-ocid="script-executor.progress">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{running ? "Running…" : "Complete"}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    running
                      ? "bg-primary"
                      : failed === 0
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* ── Step-by-Step mode UI ─────────────────────────────────────────── */}
          {inStepMode && currentSbsStep && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Current step card */}
              <div className="px-5 py-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Step {stepByStepIdx + 1} of {stepByStepSteps.length}
                  </Badge>
                  {stepTypeBadge(currentSbsStep.stepType)}
                </div>
                <h3 className="font-semibold text-base text-foreground">
                  {currentSbsStep.stepName}
                </h3>
                {currentSbsStep.promptText && (
                  <p className="text-sm text-muted-foreground">
                    {currentSbsStep.promptText}
                  </p>
                )}
                <div className="bg-muted/30 rounded-xl p-3 space-y-1">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Auto-generated test value
                  </p>
                  <code className="text-sm font-mono text-foreground block">
                    {currentSbsStep.testValue || "(empty)"}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => advanceStep()}
                    disabled={stepRunning}
                    className="gap-2"
                    data-ocid="script-executor.next-step-button"
                  >
                    {stepRunning ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                    {stepRunning ? "Running…" : "Use This Value"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setRetryStep({
                        stepIdx: stepByStepIdx,
                        value: currentSbsStep.testValue,
                      })
                    }
                    disabled={stepRunning}
                    data-ocid="script-executor.override-value-button"
                  >
                    Override Value
                  </Button>
                </div>
                {/* Override input */}
                {retryStep?.stepIdx === stepByStepIdx && (
                  <div
                    className="flex items-center gap-2 pt-1"
                    data-ocid="script-executor.override-input"
                  >
                    <Input
                      value={retryValue}
                      onChange={(e) => setRetryValue(e.target.value)}
                      placeholder={`Override value for step ${stepByStepIdx + 1}…`}
                      className="h-8 text-sm"
                      data-ocid="script-executor.retry-input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRetry();
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleRetry}
                      disabled={stepRunning}
                      data-ocid="script-executor.retry-button"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Completed steps */}
              {completedSteps.length > 0 && (
                <div className="border-t border-border px-4 py-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Completed Steps
                  </p>
                  <ScrollArea className="max-h-60">
                    <div className="space-y-2 pr-3">
                      {completedSteps.map((s) => (
                        <LiveStepCard key={s.stepIndex} step={s} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          )}

          {/* ── Auto-Run live feed ───────────────────────────────────────────── */}
          {(liveSteps.length > 0 || running) && execMode === "auto" && (
            <div
              className="bg-card border border-border rounded-2xl overflow-hidden"
              data-ocid="script-executor.live_feed"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/10">
                <div className="flex items-center gap-2">
                  {running ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  ) : failed === 0 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-amber-500" />
                  )}
                  <p className="text-sm font-semibold text-foreground">
                    {selectedFlow?.name ?? selectedFlowId}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="text-emerald-500 font-semibold">
                    {liveSteps.filter((s) => s.status === "pass").length} ✓
                  </span>
                  {liveSteps.filter((s) => s.status === "fail").length > 0 && (
                    <span className="text-red-400 font-semibold">
                      {liveSteps.filter((s) => s.status === "fail").length} ✗
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {(
                      (running ? elapsedMs : (runResult?.totalMs ?? 0)) / 1000
                    ).toFixed(1)}
                    s
                  </span>
                </div>
              </div>

              <ScrollArea className="max-h-[50vh]">
                <div
                  className="p-4 space-y-2"
                  data-ocid="script-executor.live_feed.steps"
                >
                  {liveSteps.length === 0 && running && (
                    <div className="flex items-center gap-2 py-4 text-xs text-muted-foreground">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Initialising run…
                    </div>
                  )}
                  {liveSteps.map((s) => (
                    <LiveStepCard key={s.stepIndex} step={s} />
                  ))}
                  <div ref={liveEndRef} />
                </div>
              </ScrollArea>
            </div>
          )}

          {/* ── Run Complete Summary ──────────────────────────────────────────── */}
          {runComplete && runResult && (
            <div
              className={`border rounded-2xl overflow-hidden ${
                failed === 0
                  ? "border-emerald-200 dark:border-emerald-800"
                  : "border-amber-200 dark:border-amber-800"
              }`}
              data-ocid="script-executor.run-complete"
            >
              <div
                className={`px-5 py-4 ${
                  failed === 0
                    ? "bg-emerald-50 dark:bg-emerald-950/20"
                    : "bg-amber-50 dark:bg-amber-950/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    {failed === 0 ? (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-base text-foreground">
                        Run Complete
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {runResult.flowName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSaveRun}
                      className="gap-1.5 h-8"
                      data-ocid="script-executor.save-run-button"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Run
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={downloadLog}
                      className="gap-1.5 h-8"
                      data-ocid="script-executor.download-log-button"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {[
                    {
                      label: "Total Steps",
                      value: runResult.steps.length,
                      color: "text-foreground",
                    },
                    {
                      label: "Passed",
                      value: passed,
                      color: "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      label: "Failed",
                      value: failed,
                      color:
                        failed > 0 ? "text-red-500" : "text-muted-foreground",
                    },
                    {
                      label: "Time",
                      value: `${(runResult.totalMs / 1000).toFixed(2)}s`,
                      color: "text-foreground",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="bg-background/60 rounded-xl p-3 text-center"
                    >
                      <p className={`font-bold text-lg ${color}`}>{value}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entities created */}
              {runResult.entitiesCreated.length > 0 && (
                <div className="px-5 py-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Data Created
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {runResult.entitiesCreated.map((e, i) => (
                      <a
                        key={`${e.entityType}-${e.entityId}-${i}`}
                        href={`/data-explorer?table=${encodeURIComponent(e.entityType)}&highlight=${encodeURIComponent(e.entityId)}`}
                        className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors underline-offset-2 hover:underline cursor-pointer"
                        data-ocid={`script-executor.entity.${i + 1}`}
                        title={`Open ${e.entityType} in Data Explorer`}
                      >
                        {e.entityType}: {e.entityId}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Save confirmation */}
              {runResult.savedSummary && (
                <div className="px-5 py-3 border-t border-border bg-muted/10">
                  <p className="text-xs text-muted-foreground">
                    ✓ Saved to Execution History —{" "}
                    <span className="font-mono text-foreground">
                      Run ID: {runResult.savedSummary.runId.slice(0, 12)}…
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!running &&
            !runComplete &&
            liveSteps.length === 0 &&
            !inStepMode && (
              <div
                className="flex flex-col items-center justify-center py-16 text-center gap-3"
                data-ocid="script-executor.empty_state"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <TerminalSquare className="w-7 h-7 text-primary" />
                </div>
                <p className="font-semibold text-foreground">
                  Ready to Execute
                </p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Select a flow and click <strong>Run Flow</strong> to execute
                  it with auto-generated test values. Each step calls the real
                  backend and shows bot responses live.
                </p>
                {flows.length === 0 && !flowsLoading && (
                  <p className="text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                    No flows loaded — make sure the backend is deployed and the
                    unified registry is seeded.
                  </p>
                )}
              </div>
            )}
        </TabsContent>

        {/* ── Execution History Tab ──────────────────────────────────────────── */}
        <TabsContent value="history" className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">
              {historyRecords.length} past run
              {historyRecords.length !== 1 ? "s" : ""}
            </p>
            {historyRecords.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleClearHistory}
                className="text-muted-foreground hover:text-destructive gap-1.5 h-7 text-xs"
                data-ocid="script-executor.clear-history-button"
              >
                <XCircle className="w-3.5 h-3.5" />
                Clear History
              </Button>
            )}
          </div>

          {historyRecords.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 gap-3 text-center"
              data-ocid="script-executor.history.empty_state"
            >
              <Clock className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No runs recorded yet.
              </p>
              <p className="text-xs text-muted-foreground">
                Run a flow and click Save Run to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {historyRecords.map((r, i) => (
                <HistoryRow key={r.id} record={r} index={i} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* ── Per-Flow History Tab ──────────────────────────────────────────── */}
        <TabsContent value="flow-history" className="mt-4">
          <PerFlowHistory
            flows={flows}
            historyRecords={historyRecords}
            selectedFlowId={selectedFlowId}
            onSelectFlow={setSelectedFlowId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
