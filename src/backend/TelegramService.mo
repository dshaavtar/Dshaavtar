import Types "Types";
import ChatbotEngine "ChatbotEngine";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";

module {

  public type TelegramConfig = {
    botToken    : Text;
    webhookUrl  : Text;
    alertChatId : Text;
    isEnabled   : Bool;
    botUsername  : Text;
  };

  let CONFIG_KEY = "telegram_config";

  public class TelegramService(
    configStore : Map.Map<Text, TelegramConfig>,
    botEngine   : ChatbotEngine.ChatbotEngine,
  ) {

    // ── Config ──────────────────────────────────────────────────────────────

    public func updateTelegramConfig(config : TelegramConfig) : async Types.Result<(), Text> {
      configStore.add(CONFIG_KEY, config);
      #ok(())
    };

    public func getTelegramConfig() : async ?TelegramConfig {
      configStore.get(CONFIG_KEY)
    };

    /// Returns all config fields as flat rows for the Data Explorer.
    /// Always returns a valid array — never crashes when no config is stored.
    public func getTelegramConfigTable() : async [{ field : Text; value : Text }] {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case (?c) c;
        case null {
          {
            botToken    = "";
            webhookUrl  = "";
            alertChatId = "";
            isEnabled   = false;
            botUsername  = "";
          }
        };
      };
      let maskedToken : Text = if (cfg.botToken.size() > 8) "••••••••" # cfg.botToken.size().toText() # " chars" else if (cfg.botToken.size() > 0) "••••" else "(not set)";
      [
        { field = "Bot Token";    value = maskedToken },
        { field = "Bot Username"; value = if (cfg.botUsername == "") "(not set)" else "@" # cfg.botUsername },
        { field = "Webhook URL";  value = if (cfg.webhookUrl == "") "(not set)" else cfg.webhookUrl },
        { field = "Alert Chat ID";value = if (cfg.alertChatId == "") "(not set)" else cfg.alertChatId },
        { field = "Is Enabled";   value = if (cfg.isEnabled) "true" else "false" },
      ]
    };

    // ── Alert Chat ID helper ──────────────────────────────────────────────

    /// Returns a plain-text explanation of how to find the Telegram Alert Chat ID.
    /// Call this from the admin panel to display setup instructions to the user.
    public func getAlertChatIdHelper() : Text {
      "To find your Alert Chat ID: " #
      "1) Send any message to your bot on Telegram. " #
      "2) Open this URL in your browser: https://api.telegram.org/bot{YOUR_BOT_TOKEN}/getUpdates " #
      "   (replace {YOUR_BOT_TOKEN} with your actual bot token). " #
      "3) Look for the 'chat' object in the JSON response — it will contain: " #
      "   \"chat\": { \"id\": XXXXXX, ... }  — that number is your Alert Chat ID. " #
      "4) Paste that number into the Alert Chat ID field and save."
    };

    // ── Webhook verification ───────────────────────────────────────────────

    /// Validates that the given token matches the secret token configured for
    /// this bot (used on the Telegram webhook endpoint).
    public func verifyTelegramWebhook(token : Text) : async Bool {
      switch (configStore.get(CONFIG_KEY)) {
        case null false;
        case (?cfg) {
          // The verify token we accept is derived from the bot token — first
          // 10 characters, same pattern used by the admin config form.
          let expected = if (cfg.botToken.size() >= 10) {
            // Take first 10 chars of bot token as verify token
            Text.fromIter(cfg.botToken.toIter().take(10))
          } else {
            cfg.botToken
          };
          cfg.isEnabled and token == expected
        };
      }
    };

    // ── Webhook management ─────────────────────────────────────────────────

    /// Call Telegram's deleteWebhook API to unregister the current webhook.
    /// This is required before using getUpdates (polling) — both cannot run simultaneously.
    public func deleteWebhook(xform : OutCall.Transform) : async Types.Result<Text, Text> {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return #err("Telegram not configured") };
        case (?c)  c;
      };
      if (cfg.botToken == "") return #err("Bot token not set");
      let url = "https://api.telegram.org/bot" # cfg.botToken # "/deleteWebhook?drop_pending_updates=false";
      let getHeaders : [OutCall.Header] = [];
      try {
        let responseBody = await OutCall.httpGetRequest(url, getHeaders, xform);
        if (responseBody.contains(#text "\"ok\":true")) #ok("Webhook deleted successfully")
        else #err("deleteWebhook returned: " # responseBody)
      } catch (e) {
        #err("HTTP outcall failed: " # e.message())
      }
    };

    /// Call Telegram's getWebhookInfo API and return the raw JSON response.
    public func getWebhookInfo(xform : OutCall.Transform) : async Types.Result<Text, Text> {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return #err("Telegram not configured — save your bot token first") };
        case (?c)  c;
      };
      if (cfg.botToken == "") return #err("Bot token not configured — enter your token from BotFather and save");
      let isPlaceholder = cfg.botToken == "YOUR_BOT_TOKEN" or cfg.botToken == "placeholder" or cfg.botToken.size() < 10;
      if (isPlaceholder) return #err("Bot token looks invalid — it should be ~46 chars like '1234567890:AABBccDDee...'");
      let url = "https://api.telegram.org/bot" # cfg.botToken # "/getWebhookInfo";
      let getHeaders : [OutCall.Header] = [];
      try {
        let responseBody = await OutCall.httpGetRequest(url, getHeaders, xform);
        if (responseBody.contains(#text "\"ok\":false")) {
          #err("Telegram API error: " # responseBody)
        } else {
          #ok(responseBody)
        }
      } catch (e) {
        #err("HTTP outcall failed: " # e.message() # " — check that the bot token is correct and network is reachable")
      }
    };

    /// Force-clear the webhookUrl in stored config WITHOUT calling Telegram's deleteWebhook API.
    /// Use this when the deleteWebhook HTTP outcall itself is failing (network/token issues).
    /// After calling this, pollTelegramUpdates() will no longer be blocked by the conflict guard.
    /// Admin must manually re-register the webhook via setWebhook when ready.
    public func forceClearWebhookForPolling() : Types.Result<Text, Text> {
      switch (configStore.get(CONFIG_KEY)) {
        case null #err("Telegram not configured — nothing to clear");
        case (?cfg) {
          let oldUrl = cfg.webhookUrl;
          configStore.add(CONFIG_KEY, { cfg with webhookUrl = "" });
          #ok("Webhook URL cleared (was: '" # oldUrl # "'). Polling is now unlocked. Re-register webhook with setWebhook when ready.")
        };
      }
    };

    /// Full diagnostic: calls /getMe (extracts bot name) AND /sendMessage to alertChatId.
    /// Uses the EXACT same sendMessageWithLog function used by the real webhook handler,
    /// so if the diagnostic succeeds, real messages will also succeed.
    /// Returns a combined result with bot name, /getMe status, /sendMessage status, and any errors.
    public func testTelegramOutcall(
      xform  : OutCall.Transform,
      logMsg : (Text, Text, Text, Text, Text, Text, Text) -> (),
    ) : async { status : Text; body : Text; error : Text } {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return { status = ""; body = ""; error = "Telegram not configured" } };
        case (?c)  c;
      };
      if (cfg.botToken == "") return { status = ""; body = ""; error = "Bot token not set" };

      // Step 1: Call /getMe and extract bot username
      let getMeUrl = "https://api.telegram.org/bot" # cfg.botToken # "/getMe";
      let getHeaders : [OutCall.Header] = [];
      let getMeResult = try {
        let responseBody = await OutCall.httpGetRequest(getMeUrl, getHeaders, xform);
        let ok = responseBody.contains(#text "\"ok\":true");
        if (ok) {
          // Extract bot username from {"ok":true,"result":{"id":...,"username":"BotName",...}}
          let username = extractFieldFromGetMe(responseBody, "\"username\"");
          let firstName = extractFieldFromGetMe(responseBody, "\"first_name\"");
          let botName = if (username != "") "@" # username else if (firstName != "") firstName else "(unknown)";
          #ok("Bot: " # botName # " | /getMe: OK | raw: " # responseBody)
        } else {
          #err("/getMe returned not-ok: " # responseBody)
        }
      } catch (e) {
        #err("/getMe HTTP outcall failed: " # e.message())
      };

      switch (getMeResult) {
        case (#err(e)) {
          return { status = "getMe_failed"; body = ""; error = e }
        };
        case (#ok(getMeMsg)) {
          // Step 2: Test sendMessage via EXACT same code path as the real webhook handler
          if (cfg.alertChatId == "") {
            return {
              status = "partial";
              body   = getMeMsg;
              error  = "/getMe succeeded but alertChatId not set — cannot test sendMessage. Set Alert Chat ID to test full delivery."
            }
          };
          let testMsg = "🔧 Test message from LocalBazar Kart diagnostic — if you see this, sendMessage works!";
          let sendResult = await sendMessageWithLog(cfg.alertChatId, testMsg, cfg.botToken, xform, logMsg);
          switch (sendResult) {
            case (#ok()) {
              {
                status = "200 OK";
                body   = getMeMsg # " | /sendMessage: OK — test message delivered to chat " # cfg.alertChatId;
                error  = ""
              }
            };
            case (#err(e)) {
              {
                status = "sendMessage_failed";
                body   = getMeMsg;
                error  = "/sendMessage failed: " # e # " (chatId=" # cfg.alertChatId # ")"
              }
            };
          }
        };
      }
    };

    /// Send a test message to the given chatId using the EXACT same code path as
    /// the real webhook handler. Returns success/failure with full error details.
    public func testTelegramSendMessage(
      chatId : Text,
      xform  : OutCall.Transform,
      logMsg : (Text, Text, Text, Text, Text, Text, Text) -> (),
    ) : async Text {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return "Error: Telegram not configured" };
        case (?c)  c;
      };
      if (cfg.botToken == "") return "Error: Bot token not set";
      let msg = "🔧 LocalBazar Kart test message to chat " # chatId;
      switch (await sendMessageWithLog(chatId, msg, cfg.botToken, xform, logMsg)) {
        case (#ok())   "Success: message sent to chat " # chatId;
        case (#err(e)) "Error: " # e;
      }
    };

    /// Core sendMessage implementation shared by the webhook handler AND diagnostics.
    /// NEVER swallows errors — always logs to BotLogs via the logMsg callback.
    /// Returns #ok(()) on HTTP 200 success, #err(reason) on any failure.
    public func sendMessageWithLog(
      chatId   : Text,
      text     : Text,
      botToken : Text,
      xform    : OutCall.Transform,
      logMsg   : (Text, Text, Text, Text, Text, Text, Text) -> (),
    ) : async Types.Result<(), Text> {
      let url     = "https://api.telegram.org/bot" # botToken # "/sendMessage";
      let escaped = escapeTgJson(text);
      // tg-4: Ensure text field is never empty before sending to Telegram
      let safeText = if (text == "") "Hi! Type /menu to see available options." else text;
      let safeEscaped = escapeTgJson(safeText);
      let payload = "{\"chat_id\":" # chatId # ",\"text\":\"" # safeEscaped # "\",\"parse_mode\":\"HTML\"}";
      let _ = escaped; // suppress unused warning
      let headers : [OutCall.Header] = [{ name = "Content-Type"; value = "application/json" }];
      try {
        let responseBody = await OutCall.httpPostRequest(url, headers, payload, xform);
        let ok = responseBody.contains(#text "\"ok\":true");
        if (ok) {
          logMsg("telegram", "outgoing", chatId, safeText, "sendMessage", "success", "");
          #ok(())
        } else {
          let errDetail = "Telegram API error: " # responseBody;
          logMsg("telegram", "outgoing", chatId, safeText, "sendMessage", "error", errDetail);
          #err(errDetail)
        }
      } catch (e) {
        let rawErr = e.message();
        // tg-2: Detect IC0504 out-of-cycles and surface it prominently
        let errDetail : Text = if (rawErr.contains(#text "IC0504") or rawErr.contains(#text "out of cycles")) {
          "IC0504: HTTP outcall canister out of cycles — contact admin to top up cycles at canister 7fpuz-xqaaa-aaaac-qan7a-cai. Original: " # rawErr
        } else {
          "HTTP outcall failed: " # rawErr
        };
        logMsg("telegram", "outgoing", chatId, safeText, "sendMessage", "error", errDetail);
        #err(errDetail)
      }
    };

    /// Parse the bot name / username from a /getMe JSON response.
    func extractFieldFromGetMe(json : Text, fieldKey : Text) : Text {
      switch (findSubstringFrom(json, fieldKey)) {
        case null "";
        case (?pos) {
          let after = textDropN(json, pos + fieldKey.size());
          let trimmed = trimColonWhitespace(after);
          if (trimmed.size() == 0) return "";
          let first = charAt(trimmed, 0);
          if (first == '\"') extractQuotedStr(textDropN(trimmed, 1))
          else ""
        };
      }
    };

    // ── Polling (getUpdates) ───────────────────────────────────────────────

    /// Poll Telegram for pending updates using the getUpdates API (long-poll alternative to webhook).
    /// Called when webhook delivery fails (e.g. ICP gateway 404 issue).
    /// Each update is processed through the chatbot engine and a reply is sent via HTTP outcall.
    /// `currentOffset` is the last processed update_id; we request offset+1 so replays never occur.
    /// `setOffset` callback persists the new offset after successful processing.
    ///
    /// IMPORTANT: If a webhook URL is currently configured in admin config, Telegram will return
    /// 409 Conflict when getUpdates is called. This function checks for that condition and returns
    /// an error rather than wasting an HTTP outcall.
    public func pollUpdates(
      currentOffset : Int,
      xform         : OutCall.Transform,
      setOffset     : (Int) -> (),
      logMsg        : (Text, Text, Text, Text, Text, Text, Text) -> (),
      logMsgRaw     : (Text, Text, Text, Text, Text, Text, Text, Text) -> (),
    ) : async Types.Result<Nat, Text> {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return #err("Telegram not configured") };
        case (?c)  c;
      };
      if (not cfg.isEnabled) return #err("Telegram integration is disabled");
      if (cfg.botToken == "") return #err("Bot token not set");

      // CONFLICT GUARD: Telegram returns 409 Conflict if a webhook URL is registered
      // and getUpdates is called simultaneously. Fail fast here with a clear error.
      if (cfg.webhookUrl != "") {
        return #err(
          "getUpdates is disabled because your webhook is active. " #
          "Telegram routes all incoming messages to your webhook URL instead. " #
          "Check Bot Logs to see incoming messages. " #
          "To use polling instead, clear your webhook URL first."
        )
      };

      // Build getUpdates URL — offset = lastProcessedId + 1 to skip already-seen updates
      let offsetParam = if (currentOffset > 0) "?offset=" # (currentOffset + 1).toText() # "&timeout=0&limit=10"
                        else "?timeout=0&limit=10";
      let url = "https://api.telegram.org/bot" # cfg.botToken # "/getUpdates" # offsetParam;

      // Fetch updates from Telegram
      let getHeaders : [OutCall.Header] = [];
      let responseBody : Text = try {
        await OutCall.httpGetRequest(url, getHeaders, xform)
      } catch (e) {
        return #err("HTTP outcall to getUpdates failed: " # e.message())
      };

      logMsgRaw("telegram", "incoming", "poll", "getUpdates response", "polling", "success", "", responseBody);

      // Check ok field in response
      if (not responseBody.contains(#text "\"ok\":true")) {
        return #err("Telegram getUpdates returned not-ok: " # responseBody)
      };

      // Extract the updates array — parse each update_id, chat.id, text
      let updates = extractUpdatesFromJson(responseBody);
      var processed : Nat = 0;
      var maxUpdateId : Int = currentOffset;

      for (update in updates.vals()) {
        let (updateId, chatId, userId, msgText, msgType) = update;
        if (updateId > maxUpdateId) maxUpdateId := updateId;

        if (chatId == "") {
          logMsg("telegram", "incoming", "poll-unknown", "(no chatId in update)", "polling", "error", "Could not extract chatId from update");
        } else if (msgText == "") {
          logMsg("telegram", "incoming", chatId, "(no text)", "polling", "error", "Empty message text in polled update");
          // Still send an acknowledgment so the user knows the bot is alive
          let ackMsg = "Please type a message or command. Type 'hi' to start.";
          switch (await sendMessageWithLog(chatId, ackMsg, cfg.botToken, xform, logMsg)) {
            case (#ok()) {};
            case (#err(_)) {};
          };
        } else {
          logMsgRaw("telegram", "incoming", chatId, msgText, "polling", "success", "", "updateId=" # updateId.toText());

          // Process through chatbot engine
          let responseJson : Text = try {
            await processTelegramMessage(chatId, userId, msgText, msgType)
          } catch (e) {
            let errDetail = "Flow engine threw: " # e.message();
            logMsg("telegram", "outgoing", chatId, "(flow engine error)", "polling", "error", errDetail);
            buildTelegramText(chatId, "Bot error (flow engine failed). Please type 'hi' to start over.", [])
          };

          // Send reply to Telegram via shared sendMessageWithLog (never swallows errors)
          switch (await sendMessageWithLog(chatId, responseJson, cfg.botToken, xform, logMsg)) {
            case (#ok()) {
              processed += 1;
            };
            case (#err(e)) {
              logMsg("telegram", "outgoing", chatId, responseJson, "polling", "error", "Reply delivery failed: " # e);
            };
          };
        };
      };

      // Persist the new offset so next poll skips these updates
      if (maxUpdateId > currentOffset) {
        setOffset(maxUpdateId);
      };

      #ok(processed)
    };

    /// Parse Telegram getUpdates JSON response and extract (updateId, chatId, userId, text, msgType) tuples.
    /// Uses simple text search — no JSON library needed for this well-known format.
    func extractUpdatesFromJson(json : Text) : [(Int, Text, Text, Text, Text)] {
      let results = List.empty<(Int, Text, Text, Text, Text)>();
      // Find "update_id" occurrences — each one marks the start of an update object
      var searchFrom = 0;
      let jsonSize = json.size();
      label outer loop {
        if (searchFrom >= jsonSize) break outer;
        let slice = textDropN(json, searchFrom);
        switch (findSubstringFrom(slice, "\"update_id\"")) {
          case null break outer;
          case (?pos) {
            let absolutePos = searchFrom + pos;
            // Extract update_id value (numeric)
            let afterKey = textDropN(json, absolutePos + 11); // skip "update_id"
            let trimmed = trimColonWhitespace(afterKey);
            let updateIdText = extractDigits(trimmed);
            let updateId : Int = textToInt(updateIdText);

            // Find the chat id and text within this update's scope
            // We look at a window of ~2000 chars from this update_id position
            let windowSize = 2000;
            let windowEnd = if (absolutePos + windowSize > jsonSize) jsonSize else absolutePos + windowSize;
            let window = textSliceN(json, absolutePos, windowEnd);

            let isCallback = window.contains(#text "\"callback_query\"");
            let isContact  = window.contains(#text "\"contact\"");
            let chatId  = extractIdFromObj(window, "\"chat\"");
            let userId  = extractIdFromObj(window, "\"from\"");
            let msgText = if (isCallback) extractStrField(window, "\"data\"")
                          else if (isContact) {
                            // For contact shares: extract phone_number from contact object
                            let phone = extractStrField(window, "\"phone_number\"");
                            if (phone != "") "CONTACT:" # phone
                            else extractStrField(window, "\"text\"")
                          }
                          else extractStrField(window, "\"text\"");
            let msgType = if (isCallback) "callback"
                          else if (isContact) "contact"
                          else "text";

            results.add((updateId, chatId, userId, msgText, msgType));
            // Advance past this update_id to avoid re-matching same position
            searchFrom := absolutePos + 11;
          };
        };
      };
      results.toArray()
    };

    // ── JSON helpers for polling parser ───────────────────────────────────

    func textDropN(t : Text, n : Nat) : Text {
      if (n == 0) return t;
      Text.fromIter(t.toIter().drop(n))
    };

    func textSliceN(t : Text, from : Nat, to : Nat) : Text {
      let len : Nat = if (to > from) (to - from : Nat) else 0;
      Text.fromIter(t.toIter().drop(from).take(len))
    };

    func findSubstringFrom(haystack : Text, needle : Text) : ?Nat {
      let hs = haystack.size();
      let ns = needle.size();
      if (ns == 0) return ?0;
      if (ns > hs) return null;
      var i : Nat = 0;
      while (i + ns <= hs) {
        if (textSliceN(haystack, i, i + ns) == needle) return ?i;
        i += 1;
      };
      null
    };

    func trimColonWhitespace(t : Text) : Text {
      let iter = t.toIter();
      var result = "";
      var foundColon = false;
      label scan loop {
        switch (iter.next()) {
          case null break scan;
          case (?c) {
            if (not foundColon) {
              if (c == ':') { foundColon := true }
              else if (c == ' ' or c == '\t' or c == '\n' or c == '\r') {}
              else { break scan }
            } else {
              if (c == ' ' or c == '\t' or c == '\n' or c == '\r') {}
              else {
                result := Text.fromChar(c) # Text.fromIter(iter);
                break scan
              }
            }
          };
        }
      };
      result
    };

    func extractDigits(t : Text) : Text {
      let buf = List.empty<Char>();
      label scan for (c in t.toIter()) {
        if (c >= '0' and c <= '9') { buf.add(c) }
        else if (c == '-' and buf.size() == 0) { buf.add(c) }
        else { break scan };
      };
      Text.fromIter(buf.values())
    };

    func textToInt(t : Text) : Int {
      if (t == "") return 0;
      var result : Int = 0;
      var negative = false;
      var first = true;
      for (c in t.toIter()) {
        if (first and c == '-') { negative := true; first := false }
        else if (c >= '0' and c <= '9') {
          result := result * 10 + (c.toNat32() - '0'.toNat32()).toNat();
          first := false;
        };
      };
      if (negative) -result else result
    };

    func extractIdFromObj(json : Text, objKey : Text) : Text {
      switch (findSubstringFrom(json, objKey)) {
        case null "";
        case (?pos) {
          let after = textDropN(json, pos + objKey.size());
          switch (findSubstringFrom(after, "\"id\"")) {
            case null "";
            case (?idPos) {
              let afterId = textDropN(after, idPos + 4);
              let trimmed = trimColonWhitespace(afterId);
              if (trimmed.size() == 0) return "";
              let first = charAt(trimmed, 0);
              if (first == '\"') extractQuotedStr(textDropN(trimmed, 1))
              else extractDigits(trimmed)
            };
          }
        };
      }
    };

    func extractStrField(json : Text, fieldKey : Text) : Text {
      switch (findSubstringFrom(json, fieldKey)) {
        case null "";
        case (?pos) {
          let after = textDropN(json, pos + fieldKey.size());
          let trimmed = trimColonWhitespace(after);
          if (trimmed.size() == 0) return "";
          let first = charAt(trimmed, 0);
          if (first == '\"') extractQuotedStr(textDropN(trimmed, 1))
          else extractDigits(trimmed)
        };
      }
    };

    func charAt(t : Text, i : Nat) : Char {
      switch (t.toIter().drop(i).next()) {
        case (?c) c;
        case null '\u{0000}';
      }
    };

    func extractQuotedStr(t : Text) : Text {
      let buf = List.empty<Char>();
      let iter = t.toIter();
      var escaped = false;
      label scan loop {
        switch (iter.next()) {
          case null break scan;
          case (?c) {
            if (escaped) {
              let mapped : Char = switch (c) {
                case 'n'  '\n';
                case 'r'  '\r';
                case 't'  '\t';
                case _    c;
              };
              buf.add(mapped);
              escaped := false;
            } else if (c == '\\') {
              escaped := true;
            } else if (c == '\"') {
              break scan;
            } else {
              buf.add(c);
            }
          };
        }
      };
      Text.fromIter(buf.values())
    };

    // ── Message routing ────────────────────────────────────────────────────

    /// Routes the incoming Telegram message through the shared ChatbotEngine
    /// (identical routing to WhatsApp) and returns a Telegram-formatted
    /// JSON response string with inline_keyboard for quick replies.
    public func processTelegramMessage(
      chatId      : Text,
      _userId     : Text,
      messageText : Text,
      messageType : Text,
    ) : async Text {
      // Use chatId as the "phone" identifier so sessions are scoped per chat.
      let responses = await botEngine.processMessage(chatId, messageText, messageType);

      // tg-4: Guard — collect all non-empty bodies; fall back if all are empty.
      var combinedBody = "";
      var hasContent = false;
      for (msg in responses.vals()) {
        let trimmed = msg.body;
        if (trimmed != "") {
          if (hasContent) {
            combinedBody := combinedBody # "\n" # trimmed;
          } else {
            combinedBody := trimmed;
            hasContent := true;
          };
        };
      };

      let safeBody : Text = if (not hasContent or combinedBody == "") {
        // tg-4: Never pass empty text — use a safe fallback
        "Type /menu to see available options."
      } else {
        combinedBody
      };

      // Use quick replies from the last message that has them, or none
      let lastWithReplies = responses.vals().filter(func(m) { m.quickReplies.size() > 0 });
      let quickReplies : [Types.QuickReply] = switch (lastWithReplies.next()) {
        // Walk to the last one
        case null {
          if (responses.size() > 0) responses[responses.size() - 1].quickReplies
          else []
        };
        case (?first) {
          var last = first;
          for (m in lastWithReplies) { last := m };
          last.quickReplies
        };
      };

      buildTelegramText(chatId, safeBody, quickReplies)
    };

    // ── Outbound messaging ─────────────────────────────────────────────────

    /// Send a plain text message to a Telegram chat via Bot API HTTP outcall.
    /// Errors are returned as #err — never swallowed.
    public func sendTelegramMessage(chatId : Text, text : Text, xform : OutCall.Transform) : async Types.Result<(), Text> {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return #err("Telegram not configured") };
        case (?c)  c;
      };
      if (not cfg.isEnabled) return #err("Telegram integration is disabled");
      if (cfg.botToken == "") return #err("Bot token not set");

      let url = "https://api.telegram.org/bot" # cfg.botToken # "/sendMessage";
      let payload = "{\"chat_id\":" # chatId # ",\"text\":\"" # escapeTgJson(text) # "\",\"parse_mode\":\"HTML\"}";
      let headers : [OutCall.Header] = [
        { name = "Content-Type"; value = "application/json" },
      ];
      try {
        let responseBody = await OutCall.httpPostRequest(url, headers, payload, xform);
        if (responseBody.contains(#text "\"ok\":true")) {
          #ok(())
        } else {
          #err("Telegram API error: " # responseBody)
        }
      } catch (e) {
        #err("HTTP outcall failed: " # e.message())
      }
    };

    /// Send an alert message to the configured alertChatId.
    /// Silently swallows errors — alerts are best-effort.
    public func sendTelegramAlert(text : Text, xform : OutCall.Transform) : async () {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  return;
        case (?c)  c;
      };
      if (not cfg.isEnabled or cfg.alertChatId == "") return;
      ignore await sendTelegramMessage(cfg.alertChatId, text, xform);
    };

    /// Verify the bot token via /getMe only — does NOT require alertChatId.
    /// Returns the bot username and ID on success.
    public func testBotToken(xform : OutCall.Transform) : async Types.Result<Text, Text> {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return #err("Telegram not configured — save your bot token first") };
        case (?c)  c;
      };
      if (not cfg.isEnabled) return #err("Telegram integration is disabled");
      if (cfg.botToken == "") return #err("Bot token is empty — please configure it first");
      let url = "https://api.telegram.org/bot" # cfg.botToken # "/getMe";
      let getHeaders : [OutCall.Header] = [];
      try {
        let responseBody = await OutCall.httpGetRequest(url, getHeaders, xform);
        if (not responseBody.contains(#text "\"ok\":true")) {
          return #err("getMe returned: " # responseBody)
        };
        // Extract username and id from response
        let username = extractJsonStringFrom(responseBody, "\"username\"");
        let botId    = extractJsonStringFrom(responseBody, "\"id\"");
        let usernameDisplay = if (username != "") "@" # username else "(username not found)";
        let idLabel = if (botId != "") " (ID: " # botId # ")" else "";
        #ok("Bot verified: " # usernameDisplay # idLabel)
      } catch (e) {
        #err("HTTP outcall failed: " # e.message())
      }
    };

    /// Send a test message to the alertChatId to verify the bot token works.
    public func testTelegramConnection(xform : OutCall.Transform) : async Types.Result<Text, Text> {
      let cfg = switch (configStore.get(CONFIG_KEY)) {
        case null  { return #err("Telegram not configured") };
        case (?c)  c;
      };
      if (not cfg.isEnabled) return #err("Telegram integration is disabled");
      if (cfg.botToken == "") return #err("Bot token is empty — please configure it first");
      if (cfg.alertChatId == "") return #err("Alert Chat ID required for connection test — set it in Telegram Config");

      let testMsg = "✅ LocalBazar Kart 🛒 — Telegram bot connected successfully!";
      switch (await sendTelegramMessage(cfg.alertChatId, testMsg, xform)) {
        case (#ok()) #ok("Test message sent to " # cfg.alertChatId);
        case (#err(e)) #err(e);
      }
    };


    /// Returns the current delivery mode (webhook / polling / inactive) with an explanation.
    public func getTelegramDeliveryMode() : { mode : Text; explanation : Text } {
      switch (configStore.get(CONFIG_KEY)) {
        case null {
          { mode = "inactive"; explanation = "No Telegram configuration saved yet." }
        };
        case (?cfg) {
          if (cfg.webhookUrl != "") {
            {
              mode = "webhook";
              explanation = "Telegram is routing all messages to your webhook URL. getUpdates will return empty."
            }
          } else {
            {
              mode = "polling";
              explanation = "Polling mode active. Messages fetched via getUpdates."
            }
          }
        };
      }
    };

    /// Simple helper — extracts the first JSON value after a given key string.
    /// Reuses the existing extractStrField / extractDigits / findSubstringFrom helpers.
    func extractJsonStringFrom(json : Text, keyPrefix : Text) : Text {
      extractStrField(json, keyPrefix)
    };

    // ── Telegram JSON helpers ──────────────────────────────────────────────

    /// Build a sendMessage JSON payload (used internally and exported for the
    /// processTelegramWebhook response path).
    public func buildTelegramText(chatId : Text, body : Text, quickReplies : [Types.QuickReply]) : Text {
      let escapedBody = escapeTgJson(body);
      if (quickReplies.size() == 0) {
        return "{\"chat_id\":" # chatId # ",\"text\":\"" # escapedBody # "\",\"parse_mode\":\"HTML\"}";
      };
      // Build inline_keyboard rows — 2 buttons per row
      let rows = List.empty<Text>();
      var i = 0;
      let limit = quickReplies.size();
      while (i < limit) {
        let btn1 = quickReplies[i];
        let btn1Json = "{\"text\":\"" # escapeTgJson(btn1.title) # "\",\"callback_data\":\"" # escapeTgJson(btn1.payload) # "\"}";
        let rowJson = if (i + 1 < limit) {
          let btn2 = quickReplies[i + 1];
          let btn2Json = "{\"text\":\"" # escapeTgJson(btn2.title) # "\",\"callback_data\":\"" # escapeTgJson(btn2.payload) # "\"}";
          "[" # btn1Json # "," # btn2Json # "]"
        } else {
          "[" # btn1Json # "]"
        };
        rows.add(rowJson);
        i += 2;
      };
      var keyboardRows = "";
      var first = true;
      for (row in rows.values()) {
        if (not first) keyboardRows := keyboardRows # ",";
        keyboardRows := keyboardRows # row;
        first := false;
      };
      "{\"chat_id\":" # chatId # "," #
      "\"text\":\"" # escapedBody # "\"," #
      "\"parse_mode\":\"HTML\"," #
      "\"reply_markup\":{\"inline_keyboard\":[" # keyboardRows # "]}}"
    };

    /// Escape characters that are special inside Telegram Bot API JSON strings.
    func escapeTgJson(text : Text) : Text {
      text
        .replace(#char '\u{0000}', "")
        .replace(#text "\\", "\\\\")
        .replace(#text "\"", "\\\"")
        .replace(#char '\n', "\\n")
        .replace(#char '\r', "\\r")
        .replace(#char '\t', "\\t")
    };

  }; // end class TelegramService
};
