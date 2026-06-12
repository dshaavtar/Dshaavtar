export type BlockCategory =
  | "message"
  | "input"
  | "logic"
  | "action"
  | "registration";

export type BlockType =
  | "send_message"
  | "quick_reply"
  | "text_input"
  | "location_input"
  | "phone_input"
  | "image_upload"
  | "if_else"
  | "set_variable"
  | "accept_order"
  | "reject_order"
  | "assign_delivery"
  | "collect_payment"
  | "send_whatsapp"
  | "new_user_check"
  | "role_selection"
  | "passdigit_verify"
  | "loop_start"
  | "loop_end"
  | "break_loop";

export interface FlowBlockOption {
  id: string;
  label: string;
  nextBlockId?: string;
}

export interface FlowBlock {
  id: string;
  type: BlockType;
  category: BlockCategory;
  label: string;
  prompt: string;
  options: FlowBlockOption[];
  variableName?: string;
  nextBlockId?: string;
  position: { x: number; y: number };
  /** loop_start: max iterations before forced exit */
  loopCountMax?: number;
  /** loop_start: variable name to track current iteration */
  loopVariable?: string;
  /** loop_end: JS-like expression evaluated each iteration; if true, exits loop */
  breakCondition?: string;
  /** loop_end: list of user-selectable labels that will break the loop */
  breakOptions?: string[];
  /** break_loop: condition expression that triggers the break */
  condition?: string;
}

export interface FlowConnection {
  id: string;
  fromBlockId: string;
  toBlockId: string;
  fromOptionId?: string;
  /** When true the connection is drawn as a dashed curved arrow (loop back) */
  isLoopBack?: boolean;
}

export interface FlowState {
  blocks: FlowBlock[];
  connections: FlowConnection[];
}

export interface SavedFlowDefinition {
  id: string;
  name: string;
  environment: string;
  flowJson: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export const BLOCK_TYPE_META: Record<
  BlockType,
  {
    label: string;
    category: BlockCategory;
    color: string;
    defaultPrompt: string;
    tooltip?: string;
  }
> = {
  send_message: {
    label: "Send Message",
    category: "message",
    color: "#3b82f6",
    defaultPrompt: "Hello! How can I help you today?",
  },
  quick_reply: {
    label: "Quick Reply",
    category: "message",
    color: "#3b82f6",
    defaultPrompt: "Please choose an option:",
  },
  text_input: {
    label: "Text Input",
    category: "input",
    color: "#10b981",
    defaultPrompt: "Please type your response:",
  },
  location_input: {
    label: "Location Input",
    category: "input",
    color: "#10b981",
    defaultPrompt: "Please share your location:",
  },
  phone_input: {
    label: "Phone Input",
    category: "input",
    color: "#10b981",
    defaultPrompt: "Please enter your phone number:",
  },
  image_upload: {
    label: "Image Upload",
    category: "input",
    color: "#10b981",
    defaultPrompt: "Please upload an image:",
  },
  if_else: {
    label: "If/Else Condition",
    category: "logic",
    color: "#f59e0b",
    defaultPrompt: "Check condition:",
  },
  set_variable: {
    label: "Set Variable",
    category: "logic",
    color: "#f59e0b",
    defaultPrompt: "Set a variable value",
  },
  accept_order: {
    label: "Accept Order",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Accept the incoming order",
  },
  reject_order: {
    label: "Reject Order",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Reject the order with reason",
  },
  assign_delivery: {
    label: "Assign Delivery",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Assign to delivery partner",
  },
  collect_payment: {
    label: "Collect Payment",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Collect payment from customer",
  },
  send_whatsapp: {
    label: "Send WhatsApp",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Send a WhatsApp message",
  },
  new_user_check: {
    label: "New User Check",
    category: "registration",
    color: "#6b7280",
    defaultPrompt: "Check if user is new or returning",
  },
  role_selection: {
    label: "Role Selection",
    category: "registration",
    color: "#6b7280",
    defaultPrompt: "Select your role: Merchant, Delivery Partner, or Customer",
  },
  passdigit_verify: {
    label: "Passdigit Verify",
    category: "registration",
    color: "#6b7280",
    defaultPrompt: "Enter your 4-digit passdigit code:",
  },
  loop_start: {
    label: "Loop Start",
    category: "logic",
    color: "#7c3aed",
    defaultPrompt: "Start repeating section (e.g. multi-branch entry):",
    tooltip:
      "Loop Start — marks the beginning of a repeating section. Set max iterations and a loop variable. The loop body flows downward; the Loop End block connects back here.",
  },
  loop_end: {
    label: "Loop End",
    category: "logic",
    color: "#7c3aed",
    defaultPrompt: "Add another item, or finish?",
    tooltip:
      "Loop End — connects back to Loop Start to repeat. Define a break condition (e.g. user types End) or break options that exit the loop instead of repeating.",
  },
  break_loop: {
    label: "Break Loop",
    category: "logic",
    color: "#dc2626",
    defaultPrompt: "Exit the loop immediately.",
    tooltip:
      "Break — immediately exits the current loop when reached. Use inside a loop body with an If/Else condition (e.g. if user types End, route here to break).",
  },
};

export const CATEGORY_COLORS: Record<BlockCategory, string> = {
  message: "#3b82f6",
  input: "#10b981",
  logic: "#f59e0b",
  action: "#8b5cf6",
  registration: "#6b7280",
};

export const CATEGORY_BG: Record<BlockCategory, string> = {
  message: "bg-blue-50 border-blue-200",
  input: "bg-green-50 border-green-200",
  logic: "bg-orange-50 border-orange-200",
  action: "bg-purple-50 border-purple-200",
  registration: "bg-gray-100 border-gray-200",
};

export function makeBlock(
  type: BlockType,
  position: { x: number; y: number },
): FlowBlock {
  const meta = BLOCK_TYPE_META[type];
  const baseOptions: FlowBlockOption[] =
    type === "quick_reply" || type === "if_else"
      ? [
          {
            id: `opt_${Date.now()}_1`,
            label: "Option 1",
            nextBlockId: undefined,
          },
          {
            id: `opt_${Date.now()}_2`,
            label: "Option 2",
            nextBlockId: undefined,
          },
        ]
      : type === "loop_end"
        ? [
            {
              id: `opt_${Date.now()}_1`,
              label: "➕ Next / Add Another",
              nextBlockId: undefined,
            },
            {
              id: `opt_${Date.now()}_2`,
              label: "✅ End / Done",
              nextBlockId: undefined,
            },
          ]
        : [];

  const loopFields: Partial<FlowBlock> =
    type === "loop_start"
      ? { loopCountMax: 10, loopVariable: "i" }
      : type === "loop_end"
        ? {
            breakCondition: "userInput === 'End'",
            breakOptions: ["End", "Done", "Finish"],
          }
        : type === "break_loop"
          ? { condition: "userInput === 'cancel'" }
          : {};

  return {
    id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type,
    category: meta.category,
    label: meta.label,
    prompt: meta.defaultPrompt,
    options: baseOptions,
    position,
    ...loopFields,
  };
}
