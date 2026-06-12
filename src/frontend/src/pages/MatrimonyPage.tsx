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
import { Crown, Heart, Search, Trash2, Users, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { MatrimonyProfile } from "../backend.d";
import {
  useMatrimonyMembers,
  useUpdateMatrimonyEligibility,
} from "../hooks/useBackend";

const EDUCATION_OPTIONS = [
  "All",
  "Below 10th",
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate",
  "Post-Graduate",
  "Doctorate",
];
const BLOOD_GROUP_OPTIONS = [
  "All",
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];
const EDUCATION_EDIT_OPTIONS = EDUCATION_OPTIONS.slice(1);
const BLOOD_GROUP_EDIT_OPTIONS = BLOOD_GROUP_OPTIONS.slice(1);

function ProfileBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800">
      {children}
    </span>
  );
}

function EditProfileDialog({
  profile,
  onClose,
}: {
  profile: MatrimonyProfile;
  onClose: () => void;
}) {
  const updateMatrimony = useUpdateMatrimonyEligibility();
  const [form, setForm] = useState({
    caste: profile.caste ?? "",
    occupation: profile.occupation ?? "",
    education: profile.education ?? "",
    locationPreference: profile.locationPreference ?? "",
    bloodGroup: profile.bloodGroup ?? "",
    age: profile.age != null ? Number(profile.age) : "",
  });

  async function handleSave() {
    try {
      await updateMatrimony.mutateAsync({
        memberId: profile.memberId,
        eligible: true,
        caste: form.caste || undefined,
        occupation: form.occupation || undefined,
        education: form.education || undefined,
        locationPreference: form.locationPreference || undefined,
        bloodGroup: form.bloodGroup || undefined,
        age: form.age !== "" ? Number(form.age) : undefined,
      });
      toast.success("Matrimony profile updated");
      onClose();
    } catch {
      toast.error("Failed to update profile");
    }
  }

  return (
    <DialogContent className="sm:max-w-lg" data-ocid="matrimony.edit_dialog">
      <DialogHeader>
        <DialogTitle className="font-display flex items-center gap-2">
          <Heart className="w-4 h-4 text-amber-500" />
          Edit Matrimony Profile — {profile.memberName}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Caste</Label>
            <Input
              value={form.caste}
              onChange={(e) =>
                setForm((f) => ({ ...f, caste: e.target.value }))
              }
              placeholder="Enter caste"
              data-ocid="matrimony.edit.caste_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Occupation</Label>
            <Input
              value={form.occupation}
              onChange={(e) =>
                setForm((f) => ({ ...f, occupation: e.target.value }))
              }
              placeholder="Profession"
              data-ocid="matrimony.edit.occupation_input"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Education</Label>
            <Select
              value={form.education}
              onValueChange={(v) => setForm((f) => ({ ...f, education: v }))}
            >
              <SelectTrigger data-ocid="matrimony.edit.education_select">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_EDIT_OPTIONS.map((opt) => (
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
              onValueChange={(v) => setForm((f) => ({ ...f, bloodGroup: v }))}
            >
              <SelectTrigger data-ocid="matrimony.edit.blood_group_select">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {BLOOD_GROUP_EDIT_OPTIONS.map((opt) => (
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
              value={form.locationPreference}
              onChange={(e) =>
                setForm((f) => ({ ...f, locationPreference: e.target.value }))
              }
              placeholder="City / region"
              data-ocid="matrimony.edit.location_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Age</Label>
            <Input
              type="number"
              value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
              placeholder="Age"
              data-ocid="matrimony.edit.age_input"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="matrimony.edit.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleSave}
            disabled={updateMatrimony.isPending}
            data-ocid="matrimony.edit.save_button"
          >
            {updateMatrimony.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default function MatrimonyPage() {
  const [filters, setFilters] = useState({
    caste: "",
    location: "",
    education: "",
    bloodGroup: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<typeof filters>({
    caste: "",
    location: "",
    education: "",
    bloodGroup: "",
  });
  const [editProfile, setEditProfile] = useState<MatrimonyProfile | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const updateMatrimony = useUpdateMatrimonyEligibility();

  const queryFilters = {
    caste: appliedFilters.caste || undefined,
    location: appliedFilters.location || undefined,
    education:
      appliedFilters.education && appliedFilters.education !== "All"
        ? appliedFilters.education
        : undefined,
    bloodGroup:
      appliedFilters.bloodGroup && appliedFilters.bloodGroup !== "All"
        ? appliedFilters.bloodGroup
        : undefined,
  };

  const { data: profiles = [], isLoading } = useMatrimonyMembers(queryFilters);

  const hasFilters =
    filters.caste ||
    filters.location ||
    filters.education ||
    filters.bloodGroup;

  function handleSearch() {
    setAppliedFilters({ ...filters });
  }

  function handleClear() {
    setFilters({ caste: "", location: "", education: "", bloodGroup: "" });
    setAppliedFilters({
      caste: "",
      location: "",
      education: "",
      bloodGroup: "",
    });
  }

  async function handleDelete(memberId: string) {
    try {
      await updateMatrimony.mutateAsync({ memberId, eligible: false });
      toast.success("Matrimony eligibility removed");
      setDeleteId(null);
    } catch {
      toast.error("Failed to remove eligibility");
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          Matrimony Members
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Elite matrimony profiles for eligible family members
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Caste</Label>
            <Input
              placeholder="Filter by caste"
              value={filters.caste}
              onChange={(e) =>
                setFilters((f) => ({ ...f, caste: e.target.value }))
              }
              data-ocid="matrimony.caste_filter"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Location</Label>
            <Input
              placeholder="City / region"
              value={filters.location}
              onChange={(e) =>
                setFilters((f) => ({ ...f, location: e.target.value }))
              }
              data-ocid="matrimony.location_filter"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Education</Label>
            <Select
              value={filters.education || "All"}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, education: v === "All" ? "" : v }))
              }
            >
              <SelectTrigger data-ocid="matrimony.education_filter.select">
                <SelectValue />
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
              value={filters.bloodGroup || "All"}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, bloodGroup: v === "All" ? "" : v }))
              }
            >
              <SelectTrigger data-ocid="matrimony.blood_group_filter.select">
                <SelectValue />
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
        <div className="flex items-center gap-2 mt-3">
          <Button
            size="sm"
            className="gap-1.5"
            onClick={handleSearch}
            data-ocid="matrimony.search_button"
          >
            <Search className="w-3.5 h-3.5" /> Search
          </Button>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground"
              onClick={handleClear}
              data-ocid="matrimony.clear_button"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </Button>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {profiles.length} profile{profiles.length !== 1 ? "s" : ""} found
          </span>
        </div>
      </div>

      {/* Results table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {["m1", "m2", "m3", "m4"].map((k) => (
              <Skeleton key={k} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div
            className="flex flex-col items-center gap-3 py-16 text-center"
            data-ocid="matrimony.empty_state"
          >
            <Heart className="w-12 h-12 text-amber-300/60" />
            <p className="text-lg font-display font-semibold text-foreground">
              No Matrimony Profiles Yet
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Mark family members as matrimony eligible from the Family Groups
              page to see them here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="matrimony.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-3 font-medium">Age</th>
                  <th className="text-left py-3 px-3 font-medium">Caste</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Occupation
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Education</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Location Pref.
                  </th>
                  <th className="text-left py-3 px-3 font-medium">
                    Blood Group
                  </th>
                  <th className="text-left py-3 px-3 font-medium">
                    Owner Phone
                  </th>
                  <th className="text-left py-3 px-3 font-medium">
                    Relationship
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile, idx) => (
                  <tr
                    key={profile.memberId}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`matrimony.item.${idx + 1}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-amber-700 dark:text-amber-400 text-xs font-bold shrink-0">
                          {profile.memberName[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium">
                          {profile.memberName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {profile.age != null ? (
                        <span>{Number(profile.age)} yrs</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {profile.caste ? (
                        <ProfileBadge>{profile.caste}</ProfileBadge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-sm">
                        {profile.occupation || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {profile.education ? (
                        <Badge
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {profile.education}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-sm">
                        {profile.locationPreference || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {profile.bloodGroup ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400">
                          {profile.bloodGroup}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-mono text-muted-foreground">
                        {profile.ownerPhone}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-muted-foreground capitalize">
                        {profile.ownerRelationship}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs gap-1"
                          onClick={() => setEditProfile(profile)}
                          data-ocid={`matrimony.edit_button.${idx + 1}`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteId(profile.memberId)}
                          data-ocid={`matrimony.delete_button.${idx + 1}`}
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

      {/* Edit Dialog */}
      <Dialog open={!!editProfile} onOpenChange={() => setEditProfile(null)}>
        {editProfile && (
          <EditProfileDialog
            profile={editProfile}
            onClose={() => setEditProfile(null)}
          />
        )}
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="matrimony.confirm_dialog"
        >
          <DialogHeader>
            <DialogTitle>Remove Matrimony Eligibility?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will remove the member from matrimony search results. Their
            family record is not affected.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteId(null)}
              data-ocid="matrimony.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={updateMatrimony.isPending}
              data-ocid="matrimony.confirm_button"
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
