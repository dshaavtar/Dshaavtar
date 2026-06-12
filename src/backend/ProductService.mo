import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

module {

  public class ProductService(byId : Map.Map<Text, Types.Product>) {

  // ── Helpers ───────────────────────────────────────────────────────────────

  func putProduct(p : Types.Product) {
    byId.add(p.id, p);
  };

  // ── Public API ────────────────────────────────────────────────────────────

  /// Add a single product.
  /// Merchant only needs to be registered (not necessarily verified) to add products.
  public func addProduct(
    merchantId      : Text,
    title           : Text,
    imageUrls       : [Text],
    videoUrl        : ?Text,
    description     : Text,
    isNew           : Bool,
    baseRate        : Float,
    bulkRates       : [Types.BulkRate],
    specialDiscount : Float,
    qty             : Nat,
    packing         : Text,
    expiry          : Text,
  ) : Types.Result<Types.Product, Types.ApiError> {
    let product : Types.Product = {
      id              = Utils.generateId("product");
      merchantId;
      title;
      imageUrls;
      videoUrl;
      description;
      isNew;
      baseRate;
      bulkRates;
      specialDiscount;
      isActive        = true;
      qty;
      packing;
      expiry;
      barcodeValue    = null;
    };
    putProduct(product);
    #ok(product)
  };

  /// Batch-insert products parsed from Excel or photo menu.
  /// Does NOT require merchant to be fully verified — just registered.
  public func addProductsBulk(
    merchantId    : Text,
    products      : [Types.ProductInput],
    _merchantVerified : Bool,   // kept for API compat but no longer enforced
  ) : Types.Result<[Types.Product], Types.ApiError> {
    let created = List.empty<Types.Product>();
    for (input in products.vals()) {
      let urls : [Text] = if (input.imageUrls.size() > 0) {
        input.imageUrls
      } else if (input.imageUrl != "") {
        [input.imageUrl]
      } else {
        []
      };
      let p : Types.Product = {
        id              = Utils.generateId("product");
        merchantId;
        title           = input.title;
        imageUrls       = urls;
        videoUrl        = input.videoUrl;
        description     = input.description;
        isNew           = input.isNew or input.condition == "new";
        baseRate        = if (input.baseRate > 0.0) input.baseRate else input.mrp;
        bulkRates       = if (input.bulkRates.size() > 0) {
          input.bulkRates
        } else if (input.bulkRate > 0.0 and input.bulkMinQty > 0) {
          [{ minQuantity = input.bulkMinQty; rate = input.bulkRate }]
        } else {
          []
        };
        specialDiscount = if (input.specialDiscount > 0.0) input.specialDiscount else input.schemeDiscount;
        isActive        = true;
        qty             = input.qty;
        packing         = input.packing;
        expiry          = input.expiry;
        barcodeValue    = null;
      };
      putProduct(p);
      created.add(p);
    };
    #ok(created.toArray())
  };

  /// Parse products from raw text/CSV payload.
  /// Stub: splits by newline, each line becomes a minimal ProductInput.
  public func parseProductsFromText(merchantId : Text, rawText : Text) : [Types.ProductInput] {
    let lines = rawText.split(#char '\n');
    let results = List.empty<Types.ProductInput>();
    var lineNum : Nat = 0;
    for (line in lines) {
      lineNum += 1;
      let trimmed = line.trim(#char ' ');
      if (trimmed.size() > 0 and lineNum > 1) {
        // Expected CSV columns: title,description,brand,mrp,baseRate,bulkRate,bulkMinQty,schemeDiscount,purchasedFrom,condition,qty,packing,expiry
        let parts = trimmed.split(#char ',');
        let arr = List.fromIter(parts).toArray();
        let getCol = func(i : Nat) : Text {
          if (i < arr.size()) arr[i].trim(#char ' ') else ""
        };
        let mrpVal           = parseFloat(getCol(3));
        let baseRateVal      = parseFloat(getCol(4));
        let bulkRateVal      = parseFloat(getCol(5));
        let bulkMinQtyVal    = parseNat(getCol(6));
        let schemeDiscVal    = parseFloat(getCol(7));
        let condStr          = getCol(9);
        let qtyVal           = parseNat(getCol(10));
        let packingVal       = getCol(11);
        let expiryVal        = getCol(12);
        let input : Types.ProductInput = {
          title           = getCol(0);
          description     = getCol(1);
          brand           = getCol(2);
          imageUrl        = "";
          imageUrls       = [];
          instagramLink   = null;
          youtubeLink     = null;
          videoUrl        = null;
          condition       = if (condStr == "") "new" else condStr;
          isNew           = condStr != "refurbished";
          mrp             = mrpVal;
          baseRate        = if (baseRateVal > 0.0) baseRateVal else mrpVal;
          bulkRate        = bulkRateVal;
          bulkMinQty      = bulkMinQtyVal;
          bulkRates       = [];
          schemeDiscount  = schemeDiscVal;
          specialDiscount = schemeDiscVal;
          purchaseRate    = 0.0;
          purchasedFrom   = getCol(8);
          qty             = qtyVal;
          packing         = packingVal;
          expiry          = expiryVal;
        };
        if (input.title.size() > 0) results.add(input);
      };
    };
    ignore merchantId;
    results.toArray()
  };

  /// Returns the CSV template string that merchants should use for bulk upload.
  public func getProductTemplate() : Text {
    "title,description,brand,mrp,baseRate,bulkRate,bulkMinQty,schemeDiscount,purchasedFrom,condition,qty,packing,expiry\n" #
    "Sample Product,AI-generated description,BrandName,100,90,80,10,5,Supplier Name,new,50,500ml,Dec 2025"
  };

  // Helper: parse integer from text, return 0 on failure
  func parseNat(s : Text) : Nat {
    switch (Nat.fromText(s.trim(#char ' '))) {
      case (?n) n;
      case null 0;
    }
  };

  // Helper: parse float from text (integer part only), return 0.0 on failure
  func parseFloat(s : Text) : Float {
    let parts = s.trim(#char ' ').split(#text ".").toArray();
    let intPart = if (parts.size() > 0) parts[0] else s;
    switch (Int.fromText(intPart)) {
      case null 0.0;
      case (?i) i.toFloat();
    }
  };

  public func getProductById(id : Text) : Types.Result<Types.Product, Types.ApiError> {
    switch (byId.get(id)) {
      case (?p) { #ok(p) };
      case null  { #err(#notFound) };
    }
  };

  public func getProductsByMerchant(merchantId : Text) : [Types.Product] {
    let all = List.fromIter<Types.Product>(byId.values());
    all.filter(func(p : Types.Product) : Bool { p.merchantId == merchantId }).toArray()
  };

  public func searchProducts(keyword : Text) : [Types.Product] {
    let lower = keyword.toLower();
    let all = List.fromIter<Types.Product>(byId.values());
    all.filter(func(p : Types.Product) : Bool {
      p.isActive and (
        p.title.toLower().contains(#text lower) or
        p.description.toLower().contains(#text lower)
      )
    }).toArray()
  };

  /// Partial update — only non-null fields override existing values.
  public type ProductUpdates = {
    title           : ?Text;
    imageUrls       : ?[Text];
    videoUrl        : ?Text;
    description     : ?Text;
    isNew           : ?Bool;
    baseRate        : ?Float;
    bulkRates       : ?[Types.BulkRate];
    specialDiscount : ?Float;
    qty             : ?Nat;
    packing         : ?Text;
    expiry          : ?Text;
  };

  public func updateProduct(id : Text, updates : ProductUpdates) : Types.Result<Types.Product, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?p) {
        let updated : Types.Product = {
          p with
          title           = switch (updates.title)           { case (?v) v; case null p.title };
          imageUrls       = switch (updates.imageUrls)       { case (?v) v; case null p.imageUrls };
          videoUrl        = switch (updates.videoUrl)        { case (?v) ?v; case null p.videoUrl };
          description     = switch (updates.description)     { case (?v) v; case null p.description };
          isNew           = switch (updates.isNew)           { case (?v) v; case null p.isNew };
          baseRate        = switch (updates.baseRate)        { case (?v) v; case null p.baseRate };
          bulkRates       = switch (updates.bulkRates)       { case (?v) v; case null p.bulkRates };
          specialDiscount = switch (updates.specialDiscount) { case (?v) v; case null p.specialDiscount };
          qty             = switch (updates.qty)             { case (?v) v; case null p.qty };
          packing         = switch (updates.packing)         { case (?v) v; case null p.packing };
          expiry          = switch (updates.expiry)          { case (?v) v; case null p.expiry };
        };
        putProduct(updated);
        #ok(updated)
      };
    }
  };

  public func toggleProductActive(id : Text) : Types.Result<Types.Product, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?p) {
        let updated = { p with isActive = not p.isActive };
        putProduct(updated);
        #ok(updated)
      };
    }
  };

  }; // end class ProductService
};
