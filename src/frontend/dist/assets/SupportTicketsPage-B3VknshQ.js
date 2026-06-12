import { r as reactExports, cd as useGetSupportTickets, j as jsxRuntimeExports, ce as useUpdateSupportTicket, H as useManualUnblock, m as useOrders, p as ue, cf as api } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { H as Headphones } from "./headphones-DOAh6z5w.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { T as Ticket } from "./ticket-CID_kmnS.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { L as LockOpen } from "./lock-open-BwR0r970.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
function CategoryBadge({ category }) {
  let label = "Other";
  let cls = "bg-blue-100 text-blue-700 border-blue-200";
  if (category === "payment_stuck") {
    label = "Payment Stuck";
    cls = "bg-red-100 text-red-700 border-red-200";
  } else if (category === "behaviour_complaint") {
    label = "Behaviour";
    cls = "bg-orange-100 text-orange-700 border-orange-200";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`,
      children: label
    }
  );
}
function TicketStatusBadge({ status }) {
  let label = "New";
  let cls = "bg-muted text-muted-foreground border-border";
  if (status === "assigned") {
    label = "Assigned";
    cls = "bg-blue-100 text-blue-700 border-blue-200";
  } else if (status === "in_progress") {
    label = "In Progress";
    cls = "bg-yellow-100 text-yellow-700 border-yellow-200";
  } else if (status === "resolved") {
    label = "Resolved";
    cls = "bg-emerald-100 text-emerald-700 border-emerald-200";
  } else if (status === "closed") {
    label = "Closed";
    cls = "bg-slate-100 text-slate-600 border-slate-200";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`,
      children: label
    }
  );
}
function PriorityBadge({ priority }) {
  let label = "Low";
  let cls = "bg-muted text-muted-foreground";
  if (priority === "high") {
    label = "High";
    cls = "bg-red-100 text-red-700";
  } else if (priority === "medium") {
    label = "Medium";
    cls = "bg-amber-100 text-amber-700";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`,
      children: label
    }
  );
}
function isOverdue(ticket) {
  return ticket.resolutionDeadline < Date.now() && ticket.status !== "resolved" && ticket.status !== "closed";
}
function formatTs(ms) {
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function TicketModal({
  ticket,
  onClose
}) {
  const updateTicket = useUpdateSupportTicket();
  const manualUnblock = useManualUnblock();
  const [adminNote, setAdminNote] = reactExports.useState((ticket == null ? void 0 : ticket.adminNote) ?? "");
  const [newStatus, setNewStatus] = reactExports.useState((ticket == null ? void 0 : ticket.status) ?? "new");
  if (!ticket) return null;
  const overdue = isOverdue(ticket);
  async function handleUpdate() {
    try {
      await updateTicket.mutateAsync({
        ticketId: ticket.ticketId,
        status: newStatus,
        adminNote
      });
      ue.success("Ticket updated");
      onClose();
    } catch {
      ue.error("Failed to update ticket");
    }
  }
  async function handleUnblock(entityType) {
    try {
      await manualUnblock.mutateAsync({
        entityId: ticket.fromPhone,
        entityType
      });
      ue.success("Entity unblocked successfully");
    } catch {
      ue.error("Failed to unblock");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!ticket, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", "data-ocid": "support-ticket.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-4 h-4" }),
      ticket.ticketId
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      overdue && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "This ticket is ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "overdue" }),
          " — deadline was",
          " ",
          formatTs(ticket.resolutionDeadline),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        [
          { label: "From", value: ticket.fromPhone },
          { label: "Role", value: ticket.fromRole }
        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium capitalize", children: value })
        ] }, label)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: ticket.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: ticket.priority })
        ] }),
        ticket.orderId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 font-medium mb-0.5", children: "Related Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-semibold text-blue-800", children: ticket.orderId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: formatTs(ticket.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Deadline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-xs font-medium ${overdue ? "text-destructive" : ""}`,
              children: formatTs(ticket.resolutionDeadline)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: ticket.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Admin Note" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            rows: 3,
            placeholder: "Add your note or resolution steps…",
            value: adminNote,
            onChange: (e) => setAdminNote(e.target.value),
            "data-ocid": "support-ticket.admin-note"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Update Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newStatus, onValueChange: setNewStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "support-ticket.status-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "new", children: "New" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "assigned", children: "Assigned" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "in_progress", children: "In Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "resolved", children: "Resolved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "closed", children: "Closed" })
          ] })
        ] })
      ] }),
      (ticket.fromRole === "merchant" || ticket.fromRole === "deliveryPartner") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-700 mb-2", children: "Manual Unblock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
            "If this ",
            ticket.fromRole,
            " was auto-blocked due to a negative rating, you can manually unblock them here."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "gap-1.5 text-xs border-amber-300 text-amber-700 hover:bg-amber-50",
              onClick: () => handleUnblock(
                ticket.fromRole === "merchant" ? "merchant" : "deliveryPartner"
              ),
              disabled: manualUnblock.isPending,
              "data-ocid": "support-ticket.unblock-button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-3 h-3" }),
                manualUnblock.isPending ? "Unblocking…" : "Unblock Entity"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "support-ticket.close-button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1",
            onClick: handleUpdate,
            disabled: updateTicket.isPending,
            "data-ocid": "support-ticket.confirm-button",
            children: updateTicket.isPending ? "Saving…" : "Update Ticket"
          }
        )
      ] })
    ] })
  ] }) });
}
function CreateTicketDialog({
  open,
  onClose,
  onCreated
}) {
  const { data: orders = [] } = useOrders();
  const [form, setForm] = reactExports.useState({
    fromPhone: "",
    role: "customer",
    category: "payment_stuck",
    description: "",
    orderId: ""
  });
  const [orderSuggestions, setOrderSuggestions] = reactExports.useState([]);
  const [saving, setSaving] = reactExports.useState(false);
  function handleOrderIdChange(val) {
    setForm((f) => ({ ...f, orderId: val }));
    if (val.trim().length >= 2) {
      const matches = orders.map((o) => o.id).filter((id) => id.toLowerCase().includes(val.toLowerCase())).slice(0, 6);
      setOrderSuggestions(matches);
    } else {
      setOrderSuggestions([]);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.fromPhone.trim() || !form.description.trim()) {
      ue.error("Phone and description are required");
      return;
    }
    setSaving(true);
    try {
      await api.createSupportTicket(
        form.fromPhone,
        form.role,
        form.category,
        form.description,
        form.orderId || void 0
      );
      ue.success("Support ticket created");
      onCreated();
      onClose();
    } catch {
      ue.error("Failed to create ticket");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-lg",
      "data-ocid": "support-ticket.create-dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          " Create Support Ticket"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.fromPhone,
                  onChange: (e) => setForm((f) => ({ ...f, fromPhone: e.target.value })),
                  placeholder: "+91 98765 43210",
                  "data-ocid": "support-ticket.create-phone"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.role,
                  onValueChange: (v) => setForm((f) => ({ ...f, role: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "support-ticket.create-role", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "customer", children: "Customer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "merchant", children: "Merchant" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "deliveryPartner", children: "Delivery Partner" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sarthi", children: "Sarthi" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.category,
                onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "support-ticket.create-category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "payment_stuck", children: "Payment Stuck" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "behaviour_complaint", children: "Behaviour Complaint" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Related Order ID",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.orderId,
                  onChange: (e) => handleOrderIdChange(e.target.value),
                  placeholder: "e.g. ORD-001",
                  "data-ocid": "support-ticket.create-order-id"
                }
              ),
              orderSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-10 top-full left-0 right-0 bg-card border border-border rounded-lg shadow-lg mt-1 overflow-hidden", children: orderSuggestions.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full text-left px-3 py-2 text-xs hover:bg-muted/40 font-mono",
                  onClick: () => {
                    setForm((f) => ({ ...f, orderId: id }));
                    setOrderSuggestions([]);
                  },
                  children: id
                },
                id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                rows: 3,
                value: form.description,
                onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                placeholder: "Describe the issue in detail…",
                "data-ocid": "support-ticket.create-description"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "support-ticket.create-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1",
                disabled: saving,
                "data-ocid": "support-ticket.create-submit",
                children: saving ? "Creating…" : "Create Ticket"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function SupportTicketsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [priorityFilter, setPriorityFilter] = reactExports.useState("all");
  const [orderIdFilter, setOrderIdFilter] = reactExports.useState("");
  const [selectedTicket, setSelectedTicket] = reactExports.useState(null);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const { data: tickets = [], isLoading, refetch } = useGetSupportTickets();
  const now = Date.now();
  const openCount = tickets.filter(
    (t) => t.status !== "resolved" && t.status !== "closed"
  ).length;
  const overdueCount = tickets.filter(
    (t) => t.resolutionDeadline < now && t.status !== "resolved" && t.status !== "closed"
  ).length;
  const resolvedToday = tickets.filter(
    (t) => t.resolvedAt !== void 0 && t.resolvedAt > now - 864e5
  ).length;
  const filtered = tickets.filter((t) => {
    if (search && !t.fromPhone.includes(search) && !t.ticketId.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (orderIdFilter && !(t.orderId ?? "").toLowerCase().includes(orderIdFilter.toLowerCase()))
      return false;
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "w-5 h-5 text-primary" }),
          "Support Tickets"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          tickets.length,
          " total tickets"
        ] })
      ] }),
      overdueCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: overdueCount }),
          " overdue tickets require urgent attention"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-2 shrink-0",
          onClick: () => setShowCreateDialog(true),
          "data-ocid": "support-tickets.create-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New Ticket"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Total",
        value: tickets.length,
        icon: Ticket,
        color: "text-foreground"
      },
      {
        label: "Open",
        value: openCount,
        icon: Clock,
        color: "text-blue-600"
      },
      {
        label: "Overdue",
        value: overdueCount,
        icon: CircleAlert,
        color: "text-destructive"
      },
      {
        label: "Resolved Today",
        value: resolvedToday,
        icon: CircleCheckBig,
        color: "text-emerald-600"
      }
    ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-3 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold font-display ${color}`, children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
          ] })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            placeholder: "Search by phone, ticket ID, description…",
            "data-ocid": "support-tickets.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-36",
            "data-ocid": "support-tickets.status-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "new", children: "New" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "assigned", children: "Assigned" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "in_progress", children: "In Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "resolved", children: "Resolved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "closed", children: "Closed" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-40",
            "data-ocid": "support-tickets.category-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "payment_stuck", children: "Payment Stuck" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "behaviour_complaint", children: "Behaviour" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: priorityFilter, onValueChange: setPriorityFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-32",
            "data-ocid": "support-tickets.priority-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Priority" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "High" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Low" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: orderIdFilter,
          onChange: (e) => setOrderIdFilter(e.target.value),
          className: "w-full sm:w-36",
          placeholder: "Filter by Order ID…",
          "data-ocid": "support-tickets.order-id-filter"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["t1", "t2", "t3", "t4", "t5"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, s)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-16 text-center",
        "data-ocid": "support-tickets.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No tickets match your filters" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Ticket ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium hidden md:table-cell", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Order ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Priority" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium hidden lg:table-cell", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium hidden lg:table-cell", children: "Deadline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((ticket, idx) => {
        const overdueTkt = isOverdue(ticket);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: [
              "border-b border-border/50 transition-colors",
              overdueTkt ? "bg-red-50/60 dark:bg-red-950/10 hover:bg-red-50 dark:hover:bg-red-950/20" : "hover:bg-muted/20"
            ].join(" "),
            "data-ocid": `support-tickets.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                overdueTkt && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-destructive shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-medium", children: ticket.ticketId })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono", children: ticket.fromPhone }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize", children: ticket.fromRole })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: ticket.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 hidden md:table-cell max-w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: ticket.description }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: ticket.orderId ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded", children: ticket.orderId }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TicketStatusBadge, { status: ticket.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: ticket.priority }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 hidden lg:table-cell text-xs text-muted-foreground whitespace-nowrap", children: formatTs(ticket.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 hidden lg:table-cell whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs ${overdueTkt ? "text-destructive font-medium" : "text-muted-foreground"}`,
                  children: formatTs(ticket.resolutionDeadline)
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 px-2 text-xs",
                  onClick: () => setSelectedTicket(ticket),
                  "data-ocid": `support-tickets.edit_button.${idx + 1}`,
                  children: "View"
                }
              ) })
            ]
          },
          ticket.ticketId
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TicketModal,
      {
        ticket: selectedTicket,
        onClose: () => setSelectedTicket(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateTicketDialog,
      {
        open: showCreateDialog,
        onClose: () => setShowCreateDialog(false),
        onCreated: () => {
          void refetch();
        }
      }
    )
  ] });
}
export {
  SupportTicketsPage as default
};
