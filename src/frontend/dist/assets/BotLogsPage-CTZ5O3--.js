import { _ as useBackendActor, cX as useTestTelegramSendMessage, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DEwfo3GB.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as ScrollArea } from "./scroll-area-C_Pp8Hph.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { A as Activity } from "./activity-RT92R42G.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { S as Send } from "./send-DoOOMmv0.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
import { I as Info } from "./info-BAL4LSDt.js";
import "./index-CUcO6jhF.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-yUS8KoxU.js";
import "./index-IXOTxK3N.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20.5 14.9A9 9 0 0 0 9.1 3.5", key: "1iebmn" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7", key: "1ov8ce" }]
];
const MessageCircleOff = createLucideIcon("message-circle-off", __iconNode);
function toMs(ts) {
  if (ts > 1e15) return ts / 1e6;
  return ts;
}
function formatAbsolute(ts) {
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
    hour12: true
  });
}
function formatRelative(ts) {
  if (!ts) return "—";
  const ms = toMs(ts);
  const diffMs = Date.now() - ms;
  if (diffMs < 0) return "just now";
  const diffSec = Math.floor(diffMs / 1e3);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}
function truncate(text, max = 80) {
  if (!text) return "—";
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
function parseTelegramPayload(rawPayload) {
  try {
    const obj = JSON.parse(rawPayload);
    const result = {};
    if (typeof obj.update_id === "number") result.update_id = obj.update_id;
    const msg = obj.message;
    if (msg) {
      result.message_type = "text";
      const chat = msg.chat;
      if (chat) result.chat_id = chat.id;
      const from = msg.from;
      if (from) {
        const parts = [
          from.first_name,
          from.last_name,
          from.username && `(@${from.username})`
        ].filter(Boolean).join(" ");
        result.from_user = parts;
      }
      if (typeof msg.text === "string") result.message_text = msg.text;
    }
    const cbq = obj.callback_query;
    if (cbq) {
      result.message_type = "callback_query";
      const msg2 = cbq.message;
      const chat = msg2 == null ? void 0 : msg2.chat;
      if (chat) result.chat_id = chat.id;
      const from2 = cbq.from;
      if (from2) {
        result.from_user = [from2.first_name, from2.last_name].filter(Boolean).join(" ");
      }
      if (typeof cbq.data === "string")
        result.message_text = `[callback] ${cbq.data}`;
    }
    return Object.keys(result).length > 0 ? result : null;
  } catch {
    return null;
  }
}
function normalizeLog(raw) {
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
      rawPayload: ""
    };
  }
  const r = raw;
  const rawTs = r.timestamp;
  const rawTsNum = typeof rawTs === "bigint" ? Number(rawTs) : typeof rawTs === "number" ? rawTs : 0;
  const timestamp = rawTsNum > 1e15 ? rawTsNum / 1e6 : rawTsNum;
  const errorDetail = typeof r.errorDetail === "string" ? r.errorDetail : typeof r.error === "string" ? r.error : "";
  let rawPayload = null;
  const rawPayloadRaw = Array.isArray(r.rawPayload) ? r.rawPayload.length > 0 ? String(r.rawPayload[0]) : null : typeof r.rawPayload === "string" && r.rawPayload !== "" ? r.rawPayload : r.rawPayload != null && typeof r.rawPayload === "object" ? (() => {
    try {
      return JSON.stringify(r.rawPayload, null, 2);
    } catch {
      return String(r.rawPayload);
    }
  })() : null;
  if (rawPayloadRaw && rawPayloadRaw !== "(no payload recorded)" && rawPayloadRaw !== "no payload") {
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
    rawPayload
  };
}
function normalizeLogs(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((r) => r != null).map(normalizeLog).sort((a, b) => b.timestamp - a.timestamp);
}
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => ue.success("Copied!"));
}
function LogRow({
  log,
  idx,
  tsFormat,
  onTestOutgoing
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const tsParsed = parseTelegramPayload(log.rawPayload ?? "");
  let prettyPayload = log.rawPayload ?? "";
  try {
    if (prettyPayload)
      prettyPayload = JSON.stringify(JSON.parse(prettyPayload), null, 2);
  } catch {
  }
  const isError = log.status === "error";
  const hasPayload = Boolean(log.rawPayload);
  const chatId = (tsParsed == null ? void 0 : tsParsed.chat_id) ? String(tsParsed.chat_id) : log.senderId !== "—" ? log.senderId : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: `border-b border-border/40 transition-colors cursor-pointer ${expanded ? "bg-muted/30" : isError ? "bg-red-50/60 hover:bg-red-50" : "hover:bg-muted/20"}`,
        "data-ocid": `bot_logs.item.${idx + 1}`,
        onClick: () => setExpanded((v) => !v),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded((v) => !v);
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: "py-2 px-3 whitespace-nowrap text-muted-foreground font-mono text-xs",
              title: formatAbsolute(log.timestamp),
              children: tsFormat === "relative" ? formatRelative(log.timestamp) : formatAbsolute(log.timestamp)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: log.direction === "incoming" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/15 text-blue-600 border-blue-500/30 hover:bg-blue-500/20 text-[10px] font-medium", children: "↓ incoming" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/15 text-green-600 border-green-500/30 hover:bg-green-500/20 text-[10px] font-medium", children: "↑ outgoing" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: "py-2 px-3 font-mono max-w-[120px] truncate whitespace-nowrap text-xs",
              title: log.senderId,
              children: log.senderId
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: "py-2 px-3 max-w-[200px] truncate whitespace-nowrap text-foreground text-xs",
              title: log.messageText,
              children: truncate(log.messageText)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: "py-2 px-3 whitespace-nowrap text-foreground max-w-[140px] truncate text-xs",
              title: log.flowTriggered,
              children: log.flowTriggered
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/15 text-red-600 border-red-500/30 hover:bg-red-500/20 text-[10px] font-medium", children: "✗ error" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/15 text-green-600 border-green-500/30 hover:bg-green-500/20 text-[10px] font-medium", children: "✓ success" }),
            hasPayload ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[9px] px-1 py-0 h-4 bg-blue-50 text-blue-600 border-blue-200",
                children: "RAW"
              }
            ) : null
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: "py-2 px-3 max-w-[180px] truncate whitespace-nowrap text-xs",
              title: log.errorDetail,
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation(),
              children: isError && log.errorDetail ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-mono font-medium", children: truncate(log.errorDetail, 60) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: "py-2 px-3 whitespace-nowrap",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation(),
              children: log.direction === "incoming" && chatId && onTestOutgoing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onTestOutgoing(chatId),
                  title: `Send test reply to ${chatId}`,
                  className: "text-[10px] px-2 py-1 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors font-medium",
                  "data-ocid": `bot_logs.test_outgoing.${idx + 1}`,
                  children: "Test ↑"
                }
              )
            }
          )
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/40 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      isError && log.errorDetail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold text-red-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5" }),
          "Error Detail"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-red-800 break-words whitespace-pre-wrap", children: log.errorDetail })
      ] }),
      tsParsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Telegram Update — Parsed Fields" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: [
          tsParsed.update_id !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "update_id" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground", children: tsParsed.update_id })
          ] }),
          tsParsed.chat_id !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "chat_id" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground", children: String(tsParsed.chat_id) })
          ] }),
          tsParsed.from_user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "from" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground truncate", children: tsParsed.from_user })
          ] }),
          tsParsed.message_text && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-2 bg-card border border-border rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "message text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground break-words", children: tsParsed.message_text })
          ] }),
          tsParsed.message_type && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] mt-0.5", children: tsParsed.message_type })
          ] })
        ] })
      ] }),
      log.rawPayload ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Raw Payload (full webhook body)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => copyText(prettyPayload),
              className: "flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border border-border hover:bg-muted/60 text-muted-foreground transition-colors",
              title: "Copy payload JSON",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                "Copy"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[11px] font-mono text-foreground bg-muted/40 border border-border rounded-lg p-3 overflow-x-auto max-h-52 whitespace-pre-wrap break-words", children: prettyPayload })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground italic", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No raw payload recorded for this entry." })
      ] }),
      log.direction === "incoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircleOff, { className: "w-3.5 h-3.5 text-amber-600 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800", children: "This is an incoming message. If the bot never replied, check that your bot token is saved, the HTTP outcall canister has cycles, and the webhook URL is registered with Telegram." })
      ] })
    ] }) }) })
  ] });
}
function LogTable({
  logs,
  loading,
  error,
  emptyMessage,
  statusFilter,
  tsFormat,
  onTestOutgoing,
  showUnansweredOnly
}) {
  const answeredKeys = /* @__PURE__ */ new Set();
  if (showUnansweredOnly) {
    const outgoing = logs.filter((l) => l.direction === "outgoing");
    for (const inc of logs.filter((l) => l.direction === "incoming")) {
      const replied = outgoing.some(
        (out) => out.senderId === inc.senderId && Math.abs(out.timestamp - inc.timestamp) <= 1e4
      );
      if (replied) answeredKeys.add(`${inc.senderId}:${inc.timestamp}`);
    }
  }
  let filtered = statusFilter === "all" ? logs : logs.filter((l) => l.status === statusFilter);
  if (showUnansweredOnly) {
    filtered = filtered.filter(
      (l) => l.direction === "incoming" && !answeredKeys.has(`${l.senderId}:${l.timestamp}`)
    );
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", "data-ocid": "bot_logs.loading_state", children: Array.from({ length: 8 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded" }, i)
    )) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-full gap-3 py-20 text-center",
        "data-ocid": "bot_logs.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-destructive/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-medium", children: "Failed to load logs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: error })
        ]
      }
    );
  }
  if (filtered.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-full gap-3 py-16 text-center px-6",
        "data-ocid": "bot_logs.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-12 h-12 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-sm space-y-1", children: typeof emptyMessage === "string" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: emptyMessage }) : emptyMessage })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", "data-ocid": "bot_logs.table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/60 border-b border-border z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 w-6", "aria-label": "Expand row" }),
      [
        "Timestamp",
        "Direction",
        "Chat ID / Phone",
        "Message",
        "Flow Triggered",
        "Status",
        "Error Detail",
        ""
      ].map((col, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap",
          children: col
        },
        i
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LogRow,
      {
        log,
        idx,
        tsFormat,
        onTestOutgoing
      },
      idx
    )) })
  ] }) });
}
const EMPTY_TELEGRAM = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center max-w-sm", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "No Telegram messages logged yet." }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
    "Check that your webhook is registered and the bot token is saved in",
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Telegram Configuration" }),
    "."
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-blue-800 font-semibold mb-0.5", children: "💡 Using getUpdates / Poll Now?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-blue-700", children: [
      "If your webhook is active, ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "getUpdates returns empty" }),
      " — that is expected. Telegram routes all messages to the webhook instead of queuing them for polling. Incoming messages will appear here once processed by the webhook handler."
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
    "Use ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"Poll Now (Diagnostic)"' }),
    " on the Telegram Config page only when no webhook is set."
  ] })
] });
const EMPTY_WHATSAPP = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "No WhatsApp messages logged yet." }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
    "Check that your Meta webhook is configured at",
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-muted px-1 rounded text-[11px]", children: "https://bot.localbazar.shop" }),
    "."
  ] })
] });
const EMPTY_SMS = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "No SMS messages logged yet." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Check that your SMS provider webhook is configured and pointing to your bot URL." })
] });
function BotLogsPage() {
  const { actor } = useBackendActor();
  const testSendMsg = useTestTelegramSendMessage();
  const [activeTab, setActiveTab] = reactExports.useState("telegram");
  const [telegramLogs, setTelegramLogs] = reactExports.useState([]);
  const [whatsappLogs, setWhatsappLogs] = reactExports.useState([]);
  const [smsLogs, setSmsLogs] = reactExports.useState([]);
  const [loadingTelegram, setLoadingTelegram] = reactExports.useState(false);
  const [loadingWhatsapp, setLoadingWhatsapp] = reactExports.useState(false);
  const [loadingSms, setLoadingSms] = reactExports.useState(false);
  const [errorTelegram, setErrorTelegram] = reactExports.useState(null);
  const [errorWhatsapp, setErrorWhatsapp] = reactExports.useState(null);
  const [errorSms, setErrorSms] = reactExports.useState(null);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [tsFormat, setTsFormat] = reactExports.useState("relative");
  const [showUnansweredOnly, setShowUnansweredOnly] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  const fetchLogs = reactExports.useCallback(
    async (platform, silent = false) => {
      if (!actor) return;
      const setLoading = platform === "telegram" ? setLoadingTelegram : platform === "whatsapp" ? setLoadingWhatsapp : setLoadingSms;
      const setLogs = platform === "telegram" ? setTelegramLogs : platform === "whatsapp" ? setWhatsappLogs : setSmsLogs;
      const setError = platform === "telegram" ? setErrorTelegram : platform === "whatsapp" ? setErrorWhatsapp : setErrorSms;
      if (!silent) setLoading(true);
      setError(null);
      try {
        const listFn = actor.listBotLogs;
        if (typeof listFn !== "function") {
          if (!silent) setError("Backend method listBotLogs not available");
          return;
        }
        const raw = await listFn.call(actor, platform);
        setLogs(normalizeLogs(raw));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error fetching logs";
        if (!silent) setError(msg);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [actor]
  );
  reactExports.useEffect(() => {
    if (!actor) return;
    fetchLogs("telegram");
    fetchLogs("whatsapp");
    fetchLogs("sms");
  }, [actor, fetchLogs]);
  reactExports.useEffect(() => {
    if (!actor) return;
    intervalRef.current = setInterval(() => {
      fetchLogs("telegram", true);
      fetchLogs("whatsapp", true);
      fetchLogs("sms", true);
    }, 1e4);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [actor, fetchLogs]);
  async function clearLogs(platform) {
    if (!actor) return;
    try {
      await actor.clearBotLogs(platform);
      if (platform === "telegram") setTelegramLogs([]);
      else if (platform === "whatsapp") setWhatsappLogs([]);
      else setSmsLogs([]);
      const label = platform === "telegram" ? "Telegram" : platform === "whatsapp" ? "WhatsApp" : "SMS";
      ue.success(`${label} logs cleared`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to clear logs";
      ue.error(msg);
    }
  }
  function handleRefreshAll() {
    fetchLogs("telegram");
    fetchLogs("whatsapp");
    fetchLogs("sms");
    ue.success("Logs refreshed");
  }
  function handleRefreshTab() {
    fetchLogs(activeTab);
  }
  async function handleTestOutgoing(chatId) {
    try {
      const result = await testSendMsg.mutateAsync(chatId);
      if (result.success) {
        ue.success(`Test message sent to ${chatId}`);
      } else {
        ue.error(
          `Send failed: ${result.errorMessage ?? "check bot token and chat ID"}`
        );
      }
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Send test failed");
    }
  }
  const telegramCount = telegramLogs.length;
  const whatsappCount = whatsappLogs.length;
  const smsCount = smsLogs.length;
  const allLogs = [...telegramLogs, ...whatsappLogs, ...smsLogs];
  const hasOutOfCycles = allLogs.some(
    (l) => {
      var _a, _b, _c, _d;
      return ((_a = l.errorDetail) == null ? void 0 : _a.includes("IC0504")) || ((_b = l.errorDetail) == null ? void 0 : _b.includes("out of cycles")) || ((_c = l.errorDetail) == null ? void 0 : _c.includes("out_of_cycles")) || ((_d = l.messageText) == null ? void 0 : _d.includes("IC0504"));
    }
  );
  const currentLoading = activeTab === "telegram" ? loadingTelegram : activeTab === "whatsapp" ? loadingWhatsapp : loadingSms;
  const clearLabel = activeTab === "telegram" ? "Telegram" : activeTab === "whatsapp" ? "WhatsApp" : "SMS";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-[calc(100vh-64px)]",
      "data-ocid": "bot_logs.page",
      children: [
        hasOutOfCycles && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 px-4 py-3 bg-red-50 border-b border-red-300 text-red-800 text-xs flex-shrink-0",
            "data-ocid": "bot_logs.out_of_cycles_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "⚠️ Canister out of cycles (IC0504)" }),
                " ",
                "— The HTTP outcalls extension canister",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-red-100 px-1 rounded", children: "7fpuz-xqaaa-aaaac-qan7a-cai" }),
                " ",
                "has run out of cycles.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "All outgoing Telegram messages will fail" }),
                " until this canister is topped up. Contact Caffeine support to resolve. This error is not fixable by code changes."
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold text-foreground text-sm", children: "Bot Logs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Live Telegram, WhatsApp & SMS message activity · auto-refreshes every 10 s · click any row to expand raw payload" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-8 gap-1.5 text-xs",
                onClick: handleRefreshAll,
                disabled: currentLoading,
                "data-ocid": "bot_logs.refresh_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-3.5 h-3.5 ${currentLoading ? "animate-spin" : ""}`
                    }
                  ),
                  "Refresh All"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 gap-1.5 text-xs text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10",
                  "data-ocid": "bot_logs.open_modal_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    "Clear ",
                    clearLabel,
                    " Logs"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "bot_logs.dialog", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                    "Clear ",
                    clearLabel,
                    " Logs"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                    "This will permanently delete all ",
                    clearLabel,
                    " bot logs. This action cannot be undone."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "bot_logs.cancel_button", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                      onClick: () => clearLogs(activeTab),
                      "data-ocid": "bot_logs.confirm_button",
                      children: "Clear Logs"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Tabs,
          {
            value: activeTab,
            onValueChange: (v) => {
              setActiveTab(v);
              setStatusFilter("all");
            },
            className: "flex-1 min-h-0 flex flex-col overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-10 rounded-none border-b border-border bg-muted/30 shrink-0 w-full justify-start px-4 gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "telegram",
                    className: "text-xs h-7 gap-1.5",
                    "data-ocid": "bot_logs.telegram_tab",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3 h-3" }),
                      "Telegram Logs",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-[10px] tabular-nums ml-0.5 h-4 px-1.5",
                          children: telegramCount
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "whatsapp",
                    className: "text-xs h-7 gap-1.5",
                    "data-ocid": "bot_logs.whatsapp_tab",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
                      "WhatsApp Logs",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-[10px] tabular-nums ml-0.5 h-4 px-1.5",
                          children: whatsappCount
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "sms",
                    className: "text-xs h-7 gap-1.5",
                    "data-ocid": "bot_logs.sms_tab",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                      "SMS Logs",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-[10px] tabular-nums ml-0.5 h-4 px-1.5",
                          children: smsCount
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2 border-b border-border/60 bg-background shrink-0 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 gap-1.5 text-xs",
                    onClick: handleRefreshTab,
                    disabled: currentLoading,
                    "data-ocid": "bot_logs.refresh_tab_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        RefreshCw,
                        {
                          className: `w-3 h-3 ${currentLoading ? "animate-spin" : ""}`
                        }
                      ),
                      "Refresh Now"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex items-center gap-1 ml-1",
                    "aria-label": "Status filter",
                    children: ["all", "success", "error"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setStatusFilter(f),
                        "data-ocid": `bot_logs.filter_${f}`,
                        className: `text-[11px] px-2.5 py-1 rounded-md border transition-colors ${statusFilter === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60 text-muted-foreground"}`,
                        children: f.charAt(0).toUpperCase() + f.slice(1)
                      },
                      f
                    ))
                  }
                ),
                activeTab === "telegram" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowUnansweredOnly((v) => !v),
                    "data-ocid": "bot_logs.filter_unanswered",
                    className: `text-[11px] px-2.5 py-1 rounded-md border transition-colors flex items-center gap-1.5 ${showUnansweredOnly ? "bg-amber-500 text-white border-amber-500" : "border-border hover:bg-muted/60 text-muted-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircleOff, { className: "w-3 h-3" }),
                      "Unanswered"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Time:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setTsFormat((f) => f === "relative" ? "absolute" : "relative"),
                      "data-ocid": "bot_logs.timestamp_toggle",
                      className: "text-[11px] px-2 py-1 rounded border border-border hover:bg-muted/60 text-muted-foreground transition-colors",
                      children: tsFormat === "relative" ? "Relative (2 min ago)" : "Absolute (date/time)"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsContent,
                {
                  value: "telegram",
                  className: "flex-1 min-h-0 m-0 overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LogTable,
                    {
                      logs: telegramLogs,
                      loading: loadingTelegram,
                      error: errorTelegram,
                      emptyMessage: EMPTY_TELEGRAM,
                      statusFilter,
                      tsFormat,
                      onTestOutgoing: handleTestOutgoing,
                      showUnansweredOnly
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsContent,
                {
                  value: "whatsapp",
                  className: "flex-1 min-h-0 m-0 overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LogTable,
                    {
                      logs: whatsappLogs,
                      loading: loadingWhatsapp,
                      error: errorWhatsapp,
                      emptyMessage: EMPTY_WHATSAPP,
                      statusFilter,
                      tsFormat
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sms", className: "flex-1 min-h-0 m-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                LogTable,
                {
                  logs: smsLogs,
                  loading: loadingSms,
                  error: errorSms,
                  emptyMessage: EMPTY_SMS,
                  statusFilter,
                  tsFormat
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
export {
  BotLogsPage as default
};
