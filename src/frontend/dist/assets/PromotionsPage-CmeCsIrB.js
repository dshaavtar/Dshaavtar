import { a5 as usePromotions, bz as useApprovePromotion, bA as useRejectPromotion, bB as useDeletePromotion, r as reactExports, bC as usePromotionAnalytics, j as jsxRuntimeExports, p as ue, bD as useCreatePromotion, ac as useListCities } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { D as Download } from "./download-CLKg6_Fv.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { M as Megaphone } from "./megaphone-BO0GtYln.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { X } from "./x-Chksmd6i.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { C as ChartColumn } from "./chart-column-1UICj-Tf.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
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
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const STATUS_META = {
  pendingApproval: {
    label: "Pending Approval",
    cls: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
  },
  pendingPayment: {
    label: "Pending Payment",
    cls: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800"
  },
  active: {
    label: "Active",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
  },
  rejected: {
    label: "Rejected",
    cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
  },
  expired: {
    label: "Expired",
    cls: "bg-muted text-muted-foreground border-border"
  },
  paused: {
    label: "Paused",
    cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
  }
};
function getStatusMeta(status) {
  return STATUS_META[status] ?? {
    cls: "bg-muted text-muted-foreground border-border",
    label: status
  };
}
const REACH_PLANS = [
  { value: "plan_100", reach: 100, price: 99, label: "100 users — ₹99" },
  { value: "plan_200", reach: 200, price: 199, label: "200 users — ₹199" },
  { value: "plan_500", reach: 500, price: 399, label: "500 users — ₹399" },
  { value: "plan_1000", reach: 1e3, price: 699, label: "1,000 users — ₹699" },
  {
    value: "plan_2000",
    reach: 2e3,
    price: 1199,
    label: "2,000 users — ₹1,199"
  }
];
function StatCard({
  label,
  value,
  icon: Icon,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-start gap-3 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold font-display text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-tight", children: label })
    ] })
  ] });
}
function ReachBar({ reached, total }) {
  const pct = total > 0 ? Math.min(100, Math.round(reached / total * 100)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-[100px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-primary h-1.5 rounded-full transition-all",
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums text-muted-foreground w-8 text-right", children: [
      pct,
      "%"
    ] })
  ] });
}
function CreatePromotionDialog({ onClose }) {
  const createPromotion = useCreatePromotion();
  const citiesForPromo = useListCities();
  const [promoAreas, setPromoAreas] = reactExports.useState([]);
  const [selectedAreas, setSelectedAreas] = reactExports.useState([]);
  const [targetUserCount, setTargetUserCount] = reactExports.useState(100);
  const [form, setForm] = reactExports.useState({
    advertiserPhone: "",
    title: "",
    reelLink: "",
    imageLink: "",
    locationArea: "",
    locationCity: "",
    locationCountry: "India",
    subscriptionPlan: "plan_100"
  });
  async function handleSubmit() {
    if (!form.advertiserPhone || !form.title || !form.locationCity) {
      ue.error("Please fill all required fields");
      return;
    }
    try {
      await createPromotion.mutateAsync(form);
      ue.success("Promotion submitted — pending approval and AI moderation");
      onClose();
    } catch {
      ue.error("Failed to create promotion");
    }
  }
  const selectedPlan = REACH_PLANS.find(
    (p) => p.value === form.subscriptionPlan
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "promotions.create_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Post Advertisement" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Advertiser Phone *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "+91XXXXXXXXXX",
                value: form.advertiserPhone,
                onChange: (e) => setForm((f) => ({ ...f, advertiserPhone: e.target.value })),
                "data-ocid": "promotions.create.phone_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ad Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. 50% off at Sharma Kirana this weekend!",
                value: form.title,
                onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                "data-ocid": "promotions.create.title_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Social Media Reel Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "https://instagram.com/reel/...",
                value: form.reelLink,
                onChange: (e) => setForm((f) => ({ ...f, reelLink: e.target.value })),
                "data-ocid": "promotions.create.reel_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "https://example.com/image.jpg",
                value: form.imageLink,
                onChange: (e) => setForm((f) => ({ ...f, imageLink: e.target.value })),
                "data-ocid": "promotions.create.image_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Area/Locality" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. Connaught Place",
                  value: form.locationArea,
                  onChange: (e) => setForm((f) => ({ ...f, locationArea: e.target.value })),
                  "data-ocid": "promotions.create.area_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.locationCity,
                  onValueChange: (val) => {
                    setForm((f) => ({ ...f, locationCity: val }));
                    setSelectedAreas([]);
                    setPromoAreas([
                      "North",
                      "South",
                      "East",
                      "West",
                      "Central",
                      "Old City",
                      "New Area",
                      "Industrial Zone",
                      "IT Hub",
                      "Suburbs"
                    ]);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "promotions.create.city_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a city..." }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Array.isArray(citiesForPromo) ? citiesForPromo.map((c) => {
                      const id = c.id ?? c.cityId ?? c.name ?? "";
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: id, children: c.name ?? c.cityName ?? id }, id);
                    }) : null })
                  ]
                }
              )
            ] }),
            form.locationCity && promoAreas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Target Areas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto border rounded-md p-2", children: promoAreas.map((area) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: "flex items-center gap-1.5 text-sm cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: selectedAreas.includes(area),
                        onChange: (e) => {
                          const next = e.target.checked ? [...selectedAreas, area] : selectedAreas.filter((a) => a !== area);
                          setSelectedAreas(next);
                          setForm((f) => ({
                            ...f,
                            locationArea: next.join(", ")
                          }));
                        },
                        "data-ocid": "promotions.create.area_checkbox"
                      }
                    ),
                    area
                  ]
                },
                area
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Max Users to Receive Ad" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 10,
                  max: 1e4,
                  value: targetUserCount,
                  onChange: (e) => setTargetUserCount(Number(e.target.value)),
                  "data-ocid": "promotions.create.user_count_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Promotion will be sent to at most this many users after admin approval." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Subscription Plan (Reach)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.subscriptionPlan,
                onValueChange: (v) => setForm((f) => ({ ...f, subscriptionPlan: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "promotions.create.plan_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REACH_PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, children: p.label }, p.value)) })
                ]
              }
            )
          ] }),
          selectedPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-sm", children: [
            "Promotion will reach up to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              selectedPlan.reach.toLocaleString(),
              " users"
            ] }),
            " in",
            " ",
            form.locationCity || "the target city",
            ".",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
              "₹",
              selectedPlan.price,
              " + taxes"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-xs text-amber-700 dark:text-amber-300", children: "🛡️ After submission, AI moderation will check for hate speech, spam, misleading content, violence, or nudity before approval." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "promotions.create.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: handleSubmit,
                disabled: createPromotion.isPending,
                "data-ocid": "promotions.create.submit_button",
                children: createPromotion.isPending ? "Submitting…" : "Submit for Review"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function PromotionsPage() {
  const { data: promotions = [], isLoading } = usePromotions();
  const approvePromotion = useApprovePromotion();
  const rejectPromotion = useRejectPromotion();
  const deletePromotion = useDeletePromotion();
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [search, setSearch] = reactExports.useState("");
  const [analyticsPromoId, setAnalyticsPromoId] = reactExports.useState(null);
  const [rejectPromo, setRejectPromo] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const { data: analyticsData } = usePromotionAnalytics();
  const analyticsPromo = analyticsPromoId ? promotions.find((p) => p.id === analyticsPromoId) ?? null : null;
  const filtered = promotions.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.advertiserName.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q))
        return false;
    }
    return true;
  });
  const totalPromos = promotions.length;
  const activePromos = promotions.filter((p) => p.status === "active").length;
  const totalReach = promotions.reduce((s, p) => s + p.usersReached, 0);
  const totalViewed = promotions.reduce((s, p) => s + p.usersViewed, 0);
  async function handleApprove(id) {
    try {
      await approvePromotion.mutateAsync(id);
      ue.success("Promotion approved");
    } catch {
      ue.error("Failed to approve promotion");
    }
  }
  async function handleReject() {
    if (!rejectPromo) return;
    try {
      await rejectPromotion.mutateAsync({
        id: rejectPromo.id,
        reason: rejectReason || "Does not meet community guidelines"
      });
      setRejectPromo(null);
      setRejectReason("");
      ue.success("Promotion rejected");
    } catch {
      ue.error("Failed to reject promotion");
    }
  }
  async function handleDelete(id) {
    try {
      await deletePromotion.mutateAsync(id);
      setDeleteId(null);
      ue.success("Promotion deleted");
    } catch {
      ue.error("Failed to delete");
    }
  }
  function handleExport() {
    const rows = promotions.map(
      (p) => [
        p.id,
        p.title,
        p.advertiserName,
        p.advertiserPhone,
        p.areaName,
        p.city,
        p.country,
        p.planUsersReach,
        p.status,
        p.usersReached,
        p.usersViewed,
        new Date(p.createdAt).toLocaleDateString("en-IN"),
        new Date(p.expiresAt).toLocaleDateString("en-IN")
      ].join(",")
    );
    const csv = [
      "ID,Title,Advertiser,Phone,Area,City,Country,Plan Users,Status,Users Reached,Users Viewed,Created At,Expires At",
      ...rows
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "promotions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  const hasFilters = statusFilter !== "all" || search;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Promotions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage advertisements, approvals, and reach analytics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "gap-2",
            onClick: handleExport,
            "data-ocid": "promotions.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Export CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "gap-2",
            onClick: () => setShowCreateDialog(true),
            "data-ocid": "promotions.create_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Post Ad"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Promotions",
          value: totalPromos,
          icon: Megaphone,
          color: "bg-primary/10 text-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active",
          value: activePromos,
          icon: TrendingUp,
          color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Reach",
          value: totalReach.toLocaleString("en-IN"),
          icon: Users,
          color: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Views",
          value: totalViewed.toLocaleString("en-IN"),
          icon: Eye,
          color: "bg-violet-100 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: statusFilter,
            onValueChange: (v) => setStatusFilter(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-44 h-8 text-sm",
                  "data-ocid": "promotions.status_filter.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pendingPayment", children: "Pending Payment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pendingApproval", children: "Pending Approval" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rejected", children: "Rejected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "expired", children: "Expired" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "paused", children: "Paused" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search title, advertiser, city...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-8 h-8 text-sm w-56",
              "data-ocid": "promotions.search_input"
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
              setStatusFilter("all");
              setSearch("");
            },
            "data-ocid": "promotions.clear_filters_button",
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
        promotions.length,
        " promotions"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["p1", "p2", "p3", "p4", "p5"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, s)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-16 text-center",
        "data-ocid": "promotions.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No promotions found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setShowCreateDialog(true),
              "data-ocid": "promotions.empty_create_button",
              children: "Post an Ad"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "promotions.table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Plan (Reach)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Reached / Viewed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Expires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((promo, idx) => {
        const meta = getStatusMeta(promo.status);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
            "data-ocid": `promotions.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                promo.imageLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: promo.imageLink,
                    alt: promo.title,
                    className: "w-10 h-10 rounded-md object-cover shrink-0 border border-border",
                    onError: (e) => {
                      e.currentTarget.style.display = "none";
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[180px]", children: promo.title })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: promo.advertiserPhone }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: promo.areaName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  promo.city,
                  ", ",
                  promo.country
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 whitespace-nowrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tabular-nums", children: promo.planUsersReach.toLocaleString("en-IN") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "users" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${meta.cls}`,
                    children: meta.label
                  }
                ),
                promo.status === "rejected" && promo.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1 max-w-[120px] truncate", children: promo.rejectionReason })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-medium", children: promo.usersReached.toLocaleString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "reached" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ReachBar,
                  {
                    reached: promo.usersReached,
                    total: promo.planUsersReach
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-medium", children: promo.usersViewed.toLocaleString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "viewed" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 whitespace-nowrap text-xs text-muted-foreground", children: new Date(promo.createdAt).toLocaleDateString("en-IN") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 whitespace-nowrap text-xs text-muted-foreground", children: new Date(promo.expiresAt).toLocaleDateString("en-IN") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
                (promo.status === "pendingApproval" || promo.status === "pendingPayment") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 px-2 text-xs gap-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
                      onClick: () => handleApprove(promo.id),
                      "data-ocid": `promotions.approve_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                        " Approve"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10",
                      onClick: () => setRejectPromo(promo),
                      "data-ocid": `promotions.reject_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                        " Reject"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-7 px-2 text-xs gap-1",
                    onClick: () => setAnalyticsPromoId(promo.id),
                    "data-ocid": `promotions.analytics_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-7 w-7 p-0 text-destructive hover:bg-destructive/10",
                    onClick: () => setDeleteId(promo.id),
                    "data-ocid": `promotions.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          promo.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCreateDialog, onOpenChange: setShowCreateDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreatePromotionDialog, { onClose: () => setShowCreateDialog(false) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!analyticsPromoId,
        onOpenChange: () => setAnalyticsPromoId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "sm:max-w-lg",
            "data-ocid": "promotions.analytics_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-primary" }),
                " Promotion Analytics"
              ] }) }),
              analyticsPromo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-muted/30 rounded-lg p-3", children: [
                  analyticsPromo.imageLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: analyticsPromo.imageLink,
                      alt: "",
                      className: "w-14 h-14 rounded-md object-cover shrink-0 border border-border",
                      onError: (e) => {
                        e.currentTarget.style.display = "none";
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: analyticsPromo.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      analyticsPromo.advertiserName,
                      " · ",
                      analyticsPromo.areaName,
                      ",",
                      " ",
                      analyticsPromo.city
                    ] }),
                    analyticsPromo.reelLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: analyticsPromo.reelLink,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3" }),
                          " View Reel"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Target Reach" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg font-display", children: analyticsPromo.planUsersReach.toLocaleString("en-IN") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Reached" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg font-display text-primary", children: analyticsPromo.usersReached.toLocaleString("en-IN") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      analyticsPromo.planUsersReach > 0 ? Math.round(
                        analyticsPromo.usersReached / analyticsPromo.planUsersReach * 100
                      ) : 0,
                      "% of target"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Viewed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg font-display text-emerald-600 dark:text-emerald-400", children: analyticsPromo.usersViewed.toLocaleString("en-IN") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      analyticsPromo.usersReached > 0 ? Math.round(
                        analyticsPromo.usersViewed / analyticsPromo.usersReached * 100
                      ) : 0,
                      "% view rate"
                    ] })
                  ] })
                ] }),
                analyticsData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-sm text-muted-foreground", children: [
                  "Status:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground capitalize", children: String(analyticsData.status) }),
                  " ",
                  "· Reached:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: Number(analyticsData.reachedCount) }),
                  " ",
                  "· Viewed:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: Number(analyticsData.viewedCount) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full",
                    onClick: () => setAnalyticsPromoId(null),
                    "data-ocid": "promotions.analytics_close_button",
                    children: "Close"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!rejectPromo,
        onOpenChange: () => {
          setRejectPromo(null);
          setRejectReason("");
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "sm:max-w-md",
            "data-ocid": "promotions.reject_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject Promotion" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Provide a reason for rejection. This will be shown to the advertiser." }),
                rejectPromo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: rejectPromo.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: rejectPromo.advertiserName })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rejection Reason" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      placeholder: "e.g. Content does not meet community guidelines...",
                      rows: 3,
                      value: rejectReason,
                      onChange: (e) => setRejectReason(e.target.value),
                      "data-ocid": "promotions.reject_reason_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => {
                        setRejectPromo(null);
                        setRejectReason("");
                      },
                      "data-ocid": "promotions.reject_cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "destructive",
                      className: "flex-1",
                      onClick: handleReject,
                      "data-ocid": "promotions.reject_confirm_button",
                      children: "Reject Promotion"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteId, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-sm",
        "data-ocid": "promotions.delete_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Promotion?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This action cannot be undone." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteId(null),
                "data-ocid": "promotions.delete_cancel_button",
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
                "data-ocid": "promotions.delete_confirm_button",
                children: "Delete"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  PromotionsPage as default
};
