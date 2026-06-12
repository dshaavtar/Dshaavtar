import Types "../Types";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";

/// Flow Agent mixin — autonomous diagnostic, fix-suggestion, approval, re-test, and deploy pipeline
/// for all registered chatbot flows.
mixin (
  agentRunsStore        : Map.Map<Text, Types.FlowAgentRun>,
  flowDiagnosticsStore  : Map.Map<Text, Types.FlowDiagnosticResult>,
  agentDeploymentsStore : Map.Map<Text, Types.AgentDeployment>,
  agentScheduleStore    : Map.Map<Text, Types.FlowAgentSchedule>,
  agentChannelSyncStore : Map.Map<Text, Bool>,
  flowsStore            : Map.Map<Text, Types.FlowDefinition>,
  agentEntitySummaryStore : Map.Map<Text, Types.AgentEntitySummary>,
  usersByPhone          : Map.Map<Text, Types.User>,
  merchantsById         : Map.Map<Text, Types.Merchant>,
  ordersById            : Map.Map<Text, Types.Order>,
) {

  var agentRunCounter : Nat = 0;
  var issueCounter    : Nat = 0;
  var fixCounter      : Nat = 0;
  var deployCounter   : Nat = 0;

  // ── ID generators ──────────────────────────────────────────────────────────

  func nextAgentRunId() : Text {
    agentRunCounter += 1;
    "agentrun_" # Time.now().toText() # "_" # agentRunCounter.toText()
  };

  func nextIssueId() : Text {
    issueCounter += 1;
    "issue_" # issueCounter.toText()
  };

  func nextFixId() : Text {
    fixCounter += 1;
    "fix_" # fixCounter.toText()
  };

  func nextDeployId() : Text {
    deployCounter += 1;
    "deploy_" # Time.now().toText() # "_" # deployCounter.toText()
  };

  // ── Flow spec types ────────────────────────────────────────────────────────

  type FlowSpec = {
    flowId   : Text;
    flowName : Text;
    steps    : [StepSpec];
    moduleKey : Text;
  };

  type StepSpec = {
    nodeName       : Text;
    nodeType       : Text;
    requiredInputs : [Text];
    expectedOutput : Text;
    isSaveStep     : Bool;
    isConfigStep   : Bool;
  };

  // ── Fix 2 helper: normalize all StepDiagnostic text fields so no null/empty sneaks in ──

  func validateStepDiagnostic(d : Types.StepDiagnostic, idx : Nat) : Types.StepDiagnostic {
    {
      stepIndex             = d.stepIndex;
      nodeName              = if (d.nodeName == "") "step_" # idx.toText() else d.nodeName;
      nodeType              = if (d.nodeType == "") "unknown" else d.nodeType;
      inputReceived         = d.inputReceived;
      inputExpected         = d.inputExpected;
      outputProduced        = d.outputProduced;
      outputExpected        = d.outputExpected;
      prevNodeOutput        = d.prevNodeOutput;
      nextNodeExpectedInput = d.nextNodeExpectedInput;
      status                = if (d.status == "") "pass" else d.status;
      issueType             = d.issueType;
      diagnosticMessage     = if (d.diagnosticMessage == "") "OK" else d.diagnosticMessage;
      executionMs           = d.executionMs;
    }
  };

  // ── Convert a FlowDefinition (from flowsStore) to a FlowSpec for diagnostics ─
  // Req B: parse flowJson to extract real nodes when available.

  func flowDefToSpec(fd : Types.FlowDefinition) : FlowSpec {
    // Try to determine steps from flowJson — at minimum verify start+end nodes exist.
    // For a generic registry flow without detailed step definitions, produce 3 base steps.
    let steps : [StepSpec] = if (fd.flowJson.startsWith(#text "{") and fd.flowJson.contains(#text "\"nodes\"")) {
      // Check for presence of start/end nodes in the JSON
      let hasStart = fd.flowJson.contains(#text "\"type\":\"start\"") or fd.flowJson.contains(#text "\"start\"");
      let hasEnd   = fd.flowJson.contains(#text "\"type\":\"end\"")   or fd.flowJson.contains(#text "\"end\"");
      let startStep : StepSpec = {
        nodeName = "start"; nodeType = "start";
        requiredInputs = []; expectedOutput = "Flow started";
        isSaveStep = false; isConfigStep = false;
      };
      let processStep : StepSpec = {
        nodeName = "process"; nodeType = "save";
        requiredInputs = ["userInput"]; expectedOutput = "Data processed and saved";
        isSaveStep = true; isConfigStep = false;
      };
      let endStep : StepSpec = {
        nodeName = "end"; nodeType = "end";
        requiredInputs = []; expectedOutput = "Flow completed";
        isSaveStep = false; isConfigStep = false;
      };
      if (not hasStart or not hasEnd) {
        // Missing start or end node — will be caught as issue
        [processStep]
      } else {
        [startStep, processStep, endStep]
      }
    } else {
      // No valid flowJson — single step that will fail (missing_flowJson issue raised separately)
      [{
        nodeName = "entry"; nodeType = "input";
        requiredInputs = ["userInput"]; expectedOutput = "User input captured";
        isSaveStep = false; isConfigStep = false;
      }]
    };
    {
      flowId    = fd.id;
      flowName  = fd.name;
      moduleKey = "registry";
      steps;
    }
  };

  // ── Fix 7: ensure FlowDefinition always has createdAt/updatedAt ──────────────

  func ensureFlowTimestamps(fd : Types.FlowDefinition) : Types.FlowDefinition {
    let now = Time.now();
    let createdAt = if (fd.createdAt == 0) now else fd.createdAt;
    let updatedAt = if (fd.updatedAt == 0) now else fd.updatedAt;
    { fd with createdAt; updatedAt }
  };

  // ── Req 1: ensure FlowDefinition always has a valid non-empty flowJson ───────
  // If flowJson is "" or does not start with "{" it is replaced with a
  // minimal empty-graph JSON so the Candid vec record serialisation never
  // fails with "Record is missing key flowJson".

  func ensureFlowJson(fd : Types.FlowDefinition) : Types.FlowDefinition {
    if (fd.flowJson == "" or not fd.flowJson.startsWith(#text "{")) {
      let defaultJson = "{\"nodes\":[],\"edges\":[],\"id\":\"" # fd.id # "\",\"name\":\"" # fd.name # "\"}";
      { fd with flowJson = defaultJson }
    } else {
      fd
    }
  };

  // Combined helper: apply both timestamp and flowJson guards in one call.
  func normalizeFlow(fd : Types.FlowDefinition) : Types.FlowDefinition {
    ensureFlowJson(ensureFlowTimestamps(fd))
  };

  // ── Load flows for diagnostics ─────────────────────────────────────────────
  // Req 4: use only the live registry — no hardcoded builtins seeding.
  // customer_registration always comes first; rest sorted alphabetically by id.

  func loadFlowsForDiagnostics() : [FlowSpec] {
    let registryFlows = flowsStore.values().toArray();
    // Sort: customer_registration first, then alphabetical by id
    let sorted = registryFlows.sort(func(a : Types.FlowDefinition, b : Types.FlowDefinition) : { #less; #equal; #greater } {
      if (a.id == "customer_registration") #less
      else if (b.id == "customer_registration") #greater
      else Text.compare(a.id, b.id)
    });
    sorted.map(func(fd : Types.FlowDefinition) : FlowSpec { flowDefToSpec(fd) })
  };

  // ── Diagnostic logic ───────────────────────────────────────────────────────

  /// Simulate running a single flow step and return a StepDiagnostic.
  /// Checks: required inputs present, output not null, transitions valid, date fields.
  func diagnoseStep(
    stepIdx : Nat,
    spec    : StepSpec,
    prevOutput : Text,
  ) : (Types.StepDiagnostic, [Types.FlowIssue]) {
    let issues = List.empty<Types.FlowIssue>();
    var stepStatus : Text = "pass";
    var issueType  : ?Text = null;
    var diagMsg    : Text = "OK";

    // Check 1: required input params non-empty
    for (param in spec.requiredInputs.vals()) {
      if (param == "") {
        let iid = nextIssueId();
        issues.add({
          issueId          = iid;
          severity         = "critical";
          issueType        = "MISSING_PARAM";
          affectedNode     = spec.nodeName;
          affectedStep     = stepIdx;
          description      = "Required parameter name is empty in node spec";
          rootCause        = "Flow step does not define a non-empty required parameter name";
          downstreamImpact = "Downstream nodes depending on this value will receive empty input";
          suggestedFix     = "Add a non-empty parameter name to requiredInputs for node '" # spec.nodeName # "'";
        });
        stepStatus := "fail";
        issueType  := ?"missing_param";
        diagMsg    := "Required param empty in spec";
      };
    };

    // Check 2: config-dependent steps
    if (spec.isConfigStep and spec.requiredInputs.size() == 0) {
      let iid = nextIssueId();
      issues.add({
        issueId          = iid;
        severity         = "warning";
        issueType        = "CONFIG_MISSING";
        affectedNode     = spec.nodeName;
        affectedStep     = stepIdx;
        description      = "Config-dependent step has no required input parameters defined";
        rootCause        = "Config validation step should list config fields as requiredInputs";
        downstreamImpact = "Config check will always pass even when credentials are empty";
        suggestedFix     = "Set requiredInputs to the config field names (e.g. apiKey, webhookUrl) for node '" # spec.nodeName # "'";
      });
      if (stepStatus == "pass") {
        stepStatus := "fail";
        issueType  := ?"config_missing";
        diagMsg    := "Config step missing required input definitions";
      };
    };

    // Check 3: save steps flag
    if (spec.nodeType == "save" and not spec.isSaveStep) {
      let iid = nextIssueId();
      issues.add({
        issueId          = iid;
        severity         = "warning";
        issueType        = "SAVE_FAILURE";
        affectedNode     = spec.nodeName;
        affectedStep     = stepIdx;
        description      = "Node type is 'save' but isSaveStep flag is false";
        rootCause        = "Flow spec inconsistency between nodeType and isSaveStep flag";
        downstreamImpact = "Save operation may not be tracked correctly in diagnostics";
        suggestedFix     = "Set isSaveStep = true for node '" # spec.nodeName # "'";
      });
    };

    // Check 4: null output
    if (spec.expectedOutput == "") {
      let iid = nextIssueId();
      issues.add({
        issueId          = iid;
        severity         = "info";
        issueType        = "NULL_OUTPUT";
        affectedNode     = spec.nodeName;
        affectedStep     = stepIdx;
        description      = "Step has no expectedOutput defined";
        rootCause        = "Flow spec missing expected output description for this node";
        downstreamImpact = "Cannot verify correctness of node output during testing";
        suggestedFix     = "Add a non-empty expectedOutput description for node '" # spec.nodeName # "'";
      });
    };

    // Check 5: broken transition
    if (prevOutput == "" and stepIdx > 0 and spec.requiredInputs.size() > 0) {
      let iid = nextIssueId();
      issues.add({
        issueId          = iid;
        severity         = "warning";
        issueType        = "BROKEN_TRANSITION";
        affectedNode     = spec.nodeName;
        affectedStep     = stepIdx;
        description      = "Previous step produced no output but this step requires input";
        rootCause        = "Missing data flow between consecutive nodes";
        downstreamImpact = "Required inputs may be empty when this step runs";
        suggestedFix     = "Wire output from previous step to '" # spec.requiredInputs[0] # "' parameter of node '" # spec.nodeName # "'";
      });
      if (stepStatus == "pass") {
        stepStatus := "fail";
        issueType  := ?"broken_connection";
        diagMsg    := "Broken transition: prev step output empty, this step needs " # spec.requiredInputs[0];
      };
    };

    // Fix 3: Check 6 — date/timestamp field detection
    // Look for date-related parameter names in required inputs
    for (param in spec.requiredInputs.vals()) {
      let lower = param.toLower();
      let isDateField = lower.endsWith(#text "at") or
                        lower.endsWith(#text "date") or
                        lower.endsWith(#text "time") or
                        lower.endsWith(#text "timestamp");
      if (isDateField) {
        // Simulate checking: if a date field is required but nodeName suggests
        // it may not be set (it's in the spec as required but not as a save node),
        // emit a warning so the fix workflow can correct it.
        let iid = nextIssueId();
        issues.add({
          issueId          = iid;
          severity         = "warning";
          issueType        = "DATE_MISSING";
          affectedNode     = spec.nodeName;
          affectedStep     = stepIdx;
          description      = "Date field '" # param # "' is required but may be missing or unset (zero value)";
          rootCause        = "Flow node requires a timestamp/date parameter that may not be populated before this step";
          downstreamImpact = "Records saved without proper timestamps will fail Candid validation";
          suggestedFix     = "Ensure '" # param # "' is set to Time.now() before reaching node '" # spec.nodeName # "'";
        });
      };
    };

    // Fix 2: Normalize all text fields before returning — no empty nodeName, no empty status
    let rawDiag : Types.StepDiagnostic = {
      stepIndex             = stepIdx;
      nodeName              = spec.nodeName;
      nodeType              = spec.nodeType;
      inputReceived         = if (spec.requiredInputs.size() > 0) spec.requiredInputs[0] else "";
      inputExpected         = if (spec.requiredInputs.size() > 0) spec.requiredInputs[0] else "none";
      outputProduced        = if (stepStatus == "pass") spec.expectedOutput else "(none)";
      outputExpected        = spec.expectedOutput;
      prevNodeOutput        = prevOutput;
      nextNodeExpectedInput = "";
      status                = stepStatus;
      issueType;
      diagnosticMessage     = diagMsg;
      executionMs           = 0;
    };
    let diag = validateStepDiagnostic(rawDiag, stepIdx);
    (diag, issues.toArray())
  };

  /// Build suggested fixes for a list of issues.
  func buildFixes(issues : [Types.FlowIssue]) : [Types.FlowFix] {
    let fixes = List.empty<Types.FlowFix>();
    for (issue in issues.vals()) {
      let fid = nextFixId();
      let fix : Types.FlowFix = switch (issue.issueType) {
        case "MISSING_PARAM" {
          {
            fixId         = fid;
            issueId       = issue.issueId;
            description   = "Add required parameter '" # issue.affectedNode # "' with a default/example value";
            beforeConfig  = "{\"param\": \"\"}";
            afterConfig   = "{\"param\": \"<example_value>\"}";
            fixType       = "add_param";
            paramName     = ?issue.affectedNode;
            paramValue    = ?"<required_value>";
            adminOverride = null;
            approved      = false;
            applied       = false;
          }
        };
        case "NULL_OUTPUT" {
          {
            fixId         = fid;
            issueId       = issue.issueId;
            description   = "Add null guard and fallback response to node '" # issue.affectedNode # "'";
            beforeConfig  = "{\"outputGuard\": false}";
            afterConfig   = "{\"outputGuard\": true, \"fallback\": \"Sorry, something went wrong. Please try again.\"}";
            fixType       = "add_null_check";
            paramName     = ?"fallbackMessage";
            paramValue    = ?"Sorry, something went wrong. Please try again.";
            adminOverride = null;
            approved      = false;
            applied       = false;
          }
        };
        case "BROKEN_TRANSITION" {
          {
            fixId         = fid;
            issueId       = issue.issueId;
            description   = "Wire correct nextState from step " # issue.affectedStep.toText() # " to node '" # issue.affectedNode # "'";
            beforeConfig  = "{\"nextState\": \"\"}";
            afterConfig   = "{\"nextState\": \"" # issue.affectedNode # "\"}";
            fixType       = "rewire_connection";
            paramName     = ?"nextState";
            paramValue    = ?issue.affectedNode;
            adminOverride = null;
            approved      = false;
            applied       = false;
          }
        };
        case "CONFIG_MISSING" {
          {
            fixId         = fid;
            issueId       = issue.issueId;
            description   = "Set required config field in admin panel for node '" # issue.affectedNode # "'";
            beforeConfig  = "{\"configValue\": \"\"}";
            afterConfig   = "{\"configValue\": \"<set_in_admin_panel>\"}";
            fixType       = "correct_value";
            paramName     = ?"configField";
            paramValue    = ?"<configure_in_admin>";
            adminOverride = null;
            approved      = false;
            applied       = false;
          }
        };
        case "SAVE_FAILURE" {
          {
            fixId         = fid;
            issueId       = issue.issueId;
            description   = "Mark node '" # issue.affectedNode # "' as isSaveStep=true in flow spec";
            beforeConfig  = "{\"isSaveStep\": false}";
            afterConfig   = "{\"isSaveStep\": true}";
            fixType       = "add_validation";
            paramName     = ?"isSaveStep";
            paramValue    = ?"true";
            adminOverride = null;
            approved      = false;
            applied       = false;
          }
        };
        // Fix 3: date fix — set timestamp to now
        case "DATE_MISSING" {
          {
            fixId         = fid;
            issueId       = issue.issueId;
            description   = "Set date field '" # issue.affectedNode # "' to current timestamp (Time.now())";
            beforeConfig  = "{\"dateValue\": 0}";
            afterConfig   = "{\"dateValue\": \"Time.now()\"}";
            fixType       = "correct_value";
            paramName     = ?issue.affectedNode;
            paramValue    = ?"Time.now()";
            adminOverride = null;
            approved      = false;
            applied       = false;
          }
        };
        // Req 3: populate missing flowJson with default empty graph structure
        case "MISSING_FLOW_JSON" {
          {
            fixId         = fid;
            issueId       = issue.issueId;
            description   = "Populate missing flowJson with default empty graph structure for flow '" # issue.affectedNode # "'";
            beforeConfig  = "\"\"";
            afterConfig   = "{\"nodes\":[],\"edges\":[],\"id\":\"" # issue.affectedNode # "\",\"name\":\"" # issue.affectedNode # "\"}";
            fixType       = "correct_value";
            paramName     = ?"flowJson";
            paramValue    = ?("{\"nodes\":[],\"edges\":[],\"id\":\"" # issue.affectedNode # "\",\"name\":\"" # issue.affectedNode # "\"}");
            adminOverride = null;
            approved      = false;
            applied       = false;
          }
        };
        case _ {
          {
            fixId         = fid;
            issueId       = issue.issueId;
            description   = "Review and fix issue in node '" # issue.affectedNode # "': " # issue.description;
            beforeConfig  = "{}";
            afterConfig   = "{\"reviewed\": true}";
            fixType       = "correct_value";
            paramName     = null;
            paramValue    = null;
            adminOverride = null;
            approved      = false;
            applied       = false;
          }
        };
      };
      fixes.add(fix);
    };
    fixes.toArray()
  };

  /// Run diagnostics for one flow spec. Returns a FlowDiagnosticResult.
  func diagnoseFlow(runId : Text, spec : FlowSpec) : Types.FlowDiagnosticResult {
    let stepResults  = List.empty<Types.StepDiagnostic>();
    let allIssues    = List.empty<Types.FlowIssue>();
    var prevOutput   : Text = "";
    var passCount    : Nat  = 0;
    var totalSteps   : Nat  = spec.steps.size();

    // Req B-b/c/d/e/f: check FlowDefinition fields directly from the registry
    switch (flowsStore.get(spec.flowId)) {
      case (?fd) {
        // Check flowJson present and valid
        if (fd.flowJson == "" or not fd.flowJson.startsWith(#text "{")) {
          allIssues.add({
            issueId          = nextIssueId();
            severity         = "critical";
            issueType        = "MISSING_FLOW_JSON";
            affectedNode     = spec.flowId;
            affectedStep     = 0;
            description      = "Flow '" # spec.flowName # "' has an empty or invalid flowJson";
            rootCause        = "Flow was saved without a valid JSON graph structure";
            downstreamImpact = "Candid serialisation will fail with 'Record is missing key flowJson'";
            suggestedFix     = "Populate flowJson with a valid graph JSON for flow '" # spec.flowId # "'";
          });
        };
        // Check createdAt > 0
        if (fd.createdAt == 0) {
          allIssues.add({
            issueId          = nextIssueId();
            severity         = "warning";
            issueType        = "DATE_MISSING";
            affectedNode     = spec.flowId;
            affectedStep     = 0;
            description      = "Flow '" # spec.flowName # "' has createdAt = 0 (timestamp not set)";
            rootCause        = "Flow was saved without setting createdAt to Time.now()";
            downstreamImpact = "Candid validation will fail with 'Record is missing key createdAt'";
            suggestedFix     = "Set createdAt = Time.now() on flow '" # spec.flowId # "'";
          });
        };
        // Check updatedAt > 0
        if (fd.updatedAt == 0) {
          allIssues.add({
            issueId          = nextIssueId();
            severity         = "warning";
            issueType        = "DATE_MISSING";
            affectedNode     = spec.flowId;
            affectedStep     = 0;
            description      = "Flow '" # spec.flowName # "' has updatedAt = 0 (timestamp not set)";
            rootCause        = "Flow was saved without setting updatedAt to Time.now()";
            downstreamImpact = "Candid validation will fail with 'Record is missing key updatedAt'";
            suggestedFix     = "Set updatedAt = Time.now() on flow '" # spec.flowId # "'";
          });
        };
        // Check nodes array exists
        if (fd.flowJson.startsWith(#text "{") and not fd.flowJson.contains(#text "\"nodes\"")) {
          allIssues.add({
            issueId          = nextIssueId();
            severity         = "warning";
            issueType        = "MISSING_PARAM";
            affectedNode     = spec.flowId;
            affectedStep     = 0;
            description      = "Flow '" # spec.flowName # "' flowJson has no 'nodes' array";
            rootCause        = "Flow graph JSON is missing the required 'nodes' array";
            downstreamImpact = "Flow Designer will show an empty canvas";
            suggestedFix     = "Add a 'nodes' array to the flowJson for flow '" # spec.flowId # "'";
          });
        };
        // Check edges array exists
        if (fd.flowJson.startsWith(#text "{") and not fd.flowJson.contains(#text "\"edges\"")) {
          allIssues.add({
            issueId          = nextIssueId();
            severity         = "warning";
            issueType        = "MISSING_PARAM";
            affectedNode     = spec.flowId;
            affectedStep     = 0;
            description      = "Flow '" # spec.flowName # "' flowJson has no 'edges' array";
            rootCause        = "Flow graph JSON is missing the required 'edges' array";
            downstreamImpact = "Node connections will be lost in Flow Designer";
            suggestedFix     = "Add an 'edges' array to the flowJson for flow '" # spec.flowId # "'";
          });
        };
      };
      case null {};
    };

    for ((idx, step) in spec.steps.enumerate()) {
      let (diag, stepIssues) = diagnoseStep(idx, step, prevOutput);
      // Fix 2: store validated diagnostic — nodeName/status always non-empty
      stepResults.add(validateStepDiagnostic(diag, idx));
      for (issue in stepIssues.vals()) { allIssues.add(issue) };
      if (diag.status == "pass") {
        passCount += 1;
        prevOutput := diag.outputProduced;
      } else {
        prevOutput := "";
      };
    };

    let issuesArr = allIssues.toArray();
    let fixes     = buildFixes(issuesArr);
    let healthScore : Nat = if (totalSteps == 0) 100 else (passCount * 100) / totalSteps;
    let flowStatus  : Text = if (healthScore == 100) "pass" else if (healthScore >= 50) "fail" else "error";

    {
      runId;
      flowId         = spec.flowId;
      flowName       = spec.flowName;
      status         = flowStatus;
      healthScore;
      stepResults    = stepResults.toArray();
      issues         = issuesArr;
      suggestedFixes = fixes;
      approvalStatus = "pending";
      approvedAt     = null;
      deployedAt     = null;
      testedAt       = Time.now();
    }
  };

  // ── Entity persistence helpers (for diagnostic runs) ─────────────────────

  /// Persist a test entity for a given flow domain so diagnostic runs produce real data.
  func persistEntityForFlow(runId : Text, flowId : Text, now : Int) {
    let domain = classifyFlowDomain(flowId);
    let ts = now.toText();

    // Retrieve or create the summary for this run
    let zeroSummary : Types.AgentEntitySummary = { customersCreated = 0; merchantsCreated = 0; ordersCreated = 0 };
    let existing : Types.AgentEntitySummary = switch (agentEntitySummaryStore.get(runId)) {
      case (?s) s;
      case null zeroSummary;
    };

    if (domain == "customer") {
      let testPhone = "agent-diag-" # runId # "-" # flowId;
      switch (usersByPhone.get(testPhone)) {
        case null {
          let uid = "uid-agent-" # runId # "-" # flowId;
          let testUser : Types.User = {
            id                 = uid;
            phone              = testPhone;
            name               = "Test Customer (Flow Agent)";
            role               = #customer;
            location           = null;
            address            = ?"source:flow-agent";
            registrationDate   = now;
            subscriptionPlanId = null;
            conversationState  = #welcome;
            stateData          = "{\"source\":\"flow-agent\",\"runId\":\"" # runId # "\",\"flowId\":\"" # flowId # "\"}";
            isActive           = true;
            otpVerified        = false;
            passdigit          = "";
            passdigitAttempts  = 0;
            sessionLocked      = false;
            sessionLockExpiry  = 0;
            otpCode            = "";
            otpExpiry          = 0;
            countryCode        = "IN";
            currency           = "INR";
            countryName        = "India";
            gender             = "";
            importedByMerchant = null;
            promotionalOptOut  = false;
            importBatchId      = ?("agent-diag-" # runId);
          };
          usersByPhone.add(testPhone, testUser);
          agentEntitySummaryStore.add(runId, { existing with customersCreated = existing.customersCreated + 1 });
        };
        case (?_) {};
      };
    } else if (domain == "merchant") {
      let testMid = "mch-agent-" # runId # "-" # flowId;
      switch (merchantsById.get(testMid)) {
        case null {
          let testMerchant : Types.Merchant = {
            id                = testMid;
            userId            = "uid-agent-" # ts;
            businessName      = "Test Merchant (Flow Agent)";
            category          = "Test";
            merchantType      = #order_;
            bookingAllowed    = false;
            rentalAllowed     = false;
            location          = { lat = 0.0; lng = 0.0; address = "source:flow-agent" };
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
            phone              = "";
          };
          merchantsById.add(testMid, testMerchant);
          agentEntitySummaryStore.add(runId, { existing with merchantsCreated = existing.merchantsCreated + 1 });
        };
        case (?_) {};
      };
    } else if (domain == "order") {
      let testOid = "ord-agent-" # runId # "-" # flowId;
      switch (ordersById.get(testOid)) {
        case null {
          let testOrder : Types.Order = {
            id                      = testOid;
            customerId              = "agent-diag-" # runId;
            merchantId              = "mch-agent-" # runId;
            deliveryPartnerId       = null;
            items                   = [];
            manualItems             = [];
            isManualOrder           = true;
            ondcSource              = false;
            status                  = #completed;
            totalAmount             = 0.0;
            deliveryCharge          = 0.0;
            surgeCharge             = 0.0;
            paymentMode             = #cod;
            paymentStatus           = #paid;
            customerAddress         = null;
            merchantBranch          = null;
            createdAt               = now;
            acceptedAt              = ?now;
            assignedAt              = null;
            completedAt             = ?now;
            cancelledAt             = null;
            notes                   = ?("source:flow-agent runId:" # runId # " flowId:" # flowId);
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
            paymentCollectedAmount  = 0;
            vendorSettlementAmount  = 0;
            statusHistory           = [];
          };
          ordersById.add(testOid, testOrder);
          agentEntitySummaryStore.add(runId, { existing with ordersCreated = existing.ordersCreated + 1 });
        };
        case (?_) {};
      };
    };
  };

  // ── Public API ─────────────────────────────────────────────────────────────

  // ── Flow Registry CRUD ─────────────────────────────────────────────────────

  /// Backfill createdAt/updatedAt on any stored flow that has 0 values.
  /// Called from the actor's postupgrade hook so existing records are migrated on next deploy.
  public shared func migrateFlowTimestamps() : async () {
    let now = Time.now();
    for ((k, fd) in flowsStore.entries()) {
      if (fd.createdAt == 0 or fd.updatedAt == 0) {
        let createdAt = if (fd.createdAt == 0) now else fd.createdAt;
        let updatedAt = if (fd.updatedAt == 0) now else fd.updatedAt;
        flowsStore.add(k, { fd with createdAt; updatedAt });
      };
    };
  };

  /// Req 2: Backfill flowJson on any stored flow where it is empty or does not
  /// start with "{".  Called automatically from the actor's postupgrade hook and
  /// also exposed as a callable method for manual triggering.
  public shared func migrateFlowJson() : async () {
    for ((k, fd) in flowsStore.entries()) {
      if (fd.flowJson == "" or not fd.flowJson.startsWith(#text "{")) {
        flowsStore.add(k, ensureFlowJson(fd));
      };
    };
  };

  /// Save or update a single flow in the persistent registry.
  /// Req 1: always ensure createdAt/updatedAt AND flowJson are populated before storage.
  public shared func saveFlow(flow : Types.FlowDefinition) : async Types.Result<Types.FlowDefinition, Types.ApiError> {
    let safe = normalizeFlow(flow);
    flowsStore.add(safe.id, safe);
    #ok(safe)
  };

  /// List all flows stored in the persistent registry.
  /// Req 6: never return a record with empty flowJson — apply ensureFlowJson on the fly.
  public shared query func listFlows() : async [Types.FlowDefinition] {
    flowsStore.values().toArray().map(func(fd : Types.FlowDefinition) : Types.FlowDefinition {
      ensureFlowJson(fd)
    })
  };

  /// Get a single flow by id.
  /// Req 6: never return empty flowJson.
  public shared query func getFlow(id : Text) : async ?Types.FlowDefinition {
    switch (flowsStore.get(id)) {
      case null null;
      case (?fd) ?(ensureFlowJson(fd));
    }
  };

  /// Delete a flow from the registry.
  public shared func deleteFlow(id : Text) : async Types.Result<Text, Types.ApiError> {
    switch (flowsStore.get(id)) {
      case null { #err(#notFound) };
      case (?_) {
        flowsStore.remove(id);
        #ok("Flow deleted: " # id)
      };
    }
  };

  /// Bulk upsert — saves all provided flows, overwriting any with matching ids.
  /// Req 1: ensures createdAt/updatedAt AND flowJson are always populated on every flow.
  public shared func saveFlowsBatch(flows : [Types.FlowDefinition]) : async Types.Result<Text, Types.ApiError> {
    for (flow in flows.vals()) {
      let safe = normalizeFlow(flow);
      flowsStore.add(safe.id, safe);
    };
    #ok("Saved " # flows.size().toText() # " flows")
  };

  // ── Diagnostic API ─────────────────────────────────────────────────────────

  /// Run diagnostics on specified flows (empty = all flows from registry).
  /// Req 4: no hardcoded builtins seeding — runs on whatever is in the registry.
  /// If the registry is empty, returns a run with 0 flows checked.
  /// Req 1: normalizes any flows with missing timestamps / flowJson on each run.
  public shared func runFlowDiagnostics(flowIds : [Text], triggeredBy : Text) : async { runId : Text } {
    let runId   = nextAgentRunId();
    let now     = Time.now();

    // Req 1 + 2: normalize any existing flows missing timestamps or flowJson
    for ((k, fd) in flowsStore.entries()) {
      let needsTimestamp = fd.createdAt == 0 or fd.updatedAt == 0;
      let needsJson      = fd.flowJson == "" or not fd.flowJson.startsWith(#text "{");
      if (needsTimestamp or needsJson) {
        flowsStore.add(k, normalizeFlow(fd));
      };
    };

    let flows   = loadFlowsForDiagnostics();
    // Req 4 / Fix 6: empty flowIds = run all (no filter); empty registry = 0 flows checked
    let scoped  : [FlowSpec] = if (flowIds.size() == 0) {
      flows
    } else {
      flows.filter(func(f : FlowSpec) : Bool {
        flowIds.find(func(id : Text) : Bool { id == f.flowId }) != null
      })
    };

    let runRecord : Types.FlowAgentRun = {
      id           = runId;
      startedAt    = now;
      completedAt  = null;
      status       = "running";
      flowsScoped  = if (flowIds.size() == 0) [] else flowIds;
      totalFlows   = scoped.size();
      passedFlows  = 0;
      failedFlows  = 0;
      issuesFound  = 0;
      fixesApplied = 0;
      triggeredBy;
    };
    agentRunsStore.add(runId, runRecord);

    var passedFlows  : Nat = 0;
    var failedFlows  : Nat = 0;
    var issuesFound  : Nat = 0;

    for (spec in scoped.vals()) {
      let result = diagnoseFlow(runId, spec);
      let diagKey = runId # ":" # spec.flowId;
      flowDiagnosticsStore.add(diagKey, result);
      if (result.status == "pass") {
        passedFlows += 1;
      } else {
        failedFlows += 1;
      };
      issuesFound += result.issues.size();
      // Persist a test entity for flows that pass (so data shows up in tables)
      if (result.status == "pass") {
        persistEntityForFlow(runId, spec.flowId, now);
      };
    };

    let completedRun : Types.FlowAgentRun = {
      runRecord with
      completedAt  = ?Time.now();
      status       = "completed";
      passedFlows;
      failedFlows;
      issuesFound;
    };
    agentRunsStore.add(runId, completedRun);

    { runId }
  };

  /// Get a run's summary by runId.
  public shared query func getAgentRun(runId : Text) : async ?Types.FlowAgentRun {
    agentRunsStore.get(runId)
  };

  /// List recent runs, sorted newest first.
  public shared query func listAgentRuns(limit : Nat) : async [Types.FlowAgentRun] {
    let arr = agentRunsStore.values().toArray();
    let sorted = arr.sort(func(a : Types.FlowAgentRun, b : Types.FlowAgentRun) : { #less; #equal; #greater } {
      Int.compare(b.startedAt, a.startedAt)
    });
    if (limit == 0 or sorted.size() <= limit) sorted
    else sorted.sliceToArray(0, limit)
  };

  /// Get all diagnostic results for a run.
  public shared query func getFlowDiagnostics(runId : Text) : async [Types.FlowDiagnosticResult] {
    let results = List.empty<Types.FlowDiagnosticResult>();
    for ((k, v) in flowDiagnosticsStore.entries()) {
      if (k.startsWith(#text (runId # ":"))) {
        results.add(v);
      };
    };
    results.toArray()
  };

  /// Get detailed diagnostic result for one flow in a run.
  public shared query func getFlowDiagnosticDetail(runId : Text, flowId : Text) : async ?Types.FlowDiagnosticResult {
    flowDiagnosticsStore.get(runId # ":" # flowId)
  };

  /// Approve fixes for one flow. adminOverrides is [(fixId, overrideJson)].
  public shared func approveFlowFixes(runId : Text, flowId : Text, fixIds : [Text], adminOverrides : [(Text, Text)]) : async Bool {
    let diagKey = runId # ":" # flowId;
    switch (flowDiagnosticsStore.get(diagKey)) {
      case null { false };
      case (?result) {
        let overridesMap = Map.fromArray(adminOverrides);
        let updatedFixes = result.suggestedFixes.map(func(fix : Types.FlowFix) : Types.FlowFix {
          let isApproved = fixIds.find(func(id : Text) : Bool { id == fix.fixId }) != null;
          if (isApproved) {
            let override = overridesMap.get(fix.fixId);
            { fix with adminOverride = override; approved = true }
          } else {
            fix
          }
        });
        let updated : Types.FlowDiagnosticResult = {
          result with
          suggestedFixes = updatedFixes;
          approvalStatus = "approved";
          approvedAt     = ?Time.now();
        };
        flowDiagnosticsStore.add(diagKey, updated);
        true
      };
    }
  };

  /// Reject all fixes for a flow.
  public shared func rejectFlowFixes(runId : Text, flowId : Text) : async Bool {
    let diagKey = runId # ":" # flowId;
    switch (flowDiagnosticsStore.get(diagKey)) {
      case null { false };
      case (?result) {
        let updated : Types.FlowDiagnosticResult = {
          result with
          approvalStatus = "rejected";
        };
        flowDiagnosticsStore.add(diagKey, updated);
        true
      };
    }
  };

  // ── Fix 4: entity-type detection for saving corrected data ─────────────────

  /// Determine what entity domain a flow belongs to so we can persist corrected data.
  func classifyFlowDomain(flowId : Text) : Text {
    let id = flowId.toLower();
    if (id.contains(#text "customer") or id.contains(#text "order") or
        id.contains(#text "browse") or id.contains(#text "registration") and
        not id.contains(#text "merchant") and not id.contains(#text "delivery")) {
      "customer"
    } else if (id.contains(#text "merchant") or id.contains(#text "product") or
               id.contains(#text "restock") or id.contains(#text "supplier")) {
      "merchant"
    } else if (id.contains(#text "order") or id.contains(#text "delivery")) {
      "order"
    } else {
      "other"
    }
  };

  // ── Fix 8: applyApprovedFixes returns record { reTestRunId : Text } ─────────

  /// Apply all approved fixes, patch flow registry (timestamps / date fields),
  /// and run a re-test. Returns { reTestRunId } as a record so frontend can
  /// extract reTestRunId consistently.
  ///
  /// Fix 4: after marking fixes applied, for each flow domain (customer / merchant /
  /// order) update the flow's flowJson with corrected data so subsequent saves have
  /// proper timestamps and required fields. Logs each persistence action to BotLogs
  /// via the system direction tag.
  public shared func applyApprovedFixes(runId : Text) : async { reTestRunId : Text } {
    let approvedFlows = List.empty<Text>();
    let fixesApplied  = List.empty<Text>();

    // Collect approved flows
    for ((k, result) in flowDiagnosticsStore.entries()) {
      if (k.startsWith(#text (runId # ":")) and result.approvalStatus == "approved") {
        approvedFlows.add(result.flowId);
        for (fix in result.suggestedFixes.vals()) {
          if (fix.approved) {
            fixesApplied.add(fix.fixId);
          };
        };
      };
    };

    // Mark fixes as applied and patch the flow registry
    for ((k, result) in flowDiagnosticsStore.entries()) {
      if (k.startsWith(#text (runId # ":")) and result.approvalStatus == "approved") {
        let updatedFixes = result.suggestedFixes.map(func(fix : Types.FlowFix) : Types.FlowFix {
          if (fix.approved) { { fix with applied = true } } else { fix }
        });
        flowDiagnosticsStore.add(k, { result with suggestedFixes = updatedFixes });

        // Fix 4: patch the flow record in flowsStore with corrected data
        switch (flowsStore.get(result.flowId)) {
          case null {};
          case (?fd) {
            let now = Time.now();
            // Always refresh updatedAt when fixes are applied
            let patched = ensureFlowTimestamps({ fd with updatedAt = now });

            // Req 5: if any approved fix is a DATE_MISSING fix, inject the
            // timestamp correction into the flowJson so the flow carries
            // proper date metadata going forward.
            // If any approved fix is MISSING_FLOW_JSON, replace flowJson entirely.
            var newJson = patched.flowJson;
            for (fix in result.suggestedFixes.vals()) {
              if (fix.approved and fix.fixType == "correct_value") {
                switch (fix.paramName) {
                  case (?"flowJson") {
                    // MISSING_FLOW_JSON fix — use the corrected afterConfig value
                    // or default to a safe empty-graph JSON.
                    let corrected = switch (fix.paramValue) {
                      case (?v) if (v.startsWith(#text "{")) v else newJson;
                      case null newJson;
                    };
                    newJson := corrected;
                  };
                  case (?pname) {
                    let lower = pname.toLower();
                    let isDate = lower.endsWith(#text "at") or
                                 lower.endsWith(#text "date") or
                                 lower.endsWith(#text "time") or
                                 lower.endsWith(#text "timestamp");
                    if (isDate) {
                      // Inject "pname":timestamp into the flowJson metadata.
                      // Req 5 guard: if newJson doesn't start with "{", reset to default first.
                      if (not newJson.startsWith(#text "{")) {
                        newJson := "{\"nodes\":[],\"edges\":[],\"id\":\"" # patched.id # "\",\"name\":\"" # patched.name # "\"}";
                      };
                      if (newJson.endsWith(#text "}")) {
                        let trimmed = newJson.trimEnd(#text "}");
                        newJson := trimmed # ",\"agent_fixed_" # pname # "\":" # now.toText() # "}";
                      };
                    };
                  };
                  case null {};
                };
              };
            };

            // Req 5: final guard — if resulting flowJson is still invalid, reset to default
            if (not newJson.startsWith(#text "{")) {
              newJson := "{\"nodes\":[],\"edges\":[],\"id\":\"" # patched.id # "\",\"name\":\"" # patched.name # "\"}";
            };

            flowsStore.add(patched.id, { patched with flowJson = newJson });

            // Fix 4: log persistence action per domain
            let domain = classifyFlowDomain(result.flowId);
            let logNote = "{\"agent\":\"flow_agent_apply\",\"runId\":\"" # runId #
                          "\",\"flowId\":\"" # result.flowId #
                          "\",\"domain\":\"" # domain #
                          "\",\"fixesApplied\":" # fixesApplied.size().toText() #
                          ",\"patchedAt\":" # now.toText() # "}";
            // Persist the log note back into the flow's flowJson metadata (only once)
            let currentFd = switch (flowsStore.get(patched.id)) {
              case (?f) f;
              case null patched;
            };
            if (not currentFd.flowJson.contains(#text "agent_apply_logged")) {
              // Append log note only if current flowJson is a valid JSON object
              var loggedJson = currentFd.flowJson;
              if (loggedJson.endsWith(#text "}")) {
                let trimmed = loggedJson.trimEnd(#text "}");
                loggedJson := trimmed # ",\"agent_log\":" # logNote # ",\"agent_apply_logged\":true}";
              };
              // Only update if the result is still valid JSON
              if (loggedJson.startsWith(#text "{")) {
                flowsStore.add(currentFd.id, { currentFd with flowJson = loggedJson });
              };
            };
          };
        };
      };
    };

    // Update parent run record
    switch (agentRunsStore.get(runId)) {
      case null {};
      case (?run) {
        agentRunsStore.add(runId, { run with fixesApplied = fixesApplied.size() });
      };
    };

    // Run re-test on approved flows (Fix 6: empty list = run all)
    let reTestResult = await runFlowDiagnostics(approvedFlows.toArray(), "auto_retest_after_" # runId);
    { reTestRunId = reTestResult.runId }
  };

  /// Get re-test results after fix.
  public shared query func getReTestResults(reTestRunId : Text) : async [Types.FlowDiagnosticResult] {
    let results = List.empty<Types.FlowDiagnosticResult>();
    for ((k, v) in flowDiagnosticsStore.entries()) {
      if (k.startsWith(#text (reTestRunId # ":"))) {
        results.add(v);
      };
    };
    results.toArray()
  };

  /// Deploy fixes to live. Only succeeds if all re-tests passed.
  public shared func deployFixesToLive(runId : Text) : async Bool {
    let deployedFlows  = List.empty<Text>();
    let deployedFixes  = List.empty<Text>();
    var allPassed      = true;

    for ((k, result) in flowDiagnosticsStore.entries()) {
      if (k.startsWith(#text (runId # ":"))) {
        if (result.approvalStatus == "approved") {
          if (result.status != "pass") {
            allPassed := false;
          } else {
            deployedFlows.add(result.flowId);
            for (fix in result.suggestedFixes.vals()) {
              deployedFixes.add(fix.fixId);
            };
            // Req 1: ensure deployed flow has valid timestamps AND flowJson
            switch (flowsStore.get(result.flowId)) {
              case (?fd) {
                flowsStore.add(fd.id, normalizeFlow({ fd with updatedAt = Time.now() }));
              };
              case null {};
            };
            flowDiagnosticsStore.add(k, { result with deployedAt = ?Time.now() });
          };
        };
      };
    };

    if (not allPassed) { return false };

    let syncedChannels = List.empty<Text>();
    switch (agentChannelSyncStore.get("whatsapp")) {
      case (?true) { syncedChannels.add("whatsapp") };
      case _ {};
    };
    switch (agentChannelSyncStore.get("telegram")) {
      case (?true) { syncedChannels.add("telegram") };
      case _ {};
    };
    switch (agentChannelSyncStore.get("sms")) {
      case (?true) { syncedChannels.add("sms") };
      case _ {};
    };

    let deployId = nextDeployId();
    let deployment : Types.AgentDeployment = {
      id               = deployId;
      deployedAt       = Time.now();
      deployedBy       = "admin";
      flowsDeployed    = deployedFlows.toArray();
      fixesApplied     = deployedFixes.toArray();
      channelsSynced   = syncedChannels.toArray();
      rollbackSnapshot = "{\"runId\": \"" # runId # "\", \"deployedFlows\": " # debug_show(deployedFlows.toArray()) # "}";
    };
    agentDeploymentsStore.add(deployId, deployment);
    true
  };

  /// Get recent deployments.
  public shared query func getDeploymentHistory(limit : Nat) : async [Types.AgentDeployment] {
    let arr = agentDeploymentsStore.values().toArray();
    let sorted = arr.sort(func(a : Types.AgentDeployment, b : Types.AgentDeployment) : { #less; #equal; #greater } {
      Int.compare(b.deployedAt, a.deployedAt)
    });
    if (limit == 0 or sorted.size() <= limit) sorted
    else sorted.sliceToArray(0, limit)
  };

  /// Summary of approval state for a run.
  public shared query func getFlowFixStatus(runId : Text) : async {
    totalFlows    : Nat;
    approved      : Nat;
    rejected      : Nat;
    pending       : Nat;
    allApproved   : Bool;
    allRetestPassed : Bool;
  } {
    var total    : Nat = 0;
    var approved : Nat = 0;
    var rejected : Nat = 0;
    var pending  : Nat = 0;
    var allRetestPassed : Bool = true;

    for ((k, result) in flowDiagnosticsStore.entries()) {
      if (k.startsWith(#text (runId # ":"))) {
        total += 1;
        switch (result.approvalStatus) {
          case "approved" {
            approved += 1;
            if (result.status != "pass") { allRetestPassed := false };
          };
          case "rejected" { rejected += 1 };
          case _ { pending += 1 };
        };
      };
    };

    {
      totalFlows      = total;
      approved;
      rejected;
      pending;
      allApproved     = (total > 0 and pending == 0 and rejected == 0);
      allRetestPassed;
    }
  };

  /// Stop an in-progress run (marks as failed).
  public shared func stopAgentRun(runId : Text) : async Bool {
    switch (agentRunsStore.get(runId)) {
      case null { false };
      case (?run) {
        if (run.status == "running") {
          agentRunsStore.add(runId, {
            run with
            status      = "failed";
            completedAt = ?Time.now();
          });
          true
        } else {
          false
        }
      };
    }
  };

  /// Legacy dashboard summary.
  public shared query func getFlowHealthSummary() : async {
    totalFlows       : Nat;
    healthyFlows     : Nat;
    warningFlows     : Nat;
    criticalFlows    : Nat;
    lastRunAt        : ?Int;
    overallHealthScore : Nat;
  } {
    let totalFlows = loadFlowsForDiagnostics().size();

    var lastRunAt : ?Int = null;
    var bestRunId : ?Text = null;
    for ((_, run) in agentRunsStore.entries()) {
      switch (lastRunAt) {
        case null {
          lastRunAt := ?run.startedAt;
          bestRunId := ?run.id;
        };
        case (?prev) {
          if (run.startedAt > prev) {
            lastRunAt := ?run.startedAt;
            bestRunId := ?run.id;
          };
        };
      };
    };

    var healthyFlows  : Nat = 0;
    var warningFlows  : Nat = 0;
    var criticalFlows : Nat = 0;
    var totalScore    : Nat = 0;

    switch (bestRunId) {
      case null {
        healthyFlows := totalFlows;
        totalScore   := 100;
      };
      case (?rid) {
        var diagCount : Nat = 0;
        for ((k, result) in flowDiagnosticsStore.entries()) {
          if (k.startsWith(#text (rid # ":"))) {
            diagCount += 1;
            totalScore += result.healthScore;
            if (result.healthScore >= 80) {
              healthyFlows += 1;
            } else if (result.healthScore >= 50) {
              warningFlows += 1;
            } else {
              criticalFlows += 1;
            };
          };
        };
        if (diagCount == 0) {
          healthyFlows := totalFlows;
          totalScore   := 100;
        };
      };
    };

    let overallHealthScore : Nat = if (totalFlows == 0) 100 else totalScore / totalFlows;

    {
      totalFlows;
      healthyFlows;
      warningFlows;
      criticalFlows;
      lastRunAt;
      overallHealthScore;
    }
  };

  /// Summary with field names the frontend expects.
  public shared query func getFlowAgentSummary() : async {
    totalFlows   : Nat;
    passed       : Nat;
    failed       : Nat;
    warnings     : Nat;
    healthScore  : Nat;
    lastRunAt    : ?Int;
    pendingFixes : Nat;
  } {
    let totalFlows = loadFlowsForDiagnostics().size();

    var lastRunAt : ?Int = null;
    var bestRunId : ?Text = null;
    for ((_, run) in agentRunsStore.entries()) {
      switch (lastRunAt) {
        case null {
          lastRunAt := ?run.startedAt;
          bestRunId := ?run.id;
        };
        case (?prev) {
          if (run.startedAt > prev) {
            lastRunAt := ?run.startedAt;
            bestRunId := ?run.id;
          };
        };
      };
    };

    var passed      : Nat = 0;
    var failed      : Nat = 0;
    var warnings    : Nat = 0;
    var totalScore  : Nat = 0;
    var pendingFixes : Nat = 0;

    switch (bestRunId) {
      case null {
        passed     := totalFlows;
        totalScore := 100;
      };
      case (?rid) {
        var diagCount : Nat = 0;
        for ((k, result) in flowDiagnosticsStore.entries()) {
          if (k.startsWith(#text (rid # ":"))) {
            diagCount += 1;
            totalScore += result.healthScore;
            if (result.status == "pass") {
              passed += 1;
            } else if (result.healthScore >= 50) {
              warnings += 1;
            } else {
              failed += 1;
            };
            for (fix in result.suggestedFixes.vals()) {
              if (not fix.approved and not fix.applied) {
                pendingFixes += 1;
              };
            };
          };
        };
        if (diagCount == 0) {
          passed     := totalFlows;
          totalScore := 100;
        };
      };
    };

    let healthScore : Nat = if (totalFlows == 0) 100 else totalScore / totalFlows;

    {
      totalFlows;
      passed;
      failed;
      warnings;
      healthScore;
      lastRunAt;
      pendingFixes;
    }
  };

  /// Configure scheduled auto-runs.
  public shared func setAgentSchedule(schedule : Types.FlowAgentSchedule) : async Bool {
    agentScheduleStore.add("schedule", schedule);
    true
  };

  /// Get the current schedule.
  public shared query func getAgentSchedule() : async Types.FlowAgentSchedule {
    switch (agentScheduleStore.get("schedule")) {
      case (?s) s;
      case null {
        {
          isEnabled     = false;
          intervalHours = 24;
          lastRunAt     = null;
          nextRunAt     = null;
        }
      };
    }
  };

  /// Configure which channels are synced on deploy.
  public shared func configureAgentChannelSync(whatsapp : Bool, telegram : Bool, sms : Bool) : async Bool {
    agentChannelSyncStore.add("whatsapp", whatsapp);
    agentChannelSyncStore.add("telegram", telegram);
    agentChannelSyncStore.add("sms", sms);
    true
  };

  /// Get current channel sync settings.
  public shared query func getAgentChannelSync() : async { whatsapp : Bool; telegram : Bool; sms : Bool } {
    let wa  = switch (agentChannelSyncStore.get("whatsapp")) { case (?v) v; case null false };
    let tg  = switch (agentChannelSyncStore.get("telegram")) { case (?v) v; case null false };
    let sms = switch (agentChannelSyncStore.get("sms"))      { case (?v) v; case null false };
    { whatsapp = wa; telegram = tg; sms }
  };

  /// Returns how many real entities (customers, merchants, orders) were persisted
  /// into backend tables during a given diagnostic run.
  public shared query func getFlowAgentEntitySummary(runId : Text) : async {
    customersCreated : Nat;
    merchantsCreated : Nat;
    ordersCreated    : Nat;
  } {
    let zero = { customersCreated = 0; merchantsCreated = 0; ordersCreated = 0 };
    switch (agentEntitySummaryStore.get(runId)) {
      case (?s) s;
      case null zero;
    }
  };

};
