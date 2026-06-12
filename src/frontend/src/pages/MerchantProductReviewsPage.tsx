import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import type { ManufacturerRating } from "../backend.d";
import {
  useGetMerchantSubscriptionStatus,
  useManufacturerByUser,
  useManufacturerRatings,
} from "../hooks/useBackend";

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-500 text-sm">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`inline w-3.5 h-3.5 ${
            n <= rating
              ? "fill-yellow-500 text-yellow-500"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </span>
  );
}

export default function MerchantProductReviewsPage() {
  const { data: profileRaw } = useManufacturerByUser();
  const profile = profileRaw as { id: string } | null;
  const merchantId = profile?.id;

  const { data: subStatus, isLoading: subLoading } =
    useGetMerchantSubscriptionStatus(merchantId);
  const { data: ratingsRaw = [], isLoading: ratingsLoading } =
    useManufacturerRatings();
  const ratings = ratingsRaw as ManufacturerRating[];

  if (subLoading) {
    return (
      <div className="space-y-3 p-4" data-ocid="merchant.reviews.loading_state">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  const isActive = subStatus?.isActive ?? true;

  if (!isActive) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4"
        data-ocid="merchant.reviews.upgrade_card"
      >
        <Star className="w-10 h-10 text-muted-foreground" />
        <div className="text-center">
          <p className="font-semibold text-foreground">
            Paid Subscription Required
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Upgrade to a paid plan to view customer and distributor reviews.
          </p>
        </div>
        <Button
          variant="default"
          asChild
          data-ocid="merchant.reviews.upgrade_button"
        >
          <a href="/subscriptions">Upgrade Plan</a>
        </Button>
      </div>
    );
  }

  // Group by productId
  const grouped = ratings.reduce(
    (acc: Record<string, ManufacturerRating[]>, r: ManufacturerRating) => {
      const key = r.productId;
      if (!acc[key]) acc[key] = [];
      acc[key].push(r);
      return acc;
    },
    {},
  );

  const productIds = Object.keys(grouped);

  return (
    <div className="space-y-5" data-ocid="merchant.reviews.page">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Product Reviews
        </h1>
        <p className="text-sm text-muted-foreground">
          {ratings.length} total reviews across {productIds.length} products
        </p>
      </div>

      {ratingsLoading && (
        <div className="space-y-3" data-ocid="merchant.reviews.loading_state">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-16 w-full" />
          ))}
        </div>
      )}

      {!ratingsLoading && productIds.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-12 gap-3"
          data-ocid="merchant.reviews.empty_state"
        >
          <Star className="w-10 h-10 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No reviews yet</p>
        </div>
      )}

      {!ratingsLoading &&
        productIds.map((productId, pi) => {
          const group = grouped[productId];
          const avg =
            group.reduce((s, r) => s + Number(r.rating), 0) / group.length;
          return (
            <div
              key={productId}
              className="bg-card border border-border rounded-lg overflow-hidden"
              data-ocid={`merchant.reviews.product.${pi + 1}`}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                <div>
                  <p className="text-xs font-mono text-muted-foreground">
                    Product: {productId.slice(0, 12)}…
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRow rating={Math.round(avg)} />
                    <span className="text-xs text-muted-foreground">
                      {avg.toFixed(1)} · {group.length} review
                      {group.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {group.length} review{group.length !== 1 ? "s" : ""}
                </Badge>
              </div>
              <div className="divide-y divide-border">
                {group.map((r, i) => (
                  <div
                    key={r.id}
                    className="px-4 py-3"
                    data-ocid={`merchant.reviews.item.${pi + 1}.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {r.ratedBy}
                        </p>
                        {r.review && (
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {r.review}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(
                            Number(r.createdAt) / 1_000_000,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <StarRow rating={Number(r.rating)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
