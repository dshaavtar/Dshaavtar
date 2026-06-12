import { bG as useActor, r as reactExports, j as jsxRuntimeExports, bH as createActor } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Dx8tJeYi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C1kYAn3i.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { A as ArrowUpRight } from "./arrow-up-right-tXBfpouL.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
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
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
];
const ArrowDownRight = createLucideIcon("arrow-down-right", __iconNode);
const COUNTRIES = [
  "India",
  "USA",
  "UK",
  "Germany",
  "Japan",
  "UAE",
  "China",
  "Singapore",
  "Canada",
  "Australia",
  "Brazil",
  "Others"
];
const INSTRUMENT_TYPE_MAP = {
  equity: "equities",
  stock: "equities",
  commodity: "commodities",
  currency: "currencies",
  forex: "currencies",
  metal: "metals",
  option: "options",
  put: "options",
  call: "options"
};
function normalizeType(type) {
  const lower = type.toLowerCase();
  for (const [key, tab] of Object.entries(INSTRUMENT_TYPE_MAP)) {
    if (lower.includes(key)) return tab;
  }
  return "all";
}
function filterByTab(results, tab) {
  if (tab === "all") return results;
  return results.filter((r) => normalizeType(r.instrumentType) === tab);
}
function InstrumentTypeBadge({ type }) {
  const lower = type.toLowerCase();
  let color = "";
  if (lower.includes("equity") || lower.includes("stock")) {
    color = "bg-blue-500/10 text-blue-600 border-blue-200";
  } else if (lower.includes("commodity")) {
    color = "bg-orange-500/10 text-orange-600 border-orange-200";
  } else if (lower.includes("currency") || lower.includes("forex")) {
    color = "bg-purple-500/10 text-purple-600 border-purple-200";
  } else if (lower.includes("metal")) {
    color = "bg-yellow-500/10 text-yellow-600 border-yellow-200";
  } else if (lower.includes("option") || lower.includes("put") || lower.includes("call")) {
    color = "bg-pink-500/10 text-pink-600 border-pink-200";
  } else {
    color = "bg-muted text-muted-foreground border-border";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${color}`,
      children: type
    }
  );
}
function ActionBadge({ action }) {
  const up = action.toLowerCase();
  if (up === "buy")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500 text-white hover:bg-green-600 uppercase text-[11px] font-bold", children: "BUY" });
  if (up === "sell")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500 text-white hover:bg-red-600 uppercase text-[11px] font-bold", children: "SELL" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-500 text-white hover:bg-yellow-600 uppercase text-[11px] font-bold", children: "HOLD" });
}
function PriceChange({ value }) {
  const isPositive = value >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `flex items-center gap-0.5 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-500"}`,
      children: [
        isPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "w-3.5 h-3.5" }),
        Math.abs(value).toFixed(2),
        "%"
      ]
    }
  );
}
function ResultCard({ result }) {
  const isPositive = result.changePercent >= 0;
  const lastUpdated = result.lastUpdated && result.lastUpdated > 0n ? new Date(Number(result.lastUpdated) / 1e6).toLocaleString() : (/* @__PURE__ */ new Date()).toLocaleString();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border bg-card hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: result.symbol }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs truncate", children: result.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InstrumentTypeBadge, { type: result.instrumentType })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: `text-xl font-bold font-mono ${isPositive ? "text-green-600" : "text-red-500"}`,
            children: [
              result.currency,
              " ",
              result.currentPrice.toLocaleString(void 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4
              })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PriceChange, { value: result.changePercent })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: result.exchangeName }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-2", children: [
      "Last updated: ",
      lastUpdated
    ] })
  ] }) });
}
function RecommendationRow({ rec, results }) {
  const result = results.find((r) => r.symbol === rec.symbol);
  const currency = (result == null ? void 0 : result.currency) ?? "₹";
  const currentPrice = (result == null ? void 0 : result.currentPrice) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-lg border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:w-48 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-sm text-foreground", children: rec.symbol }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBadge, { action: rec.action })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wide", children: "Current Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground font-mono", children: [
          currency,
          " ",
          currentPrice.toLocaleString(void 0, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wide", children: "Stop Loss" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-red-500 font-mono", children: rec.stopLossPrice.toFixed(2) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wide", children: "Target" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-green-600 font-mono", children: rec.targetPrice.toFixed(2) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wide", children: "Target Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: rec.targetDate || "~30 days" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wide", children: "Accuracy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: rec.accuracyPrediction || `${(rec.confidence * 100).toFixed(0)}%` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground sm:max-w-xs", children: rec.reasoning })
  ] });
}
function ResultsView({ data }) {
  const [tab, setTab] = reactExports.useState("all");
  const filtered = filterByTab(data.results, tab);
  const tabs = [
    { key: "all", label: "All", count: data.results.length },
    {
      key: "equities",
      label: "Equities",
      count: filterByTab(data.results, "equities").length
    },
    {
      key: "commodities",
      label: "Commodities",
      count: filterByTab(data.results, "commodities").length
    },
    {
      key: "currencies",
      label: "Currencies",
      count: filterByTab(data.results, "currencies").length
    },
    {
      key: "metals",
      label: "Metals",
      count: filterByTab(data.results, "metals").length
    },
    {
      key: "options",
      label: "Options",
      count: filterByTab(data.results, "options").length
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: (v) => setTab(v), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex-wrap h-auto gap-1", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsTrigger,
        {
          value: t.key,
          "data-ocid": `market.tab.${t.key}`,
          children: [
            t.label,
            t.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-[10px] bg-muted rounded-full px-1.5 py-0.5", children: t.count })
          ]
        },
        t.key
      )) }),
      tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: t.key, className: "mt-4", children: [
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm py-6 text-center", children: [
          "No ",
          t.label.toLowerCase(),
          " found for this search."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", children: filtered.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { result: r }, `${r.symbol}-${i}`)) }),
        tab === "all" && data.results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center text-muted-foreground text-sm", children: [
          "No symbols found matching “",
          data.scriptName,
          "” in",
          " ",
          data.country,
          ". Try a broader search term."
        ] })
      ] }, t.key))
    ] }),
    data.recommendations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
        "Trade Recommendations (",
        data.recommendations.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: data.recommendations.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        RecommendationRow,
        {
          rec,
          results: data.results
        },
        `${rec.symbol}-${i}`
      )) })
    ] })
  ] });
}
function MarketCommodityPage() {
  const { actor, isFetching } = useActor(createActor);
  const [scriptName, setScriptName] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("India");
  const [isSearching, setIsSearching] = reactExports.useState(false);
  const [searchResult, setSearchResult] = reactExports.useState(
    null
  );
  const [searchError, setSearchError] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = reactExports.useState(true);
  const [viewModalOpen, setViewModalOpen] = reactExports.useState(false);
  const [viewModalData, setViewModalData] = reactExports.useState(
    null
  );
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (actor && !isFetching) loadHistory();
  }, [actor, isFetching]);
  async function loadHistory() {
    setIsLoadingHistory(true);
    try {
      const data = await actor.getMarketSearchHistory();
      setHistory(
        [...data].sort((a, b) => Number(b.searchedAt) - Number(a.searchedAt))
      );
    } catch {
    } finally {
      setIsLoadingHistory(false);
    }
  }
  async function handleSearch() {
    if (!actor || !scriptName.trim()) return;
    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);
    try {
      const res = await actor.searchMarket(scriptName.trim(), country);
      if (res.__kind__ === "ok") {
        setSearchResult(res.ok);
        setHistory(
          (prev) => [res.ok, ...prev.filter((h) => h.id !== res.ok.id)].sort(
            (a, b) => Number(b.searchedAt) - Number(a.searchedAt)
          )
        );
      } else {
        setSearchError("Unable to fetch live prices. Please try again.");
      }
    } catch {
      setSearchError("Unable to fetch live prices. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }
  async function handleDelete(id) {
    if (!actor) return;
    setDeletingId(id);
    try {
      await actor.deleteMarketSearch(id);
      setHistory((prev) => prev.filter((h) => h.id !== id));
      if ((searchResult == null ? void 0 : searchResult.id) === id) setSearchResult(null);
    } catch {
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }
  function openView(record) {
    setViewModalData(record);
    setViewModalOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8 max-w-screen-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0", children: "📈" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground font-display", children: "Market & Commodity Search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Search live share prices, commodities, currencies, metals and options across exchanges" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Search Instruments" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "script-name",
                className: "text-xs mb-1.5 block text-muted-foreground",
                children: "Script Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "script-name",
                "data-ocid": "market.search_input",
                placeholder: "e.g. India Tech Stocks, Gold Watch, USD/INR",
                value: scriptName,
                onChange: (e) => setScriptName(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleSearch(),
                disabled: isSearching,
                className: "h-9"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:w-48", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "country",
                className: "text-xs mb-1.5 block text-muted-foreground",
                children: "Country"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: country,
                onValueChange: setCountry,
                disabled: isSearching,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "country",
                      "data-ocid": "market.country_select",
                      className: "h-9",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:self-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "market.search_button",
              onClick: handleSearch,
              disabled: isSearching || !scriptName.trim() || isFetching,
              className: "h-9 gap-2 w-full sm:w-auto",
              children: [
                isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                isSearching ? "Searching…" : "Search"
              ]
            }
          ) })
        ] }),
        searchError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "market.error_state",
            className: "mt-3 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
              searchError
            ]
          }
        ),
        !searchError && !searchResult && scriptName.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Searches exact match first, then partial matches" })
      ] })
    ] }),
    isSearching && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "market.loading_state", className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" })
    ] }),
    !isSearching && searchResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border border-border bg-card shadow-sm",
        "data-ocid": "market.results_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between flex-wrap gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground", children: [
              "Results for “",
              searchResult.scriptName,
              "” —",
              " ",
              searchResult.country
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              searchResult.results.length,
              " instruments  · ",
              searchResult.recommendations.length,
              " recommendations  ·  searched",
              " ",
              new Date(
                Number(searchResult.searchedAt) / 1e6
              ).toLocaleString()
            ] }),
            searchResult.matchedSymbols && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Matched",
              " ",
              searchResult.matchedSymbols.length,
              " ",
              "symbols"
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsView, { data: searchResult }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Search History" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoadingHistory ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
      ] }) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "market.history.empty_state",
          className: "py-12 flex flex-col items-center gap-2 text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No searches yet. Run a search above to get started." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Script Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Country" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "# Results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Recs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: history.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `market.history.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: item.scriptName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: item.country }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: new Date(
                Number(item.searchedAt) / 1e6
              ).toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm", children: item.results.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm", children: item.recommendations.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    "data-ocid": `market.history.view_button.${idx + 1}`,
                    className: "h-7 w-7 p-0",
                    onClick: () => openView(item),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "View" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    "data-ocid": `market.history.delete_button.${idx + 1}`,
                    className: "h-7 w-7 p-0 text-destructive hover:text-destructive",
                    onClick: () => setConfirmDeleteId(item.id),
                    disabled: deletingId === item.id,
                    children: [
                      deletingId === item.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Delete" })
                    ]
                  }
                )
              ] }) })
            ]
          },
          item.id
        )) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: viewModalOpen, onOpenChange: setViewModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-5xl w-full max-h-[90vh] overflow-y-auto",
        "data-ocid": "market.view_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-base", children: [
            viewModalData == null ? void 0 : viewModalData.scriptName,
            " — ",
            viewModalData == null ? void 0 : viewModalData.country
          ] }) }),
          viewModalData && /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsView, { data: viewModalData })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!confirmDeleteId,
        onOpenChange: (open) => !open && setConfirmDeleteId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-sm",
            "data-ocid": "market.confirm_delete_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Search Record?" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This will permanently remove the search record and its results. This cannot be undone." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    "data-ocid": "market.confirm_delete_cancel",
                    onClick: () => setConfirmDeleteId(null),
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "destructive",
                    "data-ocid": "market.confirm_delete_button",
                    onClick: () => confirmDeleteId && handleDelete(confirmDeleteId),
                    disabled: !!deletingId,
                    children: [
                      deletingId ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : null,
                      "Delete"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  MarketCommodityPage as default
};
