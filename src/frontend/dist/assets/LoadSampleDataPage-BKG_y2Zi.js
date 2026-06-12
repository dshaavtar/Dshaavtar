import { n as useSeedSampleData, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Dx8tJeYi.js";
import { D as Database } from "./database-CADlqd_q.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
const ENTITY_ORDER = [
  { key: "cities", label: "Cities" },
  { key: "users", label: "Users (Customers)" },
  { key: "merchants", label: "Merchants" },
  { key: "deliveryPartners", label: "Delivery Partners" },
  { key: "products", label: "Products" },
  { key: "orders", label: "Orders" },
  { key: "jobs", label: "Jobs" },
  { key: "properties", label: "Properties" },
  { key: "events", label: "Events" },
  { key: "healthcare", label: "Healthcare Providers" },
  { key: "tours", label: "Tours & Travel" },
  { key: "professionalServices", label: "Professional Services" },
  { key: "manufacturers", label: "Manufacturers" },
  { key: "manufacturerProducts", label: "Mfr. Products" },
  { key: "distributors", label: "Distributors" },
  { key: "expiryReturns", label: "Expiry Returns" },
  { key: "donations", label: "Donations" },
  { key: "matrimony", label: "Matrimony Profiles" },
  { key: "communityGroups", label: "Community Groups" },
  { key: "languageCourses", label: "Language Courses" },
  { key: "blogPosts", label: "Blog Posts" },
  { key: "lendingRecords", label: "Lending Records" }
];
function StatusBadge({ status }) {
  if (status === "pending")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-muted-foreground", children: "Pending" });
  if (status === "running")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 mr-1 animate-spin" }),
      "Running"
    ] });
  if (status === "done")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
      "Done"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
    "Error"
  ] });
}
function LoadSampleDataPage() {
  const seedMutation = useSeedSampleData();
  const [entityStates, setEntityStates] = reactExports.useState({});
  const [totalCreated, setTotalCreated] = reactExports.useState(null);
  const [animating, setAnimating] = reactExports.useState(false);
  const [currentIdx, setCurrentIdx] = reactExports.useState(-1);
  async function runAnimation() {
    setAnimating(true);
    setEntityStates({});
    setTotalCreated(null);
    setCurrentIdx(-1);
    for (let i = 0; i < ENTITY_ORDER.length; i++) {
      setCurrentIdx(i);
      setEntityStates((prev) => ({
        ...prev,
        [ENTITY_ORDER[i].key]: { status: "running", count: 0 }
      }));
      await new Promise((res) => setTimeout(res, 120));
    }
  }
  async function handleLoadAll() {
    void runAnimation();
    try {
      const summary = await seedMutation.mutateAsync();
      const counts = {
        users: summary.customers ?? 0,
        merchants: summary.merchants ?? 0,
        deliveryPartners: summary.deliveryPartners ?? 0,
        products: summary.products ?? 0,
        jobs: summary.jobs ?? 0,
        properties: summary.properties ?? 0,
        events: summary.events ?? 0,
        donations: summary.donations ?? 0,
        lendingRecords: summary.lendingItems ?? 0,
        manufacturers: summary.manufacturers ?? 0,
        manufacturerProducts: summary.manufacturerProducts ?? 0,
        distributors: summary.distributors ?? 0
      };
      const done = {};
      for (const e of ENTITY_ORDER) {
        done[e.key] = {
          status: "done",
          count: counts[e.key] ?? 0
        };
      }
      setEntityStates(done);
      const total = Object.values(counts).reduce((s, v) => s + (v ?? 0), 0);
      setTotalCreated(total);
      setAnimating(false);
      ue.success(`Sample data loaded — ${total} records created`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error loading sample data";
      setEntityStates((prev) => {
        var _a;
        const updated = { ...prev };
        for (const e of ENTITY_ORDER) {
          if (((_a = updated[e.key]) == null ? void 0 : _a.status) === "running") {
            updated[e.key] = { status: "error", count: 0, error: msg };
          }
        }
        return updated;
      });
      setAnimating(false);
      ue.error(msg);
    }
  }
  const isLoading = seedMutation.isPending || animating;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "load-sample-data.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-6 h-6 text-primary" }),
          "Load Sample Data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xl", children: "Seeds unique sample records in the correct dependency order. Each run creates new records with timestamps and random suffixes, so you can run it multiple times without duplicates." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: handleLoadAll,
          disabled: isLoading,
          size: "lg",
          className: "flex-shrink-0",
          "data-ocid": "load-sample-data.load_all_button",
          children: [
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
            isLoading ? "Loading…" : "Load All Sample Data"
          ]
        }
      )
    ] }),
    totalCreated !== null && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900 px-4 py-3",
        "data-ocid": "load-sample-data.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-600 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-green-700 dark:text-green-400", children: [
            "✅ Sample data loaded successfully —",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              totalCreated,
              " total records"
            ] }),
            " created across",
            " ",
            ENTITY_ORDER.length,
            " entity types."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Entity Types — Seeding Order" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2", children: ENTITY_ORDER.map((entity, idx) => {
        const state = entityStates[entity.key];
        const status = (state == null ? void 0 : state.status) ?? (isLoading && idx <= currentIdx ? "running" : "pending");
        const count = (state == null ? void 0 : state.count) ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2",
            "data-ocid": `load-sample-data.entity.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-muted-foreground w-5 text-right flex-shrink-0", children: [
                  idx + 1,
                  "."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: entity.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                status === "done" && count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "+",
                  count
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status })
              ] })
            ]
          },
          entity.key
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "💡 Tip: Each run adds new unique records with timestamps. Existing records are not modified. Run 2–3 times to build a realistic test dataset." })
  ] });
}
export {
  LoadSampleDataPage as default
};
