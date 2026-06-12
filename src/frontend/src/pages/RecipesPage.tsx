import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  ChefHat,
  Clock,
  Minus,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Recipe, RecipeIngredient } from "../backend.d";
import {
  useCreateRecipe,
  useDeleteRecipe,
  useRateRecipe,
  useRecipes,
} from "../hooks/useBackend";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">
        {value.toFixed(1)}
      </span>
    </span>
  );
}

function StatCard({
  label,
  value,
  color = "text-foreground",
}: { label: string; value: string | number; color?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-card">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

// ─── Add Recipe Modal ─────────────────────────────────────────────────────────

type IngredientRow = { name: string; grams: string };

function AddRecipeModal({ onClose }: { onClose: () => void }) {
  const createRecipe = useCreateRecipe();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { name: "", grams: "" },
  ]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [imageLink, setImageLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [benefits, setBenefits] = useState("");
  const [tips, setTips] = useState("");
  const [ownerId, setOwnerId] = useState("");

  function addIngredient() {
    setIngredients((prev) => [...prev, { name: "", grams: "" }]);
  }
  function removeIngredient(i: number) {
    setIngredients((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateIngredient(
    i: number,
    field: keyof IngredientRow,
    val: string,
  ) {
    setIngredients((prev) =>
      prev.map((row, idx) => (idx === i ? { ...row, [field]: val } : row)),
    );
  }

  function addStep() {
    setSteps((prev) => [...prev, ""]);
  }
  function removeStep(i: number) {
    setSteps((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateStep(i: number, val: string) {
    setSteps((prev) => prev.map((s, idx) => (idx === i ? val : s)));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Recipe title is required");
      return;
    }
    const parsedIngredients: RecipeIngredient[] = ingredients
      .filter((r) => r.name.trim())
      .map((r) => ({
        name: r.name.trim(),
        grams: Number.parseFloat(r.grams) || 0,
      }));
    const parsedSteps = steps.filter((s) => s.trim());
    if (parsedIngredients.length === 0) {
      toast.error("Add at least one ingredient");
      return;
    }
    if (parsedSteps.length === 0) {
      toast.error("Add at least one step");
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
        tips: tips.trim(),
      });
      toast.success("Recipe created successfully!");
      onClose();
    } catch {
      toast.error("Failed to create recipe");
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" /> Add New Recipe
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-5 pt-2">
          {/* Owner / Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ownerId">Owner Phone / ID</Label>
              <Input
                id="ownerId"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                placeholder="+91 98765 43210"
                data-ocid="recipe-owner-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="recipeTitle">Recipe Title *</Label>
              <Input
                id="recipeTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dal Makhani"
                required
                data-ocid="recipe-title-input"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Ingredients *</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addIngredient}
                data-ocid="recipe-add-ingredient"
                className="gap-1 h-7 text-xs"
              >
                <Plus className="w-3 h-3" /> Add Row
              </Button>
            </div>
            <div className="space-y-2">
              {ingredients.map((row, i) => (
                <div
                  key={`ing-row-${row.name || i}`}
                  className="flex gap-2 items-center"
                  data-ocid={`recipe-ingredient.${i + 1}`}
                >
                  <Input
                    value={row.name}
                    onChange={(e) =>
                      updateIngredient(i, "name", e.target.value)
                    }
                    placeholder="Ingredient name"
                    className="flex-1"
                  />
                  <Input
                    value={row.grams}
                    onChange={(e) =>
                      updateIngredient(i, "grams", e.target.value)
                    }
                    placeholder="Grams"
                    type="number"
                    className="w-24"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(i)}
                    disabled={ingredients.length === 1}
                    className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30"
                    aria-label="Remove ingredient"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Steps *</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addStep}
                data-ocid="recipe-add-step"
                className="gap-1 h-7 text-xs"
              >
                <Plus className="w-3 h-3" /> Add Step
              </Button>
            </div>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div
                  key={`step-row-${step.slice(0, 12) || i}`}
                  className="flex gap-2 items-start"
                  data-ocid={`recipe-step.${i + 1}`}
                >
                  <span className="mt-2 text-xs font-semibold text-muted-foreground w-5 flex-shrink-0">
                    {i + 1}.
                  </span>
                  <Textarea
                    value={step}
                    onChange={(e) => updateStep(i, e.target.value)}
                    placeholder={`Step ${i + 1}...`}
                    rows={2}
                    className="flex-1 resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(i)}
                    disabled={steps.length === 1}
                    className="mt-2 p-1 rounded text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30"
                    aria-label="Remove step"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="imageLink">Image Link</Label>
              <Input
                id="imageLink"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                placeholder="https://..."
                data-ocid="recipe-image-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="videoLink">Video Link</Label>
              <Input
                id="videoLink"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="https://youtube.com/..."
                data-ocid="recipe-video-input"
              />
            </div>
          </div>

          {/* Benefits & Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="benefits">Benefits</Label>
              <Textarea
                id="benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="Health benefits, nutritional value..."
                rows={3}
                data-ocid="recipe-benefits-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tips">Tips</Label>
              <Textarea
                id="tips"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                placeholder="Cooking tips, variations..."
                rows={3}
                data-ocid="recipe-tips-input"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              type="submit"
              disabled={createRecipe.isPending}
              className="flex-1 gap-2"
              data-ocid="recipe-save-button"
            >
              <ChefHat className="w-4 h-4" />
              {createRecipe.isPending ? "Saving..." : "Save Recipe"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="recipe-cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Recipe Detail Panel ──────────────────────────────────────────────────────

function RecipeDetailPanel({
  recipe,
  onClose,
}: { recipe: Recipe; onClose: () => void }) {
  const rateRecipe = useRateRecipe();
  const [ratingInput, setRatingInput] = useState(0);

  async function submitRating() {
    if (ratingInput < 1 || ratingInput > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
    try {
      await rateRecipe.mutateAsync({ id: recipe.id, rating: ratingInput });
      toast.success("Rating submitted!");
    } catch {
      toast.error("Failed to submit rating");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            {recipe.imageLink ? (
              <img
                src={recipe.imageLink}
                alt={recipe.title}
                className="w-12 h-12 rounded-xl object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary" />
              </div>
            )}
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <StarRating value={recipe.rating} />
                <span className="text-xs text-muted-foreground">
                  ({Number(recipe.ratingCount)} ratings)
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="recipe-detail-close"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label="Close recipe details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Ingredients */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Ingredients ({recipe.ingredients.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {recipe.ingredients.map((ing, i) => (
                <div
                  key={`${ing.name}-${i}`}
                  className="bg-muted/40 rounded-lg p-2.5 text-xs"
                >
                  <p className="font-medium text-foreground">{ing.name}</p>
                  <p className="text-muted-foreground">{ing.grams}g</p>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Preparation Steps
            </h4>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li
                  key={`${step.slice(0, 15)}-${i}`}
                  className="flex gap-3 text-sm"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Benefits & Tips */}
          {(recipe.benefits || recipe.tips) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recipe.benefits && (
                <div className="bg-emerald-50/40 border border-emerald-200/50 rounded-xl p-4">
                  <h5 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
                    Benefits
                  </h5>
                  <p className="text-sm text-foreground leading-relaxed">
                    {recipe.benefits}
                  </p>
                </div>
              )}
              {recipe.tips && (
                <div className="bg-amber-50/40 border border-amber-200/50 rounded-xl p-4">
                  <h5 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
                    Tips
                  </h5>
                  <p className="text-sm text-foreground leading-relaxed">
                    {recipe.tips}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Links */}
          {(recipe.imageLink || recipe.videoLink) && (
            <div className="flex gap-3 flex-wrap">
              {recipe.imageLink && (
                <a
                  href={recipe.imageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  View Image ↗
                </a>
              )}
              {recipe.videoLink && (
                <a
                  href={recipe.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Watch Video ↗
                </a>
              )}
            </div>
          )}

          {/* Rate */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-3">
            <h5 className="text-sm font-semibold text-foreground">
              Rate This Recipe
            </h5>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRatingInput(n)}
                    className="transition-transform hover:scale-110"
                    aria-label={`Rate ${n} stars`}
                  >
                    <Star
                      className={`w-6 h-6 ${n <= ratingInput ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30 hover:text-amber-300"}`}
                    />
                  </button>
                ))}
              </div>
              <Button
                size="sm"
                onClick={submitRating}
                disabled={ratingInput === 0 || rateRecipe.isPending}
                data-ocid="recipe-rate-submit"
                className="h-8"
              >
                {rateRecipe.isPending ? "Submitting..." : "Submit Rating"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RecipesPage() {
  const { data: recipes = [], isLoading, isError, refetch } = useRecipes();
  const deleteRecipe = useDeleteRecipe();

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = recipes.filter(
    (r) =>
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.ownerId.toLowerCase().includes(search.toLowerCase()),
  );

  const avgRating =
    recipes.length > 0
      ? (
          recipes.reduce((acc, r) => acc + r.rating, 0) / recipes.length
        ).toFixed(1)
      : "—";
  const topRated =
    recipes.length > 0
      ? recipes.reduce(
          (best, r) => (r.rating > best.rating ? r : best),
          recipes[0],
        )
      : null;

  async function handleDelete(id: string) {
    try {
      await deleteRecipe.mutateAsync(id);
      toast.success("Recipe deleted");
      setConfirmDelete(null);
    } catch {
      toast.error("Failed to delete recipe");
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Recipes
            </h2>
            <p className="text-sm text-muted-foreground">
              Community recipe library — add, search, and rate
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowAdd(true)}
          className="gap-2"
          data-ocid="recipe-add-button"
        >
          <Plus className="w-4 h-4" /> Add Recipe
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard
          label="Total Recipes"
          value={recipes.length}
          color="text-foreground"
        />
        <StatCard label="Avg Rating" value={avgRating} color="text-amber-600" />
        <StatCard
          label="Top Rated"
          value={topRated?.title ?? "—"}
          color="text-primary"
        />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
          className="pl-9"
          data-ocid="recipe-search-input"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                {[
                  "Recipe",
                  "Owner",
                  "Ingredients",
                  "Steps",
                  "Rating",
                  "Created",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                ["s1", "s2", "s3", "s4", "s5"].map((rowId) => (
                  <tr key={rowId} className="border-b border-border/50">
                    {["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map(
                      (cellId) => (
                        <td key={`${rowId}-${cellId}`} className="px-4 py-3">
                          <Skeleton className="h-4 w-24" />
                        </td>
                      ),
                    )}
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <ChefHat className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p
                      className="text-sm font-medium text-muted-foreground"
                      data-ocid="recipes.error_state"
                    >
                      Unable to load recipes. Please try again.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 gap-2"
                      onClick={() => void refetch()}
                      data-ocid="recipes.retry_button"
                    >
                      Retry
                    </Button>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <ChefHat className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p
                      className="text-sm font-medium text-muted-foreground"
                      data-ocid="recipes-empty-state"
                    >
                      {search
                        ? "No recipes match your search"
                        : "No recipes yet — add the first one!"}
                    </p>
                    {!search && (
                      <Button
                        className="mt-4 gap-2"
                        onClick={() => setShowAdd(true)}
                        data-ocid="recipes-empty-add-button"
                      >
                        <Plus className="w-4 h-4" /> Add Recipe
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((recipe, index) => (
                  <tr
                    key={recipe.id}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => setSelected(recipe)}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(recipe)}
                    tabIndex={0}
                    data-ocid={`recipes-item.${index + 1}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {recipe.imageLink ? (
                          <img
                            src={recipe.imageLink}
                            alt={recipe.title}
                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <span className="font-medium text-foreground truncate max-w-[180px]">
                          {recipe.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                      {recipe.ownerId}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs">
                        {recipe.ingredients.length} items
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-xs">
                        {recipe.steps.length} steps
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <StarRating value={recipe.rating} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(Number(recipe.createdAt)).toLocaleDateString(
                          "en-IN",
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete(recipe.id);
                        }}
                        data-ocid={`recipe-delete-button.${index + 1}`}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        aria-label="Delete recipe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && <AddRecipeModal onClose={() => setShowAdd(false)} />}

      {/* Detail Panel */}
      {selected && (
        <RecipeDetailPanel
          recipe={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <Dialog open onOpenChange={() => setConfirmDelete(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-display">Delete Recipe?</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleDelete(confirmDelete)}
                disabled={deleteRecipe.isPending}
                data-ocid="recipe-confirm-delete"
              >
                {deleteRecipe.isPending ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setConfirmDelete(null)}
                data-ocid="recipe-cancel-delete"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
