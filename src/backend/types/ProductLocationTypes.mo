module {

  // Per-product pricing by city/branch.
  // A merchant can set a different price for the same product in each city or branch.
  public type ProductLocationPrice = {
    id        : Text;
    productId : Text;
    cityId    : Text;   // matches CityTypes.City.id
    branchId  : Text;   // branch identifier (may be empty string for city-level price)
    price     : Float;
    createdAt : Int;
    updatedAt : Int;
  };

  // Summary returned by checkProductPriceUniformity.
  public type ProductPriceUniformity = {
    isUniform     : Bool;   // true when all location prices are identical
    minPrice      : Float;
    maxPrice      : Float;
    locationCount : Nat;
  };

};
