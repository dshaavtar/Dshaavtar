import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public class RestockService(
    restockOrdersById : Map.Map<Text, Types.RestockOrder>,
  ) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "restock_" # Utils.generateId("r") # "_" # nextId.toText()
    };

    // ── Create ────────────────────────────────────────────────────────────────

    public func createRestockOrder(
      merchantId    : Text,
      merchantPhone : Text,
      supplierName  : Text,
      itemName      : Text,
      quantity      : Nat,
      notes         : Text,
    ) : Types.Result<Types.RestockOrder, Types.ApiError> {
      // Sanitize all text inputs
      let cleanSupplier = Utils.sanitizeInput(supplierName);
      let cleanItem     = Utils.sanitizeInput(itemName);
      let cleanNotes    = Utils.sanitizeInput(notes);

      if (cleanSupplier.size() == 0) {
        return #err(#invalidInput("Supplier name is required"));
      };
      if (cleanItem.size() == 0) {
        return #err(#invalidInput("Item name is required"));
      };
      if (quantity == 0) {
        return #err(#invalidInput("Quantity must be greater than 0"));
      };

      let now = Time.now();
      let order : Types.RestockOrder = {
        id            = genId();
        merchantId;
        merchantPhone;
        supplierName  = cleanSupplier;
        itemName      = cleanItem;
        quantity;
        notes         = cleanNotes;
        status        = #pending;
        createdAt     = now;
        updatedAt     = now;
      };
      restockOrdersById.add(order.id, order);
      #ok(order)
    };

    // ── Read ──────────────────────────────────────────────────────────────────

    public func getRestockOrdersByMerchant(merchantId : Text) : [Types.RestockOrder] {
      let results = List.empty<Types.RestockOrder>();
      for ((_, o) in restockOrdersById.entries()) {
        if (o.merchantId == merchantId) results.add(o);
      };
      results.toArray()
    };

    public func getAllRestockOrders() : [Types.RestockOrder] {
      let results = List.empty<Types.RestockOrder>();
      for ((_, o) in restockOrdersById.entries()) { results.add(o) };
      results.toArray()
    };

    public func getRestockOrderById(id : Text) : ?Types.RestockOrder {
      restockOrdersById.get(id)
    };

    // ── Update ────────────────────────────────────────────────────────────────

    public func updateRestockStatus(
      orderId : Text,
      status  : Types.RestockStatus,
    ) : Types.Result<(), Types.ApiError> {
      switch (restockOrdersById.get(orderId)) {
        case null { #err(#notFound) };
        case (?o) {
          let updated = { o with status; updatedAt = Time.now() };
          restockOrdersById.add(orderId, updated);
          #ok(())
        };
      }
    };

    /// Permanently delete a restock order.
    public func deleteRestockOrder(orderId : Text) : Bool {
      switch (restockOrdersById.get(orderId)) {
        case null { false };
        case (?_) {
          restockOrdersById.remove(orderId);
          true
        };
      }
    };

  }; // end class RestockService
};
