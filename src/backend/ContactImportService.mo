import Types "Types";
import Utils "Utils";
import UserService "UserService";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

module {

  public class ContactImportService(
    userSvc : UserService.UserService,
  ) {

    // ── Public API ────────────────────────────────────────────────────────────

    /// Bulk-import phone contacts for a merchant.
    /// Skips phones already registered as merchant/DP/sarthi.
    /// Skips duplicate customers already in the system.
    /// Creates customer records with importedByMerchant set to merchant name.
    public func importContacts(
      merchantPhone : Text,
      merchantName  : Text,
      contacts      : [Text],
    ) : { imported : Nat; duplicates : Nat; skippedMerchants : Nat; skippedDPs : Nat } {
      var imported  : Nat = 0;
      var duplicates : Nat = 0;
      var skippedMerchants : Nat = 0;
      var skippedDPs : Nat = 0;

      let batchId = Utils.generateId("batch");

      for (phone in contacts.vals()) {
        // Skip the merchant's own phone
        if (phone == merchantPhone) {
          duplicates += 1;
        } else {
          // Check if already a merchant/DP/sarthi
          if (userSvc.isMerchantOrDP(phone)) {
            switch (userSvc.getUserByPhone(phone)) {
              case (#ok(u)) {
                switch (u.role) {
                  case (#merchant)        { skippedMerchants += 1 };
                  case (#deliveryPartner) { skippedDPs += 1 };
                  case (#sarthi)          { skippedDPs += 1 };
                  case _                  { duplicates += 1 };
                }
              };
              case (#err(_)) { skippedMerchants += 1 };
            }
          } else {
            // Check if already a customer
            switch (userSvc.getUserByPhone(phone)) {
              case (#ok(_)) { duplicates += 1 };
              case (#err(_)) {
                // Create as imported customer
                switch (userSvc.createImportedUser(phone, merchantName, batchId)) {
                  case (#ok(_)) { imported += 1 };
                  case (#err(_)) { duplicates += 1 };
                };
              };
            }
          }
        }
      };

      { imported; duplicates; skippedMerchants; skippedDPs }
    };

    /// Count total customers imported by this merchant (by name).
    public func getMerchantImportStats(merchantName : Text) : { totalImported : Nat; lastImportDate : ?Int } {
      let customers = userSvc.getImportedCustomers(merchantName);
      let total = customers.size();
      // Find the latest registration date
      let latestDate : ?Int = if (total == 0) {
        null
      } else {
        var maxDate : Int = 0;
        for (u in customers.vals()) {
          if (u.registrationDate > maxDate) {
            maxDate := u.registrationDate;
          };
        };
        ?maxDate
      };
      { totalImported = total; lastImportDate = latestDate }
    };

    /// Returns discount percentage: floor(totalImported / 150) * 5, capped at 25.
    public func getSubscriptionDiscount(merchantName : Text) : Nat {
      let stats = getMerchantImportStats(merchantName);
      let tiers = stats.totalImported / 150;
      let discount = tiers * 5;
      Nat.min(discount, 25)
    };

    /// Return list of customer phones that opted out from this merchant's promotions.
    public func getOptOutCustomers(merchantName : Text) : [Text] {
      let customers = userSvc.getImportedCustomers(merchantName);
      let optedOut = List.fromArray<Types.User>(customers).filter(
        func(u : Types.User) : Bool { u.promotionalOptOut }
      );
      optedOut.map<Types.User, Text>(func(u) { u.phone }).toArray()
    };

    /// Set promotional opt-out for a customer.
    public func setPromotionalOptOut(customerPhone : Text, optOut : Bool) : Types.Result<(), Types.ApiError> {
      switch (userSvc.setPromotionalOptOut(customerPhone, optOut)) {
        case (#ok(_))  { #ok(()) };
        case (#err(e)) { #err(e) };
      }
    };

    /// Send a promotional message to all eligible customers of this merchant.
    /// Returns {sent, skipped}.
    /// (Actual WhatsApp send is handled by the frontend/chatbot layer; this just returns the eligible list.)
    public func sendMerchantPromotion(
      merchantName : Text,
      _messageText : Text,
    ) : { sent : Nat; skipped : Nat; recipients : [Text] } {
      let customers = userSvc.getImportedCustomers(merchantName);
      var sent : Nat = 0;
      var skipped : Nat = 0;
      let recipients = List.empty<Text>();

      for (u in customers.vals()) {
        if (u.promotionalOptOut) {
          skipped += 1;
        } else {
          recipients.add(u.phone);
          sent += 1;
        };
      };
      { sent; skipped; recipients = recipients.toArray() }
    };

  }; // end class ContactImportService
};
