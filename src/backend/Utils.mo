import Time "mo:core/Time";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Text "mo:core/Text";

module {

  /// Haversine formula — returns distance in kilometres between two lat/lng points.
  public func haversineDistance(lat1 : Float, lng1 : Float, lat2 : Float, lng2 : Float) : Float {
    let r : Float = 6371.0; // Earth radius in km
    let dLat = (lat2 - lat1) * Float.pi / 180.0;
    let dLng = (lng2 - lng1) * Float.pi / 180.0;
    let a =
      Float.sin(dLat / 2.0) * Float.sin(dLat / 2.0) +
      Float.cos(lat1 * Float.pi / 180.0) *
      Float.cos(lat2 * Float.pi / 180.0) *
      Float.sin(dLng / 2.0) * Float.sin(dLng / 2.0);
    let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));
    r * c
  };

  /// Generate a unique id from a prefix and current nanosecond timestamp.
  public func generateId(prefix : Text) : Text {
    let ts = Time.now();
    prefix # "_" # ts.toText()
  };

  /// Mask phone: keep first 2 and last 2 digits, replace middle with *.
  /// Phone masking is disabled — returns the phone number unchanged.
  public func maskPhoneNumber(phone : Text) : Text {
    phone
  };

  /// Current timestamp in nanoseconds (Int).
  public func getCurrentTimestamp() : Int {
    Time.now()
  };

  /// Returns true when the user point falls within the merchant's delivery radius.
  public func isWithinRadius(
    merchantLat : Float,
    merchantLng : Float,
    merchantRadius : Float,
    userLat : Float,
    userLng : Float,
  ) : Bool {
    haversineDistance(merchantLat, merchantLng, userLat, userLng) <= merchantRadius
  };

  // ── Input Sanitization ─────────────────────────────────────────────────────

  /// Validate a phone number: must be 7–15 digits, optionally prefixed with '+'.
  /// Returns true when valid, false otherwise.
  public func validatePhoneNumber(phone : Text) : Bool {
    let t = phone.trim(#char ' ');
    if (t.isEmpty()) { return false };
    // Strip leading '+'
    let digits : Text = switch (t.stripStart(#char '+')) {
      case (?rest) rest;
      case null    t;
    };
    // Check all characters are ASCII digits '0'–'9'
    let len = digits.size();
    if (len < 7 or len > 15) { return false };
    var allDigits = true;
    for (ch in digits.toIter()) {
      if (ch < '0' or ch > '9') { allDigits := false };
    };
    allDigits
  };

  /// Sanitize user-provided text input against:
  ///   - SQL injection patterns (single quotes, --, semicolons before keywords,
  ///     UNION SELECT, DROP/DELETE/INSERT/UPDATE/SELECT sequences)
  ///   - XSS patterns (<script>, javascript:, onerror=, onload=, eval()
  ///   - Null bytes (\u{0000})
  /// Also trims leading/trailing whitespace.
  public func sanitizeInput(raw : Text) : Text {
    // Strip null bytes first (character U+0000)
    var t = raw.replace(#char '\u{0000}', "");

    // SQL injection patterns — replace with safe equivalents
    t := t.replace(#text "'",  "");           // single quote
    t := t.replace(#text "\"", "");           // double quote
    t := t.replace(#text "--", "");           // SQL comment
    t := t.replace(#text "/*", "");           // SQL block comment open
    t := t.replace(#text "*/", "");           // SQL block comment close
    t := t.replace(#text ";", "");            // statement terminator

    // Dangerous SQL keywords (case-insensitive via lower shadow)
    let lower = t.toLower();
    let hasSqlKeyword =
      lower.contains(#text "union select")    or
      lower.contains(#text "drop table")      or
      lower.contains(#text "delete from")     or
      lower.contains(#text "insert into")     or
      lower.contains(#text "update set")      or
      lower.contains(#text "exec(")           or
      lower.contains(#text "execute(")        or
      lower.contains(#text "xp_cmdshell");
    if (hasSqlKeyword) {
      // Replace the whole string with empty if it looks like a SQL injection probe
      t := "";
    };

    // XSS patterns
    t := t.replace(#text "<script",    "");
    t := t.replace(#text "</script>",  "");
    t := t.replace(#text "javascript:", "");
    t := t.replace(#text "onerror=",   "");
    t := t.replace(#text "onload=",    "");
    t := t.replace(#text "onclick=",   "");
    t := t.replace(#text "eval(",      "");
    t := t.replace(#text "<iframe",    "");
    t := t.replace(#text "<img",       "");

    // Trim whitespace
    t.trim(#char ' ')
  };
};
