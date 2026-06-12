import CustomerRatingTypes "../types/CustomerRatingTypes";
import Map "mo:core/Map";

mixin (
  customerRatingsById : Map.Map<Text, CustomerRatingTypes.CustomerRating>,
) {

  // ── Customer Rating API ───────────────────────────────────────────────────

  public shared func addCustomerRating(rating : CustomerRatingTypes.CustomerRating) : async { #ok : Text; #err : Text } {
    switch (customerRatingsById.get(rating.id)) {
      case (?_) { #err("Rating with this ID already exists") };
      case null {
        customerRatingsById.add(rating.id, rating);
        #ok(rating.id)
      };
    }
  };

  public query func getCustomerRatings(customerId : Text) : async [CustomerRatingTypes.CustomerRating] {
    customerRatingsById.values().filter(
      func(r : CustomerRatingTypes.CustomerRating) : Bool { r.customerId == customerId }
    ).toArray()
  };

  public query func getAllCustomerRatings() : async [CustomerRatingTypes.CustomerRating] {
    customerRatingsById.values().toArray()
  };

  public shared func deleteCustomerRating(id : Text) : async { #ok : Text; #err : Text } {
    switch (customerRatingsById.get(id)) {
      case null { #err("Rating not found") };
      case (?_) {
        customerRatingsById.remove(id);
        #ok(id)
      };
    }
  };

};
