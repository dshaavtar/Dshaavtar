import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Bell,
  CheckSquare,
  ExternalLink,
  Eye,
  MessageSquare,
  RefreshCw,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useNotifications } from "../hooks/useBackend";
import type { Notification } from "../types";
import { NotificationStatus } from "../types";

const TYPE_LABELS: Record<string, string> = {
  order_status: "Order Update",
  order_pending: "Order Pending",
  job_lead: "Job Lead",
  property_lead: "Property Lead",
  otp: "OTP",
  subscription: "Subscription",
  lending_reminder: "Lending Reminder",
};

const TYPE_COLORS: Record<string, string> = {
  order_status: "bg-blue-100 text-blue-700 border-blue-200",
  order_pending: "bg-amber-100 text-amber-700 border-amber-200",
  job_lead: "bg-violet-100 text-violet-700 border-violet-200",
  property_lead: "bg-emerald-100 text-emerald-700 border-emerald-200",
  otp: "bg-orange-100 text-orange-700 border-orange-200",
  subscription: "bg-cyan-100 text-cyan-700 border-cyan-200",
  lending_reminder: "bg-amber-100 text-amber-700 border-amber-200",
};

const STATUS_BADGE: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  [NotificationStatus.sent]: { label: "Sent", variant: "default" },
  [NotificationStatus.pending]: { label: "Pending", variant: "secondary" },
  [NotificationStatus.failed]: { label: "Failed", variant: "destructive" },
};

// Phone numbers are shown in full — no masking
function maskPhone(phone: string) {
  return phone;
}

function StatTile({
  label,
  value,
  color,
  icon: Icon,
}: { label: string; value: number; color: string; icon: React.ElementType }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-card flex items-center gap-4">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xl font-bold text-foreground tabular-nums">
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

const ALL_TYPES = [
  "all",
  "order_status",
  "order_pending",
  "job_lead",
  "property_lead",
  "otp",
  "subscription",
  "lending_reminder",
];

export default function NotificationsPage() {
  const { data: allNotifications = [], isLoading } = useNotifications();
  const [statusFilter, setStatusFilter] = useState<NotificationStatus | "all">(
    "all",
  );
  const [typeFilter, setTypeFilter] = useState("all");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [viewMessage, setViewMessage] = useState<Notification | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const totalSent = allNotifications.filter(
    (n) => n.status === NotificationStatus.sent,
  ).length;
  const totalFailed = allNotifications.filter(
    (n) => n.status === NotificationStatus.failed,
  ).length;
  const totalPending = allNotifications.filter(
    (n) => n.status === NotificationStatus.pending,
  ).length;

  const filtered = allNotifications.filter((n) => {
    if (statusFilter !== "all" && n.status !== statusFilter) return false;
    if (typeFilter !== "all" && n.notificationType !== typeFilter) return false;
    if (phoneSearch && !n.recipientPhone.includes(phoneSearch)) return false;
    return true;
  });

  const failedIds = filtered
    .filter((n) => n.status === NotificationStatus.failed)
    .map((n) => n.id);
  const allSelected =
    filtered.length > 0 && filtered.every((n) => selectedIds.has(n.id));

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((n) => n.id)));
  }

  const STATUS_FILTERS: { label: string; value: NotificationStatus | "all" }[] =
    [
      { label: "All", value: "all" },
      { label: "Sent", value: NotificationStatus.sent },
      { label: "Pending", value: NotificationStatus.pending },
      { label: "Failed", value: NotificationStatus.failed },
    ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Notifications
            </h2>
            <p className="text-sm text-muted-foreground">
              WhatsApp message delivery tracking
            </p>
          </div>
        </div>
        {selectedIds.size > 0 && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedIds(new Set())}
              data-ocid="notifications-retry-failed"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Retry Failed (
              {failedIds.filter((id) => selectedIds.has(id)).length})
            </Button>
            <Button
              size="sm"
              variant="outline"
              data-ocid="notifications-mark-sent"
            >
              <CheckSquare className="w-3.5 h-3.5 mr-1.5" /> Mark Sent (
              {selectedIds.size})
            </Button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile
          label="Total"
          value={allNotifications.length}
          color="bg-primary/10 text-primary"
          icon={MessageSquare}
        />
        <StatTile
          label="Delivered"
          value={totalSent}
          color="bg-emerald-100 text-emerald-600"
          icon={CheckSquare}
        />
        <StatTile
          label="Failed"
          value={totalFailed}
          color="bg-red-100 text-red-600"
          icon={RefreshCw}
        />
        <StatTile
          label="Pending"
          value={totalPending}
          color="bg-amber-100 text-amber-600"
          icon={Bell}
        />
      </div>

      {/* Filter bar */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3">
        <div
          className="flex flex-wrap gap-1.5"
          data-ocid="notifications-status-filter"
        >
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors font-medium ${
                statusFilter === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            data-ocid="notifications-type-filter"
          >
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All Types" : (TYPE_LABELS[t] ?? t)}
              </option>
            ))}
          </select>
          <Input
            placeholder="Search phone..."
            value={phoneSearch}
            onChange={(e) => setPhoneSearch(e.target.value)}
            className="w-44 h-8 text-xs"
            data-ocid="notifications-phone-search"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="rounded"
                    aria-label="Select all"
                    data-ocid="notifications-select-all"
                  />
                </th>
                {[
                  "Recipient",
                  "User ID",
                  "Type",
                  "Message",
                  "Status",
                  "Created At",
                  "Sent At",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-8 text-center text-muted-foreground text-sm"
                  >
                    Loading notifications...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center">
                    <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">
                      No notifications found
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((n) => {
                  const badgeCfg = STATUS_BADGE[n.status] ?? {
                    label: n.status,
                    variant: "secondary" as const,
                  };
                  const typeCls =
                    TYPE_COLORS[n.notificationType] ??
                    "bg-muted text-muted-foreground border-border";
                  return (
                    <tr
                      key={n.id}
                      className={`border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors ${selectedIds.has(n.id) ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(n.id)}
                          onChange={() => toggleSelect(n.id)}
                          className="rounded"
                          aria-label={`Select notification ${n.id}`}
                          data-ocid={`notifications-select-${n.id}`}
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {maskPhone(n.recipientPhone)}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {n.userId}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${typeCls}`}
                        >
                          {TYPE_LABELS[n.notificationType] ??
                            n.notificationType}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <span className="text-xs text-muted-foreground line-clamp-2 block">
                          {n.message}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={badgeCfg.variant}
                          className="text-xs capitalize"
                        >
                          {badgeCfg.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(Number(n.createdAt)).toLocaleString("en-IN", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {n.sentAt
                          ? new Date(Number(n.sentAt)).toLocaleString("en-IN", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2"
                            onClick={() => setViewMessage(n)}
                            data-ocid={`notifications-view-${n.id}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          {n.status === NotificationStatus.failed && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-primary border-primary/30 hover:bg-primary/5"
                              data-ocid={`notifications-resend-${n.id}`}
                            >
                              <Send className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* WhatsApp delivery status */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-foreground">
              WhatsApp Delivery Status
            </p>
            <p className="text-xs text-muted-foreground">
              Read receipts and delivery confirmations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-muted/40 rounded-lg px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <p className="text-sm text-muted-foreground flex-1">
            Connect WhatsApp API to see delivery receipts and read confirmations
            in real-time.
          </p>
          <Button size="sm" variant="outline" asChild>
            <a
              href="#/whatsapp-config"
              className="flex items-center gap-1.5"
              data-ocid="notifications-wa-config-link"
            >
              WhatsApp Config <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[
            {
              label: "Delivered ✓✓",
              value: `${totalSent} messages`,
              color: "text-emerald-600",
            },
            {
              label: "Read ✓✓ (blue)",
              value: "API required",
              color: "text-blue-500",
            },
            {
              label: "Failed ✗",
              value: `${totalFailed} messages`,
              color: "text-destructive",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center bg-muted/30 rounded-lg py-2.5 px-3"
            >
              <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full message modal */}
      <Dialog
        open={!!viewMessage}
        onOpenChange={(open) => {
          if (!open) setViewMessage(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Full Message</DialogTitle>
          </DialogHeader>
          {viewMessage && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3 text-xs bg-muted/40 rounded-lg p-3">
                <div>
                  <span className="text-muted-foreground">Recipient</span>
                  <p className="font-mono font-medium mt-0.5">
                    {maskPhone(viewMessage.recipientPhone)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type</span>
                  <p className="font-medium mt-0.5">
                    {TYPE_LABELS[viewMessage.notificationType] ??
                      viewMessage.notificationType}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created</span>
                  <p className="font-medium mt-0.5">
                    {new Date(Number(viewMessage.createdAt)).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status</span>
                  <div className="mt-0.5">
                    <Badge
                      variant={
                        STATUS_BADGE[viewMessage.status]?.variant ?? "secondary"
                      }
                      className="text-xs capitalize"
                    >
                      {STATUS_BADGE[viewMessage.status]?.label ??
                        viewMessage.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Message Content
                </p>
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {viewMessage.message}
                </p>
              </div>
              <div className="flex gap-3">
                {viewMessage.status === NotificationStatus.failed && (
                  <Button className="flex-1" data-ocid="msg-modal-resend">
                    <Send className="w-4 h-4 mr-2" /> Resend
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setViewMessage(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
