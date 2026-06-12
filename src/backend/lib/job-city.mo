import Debug "mo:core/Debug";

module {

  // Lib module for job city filtering helpers.
  // Business logic is implemented in the develop pass.

  /// Build a composite key for a (userId, employerPhone, city) triple.
  public func favoriteKey(userId : Text, employerPhone : Text, city : Text) : Text {
    userId # "__" # employerPhone # "__" # city.toLower()
  };

};
