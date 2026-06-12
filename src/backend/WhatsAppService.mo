import Types "Types";
import ChatbotEngine "ChatbotEngine";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Map "mo:core/Map";
import Text "mo:core/Text";

module {

  /// Unified WhatsApp config — ALL fields in one record so there is no
  /// in-memory-only side-store that loses data on canister restart.
  public type FullWhatsAppConfig = {
    webhookUrl        : Text;
    verifyToken       : Text;
    phoneNumberId     : Text;
    businessAccountId : Text;
    metaAppId         : Text;
    apiKey            : Text;   // access token / bearer token
    isTestMode        : Bool;
    isConnected       : Bool;
  };

  let CONFIG_KEY = "whatsapp_config";

  /// configStore holds a single key "whatsapp_config" → FullWhatsAppConfig.
  /// The map is created in main.mo and lives in enhanced orthogonal persistent
  /// heap memory — no `stable` keyword required.
  public class WhatsAppService(botEngine : ChatbotEngine.ChatbotEngine, configStore : Map.Map<Text, FullWhatsAppConfig>) {

  // ── Config Management ─────────────────────────────────────────────────────

  /// Save ALL WhatsApp fields atomically in one map entry.
  public func updateFullConfig(cfg : FullWhatsAppConfig) : async Types.Result<FullWhatsAppConfig, Types.ApiError> {
    configStore.add(CONFIG_KEY, cfg);
    #ok(cfg)
  };

  /// Returns the full config including businessAccountId and metaAppId.
  public func getFullConfig() : FullWhatsAppConfig {
    getConfigSync()
  };

  /// Update only the webhook callback URL without touching other fields.
  public func updateWebhookUrl(webhookUrl : Text) : async Types.Result<FullWhatsAppConfig, Types.ApiError> {
    let current = getConfigSync();
    let updated = { current with webhookUrl };
    configStore.add(CONFIG_KEY, updated);
    #ok(updated)
  };

  func getConfigSync() : FullWhatsAppConfig {
    switch (configStore.get(CONFIG_KEY)) {
      case (?cfg) cfg;
      case null {
        {
          apiKey            = "";
          phoneNumberId     = "";
          webhookUrl        = "";
          verifyToken       = "";
          businessAccountId = "";
          metaAppId         = "";
          isTestMode        = true;
          isConnected       = false;
        }
      };
    }
  };

  public func getConfig() : async FullWhatsAppConfig {
    getConfigSync()
  };

  /// Returns all WhatsApp config settings as flat key-value pairs for the Data Explorer.
  /// Always returns a valid array of 9 rows — even when no config has been saved yet.
  public func getWhatsAppConfigTable() : [{ key : Text; value : Text; category : Text }] {
    let config = getConfigSync();
    let maskedKey : Text = if (config.apiKey.size() > 6) "••••••••" else if (config.apiKey.size() > 0) "••••" else "(not set)";
    let bizAccId = if (config.businessAccountId == "") "(not set)" else config.businessAccountId;
    let metaAppId = if (config.metaAppId == "") "(not set)" else config.metaAppId;
    [
      { key = "Webhook URL";          value = if (config.webhookUrl == "") "(not set)" else config.webhookUrl;           category = "API"      },
      { key = "Phone Number ID";      value = if (config.phoneNumberId == "") "(not set)" else config.phoneNumberId;     category = "API"      },
      { key = "Business Account ID";  value = bizAccId;                                                                   category = "API"      },
      { key = "Meta App ID";          value = metaAppId;                                                                   category = "API"      },
      { key = "Verify Token";         value = if (config.verifyToken == "") "(not set)" else "••••••••";                 category = "Security" },
      { key = "API Version";          value = "v18.0";                                                                    category = "API"      },
      { key = "Is Test Mode";         value = if (config.isTestMode) "true" else "false";                                category = "Config"   },
      { key = "Is Connected";         value = if (config.isConnected) "true" else "false";                               category = "Status"   },
      { key = "API Key";              value = maskedKey;                                                                  category = "Security" },
    ]
  };

  // ── Webhook Verification ──────────────────────────────────────────────────

  /// Returns true when the supplied token matches the stored verifyToken.
  public func verifyWebhookToken(token : Text) : async Bool {
    let config = getConfigSync();
    config.verifyToken != "" and token == config.verifyToken
  };

  /// Meta webhook verification: if mode == "subscribe" and token matches,
  /// return ?challenge so the caller can echo it back to Meta.
  public func verifyWhatsAppWebhook(mode : Text, token : Text, challenge : Text) : ?Text {
    let config = getConfigSync();
    if (mode == "subscribe" and config.verifyToken != "" and token == config.verifyToken) {
      ?challenge
    } else {
      null
    }
  };

  // ── Message Sending ───────────────────────────────────────────────────────

  public func sendMessage(to : Text, message : Types.BotMessage, xform : OutCall.Transform) : async Types.Result<Text, Types.ApiError> {
    let config = getConfigSync();
    if (config.isTestMode) {
      return #ok("TEST_MODE: message logged for " # to # " type=" # message.messageType)
    };
    await sendTextMessage(to, message.body, xform)
  };

  public func sendTextMessage(to : Text, body : Text, xform : OutCall.Transform) : async Types.Result<Text, Types.ApiError> {
    let config = getConfigSync();
    if (config.isTestMode) {
      return #ok("TEST_MODE: text sent to " # to)
    };
    if (config.apiKey == "" or config.phoneNumberId == "") {
      return #err(#invalidInput("WhatsApp API not configured"))
    };
    let url = "https://graph.facebook.com/v18.0/" # config.phoneNumberId # "/messages";
    let payload = "{" #
      "\"messaging_product\":\"whatsapp\"," #
      "\"to\":\"" # to # "\"," #
      "\"type\":\"text\"," #
      "\"text\":{\"body\":\"" # escapeJson(body) # "\"}" #
      "}";
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = "Bearer " # config.apiKey },
      { name = "Content-Type"; value = "application/json" },
    ];
    try {
      let response = await OutCall.httpPostRequest(url, headers, payload, xform);
      #ok(response)
    } catch (_) {
      #err(#internalError("HTTP outcall failed"))
    }
  };

  public func sendQuickReply(to : Text, body : Text, replies : [Types.QuickReply], xform : OutCall.Transform) : async Types.Result<Text, Types.ApiError> {
    let config = getConfigSync();
    if (config.isTestMode) {
      var replyTitles = "";
      for (r in replies.values()) {
        replyTitles := replyTitles # "[" # r.title # "] ";
      };
      return #ok("TEST_MODE: quick_reply sent to " # to # " options=" # replyTitles)
    };
    if (config.apiKey == "" or config.phoneNumberId == "") {
      return #err(#invalidInput("WhatsApp API not configured"))
    };
    let url = "https://graph.facebook.com/v18.0/" # config.phoneNumberId # "/messages";
    let limit = if (replies.size() > 3) 3 else replies.size();
    var buttonsJson = "";
    var i = 0;
    while (i < limit) {
      let r = replies[i];
      let comma = if (i > 0) "," else "";
      buttonsJson := buttonsJson # comma # "{\"type\":\"reply\",\"reply\":{\"id\":\"" # r.id # "\",\"title\":\"" # escapeJson(r.title) # "\"}}";
      i += 1;
    };
    let payload = "{" #
      "\"messaging_product\":\"whatsapp\"," #
      "\"to\":\"" # to # "\"," #
      "\"type\":\"interactive\"," #
      "\"interactive\":{" #
        "\"type\":\"button\"," #
        "\"body\":{\"text\":\"" # escapeJson(body) # "\"}," #
        "\"action\":{\"buttons\":[" # buttonsJson # "]}" #
      "}" #
      "}";
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = "Bearer " # config.apiKey },
      { name = "Content-Type"; value = "application/json" },
    ];
    try {
      let response = await OutCall.httpPostRequest(url, headers, payload, xform);
      #ok(response)
    } catch (_) {
      #err(#internalError("HTTP outcall failed"))
    }
  };

  // ── Webhook event dispatch ─────────────────────────────────────────────────

  /// Parse incoming WhatsApp webhook JSON, extract phone and message text,
  /// then dispatch to ChatbotEngine. In test mode always parses a simplified format.
  public func processWebhookEvent(body : Text, xform : OutCall.Transform) : async Types.Result<[Types.BotMessage], Types.ApiError> {
    // Extract phone number: look for "from":"<phone>"
    let phoneOpt = extractJsonField(body, "from");
    // Extract message body: look for "body":"<text>"
    let messageOpt = extractJsonField(body, "body");
    // Extract type: look for "type":"<type>"
    let typeOpt = extractJsonField(body, "type");

    switch (phoneOpt, messageOpt) {
      case (?phone, ?message) {
        let msgType = switch (typeOpt) { case (?t) t; case null "text" };
        let responses = await botEngine.processMessage(phone, message, msgType);
        // Send responses back via WhatsApp API
        for (msg_ in responses.values()) {
          ignore await sendMessage(phone, msg_, xform);
        };
        #ok(responses)
      };
      case _ {
        #err(#invalidInput("Could not parse webhook event — missing 'from' or 'body' field"))
      };
    }
  };

  // ── JSON Helpers ──────────────────────────────────────────────────────────

  /// Extract the first value for a JSON key of the form: "key":"value"
  func extractJsonField(json : Text, key : Text) : ?Text {
    let pattern = "\"" # key # "\":\"";
    if (not json.contains(#text pattern)) { return null };
    let parts = json.split(#text pattern).toArray();
    if (parts.size() < 2) { return null };
    let afterKey = parts[1];
    let valueParts = afterKey.split(#text "\"").toArray();
    if (valueParts.size() < 1) { return null };
    ?valueParts[0]
  };

  /// Escape special characters for JSON string values.
  func escapeJson(text : Text) : Text {
    text
      .replace(#char '\u{0000}', "")
      .replace(#text "\\", "\\\\")
      .replace(#text "\"", "\\\"")
      .replace(#char '\n', "\\n")
      .replace(#char '\r', "\\r")
      .replace(#char '\t', "\\t")
  };

  }; // end class WhatsAppService
};
