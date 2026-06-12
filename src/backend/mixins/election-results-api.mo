import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "../types/ElectionResultTypes";
import Nat "mo:core/Nat";

// ── Election Results Mixin ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// Provides fetchElectionResults, getElectionResults, getAllElectionResults,
// and seedElectionResults.  Calls India ECI public API as the primary source
// and falls back to seeded sample data when the network call fails.

mixin (
  electionResultsStore : Map.Map<Text, Types.ElectionResult>,
) {

  // ── Counter for id generation ──────────────────────────────────────────────────────────────────

  var nextElectionId : Nat = 0;

  func genElectionId() : Text {
    nextElectionId += 1;
    "er_" # Time.now().toText() # "_" # nextElectionId.toText()
  };

  // ── Minimal JSON extractor (same pattern as match-score-api) ───────────────

  func extractStr(json : Text, key : Text) : Text {
    let pat = "\"" # key # "\":\"";
    if (not json.contains(#text pat)) return "";
    let parts = json.split(#text pat).toArray();
    if (parts.size() < 2) return "";
    let after = parts[1];
    let valueParts = after.split(#text "\"").toArray();
    if (valueParts.size() < 1) return "";
    valueParts[0]
  };

  // ── Parse ECI-style JSON response (best-effort) ────────────────────────────────
  // Expected shape from ECI public result service:
  // { results: [ { constituency, party, candidate, votes, voteShare, isLeading, isWon } ] }

  func parseECIResults(body : Text, state : Text, now : Int) : [Types.ElectionResult] {
    let results = List.empty<Types.ElectionResult>();
    // Split on constituency blocks — rough heuristic like ESPN parser
    let blocks = body.split(#text "\"constituency\":\"").toArray();
    var idx : Nat = 1;
    while (idx < blocks.size()) {
      let block = blocks[idx];
      let constit = block.split(#text "\"").toArray()[0];
      let party    = extractStr(block, "party");
      let candidate = extractStr(block, "candidate");
      // votes: integer field "votes":123
      let votesStr : Text = do {
        let votePat = "\"votes\":";
        if (not block.contains(#text votePat)) "0"
        else {
          let vParts = block.split(#text votePat).toArray();
          if (vParts.size() < 2) "0"
          else {
            let after = vParts[1];
            let numParts = after.split(#text ",").toArray();
            numParts[0].trim(#char ' ')
          }
        }
      };
      let votes : Nat = switch (Nat.fromText(votesStr)) {
        case (?v) v;
        case null 0;
      };
      // voteShare: float field
      let shareStr : Text = do {
        let sharePat = "\"voteShare\":";
        if (not block.contains(#text sharePat)) "0.0"
        else {
          let sParts = block.split(#text sharePat).toArray();
          if (sParts.size() < 2) "0.0"
          else {
            let after = sParts[1];
            let numParts = after.split(#text ",").toArray();
            numParts[0].trim(#char ' ')
          }
        }
      };
      let voteShare : Float = do {
        // Best-effort: extract integer part — Float.fromText not in mo:core
        let trimmed = shareStr.trim(#char ' ');
        switch (Nat.fromText(trimmed)) {
          case (?n) n.toFloat();
          case null {
            let intPart = trimmed.split(#text ".").toArray()[0];
            switch (Nat.fromText(intPart)) {
              case (?n2) n2.toFloat();
              case null  0.0;
            }
          };
        }
      };
      let isLeading = block.contains(#text "\"isLeading\":true");
      let isWon     = block.contains(#text "\"isWon\":true");
      if (constit.size() > 0 and party.size() > 0) {
        let id = state # "#" # constit # "#" # party;
        let record : Types.ElectionResult = {
          id;
          state;
          constituency = constit;
          partyName    = party;
          candidateName = candidate;
          votes;
          voteShare;
          isLeading;
          isWon;
          timestamp = now;
          source    = "eci";
        };
        results.add(record);
      };
      idx += 1;
    };
    results.toArray()
  };

  // ── doFetchElectionResults (internal helper for main.mo wrapper) ───────────────

  /// Fetches live election results for the given state from India ECI public
  /// endpoint.  Stores results keyed by `state#constituency#partyName`.
  /// Falls back to any already-seeded sample data when the call fails.
  /// Called from main.mo's fetchElectionResults wrapper which passes transform.
  public shared func doFetchElectionResults(
    state     : Text,
    transform : shared query OutCall.TransformationInput -> async OutCall.TransformationOutput
  ) : async [Types.ElectionResult] {
    let url = "https://results.eci.gov.in/ResultAcGenJune2024/partywiseresult-" # state # ".htm";
    let now = Time.now();
    try {
      let res = await OutCall.httpGetRequest(url, [], transform);
      let bodyText = res;
      if (bodyText.size() > 50) {
        let parsed = parseECIResults(bodyText, state, now);
        if (parsed.size() > 0) {
          for (r in parsed.vals()) {
            electionResultsStore.add(r.id, r);
          };
          return parsed;
        };
      };
    } catch (_) {};
    // fallback: return whatever is stored for this state
    let stored = List.empty<Types.ElectionResult>();
    for ((_, r) in electionResultsStore.entries()) {
      if (state == "" or r.state == state) {
        stored.add(r);
      };
    };
    stored.toArray()
  };

  // ── doGetElectionResults (internal query helper) ───────────────────────────────────

  /// Returns stored election results for the given state.
  /// Pass "" to return all results across all states.
  public query func doGetElectionResults(state : Text) : async [Types.ElectionResult] {
    let result = List.empty<Types.ElectionResult>();
    for ((_, r) in electionResultsStore.entries()) {
      if (state == "" or r.state == state) {
        result.add(r);
      };
    };
    result.toArray()
  };

  // ── doGetAllElectionResults (internal query helper) ──────────────────────────────

  /// Returns all stored election results across all states.
  /// Lazily seeds sample data on first call when the store is empty.
  public shared func doGetAllElectionResults() : async [Types.ElectionResult] {
    if (electionResultsStore.size() == 0) {
      ignore (await seedElectionResults());
    };
    electionResultsStore.values().toArray()
  };

  // ── seedElectionResults (shared update) ──────────────────────────────────────────────

  /// Seeds comprehensive India 2024/2025 election results.
  /// Idempotent — skips records that already exist.
  public shared func seedElectionResults() : async Nat {
    let now = Time.now();
    // ── Lok Sabha 2024 General Election — party-level summary ────────────────
    let lsParties : [(Text, Text, Nat, Float)] = [
      ("BJP",    "(Party total)", 24000000, 36.56),
      ("INC",    "(Party total)",  9900000, 21.19),
      ("SP",     "(Party total)",  3700000,  6.99),
      ("AITC",   "(Party total)",  2900000,  7.45),
      ("DMK",    "(Party total)",  2200000,  6.56),
      ("TDP",    "(Party total)",  1600000,  2.39),
      ("JDU",    "(Party total)",  1200000,  1.44),
      ("SHSUBT", "(Party total)",   900000,  1.57),
      ("NCP-SP", "(Party total)",   800000,  1.52),
      ("SS-UBT", "(Party total)",   900000,  1.52),
      ("IND",    "(Party total)",   700000,  1.10),
      ("Others", "(Party total)",  5500000,  9.71),
    ];
    let samples = List.empty<Types.ElectionResult>();
    for ((party, cand, votes, share) in lsParties.vals()) {
      let id = "National#Lok Sabha 2024#" # party;
      let r : Types.ElectionResult = {
        id;
        state          = "National";
        constituency   = "Lok Sabha 2024";
        partyName      = party;
        candidateName  = cand;
        votes;
        voteShare      = share;
        isLeading      = false;
        isWon          = true;
        timestamp      = now;
        source         = "sample";
      };
      samples.add(r);
    };
    // ── Maharashtra Vidhan Sabha 2024 — 5 constituencies ─────────────────────
    let mhSeeds : [(Text, Text, Text, Nat, Float)] = [
      ("Mumbai North",  "BJP", "Piyush Goyal",         512300, 54.2),
      ("Pune",          "BJP", "Mukta Tilak",           445100, 51.8),
      ("Nagpur",        "BJP", "Devendra Fadnavis",     398200, 53.4),
      ("Nashik",        "NCP", "Dilip Walse Patil",     312400, 46.7),
      ("Aurangabad",    "MIM", "Imtiaz Jaleel",         287600, 44.9),
    ];
    for ((constit, party, cand, votes, share) in mhSeeds.vals()) {
      let id = "Maharashtra#" # constit # "#" # party;
      let r : Types.ElectionResult = {
        id;
        state          = "Maharashtra";
        constituency   = constit;
        partyName      = party;
        candidateName  = cand;
        votes;
        voteShare      = share;
        isLeading      = false;
        isWon          = true;
        timestamp      = now;
        source         = "sample";
      };
      samples.add(r);
    };
    // ── Delhi Assembly 2025 — 5 constituencies ────────────────────────────────
    let dlSeeds : [(Text, Text, Text, Nat, Float)] = [
      ("New Delhi",     "BJP",   "Parvesh Verma",   198700, 42.1),
      ("Chandni Chowk", "BJP",   "Sanjay Gupta",    176300, 39.8),
      ("Kalkaji",       "BJP",   "Ramesh Bidhuri",  185200, 41.3),
      ("Mustafabad",    "BJP",   "Mohan Singh Bisht",165400, 38.6),
      ("Okhla",         "AIMIM","Amanatullah Khan", 187900, 43.2),
    ];
    for ((constit, party, cand, votes, share) in dlSeeds.vals()) {
      let id = "Delhi#" # constit # "#" # party;
      let r : Types.ElectionResult = {
        id;
        state          = "Delhi";
        constituency   = constit;
        partyName      = party;
        candidateName  = cand;
        votes;
        voteShare      = share;
        isLeading      = false;
        isWon          = true;
        timestamp      = now;
        source         = "sample";
      };
      samples.add(r);
    };
    // ── Bihar Assembly 2025 (upcoming) — 5 constituencies ────────────────────
    let biharSeeds : [(Text, Text, Text)] = [
      ("Patna Sahib",  "BJP",  "TBD"),
      ("Gaya",         "JDU",  "TBD"),
      ("Muzaffarpur",  "BJP",  "TBD"),
      ("Darbhanga",    "BJP",  "TBD"),
      ("Bhagalpur",    "INC",  "TBD"),
    ];
    for ((constit, party, cand) in biharSeeds.vals()) {
      let id = "Bihar#" # constit # "#" # party;
      let r : Types.ElectionResult = {
        id;
        state          = "Bihar";
        constituency   = constit;
        partyName      = party;
        candidateName  = cand;
        votes          = 0;
        voteShare      = 0.0;
        isLeading      = false;
        isWon          = false;
        timestamp      = now;
        source         = "sample";
      };
      samples.add(r);
    };
    var added : Nat = 0;
    for (r in samples.values()) {
      if (electionResultsStore.get(r.id) == null) {
        electionResultsStore.add(r.id, r);
        added += 1;
      };
    };
    added
  };

  // ── doGetUpcomingElections ─────────────────────────────────────────────────

  /// Returns a hardcoded list of upcoming Indian elections.
  public query func doGetUpcomingElections() : async [{ name : Text; state : Text; date : Text; electionType : Text }] {
    [
      { name = "Bihar Assembly 2025";          state = "Bihar";       date = "Oct 2025"; electionType = "State Assembly" },
      { name = "West Bengal Assembly 2026";    state = "West Bengal"; date = "Apr 2026"; electionType = "State Assembly" },
      { name = "Tamil Nadu Assembly 2026";     state = "Tamil Nadu";  date = "May 2026"; electionType = "State Assembly" },
    ]
  };

};
