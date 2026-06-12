import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FlowBlock, FlowBlockOption } from "@/types/flowDesigner";
import { BLOCK_TYPE_META, CATEGORY_COLORS } from "@/types/flowDesigner";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface PropertyPanelProps {
  block: FlowBlock | null;
  allBlocks: FlowBlock[];
  onUpdate: (block: FlowBlock) => void;
}

export default function PropertyPanel({
  block,
  allBlocks,
  onUpdate,
}: PropertyPanelProps) {
  const [local, setLocal] = useState<FlowBlock | null>(block);

  // biome-ignore lint/correctness/useExhaustiveDependencies: sync only when selected block changes
  useEffect(() => {
    setLocal(block);
  }, [block?.id]);

  if (!local) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-3 p-6"
        data-ocid="flow_designer.property_panel_empty"
      >
        <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center">
          <svg
            role="img"
            aria-label="Select a block to edit properties"
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-muted-foreground text-center">
          Click a block to edit its properties
        </p>
      </div>
    );
  }

  const meta = BLOCK_TYPE_META[local.type];
  const color = CATEGORY_COLORS[local.category];
  const hasOptions =
    local.type === "quick_reply" ||
    local.type === "if_else" ||
    local.type === "loop_end";
  const hasVariable = [
    "text_input",
    "location_input",
    "phone_input",
    "set_variable",
  ].includes(local.type);

  function push(updates: Partial<FlowBlock>) {
    const updated = { ...local!, ...updates };
    setLocal(updated);
    onUpdate(updated);
  }

  function handleAddOption() {
    const opt: FlowBlockOption = {
      id: `opt_${Date.now()}`,
      label: `Option ${(local?.options.length ?? 0) + 1}`,
    };
    push({ options: [...(local?.options ?? []), opt] });
  }

  function handleOptionChange(idx: number, label: string) {
    const opts = [...(local?.options ?? [])];
    opts[idx] = { ...opts[idx], label };
    push({ options: opts });
  }

  function handleRemoveOption(idx: number) {
    const opts = [...(local?.options ?? [])];
    opts.splice(idx, 1);
    push({ options: opts });
  }

  const otherBlocks = allBlocks.filter((b) => b.id !== local.id);

  return (
    <div
      className="p-4 flex flex-col gap-4"
      data-ocid="flow_designer.property_panel"
    >
      {/* Block type badge */}
      <div
        className="flex items-center gap-2 p-2.5 rounded-lg"
        style={{ background: `${color}12` }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: color }}
        />
        <span className="text-xs font-semibold" style={{ color }}>
          {meta.label}
        </span>
        <span className="ml-auto text-[10px] text-muted-foreground uppercase tracking-wide">
          {local.category}
        </span>
      </div>

      {/* Label */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="block-label" className="text-xs">
          Block Label
        </Label>
        <Input
          id="block-label"
          value={local.label}
          onChange={(e) => push({ label: e.target.value })}
          className="h-8 text-xs"
          data-ocid="flow_designer.block_label_input"
        />
      </div>

      {/* Prompt / Description */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="block-prompt" className="text-xs">
          Message / Prompt
        </Label>
        <Textarea
          id="block-prompt"
          value={local.prompt}
          onChange={(e) => push({ prompt: e.target.value })}
          rows={3}
          className="text-xs resize-none"
          placeholder="The message or question this block sends..."
          data-ocid="flow_designer.block_prompt_input"
        />
      </div>

      {/* Options for quick_reply / if_else / loop_end */}
      {hasOptions && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">
              {local.type === "loop_end" ? "Loop Options" : "Options"}
            </Label>
            <Button
              size="sm"
              variant="outline"
              className="h-6 px-2 text-xs gap-1"
              onClick={handleAddOption}
              data-ocid="flow_designer.add_option_button"
            >
              <Plus className="w-3 h-3" />
              Add
            </Button>
          </div>
          {local.type === "loop_end" && (
            <p className="text-[10px] text-muted-foreground bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded px-2 py-1">
              🔁 Loop End: option "➕ Add Another" connects back to Loop Start;
              option "✅ End / Done" connects to the next step after the loop.
            </p>
          )}
          <div className="flex flex-col gap-1.5">
            {(local.options ?? []).map((opt, i) => (
              <div
                key={opt.id}
                className="flex items-center gap-1.5"
                data-ocid={`flow_designer.option_row.${i + 1}`}
              >
                <Input
                  value={opt.label}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="h-7 text-xs flex-1"
                  placeholder={`Option ${i + 1}`}
                  data-ocid={`flow_designer.option_input.${i + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={() => handleRemoveOption(i)}
                  data-ocid={`flow_designer.remove_option_button.${i + 1}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
            {(local.options ?? []).length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                No options yet. Click Add to create one.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Loop Start info */}
      {local.type === "loop_start" && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg px-3 py-2 text-[10px] text-orange-700 dark:text-orange-400 space-y-1">
          <p className="font-semibold">🔁 Loop Start</p>
          <p>
            Connect the output of "Loop End → Add Another" back to this block to
            create a repeating loop (e.g. multi-branch entry).
          </p>
          <p>
            The "Loop End → End / Done" option should connect to the step{" "}
            <em>after</em> the loop.
          </p>
        </div>
      )}

      {/* Break Loop info */}
      {local.type === "break_loop" && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg px-3 py-2 text-[10px] text-red-700 dark:text-red-400 space-y-1">
          <p className="font-semibold">⛔ Break / Exit Loop</p>
          <p>
            Place this block inside a loop to provide an early exit path (e.g.
            "Cancel", "Skip All"). Connect it to the step after the loop.
          </p>
        </div>
      )}

      {/* Variable name for input blocks */}
      {hasVariable && (
        <div className="flex flex-col gap-1">
          <Label htmlFor="variable-name" className="text-xs">
            Variable Name
          </Label>
          <Input
            id="variable-name"
            value={local.variableName ?? ""}
            onChange={(e) => push({ variableName: e.target.value })}
            className="h-8 text-xs"
            placeholder="e.g. customer_name"
            data-ocid="flow_designer.variable_name_input"
          />
          <p className="text-[10px] text-muted-foreground">
            User response will be stored in this variable
          </p>
        </div>
      )}

      {/* Next Block */}
      <div className="flex flex-col gap-1">
        <Label className="text-xs">Default Next Block</Label>
        <Select
          value={local.nextBlockId ?? "none"}
          onValueChange={(v) =>
            push({ nextBlockId: v === "none" ? undefined : v })
          }
        >
          <SelectTrigger
            className="h-8 text-xs"
            data-ocid="flow_designer.next_block_select"
          >
            <SelectValue placeholder="None (end flow)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None (end flow)</SelectItem>
            {otherBlocks.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border-t border-border pt-3">
        <p className="text-[10px] text-muted-foreground">
          Block ID:{" "}
          <code className="font-mono text-foreground">{local.id}</code>
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Type: <code className="font-mono text-foreground">{local.type}</code>
        </p>
      </div>
    </div>
  );
}
