import Types "../Types";
import PSTypes "../types/ProfessionalServiceTypes";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Float "mo:core/Float";
import LendingTypes "../types/LendingTypes";

mixin (
  scriptRunResultsStore     : Map.Map<Text, Types.ScriptRunResult>,
  entityRecordsFromRuns     : Map.Map<Text, [Types.ScriptEntityRecord]>,
  usersByPhone              : Map.Map<Text, Types.User>,
  merchantsById             : Map.Map<Text, Types.Merchant>,
  ordersById                : Map.Map<Text, Types.Order>,
  flowsStore                : Map.Map<Text, Types.FlowDefinition>,
  healthcareApptStore       : Map.Map<Text, PSTypes.HealthcareAppointment>,
  tourBookingStore          : Map.Map<Text, PSTypes.TourBooking>,
  serviceBookingStore       : Map.Map<Text, PSTypes.ServiceBooking>,
  donationsStore            : Map.Map<Text, Types.DonationItem>,
  lendingItemsStore         : Map.Map<Text, LendingTypes.LendingItem>,
  jobsStoreCurrent          : Map.Map<Text, Types.Job>,
) {

  var scriptRunIdCounter : Nat = 0;
  var scriptStepIdCounter : Nat = 0;

  func nextRunId() : Text {
    scriptRunIdCounter += 1;
    "run_" # Time.now().toText() # "_" # scriptRunIdCounter.toText()
  };

  func nextStepId() : Text {
    scriptStepIdCounter += 1;
    "step_" # Time.now().toText() # "_" # scriptStepIdCounter.toText()
  };

  // ── Execution session state (session-keyed, in-memory during execution) ─────
  // Key: sessionId → { flowId, currentStep, stepResults, sessionStarted }
  type ExecSession = {
    flowId         : Text;
    currentStep    : Nat;
    stepResults    : [Types.ScriptRunStep];
    sessionStarted : Int;
  };
  let executionSessions = Map.empty<Text, ExecSession>();

  // Clean up sessions older than 1 hour
  func cleanupOldSessions() {
    let oneHourNs : Int = 3600 * 1_000_000_000;
    let now = Time.now();
    let keysToRemove = List.empty<Text>();
    for ((k, sess) in executionSessions.entries()) {
      if (now - sess.sessionStarted > oneHourNs) {
        keysToRemove.add(k);
      };
    };
    for (k in keysToRemove.values()) {
      executionSessions.remove(k);
    };
  };

  // ── Test value generator based on node type / inputType ─────────────────────
  func testValueForInputType(inputType : Text, prompt : Text, choices : [Text]) : Text {
    let t = inputType.toLower();
    let p = prompt.toLower();
    if (t == "phone" or p.contains(#text "phone")) return "9876543210";
    if (t == "email" or p.contains(#text "email")) return "test@localbazar.com";
    if (t == "date" or t == "time") {
      if (t == "time" or p.contains(#text "time")) return "10:00";
      return "15/05/2026";
    };
    if (t == "number" or t == "amount" or p.contains(#text "budget") or p.contains(#text "price") or p.contains(#text "fee") or p.contains(#text "rate") or p.contains(#text "charge") or p.contains(#text "quantity") or p.contains(#text "qty") or p.contains(#text "amount") or p.contains(#text "passengers") or p.contains(#text "quantity")) {
      if (p.contains(#text "passengers")) return "2";
      if (p.contains(#text "quantity") or p.contains(#text "qty")) return "5";
      return "500";
    };
    if (p.contains(#text "name") and not p.contains(#text "business") and not p.contains(#text "item") and not p.contains(#text "supplier")) return "Rajan Kumar";
    if (p.contains(#text "business name") or p.contains(#text "outlet") or p.contains(#text "clinic") or p.contains(#text "operator")) return "Sharma Enterprises";
    if (p.contains(#text "city")) return "Gandhidham";
    if (p.contains(#text "pincode")) return "370201";
    if (p.contains(#text "address") or p.contains(#text "location")) return "123 MG Road, Gandhidham";
    if (p.contains(#text "keyword") or p.contains(#text "search") or p.contains(#text "query")) return "rice";
    if (p.contains(#text "destination") or p.contains(#text "source")) return "Ahmedabad";
    if (p.contains(#text "description") or p.contains(#text "describe") or p.contains(#text "detail")) return "Good quality items, well maintained";
    if (p.contains(#text "notes") or p.contains(#text "special instructions")) return "No special requirements";
    if (p.contains(#text "specialization") or p.contains(#text "skill")) return "General Physician";
    if (p.contains(#text "availability")) return "Mon-Sat 9AM-6PM";
    if (p.contains(#text "borrower")) return "9876543211";
    if (p.contains(#text "order id") or p.contains(#text "order_id")) return "ORD-001";
    if (choices.size() > 0) return "1";
    return "test input";
  };

  /// Persist a completed script-executor run.
  /// Returns the saved record (with the generated id).
  public func saveScriptRunResult(input : Types.ScriptRunResultInput) : async Types.Result<Types.ScriptRunResult, Text> {
    let id = nextRunId();
    let result : Types.ScriptRunResult = {
      id          = id;
      flowName    = input.flowName;
      runAt       = input.runAt;
      totalSteps  = input.totalSteps;
      passedSteps = input.passedSteps;
      failedSteps = input.failedSteps;
      overallPass = input.overallPass;
      steps       = input.steps;
    };
    scriptRunResultsStore.add(id, result);
    #ok(result)
  };

  /// Return step-by-step execution plan for a flow, with auto-generated test values.
  /// Parses the flowJson nodes in traversal order and returns prompt+testValue per step.
  public query func getScriptExecutorFlowSteps(flowId : Text) : async [{ stepIndex : Nat; stepName : Text; stepType : Text; promptText : Text; testValue : Text; validationPattern : ?Text }] {
    let flowOpt = flowsStore.get(flowId);
    let flowJson = switch (flowOpt) {
      case (?fd) fd.flowJson;
      case null "";
    };

    // Default fallback when flow not found or JSON is too short
    if (flowJson.size() < 20) {
      return [
        { stepIndex = 0; stepName = "Enter Phone"; stepType = "input"; promptText = "Enter your 10-digit phone number:"; testValue = "9876543210"; validationPattern = ?("^[0-9]{10}$") },
        { stepIndex = 1; stepName = "Select Role"; stepType = "choice"; promptText = "Select your role:"; testValue = "1"; validationPattern = null },
        { stepIndex = 2; stepName = "Confirm"; stepType = "choice"; promptText = "Confirm your selection?"; testValue = "Yes"; validationPattern = null },
      ];
    };

    // Simple JSON node extraction: find all node objects in the nodes array
    // Each node looks like: {"id":"...","type":"input","data":{"label":"...","prompt":"...","inputType":"..."}}
    let steps = List.empty<{ stepIndex : Nat; stepName : Text; stepType : Text; promptText : Text; testValue : Text; validationPattern : ?Text }>();
    var stepIdx : Nat = 0;

    // Extract value of a field like "label":"..." from a sub-string
    func extractField(src : Text, field : Text) : Text {
      let pattern = "\"" # field # "\":\"";
      if (not src.contains(#text pattern)) return "";
      let parts = src.split(#text pattern).toArray();
      if (parts.size() < 2) return "";
      let after = parts[1];
      let endParts = after.split(#text "\"").toArray();
      if (endParts.size() < 1) return "";
      endParts[0]
    };

    func extractChoices(src : Text) : [Text] {
      // choices array: "choices":["1. ...","2. ..."]
      let pattern = "\"choices\":[";
      if (not src.contains(#text pattern)) return [];
      let parts = src.split(#text pattern).toArray();
      if (parts.size() < 2) return [];
      let after = parts[1];
      let endParts = after.split(#text "]").toArray();
      if (endParts.size() < 1) return [];
      let choiceStr = endParts[0];
      // Split by ",\"" to get each item, strip leading/trailing quotes
      choiceStr.split(#text ",").toArray()
    };

    // Split nodes JSON to extract individual node objects
    // Strategy: look for "type":"input", "type":"choice", "type":"action"
    let nodeTypes : [Text] = ["input", "choice", "action"];
    for (nodeType in nodeTypes.vals()) {
      // find all occurrences of "type":"<nodeType>" and grab surrounding data
      let searchStr = "\"type\":\"" # nodeType # "\"";
      if (flowJson.contains(#text searchStr)) {
        // Split on occurrences — not perfect but workable for our known JSON structure
        let segments = flowJson.split(#text searchStr).toArray();
        var segIdx : Nat = 1;
        label segLoop while (segIdx < segments.size()) {
          let seg = segments[segIdx];
          // Pull data fields from the surrounding ~500 chars
          let window = seg;

          // Look back into the previous segment for id and label
          let prevSeg = segments[segIdx - 1];
          let prevWindow = prevSeg;

          let nodeLabel = extractField(prevWindow # window, "label");
          let prompt    = extractField(prevWindow # window, "prompt");
          let inputType = extractField(prevWindow # window, "inputType");
          let choices   = extractChoices(prevWindow # window);

          // Skip start/end nodes (they have no user input)
          let isStart = prevWindow.contains(#text "\"id\":\"start\"");
          let isEnd   = prevWindow.contains(#text "\"id\":\"end\"");

          if (not isStart and not isEnd and nodeLabel != "") {
            let tv = testValueForInputType(inputType, prompt, choices);
            steps.add({
              stepIndex         = stepIdx;
              stepName          = nodeLabel;
              stepType          = nodeType;
              promptText        = if (prompt != "") prompt else nodeLabel;
              testValue         = tv;
              validationPattern = if (inputType == "phone") ?("^[0-9]{10}$") else null;
            });
            stepIdx += 1;
          };
          segIdx += 1;
        };
      };
    };

    // If nothing parsed (malformed JSON), return default 3-step sequence
    let result = steps.toArray();
    if (result.size() == 0) {
      return [
        { stepIndex = 0; stepName = "Enter Phone"; stepType = "input"; promptText = "Enter your 10-digit phone number:"; testValue = "9876543210"; validationPattern = ?("^[0-9]{10}$") },
        { stepIndex = 1; stepName = "Select City"; stepType = "input"; promptText = "Enter your city:"; testValue = "Gandhidham"; validationPattern = null },
        { stepIndex = 2; stepName = "Confirm"; stepType = "choice"; promptText = "Confirm?"; testValue = "Yes"; validationPattern = null },
      ];
    };
    result
  };

  /// Persist a completed script-executor run AND save any generated entity records.
  /// Entity creation is driven by the stepEntityType in each ScriptRunStep (if populated).
  /// Falls back to flow-name heuristics for backward compatibility.
  public func saveScriptRunResultWithData(input : Types.ScriptRunResultInput) : async Types.Result<Types.ScriptRunResult, Text> {
    let id = nextRunId();
    let result : Types.ScriptRunResult = {
      id          = id;
      flowName    = input.flowName;
      runAt       = input.runAt;
      totalSteps  = input.totalSteps;
      passedSteps = input.passedSteps;
      failedSteps = input.failedSteps;
      overallPass = input.overallPass;
      steps       = input.steps;
    };
    scriptRunResultsStore.add(id, result);

    // ── Persist entity records ────────────────────────────────────────────────
    let now       = Time.now();
    let ts        = now.toText();
    let flowLower = input.flowName.toLower();
    let entityList = List.empty<Types.ScriptEntityRecord>();

    // Helper: create a test customer if not already existing
    func ensureCustomer(phone : Text) {
      switch (usersByPhone.get(phone)) {
        case null {
          let uid = "uid-exec-" # phone # "-" # ts;
          let testUser : Types.User = {
            id                 = uid;
            phone              = phone;
            name               = "Rajan Kumar";
            gender             = "Male";
            role               = #customer;
            location           = ?{ lat = 23.0753; lng = 70.1337; address = "123 MG Road, Gandhidham" };
            address            = ?"123 MG Road, Gandhidham";
            registrationDate   = now;
            subscriptionPlanId = null;
            conversationState  = #welcome;
            stateData          = "{\"source\":\"script-executor\"}";
            isActive           = true;
            otpVerified        = true;
            passdigit          = "1234";
            passdigitAttempts  = 0;
            sessionLocked      = false;
            sessionLockExpiry  = 0;
            otpCode            = "";
            otpExpiry          = 0;
            countryCode        = "IN";
            currency           = "INR";
            countryName        = "India";
            importedByMerchant = null;
            promotionalOptOut  = false;
            importBatchId      = ?("script-exec-" # id);
          };
          usersByPhone.add(phone, testUser);
          entityList.add({
            entityType = "customer";
            entityId   = uid;
            entityData = "{\"phone\":\"" # phone # "\",\"name\":\"Rajan Kumar\",\"source\":\"script-executor\"}";
          });
        };
        case (?_) {};
      };
    };

    // ── Step-level entity creation (from enriched step data) ──────────────────
    // Steps with entityType/entityId populated get their real entity saved here
    for (step in input.steps.vals()) {
      let entityType = switch (step.error) {
        case (?et) if (et.startsWith(#text "entity:")) {
          let stripped = et.split(#text "entity:").toArray();
          if (stripped.size() >= 2) stripped[1] else ""
        } else "";
        case null "";
      };
      let eid = if (entityType != "") ("exec-" # entityType # "-" # ts # "-" # step.stepIndex.toText()) else "";
      if (entityType == "customer") {
        let phone = "exec-cust-" # ts;
        ensureCustomer(phone);
      } else if (entityType == "healthcare_booking") {
        let apptId = "exec-appt-" # ts;
        let appt : PSTypes.HealthcareAppointment = {
          id            = apptId;
          providerId    = "provider-exec-001";
          customerPhone = "9876543210";
          date          = "15/05/2026";
          timeSlot      = "10:00-10:30";
          status        = #confirmed;
          notes         = "Script Executor test booking";
          createdAt     = now;
          updatedAt     = now;
        };
        healthcareApptStore.add(apptId, appt);
        entityList.add({ entityType = "healthcare_booking"; entityId = apptId; entityData = "{\"source\":\"script-executor\"}" });
      } else if (entityType == "tour_booking") {
        let tbId = "exec-tour-" # ts;
        let tb : PSTypes.TourBooking = {
          id             = tbId;
          operatorId     = "operator-exec-001";
          customerPhone  = "9876543210";
          destination    = "Ahmedabad";
          tourType       = "Day Tour";
          date           = "15/05/2026";
          passengerCount = 2;
          totalPrice     = 1000.0;
          status         = #confirmed;
          createdAt      = now;
          updatedAt      = now;
        };
        tourBookingStore.add(tbId, tb);
        entityList.add({ entityType = "tour_booking"; entityId = tbId; entityData = "{\"source\":\"script-executor\"}" });
      } else if (entityType == "service_booking") {
        let sbId = "exec-svc-" # ts;
        let sb : PSTypes.ServiceBooking = {
          id            = sbId;
          serviceId     = "service-exec-001";
          customerPhone = "9876543210";
          date          = "15/05/2026";
          timeSlot      = "10:00-11:00";
          duration      = 1;
          totalPrice    = 500.0;
          status        = #confirmed;
          notes         = "Script Executor test booking";
          createdAt     = now;
          updatedAt     = now;
        };
        serviceBookingStore.add(sbId, sb);
        entityList.add({ entityType = "service_booking"; entityId = sbId; entityData = "{\"source\":\"script-executor\"}" });
      } else if (entityType == "donation") {
        let dId = "exec-donation-" # ts;
        let d : Types.DonationItem = {
          id           = dId;
          category     = "FoodItems";
          description  = "Script Executor test donation";
          quantity     = "5 kg";
          location     = "Gandhidham";
          contactPhone = "9876543210";
          donorPhone   = "9876543210";
          donorName    = "Test Donor";
          status       = "Available";
          createdAt    = now;
          source       = "script-executor";
        };
        donationsStore.add(dId, d);
        entityList.add({ entityType = "donation"; entityId = dId; entityData = "{\"source\":\"script-executor\"}" });
      } else if (entityType == "job") {
        let jId = "exec-job-" # ts;
        let j : Types.Job = {
          id             = jId;
          posterId       = "9876543210";
          title          = "Daily Cleaning Work";
          description    = "Script Executor test job";
          category       = "Cleaning";
          salaryMin      = 300.0;
          salaryMax      = 500.0;
          location       = { lat = 23.0753; lng = 70.1337; address = "Gandhidham" };
          publishDate    = now;
          endDate        = now + 86400_000_000_000;
          isOpen         = true;
          leads          = [];
          jobType        = #adhoc_daily;
          pricePerDay    = ?400.0;
          educationLevel = ?"No requirement";
          expiresAt      = ?(now + 86400_000_000_000);
          isAdhoc        = true;
          contactPhone   = ?"9876543210";
        };
        jobsStoreCurrent.add(jId, j);
        entityList.add({ entityType = "job"; entityId = jId; entityData = "{\"source\":\"script-executor\"}" });
      };
      ignore eid;
    };

    // ── Flow-name heuristics (fallback for runs without step-level entity tags) ─
    let isCustomerReg = flowLower.contains(#text "customer") and flowLower.contains(#text "registr");
    let isMerchantReg = flowLower.contains(#text "merchant") and flowLower.contains(#text "registr");
    let isOrder       = flowLower.contains(#text "order") and not isMerchantReg and not flowLower.contains(#text "restock");
    let isHealthcare  = flowLower.contains(#text "health") or flowLower.contains(#text "doctor");
    let isTour        = flowLower.contains(#text "tour");
    let isService     = flowLower.contains(#text "professional") or flowLower.contains(#text "service booking");
    let isDonation    = flowLower.contains(#text "donation");
    let isJob         = (flowLower.contains(#text "job") or flowLower.contains(#text "adhoc")) and not isOrder;
    let isLending     = flowLower.contains(#text "lending");

    if (input.overallPass) {
      if (isCustomerReg) {
        let phone = "exec-cust-" # ts;
        ensureCustomer(phone);
      };

      if (isMerchantReg) {
        let testMid = "mch-exec-" # ts;
        switch (merchantsById.get(testMid)) {
          case null {
            let testMerchant : Types.Merchant = {
              id                = testMid;
              userId            = "uid-exec-" # ts;
              businessName      = "Sharma Enterprises (Script Executor)";
              category          = "Grocery";
              merchantType      = #order_;
              bookingAllowed    = false;
              rentalAllowed     = false;
              location          = { lat = 23.0753; lng = 70.1337; address = "123 MG Road, Gandhidham" };
              deliveryType      = #delivery;
              deliveryRadius    = 5.0;
              branches          = [];
              menuProductIds    = [];
              kyc               = {
                panNumber          = null; panImageUrl       = null;
                aadhaarNumber      = null; aadhaarImageUrl   = null;
                gstNumber          = null; gstImageUrl       = null;
                outletPhotoUrl     = null; cancelledChequeUrl = null;
                personalQRUrl      = null;
                verificationStatus = #pending;
              };
              codAvailable       = false;
              avgRating          = 0.0;
              ratingCount        = 0;
              isOndcEnrolled     = false;
              isActive           = true;
              isVerified         = false;
              rejectionReason    = null;
              boostedOrderCount  = 0;
              blockedUntil       = null;
              customerCount      = 0;
              orderCount         = 0;
              phone              = "9876543210";
            };
            merchantsById.add(testMid, testMerchant);
            entityList.add({
              entityType = "merchant";
              entityId   = testMid;
              entityData = "{\"businessName\":\"Sharma Enterprises\",\"source\":\"script-executor\"}";
            });
          };
          case (?_) {};
        };
      };

      if (isOrder) {
        let testOid = "ord-exec-" # ts;
        switch (ordersById.get(testOid)) {
          case null {
            let cPhone = "exec-cust-" # ts;
            ensureCustomer(cPhone);
            let testOrder : Types.Order = {
              id                      = testOid;
              customerId              = cPhone;
              merchantId              = "mch-exec-" # ts;
              deliveryPartnerId       = null;
              items                   = [];
              manualItems             = [{ itemName = "Rice 5kg"; brand = "India Gate"; quantity = 1 }];
              isManualOrder           = true;
              ondcSource              = false;
              status                  = #completed;
              totalAmount             = 500.0;
              deliveryCharge          = 30.0;
              surgeCharge             = 0.0;
              paymentMode             = #cod;
              paymentStatus           = #paid;
              customerAddress         = ?{ lat = 23.0753; lng = 70.1337; address = "123 MG Road, Gandhidham" };
              merchantBranch          = null;
              createdAt               = now;
              acceptedAt              = ?now;
              assignedAt              = null;
              completedAt             = ?now;
              cancelledAt             = null;
              notes                   = ?("source:script-executor flowName:" # input.flowName);
              searchQuery             = null;
              searchImageUrl          = null;
              merchantAcceptedAt      = ?now;
              dpAcceptedAt            = null;
              pickedUpAt              = null;
              deliveredAt             = ?now;
              paymentCollectedAt      = ?now;
              vendorSettledAt         = ?now;
              rejectionReason         = null;
              customerRatingValue     = null;
              customerRating          = null;
              merchantRating          = null;
              dpRating                = null;
              paymentCollectedAmount  = 500;
              vendorSettlementAmount  = 470;
              statusHistory           = [];
            };
            ordersById.add(testOid, testOrder);
            entityList.add({
              entityType = "order";
              entityId   = testOid;
              entityData = "{\"amount\":500,\"flowName\":\"" # input.flowName # "\",\"source\":\"script-executor\"}";
            });
          };
          case (?_) {};
        };
      };

      if (isHealthcare) {
        let apptId = "appt-exec-" # ts;
        let appt : PSTypes.HealthcareAppointment = {
          id            = apptId;
          providerId    = "provider-exec-001";
          customerPhone = "9876543210";
          date          = "15/05/2026";
          timeSlot      = "10:00-10:30";
          status        = #confirmed;
          notes         = "Script Executor test healthcare booking";
          createdAt     = now;
          updatedAt     = now;
        };
        healthcareApptStore.add(apptId, appt);
        entityList.add({ entityType = "healthcare_booking"; entityId = apptId; entityData = "{\"source\":\"script-executor\"}" });
      };

      if (isTour) {
        let tbId = "tour-exec-" # ts;
        let tb : PSTypes.TourBooking = {
          id             = tbId;
          operatorId     = "operator-exec-001";
          customerPhone  = "9876543210";
          destination    = "Ahmedabad";
          tourType       = "Day Tour";
          date           = "15/05/2026";
          passengerCount = 2;
          totalPrice     = 1000.0;
          status         = #confirmed;
          createdAt      = now;
          updatedAt      = now;
        };
        tourBookingStore.add(tbId, tb);
        entityList.add({ entityType = "tour_booking"; entityId = tbId; entityData = "{\"source\":\"script-executor\"}" });
      };

      if (isService) {
        let sbId = "svc-exec-" # ts;
        let sb : PSTypes.ServiceBooking = {
          id            = sbId;
          serviceId     = "service-exec-001";
          customerPhone = "9876543210";
          date          = "15/05/2026";
          timeSlot      = "10:00-11:00";
          duration      = 1;
          totalPrice    = 500.0;
          status        = #confirmed;
          notes         = "Script Executor test service booking";
          createdAt     = now;
          updatedAt     = now;
        };
        serviceBookingStore.add(sbId, sb);
        entityList.add({ entityType = "service_booking"; entityId = sbId; entityData = "{\"source\":\"script-executor\"}" });
      };

      if (isDonation) {
        let dId = "donation-exec-" # ts;
        let d : Types.DonationItem = {
          id           = dId;
          category     = "FoodItems";
          description  = "Script Executor test donation";
          quantity     = "5 kg";
          location     = "Gandhidham";
          contactPhone = "9876543210";
          donorPhone   = "9876543210";
          donorName    = "Rajan Kumar";
          status       = "Available";
          createdAt    = now;
          source       = "script-executor";
        };
        donationsStore.add(dId, d);
        entityList.add({ entityType = "donation"; entityId = dId; entityData = "{\"source\":\"script-executor\"}" });
      };

      if (isJob) {
        let jId = "job-exec-" # ts;
        let j : Types.Job = {
          id             = jId;
          posterId       = "9876543210";
          title          = "Daily Cleaning Work";
          description    = "Script Executor test job";
          category       = "Cleaning";
          salaryMin      = 300.0;
          salaryMax      = 500.0;
          location       = { lat = 23.0753; lng = 70.1337; address = "Gandhidham" };
          publishDate    = now;
          endDate        = now + 86400_000_000_000;
          isOpen         = true;
          leads          = [];
          jobType        = #adhoc_daily;
          pricePerDay    = ?400.0;
          educationLevel = ?"No requirement";
          expiresAt      = ?(now + 86400_000_000_000);
          isAdhoc        = true;
          contactPhone   = ?"9876543210";
        };
        jobsStoreCurrent.add(jId, j);
        entityList.add({ entityType = "job"; entityId = jId; entityData = "{\"source\":\"script-executor\"}" });
      };

      if (isLending) {
        let lId = "lending-exec-" # ts;
        let lendingItem : LendingTypes.LendingItem = {
          id                   = lId;
          lenderPhone          = "9876543210";
          borrowerPhone        = "9876543211";
          itemCategory         = "Electronics";
          itemName             = "Drill Machine";
          itemDescription      = "Script Executor test lending";
          borrowDate           = now;
          returnDate           = now + (90 * 24 * 3600 * 1_000_000_000);
          charge               = 0.0;
          chargeDescription    = "Free";
          reminderFrequency    = "Monthly";
          specificReminderDate = null;
          status               = "active";
          lastReminderSent     = null;
          createdAt            = now;
          updatedAt            = now;
        };
        lendingItemsStore.add(lId, lendingItem);
        entityList.add({ entityType = "lending"; entityId = lId; entityData = "{\"source\":\"script-executor\"}" });
      };
    };

    // Store entity records keyed by run id
    let existingEntities = switch (entityRecordsFromRuns.get(id)) {
      case (?e) e;
      case null [];
    };
    entityRecordsFromRuns.add(id, existingEntities.concat(entityList.toArray()));

    #ok(result)
  };

  /// Return all stored script-executor run results, newest first.
  public query func getScriptRunResults() : async [Types.ScriptRunResult] {
    let arr = scriptRunResultsStore.values().toArray();
    arr.sort(func(a, b) = Int.compare(b.runAt, a.runAt))
  };

  /// Return a single run result by id, or null if not found.
  public query func getScriptRunResult(id : Text) : async ?Types.ScriptRunResult {
    scriptRunResultsStore.get(id)
  };

  /// Return all entity records created during a specific run.
  public query func getEntitiesCreatedByRun(runId : Text) : async [Types.ScriptEntityRecord] {
    switch (entityRecordsFromRuns.get(runId)) {
      case (?records) records;
      case null [];
    }
  };

  /// Remove all stored script-executor run results.
  public func clearScriptRunResults() : async () {
    scriptRunResultsStore.clear()
  };

};
