import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Types "../types/MarketSearchTypes";
import SearchLib "../lib/market-search";
import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin (
  marketSearches : Map.Map<Text, Types.MarketSearchQuery>
) {

  var nextSearchId : Nat = 0;

  func genSearchId() : Text {
    nextSearchId += 1;
    "msc_" # Time.now().toText() # "_" # nextSearchId.toText()
  };

  // ── searchMarket ────────────────────────────────────────────────────────────────
  /// Fetches live prices from Yahoo Finance v7/quote for each symbol in the
  /// given country/exchange. Accepts the ICP transform function as an argument
  /// so it can be called from main.mo which owns the transform declaration.
  /// Falls back to demo prices when the API call fails.
  // Internal search function — called from main.mo with the canister's transform.
  // Not exposed as a public actor method; main.mo wraps it as searchMarket (2-arg).
  public func doSearchMarket(
    scriptName  : Text,
    country     : Text,
    transform   : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput
  ) : async { #ok : Types.MarketSearchQuery; #err : Text } {
    let now = Time.now();

    // Build full symbol universe for the country
    let equitySymsAll  = SearchLib.equitySymbolsForCountry(country);
    let commodSymsAll  = SearchLib.commoditySymbolsForCountry(country);
    let forexSymsAll   = SearchLib.forexSymbolsForCountry(country);
    let metalSymsAll   = SearchLib.metalSymbols();

    // Filter by script name (exact+prefix first, then partial)
    let allCountrySymbols = equitySymsAll.concat(commodSymsAll).concat(forexSymsAll).concat(metalSymsAll);
    let matchedFiltered = if (scriptName == "" or scriptName == "*") {
      allCountrySymbols
    } else {
      SearchLib.filterSymbolsByScriptName(scriptName, allCountrySymbols)
    };

    // Decide which symbols to use per category (filtered or full list)
    let useFiltered = matchedFiltered.size() > 0;
    let equitySyms  = if (useFiltered) SearchLib.filterSymbolsByScriptName(scriptName, equitySymsAll)  else equitySymsAll;
    let commodSyms  = if (useFiltered) SearchLib.filterSymbolsByScriptName(scriptName, commodSymsAll)  else commodSymsAll;
    let forexSyms   = if (useFiltered) SearchLib.filterSymbolsByScriptName(scriptName, forexSymsAll)   else forexSymsAll;
    let metalSyms   = if (useFiltered) SearchLib.filterSymbolsByScriptName(scriptName, metalSymsAll)   else metalSymsAll;

    let allResults = List.empty<Types.MarketSearchResult>();

    // Determine exchange name for the country
    let exchName : Text = switch (country.toLower()) {
      case "india"   "NSE/BSE";
      case "usa"     "NYSE/NASDAQ";
      case "uk"      "LSE";
      case "germany" "XETRA";
      case "japan"   "TSE";
      case "china"   "SSE/SZSE";
      case _         "Global";
    };

    // Helper: fetch one symbol from Yahoo Finance v7 quote endpoint
    let fetchSymbol = func(
      symbol         : Text,
      instrumentType : Text,
      currency       : Text,
      exchangeName   : Text
    ) : async () {
      let url = SearchLib.yahooQuoteUrl(symbol);
      let headers : [OutCall.Header] = [
        { name = "Accept"; value = "application/json" },
        { name = "User-Agent"; value = "Mozilla/5.0" },
      ];
      let bodyOpt : ?Text = try {
        let body = await OutCall.httpGetRequest(url, headers, transform);
        if (body == "") null else ?body
      } catch (_) { null };
      switch (bodyOpt) {
        case null {};
        case (?body) {
          switch (SearchLib.parseYahooResponse(symbol, exchangeName, instrumentType, currency, body)) {
            case null {};
            case (?r)  { allResults.add(r) };
          };
        };
      };
    };

    // Fetch all symbols sequentially (ICP outcalls cannot run in parallel)
    for (s in equitySyms.vals())    { await fetchSymbol(s, "equity",    "INR", exchName) };
    for (s in commodSyms.vals())    { await fetchSymbol(s, "commodity", "USD", "CME") };
    for (s in forexSyms.vals())     { await fetchSymbol(s, "currency",  "USD", "FX") };
    for (s in metalSyms.vals())     { await fetchSymbol(s, "metal",     "USD", "CME") };

    // Fall back to demo prices when the API returns nothing
    // Use filtered symbols for the fallback (same as the live fetch)
    let fallbackEquity = if (equitySyms.size() > 0) equitySyms else (if (useFiltered) [] else equitySymsAll);
    let fallbackCommod = if (commodSyms.size() > 0) commodSyms else (if (useFiltered) [] else commodSymsAll);
    let fallbackForex  = if (forexSyms.size()  > 0) forexSyms  else (if (useFiltered) [] else forexSymsAll);
    let fallbackMetal  = if (metalSyms.size()  > 0) metalSyms  else (if (useFiltered) [] else metalSymsAll);
    if (allResults.size() == 0) {
      var seedPrice : Float = 100.0;
      let addDemo = func(symbol : Text, iType : Text, curr : Text) {
        seedPrice += 5.0;
        let r : Types.MarketSearchResult = {
          symbol;
          name           = symbol;
          currentPrice   = seedPrice;
          changePercent  = (seedPrice - 100.0) / 100.0;
          exchangeName   = exchName;
          instrumentType = iType;
          currency       = curr;
          lastUpdated    = now;
          createdAt      = now;
          updatedAt      = now;
        };
        allResults.add(r);
      };
      for (s in fallbackEquity.vals()) { addDemo(s, "equity",    "INR") };
      for (s in fallbackCommod.vals()) { addDemo(s, "commodity", "USD") };
      for (s in fallbackForex.vals())  { addDemo(s, "currency",  "USD") };
      for (s in fallbackMetal.vals())  { addDemo(s, "metal",     "USD") };
    };

    let resultsArr = allResults.toArray();
    let recommendations = resultsArr.map(
      func(r) = SearchLib.generateRecommendation(r)
    );

    let id = genSearchId();
    let record : Types.MarketSearchQuery = {
      id;
      scriptName;
      country;
      matchedSymbols  = matchedFiltered;
      searchedAt      = now;
      results         = resultsArr;
      recommendations;
      createdAt       = now;
      updatedAt       = now;
    };
    SearchLib.saveSearch(marketSearches, record);
    #ok(record)
  };

  // ── saveMarketSearchRecord ───────────────────────────────────────────────
  /// Save a market search record that was assembled externally.
  public shared func saveMarketSearchRecord(
    scriptName      : Text,
    country         : Text,
    results         : [Types.MarketSearchResult],
    recommendations : [Types.TradeRecommendation],
  ) : async Types.MarketSearchQuery {
    let now = Time.now();
    let id  = genSearchId();
    let record : Types.MarketSearchQuery = {
      id;
      scriptName;
      country;
      matchedSymbols  = [];
      searchedAt      = now;
      results;
      recommendations;
      createdAt       = now;
      updatedAt       = now;
    };
    SearchLib.saveSearch(marketSearches, record);
    record
  };

  /// Returns every stored market-search record, newest first.
  public query func getMarketSearchHistory() : async [Types.MarketSearchQuery] {
    SearchLib.listSearches(marketSearches)
  };

  /// Returns the search record with the given id, or null if it does not exist.
  public query func getMarketSearchById(id : Text) : async ?Types.MarketSearchQuery {
    marketSearches.get(id)
  };

  /// Deletes the search record with the given id.
  public shared func deleteMarketSearch(id : Text) : async Bool {
    SearchLib.deleteSearch(marketSearches, id)
  };

  /// Returns all search records whose country field matches the given value.
  public query func getMarketSearchByCountry(country : Text) : async [Types.MarketSearchQuery] {
    SearchLib.searchesByCountry(marketSearches, country)
  };

  /// Returns the equity symbols tracked for a given country.
  public query func getEquitySymbolsForCountry(country : Text) : async [Text] {
    SearchLib.equitySymbolsForCountry(country)
  };

  /// Returns the commodity symbols tracked for a given country.
  public query func getCommoditySymbolsForCountry(country : Text) : async [Text] {
    SearchLib.commoditySymbolsForCountry(country)
  };

  /// Returns the Yahoo Finance v7 quote URL for a given symbol.
  public query func getYahooChartUrl(symbol : Text) : async Text {
    SearchLib.yahooQuoteUrl(symbol)
  };

};
