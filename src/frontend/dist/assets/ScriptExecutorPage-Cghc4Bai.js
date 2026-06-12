import { _ as useBackendActor, cA as useExecuteFlowStep, cB as useSaveScriptRunResultWithData, cC as useClearScriptRunResults, aN as useGetScriptRunResults, ak as useGetAllFlows, r as reactExports, cD as useGetScriptExecutorFlowSteps, p as ue, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as ScrollArea } from "./scroll-area-C_Pp8Hph.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { S as SquareTerminal } from "./square-terminal-D2qbnput.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { P as Play } from "./play-CyYdC5Jl.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { S as Save } from "./save-De3uJrwe.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { U as User } from "./user-BCyag2Xe.js";
import { B as Bot } from "./bot-egkDiXjP.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CUcO6jhF.js";
import "./index-BNXq-E6T.js";
import "./index-dLX_aGK4.js";
import "./index-yUS8KoxU.js";
import "./index-IXOTxK3N.js";
import "./index-D1QQ462r.js";
import "./index-DYndF6Sn.js";
import "./index-z5OST4d2.js";
import "./check-CO9wi49t.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./chevron-up-BzRcvKHL.js";
const FLOWS_EMPTY_ERROR = "Could not load flows from registry — the registry may be empty or the backend is still initializing.";
function generateSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
function stepTypeBadge(type) {
  const map = {
    phone: {
      label: "📱 Phone",
      cls: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
    },
    text: { label: "✏️ Text", cls: "bg-muted text-muted-foreground" },
    choice: {
      label: "🔘 Choice",
      cls: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
    },
    date: {
      label: "📅 Date",
      cls: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
    },
    address: {
      label: "📍 Address",
      cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
    },
    number: {
      label: "🔢 Number",
      cls: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
    }
  };
  const entry = map[type.toLowerCase()] ?? {
    label: type,
    cls: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-[10px] px-1.5 py-0.5 rounded-full font-medium ${entry.cls}`,
      children: entry.label
    }
  );
}
function HistoryRow({
  record,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const passRate = record.totalSteps > 0 ? Math.round(record.passed / record.totalSteps * 100) : 100;
  const date = new Date(record.ranAt);
  const dateStr = Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-lg overflow-hidden",
      "data-ocid": `script-executor.history.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors",
            onClick: () => setExpanded((v) => !v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: record.overallResult === "passed" ? "default" : "destructive",
                  className: `text-[10px] flex-shrink-0 ${record.overallResult === "passed" ? "bg-emerald-600 hover:bg-emerald-600" : ""}`,
                  children: record.overallResult === "passed" ? "PASS" : "FAIL"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground flex-1 truncate min-w-0", children: record.flowName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0 hidden sm:block", children: dateStr }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: [
                record.totalSteps,
                " steps"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-xs font-semibold flex-shrink-0 ${passRate === 100 ? "text-emerald-600" : passRate >= 50 ? "text-amber-600" : "text-red-500"}`,
                  children: [
                    passRate,
                    "%"
                  ]
                }
              ),
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 border-t border-border bg-muted/10 space-y-2 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-emerald-600 dark:text-emerald-400 text-base", children: record.passed }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Passed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 dark:bg-red-950/20 rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-red-500 text-base", children: record.failed }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Failed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-base", children: [
                passRate,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Pass Rate" })
            ] })
          ] }),
          record.sessionLanguage && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Language:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: record.sessionLanguage })
          ] })
        ] })
      ]
    }
  );
}
function LiveStepCard({ step }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border overflow-hidden transition-all ${step.status === "running" ? "border-primary/30 bg-primary/5" : step.status === "pass" ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/10" : step.status === "fail" ? "border-red-200 dark:border-red-800 bg-red-50/40 dark:bg-red-950/10" : "border-border bg-muted/10"}`,
      "data-ocid": `script-executor.live_step.${step.stepIndex + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0", children: step.stepIndex + 1 }),
          step.status === "running" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 text-primary animate-spin flex-shrink-0" }) : step.status === "pass" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-500 flex-shrink-0" }) : step.status === "fail" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-red-500 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground flex-1 truncate min-w-0", children: step.stepName }),
          stepTypeBadge(step.stepType),
          step.executionMs > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground flex-shrink-0 hidden sm:block", children: [
            step.executionMs,
            "ms"
          ] }),
          step.status !== "running" && step.status !== "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: step.status === "pass" ? "default" : "destructive",
              className: `text-[10px] px-1.5 py-0.5 flex-shrink-0 ${step.status === "pass" ? "bg-emerald-600 hover:bg-emerald-600" : ""}`,
              children: step.status === "pass" ? "✓ PASS" : "✗ FAIL"
            }
          )
        ] }),
        (step.status === "pass" || step.status === "fail") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3 py-1.5 text-xs max-w-[75%]", children: step.inputSent || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic opacity-60", children: "(empty)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 text-primary" }) })
          ] }),
          step.botResponse && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3 h-3 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted rounded-2xl rounded-tl-sm px-3 py-1.5 text-xs max-w-[75%] text-foreground", children: step.botResponse })
          ] }),
          step.status === "fail" && step.errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 mt-1 pl-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-red-600 dark:text-red-400", children: step.errorMsg })
          ] }),
          step.entityCreated && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium", children: [
            "✓ Created ",
            step.entityCreated.entityType,
            ":",
            " ",
            step.entityCreated.entityId
          ] }) })
        ] })
      ]
    }
  );
}
function PerFlowHistory({
  flows,
  historyRecords,
  selectedFlowId,
  onSelectFlow
}) {
  const [filterFlowId, setFilterFlowId] = reactExports.useState(selectedFlowId);
  const filtered = historyRecords.filter(
    (r) => !filterFlowId || r.flowId === filterFlowId || r.flowName === filterFlowId
  ).slice(0, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "script-executor.flow-history-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px] space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Filter by Flow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filterFlowId || "__all__",
            onValueChange: (v) => {
              const val = v === "__all__" ? "" : v;
              setFilterFlowId(val);
              if (val) onSelectFlow(val);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-9",
                  "data-ocid": "script-executor.flow-history-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All flows" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-[300px] overflow-y-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "All Flows" }),
                flows.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f.id, children: f.name }, f.id))
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pb-1", children: [
        "Showing last ",
        filtered.length,
        " run",
        filtered.length !== 1 ? "s" : "",
        filterFlowId ? " for selected flow" : " across all flows"
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "script-executor.flow-history.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No runs found for the selected flow." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Run a flow in Auto-Run mode to see history here." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryRow, { record: r, index: i }, r.id)) })
  ] });
}
function ScriptExecutorPage() {
  useBackendActor();
  const executeStep = useExecuteFlowStep();
  const saveRunMutation = useSaveScriptRunResultWithData();
  const clearHistory = useClearScriptRunResults();
  const { data: historyRecords = [] } = useGetScriptRunResults();
  const {
    data: allFlowsRaw = [],
    isLoading: flowsLoading,
    isError: flowsError,
    refetch: refetchFlows
  } = useGetAllFlows();
  const flows = allFlowsRaw.filter((f) => f.id && f.id.trim() !== "").map((f) => ({
    id: f.id,
    name: f.name,
    isRegistration: f.id.includes("registration") || f.id.includes("register")
  })).sort((a, b) => {
    if (a.isRegistration && !b.isRegistration) return -1;
    if (!a.isRegistration && b.isRegistration) return 1;
    return a.name.localeCompare(b.name);
  });
  const [selectedFlowId, setSelectedFlowId] = reactExports.useState("");
  const [execMode, setExecMode] = reactExports.useState("auto");
  const { data: backendSteps = [], isFetching: stepsFetching } = useGetScriptExecutorFlowSteps(selectedFlowId);
  const [running, setRunning] = reactExports.useState(false);
  const [liveSteps, setLiveSteps] = reactExports.useState([]);
  const [progress, setProgress] = reactExports.useState(0);
  const [runComplete, setRunComplete] = reactExports.useState(false);
  const [runResult, setRunResult] = reactExports.useState(null);
  const [startTime, setStartTime] = reactExports.useState(null);
  const [elapsedMs, setElapsedMs] = reactExports.useState(0);
  const elapsedRef = reactExports.useRef(null);
  const [stepByStepIdx, setStepByStepIdx] = reactExports.useState(0);
  const [stepByStepSteps, setStepByStepSteps] = reactExports.useState([]);
  const [stepByStepSession, setStepByStepSession] = reactExports.useState("");
  const [retryStep, setRetryStep] = reactExports.useState(null);
  const [retryValue, setRetryValue] = reactExports.useState("");
  const [completedSteps, setCompletedSteps] = reactExports.useState([]);
  const liveEndRef = reactExports.useRef(null);
  const [activeTab, setActiveTab] = reactExports.useState("run");
  reactExports.useEffect(() => {
    if (flows.length > 0 && !selectedFlowId) {
      setSelectedFlowId(flows[0].id);
    }
  }, [flows, selectedFlowId]);
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
    var _a;
    (_a = liveEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  const selectedFlow = flows.find((f) => f.id === selectedFlowId);
  const stepsToUse = backendSteps.length > 0 ? backendSteps : [
    {
      stepIndex: 0,
      stepName: "Trigger Flow",
      stepType: "text",
      promptText: `Send "hi" to start the ${(selectedFlow == null ? void 0 : selectedFlow.name) ?? ""} flow`,
      testValue: "hi",
      validationPattern: null
    }
  ];
  const runAutoMode = reactExports.useCallback(async () => {
    var _a, _b;
    if (!selectedFlowId || running) return;
    const sessionId = generateSessionId();
    const steps = stepsToUse;
    const flowName = (selectedFlow == null ? void 0 : selectedFlow.name) ?? selectedFlowId;
    setRunning(true);
    setRunComplete(false);
    setRunResult(null);
    setProgress(0);
    const t0 = Date.now();
    setStartTime(t0);
    setElapsedMs(0);
    const initial = steps.map((s) => ({
      stepIndex: s.stepIndex,
      stepName: s.stepName,
      stepType: s.stepType,
      inputSent: s.testValue,
      botResponse: "",
      status: "pending",
      executionMs: 0,
      errorMsg: null,
      entityCreated: null
    }));
    setLiveSteps(initial);
    const completed = [];
    const allEntities = [];
    const stepRecords = [];
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      setLiveSteps((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], status: "running" };
        return next;
      });
      const stepStart = Date.now();
      let result;
      try {
        result = await executeStep.mutateAsync({
          flowId: selectedFlowId,
          stepIndex: s.stepIndex,
          userInput: s.testValue,
          sessionId
        });
      } catch (err) {
        result = {
          response: `Error: ${err instanceof Error ? err.message : String(err)}`,
          nextStepHint: "",
          entityCreated: null,
          stepPassed: false,
          errorMsg: err instanceof Error ? err.message : String(err)
        };
      }
      const execMs = Date.now() - stepStart;
      const liveStep = {
        stepIndex: s.stepIndex,
        stepName: s.stepName,
        stepType: s.stepType,
        inputSent: s.testValue,
        botResponse: result.response,
        status: result.stepPassed ? "pass" : "fail",
        executionMs: execMs,
        errorMsg: result.errorMsg,
        entityCreated: result.entityCreated
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
        entityType: (_a = result.entityCreated) == null ? void 0 : _a.entityType,
        entityId: (_b = result.entityCreated) == null ? void 0 : _b.entityId
      });
      setLiveSteps((prev) => {
        const next = [...prev];
        next[i] = liveStep;
        return next;
      });
      setProgress(Math.round((i + 1) / steps.length * 100));
      if (i < steps.length - 1) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }
    const totalMs = Date.now() - t0;
    const passedSteps = completed.filter((s) => s.status === "pass").length;
    const failedSteps = completed.filter((s) => s.status === "fail").length;
    let savedSummary = null;
    try {
      savedSummary = await saveRunMutation.mutateAsync({
        flowName,
        totalSteps: steps.length,
        passedSteps,
        failedSteps,
        overallPass: failedSteps === 0,
        steps: stepRecords
      });
    } catch {
    }
    setRunResult({
      flowId: selectedFlowId,
      flowName,
      sessionId,
      steps: completed,
      totalMs,
      entitiesCreated: allEntities,
      savedSummary
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
    saveRunMutation
  ]);
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
  }
  const [stepRunning, setStepRunning] = reactExports.useState(false);
  const [runAllFlowsActive, setRunAllFlowsActive] = reactExports.useState(false);
  const [runAllProgress, setRunAllProgress] = reactExports.useState({ current: 0, total: 0 });
  async function advanceStep(overrideValue) {
    const currentStep = stepByStepSteps[stepByStepIdx];
    if (!currentStep) return;
    const inputValue = overrideValue ?? currentStep.testValue;
    setStepRunning(true);
    const stepStart = Date.now();
    let result;
    try {
      result = await executeStep.mutateAsync({
        flowId: selectedFlowId,
        stepIndex: currentStep.stepIndex,
        userInput: inputValue,
        sessionId: stepByStepSession
      });
    } catch (err) {
      result = {
        response: `Error: ${err instanceof Error ? err.message : String(err)}`,
        nextStepHint: "",
        entityCreated: null,
        stepPassed: false,
        errorMsg: err instanceof Error ? err.message : String(err)
      };
    }
    const execMs = Date.now() - stepStart;
    const liveStep = {
      stepIndex: currentStep.stepIndex,
      stepName: currentStep.stepName,
      stepType: currentStep.stepType,
      inputSent: inputValue,
      botResponse: result.response,
      status: result.stepPassed ? "pass" : "fail",
      executionMs: execMs,
      errorMsg: result.errorMsg,
      entityCreated: result.entityCreated
    };
    const updated = [...completedSteps, liveStep];
    setCompletedSteps(updated);
    setRetryStep(null);
    setRetryValue("");
    setStepRunning(false);
    const newIdx = stepByStepIdx + 1;
    const totalSteps = stepByStepSteps.length;
    setProgress(Math.round(newIdx / totalSteps * 100));
    if (newIdx >= totalSteps) {
      const passedSteps = updated.filter((s) => s.status === "pass").length;
      const failedSteps = updated.filter((s) => s.status === "fail").length;
      const allEntities = updated.map((s) => s.entityCreated).filter((e) => e !== null);
      let savedSummary = null;
      try {
        savedSummary = await saveRunMutation.mutateAsync({
          flowName: (selectedFlow == null ? void 0 : selectedFlow.name) ?? selectedFlowId,
          totalSteps,
          passedSteps,
          failedSteps,
          overallPass: failedSteps === 0,
          steps: updated.map((s) => {
            var _a, _b;
            return {
              stepIndex: s.stepIndex,
              stepName: s.stepName,
              inputSent: s.inputSent,
              botResponse: s.botResponse,
              passed: s.status === "pass",
              errorMsg: s.errorMsg ?? "",
              executionMs: s.executionMs,
              entityType: (_a = s.entityCreated) == null ? void 0 : _a.entityType,
              entityId: (_b = s.entityCreated) == null ? void 0 : _b.entityId
            };
          })
        });
      } catch {
      }
      setRunResult({
        flowId: selectedFlowId,
        flowName: (selectedFlow == null ? void 0 : selectedFlow.name) ?? selectedFlowId,
        sessionId: stepByStepSession,
        steps: updated,
        totalMs: updated.reduce((sum, s) => sum + s.executionMs, 0),
        entitiesCreated: allEntities,
        savedSummary
      });
      setRunComplete(true);
      setProgress(100);
    } else {
      setStepByStepIdx(newIdx);
    }
  }
  function handleRetry() {
    advanceStep(retryValue.trim() || void 0);
  }
  function handleSaveRun() {
    if (!(runResult == null ? void 0 : runResult.savedSummary)) {
      ue.success("Run saved — visible in Execution History");
    } else {
      ue.success(
        `Run saved — visible in Execution History (ID: ${runResult.savedSummary.runId.slice(0, 8)}…)`
      );
    }
    setActiveTab("history");
  }
  function handleClearHistory() {
    clearHistory.mutateAsync(void 0).then(() => ue.success("Run history cleared")).catch(() => ue.error("Failed to clear history"));
  }
  const runAllFlows = reactExports.useCallback(async () => {
    if (runAllFlowsActive || running) return;
    const orderedFlows = flows.slice();
    if (orderedFlows.length === 0) {
      ue.error("No flows available to run");
      return;
    }
    setRunAllFlowsActive(true);
    setRunAllProgress({ current: 0, total: orderedFlows.length });
    ue.info(`Running all ${orderedFlows.length} flows…`);
    let passed2 = 0;
    let failed2 = 0;
    for (let i = 0; i < orderedFlows.length; i++) {
      const flow = orderedFlows[i];
      setRunAllProgress({ current: i + 1, total: orderedFlows.length });
      setSelectedFlowId(flow.id);
      setRunComplete(false);
      setRunResult(null);
      setLiveSteps([]);
      setProgress(0);
      await new Promise((r) => setTimeout(r, 300));
      try {
        await runAutoMode();
        passed2++;
      } catch {
        failed2++;
      }
      if (i < orderedFlows.length - 1) {
        await new Promise((r) => setTimeout(r, 2e3));
      }
    }
    setRunAllFlowsActive(false);
    ue.success(`All flows complete — ${passed2} passed, ${failed2} failed`);
  }, [runAllFlowsActive, running, flows, runAutoMode]);
  function downloadLog() {
    if (!runResult) return;
    const blob = new Blob([JSON.stringify(runResult, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lbk-executor-${runResult.flowId}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  const currentSbsStep = stepByStepSteps[stepByStepIdx] ?? null;
  const inStepMode = execMode === "step" && stepByStepSteps.length > 0 && !runComplete;
  const passed = ((runResult == null ? void 0 : runResult.steps) ?? []).filter(
    (s) => s.status === "pass"
  ).length;
  const failed = ((runResult == null ? void 0 : runResult.steps) ?? []).filter(
    (s) => s.status === "fail"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", "data-ocid": "script-executor.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Script Executor" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Execute chatbot flows step-by-step with auto-generated test values and live validation.",
          flowsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin inline mr-1" }),
            "Loading flows…"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => void runAllFlows(),
          disabled: runAllFlowsActive || running || flows.length === 0,
          variant: "outline",
          className: "gap-2 h-9 flex-shrink-0",
          "data-ocid": "script-executor.run-all-button",
          children: runAllFlowsActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
            runAllProgress.current,
            "/",
            runAllProgress.total,
            " flows…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
            "Run All (",
            flows.length,
            ")"
          ] })
        }
      )
    ] }),
    flowsError && !flowsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3",
        "data-ocid": "script-executor.registry-error",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive", children: "Failed to load flow registry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: FLOWS_EMPTY_ERROR })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "flex-shrink-0 gap-1.5 h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10",
              onClick: () => void refetchFlows(),
              "data-ocid": "script-executor.retry-registry-button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                "Retry"
              ]
            }
          )
        ]
      }
    ),
    !flowsLoading && !flowsError && allFlowsRaw.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3",
        "data-ocid": "script-executor.empty-registry-warning",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-700 dark:text-amber-400", children: "No flows found in registry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "The backend registry appears to be empty. Ensure the backend is deployed and try refreshing." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "flex-shrink-0 gap-1.5 h-7 text-xs",
              onClick: () => void refetchFlows(),
              "data-ocid": "script-executor.refresh-registry-button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                "Refresh"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px] space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Select Flow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedFlowId || "__none__",
              onValueChange: (v) => {
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
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-9",
                    "data-ocid": "script-executor.flow-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a flow…" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-[300px] overflow-y-auto", children: flowsLoading && flows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__loading__", disabled: true, children: "Loading flows…" }) : flows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__empty__", disabled: true, children: "No flows available" }) : flows.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: f.id, children: [
                  f.isRegistration ? "⭐ " : "",
                  f.name
                ] }, f.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 min-w-[160px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Execution Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-lg border border-border overflow-hidden h-9", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setExecMode("auto"),
                className: `flex-1 text-xs font-medium px-3 transition-colors ${execMode === "auto" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted/50"}`,
                "data-ocid": "script-executor.mode.auto",
                children: "Auto-Run"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setExecMode("step"),
                className: `flex-1 text-xs font-medium px-3 transition-colors border-l border-border ${execMode === "step" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted/50"}`,
                "data-ocid": "script-executor.mode.step",
                children: "Step-by-Step"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: execMode === "auto" ? runAutoMode : startStepMode,
            disabled: running || !selectedFlowId,
            className: "gap-2 h-9",
            "data-ocid": "script-executor.run-flow-button",
            children: [
              running ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
              running ? "Running…" : "Run Flow"
            ]
          }
        )
      ] }),
      selectedFlow && !running && !runComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: selectedFlow.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: stepsFetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
            " Loading steps…"
          ] }) : `${stepsToUse.length} step${stepsToUse.length !== 1 ? "s" : ""}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5", children: [
          stepsToUse.slice(0, 8).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground", children: s.stepName }),
                stepTypeBadge(s.stepType)
              ]
            },
            `${s.stepIndex}-${i}`
          )),
          stepsToUse.length > 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground col-span-2", children: [
            "…and ",
            stepsToUse.length - 8,
            " more"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: setActiveTab,
        "data-ocid": "script-executor.tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "run", "data-ocid": "script-executor.tab.run", children: "Live Run" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "history", "data-ocid": "script-executor.tab.history", children: [
              "Execution History",
              historyRecords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full font-semibold", children: historyRecords.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "flow-history",
                "data-ocid": "script-executor.tab.flow-history",
                children: "Flow History"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "run", className: "mt-4 space-y-4", children: [
            (running || runComplete) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": "script-executor.progress", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: running ? "Running…" : "Complete" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-full rounded-full transition-all duration-300 ${running ? "bg-primary" : failed === 0 ? "bg-emerald-500" : "bg-amber-500"}`,
                  style: { width: `${progress}%` }
                }
              ) })
            ] }),
            inStepMode && currentSbsStep && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                    "Step ",
                    stepByStepIdx + 1,
                    " of ",
                    stepByStepSteps.length
                  ] }),
                  stepTypeBadge(currentSbsStep.stepType)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base text-foreground", children: currentSbsStep.stepName }),
                currentSbsStep.promptText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: currentSbsStep.promptText }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Auto-generated test value" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-sm font-mono text-foreground block", children: currentSbsStep.testValue || "(empty)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => advanceStep(),
                      disabled: stepRunning,
                      className: "gap-2",
                      "data-ocid": "script-executor.next-step-button",
                      children: [
                        stepRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
                        stepRunning ? "Running…" : "Use This Value"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => setRetryStep({
                        stepIdx: stepByStepIdx,
                        value: currentSbsStep.testValue
                      }),
                      disabled: stepRunning,
                      "data-ocid": "script-executor.override-value-button",
                      children: "Override Value"
                    }
                  )
                ] }),
                (retryStep == null ? void 0 : retryStep.stepIdx) === stepByStepIdx && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 pt-1",
                    "data-ocid": "script-executor.override-input",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: retryValue,
                          onChange: (e) => setRetryValue(e.target.value),
                          placeholder: `Override value for step ${stepByStepIdx + 1}…`,
                          className: "h-8 text-sm",
                          "data-ocid": "script-executor.retry-input",
                          onKeyDown: (e) => {
                            if (e.key === "Enter") handleRetry();
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          onClick: handleRetry,
                          disabled: stepRunning,
                          "data-ocid": "script-executor.retry-button",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ]
                  }
                )
              ] }),
              completedSteps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-4 py-3 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Completed Steps" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pr-3", children: completedSteps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(LiveStepCard, { step: s }, s.stepIndex)) }) })
              ] })
            ] }),
            (liveSteps.length > 0 || running) && execMode === "auto" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-2xl overflow-hidden",
                "data-ocid": "script-executor.live_feed",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-muted/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      running ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 text-primary animate-spin" }) : failed === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-amber-500" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: (selectedFlow == null ? void 0 : selectedFlow.name) ?? selectedFlowId })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-500 font-semibold", children: [
                        liveSteps.filter((s) => s.status === "pass").length,
                        " ✓"
                      ] }),
                      liveSteps.filter((s) => s.status === "fail").length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-400 font-semibold", children: [
                        liveSteps.filter((s) => s.status === "fail").length,
                        " ✗"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                        ((running ? elapsedMs : (runResult == null ? void 0 : runResult.totalMs) ?? 0) / 1e3).toFixed(1),
                        "s"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "p-4 space-y-2",
                      "data-ocid": "script-executor.live_feed.steps",
                      children: [
                        liveSteps.length === 0 && running && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-4 text-xs text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
                          "Initialising run…"
                        ] }),
                        liveSteps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(LiveStepCard, { step: s }, s.stepIndex)),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: liveEndRef })
                      ]
                    }
                  ) })
                ]
              }
            ),
            runComplete && runResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `border rounded-2xl overflow-hidden ${failed === 0 ? "border-emerald-200 dark:border-emerald-800" : "border-amber-200 dark:border-amber-800"}`,
                "data-ocid": "script-executor.run-complete",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `px-5 py-4 ${failed === 0 ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-amber-50 dark:bg-amber-950/20"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                            failed === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-600" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-amber-600" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base text-foreground", children: "Run Complete" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: runResult.flowName })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                size: "sm",
                                variant: "outline",
                                onClick: handleSaveRun,
                                className: "gap-1.5 h-8",
                                "data-ocid": "script-executor.save-run-button",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                                  "Save Run"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                size: "sm",
                                variant: "ghost",
                                onClick: downloadLog,
                                className: "gap-1.5 h-8",
                                "data-ocid": "script-executor.download-log-button",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                                  "Export"
                                ]
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3 mt-4", children: [
                          {
                            label: "Total Steps",
                            value: runResult.steps.length,
                            color: "text-foreground"
                          },
                          {
                            label: "Passed",
                            value: passed,
                            color: "text-emerald-600 dark:text-emerald-400"
                          },
                          {
                            label: "Failed",
                            value: failed,
                            color: failed > 0 ? "text-red-500" : "text-muted-foreground"
                          },
                          {
                            label: "Time",
                            value: `${(runResult.totalMs / 1e3).toFixed(2)}s`,
                            color: "text-foreground"
                          }
                        ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "bg-background/60 rounded-xl p-3 text-center",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-bold text-lg ${color}`, children: value }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label })
                            ]
                          },
                          label
                        )) })
                      ]
                    }
                  ),
                  runResult.entitiesCreated.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-t border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Data Created" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: runResult.entitiesCreated.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `/data-explorer?table=${encodeURIComponent(e.entityType)}&highlight=${encodeURIComponent(e.entityId)}`,
                        className: "text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors underline-offset-2 hover:underline cursor-pointer",
                        "data-ocid": `script-executor.entity.${i + 1}`,
                        title: `Open ${e.entityType} in Data Explorer`,
                        children: [
                          e.entityType,
                          ": ",
                          e.entityId
                        ]
                      },
                      `${e.entityType}-${e.entityId}-${i}`
                    )) })
                  ] }),
                  runResult.savedSummary && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-t border-border bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "✓ Saved to Execution History —",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                      "Run ID: ",
                      runResult.savedSummary.runId.slice(0, 12),
                      "…"
                    ] })
                  ] }) })
                ]
              }
            ),
            !running && !runComplete && liveSteps.length === 0 && !inStepMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-16 text-center gap-3",
                "data-ocid": "script-executor.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { className: "w-7 h-7 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Ready to Execute" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-sm", children: [
                    "Select a flow and click ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Run Flow" }),
                    " to execute it with auto-generated test values. Each step calls the real backend and shows bot responses live."
                  ] }),
                  flows.length === 0 && !flowsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg", children: "No flows loaded — make sure the backend is deployed and the unified registry is seeded." })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "history", className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                historyRecords.length,
                " past run",
                historyRecords.length !== 1 ? "s" : ""
              ] }),
              historyRecords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: handleClearHistory,
                  className: "text-muted-foreground hover:text-destructive gap-1.5 h-7 text-xs",
                  "data-ocid": "script-executor.clear-history-button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                    "Clear History"
                  ]
                }
              )
            ] }),
            historyRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
                "data-ocid": "script-executor.history.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No runs recorded yet." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Run a flow and click Save Run to see it here." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: historyRecords.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryRow, { record: r, index: i }, r.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "flow-history", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PerFlowHistory,
            {
              flows,
              historyRecords,
              selectedFlowId,
              onSelectFlow: setSelectedFlowId
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  ScriptExecutorPage as default
};
