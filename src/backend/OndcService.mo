import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public class OndcService(enrollments : Map.Map<Text, Types.OndcEnrollment>) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "ondc_" # Utils.generateId("o") # "_" # debug_show(nextId)
    };

    public func submitEnrollment(
      userId : Text,
      role : Types.UserRole,
      businessName : Text,
      gstin : ?Text,
      fssaiLicense : ?Text,
      bankAccount : Text,
      ifscCode : Text,
    ) : Types.Result<Types.OndcEnrollment, Types.ApiError> {
      // One enrollment per user
      switch (enrollments.get(userId)) {
        case (?existing) {
          if (existing.enrollmentStatus == #pending) {
            return #err(#alreadyExists);
          };
        };
        case null {};
      };
      let enrollment : Types.OndcEnrollment = {
        id = genId();
        userId;
        role;
        businessName;
        gstin;
        fssaiLicense;
        bankAccount;
        ifscCode;
        enrollmentStatus = #pending;
        submittedAt = Time.now();
        reviewedAt = null;
        notes = null;
      };
      enrollments.add(userId, enrollment);
      #ok(enrollment)
    };

    public func getEnrollmentByUserId(userId : Text) : Types.Result<Types.OndcEnrollment, Types.ApiError> {
      switch (enrollments.get(userId)) {
        case (?e) #ok(e);
        case null #err(#notFound);
      }
    };

    public func getEnrollmentById(enrollmentId : Text) : Types.Result<Types.OndcEnrollment, Types.ApiError> {
      var found : ?Types.OndcEnrollment = null;
      for ((_, e) in enrollments.entries()) {
        if (e.id == enrollmentId) {
          found := ?e;
        };
      };
      switch (found) {
        case (?e) #ok(e);
        case null #err(#notFound);
      }
    };

    public func updateEnrollmentStatus(
      id : Text,
      status : Types.VerificationStatus,
      notes : ?Text,
    ) : Types.Result<Types.OndcEnrollment, Types.ApiError> {
      // Find by enrollment id (not userId key)
      var found : ?Types.OndcEnrollment = null;
      var foundKey : ?Text = null;
      for ((key, e) in enrollments.entries()) {
        if (e.id == id) {
          found := ?e;
          foundKey := ?key;
        };
      };
      switch (found, foundKey) {
        case (?enrollment, ?key) {
          let updated = {
            enrollment with
            enrollmentStatus = status;
            reviewedAt = ?Time.now();
            notes;
          };
          enrollments.add(key, updated);
          #ok(updated)
        };
        case _ #err(#notFound);
      }
    };

    public func getAllEnrollments(status : ?Types.VerificationStatus) : [Types.OndcEnrollment] {
      let results = List.empty<Types.OndcEnrollment>();
      for ((_, e) in enrollments.entries()) {
        let match = switch (status) {
          case null true;
          case (?s) e.enrollmentStatus == s;
        };
        if (match) results.add(e);
      };
      results.toArray()
    };

    public func getPendingEnrollments() : [Types.OndcEnrollment] {
      let results = List.empty<Types.OndcEnrollment>();
      for ((_, e) in enrollments.entries()) {
        if (e.enrollmentStatus == #pending) results.add(e);
      };
      results.toArray()
    };

    public func getMerchantSetupGuide() : [Types.OndcSetupGuide] {
      [
        {
          step = 1;
          title = "Register on ONDC Seller Portal";
          description = "Create your seller account on the official ONDC seller portal. You will need a valid business email address and phone number to complete registration.";
          actionRequired = "Visit seller.ondc.org and click 'Register as Seller'. Fill in your business details and verify your email.";
          helpUrl = "https://seller.ondc.org/register";
          isRequired = true;
        },
        {
          step = 2;
          title = "Apply for Network Participant ID (NP ID)";
          description = "After registration, apply for your unique Network Participant ID. This ID identifies your business on the ONDC network and is required for all transactions.";
          actionRequired = "Log in to seller.ondc.org, navigate to 'My Profile > Network Participant', and submit the NP ID application form.";
          helpUrl = "https://docs.ondc.org/np-id";
          isRequired = true;
        },
        {
          step = 3;
          title = "Setup BAP/BPP (Buyer/Seller Application Protocol)";
          description = "Configure your Buyer App Protocol (BAP) or Buyer-side Provider Platform (BPP) integration. This enables your store to communicate with the ONDC network using the Beckn protocol.";
          actionRequired = "Download the ONDC Seller App SDK from docs.ondc.org. Configure your BPP endpoint URLs in the seller portal under 'API Configuration'.";
          helpUrl = "https://docs.ondc.org/bpp-setup";
          isRequired = true;
        },
        {
          step = 4;
          title = "KYC Verification";
          description = "Complete the Know Your Customer (KYC) process by submitting your business documents. This is mandatory for ONDC compliance and payment settlements.";
          actionRequired = "Submit PAN card, GSTIN certificate, Aadhaar card, cancelled bank cheque, and business address proof via the seller portal's 'KYC Documents' section.";
          helpUrl = "https://seller.ondc.org/kyc";
          isRequired = true;
        },
        {
          step = 5;
          title = "Product Catalog Integration";
          description = "Upload your complete product catalog to the ONDC network. Products must follow the ONDC catalog schema with proper categories, attributes, and pricing.";
          actionRequired = "Use the ONDC catalog upload API or the seller portal's bulk upload feature. Download the catalog template, fill in your products, and upload via the 'Catalog Management' section.";
          helpUrl = "https://docs.ondc.org/catalog";
          isRequired = true;
        },
        {
          step = 6;
          title = "Order Management Integration";
          description = "Configure your webhook endpoint to receive real-time order notifications from the ONDC network. This allows you to accept, process, and track orders from ONDC buyers.";
          actionRequired = "Set up a webhook URL in your seller portal under 'Integrations > Webhooks'. Configure order acceptance, fulfillment, and tracking callbacks.";
          helpUrl = "https://docs.ondc.org/order-webhook";
          isRequired = true;
        },
        {
          step = 7;
          title = "Test on ONDC Staging Environment";
          description = "Before going live, thoroughly test all order flows on the ONDC staging environment. Verify product search, order placement, acceptance, fulfillment, and payment flows.";
          actionRequired = "Switch to staging mode in your seller portal. Use the ONDC Postman collection to test all buyer-seller interactions. Resolve any errors before proceeding to production.";
          helpUrl = "https://docs.ondc.org/staging-testing";
          isRequired = true;
        },
        {
          step = 8;
          title = "Go Live — Submit for Production Approval";
          description = "Once all tests pass, submit your application for production approval. ONDC will review your integration and activate your seller account on the live network.";
          actionRequired = "Navigate to 'Settings > Go Live' in the seller portal. Submit the production readiness checklist. Await approval (typically 3-5 business days).";
          helpUrl = "https://seller.ondc.org/go-live";
          isRequired = true;
        },
      ]
    };

    public func getDeliveryPartnerSetupGuide() : [Types.OndcSetupGuide] {
      [
        {
          step = 1;
          title = "Register as Logistics Service Provider (LSP)";
          description = "Create your Logistics Service Provider account on the ONDC logistics portal. You will need your business registration details and GST number.";
          actionRequired = "Visit logistics.ondc.org and click 'Register as LSP'. Fill in your company details, service areas, and vehicle information. Verify your email and phone.";
          helpUrl = "https://logistics.ondc.org/register";
          isRequired = true;
        },
        {
          step = 2;
          title = "Obtain LSP ID";
          description = "After registration, apply for your Logistics Service Provider ID. This unique identifier is required to receive delivery assignments from ONDC network buyers and sellers.";
          actionRequired = "Log in to logistics.ondc.org, go to 'My Profile > LSP Registration', and submit your LSP ID request along with your fleet details.";
          helpUrl = "https://docs.ondc.org/lsp-id";
          isRequired = true;
        },
        {
          step = 3;
          title = "Setup Logistics API Endpoints";
          description = "Configure your pickup and delivery API endpoints. ONDC uses the Beckn protocol for logistics, requiring you to expose standardized endpoints for search, select, confirm, and status APIs.";
          actionRequired = "Download the ONDC Logistics SDK from docs.ondc.org. Deploy and configure your logistics API with pickup, delivery, and tracking endpoints. Register the API URL in the logistics portal.";
          helpUrl = "https://docs.ondc.org/logistics-api";
          isRequired = true;
        },
        {
          step = 4;
          title = "KYC Verification";
          description = "Submit all required KYC documents for verification. This ensures compliance with ONDC policies and enables payment settlements.";
          actionRequired = "Upload PAN card, Aadhaar card, GST certificate, bank account details, vehicle registration certificate, and driver's license via the portal's 'KYC Documents' section.";
          helpUrl = "https://logistics.ondc.org/kyc";
          isRequired = true;
        },
        {
          step = 5;
          title = "Configure Rate Card";
          description = "Set up your delivery rate card specifying per-km charges, base rates, weight slabs, and any surge pricing rules. Competitive rates improve your chances of receiving delivery assignments.";
          actionRequired = "Navigate to 'Rate Card' in the logistics portal. Define base delivery charges, per-km rates for each vehicle type, weight-based slabs, and time-of-day surge multipliers.";
          helpUrl = "https://logistics.ondc.org/rate-card";
          isRequired = true;
        },
        {
          step = 6;
          title = "Test Integration on Staging";
          description = "Test all delivery flows end-to-end in the ONDC staging environment. Verify pickup confirmation, route tracking, delivery completion, and payment collection flows.";
          actionRequired = "Switch to staging mode in your LSP portal. Simulate delivery assignments using ONDC test orders. Test pickup confirmation, real-time GPS tracking, and delivery proof capture.";
          helpUrl = "https://docs.ondc.org/logistics-staging";
          isRequired = true;
        },
        {
          step = 7;
          title = "Go Live";
          description = "Submit your logistics integration for production approval. Once approved, you will start receiving real delivery assignments from ONDC network participants.";
          actionRequired = "Go to 'Settings > Go Live' in the logistics portal. Complete the production readiness checklist, including live vehicle tracking verification. Submit for ONDC review (typically 2-4 business days).";
          helpUrl = "https://logistics.ondc.org/go-live";
          isRequired = true;
        },
      ]
    };

    public func getOndcFAQ() : [Types.OndcFAQ] {
      [
        {
          question = "What is ONDC?";
          answer = "ONDC (Open Network for Digital Commerce) is a government-backed open protocol initiative by the Indian Government that democratizes e-commerce. It allows any buyer app to discover and order from any seller app, breaking the monopoly of closed e-commerce platforms.";
        },
        {
          question = "Is ONDC enrollment mandatory for merchants on WhatsCart?";
          answer = "No, ONDC enrollment is optional. You can sell on WhatsCart without ONDC registration. However, enrolling on ONDC allows your products to be discovered by buyers on all ONDC-compatible platforms, significantly expanding your reach.";
        },
        {
          question = "How long does ONDC approval take?";
          answer = "Merchant approval typically takes 3–5 business days after submitting all required documents. Logistics Service Provider (delivery partner) approval usually takes 2–4 business days. Ensure all documents are clear and complete to avoid delays.";
        },
        {
          question = "What documents are needed for ONDC merchant registration?";
          answer = "You need: PAN card, GSTIN certificate (if applicable), Aadhaar card, cancelled bank cheque, business address proof, and an outlet photograph. Food businesses may also need their FSSAI license.";
        },
        {
          question = "What is a Network Participant ID (NP ID)?";
          answer = "An NP ID is a unique identifier assigned to every participant on the ONDC network. It is used to authenticate all transactions and communications between buyers, sellers, and logistics providers on the network.";
        },
        {
          question = "Can I sell in multiple categories on ONDC?";
          answer = "Yes, you can list products in multiple categories. However, each category may have specific compliance requirements (e.g., FSSAI license for food, drug license for medical products). Ensure you meet all category-specific requirements.";
        },
        {
          question = "How does payment work on ONDC?";
          answer = "ONDC supports multiple payment methods including Prepaid (online payment at order time), Cash on Delivery (COD), and Post-fulfilment payment. Settlements are done through your registered bank account, typically within T+1 or T+2 working days.";
        },
        {
          question = "What is the difference between BAP and BPP?";
          answer = "BAP (Buyer App Protocol) is the buyer-side interface where customers search and order products. BPP (Buyer-side Provider Platform) is the seller-side interface that lists products and processes orders. As a seller, you need to implement the BPP interface.";
        },
        {
          question = "Is there a fee to join ONDC?";
          answer = "ONDC registration itself is free. However, individual buyer apps and seller apps on the ONDC network may charge a transaction fee or commission. Fees are transparent and agreed upon before onboarding to any specific app on the network.";
        },
        {
          question = "How do I get help with ONDC integration?";
          answer = "You can contact ONDC support at support@ondc.org, visit the ONDC documentation at docs.ondc.org, or reach out to the WhatsCart admin team who can assist with the integration process.";
        },
      ]
    };

    /// Simulate ONDC catalog search using locally enrolled merchants and their products.
    /// merchants and products maps are passed in from main.mo at call time.
    public func searchOndcProducts(
      keyword       : Text,
      _location     : Text,
      merchantsById : Map.Map<Text, Types.Merchant>,
      productsById  : Map.Map<Text, Types.Product>,
    ) : [{ product : Types.Product; merchant : Types.Merchant }] {
      // Gather ONDC-enrolled merchant IDs
      let enrolledMerchantUserIds = List.empty<Text>();
      for ((userId, _) in enrollments.entries()) {
        enrolledMerchantUserIds.add(userId);
      };

      // Find enrolled merchants
      let enrolledMerchants = List.empty<Types.Merchant>();
      for ((_, m) in merchantsById.entries()) {
        if (m.isOndcEnrolled and m.isActive and m.isVerified) {
          enrolledMerchants.add(m);
        };
      };

      let lower = keyword.toLower();
      let results = List.empty<{ product : Types.Product; merchant : Types.Merchant }>();

      for (m in enrolledMerchants.values()) {
        for ((_, p) in productsById.entries()) {
          if (p.merchantId == m.id and p.isActive and (
            p.title.toLower().contains(#text lower) or
            p.description.toLower().contains(#text lower)
          )) {
            results.add({ product = p; merchant = m });
          };
        };
      };

      results.toArray()
    };

    /// Flat result version for main.mo public API (lat/lng parameters accepted for future live ONDC API use).
    public func searchOndcProductsFlat(
      keyword   : Text,
      latitude  : Float,
      longitude : Float,
      merchantsById : Map.Map<Text, Types.Merchant>,
      productsById  : Map.Map<Text, Types.Product>,
    ) : [{ id : Text; title : Text; price : Float; merchantId : Text; merchantName : Text; category : Text; isOndc : Bool }] {
      let locationText = debug_show(latitude) # "," # debug_show(longitude);
      let raw = searchOndcProducts(keyword, locationText, merchantsById, productsById);
      let out = List.empty<{ id : Text; title : Text; price : Float; merchantId : Text; merchantName : Text; category : Text; isOndc : Bool }>();
      for (r in raw.values()) {
        out.add({
          id           = r.product.id;
          title        = r.product.title;
          price        = r.product.baseRate;
          merchantId   = r.merchant.id;
          merchantName = r.merchant.businessName;
          category     = r.merchant.category;
          isOndc       = true;
        });
      };
      out.toArray()
    };

  };
};
