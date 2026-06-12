import MenuRepositoryTypes "../types/MenuRepositoryTypes";
import Array "mo:core/Array";

module {

  // Lib module for menu repository helpers.
  // Business logic is implemented in the develop pass.

  /// Return true when the menu option should be shown for the given role and city.
  public func isVisible(opt : MenuRepositoryTypes.MenuOption, role : Text, enabledModules : [(Text, Bool)]) : Bool {
    if (not opt.isActive) return false;
    // role check
    let roleOk = opt.roles.find(func(r : Text) : Bool { r == role or r == "all" }) != null;
    if (not roleOk) return false;
    // module toggle check — if no key, always visible
    if (opt.cityModuleKey == "") return true;
    let moduleOn = enabledModules.find(func((k, _v) : (Text, Bool)) : Bool {
      k == opt.cityModuleKey
    });
    switch (moduleOn) {
      case (?(_, true)) true;
      case _ false;
    }
  };

};
