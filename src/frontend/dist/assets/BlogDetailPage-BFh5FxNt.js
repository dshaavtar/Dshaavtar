import { d_ as useParams, _ as useBackendActor, ao as useQueryClient, u as useNavigate, r as reactExports, bE as useQuery, bF as useMutation, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Dx8tJeYi.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { U as User } from "./user-BCyag2Xe.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { S as Star } from "./star-DbleSGPY.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function StarRating({
  rating,
  max = 5,
  size = 16,
  interactive = false,
  onRate
}) {
  const [hover, setHover] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: max }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      disabled: !interactive,
      onClick: () => onRate == null ? void 0 : onRate(i + 1),
      onMouseEnter: () => interactive && setHover(i + 1),
      onMouseLeave: () => interactive && setHover(0),
      className: interactive ? "cursor-pointer p-0.5" : "cursor-default",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          size,
          className: i < (hover || Math.round(rating)) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
        }
      )
    },
    `star-btn-${i}`
  )) });
}
function BlogDetailPage() {
  var _a;
  const params = useParams({ strict: false });
  const blogId = params.blogId ?? params.$blogId ?? "";
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [rating, setRating] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const { data: blog, isLoading: blogLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      if (!actor || !blogId) return null;
      try {
        const actorAny = actor;
        if (typeof actorAny.getBlogById === "function") {
          const result = await actorAny.getBlogById(blogId);
          return result ?? null;
        }
        return null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !!blogId
  });
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["blog-reviews", blogId],
    queryFn: async () => {
      if (!actor || !blogId) return [];
      try {
        const actorAny = actor;
        if (typeof actorAny.getBlogReviews === "function") {
          const result = await actorAny.getBlogReviews(blogId);
          return result ?? [];
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !!blogId
  });
  const addReview = useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.addBlogReview === "function") {
        const result = await actorAny.addBlogReview(
          data.blogId,
          data.rating,
          data.comment
        );
        const resultAny = result;
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
      ue.success("Review added successfully");
    },
    onError: (err) => ue.error(err.message)
  });
  function handleReviewSubmit(e) {
    e.preventDefault();
    if (rating === 0) {
      ue.error("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      ue.error("Please write a comment");
      return;
    }
    addReview.mutate({ blogId, rating, comment });
  }
  if (blogLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-1/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 bg-muted rounded" })
    ] }) });
  }
  if (!blog) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-2", children: "Blog not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => navigate({ to: "/blogs" }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
        "Back to Blogs"
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        className: "mb-4",
        onClick: () => navigate({ to: "/blogs" }),
        "data-ocid": "blog.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
          "Back to Blogs"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary", children: blog.category }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: blog.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
            blog.authorName || "Anonymous"
          ] }),
          blog.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
            blog.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
            new Date(Number(blog.createdAt)).toLocaleDateString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm max-w-none text-foreground whitespace-pre-wrap", children: blog.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-6 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: blog.averageRating ?? 0, size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500 font-semibold", children: ((_a = blog.averageRating) == null ? void 0 : _a.toFixed(1)) ?? "0.0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm", children: [
            "(",
            blog.reviewCount ?? 0,
            " reviews)"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-primary" }),
        "Write a Review"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReviewSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Your Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              rating,
              size: 28,
              interactive: true,
              onRate: setRating
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "review-comment", children: "Your Comment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "review-comment",
              value: comment,
              onChange: (e) => setComment(e.target.value),
              placeholder: "Share your thoughts on this blog...",
              rows: 4,
              "data-ocid": "blog.review_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: addReview.isPending,
            "data-ocid": "blog.review_submit_button",
            children: addReview.isPending ? "Submitting..." : "Submit Review"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-foreground", children: [
        "Reviews (",
        reviews.length,
        ")"
      ] }),
      reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "animate-pulse",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-20 bg-muted" })
        },
        `review-skel-${i}`
      )) }) : reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-8 bg-card rounded-lg border border-border",
          "data-ocid": "blog.reviews_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-10 h-10 text-muted-foreground mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No reviews yet. Be the first to review!" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reviews.map((review, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": `blog.review.item.${index + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: review.reviewerName || "Anonymous" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(Number(review.createdAt)).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating, size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-2", children: review.comment })
      ] }) }, review.id)) })
    ] })
  ] });
}
export {
  BlogDetailPage as default
};
