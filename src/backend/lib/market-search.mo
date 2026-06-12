import Debug "mo:core/Debug";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Types "../types/MarketSearchTypes";
import Order "mo:core/Order";
import Float "mo:core/Float";
import Nat "mo:core/Nat";

module {

  // ── Script-name filter ────────────────────────────────────────────────────

  /// Returns symbols from allSymbols that match scriptName:
  ///   1. Exact or prefix match (case-insensitive) — returned first.
  ///   2. Contains match (case-insensitive) — appended after, no duplicates.
  public func filterSymbolsByScriptName(scriptName : Text, allSymbols : [Text]) : [Text] {
    let q = scriptName.toUpper();
    let exactList  = List.empty<Text>();
    let partialList = List.empty<Text>();
    for (sym in allSymbols.vals()) {
      let up = sym.toUpper();
      // strip exchange suffix for comparison (e.g. "RELIANCE.NS" → "RELIANCE")
      let base : Text = do {
        let parts = up.split(#char '.').toArray();
        parts[0]
      };
      if (base == q or base.startsWith(#text q) or up == q or up.startsWith(#text q)) {
        exactList.add(sym);
      } else if (base.contains(#text q) or up.contains(#text q)) {
        partialList.add(sym);
      };
    };
    // Combine: exact/prefix first, then partial
    let combined = List.empty<Text>();
    for (s in exactList.values())   { combined.add(s) };
    for (s in partialList.values()) { combined.add(s) };
    combined.toArray()
  };

  // ── Country → exchange / symbol helpers ──────────────────────────────────

  /// Returns a list of representative equity symbols for the given country.
  public func equitySymbolsForCountry(country : Text) : [Text] {
    switch (country.toLower()) {
      case "india"  { ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "SBIN.NS", "ICICIBANK.NS", "LT.NS", "BAJFINANCE.NS"] };
      case "usa"    { ["AAPL", "MSFT", "AMZN", "GOOGL", "META", "TSLA", "NVDA", "JPM"] };
      case "uk"     { ["LLOY.L", "HSBA.L", "BP.L", "GSK.L", "RIO.L"] };
      case "germany"{ ["SAP.DE", "SIE.DE", "BAYN.DE", "VOW3.DE"] };
      case "japan"  { ["7203.T", "6758.T", "9984.T", "8306.T"] };
      case "china"  { ["BABA", "JD", "NIO", "BIDU", "TCEHY"] };
      case _        { ["SPY", "QQQ", "DIA", "IWM"] };
    }
  };

  /// Returns commodity symbols relevant to the country (e.g. GOLD, SILVER, CRUDEOIL).
  public func commoditySymbolsForCountry(country : Text) : [Text] {
    switch (country.toLower()) {
      case "india"  { ["GOLD", "SILVER", "CRUDEOIL", "NATURALGAS", "COPPER"] };
      case "usa"    { ["GC=F", "SI=F", "CL=F", "NG=F", "HG=F", "ZW=F", "ZC=F"] };
      case _        { ["GC=F", "SI=F", "CL=F", "NG=F"] };
    }
  };

  /// Returns forex pair symbols for the country currency (e.g. USDINR=X, EURUSD=X).
  public func forexSymbolsForCountry(country : Text) : [Text] {
    switch (country.toLower()) {
      case "india"  { ["USDINR=X", "EURINR=X", "GBPINR=X", "JPYINR=X"] };
      case "usa"    { ["EURUSD=X", "GBPUSD=X", "USDJPY=X", "USDCAD=X"] };
      case "uk"     { ["GBPUSD=X", "GBPEUR=X", "GBPJPY=X"] };
      case _        { ["EURUSD=X", "GBPUSD=X", "USDJPY=X"] };
    }
  };

  /// Returns metals symbols (GOLD, SILVER, PLATINUM, PALLADIUM).
  public func metalSymbols() : [Text] {
    ["GC=F", "SI=F", "PL=F", "PA=F"]  // Gold, Silver, Platinum, Palladium
  };

  /// Builds a Yahoo Finance v8 chart URL for a symbol.
  /// Builds a Yahoo Finance v7 quote URL for a symbol.
  public func yahooChartUrl(symbol : Text) : Text {
    "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" # symbol
  };

  /// Builds a Yahoo Finance v7 quote URL for a symbol (explicit name).
  public func yahooQuoteUrl(symbol : Text) : Text {
    "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" # symbol
  };

  // ── Recommendation logic ──────────────────────────────────────────────────

  /// Generates a buy/sell/hold recommendation with stop-loss and target
  /// using simple rule-based logic (2 % stop-loss bands).
  public func generateRecommendation(
    result : Types.MarketSearchResult
  ) : Types.TradeRecommendation {
    let now = Time.now();
    let price = result.currentPrice;
    let change = result.changePercent;
    let stopLoss  : Float = price * 0.98;   // 2% stop-loss
    let target    : Float = price * 1.04;   // 4% target
    let (action, confidence, reasoning) : (Text, Float, Text) =
      if      (change >= 2.0)  ("buy",  0.72, "Strong upward momentum (" # result.symbol # " " # debug_show(change) # "%). Consider buying with 2% stop-loss.")
      else if (change >= 0.5)  ("buy",  0.55, "Moderate positive trend. Watch for continuation.")
      else if (change <= -2.0) ("sell", 0.70, "Significant decline. Consider exiting or short position.")
      else if (change <= -0.5) ("sell", 0.52, "Downward pressure. Risk management recommended.")
      else                     ("hold", 0.60, "Sideways movement. No clear trend signal.");
    let pct = (confidence * 100.0).toInt();
    let accuracyText = pct.toText() # "%";
    {
      symbol             = result.symbol;
      action;
      stopLossPrice      = stopLoss;
      targetPrice        = target;
      confidence;
      targetDate         = "~30 days";
      accuracyPrediction = accuracyText;
      reasoning;
      createdAt          = now;
      updatedAt          = now;
    }
  };

  // ── JSON parsing helpers ──────────────────────────────────────────────────

  /// Parses a Yahoo Finance v8 chart JSON response into a MarketSearchResult.
  /// Returns null when the response cannot be parsed or the symbol is missing.
  /// Parses a Yahoo Finance v7 quote JSON response into a MarketSearchResult.
  /// v7 response shape: { quoteResponse: { result: [ { regularMarketPrice, regularMarketChangePercent, ... } ] } }
  /// Returns null when the response cannot be parsed or the price is missing.
  public func parseYahooResponse(
    symbol        : Text,
    exchangeName  : Text,
    instrumentType: Text,
    currency      : Text,
    responseBody  : Text
  ) : ?Types.MarketSearchResult {
    // Minimal JSON extraction: look for "regularMarketPrice" and "regularMarketChangePercent"
    func extractNumStr(json : Text, key : Text) : ?Text {
      let pat = "\"" # key # "\"";
      let parts = json.split(#text pat).toArray();
      if (parts.size() < 2) return null;
      let after = parts[1];
      // skip past ":" and optional space/quote by scanning for first digit or '-'
      let chars = after.toArray();
      var numStr : Text = "";
      var started = false;
      var i : Nat = 0;
      while (i < chars.size()) {
        let c = chars[i];
        if (not started) {
          if ((c >= '0' and c <= '9') or c == '-') {
            started := true;
            numStr #= Text.fromChar(c);
          }
        } else {
          if ((c >= '0' and c <= '9') or c == '.') {
            numStr #= Text.fromChar(c);
          } else {
            i := chars.size(); // break
          };
        };
        i += 1;
      };
      if (numStr == "") null else ?numStr
    };
    // Parse a float string by splitting on '.'
    func parseFloatStr(s : Text) : ?Float {
      if (s == "" or s == "-") return null;
      let isNeg = s.startsWith(#text "-");
      let abs_s = if (isNeg) Text.fromIter(s.toIter().drop(1)) else s;
      let parts = abs_s.split(#char '.').toArray();
      let intPart : Nat = switch (Nat.fromText(parts[0])) { case (?n) n; case null 0 };
      let fracPart : Float = if (parts.size() > 1) {
        let fracStr = parts[1];
        let fracVal : Nat = switch (Nat.fromText(fracStr)) { case (?n) n; case null 0 };
        var divisor : Float = 1.0;
        var fi : Nat = 0;
        while (fi < fracStr.size()) { divisor *= 10.0; fi += 1; };
        fracVal.toFloat() / divisor
      } else 0.0;
      let result = intPart.toFloat() + fracPart;
      ?(if (isNeg) -result else result)
    };
    let now = Time.now();
    // v7 quoteResponse.result[0] contains regularMarketPrice directly
    // Try both v7 (quoteResponse.result) and v8 (chart.result[0].meta) paths
    let priceStr = switch (extractNumStr(responseBody, "regularMarketPrice")) { case (?s) s; case null return null };
    let price = switch (parseFloatStr(priceStr)) { case (?f) f; case null return null };
    let changeStr = switch (extractNumStr(responseBody, "regularMarketChangePercent")) { case (?s) s; case null "0" };
    let change = switch (parseFloatStr(changeStr)) { case (?f) f; case null 0.0 };
    ?{
      symbol;
      name          = symbol;
      currentPrice  = price;
      changePercent = change;
      exchangeName;
      instrumentType;
      currency;
      lastUpdated   = now;
      createdAt     = now;
      updatedAt     = now;
    }
  };

  // ── Storage helpers ───────────────────────────────────────────────────────

  /// Inserts or replaces a search record in the store.
  public func saveSearch(
    store  : Map.Map<Text, Types.MarketSearchQuery>,
    record : Types.MarketSearchQuery
  ) {
    store.add(record.id, record)
  };

  /// Returns all stored searches as an array, newest first.
  public func listSearches(
    store : Map.Map<Text, Types.MarketSearchQuery>
  ) : [Types.MarketSearchQuery] {
    let arr = store.values().toArray();
    arr.sort(func(a : Types.MarketSearchQuery, b : Types.MarketSearchQuery) : Order.Order {
      if (a.searchedAt > b.searchedAt) #less
      else if (a.searchedAt < b.searchedAt) #greater
      else #equal
    })
  };

  /// Returns all stored searches for a specific country.
  public func searchesByCountry(
    store   : Map.Map<Text, Types.MarketSearchQuery>,
    country : Text
  ) : [Types.MarketSearchQuery] {
    store.values().toArray().filter(func(q : Types.MarketSearchQuery) : Bool {
      q.country.toLower() == country.toLower()
    })
  };

  /// Deletes a search record; returns true if the record existed.
  public func deleteSearch(
    store : Map.Map<Text, Types.MarketSearchQuery>,
    id    : Text
  ) : Bool {
    switch (store.get(id)) {
      case null  false;
      case (?_)  { store.remove(id); true };
    }
  };

};
