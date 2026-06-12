import { r as reactExports, _ as useBackendActor, c9 as useModerationQueue, ca as useApproveModerationItem, cb as useRejectModerationItem, cc as useCheckItemModeration, aT as useGetAllLendingItems, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { S as ShieldCheck } from "./shield-check-DNUGUjo-.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { G as Globe } from "./globe--tJa3NSQ.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-IXOTxK3N.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-DYndF6Sn.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
const STATUS_LABELS = {
  pending: {
    label: "Pending",
    cls: "bg-yellow-100 text-yellow-700 border-yellow-200"
  },
  approved: {
    label: "Approved",
    cls: "bg-green-100 text-green-700 border-green-200"
  },
  flagged: {
    label: "Flagged",
    cls: "bg-orange-100 text-orange-700 border-orange-200"
  },
  rejected: {
    label: "Rejected",
    cls: "bg-red-100 text-red-700 border-red-200"
  }
};
function statusBadge(status) {
  const m = STATUS_LABELS[status] ?? STATUS_LABELS.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${m.cls}`,
      children: m.label
    }
  );
}
function categoryLabel(et) {
  const map = {
    merchant: "Merchant",
    product: "Product",
    customOrder: "Custom Order",
    job: "Job",
    property: "Property",
    deliveryPartner: "Delivery Partner",
    promotion: "Promotion",
    event: "Event",
    lendingItem: "Lending Item"
  };
  return map[et] ?? et;
}
function ModerationPage() {
  const [search, setSearch] = reactExports.useState("");
  const [rejectReason, setRejectReason] = reactExports.useState({});
  const [tab, setTab] = reactExports.useState("all");
  const [contentTypeFilter, setContentTypeFilter] = reactExports.useState("all");
  const [internetResults, setInternetResults] = reactExports.useState({});
  const { actor } = useBackendActor();
  const { data: queueItems = [], isLoading } = useModerationQueue();
  const approveItem = useApproveModerationItem();
  const rejectItem = useRejectModerationItem();
  const checkModeration = useCheckItemModeration();
  const { data: allLendingItems = [] } = useGetAllLendingItems();
  const disputedLendingItems = allLendingItems.filter((item) => item.status === "disputed").map((item) => ({
    id: item.id,
    entityType: "lendingItem",
    title: `Lending Item — ${item.itemName}`,
    subtitle: `Lender: ${item.lenderPhone} · Borrower: ${item.borrowerPhone} · ₹${item.charge}`,
    status: "pending",
    remark: "Disputed by one of the parties",
    createdAt: Number(item.createdAt),
    rawContent: `${item.itemName} ${item.itemDescription}`
  }));
  const backendItems = queueItems.map((item) => ({
    id: item.entityId,
    entityType: item.entityType,
    title: `${categoryLabel(item.entityType)} — ${item.entityId}`,
    subtitle: item.remark ? `Remark: ${item.remark}` : `Checked: ${new Date(Number(item.checkedAt) / 1e6 || 0).toLocaleDateString("en-IN")}`,
    status: item.status,
    remark: item.remark,
    createdAt: Number(item.checkedAt),
    rawContent: `${item.entityType} ${item.entityId}`
  }));
  const items = [
    ...backendItems,
    ...disputedLendingItems.filter(
      (li) => !backendItems.some((bi) => bi.id === li.id)
    )
  ];
  const CONTENT_TYPES = [
    { value: "all", label: "All Types" },
    { value: "merchant", label: "Merchant" },
    { value: "product", label: "Product" },
    { value: "deliveryPartner", label: "Delivery Partner" },
    { value: "promotion", label: "Promotion" },
    { value: "event", label: "Event" },
    { value: "lendingItem", label: "Lending Item" }
  ];
  const filtered = items.filter((item) => {
    if (tab !== "all" && item.status !== tab) return false;
    if (contentTypeFilter !== "all" && item.entityType !== contentTypeFilter)
      return false;
    if (search) {
      const q = search.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
    }
    return true;
  });
  const counts = {
    all: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    approved: items.filter((i) => i.status === "approved").length,
    flagged: items.filter((i) => i.status === "flagged").length,
    rejected: items.filter((i) => i.status === "rejected").length
  };
  async function handleApprove(item) {
    try {
      await approveItem.mutateAsync({
        entityType: item.entityType,
        entityId: item.id
      });
      ue.success(`${categoryLabel(item.entityType)} approved`);
    } catch {
      ue.error("Failed to approve");
    }
  }
  async function handleReject(item) {
    const reason = rejectReason[item.id] ?? "";
    if (!reason.trim()) {
      ue.error("Please enter a rejection reason");
      return;
    }
    try {
      await rejectItem.mutateAsync({
        entityType: item.entityType,
        entityId: item.id,
        remark: reason
      });
      ue.success(`${categoryLabel(item.entityType)} rejected`);
      setRejectReason((r) => ({ ...r, [item.id]: "" }));
    } catch {
      ue.error("Failed to reject");
    }
  }
  async function handleInternetCheck(item) {
    setInternetResults((r) => ({ ...r, [item.id]: "checking" }));
    try {
      const result = await checkModeration.mutateAsync({
        itemType: item.entityType,
        itemId: item.id,
        content: item.rawContent ?? item.title
      });
      const checkResult = result;
      setInternetResults((r) => ({ ...r, [item.id]: checkResult }));
      if (!checkResult.approved) {
        ue.warning(`Flagged: ${checkResult.reason}`);
        if (actor) {
          await actor.updateModerationStatus(
            item.entityType,
            item.id,
            "flagged",
            checkResult.reason
          );
        }
      } else {
        ue.success("Internet check passed — no illegal content detected");
      }
    } catch {
      setInternetResults((r) => {
        const next = { ...r };
        delete next[item.id];
        return next;
      });
      ue.error("Internet check failed");
    }
  }
  const TAB_OPTIONS = [
    { value: "all", label: `All (${counts.all})` },
    { value: "pending", label: `Pending (${counts.pending})` },
    { value: "approved", label: `Approved (${counts.approved})` },
    { value: "flagged", label: `Flagged (${counts.flagged})` },
    { value: "rejected", label: `Rejected (${counts.rejected})` }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 p-6", "data-ocid": "moderation.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6 text-primary" }),
          "AI Moderation Queue"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Review and approve content flagged by the AI moderation system" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        counts.pending > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-yellow-700 border-yellow-300 bg-yellow-50 gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              " ",
              counts.pending,
              " Pending"
            ]
          }
        ),
        counts.flagged > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-orange-700 border-orange-300 bg-orange-50 gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
              " ",
              counts.flagged,
              " Flagged"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-muted/40 rounded-lg p-1", children: TAB_OPTIONS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setTab(t.value),
          "data-ocid": `moderation.tab.${t.value}`,
          className: `px-3 py-1 rounded-md text-xs font-medium transition-colors ${tab === t.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: t.label
        },
        t.value
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: contentTypeFilter, onValueChange: setContentTypeFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-40 h-8 text-xs",
            "data-ocid": "moderation.content-type_select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Content type" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CONTENT_TYPES.map((ct) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ct.value, className: "text-xs", children: ct.label }, ct.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search items...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "moderation.search_input"
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "moderation.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 text-muted-foreground",
        "data-ocid": "moderation.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No items to moderate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: tab !== "all" ? `No ${tab} items — try switching tabs` : "The moderation queue is empty" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[calc(100vh-360px)] overflow-y-auto pr-1", children: filtered.map((item, idx) => {
      var _a;
      const internetResult = internetResults[item.id];
      const isChecking = internetResult === "checking";
      const checkResult = typeof internetResult === "object" ? internetResult : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-4 flex flex-col gap-3",
          "data-ocid": `moderation.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground truncate", children: item.title }),
                  statusBadge(item.status),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full", children: categoryLabel(item.entityType) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: item.subtitle }),
                item.remark && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-600 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 inline mr-1" }),
                  item.remark
                ] }),
                checkResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `mt-1 flex items-center gap-1 text-xs ${checkResult.approved ? "text-emerald-600" : "text-red-600"}`,
                    children: checkResult.approved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                      " ✅ Internet check passed"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
                      " 🚨 Flagged: ",
                      checkResult.reason
                    ] })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs gap-1 border-blue-300 text-blue-700 hover:bg-blue-50",
                    onClick: () => handleInternetCheck(item),
                    disabled: isChecking || checkModeration.isPending,
                    "data-ocid": `moderation.internet-check-button.${idx + 1}`,
                    children: [
                      isChecking ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
                      isChecking ? "Checking…" : "Internet Check"
                    ]
                  }
                ),
                item.status !== "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs border-green-300 text-green-700 hover:bg-green-50",
                    onClick: () => handleApprove(item),
                    disabled: approveItem.isPending,
                    "data-ocid": `moderation.approve_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1" }),
                      " Approve"
                    ]
                  }
                ),
                item.status !== "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs border-red-300 text-red-700 hover:bg-red-50",
                    onClick: () => handleReject(item),
                    disabled: rejectItem.isPending || !((_a = rejectReason[item.id]) == null ? void 0 : _a.trim()),
                    "data-ocid": `moderation.reject_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1" }),
                      " Reject"
                    ]
                  }
                )
              ] })
            ] }),
            item.status !== "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "Enter rejection reason (required to reject)...",
                value: rejectReason[item.id] ?? "",
                onChange: (e) => setRejectReason((r) => ({
                  ...r,
                  [item.id]: e.target.value
                })),
                className: "text-xs h-14 resize-none",
                "data-ocid": `moderation.reject_reason.${idx + 1}`
              }
            )
          ]
        },
        item.id
      );
    }) })
  ] });
}
export {
  ModerationPage as default
};
