import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "../App";
import {
  useDeleteAdvertisement,
  useGetAdvertisements,
  useSaveAdvertisement,
  useUpdateAdvertisement,
} from "../hooks/useBackend";

const ROLES = [
  "All",
  "Customer",
  "Merchant",
  "Delivery",
  "Manufacturer",
] as const;

type AdForm = {
  title: string;
  description: string;
  targetRole: string;
  city: string;
  active: boolean;
};

const emptyForm = (): AdForm => ({
  title: "",
  description: "",
  targetRole: "All",
  city: "",
  active: true,
});

function getErrorDetail(res: unknown): string | null {
  if (res && typeof res === "object") {
    const r = res as Record<string, unknown>;
    if (r.errorDetail) return String(r.errorDetail);
  }
  return null;
}

export default function AdvertisementManagementPage() {
  const { isAdmin } = useAuth();
  const { data: ads = [], isLoading } = useGetAdvertisements();
  const saveAd = useSaveAdvertisement();
  const updateAd = useUpdateAdvertisement();
  const deleteAd = useDeleteAdvertisement();

  const [addForm, setAddForm] = useState<AdForm>(emptyForm());
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AdForm>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="bg-card border border-border rounded-xl p-8 text-center max-w-sm">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Admin Access Required
          </h2>
          <p className="text-muted-foreground text-sm">
            You must be logged in as admin to manage advertisements.
          </p>
        </div>
      </div>
    );
  }

  async function handleAdd() {
    if (!addForm.title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const result = await saveAd.mutateAsync({
        adId: crypto.randomUUID(),
        title: addForm.title,
        description: addForm.description,
        targetRole: addForm.targetRole,
        city: addForm.city,
        active: addForm.active,
      });
      const errMsg = getErrorDetail(result);
      if (errMsg) setError(errMsg);
      else setAddForm(emptyForm());
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(adId: string) {
    setSaving(true);
    setError(null);
    try {
      const result = await updateAd.mutateAsync({
        adId,
        title: editForm.title,
        description: editForm.description,
        targetRole: editForm.targetRole,
        city: editForm.city,
        active: editForm.active,
      });
      const errMsg = getErrorDetail(result);
      if (errMsg) setError(errMsg);
      else setEditId(null);
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(adId: string) {
    if (!confirm("Delete this advertisement?")) return;
    setError(null);
    try {
      const result = await deleteAd.mutateAsync(adId);
      const errMsg = getErrorDetail(result);
      if (errMsg) setError(errMsg);
    } catch (e) {
      setError(String(e));
    }
  }

  function startEdit(ad: Record<string, unknown>) {
    setEditId(ad.adId as string);
    setEditForm({
      title: (ad.title as string) ?? "",
      description: (ad.description as string) ?? "",
      targetRole: (ad.targetRole as string) ?? "All",
      city: (ad.city as string) ?? "",
      active: Boolean(ad.active),
    });
  }

  return (
    <div
      data-ocid="advertisements.page"
      className="max-w-4xl mx-auto px-4 py-8 space-y-6"
    >
      <h1 className="text-2xl font-display font-bold text-foreground">
        Advertisement Management
      </h1>

      {/* Add Form */}
      <div
        data-ocid="advertisements.add_form"
        className="bg-card border border-border rounded-xl p-6 space-y-4"
      >
        <h2 className="text-base font-semibold text-foreground">
          Add Advertisement
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="ad-title">Title</Label>
            <Input
              id="ad-title"
              data-ocid="advertisements.input"
              placeholder="Advertisement title"
              value={addForm.title}
              onChange={(e) =>
                setAddForm((f) => ({ ...f, title: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ad-role">Target Role</Label>
            <select
              id="ad-role"
              data-ocid="advertisements.select"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              value={addForm.targetRole}
              onChange={(e) =>
                setAddForm((f) => ({ ...f, targetRole: e.target.value }))
              }
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="ad-city">City (optional)</Label>
            <Input
              id="ad-city"
              placeholder="City"
              value={addForm.city}
              onChange={(e) =>
                setAddForm((f) => ({ ...f, city: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center gap-2 pt-5">
            <input
              id="ad-active"
              data-ocid="advertisements.checkbox"
              type="checkbox"
              checked={addForm.active}
              onChange={(e) =>
                setAddForm((f) => ({ ...f, active: e.target.checked }))
              }
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="ad-active" className="cursor-pointer">
              Active
            </Label>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="ad-desc">Description</Label>
          <Textarea
            id="ad-desc"
            placeholder="Advertisement description"
            value={addForm.description}
            rows={3}
            onChange={(e) =>
              setAddForm((f) => ({ ...f, description: e.target.value }))
            }
          />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button
          type="button"
          data-ocid="advertisements.submit_button"
          onClick={handleAdd}
          disabled={saving || !addForm.title.trim()}
        >
          {saving ? "Saving\u2026" : "Save Advertisement"}
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table data-ocid="advertisements.table" className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                Title
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                Role
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                City
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                Active
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading\u2026
                </td>
              </tr>
            )}
            {!isLoading && ads.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  data-ocid="advertisements.empty_state"
                  className="text-center py-8 text-muted-foreground"
                >
                  No advertisements yet. Add one above.
                </td>
              </tr>
            )}
            {ads.map((ad: Record<string, unknown>, i: number) => (
              <tr
                key={ad.adId as string}
                data-ocid={`advertisements.item.${i + 1}`}
                className="border-t border-border hover:bg-muted/20"
              >
                {editId === (ad.adId as string) ? (
                  <td colSpan={4} className="px-4 py-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, title: e.target.value }))
                        }
                        placeholder="Title"
                      />
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        value={editForm.targetRole}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            targetRole: e.target.value,
                          }))
                        }
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <Input
                        value={editForm.city}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, city: e.target.value }))
                        }
                        placeholder="City"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editForm.active}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              active: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-input"
                        />
                        <span className="text-sm">Active</span>
                      </div>
                    </div>
                    <Textarea
                      className="mt-2"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      rows={2}
                    />
                  </td>
                ) : (
                  <>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {ad.title as string}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {ad.targetRole as string}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {(ad.city as string) || "\u2014"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          ad.active
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ad.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </>
                )}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {editId === (ad.adId as string) ? (
                      <>
                        <Button
                          type="button"
                          size="sm"
                          data-ocid={`advertisements.save_button.${i + 1}`}
                          onClick={() => handleUpdate(ad.adId as string)}
                          disabled={saving}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          data-ocid={`advertisements.cancel_button.${i + 1}`}
                          onClick={() => setEditId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          data-ocid={`advertisements.edit_button.${i + 1}`}
                          onClick={() => startEdit(ad)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          data-ocid={`advertisements.delete_button.${i + 1}`}
                          onClick={() => handleDelete(ad.adId as string)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
