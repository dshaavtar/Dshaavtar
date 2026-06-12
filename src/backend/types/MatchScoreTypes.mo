module {

  // ── Match Score ──────────────────────────────────────────────────────────────

  public type MatchScore = {
    id         : Text;
    sport      : Text;   // "football" | "cricket" | "kabaddi" etc.
    homeTeam   : Text;
    awayTeam   : Text;
    homeScore  : Text;
    awayScore  : Text;
    status     : Text;   // "live" | "scheduled" | "finished" | "halftime" etc.
    matchTime  : Text;   // ISO date-time string or game-clock text
    leagueName : Text;   // e.g. "IPL", "ISL", "I-League", "International Cricket"
    fetchedAt  : Int;    // nanoseconds timestamp of last API fetch
    createdAt  : Int;
    updatedAt  : Int;
  };

};
