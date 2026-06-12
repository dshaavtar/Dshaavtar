import { bG as useActor, ao as useQueryClient, r as reactExports, bE as useQuery, j as jsxRuntimeExports, bH as createActor } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent } from "./card-Dx8tJeYi.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { T as Trophy } from "./trophy-KLTjPb1v.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-DYndF6Sn.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./createLucideIcon-BGWdtUCJ.js";
function statusBadge(status) {
  const s = status.toLowerCase();
  if (s.includes("live") || s.includes("in progress") || s.includes("inprogress"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500 text-white text-[11px] font-bold uppercase animate-pulse", children: "● Live" });
  if (s.includes("end") || s.includes("final") || s.includes("finish") || s.includes("ft") || s.includes("full time"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-muted-foreground/30 text-muted-foreground text-[11px] font-semibold uppercase", children: "Ended" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/15 text-blue-600 border border-blue-500/30 text-[11px] font-semibold uppercase", children: "Scheduled" });
}
function MatchCard({ match }) {
  const fetchedAt = match.fetchedAt && match.fetchedAt > 0n ? new Date(Number(match.fetchedAt) / 1e6) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border bg-card hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground capitalize", children: match.sport }),
        match.leagueName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded inline-block w-fit", children: match.leagueName })
      ] }),
      statusBadge(match.status)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm leading-tight", children: match.homeTeam }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-2xl text-foreground tabular-nums", children: match.homeScore }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-bold text-lg", children: "–" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-2xl text-foreground tabular-nums", children: match.awayScore })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm leading-tight", children: match.awayTeam }) })
    ] }),
    match.matchTime && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-2", children: match.matchTime }),
    fetchedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-[11px] text-muted-foreground mt-1", children: [
      "Updated ",
      fetchedAt.toLocaleTimeString()
    ] })
  ] }) });
}
function SkeletonCards() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }, i)) });
}
function TodayMatchScoresPage() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [activeSport, setActiveSport] = reactExports.useState("all");
  const [isFetchingScores, setIsFetchingScores] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    let cancelled = false;
    async function fetchScores() {
      if (!actor) return;
      setIsFetchingScores(true);
      try {
        await actor.getTodayMatchScores();
        if (!cancelled) {
          qc.invalidateQueries({ queryKey: ["match-scores-all"] });
          qc.invalidateQueries({ queryKey: ["match-scores-football"] });
          qc.invalidateQueries({ queryKey: ["match-scores-cricket"] });
        }
      } catch {
      } finally {
        if (!cancelled) setIsFetchingScores(false);
      }
    }
    fetchScores();
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching, qc]);
  const allQuery = useQuery({
    queryKey: ["match-scores-all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllMatchScores();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4,
    refetchInterval: 3e4
  });
  const footballQuery = useQuery({
    queryKey: ["match-scores-football"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const bySport = await actor.getMatchScoresBySport("football");
        if (bySport && bySport.length > 0) return bySport;
        return await actor.getTodayMatchScores();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4,
    refetchInterval: 3e4
  });
  const cricketQuery = useQuery({
    queryKey: ["match-scores-cricket"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const bySport = await actor.getMatchScoresBySport("cricket");
        if (bySport && bySport.length > 0) return bySport;
        const all = await actor.getAllMatchScores();
        return all.filter((m) => m.sport.toLowerCase().includes("cricket"));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4,
    refetchInterval: 3e4
  });
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      qc.invalidateQueries({ queryKey: ["match-scores-all"] });
      qc.invalidateQueries({ queryKey: ["match-scores-football"] });
      qc.invalidateQueries({ queryKey: ["match-scores-cricket"] });
    }, 3e4);
    return () => clearInterval(id);
  }, [qc]);
  async function handleManualRefresh() {
    if (!actor) return;
    setIsFetchingScores(true);
    try {
      await actor.getTodayMatchScores();
      qc.invalidateQueries({ queryKey: ["match-scores-all"] });
      qc.invalidateQueries({ queryKey: ["match-scores-football"] });
      qc.invalidateQueries({ queryKey: ["match-scores-cricket"] });
    } catch {
    } finally {
      setIsFetchingScores(false);
    }
  }
  const allMatches = allQuery.data ?? [];
  const footballMatches = footballQuery.data ?? [];
  const cricketMatches = cricketQuery.data ?? [];
  const isAnyFetching = isFetchingScores || allQuery.isFetching || footballQuery.isFetching || cricketQuery.isFetching;
  function splitMatches(matches) {
    const upcoming = [];
    const rest = [];
    for (const m of matches) {
      const s = m.status.toLowerCase();
      const isScheduled = !s.includes("live") && !s.includes("in progress") && !s.includes("inprogress") && !s.includes("end") && !s.includes("final") && !s.includes("finish") && !s.includes("ft") && !s.includes("full time");
      if (isScheduled) upcoming.push(m);
      else rest.push(m);
    }
    return { upcoming, rest };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-screen-xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0", children: "🏆" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground font-display", children: "Today's Match Scores" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Live football and cricket scores" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isAnyFetching && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs text-muted-foreground flex items-center gap-1",
            "data-ocid": "match-scores.refreshing_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 animate-spin" }),
              "Refreshing scores…"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs text-muted-foreground",
            "data-ocid": "match-scores.auto-refresh-badge",
            children: "Auto-refreshing every 30s"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            onClick: handleManualRefresh,
            disabled: isAnyFetching,
            "data-ocid": "match-scores.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-3.5 h-3.5 ${isAnyFetching ? "animate-spin" : ""}`
                }
              ),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeSport,
        onValueChange: (v) => setActiveSport(v),
        className: "w-full",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "match-scores.tabs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "all",
                "data-ocid": "match-scores.all.tab",
                onClick: () => setActiveSport("all"),
                children: "🏟️ All"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "football",
                "data-ocid": "match-scores.football.tab",
                onClick: () => setActiveSport("football"),
                children: "⚽ Football"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "cricket",
                "data-ocid": "match-scores.cricket.tab",
                onClick: () => setActiveSport("cricket"),
                children: "🏏 Cricket"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-4 space-y-4", children: allQuery.isLoading || isFetching && !allMatches.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCards, {}) : allMatches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-12 text-center bg-card border border-border rounded-xl",
              "data-ocid": "match-scores.all.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No matches today" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "No cricket or football matches scheduled for today. India domestic leagues (IPL, ISL, I-League) and international matches are checked." })
              ]
            }
          ) : (() => {
            const { upcoming, rest } = splitMatches(allMatches);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400 inline-block" }),
                  "Upcoming Matches"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                    "data-ocid": "match-scores.all.upcoming_list",
                    children: upcoming.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        "data-ocid": `match-scores.all.upcoming.item.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match: m })
                      },
                      m.id
                    ))
                  }
                )
              ] }),
              rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-400 inline-block" }),
                  "Live & Recent"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                    "data-ocid": "match-scores.all.list",
                    children: rest.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        "data-ocid": `match-scores.all.item.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match: m })
                      },
                      m.id
                    ))
                  }
                )
              ] })
            ] });
          })() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "football", className: "mt-4 space-y-4", children: footballQuery.isLoading || isFetching && !footballMatches.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCards, {}) : footballQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-12 text-center bg-card border border-border rounded-xl",
              "data-ocid": "match-scores.football.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Unable to fetch scores" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Could not load live football scores. Please try again." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "gap-2",
                    onClick: () => footballQuery.refetch(),
                    "data-ocid": "match-scores.football.retry_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                      " Retry"
                    ]
                  }
                )
              ]
            }
          ) : footballMatches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-12 text-center bg-card border border-border rounded-xl",
              "data-ocid": "match-scores.football.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No football matches today" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "No football matches scheduled for today. India domestic leagues (ISL, I-League) and international matches are checked." })
              ]
            }
          ) : (() => {
            const { upcoming, rest } = splitMatches(footballMatches);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400 inline-block" }),
                  "Upcoming Matches"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                    "data-ocid": "match-scores.football.upcoming_list",
                    children: upcoming.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        "data-ocid": `match-scores.football.upcoming.item.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match: m })
                      },
                      m.id
                    ))
                  }
                )
              ] }),
              rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-400 inline-block" }),
                  "Live & Recent"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                    "data-ocid": "match-scores.football.list",
                    children: rest.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        "data-ocid": `match-scores.football.item.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match: m })
                      },
                      m.id
                    ))
                  }
                )
              ] })
            ] });
          })() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "cricket", className: "mt-4 space-y-4", children: cricketQuery.isLoading || isFetching && !cricketMatches.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCards, {}) : cricketMatches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-12 text-center bg-card border border-border rounded-xl",
              "data-ocid": "match-scores.cricket.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No cricket matches today" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "No cricket matches scheduled for today. India domestic leagues (IPL, Ranji Trophy) and international matches are checked." })
              ]
            }
          ) : (() => {
            const { upcoming, rest } = splitMatches(cricketMatches);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400 inline-block" }),
                  "Upcoming Matches"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                    "data-ocid": "match-scores.cricket.upcoming_list",
                    children: upcoming.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        "data-ocid": `match-scores.cricket.upcoming.item.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match: m })
                      },
                      m.id
                    ))
                  }
                )
              ] }),
              rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-400 inline-block" }),
                  "Live & Recent"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                    "data-ocid": "match-scores.cricket.list",
                    children: rest.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        "data-ocid": `match-scores.cricket.item.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match: m })
                      },
                      m.id
                    ))
                  }
                )
              ] })
            ] });
          })() })
        ]
      }
    )
  ] });
}
export {
  TodayMatchScoresPage as default
};
