module {

  /// Input for creating a marketplace listing.
  public type MarketplaceItemInput = {
    title             : Text;
    price             : Float;
    category          : Text;   // electronics | vehicle | utensils | cloth | furniture | kitchen | equipment
    yearOfManufacture : Nat;
    instagramPhotoLink: Text;
    listingType       : Text;   // rent | sale
    invoiceAvailable  : Bool;
    cityId            : ?Text;
  };

  /// A sell/buy/rent old-items listing.
  public type MarketplaceItem = {
    id                : Text;
    title             : Text;
    price             : Float;
    category          : Text;
    yearOfManufacture : Nat;
    instagramPhotoLink: Text;
    listingType       : Text;
    invoiceAvailable  : Bool;
    createdBy         : Text;   // user phone or userId
    createdAt         : Int;
    isActive          : Bool;
    cityId            : ?Text;
  };

};
