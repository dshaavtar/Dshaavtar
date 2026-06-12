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
import {
  Crown,
  Download,
  Heart,
  Link2Off,
  Search,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { FamilyInviteStatus as BackendFamilyInviteStatus } from "../backend";
import type { FamilyMember as BackendFamilyMember } from "../backend.d";
import {
  useAddFriend,
  useDeleteFamilyLink,
  useDeleteFamilyMember,
  useFamilyMembers,
  useUpdateFamilyInviteStatus,
  useUpdateMatrimonyEligibility,
} from "../hooks/useBackend";
import type { FamilyMember, InviteStatus } from "../types";
// Helper: safely convert ICP nanosecond bigint (or number) timestamp to Date
const toDate = (ts: bigint | number | undefined): Date =>
  ts === undefined
    ? new Date(0)
    : new Date(typeof ts === "bigint" ? Number(ts) / 1_000_000 : ts);

// Extend local FamilyMember type with matrimony fields from backend
type FamilyMemberWithMatrimony = FamilyMember &
  Pick<
    BackendFamilyMember,
    | "isMatrimonyEligible"
    | "caste"
    | "occupation"
    | "education"
    | "locationPreference"
    | "bloodGroup"
    | "age"
  > & { gender?: string };

const INVITE_META: Record<InviteStatus, { label: string; cls: string }> = {
  pending: {
    label: "Pending",
    cls: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  },
  connected: {
    label: "Connected",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
  },
};

const RELATIONSHIP_LABELS: Record<string, string> = {
  father: "👨 Father",
  mother: "👩 Mother",
  son: "👦 Son",
  daughter: "👧 Daughter",
  husband: "💑 Husband",
  wife: "💑 Wife",
  friend: "🤝 Friend",
  brother: "👦 Brother",
  sister: "👧 Sister",
  relative: "👨‍👩‍👧‍👦 Relative",
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

// ─── Family Groups View (grouped by surname) ──────────────────────────────────
function FamilyGroupsView({ members }: { members: FamilyMember[] }) {
  const deleteLink = useDeleteFamilyLink();

  // Group by surname
  const groups = useMemo(() => {
    const map: Record<string, FamilyMember[]> = {};
    for (const m of members) {
      const surname =
        m.ownerSurname || m.ownerName.split(" ").pop() || "Unknown";
      if (!map[surname]) map[surname] = [];
      map[surname].push(m);
    }
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [members]);

  if (groups.length === 0) {
    return (
      <div
        className="py-16 text-center text-muted-foreground text-sm"
        data-ocid="family.groups_empty"
      >
        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
        No family groups found
      </div>
    );
  }

  async function handleDeleteLink(id: string) {
    try {
      await deleteLink.mutateAsync(id);
      toast.success("Family link removed");
    } catch {
      toast.error("Failed to remove link");
    }
  }

  return (
    <div className="space-y-4">
      {groups.map(([surname, groupMembers]) => (
        <div
          key={surname}
          className="bg-card border border-border rounded-xl overflow-hidden"
          data-ocid={`family.group.${surname.toLowerCase()}`}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">{surname} Family</span>
              <Badge variant="outline" className="text-xs">
                {groupMembers.length} member
                {groupMembers.length !== 1 ? "s" : ""}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              Owner: {groupMembers[0]?.ownerName}
            </span>
          </div>
          <div className="divide-y divide-border/50">
            {groupMembers.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    {m.relationName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {m.relationName}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {m.relationPhone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {RELATIONSHIP_LABELS[m.relationship] ?? m.relationship}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${INVITE_META[m.inviteStatus].cls}`}
                  >
                    {INVITE_META[m.inviteStatus].label}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteLink(m.id)}
                    disabled={deleteLink.isPending}
                    title="Delete Link"
                    data-ocid={`family.delete_link.${m.id}`}
                  >
                    <Link2Off className="w-3.5 h-3.5" />
                    Delete Link
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Add Friend Dialog ────────────────────────────────────────────────────────
function AddFriendDialog({ onClose }: { onClose: () => void }) {
  const addFriend = useAddFriend();
  const [form, setForm] = useState({
    ownerPhone: "",
    ownerName: "",
    ownerSurname: "",
    friendName: "",
    friendPhone: "",
    friendAddress: "",
  });

  async function handleSubmit() {
    if (
      !form.ownerPhone ||
      !form.ownerName ||
      !form.friendName ||
      !form.friendPhone
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await addFriend.mutateAsync(form);
      toast.success("Friend added successfully — invite sent");
      onClose();
    } catch {
      toast.error("Failed to add friend");
    }
  }

  return (
    <DialogContent className="sm:max-w-md" data-ocid="family.add_friend_dialog">
      <DialogHeader>
        <DialogTitle className="font-display">Add Friend</DialogTitle>
      </DialogHeader>
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Your Name *</Label>
            <Input
              placeholder="Your name"
              value={form.ownerName}
              onChange={(e) =>
                setForm((f) => ({ ...f, ownerName: e.target.value }))
              }
              data-ocid="family.add_friend.owner_name"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Your Surname</Label>
            <Input
              placeholder="Surname"
              value={form.ownerSurname}
              onChange={(e) =>
                setForm((f) => ({ ...f, ownerSurname: e.target.value }))
              }
              data-ocid="family.add_friend.owner_surname"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Your Phone *</Label>
          <Input
            placeholder="+91XXXXXXXXXX"
            value={form.ownerPhone}
            onChange={(e) =>
              setForm((f) => ({ ...f, ownerPhone: e.target.value }))
            }
            data-ocid="family.add_friend.owner_phone"
          />
        </div>
        <div className="border-t border-border pt-3 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Friend Details
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Friend Name *</Label>
              <Input
                placeholder="Friend's name"
                value={form.friendName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, friendName: e.target.value }))
                }
                data-ocid="family.add_friend.friend_name"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Friend Phone *</Label>
              <Input
                placeholder="+91XXXXXXXXXX"
                value={form.friendPhone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, friendPhone: e.target.value }))
                }
                data-ocid="family.add_friend.friend_phone"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Friend Address</Label>
            <Input
              placeholder="Address"
              value={form.friendAddress}
              onChange={(e) =>
                setForm((f) => ({ ...f, friendAddress: e.target.value }))
              }
              data-ocid="family.add_friend.friend_address"
            />
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-2.5 text-xs text-muted-foreground">
          Your friend will receive a WhatsApp invite to connect. They'll be
          registered as a customer.
        </div>
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="family.add_friend.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={addFriend.isPending}
            data-ocid="family.add_friend.submit_button"
          >
            {addFriend.isPending ? "Adding…" : "Add Friend"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

// ─── Friends View ─────────────────────────────────────────────────────────────
function FriendsView({ members }: { members: FamilyMember[] }) {
  const friends = members.filter((m) => m.relationship === "friend");
  const deleteLink = useDeleteFamilyLink();

  if (friends.length === 0) {
    return (
      <div
        className="py-16 text-center text-muted-foreground text-sm"
        data-ocid="family.friends_empty"
      >
        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
        No friends connections found
      </div>
    );
  }

  async function handleDeleteLink(id: string) {
    try {
      await deleteLink.mutateAsync(id);
      toast.success("Friend link removed");
    } catch {
      toast.error("Failed to remove link");
    }
  }

  // Group friends by owner
  const byOwner: Record<string, FamilyMember[]> = {};
  for (const f of friends) {
    if (!byOwner[f.ownerPhone]) byOwner[f.ownerPhone] = [];
    byOwner[f.ownerPhone].push(f);
  }

  return (
    <div className="space-y-4">
      {Object.entries(byOwner).map(([ownerPhone, ownerFriends]) => (
        <div
          key={ownerPhone}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
            <span className="font-semibold text-sm">
              {ownerFriends[0]?.ownerName}&apos;s Friends
            </span>
            <Badge variant="outline" className="text-xs">
              {ownerFriends.length}
            </Badge>
          </div>
          <div className="divide-y divide-border/50">
            {ownerFriends.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold shrink-0">
                    {f.relationName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{f.relationName}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {f.relationPhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${INVITE_META[f.inviteStatus].cls}`}
                  >
                    {INVITE_META[f.inviteStatus].label}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteLink(f.id)}
                    disabled={deleteLink.isPending}
                    data-ocid={`family.friend_delete_link.${f.id}`}
                  >
                    <Link2Off className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Matrimony Edit Dialog ──────────────────────────────────────────────────────────

const EDUCATION_OPTIONS = [
  "Below 10th",
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate",
  "Post-Graduate",
  "Doctorate",
];
const BLOOD_GROUP_OPTIONS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

interface MatrimonyFormData {
  eligible: boolean;
  gender: string;
  caste: string;
  occupation: string;
  education: string;
  locationPreference: string;
  bloodGroup: string;
  age: number | undefined;
}

function MatrimonyEditDialog({
  member,
  onClose,
  onSave,
}: {
  member: FamilyMemberWithMatrimony;
  onClose: () => void;
  onSave: (data: {
    eligible: boolean;
    gender?: string;
    caste?: string;
    occupation?: string;
    education?: string;
    locationPreference?: string;
    bloodGroup?: string;
    age?: number;
  }) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<MatrimonyFormData>({
    eligible: member.isMatrimonyEligible ?? false,
    gender: member.gender ?? "",
    caste: member.caste ?? "",
    occupation: member.occupation ?? "",
    education: member.education ?? "",
    locationPreference: member.locationPreference ?? "",
    bloodGroup: member.bloodGroup ?? "",
    age: member.age != null ? Number(member.age) : undefined,
  });

  async function handleSave() {
    setSaving(true);
    try {
      await onSave({
        eligible: form.eligible,
        gender: form.gender || undefined,
        caste: form.caste || undefined,
        occupation: form.occupation || undefined,
        education: form.education || undefined,
        locationPreference: form.locationPreference || undefined,
        bloodGroup: form.bloodGroup || undefined,
        age: form.age,
      });
      toast.success(
        form.eligible
          ? "Matrimony profile updated"
          : "Matrimony eligibility removed",
      );
      onClose();
    } catch {
      toast.error("Failed to update matrimony profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-lg" data-ocid="family.matrimony_dialog">
      <DialogHeader>
        <DialogTitle className="font-display flex items-center gap-2">
          <Heart className="w-4 h-4 text-amber-500" />
          Matrimony Profile — {member.relationName}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 pt-1">
        <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <button
            type="button"
            role="switch"
            aria-checked={form.eligible}
            onClick={() => setForm((f) => ({ ...f, eligible: !f.eligible }))}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              form.eligible ? "bg-amber-500" : "bg-muted-foreground/30"
            }`}
            data-ocid="family.matrimony_eligible_toggle"
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                form.eligible ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
          <div>
            <p className="text-sm font-medium">Mark as Matrimony Eligible</p>
            <p className="text-xs text-muted-foreground">
              Profile will appear in partner search
            </p>
          </div>
        </div>

        {form.eligible && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Gender *</Label>
              <Select
                value={form.gender}
                onValueChange={(v) => setForm((f) => ({ ...f, gender: v }))}
              >
                <SelectTrigger data-ocid="family.matrimony.gender_select">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Caste</Label>
                <Input
                  placeholder="Enter caste"
                  value={form.caste}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, caste: e.target.value }))
                  }
                  data-ocid="family.matrimony.caste_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Occupation</Label>
                <Input
                  placeholder="Job / profession"
                  value={form.occupation}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, occupation: e.target.value }))
                  }
                  data-ocid="family.matrimony.occupation_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Education</Label>
                <Select
                  value={form.education}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, education: v }))
                  }
                >
                  <SelectTrigger data-ocid="family.matrimony.education_select">
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    {EDUCATION_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Blood Group</Label>
                <Select
                  value={form.bloodGroup}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, bloodGroup: v }))
                  }
                >
                  <SelectTrigger data-ocid="family.matrimony.blood_group_select">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOOD_GROUP_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Location Preference</Label>
                <Input
                  placeholder="City / region"
                  value={form.locationPreference}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      locationPreference: e.target.value,
                    }))
                  }
                  data-ocid="family.matrimony.location_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Age</Label>
                <Input
                  type="number"
                  placeholder="Age in years"
                  value={form.age ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      age: e.target.value
                        ? Number.parseInt(e.target.value, 10)
                        : undefined,
                    }))
                  }
                  data-ocid="family.matrimony.age_input"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="family.matrimony.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleSave}
            disabled={saving}
            data-ocid="family.matrimony.save_button"
          >
            {saving ? "Saving…" : "Save Profile"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default function FamilyPage() {
  const {
    data: members = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFamilyMembers();
  const updateInviteStatus = useUpdateFamilyInviteStatus();
  const deleteMember = useDeleteFamilyMember();

  const [inviteFilter, setInviteFilter] = useState<InviteStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showAddFriendDialog, setShowAddFriendDialog] = useState(false);
  const [matrimonyMember, setMatrimonyMember] =
    useState<FamilyMemberWithMatrimony | null>(null);
  const updateMatrimony = useUpdateMatrimonyEligibility();

  const filtered = members.filter((m) => {
    if (inviteFilter !== "all" && m.inviteStatus !== inviteFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !m.ownerName.toLowerCase().includes(q) &&
        !m.relationName.toLowerCase().includes(q) &&
        !m.ownerPhone.includes(q) &&
        !m.relationPhone.includes(q)
      )
        return false;
    }
    return true;
  });

  const total = members.length;
  const connected = members.filter(
    (m) => m.inviteStatus === "connected",
  ).length;
  const pending = members.filter((m) => m.inviteStatus === "pending").length;
  const cancelled = members.filter(
    (m) => m.inviteStatus === "cancelled",
  ).length;
  const uniqueOwners = new Set(members.map((m) => m.ownerPhone)).size;
  const friendsCount = members.filter(
    (m) => m.relationship === "friend",
  ).length;
  const matrimonyMemberM = members as unknown as FamilyMemberWithMatrimony[];
  const matrimonyCount = matrimonyMemberM.filter(
    (m) => m.isMatrimonyEligible,
  ).length;

  async function handleStatusChange(id: string, status: InviteStatus) {
    try {
      await updateInviteStatus.mutateAsync({
        id,
        status: status as unknown as BackendFamilyInviteStatus,
      });
      toast.success("Invite status updated");
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMember.mutateAsync(id);
      setSelectedMember(null);
      setDeleteId(null);
      toast.success("Family member removed");
    } catch {
      toast.error("Failed to delete");
    }
  }

  function handleExport() {
    const rows = members.map((m) =>
      [
        m.id,
        m.ownerName,
        m.ownerSurname,
        m.ownerPhone,
        m.relationName,
        m.relationPhone,
        m.relationship,
        m.address,
        m.inviteStatus,
        toDate(m.createdAt).toLocaleDateString("en-IN"),
      ].join(","),
    );
    const csv = [
      "ID,Owner Name,Surname,Owner Phone,Relation Name,Relation Phone,Relationship,Address,Invite Status,Created At",
      ...rows,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "family-members.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasFilters = inviteFilter !== "all" || search;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Family Groups
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage family member connections and invite statuses
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 shrink-0"
          onClick={handleExport}
          data-ocid="family.export_button"
        >
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Total Records" value={total} color="text-foreground" />
        <StatCard
          label="Connected"
          value={connected}
          color="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          label="Pending"
          value={pending}
          color="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          label="Cancelled"
          value={cancelled}
          color="text-destructive"
        />
        <StatCard
          label="Unique Users"
          value={uniqueOwners}
          color="text-primary"
        />
        <StatCard
          label="Friends"
          value={friendsCount}
          color="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          label="Matrimony"
          value={matrimonyCount}
          color="text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Tabs: All Members / Family Groups / Friends */}
      <Tabs defaultValue="all" data-ocid="family.tabs">
        <TabsList>
          <TabsTrigger value="all" data-ocid="family.tab.all">
            All Members
          </TabsTrigger>
          <TabsTrigger value="groups" data-ocid="family.tab.groups">
            Family Groups
          </TabsTrigger>
          <TabsTrigger value="friends" data-ocid="family.tab.friends">
            Friends ({friendsCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap gap-3">
              <Select
                value={inviteFilter}
                onValueChange={(v) =>
                  setInviteFilter(v as InviteStatus | "all")
                }
              >
                <SelectTrigger
                  className="w-36 h-8 text-sm"
                  data-ocid="family.status_filter.select"
                >
                  <SelectValue placeholder="Invite Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search name or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-sm w-56"
                  data-ocid="family.search_input"
                />
              </div>

              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-muted-foreground"
                  onClick={() => {
                    setInviteFilter("all");
                    setSearch("");
                  }}
                  data-ocid="family.clear_filters_button"
                >
                  <X className="w-3.5 h-3.5" /> Clear
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {members.length} records
            </p>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {["f1", "f2", "f3", "f4", "f5", "f6"].map((s) => (
                  <Skeleton key={s} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <div
                className="flex flex-col items-center gap-3 py-16 text-center"
                data-ocid="family.error_state"
              >
                <Users className="w-10 h-10 text-destructive/40" />
                <p className="text-sm font-medium text-destructive">
                  Failed to load family members
                </p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  {error instanceof Error
                    ? error.message
                    : "Could not connect to backend. Check canister deployment."}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => refetch()}
                  data-ocid="family.retry_button"
                >
                  Retry
                </Button>
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="flex flex-col items-center gap-3 py-16 text-center"
                data-ocid="family.empty_state"
              >
                <Users className="w-10 h-10 text-muted-foreground/40" />
                <p className="text-muted-foreground text-sm">
                  No family members yet. Load Sample Data to see example
                  records.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-ocid="family.table">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr className="text-muted-foreground text-xs">
                      <th className="text-left py-3 px-4 font-medium">Owner</th>
                      <th className="text-left py-3 px-3 font-medium">
                        Relationship
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Relation Person
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Relation Phone
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Address
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Gender
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Invite Status
                      </th>
                      <th className="text-left py-3 px-3 font-medium">Added</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((member, idx) => {
                      const meta = INVITE_META[member.inviteStatus];
                      return (
                        <tr
                          key={member.id}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          data-ocid={`family.item.${idx + 1}`}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                                {member.ownerName[0]}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate max-w-[120px]">
                                  {member.ownerName}
                                  {member.ownerSurname && (
                                    <span className="text-muted-foreground ml-1">
                                      {member.ownerSurname}
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  {member.ownerPhone}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-sm">
                              {RELATIONSHIP_LABELS[member.relationship] ??
                                member.relationship}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium">
                                {member.relationName}
                              </p>
                              {(member as unknown as FamilyMemberWithMatrimony)
                                .isMatrimonyEligible && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800">
                                  <Crown className="w-2.5 h-2.5" />
                                  Matrimony
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-xs font-mono text-muted-foreground">
                              {member.relationPhone}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-xs text-muted-foreground truncate max-w-[120px] block">
                              {member.address}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-xs text-muted-foreground">
                              {(member as unknown as FamilyMemberWithMatrimony)
                                .gender ?? "—"}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <Select
                              value={member.inviteStatus}
                              onValueChange={(v) =>
                                handleStatusChange(member.id, v as InviteStatus)
                              }
                            >
                              <SelectTrigger
                                className="h-7 w-32 border-0 p-0 focus:ring-0 text-xs"
                                data-ocid={`family.invite_select.${idx + 1}`}
                              >
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${meta.cls}`}
                                >
                                  {meta.label}
                                </span>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="connected">
                                  Connected
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-xs text-muted-foreground">
                              {toDate(member.createdAt).toLocaleDateString(
                                "en-IN",
                              )}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs gap-1"
                                onClick={() => setSelectedMember(member)}
                                data-ocid={`family.view_button.${idx + 1}`}
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs gap-1 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                                onClick={() =>
                                  setMatrimonyMember(
                                    member as unknown as FamilyMemberWithMatrimony,
                                  )
                                }
                                title="Edit Matrimony Profile"
                                data-ocid={`family.matrimony_button.${idx + 1}`}
                              >
                                <Heart className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10"
                                onClick={() => setDeleteId(member.id)}
                                data-ocid={`family.delete_button.${idx + 1}`}
                              >
                                <Link2Off className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                                onClick={() => setDeleteId(member.id)}
                                data-ocid={`family.remove_button.${idx + 1}`}
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

        <TabsContent value="groups" className="mt-4">
          {isLoading ? (
            <div className="space-y-3">
              {["g1", "g2", "g3"].map((s) => (
                <Skeleton key={s} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <FamilyGroupsView members={members} />
          )}
        </TabsContent>

        <TabsContent value="friends" className="mt-4">
          <div className="flex justify-end mb-3">
            <Button
              size="sm"
              className="gap-1.5"
              onClick={() => setShowAddFriendDialog(true)}
              data-ocid="family.add_friend_button"
            >
              <UserPlus className="w-4 h-4" /> Add Friend
            </Button>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {["fr1", "fr2"].map((s) => (
                <Skeleton key={s} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <FriendsView members={members} />
          )}
        </TabsContent>
      </Tabs>

      {/* Matrimony Profile Dialog */}
      <Dialog
        open={!!matrimonyMember}
        onOpenChange={() => setMatrimonyMember(null)}
      >
        {matrimonyMember && (
          <MatrimonyEditDialog
            member={matrimonyMember}
            onClose={() => setMatrimonyMember(null)}
            onSave={async (data) => {
              await updateMatrimony.mutateAsync({
                memberId: matrimonyMember.id,
                ...data,
              });
              setMatrimonyMember(null);
            }}
          />
        )}
      </Dialog>

      {/* Add Friend Dialog */}
      <Dialog open={showAddFriendDialog} onOpenChange={setShowAddFriendDialog}>
        <AddFriendDialog onClose={() => setShowAddFriendDialog(false)} />
      </Dialog>

      {/* Detail modal */}
      <Dialog
        open={!!selectedMember}
        onOpenChange={() => setSelectedMember(null)}
      >
        <DialogContent className="sm:max-w-md" data-ocid="family.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              Family Member Details
            </DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Owner
                  </p>
                  <p className="text-sm font-medium">
                    {selectedMember.ownerName}
                  </p>
                  {selectedMember.ownerSurname && (
                    <p className="text-xs text-muted-foreground">
                      {selectedMember.ownerSurname} family
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedMember.ownerPhone}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Relationship
                  </p>
                  <p className="text-sm">
                    {RELATIONSHIP_LABELS[selectedMember.relationship] ??
                      selectedMember.relationship}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Relation Person
                  </p>
                  <p className="text-sm font-medium">
                    {selectedMember.relationName}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedMember.relationPhone}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Invite Status
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${INVITE_META[selectedMember.inviteStatus].cls}`}
                  >
                    {INVITE_META[selectedMember.inviteStatus].label}
                  </span>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Address
                </p>
                <p className="text-sm">{selectedMember.address}</p>
              </div>
              {selectedMember.gender && (
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Gender
                  </p>
                  <p className="text-sm">{selectedMember.gender}</p>
                </div>
              )}
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Added On
                </p>
                <p className="text-sm">
                  {toDate(selectedMember.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedMember(null)}
                  data-ocid="family.close_button"
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  className="gap-1.5"
                  onClick={() => {
                    setDeleteId(selectedMember.id);
                    setSelectedMember(null);
                  }}
                  data-ocid="family.delete_link_button"
                >
                  <Link2Off className="w-4 h-4" /> Delete Link
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="family.confirm_dialog"
        >
          <DialogHeader>
            <DialogTitle>Remove Family Connection?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently remove the family link. The connection cannot
            be restored without re-inviting.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteId(null)}
              data-ocid="family.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                if (deleteId) handleDelete(deleteId);
              }}
              data-ocid="family.confirm_button"
            >
              Remove Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
