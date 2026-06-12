import Debug "mo:core/Debug";

module {

  // Lib module for product location pricing helpers.
  // Business logic is implemented in the develop pass.

  /// Build a composite key for a (productId, cityId, branchId) triple.
  public func compositeKey(productId : Text, cityId : Text, branchId : Text) : Text {
    productId # "__" # cityId # "__" # branchId
  };

};
