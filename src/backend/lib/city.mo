import CityTypes "../types/CityTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {

  public class CityLib(
    citiesById       : Map.Map<Text, CityTypes.City>,
    cityControlsById : Map.Map<Text, CityTypes.CityControl>,
  ) {

    // Monotonic counter used together with Time.now() to guarantee unique IDs.
    var idCounter : Nat = 0;

    // ── ID generation ─────────────────────────────────────────────────────────

    func nextId() : Text {
      idCounter += 1;
      "city_" # Time.now().toText() # "_" # idCounter.toText()
    };

    // ── Cities ────────────────────────────────────────────────────────────────

    public func addCity(name : Text, pincode : Text, isEnabled : Bool) : CityTypes.City {
      let city : CityTypes.City = {
        id        = nextId();
        name      = name;
        pincode   = pincode;
        isEnabled = isEnabled;
        createdAt = Time.now();
      };
      citiesById.add(city.id, city);
      // Initialise an empty CityControl for this city.
      let ctrl : CityTypes.CityControl = {
        cityId        = city.id;
        cityName      = city.name;
        pincode       = city.pincode;
        moduleToggles = [];
      };
      cityControlsById.add(city.id, ctrl);
      city
    };

    public func listCities() : [CityTypes.City] {
      let arr = citiesById.values().toArray();
      arr.sort(func(a, b) = Text.compare(a.name, b.name))
    };

    public func getCityById(cityId : Text) : ?CityTypes.City {
      citiesById.get(cityId)
    };

    public func updateCityEnabled(cityId : Text, enabled : Bool) : { #ok : CityTypes.City; #err : Text } {
      switch (citiesById.get(cityId)) {
        case null { #err("City not found: " # cityId) };
        case (?city) {
          let updated = { city with isEnabled = enabled };
          citiesById.add(cityId, updated);
          // Keep CityControl pincode/name in sync.
          switch (cityControlsById.get(cityId)) {
            case (?ctrl) {
              cityControlsById.add(cityId, { ctrl with cityName = updated.name; pincode = updated.pincode });
            };
            case null {};
          };
          #ok(updated)
        };
      }
    };

    public func updateCityPincode(cityId : Text, pincode : Text) : { #ok : CityTypes.City; #err : Text } {
      switch (citiesById.get(cityId)) {
        case null { #err("City not found: " # cityId) };
        case (?city) {
          let updated = { city with pincode = pincode };
          citiesById.add(cityId, updated);
          switch (cityControlsById.get(cityId)) {
            case (?ctrl) {
              cityControlsById.add(cityId, { ctrl with pincode = pincode });
            };
            case null {};
          };
          #ok(updated)
        };
      }
    };

    // ── City Controls ─────────────────────────────────────────────────────────

    public func getCityControl(cityId : Text) : ?CityTypes.CityControl {
      cityControlsById.get(cityId)
    };

    /// Sets a city-level module toggle.
    /// NOTE: callers must validate that the global module is enabled before
    /// calling this — a globally disabled module cannot be re-enabled here.
    public func setCityModuleEnabled(cityId : Text, moduleName : Text, enabled : Bool) : { #ok : (); #err : Text } {
      switch (cityControlsById.get(cityId)) {
        case null { #err("City not found: " # cityId) };
        case (?ctrl) {
          // Rebuild the toggles array: update existing entry or append new one.
          var found = false;
          let updated = ctrl.moduleToggles.map<(Text, Bool), (Text, Bool)>(
            func(entry : (Text, Bool)) : (Text, Bool) {
              let mName = entry.0;
              let mEnabled = entry.1;
              if (mName == moduleName) {
                found := true;
                (mName, enabled)
              } else {
                (mName, mEnabled)
              }
            }
          );
          let final_ = if (found) updated
            else updated.concat([(moduleName, enabled)]);
          cityControlsById.add(cityId, { ctrl with moduleToggles = final_ });
          #ok(())
        };
      }
    };

    /// Returns true if the city exists and is enabled.
    public func isCityEnabled(cityId : Text) : Bool {
      switch (citiesById.get(cityId)) {
        case (?city) city.isEnabled;
        case null    false;
      }
    };

    /// Returns false if city is disabled or the city has explicitly toggled the
    /// module off. Returns true when no override exists (default allow).
    public func isCityModuleEnabled(cityId : Text, moduleName : Text) : Bool {
      if (not isCityEnabled(cityId)) { return false };
      switch (cityControlsById.get(cityId)) {
        case null { true }; // no control record — default allow
        case (?ctrl) {
          switch (ctrl.moduleToggles.find(func(entry : (Text, Bool)) : Bool { entry.0 == moduleName })) {
            case (?(_, en)) en;
            case null       true; // no override — default allow
          }
        };
      }
    };

  
    /// Ensures every known module has a default enabled toggle for every city.
    /// Safe to call repeatedly — only inserts missing entries.
    public func seedDefaultCityModules() {
      let allModules = [
        "healthcare", "travel", "professional-services", "manufacturer",
        "fun-learning", "bus-booking", "train-booking", "flight-booking",
        "recharge", "bill-payments", "fastag", "insurance",
        "municipality", "old-items", "lending", "donation",
        "blog", "finance", "shopping", "jobs",
        "property", "events", "community", "matrimony"
      ];
      for ((cityId, _) in citiesById.entries()) {
        switch (cityControlsById.get(cityId)) {
          case null {};
          case (?ctrl) {
            var toggles = ctrl.moduleToggles;
            var changed = false;
            for (mod in allModules.vals()) {
              let found = toggles.find(func(entry : (Text, Bool)) : Bool { entry.0 == mod });
              if (found == null) {
                toggles := toggles.concat([(mod, true)]);
                changed := true;
              };
            };
            if (changed) {
              cityControlsById.add(cityId, { ctrl with moduleToggles = toggles });
            };
          };
        };
      };
    };

}; // end class CityLib

};
