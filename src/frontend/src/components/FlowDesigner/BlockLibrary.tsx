import { BLOCK_TYPE_META, makeBlock } from "@/types/flowDesigner";
import type { BlockType, FlowBlock } from "@/types/flowDesigner";
import {
  GitBranch,
  Image,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  Settings,
  ShoppingCart,
  Square,
  Truck,
  UserCheck,
  Users,
  Variable,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

interface BlockLibraryProps {
  onAddBlock: (block: FlowBlock) => void;
}

interface BlockDef {
  type: BlockType;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: Array<{
  title: string;
  color: string;
  blocks: BlockDef[];
}> = [
  {
    title: "Message",
    color: "#3b82f6",
    blocks: [
      { type: "send_message", icon: MessageSquare },
      { type: "quick_reply", icon: MessageCircle },
    ],
  },
  {
    title: "Input",
    color: "#10b981",
    blocks: [
      { type: "text_input", icon: Send },
      { type: "location_input", icon: MapPin },
      { type: "phone_input", icon: Phone },
      { type: "image_upload", icon: Image },
    ],
  },
  {
    title: "Logic",
    color: "#f59e0b",
    blocks: [
      { type: "if_else", icon: GitBranch },
      { type: "set_variable", icon: Variable },
    ],
  },
  {
    title: "Control Flow",
    color: "#7c3aed",
    blocks: [
      { type: "loop_start", icon: RefreshCw },
      { type: "loop_end", icon: Square },
      { type: "break_loop", icon: X },
    ],
  },
  {
    title: "Actions",
    color: "#8b5cf6",
    blocks: [
      { type: "accept_order", icon: ShoppingCart },
      { type: "reject_order", icon: X },
      { type: "assign_delivery", icon: Truck },
      { type: "collect_payment", icon: Wallet },
      { type: "send_whatsapp", icon: Send },
    ],
  },
  {
    title: "Registration",
    color: "#6b7280",
    blocks: [
      { type: "new_user_check", icon: UserCheck },
      { type: "role_selection", icon: Users },
      { type: "passdigit_verify", icon: Settings },
    ],
  },
];

let dragBlockType: BlockType | null = null;

export function getDragBlockType() {
  return dragBlockType;
}

export default function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  const [dragging, setDragging] = useState<BlockType | null>(null);

  function handleDragStart(type: BlockType) {
    dragBlockType = type;
    setDragging(type);
  }

  function handleDragEnd() {
    dragBlockType = null;
    setDragging(null);
  }

  function handleClick(type: BlockType) {
    const block = makeBlock(type, { x: 200, y: 200 });
    onAddBlock(block);
  }

  return (
    <div className="p-3" data-ocid="flow_designer.block_library">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
        Blocks
      </p>

      {SECTIONS.map((section) => (
        <div key={section.title} className="mb-4">
          <div
            className="text-xs font-semibold mb-2 flex items-center gap-1.5 px-1"
            style={{ color: section.color }}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: section.color }}
            />
            {section.title}
          </div>

          <div className="flex flex-col gap-1">
            {section.blocks.map(({ type, icon: Icon }) => {
              const meta = BLOCK_TYPE_META[type];
              const blockColor =
                type === "loop_start" || type === "loop_end"
                  ? "#7c3aed"
                  : type === "break_loop"
                    ? "#dc2626"
                    : section.color;
              const tooltip =
                meta.tooltip ?? `Drag or click to add ${meta.label}`;
              return (
                <button
                  key={type}
                  type="button"
                  draggable
                  onDragStart={() => handleDragStart(type)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleClick(type)}
                  className={[
                    "flex items-center gap-2 px-2.5 py-2 rounded-lg border cursor-grab select-none transition-all text-left",
                    "hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]",
                    dragging === type ? "opacity-50 scale-95" : "",
                    "bg-card border-border hover:border-primary/40",
                  ].join(" ")}
                  title={tooltip}
                  data-ocid={`flow_designer.block_type.${type}`}
                >
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${blockColor}18`,
                      color: blockColor,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-medium text-foreground leading-tight">
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Control Flow usage hint */}
          {section.title === "Control Flow" && (
            <div className="mt-1.5 px-1 py-1.5 rounded-md bg-muted/60 border border-dashed border-border">
              <p className="text-[9px] text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Loop:</strong> place{" "}
                <span style={{ color: "#7c3aed" }}>Loop Start</span> before the
                repeating section,{" "}
                <span style={{ color: "#7c3aed" }}>Loop End</span> after. Draw
                the back-arrow from Loop End's{" "}
                <span style={{ color: "#7c3aed" }}>left dot</span> to Loop
                Start. Add <span style={{ color: "#dc2626" }}>Break</span>{" "}
                inside the body to exit early.
              </p>
            </div>
          )}
        </div>
      ))}

      <div className="mt-4 p-2.5 rounded-lg bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Drag</strong> blocks onto the canvas or <strong>click</strong>{" "}
          to add at center. Connect by clicking the bottom dot → top dot.
        </p>
      </div>
    </div>
  );
}
