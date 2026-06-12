import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  /// Allowed tip amounts in rupees.
  public let ALLOWED_TIP_AMOUNTS : [Nat] = [20, 50, 70, 100];

  public class TipService(tipsById : Map.Map<Text, Types.TipRecord>) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "tip_" # nextId.toText()
    };

    /// Add a tip for an order or ride.
    /// Returns error if amount is not one of [20, 50, 70, 100].
    public func addTip(
      entityId       : Text,
      entityType     : Text,   // "order" | "ride"
      amount         : Nat,
      fromCustomerId : Text,
      toPartnerId    : Text,
    ) : Types.Result<Types.TipRecord, Types.ApiError> {
      // Validate tip amount
      let allowed = ALLOWED_TIP_AMOUNTS.find(func(a : Nat) : Bool { a == amount });
      switch (allowed) {
        case null {
          return #err(#invalidInput("Tip amount must be one of: 20, 50, 70, 100 rupees"))
        };
        case (?_) {};
      };
      let tip : Types.TipRecord = {
        id             = genId();
        entityId;
        entityType;
        amount;
        fromCustomerId;
        toPartnerId;
        timestamp      = Time.now();
      };
      tipsById.add(tip.id, tip);
      #ok(tip)
    };

    /// Get all tips earned by a specific partner (delivery or sarthi).
    public func getPartnerTips(partnerId : Text) : [Types.TipRecord] {
      let all = List.fromIter<Types.TipRecord>(tipsById.values());
      all.filter(func(t : Types.TipRecord) : Bool {
        t.toPartnerId == partnerId
      }).toArray()
    };

    /// Get total tip amount earned by a partner.
    public func getTotalTipsEarned(partnerId : Text) : Nat {
      let tips = getPartnerTips(partnerId);
      var total : Nat = 0;
      for (t in tips.vals()) {
        total += t.amount;
      };
      total
    };

    /// Get tips given by a customer.
    public func getCustomerTips(customerId : Text) : [Types.TipRecord] {
      let all = List.fromIter<Types.TipRecord>(tipsById.values());
      all.filter(func(t : Types.TipRecord) : Bool {
        t.fromCustomerId == customerId
      }).toArray()
    };

    /// Get all tips in the system.
    public func getAllTips() : [Types.TipRecord] {
      let all = List.fromIter<Types.TipRecord>(tipsById.values());
      all.toArray()
    };

  }; // end class TipService
};
