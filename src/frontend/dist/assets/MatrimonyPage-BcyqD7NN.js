import { r as reactExports, bw as useUpdateMatrimonyEligibility, dH as useMatrimonyMembers, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { C as Crown } from "./crown--24r6bE7.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { X } from "./x-Chksmd6i.js";
import { H as Heart } from "./heart-BUx2l_GB.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
const EDUCATION_OPTIONS = [
  "All",
  "Below 10th",
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate",
  "Post-Graduate",
  "Doctorate"
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
  "AB-"
];
const EDUCATION_EDIT_OPTIONS = EDUCATION_OPTIONS.slice(1);
const BLOOD_GROUP_EDIT_OPTIONS = BLOOD_GROUP_OPTIONS.slice(1);
function ProfileBadge({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800", children });
}
function EditProfileDialog({
  profile,
  onClose
}) {
  const updateMatrimony = useUpdateMatrimonyEligibility();
  const [form, setForm] = reactExports.useState({
    caste: profile.caste ?? "",
    occupation: profile.occupation ?? "",
    education: profile.education ?? "",
    locationPreference: profile.locationPreference ?? "",
    bloodGroup: profile.bloodGroup ?? "",
    age: profile.age != null ? Number(profile.age) : ""
  });
  async function handleSave() {
    try {
      await updateMatrimony.mutateAsync({
        memberId: profile.memberId,
        eligible: true,
        caste: form.caste || void 0,
        occupation: form.occupation || void 0,
        education: form.education || void 0,
        locationPreference: form.locationPreference || void 0,
        bloodGroup: form.bloodGroup || void 0,
        age: form.age !== "" ? Number(form.age) : void 0
      });
      ue.success("Matrimony profile updated");
      onClose();
    } catch {
      ue.error("Failed to update profile");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", "data-ocid": "matrimony.edit_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-amber-500" }),
      "Edit Matrimony Profile — ",
      profile.memberName
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Caste" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.caste,
              onChange: (e) => setForm((f) => ({ ...f, caste: e.target.value })),
              placeholder: "Enter caste",
              "data-ocid": "matrimony.edit.caste_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Occupation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.occupation,
              onChange: (e) => setForm((f) => ({ ...f, occupation: e.target.value })),
              placeholder: "Profession",
              "data-ocid": "matrimony.edit.occupation_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Education" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.education,
              onValueChange: (v) => setForm((f) => ({ ...f, education: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "matrimony.edit.education_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EDUCATION_EDIT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Blood Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.bloodGroup,
              onValueChange: (v) => setForm((f) => ({ ...f, bloodGroup: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "matrimony.edit.blood_group_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BLOOD_GROUP_EDIT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Location Preference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.locationPreference,
              onChange: (e) => setForm((f) => ({ ...f, locationPreference: e.target.value })),
              placeholder: "City / region",
              "data-ocid": "matrimony.edit.location_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Age" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: form.age,
              onChange: (e) => setForm((f) => ({ ...f, age: e.target.value })),
              placeholder: "Age",
              "data-ocid": "matrimony.edit.age_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "matrimony.edit.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1 bg-amber-500 hover:bg-amber-600 text-white",
            onClick: handleSave,
            disabled: updateMatrimony.isPending,
            "data-ocid": "matrimony.edit.save_button",
            children: updateMatrimony.isPending ? "Saving…" : "Save Changes"
          }
        )
      ] })
    ] })
  ] });
}
function MatrimonyPage() {
  const [filters, setFilters] = reactExports.useState({
    caste: "",
    location: "",
    education: "",
    bloodGroup: ""
  });
  const [appliedFilters, setAppliedFilters] = reactExports.useState({
    caste: "",
    location: "",
    education: "",
    bloodGroup: ""
  });
  const [editProfile, setEditProfile] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const updateMatrimony = useUpdateMatrimonyEligibility();
  const queryFilters = {
    caste: appliedFilters.caste || void 0,
    location: appliedFilters.location || void 0,
    education: appliedFilters.education && appliedFilters.education !== "All" ? appliedFilters.education : void 0,
    bloodGroup: appliedFilters.bloodGroup && appliedFilters.bloodGroup !== "All" ? appliedFilters.bloodGroup : void 0
  };
  const { data: profiles = [], isLoading } = useMatrimonyMembers(queryFilters);
  const hasFilters = filters.caste || filters.location || filters.education || filters.bloodGroup;
  function handleSearch() {
    setAppliedFilters({ ...filters });
  }
  function handleClear() {
    setFilters({ caste: "", location: "", education: "", bloodGroup: "" });
    setAppliedFilters({
      caste: "",
      location: "",
      education: "",
      bloodGroup: ""
    });
  }
  async function handleDelete(memberId) {
    try {
      await updateMatrimony.mutateAsync({ memberId, eligible: false });
      ue.success("Matrimony eligibility removed");
      setDeleteId(null);
    } catch {
      ue.error("Failed to remove eligibility");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-amber-500" }),
        "Matrimony Members"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Elite matrimony profiles for eligible family members" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Caste" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Filter by caste",
              value: filters.caste,
              onChange: (e) => setFilters((f) => ({ ...f, caste: e.target.value })),
              "data-ocid": "matrimony.caste_filter"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "City / region",
              value: filters.location,
              onChange: (e) => setFilters((f) => ({ ...f, location: e.target.value })),
              "data-ocid": "matrimony.location_filter"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Education" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: filters.education || "All",
              onValueChange: (v) => setFilters((f) => ({ ...f, education: v === "All" ? "" : v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "matrimony.education_filter.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EDUCATION_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Blood Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: filters.bloodGroup || "All",
              onValueChange: (v) => setFilters((f) => ({ ...f, bloodGroup: v === "All" ? "" : v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "matrimony.blood_group_filter.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BLOOD_GROUP_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5",
            onClick: handleSearch,
            "data-ocid": "matrimony.search_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5" }),
              " Search"
            ]
          }
        ),
        hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "gap-1 text-muted-foreground",
            onClick: handleClear,
            "data-ocid": "matrimony.clear_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
              " Clear"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
          profiles.length,
          " profile",
          profiles.length !== 1 ? "s" : "",
          " found"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["m1", "m2", "m3", "m4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, k)) }) : profiles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-16 text-center",
        "data-ocid": "matrimony.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-12 h-12 text-amber-300/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-semibold text-foreground", children: "No Matrimony Profiles Yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Mark family members as matrimony eligible from the Family Groups page to see them here." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "matrimony.table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Age" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Caste" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Occupation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Education" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Location Pref." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Blood Group" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Owner Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Relationship" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: profiles.map((profile, idx) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
            "data-ocid": `matrimony.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-amber-700 dark:text-amber-400 text-xs font-bold shrink-0", children: (_a = profile.memberName[0]) == null ? void 0 : _a.toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: profile.memberName })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: profile.age != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Number(profile.age),
                " yrs"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: profile.caste ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileBadge, { children: profile.caste }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: profile.occupation || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: profile.education ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs font-normal",
                  children: profile.education
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: profile.locationPreference || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: profile.bloodGroup ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400", children: profile.bloodGroup }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: profile.ownerPhone }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground capitalize", children: profile.ownerRelationship }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-7 px-2 text-xs gap-1",
                    onClick: () => setEditProfile(profile),
                    "data-ocid": `matrimony.edit_button.${idx + 1}`,
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-7 w-7 p-0 text-destructive hover:bg-destructive/10",
                    onClick: () => setDeleteId(profile.memberId),
                    "data-ocid": `matrimony.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          profile.memberId
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editProfile, onOpenChange: () => setEditProfile(null), children: editProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileDialog,
      {
        profile: editProfile,
        onClose: () => setEditProfile(null)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteId, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-sm",
        "data-ocid": "matrimony.confirm_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Remove Matrimony Eligibility?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This will remove the member from matrimony search results. Their family record is not affected." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteId(null),
                "data-ocid": "matrimony.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: () => deleteId && handleDelete(deleteId),
                disabled: updateMatrimony.isPending,
                "data-ocid": "matrimony.confirm_button",
                children: "Remove"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  MatrimonyPage as default
};
