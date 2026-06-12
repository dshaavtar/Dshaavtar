import CommunityTypes "types/CommunityTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";

module {

  public class CommunityService(
    store : Map.Map<Text, CommunityTypes.CommunityMember>,
  ) {

    // ── Public API ──────────────────────────────────────────────────────────

    /// Upsert a community member by phone.
    /// If the member already exists, extends their roles list and updates fields.
    public func addOrUpdateCommunityMember(member : CommunityTypes.CommunityMember) {
      let now = Time.now();
      let phone = member.phone;
      switch (store.get(phone)) {
        case null {
          // New member
          store.add(phone, {
            member with
            id           = phone;
            registeredAt = if (member.registeredAt == 0) now else member.registeredAt;
            updatedAt    = now;
          });
        };
        case (?existing) {
          // Merge roles without duplicates
          let mergedRoles = List.empty<Text>();
          for (r in existing.roles.vals()) { mergedRoles.add(r) };
          for (r in member.roles.vals()) {
            if (mergedRoles.find(func(x : Text) : Bool { x == r }) == null) {
              mergedRoles.add(r);
            };
          };
          // Update name, address etc. only when the incoming value is non-empty
          let updatedName          = if (member.name          != "") member.name          else existing.name;
          let updatedApartmentName = if (member.apartmentName != "") member.apartmentName else existing.apartmentName;
          let updatedAddress       = if (member.address       != "") member.address       else existing.address;
          let updatedLocation      = if (member.location      != "") member.location      else existing.location;
          let updatedCity          = if (member.city          != "") member.city          else existing.city;
          store.add(phone, {
            existing with
            name          = updatedName;
            apartmentName = updatedApartmentName;
            address       = updatedAddress;
            location      = updatedLocation;
            city          = updatedCity;
            roles         = mergedRoles.toArray();
            updatedAt     = now;
          });
        };
      };
    };

    public func getCommunityMemberByPhone(phone : Text) : ?CommunityTypes.CommunityMember {
      store.get(phone)
    };

    public func getAllCommunityMembers() : [CommunityTypes.CommunityMember] {
      store.values().toArray()
    };

    /// Search by phone, name, city, or location (case-insensitive substring match).
    /// Search by phone, name, city, or location (case-insensitive substring match).
    public func searchCommunityMembers(searchTerm : Text) : [CommunityTypes.CommunityMember] {
      let lower = searchTerm.toLower();
      let result = List.empty<CommunityTypes.CommunityMember>();
      for ((_, m) in store.entries()) {
        if (
          m.phone.contains(#text searchTerm) or
          m.name.toLower().contains(#text lower) or
          m.city.toLower().contains(#text lower) or
          m.location.toLower().contains(#text lower) or
          m.address.toLower().contains(#text lower)
        ) {
          result.add(m);
        };
      };
      result.toArray()
    };

    public func removeCommunityMember(phone : Text) : Bool {
      switch (store.get(phone)) {
        case null false;
        case (?_) {
          store.remove(phone);
          true
        };
      }
    };

    public func getCommunityMembersByCity(city : Text) : [CommunityTypes.CommunityMember] {
      let lower = city.toLower();
      let result = List.empty<CommunityTypes.CommunityMember>();
      for ((_, m) in store.entries()) {
        if (m.city.toLower() == lower) result.add(m);
      };
      result.toArray()
    };

  };

};
