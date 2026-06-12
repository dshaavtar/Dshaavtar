import Debug "mo:core/Debug";
import Types "../Types";
import PSTypes "../types/ProfessionalServiceTypes";
import FamilyTypes "../types/FamilyTypes";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Utils "../Utils";

module {

  // ── Healthcare Provider ───────────────────────────────────────────────────

  public func registerHealthcareProvider(
    store          : Map.Map<Text, PSTypes.HealthcareProvider>,
    name           : Text,
    specialization : Text,
    consultationFee : Float,
    address        : Text,
    city           : Text,
    availability   : Text,
    phone          : Text,
  ) : PSTypes.HealthcareProvider {
    let now = Time.now();
    let id  = "hp_" # now.toText() # "_" # name;
    let provider : PSTypes.HealthcareProvider = {
      id;
      name;
      specialization;
      consultationFee;
      address;
      city;
      availability;
      phone;
      rating    = 0.0;
      createdAt = now;
    };
    store.add(id, provider);
    provider
  };

  public func searchHealthcareProviders(
    store          : Map.Map<Text, PSTypes.HealthcareProvider>,
    specialization : ?Text,
    city           : ?Text,
  ) : [PSTypes.HealthcareProvider] {
    store.values().toArray().filter(func(p : PSTypes.HealthcareProvider) : Bool {
      let specMatch = switch (specialization) {
        case null true;
        case (?s) p.specialization.toLower().contains(#text s.toLower());
      };
      let cityMatch = switch (city) {
        case null true;
        case (?c) p.city.toLower().contains(#text c.toLower());
      };
      specMatch and cityMatch
    })
  };

  public func bookHealthcareAppointment(
    store         : Map.Map<Text, PSTypes.HealthcareAppointment>,
    providerId    : Text,
    customerPhone : Text,
    date          : Text,
    timeSlot      : Text,
    notes         : Text,
  ) : PSTypes.HealthcareAppointment {
    let now = Time.now();
    let id  = "ha_" # now.toText() # "_" # customerPhone;
    let appt : PSTypes.HealthcareAppointment = {
      id;
      providerId;
      customerPhone;
      date;
      timeSlot;
      status    = #pending;
      notes;
      createdAt = now;
    };
    store.add(id, appt);
    appt
  };

  public func getHealthcareAppointmentsByCustomer(
    store         : Map.Map<Text, PSTypes.HealthcareAppointment>,
    customerPhone : Text,
  ) : [PSTypes.HealthcareAppointment] {
    store.values().toArray().filter(func(a : PSTypes.HealthcareAppointment) : Bool {
      a.customerPhone == customerPhone
    })
  };

  public func getHealthcareAppointmentsByProvider(
    store      : Map.Map<Text, PSTypes.HealthcareAppointment>,
    providerId : Text,
  ) : [PSTypes.HealthcareAppointment] {
    store.values().toArray().filter(func(a : PSTypes.HealthcareAppointment) : Bool {
      a.providerId == providerId
    })
  };

  public func updateHealthcareAppointmentStatus(
    store         : Map.Map<Text, PSTypes.HealthcareAppointment>,
    appointmentId : Text,
    status        : PSTypes.AppointmentStatus,
  ) : ?PSTypes.HealthcareAppointment {
    switch (store.get(appointmentId)) {
      case null null;
      case (?appt) {
        let updated = { appt with status };
        store.add(appointmentId, updated);
        ?updated
      };
    }
  };

  // ── Tour Operator ─────────────────────────────────────────────────────────

  public func registerTourOperator(
    store          : Map.Map<Text, PSTypes.TourOperator>,
    name           : Text,
    destinations   : [Text],
    tourTypes      : [Text],
    duration       : Text,
    pricePerPerson : Float,
    maxPassengers  : Nat,
    phone          : Text,
    city           : Text,
  ) : PSTypes.TourOperator {
    let now = Time.now();
    let id  = "to_" # now.toText() # "_" # name;
    let op : PSTypes.TourOperator = {
      id;
      name;
      destinations;
      tourTypes;
      duration;
      pricePerPerson;
      maxPassengers;
      phone;
      city;
      rating    = 0.0;
      createdAt = now;
    };
    store.add(id, op);
    op
  };

  public func searchTourOperators(
    store       : Map.Map<Text, PSTypes.TourOperator>,
    destination : ?Text,
    city        : ?Text,
  ) : [PSTypes.TourOperator] {
    store.values().toArray().filter(func(op : PSTypes.TourOperator) : Bool {
      let destMatch = switch (destination) {
        case null true;
        case (?d) {
          let dl = d.toLower();
          op.destinations.find(func(dd : Text) : Bool { dd.toLower().contains(#text dl) }) != null
        };
      };
      let cityMatch = switch (city) {
        case null true;
        case (?c) op.city.toLower().contains(#text c.toLower());
      };
      destMatch and cityMatch
    })
  };

  public func bookTour(
    store          : Map.Map<Text, PSTypes.TourBooking>,
    operatorId     : Text,
    customerPhone  : Text,
    destination    : Text,
    tourType       : Text,
    date           : Text,
    passengerCount : Nat,
    pricePerPerson : Float,
  ) : PSTypes.TourBooking {
    let now        = Time.now();
    let id         = "tb_" # now.toText() # "_" # customerPhone;
    let totalPrice = pricePerPerson * passengerCount.toFloat();
    let booking : PSTypes.TourBooking = {
      id;
      operatorId;
      customerPhone;
      destination;
      tourType;
      date;
      passengerCount;
      totalPrice;
      status    = #pending;
      createdAt = now;
    };
    store.add(id, booking);
    booking
  };

  public func getTourBookingsByCustomer(
    store         : Map.Map<Text, PSTypes.TourBooking>,
    customerPhone : Text,
  ) : [PSTypes.TourBooking] {
    store.values().toArray().filter(func(b : PSTypes.TourBooking) : Bool {
      b.customerPhone == customerPhone
    })
  };

  public func getTourBookingsByOperator(
    store      : Map.Map<Text, PSTypes.TourBooking>,
    operatorId : Text,
  ) : [PSTypes.TourBooking] {
    store.values().toArray().filter(func(b : PSTypes.TourBooking) : Bool {
      b.operatorId == operatorId
    })
  };

  public func updateTourBookingStatus(
    store     : Map.Map<Text, PSTypes.TourBooking>,
    bookingId : Text,
    status    : PSTypes.TourBookingStatus,
  ) : ?PSTypes.TourBooking {
    switch (store.get(bookingId)) {
      case null null;
      case (?b) {
        let updated = { b with status };
        store.add(bookingId, updated);
        ?updated
      };
    }
  };

  // ── Professional Service ──────────────────────────────────────────────────

  public func registerProfessionalService(
    store          : Map.Map<Text, PSTypes.ProfessionalService>,
    merchantPhone  : Text,
    serviceType    : Text,
    specialization : Text,
    pricePerHour   : Float,
    address        : Text,
    city           : Text,
    availability   : Text,
    areaRates      : [(Text, Float)],
  ) : PSTypes.ProfessionalService {
    let now = Time.now();
    let id  = "ps_" # now.toText() # "_" # merchantPhone;
    let svc : PSTypes.ProfessionalService = {
      id;
      merchantPhone;
      serviceType;
      specialization;
      pricePerHour;
      areaRates;
      address;
      city;
      availability;
      rating    = 0.0;
      createdAt = now;
    };
    store.add(id, svc);
    svc
  };

  /// Returns all professional services matching serviceType/city filters.
  /// Each service carries its full areaRates list; callers can compute the
  /// applied rate for a given area using getAppliedRate.
  public func searchProfessionalServices(
    store        : Map.Map<Text, PSTypes.ProfessionalService>,
    serviceType  : ?Text,
    city         : ?Text,
  ) : [PSTypes.ProfessionalService] {
    store.values().toArray().filter(func(s : PSTypes.ProfessionalService) : Bool {
      let typeMatch = switch (serviceType) {
        case null true;
        case (?t) s.serviceType.toLower().contains(#text t.toLower());
      };
      let cityMatch = switch (city) {
        case null true;
        case (?c) s.city.toLower().contains(#text c.toLower());
      };
      typeMatch and cityMatch
    })
  };

  public func bookProfessionalService(
    store         : Map.Map<Text, PSTypes.ServiceBooking>,
    serviceId     : Text,
    customerPhone : Text,
    date          : Text,
    timeSlot      : Text,
    duration      : Nat,
    pricePerHour  : Float,
    notes         : Text,
  ) : PSTypes.ServiceBooking {
    let now        = Time.now();
    let id         = "sb_" # now.toText() # "_" # customerPhone;
    let totalPrice = pricePerHour * duration.toFloat();
    let booking : PSTypes.ServiceBooking = {
      id;
      serviceId;
      customerPhone;
      date;
      timeSlot;
      duration;
      totalPrice;
      status    = #pending;
      notes;
      createdAt = now;
    };
    store.add(id, booking);
    booking
  };

  public func getServiceBookingsByCustomer(
    store         : Map.Map<Text, PSTypes.ServiceBooking>,
    customerPhone : Text,
  ) : [PSTypes.ServiceBooking] {
    store.values().toArray().filter(func(b : PSTypes.ServiceBooking) : Bool {
      b.customerPhone == customerPhone
    })
  };

  public func getServiceBookingsByProvider(
    store         : Map.Map<Text, PSTypes.ServiceBooking>,
    merchantPhone : Text,
    servicesStore : Map.Map<Text, PSTypes.ProfessionalService>,
  ) : [PSTypes.ServiceBooking] {
    store.values().toArray().filter(func(b : PSTypes.ServiceBooking) : Bool {
      switch (servicesStore.get(b.serviceId)) {
        case null false;
        case (?svc) svc.merchantPhone == merchantPhone;
      }
    })
  };

  public func updateServiceBookingStatus(
    store     : Map.Map<Text, PSTypes.ServiceBooking>,
    bookingId : Text,
    status    : PSTypes.ServiceBookingStatus,
  ) : ?PSTypes.ServiceBooking {
    switch (store.get(bookingId)) {
      case null null;
      case (?b) {
        let updated = { b with status };
        store.add(bookingId, updated);
        ?updated
      };
    }
  };

  // ── Dashboard Data
  // ── City Areas ────────────────────────────────────────────────────────────

  /// Returns the fixed list of key areas for a given city.
  /// Falls back to a generic "Default" area list for unknown cities.
  public func getCityAreas(city : Text) : [Text] {
    let c = city.toLower().trimStart(#char ' ').trimEnd(#char ' ');
    if (c.contains(#text "mumbai") or c.contains(#text "bombay")) {
      ["Andheri", "Bandra", "Borivali", "Dadar", "Kurla", "Thane", "Navi Mumbai", "Powai", "Vashi", "Goregaon"]
    } else if (c.contains(#text "delhi") or c.contains(#text "new delhi")) {
      ["Connaught Place", "Dwarka", "Janakpuri", "Karol Bagh", "Lajpat Nagar", "Rohini", "Saket", "Vasant Kunj", "Noida", "Gurgaon"]
    } else if (c.contains(#text "bangalore") or c.contains(#text "bengaluru")) {
      ["Whitefield", "Koramangala", "Indiranagar", "Jayanagar", "HSR Layout", "Marathahalli", "Malleshwaram", "Hebbal", "Electronic City", "Yelahanka"]
    } else if (c.contains(#text "chennai")) {
      ["Anna Nagar", "T Nagar", "Adyar", "Velachery", "Porur", "Ambattur", "Tambaram", "Mylapore", "Sholinganallur", "Chromepet"]
    } else if (c.contains(#text "hyderabad")) {
      ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitech City", "Secunderabad", "Kukatpally", "Ameerpet", "Begumpet", "Madhapur", "Kondapur"]
    } else if (c.contains(#text "pune")) {
      ["Kothrud", "Viman Nagar", "Hadapsar", "Baner", "Wakad", "Hinjewadi", "Deccan", "Shivajinagar", "Pimpri", "Chinchwad"]
    } else if (c.contains(#text "ahmedabad")) {
      ["Navrangpura", "Satellite", "Bopal", "Prahlad Nagar", "Maninagar", "Vastrapur", "CG Road", "SG Road", "Chandkheda", "Nikol"]
    } else {
      ["Central", "North", "South", "East", "West", "Outskirts", "Industrial", "Suburban", "Downtown", "Old City"]
    }
  };

  /// Returns the applicable rate for a professional service in the customer's area.
  /// If area is provided and the professional has set a rate for it, that rate is returned.
  /// Otherwise the global pricePerHour fallback is used.
  public func getAppliedRate(svc : PSTypes.ProfessionalService, area : ?Text) : Float {
    switch (area) {
      case null svc.pricePerHour;
      case (?a) {
        let aLower = a.toLower();
        switch (svc.areaRates.find(func((name, _rate) : (Text, Float)) : Bool {
          name.toLower() == aLower
        })) {
          case (?(_, rate)) rate;
          case null svc.pricePerHour;
        }
      };
    }
  };

  /// Set or update a rate for a specific area on a professional service.
  /// Only the owning merchant (by phone) may update their own rates.
  public func setAreaRate(
    store         : Map.Map<Text, PSTypes.ProfessionalService>,
    serviceId     : Text,
    merchantPhone : Text,
    area          : Text,
    rate          : Float,
  ) : ?PSTypes.ProfessionalService {
    switch (store.get(serviceId)) {
      case null null;
      case (?svc) {
        if (svc.merchantPhone != merchantPhone) return null;
        // Remove existing entry for this area (case-insensitive), then add new
        let aLower = area.toLower();
        let filtered = svc.areaRates.filter(func((name, _r) : (Text, Float)) : Bool {
          name.toLower() != aLower
        });
        let newRates : [(Text, Float)] = filtered.concat([(area, rate)]);
        let updated : PSTypes.ProfessionalService = { svc with areaRates = newRates; updatedAt = Time.now() };
        store.add(serviceId, updated);
        ?updated
      };
    }
  };

  /// Remove the area-specific rate for the given area from a professional service.
  public func removeAreaRate(
    store         : Map.Map<Text, PSTypes.ProfessionalService>,
    serviceId     : Text,
    merchantPhone : Text,
    area          : Text,
  ) : ?PSTypes.ProfessionalService {
    switch (store.get(serviceId)) {
      case null null;
      case (?svc) {
        if (svc.merchantPhone != merchantPhone) return null;
        let aLower = area.toLower();
        let newRates = svc.areaRates.filter(func((name, _r) : (Text, Float)) : Bool {
          name.toLower() != aLower
        });
        let updated : PSTypes.ProfessionalService = { svc with areaRates = newRates; updatedAt = Time.now() };
        store.add(serviceId, updated);
        ?updated
      };
    }
  };

  public func getMerchantDashboardData(
    merchantPhone         : Text,
    merchantsById         : Map.Map<Text, Types.Merchant>,
    ordersById            : Map.Map<Text, Types.Order>,
    subscriptionsStore    : Map.Map<Text, Types.UserSubscription>,
    plansStore            : Map.Map<Text, Types.SubscriptionPlan>,
    professionalServices  : Map.Map<Text, PSTypes.ProfessionalService>,
    serviceBookings       : Map.Map<Text, PSTypes.ServiceBooking>,
    usersByPhone          : Map.Map<Text, Types.User>,
  ) : PSTypes.MerchantDashboardData {
    let passdigitRequired : Bool = switch (usersByPhone.get(merchantPhone)) {
      case null false;
      case (?u) u.passdigit == "" or u.sessionLocked;
    };
    let subscriptionStatus : Text = switch (subscriptionsStore.get(merchantPhone)) {
      case null "inactive";
      case (?sub) {
        let now = Time.now();
        if (sub.isActive and sub.endDate > now) "active" else "inactive"
      };
    };
    let merchantId : Text = switch (merchantsById.values().toArray().find(func(m : Types.Merchant) : Bool { m.userId == merchantPhone })) {
      case null "";
      case (?m) m.id;
    };
    let serviceTypeMap = Map.empty<Text, Nat>();
    var pendingBookings : Nat = 0;
    var recentOrders    : Nat = 0;
    if (merchantId != "") {
      for ((_, o) in ordersById.entries()) {
        if (o.merchantId == merchantId) {
          recentOrders += 1;
          switch (o.status) {
            case (#pending) { pendingBookings += 1 };
            case (#new_)    { pendingBookings += 1 };
            case _ {};
          };
        };
      };
    };
    for ((_, svc) in professionalServices.entries()) {
      if (svc.merchantPhone == merchantPhone) {
        let prev = switch (serviceTypeMap.get(svc.serviceType)) { case (?v) v; case null 0 };
        serviceTypeMap.add(svc.serviceType, prev + 1);
      };
    };
    {
      subscriptionStatus;
      passdigitRequired;
      servicesByType   = serviceTypeMap.toArray();
      pendingBookings;
      recentOrders;
      earningsByDate   = [];
    }
  };

  public func getDeliveryDashboardData(
    partnerPhone       : Text,
    dpByUserId         : Map.Map<Text, Types.DeliveryPartner>,
    ordersById         : Map.Map<Text, Types.Order>,
    subscriptionsStore : Map.Map<Text, Types.UserSubscription>,
    plansStore         : Map.Map<Text, Types.SubscriptionPlan>,
    usersByPhone       : Map.Map<Text, Types.User>,
  ) : PSTypes.DeliveryDashboardData {
    let passdigitRequired : Bool = switch (usersByPhone.get(partnerPhone)) {
      case null false;
      case (?u) u.passdigit == "" or u.sessionLocked;
    };
    let subscriptionStatus : Text = switch (subscriptionsStore.get(partnerPhone)) {
      case null "inactive";
      case (?sub) {
        let now = Time.now();
        if (sub.isActive and sub.endDate > now) "active" else "inactive"
      };
    };
    let dpOpt = dpByUserId.get(partnerPhone);
    let dpId : Text = switch (dpOpt) { case (?dp) dp.id; case null "" };
    let rating : Float = switch (dpOpt) { case (?dp) dp.avgRating; case null 0.0 };
    var activeDeliveries : Nat = 0;
    var totalEarnings    : Float = 0.0;
    for ((_, o) in ordersById.entries()) {
      switch (o.deliveryPartnerId) {
        case null {};
        case (?pid) {
          if (pid == dpId or pid == partnerPhone) {
            switch (o.status) {
              case (#assigned)  { activeDeliveries += 1 };
              case (#inTransit) { activeDeliveries += 1 };
              case (#completed) { totalEarnings += o.deliveryCharge };
              case _ {};
            };
          };
        };
      };
    };
    { subscriptionStatus; passdigitRequired; activeDeliveries; totalEarnings; rating }
  };

  public func getCustomerDashboardData(
    customerPhone      : Text,
    ordersById         : Map.Map<Text, Types.Order>,
    familyStore        : Map.Map<Text, FamilyTypes.FamilyMember>,
    subscriptionsStore : Map.Map<Text, Types.UserSubscription>,
    usersByPhone       : Map.Map<Text, Types.User>,
  ) : PSTypes.CustomerDashboardData {
    var totalExpenditure : Float = 0.0;
    let expByCategoryMap  = Map.empty<Text, Float>();
    let ordersByCategoryMap = Map.empty<Text, Nat>();
    for ((_, o) in ordersById.entries()) {
      if (o.customerId == customerPhone) {
        totalExpenditure += o.totalAmount;
        let category : Text = "other";
        let prevExp = switch (expByCategoryMap.get(category)) { case (?v) v; case null 0.0 };
        expByCategoryMap.add(category, prevExp + o.totalAmount);
        let prevOrd = switch (ordersByCategoryMap.get(category)) { case (?v) v; case null 0 };
        ordersByCategoryMap.add(category, prevOrd + 1);
      };
    };
    var familyMemberCount : Nat = 0;
    for ((_, fm) in familyStore.entries()) {
      if (fm.ownerPhone == customerPhone) { familyMemberCount += 1 };
    };
    var activeSubscriptions : Nat = 0;
    switch (subscriptionsStore.get(customerPhone)) {
      case null {};
      case (?sub) {
        let now = Time.now();
        if (sub.isActive and sub.endDate > now) { activeSubscriptions := 1 };
      };
    };
    {
      totalExpenditure;
      expenditureByCategory = expByCategoryMap.toArray();
      ordersByCategory      = ordersByCategoryMap.toArray();
      familyMemberCount;
      activeSubscriptions;
    }
  };

};
