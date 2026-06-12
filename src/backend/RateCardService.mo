import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  type RateCardSeed = {
    vehicleType : Types.VehicleType;
    serviceType : Types.ServiceType;
    baseRate : Float;
    perKmRate : Float;
    surgeMultiplier : Float;
  };

  let DEFAULT_RATE_CARDS : [RateCardSeed] = [
    // Delivery
    { vehicleType = #bike;    serviceType = #delivery; baseRate = 20.0;  perKmRate = 8.0;  surgeMultiplier = 1.0 },
    { vehicleType = #scooter; serviceType = #delivery; baseRate = 20.0;  perKmRate = 9.0;  surgeMultiplier = 1.0 },
    { vehicleType = #car;     serviceType = #delivery; baseRate = 50.0;  perKmRate = 15.0; surgeMultiplier = 1.0 },
    { vehicleType = #auto;    serviceType = #delivery; baseRate = 30.0;  perKmRate = 12.0; surgeMultiplier = 1.0 },
    { vehicleType = #van;     serviceType = #delivery; baseRate = 80.0;  perKmRate = 18.0; surgeMultiplier = 1.0 },
    { vehicleType = #truck;   serviceType = #delivery; baseRate = 120.0; perKmRate = 22.0; surgeMultiplier = 1.0 },
    // Sarthi (passenger pickup)
    { vehicleType = #bike;    serviceType = #sarthi;   baseRate = 30.0;  perKmRate = 10.0; surgeMultiplier = 1.0 },
    { vehicleType = #scooter; serviceType = #sarthi;   baseRate = 30.0;  perKmRate = 10.0; surgeMultiplier = 1.0 },
    { vehicleType = #auto;    serviceType = #sarthi;   baseRate = 40.0;  perKmRate = 12.0; surgeMultiplier = 1.0 },
    { vehicleType = #car;     serviceType = #sarthi;   baseRate = 80.0;  perKmRate = 18.0; surgeMultiplier = 1.0 },
    { vehicleType = #van;     serviceType = #sarthi;   baseRate = 100.0; perKmRate = 20.0; surgeMultiplier = 1.0 },
    { vehicleType = #bus;     serviceType = #sarthi;   baseRate = 150.0; perKmRate = 25.0; surgeMultiplier = 1.0 },
  ];

  public class RateCardService(
    rateCards         : Map.Map<Text, Types.DeliveryRateCard>,
    rateCardByVehicle : Map.Map<Text, Text>,
  ) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "rc_" # nextId.toText()
    };

    func vehicleTypeKey(vt : Types.VehicleType) : Text {
      switch (vt) {
        case (#bike)    "bike";
        case (#scooter) "scooter";
        case (#car)     "car";
        case (#auto)    "auto";
        case (#van)     "van";
        case (#truck)   "truck";
        case (#tempo)   "tempo";
        case (#bus)     "bus";
      }
    };

    func serviceTypeKey(st : Types.ServiceType) : Text {
      switch (st) {
        case (#delivery) "delivery";
        case (#sarthi)   "sarthi";
      }
    };

    func compositeKey(vt : Types.VehicleType, st : Types.ServiceType) : Text {
      vehicleTypeKey(vt) # "_" # serviceTypeKey(st)
    };

    // Seed default rate cards — call once during actor init
    public func seedDefaults() {
      for (seed in DEFAULT_RATE_CARDS.values()) {
        let ckey = compositeKey(seed.vehicleType, seed.serviceType);
        switch (rateCardByVehicle.get(ckey)) {
          case (?_) {}; // already seeded
          case null {
            let id = genId();
            let card : Types.DeliveryRateCard = {
              id;
              vehicleType     = seed.vehicleType;
              serviceType     = seed.serviceType;
              baseRate        = seed.baseRate;
              perKmRate       = seed.perKmRate;
              surgeMultiplier = seed.surgeMultiplier;
              isActive        = true;
            };
            rateCards.add(id, card);
            rateCardByVehicle.add(ckey, id);
          };
        };
      };
    };

    public func createRateCard(
      vehicleType     : Types.VehicleType,
      serviceType     : Types.ServiceType,
      baseRate        : Float,
      perKmRate       : Float,
      surgeMultiplier : Float,
    ) : Types.Result<Types.DeliveryRateCard, Types.ApiError> {
      let id = genId();
      let card : Types.DeliveryRateCard = {
        id;
        vehicleType;
        serviceType;
        baseRate;
        perKmRate;
        surgeMultiplier;
        isActive = true;
      };
      rateCards.add(id, card);
      rateCardByVehicle.add(compositeKey(vehicleType, serviceType), id);
      #ok(card)
    };

    public func getRateCard(vehicleType : Types.VehicleType) : Types.Result<Types.DeliveryRateCard, Types.ApiError> {
      // Try delivery first, then sarthi
      let ckey = compositeKey(vehicleType, #delivery);
      switch (rateCardByVehicle.get(ckey)) {
        case null #err(#notFound);
        case (?id) {
          switch (rateCards.get(id)) {
            case (?rc) #ok(rc);
            case null #err(#notFound);
          }
        };
      }
    };

    public func getRateCardByVehicleAndService(
      vehicleType : Types.VehicleType,
      serviceType : Types.ServiceType,
    ) : ?Types.DeliveryRateCard {
      let ckey = compositeKey(vehicleType, serviceType);
      switch (rateCardByVehicle.get(ckey)) {
        case null null;
        case (?id) rateCards.get(id);
      }
    };

    public func getAllRateCards() : [Types.DeliveryRateCard] {
      let results = List.empty<Types.DeliveryRateCard>();
      for ((_, rc) in rateCards.entries()) {
        results.add(rc);
      };
      results.toArray()
    };

    public func updateRateCard(
      id              : Text,
      baseRate        : Float,
      perKmRate       : Float,
      surgeMultiplier : Float,
    ) : Types.Result<Types.DeliveryRateCard, Types.ApiError> {
      switch (rateCards.get(id)) {
        case null #err(#notFound);
        case (?rc) {
          let updated = { rc with baseRate; perKmRate; surgeMultiplier };
          rateCards.add(id, updated);
          #ok(updated)
        };
      }
    };

    public func deleteRateCard(id : Text) : Types.Result<Text, Types.ApiError> {
      switch (rateCards.get(id)) {
        case null #err(#notFound);
        case (?rc) {
          // Remove from vehicle lookup
          let ckey = compositeKey(rc.vehicleType, rc.serviceType);
          rateCardByVehicle.remove(ckey);
          rateCards.remove(id);
          #ok(id)
        };
      }
    };

    public func toggleRateCardActive(id : Text) : Types.Result<Types.DeliveryRateCard, Types.ApiError> {
      switch (rateCards.get(id)) {
        case null #err(#notFound);
        case (?rc) {
          let updated = { rc with isActive = not rc.isActive };
          rateCards.add(id, updated);
          #ok(updated)
        };
      }
    };

    public func calculateFare(
      vehicleType : Types.VehicleType,
      serviceType : Types.ServiceType,
      distanceKm  : Float,
    ) : Float {
      switch (getRateCardByVehicleAndService(vehicleType, serviceType)) {
        case null { 20.0 + distanceKm * 10.0 };
        case (?rc) { rc.baseRate + rc.perKmRate * distanceKm * rc.surgeMultiplier };
      }
    };

  }; // end class RateCardService
};
