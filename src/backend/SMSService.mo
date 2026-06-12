import Types "Types";
import ChatbotEngine "ChatbotEngine";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";

module {

  // ── Types ─────────────────────────────────────────────────────────────────

  /// All fields required to integrate a generic SMS provider.
  /// providerBaseUrl is used as the POST endpoint for sending messages.
  /// Supports Twilio-compatible APIs (POST with JSON body: to/from/body fields).
  public type SMSConfig = {
    id              : Text;
    provider        : Text;   // "twilio", "msg91", "fast2sms", "generic", etc.
    apiKey          : Text;   // account SID / API key
    authToken       : Text;   // auth token / API secret
    fromNumber      : Text;   // the sender number or sender ID
    webhookUrl      : Text;   // inbound webhook URL (for reference/display)
    isEnabled       : Bool;
    providerBaseUrl : Text;   // e.g. "https://api.twilio.com/2010-04-01/Accounts/ACXX/Messages.json"
  };

  /// Parsed incoming SMS message from any provider.
  public type SMSMessage = {
    from      : Text;   // sender phone number
    to        : Text;   // our receiving number
    body      : Text;   // message text
    messageId : Text;   // provider message ID
    timestamp : Int;    // nanoseconds
  };

  let CONFIG_KEY = "sms_config";

  // ── Service Class ─────────────────────────────────────────────────────────

  public class SMSService(
    configStore : Map.Map<Text, SMSConfig>,
    botEngine   : ChatbotEngine.ChatbotEngine,
  ) {

    // ── Config ──────────────────────────────────────────────────────────────

    public func updateSMSConfig(config : SMSConfig) : Types.Result<(), Text> {
      configStore.add(CONFIG_KEY, config);
      #ok(())
    };

    public func getSMSConfig() : ?SMSConfig {
      configStore.get(CONFIG_KEY)
    };

    /// Returns all SMS config fields as flat rows for the Data Explorer.
    public func getSMSConfigTable() : [{ field : Text; value : Text }] {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case (?c) c;
        case null {
          {
            id              = "";
            provider        = "";
            apiKey          = "";
            authToken       = "";
            fromNumber      = "";
            webhookUrl      = "";
            isEnabled       = false;
            providerBaseUrl = "";
          }
        };
      };
      let maskedKey : Text = if (cfg.apiKey.size() > 8) "••••••••" # cfg.apiKey.size().toText() # " chars" else if (cfg.apiKey.size() > 0) "••••" else "(not set)";
      let maskedToken : Text = if (cfg.authToken.size() > 4) "••••" else if (cfg.authToken.size() > 0) "set" else "(not set)";
      [
        { field = "Provider";         value = if (cfg.provider == "") "(not set)" else cfg.provider },
        { field = "API Key";          value = maskedKey },
        { field = "Auth Token";       value = maskedToken },
        { field = "From Number";      value = if (cfg.fromNumber == "") "(not set)" else cfg.fromNumber },
        { field = "Webhook URL";      value = if (cfg.webhookUrl == "") "(not set)" else cfg.webhookUrl },
        { field = "Provider Base URL";value = if (cfg.providerBaseUrl == "") "(not set)" else cfg.providerBaseUrl },
        { field = "Is Enabled";       value = if (cfg.isEnabled) "true" else "false" },
      ]
    };

    // ── Message Processing ───────────────────────────────────────────────────

    /// Route an incoming SMS through the shared ChatbotEngine and return
    /// the plain-text response lines to send back via SMS.
    /// Quick-reply buttons are converted to a numbered list so the user
    /// can reply with just a number.
    public func processSMSMessage(fromPhone : Text, messageBody : Text) : async [Text] {
      let responses = await botEngine.processMessage(fromPhone, messageBody, "text");
      if (responses.size() == 0) {
        return ["LocalBazar Kart: Sorry, could not process your message. Reply 'hi' to start."]
      };
      let lines = List.empty<Text>();
      for (msg in responses.values()) {
        // Strip HTML tags that are fine for WhatsApp/Telegram but look bad in SMS
        let cleanBody = stripHtmlTags(msg.body);
        if (cleanBody != "") {
          lines.add(cleanBody);
        };
        // Convert quick-reply buttons to numbered list
        if (msg.quickReplies.size() > 0) {
          var i : Nat = 1;
          for (qr in msg.quickReplies.values()) {
            lines.add(i.toText() # ". " # qr.title);
            i += 1;
          };
          lines.add("Reply with a number to continue.");
        };
      };
      lines.toArray()
    };

    // ── Outbound SMS ─────────────────────────────────────────────────────────

    /// Send an SMS reply to `toPhone` using the configured provider.
    /// Makes an HTTP outcall to the configured providerBaseUrl with a JSON body
    /// containing to/from/body fields (Twilio-compatible).
    /// Returns #ok(()) on success, #err(reason) on failure.
    public func sendSMSReply(
      toPhone : Text,
      text    : Text,
      xform   : OutCall.Transform,
    ) : async Types.Result<(), Text> {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return #err("SMS not configured") };
        case (?c)  c;
      };
      if (not cfg.isEnabled)       return #err("SMS integration is disabled");
      if (cfg.providerBaseUrl == "") return #err("SMS provider base URL not set");
      if (cfg.fromNumber == "")    return #err("SMS from number not set");

      let escapedText = escapeSmsJson(text);
      let escapedTo   = escapeSmsJson(toPhone);
      let escapedFrom = escapeSmsJson(cfg.fromNumber);

      // Build JSON body — Twilio-compatible format
      let body = "{\"to\":\"" # escapedTo # "\",\"from\":\"" # escapedFrom # "\",\"body\":\"" # escapedText # "\"}";

      // Build Authorization header — Twilio uses Basic auth (SID:Token base64)
      // For generic providers, API key is sent as Bearer token
      let authHeader = if (cfg.authToken != "") {
        // Twilio-style: concatenate SID:Token (provider handles Basic auth)
        "Basic " # encodeBase64(cfg.apiKey # ":" # cfg.authToken)
      } else {
        "Bearer " # cfg.apiKey
      };

      let headers : [OutCall.Header] = [
        { name = "Content-Type";  value = "application/json" },
        { name = "Authorization"; value = authHeader },
      ];

      try {
        ignore await OutCall.httpPostRequest(cfg.providerBaseUrl, headers, body, xform);
        #ok(())
      } catch (e) {
        #err("HTTP outcall failed: " # e.message())
      }
    };

    /// Send a test SMS to `toPhone` using the current configuration.
    public func testSMSConnection(toPhone : Text, xform : OutCall.Transform) : async Types.Result<Text, Text> {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return #err("SMS not configured") };
        case (?c)  c;
      };
      if (not cfg.isEnabled) return #err("SMS integration is disabled");
      if (cfg.apiKey == "")  return #err("API key is empty — please configure it first");
      let testMsg = "LocalBazar Kart test message. SMS integration is working!";
      switch (await sendSMSReply(toPhone, testMsg, xform)) {
        case (#ok())    #ok("Test SMS sent to " # toPhone);
        case (#err(e))  #err(e);
      }
    };

    // ── Helpers ──────────────────────────────────────────────────────────────

    /// Escape characters special inside JSON strings.
    func escapeSmsJson(t : Text) : Text {
      t
        .replace(#char '\u{0000}', "")
        .replace(#text "\\", "\\\\")
        .replace(#text "\"", "\\\"")
        .replace(#char '\n', " ")
        .replace(#char '\r', "")
        .replace(#char '\t', " ")
    };

    /// Very minimal HTML tag stripper: removes anything inside < >.
    func stripHtmlTags(t : Text) : Text {
      let buf = List.empty<Char>();
      var inTag = false;
      for (c in t.toIter()) {
        if (c == '<') {
          inTag := true;
        } else if (c == '>') {
          inTag := false;
        } else if (not inTag) {
          buf.add(c);
        };
      };
      Text.fromIter(buf.values())
    };

    /// Minimal Base64 encoder for Authorization header (ASCII input only).
    func encodeBase64(input : Text) : Text {
      let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      let bytes = List.empty<Nat>();
      for (c in input.toIter()) {
        bytes.add(c.toNat32().toNat());
      };
      let arr = bytes.toArray();
      let n = arr.size();
      let out = List.empty<Char>();
      var i : Nat = 0;
      while (i + 2 < n) {
        let b0 = arr[i];
        let b1 = arr[i + 1];
        let b2 = arr[i + 2];
        let idx0 = b0 / 4;
        let idx1 = (b0 % 4) * 16 + b1 / 16;
        let idx2 = (b1 % 16) * 4 + b2 / 64;
        let idx3 = b2 % 64;
        out.add(charAt(chars, idx0));
        out.add(charAt(chars, idx1));
        out.add(charAt(chars, idx2));
        out.add(charAt(chars, idx3));
        i += 3;
      };
      if (i + 1 == n) {
        let b0 = arr[i];
        out.add(charAt(chars, b0 / 4));
        out.add(charAt(chars, (b0 % 4) * 16));
        out.add('=');
        out.add('=');
      } else if (i + 2 == n) {
        let b0 = arr[i];
        let b1 = arr[i + 1];
        out.add(charAt(chars, b0 / 4));
        out.add(charAt(chars, (b0 % 4) * 16 + b1 / 16));
        out.add(charAt(chars, (b1 % 16) * 4));
        out.add('=');
      };
      Text.fromIter(out.values())
    };

    func charAt(t : Text, i : Nat) : Char {
      switch (t.toIter().drop(i).next()) {
        case (?c) c;
        case null '\u{0000}';
      }
    };

  }; // end class SMSService
};
