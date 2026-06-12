import { _ as useBackendActor, bE as useQuery, ao as useQueryClient, bF as useMutation, r as reactExports, p as ue, c$ as useSaveFlowAgentDiagnostic, d0 as useGetFlowAgentDiagnostics, j as jsxRuntimeExports, ag as getAllRegistryFlows, d1 as isCustomerDependentFlow, d2 as useGetFlowAgentEntitySummary, aN as useGetScriptRunResults } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription } from "./card-Dx8tJeYi.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { a as useOrderedFlows } from "./useRegistryFlows-BarM70x9.js";
import { C as Cpu } from "./cpu-Cr_ioSd5.js";
import { S as Square, R as Rocket } from "./square-ntHUDIFk.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { P as Play } from "./play-CyYdC5Jl.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { A as Activity } from "./activity-RT92R42G.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { D as Database } from "./database-CADlqd_q.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { T as ThumbsDown, a as ThumbsUp } from "./thumbs-up-CgRsiN0l.js";
import { F as FlaskConical } from "./flask-conical-D3ETb8VX.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-IXOTxK3N.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-DYndF6Sn.js";
import "./index-z5OST4d2.js";
import "./check-CO9wi49t.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./chevron-up-BzRcvKHL.js";
import "./index-BNXq-E6T.js";
function ensureFlowTimestamps(flow) {
  const nowNs = BigInt(Date.now()) * BigInt(1e6);
  const createdAt = flow.createdAt && typeof flow.createdAt === "bigint" && flow.createdAt > 0n ? flow.createdAt : nowNs;
  const updatedAt = flow.updatedAt && typeof flow.updatedAt === "bigint" && flow.updatedAt > 0n ? flow.updatedAt : nowNs;
  const rawJson = flow.flowJson;
  let flowJson;
  if (typeof rawJson === "string" && rawJson.trim().startsWith("{")) {
    flowJson = rawJson;
  } else {
    const id = typeof flow.id === "string" ? flow.id : "";
    const name = typeof flow.name === "string" ? flow.name : "";
    const description = typeof flow.description === "string" ? flow.description : `Flow: ${name}`;
    const moduleKey = typeof flow.moduleKey === "string" ? flow.moduleKey : "";
    const triggerPayload = typeof flow.triggerPayload === "string" ? flow.triggerPayload : id;
    const category = typeof flow.category === "string" ? flow.category : "customer";
    const roles = Array.isArray(flow.roles) ? flow.roles : ["all"];
    flowJson = JSON.stringify({
      nodes: [],
      edges: [],
      id,
      name,
      description,
      moduleKey: moduleKey || void 0,
      triggerPayload,
      category,
      roles
    });
  }
  const environment = typeof flow.environment === "string" && flow.environment.trim().length > 0 ? flow.environment : "live";
  let version;
  if (typeof flow.version === "bigint" && flow.version >= 0n) {
    version = flow.version;
  } else if (typeof flow.version === "number" && flow.version >= 0) {
    version = BigInt(Math.floor(flow.version));
  } else {
    version = 1n;
  }
  return { ...flow, createdAt, updatedAt, flowJson, environment, version };
}
function useFlowHealthSummary() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["flow-health-summary"],
    queryFn: async () => {
      if (!actor) return defaultHealthSummary();
      try {
        const actorAny = actor;
        if (typeof actorAny.getFlowHealthSummary === "function") {
          const result = await actorAny.getFlowHealthSummary();
          return mapHealthSummary(result);
        }
      } catch {
      }
      return defaultHealthSummary();
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4,
    refetchInterval: 3e4
  });
}
function useListAgentRuns(limit = 20) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["agent-runs", limit],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor;
        if (typeof actorAny.listAgentRuns === "function") {
          const runs = await actorAny.listAgentRuns(BigInt(limit));
          return (runs ?? []).map(mapAgentRun);
        }
      } catch {
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 15e3
  });
}
function useGetFlowDiagnostics(runId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["flow-diagnostics", runId],
    queryFn: async () => {
      if (!actor || !runId) return [];
      try {
        const actorAny = actor;
        if (typeof actorAny.getFlowDiagnostics === "function") {
          const results = await actorAny.getFlowDiagnostics(runId);
          return (results ?? []).map(mapDiagnosticResult);
        }
      } catch {
      }
      return [];
    },
    enabled: !!actor && !isFetching && !!runId,
    staleTime: 15e3
  });
}
function extractRunId(result) {
  if (typeof result === "string" && result.trim() !== "") {
    return result;
  }
  if (result && typeof result === "object") {
    const r = result;
    const id = r.runId ?? r.id ?? r.run_id ?? "";
    if (typeof id === "string" && id.trim() !== "") return id;
    if (typeof id === "bigint") return id.toString();
    if (typeof id === "number") return String(id);
  }
  return `run-${Date.now()}`;
}
function useRunFlowDiagnostics() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (flowIds) => {
      if (!actor)
        throw new Error("Actor not ready — please wait and try again");
      const actorAny = actor;
      if (typeof actorAny.runFlowDiagnostics !== "function") {
        return { runId: `run-${Date.now()}` };
      }
      const safeFlowIds = Array.isArray(flowIds) && flowIds.length > 0 ? flowIds : [];
      try {
        const result = await actorAny.runFlowDiagnostics(safeFlowIds, "admin");
        return { runId: extractRunId(result) };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Diagnostic run failed";
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["flow-health-summary"] });
      qc.invalidateQueries({ queryKey: ["agent-runs"] });
    }
  });
}
function useStopAgentRun() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (runId) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.stopAgentRun === "function") {
        await actorAny.stopAgentRun(runId);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["agent-runs"] })
  });
}
function useApproveFlowFixes() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      runId,
      flowId,
      fixIds
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.approveFlowFixes === "function") {
        await actorAny.approveFlowFixes(runId, flowId, fixIds);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["flow-fix-status"] });
      qc.invalidateQueries({ queryKey: ["flow-diagnostics"] });
    }
  });
}
function useRejectFlowFixes() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      runId,
      flowId,
      reason
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.rejectFlowFixes === "function") {
        await actorAny.rejectFlowFixes(runId, flowId, reason ?? "");
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["flow-fix-status"] })
  });
}
function useApplyApprovedFixes() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      runId,
      flowId
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.applyApprovedFixes === "function") {
        const result = await actorAny.applyApprovedFixes(runId, flowId);
        if (result && typeof result === "object") {
          const r = result;
          const id = r.reTestRunId ?? r.reTestId ?? r.id ?? r.run_id ?? "";
          return { reTestRunId: String(id) };
        }
        if (typeof result === "string" && result.trim() !== "") {
          return { reTestRunId: result };
        }
        return { reTestRunId: `retest-${Date.now()}` };
      }
      return { reTestRunId: `retest-${Date.now()}` };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["flow-fix-status"] });
      qc.invalidateQueries({ queryKey: ["retest-results"] });
    }
  });
}
function useGetFlowFixStatus(runId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["flow-fix-status", runId],
    queryFn: async () => {
      if (!actor || !runId) return [];
      try {
        const actorAny = actor;
        if (typeof actorAny.getFlowFixStatus === "function") {
          const result = await actorAny.getFlowFixStatus(runId);
          return (result ?? []).map(mapFixStatus);
        }
      } catch {
      }
      return [];
    },
    enabled: !!actor && !isFetching && !!runId,
    staleTime: 1e4
  });
}
function useDeployFixesToLive() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      runId,
      flowIds
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.deployFixesToLive === "function") {
        const result = await actorAny.deployFixesToLive(runId, flowIds);
        return mapDeployment(result);
      }
      return {
        id: `deploy-${Date.now()}`,
        runId,
        flowIds,
        fixesApplied: flowIds.length,
        deployedAt: Date.now(),
        deployedBy: "admin",
        status: "deployed",
        channelSync: { whatsapp: true, telegram: true, sms: true }
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["deployment-history"] });
      qc.invalidateQueries({ queryKey: ["flow-health-summary"] });
    }
  });
}
function useGetDeploymentHistory(limit = 20) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["deployment-history", limit],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor;
        if (typeof actorAny.getDeploymentHistory === "function") {
          const results = await actorAny.getDeploymentHistory(BigInt(limit));
          return (results ?? []).map(mapDeployment);
        }
      } catch {
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useGetAgentSchedule() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["agent-schedule"],
    queryFn: async () => {
      if (!actor)
        return { enabled: false, intervalHours: 24, targetFlowId: "all" };
      try {
        const actorAny = actor;
        if (typeof actorAny.getAgentSchedule === "function") {
          const result = await actorAny.getAgentSchedule();
          const r = result;
          return {
            enabled: Boolean((r == null ? void 0 : r.enabled) ?? false),
            intervalHours: Number((r == null ? void 0 : r.intervalHours) ?? 24),
            targetFlowId: String((r == null ? void 0 : r.targetFlowId) ?? "all")
          };
        }
      } catch {
      }
      return { enabled: false, intervalHours: 24, targetFlowId: "all" };
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useSetAgentSchedule() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (schedule) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.setAgentSchedule === "function") {
        await actorAny.setAgentSchedule(schedule);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["agent-schedule"] })
  });
}
function useGetChannelSync() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["agent-channel-sync"],
    queryFn: async () => {
      if (!actor) return { whatsapp: true, telegram: true, sms: true };
      try {
        const actorAny = actor;
        if (typeof actorAny.getAgentChannelSync === "function") {
          const result = await actorAny.getAgentChannelSync();
          const r = result;
          return {
            whatsapp: Boolean((r == null ? void 0 : r.whatsapp) ?? true),
            telegram: Boolean((r == null ? void 0 : r.telegram) ?? true),
            sms: Boolean((r == null ? void 0 : r.sms) ?? true)
          };
        }
      } catch {
      }
      return { whatsapp: true, telegram: true, sms: true };
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useConfigureChannelSync() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sync) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.configureAgentChannelSync === "function") {
        await actorAny.configureAgentChannelSync(sync);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["agent-channel-sync"] })
  });
}
function defaultHealthSummary() {
  return {
    totalFlows: 0,
    passed: 0,
    failed: 0,
    issuesFound: 0,
    healthScore: 100,
    lastRunAt: void 0,
    runningRunId: void 0
  };
}
function mapHealthSummary(raw) {
  const r = raw ?? {};
  return {
    totalFlows: Number(r.totalFlows ?? 0),
    passed: Number(r.passed ?? 0),
    failed: Number(r.failed ?? 0),
    issuesFound: Number(r.issuesFound ?? 0),
    healthScore: Number(r.healthScore ?? 100),
    lastRunAt: r.lastRunAt ? Number(r.lastRunAt) : void 0,
    runningRunId: r.runningRunId ? String(r.runningRunId) : void 0
  };
}
function mapAgentRun(raw) {
  const r = raw ?? {};
  return {
    id: String(r.id ?? ""),
    startedAt: Number(r.startedAt ?? Date.now()),
    completedAt: r.completedAt ? Number(r.completedAt) : void 0,
    flowsChecked: Number(r.flowsChecked ?? 0),
    passed: Number(r.passed ?? 0),
    failed: Number(r.failed ?? 0),
    issuesFound: Number(r.issuesFound ?? 0),
    status: String(r.status ?? "pending"),
    triggeredBy: String(r.triggeredBy ?? "admin"),
    targetFlows: Array.isArray(r.targetFlows) ? r.targetFlows : void 0
  };
}
function mapDiagnosticResult(raw) {
  const r = raw ?? {};
  const steps = Array.isArray(r.steps) ? r.steps.map((s) => {
    const step = s ?? {};
    return {
      stepNumber: Number(step.stepNumber ?? 0),
      node: String(step.node ?? step.stepId ?? "step"),
      inputReceived: String(step.inputReceived ?? ""),
      expectedInput: String(step.expectedInput ?? ""),
      output: String(step.output ?? ""),
      expectedOutput: String(step.expectedOutput ?? ""),
      status: String(step.status ?? "pass"),
      issueType: step.issueType ? String(step.issueType) : void 0,
      diagnosticMessage: step.diagnosticMessage ? String(step.diagnosticMessage) : step.error ? String(step.error) : step.details ? String(step.details) : void 0
    };
  }) : [];
  const issues = Array.isArray(r.issues) ? r.issues.map((i) => {
    const issue = i ?? {};
    return {
      id: String(issue.id ?? `issue-${Math.random()}`),
      severity: String(issue.severity ?? "warning"),
      affectedNode: String(issue.affectedNode ?? ""),
      rootCause: String(
        issue.rootCause ?? issue.description ?? "Unknown issue"
      ),
      downstreamImpact: String(issue.downstreamImpact ?? ""),
      suggestedFix: issue.suggestedFix ? String(issue.suggestedFix) : "Auto-fix available",
      issueType: issue.issueType ? String(issue.issueType) : void 0,
      stepName: issue.stepName ? String(issue.stepName) : void 0,
      expectedValue: issue.expectedValue ? String(issue.expectedValue) : void 0,
      actualValue: issue.actualValue ? String(issue.actualValue) : void 0,
      fieldName: issue.fieldName ? String(issue.fieldName) : void 0
    };
  }) : [];
  const fixes = Array.isArray(r.fixes) ? r.fixes.map((f) => {
    const fix = f ?? {};
    return {
      id: String(fix.id ?? `fix-${Math.random()}`),
      description: String(fix.description ?? "Auto-fix"),
      issueId: String(fix.issueId ?? ""),
      fixType: String(fix.fixType ?? "config"),
      beforeConfig: String(fix.beforeConfig ?? "{}"),
      afterConfig: String(fix.afterConfig ?? "{}"),
      approved: Boolean(fix.approved ?? false),
      rejected: Boolean(fix.rejected ?? false),
      proposedValue: fix.proposedValue ? String(fix.proposedValue) : "Auto-set",
      fieldName: fix.fieldName ? String(fix.fieldName) : void 0
    };
  }) : [];
  return {
    flowId: String(r.flowId ?? ""),
    flowName: String(r.flowName ?? ""),
    passed: Boolean(r.passed ?? true),
    healthScore: Number(r.healthScore ?? 100),
    steps,
    issues,
    fixes,
    reTestStatus: r.reTestStatus ? String(r.reTestStatus) : void 0,
    reTestRunId: r.reTestRunId ? String(r.reTestRunId) : void 0
  };
}
function mapFixStatus(raw) {
  const r = raw ?? {};
  return {
    flowId: String(r.flowId ?? ""),
    flowName: String(r.flowName ?? ""),
    status: String(r.status ?? "pending"),
    reTestPassed: r.reTestPassed ? Boolean(r.reTestPassed) : void 0
  };
}
function mapDeployment(raw) {
  const r = raw ?? {};
  const cs = r.channelSync ?? {};
  return {
    id: String(r.id ?? ""),
    runId: String(r.runId ?? ""),
    flowIds: Array.isArray(r.flowIds) ? r.flowIds : [],
    fixesApplied: Number(r.fixesApplied ?? 0),
    deployedAt: Number(r.deployedAt ?? Date.now()),
    deployedBy: String(r.deployedBy ?? "admin"),
    status: String(r.status ?? "deployed"),
    channelSync: {
      whatsapp: Boolean(cs.whatsapp ?? true),
      telegram: Boolean(cs.telegram ?? true),
      sms: Boolean(cs.sms ?? true)
    }
  };
}
function healthColor(score) {
  if (score >= 71) return "bg-green-500";
  if (score >= 41) return "bg-amber-500";
  return "bg-red-500";
}
function healthTextColor(score) {
  if (score >= 71) return "text-green-400";
  if (score >= 41) return "text-amber-400";
  return "text-red-400";
}
function severityBadge(severity) {
  if (severity === "critical")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30", children: "Critical" });
  if (severity === "warning")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/20 text-amber-400 border-amber-500/30", children: "Warning" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/20 text-blue-400 border-blue-500/30", children: "Info" });
}
function statusBadge(status) {
  const map = {
    healthy: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30", children: "Healthy" }),
    warning: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/20 text-amber-400 border-amber-500/30", children: "Warning" }),
    critical: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30", children: "Critical" }),
    pass: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30", children: "Pass" }),
    fail: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30", children: "Fail" }),
    skip: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-slate-500/20 text-slate-400 border-slate-500/30", children: "Skip" }),
    running: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/20 text-blue-400 border-blue-500/30", children: "Running" }),
    completed: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30", children: "Completed" }),
    pending: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-slate-500/20 text-slate-400 border-slate-500/30", children: "Pending" }),
    stopped: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-500/20 text-orange-400 border-orange-500/30", children: "Stopped" }),
    failed: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30", children: "Failed" }),
    blocked: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-500/20 text-orange-400 border-orange-500/30", children: "Blocked" }),
    pending_approval: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/20 text-amber-400 border-amber-500/30", children: "Pending Approval" }),
    approved: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/20 text-blue-400 border-blue-500/30", children: "Approved" }),
    rejected: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30", children: "Rejected" }),
    re_test_running: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-500/20 text-purple-400 border-purple-500/30", children: "Re-testing" }),
    re_test_failed: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30", children: "Re-test Failed" }),
    ready_to_deploy: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30", children: "Ready to Deploy" }),
    deployed: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-teal-500/20 text-teal-400 border-teal-500/30", children: "Deployed" })
  };
  return map[status] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-slate-500/20 text-slate-400", children: status });
}
function HealthBar({ score }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `h-2 rounded-full transition-all ${healthColor(score)}`,
      style: { width: `${Math.max(2, score)}%` }
    }
  ) });
}
function StatCard({
  label,
  value,
  icon: Icon,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${color}`, children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-8 h-8 opacity-50 ${color}` })
  ] }) }) });
}
function JsonDiff({ before, after }) {
  let beforeObj = before;
  let afterObj = after;
  try {
    beforeObj = JSON.parse(before);
  } catch {
  }
  try {
    afterObj = JSON.parse(after);
  } catch {
  }
  const beforeStr = typeof beforeObj === "string" ? beforeObj : JSON.stringify(beforeObj, null, 2);
  const afterStr = typeof afterObj === "string" ? afterObj : JSON.stringify(afterObj, null, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-mono rounded-md overflow-hidden border border-border", children: [
    beforeStr.split("\n").map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-3 py-0.5 bg-red-950/40 text-red-300",
        children: [
          "- ",
          line
        ]
      },
      `b-${index}-${line}`
    )),
    afterStr.split("\n").map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-3 py-0.5 bg-green-950/40 text-green-300",
        children: [
          "+ ",
          line
        ]
      },
      `a-${index}-${line}`
    ))
  ] });
}
function IssueTypeIndicator({ issue }) {
  const type = issue.issueType ?? "";
  if (type === "date_missing" || type === "date_issue") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-start gap-2 rounded-md bg-amber-500/10 border border-amber-500/20 px-2.5 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-amber-300 mb-0.5", children: [
          "Date Field Missing:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: issue.fieldName ?? "timestamp" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-amber-400/80", children: [
          "Proposed fix: Set",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: issue.fieldName ?? "createdAt" }),
          " ",
          "to current timestamp (ms)"
        ] })
      ] })
    ] });
  }
  if (type === "script_test_fail") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-start gap-2 rounded-md bg-red-500/10 border border-red-500/20 px-2.5 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs min-w-0 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-red-300", children: [
          "Script Executor test failure",
          issue.stepName ? `: ${issue.stepName}` : ""
        ] }),
        issue.expectedValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-400/80", children: [
          "Expected:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-red-300", children: issue.expectedValue })
        ] }),
        issue.actualValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-400/80", children: [
          "Received:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-red-300", children: issue.actualValue })
        ] })
      ] })
    ] });
  }
  return null;
}
function FixTypeChip({ fix }) {
  var _a, _b, _c;
  const isDateFix = ((_a = fix.fieldName) == null ? void 0 : _a.includes("At")) || ((_b = fix.fieldName) == null ? void 0 : _b.includes("date")) || ((_c = fix.fieldName) == null ? void 0 : _c.includes("time")) || fix.proposedValue === "Auto-set";
  if (isDateFix && fix.fieldName) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-amber-400/90 mt-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Sets ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: fix.fieldName }),
        " → current timestamp"
      ] })
    ] });
  }
  return null;
}
function ScriptResultsTab({ linkedRunId }) {
  const { data: allHistory = [], isLoading } = useGetScriptRunResults();
  const totalRuns = allHistory.length;
  const passedRuns = allHistory.filter(
    (r) => r.overallResult === "passed"
  ).length;
  const failedRuns = totalRuns - passedRuns;
  const successRate = totalRuns > 0 ? Math.round(passedRuns / totalRuns * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-0.5", children: "Script Executor Results" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Script Executor results triggered by the Flow Agent. Results are saved automatically each time a diagnostic run executes flows.",
        linkedRunId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-mono text-purple-400", children: [
          "(Active run: ",
          linkedRunId.slice(0, 8),
          "…)"
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-2",
        "data-ocid": "flow_agent.script_results.loading_state",
        children: ["sr1", "sr2", "sr3"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-lg" }, sk))
      }
    ) : allHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-14 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border",
        "data-ocid": "flow_agent.script_results.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-9 h-9 mx-auto mb-2 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "No Script Executor results yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Run diagnostics to trigger Script Executor tests. Results appear here automatically." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 p-3.5 bg-card border border-border rounded-xl text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            totalRuns,
            " runs"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-green-400", children: [
          passedRuns,
          " passed"
        ] }),
        failedRuns > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-red-400", children: [
            failedRuns,
            " failed"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            className: successRate >= 80 ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30",
            children: [
              successRate,
              "% pass rate"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "overflow-x-auto rounded-xl border border-border",
          "data-ocid": "flow_agent.script_results.table",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs min-w-[600px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
              "Flow",
              "Run At",
              "Steps",
              "Passed",
              "Failed",
              "Result"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-left px-3 py-2.5 text-muted-foreground font-medium",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: allHistory.map((rec, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-t border-border hover:bg-muted/10 transition-colors",
                "data-ocid": `flow_agent.script_results.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: rec.flowName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono", children: rec.flowId })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground tabular-nums", children: new Date(rec.ranAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit"
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center text-muted-foreground", children: rec.totalSteps }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center font-semibold text-green-400", children: rec.passed }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center font-semibold text-red-400", children: rec.failed > 0 ? rec.failed : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "0" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: rec.overallResult === "passed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30 text-[10px]", children: "PASS" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30 text-[10px]", children: "FAIL" }) })
                ]
              },
              rec.id
            )) })
          ] })
        }
      )
    ] })
  ] });
}
function FlowDiagnosticCard({
  result,
  onViewFixes
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardHeader,
      {
        className: "cursor-pointer pb-3 pt-4",
        onClick: () => setExpanded((v) => !v),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate text-sm text-foreground", children: result.flowName }),
            result.passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-400 flex-shrink-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0 ml-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HealthBar, { score: result.healthScore }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs font-bold ${healthTextColor(result.healthScore)}`,
                children: [
                  result.healthScore,
                  "%"
                ]
              }
            ),
            result.issues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30 text-xs", children: [
              result.issues.length,
              " issue",
              result.issues.length !== 1 ? "s" : ""
            ] })
          ] })
        ] })
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 pb-4", children: [
      result.steps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Steps" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-md border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs min-w-[700px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
            "#",
            "Node",
            "Input Received",
            "Expected Input",
            "Output",
            "Expected Output",
            "Status",
            "Issue"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-left px-3 py-2 text-muted-foreground font-medium",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: result.steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t border-border hover:bg-muted/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: step.stepNumber }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-purple-300", children: step.node }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-3 py-2 max-w-[120px] truncate",
                    title: step.inputReceived,
                    children: step.inputReceived || "—"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-3 py-2 max-w-[120px] truncate text-muted-foreground",
                    title: step.expectedInput,
                    children: step.expectedInput || "—"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-3 py-2 max-w-[120px] truncate",
                    title: step.output,
                    children: step.output || "—"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-3 py-2 max-w-[120px] truncate text-muted-foreground",
                    title: step.expectedOutput,
                    children: step.expectedOutput || "—"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: statusBadge(step.status) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-3 py-2 text-amber-400 max-w-[140px] truncate",
                    title: step.diagnosticMessage,
                    children: step.diagnosticMessage || "—"
                  }
                )
              ]
            },
            step.stepNumber
          )) })
        ] }) })
      ] }),
      result.issues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Issues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: result.issues.map((issue) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-md bg-muted/30 px-3 py-2 border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                severityBadge(issue.severity),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-purple-300", children: issue.affectedNode })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground mb-0.5", children: issue.rootCause }),
              issue.downstreamImpact && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Impact: ",
                issue.downstreamImpact
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IssueTypeIndicator, { issue })
            ]
          },
          issue.id
        )) })
      ] }),
      result.issues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: () => onViewFixes(result.flowId),
          className: "mt-1",
          "data-ocid": "flow_agent.view_fixes_button",
          children: [
            "View Fixes (",
            result.fixes.length,
            ")"
          ]
        }
      )
    ] })
  ] });
}
function FixApprovalCard({
  result,
  runId
}) {
  const [expandedFix, setExpandedFix] = reactExports.useState(null);
  const approve = useApproveFlowFixes();
  const reject = useRejectFlowFixes();
  const apply = useApplyApprovedFixes();
  function handleApproveAll() {
    if (!runId) return;
    approve.mutate(
      {
        runId,
        flowId: result.flowId,
        fixIds: result.fixes.map((f) => f.id)
      },
      {
        onSuccess: () => {
          ue.success(`All fixes approved for ${result.flowName}`);
          apply.mutate(
            { runId, flowId: result.flowId },
            {
              onSuccess: () => ue.info(`Re-test started for ${result.flowName}`)
            }
          );
        }
      }
    );
  }
  function handleRejectAll() {
    if (!runId) return;
    reject.mutate(
      { runId, flowId: result.flowId, reason: "Rejected by admin" },
      { onSuccess: () => ue.info(`Fixes rejected for ${result.flowName}`) }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-foreground", children: result.flowName }),
          result.reTestStatus && statusBadge(result.reTestStatus)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "border-red-500/30 text-red-400 hover:bg-red-500/10",
              onClick: handleRejectAll,
              disabled: reject.isPending,
              "data-ocid": "flow_agent.reject_all_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3 h-3 mr-1" }),
                "Reject All"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30",
              onClick: handleApproveAll,
              disabled: approve.isPending || apply.isPending,
              "data-ocid": "flow_agent.approve_all_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3 mr-1" }),
                "Approve All & Re-test"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "text-xs mt-1", children: [
        result.issues.length,
        " issue(s) · ",
        result.fixes.length,
        " fix(es) suggested"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: result.fixes.map((fix) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-md border border-border bg-muted/20 overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center justify-between w-full px-3 py-2 hover:bg-muted/30 text-left",
                onClick: () => setExpandedFix(expandedFix === fix.id ? null : fix.id),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-0.5 min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                      expandedFix === fix.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground truncate", children: fix.description })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FixTypeChip, { fix }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs flex-shrink-0 ml-2", children: fix.fixType })
                ]
              }
            ),
            expandedFix === fix.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 pt-1 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Config diff:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(JsonDiff, { before: fix.beforeConfig, after: fix.afterConfig })
            ] })
          ]
        },
        fix.id
      )) }),
      (apply.isPending || result.reTestStatus === "running") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-3 flex items-center gap-2 text-xs text-purple-400",
          "data-ocid": "flow_agent.retest_loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 animate-spin" }),
            "Re-testing flow…"
          ]
        }
      )
    ] })
  ] });
}
function RunEntityBadge({ runId }) {
  const { data: summary } = useGetFlowAgentEntitySummary(runId);
  if (!summary) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" });
  const total = (summary.customersCreated ?? 0) + (summary.merchantsCreated ?? 0) + (summary.ordersCreated ?? 0);
  if (total === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "0" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px]", children: [
    total,
    " records"
  ] });
}
function EntityPersistenceSummary({ runId }) {
  const { data: summary, isLoading } = useGetFlowAgentEntitySummary(runId);
  if (isLoading) return null;
  if (!summary) return null;
  const total = (summary.customersCreated ?? 0) + (summary.merchantsCreated ?? 0) + (summary.ordersCreated ?? 0);
  if (total === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-md",
      "data-ocid": "flow_agent.entity_summary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5 text-blue-400 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-blue-400", children: "Data Created by This Run" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] text-blue-300 font-medium", children: [
            total,
            " records saved"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 flex-wrap", children: [
          summary.customersCreated > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 text-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Customers created: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-300", children: summary.customersCreated })
          ] }),
          summary.merchantsCreated > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 text-purple-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Merchants created: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-purple-300", children: summary.merchantsCreated })
          ] }),
          summary.ordersCreated > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3 h-3 text-green-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Orders created: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-green-300", children: summary.ordersCreated })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "/admin/data-explorer?table=users",
            className: "text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5 underline underline-offset-2",
            "data-ocid": "flow_agent.entity_summary.view_customers_link",
            children: [
              "View in Data Explorer",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 ml-0.5" })
            ]
          }
        ) })
      ]
    }
  );
}
function FlowAgentPage() {
  var _a, _b, _c, _d;
  const [activeTab, setActiveTab] = reactExports.useState("dashboard");
  const [selectedRunId, setSelectedRunId] = reactExports.useState("");
  const [selectedFlowId, setSelectedFlowId] = reactExports.useState("all-flows");
  const [fixApprovalRunId, setFixApprovalRunId] = reactExports.useState("");
  const [syncStatus, setSyncStatus] = reactExports.useState("idle");
  const [syncWarning, setSyncWarning] = reactExports.useState("");
  const [runError, setRunError] = reactExports.useState("");
  const [runSuccess, setRunSuccess] = reactExports.useState("");
  const syncDoneRef = reactExports.useRef(false);
  const orderedAllFlows = useOrderedFlows();
  const allFlows = orderedAllFlows;
  const { actor, isFetching: actorFetching } = useBackendActor();
  reactExports.useEffect(() => {
    if (!actor || actorFetching) return;
    if (syncDoneRef.current) return;
    let cancelled = false;
    async function syncFlows() {
      setSyncStatus("syncing");
      setSyncWarning("");
      try {
        const rawFlows = getAllRegistryFlows();
        const flows = rawFlows.map((f) => {
          const stamped = ensureFlowTimestamps(
            f
          );
          return {
            id: stamped.id,
            name: stamped.name,
            flowJson: stamped.flowJson,
            environment: stamped.environment,
            createdAt: stamped.createdAt,
            updatedAt: stamped.updatedAt,
            version: stamped.version
          };
        });
        const actorAny = actor;
        if (typeof actorAny.saveFlowsBatch === "function") {
          await actorAny.saveFlowsBatch(flows);
        } else if (typeof actorAny.saveFlow === "function") {
          for (const flow of flows) {
            await actorAny.saveFlow(flow);
          }
        }
        if (!cancelled) {
          syncDoneRef.current = true;
          setSyncStatus("done");
        }
      } catch (err) {
        if (!cancelled) {
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
  const handleRunDiagnostics = reactExports.useCallback(
    (mode) => {
      setRunError("");
      setRunSuccess("");
      if (syncStatus === "syncing") {
        ue.info("Flows are still syncing — please wait a moment");
        return;
      }
      const flowIds = mode === "all" || selectedFlowId === "all-flows" ? [] : [selectedFlowId];
      runDiagnostics.mutate(flowIds, {
        onSuccess: (data) => {
          const runData = data;
          if (!runData.runId) {
            setRunError(
              "Diagnostic started but no run ID was returned. Check the History tab."
            );
            return;
          }
          setSelectedRunId(runData.runId);
          setFixApprovalRunId(runData.runId);
          setRunSuccess(
            `Run complete (ID: ${runData.runId.slice(0, 8)}…) — check Diagnostics tab for results.`
          );
          ue.success(
            `Diagnostics run started (ID: ${runData.runId.slice(0, 8)}…)`
          );
          if (Array.isArray(runData.diagnostics)) {
            for (const item of runData.diagnostics) {
              saveFlowAgentDiagnostic.mutate({
                diagnosticId: `${data.runId}-${Math.random().toString(36).slice(2, 9)}`,
                flowId: item.flowId ?? data.runId,
                flowName: item.flowName ?? "Unknown Flow",
                issue: item.issue ?? "",
                severity: item.severity ?? "info",
                proposedFix: item.proposedFix ?? "",
                fixStatus: "proposed",
                timestamp: Date.now()
              });
            }
          }
          setActiveTab("diagnostics");
        },
        onError: (err) => {
          const msg = err instanceof Error ? err.message : "Failed to start diagnostics";
          setRunError(msg);
          ue.error(msg);
        }
      });
    },
    [syncStatus, selectedFlowId, runDiagnostics]
  );
  const saveFlowAgentDiagnostic = useSaveFlowAgentDiagnostic();
  const { data: savedDiagnostics = [] } = useGetFlowAgentDiagnostics();
  function handleDeploy() {
    const readyFlows = fixStatuses.filter((f) => f.status === "ready_to_deploy").map((f) => f.flowId);
    if (!readyFlows.length) {
      ue.error("No flows are ready to deploy");
      return;
    }
    deployFixes.mutate(
      { runId: selectedRunId, flowIds: readyFlows },
      {
        onSuccess: () => ue.success("Fixes deployed to live!"),
        onError: () => ue.error("Deploy failed")
      }
    );
  }
  const allReadyToDeploy = fixStatuses.length > 0 && fixStatuses.every(
    (f) => f.status === "ready_to_deploy" || f.status === "deployed"
  );
  const isBusy = runDiagnostics.isPending || !!activeRun || syncStatus === "syncing";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full bg-background",
      "data-ocid": "flow_agent.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 px-6 pt-6 pb-4 border-b border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-5 h-5 text-purple-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground leading-tight", children: "Flow Health Agent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Automated flow analysis, fix suggestions & deployment" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              activeRun && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "border-red-500/30 text-red-400 hover:bg-red-500/10",
                  onClick: () => stopRun.mutate(activeRun.id),
                  "data-ocid": "flow_agent.stop_run_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-3 h-3 mr-1.5" }),
                    "Stop Run"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30",
                  onClick: () => handleRunDiagnostics("all"),
                  disabled: isBusy,
                  "data-ocid": "flow_agent.run_all_button",
                  children: [
                    isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 mr-1.5" }),
                    syncStatus === "syncing" ? "Syncing flows…" : runDiagnostics.isPending ? "Starting…" : `Run All (${orderedAllFlows.length} flows)`
                  ]
                }
              )
            ] })
          ] }),
          syncWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-start gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-md text-xs text-amber-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Sync warning (non-blocking):" }),
              " ",
              syncWarning,
              " — diagnostics will still run."
            ] })
          ] }),
          runSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-3 flex items-start gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-md text-xs text-green-400",
              "data-ocid": "flow_agent.run_success",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: runSuccess })
              ]
            }
          ),
          selectedRunId && runSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(EntityPersistenceSummary, { runId: selectedRunId }),
          runError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-3 flex items-start gap-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-md text-xs text-red-400",
              "data-ocid": "flow_agent.run_error",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Run error:" }),
                  " ",
                  runError.includes("missing key") || runError.includes("createdAt") ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    runError,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mt-0.5 text-red-300", children: "A flow record is missing a required timestamp field. Run diagnostics to detect and auto-fix date issues." })
                  ] }) : runError
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Tabs,
          {
            value: activeTab,
            onValueChange: setActiveTab,
            className: "h-full flex flex-col",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsList,
                {
                  className: "flex-shrink-0 bg-muted/40 border-b border-border rounded-none px-6 h-10 justify-start gap-0",
                  "data-ocid": "flow_agent.tabs",
                  children: [
                    { value: "dashboard", label: "Dashboard" },
                    { value: "diagnostics", label: "Diagnostics" },
                    { value: "fixes", label: "Fix Approval" },
                    { value: "deploy", label: "Deploy" },
                    { value: "script-results", label: "Script Results" },
                    { value: "settings", label: "Settings" },
                    { value: "history", label: "History" },
                    { value: "diag-history", label: "Diagnostic History" }
                  ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      value: tab.value,
                      className: "rounded-none text-xs px-4 h-full data-[state=active]:border-b-2 data-[state=active]:border-purple-400 data-[state=active]:bg-transparent",
                      "data-ocid": `flow_agent.tab.${tab.value}`,
                      children: tab.label
                    },
                    tab.value
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "dashboard", className: "mt-0 p-6 space-y-6", children: [
                  healthQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: ["s1", "s2", "s3", "s4", "s5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, sk)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "grid grid-cols-2 md:grid-cols-5 gap-4",
                      "data-ocid": "flow_agent.summary_cards",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          StatCard,
                          {
                            label: "Total Flows Tested",
                            value: (summary == null ? void 0 : summary.totalFlows) ?? 0,
                            icon: Activity,
                            color: "text-foreground"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          StatCard,
                          {
                            label: "Passed",
                            value: (summary == null ? void 0 : summary.passed) ?? 0,
                            icon: CircleCheckBig,
                            color: "text-green-400"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          StatCard,
                          {
                            label: "Failed",
                            value: (summary == null ? void 0 : summary.failed) ?? 0,
                            icon: CircleX,
                            color: "text-red-400"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          StatCard,
                          {
                            label: "Issues Found",
                            value: (summary == null ? void 0 : summary.issuesFound) ?? 0,
                            icon: TriangleAlert,
                            color: "text-amber-400"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Health Score" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: `text-2xl font-bold ${healthTextColor((summary == null ? void 0 : summary.healthScore) ?? 100)}`,
                              children: [
                                (summary == null ? void 0 : summary.healthScore) ?? 100,
                                "%"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(HealthBar, { score: (summary == null ? void 0 : summary.healthScore) ?? 100 })
                        ] }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Run Diagnostics" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "text-xs", children: [
                        "Select a specific flow or run diagnostics on all",
                        " ",
                        orderedAllFlows.length,
                        " registered flows. Registration flows run first."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Select,
                          {
                            value: selectedFlowId,
                            onValueChange: setSelectedFlowId,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                SelectTrigger,
                                {
                                  className: "bg-muted/30 border-border text-sm",
                                  "data-ocid": "flow_agent.flow_select",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select flow" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-[300px] overflow-y-auto", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: "all-flows", children: [
                                  "All Flows (",
                                  allFlows.length,
                                  ")"
                                ] }),
                                allFlows.filter((f) => f.id && f.id.trim() !== "").map((flow) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: flow.id, children: flow.name }, flow.id))
                              ] })
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            onClick: () => handleRunDiagnostics("selected"),
                            disabled: isBusy,
                            "data-ocid": "flow_agent.run_specific_button",
                            children: [
                              runDiagnostics.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 mr-1.5" }),
                              selectedFlowId === "all-flows" ? "Run All Flows" : "Run Selected"
                            ]
                          }
                        )
                      ] }),
                      syncStatus === "syncing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "mt-3 flex items-center gap-2 text-xs text-purple-400",
                          "data-ocid": "flow_agent.sync_loading_state",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 animate-spin" }),
                            "Syncing ",
                            getAllRegistryFlows().length,
                            " flows to backend… buttons will unlock automatically."
                          ]
                        }
                      ),
                      syncStatus === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-green-400", children: [
                        "✓ ",
                        getAllRegistryFlows().length,
                        " flows synced — ready to run diagnostics."
                      ] })
                    ] })
                  ] }),
                  activeRun && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Card,
                    {
                      className: "bg-purple-900/20 border-purple-500/30",
                      "data-ocid": "flow_agent.active_run_card",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-purple-400 animate-spin" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-purple-300", children: "Diagnostics running…" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            activeRun.flowsChecked,
                            " /",
                            " ",
                            (summary == null ? void 0 : summary.totalFlows) ?? "?",
                            " flows checked"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          HealthBar,
                          {
                            score: (summary == null ? void 0 : summary.totalFlows) ? Math.round(
                              activeRun.flowsChecked / summary.totalFlows * 100
                            ) : 0
                          }
                        ) })
                      ] }) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Flow Health Overview" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: diagnosticsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["h1", "h2", "h3", "h4"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, `skel-health-${sk}`)) }) : diagnostics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "text-center py-10 text-muted-foreground",
                        "data-ocid": "flow_agent.health_table.empty_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: 'No diagnostics data yet. Click "Run Diagnostics" to start.' })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "table",
                      {
                        className: "w-full text-sm min-w-[600px]",
                        "data-ocid": "flow_agent.health_table",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                            "Flow Name",
                            "Status",
                            "Health Score",
                            "Issues",
                            "Last Tested",
                            "Actions"
                          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              className: "text-left px-3 py-2 text-xs text-muted-foreground font-medium",
                              children: h
                            },
                            h
                          )) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: diagnostics.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "tr",
                            {
                              className: "border-t border-border hover:bg-muted/20",
                              "data-ocid": `flow_agent.health_table.item.${idx + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium text-foreground", children: d.flowName }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: d.passed ? statusBadge("healthy") : d.healthScore >= 41 ? statusBadge("warning") : statusBadge("critical") }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HealthBar, { score: d.healthScore }) }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "span",
                                    {
                                      className: `text-xs font-semibold ${healthTextColor(d.healthScore)}`,
                                      children: [
                                        d.healthScore,
                                        "%"
                                      ]
                                    }
                                  )
                                ] }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-amber-400", children: d.issues.length }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs text-muted-foreground", children: "Just now" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Button,
                                  {
                                    size: "sm",
                                    variant: "ghost",
                                    className: "h-6 text-xs text-purple-400",
                                    onClick: () => {
                                      setActiveTab("diagnostics");
                                      setFixApprovalRunId(selectedRunId);
                                    },
                                    "data-ocid": `flow_agent.health_table.edit_button.${idx + 1}`,
                                    children: "View"
                                  }
                                ) })
                              ]
                            },
                            d.flowId
                          )) })
                        ]
                      }
                    ) }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "diagnostics", className: "mt-0 p-6 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Diagnostics for run:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: selectedRunId || "no-run-selected",
                        onValueChange: setSelectedRunId,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              className: "w-64 bg-muted/30 border-border text-sm",
                              "data-ocid": "flow_agent.run_select",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a run" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "no-run-selected", children: "Latest / Most Recent" }),
                            runs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r.id, children: [
                              "Run ",
                              r.id.slice(0, 8),
                              " ·",
                              " ",
                              new Date(r.startedAt).toLocaleString("en-IN", {
                                dateStyle: "short",
                                timeStyle: "short"
                              })
                            ] }, r.id))
                          ] })
                        ]
                      }
                    )
                  ] }),
                  diagnosticsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "space-y-3",
                      "data-ocid": "flow_agent.diagnostics.loading_state",
                      children: ["d1", "d2", "d3"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, sk))
                    }
                  ) : diagnostics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-center py-16 text-muted-foreground",
                      "data-ocid": "flow_agent.diagnostics.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "No diagnostics data" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Run diagnostics from the Dashboard tab to see results here." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            className: "mt-4",
                            onClick: () => {
                              setActiveTab("dashboard");
                              handleRunDiagnostics("all");
                            },
                            disabled: isBusy,
                            "data-ocid": "flow_agent.diagnostics.run_cta",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 mr-1.5" }),
                              "Run Now"
                            ]
                          }
                        )
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    diagnostics.length > 0 && (() => {
                      const registrationFailed = diagnostics.some(
                        (d) => !d.passed && (d.flowId === "customer_registration" || d.flowId === "register_customer")
                      );
                      const passed = diagnostics.filter((d) => d.passed).length;
                      const blocked = registrationFailed ? diagnostics.filter(
                        (d) => isCustomerDependentFlow(d.flowId)
                      ).length : 0;
                      const failed = diagnostics.filter((d) => !d.passed).length - blocked;
                      const issuesTotal = diagnostics.reduce(
                        (sum, d) => sum + d.issues.length,
                        0
                      );
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex flex-wrap items-center gap-4 p-3 bg-card border border-border rounded-xl text-xs",
                          "data-ocid": "flow_agent.diagnostics.summary",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                              diagnostics.length,
                              " flows checked"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-semibold", children: [
                              passed,
                              " passed"
                            ] }),
                            failed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-400 font-semibold", children: [
                                failed,
                                " failed"
                              ] })
                            ] }),
                            blocked > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-orange-400 font-semibold", children: [
                                blocked,
                                " blocked"
                              ] })
                            ] }),
                            issuesTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 font-semibold", children: [
                                issuesTotal,
                                " issues"
                              ] })
                            ] })
                          ]
                        }
                      );
                    })(),
                    [
                      ...diagnostics.filter(
                        (d) => d.flowId === "customer_registration" || d.flowId === "register_customer"
                      ),
                      ...diagnostics.filter(
                        (d) => d.flowId !== "customer_registration" && d.flowId !== "register_customer" && (d.flowId.includes("registration") || d.flowId.includes("register"))
                      ),
                      ...diagnostics.filter(
                        (d) => !d.flowId.includes("registration") && !d.flowId.includes("register")
                      )
                    ].map((result) => {
                      const registrationFailed = diagnostics.some(
                        (d) => !d.passed && (d.flowId === "customer_registration" || d.flowId === "register_customer")
                      );
                      const isBlocked = registrationFailed && isCustomerDependentFlow(result.flowId);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        isBlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]", children: "Blocked — awaits registration" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          FlowDiagnosticCard,
                          {
                            result,
                            runId: selectedRunId,
                            onViewFixes: (_flowId) => {
                              setFixApprovalRunId(selectedRunId);
                              setActiveTab("fixes");
                            }
                          }
                        )
                      ] }, result.flowId);
                    })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "fixes", className: "mt-0 p-6 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Fix suggestions requiring approval" }) }),
                  diagnosticsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "space-y-3",
                      "data-ocid": "flow_agent.fixes.loading_state",
                      children: ["f1", "f2"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, sk))
                    }
                  ) : diagnostics.filter((d) => d.fixes.length > 0).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-center py-16 text-muted-foreground",
                      "data-ocid": "flow_agent.fixes.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "No fixes pending" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "All flows are healthy, or no diagnostics have been run yet." })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: diagnostics.filter((d) => d.fixes.length > 0).map((result) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FixApprovalCard,
                    {
                      result,
                      runId: fixApprovalRunId || selectedRunId
                    },
                    result.flowId
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "deploy", className: "mt-0 p-6 space-y-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Fix Status per Flow" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs", children: "Flows must pass re-test before they can be deployed to live" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: fixStatuses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "text-center py-8 text-muted-foreground",
                        "data-ocid": "flow_agent.deploy.empty_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Approve fixes to see deploy status here." })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "table",
                      {
                        className: "w-full text-sm min-w-[400px]",
                        "data-ocid": "flow_agent.deploy.status_table",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Flow", "Status", "Re-test"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              className: "text-left px-3 py-2 text-xs text-muted-foreground font-medium",
                              children: h
                            },
                            h
                          )) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: fixStatuses.map((fs, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "tr",
                            {
                              className: "border-t border-border",
                              "data-ocid": `flow_agent.deploy.item.${idx + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium text-foreground", children: fs.flowName }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: statusBadge(fs.status) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5", children: [
                                  fs.reTestPassed === true && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
                                  fs.reTestPassed === false && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-400" }),
                                  fs.reTestPassed === void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" })
                                ] })
                              ]
                            },
                            fs.flowId
                          )) })
                        ]
                      }
                    ) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: handleDeploy,
                      disabled: !allReadyToDeploy || deployFixes.isPending,
                      className: "gap-2",
                      "data-ocid": "flow_agent.deploy_button",
                      children: [
                        deployFixes.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-4 h-4" }),
                        "Deploy to Live"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Deployment History" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: deployHistoryQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "space-y-2",
                        "data-ocid": "flow_agent.deploy_history.loading_state",
                        children: ["dh1", "dh2", "dh3"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, sk))
                      }
                    ) : deployHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "text-center py-8 text-muted-foreground",
                        "data-ocid": "flow_agent.deploy_history.empty_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6 mx-auto mb-2 opacity-30" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "No deployments yet" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "table",
                      {
                        className: "w-full text-xs min-w-[600px]",
                        "data-ocid": "flow_agent.deploy_history.table",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                            "Date",
                            "Flows Deployed",
                            "Fixes Applied",
                            "By",
                            "Status",
                            "Channels"
                          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "th",
                            {
                              className: "text-left px-3 py-2 text-muted-foreground font-medium",
                              children: h
                            },
                            h
                          )) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: deployHistory.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "tr",
                            {
                              className: "border-t border-border",
                              "data-ocid": `flow_agent.deploy_history.item.${idx + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: new Date(d.deployedAt).toLocaleString(
                                  "en-IN",
                                  { dateStyle: "short", timeStyle: "short" }
                                ) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: d.flowIds.length }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: d.fixesApplied }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: d.deployedBy }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: statusBadge(d.status) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                                  d.channelSync.whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30 text-[10px] px-1", children: "WA" }),
                                  d.channelSync.telegram && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] px-1", children: "TG" }),
                                  d.channelSync.sms && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] px-1", children: "SMS" })
                                ] }) })
                              ]
                            },
                            d.id
                          )) })
                        ]
                      }
                    ) }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "script-results", className: "mt-0 p-6 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScriptResultsTab, { linkedRunId: selectedRunId }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "settings", className: "mt-0 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg space-y-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }),
                      "Automatic Schedule"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 space-y-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "schedule-enabled",
                            className: "text-sm text-foreground",
                            children: "Enable scheduled runs"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Switch,
                          {
                            id: "schedule-enabled",
                            checked: ((_a = scheduleQuery.data) == null ? void 0 : _a.enabled) ?? false,
                            onCheckedChange: (checked) => setSchedule.mutate({
                              ...scheduleQuery.data ?? {
                                enabled: false,
                                intervalHours: 24,
                                targetFlowId: "all"
                              },
                              enabled: checked
                            }),
                            "data-ocid": "flow_agent.schedule_toggle"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "schedule-interval",
                            className: "text-sm text-foreground flex-shrink-0",
                            children: "Interval (hours)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "schedule-interval",
                            type: "number",
                            min: 1,
                            max: 168,
                            className: "flex h-9 w-24 rounded-md border border-input bg-muted/30 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
                            value: ((_b = scheduleQuery.data) == null ? void 0 : _b.intervalHours) ?? 24,
                            onChange: (e) => setSchedule.mutate({
                              ...scheduleQuery.data ?? {
                                enabled: false,
                                intervalHours: 24,
                                targetFlowId: "all"
                              },
                              intervalHours: Number(e.target.value)
                            }),
                            "data-ocid": "flow_agent.schedule_interval_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "schedule-flow",
                            className: "text-sm text-foreground block mb-1.5",
                            children: "Default flow to test"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Select,
                          {
                            value: (((_c = scheduleQuery.data) == null ? void 0 : _c.targetFlowId) === "all" ? "all-flows" : (_d = scheduleQuery.data) == null ? void 0 : _d.targetFlowId) ?? "all-flows",
                            onValueChange: (v) => setSchedule.mutate({
                              ...scheduleQuery.data ?? {
                                enabled: false,
                                intervalHours: 24,
                                targetFlowId: "all"
                              },
                              targetFlowId: v === "all-flows" ? "all" : v
                            }),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                SelectTrigger,
                                {
                                  className: "bg-muted/30 border-border",
                                  "data-ocid": "flow_agent.schedule_flow_select",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-[280px] overflow-y-auto", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all-flows", children: "All Flows" }),
                                allFlows.filter((f) => f.id && f.id.trim() !== "").map((flow) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: flow.id, children: flow.name }, flow.id))
                              ] })
                            ]
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-muted-foreground" }),
                        "Channel Sync on Deploy"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs", children: "When fixes are deployed, sync updated flows to these channels automatically." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0 space-y-3", children: ["whatsapp", "telegram", "sms"].map((ch) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "label",
                              {
                                htmlFor: `channel-sync-${ch}`,
                                className: "text-sm text-foreground capitalize",
                                children: ch === "sms" ? "SMS" : ch === "whatsapp" ? "WhatsApp" : "Telegram"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Switch,
                              {
                                id: `channel-sync-${ch}`,
                                checked: ((_a2 = channelSyncQuery.data) == null ? void 0 : _a2[ch]) ?? true,
                                onCheckedChange: (checked) => setChannelSync.mutate({
                                  ...channelSyncQuery.data ?? {
                                    whatsapp: true,
                                    telegram: true,
                                    sms: true
                                  },
                                  [ch]: checked
                                }),
                                "data-ocid": `flow_agent.channel_sync_${ch}_toggle`
                              }
                            )
                          ]
                        },
                        ch
                      );
                    }) })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-0 p-6", children: runsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "space-y-2",
                    "data-ocid": "flow_agent.history.loading_state",
                    children: ["r1", "r2", "r3", "r4", "r5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12" }, sk))
                  }
                ) : runs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center py-16 text-muted-foreground",
                    "data-ocid": "flow_agent.history.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "No agent runs yet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Run diagnostics from the Dashboard to build your history." })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-sm min-w-[700px]",
                    "data-ocid": "flow_agent.history.table",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                        "Run ID",
                        "Timestamp",
                        "Flows Checked",
                        "Passed",
                        "Failed",
                        "Issues",
                        "Status",
                        "Records Saved"
                      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className: "text-left px-3 py-2.5 text-xs text-muted-foreground font-medium",
                          children: h
                        },
                        h
                      )) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: runs.map((run, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: "border-t border-border hover:bg-muted/20 cursor-pointer",
                          onClick: () => {
                            setSelectedRunId(run.id);
                            setActiveTab("diagnostics");
                          },
                          onKeyDown: (e) => {
                            if (e.key === "Enter") {
                              setSelectedRunId(run.id);
                              setActiveTab("diagnostics");
                            }
                          },
                          tabIndex: 0,
                          "data-ocid": `flow_agent.history.item.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 font-mono text-xs text-muted-foreground", children: [
                              run.id.slice(0, 12),
                              "…"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs", children: new Date(run.startedAt).toLocaleString("en-IN", {
                              dateStyle: "short",
                              timeStyle: "short"
                            }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center", children: run.flowsChecked }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center text-green-400", children: run.passed }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center text-red-400", children: run.failed }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center text-amber-400", children: run.issuesFound }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: statusBadge(run.status) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RunEntityBadge, { runId: run.id }) })
                          ]
                        },
                        run.id
                      )) })
                    ]
                  }
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "diag-history", className: "mt-0 p-6 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Saved Diagnostic History" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      savedDiagnostics.length,
                      " record",
                      savedDiagnostics.length !== 1 ? "s" : ""
                    ] })
                  ] }),
                  savedDiagnostics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-center py-12 text-muted-foreground text-sm",
                      "data-ocid": "flow_agent.diag_history.empty_state",
                      children: "No diagnostic history yet. Run diagnostics to start recording results."
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "overflow-x-auto rounded-lg border border-border",
                      "data-ocid": "flow_agent.diag_history.table",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-medium text-muted-foreground", children: "Flow" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-medium text-muted-foreground", children: "Issue" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-medium text-muted-foreground", children: "Severity" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-medium text-muted-foreground", children: "Status" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-medium text-muted-foreground", children: "Proposed Fix" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-medium text-muted-foreground", children: "Time" })
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [...savedDiagnostics].sort((a, b) => b.timestamp - a.timestamp).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "tr",
                          {
                            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                            "data-ocid": "flow_agent.diag_history.row",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium text-foreground max-w-[140px] truncate", children: d.flowName }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground max-w-[200px] truncate", children: d.issue }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Badge,
                                {
                                  variant: "outline",
                                  className: d.severity === "critical" ? "border-red-500 text-red-400" : d.severity === "high" ? "border-orange-500 text-orange-400" : d.severity === "medium" ? "border-amber-500 text-amber-400" : "border-blue-500 text-blue-400",
                                  children: d.severity
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Badge,
                                {
                                  variant: "outline",
                                  className: d.fixStatus === "applied" ? "border-green-500 text-green-400" : d.fixStatus === "rejected" ? "border-red-500 text-red-400" : "border-yellow-500 text-yellow-400",
                                  children: d.fixStatus
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground max-w-[200px] truncate", children: d.proposedFix || "—" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground whitespace-nowrap", children: new Date(d.timestamp).toLocaleString() })
                            ]
                          },
                          d.diagnosticId
                        )) })
                      ] })
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  FlowAgentPage as default
};
