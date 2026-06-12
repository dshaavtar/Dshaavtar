module {

  /// A city that can be enabled or disabled for operations.
  public type City = {
    id        : Text;
    name      : Text;
    pincode   : Text;
    isEnabled : Bool;
    createdAt : Int;
  };

  /// Per-city module toggle state.
  /// moduleToggles maps module name → enabled flag for this city.
  public type CityControl = {
    cityId        : Text;
    cityName      : Text;
    pincode       : Text;
    moduleToggles : [(Text, Bool)];
  };

  /// Flat row shape returned by getCitiesForDataExplorer.
  public type CityRow = {
    id        : Text;
    cityName  : Text;
    pincode   : Text;
    isEnabled : Bool;
    createdAt : Int;
  };

};
