module {

  // ── Job Location ──────────────────────────────────────────────────────────
  // A job can have multiple location entries (multi-location job opportunity).

  public type JobLocation = {
    id        : Text;
    jobId     : Text;
    city      : Text;
    pincode   : ?Text;
    createdAt : Int;
  };

};
