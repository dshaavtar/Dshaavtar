import { r as reactExports, ao as useQueryClient, bE as useQuery, bF as useMutation, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Separator } from "./separator-DqiCXh2l.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { u as useLanguageLearning } from "./useLanguageLearning-CqRAiv3Y.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { L as Languages } from "./languages-DcxfvxWL.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }],
  ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }],
  ["line", { x1: "15", x2: "9", y1: "10", y2: "10", key: "1gty7f" }]
];
const BookmarkPlus = createLucideIcon("bookmark-plus", __iconNode$1);
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
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
];
const MicVocal = createLucideIcon("mic-vocal", __iconNode);
const SEARCH_LANGUAGES = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Mandarin",
  "Arabic",
  "Latin",
  "Sanskrit"
];
function WordResultSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6" })
    ] })
  ] });
}
function TranslationsTable({ definition }) {
  const rows = definition.translations ?? [];
  if (rows.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-4 h-4 text-primary" }),
      "Translations"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide w-1/3", children: "Language" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide", children: "Translation" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map(([lang, value], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: i % 2 === 0 ? "bg-background" : "bg-muted/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium text-foreground", children: lang }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: value })
          ]
        },
        lang
      )) })
    ] }) })
  ] });
}
function AncientTranslations({ definition }) {
  const value = definition.ancientTranslation;
  if (!value) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg border border-border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "✦ Ancient Language Origins" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground font-medium", children: value })
  ] });
}
function WordSearchPage() {
  const [inputWord, setInputWord] = reactExports.useState("");
  const [searchLanguage, setSearchLanguage] = reactExports.useState("English");
  const [searchParams, setSearchParams] = reactExports.useState(null);
  const queryClient = useQueryClient();
  const { searchWordDefinition, saveWord } = useLanguageLearning();
  const resultQuery = useQuery({
    queryKey: ["word-definition", searchParams == null ? void 0 : searchParams.word, searchParams == null ? void 0 : searchParams.language],
    queryFn: () => searchParams ? searchWordDefinition(searchParams.word, searchParams.language) : Promise.resolve(null),
    enabled: !!searchParams,
    staleTime: 6e4
  });
  const saveMutation = useMutation({
    mutationFn: (def) => {
      var _a, _b;
      return saveWord(
        "guest_user",
        def.word,
        def.language,
        ((_b = (_a = def.translations) == null ? void 0 : _a[0]) == null ? void 0 : _b[1]) ?? "",
        def.ancientTranslation ?? "",
        def.ipa ?? "",
        def.examples ?? []
      );
    },
    onSuccess: (result) => {
      if (result.ok) {
        ue.success("Word saved to your vocabulary!", { duration: 4e3 });
        queryClient.invalidateQueries({ queryKey: ["saved-words"] });
      } else {
        ue.error(result.errorDetail ?? "Failed to save word");
      }
    },
    onError: (err) => ue.error(err.message)
  });
  function handleSearch() {
    const trimmed = inputWord.trim();
    if (!trimmed) return;
    setSearchParams({ word: trimmed, language: searchLanguage });
  }
  const definition = resultQuery.data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Word Search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Look up words in any language — including ancient language origins." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 mb-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "word_search.search_input",
              className: "pl-9",
              placeholder: "Enter a word to look up…",
              value: inputWord,
              onChange: (e) => setInputWord(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && handleSearch()
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "word_search.search_button",
            onClick: handleSearch,
            disabled: !inputWord.trim(),
            children: "Search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium shrink-0", children: "Language:" }),
        SEARCH_LANGUAGES.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "word_search.filter.tab",
            onClick: () => setSearchLanguage(lang),
            className: `text-xs px-2.5 py-1 rounded-full border transition-colors duration-150 ${searchLanguage === lang ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-muted"}`,
            children: lang
          },
          lang
        ))
      ] })
    ] }),
    resultQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(WordResultSkeleton, {}) : resultQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "word_search.error_state",
        className: "text-center py-12 text-muted-foreground",
        children: "Failed to search. Please try again."
      }
    ) : !searchParams ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 bg-card border border-border rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Enter a word above to look it up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Translations, IPA pronunciation, and ancient language roots." })
    ] }) : definition == null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "word_search.empty_state",
        className: "text-center py-12 bg-card border border-border rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground font-medium mb-1", children: [
            "No results for “",
            searchParams.word,
            "”"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try a different spelling or language." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-foreground tracking-tight", children: definition.word }),
          definition.ipa && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MicVocal, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-mono", children: definition.ipa })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: definition.language }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "word_search.save_button",
              size: "sm",
              variant: "outline",
              onClick: () => saveMutation.mutate(definition),
              disabled: saveMutation.isPending,
              className: "gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-3.5 h-3.5" }),
                saveMutation.isPending ? "Saving…" : "Save Word"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TranslationsTable, { definition }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AncientTranslations, { definition }),
      definition.examples && definition.examples.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
          "Example Sentences"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: definition.examples.map((sentence) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "text-sm text-foreground bg-muted/30 rounded-lg px-4 py-2.5 border border-border",
            children: [
              "“",
              sentence,
              "”"
            ]
          },
          sentence
        )) })
      ] })
    ] })
  ] });
}
export {
  WordSearchPage as default
};
