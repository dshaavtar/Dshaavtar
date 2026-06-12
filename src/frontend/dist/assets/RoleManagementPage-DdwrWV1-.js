import { bi as useEmployees, bj as useAddEmployee, bk as useUpdateEmployee, bl as useDeleteEmployee, bm as useSetEmployeeActive, aT as useGetAllLendingItems, bn as useGetAllCommunityMembers, r as reactExports, j as jsxRuntimeExports, bo as MENU_SECTIONS, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Checkbox } from "./checkbox-DuAbI53w.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { S as Shield } from "./shield-Bz48lUZV.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { H as HandCoins } from "./hand-coins-D5RW6D6g.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { P as Pen } from "./pen-DGASRaG7.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CUcO6jhF.js";
import "./index-z5OST4d2.js";
import "./index-BNXq-E6T.js";
import "./check-CO9wi49t.js";
import "./index-CmjKy1Fn.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./x-Chksmd6i.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./chevron-down-gIU8OsEH.js";
import "./chevron-up-BzRcvKHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
];
const Power = createLucideIcon("power", __iconNode);
function formatDate(ms) {
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function roleBadgeVariant(role) {
  if (role === "Super Admin") return "default";
  if (role === "Manager") return "secondary";
  return "outline";
}
function PermissionPicker({
  selected,
  onChange
}) {
  const toggle = (s) => {
    onChange(
      selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s]
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1", children: MENU_SECTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted/40 cursor-pointer text-sm text-left",
      onClick: () => toggle(s),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: selected.includes(s),
            onCheckedChange: () => toggle(s),
            id: `perm-${s.toLowerCase().replace(/\s+/g, "-")}`,
            "data-ocid": `permission-${s.toLowerCase().replace(/\s+/g, "-")}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s })
      ]
    },
    s
  )) });
}
function EmployeeModal({
  open,
  initial,
  onSave,
  onClose,
  roles
}) {
  const [name, setName] = reactExports.useState((initial == null ? void 0 : initial.name) ?? "");
  const [email, setEmail] = reactExports.useState((initial == null ? void 0 : initial.email) ?? "");
  const [password, setPassword] = reactExports.useState("");
  const [roleId, setRoleId] = reactExports.useState((initial == null ? void 0 : initial.roleId) ?? "");
  const [permissions, setPermissions] = reactExports.useState(
    (initial == null ? void 0 : initial.permissions) ?? []
  );
  const [saving, setSaving] = reactExports.useState(false);
  const handleRoleChange = (id) => {
    setRoleId(id);
    const r = roles.find((r2) => r2.id === id);
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
      ...password ? { password } : {},
      roleId,
      permissions
    });
    setSaving(false);
    onClose();
  };
  const isEdit = !!(initial == null ? void 0 : initial.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "employee.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: isEdit ? "Edit Employee" : "Add Employee" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Rahul Sharma",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  "data-ocid": "employee.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  placeholder: "rahul@company.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  "data-ocid": "employee.email_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: isEdit ? "New Password (leave blank to keep)" : "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                placeholder: "••••••••",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                "data-ocid": "employee.password_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role Template" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: roleId, onValueChange: handleRoleChange, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "employee.role_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a role..." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.id, children: r.name }, r.id)),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom", children: "Custom" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Menu Permissions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PermissionPicker,
              {
                selected: permissions,
                onChange: setPermissions
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onClose,
              "data-ocid": "employee.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleSave,
              disabled: saving || !name || !email,
              "data-ocid": "employee.submit_button",
              children: [
                saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                isEdit ? "Save Changes" : "Add Employee"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function RoleModal({ open, initial, onSave, onClose }) {
  const [name, setName] = reactExports.useState((initial == null ? void 0 : initial.name) ?? "");
  const [description, setDescription] = reactExports.useState((initial == null ? void 0 : initial.description) ?? "");
  const [permissions, setPermissions] = reactExports.useState(
    (initial == null ? void 0 : initial.permissions) ?? []
  );
  const [saving, setSaving] = reactExports.useState(false);
  const handleSave = async () => {
    if (!name) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    onSave({ ...initial, name, description, permissions });
    setSaving(false);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "role.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: (initial == null ? void 0 : initial.id) ? "Edit Role" : "Add Role" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. Operations Manager",
                value: name,
                onChange: (e) => setName(e.target.value),
                "data-ocid": "role.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "What does this role do?",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                "data-ocid": "role.description_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Permissions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PermissionPicker,
              {
                selected: permissions,
                onChange: setPermissions
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onClose,
              "data-ocid": "role.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleSave,
              disabled: saving || !name,
              "data-ocid": "role.submit_button",
              children: [
                saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                (initial == null ? void 0 : initial.id) ? "Save Changes" : "Create Role"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function DeleteConfirm({
  open,
  label,
  onConfirm,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "delete.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2 text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
      "Confirm Delete"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
      "Are you sure you want to delete ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: label }),
      "? This action cannot be undone."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onClose,
          "data-ocid": "delete.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "destructive",
          onClick: onConfirm,
          "data-ocid": "delete.confirm_button",
          children: "Delete"
        }
      )
    ] })
  ] }) });
}
function RoleManagementPage() {
  const { data: backendEmployees = [] } = useEmployees();
  const addEmployee = useAddEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();
  const setEmployeeActive = useSetEmployeeActive();
  const { data: allLendingItems = [] } = useGetAllLendingItems();
  const { data: communityMembers = [] } = useGetAllCommunityMembers();
  const lenderPhones = new Set(
    allLendingItems.filter((i) => i.status === "active").map((i) => i.lenderPhone)
  );
  const borrowerPhones = new Set(
    allLendingItems.filter((i) => i.status === "active").map((i) => i.borrowerPhone)
  );
  const communityPhones = new Set(communityMembers.map((m) => m.phone));
  const employees = backendEmployees.map((e) => ({
    id: e.id,
    name: e.name,
    email: e.email,
    password: "",
    roleId: e.role,
    roleName: e.role,
    permissions: e.permissions,
    isActive: e.isActive,
    createdAt: e.createdAt
  }));
  const roles = [
    {
      id: "admin",
      name: "Admin",
      description: "Full access",
      permissions: [...MENU_SECTIONS]
    },
    {
      id: "manager",
      name: "Manager",
      description: "Most sections",
      permissions: ["Dashboard", "Orders", "Users", "Merchants", "Analytics"]
    },
    {
      id: "agent",
      name: "Agent",
      description: "Limited access",
      permissions: ["Dashboard", "Orders"]
    }
  ];
  const [empModal, setEmpModal] = reactExports.useState({ open: false, initial: null });
  const [roleModal, setRoleModal] = reactExports.useState({ open: false, initial: null });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [empSearch, setEmpSearch] = reactExports.useState("");
  const filteredEmployees = employees.filter(
    (e) => e.name.toLowerCase().includes(empSearch.toLowerCase()) || e.email.toLowerCase().includes(empSearch.toLowerCase())
  );
  const getEmployeeCountForRole = (id) => employees.filter((e) => e.roleId === id).length;
  const handleSaveEmployee = async (data) => {
    if (data.id) {
      try {
        await updateEmployee.mutateAsync({
          id: data.id,
          name: data.name ?? "",
          email: data.email ?? "",
          phone: "",
          role: data.roleId ?? "agent",
          permissions: data.permissions ?? []
        });
        ue.success("Employee updated");
      } catch {
        ue.error("Failed to update employee");
      }
    } else {
      try {
        await addEmployee.mutateAsync({
          name: data.name ?? "",
          email: data.email ?? "",
          phone: "",
          passwordHash: data.password ?? "",
          role: data.roleId ?? "agent",
          permissions: data.permissions ?? []
        });
        ue.success("Employee added");
      } catch {
        ue.error("Failed to add employee");
      }
    }
  };
  const handleSaveRole = (data) => {
    ue.success(data.id ? "Role updated" : "Role created");
  };
  const handleToggleEmployee = async (id) => {
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;
    try {
      await setEmployeeActive.mutateAsync({ id, isActive: !emp.isActive });
      ue.success(
        emp.isActive ? "Employee deactivated" : "Employee activated"
      );
    } catch {
      ue.error("Failed to toggle employee status");
    }
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "employee") {
      try {
        await deleteEmployee.mutateAsync(deleteTarget.id);
        ue.success("Employee deleted");
      } catch {
        ue.error("Failed to delete employee");
      }
    }
    setDeleteTarget(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "roles.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Role Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage employee access and permissions for the admin portal." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-primary mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Employee Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          "Employees log in at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 py-0.5 rounded text-xs", children: "/login" }),
          " ",
          "using their assigned credentials. Their dashboard will only show the menu sections assigned to their role."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "employees", "data-ocid": "roles.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "employees", "data-ocid": "roles.employees_tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-1.5" }),
          "Employees"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "roles", "data-ocid": "roles.roles_tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-1.5" }),
          "Roles & Permissions"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "employees", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "11", cy: "11", r: "8" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m21 21-4.35-4.35" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search employees...",
                className: "pl-9",
                value: empSearch,
                onChange: (e) => setEmpSearch(e.target.value),
                "data-ocid": "employees.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setEmpModal({ open: true, initial: null }),
              "data-ocid": "employees.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                "Add Employee"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Permissions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Last Login" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-muted-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filteredEmployees.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 7,
              className: "px-4 py-10 text-center text-muted-foreground",
              "data-ocid": "employees.empty_state",
              children: "No employees found."
            }
          ) }) : filteredEmployees.map((emp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20 transition-colors",
              "data-ocid": `employees.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: emp.name.charAt(0).toUpperCase() }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: emp.name })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[180px]", children: emp.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: roleBadgeVariant(emp.roleName), children: emp.roleName }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground", children: [
                    emp.permissions.length,
                    " sections"
                  ] }),
                  lenderPhones.has(emp.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-3 h-3" }),
                    " Lender"
                  ] }),
                  borrowerPhones.has(emp.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-xs bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 px-2 py-0.5 rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-3 h-3" }),
                    " Borrower"
                  ] }),
                  communityPhones.has(emp.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                    " Community"
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: emp.isActive ? "default" : "secondary",
                    children: emp.isActive ? "Active" : "Inactive"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: emp.lastLogin ? formatDate(Number(emp.lastLogin)) : "Never" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-8 w-8",
                      title: emp.isActive ? "Deactivate" : "Activate",
                      onClick: () => handleToggleEmployee(emp.id),
                      "data-ocid": `employees.toggle.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Power,
                        {
                          className: `w-4 h-4 ${emp.isActive ? "text-destructive" : "text-primary"}`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-8 w-8",
                      title: "Edit",
                      onClick: () => setEmpModal({ open: true, initial: emp }),
                      "data-ocid": `employees.edit_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-8 w-8 text-destructive hover:text-destructive",
                      title: "Delete",
                      onClick: () => setDeleteTarget({
                        open: true,
                        id: emp.id,
                        label: emp.name,
                        type: "employee"
                      }),
                      "data-ocid": `employees.delete_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ]
            },
            emp.id
          )) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "roles", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setRoleModal({ open: true, initial: null }),
            "data-ocid": "roles.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
              "Add Role"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Role Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Permissions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground", children: "Employees" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-muted-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: roles.map((role, i) => {
            const empCount = getEmployeeCountForRole(role.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/20 transition-colors",
                "data-ocid": `roles.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: role.name }),
                    role.isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] py-0 h-4",
                        children: "Default"
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground max-w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", children: role.description }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 max-w-[300px]", children: [
                    role.permissions.slice(0, 4).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full",
                        children: p
                      },
                      p
                    )),
                    role.permissions.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full", children: [
                      "+",
                      role.permissions.length - 4,
                      " more"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: empCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                      " ",
                      "employee",
                      empCount !== 1 ? "s" : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "h-8 w-8",
                        title: "Edit",
                        onClick: () => setRoleModal({ open: true, initial: role }),
                        "data-ocid": `roles.edit_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "h-8 w-8 text-destructive hover:text-destructive",
                        title: empCount > 0 ? "Cannot delete — employees assigned" : "Delete",
                        disabled: role.isDefault || empCount > 0,
                        onClick: () => setDeleteTarget({
                          open: true,
                          id: role.id,
                          label: role.name,
                          type: "role"
                        }),
                        "data-ocid": `roles.delete_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] }) })
                ]
              },
              role.id
            );
          }) })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmployeeModal,
      {
        open: empModal.open,
        initial: empModal.initial,
        roles,
        onSave: handleSaveEmployee,
        onClose: () => setEmpModal({ open: false, initial: null })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RoleModal,
      {
        open: roleModal.open,
        initial: roleModal.initial,
        employeeCount: getEmployeeCountForRole,
        onSave: handleSaveRole,
        onClose: () => setRoleModal({ open: false, initial: null })
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        open: deleteTarget.open,
        label: deleteTarget.label,
        onConfirm: handleDelete,
        onClose: () => setDeleteTarget(null)
      }
    )
  ] });
}
export {
  RoleManagementPage as default
};
