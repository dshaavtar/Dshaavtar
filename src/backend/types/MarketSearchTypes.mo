module {

  // ── Trade action variant ─────────────────────────────────────────────────

  public type TradeAction = { #buy; #sell; #hold };

  // ── Per-instrument result from a market data API call ────────────────────

  public type MarketSearchResult = {
    symbol        : Text;
    name          : Text;
    currentPrice  : Float;
    changePercent : Float;
    exchangeName  : Text;
    instrumentType: Text;   // "equity" | "commodity" | "currency" | "metal" | "option"
    currency      : Text;
    lastUpdated   : Int;    // nanosecond timestamp of the price data from the API
    createdAt     : Int;
    updatedAt     : Int;
  };

  // ── AI-generated buy/sell/hold recommendation ─────────────────────────────

  public type TradeRecommendation = {
    symbol           : Text;
    action           : Text;   // "buy" | "sell" | "hold" (Text for shared boundary)
    stopLossPrice    : Float;
    targetPrice      : Float;
    confidence       : Float;  // 0.0 – 1.0
    targetDate       : Text;   // e.g. "~30 days"
    accuracyPrediction : Text; // e.g. "72%"
    reasoning        : Text;
    createdAt        : Int;
    updatedAt        : Int;
  };

  // ── Full persisted search record ──────────────────────────────────────────

  public type MarketSearchQuery = {
    id              : Text;
    scriptName      : Text;
    country         : Text;
    matchedSymbols  : [Text];
    searchedAt      : Int;
    results         : [MarketSearchResult];
    recommendations : [TradeRecommendation];
    createdAt       : Int;
    updatedAt       : Int;
  };

};
