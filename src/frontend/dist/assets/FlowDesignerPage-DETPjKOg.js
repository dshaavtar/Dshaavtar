import { r as reactExports, j as jsxRuntimeExports, bE as useQuery, ao as useQueryClient, bF as useMutation, bG as useActor, bH as createActor, ag as getAllRegistryFlows, bI as isFlowCustomized, p as ue, bJ as registerFlow } from "./index-D4mmtgjo.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { M as MessageCircle } from "./message-circle-C1ZVIbte.js";
import { S as Send } from "./send-DoOOMmv0.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { I as Image } from "./image-Bu0hC9Tq.js";
import { G as GitBranch } from "./git-branch-D-EDHnGg.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { S as Square, R as Rocket } from "./square-ntHUDIFk.js";
import { X } from "./x-Chksmd6i.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { S as Settings } from "./settings-CDqnrNMc.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, R as Root2$1, A as Anchor, e as createPopperScope, C as Content, f as Arrow } from "./select-C_0Bp1b_.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DEwfo3GB.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { u as useControllableState, P as Primitive, c as composeEventHandlers, a as createContextScope, b as createSlot } from "./index-CUcO6jhF.js";
import { u as useComposedRefs } from "./index-DPbSRAbD.js";
import { P as Portal$1, h as hideOthers, R as ReactRemoveScroll, u as useFocusGuards, F as FocusScope, D as DismissableLayer } from "./index-D1QQ462r.js";
import { u as useId } from "./index-DYndF6Sn.js";
import { P as Presence } from "./index-BNXq-E6T.js";
import { c as cn } from "./utils-2v2HxlWs.js";
import { L as LayoutGrid, S as Sparkles } from "./sparkles-DWpRMJ8z.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
import { S as Save } from "./save-De3uJrwe.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-dLX_aGK4.js";
import "./index-z5OST4d2.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
import "./index-CmjKy1Fn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M17 18H3", key: "1amg6g" }],
  ["path", { d: "M21 6H3", key: "1jwq7v" }]
];
const AlignLeft = createLucideIcon("align-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 21s-4-3-4-9 4-9 4-9", key: "uto9ud" }],
  ["path", { d: "M16 3s4 3 4 9-4 9-4 9", key: "4w2vsq" }],
  ["line", { x1: "15", x2: "9", y1: "9", y2: "15", key: "f7djnv" }],
  ["line", { x1: "9", x2: "15", y1: "9", y2: "15", key: "1shsy8" }]
];
const Variable = createLucideIcon("variable", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const BLOCK_TYPE_META = {
  send_message: {
    label: "Send Message",
    category: "message",
    color: "#3b82f6",
    defaultPrompt: "Hello! How can I help you today?"
  },
  quick_reply: {
    label: "Quick Reply",
    category: "message",
    color: "#3b82f6",
    defaultPrompt: "Please choose an option:"
  },
  text_input: {
    label: "Text Input",
    category: "input",
    color: "#10b981",
    defaultPrompt: "Please type your response:"
  },
  location_input: {
    label: "Location Input",
    category: "input",
    color: "#10b981",
    defaultPrompt: "Please share your location:"
  },
  phone_input: {
    label: "Phone Input",
    category: "input",
    color: "#10b981",
    defaultPrompt: "Please enter your phone number:"
  },
  image_upload: {
    label: "Image Upload",
    category: "input",
    color: "#10b981",
    defaultPrompt: "Please upload an image:"
  },
  if_else: {
    label: "If/Else Condition",
    category: "logic",
    color: "#f59e0b",
    defaultPrompt: "Check condition:"
  },
  set_variable: {
    label: "Set Variable",
    category: "logic",
    color: "#f59e0b",
    defaultPrompt: "Set a variable value"
  },
  accept_order: {
    label: "Accept Order",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Accept the incoming order"
  },
  reject_order: {
    label: "Reject Order",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Reject the order with reason"
  },
  assign_delivery: {
    label: "Assign Delivery",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Assign to delivery partner"
  },
  collect_payment: {
    label: "Collect Payment",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Collect payment from customer"
  },
  send_whatsapp: {
    label: "Send WhatsApp",
    category: "action",
    color: "#8b5cf6",
    defaultPrompt: "Send a WhatsApp message"
  },
  new_user_check: {
    label: "New User Check",
    category: "registration",
    color: "#6b7280",
    defaultPrompt: "Check if user is new or returning"
  },
  role_selection: {
    label: "Role Selection",
    category: "registration",
    color: "#6b7280",
    defaultPrompt: "Select your role: Merchant, Delivery Partner, or Customer"
  },
  passdigit_verify: {
    label: "Passdigit Verify",
    category: "registration",
    color: "#6b7280",
    defaultPrompt: "Enter your 4-digit passdigit code:"
  },
  loop_start: {
    label: "Loop Start",
    category: "logic",
    color: "#7c3aed",
    defaultPrompt: "Start repeating section (e.g. multi-branch entry):",
    tooltip: "Loop Start — marks the beginning of a repeating section. Set max iterations and a loop variable. The loop body flows downward; the Loop End block connects back here."
  },
  loop_end: {
    label: "Loop End",
    category: "logic",
    color: "#7c3aed",
    defaultPrompt: "Add another item, or finish?",
    tooltip: "Loop End — connects back to Loop Start to repeat. Define a break condition (e.g. user types End) or break options that exit the loop instead of repeating."
  },
  break_loop: {
    label: "Break Loop",
    category: "logic",
    color: "#dc2626",
    defaultPrompt: "Exit the loop immediately.",
    tooltip: "Break — immediately exits the current loop when reached. Use inside a loop body with an If/Else condition (e.g. if user types End, route here to break)."
  }
};
const CATEGORY_COLORS = {
  message: "#3b82f6",
  input: "#10b981",
  logic: "#f59e0b",
  action: "#8b5cf6",
  registration: "#6b7280"
};
function makeBlock(type, position) {
  const meta = BLOCK_TYPE_META[type];
  const baseOptions = type === "quick_reply" || type === "if_else" ? [
    {
      id: `opt_${Date.now()}_1`,
      label: "Option 1",
      nextBlockId: void 0
    },
    {
      id: `opt_${Date.now()}_2`,
      label: "Option 2",
      nextBlockId: void 0
    }
  ] : type === "loop_end" ? [
    {
      id: `opt_${Date.now()}_1`,
      label: "➕ Next / Add Another",
      nextBlockId: void 0
    },
    {
      id: `opt_${Date.now()}_2`,
      label: "✅ End / Done",
      nextBlockId: void 0
    }
  ] : [];
  const loopFields = type === "loop_start" ? { loopCountMax: 10, loopVariable: "i" } : type === "loop_end" ? {
    breakCondition: "userInput === 'End'",
    breakOptions: ["End", "Done", "Finish"]
  } : type === "break_loop" ? { condition: "userInput === 'cancel'" } : {};
  return {
    id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type,
    category: meta.category,
    label: meta.label,
    prompt: meta.defaultPrompt,
    options: baseOptions,
    position,
    ...loopFields
  };
}
const SECTIONS = [
  {
    title: "Message",
    color: "#3b82f6",
    blocks: [
      { type: "send_message", icon: MessageSquare },
      { type: "quick_reply", icon: MessageCircle }
    ]
  },
  {
    title: "Input",
    color: "#10b981",
    blocks: [
      { type: "text_input", icon: Send },
      { type: "location_input", icon: MapPin },
      { type: "phone_input", icon: Phone },
      { type: "image_upload", icon: Image }
    ]
  },
  {
    title: "Logic",
    color: "#f59e0b",
    blocks: [
      { type: "if_else", icon: GitBranch },
      { type: "set_variable", icon: Variable }
    ]
  },
  {
    title: "Control Flow",
    color: "#7c3aed",
    blocks: [
      { type: "loop_start", icon: RefreshCw },
      { type: "loop_end", icon: Square },
      { type: "break_loop", icon: X }
    ]
  },
  {
    title: "Actions",
    color: "#8b5cf6",
    blocks: [
      { type: "accept_order", icon: ShoppingCart },
      { type: "reject_order", icon: X },
      { type: "assign_delivery", icon: Truck },
      { type: "collect_payment", icon: Wallet },
      { type: "send_whatsapp", icon: Send }
    ]
  },
  {
    title: "Registration",
    color: "#6b7280",
    blocks: [
      { type: "new_user_check", icon: UserCheck },
      { type: "role_selection", icon: Users },
      { type: "passdigit_verify", icon: Settings }
    ]
  }
];
let dragBlockType = null;
function getDragBlockType() {
  return dragBlockType;
}
function BlockLibrary({ onAddBlock }) {
  const [dragging, setDragging] = reactExports.useState(null);
  function handleDragStart(type) {
    dragBlockType = type;
    setDragging(type);
  }
  function handleDragEnd() {
    dragBlockType = null;
    setDragging(null);
  }
  function handleClick(type) {
    const block = makeBlock(type, { x: 200, y: 200 });
    onAddBlock(block);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", "data-ocid": "flow_designer.block_library", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1", children: "Blocks" }),
    SECTIONS.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-xs font-semibold mb-2 flex items-center gap-1.5 px-1",
          style: { color: section.color },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-2 h-2 rounded-full inline-block",
                style: { background: section.color }
              }
            ),
            section.title
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: section.blocks.map(({ type, icon: Icon }) => {
        const meta = BLOCK_TYPE_META[type];
        const blockColor = type === "loop_start" || type === "loop_end" ? "#7c3aed" : type === "break_loop" ? "#dc2626" : section.color;
        const tooltip = meta.tooltip ?? `Drag or click to add ${meta.label}`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            draggable: true,
            onDragStart: () => handleDragStart(type),
            onDragEnd: handleDragEnd,
            onClick: () => handleClick(type),
            className: [
              "flex items-center gap-2 px-2.5 py-2 rounded-lg border cursor-grab select-none transition-all text-left",
              "hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]",
              dragging === type ? "opacity-50 scale-95" : "",
              "bg-card border-border hover:border-primary/40"
            ].join(" "),
            title: tooltip,
            "data-ocid": `flow_designer.block_type.${type}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-6 h-6 rounded flex items-center justify-center flex-shrink-0",
                  style: {
                    background: `${blockColor}18`,
                    color: blockColor
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground leading-tight", children: meta.label })
            ]
          },
          type
        );
      }) }),
      section.title === "Control Flow" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 px-1 py-1.5 rounded-md bg-muted/60 border border-dashed border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Loop:" }),
        " place",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#7c3aed" }, children: "Loop Start" }),
        " before the repeating section,",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#7c3aed" }, children: "Loop End" }),
        " after. Draw the back-arrow from Loop End's",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#7c3aed" }, children: "left dot" }),
        " to Loop Start. Add ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dc2626" }, children: "Break" }),
        " ",
        "inside the body to exit early."
      ] }) })
    ] }, section.title)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-2.5 rounded-lg bg-muted/50 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Drag" }),
      " blocks onto the canvas or ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "click" }),
      " ",
      "to add at center. Connect by clicking the bottom dot → top dot."
    ] }) })
  ] });
}
const BLOCK_W = 180;
const BLOCK_H = 80;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 3;
function FlowCanvas({
  blocks,
  connections,
  selectedBlockId,
  autoLayoutKey,
  onBlocksChange,
  onConnectionsChange,
  onSelectBlock
}) {
  const containerRef = reactExports.useRef(null);
  const transformRef = reactExports.useRef({ x: 60, y: 60, scale: 1 });
  const [transformState, setTransformState] = reactExports.useState({
    x: 60,
    y: 60,
    scale: 1
  });
  const [zoomPct, setZoomPct] = reactExports.useState(100);
  const isPanning = reactExports.useRef(false);
  const panStart = reactExports.useRef(null);
  const [drawingConn, setDrawingConn] = reactExports.useState(null);
  const draggingBlock = reactExports.useRef(null);
  const [ctxMenu, setCtxMenu] = reactExports.useState(null);
  const [hoveredConnId, setHoveredConnId] = reactExports.useState(null);
  const blocksRef = reactExports.useRef(blocks);
  const connectionsRef = reactExports.useRef(connections);
  const onBlocksChangeRef = reactExports.useRef(onBlocksChange);
  blocksRef.current = blocks;
  connectionsRef.current = connections;
  onBlocksChangeRef.current = onBlocksChange;
  reactExports.useEffect(() => {
    if (autoLayoutKey === 0) return;
    onBlocksChangeRef.current(
      autoLayout(blocksRef.current, connectionsRef.current)
    );
  }, [autoLayoutKey]);
  const handleWheel = reactExports.useCallback((e) => {
    var _a;
    e.preventDefault();
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    setTransformState((prev) => {
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, prev.scale * delta)
      );
      if (newScale === prev.scale) return prev;
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      const canvasX = (cursorX - prev.x) / prev.scale;
      const canvasY = (cursorY - prev.y) / prev.scale;
      const newX = cursorX - canvasX * newScale;
      const newY = cursorY - canvasY * newScale;
      const next = { x: newX, y: newY, scale: newScale };
      transformRef.current = next;
      return next;
    });
    setZoomPct(Math.round(transformRef.current.scale * 100));
  }, []);
  reactExports.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);
  reactExports.useEffect(() => {
    setZoomPct(Math.round(transformState.scale * 100));
  }, [transformState.scale]);
  function handleMouseDownCanvas(e) {
    if (e.button !== 0) return;
    if (e.target.closest("[data-block]")) return;
    isPanning.current = true;
    const t2 = transformRef.current;
    panStart.current = {
      mx: e.clientX,
      my: e.clientY,
      tx: t2.x,
      ty: t2.y
    };
    setCtxMenu(null);
    onSelectBlock(null);
  }
  function handleMouseMove(e) {
    var _a;
    if (isPanning.current && panStart.current) {
      const dx = e.clientX - panStart.current.mx;
      const dy = e.clientY - panStart.current.my;
      const next = {
        ...transformRef.current,
        x: panStart.current.tx + dx,
        y: panStart.current.ty + dy
      };
      transformRef.current = next;
      setTransformState(next);
    }
    if (draggingBlock.current) {
      const { id, startBx, startBy, startMx, startMy } = draggingBlock.current;
      const scale = transformRef.current.scale;
      const dx = (e.clientX - startMx) / scale;
      const dy = (e.clientY - startMy) / scale;
      onBlocksChange(
        blocks.map(
          (b) => b.id === id ? { ...b, position: { x: startBx + dx, y: startBy + dy } } : b
        )
      );
    }
    if (drawingConn) {
      const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect) return;
      const t2 = transformRef.current;
      setDrawingConn(
        (d) => d ? {
          ...d,
          curX: (e.clientX - rect.left - t2.x) / t2.scale,
          curY: (e.clientY - rect.top - t2.y) / t2.scale
        } : null
      );
    }
  }
  function handleMouseUp(_e) {
    isPanning.current = false;
    panStart.current = null;
    draggingBlock.current = null;
    if (drawingConn) setDrawingConn(null);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    var _a;
    e.preventDefault();
    const type = getDragBlockType();
    if (!type) return;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    const t2 = transformRef.current;
    const x = (e.clientX - rect.left - t2.x) / t2.scale;
    const y = (e.clientY - rect.top - t2.y) / t2.scale;
    const block = makeBlock(type, { x, y });
    onBlocksChange([...blocks, block]);
  }
  function handleBlockMouseDown(e, blockId) {
    e.stopPropagation();
    if (e.target.closest("[data-conn-dot]")) return;
    onSelectBlock(blockId);
    const block = blocks.find((b) => b.id === blockId);
    draggingBlock.current = {
      id: blockId,
      startBx: block.position.x,
      startBy: block.position.y,
      startMx: e.clientX,
      startMy: e.clientY
    };
  }
  function handleOutputDotMouseDown(e, blockId) {
    e.stopPropagation();
    const block = blocks.find((b) => b.id === blockId);
    if (!block) return;
    const fromX = block.position.x + BLOCK_W / 2;
    const fromY = block.position.y + BLOCK_H;
    setDrawingConn({
      fromBlockId: blockId,
      fromX,
      fromY,
      curX: fromX,
      curY: fromY
    });
  }
  function handleInputDotMouseUp(e, blockId) {
    e.stopPropagation();
    if (!drawingConn || drawingConn.fromBlockId === blockId) {
      setDrawingConn(null);
      return;
    }
    const duplicate = connections.find(
      (c) => c.fromBlockId === drawingConn.fromBlockId && c.toBlockId === blockId
    );
    if (!duplicate) {
      const fromBlock = blocks.find((b) => b.id === drawingConn.fromBlockId);
      const toBlock = blocks.find((b) => b.id === blockId);
      const isLoopBack = (fromBlock == null ? void 0 : fromBlock.type) === "loop_end" && (toBlock == null ? void 0 : toBlock.type) === "loop_start" || toBlock !== void 0 && fromBlock !== void 0 && toBlock.position.y < fromBlock.position.y - 40;
      const conn = {
        id: `conn_${Date.now()}`,
        fromBlockId: drawingConn.fromBlockId,
        toBlockId: blockId,
        isLoopBack
      };
      onConnectionsChange([...connections, conn]);
    }
    setDrawingConn(null);
  }
  function handleDeleteConnection(connId) {
    onConnectionsChange(connections.filter((c) => c.id !== connId));
  }
  function handleBlockRightClick(e, blockId) {
    e.preventDefault();
    setCtxMenu({ blockId, x: e.clientX, y: e.clientY });
    onSelectBlock(blockId);
  }
  function handleCtxAction(action) {
    if (!ctxMenu) return;
    const { blockId } = ctxMenu;
    setCtxMenu(null);
    if (action === "delete") {
      onBlocksChange(blocks.filter((b) => b.id !== blockId));
      onConnectionsChange(
        connections.filter(
          (c) => c.fromBlockId !== blockId && c.toBlockId !== blockId
        )
      );
      if (selectedBlockId === blockId) onSelectBlock(null);
    }
    if (action === "duplicate") {
      const src = blocks.find((b) => b.id === blockId);
      if (!src) return;
      const dup = {
        ...src,
        id: `block_${Date.now()}`,
        position: { x: src.position.x + 30, y: src.position.y + 30 }
      };
      onBlocksChange([...blocks, dup]);
    }
  }
  function handleZoomIn() {
    var _a;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    const cx = rect ? rect.width / 2 : 0;
    const cy = rect ? rect.height / 2 : 0;
    setTransformState((prev) => {
      const newScale = Math.min(MAX_ZOOM, prev.scale * 1.2);
      const canvasX = (cx - prev.x) / prev.scale;
      const canvasY = (cy - prev.y) / prev.scale;
      const next = {
        x: cx - canvasX * newScale,
        y: cy - canvasY * newScale,
        scale: newScale
      };
      transformRef.current = next;
      return next;
    });
  }
  function handleZoomOut() {
    var _a;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    const cx = rect ? rect.width / 2 : 0;
    const cy = rect ? rect.height / 2 : 0;
    setTransformState((prev) => {
      const newScale = Math.max(MIN_ZOOM, prev.scale / 1.2);
      const canvasX = (cx - prev.x) / prev.scale;
      const canvasY = (cy - prev.y) / prev.scale;
      const next = {
        x: cx - canvasX * newScale,
        y: cy - canvasY * newScale,
        scale: newScale
      };
      transformRef.current = next;
      return next;
    });
  }
  function getLoopBackPath(x1, y1, x2, y2) {
    const offset = 120;
    return `M ${x1} ${y1} C ${x1 - offset} ${y1 + 40}, ${x2 - offset} ${y2 - 40}, ${x2} ${y2}`;
  }
  function getCurvePath(x1, y1, x2, y2) {
    const cy = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
  }
  const t = transformState;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full overflow-hidden select-none",
      style: {
        cursor: isPanning.current ? "grabbing" : "default",
        background: "var(--background)"
      },
      onMouseDown: handleMouseDownCanvas,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      "data-ocid": "flow_designer.canvas",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 w-full h-full pointer-events-none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "pattern",
                {
                  id: "grid",
                  x: t.x % (20 * t.scale),
                  y: t.y % (20 * t.scale),
                  width: 20 * t.scale,
                  height: 20 * t.scale,
                  patternUnits: "userSpaceOnUse",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "1", cy: "1", r: "0.8", fill: "var(--border)" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#grid)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "absolute",
              transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
              transformOrigin: "0 0"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  "aria-hidden": "true",
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "visible",
                    pointerEvents: "none"
                  },
                  width: "1",
                  height: "1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "marker",
                        {
                          id: "arrowhead",
                          markerWidth: "8",
                          markerHeight: "6",
                          refX: "8",
                          refY: "3",
                          orient: "auto",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "0 0, 8 3, 0 6", fill: "#94a3b8" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "marker",
                        {
                          id: "arrowhead-loop",
                          markerWidth: "8",
                          markerHeight: "6",
                          refX: "8",
                          refY: "3",
                          orient: "auto",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "0 0, 8 3, 0 6", fill: "#7c3aed" })
                        }
                      )
                    ] }),
                    connections.map((conn) => {
                      const from = blocks.find((b) => b.id === conn.fromBlockId);
                      const to = blocks.find((b) => b.id === conn.toBlockId);
                      if (!from || !to) return null;
                      const isLoopBack = conn.isLoopBack;
                      const isHovered = hoveredConnId === conn.id;
                      const x1 = isLoopBack ? from.position.x : from.position.x + BLOCK_W / 2;
                      const y1 = isLoopBack ? from.position.y + BLOCK_H / 2 : from.position.y + BLOCK_H;
                      const x2 = to.position.x + BLOCK_W / 2;
                      const y2 = isLoopBack ? to.position.y : to.position.y;
                      const path = isLoopBack ? getLoopBackPath(x1, y1, x2, y2) : getCurvePath(x1, y1, x2, y2);
                      const mx = (x1 + x2) / 2;
                      const my = (y1 + y2) / 2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { style: { pointerEvents: "all" }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: path,
                            fill: "none",
                            stroke: isHovered ? "#ef4444" : isLoopBack ? "#7c3aed" : "#94a3b8",
                            strokeWidth: isHovered ? 2.5 : 2,
                            strokeDasharray: isLoopBack ? "6 4" : void 0,
                            markerEnd: isLoopBack ? "url(#arrowhead-loop)" : "url(#arrowhead)",
                            onMouseEnter: () => setHoveredConnId(conn.id),
                            onMouseLeave: () => setHoveredConnId(null),
                            style: { cursor: "pointer" }
                          }
                        ),
                        isLoopBack && !isHovered && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: x1 - 60,
                            y: (y1 + y2) / 2,
                            fontSize: "9",
                            fill: "#7c3aed",
                            textAnchor: "middle",
                            dominantBaseline: "central",
                            style: { pointerEvents: "none", userSelect: "none" },
                            children: "loop back"
                          }
                        ),
                        isHovered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "g",
                          {
                            tabIndex: 0,
                            style: { cursor: "pointer" },
                            onClick: () => handleDeleteConnection(conn.id),
                            onKeyDown: (e) => {
                              if (e.key === "Enter") handleDeleteConnection(conn.id);
                            },
                            onMouseEnter: () => setHoveredConnId(conn.id),
                            onMouseLeave: () => setHoveredConnId(null),
                            "data-ocid": "flow_designer.delete_connection_button",
                            "aria-label": "Delete connection",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: mx, cy: my, r: 9, fill: "#ef4444" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "text",
                                {
                                  x: mx,
                                  y: my,
                                  textAnchor: "middle",
                                  dominantBaseline: "central",
                                  fill: "white",
                                  fontSize: "11",
                                  fontWeight: "bold",
                                  children: "×"
                                }
                              )
                            ]
                          }
                        )
                      ] }, conn.id);
                    }),
                    drawingConn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: getCurvePath(
                          drawingConn.fromX,
                          drawingConn.fromY,
                          drawingConn.curX,
                          drawingConn.curY
                        ),
                        fill: "none",
                        stroke: "#3b82f6",
                        strokeWidth: 2,
                        strokeDasharray: "6 3"
                      }
                    )
                  ]
                }
              ),
              blocks.map((block) => {
                const color = block.type === "loop_start" || block.type === "loop_end" ? "#7c3aed" : block.type === "break_loop" ? "#dc2626" : CATEGORY_COLORS[block.category];
                const isSelected = selectedBlockId === block.id;
                const isBreakLoop = block.type === "break_loop";
                const isLoopStart = block.type === "loop_start";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-block": true,
                    style: {
                      position: "absolute",
                      left: block.position.x,
                      top: block.position.y,
                      width: BLOCK_W,
                      minHeight: BLOCK_H,
                      cursor: "grab",
                      zIndex: isSelected ? 10 : 1
                    },
                    onMouseDown: (e) => handleBlockMouseDown(e, block.id),
                    onContextMenu: (e) => handleBlockRightClick(e, block.id),
                    "data-ocid": `flow_designer.block.${block.type}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: `rounded-xl border-2 bg-card shadow-md overflow-visible transition-shadow ${isSelected ? "shadow-lg" : ""}`,
                          style: {
                            borderColor: isSelected ? color : isBreakLoop ? "#fca5a5" : "#e2e8f0",
                            boxShadow: isBreakLoop ? "0 0 0 1px #fca5a5" : void 0
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-t-xl relative",
                                style: { background: `${color}18` },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "w-2 h-2 rounded-full flex-shrink-0",
                                      style: { background: color }
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "text-[10px] font-bold uppercase tracking-wide truncate",
                                      style: { color },
                                      children: block.type === "loop_start" || block.type === "loop_end" || block.type === "break_loop" ? "control flow" : block.category
                                    }
                                  ),
                                  isLoopStart && block.loopCountMax !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "span",
                                    {
                                      className: "ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                                      style: {
                                        background: "#7c3aed",
                                        color: "#fff",
                                        lineHeight: 1
                                      },
                                      children: [
                                        "↻ max ",
                                        block.loopCountMax,
                                        "×"
                                      ]
                                    }
                                  )
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2.5 py-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-tight truncate", children: block.label }),
                              block.prompt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight line-clamp-2", children: block.prompt }),
                              block.type === "loop_end" && block.breakCondition && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "p",
                                {
                                  className: "text-[9px] mt-1 leading-tight truncate",
                                  style: { color: "#7c3aed" },
                                  children: [
                                    "break if: ",
                                    block.breakCondition
                                  ]
                                }
                              ),
                              block.type === "break_loop" && block.condition && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "p",
                                {
                                  className: "text-[9px] mt-1 leading-tight truncate",
                                  style: { color: "#dc2626" },
                                  children: [
                                    "if: ",
                                    block.condition
                                  ]
                                }
                              )
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          "data-conn-dot": true,
                          style: {
                            position: "absolute",
                            top: -7,
                            left: BLOCK_W / 2 - 7,
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            background: "#fff",
                            border: `2px solid ${color}`,
                            cursor: "crosshair",
                            zIndex: 20
                          },
                          onMouseUp: (e) => handleInputDotMouseUp(e, block.id)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          "data-conn-dot": true,
                          style: {
                            position: "absolute",
                            bottom: -7,
                            left: BLOCK_W / 2 - 7,
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            background: color,
                            border: "2px solid #fff",
                            cursor: "crosshair",
                            zIndex: 20
                          },
                          onMouseDown: (e) => handleOutputDotMouseDown(e, block.id)
                        }
                      ),
                      block.type === "loop_end" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          "data-conn-dot": true,
                          title: "Drag from here back to Loop Start",
                          style: {
                            position: "absolute",
                            top: BLOCK_H / 2 - 7,
                            left: -7,
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            background: "#7c3aed",
                            border: "2px solid #fff",
                            cursor: "crosshair",
                            zIndex: 20
                          },
                          onMouseDown: (e) => handleOutputDotMouseDown(e, block.id)
                        }
                      )
                    ]
                  },
                  block.id
                );
              })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 flex items-center gap-1 bg-card border border-border rounded-lg shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleZoomOut,
              className: "px-2 py-1 text-sm text-muted-foreground hover:bg-muted transition-colors border-r border-border",
              "aria-label": "Zoom out",
              "data-ocid": "flow_designer.zoom_out_button",
              disabled: zoomPct <= MIN_ZOOM * 100,
              children: "−"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 text-xs text-muted-foreground tabular-nums min-w-[40px] text-center", children: [
            zoomPct,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleZoomIn,
              className: "px-2 py-1 text-sm text-muted-foreground hover:bg-muted transition-colors border-l border-border",
              "aria-label": "Zoom in",
              "data-ocid": "flow_designer.zoom_in_button",
              disabled: zoomPct >= MAX_ZOOM * 100,
              children: "+"
            }
          )
        ] }),
        blocks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              role: "img",
              "aria-label": "Empty canvas placeholder",
              className: "w-8 h-8 text-muted-foreground",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M4 5h16M4 12h16M4 19h16"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Drag blocks here to start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "or click a block type in the left panel" })
        ] }) }),
        ctxMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fixed z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px]",
            style: { left: ctxMenu.x, top: ctxMenu.y },
            onMouseLeave: () => setCtxMenu(null),
            "data-ocid": "flow_designer.context_menu",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors",
                  onClick: () => handleCtxAction("edit"),
                  "data-ocid": "flow_designer.ctx_edit_button",
                  children: "Edit Properties"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors",
                  onClick: () => handleCtxAction("duplicate"),
                  "data-ocid": "flow_designer.ctx_duplicate_button",
                  children: "Duplicate Block"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full text-left px-3 py-1.5 text-xs hover:bg-destructive/10 text-destructive transition-colors",
                  onClick: () => handleCtxAction("delete"),
                  "data-ocid": "flow_designer.ctx_delete_button",
                  children: "Delete Block"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function autoLayout(blocks, connections) {
  var _a, _b;
  if (blocks.length === 0) return blocks;
  const children = {};
  const parents = {};
  for (const b of blocks) {
    children[b.id] = [];
    parents[b.id] = [];
  }
  for (const c of connections) {
    if (c.isLoopBack) continue;
    (_a = children[c.fromBlockId]) == null ? void 0 : _a.push(c.toBlockId);
    (_b = parents[c.toBlockId]) == null ? void 0 : _b.push(c.fromBlockId);
  }
  const roots = blocks.filter((b) => {
    var _a2;
    return (((_a2 = parents[b.id]) == null ? void 0 : _a2.length) ?? 0) === 0;
  }).map((b) => b.id);
  if (roots.length === 0) roots.push(blocks[0].id);
  const visited = /* @__PURE__ */ new Set();
  const result = [...blocks];
  const GAP_X = 220;
  const GAP_Y = 140;
  function place(id, col, row) {
    if (visited.has(id)) return;
    visited.add(id);
    const idx = result.findIndex((b) => b.id === id);
    if (idx >= 0) {
      result[idx] = {
        ...result[idx],
        position: { x: col * GAP_X + 40, y: row * GAP_Y + 40 }
      };
    }
    const kids = children[id] ?? [];
    kids.forEach((kid, i) => place(kid, col + i, row + 1));
  }
  roots.forEach((root, i) => place(root, i * 2, 0));
  let extraCol = roots.length * 2;
  for (const b of result) {
    if (!visited.has(b.id)) {
      const idx = result.findIndex((x) => x.id === b.id);
      result[idx] = {
        ...result[idx],
        position: { x: extraCol * GAP_X + 40, y: 40 }
      };
      extraCol++;
    }
  }
  return result;
}
function syntaxHighlight(json) {
  return json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "text-blue-400";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-green-400";
        } else {
          cls = "text-yellow-300";
        }
      } else if (/true|false/.test(match)) {
        cls = "text-purple-400";
      } else if (/null/.test(match)) {
        cls = "text-red-400";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}
function FlowPreview({ flowState }) {
  const json = reactExports.useMemo(() => JSON.stringify(flowState, null, 2), [flowState]);
  const highlighted = reactExports.useMemo(() => syntaxHighlight(json), [json]);
  function handleCopy() {
    navigator.clipboard.writeText(json);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full",
      "data-ocid": "flow_designer.json_preview",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
            "Flow JSON — ",
            flowState.blocks.length,
            " blocks,",
            " ",
            flowState.connections.length,
            " connections"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleCopy,
              className: "text-xs text-primary hover:underline",
              "data-ocid": "flow_designer.copy_json_button",
              children: "Copy"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "pre",
          {
            className: "text-[11px] font-mono p-3 leading-relaxed min-h-full",
            style: { background: "#0f172a", color: "#e2e8f0" },
            dangerouslySetInnerHTML: { __html: highlighted }
          }
        ) })
      ]
    }
  );
}
function PropertyPanel({
  block,
  allBlocks,
  onUpdate
}) {
  const [local, setLocal] = reactExports.useState(block);
  reactExports.useEffect(() => {
    setLocal(block);
  }, [block == null ? void 0 : block.id]);
  if (!local) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-full gap-3 p-6",
        "data-ocid": "flow_designer.property_panel_empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              role: "img",
              "aria-label": "Select a block to edit properties",
              className: "w-6 h-6 text-muted-foreground",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground text-center", children: "Click a block to edit its properties" })
        ]
      }
    );
  }
  const meta = BLOCK_TYPE_META[local.type];
  const color = CATEGORY_COLORS[local.category];
  const hasOptions = local.type === "quick_reply" || local.type === "if_else" || local.type === "loop_end";
  const hasVariable = [
    "text_input",
    "location_input",
    "phone_input",
    "set_variable"
  ].includes(local.type);
  function push(updates) {
    const updated = { ...local, ...updates };
    setLocal(updated);
    onUpdate(updated);
  }
  function handleAddOption() {
    const opt = {
      id: `opt_${Date.now()}`,
      label: `Option ${((local == null ? void 0 : local.options.length) ?? 0) + 1}`
    };
    push({ options: [...(local == null ? void 0 : local.options) ?? [], opt] });
  }
  function handleOptionChange(idx, label) {
    const opts = [...(local == null ? void 0 : local.options) ?? []];
    opts[idx] = { ...opts[idx], label };
    push({ options: opts });
  }
  function handleRemoveOption(idx) {
    const opts = [...(local == null ? void 0 : local.options) ?? []];
    opts.splice(idx, 1);
    push({ options: opts });
  }
  const otherBlocks = allBlocks.filter((b) => b.id !== local.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 flex flex-col gap-4",
      "data-ocid": "flow_designer.property_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 p-2.5 rounded-lg",
            style: { background: `${color}12` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2.5 h-2.5 rounded-full",
                  style: { background: color }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", style: { color }, children: meta.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] text-muted-foreground uppercase tracking-wide", children: local.category })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "block-label", className: "text-xs", children: "Block Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "block-label",
              value: local.label,
              onChange: (e) => push({ label: e.target.value }),
              className: "h-8 text-xs",
              "data-ocid": "flow_designer.block_label_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "block-prompt", className: "text-xs", children: "Message / Prompt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "block-prompt",
              value: local.prompt,
              onChange: (e) => push({ prompt: e.target.value }),
              rows: 3,
              className: "text-xs resize-none",
              placeholder: "The message or question this block sends...",
              "data-ocid": "flow_designer.block_prompt_input"
            }
          )
        ] }),
        hasOptions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: local.type === "loop_end" ? "Loop Options" : "Options" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-6 px-2 text-xs gap-1",
                onClick: handleAddOption,
                "data-ocid": "flow_designer.add_option_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                  "Add"
                ]
              }
            )
          ] }),
          local.type === "loop_end" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded px-2 py-1", children: '🔁 Loop End: option "➕ Add Another" connects back to Loop Start; option "✅ End / Done" connects to the next step after the loop.' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            (local.options ?? []).map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5",
                "data-ocid": `flow_designer.option_row.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: opt.label,
                      onChange: (e) => handleOptionChange(i, e.target.value),
                      className: "h-7 text-xs flex-1",
                      placeholder: `Option ${i + 1}`,
                      "data-ocid": `flow_designer.option_input.${i + 1}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 text-destructive hover:text-destructive",
                      onClick: () => handleRemoveOption(i),
                      "data-ocid": `flow_designer.remove_option_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              opt.id
            )),
            (local.options ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "No options yet. Click Add to create one." })
          ] })
        ] }),
        local.type === "loop_start" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg px-3 py-2 text-[10px] text-orange-700 dark:text-orange-400 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "🔁 Loop Start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'Connect the output of "Loop End → Add Another" back to this block to create a repeating loop (e.g. multi-branch entry).' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            'The "Loop End → End / Done" option should connect to the step',
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "after" }),
            " the loop."
          ] })
        ] }),
        local.type === "break_loop" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg px-3 py-2 text-[10px] text-red-700 dark:text-red-400 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "⛔ Break / Exit Loop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'Place this block inside a loop to provide an early exit path (e.g. "Cancel", "Skip All"). Connect it to the step after the loop.' })
        ] }),
        hasVariable && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "variable-name", className: "text-xs", children: "Variable Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "variable-name",
              value: local.variableName ?? "",
              onChange: (e) => push({ variableName: e.target.value }),
              className: "h-8 text-xs",
              placeholder: "e.g. customer_name",
              "data-ocid": "flow_designer.variable_name_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "User response will be stored in this variable" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Default Next Block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: local.nextBlockId ?? "none",
              onValueChange: (v) => push({ nextBlockId: v === "none" ? void 0 : v }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-8 text-xs",
                    "data-ocid": "flow_designer.next_block_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "None (end flow)" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "None (end flow)" }),
                  otherBlocks.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b.id, children: b.label }, b.id))
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            "Block ID:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground", children: local.id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
            "Type: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground", children: local.type })
          ] })
        ] })
      ]
    }
  );
}
var POPOVER_NAME = "Popover";
var [createPopoverContext] = createContextScope(POPOVER_NAME, [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover$1 = (props) => {
  const {
    __scopePopover,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = false
  } = props;
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = reactExports.useRef(null);
  const [hasCustomAnchor, setHasCustomAnchor] = reactExports.useState(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverProvider,
    {
      scope: __scopePopover,
      contentId: useId(),
      triggerRef,
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      hasCustomAnchor,
      onCustomAnchorAdd: reactExports.useCallback(() => setHasCustomAnchor(true), []),
      onCustomAnchorRemove: reactExports.useCallback(() => setHasCustomAnchor(false), []),
      modal,
      children
    }
  ) });
};
Popover$1.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...anchorProps } = props;
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
    reactExports.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }
);
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME = "PopoverTrigger";
var PopoverTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    const trigger = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: trigger });
  }
);
PopoverTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, {
  forceMount: void 0
});
var PopoverPortal = (props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
PopoverPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "PopoverContent";
var PopoverContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
PopoverContent$1.displayName = CONTENT_NAME;
var Slot = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          if (!isRightClickOutsideRef.current) (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          },
          { checkForDefaultPrevented: false }
        ),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
var PopoverContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var PopoverContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...contentProps
    } = props;
    const context = usePopoverContext(CONTENT_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DismissableLayer,
          {
            asChild: true,
            disableOutsidePointerEvents,
            onInteractOutside,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onDismiss: () => context.onOpenChange(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Content,
              {
                "data-state": getState(context.open),
                role: "dialog",
                id: context.contentId,
                ...popperScope,
                ...contentProps,
                ref: forwardedRef,
                style: {
                  ...contentProps.style,
                  // re-namespace exposed content custom properties
                  ...{
                    "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                  }
                }
              }
            )
          }
        )
      }
    );
  }
);
var CLOSE_NAME = "PopoverClose";
var PopoverClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
PopoverClose.displayName = CLOSE_NAME;
var ARROW_NAME = "PopoverArrow";
var PopoverArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
PopoverArrow.displayName = ARROW_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Popover$1;
var Trigger = PopoverTrigger$1;
var Portal = PopoverPortal;
var Content2 = PopoverContent$1;
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function useBackendActor() {
  return useActor(createActor);
}
function useSaveFlow() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      environment,
      flowJson,
      existingId
    }) => {
      if (!actor) throw new Error("Backend actor unavailable");
      const id = existingId ?? `flow_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const nowNs = BigInt(Date.now()) * BigInt(1e6);
      const actorAny = actor;
      if (typeof actorAny.saveFlow === "function") {
        const backendFlow = {
          id,
          name,
          flowJson: (flowJson == null ? void 0 : flowJson.trim().startsWith("{")) ? flowJson : '{"blocks":[],"connections":[]}',
          environment,
          createdAt: nowNs,
          updatedAt: nowNs,
          version: BigInt(1)
        };
        await actorAny.saveFlow(
          backendFlow
        );
        return id;
      }
      if (typeof actorAny.saveFlowDefinition === "function") {
        const result = await actorAny.saveFlowDefinition(name, environment, flowJson);
        return result;
      }
      throw new Error("No saveFlow method available on backend");
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["flow-definitions", vars.environment]
      });
      qc.invalidateQueries({ queryKey: ["registry-flows"] });
    }
  });
}
function useGetFlows(environment) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    // live-data-only: removed localStorage flow cache; always read from backend via getAllFlows()
    queryKey: ["flow-definitions", environment],
    queryFn: async () => {
      if (!actor) throw new Error("Backend actor unavailable");
      const actorAny = actor;
      if (typeof actorAny.getAllFlows === "function") {
        const raw = await actorAny.getAllFlows();
        return (raw ?? []).map((f) => ({
          ...f,
          flowJson: typeof f.flowJson === "string" && f.flowJson.trim().startsWith("{") ? f.flowJson : '{"blocks":[],"connections":[]}',
          version: Number(f.version),
          createdAt: Number(f.createdAt),
          updatedAt: Number(f.updatedAt)
        }));
      }
      if (typeof actorAny.listFlows === "function") {
        const raw = await actorAny.listFlows();
        return (raw ?? []).map((f) => ({
          id: f.id,
          name: f.name,
          environment: f.environment ?? "live",
          flowJson: typeof f.flowJson === "string" && f.flowJson.trim().startsWith("{") ? f.flowJson : '{"blocks":[],"connections":[]}',
          version: Number(f.version),
          createdAt: Number(f.createdAt),
          updatedAt: Number(f.updatedAt)
        }));
      }
      throw new Error("No flow query method available on backend");
    },
    enabled: !isFetching,
    staleTime: 5e3,
    refetchInterval: 15e3
  });
}
function useListFlows() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["registry-flows"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend actor unavailable");
      const actorAny = actor;
      if (typeof actorAny.listFlows === "function") {
        const raw = await actorAny.listFlows();
        return (raw ?? []).map((f) => ({
          id: f.id,
          name: f.name,
          flowJson: f.flowJson ?? "",
          environment: f.environment ?? "live",
          createdAt: Number(f.createdAt),
          updatedAt: Number(f.updatedAt),
          version: Number(f.version)
        }));
      }
      throw new Error("listFlows not available on backend");
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e4,
    refetchInterval: 3e4
  });
}
function useDeployToLive() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (flowId) => {
      if (!actor) throw new Error("Backend actor unavailable");
      const actorAny = actor;
      if (typeof actorAny.deployFlowToLive === "function") {
        return actorAny.deployFlowToLive(
          flowId
        );
      }
      throw new Error("deployFlowToLive not available on backend");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["flow-definitions", "live"] });
      qc.invalidateQueries({ queryKey: ["flow-definitions", "test"] });
      qc.invalidateQueries({ queryKey: ["registry-flows"] });
    }
  });
}
function FlowDesignerPage() {
  const [registryFlows, setRegistryFlows] = reactExports.useState(
    () => getAllRegistryFlows()
  );
  const { data: backendFlows = [] } = useListFlows();
  reactExports.useEffect(() => {
    const handler = () => setRegistryFlows(getAllRegistryFlows());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  reactExports.useEffect(() => {
    if (backendFlows.length > 0) {
      setRegistryFlows(getAllRegistryFlows());
    }
  }, [backendFlows]);
  const allLoadableFlows = reactExports.useMemo(() => {
    const backendMap = new Map(backendFlows.map((f) => [f.id, f]));
    return registryFlows.map((rf) => {
      const backend = backendMap.get(rf.id);
      const backendJson = (backend == null ? void 0 : backend.flowJson) ?? "";
      const registryJson = rf.flowJson ?? "";
      function hasBlocks(j) {
        try {
          const p = JSON.parse(j);
          return Array.isArray(p.blocks) && p.blocks.length > 0;
        } catch {
          return false;
        }
      }
      const bestJson = hasBlocks(registryJson) ? registryJson : hasBlocks(backendJson) ? backendJson : backendJson || registryJson || '{"blocks":[],"connections":[]}';
      return {
        id: rf.id,
        name: rf.name,
        description: rf.description,
        isCustomized: isFlowCustomized(rf.id),
        flowJson: bestJson,
        updatedAt: backend == null ? void 0 : backend.updatedAt,
        version: backend == null ? void 0 : backend.version
      };
    });
  }, [registryFlows, backendFlows]);
  const [flowName, setFlowName] = reactExports.useState("New Flow");
  const [environment, setEnvironment] = reactExports.useState("test");
  const [flowState, setFlowState] = reactExports.useState({
    blocks: [],
    connections: []
  });
  const [selectedBlockId, setSelectedBlockId] = reactExports.useState(null);
  const [rightPanel, setRightPanel] = reactExports.useState("properties");
  const [savedFlowId, setSavedFlowId] = reactExports.useState(null);
  const [hasUnsaved, setHasUnsaved] = reactExports.useState(false);
  const [deployDialogOpen, setDeployDialogOpen] = reactExports.useState(false);
  const [autoLayoutKey, setAutoLayoutKey] = reactExports.useState(0);
  const [loadFlowOpen, setLoadFlowOpen] = reactExports.useState(false);
  const [loadFlowSearch, setLoadFlowSearch] = reactExports.useState("");
  const saveFlow = useSaveFlow();
  const { data: savedFlows = [] } = useGetFlows(environment);
  const deployFlow = useDeployToLive();
  const sortedSavedFlows = reactExports.useMemo(
    () => [...savedFlows].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)),
    [savedFlows]
  );
  const filteredBuiltin = reactExports.useMemo(
    () => allLoadableFlows.filter(
      (f) => f.name.toLowerCase().includes(loadFlowSearch.toLowerCase())
    ),
    [allLoadableFlows, loadFlowSearch]
  );
  const filteredSaved = reactExports.useMemo(
    () => sortedSavedFlows.filter(
      (f) => f.name.toLowerCase().includes(loadFlowSearch.toLowerCase())
    ),
    [sortedSavedFlows, loadFlowSearch]
  );
  const selectedBlock = flowState.blocks.find((b) => b.id === selectedBlockId) ?? null;
  function handleBlocksChange(blocks) {
    setFlowState((s) => ({ ...s, blocks }));
    setHasUnsaved(true);
  }
  function handleConnectionsChange(connections) {
    setFlowState((s) => ({ ...s, connections }));
    setHasUnsaved(true);
  }
  function handleBlockUpdate(updated) {
    setFlowState((s) => ({
      ...s,
      blocks: s.blocks.map((b) => b.id === updated.id ? updated : b)
    }));
    setHasUnsaved(true);
  }
  async function handleSave() {
    const flowJson = JSON.stringify(flowState);
    const flowEntry = {
      id: savedFlowId ?? `flow_${Date.now()}`,
      name: flowName,
      environment,
      flowJson,
      updatedAt: Date.now()
    };
    registerFlow({
      id: flowEntry.id,
      name: flowName,
      description: `Custom flow: ${flowName}`,
      category: "customer",
      triggerPayload: flowEntry.id,
      roles: ["all"],
      flowJson
    });
    setRegistryFlows(getAllRegistryFlows());
    try {
      const result = await saveFlow.mutateAsync({
        name: flowName,
        environment,
        flowJson,
        existingId: flowEntry.id
      });
      const newId = result;
      setSavedFlowId(newId);
      setHasUnsaved(false);
      ue.success("Flow saved successfully");
    } catch {
      setSavedFlowId(flowEntry.id);
      setHasUnsaved(false);
      ue.error("Failed to save flow to backend — please retry.");
    }
  }
  function handleLoadFlow(flowJson, id, name) {
    try {
      const parsed = JSON.parse(flowJson);
      const safeState = {
        blocks: Array.isArray(parsed.blocks) ? parsed.blocks : [],
        connections: Array.isArray(parsed.connections) ? parsed.connections : []
      };
      setFlowState(safeState);
      setFlowName(name);
      setSavedFlowId(id);
      setHasUnsaved(false);
      setSelectedBlockId(null);
    } catch {
      ue.error("Failed to load flow");
    }
  }
  function handleTestInSimulator() {
    const url = `/chatbot?flow=${encodeURIComponent(JSON.stringify(flowState))}`;
    window.open(url, "_blank");
  }
  async function handleDeploy() {
    if (!savedFlowId) {
      ue.error("Save the flow first before deploying");
      return;
    }
    try {
      await deployFlow.mutateAsync(savedFlowId);
      ue.success("Flow deployed to live successfully");
      setDeployDialogOpen(false);
    } catch {
      ue.error("Deploy failed");
    }
  }
  const canDeploy = environment === "test" && !!savedFlowId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-[calc(100vh-64px)] bg-background",
      "data-ocid": "flow_designer.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2.5 bg-card border-b border-border shadow-sm flex-shrink-0 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-5 h-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: flowName,
                onChange: (e) => {
                  setFlowName(e.target.value);
                  setHasUnsaved(true);
                },
                className: "font-semibold text-sm max-w-[220px] h-8",
                "data-ocid": "flow_designer.name_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: environment,
                  onValueChange: (v) => setEnvironment(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-8 w-[110px] text-xs",
                        "data-ocid": "flow_designer.environment_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "test", children: "Test" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "live", children: "Live" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: environment === "test" ? "text-yellow-700 border-yellow-300 bg-yellow-50 gap-1" : "text-green-700 border-green-300 bg-green-50 gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-1.5 h-1.5 rounded-full ${environment === "test" ? "bg-yellow-500" : "bg-green-500"}`
                      }
                    ),
                    environment === "test" ? "TEST" : "LIVE"
                  ]
                }
              )
            ] }),
            hasUnsaved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Unsaved changes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: loadFlowOpen, onOpenChange: setLoadFlowOpen, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 gap-1",
                  "data-ocid": "flow_designer.load_flow_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                    "Load",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                PopoverContent,
                {
                  align: "end",
                  className: "w-[320px] p-0",
                  "data-ocid": "flow_designer.load_flow_panel",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "pl-7 h-7 text-xs",
                          placeholder: "Search flows…",
                          value: loadFlowSearch,
                          onChange: (e) => setLoadFlowSearch(e.target.value),
                          "data-ocid": "flow_designer.load_flow_search_input"
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "overflow-y-auto max-h-96 p-1",
                        style: { scrollbarWidth: "thin" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider px-2 py-1.5 font-semibold flex items-center gap-1.5", children: [
                            "All Flows",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[9px] px-1 py-0", children: allLoadableFlows.length })
                          ] }),
                          filteredBuiltin.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-2 py-1", children: allLoadableFlows.length === 0 ? "No flows in registry yet — save a flow to add it" : "No matches" }),
                          filteredBuiltin.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "w-full text-left px-2 py-2 rounded-md hover:bg-muted transition-colors flex flex-col gap-0.5",
                              onClick: () => {
                                handleLoadFlow(f.flowJson, f.id, f.name);
                                setLoadFlowOpen(false);
                                setLoadFlowSearch("");
                                ue.success(`Loaded: ${f.name}`);
                              },
                              "data-ocid": "flow_designer.load_builtin_flow_item",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-xs text-foreground truncate", children: f.name }),
                                  f.isCustomized && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    Badge,
                                    {
                                      variant: "outline",
                                      className: "text-[9px] px-1 py-0 text-violet-700 border-violet-300 gap-0.5 shrink-0",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-2.5 h-2.5" }),
                                        "customized"
                                      ]
                                    }
                                  ),
                                  f.version && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    Badge,
                                    {
                                      variant: "secondary",
                                      className: "text-[9px] px-1 py-0 shrink-0",
                                      children: [
                                        "v",
                                        f.version
                                      ]
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground truncate", children: f.description })
                              ]
                            },
                            f.id
                          )),
                          filteredSaved.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border mt-1 pt-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider px-2 py-1.5 font-semibold flex items-center gap-1", children: [
                              "Saved Flows",
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[9px] px-1 py-0", children: environment })
                            ] }),
                            filteredSaved.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                className: "w-full text-left px-2 py-2 rounded-md hover:bg-muted transition-colors flex items-center gap-2",
                                onClick: () => {
                                  handleLoadFlow(f.flowJson, f.id, f.name);
                                  setLoadFlowOpen(false);
                                  setLoadFlowSearch("");
                                },
                                "data-ocid": "flow_designer.load_flow_item",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: f.name }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                                      "v",
                                      f.version,
                                      " ·",
                                      " ",
                                      f.updatedAt ? new Date(
                                        Number(f.updatedAt) / 1e6
                                      ).toLocaleDateString() : "—"
                                    ] })
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Badge,
                                    {
                                      variant: "outline",
                                      className: f.environment === "live" ? "text-green-700 border-green-300 text-[9px]" : "text-yellow-700 border-yellow-300 text-[9px]",
                                      children: f.environment
                                    }
                                  )
                                ]
                              },
                              f.id
                            ))
                          ] }),
                          filteredBuiltin.length === 0 && filteredSaved.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "text-xs text-muted-foreground text-center py-4",
                              "data-ocid": "flow_designer.load_flow_empty_state",
                              children: [
                                'No flows match "',
                                loadFlowSearch,
                                '"'
                              ]
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-8 gap-1",
                onClick: () => setAutoLayoutKey((k) => k + 1),
                "data-ocid": "flow_designer.auto_layout_button",
                title: "Auto-arrange blocks",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlignLeft, { className: "w-3.5 h-3.5" }),
                  "Auto Layout"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-8 gap-1",
                onClick: handleTestInSimulator,
                "data-ocid": "flow_designer.test_simulator_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                  "Test"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "default",
                size: "sm",
                className: "h-8 gap-1",
                onClick: handleSave,
                disabled: saveFlow.isPending,
                "data-ocid": "flow_designer.save_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                  saveFlow.isPending ? "Saving..." : "Save"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "default",
                size: "sm",
                className: "h-8 gap-1 bg-green-600 hover:bg-green-700 text-white",
                onClick: () => setDeployDialogOpen(true),
                disabled: !canDeploy || deployFlow.isPending,
                "data-ocid": "flow_designer.deploy_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-3.5 h-3.5" }),
                  "Deploy"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "w-[250px] shrink-0 border-r border-border bg-card overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            BlockLibrary,
            {
              onAddBlock: (block) => handleBlocksChange([...flowState.blocks, block])
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0 relative bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FlowCanvas,
            {
              blocks: flowState.blocks,
              connections: flowState.connections,
              selectedBlockId,
              autoLayoutKey,
              onBlocksChange: handleBlocksChange,
              onConnectionsChange: handleConnectionsChange,
              onSelectBlock: setSelectedBlockId
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-[320px] shrink-0 border-l border-border bg-card flex flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-border flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: rightPanel === "properties" ? "flex-1 py-2 text-xs font-medium transition-colors bg-muted text-foreground" : "flex-1 py-2 text-xs font-medium transition-colors text-muted-foreground hover:text-foreground",
                  onClick: () => setRightPanel("properties"),
                  "data-ocid": "flow_designer.properties_tab",
                  children: "Properties"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: rightPanel === "preview" ? "flex-1 py-2 text-xs font-medium transition-colors bg-muted text-foreground" : "flex-1 py-2 text-xs font-medium transition-colors text-muted-foreground hover:text-foreground",
                  onClick: () => setRightPanel("preview"),
                  "data-ocid": "flow_designer.preview_tab",
                  children: "JSON Preview"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: rightPanel === "properties" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              PropertyPanel,
              {
                block: selectedBlock,
                allBlocks: flowState.blocks,
                onUpdate: handleBlockUpdate
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(FlowPreview, { flowState }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deployDialogOpen, onOpenChange: setDeployDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "flow_designer.deploy_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Deploy flow to live?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: flowName }),
              " will be visible to all users immediately. Existing live flows will not be affected unless you override them."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "flow_designer.deploy_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDeploy,
                disabled: deployFlow.isPending,
                className: "bg-green-600 hover:bg-green-700",
                "data-ocid": "flow_designer.deploy_confirm_button",
                children: deployFlow.isPending ? "Deploying..." : "Deploy to Live"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  FlowDesignerPage as default
};
