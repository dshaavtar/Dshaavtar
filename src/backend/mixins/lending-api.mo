import LendingTypes "../types/LendingTypes";
import LendingService "../LendingService";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";

mixin (lendingStore : Map.Map<Text, LendingTypes.LendingItem>) {

  transient let lendingSvc = LendingService.LendingService(lendingStore);

  // ── CRUD ──────────────────────────────────────────────────────────────────

  public shared func createLendingItem(item : LendingTypes.LendingItem) : async Text {
    lendingSvc.createLendingItem(item)
  };

  public shared func updateLendingItem(id : Text, item : LendingTypes.LendingItem) : async Bool {
    lendingSvc.updateLendingItem(id, item)
  };

  public query func getLendingItemById(id : Text) : async ?LendingTypes.LendingItem {
    lendingSvc.getLendingItemById(id)
  };

  public query func getLendingItemsByLender(phone : Text) : async [LendingTypes.LendingItem] {
    lendingSvc.getLendingItemsByLender(phone)
  };

  public query func getLendingItemsByBorrower(phone : Text) : async [LendingTypes.LendingItem] {
    lendingSvc.getLendingItemsByBorrower(phone)
  };

  public query func getAllLendingItems() : async [LendingTypes.LendingItem] {
    lendingSvc.getAllLendingItems()
  };

  public shared func updateLendingStatus(id : Text, status : Text) : async Bool {
    lendingSvc.updateLendingStatus(id, status)
  };

  public query func getLendingItemsDueSoon() : async [LendingTypes.LendingItem] {
    lendingSvc.getLendingItemsDueSoon()
  };

  // ── Reminder logic ────────────────────────────────────────────────────────

  /// Mark lastReminderSent for an item and log the action.
  /// Actual notification delivery is handled by the caller (main.mo) or
  /// NotificationService — this function just updates the timestamp.
  public shared func triggerLendingReminder(itemId : Text) : async Bool {
    switch (lendingSvc.getLendingItemById(itemId)) {
      case null false;
      case (?item) {
        let now = Time.now();
        // Mark reminder sent on the item
        lendingStore.add(itemId, { item with lastReminderSent = ?now; updatedAt = now });
        true
      };
    }
  };

  /// Bulk-check all active lending items, send reminders to those that are
  /// overdue or whose reminder schedule fires today, and return the count sent.
  ///
  /// Reminder schedule logic:
  ///   - monthly   : send if >= 30 days since last reminder (or never sent)
  ///   - quarterly : send if >= 90 days since last reminder (or never sent)
  ///   - yearly    : send if >= 365 days since last reminder (or never sent)
  ///   - specific_date : send if today >= specificReminderDate and not yet sent
  public shared func checkAndSendOverdueReminders() : async Nat {
    let now = Time.now();
    let day : Int = 86_400_000_000_000;
    var sent : Nat = 0;
    for ((id, item) in lendingStore.entries()) {
      if (item.status == "active") {
        let lastSent : Int = switch (item.lastReminderSent) {
          case (?t) t;
          case null  0;
        };
        let shouldSend : Bool = switch (item.reminderFrequency) {
          case "monthly"   { now - lastSent >= 30 * day };
          case "quarterly" { now - lastSent >= 90 * day };
          case "yearly"    { now - lastSent >= 365 * day };
          case "specific_date" {
            switch (item.specificReminderDate) {
              case (?rd) { now >= rd and lastSent < rd };
              case null  false;
            }
          };
          case _ { false };
        };
        if (shouldSend) {
          lendingStore.add(id, { item with lastReminderSent = ?now; updatedAt = now });
          sent += 1;
        };
      };
    };
    sent
  };

};
