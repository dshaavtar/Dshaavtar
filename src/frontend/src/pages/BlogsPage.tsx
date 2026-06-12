import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Calendar, MapPin, Plus, Star, Tag } from "lucide-react";
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

// interface BlogReview {
//   id: string;
//   blogId: string;
//   reviewerId: string;
//   reviewerName: string;
//   rating: number;
//   comment: string;
//   createdAt: bigint;
// }

const BLOG_CATEGORIES = [
  "Shopping Tips",
  "Local News",
  "Product Reviews",
  "Community",
  "Events",
  "Health & Wellness",
  "Food & Recipes",
  "Travel",
  "Technology",
  "Finance",
];

function StarRating({
  rating,
  max = 5,
  size = 16,
}: { rating: number; max?: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          // biome-ignore lint/suspicious/noArrayIndexKey: static array, items never reorder
          key={`star-icon-${i}`}
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

export default function BlogsPage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const { data: blogs = [], isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >;
        if (typeof actorAny.getAllBlogs === "function") {
          const result = await actorAny.getAllBlogs();
          return (result ?? []) as Blog[];
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor,
    staleTime: 15_000,
  });

  const createBlog = useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      category: string;
      location: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      if (typeof actorAny.createBlog === "function") {
        const result = await actorAny.createBlog(
          data.title,
          data.content,
          data.category,
          data.location,
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
      throw new Error("createBlog not available");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blogs"] });
      setIsOpen(false);
      setTitle("");
      setContent("");
      setCategory("");
      setLocation("");
      toast.success("Blog created successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) {
      toast.error("Please fill in all required fields");
      return;
    }
    createBlog.mutate({ title, content, category, location });
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Blogs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Share stories, tips, and updates with the community
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button data-ocid="blog.open_modal_button">
              <Plus className="w-4 h-4 mr-1" />
              Add Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Blog</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Label htmlFor="blog-title">Title *</Label>
                <Input
                  id="blog-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  data-ocid="blog.input"
                />
              </div>
              <div>
                <Label htmlFor="blog-category">Category *</Label>
                <select
                  id="blog-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  data-ocid="blog.select"
                >
                  <option value="">Select category</option>
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="blog-location">Location</Label>
                <Input
                  id="blog-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or area"
                  data-ocid="blog.location_input"
                />
              </div>
              <div>
                <Label htmlFor="blog-content">Content *</Label>
                <Textarea
                  id="blog-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog content..."
                  rows={6}
                  data-ocid="blog.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={createBlog.isPending}
                data-ocid="blog.submit_button"
              >
                {createBlog.isPending ? "Creating..." : "Create Blog"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              // biome-ignore lint/suspicious/noArrayIndexKey: static array, items never reorder
              key={`blog-skel-${i}`}
              className="animate-pulse"
            >
              <CardHeader className="h-20 bg-muted" />
              <CardContent className="h-24 bg-muted/50" />
            </Card>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div
          className="text-center py-16 bg-card rounded-lg border border-border"
          data-ocid="blog.empty_state"
        >
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No blogs yet
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Be the first to share a story with the community
          </p>
          <Button onClick={() => setIsOpen(true)} data-ocid="blog.add_button">
            <Plus className="w-4 h-4 mr-1" />
            Write a Blog
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <Card
              key={blog.id}
              className="cursor-pointer hover:shadow-card transition-smooth"
              onClick={() => navigate({ to: `/blogs/${blog.id}` })}
              data-ocid={`blog.item.${index + 1}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {blog.category}
                  </span>
                </div>
                <CardTitle className="text-base leading-tight line-clamp-2">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {blog.content}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {blog.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {blog.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(Number(blog.createdAt)).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarRating rating={blog.averageRating ?? 0} size={12} />
                    <span className="text-amber-500 font-medium">
                      {blog.reviewCount > 0 ? `(${blog.reviewCount})` : "(0)"}
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
