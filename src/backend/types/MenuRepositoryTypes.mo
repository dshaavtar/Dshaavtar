module {

  // A single menu option in the centralized menu repository.
  // Replaces all hardcoded per-surface menu lists.
  public type MenuOption = {
    id            : Text;
    optionLabel   : Text;
    flowId        : Text;   // references FlowDefinition.id in flowsStore
    roles         : [Text]; // ["customer","merchant","deliveryPartner","all"]
    cityModuleKey : Text;   // module toggle key checked against CityControl.moduleToggles
    sortOrder     : Nat;
    isActive      : Bool;
    createdAt     : Int;
    updatedAt     : Int;
  };

};
