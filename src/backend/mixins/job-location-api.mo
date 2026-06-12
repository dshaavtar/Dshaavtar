import JobLocationTypes "../types/JobLocationTypes";
import Map "mo:core/Map";

mixin (
  jobLocationsById : Map.Map<Text, JobLocationTypes.JobLocation>,
) {

  // ── Job Location API ──────────────────────────────────────────────────────

  public shared func addJobLocation(loc : JobLocationTypes.JobLocation) : async { #ok : Text; #err : Text } {
    switch (jobLocationsById.get(loc.id)) {
      case (?_) { #err("Job location with this ID already exists") };
      case null {
        jobLocationsById.add(loc.id, loc);
        #ok(loc.id)
      };
    }
  };

  public query func getJobLocations(jobId : Text) : async [JobLocationTypes.JobLocation] {
    jobLocationsById.values().filter(
      func(l : JobLocationTypes.JobLocation) : Bool { l.jobId == jobId }
    ).toArray()
  };

  public query func getAllJobLocations() : async [JobLocationTypes.JobLocation] {
    jobLocationsById.values().toArray()
  };

  public shared func deleteJobLocation(id : Text) : async { #ok : Text; #err : Text } {
    switch (jobLocationsById.get(id)) {
      case null { #err("Job location not found") };
      case (?_) {
        jobLocationsById.remove(id);
        #ok(id)
      };
    }
  };

};
