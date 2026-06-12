module {
  public type StepResult = {
    stepId          : Text;
    input           : Text;
    output          : Text;
    passed          : Bool;
    createdEntityId : ?Text;
  };

  public type ChatSimulatorSession = {
    sessionId        : Text;
    role             : Text;
    flowId           : Text;
    stepNumber       : Nat;
    timestamp        : Int;
    userInput        : Text;
    botOutput        : Text;
    createdEntityIds : [Text];
  };

  public type ScriptExecutionResult = {
    executionId  : Text;
    flowId       : Text;
    flowName     : Text;
    stepResults  : [StepResult];
    timestamp    : Int;
    totalSteps   : Nat;
    passedSteps  : Nat;
  };

  public type FlowAgentDiagnostic = {
    diagnosticId : Text;
    flowId       : Text;
    flowName     : Text;
    issue        : Text;
    severity     : Text;
    proposedFix  : Text;
    fixStatus    : Text;
    timestamp    : Int;
  };

  public type Advertisement = {
    adId        : Text;
    title       : Text;
    description : Text;
    targetRole  : Text;
    cityId      : ?Text;
    active      : Bool;
    createdAt   : Int;
  };
};
