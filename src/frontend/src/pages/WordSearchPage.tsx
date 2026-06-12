import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, BookmarkPlus, Languages, Mic2, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { WordDefinition } from "../backend.d";
import { useLanguageLearning } from "../hooks/useLanguageLearning";

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
  "Sanskrit",
];

function WordResultSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
      <Separator />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

function TranslationsTable({ definition }: { definition: WordDefinition }) {
  const rows = definition.translations ?? [];
  if (rows.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
        <Languages className="w-4 h-4 text-primary" />
        Translations
      </h3>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-3 py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide w-1/3">
                Language
              </th>
              <th className="text-left px-3 py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                Translation
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([lang, value], i) => (
              <tr
                key={lang}
                className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}
              >
                <td className="px-3 py-2 font-medium text-foreground">
                  {lang}
                </td>
                <td className="px-3 py-2 text-foreground">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AncientTranslations({ definition }: { definition: WordDefinition }) {
  const value = definition.ancientTranslation;
  if (!value) return null;
  return (
    <div className="bg-muted/40 rounded-lg border border-border p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        ✦ Ancient Language Origins
      </h3>
      <div className="text-sm text-foreground font-medium">{value}</div>
    </div>
  );
}

export default function WordSearchPage() {
  const [inputWord, setInputWord] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("English");
  const [searchParams, setSearchParams] = useState<{
    word: string;
    language: string;
  } | null>(null);
  const queryClient = useQueryClient();
  const { searchWordDefinition, saveWord } = useLanguageLearning();

  const resultQuery = useQuery({
    queryKey: ["word-definition", searchParams?.word, searchParams?.language],
    queryFn: () =>
      searchParams
        ? searchWordDefinition(searchParams.word, searchParams.language)
        : Promise.resolve(null),
    enabled: !!searchParams,
    staleTime: 60_000,
  });

  const saveMutation = useMutation({
    mutationFn: (def: WordDefinition) =>
      saveWord(
        "guest_user",
        def.word,
        def.language,
        def.translations?.[0]?.[1] ?? "",
        def.ancientTranslation ?? "",
        def.ipa ?? "",
        def.examples ?? [],
      ),
    onSuccess: (result) => {
      if (result.ok) {
        toast.success("Word saved to your vocabulary!", { duration: 4000 });
        queryClient.invalidateQueries({ queryKey: ["saved-words"] });
      } else {
        toast.error(result.errorDetail ?? "Failed to save word");
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });

  function handleSearch() {
    const trimmed = inputWord.trim();
    if (!trimmed) return;
    setSearchParams({ word: trimmed, language: searchLanguage });
  }

  const definition = resultQuery.data;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Word Search</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Look up words in any language — including ancient language origins.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="word_search.search_input"
              className="pl-9"
              placeholder="Enter a word to look up…"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            data-ocid="word_search.search_button"
            onClick={handleSearch}
            disabled={!inputWord.trim()}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium shrink-0">
            Language:
          </span>
          {SEARCH_LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              data-ocid="word_search.filter.tab"
              onClick={() => setSearchLanguage(lang)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors duration-150 ${
                searchLanguage === lang
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {resultQuery.isLoading ? (
        <WordResultSkeleton />
      ) : resultQuery.isError ? (
        <div
          data-ocid="word_search.error_state"
          className="text-center py-12 text-muted-foreground"
        >
          Failed to search. Please try again.
        </div>
      ) : !searchParams ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium">
            Enter a word above to look it up
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Translations, IPA pronunciation, and ancient language roots.
          </p>
        </div>
      ) : definition == null ? (
        <div
          data-ocid="word_search.empty_state"
          className="text-center py-12 bg-card border border-border rounded-xl"
        >
          <p className="text-foreground font-medium mb-1">
            No results for &ldquo;{searchParams.word}&rdquo;
          </p>
          <p className="text-sm text-muted-foreground">
            Try a different spelling or language.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          {/* Word header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                {definition.word}
              </h2>
              {definition.ipa && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Mic2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-mono">
                    {definition.ipa}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className="text-xs">
                {definition.language}
              </Badge>
              <Button
                data-ocid="word_search.save_button"
                size="sm"
                variant="outline"
                onClick={() => saveMutation.mutate(definition)}
                disabled={saveMutation.isPending}
                className="gap-1.5"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                {saveMutation.isPending ? "Saving…" : "Save Word"}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Translations table */}
          <TranslationsTable definition={definition} />

          {/* Ancient translations */}
          <AncientTranslations definition={definition} />

          {/* Example sentences */}
          {definition.examples && definition.examples.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-primary" />
                Example Sentences
              </h3>
              <ul className="space-y-2">
                {definition.examples.map((sentence) => (
                  <li
                    key={sentence}
                    className="text-sm text-foreground bg-muted/30 rounded-lg px-4 py-2.5 border border-border"
                  >
                    &ldquo;{sentence}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
