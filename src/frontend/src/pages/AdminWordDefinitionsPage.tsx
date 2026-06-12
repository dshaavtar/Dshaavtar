import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Globe, Languages, RefreshCw, Sprout } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguageLearning } from "../hooks/useLanguageLearning";

const LANGUAGE_PAIR_COLORS: Record<string, string> = {
  "English → Hindi":
    "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  "English → Spanish":
    "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  "English → French":
    "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  "English → German":
    "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
  "English → Japanese":
    "bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400",
  "English → Mandarin":
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
  "Hindi → English":
    "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
};

function getLanguageBadgeClass(language: string): string {
  return LANGUAGE_PAIR_COLORS[language] ?? "bg-muted text-muted-foreground";
}

function AncientTranslationBadge({ text }: { text: string }) {
  if (!text) return <span className="text-muted-foreground text-xs">—</span>;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded px-2 py-0.5">
      <Globe className="w-3 h-3 shrink-0" />
      {text}
    </span>
  );
}

function TableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-32 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-28 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>
    </TableRow>
  );
}

export default function AdminWordDefinitionsPage() {
  const [seeding, setSeeding] = useState(false);
  const queryClient = useQueryClient();
  const { getWordDefinitionsForDataExplorer, seedWordDefinitions } =
    useLanguageLearning();

  const query = useQuery({
    queryKey: ["word-definitions-admin"],
    queryFn: () => getWordDefinitionsForDataExplorer(),
    staleTime: 60_000,
  });

  const rows = query.data ?? [];
  const total = rows.length;

  async function handleSeed() {
    setSeeding(true);
    try {
      const result = await seedWordDefinitions();
      if (result && !result.ok) {
        toast.error(result.errorDetail ?? "Seed failed");
      } else {
        toast.success("Common vocabulary seeded successfully!");
        queryClient.invalidateQueries({ queryKey: ["word-definitions-admin"] });
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Unknown error during seed";
      toast.error(msg);
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto" data-ocid="word_definitions.page">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Languages className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Word Definitions
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Vocabulary database for all language pairs — includes ancient
              translations (Sanskrit, Latin, Old Arabic).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["word-definitions-admin"],
              })
            }
            disabled={query.isLoading}
            data-ocid="word_definitions.refresh_button"
          >
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSeed}
            disabled={seeding || query.isLoading}
            data-ocid="word_definitions.seed_button"
          >
            {seeding ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Seeding…
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sprout className="w-4 h-4" />
                Seed Common Words
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Stats strip */}
      {!query.isLoading && (
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>
            {total === 0
              ? "No definitions yet"
              : `${total.toLocaleString()} word definition${total !== 1 ? "s" : ""}`}
          </span>
        </div>
      )}

      {/* Loading state */}
      {query.isLoading && (
        <div
          data-ocid="word_definitions.loading_state"
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Word</TableHead>
                <TableHead>Language Pair</TableHead>
                <TableHead>Ancient Translation</TableHead>
                <TableHead>IPA Pronunciation</TableHead>
                <TableHead className="text-right">Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <TableRowSkeleton key={i} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Error state */}
      {query.isError && !query.isLoading && (
        <div
          data-ocid="word_definitions.error_state"
          className="bg-card border border-border rounded-xl p-10 text-center"
        >
          <Languages className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-base font-medium text-foreground mb-1">
            Failed to load word definitions
          </p>
          <p className="text-sm text-muted-foreground">
            {query.error instanceof Error
              ? query.error.message
              : "Please try refreshing the page."}
          </p>
        </div>
      )}

      {/* Empty state */}
      {!query.isLoading && !query.isError && rows.length === 0 && (
        <div
          data-ocid="word_definitions.empty_state"
          className="bg-card border border-border rounded-xl p-12 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No word definitions found
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            The vocabulary database is empty. Click{" "}
            <strong>Seed Common Words</strong> to populate 200+ common
            vocabulary entries across all language pairs — including Sanskrit,
            Latin, and Old Arabic ancient translations.
          </p>
          <Button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            data-ocid="word_definitions.seed_button"
          >
            {seeding ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Seeding…
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sprout className="w-4 h-4" />
                Seed Common Words
              </span>
            )}
          </Button>
        </div>
      )}

      {/* Table */}
      {!query.isLoading && !query.isError && rows.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Word</TableHead>
                <TableHead className="font-semibold">Language Pair</TableHead>
                <TableHead className="font-semibold">
                  Ancient Translation
                </TableHead>
                <TableHead className="font-semibold">
                  IPA Pronunciation
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Examples
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`word_definitions.item.${idx + 1}`}
                >
                  {/* Word */}
                  <TableCell>
                    <span className="font-semibold text-foreground">
                      {row.word}
                    </span>
                  </TableCell>

                  {/* Language pair */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium rounded-full px-2.5 py-0.5 ${getLanguageBadgeClass(
                        row.language,
                      )}`}
                    >
                      <Globe className="w-3 h-3 shrink-0" />
                      {row.language || "—"}
                    </span>
                  </TableCell>

                  {/* Ancient translation */}
                  <TableCell>
                    <AncientTranslationBadge text={row.ancientTranslation} />
                  </TableCell>

                  {/* IPA */}
                  <TableCell>
                    {row.ipa ? (
                      <code className="text-xs text-primary bg-primary/8 rounded px-1.5 py-0.5 font-mono">
                        {row.ipa}
                      </code>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>

                  {/* Examples count — row type doesn't expose count, show badge */}
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      view
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
