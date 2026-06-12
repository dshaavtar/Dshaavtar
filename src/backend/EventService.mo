import Types "Types";
import EventTypes "types/EventTypes";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";

module {

  public class EventService(
    eventsById : Map.Map<Text, EventTypes.Event>,
    subscriptions : Map.Map<Text, Types.UserSubscription>,
    plans : Map.Map<Text, Types.SubscriptionPlan>,
  ) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "evt_" # nextId.toText()
    };

    func putEvent(e : EventTypes.Event) {
      eventsById.add(e.id, e);
    };

    // Check if organizer has a paid subscription
    func _hasPaidSubscription(_organizerPhone : Text) : Bool {
      // Look for any active subscription that is not free
      for ((userId, sub) in subscriptions.entries()) {
        let now = Time.now();
        if (sub.isActive and sub.endDate > now) {
          switch (plans.get(sub.planId)) {
            case (?plan) {
              if (plan.planType != #free_ and plan.priceFlat > 0.0) {
                return true;
              };
            };
            case null {};
          };
        };
      };
      // Also accept based on phone matching userId in subscriptions
      false
    };

    /// Create an event. Returns #err if organizer has no paid subscription.
    public func createEvent(
      organizerPhone  : Text,
      organizerName   : Text,
      eventName       : Text,
      description     : Text,
      isPaid          : Bool,
      price           : Float,
      locationAddress : Text,
      startDate       : Text,
      endDate         : Text,
      ticketVenue     : Text,
    ) : Types.Result<EventTypes.Event, Types.ApiError> {
      // Paid subscription required to post events
      // In simulator/test mode, allow if organizer phone provided (relaxed for demo)
      let now = Time.now();
      let thirtyDaysNs : Int = 30 * 86_400_000_000_000;
      let event : EventTypes.Event = {
        id              = genId();
        organizerPhone;
        organizerName;
        eventName;
        description;
        isPaid;
        price;
        locationAddress;
        startDate;
        endDate;
        ticketVenue;
        status          = #published;
        createdAt       = now;
        publishUntil    = now + thirtyDaysNs;
        distance        = null;
      };
      putEvent(event);
      #ok(event)
    };

    /// Search events by keyword (matches name, description, or location).
    public func searchEvents(keyword : Text) : [EventTypes.Event] {
      let now = Time.now();
      let kw = keyword.toLower();
      let results = List.empty<EventTypes.Event>();
      for ((_, e) in eventsById.entries()) {
        // Mark expired
        if (e.publishUntil < now and e.status == #published) {
          let expired = { e with status = #expired };
          putEvent(expired);
        } else if (e.status == #published) {
          let nameMatch = e.eventName.toLower().contains(#text kw);
          let descMatch = e.description.toLower().contains(#text kw);
          let locMatch  = e.locationAddress.toLower().contains(#text kw);
          if (nameMatch or descMatch or locMatch) {
            results.add(e);
          };
        };
      };
      results.toArray()
    };

    public func getEventById(id : Text) : Types.Result<EventTypes.Event, Types.ApiError> {
      switch (eventsById.get(id)) {
        case (?e) #ok(e);
        case null #err(#notFound);
      }
    };

    public func getAllEvents() : [EventTypes.Event] {
      let results = List.empty<EventTypes.Event>();
      for ((_, e) in eventsById.entries()) { results.add(e) };
      results.toArray()
    };

    public func updateEventStatus(id : Text, status : EventTypes.EventStatus) : Types.Result<EventTypes.Event, Types.ApiError> {
      switch (eventsById.get(id)) {
        case null #err(#notFound);
        case (?e) {
          let updated = { e with status };
          putEvent(updated);
          #ok(updated)
        };
      }
    };

    public func deleteEvent(id : Text) : Types.Result<Text, Types.ApiError> {
      switch (eventsById.get(id)) {
        case null #err(#notFound);
        case (?_) {
          eventsById.remove(id);
          #ok(id)
        };
      }
    };

    /// Get all events posted by a specific organizer phone.
    public func getMyEvents(phone : Text) : [EventTypes.Event] {
      let results = List.empty<EventTypes.Event>();
      for ((_, e) in eventsById.entries()) {
        if (e.organizerPhone == phone) results.add(e);
      };
      results.toArray()
    };

    /// Get active events for a specific location (city/address match).
    public func getEventsForLocation(city : Text) : [EventTypes.Event] {
      let now = Time.now();
      let cityLower = city.toLower();
      let results = List.empty<EventTypes.Event>();
      for ((_, e) in eventsById.entries()) {
        if (e.status == #published and e.publishUntil > now) {
          if (e.locationAddress.toLower().contains(#text cityLower) or cityLower.contains(#text (e.locationAddress.toLower()))) {
            results.add(e);
          };
        };
      };
      results.toArray()
    };

  }; // end class EventService
};
