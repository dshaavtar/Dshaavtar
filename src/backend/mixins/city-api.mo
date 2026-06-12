import CityTypes "../types/CityTypes";
import CityLib "../lib/city";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";

mixin (
  citiesById       : Map.Map<Text, CityTypes.City>,
  cityControlsById : Map.Map<Text, CityTypes.CityControl>,
) {

  transient let citySvc = CityLib.CityLib(citiesById, cityControlsById);

  // ── City management ───────────────────────────────────────────────────────

  /// Add a new city with a name and pincode.
  /// Validates that both fields are non-empty and that pincode contains only
  /// digits (1–10 characters accepted to support various country formats).
  public func addCity(name : Text, pincode : Text) : async { #ok : CityTypes.City; #err : Text } {
    if (name.size() == 0) {
      return #err("City name is required");
    };
    if (pincode.size() == 0) {
      return #err("Pincode is required");
    };
    // Validate that every character in the pincode is a digit.
    let allDigits = pincode.toArray().all(func(c : Char) : Bool {
      c >= '0' and c <= '9'
    });
    if (not allDigits) {
      return #err("Pincode must contain only digits");
    };
    #ok(citySvc.addCity(name, pincode, true))
  };

  public query func listCities() : async [CityTypes.City] {
    citySvc.listCities()
  };

  /// Enable or disable a city. When disabled, all flows except customer
  /// registration are blocked for users in that city.
  public func updateCityEnabled(cityId : Text, enabled : Bool) : async { #ok : CityTypes.City; #err : Text } {
    citySvc.updateCityEnabled(cityId, enabled)
  };

  /// Update the pincode of an existing city.
  public func updateCityPincode(cityId : Text, pincode : Text) : async { #ok : CityTypes.City; #err : Text } {
    citySvc.updateCityPincode(cityId, pincode)
  };

  // ── City module toggles ───────────────────────────────────────────────────

  public query func getCityControl(cityId : Text) : async ?CityTypes.CityControl {
    citySvc.getCityControl(cityId)
  };

  /// Set a per-city module toggle. Global module disable locks everywhere —
  /// callers must check the global toggle before calling this.
  public func setCityModuleEnabled(cityId : Text, moduleName : Text, enabled : Bool) : async { #ok : (); #err : Text } {
    citySvc.setCityModuleEnabled(cityId, moduleName, enabled)
  };

  /// Returns true only when the city is enabled AND has no override disabling the module.
  public query func isCityModuleEnabled(cityId : Text, moduleName : Text) : async Bool {
    citySvc.isCityModuleEnabled(cityId, moduleName)
  };

  /// Returns true when the city exists and is enabled.
  public query func isCityEnabled(cityId : Text) : async Bool {
    citySvc.isCityEnabled(cityId)
  };

  /// Returns a flat list of city rows for the Data Explorer table.
  public query func getCitiesForDataExplorer() : async [CityTypes.CityRow] {
    let cities = citySvc.listCities();
    cities.map<CityTypes.City, CityTypes.CityRow>(
      func(c) {
        {
          id        = c.id;
          cityName  = c.name;
          pincode   = c.pincode;
          isEnabled = c.isEnabled;
          createdAt = c.createdAt;
        }
      }
    )
  };

  /// Update city name and/or add more pincodes.
  public func updateCity(cityId : Text, name : Text, pincode : Text) : async { #ok : CityTypes.City; #err : Text } {
    if (name.size() == 0) {
      return #err("City name is required");
    };
    switch (citiesById.get(cityId)) {
      case null { #err("City not found: " # cityId) };
      case (?existing) {
        let updated : CityTypes.City = { existing with name; pincode };
        citiesById.add(cityId, updated);
        #ok(updated)
      };
    }
  };

  /// Delete a city record and its associated controls.
  public func deleteCity(cityId : Text) : async Bool {
    switch (citiesById.get(cityId)) {
      case null { false };
      case (?_) {
        citiesById.remove(cityId);
        cityControlsById.remove(cityId);
        true
      };
    }
  };

  /// Upsert a per-city module toggle.
  public func saveCityControl(cityId : Text, moduleName : Text, enabled : Bool) : async { #ok : (); #err : Text } {
    citySvc.setCityModuleEnabled(cityId, moduleName, enabled)
  };

  /// Return all CityControl rows for a specific city.
  public query func getCityControlsForCity(cityId : Text) : async ?CityTypes.CityControl {
    citySvc.getCityControl(cityId)
  };

  /// City module controls expanded into one row per module override per city.
  /// Cities that have no overrides produce a single placeholder row so the
  /// Data Explorer table is never empty when cities exist.
  public query func getCityControlsForDataExplorer() : async [{
    cityId     : Text;
    cityName   : Text;
    moduleName : Text;
    enabled    : Bool;
  }] {
    let results = List.empty<{
      cityId     : Text;
      cityName   : Text;
      moduleName : Text;
      enabled    : Bool;
    }>();
    for ((_, ctrl) in cityControlsById.entries()) {
      if (ctrl.moduleToggles.size() == 0) {
        // City exists but has no per-module overrides — emit a placeholder row.
        results.add({
          cityId     = ctrl.cityId;
          cityName   = ctrl.cityName;
          moduleName = "(no overrides set)";
          enabled    = true;
        });
      } else {
        for (toggle in ctrl.moduleToggles.values()) {
          results.add({
            cityId     = ctrl.cityId;
            cityName   = ctrl.cityName;
            moduleName = toggle.0;
            enabled    = toggle.1;
          });
        };
      };
    };
    results.toArray()
  };

  public query func getCityModules(cityId : Text) : async [{ moduleName : Text; enabled : Bool }] {
    let allModules : [Text] = ["healthcare", "travel", "professional-services", "manufacturer", "fun-learning", "bus-booking", "train-booking", "flight-booking", "recharge", "bill-payments", "fastag", "insurance", "municipality", "old-items", "lending", "donation", "blog", "finance", "shopping", "jobs", "property", "events", "community", "matrimony"];
    let ctrl = cityControlsById.get(cityId);
    allModules.map<Text, { moduleName : Text; enabled : Bool }>(func(mod) {
      let enabled = switch (ctrl) {
        case (?c) {
          switch (c.moduleToggles.find(func((m, _) : (Text, Bool)) : Bool { m == mod })) {
            case (?(_, flag)) { flag };
            case null { true };
          }
        };
        case null { true };
      };
      { moduleName = mod; enabled = enabled }
    })
  };

  public query func getAllCities() : async [CityTypes.City] {
    citiesById.values().toArray()
  };
};
