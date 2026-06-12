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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { HandHeart, Package, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { DonationItem, DonationRequest } from "../backend.d";
import {
  useAddDonation,
  useDeleteDonation,
  useDeleteDonationRequest,
  useDonationRequests,
  useDonations,
  useRequestDonation,
  useUpdateDonationRequestStatus,
  useUpdateDonationStatus,
} from "../hooks/useBackend";

const CATEGORIES = ["All", "Food Items", "Clothes", "Books"];
const DONATION_STATUSES = ["All", "Available", "Claimed", "Removed"];
const REQUEST_STATUSES = ["All", "Pending", "Fulfilled", "Cancelled"];

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Available:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400",
    Pending:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400",
    Claimed:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400",
    Fulfilled:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400",
    Removed: "bg-muted text-muted-foreground border-border",
    Cancelled:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
        cls[status] ?? "bg-muted text-muted-foreground border-border"
      }`}
    >
      {status}
    </span>
  );
}

function AddDonationDialog({ onClose }: { onClose: () => void }) {
  const addDonation = useAddDonation();
  const [form, setForm] = useState({
    category: "",
    description: "",
    quantity: "",
    location: "",
    contactPhone: "",
    donorPhone: "",
    donorName: "",
  });

  async function handleSubmit() {
    if (
      !form.category ||
      !form.description ||
      !form.donorPhone ||
      !form.donorName
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await addDonation.mutateAsync(form);
      toast.success("Donation posted successfully");
      onClose();
    } catch {
      toast.error("Failed to post donation");
    }
  }

  return (
    <DialogContent className="sm:max-w-md" data-ocid="donations.add_dialog">
      <DialogHeader>
        <DialogTitle className="font-display flex items-center gap-2">
          <HandHeart className="w-4 h-4 text-emerald-500" /> Post a Donation
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Category *</Label>
            <Select
              value={form.category}
              onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
            >
              <SelectTrigger data-ocid="donations.add.category_select">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.slice(1).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Quantity</Label>
            <Input
              placeholder="e.g. 5 kg, 3 bags"
              value={form.quantity}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantity: e.target.value }))
              }
              data-ocid="donations.add.quantity_input"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Description *</Label>
          <Textarea
            placeholder="Describe the donation items..."
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            className="resize-none h-20"
            data-ocid="donations.add.description_textarea"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Location</Label>
          <Input
            placeholder="Pickup location"
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
            data-ocid="donations.add.location_input"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Donor Name *</Label>
            <Input
              placeholder="Your name"
              value={form.donorName}
              onChange={(e) =>
                setForm((f) => ({ ...f, donorName: e.target.value }))
              }
              data-ocid="donations.add.donor_name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Donor Phone *</Label>
            <Input
              placeholder="+91XXXXXXXXXX"
              value={form.donorPhone}
              onChange={(e) =>
                setForm((f) => ({ ...f, donorPhone: e.target.value }))
              }
              data-ocid="donations.add.donor_phone_input"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Contact Phone (for pickup)</Label>
          <Input
            placeholder="+91XXXXXXXXXX"
            value={form.contactPhone}
            onChange={(e) =>
              setForm((f) => ({ ...f, contactPhone: e.target.value }))
            }
            data-ocid="donations.add.contact_phone_input"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="donations.add.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={addDonation.isPending}
            data-ocid="donations.add.submit_button"
          >
            {addDonation.isPending ? "Posting…" : "Post Donation"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

function AddRequestDialog({ onClose }: { onClose: () => void }) {
  const requestDonation = useRequestDonation();
  const [form, setForm] = useState({
    category: "",
    description: "",
    quantityNeeded: "",
    location: "",
    requesterPhone: "",
    requesterName: "",
  });

  async function handleSubmit() {
    if (
      !form.category ||
      !form.description ||
      !form.requesterPhone ||
      !form.requesterName
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await requestDonation.mutateAsync(form);
      toast.success("Donation request posted");
      onClose();
    } catch {
      toast.error("Failed to post request");
    }
  }

  return (
    <DialogContent className="sm:max-w-md" data-ocid="donations.request_dialog">
      <DialogHeader>
        <DialogTitle className="font-display flex items-center gap-2">
          <HandHeart className="w-4 h-4 text-blue-500" /> Request a Donation
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Category *</Label>
            <Select
              value={form.category}
              onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
            >
              <SelectTrigger data-ocid="donations.request.category_select">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.slice(1).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Quantity Needed</Label>
            <Input
              placeholder="e.g. 2 bags"
              value={form.quantityNeeded}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantityNeeded: e.target.value }))
              }
              data-ocid="donations.request.quantity_input"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Description *</Label>
          <Textarea
            placeholder="What do you need?"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            className="resize-none h-20"
            data-ocid="donations.request.description_textarea"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Location</Label>
          <Input
            placeholder="Your area / city"
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
            data-ocid="donations.request.location_input"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Your Name *</Label>
            <Input
              placeholder="Name"
              value={form.requesterName}
              onChange={(e) =>
                setForm((f) => ({ ...f, requesterName: e.target.value }))
              }
              data-ocid="donations.request.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Your Phone *</Label>
            <Input
              placeholder="+91XXXXXXXXXX"
              value={form.requesterPhone}
              onChange={(e) =>
                setForm((f) => ({ ...f, requesterPhone: e.target.value }))
              }
              data-ocid="donations.request.phone_input"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="donations.request.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={requestDonation.isPending}
            data-ocid="donations.request.submit_button"
          >
            {requestDonation.isPending ? "Posting…" : "Post Request"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

// ─── Donations Posted Tab ─────────────────────────────────────────────────────

function DonationsTab() {
  const [catFilter, setCatFilter] = useState("All");
  const [locFilter, setLocFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const updateStatus = useUpdateDonationStatus();
  const deleteDonation = useDeleteDonation();

  const queryFilters = {
    category: catFilter !== "All" ? catFilter : undefined,
    location: locFilter || undefined,
  };
  const { data: donations = [], isLoading } = useDonations(queryFilters);

  const filtered = donations.filter(
    (d) => statusFilter === "All" || d.status === statusFilter,
  );

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteDonation.mutateAsync(id);
      toast.success("Donation removed");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1.5">
            <Label className="text-xs">Category</Label>
            <Select value={catFilter} onValueChange={setCatFilter}>
              <SelectTrigger
                className="w-32 h-8 text-sm"
                data-ocid="donations.cat_filter.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Location</Label>
            <Input
              placeholder="Filter location"
              value={locFilter}
              onChange={(e) => setLocFilter(e.target.value)}
              className="h-8 text-sm w-36"
              data-ocid="donations.loc_filter"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="w-32 h-8 text-sm"
                data-ocid="donations.status_filter.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DONATION_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(catFilter !== "All" || locFilter || statusFilter !== "All") && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-muted-foreground self-end"
              onClick={() => {
                setCatFilter("All");
                setLocFilter("");
                setStatusFilter("All");
              }}
              data-ocid="donations.clear_filters_button"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </Button>
          )}
          <Button
            size="sm"
            className="ml-auto gap-1.5 h-8 self-end"
            onClick={() => setShowAdd(true)}
            data-ocid="donations.add_button"
          >
            <Plus className="w-3.5 h-3.5" /> Add Donation
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {filtered.length} of {donations.length} donations
        </p>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {["d1", "d2", "d3"].map((k) => (
              <Skeleton key={k} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center gap-3 py-16 text-center"
            data-ocid="donations.empty_state"
          >
            <Package className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">
              No donations posted yet
            </p>
            <Button
              size="sm"
              onClick={() => setShowAdd(true)}
              data-ocid="donations.empty_add_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Post First Donation
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="donations.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Description
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Quantity</th>
                  <th className="text-left py-3 px-3 font-medium">Location</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Donor Phone
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium">Posted</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item: DonationItem, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`donations.item.${idx + 1}`}
                  >
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs font-normal">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-muted-foreground line-clamp-2 max-w-[180px] block">
                        {item.description}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-sm">{item.quantity || "—"}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-muted-foreground">
                        {item.location || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-mono text-muted-foreground">
                        {item.donorPhone}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <Select
                        value={item.status}
                        onValueChange={(v) => handleStatusChange(item.id, v)}
                      >
                        <SelectTrigger
                          className="h-7 w-30 border-0 p-0 focus:ring-0"
                          data-ocid={`donations.status_select.${idx + 1}`}
                        >
                          <StatusBadge status={item.status} />
                        </SelectTrigger>
                        <SelectContent>
                          {DONATION_STATUSES.slice(1).map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="text-xs text-muted-foreground">
                        {new Date(Number(item.createdAt)).toLocaleDateString(
                          "en-IN",
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleteId(item.id)}
                        data-ocid={`donations.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <AddDonationDialog onClose={() => setShowAdd(false)} />
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="donations.confirm_dialog"
        >
          <DialogHeader>
            <DialogTitle>Remove Donation?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently remove the donation posting.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteId(null)}
              data-ocid="donations.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={deleteDonation.isPending}
              data-ocid="donations.confirm_button"
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Donation Requests Tab ────────────────────────────────────────────────────

function RequestsTab() {
  const [catFilter, setCatFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const updateStatus = useUpdateDonationRequestStatus();
  const deleteRequest = useDeleteDonationRequest();

  const { data: requests = [], isLoading } = useDonationRequests();

  const filtered = requests.filter((r) => {
    if (catFilter !== "All" && r.category !== catFilter) return false;
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    return true;
  });

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteRequest.mutateAsync(id);
      toast.success("Request removed");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1.5">
            <Label className="text-xs">Category</Label>
            <Select value={catFilter} onValueChange={setCatFilter}>
              <SelectTrigger
                className="w-32 h-8 text-sm"
                data-ocid="requests.cat_filter.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="w-32 h-8 text-sm"
                data-ocid="requests.status_filter.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REQUEST_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(catFilter !== "All" || statusFilter !== "All") && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-muted-foreground self-end"
              onClick={() => {
                setCatFilter("All");
                setStatusFilter("All");
              }}
              data-ocid="requests.clear_filters_button"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </Button>
          )}
          <Button
            size="sm"
            className="ml-auto gap-1.5 h-8 self-end"
            onClick={() => setShowAdd(true)}
            data-ocid="requests.add_button"
          >
            <Plus className="w-3.5 h-3.5" /> Add Request
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {filtered.length} of {requests.length} requests
        </p>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {["r1", "r2", "r3"].map((k) => (
              <Skeleton key={k} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center gap-3 py-16 text-center"
            data-ocid="requests.empty_state"
          >
            <HandHeart className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">
              No donation requests found
            </p>
            <Button
              size="sm"
              onClick={() => setShowAdd(true)}
              data-ocid="requests.empty_add_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add First Request
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="requests.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Description
                  </th>
                  <th className="text-left py-3 px-3 font-medium">
                    Qty Needed
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Location</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Requester Phone
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium">Posted</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item: DonationRequest, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`requests.item.${idx + 1}`}
                  >
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs font-normal">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-muted-foreground line-clamp-2 max-w-[180px] block">
                        {item.description}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-sm">
                        {item.quantityNeeded || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-muted-foreground">
                        {item.location || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-mono text-muted-foreground">
                        {item.requesterPhone}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <Select
                        value={item.status}
                        onValueChange={(v) => handleStatusChange(item.id, v)}
                      >
                        <SelectTrigger
                          className="h-7 w-30 border-0 p-0 focus:ring-0"
                          data-ocid={`requests.status_select.${idx + 1}`}
                        >
                          <StatusBadge status={item.status} />
                        </SelectTrigger>
                        <SelectContent>
                          {REQUEST_STATUSES.slice(1).map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="text-xs text-muted-foreground">
                        {new Date(Number(item.createdAt)).toLocaleDateString(
                          "en-IN",
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          onClick={() =>
                            handleStatusChange(item.id, "Fulfilled")
                          }
                          disabled={item.status === "Fulfilled"}
                          data-ocid={`requests.fulfill_button.${idx + 1}`}
                        >
                          Mark Fulfilled
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteId(item.id)}
                          data-ocid={`requests.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <AddRequestDialog onClose={() => setShowAdd(false)} />
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="requests.confirm_dialog"
        >
          <DialogHeader>
            <DialogTitle>Remove Request?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently remove this donation request.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteId(null)}
              data-ocid="requests.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={deleteRequest.isPending}
              data-ocid="requests.confirm_button"
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DonationsPage() {
  const { data: donations = [] } = useDonations();
  const { data: requests = [] } = useDonationRequests();

  const available = (donations as DonationItem[]).filter(
    (d) => d.status === "Available",
  ).length;
  const pending = (requests as DonationRequest[]).filter(
    (r) => r.status === "Pending",
  ).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <HandHeart className="w-5 h-5 text-emerald-500" />
          Donations
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage food items, clothes, and books donated by the community
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">
            {donations.length}
          </div>
          <div className="text-xs text-muted-foreground">Total Donations</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold font-display text-foreground">
            {available}
          </div>
          <div className="text-xs text-muted-foreground">Available</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold font-display text-blue-600 dark:text-blue-400">
            {requests.length}
          </div>
          <div className="text-xs text-muted-foreground">Total Requests</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold font-display text-amber-600 dark:text-amber-400">
            {pending}
          </div>
          <div className="text-xs text-muted-foreground">Pending Requests</div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="donations" data-ocid="donations.tabs">
        <TabsList>
          <TabsTrigger value="donations" data-ocid="donations.tab.posted">
            Donations Posted
            {available > 0 && (
              <span className="ml-1.5 text-[10px] rounded-full px-1.5 py-0.5 font-medium bg-emerald-500/20 text-emerald-600">
                {available}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="requests" data-ocid="donations.tab.requests">
            Donation Requests
            {pending > 0 && (
              <span className="ml-1.5 text-[10px] rounded-full px-1.5 py-0.5 font-medium bg-amber-500/20 text-amber-600">
                {pending}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="donations" className="mt-4">
          <DonationsTab />
        </TabsContent>
        <TabsContent value="requests" className="mt-4">
          <RequestsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
