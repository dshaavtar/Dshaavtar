import { a as useAuth, ea as useGetAdvertisements, eb as useSaveAdvertisement, ec as useUpdateAdvertisement, ed as useDeleteAdvertisement, r as reactExports, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
const ROLES = [
  "All",
  "Customer",
  "Merchant",
  "Delivery",
  "Manufacturer"
];
const emptyForm = () => ({
  title: "",
  description: "",
  targetRole: "All",
  city: "",
  active: true
});
function getErrorDetail(res) {
  if (res && typeof res === "object") {
    const r = res;
    if (r.errorDetail) return String(r.errorDetail);
  }
  return null;
}
function AdvertisementManagementPage() {
  const { isAdmin } = useAuth();
  const { data: ads = [], isLoading } = useGetAdvertisements();
  const saveAd = useSaveAdvertisement();
  const updateAd = useUpdateAdvertisement();
  const deleteAd = useDeleteAdvertisement();
  const [addForm, setAddForm] = reactExports.useState(emptyForm());
  const [editId, setEditId] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState(emptyForm());
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-8 text-center max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-2", children: "Admin Access Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "You must be logged in as admin to manage advertisements." })
    ] }) });
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
        active: addForm.active
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
  async function handleUpdate(adId) {
    setSaving(true);
    setError(null);
    try {
      const result = await updateAd.mutateAsync({
        adId,
        title: editForm.title,
        description: editForm.description,
        targetRole: editForm.targetRole,
        city: editForm.city,
        active: editForm.active
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
  async function handleDelete(adId) {
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
  function startEdit(ad) {
    setEditId(ad.adId);
    setEditForm({
      title: ad.title ?? "",
      description: ad.description ?? "",
      targetRole: ad.targetRole ?? "All",
      city: ad.city ?? "",
      active: Boolean(ad.active)
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "advertisements.page",
      className: "max-w-4xl mx-auto px-4 py-8 space-y-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Advertisement Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "advertisements.add_form",
            className: "bg-card border border-border rounded-xl p-6 space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Add Advertisement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ad-title", children: "Title" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ad-title",
                      "data-ocid": "advertisements.input",
                      placeholder: "Advertisement title",
                      value: addForm.title,
                      onChange: (e) => setAddForm((f) => ({ ...f, title: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ad-role", children: "Target Role" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "ad-role",
                      "data-ocid": "advertisements.select",
                      className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm",
                      value: addForm.targetRole,
                      onChange: (e) => setAddForm((f) => ({ ...f, targetRole: e.target.value })),
                      children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ad-city", children: "City (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ad-city",
                      placeholder: "City",
                      value: addForm.city,
                      onChange: (e) => setAddForm((f) => ({ ...f, city: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "ad-active",
                      "data-ocid": "advertisements.checkbox",
                      type: "checkbox",
                      checked: addForm.active,
                      onChange: (e) => setAddForm((f) => ({ ...f, active: e.target.checked })),
                      className: "h-4 w-4 rounded border-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ad-active", className: "cursor-pointer", children: "Active" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ad-desc", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "ad-desc",
                    placeholder: "Advertisement description",
                    value: addForm.description,
                    rows: 3,
                    onChange: (e) => setAddForm((f) => ({ ...f, description: e.target.value }))
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm", children: error }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "advertisements.submit_button",
                  onClick: handleAdd,
                  disabled: saving || !addForm.title.trim(),
                  children: saving ? "Saving…" : "Save Advertisement"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { "data-ocid": "advertisements.table", className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 5,
                className: "text-center py-8 text-muted-foreground",
                children: "Loading\\u2026"
              }
            ) }),
            !isLoading && ads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 5,
                "data-ocid": "advertisements.empty_state",
                className: "text-center py-8 text-muted-foreground",
                children: "No advertisements yet. Add one above."
              }
            ) }),
            ads.map((ad, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `advertisements.item.${i + 1}`,
                className: "border-t border-border hover:bg-muted/20",
                children: [
                  editId === ad.adId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 4, className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: editForm.title,
                          onChange: (e) => setEditForm((f) => ({ ...f, title: e.target.value })),
                          placeholder: "Title"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm",
                          value: editForm.targetRole,
                          onChange: (e) => setEditForm((f) => ({
                            ...f,
                            targetRole: e.target.value
                          })),
                          children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: editForm.city,
                          onChange: (e) => setEditForm((f) => ({ ...f, city: e.target.value })),
                          placeholder: "City"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: editForm.active,
                            onChange: (e) => setEditForm((f) => ({
                              ...f,
                              active: e.target.checked
                            })),
                            className: "h-4 w-4 rounded border-input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Active" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        className: "mt-2",
                        value: editForm.description,
                        onChange: (e) => setEditForm((f) => ({
                          ...f,
                          description: e.target.value
                        })),
                        rows: 2
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: ad.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: ad.targetRole }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: ad.city || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${ad.active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`,
                        children: ad.active ? "Active" : "Inactive"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: editId === ad.adId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        "data-ocid": `advertisements.save_button.${i + 1}`,
                        onClick: () => handleUpdate(ad.adId),
                        disabled: saving,
                        children: "Save"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        "data-ocid": `advertisements.cancel_button.${i + 1}`,
                        onClick: () => setEditId(null),
                        children: "Cancel"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        "data-ocid": `advertisements.edit_button.${i + 1}`,
                        onClick: () => startEdit(ad),
                        children: "Edit"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "destructive",
                        "data-ocid": `advertisements.delete_button.${i + 1}`,
                        onClick: () => handleDelete(ad.adId),
                        children: "Delete"
                      }
                    )
                  ] }) }) })
                ]
              },
              ad.adId
            ))
          ] })
        ] }) })
      ]
    }
  );
}
export {
  AdvertisementManagementPage as default
};
