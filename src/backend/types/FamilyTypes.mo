module {

  // ── Family Member ──────────────────────────────────────────────────────────

  public type Relationship = {
    #father;
    #mother;
    #son;
    #daughter;
    #husband;
    #wife;
    #friend;
    #brother;
    #sister;
    #relative;
  };

  public type FamilyInviteStatus = {
    #pending;
    #connected;
    #cancelled;
    #inactive;
  };

  public type FamilyMember = {
    id              : Text;
    ownerPhone      : Text;
    ownerName       : Text;
    ownerSurname    : Text;
    relationship    : Relationship;
    relationName    : Text;
    relationPhone   : Text;
    relationAddress : Text;
    inviteStatus    : FamilyInviteStatus;
    createdAt       : Int;
    // ── Matrimony fields (optional, filled when isMatrimonyEligible = true) ─────
    gender              : Text;  // "Male" | "Female" | "Other" | ""
    // ── Matrimony fields (optional, filled when isMatrimonyEligible = true) ─────
    isMatrimonyEligible : Bool;
    caste               : ?Text;
    occupation          : ?Text;
    education           : ?Text;
    locationPreference  : ?Text;
    bloodGroup          : ?Text;
    age                 : ?Nat;
  };

  /// Public profile exposed in matrimony search results.
  public type MatrimonyProfile = {
    memberId          : Text;
    memberName        : Text;
    gender            : Text;
    age               : ?Nat;
    caste             : ?Text;
    occupation        : ?Text;
    education         : ?Text;
    locationPreference: ?Text;
    bloodGroup        : ?Text;
    ownerPhone        : Text;
    ownerRelationship : Text;
  };

  public type GroupType = { #family; #friends };

  public type FamilyGroup = {
    id           : Text;
    groupName    : Text;   // surname for family, custom for friends
    groupType    : GroupType;
    ownerPhone   : Text;
    memberPhones : [Text];
    createdAt    : Int;
  };

};
