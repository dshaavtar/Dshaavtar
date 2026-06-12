import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Copy,
  Info,
  MessageCircleOff,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useBackendActor,
  useTestTelegramSendMessage,
} from "../hooks/useBackend";

// ─── Local display type ───────────────────────────────────────────────────────

interface DisplayLog {
  id: string;
  platform: string;
  direction: "incoming" | "outgoing";
  senderId: string;
  messageText: string;
  flowTriggered: string;
  status: "success" | "error";
  errorDetail: string;
  timestamp: number; // always milliseconds after normalizeLog
  rawPayload: string | null;
}

type Platform = "telegram" | "whatsapp" | "sms";
type StatusFilter = "all" | "success" | "error";
type TimestampFormat = "relative" | "absolute";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Normalize ICP nanosecond timestamps to milliseconds */
function toMs(ts: number): number {
  // ICP timestamps are nanoseconds (~1.7e18 for 2024+)
  // JS Date.now() returns milliseconds (~1.7e12 for 2024+)
  // Threshold: if ts > 1e15 it must be nanoseconds
  if (ts > 1e15) return ts / 1_000_000;
  return ts;
}

function formatAbsolute(ts: number): string {
  if (!ts) return "—";
  const ms = toMs(ts);
  const d = new Date(ms);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatRelative(ts: number): string {
  if (!ts) return "—";
  const ms = toMs(ts);
  const diffMs = Date.now() - ms;
  if (diffMs < 0) return "just now"; // clock skew guard
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

function truncate(text: string, max = 80): string {
  if (!text) return "—";
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/**
 * Try to parse rawPayload as JSON and extract Telegram-specific fields.
 * Returns null if not parseable or not a Telegram update shape.
 */
interface TelegramParsed {
  update_id?: number;
  chat_id?: number | string;
  from_user?: string;
  message_text?: string;
  message_type?: string;
}

function parseTelegramPayload(rawPayload: string): TelegramParsed | null {
  try {
    const obj = JSON.parse(rawPayload) as Record<string, unknown>;
    const result: TelegramParsed = {};

    if (typeof obj.update_id === "number") result.update_id = obj.update_id;

    // message path
    const msg = obj.message as Record<string, unknown> | undefined;
    if (msg) {
      result.message_type = "text";
      const chat = msg.chat as Record<string, unknown> | undefined;
      if (chat) result.chat_id = chat.id as number;
      const from = msg.from as Record<string, unknown> | undefined;
      if (from) {
        const parts = [
          from.first_name,
          from.last_name,
          from.username && `(@${from.username})`,
        ]
          .filter(Boolean)
          .join(" ");
        result.from_user = parts;
      }
      if (typeof msg.text === "string") result.message_text = msg.text;
    }

    // callback_query path
    const cbq = obj.callback_query as Record<string, unknown> | undefined;
    if (cbq) {
      result.message_type = "callback_query";
      const msg2 = cbq.message as Record<string, unknown> | undefined;
      const chat = msg2?.chat as Record<string, unknown> | undefined;
      if (chat) result.chat_id = chat.id as number;
      const from2 = cbq.from as Record<string, unknown> | undefined;
      if (from2) {
        result.from_user = [from2.first_name, from2.last_name]
          .filter(Boolean)
          .join(" ");
      }
      if (typeof cbq.data === "string")
        result.message_text = `[callback] ${cbq.data}`;
    }

    return Object.keys(result).length > 0 ? result : null;
  } catch {
    return null;
  }
}

/**
 * Convert a raw backend BotLog record into a safe display object.
 */
function normalizeLog(raw: unknown): DisplayLog {
  if (raw == null || typeof raw !== "object") {
    return {
      id: String(Math.random()),
      platform: "",
      direction: "incoming",
      senderId: "—",
      messageText: "—",
      flowTriggered: "—",
      status: "success",
      errorDetail: "",
      timestamp: 0,
      rawPayload: "",
    };
  }

  const r = raw as Record<string, unknown>;

  const rawTs = r.timestamp;
  const rawTsNum =
    typeof rawTs === "bigint"
      ? Number(rawTs)
      : typeof rawTs === "number"
        ? rawTs
        : 0;
  // Always store timestamp in milliseconds for display
  const timestamp = rawTsNum > 1e15 ? rawTsNum / 1_000_000 : rawTsNum;

  // Correct field name is `errorDetail` — never `processError`
  const errorDetail =
    typeof r.errorDetail === "string"
      ? r.errorDetail
      : typeof r.error === "string"
        ? r.error
        : "";

  // rawPayload — ICP optionals come as [] or [value]
  let rawPayload: string | null = null;
  const rawPayloadRaw = Array.isArray(r.rawPayload)
    ? r.rawPayload.length > 0
      ? String(r.rawPayload[0])
      : null
    : typeof r.rawPayload === "string" && r.rawPayload !== ""
      ? r.rawPayload
      : r.rawPayload != null && typeof r.rawPayload === "object"
        ? (() => {
            try {
              return JSON.stringify(r.rawPayload, null, 2);
            } catch {
              return String(r.rawPayload);
            }
          })()
        : null;
  // Discard sentinel placeholder strings
  if (
    rawPayloadRaw &&
    rawPayloadRaw !== "(no payload recorded)" &&
    rawPayloadRaw !== "no payload"
  ) {
    rawPayload = rawPayloadRaw;
  }

  return {
    id: typeof r.id === "string" ? r.id : String(Math.random()),
    platform: typeof r.platform === "string" ? r.platform : "",
    direction: r.direction === "outgoing" ? "outgoing" : "incoming",
    senderId: typeof r.senderId === "string" ? r.senderId : "—",
    messageText: typeof r.messageText === "string" ? r.messageText : "—",
    flowTriggered: typeof r.flowTriggered === "string" ? r.flowTriggered : "—",
    status: r.status === "error" ? "error" : "success",
    errorDetail,
    timestamp,
    rawPayload,
  };
}

function normalizeLogs(raw: unknown): DisplayLog[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((r) => r != null)
    .map(normalizeLog)
    .sort((a, b) => b.timestamp - a.timestamp);
}

// ─── Expandable Row ───────────────────────────────────────────────────────────

function copyText(text: string) {
  navigator.clipboard.writeText(text).then(() => toast.success("Copied!"));
}

function LogRow({
  log,
  idx,
  tsFormat,
  onTestOutgoing,
}: {
  log: DisplayLog;
  idx: number;
  tsFormat: TimestampFormat;
  onTestOutgoing?: (chatId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const tsParsed = parseTelegramPayload(log.rawPayload ?? "");

  // Try to pretty-print JSON payload
  let prettyPayload = log.rawPayload ?? "";
  try {
    if (prettyPayload)
      prettyPayload = JSON.stringify(JSON.parse(prettyPayload), null, 2);
  } catch {
    // keep raw
  }

  const isError = log.status === "error";
  const hasPayload = Boolean(log.rawPayload);
  const chatId = tsParsed?.chat_id
    ? String(tsParsed.chat_id)
    : log.senderId !== "—"
      ? log.senderId
      : "";

  return (
    <>
      <tr
        className={`border-b border-border/40 transition-colors cursor-pointer ${
          expanded
            ? "bg-muted/30"
            : isError
              ? "bg-red-50/60 hover:bg-red-50"
              : "hover:bg-muted/20"
        }`}
        data-ocid={`bot_logs.item.${idx + 1}`}
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded((v) => !v);
        }}
      >
        <td className="py-2 px-3 whitespace-nowrap">
          {expanded ? (
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          )}
        </td>
        <td
          className="py-2 px-3 whitespace-nowrap text-muted-foreground font-mono text-xs"
          title={formatAbsolute(log.timestamp)}
        >
          {tsFormat === "relative"
            ? formatRelative(log.timestamp)
            : formatAbsolute(log.timestamp)}
        </td>
        <td className="py-2 px-3 whitespace-nowrap">
          {log.direction === "incoming" ? (
            <Badge className="bg-blue-500/15 text-blue-600 border-blue-500/30 hover:bg-blue-500/20 text-[10px] font-medium">
              ↓ incoming
            </Badge>
          ) : (
            <Badge className="bg-green-500/15 text-green-600 border-green-500/30 hover:bg-green-500/20 text-[10px] font-medium">
              ↑ outgoing
            </Badge>
          )}
        </td>
        <td
          className="py-2 px-3 font-mono max-w-[120px] truncate whitespace-nowrap text-xs"
          title={log.senderId}
        >
          {log.senderId}
        </td>
        <td
          className="py-2 px-3 max-w-[200px] truncate whitespace-nowrap text-foreground text-xs"
          title={log.messageText}
        >
          {truncate(log.messageText)}
        </td>
        <td
          className="py-2 px-3 whitespace-nowrap text-foreground max-w-[140px] truncate text-xs"
          title={log.flowTriggered}
        >
          {log.flowTriggered}
        </td>
        <td className="py-2 px-3 whitespace-nowrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isError ? (
              <Badge className="bg-red-500/15 text-red-600 border-red-500/30 hover:bg-red-500/20 text-[10px] font-medium">
                ✗ error
              </Badge>
            ) : (
              <Badge className="bg-green-500/15 text-green-600 border-green-500/30 hover:bg-green-500/20 text-[10px] font-medium">
                ✓ success
              </Badge>
            )}
            {hasPayload ? (
              <Badge
                variant="outline"
                className="text-[9px] px-1 py-0 h-4 bg-blue-50 text-blue-600 border-blue-200"
              >
                RAW
              </Badge>
            ) : null}
          </div>
        </td>
        <td
          className="py-2 px-3 max-w-[180px] truncate whitespace-nowrap text-xs"
          title={log.errorDetail}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {isError && log.errorDetail ? (
            <span className="text-red-500 font-mono font-medium">
              {truncate(log.errorDetail, 60)}
            </span>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </td>
        <td
          className="py-2 px-3 whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {log.direction === "incoming" && chatId && onTestOutgoing && (
            <button
              type="button"
              onClick={() => onTestOutgoing(chatId)}
              title={`Send test reply to ${chatId}`}
              className="text-[10px] px-2 py-1 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors font-medium"
              data-ocid={`bot_logs.test_outgoing.${idx + 1}`}
            >
              Test ↑
            </button>
          )}
        </td>
      </tr>

      {/* Expanded detail row */}
      {expanded && (
        <tr className="border-b border-border/40 bg-muted/10">
          <td colSpan={9} className="px-4 py-4">
            <div className="space-y-4">
              {/* Error detail — prominent when error */}
              {isError && log.errorDetail && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-[10px] font-bold text-red-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Error Detail
                  </p>
                  <p className="text-xs font-mono text-red-800 break-words whitespace-pre-wrap">
                    {log.errorDetail}
                  </p>
                </div>
              )}

              {/* Telegram structured breakdown */}
              {tsParsed && (
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Telegram Update — Parsed Fields
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {tsParsed.update_id !== undefined && (
                      <div className="bg-card border border-border rounded-lg px-3 py-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                          update_id
                        </p>
                        <p className="text-xs font-mono text-foreground">
                          {tsParsed.update_id}
                        </p>
                      </div>
                    )}
                    {tsParsed.chat_id !== undefined && (
                      <div className="bg-card border border-border rounded-lg px-3 py-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                          chat_id
                        </p>
                        <p className="text-xs font-mono text-foreground">
                          {String(tsParsed.chat_id)}
                        </p>
                      </div>
                    )}
                    {tsParsed.from_user && (
                      <div className="bg-card border border-border rounded-lg px-3 py-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                          from
                        </p>
                        <p className="text-xs font-mono text-foreground truncate">
                          {tsParsed.from_user}
                        </p>
                      </div>
                    )}
                    {tsParsed.message_text && (
                      <div className="col-span-2 sm:col-span-2 bg-card border border-border rounded-lg px-3 py-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                          message text
                        </p>
                        <p className="text-xs text-foreground break-words">
                          {tsParsed.message_text}
                        </p>
                      </div>
                    )}
                    {tsParsed.message_type && (
                      <div className="bg-card border border-border rounded-lg px-3 py-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                          type
                        </p>
                        <Badge variant="outline" className="text-[10px] mt-0.5">
                          {tsParsed.message_type}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Raw payload */}
              {log.rawPayload ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Raw Payload (full webhook body)
                    </p>
                    <button
                      type="button"
                      onClick={() => copyText(prettyPayload)}
                      className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border border-border hover:bg-muted/60 text-muted-foreground transition-colors"
                      title="Copy payload JSON"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-foreground bg-muted/40 border border-border rounded-lg p-3 overflow-x-auto max-h-52 whitespace-pre-wrap break-words">
                    {prettyPayload}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground italic">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>No raw payload recorded for this entry.</span>
                </div>
              )}

              {/* Incoming message hint */}
              {log.direction === "incoming" && (
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <MessageCircleOff className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    This is an incoming message. If the bot never replied, check
                    that your bot token is saved, the HTTP outcall canister has
                    cycles, and the webhook URL is registered with Telegram.
                  </p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Log Table ────────────────────────────────────────────────────────────────

function LogTable({
  logs,
  loading,
  error,
  emptyMessage,
  statusFilter,
  tsFormat,
  onTestOutgoing,
  showUnansweredOnly,
}: {
  logs: DisplayLog[];
  loading: boolean;
  error: string | null;
  emptyMessage: React.ReactNode;
  statusFilter: StatusFilter;
  tsFormat: TimestampFormat;
  onTestOutgoing?: (chatId: string) => void;
  showUnansweredOnly?: boolean;
}) {
  // Build a set of keys that have a reply within 10 seconds
  const answeredKeys = new Set<string>();
  if (showUnansweredOnly) {
    const outgoing = logs.filter((l) => l.direction === "outgoing");
    for (const inc of logs.filter((l) => l.direction === "incoming")) {
      const replied = outgoing.some(
        (out) =>
          out.senderId === inc.senderId &&
          Math.abs(out.timestamp - inc.timestamp) <= 10_000,
      );
      if (replied) answeredKeys.add(`${inc.senderId}:${inc.timestamp}`);
    }
  }

  let filtered =
    statusFilter === "all"
      ? logs
      : logs.filter((l) => l.status === statusFilter);
  if (showUnansweredOnly) {
    filtered = filtered.filter(
      (l) =>
        l.direction === "incoming" &&
        !answeredKeys.has(`${l.senderId}:${l.timestamp}`),
    );
  }

  if (loading) {
    return (
      <div className="p-4 space-y-2" data-ocid="bot_logs.loading_state">
        {Array.from({ length: 8 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
          <Skeleton key={i} className="h-10 w-full rounded" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-3 py-20 text-center"
        data-ocid="bot_logs.error_state"
      >
        <AlertCircle className="w-10 h-10 text-destructive/50" />
        <p className="text-sm text-destructive font-medium">
          Failed to load logs
        </p>
        <p className="text-xs text-muted-foreground max-w-xs">{error}</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center px-6"
        data-ocid="bot_logs.empty_state"
      >
        <Activity className="w-12 h-12 text-muted-foreground/30" />
        <div className="max-w-sm space-y-1">
          {typeof emptyMessage === "string" ? (
            <p className="text-muted-foreground text-sm">{emptyMessage}</p>
          ) : (
            emptyMessage
          )}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <table className="w-full text-xs" data-ocid="bot_logs.table">
        <thead className="sticky top-0 bg-muted/60 border-b border-border z-10">
          <tr>
            <th className="py-2.5 px-3 w-6" aria-label="Expand row" />
            {[
              "Timestamp",
              "Direction",
              "Chat ID / Phone",
              "Message",
              "Flow Triggered",
              "Status",
              "Error Detail",
              "",
            ].map((col, i) => (
              <th
                // biome-ignore lint/suspicious/noArrayIndexKey: static header
                key={i}
                className="text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((log, idx) => (
            <LogRow
              // biome-ignore lint/suspicious/noArrayIndexKey: indexed rows
              key={idx}
              log={log}
              idx={idx}
              tsFormat={tsFormat}
              onTestOutgoing={onTestOutgoing}
            />
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}

// ─── Empty state messages ─────────────────────────────────────────────────────

const EMPTY_TELEGRAM = (
  <div className="space-y-2 text-center max-w-sm">
    <p className="text-muted-foreground text-sm font-medium">
      No Telegram messages logged yet.
    </p>
    <p className="text-xs text-muted-foreground">
      Check that your webhook is registered and the bot token is saved in{" "}
      <strong>Telegram Configuration</strong>.
    </p>
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-left">
      <p className="text-[11px] text-blue-800 font-semibold mb-0.5">
        💡 Using getUpdates / Poll Now?
      </p>
      <p className="text-[11px] text-blue-700">
        If your webhook is active, <strong>getUpdates returns empty</strong> —
        that is expected. Telegram routes all messages to the webhook instead of
        queuing them for polling. Incoming messages will appear here once
        processed by the webhook handler.
      </p>
    </div>
    <p className="text-xs text-muted-foreground">
      Use <strong>"Poll Now (Diagnostic)"</strong> on the Telegram Config page
      only when no webhook is set.
    </p>
  </div>
);

const EMPTY_WHATSAPP = (
  <div className="space-y-1.5 text-center">
    <p className="text-muted-foreground text-sm font-medium">
      No WhatsApp messages logged yet.
    </p>
    <p className="text-xs text-muted-foreground">
      Check that your Meta webhook is configured at{" "}
      <code className="font-mono bg-muted px-1 rounded text-[11px]">
        https://bot.localbazar.shop
      </code>
      .
    </p>
  </div>
);

const EMPTY_SMS = (
  <div className="space-y-1.5 text-center">
    <p className="text-muted-foreground text-sm font-medium">
      No SMS messages logged yet.
    </p>
    <p className="text-xs text-muted-foreground">
      Check that your SMS provider webhook is configured and pointing to your
      bot URL.
    </p>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BotLogsPage() {
  const { actor } = useBackendActor();
  const testSendMsg = useTestTelegramSendMessage();
  const [activeTab, setActiveTab] = useState<Platform>("telegram");
  const [telegramLogs, setTelegramLogs] = useState<DisplayLog[]>([]);
  const [whatsappLogs, setWhatsappLogs] = useState<DisplayLog[]>([]);
  const [smsLogs, setSmsLogs] = useState<DisplayLog[]>([]);
  const [loadingTelegram, setLoadingTelegram] = useState(false);
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);
  const [loadingSms, setLoadingSms] = useState(false);
  const [errorTelegram, setErrorTelegram] = useState<string | null>(null);
  const [errorWhatsapp, setErrorWhatsapp] = useState<string | null>(null);
  const [errorSms, setErrorSms] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [tsFormat, setTsFormat] = useState<TimestampFormat>("relative");
  const [showUnansweredOnly, setShowUnansweredOnly] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchLogs = useCallback(
    async (platform: Platform, silent = false) => {
      if (!actor) return;

      const setLoading =
        platform === "telegram"
          ? setLoadingTelegram
          : platform === "whatsapp"
            ? setLoadingWhatsapp
            : setLoadingSms;
      const setLogs =
        platform === "telegram"
          ? setTelegramLogs
          : platform === "whatsapp"
            ? setWhatsappLogs
            : setSmsLogs;
      const setError =
        platform === "telegram"
          ? setErrorTelegram
          : platform === "whatsapp"
            ? setErrorWhatsapp
            : setErrorSms;

      if (!silent) setLoading(true);
      setError(null);

      try {
        // Access via .call to preserve `this` binding — prevents processError crash
        const listFn = actor.listBotLogs;
        if (typeof listFn !== "function") {
          if (!silent) setError("Backend method listBotLogs not available");
          return;
        }
        const raw = await listFn.call(actor, platform);
        setLogs(normalizeLogs(raw as unknown));
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Unknown error fetching logs";
        if (!silent) setError(msg);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [actor],
  );

  useEffect(() => {
    if (!actor) return;
    fetchLogs("telegram");
    fetchLogs("whatsapp");
    fetchLogs("sms");
  }, [actor, fetchLogs]);

  // Auto-refresh every 10 s
  useEffect(() => {
    if (!actor) return;
    intervalRef.current = setInterval(() => {
      fetchLogs("telegram", true);
      fetchLogs("whatsapp", true);
      fetchLogs("sms", true);
    }, 10_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [actor, fetchLogs]);

  async function clearLogs(platform: Platform) {
    if (!actor) return;
    try {
      await actor.clearBotLogs(platform);
      if (platform === "telegram") setTelegramLogs([]);
      else if (platform === "whatsapp") setWhatsappLogs([]);
      else setSmsLogs([]);
      const label =
        platform === "telegram"
          ? "Telegram"
          : platform === "whatsapp"
            ? "WhatsApp"
            : "SMS";
      toast.success(`${label} logs cleared`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to clear logs";
      toast.error(msg);
    }
  }

  function handleRefreshAll() {
    fetchLogs("telegram");
    fetchLogs("whatsapp");
    fetchLogs("sms");
    toast.success("Logs refreshed");
  }

  function handleRefreshTab() {
    fetchLogs(activeTab);
  }

  async function handleTestOutgoing(chatId: string) {
    try {
      const result = await testSendMsg.mutateAsync(chatId);
      if (result.success) {
        toast.success(`Test message sent to ${chatId}`);
      } else {
        toast.error(
          `Send failed: ${result.errorMessage ?? "check bot token and chat ID"}`,
        );
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Send test failed");
    }
  }

  const telegramCount = telegramLogs.length;
  const whatsappCount = whatsappLogs.length;
  const smsCount = smsLogs.length;

  // IC0504 / out-of-cycles detection across all log arrays
  const allLogs = [...telegramLogs, ...whatsappLogs, ...smsLogs];
  const hasOutOfCycles = allLogs.some(
    (l) =>
      l.errorDetail?.includes("IC0504") ||
      l.errorDetail?.includes("out of cycles") ||
      l.errorDetail?.includes("out_of_cycles") ||
      l.messageText?.includes("IC0504"),
  );

  const currentLoading =
    activeTab === "telegram"
      ? loadingTelegram
      : activeTab === "whatsapp"
        ? loadingWhatsapp
        : loadingSms;

  const clearLabel =
    activeTab === "telegram"
      ? "Telegram"
      : activeTab === "whatsapp"
        ? "WhatsApp"
        : "SMS";

  return (
    <div
      className="flex flex-col h-[calc(100vh-64px)]"
      data-ocid="bot_logs.page"
    >
      {/* IC0504 out-of-cycles banner */}
      {hasOutOfCycles && (
        <div
          className="flex items-start gap-3 px-4 py-3 bg-red-50 border-b border-red-300 text-red-800 text-xs flex-shrink-0"
          data-ocid="bot_logs.out_of_cycles_banner"
        >
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold">⚠️ Canister out of cycles (IC0504)</span>{" "}
            — The HTTP outcalls extension canister{" "}
            <code className="font-mono bg-red-100 px-1 rounded">
              7fpuz-xqaaa-aaaac-qan7a-cai
            </code>{" "}
            has run out of cycles.{" "}
            <strong>All outgoing Telegram messages will fail</strong> until this
            canister is topped up. Contact Caffeine support to resolve. This
            error is not fixable by code changes.
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground text-sm">Bot Logs</h1>
            <p className="text-xs text-muted-foreground">
              Live Telegram, WhatsApp &amp; SMS message activity ·
              auto-refreshes every 10 s · click any row to expand raw payload
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={handleRefreshAll}
            disabled={currentLoading}
            data-ocid="bot_logs.refresh_button"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${currentLoading ? "animate-spin" : ""}`}
            />
            Refresh All
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
                data-ocid="bot_logs.open_modal_button"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear {clearLabel} Logs
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="bot_logs.dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Clear {clearLabel} Logs</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all {clearLabel} bot logs. This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="bot_logs.cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => clearLogs(activeTab)}
                  data-ocid="bot_logs.confirm_button"
                >
                  Clear Logs
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => {
          setActiveTab(v as Platform);
          setStatusFilter("all");
        }}
        className="flex-1 min-h-0 flex flex-col overflow-hidden"
      >
        <TabsList className="h-10 rounded-none border-b border-border bg-muted/30 shrink-0 w-full justify-start px-4 gap-1">
          <TabsTrigger
            value="telegram"
            className="text-xs h-7 gap-1.5"
            data-ocid="bot_logs.telegram_tab"
          >
            <Send className="w-3 h-3" />
            Telegram Logs
            <Badge
              variant="secondary"
              className="text-[10px] tabular-nums ml-0.5 h-4 px-1.5"
            >
              {telegramCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="whatsapp"
            className="text-xs h-7 gap-1.5"
            data-ocid="bot_logs.whatsapp_tab"
          >
            <MessageSquare className="w-3 h-3" />
            WhatsApp Logs
            <Badge
              variant="secondary"
              className="text-[10px] tabular-nums ml-0.5 h-4 px-1.5"
            >
              {whatsappCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="sms"
            className="text-xs h-7 gap-1.5"
            data-ocid="bot_logs.sms_tab"
          >
            <Phone className="w-3 h-3" />
            SMS Logs
            <Badge
              variant="secondary"
              className="text-[10px] tabular-nums ml-0.5 h-4 px-1.5"
            >
              {smsCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Per-tab toolbar: refresh now + filter + timestamp toggle */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-border/60 bg-background shrink-0 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={handleRefreshTab}
            disabled={currentLoading}
            data-ocid="bot_logs.refresh_tab_button"
          >
            <RefreshCw
              className={`w-3 h-3 ${currentLoading ? "animate-spin" : ""}`}
            />
            Refresh Now
          </Button>

          {/* Status filter */}
          <div
            className="flex items-center gap-1 ml-1"
            aria-label="Status filter"
          >
            {(["all", "success", "error"] as StatusFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f)}
                data-ocid={`bot_logs.filter_${f}`}
                className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                  statusFilter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-muted/60 text-muted-foreground"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Unanswered filter — Telegram only */}
          {activeTab === "telegram" && (
            <button
              type="button"
              onClick={() => setShowUnansweredOnly((v) => !v)}
              data-ocid="bot_logs.filter_unanswered"
              className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors flex items-center gap-1.5 ${
                showUnansweredOnly
                  ? "bg-amber-500 text-white border-amber-500"
                  : "border-border hover:bg-muted/60 text-muted-foreground"
              }`}
            >
              <MessageCircleOff className="w-3 h-3" />
              Unanswered
            </button>
          )}

          <div className="ml-auto flex items-center gap-1">
            <span className="text-[11px] text-muted-foreground">Time:</span>
            <button
              type="button"
              onClick={() =>
                setTsFormat((f) => (f === "relative" ? "absolute" : "relative"))
              }
              data-ocid="bot_logs.timestamp_toggle"
              className="text-[11px] px-2 py-1 rounded border border-border hover:bg-muted/60 text-muted-foreground transition-colors"
            >
              {tsFormat === "relative"
                ? "Relative (2 min ago)"
                : "Absolute (date/time)"}
            </button>
          </div>
        </div>

        <TabsContent
          value="telegram"
          className="flex-1 min-h-0 m-0 overflow-hidden"
        >
          <LogTable
            logs={telegramLogs}
            loading={loadingTelegram}
            error={errorTelegram}
            emptyMessage={EMPTY_TELEGRAM}
            statusFilter={statusFilter}
            tsFormat={tsFormat}
            onTestOutgoing={handleTestOutgoing}
            showUnansweredOnly={showUnansweredOnly}
          />
        </TabsContent>

        <TabsContent
          value="whatsapp"
          className="flex-1 min-h-0 m-0 overflow-hidden"
        >
          <LogTable
            logs={whatsappLogs}
            loading={loadingWhatsapp}
            error={errorWhatsapp}
            emptyMessage={EMPTY_WHATSAPP}
            statusFilter={statusFilter}
            tsFormat={tsFormat}
          />
        </TabsContent>

        <TabsContent value="sms" className="flex-1 min-h-0 m-0 overflow-hidden">
          <LogTable
            logs={smsLogs}
            loading={loadingSms}
            error={errorSms}
            emptyMessage={EMPTY_SMS}
            statusFilter={statusFilter}
            tsFormat={tsFormat}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
