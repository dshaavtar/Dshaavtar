import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useNavigate } from "@tanstack/react-router";
import {
  Bot,
  Edit2,
  GripVertical,
  Info,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddMenuOption,
  useDeleteMenuOption,
  useGetAllMenuOptions,
  useGetMenuRepositoryHealth,
  useSyncMenuOptionsFromRegistry,
  useUpdateMenuOption,
} from "../hooks/useBackend";

type MenuRole = "customer" | "merchant" | "deliveryPartner" | "manufacturer";

const ROLE_LABELS: Record<MenuRole, string> = {
  customer: "Customer",
  merchant: "Merchant",
  deliveryPartner: "Delivery Partner",
  manufacturer: "Manufacturer",
};

const ALL_ROLES: MenuRole[] = [
  "customer",
  "merchant",
  "deliveryPartner",
  "manufacturer",
];

/** Normalize backend role strings to our MenuRole type */
function normalizeRole(role: string): MenuRole | null {
  const r = role.toLowerCase().trim();
  if (r === "customer") return "customer";
  if (r === "merchant") return "merchant";
  if (
    r === "deliverypartner" ||
    r === "delivery_partner" ||
    r === "delivery partner"
  )
    return "deliveryPartner";
  if (r === "manufacturer") return "manufacturer";
  return null;
}

interface MenuOptionRaw {
  id: string;
  optionLabel: string;
  flowId: string;
  roles: string[];
  cityModuleKey: string;
  sortOrder: number | bigint;
  isActive: boolean;
}

function AddMenuOptionForm({ onClose }: { onClose: () => void }) {
  const addOption = useAddMenuOption();
  const [form, setForm] = useState({
    label: "",
    flowId: "",
    cityModuleKey: "",
    sortOrder: "100",
  });
  const [selectedRoles, setSelectedRoles] = useState<MenuRole[]>(["customer"]);

  function toggleRole(role: MenuRole) {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  }

  async function handleAdd() {
    if (!form.label.trim() || !form.flowId.trim()) {
      toast.error("Label and Flow ID are required");
      return;
    }
    if (selectedRoles.length === 0) {
      toast.error("Select at least one role");
      return;
    }
    try {
      await addOption.mutateAsync({
        label: form.label,
        flowId: form.flowId,
        roles: selectedRoles,
        cityModuleKey: form.cityModuleKey,
        sortOrder: Number(form.sortOrder),
        isActive: true,
      });
      toast.success("Menu option added");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add option");
    }
  }

  return (
    <div
      className="border border-border rounded-xl p-5 bg-muted/20 space-y-4"
      data-ocid="menu.add_form"
    >
      <h4 className="font-semibold text-sm text-foreground">Add Menu Option</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5">
            Label *
          </Label>
          <Input
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            placeholder="Healthcare Booking"
            data-ocid="menu.add.label.input"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5">
            Flow ID *
          </Label>
          <Input
            value={form.flowId}
            onChange={(e) => setForm((f) => ({ ...f, flowId: e.target.value }))}
            placeholder="healthcare-booking"
            data-ocid="menu.add.flowid.input"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5">
            City Module Key
          </Label>
          <Input
            value={form.cityModuleKey}
            onChange={(e) =>
              setForm((f) => ({ ...f, cityModuleKey: e.target.value }))
            }
            placeholder="Healthcare"
            data-ocid="menu.add.citymodulekey.input"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5">
            Sort Order
          </Label>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm((f) => ({ ...f, sortOrder: e.target.value }))
            }
            placeholder="100"
            data-ocid="menu.add.sortorder.input"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground mb-2">Roles *</Label>
        <div className="flex flex-wrap gap-4">
          {ALL_ROLES.map((role) => (
            <div key={role} className="flex items-center gap-2">
              <Checkbox
                id={`add-role-${role}`}
                checked={selectedRoles.includes(role)}
                onCheckedChange={() => toggleRole(role)}
                data-ocid={`menu.add.role.${role}`}
              />
              <Label
                htmlFor={`add-role-${role}`}
                className="text-sm font-normal cursor-pointer"
              >
                {ROLE_LABELS[role]}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          data-ocid="menu.add.cancel_button"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleAdd}
          disabled={addOption.isPending}
          data-ocid="menu.add.submit_button"
        >
          {addOption.isPending ? (
            "Adding…"
          ) : (
            <>
              <Plus className="w-4 h-4 mr-1" />
              Add Option
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function MenuOptionRow({
  option,
  idx,
}: {
  option: MenuOptionRaw;
  idx: number;
}) {
  const updateOption = useUpdateMenuOption();
  const deleteOption = useDeleteMenuOption();
  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(option.optionLabel);
  const [editSort, setEditSort] = useState(String(Number(option.sortOrder)));
  const [editActive, setEditActive] = useState(option.isActive);

  async function handleSave() {
    try {
      await updateOption.mutateAsync({
        id: option.id,
        label: editLabel,
        sortOrder: Number(editSort),
        isActive: editActive,
      });
      toast.success("Option updated");
      setEditing(false);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to update option";
      toast.error(msg);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${option.optionLabel}"?`)) return;
    try {
      await deleteOption.mutateAsync(option.id);
      toast.success("Option deleted");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete";
      toast.error(msg);
    }
  }

  return (
    <div
      className={`border border-border rounded-lg p-3 bg-card ${
        editing ? "ring-2 ring-primary/30" : ""
      }`}
      data-ocid={`menu.option.item.${idx + 1}`}
    >
      <div className="flex items-center gap-3">
        <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0 cursor-grab" />
        {editing ? (
          <div className="flex-1 grid sm:grid-cols-3 gap-2">
            <Input
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              className="h-7 text-sm"
              data-ocid={`menu.option.edit.label.${idx + 1}`}
            />
            <Input
              type="number"
              value={editSort}
              onChange={(e) => setEditSort(e.target.value)}
              className="h-7 text-sm"
              placeholder="Sort"
              data-ocid={`menu.option.edit.sort.${idx + 1}`}
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={editActive}
                onCheckedChange={setEditActive}
                data-ocid={`menu.option.edit.active.${idx + 1}`}
              />
              <Label className="text-xs">
                {editActive ? "Active" : "Inactive"}
              </Label>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-3 min-w-0">
            <span className="text-sm font-medium text-foreground truncate">
              {option.optionLabel}
            </span>
            <span className="text-xs text-muted-foreground font-mono shrink-0">
              {option.flowId}
            </span>
            {option.cityModuleKey && (
              <Badge variant="outline" className="text-xs shrink-0">
                {option.cityModuleKey}
              </Badge>
            )}
          </div>
        )}
        <div className="flex items-center gap-1 shrink-0">
          {!editing && (
            <Switch
              checked={option.isActive}
              onCheckedChange={async (checked) => {
                try {
                  await updateOption.mutateAsync({
                    id: option.id,
                    isActive: checked,
                  });
                  toast.success(checked ? "Option enabled" : "Option disabled");
                } catch (err) {
                  const msg =
                    err instanceof Error ? err.message : "Failed to update";
                  toast.error(msg);
                }
              }}
              data-ocid={`menu.option.active.${idx + 1}`}
            />
          )}
          {editing ? (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={handleSave}
                data-ocid={`menu.option.save_button.${idx + 1}`}
              >
                <Save className="w-3.5 h-3.5 text-primary" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => setEditing(false)}
                data-ocid={`menu.option.cancel_button.${idx + 1}`}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => {
                  setEditLabel(option.optionLabel);
                  setEditSort(String(Number(option.sortOrder)));
                  setEditActive(option.isActive);
                  setEditing(true);
                }}
                data-ocid={`menu.option.edit_button.${idx + 1}`}
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-destructive"
                onClick={handleDelete}
                data-ocid={`menu.option.delete_button.${idx + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RoleMenuTab({ role }: { role: MenuRole }) {
  const {
    data: allOptions = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllMenuOptions();

  const options = (allOptions as unknown as MenuOptionRaw[])
    .filter((opt) => {
      if (!Array.isArray(opt.roles)) return false;
      return opt.roles.some((r) => normalizeRole(r) === role);
    })
    .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8" data-ocid="menu.error_state">
        <p className="text-muted-foreground text-sm mb-3">
          Failed to load menu options
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div
        className="text-center py-10 text-muted-foreground text-sm"
        data-ocid="menu.empty_state"
      >
        No menu options for {ROLE_LABELS[role]} yet.
        <p className="text-xs mt-1">
          Use "Sync from Flow Registry" to populate, or add one manually.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {options.map((opt, idx) => (
        <MenuOptionRow key={opt.id} option={opt} idx={idx} />
      ))}
    </div>
  );
}

export default function MenuRepositoryPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const syncFromRegistry = useSyncMenuOptionsFromRegistry();
  const { refetch } = useGetAllMenuOptions();
  const [_lastWebhookUpdate, setLastWebhookUpdate] = useState<string | null>(
    null,
  );
  const [activeRole, setActiveRole] = useState<MenuRole>("customer");
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: health } = useGetMenuRepositoryHealth();

  async function handleSync() {
    setSyncSuccess(false);
    setError(null);
    try {
      const syncResult = await syncFromRegistry.mutateAsync();
      const byRoleMap: Record<string, number> = {};
      for (const [role, count] of syncResult.byRole || []) {
        byRoleMap[role] = Number(count as bigint | number);
      }
      const total = Number(syncResult.total);
      if (total === 0) {
        toast.info(
          "Menu repository already up to date — no new options were added.",
        );
      } else {
        const successMsg = `Synced ${total} menu options — Customer: ${
          byRoleMap.customer || 0
        }, Merchant: ${byRoleMap.merchant || 0}, Delivery Partner: ${
          byRoleMap.delivery_partner || byRoleMap.deliveryPartner || 0
        }, Manufacturer: ${byRoleMap.manufacturer || 0}`;
        toast.success(successMsg);
        setSyncSuccess(true);
      }
      refetch();
      // Show last webhook update timestamp from log
      try {
        const actorAny = (await import("@/backend")).createActor;
        void actorAny;
      } catch {
        // ignore
      }
      setLastWebhookUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      toast.error(`Sync failed: ${msg}`);
    }
  }

  return (
    <div className="space-y-6" data-ocid="menu-repo.page">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Menu Repository
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Centralized chatbot menus for all roles and surfaces.
          </p>
          {health && (
            <div className="flex gap-3 mt-2">
              <Badge variant="secondary" className="text-xs">
                {health.flowCount} Flows
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {health.menuOptionCount} Menu Options
              </Badge>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            data-ocid="menu-repo.refresh_button"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={syncFromRegistry.isPending}
            data-ocid="menu-repo.sync_button"
          >
            {syncFromRegistry.isPending
              ? "Syncing…"
              : "Sync from Flow Registry"}
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAddForm((p) => !p)}
            data-ocid="menu-repo.add_button"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Option
          </Button>
        </div>
      </div>

      {showAddForm && (
        <AddMenuOptionForm
          onClose={() => {
            setShowAddForm(false);
            refetch();
          }}
        />
      )}

      {/* Post-sync guidance banner */}
      {syncSuccess && (
        <div
          className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl"
          data-ocid="menu-repo.sync_success_state"
        >
          <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              Menus synced successfully
            </p>
            <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
              Menu options are now live across all surfaces — Chatbot Simulator,
              Flow Designer, and channel scripts.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-400"
            onClick={() => navigate({ to: "/chatbot" })}
            data-ocid="menu-repo.preview_chatbot_button"
          >
            <Bot className="w-4 h-4 mr-1.5" />
            Preview in Chatbot Simulator
          </Button>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6">
        <Tabs
          value={activeRole}
          onValueChange={(v) => setActiveRole(v as MenuRole)}
        >
          <TabsList className="w-full grid grid-cols-4 mb-5">
            {ALL_ROLES.map((role) => (
              <TabsTrigger
                key={role}
                value={role}
                data-ocid={`menu-repo.role.${role}`}
              >
                {ROLE_LABELS[role]}
              </TabsTrigger>
            ))}
          </TabsList>
          {ALL_ROLES.map((role) => (
            <TabsContent key={role} value={role}>
              <RoleMenuTab role={role} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
