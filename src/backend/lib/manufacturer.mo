import ManufacturerTypes "../types/ManufacturerTypes";
import Types "../Types";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {

  public class ManufacturerService(
    manufacturersById      : Map.Map<Text, ManufacturerTypes.Manufacturer>,
    manufacturersByUserId  : Map.Map<Text, ManufacturerTypes.Manufacturer>,
    distributorNetworkById : Map.Map<Text, ManufacturerTypes.DistributorNetwork>,
    mfgProductsById        : Map.Map<Text, ManufacturerTypes.ManufacturerProduct>,
    expiryReturnsById      : Map.Map<Text, ManufacturerTypes.ExpiryReturn>,
    complaintsById         : Map.Map<Text, ManufacturerTypes.ManufacturerComplaint>,
    ratingsById            : Map.Map<Text, ManufacturerTypes.ManufacturerRating>,
    idState                : { var nextMfgId : Nat },
  ) {

    // ── Helpers ─────────────────────────────────────────────────────────────

    func nextId(prefix : Text) : Text {
      let n = idState.nextMfgId;
      idState.nextMfgId += 1;
      prefix # n.toText()
    };

    public func generateDistributorCode() : Text {
      let n = idState.nextMfgId;
      idState.nextMfgId += 1;
      "DIST-" # n.toText()
    };

    public func generateB2bProductCode() : Text {
      let n = idState.nextMfgId;
      idState.nextMfgId += 1;
      "B2B-" # n.toText()
    };

    // ── Manufacturer Registration ────────────────────────────────────────────

    public func registerManufacturer(
      userId            : Text,
      businessName      : Text,
      customerCarePhone : Text,
      customerCareEmail : Text,
      productCategories : [Text],
      registeredCity    : Text,
    ) : { #ok : ManufacturerTypes.Manufacturer; #err : Text } {
      switch (manufacturersByUserId.get(userId)) {
        case (?_existing) {
          #err "Manufacturer already registered for this user"
        };
        case null {
          let now = Time.now();
          let id  = nextId("MFG-");
          let m : ManufacturerTypes.Manufacturer = {
            id;
            userId;
            businessName;
            customerCarePhone;
            customerCareEmail;
            productCategories;
            registeredCity;
            createdAt = now;
            updatedAt = now;
          };
          manufacturersById.add(id, m);
          manufacturersByUserId.add(userId, m);
          #ok m
        };
      }
    };

    public func getManufacturerByUser(userId : Text) : ?ManufacturerTypes.Manufacturer {
      manufacturersByUserId.get(userId)
    };

    public func getManufacturerById(id : Text) : ?ManufacturerTypes.Manufacturer {
      manufacturersById.get(id)
    };

    public func getAllManufacturers() : [ManufacturerTypes.Manufacturer] {
      manufacturersById.values().toArray()
    };

    // ── Manufacturer Products ────────────────────────────────────────────────

    public func addManufacturerProduct(
      manufacturerId     : Text,
      productName        : Text,
      batchNumber        : Text,
      hsnCode            : ?Text,
      batchCode          : ?Text,
      originCity         : Text,
      manufactureDate    : Int,
      expiryDate         : ?Text,
      priceToDistributor : Float,
      priceToCustomer    : Float,
      bulkPricingTiers   : [ManufacturerTypes.BulkPricingTier],
      isReturnable       : Bool,
      stockQty           : Nat,
    ) : { #ok : ManufacturerTypes.ManufacturerProduct; #err : Text } {
      switch (manufacturersById.get(manufacturerId)) {
        case null { #err "Manufacturer not found" };
        case (?_) {
          let now = Time.now();
          let id  = nextId("MFGP-");
          let b2bCode : ?Text = if (isReturnable) { ?generateB2bProductCode() } else { null };
          let p : ManufacturerTypes.ManufacturerProduct = {
            id;
            manufacturerId;
            productName;
            batchNumber;
            hsnCode;
            batchCode;
            b2bCode;
            originCity;
            manufactureDate;
            expiryDate;
            priceToDistributor;
            priceToCustomer;
            bulkPricingTiers;
            isReturnable;
            isDiscontinued = false;
            stockQty;
            createdAt = now;
          };
          mfgProductsById.add(id, p);
          #ok p
        };
      }
    };

    public func getManufacturerProducts(manufacturerId : Text) : [ManufacturerTypes.ManufacturerProduct] {
      mfgProductsById.values().filter(
        func(p : ManufacturerTypes.ManufacturerProduct) : Bool { p.manufacturerId == manufacturerId }
      ).toArray()
    };

    public func getAllManufacturerProducts() : [ManufacturerTypes.ManufacturerProduct] {
      mfgProductsById.values().toArray()
    };

    // ── Distributor Network ──────────────────────────────────────────────────

    public func addDistributorToNetwork(
      manufacturerId   : Text,
      distributorName  : Text,
      distributorPhone : Text,
      city             : Text,
      pincode          : Text,
      schemeApplicable : Text,
      marginPercent    : Float,
      routeDescription : Text,
    ) : { #ok : ManufacturerTypes.DistributorNetwork; #err : Text } {
      switch (manufacturersById.get(manufacturerId)) {
        case null { #err "Manufacturer not found" };
        case (?_) {
          let now = Time.now();
          let id              = nextId("DIST-NET-");
          let distributorCode = generateDistributorCode();
          let d : ManufacturerTypes.DistributorNetwork = {
            id;
            manufacturerId;
            distributorName;
            distributorPhone;
            distributorCode;
            city;
            pincode;
            schemeApplicable;
            marginPercent;
            marginEarned  = 0.0;
            totalOrders   = 0;
            status        = "active";
            routeDescription;
            assignedDeliveryPartnerPhone = null;
            assignedDeliveryPartnerName  = null;
            createdAt = now;
          };
          distributorNetworkById.add(id, d);
          #ok d
        };
      }
    };


    public func isDistributorRegistered(manufacturerId : Text, userPhone : Text) : Bool {
      switch (
        distributorNetworkById.values().find(
          func(d : ManufacturerTypes.DistributorNetwork) : Bool {
            d.manufacturerId == manufacturerId and d.distributorPhone == userPhone
          }
        )
      ) {
        case null  false;
        case (?_)  true;
      }
    };

    public func getProductsForDistributor(manufacturerId : Text) : [ManufacturerTypes.ManufacturerProduct] {
      mfgProductsById.values().filter(
        func(p : ManufacturerTypes.ManufacturerProduct) : Bool {
          p.manufacturerId == manufacturerId and not p.isDiscontinued
        }
      ).toArray()
    };

    // Returns all active (non-discontinued) products from any manufacturer
    // whose distributor network includes the given merchant phone number.
    public func getManufacturerProductsForMerchant(
      merchantPhone       : Text,
      distributorNetById  : Map.Map<Text, ManufacturerTypes.DistributorNetwork>,
    ) : { #ok : [ManufacturerTypes.ManufacturerProduct]; #err : Text } {
      // 1. Collect every manufacturerId for networks where distributorPhone == merchantPhone
      let networkManufacturerIds = distributorNetById.values().filter(
        func(d : ManufacturerTypes.DistributorNetwork) : Bool {
          d.distributorPhone == merchantPhone and d.status == "active"
        }
      ).map(
        func(d : ManufacturerTypes.DistributorNetwork) : Text { d.manufacturerId }
      ).toArray();
      if (networkManufacturerIds.size() == 0) {
        return #err "Merchant is not registered in any distributor network";
      };
      // 2. Build a fast lookup set from the array
      let idSet = Map.empty<Text, Bool>();
      for (mId in networkManufacturerIds.vals()) {
        idSet.add(mId, true);
      };
      // 3. Return all active products belonging to those manufacturers
      let products = mfgProductsById.values().filter(
        func(p : ManufacturerTypes.ManufacturerProduct) : Bool {
          not p.isDiscontinued and
          (switch (idSet.get(p.manufacturerId)) { case (?_) true; case null false })
        }
      ).toArray();
      #ok products
    };

    public func discontinueProduct(productId : Text, manufacturerId : Text) : { #ok; #err : Text } {
      switch (mfgProductsById.get(productId)) {
        case null { #err "Product not found" };
        case (?p) {
          if (p.manufacturerId != manufacturerId) {
            #err "Product does not belong to this manufacturer"
          } else {
            mfgProductsById.add(productId, { p with isDiscontinued = true });
            #ok
          }
        };
      }
    };

    public func validateMerchantForDistributor(phone : Text, merchantsById : Map.Map<Text, Types.Merchant>) : { #ok : Text; #err : Text } {
      switch (
        merchantsById.values().toArray().find(
          func(m : Types.Merchant) : Bool { m.phone == phone }
        )
      ) {
        case null  { #err "Phone number is not registered as a merchant" };
        case (?m)  { #ok (m.id) };
      }
    };

    public func addDeliveryPartnerToDistributor(distributorId : Text, phone : Text, name : Text, route : Text) : { #ok; #err : Text } {
      switch (distributorNetworkById.get(distributorId)) {
        case null { #err "Distributor not found" };
        case (?d) {
          distributorNetworkById.add(distributorId, {
            d with
            assignedDeliveryPartnerPhone = ?phone;
            assignedDeliveryPartnerName  = ?name;
            routeDescription             = route;
          });
          #ok
        };
      }
    };

    public func getManufacturerReviewsAndComplaints(manufacturerId : Text) : ManufacturerTypes.ManufacturerReviewsAndComplaints {
      {
        complaints = getManufacturerComplaints(manufacturerId);
        ratings    = getManufacturerRatings(manufacturerId);
      }
    };

    public func getDistributorNetwork(manufacturerId : Text) : [ManufacturerTypes.DistributorNetwork] {
      distributorNetworkById.values().filter(
        func(d : ManufacturerTypes.DistributorNetwork) : Bool { d.manufacturerId == manufacturerId }
      ).toArray()
    };

    public func getAllDistributors() : [ManufacturerTypes.DistributorNetwork] {
      distributorNetworkById.values().toArray()
    };

    // Update margin earned after a distributor order
    public func recordDistributorOrder(distributorId : Text, orderValue : Float) : Bool {
      switch (distributorNetworkById.get(distributorId)) {
        case null false;
        case (?d) {
          let marginEarned = d.marginEarned + (orderValue * d.marginPercent / 100.0);
          distributorNetworkById.add(distributorId, {
            d with
            marginEarned;
            totalOrders = d.totalOrders + 1;
          });
          true
        };
      }
    };

    // ── Expiry Returns ───────────────────────────────────────────────────────

    public func fileExpiryReturn(
      productId      : Text,
      manufacturerId : Text,
      returnedBy     : Text,
      returnedById   : Text,
      quantity       : Nat,
      reason         : Text,
    ) : ManufacturerTypes.ExpiryReturn {
      let now = Time.now();
      let id  = nextId("EXPRET-");
      let r : ManufacturerTypes.ExpiryReturn = {
        id;
        productId;
        manufacturerId;
        returnedBy;
        returnedById;
        quantity;
        reason;
        status    = #pending;
        createdAt = now;
      };
      expiryReturnsById.add(id, r);
      r
    };

    public func updateExpiryReturnStatus(id : Text, status : ManufacturerTypes.ExpiryReturnStatus) : Bool {
      switch (expiryReturnsById.get(id)) {
        case null false;
        case (?r) {
          expiryReturnsById.add(id, { r with status });
          true
        };
      }
    };

    public func getExpiryReturns(manufacturerId : Text) : [ManufacturerTypes.ExpiryReturn] {
      expiryReturnsById.values().filter(
        func(r : ManufacturerTypes.ExpiryReturn) : Bool { r.manufacturerId == manufacturerId }
      ).toArray()
    };

    public func getAllExpiryReturns() : [ManufacturerTypes.ExpiryReturn] {
      expiryReturnsById.values().toArray()
    };

    // ── Complaints ───────────────────────────────────────────────────────────

    public func fileManufacturerComplaint(
      manufacturerId : Text,
      filedBy        : Text,
      filedById      : Text,
      subject        : Text,
      description    : Text,
    ) : ManufacturerTypes.ManufacturerComplaint {
      let now = Time.now();
      let id  = nextId("COMP-");
      let c : ManufacturerTypes.ManufacturerComplaint = {
        id;
        manufacturerId;
        filedBy;
        filedById;
        subject;
        description;
        status    = #open;
        createdAt = now;
      };
      complaintsById.add(id, c);
      c
    };

    public func updateComplaintStatus(id : Text, status : ManufacturerTypes.ComplaintStatus) : Bool {
      switch (complaintsById.get(id)) {
        case null false;
        case (?c) {
          complaintsById.add(id, { c with status });
          true
        };
      }
    };

    public func getManufacturerComplaints(manufacturerId : Text) : [ManufacturerTypes.ManufacturerComplaint] {
      complaintsById.values().filter(
        func(c : ManufacturerTypes.ManufacturerComplaint) : Bool { c.manufacturerId == manufacturerId }
      ).toArray()
    };

    public func getAllComplaints() : [ManufacturerTypes.ManufacturerComplaint] {
      complaintsById.values().toArray()
    };

    // ── Ratings ──────────────────────────────────────────────────────────────

    public func rateManufacturerProduct(
      manufacturerId : Text,
      productId      : Text,
      ratedBy        : Text,
      rating         : Nat,
      review         : Text,
    ) : ManufacturerTypes.ManufacturerRating {
      let now = Time.now();
      let id  = nextId("RAT-");
      let r : ManufacturerTypes.ManufacturerRating = {
        id;
        manufacturerId;
        productId;
        ratedBy;
        rating;
        review;
        createdAt = now;
      };
      ratingsById.add(id, r);
      r
    };

    public func getManufacturerRatings(manufacturerId : Text) : [ManufacturerTypes.ManufacturerRating] {
      ratingsById.values().filter(
        func(r : ManufacturerTypes.ManufacturerRating) : Bool { r.manufacturerId == manufacturerId }
      ).toArray()
    };

    public func getAllRatings() : [ManufacturerTypes.ManufacturerRating] {
      ratingsById.values().toArray()
    };

    // ── Dashboard Stats ──────────────────────────────────────────────────────

    public func getManufacturerDashboardStats(manufacturerId : Text) : ManufacturerTypes.ManufacturerDashboardStats {
      let distributors = getDistributorNetwork(manufacturerId);
      let active = distributors.filter(func(d : ManufacturerTypes.DistributorNetwork) : Bool { d.status == "active" });
      let products   = getManufacturerProducts(manufacturerId);
      let returns    = getExpiryReturns(manufacturerId);
      let complaints = getManufacturerComplaints(manufacturerId);
      let ratings    = getManufacturerRatings(manufacturerId);

      let totalOrders = distributors.foldLeft(0, func(acc : Nat, d : ManufacturerTypes.DistributorNetwork) : Nat {
        acc + d.totalOrders
      });
      let totalMarginPaid = distributors.foldLeft(0.0, func(acc : Float, d : ManufacturerTypes.DistributorNetwork) : Float {
        acc + d.marginEarned
      });
      let pendingReturns = returns.filter(
        func(r : ManufacturerTypes.ExpiryReturn) : Bool { r.status == #pending }
      ).size();
      let openComplaints = complaints.filter(
        func(c : ManufacturerTypes.ManufacturerComplaint) : Bool { c.status == #open }
      ).size();
      let avgRating : Float = if (ratings.size() == 0) { 0.0 } else {
        let sum = ratings.foldLeft(0.0, func(acc : Float, r : ManufacturerTypes.ManufacturerRating) : Float {
          acc + r.rating.toFloat()
        });
        sum / ratings.size().toFloat()
      };

      {
        totalDistributors  = distributors.size();
        activeDistributors = active.size();
        totalProducts      = products.size();
        totalOrders;
        pendingReturns;
        openComplaints;
        avgRating;
        totalMarginPaid;
      }
    };

  };

};
