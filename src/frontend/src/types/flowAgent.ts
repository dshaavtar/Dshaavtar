// ─── Flow Agent Types ─────────────────────────────────────────────────────────

export interface FlowHealthSummary {
  totalFlows: number;
  passed: number;
  failed: number;
  issuesFound: number;
  healthScore: number;
  lastRunAt?: number;
  runningRunId?: string;
}

export interface FlowAgentRun {
  id: string;
  startedAt: number;
  completedAt?: number;
  flowsChecked: number;
  passed: number;
  failed: number;
  issuesFound: number;
  status: "pending" | "running" | "completed" | "stopped" | "failed";
  triggeredBy: string;
  targetFlows?: string[];
}

export interface StepDiagnostic {
  stepNumber: number;
  node: string;
  inputReceived: string;
  expectedInput: string;
  output: string;
  expectedOutput: string;
  status: "pass" | "fail" | "skip";
  issueType?: string;
  diagnosticMessage?: string;
}

export interface FlowIssue {
  id: string;
  severity: "critical" | "warning" | "info";
  affectedNode: string;
  rootCause: string;
  downstreamImpact: string;
  suggestedFix?: string;
  /** Special issue types for richer UI display */
  issueType?: "date_missing" | "date_issue" | "script_test_fail" | string;
  /** For script_test_fail: step name that failed */
  stepName?: string;
  /** For script_test_fail: what the step expected */
  expectedValue?: string;
  /** For script_test_fail: what was actually received */
  actualValue?: string;
  /** For date_missing/date_issue: which field is affected (e.g. "createdAt") */
  fieldName?: string;
}

export interface FlowFix {
  id: string;
  description: string;
  issueId: string;
  fixType: "config" | "input_mapping" | "output_mapping" | "routing";
  beforeConfig: string;
  afterConfig: string;
  approved: boolean;
  rejected: boolean;
  /** For date fixes: the proposed value to be set */
  proposedValue?: string;
  /** The field name targeted by this fix */
  fieldName?: string;
}

/** Script Executor run result linked from a Flow Agent diagnostic run */
export interface LinkedScriptRunResult {
  flowId: string;
  flowName: string;
  totalSteps: number;
  passed: number;
  failed: number;
  overallResult: "passed" | "failed";
  ranAt: number;
}

export interface FlowDiagnosticResult {
  flowId: string;
  flowName: string;
  passed: boolean;
  healthScore: number;
  steps: StepDiagnostic[];
  issues: FlowIssue[];
  fixes: FlowFix[];
  reTestStatus?: "pending" | "running" | "passed" | "failed";
  reTestRunId?: string;
}

export interface FlowFixStatus {
  flowId: string;
  flowName: string;
  status:
    | "pending_approval"
    | "approved"
    | "rejected"
    | "re_test_running"
    | "re_test_failed"
    | "ready_to_deploy"
    | "deployed";
  reTestPassed?: boolean;
}

export interface ReTestResult {
  flowId: string;
  flowName: string;
  passed: boolean;
  healthScore: number;
  stepsPassed: number;
  stepsFailed: number;
}

export interface AgentDeployment {
  id: string;
  runId: string;
  flowIds: string[];
  fixesApplied: number;
  deployedAt: number;
  deployedBy: string;
  status: "deployed" | "partial" | "failed";
  channelSync: FlowChannelSync;
}

export interface FlowAgentSchedule {
  enabled: boolean;
  intervalHours: number;
  targetFlowId: string;
}

export interface FlowChannelSync {
  whatsapp: boolean;
  telegram: boolean;
  sms: boolean;
}
