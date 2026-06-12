import MarketplaceTypes "../types/MarketplaceTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Utils "../Utils";

module {

  public class MarketplaceLib(
    itemsById : Map.Map<Text, MarketplaceTypes.MarketplaceItem>,
  ) {

    var nextId : Nat = 0;

    // ── ID generation ──────────────────────────────────────────────────────────

    func newId() : Text {
      nextId += 1;
      "mkt_" # Time.now().toText() # "_" # nextId.toText()
    };

    // ── CRUD ──────────────────────────────────────────────────────────────────

    public func createItem(
      input    : MarketplaceTypes.MarketplaceItemInput,
      createdBy: Text,
    ) : MarketplaceTypes.MarketplaceItem {
      let id = newId();
      let item : MarketplaceTypes.MarketplaceItem = {
        id                 = id;
        title              = Utils.sanitizeInput(input.title);
        price              = input.price;
        category           = Utils.sanitizeInput(input.category);
        yearOfManufacture  = input.yearOfManufacture;
        instagramPhotoLink = Utils.sanitizeInput(input.instagramPhotoLink);
        listingType        = Utils.sanitizeInput(input.listingType);
        invoiceAvailable   = input.invoiceAvailable;
        createdBy          = Utils.sanitizeInput(createdBy);
        createdAt          = Time.now();
        isActive           = true;
        cityId             = input.cityId;
      };
      itemsById.add(id, item);
      item
    };

    public func listItems(
      category   : ?Text,
      listingType: ?Text,
    ) : [MarketplaceTypes.MarketplaceItem] {
      itemsById.values()
        .filter(func(item) {
          if (not item.isActive) { return false };
          let catOk = switch (category) {
            case null    true;
            case (?cat) item.category == cat;
          };
          let typeOk = switch (listingType) {
            case null    true;
            case (?lt)  item.listingType == lt;
          };
          catOk and typeOk
        })
        .toArray()
    };

    public func getItemById(id : Text) : ?MarketplaceTypes.MarketplaceItem {
      itemsById.get(id)
    };

    public func deactivateItem(id : Text) : Bool {
      switch (itemsById.get(id)) {
        case null false;
        case (?item) {
          itemsById.add(id, { item with isActive = false });
          true
        };
      }
    };

    /// Update title, price, and isActive status of an item.
    /// Pass "" for title to keep the existing value.
    public func updateItem(id : Text, title : Text, price : Float, isActive : Bool) : Bool {
      switch (itemsById.get(id)) {
        case null false;
        case (?item) {
          let newTitle = if (title.size() == 0) item.title else Utils.sanitizeInput(title);
          itemsById.add(id, { item with title = newTitle; price; isActive });
          true
        };
      }
    };

    /// Permanently remove an item.
    public func deleteItem(id : Text) : Bool {
      switch (itemsById.get(id)) {
        case null false;
        case (?_) {
          itemsById.remove(id);
          true
        };
      }
    };

    // ── User listings ─────────────────────────────────────────────────────────

    public func getItemsByUser(userId : Text) : [MarketplaceTypes.MarketplaceItem] {
      itemsById.values()
        .filter(func(item) { item.isActive and item.createdBy == userId })
        .toArray()
    };

  }; // end class MarketplaceLib

};
