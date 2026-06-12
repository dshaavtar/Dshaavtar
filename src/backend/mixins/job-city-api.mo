import Types "../Types";
import JobCityTypes "../types/JobCityTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Set "mo:core/Set";
import Text "mo:core/Text";
import JobCityLib "../lib/job-city";

mixin (
  jobCityFavoritesStore : Map.Map<Text, JobCityTypes.JobCityFavorite>,
  jobsRef               : Map.Map<Text, Types.Job>,
) {

  // ── Job City Filtering & Favorites API ───────────────────────────────────

  /// Mark an employer as a favourite for a city.
  /// Idempotent — re-marking an existing pair is a no-op.
  public shared func markEmployerFavorite(
    userId        : Text,
    employerPhone : Text,
    city          : Text,
  ) : async Types.Result<JobCityTypes.JobCityFavorite, Text> {
    let key = JobCityLib.favoriteKey(userId, employerPhone, city);
    switch (jobCityFavoritesStore.get(key)) {
      case (?existing) { #ok(existing) };
      case null {
        let fav : JobCityTypes.JobCityFavorite = {
          id = key; userId; employerPhone; city; createdAt = Time.now()
        };
        jobCityFavoritesStore.add(key, fav);
        #ok(fav)
      };
    }
  };

  /// Remove a previously marked employer favourite.
  public shared func unmarkEmployerFavorite(
    userId        : Text,
    employerPhone : Text,
    city          : Text,
  ) : async Types.Result<Bool, Text> {
    let key = JobCityLib.favoriteKey(userId, employerPhone, city);
    switch (jobCityFavoritesStore.get(key)) {
      case null { #err("Favourite not found") };
      case (?_) {
        jobCityFavoritesStore.remove(key);
        #ok(true)
      };
    }
  };

  /// Return all employer favourites for a job-seeker.
  public query func getFavoriteEmployers(
    userId : Text,
  ) : async [JobCityTypes.JobCityFavorite] {
    jobCityFavoritesStore.values().toArray().filter(
      func(f : JobCityTypes.JobCityFavorite) : Bool { f.userId == userId }
    )
  };

  /// Search jobs in a primary city.
  /// When willingToRelocate=true, jobs in relocateCities are also returned.
  public query func searchJobsByCity(
    city              : Text,
    willingToRelocate : Bool,
    relocateCities    : [Text],
  ) : async [Types.Job] {
    let primaryLower = city.toLower();
    let relocateLowers : [Text] = if (willingToRelocate) {
      relocateCities.map<Text, Text>(func(c) { c.toLower() })
    } else { [] };
    let seen = Set.empty<Text>();
    let results = List.empty<Types.Job>();
    for ((_, job) in jobsRef.entries()) {
      let locLower = job.location.address.toLower();
      let inPrimary = locLower.contains(#text primaryLower) or primaryLower.contains(#text locLower);
      let inReloc = willingToRelocate and relocateLowers.find(
        func(rc : Text) : Bool {
          locLower.contains(#text rc) or rc.contains(#text locLower)
        }
      ) != null;
      if ((inPrimary or inReloc) and not seen.contains(job.id)) {
        seen.add(job.id);
        results.add(job);
      };
    };
    let arr = results.toArray();
    arr.sort(func(a : Types.Job, b : Types.Job) : { #less; #equal; #greater } {
      if (a.publishDate > b.publishDate) #less
      else if (a.publishDate < b.publishDate) #greater
      else #equal
    })
  };

  /// Return the distinct list of cities that have at least one active open job.
  public query func getJobCitiesAvailable() : async [Text] {
    let seen = Set.empty<Text>();
    for ((_, job) in jobsRef.entries()) {
      // Extract first token from address as city name heuristic
      let addr = job.location.address;
      if (addr != "") { seen.add(addr) };
    };
    let arr = seen.toArray();
    arr.sort()
  };

  /// Return all jobs posted by a specific employer (by phone).
  public query func getJobsByEmployer(
    employerPhone : Text,
  ) : async [Types.Job] {
    jobsRef.values().toArray().filter(
      func(j : Types.Job) : Bool {
        switch (j.contactPhone) {
          case (?p) p == employerPhone;
          case null j.posterId == employerPhone;
        }
      }
    )
  };

  /// Return all job city favourites (Data Explorer).
  public query func getAllJobCityFavorites() : async [JobCityTypes.JobCityFavorite] {
    jobCityFavoritesStore.values().toArray()
  };

};
