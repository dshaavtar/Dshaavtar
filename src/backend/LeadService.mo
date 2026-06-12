import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public class LeadService(leadsById : Map.Map<Text, Types.Lead>) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "lead_" # nextId.toText()
    };

    public func createLead(
      phone    : Text,
      searchQuery : Text,
      category : Text,
      location : Types.Location,
    ) : Types.Lead {
      let lead : Types.Lead = {
        id       = genId();
        phone;
        searchQuery;
        category;
        location;
        status   = #open;
        createdAt = Time.now();
      };
      leadsById.add(lead.id, lead);
      lead
    };

    public func getLeadById(id : Text) : ?Types.Lead {
      leadsById.get(id)
    };

    public func getLeadsByPhone(phone : Text) : [Types.Lead] {
      let all = List.fromIter<Types.Lead>(leadsById.values());
      all.filter(func(l : Types.Lead) : Bool { l.phone == phone }).toArray()
    };

    public func getLeadsByCategory(category : Text) : [Types.Lead] {
      let all = List.fromIter<Types.Lead>(leadsById.values());
      all.filter(func(l : Types.Lead) : Bool {
        l.category.toLower() == category.toLower()
      }).toArray()
    };

    public func getOpenLeads() : [Types.Lead] {
      let all = List.fromIter<Types.Lead>(leadsById.values());
      all.filter(func(l : Types.Lead) : Bool { l.status == #open }).toArray()
    };

    public func respondToLead(
      leadId      : Text,
      _responseText : Text,
    ) : Types.Result<Types.Lead, Types.ApiError> {
      switch (leadsById.get(leadId)) {
        case null #err(#notFound);
        case (?lead) {
          let updated = { lead with status = #responded };
          leadsById.add(leadId, updated);
          #ok(updated)
        };
      }
    };

    public func closeLead(leadId : Text) : Types.Result<Types.Lead, Types.ApiError> {
      switch (leadsById.get(leadId)) {
        case null #err(#notFound);
        case (?lead) {
          let updated = { lead with status = #closed };
          leadsById.add(leadId, updated);
          #ok(updated)
        };
      }
    };

    public func getAllLeads() : [Types.Lead] {
      let all = List.fromIter<Types.Lead>(leadsById.values());
      all.toArray()
    };

  }; // end class LeadService
};
