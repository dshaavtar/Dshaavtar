import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {

  // ── Country-code / currency utility ──────────────────────────────────────

  /// Parse a phone number's country code and return (countryCode, currency, countryName).
  /// Longest-prefix match is used so "+971" wins over "+97".
  /// Default: (IN, INR, India).
  public func parseCountryCode(phone : Text) : (Text, Text, Text) {
    // Table: (prefix, countryCode, currency, countryName)
    let table : [(Text, Text, Text, Text)] = [
      ("+971", "AE", "AED", "UAE"),
      ("+966", "SA", "SAR", "Saudi Arabia"),
      ("+234", "NG", "NGN", "Nigeria"),
      ("+254", "KE", "KES", "Kenya"),
      ("+65",  "SG", "SGD", "Singapore"),
      ("+60",  "MY", "MYR", "Malaysia"),
      ("+55",  "BR", "BRL", "Brazil"),
      ("+52",  "MX", "MXN", "Mexico"),
      ("+86",  "CN", "CNY", "China"),
      ("+61",  "AU", "AUD", "Australia"),
      ("+49",  "DE", "EUR", "Germany"),
      ("+33",  "FR", "EUR", "France"),
      ("+44",  "GB", "GBP", "UK"),
      ("+91",  "IN", "INR", "India"),
      ("+1",   "US", "USD", "USA"),
    ];
    for ((prefix, cc, cur, name) in table.vals()) {
      if (phone.startsWith(#text prefix)) {
        return (cc, cur, name);
      };
    };
    ("IN", "INR", "India")
  };

  /// Return the currency symbol for a given ISO currency code.
  public func currencySymbol(currency : Text) : Text {
    switch (currency) {
      case "INR" { "₹" };
      case "USD" { "$" };
      case "GBP" { "£" };
      case "EUR" { "€" };
      case "AED" { "د.إ" };
      case "SAR" { "﷼" };
      case "SGD" { "S$" };
      case "MYR" { "RM" };
      case "CNY" { "¥" };
      case "AUD" { "A$" };
      case "BRL" { "R$" };
      case "MXN" { "MX$" };
      case "NGN" { "₦" };
      case "KES" { "KSh" };
      case _     { currency };
    }
  };

  public class UserService(
    byPhone : Map.Map<Text, Types.User>,
    byId    : Map.Map<Text, Types.User>,
  ) {

  // ── Helpers ───────────────────────────────────────────────────────────────

  func putUser(user : Types.User) {
    byPhone.add(user.phone, user);
    byId.add(user.id, user);
  };

  // ── Public API ────────────────────────────────────────────────────────────

  public func createUser(
    phone    : Text,
    name     : Text,
    role     : Types.UserRole,
    location : ?Types.Location,
    address  : ?Text,
  ) : Types.Result<Types.User, Types.ApiError> {
    // Validate phone number format before creating
    if (not Utils.validatePhoneNumber(phone)) {
      return #err(#invalidInput("Invalid phone number: must be 7–15 digits, optionally prefixed with '+'"));
    };
    switch (byPhone.get(phone)) {
      case (?_) { #err(#alreadyExists) };
      case null {
        let (cc, cur, cname) = parseCountryCode(phone);
        let user : Types.User = {
          id                 = Utils.generateId("user");
          phone;
          name;
          role;
          location;
          address;
          registrationDate   = Utils.getCurrentTimestamp();
          subscriptionPlanId = null;
          conversationState  = #welcome;
          stateData          = "{}";
          isActive           = true;
          otpVerified        = false;
          passdigit          = "";
          passdigitAttempts  = 0;
          sessionLocked      = false;
          sessionLockExpiry  = 0;
          otpCode            = "";
          otpExpiry          = 0;
          countryCode        = cc;
          currency           = cur;
          countryName        = cname;
          gender             = "";
          importedByMerchant = null;
          promotionalOptOut  = false;
          importBatchId      = null;
        };
        putUser(user);
        #ok(user)
      };
    }
  };

  /// Create a user that was imported by a merchant (bulk contact upload).
  public func createImportedUser(
    phone          : Text,
    merchantName   : Text,
    importBatchId  : Text,
  ) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case (?_) { #err(#alreadyExists) };
      case null {
        let (cc, cur, cname) = parseCountryCode(phone);
        let user : Types.User = {
          id                 = Utils.generateId("user");
          phone;
          name               = "";
          role               = #customer;
          location           = null;
          address            = null;
          registrationDate   = Utils.getCurrentTimestamp();
          subscriptionPlanId = null;
          conversationState  = #welcome;
          stateData          = "{}";
          isActive           = true;
          otpVerified        = false;
          passdigit          = "";
          passdigitAttempts  = 0;
          sessionLocked      = false;
          sessionLockExpiry  = 0;
          otpCode            = "";
          otpExpiry          = 0;
          countryCode        = cc;
          currency           = cur;
          countryName        = cname;
          gender             = "";
          importedByMerchant = ?merchantName;
          promotionalOptOut  = false;
          importBatchId      = ?importBatchId;
        };
        putUser(user);
        #ok(user)
      };
    }
  };

  public func getUserByPhone(phone : Text) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case (?u) { #ok(u) };
      case null  { #err(#notFound) };
    }
  };

  public func getUserById(id : Text) : Types.Result<Types.User, Types.ApiError> {
    switch (byId.get(id)) {
      case (?u) { #ok(u) };
      case null  { #err(#notFound) };
    }
  };

  public func updateUserLocation(id : Text, location : Types.Location) : Types.Result<Types.User, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?u) {
        let updated = { u with location = ?location };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  public func updateConversationState(
    id        : Text,
    state     : Types.ConversationState,
    stateData : Text,
  ) : Types.Result<Types.User, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?u) {
        let updated = { u with conversationState = state; stateData };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  /// Set passdigit for a user (identified by phone).
  public func setPassdigit(phone : Text, passdigit : Text) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case null { #err(#notFound) };
      case (?u) {
        let updated = { u with passdigit; passdigitAttempts = 0; sessionLocked = false };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  /// Increment passdigit attempt count; lock session after 3 fails.
  public func incrementPassdigitAttempts(phone : Text) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case null { #err(#notFound) };
      case (?u) {
        let newAttempts = u.passdigitAttempts + 1;
        let lockExpiry = if (newAttempts >= 3) {
          Time.now() + 900_000_000_000 // 15 min in ns
        } else { u.sessionLockExpiry };
        let updated = {
          u with
          passdigitAttempts = newAttempts;
          sessionLocked = newAttempts >= 3;
          sessionLockExpiry = lockExpiry;
        };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  /// Reset passdigit attempts and unlock session.
  public func resetPassdigitAttempts(phone : Text) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case null { #err(#notFound) };
      case (?u) {
        let updated = { u with passdigitAttempts = 0; sessionLocked = false; sessionLockExpiry = 0 };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  /// Store an OTP code for password reset.
  public func setOtpCode(phone : Text, otp : Text) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case null { #err(#notFound) };
      case (?u) {
        let expiry = Time.now() + 600_000_000_000; // 10 min in ns
        let updated = { u with otpCode = otp; otpExpiry = expiry };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  /// Verify an OTP code (test mode: any 6 digits pass).
  public func verifyOTP(phone : Text, otp : Text) : Types.Result<Bool, Types.ApiError> {
    if (otp.size() != 6) {
      return #err(#otpFailed);
    };
    switch (byPhone.get(phone)) {
      case null { #err(#notFound) };
      case (?u) {
        let updated = { u with otpVerified = true };
        putUser(updated);
        #ok(true)
      };
    }
  };

  /// Update user role.
  public func updateUserRole(phone : Text, role : Types.UserRole) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case null { #err(#notFound) };
      case (?u) {
        let updated = { u with role };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  /// Update the gender field on a user (identified by phone).
  public func updateUserGender(phone : Text, gender : Text) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case null { #err(#notFound) };
      case (?u) {
        let updated = { u with gender };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  /// Set promotional opt-out preference for a user.
  public func setPromotionalOptOut(phone : Text, optOut : Bool) : Types.Result<Types.User, Types.ApiError> {
    switch (byPhone.get(phone)) {
      case null { #err(#notFound) };
      case (?u) {
        let updated = { u with promotionalOptOut = optOut };
        putUser(updated);
        #ok(updated)
      };
    }
  };

  /// Get the currency symbol for a phone number's country.
  public func getCurrencyForPhone(phone : Text) : Text {
    let (_, cur, _) = parseCountryCode(phone);
    currencySymbol(cur)
  };

  public func listUsers(role : ?Types.UserRole) : [Types.User] {
    let all = List.fromIter<Types.User>(byId.values());
    switch (role) {
      case null    { all.toArray() };
      case (?r) {
        all.filter(func(u : Types.User) : Bool {
          switch (u.role, r) {
            case (#customer,       #customer)       { true };
            case (#merchant,       #merchant)       { true };
            case (#deliveryPartner,#deliveryPartner){ true };
            case (#sarthi,         #sarthi)         { true };
            case (#admin,          #admin)          { true };
            case _                                  { false };
          }
        }).toArray()
      };
    }
  };

  /// Return all customers that were imported by a given merchant (by name).
  public func getImportedCustomers(merchantName : Text) : [Types.User] {
    let all = List.fromIter<Types.User>(byId.values());
    all.filter(func(u : Types.User) : Bool {
      switch (u.importedByMerchant) {
        case (?name) { name == merchantName };
        case null { false };
      }
    }).toArray()
  };

  /// Check if a phone belongs to a merchant or delivery partner role.
  public func isMerchantOrDP(phone : Text) : Bool {
    switch (byPhone.get(phone)) {
      case null { false };
      case (?u) {
        switch (u.role) {
          case (#merchant)       { true };
          case (#deliveryPartner){ true };
          case (#sarthi)         { true };
          case _                 { false };
        }
      };
    }
  };

  }; // end class UserService
};
