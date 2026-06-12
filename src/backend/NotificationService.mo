import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {

  public class NotificationService(notifications : Map.Map<Text, Types.Notification>) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "notif_" # Utils.generateId("n") # "_" # debug_show(nextId)
    };

    public func createNotification(
      userId : Text,
      recipientPhone : Text,
      notificationType : Text,
      message : Text,
    ) : Types.Result<Types.Notification, Types.ApiError> {
      let notif : Types.Notification = {
        id = genId();
        userId;
        recipientPhone;
        notificationType;
        message;
        status = #pending;
        createdAt = Time.now();
        sentAt = null;
      };
      notifications.add(notif.id, notif);
      #ok(notif)
    };

    public func getNotificationsByUser(userId : Text) : [Types.Notification] {
      let results = List.empty<Types.Notification>();
      for ((_, notif) in notifications.entries()) {
        if (notif.userId == userId) results.add(notif);
      };
      results.toArray()
    };

    public func getAllNotifications(
      status : ?Types.NotificationStatus,
      from : ?Int,
      to : ?Int,
    ) : [Types.Notification] {
      let results = List.empty<Types.Notification>();
      for ((_, notif) in notifications.entries()) {
        let statusMatch = switch (status) {
          case null true;
          case (?s) notif.status == s;
        };
        let fromMatch = switch (from) {
          case null true;
          case (?f) notif.createdAt >= f;
        };
        let toMatch = switch (to) {
          case null true;
          case (?t) notif.createdAt <= t;
        };
        if (statusMatch and fromMatch and toMatch) results.add(notif);
      };
      results.toArray()
    };

    public func markNotificationSent(id : Text) : Types.Result<Types.Notification, Types.ApiError> {
      switch (notifications.get(id)) {
        case null #err(#notFound);
        case (?notif) {
          let updated = { notif with status = #sent; sentAt = ?Time.now() };
          notifications.add(id, updated);
          #ok(updated)
        };
      }
    };

    public func markNotificationFailed(id : Text) : Types.Result<Types.Notification, Types.ApiError> {
      switch (notifications.get(id)) {
        case null #err(#notFound);
        case (?notif) {
          let updated = { notif with status = #failed };
          notifications.add(id, updated);
          #ok(updated)
        };
      }
    };
  };
};
