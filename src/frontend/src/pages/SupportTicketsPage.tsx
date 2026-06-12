import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  HeadphonesIcon,
  Plus,
  Search,
  Ticket,
  Unlock,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { SupportTicketLocal } from "../backend-api";
import { api } from "../backend-api";
import {
  useGetSupportTickets,
  useManualUnblock,
  useOrders,
  useUpdateSupportTicket,
} from "../hooks/useBackend";

// ─── Badge helpers ────────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  let label = "Other";
  let cls = "bg-blue-100 text-blue-700 border-blue-200";
  if (category === "payment_stuck") {
    label = "Payment Stuck";
    cls = "bg-red-100 text-red-700 border-red-200";
  } else if (category === "behaviour_complaint") {
    label = "Behaviour";
    cls = "bg-orange-100 text-orange-700 border-orange-200";
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      {label}
    </span>
  );
}

function TicketStatusBadge({ status }: { status: string }) {
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
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      {label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  let label = "Low";
  let cls = "bg-muted text-muted-foreground";
  if (priority === "high") {
    label = "High";
    cls = "bg-red-100 text-red-700";
  } else if (priority === "medium") {
    label = "Medium";
    cls = "bg-amber-100 text-amber-700";
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

function isOverdue(ticket: SupportTicketLocal): boolean {
  return (
    ticket.resolutionDeadline < Date.now() &&
    ticket.status !== "resolved" &&
    ticket.status !== "closed"
  );
}

function formatTs(ms: number): string {
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Ticket Detail Modal ──────────────────────────────────────────────────────

function TicketModal({
  ticket,
  onClose,
}: {
  ticket: SupportTicketLocal | null;
  onClose: () => void;
}) {
  const updateTicket = useUpdateSupportTicket();
  const manualUnblock = useManualUnblock();
  const [adminNote, setAdminNote] = useState(ticket?.adminNote ?? "");
  const [newStatus, setNewStatus] = useState(ticket?.status ?? "new");

  if (!ticket) return null;
  const overdue = isOverdue(ticket);

  async function handleUpdate() {
    try {
      await updateTicket.mutateAsync({
        ticketId: ticket!.ticketId,
        status: newStatus,
        adminNote,
      });
      toast.success("Ticket updated");
      onClose();
    } catch {
      toast.error("Failed to update ticket");
    }
  }

  async function handleUnblock(entityType: "merchant" | "deliveryPartner") {
    try {
      await manualUnblock.mutateAsync({
        entityId: ticket!.fromPhone,
        entityType,
      });
      toast.success("Entity unblocked successfully");
    } catch {
      toast.error("Failed to unblock");
    }
  }

  return (
    <Dialog open={!!ticket} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg" data-ocid="support-ticket.dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            {ticket.ticketId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {overdue && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                This ticket is <strong>overdue</strong> — deadline was{" "}
                {formatTs(ticket.resolutionDeadline)}.
              </span>
            </div>
          )}

          {/* Ticket info grid */}
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { label: "From", value: ticket.fromPhone },
                { label: "Role", value: ticket.fromRole },
              ] as { label: string; value: string }[]
            ).map(({ label, value }) => (
              <div key={label} className="bg-muted/30 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium capitalize">{value}</p>
              </div>
            ))}
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Category</p>
              <CategoryBadge category={ticket.category} />
            </div>
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Priority</p>
              <PriorityBadge priority={ticket.priority} />
            </div>
            {ticket.orderId && (
              <div className="col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-0.5">
                  Related Order ID
                </p>
                <p className="text-sm font-mono font-semibold text-blue-800">
                  {ticket.orderId}
                </p>
              </div>
            )}
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-xs font-medium">
                {formatTs(ticket.createdAt)}
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p
                className={`text-xs font-medium ${overdue ? "text-destructive" : ""}`}
              >
                {formatTs(ticket.resolutionDeadline)}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-muted/20 rounded-xl p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Description
            </p>
            <p className="text-sm text-foreground">{ticket.description}</p>
          </div>

          {/* Admin note */}
          <div className="space-y-1.5">
            <Label>Admin Note</Label>
            <Textarea
              rows={3}
              placeholder="Add your note or resolution steps…"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              data-ocid="support-ticket.admin-note"
            />
          </div>

          {/* Status update */}
          <div className="space-y-1.5">
            <Label>Update Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger data-ocid="support-ticket.status-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manual unblock (if relevant role) */}
          {(ticket.fromRole === "merchant" ||
            ticket.fromRole === "deliveryPartner") && (
            <div className="flex gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <Unlock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-amber-700 mb-2">
                  Manual Unblock
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  If this {ticket.fromRole} was auto-blocked due to a negative
                  rating, you can manually unblock them here.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs border-amber-300 text-amber-700 hover:bg-amber-50"
                  onClick={() =>
                    handleUnblock(
                      ticket.fromRole === "merchant"
                        ? "merchant"
                        : "deliveryPartner",
                    )
                  }
                  disabled={manualUnblock.isPending}
                  data-ocid="support-ticket.unblock-button"
                >
                  <Unlock className="w-3 h-3" />
                  {manualUnblock.isPending ? "Unblocking…" : "Unblock Entity"}
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="support-ticket.close-button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleUpdate}
              disabled={updateTicket.isPending}
              data-ocid="support-ticket.confirm-button"
            >
              {updateTicket.isPending ? "Saving…" : "Update Ticket"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Create Ticket Dialog ─────────────────────────────────────────────────────

function CreateTicketDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const { data: orders = [] } = useOrders();
  const [form, setForm] = useState({
    fromPhone: "",
    role: "customer",
    category: "payment_stuck",
    description: "",
    orderId: "",
  });
  const [orderSuggestions, setOrderSuggestions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function handleOrderIdChange(val: string) {
    setForm((f) => ({ ...f, orderId: val }));
    if (val.trim().length >= 2) {
      const matches = orders
        .map((o) => o.id)
        .filter((id) => id.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 6);
      setOrderSuggestions(matches);
    } else {
      setOrderSuggestions([]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fromPhone.trim() || !form.description.trim()) {
      toast.error("Phone and description are required");
      return;
    }
    setSaving(true);
    try {
      await api.createSupportTicket(
        form.fromPhone,
        form.role,
        form.category,
        form.description,
        form.orderId || undefined,
      );
      toast.success("Support ticket created");
      onCreated();
      onClose();
    } catch {
      toast.error("Failed to create ticket");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="sm:max-w-lg"
        data-ocid="support-ticket.create-dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Support Ticket
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Phone Number</Label>
              <Input
                value={form.fromPhone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fromPhone: e.target.value }))
                }
                placeholder="+91 98765 43210"
                data-ocid="support-ticket.create-phone"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
              >
                <SelectTrigger data-ocid="support-ticket.create-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="merchant">Merchant</SelectItem>
                  <SelectItem value="deliveryPartner">
                    Delivery Partner
                  </SelectItem>
                  <SelectItem value="sarthi">Sarthi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
            >
              <SelectTrigger data-ocid="support-ticket.create-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment_stuck">Payment Stuck</SelectItem>
                <SelectItem value="behaviour_complaint">
                  Behaviour Complaint
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>
              Related Order ID{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <div className="relative">
              <Input
                value={form.orderId}
                onChange={(e) => handleOrderIdChange(e.target.value)}
                placeholder="e.g. ORD-001"
                data-ocid="support-ticket.create-order-id"
              />
              {orderSuggestions.length > 0 && (
                <div className="absolute z-10 top-full left-0 right-0 bg-card border border-border rounded-lg shadow-lg mt-1 overflow-hidden">
                  {orderSuggestions.map((id) => (
                    <button
                      key={id}
                      type="button"
                      className="w-full text-left px-3 py-2 text-xs hover:bg-muted/40 font-mono"
                      onClick={() => {
                        setForm((f) => ({ ...f, orderId: id }));
                        setOrderSuggestions([]);
                      }}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Describe the issue in detail…"
              data-ocid="support-ticket.create-description"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="support-ticket.create-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={saving}
              data-ocid="support-ticket.create-submit"
            >
              {saving ? "Creating…" : "Create Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SupportTicketsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [selectedTicket, setSelectedTicket] =
    useState<SupportTicketLocal | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: tickets = [], isLoading, refetch } = useGetSupportTickets();

  const now = Date.now();
  const openCount = tickets.filter(
    (t) => t.status !== "resolved" && t.status !== "closed",
  ).length;
  const overdueCount = tickets.filter(
    (t) =>
      t.resolutionDeadline < now &&
      t.status !== "resolved" &&
      t.status !== "closed",
  ).length;
  const resolvedToday = tickets.filter(
    (t) => t.resolvedAt !== undefined && t.resolvedAt > now - 86400000,
  ).length;

  const filtered = tickets.filter((t) => {
    if (
      search &&
      !t.fromPhone.includes(search) &&
      !t.ticketId.toLowerCase().includes(search.toLowerCase()) &&
      !t.description.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (
      orderIdFilter &&
      !(t.orderId ?? "").toLowerCase().includes(orderIdFilter.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <HeadphonesIcon className="w-5 h-5 text-primary" />
            Support Tickets
          </h2>
          <p className="text-sm text-muted-foreground">
            {tickets.length} total tickets
          </p>
        </div>
        {overdueCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span>
              <strong>{overdueCount}</strong> overdue tickets require urgent
              attention
            </span>
          </div>
        )}
        <Button
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => setShowCreateDialog(true)}
          data-ocid="support-tickets.create-button"
        >
          <Plus className="w-4 h-4" /> New Ticket
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            {
              label: "Total",
              value: tickets.length,
              icon: Ticket,
              color: "text-foreground",
            },
            {
              label: "Open",
              value: openCount,
              icon: Clock,
              color: "text-blue-600",
            },
            {
              label: "Overdue",
              value: overdueCount,
              icon: AlertCircle,
              color: "text-destructive",
            },
            {
              label: "Resolved Today",
              value: resolvedToday,
              icon: CheckCircle,
              color: "text-emerald-600",
            },
          ] as {
            label: string;
            value: number;
            icon: React.ComponentType<{ className?: string }>;
            color: string;
          }[]
        ).map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <p className={`text-xl font-bold font-display ${color}`}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            placeholder="Search by phone, ticket ID, description…"
            data-ocid="support-tickets.search_input"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className="w-full sm:w-36"
            data-ocid="support-tickets.status-filter"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger
            className="w-full sm:w-40"
            data-ocid="support-tickets.category-filter"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="payment_stuck">Payment Stuck</SelectItem>
            <SelectItem value="behaviour_complaint">Behaviour</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger
            className="w-full sm:w-32"
            data-ocid="support-tickets.priority-filter"
          >
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={orderIdFilter}
          onChange={(e) => setOrderIdFilter(e.target.value)}
          className="w-full sm:w-36"
          placeholder="Filter by Order ID…"
          data-ocid="support-tickets.order-id-filter"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {["t1", "t2", "t3", "t4", "t5"].map((s) => (
              <Skeleton key={s} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center gap-3 py-16 text-center"
            data-ocid="support-tickets.empty_state"
          >
            <Ticket className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">
              No tickets match your filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Ticket ID</th>
                  <th className="text-left py-3 px-3 font-medium">From</th>
                  <th className="text-left py-3 px-3 font-medium">Category</th>
                  <th className="text-left py-3 px-3 font-medium hidden md:table-cell">
                    Description
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Order ID</th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium">Priority</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">
                    Created
                  </th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">
                    Deadline
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ticket, idx) => {
                  const overdueTkt = isOverdue(ticket);
                  return (
                    <tr
                      key={ticket.ticketId}
                      className={[
                        "border-b border-border/50 transition-colors",
                        overdueTkt
                          ? "bg-red-50/60 dark:bg-red-950/10 hover:bg-red-50 dark:hover:bg-red-950/20"
                          : "hover:bg-muted/20",
                      ].join(" ")}
                      data-ocid={`support-tickets.item.${idx + 1}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {overdueTkt && (
                            <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
                          )}
                          <span className="font-mono text-xs font-medium">
                            {ticket.ticketId}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div>
                          <p className="text-xs font-mono">
                            {ticket.fromPhone}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {ticket.fromRole}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <CategoryBadge category={ticket.category} />
                      </td>
                      <td className="py-3 px-3 hidden md:table-cell max-w-[220px]">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {ticket.description}
                        </p>
                      </td>
                      <td className="py-3 px-3">
                        {ticket.orderId ? (
                          <span className="font-mono text-xs text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                            {ticket.orderId}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <TicketStatusBadge status={ticket.status} />
                      </td>
                      <td className="py-3 px-3">
                        <PriorityBadge priority={ticket.priority} />
                      </td>
                      <td className="py-3 px-3 hidden lg:table-cell text-xs text-muted-foreground whitespace-nowrap">
                        {formatTs(ticket.createdAt)}
                      </td>
                      <td className="py-3 px-3 hidden lg:table-cell whitespace-nowrap">
                        <span
                          className={`text-xs ${overdueTkt ? "text-destructive font-medium" : "text-muted-foreground"}`}
                        >
                          {formatTs(ticket.resolutionDeadline)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs"
                          onClick={() => setSelectedTicket(ticket)}
                          data-ocid={`support-tickets.edit_button.${idx + 1}`}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
      <CreateTicketDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreated={() => {
          void refetch();
        }}
      />
    </div>
  );
}
