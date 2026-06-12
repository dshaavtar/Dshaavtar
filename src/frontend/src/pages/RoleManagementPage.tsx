import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Edit2,
  HandCoins,
  Info,
  Link,
  Loader2,
  Plus,
  Power,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { EmployeeRole as BackendEmployeeRole } from "../backend";
import {
  useAddEmployee,
  useDeleteEmployee,
  useEmployees,
  useGetAllCommunityMembers,
  useGetAllLendingItems,
  useSetEmployeeActive,
  useUpdateEmployee,
} from "../hooks/useBackend";
import type { Employee, EmployeeRole } from "../types";
import { MENU_SECTIONS } from "../types";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function roleBadgeVariant(role: string): "default" | "secondary" | "outline" {
  if (role === "Super Admin") return "default";
  if (role === "Manager") return "secondary";
  return "outline";
}

// ─── Permission Picker ────────────────────────────────────────────────────────

function PermissionPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (p: string[]) => void;
}) {
  const toggle = (s: string) => {
    onChange(
      selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s],
    );
  };
  return (
    <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
      {MENU_SECTIONS.map((s) => (
        <button
          key={s}
          type="button"
          className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted/40 cursor-pointer text-sm text-left"
          onClick={() => toggle(s)}
        >
          <Checkbox
            checked={selected.includes(s)}
            onCheckedChange={() => toggle(s)}
            id={`perm-${s.toLowerCase().replace(/\s+/g, "-")}`}
            data-ocid={`permission-${s.toLowerCase().replace(/\s+/g, "-")}`}
          />
          <span>{s}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Add/Edit Employee Modal ──────────────────────────────────────────────────

interface EmployeeModalProps {
  open: boolean;
  initial: Partial<Employee> | null;
  onSave: (data: Partial<Employee>) => void;
  onClose: () => void;
  roles: EmployeeRole[];
}

function EmployeeModal({
  open,
  initial,
  onSave,
  onClose,
  roles,
}: EmployeeModalProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(initial?.roleId ?? "");
  const [permissions, setPermissions] = useState<string[]>(
    initial?.permissions ?? [],
  );
  const [saving, setSaving] = useState(false);

  const handleRoleChange = (id: string) => {
    setRoleId(id);
    const r = roles.find((r) => r.id === id);
    if (r) setPermissions([...r.permissions]);
  };

  const handleSave = async () => {
    if (!name || !email) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    onSave({
      ...initial,
      name,
      email,
      ...(password ? { password } : {}),
      roleId,
      permissions,
    });
    setSaving(false);
    onClose();
  };

  const isEdit = !!initial?.id;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="employee.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEdit ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-ocid="employee.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="rahul@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="employee.email_input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>
              {isEdit ? "New Password (leave blank to keep)" : "Password"}
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-ocid="employee.password_input"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Role Template</Label>
            <Select value={roleId} onValueChange={handleRoleChange}>
              <SelectTrigger data-ocid="employee.role_select">
                <SelectValue placeholder="Choose a role..." />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.name}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Menu Permissions</Label>
            <PermissionPicker
              selected={permissions}
              onChange={setPermissions}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="employee.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !name || !email}
            data-ocid="employee.submit_button"
          >
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEdit ? "Save Changes" : "Add Employee"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Add/Edit Role Modal ──────────────────────────────────────────────────────

interface RoleModalProps {
  open: boolean;
  initial: Partial<EmployeeRole> | null;
  employeeCount: (id: string) => number;
  onSave: (data: Partial<EmployeeRole>) => void;
  onClose: () => void;
}

function RoleModal({ open, initial, onSave, onClose }: RoleModalProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [permissions, setPermissions] = useState<string[]>(
    initial?.permissions ?? [],
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    onSave({ ...initial, name, description, permissions });
    setSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="role.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {initial?.id ? "Edit Role" : "Add Role"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label>Role Name</Label>
            <Input
              placeholder="e.g. Operations Manager"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="role.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Input
              placeholder="What does this role do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-ocid="role.description_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Permissions</Label>
            <PermissionPicker
              selected={permissions}
              onChange={setPermissions}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="role.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !name}
            data-ocid="role.submit_button"
          >
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {initial?.id ? "Save Changes" : "Create Role"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteConfirm({
  open,
  label,
  onConfirm,
  onClose,
}: {
  open: boolean;
  label: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="delete.dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Confirm Delete
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mt-2">
          Are you sure you want to delete <strong>{label}</strong>? This action
          cannot be undone.
        </p>
        <div className="flex gap-2 justify-end mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="delete.cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            data-ocid="delete.confirm_button"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RoleManagementPage() {
  const { data: backendEmployees = [] } = useEmployees();
  const addEmployee = useAddEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();
  const setEmployeeActive = useSetEmployeeActive();
  const { data: allLendingItems = [] } = useGetAllLendingItems();
  const { data: communityMembers = [] } = useGetAllCommunityMembers();

  // Derived lending role indicators per phone
  const lenderPhones = new Set(
    allLendingItems
      .filter((i) => i.status === "active")
      .map((i) => i.lenderPhone),
  );
  const borrowerPhones = new Set(
    allLendingItems
      .filter((i) => i.status === "active")
      .map((i) => i.borrowerPhone),
  );
  const communityPhones = new Set(communityMembers.map((m) => m.phone));

  // Map backend employees to local Employee type for display
  const employees: Employee[] = backendEmployees.map((e) => ({
    id: e.id,
    name: e.name,
    email: e.email,
    password: "",
    roleId: e.role,
    roleName: e.role,
    permissions: e.permissions,
    isActive: e.isActive,
    createdAt: e.createdAt,
  }));

  // Roles are static for now (backend uses enum-based roles)
  const roles: EmployeeRole[] = [
    {
      id: "admin",
      name: "Admin",
      description: "Full access",
      permissions: [...MENU_SECTIONS],
    },
    {
      id: "manager",
      name: "Manager",
      description: "Most sections",
      permissions: ["Dashboard", "Orders", "Users", "Merchants", "Analytics"],
    },
    {
      id: "agent",
      name: "Agent",
      description: "Limited access",
      permissions: ["Dashboard", "Orders"],
    },
  ];

  // modals
  const [empModal, setEmpModal] = useState<{
    open: boolean;
    initial: Partial<Employee> | null;
  }>({ open: false, initial: null });
  const [roleModal, setRoleModal] = useState<{
    open: boolean;
    initial: Partial<EmployeeRole> | null;
  }>({ open: false, initial: null });
  const [deleteTarget, setDeleteTarget] = useState<{
    open: boolean;
    id: string;
    label: string;
    type: "employee" | "role";
  } | null>(null);

  const [empSearch, setEmpSearch] = useState("");

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(empSearch.toLowerCase()) ||
      e.email.toLowerCase().includes(empSearch.toLowerCase()),
  );

  const getEmployeeCountForRole = (id: string) =>
    employees.filter((e) => e.roleId === id).length;

  const handleSaveEmployee = async (data: Partial<Employee>) => {
    if (data.id) {
      try {
        await updateEmployee.mutateAsync({
          id: data.id,
          name: data.name ?? "",
          email: data.email ?? "",
          phone: "",
          role: (data.roleId ?? "agent") as BackendEmployeeRole,
          permissions: data.permissions ?? [],
        });
        toast.success("Employee updated");
      } catch {
        toast.error("Failed to update employee");
      }
    } else {
      try {
        await addEmployee.mutateAsync({
          name: data.name ?? "",
          email: data.email ?? "",
          phone: "",
          passwordHash: data.password ?? "",
          role: (data.roleId ?? "agent") as BackendEmployeeRole,
          permissions: data.permissions ?? [],
        });
        toast.success("Employee added");
      } catch {
        toast.error("Failed to add employee");
      }
    }
  };

  const handleSaveRole = (data: Partial<EmployeeRole>) => {
    // Roles are enum-based on backend; local role management only
    toast.success(data.id ? "Role updated" : "Role created");
  };

  const handleToggleEmployee = async (id: string) => {
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;
    try {
      await setEmployeeActive.mutateAsync({ id, isActive: !emp.isActive });
      toast.success(
        emp.isActive ? "Employee deactivated" : "Employee activated",
      );
    } catch {
      toast.error("Failed to toggle employee status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "employee") {
      try {
        await deleteEmployee.mutateAsync(deleteTarget.id);
        toast.success("Employee deleted");
      } catch {
        toast.error("Failed to delete employee");
      }
    }
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 space-y-6" data-ocid="roles.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Role Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage employee access and permissions for the admin portal.
          </p>
        </div>
      </div>

      {/* Callout */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
        <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">Employee Login</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Employees log in at{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs">/login</code>{" "}
            using their assigned credentials. Their dashboard will only show the
            menu sections assigned to their role.
          </p>
        </div>
      </div>

      <Tabs defaultValue="employees" data-ocid="roles.tab">
        <TabsList>
          <TabsTrigger value="employees" data-ocid="roles.employees_tab">
            <Users className="w-4 h-4 mr-1.5" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="roles" data-ocid="roles.roles_tab">
            <Shield className="w-4 h-4 mr-1.5" />
            Roles & Permissions
          </TabsTrigger>
        </TabsList>

        {/* ── Employees Tab ── */}
        <TabsContent value="employees" className="mt-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-xs">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
              <Input
                placeholder="Search employees..."
                className="pl-9"
                value={empSearch}
                onChange={(e) => setEmpSearch(e.target.value)}
                data-ocid="employees.search_input"
              />
            </div>
            <Button
              onClick={() => setEmpModal({ open: true, initial: null })}
              data-ocid="employees.add_button"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Employee
            </Button>
          </div>

          {/* Employees table */}
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Permissions
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Last Login
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-muted-foreground"
                        data-ocid="employees.empty_state"
                      >
                        No employees found.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp, i) => (
                      <tr
                        key={emp.id}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid={`employees.item.${i + 1}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-primary">
                                {emp.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium truncate">
                              {emp.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground truncate max-w-[180px]">
                          {emp.email}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={roleBadgeVariant(emp.roleName)}>
                            {emp.roleName}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                              {emp.permissions.length} sections
                            </span>
                            {lenderPhones.has(emp.email) && (
                              <span className="inline-flex items-center gap-0.5 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded-full">
                                <HandCoins className="w-3 h-3" /> Lender
                              </span>
                            )}
                            {borrowerPhones.has(emp.email) && (
                              <span className="inline-flex items-center gap-0.5 text-xs bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 px-2 py-0.5 rounded-full">
                                <HandCoins className="w-3 h-3" /> Borrower
                              </span>
                            )}
                            {communityPhones.has(emp.email) && (
                              <span className="inline-flex items-center gap-0.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                                <Users className="w-3 h-3" /> Community
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={emp.isActive ? "default" : "secondary"}
                          >
                            {emp.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {emp.lastLogin
                            ? formatDate(Number(emp.lastLogin))
                            : "Never"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 justify-end">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              title={emp.isActive ? "Deactivate" : "Activate"}
                              onClick={() => handleToggleEmployee(emp.id)}
                              data-ocid={`employees.toggle.${i + 1}`}
                            >
                              <Power
                                className={`w-4 h-4 ${emp.isActive ? "text-destructive" : "text-primary"}`}
                              />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              title="Edit"
                              onClick={() =>
                                setEmpModal({ open: true, initial: emp })
                              }
                              data-ocid={`employees.edit_button.${i + 1}`}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              title="Delete"
                              onClick={() =>
                                setDeleteTarget({
                                  open: true,
                                  id: emp.id,
                                  label: emp.name,
                                  type: "employee",
                                })
                              }
                              data-ocid={`employees.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* ── Roles Tab ── */}
        <TabsContent value="roles" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setRoleModal({ open: true, initial: null })}
              data-ocid="roles.add_button"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Role
            </Button>
          </div>

          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Role Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Permissions
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      Employees
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {roles.map((role, i) => {
                    const empCount = getEmployeeCountForRole(role.id);
                    return (
                      <tr
                        key={role.id}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid={`roles.item.${i + 1}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="font-medium">{role.name}</span>
                            {role.isDefault && (
                              <Badge
                                variant="outline"
                                className="text-[10px] py-0 h-4"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground max-w-[220px]">
                          <span className="truncate block">
                            {role.description}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1 max-w-[300px]">
                            {role.permissions.slice(0, 4).map((p) => (
                              <span
                                key={p}
                                className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full"
                              >
                                {p}
                              </span>
                            ))}
                            {role.permissions.length > 4 && (
                              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                                +{role.permissions.length - 4} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium">{empCount}</span>
                          <span className="text-muted-foreground">
                            {" "}
                            employee{empCount !== 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 justify-end">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              title="Edit"
                              onClick={() =>
                                setRoleModal({ open: true, initial: role })
                              }
                              data-ocid={`roles.edit_button.${i + 1}`}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              title={
                                empCount > 0
                                  ? "Cannot delete — employees assigned"
                                  : "Delete"
                              }
                              disabled={role.isDefault || empCount > 0}
                              onClick={() =>
                                setDeleteTarget({
                                  open: true,
                                  id: role.id,
                                  label: role.name,
                                  type: "role",
                                })
                              }
                              data-ocid={`roles.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EmployeeModal
        open={empModal.open}
        initial={empModal.initial}
        roles={roles}
        onSave={handleSaveEmployee}
        onClose={() => setEmpModal({ open: false, initial: null })}
      />
      <RoleModal
        open={roleModal.open}
        initial={roleModal.initial}
        employeeCount={getEmployeeCountForRole}
        onSave={handleSaveRole}
        onClose={() => setRoleModal({ open: false, initial: null })}
      />
      {deleteTarget && (
        <DeleteConfirm
          open={deleteTarget.open}
          label={deleteTarget.label}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
