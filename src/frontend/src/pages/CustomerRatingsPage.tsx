import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search, Star, Store, Truck, User } from "lucide-react";
import { useState } from "react";
import { useBackendActor } from "../hooks/useBackend";

interface CustomerRating {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  ratedByRole: "merchant" | "delivery_partner";
  ratedById: string;
  ratedByName: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: bigint;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          // biome-ignore lint/suspicious/noArrayIndexKey: static array, items never reorder
          key={`rating-star-${i}`}
          size={size}
          className={
            i < Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground"
          }
        />
      ))}
    </div>
  );
}

export default function CustomerRatingsPage() {
  const { actor } = useBackendActor();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "merchant" | "delivery_partner"
  >("all");

  const { data: ratings = [], isLoading } = useQuery<CustomerRating[]>({
    queryKey: ["customer-ratings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >;
        if (typeof actorAny.getAllCustomerRatings === "function") {
          const result = await actorAny.getAllCustomerRatings();
          return (result ?? []) as CustomerRating[];
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor,
    staleTime: 15_000,
  });

  const filtered = ratings.filter((r) => {
    const matchesSearch =
      !search ||
      r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      r.customerPhone?.includes(search) ||
      r.ratedByName?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || r.ratedByRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const avgRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        ).toFixed(1)
      : "0.0";

  const merchantRatings = ratings.filter((r) => r.ratedByRole === "merchant");
  const dpRatings = ratings.filter((r) => r.ratedByRole === "delivery_partner");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          Customer Ratings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ratings given by merchants and delivery partners for customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-foreground">
              {ratings.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Ratings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-amber-500">{avgRating}</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-foreground">
              {merchantRatings.length} / {dpRatings.length}
            </div>
            <p className="text-sm text-muted-foreground">
              Merchant / DP Ratings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, phone, or rater..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="ratings.search_input"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "merchant", "delivery_partner"] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setRoleFilter(role)}
              className={[
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                roleFilter === role
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              ].join(" ")}
              data-ocid={`ratings.filter.${role}`}
            >
              {role === "all"
                ? "All"
                : role === "merchant"
                  ? "Merchant"
                  : "Delivery"}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card
              // biome-ignore lint/suspicious/noArrayIndexKey: static array, items never reorder
              key={`rating-skel-${i}`}
              className="animate-pulse"
            >
              <CardContent className="h-24 bg-muted" />
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-16 bg-card rounded-lg border border-border"
          data-ocid="ratings.empty_state"
        >
          <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No ratings found
          </h3>
          <p className="text-sm text-muted-foreground">
            {ratings.length === 0
              ? "Ratings will appear here when merchants or delivery partners rate customers"
              : "No ratings match your search criteria"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((rating, index) => (
            <Card key={rating.id} data-ocid={`ratings.item.${index + 1}`}>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {rating.customerName || "Unknown Customer"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {rating.customerPhone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        {rating.ratedByRole === "merchant" ? (
                          <Store className="w-3 h-3" />
                        ) : (
                          <Truck className="w-3 h-3" />
                        )}
                        Rated by{" "}
                        {rating.ratedByRole === "merchant"
                          ? "Merchant"
                          : "Delivery Partner"}
                      </span>
                      <span>•</span>
                      <span>{rating.ratedByName}</span>
                      <span>•</span>
                      <span>Order {rating.orderId}</span>
                    </div>
                    {rating.comment && (
                      <p className="text-sm text-foreground italic">
                        "{rating.comment}"
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StarRating rating={rating.rating} size={16} />
                    <span className="text-lg font-bold text-amber-500">
                      {rating.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(Number(rating.createdAt)).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
