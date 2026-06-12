import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public class SupportTicketService(
    tickets : Map.Map<Text, Types.SupportTicket>,
  ) {

    var nextTicketId : Nat = 0;

    func genTicketId() : Text {
      nextTicketId += 1;
      "TKT-" # nextTicketId.toText() # "-" # Utils.generateId("tkt")
    };

    // ── Helpers ───────────────────────────────────────────────────────────────

    /// Resolution deadline: 3 days for payment_stuck, 5 days for everything else (in nanoseconds).
    func deadlineNs(category : Types.SupportTicketCategory) : Int {
      let threeDays : Int = 3 * 86_400_000_000_000;
      let fiveDays  : Int = 5 * 86_400_000_000_000;
      switch (category) {
        case (#payment_stuck)      { threeDays };
        case (#behaviour_complaint){ fiveDays  };
        case (#other)              { fiveDays  };
      }
    };

    func priorityFor(category : Types.SupportTicketCategory) : Types.SupportTicketPriority {
      switch (category) {
        case (#payment_stuck)       { #high   };
        case (#behaviour_complaint) { #medium };
        case (#other)               { #low    };
      }
    };

    // ── Public API ────────────────────────────────────────────────────────────

    public func createTicket(
      fromPhone   : Text,
      role        : Types.UserRole,
      category    : Types.SupportTicketCategory,
      description : Text,
      orderId     : ?Text,
    ) : Types.Result<Types.SupportTicket, Types.ApiError> {
      let now = Time.now();
      let ticket : Types.SupportTicket = {
        ticketId           = genTicketId();
        fromPhone;
        fromRole           = role;
        category;
        description;
        orderId;
        status             = #new_;
        priority           = priorityFor(category);
        createdAt          = now;
        updatedAt          = now;
        resolvedAt         = null;
        resolutionDeadline = now + deadlineNs(category);
        remarks            = "";
        adminNote          = "";
      };
      tickets.add(ticket.ticketId, ticket);
      #ok(ticket)
    };

    public func updateTicketStatus(
      ticketId  : Text,
      status    : Types.SupportTicketStatus,
      adminNote : Text,
    ) : Types.Result<Types.SupportTicket, Types.ApiError> {
      switch (tickets.get(ticketId)) {
        case null { #err(#notFound) };
        case (?t) {
          let now = Time.now();
          let resolvedAt : ?Int = switch (status) {
            case (#resolved) { ?now };
            case (#closed)   { ?now };
            case _           { t.resolvedAt };
          };
          let updated = { t with status; adminNote; updatedAt = now; resolvedAt };
          tickets.add(ticketId, updated);
          #ok(updated)
        };
      }
    };

    public func getTicketsByPhone(phone : Text) : [Types.SupportTicket] {
      let all = List.fromIter<Types.SupportTicket>(tickets.values());
      all.filter(func(t : Types.SupportTicket) : Bool {
        t.fromPhone == phone
      }).toArray()
    };

    public func getAllTickets(filter : ?Text) : [Types.SupportTicket] {
      let all = List.fromIter<Types.SupportTicket>(tickets.values());
      switch (filter) {
        case null { all.toArray() };
        case (?f) {
          all.filter(func(t : Types.SupportTicket) : Bool {
            if (f == "new")         { t.status == #new_        }
            else if (f == "resolved"){ t.status == #resolved   }
            else if (f == "closed")  { t.status == #closed     }
            else if (f == "high")    { t.priority == #high     }
            else if (f == "payment") { t.category == #payment_stuck }
            else { true }
          }).toArray()
        };
      }
    };

    public func getOverdueTickets() : [Types.SupportTicket] {
      let now = Time.now();
      let all = List.fromIter<Types.SupportTicket>(tickets.values());
      all.filter(func(t : Types.SupportTicket) : Bool {
        now > t.resolutionDeadline and
        t.status != #resolved and
        t.status != #closed
      }).toArray()
    };

    public func getTicketById(ticketId : Text) : Types.Result<Types.SupportTicket, Types.ApiError> {
      switch (tickets.get(ticketId)) {
        case (?t) { #ok(t) };
        case null  { #err(#notFound) };
      }
    };

    /// Permanently delete a ticket.
    public func deleteTicket(ticketId : Text) : Bool {
      switch (tickets.get(ticketId)) {
        case null { false };
        case (?_) {
          tickets.remove(ticketId);
          true
        };
      }
    };

  }; // end class SupportTicketService
};
