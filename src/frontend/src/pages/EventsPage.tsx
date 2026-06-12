import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle2,
  Download,
  Eye,
  MapPin,
  Plus,
  Search,
  TicketIcon,
  Trash2,
  TrendingUp,
  Users,
  Wand2,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { EventStatus as BackendEventStatus } from "../backend";
import {
  useCreateEvent,
  useDeleteEvent,
  useEntityLeads,
  useEvents,
  useMyEventListings,
  useUpdateEventStatus,
} from "../hooks/useBackend";
import type { AppEvent, EventStatus } from "../types";

const STATUS_META: Record<EventStatus, { label: string; cls: string }> = {
  published: {
    label: "Published",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  pending: {
    label: "Pending",
    cls: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  },
  expired: {
    label: "Expired",
    cls: "bg-muted text-muted-foreground border-border",
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
  },
};

function StatCard({
  label,
  value,
  color,
}: { label: string; value: number; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1 shadow-sm">
      <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function EventLeadsPanel({
  eventId,
  onClose,
}: { eventId: string; onClose: () => void }) {
  const { data: leads, isLoading } = useEntityLeads("event", eventId);
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="events.leads_dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Event Leads
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-2 py-4">
            {["l1", "l2", "l3"].map((s) => (
              <Skeleton key={s} className="h-10 w-full" />
            ))}
          </div>
        ) : !leads ? (
          <p
            className="text-sm text-muted-foreground py-8 text-center"
            data-ocid="events.leads.empty_state"
          >
            No leads data
          </p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/30 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  Total Views
                </p>
                <p className="text-2xl font-bold font-display text-primary">
                  {leads.views}
                </p>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Interested</p>
                <p className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">
                  {leads.interested}
                </p>
              </div>
            </div>
            {leads.viewers.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Viewers
                </p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {leads.viewers.map((v, i) => (
                    <div
                      key={`${v.phone}-${i}`}
                      className="flex items-center justify-between p-2 bg-muted/20 rounded-lg"
                    >
                      <span className="text-sm font-mono">{v.phone}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(v.timestamp).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {leads.interestedList.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Users className="w-3 h-3" /> Interested
                </p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {leads.interestedList.map((v, i) => (
                    <div
                      key={`${v.phone}-${i}`}
                      className="flex items-center justify-between p-2 bg-muted/20 rounded-lg"
                    >
                      <span className="text-sm font-mono">{v.phone}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(v.timestamp).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={onClose}
              data-ocid="events.leads_close_button"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Create Event Dialog ──────────────────────────────────────────────────────
const AI_DESCRIPTIONS = [
  "Join us for an unforgettable experience filled with entertainment, activities, and surprises. Open to all ages!",
  "A premier gathering bringing together community members for networking, learning, and celebration.",
  "Don't miss this one-of-a-kind event with live performances, food stalls, and exciting activities for the whole family.",
];

function CreateEventDialog({ onClose }: { onClose: () => void }) {
  const createEvent = useCreateEvent();
  const [form, setForm] = useState({
    eventName: "",
    description: "",
    isPaid: false,
    price: "",
    locationAddress: "",
    startDate: "",
    endDate: "",
    ticketVenue: "",
    organizerName: "Admin",
    organizerPhone: "+910000000000",
  });

  function generateDescription() {
    const desc =
      AI_DESCRIPTIONS[Math.floor(Math.random() * AI_DESCRIPTIONS.length)];
    setForm((f) => ({ ...f, description: desc }));
  }

  async function handleSubmit() {
    if (
      !form.eventName ||
      !form.locationAddress ||
      !form.startDate ||
      !form.endDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await createEvent.mutateAsync({
        organizerPhone: form.organizerPhone,
        organizerName: form.organizerName,
        eventName: form.eventName,
        description: form.description,
        isPaid: form.isPaid,
        price: form.isPaid ? Number.parseFloat(form.price) || 0 : 0,
        locationAddress: form.locationAddress,
        startDate: form.startDate,
        endDate: form.endDate,
        ticketVenue: form.ticketVenue,
      });
      toast.success("Event created successfully");
      onClose();
    } catch {
      toast.error("Failed to create event");
    }
  }

  return (
    <DialogContent
      className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
      data-ocid="events.create_dialog"
    >
      <DialogHeader>
        <DialogTitle className="font-display">Post New Event</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 pt-1">
        <div className="space-y-1.5">
          <Label>Event Name *</Label>
          <Input
            placeholder="e.g. Diwali Mela 2026"
            value={form.eventName}
            onChange={(e) =>
              setForm((f) => ({ ...f, eventName: e.target.value }))
            }
            data-ocid="events.create.name_input"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label>Description</Label>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 gap-1.5 text-xs text-primary"
              onClick={generateDescription}
              data-ocid="events.create.generate_desc_button"
            >
              <Wand2 className="w-3.5 h-3.5" /> Generate (AI)
            </Button>
          </div>
          <Textarea
            placeholder="Describe the event..."
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            data-ocid="events.create.desc_textarea"
          />
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
          <Switch
            id="isPaid"
            checked={form.isPaid}
            onCheckedChange={(v) => setForm((f) => ({ ...f, isPaid: v }))}
            data-ocid="events.create.paid_switch"
          />
          <Label htmlFor="isPaid" className="cursor-pointer">
            Paid Event
          </Label>
        </div>

        {form.isPaid && (
          <div className="space-y-1.5">
            <Label>Ticket Price (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 500"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: e.target.value }))
              }
              data-ocid="events.create.price_input"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <Label>Location Address *</Label>
          <Input
            placeholder="Full address or venue name"
            value={form.locationAddress}
            onChange={(e) =>
              setForm((f) => ({ ...f, locationAddress: e.target.value }))
            }
            data-ocid="events.create.location_input"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Start Date *</Label>
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, startDate: e.target.value }))
              }
              data-ocid="events.create.start_date"
            />
          </div>
          <div className="space-y-1.5">
            <Label>End Date *</Label>
            <Input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, endDate: e.target.value }))
              }
              data-ocid="events.create.end_date"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Ticket/Venue Details</Label>
          <Input
            placeholder="e.g. City Hall, Gate 2 — tickets at the door"
            value={form.ticketVenue}
            onChange={(e) =>
              setForm((f) => ({ ...f, ticketVenue: e.target.value }))
            }
            data-ocid="events.create.venue_input"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Organizer Name</Label>
            <Input
              value={form.organizerName}
              onChange={(e) =>
                setForm((f) => ({ ...f, organizerName: e.target.value }))
              }
              data-ocid="events.create.organizer_name"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Organizer Phone</Label>
            <Input
              value={form.organizerPhone}
              onChange={(e) =>
                setForm((f) => ({ ...f, organizerPhone: e.target.value }))
              }
              data-ocid="events.create.organizer_phone"
            />
          </div>
        </div>

        <div className="bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground">
          📅 Event will be published for <strong>1 month</strong> from today.
          Paid subscription required to post.
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="events.create.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={createEvent.isPending}
            data-ocid="events.create.submit_button"
          >
            {createEvent.isPending ? "Creating…" : "Post Event"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

// ─── My Events Tab ────────────────────────────────────────────────────────────

function MyEventsTab() {
  const [phone, setPhone] = useState("");
  const [queryPhone, setQueryPhone] = useState("");
  const {
    data: myEvents = [],
    isLoading,
    error,
  } = useMyEventListings(queryPhone);

  return (
    <div className="space-y-4" data-ocid="my-events.section">
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-sm font-medium text-foreground mb-3">
          Enter your phone number to view your posted events
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="max-w-xs"
            data-ocid="my-events.phone_input"
          />
          <Button
            onClick={() => setQueryPhone(phone.trim())}
            disabled={!phone.trim()}
            data-ocid="my-events.search_button"
          >
            View My Events
          </Button>
        </div>
      </div>

      {!queryPhone && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="my-events.empty_state"
        >
          <Calendar className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            Enter your phone number above to view your posted events
          </p>
        </div>
      )}

      {queryPhone && isLoading && (
        <div className="space-y-3">
          {["s1", "s2", "s3"].map((s) => (
            <Skeleton key={s} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      )}

      {queryPhone && !isLoading && (error || myEvents.length === 0) && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="my-events.no_results"
        >
          <Calendar className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            {error
              ? "Failed to load listings"
              : "No listings yet. Post your first one!"}
          </p>
          {error && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQueryPhone("")}
              data-ocid="my-events.retry_button"
            >
              Retry
            </Button>
          )}
        </div>
      )}

      {queryPhone && !isLoading && myEvents.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              {myEvents.length} event{myEvents.length !== 1 ? "s" : ""} posted
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="my-events.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Event</th>
                  <th className="text-left py-3 px-3 font-medium">Type</th>
                  <th className="text-left py-3 px-3 font-medium">Dates</th>
                  <th className="text-left py-3 px-3 font-medium">Location</th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {myEvents.map((event, i) => {
                  const meta = STATUS_META[event.status];
                  return (
                    <tr
                      key={event.id}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      data-ocid={`my-events.item.${i + 1}`}
                    >
                      <td className="py-3 px-4 font-medium text-foreground max-w-[180px] truncate">
                        {event.name}
                      </td>
                      <td className="py-3 px-3 text-xs">
                        {event.isPaid ? (
                          <span className="text-primary font-semibold">
                            ₹{event.price?.toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            Free
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                        {event.startDate} → {event.endDate}
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground max-w-[120px] truncate">
                        {event.location}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${meta.cls}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(event.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  const { data: events = [], isLoading, isError, refetch } = useEvents();
  const updateEventStatus = useUpdateEventStatus();
  const deleteEvent = useDeleteEvent();

  const [statusFilter, setStatusFilter] = useState<EventStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "paid" | "free">("all");
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [leadsEventId, setLeadsEventId] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filtered = events.filter((e) => {
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    if (typeFilter === "paid" && !e.isPaid) return false;
    if (typeFilter === "free" && e.isPaid) return false;
    if (
      search &&
      !e.name.toLowerCase().includes(search.toLowerCase()) &&
      !e.organizerName.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const total = events.length;
  const published = events.filter((e) => e.status === "published").length;
  const pending = events.filter((e) => e.status === "pending").length;
  const paid = events.filter((e) => e.isPaid).length;

  async function handlePublish(id: string) {
    try {
      await updateEventStatus.mutateAsync({
        id,
        status: "published" as unknown as BackendEventStatus,
      });
      toast.success("Event published");
    } catch {
      toast.error("Failed to publish event");
    }
  }

  async function handleRejectConfirm() {
    if (!rejectId) return;
    try {
      await updateEventStatus.mutateAsync({
        id: rejectId,
        status: "cancelled" as unknown as BackendEventStatus,
      });
      setRejectId(null);
      setRejectReason("");
      toast.success("Event rejected");
    } catch {
      toast.error("Failed to reject event");
    }
  }

  async function handleStatusChange(id: string, status: EventStatus) {
    try {
      await updateEventStatus.mutateAsync({
        id,
        status: status as unknown as BackendEventStatus,
      });
      toast.success("Event status updated");
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteEvent.mutateAsync(id);
      setSelectedEvent(null);
      setDeleteId(null);
      toast.success("Event deleted");
    } catch {
      toast.error("Failed to delete event");
    }
  }

  function handleExport() {
    const rows = events.map((e) =>
      [
        e.id,
        e.name,
        e.organizerName,
        e.organizerPhone,
        e.location,
        e.startDate,
        e.endDate,
        e.isPaid ? "Paid" : "Free",
        e.price ?? 0,
        e.ticketVenue,
        e.status,
        e.publishedUntil,
        new Date(e.createdAt).toLocaleDateString("en-IN"),
      ].join(","),
    );
    const csv = [
      "ID,Event Name,Organizer,Phone,Location,Start Date,End Date,Type,Price,Ticket Venue,Status,Published Until,Created At",
      ...rows,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasFilters = statusFilter !== "all" || typeFilter !== "all" || search;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Events
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage community events, approvals, and ticket listings
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            data-ocid="events.export_button"
          >
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button
            className="gap-2"
            onClick={() => setShowCreateDialog(true)}
            data-ocid="events.create_button"
          >
            <Plus className="w-4 h-4" /> Post Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total Events" value={total} color="text-foreground" />
        <StatCard
          label="Published"
          value={published}
          color="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          label="Pending Approval"
          value={pending}
          color="text-amber-600 dark:text-amber-400"
        />
        <StatCard label="Paid Events" value={paid} color="text-primary" />
      </div>

      {/* Filters */}
      <Tabs defaultValue="all" data-ocid="events.tabs">
        <TabsList className="mb-4">
          <TabsTrigger value="all" data-ocid="events.tab.all">
            All Events
          </TabsTrigger>
          <TabsTrigger value="my" data-ocid="events.tab.my">
            My Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap gap-3">
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v as EventStatus | "all")}
              >
                <SelectTrigger
                  className="w-36 h-8 text-sm"
                  data-ocid="events.status_filter.select"
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={typeFilter}
                onValueChange={(v) =>
                  setTypeFilter(v as "all" | "paid" | "free")
                }
              >
                <SelectTrigger
                  className="w-28 h-8 text-sm"
                  data-ocid="events.type_filter.select"
                >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search event or organizer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-sm w-56"
                  data-ocid="events.search_input"
                />
              </div>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-muted-foreground"
                  onClick={() => {
                    setStatusFilter("all");
                    setTypeFilter("all");
                    setSearch("");
                  }}
                  data-ocid="events.clear_filters_button"
                >
                  <X className="w-3.5 h-3.5" /> Clear
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {events.length} events
            </p>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {["e1", "e2", "e3", "e4", "e5"].map((s) => (
                  <Skeleton key={s} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <div
                className="flex flex-col items-center gap-3 py-16 text-center"
                data-ocid="events.error_state"
              >
                <Calendar className="w-10 h-10 text-muted-foreground/40" />
                <p className="text-muted-foreground text-sm font-medium">
                  Unable to load events. Please try again.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void refetch()}
                  data-ocid="events.retry_button"
                >
                  Retry
                </Button>
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="flex flex-col items-center gap-3 py-16 text-center"
                data-ocid="events.empty_state"
              >
                <Calendar className="w-10 h-10 text-muted-foreground/40" />
                <p className="text-muted-foreground text-sm">No events found</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateDialog(true)}
                  data-ocid="events.empty_create_button"
                >
                  Post an Event
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-ocid="events.table">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr className="text-muted-foreground text-xs">
                      <th className="text-left py-3 px-4 font-medium">
                        Event Name
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Organizer
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Location
                      </th>
                      <th className="text-left py-3 px-3 font-medium">Dates</th>
                      <th className="text-left py-3 px-3 font-medium">Type</th>
                      <th className="text-left py-3 px-3 font-medium">
                        Ticket/Venue
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Published Until
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Created
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((event, idx) => {
                      const meta = STATUS_META[event.status];
                      return (
                        <tr
                          key={event.id}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          data-ocid={`events.item.${idx + 1}`}
                        >
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              className="font-medium text-foreground hover:text-primary transition-colors max-w-[180px] truncate block text-left"
                              onClick={() => setSelectedEvent(event)}
                              data-ocid={`events.view_button.${idx + 1}`}
                            >
                              {event.name}
                            </button>
                          </td>
                          <td className="py-3 px-3">
                            <div className="text-xs">
                              <p className="font-medium text-foreground">
                                {event.organizerName}
                              </p>
                              <p className="text-muted-foreground font-mono">
                                {event.organizerPhone}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[120px]">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <p className="text-xs">{event.startDate}</p>
                            <p className="text-xs text-muted-foreground">
                              → {event.endDate}
                            </p>
                          </td>
                          <td className="py-3 px-3">
                            {event.isPaid ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                                💰 ₹{event.price?.toLocaleString("en-IN")}
                              </span>
                            ) : (
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                Free
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <TicketIcon className="w-3 h-3 shrink-0" />
                              <span className="truncate max-w-[80px]">
                                {event.ticketVenue}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <Select
                              value={event.status}
                              onValueChange={(v) =>
                                handleStatusChange(event.id, v as EventStatus)
                              }
                            >
                              <SelectTrigger
                                className="h-7 w-32 border-0 p-0 focus:ring-0"
                                data-ocid={`events.status_select.${idx + 1}`}
                              >
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${meta.cls}`}
                                >
                                  {meta.label}
                                </span>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="published">
                                  Published
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-xs text-muted-foreground">
                            {event.publishedUntil}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-xs text-muted-foreground">
                            {new Date(event.createdAt).toLocaleDateString(
                              "en-IN",
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {event.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 px-2 text-xs gap-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                                    onClick={() => handlePublish(event.id)}
                                    disabled={updateEventStatus.isPending}
                                    data-ocid={`events.publish_button.${idx + 1}`}
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                                    Publish
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10"
                                    onClick={() => setRejectId(event.id)}
                                    data-ocid={`events.reject_button.${idx + 1}`}
                                  >
                                    <XCircle className="w-3.5 h-3.5" /> Reject
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs gap-1 text-blue-600 hover:bg-blue-50"
                                onClick={() => setLeadsEventId(event.id)}
                                data-ocid={`events.leads_button.${idx + 1}`}
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                                onClick={() => setDeleteId(event.id)}
                                data-ocid={`events.delete_button.${idx + 1}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="my">
          <MyEventsTab />
        </TabsContent>
      </Tabs>

      {/* Create Event Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <CreateEventDialog onClose={() => setShowCreateDialog(false)} />
      </Dialog>

      {/* Event Detail Modal */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent
          className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="events.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {selectedEvent?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-3 pt-1">
              <div className="flex gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_META[selectedEvent.status].cls}`}
                >
                  {STATUS_META[selectedEvent.status].label}
                </span>
                <Badge variant="outline" className="text-xs">
                  {selectedEvent.isPaid
                    ? `Paid – ₹${selectedEvent.price?.toLocaleString("en-IN")}`
                    : "Free"}
                </Badge>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Description
                </p>
                <p className="text-sm leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Organizer
                  </p>
                  <p className="text-sm font-medium">
                    {selectedEvent.organizerName}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedEvent.organizerPhone}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Location
                  </p>
                  <p className="text-sm">{selectedEvent.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Event Dates
                  </p>
                  <p className="text-sm">
                    {selectedEvent.startDate} → {selectedEvent.endDate}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Ticket/Venue
                  </p>
                  <p className="text-sm">{selectedEvent.ticketVenue}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Published Until
                  </p>
                  <p className="text-sm">{selectedEvent.publishedUntil}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Created At
                  </p>
                  <p className="text-sm">
                    {new Date(selectedEvent.createdAt).toLocaleDateString(
                      "en-IN",
                    )}
                  </p>
                </div>
              </div>
              {selectedEvent.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      handlePublish(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                    data-ocid="events.modal_publish_button"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Publish Event
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setRejectId(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                    data-ocid="events.modal_reject_button"
                  >
                    <XCircle className="w-4 h-4 mr-1.5" /> Reject
                  </Button>
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setLeadsEventId(selectedEvent.id);
                    setSelectedEvent(null);
                  }}
                  data-ocid="events.modal_leads_button"
                >
                  <Eye className="w-4 h-4 mr-1.5" /> View Leads
                </Button>
                <Button
                  variant="destructive"
                  className="gap-1.5"
                  onClick={() => handleDelete(selectedEvent.id)}
                  data-ocid="events.confirm_delete_button"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject dialog */}
      <Dialog
        open={!!rejectId}
        onOpenChange={() => {
          setRejectId(null);
          setRejectReason("");
        }}
      >
        <DialogContent className="sm:max-w-md" data-ocid="events.reject_dialog">
          <DialogHeader>
            <DialogTitle>Reject Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Provide a reason for rejection. The organizer will be notified.
            </p>
            <div className="space-y-1.5">
              <Label>Rejection Reason</Label>
              <Textarea
                placeholder="e.g. Incomplete information, inappropriate content..."
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                data-ocid="events.reject_reason_textarea"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setRejectId(null);
                  setRejectReason("");
                }}
                data-ocid="events.reject_cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleRejectConfirm}
                disabled={updateEventStatus.isPending}
                data-ocid="events.reject_confirm_button"
              >
                {updateEventStatus.isPending ? "Rejecting…" : "Reject Event"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="events.confirm_dialog"
        >
          <DialogHeader>
            <DialogTitle>Delete Event?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteId(null)}
              data-ocid="events.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                if (deleteId) handleDelete(deleteId);
              }}
              data-ocid="events.delete_confirm_button"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leads panel */}
      {leadsEventId && (
        <EventLeadsPanel
          eventId={leadsEventId}
          onClose={() => setLeadsEventId(null)}
        />
      )}
    </div>
  );
}
