import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "../types/MatchScoreTypes";

mixin (
  matchScoresStore : Map.Map<Text, Types.MatchScore>,
) {

  var nextMatchScoreId : Nat = 0;

  func genMatchId() : Text {
    nextMatchScoreId += 1;
    "ms_" # Time.now().toText() # "_" # nextMatchScoreId.toText()
  };

  // ── ESPN Public Scoreboard URLs (no auth required) ───────────────────────

  /// Returns the ESPN public scoreboard URL for a given sport slug.
  func espnScoreboardUrl(sport : Text) : Text {
    "https://site.api.espn.com/apis/site/v2/sports/" # sport # "/scoreboard"
  };

  /// Returns the ESPN cricket summary API URL.
  func espnCricketUrl() : Text {
    "https://site.api.espn.com/apis/site/v2/sports/cricket/scoreboard"
  };

  // India domestic league ESPN URLs
  // Football: ISL = ind.1, I-League = ind.2
  // Cricket: IPL = 8039, domestic = 8048
  func espnIslUrl()         : Text { "https://site.api.espn.com/apis/site/v2/sports/football/ind.1/scoreboard" };
  func espnILeagueUrl()     : Text { "https://site.api.espn.com/apis/site/v2/sports/football/ind.2/scoreboard" };
  func espnIplUrl()         : Text { "https://site.api.espn.com/apis/site/v2/sports/cricket/8039/scoreboard" };
  func espnDomesticCricket(): Text { "https://site.api.espn.com/apis/site/v2/sports/cricket/8048/scoreboard" };

  // ── JSON helpers ──────────────────────────────────────────────────────────

  /// Extract a text value for the given key from raw JSON (first occurrence).
  func extractMatchJsonStr(json : Text, key : Text) : Text {
    let pat = "\"" # key # "\":\"";
    if (not json.contains(#text pat)) return "";
    let parts = json.split(#text pat).toArray();
    if (parts.size() < 2) return "";
    let after = parts[1];
    let valueParts = after.split(#text "\"").toArray();
    if (valueParts.size() < 1) return "";
    valueParts[0]
  };

  /// Count occurrences of a substring for crude array size detection.
  func countOccurrences(haystack : Text, needle : Text) : Nat {
    let parts = haystack.split(#text needle).toArray();
    if (parts.size() == 0) 0 else parts.size() - 1
  };

  // ── Parse ESPN football scoreboard JSON into MatchScore records ───────────
  // ESPN response shape:
  //  { events: [ { id, status: { type: { description } }, competitions: [ {
  //    competitors: [ { homeAway, team: { displayName }, score } ] } ] } ] }

  func parseEspnFootball(body : Text, now : Int, league : Text) : [Types.MatchScore] {
    let results = List.empty<Types.MatchScore>();
    // Split on each event id to iterate events
    let eventParts = body.split(#text "\"competitions\":").toArray();
    // First part is preamble; each subsequent part is one competition block
    var idx : Nat = 1;
    while (idx < eventParts.size()) {
      let block = eventParts[idx];
      // Extract team display names — competitors array has home then away
      let teamParts  = block.split(#text "\"displayName\":\"").toArray();
      let homeTeam   = if (teamParts.size() > 1) teamParts[1].split(#text "\"").toArray()[0] else "Home Team";
      let awayTeam   = if (teamParts.size() > 2) teamParts[2].split(#text "\"").toArray()[0] else "Away Team";
      // Extract scores — second occurrence for away
      let scoreParts = block.split(#text "\"score\":\"").toArray();
      let hScore     = if (scoreParts.size() > 1) scoreParts[1].split(#text "\"").toArray()[0] else "0";
      let aScore     = if (scoreParts.size() > 2) scoreParts[2].split(#text "\"").toArray()[0] else "0";
      // Extract status description
      let statusDesc = extractMatchJsonStr(block, "description");
      let status     = if (statusDesc == "") "scheduled" else statusDesc;
      let id = genMatchId();
      let match : Types.MatchScore = {
        id;
        sport      = "football";
        homeTeam;
        awayTeam;
        homeScore  = hScore;
        awayScore  = aScore;
        status;
        matchTime  = "";
        leagueName = league;
        fetchedAt  = now;
        createdAt  = now;
        updatedAt  = now;
      };
      results.add(match);
      idx += 1;
    };
    results.toArray()
  };

  // ── Parse ESPN cricket scoreboard JSON into MatchScore records ────────────
  // ESPN cricket response mirrors football shape with competitions/competitors.

  func parseEspnCricket(body : Text, now : Int, league : Text) : [Types.MatchScore] {
    let results = List.empty<Types.MatchScore>();
    let eventParts = body.split(#text "\"competitions\":").toArray();
    var idx : Nat = 1;
    while (idx < eventParts.size()) {
      let block = eventParts[idx];
      let teamParts  = block.split(#text "\"displayName\":\"").toArray();
      let homeTeam   = if (teamParts.size() > 1) teamParts[1].split(#text "\"").toArray()[0] else "Team A";
      let awayTeam   = if (teamParts.size() > 2) teamParts[2].split(#text "\"").toArray()[0] else "Team B";
      let scoreParts = block.split(#text "\"score\":\"").toArray();
      let hScore     = if (scoreParts.size() > 1) scoreParts[1].split(#text "\"").toArray()[0] else "0";
      let aScore     = if (scoreParts.size() > 2) scoreParts[2].split(#text "\"").toArray()[0] else "0";
      let statusDesc = extractMatchJsonStr(block, "description");
      let status     = if (statusDesc == "") "scheduled" else statusDesc;
      let id = genMatchId();
      let match : Types.MatchScore = {
        id;
        sport      = "cricket";
        homeTeam;
        awayTeam;
        homeScore  = hScore;
        awayScore  = aScore;
        status;
        matchTime  = "";
        leagueName = league;
        fetchedAt  = now;
        createdAt  = now;
        updatedAt  = now;
      };
      results.add(match);
      idx += 1;
    };
    results.toArray()
  };

  // ── fetchTodayMatchScores — ESPN outcall (football + cricket) ─────────────

  /// Fetches today's match scores from ESPN for India domestic leagues
  /// (ISL, I-League for football; IPL, domestic cricket for cricket)
  /// plus international fallbacks. Each endpoint is wrapped in try-catch
  /// so one failure does not block others.
  /// Returns the combined freshly-fetched array (or stored scores on full failure).
  public shared func fetchTodayMatchScores(
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput
  ) : async [Types.MatchScore] {
    let now = Time.now();
    let headers : [OutCall.Header] = [
      { name = "Accept"; value = "application/json" },
    ];
    // ── India Football: ISL ───────────────────────────────────────────────────
    let islBody : Text = try {
      await OutCall.httpGetRequest(espnIslUrl(), headers, transform)
    } catch (_) { "" };
    // ── India Football: I-League ──────────────────────────────────────────────
    let iLeagueBody : Text = try {
      await OutCall.httpGetRequest(espnILeagueUrl(), headers, transform)
    } catch (_) { "" };
    // ── International Football: Premier League (fallback) ────────────────────
    let engBody : Text = try {
      await OutCall.httpGetRequest(espnScoreboardUrl("football/eng.1"), headers, transform)
    } catch (_) { "" };
    // ── India Cricket: IPL ────────────────────────────────────────────────────
    let iplBody : Text = try {
      await OutCall.httpGetRequest(espnIplUrl(), headers, transform)
    } catch (_) { "" };
    // ── India Cricket: domestic ───────────────────────────────────────────────
    let domCricketBody : Text = try {
      await OutCall.httpGetRequest(espnDomesticCricket(), headers, transform)
    } catch (_) { "" };
    // ── International Cricket (fallback) ──────────────────────────────────────
    let intlCricketBody : Text = try {
      await OutCall.httpGetRequest(espnCricketUrl(), headers, transform)
    } catch (_) { "" };
    // Parse each source; tag with league name
    let islScores         = if (islBody         == "") [] else parseEspnFootball(islBody,         now, "ISL");
    let iLeagueScores     = if (iLeagueBody     == "") [] else parseEspnFootball(iLeagueBody,     now, "I-League");
    let engScores         = if (engBody         == "") [] else parseEspnFootball(engBody,         now, "Premier League");
    let iplScores         = if (iplBody         == "") [] else parseEspnCricket(iplBody,          now, "IPL");
    let domCricketScores  = if (domCricketBody  == "") [] else parseEspnCricket(domCricketBody,   now, "Domestic Cricket");
    let intlCricketScores = if (intlCricketBody == "") [] else parseEspnCricket(intlCricketBody,  now, "International Cricket");
    // Persist all results
    for (s in islScores.vals())         { matchScoresStore.add(s.id, s) };
    for (s in iLeagueScores.vals())     { matchScoresStore.add(s.id, s) };
    for (s in engScores.vals())         { matchScoresStore.add(s.id, s) };
    for (s in iplScores.vals())         { matchScoresStore.add(s.id, s) };
    for (s in domCricketScores.vals())  { matchScoresStore.add(s.id, s) };
    for (s in intlCricketScores.vals()) { matchScoresStore.add(s.id, s) };
    let combined = islScores
      .concat(iLeagueScores)
      .concat(engScores)
      .concat(iplScores)
      .concat(domCricketScores)
      .concat(intlCricketScores);
    // Return combined freshly-fetched set (or stored if all calls failed)
    if (combined.size() == 0) {
      matchScoresStore.values().toArray()
    } else {
      combined
    }
  };

  // ── saveMatchScores ───────────────────────────────────────────────────────

  /// Stores/updates an array of MatchScore records in the store, keyed by id.
  public shared func saveMatchScores(scores : [Types.MatchScore]) : async () {
    for (score in scores.vals()) {
      matchScoresStore.add(score.id, score);
    };
  };

  // ── getMatchScores ────────────────────────────────────────────────────────

  /// Returns all stored match scores ordered by fetchedAt descending (most recent first).
  public query func getMatchScores() : async [Types.MatchScore] {
    let arr = matchScoresStore.values().toArray();
    arr.sort(func(a : Types.MatchScore, b : Types.MatchScore) : Order.Order {
      if (a.fetchedAt > b.fetchedAt) #less
      else if (a.fetchedAt < b.fetchedAt) #greater
      else #equal
    })
  };

  // ── getMatchScoresBySport (query) ─────────────────────────────────────────

  /// Returns all stored match scores filtered by sport ("football" or "cricket").
  /// Pass "" or "all" to return all scores regardless of sport.
  public query func getMatchScoresBySport(sport : Text) : async [Types.MatchScore] {
    let lower = sport.toLower();
    if (lower == "" or lower == "all") {
      matchScoresStore.values().toArray()
    } else {
      matchScoresStore.values().filter(func(s : Types.MatchScore) : Bool {
        s.sport.toLower() == lower
      }).toArray()
    }
  };

  // ── deleteMatchScore ──────────────────────────────────────────────────────

  /// Deletes the match score with the given id.
  /// Returns true when the record was found and removed, false otherwise.
  public shared func deleteMatchScore(id : Text) : async Bool {
    switch (matchScoresStore.get(id)) {
      case null  false;
      case (?_)  { matchScoresStore.remove(id); true };
    }
  };

};
