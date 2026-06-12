import MarketplaceTypes "../types/MarketplaceTypes";
import MarketplaceLib "../lib/marketplace";
import Map "mo:core/Map";

mixin (
  marketplaceItemsById : Map.Map<Text, MarketplaceTypes.MarketplaceItem>,
) {

  transient let marketplaceSvc = MarketplaceLib.MarketplaceLib(marketplaceItemsById);

  // ── Marketplace listings ──────────────────────────────────────────────────

  public func createMarketplaceItem(
    input    : MarketplaceTypes.MarketplaceItemInput,
    createdBy: Text,
  ) : async MarketplaceTypes.MarketplaceItem {
    marketplaceSvc.createItem(input, createdBy)
  };

  public query func listMarketplaceItems(
    category   : ?Text,
    listingType: ?Text,
  ) : async [MarketplaceTypes.MarketplaceItem] {
    marketplaceSvc.listItems(category, listingType)
  };

  public query func getMarketplaceItemById(id : Text) : async ?MarketplaceTypes.MarketplaceItem {
    marketplaceSvc.getItemById(id)
  };

  public func deactivateMarketplaceItem(id : Text) : async Bool {
    marketplaceSvc.deactivateItem(id)
  };

  /// Update title and/or price of a marketplace item. Pass "" to keep existing title unchanged.
  /// Also updates `isActive` status (true = active, false = deactivated).
  public func updateMarketplaceItem(id : Text, title : Text, price : Float, isActive : Bool) : async Bool {
    marketplaceSvc.updateItem(id, title, price, isActive)
  };

  /// Permanently delete a marketplace item by id.
  public func deleteMarketplaceItem(id : Text) : async Bool {
    marketplaceSvc.deleteItem(id)
  };

  public query func getUserListings(userId : Text) : async [MarketplaceTypes.MarketplaceItem] {
    marketplaceSvc.getItemsByUser(userId)
  };

};
