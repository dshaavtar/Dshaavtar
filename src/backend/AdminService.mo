import Types "Types";
import EventTypes "types/EventTypes";
import FamilyTypes "types/FamilyTypes";
import PromotionTypes "types/PromotionTypes";
import ChatbotEngine "ChatbotEngine";
import UserService "UserService";
import MerchantService "MerchantService";
import DeliveryPartnerService "DeliveryPartnerService";
import JobService "JobService";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Utils "Utils";

module {

  public class AdminService(
    botEngine   : ChatbotEngine.ChatbotEngine,
    userSvc     : UserService.UserService,
    merchantSvc : MerchantService.MerchantService,
    dpSvc       : DeliveryPartnerService.DeliveryPartnerService,
    jobSvc      : JobService.JobService,
    employees   : Map.Map<Text, Types.Employee>,
    apiKeys     : Map.Map<Text, Types.ApiKey>,
    apiUsageLogs : Map.Map<Text, Types.ApiUsageLog>,
    ordersById  : Map.Map<Text, Types.Order>,
    propertiesById : Map.Map<Text, Types.Property>,
    leadsById   : Map.Map<Text, Types.Lead>,
    eventsById  : Map.Map<Text, EventTypes.Event>,
    familyById  : Map.Map<Text, FamilyTypes.FamilyMember>,
    promotionsById : Map.Map<Text, PromotionTypes.Promotion>,
  ) {

    var nextEmpId : Nat = 0;
    var nextKeyId : Nat = 0;
    var nextLogId : Nat = 0;

    func genEmpId() : Text {
      nextEmpId += 1;
      "emp_" # nextEmpId.toText()
    };

    func genKeyId() : Text {
      nextKeyId += 1;
      "key_" # nextKeyId.toText()
    };

    func genLogId() : Text {
      nextLogId += 1;
      "log_" # nextLogId.toText()
    };

    func genApiKeyValue() : Text {
      // Generate a pseudo-random 32-char key from timestamp
      let ts = Time.now();
      let raw = Int.abs(ts).toText();
      let prefix = "wc_";
      let padded = prefix # raw;
      if (padded.size() >= 32) {
        padded.size().toText() # raw
      } else {
        padded # "0000000000000000000000000000000"
      }
    };

    // ── Employee Management ───────────────────────────────────────────────────

    public func addEmployee(
      name         : Text,
      email        : Text,
      phone        : Text,
      passwordHash : Text,
      role         : Types.EmployeeRole,
      permissions  : [Text],
    ) : Types.Result<Types.Employee, Types.ApiError> {
      // Check for duplicate email
      for ((_, emp) in employees.entries()) {
        if (emp.email == email) {
          return #err(#alreadyExists);
        };
      };
      let emp : Types.Employee = {
        id = genEmpId();
        name;
        email;
        phone;
        passwordHash;
        role;
        permissions;
        isActive = true;
        createdAt = Time.now();
      };
      employees.add(emp.id, emp);
      #ok(emp)
    };

    public func getEmployee(id : Text) : ?Types.Employee {
      employees.get(id)
    };

    public func listEmployees() : [Types.Employee] {
      let results = List.empty<Types.Employee>();
      for ((_, emp) in employees.entries()) {
        results.add(emp);
      };
      results.toArray()
    };

    public func updateEmployee(
      id          : Text,
      name        : Text,
      email       : Text,
      phone       : Text,
      role        : Types.EmployeeRole,
      permissions : [Text],
    ) : Types.Result<Types.Employee, Types.ApiError> {
      switch (employees.get(id)) {
        case null #err(#notFound);
        case (?emp) {
          let updated = { emp with name; email; phone; role; permissions };
          employees.add(id, updated);
          #ok(updated)
        };
      }
    };

    public func deleteEmployee(id : Text) : Types.Result<Text, Types.ApiError> {
      switch (employees.get(id)) {
        case null #err(#notFound);
        case (?_) {
          employees.remove(id);
          #ok(id)
        };
      }
    };

    public func setEmployeeActive(id : Text, isActive : Bool) : Types.Result<Types.Employee, Types.ApiError> {
      switch (employees.get(id)) {
        case null #err(#notFound);
        case (?emp) {
          let updated = { emp with isActive };
          employees.add(id, updated);
          #ok(updated)
        };
      }
    };

    /// Verify employee login by email and password hash comparison.
    public func verifyEmployeeLogin(email : Text, passwordHash : Text) : Types.Result<Types.Employee, Text> {
      for ((_, emp) in employees.entries()) {
        if (emp.email == email and emp.passwordHash == passwordHash and emp.isActive) {
          return #ok(emp);
        };
      };
      #err("Invalid email or password")
    };

    // ── API Key Management ─────────────────────────────────────────────────────

    public func generateApiKey(ownerId : Text, keyLabel : Text) : Types.Result<Types.ApiKey, Types.ApiError> {
      let key : Types.ApiKey = {
        id = genKeyId();
        key = genApiKeyValue();
        ownerId;
        keyLabel;
        usageCount = 0;
        lastUsed = null;
        isActive = true;
        createdAt = Time.now();
      };
      apiKeys.add(key.id, key);
      #ok(key)
    };

    public func getApiKeys(ownerId : Text) : [Types.ApiKey] {
      let results = List.empty<Types.ApiKey>();
      for ((_, k) in apiKeys.entries()) {
        if (k.ownerId == ownerId) results.add(k);
      };
      results.toArray()
    };

    public func revokeApiKey(keyId : Text) : Types.Result<Text, Types.ApiError> {
      switch (apiKeys.get(keyId)) {
        case null #err(#notFound);
        case (?k) {
          let updated = { k with isActive = false };
          apiKeys.add(keyId, updated);
          #ok(keyId)
        };
      }
    };

    public func trackApiUsage(keyId : Text, endpoint : Text, statusCode : Nat) {
      switch (apiKeys.get(keyId)) {
        case null {};
        case (?k) {
          let updated = { k with usageCount = k.usageCount + 1; lastUsed = ?Time.now() };
          apiKeys.add(keyId, updated);
          let log : Types.ApiUsageLog = {
            keyId;
            endpoint;
            timestamp = Time.now();
            statusCode;
          };
          apiUsageLogs.add(genLogId(), log);
        };
      }
    };

    // ── Export Functions ───────────────────────────────────────────────────────

    public func exportUsers() : [Types.User] {
      userSvc.listUsers(null)
    };

    public func exportMerchants() : [Types.Merchant] {
      merchantSvc.listMerchants(null, null)
    };

    public func exportDeliveryPartners() : [Types.DeliveryPartner] {
      dpSvc.listDeliveryPartners(null)
    };

    public func exportOrders() : [Types.Order] {
      let results = List.empty<Types.Order>();
      for ((_, o) in ordersById.entries()) { results.add(o) };
      results.toArray()
    };

    public func exportJobs() : [Types.Job] {
      jobSvc.getAllJobs(null)
    };

    public func exportProperties() : [Types.Property] {
      let results = List.empty<Types.Property>();
      for ((_, p) in propertiesById.entries()) { results.add(p) };
      results.toArray()
    };

    public func exportLeads() : [Types.Lead] {
      let results = List.empty<Types.Lead>();
      for ((_, l) in leadsById.entries()) { results.add(l) };
      results.toArray()
    };

    public func exportEvents() : [EventTypes.Event] {
      let results = List.empty<EventTypes.Event>();
      for ((_, e) in eventsById.entries()) { results.add(e) };
      results.toArray()
    };

    public func exportFamilyMembers() : [FamilyTypes.FamilyMember] {
      let results = List.empty<FamilyTypes.FamilyMember>();
      for ((_, m) in familyById.entries()) { results.add(m) };
      results.toArray()
    };

    public func exportPromotions() : [PromotionTypes.Promotion] {
      let results = List.empty<PromotionTypes.Promotion>();
      for ((_, p) in promotionsById.entries()) { results.add(p) };
      results.toArray()
    };

    // ── Dashboard Stats ────────────────────────────────────────────────────────

    public func getAdminDashboardStats() : Types.DashboardStats {
      let merchants     = merchantSvc.listMerchants(null, null);
      let _customers    = userSvc.listUsers(?#customer);
      let dps           = dpSvc.listDeliveryPartners(null);
      let jobs          = jobSvc.getAllJobs(null);
      let allOrders     = List.fromIter<Types.Order>(ordersById.values());
      let allProps      = List.fromIter<Types.Property>(propertiesById.values());
      let allLeads      = List.fromIter<Types.Lead>(leadsById.values());

      let activeStatuses : [Types.OrderStatus] = [#pending, #accepted, #assigned, #inTransit, #delivered];
      let activeOrders = allOrders.filter(func(o : Types.Order) : Bool {
        activeStatuses.find(func(s : Types.OrderStatus) : Bool { o.status == s }) != null
      });

      let totalRevenue = allOrders.foldLeft(0.0, func(acc : Float, o : Types.Order) : Float {
        switch (o.status) {
          case (#completed) acc + o.totalAmount;
          case _ acc;
        }
      });

      let pendingKYC = dps.filter(func(dp : Types.DeliveryPartner) : Bool {
        dp.kycStatus == #pending
      });

      let activePromos = List.fromIter<PromotionTypes.Promotion>(promotionsById.values()).filter(
        func(p : PromotionTypes.Promotion) : Bool { p.status == #active }
      );

      {
        totalUsers            = userSvc.listUsers(null).size();
        totalMerchants        = merchants.size();
        totalDeliveryPartners = dps.size();
        totalOrders           = ordersById.size();
        totalJobs             = jobs.size();
        totalProperties       = allProps.size();
        totalLeads            = allLeads.size();
        totalRevenue;
        pendingKYC            = pendingKYC.size();
        activeOrders          = activeOrders.size();
        totalEvents           = eventsById.size();
        totalFamilyMembers    = familyById.size();
        totalPromotions       = promotionsById.size();
        activePromotions      = activePromos.size();
      }
    };

    // ── Merchant Management ───────────────────────────────────────────────────

    public func listAllUsers() : [Types.User] {
      userSvc.listUsers(null)
    };

    public func listAllMerchants() : [Types.Merchant] {
      merchantSvc.listMerchants(null, null)
    };

    public func listAllDeliveryPartners() : [Types.DeliveryPartner] {
      dpSvc.listDeliveryPartners(null)
    };

    public func updateMerchantVerification(merchantId : Text, isActive : Bool, isVerified : Bool) : Types.Result<Types.Merchant, Types.ApiError> {
      merchantSvc.updateMerchantStatus(merchantId, isActive, isVerified)
    };

    // ── Monthly Order Stats ───────────────────────────────────────────────────

    public func getMonthlyOrderStats(year : Int, month : Int) : [{ day : Int; orderCount : Nat; revenue : Float }] {
      let daysInMonth : Int = switch (month) {
        case 2  { if (year % 4 == 0) 29 else 28 };
        case 4  { 30 }; case 6  { 30 }; case 9  { 30 }; case 11 { 30 };
        case _  { 31 };
      };
      let results = List.empty<{ day : Int; orderCount : Nat; revenue : Float }>();
      var d : Int = 1;
      while (d <= daysInMonth) {
        results.add({ day = d; orderCount = 0; revenue = 0.0 });
        d += 1;
      };
      results.toArray()
    };

    // ── Top Merchants ─────────────────────────────────────────────────────────

    public func getTopMerchants(limit : Nat) : [{ merchant : Types.Merchant; orderCount : Nat; revenue : Float; avgRating : Float }] {
      let merchants = merchantSvc.listMerchants(?true, null);
      let sorted = merchants.sort(func(a : Types.Merchant, b : Types.Merchant) : {#less; #equal; #greater} {
        if (a.avgRating > b.avgRating) #less
        else if (a.avgRating < b.avgRating) #greater
        else #equal
      });
      let cap = if (sorted.size() < limit) sorted.size() else limit;
      let results = List.empty<{ merchant : Types.Merchant; orderCount : Nat; revenue : Float; avgRating : Float }>();
      var i = 0;
      while (i < cap) {
        let m = sorted[i];
        results.add({ merchant = m; orderCount = 0; revenue = 0.0; avgRating = m.avgRating });
        i += 1;
      };
      results.toArray()
    };

    // ── Chatbot Simulator ─────────────────────────────────────────────────────

    public func simulateChatMessage(
      phoneNumber : Text,
      message     : Text,
      messageType : Text,
    ) : async Types.Result<[Types.BotMessage], Types.ApiError> {
      let responses = await botEngine.processMessage(phoneNumber, message, messageType);
      #ok(responses)
    };

    // ── Conversation Management ───────────────────────────────────────────────

    public func getConversationHistory(phoneNumber : Text) : [Types.ConversationMessage] {
      botEngine.getConversationHistory(phoneNumber)
    };

    public func resetConversation(phoneNumber : Text) : Types.Result<Text, Types.ApiError> {
      botEngine.resetConversation(phoneNumber)
    };

  }; // end class AdminService
};
