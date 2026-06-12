import { createActor } from "@/backend";
import type { MatchScore } from "@/backend";

interface MatchScoreExt extends MatchScore {
  leagueName: string;
}
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, RefreshCw, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function statusBadge(status: string) {
  const s = status.toLowerCase();
  if (
    s.includes("live") ||
    s.includes("in progress") ||
    s.includes("inprogress")
  )
    return (
      <Badge className="bg-green-500 text-white text-[11px] font-bold uppercase animate-pulse">
        ● Live
      </Badge>
    );
  if (
    s.includes("end") ||
    s.includes("final") ||
    s.includes("finish") ||
    s.includes("ft") ||
    s.includes("full time")
  )
    return (
      <Badge className="bg-muted-foreground/30 text-muted-foreground text-[11px] font-semibold uppercase">
        Ended
      </Badge>
    );
  return (
    <Badge className="bg-blue-500/15 text-blue-600 border border-blue-500/30 text-[11px] font-semibold uppercase">
      Scheduled
    </Badge>
  );
}

function MatchCard({ match }: { match: MatchScoreExt }) {
  const fetchedAt =
    match.fetchedAt && match.fetchedAt > 0n
      ? new Date(Number(match.fetchedAt) / 1_000_000)
      : null;

  return (
    <Card className="border border-border bg-card hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground capitalize">
              {match.sport}
            </span>
            {match.leagueName && (
              <span className="text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded inline-block w-fit">
                {match.leagueName}
              </span>
            )}
          </div>
          {statusBadge(match.status)}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 text-right">
            <p className="font-bold text-foreground text-sm leading-tight">
              {match.homeTeam}
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="font-mono font-bold text-2xl text-foreground tabular-nums">
              {match.homeScore}
            </span>
            <span className="text-muted-foreground font-bold text-lg">–</span>
            <span className="font-mono font-bold text-2xl text-foreground tabular-nums">
              {match.awayScore}
            </span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground text-sm leading-tight">
              {match.awayTeam}
            </p>
          </div>
        </div>
        {match.matchTime && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            {match.matchTime}
          </p>
        )}
        {fetchedAt && (
          <p className="text-center text-[11px] text-muted-foreground mt-1">
            Updated {fetchedAt.toLocaleTimeString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-36 rounded-xl" />
      ))}
    </div>
  );
}

export default function TodayMatchScoresPage() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [activeSport, setActiveSport] = useState<
    "all" | "football" | "cricket"
  >("all");
  const [isFetchingScores, setIsFetchingScores] = useState(false);

  // On mount: trigger live sports data fetch first, then queries will populate
  useEffect(() => {
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
        // silent — queries will still show whatever is cached
      } finally {
        if (!cancelled) setIsFetchingScores(false);
      }
    }
    fetchScores();
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching, qc]);

  // All matches (default view)
  const allQuery = useQuery<MatchScore[]>({
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
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  // Football: by sport filter
  const footballQuery = useQuery<MatchScore[]>({
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
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  // Cricket: by sport filter
  const cricketQuery = useQuery<MatchScore[]>({
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
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  // Auto-refresh every 30s
  useEffect(() => {
    const id = setInterval(() => {
      qc.invalidateQueries({ queryKey: ["match-scores-all"] });
      qc.invalidateQueries({ queryKey: ["match-scores-football"] });
      qc.invalidateQueries({ queryKey: ["match-scores-cricket"] });
    }, 30_000);
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
      // silent
    } finally {
      setIsFetchingScores(false);
    }
  }

  const allMatches = allQuery.data ?? [];
  const footballMatches = footballQuery.data ?? [];
  const cricketMatches = cricketQuery.data ?? [];
  const isAnyFetching =
    isFetchingScores ||
    allQuery.isFetching ||
    footballQuery.isFetching ||
    cricketQuery.isFetching;

  // Split all matches into upcoming vs live/ended
  function splitMatches(matches: MatchScore[]) {
    const upcoming: MatchScore[] = [];
    const rest: MatchScore[] = [];
    for (const m of matches) {
      const s = m.status.toLowerCase();
      const isScheduled =
        !s.includes("live") &&
        !s.includes("in progress") &&
        !s.includes("inprogress") &&
        !s.includes("end") &&
        !s.includes("final") &&
        !s.includes("finish") &&
        !s.includes("ft") &&
        !s.includes("full time");
      if (isScheduled) upcoming.push(m);
      else rest.push(m);
    }
    return { upcoming, rest };
  }

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
            🏆
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground font-display">
              Today's Match Scores
            </h1>
            <p className="text-sm text-muted-foreground">
              Live football and cricket scores
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAnyFetching && (
            <span
              className="text-xs text-muted-foreground flex items-center gap-1"
              data-ocid="match-scores.refreshing_state"
            >
              <RefreshCw className="w-3 h-3 animate-spin" />
              Refreshing scores…
            </span>
          )}
          <Badge
            variant="outline"
            className="text-xs text-muted-foreground"
            data-ocid="match-scores.auto-refresh-badge"
          >
            Auto-refreshing every 30s
          </Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleManualRefresh}
            disabled={isAnyFetching}
            data-ocid="match-scores.refresh_button"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isAnyFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs
        value={activeSport}
        onValueChange={(v) =>
          setActiveSport(v as "all" | "football" | "cricket")
        }
        className="w-full"
      >
        <TabsList data-ocid="match-scores.tabs">
          <TabsTrigger
            value="all"
            data-ocid="match-scores.all.tab"
            onClick={() => setActiveSport("all")}
          >
            🏟️ All
          </TabsTrigger>
          <TabsTrigger
            value="football"
            data-ocid="match-scores.football.tab"
            onClick={() => setActiveSport("football")}
          >
            ⚽ Football
          </TabsTrigger>
          <TabsTrigger
            value="cricket"
            data-ocid="match-scores.cricket.tab"
            onClick={() => setActiveSport("cricket")}
          >
            🏏 Cricket
          </TabsTrigger>
        </TabsList>

        {/* All Tab */}
        <TabsContent value="all" className="mt-4 space-y-4">
          {allQuery.isLoading || (isFetching && !allMatches.length) ? (
            <SkeletonCards />
          ) : allMatches.length === 0 ? (
            <div
              className="py-12 text-center bg-card border border-border rounded-xl"
              data-ocid="match-scores.all.empty_state"
            >
              <Trophy className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">No matches today</p>
              <p className="text-sm text-muted-foreground mt-1">
                No cricket or football matches scheduled for today. India
                domestic leagues (IPL, ISL, I-League) and international matches
                are checked.
              </p>
            </div>
          ) : (
            (() => {
              const { upcoming, rest } = splitMatches(allMatches);
              return (
                <div className="space-y-6">
                  {upcoming.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                        Upcoming Matches
                      </h2>
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                        data-ocid="match-scores.all.upcoming_list"
                      >
                        {upcoming.map((m, i) => (
                          <div
                            key={m.id}
                            data-ocid={`match-scores.all.upcoming.item.${i + 1}`}
                          >
                            <MatchCard match={m} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {rest.length > 0 && (
                    <div className="space-y-3">
                      {upcoming.length > 0 && (
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                          Live &amp; Recent
                        </h2>
                      )}
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                        data-ocid="match-scores.all.list"
                      >
                        {rest.map((m, i) => (
                          <div
                            key={m.id}
                            data-ocid={`match-scores.all.item.${i + 1}`}
                          >
                            <MatchCard match={m} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </TabsContent>

        {/* Football Tab */}
        <TabsContent value="football" className="mt-4 space-y-4">
          {footballQuery.isLoading ||
          (isFetching && !footballMatches.length) ? (
            <SkeletonCards />
          ) : footballQuery.isError ? (
            <div
              className="py-12 text-center bg-card border border-border rounded-xl"
              data-ocid="match-scores.football.error_state"
            >
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                Unable to fetch scores
              </p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Could not load live football scores. Please try again.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => footballQuery.refetch()}
                data-ocid="match-scores.football.retry_button"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </Button>
            </div>
          ) : footballMatches.length === 0 ? (
            <div
              className="py-12 text-center bg-card border border-border rounded-xl"
              data-ocid="match-scores.football.empty_state"
            >
              <Trophy className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                No football matches today
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                No football matches scheduled for today. India domestic leagues
                (ISL, I-League) and international matches are checked.
              </p>
            </div>
          ) : (
            (() => {
              const { upcoming, rest } = splitMatches(footballMatches);
              return (
                <div className="space-y-6">
                  {upcoming.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                        Upcoming Matches
                      </h2>
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                        data-ocid="match-scores.football.upcoming_list"
                      >
                        {upcoming.map((m, i) => (
                          <div
                            key={m.id}
                            data-ocid={`match-scores.football.upcoming.item.${i + 1}`}
                          >
                            <MatchCard match={m} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {rest.length > 0 && (
                    <div className="space-y-3">
                      {upcoming.length > 0 && (
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                          Live &amp; Recent
                        </h2>
                      )}
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                        data-ocid="match-scores.football.list"
                      >
                        {rest.map((m, i) => (
                          <div
                            key={m.id}
                            data-ocid={`match-scores.football.item.${i + 1}`}
                          >
                            <MatchCard match={m} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </TabsContent>

        {/* Cricket Tab */}
        <TabsContent value="cricket" className="mt-4 space-y-4">
          {cricketQuery.isLoading || (isFetching && !cricketMatches.length) ? (
            <SkeletonCards />
          ) : cricketMatches.length === 0 ? (
            <div
              className="py-12 text-center bg-card border border-border rounded-xl"
              data-ocid="match-scores.cricket.empty_state"
            >
              <Trophy className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                No cricket matches today
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                No cricket matches scheduled for today. India domestic leagues
                (IPL, Ranji Trophy) and international matches are checked.
              </p>
            </div>
          ) : (
            (() => {
              const { upcoming, rest } = splitMatches(cricketMatches);
              return (
                <div className="space-y-6">
                  {upcoming.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                        Upcoming Matches
                      </h2>
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                        data-ocid="match-scores.cricket.upcoming_list"
                      >
                        {upcoming.map((m, i) => (
                          <div
                            key={m.id}
                            data-ocid={`match-scores.cricket.upcoming.item.${i + 1}`}
                          >
                            <MatchCard match={m} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {rest.length > 0 && (
                    <div className="space-y-3">
                      {upcoming.length > 0 && (
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                          Live &amp; Recent
                        </h2>
                      )}
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                        data-ocid="match-scores.cricket.list"
                      >
                        {rest.map((m, i) => (
                          <div
                            key={m.id}
                            data-ocid={`match-scores.cricket.item.${i + 1}`}
                          >
                            <MatchCard match={m} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
