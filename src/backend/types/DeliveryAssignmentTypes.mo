module {

  public type AssignedPartner = {
    partnerId : Text;
    name      : Text;
    phone     : Text;
    route     : Text;
  };

  public type DeliveryAssignment = {
    id             : Text;
    requesterId    : Text;
    requesterType  : Text; // "merchant" or "manufacturer"
    requestedCount : Nat;
    assignedPartners : [AssignedPartner];
    city           : Text;
    description    : Text;
    status         : Text; // "pending", "active", "completed"
    createdAt      : Int;
  };

};
