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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bot,
  ChevronDown,
  ChevronUp,
  Loader2,
  RefreshCcw,
  RotateCcw,
  User,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetAllFlows,
  useGetFlowSessions,
  useMenuOptionsByRole,
  useSaveFlowSession,
} from "../hooks/useBackend";
// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "customer" | "merchant" | "delivery" | "manufacturer";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  ts: number;
  isError?: boolean;
}

interface StepLogEntry {
  stepIndex: number;
  role: Role;
  input: string;
  response: string;
  dataNote: string;
  ts: number;
}

interface PanelState {
  role: Role;
  messages: ChatMessage[];
  status: "waiting" | "active" | "processing";
  currentStep: number;
  inputValue: string;
}

const ROLE_LABELS: Record<Role, string> = {
  customer: "Customer",
  merchant: "Merchant",
  delivery: "Delivery Partner",
  manufacturer: "Manufacturer",
};

const ROLE_COLORS: Record<Role, string> = {
  customer: "border-blue-500 ring-1 ring-blue-500",
  merchant: "border-emerald-500 ring-1 ring-emerald-500",
  delivery: "border-orange-500 ring-1 ring-orange-500",
  manufacturer: "border-purple-500 ring-1 ring-purple-500",
};

const ROLE_BADGE_COLORS: Record<Role, string> = {
  customer: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  merchant:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  delivery:
    "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  manufacturer:
    "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const ROLES: Role[] = ["customer", "merchant", "delivery", "manufacturer"];

// ── Auto-generate flow test input per step ────────────────────────────────────

const STEP_INPUTS: Record<number, string[]> = {
  0: ["1", "start", "hi"],
  1: ["John Doe", "Test User", "Ravi Kumar"],
  2: ["+919876543210", "+918765432109", "+917654321098"],
  3: ["Mumbai", "Delhi", "Bengaluru"],
  4: ["1", "confirm", "yes"],
  5: ["2", "accept", "ok"],
};

function getTestInput(stepIndex: number, role: Role): string {
  const options = STEP_INPUTS[stepIndex % Object.keys(STEP_INPUTS).length] ?? [
    "1",
  ];
  const roleOffset =
    role === "customer"
      ? 0
      : role === "merchant"
        ? 1
        : role === "delivery"
          ? 2
          : 3;
  return options[roleOffset % options.length];
}

// ── Simulate bot response ─────────────────────────────────────────────────────

// ── Extract bot message from a flow node ─────────────────────────────────────

type FlowNode = Record<string, unknown>;

function getNodeBotMessage(node: FlowNode, stepIndex: number): string {
  return (
    (node.botMessage as string) ||
    (node.prompt as string) ||
    (node.promptText as string) ||
    (node.label as string) ||
    `Step ${stepIndex + 1}: Please provide ${(node.inputType as string) || "your response"}`
  );
}

function getFlowNodes(
  flowId: string,
  flows: Array<{ id: string; flowJson?: string }>,
): FlowNode[] {
  const match = flows.find((f) => f.id === flowId);
  if (match?.flowJson) {
    try {
      const parsed = JSON.parse(match.flowJson) as Record<string, unknown>;
      if (Array.isArray(parsed.nodes)) return parsed.nodes as FlowNode[];
      if (Array.isArray(parsed.steps)) return parsed.steps as FlowNode[];
    } catch {
      /* ignore parse error */
    }
  }
  return [];
}

// ── Simulate bot response ─────────────────────────────────────────────────────

function simulateBotResponse(
  input: string,
  role: Role,
  stepIndex: number,
  flowName: string,
  prevCustomerData: string,
  currentFlowId: string,
  liveFlows: Array<{ id: string; flowJson?: string }>,
  liveMenuOptions: Record<string, unknown>[],
): { response: string; dataNote: string; nextRole?: Role; isError?: boolean } {
  // Try to get response from the live flow registry — no hardcoded fallbacks
  if (currentFlowId) {
    const nodes = getFlowNodes(currentFlowId, liveFlows);
    if (nodes.length > 0) {
      const node = nodes[stepIndex] ?? nodes[nodes.length - 1];
      if (node) {
        // Surface errorDetail prominently if present on the node
        const errorDetail =
          (node.errorDetail as string) || (node.processError as string);
        if (errorDetail) {
          return {
            response: errorDetail,
            dataNote: `Error at step ${stepIndex + 1}`,
            isError: true,
          };
        }
        const message = getNodeBotMessage(node, stepIndex);
        const dataNote =
          (node.dataNote as string) ||
          `${ROLE_LABELS[role]} step ${stepIndex + 1}: ${input}`;
        const handoff = node.nextRole as string | undefined;
        const nextRole: Role | undefined =
          handoff === "merchant"
            ? "merchant"
            : handoff === "delivery"
              ? "delivery"
              : handoff === "manufacturer"
                ? "manufacturer"
                : handoff === "customer"
                  ? "customer"
                  : undefined;
        return { response: message, dataNote, nextRole };
      }
    }
  }

  // Step 0 with no flow nodes — show live menu options from repository if available
  const label = ROLE_LABELS[role];
  if (stepIndex === 0 && liveMenuOptions.length > 0) {
    const menuLines = liveMenuOptions
      .slice(0, 10)
      .map(
        (opt, i) =>
          `${i + 1}. ${String(opt.optionLabel ?? opt.label ?? opt.name ?? "Option")}`,
      )
      .join("\n");
    return {
      response: `Welcome! Please select an option:\n${menuLines}`,
      dataNote: `${label} step 0: menu presented from repository`,
    };
  }

  if (stepIndex === 0) {
    return {
      response: `[${label}] Flow "${flowName}" has no step definitions in the registry. Seed the registry or add step nodes to this flow.`,
      dataNote: "No flow nodes found in registry",
    };
  }

  return {
    response: `[${label}] Step ${stepIndex + 1} — awaiting flow definition.${prevCustomerData ? ` Context: ${prevCustomerData}` : ""}`,
    dataNote: `${label} step ${stepIndex + 1}: ${input}`,
  };
}

// ── Role Panel Component ──────────────────────────────────────────────────────

interface RolePanelProps {
  panel: PanelState;
  isActive: boolean;
  onSendMessage: (role: Role, text: string) => void;
  onInputChange: (role: Role, value: string) => void;
  isRunning: boolean;
}

function RolePanel({
  panel,
  isActive,
  onSendMessage,
  onInputChange,
  isRunning,
}: RolePanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll triggered by message count
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [panel.messages.length]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (
      e.key === "Enter" &&
      panel.inputValue.trim() &&
      isActive &&
      !isRunning
    ) {
      onSendMessage(panel.role, panel.inputValue.trim());
    }
  }

  const statusColor =
    panel.status === "active"
      ? "text-emerald-500"
      : panel.status === "processing"
        ? "text-amber-500"
        : "text-muted-foreground";

  const statusLabel =
    panel.status === "active"
      ? "Active"
      : panel.status === "processing"
        ? "Processing…"
        : "Waiting";

  return (
    <div
      data-ocid={`multi-sim.${panel.role}.panel`}
      className={[
        "flex flex-col bg-card rounded-xl border transition-all duration-300",
        isActive ? ROLE_COLORS[panel.role] : "border-border",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_BADGE_COLORS[panel.role]}`}
          >
            {ROLE_LABELS[panel.role]}
          </span>
          {isActive && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 border-0 bg-primary/10 text-primary"
            >
              Turn
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-medium ${statusColor}`}>
            {statusLabel}
          </span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            Step {panel.currentStep}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-2" style={{ height: 320 }}>
        {panel.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-xs text-muted-foreground text-center">
              No messages yet.
              <br />
              Start the test case to begin.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {panel.messages.map((msg, idx) => (
              <div
                key={`${panel.role}-msg-${idx}`}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mr-1.5 mt-0.5 flex-shrink-0">
                    <Bot className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
                <div
                  className={[
                    "max-w-[85%] text-xs px-3 py-2 rounded-2xl leading-relaxed whitespace-pre-wrap",
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : msg.isError
                        ? "bg-destructive/10 text-destructive border border-destructive/30 rounded-bl-sm"
                        : "bg-muted text-foreground rounded-bl-sm",
                  ].join(" ")}
                >
                  {msg.isError ? (
                    <span className="font-semibold">⚠ Error: </span>
                  ) : null}
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center ml-1.5 mt-0.5 flex-shrink-0">
                    <User className="w-3 h-3 text-primary" />
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="px-3 pb-3 pt-2 border-t border-border">
        <div className="flex gap-2">
          <Input
            data-ocid={`multi-sim.${panel.role}.input`}
            value={panel.inputValue}
            onChange={(e) => onInputChange(panel.role, e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isActive ? "Type message & press Enter…" : "Waiting for turn…"
            }
            disabled={!isActive || isRunning}
            className="text-xs h-8"
          />
          <Button
            type="button"
            data-ocid={`multi-sim.${panel.role}.send_button`}
            size="sm"
            className="h-8 px-3 text-xs"
            disabled={!isActive || !panel.inputValue.trim() || isRunning}
            onClick={() => onSendMessage(panel.role, panel.inputValue.trim())}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ChatSimulatorMultiRolePage() {
  const { data: flows = [], isLoading: flowsLoading } = useGetAllFlows();
  const [selectedFlowId, setSelectedFlowId] = useState("");
  const [testCaseName, setTestCaseName] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [stepLog, setStepLog] = useState<StepLogEntry[]>([]);
  const [showSessionList, setShowSessionList] = useState(false);
  const [showStepLog, setShowStepLog] = useState(true);
  const [customerDataForMerchant, setCustomerDataForMerchant] = useState("");

  // Live menu options per role from the menu repository (staleTime 5s)
  const { data: customerMenus = [] } = useMenuOptionsByRole("customer");
  const { data: merchantMenus = [] } = useMenuOptionsByRole("merchant");
  const { data: deliveryMenus = [] } = useMenuOptionsByRole("deliveryPartner");
  const { data: manufacturerMenus = [] } = useMenuOptionsByRole("manufacturer");

  const roleMenus: Record<Role, Record<string, unknown>[]> = {
    customer: customerMenus,
    merchant: merchantMenus,
    delivery: deliveryMenus,
    manufacturer: manufacturerMenus,
  };

  const [panels, setPanels] = useState<Record<Role, PanelState>>({
    customer: {
      role: "customer",
      messages: [],
      status: "waiting",
      currentStep: 0,
      inputValue: "",
    },
    merchant: {
      role: "merchant",
      messages: [],
      status: "waiting",
      currentStep: 0,
      inputValue: "",
    },
    delivery: {
      role: "delivery",
      messages: [],
      status: "waiting",
      currentStep: 0,
      inputValue: "",
    },
    manufacturer: {
      role: "manufacturer",
      messages: [],
      status: "waiting",
      currentStep: 0,
      inputValue: "",
    },
  });

  const { mutateAsync: saveSession } = useSaveFlowSession();
  const { data: savedSessions = [], refetch: refetchSessions } =
    useGetFlowSessions(activeRole ?? "customer");

  const selectedFlow = flows.find((f) => f.id === selectedFlowId);

  // ── Persist session after each step ────────────────────────────────────────
  const persistSession = useCallback(
    async (
      updatedLog: StepLogEntry[],
      updatedPanels: Record<Role, PanelState>,
    ) => {
      if (!testCaseName || !selectedFlowId) return;
      const allSteps = updatedLog.map((entry) => ({
        stepIndex: entry.stepIndex,
        input: entry.input,
        response: entry.response,
        dataNote: entry.dataNote,
      }));
      for (const role of ROLES) {
        const roleSteps = updatedLog
          .filter((s) => s.role === role)
          .map((s) => ({
            stepIndex: s.stepIndex,
            input: s.input,
            response: s.response,
            dataNote: s.dataNote,
          }));
        if (roleSteps.length === 0) continue;
        const session = {
          id: `${testCaseName.replace(/\s+/g, "-").toLowerCase()}-${role}-${Date.now()}`,
          role,
          flowName: selectedFlow?.name ?? selectedFlowId,
          steps: roleSteps,
          timestamp: Date.now(),
          status: updatedPanels[role].status,
          testCaseName,
        };
        try {
          await saveSession(session);
        } catch {
          // non-blocking — session save failure should not interrupt execution
        }
      }
      void allSteps;
    },
    [testCaseName, selectedFlowId, selectedFlow, saveSession],
  );

  // ── Start test case ─────────────────────────────────────────────────────────
  function handleStartTestCase() {
    if (!selectedFlowId) {
      toast.error("Please select a flow first");
      return;
    }
    const name = testCaseName.trim() || `Test-${Date.now()}`;
    setTestCaseName(name);
    setStepLog([]);
    setCustomerDataForMerchant("");
    setPanels({
      customer: {
        role: "customer",
        messages: [],
        status: "active",
        currentStep: 0,
        inputValue: "",
      },
      merchant: {
        role: "merchant",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: "",
      },
      delivery: {
        role: "delivery",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: "",
      },
      manufacturer: {
        role: "manufacturer",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: "",
      },
    });
    setActiveRole("customer");
    setIsRunning(false);
    // Auto-trigger first bot greeting for customer
    setTimeout(() => {
      handleSendMessage("customer", "start", true, {}, [], "");
    }, 300);
    // Auto-advance merchant panel after customer greeting settles
    setTimeout(() => {
      handleSendMessage("merchant", "start", true, {}, [], "");
    }, 1500);
    // Auto-advance manufacturer panel after merchant greeting settles
    setTimeout(() => {
      handleSendMessage("manufacturer", "start", true, {}, [], "");
    }, 2700);
  }

  // ── Send message ────────────────────────────────────────────────────────────
  function handleSendMessage(
    role: Role,
    text: string,
    auto = false,
    panelsOverride?: Partial<Record<Role, PanelState>>,
    logOverride?: StepLogEntry[],
    customerDataOverride?: string,
  ) {
    const currentPanels = { ...panels, ...panelsOverride };
    const currentLog = logOverride ?? stepLog;
    const currentCustomerData = customerDataOverride ?? customerDataForMerchant;

    if (!auto && !text.trim()) return;

    const stepIndex = currentPanels[role].currentStep;
    const flowName = selectedFlow?.name ?? selectedFlowId;

    // Add user message (skip for auto-start)
    const userMsg: ChatMessage = { sender: "user", text, ts: Date.now() };
    const updatedMessages: ChatMessage[] = auto
      ? [...currentPanels[role].messages]
      : [...currentPanels[role].messages, userMsg];

    // Simulate bot response — pass live menu options for this role
    const { response, dataNote, nextRole, isError } = simulateBotResponse(
      text,
      role,
      stepIndex,
      flowName,
      currentCustomerData,
      selectedFlowId,
      flows,
      roleMenus[role] ?? [],
    );

    const botMsg: ChatMessage = {
      sender: "bot",
      text: response,
      ts: Date.now() + 1,
      isError,
    };
    const newMessages = [...updatedMessages, botMsg];

    // Build new log entry
    const logEntry: StepLogEntry = {
      stepIndex,
      role,
      input: auto ? "(auto-start)" : text,
      response,
      dataNote,
      ts: Date.now(),
    };
    const newLog = [...currentLog, logEntry];

    // Track data flow from customer to merchant
    let newCustomerData = currentCustomerData;
    if (role === "customer" && dataNote) {
      newCustomerData = dataNote;
    }

    // Build updated panels
    const nextPanels: Record<Role, PanelState> = {
      ...currentPanels,
      [role]: {
        ...currentPanels[role],
        messages: newMessages,
        currentStep: stepIndex + 1,
        inputValue: "",
        status: nextRole ? "waiting" : "active",
      },
    };

    // Notify next role if data flows to it
    if (nextRole) {
      const notification =
        nextRole === "merchant"
          ? `📦 New order received from customer. ${newCustomerData ? `Details: ${newCustomerData}` : ""} Type '1' to accept.`
          : nextRole === "delivery"
            ? `🛵 Delivery task assigned. Pick up from merchant and deliver to customer. Type '1' to accept.`
            : nextRole === "manufacturer"
              ? `🏭 Manufacturing order received. Review and confirm production schedule. Type '1' to accept.`
              : `📬 New notification. Type '1' to proceed.`;

      nextPanels[nextRole] = {
        ...nextPanels[nextRole],
        messages: [
          ...nextPanels[nextRole].messages,
          { sender: "bot", text: notification, ts: Date.now() + 2 },
        ],
        status: "active",
      };
      setActiveRole(nextRole);
    }

    setCustomerDataForMerchant(newCustomerData);
    setPanels(nextPanels);
    setStepLog(newLog);

    // Persist session asynchronously
    void persistSession(newLog, nextPanels);
  }

  function handleInputChange(role: Role, value: string) {
    setPanels((prev) => ({
      ...prev,
      [role]: { ...prev[role], inputValue: value },
    }));
  }

  // ── Reset ───────────────────────────────────────────────────────────────────
  function handleReset() {
    setPanels({
      customer: {
        role: "customer",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: "",
      },
      merchant: {
        role: "merchant",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: "",
      },
      delivery: {
        role: "delivery",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: "",
      },
      manufacturer: {
        role: "manufacturer",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: "",
      },
    });
    setActiveRole(null);
    setStepLog([]);
    setTestCaseName("");
    setCustomerDataForMerchant("");
    setIsRunning(false);
  }

  // ── Load previous session ───────────────────────────────────────────────────
  function handleLoadSession(session: Record<string, unknown>) {
    const role = String(session.role ?? "customer") as Role;
    const steps = (session.steps as Array<Record<string, unknown>>) ?? [];
    const reconstructed: ChatMessage[] = [];
    for (const step of steps) {
      if (String(step.input) !== "(auto-start)") {
        reconstructed.push({
          sender: "user",
          text: String(step.input ?? ""),
          ts: Number(step.stepIndex) * 1000,
        });
      }
      reconstructed.push({
        sender: "bot",
        text: String(step.response ?? ""),
        ts: Number(step.stepIndex) * 1000 + 1,
      });
    }
    setPanels((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        messages: reconstructed,
        currentStep: steps.length,
        status: "waiting",
      },
    }));
    setTestCaseName(String(session.testCaseName ?? session.flowName ?? ""));
    setSelectedFlowId(String(session.flowName ?? selectedFlowId));
    setShowSessionList(false);
    toast.success(`Session loaded for ${ROLE_LABELS[role]}`);
  }

  function handleAutoStep() {
    if (!activeRole || !selectedFlowId) return;
    const auto_input = getTestInput(panels[activeRole].currentStep, activeRole);
    handleSendMessage(activeRole, auto_input);
  }

  return (
    <div
      data-ocid="multi-sim.page"
      className="flex flex-col gap-4 p-4 md:p-6 min-h-screen bg-background"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Multi-Role Chat Simulator
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Step-by-step test execution across Customer, Merchant, Delivery
            Partner, and Manufacturer
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="multi-sim.load_sessions_button"
            onClick={() => {
              setShowSessionList((v) => !v);
              void refetchSessions();
            }}
          >
            <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
            Load Previous Session
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="multi-sim.reset_button"
            onClick={handleReset}
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset All
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 bg-card border border-border rounded-xl p-4">
        <div className="flex-1 min-w-0">
          <label
            htmlFor="multi-sim-flow-select"
            className="text-xs font-medium text-muted-foreground mb-1 block"
          >
            Flow
          </label>
          {flowsLoading ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Select value={selectedFlowId} onValueChange={setSelectedFlowId}>
              <SelectTrigger
                id="multi-sim-flow-select"
                data-ocid="multi-sim.flow_select"
                className="h-9 text-sm"
              >
                <SelectValue placeholder="Select a flow…" />
              </SelectTrigger>
              <SelectContent className="max-h-[600px] overflow-y-auto">
                {flows.length === 0 ? (
                  <SelectItem value="__empty" disabled>
                    No flows found — seed registry first
                  </SelectItem>
                ) : (
                  flows.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <label
            htmlFor="multi-sim-test-case"
            className="text-xs font-medium text-muted-foreground mb-1 block"
          >
            Test Case Name
          </label>
          <Input
            id="multi-sim-test-case"
            data-ocid="multi-sim.test_case_input"
            value={testCaseName}
            onChange={(e) => setTestCaseName(e.target.value)}
            placeholder="e.g. Order Flow Test"
            className="h-9 text-sm"
          />
        </div>
        <div className="flex items-end gap-2">
          <Button
            type="button"
            data-ocid="multi-sim.start_button"
            onClick={handleStartTestCase}
            disabled={!selectedFlowId || isRunning}
            className="h-9 px-5"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : null}
            Start Test Case
          </Button>
          {activeRole && (
            <Button
              type="button"
              variant="outline"
              data-ocid="multi-sim.auto_step_button"
              onClick={handleAutoStep}
              disabled={isRunning}
              className="h-9 px-3"
              title="Send auto-generated test value for current step"
            >
              Auto Step
            </Button>
          )}
        </div>
      </div>

      {/* Previous Sessions Panel */}
      {showSessionList && (
        <div
          data-ocid="multi-sim.sessions_panel"
          className="bg-card border border-border rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Saved Sessions
          </h3>
          {savedSessions.length === 0 ? (
            <p
              className="text-xs text-muted-foreground"
              data-ocid="multi-sim.sessions.empty_state"
            >
              No saved sessions found for this role.
            </p>
          ) : (
            <div className="space-y-2">
              {savedSessions.slice(0, 10).map((session, idx) => (
                <div
                  key={String(session.id ?? idx)}
                  data-ocid={`multi-sim.session.item.${idx + 1}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/40 hover:bg-muted transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {String(session.flowName ?? "Unknown Flow")}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {String(session.role ?? "")} ·{" "}
                      {new Date(
                        Number(session.timestamp ?? 0),
                      ).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    data-ocid={`multi-sim.session.load_button.${idx + 1}`}
                    onClick={() =>
                      handleLoadSession(session as Record<string, unknown>)
                    }
                    className="ml-3 text-xs h-7"
                  >
                    Load
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Four chat panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {ROLES.map((role) => (
          <RolePanel
            key={role}
            panel={panels[role]}
            isActive={activeRole === role}
            onSendMessage={(r, text) => handleSendMessage(r, text)}
            onInputChange={handleInputChange}
            isRunning={isRunning}
          />
        ))}
      </div>

      {/* Step Log */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <button
          type="button"
          data-ocid="multi-sim.step_log.toggle"
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
          onClick={() => setShowStepLog((v) => !v)}
        >
          <span>
            Step Log{" "}
            {stepLog.length > 0 && (
              <Badge variant="secondary" className="ml-1.5 text-[10px]">
                {stepLog.length}
              </Badge>
            )}
          </span>
          {showStepLog ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showStepLog && (
          <div className="overflow-x-auto border-t border-border">
            {stepLog.length === 0 ? (
              <p
                data-ocid="multi-sim.step_log.empty_state"
                className="text-xs text-muted-foreground p-4 text-center"
              >
                No steps executed yet. Start a test case to see step-by-step
                data flow.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs w-16">Step #</TableHead>
                    <TableHead className="text-xs w-28">Role</TableHead>
                    <TableHead className="text-xs">Input</TableHead>
                    <TableHead className="text-xs">Response</TableHead>
                    <TableHead className="text-xs">Data Note</TableHead>
                    <TableHead className="text-xs w-36">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stepLog.map((entry, idx) => (
                    <TableRow
                      key={`log-${entry.stepIndex}-${entry.role}`}
                      data-ocid={`multi-sim.step_log.row.${idx + 1}`}
                    >
                      <TableCell className="text-xs font-mono">
                        {entry.stepIndex + 1}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${ROLE_BADGE_COLORS[entry.role]}`}
                        >
                          {ROLE_LABELS[entry.role]}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs max-w-[180px] truncate">
                        {entry.input}
                      </TableCell>
                      <TableCell className="text-xs max-w-[220px] truncate">
                        {entry.response}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[160px] truncate">
                        {entry.dataNote}
                      </TableCell>
                      <TableCell className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {new Date(entry.ts).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
