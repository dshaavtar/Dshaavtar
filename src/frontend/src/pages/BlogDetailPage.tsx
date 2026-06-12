import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  MessageSquare,
  Star,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBackendActor } from "../hooks/useBackend";

interface Blog {
  id: string;
  title: string;
  content: string;
  category: string;
  location: string;
  authorId: string;
  authorName: string;
  createdAt: bigint;
  averageRating: number;
  reviewCount: number;
}

interface BlogReview {
  id: string;
  blogId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: bigint;
}

function StarRating({
  rating,
  max = 5,
  size = 16,
  interactive = false,
  onRate,
}: {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: static array, items never reorder
          key={`star-btn-${i}`}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(i + 1)}
          onMouseEnter={() => interactive && setHover(i + 1)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? "cursor-pointer p-0.5" : "cursor-default"}
        >
          <Star
            size={size}
            className={
              i < (hover || Math.round(rating))
                ? "text-amber-400 fill-amber-400"
                : "text-muted-foreground"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function BlogDetailPage() {
  const params = useParams({ strict: false }) as any;
  const blogId = (params.blogId ?? params.$blogId ?? "") as string;
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: blog, isLoading: blogLoading } = useQuery<Blog | null>({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      if (!actor || !blogId) return null;
      try {
        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >;
        if (typeof actorAny.getBlogById === "function") {
          const result = await actorAny.getBlogById(blogId);
          return (result ?? null) as Blog | null;
        }
        return null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !!blogId,
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<
    BlogReview[]
  >({
    queryKey: ["blog-reviews", blogId],
    queryFn: async () => {
      if (!actor || !blogId) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >;
        if (typeof actorAny.getBlogReviews === "function") {
          const result = await actorAny.getBlogReviews(blogId);
          return (result ?? []) as BlogReview[];
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !!blogId,
  });

  const addReview = useMutation({
    mutationFn: async (data: {
      blogId: string;
      rating: number;
      comment: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.addBlogReview === "function") {
        const result = await actorAny.addBlogReview(
          data.blogId,
          data.rating,
          data.comment,
        );
        const resultAny = result as {
          __kind__?: string;
          ok?: unknown;
          err?: unknown;
        };
        if (resultAny.__kind__ === "err")
          throw new Error(String(resultAny.err));
        return resultAny.ok;
      }
      throw new Error("addBlogReview not available");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-reviews", blogId] });
      qc.invalidateQueries({ queryKey: ["blog", blogId] });
      qc.invalidateQueries({ queryKey: ["blogs"] });
      setRating(0);
      setComment("");
      toast.success("Review added successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    addReview.mutate({ blogId: blogId!, rating, comment });
  }

  if (blogLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-40 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Blog not found
        </h2>
        <Button onClick={() => navigate({ to: "/blogs" })}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Blogs
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate({ to: "/blogs" })}
        data-ocid="blog.back_button"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Blogs
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {blog.category}
            </span>
          </div>
          <CardTitle className="text-2xl">{blog.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {blog.authorName || "Anonymous"}
            </span>
            {blog.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {blog.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(Number(blog.createdAt)).toLocaleDateString()}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
            {blog.content}
          </div>
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border">
            <StarRating rating={blog.averageRating ?? 0} size={20} />
            <span className="text-amber-500 font-semibold">
              {blog.averageRating?.toFixed(1) ?? "0.0"}
            </span>
            <span className="text-muted-foreground text-sm">
              ({blog.reviewCount ?? 0} reviews)
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Write a Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <Label>Your Rating</Label>
              <div className="mt-1">
                <StarRating
                  rating={rating}
                  size={28}
                  interactive
                  onRate={setRating}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="review-comment">Your Comment</Label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts on this blog..."
                rows={4}
                data-ocid="blog.review_textarea"
              />
            </div>
            <Button
              type="submit"
              disabled={addReview.isPending}
              data-ocid="blog.review_submit_button"
            >
              {addReview.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Reviews ({reviews.length})
        </h3>
        {reviewsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card
                // biome-ignore lint/suspicious/noArrayIndexKey: static array, items never reorder
                key={`review-skel-${i}`}
                className="animate-pulse"
              >
                <CardContent className="h-20 bg-muted" />
              </Card>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div
            className="text-center py-8 bg-card rounded-lg border border-border"
            data-ocid="blog.reviews_empty_state"
          >
            <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <Card key={review.id} data-ocid={`blog.review.item.${index + 1}`}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {review.reviewerName || "Anonymous"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(Number(review.createdAt)).toLocaleDateString()}
                    </span>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                  <p className="text-sm text-foreground mt-2">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
