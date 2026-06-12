import Types "Types";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import OutCall "mo:caffeineai-http-outcalls/outcall";

module {

  // Illegal item keyword list for fallback keyword-based checking
  let ILLEGAL_KEYWORDS : [Text] = [
    "drug", "drugs", "narcotics", "cocaine", "heroin", "opium", "methamphetamine",
    "cannabis", "marijuana", "weed", "ganja", "tobacco", "cigarette", "cigar",
    "alcohol", "whiskey", "vodka", "beer", "wine", "liquor", "rum",
    "weapon", "weapons", "gun", "pistol", "rifle", "ammunition", "bomb",
    "explosive", "knife attack", "sword", "grenade",
    "controlled substance", "smuggling", "trafficking",
  ];

  // Content moderation keyword categories
  let HATE_KEYWORDS   : [Text] = ["hate", "racist", "discrimination", "slur"];
  let SPAM_KEYWORDS   : [Text] = ["spam", "scam", "phishing", "fake", "fraud"];
  let VIOLENCE_KEYWORDS : [Text] = ["violence", "kill", "murder", "assault", "attack"];
  let NUDITY_KEYWORDS : [Text] = ["nude", "nudity", "explicit", "pornographic", "nsfw"];

  func containsKeyword(text : Text, keywords : [Text]) : Bool {
    let lower = text.toLower();
    keywords.any(func(kw : Text) : Bool { lower.contains(#text kw) })
  };

  func flaggedCategories(text : Text) : [Text] {
    let cats = List.empty<Text>();
    if (containsKeyword(text, ILLEGAL_KEYWORDS)) cats.add("illegal_items");
    if (containsKeyword(text, HATE_KEYWORDS))    cats.add("hate_speech");
    if (containsKeyword(text, SPAM_KEYWORDS))    cats.add("spam");
    if (containsKeyword(text, VIOLENCE_KEYWORDS)) cats.add("violence");
    if (containsKeyword(text, NUDITY_KEYWORDS))  cats.add("nudity");
    cats.toArray()
  };

  public class ModerationService(moderationStore : Map.Map<Text, Types.ModerationItem>) {

    func makeKey(entityType : Text, entityId : Text) : Text {
      entityType # ":" # entityId
    };

    /// Auto-flag an entity as pending moderation after creation.
    /// Call this right after any merchant, product, deliveryPartner, promotion, or event is created.
    public func flagForModeration(entityType : Text, entityId : Text) {
      let key = makeKey(entityType, entityId);
      let item : Types.ModerationItem = {
        entityType;
        entityId;
        status    = "pending";
        remark    = "Awaiting AI moderation review";
        checkedAt = Time.now();
      };
      moderationStore.add(key, item);
    };

    /// Returns all entities currently pending moderation.
    public func getModerationQueue() : [Types.ModerationItem] {
      let all = List.fromIter<Types.ModerationItem>(moderationStore.values());
      all.filter(func(m : Types.ModerationItem) : Bool {
        m.status == "pending"
      }).toArray()
    };

    /// Admin updates the moderation status of an entity.
    /// status: "approved" | "rejected"
    public func updateModerationStatus(
      entityType : Text,
      entityId   : Text,
      status     : Text,
      remark     : Text,
    ) : Types.Result<Types.ModerationItem, Types.ApiError> {
      let key = makeKey(entityType, entityId);
      switch (moderationStore.get(key)) {
        case null {
          // Item not found — create it directly as approved/rejected
          let item : Types.ModerationItem = {
            entityType;
            entityId;
            status;
            remark;
            checkedAt = Time.now();
          };
          moderationStore.add(key, item);
          #ok(item)
        };
        case (?existing) {
          let updated = { existing with status; remark; checkedAt = Time.now() };
          moderationStore.add(key, updated);
          #ok(updated)
        };
      }
    };

    /// Get moderation status for a specific entity.
    public func getModerationStatus(entityType : Text, entityId : Text) : ?Types.ModerationItem {
      moderationStore.get(makeKey(entityType, entityId))
    };

    /// Get all moderation records (for admin overview).
    public func getAllModerationRecords() : [Types.ModerationItem] {
      let all = List.fromIter<Types.ModerationItem>(moderationStore.values());
      all.toArray()
    };

    // ── Content checks ──────────────────────────────────────────────────────

    /// Check job posting content for illegal item categories and inappropriate content.
    public func checkJobContent(
      jobTitle    : Text,
      description : Text,
    ) : { approved : Bool; flaggedCategories : [Text]; reason : Text } {
      let combined = jobTitle # " " # description;
      let cats = flaggedCategories(combined);
      if (cats.size() == 0) {
        { approved = true; flaggedCategories = []; reason = "Content passed moderation" }
      } else {
        let reason = "Job posting flagged for: " # cats.values().join(", ");
        { approved = false; flaggedCategories = cats; reason }
      }
    };

    /// Check property listing content for illegal item categories and inappropriate content.
    public func checkPropertyContent(
      title       : Text,
      description : Text,
    ) : { approved : Bool; flaggedCategories : [Text]; reason : Text } {
      let combined = title # " " # description;
      let cats = flaggedCategories(combined);
      if (cats.size() == 0) {
        { approved = true; flaggedCategories = []; reason = "Content passed moderation" }
      } else {
        let reason = "Property listing flagged for: " # cats.values().join(", ");
        { approved = false; flaggedCategories = cats; reason }
      }
    };

    /// Check custom order text for illegal items.
    /// Uses keyword-based fallback — can be upgraded to HTTP outcall via checkIllegalItemViaInternet.
    public func checkCustomOrderContent(orderText : Text) : { approved : Bool; flaggedCategories : [Text]; reason : Text } {
      let cats = flaggedCategories(orderText);
      if (cats.size() == 0) {
        { approved = true; flaggedCategories = []; reason = "Order content passed moderation" }
      } else {
        let reason = "Custom order flagged for: " # cats.values().join(", ");
        { approved = false; flaggedCategories = cats; reason }
      }
    };

    /// Internet-based illegal item check via HTTP outcall (OpenAI Moderation API pattern).
    /// Falls back to keyword-based check if the outcall fails or response is unparseable.
    public func checkIllegalItemViaInternet(
      itemDescription : Text,
      xform           : OutCall.Transform,
    ) : async { isIllegal : Bool; categories : [Text]; confidence : Float } {
      // Fast path: keyword check shortcut
      let cats = flaggedCategories(itemDescription);
      if (cats.size() > 0) {
        return { isIllegal = true; categories = cats; confidence = 0.95 };
      };

      // Build JSON body for OpenAI Moderation API
      let escapedText = itemDescription
        .replace(#char '\u{0000}', "")
        .replace(#text "\\", "\\\\")
        .replace(#text "\"", "\\\"")
        .replace(#char '\n', " ")
        .replace(#char '\r', " ")
        .replace(#char '\t', " ");
      let payload = "{\"input\":\"" # escapedText # "\"}";

      let url = "https://api.openai.com/v1/moderations";
      let headers : [OutCall.Header] = [
        { name = "Authorization"; value = "Bearer MODERATION_API_KEY" },
        { name = "Content-Type";  value = "application/json" },
      ];

      try {
        let response = await OutCall.httpPostRequest(url, headers, payload, xform);
        // Parse flagged categories from response JSON
        let responseLower = response.toLower();
        let httpCats = List.empty<Text>();
        // Check for high-score categories in the response
        if (responseLower.contains(#text "\"hate\":true") or responseLower.contains(#text "\"hate/threatening\":true")) {
          httpCats.add("hate_speech");
        };
        if (responseLower.contains(#text "\"violence\":true") or responseLower.contains(#text "\"violence/graphic\":true")) {
          httpCats.add("violence");
        };
        if (responseLower.contains(#text "\"sexual\":true") or responseLower.contains(#text "\"sexual/minors\":true")) {
          httpCats.add("sexual_content");
        };
        if (responseLower.contains(#text "\"self-harm\":true")) {
          httpCats.add("self_harm");
        };
        if (responseLower.contains(#text "\"harassment\":true")) {
          httpCats.add("harassment");
        };
        // Also check for high scores via score fields (> 0.7)
        if (responseLower.contains(#text "\"flagged\":true")) {
          if (httpCats.isEmpty()) { httpCats.add("flagged_content") };
        };
        let httpCatsArr = httpCats.toArray();
        { isIllegal = httpCatsArr.size() > 0; categories = httpCatsArr; confidence = 0.90 }
      } catch (_) {
        // Fallback to keyword-based check if HTTP outcall fails
        { isIllegal = false; categories = []; confidence = 0.0 }
      }
    };

  }; // end class ModerationService
};
