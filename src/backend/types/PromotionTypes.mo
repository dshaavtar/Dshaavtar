module {

  // ── Promotion / Advertisement ──────────────────────────────────────────────

  public type PromotionReach = {
    #reach100;
    #reach200;
    #reach500;
    #reach1000;
    #reach2000;
  };

  public type PromotionStatus = {
    #pendingPayment;
    #pendingApproval;
    #approved;
    #rejected;
    #active;
    #completed;
  };

  public type Promotion = {
    id               : Text;
    advertiserPhone  : Text;
    title            : Text;
    reelLink         : Text;
    imageLink        : Text;
    locationArea     : Text;
    locationCity     : Text;
    locationCountry  : Text;
    subscriptionPlan : PromotionReach;
    status           : PromotionStatus;
    moderationFlags  : [Text];
    targetUserCount  : Nat;
    reachedCount     : Nat;
    viewedCount      : Nat;
    createdAt        : Int;
    expiresAt        : Int;
  };

  public type PromotionSubscriptionPlan = {
    id        : Text;
    name      : Text;
    userReach : Nat;
    price     : Float;
  };

  // ── Sarthi OTP Verification ───────────────────────────────────────────────

  public type SarthiOTPVerification = {
    id                : Text;
    bookingId         : Text;
    driverOTP         : Text;
    passengerOTP      : Text;
    driverVerified    : Bool;
    passengerVerified : Bool;
    createdAt         : Int;
  };

};
