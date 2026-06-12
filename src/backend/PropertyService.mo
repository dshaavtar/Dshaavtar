import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  // 14 days in nanoseconds
  let PROPERTY_DURATION_NS : Int = 1_209_600_000_000_000;

  public class PropertyService(properties : Map.Map<Text, Types.Property>) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "prop_" # Utils.generateId("p") # "_" # nextId.toText()
    };

    public func postProperty(
      posterId : Text,
      listingType : Types.PropertyListingType,
      description : Text,
      expectedPrice : Float,
      location : Types.Location,
    ) : Types.Result<Types.Property, Types.ApiError> {
      let now = Time.now();
      let property : Types.Property = {
        id = genId();
        posterId;
        listingType;
        description;
        expectedPrice;
        location;
        publishDate = now;
        endDate = now + PROPERTY_DURATION_NS;
        isActive = true;
        leads = [];
      };
      properties.add(property.id, property);
      #ok(property)
    };

    public func getPropertyById(id : Text) : Types.Result<Types.Property, Types.ApiError> {
      switch (properties.get(id)) {
        case (?p) #ok(p);
        case null #err(#notFound);
      }
    };

    public func searchProperties(
      listingType : ?Types.PropertyListingType,
      location : ?Types.Location,
      radiusKm : Float,
      maxPrice : ?Float,
    ) : [Types.Property] {
      let now = Time.now();
      let results = List.empty<Types.Property>();
      for ((_, prop) in properties.entries()) {
        if (prop.isActive and prop.endDate > now) {
          let typeMatch = switch (listingType) {
            case null true;
            case (?lt) prop.listingType == lt;
          };
          let locMatch = switch (location) {
            case null true;
            case (?loc) {
              Utils.haversineDistance(loc.lat, loc.lng, prop.location.lat, prop.location.lng) <= radiusKm
            };
          };
          let priceMatch = switch (maxPrice) {
            case null true;
            case (?mp) prop.expectedPrice <= mp;
          };
          if (typeMatch and locMatch and priceMatch) {
            results.add(prop);
          };
        };
      };
      results.toArray()
    };

    public func requestPropertyContact(
      propertyId : Text,
      requesterId : Text,
      requesterName : Text,
      requesterPhone : Text,
    ) : Types.Result<Text, Types.ApiError> {
      switch (properties.get(propertyId)) {
        case null #err(#notFound);
        case (?prop) {
          let existing = prop.leads.find(func(l : Types.ContactRequest) : Bool { l.requesterId == requesterId });
          switch (existing) {
            case (?_) #err(#alreadyExists);
            case null {
              let req : Types.ContactRequest = {
                requesterId;
                requesterPhone;
                requesterName;
                status = #pending;
                requestedAt = Time.now();
              };
              let updatedProp = { prop with leads = prop.leads.concat([req]) };
              properties.add(propertyId, updatedProp);
              #ok("Contact request sent to property poster for approval")
            };
          }
        };
      }
    };

    public func approvePropertyContactShare(
      propertyId : Text,
      leadUserId : Text,
    ) : Types.Result<Text, Types.ApiError> {
      switch (properties.get(propertyId)) {
        case null #err(#notFound);
        case (?prop) {
          let leadExists = prop.leads.find(func(l : Types.ContactRequest) : Bool { l.requesterId == leadUserId });
          switch (leadExists) {
            case null #err(#notFound);
            case (?lead) {
              let updatedLeads = prop.leads.map(
                func(l : Types.ContactRequest) : Types.ContactRequest {
                  if (l.requesterId == leadUserId) { { l with status = #approved } } else l
                }
              );
              let updatedProp = { prop with leads = updatedLeads };
              properties.add(propertyId, updatedProp);
              // Return the requester phone so the caller can send a notification
              #ok(lead.requesterPhone)
            };
          }
        };
      }
    };

    public func getAllProperties(
      listingType : ?Types.PropertyListingType,
      isActive : ?Bool,
    ) : [Types.Property] {
      let results = List.empty<Types.Property>();
      for ((_, prop) in properties.entries()) {
        let typeMatch = switch (listingType) {
          case null true;
          case (?lt) prop.listingType == lt;
        };
        let activeMatch = switch (isActive) {
          case null true;
          case (?a) prop.isActive == a;
        };
        if (typeMatch and activeMatch) results.add(prop);
      };
      results.toArray()
    };

    public func closeExpiredProperties() : Nat {
      let now = Time.now();
      var count = 0;
      for ((id, prop) in properties.entries()) {
        if (prop.isActive and prop.endDate <= now) {
          properties.add(id, { prop with isActive = false });
          count += 1;
        };
      };
      count
    };
  };
};
