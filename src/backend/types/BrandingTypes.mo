module {

  // Global branding configuration (one record, keyed "default").
  // Changing brandName auto-updates the welcome message in the flow registry.
  public type BrandingConfig = {
    brandName      : Text;
    welcomeMessage : Text;   // auto-generated from brandName
    logoUrl        : Text;
    createdAt      : Int;
    updatedAt      : Int;
  };

  // One record per (brandName, platform, version) triple.
  // brandName is snapshot-locked at creation — upgrades never overwrite it.
  public type AppVersion = {
    id          : Text;   // brandName # "_" # platform # "_" # version
    brandName   : Text;   // locked at creation — never changed on update
    platform    : Text;   // "ios" | "android"
    version     : Text;   // e.g. "1.2.3"
    buildNumber : Nat;
    releaseDate : Int;
    isActive    : Bool;
    createdAt   : Int;
  };

};
