import Types "../Types";
import MenuRepositoryTypes "../types/MenuRepositoryTypes";
import CityTypes "../types/CityTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import MenuRepoLib "../lib/menu-repository";
import Runtime "mo:core/Runtime";


mixin (
  menuOptionsStore       : Map.Map<Text, MenuRepositoryTypes.MenuOption>,
  flowsRef               : Map.Map<Text, Types.FlowDefinition>,
  cityControlsRef        : Map.Map<Text, CityTypes.CityControl>,
  adminPrincipals        : Map.Map<Text, Bool>,
  menuWebhookUpdateLog   : List.List<Text>,
) {

  // Internal helper: check caller is in admin whitelist
  func menuIsAdmin(caller : Principal) : Bool {
    adminPrincipals.get(caller.toText()) == ?true
  };

  // ── Menu Repository API ───────────────────────────────────────────────────

  /// Return all active menu options for a given role and city,
  /// filtered by the city's module-toggle settings.
  public query func getMenuOptions(
    role : Text,
    city : Text,
  ) : async [MenuRepositoryTypes.MenuOption] {
    // Find module toggles for this city
    let enabledModules : [(Text, Bool)] = switch (
      cityControlsRef.values().toArray().find(
        func(cc : CityTypes.CityControl) : Bool {
          cc.cityName.toLower() == city.toLower() or cc.cityId == city
        }
      )
    ) {
      case (?cc) cc.moduleToggles;
      case null [];
    };
    let filtered = menuOptionsStore.values().toArray().filter(
      func(opt : MenuRepositoryTypes.MenuOption) : Bool {
        MenuRepoLib.isVisible(opt, role, enabledModules)
      }
    );
    filtered.sort(
      func(a : MenuRepositoryTypes.MenuOption, b : MenuRepositoryTypes.MenuOption)
        : { #less; #equal; #greater } {
        if (a.sortOrder < b.sortOrder) #less
        else if (a.sortOrder > b.sortOrder) #greater
        else #equal
      }
    )
  };

  /// Add a new menu option.
  public shared ({ caller }) func addMenuOption<system>(
    option : MenuRepositoryTypes.MenuOption,
  ) : async Types.Result<MenuRepositoryTypes.MenuOption, Text> {
    if (not menuIsAdmin(caller)) { return #err("Unauthorized: admin Internet Identity required") };
    if (option.id == "") return #err("MenuOption id cannot be empty");
    let now = Time.now();
    let saved : MenuRepositoryTypes.MenuOption = {
      option with
      createdAt = if (option.createdAt == 0) now else option.createdAt;
      updatedAt = now;
    };
    menuOptionsStore.add(option.id, saved);
    #ok(saved)
  };

  /// Update label, sortOrder, and isActive for an existing menu option.
  public shared ({ caller }) func updateMenuOption<system>(
    id          : Text,
    optionLabel : Text,
    sortOrder   : Nat,
    isActive    : Bool,
  ) : async Types.Result<MenuRepositoryTypes.MenuOption, Text> {
    if (not menuIsAdmin(caller)) { return #err("Unauthorized: admin Internet Identity required") };
    switch (menuOptionsStore.get(id)) {
      case null { #err("Menu option not found: " # id) };
      case (?opt) {
        let updated : MenuRepositoryTypes.MenuOption = {
          opt with optionLabel; sortOrder; isActive; updatedAt = Time.now()
        };
        menuOptionsStore.add(id, updated);
        #ok(updated)
      };
    }
  };

  /// Delete a menu option.
  public shared ({ caller }) func deleteMenuOption(
    id : Text,
  ) : async Types.Result<Bool, Text> {
    if (not menuIsAdmin(caller)) { return #err("Unauthorized: admin Internet Identity required") };
    switch (menuOptionsStore.get(id)) {
      case null { #err("Menu option not found: " # id) };
      case (?_) {
        menuOptionsStore.remove(id);
        #ok(true)
      };
    }
  };

  /// Sync menu options from the flow registry.
  /// Groups flows by role and creates menu options per role.
  /// Returns a structured count per role.
  public shared ({ caller }) func syncMenuOptionsFromRegistry<system>() : async { added : Nat; total : Nat; byRole : [(Text, Nat)] } {
    if (not menuIsAdmin(caller)) {
      Runtime.trap("Unauthorized: admin Internet Identity required to sync menu options");
    };
    // If flow registry is empty, run seed first to populate it
    if (flowsRef.size() == 0) {
      return { added = 0; total = menuOptionsStore.size(); byRole = [("customer", 0), ("merchant", 0), ("delivery_partner", 0), ("manufacturer", 0)] };
    };
    var customerAdded     : Nat = 0;
    var merchantAdded     : Nat = 0;
    var dpAdded           : Nat = 0;
    var manufacturerAdded : Nat = 0;
    let now = Time.now();
    for ((_, fd) in flowsRef.entries()) {
      // Determine role bucket from flow tags/type
      let roleTag : Text = if (fd.id.startsWith(#text "manufacturer") or fd.name.startsWith(#text "Manufacturer")) {
        "manufacturer"
      } else if (fd.id.contains(#text "merchant") or fd.name.contains(#text "Merchant")) {
        "merchant"
      } else if (fd.id.contains(#text "delivery") or fd.id.contains(#text "driver") or fd.name.contains(#text "Delivery")) {
        "delivery_partner"
      } else {
        "customer"
      };
      // Skip if a menu option already references this flow for that role
      let exists = menuOptionsStore.values().toArray().find(
        func(opt : MenuRepositoryTypes.MenuOption) : Bool { opt.flowId == fd.id }
      ) != null;
      if (not exists) {
        let optId = "menu_sync_" # fd.id;
        let opt : MenuRepositoryTypes.MenuOption = {
          id            = optId;
          optionLabel   = fd.name;
          flowId        = fd.id;
          roles         = [roleTag];
          cityModuleKey = "";
          sortOrder     = 99;
          isActive      = true;
          createdAt     = now;
          updatedAt     = now;
        };
        menuOptionsStore.add(optId, opt);
        if (roleTag == "manufacturer")       { manufacturerAdded += 1 }
        else if (roleTag == "merchant")      { merchantAdded += 1 }
        else if (roleTag == "delivery_partner") { dpAdded += 1 }
        else                                 { customerAdded += 1 };
      };
    };
    let addedCount = customerAdded + merchantAdded + dpAdded + manufacturerAdded;
    // Signal channels that menus have been updated — log a stable marker
    notifyWebhooksMenuUpdated();
    {
      added   = addedCount;
      total   = menuOptionsStore.size();
      byRole  = [
        ("customer",        customerAdded),
        ("merchant",        merchantAdded),
        ("delivery_partner", dpAdded),
        ("manufacturer",    manufacturerAdded)
      ]
    }
  };

  /// Append a WEBHOOK_MENU_UPDATED marker to the stable log so the
  /// frontend can poll getMenuWebhookUpdateLog() to detect sync events.
  /// Never makes HTTP outcalls — pure local signal.
  func notifyWebhooksMenuUpdated() : () {
    menuWebhookUpdateLog.add("WEBHOOK_MENU_UPDATED:" # debug_show(Time.now()));
  };

  /// Health check: how many flows are in the registry and how many menu options are stored.
  public query func getMenuRepositoryHealth() : async { flowCount : Nat; menuOptionCount : Nat; seededAt : ?Int } {
    { flowCount = flowsRef.size(); menuOptionCount = menuOptionsStore.size(); seededAt = null }
  };

  /// Return aggregate documentation data: flow count, menu option count, and per-role breakdown.
  public query func getProjectDocumentationData() : async {
    flowCount       : Nat;
    menuOptionCount : Nat;
    menuByRole      : [(Text, Nat)];
  } {
    let menuOpts = menuOptionsStore.values().toArray();
    var customerMenu     : Nat = 0;
    var merchantMenu     : Nat = 0;
    var deliveryMenu     : Nat = 0;
    var manufacturerMenu : Nat = 0;
    for (opt in menuOpts.vals()) {
      for (r in opt.roles.vals()) {
        if (r == "customer")         { customerMenu     += 1 }
        else if (r == "merchant")    { merchantMenu     += 1 }
        else if (r == "delivery_partner") { deliveryMenu += 1 }
        else if (r == "manufacturer") { manufacturerMenu += 1 };
      };
    };
    {
      flowCount       = flowsRef.size();
      menuOptionCount = menuOpts.size();
      menuByRole      = [
        ("customer",         customerMenu),
        ("merchant",         merchantMenu),
        ("delivery_partner", deliveryMenu),
        ("manufacturer",     manufacturerMenu)
      ];
    }
  };

  /// Seed default menu options for all roles.
  /// Called on init/postupgrade (idempotent — skips entries that already exist).
  /// Short-circuits if the store already has 10 or more options to avoid
  /// repeated work on every upgrade when menus are already populated.
  func seedDefaultMenuOptions() : () {
    if (menuOptionsStore.size() >= 10) return;
    let now = Time.now();
    type Seed = { id : Text; lbl : Text; flowId : Text; roles : [Text]; key : Text; order : Nat };
    let seeds : [Seed] = [
      // ── Customer / User flows ────────────────────────────────────────────
      { id = "menu_cust_reg";           lbl = "Register / Login";            flowId = "customer-registration";        roles = ["customer","user"]; key = "";                    order = 1  },
      { id = "menu_shop_now";           lbl = "Shop Now";                    flowId = "shop-now";                     roles = ["customer","user"]; key = "shopping";          order = 2  },
      { id = "menu_browse_products";    lbl = "Browse Products";             flowId = "browse-products";              roles = ["customer","user"]; key = "shopping";          order = 3  },
      { id = "menu_track_order";        lbl = "Track My Order";              flowId = "track-order";                  roles = ["customer","user"]; key = "shopping";          order = 4  },
      { id = "menu_post_daily_job";     lbl = "Post Daily Job";              flowId = "post-daily-job";               roles = ["customer","user"]; key = "jobs";             order = 5  },
      { id = "menu_browse_jobs";        lbl = "Browse Jobs";                 flowId = "browse-jobs";                  roles = ["customer","user"]; key = "jobs";             order = 6  },
      { id = "menu_job_city_search";    lbl = "Jobs by City";                flowId = "job-city-search";              roles = ["customer","user"]; key = "jobs";             order = 7  },
      { id = "menu_healthcare";         lbl = "Healthcare Booking";          flowId = "healthcare-booking";           roles = ["customer","user"]; key = "healthcare";       order = 10 },
      { id = "menu_tours";              lbl = "Tours & Travel";              flowId = "tours-travel";                 roles = ["customer","user"]; key = "tours";            order = 11 },
      { id = "menu_professional_svc";   lbl = "Hire a Professional";         flowId = "professional-services";        roles = ["customer","user"]; key = "professional";     order = 12 },
      { id = "menu_donations";          lbl = "Donations";                   flowId = "donations";                    roles = ["customer","user"]; key = "donations";        order = 13 },
      { id = "menu_old_items";          lbl = "Old Items Marketplace";       flowId = "old-items-marketplace";        roles = ["customer","user"]; key = "";                    order = 14 },
      { id = "menu_recipe_browse";      lbl = "Browse Recipes";             flowId = "recipe-browse";                roles = ["customer","user"]; key = "";                    order = 15 },
      { id = "menu_blog_browse";        lbl = "Browse Blogs";               flowId = "blog-browse";                  roles = ["customer","user"]; key = "";                    order = 16 },
      { id = "menu_mfg_products_cust";  lbl = "Shop Manufacturer Products"; flowId = "manufactured-products-browse"; roles = ["customer","user"]; key = "";                    order = 17 },
      { id = "menu_match_scores";       lbl = "Today's Match Scores";        flowId = "check-match-scores";           roles = ["customer","user"]; key = "sports";           order = 20 },
      { id = "menu_election";           lbl = "Election Results";            flowId = "election-results";             roles = ["customer","user"]; key = "elections";        order = 21 },
      { id = "menu_lending";            lbl = "Lending";                     flowId = "lending-apply";                roles = ["customer","user"]; key = "lending";          order = 22 },
      { id = "menu_family";             lbl = "Family Members";              flowId = "family-member";                roles = ["customer","user"]; key = "";                    order = 23 },
      { id = "menu_matrimony";          lbl = "Search Life Partner";         flowId = "matrimony-search";             roles = ["customer","user"]; key = "matrimony";        order = 24 },
      { id = "menu_market_commodity";   lbl = "Market & Commodity";          flowId = "market-commodity-search";      roles = ["customer","user"]; key = "market";           order = 25 },
      { id = "menu_support_ticket";     lbl = "Support Ticket";              flowId = "support-ticket";               roles = ["customer","user"]; key = "";                    order = 26 },
      { id = "menu_bus_booking";        lbl = "Book Bus Ticket";             flowId = "bus-booking";                  roles = ["customer","user"]; key = "bus-booking";      order = 30 },
      { id = "menu_train_booking";      lbl = "Book Train Ticket";           flowId = "train-booking";                roles = ["customer","user"]; key = "train-booking";    order = 31 },
      { id = "menu_flight_booking";     lbl = "Book Flight";                 flowId = "flight-booking";               roles = ["customer","user"]; key = "flight-booking";   order = 32 },
      { id = "menu_recharge";           lbl = "Recharge Mobile";             flowId = "recharge-mobile";              roles = ["customer","user"]; key = "recharge";         order = 33 },
      { id = "menu_bill_payment";       lbl = "Pay Utility Bills";           flowId = "bill-payment";                 roles = ["customer","user"]; key = "bill-payment";     order = 34 },
      { id = "menu_fasttag";            lbl = "FASTag Recharge";             flowId = "fastag-recharge";              roles = ["customer","user"]; key = "fasttag";          order = 35 },
      { id = "menu_lpg";                lbl = "LPG Booking";                 flowId = "lpg-cylinder";                 roles = ["customer","user"]; key = "lpg";              order = 36 },
      { id = "menu_municipality";       lbl = "Municipality Payment";        flowId = "municipality-payment";         roles = ["customer","user"]; key = "municipality";     order = 37 },
      { id = "menu_insurance";          lbl = "Insurance Payment";           flowId = "insurance-payment";            roles = ["customer","user"]; key = "";                    order = 38 },
      { id = "menu_community_svc";      lbl = "Community Services";          flowId = "community-services";           roles = ["customer","user"]; key = "community";        order = 40 },
      // ── Language Learning / Fun Learning flows ────────────────────────────
      { id = "menu_lang_browse";  lbl = "Learn Languages";      flowId = "browse-language-courses"; roles = ["customer"]; key = "language_learning"; order = 50 },
      { id = "menu_lang_daily";   lbl = "AI Daily Lesson";      flowId = "ai-daily-lesson";          roles = ["customer"]; key = "language_learning"; order = 51 },
      { id = "menu_lang_word";    lbl = "Word Search";           flowId = "search-word-meaning";      roles = ["customer"]; key = "language_learning"; order = 52 },
      { id = "menu_lang_create";  lbl = "Create Course";         flowId = "create-language-course";   roles = ["customer"]; key = "language_learning"; order = 53 },
      { id = "menu_fun_learning"; lbl = "Fun Learning Courses";  flowId = "language-learning";        roles = ["customer"]; key = "language_learning"; order = 54 },
      // ── Merchant flows ────────────────────────────────────────────────────
      { id = "menu_merch_reg";          lbl = "Register as Merchant";        flowId = "register-merchant";         roles = ["merchant"]; key = "";             order = 1  },
      { id = "menu_merch_add_product";  lbl = "Add / Update Products";       flowId = "add-product";               roles = ["merchant"]; key = "shopping";     order = 2  },
      { id = "menu_merch_orders";       lbl = "View Orders";                 flowId = "manage-orders";             roles = ["merchant"]; key = "";             order = 3  },
      { id = "menu_merch_inventory";    lbl = "Inventory";                   flowId = "inventory";                 roles = ["merchant"]; key = "";             order = 4  },
      { id = "menu_merch_employees";    lbl = "Employee Management";         flowId = "employee-management";       roles = ["merchant"]; key = "";             order = 5  },
      { id = "menu_merch_analytics";    lbl = "Analytics";                   flowId = "analytics";                 roles = ["merchant"]; key = "";             order = 6  },
      { id = "menu_merch_barcode";      lbl = "Barcode Scan";                flowId = "barcode-scan";              roles = ["merchant"]; key = "";             order = 7  },
      { id = "menu_merch_post_job";     lbl = "Post a Job";                  flowId = "post-job";                  roles = ["merchant"]; key = "jobs";         order = 8  },
      { id = "menu_merch_bulk_msg";     lbl = "Bulk Customer Messaging";     flowId = "bulk-messaging";            roles = ["merchant"]; key = "";             order = 9  },
      { id = "menu_merch_pro_svc";      lbl = "Manage Professional Services"; flowId = "professional-services-manage"; roles = ["merchant"]; key = "professional"; order = 10 },
      // ── Delivery partner flows ────────────────────────────────────────────
      { id = "menu_dp_reg";             lbl = "Register as Delivery Partner"; flowId = "register-delivery";  roles = ["deliveryPartner"]; key = ""; order = 1 },
      { id = "menu_dp_accept";          lbl = "Accept Delivery";             flowId = "accept-delivery";    roles = ["deliveryPartner"]; key = ""; order = 2 },
      { id = "menu_dp_track";           lbl = "Track Route";                 flowId = "track-route";        roles = ["deliveryPartner"]; key = ""; order = 3 },
      { id = "menu_dp_earnings";        lbl = "Earnings";                    flowId = "dp-earnings";        roles = ["deliveryPartner"]; key = ""; order = 4 },
      { id = "menu_dp_shift_in";        lbl = "Shift Check-in";              flowId = "shift-checkin";      roles = ["deliveryPartner"]; key = ""; order = 5 },
      { id = "menu_dp_shift_out";       lbl = "Shift Check-out";             flowId = "shift-checkout";     roles = ["deliveryPartner"]; key = ""; order = 6 },
      // ── Manufacturer flows ────────────────────────────────────────────────
      { id = "menu_mfg_reg";          lbl = "Register as Manufacturer";  flowId = "manufacturer-register";         roles = ["manufacturer"]; key = ""; order = 1  },
      { id = "menu_mfg_add_product";  lbl = "Add Manufacturer Product";  flowId = "add-product-manufacturer";      roles = ["manufacturer"]; key = ""; order = 2  },
      { id = "menu_mfg_distributors"; lbl = "Distributor Network";       flowId = "distributor-network";           roles = ["manufacturer"]; key = ""; order = 3  },
      { id = "menu_mfg_expiry";       lbl = "Expiry Returns";            flowId = "expiry-returns";                roles = ["manufacturer"]; key = ""; order = 4  },
      { id = "menu_mfg_complaint";    lbl = "Complaints";                flowId = "complaints";                    roles = ["manufacturer"]; key = ""; order = 5  },
      { id = "menu_mfg_accounts";     lbl = "Accounts & Bills";          flowId = "accounts-bills";                roles = ["manufacturer"]; key = ""; order = 6  },
      { id = "menu_mfg_inventory";    lbl = "Inventory Register";        flowId = "inventory-register";            roles = ["manufacturer"]; key = ""; order = 7  },
      { id = "menu_mfg_emp";          lbl = "Manage Employees";          flowId = "employee-manage-manufacturer";  roles = ["manufacturer"]; key = ""; order = 8  },
      { id = "menu_mfg_products";     lbl = "Product Listing";           flowId = "manufacturer-product-listing"; roles = ["manufacturer"]; key = ""; order = 9  },
      { id = "menu_mfg_sales";        lbl = "Sales Records";             flowId = "manufacturer-sales";           roles = ["manufacturer"]; key = ""; order = 10 },
      { id = "menu_mfg_purchases";    lbl = "Purchase Records";          flowId = "manufacturer-purchases";       roles = ["manufacturer"]; key = ""; order = 11 },
    ];
    for (s in seeds.vals()) {
      switch (menuOptionsStore.get(s.id)) {
        case (?_) {}; // idempotent — skip if already seeded
        case null {
          menuOptionsStore.add(s.id, {
            id            = s.id;
            optionLabel   = s.lbl;
            flowId        = s.flowId;
            roles         = s.roles;
            cityModuleKey = s.key;
            sortOrder     = s.order;
            isActive      = true;
            createdAt     = now;
            updatedAt     = now;
          });
        };
      };
    };
  };

  /// Admin-callable entry point to trigger menu seeding on demand.
  public shared func triggerMenuSeed<system>() : async Nat {
    seedDefaultMenuOptions();
    menuOptionsStore.size()
  };

  /// Public entry point called from main.mo init/upgrade hooks to seed menus.
  /// Idempotent — safe to call on every startup.
  func runSeedDefaultMenuOptions() : () {
    seedDefaultMenuOptions()
  };

  /// Return the count of flows in the live registry.
  /// Used by the frontend health badge to confirm registry is populated.
  public query func getFlowRegistryHealth() : async { flowCount : Nat; menuOptionCount : Nat } {
    { flowCount = flowsRef.size(); menuOptionCount = menuOptionsStore.size() }
  };


  public query func getAllMenuOptions() : async [MenuRepositoryTypes.MenuOption] {
    menuOptionsStore.values().toArray()
  };

  /// Return all active menu options for a given role (no city filter).
  public shared query func getMenuOptionsByRole(role : Text) : async [MenuRepositoryTypes.MenuOption] {
    let filtered = menuOptionsStore.values().toArray().filter(
      func(opt : MenuRepositoryTypes.MenuOption) : Bool {
        if (not opt.isActive) return false;
        opt.roles.find(func(r : Text) : Bool { r == role }) != null
      }
    );
    filtered.sort(
      func(a : MenuRepositoryTypes.MenuOption, b : MenuRepositoryTypes.MenuOption)
        : { #less; #equal; #greater } {
        if (a.sortOrder < b.sortOrder) #less
        else if (a.sortOrder > b.sortOrder) #greater
        else #equal
      }
    )
  };

};
