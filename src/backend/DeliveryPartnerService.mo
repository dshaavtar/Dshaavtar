import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Debug "mo:core/Debug";
import POSTypes "types/POSTypes";
import Iter "mo:core/Iter";

module {

  public class DeliveryPartnerService(
    byId       : Map.Map<Text, Types.DeliveryPartner>,
    byUserId   : Map.Map<Text, Types.DeliveryPartner>,
    shiftsStore : Map.Map<Text, POSTypes.DeliveryPartnerShift>,
  ) {

  // ── Helpers ───────────────────────────────────────────────────────────────

  func putDP(dp : Types.DeliveryPartner) {
    byId.add(dp.id, dp);
    byUserId.add(dp.userId, dp);
  };

  // ── Public API ────────────────────────────────────────────────────────────

  public func registerDeliveryPartner(
    userId         : Text,
    phone          : Text,
    name           : Text,
    vehicleType    : Types.VehicleType,
    serviceType    : Types.ServiceType,
    ratePerKm      : Float,
    aadhaarNo      : Text,
    rcBook         : Text,
    panNo          : Text,
    otherPlatforms : [Text],
  ) : Types.Result<Types.DeliveryPartner, Types.ApiError> {
    switch (byUserId.get(userId)) {
      case (?_) { #err(#alreadyExists) };
      case null {
        // Auto-reject if any required doc is missing
        let kycStatus : Types.KYCStatus = if (
          aadhaarNo == "" or rcBook == "" or panNo == ""
        ) #rejected else #pending;

        let dp : Types.DeliveryPartner = {
          id              = Utils.generateId("dp");
          userId;
          phone;
          name;
          vehicleType;
          serviceType;
          ratePerKm;
          otherPlatforms;
          selfieUrl       = null;
          aadhaarUrl      = null;
          panUrl          = null;
          rcUrl           = null;
          avgRating       = 0.0;
          ratingCount     = 0;
          isOnline        = false;
          currentLocation = null;
          isOndcEnrolled  = false;
          isVerified      = false;
          kycStatus;
          aadhaarNo;
          rcBook;
          panNo;
          rejectionReason = null;
          blockedUntil    = null;
        };
        putDP(dp);
        #ok(dp)
      };
    }
  };

  public func getDeliveryPartnerById(id : Text) : Types.Result<Types.DeliveryPartner, Types.ApiError> {
    switch (byId.get(id)) {
      case (?dp) { #ok(dp) };
      case null   { #err(#notFound) };
    }
  };

  public func getDeliveryPartnerByUserId(userId : Text) : Types.Result<Types.DeliveryPartner, Types.ApiError> {
    switch (byUserId.get(userId)) {
      case (?dp) { #ok(dp) };
      case null   { #err(#notFound) };
    }
  };

  public func updateOnlineStatus(id : Text, isOnline : Bool, location : ?Types.Location) : Types.Result<Types.DeliveryPartner, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?dp) {
        let updated = { dp with isOnline; currentLocation = location };
        putDP(updated);
        #ok(updated)
      };
    }
  };

  public func getAvailableDeliveryPartners(lat : Float, lng : Float, radiusKm : Float) : [Types.DeliveryPartner] {
    let all = List.fromIter<Types.DeliveryPartner>(byId.values());
    all.filter(func(dp : Types.DeliveryPartner) : Bool {
      if (not dp.isOnline) { return false };
      switch (dp.serviceType) {
        case (#sarthi) { return false }; // only delivery partners
        case _ {};
      };
      switch (dp.currentLocation) {
        case null { false };
        case (?loc) {
          Utils.haversineDistance(loc.lat, loc.lng, lat, lng) <= radiusKm
        };
      }
    }).toArray()
  };

  public func getAvailableSarthiPartners(lat : Float, lng : Float, radiusKm : Float) : [Types.DeliveryPartner] {
    let all = List.fromIter<Types.DeliveryPartner>(byId.values());
    all.filter(func(dp : Types.DeliveryPartner) : Bool {
      if (not dp.isOnline) { return false };
      switch (dp.serviceType) {
        case (#sarthi) {};
        case _ { return false };
      };
      switch (dp.currentLocation) {
        case null { false };
        case (?loc) {
          Utils.haversineDistance(loc.lat, loc.lng, lat, lng) <= radiusKm
        };
      }
    }).toArray()
  };

  public func updateDeliveryPartnerRating(id : Text, rating : Float) : Types.Result<Types.DeliveryPartner, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?dp) {
        let newCount = dp.ratingCount + 1;
        let newAvg   = (dp.avgRating * dp.ratingCount.toFloat() + rating) / newCount.toFloat();
        // Block for 24 hours if average drops below 3.0
        let blockUntil : ?Int = if (newAvg < 3.0) {
          ?(Time.now() + 86_400_000_000_000)
        } else { dp.blockedUntil };
        let updated  = { dp with avgRating = newAvg; ratingCount = newCount; blockedUntil = blockUntil };
        putDP(updated);
        #ok(updated)
      };
    }
  };

  /// Check if a delivery partner is currently blocked.
  public func isDeliveryPartnerBlocked(dpId : Text) : Bool {
    switch (byId.get(dpId)) {
      case null { false };
      case (?dp) {
        switch (dp.blockedUntil) {
          case null { false };
          case (?until) { Time.now() < until };
        }
      };
    }
  };

  /// Admin manual unblock for a delivery partner.
  public func unblockDeliveryPartner(dpId : Text) : Types.Result<Types.DeliveryPartner, Types.ApiError> {
    switch (byId.get(dpId)) {
      case null { #err(#notFound) };
      case (?dp) {
        let updated = { dp with blockedUntil = null };
        putDP(updated);
        #ok(updated)
      };
    }
  };

  /// Verify or reject a delivery partner / sarthi. Checks required docs before approving.
  public func verifyDeliveryPartner(dpId : Text, isApproved : Bool, reason : Text) : Types.Result<Types.DeliveryPartner, Types.ApiError> {
    switch (byId.get(dpId)) {
      case null { #err(#notFound) };
      case (?dp) {
        if (isApproved) {
          if (dp.aadhaarNo == "" or dp.rcBook == "" or dp.panNo == "") {
            return #err(#invalidInput("Documents incomplete: Aadhaar, RC Book, and PAN are required"));
          };
          let updated = { dp with isVerified = true; kycStatus = #approved; rejectionReason = null };
          putDP(updated);
          #ok(updated)
        } else {
          let updated = { dp with isVerified = false; kycStatus = #rejected; rejectionReason = if (reason == "") null else ?reason };
          putDP(updated);
          #ok(updated)
        }
      };
    }
  };

  /// Update KYC documents for a delivery partner.
  public func updateDeliveryPartnerKYC(dpId : Text, aadhaarNo : Text, rcBook : Text, panNo : Text) : Types.Result<Types.DeliveryPartner, Types.ApiError> {
    switch (byId.get(dpId)) {
      case null { #err(#notFound) };
      case (?dp) {
        let kycStatus : Types.KYCStatus = if (aadhaarNo == "" or rcBook == "" or panNo == "") #rejected else #pending;
        let updated = { dp with aadhaarNo; rcBook; panNo; kycStatus };
        putDP(updated);
        #ok(updated)
      };
    }
  };

  public func listDeliveryPartners(isVerified : ?Bool) : [Types.DeliveryPartner] {
    let all = List.fromIter<Types.DeliveryPartner>(byId.values());
    switch (isVerified) {
      case null     { all.toArray() };
      case (?flag)  {
        all.filter(func(dp : Types.DeliveryPartner) : Bool { dp.isVerified == flag }).toArray()
      };
    }
  };

  /// Get active delivery (in-progress order) for a delivery partner.
  public func getActiveDelivery(orders : Map.Map<Text, Types.Order>, partnerId : Text) : ?Types.Order {
    let activeStatuses : [Types.OrderStatus] = [#assigned, #inTransit, #delivered];
    for ((_, o) in orders.entries()) {
      switch (o.deliveryPartnerId) {
        case (?dpId) {
          if (dpId == partnerId) {
            let isActive = activeStatuses.find(func(s : Types.OrderStatus) : Bool { o.status == s }) != null;
            if (isActive) return ?o;
          }
        };
        case null {};
      }
    };
    null
  };

  /// Calculate total earnings for a delivery partner from completed orders.
  public func getPartnerEarnings(orders : Map.Map<Text, Types.Order>, partnerId : Text) : Types.EarningsSummary {
    let now = Time.now();
    let oneDayNs : Int  = 86_400_000_000_000;
    let oneMonthNs : Int = 30 * oneDayNs;
    var totalEarnings  = 0.0;
    var dailyEarnings  = 0.0;
    var monthlyEarnings = 0.0;
    var completedTrips = 0;

    for ((_, o) in orders.entries()) {
      switch (o.deliveryPartnerId) {
        case (?dpId) {
          if (dpId == partnerId and o.status == #completed) {
            let charge = o.deliveryCharge + o.surgeCharge;
            // Use at least the vendor settlement amount if delivery charge is 0
            let earned = if (charge > 0.0) charge else o.vendorSettlementAmount.toFloat() * 0.1;
            totalEarnings += earned;
            completedTrips += 1;
            switch (o.completedAt) {
              case (?completedAt) {
                if (now - completedAt <= oneDayNs)   dailyEarnings   += earned;
                if (now - completedAt <= oneMonthNs) monthlyEarnings += earned;
              };
              case null {};
            };
          }
        };
        case null {};
      }
    };
    {
      totalEarnings;
      dailyEarnings;
      monthlyEarnings;
      completedTrips;
    }
  };

    // ── Shift Check-in / Check-out ────────────────────────────────────────

    public func startDeliveryShift(partnerId : Text) : POSTypes.DeliveryPartnerShift {
      let now = Time.now();
      let id  = "shift-" # partnerId # "-" # now.toText();
      let shift : POSTypes.DeliveryPartnerShift = {
        id;
        partnerId;
        checkInTime         = now;
        checkOutTime        = null;
        status              = #active;
        ordersCompleted     = 0;
        earningsDuringShift = 0.0;
      };
      shiftsStore.add(id, shift);
      shift
    };

    public func endDeliveryShift(shiftId : Text) : Bool {
      switch (shiftsStore.get(shiftId)) {
        case null false;
        case (?shift) {
          let now = Time.now();
          let updated : POSTypes.DeliveryPartnerShift = {
            shift with
            checkOutTime = ?now;
            status       = #completed;
          };
          shiftsStore.add(shiftId, updated);
          true
        };
      }
    };

    public func getShiftHistory(partnerId : Text) : [POSTypes.DeliveryPartnerShift] {
      let result = List.empty<POSTypes.DeliveryPartnerShift>();
      for ((_, shift) in shiftsStore.entries()) {
        if (shift.partnerId == partnerId) result.add(shift);
      };
      result.toArray()
    };

    public func getCurrentShift(partnerId : Text) : ?POSTypes.DeliveryPartnerShift {
      for ((_, shift) in shiftsStore.entries()) {
        if (shift.partnerId == partnerId) {
          switch (shift.status) {
            case (#active) return ?shift;
            case (_) {};
          };
        };
      };
      null
    };


  public func listAll() : [Types.DeliveryPartner] {
    byId.values().toArray()
  };

  public func getByPhone(phone : Text) : ?Types.DeliveryPartner {
    var found : ?Types.DeliveryPartner = null;
    for (dp in byId.values()) {
      if (dp.phone == phone) { found := ?dp };
    };
    found
  };

  }; // end class DeliveryPartnerService
};
