import LendingTypes "types/LendingTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";

module {

  public class LendingService(
    store : Map.Map<Text, LendingTypes.LendingItem>,
  ) {

    func nextId() : Text {
      "lending-" # Time.now().toText()
    };

    // ── CRUD ────────────────────────────────────────────────────────────────

    public func createLendingItem(item : LendingTypes.LendingItem) : Text {
      let id = if (item.id == "") nextId() else item.id;
      let now = Time.now();
      let record : LendingTypes.LendingItem = {
        item with
        id;
        createdAt = if (item.createdAt == 0) now else item.createdAt;
        updatedAt = now;
      };
      store.add(id, record);
      id
    };

    public func updateLendingItem(id : Text, updated : LendingTypes.LendingItem) : Bool {
      switch (store.get(id)) {
        case null false;
        case (?_) {
          store.add(id, { updated with id; updatedAt = Time.now() });
          true
        };
      }
    };

    public func getLendingItemById(id : Text) : ?LendingTypes.LendingItem {
      store.get(id)
    };

    public func getLendingItemsByLender(phone : Text) : [LendingTypes.LendingItem] {
      let result = List.empty<LendingTypes.LendingItem>();
      for ((_, item) in store.entries()) {
        if (item.lenderPhone == phone) result.add(item);
      };
      result.toArray()
    };

    public func getLendingItemsByBorrower(phone : Text) : [LendingTypes.LendingItem] {
      let result = List.empty<LendingTypes.LendingItem>();
      for ((_, item) in store.entries()) {
        if (item.borrowerPhone == phone) result.add(item);
      };
      result.toArray()
    };

    public func getAllLendingItems() : [LendingTypes.LendingItem] {
      store.values().toArray()
    };

    public func updateLendingStatus(id : Text, status : Text) : Bool {
      switch (store.get(id)) {
        case null false;
        case (?item) {
          store.add(id, { item with status; updatedAt = Time.now() });
          true
        };
      }
    };

    /// Returns items where returnDate is within 7 days from now and status == "active".
    public func getLendingItemsDueSoon() : [LendingTypes.LendingItem] {
      let now = Time.now();
      let sevenDays : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
      let result = List.empty<LendingTypes.LendingItem>();
      for ((_, item) in store.entries()) {
        if (item.status == "active" and item.returnDate > now and item.returnDate <= now + sevenDays) {
          result.add(item);
        };
      };
      result.toArray()
    };

  };

};
