import { CATEGORY_COLORS, makeBlock } from "@/types/flowDesigner";
import type { FlowBlock, FlowConnection } from "@/types/flowDesigner";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDragBlockType } from "./BlockLibrary";

interface FlowCanvasProps {
  blocks: FlowBlock[];
  connections: FlowConnection[];
  selectedBlockId: string | null;
  autoLayoutKey: number;
  onBlocksChange: (blocks: FlowBlock[]) => void;
  onConnectionsChange: (connections: FlowConnection[]) => void;
  onSelectBlock: (id: string | null) => void;
}

interface Transform {
  x: number;
  y: number;
  scale: number;
}

const BLOCK_W = 180;
const BLOCK_H = 80;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 3.0;

export default function FlowCanvas({
  blocks,
  connections,
  selectedBlockId,
  autoLayoutKey,
  onBlocksChange,
  onConnectionsChange,
  onSelectBlock,
}: FlowCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const transformRef = useRef<Transform>({ x: 60, y: 60, scale: 1 });
  const [transformState, setTransformState] = useState<Transform>({
    x: 60,
    y: 60,
    scale: 1,
  });
  const [zoomPct, setZoomPct] = useState(100);

  const isPanning = useRef(false);
  const panStart = useRef<{
    mx: number;
    my: number;
    tx: number;
    ty: number;
  } | null>(null);

  // Connection drawing state
  const [drawingConn, setDrawingConn] = useState<{
    fromBlockId: string;
    fromX: number;
    fromY: number;
    curX: number;
    curY: number;
  } | null>(null);

  // Dragging block
  const draggingBlock = useRef<{
    id: string;
    startBx: number;
    startBy: number;
    startMx: number;
    startMy: number;
  } | null>(null);

  // Context menu
  const [ctxMenu, setCtxMenu] = useState<{
    blockId: string;
    x: number;
    y: number;
  } | null>(null);

  // Hover connection
  const [hoveredConnId, setHoveredConnId] = useState<string | null>(null);

  // Auto-layout effect — intentionally triggered only by autoLayoutKey change
  const blocksRef = useRef(blocks);
  const connectionsRef = useRef(connections);
  const onBlocksChangeRef = useRef(onBlocksChange);
  blocksRef.current = blocks;
  connectionsRef.current = connections;
  onBlocksChangeRef.current = onBlocksChange;

  useEffect(() => {
    if (autoLayoutKey === 0) return;
    onBlocksChangeRef.current(
      autoLayout(blocksRef.current, connectionsRef.current),
    );
  }, [autoLayoutKey]);

  // Wheel zoom — uses passive:false to allow preventDefault, no RAF to avoid state accumulation
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setTransformState((prev) => {
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, prev.scale * delta),
      );
      if (newScale === prev.scale) return prev;

      // Zoom centered on cursor position
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      // Point in canvas space under cursor
      const canvasX = (cursorX - prev.x) / prev.scale;
      const canvasY = (cursorY - prev.y) / prev.scale;
      // New translate so cursor stays on same canvas point
      const newX = cursorX - canvasX * newScale;
      const newY = cursorY - canvasY * newScale;

      const next: Transform = { x: newX, y: newY, scale: newScale };
      transformRef.current = next;
      return next;
    });
    setZoomPct(Math.round(transformRef.current.scale * 100));
  }, []);

  // Add wheel listener with passive:false so we can prevent scrolling the page
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Keep zoomPct in sync after wheel (runs after setState)
  useEffect(() => {
    setZoomPct(Math.round(transformState.scale * 100));
  }, [transformState.scale]);

  // Pan start
  function handleMouseDownCanvas(e: React.MouseEvent) {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-block]")) return;
    isPanning.current = true;
    const t = transformRef.current;
    panStart.current = {
      mx: e.clientX,
      my: e.clientY,
      tx: t.x,
      ty: t.y,
    };
    setCtxMenu(null);
    onSelectBlock(null);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (isPanning.current && panStart.current) {
      const dx = e.clientX - panStart.current.mx;
      const dy = e.clientY - panStart.current.my;
      const next: Transform = {
        ...transformRef.current,
        x: panStart.current.tx + dx,
        y: panStart.current.ty + dy,
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
        blocks.map((b) =>
          b.id === id
            ? { ...b, position: { x: startBx + dx, y: startBy + dy } }
            : b,
        ),
      );
    }
    if (drawingConn) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const t = transformRef.current;
      setDrawingConn((d) =>
        d
          ? {
              ...d,
              curX: (e.clientX - rect.left - t.x) / t.scale,
              curY: (e.clientY - rect.top - t.y) / t.scale,
            }
          : null,
      );
    }
  }

  function handleMouseUp(_e: React.MouseEvent) {
    isPanning.current = false;
    panStart.current = null;
    draggingBlock.current = null;
    if (drawingConn) setDrawingConn(null);
  }

  // Drop from BlockLibrary
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const type = getDragBlockType();
    if (!type) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t = transformRef.current;
    const x = (e.clientX - rect.left - t.x) / t.scale;
    const y = (e.clientY - rect.top - t.y) / t.scale;
    const block = makeBlock(type, { x, y });
    onBlocksChange([...blocks, block]);
  }

  // Block drag
  function handleBlockMouseDown(e: React.MouseEvent, blockId: string) {
    e.stopPropagation();
    if ((e.target as HTMLElement).closest("[data-conn-dot]")) return;
    onSelectBlock(blockId);
    const block = blocks.find((b) => b.id === blockId)!;
    draggingBlock.current = {
      id: blockId,
      startBx: block.position.x,
      startBy: block.position.y,
      startMx: e.clientX,
      startMy: e.clientY,
    };
  }

  // Connection drawing: start from output dot
  function handleOutputDotMouseDown(e: React.MouseEvent, blockId: string) {
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
      curY: fromY,
    });
  }

  // Connection drawing: end on input dot
  function handleInputDotMouseUp(e: React.MouseEvent, blockId: string) {
    e.stopPropagation();
    if (!drawingConn || drawingConn.fromBlockId === blockId) {
      setDrawingConn(null);
      return;
    }
    const duplicate = connections.find(
      (c) =>
        c.fromBlockId === drawingConn.fromBlockId && c.toBlockId === blockId,
    );
    if (!duplicate) {
      const fromBlock = blocks.find((b) => b.id === drawingConn.fromBlockId);
      const toBlock = blocks.find((b) => b.id === blockId);
      // Mark as loop-back if from block is loop_end and to block is loop_start,
      // or if the target's Y is above the source (visual back-edge)
      const isLoopBack =
        (fromBlock?.type === "loop_end" && toBlock?.type === "loop_start") ||
        (toBlock !== undefined &&
          fromBlock !== undefined &&
          toBlock.position.y < fromBlock.position.y - 40);

      const conn: FlowConnection = {
        id: `conn_${Date.now()}`,
        fromBlockId: drawingConn.fromBlockId,
        toBlockId: blockId,
        isLoopBack,
      };
      onConnectionsChange([...connections, conn]);
    }
    setDrawingConn(null);
  }

  function handleDeleteConnection(connId: string) {
    onConnectionsChange(connections.filter((c) => c.id !== connId));
  }

  // Context menu
  function handleBlockRightClick(e: React.MouseEvent, blockId: string) {
    e.preventDefault();
    setCtxMenu({ blockId, x: e.clientX, y: e.clientY });
    onSelectBlock(blockId);
  }

  function handleCtxAction(action: string) {
    if (!ctxMenu) return;
    const { blockId } = ctxMenu;
    setCtxMenu(null);
    if (action === "delete") {
      onBlocksChange(blocks.filter((b) => b.id !== blockId));
      onConnectionsChange(
        connections.filter(
          (c) => c.fromBlockId !== blockId && c.toBlockId !== blockId,
        ),
      );
      if (selectedBlockId === blockId) onSelectBlock(null);
    }
    if (action === "duplicate") {
      const src = blocks.find((b) => b.id === blockId);
      if (!src) return;
      const dup = {
        ...src,
        id: `block_${Date.now()}`,
        position: { x: src.position.x + 30, y: src.position.y + 30 },
      };
      onBlocksChange([...blocks, dup]);
    }
  }

  // Zoom buttons
  function handleZoomIn() {
    const rect = containerRef.current?.getBoundingClientRect();
    const cx = rect ? rect.width / 2 : 0;
    const cy = rect ? rect.height / 2 : 0;
    setTransformState((prev) => {
      const newScale = Math.min(MAX_ZOOM, prev.scale * 1.2);
      const canvasX = (cx - prev.x) / prev.scale;
      const canvasY = (cy - prev.y) / prev.scale;
      const next: Transform = {
        x: cx - canvasX * newScale,
        y: cy - canvasY * newScale,
        scale: newScale,
      };
      transformRef.current = next;
      return next;
    });
  }

  function handleZoomOut() {
    const rect = containerRef.current?.getBoundingClientRect();
    const cx = rect ? rect.width / 2 : 0;
    const cy = rect ? rect.height / 2 : 0;
    setTransformState((prev) => {
      const newScale = Math.max(MIN_ZOOM, prev.scale / 1.2);
      const canvasX = (cx - prev.x) / prev.scale;
      const canvasY = (cy - prev.y) / prev.scale;
      const next: Transform = {
        x: cx - canvasX * newScale,
        y: cy - canvasY * newScale,
        scale: newScale,
      };
      transformRef.current = next;
      return next;
    });
  }

  function getLoopBackPath(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): string {
    // Loop-back arrows curve around the left side
    const offset = 120;
    return `M ${x1} ${y1} C ${x1 - offset} ${y1 + 40}, ${x2 - offset} ${y2 - 40}, ${x2} ${y2}`;
  }

  function getCurvePath(x1: number, y1: number, x2: number, y2: number) {
    const cy = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
  }

  const t = transformState;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{
        cursor: isPanning.current ? "grabbing" : "default",
        background: "var(--background)",
      }}
      onMouseDown={handleMouseDownCanvas}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-ocid="flow_designer.canvas"
    >
      {/* Grid background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            x={t.x % (20 * t.scale)}
            y={t.y % (20 * t.scale)}
            width={20 * t.scale}
            height={20 * t.scale}
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="var(--border)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Transform group */}
      <div
        style={{
          position: "absolute",
          transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
          transformOrigin: "0 0",
        }}
      >
        {/* SVG for connections */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
          width="1"
          height="1"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
            </marker>
            <marker
              id="arrowhead-loop"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#7c3aed" />
            </marker>
          </defs>

          {connections.map((conn) => {
            const from = blocks.find((b) => b.id === conn.fromBlockId);
            const to = blocks.find((b) => b.id === conn.toBlockId);
            if (!from || !to) return null;

            const isLoopBack = conn.isLoopBack;
            const isHovered = hoveredConnId === conn.id;

            const x1 = isLoopBack
              ? from.position.x
              : from.position.x + BLOCK_W / 2;
            const y1 = isLoopBack
              ? from.position.y + BLOCK_H / 2
              : from.position.y + BLOCK_H;
            const x2 = to.position.x + BLOCK_W / 2;
            const y2 = isLoopBack ? to.position.y : to.position.y;
            const path = isLoopBack
              ? getLoopBackPath(x1, y1, x2, y2)
              : getCurvePath(x1, y1, x2, y2);

            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;

            return (
              <g key={conn.id} style={{ pointerEvents: "all" }}>
                <path
                  d={path}
                  fill="none"
                  stroke={
                    isHovered ? "#ef4444" : isLoopBack ? "#7c3aed" : "#94a3b8"
                  }
                  strokeWidth={isHovered ? 2.5 : 2}
                  strokeDasharray={isLoopBack ? "6 4" : undefined}
                  markerEnd={
                    isLoopBack ? "url(#arrowhead-loop)" : "url(#arrowhead)"
                  }
                  onMouseEnter={() => setHoveredConnId(conn.id)}
                  onMouseLeave={() => setHoveredConnId(null)}
                  style={{ cursor: "pointer" }}
                />
                {isLoopBack && !isHovered && (
                  <text
                    x={x1 - 60}
                    y={(y1 + y2) / 2}
                    fontSize="9"
                    fill="#7c3aed"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    loop back
                  </text>
                )}
                {isHovered && (
                  <g
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteConnection(conn.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleDeleteConnection(conn.id);
                    }}
                    onMouseEnter={() => setHoveredConnId(conn.id)}
                    onMouseLeave={() => setHoveredConnId(null)}
                    data-ocid="flow_designer.delete_connection_button"
                    aria-label="Delete connection"
                  >
                    <circle cx={mx} cy={my} r={9} fill="#ef4444" />
                    <text
                      x={mx}
                      y={my}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      ×
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Drawing in-progress connection */}
          {drawingConn && (
            <path
              d={getCurvePath(
                drawingConn.fromX,
                drawingConn.fromY,
                drawingConn.curX,
                drawingConn.curY,
              )}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="6 3"
            />
          )}
        </svg>

        {/* Blocks */}
        {blocks.map((block) => {
          const color =
            block.type === "loop_start" || block.type === "loop_end"
              ? "#7c3aed"
              : block.type === "break_loop"
                ? "#dc2626"
                : CATEGORY_COLORS[block.category];
          const isSelected = selectedBlockId === block.id;
          const isBreakLoop = block.type === "break_loop";
          const isLoopStart = block.type === "loop_start";

          return (
            <div
              key={block.id}
              data-block
              style={{
                position: "absolute",
                left: block.position.x,
                top: block.position.y,
                width: BLOCK_W,
                minHeight: BLOCK_H,
                cursor: "grab",
                zIndex: isSelected ? 10 : 1,
              }}
              onMouseDown={(e) => handleBlockMouseDown(e, block.id)}
              onContextMenu={(e) => handleBlockRightClick(e, block.id)}
              data-ocid={`flow_designer.block.${block.type}`}
            >
              <div
                className={`rounded-xl border-2 bg-card shadow-md overflow-visible transition-shadow ${isSelected ? "shadow-lg" : ""}`}
                style={{
                  borderColor: isSelected
                    ? color
                    : isBreakLoop
                      ? "#fca5a5"
                      : "#e2e8f0",
                  boxShadow: isBreakLoop ? "0 0 0 1px #fca5a5" : undefined,
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-t-xl relative"
                  style={{ background: `${color}18` }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  />
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide truncate"
                    style={{ color }}
                  >
                    {block.type === "loop_start" ||
                    block.type === "loop_end" ||
                    block.type === "break_loop"
                      ? "control flow"
                      : block.category}
                  </span>
                  {/* Loop count badge */}
                  {isLoopStart && block.loopCountMax !== undefined && (
                    <span
                      className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "#7c3aed",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      ↻ max {block.loopCountMax}×
                    </span>
                  )}
                </div>
                {/* Body */}
                <div className="px-2.5 py-2">
                  <p className="text-xs font-semibold text-foreground leading-tight truncate">
                    {block.label}
                  </p>
                  {block.prompt && (
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">
                      {block.prompt}
                    </p>
                  )}
                  {/* Loop-end break condition hint */}
                  {block.type === "loop_end" && block.breakCondition && (
                    <p
                      className="text-[9px] mt-1 leading-tight truncate"
                      style={{ color: "#7c3aed" }}
                    >
                      break if: {block.breakCondition}
                    </p>
                  )}
                  {/* break_loop condition hint */}
                  {block.type === "break_loop" && block.condition && (
                    <p
                      className="text-[9px] mt-1 leading-tight truncate"
                      style={{ color: "#dc2626" }}
                    >
                      if: {block.condition}
                    </p>
                  )}
                </div>
              </div>

              {/* Input dot (top center) */}
              <div
                data-conn-dot
                style={{
                  position: "absolute",
                  top: -7,
                  left: BLOCK_W / 2 - 7,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#fff",
                  border: `2px solid ${color}`,
                  cursor: "crosshair",
                  zIndex: 20,
                }}
                onMouseUp={(e) => handleInputDotMouseUp(e, block.id)}
              />

              {/* Output dot (bottom center) */}
              <div
                data-conn-dot
                style={{
                  position: "absolute",
                  bottom: -7,
                  left: BLOCK_W / 2 - 7,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: color,
                  border: "2px solid #fff",
                  cursor: "crosshair",
                  zIndex: 20,
                }}
                onMouseDown={(e) => handleOutputDotMouseDown(e, block.id)}
              />

              {/* Loop-end: extra left dot for loop-back connection */}
              {block.type === "loop_end" && (
                <div
                  data-conn-dot
                  title="Drag from here back to Loop Start"
                  style={{
                    position: "absolute",
                    top: BLOCK_H / 2 - 7,
                    left: -7,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#7c3aed",
                    border: "2px solid #fff",
                    cursor: "crosshair",
                    zIndex: 20,
                  }}
                  onMouseDown={(e) => handleOutputDotMouseDown(e, block.id)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={handleZoomOut}
          className="px-2 py-1 text-sm text-muted-foreground hover:bg-muted transition-colors border-r border-border"
          aria-label="Zoom out"
          data-ocid="flow_designer.zoom_out_button"
          disabled={zoomPct <= MIN_ZOOM * 100}
        >
          −
        </button>
        <span className="px-2 text-xs text-muted-foreground tabular-nums min-w-[40px] text-center">
          {zoomPct}%
        </span>
        <button
          type="button"
          onClick={handleZoomIn}
          className="px-2 py-1 text-sm text-muted-foreground hover:bg-muted transition-colors border-l border-border"
          aria-label="Zoom in"
          data-ocid="flow_designer.zoom_in_button"
          disabled={zoomPct >= MAX_ZOOM * 100}
        >
          +
        </button>
      </div>

      {/* Empty state */}
      {blocks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-3">
              <svg
                role="img"
                aria-label="Empty canvas placeholder"
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 5h16M4 12h16M4 19h16"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Drag blocks here to start
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click a block type in the left panel
            </p>
          </div>
        </div>
      )}

      {/* Context menu */}
      {ctxMenu && (
        <div
          className="fixed z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px]"
          style={{ left: ctxMenu.x, top: ctxMenu.y }}
          onMouseLeave={() => setCtxMenu(null)}
          data-ocid="flow_designer.context_menu"
        >
          <button
            type="button"
            className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors"
            onClick={() => handleCtxAction("edit")}
            data-ocid="flow_designer.ctx_edit_button"
          >
            Edit Properties
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors"
            onClick={() => handleCtxAction("duplicate")}
            data-ocid="flow_designer.ctx_duplicate_button"
          >
            Duplicate Block
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-1.5 text-xs hover:bg-destructive/10 text-destructive transition-colors"
            onClick={() => handleCtxAction("delete")}
            data-ocid="flow_designer.ctx_delete_button"
          >
            Delete Block
          </button>
        </div>
      )}
    </div>
  );
}

// Auto-layout: top-down tree
function autoLayout(
  blocks: FlowBlock[],
  connections: FlowConnection[],
): FlowBlock[] {
  if (blocks.length === 0) return blocks;

  // Build adjacency (skip loop-back edges to avoid cycles in layout)
  const children: Record<string, string[]> = {};
  const parents: Record<string, string[]> = {};
  for (const b of blocks) {
    children[b.id] = [];
    parents[b.id] = [];
  }
  for (const c of connections) {
    if (c.isLoopBack) continue; // don't follow loop-back for layout
    children[c.fromBlockId]?.push(c.toBlockId);
    parents[c.toBlockId]?.push(c.fromBlockId);
  }

  // Find roots
  const roots = blocks
    .filter((b) => (parents[b.id]?.length ?? 0) === 0)
    .map((b) => b.id);
  if (roots.length === 0) roots.push(blocks[0].id);

  const visited = new Set<string>();
  const result = [...blocks];
  const GAP_X = 220;
  const GAP_Y = 140;

  function place(id: string, col: number, row: number) {
    if (visited.has(id)) return;
    visited.add(id);
    const idx = result.findIndex((b) => b.id === id);
    if (idx >= 0) {
      result[idx] = {
        ...result[idx],
        position: { x: col * GAP_X + 40, y: row * GAP_Y + 40 },
      };
    }
    const kids = children[id] ?? [];
    kids.forEach((kid, i) => place(kid, col + i, row + 1));
  }

  roots.forEach((root, i) => place(root, i * 2, 0));

  // Place any unvisited blocks
  let extraCol = roots.length * 2;
  for (const b of result) {
    if (!visited.has(b.id)) {
      const idx = result.findIndex((x) => x.id === b.id);
      result[idx] = {
        ...result[idx],
        position: { x: extraCol * GAP_X + 40, y: 40 },
      };
      extraCol++;
    }
  }

  return result;
}
