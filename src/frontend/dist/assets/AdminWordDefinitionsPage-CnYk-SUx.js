import { r as reactExports, ao as useQueryClient, bE as useQuery, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C1kYAn3i.js";
import { u as useLanguageLearning } from "./useLanguageLearning-CqRAiv3Y.js";
import { L as Languages } from "./languages-DcxfvxWL.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { G as Globe } from "./globe--tJa3NSQ.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 20h10", key: "e6iznv" }],
  ["path", { d: "M10 20c5.5-2.5.8-6.4 3-10", key: "161w41" }],
  [
    "path",
    {
      d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",
      key: "9gtqwd"
    }
  ],
  [
    "path",
    {
      d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",
      key: "bkxnd2"
    }
  ]
];
const Sprout = createLucideIcon("sprout", __iconNode);
const LANGUAGE_PAIR_COLORS = {
  "English → Hindi": "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  "English → Spanish": "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  "English → French": "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  "English → German": "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
  "English → Japanese": "bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400",
  "English → Mandarin": "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
  "Hindi → English": "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
};
function getLanguageBadgeClass(language) {
  return LANGUAGE_PAIR_COLORS[language] ?? "bg-muted text-muted-foreground";
}
function AncientTranslationBadge({ text }) {
  if (!text) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded px-2 py-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 shrink-0" }),
    text
  ] });
}
function TableRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 rounded" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-8" }) })
  ] });
}
function AdminWordDefinitionsPage() {
  const [seeding, setSeeding] = reactExports.useState(false);
  const queryClient = useQueryClient();
  const { getWordDefinitionsForDataExplorer, seedWordDefinitions } = useLanguageLearning();
  const query = useQuery({
    queryKey: ["word-definitions-admin"],
    queryFn: () => getWordDefinitionsForDataExplorer(),
    staleTime: 6e4
  });
  const rows = query.data ?? [];
  const total = rows.length;
  async function handleSeed() {
    setSeeding(true);
    try {
      const result = await seedWordDefinitions();
      if (result && !result.ok) {
        ue.error(result.errorDetail ?? "Seed failed");
      } else {
        ue.success("Common vocabulary seeded successfully!");
        queryClient.invalidateQueries({ queryKey: ["word-definitions-admin"] });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error during seed";
      ue.error(msg);
    } finally {
      setSeeding(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-7xl mx-auto", "data-ocid": "word_definitions.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Word Definitions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Vocabulary database for all language pairs — includes ancient translations (Sanskrit, Latin, Old Arabic)." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => queryClient.invalidateQueries({
              queryKey: ["word-definitions-admin"]
            }),
            disabled: query.isLoading,
            "data-ocid": "word_definitions.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-1.5" }),
              "Refresh"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleSeed,
            disabled: seeding || query.isLoading,
            "data-ocid": "word_definitions.seed_button",
            children: seeding ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
              "Seeding…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-4 h-4" }),
              "Seed Common Words"
            ] })
          }
        )
      ] })
    ] }),
    !query.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: total === 0 ? "No definitions yet" : `${total.toLocaleString()} word definition${total !== 1 ? "s" : ""}` })
    ] }),
    query.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "word_definitions.loading_state",
        className: "bg-card border border-border rounded-xl overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Word" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Language Pair" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Ancient Translation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "IPA Pronunciation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Examples" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: Array.from({ length: 8 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableRowSkeleton, {}, i)
          )) })
        ] })
      }
    ),
    query.isError && !query.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "word_definitions.error_state",
        className: "bg-card border border-border rounded-xl p-10 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-foreground mb-1", children: "Failed to load word definitions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: query.error instanceof Error ? query.error.message : "Please try refreshing the page." })
        ]
      }
    ),
    !query.isLoading && !query.isError && rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "word_definitions.empty_state",
        className: "bg-card border border-border rounded-xl p-12 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "No word definitions found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6 max-w-sm mx-auto", children: [
            "The vocabulary database is empty. Click",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Seed Common Words" }),
            " to populate 200+ common vocabulary entries across all language pairs — including Sanskrit, Latin, and Old Arabic ancient translations."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSeed,
              disabled: seeding,
              "data-ocid": "word_definitions.seed_button",
              children: seeding ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
                "Seeding…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-4 h-4" }),
                "Seed Common Words"
              ] })
            }
          )
        ]
      }
    ),
    !query.isLoading && !query.isError && rows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Word" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Language Pair" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Ancient Translation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "IPA Pronunciation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: "Examples" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          className: "hover:bg-muted/20 transition-colors",
          "data-ocid": `word_definitions.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: row.word }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 text-xs font-medium rounded-full px-2.5 py-0.5 ${getLanguageBadgeClass(
                  row.language
                )}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 shrink-0" }),
                  row.language || "—"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AncientTranslationBadge, { text: row.ancientTranslation }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.ipa ? /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs text-primary bg-primary/8 rounded px-1.5 py-0.5 font-mono", children: row.ipa }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "view" }) })
          ]
        },
        row.id
      )) })
    ] }) })
  ] });
}
export {
  AdminWordDefinitionsPage as default
};
