import { ct as useRecipes, c0 as useDeleteRecipe, r as reactExports, j as jsxRuntimeExports, p as ue, b$ as useCreateRecipe, cu as useRateRecipe } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { C as ChefHat } from "./chef-hat-VsY0dCz0.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { S as Star } from "./star-DbleSGPY.js";
import { M as Minus } from "./minus-BPUUsZPQ.js";
import { X } from "./x-Chksmd6i.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-BtrS4JsN.js";
import "./createLucideIcon-BGWdtUCJ.js";
function StarRating({ value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
    [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Star,
      {
        className: `w-3.5 h-3.5 ${i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`
      },
      i
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-muted-foreground", children: value.toFixed(1) })
  ] });
}
function StatCard({
  label,
  value,
  color = "text-foreground"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${color}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: label })
  ] });
}
function AddRecipeModal({ onClose }) {
  const createRecipe = useCreateRecipe();
  const [title, setTitle] = reactExports.useState("");
  const [ingredients, setIngredients] = reactExports.useState([
    { name: "", grams: "" }
  ]);
  const [steps, setSteps] = reactExports.useState([""]);
  const [imageLink, setImageLink] = reactExports.useState("");
  const [videoLink, setVideoLink] = reactExports.useState("");
  const [benefits, setBenefits] = reactExports.useState("");
  const [tips, setTips] = reactExports.useState("");
  const [ownerId, setOwnerId] = reactExports.useState("");
  function addIngredient() {
    setIngredients((prev) => [...prev, { name: "", grams: "" }]);
  }
  function removeIngredient(i) {
    setIngredients((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateIngredient(i, field, val) {
    setIngredients(
      (prev) => prev.map((row, idx) => idx === i ? { ...row, [field]: val } : row)
    );
  }
  function addStep() {
    setSteps((prev) => [...prev, ""]);
  }
  function removeStep(i) {
    setSteps((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateStep(i, val) {
    setSteps((prev) => prev.map((s, idx) => idx === i ? val : s));
  }
  async function handleSave(e) {
    e.preventDefault();
    if (!title.trim()) {
      ue.error("Recipe title is required");
      return;
    }
    const parsedIngredients = ingredients.filter((r) => r.name.trim()).map((r) => ({
      name: r.name.trim(),
      grams: Number.parseFloat(r.grams) || 0
    }));
    const parsedSteps = steps.filter((s) => s.trim());
    if (parsedIngredients.length === 0) {
      ue.error("Add at least one ingredient");
      return;
    }
    if (parsedSteps.length === 0) {
      ue.error("Add at least one step");
      return;
    }
    try {
      await createRecipe.mutateAsync({
        ownerId: ownerId.trim() || "admin",
        title: title.trim(),
        ingredients: parsedIngredients,
        steps: parsedSteps,
        imageLink: imageLink.trim(),
        videoLink: videoLink.trim(),
        benefits: benefits.trim(),
        tips: tips.trim()
      });
      ue.success("Recipe created successfully!");
      onClose();
    } catch {
      ue.error("Failed to create recipe");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-5 h-5 text-primary" }),
      " Add New Recipe"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-5 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ownerId", children: "Owner Phone / ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ownerId",
              value: ownerId,
              onChange: (e) => setOwnerId(e.target.value),
              placeholder: "+91 98765 43210",
              "data-ocid": "recipe-owner-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "recipeTitle", children: "Recipe Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "recipeTitle",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "e.g. Dal Makhani",
              required: true,
              "data-ocid": "recipe-title-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ingredients *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: addIngredient,
              "data-ocid": "recipe-add-ingredient",
              className: "gap-1 h-7 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                " Add Row"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ingredients.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-2 items-center",
            "data-ocid": `recipe-ingredient.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: row.name,
                  onChange: (e) => updateIngredient(i, "name", e.target.value),
                  placeholder: "Ingredient name",
                  className: "flex-1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: row.grams,
                  onChange: (e) => updateIngredient(i, "grams", e.target.value),
                  placeholder: "Grams",
                  type: "number",
                  className: "w-24"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeIngredient(i),
                  disabled: ingredients.length === 1,
                  className: "p-1 rounded text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30",
                  "aria-label": "Remove ingredient",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                }
              )
            ]
          },
          `ing-row-${row.name || i}`
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Steps *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: addStep,
              "data-ocid": "recipe-add-step",
              className: "gap-1 h-7 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                " Add Step"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-2 items-start",
            "data-ocid": `recipe-step.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-2 text-xs font-semibold text-muted-foreground w-5 flex-shrink-0", children: [
                i + 1,
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: step,
                  onChange: (e) => updateStep(i, e.target.value),
                  placeholder: `Step ${i + 1}...`,
                  rows: 2,
                  className: "flex-1 resize-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeStep(i),
                  disabled: steps.length === 1,
                  className: "mt-2 p-1 rounded text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30",
                  "aria-label": "Remove step",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                }
              )
            ]
          },
          `step-row-${step.slice(0, 12) || i}`
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "imageLink", children: "Image Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "imageLink",
              value: imageLink,
              onChange: (e) => setImageLink(e.target.value),
              placeholder: "https://...",
              "data-ocid": "recipe-image-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "videoLink", children: "Video Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "videoLink",
              value: videoLink,
              onChange: (e) => setVideoLink(e.target.value),
              placeholder: "https://youtube.com/...",
              "data-ocid": "recipe-video-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "benefits", children: "Benefits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "benefits",
              value: benefits,
              onChange: (e) => setBenefits(e.target.value),
              placeholder: "Health benefits, nutritional value...",
              rows: 3,
              "data-ocid": "recipe-benefits-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tips", children: "Tips" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "tips",
              value: tips,
              onChange: (e) => setTips(e.target.value),
              placeholder: "Cooking tips, variations...",
              rows: 3,
              "data-ocid": "recipe-tips-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: createRecipe.isPending,
            className: "flex-1 gap-2",
            "data-ocid": "recipe-save-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-4 h-4" }),
              createRecipe.isPending ? "Saving..." : "Save Recipe"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "recipe-cancel-button",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function RecipeDetailPanel({
  recipe,
  onClose
}) {
  const rateRecipe = useRateRecipe();
  const [ratingInput, setRatingInput] = reactExports.useState(0);
  async function submitRating() {
    if (ratingInput < 1 || ratingInput > 5) {
      ue.error("Rating must be between 1 and 5");
      return;
    }
    try {
      await rateRecipe.mutateAsync({ id: recipe.id, rating: ratingInput });
      ue.success("Rating submitted!");
    } catch {
      ue.error("Failed to submit rating");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between p-5 border-b border-border sticky top-0 bg-card z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        recipe.imageLink ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: recipe.imageLink,
            alt: recipe.title,
            className: "w-12 h-12 rounded-xl object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: recipe.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: recipe.rating }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              Number(recipe.ratingCount),
              " ratings)"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          "data-ocid": "recipe-detail-close",
          className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
          "aria-label": "Close recipe details",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-sm text-foreground mb-3", children: [
          "Ingredients (",
          recipe.ingredients.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: recipe.ingredients.map((ing, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-muted/40 rounded-lg p-2.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: ing.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                ing.grams,
                "g"
              ] })
            ]
          },
          `${ing.name}-${i}`
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground mb-3", children: "Preparation Steps" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: recipe.steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex gap-3 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: step })
            ]
          },
          `${step.slice(0, 15)}-${i}`
        )) })
      ] }),
      (recipe.benefits || recipe.tips) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        recipe.benefits && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50/40 border border-emerald-200/50 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2", children: "Benefits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: recipe.benefits })
        ] }),
        recipe.tips && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50/40 border border-amber-200/50 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2", children: "Tips" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: recipe.tips })
        ] })
      ] }),
      (recipe.imageLink || recipe.videoLink) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
        recipe.imageLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: recipe.imageLink,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-xs text-primary hover:underline",
            children: "View Image ↗"
          }
        ),
        recipe.videoLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: recipe.videoLink,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-xs text-primary hover:underline",
            children: "Watch Video ↗"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-semibold text-foreground", children: "Rate This Recipe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setRatingInput(n),
              className: "transition-transform hover:scale-110",
              "aria-label": `Rate ${n} stars`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `w-6 h-6 ${n <= ratingInput ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30 hover:text-amber-300"}`
                }
              )
            },
            n
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: submitRating,
              disabled: ratingInput === 0 || rateRecipe.isPending,
              "data-ocid": "recipe-rate-submit",
              className: "h-8",
              children: rateRecipe.isPending ? "Submitting..." : "Submit Rating"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function RecipesPage() {
  const { data: recipes = [], isLoading, isError, refetch } = useRecipes();
  const deleteRecipe = useDeleteRecipe();
  const [search, setSearch] = reactExports.useState("");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(null);
  const filtered = recipes.filter(
    (r) => !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.ownerId.toLowerCase().includes(search.toLowerCase())
  );
  const avgRating = recipes.length > 0 ? (recipes.reduce((acc, r) => acc + r.rating, 0) / recipes.length).toFixed(1) : "—";
  const topRated = recipes.length > 0 ? recipes.reduce(
    (best, r) => r.rating > best.rating ? r : best,
    recipes[0]
  ) : null;
  async function handleDelete(id) {
    try {
      await deleteRecipe.mutateAsync(id);
      ue.success("Recipe deleted");
      setConfirmDelete(null);
    } catch {
      ue.error("Failed to delete recipe");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Recipes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Community recipe library — add, search, and rate" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "gap-2",
          "data-ocid": "recipe-add-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Recipe"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Recipes",
          value: recipes.length,
          color: "text-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Avg Rating", value: avgRating, color: "text-amber-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Top Rated",
          value: (topRated == null ? void 0 : topRated.title) ?? "—",
          color: "text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search recipes...",
          className: "pl-9",
          "data-ocid": "recipe-search-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: [
        "Recipe",
        "Owner",
        "Ingredients",
        "Steps",
        "Rating",
        "Created",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["s1", "s2", "s3", "s4", "s5"].map((rowId) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map(
        (cellId) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }, `${rowId}-${cellId}`)
      ) }, rowId)) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 7, className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm font-medium text-muted-foreground",
            "data-ocid": "recipes.error_state",
            children: "Unable to load recipes. Please try again."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "mt-4 gap-2",
            onClick: () => void refetch(),
            "data-ocid": "recipes.retry_button",
            children: "Retry"
          }
        )
      ] }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 7, className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm font-medium text-muted-foreground",
            "data-ocid": "recipes-empty-state",
            children: search ? "No recipes match your search" : "No recipes yet — add the first one!"
          }
        ),
        !search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "mt-4 gap-2",
            onClick: () => setShowAdd(true),
            "data-ocid": "recipes-empty-add-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Add Recipe"
            ]
          }
        )
      ] }) }) : filtered.map((recipe, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer",
          onClick: () => setSelected(recipe),
          onKeyDown: (e) => e.key === "Enter" && setSelected(recipe),
          tabIndex: 0,
          "data-ocid": `recipes-item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              recipe.imageLink ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: recipe.imageLink,
                  alt: recipe.title,
                  className: "w-8 h-8 rounded-lg object-cover flex-shrink-0"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[180px]", children: recipe.title })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs", children: recipe.ownerId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
              recipe.ingredients.length,
              " items"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
              recipe.steps.length,
              " steps"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: recipe.rating }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              new Date(Number(recipe.createdAt)).toLocaleDateString(
                "en-IN"
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setConfirmDelete(recipe.id);
                },
                "data-ocid": `recipe-delete-button.${index + 1}`,
                className: "p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                "aria-label": "Delete recipe",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            ) })
          ]
        },
        recipe.id
      )) })
    ] }) }) }),
    showAdd && /* @__PURE__ */ jsxRuntimeExports.jsx(AddRecipeModal, { onClose: () => setShowAdd(false) }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RecipeDetailPanel,
      {
        recipe: selected,
        onClose: () => setSelected(null)
      }
    ),
    confirmDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: () => setConfirmDelete(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Delete Recipe?" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This action cannot be undone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            className: "flex-1",
            onClick: () => handleDelete(confirmDelete),
            disabled: deleteRecipe.isPending,
            "data-ocid": "recipe-confirm-delete",
            children: deleteRecipe.isPending ? "Deleting..." : "Delete"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setConfirmDelete(null),
            "data-ocid": "recipe-cancel-delete",
            children: "Cancel"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  RecipesPage as default
};
