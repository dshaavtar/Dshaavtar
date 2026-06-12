import type { FlowState } from "@/types/flowDesigner";
import { useMemo } from "react";

interface FlowPreviewProps {
  flowState: FlowState;
}

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "text-blue-400"; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-green-400"; // key
          } else {
            cls = "text-yellow-300"; // string value
          }
        } else if (/true|false/.test(match)) {
          cls = "text-purple-400";
        } else if (/null/.test(match)) {
          cls = "text-red-400";
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
}

export default function FlowPreview({ flowState }: FlowPreviewProps) {
  const json = useMemo(() => JSON.stringify(flowState, null, 2), [flowState]);

  const highlighted = useMemo(() => syntaxHighlight(json), [json]);

  function handleCopy() {
    navigator.clipboard.writeText(json);
  }

  return (
    <div
      className="flex flex-col h-full"
      data-ocid="flow_designer.json_preview"
    >
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground">
          Flow JSON — {flowState.blocks.length} blocks,{" "}
          {flowState.connections.length} connections
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs text-primary hover:underline"
          data-ocid="flow_designer.copy_json_button"
        >
          Copy
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <pre
          className="text-[11px] font-mono p-3 leading-relaxed min-h-full"
          style={{ background: "#0f172a", color: "#e2e8f0" }}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled syntax highlight
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}
