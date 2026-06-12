module {

  // ── Event ──────────────────────────────────────────────────────────────────

  public type EventStatus = {
    #pending;
    #published;
    #expired;
    #cancelled;
  };

  public type Event = {
    id              : Text;
    organizerPhone  : Text;
    organizerName   : Text;
    eventName       : Text;
    description     : Text;
    isPaid          : Bool;
    price           : Float;
    locationAddress : Text;
    startDate       : Text;
    endDate         : Text;
    ticketVenue     : Text;
    status          : EventStatus;
    createdAt       : Int;
    publishUntil    : Int;
    distance        : ?Float;
  };

};
