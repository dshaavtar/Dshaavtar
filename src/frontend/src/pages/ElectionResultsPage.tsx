import { createActor } from "@/backend";
import type { ElectionResult } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  BarChart3,
  CalendarDays,
  ChevronRight,
  MapPin,
  RefreshCw,
  Trophy,
  Users,
  Vote,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ElectionResultExt extends ElectionResult {
  source: string;
}

interface UpcomingElection {
  name: string;
  state: string;
  date: string;
  electionType: string;
}

interface PartyGroup {
  partyName: string;
  seats: number;
  totalVotes: bigint;
  avgVoteShare: number;
  isLeading: boolean;
  candidates: ElectionResultExt[];
}

function groupByParty(results: ElectionResult[]): PartyGroup[] {
  const map = new Map<string, PartyGroup>();
  for (const r of results) {
    const p = r.partyName || "Independent";
    if (!map.has(p)) {
      map.set(p, {
        partyName: p,
        seats: 0,
        totalVotes: 0n,
        avgVoteShare: 0,
        isLeading: false,
        candidates: [],
      });
    }
    const g = map.get(p)!;
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
    (a, b) => b.seats - a.seats || b.candidates.length - a.candidates.length,
  );
}

function VoteShareBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-700`}
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

const PARTY_COLORS = [
  "bg-blue-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-yellow-500",
  "bg-pink-500",
];

export default function ElectionResultsPage() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [stateQuery, setStateQuery] = useState("India");
  const [inputValue, setInputValue] = useState("India");
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [electionType, setElectionType] = useState<
    "all" | "lok-sabha" | "state-assembly"
  >("all");

  const fetchMutation = useMutation({
    mutationFn: async (state: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.fetchElectionResults(state);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["election-results"] }),
  });

  const seedMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.seedElectionResults();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["election-results"] }),
  });

  const resultsQuery = useQuery<ElectionResultExt[]>({
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
    staleTime: 5 * 60_000,
    refetchInterval: 5 * 60_000,
  });

  const _allResultsQuery = useQuery<ElectionResultExt[]>({
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
    staleTime: 5 * 60_000,
  });

  const upcomingQuery = useQuery<UpcomingElection[]>({
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
    staleTime: 60 * 60_000,
  });

  useEffect(() => {
    const id = setInterval(
      () => qc.invalidateQueries({ queryKey: ["election-results"] }),
      5 * 60_000,
    );
    return () => clearInterval(id);
  }, [qc]);

  function handleSearch(e: React.FormEvent) {
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
  const selectedCandidates = selectedParty
    ? (parties.find((p) => p.partyName === selectedParty)?.candidates ?? [])
    : [];

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
            🗳️
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground font-display">
              Election Results
            </h1>
            <p className="text-sm text-muted-foreground">
              Live & latest election results by state or country
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs text-muted-foreground"
            data-ocid="election.auto-refresh-badge"
          >
            Auto-refreshing every 5 min
          </Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => fetchMutation.mutate(stateQuery)}
            disabled={isRefreshing}
            data-ocid="election.refresh_button"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Fetching…" : "Refresh"}
          </Button>
        </div>
      </div>

      {upcomingQuery.data &&
        Array.isArray(upcomingQuery.data) &&
        upcomingQuery.data.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              Upcoming Elections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {upcomingQuery.data.map((ue) => (
                <Card key={ue.name} className="border border-border bg-card">
                  <CardContent className="p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">
                        {ue.name}
                      </p>
                      <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">
                        Upcoming
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{ue.state}</p>
                    <p className="text-xs text-muted-foreground">{ue.date}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      {ue.electionType}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

      <form
        onSubmit={handleSearch}
        className="flex gap-2 items-center flex-wrap"
        data-ocid="election.search_form"
      >
        <div className="relative flex-1 min-w-52">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="State / Country (e.g. India, Maharashtra, Bihar)"
            className="pl-8 h-9 text-sm"
            data-ocid="election.search_input"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="gap-1.5 h-9"
          disabled={isRefreshing}
          data-ocid="election.search_button"
        >
          <Vote className="w-3.5 h-3.5" /> Check Results
        </Button>
      </form>

      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "lok-sabha", "state-assembly"] as const).map((t) => (
          <Button
            key={t}
            type="button"
            variant={electionType === t ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setElectionType(t)}
            data-ocid={`election.filter.${t}`}
          >
            {t === "all"
              ? "All"
              : t === "lok-sabha"
                ? "Lok Sabha"
                : "State Assembly"}
          </Button>
        ))}
      </div>

      {filteredResults.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Parties", value: parties.length },
            {
              label: "Seats Won",
              value: parties.reduce((s, p) => s + p.seats, 0),
            },
            { label: "Constituencies", value: filteredResults.length },
            {
              label: "Leading Party",
              value: leadingParty?.partyName ?? "—",
              small: true,
            },
          ].map((stat) => (
            <Card key={stat.label} className="border border-border">
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p
                  className={`font-bold font-mono text-foreground ${stat.small ? "text-sm truncate" : "text-2xl"}`}
                >
                  {String(stat.value)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : resultsQuery.isError ? (
        <div
          className="py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="election.error_state"
        >
          <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground">
            Unable to load results
          </p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Could not load election results.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => resultsQuery.refetch()}
            data-ocid="election.retry_button"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </Button>
        </div>
      ) : parties.length === 0 ? (
        <div
          className="py-16 text-center bg-card border border-border rounded-xl"
          data-ocid="election.empty_state"
        >
          <Trophy className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground text-base">
            No results for "{stateQuery}"
          </p>
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            Click <strong>Check Results</strong> to fetch live data, or try a
            different state.
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button
              size="sm"
              className="gap-1.5"
              onClick={() => fetchMutation.mutate(stateQuery)}
              disabled={isRefreshing}
              data-ocid="election.fetch_button"
            >
              <Vote className="w-3.5 h-3.5" />{" "}
              {isRefreshing ? "Fetching…" : "Fetch Live Results"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
              data-ocid="election.seed_button"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${seedMutation.isPending ? "animate-spin" : ""}`}
              />{" "}
              {seedMutation.isPending
                ? "Loading…"
                : "Load India 2024/2025 Data"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            data-ocid="election.parties.list"
          >
            {parties.map((party, idx) => (
              <div
                key={party.partyName}
                data-ocid={`election.party.item.${idx + 1}`}
              >
                <Card
                  className={`border cursor-pointer transition-all hover:shadow-md ${
                    selectedParty === party.partyName
                      ? "border-primary ring-1 ring-primary"
                      : "border-border"
                  }`}
                  onClick={() =>
                    setSelectedParty(
                      selectedParty === party.partyName
                        ? null
                        : party.partyName,
                    )
                  }
                >
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-bold leading-tight">
                        {party.partyName}
                      </CardTitle>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {party.isLeading && (
                          <Badge className="text-[10px] bg-amber-500 text-white h-4 px-1.5">
                            🏆 Leading
                          </Badge>
                        )}
                        {party.seats > 0 && (
                          <Badge className="text-[10px] bg-green-600 text-white h-4 px-1.5">
                            {party.seats} seat{party.seats !== 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {party.candidates.length} candidates
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        {party.avgVoteShare.toFixed(1)}% avg
                      </span>
                    </div>
                    <VoteShareBar
                      pct={party.avgVoteShare}
                      color={PARTY_COLORS[idx % PARTY_COLORS.length]}
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {Number(party.totalVotes).toLocaleString("en-IN")} votes
                      </span>
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          {selectedParty && selectedCandidates.length > 0 && (
            <Card
              className="border border-border"
              data-ocid="election.constituency.panel"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {selectedParty} — Constituencies
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs px-2"
                    onClick={() => setSelectedParty(null)}
                    data-ocid="election.constituency.close_button"
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                          Constituency
                        </th>
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                          Candidate
                        </th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">
                          Votes
                        </th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">
                          Vote %
                        </th>
                        <th className="text-center px-4 py-2 font-medium text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCandidates.map((c, i) => (
                        <tr
                          key={c.id}
                          className="border-b border-border/40 hover:bg-muted/20"
                          data-ocid={`election.constituency.item.${i + 1}`}
                        >
                          <td className="px-4 py-2 font-medium text-foreground">
                            {c.constituency}
                          </td>
                          <td className="px-4 py-2 text-foreground">
                            {c.candidateName}
                          </td>
                          <td className="px-4 py-2 text-right tabular-nums text-foreground">
                            {Number(c.votes).toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-2 text-right tabular-nums text-foreground">
                            {c.voteShare.toFixed(1)}%
                          </td>
                          <td className="px-4 py-2 text-center">
                            {c.isWon ? (
                              <Badge className="text-[10px] bg-green-600 text-white h-4 px-1">
                                Won
                              </Badge>
                            ) : c.isLeading ? (
                              <Badge className="text-[10px] bg-amber-500 text-white h-4 px-1">
                                Leading
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-[10px] h-4 px-1"
                              >
                                Behind
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <Badge
                              className={`text-[10px] h-4 px-1 ${c.source === "api" || c.source === "eci" ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}
                            >
                              {c.source === "api" || c.source === "eci"
                                ? "Live"
                                : "Sample"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
