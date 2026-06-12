import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Order "mo:core/Order";

module {

  public class MerchantService(
    byId     : Map.Map<Text, Types.Merchant>,
    byUserId : Map.Map<Text, Types.Merchant>,
  ) {

  // ── Helpers ───────────────────────────────────────────────────────────────

  func putMerchant(m : Types.Merchant) {
    byId.add(m.id, m);
    byUserId.add(m.userId, m);
  };

  // ── Public API ────────────────────────────────────────────────────────────

  public func createMerchant(
    userId        : Text,
    phone         : Text,
    businessName  : Text,
    category      : Text,
    merchantType  : Types.MerchantType,
    location      : Types.Location,
    deliveryType  : Types.DeliveryType,
    deliveryRadius: Float,
  ) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byUserId.get(userId)) {
      case (?_) { #err(#alreadyExists) };
      case null {
        let emptyKyc : Types.KYCDocuments = {
          panNumber            = null;
          panImageUrl          = null;
          aadhaarNumber        = null;
          aadhaarImageUrl      = null;
          gstNumber            = null;
          gstImageUrl          = null;
          outletPhotoUrl       = null;
          cancelledChequeUrl   = null;
          personalQRUrl        = null;
          verificationStatus   = #pending;
        };
        let merchant : Types.Merchant = {
          id              = Utils.generateId("merchant");
          userId;
          phone;
          businessName;
          category;
          merchantType;
          bookingAllowed  = false;
          rentalAllowed   = false;
          location;
          deliveryType;
          deliveryRadius;
          branches        = [];
          menuProductIds  = [];
          kyc             = emptyKyc;
          codAvailable    = true;
          avgRating       = 0.0;
          ratingCount     = 0;
          isOndcEnrolled  = false;
          isActive        = true;
          isVerified      = false;
          rejectionReason = null;
          boostedOrderCount = 0;
          blockedUntil    = null;
          customerCount   = 0;
          orderCount      = 0;
        };
        putMerchant(merchant);
        #ok(merchant)
      };
    }
  };

  public func getMerchantById(id : Text) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(id)) {
      case (?m) { #ok(m) };
      case null  { #err(#notFound) };
    }
  };

  public func getMerchantsByCategory(category : Text) : [Types.Merchant] {
    let all = List.fromIter<Types.Merchant>(byId.values());
    all.filter(func(m : Types.Merchant) : Bool { m.category == category }).toArray()
  };

  public func getMerchantsNearby(lat : Float, lng : Float, radiusKm : Float) : [Types.Merchant] {
    let all = List.fromIter<Types.Merchant>(byId.values());
    all.filter(func(m : Types.Merchant) : Bool {
      m.isActive and
      Utils.haversineDistance(m.location.lat, m.location.lng, lat, lng) <= radiusKm
    }).toArray()
  };

  public func updateMerchantKYC(id : Text, kyc : Types.KYCDocuments) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?m) {
        let updated = { m with kyc };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  public func addBranch(merchantId : Text, branch : Types.Branch) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        let newBranches = List.fromArray<Types.Branch>(m.branches);
        newBranches.add(branch);
        let updated = { m with branches = newBranches.toArray() };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  public func updateMenu(merchantId : Text, productIds : [Text]) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        let updated = { m with menuProductIds = productIds };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  public func listMerchants(isActive : ?Bool, isVerified : ?Bool) : [Types.Merchant] {
    let all = List.fromIter<Types.Merchant>(byId.values());
    let filtered = all.filter(func(m : Types.Merchant) : Bool {
      let activeOk = switch (isActive) {
        case null    { true };
        case (?flag) { m.isActive == flag };
      };
      let verifiedOk = switch (isVerified) {
        case null    { true };
        case (?flag) { m.isVerified == flag };
      };
      activeOk and verifiedOk
    });
    // Sort by customerCount DESC, then orderCount DESC
    let sorted = filtered.sort(func(a : Types.Merchant, b : Types.Merchant) : Order.Order {
      if (a.customerCount > b.customerCount) { #less }
      else if (a.customerCount < b.customerCount) { #greater }
      else if (a.orderCount > b.orderCount) { #less }
      else if (a.orderCount < b.orderCount) { #greater }
      else { #equal }
    });
    sorted.toArray()
  };

  public func updateMerchantStatus(id : Text, isActive : Bool, isVerified : Bool) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?m) {
        let updated = { m with isActive; isVerified };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  /// Return all merchants with status 'pending' (not yet verified or rejected).
  public func getPendingMerchants() : [Types.Merchant] {
    let all = List.fromIter<Types.Merchant>(byId.values());
    all.filter(func(m : Types.Merchant) : Bool {
      not m.isVerified and m.kyc.verificationStatus == #pending
    }).toArray()
  };

  /// Verify or reject a merchant.
  /// When isApproved=true: checks KYC doc numbers; pass forceApprove=true to bypass doc check (admin override).
  public func verifyMerchant(merchantId : Text, isApproved : Bool, reason : Text) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        if (isApproved) {
          let newKyc = { m.kyc with verificationStatus = #verified };
          let updated = { m with kyc = newKyc; isVerified = true; isActive = true; rejectionReason = null };
          putMerchant(updated);
          #ok(updated)
        } else {
          let newKyc = { m.kyc with verificationStatus = #rejected };
          let updated = { m with kyc = newKyc; isVerified = false; rejectionReason = if (reason == "") null else ?reason };
          putMerchant(updated);
          #ok(updated)
        }
      };
    }
  };

  /// Update KYC documents for a merchant.
  public func updateMerchantKYCDocuments(
    merchantId     : Text,
    panNo          : Text,
    panUrl         : Text,
    aadhaarNo      : Text,
    aadhaarUrl     : Text,
    gstNo          : Text,
    gstUrl         : Text,
    outletPhotoUrl : Text,
    chequeUrl      : Text,
    qrUrl          : Text,
  ) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        let newKyc : Types.KYCDocuments = {
          panNumber            = if (panNo == "") null else ?panNo;
          panImageUrl          = if (panUrl == "") null else ?panUrl;
          aadhaarNumber        = if (aadhaarNo == "") null else ?aadhaarNo;
          aadhaarImageUrl      = if (aadhaarUrl == "") null else ?aadhaarUrl;
          gstNumber            = if (gstNo == "") null else ?gstNo;
          gstImageUrl          = if (gstUrl == "") null else ?gstUrl;
          outletPhotoUrl       = if (outletPhotoUrl == "") null else ?outletPhotoUrl;
          cancelledChequeUrl   = if (chequeUrl == "") null else ?chequeUrl;
          personalQRUrl        = if (qrUrl == "") null else ?qrUrl;
          verificationStatus   = m.kyc.verificationStatus;
        };
        let updated = { m with kyc = newKyc };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  public func getMerchantByUserId(userId : Text) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byUserId.get(userId)) {
      case (?m) { #ok(m) };
      case null  { #err(#notFound) };
    }
  };

  public func addRating(merchantId : Text, rating : Float) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        let newCount  = m.ratingCount + 1;
        let newAvg    = (m.avgRating * m.ratingCount.toFloat() + rating) / newCount.toFloat();
        // Block for 24 hours if average drops below 3.0
        let blockUntil : ?Int = if (newAvg < 3.0) {
          ?(Time.now() + 86_400_000_000_000)
        } else { m.blockedUntil };
        let updated   = { m with avgRating = newAvg; ratingCount = newCount; blockedUntil = blockUntil };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  /// Check if a merchant is currently blocked.
  public func isMerchantBlocked(merchantId : Text) : Bool {
    switch (byId.get(merchantId)) {
      case null { false };
      case (?m) {
        switch (m.blockedUntil) {
          case null { false };
          case (?until) { Time.now() < until };
        }
      };
    }
  };

  /// Admin manual unblock for a merchant.
  public func unblockMerchant(merchantId : Text) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        let updated = { m with blockedUntil = null };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  /// Set ONDC enrollment flag for a merchant.
  public func setOndcEnrollment(merchantId : Text, enrolled : Bool) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        let updated = { m with isOndcEnrolled = enrolled };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  /// Set admin-boosted order count to inflate displayed sales figure.
  public func setBoostedOrderCount(merchantId : Text, count : Nat) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        let updated = { m with boostedOrderCount = count };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  /// Get display total orders: boostedOrderCount if set, else real completed orders count.
  /// Pass in real completed count from OrderService.
  public func getDisplayTotalOrders(merchantId : Text, realCompleted : Nat) : Nat {
    switch (byId.get(merchantId)) {
      case null { realCompleted };
      case (?m) {
        if (m.boostedOrderCount > 0) m.boostedOrderCount else realCompleted
      };
    }
  };

  /// Set merchant online/offline status.
  public func setOnlineStatus(merchantId : Text, isOnline : Bool) : Types.Result<Types.Merchant, Types.ApiError> {
    switch (byId.get(merchantId)) {
      case null { #err(#notFound) };
      case (?m) {
        let updated = { m with isActive = isOnline };
        putMerchant(updated);
        #ok(updated)
      };
    }
  };

  /// Increment the order count for a merchant (called when an order is completed).
  public func incrementOrderCount(merchantId : Text) : () {
    switch (byId.get(merchantId)) {
      case null {};
      case (?m) {
        let updated = { m with orderCount = m.orderCount + 1 };
        putMerchant(updated);
      };
    }
  };

  /// Increment the customer count for a merchant (called when a new unique customer orders).
  public func incrementCustomerCount(merchantId : Text) : () {
    switch (byId.get(merchantId)) {
      case null {};
      case (?m) {
        let updated = { m with customerCount = m.customerCount + 1 };
        putMerchant(updated);
      };
    }
  };

  }; // end class MerchantService
};
