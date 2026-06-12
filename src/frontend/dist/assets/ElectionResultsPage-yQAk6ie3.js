import { bG as useActor, ao as useQueryClient, r as reactExports, bF as useMutation, bE as useQuery, j as jsxRuntimeExports, bH as createActor } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-Dx8tJeYi.js";
import { I as Input } from "./input-BAihtL8f.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as CalendarDays } from "./calendar-days-B91JrBZZ.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { V as Vote } from "./vote-nBENqqR1.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { T as Trophy } from "./trophy-KLTjPb1v.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { C as ChartColumn } from "./chart-column-1UICj-Tf.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
function groupByParty(results) {
  const map = /* @__PURE__ */ new Map();
  for (const r of results) {
    const p = r.partyName || "Independent";
    if (!map.has(p)) {
      map.set(p, {
        partyName: p,
        seats: 0,
        totalVotes: 0n,
        avgVoteShare: 0,
        isLeading: false,
        candidates: []
      });
    }
    const g = map.get(p);
    g.candidates.push(r);
    if (r.isWon) g.seats++;
    if (r.isLeading) g.isLeading = true;
    g.totalVotes += r.votes;
    g.avgVoteShare += r.voteShare;
  }
  for (const g of map.values()) {
    if (g.candidates.length > 0)
      g.avgVoteShare = g.avgVoteShare / g.candidates.length;
  }
  return [...map.values()].sort(
    (a, b) => b.seats - a.seats || b.candidates.length - a.candidates.length
  );
}
function VoteShareBar({ pct, color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `h-full rounded-full ${color} transition-all duration-700`,
      style: { width: `${Math.min(100, Math.max(0, pct))}%` }
    }
  ) });
}
const PARTY_COLORS = [
  "bg-blue-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-yellow-500",
  "bg-pink-500"
];
function ElectionResultsPage() {
  var _a;
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [stateQuery, setStateQuery] = reactExports.useState("India");
  const [inputValue, setInputValue] = reactExports.useState("India");
  const [selectedParty, setSelectedParty] = reactExports.useState(null);
  const [electionType, setElectionType] = reactExports.useState("all");
  const fetchMutation = useMutation({
    mutationFn: async (state) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.fetchElectionResults(state);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["election-results"] })
  });
  const seedMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.seedElectionResults();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["election-results"] })
  });
  const resultsQuery = useQuery({
    queryKey: ["election-results", stateQuery],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getElectionResults(stateQuery);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 6e4,
    refetchInterval: 5 * 6e4
  });
  useQuery({
    queryKey: ["election-results-all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllElectionResults();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 6e4
  });
  const upcomingQuery = useQuery({
    queryKey: ["election-upcoming"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getUpcomingElections();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 6e4
  });
  reactExports.useEffect(() => {
    const id = setInterval(
      () => qc.invalidateQueries({ queryKey: ["election-results"] }),
      5 * 6e4
    );
    return () => clearInterval(id);
  }, [qc]);
  function handleSearch(e) {
    e.preventDefault();
    const trimmed = inputValue.trim() || "India";
    setStateQuery(trimmed);
    setSelectedParty(null);
    fetchMutation.mutate(trimmed);
  }
  const rawResults = resultsQuery.data ?? [];
  const filteredResults = rawResults.filter((r) => {
    if (electionType === "all") return true;
    if (electionType === "lok-sabha")
      return r.constituency === "Lok Sabha 2024";
    return r.constituency !== "Lok Sabha 2024";
  });
  const parties = groupByParty(filteredResults);
  const leadingParty = parties[0];
  const isLoading = resultsQuery.isLoading || isFetching;
  const isRefreshing = fetchMutation.isPending;
  const selectedCandidates = selectedParty ? ((_a = parties.find((p) => p.partyName === selectedParty)) == null ? void 0 : _a.candidates) ?? [] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-screen-xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0", children: "🗳️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground font-display", children: "Election Results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Live & latest election results by state or country" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs text-muted-foreground",
            "data-ocid": "election.auto-refresh-badge",
            children: "Auto-refreshing every 5 min"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            onClick: () => fetchMutation.mutate(stateQuery),
            disabled: isRefreshing,
            "data-ocid": "election.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`
                }
              ),
              isRefreshing ? "Fetching…" : "Refresh"
            ]
          }
        )
      ] })
    ] }),
    upcomingQuery.data && Array.isArray(upcomingQuery.data) && upcomingQuery.data.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-primary" }),
        "Upcoming Elections"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: upcomingQuery.data.map((ue) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: ue.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-primary/10 text-primary border-primary/20", children: "Upcoming" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: ue.state }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: ue.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: ue.electionType })
      ] }) }, ue.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSearch,
        className: "flex gap-2 items-center flex-wrap",
        "data-ocid": "election.search_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-52", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: inputValue,
                onChange: (e) => setInputValue(e.target.value),
                placeholder: "State / Country (e.g. India, Maharashtra, Bihar)",
                className: "pl-8 h-9 text-sm",
                "data-ocid": "election.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              size: "sm",
              className: "gap-1.5 h-9",
              disabled: isRefreshing,
              "data-ocid": "election.search_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { className: "w-3.5 h-3.5" }),
                " Check Results"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: ["all", "lok-sabha", "state-assembly"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: electionType === t ? "default" : "outline",
        size: "sm",
        className: "h-7 text-xs",
        onClick: () => setElectionType(t),
        "data-ocid": `election.filter.${t}`,
        children: t === "all" ? "All" : t === "lok-sabha" ? "Lok Sabha" : "State Assembly"
      },
      t
    )) }),
    filteredResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Parties", value: parties.length },
      {
        label: "Seats Won",
        value: parties.reduce((s, p) => s + p.seats, 0)
      },
      { label: "Constituencies", value: filteredResults.length },
      {
        label: "Leading Party",
        value: (leadingParty == null ? void 0 : leadingParty.partyName) ?? "—",
        small: true
      }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `font-bold font-mono text-foreground ${stat.small ? "text-sm truncate" : "text-2xl"}`,
          children: String(stat.value)
        }
      )
    ] }) }, stat.label)) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }, i)) }) : resultsQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "election.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Unable to load results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Could not load election results." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-2",
              onClick: () => resultsQuery.refetch(),
              "data-ocid": "election.retry_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                " Retry"
              ]
            }
          )
        ]
      }
    ) : parties.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-16 text-center bg-card border border-border rounded-xl",
        "data-ocid": "election.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-base", children: [
            'No results for "',
            stateQuery,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2 mb-4", children: [
            "Click ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Check Results" }),
            " to fetch live data, or try a different state."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "gap-1.5",
                onClick: () => fetchMutation.mutate(stateQuery),
                disabled: isRefreshing,
                "data-ocid": "election.fetch_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { className: "w-3.5 h-3.5" }),
                  " ",
                  isRefreshing ? "Fetching…" : "Fetch Live Results"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1.5",
                onClick: () => seedMutation.mutate(),
                disabled: seedMutation.isPending,
                "data-ocid": "election.seed_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-3.5 h-3.5 ${seedMutation.isPending ? "animate-spin" : ""}`
                    }
                  ),
                  " ",
                  seedMutation.isPending ? "Loading…" : "Load India 2024/2025 Data"
                ]
              }
            )
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
          "data-ocid": "election.parties.list",
          children: parties.map((party, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": `election.party.item.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: `border cursor-pointer transition-all hover:shadow-md ${selectedParty === party.partyName ? "border-primary ring-1 ring-primary" : "border-border"}`,
                  onClick: () => setSelectedParty(
                    selectedParty === party.partyName ? null : party.partyName
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-bold leading-tight", children: party.partyName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
                        party.isLeading && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-amber-500 text-white h-4 px-1.5", children: "🏆 Leading" }),
                        party.seats > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] bg-green-600 text-white h-4 px-1.5", children: [
                          party.seats,
                          " seat",
                          party.seats !== 1 ? "s" : ""
                        ] })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4 space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                          party.candidates.length,
                          " candidates"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3 h-3" }),
                          party.avgVoteShare.toFixed(1),
                          "% avg"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        VoteShareBar,
                        {
                          pct: party.avgVoteShare,
                          color: PARTY_COLORS[idx % PARTY_COLORS.length]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                          Number(party.totalVotes).toLocaleString("en-IN"),
                          " votes"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground" })
                      ] })
                    ] })
                  ]
                }
              )
            },
            party.partyName
          ))
        }
      ),
      selectedParty && selectedCandidates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border border-border",
          "data-ocid": "election.constituency.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm", children: [
                selectedParty,
                " — Constituencies"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "h-6 text-xs px-2",
                  onClick: () => setSelectedParty(null),
                  "data-ocid": "election.constituency.close_button",
                  children: "Close"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium text-muted-foreground", children: "Constituency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium text-muted-foreground", children: "Candidate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium text-muted-foreground", children: "Votes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium text-muted-foreground", children: "Vote %" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-2 font-medium text-muted-foreground", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: selectedCandidates.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/40 hover:bg-muted/20",
                  "data-ocid": `election.constituency.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium text-foreground", children: c.constituency }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground", children: c.candidateName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right tabular-nums text-foreground", children: Number(c.votes).toLocaleString("en-IN") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right tabular-nums text-foreground", children: [
                      c.voteShare.toFixed(1),
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-center", children: c.isWon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-green-600 text-white h-4 px-1", children: "Won" }) : c.isLeading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-amber-500 text-white h-4 px-1", children: "Leading" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] h-4 px-1",
                        children: "Behind"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-[10px] h-4 px-1 ${c.source === "api" || c.source === "eci" ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`,
                        children: c.source === "api" || c.source === "eci" ? "Live" : "Sample"
                      }
                    ) })
                  ]
                },
                c.id
              )) })
            ] }) }) })
          ]
        }
      )
    ] })
  ] });
}
export {
  ElectionResultsPage as default
};
