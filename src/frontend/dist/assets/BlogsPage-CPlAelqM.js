import { _ as useBackendActor, ao as useQueryClient, u as useNavigate, r as reactExports, bE as useQuery, bF as useMutation, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, b as CardHeader, a as CardContent, c as CardTitle } from "./card-Dx8tJeYi.js";
import { D as Dialog, e as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { S as Star } from "./star-DbleSGPY.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./index-BtrS4JsN.js";
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
  "Finance"
];
function StarRating({
  rating,
  max = 5,
  size = 16
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: max }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      size,
      className: i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
    },
    `star-icon-${i}`
  )) });
}
function BlogsPage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor;
        if (typeof actorAny.getAllBlogs === "function") {
          const result = await actorAny.getAllBlogs();
          return result ?? [];
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor,
    staleTime: 15e3
  });
  const createBlog = useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      const actorAny = actor;
      if (typeof actorAny.createBlog === "function") {
        const result = await actorAny.createBlog(
          data.title,
          data.content,
          data.category,
          data.location
        );
        const resultAny = result;
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
      ue.success("Blog created successfully");
    },
    onError: (err) => ue.error(err.message)
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) {
      ue.error("Please fill in all required fields");
      return;
    }
    createBlog.mutate({ title, content, category, location });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-primary" }),
          "Blogs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Share stories, tips, and updates with the community" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "blog.open_modal_button", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
          "Add Blog"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Blog" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-title", children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "blog-title",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  placeholder: "Enter blog title",
                  "data-ocid": "blog.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-category", children: "Category *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "blog-category",
                  value: category,
                  onChange: (e) => setCategory(e.target.value),
                  className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm",
                  "data-ocid": "blog.select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select category" }),
                    BLOG_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-location", children: "Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "blog-location",
                  value: location,
                  onChange: (e) => setLocation(e.target.value),
                  placeholder: "City or area",
                  "data-ocid": "blog.location_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-content", children: "Content *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "blog-content",
                  value: content,
                  onChange: (e) => setContent(e.target.value),
                  placeholder: "Write your blog content...",
                  rows: 6,
                  "data-ocid": "blog.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                disabled: createBlog.isPending,
                "data-ocid": "blog.submit_button",
                children: createBlog.isPending ? "Creating..." : "Create Blog"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "animate-pulse",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "h-20 bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-24 bg-muted/50" })
        ]
      },
      `blog-skel-${i}`
    )) }) : blogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 bg-card rounded-lg border border-border",
        "data-ocid": "blog.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "No blogs yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Be the first to share a story with the community" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setIsOpen(true), "data-ocid": "blog.add_button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            "Write a Blog"
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: blogs.map((blog, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "cursor-pointer hover:shadow-card transition-smooth",
        onClick: () => navigate({ to: `/blogs/${blog.id}` }),
        "data-ocid": `blog.item.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary", children: blog.category }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base leading-tight line-clamp-2", children: blog.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3 mb-3", children: blog.content }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                blog.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                  blog.location
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                  new Date(Number(blog.createdAt)).toLocaleDateString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: blog.averageRating ?? 0, size: 12 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500 font-medium", children: blog.reviewCount > 0 ? `(${blog.reviewCount})` : "(0)" })
              ] })
            ] })
          ] })
        ]
      },
      blog.id
    )) })
  ] });
}
export {
  BlogsPage as default
};
