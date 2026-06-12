import { a as useAuth, d$ as useGetBrandingConfig, j as jsxRuntimeExports, e0 as useUpdateBrandingConfig, u as useNavigate, r as reactExports, e1 as useGetAllAppVersions, e2 as useAddAppVersion, e3 as useSetAppVersionActive, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C1kYAn3i.js";
import { S as ShieldAlert } from "./shield-alert-Czplfgsj.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { L as Lock } from "./lock-_3m7dyMM.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { B as Bot } from "./bot-egkDiXjP.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Smartphone } from "./smartphone-CYA8tykz.js";
import { P as Package } from "./package-CosknzeL.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-DYndF6Sn.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
function BrandIdentitySection() {
  const { data: config, isLoading, refetch } = useGetBrandingConfig();
  const updateBranding = useUpdateBrandingConfig();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    brandName: "",
    logoUrl: "",
    welcomeMessage: ""
  });
  const [editing, setEditing] = reactExports.useState(false);
  const [saveSuccess, setSaveSuccess] = reactExports.useState(false);
  function startEdit() {
    if (!config) return;
    setForm({
      brandName: String(config.brandName ?? ""),
      logoUrl: String(config.logoUrl ?? ""),
      welcomeMessage: String(config.welcomeMessage ?? "")
    });
    setSaveSuccess(false);
    setEditing(true);
  }
  async function handleSave() {
    if (!form.brandName.trim()) {
      ue.error("Brand name is required");
      return;
    }
    try {
      await updateBranding.mutateAsync({
        brandName: form.brandName,
        logoUrl: form.logoUrl,
        welcomeMessage: form.welcomeMessage
      });
      ue.success(
        "Brand name updated — chatbot welcome message synced automatically"
      );
      setEditing(false);
      setSaveSuccess(true);
      refetch();
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update branding"
      );
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Brand Identity" }),
      !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: startEdit,
          "data-ocid": "branding.edit_button",
          children: "Edit"
        }
      )
    ] }),
    !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        [
          { label: "Brand Name", value: String((config == null ? void 0 : config.brandName) ?? "—") },
          {
            label: "Logo URL",
            value: String((config == null ? void 0 : config.logoUrl) ?? "— not set —")
          }
        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mt-0.5 truncate", children: value ?? "—" })
        ] }, label)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full bg-muted/30 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Welcome Message (chatbot)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mt-0.5", children: String((config == null ? void 0 : config.welcomeMessage) ?? "—") })
        ] })
      ] }),
      saveSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl",
          "data-ocid": "branding.save_success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-600 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-xs text-emerald-700 dark:text-emerald-400", children: "Brand saved. Test the updated welcome message in the Chatbot Simulator." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "shrink-0 border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-400",
                onClick: () => navigate({ to: "/chatbot" }),
                "data-ocid": "branding.test_welcome_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 mr-1.5" }),
                  "Test Welcome Message"
                ]
              }
            )
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Brand Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.brandName,
            onChange: (e) => setForm((f) => ({ ...f, brandName: e.target.value })),
            placeholder: "e.g. LocalBazar Kart",
            "data-ocid": "branding.brandname.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Logo URL (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.logoUrl,
            onChange: (e) => setForm((f) => ({ ...f, logoUrl: e.target.value })),
            placeholder: "https://your-cdn.com/logo.png",
            "data-ocid": "branding.logourl.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Welcome Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.welcomeMessage,
            onChange: (e) => setForm((f) => ({ ...f, welcomeMessage: e.target.value })),
            placeholder: "Welcome to LocalBazar Kart! 🛒",
            "data-ocid": "branding.welcome.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "This message is synced automatically to the chatbot welcome flow." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setEditing(false),
            "data-ocid": "branding.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSave,
            disabled: updateBranding.isPending,
            "data-ocid": "branding.save_button",
            children: updateBranding.isPending ? "Saving…" : "Save Changes"
          }
        )
      ] })
    ] })
  ] });
}
function AppVersionsSection() {
  const { data: versions = [], isLoading, refetch } = useGetAllAppVersions();
  const { data: config } = useGetBrandingConfig();
  const addVersion = useAddAppVersion();
  const setActive = useSetAppVersionActive();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    brandName: "",
    platform: "Android",
    version: "",
    buildNumber: ""
  });
  function openForm() {
    setForm((f) => ({ ...f, brandName: String((config == null ? void 0 : config.brandName) ?? "") }));
    setShowForm(true);
  }
  async function handlePublish() {
    if (!form.version.trim() || !form.buildNumber.trim() || !form.brandName.trim()) {
      ue.error("Fill all required fields");
      return;
    }
    try {
      await addVersion.mutateAsync({
        brandName: form.brandName,
        platform: form.platform,
        version: form.version,
        buildNumber: Number(form.buildNumber)
      });
      ue.success(`Version ${form.version} published for ${form.platform}`);
      setShowForm(false);
      refetch();
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to publish version"
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "App Versions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Track iOS & Android builds per brand. Brand name is locked after publishing." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: openForm,
          "data-ocid": "branding.add_version_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            " Add Version"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 bg-muted/20 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 dark:text-amber-400", children: [
          "Brand name is ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "locked after publishing" }),
          ". To launch a new brand, use a different app name. Updating an existing brand will not change its published name."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Brand Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.brandName,
              onChange: (e) => setForm((f) => ({ ...f, brandName: e.target.value })),
              placeholder: "LocalBazar Kart",
              "data-ocid": "branding.version.brandname.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Platform *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.platform,
              onValueChange: (v) => setForm((f) => ({ ...f, platform: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "branding.version.platform.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: "iOS", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5 inline mr-1.5" }),
                    "iOS"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: "Android", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 inline mr-1.5" }),
                    "Android"
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Version *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.version,
              onChange: (e) => setForm((f) => ({ ...f, version: e.target.value })),
              placeholder: "1.0.0",
              "data-ocid": "branding.version.version.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Build Number *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: form.buildNumber,
              onChange: (e) => setForm((f) => ({ ...f, buildNumber: e.target.value })),
              placeholder: "100",
              "data-ocid": "branding.version.build.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setShowForm(false),
            "data-ocid": "branding.version.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handlePublish,
            disabled: addVersion.isPending,
            "data-ocid": "branding.version.publish_button",
            children: addVersion.isPending ? "Publishing…" : "Publish Version"
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : versions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-8 text-muted-foreground text-sm",
        "data-ocid": "branding.versions.empty_state",
        children: "No versions published yet."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Brand Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Version" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Build #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Release Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: versions.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `branding.version.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: String(v.brandName ?? "—") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: String(v.platform ?? "—") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-sm", children: String(v.version ?? "—") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "tabular-nums text-muted-foreground", children: String(v.buildNumber ?? "—") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-xs", children: v.releaseDate ? new Date(Number(v.releaseDate)).toLocaleDateString(
              "en-IN"
            ) : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: v.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200 text-xs", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-muted-foreground text-xs",
                children: "Inactive"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: !v.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 px-2 text-xs",
                onClick: async () => {
                  try {
                    await setActive.mutateAsync(String(v.id ?? ""));
                    ue.success("Version set as active");
                    refetch();
                  } catch {
                    ue.error("Failed to activate version");
                  }
                },
                "data-ocid": `branding.version.activate_button.${idx + 1}`,
                children: "Set Active"
              }
            ) })
          ]
        },
        String(v.id ?? idx)
      )) })
    ] }) })
  ] });
}
function BrandingPage() {
  const { isAdmin } = useAuth();
  const { refetch } = useGetBrandingConfig();
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh] bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-600 text-xl", children: "🔒" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-2", children: "Admin Access Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "The Branding page is locked to admin users only." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Log in with your Internet Identity admin account or use the admin password to access this page." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "branding.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Branding" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 text-xs font-medium",
              "data-ocid": "branding.admin_lock_badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-3 h-3" }),
                "Admin Only"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your app brand identity and mobile app versions. Changes are locked to admin access only." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => refetch(),
          "data-ocid": "branding.refresh_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-amber-800 dark:text-amber-300", children: "This page is locked to admin only" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700/80 dark:text-amber-400/80 mt-0.5", children: [
          "The default brand is ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "LocalBazar Kart" }),
          ". Only the authenticated admin (via Internet Identity or admin password) can change the brand name. All chatbot welcome messages update automatically on save."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandIdentitySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppVersionsSection, {})
  ] });
}
export {
  BrandingPage as default
};
