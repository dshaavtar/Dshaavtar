const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-D4mmtgjo.js","assets/index-BldoeR_a.css"])))=>i.map(i=>d[i]);
import { r as reactExports, e4 as useSyncMenuOptionsFromRegistry, a9 as useGetAllMenuOptions, u as useNavigate, e5 as useGetMenuRepositoryHealth, j as jsxRuntimeExports, p as ue, e6 as __vitePreload, e7 as useAddMenuOption, e8 as useUpdateMenuOption, e9 as useDeleteMenuOption } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Checkbox } from "./checkbox-DuAbI53w.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { B as Bot } from "./bot-egkDiXjP.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { S as Save } from "./save-De3uJrwe.js";
import { X } from "./x-Chksmd6i.js";
import { P as Pen } from "./pen-DGASRaG7.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CUcO6jhF.js";
import "./index-z5OST4d2.js";
import "./index-BNXq-E6T.js";
import "./check-CO9wi49t.js";
import "./index-BtrS4JsN.js";
import "./index-yUS8KoxU.js";
import "./index-DYndF6Sn.js";
import "./index-dLX_aGK4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode);
const ROLE_LABELS = {
  customer: "Customer",
  merchant: "Merchant",
  deliveryPartner: "Delivery Partner",
  manufacturer: "Manufacturer"
};
const ALL_ROLES = [
  "customer",
  "merchant",
  "deliveryPartner",
  "manufacturer"
];
function normalizeRole(role) {
  const r = role.toLowerCase().trim();
  if (r === "customer") return "customer";
  if (r === "merchant") return "merchant";
  if (r === "deliverypartner" || r === "delivery_partner" || r === "delivery partner")
    return "deliveryPartner";
  if (r === "manufacturer") return "manufacturer";
  return null;
}
function AddMenuOptionForm({ onClose }) {
  const addOption = useAddMenuOption();
  const [form, setForm] = reactExports.useState({
    label: "",
    flowId: "",
    cityModuleKey: "",
    sortOrder: "100"
  });
  const [selectedRoles, setSelectedRoles] = reactExports.useState(["customer"]);
  function toggleRole(role) {
    setSelectedRoles(
      (prev) => prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }
  async function handleAdd() {
    if (!form.label.trim() || !form.flowId.trim()) {
      ue.error("Label and Flow ID are required");
      return;
    }
    if (selectedRoles.length === 0) {
      ue.error("Select at least one role");
      return;
    }
    try {
      await addOption.mutateAsync({
        label: form.label,
        flowId: form.flowId,
        roles: selectedRoles,
        cityModuleKey: form.cityModuleKey,
        sortOrder: Number(form.sortOrder),
        isActive: true
      });
      ue.success("Menu option added");
      onClose();
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to add option");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-xl p-5 bg-muted/20 space-y-4",
      "data-ocid": "menu.add_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "Add Menu Option" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Label *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.label,
                onChange: (e) => setForm((f) => ({ ...f, label: e.target.value })),
                placeholder: "Healthcare Booking",
                "data-ocid": "menu.add.label.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Flow ID *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.flowId,
                onChange: (e) => setForm((f) => ({ ...f, flowId: e.target.value })),
                placeholder: "healthcare-booking",
                "data-ocid": "menu.add.flowid.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "City Module Key" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.cityModuleKey,
                onChange: (e) => setForm((f) => ({ ...f, cityModuleKey: e.target.value })),
                placeholder: "Healthcare",
                "data-ocid": "menu.add.citymodulekey.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Sort Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: form.sortOrder,
                onChange: (e) => setForm((f) => ({ ...f, sortOrder: e.target.value })),
                placeholder: "100",
                "data-ocid": "menu.add.sortorder.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-2", children: "Roles *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4", children: ALL_ROLES.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `add-role-${role}`,
                checked: selectedRoles.includes(role),
                onCheckedChange: () => toggleRole(role),
                "data-ocid": `menu.add.role.${role}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: `add-role-${role}`,
                className: "text-sm font-normal cursor-pointer",
                children: ROLE_LABELS[role]
              }
            )
          ] }, role)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: onClose,
              "data-ocid": "menu.add.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: handleAdd,
              disabled: addOption.isPending,
              "data-ocid": "menu.add.submit_button",
              children: addOption.isPending ? "Adding…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                "Add Option"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function MenuOptionRow({
  option,
  idx
}) {
  const updateOption = useUpdateMenuOption();
  const deleteOption = useDeleteMenuOption();
  const [editing, setEditing] = reactExports.useState(false);
  const [editLabel, setEditLabel] = reactExports.useState(option.optionLabel);
  const [editSort, setEditSort] = reactExports.useState(String(Number(option.sortOrder)));
  const [editActive, setEditActive] = reactExports.useState(option.isActive);
  async function handleSave() {
    try {
      await updateOption.mutateAsync({
        id: option.id,
        label: editLabel,
        sortOrder: Number(editSort),
        isActive: editActive
      });
      ue.success("Option updated");
      setEditing(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update option";
      ue.error(msg);
    }
  }
  async function handleDelete() {
    if (!confirm(`Delete "${option.optionLabel}"?`)) return;
    try {
      await deleteOption.mutateAsync(option.id);
      ue.success("Option deleted");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete";
      ue.error(msg);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `border border-border rounded-lg p-3 bg-card ${editing ? "ring-2 ring-primary/30" : ""}`,
      "data-ocid": `menu.option.item.${idx + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-4 h-4 text-muted-foreground/40 shrink-0 cursor-grab" }),
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid sm:grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editLabel,
              onChange: (e) => setEditLabel(e.target.value),
              className: "h-7 text-sm",
              "data-ocid": `menu.option.edit.label.${idx + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: editSort,
              onChange: (e) => setEditSort(e.target.value),
              className: "h-7 text-sm",
              placeholder: "Sort",
              "data-ocid": `menu.option.edit.sort.${idx + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: editActive,
                onCheckedChange: setEditActive,
                "data-ocid": `menu.option.edit.active.${idx + 1}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: editActive ? "Active" : "Inactive" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: option.optionLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono shrink-0", children: option.flowId }),
          option.cityModuleKey && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs shrink-0", children: option.cityModuleKey })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
          !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: option.isActive,
              onCheckedChange: async (checked) => {
                try {
                  await updateOption.mutateAsync({
                    id: option.id,
                    isActive: checked
                  });
                  ue.success(checked ? "Option enabled" : "Option disabled");
                } catch (err) {
                  const msg = err instanceof Error ? err.message : "Failed to update";
                  ue.error(msg);
                }
              },
              "data-ocid": `menu.option.active.${idx + 1}`
            }
          ),
          editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                className: "h-7 w-7",
                onClick: handleSave,
                "data-ocid": `menu.option.save_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5 text-primary" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                className: "h-7 w-7",
                onClick: () => setEditing(false),
                "data-ocid": `menu.option.cancel_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                className: "h-7 w-7",
                onClick: () => {
                  setEditLabel(option.optionLabel);
                  setEditSort(String(Number(option.sortOrder)));
                  setEditActive(option.isActive);
                  setEditing(true);
                },
                "data-ocid": `menu.option.edit_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                className: "h-7 w-7 text-destructive",
                onClick: handleDelete,
                "data-ocid": `menu.option.delete_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function RoleMenuTab({ role }) {
  const {
    data: allOptions = [],
    isLoading,
    isError,
    refetch
  } = useGetAllMenuOptions();
  const options = allOptions.filter((opt) => {
    if (!Array.isArray(opt.roles)) return false;
    return opt.roles.some((r) => normalizeRole(r) === role);
  }).sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", "data-ocid": "menu.error_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Failed to load menu options" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => refetch(), children: "Retry" })
    ] });
  }
  if (options.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-10 text-muted-foreground text-sm",
        "data-ocid": "menu.empty_state",
        children: [
          "No menu options for ",
          ROLE_LABELS[role],
          " yet.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: 'Use "Sync from Flow Registry" to populate, or add one manually.' })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: options.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(MenuOptionRow, { option: opt, idx }, opt.id)) });
}
function MenuRepositoryPage() {
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const syncFromRegistry = useSyncMenuOptionsFromRegistry();
  const { refetch } = useGetAllMenuOptions();
  const [_lastWebhookUpdate, setLastWebhookUpdate] = reactExports.useState(
    null
  );
  const [activeRole, setActiveRole] = reactExports.useState("customer");
  const [syncSuccess, setSyncSuccess] = reactExports.useState(false);
  const [_error, setError] = reactExports.useState(null);
  const navigate = useNavigate();
  const { data: health } = useGetMenuRepositoryHealth();
  async function handleSync() {
    setSyncSuccess(false);
    setError(null);
    try {
      const syncResult = await syncFromRegistry.mutateAsync();
      const byRoleMap = {};
      for (const [role, count] of syncResult.byRole || []) {
        byRoleMap[role] = Number(count);
      }
      const total = Number(syncResult.total);
      if (total === 0) {
        ue.info(
          "Menu repository already up to date — no new options were added."
        );
      } else {
        const successMsg = `Synced ${total} menu options — Customer: ${byRoleMap.customer || 0}, Merchant: ${byRoleMap.merchant || 0}, Delivery Partner: ${byRoleMap.delivery_partner || byRoleMap.deliveryPartner || 0}, Manufacturer: ${byRoleMap.manufacturer || 0}`;
        ue.success(successMsg);
        setSyncSuccess(true);
      }
      refetch();
      try {
        const actorAny = (await __vitePreload(async () => {
          const { createActor } = await import("./index-D4mmtgjo.js").then((n) => n.eV);
          return { createActor };
        }, true ? __vite__mapDeps([0,1]) : void 0)).createActor;
      } catch {
      }
      setLastWebhookUpdate((/* @__PURE__ */ new Date()).toLocaleTimeString());
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      ue.error(`Sync failed: ${msg}`);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "menu-repo.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Menu Repository" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Centralized chatbot menus for all roles and surfaces." }),
        health && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            health.flowCount,
            " Flows"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            health.menuOptionCount,
            " Menu Options"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => refetch(),
            "data-ocid": "menu-repo.refresh_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleSync,
            disabled: syncFromRegistry.isPending,
            "data-ocid": "menu-repo.sync_button",
            children: syncFromRegistry.isPending ? "Syncing…" : "Sync from Flow Registry"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setShowAddForm((p) => !p),
            "data-ocid": "menu-repo.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
              " Add Option"
            ]
          }
        )
      ] })
    ] }),
    showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddMenuOptionForm,
      {
        onClose: () => {
          setShowAddForm(false);
          refetch();
        }
      }
    ),
    syncSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl",
        "data-ocid": "menu-repo.sync_success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-emerald-800 dark:text-emerald-300", children: "Menus synced successfully" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-0.5", children: "Menu options are now live across all surfaces — Chatbot Simulator, Flow Designer, and channel scripts." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "shrink-0 border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-400",
              onClick: () => navigate({ to: "/chatbot" }),
              "data-ocid": "menu-repo.preview_chatbot_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 mr-1.5" }),
                "Preview in Chatbot Simulator"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeRole,
        onValueChange: (v) => setActiveRole(v),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "w-full grid grid-cols-4 mb-5", children: ALL_ROLES.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: role,
              "data-ocid": `menu-repo.role.${role}`,
              children: ROLE_LABELS[role]
            },
            role
          )) }),
          ALL_ROLES.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: role, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleMenuTab, { role }) }, role))
        ]
      }
    ) })
  ] });
}
export {
  MenuRepositoryPage as default
};
