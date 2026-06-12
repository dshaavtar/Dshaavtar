import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { useState } from "react";
import type { ManufacturerRating } from "../backend.d";
import { useManufacturerRatings } from "../hooks/useBackend";

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={`star-${star}`}
          className={`w-3.5 h-3.5 ${
            star <= rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export default function ManufacturerRatingsPage() {
  const { data: ratingsRaw = [], isLoading } = useManufacturerRatings();
  const ratings = ratingsRaw as ManufacturerRating[];
  const [filterStar, setFilterStar] = useState<number | null>(null);

  const filtered = filterStar
    ? ratings.filter((r: ManufacturerRating) => Number(r.rating) === filterStar)
    : ratings;

  const avgRating =
    ratings.length > 0
      ? ratings.reduce(
          (sum: number, r: ManufacturerRating) => sum + Number(r.rating),
          0,
        ) / ratings.length
      : 0;

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratings.filter((r: ManufacturerRating) => Number(r.rating) === star)
      .length,
  }));

  return (
    <div className="space-y-5" data-ocid="manufacturer.ratings.page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Product Ratings
          </h1>
          <p className="text-sm text-muted-foreground">
            {ratings.length} total ratings · avg {avgRating.toFixed(1)}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            type="button"
            onClick={() => setFilterStar(null)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              filterStar === null
                ? "bg-card shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="manufacturer.ratings.filter.all"
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterStar(filterStar === s ? null : s)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filterStar === s
                  ? "bg-card shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`manufacturer.ratings.filter.${s}`}
            >
              {s}★
            </button>
          ))}
        </div>
      </div>

      {/* Distribution */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">
              {avgRating.toFixed(1)}
            </p>
            <StarDisplay rating={Math.round(avgRating)} />
            <p className="text-xs text-muted-foreground mt-1">
              {ratings.length} reviews
            </p>
          </div>
          <div className="flex-1 space-y-1.5">
            {ratingDist.map(({ star, count }) => {
              const pct =
                ratings.length > 0 ? (count / ratings.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-right text-muted-foreground">
                    {star}
                  </span>
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ratings List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-16 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 gap-3"
            data-ocid="manufacturer.ratings.empty_state"
          >
            <Star className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No ratings yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((r: ManufacturerRating, i: number) => (
              <div
                key={r.id}
                className="px-4 py-3"
                data-ocid={`manufacturer.ratings.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">
                        {r.ratedBy}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Product: {r.productId.slice(0, 8)}…
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Reviewer:{" "}
                      {(r as unknown as Record<string, string>).reviewerPhone ??
                        (r as unknown as Record<string, string>)
                          .reviewerUserId ??
                        "Anonymous"}
                    </p>
                    {r.review && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {r.review}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(
                        Number(r.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <StarDisplay rating={Number(r.rating)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
