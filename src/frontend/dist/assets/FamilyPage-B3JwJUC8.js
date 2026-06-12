import { a7 as useFamilyMembers, bu as useUpdateFamilyInviteStatus, bv as useDeleteFamilyMember, r as reactExports, bw as useUpdateMatrimonyEligibility, j as jsxRuntimeExports, p as ue, bx as useDeleteFamilyLink, by as useAddFriend } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { X } from "./x-Chksmd6i.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { C as Crown } from "./crown--24r6bE7.js";
import { H as Heart } from "./heart-BUx2l_GB.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { U as UserPlus } from "./user-plus-m_STRtv4.js";
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
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7", key: "10o201" }],
  ["path", { d: "M15 7h2a5 5 0 0 1 4 8", key: "1d3206" }],
  ["line", { x1: "8", x2: "12", y1: "12", y2: "12", key: "rvw6j4" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
];
const Link2Off = createLucideIcon("link-2-off", __iconNode);
const toDate = (ts) => ts === void 0 ? /* @__PURE__ */ new Date(0) : new Date(typeof ts === "bigint" ? Number(ts) / 1e6 : ts);
const INVITE_META = {
  pending: {
    label: "Pending",
    cls: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
  },
  connected: {
    label: "Connected",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
  }
};
const RELATIONSHIP_LABELS = {
  father: "👨 Father",
  mother: "👩 Mother",
  son: "👦 Son",
  daughter: "👧 Daughter",
  husband: "💑 Husband",
  wife: "💑 Wife",
  friend: "🤝 Friend",
  brother: "👦 Brother",
  sister: "👧 Sister",
  relative: "👨‍👩‍👧‍👦 Relative"
};
function StatCard({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-1 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold font-display ${color}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
function FamilyGroupsView({ members }) {
  const deleteLink = useDeleteFamilyLink();
  const groups = reactExports.useMemo(() => {
    const map = {};
    for (const m of members) {
      const surname = m.ownerSurname || m.ownerName.split(" ").pop() || "Unknown";
      if (!map[surname]) map[surname] = [];
      map[surname].push(m);
    }
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [members]);
  if (groups.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-16 text-center text-muted-foreground text-sm",
        "data-ocid": "family.groups_empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          "No family groups found"
        ]
      }
    );
  }
  async function handleDeleteLink(id) {
    try {
      await deleteLink.mutateAsync(id);
      ue.success("Family link removed");
    } catch {
      ue.error("Failed to remove link");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: groups.map(([surname, groupMembers]) => {
    var _a;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden",
        "data-ocid": `family.group.${surname.toLowerCase()}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
                surname,
                " Family"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                groupMembers.length,
                " member",
                groupMembers.length !== 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Owner: ",
              (_a = groupMembers[0]) == null ? void 0 : _a.ownerName
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: groupMembers.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-4 py-3 hover:bg-muted/10 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0", children: m.relationName[0] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: m.relationName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: m.relationPhone }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: RELATIONSHIP_LABELS[m.relationship] ?? m.relationship })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${INVITE_META[m.inviteStatus].cls}`,
                      children: INVITE_META[m.inviteStatus].label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10",
                      onClick: () => handleDeleteLink(m.id),
                      disabled: deleteLink.isPending,
                      title: "Delete Link",
                      "data-ocid": `family.delete_link.${m.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Link2Off, { className: "w-3.5 h-3.5" }),
                        "Delete Link"
                      ]
                    }
                  )
                ] })
              ]
            },
            m.id
          )) })
        ]
      },
      surname
    );
  }) });
}
function AddFriendDialog({ onClose }) {
  const addFriend = useAddFriend();
  const [form, setForm] = reactExports.useState({
    ownerPhone: "",
    ownerName: "",
    ownerSurname: "",
    friendName: "",
    friendPhone: "",
    friendAddress: ""
  });
  async function handleSubmit() {
    if (!form.ownerPhone || !form.ownerName || !form.friendName || !form.friendPhone) {
      ue.error("Please fill all required fields");
      return;
    }
    try {
      await addFriend.mutateAsync(form);
      ue.success("Friend added successfully — invite sent");
      onClose();
    } catch {
      ue.error("Failed to add friend");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "family.add_friend_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add Friend" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Your Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Your name",
              value: form.ownerName,
              onChange: (e) => setForm((f) => ({ ...f, ownerName: e.target.value })),
              "data-ocid": "family.add_friend.owner_name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Your Surname" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Surname",
              value: form.ownerSurname,
              onChange: (e) => setForm((f) => ({ ...f, ownerSurname: e.target.value })),
              "data-ocid": "family.add_friend.owner_surname"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Your Phone *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "+91XXXXXXXXXX",
            value: form.ownerPhone,
            onChange: (e) => setForm((f) => ({ ...f, ownerPhone: e.target.value })),
            "data-ocid": "family.add_friend.owner_phone"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Friend Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Friend Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Friend's name",
                value: form.friendName,
                onChange: (e) => setForm((f) => ({ ...f, friendName: e.target.value })),
                "data-ocid": "family.add_friend.friend_name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Friend Phone *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "+91XXXXXXXXXX",
                value: form.friendPhone,
                onChange: (e) => setForm((f) => ({ ...f, friendPhone: e.target.value })),
                "data-ocid": "family.add_friend.friend_phone"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Friend Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Address",
              value: form.friendAddress,
              onChange: (e) => setForm((f) => ({ ...f, friendAddress: e.target.value })),
              "data-ocid": "family.add_friend.friend_address"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-lg p-2.5 text-xs text-muted-foreground", children: "Your friend will receive a WhatsApp invite to connect. They'll be registered as a customer." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "family.add_friend.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1",
            onClick: handleSubmit,
            disabled: addFriend.isPending,
            "data-ocid": "family.add_friend.submit_button",
            children: addFriend.isPending ? "Adding…" : "Add Friend"
          }
        )
      ] })
    ] })
  ] });
}
function FriendsView({ members }) {
  const friends = members.filter((m) => m.relationship === "friend");
  const deleteLink = useDeleteFamilyLink();
  if (friends.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-16 text-center text-muted-foreground text-sm",
        "data-ocid": "family.friends_empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          "No friends connections found"
        ]
      }
    );
  }
  async function handleDeleteLink(id) {
    try {
      await deleteLink.mutateAsync(id);
      ue.success("Friend link removed");
    } catch {
      ue.error("Failed to remove link");
    }
  }
  const byOwner = {};
  for (const f of friends) {
    if (!byOwner[f.ownerPhone]) byOwner[f.ownerPhone] = [];
    byOwner[f.ownerPhone].push(f);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Object.entries(byOwner).map(([ownerPhone, ownerFriends]) => {
    var _a;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 bg-muted/30 border-b border-border flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
              (_a = ownerFriends[0]) == null ? void 0 : _a.ownerName,
              "'s Friends"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: ownerFriends.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: ownerFriends.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-4 py-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold shrink-0", children: f.relationName[0] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: f.relationName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: f.relationPhone })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${INVITE_META[f.inviteStatus].cls}`,
                      children: INVITE_META[f.inviteStatus].label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10",
                      onClick: () => handleDeleteLink(f.id),
                      disabled: deleteLink.isPending,
                      "data-ocid": `family.friend_delete_link.${f.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2Off, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              ]
            },
            f.id
          )) })
        ]
      },
      ownerPhone
    );
  }) });
}
const EDUCATION_OPTIONS = [
  "Below 10th",
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate",
  "Post-Graduate",
  "Doctorate"
];
const BLOOD_GROUP_OPTIONS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
function MatrimonyEditDialog({
  member,
  onClose,
  onSave
}) {
  const [saving, setSaving] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    eligible: member.isMatrimonyEligible ?? false,
    gender: member.gender ?? "",
    caste: member.caste ?? "",
    occupation: member.occupation ?? "",
    education: member.education ?? "",
    locationPreference: member.locationPreference ?? "",
    bloodGroup: member.bloodGroup ?? "",
    age: member.age != null ? Number(member.age) : void 0
  });
  async function handleSave() {
    setSaving(true);
    try {
      await onSave({
        eligible: form.eligible,
        gender: form.gender || void 0,
        caste: form.caste || void 0,
        occupation: form.occupation || void 0,
        education: form.education || void 0,
        locationPreference: form.locationPreference || void 0,
        bloodGroup: form.bloodGroup || void 0,
        age: form.age
      });
      ue.success(
        form.eligible ? "Matrimony profile updated" : "Matrimony eligibility removed"
      );
      onClose();
    } catch {
      ue.error("Failed to update matrimony profile");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", "data-ocid": "family.matrimony_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-amber-500" }),
      "Matrimony Profile — ",
      member.relationName
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": form.eligible,
            onClick: () => setForm((f) => ({ ...f, eligible: !f.eligible })),
            className: `relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${form.eligible ? "bg-amber-500" : "bg-muted-foreground/30"}`,
            "data-ocid": "family.matrimony_eligible_toggle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${form.eligible ? "translate-x-4" : "translate-x-0.5"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Mark as Matrimony Eligible" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Profile will appear in partner search" })
        ] })
      ] }),
      form.eligible && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Gender *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.gender,
              onValueChange: (v) => setForm((f) => ({ ...f, gender: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "family.matrimony.gender_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Male", children: "Male" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Female", children: "Female" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Other", children: "Other" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Caste" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Enter caste",
                value: form.caste,
                onChange: (e) => setForm((f) => ({ ...f, caste: e.target.value })),
                "data-ocid": "family.matrimony.caste_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Occupation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Job / profession",
                value: form.occupation,
                onChange: (e) => setForm((f) => ({ ...f, occupation: e.target.value })),
                "data-ocid": "family.matrimony.occupation_input"
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "family.matrimony.education_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select education" }) }),
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
                value: form.bloodGroup,
                onValueChange: (v) => setForm((f) => ({ ...f, bloodGroup: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "family.matrimony.blood_group_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select blood group" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BLOOD_GROUP_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
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
                placeholder: "City / region",
                value: form.locationPreference,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  locationPreference: e.target.value
                })),
                "data-ocid": "family.matrimony.location_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Age" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "Age in years",
                value: form.age ?? "",
                onChange: (e) => setForm((f) => ({
                  ...f,
                  age: e.target.value ? Number.parseInt(e.target.value, 10) : void 0
                })),
                "data-ocid": "family.matrimony.age_input"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "family.matrimony.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1 bg-amber-500 hover:bg-amber-600 text-white",
            onClick: handleSave,
            disabled: saving,
            "data-ocid": "family.matrimony.save_button",
            children: saving ? "Saving…" : "Save Profile"
          }
        )
      ] })
    ] })
  ] });
}
function FamilyPage() {
  const {
    data: members = [],
    isLoading,
    isError,
    error,
    refetch
  } = useFamilyMembers();
  const updateInviteStatus = useUpdateFamilyInviteStatus();
  const deleteMember = useDeleteFamilyMember();
  const [inviteFilter, setInviteFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [selectedMember, setSelectedMember] = reactExports.useState(
    null
  );
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [showAddFriendDialog, setShowAddFriendDialog] = reactExports.useState(false);
  const [matrimonyMember, setMatrimonyMember] = reactExports.useState(null);
  const updateMatrimony = useUpdateMatrimonyEligibility();
  const filtered = members.filter((m) => {
    if (inviteFilter !== "all" && m.inviteStatus !== inviteFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!m.ownerName.toLowerCase().includes(q) && !m.relationName.toLowerCase().includes(q) && !m.ownerPhone.includes(q) && !m.relationPhone.includes(q))
        return false;
    }
    return true;
  });
  const total = members.length;
  const connected = members.filter(
    (m) => m.inviteStatus === "connected"
  ).length;
  const pending = members.filter((m) => m.inviteStatus === "pending").length;
  const cancelled = members.filter(
    (m) => m.inviteStatus === "cancelled"
  ).length;
  const uniqueOwners = new Set(members.map((m) => m.ownerPhone)).size;
  const friendsCount = members.filter(
    (m) => m.relationship === "friend"
  ).length;
  const matrimonyMemberM = members;
  const matrimonyCount = matrimonyMemberM.filter(
    (m) => m.isMatrimonyEligible
  ).length;
  async function handleStatusChange(id, status) {
    try {
      await updateInviteStatus.mutateAsync({
        id,
        status
      });
      ue.success("Invite status updated");
    } catch {
      ue.error("Failed to update status");
    }
  }
  async function handleDelete(id) {
    try {
      await deleteMember.mutateAsync(id);
      setSelectedMember(null);
      setDeleteId(null);
      ue.success("Family member removed");
    } catch {
      ue.error("Failed to delete");
    }
  }
  function handleExport() {
    const rows = members.map(
      (m) => [
        m.id,
        m.ownerName,
        m.ownerSurname,
        m.ownerPhone,
        m.relationName,
        m.relationPhone,
        m.relationship,
        m.address,
        m.inviteStatus,
        toDate(m.createdAt).toLocaleDateString("en-IN")
      ].join(",")
    );
    const csv = [
      "ID,Owner Name,Surname,Owner Phone,Relation Name,Relation Phone,Relationship,Address,Invite Status,Created At",
      ...rows
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Family Groups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage family member connections and invite statuses" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2 shrink-0",
          onClick: handleExport,
          "data-ocid": "family.export_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            " Export CSV"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Records", value: total, color: "text-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Connected",
          value: connected,
          color: "text-emerald-600 dark:text-emerald-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending",
          value: pending,
          color: "text-amber-600 dark:text-amber-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Cancelled",
          value: cancelled,
          color: "text-destructive"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Unique Users",
          value: uniqueOwners,
          color: "text-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Friends",
          value: friendsCount,
          color: "text-blue-600 dark:text-blue-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Matrimony",
          value: matrimonyCount,
          color: "text-amber-600 dark:text-amber-400"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", "data-ocid": "family.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "family.tab.all", children: "All Members" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "groups", "data-ocid": "family.tab.groups", children: "Family Groups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "friends", "data-ocid": "family.tab.friends", children: [
          "Friends (",
          friendsCount,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "all", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: inviteFilter,
                onValueChange: (v) => setInviteFilter(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-36 h-8 text-sm",
                      "data-ocid": "family.status_filter.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Invite Status" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "connected", children: "Connected" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search name or phone...",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-8 h-8 text-sm w-56",
                  "data-ocid": "family.search_input"
                }
              )
            ] }),
            hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 gap-1 text-muted-foreground",
                onClick: () => {
                  setInviteFilter("all");
                  setSearch("");
                },
                "data-ocid": "family.clear_filters_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                  " Clear"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            filtered.length,
            " of ",
            members.length,
            " records"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["f1", "f2", "f3", "f4", "f5", "f6"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, s)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center",
            "data-ocid": "family.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-destructive/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: "Failed to load family members" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: error instanceof Error ? error.message : "Could not connect to backend. Check canister deployment." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => refetch(),
                  "data-ocid": "family.retry_button",
                  children: "Retry"
                }
              )
            ]
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center",
            "data-ocid": "family.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No family members yet. Load Sample Data to see example records." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "family.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Owner" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Relationship" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Relation Person" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Relation Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Gender" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Invite Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Added" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((member, idx) => {
            const meta = INVITE_META[member.inviteStatus];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                "data-ocid": `family.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0", children: member.ownerName[0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium truncate max-w-[120px]", children: [
                        member.ownerName,
                        member.ownerSurname && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-1", children: member.ownerSurname })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: member.ownerPhone })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: RELATIONSHIP_LABELS[member.relationship] ?? member.relationship }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: member.relationName }),
                    member.isMatrimonyEligible && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-2.5 h-2.5" }),
                      "Matrimony"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: member.relationPhone }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[120px] block", children: member.address }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: member.gender ?? "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: member.inviteStatus,
                      onValueChange: (v) => handleStatusChange(member.id, v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-7 w-32 border-0 p-0 focus:ring-0 text-xs",
                            "data-ocid": `family.invite_select.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${meta.cls}`,
                                children: meta.label
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "connected", children: "Connected" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
                        ] })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: toDate(member.createdAt).toLocaleDateString(
                    "en-IN"
                  ) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-7 px-2 text-xs gap-1",
                        onClick: () => setSelectedMember(member),
                        "data-ocid": `family.view_button.${idx + 1}`,
                        children: "View"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-7 px-2 text-xs gap-1 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30",
                        onClick: () => setMatrimonyMember(
                          member
                        ),
                        title: "Edit Matrimony Profile",
                        "data-ocid": `family.matrimony_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10",
                        onClick: () => setDeleteId(member.id),
                        "data-ocid": `family.delete_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2Off, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-7 w-7 p-0 text-destructive hover:bg-destructive/10",
                        onClick: () => setDeleteId(member.id),
                        "data-ocid": `family.remove_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              member.id
            );
          }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "groups", className: "mt-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["g1", "g2", "g3"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, s)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FamilyGroupsView, { members }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "friends", className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5",
            onClick: () => setShowAddFriendDialog(true),
            "data-ocid": "family.add_friend_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
              " Add Friend"
            ]
          }
        ) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["fr1", "fr2"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, s)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FriendsView, { members })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!matrimonyMember,
        onOpenChange: () => setMatrimonyMember(null),
        children: matrimonyMember && /* @__PURE__ */ jsxRuntimeExports.jsx(
          MatrimonyEditDialog,
          {
            member: matrimonyMember,
            onClose: () => setMatrimonyMember(null),
            onSave: async (data) => {
              await updateMatrimony.mutateAsync({
                memberId: matrimonyMember.id,
                ...data
              });
              setMatrimonyMember(null);
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAddFriendDialog, onOpenChange: setShowAddFriendDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddFriendDialog, { onClose: () => setShowAddFriendDialog(false) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedMember,
        onOpenChange: () => setSelectedMember(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "family.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Family Member Details" }) }),
          selectedMember && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Owner" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: selectedMember.ownerName }),
                selectedMember.ownerSurname && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  selectedMember.ownerSurname,
                  " family"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: selectedMember.ownerPhone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Relationship" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: RELATIONSHIP_LABELS[selectedMember.relationship] ?? selectedMember.relationship })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Relation Person" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: selectedMember.relationName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: selectedMember.relationPhone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Invite Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${INVITE_META[selectedMember.inviteStatus].cls}`,
                    children: INVITE_META[selectedMember.inviteStatus].label
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: selectedMember.address })
            ] }),
            selectedMember.gender && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: selectedMember.gender })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Added On" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: toDate(selectedMember.createdAt).toLocaleDateString("en-IN") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setSelectedMember(null),
                  "data-ocid": "family.close_button",
                  children: "Close"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  className: "gap-1.5",
                  onClick: () => {
                    setDeleteId(selectedMember.id);
                    setSelectedMember(null);
                  },
                  "data-ocid": "family.delete_link_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link2Off, { className: "w-4 h-4" }),
                    " Delete Link"
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteId, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-sm",
        "data-ocid": "family.confirm_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Remove Family Connection?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This will permanently remove the family link. The connection cannot be restored without re-inviting." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteId(null),
                "data-ocid": "family.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: () => {
                  if (deleteId) handleDelete(deleteId);
                },
                "data-ocid": "family.confirm_button",
                children: "Remove Link"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  FamilyPage as default
};
