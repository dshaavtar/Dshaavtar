import { ak as useGetAllFlows, r as reactExports, al as useMenuOptionsByRole, am as useSaveFlowSession, an as useGetFlowSessions, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as ScrollArea } from "./scroll-area-C_Pp8Hph.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C1kYAn3i.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { R as RotateCcw } from "./rotate-ccw-BCahGsp7.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { C as ChevronUp } from "./chevron-up-BzRcvKHL.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { B as Bot } from "./bot-egkDiXjP.js";
import { U as User } from "./user-BCyag2Xe.js";
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
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
];
const RefreshCcw = createLucideIcon("refresh-ccw", __iconNode);
const ROLE_LABELS = {
  customer: "Customer",
  merchant: "Merchant",
  delivery: "Delivery Partner",
  manufacturer: "Manufacturer"
};
const ROLE_COLORS = {
  customer: "border-blue-500 ring-1 ring-blue-500",
  merchant: "border-emerald-500 ring-1 ring-emerald-500",
  delivery: "border-orange-500 ring-1 ring-orange-500",
  manufacturer: "border-purple-500 ring-1 ring-purple-500"
};
const ROLE_BADGE_COLORS = {
  customer: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  merchant: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  delivery: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  manufacturer: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
};
const ROLES = ["customer", "merchant", "delivery", "manufacturer"];
const STEP_INPUTS = {
  0: ["1", "start", "hi"],
  1: ["John Doe", "Test User", "Ravi Kumar"],
  2: ["+919876543210", "+918765432109", "+917654321098"],
  3: ["Mumbai", "Delhi", "Bengaluru"],
  4: ["1", "confirm", "yes"],
  5: ["2", "accept", "ok"]
};
function getTestInput(stepIndex, role) {
  const options = STEP_INPUTS[stepIndex % Object.keys(STEP_INPUTS).length] ?? [
    "1"
  ];
  const roleOffset = role === "customer" ? 0 : role === "merchant" ? 1 : role === "delivery" ? 2 : 3;
  return options[roleOffset % options.length];
}
function getNodeBotMessage(node, stepIndex) {
  return node.botMessage || node.prompt || node.promptText || node.label || `Step ${stepIndex + 1}: Please provide ${node.inputType || "your response"}`;
}
function getFlowNodes(flowId, flows) {
  const match = flows.find((f) => f.id === flowId);
  if (match == null ? void 0 : match.flowJson) {
    try {
      const parsed = JSON.parse(match.flowJson);
      if (Array.isArray(parsed.nodes)) return parsed.nodes;
      if (Array.isArray(parsed.steps)) return parsed.steps;
    } catch {
    }
  }
  return [];
}
function simulateBotResponse(input, role, stepIndex, flowName, prevCustomerData, currentFlowId, liveFlows, liveMenuOptions) {
  if (currentFlowId) {
    const nodes = getFlowNodes(currentFlowId, liveFlows);
    if (nodes.length > 0) {
      const node = nodes[stepIndex] ?? nodes[nodes.length - 1];
      if (node) {
        const errorDetail = node.errorDetail || node.processError;
        if (errorDetail) {
          return {
            response: errorDetail,
            dataNote: `Error at step ${stepIndex + 1}`,
            isError: true
          };
        }
        const message = getNodeBotMessage(node, stepIndex);
        const dataNote = node.dataNote || `${ROLE_LABELS[role]} step ${stepIndex + 1}: ${input}`;
        const handoff = node.nextRole;
        const nextRole = handoff === "merchant" ? "merchant" : handoff === "delivery" ? "delivery" : handoff === "manufacturer" ? "manufacturer" : handoff === "customer" ? "customer" : void 0;
        return { response: message, dataNote, nextRole };
      }
    }
  }
  const label = ROLE_LABELS[role];
  if (stepIndex === 0 && liveMenuOptions.length > 0) {
    const menuLines = liveMenuOptions.slice(0, 10).map(
      (opt, i) => `${i + 1}. ${String(opt.optionLabel ?? opt.label ?? opt.name ?? "Option")}`
    ).join("\n");
    return {
      response: `Welcome! Please select an option:
${menuLines}`,
      dataNote: `${label} step 0: menu presented from repository`
    };
  }
  if (stepIndex === 0) {
    return {
      response: `[${label}] Flow "${flowName}" has no step definitions in the registry. Seed the registry or add step nodes to this flow.`,
      dataNote: "No flow nodes found in registry"
    };
  }
  return {
    response: `[${label}] Step ${stepIndex + 1} — awaiting flow definition.${prevCustomerData ? ` Context: ${prevCustomerData}` : ""}`,
    dataNote: `${label} step ${stepIndex + 1}: ${input}`
  };
}
function RolePanel({
  panel,
  isActive,
  onSendMessage,
  onInputChange,
  isRunning
}) {
  const bottomRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [panel.messages.length]);
  function handleKeyDown(e) {
    if (e.key === "Enter" && panel.inputValue.trim() && isActive && !isRunning) {
      onSendMessage(panel.role, panel.inputValue.trim());
    }
  }
  const statusColor = panel.status === "active" ? "text-emerald-500" : panel.status === "processing" ? "text-amber-500" : "text-muted-foreground";
  const statusLabel = panel.status === "active" ? "Active" : panel.status === "processing" ? "Processing…" : "Waiting";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `multi-sim.${panel.role}.panel`,
      className: [
        "flex flex-col bg-card rounded-xl border transition-all duration-300",
        isActive ? ROLE_COLORS[panel.role] : "border-border"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_BADGE_COLORS[panel.role]}`,
                children: ROLE_LABELS[panel.role]
              }
            ),
            isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] px-1.5 py-0 border-0 bg-primary/10 text-primary",
                children: "Turn"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-medium ${statusColor}`, children: statusLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-[10px] px-1.5 py-0", children: [
              "Step ",
              panel.currentStep
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 px-3 py-2", style: { height: 320 }, children: panel.messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
          "No messages yet.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Start the test case to begin."
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          panel.messages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`,
              children: [
                msg.sender === "bot" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-muted flex items-center justify-center mr-1.5 mt-0.5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3 h-3 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: [
                      "max-w-[85%] text-xs px-3 py-2 rounded-2xl leading-relaxed whitespace-pre-wrap",
                      msg.sender === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : msg.isError ? "bg-destructive/10 text-destructive border border-destructive/30 rounded-bl-sm" : "bg-muted text-foreground rounded-bl-sm"
                    ].join(" "),
                    children: [
                      msg.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "⚠ Error: " }) : null,
                      msg.text
                    ]
                  }
                ),
                msg.sender === "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center ml-1.5 mt-0.5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 text-primary" }) })
              ]
            },
            `${panel.role}-msg-${idx}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": `multi-sim.${panel.role}.input`,
              value: panel.inputValue,
              onChange: (e) => onInputChange(panel.role, e.target.value),
              onKeyDown: handleKeyDown,
              placeholder: isActive ? "Type message & press Enter…" : "Waiting for turn…",
              disabled: !isActive || isRunning,
              className: "text-xs h-8"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": `multi-sim.${panel.role}.send_button`,
              size: "sm",
              className: "h-8 px-3 text-xs",
              disabled: !isActive || !panel.inputValue.trim() || isRunning,
              onClick: () => onSendMessage(panel.role, panel.inputValue.trim()),
              children: "Send"
            }
          )
        ] }) })
      ]
    }
  );
}
function ChatSimulatorMultiRolePage() {
  const { data: flows = [], isLoading: flowsLoading } = useGetAllFlows();
  const [selectedFlowId, setSelectedFlowId] = reactExports.useState("");
  const [testCaseName, setTestCaseName] = reactExports.useState("");
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [activeRole, setActiveRole] = reactExports.useState(null);
  const [stepLog, setStepLog] = reactExports.useState([]);
  const [showSessionList, setShowSessionList] = reactExports.useState(false);
  const [showStepLog, setShowStepLog] = reactExports.useState(true);
  const [customerDataForMerchant, setCustomerDataForMerchant] = reactExports.useState("");
  const { data: customerMenus = [] } = useMenuOptionsByRole("customer");
  const { data: merchantMenus = [] } = useMenuOptionsByRole("merchant");
  const { data: deliveryMenus = [] } = useMenuOptionsByRole("deliveryPartner");
  const { data: manufacturerMenus = [] } = useMenuOptionsByRole("manufacturer");
  const roleMenus = {
    customer: customerMenus,
    merchant: merchantMenus,
    delivery: deliveryMenus,
    manufacturer: manufacturerMenus
  };
  const [panels, setPanels] = reactExports.useState({
    customer: {
      role: "customer",
      messages: [],
      status: "waiting",
      currentStep: 0,
      inputValue: ""
    },
    merchant: {
      role: "merchant",
      messages: [],
      status: "waiting",
      currentStep: 0,
      inputValue: ""
    },
    delivery: {
      role: "delivery",
      messages: [],
      status: "waiting",
      currentStep: 0,
      inputValue: ""
    },
    manufacturer: {
      role: "manufacturer",
      messages: [],
      status: "waiting",
      currentStep: 0,
      inputValue: ""
    }
  });
  const { mutateAsync: saveSession } = useSaveFlowSession();
  const { data: savedSessions = [], refetch: refetchSessions } = useGetFlowSessions(activeRole ?? "customer");
  const selectedFlow = flows.find((f) => f.id === selectedFlowId);
  const persistSession = reactExports.useCallback(
    async (updatedLog, updatedPanels) => {
      if (!testCaseName || !selectedFlowId) return;
      updatedLog.map((entry) => ({
        stepIndex: entry.stepIndex,
        input: entry.input,
        response: entry.response,
        dataNote: entry.dataNote
      }));
      for (const role of ROLES) {
        const roleSteps = updatedLog.filter((s) => s.role === role).map((s) => ({
          stepIndex: s.stepIndex,
          input: s.input,
          response: s.response,
          dataNote: s.dataNote
        }));
        if (roleSteps.length === 0) continue;
        const session = {
          id: `${testCaseName.replace(/\s+/g, "-").toLowerCase()}-${role}-${Date.now()}`,
          role,
          flowName: (selectedFlow == null ? void 0 : selectedFlow.name) ?? selectedFlowId,
          steps: roleSteps,
          timestamp: Date.now(),
          status: updatedPanels[role].status,
          testCaseName
        };
        try {
          await saveSession(session);
        } catch {
        }
      }
    },
    [testCaseName, selectedFlowId, selectedFlow, saveSession]
  );
  function handleStartTestCase() {
    if (!selectedFlowId) {
      ue.error("Please select a flow first");
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
        inputValue: ""
      },
      merchant: {
        role: "merchant",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: ""
      },
      delivery: {
        role: "delivery",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: ""
      },
      manufacturer: {
        role: "manufacturer",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: ""
      }
    });
    setActiveRole("customer");
    setIsRunning(false);
    setTimeout(() => {
      handleSendMessage("customer", "start", true, {}, [], "");
    }, 300);
    setTimeout(() => {
      handleSendMessage("merchant", "start", true, {}, [], "");
    }, 1500);
    setTimeout(() => {
      handleSendMessage("manufacturer", "start", true, {}, [], "");
    }, 2700);
  }
  function handleSendMessage(role, text, auto = false, panelsOverride, logOverride, customerDataOverride) {
    const currentPanels = { ...panels, ...panelsOverride };
    const currentLog = logOverride ?? stepLog;
    const currentCustomerData = customerDataOverride ?? customerDataForMerchant;
    if (!auto && !text.trim()) return;
    const stepIndex = currentPanels[role].currentStep;
    const flowName = (selectedFlow == null ? void 0 : selectedFlow.name) ?? selectedFlowId;
    const userMsg = { sender: "user", text, ts: Date.now() };
    const updatedMessages = auto ? [...currentPanels[role].messages] : [...currentPanels[role].messages, userMsg];
    const { response, dataNote, nextRole, isError } = simulateBotResponse(
      text,
      role,
      stepIndex,
      flowName,
      currentCustomerData,
      selectedFlowId,
      flows,
      roleMenus[role] ?? []
    );
    const botMsg = {
      sender: "bot",
      text: response,
      ts: Date.now() + 1,
      isError
    };
    const newMessages = [...updatedMessages, botMsg];
    const logEntry = {
      stepIndex,
      role,
      input: auto ? "(auto-start)" : text,
      response,
      dataNote,
      ts: Date.now()
    };
    const newLog = [...currentLog, logEntry];
    let newCustomerData = currentCustomerData;
    if (role === "customer" && dataNote) {
      newCustomerData = dataNote;
    }
    const nextPanels = {
      ...currentPanels,
      [role]: {
        ...currentPanels[role],
        messages: newMessages,
        currentStep: stepIndex + 1,
        inputValue: "",
        status: nextRole ? "waiting" : "active"
      }
    };
    if (nextRole) {
      const notification = nextRole === "merchant" ? `📦 New order received from customer. ${newCustomerData ? `Details: ${newCustomerData}` : ""} Type '1' to accept.` : nextRole === "delivery" ? `🛵 Delivery task assigned. Pick up from merchant and deliver to customer. Type '1' to accept.` : nextRole === "manufacturer" ? `🏭 Manufacturing order received. Review and confirm production schedule. Type '1' to accept.` : `📬 New notification. Type '1' to proceed.`;
      nextPanels[nextRole] = {
        ...nextPanels[nextRole],
        messages: [
          ...nextPanels[nextRole].messages,
          { sender: "bot", text: notification, ts: Date.now() + 2 }
        ],
        status: "active"
      };
      setActiveRole(nextRole);
    }
    setCustomerDataForMerchant(newCustomerData);
    setPanels(nextPanels);
    setStepLog(newLog);
    void persistSession(newLog, nextPanels);
  }
  function handleInputChange(role, value) {
    setPanels((prev) => ({
      ...prev,
      [role]: { ...prev[role], inputValue: value }
    }));
  }
  function handleReset() {
    setPanels({
      customer: {
        role: "customer",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: ""
      },
      merchant: {
        role: "merchant",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: ""
      },
      delivery: {
        role: "delivery",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: ""
      },
      manufacturer: {
        role: "manufacturer",
        messages: [],
        status: "waiting",
        currentStep: 0,
        inputValue: ""
      }
    });
    setActiveRole(null);
    setStepLog([]);
    setTestCaseName("");
    setCustomerDataForMerchant("");
    setIsRunning(false);
  }
  function handleLoadSession(session) {
    const role = String(session.role ?? "customer");
    const steps = session.steps ?? [];
    const reconstructed = [];
    for (const step of steps) {
      if (String(step.input) !== "(auto-start)") {
        reconstructed.push({
          sender: "user",
          text: String(step.input ?? ""),
          ts: Number(step.stepIndex) * 1e3
        });
      }
      reconstructed.push({
        sender: "bot",
        text: String(step.response ?? ""),
        ts: Number(step.stepIndex) * 1e3 + 1
      });
    }
    setPanels((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        messages: reconstructed,
        currentStep: steps.length,
        status: "waiting"
      }
    }));
    setTestCaseName(String(session.testCaseName ?? session.flowName ?? ""));
    setSelectedFlowId(String(session.flowName ?? selectedFlowId));
    setShowSessionList(false);
    ue.success(`Session loaded for ${ROLE_LABELS[role]}`);
  }
  function handleAutoStep() {
    if (!activeRole || !selectedFlowId) return;
    const auto_input = getTestInput(panels[activeRole].currentStep, activeRole);
    handleSendMessage(activeRole, auto_input);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "multi-sim.page",
      className: "flex flex-col gap-4 p-4 md:p-6 min-h-screen bg-background",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-foreground", children: "Multi-Role Chat Simulator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Step-by-step test execution across Customer, Merchant, Delivery Partner, and Manufacturer" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                "data-ocid": "multi-sim.load_sessions_button",
                onClick: () => {
                  setShowSessionList((v) => !v);
                  void refetchSessions();
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Load Previous Session"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                "data-ocid": "multi-sim.reset_button",
                onClick: handleReset,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Reset All"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 bg-card border border-border rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "multi-sim-flow-select",
                className: "text-xs font-medium text-muted-foreground mb-1 block",
                children: "Flow"
              }
            ),
            flowsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedFlowId, onValueChange: setSelectedFlowId, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "multi-sim-flow-select",
                  "data-ocid": "multi-sim.flow_select",
                  className: "h-9 text-sm",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a flow…" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-[600px] overflow-y-auto", children: flows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__empty", disabled: true, children: "No flows found — seed registry first" }) : flows.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f.id, children: f.name }, f.id)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "multi-sim-test-case",
                className: "text-xs font-medium text-muted-foreground mb-1 block",
                children: "Test Case Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "multi-sim-test-case",
                "data-ocid": "multi-sim.test_case_input",
                value: testCaseName,
                onChange: (e) => setTestCaseName(e.target.value),
                placeholder: "e.g. Order Flow Test",
                className: "h-9 text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                "data-ocid": "multi-sim.start_button",
                onClick: handleStartTestCase,
                disabled: !selectedFlowId || isRunning,
                className: "h-9 px-5",
                children: [
                  isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }) : null,
                  "Start Test Case"
                ]
              }
            ),
            activeRole && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                "data-ocid": "multi-sim.auto_step_button",
                onClick: handleAutoStep,
                disabled: isRunning,
                className: "h-9 px-3",
                title: "Send auto-generated test value for current step",
                children: "Auto Step"
              }
            )
          ] })
        ] }),
        showSessionList && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "multi-sim.sessions_panel",
            className: "bg-card border border-border rounded-xl p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Saved Sessions" }),
              savedSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-muted-foreground",
                  "data-ocid": "multi-sim.sessions.empty_state",
                  children: "No saved sessions found for this role."
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: savedSessions.slice(0, 10).map((session, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `multi-sim.session.item.${idx + 1}`,
                  className: "flex items-center justify-between px-3 py-2 rounded-lg bg-muted/40 hover:bg-muted transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: String(session.flowName ?? "Unknown Flow") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                        String(session.role ?? ""),
                        " ·",
                        " ",
                        new Date(
                          Number(session.timestamp ?? 0)
                        ).toLocaleString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        "data-ocid": `multi-sim.session.load_button.${idx + 1}`,
                        onClick: () => handleLoadSession(session),
                        className: "ml-3 text-xs h-7",
                        children: "Load"
                      }
                    )
                  ]
                },
                String(session.id ?? idx)
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", children: ROLES.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RolePanel,
          {
            panel: panels[role],
            isActive: activeRole === role,
            onSendMessage: (r, text) => handleSendMessage(r, text),
            onInputChange: handleInputChange,
            isRunning
          },
          role
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "multi-sim.step_log.toggle",
              className: "w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors",
              onClick: () => setShowStepLog((v) => !v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Step Log",
                  " ",
                  stepLog.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1.5 text-[10px]", children: stepLog.length })
                ] }),
                showStepLog ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
              ]
            }
          ),
          showStepLog && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto border-t border-border", children: stepLog.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "multi-sim.step_log.empty_state",
              className: "text-xs text-muted-foreground p-4 text-center",
              children: "No steps executed yet. Start a test case to see step-by-step data flow."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs w-16", children: "Step #" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs w-28", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "Input" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "Response" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "Data Note" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs w-36", children: "Timestamp" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: stepLog.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TableRow,
              {
                "data-ocid": `multi-sim.step_log.row.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-mono", children: entry.stepIndex + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[10px] font-medium px-1.5 py-0.5 rounded-full ${ROLE_BADGE_COLORS[entry.role]}`,
                      children: ROLE_LABELS[entry.role]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs max-w-[180px] truncate", children: entry.input }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs max-w-[220px] truncate", children: entry.response }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground max-w-[160px] truncate", children: entry.dataNote }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[10px] text-muted-foreground whitespace-nowrap", children: new Date(entry.ts).toLocaleTimeString() })
                ]
              },
              `log-${entry.stepIndex}-${entry.role}`
            )) })
          ] }) })
        ] })
      ]
    }
  );
}
export {
  ChatSimulatorMultiRolePage as default
};
