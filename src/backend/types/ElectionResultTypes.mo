module {

  // ── Election Result ───────────────────────────────────────────────────────

  /// One candidate/party result for a constituency in an election.
  public type ElectionResult = {
    id             : Text;   // unique: state#constituency#partyName
    state          : Text;   // e.g. "Maharashtra", "Delhi"
    constituency   : Text;   // e.g. "Andheri East", "New Delhi"
    partyName      : Text;   // e.g. "INC", "BJP", "AAP"
    candidateName  : Text;   // e.g. "Rahul Gandhi"
    votes          : Nat;    // vote count
    voteShare      : Float;  // 0.0-100.0
    isLeading      : Bool;   // true when this candidate is currently leading in the constituency
    isWon          : Bool;   // true when result is declared and this candidate won
    timestamp      : Int;    // nanoseconds epoch of last update
    source         : Text;   // "eci" | "sample" | "api"
  };

};
