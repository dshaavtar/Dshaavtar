import Types "../Types";
import ProductLocationTypes "../types/ProductLocationTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import ProductLocationLib "../lib/product-location";

mixin (
  productLocationPricesStore : Map.Map<Text, ProductLocationTypes.ProductLocationPrice>,
) {

  // ── Product Location Pricing API ──────────────────────────────────────────

  /// Set or update the price for a product in a specific city/branch.
  public shared func setProductLocationPrice(
    productId : Text,
    cityId    : Text,
    branchId  : Text,
    price     : Float,
  ) : async Types.Result<ProductLocationTypes.ProductLocationPrice, Text> {
    let key = ProductLocationLib.compositeKey(productId, cityId, branchId);
    let now = Time.now();
    let entry : ProductLocationTypes.ProductLocationPrice = switch (productLocationPricesStore.get(key)) {
      case (?existing) ({
        existing with price = price; updatedAt = now
      });
      case null {
        { id = key; productId = productId; cityId = cityId; branchId = branchId; price = price; createdAt = now; updatedAt = now }
      };
    };
    productLocationPricesStore.add(key, entry);
    #ok(entry)
  };

  /// Return all location prices for a product.
  public query func getProductLocationPrices(
    productId : Text,
  ) : async [ProductLocationTypes.ProductLocationPrice] {
    productLocationPricesStore.values().toArray().filter(
      func(e : ProductLocationTypes.ProductLocationPrice) : Bool { e.productId == productId }
    )
  };

  /// Check whether all location prices for a product are the same.
  /// Returns isUniform=true when all prices are equal (or no location prices exist),
  /// plus min/max/count details.
  public query func checkProductPriceUniformity(
    productId : Text,
  ) : async ProductLocationTypes.ProductPriceUniformity {
    let prices = productLocationPricesStore.values().toArray().filter(
      func(e : ProductLocationTypes.ProductLocationPrice) : Bool { e.productId == productId }
    );
    let count = prices.size();
    if (count == 0) {
      return { isUniform = true; minPrice = 0.0; maxPrice = 0.0; locationCount = 0 };
    };
    var minP : Float = prices[0].price;
    var maxP : Float = prices[0].price;
    for (e in prices.vals()) {
      if (e.price < minP) minP := e.price;
      if (e.price > maxP) maxP := e.price;
    };
    let isUniform = (maxP - minP) < 0.01;
    { isUniform; minPrice = minP; maxPrice = maxP; locationCount = count }
  };

  /// Delete a location price entry.
  public shared func deleteProductLocationPrice(
    productId : Text,
    cityId    : Text,
    branchId  : Text,
  ) : async Types.Result<Bool, Text> {
    let key = ProductLocationLib.compositeKey(productId, cityId, branchId);
    switch (productLocationPricesStore.get(key)) {
      case null { #err("Price entry not found") };
      case (?_) {
        productLocationPricesStore.remove(key);
        #ok(true)
      };
    }
  };

  /// Return all location prices across all products (Data Explorer).
  public query func getAllProductLocationPrices() : async [ProductLocationTypes.ProductLocationPrice] {
    productLocationPricesStore.values().toArray()
  };

};
