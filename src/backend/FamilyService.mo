import Types "Types";
import FamilyTypes "types/FamilyTypes";
import UserService "UserService";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public class FamilyService(
    familyById : Map.Map<Text, FamilyTypes.FamilyMember>,
    userSvc    : UserService.UserService,
  ) {

    var nextId : Nat = 0;
    var nextGroupId : Nat = 0;
    var nextRequestId : Nat = 0;

    let groupsById   = Map.empty<Text, FamilyTypes.FamilyGroup>();
    let connectReqs  = Map.empty<Text, Types.FamilyConnectRequest>();

    func genId() : Text {
      nextId += 1;
      "fam_" # nextId.toText()
    };

    func genGroupId() : Text {
      nextGroupId += 1;
      "fgrp_" # nextGroupId.toText()
    };

    func genRequestId() : Text {
      nextRequestId += 1;
      "fcreq_" # nextRequestId.toText()
    };

    func putMember(m : FamilyTypes.FamilyMember) {
      familyById.add(m.id, m);
    };

    /// Update or create the family group for owner/surname. Adds memberPhone to the group.
    func upsertFamilyGroup(ownerPhone : Text, surname : Text, memberPhone : Text, gType : FamilyTypes.GroupType) {
      // Collect matching group id first, then update outside iteration
      var matchedGid : ?Text = null;
      for ((gid, g) in groupsById.entries()) {
        if (g.ownerPhone == ownerPhone) {
          let typeMatch = switch (g.groupType, gType) {
            case (#family, #family) true;
            case (#friends, #friends) true;
            case _ false;
          };
          if (typeMatch) { matchedGid := ?gid };
        };
      };
      switch (matchedGid) {
        case (?gid) {
          switch (groupsById.get(gid)) {
            case (?g) {
              let alreadyIn = g.memberPhones.find(func(p : Text) : Bool { p == memberPhone }) != null;
              if (not alreadyIn) {
                let updated = { g with memberPhones = g.memberPhones.concat([memberPhone]); groupName = surname };
                groupsById.add(gid, updated);
              };
            };
            case null {};
          };
        };
        case null {
          let grp : FamilyTypes.FamilyGroup = {
            id           = genGroupId();
            groupName    = surname;
            groupType    = gType;
            ownerPhone;
            memberPhones = [memberPhone];
            createdAt    = Time.now();
          };
          groupsById.add(grp.id, grp);
        };
      };
    };

    /// Check if a customer record already exists for a given phone.
    public func checkCustomerExists(phone : Text) : Bool {
      switch (userSvc.getUserByPhone(phone)) {
        case (#ok(_)) true;
        case (#err(_)) false;
      }
    };

    /// Send a family connect request (for existing customers — no new record creation).
    public func sendFamilyConnectRequest(
      fromPhone    : Text,
      toPhone      : Text,
      relationship : Text,
      groupName    : Text,
      address      : Text,
    ) : Types.Result<Text, Types.ApiError> {
      // Check for existing pending request
      for ((_, req) in connectReqs.entries()) {
        if (req.fromPhone == fromPhone and req.toPhone == toPhone and req.status == #pending) {
          return #err(#alreadyExists);
        };
      };
      let reqId = genRequestId();
      let req : Types.FamilyConnectRequest = {
        id           = reqId;
        fromPhone;
        toPhone;
        relationship;
        groupName;
        address;
        status       = #pending;
        createdAt    = Time.now();
      };
      connectReqs.add(reqId, req);
      #ok(reqId)
    };

    /// Respond to a connect request (accept or cancel).
    public func respondToConnectRequest(
      requestId : Text,
      accept    : Bool,
    ) : Types.Result<(), Types.ApiError> {
      switch (connectReqs.get(requestId)) {
        case null { #err(#notFound) };
        case (?req) {
          if (req.status != #pending) {
            return #err(#invalidInput("Request already processed"));
          };
          let newStatus : Types.FamilyConnectRequestStatus = if (accept) #accepted else #cancelled;
          let updated = { req with status = newStatus };
          connectReqs.add(requestId, updated);
          if (accept) {
            // Create the FamilyMember link
            let relEnum : FamilyTypes.Relationship = #relative; // default; caller can pass relationship as text
            let loc : Types.Location = { lat = 0.0; lng = 0.0; address = req.address };
            // Ensure user record exists for toPhone
            switch (userSvc.getUserByPhone(req.toPhone)) {
              case (#err(_)) {
                ignore userSvc.createUser(req.toPhone, req.toPhone, #customer, ?loc, ?req.address);
              };
              case (#ok(_)) {};
            };
            let member : FamilyTypes.FamilyMember = {
              id              = genId();
              ownerPhone      = req.fromPhone;
              ownerName       = req.fromPhone;
              ownerSurname    = req.groupName;
              relationship    = relEnum;
              relationName    = req.toPhone;
              relationPhone   = req.toPhone;
              relationAddress = req.address;
              inviteStatus    = #connected;
              createdAt       = Time.now();
              gender              = "";
              isMatrimonyEligible = false;
              caste               = null;
              occupation          = null;
              education           = null;
              locationPreference  = null;
              bloodGroup          = null;
              age                 = null;
            };
            putMember(member);
            upsertFamilyGroup(req.fromPhone, req.groupName, req.toPhone, #family);
          };
          #ok(())
        };
      }
    };

    /// Get pending connect requests for a given phone number.
    public func getFamilyConnectRequests(phone : Text) : [Types.FamilyConnectRequest] {
      let results = List.empty<Types.FamilyConnectRequest>();
      for ((_, req) in connectReqs.entries()) {
        if (req.toPhone == phone and req.status == #pending) {
          results.add(req);
        };
      };
      results.toArray()
    };

    /// Add a family member. If phone already exists as customer, send connect request instead.
    public func addFamilyMember(
      ownerPhone      : Text,
      ownerName       : Text,
      ownerSurname    : Text,
      relationship    : FamilyTypes.Relationship,
      relationName    : Text,
      relationPhone   : Text,
      relationAddress : Text,
      gender          : Text,
    ) : Types.Result<FamilyTypes.FamilyMember, Types.ApiError> {
      if (checkCustomerExists(relationPhone)) {
        // Existing customer — send a connect request instead of creating new record
        let relText = switch (relationship) {
          case (#father)   "father";
          case (#mother)   "mother";
          case (#son)      "son";
          case (#daughter) "daughter";
          case (#husband)  "husband";
          case (#wife)     "wife";
          case (#friend)   "friend";
          case (#brother)  "brother";
          case (#sister)   "sister";
          case (#relative) "relative";
        };
        ignore sendFamilyConnectRequest(ownerPhone, relationPhone, relText, ownerSurname, relationAddress);
      } else {
        // Create a new customer record for the relation person
        let loc : Types.Location = { lat = 0.0; lng = 0.0; address = relationAddress };
        ignore userSvc.createUser(relationPhone, relationName, #customer, ?loc, ?relationAddress);
      };

      let member : FamilyTypes.FamilyMember = {
        id              = genId();
        ownerPhone;
        ownerName;
        ownerSurname;
        relationship;
        relationName;
        relationPhone;
        relationAddress;
        inviteStatus    = #pending;
        createdAt       = Time.now();
        gender;
        isMatrimonyEligible = false;
        caste               = null;
        occupation          = null;
        education           = null;
        locationPreference  = null;
        bloodGroup          = null;
        age                 = null;
      };
      putMember(member);

      // Group type: friend relationship → friends group, else family group
      let gType : FamilyTypes.GroupType = switch (relationship) {
        case (#friend) #friends;
        case _ #family;
      };
      upsertFamilyGroup(ownerPhone, ownerSurname, relationPhone, gType);

      #ok(member)
    };

    public func getFamilyByOwner(ownerPhone : Text) : [FamilyTypes.FamilyMember] {
      let results = List.empty<FamilyTypes.FamilyMember>();
      for ((_, m) in familyById.entries()) {
        if (m.ownerPhone == ownerPhone) results.add(m);
      };
      results.toArray()
    };

    public func getAllFamilyMembers() : [FamilyTypes.FamilyMember] {
      let results = List.empty<FamilyTypes.FamilyMember>();
      for ((_, m) in familyById.entries()) { results.add(m) };
      results.toArray()
    };

    /// Get all family members belonging to a surname group.
    public func getFamilyBySurname(surname : Text) : [FamilyTypes.FamilyMember] {
      let surnLower = surname.toLower();
      let results = List.empty<FamilyTypes.FamilyMember>();
      for ((_, m) in familyById.entries()) {
        if (m.ownerSurname.toLower() == surnLower) results.add(m);
      };
      results.toArray()
    };

    /// Break a family/friend link between owner and relation.
    public func deleteFamilyLink(ownerPhone : Text, relationPhone : Text) : Types.Result<Text, Types.ApiError> {
      // Collect matching ids first
      let matchIds = List.empty<Text>();
      for ((id, m) in familyById.entries()) {
        if (m.ownerPhone == ownerPhone and m.relationPhone == relationPhone) {
          matchIds.add(id);
        };
      };
      // Update outside iteration
      for (id in matchIds.values()) {
        switch (familyById.get(id)) {
          case (?m) { familyById.add(id, { m with inviteStatus = #inactive }) };
          case null {};
        };
      };
      // Also remove from groups
      let groupIds = List.empty<Text>();
      for ((gid, g) in groupsById.entries()) {
        if (g.ownerPhone == ownerPhone) groupIds.add(gid);
      };
      for (gid in groupIds.values()) {
        switch (groupsById.get(gid)) {
          case (?g) {
            let newMembers = g.memberPhones.filter(func(p : Text) : Bool { p != relationPhone });
            groupsById.add(gid, { g with memberPhones = newMembers });
          };
          case null {};
        };
      };
      if (matchIds.size() > 0) #ok("Link deleted")
      else #err(#notFound)
    };

    /// Add a friend (creates a FamilyMember with #friend relationship).
    public func addFriend(
      ownerPhone  : Text,
      friendName  : Text,
      friendPhone : Text,
    ) : Types.Result<FamilyTypes.FamilyMember, Types.ApiError> {
      switch (userSvc.getUserByPhone(ownerPhone)) {
        case (#err(_)) return #err(#notFound);
        case (#ok(owner)) {
          addFamilyMember(
            ownerPhone,
            owner.name,
            "",   // no surname for friends group
            #friend,
            friendName,
            friendPhone,
            "",
            "",   // gender unknown for friends group
          )
        };
      }
    };

    /// Get all friends for an owner.
    public func getFriendsByOwner(ownerPhone : Text) : [FamilyTypes.FamilyMember] {
      let results = List.empty<FamilyTypes.FamilyMember>();
      for ((_, m) in familyById.entries()) {
        if (m.ownerPhone == ownerPhone) {
          switch (m.relationship) {
            case (#friend) {
              switch (m.inviteStatus) {
                case (#inactive) {};
                case _ results.add(m);
              };
            };
            case _ {};
          };
        };
      };
      results.toArray()
    };

    public func updateInviteStatus(id : Text, status : FamilyTypes.FamilyInviteStatus) : Types.Result<FamilyTypes.FamilyMember, Types.ApiError> {
      switch (familyById.get(id)) {
        case null #err(#notFound);
        case (?m) {
          let updated = { m with inviteStatus = status };
          putMember(updated);
          #ok(updated)
        };
      }
    };


    /// Update matrimony eligibility and profile fields for a family member.
    public func updateMatrimonyEligibility(
      memberId           : Text,
      eligible           : Bool,
      caste              : ?Text,
      occupation         : ?Text,
      education          : ?Text,
      locationPreference : ?Text,
      bloodGroup         : ?Text,
      age                : ?Nat,
    ) : Types.Result<FamilyTypes.FamilyMember, Types.ApiError> {
      switch (familyById.get(memberId)) {
        case null { #err(#notFound) };
        case (?m) {
          let updated = {
            m with
            isMatrimonyEligible = eligible;
            caste;
            occupation;
            education;
            locationPreference;
            bloodGroup;
            age;
          };
          putMember(updated);
          #ok(updated)
        };
      }
    };

    /// Return matrimony profiles (only eligible members), optionally filtered.
    public func getMatrimonyMembers(
      casteFilter    : ?Text,
      locationFilter : ?Text,
      educationFilter: ?Text,
      bloodGrpFilter : ?Text,
    ) : [FamilyTypes.MatrimonyProfile] {
      let results = List.empty<FamilyTypes.MatrimonyProfile>();
      for ((_, m) in familyById.entries()) {
        if (m.isMatrimonyEligible) {
          let casteOk = switch (casteFilter) {
            case null true;
            case (?c) switch (m.caste) { case (?mc) mc.toLower() == c.toLower(); case null false };
          };
          let locOk = switch (locationFilter) {
            case null true;
            case (?l) switch (m.locationPreference) { case (?ml) ml.toLower().contains(#text (l.toLower())); case null false };
          };
          let eduOk = switch (educationFilter) {
            case null true;
            case (?e) switch (m.education) { case (?me) me.toLower().contains(#text (e.toLower())); case null false };
          };
          let bgOk = switch (bloodGrpFilter) {
            case null true;
            case (?bg) switch (m.bloodGroup) { case (?mbg) mbg.toLower() == bg.toLower(); case null false };
          };
          if (casteOk and locOk and eduOk and bgOk) {
            let relText = switch (m.relationship) {
              case (#father)   "father";
              case (#mother)   "mother";
              case (#son)      "son";
              case (#daughter) "daughter";
              case (#husband)  "husband";
              case (#wife)     "wife";
              case (#friend)   "friend";
              case (#brother)  "brother";
              case (#sister)   "sister";
              case (#relative) "relative";
            };
            let profile : FamilyTypes.MatrimonyProfile = {
              memberId           = m.id;
              memberName         = m.relationName;
              gender             = m.gender;
              age                = m.age;
              caste              = m.caste;
              occupation         = m.occupation;
              education          = m.education;
              locationPreference = m.locationPreference;
              bloodGroup         = m.bloodGroup;
              ownerPhone         = m.ownerPhone;
              ownerRelationship  = relText;
            };
            results.add(profile);
          };
        };
      };
      results.toArray()
    };

    /// Returns true if the given ownerPhone has at least one matrimony-eligible member.
    public func hasMatrimonyEligibleMember(ownerPhone : Text) : Bool {
      for ((_, m) in familyById.entries()) {
        if (m.ownerPhone == ownerPhone and m.isMatrimonyEligible) return true;
      };
      false
    };

    public func deleteFamilyMember(id : Text) : Types.Result<Text, Types.ApiError> {
      switch (familyById.get(id)) {
        case null #err(#notFound);
        case (?_) {
          familyById.remove(id);
          #ok(id)
        };
      }
    };

    public func buildInviteMessage(ownerName : Text, ownerSurname : Text, ownerPhone : Text, relationName : Text) : Text {
      "Hi " # relationName # ", you were added by " # ownerName # " " # ownerSurname # " (" # ownerPhone # "). " #
      "Reply CONNECT to accept or CANCEL to decline."
    };

    /// Get all groups for an owner.
    public func getGroupsByOwner(ownerPhone : Text) : [FamilyTypes.FamilyGroup] {
      let results = List.empty<FamilyTypes.FamilyGroup>();
      for ((_, g) in groupsById.entries()) {
        if (g.ownerPhone == ownerPhone) results.add(g);
      };
      results.toArray()
    };

  }; // end class FamilyService
};
