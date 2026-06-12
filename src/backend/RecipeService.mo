import Types "Types";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";

module {

  public type RecipeIngredient = Types.RecipeIngredient;
  public type Recipe            = Types.Recipe;

  public class RecipeService(
    recipesById : Map.Map<Text, Types.Recipe>,
  ) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "recipe_" # nextId.toText()
    };

    // ── Create ────────────────────────────────────────────────────────────────

    public func createRecipe(
      ownerId     : Text,
      title       : Text,
      ingredients : [Types.RecipeIngredient],
      steps       : [Text],
      imageLink   : Text,
      videoLink   : Text,
      benefits    : Text,
      tips        : Text,
    ) : Types.Recipe {
      let now = Time.now();
      let recipe : Types.Recipe = {
        id           = genId();
        ownerId;
        title;
        ingredients;
        steps;
        imageLink;
        videoLink;
        benefits;
        tips;
        rating       = 0.0;
        ratingCount  = 0;
        createdAt    = now;
        updatedAt    = now;
      };
      recipesById.add(recipe.id, recipe);
      recipe
    };

    // ── Read ──────────────────────────────────────────────────────────────────

    public func getRecipeById(id : Text) : ?Types.Recipe {
      recipesById.get(id)
    };

    public func getAllRecipes() : [Types.Recipe] {
      let results = List.empty<Types.Recipe>();
      for ((_, r) in recipesById.entries()) { results.add(r) };
      results.toArray()
    };

    public func getRecipesByOwner(ownerId : Text) : [Types.Recipe] {
      let results = List.empty<Types.Recipe>();
      for ((_, r) in recipesById.entries()) {
        if (r.ownerId == ownerId) results.add(r);
      };
      results.toArray()
    };

    /// Search recipes by keyword — matches title or any ingredient name.
    public func searchRecipes(keyword : Text) : [Types.Recipe] {
      let kw = keyword.toLower();
      let results = List.empty<Types.Recipe>();
      for ((_, r) in recipesById.entries()) {
        let titleMatch = r.title.toLower().contains(#text kw);
        let ingredientMatch = do {
          var found = false;
          for (ing in r.ingredients.vals()) {
            if (ing.name.toLower().contains(#text kw)) { found := true };
          };
          found
        };
        if (titleMatch or ingredientMatch) results.add(r);
      };
      results.toArray()
    };

    /// Get top N recipes ordered by rating descending.
    public func getTopRatedRecipes(limit : Nat) : [Types.Recipe] {
      let all = List.empty<Types.Recipe>();
      for ((_, r) in recipesById.entries()) { all.add(r) };
      let sorted = all.sort(func(a : Types.Recipe, b : Types.Recipe) : Order.Order {
        if (a.rating > b.rating) #less      // reverse order (highest first)
        else if (a.rating < b.rating) #greater
        else #equal
      });
      let count = if (limit < sorted.size()) limit else sorted.size();
      sorted.sliceToArray(0, count.toInt())
    };

    // ── Update ────────────────────────────────────────────────────────────────

    public func updateRecipe(
      id          : Text,
      title       : ?Text,
      ingredients : ?[Types.RecipeIngredient],
      steps       : ?[Text],
      imageLink   : ?Text,
      videoLink   : ?Text,
      benefits    : ?Text,
      tips        : ?Text,
    ) : ?Types.Recipe {
      switch (recipesById.get(id)) {
        case null null;
        case (?r) {
          let updated : Types.Recipe = {
            r with
            title       = switch (title)       { case (?v) v; case null r.title };
            ingredients = switch (ingredients) { case (?v) v; case null r.ingredients };
            steps       = switch (steps)       { case (?v) v; case null r.steps };
            imageLink   = switch (imageLink)   { case (?v) v; case null r.imageLink };
            videoLink   = switch (videoLink)   { case (?v) v; case null r.videoLink };
            benefits    = switch (benefits)    { case (?v) v; case null r.benefits };
            tips        = switch (tips)        { case (?v) v; case null r.tips };
            updatedAt   = Time.now();
          };
          recipesById.add(id, updated);
          ?updated
        };
      }
    };

    /// Rate a recipe — updates running average. Returns updated recipe.
    public func rateRecipe(id : Text, rating : Float) : ?Types.Recipe {
      switch (recipesById.get(id)) {
        case null null;
        case (?r) {
          let newCount = r.ratingCount + 1;
          let newRating = (r.rating * r.ratingCount.toFloat() + rating) / newCount.toFloat();
          let updated : Types.Recipe = {
            r with
            rating      = newRating;
            ratingCount = newCount;
            updatedAt   = Time.now();
          };
          recipesById.add(id, updated);
          ?updated
        };
      }
    };

    // ── Delete ────────────────────────────────────────────────────────────────

    public func deleteRecipe(id : Text) : Bool {
      switch (recipesById.get(id)) {
        case null false;
        case (?_) {
          recipesById.remove(id);
          true
        };
      }
    };

  }; // end class RecipeService
};
