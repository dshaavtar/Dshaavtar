
module {

  // Lib module for branding helpers.
  // Business logic is implemented in the develop pass.

  /// Build the welcome message text from a brand name.
  public func buildWelcomeMessage(brandName : Text) : Text {
    "Welcome to " # brandName # "! 🛒 How can we help you today?"
  };

  /// Build an AppVersion id from (brandName, platform, version).
  public func versionKey(brandName : Text, platform : Text, version : Text) : Text {
    brandName # "_" # platform # "_" # version
  };

};
