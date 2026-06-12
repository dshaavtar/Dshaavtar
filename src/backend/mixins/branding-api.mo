import Types "../Types";
import BrandingTypes "../types/BrandingTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import BrandingLib "../lib/branding";

mixin (
  brandingStore    : Map.Map<Text, BrandingTypes.BrandingConfig>,
  appVersionsStore : Map.Map<Text, BrandingTypes.AppVersion>,
  flowsRef         : Map.Map<Text, Types.FlowDefinition>,
  adminPrincipals  : Map.Map<Text, Bool>,
) {

  // Internal helper: check caller is in admin whitelist
  func brandingIsAdmin(caller : Principal) : Bool {
    adminPrincipals.get(caller.toText()) == ?true
  };

  // ── Branding Management API ───────────────────────────────────────────────

  /// Return the current branding configuration.
  /// Initialises a default record when none has been saved yet.
  public query func getBrandingConfig() : async BrandingTypes.BrandingConfig {
    switch (brandingStore.get("default")) {
      case (?cfg) cfg;
      case null {
        {
          brandName      = "LocalBazar Kart";
          welcomeMessage = "Welcome to LocalBazar Kart! 🛒 How can we help you today?";
          logoUrl        = "";
          createdAt      = 0;
          updatedAt      = 0;
        }
      };
    }
  };

  /// Update the brand name and optional logo URL.
  /// Automatically rewrites the welcome message in the flow registry for the
  /// customer-registration / welcome flow so all chatbot surfaces reflect the
  /// new brand name immediately.
  public shared ({ caller }) func updateBrandingConfig(
    brandName : Text,
    logoUrl   : Text,
  ) : async Types.Result<BrandingTypes.BrandingConfig, Text> {
    if (not brandingIsAdmin(caller)) { return #err("Unauthorized: admin Internet Identity required") };
    if (brandName == "") return #err("Brand name cannot be empty");
    let now = Time.now();
    let existing : BrandingTypes.BrandingConfig = switch (brandingStore.get("default")) {
      case (?c) c;
      case null { { brandName = ""; welcomeMessage = ""; logoUrl = ""; createdAt = now; updatedAt = now } };
    };
    let welcomeMessage = BrandingLib.buildWelcomeMessage(brandName);
    let updated : BrandingTypes.BrandingConfig = {
      existing with brandName; welcomeMessage; logoUrl;
      createdAt = if (existing.createdAt == 0) now else existing.createdAt;
      updatedAt = now;
    };
    brandingStore.add("default", updated);
    // Update welcome message in flow registry for any welcome/registration flow
    for ((k, fd) in flowsRef.entries()) {
      let nameLower = fd.name.toLower();
      if (nameLower.contains(#text "welcome") or nameLower.contains(#text "customer-registration") or nameLower.contains(#text "registration")) {
        if (fd.flowJson.contains(#text "Welcome to")) {
          // Replace the brand name inside the flow JSON
          let updatedJson = fd.flowJson
            .replace(#text "Welcome to LocalBazar Kart", brandName.concat(" "))
            .replace(#text "\"Welcome to ", "\"Welcome to ");
          // Simple targeted replacement of old brand names with new brand name in welcome text
          let newJson = fd.flowJson.replace(
            #text "LocalBazar Kart", brandName
          );
          flowsRef.add(k, { fd with flowJson = newJson; updatedAt = now });
        };
      };
    };
    #ok(updated)
  };

  /// Record a new iOS or Android app version for a brand.
  /// brandName is snapshot-locked at creation and will not change on later
  /// calls to updateBrandingConfig.
  public shared ({ caller }) func addAppVersion(
    brandName   : Text,
    platform    : Text,
    version     : Text,
    buildNumber : Nat,
  ) : async Types.Result<BrandingTypes.AppVersion, Text> {
    if (not brandingIsAdmin(caller)) { return #err("Unauthorized: admin Internet Identity required") };
    // Lock brand name: if an existing version exists for this brand+platform, use its brand name
    let lockedBrandName : Text = switch (
      appVersionsStore.values().toArray().find(
        func(v0 : BrandingTypes.AppVersion) : Bool {
          v0.brandName == brandName and v0.platform == platform
        }
      )
    ) {
      case (?first) first.brandName;
      case null brandName;
    };
    let id = BrandingLib.versionKey(lockedBrandName, platform, version);
    switch (appVersionsStore.get(id)) {
      case (?_) { #err("Version already exists: " # id) };
      case null {
        let now = Time.now();
        let appVer : BrandingTypes.AppVersion = {
          id;
          brandName   = lockedBrandName;
          platform;
          version;
          buildNumber;
          releaseDate = now;
          isActive    = true;
          createdAt   = now;
        };
        appVersionsStore.add(id, appVer);
        #ok(appVer)
      };
    }
  };

  /// Return all app versions for a specific brand.
  public query func getAppVersions(
    brandName : Text,
  ) : async [BrandingTypes.AppVersion] {
    appVersionsStore.values().toArray().filter(
      func(v : BrandingTypes.AppVersion) : Bool { v.brandName == brandName }
    )
  };

  /// Return all app versions across all brands.
  public query func getAllAppVersions() : async [BrandingTypes.AppVersion] {
    appVersionsStore.values().toArray()
  };

  /// Mark an app version as active or inactive.
  public shared ({ caller }) func setAppVersionActive(
    id       : Text,
    isActive : Bool,
  ) : async Types.Result<BrandingTypes.AppVersion, Text> {
    if (not brandingIsAdmin(caller)) { return #err("Unauthorized: admin Internet Identity required") };
    switch (appVersionsStore.get(id)) {
      case null { #err("App version not found: " # id) };
      case (?v) {
        let updated = { v with isActive };
        appVersionsStore.add(id, updated);
        #ok(updated)
      };
    }
  };

};
