import ManufacturerTypes "../types/ManufacturerTypes";
import ManufacturerLib "../lib/manufacturer";
import Map "mo:core/Map";
import Types "../Types";

mixin (
  manufacturersById      : Map.Map<Text, ManufacturerTypes.Manufacturer>,
  manufacturersByUserId  : Map.Map<Text, ManufacturerTypes.Manufacturer>,
  distributorNetworkById : Map.Map<Text, ManufacturerTypes.DistributorNetwork>,
  mfgProductsById        : Map.Map<Text, ManufacturerTypes.ManufacturerProduct>,
  expiryReturnsById      : Map.Map<Text, ManufacturerTypes.ExpiryReturn>,
  complaintsById         : Map.Map<Text, ManufacturerTypes.ManufacturerComplaint>,
  ratingsById            : Map.Map<Text, ManufacturerTypes.ManufacturerRating>,
  mfgIdState             : { var nextMfgId : Nat },
  merchantsByIdNew       : Map.Map<Text, Types.Merchant>,
) {

  transient let mfgSvc = ManufacturerLib.ManufacturerService(
    manufacturersById,
    manufacturersByUserId,
    distributorNetworkById,
    mfgProductsById,
    expiryReturnsById,
    complaintsById,
    ratingsById,
    mfgIdState,
  );

  // ── Manufacturer Registration ─────────────────────────────────────────────

  public shared func registerManufacturer(
    userId            : Text,
    businessName      : Text,
    customerCarePhone : Text,
    customerCareEmail : Text,
    productCategories : [Text],
    registeredCity    : Text,
  ) : async { #ok : ManufacturerTypes.Manufacturer; #err : { errorDetail : Text } } {
    switch (mfgSvc.registerManufacturer(
      userId, businessName, customerCarePhone,
      customerCareEmail, productCategories, registeredCity,
    )) {
      case (#ok m)  { #ok m };
      case (#err e) { #err { errorDetail = e } };
    }
  };

  public query func getManufacturerByUser(userId : Text) : async ?ManufacturerTypes.Manufacturer {
    mfgSvc.getManufacturerByUser(userId)
  };

  public query func getManufacturerById(mfgId : Text) : async ?ManufacturerTypes.Manufacturer {
    mfgSvc.getManufacturerById(mfgId)
  };

  public query func getAllManufacturers() : async [ManufacturerTypes.Manufacturer] {
    mfgSvc.getAllManufacturers()
  };

  // ── Manufacturer Products ─────────────────────────────────────────────────

  public shared func addManufacturerProduct(
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
  ) : async { #ok : ManufacturerTypes.ManufacturerProduct; #err : { errorDetail : Text } } {
    switch (mfgSvc.addManufacturerProduct(
      manufacturerId, productName, batchNumber, hsnCode, batchCode,
      originCity, manufactureDate, expiryDate,
      priceToDistributor, priceToCustomer, bulkPricingTiers, isReturnable, stockQty,
    )) {
      case (#ok p)  { #ok p };
      case (#err e) { #err { errorDetail = e } };
    }
  };

  public query func getManufacturerProducts(manufacturerId : Text) : async [ManufacturerTypes.ManufacturerProduct] {
    mfgSvc.getManufacturerProducts(manufacturerId)
  };

  public query func getAllManufacturerProducts() : async [ManufacturerTypes.ManufacturerProduct] {
    mfgSvc.getAllManufacturerProducts()
  };

  // ── Distributor Network ───────────────────────────────────────────────────

  public shared func addDistributorToNetwork(
    manufacturerId   : Text,
    distributorName  : Text,
    distributorPhone : Text,
    city             : Text,
    pincode          : Text,
    schemeApplicable : Text,
    marginPercent    : Float,
    routeDescription : Text,
  ) : async { #ok : ManufacturerTypes.DistributorNetwork; #err : { errorDetail : Text } } {
    switch (mfgSvc.addDistributorToNetwork(
      manufacturerId, distributorName, distributorPhone,
      city, pincode, schemeApplicable, marginPercent, routeDescription,
    )) {
      case (#ok d)  { #ok d };
      case (#err e) { #err { errorDetail = e } };
    }
  };


  public query func isDistributorRegistered(manufacturerId : Text, userPhone : Text) : async Bool {
    mfgSvc.isDistributorRegistered(manufacturerId, userPhone)
  };

  public query func getProductsForDistributor(manufacturerId : Text) : async [ManufacturerTypes.ManufacturerProduct] {
    mfgSvc.getProductsForDistributor(manufacturerId)
  };

  public shared func discontinueProduct(productId : Text, manufacturerId : Text) : async { #ok; #err : { errorDetail : Text } } {
    switch (mfgSvc.discontinueProduct(productId, manufacturerId)) {
      case (#ok)    { #ok };
      case (#err e) { #err { errorDetail = e } };
    }
  };

  public shared func validateMerchantForDistributor(phone : Text) : async { #ok : Text; #err : { errorDetail : Text } } {
    switch (mfgSvc.validateMerchantForDistributor(phone, merchantsByIdNew)) {
      case (#ok t)  { #ok t };
      case (#err e) { #err { errorDetail = e } };
    }
  };

  public shared func addDeliveryPartnerToDistributor(distributorId : Text, phone : Text, name : Text, route : Text) : async { #ok; #err : { errorDetail : Text } } {
    switch (mfgSvc.addDeliveryPartnerToDistributor(distributorId, phone, name, route)) {
      case (#ok)    { #ok };
      case (#err e) { #err { errorDetail = e } };
    }
  };

  public query func getManufacturerReviewsAndComplaints(manufacturerId : Text) : async ManufacturerTypes.ManufacturerReviewsAndComplaints {
    mfgSvc.getManufacturerReviewsAndComplaints(manufacturerId)
  };

  public query func getDistributorNetwork(manufacturerId : Text) : async [ManufacturerTypes.DistributorNetwork] {
    mfgSvc.getDistributorNetwork(manufacturerId)
  };

  public query func getAllDistributors() : async [ManufacturerTypes.DistributorNetwork] {
    mfgSvc.getAllDistributors()
  };

  public shared func recordDistributorOrder(distributorId : Text, orderValue : Float) : async Bool {
    mfgSvc.recordDistributorOrder(distributorId, orderValue)
  };

  // ── Canary ────────────────────────────────────────────────────────────────

  public query func getManufacturerVersion() : async Text { "1.0" };

  // ── Merchant product browse ───────────────────────────────────────────────

  public query func getManufacturerProductsForMerchant(
    merchantPhone : Text,
  ) : async { #ok : [ManufacturerTypes.ManufacturerProduct]; #err : Text } {
    mfgSvc.getManufacturerProductsForMerchant(merchantPhone, distributorNetworkById)
  };

  // ── Expiry Returns ────────────────────────────────────────────────────────

  public shared func fileExpiryReturn(
    productId      : Text,
    manufacturerId : Text,
    returnedBy     : Text,
    returnedById   : Text,
    quantity       : Nat,
    reason         : Text,
  ) : async { #ok : ManufacturerTypes.ExpiryReturn; #err : { errorDetail : Text } } {
    #ok (mfgSvc.fileExpiryReturn(
      productId, manufacturerId, returnedBy, returnedById, quantity, reason,
    ))
  };

  public shared func approveExpiryReturn(id : Text) : async { #ok; #err : { errorDetail : Text } } {
    if (mfgSvc.updateExpiryReturnStatus(id, #approved)) { #ok } else { #err { errorDetail = "Return not found" } }
  };

  public shared func rejectExpiryReturn(id : Text) : async { #ok; #err : { errorDetail : Text } } {
    if (mfgSvc.updateExpiryReturnStatus(id, #rejected)) { #ok } else { #err { errorDetail = "Return not found" } }
  };

  public query func getExpiryReturns(manufacturerId : Text) : async [ManufacturerTypes.ExpiryReturn] {
    mfgSvc.getExpiryReturns(manufacturerId)
  };

  public query func getAllExpiryReturns() : async [ManufacturerTypes.ExpiryReturn] {
    mfgSvc.getAllExpiryReturns()
  };

  // ── Complaints ────────────────────────────────────────────────────────────

  public shared func fileManufacturerComplaint(
    mfgId       : Text,
    filedBy     : Text,
    filedById   : Text,
    subject     : Text,
    description : Text,
  ) : async { #ok : ManufacturerTypes.ManufacturerComplaint; #err : { errorDetail : Text } } {
    #ok (mfgSvc.fileManufacturerComplaint(
      mfgId, filedBy, filedById, subject, description,
    ))
  };

  public shared func resolveComplaint(id : Text) : async { #ok; #err : { errorDetail : Text } } {
    if (mfgSvc.updateComplaintStatus(id, #resolved)) { #ok } else { #err { errorDetail = "Complaint not found" } }
  };

  public shared func progressComplaint(id : Text) : async { #ok; #err : { errorDetail : Text } } {
    if (mfgSvc.updateComplaintStatus(id, #in_progress)) { #ok } else { #err { errorDetail = "Complaint not found" } }
  };

  public query func getManufacturerComplaints(mfgId : Text) : async [ManufacturerTypes.ManufacturerComplaint] {
    mfgSvc.getManufacturerComplaints(mfgId)
  };

  public query func getAllManufacturerComplaints() : async [ManufacturerTypes.ManufacturerComplaint] {
    mfgSvc.getAllComplaints()
  };

  // ── Ratings ───────────────────────────────────────────────────────────────

  public shared func rateManufacturerProduct(
    manufacturerId : Text,
    productId      : Text,
    ratedBy        : Text,
    rating         : Nat,
    review         : Text,
  ) : async { #ok : ManufacturerTypes.ManufacturerRating; #err : { errorDetail : Text } } {
    #ok (mfgSvc.rateManufacturerProduct(
      manufacturerId, productId, ratedBy, rating, review,
    ))
  };

  public query func getManufacturerRatings(manufacturerId : Text) : async [ManufacturerTypes.ManufacturerRating] {
    mfgSvc.getManufacturerRatings(manufacturerId)
  };

  public query func getAllManufacturerRatings() : async [ManufacturerTypes.ManufacturerRating] {
    mfgSvc.getAllRatings()
  };

  // ── Dashboard Stats ───────────────────────────────────────────────────────

  public query func getManufacturerDashboardStats(manufacturerId : Text) : async ManufacturerTypes.ManufacturerDashboardStats {
    mfgSvc.getManufacturerDashboardStats(manufacturerId)
  };

};
