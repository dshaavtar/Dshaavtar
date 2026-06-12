import { createActor } from "@/backend";
import type {
  MarketSearchQuery,
  MarketSearchResult,
  TradeRecommendation,
} from "@/backend";

interface RecommendationRowProps {
  rec: TradeRecommendation;
  results: MarketSearchResult[];
}

interface MarketSearchQueryExt extends MarketSearchQuery {
  matchedSymbols: string[];
}
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  Loader2,
  Search,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  "Others",
];

type TabKey =
  | "all"
  | "equities"
  | "commodities"
  | "currencies"
  | "metals"
  | "options";

const INSTRUMENT_TYPE_MAP: Record<string, TabKey> = {
  equity: "equities",
  stock: "equities",
  commodity: "commodities",
  currency: "currencies",
  forex: "currencies",
  metal: "metals",
  option: "options",
  put: "options",
  call: "options",
};

function normalizeType(type: string): TabKey {
  const lower = type.toLowerCase();
  for (const [key, tab] of Object.entries(INSTRUMENT_TYPE_MAP)) {
    if (lower.includes(key)) return tab;
  }
  return "all";
}

function filterByTab(
  results: MarketSearchResult[],
  tab: TabKey,
): MarketSearchResult[] {
  if (tab === "all") return results;
  return results.filter((r) => normalizeType(r.instrumentType) === tab);
}

function InstrumentTypeBadge({ type }: { type: string }) {
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
  } else if (
    lower.includes("option") ||
    lower.includes("put") ||
    lower.includes("call")
  ) {
    color = "bg-pink-500/10 text-pink-600 border-pink-200";
  } else {
    color = "bg-muted text-muted-foreground border-border";
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${color}`}
    >
      {type}
    </span>
  );
}

function ActionBadge({ action }: { action: string }) {
  const up = action.toLowerCase();
  if (up === "buy")
    return (
      <Badge className="bg-green-500 text-white hover:bg-green-600 uppercase text-[11px] font-bold">
        BUY
      </Badge>
    );
  if (up === "sell")
    return (
      <Badge className="bg-red-500 text-white hover:bg-red-600 uppercase text-[11px] font-bold">
        SELL
      </Badge>
    );
  return (
    <Badge className="bg-yellow-500 text-white hover:bg-yellow-600 uppercase text-[11px] font-bold">
      HOLD
    </Badge>
  );
}

function PriceChange({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span
      className={`flex items-center gap-0.5 text-sm font-medium ${
        isPositive ? "text-green-600" : "text-red-500"
      }`}
    >
      {isPositive ? (
        <ArrowUpRight className="w-3.5 h-3.5" />
      ) : (
        <ArrowDownRight className="w-3.5 h-3.5" />
      )}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

function ResultCard({ result }: { result: MarketSearchResult }) {
  const isPositive = result.changePercent >= 0;
  const lastUpdated =
    result.lastUpdated && result.lastUpdated > 0n
      ? new Date(Number(result.lastUpdated) / 1_000_000).toLocaleString()
      : new Date().toLocaleString();
  return (
    <Card className="border border-border bg-card hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">
              {result.symbol}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              {result.name}
            </p>
          </div>
          <InstrumentTypeBadge type={result.instrumentType} />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p
              className={`text-xl font-bold font-mono ${
                isPositive ? "text-green-600" : "text-red-500"
              }`}
            >
              {result.currency}{" "}
              {result.currentPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
            </p>
            <PriceChange value={result.changePercent} />
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">
              {result.exchangeName}
            </p>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          Last updated: {lastUpdated}
        </p>
      </CardContent>
    </Card>
  );
}

function RecommendationRow({ rec, results }: RecommendationRowProps) {
  const result = results.find((r) => r.symbol === rec.symbol);
  const currency = result?.currency ?? "₹";
  const currentPrice = result?.currentPrice ?? 0;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
        <span className="font-mono font-bold text-sm text-foreground">
          {rec.symbol}
        </span>
        <ActionBadge action={rec.action} />
      </div>
      <div className="flex flex-wrap gap-4 text-sm flex-1">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
            Current Price
          </p>
          <p className="font-semibold text-foreground font-mono">
            {currency}{" "}
            {currentPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            })}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
            Stop Loss
          </p>
          <p className="font-semibold text-red-500 font-mono">
            {rec.stopLossPrice.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
            Target
          </p>
          <p className="font-semibold text-green-600 font-mono">
            {rec.targetPrice.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
            Target Date
          </p>
          <p className="font-semibold text-foreground">
            {rec.targetDate || "~30 days"}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
            Accuracy
          </p>
          <p className="font-semibold text-foreground">
            {rec.accuracyPrediction || `${(rec.confidence * 100).toFixed(0)}%`}
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground sm:max-w-xs">
        {rec.reasoning}
      </p>
    </div>
  );
}

function ResultsView({ data }: { data: MarketSearchQueryExt }) {
  const [tab, setTab] = useState<TabKey>("all");
  const filtered = filterByTab(data.results, tab);
  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: data.results.length },
    {
      key: "equities",
      label: "Equities",
      count: filterByTab(data.results, "equities").length,
    },
    {
      key: "commodities",
      label: "Commodities",
      count: filterByTab(data.results, "commodities").length,
    },
    {
      key: "currencies",
      label: "Currencies",
      count: filterByTab(data.results, "currencies").length,
    },
    {
      key: "metals",
      label: "Metals",
      count: filterByTab(data.results, "metals").length,
    },
    {
      key: "options",
      label: "Options",
      count: filterByTab(data.results, "options").length,
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
        <TabsList className="flex-wrap h-auto gap-1">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.key}
              value={t.key}
              data-ocid={`market.tab.${t.key}`}
            >
              {t.label}
              {t.count > 0 && (
                <span className="ml-1.5 text-[10px] bg-muted rounded-full px-1.5 py-0.5">
                  {t.count}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t) => (
          <TabsContent key={t.key} value={t.key} className="mt-4">
            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-sm py-6 text-center">
                No {t.label.toLowerCase()} found for this search.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filtered.map((r, i) => (
                  <ResultCard key={`${r.symbol}-${i}`} result={r} />
                ))}
              </div>
            )}
            {tab === "all" && data.results.length === 0 && (
              <div className="py-8 text-center text-muted-foreground text-sm">
                No symbols found matching &ldquo;{data.scriptName}&rdquo; in{" "}
                {data.country}. Try a broader search term.
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {data.recommendations.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Trade Recommendations ({data.recommendations.length})
          </h3>
          <div className="space-y-2">
            {data.recommendations.map((rec, i) => (
              <RecommendationRow
                key={`${rec.symbol}-${i}`}
                rec={rec}
                results={data.results}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarketCommodityPage() {
  const { actor, isFetching } = useActor(createActor);
  const [scriptName, setScriptName] = useState("");
  const [country, setCountry] = useState("India");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<MarketSearchQuery | null>(
    null,
  );
  const [searchError, setSearchError] = useState<string | null>(null);
  const [history, setHistory] = useState<MarketSearchQuery[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState<MarketSearchQuery | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (actor && !isFetching) loadHistory();
  }, [actor, isFetching]);

  async function loadHistory() {
    setIsLoadingHistory(true);
    try {
      const data = await actor!.getMarketSearchHistory();
      setHistory(
        [...data].sort((a, b) => Number(b.searchedAt) - Number(a.searchedAt)),
      );
    } catch {
      // silent — table shows empty
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
        setHistory((prev) =>
          [res.ok, ...prev.filter((h) => h.id !== res.ok.id)].sort(
            (a, b) => Number(b.searchedAt) - Number(a.searchedAt),
          ),
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

  async function handleDelete(id: string) {
    if (!actor) return;
    setDeletingId(id);
    try {
      await actor.deleteMarketSearch(id);
      setHistory((prev) => prev.filter((h) => h.id !== id));
      if (searchResult?.id === id) setSearchResult(null);
    } catch {
      // silent
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  function openView(record: MarketSearchQuery) {
    setViewModalData(record);
    setViewModalOpen(true);
  }

  return (
    <div className="p-6 space-y-8 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
          📈
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground font-display">
            Market & Commodity Search
          </h1>
          <p className="text-sm text-muted-foreground">
            Search live share prices, commodities, currencies, metals and
            options across exchanges
          </p>
        </div>
      </div>

      {/* Search Form */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            Search Instruments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label
                htmlFor="script-name"
                className="text-xs mb-1.5 block text-muted-foreground"
              >
                Script Name
              </Label>
              <Input
                id="script-name"
                data-ocid="market.search_input"
                placeholder="e.g. India Tech Stocks, Gold Watch, USD/INR"
                value={scriptName}
                onChange={(e) => setScriptName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                disabled={isSearching}
                className="h-9"
              />
            </div>
            <div className="sm:w-48">
              <Label
                htmlFor="country"
                className="text-xs mb-1.5 block text-muted-foreground"
              >
                Country
              </Label>
              <Select
                value={country}
                onValueChange={setCountry}
                disabled={isSearching}
              >
                <SelectTrigger
                  id="country"
                  data-ocid="market.country_select"
                  className="h-9"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:self-end">
              <Button
                type="button"
                data-ocid="market.search_button"
                onClick={handleSearch}
                disabled={isSearching || !scriptName.trim() || isFetching}
                className="h-9 gap-2 w-full sm:w-auto"
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {isSearching ? "Searching…" : "Search"}
              </Button>
            </div>
          </div>

          {searchError && (
            <div
              data-ocid="market.error_state"
              className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {searchError}
            </div>
          )}
          {!searchError && !searchResult && scriptName.trim() && (
            <p className="mt-3 text-xs text-muted-foreground">
              Searches exact match first, then partial matches
            </p>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {isSearching && (
        <div data-ocid="market.loading_state" className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      )}

      {!isSearching && searchResult && (
        <Card
          className="border border-border bg-card shadow-sm"
          data-ocid="market.results_panel"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Results for &ldquo;{searchResult.scriptName}&rdquo; —{" "}
                  {searchResult.country}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {searchResult.results.length} instruments &nbsp;·&nbsp;
                  {searchResult.recommendations.length} recommendations
                  &nbsp;·&nbsp; searched{" "}
                  {new Date(
                    Number(searchResult.searchedAt) / 1_000_000,
                  ).toLocaleString()}
                </p>
                {(searchResult as MarketSearchQueryExt).matchedSymbols && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Matched{" "}
                    {
                      (searchResult as MarketSearchQueryExt).matchedSymbols
                        .length
                    }{" "}
                    symbols
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResultsView data={searchResult as MarketSearchQueryExt} />
          </CardContent>
        </Card>
      )}

      {/* Search History */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            Search History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoadingHistory ? (
            <div className="p-6 space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : history.length === 0 ? (
            <div
              data-ocid="market.history.empty_state"
              className="py-12 flex flex-col items-center gap-2 text-muted-foreground"
            >
              <Search className="w-8 h-8 opacity-30" />
              <p className="text-sm">
                No searches yet. Run a search above to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Script Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right"># Results</TableHead>
                    <TableHead className="text-right">Recs</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((item, idx) => (
                    <TableRow
                      key={item.id}
                      data-ocid={`market.history.item.${idx + 1}`}
                    >
                      <TableCell className="font-medium text-sm">
                        {item.scriptName}
                      </TableCell>
                      <TableCell className="text-sm">{item.country}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(
                          Number(item.searchedAt) / 1_000_000,
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {item.results.length}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {item.recommendations.length}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            data-ocid={`market.history.view_button.${idx + 1}`}
                            className="h-7 w-7 p-0"
                            onClick={() => openView(item)}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            data-ocid={`market.history.delete_button.${idx + 1}`}
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            onClick={() => setConfirmDeleteId(item.id)}
                            disabled={deletingId === item.id}
                          >
                            {deletingId === item.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent
          className="max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          data-ocid="market.view_dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-base">
              {viewModalData?.scriptName} — {viewModalData?.country}
            </DialogTitle>
          </DialogHeader>
          {viewModalData && <ResultsView data={viewModalData} />}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={!!confirmDeleteId}
        onOpenChange={(open) => !open && setConfirmDeleteId(null)}
      >
        <DialogContent
          className="max-w-sm"
          data-ocid="market.confirm_delete_dialog"
        >
          <DialogHeader>
            <DialogTitle>Delete Search Record?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently remove the search record and its results. This
            cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              data-ocid="market.confirm_delete_cancel"
              onClick={() => setConfirmDeleteId(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              data-ocid="market.confirm_delete_button"
              onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
              disabled={!!deletingId}
            >
              {deletingId ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
