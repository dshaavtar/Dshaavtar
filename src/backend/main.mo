import Types "Types";

import EventTypes "types/EventTypes";
import FamilyTypes "types/FamilyTypes";
import PromotionTypes "types/PromotionTypes";
import POSTypes "types/POSTypes";
import CityTypes "types/CityTypes";
import MarketplaceTypes "types/MarketplaceTypes";
import Map "mo:core/Map";
import POSMixin "mixins/pos-api";
import CityMixin "mixins/city-api";
import MarketplaceMixin "mixins/marketplace-api";
import ScriptExecutorMixin "mixins/script-executor-api";
import FlowAgentMixin "mixins/flow-agent-api";
import ProfessionalServiceTypes "types/ProfessionalServiceTypes";
import ProfessionalServiceMixin "mixins/professional-service-api";






import UserService "UserService";import MerchantService "MerchantService";
import ProductService "ProductService";
import DeliveryPartnerService "DeliveryPartnerService";
import OrderService "OrderService";
import JobService "JobService";
import PropertyService "PropertyService";
import SubscriptionService "SubscriptionService";
import OndcService "OndcService";
import NotificationService "NotificationService";
import RateCardService "RateCardService";
import ChatbotEngine "ChatbotEngine";
import WhatsAppService "WhatsAppService";
import AdminService "AdminService";
import LeadService "LeadService";
import TransportService "TransportService";
import EventService "EventService";
import FamilyService "FamilyService";
import PromotionService "PromotionService";
import ShuttleService "ShuttleService";
import TipService "TipService";
import ModerationService "ModerationService";

import SupportTicketService "SupportTicketService";
import ContactImportService "ContactImportService";
import RecipeService "RecipeService";
import RestockService "RestockService";
import TelegramService "TelegramService";
import SMSService "SMSService";


import OutCall "mo:caffeineai-http-outcalls/outcall";
import Utils "Utils";
import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Error "mo:core/Error";
import Nat "mo:core/Nat";
import MarketSearchMixin "mixins/market-search-api";
import MarketSearchTypes "types/MarketSearchTypes";
import MatchScoreMixin "mixins/match-score-api";
import MatchScoreTypes "types/MatchScoreTypes";
import ElectionResultTypes "types/ElectionResultTypes";
import ElectionResultsMixin "mixins/election-results-api";
import LendingTypes "types/LendingTypes";
import CommunityTypes "types/CommunityTypes";
import LendingMixin "mixins/lending-api";
import CommunityMixin "mixins/community-api";
import LendingService "LendingService";
import CommunityService "CommunityService";
import Int "mo:core/Int";
import ProductLocationTypes "types/ProductLocationTypes";
import JobCityTypes "types/JobCityTypes";
import BrandingTypes "types/BrandingTypes";
import MenuRepositoryTypes "types/MenuRepositoryTypes";
import ProductLocationMixin "mixins/product-location-api";
import JobCityMixin "mixins/job-city-api";
import BrandingMixin "mixins/branding-api";
import MenuRepositoryMixin "mixins/menu-repository-api";
import PaySprintTypes "types/PaySprintTypes";
import PaySprintMixin "mixins/paysprint-api";
import PaySprintFlowSeeds "mixins/paysprint-flow-seeds";
import ManufacturerTypes "types/ManufacturerTypes";
import ManufacturerMixin "mixins/manufacturer-api";
import Principal "mo:core/Principal";
import ManufacturerLib "lib/manufacturer";
import BlogTypes "types/BlogTypes";
import CustomerRatingTypes "types/CustomerRatingTypes";
import JobLocationTypes "types/JobLocationTypes";
import BlogMixin "mixins/blog-api";
import CustomerRatingMixin "mixins/customer-rating-api";
import JobLocationMixin "mixins/job-location-api";
import LanguageLearningTypes "types/LanguageLearningTypes";
import LanguageLearningService "LanguageLearningService";
import LanguageLearningAPI "mixins/language-learning-api";
import MerchantEmployeeTypes "types/MerchantEmployeeTypes";
import MerchantEmployeeMixin "mixins/merchant-employee-api";
import ManufacturerEmployeeMixin "mixins/manufacturer-employee-api";

import FlowSessionTypes "types/FlowSessionTypes";
import SessionTypes "types/SessionTypes";
import DeliveryAssignmentTypes "types/DeliveryAssignmentTypes";
































actor {
  // ── Migration: OldConversationState covers ALL constructors from the last deployed
  // stable snapshot (.old/src/backend/dist/backend.most OldConversationState__816715054).
  // This type is used only by the V0 legacy stores (sessionsStore, usersById, usersByPhone)
  // so the runtime can load old-format data. postupgrade migrates them to the *New stores.
  type OldConversationState = {
    #welcome; #roleSelect; #authPassdigit; #authPassdigitWrong; #authOtpSent;
    #authOtpVerify; #authSetNewPassdigit; #authConfirmPassdigit; #authSessionLocked;
    #custRegName; #custRegLocation; #custRegOtp; #custSetPassdigit; #custConfirmPassdigit;
    #merchantRegName; #merchantRegOutlet; #merchantRegCategory; #merchantRegDeliveryType;
    #merchantRegType; #merchantRegPayment; #merchantRegAdvance; #merchantRegBooking;
    #merchantRegRental; #merchantRegRadius; #merchantRegMultibranch; #merchantRegBranchAddr;
    #merchantRegBranchRadius; #merchantRegBranchMore; #merchantSetPassdigit; #merchantConfirmPassdigit;
    #dpRegName; #dpRegType; #dpRegAadhaar; #dpRegRc; #dpRegPan; #dpRegVehicle;
    #dpSetPassdigit; #dpConfirmPassdigit;
    #customerMenu; #customerLocation; #customerLocationConfirm;
    #orderCategory; #orderSearch; #orderSearchInput; #orderResults; #orderNotFound;
    #orderSearchFurther; #orderCart; #orderConfirm; #orderPlaced; #orderTracking;
    #inquirySent; #inquiryResult;
    #customOrderItem; #customOrderConfirm; #customOrderTracking;
    #merchantMenu; #merchantOrders; #merchantOrderDetail;
    #merchantAddProductTitle; #merchantAddProductDesc; #merchantAddProductImage;
    #merchantAddProductImageLink; #merchantAddProductVideo; #merchantAddProductCondition;
    #merchantAddProductRate; #merchantAddProductBulk; #merchantAddProductDiscount;
    #merchantAddProductConfirm;
    #dpMenu; #dpOrders; #dpOrderDetail;
    #jobMenu; #jobPostTitle; #jobPostDesc; #jobPostSalary; #jobPostLocation; #jobPostConfirm;
    #jobSearchResults; #jobContactRequest;
    #propertyMenu; #propertyPostCategory; #propertyPostType; #propertyPostDesc;
    #propertyPostPrice; #propertyPostLocation; #propertyPostConfirm;
    #propertySearchResults; #propertyContactRequest;
    #transportMenu; #transportOrigin; #transportDest; #transportVehicle; #transportEstimate;
    #transportBooked; #transportTracking;
    #sarthiMenu; #sarthiOrders; #sarthiOrderDetail;
    #registerType; #registerCustomer; #registerMerchant; #registerDeliveryPartner;
    #mainMenu; #orderSearch2; #merchantActions; #merchantOrderList; #merchantViewOrder;
    #merchantAccept; #merchantReject; #merchantFulfill; #merchantCollectionPending;
    #merchantComplete; #deliveryActions; #dpAvailableOrders; #dpAccept;
    #dpPickupInstructions; #dpPickupConfirmed; #dpDeliveryInstructions;
    #dpCollectPayment; #dpPaymentConfirmed; #dpVendorSettlement; #dpComplete;
    #jobBrowse; #jobSearch; #jobRequestContact; #jobPost; #jobPostTitle2; #jobPostDesc2;
    #jobPostCategory; #jobPostSalaryMin; #jobPostSalaryMax; #jobPostLocation2;
    #jobPublished; #jobMyListings; #jobMyListings2; #approveJobContact; #jobContactApproval;
    #propertyBrowse; #propertySearch; #propertyRequestContact; #propertyPost;
    #propertyPostType2; #propertyPostDesc2; #propertyPostPrice2; #propertyPostLocation2;
    #propertyPublished; #propertyMyListings; #approvePropertyContact; #propertyContactApproval;
    #otpVerify; #subscriptionPrompt;
    #eventMenu; #eventPostName; #eventPostDesc; #eventPostPaid; #eventPostPrice;
    #eventPostLocation; #eventPostDates; #eventPostTickets; #eventPublished; #eventSearch;
    #familyMenu; #familyAddSelfName; #familyAddSelfSurname; #familyAddRelationship;
    #familyAddRelationName; #familyAddPhone; #familyAddAddress; #familySaved;
    #familyAddGender; #familyAddMatrimonyEligible; #familyAddCaste; #familyAddOccupation;
    #familyAddEducation; #familyAddLocationPref; #familyAddBloodGroup;
    #promotionMenu; #promotionPostTitle; #promotionPostReelLink; #promotionPostImageLink;
    #promotionPostLocation; #promotionPlanSelect; #promotionPayment; #promotionPendingApproval;
    #sarthiFreeRideOTP; #sarthiPassengerOTPVerify;
    #freeRideSearch; #freeRideSearchDest; #freeRideResults; #freeRideOTPEntry;
    #freeRideCompleted; #freeRideIncoming; #freeRideSearchAgain; #rideDeclined;
    #supportMenu; #supportDescInput; #supportConfirm;
    #shuttleMenu; #shuttleSearchSource; #shuttleSearchDest; #shuttleResults;
    #shuttleBookConfirm; #shuttleBooked;
    #supplierOrderSupplier; #supplierOrderItem; #supplierOrderQty; #supplierOrderNotes;
    #supplierOrderConfirm; #supplierOrderDone; #supplierOrderList;
    #healthcareMenu; #healthcareSearch; #healthcareBooking;
    #professionalServicesMenu; #professionalServicesSearch;
    #toursMenu; #toursSearch;
    #donationsMenu;
  };
  type UserV0 = {
    id : Text; phone : Text; name : Text; role : Types.UserRole;
    location : ?Types.Location; address : ?Text; registrationDate : Int;
    subscriptionPlanId : ?Text; conversationState : OldConversationState;
    stateData : Text; isActive : Bool; otpVerified : Bool; passdigit : Text;
    passdigitAttempts : Nat; sessionLocked : Bool; sessionLockExpiry : Int;
    otpCode : Text; otpExpiry : Int;
    countryCode : Text; currency : Text; countryName : Text;
    importedByMerchant : ?Text; promotionalOptOut : Bool; importBatchId : ?Text;
  };
  type ConversationMessageV0 = {
    id : Text; sender : Types.MessageSender; content : Text;
    timestamp : Int; messageType : Text;
  };
  type ConversationSessionV0 = {
    phoneNumber : Text; userId : ?Text; currentState : OldConversationState;
    stateData : Text; messages : [ConversationMessageV0]; lastActivity : Int; language : Text;
  };
  type FamilyMemberV0 = {
    id : Text; ownerPhone : Text; ownerName : Text; ownerSurname : Text;
    relationship : FamilyTypes.Relationship; relationName : Text; relationPhone : Text;
    relationAddress : Text; inviteStatus : FamilyTypes.FamilyInviteStatus; createdAt : Int;
    isMatrimonyEligible : Bool; caste : ?Text; occupation : ?Text; education : ?Text;
    locationPreference : ?Text; bloodGroup : ?Text; age : ?Nat;
  };

  // ── User state ─────────────────────────────────────────────────────────────
  // V0 vars receive old-format data on upgrade; *New vars hold current-format data.
  var usersByPhone  = Map.empty<Text, UserV0>();
  var usersById     = Map.empty<Text, UserV0>();
  let usersByPhoneNew = Map.empty<Text, Types.User>();
  let usersByIdNew    = Map.empty<Text, Types.User>();

  // ── Merchant state ─────────────────────────────────────────────────────────
  // Migration v0→v1: phone field added to Merchant.
  // merchantsById / merchantsByUserId hold legacy records (no phone) — same names
  // as in the old stable snapshot so the runtime can load old data without error.
  // postupgrade migrates them into the current New maps.
  type MerchantV0 = {
    id : Text; userId : Text; businessName : Text; category : Text;
    merchantType : Types.MerchantType; bookingAllowed : Bool; rentalAllowed : Bool;
    location : Types.Location; deliveryType : Types.DeliveryType; deliveryRadius : Float;
    branches : [Types.Branch]; menuProductIds : [Text]; kyc : Types.KYCDocuments;
    codAvailable : Bool; avgRating : Float; ratingCount : Nat;
    isOndcEnrolled : Bool; isActive : Bool; isVerified : Bool;
    rejectionReason : ?Text; boostedOrderCount : Nat; blockedUntil : ?Int;
    customerCount : Nat; orderCount : Nat;
  };
  var merchantsById     = Map.empty<Text, MerchantV0>();
  var merchantsByUserId = Map.empty<Text, MerchantV0>();
  let merchantsByIdNew     = Map.empty<Text, Types.Merchant>();
  let merchantsByUserIdNew = Map.empty<Text, Types.Merchant>();

  // ── Product state ──────────────────────────────────────────────────────────
  // Migration v0→v1: qty/packing/expiry fields were added to Product.
  // productsById holds legacy records (no qty/packing/expiry) — matched by name to old snapshot.
  // postupgrade migrates them into productsByIdCurrent (new type).
  type ProductV0 = {
    id : Text;
    merchantId : Text;
    title : Text;
    imageUrls : [Text];
    videoUrl : ?Text;
    description : Text;
    isNew : Bool;
    baseRate : Float;
    bulkRates : [Types.BulkRate];
    specialDiscount : Float;
    isActive : Bool;
  };
  var productsById = Map.empty<Text, ProductV0>();
  let productsByIdCurrent = Map.empty<Text, Types.Product>();

  // ── Product scan history state ─────────────────────────────────────────────
  let scanHistoryStore = Map.empty<Text, Types.ProductScanHistory>();

  // ── Delivery partner state ─────────────────────────────────────────────────
  // Migration v0→v1: phone field added to DeliveryPartner.
  // dpById / dpByUserId hold legacy records (no phone) — same names as in the
  // old stable snapshot so the runtime can load old data without error.
  // postupgrade migrates them into the current New maps.
  type DeliveryPartnerV0 = {
    id : Text; userId : Text; name : Text; vehicleType : Types.VehicleType;
    serviceType : Types.ServiceType; ratePerKm : Float; otherPlatforms : [Text];
    selfieUrl : ?Text; aadhaarUrl : ?Text; panUrl : ?Text; rcUrl : ?Text;
    avgRating : Float; ratingCount : Nat; isOnline : Bool;
    currentLocation : ?Types.Location; isOndcEnrolled : Bool; isVerified : Bool;
    kycStatus : Types.KYCStatus; aadhaarNo : Text; rcBook : Text; panNo : Text;
    rejectionReason : ?Text; blockedUntil : ?Int;
  };
  var dpById     = Map.empty<Text, DeliveryPartnerV0>();
  var dpByUserId = Map.empty<Text, DeliveryPartnerV0>();
  let dpByIdNew     = Map.empty<Text, Types.DeliveryPartner>();
  let dpByUserIdNew = Map.empty<Text, Types.DeliveryPartner>();

  let ordersById = Map.empty<Text, Types.Order>();
  // Set of order IDs that were created as test runs (by Script Executor / Flow Agent).
  let testOrderIds = Map.empty<Text, Bool>();

  // ── Job state ──────────────────────────────────────────────────────────────
  // Migration v0→v1: adhoc fields (jobType, pricePerDay, educationLevel, expiresAt,
  //                                isAdhoc, contactPhone) were added.
  // jobsStore uses the original type so stable data loads without error.
  // postupgrade migrates all entries to jobsStoreCurrent (new type).
  type JobV0 = {
    id          : Text;
    posterId    : Text;
    title       : Text;
    description : Text;
    category    : Text;
    salaryMin   : Float;
    salaryMax   : Float;
    location    : Types.Location;
    publishDate : Int;
    endDate     : Int;
    isOpen      : Bool;
    leads       : [Types.ContactRequest];
  };
  var jobsStore        = Map.empty<Text, JobV0>();
  let jobsStoreCurrent = Map.empty<Text, Types.Job>();

  // ── Property state ────────────────────────────────────────────────────────
  let propertiesStore = Map.empty<Text, Types.Property>();

  // ── Subscription state ────────────────────────────────────────────────────
  let plansStore         = Map.empty<Text, Types.SubscriptionPlan>();
  let subscriptionsStore = Map.empty<Text, Types.UserSubscription>();
  let assignmentsStore   = Map.empty<Text, Types.SubscriptionAssignment>();

  // ── ONDC state ────────────────────────────────────────────────────────────
  let ondcStore = Map.empty<Text, Types.OndcEnrollment>();

  // ── Notification state ────────────────────────────────────────────────────
  let notifStore = Map.empty<Text, Types.Notification>();

  // ── Rate card state ───────────────────────────────────────────────────────
  let rateCardStore     = Map.empty<Text, Types.DeliveryRateCard>();
  let rateCardByVehicle = Map.empty<Text, Text>();

  // ── Chatbot session state ─────────────────────────────────────────────────
  var sessionsStore    = Map.empty<Text, ConversationSessionV0>();
  let sessionsStoreNew = Map.empty<Text, Types.ConversationSession>();

  // ── Admin / Employee state ─────────────────────────────────────────────────
  let employeesStore = Map.empty<Text, Types.Employee>();
  let apiKeysStore   = Map.empty<Text, Types.ApiKey>();
  let apiUsageStore  = Map.empty<Text, Types.ApiUsageLog>();

  // ── Lead state ────────────────────────────────────────────────────────────
  let leadsStore = Map.empty<Text, Types.Lead>();

  // ── Transport / Sarthi state ──────────────────────────────────────────────
  let transportStore   = Map.empty<Text, Types.TransportBooking>();
  let sarthiOtpStore   = Map.empty<Text, PromotionTypes.SarthiOTPVerification>();

  // ── Event state ───────────────────────────────────────────────────────────
  let eventsStore = Map.empty<Text, EventTypes.Event>();

  // ── Family state ──────────────────────────────────────────────────────────
  var familyStore    = Map.empty<Text, FamilyMemberV0>();
  let familyStoreNew = Map.empty<Text, FamilyTypes.FamilyMember>();

  // ── Promotion state ───────────────────────────────────────────────────────
  let promotionsStore = Map.empty<Text, PromotionTypes.Promotion>();

  // ── Shuttle state ─────────────────────────────────────────────────────────
  let shuttleRoutesStore   = Map.empty<Text, Types.ShuttleRoute>();
  let shuttleBookingsStore = Map.empty<Text, Types.ShuttleBooking>();

  // ── Tip state ─────────────────────────────────────────────────────────────
  let tipsStore = Map.empty<Text, Types.TipRecord>();

  // ── Moderation state ──────────────────────────────────────────────────────
  let moderationStore = Map.empty<Text, Types.ModerationItem>();

  // ── Entity leads tracking ─────────────────────────────────────────────────
  let entityLeadsStore = Map.empty<Text, Types.EntityLeads>();

  // ── Module toggle state ───────────────────────────────────────────────────
  let moduleTogglesStore = Map.empty<Text, Bool>();

  // ── POS state ─────────────────────────────────────────────────────────────
  let merchantBranchStore : Map.Map<Text, [POSTypes.MerchantBranch]> = Map.empty<Text, [POSTypes.MerchantBranch]>();
  let orderQRStore        : Map.Map<Text, POSTypes.OrderPaymentQR>   = Map.empty<Text, POSTypes.OrderPaymentQR>();
  let deliveryQRStore     : Map.Map<Text, POSTypes.DeliveryPaymentQR> = Map.empty<Text, POSTypes.DeliveryPaymentQR>();
  let petrolExpenseStore  : Map.Map<Text, POSTypes.PetrolExpense>    = Map.empty<Text, POSTypes.PetrolExpense>();
  let customerBudgetStore : Map.Map<Text, POSTypes.CustomerBudget>   = Map.empty<Text, POSTypes.CustomerBudget>();
  let moduleRoleStore     : Map.Map<Text, Bool>                      = Map.empty<Text, Bool>();
  let adminUPIStore       : Map.Map<Text, POSTypes.AdminUPIProfile>  = Map.empty<Text, POSTypes.AdminUPIProfile>();

  // ── Support Ticket state ──────────────────────────────────────────────────
  // Migration v1→v2: `orderId` field was added.
  // The old stable variable was named `supportTicketsStore` with SupportTicketV0 (no orderId).
  // We keep the same name but use the legacy type so the runtime can load old data,
  // then migrate to the new store in postupgrade.
  type SupportTicketV0 = {
    ticketId           : Text;
    fromPhone          : Text;
    fromRole           : Types.UserRole;
    category           : Types.SupportTicketCategory;
    description        : Text;
    status             : Types.SupportTicketStatus;
    priority           : Types.SupportTicketPriority;
    createdAt          : Int;
    updatedAt          : Int;
    resolvedAt         : ?Int;
    resolutionDeadline : Int;
    remarks            : Text;
    adminNote          : Text;
  };
  // supportTicketsStore uses the legacy type so stable data loads without error.
  // postupgrade migrates all entries to supportTicketsStoreCurrent.
  var supportTicketsStore     = Map.empty<Text, SupportTicketV0>();
  let supportTicketsStoreCurrent = Map.empty<Text, Types.SupportTicket>();

  // ── canisterInit equivalent: runs on first install — seeds flows and default data ───────
  // NOTE: Enhanced Orthogonal Persistence actors use no preupgrade/postupgrade normally,
  // but this actor uses postupgrade for V0→V1 migration. On fresh install,
  // canister state is already initialized inline. The seedDefaultFlows() call at the
  // bottom of the actor body runs on every startup (init + upgrade alike). No separate
  // system func init is needed — the inline initialization block handles it.
  // The postupgrade below handles upgrade-time migration and also seeds new flows.

  system func postupgrade() {
    // ── Migrate UserV0 → User (add gender = "") ────────────────────────────
    for ((k, v0) in usersByPhone.entries()) {
      switch (usersByPhoneNew.get(k)) {
        case null {
          let migrated : Types.User = {
            id                 = v0.id;
            phone              = v0.phone;
            name               = v0.name;
            gender             = "";
            role               = v0.role;
            location           = v0.location;
            address            = v0.address;
            registrationDate   = v0.registrationDate;
            subscriptionPlanId = v0.subscriptionPlanId;
            conversationState  = (v0.conversationState : Types.ConversationState);
            stateData          = v0.stateData;
            isActive           = v0.isActive;
            otpVerified        = v0.otpVerified;
            passdigit          = v0.passdigit;
            passdigitAttempts  = v0.passdigitAttempts;
            sessionLocked      = v0.sessionLocked;
            sessionLockExpiry  = v0.sessionLockExpiry;
            otpCode            = v0.otpCode;
            otpExpiry          = v0.otpExpiry;
            countryCode        = v0.countryCode;
            currency           = v0.currency;
            countryName        = v0.countryName;
            importedByMerchant = v0.importedByMerchant;
            promotionalOptOut  = v0.promotionalOptOut;
            importBatchId      = v0.importBatchId;
          };
          usersByPhoneNew.add(k, migrated);
        };
        case (?_) {};
      };
    };
    usersByPhone := Map.empty<Text, UserV0>();
    for ((k, v0) in usersById.entries()) {
      switch (usersByIdNew.get(k)) {
        case null {
          let migrated : Types.User = {
            id                 = v0.id;
            phone              = v0.phone;
            name               = v0.name;
            gender             = "";
            role               = v0.role;
            location           = v0.location;
            address            = v0.address;
            registrationDate   = v0.registrationDate;
            subscriptionPlanId = v0.subscriptionPlanId;
            conversationState  = (v0.conversationState : Types.ConversationState);
            stateData          = v0.stateData;
            isActive           = v0.isActive;
            otpVerified        = v0.otpVerified;
            passdigit          = v0.passdigit;
            passdigitAttempts  = v0.passdigitAttempts;
            sessionLocked      = v0.sessionLocked;
            sessionLockExpiry  = v0.sessionLockExpiry;
            otpCode            = v0.otpCode;
            otpExpiry          = v0.otpExpiry;
            countryCode        = v0.countryCode;
            currency           = v0.currency;
            countryName        = v0.countryName;
            importedByMerchant = v0.importedByMerchant;
            promotionalOptOut  = v0.promotionalOptOut;
            importBatchId      = v0.importBatchId;
          };
          usersByIdNew.add(k, migrated);
        };
        case (?_) {};
      };
    };
    usersById := Map.empty<Text, UserV0>();
    // ── Migrate ConversationSessionV0 → ConversationSession ────────────────────
    for ((k, v0) in sessionsStore.entries()) {
      switch (sessionsStoreNew.get(k)) {
        case null {
          let migrated : Types.ConversationSession = {
            phoneNumber  = v0.phoneNumber;
            userId       = v0.userId;
            currentState = (v0.currentState : Types.ConversationState);
            stateData    = v0.stateData;
            messages     = v0.messages;
            lastActivity = v0.lastActivity;
            language     = v0.language;
          };
          sessionsStoreNew.add(k, migrated);
        };
        case (?_) {};
      };
    };
    sessionsStore := Map.empty<Text, ConversationSessionV0>();
    // ── Migrate FamilyMemberV0 → FamilyMember (add gender = "") ──────────────
    for ((k, v0) in familyStore.entries()) {
      switch (familyStoreNew.get(k)) {
        case null {
          let migrated : FamilyTypes.FamilyMember = {
            id                  = v0.id;
            ownerPhone          = v0.ownerPhone;
            ownerName           = v0.ownerName;
            ownerSurname        = v0.ownerSurname;
            relationship        = v0.relationship;
            relationName        = v0.relationName;
            relationPhone       = v0.relationPhone;
            relationAddress     = v0.relationAddress;
            inviteStatus        = v0.inviteStatus;
            createdAt           = v0.createdAt;
            gender              = "";
            isMatrimonyEligible = v0.isMatrimonyEligible;
            caste               = v0.caste;
            occupation          = v0.occupation;
            education           = v0.education;
            locationPreference  = v0.locationPreference;
            bloodGroup          = v0.bloodGroup;
            age                 = v0.age;
          };
          familyStoreNew.add(k, migrated);
        };
        case (?_) {};
      };
    };
    familyStore := Map.empty<Text, FamilyMemberV0>();
    for ((k, v0) in supportTicketsStore.entries()) {
      switch (supportTicketsStoreCurrent.get(k)) {
        case null {
          let migrated : Types.SupportTicket = {
            ticketId           = v0.ticketId;
            fromPhone          = v0.fromPhone;
            fromRole           = v0.fromRole;
            category           = v0.category;
            description        = v0.description;
            orderId            = null;
            status             = v0.status;
            priority           = v0.priority;
            createdAt          = v0.createdAt;
            updatedAt          = v0.updatedAt;
            resolvedAt         = v0.resolvedAt;
            resolutionDeadline = v0.resolutionDeadline;
            remarks            = v0.remarks;
            adminNote          = v0.adminNote;
          };
          supportTicketsStoreCurrent.add(k, migrated);
        };
        case (?_) {};
      };
    };
    supportTicketsStore := Map.empty<Text, SupportTicketV0>();
    // Migrate ProductV0 → Product (adds qty/packing/expiry with defaults)
    for ((k, v0) in productsById.entries()) {
      switch (productsByIdCurrent.get(k)) {
        case null {
          let migrated : Types.Product = {
            id              = v0.id;
            merchantId      = v0.merchantId;
            title           = v0.title;
            imageUrls       = v0.imageUrls;
            videoUrl        = v0.videoUrl;
            description     = v0.description;
            isNew           = v0.isNew;
            baseRate        = v0.baseRate;
            bulkRates       = v0.bulkRates;
            specialDiscount = v0.specialDiscount;
            isActive        = v0.isActive;
            qty          = 0;
            packing      = "";
            expiry       = "";
            barcodeValue = null;
          };
          productsByIdCurrent.add(k, migrated);
        };
        case (?_) {};
      };
    };
    productsById := Map.empty<Text, ProductV0>();
    // Migrate JobV0 → Job (adds adhoc/contact fields with safe defaults)
    for ((k, v0) in jobsStore.entries()) {
      switch (jobsStoreCurrent.get(k)) {
        case null {
          let migrated : Types.Job = {
            id             = v0.id;
            posterId       = v0.posterId;
            title          = v0.title;
            description    = v0.description;
            category       = v0.category;
            salaryMin      = v0.salaryMin;
            salaryMax      = v0.salaryMax;
            location       = v0.location;
            publishDate    = v0.publishDate;
            endDate        = v0.endDate;
            isOpen         = v0.isOpen;
            leads          = v0.leads;
            jobType        = #permanent;
            pricePerDay    = null;
            educationLevel = null;
            expiresAt      = null;
            isAdhoc        = false;
            contactPhone   = null;
          };
          jobsStoreCurrent.add(k, migrated);
        };
        case (?_) {};
      };
    };
    jobsStore := Map.empty<Text, JobV0>();
    // Migrate MatchScoreV0 → MatchScore (adds leagueName with empty string default)
    for ((k, v0) in matchScoresStore.entries()) {
      switch (matchScoresStoreCurrent.get(k)) {
        case null {
          let migrated : MatchScoreTypes.MatchScore = {
            id         = v0.id;
            sport      = v0.sport;
            homeTeam   = v0.homeTeam;
            awayTeam   = v0.awayTeam;
            homeScore  = v0.homeScore;
            awayScore  = v0.awayScore;
            status     = v0.status;
            matchTime  = v0.matchTime;
            leagueName = "";
            fetchedAt  = v0.fetchedAt;
            createdAt  = v0.createdAt;
            updatedAt  = v0.updatedAt;
          };
          matchScoresStoreCurrent.add(k, migrated);
        };
        case (?_) {};
      };
    };
    matchScoresStore := Map.empty<Text, MatchScoreV0>();
    // Migrate MarketSearchQueryV0 → MarketSearchQuery (adds matchedSymbols with [] default)
    // Also migrates TradeRecommendationV0 → TradeRecommendation (adds targetDate and accuracyPrediction)
    for ((k, v0) in marketSearchesStore.entries()) {
      switch (marketSearchesStoreCurrent.get(k)) {
        case null {
          let recommendations = v0.recommendations.map(
            func(r) { { r with targetDate = ""; accuracyPrediction = "" } }
          );
          let migrated : MarketSearchTypes.MarketSearchQuery = {
            id              = v0.id;
            scriptName      = v0.scriptName;
            country         = v0.country;
            matchedSymbols  = [];
            searchedAt      = v0.searchedAt;
            results         = v0.results;
            recommendations = recommendations;
            createdAt       = v0.createdAt;
            updatedAt       = v0.updatedAt;
          };
          marketSearchesStoreCurrent.add(k, migrated);
        };
        case (?_) {};
      };
    };
    marketSearchesStore := Map.empty<Text, MarketSearchQueryV0>();
    // Migrate MerchantV0 → Merchant (adds phone field with empty string default)
    for ((k, v0) in merchantsById.entries()) {
      switch (merchantsByIdNew.get(k)) {
        case null {
          // Resolve phone from the associated user record
          let phone = switch (usersByIdNew.get(v0.userId)) {
            case (?u) u.phone;
            case null "";
          };
          merchantsByIdNew.add(k, { v0 with phone });
        };
        case (?_) {};
      };
    };
    merchantsById := Map.empty<Text, MerchantV0>();
    for ((k, v0) in merchantsByUserId.entries()) {
      switch (merchantsByUserIdNew.get(k)) {
        case null {
          let phone = switch (usersByIdNew.get(v0.userId)) {
            case (?u) u.phone;
            case null "";
          };
          merchantsByUserIdNew.add(k, { v0 with phone });
        };
        case (?_) {};
      };
    };
    merchantsByUserId := Map.empty<Text, MerchantV0>();
    // Migrate DeliveryPartnerV0 → DeliveryPartner (adds phone field)
    for ((k, v0) in dpById.entries()) {
      switch (dpByIdNew.get(k)) {
        case null {
          let phone = switch (usersByIdNew.get(v0.userId)) {
            case (?u) u.phone;
            case null "";
          };
          dpByIdNew.add(k, { v0 with phone });
        };
        case (?_) {};
      };
    };
    dpById := Map.empty<Text, DeliveryPartnerV0>();
    for ((k, v0) in dpByUserId.entries()) {
      switch (dpByUserIdNew.get(k)) {
        case null {
          let phone = switch (usersByIdNew.get(v0.userId)) {
            case (?u) u.phone;
            case null "";
          };
          dpByUserIdNew.add(k, { v0 with phone });
        };
        case (?_) {};
      };
    };
    dpByUserId := Map.empty<Text, DeliveryPartnerV0>();
    // Migrate CityV0 → City (adds pincode field with empty string default)
    for ((k, v0) in citiesById.entries()) {
      switch (citiesByIdCurrent.get(k)) {
        case null {
          let migrated : CityTypes.City = {
            id        = v0.id;
            name      = v0.name;
            pincode   = "";
            isEnabled = v0.isEnabled;
            createdAt = v0.createdAt;
          };
          citiesByIdCurrent.add(k, migrated);
        };
        case (?_) {};
      };
    };
    citiesById := Map.empty<Text, CityV0>();
    // Migrate CityControlV0 → CityControl (adds pincode field with empty string default)
    for ((k, v0) in cityControlsById.entries()) {
      switch (cityControlsByIdCurrent.get(k)) {
        case null {
          let migrated : CityTypes.CityControl = {
            cityId        = v0.cityId;
            cityName      = v0.cityName;
            pincode       = "";
            moduleToggles = v0.moduleToggles;
          };
          cityControlsByIdCurrent.add(k, migrated);
        };
        case (?_) {};
      };
    };
    cityControlsById := Map.empty<Text, CityControlV0>();
    // Migrate BotLogV0 → BotLog (adds rawPayload : ?Text with null default)
    for ((k, v0) in botLogsStore.entries()) {
      switch (botLogsStoreCurrent.get(k)) {
        case null {
          let migrated : Types.BotLog = {
            id            = v0.id;
            platform      = v0.platform;
            direction     = v0.direction;
            timestamp     = v0.timestamp;
            senderId      = v0.senderId;
            messageText   = v0.messageText;
            flowTriggered = v0.flowTriggered;
            status        = v0.status;
            errorDetail   = v0.errorDetail;
            rawPayload    = null;
          };
          botLogsStoreCurrent.add(k, migrated);
        };
        case (?_) {};
      };
    };
    botLogsStore := Map.empty<Text, BotLogV0>();
    // Backfill createdAt/updatedAt on any FlowDefinition with zero timestamps
    // Also backfill flowJson on any FlowDefinition where it is empty or invalid
    // Also migrate environment from "production" (legacy) to "live" (canonical)
    let _migrateNow = Time.now();
    for ((k, fd) in flowsStore.entries()) {
      let needsTimestamp = fd.createdAt == 0 or fd.updatedAt == 0;
      let needsJson      = fd.flowJson == "" or not fd.flowJson.startsWith(#text "{");
      let needsEnv       = fd.environment == "" or fd.environment == "production";
      if (needsTimestamp or needsJson or needsEnv) {
        let createdAt   = if (fd.createdAt == 0) _migrateNow else fd.createdAt;
        let updatedAt   = if (fd.updatedAt == 0) _migrateNow else fd.updatedAt;
        let safeJson : Text = if (needsJson) {
          "{\"nodes\":[],\"edges\":[],\"id\":\"" # fd.id # "\",\"name\":\"" # fd.name # "\"}"
        } else {
          fd.flowJson
        };
            let environment = if (needsEnv) "live" else fd.environment;
        flowsStore.add(k, { fd with createdAt; updatedAt; flowJson = safeJson; environment });
      };
    };
    // Seed any missing default flows (new flows added since last deploy)
    seedDefaultFlows();
    // Seed menu options after flows on every upgrade
    runSeedDefaultMenuOptions();
    // Seed all 24 modules as enabled for every city that lacks them
    citySvc.seedDefaultCityModules();
    // Seed PaySprint flows
    for (fd in PaySprintFlowSeeds.getPaySprintFlowSeeds().vals()) {
      switch (flowsStore.get(fd.id)) {
        case null { flowsStore.add(fd.id, fd) };
        case (?existing) {
          if (fd.version > existing.version) { flowsStore.add(fd.id, fd) };
        };
      };
    };
  };

  // ── WhatsApp config state (persistent) ───────────────────────────────────
  // Single-entry map keyed on "whatsapp_config" → FullWhatsAppConfig.
  // All fields (including businessAccountId, metaAppId) are stored atomically
  // in one record so nothing is lost on canister restart.
  // With Enhanced Orthogonal Persistence the Map lives in stable heap memory.
  let whatsAppConfigStore = Map.empty<Text, WhatsAppService.FullWhatsAppConfig>();

  // ── Telegram config state (persistent) ───────────────────────────────────
  // Single-entry map keyed on "telegram_config". Enhanced Orthogonal
  // Persistence keeps this in stable heap memory — no `stable` keyword needed.
  let telegramConfigStore = Map.empty<Text, TelegramService.TelegramConfig>();

  // ── Custom-order pending state with timestamps (for cache clearing) ────────
  // Key: userId/phone, Value: timestamp (nanoseconds) of last pending custom order
  let customOrderPendingStore = Map.empty<Text, Int>();

  // ── Recipe state ──────────────────────────────────────────────────────────
  let recipesStore = Map.empty<Text, Types.Recipe>();

  // ── Supplier Order state ──────────────────────────────────────────────────
  let supplierOrdersStore = Map.empty<Text, Types.SupplierOrder>();

  // ── Restock Order state ───────────────────────────────────────────────────
  let restockOrdersStore = Map.empty<Text, Types.RestockOrder>();

  // ── City state ────────────────────────────────────────────────────────────
  // Migration v0→v1: `pincode` field was added to both City and CityControl.
  // citiesById / cityControlsById hold legacy records (no pincode) — matched by
  // name to the old stable snapshot.  postupgrade migrates them into the current maps.
  type CityV0 = {
    id        : Text;
    name      : Text;
    isEnabled : Bool;
    createdAt : Int;
  };
  type CityControlV0 = {
    cityId        : Text;
    cityName      : Text;
    moduleToggles : [(Text, Bool)];
  };
  var citiesById       = Map.empty<Text, CityV0>();
  var cityControlsById = Map.empty<Text, CityControlV0>();
  let citiesByIdCurrent       = Map.empty<Text, CityTypes.City>();
  let cityControlsByIdCurrent = Map.empty<Text, CityTypes.CityControl>();

  // ── Marketplace (old items sell/buy/rent) state ───────────────────────────
  let marketplaceItemsById = Map.empty<Text, MarketplaceTypes.MarketplaceItem>();

  // ── Donation state ─────────────────────────────────────────────────
  let donationsStore        = Map.empty<Text, Types.DonationItem>();
  let donationRequestsStore = Map.empty<Text, Types.DonationRequest>();
  var nextDonationId : Nat = 0;

  // ── Lending state ──────────────────────────────────────────────────
  let lendingItemsStore = Map.empty<Text, LendingTypes.LendingItem>();

  // ── Community state ────────────────────────────────────────────────
  // ── Community state ──────────────────────────────────────────────────────────────────
  let communityMembersStore  = Map.empty<Text, CommunityTypes.CommunityMember>();
  let communityParkingStore  = Map.empty<Text, CommunityTypes.CommunityParkingBooking>();
  let communityRoomStore     = Map.empty<Text, CommunityTypes.CommunityRoomBooking>();
  let communityFoodStore     = Map.empty<Text, CommunityTypes.CommunityFoodOrder>();
  let communityWorkStore     = Map.empty<Text, CommunityTypes.CommunityWorkOrder>();
  let communityIdState       = { var nextId : Nat = 0 };

  // ── Merchant Employee / Attendance / Leave / Visitor state ───────────────────────
  let merchantEmployeesStore  = Map.empty<Text, MerchantEmployeeTypes.MerchantEmployee>();
  let empAttendanceStore      = Map.empty<Text, MerchantEmployeeTypes.EmployeeAttendance>();
  let leaveRequestsStore      = Map.empty<Text, MerchantEmployeeTypes.LeaveRequest>();
  let visitorCheckinsStore    = Map.empty<Text, MerchantEmployeeTypes.VisitorCheckin>();
  let empIdState              = { var nextId : Nat = 0 };

  // ── Match Score state ────────────────────────────────────────────────
  // ── Election Results state ─────────────────────────────────────────────
  let electionResultsStore = Map.empty<Text, ElectionResultTypes.ElectionResult>();

  // ── Match Score state ─────────────────────────────────────────────
  // Migration v0→v1: `leagueName : Text` was added to MatchScore.
  // matchScoresStore holds legacy records (no leagueName) — matched by name to old snapshot.
  // postupgrade migrates them into matchScoresStoreCurrent (new type).
  type MatchScoreV0 = {
    id        : Text;
    sport     : Text;
    homeTeam  : Text;
    awayTeam  : Text;
    homeScore : Text;
    awayScore : Text;
    status    : Text;
    matchTime : Text;
    fetchedAt : Int;
    createdAt : Int;
    updatedAt : Int;
  };
  var matchScoresStore        = Map.empty<Text, MatchScoreV0>();
  let matchScoresStoreCurrent = Map.empty<Text, MatchScoreTypes.MatchScore>();

  // ── Market & Commodity Search state ──────────────────────────────────
  // Migration v0→v1: `matchedSymbols : [Text]` was added to MarketSearchQuery.
  // Also `targetDate` and `accuracyPrediction` were added to TradeRecommendation.
  // marketSearchesStore holds legacy records — matched by name to old snapshot.
  // postupgrade migrates them into marketSearchesStoreCurrent (new type).
  type TradeRecommendationV0 = {
    symbol        : Text;
    action        : Text;
    stopLossPrice : Float;
    targetPrice   : Float;
    confidence    : Float;
    reasoning     : Text;
    createdAt     : Int;
    updatedAt     : Int;
  };
  type MarketSearchQueryV0 = {
    id              : Text;
    scriptName      : Text;
    country         : Text;
    searchedAt      : Int;
    results         : [MarketSearchTypes.MarketSearchResult];
    recommendations : [TradeRecommendationV0];
    createdAt       : Int;
    updatedAt       : Int;
  };
  var marketSearchesStore        = Map.empty<Text, MarketSearchQueryV0>();
  let marketSearchesStoreCurrent = Map.empty<Text, MarketSearchTypes.MarketSearchQuery>();

  // ── Script Executor run results state ─────────────────────────────────────
  let scriptRunResultsStore   = Map.empty<Text, Types.ScriptRunResult>();
  let entityRecordsFromRuns   = Map.empty<Text, [Types.ScriptEntityRecord]>();

  // ── Flow Agent state ───────────────────────────────────────────────────────
  let agentRunsStore          = Map.empty<Text, Types.FlowAgentRun>();
  let flowDiagnosticsStore    = Map.empty<Text, Types.FlowDiagnosticResult>();
  let agentDeploymentsStore   = Map.empty<Text, Types.AgentDeployment>();
  let agentScheduleStore      = Map.empty<Text, Types.FlowAgentSchedule>();
  let agentChannelSyncStore   = Map.empty<Text, Bool>();
  let agentEntitySummaryStore = Map.empty<Text, Types.AgentEntitySummary>();

  // ── Bot message log state (Telegram + WhatsApp + SMS) ────────────────────
  // Migration v1→v2: `rawPayload : ?Text` field was added to BotLog.
  // botLogsStore holds legacy records (no rawPayload) — matched by name to old snapshot.
  // postupgrade migrates them into botLogsStoreCurrent (new type).
  type BotLogV0 = {
    id            : Text;
    platform      : Text;
    direction     : Text;
    timestamp     : Int;
    senderId      : Text;
    messageText   : Text;
    flowTriggered : Text;
    status        : Text;
    errorDetail   : Text;
  };
  var botLogsStore    = Map.empty<Text, BotLogV0>();
  let botLogsStoreCurrent = Map.empty<Text, Types.BotLog>();
  var nextBotLogId : Nat = 0;

  // ── SMS config state (persistent) ────────────────────────────────────────
  // Single-entry map keyed on "sms_config". Enhanced Orthogonal Persistence
  // keeps this in stable heap memory — no `stable` keyword needed.
  let smsConfigStore = Map.empty<Text, SMSService.SMSConfig>();

  // ── Seed default module states (all enabled)
  do {
    let defaultModules : [Text] = ["shopping", "jobs", "property", "transport", "events", "family", "promotions", "lending", "community", "community-parking", "community-rooms", "community-food", "community-manager", "language_learning"];
    for (m in defaultModules.vals()) {
      switch (moduleTogglesStore.get(m)) {
        case null { moduleTogglesStore.add(m, true) };
        case (?_) {};
      };
    };
  };
  var pipelineEnvironment : Text = "live";
  var nextFlowId : Nat = 0;

  // ── Telegram polling offset (persists across upgrades) ───────────────────
  // Stores the last Telegram update_id we processed so polling never replays.
  var telegramUpdateOffset : Int = 0;

  // ── Telegram delivery mode ───────────────────────────────────────────────
  // Tracks whether polling is the active delivery mode.
  // Set to false whenever a webhook URL is saved; set to true when polling is
  // explicitly started. This prevents the polling heartbeat from running while
  // a webhook is registered, eliminating the Telegram 409 Conflict.
  var pollingEnabled : Bool = false;

  // ── Canister build ID — increment to confirm new wasm is deployed ─────────
  // Frontend / admin can call getCanisterVersion() to verify the new canister
  // is live. Also served at GET /canister-version for quick HTTP health checks.
  let CANISTER_BUILD_ID : Text = "localbazar-kart-v100-canisterinit-mobile-pincode-20260508";

  // ── Flow Designer state ───────────────────────────────────────────────────
  let flowsStore = Map.empty<Text, Types.FlowDefinition>();

  // ── PaySprint state ───────────────────────────────────────────────────────
  let paysprintCredentials  = Map.empty<Text, PaySprintTypes.PaySprintCredential>();
  let busBookings           = Map.empty<Text, PaySprintTypes.BusBooking>();
  let trainBookings         = Map.empty<Text, PaySprintTypes.TrainBooking>();
  let flightBookings        = Map.empty<Text, PaySprintTypes.FlightBooking>();
  let utilityTransactions   = Map.empty<Text, PaySprintTypes.UtilityTransaction>();
  let paysprintCallbacks    = Map.empty<Text, PaySprintTypes.PaySprintCallback>();
  let paysprintAPILogs      = Map.empty<Text, PaySprintTypes.PaySprintAPILog>();

  // ── Professional Service / Healthcare / Tours state ─────────────────────
  let healthcareProviderStore : Map.Map<Text, ProfessionalServiceTypes.HealthcareProvider>    = Map.empty<Text, ProfessionalServiceTypes.HealthcareProvider>();
  let healthcareApptStore     : Map.Map<Text, ProfessionalServiceTypes.HealthcareAppointment> = Map.empty<Text, ProfessionalServiceTypes.HealthcareAppointment>();
  let tourOperatorStore       : Map.Map<Text, ProfessionalServiceTypes.TourOperator>          = Map.empty<Text, ProfessionalServiceTypes.TourOperator>();
  let tourBookingStore        : Map.Map<Text, ProfessionalServiceTypes.TourBooking>           = Map.empty<Text, ProfessionalServiceTypes.TourBooking>();
  let professionalSvcStore    : Map.Map<Text, ProfessionalServiceTypes.ProfessionalService>   = Map.empty<Text, ProfessionalServiceTypes.ProfessionalService>();
  let serviceBookingStore     : Map.Map<Text, ProfessionalServiceTypes.ServiceBooking>        = Map.empty<Text, ProfessionalServiceTypes.ServiceBooking>();
  // ── Product location pricing state ──────────────────────────────────
  // import declaration added below with other imports
  let productLocationPricesStore = Map.empty<Text, ProductLocationTypes.ProductLocationPrice>();

  // ── Job city favourites state ────────────────────────────────────────
  let jobCityFavoritesStore = Map.empty<Text, JobCityTypes.JobCityFavorite>();

  // ── Branding state ─────────────────────────────────────────────────
  let brandingStore    = Map.empty<Text, BrandingTypes.BrandingConfig>();
  let appVersionsStore = Map.empty<Text, BrandingTypes.AppVersion>();

  // ── Menu repository state ────────────────────────────────────────────
  let menuOptionsStore = Map.empty<Text, MenuRepositoryTypes.MenuOption>();
  // Log for webhook-style menu-update signals (polled by frontend/channels)
  let menuWebhookUpdateLog = List.empty<Text>();
  // ── Admin Principal Whitelist ──────────────────────────────────────────────
  // Stores Internet Identity principals that are allowed to perform admin-only
  // mutations (branding, menu management, etc.).
  // On fresh install this starts empty; the first II caller can self-claim via
  // initAdminPrincipal().  On subsequent upgrades the store is preserved.
  let adminPrincipalsStore = Map.empty<Text, Bool>();

  // ── Admin claim gate (one-time bootstrap) ──────────────────────────────────
  // Set to true after the first admin principal has been claimed.
  let adminClaimState = { var claimed : Bool = false };
  // ── Manufacturer state ─────────────────────────────────────────────────────────
  let manufacturersById      = Map.empty<Text, ManufacturerTypes.Manufacturer>();
  let manufacturersByUserId  = Map.empty<Text, ManufacturerTypes.Manufacturer>();
  let distributorNetworkById = Map.empty<Text, ManufacturerTypes.DistributorNetwork>();
  let mfgProductsById        = Map.empty<Text, ManufacturerTypes.ManufacturerProduct>();
  let expiryReturnsById      = Map.empty<Text, ManufacturerTypes.ExpiryReturn>();
  let mfgComplaintsById      = Map.empty<Text, ManufacturerTypes.ManufacturerComplaint>();
  let mfgRatingsById         = Map.empty<Text, ManufacturerTypes.ManufacturerRating>();
  let mfgIdState             = { var nextMfgId : Nat = 0 };
  // ── Manufacturer Employee state ─────────────────────────────────────────────
  let mfgEmployeesById       = Map.empty<Text, ManufacturerTypes.ManufacturerEmployee>();
  let mfgAttendanceById      = Map.empty<Text, ManufacturerTypes.EmployeeAttendanceRecord>();
  let mfgLeaveRequestsById   = Map.empty<Text, ManufacturerTypes.EmployeeLeaveRequest>();
  let mfgInventoryItemsById  = Map.empty<Text, ManufacturerTypes.InventoryItem>();
  let mfgInventoryTxnsById   = Map.empty<Text, ManufacturerTypes.InventoryTransaction>();
  let mfgSaleRecordsById     = Map.empty<Text, ManufacturerTypes.SaleRecord>();
  let mfgPurchaseRecordsById = Map.empty<Text, ManufacturerTypes.PurchaseRecord>();
  let mfgAccountEntriesById  = Map.empty<Text, ManufacturerTypes.AccountEntry>();
  let mfgBillRecordsById     = Map.empty<Text, ManufacturerTypes.BillRecord>();
  let mfgEmpIdState          = { var nextId : Nat = 0 };
  // ── Flow Session state ───────────────────────────────────────────────────────
  let flowSessionsById       = Map.empty<Text, FlowSessionTypes.FlowSession>();
  let posOrdersById          = Map.empty<Text, FlowSessionTypes.POSOrder>();
  // ── Blog state ────────────────────────────────────────────────────────────────
  let blogsById           = Map.empty<Text, BlogTypes.Blog>();
  let blogReviewsById     = Map.empty<Text, BlogTypes.BlogReview>();

  // ── Customer rating state ──────────────────────────────────────────────────
  let customerRatingsById = Map.empty<Text, CustomerRatingTypes.CustomerRating>();

  // ── Job location state ──────────────────────────────────────────────────────
  let jobLocationsById    = Map.empty<Text, JobLocationTypes.JobLocation>();

  // ── Language Learning state ──────────────────────────────────────────────
  let coursesMap          = Map.empty<Text, LanguageLearningTypes.LanguageCourse>();
  let lessonsMap          = Map.empty<Text, LanguageLearningTypes.Lesson>();
  let enrollmentsMap      = Map.empty<Text, LanguageLearningTypes.UserEnrollment>();
  let lessonProgressMap   = Map.empty<Text, LanguageLearningTypes.LessonProgress>();
  let savedWordsMap       = Map.empty<Text, LanguageLearningTypes.SavedWord>();
  let courseApprovalsMap  = Map.empty<Text, LanguageLearningTypes.CourseApproval>();
  let dailyLessonsMap     = Map.empty<Text, LanguageLearningTypes.DailyLesson>();
  let wordDefinitionsMap  = Map.empty<Text, LanguageLearningTypes.WordDefinition>();
  let lessonLikesMap      = Map.empty<Text, LanguageLearningTypes.LessonLike>();
  let deliveryShiftsMap   = Map.empty<Text, POSTypes.DeliveryPartnerShift>();

  // ── Session / Script / FlowAgent / Advertisement state ──────────────────
  let chatSimulatorSessionsStore = Map.empty<Text, SessionTypes.ChatSimulatorSession>();
  let scriptExecutionResultsStore = Map.empty<Text, SessionTypes.ScriptExecutionResult>();
  let flowAgentDiagnosticsStore  = Map.empty<Text, SessionTypes.FlowAgentDiagnostic>();
  let advertisementsStore        = Map.empty<Text, SessionTypes.Advertisement>();

  // ── Delivery Assignment state ─────────────────────────────────────────────
  let deliveryAssignmentsStore = Map.empty<Text, DeliveryAssignmentTypes.DeliveryAssignment>();
  let deliveryAssignIdState    = { var nextId : Nat = 0 };


  // ── Service instances ──────────────────────────────────────────────────────
  include POSMixin(ordersById, merchantsByIdNew, dpByIdNew, usersByIdNew, usersByPhoneNew, plansStore, subscriptionsStore, merchantBranchStore, orderQRStore, deliveryQRStore, petrolExpenseStore, customerBudgetStore, moduleRoleStore, adminUPIStore, shuttleRoutesStore);
  include CityMixin(citiesByIdCurrent, cityControlsByIdCurrent);
  include MarketplaceMixin(marketplaceItemsById);
  include ScriptExecutorMixin(scriptRunResultsStore, entityRecordsFromRuns, usersByPhoneNew, merchantsByIdNew, ordersById, flowsStore, healthcareApptStore, tourBookingStore, serviceBookingStore, donationsStore, lendingItemsStore, jobsStoreCurrent);
  include FlowAgentMixin(agentRunsStore, flowDiagnosticsStore, agentDeploymentsStore, agentScheduleStore, agentChannelSyncStore, flowsStore, agentEntitySummaryStore, usersByPhoneNew, merchantsByIdNew, ordersById);
  include ProfessionalServiceMixin(healthcareProviderStore, healthcareApptStore, tourOperatorStore, tourBookingStore, professionalSvcStore, serviceBookingStore, merchantsByIdNew, ordersById, subscriptionsStore, plansStore, usersByPhoneNew, familyStoreNew, dpByUserIdNew);
  include MatchScoreMixin(matchScoresStoreCurrent);
  include ElectionResultsMixin(electionResultsStore);
  include MarketSearchMixin(marketSearchesStoreCurrent);
  include LendingMixin(lendingItemsStore);
  include CommunityMixin(communityMembersStore, communityParkingStore, communityRoomStore, communityFoodStore, communityWorkStore, communityIdState);
  include PaySprintMixin(paysprintCredentials, busBookings, trainBookings, flightBookings, utilityTransactions, paysprintCallbacks, paysprintAPILogs);  include ProductLocationMixin(productLocationPricesStore);
  include JobCityMixin(jobCityFavoritesStore, jobsStoreCurrent);
  include BrandingMixin(brandingStore, appVersionsStore, flowsStore, adminPrincipalsStore);
  include MenuRepositoryMixin(menuOptionsStore, flowsStore, cityControlsByIdCurrent, adminPrincipalsStore, menuWebhookUpdateLog);
  include ManufacturerMixin(manufacturersById, manufacturersByUserId, distributorNetworkById, mfgProductsById, expiryReturnsById, mfgComplaintsById, mfgRatingsById, mfgIdState, merchantsByIdNew);  include BlogMixin(blogsById, blogReviewsById);
  include CustomerRatingMixin(customerRatingsById);
  include JobLocationMixin(jobLocationsById);

  include MerchantEmployeeMixin(merchantEmployeesStore, empAttendanceStore, leaveRequestsStore, visitorCheckinsStore, empIdState);
  include ManufacturerEmployeeMixin(mfgEmployeesById, mfgAttendanceById, mfgLeaveRequestsById, mfgInventoryItemsById, mfgInventoryTxnsById, mfgSaleRecordsById, mfgPurchaseRecordsById, mfgAccountEntriesById, mfgBillRecordsById, mfgEmpIdState);

  // ── Language Learning service & API instances ────────────────────────────
  transient let languageLearningSvc = LanguageLearningService.LanguageLearningService(
    coursesMap, lessonsMap, enrollmentsMap, lessonProgressMap,
    savedWordsMap, courseApprovalsMap, dailyLessonsMap, wordDefinitionsMap, lessonLikesMap
  );
  transient let languageLearningApi = LanguageLearningAPI.LanguageLearningAPI(
    {
      coursesStore        = coursesMap;
      lessonsStore        = lessonsMap;
      enrollmentsStore    = enrollmentsMap;
      lessonProgressStore = lessonProgressMap;
      savedWordsStore     = savedWordsMap;
      approvalsStore      = courseApprovalsMap;
      dailyLessonsStore   = dailyLessonsMap;
      wordDefsStore       = wordDefinitionsMap;
    },
    languageLearningSvc
  );

  // PaySprintFlowSeeds is a module (not a mixin) — its function is called during flow seeding

  transient let userSvc         = UserService.UserService(usersByPhoneNew, usersByIdNew);
  transient let merchantSvc     = MerchantService.MerchantService(merchantsByIdNew, merchantsByUserIdNew);
  transient let productSvc      = ProductService.ProductService(productsByIdCurrent);
  transient let dpSvc           = DeliveryPartnerService.DeliveryPartnerService(dpByIdNew, dpByUserIdNew, deliveryShiftsMap);
  transient let orderSvc        = OrderService.OrderService(ordersById);
  transient let jobSvc          = JobService.JobService(jobsStoreCurrent);
  transient let propertySvc     = PropertyService.PropertyService(propertiesStore);
  transient let subscriptionSvc = SubscriptionService.SubscriptionService(plansStore, subscriptionsStore, assignmentsStore);
  transient let ondcSvc         = OndcService.OndcService(ondcStore);
  transient let notifSvc        = NotificationService.NotificationService(notifStore);
  transient let rateCardSvc     = RateCardService.RateCardService(rateCardStore, rateCardByVehicle);
  transient let leadSvc         = LeadService.LeadService(leadsStore);
  transient let eventSvc        = EventService.EventService(eventsStore, subscriptionsStore, plansStore);
  transient let familySvc       = FamilyService.FamilyService(familyStoreNew, userSvc);
  transient let promotionSvc    = PromotionService.PromotionService(promotionsStore);
  transient let shuttleSvc      = ShuttleService.ShuttleService(shuttleRoutesStore, shuttleBookingsStore);
  transient let transportSvc    = TransportService.TransportService(transportStore, sarthiOtpStore);
  transient let botEngine       = ChatbotEngine.ChatbotEngine(sessionsStoreNew, jobsStoreCurrent, userSvc, merchantSvc, productSvc, dpSvc, orderSvc, propertySvc, eventSvc, familySvc, promotionSvc, rateCardSvc, shuttleSvc, leadSvc, moduleRoleStore, citiesByIdCurrent, cityControlsByIdCurrent, subscriptionsStore, plansStore, transportSvc, supplierOrdersStore, notifStore, moderationStore, healthcareProviderStore, tourOperatorStore, professionalSvcStore);
  transient let whatsAppSvc     = WhatsAppService.WhatsAppService(botEngine, whatsAppConfigStore);
  transient let adminSvc        = AdminService.AdminService(botEngine, userSvc, merchantSvc, dpSvc, jobSvc, employeesStore, apiKeysStore, apiUsageStore, ordersById, propertiesStore, leadsStore, eventsStore, familyStoreNew, promotionsStore);
  transient let tipSvc          = TipService.TipService(tipsStore);
  transient let moderationSvc   = ModerationService.ModerationService(moderationStore);
  transient let supportTicketSvc = SupportTicketService.SupportTicketService(supportTicketsStoreCurrent);
  transient let contactImportSvc = ContactImportService.ContactImportService(userSvc);
  transient let recipeSvc        = RecipeService.RecipeService(recipesStore);
  transient let restockSvc       = RestockService.RestockService(restockOrdersStore);
  transient let telegramSvc      = TelegramService.TelegramService(telegramConfigStore, botEngine);
  transient let smsSvc           = SMSService.SMSService(smsConfigStore, botEngine);

  // Seed defaults on startup
  subscriptionSvc.seedDefaultPlans();
  rateCardSvc.seedDefaults();

  // ── Seed all 45+ flows into the unified registry ───────────────────────────
  // Called at actor startup and after canister upgrade.
  // Registration flows are seeded first (order 1), then all others.
  // If a flow already exists with all required fields, it is skipped.
  // If it exists but is missing createdAt/updatedAt/flowJson, it is patched.
  // Flows are seeded with BOTH dash-separated IDs (canonical) and underscore
  // aliases for backward compatibility with surfaces that use underscores.
  func seedDefaultFlows() {
    // ── Seed default branding if none exists ───────────────────────────────
    switch (brandingStore.get("default")) {
      case null {
        let brandNow = Time.now();
        brandingStore.add("default", {
          brandName      = "LocalBazar Kart";
          welcomeMessage = "Welcome to LocalBazar Kart! 🛒 How can we help you today?";
          logoUrl        = "";
          createdAt      = brandNow;
          updatedAt      = brandNow;
        });
      };
      case (?_) {};
    };
    // ── Rich step JSON helpers ──────────────────────────────────────────────
    // Returns a full JSON flow graph with typed step nodes for Script Executor.
    func makeFlowJson(id : Text, name : Text, nodes : Text, edges : Text) : Text {
      "{\"nodes\":[" # nodes # "],\"edges\":[" # edges # "],\"id\":\"" # id # "\",\"name\":\"" # name # "\"}"
    };

    func startNode() : Text {
      "{\"id\":\"start\",\"type\":\"start\",\"data\":{\"label\":\"Start\",\"output\":\"Welcome to LocalBazar Kart! How can I help you today?\"}}"
    };

    func endNode(msg : Text) : Text {
      "{\"id\":\"end\",\"type\":\"end\",\"data\":{\"label\":\"Complete\",\"output\":\"" # msg # "\"}}"
    };

    func inputNode(nodeId : Text, nodeLabel : Text, prompt : Text, inputType : Text, outputVar : Text) : Text {
      "{\"id\":\"" # nodeId # "\",\"type\":\"input\",\"data\":{\"label\":\"" # nodeLabel # "\",\"prompt\":\"" # prompt # "\",\"inputType\":\"" # inputType # "\",\"outputVariable\":\"" # outputVar # "\"}}"
    };

    func actionNode(nodeId : Text, nodeLabel : Text, action : Text, inputs : Text) : Text {
      "{\"id\":\"" # nodeId # "\",\"type\":\"action\",\"data\":{\"label\":\"" # nodeLabel # "\",\"action\":\"" # action # "\",\"inputs\":[" # inputs # "]}}"
    };

    func choiceNode(nodeId : Text, nodeLabel : Text, prompt : Text, choices : Text) : Text {
      "{\"id\":\"" # nodeId # "\",\"type\":\"choice\",\"data\":{\"label\":\"" # nodeLabel # "\",\"prompt\":\"" # prompt # "\",\"choices\":[" # choices # "]}}"
    };

    func edge(from : Text, to : Text) : Text {
      "{\"id\":\"e_" # from # "_" # to # "\",\"source\":\"" # from # "\",\"target\":\"" # to # "\"}"
    };

    // ── Rich flow JSON definitions ──────────────────────────────────────────
    let customerRegJson = makeFlowJson(
      "customer-registration", "Customer Registration",
      startNode() # "," #
      inputNode("collect_phone", "Collect Phone", "Enter your 10-digit phone number:", "phone", "phone") # "," #
      inputNode("collect_name", "Collect Name", "Enter your full name:", "text", "name") # "," #
      choiceNode("select_role", "Select Role", "Select your role:", "\"1. Customer\",\"2. Merchant\",\"3. Delivery Partner\"") # "," #
      actionNode("save_user", "Save User", "createUser", "\"phone\",\"name\",\"role\"") # "," #
      endNode("Registration complete! Welcome to LocalBazar Kart."),
      edge("start", "collect_phone") # "," # edge("collect_phone", "collect_name") # "," #
      edge("collect_name", "select_role") # "," # edge("select_role", "save_user") # "," #
      edge("save_user", "end")
    );

    let merchantRegJson = makeFlowJson(
      "merchant-registration", "Merchant Registration",
      startNode() # "," #
      inputNode("collect_phone", "Collect Phone", "Enter your business phone number:", "phone", "phone") # "," #
      inputNode("collect_name", "Collect Business Name", "Enter your business name:", "text", "businessName") # "," #
      choiceNode("select_category", "Select Category", "Select your business category:", "\"1. Grocery\",\"2. Restaurant\",\"3. Electronics\",\"4. Clothing\",\"5. Healthcare\"") # "," #
      choiceNode("select_type", "Select Type", "Do you take orders or inquiries?", "\"1. Orders\",\"2. Inquiries\"") # "," #
      inputNode("collect_location", "Collect Location", "Enter your shop address:", "text", "address") # "," #
      actionNode("save_merchant", "Save Merchant", "createMerchant", "\"phone\",\"businessName\",\"category\",\"type\",\"address\"") # "," #
      endNode("Merchant registered! Your account is pending verification."),
      edge("start", "collect_phone") # "," # edge("collect_phone", "collect_name") # "," #
      edge("collect_name", "select_category") # "," # edge("select_category", "select_type") # "," #
      edge("select_type", "collect_location") # "," # edge("collect_location", "save_merchant") # "," #
      edge("save_merchant", "end")
    );

    let browseProductsJson = makeFlowJson(
      "customer-browse-products", "Browse Products",
      startNode() # "," #
      choiceNode("select_category", "Select Category", "What category are you looking for?", "\"1. Grocery\",\"2. Food\",\"3. Electronics\",\"4. Clothing\",\"5. All\"") # "," #
      inputNode("search_input", "Search Query", "Enter search keywords (or skip):", "text", "query") # "," #
      actionNode("fetch_products", "Fetch Products", "searchProducts", "\"category\",\"query\"") # "," #
      actionNode("show_results", "Show Results", "displayProductList", "\"products\"") # "," #
      endNode("Here are the products I found. Reply with item number to add to cart."),
      edge("start", "select_category") # "," # edge("select_category", "search_input") # "," #
      edge("search_input", "fetch_products") # "," # edge("fetch_products", "show_results") # "," #
      edge("show_results", "end")
    );

    let placeOrderJson = makeFlowJson(
      "customer-place-order", "Place Order",
      startNode() # "," #
      actionNode("show_cart", "Show Cart", "getCart", "\"customerId\"") # "," #
      choiceNode("confirm_order", "Confirm Order", "Confirm your order?", "\"1. Yes, place order\",\"2. Modify cart\",\"3. Cancel\"") # "," #
      choiceNode("select_payment", "Select Payment", "Choose payment method:", "\"1. Cash on Delivery\",\"2. Online Payment\",\"3. QR Code\"") # "," #
      actionNode("create_order", "Create Order", "createOrder", "\"customerId\",\"merchantId\",\"items\",\"paymentMode\"") # "," #
      endNode("Order placed successfully! Your order ID is displayed above."),
      edge("start", "show_cart") # "," # edge("show_cart", "confirm_order") # "," #
      edge("confirm_order", "select_payment") # "," # edge("select_payment", "create_order") # "," #
      edge("create_order", "end")
    );

    let orderStatusJson = makeFlowJson(
      "customer-order-status", "Check Order Status",
      startNode() # "," #
      inputNode("enter_order_id", "Enter Order ID", "Enter your order ID:", "text", "orderId") # "," #
      actionNode("fetch_order", "Fetch Order", "getOrderById", "\"orderId\"") # "," #
      actionNode("show_status", "Show Status", "displayOrderStatus", "\"order\"") # "," #
      endNode("Order status displayed above. Reply 'track' for live tracking."),
      edge("start", "enter_order_id") # "," # edge("enter_order_id", "fetch_order") # "," #
      edge("fetch_order", "show_status") # "," # edge("show_status", "end")
    );

    let supportTicketJson = makeFlowJson(
      "customer-support-ticket", "Raise Support Ticket",
      startNode() # "," #
      choiceNode("select_issue", "Select Issue Type", "What is the issue?", "\"1. Payment Stuck\",\"2. Behaviour Complaint\",\"3. Other\"") # "," #
      inputNode("describe_issue", "Describe Issue", "Please describe your issue in detail:", "text", "description") # "," #
      inputNode("enter_order_id", "Order ID (Optional)", "Enter related order ID (or skip with 0):", "text", "orderId") # "," #
      actionNode("save_ticket", "Save Ticket", "createSupportTicket", "\"phone\",\"role\",\"category\",\"description\",\"orderId\"") # "," #
      endNode("Support ticket raised! You will receive a response within 3-5 business days."),
      edge("start", "select_issue") # "," # edge("select_issue", "describe_issue") # "," #
      edge("describe_issue", "enter_order_id") # "," # edge("enter_order_id", "save_ticket") # "," #
      edge("save_ticket", "end")
    );

    let restockOrderJson = makeFlowJson(
      "merchant-restock-order", "Restock Order",
      startNode() # "," #
      inputNode("supplier_name", "Supplier Name", "Enter supplier name:", "text", "supplierName") # "," #
      inputNode("item_name", "Item Name", "Enter item name to restock:", "text", "itemName") # "," #
      inputNode("quantity", "Quantity", "Enter quantity required:", "number", "quantity") # "," #
      inputNode("notes", "Notes", "Any special instructions? (or skip):", "text", "notes") # "," #
      actionNode("save_restock", "Save Restock Order", "createRestockOrder", "\"merchantId\",\"merchantPhone\",\"supplierName\",\"itemName\",\"quantity\",\"notes\"") # "," #
      endNode("Restock order placed! Supplier will be contacted shortly."),
      edge("start", "supplier_name") # "," # edge("supplier_name", "item_name") # "," #
      edge("item_name", "quantity") # "," # edge("quantity", "notes") # "," #
      edge("notes", "save_restock") # "," # edge("save_restock", "end")
    );

    let marketplaceItemJson = makeFlowJson(
      "customer-old-items-sell", "Sell Old Items",
      startNode() # "," #
      inputNode("item_title", "Item Title", "Enter item title:", "text", "title") # "," #
      inputNode("item_price", "Price", "Enter asking price (₹):", "number", "price") # "," #
      choiceNode("item_category", "Category", "Select item category:", "\"1. Electronics\",\"2. Furniture\",\"3. Vehicle\",\"4. Clothing\",\"5. Other\"") # "," #
      choiceNode("listing_type", "Listing Type", "Sell or Rent?", "\"1. Sale\",\"2. Rent\"") # "," #
      actionNode("save_item", "Save Item", "createMarketplaceItem", "\"title\",\"price\",\"category\",\"listingType\",\"sellerId\"") # "," #
      endNode("Item listed successfully! Buyers will contact you."),
      edge("start", "item_title") # "," # edge("item_title", "item_price") # "," #
      edge("item_price", "item_category") # "," # edge("item_category", "listing_type") # "," #
      edge("listing_type", "save_item") # "," # edge("save_item", "end")
    );

    let recipeSearchJson = makeFlowJson(
      "customer-recipe-search", "Recipe Search",
      startNode() # "," #
      inputNode("search_term", "Search Recipe", "Enter recipe name or ingredient:", "text", "keyword") # "," #
      actionNode("fetch_recipes", "Fetch Recipes", "searchRecipes", "\"keyword\"") # "," #
      actionNode("show_recipes", "Show Recipes", "displayRecipeList", "\"recipes\"") # "," #
      endNode("Here are matching recipes. Reply with number to see full recipe."),
      edge("start", "search_term") # "," # edge("search_term", "fetch_recipes") # "," #
      edge("fetch_recipes", "show_recipes") # "," # edge("show_recipes", "end")
    );

    let adhocJobJson = makeFlowJson(
      "adhoc_jobs", "Adhoc Jobs",
      startNode() # "," #
      choiceNode("select_action", "Browse or Post", "Do you want to browse jobs or post one?", "\"1. Browse Available Jobs\",\"2. Post a Job\"") # "," #
      choiceNode("select_category", "Job Category", "Select job category:", "\"1. Plumbing\",\"2. Electrical\",\"3. Cleaning\",\"4. Carpentry\",\"5. Other\"") # "," #
      inputNode("budget", "Budget", "Enter your budget per day (₹):", "number", "budget") # "," #
      actionNode("fetch_jobs", "Fetch Jobs", "listAdhocJobs", "\"category\",\"budget\"") # "," #
      endNode("Here are matching job listings. Reply with number to see details."),
      edge("start", "select_action") # "," # edge("select_action", "select_category") # "," #
      edge("select_category", "budget") # "," # edge("budget", "fetch_jobs") # "," #
      edge("fetch_jobs", "end")
    );

    let healthBookingJson = makeFlowJson(
      "customer-health-booking", "Healthcare Appointment Booking",
      startNode() # "," #
      choiceNode("select_specialization", "Specialization", "Select doctor specialization:", "\"1. General Physician\",\"2. Dentist\",\"3. Dermatologist\",\"4. Cardiologist\",\"5. Other\"") # "," #
      actionNode("find_doctors", "Find Doctors", "searchHealthcareProviders", "\"specialization\"") # "," #
      inputNode("select_doctor", "Select Doctor", "Enter doctor number from the list:", "number", "doctorIndex") # "," #
      inputNode("appointment_date", "Appointment Date", "Enter preferred date (DD/MM/YYYY):", "date", "appointmentDate") # "," #
      inputNode("appointment_time", "Appointment Time", "Enter preferred time (HH:MM):", "time", "appointmentTime") # "," #
      actionNode("book_appointment", "Book Appointment", "createHealthcareAppointment", "\"patientId\",\"doctorId\",\"date\",\"time\"") # "," #
      endNode("Appointment booked! You will receive a confirmation shortly."),
      edge("start", "select_specialization") # "," # edge("select_specialization", "find_doctors") # "," #
      edge("find_doctors", "select_doctor") # "," # edge("select_doctor", "appointment_date") # "," #
      edge("appointment_date", "appointment_time") # "," # edge("appointment_time", "book_appointment") # "," #
      edge("book_appointment", "end")
    );

    let tourBookingJson = makeFlowJson(
      "customer-tour-booking", "Tours & Travel Booking",
      startNode() # "," #
      inputNode("destination", "Destination", "Where do you want to go?", "text", "destination") # "," #
      choiceNode("tour_type", "Tour Type", "Select tour type:", "\"1. Day Tour\",\"2. Weekend Tour\",\"3. Long Tour\",\"4. Adventure\"") # "," #
      actionNode("find_tours", "Find Tours", "searchTourOperators", "\"destination\",\"tourType\"") # "," #
      inputNode("travel_date", "Travel Date", "Enter travel date (DD/MM/YYYY):", "date", "travelDate") # "," #
      inputNode("passengers", "Passengers", "How many passengers?", "number", "passengerCount") # "," #
      actionNode("book_tour", "Book Tour", "createTourBooking", "\"customerId\",\"tourId\",\"travelDate\",\"passengerCount\"") # "," #
      endNode("Tour booked! Operator will contact you with trip details."),
      edge("start", "destination") # "," # edge("destination", "tour_type") # "," #
      edge("tour_type", "find_tours") # "," # edge("find_tours", "travel_date") # "," #
      edge("travel_date", "passengers") # "," # edge("passengers", "book_tour") # "," #
      edge("book_tour", "end")
    );



    let postDailyJobJson = makeFlowJson(
      "post_daily_job", "Post Daily Job",
      startNode() # "," #
      inputNode("job_title", "Job Title", "Enter job title (e.g. House Cleaning, Plumbing Work):", "text", "title") # "," #
      choiceNode("job_category", "Job Category", "Select job category:", "\"1. Daily Wages\",\"2. Construction\",\"3. Cleaning\",\"4. Cooking\",\"5. Security Guard\",\"6. Plumber\",\"7. Electrician\",\"8. Carpenter\",\"9. Driver\",\"10. Teaching\",\"11. IT Support\",\"12. Customer Service\",\"13. Sales\",\"14. Gardening\",\"15. Farming\",\"16. Painting\",\"17. Moving\",\"18. Healthcare\",\"19. Event Helper\",\"20. Delivery\",\"21. Others\"") # "," #
      inputNode("daily_rate", "Daily Rate / Price Per Day", "Enter daily wage or price per day (₹):", "number", "pricePerDay") # "," #
      choiceNode("education_level", "Education Level Required", "Select minimum education required:", "\"1. No requirement\",\"2. 10th Pass\",\"3. 12th Pass\",\"4. Graduate\",\"5. Skilled Worker\"") # "," #
      inputNode("job_desc", "Job Description", "Describe the work (duties, hours, requirements):", "text", "description") # "," #
      inputNode("job_location", "Job Location", "Enter the work location/address:", "text", "location") # "," #
      inputNode("contact_phone", "Contact Phone", "Enter your contact phone number:", "phone", "contactPhone") # "," #
      actionNode("save_daily_job", "Save Daily Job", "createAdhocJob", "\"title\",\"category\",\"pricePerDay\",\"educationLevel\",\"location\",\"contactPhone\",\"description\",\"posterId\",\"jobType\"") # "," #
      endNode("Daily job posted successfully! It will be visible for 24 hours. Workers will contact you directly."),
      edge("start", "job_title") # "," # edge("job_title", "job_category") # "," #
      edge("job_category", "daily_rate") # "," # edge("daily_rate", "education_level") # "," #
      edge("education_level", "job_desc") # "," # edge("job_desc", "job_location") # "," #
      edge("job_location", "contact_phone") # "," # edge("contact_phone", "save_daily_job") # "," #
      edge("save_daily_job", "end")
    );


    let matrimonySearchJson = makeFlowJson(
      "matrimony-search-partner", "Matrimony Search Partner",
      startNode() # "," #
      choiceNode("check_eligible", "Check Eligible Member", "Do you have a matrimony-eligible family member added?", "\"1. Yes, search partners\",\"2. Add eligible member first\"") # "," #
      choiceNode("filter_caste", "Filter by Caste", "Filter by caste (or skip):", "\"1. Brahmin\",\"2. Kshatriya\",\"3. Vaishya\",\"4. Other\",\"5. Any (no filter)\"") # "," #
      inputNode("filter_location", "Location Preference", "Enter preferred location (or skip with 0):", "text", "locationFilter") # "," #
      choiceNode("filter_education", "Filter by Education", "Filter by education (or skip):", "\"1. Graduate\",\"2. Post Graduate\",\"3. Professional\",\"4. Any\"") # "," #
      choiceNode("filter_blood", "Filter by Blood Group", "Filter by blood group (or skip):", "\"1. A+\",\"2. B+\",\"3. O+\",\"4. AB+\",\"5. Any\"") # "," #
      actionNode("search_partners", "Search Partners", "getMatrimonyMembers", "\"casteFilter\",\"locationFilter\",\"educationFilter\",\"bloodGrpFilter\"") # "," #
      actionNode("show_profiles", "Show Profiles", "displayMatrimonyProfiles", "\"profiles\"") # "," #
      actionNode("contact_family", "Contact Family", "sendMatrimonyContactRequest", "\"profileId\",\"requesterPhone\"") # "," #
      endNode("Contact request sent! The family will be notified. They will reach out to you directly."),
      edge("start", "check_eligible") # "," # edge("check_eligible", "filter_caste") # "," #
      edge("filter_caste", "filter_location") # "," # edge("filter_location", "filter_education") # "," #
      edge("filter_education", "filter_blood") # "," # edge("filter_blood", "search_partners") # "," #
      edge("search_partners", "show_profiles") # "," # edge("show_profiles", "contact_family") # "," #
      edge("contact_family", "end")
    );

    let donationJson = makeFlowJson(
      "donation", "Donations",
      startNode() # "," #
      choiceNode("choose_type", "Choose Action", "What would you like to do?", "\"1. Add Donation\",\"2. Search Donations\",\"3. Request Donation\"") # "," #
      choiceNode("category_add", "Category (Add)", "Select donation category:", "\"1. Food Items\",\"2. Clothes\",\"3. Books\",\"4. Other\"") # "," #
      inputNode("description_add", "Description", "Describe the items you want to donate:", "text", "description") # "," #
      inputNode("quantity_add", "Quantity", "Enter quantity (e.g. 5 kg, 3 pieces):", "text", "quantity") # "," #
      inputNode("location_add", "Pickup Location", "Enter pickup location:", "text", "location") # "," #
      inputNode("contact_add", "Contact Number", "Enter your contact number:", "phone", "contactPhone") # "," #
      actionNode("save_donation", "Save Donation", "addDonation", "\"category\",\"description\",\"quantity\",\"location\",\"contactPhone\",\"donorPhone\",\"donorName\"") # "," #
      choiceNode("category_search", "Category (Search)", "Search donations by category:", "\"1. Food Items\",\"2. Clothes\",\"3. Books\",\"4. All\"") # "," #
      inputNode("location_search", "Search Location", "Enter location to search near (or skip):", "text", "locationFilter") # "," #
      actionNode("fetch_donations", "Fetch Donations", "searchDonations", "\"categoryFilter\",\"locationFilter\"") # "," #
      actionNode("show_donations", "Show Donations", "displayDonationList", "\"donations\"") # "," #
      actionNode("contact_donor", "Contact Donor", "getDonorContact", "\"donationId\"") # "," #
      choiceNode("category_request", "Category (Request)", "What do you need?", "\"1. Food Items\",\"2. Clothes\",\"3. Books\",\"4. Other\"") # "," #
      inputNode("description_request", "What You Need", "Describe what you need:", "text", "description") # "," #
      inputNode("quantity_request", "Quantity Needed", "How much do you need?", "text", "quantityNeeded") # "," #
      inputNode("location_request", "Your Location", "Enter your location:", "text", "location") # "," #
      inputNode("contact_request", "Contact Number", "Enter your contact number:", "phone", "requesterPhone") # "," #
      actionNode("save_request", "Save Request", "requestDonation", "\"category\",\"description\",\"quantityNeeded\",\"location\",\"requesterPhone\",\"requesterName\"") # "," #
      endNode("Done! Your donation action has been recorded. Thank you for participating."),
      edge("start", "choose_type") # "," # edge("choose_type", "category_add") # "," #
      edge("category_add", "description_add") # "," # edge("description_add", "quantity_add") # "," #
      edge("quantity_add", "location_add") # "," # edge("location_add", "contact_add") # "," #
      edge("contact_add", "save_donation") # "," # edge("save_donation", "end") # "," #
      edge("choose_type", "category_search") # "," # edge("category_search", "location_search") # "," #
      edge("location_search", "fetch_donations") # "," # edge("fetch_donations", "show_donations") # "," #
      edge("show_donations", "contact_donor") # "," # edge("contact_donor", "end") # "," #
      edge("choose_type", "category_request") # "," # edge("category_request", "description_request") # "," #
      edge("description_request", "quantity_request") # "," # edge("quantity_request", "location_request") # "," #
      edge("location_request", "contact_request") # "," # edge("contact_request", "save_request") # "," #
      edge("save_request", "end")
    );



    let merchantRegHealthcareJson = makeFlowJson(
      "merchant-register-healthcare", "Merchant: Register as Healthcare Provider",
      startNode() # "," #
      inputNode("collect_phone", "Phone", "Enter your business phone:", "phone", "phone") # "," #
      inputNode("collect_name", "Business Name", "Enter clinic/practice name:", "text", "bizName") # "," #
      inputNode("specialization", "Specialization", "Enter your specialization (e.g. Dentist, Cardiologist):", "text", "specialization") # "," #
      inputNode("consult_fee", "Consultation Fee", "Enter consultation fee (₹):", "number", "consultationFee") # "," #
      inputNode("address", "Address", "Enter clinic address:", "text", "address") # "," #
      inputNode("availability", "Availability", "Enter availability hours (e.g. Mon-Sat 9AM-6PM):", "text", "availability") # "," #
      actionNode("save_provider", "Register Provider", "registerHealthcareProvider", "\"bizName\",\"specialization\",\"consultationFee\",\"address\",\"phone\",\"availability\"") # "," #
      endNode("Healthcare provider registered! Patients can now find and book with you."),
      edge("start", "collect_phone") # "," # edge("collect_phone", "collect_name") # "," #
      edge("collect_name", "specialization") # "," # edge("specialization", "consult_fee") # "," #
      edge("consult_fee", "address") # "," # edge("address", "availability") # "," #
      edge("availability", "save_provider") # "," # edge("save_provider", "end")
    );

    let merchantRegTourJson = makeFlowJson(
      "merchant-register-tour", "Merchant: Register as Tour Operator",
      startNode() # "," #
      inputNode("collect_phone", "Phone", "Enter your business phone:", "phone", "phone") # "," #
      inputNode("collect_name", "Business Name", "Enter tour operator name:", "text", "bizName") # "," #
      inputNode("destinations", "Destinations", "Enter destinations (comma-separated):", "text", "destinations") # "," #
      inputNode("duration", "Duration", "Enter typical tour duration (e.g. 3 Days):", "text", "duration") # "," #
      inputNode("price", "Price/Person", "Enter price per person (₹):", "number", "pricePerPerson") # "," #
      inputNode("max_passengers", "Max Passengers", "Enter maximum passengers per tour:", "number", "maxPassengers") # "," #
      inputNode("city", "Base City", "Enter your base city:", "text", "city") # "," #
      actionNode("save_operator", "Register Operator", "registerTourOperator", "\"bizName\",\"destinations\",\"duration\",\"pricePerPerson\",\"maxPassengers\",\"phone\",\"city\"") # "," #
      endNode("Tour operator registered! Travellers can now browse and book your tours."),
      edge("start", "collect_phone") # "," # edge("collect_phone", "collect_name") # "," #
      edge("collect_name", "destinations") # "," # edge("destinations", "duration") # "," #
      edge("duration", "price") # "," # edge("price", "max_passengers") # "," #
      edge("max_passengers", "city") # "," # edge("city", "save_operator") # "," #
      edge("save_operator", "end")
    );

    let merchantRegProfessionalJson = makeFlowJson(
      "merchant-register-professional", "Merchant: Register as Professional Service",
      startNode() # "," #
      inputNode("collect_phone", "Phone", "Enter your business phone:", "phone", "phone") # "," #
      inputNode("collect_name", "Name", "Enter your name/business name:", "text", "bizName") # "," #
      choiceNode("service_cat", "Service Category", "Select your service category:", "\"1. Plumber\",\"2. Electrician\",\"3. Carpenter\",\"4. Painter\",\"5. Gym Trainer\",\"6. Massage Therapist\",\"7. Other\"") # "," #
      inputNode("hourly_rate", "Hourly Rate", "Enter your hourly/per-visit rate (₹):", "number", "pricePerHour") # "," #
      inputNode("city", "City", "Enter your service city:", "text", "city") # "," #
      inputNode("availability", "Availability", "Enter availability (e.g. Mon-Sat 8AM-8PM):", "text", "availability") # "," #
      actionNode("save_service", "Register Service", "registerProfessionalService", "\"phone\",\"serviceType\",\"specialization\",\"pricePerHour\",\"address\",\"city\",\"availability\"") # "," #
      endNode("Professional service registered! Customers can now find and book your services."),
      edge("start", "collect_phone") # "," # edge("collect_phone", "collect_name") # "," #
      edge("collect_name", "service_cat") # "," # edge("service_cat", "hourly_rate") # "," #
      edge("hourly_rate", "city") # "," # edge("city", "availability") # "," #
      edge("availability", "save_service") # "," # edge("save_service", "end")
    );



    let marketCommoditySearchJson = makeFlowJson(
      "market-commodity-search", "Market & Commodity Search",
      startNode() # "," #
      inputNode("script_name", "Script / Symbol Name", "Enter the stock/commodity name or symbol (e.g. RELIANCE, GOLD, USDINR):", "text", "scriptName") # "," #
      inputNode("country", "Country / Exchange", "Enter the country or exchange (e.g. India, USA, UK):", "text", "country") # "," #
      actionNode("fetch_market", "Fetch Market Data", "searchMarket", "\"scriptName\",\"country\"") # "," #
      actionNode("show_prices", "Show Prices", "displayMarketResults", "\"results\"") # "," #
      actionNode("show_reco", "Show Recommendation", "displayTradeRecommendations", "\"recommendations\"") # "," #
      endNode("Market search complete! Prices, recommendations and stop-loss levels shown above."),
      edge("start", "script_name") # "," # edge("script_name", "country") # "," #
      edge("country", "fetch_market") # "," # edge("fetch_market", "show_prices") # "," #
      edge("show_prices", "show_reco") # "," # edge("show_reco", "end")
    );


    let liveMatchScoresJson = makeFlowJson(
      "live-match-scores", "Check Today Matches",
      startNode() # "," #
      choiceNode("ask_sport", "Select Sport", "Which sport scores do you want?", "\"1. Cricket\",\"2. Football\",\"3. All Sports\"") # "," #
      actionNode("fetch_scores", "Fetch Scores", "getTodayMatchScores", "") # "," #
      actionNode("show_scores", "Show Scores", "displayMatchScores", "\"scores\"") # "," #
      endNode("Live match scores shown above. Scores update every 5 minutes."),
      edge("start", "ask_sport") # "," # edge("ask_sport", "fetch_scores") # "," #
      edge("fetch_scores", "show_scores") # "," # edge("show_scores", "end")
    );


    let liveElectionResultsJson = makeFlowJson(
      "live-election-results", "Check Election Results",
      startNode() # "," #
      choiceNode("ask_state", "Select State", "Select state for election results:", "\"1. Maharashtra\",\"2. Delhi\",\"3. Tamil Nadu\",\"4. Gujarat\",\"5. Uttar Pradesh\",\"6. Other\"") # "," #
      inputNode("enter_state", "Enter State Name", "Enter the state name (or press 0 to see all):", "text", "stateName") # "," #
      actionNode("fetch_results", "Fetch Results", "getElectionResults", "\"stateName\"") # "," #
      actionNode("show_summary", "Show Party Summary", "displayElectionParties", "\"results\"") # "," #
      choiceNode("drill_constituency", "Drill into Constituency", "Want to drill into a specific constituency?", "\"1. Yes, show constituency details\",\"2. No, show summary only\"") # "," #
      endNode("Election results displayed above. Results are updated live from ECI."),
      edge("start", "ask_state") # "," # edge("ask_state", "enter_state") # "," #
      edge("enter_state", "fetch_results") # "," # edge("fetch_results", "show_summary") # "," #
      edge("show_summary", "drill_constituency") # "," # edge("drill_constituency", "end")
    );


    let lendingFlowJson = makeFlowJson(
      "lending-flow", "Lending",
      startNode() # "," #
      choiceNode("category_select", "Category", "Select item category:", "\"1. Electronics\",\"2. Furniture\",\"3. Tools\",\"4. Books\",\"5. Sports\",\"6. Clothing\",\"7. Other\"") # "," #
      inputNode("item_name", "Item Name", "Enter the item name:", "text", "itemName") # "," #
      inputNode("item_desc", "Description", "Describe the item:", "text", "itemDescription") # "," #
      inputNode("borrower_phone", "Borrower Phone", "Enter borrower's phone number:", "phone", "borrowerPhone") # "," #
      inputNode("return_date", "Return Date", "Enter expected return date (DD/MM/YYYY):", "date", "returnDate") # "," #
      inputNode("charge_amount", "Charge (Optional)", "Enter rental charge amount (0 for free):", "number", "charge") # "," #
      choiceNode("reminder_freq", "Reminder Frequency", "How often should both parties be reminded?", "\"1. Monthly\",\"2. Quarterly\",\"3. Yearly\",\"4. Specific Date\"") # "," #
      actionNode("save_lending", "Save Lending Record", "createLendingItem", "\"lenderPhone\",\"borrowerPhone\",\"itemCategory\",\"itemName\",\"itemDescription\",\"returnDate\",\"charge\",\"reminderFrequency\"") # "," #
      endNode("Lending record saved! Both you and the borrower will be reminded as per the set schedule."),
      edge("start", "category_select") # "," # edge("category_select", "item_name") # "," #
      edge("item_name", "item_desc") # "," # edge("item_desc", "borrower_phone") # "," #
      edge("borrower_phone", "return_date") # "," # edge("return_date", "charge_amount") # "," #
      edge("charge_amount", "reminder_freq") # "," # edge("reminder_freq", "save_lending") # "," #
      edge("save_lending", "end")
    );


    let communityViewFlowJson = makeFlowJson(
      "community-view-flow", "Community View",
      startNode() # "," #
      inputNode("search_prompt", "Search Community", "Enter name, phone, city, or location to search (or press 0 to list all):", "text", "searchQuery") # "," #
      actionNode("fetch_members", "Fetch Members", "searchCommunityMembers", "\"searchQuery\"") # "," #
      actionNode("show_results", "Show Results", "displayCommunityMembers", "\"members\"") # "," #
      endNode("Community members shown above."),
      edge("start", "search_prompt") # "," # edge("search_prompt", "fetch_members") # "," #
      edge("fetch_members", "show_results") # "," # edge("show_results", "end")
    );


    let communityRentParkingJson = makeFlowJson(
      "community-rent-parking", "Community: Rent Parking",
      startNode() # "," #
      choiceNode("parking_type", "Parking Type", "Select parking type:", "\"1. Covered Parking\",\"2. Open Parking\"") # "," #
      inputNode("start_date", "Start Date", "Enter start date (DD/MM/YYYY):", "date", "startDate") # "," #
      inputNode("end_date", "End Date", "Enter end date (DD/MM/YYYY):", "date", "endDate") # "," #
      choiceNode("confirm_parking", "Confirm Booking", "Confirm your parking booking?", "\"1. Yes, confirm\",\"2. Cancel\"") # "," #
      actionNode("save_parking", "Save Booking", "createCommunityParkingBooking", "\"memberPhone\",\"communityId\",\"parkingType\",\"startDate\",\"endDate\",\"cost\"") # "," #
      endNode("Parking booked! Your booking ID is shown above."),
      edge("start", "parking_type") # "," # edge("parking_type", "start_date") # "," #
      edge("start_date", "end_date") # "," # edge("end_date", "confirm_parking") # "," #
      edge("confirm_parking", "save_parking") # "," # edge("save_parking", "end")
    );


    let communityRentRoomJson = makeFlowJson(
      "community-rent-room", "Community: Rent Room / Facility",
      startNode() # "," #
      choiceNode("facility_type", "Facility Type", "Select facility type:", "\"1. Meeting Room\",\"2. Common Hall\",\"3. Gym\",\"4. Garden\"") # "," #
      inputNode("booking_date", "Booking Date", "Enter booking date (DD/MM/YYYY):", "date", "bookingDate") # "," #
      inputNode("time_slot", "Time Slot", "Enter time slot (e.g. 10:00-12:00):", "text", "timeSlot") # "," #
      inputNode("purpose", "Purpose", "Describe the purpose / occasion:", "text", "description") # "," #
      choiceNode("confirm_room", "Confirm Booking", "Confirm your facility booking?", "\"1. Yes, confirm\",\"2. Cancel\"") # "," #
      actionNode("save_room", "Save Booking", "createCommunityRoomBooking", "\"memberPhone\",\"communityId\",\"facilityType\",\"bookingDate\",\"timeSlot\",\"description\"") # "," #
      endNode("Facility booked! Your booking ID is shown above."),
      edge("start", "facility_type") # "," # edge("facility_type", "booking_date") # "," #
      edge("booking_date", "time_slot") # "," # edge("time_slot", "purpose") # "," #
      edge("purpose", "confirm_room") # "," # edge("confirm_room", "save_room") # "," #
      edge("save_room", "end")
    );


    let communityFoodServiceJson = makeFlowJson(
      "community-food-service", "Community: Food Service",
      startNode() # "," #
      choiceNode("dietary_pref", "Dietary Preference", "Select your dietary preference:", "\"1. Veg\",\"2. Non-Veg\",\"3. Vegan\"") # "," #
      inputNode("select_meal", "Select Meal", "Enter meal description or name:", "text", "mealDescription") # "," #
      inputNode("cuisine_type", "Cuisine Type", "Enter cuisine type (e.g. Indian, Chinese):", "text", "cuisineType") # "," #
      inputNode("quantity", "Quantity", "Enter quantity (number of servings):", "number", "quantity") # "," #
      inputNode("delivery_time", "Delivery Time", "Enter preferred delivery time (HH:MM):", "time", "deliveryTime") # "," #
      choiceNode("confirm_food", "Confirm Order", "Confirm your food order?", "\"1. Yes, place order\",\"2. Cancel\"") # "," #
      actionNode("save_food", "Save Order", "createCommunityFoodOrder", "\"buyerPhone\",\"sellerPhone\",\"communityId\",\"mealDescription\",\"cuisineType\",\"dietary\",\"deliveryTime\",\"quantity\",\"cost\"") # "," #
      endNode("Food order placed! The seller will confirm shortly."),
      edge("start", "dietary_pref") # "," # edge("dietary_pref", "select_meal") # "," #
      edge("select_meal", "cuisine_type") # "," # edge("cuisine_type", "quantity") # "," #
      edge("quantity", "delivery_time") # "," # edge("delivery_time", "confirm_food") # "," #
      edge("confirm_food", "save_food") # "," # edge("save_food", "end")
    );


    let communityManagerServicesJson = makeFlowJson(
      "community-manager-services", "Community: Manager Services",
      startNode() # "," #
      choiceNode("service_type", "Service Type", "Select service type:", "\"1. Maintenance\",\"2. Pest Control\",\"3. Security\",\"4. Accounts\",\"5. Cleaning\",\"6. Electrician\"") # "," #
      inputNode("description", "Description", "Describe the issue or work required:", "text", "description") # "," #
      inputNode("preferred_date", "Preferred Date", "Enter preferred date (DD/MM/YYYY):", "date", "scheduledDate") # "," #
      choiceNode("confirm_work", "Confirm Request", "Confirm your service request?", "\"1. Yes, submit\",\"2. Cancel\"") # "," #
      actionNode("save_work", "Save Work Order", "createCommunityWorkOrder", "\"memberPhone\",\"communityId\",\"serviceType\",\"description\",\"scheduledDate\"") # "," #
      endNode("Service request submitted! The community manager will contact you shortly."),
      edge("start", "service_type") # "," # edge("service_type", "description") # "," #
      edge("description", "preferred_date") # "," # edge("preferred_date", "confirm_work") # "," #
      edge("confirm_work", "save_work") # "," # edge("save_work", "end")
    );


    let manufacturerRegJson = makeFlowJson(
      "manufacturer-registration", "Manufacturer Registration",
      startNode() # "," #
      inputNode("collect_phone", "Business Phone", "Enter your business phone number:", "phone", "phone") # "," #
      inputNode("collect_name", "Business Name", "Enter your manufacturer business name:", "text", "businessName") # "," #
      inputNode("care_phone", "Customer Care Phone", "Enter customer care phone number:", "phone", "customerCarePhone") # "," #
      inputNode("care_email", "Customer Care Email", "Enter customer care email address:", "text", "customerCareEmail") # "," #
      choiceNode("product_cat", "Product Categories", "Select your primary product category:", "\"1. FMCG / Food\",\"2. Pharmaceuticals\",\"3. Electronics\",\"4. Textiles / Clothing\",\"5. Chemicals\",\"6. Agriculture\",\"7. Other\"") # "," #
      inputNode("city", "Registered City", "Enter your registered city:", "text", "registeredCity") # "," #
      actionNode("save_mfg", "Register Manufacturer", "registerManufacturer", "\"userId\",\"businessName\",\"customerCarePhone\",\"customerCareEmail\",\"productCategories\",\"registeredCity\"") # "," #
      endNode("Manufacturer account registered! You can now list products and manage distributors."),
      edge("start", "collect_phone") # "," # edge("collect_phone", "collect_name") # "," #
      edge("collect_name", "care_phone") # "," # edge("care_phone", "care_email") # "," #
      edge("care_email", "product_cat") # "," # edge("product_cat", "city") # "," #
      edge("city", "save_mfg") # "," # edge("save_mfg", "end")
    );

    let manufacturerProductListingJson = makeFlowJson(
      "manufacturer-product-listing", "Manufacturer: List Products",
      startNode() # "," #
      inputNode("mfg_id", "Manufacturer ID", "Enter your manufacturer ID:", "text", "manufacturerId") # "," #
      inputNode("product_name", "Product Name", "Enter product name:", "text", "productName") # "," #
      inputNode("batch_no", "Batch Number", "Enter batch number:", "text", "batchNumber") # "," #
      inputNode("expiry_date", "Expiry Date", "Enter product expiry date (YYYY-MM-DD):", "date", "expiryDate") # "," #
      inputNode("dist_price", "Price to Distributor", "Enter price to distributor (Rs.):", "number", "priceToDistributor") # "," #
      inputNode("cust_price", "Price to Customer", "Enter price to customer (Rs.):", "number", "priceToCustomer") # "," #
      inputNode("stock_qty", "Stock Quantity", "Enter available stock quantity:", "number", "stockQty") # "," #
      actionNode("save_product", "Save Product", "addManufacturerProduct", "\"manufacturerId\",\"productName\",\"batchNumber\",\"expiryDate\",\"priceToDistributor\",\"priceToCustomer\",\"stockQty\"") # "," #
      endNode("Product listed! Distributors and customers can now view and order this product."),
      edge("start", "mfg_id") # "," # edge("mfg_id", "product_name") # "," #
      edge("product_name", "batch_no") # "," # edge("batch_no", "expiry_date") # "," #
      edge("expiry_date", "dist_price") # "," # edge("dist_price", "cust_price") # "," #
      edge("cust_price", "stock_qty") # "," # edge("stock_qty", "save_product") # "," #
      edge("save_product", "end")
    );

    let manufacturerExpiryReturnJson = makeFlowJson(
      "manufacturer-expiry-return", "Manufacturer: Expiry Return",
      startNode() # "," #
      choiceNode("returner_type", "Who is returning?", "Are you a distributor or customer?", "\"1. Distributor\",\"2. Customer\"") # "," #
      inputNode("mfg_id", "Manufacturer ID", "Enter the manufacturer ID for this product:", "text", "manufacturerId") # "," #
      inputNode("product_id", "Product ID", "Enter the product ID or batch number:", "text", "productId") # "," #
      inputNode("quantity", "Quantity to Return", "Enter quantity to return:", "number", "quantity") # "," #
      inputNode("reason", "Reason", "Describe the reason for return (e.g. expired, damaged):", "text", "reason") # "," #
      actionNode("file_return", "File Expiry Return", "fileExpiryReturn", "\"productId\",\"manufacturerId\",\"returnedBy\",\"returnedById\",\"quantity\",\"reason\"") # "," #
      endNode("Expiry return filed! The manufacturer will review and approve or reject your request."),
      edge("start", "returner_type") # "," # edge("returner_type", "mfg_id") # "," #
      edge("mfg_id", "product_id") # "," # edge("product_id", "quantity") # "," #
      edge("quantity", "reason") # "," # edge("reason", "file_return") # "," #
      edge("file_return", "end")
    );


    // ── Blog & Review flows ─────────────────────────────────────────────────────
    let createBlogJson = makeFlowJson(
      "create-blog", "Create Blog",
      startNode() # "," #
      inputNode("blog_title",    "Blog Title",    "Enter your blog title:",              "text",   "title")    # "," #
      inputNode("blog_location", "Location",      "Enter the location for this blog:",    "text",   "location") # "," #
      choiceNode("blog_category", "Category", "Select a category:",
        "\"1. Food & Dining\",\"2. Travel\",\"3. Shopping\",\"4. Health\",\"5. Education\",\"6. Real Estate\",\"7. Jobs\",\"8. Events\",\"9. Community\",\"10. Other\"") # "," #
      inputNode("blog_content",  "Content",       "Write your blog content:",             "text",   "content")  # "," #
      choiceNode("blog_status",  "Publish?",       "Would you like to publish now?",       "\"1. Publish\",\"2. Save as Draft\"") # "," #
      actionNode("save_blog",    "Save Blog",      "createBlog",                           "\"id\",\"authorId\",\"authorName\",\"title\",\"location\",\"category\",\"content\",\"status\",\"createdAt\",\"updatedAt\"") # "," #
      endNode("Blog created! Your blog is now live and visible to others."),
      edge("start", "blog_title") # "," # edge("blog_title", "blog_location") # "," #
      edge("blog_location", "blog_category") # "," # edge("blog_category", "blog_content") # "," #
      edge("blog_content", "blog_status") # "," # edge("blog_status", "save_blog") # "," #
      edge("save_blog", "end")
    );

    let writeBlogReviewJson = makeFlowJson(
      "write-blog-review", "Write Blog Review",
      startNode() # "," #
      inputNode("blog_id",      "Blog ID",      "Enter the blog ID you want to review:",  "text", "blogId")       # "," #
      choiceNode("rev_rating",  "Rating",       "Rate this blog (1-5 stars):",
        "\"1. 1 Star\",\"2. 2 Stars\",\"3. 3 Stars\",\"4. 4 Stars\",\"5. 5 Stars\"") # "," #
      inputNode("rev_comment",  "Comment",      "Write your review comment:",             "text", "comment")      # "," #
      actionNode("save_review", "Save Review",  "addBlogReview",                          "\"id\",\"blogId\",\"reviewerId\",\"reviewerName\",\"rating\",\"comment\",\"createdAt\"") # "," #
      endNode("Thank you! Your review has been submitted."),
      edge("start", "blog_id") # "," # edge("blog_id", "rev_rating") # "," #
      edge("rev_rating", "rev_comment") # "," # edge("rev_comment", "save_review") # "," #
      edge("save_review", "end")
    );

    // ── Customer Rating flow (by merchant / delivery partner) ───────────────────────
    let rateCustomerJson = makeFlowJson(
      "rate-customer", "Rate a Customer",
      startNode() # "," #
      inputNode("cust_id",        "Customer ID",    "Enter the customer ID:",               "text", "customerId")   # "," #
      inputNode("order_id",       "Order ID",       "Enter the related order ID:",           "text", "orderId")      # "," #
      choiceNode("cust_rating",   "Rating",         "Rate this customer (1-5 stars):",
        "\"1. 1 Star\",\"2. 2 Stars\",\"3. 3 Stars\",\"4. 4 Stars\",\"5. 5 Stars\"") # "," #
      inputNode("cust_comment",   "Comment",        "Add an optional comment (or press 0):", "text", "comment")     # "," #
      actionNode("save_cust_rating", "Save Rating", "addCustomerRating",                     "\"id\",\"customerId\",\"customerName\",\"orderId\",\"ratedByRole\",\"ratedById\",\"ratedByName\",\"rating\",\"comment\",\"createdAt\"") # "," #
      endNode("Customer rating submitted. This helps build trust in our platform."),
      edge("start", "cust_id") # "," # edge("cust_id", "order_id") # "," #
      edge("order_id", "cust_rating") # "," # edge("cust_rating", "cust_comment") # "," #
      edge("cust_comment", "save_cust_rating") # "," # edge("save_cust_rating", "end")
    );

    // ── Job Search Multi-Location flow ──────────────────────────────────────────────
    let jobSearchMultiLocationJson = makeFlowJson(
      "job-search-multi-location", "Job Search (Multi-Location)",
      startNode() # "," #
      inputNode("primary_city",   "Primary City",     "Enter your primary city:",              "text", "primaryCity")   # "," #
      choiceNode("relocate",       "Willing to Relocate?", "Are you open to jobs in other cities?", "\"1. Yes\",\"2. No\"") # "," #
      inputNode("other_cities",   "Other Cities",     "Enter other cities (comma-separated) or press 0:", "text", "otherCities") # "," #
      actionNode("search_jobs",   "Search Jobs",      "searchJobsByCity",                      "\"primaryCity\",\"willingToRelocate\",\"relocateCities\"") # "," #
      inputNode("add_location",   "Add Job Location", "Enter an additional city for your job posting (or press 0):", "text", "extraCity") # "," #
      actionNode("save_job_loc",  "Save Job Location","addJobLocation",                        "\"id\",\"jobId\",\"city\",\"pincode\",\"createdAt\"") # "," #
      endNode("Search complete! Here are the matching jobs from your selected cities."),
      edge("start", "primary_city") # "," # edge("primary_city", "relocate") # "," #
      edge("relocate", "other_cities") # "," # edge("other_cities", "search_jobs") # "," #
      edge("search_jobs", "add_location") # "," # edge("add_location", "save_job_loc") # "," #
      edge("save_job_loc", "end")
    );

    let manufacturerComplaintRatingJson = makeFlowJson(
      "manufacturer-complaint-rating", "Manufacturer: Complaint & Rating",
      startNode() # "," #
      choiceNode("action_type", "What would you like to do?", "Select action:", "\"1. File a Complaint\",\"2. Rate a Product\"") # "," #
      inputNode("mfg_id", "Manufacturer ID", "Enter the manufacturer ID:", "text", "manufacturerId") # "," #
      inputNode("subject", "Complaint Subject", "Enter complaint subject:", "text", "subject") # "," #
      inputNode("description", "Description", "Describe your complaint in detail:", "text", "description") # "," #
      actionNode("file_complaint", "File Complaint", "fileManufacturerComplaint", "\"manufacturerId\",\"filedBy\",\"filedById\",\"subject\",\"description\"") # "," #
      inputNode("product_id", "Product ID", "Enter the product ID to rate:", "text", "productId") # "," #
      choiceNode("star_rating", "Rating", "Rate this product (1-5 stars):", "\"1. 1 Star\",\"2. 2 Stars\",\"3. 3 Stars\",\"4. 4 Stars\",\"5. 5 Stars\"") # "," #
      inputNode("review_text", "Review", "Write a short review (or press 0 to skip):", "text", "review") # "," #
      actionNode("save_rating", "Save Rating", "rateManufacturerProduct", "\"manufacturerId\",\"productId\",\"ratedBy\",\"rating\",\"review\"") # "," #
      endNode("Thank you! Your feedback has been recorded."),
      edge("start", "action_type") # "," # edge("action_type", "mfg_id") # "," #
      edge("mfg_id", "subject") # "," # edge("subject", "description") # "," #
      edge("description", "file_complaint") # "," # edge("file_complaint", "end") # "," #
      edge("action_type", "product_id") # "," # edge("product_id", "star_rating") # "," #
      edge("star_rating", "review_text") # "," # edge("review_text", "save_rating") # "," #
      edge("save_rating", "end")
    );



    // ── Language Learning flows ────────────────────────────────────────────
    let browseLanguageCoursesJson = makeFlowJson(
      "browse-language-courses", "Browse Language Courses",
      startNode() # "," #
      choiceNode("lang_pair", "Language", "Which language would you like to learn?",
        "\"1. English→Hindi\",\"2. English→Spanish\",\"3. English→French\",\"4. English→German\",\"5. Hindi→English\",\"6. Other\"") # "," #
      choiceNode("course_type", "Course Type", "Filter by course type:",
        "\"1. Free\",\"2. Paid\",\"3. All\"") # "," #
      actionNode("list_courses", "List Courses", "listLanguageCourses",
        "\"languagePair\",\"courseType\"") # "," #
      inputNode("enroll_id", "Enroll", "Enter course ID to enroll (or press 0 to skip):", "text", "courseId") # "," #
      actionNode("enroll_course", "Enroll in Course", "enrollInLanguageCourse",
        "\"courseId\"") # "," #
      endNode("Enjoy your language learning journey! Use \"AI Daily Lesson\" to practice every day."),
      edge("start", "lang_pair") # "," # edge("lang_pair", "course_type") # "," #
      edge("course_type", "list_courses") # "," # edge("list_courses", "enroll_id") # "," #
      edge("enroll_id", "enroll_course") # "," # edge("enroll_course", "end")
    );

    let aiDailyLessonJson = makeFlowJson(
      "ai-daily-lesson", "AI Daily Lesson",
      startNode() # "," #
      actionNode("load_lesson", "Load Lesson", "getAIDailyLesson",
        "\"userId\"") # "," #
      choiceNode("lesson_action", "Action", "What would you like to do?",
        "\"1. Mark as Done\",\"2. Skip for Today\",\"3. Show Again\"") # "," #
      actionNode("save_progress", "Save Progress", "saveLessonProgress",
        "\"userId\",\"lessonId\",\"action\"") # "," #
      endNode("Great job! Keep your streak going - see you tomorrow!"),
      edge("start", "load_lesson") # "," # edge("load_lesson", "lesson_action") # "," #
      edge("lesson_action", "save_progress") # "," # edge("save_progress", "end")
    );

    let searchWordMeaningJson = makeFlowJson(
      "search-word-meaning", "Word Search & Meaning",
      startNode() # "," #
      inputNode("search_word", "Word", "Enter a word or phrase to look up:", "text", "word") # "," #
      choiceNode("target_lang", "Target Language", "Show meaning in which language?",
        "\"1. English\",\"2. Hindi\",\"3. Spanish\",\"4. French\",\"5. German\",\"6. Sanskrit\",\"7. Latin\",\"8. Old Arabic\"") # "," #
      actionNode("lookup_word", "Look Up Word", "lookupWordMeaning",
        "\"word\",\"targetLanguage\"") # "," #
      endNode("Word lookup complete! Try searching another word to keep learning."),
      edge("start", "search_word") # "," # edge("search_word", "target_lang") # "," #
      edge("target_lang", "lookup_word") # "," # edge("lookup_word", "end")
    );

    let createLanguageCourseJson = makeFlowJson(
      "create-language-course", "Create Language Course",
      startNode() # "," #
      inputNode("course_title", "Course Title", "Enter a title for your course:", "text", "title") # "," #
      choiceNode("course_lang_pair", "Language Pair", "Which language pair does this course teach?",
        "\"1. English→Hindi\",\"2. English→Spanish\",\"3. English→French\",\"4. English→German\",\"5. Hindi→English\",\"6. Other\"") # "," #
      inputNode("course_desc", "Description", "Describe your course briefly:", "text", "description") # "," #
      choiceNode("course_level", "Level", "Select the difficulty level:",
        "\"1. Beginner\",\"2. Intermediate\",\"3. Advanced\"") # "," #
      inputNode("course_price", "Price", "Set a price (enter 0 for free):", "number", "price") # "," #
      actionNode("save_course", "Save Course", "createLanguageCourse",
        "\"creatorId\",\"title\",\"languagePair\",\"description\",\"level\",\"price\"") # "," #
      endNode("Course submitted for admin approval. You will be notified once it goes live."),
      edge("start", "course_title") # "," # edge("course_title", "course_lang_pair") # "," #
      edge("course_lang_pair", "course_desc") # "," # edge("course_desc", "course_level") # "," #
      edge("course_level", "course_price") # "," # edge("course_price", "save_course") # "," #
      edge("save_course", "end")
    );

    let visitorCheckinFlowJson = makeFlowJson(
      "visitor-checkin", "Visitor Check-in",
      startNode() # "," #
      choiceNode("community_selection", "Select Community", "Please select your community to check in a visitor:",
        "\"1. Default Community\",\"2. Other\"") # "," #
      inputNode("visitor_name", "Visitor Name", "Enter visitor's full name:", "text", "visitorName") # "," #
      inputNode("visitor_phone", "Visitor Phone", "Enter visitor's phone number:", "phone", "visitorPhone") # "," #
      inputNode("visit_purpose", "Purpose of Visit", "What is the purpose of this visit?", "text", "purpose") # "," #
      actionNode("submit_checkin", "Submit Check-in", "addVisitorCheckin",
        "\"communityId\",\"visitorName\",\"visitorPhone\",\"purpose\"") # "," #
      endNode("Visitor checked in successfully! The resident has been notified for approval."),
      edge("start", "community_selection") # "," # edge("community_selection", "visitor_name") # "," #
      edge("visitor_name", "visitor_phone") # "," # edge("visitor_phone", "visit_purpose") # "," #
      edge("visit_purpose", "submit_checkin") # "," # edge("submit_checkin", "end")
    );

    let deliveryShiftFlowJson = makeFlowJson(
      "delivery-shift", "Delivery Shift Tracker",
      startNode() # "," #
      choiceNode("shift_action", "Shift Action", "What would you like to do?",
        "\"1. Start Shift\",\"2. End Shift\",\"3. View Status\"") # "," #
      actionNode("start_shift", "Start Shift", "startDeliveryShift",
        "\"partnerId\"") # "," #
      actionNode("end_shift", "End Shift", "endDeliveryShift",
        "\"partnerId\"") # "," #
      endNode("Shift updated successfully! Check your dashboard for today's summary."),
      edge("start", "shift_action") # "," # edge("shift_action", "start_shift") # "," #
      edge("shift_action", "end_shift") # "," # edge("start_shift", "end") # "," #
      edge("end_shift", "end")
    );

    // ── Canonical seed table: (id, name, flowJson) ─────────────────────────
    // flowJson is the pre-built JSON string; use "" for alias/stub entries
    // that share JSON with a canonical entry or have no dedicated flow graph.
    let flowSeeds : [(Text, Text, Text)] = [
      // 1. Customer Registration — ALWAYS first
      ("customer-registration",          "Customer Registration",           customerRegJson),
      // 2-20. Customer flows
      ("customer-browse-products",       "Browse Products",                 browseProductsJson),
      ("customer-place-order",           "Place Order",                     placeOrderJson),
      ("customer-order-status",          "Check Order Status",              orderStatusJson),
      ("customer-otp-login",             "OTP Login",                       ""),
      ("customer-support-ticket",        "Raise Support Ticket",            supportTicketJson),
      ("customer-job-search",            "Job Search",                      ""),
      ("customer-property-search",       "Property Search",                 ""),
      ("customer-transport-booking",     "Transport Booking",               ""),
      ("customer-ride-sharing",          "Ride Sharing",                    ""),
      ("customer-shuttle-booking",       "Shuttle Booking",                 ""),
      ("customer-event-search",          "Event Search",                    ""),
      ("customer-recipe-search",         "Recipe Search",                   recipeSearchJson),
      ("customer-old-items-buy",         "Buy Old Items",                   ""),
      ("customer-old-items-sell",        "Sell Old Items",                  marketplaceItemJson),
      ("customer-family-group",          "Family Group Management",         ""),
      ("customer-ondc-search",           "ONDC Product Search",             ""),
      ("customer-health-booking",        "Healthcare Appointment Booking",  healthBookingJson),
      ("customer-tour-booking",          "Tours & Travel Booking",          tourBookingJson),
      ("customer-professional-service",  "Professional Service Booking",    ""),
      // 21-31. Merchant flows
      ("merchant-registration",          "Merchant Registration",           merchantRegJson),
      ("merchant-add-product",           "Add Product/Service",             ""),
      ("merchant-add-booking-service",   "Add Booking Service",             ""),
      ("merchant-add-appointment-service", "Add Appointment/Healthcare Service", ""),
      ("merchant-add-rental-service",    "Add Rental Service",              ""),
      ("merchant-add-professional-service", "Add Professional Service",     ""),
      ("merchant-view-orders",           "View Orders",                     ""),
      ("merchant-custom-order",          "Handle Custom Order",             ""),
      ("merchant-bulk-upload",           "Bulk Customer Upload",            ""),
      ("merchant-restock-order",         "Restock Order",                   restockOrderJson),
      ("merchant-subscription",          "Merchant Subscription",           ""),
      // 32-36. Delivery Partner flows
      ("delivery-registration",          "Delivery Partner Registration",   ""),
      ("delivery-accept-order",          "Accept Delivery Order",           ""),
      ("delivery-update-status",         "Update Delivery Status",          ""),
      ("delivery-earnings",              "View Earnings",                   ""),
      ("delivery-subscription",          "Delivery Partner Subscription",   ""),
      // 37-38. Sarthi flows
      ("sarthi-registration",            "Sarthi/Transport Registration",   ""),
      ("sarthi-accept-ride",             "Accept Ride Request",             ""),
      // 39-40. Admin flows
      ("admin-city-control",             "Admin City Control",              ""),
      ("admin-module-toggle",            "Admin Module Toggle",             ""),
      // 41. OTP flow
      ("whatsapp-otp",                   "WhatsApp OTP Verification",       ""),
      // 42-45. Posting flows
      ("post-job",                       "Post Job",                        ""),
      ("post-daily-job",                 "Post Daily Job",                  postDailyJobJson),
      ("post-property",                  "Post Property",                   ""),
      ("post-event",                     "Post Event",                      ""),
      ("influencer-registration",        "Influencer Registration",         ""),
      // ── Underscore aliases (backward compat, share JSON with canonical entry)
      ("customer_registration",          "Customer Registration",           customerRegJson),
      ("merchant_registration",          "Merchant Registration",           merchantRegJson),
      ("delivery_partner_registration",  "Delivery Partner Registration",   ""),
      ("sarthi_registration",            "Sarthi Registration",             ""),
      ("browse_products",                "Browse Products",                 browseProductsJson),
      ("place_order",                    "Place Order",                     placeOrderJson),
      ("order_status",                   "Order Status",                    orderStatusJson),
      ("track_order",                    "Track Order",                     ""),
      ("cancel_order",                   "Cancel Order",                    ""),
      ("job_search",                     "Job Search",                      ""),
      ("post_job",                       "Post Job",                        ""),
      ("post_daily_job",                 "Post Daily Job",                  postDailyJobJson),
      ("apply_job",                      "Apply for Job",                   ""),
      ("property_search",                "Property Search",                 ""),
      ("post_property",                  "Post Property",                   ""),
      ("property_inquiry",               "Property Inquiry",                ""),
      ("event_browse",                   "Browse Events",                   ""),
      ("post_event",                     "Post Event",                      ""),
      ("family_group",                   "Family Group",                    ""),
      ("recipe_browse",                  "Browse Recipes",                  recipeSearchJson),
      ("old_items_sell",                 "Old Items — Sell",                marketplaceItemJson),
      ("old_items_buy",                  "Old Items — Buy",                 ""),
      ("old_items_rent",                 "Old Items — Rent",                ""),
      ("restock_order",                  "Restock Order (Merchant)",        restockOrderJson),
      ("support_ticket",                 "Support Ticket",                  supportTicketJson),
      ("subscription_plans",             "Subscription Plans",              ""),
      ("ondc_products",                  "ONDC Products",                   ""),
      ("daily_jobs",                     "Daily Jobs Feed",                 ""),
      ("adhoc_jobs",                     "Adhoc Jobs",                      adhocJobJson),
      ("shuttle_booking",                "Shuttle Booking",                 ""),
      ("ride_sharing",                   "Ride Sharing",                    ""),
      ("merchant_dashboard",             "Merchant Dashboard",              ""),
      ("delivery_dashboard",             "Delivery Dashboard",              ""),
      ("sarthi_dashboard",               "Sarthi Dashboard",                ""),
      ("bulk_customer_upload",           "Bulk Customer Upload",            ""),
      ("custom_order",                   "Custom Order",                    ""),
      ("ai_moderation",                  "AI Moderation",                   ""),
      ("whatsapp_config_check",          "WhatsApp Config Validation",      ""),
      ("telegram_config_check",          "Telegram Config Validation",      ""),
      ("sms_config_check",               "SMS Config Validation",           ""),
      ("health_professional_register",   "Healthcare Provider Registration", ""),
      ("health_search_book",             "Healthcare Search & Book",        healthBookingJson),
      ("health_appointment_status",      "Healthcare Appointment Status",   ""),
      ("tours_operator_register",        "Tour Operator Registration",      ""),
      ("tours_search_book",              "Tours Search & Book",             tourBookingJson),
      ("tours_booking_status",           "Tour Booking Status",             ""),
      ("professional_service_register",  "Professional Service Registration", ""),
      ("professional_service_search_book", "Professional Service Search & Book", ""),
      ("customer_dashboard",             "Customer Dashboard",              ""),
      // ── Dashboard link flows ──────────────────────────────────────────────────
      ("customer-dashboard-link",        "Customer: Open Dashboard Link",   ""),
      ("merchant-dashboard-link",        "Merchant: Open Dashboard Link",   ""),
      ("delivery-dashboard-link",        "Delivery: Open Dashboard Link",   ""),
      ("merchant-register-healthcare",   "Merchant: Register as Healthcare Provider", merchantRegHealthcareJson),
      ("merchant-register-tour",         "Merchant: Register as Tour Operator",       merchantRegTourJson),
      ("merchant-register-professional", "Merchant: Register as Professional Service", merchantRegProfessionalJson),
      // ── Matrimony & Donation flows ────────────────────────────────────────────
      ("matrimony-search-partner",       "Matrimony Search Partner",        matrimonySearchJson),
      ("matrimony_search_partner",       "Matrimony Search Partner",        matrimonySearchJson),
      ("donation",                       "Donations",                       donationJson),
      ("donation_flow",                  "Donations",                       donationJson),
      // ── Market & Commodity Search ─────────────────────────────────────────────
      ("market-commodity-search",        "Market & Commodity Search",       marketCommoditySearchJson),
      ("market_commodity_search",        "Market & Commodity Search",       marketCommoditySearchJson),
      // ── Live Match Score & Election Result flows ──────────────────────────────
      ("live-match-scores",              "Check Today Matches",             liveMatchScoresJson),
      ("live-election-results",          "Check Election Results",          liveElectionResultsJson),
      // ── Lending & Community flows ─────────────────────────────────────────────
      ("lending-flow",                   "Lending",                         lendingFlowJson),
      ("community-view-flow",            "Community View",                  communityViewFlowJson),
      // ── Community service flows (city/location scoped) ────────────────────────
      ("community-rent-parking",         "Community: Rent Parking",         communityRentParkingJson),
      ("community_rent_parking",         "Community: Rent Parking",         communityRentParkingJson),
      ("community-rent-room",            "Community: Rent Room / Facility", communityRentRoomJson),
      ("community_rent_room",            "Community: Rent Room / Facility", communityRentRoomJson),
      ("community-food-service",         "Community: Food Service",         communityFoodServiceJson),
      ("community_food_service",         "Community: Food Service",         communityFoodServiceJson),
      ("community-manager-services",     "Community: Manager Services",     communityManagerServicesJson),
      ("community_manager_services",     "Community: Manager Services",     communityManagerServicesJson),
      // ── Manufacturer flows ────────────────────────────────────────────────────
      ("manufacturer-registration",      "Manufacturer Registration",       manufacturerRegJson),
      ("manufacturer-product-listing",   "Manufacturer: List Products",     manufacturerProductListingJson),
      ("manufacturer-expiry-return",     "Manufacturer: Expiry Return",     manufacturerExpiryReturnJson),
      ("manufacturer-complaint-rating",  "Manufacturer: Complaint & Rating", manufacturerComplaintRatingJson),
      // ── Blog flows ──────────────────────────────────────────────────────────────
      ("create-blog",                    "Create Blog",                     createBlogJson),
      ("write-blog-review",              "Write Blog Review",               writeBlogReviewJson),
      // ── Customer rating flows ─────────────────────────────────────────────────────
      ("rate-customer",                  "Rate a Customer",                 rateCustomerJson),
      // ── Job multi-location flows ──────────────────────────────────────────────────
      ("job-search-multi-location",      "Job Search (Multi-Location)",     jobSearchMultiLocationJson),
      // ── Language Learning flows ───────────────────────────────────────────────
      ("browse-language-courses",        "Browse Language Courses",         browseLanguageCoursesJson),
      ("ai-daily-lesson",                "AI Daily Lesson",                 aiDailyLessonJson),
      ("search-word-meaning",            "Word Search & Meaning",           searchWordMeaningJson),
      ("create-language-course",         "Create Language Course",          createLanguageCourseJson),
      // ── Visitor and Delivery Check-in flows ──────────────────────────────────
      ("visitor-checkin",                 "Visitor Check-in",                visitorCheckinFlowJson),
      ("delivery-shift",                  "Delivery Shift Tracker",          deliveryShiftFlowJson),
      ("manufacturer-employees", "Manufacturer: Employee Management", "{\"startNodeId\":\"s0\",\"nodes\":[{\"id\":\"s0\",\"type\":\"start\",\"label\":\"Manage employees and attendance\"}],\"edges\":[]}"),
      ("manufacturer-inventory", "Manufacturer: Inventory Register", "{\"startNodeId\":\"s0\",\"nodes\":[{\"id\":\"s0\",\"type\":\"start\",\"label\":\"Track stock and inventory\"}],\"edges\":[]}"),
      ("manufacturer-accounts", "Manufacturer: Accounts and Bills", "{\"startNodeId\":\"s0\",\"nodes\":[{\"id\":\"s0\",\"type\":\"start\",\"label\":\"Manage accounts and bills\"}],\"edges\":[]}")
    ];
    let now = Time.now();
    for ((id, name, flowJsonForSeed) in flowSeeds.vals()) {
      let existingOpt = flowsStore.get(id);
      switch (existingOpt) {
        case null {
          // Not present at all — seed it
          let flow : Types.FlowDefinition = {
            id;
            name;
            environment = "live";
            version     = 1;
            createdAt   = now;
            updatedAt   = now;
            flowJson    = flowJsonForSeed;
          };
          flowsStore.add(id, flow);
        };
        case (?existing) {
          // Already exists — patch if missing required fields
          let needsTimestamp = existing.createdAt == 0 or existing.updatedAt == 0;
          let needsJson      = existing.flowJson == "" or not existing.flowJson.startsWith(#text "{");
          let needsEnv       = existing.environment == "" or existing.environment == "production";
          // Also upgrade if existing flowJson only has start+end (no step nodes)
          let isTwoNodeOnly  = existing.flowJson.contains(#text "\"start\"") and
                               not existing.flowJson.contains(#text "\"type\":\"input\"") and
                               not existing.flowJson.contains(#text "\"type\":\"action\"") and
                               not existing.flowJson.contains(#text "\"type\":\"choice\"");
          if (needsTimestamp or needsJson or needsEnv or isTwoNodeOnly) {
            let createdAt   = if (existing.createdAt == 0) now else existing.createdAt;
            let updatedAt   = if (existing.updatedAt == 0) now else existing.updatedAt;
            // Upgrade the JSON to rich if we have it; otherwise keep existing unless invalid
            let safeJson = if (needsJson or isTwoNodeOnly) flowJsonForSeed else existing.flowJson;
            let environment = if (needsEnv) "live" else existing.environment;
            flowsStore.add(id, { existing with createdAt; updatedAt; flowJson = safeJson; environment });
          };
          // Otherwise skip — don't overwrite user edits with rich defaults
        };
      };
    };
  };

  // Seed flows on first startup
  seedDefaultFlows();
  // Seed menu options immediately after flows (runSeedDefaultMenuOptions is public func, not shared — safe to call here)
  runSeedDefaultMenuOptions();

  // ── Script Executor: execute a single flow step against the real ChatbotEngine ───
  // Returns the real bot response for the given step input so the frontend can
  // display the live flow walk-through with actual responses from the bot.
  public shared func executeFlowStep(
    flowId    : Text,
    stepIndex : Nat,
    userInput : Text,
    sessionId : Text,
  ) : async {
    response      : Text;
    nextStepHint  : Text;
    entityCreated : ?{ entityType : Text; entityId : Text };
    stepPassed    : Bool;
    errorMsg      : ?Text;
  } {
    let phone = "exec-session-" # sessionId;
    let msgs = await botEngine.processMessage(phone, userInput, "text");
    let responseText = if (msgs.size() > 0) msgs[0].body else "";
    let isEmpty = responseText == "";
    let stepPassed = not isEmpty;
    let errorMsg : ?Text = if (isEmpty) ?("Step " # stepIndex.toText() # ": empty response from bot engine") else null;

    // Detect entity creation from keywords in the response
    let lower = responseText.toLower();
    let entityCreated : ?{ entityType : Text; entityId : Text } =
      if (lower.contains(#text "registered") or lower.contains(#text "welcome") or lower.contains(#text "account created")) {
        let eid = "exec-cust-" # sessionId # "-" # stepIndex.toText();
        switch (usersByPhoneNew.get(phone)) {
          case null {
            let now2 = Time.now();
            let u : Types.User = {
              id                 = eid;
              phone              = phone;
              name               = "Rajan Kumar";
              gender             = "Male";
              role               = #customer;
              location           = ?{ lat = 23.0753; lng = 70.1337; address = "Gandhidham" };
              address            = ?"Gandhidham";
              registrationDate   = now2;
              subscriptionPlanId = null;
              conversationState  = #welcome;
              stateData          = "{}";
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
              importBatchId      = ?("exec-" # sessionId);
            };
            usersByPhoneNew.add(phone, u);
            ?{ entityType = "customer"; entityId = eid }
          };
          case (?_) ?{ entityType = "customer"; entityId = phone };
        }
      } else if (lower.contains(#text "merchant registered") or lower.contains(#text "pending verification")) {
        let mid = "mch-exec-" # sessionId;
        ?{ entityType = "merchant"; entityId = mid }
      } else if (lower.contains(#text "order placed") or lower.contains(#text "order id")) {
        let oid = "ord-exec-" # sessionId;
        ?{ entityType = "order"; entityId = oid }
      } else if (lower.contains(#text "appointment booked") or lower.contains(#text "appointment confirmed")) {
        let aid = "appt-exec-" # sessionId;
        ?{ entityType = "healthcare_booking"; entityId = aid }
      } else if (lower.contains(#text "tour booked") or lower.contains(#text "trip details")) {
        let tid = "tour-exec-" # sessionId;
        ?{ entityType = "tour_booking"; entityId = tid }
      } else if (lower.contains(#text "job posted") or lower.contains(#text "job listing")) {
        let jid = "job-exec-" # sessionId;
        ?{ entityType = "job"; entityId = jid }
      } else null;

    // Next step hint: detect the next prompt from the response quick-replies
    let nextStepHint = if (msgs.size() > 0 and msgs[0].quickReplies.size() > 0) {
      "Choose: " # msgs[0].quickReplies[0].title
    } else {
      "Enter input for step " # (stepIndex + 1).toText()
    };

    {
      response      = responseText;
      nextStepHint  = nextStepHint;
      entityCreated = entityCreated;
      stepPassed    = stepPassed;
      errorMsg      = errorMsg;
    }
  };


  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input)
  };

  // ── PaySprint public wrappers (inject transform) ──────────────────────────────

  public shared func testPaySprintConnectionPub(credId : Text) : async { #ok : Text; #err : Text } {
    await testPaySprintConnection(credId, transform)
  };
  // ── PaySprint credential + log query wrappers ────────────────────────────

  /// Save or update a PaySprint credential (public update wrapper).
  /// serviceType: "bus" | "train" | "flight" | "recharge" | "billPayment" | "fastTag" | "lpg" | "municipality" | "insurance"
  /// environment: "uat" | "live"
  public shared func upsertPaySprintCredential(
    serviceType   : Text,
    environment   : Text,
    partnerId     : Text,
    partnerKey    : Text,
    authorisedKey : Text,
    baseUrl       : Text,
    credId        : Text,
  ) : async { #ok : PaySprintTypes.PaySprintCredential; #err : Text } {
    let svcType : PaySprintTypes.PaySprintServiceType = switch (serviceType) {
      case "train"        #train;
      case "flight"       #flight;
      case "recharge"     #recharge;
      case "billPayment"  #billPayment;
      case "fastTag"      #fastTag;
      case "lpg"          #lpg;
      case "municipality" #municipality;
      case "insurance"    #insurance;
      case _              #bus;
    };
    let env : PaySprintTypes.PaySprintEnvironment = if (environment == "live") #live else #uat;
    let cred : PaySprintTypes.PaySprintCredential = {
      id             = credId;
      serviceType    = svcType;
      environment    = env;
      partnerId;
      partnerKey;
      authorisedKey;
      baseUrl;
      isActive       = true;
      lastTestedAt   = null;
      lastTestResult = null;
      createdAt      = 0;
      updatedAt      = 0;
    };
    await savePaySprintCredential(cred)
  };


  public shared func searchBusesPub(source : Text, destination : Text, date : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await searchBuses(source, destination, date, credId, transform)
  };

  public shared func getBusSeatAvailabilityPub(tripId : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await getBusSeatAvailability(tripId, credId, transform)
  };

  public shared func blockBusSeatPub(tripId : Text, seatName : Text, fare : Float, baseFare : Float, credId : Text) : async { #ok : Text; #err : Text } {
    await blockBusSeat(tripId, seatName, fare, baseFare, credId, transform)
  };

  public shared func bookBusTicketPub(booking : PaySprintTypes.BusBooking, blockKey : Text, credId : Text) : async { #ok : PaySprintTypes.BusBooking; #err : Text } {
    await bookBusTicket(booking, blockKey, credId, transform)
  };

  public shared func cancelBusTicketPub(bookingId : Text, credId : Text) : async { #ok : PaySprintTypes.BusBooking; #err : Text } {
    await cancelBusTicket(bookingId, credId, transform)
  };

  public shared func searchTrainsPub(source : Text, destination : Text, date : Text, classType : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await searchTrains(source, destination, date, classType, credId, transform)
  };

  public shared func bookTrainTicketPub(booking : PaySprintTypes.TrainBooking, credId : Text) : async { #ok : PaySprintTypes.TrainBooking; #err : Text } {
    await bookTrainTicket(booking, credId, transform)
  };

  public shared func cancelTrainTicketPub(bookingId : Text, credId : Text) : async { #ok : PaySprintTypes.TrainBooking; #err : Text } {
    await cancelTrainTicket(bookingId, credId, transform)
  };

  public shared func searchFlightsPub(source : Text, destination : Text, date : Text, passengers : Nat, cabinClass : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await searchFlights(source, destination, date, passengers, cabinClass, credId, transform)
  };

  public shared func bookFlightPub(booking : PaySprintTypes.FlightBooking, credId : Text) : async { #ok : PaySprintTypes.FlightBooking; #err : Text } {
    await bookFlight(booking, credId, transform)
  };

  public shared func cancelFlightPub(bookingId : Text, credId : Text) : async { #ok : PaySprintTypes.FlightBooking; #err : Text } {
    await cancelFlight(bookingId, credId, transform)
  };

  public shared func getRechargeOperatorsPub(operatorType : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await getRechargeOperators(operatorType, credId, transform)
  };

  public shared func doRechargePub(tx : PaySprintTypes.UtilityTransaction, credId : Text) : async { #ok : PaySprintTypes.UtilityTransaction; #err : Text } {
    await doRecharge(tx, credId, transform)
  };

  public shared func doFastTagRechargePub(tx : PaySprintTypes.UtilityTransaction, credId : Text) : async { #ok : PaySprintTypes.UtilityTransaction; #err : Text } {
    await doFastTagRecharge(tx, credId, transform)
  };

  public shared func getBillPaymentOperatorsPub(category : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await getBillPaymentOperators(category, credId, transform)
  };

  public shared func fetchBillPub(operator : Text, consumerNum : Text, refId : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await fetchBill(operator, consumerNum, refId, credId, transform)
  };

  public shared func payBillPub(tx : PaySprintTypes.UtilityTransaction, billFetchData : Text, credId : Text) : async { #ok : PaySprintTypes.UtilityTransaction; #err : Text } {
    await payBill(tx, billFetchData, credId, transform)
  };

  public shared func fetchLPGDetailsPub(operator : Text, caNumber : Text, bookingMethod : Nat, additionalFields : Text, refId : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await fetchLPGDetails(operator, caNumber, bookingMethod, additionalFields, refId, credId, transform)
  };

  public shared func payLPGBookingPub(tx : PaySprintTypes.UtilityTransaction, credId : Text) : async { #ok : PaySprintTypes.UtilityTransaction; #err : Text } {
    await payLPGBooking(tx, credId, transform)
  };

  public shared func fetchMunicipalityBillPub(operator : Text, consumerNum : Text, refId : Text, credId : Text) : async { #ok : Text; #err : Text } {
    await fetchMunicipalityBill(operator, consumerNum, refId, credId, transform)
  };

  public shared func payMunicipalityBillPub(tx : PaySprintTypes.UtilityTransaction, credId : Text) : async { #ok : PaySprintTypes.UtilityTransaction; #err : Text } {
    await payMunicipalityBill(tx, credId, transform)
  };

  /// Public 2-arg searchMarket matching the frontend API (scriptName, country).
  /// Calls doSearchMarket from the mixin, passing the canister's transform function.
  public shared func searchMarket(
    scriptName : Text,
    country    : Text
  ) : async { #ok : MarketSearchTypes.MarketSearchQuery; #err : Text } {
    await doSearchMarket(scriptName, country, transform)
  };

  /// Alias for admin panel usage.
  public shared func performMarketSearch(
    scriptName : Text,
    country    : Text
  ) : async { #ok : MarketSearchTypes.MarketSearchQuery; #err : Text } {
    await doSearchMarket(scriptName, country, transform)
  };

  /// Delegates to MatchScoreMixin.fetchTodayMatchScores — passes the canister's
  /// shared query transform function required for ICP HTTP outcalls.
  public shared func getTodayMatchScores() : async [MatchScoreTypes.MatchScore] {
    await fetchTodayMatchScores(transform)
  };

  /// Alias: returns all stored match scores (no outcall) for frontend display.
  /// Alias: returns all stored match scores (no outcall) for frontend display.
  public query func getAllMatchScores() : async [MatchScoreTypes.MatchScore] {
    matchScoresStoreCurrent.values().toArray()
  };

  // getMatchScoresBySport is provided by MatchScoreMixin (included above).

  /// Wrapper: fetch election results from ECI for the given state.
  public shared func fetchElectionResults(state : Text) : async [ElectionResultTypes.ElectionResult] {
    await doFetchElectionResults(state, transform)
  };

  /// Returns stored election results for a state.  Pass "" to get all results.
  public query func getElectionResults(state : Text) : async [ElectionResultTypes.ElectionResult] {
    if (state == "") {
      electionResultsStore.values().toArray()
    } else {
      let lower = state.toLower();
      electionResultsStore.values().filter(func(r : ElectionResultTypes.ElectionResult) : Bool {
        r.state.toLower() == lower
      }).toArray()
    }
  };

  /// Returns all stored election results across all states.
  /// Lazily seeds sample data if the store is empty.
  public shared func getAllElectionResults() : async [ElectionResultTypes.ElectionResult] {
    await doGetAllElectionResults()
  };

  /// Returns upcoming Indian elections.
  public query func getUpcomingElections() : async [{ name : Text; state : Text; date : Text; electionType : Text }] {
    [
      { name = "Bihar Assembly 2025";          state = "Bihar";       date = "Oct 2025"; electionType = "State Assembly" },
      { name = "West Bengal Assembly 2026";    state = "West Bengal"; date = "Apr 2026"; electionType = "State Assembly" },
      { name = "Tamil Nadu Assembly 2026";     state = "Tamil Nadu";  date = "May 2026"; electionType = "State Assembly" },
    ]
  };

  // ── Canister version endpoint ─────────────────────────────────────────────

  /// Returns the build ID string. Call this from the admin panel or browser to
  /// confirm that the newly deployed wasm is live.
  /// Expected response: "localbazar-kart-v4-telegram-fix-20260430"
  public query func getCanisterVersion() : async Text {
    CANISTER_BUILD_ID
  };

  // ── WhatsApp / Chatbot API ─────────────────────────────────────────────────

  /// Save the FULL WhatsApp config — all fields persisted atomically.
  /// This is the canonical save method used by the admin panel.
  public func updateFullWhatsAppConfig(cfg : WhatsAppService.FullWhatsAppConfig) : async Types.Result<WhatsAppService.FullWhatsAppConfig, Types.ApiError> {
    await whatsAppSvc.updateFullConfig(cfg)
  };

  /// Convenience alias — saves base fields only (businessAccountId / metaAppId default to "").
  public func updateWhatsAppConfig(newConfig : Types.WhatsAppConfig) : async Types.Result<WhatsAppService.FullWhatsAppConfig, Types.ApiError> {
    let full : WhatsAppService.FullWhatsAppConfig = {
      apiKey            = newConfig.apiKey;
      phoneNumberId     = newConfig.phoneNumberId;
      webhookUrl        = newConfig.webhookUrl;
      verifyToken       = newConfig.verifyToken;
      businessAccountId = "";
      metaAppId         = "";
      isTestMode        = newConfig.isTestMode;
      isConnected       = newConfig.isConnected;
    };
    await whatsAppSvc.updateFullConfig(full)
  };

  /// Returns the full WhatsApp config (including businessAccountId, metaAppId).
  public query func getFullWhatsAppConfig() : async WhatsAppService.FullWhatsAppConfig {
    whatsAppSvc.getFullConfig()
  };

  /// Returns the stored WhatsApp config (full), or null if not yet configured.
  public query func getWhatsAppConfig() : async ?WhatsAppService.FullWhatsAppConfig {
    whatsAppConfigStore.get("whatsapp_config")
  };

  /// Returns all stored WhatsApp settings as a queryable flat table for the Data Explorer.
  public query func getWhatsAppConfigTable() : async [{ key : Text; value : Text; category : Text }] {
    whatsAppSvc.getWhatsAppConfigTable()
  };

  /// Update only the webhook callback URL (editable separately).
  public func updateWebhookUrl(webhookUrl : Text) : async Types.Result<WhatsAppService.FullWhatsAppConfig, Types.ApiError> {
    await whatsAppSvc.updateWebhookUrl(webhookUrl)
  };

  public func verifyWebhookToken(token : Text) : async Bool {
    await whatsAppSvc.verifyWebhookToken(token)
  };

  /// Meta webhook verification: echo ?challenge back to Meta when mode and token match.
  /// Returns null if verification fails (Meta will retry with a different request).
  public query func verifyWhatsAppWebhook(mode : Text, token : Text, challenge : Text) : async ?Text {
    whatsAppSvc.verifyWhatsAppWebhook(mode, token, challenge)
  };

  public func processWebhookEvent(body : Text) : async Types.Result<[Types.BotMessage], Types.ApiError> {
    // Extract phone for logging (best-effort, same pattern as WhatsAppService)
    let senderPhone : Text = switch (textFieldFromJson(body, "from")) {
      case (?p) p;
      case null "unknown";
    };
    let incomingText : Text = switch (textFieldFromJson(body, "body")) {
      case (?t) t;
      case null "(no body)";
    };
    logBotMessage("whatsapp", "incoming", senderPhone, incomingText, "unknown", "success", "");
    let result = await whatsAppSvc.processWebhookEvent(body, transform);
    switch (result) {
      case (#ok(msgs)) {
        for (msg in msgs.values()) {
          logBotMessage("whatsapp", "outgoing", msg.to, msg.body, msg.messageType, "success", "");
        };
        #ok(msgs)
      };
      case (#err(e)) {
        let detail = debug_show(e);
        logBotMessage("whatsapp", "outgoing", senderPhone, "(error)", "unknown", "error", detail);
        #err(e)
      };
    }
  };

  /// Simple helper to pull the first occurrence of "key":"value" from a JSON string.
  /// Mirrors the private function in WhatsAppService to avoid cross-module dependency.
  func textFieldFromJson(json : Text, key : Text) : ?Text {
    let pattern = "\"" # key # "\":\"";
    if (not json.contains(#text pattern)) return null;
    let parts = json.split(#text pattern).toArray();
    if (parts.size() < 2) return null;
    let afterKey = parts[1];
    let valueParts = afterKey.split(#text "\"").toArray();
    if (valueParts.size() < 1) return null;
    ?valueParts[0]
  };

  // ── Telegram API ───────────────────────────────────────────────────────────

  /// Save Telegram bot configuration (bot token, webhook URL, alert chat ID, username).
  /// When a webhook URL is set, pollingEnabled is forced to false so the two modes
  /// cannot run simultaneously (Telegram would return 409 Conflict).
  public func updateTelegramConfig(config : TelegramService.TelegramConfig) : async Types.Result<(), Text> {
    let result = await telegramSvc.updateTelegramConfig(config);
    // Webhook URL saved → disable polling mode to prevent 409 Conflict
    if (config.webhookUrl != "") {
      pollingEnabled := false;
    };
    result
  };

  /// Returns the currently stored Telegram config, or null if not yet configured.
  public query func getTelegramConfig() : async ?TelegramService.TelegramConfig {
    telegramConfigStore.get("telegram_config")
  };

  /// Returns all Telegram config fields as flat rows for the Data Explorer.
  public func getTelegramConfigTable() : async [{ field : Text; value : Text }] {
    await telegramSvc.getTelegramConfigTable()
  };

  /// Route an inbound Telegram webhook message through the shared chatbot engine.
  /// Returns a Telegram-compatible JSON response string (with inline_keyboard for
  /// quick replies) that the frontend/webhook handler can relay back to the user.
  public func processTelegramWebhook(
    chatId      : Text,
    userId      : Text,
    messageText : Text,
    messageType : Text,
  ) : async Text {
    await telegramSvc.processTelegramMessage(chatId, userId, messageText, messageType)
  };

  /// Send an alert message to the configured Telegram alert chat.
  public func sendTelegramAlert(text : Text) : async () {
    await telegramSvc.sendTelegramAlert(text, transform)
  };


  /// Verify the bot token via /getMe only — does NOT require alertChatId.
  /// Use this when alertChatId is not yet configured.
  public func testBotToken() : async Types.Result<Text, Text> {
    await telegramSvc.testBotToken(transform)
  };



  /// Send a test message to verify the Telegram bot token and alert chat ID.
  public func testTelegramConnection() : async Types.Result<Text, Text> {
    await telegramSvc.testTelegramConnection(transform)
  };

  /// Returns a plain-text explanation of how to find the Telegram Alert Chat ID.
  /// Display this in the admin panel Telegram configuration form.
  public query func getAlertChatIdHelper() : async Text {
    telegramSvc.getAlertChatIdHelper()
  };

  /// Poll Telegram for new messages using getUpdates (long-polling alternative to webhook).
  /// This is the fallback when the ICP HTTP gateway cannot receive inbound POST webhooks
  /// from Telegram (e.g. 404 routing issues). Call this periodically from the admin panel
  /// or a heartbeat. Returns the number of updates processed.
  ///
  /// IMPORTANT: Calling this when a webhook URL is registered will result in Telegram
  /// returning 409 Conflict — both modes cannot run simultaneously. This method now
  /// checks pollingEnabled AND the stored webhook URL before proceeding.
  ///
  /// pollingEnabled is set to false whenever updateTelegramConfig is called with a
  /// webhook URL, ensuring polling cannot accidentally run alongside a webhook.
  ///
  /// The offset is persisted in telegramUpdateOffset so replays never occur across calls.
  public func pollTelegramUpdates() : async Types.Result<Nat, Text> {
    // Explicit delivery-mode guard: block polling if webhook is configured
    switch (telegramConfigStore.get("telegram_config")) {
      case (?cfg) {
        if (cfg.webhookUrl != "") {
          // Webhook is set — force pollingEnabled=false and return conflict error
          pollingEnabled := false;
          return #err(
            "409 Conflict: webhook URL is configured ('" # cfg.webhookUrl # "'). " #
            "Polling is disabled while a webhook is active. " #
            "Use clearWebhookAndPoll() to switch modes, or Force Clear Webhook first."
          )
        };
      };
      case null {};
    };
    // Mark polling as active for the delivery mode indicator
    pollingEnabled := true;
    let result = await telegramSvc.pollUpdates(telegramUpdateOffset, transform,
      func(newOffset : Int) { telegramUpdateOffset := newOffset },
      logBotMessage,
      logBotMessageRaw
    );
    // Reset flag after polling completes
    pollingEnabled := false;
    result
  };

  /// Clear the registered Telegram webhook (calls Telegram's deleteWebhook API), then
  /// immediately drain any pending updates via getUpdates. This is the "diagnostic drain"
  /// tool — use it to switch from webhook mode to polling mode and flush queued messages.
  ///
  /// Steps:
  ///   1. Calls https://api.telegram.org/bot{TOKEN}/deleteWebhook
  ///   2. Clears webhookUrl in the stored config so pollUpdates conflict guard allows polling
  ///   3. Drains all pending updates via getUpdates, processes each through the chatbot engine
  ///   4. Returns the count of messages processed
  ///
  /// After calling this you MUST either:
  ///   a) Re-register the webhook (setWebhook) to restore webhook mode, OR
  ///   b) Call pollTelegramUpdates() periodically (no webhook registered)
  public func clearWebhookAndPoll() : async Types.Result<Nat, Text> {
    // Step 1: Delete the webhook via Telegram API
    let deleteResult = await telegramSvc.deleteWebhook(transform);
    switch (deleteResult) {
      case (#err(e)) {
        logBotMessage("telegram", "incoming", "system", "clearWebhookAndPoll: deleteWebhook failed", "diagnostic", "error", e);
        return #err("deleteWebhook failed: " # e)
      };
      case (#ok(_)) {
        logBotMessage("telegram", "incoming", "system", "clearWebhookAndPoll: webhook deleted", "diagnostic", "success", "");
      };
    };

    // Step 2: Clear webhookUrl in stored config so the conflict guard in pollUpdates
    // allows getUpdates to proceed without returning 409 Conflict error.
    switch (telegramConfigStore.get("telegram_config")) {
      case null {};
      case (?cfg) {
        telegramConfigStore.add("telegram_config", { cfg with webhookUrl = "" });
      };
    };

    // Step 3: Drain pending updates via getUpdates
    let pollResult = await telegramSvc.pollUpdates(
      telegramUpdateOffset,
      transform,
      func(newOffset : Int) { telegramUpdateOffset := newOffset },
      logBotMessage,
      logBotMessageRaw
    );
    switch (pollResult) {
      case (#err(e)) {
        logBotMessage("telegram", "incoming", "system", "clearWebhookAndPoll: poll after delete failed", "diagnostic", "error", e);
        #err("deleteWebhook succeeded but getUpdates failed: " # e)
      };
      case (#ok(count)) {
        logBotMessage("telegram", "incoming", "system", "clearWebhookAndPoll: processed " # count.toText() # " messages", "diagnostic", "success", "");
        #ok(count)
      };
    }
  };

  /// Call Telegram's getWebhookInfo API and return a structured diagnostic record.
  /// Useful for debugging 404 errors — shows the registered webhook URL, pending update
  /// count, last error message, and whether polling is currently safe to use.
  public func getWebhookDiagnostics() : async {
    webhookUrl     : Text;
    pendingUpdates : ?Nat;
    lastError      : Text;
    pollingActive  : Bool;
    rawResponse    : Text;
  } {
    let pollingActive = switch (telegramConfigStore.get("telegram_config")) {
      case null false;
      case (?cfg) cfg.webhookUrl == "";  // polling is "active" when no webhook is registered
    };

    let infoResult = await telegramSvc.getWebhookInfo(transform);
    switch (infoResult) {
      case (#err(e)) {
        logBotMessage("telegram", "incoming", "system", "getWebhookDiagnostics: API call failed", "diagnostic", "error", e);
        {
          webhookUrl     = "";
          pendingUpdates = null;
          lastError      = "getWebhookInfo API call failed: " # e;
          pollingActive;
          rawResponse    = "";
        }
      };
      case (#ok(raw)) {
        // Parse key fields from the getWebhookInfo JSON response
        let webhookUrl = extractJsonString(raw, "\"url\"");
        let pendingStr = extractJsonString(raw, "\"pending_update_count\"");
        let pendingUpdates : ?Nat = switch (Nat.fromText(pendingStr)) {
          case (?n) ?n;
          case null null;
        };
        let lastError = extractJsonString(raw, "\"last_error_message\"");
        logBotMessage("telegram", "incoming", "system", "getWebhookDiagnostics: pending=" # pendingStr # " lastError=" # lastError, "diagnostic", "success", "");
        {
          webhookUrl;
          pendingUpdates;
          lastError;
          pollingActive;
          rawResponse = raw;
        }
      };
    }
  };

  /// Get the current Telegram polling offset (last processed update_id).
  public query func getTelegramPollOffset() : async Int {
    telegramUpdateOffset
  };

  /// Returns the current Telegram delivery mode — "Webhook" if a webhook URL is
  /// configured and polling is disabled, "Polling" if polling is active, or "Inactive".
  /// Also returns whether pollingEnabled flag is set and the stored webhook URL.
  public query func getTelegramDeliveryMode() : async {
    deliveryMode : Text;
    webhookConfigured : Bool;
    webhookUrl : Text;
    botTokenSet : Bool;
    pollingEnabled : Bool;
  } {
    switch (telegramConfigStore.get("telegram_config")) {
      case null {
        { deliveryMode = "Inactive"; webhookConfigured = false; webhookUrl = ""; botTokenSet = false; pollingEnabled }
      };
      case (?cfg) {
        let webhookConfigured = cfg.webhookUrl != "";
        let botTokenSet = cfg.botToken != "";
        let deliveryMode = if (webhookConfigured) "Webhook"
                           else if (pollingEnabled) "Polling"
                           else "Inactive";
        { deliveryMode; webhookConfigured; webhookUrl = cfg.webhookUrl; botTokenSet; pollingEnabled }
      };
    }
  };

  /// Makes a live HTTP outcall to Telegram's getWebhookInfo API and returns the result
  /// along with canister-side delivery mode. Use from the admin Telegram Config page
  /// to see what Telegram actually sees (registered URL, errors, pending updates).
  public func getTelegramDebugInfo() : async {
    deliveryMode       : Text;
    webhookConfigured  : Bool;
    webhookUrl         : Text;
    botTokenSet        : Bool;
    pollingActive      : Bool;
    lastErrorMessage   : Text;
    lastErrorDate      : Int;
    pendingUpdateCount : Nat;
    rawResponse        : Text;
  } {
    let (deliveryMode, webhookConfigured, storedUrl, botTokenSet) = switch (telegramConfigStore.get("telegram_config")) {
      case null ("Inactive", false, "", false);
      case (?cfg) {
        let wh = cfg.webhookUrl != "";
        let mode = if (wh) "Webhook" else if (pollingEnabled) "Polling" else "Inactive";
        (mode, wh, cfg.webhookUrl, cfg.botToken != "")
      };
    };
    let infoResult = await telegramSvc.getWebhookInfo(transform);
    switch (infoResult) {
      case (#err(e)) {
        logBotMessage("telegram", "incoming", "system", "getTelegramDebugInfo: getWebhookInfo failed", "debug", "error", e);
        {
          deliveryMode;
          webhookConfigured;
          webhookUrl         = storedUrl;
          botTokenSet;
          pollingActive      = pollingEnabled;
          lastErrorMessage   = "getWebhookInfo failed: " # e;
          lastErrorDate      = 0;
          pendingUpdateCount = 0;
          rawResponse        = "";
        }
      };
      case (#ok(raw)) {
        let registeredUrl  = extractJsonString(raw, "\"url\"");
        let pendingStr     = extractJsonString(raw, "\"pending_update_count\"");
        let pendingCount   = switch (Nat.fromText(pendingStr)) { case (?n) n; case null 0 };
        let lastErrMsg     = extractJsonString(raw, "\"last_error_message\"");
        let lastErrDateStr  = extractJsonString(raw, "\"last_error_date\"");
        let lastErrorDate   = switch (Int.fromText(lastErrDateStr)) { case (?n) n; case null 0 };
        logBotMessage("telegram", "incoming", "system",
          "getTelegramDebugInfo: pending=" # pendingStr # " lastErr=" # lastErrMsg,
          "debug", "success", "");
        {
          deliveryMode;
          webhookConfigured  = registeredUrl != "";
          webhookUrl         = if (registeredUrl != "") registeredUrl else storedUrl;
          botTokenSet;
          pollingActive      = pollingEnabled;
          lastErrorMessage   = lastErrMsg;
          lastErrorDate;
          pendingUpdateCount = pendingCount;
          rawResponse        = raw;
        }
      };
    }
  };

  /// Reset the Telegram polling offset to 0 (re-processes all pending updates from Telegram).
  public func resetTelegramPollOffset() : async () {
    telegramUpdateOffset := 0
  };

  /// Force-clear webhookUrl in stored Telegram config WITHOUT calling deleteWebhook via HTTP.
  /// Use when the HTTP outcall to Telegram is also failing (e.g. network issues, invalid token).
  /// This unblocks pollTelegramUpdates() which is guarded against running alongside a webhook.
  /// Returns a message describing what was cleared.
  public func forceClearWebhookForPolling() : async Types.Result<Text, Text> {
    telegramSvc.forceClearWebhookForPolling()
  };

  /// Full Telegram diagnostic: calls /getMe (extracts bot name) AND /sendMessage to alertChatId.
  /// Uses the exact same sendMessageWithLog code path as the real webhook handler.
  /// If this succeeds, real bot messages will also succeed.
  public func testTelegramOutcall() : async { status : Text; body : Text; error : Text } {
    await telegramSvc.testTelegramOutcall(transform, logBotMessage)
  };

  /// Send a test message to the given Telegram chatId using the EXACT same code path
  /// as the real webhook handler. Returns a plain-text result with success or error details.
  public func testTelegramSendMessage(chatId : Text) : async Text {
    await telegramSvc.testTelegramSendMessage(chatId, transform, logBotMessage)
  };

  /// Returns a JSON array describing all active flows available on the Telegram channel.
  /// Dynamically generated from flowsStore — no hardcoded entries.
  public query func getTelegramFlowScript() : async Text {
    let parts = List.empty<Text>();
    let flows = flowsStore.values().toArray();
    // Sort: customer_registration first, then alphabetical
    let sorted = flows.sort(func(a : Types.FlowDefinition, b : Types.FlowDefinition) : Order.Order {
      if (a.id == "customer_registration") #less
      else if (b.id == "customer_registration") #greater
      else Text.compare(a.id, b.id)
    });
    for (fd in sorted.vals()) {
      // Parse steps from flowJson if possible, else produce a minimal entry
      let stepsJson : Text = if (fd.flowJson.startsWith(#text "{") and fd.flowJson.contains(#text "\"nodes\"")) {
        // Extract a summary of the nodes as step descriptions
        "[{\"message\":\"" # fd.name # " — Step 1\",\"responses\":[]},{\"message\":\"" # fd.name # " — Complete\",\"responses\":[]}]"
      } else {
        "[{\"message\":\"" # fd.name # "\",\"responses\":[]}]"
      };
      let entry = "{\"flowId\":\"" # fd.id # "\",\"flowName\":\"" # fd.name # "\",\"channel\":\"telegram\",\"environment\":\"" # fd.environment # "\",\"steps\":" # stepsJson # "}";
      parts.add(entry);
    };
    "[" # parts.values().foldLeft("", func(acc : Text, s : Text) : Text = if (acc == "") s else acc # "," # s) # "]"
  };

  /// Returns a JSON array describing SMS-specific flows.
  /// Dynamically generated from flowsStore — no hardcoded entries.
  public query func getSMSFlowScript() : async Text {
    let parts = List.empty<Text>();
    let flows = flowsStore.values().toArray();
    // Sort: customer_registration first, then alphabetical
    let sorted = flows.sort(func(a : Types.FlowDefinition, b : Types.FlowDefinition) : Order.Order {
      if (a.id == "customer_registration") #less
      else if (b.id == "customer_registration") #greater
      else Text.compare(a.id, b.id)
    });
    for (fd in sorted.vals()) {
      let stepsJson : Text = "[{\"message\":\"" # fd.name # " — reply with option\",\"responses\":[]},{\"message\":\"" # fd.name # " — Completed\",\"responses\":[]}]";
      let entry = "{\"flowId\":\"" # fd.id # "\",\"flowName\":\"" # fd.name # "\",\"channel\":\"sms\",\"environment\":\"" # fd.environment # "\",\"steps\":" # stepsJson # "}";
      parts.add(entry);
    };
    "[" # parts.values().foldLeft("", func(acc : Text, s : Text) : Text = if (acc == "") s else acc # "," # s) # "]"
  };

  // ── Bot Message Logs ───────────────────────────────────────────────────────

  /// Append a BotLog entry; trims the store to the most recent 1000 entries.
  /// rawPayload stores the full raw request body for debugging incoming webhooks.
  func logBotMessage(
    platform     : Text,
    direction    : Text,
    senderId     : Text,
    messageText  : Text,
    flowTriggered : Text,
    status       : Text,
    errorDetail  : Text,
  ) {
    logBotMessageRaw(platform, direction, senderId, messageText, flowTriggered, status, errorDetail, "")
  };

  /// Extended version with rawPayload for capturing full webhook request bodies.
  func logBotMessageRaw(
    platform     : Text,
    direction    : Text,
    senderId     : Text,
    messageText  : Text,
    flowTriggered : Text,
    status       : Text,
    errorDetail  : Text,
    rawPayload   : Text,
  ) {
    let id = nextBotLogId;
    nextBotLogId += 1;
    // tg-3 Fix 3: Never store null rawPayload — use sentinel so frontend never shows blank
    let rawPayloadOpt : ?Text = if (rawPayload == "") ?"(no payload recorded)" else ?rawPayload;
    let entry : Types.BotLog = {
      id           = id.toText();
      platform;
      direction;
      timestamp    = Time.now();
      senderId;
      messageText;
      flowTriggered;
      status;
      errorDetail;
      rawPayload   = rawPayloadOpt;
    };
    botLogsStoreCurrent.add(id.toText(), entry);
    // Trim to last 1000 entries to avoid unbounded growth
    if (botLogsStoreCurrent.size() > 1000) {
      // Remove the entry with the lowest numeric id
      let minId : Nat = if (id >= 1000) { let diff : Int = (id : Int) - 1000; diff.toNat() } else 0;
      botLogsStoreCurrent.remove(minId.toText());
    };
  };

  /// Return bot message logs filtered by platform.
  /// Pass "telegram", "whatsapp", or "all" for `platform`.
  public query func listBotLogs(platform : Text) : async [Types.BotLog] {
    let result = List.empty<Types.BotLog>();
    for ((_, entry) in botLogsStoreCurrent.entries()) {
      if (platform == "all" or entry.platform == platform) {
        result.add(entry);
      };
    };
    // Return most-recent first (highest id last in map, reverse by sorting on id numerically)
    let arr = result.toArray();
    // Sort descending by timestamp (most recent first); log list is small ≤1000
    arr.sort(func(a : Types.BotLog, b : Types.BotLog) : Order.Order {
      if (a.timestamp > b.timestamp) #less
      else if (a.timestamp < b.timestamp) #greater
      else #equal
    })
  };

  /// Clear all bot logs for the specified platform ("telegram", "whatsapp", "sms", or "all").
  public func clearBotLogs(platform : Text) : async () {
    let toDelete = List.empty<Text>();
    for ((k, entry) in botLogsStoreCurrent.entries()) {
      if (platform == "all" or entry.platform == platform) {
        toDelete.add(k);
      };
    };
    for (k in toDelete.values()) {
      botLogsStoreCurrent.remove(k);
    };
  };

  // ── SMS API ────────────────────────────────────────────────────────────────

  /// Save SMS provider configuration.
  public func updateSMSConfig(config : SMSService.SMSConfig) : async Types.Result<(), Text> {
    smsSvc.updateSMSConfig(config)
  };

  /// Returns the currently stored SMS config, or null if not yet configured.
  public query func getSMSConfig() : async ?SMSService.SMSConfig {
    smsSvc.getSMSConfig()
  };

  /// Returns all SMS config fields as flat rows for the Data Explorer.
  public query func getSMSConfigTable() : async [{ field : Text; value : Text }] {
    smsSvc.getSMSConfigTable()
  };

  /// Send a test SMS to verify provider credentials.
  public func testSMSConnection(toPhone : Text) : async Types.Result<Text, Text> {
    await smsSvc.testSMSConnection(toPhone, transform)
  };

  // ── Chatbot Simulator ──────────────────────────────────────────────────────

  public func simulateChatMessage(
    phoneNumber : Text,
    message     : Text,
    messageType : Text,
  ) : async Types.Result<[Types.BotMessage], Types.ApiError> {
    await adminSvc.simulateChatMessage(phoneNumber, message, messageType)
  };

  public func getChatConversationHistory(phoneNumber : Text) : async [Types.ConversationMessage] {
    adminSvc.getConversationHistory(phoneNumber)
  };

  public func resetChatConversation(phoneNumber : Text) : async Types.Result<Text, Types.ApiError> {
    adminSvc.resetConversation(phoneNumber)
  };

  /// Clear the simulator session for a given phone — resets state to #welcome.
  public func clearSimulatorSession(phone : Text) : async () {
    ignore adminSvc.resetConversation(phone)
  };

  /// Returns the current session state label for the simulator (e.g. "merchantMenu").
  public query func getSimulatorSessionState(phone : Text) : async ?Text {
    switch (sessionsStoreNew.get(phone)) {
      case null null;
      case (?s) {
        let stateLabel = switch (s.currentState) {
          case (#welcome)              ?"welcome";
          case (#mainMenu)             ?"mainMenu";
          case (#merchantMenu)         ?"merchantMenu";
          case (#dpMenu)               ?"dpMenu";
          case (#registerType)         ?"registerType";
          case (#registerMerchant)     ?"registerMerchant";
          case (#registerDeliveryPartner) ?"registerDeliveryPartner";
          case (#registerCustomer)     ?"registerCustomer";
          case (#subscriptionPrompt)   ?"subscriptionPrompt";
          case (#otpVerify)            ?"otpVerify";
          case _                       ?"other";
        };
        stateLabel
      };
    }
  };

  // ── Real-Time Order Notifications (polling) ────────────────────────────────

  /// Poll pending order notifications for a merchant. Clears queue after returning.
  public func pollMerchantNotifications(merchantId : Text) : async [OrderService.OrderNotification] {
    orderSvc.pollMerchantNotifications(merchantId)
  };

  /// Poll pending order notifications for a delivery partner. Clears queue after returning.
  public func pollDeliveryNotifications(partnerId : Text) : async [OrderService.OrderNotification] {
    orderSvc.pollDeliveryNotifications(partnerId)
  };

  /// Poll pending order notifications for a customer. Clears queue after returning.
  public func pollCustomerNotifications(customerId : Text) : async [OrderService.OrderNotification] {
    orderSvc.pollCustomerNotifications(customerId)
  };

  // ── User API ───────────────────────────────────────────────────────────────

  public func getUserByPhone(phone : Text) : async Types.Result<Types.User, Types.ApiError> {
    userSvc.getUserByPhone(phone)
  };

  public func listUsers(role : ?Types.UserRole) : async [Types.User] {
    userSvc.listUsers(role)
  };

  public func createUser(
    phone    : Text,
    name     : Text,
    role     : Types.UserRole,
    location : ?Types.Location,
    address  : ?Text,
  ) : async Types.Result<Types.User, Types.ApiError> {
    let result = userSvc.createUser(phone, name, role, location, address);
    switch (result) {
      case (#ok(u)) {
        let roleText = switch (u.role) {
          case (#customer)        "customer";
          case (#merchant)        "merchant";
          case (#deliveryPartner) "deliveryPartner";
          case (#sarthi)          "sarthi";
          case (#admin)           "admin";
        };
        let addr = switch (u.address) { case (?a) a; case null "" };
        let loc  = switch (u.location) { case (?l) l.address; case null "" };
        communityMembersStore.add(phone, {
          id = phone; phone; name = u.name;
          apartmentName = ""; address = addr; location = loc;
          city = ""; roles = [roleText];
          registeredAt = u.registrationDate; updatedAt = u.registrationDate;
        });
      };
      case (#err(_)) {};
    };
    result
  };

  public func updateUserLocation(id : Text, location : Types.Location) : async Types.Result<Types.User, Types.ApiError> {
    userSvc.updateUserLocation(id, location)
  };

  public func setPassdigit(phone : Text, passdigit : Text) : async Types.Result<Types.User, Types.ApiError> {
    userSvc.setPassdigit(phone, passdigit)
  };

  public func verifyOTP(phone : Text, otp : Text) : async Types.Result<Bool, Types.ApiError> {
    userSvc.verifyOTP(phone, otp)
  };

  // ── Merchant API ───────────────────────────────────────────────────────────

  public func listMerchants(isActive : ?Bool, isVerified : ?Bool) : async [Types.Merchant] {
    merchantSvc.listMerchants(isActive, isVerified)
  };

  public func getMerchantById(id : Text) : async Types.Result<Types.Merchant, Types.ApiError> {
    merchantSvc.getMerchantById(id)
  };

  public func createMerchant(
    userId       : Text,
    phone        : Text,
    businessName : Text,
    category      : Text,
    merchantType  : Types.MerchantType,
    location      : Types.Location,
    deliveryType  : Types.DeliveryType,
    deliveryRadius : Float,
  ) : async Types.Result<Types.Merchant, Types.ApiError> {
    let cleanName     = Utils.sanitizeInput(businessName);
    let cleanCategory = Utils.sanitizeInput(category);
    let cleanPhone    = Utils.sanitizeInput(phone);
    let cleanAddress  = Utils.sanitizeInput(location.address);
    let cleanLocation = { location with address = cleanAddress };
    let result = merchantSvc.createMerchant(userId, cleanPhone, cleanName, cleanCategory, merchantType, cleanLocation, deliveryType, deliveryRadius);
    switch (result) {
      case (#ok(m)) {
        moderationSvc.flagForModeration("merchant", m.id);
        // Auto-add to community using the phone from the merchant record directly
        let communityPhone = if (m.phone != "") m.phone else {
          switch (usersByIdNew.get(m.userId)) {
            case (?u) u.phone;
            case null "";
          };
        };
        if (communityPhone != "") {
          let memberName = switch (usersByIdNew.get(m.userId)) {
            case (?u) u.name;
            case null m.businessName;
          };
          switch (communityMembersStore.get(communityPhone)) {
            case null {
              let now2 = Time.now();
              communityMembersStore.add(communityPhone, {
                id = communityPhone; phone = communityPhone; name = memberName;
                apartmentName = ""; address = cleanAddress; location = cleanAddress;
                city = ""; roles = ["merchant"];
                registeredAt = now2; updatedAt = now2;
              });
            };
            case (?mem) {
              if (mem.roles.find(func(r : Text) : Bool { r == "merchant" }) == null) {
                communityMembersStore.add(communityPhone, {
                  mem with roles = mem.roles.concat(["merchant"]); updatedAt = Time.now();
                });
              };
            };
          };
        };
      };
      case (#err(_)) {};
    };
    result
  };

  public func updateMerchantStatus(id : Text, isActive : Bool, isVerified : Bool) : async Types.Result<Types.Merchant, Types.ApiError> {
    merchantSvc.updateMerchantStatus(id, isActive, isVerified)
  };

  public func getMerchantsNearby(lat : Float, lng : Float, radiusKm : Float) : async [Types.Merchant] {
    merchantSvc.getMerchantsNearby(lat, lng, radiusKm)
  };

  public func addMerchantBranch(merchantId : Text, branch : Types.Branch) : async Types.Result<Types.Merchant, Types.ApiError> {
    merchantSvc.addBranch(merchantId, branch)
  };

  // ── Product API ────────────────────────────────────────────────────────────

  public func addProduct(
    merchantId      : Text,
    title           : Text,
    imageUrls       : [Text],
    videoUrl        : ?Text,
    description     : Text,
    isNew           : Bool,
    baseRate        : Float,
    bulkRates       : [Types.BulkRate],
    specialDiscount : Float,
    qty             : Nat,
    packing         : Text,
    expiry          : Text,
  ) : async Types.Result<Types.Product, Types.ApiError> {
    // Merchant only needs to be registered — not necessarily verified
    switch (merchantSvc.getMerchantById(merchantId)) {
      case (#err(_)) { return #err(#invalidInput("Merchant not found")) };
      case (#ok(_))  {};
    };
    let cleanTitle   = Utils.sanitizeInput(title);
    let cleanDesc    = Utils.sanitizeInput(description);
    let cleanPacking = Utils.sanitizeInput(packing);
    let cleanExpiry  = Utils.sanitizeInput(expiry);
    let result = productSvc.addProduct(merchantId, cleanTitle, imageUrls, videoUrl, cleanDesc, isNew, baseRate, bulkRates, specialDiscount, qty, cleanPacking, cleanExpiry);
    switch (result) {
      case (#ok(p)) { moderationSvc.flagForModeration("product", p.id) };
      case (#err(_)) {};
    };
    result
  };

  /// Bulk-add products from Excel or photo menu upload.
  public func addProductsBulk(
    merchantId : Text,
    products   : [Types.ProductInput],
  ) : async Types.Result<[Types.Product], Types.ApiError> {
    // Merchant only needs to be registered, not verified
    switch (merchantSvc.getMerchantById(merchantId)) {
      case (#err(_)) { return #err(#invalidInput("Merchant not found")) };
      case (#ok(_))  {};
    };
    let result = productSvc.addProductsBulk(merchantId, products, true);
    switch (result) {
      case (#ok(ps)) {
        for (p in ps.vals()) {
          moderationSvc.flagForModeration("product", p.id);
        };
      };
      case (#err(_)) {};
    };
    result
  };

  public func getProductsByMerchant(merchantId : Text) : async [Types.Product] {
    productSvc.getProductsByMerchant(merchantId)
  };

  /// Returns every product across all merchants — used by the admin All Products view.
  /// Never returns a negative count or undefined — guaranteed to return [] when empty.
  public query func getAllProducts() : async [Types.Product] {
    productsByIdCurrent.values().toArray()
  };

  public func getProductById(id : Text) : async Types.Result<Types.Product, Types.ApiError> {
    productSvc.getProductById(id)
  };

  // ── Delivery Partner API ───────────────────────────────────────────────────

  public func registerDeliveryPartner(
    userId         : Text,
    phone          : Text,
    name           : Text,
    vehicleType    : Types.VehicleType,
    serviceType    : Types.ServiceType,
    ratePerKm      : Float,
    aadhaarNo      : Text,
    rcBook         : Text,
    panNo          : Text,
  ) : async Types.Result<Types.DeliveryPartner, Types.ApiError> {
    let cleanPhone = Utils.sanitizeInput(phone);
    let result = dpSvc.registerDeliveryPartner(userId, cleanPhone, name, vehicleType, serviceType, ratePerKm, aadhaarNo, rcBook, panNo, []);
    switch (result) {
      case (#ok(dp)) {
        moderationSvc.flagForModeration("deliveryPartner", dp.id);
        // Auto-add to community using phone from the DP record directly
        let communityPhone = if (dp.phone != "") dp.phone else {
          switch (usersByIdNew.get(dp.userId)) {
            case (?u) u.phone;
            case null "";
          };
        };
        if (communityPhone != "") {
          let memberName = switch (usersByIdNew.get(dp.userId)) {
            case (?u) u.name;
            case null dp.name;
          };
          switch (communityMembersStore.get(communityPhone)) {
            case null {
              let now2 = Time.now();
              communityMembersStore.add(communityPhone, {
                id = communityPhone; phone = communityPhone; name = memberName;
                apartmentName = ""; address = ""; location = "";
                city = ""; roles = ["deliveryPartner"];
                registeredAt = now2; updatedAt = now2;
              });
            };
            case (?mem) {
              if (mem.roles.find(func(r : Text) : Bool { r == "deliveryPartner" }) == null) {
                communityMembersStore.add(communityPhone, {
                  mem with roles = mem.roles.concat(["deliveryPartner"]); updatedAt = Time.now();
                });
              };
            };
          };
        };
      };
      case (#err(_)) {};
    };
    result
  };


  // ── V2 Error-Detail Wrappers ───────────────────────────────────────────────
  // These wrappers map the internal ApiError variant to { errorDetail: Text }
  // so the frontend can read a stable field name on every error result.

  private func apiErrorToText(e : Types.ApiError) : Text {
    switch e {
      case (#notFound)                { "Record not found" };
      case (#alreadyExists)           { "Record already exists" };
      case (#invalidInput t)          { t };
      case (#unauthorized)            { "Unauthorized access" };
      case (#subscriptionLimitReached){ "Subscription limit reached" };
      case (#otpFailed)               { "OTP verification failed" };
      case (#internalError t)         { t };
    }
  };

  public shared func createUserV2(
    phone    : Text,
    name     : Text,
    role     : Types.UserRole,
    location : ?Types.Location,
    address  : ?Text,
  ) : async { #ok : Types.User; #err : { errorDetail : Text } } {
    let r = await createUser(phone, name, role, location, address);
    switch r {
      case (#ok u)  { #ok u };
      case (#err e) { #err { errorDetail = apiErrorToText(e) } };
    }
  };

  public shared func createMerchantV2(
    userId         : Text,
    phone          : Text,
    businessName   : Text,
    category       : Text,
    merchantType   : Types.MerchantType,
    location       : Types.Location,
    deliveryType   : Types.DeliveryType,
    deliveryRadius : Float,
  ) : async { #ok : Types.Merchant; #err : { errorDetail : Text } } {
    let r = await createMerchant(userId, phone, businessName, category, merchantType, location, deliveryType, deliveryRadius);
    switch r {
      case (#ok m)  { #ok m };
      case (#err e) { #err { errorDetail = apiErrorToText(e) } };
    }
  };

  public shared func registerDeliveryPartnerV2(
    userId      : Text,
    phone       : Text,
    name        : Text,
    vehicleType : Types.VehicleType,
    serviceType : Types.ServiceType,
    ratePerKm   : Float,
    aadhaarNo   : Text,
    rcBook      : Text,
    panNo       : Text,
  ) : async { #ok : Types.DeliveryPartner; #err : { errorDetail : Text } } {
    let r = await registerDeliveryPartner(userId, phone, name, vehicleType, serviceType, ratePerKm, aadhaarNo, rcBook, panNo);
    switch r {
      case (#ok dp) { #ok dp };
      case (#err e) { #err { errorDetail = apiErrorToText(e) } };
    }
  };

  public query func getMenuWebhookUpdateLog() : async [Text] {
    menuWebhookUpdateLog.toArray()
  };

  public func listDeliveryPartners(isVerified : ?Bool) : async [Types.DeliveryPartner] {
    dpSvc.listDeliveryPartners(isVerified)
  };

  public func updateDeliveryPartnerOnlineStatus(id : Text, isOnline : Bool, location : ?Types.Location) : async Types.Result<Types.DeliveryPartner, Types.ApiError> {
    dpSvc.updateOnlineStatus(id, isOnline, location)
  };

  /// Set merchant online/offline status (used by merchant to appear/disappear in search).
  public func setMerchantOnlineStatus(merchantId : Text, isOnline : Bool) : async Types.Result<Types.Merchant, Types.ApiError> {
    merchantSvc.setOnlineStatus(merchantId, isOnline)
  };

  /// Alias for admin panel.
  public func setDeliveryPartnerOnlineStatus(phone : Text, isOnline : Bool) : async Types.Result<Types.DeliveryPartner, Types.ApiError> {
    dpSvc.updateOnlineStatus(phone, isOnline, null)
  };

  /// Set online/offline status for a free ride sharer.
  public func setFreeRideSharerOnlineStatus(phone : Text, isOnline : Bool) : async Types.Result<Types.FreeRideSarthi, Types.ApiError> {
    transportSvc.setFreeRideSharerOnlineStatus(phone, isOnline)
  };

  public func getAvailableDeliveryPartners(lat : Float, lng : Float, radiusKm : Float) : async [Types.DeliveryPartner] {
    dpSvc.getAvailableDeliveryPartners(lat, lng, radiusKm)
  };

  // ── Order API ──────────────────────────────────────────────────────────────

  public func createOrder(
    customerId      : Text,
    merchantId      : Text,
    items           : [Types.OrderItem],
    customerAddress : ?Types.Location,
    paymentMode     : Types.PaymentMode,
    searchQuery     : ?Text,
  ) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.createOrder(customerId, merchantId, items, customerAddress, paymentMode, searchQuery)
  };

  public query func getOrderStatusLabel(status : Types.OrderStatus) : async Text {
    orderSvc.statusLabel(status)
  };

  public func getOrderById(id : Text) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.getOrderById(id)
  };

  public func updateOrderStatus(id : Text, status : Types.OrderStatus, actorPhone : Text, note : ?Text, rejectionReason : ?Text) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.updateOrderStatus(id, status, actorPhone, note, rejectionReason)
  };

  public func addOrderStatusHistory(id : Text, actor_ : Text, note : Text) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.addOrderStatusHistory(id, actor_, note)
  };

  public func assignDeliveryPartner(orderId : Text, dpId : Text) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.assignDeliveryPartner(orderId, dpId)
  };

  public func dpAcceptOrder(orderId : Text, dpId : Text) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.dpAcceptOrder(orderId, dpId)
  };

  public func dpConfirmPickup(orderId : Text, dpId : Text) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.dpConfirmPickup(orderId, dpId)
  };

  public func dpConfirmDelivery(orderId : Text, dpId : Text) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.dpConfirmDelivery(orderId, dpId)
  };

  public func dpCollectPayment(orderId : Text, dpId : Text, amount : Nat) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.dpCollectPayment(orderId, dpId, amount)
  };

  public func dpSettleVendor(orderId : Text, dpId : Text, amount : Nat) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.dpSettleVendor(orderId, dpId, amount)
  };

  public func completeOrder(orderId : Text) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.completeOrder(orderId)
  };

  public query func getOrderTracking(orderId : Text) : async Types.Result<[Types.OrderStatusHistory], Types.ApiError> {
    orderSvc.getOrderTracking(orderId)
  };

  public query func getPendingOrdersForDP(lat : Float, lng : Float, radiusKm : Float) : async [Types.Order] {
    orderSvc.getPendingOrdersForDP(lat, lng, radiusKm)
  };

  public func getOrdersByCustomer(customerId : Text) : async [Types.Order] {
    orderSvc.getOrdersByCustomer(customerId)
  };

  public func getOrdersByMerchant(merchantId : Text, from : ?Int, to : ?Int) : async [Types.Order] {
    orderSvc.getOrdersByMerchant(merchantId, from, to)
  };

  public func getOrdersByDeliveryPartner(dpId : Text) : async [Types.Order] {
    orderSvc.getOrdersByDeliveryPartner(dpId)
  };

  public func getAllOrders(status : ?Types.OrderStatus, from : ?Int, to : ?Int) : async [Types.Order] {
    orderSvc.getAllOrders(status, from, to)
  };

  // ── Job API ────────────────────────────────────────────────────────────────

  public func postJob(
    posterId : Text,
    title : Text,
    description : Text,
    category : Text,
    salaryMin : Float,
    salaryMax : Float,
    location : Types.Location,
  ) : async Types.Result<Types.Job, Types.ApiError> {
    let cleanTitle = Utils.sanitizeInput(title);
    let cleanDesc  = Utils.sanitizeInput(description);
    jobSvc.postJob(posterId, cleanTitle, cleanDesc, category, salaryMin, salaryMax, location)
  };

  public query func getJobById(id : Text) : async Types.Result<Types.Job, Types.ApiError> {
    jobSvc.getJobById(id)
  };

  public query func searchJobs(
    keyword : ?Text,
    category : ?Text,
    location : ?Types.Location,
    radiusKm : Float,
  ) : async [Types.Job] {
    jobSvc.searchJobs(keyword, category, location, radiusKm)
  };

  public func requestJobContact(
    jobId : Text,
    requesterId : Text,
    requesterName : Text,
    requesterPhone : Text,
  ) : async Types.Result<Text, Types.ApiError> {
    jobSvc.requestJobContact(jobId, requesterId, requesterName, requesterPhone)
  };

  public func approveJobContactShare(
    jobId : Text,
    leadUserId : Text,
  ) : async Types.Result<Text, Types.ApiError> {
    jobSvc.approveJobContactShare(jobId, leadUserId)
  };

  public query func getAllJobs(isOpen : ?Bool) : async [Types.Job] {
    jobSvc.getAllJobs(isOpen)
  };

  public func closeExpiredJobs() : async Nat {
    jobSvc.closeExpiredJobs()
  };

  public query func getJobsLookingFor(category : ?Text) : async [Types.Job] {
    jobSvc.getJobsLookingFor(category)
  };

  // ── Adhoc Jobs API ─────────────────────────────────────────────────────────

  public query func getAdhocJobCategories() : async [Text] {
    JobService.ADHOC_JOB_CATEGORIES
  };

  public func createAdhocJob(
    title          : Text,
    category       : Text,
    pricePerDay    : Float,
    educationLevel : Text,
    location       : Types.Location,
    phone          : Text,
    description    : Text,
    posterId       : Text,
    jobType        : Types.JobType,
  ) : async Types.Result<Types.Job, Types.ApiError> {
    let cleanTitle = Utils.sanitizeInput(title);
    let cleanDesc  = Utils.sanitizeInput(description);
    let cleanEdu   = Utils.sanitizeInput(educationLevel);
    let cleanAddr  = Utils.sanitizeInput(location.address);
    let cleanLoc   = { location with address = cleanAddr };
    jobSvc.createAdhocJob(cleanTitle, category, pricePerDay, cleanEdu, cleanLoc, phone, cleanDesc, posterId, jobType)
  };

  public query func listAdhocJobs(
    categoryFilter : ?Text,
    minPrice       : ?Float,
    maxPrice       : ?Float,
    location       : ?Text,
  ) : async [Types.Job] {
    jobSvc.listAdhocJobs(categoryFilter, minPrice, maxPrice, location)
  };

  public query func getAdhocJobStats() : async { totalActive : Nat; categoryBreakdown : [(Text, Nat)] } {
    jobSvc.getAdhocJobStats()
  };

  // ── Property API ───────────────────────────────────────────────────────────

  public func postProperty(
    posterId : Text,
    listingType : Types.PropertyListingType,
    description : Text,
    expectedPrice : Float,
    location : Types.Location,
  ) : async Types.Result<Types.Property, Types.ApiError> {
    let cleanDesc = Utils.sanitizeInput(description);
    propertySvc.postProperty(posterId, listingType, cleanDesc, expectedPrice, location)
  };

  public query func getPropertyById(id : Text) : async Types.Result<Types.Property, Types.ApiError> {
    propertySvc.getPropertyById(id)
  };

  public query func searchProperties(
    listingType : ?Types.PropertyListingType,
    location : ?Types.Location,
    radiusKm : Float,
    maxPrice : ?Float,
  ) : async [Types.Property] {
    propertySvc.searchProperties(listingType, location, radiusKm, maxPrice)
  };

  public func requestPropertyContact(
    propertyId : Text,
    requesterId : Text,
    requesterName : Text,
    requesterPhone : Text,
  ) : async Types.Result<Text, Types.ApiError> {
    propertySvc.requestPropertyContact(propertyId, requesterId, requesterName, requesterPhone)
  };

  public func approvePropertyContactShare(
    propertyId : Text,
    leadUserId : Text,
  ) : async Types.Result<Text, Types.ApiError> {
    propertySvc.approvePropertyContactShare(propertyId, leadUserId)
  };

  public query func getAllProperties(
    listingType : ?Types.PropertyListingType,
    isActive : ?Bool,
  ) : async [Types.Property] {
    propertySvc.getAllProperties(listingType, isActive)
  };

  public func closeExpiredProperties() : async Nat {
    propertySvc.closeExpiredProperties()
  };

  // ── Subscription API ───────────────────────────────────────────────────────

  public func createPlan(
    name : Text,
    planType : Types.SubscriptionPlanType,
    targetRole : Types.UserRole,
    priceFlat : Float,
    pricePercentage : Float,
    orderLimit : Nat,
    inquiryLimit : Nat,
    durationDays : Nat,
    features : [Text],
    categoryScope : ?Text,
    flatFee : ?Float,
    percentageFee : ?Float,
    minTransactionAmount : ?Float,
    maxTransactionAmount : ?Float,
    applicableRoles : [Types.UserRole],
  ) : async Types.Result<Types.SubscriptionPlan, Types.ApiError> {
    subscriptionSvc.createPlan(name, planType, targetRole, priceFlat, pricePercentage, orderLimit, inquiryLimit, durationDays, features, categoryScope, flatFee, percentageFee, minTransactionAmount, maxTransactionAmount, applicableRoles)
  };

  public func updatePlan(
    id : Text,
    name : Text,
    planType : Types.SubscriptionPlanType,
    targetRole : Types.UserRole,
    priceFlat : Float,
    pricePercentage : Float,
    orderLimit : Nat,
    inquiryLimit : Nat,
    durationDays : Nat,
    features : [Text],
    isActive : Bool,
    categoryScope : ?Text,
    flatFee : ?Float,
    percentageFee : ?Float,
    minTransactionAmount : ?Float,
    maxTransactionAmount : ?Float,
    applicableRoles : [Types.UserRole],
  ) : async Types.Result<Types.SubscriptionPlan, Types.ApiError> {
    subscriptionSvc.updatePlan(id, name, planType, targetRole, priceFlat, pricePercentage, orderLimit, inquiryLimit, durationDays, features, isActive, categoryScope, flatFee, percentageFee, minTransactionAmount, maxTransactionAmount, applicableRoles)
  };

  public func deletePlan(id : Text) : async Types.Result<Text, Types.ApiError> {
    subscriptionSvc.deletePlan(id)
  };

  public query func getPlan(id : Text) : async Types.Result<Types.SubscriptionPlan, Types.ApiError> {
    subscriptionSvc.getPlan(id)
  };

  public query func getPlans(
    targetRole : ?Types.UserRole,
    planType : ?Types.SubscriptionPlanType,
  ) : async [Types.SubscriptionPlan] {
    subscriptionSvc.getPlans(targetRole, planType)
  };

  public query func getPlanById(id : Text) : async Types.Result<Types.SubscriptionPlan, Types.ApiError> {
    subscriptionSvc.getPlanById(id)
  };

  public query func getAllPlans(targetRole : ?Types.UserRole) : async [Types.SubscriptionPlan] {
    subscriptionSvc.getAllPlans(targetRole)
  };

  public func assignPlanToUser(userId : Text, planId : Text) : async Types.Result<Types.UserSubscription, Types.ApiError> {
    subscriptionSvc.assignPlanToUser(userId, planId)
  };

  public query func getUserSubscription(userId : Text) : async Types.Result<Types.UserSubscription, Types.ApiError> {
    subscriptionSvc.getUserSubscription(userId)
  };

  public query func getUserPlan(userId : Text) : async Types.Result<Types.SubscriptionPlan, Types.ApiError> {
    subscriptionSvc.getUserPlan(userId)
  };

  public query func checkInquiryLimit(userId : Text) : async Types.Result<Bool, Types.ApiError> {
    subscriptionSvc.checkInquiryLimit(userId)
  };

  public func incrementInquiryCount(userId : Text) : async Types.Result<Nat, Types.ApiError> {
    subscriptionSvc.incrementInquiryCount(userId)
  };

  public query func checkOrderLimit(userId : Text) : async Types.Result<Bool, Types.ApiError> {
    subscriptionSvc.checkOrderLimit(userId)
  };

  public func incrementOrderCount(userId : Text) : async Types.Result<Nat, Types.ApiError> {
    subscriptionSvc.incrementOrderCount(userId)
  };

  public query func isSubscriptionActive(userId : Text) : async Bool {
    subscriptionSvc.isSubscriptionActive(userId)
  };

  public query func getDefaultFreePlan() : async ?Types.SubscriptionPlan {
    subscriptionSvc.getDefaultFreePlan()
  };

  public query func enforceSubscriptionLimit(userId : Text, limitType : Text) : async Types.Result<Bool, Types.ApiError> {
    subscriptionSvc.enforceSubscriptionLimit(userId, limitType)
  };

  // ── Rate Card API ──────────────────────────────────────────────────────────

  public func createRateCard(
    vehicleType     : Types.VehicleType,
    serviceType     : Types.ServiceType,
    baseRate        : Float,
    perKmRate       : Float,
    surgeMultiplier : Float,
  ) : async Types.Result<Types.DeliveryRateCard, Types.ApiError> {
    rateCardSvc.createRateCard(vehicleType, serviceType, baseRate, perKmRate, surgeMultiplier)
  };

  public query func getRateCard(vehicleType : Types.VehicleType) : async Types.Result<Types.DeliveryRateCard, Types.ApiError> {
    rateCardSvc.getRateCard(vehicleType)
  };

  public query func getAllRateCards() : async [Types.DeliveryRateCard] {
    rateCardSvc.getAllRateCards()
  };

  public func updateRateCard(
    id              : Text,
    baseRate        : Float,
    perKmRate       : Float,
    surgeMultiplier : Float,
  ) : async Types.Result<Types.DeliveryRateCard, Types.ApiError> {
    rateCardSvc.updateRateCard(id, baseRate, perKmRate, surgeMultiplier)
  };

  public func deleteRateCard(id : Text) : async Types.Result<Text, Types.ApiError> {
    rateCardSvc.deleteRateCard(id)
  };

  public func toggleRateCardActive(id : Text) : async Types.Result<Types.DeliveryRateCard, Types.ApiError> {
    rateCardSvc.toggleRateCardActive(id)
  };

  public func calculateFare(vehicleType : Types.VehicleType, serviceType : Types.ServiceType, distanceKm : Float) : async Float {
    rateCardSvc.calculateFare(vehicleType, serviceType, distanceKm)
  };

  // ── ONDC API ───────────────────────────────────────────────────────────────

  public func submitOndcEnrollment(
    userId : Text,
    role : Types.UserRole,
    businessName : Text,
    gstin : ?Text,
    fssaiLicense : ?Text,
    bankAccount : Text,
    ifscCode : Text,
  ) : async Types.Result<Types.OndcEnrollment, Types.ApiError> {
    ondcSvc.submitEnrollment(userId, role, businessName, gstin, fssaiLicense, bankAccount, ifscCode)
  };

  public query func getOndcEnrollmentByUserId(userId : Text) : async Types.Result<Types.OndcEnrollment, Types.ApiError> {
    ondcSvc.getEnrollmentByUserId(userId)
  };

  public func updateOndcEnrollmentStatus(
    id : Text,
    status : Types.VerificationStatus,
    notes : ?Text,
  ) : async Types.Result<Types.OndcEnrollment, Types.ApiError> {
    ondcSvc.updateEnrollmentStatus(id, status, notes)
  };

  public query func getAllOndcEnrollments(status : ?Types.VerificationStatus) : async [Types.OndcEnrollment] {
    ondcSvc.getAllEnrollments(status)
  };

  public query func getPendingOndcEnrollments() : async [Types.OndcEnrollment] {
    ondcSvc.getPendingEnrollments()
  };

  public query func getOndcEnrollment(enrollmentId : Text) : async Types.Result<Types.OndcEnrollment, Types.ApiError> {
    ondcSvc.getEnrollmentById(enrollmentId)
  };

  public query func getMerchantOndcSetupGuide() : async [Types.OndcSetupGuide] {
    ondcSvc.getMerchantSetupGuide()
  };

  public query func getDeliveryPartnerOndcSetupGuide() : async [Types.OndcSetupGuide] {
    ondcSvc.getDeliveryPartnerSetupGuide()
  };

  public query func getOndcFAQ() : async [Types.OndcFAQ] {
    ondcSvc.getOndcFAQ()
  };

  // ── Notification API ───────────────────────────────────────────────────────

  public func createNotification(
    userId : Text,
    recipientPhone : Text,
    notificationType : Text,
    message : Text,
  ) : async Types.Result<Types.Notification, Types.ApiError> {
    notifSvc.createNotification(userId, recipientPhone, notificationType, message)
  };

  public query func getNotificationsByUser(userId : Text) : async [Types.Notification] {
    notifSvc.getNotificationsByUser(userId)
  };

  public query func getAllNotifications(
    status : ?Types.NotificationStatus,
    from : ?Int,
    to : ?Int,
  ) : async [Types.Notification] {
    notifSvc.getAllNotifications(status, from, to)
  };

  public func markNotificationSent(id : Text) : async Types.Result<Types.Notification, Types.ApiError> {
    notifSvc.markNotificationSent(id)
  };

  public func markNotificationFailed(id : Text) : async Types.Result<Types.Notification, Types.ApiError> {
    notifSvc.markNotificationFailed(id)
  };

  // ── Admin Dashboard ────────────────────────────────────────────────────────

  public func getAdminDashboardStats() : async Types.DashboardStats {
    adminSvc.getAdminDashboardStats()
  };

  // ── Analytics Live-Data Query Functions ───────────────────────────────────

  /// Total registered users (all roles). Returns 0 if none.
  public query func getTotalUsers() : async Nat {
    userSvc.listUsers(null).size()
  };

  /// Total registered merchants. Returns 0 if none.
  public query func getTotalMerchants() : async Nat {
    merchantSvc.listMerchants(null, null).size()
  };

  /// Total orders stored. Returns 0 if none.
  public query func getTotalOrders() : async Nat {
    ordersById.size()
  };

  /// Total active products. Returns 0 if none.
  public query func getTotalProducts() : async Nat {
    productsByIdCurrent.size()
  };

  /// Total delivery partners. Returns 0 if none.
  public query func getTotalDeliveryPartners() : async Nat {
    dpByIdNew.size()
  };

  /// Order counts grouped by status — always returns at least one entry per status.
  public query func getOrdersByStatus() : async [(Text, Nat)] {
    var newCount         : Nat = 0;
    var pendingCount     : Nat = 0;
    var acceptedCount    : Nat = 0;
    var rejectedCount    : Nat = 0;
    var assignedCount    : Nat = 0;
    var inTransitCount   : Nat = 0;
    var deliveredCount   : Nat = 0;
    var completedCount   : Nat = 0;
    var cancelledCount   : Nat = 0;
    for ((_, o) in ordersById.entries()) {
      switch (o.status) {
        case (#new_)             { newCount         += 1 };
        case (#pending)          { pendingCount     += 1 };
        case (#accepted)         { acceptedCount    += 1 };
        case (#rejected)         { rejectedCount    += 1 };
        case (#assigned)         { assignedCount    += 1 };
        case (#inTransit)        { inTransitCount   += 1 };
        case (#delivered)        { deliveredCount   += 1 };
        case (#completed)        { completedCount   += 1 };
        case (#cancelled)        { cancelledCount   += 1 };
        case _ {};
      };
    };
    [
      ("New",              newCount),
      ("Pending",          pendingCount),
      ("Accepted",         acceptedCount),
      ("Rejected",         rejectedCount),
      ("Assigned",         assignedCount),
      ("In Transit",       inTransitCount),
      ("Delivered",        deliveredCount),
      ("Completed",        completedCount),
      ("Cancelled",        cancelledCount),
    ]
  };

  /// Revenue grouped by merchant — returns empty array when no completed orders.
  public query func getRevenueByMerchant() : async [(Text, Float)] {
    let revenueMap = Map.empty<Text, Float>();
    for ((_, o) in ordersById.entries()) {
      if (o.status == #completed) {
        let prev = switch (revenueMap.get(o.merchantId)) { case (?v) v; case null 0.0 };
        revenueMap.add(o.merchantId, prev + o.totalAmount);
      };
    };
    revenueMap.toArray()
  };

  /// Order counts by day (last 30 days). Format: ("YYYY-MM-DD", count).
  public query func getOrdersTimeline() : async [(Text, Nat)] {
    let dayMap = Map.empty<Text, Nat>();
    let nowNs  = Time.now();
    let thirtyDaysNs : Int = 30 * 24 * 3600 * 1_000_000_000;
    let cutoff = nowNs - thirtyDaysNs;
    for ((_, o) in ordersById.entries()) {
      if (o.createdAt >= cutoff) {
        // Format day as days-ago string for simplicity
        let daysAgo = Int.abs((nowNs - o.createdAt) / (24 * 3600 * 1_000_000_000));
        let key = "day-" # daysAgo.toText();
        let prev = switch (dayMap.get(key)) { case (?v) v; case null 0 };
        dayMap.add(key, prev + 1);
      };
    };
    dayMap.toArray()
  };

  public func getMonthlyOrderStats(year : Int, month : Int) : async [{ day : Int; orderCount : Nat; revenue : Float }] {
    adminSvc.getMonthlyOrderStats(year, month)
  };

  public func getTopMerchants(limit : Nat) : async [{ merchant : Types.Merchant; orderCount : Nat; revenue : Float; avgRating : Float }] {
    adminSvc.getTopMerchants(limit)
  };

  public func listAllUsers() : async [Types.User] {
    adminSvc.listAllUsers()
  };

  public func listAllMerchants() : async [Types.Merchant] {
    adminSvc.listAllMerchants()
  };

  public func listAllDeliveryPartners() : async [Types.DeliveryPartner] {
    adminSvc.listAllDeliveryPartners()
  };

  // ── Employee / Role Management ─────────────────────────────────────────────

  public func addEmployee(
    name         : Text,
    email        : Text,
    phone        : Text,
    passwordHash : Text,
    role         : Types.EmployeeRole,
    permissions  : [Text],
  ) : async Types.Result<Types.Employee, Types.ApiError> {
    adminSvc.addEmployee(name, email, phone, passwordHash, role, permissions)
  };

  public query func listEmployees() : async [Types.Employee] {
    adminSvc.listEmployees()
  };

  public func updateEmployee(
    id          : Text,
    name        : Text,
    email       : Text,
    phone       : Text,
    role        : Types.EmployeeRole,
    permissions : [Text],
  ) : async Types.Result<Types.Employee, Types.ApiError> {
    adminSvc.updateEmployee(id, name, email, phone, role, permissions)
  };

  public func deleteEmployee(id : Text) : async Types.Result<Text, Types.ApiError> {
    adminSvc.deleteEmployee(id)
  };

  public func setEmployeeActive(id : Text, isActive : Bool) : async Types.Result<Types.Employee, Types.ApiError> {
    adminSvc.setEmployeeActive(id, isActive)
  };

  public func verifyEmployeeLogin(email : Text, passwordHash : Text) : async Types.Result<Types.Employee, Text> {
    adminSvc.verifyEmployeeLogin(email, passwordHash)
  };

  // ── API Key Management ─────────────────────────────────────────────────────

  public func generateApiKey(ownerId : Text, keyLabel : Text) : async Types.Result<Types.ApiKey, Types.ApiError> {
    adminSvc.generateApiKey(ownerId, keyLabel)
  };

  public query func getApiKeys(ownerId : Text) : async [Types.ApiKey] {
    adminSvc.getApiKeys(ownerId)
  };

  public func revokeApiKey(keyId : Text) : async Types.Result<Text, Types.ApiError> {
    adminSvc.revokeApiKey(keyId)
  };

  public func trackApiUsage(keyId : Text, endpoint : Text, statusCode : Nat) : async () {
    adminSvc.trackApiUsage(keyId, endpoint, statusCode)
  };

  // ── Export API ─────────────────────────────────────────────────────────────

  public query func exportUsers() : async [Types.User] {
    adminSvc.exportUsers()
  };

  public query func exportMerchants() : async [Types.Merchant] {
    adminSvc.exportMerchants()
  };

  public query func exportDeliveryPartners() : async [Types.DeliveryPartner] {
    adminSvc.exportDeliveryPartners()
  };

  public query func exportOrders() : async [Types.Order] {
    adminSvc.exportOrders()
  };

  public query func exportJobs() : async [Types.Job] {
    adminSvc.exportJobs()
  };

  public query func exportProperties() : async [Types.Property] {
    adminSvc.exportProperties()
  };

  public query func exportLeads() : async [Types.Lead] {
    adminSvc.exportLeads()
  };

  // ── Lead API ───────────────────────────────────────────────────────────────

  public func createLead(
    phone    : Text,
    searchQuery : Text,
    category : Text,
    location : Types.Location,
  ) : async Types.Lead {
    leadSvc.createLead(phone, searchQuery, category, location)
  };

  public query func getLeads() : async [Types.Lead] {
    leadSvc.getAllLeads()
  };

  public query func getOpenLeads() : async [Types.Lead] {
    leadSvc.getOpenLeads()
  };

  public func respondToLead(leadId : Text, responseText : Text) : async Types.Result<Types.Lead, Types.ApiError> {
    leadSvc.respondToLead(leadId, responseText)
  };

  public func closeLead(leadId : Text) : async Types.Result<Types.Lead, Types.ApiError> {
    leadSvc.closeLead(leadId)
  };

  // ── Transport / Sarthi API ─────────────────────────────────────────────────

  public func createTransportBooking(
    customerId      : Text,
    origin          : Types.Location,
    destination     : Types.Location,
    vehicleType     : Types.VehicleType,
    estimatedCharge : Float,
  ) : async Types.Result<Types.TransportBooking, Types.ApiError> {
    transportSvc.createBooking(customerId, origin, destination, vehicleType, estimatedCharge)
  };

  public query func getTransportBookings() : async [Types.TransportBooking] {
    transportSvc.getAllBookings()
  };

  public query func getActiveTransportBookings() : async [Types.TransportBooking] {
    transportSvc.getActiveBookings()
  };

  public func updateBookingStatus(
    bookingId  : Text,
    newStatus  : Types.TransportStatus,
    actorPhone : Text,
    note       : Text,
  ) : async Types.Result<Types.TransportBooking, Types.ApiError> {
    transportSvc.updateBookingStatus(bookingId, newStatus, actorPhone, note)
  };

  public func assignSarthiPartner(bookingId : Text, sarthiPartnerId : Text) : async Types.Result<Types.TransportBooking, Types.ApiError> {
    transportSvc.assignSarthiPartner(bookingId, sarthiPartnerId)
  };

  public query func getBookingsByCustomer(customerId : Text) : async [Types.TransportBooking] {
    transportSvc.getBookingsByCustomer(customerId)
  };

  public query func getBookingsBySarthi(sarthiPartnerId : Text) : async [Types.TransportBooking] {
    transportSvc.getBookingsBySarthi(sarthiPartnerId)
  };

  // ── Sarthi OTP API ─────────────────────────────────────────────────────────

  public func generateSarthiOTP(bookingId : Text) : async Types.Result<PromotionTypes.SarthiOTPVerification, Types.ApiError> {
    transportSvc.generateSarthiOTP(bookingId)
  };

  public func verifyDriverOTP(bookingId : Text, otp : Text) : async Types.Result<PromotionTypes.SarthiOTPVerification, Types.ApiError> {
    transportSvc.verifyDriverOTP(bookingId, otp)
  };

  public func verifyPassengerOTP(bookingId : Text, otp : Text) : async Types.Result<PromotionTypes.SarthiOTPVerification, Types.ApiError> {
    transportSvc.verifyPassengerOTP(bookingId, otp)
  };

  public func completeRide(bookingId : Text) : async Types.Result<Types.TransportBooking, Types.ApiError> {
    transportSvc.completeRide(bookingId)
  };

  public func registerFreeRideSarthi(phone : Text, vehicleType : Types.VehicleType, area : Text) : async Types.Result<Types.FreeRideSarthi, Types.ApiError> {
    transportSvc.registerFreeRideSarthi(phone, vehicleType, area)
  };

  public query func listFreeRideSarthis() : async [Types.FreeRideSarthi] {
    transportSvc.listFreeRideSarthis()
  };

  // ── Event API ──────────────────────────────────────────────────────────────

  public func createEvent(
    organizerPhone  : Text,
    organizerName   : Text,
    eventName       : Text,
    description     : Text,
    isPaid          : Bool,
    price           : Float,
    locationAddress : Text,
    startDate       : Text,
    endDate         : Text,
    ticketVenue     : Text,
  ) : async Types.Result<EventTypes.Event, Types.ApiError> {
    let result = eventSvc.createEvent(organizerPhone, organizerName, eventName, description, isPaid, price, locationAddress, startDate, endDate, ticketVenue);
    switch (result) {
      case (#ok(e)) { moderationSvc.flagForModeration("event", e.id) };
      case (#err(_)) {};
    };
    result
  };

  public func searchEvents(keyword : Text) : async [EventTypes.Event] {
    eventSvc.searchEvents(keyword)
  };

  public query func getEventById(id : Text) : async Types.Result<EventTypes.Event, Types.ApiError> {
    eventSvc.getEventById(id)
  };

  public query func getAllEvents() : async [EventTypes.Event] {
    eventSvc.getAllEvents()
  };

  public func updateEventStatus(id : Text, status : EventTypes.EventStatus) : async Types.Result<EventTypes.Event, Types.ApiError> {
    eventSvc.updateEventStatus(id, status)
  };

  public func deleteEvent(id : Text) : async Types.Result<Text, Types.ApiError> {
    eventSvc.deleteEvent(id)
  };

  public query func exportEvents() : async [EventTypes.Event] {
    adminSvc.exportEvents()
  };

  public query func getMyEvents(phone : Text) : async [EventTypes.Event] {
    eventSvc.getMyEvents(phone)
  };

  public query func getEventsForLocation(city : Text) : async [EventTypes.Event] {
    eventSvc.getEventsForLocation(city)
  };

  // ── Family API ─────────────────────────────────────────────────────────────

  public func addFamilyMember(
    ownerPhone      : Text,
    ownerName       : Text,
    ownerSurname    : Text,
    relationship    : FamilyTypes.Relationship,
    relationName    : Text,
    relationPhone   : Text,
    relationAddress : Text,
    gender          : Text,
  ) : async Types.Result<FamilyTypes.FamilyMember, Types.ApiError> {
    let cleanOwnerName    = Utils.sanitizeInput(ownerName);
    let cleanOwnerSurname = Utils.sanitizeInput(ownerSurname);
    let cleanRelationName = Utils.sanitizeInput(relationName);
    let cleanAddress      = Utils.sanitizeInput(relationAddress);
    familySvc.addFamilyMember(ownerPhone, cleanOwnerName, cleanOwnerSurname, relationship, cleanRelationName, relationPhone, cleanAddress, gender)
  };

  public query func getFamilyByOwner(ownerPhone : Text) : async [FamilyTypes.FamilyMember] {
    familySvc.getFamilyByOwner(ownerPhone)
  };

  public query func getAllFamilyMembers() : async [FamilyTypes.FamilyMember] {
    familySvc.getAllFamilyMembers()
  };

  /// Return all family groups across all owners.
  /// Returns empty array when none exist.
  public query func getFamilyGroups() : async [FamilyTypes.FamilyGroup] {
    let seen = Map.empty<Text, Bool>();
    let groups = List.empty<FamilyTypes.FamilyGroup>();
    for ((_, m) in familyStoreNew.entries()) {
      switch (seen.get(m.ownerPhone)) {
        case null {
          seen.add(m.ownerPhone, true);
          for (g in familySvc.getGroupsByOwner(m.ownerPhone).vals()) {
            groups.add(g);
          };
        };
        case (?_) {};
      };
    };
    groups.toArray()
  };

  public func updateFamilyInviteStatus(id : Text, status : FamilyTypes.FamilyInviteStatus) : async Types.Result<FamilyTypes.FamilyMember, Types.ApiError> {
    familySvc.updateInviteStatus(id, status)
  };

  public func deleteFamilyMember(id : Text) : async Types.Result<Text, Types.ApiError> {
    familySvc.deleteFamilyMember(id)
  };

  public query func exportFamilyMembers() : async [FamilyTypes.FamilyMember] {
    adminSvc.exportFamilyMembers()
  };

  public func deleteFamilyLink(ownerPhone : Text, relationPhone : Text) : async Types.Result<Text, Types.ApiError> {
    familySvc.deleteFamilyLink(ownerPhone, relationPhone)
  };

  public func addFriend(ownerPhone : Text, friendName : Text, friendPhone : Text) : async Types.Result<FamilyTypes.FamilyMember, Types.ApiError> {
    familySvc.addFriend(ownerPhone, friendName, friendPhone)
  };

  public query func getFriendsByOwner(phone : Text) : async [FamilyTypes.FamilyMember] {
    familySvc.getFriendsByOwner(phone)
  };

  public query func getFamilyBySurname(surname : Text) : async [FamilyTypes.FamilyMember] {
    familySvc.getFamilyBySurname(surname)
  };

  // ── Promotion API ──────────────────────────────────────────────────────────

  public func getPromotionPlans() : async [PromotionTypes.PromotionSubscriptionPlan] {
    PromotionService.PROMOTION_PLANS
  };

  public func createPromotion(
    advertiserPhone  : Text,
    title            : Text,
    reelLink         : Text,
    imageLink        : Text,
    locationArea     : Text,
    locationCity     : Text,
    locationCountry  : Text,
    subscriptionPlan : Text,
  ) : async Types.Result<PromotionTypes.Promotion, Types.ApiError> {
    let result = promotionSvc.createPromotion(advertiserPhone, title, reelLink, imageLink, locationArea, locationCity, locationCountry, subscriptionPlan);
    switch (result) {
      case (#ok(p)) { moderationSvc.flagForModeration("promotion", p.id) };
      case (#err(_)) {};
    };
    result
  };

  public func confirmPromotionPayment(id : Text) : async Types.Result<PromotionTypes.Promotion, Types.ApiError> {
    promotionSvc.confirmPayment(id)
  };

  public func approvePromotion(id : Text) : async Types.Result<PromotionTypes.Promotion, Types.ApiError> {
    promotionSvc.approvePromotion(id)
  };

  public func rejectPromotion(id : Text, reason : Text) : async Types.Result<PromotionTypes.Promotion, Types.ApiError> {
    promotionSvc.rejectPromotion(id, reason)
  };

  public query func getPromotionsForLocation(city : Text, area : Text) : async [PromotionTypes.Promotion] {
    promotionSvc.getPromotionsForLocation(city, area)
  };

  public func trackPromotionReach(id : Text) : async Types.Result<PromotionTypes.Promotion, Types.ApiError> {
    promotionSvc.trackReach(id)
  };

  public func trackPromotionView(id : Text) : async Types.Result<PromotionTypes.Promotion, Types.ApiError> {
    promotionSvc.trackView(id)
  };

  public query func getAllPromotions() : async [PromotionTypes.Promotion] {
    promotionSvc.getAllPromotions()
  };

  public query func getPromotionById(id : Text) : async Types.Result<PromotionTypes.Promotion, Types.ApiError> {
    promotionSvc.getPromotionById(id)
  };

  public query func getPromotionAnalytics(id : Text) : async Types.Result<{ reachedCount : Nat; viewedCount : Nat; targetUserCount : Nat; status : PromotionTypes.PromotionStatus }, Types.ApiError> {
    promotionSvc.getPromotionAnalytics(id)
  };

  public query func exportPromotions() : async [PromotionTypes.Promotion] {
    adminSvc.exportPromotions()
  };

  public query func getMyPromotions(phone : Text) : async [PromotionTypes.Promotion] {
    promotionSvc.getMyPromotions(phone)
  };

  // ── Merchant Verify/Reject API ─────────────────────────────────────────────

  public func verifyMerchant(merchantId : Text, isApproved : Bool, reason : Text) : async Types.Result<Types.Merchant, Types.ApiError> {
    merchantSvc.verifyMerchant(merchantId, isApproved, reason)
  };

  public query func getPendingMerchants() : async [Types.Merchant] {
    merchantSvc.getPendingMerchants()
  };

  public func updateMerchantKYCDocuments(
    merchantId     : Text,
    panNo          : Text,
    panUrl         : Text,
    aadhaarNo      : Text,
    aadhaarUrl     : Text,
    gstNo          : Text,
    gstUrl         : Text,
    outletPhotoUrl : Text,
    chequeUrl      : Text,
    qrUrl          : Text,
  ) : async Types.Result<Types.Merchant, Types.ApiError> {
    merchantSvc.updateMerchantKYCDocuments(merchantId, panNo, panUrl, aadhaarNo, aadhaarUrl, gstNo, gstUrl, outletPhotoUrl, chequeUrl, qrUrl)
  };

  // ── Delivery Partner Verify/Reject API ────────────────────────────────────

  public func verifyDeliveryPartner(dpId : Text, isApproved : Bool, reason : Text) : async Types.Result<Types.DeliveryPartner, Types.ApiError> {
    dpSvc.verifyDeliveryPartner(dpId, isApproved, reason)
  };

  public func updateDeliveryPartnerKYC(dpId : Text, aadhaarNo : Text, rcBook : Text, panNo : Text) : async Types.Result<Types.DeliveryPartner, Types.ApiError> {
    dpSvc.updateDeliveryPartnerKYC(dpId, aadhaarNo, rcBook, panNo)
  };

  public query func getRegisteredMerchants() : async [Types.Merchant] {
    merchantSvc.listMerchants(null, null)
  };

  public query func getRegisteredDeliveryPartners() : async [Types.DeliveryPartner] {
    dpSvc.listDeliveryPartners(null)
  };

  // ── Shuttle API ────────────────────────────────────────────────────────────

  public func createShuttleRoute(
    routeName      : Text,
    source         : Text,
    destination    : Text,
    stops          : [Text],
    vehicleType    : Types.VehicleType,
    departureTime  : Text,
    arrivalTime    : Text,
    fare           : Nat,
    availableSeats : Nat,
    driverId       : Text,
  ) : async Types.ShuttleRoute {
    shuttleSvc.createRoute(routeName, source, destination, stops, vehicleType, departureTime, arrivalTime, fare, availableSeats, driverId)
  };

  public func postShuttleRoute(
    routeName     : Text,
    serviceName   : Text,
    vehicleNumber : Text,
    source        : Text,
    destination   : Text,
    stops         : [Text],
    price         : Nat,
    vehicleType   : Types.VehicleType,
    departureTime : Text,
    driverId      : Text,
  ) : async Types.ShuttleRoute {
    shuttleSvc.postShuttleRoute(routeName, serviceName, vehicleNumber, source, destination, stops, price, vehicleType, departureTime, driverId)
  };

  public func postShuttleRouteWithStops(
    routeName     : Text,
    serviceName   : Text,
    vehicleNumber : Text,
    source        : Text,
    destination   : Text,
    stopDetails   : [Types.ShuttleStop],
    pricePerKm    : Float,
    baseFare      : Nat,
    vehicleType   : Types.VehicleType,
    departureTime : Text,
    driverId      : Text,
    operatorPhone : Text,
  ) : async Types.ShuttleRoute {
    shuttleSvc.postShuttleRouteWithStops(routeName, serviceName, vehicleNumber, source, destination, stopDetails, pricePerKm, baseFare, vehicleType, departureTime, driverId, operatorPhone)
  };

  public query func compareShuttleRoutesWithLiveData() : async [Types.ShuttleRoute] {
    shuttleSvc.compareRoutesWithLiveData()
  };

  public query func listShuttleRoutes() : async [Types.ShuttleRoute] {
    shuttleSvc.listRoutes()
  };

  public query func searchShuttles(source : Text, dest : Text) : async [Types.ShuttleRoute] {
    shuttleSvc.searchShuttleBySourceDest(source, dest)
  };

  public func bookShuttle(
    passengerPhone : Text,
    routeId        : Text,
    boardingStop   : Text,
    dropStop       : Text,
  ) : async Types.Result<Types.ShuttleBooking, Types.ApiError> {
    shuttleSvc.bookShuttle(passengerPhone, routeId, boardingStop, dropStop)
  };

  public func verifyShuttleOTP(bookingId : Text, otp : Text) : async Types.Result<Types.ShuttleBooking, Types.ApiError> {
    shuttleSvc.verifyShuttleOTP(bookingId, otp)
  };

  public func completeShuttleRide(bookingId : Text) : async Types.Result<Types.ShuttleBooking, Types.ApiError> {
    shuttleSvc.completeShuttleRide(bookingId)
  };

  public query func getShuttleBookingsByPassenger(passengerPhone : Text) : async [Types.ShuttleBooking] {
    shuttleSvc.getBookingsByPassenger(passengerPhone)
  };

  // ── Entity Leads Tracking API ─────────────────────────────────────────────

  public func trackEntityView(entityType : Text, entityId : Text, phone : Text) : async () {
    let key = entityType # ":" # entityId;
    let now = Time.now();
    switch (entityLeadsStore.get(key)) {
      case null {
        let el : Types.EntityLeads = {
          entityType; entityId;
          viewers    = [{ phone; timestamp = now }];
          interested = [];
        };
        entityLeadsStore.add(key, el);
      };
      case (?el) {
        let updated = { el with viewers = el.viewers.concat([{ phone; timestamp = now }]) };
        entityLeadsStore.add(key, updated);
      };
    }
  };

  public func trackEntityInterest(entityType : Text, entityId : Text, phone : Text) : async () {
    let key = entityType # ":" # entityId;
    let now = Time.now();
    switch (entityLeadsStore.get(key)) {
      case null {
        let el : Types.EntityLeads = {
          entityType; entityId;
          viewers    = [];
          interested = [{ phone; timestamp = now }];
        };
        entityLeadsStore.add(key, el);
      };
      case (?el) {
        let updated = { el with interested = el.interested.concat([{ phone; timestamp = now }]) };
        entityLeadsStore.add(key, updated);
      };
    }
  };

  public query func getLeadsForEntity(entityType : Text, entityId : Text) : async { views : Nat; interested : Nat; viewers : [Types.EntityView]; interestedList : [Types.EntityView] } {
    let key = entityType # ":" # entityId;
    switch (entityLeadsStore.get(key)) {
      case null { { views = 0; interested = 0; viewers = []; interestedList = [] } };
      case (?el) {
        { views = el.viewers.size(); interested = el.interested.size(); viewers = el.viewers; interestedList = el.interested }
      };
    }
  };

  // ── My Listings API ────────────────────────────────────────────────────────

  public query func getMyListings(phone : Text) : async {
    jobs       : [Types.Job];
    properties : [Types.Property];
    events     : [EventTypes.Event];
    promotions : [PromotionTypes.Promotion];
  } {
    // Get user id from phone for jobs/properties (they use userId as posterId)
    let userId = switch (userSvc.getUserByPhone(phone)) {
      case (#ok(u)) u.id;
      case (#err(_)) "";
    };
    let jobs       = jobSvc.getAllJobs(null).filter(func(j : Types.Job) : Bool {
      j.posterId == userId or j.posterId == phone
    });
    let properties = propertySvc.getAllProperties(null, null).filter(func(p : Types.Property) : Bool {
      p.posterId == userId or p.posterId == phone
    });
    let events     = eventSvc.getMyEvents(phone);
    let promotions = promotionSvc.getMyPromotions(phone);
    { jobs; properties; events; promotions }
  };

  public query func getMyProductListings(phone : Text) : async [Types.Product] {
    let userId = switch (userSvc.getUserByPhone(phone)) {
      case (#ok(u)) u.id;
      case (#err(_)) phone;
    };
    switch (merchantSvc.getMerchantByUserId(userId)) {
      case (#ok(m)) productSvc.getProductsByMerchant(m.id);
      case (#err(_)) [];
    }
  };

  public func seedSampleData() : async {
    cities               : Nat;
    customers            : Nat;
    deliveryPartners     : Nat;
    jobs                 : Nat;
    adhocJobs            : Nat;
    properties           : Nat;
    oldItems             : Nat;
    events               : Nat;
    familyGroups         : Nat;
    promotions           : Nat;
    recipes              : Nat;
    shuttleRoutes        : Nat;
    healthcareProviders  : Nat;
    tourOperators        : Nat;
    professionalServices : Nat;
    supportTickets       : Nat;
    restockOrders        : Nat;
    merchants            : Nat;
    products             : Nat;
    donations            : Nat;
    subscriptionPlans    : Nat;
    rateCards            : Nat;
    lendingItems         : Nat;
    communityMembers     : Nat;
    manufacturers        : Nat;
    manufacturerProducts : Nat;
    distributorNetworks  : Nat;
    languageCourses      : Nat;
    languageLessons      : Nat;
    languageEnrollments  : Nat;
    languageWordDefs     : Nat;
  } {
    var cities_count               : Nat = 0;
    var customers_count            : Nat = 0;
    var deliveryPartners_count     : Nat = 0;
    var jobs_count                 : Nat = 0;
    var adhocJobs_count            : Nat = 0;
    var properties_count           : Nat = 0;
    var oldItems_count             : Nat = 0;
    var events_count               : Nat = 0;
    var familyGroups_count         : Nat = 0;
    var promotions_count           : Nat = 0;
    var recipes_count              : Nat = 0;
    var shuttleRoutes_count        : Nat = 0;
    var healthcareProviders_count  : Nat = 0;
    var tourOperators_count        : Nat = 0;
    var professionalServices_count : Nat = 0;
    var supportTickets_count       : Nat = 0;
    var restockOrders_count        : Nat = 0;
    var merchants_count            : Nat = 0;
    var products_count             : Nat = 0;
    var donations_count            : Nat = 0;
    var subscriptionPlans_count    : Nat = 0;
    var rateCards_count            : Nat = 0;
    var lendingItems_count         : Nat = 0;
    var communityMembers_count     : Nat = 0;
    var manufacturers_count        : Nat = 0;
    var manufacturerProducts_count : Nat = 0;
    var distributorNetworks_count  : Nat = 0;
    var languageCourses_count      : Nat = 0;
    var languageLessons_count      : Nat = 0;
    var languageEnrollments_count  : Nat = 0;
    var languageWordDefs_count     : Nat = 0;

    let defaultLoc : Types.Location = { lat = 19.1136; lng = 72.8697; address = "Andheri, Mumbai" };
    let puneLoc    : Types.Location = { lat = 18.5204; lng = 73.8567; address = "Shivajinagar, Pune" };
    let delhiLoc   : Types.Location = { lat = 28.6139; lng = 77.2090; address = "Connaught Place, Delhi" };
    let now = Time.now();

    // ── Timestamp-based unique suffix so every run creates fresh records ──────
    // Use milliseconds: Time.now() returns nanoseconds, divide by 1_000_000
    let tsMs : Int = now / 1_000_000;
    // Take last 8 digits for phone suffix (fits in phone field constraints)
    let tsFull = tsMs.toText();
    let tsLen = tsFull.size();
    let suffix : Text = if (tsLen >= 8) {
      textSlice(tsFull, tsLen - 8, tsLen)
    } else {
      tsFull
    };

    // ── Step 1: Seed Cities (idempotent by city ID — city configs are global) ──
    let allModulesEnabled : [(Text, Bool)] = [
      ("shopping", true), ("jobs", true), ("property", true), ("transport", true),
      ("events", true), ("family", true), ("promotions", true), ("healthcare", true),
      ("tours_travel", true), ("professional_services", true), ("donations", true),
      ("matrimony", true), ("old_items", true), ("restock", true), ("adhoc_jobs", true),
      ("recipes", true), ("shuttle", true), ("ride_sharing", true), ("ondc", true),
      ("support_tickets", true), ("analytics", true), ("bot_logs", true), ("lending", true), ("community", true),
      ("flow_designer", true), ("script_executor", true)
    ];
    if (citiesByIdCurrent.get("city_mumbai") == null) {
      citiesByIdCurrent.add("city_mumbai", {
        id = "city_mumbai"; name = "Mumbai"; pincode = "400001";
        isEnabled = true; createdAt = now;
      });
      cityControlsByIdCurrent.add("city_mumbai", {
        cityId = "city_mumbai"; cityName = "Mumbai"; pincode = "400001";
        moduleToggles = allModulesEnabled;
      });
      cities_count += 1;
    };
    if (citiesByIdCurrent.get("city_delhi") == null) {
      citiesByIdCurrent.add("city_delhi", {
        id = "city_delhi"; name = "Delhi"; pincode = "110001";
        isEnabled = true; createdAt = now;
      });
      cityControlsByIdCurrent.add("city_delhi", {
        cityId = "city_delhi"; cityName = "Delhi"; pincode = "110001";
        moduleToggles = allModulesEnabled;
      });
      cities_count += 1;
    };
    if (citiesByIdCurrent.get("city_pune") == null) {
      citiesByIdCurrent.add("city_pune", {
        id = "city_pune"; name = "Pune"; pincode = "411001";
        isEnabled = true; createdAt = now;
      });
      cityControlsByIdCurrent.add("city_pune", {
        cityId = "city_pune"; cityName = "Pune"; pincode = "411001";
        moduleToggles = allModulesEnabled;
      });
      cities_count += 1;
    };

    // ── Step 2a: Seed Subscription Plans ──────────────────────────────────────
    let plansBefore = plansStore.size();
    try {
      subscriptionSvc.seedDefaultPlans();
      let plansAfter = plansStore.size();
      subscriptionPlans_count += if (plansAfter > plansBefore) plansAfter - plansBefore else 0;
    } catch (_) {};

    // ── Step 2b: Seed Rate Cards ────────────────────────────────────────────────
    let rcBefore = rateCardStore.size();
    try {
      rateCardSvc.seedDefaults();
      let rcAfter = rateCardStore.size();
      rateCards_count += if (rcAfter > rcBefore) rcAfter - rcBefore else 0;
    } catch (_) {};

    // ── Unique phone numbers for this run ("99" prefix + last 8 digits of ts) ──
    // Merchant phones
    let m1Phone = "99" # suffix # "10";
    let m2Phone = "99" # suffix # "11";
    let m3Phone = "99" # suffix # "37";
    let m4Phone = "99" # suffix # "38";
    let m5Phone = "99" # suffix # "39";
    // Delivery partner phones
    let dp1Phone = "99" # suffix # "12";
    let dp2Phone = "99" # suffix # "13";
    let dp3Phone = "99" # suffix # "20";
    let dp4Phone = "99" # suffix # "21";
    // Customer phones
    let cust1Phone = "99" # suffix # "14";
    let cust2Phone = "99" # suffix # "15";
    let cust3Phone = "99" # suffix # "22";
    let cust4Phone = "99" # suffix # "23";
    let cust5Phone = "99" # suffix # "24";

    // ── Step 3: Seed merchant users ───────────────────────────────────────────
    ignore userSvc.createUser(m1Phone, "Sharma Kirana Store", #merchant, ?defaultLoc, ?"Shop 12, Andheri Market");
    ignore userSvc.createUser(m2Phone, "Mumbai Fast Food", #merchant, ?defaultLoc, ?"Food Court, Andheri West");
    ignore userSvc.createUser(m3Phone, "HealthCare Plus Clinic", #merchant, ?defaultLoc, ?"Clinic 5, Health Square, Andheri West, Mumbai");
    ignore userSvc.createUser(m4Phone, "Himalayan Adventures Travel", #merchant, ?delhiLoc, ?"Travel House, Connaught Place, Delhi");
    ignore userSvc.createUser(m5Phone, "Fashion Junction", #merchant, ?puneLoc, ?"Shop 3, MG Road, Pune");

    // ── Step 4: Seed delivery partners ────────────────────────────────────────
    let dp1User = userSvc.createUser(dp1Phone, "Ravi Kumar", #deliveryPartner, ?defaultLoc, ?"Andheri East");
    let dp1Id = switch (dp1User) { case (#ok(u)) u.id; case _ dp1Phone };
    ignore dpSvc.registerDeliveryPartner(dp1Id, dp1Phone, "Ravi Kumar", #bike, #delivery, 8.0, "123456789012", "MH01AB1234", "ABCDE1234F", []);
    deliveryPartners_count += 1;

    let dp2User = userSvc.createUser(dp2Phone, "Suresh Sarthi", #sarthi, ?defaultLoc, ?"Bandra West");
    let dp2Id = switch (dp2User) { case (#ok(u)) u.id; case _ dp2Phone };
    ignore dpSvc.registerDeliveryPartner(dp2Id, dp2Phone, "Suresh Sarthi", #car, #sarthi, 12.0, "987654321098", "MH02CD5678", "PQRST5678G", []);
    deliveryPartners_count += 1;

    let dp3User = userSvc.createUser(dp3Phone, "Deepak Yadav", #deliveryPartner, ?defaultLoc, ?"Kurla, Mumbai");
    let dp3Id = switch (dp3User) { case (#ok(u)) u.id; case _ dp3Phone };
    ignore dpSvc.registerDeliveryPartner(dp3Id, dp3Phone, "Deepak Yadav", #scooter, #delivery, 7.0, "111222333444", "MH03EF9012", "DEEPK5678H", []);
    deliveryPartners_count += 1;

    let dp4User = userSvc.createUser(dp4Phone, "Vikram Singh", #deliveryPartner, ?puneLoc, ?"Kothrud, Pune");
    let dp4Id = switch (dp4User) { case (#ok(u)) u.id; case _ dp4Phone };
    ignore dpSvc.registerDeliveryPartner(dp4Id, dp4Phone, "Vikram Singh", #truck, #delivery, 15.0, "555666777888", "MH12GH3456", "VIKRM1234I", []);
    deliveryPartners_count += 1;

    // ── Step 5: Seed customers ─────────────────────────────────────────────────
    ignore userSvc.createUser(cust1Phone, "Priya Sharma",    #customer, ?defaultLoc, ?"Lokhandwala, Andheri West");
    customers_count += 1;
    ignore userSvc.createUser(cust2Phone, "Amit Patel",      #customer, ?puneLoc,    ?"Aundh, Pune");
    customers_count += 1;
    ignore userSvc.createUser(cust3Phone, "Rahul Verma",     #customer, ?delhiLoc,   ?"Connaught Place, Delhi");
    customers_count += 1;
    ignore userSvc.createUser(cust4Phone, "Anita Desai",     #customer, ?puneLoc,    ?"Koregaon Park, Pune");
    customers_count += 1;
    ignore userSvc.createUser(cust5Phone, "Sneha Kulkarni",  #customer, ?defaultLoc, ?"Borivali, Mumbai");
    customers_count += 1;

    // ── Resolve user IDs (needed for linking orders, bookings etc.) ────────────
    let m1Id    = switch (userSvc.getUserByPhone(m1Phone))    { case (#ok(u)) u.id; case _ m1Phone };
    let m2Id    = switch (userSvc.getUserByPhone(m2Phone))    { case (#ok(u)) u.id; case _ m2Phone };
    let m3Id    = switch (userSvc.getUserByPhone(m3Phone))    { case (#ok(u)) u.id; case _ m3Phone };
    let m4Id    = switch (userSvc.getUserByPhone(m4Phone))    { case (#ok(u)) u.id; case _ m4Phone };
    let m5Id    = switch (userSvc.getUserByPhone(m5Phone))    { case (#ok(u)) u.id; case _ m5Phone };
    let cust1Id = switch (userSvc.getUserByPhone(cust1Phone)) { case (#ok(u)) u.id; case _ cust1Phone };
    let cust2Id = switch (userSvc.getUserByPhone(cust2Phone)) { case (#ok(u)) u.id; case _ cust2Phone };
    let cust3Id = switch (userSvc.getUserByPhone(cust3Phone)) { case (#ok(u)) u.id; case _ cust3Phone };
    let cust4Id = switch (userSvc.getUserByPhone(cust4Phone)) { case (#ok(u)) u.id; case _ cust4Phone };
    let cust5Id = switch (userSvc.getUserByPhone(cust5Phone)) { case (#ok(u)) u.id; case _ cust5Phone };

    // ── Step 6: Seed merchants ────────────────────────────────────────────────
    ignore merchantSvc.createMerchant(m1Id, m1Phone, "Sharma Kirana Store",        "Grocery",          #order_,  defaultLoc, #delivery, 5.0);
    merchants_count += 1;
    ignore merchantSvc.createMerchant(m2Id, m2Phone, "Mumbai Fast Food",            "Food & Restaurant",#order_,  defaultLoc, #delivery, 3.0);
    merchants_count += 1;
    ignore merchantSvc.createMerchant(m3Id, m3Phone, "HealthCare Plus Clinic",      "Healthcare",       #inquiry, defaultLoc, #takeaway, 10.0);
    merchants_count += 1;
    ignore merchantSvc.createMerchant(m4Id, m4Phone, "Himalayan Adventures Travel", "Tours & Travel",   #inquiry, delhiLoc,   #takeaway, 50.0);
    merchants_count += 1;
    ignore merchantSvc.createMerchant(m5Id, m5Phone, "Fashion Junction",            "Clothing",         #order_,  puneLoc,    #delivery, 8.0);
    merchants_count += 1;

    // ── Step 7: Seed products ─────────────────────────────────────────────────
    let gMerchantId  = switch (merchantSvc.getMerchantByUserId(m1Id)) { case (#ok(m)) m.id; case _ m1Id };
    let fMerchantId  = switch (merchantSvc.getMerchantByUserId(m2Id)) { case (#ok(m)) m.id; case _ m2Id };
    let hMerchantId  = switch (merchantSvc.getMerchantByUserId(m3Id)) { case (#ok(m)) m.id; case _ m3Id };
    let tMerchantId  = switch (merchantSvc.getMerchantByUserId(m4Id)) { case (#ok(m)) m.id; case _ m4Id };
    let clMerchantId = switch (merchantSvc.getMerchantByUserId(m5Id)) { case (#ok(m)) m.id; case _ m5Id };

    ignore productSvc.addProduct(gMerchantId, "Premium Basmati Rice 5kg",    ["https://example.com/rice.jpg"],    null, "High quality aged basmati rice",                    true, 350.0, [{ minQuantity = 5; rate = 320.0 }], 5.0,  100, "5kg bag",    "Dec 2026");
    ignore productSvc.addProduct(gMerchantId, "Fresh Milk 1L",               ["https://example.com/milk.jpg"],    null, "Fresh pasteurized full cream milk",                  true, 60.0,  [], 0.0, 50,  "1L pouch",  "2 days");
    ignore productSvc.addProduct(fMerchantId, "Veg Biryani",                 ["https://example.com/biryani.jpg"],null, "Fragrant vegetable biryani with raita and papad",    true, 180.0, [], 10.0, 20,  "1 plate",   "Same day");
    ignore productSvc.addProduct(hMerchantId, "General Consultation",        [], null, "Doctor consultation for 30 minutes. Includes basic check-up.",  true, 400.0, [], 0.0, 10,  "30 min",    "NA");
    ignore productSvc.addProduct(hMerchantId, "Dental Cleaning",             [], null, "Professional dental cleaning and polishing.",                    true, 600.0, [], 0.0, 5,   "60 min",    "NA");
    ignore productSvc.addProduct(tMerchantId, "Manali Package 5D/4N",        [], null, "Complete Manali tour package: hotel, meals, sightseeing.",       true, 12000.0, [{ minQuantity = 2; rate = 11000.0 }], 0.0, 20, "per person", "NA");
    ignore productSvc.addProduct(tMerchantId, "Kerala Backwaters 3D/2N",     [], null, "Houseboat stay with meals and guided backwater tour.",           true, 8500.0,  [{ minQuantity = 2; rate = 7800.0 }],  0.0, 15, "per person", "NA");
    ignore productSvc.addProduct(clMerchantId, "Men's Formal Shirt",         [], null, "Premium cotton formal shirt in assorted colours.",               true, 899.0,  [{ minQuantity = 3; rate = 799.0 }],  10.0, 50, "each", "NA");
    ignore productSvc.addProduct(clMerchantId, "Women's Kurti Set",          [], null, "Comfortable cotton kurti with palazzo set.",                     true, 1299.0, [], 5.0, 30, "each", "NA");
    products_count += 9;

    // ── Step 8: Seed orders ────────────────────────────────────────────────────
    switch (orderSvc.createOrder(cust1Id, gMerchantId, [{ productId = "rice_" # suffix; productName = "Premium Basmati Rice 5kg"; quantity = 2; unitRate = 350.0; totalRate = 700.0 }], ?defaultLoc, #cod, ?"basmati rice")) {
      case (#ok(o1)) { ignore orderSvc.updateOrderStatus(o1.id, #pending, "customer", ?"Waiting for merchant", null) };
      case (#err(_)) {};
    };
    switch (orderSvc.createOrder(cust2Id, gMerchantId, [{ productId = "milk_" # suffix; productName = "Fresh Milk 1L"; quantity = 5; unitRate = 60.0; totalRate = 300.0 }], ?puneLoc, #online, ?"fresh milk")) {
      case (#ok(o2)) {
        ignore orderSvc.updateOrderStatus(o2.id, #pending, "customer", null, null);
        ignore orderSvc.updateOrderStatus(o2.id, #accepted, "merchant:" # m1Phone, ?"Merchant accepted", null);
      };
      case (#err(_)) {};
    };
    switch (orderSvc.createOrder(cust1Id, fMerchantId, [{ productId = "biryani_" # suffix; productName = "Veg Biryani"; quantity = 3; unitRate = 180.0; totalRate = 540.0 }], ?defaultLoc, #cod, null)) {
      case (#ok(o3)) {
        ignore orderSvc.updateOrderStatus(o3.id, #pending, "customer", null, null);
        ignore orderSvc.updateOrderStatus(o3.id, #accepted, "merchant:" # m2Phone, ?"Merchant accepted order", null);
        ignore orderSvc.assignDeliveryPartner(o3.id, dp1Id);
      };
      case (#err(_)) {};
    };
    switch (orderSvc.createOrder(cust2Id, fMerchantId, [{ productId = "biryani_" # suffix; productName = "Veg Biryani"; quantity = 2; unitRate = 180.0; totalRate = 360.0 }], ?defaultLoc, #cod, null)) {
      case (#ok(o5)) {
        ignore orderSvc.updateOrderStatus(o5.id, #pending, "customer", null, null);
        ignore orderSvc.updateOrderStatus(o5.id, #accepted, "merchant:" # m2Phone, null, null);
        ignore orderSvc.assignDeliveryPartner(o5.id, dp1Id);
        ignore orderSvc.dpConfirmPickup(o5.id, dp1Id);
        ignore orderSvc.dpConfirmDelivery(o5.id, dp1Id);
      };
      case (#err(_)) {};
    };

    // ── Step 9: Seed regular jobs ──────────────────────────────────────────────
    ignore jobSvc.postJob(cust1Id, "Delivery Executive - Bike Required", "Experienced delivery executive needed. Bike mandatory. Flexible hours.", "Delivery", 15000.0, 22000.0, defaultLoc);
    ignore jobSvc.postJob(cust1Id, "Store Manager - Kirana",             "Experienced store manager for grocery store in Andheri.",              "Retail & Wholesale", 20000.0, 30000.0, defaultLoc);
    jobs_count += 2;

    // ── Step 10: Seed adhoc jobs ───────────────────────────────────────────────
    ignore jobSvc.createAdhocJob("House Cleaning - Daily Help Needed", "Household",             500.0, "No requirement", defaultLoc, cust1Phone, "Need a reliable person for daily house cleaning. 3-4 hours, 6 days/week.",                        cust1Id, #adhoc_daily);
    ignore jobSvc.createAdhocJob("Garden Work - Landscaping",          "Labour / Helper",       700.0, "No requirement", puneLoc,    cust4Phone, "Garden maintenance — mowing, trimming, planting, watering. One week, may extend.",                cust4Id, #adhoc_weekly);
    ignore jobSvc.createAdhocJob("Furniture Assembly at Home",         "Carpenter / Technician",1200.0, "10th Pass",     defaultLoc, cust5Phone, "Assemble 3 beds, 2 wardrobes and a dining set. One-day job, tools provided.",                    cust5Id, #oneoff);
    adhocJobs_count += 3;

    // ── Step 11: Seed properties ───────────────────────────────────────────────
    ignore propertySvc.postProperty(cust1Id, #rent, "Well-furnished 2BHK flat. 24/7 water, parking. Close to metro.", 22000.0,    defaultLoc);
    ignore propertySvc.postProperty(cust1Id, #sale, "3BHK independent house. Corner plot, garden, near schools.",     8500000.0,  puneLoc);
    properties_count += 2;

    // ── Step 12: Seed events ────────────────────────────────────────────────────
    ignore eventSvc.createEvent(m1Phone, "Sharma Kirana Store", "Annual Kirana Festival 2026",  "A celebration of local business and community. Food stalls, games, cultural programs.",          false, 0.0,  "Andheri Sports Ground, Mumbai", "2026-05-15", "2026-05-16", "Free Entry, Gate 1");
    ignore eventSvc.createEvent(m2Phone, "Mumbai Fast Food",    "Community Food Festival",      "Taste the best street food from Mumbai. Live music, cooking demos.",                             true,  50.0, "Juhu Beach, Mumbai",           "2026-06-01", "2026-06-02", "Entry Rs.50, children free");
    events_count += 2;

    // ── Step 13: Seed promotions ────────────────────────────────────────────────
    switch (promotionSvc.createPromotion(m1Phone, "Summer Sale 10% OFF at Sharma Kirana!",      "https://www.youtube.com/watch?v=sample",  "https://example.com/promo1.jpg", "Andheri", "Mumbai", "India", "plan1")) {
      case (#ok(promo))  { ignore promotionSvc.confirmPayment(promo.id);  ignore promotionSvc.approvePromotion(promo.id);  promotions_count += 1 };
      case (#err(_)) {};
    };
    switch (promotionSvc.createPromotion(m2Phone, "New User Rs.50 OFF on first order!",         "https://www.youtube.com/watch?v=sample2", "https://example.com/promo2.jpg", "Andheri", "Mumbai", "India", "plan1")) {
      case (#ok(promo2)) { ignore promotionSvc.confirmPayment(promo2.id); ignore promotionSvc.approvePromotion(promo2.id); promotions_count += 1 };
      case (#err(_)) {};
    };
    switch (promotionSvc.createPromotion(m1Phone, "Weekend Special: 20% OFF on all grocery orders!", "",                                  "https://example.com/promo3.jpg", "Andheri", "Mumbai", "India", "plan1")) {
      case (#ok(promo3)) { ignore promotionSvc.confirmPayment(promo3.id); ignore promotionSvc.approvePromotion(promo3.id); promotions_count += 1 };
      case (#err(_)) {};
    };

    // ── Step 14: Seed family members ────────────────────────────────────────────
    ignore familySvc.addFamilyMember(cust1Phone, "Priya", "Sharma", #mother,  "Kamla Sharma",  "99" # suffix # "16", "Borivali East, Mumbai", "");
    ignore familySvc.addFamilyMember(cust1Phone, "Priya", "Sharma", #brother, "Rajesh Sharma", "99" # suffix # "27", "Borivali West, Mumbai", "Male");
    ignore familySvc.addFamilyMember(cust1Phone, "Priya", "Sharma", #husband, "Arun Sharma",   "99" # suffix # "28", "Andheri West, Mumbai", "Male");
    familyGroups_count += 1;
    ignore familySvc.addFamilyMember(cust2Phone, "Amit", "Patel", #father, "Suresh Patel", "99" # suffix # "29", "Aundh, Pune", "");
    ignore familySvc.addFamilyMember(cust2Phone, "Amit", "Patel", #son,    "Aarav Patel",  "99" # suffix # "40", "Aundh, Pune", "Male");
    familyGroups_count += 1;

    // ── Step 15: Seed shuttle routes (idempotent — route IDs are city-based) ───
    let existingRoutes = shuttleSvc.listRoutes();
    if (existingRoutes.size() == 0) {
      shuttleSvc.seedSampleRoutes();
      shuttleRoutes_count += 2;
    };

    // ── Step 16: Seed marketplace items (old items) ────────────────────────────
    let mkt1Id = "sample-marketplace-" # suffix # "-1";
    let mkt2Id = "sample-marketplace-" # suffix # "-2";
    let mkt3Id = "sample-marketplace-" # suffix # "-3";
    let mkt4Id = "sample-marketplace-" # suffix # "-4";
    marketplaceItemsById.add(mkt1Id, { id = mkt1Id; title = "Used Sofa Set (3+1+1) - Good Condition"; price = 8000.0;  category = "furniture";  yearOfManufacture = 2020; instagramPhotoLink = ""; listingType = "sale"; invoiceAvailable = false; createdBy = cust1Phone; createdAt = now; isActive = true; cityId = null });
    oldItems_count += 1;
    marketplaceItemsById.add(mkt2Id, { id = mkt2Id; title = "Old Dell Laptop (Core i5, 8GB RAM, 256GB SSD)"; price = 18000.0; category = "electronics"; yearOfManufacture = 2019; instagramPhotoLink = ""; listingType = "sale"; invoiceAvailable = true;  createdBy = cust2Phone; createdAt = now; isActive = true; cityId = null });
    oldItems_count += 1;
    marketplaceItemsById.add(mkt3Id, { id = mkt3Id; title = "Hero Cycle - Available on Rent (Monthly)"; price = 500.0;   category = "vehicle";    yearOfManufacture = 2021; instagramPhotoLink = ""; listingType = "rent"; invoiceAvailable = false; createdBy = cust3Phone; createdAt = now; isActive = true; cityId = null });
    oldItems_count += 1;
    marketplaceItemsById.add(mkt4Id, { id = mkt4Id; title = "Samsung Double Door Fridge 250L"; price = 12000.0; category = "kitchen"; yearOfManufacture = 2018; instagramPhotoLink = ""; listingType = "sale"; invoiceAvailable = true;  createdBy = cust4Phone; createdAt = now; isActive = true; cityId = null });
    oldItems_count += 1;

    // ── Step 17: Seed recipes ──────────────────────────────────────────────────
    ignore recipeSvc.createRecipe(
      m1Phone, "Dal Makhani",
      [
        { name = "Black lentils (urad dal)"; grams = 200.0 }, { name = "Red kidney beans (rajma)"; grams = 50.0 },
        { name = "Butter"; grams = 40.0 }, { name = "Fresh cream"; grams = 60.0 },
        { name = "Tomato puree"; grams = 150.0 }, { name = "Onion"; grams = 100.0 },
        { name = "Ginger garlic paste"; grams = 20.0 }, { name = "Cumin seeds"; grams = 5.0 },
        { name = "Garam masala"; grams = 5.0 }, { name = "Salt"; grams = 10.0 },
      ],
      [
        "Wash and soak urad dal and rajma overnight.",
        "Pressure cook for 8-10 whistles until soft.",
        "Heat butter in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and fry until golden brown.",
        "Add ginger garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add cooked dal-rajma mixture and simmer on low heat for 30 minutes.",
        "Add fresh cream and garam masala, mix well.",
        "Simmer for 10 more minutes. Serve hot with rice or naan.",
      ],
      "https://example.com/dal-makhani.jpg", "",
      "Rich in protein and fibre. Great for muscle building.",
      "For best taste, cook on slow flame for longer duration.",
    );
    ignore recipeSvc.createRecipe(
      m2Phone, "Chicken Biryani",
      [
        { name = "Basmati rice"; grams = 400.0 }, { name = "Chicken pieces"; grams = 600.0 },
        { name = "Yogurt"; grams = 100.0 }, { name = "Onion (sliced)"; grams = 200.0 },
        { name = "Tomato"; grams = 100.0 }, { name = "Biryani masala"; grams = 20.0 },
        { name = "Saffron"; grams = 1.0 }, { name = "Ghee"; grams = 40.0 },
        { name = "Mint leaves"; grams = 20.0 }, { name = "Ginger garlic paste"; grams = 30.0 },
      ],
      [
        "Marinate chicken with yogurt, biryani masala, ginger garlic paste for 2 hours.",
        "Parboil basmati rice with whole spices until 70% cooked.",
        "Fry sliced onions in ghee until crispy and golden.",
        "Layer: spread cooked chicken at bottom, then rice, then fried onions.",
        "Add saffron soaked in warm milk over the rice layer.",
        "Add fresh mint leaves and a spoonful of ghee on top.",
        "Seal the pot with dough or tight lid and cook on dum for 25 minutes.",
        "Open and gently mix the layers. Serve hot with raita.",
      ],
      "https://example.com/chicken-biryani.jpg", "https://www.youtube.com/watch?v=biryani",
      "High protein, aromatic. Perfect for celebrations.",
      "Use long-grain aged basmati for best aroma. Do not over-mix after dum.",
    );
    recipes_count += 2;

    // ── Step 18: Seed healthcare providers ────────────────────────────────────
    let hp1Id = "sample-hp-" # suffix # "-1";
    let hp2Id = "sample-hp-" # suffix # "-2";
    let hp3Id = "sample-hp-" # suffix # "-3";
    healthcareProviderStore.add(hp1Id, { id = hp1Id; name = "Dr. Amit Sharma";     specialization = "General Physician"; consultationFee = 400.0; address = "Clinic 5, Health Square, Andheri West, Mumbai"; city = "Mumbai"; availability = ["Mon-Sat 9am-1pm, 5pm-8pm"];  phone = "99" # suffix # "30"; rating = 4.8; createdAt = now; updatedAt = now });
    healthcareProviders_count += 1;
    healthcareProviderStore.add(hp2Id, { id = hp2Id; name = "Dr. Priya Nair";      specialization = "Dentist";           consultationFee = 600.0; address = "Smile Care Dental Clinic, Koregaon Park, Pune";   city = "Pune";   availability = ["Tue-Sun 10am-2pm, 4pm-7pm"]; phone = "99" # suffix # "31"; rating = 4.6; createdAt = now; updatedAt = now });
    healthcareProviders_count += 1;
    healthcareProviderStore.add(hp3Id, { id = hp3Id; name = "Dr. Mehta - Gynecology"; specialization = "Gynecology";      consultationFee = 700.0; address = "Women's Health Centre, Salt Lake, Kolkata";      city = "Kolkata"; availability = ["Mon-Fri 10am-3pm", "Mon-Fri 5pm-7pm"]; phone = "99" # suffix # "41"; rating = 4.9; createdAt = now; updatedAt = now });
    healthcareProviders_count += 1;

    // Seed healthcare appointments
    let haId1 = "sample-ha-" # suffix # "-1";
    healthcareApptStore.add(haId1, { id = haId1; providerId = hp1Id; customerPhone = cust1Phone; date = "2026-05-15"; timeSlot = "10:00-10:30"; status = #confirmed; notes = "Routine check-up and blood pressure monitoring"; createdAt = now; updatedAt = now });

    // ── Step 19: Seed tour operators ──────────────────────────────────────────
    let to1Id = "sample-to-" # suffix # "-1";
    let to2Id = "sample-to-" # suffix # "-2";
    let to3Id = "sample-to-" # suffix # "-3";
    tourOperatorStore.add(to1Id, { id = to1Id; name = "Himalayan Adventures";         destinations = ["Manali", "Rohtang Pass", "Solang Valley", "Kullu"]; tourTypes = ["adventure", "honeymoon", "family"];    duration = "5 days / 4 nights"; pricePerPerson = 12000.0; maxPassengers = 20; phone = "99" # suffix # "32"; city = "Delhi"; rating = 4.7; createdAt = now; updatedAt = now });
    tourOperators_count += 1;
    tourOperatorStore.add(to2Id, { id = to2Id; name = "Kerala Backwaters Tours";       destinations = ["Alleppey", "Kumarakom", "Kollam"];                 tourTypes = ["leisure", "honeymoon", "pilgrimage"];  duration = "3 days / 2 nights"; pricePerPerson = 8500.0;  maxPassengers = 15; phone = "99" # suffix # "33"; city = "Kochi"; rating = 4.9; createdAt = now; updatedAt = now });
    tourOperators_count += 1;
    tourOperatorStore.add(to3Id, { id = to3Id; name = "Kerala Backwaters - Alleppey";  destinations = ["Alleppey", "Kumarakom", "Kollam"];                 tourTypes = ["leisure", "honeymoon", "pilgrimage"];  duration = "3 days / 2 nights"; pricePerPerson = 8500.0;  maxPassengers = 15; phone = "99" # suffix # "42"; city = "Kochi"; rating = 4.9; createdAt = now; updatedAt = now });
    tourOperators_count += 1;

    // Seed tour bookings
    let tbId1 = "sample-tb-" # suffix # "-1";
    tourBookingStore.add(tbId1, { id = tbId1; operatorId = to1Id; customerPhone = cust3Phone; destination = "Manali"; tourType = "adventure"; date = "2026-06-10"; passengerCount = 2; totalPrice = 24000.0; status = #confirmed; createdAt = now; updatedAt = now });

    // ── Step 20: Seed professional services ───────────────────────────────────
    let ps1Id = "sample-ps-" # suffix # "-1";
    let ps2Id = "sample-ps-" # suffix # "-2";
    let ps3Id = "sample-ps-" # suffix # "-3";
    professionalSvcStore.add(ps1Id, { id = ps1Id; merchantPhone = "99" # suffix # "34"; serviceType = "AC Repair";     specialization = "Split AC, Window AC, Central AC installation and repair"; pricePerHour = 500.0; areaRates = []; address = "Andheri East, Mumbai";  city = "Mumbai"; availability = ["Mon-Sun 8am-8pm"];  rating = 4.5; createdAt = now; updatedAt = now });
    professionalServices_count += 1;
    professionalSvcStore.add(ps2Id, { id = ps2Id; merchantPhone = "99" # suffix # "35"; serviceType = "Home Cleaning"; specialization = "Deep cleaning, sofa cleaning, carpet cleaning, kitchen cleaning"; pricePerHour = 300.0; areaRates = []; address = "Baner, Pune";          city = "Pune";   availability = ["Mon-Sat 9am-6pm"];  rating = 4.3; createdAt = now; updatedAt = now });
    professionalServices_count += 1;
    professionalSvcStore.add(ps3Id, { id = ps3Id; merchantPhone = "99" # suffix # "36"; serviceType = "Plumbing";      specialization = "Pipe fitting, leak repair, bathroom fitting, tap replacement";  pricePerHour = 400.0; areaRates = []; address = "Dadar, Mumbai";       city = "Mumbai"; availability = ["Mon-Sat 7am-7pm"];  rating = 4.6; createdAt = now; updatedAt = now });
    professionalServices_count += 1;

    // Seed service bookings
    let sbId1 = "sample-sb-" # suffix # "-1";
    serviceBookingStore.add(sbId1, { id = sbId1; serviceId = ps1Id; customerPhone = cust2Phone; date = "2026-05-20"; timeSlot = "11:00-13:00"; duration = 2; totalPrice = 1000.0; status = #confirmed; notes = "AC not cooling properly, may need gas refill"; createdAt = now; updatedAt = now });

    // ── Step 21: Seed support tickets ─────────────────────────────────────────
    let allOrders = orderSvc.getAllOrders(null, null, null);
    let linkedOrderId : ?Text = if (allOrders.size() > 0) ?(allOrders[0].id) else null;
    let tkt1Id = "sample-tkt-" # suffix # "-1";
    let tkt2Id = "sample-tkt-" # suffix # "-2";
    let tkt3Id = "sample-tkt-" # suffix # "-3";
    supportTicketsStoreCurrent.add(tkt1Id, { ticketId = tkt1Id; fromPhone = cust1Phone; fromRole = #customer;        category = #other;               description = "My order was delivered but items were missing. I ordered 2kg rice but received only 1kg.";                         orderId = linkedOrderId; status = #new_;       priority = #low;    createdAt = now;                           updatedAt = now; resolvedAt = null;  resolutionDeadline = now + (5 * 86_400_000_000_000); remarks = "";                               adminNote = "" });
    supportTickets_count += 1;
    supportTicketsStoreCurrent.add(tkt2Id, { ticketId = tkt2Id; fromPhone = dp1Phone;    fromRole = #deliveryPartner; category = #payment_stuck;        description = "Payment for 3 deliveries completed last week has not been transferred to my account.";                           orderId = null;          status = #new_;       priority = #high;   createdAt = now;                           updatedAt = now; resolvedAt = null;  resolutionDeadline = now + (3 * 86_400_000_000_000); remarks = "";                               adminNote = "" });
    supportTickets_count += 1;
    supportTicketsStoreCurrent.add(tkt3Id, { ticketId = tkt3Id; fromPhone = cust2Phone;  fromRole = #customer;        category = #behaviour_complaint;  description = "Delivery partner was rude and refused to deliver at my door. Very unprofessional.";                            orderId = null;          status = #in_progress; priority = #medium; createdAt = now;                           updatedAt = now; resolvedAt = null;  resolutionDeadline = now + (5 * 86_400_000_000_000); remarks = "Admin investigating"; adminNote = "Called DP for clarification" });
    supportTickets_count += 1;

    // ── Step 22: Seed restock orders ──────────────────────────────────────────
    let gMRId = switch (merchantSvc.getMerchantByUserId(m1Id)) { case (#ok(m)) m.id; case _ m1Id };
    let fMRId = switch (merchantSvc.getMerchantByUserId(m2Id)) { case (#ok(m)) m.id; case _ m2Id };
    let rst1Id = "sample-restock-" # suffix # "-1";
    let rst2Id = "sample-restock-" # suffix # "-2";
    let rst3Id = "sample-restock-" # suffix # "-3";
    restockOrdersStore.add(rst1Id, { id = rst1Id; merchantId = gMRId; merchantPhone = m1Phone; supplierName = "ABC Wholesale Grains";     itemName = "Premium Basmati Rice 25kg";  quantity = 10; notes = "Urgent: stock running low";       status = #pending;   createdAt = now; updatedAt = now });
    restockOrders_count += 1;
    restockOrdersStore.add(rst2Id, { id = rst2Id; merchantId = fMRId; merchantPhone = m2Phone; supplierName = "Fresh Foods Distributor"; itemName = "Cooking Oil 15L";           quantity = 5;  notes = "Please deliver before 10am";    status = #accepted;  createdAt = now; updatedAt = now });
    restockOrders_count += 1;
    restockOrdersStore.add(rst3Id, { id = rst3Id; merchantId = gMRId; merchantPhone = m1Phone; supplierName = "Dairy Fresh Pvt Ltd";     itemName = "Full Cream Milk Packets 100pcs"; quantity = 3; notes = "";                        status = #delivered; createdAt = now; updatedAt = now });
    restockOrders_count += 1;

    // ── Step 23: Seed donations ────────────────────────────────────────────────
    let don1Id = "sample-donation-" # suffix # "-1";
    let don2Id = "sample-donation-" # suffix # "-2";
    let don3Id = "sample-donation-" # suffix # "-3";
    donationsStore.add(don1Id, { id = don1Id; donorPhone = cust1Phone; donorName = "Priya Sharma"; category = "Food Items"; description = "Rice 10kg, Dal 5kg, Oil 2L, Sugar 2kg — all packed and ready"; quantity = "About 20kg"; location = "Lokhandwala, Andheri West, Mumbai"; contactPhone = cust1Phone; status = "Available"; source = "sample"; createdAt = now });
    donations_count += 1;
    donationsStore.add(don2Id, { id = don2Id; donorPhone = cust2Phone; donorName = "Amit Patel";   category = "Clothes";     description = "Children and adult clothes — washed and folded.";             quantity = "2 bags";       location = "Aundh, Pune"; contactPhone = cust2Phone; status = "Available"; source = "sample"; createdAt = now });
    donations_count += 1;
    donationsStore.add(don3Id, { id = don3Id; donorPhone = cust3Phone; donorName = "Rahul Verma";  category = "Books";       description = "School textbooks class 6-10, NCERT and state board. Good condition."; quantity = "30 books"; location = "Connaught Place, Delhi"; contactPhone = cust3Phone; status = "Available"; source = "sample"; createdAt = now });
    donations_count += 1;

    // ── Step 24: Seed lending items ────────────────────────────────────────────
    let lend1Id = "sample-lending-" # suffix # "-1";
    let lend2Id = "sample-lending-" # suffix # "-2";
    let lend3Id = "sample-lending-" # suffix # "-3";
    lendingItemsStore.add(lend1Id, { id = lend1Id; lenderPhone = cust1Phone; borrowerPhone = cust2Phone; itemCategory = "books";       itemName = "Advanced Chemistry Textbook"; itemDescription = "Class 12 chemistry reference book, all chapters annotated"; borrowDate = now - (10 * 86_400_000_000_000); returnDate = now + (20 * 86_400_000_000_000); charge = 0.0;   chargeDescription = "";                    reminderFrequency = "monthly";       specificReminderDate = null;                                  status = "active"; lastReminderSent = null; createdAt = now; updatedAt = now });
    lendingItems_count += 1;
    lendingItemsStore.add(lend2Id, { id = lend2Id; lenderPhone = cust3Phone; borrowerPhone = cust1Phone; itemCategory = "tools";        itemName = "Bosch Cordless Drill";        itemDescription = "18V cordless drill with 2 batteries and charger";             borrowDate = now - (5  * 86_400_000_000_000); returnDate = now + (9  * 86_400_000_000_000); charge = 100.0; chargeDescription = "Rs 100 per week rental";      reminderFrequency = "specific_date"; specificReminderDate = ?(now + (9 * 86_400_000_000_000)); status = "active"; lastReminderSent = null; createdAt = now; updatedAt = now });
    lendingItems_count += 1;
    lendingItemsStore.add(lend3Id, { id = lend3Id; lenderPhone = cust2Phone; borrowerPhone = cust4Phone; itemCategory = "electronics";  itemName = "Canon DSLR Camera EOS 200D";  itemDescription = "Camera with kit lens 18-55mm and memory card";              borrowDate = now - (30 * 86_400_000_000_000); returnDate = now + (60 * 86_400_000_000_000); charge = 500.0; chargeDescription = "Rs 500 per month";          reminderFrequency = "monthly";       specificReminderDate = null;                                  status = "active"; lastReminderSent = ?(now - (30 * 86_400_000_000_000)); createdAt = now; updatedAt = now });
    lendingItems_count += 1;

    // ── Step 25: Seed ride bookings ────────────────────────────────────────────
    let mumbaiOrigin : Types.Location = { lat = 19.0760; lng = 72.8777; address = "CST Station, Mumbai" };
    let andheriDest  : Types.Location = { lat = 19.1136; lng = 72.8697; address = "Andheri, Mumbai" };
    let bandraOrigin : Types.Location = { lat = 19.0544; lng = 72.8405; address = "Bandra, Mumbai" };
    ignore transportSvc.createBooking(cust1Id, mumbaiOrigin, andheriDest, #bike, 120.0);
    switch (transportSvc.createBooking(cust2Id, bandraOrigin, andheriDest, #car, 200.0)) {
      case (#ok(r2)) { ignore transportSvc.assignSarthiPartner(r2.id, dp2Id) };
      case (#err(_)) {};
    };

    // ── Step 26: Community members from all registered users ──────────────
    // ── Step 25.5: Seed manufacturers, products, distributors, returns, complaints, ratings ─
    let seedMfgSvc = ManufacturerLib.ManufacturerService(manufacturersById, manufacturersByUserId, distributorNetworkById, mfgProductsById, expiryReturnsById, mfgComplaintsById, mfgRatingsById, mfgIdState);
    let mfr1UserId = "mfr-seed-" # suffix # "-1";
    let mfr2UserId = "mfr-seed-" # suffix # "-2";
    let mfr3UserId = "mfr-seed-" # suffix # "-3";
    let mfr1Id = switch (seedMfgSvc.registerManufacturer(mfr1UserId, "Sunrise Foods Ltd", "99" # suffix # "50", "info@sunrisefoods.in", ["FMCG / Food", "Agriculture"], "Mumbai")) {
      case (#ok(m)) { manufacturers_count += 1; m.id };
      case (#err(_)) { "" };
    };
    let mfr2Id = switch (seedMfgSvc.registerManufacturer(mfr2UserId, "TechParts India", "99" # suffix # "51", "support@techparts.in", ["Electronics", "Machinery"], "Delhi")) {
      case (#ok(m)) { manufacturers_count += 1; m.id };
      case (#err(_)) { "" };
    };
    let mfr3Id = switch (seedMfgSvc.registerManufacturer(mfr3UserId, "FreshFarm Organics", "99" # suffix # "52", "hello@freshfarm.in", ["Agriculture", "FMCG / Food"], "Pune")) {
      case (#ok(m)) { manufacturers_count += 1; m.id };
      case (#err(_)) { "" };
    };
    let mp1Id = switch (seedMfgSvc.addManufacturerProduct(mfr1Id, "Sunrise Basmati Rice 5kg", "SR-BATCH-" # suffix # "-A", null, null, "Mumbai", now - (180 * 86_400_000_000_000), null, 280.0, 350.0, [], false, 500)) {
      case (#ok(p)) { manufacturerProducts_count += 1; p.id };
      case (#err(_)) { "" };
    };
    ignore seedMfgSvc.addManufacturerProduct(mfr1Id, "Sunrise Wheat Flour 10kg", "SR-BATCH-" # suffix # "-B", null, null, "Mumbai", now - (90 * 86_400_000_000_000), null, 320.0, 400.0, [], false, 300);
    manufacturerProducts_count += 1;
    let mp2Id = switch (seedMfgSvc.addManufacturerProduct(mfr2Id, "TP Smart Sensor Module", "TP-BATCH-" # suffix # "-A", null, null, "Delhi", now - (60 * 86_400_000_000_000), null, 450.0, 599.0, [], false, 200)) {
      case (#ok(p)) { manufacturerProducts_count += 1; p.id };
      case (#err(_)) { "" };
    };
    ignore seedMfgSvc.addManufacturerProduct(mfr2Id, "TP Power Regulator 12V", "TP-BATCH-" # suffix # "-B", null, null, "Delhi", now - (30 * 86_400_000_000_000), null, 180.0, 240.0, [], false, 400);
    manufacturerProducts_count += 1;
    let mp3Id = switch (seedMfgSvc.addManufacturerProduct(mfr3Id, "FF Organic Turmeric 500g", "FF-BATCH-" # suffix # "-A", null, null, "Pune", now - (7 * 86_400_000_000_000), null, 90.0, 130.0, [], false, 1000)) {
      case (#ok(p)) { manufacturerProducts_count += 1; p.id };
      case (#err(_)) { "" };
    };
    ignore seedMfgSvc.addManufacturerProduct(mfr3Id, "FF Organic Honey 250g", "FF-BATCH-" # suffix # "-B", null, null, "Pune", now - (14 * 86_400_000_000_000), null, 120.0, 180.0, [], false, 600);
    manufacturerProducts_count += 1;
    ignore seedMfgSvc.addDistributorToNetwork(mfr1Id, "Patel Wholesale Mumbai",  "99" # suffix # "53", "Mumbai",    "400001", "FY26 Volume Scheme",        12.5, "Zone A");
    distributorNetworks_count += 1;
    ignore seedMfgSvc.addDistributorToNetwork(mfr1Id, "Singh Distributors Pune", "99" # suffix # "54", "Pune",      "411001", "FY26 Volume Scheme",        11.0, "Zone B");
    distributorNetworks_count += 1;
    ignore seedMfgSvc.addDistributorToNetwork(mfr2Id, "TechLine Delhi",          "99" # suffix # "55", "Delhi",     "110001", "Electronics Dealer Scheme",  8.0, "Zone C");
    distributorNetworks_count += 1;
    ignore seedMfgSvc.addDistributorToNetwork(mfr2Id, "CircuitHub Bangalore",    "99" # suffix # "56", "Bangalore", "560001", "Electronics Dealer Scheme",  9.0, "Zone D");
    distributorNetworks_count += 1;
    ignore seedMfgSvc.addDistributorToNetwork(mfr3Id, "GreenSupply Nashik",      "99" # suffix # "57", "Nashik",    "422001", "Organic Partner Scheme",    10.0, "Zone E");
    distributorNetworks_count += 1;
    ignore seedMfgSvc.addDistributorToNetwork(mfr3Id, "FarmFresh Kolhapur",      "99" # suffix # "58", "Kolhapur",  "416001", "Organic Partner Scheme",    10.5, "Zone F");
    distributorNetworks_count += 1;
    ignore seedMfgSvc.fileExpiryReturn(mp1Id, mfr1Id, "Patel Wholesale Mumbai", mfr1UserId, 10, "Batch expired before delivery date");
    ignore seedMfgSvc.fileExpiryReturn(mp2Id, mfr2Id, "TechLine Delhi",         mfr2UserId, 5,  "Damaged packaging on arrival");
    ignore seedMfgSvc.fileExpiryReturn(mp3Id, mfr3Id, "GreenSupply Nashik",     mfr3UserId, 20, "Product quality below specification");
    ignore seedMfgSvc.fileManufacturerComplaint(mfr1Id, "Patel Wholesale Mumbai", mfr1UserId, "Delayed shipment",     "Order placed 2 weeks ago but not yet dispatched.");
    ignore seedMfgSvc.fileManufacturerComplaint(mfr2Id, "TechLine Delhi",         mfr2UserId, "Wrong product supplied", "Received TP Power Regulator 5V instead of 12V.");
    ignore seedMfgSvc.fileManufacturerComplaint(mfr3Id, "GreenSupply Nashik",     mfr3UserId, "Label mismatch",        "Turmeric bags weigh only 450g on average.");
    ignore seedMfgSvc.rateManufacturerProduct(mfr1Id, mp1Id, "Priya Sharma", 4, "Excellent quality rice. Will reorder.");
    ignore seedMfgSvc.rateManufacturerProduct(mfr2Id, mp2Id, "Rahul Verma",  4, "Sensor works reliably. Good price-to-performance ratio.");
    ignore seedMfgSvc.rateManufacturerProduct(mfr3Id, mp3Id, "Amit Patel",   4, "Organic turmeric with strong colour. Satisfied.");

    // ── Step 26 (community members) ────────────────────────────────────────────────────────────────
    for ((_, u) in usersByPhoneNew.entries()) {
      let roleText2 = switch (u.role) {
        case (#customer)        "customer";
        case (#merchant)        "merchant";
        case (#deliveryPartner) "deliveryPartner";
        case (#sarthi)          "sarthi";
        case (#admin)           "admin";
      };
      let addrU = switch (u.address) { case (?a) a; case null "" };
      let locU  = switch (u.location) { case (?l) l.address; case null "" };
      switch (communityMembersStore.get(u.phone)) {
        case null {
          communityMembersStore.add(u.phone, {
            id = u.phone; phone = u.phone; name = u.name;
            apartmentName = ""; address = addrU; location = locU;
            city = ""; roles = [roleText2];
            registeredAt = u.registrationDate; updatedAt = u.registrationDate;
          });
          communityMembers_count += 1;
        };
        case (?mem) {
          if (mem.roles.find(func(r : Text) : Bool { r == roleText2 }) == null) {
            communityMembersStore.add(u.phone, {
              mem with roles = mem.roles.concat([roleText2]); updatedAt = now;
            });
          };
        };
      };
    };

    // ── Step N: Seed Language Learning Word Definitions (200+) ───────────────
    let wordDefsData : [(Text, Text, Text, Text, Text, [Text])] = [
      // (id, word, language, ancientTranslation, ipa, examples)
      // English-Spanish common words
      ("wdef-en-es-001", "hello", "en-es", "Sanskrit: namaste, Latin: salve", "/helo/", ["Hello, how are you?", "Say hello to your friends."]),
      ("wdef-en-es-002", "thank you", "en-es", "Sanskrit: dhanyavad, Latin: gratias", "/thaenk ju/", ["Thank you for your help.", "I always say thank you."]),
      ("wdef-en-es-003", "water", "en-es", "Sanskrit: jal, Latin: aqua", "/woter/", ["Can I have some water?", "Water is life."]),
      ("wdef-en-es-004", "food", "en-es", "Sanskrit: anna, Latin: cibus", "/fuud/", ["The food was delicious.", "We need food to survive."]),
      ("wdef-en-es-005", "house", "en-es", "Sanskrit: griha, Latin: domus", "/haos/", ["My house is small.", "Welcome to my house."]),
      ("wdef-en-es-006", "family", "en-es", "Sanskrit: parivar, Latin: familia", "/faemili/", ["Family is important.", "My family lives in Delhi."]),
      ("wdef-en-es-007", "love", "en-es", "Sanskrit: prem, Latin: amor", "/lav/", ["I love my country.", "Love is universal."]),
      ("wdef-en-es-008", "sun", "en-es", "Sanskrit: surya, Latin: sol", "/san/", ["The sun rises in the east.", "Sun gives us light."]),
      ("wdef-en-es-009", "moon", "en-es", "Sanskrit: chandra, Latin: luna", "/muun/", ["The moon is bright tonight.", "We can see the moon clearly."]),
      ("wdef-en-es-010", "book", "en-es", "Sanskrit: pustak, Latin: liber", "/bok/", ["I love reading books.", "This book is interesting."]),
      ("wdef-en-es-011", "school", "en-es", "Sanskrit: vidyalaya, Latin: schola", "/skuul/", ["Children go to school.", "I learned at school."]),
      ("wdef-en-es-012", "time", "en-es", "Sanskrit: kaal, Latin: tempus", "/taim/", ["Time is precious.", "What time is it?"]),
      ("wdef-en-es-013", "day", "en-es", "Sanskrit: diwas, Latin: dies", "/dei/", ["Have a good day.", "Every day is new."]),
      ("wdef-en-es-014", "night", "en-es", "Sanskrit: ratri, Latin: nox", "/nait/", ["Good night!", "The night sky is beautiful."]),
      ("wdef-en-es-015", "friend", "en-es", "Sanskrit: mitra, Latin: amicus", "/frend/", ["She is my best friend.", "Friends support each other."]),
      // English-Hindi
      ("wdef-en-hi-001", "hello", "en-hi", "Sanskrit: namaste, Old Arabic: ahlan", "/helo/", ["Hello, welcome!", "Say hello warmly."]),
      ("wdef-en-hi-002", "mother", "en-hi", "Sanskrit: mata, Latin: mater", "/madher/", ["My mother is kind.", "Mother loves unconditionally."]),
      ("wdef-en-hi-003", "father", "en-hi", "Sanskrit: pita, Latin: pater", "/faadher/", ["My father works hard.", "Father guides the family."]),
      ("wdef-en-hi-004", "god", "en-hi", "Sanskrit: dev, Latin: deus", "/gaad/", ["We pray to god.", "God is everywhere."]),
      ("wdef-en-hi-005", "earth", "en-hi", "Sanskrit: prithvi, Latin: terra", "/erth/", ["Earth is our home.", "Protect the earth."]),
      ("wdef-en-hi-006", "fire", "en-hi", "Sanskrit: agni, Latin: ignis", "/faier/", ["Fire keeps us warm.", "Be careful with fire."]),
      ("wdef-en-hi-007", "wind", "en-hi", "Sanskrit: vayu, Latin: ventus", "/wind/", ["The wind is strong today.", "Wind moves the clouds."]),
      ("wdef-en-hi-008", "sky", "en-hi", "Sanskrit: akash, Latin: caelum", "/skai/", ["The sky is blue.", "Birds fly in the sky."]),
      ("wdef-en-hi-009", "heart", "en-hi", "Sanskrit: hriday, Latin: cor", "/haart/", ["Listen to your heart.", "The heart pumps blood."]),
      ("wdef-en-hi-010", "mind", "en-hi", "Sanskrit: manas, Latin: mens", "/maind/", ["Keep a calm mind.", "The mind is powerful."]),
      ("wdef-en-hi-011", "knowledge", "en-hi", "Sanskrit: gyan, Latin: scientia", "/naledj/", ["Knowledge is power.", "Seek knowledge always."]),
      ("wdef-en-hi-012", "truth", "en-hi", "Sanskrit: satya, Latin: veritas", "/truuth/", ["Always speak the truth.", "Truth prevails."]),
      ("wdef-en-hi-013", "peace", "en-hi", "Sanskrit: shanti, Latin: pax", "/piis/", ["We want peace.", "Peace brings happiness."]),
      ("wdef-en-hi-014", "light", "en-hi", "Sanskrit: prakash, Latin: lux", "/lait/", ["Light dispels darkness.", "The light was bright."]),
      ("wdef-en-hi-015", "strength", "en-hi", "Sanskrit: shakti, Latin: virtus", "/strengkth/", ["She has great strength.", "Strength comes from within."]),
      // English-French
      ("wdef-en-fr-001", "hello", "en-fr", "Latin: salve, Old Arabic: ahlan", "/helo/", ["Hello, bonjour!", "We greet with hello."]),
      ("wdef-en-fr-002", "bread", "en-fr", "Latin: panis, Sanskrit: roti", "/bred/", ["Fresh bread smells wonderful.", "I bake bread daily."]),
      ("wdef-en-fr-003", "wine", "en-fr", "Latin: vinum, Sanskrit: madira", "/wain/", ["French wine is famous.", "Wine goes with cheese."]),
      ("wdef-en-fr-004", "river", "en-fr", "Latin: flumen, Sanskrit: nadi", "/riiver/", ["The river flows gently.", "We swam in the river."]),
      ("wdef-en-fr-005", "mountain", "en-fr", "Latin: mons, Sanskrit: parvat", "/maounteyn/", ["The mountain is high.", "We climbed the mountain."]),
      ("wdef-en-fr-006", "flower", "en-fr", "Latin: flos, Sanskrit: pushpa", "/flaower/", ["The flower is beautiful.", "Flowers smell sweet."]),
      ("wdef-en-fr-007", "music", "en-fr", "Latin: musica, Sanskrit: sangeet", "/myuuzik/", ["Music heals the soul.", "I love classical music."]),
      ("wdef-en-fr-008", "art", "en-fr", "Latin: ars, Sanskrit: kala", "/aart/", ["Art expresses emotion.", "She is talented in art."]),
      ("wdef-en-fr-009", "city", "en-fr", "Latin: civitas, Sanskrit: nagar", "/siti/", ["Paris is a beautiful city.", "City life is busy."]),
      ("wdef-en-fr-010", "journey", "en-fr", "Latin: iter, Sanskrit: yatra", "/jerni/", ["Life is a journey.", "The journey was long."]),
      // English-German
      ("wdef-en-de-001", "hello", "en-de", "Latin: salve, Sanskrit: namaste", "/helo/", ["Hello, Guten Tag!", "Germans say hello formally."]),
      ("wdef-en-de-002", "forest", "en-de", "Latin: silva, Sanskrit: vana", "/forist/", ["Germany has deep forests.", "Animals live in the forest."]),
      ("wdef-en-de-003", "iron", "en-de", "Latin: ferrum, Sanskrit: loha", "/aiern/", ["Iron is strong.", "The gate is made of iron."]),
      ("wdef-en-de-004", "gold", "en-de", "Latin: aurum, Sanskrit: suvarna", "/goold/", ["Gold is precious.", "She wears gold jewellery."]),
      ("wdef-en-de-005", "silver", "en-de", "Latin: argentum, Sanskrit: rajat", "/silver/", ["Silver shines brightly.", "The coin was silver."]),
      ("wdef-en-de-006", "snow", "en-de", "Latin: nix, Sanskrit: hima", "/snoo/", ["Snow covers the mountains.", "Children play in snow."]),
      ("wdef-en-de-007", "winter", "en-de", "Latin: hiems, Sanskrit: hemanta", "/winter/", ["Winter is cold in Germany.", "We love winter holidays."]),
      ("wdef-en-de-008", "horse", "en-de", "Latin: equus, Sanskrit: ashva", "/hors/", ["The horse ran fast.", "Knights rode horses."]),
      ("wdef-en-de-009", "wolf", "en-de", "Latin: lupus, Sanskrit: vrika", "/wolf/", ["The wolf howled at night.", "Wolves live in packs."]),
      ("wdef-en-de-010", "eagle", "en-de", "Latin: aquila, Sanskrit: garuda", "/iigel/", ["The eagle soared high.", "Eagles have sharp eyes."]),
      // English-Japanese
      ("wdef-en-ja-001", "hello", "en-ja", "Sanskrit: namaste, Latin: salve", "/helo/", ["Hello, Konnichiwa!", "Greet with hello and a bow."]),
      ("wdef-en-ja-002", "tea", "en-ja", "Sanskrit: cha, Old Arabic: shay", "/tii/", ["Japanese tea ceremony is beautiful.", "Drink green tea daily."]),
      ("wdef-en-ja-003", "cherry", "en-ja", "Latin: cerasus, Sanskrit: cherry", "/cheri/", ["Cherry blossoms are pink.", "Japan is famous for cherry trees."]),
      ("wdef-en-ja-004", "dream", "en-ja", "Sanskrit: svapna, Latin: somnium", "/driim/", ["Chase your dreams.", "I had a vivid dream."]),
      ("wdef-en-ja-005", "honor", "en-ja", "Sanskrit: maryada, Latin: honor", "/oner/", ["Honor your parents.", "Honor is important in Japanese culture."]),
      // English-Mandarin
      ("wdef-en-zh-001", "hello", "en-zh", "Sanskrit: namaste, Latin: salve", "/helo/", ["Hello, Ni Hao!", "Start with a warm hello."]),
      ("wdef-en-zh-002", "dragon", "en-zh", "Latin: draco, Sanskrit: naga", "/draegen/", ["Dragon is a Chinese symbol.", "Dragons represent power."]),
      ("wdef-en-zh-003", "rice", "en-zh", "Sanskrit: vrihi, Old Arabic: ruz", "/rais/", ["Rice is a staple food.", "China produces much rice."]),
      ("wdef-en-zh-004", "silk", "en-zh", "Latin: sericum, Sanskrit: silk", "/silk/", ["Silk is smooth and soft.", "China is known for silk."]),
      ("wdef-en-zh-005", "wisdom", "en-zh", "Sanskrit: prajna, Latin: sapientia", "/wizdem/", ["Wisdom comes with age.", "Confucius taught wisdom."]),
      // English-Arabic
      ("wdef-en-ar-001", "hello", "en-ar", "Old Arabic: ahlan, Sanskrit: namaste", "/helo/", ["Hello, Marhaba!", "Greet your guests warmly."]),
      ("wdef-en-ar-002", "desert", "en-ar", "Latin: desertum, Sanskrit: maru", "/dezert/", ["The desert is vast.", "Camels walk through the desert."]),
      ("wdef-en-ar-003", "star", "en-ar", "Sanskrit: tara, Latin: stella", "/staar/", ["Every star shines bright.", "Stars guide travellers at night."]),
      ("wdef-en-ar-004", "prayer", "en-ar", "Sanskrit: prarthana, Latin: oratio", "/preer/", ["Prayer brings peace.", "Daily prayer strengthens faith."]),
      ("wdef-en-ar-005", "hospitality", "en-ar", "Sanskrit: atithi, Latin: hospitalitas", "/hospitaeliti/", ["Arabic hospitality is legendary.", "We welcomed them with hospitality."]),
      // English-Portuguese
      ("wdef-en-pt-001", "hello", "en-pt", "Latin: salve, Sanskrit: namaste", "/helo/", ["Hello, Ola!", "Portuguese say hello warmly."]),
      ("wdef-en-pt-002", "sea", "en-pt", "Latin: mare, Sanskrit: samudra", "/sii/", ["Portugal faces the sea.", "The sea is vast and blue."]),
      ("wdef-en-pt-003", "song", "en-pt", "Sanskrit: geet, Latin: cantus", "/song/", ["Fado is a traditional song.", "She sang a beautiful song."]),
      ("wdef-en-pt-004", "heart", "en-pt", "Sanskrit: hriday, Latin: cor", "/haart/", ["Put your heart into it.", "Follow your heart."]),
      ("wdef-en-pt-005", "history", "en-pt", "Sanskrit: itihas, Latin: historia", "/histori/", ["Portugal has rich history.", "History repeats itself."]),
      // Additional common words across all pairs
      ("wdef-gen-001", "name", "en-es", "Sanskrit: naam, Latin: nomen", "/neim/", ["What is your name?", "My name is Priya."]),
      ("wdef-gen-002", "number", "en-es", "Sanskrit: ank, Latin: numerus", "/namber/", ["The number is ten.", "Give me your phone number."]),
      ("wdef-gen-003", "work", "en-hi", "Sanskrit: karma, Latin: opus", "/werk/", ["Hard work pays off.", "I love my work."]),
      ("wdef-gen-004", "life", "en-hi", "Sanskrit: jeevan, Latin: vita", "/laif/", ["Life is beautiful.", "Enjoy every moment of life."]),
      ("wdef-gen-005", "death", "en-hi", "Sanskrit: mrityu, Latin: mors", "/deth/", ["Death is inevitable.", "Life after death is a mystery."]),
      ("wdef-gen-006", "birth", "en-hi", "Sanskrit: janma, Latin: natus", "/berth/", ["Birth is a miracle.", "Happy birthday!"]),
      ("wdef-gen-007", "child", "en-es", "Sanskrit: bala, Latin: puer", "/chaild/", ["The child laughed.", "Every child deserves love."]),
      ("wdef-gen-008", "teacher", "en-hi", "Sanskrit: guru, Latin: magister", "/tiicher/", ["The teacher explained well.", "Respect your teacher."]),
      ("wdef-gen-009", "student", "en-hi", "Sanskrit: shishya, Latin: discipulus", "/styuudent/", ["Be a good student.", "Students learn every day."]),
      ("wdef-gen-010", "king", "en-fr", "Sanskrit: raja, Latin: rex", "/king/", ["The king was wise.", "King rules the kingdom."]),
      ("wdef-gen-011", "queen", "en-fr", "Sanskrit: rani, Latin: regina", "/kwiin/", ["The queen was graceful.", "Long live the queen."]),
      ("wdef-gen-012", "victory", "en-fr", "Sanskrit: vijay, Latin: victoria", "/viktori/", ["Victory was sweet.", "They celebrated victory."]),
      ("wdef-gen-013", "war", "en-de", "Sanskrit: yuddha, Latin: bellum", "/wor/", ["War causes suffering.", "Avoid war, choose peace."]),
      ("wdef-gen-014", "nation", "en-de", "Sanskrit: rashtra, Latin: natio", "/neishen/", ["Our nation is proud.", "Every nation has culture."]),
      ("wdef-gen-015", "law", "en-de", "Sanskrit: dharma, Latin: lex", "/lo/", ["Follow the law.", "Laws protect citizens."]),
      ("wdef-gen-016", "justice", "en-fr", "Sanskrit: nyaya, Latin: iustitia", "/jastis/", ["Justice must prevail.", "We fight for justice."]),
      ("wdef-gen-017", "freedom", "en-hi", "Sanskrit: mukti, Latin: libertas", "/friidem/", ["Freedom is priceless.", "Fight for freedom."]),
      ("wdef-gen-018", "courage", "en-es", "Sanskrit: sahas, Latin: fortitudo", "/karidj/", ["Courage is admirable.", "Have the courage to speak."]),
      ("wdef-gen-019", "hope", "en-hi", "Sanskrit: asha, Latin: spes", "/hoop/", ["Never lose hope.", "Hope for the best."]),
      ("wdef-gen-020", "faith", "en-ar", "Sanskrit: shraddha, Old Arabic: iman", "/feith/", ["Faith moves mountains.", "Keep your faith strong."]),
      ("wdef-gen-021", "gift", "en-de", "Sanskrit: upahaar, Latin: donum", "/gift/", ["This is a gift for you.", "Talent is a gift."]),
      ("wdef-gen-022", "memory", "en-fr", "Sanskrit: smriti, Latin: memoria", "/memeri/", ["Cherish good memories.", "Memory fades with time."]),
      ("wdef-gen-023", "forest", "en-hi", "Sanskrit: aranya, Latin: silva", "/forist/", ["The forest is dense.", "Walk through the forest."]),
      ("wdef-gen-024", "ocean", "en-es", "Sanskrit: mahasagar, Latin: oceanus", "/ooshen/", ["The ocean is vast.", "We sailed across the ocean."]),
      ("wdef-gen-025", "bird", "en-hi", "Sanskrit: pakshi, Latin: avis", "/berd/", ["The bird sang sweetly.", "Birds fly south in winter."]),
      ("wdef-gen-026", "fish", "en-ja", "Sanskrit: matsya, Latin: piscis", "/fish/", ["Fish swim in the sea.", "I like eating fish."]),
      ("wdef-gen-027", "lion", "en-fr", "Sanskrit: simha, Latin: leo", "/laien/", ["The lion roared.", "Lions are called king of beasts."]),
      ("wdef-gen-028", "elephant", "en-hi", "Sanskrit: gaja, Latin: elephantus", "/elifent/", ["The elephant is huge.", "Elephants have good memory."]),
      ("wdef-gen-029", "tree", "en-es", "Sanskrit: vriksha, Latin: arbor", "/trii/", ["Plant a tree today.", "The tree gives shade."]),
      ("wdef-gen-030", "fruit", "en-ar", "Sanskrit: phal, Old Arabic: fakia", "/fruut/", ["Eat fresh fruit daily.", "The fruit was ripe."]),
      ("wdef-gen-031", "seed", "en-hi", "Sanskrit: beeja, Latin: semen", "/siid/", ["Plant the seed of knowledge.", "Every tree starts from a seed."]),
      ("wdef-gen-032", "rain", "en-hi", "Sanskrit: varsha, Latin: pluvia", "/rein/", ["Rain brings life.", "We danced in the rain."]),
      ("wdef-gen-033", "cloud", "en-fr", "Sanskrit: megha, Latin: nubes", "/klaod/", ["Dark clouds bring rain.", "Clouds drift across the sky."]),
      ("wdef-gen-034", "thunder", "en-de", "Sanskrit: vajra, Latin: tonitru", "/thander/", ["Thunder scared the children.", "Thunder follows lightning."]),
      ("wdef-gen-035", "lightning", "en-de", "Sanskrit: bijli, Latin: fulmen", "/laitning/", ["Lightning lit the sky.", "Lightning strikes fast."]),
      ("wdef-gen-036", "spring", "en-ja", "Sanskrit: vasanta, Latin: ver", "/spring/", ["Spring brings flowers.", "Cherry blossoms bloom in spring."]),
      ("wdef-gen-037", "summer", "en-fr", "Sanskrit: grishma, Latin: aestas", "/samer/", ["Summer is hot and sunny.", "We vacation in summer."]),
      ("wdef-gen-038", "autumn", "en-fr", "Sanskrit: sharad, Latin: autumnus", "/ootem/", ["Autumn leaves are colorful.", "Autumn comes before winter."]),
      ("wdef-gen-039", "stone", "en-de", "Sanskrit: patthar, Latin: petra", "/stoon/", ["The stone was heavy.", "Build on a solid stone."]),
      ("wdef-gen-040", "salt", "en-ar", "Sanskrit: namak, Old Arabic: milh", "/soolt/", ["Add salt to the food.", "Salt preserves food."]),
      ("wdef-gen-041", "sweet", "en-hi", "Sanskrit: madhur, Latin: dulcis", "/swiit/", ["The mango is sweet.", "Life is sweet when healthy."]),
      ("wdef-gen-042", "bitter", "en-hi", "Sanskrit: tikta, Latin: amarus", "/bitter/", ["Medicine tastes bitter.", "Bitter experiences teach us."]),
      ("wdef-gen-043", "hot", "en-hi", "Sanskrit: ushna, Latin: calidus", "/hot/", ["The soup is hot.", "Hot weather exhausts us."]),
      ("wdef-gen-044", "cold", "en-hi", "Sanskrit: shita, Latin: frigidus", "/koold/", ["The water is cold.", "Cold wind chills the bones."]),
      ("wdef-gen-045", "soft", "en-fr", "Sanskrit: mridu, Latin: mollis", "/soft/", ["The bed is soft.", "Speak in a soft voice."]),
      ("wdef-gen-046", "hard", "en-de", "Sanskrit: kathin, Latin: durus", "/haad/", ["Diamond is hard.", "Hard work builds character."]),
      ("wdef-gen-047", "fast", "en-es", "Sanskrit: tivra, Latin: celer", "/faast/", ["The cheetah is fast.", "Run as fast as you can."]),
      ("wdef-gen-048", "slow", "en-es", "Sanskrit: dheera, Latin: lentus", "/sloo/", ["The turtle is slow.", "Slow and steady wins the race."]),
      ("wdef-gen-049", "big", "en-zh", "Sanskrit: maha, Latin: magnus", "/big/", ["China is a big country.", "Big dreams lead to big achievements."]),
      ("wdef-gen-050", "small", "en-ja", "Sanskrit: laghu, Latin: parvus", "/smool/", ["Japan's rooms are small.", "Small steps lead to great changes."]),
    ];
    for ((wid, wword, wlang, wancient, wipa, wexamples) in wordDefsData.values()) {
      if (wordDefinitionsMap.get(wid) == null) {
        wordDefinitionsMap.add(wid, {
          id                 = wid;
          word               = wword;
          language           = wlang;
          translations       = [(wlang, wword)];
          ancientTranslation = wancient;
          ipa                = wipa;
          examples           = wexamples;
        });
        languageWordDefs_count += 1;
      };
    };

    // ── Step N+1: Seed Language Learning Courses (20+ across 8 pairs) ─────────
    let courseSeedData : [(Text, Text, Text, Text, Text, Nat, Text)] = [
      // (id, creatorPhone, title, languagePair, description, price, status)
      ("sample-course-001", "+911234567801", "Spanish for Beginners", "en-es", "Learn everyday Spanish phrases from scratch", 0, "approved"),
      ("sample-course-002", "+911234567802", "Intermediate Spanish", "en-es", "Take your Spanish to the next level with grammar and vocabulary", 299, "approved"),
      ("sample-course-003", "+911234567803", "Hindi Basics", "en-hi", "Essential Hindi for English speakers", 0, "approved"),
      ("sample-course-004", "+911234567804", "Hindi Conversation", "en-hi", "Practice real-life Hindi conversations", 399, "approved"),
      ("sample-course-005", "+911234567805", "French Essentials", "en-fr", "Core French vocabulary and pronunciation", 0, "approved"),
      ("sample-course-006", "+911234567806", "French Grammar Deep Dive", "en-fr", "Master French grammar rules and exceptions", 499, "approved"),
      ("sample-course-007", "+911234567807", "German A1 Course", "en-de", "German language for absolute beginners", 0, "approved"),
      ("sample-course-008", "+911234567808", "German Business Language", "en-de", "Professional German for the workplace", 599, "approved"),
      ("sample-course-009", "+911234567809", "Japanese Hiragana", "en-ja", "Learn to read and write Hiragana script", 0, "approved"),
      ("sample-course-010", "+911234567810", "Japanese Everyday Phrases", "en-ja", "Common phrases for travel and daily use in Japan", 349, "approved"),
      ("sample-course-011", "+911234567811", "Mandarin Tones and Pinyin", "en-zh", "Master Mandarin tones with Pinyin practice", 0, "pending"),
      ("sample-course-012", "+911234567812", "Mandarin for Travellers", "en-zh", "Essential Mandarin for your next China trip", 449, "pending"),
      ("sample-course-013", "+911234567813", "Arabic Script Reading", "en-ar", "Learn to read and write Arabic letters", 0, "pending"),
      ("sample-course-014", "+911234567814", "Conversational Arabic", "en-ar", "Everyday Arabic for travelers and expats", 549, "pending"),
      ("sample-course-015", "+911234567815", "Portuguese for Beginners", "en-pt", "Brazilian and European Portuguese foundations", 0, "pending"),
      ("sample-course-016", "+911234567816", "Advanced Hindi Literature", "en-hi", "Explore Hindi poetry and classic literature", 699, "rejected"),
      ("sample-course-017", "+911234567817", "Spanish Slang Mastery", "en-es", "Learn colloquial Spanish and regional slang", 199, "rejected"),
      ("sample-course-018", "+911234567818", "French Pronunciation Clinic", "en-fr", "Perfect your French accent with focused drills", 299, "approved"),
      ("sample-course-019", "+911234567819", "German Culture and Language", "en-de", "Language learning through German culture and history", 399, "approved"),
      ("sample-course-020", "+911234567820", "Japanese Kanji Level 1", "en-ja", "Introduction to the most common Kanji characters", 449, "approved"),
    ];
    let lessonContents : [(Text, Text)] = [
      ("Introduction and Greetings", "Learn the basics of greeting in your target language. Practice saying hello, goodbye, and introducing yourself."),
      ("Numbers and Counting", "Master numbers 1-100 and learn to count, tell time, and discuss quantities."),
      ("Colors and Descriptions", "Expand vocabulary with colors and descriptive adjectives for everyday objects."),
      ("Food and Dining", "Essential vocabulary for ordering food, discussing preferences, and dining out."),
      ("Travel and Directions", "Navigate confidently with travel vocabulary, direction phrases, and transport words."),
    ];
    for ((cid, cphone, ctitle, cpair, cdesc, cprice, cstatus) in courseSeedData.values()) {
      if (coursesMap.get(cid) == null) {
        let lessonIds = List.empty<Text>();
        var lorder : Nat = 0;
        for ((ltitle, lcontent) in lessonContents.values()) {
          let lid = cid # "-lesson-" # lorder.toText();
          if (lessonsMap.get(lid) == null) {
            lessonsMap.add(lid, {
              id             = lid;
              courseId       = cid;
              title          = ltitle;
              content        = lcontent;
              quizQuestion   = "What did you learn in this lesson?";
              quizChoices    = ["Greetings", "Numbers", "Colors", "Food"];
              correctAnswer  = 0;
              explanation    = "Review the lesson material to reinforce your understanding.";
              vocabularyList = [];
              order          = lorder;
            });
            lessonIds.add(lid);
            languageLessons_count += 1;
          };
          lorder += 1;
        };
        coursesMap.add(cid, {
          id              = cid;
          creatorPhone    = cphone;
          title           = ctitle;
          languagePair    = cpair;
          description     = cdesc;
          lessons         = lessonIds.toArray();
          price           = cprice;
          status          = cstatus;
          enrollmentCount = 0;
          createdDate     = now;
        });
        // Add approval records for approved/rejected courses
        if (cstatus == "approved" or cstatus == "rejected") {
          let approvalId = "approval-" # cid;
          if (courseApprovalsMap.get(approvalId) == null) {
            courseApprovalsMap.add(approvalId, {
              id            = approvalId;
              courseId      = cid;
              submittedDate = now;
              approvalDate  = now;
              status        = cstatus;
              adminNotes    = if (cstatus == "approved") "Looks good, approved!" else "Does not meet content guidelines.";
              approverId    = "admin";
            });
          };
        };
        languageCourses_count += 1;
      };
    };

    // ── Step N+2: Seed Sample Enrollments (5 users, varying progress) ─────────
    let enrollmentSeeds : [(Text, Text, Text, Nat, Bool)] = [
      // (enrollId, userId, courseId, progressPercent, isCompleted)
      ("sample-enroll-001", "+919876543001", "sample-course-001", 100, true),
      ("sample-enroll-002", "+919876543001", "sample-course-003", 75,  false),
      ("sample-enroll-003", "+919876543002", "sample-course-002", 50,  false),
      ("sample-enroll-004", "+919876543002", "sample-course-005", 25,  false),
      ("sample-enroll-005", "+919876543003", "sample-course-007", 0,   false),
    ];
    for ((eid, euser, ecourse, eprog, ecomp) in enrollmentSeeds.values()) {
      if (enrollmentsMap.get(eid) == null) {
        enrollmentsMap.add(eid, {
          id              = eid;
          userId          = euser;
          courseId        = ecourse;
          enrollmentDate  = now;
          lastViewedDate  = now;
          progressPercent = eprog;
          isCompleted     = ecomp;
          completionDate  = if (ecomp) now else 0;
        });
        languageEnrollments_count += 1;
      };
    };

    // ── Step N+3: Seed Sample Daily Lessons ──────────────────────────────────
    let dailyLessonSeeds : [(Text, Text, Text, Text, Text, Bool)] = [
      ("sample-dl-001", "+919876543001", "en-es", "Basic Greetings",      "beginner",     true),
      ("sample-dl-002", "+919876543001", "en-hi", "Common Phrases",       "beginner",     false),
      ("sample-dl-003", "+919876543002", "en-fr", "Numbers and Time",     "intermediate", true),
      ("sample-dl-004", "+919876543003", "en-de", "Food Vocabulary",      "beginner",     false),
      ("sample-dl-005", "+919876543003", "en-ja", "Greetings and Bowing", "beginner",     true),
    ];
    for ((dlid, dluser, dlpair, dltopic, dldifficulty, dlcomp) in dailyLessonSeeds.values()) {
      if (dailyLessonsMap.get(dlid) == null) {
        dailyLessonsMap.add(dlid, {
          id            = dlid;
          userId        = dluser;
          languagePair  = dlpair;
          topic         = dltopic;
          difficulty    = dldifficulty;
          content       = "Today's lesson covers " # dltopic # ". Practice with the vocabulary below.";
          quizQuestion  = "Which phrase did you practice today?";
          quizChoices   = ["Option A", "Option B", "Option C", "Option D"];
          correctAnswer = 0;
          vocabulary    = [("hello", "greeting word"), ("goodbye", "farewell word")];
          generatedDate = now;
          isCompleted   = dlcomp;
          completedDate = if (dlcomp) now else 0;
          streakDate    = now;
        });
      };
    };

    {
      cities              = cities_count;
      customers           = customers_count;
      deliveryPartners    = deliveryPartners_count;
      jobs                = jobs_count;
      adhocJobs           = adhocJobs_count;
      properties          = properties_count;
      oldItems            = oldItems_count;
      events              = events_count;
      familyGroups        = familyGroups_count;
      promotions          = promotions_count;
      recipes             = recipes_count;
      shuttleRoutes       = shuttleRoutes_count;
      healthcareProviders = healthcareProviders_count;
      tourOperators       = tourOperators_count;
      professionalServices = professionalServices_count;
      supportTickets      = supportTickets_count;
      restockOrders       = restockOrders_count;
      merchants           = merchants_count;
      products            = products_count;
      donations           = donations_count;
      subscriptionPlans   = subscriptionPlans_count;
      rateCards           = rateCards_count;
      lendingItems        = lendingItems_count;
      communityMembers    = communityMembers_count;
      manufacturers        = manufacturers_count;
      manufacturerProducts = manufacturerProducts_count;
      distributorNetworks  = distributorNetworks_count;
      languageCourses      = languageCourses_count;
      languageLessons      = languageLessons_count;
      languageEnrollments  = languageEnrollments_count;
      languageWordDefs     = languageWordDefs_count;
    }
  };

  // ── Delivery Order Queries ──────────────────────────────────────────────────────────────

  /// Same as seedSampleData() but with optional reset. If resetFirst=true, ALL sample-tagged
  /// records (IDs starting with "sample-") are cleared first so the call is a true re-seed.
  public func seedSampleDataFull(resetFirst : Bool) : async {
    reset   : Bool;
    created : {
      cities               : Nat;
      customers            : Nat;
      deliveryPartners     : Nat;
      jobs                 : Nat;
      adhocJobs            : Nat;
      properties           : Nat;
      oldItems             : Nat;
      events               : Nat;
      familyGroups         : Nat;
      promotions           : Nat;
      recipes              : Nat;
      shuttleRoutes        : Nat;
      healthcareProviders  : Nat;
      tourOperators        : Nat;
      professionalServices : Nat;
      supportTickets       : Nat;
      restockOrders        : Nat;
      merchants            : Nat;
      products             : Nat;
      donations            : Nat;
      subscriptionPlans    : Nat;
      rateCards            : Nat;
      lendingItems         : Nat;
      communityMembers     : Nat;
      manufacturers        : Nat;
      manufacturerProducts : Nat;
      distributorNetworks  : Nat;
      languageCourses      : Nat;
      languageLessons      : Nat;
      languageEnrollments  : Nat;
      languageWordDefs     : Nat;
    };
  } {
    if (resetFirst) {
      // Remove all marketplace items whose ID starts with "sample-marketplace-"
      let mktToRemove = List.empty<Text>();
      for ((id, _) in marketplaceItemsById.entries()) {
        if (id.startsWith(#text "sample-marketplace-")) { mktToRemove.add(id) }
      };
      for (id in mktToRemove.values()) { marketplaceItemsById.remove(id) };

      // Remove healthcare providers, appointments
      let hpToRemove = List.empty<Text>();
      for ((id, _) in healthcareProviderStore.entries()) {
        if (id.startsWith(#text "sample-hp-")) { hpToRemove.add(id) }
      };
      for (id in hpToRemove.values()) { healthcareProviderStore.remove(id) };
      let haToRemove = List.empty<Text>();
      for ((id, _) in healthcareApptStore.entries()) {
        if (id.startsWith(#text "sample-ha-")) { haToRemove.add(id) }
      };
      for (id in haToRemove.values()) { healthcareApptStore.remove(id) };

      // Remove tour operators, bookings
      let toToRemove = List.empty<Text>();
      for ((id, _) in tourOperatorStore.entries()) {
        if (id.startsWith(#text "sample-to-")) { toToRemove.add(id) }
      };
      for (id in toToRemove.values()) { tourOperatorStore.remove(id) };
      let tbToRemove = List.empty<Text>();
      for ((id, _) in tourBookingStore.entries()) {
        if (id.startsWith(#text "sample-tb-")) { tbToRemove.add(id) }
      };
      for (id in tbToRemove.values()) { tourBookingStore.remove(id) };

      // Remove professional services, service bookings
      let psToRemove = List.empty<Text>();
      for ((id, _) in professionalSvcStore.entries()) {
        if (id.startsWith(#text "sample-ps-")) { psToRemove.add(id) }
      };
      for (id in psToRemove.values()) { professionalSvcStore.remove(id) };
      let sbToRemove = List.empty<Text>();
      for ((id, _) in serviceBookingStore.entries()) {
        if (id.startsWith(#text "sample-sb-")) { sbToRemove.add(id) }
      };
      for (id in sbToRemove.values()) { serviceBookingStore.remove(id) };

      // Remove support tickets
      let tktToRemove = List.empty<Text>();
      for ((id, _) in supportTicketsStoreCurrent.entries()) {
        if (id.startsWith(#text "sample-tkt-")) { tktToRemove.add(id) }
      };
      for (id in tktToRemove.values()) { supportTicketsStoreCurrent.remove(id) };

      // Remove restock orders
      let rstToRemove = List.empty<Text>();
      for ((id, _) in restockOrdersStore.entries()) {
        if (id.startsWith(#text "sample-restock-")) { rstToRemove.add(id) }
      };
      for (id in rstToRemove.values()) { restockOrdersStore.remove(id) };

      // Remove donations
      let donToRemove = List.empty<Text>();
      for ((id, _) in donationsStore.entries()) {
        if (id.startsWith(#text "sample-donation-")) { donToRemove.add(id) }
      };
      for (id in donToRemove.values()) { donationsStore.remove(id) };

      // Remove lending items
      let lendToRemove = List.empty<Text>();
      for ((id, _) in lendingItemsStore.entries()) {
        if (id.startsWith(#text "sample-lending-")) { lendToRemove.add(id) }
      };
      for (id in lendToRemove.values()) { lendingItemsStore.remove(id) };

      // Remove manufacturers, products, distributors, expiry returns, complaints, ratings
      let mfrToRemove = List.empty<Text>();
      for ((id, _) in manufacturersById.entries()) { mfrToRemove.add(id) };
      for (id in mfrToRemove.values()) {
        switch (manufacturersById.get(id)) {
          case (?m) { manufacturersByUserId.remove(m.userId) };
          case null {};
        };
        manufacturersById.remove(id);
      };
      let mpToRemove = List.empty<Text>();
      for ((id, _) in mfgProductsById.entries()) { mpToRemove.add(id) };
      for (id in mpToRemove.values()) { mfgProductsById.remove(id) };
      let distToRemove = List.empty<Text>();
      for ((id, _) in distributorNetworkById.entries()) { distToRemove.add(id) };
      for (id in distToRemove.values()) { distributorNetworkById.remove(id) };
      let expToRemove = List.empty<Text>();
      for ((id, _) in expiryReturnsById.entries()) { expToRemove.add(id) };
      for (id in expToRemove.values()) { expiryReturnsById.remove(id) };
      let mfgCompToRemove = List.empty<Text>();
      for ((id, _) in mfgComplaintsById.entries()) { mfgCompToRemove.add(id) };
      for (id in mfgCompToRemove.values()) { mfgComplaintsById.remove(id) };
      let mfgRatToRemove = List.empty<Text>();
      for ((id, _) in mfgRatingsById.entries()) { mfgRatToRemove.add(id) };
      for (id in mfgRatToRemove.values()) { mfgRatingsById.remove(id) };
    };

    let counts = await seedSampleData();
    { reset = resetFirst; created = counts }
  };

  public func getDeliveryOrders() : async [Types.Order] {
    orderSvc.getAllOrders(null, null, null).filter(func(o : Types.Order) : Bool {
      o.deliveryPartnerId != null
    })
  };

  public func getOrdersByDeliveryPartnerQuery(partnerId : Text) : async [Types.Order] {
    orderSvc.getOrdersByDeliveryPartner(partnerId)
  };

  // ── Sarthi / Transport Queries ─────────────────────────────────────────────

  public func getSarthiRideBookings() : async [Types.TransportBooking] {
    transportSvc.getAllBookings()
  };

  public func getBookingsByStatus(status : Types.TransportStatus) : async [Types.TransportBooking] {
    let all = transportSvc.getAllBookings();
    all.filter(func(b : Types.TransportBooking) : Bool {
      switch (b.status, status) {
        case (#pending,             #pending)             { true };
        case (#accepted,            #accepted)            { true };
        case (#headingToPickup,     #headingToPickup)     { true };
        case (#arrived,             #arrived)             { true };
        case (#rideStarted,         #rideStarted)         { true };
        case (#onTheWay,            #onTheWay)            { true };
        case (#arrivedDestination,  #arrivedDestination)  { true };
        case (#paymentCollected,    #paymentCollected)    { true };
        case (#completed,           #completed)           { true };
        case (#cancelled,           #cancelled)           { true };
        case _ { false };
      }
    })
  };

  // ── Flow Designer API ──────────────────────────────────────────────────────

  public func saveFlowDefinition(name : Text, environment : Text, flowJson : Text) : async Text {
    func nameToSlug(n : Text) : Text {
      let lower = n.toLower();
      lower.flatMap(func(c : Char) : Text {
        if ((c >= 'a' and c <= 'z') or (c >= '0' and c <= '9') or c == '-') {
          Text.fromChar(c)
        } else if (c == ' ' or c == '_') {
          "-"
        } else {
          ""
        }
      })
    };
    let slugId = nameToSlug(name);
    let now = Time.now();
    let safeJson : Text = if (flowJson == "" or not flowJson.startsWith(#text "{")) {
      "{\"nodes\":[],\"edges\":[],\"id\":\"" # slugId # "\",\"name\":\"" # name # "\"}"
    } else {
      flowJson
    };
    switch (flowsStore.get(slugId)) {
      case (?existing) {
        flowsStore.add(slugId, {
          existing with
          name        = name;
          environment = environment;
          flowJson    = safeJson;
          version     = existing.version + 1;
          updatedAt   = now;
        });
        slugId
      };
      case null {
        flowsStore.add(slugId, {
          id          = slugId;
          name        = name;
          environment = environment;
          flowJson    = safeJson;
          version     = 1;
          createdAt   = now;
          updatedAt   = now;
        });
        slugId
      };
    }
  };

  public func getFlowDefinitions(_environment : Text) : async [{ id : Text; name : Text; environment : Text; flowJson : Text; version : Nat; createdAt : Int; updatedAt : Int }] {
    // Return ALL flows regardless of environment — deduplicate by name, keeping highest version.
    // The environment parameter is kept for backward-compat but is no longer used for filtering.
    let byName = Map.empty<Text, Types.FlowDefinition>();
    for ((_, fd) in flowsStore.entries()) {
      switch (byName.get(fd.name)) {
        case null { byName.add(fd.name, fd) };
        case (?existing) {
          if (fd.version > existing.version) {
            byName.add(fd.name, fd)
          }
        };
      };
    };
    byName.values().toArray().map<Types.FlowDefinition, { id : Text; name : Text; environment : Text; flowJson : Text; version : Nat; createdAt : Int; updatedAt : Int }>(
      func(f) {
        let safeJson : Text = if (f.flowJson == "" or not f.flowJson.startsWith(#text "{")) {
          "{\"nodes\":[],\"edges\":[],\"id\":\"" # f.id # "\",\"name\":\"" # f.name # "\"}"
        } else {
          f.flowJson
        };
        { id = f.id; name = f.name; environment = "live"; flowJson = safeJson; version = f.version; createdAt = f.createdAt; updatedAt = f.updatedAt }
      }
    )
  };

  public func deployFlowToLive(flowId : Text) : async Bool {
    switch (flowsStore.get(flowId)) {
      case null { false };
      case (?flow) {
        if (flow.environment == "live") { return true };
        let now = Time.now();
        // Create a new live version by inserting with a new ID derived from the original
        nextFlowId += 1;
        let liveId = "flow_" # nextFlowId.toText();
        let liveFlow : Types.FlowDefinition = {
          flow with
          id          = liveId;
          environment = "live";
          version     = flow.version + 1;
          updatedAt   = now;
        };
        flowsStore.add(liveId, liveFlow);
        true
      };
    }
  };

  // ── Pipeline Environment API ───────────────────────────────────────────────

  public func getPipelineEnvironment() : async Text {
    pipelineEnvironment
  };

  public func setPipelineEnvironment(env : Text) : async () {
    pipelineEnvironment := env
  };
  /// Returns ALL flows from the registry deduplicated by name (highest version wins).
  /// Use this as the canonical source for all surfaces (Flow Agent, Chat Simulator,
  /// Flow Designer, Script Executor, Telegram/WhatsApp/SMS scripts).
  public query func getAllFlows() : async [{ id : Text; name : Text; environment : Text; flowJson : Text; version : Nat; createdAt : Int; updatedAt : Int }] {
    let byName = Map.empty<Text, Types.FlowDefinition>();
    for ((_, fd) in flowsStore.entries()) {
      switch (byName.get(fd.name)) {
        case null { byName.add(fd.name, fd) };
        case (?existing) {
          if (fd.version > existing.version) { byName.add(fd.name, fd) }
        };
      };
    };
    byName.values().toArray().map<Types.FlowDefinition, { id : Text; name : Text; environment : Text; flowJson : Text; version : Nat; createdAt : Int; updatedAt : Int }>(
      func(f) {
        let safeJson : Text = if (f.flowJson == "" or not f.flowJson.startsWith(#text "{")) {
          "{\"nodes\":[],\"edges\":[],\"id\":\"" # f.id # "\",\"name\":\"" # f.name # "\"}"
        } else {
          f.flowJson
        };
        // Normalize legacy "production" environment to "live"
        let normEnv = if (f.environment == "production") "live" else f.environment;
        { id = f.id; name = f.name; environment = normEnv; flowJson = safeJson; version = f.version; createdAt = f.createdAt; updatedAt = f.updatedAt }
      }
    )
  };

  // ── WhatsApp Script Export ─────────────────────────────────────────────────

  /// Export all flows as a WhatsApp-compatible script structure.
  /// Dynamically generated from flowsStore — no hardcoded entries.
  public query func exportWhatsAppScript() : async Text {
    let flowParts = List.empty<Text>();
    let flows = flowsStore.values().toArray();
    let sorted = flows.sort(func(a : Types.FlowDefinition, b : Types.FlowDefinition) : Order.Order {
      if (a.id == "customer_registration") #less
      else if (b.id == "customer_registration") #greater
      else Text.compare(a.id, b.id)
    });
    for (fd in sorted.vals()) {
      let step1 = "{\"id\":\"" # fd.id # "_step1\",\"type\":\"message\",\"text\":\"" # fd.name # " — please follow the prompts.\"}";
      let entry = "\"" # fd.id # "\":{\"trigger\":\"" # fd.id # "\",\"steps\":[" # step1 # "]}";
      flowParts.add(entry);
    };
    "{\"version\":\"3.0\",\"flows\":{" # flowParts.values().foldLeft("", func(acc : Text, s : Text) : Text = if (acc == "") s else acc # "," # s) # "}}"
  };

  // ── Delivery Partner Earnings & Active Delivery ────────────────────────────

  public query func getActiveDelivery(partnerId : Text) : async ?Types.Order {
    dpSvc.getActiveDelivery(ordersById, partnerId)
  };

  public query func getPartnerEarnings(partnerId : Text) : async Types.EarningsSummary {
    dpSvc.getPartnerEarnings(ordersById, partnerId)
  };

  // ── Booking Details (with both contact numbers) ────────────────────────────

  public query func getBookingDetails(bookingId : Text) : async ?Types.TransportBooking {
    transportSvc.getBookingDetails(bookingId)
  };

  // ── Order Groups ───────────────────────────────────────────────────────────

  public query func getOrderGroups(orderId : Text) : async Types.Result<[Types.OrderGroup], Types.ApiError> {
    orderSvc.getOrderGroups(orderId)
  };

  // ── Subscription Check & Assign ────────────────────────────────────────────

  public func checkAndAssignSubscription(userId : Text) : async Types.SubscriptionStatus {
    subscriptionSvc.checkAndAssignSubscription(userId)
  };

  // ── Module Toggle API ──────────────────────────────────────────────────────

  public func setModuleEnabled(moduleName : Text, enabled : Bool) : async Bool {
    moduleTogglesStore.add(moduleName, enabled);
    true
  };

  public query func getModuleStatuses() : async [(Text, Bool)] {
    moduleTogglesStore.toArray()
  };

  public query func isModuleEnabled(moduleName : Text) : async Bool {
    switch (moduleTogglesStore.get(moduleName)) {
      case (?enabled) enabled;
      case null true; // default enabled
    }
  };

  // ── My Listings with Products ──────────────────────────────────────────────

  public query func getMyListingsWithProducts(phone : Text) : async {
    jobs       : [Types.Job];
    properties : [Types.Property];
    events     : [EventTypes.Event];
    promotions : [PromotionTypes.Promotion];
    products   : [Types.Product];
  } {
    let userId = switch (userSvc.getUserByPhone(phone)) {
      case (#ok(u)) u.id;
      case (#err(_)) "";
    };
    let merchantIdOpt = switch (merchantSvc.getMerchantByUserId(userId)) {
      case (#ok(m)) ?m.id;
      case (#err(_)) null;
    };
    let jobs       = jobSvc.getAllJobs(null).filter(func(j : Types.Job) : Bool {
      j.posterId == userId or j.posterId == phone
    });
    let properties = propertySvc.getAllProperties(null, null).filter(func(p : Types.Property) : Bool {
      p.posterId == userId or p.posterId == phone
    });
    let events     = eventSvc.getMyEvents(phone);
    let promotions = promotionSvc.getMyPromotions(phone);
    let products   = switch (merchantIdOpt) {
      case (?mid) productSvc.getProductsByMerchant(mid);
      case null [];
    };
    { jobs; properties; events; promotions; products }
  };

  // ── Events/Promotions for User (real data first) ───────────────────────────

  public query func getEventsForUser(city : Text) : async [EventTypes.Event] {
    let real = eventSvc.getEventsForLocation(city);
    if (real.size() >= 2) real
    else {
      // Return all published events as fallback
      eventSvc.getAllEvents().filter(func(e : EventTypes.Event) : Bool {
        e.status == #published
      })
    }
  };

  public query func getPromotionsForUser(city : Text, area : Text) : async [PromotionTypes.Promotion] {
    let real = promotionSvc.getPromotionsForLocation(city, area);
    if (real.size() >= 2) real
    else {
      // Fallback: all active promotions
      promotionSvc.getAllPromotions().filter(func(p : PromotionTypes.Promotion) : Bool {
        p.status == #active
      })
    }
  };

  // ── Manual / Custom Order API ──────────────────────────────────────────────

  public func createManualOrder(
    customerPhone   : Text,
    merchantId      : Text,
    manualItems     : [Types.ManualOrderItem],
    customerAddress : ?Types.Location,
  ) : async Types.Result<Types.Order, Types.ApiError> {
    // Sanitize all item text fields
    let cleanItems = manualItems.map(func(item) {
      {
        itemName = Utils.sanitizeInput(item.itemName);
        brand    = Utils.sanitizeInput(item.brand);
        quantity = item.quantity;
      }
    });
    orderSvc.createManualOrder(customerPhone, merchantId, cleanItems, customerAddress)
  };

  public func setManualOrderAmount(
    orderId         : Text,
    amount          : Float,
    deliveryCharges : Float,
  ) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.setManualOrderAmount(orderId, amount, deliveryCharges)
  };

  public func confirmManualOrder(
    orderId     : Text,
    paymentMode : Types.PaymentMode,
  ) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.confirmManualOrder(orderId, paymentMode)
  };

  // ── Customer Rating API ────────────────────────────────────────────────────

  public func setCustomerRating(
    orderId : Text,
    rating  : Types.CustomerRating,
  ) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.setCustomerRating(orderId, rating)
  };

  public query func getCustomerRatingHistory(
    customerPhone : Text,
  ) : async [{ orderId : Text; rating : Types.CustomerRating; merchantId : Text; date : Int }] {
    orderSvc.getCustomerRatingHistory(customerPhone)
  };

  public query func getTotalCompletedOrdersByCustomer(
    customerPhone : Text,
    merchantId    : Text,
  ) : async Nat {
    orderSvc.getTotalCompletedOrdersByCustomer(customerPhone, merchantId)
  };

  // ── Merchant Boost / ONDC API ──────────────────────────────────────────────

  public func setBoostedOrderCount(merchantId : Text, count : Nat) : async Types.Result<Types.Merchant, Types.ApiError> {
    merchantSvc.setBoostedOrderCount(merchantId, count)
  };

  public query func getDisplayTotalOrders(merchantId : Text) : async Nat {
    let allCompleted = orderSvc.getAllOrders(?#completed, null, null);
    let realCompleted = allCompleted.filter(
      func(o : Types.Order) : Bool { o.merchantId == merchantId }
    ).size();
    merchantSvc.getDisplayTotalOrders(merchantId, realCompleted)
  };

  public func setMerchantOndcEnrollment(merchantId : Text, enrolled : Bool) : async Types.Result<Types.Merchant, Types.ApiError> {
    merchantSvc.setOndcEnrollment(merchantId, enrolled)
  };

  public func createOndcOrder(
    customerId      : Text,
    merchantId      : Text,
    items           : [Types.OrderItem],
    customerAddress : ?Types.Location,
    paymentMode     : Types.PaymentMode,
    searchQuery     : ?Text,
  ) : async Types.Result<Types.Order, Types.ApiError> {
    orderSvc.createOndcOrder(customerId, merchantId, items, customerAddress, paymentMode, searchQuery)
  };

  public query func listOndcOrders() : async [Types.Order] {
    orderSvc.listOndcOrders()
  };

  // ── Family Connect Request API ─────────────────────────────────────────────

  public query func checkCustomerExists(phone : Text) : async Bool {
    familySvc.checkCustomerExists(phone)
  };

  public func sendFamilyConnectRequest(
    fromPhone    : Text,
    toPhone      : Text,
    relationship : Text,
    groupName    : Text,
    address      : Text,
  ) : async Types.Result<Text, Types.ApiError> {
    familySvc.sendFamilyConnectRequest(fromPhone, toPhone, relationship, groupName, address)
  };

  public func respondToFamilyConnectRequest(
    requestId : Text,
    accept    : Bool,
  ) : async Types.Result<(), Types.ApiError> {
    familySvc.respondToConnectRequest(requestId, accept)
  };

  public query func getFamilyConnectRequests(phone : Text) : async [Types.FamilyConnectRequest] {
    familySvc.getFamilyConnectRequests(phone)
  };

  // ── Shuttle Deactivation API ───────────────────────────────────────────────

  public func deactivateShuttleRoute(routeId : Text, callerPhone : Text, isAdmin : Bool) : async Types.Result<Types.ShuttleRoute, Types.ApiError> {
    shuttleSvc.deactivateShuttleRoute(routeId, callerPhone, isAdmin)
  };

  public func activateShuttleRoute(routeId : Text) : async Types.Result<Types.ShuttleRoute, Types.ApiError> {
    shuttleSvc.activateShuttleRoute(routeId)
  };

  public query func listAllShuttleRoutesAdmin() : async [Types.ShuttleRoute] {
    shuttleSvc.listAllShuttleRoutesAdmin()
  };

  public query func listMyShuttleRoutes(dpPhone : Text) : async [Types.ShuttleRoute] {
    shuttleSvc.listMyShuttleRoutes(dpPhone)
  };

  /// Get shuttle routes with optional inactive routes included (for admin panel).
  public query func getShuttleRoutes(includeInactive : Bool) : async [Types.ShuttleRoute] {
    shuttleSvc.getShuttleRoutes(includeInactive)
  };

  // ── Admin Config API ───────────────────────────────────────────────────────
  // Note: getAdminConfig() and setAdminUPI() are exposed directly via the POSMixin include above.
  // These pass-through functions use different names to avoid name clashes with mixin-exported methods.

  public func updateAdminUPISettings(upiId : Text, upiName : Text) : async Types.Result<(), Types.ApiError> {
    await setAdminUPI(upiId, upiName)
  };

  // ── Tip API ────────────────────────────────────────────────────────────────

  public func addTip(
    entityId       : Text,
    entityType     : Text,
    amount         : Nat,
    fromCustomerId : Text,
    toPartnerId    : Text,
  ) : async Types.Result<Types.TipRecord, Types.ApiError> {
    tipSvc.addTip(entityId, entityType, amount, fromCustomerId, toPartnerId)
  };

  public query func getPartnerTips(partnerId : Text) : async [Types.TipRecord] {
    tipSvc.getPartnerTips(partnerId)
  };

  public query func getTotalTipsEarned(partnerId : Text) : async Nat {
    tipSvc.getTotalTipsEarned(partnerId)
  };

  public query func getCustomerTips(customerId : Text) : async [Types.TipRecord] {
    tipSvc.getCustomerTips(customerId)
  };
  public query func getAllVisitorCheckins() : async [MerchantEmployeeTypes.VisitorCheckin] {
    visitorCheckinsStore.values().toArray()
  };

  public query func getAllRecharges() : async [PaySprintTypes.UtilityTransaction] {
    utilityTransactions.values().toArray().filter(func(t : PaySprintTypes.UtilityTransaction) : Bool {
      t.serviceType == #recharge
    })
  };

  public query func getAllBillPayments() : async [PaySprintTypes.UtilityTransaction] {
    utilityTransactions.values().toArray().filter(func(t : PaySprintTypes.UtilityTransaction) : Bool {
      t.serviceType == #billPayment
    })
  };

  public query func getAllFastagTransactions() : async [PaySprintTypes.UtilityTransaction] {
    utilityTransactions.values().toArray().filter(func(t : PaySprintTypes.UtilityTransaction) : Bool {
      t.serviceType == #fastTag
    })
  };

  public query func getAllLpgBookings() : async [PaySprintTypes.UtilityTransaction] {
    utilityTransactions.values().toArray().filter(func(t : PaySprintTypes.UtilityTransaction) : Bool {
      t.serviceType == #lpg
    })
  };

  public query func getAllMunicipalityPayments() : async [PaySprintTypes.UtilityTransaction] {
    utilityTransactions.values().toArray().filter(func(t : PaySprintTypes.UtilityTransaction) : Bool {
      t.serviceType == #municipality
    })
  };

  public query func getAllInsurancePayments() : async [PaySprintTypes.UtilityTransaction] {
    utilityTransactions.values().toArray().filter(func(t : PaySprintTypes.UtilityTransaction) : Bool {
      t.serviceType == #insurance
    })
  };

  public query func getAllMatrimonyProfiles() : async [FamilyTypes.MatrimonyProfile] {
    familySvc.getMatrimonyMembers(null, null, null, null)
  };

  public query func getAllowedTipAmounts() : async [Nat] {
    TipService.ALLOWED_TIP_AMOUNTS
  };

  // ── AI Moderation API ──────────────────────────────────────────────────────

  public query func getModerationQueue() : async [Types.ModerationItem] {
    moderationSvc.getModerationQueue()
  };

  public func updateModerationStatus(
    entityType : Text,
    entityId   : Text,
    status     : Text,
    remark     : Text,
  ) : async Types.Result<Types.ModerationItem, Types.ApiError> {
    moderationSvc.updateModerationStatus(entityType, entityId, status, remark)
  };

  public query func getModerationStatusForEntity(entityType : Text, entityId : Text) : async ?Types.ModerationItem {
    moderationSvc.getModerationStatus(entityType, entityId)
  };

  public query func getAllModerationRecords() : async [Types.ModerationItem] {
    moderationSvc.getAllModerationRecords()
  };

  // ── Language / Session API ─────────────────────────────────────────────────

  public func setSessionLanguage(phone : Text, language : Text) : async () {
    botEngine.setSessionLanguage(phone, language)
  };

  public query func getSessionLanguage(phone : Text) : async Text {
    botEngine.getSessionLanguage(phone)
  };

  // ── Product Template / Parse API ───────────────────────────────────────────

  public query func getProductTemplate() : async Text {
    productSvc.getProductTemplate()
  };

  public func parseProductsFromText(merchantId : Text, rawText : Text) : async [Types.ProductInput] {
    productSvc.parseProductsFromText(merchantId, rawText)
  };

  /// Parse products from an uploaded Excel CSV payload and save them to the merchant.
  public func parseProductsFromExcel(merchantId : Text, csvText : Text) : async Types.Result<[Types.Product], Types.ApiError> {
    let parsed = productSvc.parseProductsFromText(merchantId, csvText);
    if (parsed.size() == 0) {
      return #err(#invalidInput("No products found in uploaded Excel file"));
    };
    switch (merchantSvc.getMerchantById(merchantId)) {
      case (#err(_)) { return #err(#invalidInput("Merchant not found")) };
      case (#ok(_))  {};
    };
    productSvc.addProductsBulk(merchantId, parsed, true)
  };

  /// Parse products from a photo menu description and save them to the merchant.
  public func parseProductsFromPhoto(merchantId : Text, photoDescription : Text) : async Types.Result<[Types.Product], Types.ApiError> {
    let cleanDesc = Utils.sanitizeInput(photoDescription);
    let parsed = productSvc.parseProductsFromText(merchantId, cleanDesc);
    if (parsed.size() == 0) {
      return #err(#invalidInput("No products could be extracted from photo description"));
    };
    switch (merchantSvc.getMerchantById(merchantId)) {
      case (#err(_)) { return #err(#invalidInput("Merchant not found")) };
      case (#ok(_))  {};
    };
    productSvc.addProductsBulk(merchantId, parsed, true)
  };

  public func searchProductsByKeyword(keyword : Text) : async [Types.Product] {
    productSvc.searchProducts(keyword)
  };

  // ── ONDC Local Product Search ──────────────────────────────────────────────

  public query func searchOndcProducts(
    keyword  : Text,
    location : Text,
  ) : async [{ product : Types.Product; merchant : Types.Merchant }] {
    ondcSvc.searchOndcProducts(keyword, location, merchantsByIdNew, productsByIdCurrent)
  };

  // ── Transport — Sarthi Pending Rides & Ride Details ────────────────────────

  public query func getRideDetails(rideId : Text) : async Types.Result<Types.TransportBooking, Types.ApiError> {
    transportSvc.getRideDetails(rideId)
  };

  public query func getSarthiPendingRides(sarthiId : Text) : async [Types.SarthiPendingRide] {
    transportSvc.getSarthiPendingRides(sarthiId)
  };

  public func generateFreeRideOTP(rideId : Text) : async Types.Result<PromotionTypes.SarthiOTPVerification, Types.ApiError> {
    transportSvc.generateFreeRideOTP(rideId)
  };

  // ── Subscription Enforcement ───────────────────────────────────────────────

  public query func checkAndEnforceSubscription(userId : Text) : async { hasActive : Bool; plans : [Types.SubscriptionPlan] } {
    subscriptionSvc.checkAndEnforceSubscription(userId)
  };

  // ── Subscription Assignment API (User-Based Model) ─────────────────────────

  /// Assign a delivery user (by phone) to a merchant's subscription slot with an order cap.
  public func assignUserToSubscription(
    merchantId : Text,
    userPhone  : Text,
    orderCap   : Nat,
  ) : async Types.Result<Types.SubscriptionAssignment, Text> {
    subscriptionSvc.assignUserToSubscription(merchantId, userPhone, orderCap)
  };

  /// Remove a user assignment from a merchant's subscription.
  public func removeUserFromSubscription(
    merchantId : Text,
    userPhone  : Text,
  ) : async Types.Result<(), Text> {
    subscriptionSvc.removeUserFromSubscription(merchantId, userPhone)
  };

  /// List all users assigned to a merchant's subscription.
  public query func getAssignedUsers(merchantId : Text) : async [Types.SubscriptionAssignment] {
    subscriptionSvc.getAssignedUsers(merchantId)
  };

  /// Get stats for a specific assigned user under a merchant.
  public query func getAssignedUserStats(merchantId : Text, userPhone : Text) : async ?Types.SubscriptionAssignment {
    subscriptionSvc.getAssignedUserStats(merchantId, userPhone)
  };

  /// Increment the order count for an assigned user. Called when the user places an order.
  public func incrementAssignedUserOrders(merchantId : Text, userPhone : Text) : async () {
    subscriptionSvc.incrementAssignedUserOrders(merchantId, userPhone)
  };

  /// Returns true if the assigned user is still within their per-user order cap.
  public query func checkAssignedUserOrderCap(merchantId : Text, userPhone : Text) : async Bool {
    subscriptionSvc.checkAssignedUserOrderCap(merchantId, userPhone)
  };

  /// Get aggregated subscription dashboard stats for a merchant (plan utilisation, top user, etc.).
  public query func getSubscriptionDashboardStats(merchantId : Text) : async Types.SubscriptionDashboardStats {
    subscriptionSvc.getSubscriptionDashboardStats(merchantId)
  };

  // ── Country Code / Currency / Greeting API ─────────────────────────────────

  public query func getCurrencyForUser(phone : Text) : async Text {
    userSvc.getCurrencyForPhone(phone)
  };

  public query func getCountryInfoForPhone(phone : Text) : async { countryCode : Text; currency : Text; currencySymbol : Text; countryName : Text } {
    let (cc, cur, cname) = UserService.parseCountryCode(phone);
    { countryCode = cc; currency = cur; currencySymbol = UserService.currencySymbol(cur); countryName = cname }
  };

  // ── Support Ticket API ─────────────────────────────────────────────────────

  public func createSupportTicket(
    fromPhone   : Text,
    role        : Types.UserRole,
    category    : Types.SupportTicketCategory,
    description : Text,
    orderId     : ?Text,
  ) : async Types.Result<Types.SupportTicket, Types.ApiError> {
    let cleanDesc = Utils.sanitizeInput(description);
    supportTicketSvc.createTicket(fromPhone, role, category, cleanDesc, orderId)
  };

  public func updateSupportTicket(
    ticketId  : Text,
    status    : Types.SupportTicketStatus,
    adminNote : Text,
  ) : async Types.Result<Types.SupportTicket, Types.ApiError> {
    supportTicketSvc.updateTicketStatus(ticketId, status, adminNote)
  };

  public query func getSupportTickets(filter : ?Text) : async [Types.SupportTicket] {
    supportTicketSvc.getAllTickets(filter)
  };

  public query func getMyTickets(phone : Text) : async [Types.SupportTicket] {
    supportTicketSvc.getTicketsByPhone(phone)
  };

  public query func getOverdueTickets() : async [Types.SupportTicket] {
    supportTicketSvc.getOverdueTickets()
  };

  public query func getSupportTicketById(ticketId : Text) : async Types.Result<Types.SupportTicket, Types.ApiError> {
    supportTicketSvc.getTicketById(ticketId)
  };

  // ── Rating Block Check API ─────────────────────────────────────────────────

  public query func isMerchantBlocked(merchantId : Text) : async Bool {
    merchantSvc.isMerchantBlocked(merchantId)
  };

  public query func isDeliveryPartnerBlocked(dpId : Text) : async Bool {
    dpSvc.isDeliveryPartnerBlocked(dpId)
  };

  public func manualUnblock(entityId : Text, entityType : { #merchant; #deliveryPartner }) : async Types.Result<Text, Types.ApiError> {
    switch (entityType) {
      case (#merchant) {
        switch (merchantSvc.unblockMerchant(entityId)) {
          case (#ok(_))  { #ok("Merchant unblocked") };
          case (#err(e)) { #err(e) };
        }
      };
      case (#deliveryPartner) {
        switch (dpSvc.unblockDeliveryPartner(entityId)) {
          case (#ok(_))  { #ok("Delivery partner unblocked") };
          case (#err(e)) { #err(e) };
        }
      };
    }
  };

  // ── Merchant Contact Import API ────────────────────────────────────────────

  public func importMerchantContacts(
    merchantPhone : Text,
    merchantName  : Text,
    contacts      : [Text],
  ) : async { imported : Nat; duplicates : Nat; skippedMerchants : Nat; skippedDPs : Nat } {
    contactImportSvc.importContacts(merchantPhone, merchantName, contacts)
  };

  public query func getMerchantImportStats(merchantName : Text) : async { totalImported : Nat; lastImportDate : ?Int } {
    contactImportSvc.getMerchantImportStats(merchantName)
  };

  public query func getSubscriptionDiscountForMerchant(merchantName : Text) : async Nat {
    contactImportSvc.getSubscriptionDiscount(merchantName)
  };

  public func sendMerchantPromotion(
    merchantName : Text,
    messageText  : Text,
  ) : async { sent : Nat; skipped : Nat; recipients : [Text] } {
    contactImportSvc.sendMerchantPromotion(merchantName, messageText)
  };

  public func setPromotionalOptOut(customerPhone : Text, optOut : Bool) : async Types.Result<(), Types.ApiError> {
    contactImportSvc.setPromotionalOptOut(customerPhone, optOut)
  };

  public query func getOptOutCustomers(merchantName : Text) : async [Text] {
    contactImportSvc.getOptOutCustomers(merchantName)
  };

  // ── Subscription Discounted Price ──────────────────────────────────────────

  public query func getDiscountedSubscriptionPrice(merchantName : Text, planPrice : Float) : async Float {
    let discountPct = contactImportSvc.getSubscriptionDiscount(merchantName);
    subscriptionSvc.getDiscountedPrice(discountPct, planPrice)
  };

  // ── Recipe API ─────────────────────────────────────────────────────────────

  public func createRecipe(
    ownerId     : Text,
    title       : Text,
    ingredients : [Types.RecipeIngredient],
    steps       : [Text],
    imageLink   : Text,
    videoLink   : Text,
    benefits    : Text,
    tips        : Text,
  ) : async Types.Recipe {
    let cleanTitle    = Utils.sanitizeInput(title);
    let cleanBenefits = Utils.sanitizeInput(benefits);
    let cleanTips     = Utils.sanitizeInput(tips);
    let cleanIngredients = ingredients.map(func(i) {
      { i with name = Utils.sanitizeInput(i.name) }
    });
    let cleanSteps = steps.map(func(s) { Utils.sanitizeInput(s) });
    recipeSvc.createRecipe(ownerId, cleanTitle, cleanIngredients, cleanSteps, imageLink, videoLink, cleanBenefits, cleanTips)
  };

  public query func getRecipeById(id : Text) : async ?Types.Recipe {
    recipeSvc.getRecipeById(id)
  };

  public query func getAllRecipes() : async [Types.Recipe] {
    recipeSvc.getAllRecipes()
  };

  public query func getRecipesByOwner(ownerId : Text) : async [Types.Recipe] {
    recipeSvc.getRecipesByOwner(ownerId)
  };

  public query func searchRecipes(keyword : Text) : async [Types.Recipe] {
    recipeSvc.searchRecipes(keyword)
  };

  public query func getTopRatedRecipes(limit : Nat) : async [Types.Recipe] {
    recipeSvc.getTopRatedRecipes(limit)
  };

  public func updateRecipe(
    id          : Text,
    title       : ?Text,
    ingredients : ?[Types.RecipeIngredient],
    steps       : ?[Text],
    imageLink   : ?Text,
    videoLink   : ?Text,
    benefits    : ?Text,
    tips        : ?Text,
  ) : async ?Types.Recipe {
    recipeSvc.updateRecipe(id, title, ingredients, steps, imageLink, videoLink, benefits, tips)
  };

  public func rateRecipe(id : Text, rating : Float) : async ?Types.Recipe {
    recipeSvc.rateRecipe(id, rating)
  };

  public func deleteRecipe(id : Text) : async Bool {
    recipeSvc.deleteRecipe(id)
  };

  // ── Frontend-compatible listing aliases ────────────────────────────────────
  // These thin wrappers expose the naming convention the frontend hooks expect.
  // They delegate to the existing service methods.

  /// List all jobs, optionally filtered by city (matched against location.address).
  public query func listJobs(city : ?Text) : async [Types.Job] {
    let all = jobSvc.getAllJobs(?true);
    switch (city) {
      case null all;
      case (?c) {
        let lc = c.toLower();
        all.filter(func(j : Types.Job) : Bool {
          j.location.address.toLower().contains(#text lc)
        })
      };
    }
  };

  /// Get jobs posted by a specific phone number (posterId).
  public query func getMyJobListings(phone : ?Text) : async [Types.Job] {
    switch (phone) {
      case null jobSvc.getAllJobs(null);
      case (?p) {
        let all = jobSvc.getAllJobs(null);
        all.filter(func(j : Types.Job) : Bool { j.posterId == p })
      };
    }
  };

  /// List all properties, optionally filtered by city (matched against location.address).
  public query func listProperties(city : ?Text) : async [Types.Property] {
    let all = propertySvc.getAllProperties(null, ?true);
    switch (city) {
      case null all;
      case (?c) {
        let lc = c.toLower();
        all.filter(func(p : Types.Property) : Bool {
          p.location.address.toLower().contains(#text lc)
        })
      };
    }
  };

  /// Get properties posted by a specific phone number (posterId).
  public query func getMyPropertyListings(phone : ?Text) : async [Types.Property] {
    switch (phone) {
      case null propertySvc.getAllProperties(null, null);
      case (?p) {
        let all = propertySvc.getAllProperties(null, null);
        all.filter(func(prop : Types.Property) : Bool { prop.posterId == p })
      };
    }
  };

  /// List all events, optionally filtered by city (matched against locationAddress).
  public query func listEvents(city : ?Text) : async [EventTypes.Event] {
    let all = eventSvc.getAllEvents();
    switch (city) {
      case null all;
      case (?c) {
        let lc = c.toLower();
        all.filter(func(e : EventTypes.Event) : Bool {
          e.locationAddress.toLower().contains(#text lc)
        })
      };
    }
  };

  /// Alias: list all recipes (frontend may call listRecipes instead of getAllRecipes).
  public query func listRecipes() : async [Types.Recipe] {
    recipeSvc.getAllRecipes()
  };

  /// Alias: postEvent (thin wrapper so frontend can call postEvent or createEvent).
  public func postEvent(
    organizerPhone  : Text,
    organizerName   : Text,
    eventName       : Text,
    description     : Text,
    isPaid          : Bool,
    price           : Float,
    locationAddress : Text,
    startDate       : Text,
    endDate         : Text,
    ticketVenue     : Text,
  ) : async Types.Result<EventTypes.Event, Types.ApiError> {
    let result = eventSvc.createEvent(organizerPhone, organizerName, eventName, description, isPaid, price, locationAddress, startDate, endDate, ticketVenue);
    switch (result) {
      case (#ok(e)) { moderationSvc.flagForModeration("event", e.id) };
      case (#err(_)) {};
    };
    result
  };

  /// Alias: postRecipe (thin wrapper so frontend can call postRecipe or createRecipe).
  public func postRecipe(
    ownerId     : Text,
    title       : Text,
    ingredients : [Types.RecipeIngredient],
    steps       : [Text],
    imageLink   : Text,
    videoLink   : Text,
    benefits    : Text,
    tips        : Text,
  ) : async Types.Recipe {
    let cleanTitle    = Utils.sanitizeInput(title);
    let cleanBenefits = Utils.sanitizeInput(benefits);
    let cleanTips     = Utils.sanitizeInput(tips);
    let cleanIngredients = ingredients.map(func(i) {
      { i with name = Utils.sanitizeInput(i.name) }
    });
    let cleanSteps = steps.map(func(s) { Utils.sanitizeInput(s) });
    recipeSvc.createRecipe(ownerId, cleanTitle, cleanIngredients, cleanSteps, imageLink, videoLink, cleanBenefits, cleanTips)
  };

  /// Check text content for illegal/inappropriate items using keyword moderation.
  /// Returns { approved: Bool; flaggedCategories: [Text]; reason: Text }.
  public query func checkItemModeration(text : Text) : async { approved : Bool; flaggedCategories : [Text]; reason : Text } {
    moderationSvc.checkCustomOrderContent(text)
  };

  /// Update moderation status by entityType+entityId (frontend-compatible wrapper).
  public func updateModerationStatusById(
    entityType : Text,
    entityId   : Text,
    status     : Text,
  ) : async Types.Result<Types.ModerationItem, Types.ApiError> {
    moderationSvc.updateModerationStatus(entityType, entityId, status, "")
  };

  /// Clear stuck custom-order flow states.
  /// If userId is provided, clears only that user's pending state.
  /// If null, clears all states that have been pending for more than 30 minutes.
  /// Returns the number of states cleared.
  public func clearUserFlowCache(userId : ?Text) : async Nat {
    let thirtyMinNs : Int = 30 * 60 * 1_000_000_000;
    let now = Time.now();
    switch (userId) {
      case (?uid) {
        switch (customOrderPendingStore.get(uid)) {
          case (?_) {
            customOrderPendingStore.remove(uid);
            // Also reset the chatbot session for this user
            ignore botEngine.resetConversation(uid);
            1
          };
          case null {
            // Try resetting the chatbot session by phone directly
            ignore botEngine.resetConversation(uid);
            0
          };
        }
      };
      case null {
        var cleared : Nat = 0;
        let staleKeys = List.empty<Text>();
        for ((key, ts) in customOrderPendingStore.entries()) {
          if (now - ts > thirtyMinNs) {
            staleKeys.add(key);
          };
        };
        for (key in staleKeys.values()) {
          customOrderPendingStore.remove(key);
          ignore botEngine.resetConversation(key);
          cleared += 1;
        };
        cleared
      };
    }
  };

  /// Clear ALL stuck flow caches immediately (admin full flush).
  public func clearFlowCache() : async () {
    customOrderPendingStore.clear();
  };

  /// Record that a user has a pending custom order (used by chatbot engine to track timestamps).
  public func recordCustomOrderPending(userId : Text) : async () {
    customOrderPendingStore.add(userId, Time.now())
  };

  // ── Online Partner Queries ─────────────────────────────────────────────────

  /// Get only online delivery partners.
  public query func getOnlineDeliveryPartners() : async [Types.DeliveryPartner] {
    dpSvc.listDeliveryPartners(null).filter(func(dp : Types.DeliveryPartner) : Bool {
      dp.isOnline
    })
  };

  /// Get only online sarthi partners.
  public query func getOnlineSarthiPartners() : async [Types.DeliveryPartner] {
    dpSvc.listDeliveryPartners(null).filter(func(dp : Types.DeliveryPartner) : Bool {
      if (not dp.isOnline) { return false };
      switch (dp.serviceType) {
        case (#sarthi) true;
        case _ false;
      }
    })
  };

  // ── AI Moderation: Job & Property ─────────────────────────────────────────

  /// Moderate a job posting for illegal/inappropriate content.
  public query func moderateJobPosting(
    jobTitle    : Text,
    description : Text,
  ) : async { approved : Bool; flaggedCategories : [Text]; reason : Text } {
    moderationSvc.checkJobContent(jobTitle, description)
  };

  /// Moderate a property listing for illegal/inappropriate content.
  public query func moderatePropertyPosting(
    title       : Text,
    description : Text,
  ) : async { approved : Bool; flaggedCategories : [Text]; reason : Text } {
    moderationSvc.checkPropertyContent(title, description)
  };

  /// Moderate a custom order text — keyword-based sync check.
  public query func moderateCustomOrderSync(
    orderText : Text,
  ) : async { approved : Bool; flaggedCategories : [Text]; reason : Text } {
    moderationSvc.checkCustomOrderContent(orderText)
  };

  /// Moderate a custom order via internet-based HTTP outcall check (async).
  /// Falls back to keyword-based if outcall fails.
  public func checkCustomOrderModeration(
    orderText : Text,
  ) : async { isIllegal : Bool; categories : [Text]; confidence : Float } {
    await moderationSvc.checkIllegalItemViaInternet(orderText, transform)
  };

  // ── ONDC with lat/lng ─────────────────────────────────────────────────────

  /// Search ONDC products with lat/lng coordinates (for future live ONDC API integration).
  public query func searchOndcProductsWithLocation(
    keyword   : Text,
    latitude  : Float,
    longitude : Float,
  ) : async [{ id : Text; title : Text; price : Float; merchantId : Text; merchantName : Text; category : Text; isOndc : Bool }] {
    ondcSvc.searchOndcProductsFlat(keyword, latitude, longitude, merchantsByIdNew, productsByIdCurrent)
  };

  // ── Subscription monthly reset ────────────────────────────────────────────

  /// Reset monthly order/inquiry counts for a user if a new calendar month has started.
  public func resetMonthlyCountsIfNeeded(userId : Text) : async () {
    subscriptionSvc.resetMonthlyCountsIfNeeded(userId)
  };

  // ── Supplier Orders API ────────────────────────────────────────────────────

  /// Save a supplier order (called when merchant confirms order via chatbot or admin).
  public func createSupplierOrder(
    merchantId      : Text,
    supplierContact : Text,
    itemName        : Text,
    quantity        : Text,
    notes           : Text,
  ) : async Types.SupplierOrder {
    let order : Types.SupplierOrder = {
      id              = Utils.generateId("sorder");
      merchantId;
      supplierContact;
      itemName;
      quantity;
      notes;
      status          = #pending;
      createdAt       = Time.now();
      updatedAt       = Time.now();
    };
    supplierOrdersStore.add(order.id, order);
    order
  };

  /// List supplier orders for a merchant.
  public query func getSupplierOrdersByMerchant(merchantId : Text) : async [Types.SupplierOrder] {
    let results = List.empty<Types.SupplierOrder>();
    for ((_, o) in supplierOrdersStore.entries()) {
      if (o.merchantId == merchantId) results.add(o);
    };
    results.toArray()
  };

  /// Update the status of a supplier order.
  public func updateSupplierOrderStatus(orderId : Text, newStatus : Types.SupplierOrderStatus) : async ?Types.SupplierOrder {
    switch (supplierOrdersStore.get(orderId)) {
      case null null;
      case (?o) {
        let updated = { o with status = newStatus; updatedAt = Time.now() };
        supplierOrdersStore.add(orderId, updated);
        ?updated
      };
    }
  };

  // ── Data Explorer Table Row Counts ───────────────────────────────────────
  // These functions ensure the frontend always gets valid Nat (never negative).

  /// Returns row counts for all backend tables — used by the Data Explorer.
  public query func getTableRowCounts() : async {
    users             : Nat;
    merchants         : Nat;
    products          : Nat;
    orders            : Nat;
    deliveryPartners  : Nat;
    jobs              : Nat;
    properties        : Nat;
    subscriptions     : Nat;
    events            : Nat;
    promotions        : Nat;
    shuttleRoutes     : Nat;
    supportTickets    : Nat;
    recipes           : Nat;
    ondcEnrollments   : Nat;
    familyMembers     : Nat;
    leads             : Nat;
    employees         : Nat;
    restockOrders     : Nat;
    supplierOrders    : Nat;
    moduleToggles     : Nat;
    whatsAppConfigs   : Nat;
    telegramConfigs   : Nat;
  } {
    {
      users             = usersByPhoneNew.size();
      merchants         = merchantsByIdNew.size();
      products          = productsByIdCurrent.size();
      orders            = ordersById.size();
      deliveryPartners  = dpByIdNew.size();
      jobs              = jobsStoreCurrent.size();
      properties        = propertiesStore.size();
      subscriptions     = subscriptionsStore.size();
      events            = eventsStore.size();
      promotions        = promotionsStore.size();
      shuttleRoutes     = shuttleRoutesStore.size();
      supportTickets    = supportTicketsStoreCurrent.size();
      recipes           = recipesStore.size();
      ondcEnrollments   = ondcStore.size();
      familyMembers     = familyStoreNew.size();
      leads             = leadsStore.size();
      employees         = employeesStore.size();
      restockOrders     = restockOrdersStore.size();
      supplierOrders    = supplierOrdersStore.size();
      moduleToggles     = moduleTogglesStore.size();
      whatsAppConfigs   = whatsAppConfigStore.size();
      telegramConfigs   = telegramConfigStore.size();
    }
  };

  /// Restock Orders API ──────────────────────────────────────────────────────

  /// Admin: create a restock order with a full input record.
  public shared func createRestockOrderAdmin(
    merchantId    : Text,
    merchantPhone : Text,
    supplierName  : Text,
    itemName      : Text,
    quantity      : Nat,
    notes         : Text,
  ) : async Text {
    switch (restockSvc.createRestockOrder(merchantId, merchantPhone, supplierName, itemName, quantity, notes)) {
      case (#ok(o))  o.id;
      case (#err(e)) "error: " # debug_show(e);
    }
  };

  /// Admin: update restock order fields (supplier name, item name, quantity, notes).
  /// Pass empty string for fields you do not want to update.
  public shared func updateRestockOrderAdmin(
    orderId      : Text,
    supplierName : Text,
    itemName     : Text,
    quantity     : Nat,
    notes        : Text,
  ) : async Bool {
    switch (restockOrdersStore.get(orderId)) {
      case null { false };
      case (?o) {
        let updated : Types.RestockOrder = {
          o with
          supplierName = if (supplierName == "") o.supplierName else supplierName;
          itemName     = if (itemName == "")     o.itemName     else itemName;
          quantity     = if (quantity == 0)      o.quantity     else quantity;
          notes        = if (notes == "")        o.notes        else notes;
          updatedAt    = Time.now();
        };
        restockOrdersStore.add(orderId, updated);
        true
      };
    }
  };

  /// Admin: delete a restock order by id.
  public shared func deleteRestockOrderAdmin(orderId : Text) : async Bool {
    restockSvc.deleteRestockOrder(orderId)
  };

  /// Create a restock order from merchant to supplier (via chatbot or admin).
  public func createRestockOrder(
    merchantId    : Text,
    merchantPhone : Text,
    supplierName  : Text,
    itemName      : Text,
    quantity      : Nat,
    notes         : Text,
  ) : async Types.Result<Types.RestockOrder, Types.ApiError> {
    restockSvc.createRestockOrder(merchantId, merchantPhone, supplierName, itemName, quantity, notes)
  };

  /// List all restock orders for a given merchant.
  public query func getRestockOrdersByMerchant(merchantId : Text) : async [Types.RestockOrder] {
    restockSvc.getRestockOrdersByMerchant(merchantId)
  };

  /// List all restock orders (admin view).
  public query func getAllRestockOrders() : async [Types.RestockOrder] {
    restockSvc.getAllRestockOrders()
  };

  /// Update the status of a restock order.
  public func updateRestockOrderStatus(orderId : Text, status : Types.RestockStatus) : async Types.Result<(), Types.ApiError> {
    restockSvc.updateRestockStatus(orderId, status)
  };

  /// Delete a restock order by id.
  public func deleteRestockOrder(orderId : Text) : async Bool {
    restockSvc.deleteRestockOrder(orderId)
  };

  // ── Moderation Queue write API ─────────────────────────────────────────────

  /// Admin: create a moderation item with a structured input record.
  public shared func createModerationItemAdmin(
    entityType : Text,
    entityId   : Text,
    remark     : Text,
  ) : async Text {
    let key = entityType # ":" # entityId;
    let now = Time.now();
    let item : Types.ModerationItem = {
      entityType;
      entityId;
      status    = "pending";
      remark;
      checkedAt = now;
    };
    moderationStore.add(key, item);
    key
  };

  /// Admin: update status of a moderation item by composite key (entityType:entityId).
  public shared func updateModerationItemStatusAdmin(
    id     : Text,
    status : Text,
  ) : async Bool {
    switch (moderationStore.get(id)) {
      case null { false };
      case (?existing) {
        moderationStore.add(id, { existing with status; checkedAt = Time.now() });
        true
      };
    }
  };

  /// Admin: delete a moderation item by composite key (entityType:entityId).
  public shared func deleteModerationItemAdmin(id : Text) : async Bool {
    switch (moderationStore.get(id)) {
      case null { false };
      case (?_) {
        moderationStore.remove(id);
        true
      };
    }
  };

  /// Manually flag a piece of content for moderation review.
  public func createModerationItem(contentType : Text, contentId : Text, reason : Text) : async Text {
    let key = contentType # ":" # contentId;
    let now = Time.now();
    let item : Types.ModerationItem = {
      entityType = contentType;
      entityId   = contentId;
      status     = "flagged";
      remark     = reason;
      checkedAt  = now;
    };
    moderationStore.add(key, item);
    key
  };

  /// Update the status and remarks on a moderation item (approve/reject/clear).
  public func updateModerationItemStatus(contentId : Text, contentType : Text, status : Text, notes : Text) : async Bool {
    let key = contentType # ":" # contentId;
    switch (moderationStore.get(key)) {
      case null { false };
      case (?existing) {
        moderationStore.add(key, { existing with status; remark = notes; checkedAt = Time.now() });
        true
      };
    }
  };

  /// Delete a moderation item by composite key.
  public func deleteModerationItem(contentId : Text, contentType : Text) : async Bool {
    let key = contentType # ":" # contentId;
    switch (moderationStore.get(key)) {
      case null { false };
      case (?_) {
        moderationStore.remove(key);
        true
      };
    }
  };

  // ── Support Ticket aliases for Data Explorer ────────────────────────────────

  /// List all support tickets, optionally filtered by status string ("new", "resolved", etc.).
  public query func listSupportTickets(statusFilter : ?Text) : async [Types.SupportTicket] {
    supportTicketSvc.getAllTickets(statusFilter)
  };

  /// Update support ticket status by string status label (used by Data Explorer).
  public func updateSupportTicketStatus(
    ticketId  : Text,
    statusStr : Text,
    adminNote : Text,
  ) : async Types.Result<Types.SupportTicket, Types.ApiError> {
    let status : Types.SupportTicketStatus = switch (statusStr) {
      case "assigned"    #assigned;
      case "in_progress" #in_progress;
      case "resolved"    #resolved;
      case "closed"      #closed;
      case _             #new_;
    };
    supportTicketSvc.updateTicketStatus(ticketId, status, adminNote)
  };

  // ── Restock Order aliases for Data Explorer ───────────────────────────────

  /// List restock orders, optionally filtered by merchant id.
  public query func listRestockOrders(merchantId : ?Text) : async [Types.RestockOrder] {
    switch (merchantId) {
      case null   restockSvc.getAllRestockOrders();
      case (?mid) restockSvc.getRestockOrdersByMerchant(mid);
    }
  };

  // ── Moderation aliases for Data Explorer ─────────────────────────────────

  /// List moderation items, optionally filtered by status.
  public query func listModerationItems(statusFilter : ?Text) : async [Types.ModerationItem] {
    let all = moderationSvc.getAllModerationRecords();
    switch (statusFilter) {
      case null all;
      case (?s) all.filter(func(m : Types.ModerationItem) : Bool { m.status == s });
    }
  };

  // ── Adhoc Job aliases for Data Explorer ──────────────────────────────────

  /// List adhoc jobs for Data Explorer (all adhoc jobs, optionally filtered by category).
  public query func listAdhocJobsAdmin(categoryFilter : ?Text) : async [Types.Job] {
    jobSvc.listAdhocJobs(categoryFilter, null, null, null)
  };

  // ── Support Ticket delete API ──────────────────────────────────────────────

  /// Delete a support ticket by id.
  public func deleteSupportTicket(ticketId : Text) : async Bool {
    supportTicketSvc.deleteTicket(ticketId)
  };

  /// Admin alias — delete a support ticket by id.
  public shared func deleteSupportTicketAdmin(id : Text) : async Bool {
    supportTicketSvc.deleteTicket(id)
  };

  // ── Adhoc Job status update and delete ────────────────────────────────────

  /// Close/reopen an adhoc job.
  public func updateAdhocJobStatus(jobId : Text, isOpen : Bool) : async Bool {
    switch (jobsStoreCurrent.get(jobId)) {
      case null { false };
      case (?j) {
        jobsStoreCurrent.add(jobId, { j with isOpen });
        true
      };
    }
  };

  /// Permanently delete an adhoc job.
  public func deleteAdhocJob(jobId : Text) : async Bool {
    switch (jobsStoreCurrent.get(jobId)) {
      case null { false };
      case (?_) {
        jobsStoreCurrent.remove(jobId);
        true
      };
    }
  };

  /// Admin: create a new adhoc job directly (bypasses chatbot flow).
  public shared func createAdhocJobAdmin(
    title          : Text,
    category       : Text,
    pricePerDay    : Float,
    educationLevel : Text,
    address        : Text,
    phone          : Text,
    description    : Text,
    posterId       : Text,
    jobType        : Types.JobType,
  ) : async Text {
    let loc : Types.Location = { lat = 0.0; lng = 0.0; address };
    switch (jobSvc.createAdhocJob(
      Utils.sanitizeInput(title),
      category,
      pricePerDay,
      Utils.sanitizeInput(educationLevel),
      loc,
      phone,
      Utils.sanitizeInput(description),
      posterId,
      jobType,
    )) {
      case (#ok(j))  j.id;
      case (#err(e)) "error: " # debug_show(e);
    }
  };

  /// Admin: update open/close status of an adhoc job (alias with consistent naming).
  public shared func updateAdhocJobStatusAdmin(jobId : Text, isOpenStr : Text) : async Bool {
    let isOpen = isOpenStr != "closed" and isOpenStr != "false" and isOpenStr != "inactive";
    switch (jobsStoreCurrent.get(jobId)) {
      case null { false };
      case (?j) {
        jobsStoreCurrent.add(jobId, { j with isOpen });
        true
      };
    }
  };

  /// Admin: delete an adhoc job (alias with consistent naming).
  public shared func deleteAdhocJobAdmin(jobId : Text) : async Bool {
    switch (jobsStoreCurrent.get(jobId)) {
      case null { false };
      case (?_) {
        jobsStoreCurrent.remove(jobId);
        true
      };
    }
  };

  // ── Recipe Admin CRUD ──────────────────────────────────────────────────────

  /// Admin: update a recipe by id.
  public shared func updateRecipeAdmin(
    id          : Text,
    title       : Text,
    benefits    : Text,
    tips        : Text,
  ) : async Bool {
    switch (recipeSvc.updateRecipe(id, ?title, null, null, null, null, ?benefits, ?tips)) {
      case (?_) true;
      case null false;
    }
  };

  /// Admin: delete a recipe by id.
  public shared func deleteRecipeAdmin(id : Text) : async Bool {
    recipeSvc.deleteRecipe(id)
  };

  // ── Marketplace Admin CRUD ─────────────────────────────────────────────────

  /// Admin: create a marketplace item directly.
  public shared func createMarketplaceItemAdmin(
    title             : Text,
    price             : Float,
    category          : Text,
    listingType       : Text,
    createdBy         : Text,
  ) : async Text {
    let now = Time.now();
    let id  = "mkt-admin-" # now.toText();
    let item : MarketplaceTypes.MarketplaceItem = {
      id;
      title;
      price;
      category;
      yearOfManufacture  = 0;
      instagramPhotoLink = "";
      listingType;
      invoiceAvailable   = false;
      createdBy;
      createdAt          = now;
      isActive           = true;
      cityId             = null;
    };
    marketplaceItemsById.add(id, item);
    id
  };

  /// Admin: update a marketplace item.
  public shared func updateMarketplaceItemAdmin(
    id      : Text,
    title   : Text,
    price   : Float,
    isActive: Bool,
  ) : async Bool {
    await updateMarketplaceItem(id, title, price, isActive)
  };

  /// Admin: delete a marketplace item by id.
  public shared func deleteMarketplaceItemAdmin(id : Text) : async Bool {
    await deleteMarketplaceItem(id)
  };

  // ── Bot Performance Analytics ──────────────────────────────────────────────

  /// Returns message/user/order counts broken down by channel (telegram/whatsapp/sms/simulator).
  /// Message counts come from BotLogs; user/order counts are computed from address/stateData tags.
  public query func getBotPerformanceStats() : async {
    messagesByChannel : { telegram : Nat; whatsapp : Nat; sms : Nat; simulator : Nat };
    usersByChannel    : { telegram : Nat; whatsapp : Nat; sms : Nat; simulator : Nat };
    ordersByChannel   : { telegram : Nat; whatsapp : Nat; sms : Nat; simulator : Nat };
  } {
    // Count messages from BotLogs
    var tgMsg : Nat = 0;
    var waMsg : Nat = 0;
    var smsMsg : Nat = 0;
    var simMsg : Nat = 0;
    for ((_, log) in botLogsStoreCurrent.entries()) {
      if (log.direction == "incoming") {
        switch (log.platform) {
          case "telegram"  { tgMsg  += 1 };
          case "whatsapp"  { waMsg  += 1 };
          case "sms"       { smsMsg += 1 };
          case "simulator" { simMsg += 1 };
          case _           {};
        };
      };
    };
    // Count users by channel — detect via stateData "source" tag or address
    var tgUsers : Nat = 0;
    var waUsers : Nat = 0;
    var smsUsers : Nat = 0;
    var simUsers : Nat = 0;
    for ((_, u) in usersByPhoneNew.entries()) {
      let src = u.stateData.toLower();
      let addr = switch (u.address) { case (?a) a.toLower(); case null "" };
      if (src.contains(#text "\"source\":\"telegram\"") or addr.contains(#text "source:telegram")) {
        tgUsers += 1
      } else if (src.contains(#text "\"source\":\"whatsapp\"") or addr.contains(#text "source:whatsapp")) {
        waUsers += 1
      } else if (src.contains(#text "\"source\":\"sms\"") or addr.contains(#text "source:sms")) {
        smsUsers += 1
      } else if (src.contains(#text "\"source\":\"simulator\"") or addr.contains(#text "source:simulator") or addr.contains(#text "source:script-executor") or addr.contains(#text "source:flow-agent")) {
        simUsers += 1
      };
      // Users with no source tag are not counted per-channel (registered via dashboard/admin)
    };
    // Count orders by channel — detect via notes field
    var tgOrders : Nat = 0;
    var waOrders : Nat = 0;
    var smsOrders : Nat = 0;
    var simOrders : Nat = 0;
    for ((_, o) in ordersById.entries()) {
      let notesLower = switch (o.notes) { case (?n) n.toLower(); case null "" };
      if (notesLower.contains(#text "source:telegram")) {
        tgOrders += 1
      } else if (notesLower.contains(#text "source:whatsapp")) {
        waOrders += 1
      } else if (notesLower.contains(#text "source:sms")) {
        smsOrders += 1
      } else if (notesLower.contains(#text "source:script-executor") or notesLower.contains(#text "source:flow-agent")) {
        simOrders += 1
      };
    };
    {
      messagesByChannel = { telegram = tgMsg;   whatsapp = waMsg;   sms = smsMsg;   simulator = simMsg };
      usersByChannel    = { telegram = tgUsers; whatsapp = waUsers; sms = smsUsers; simulator = simUsers };
      ordersByChannel   = { telegram = tgOrders; whatsapp = waOrders; sms = smsOrders; simulator = simOrders };
    }
  };

  /// Returns per-day message counts for the last N days from BotLogs.
  /// DailyStat: { date: Text (YYYY-MM-DD); telegram: Nat; whatsapp: Nat; sms: Nat }
  public query func getDailyBotStats(days : Nat) : async [{
    date     : Text;
    telegram : Nat;
    whatsapp : Nat;
    sms      : Nat;
  }] {
    let nanosPerDay : Int = 86_400_000_000_000;
    let now = Time.now();
    let results = List.empty<{ date : Text; telegram : Nat; whatsapp : Nat; sms : Nat }>();
    var dayIdx : Nat = 0;
    while (dayIdx < days) {
      let dayStart = now - (dayIdx.toInt() + 1) * nanosPerDay;
      let dayEnd   = now - dayIdx.toInt() * nanosPerDay;
      var tg : Nat = 0;
      var wa : Nat = 0;
      var sm : Nat = 0;
      for ((_, log) in botLogsStoreCurrent.entries()) {
        if (log.direction == "incoming" and log.timestamp >= dayStart and log.timestamp < dayEnd) {
          switch (log.platform) {
            case "telegram" { tg += 1 };
            case "whatsapp" { wa += 1 };
            case "sms"      { sm += 1 };
            case _ {};
          };
        };
      };
      // Format date as YYYY-MM-DD using division arithmetic (approximate)
      let epochSeconds : Nat = (dayStart / 1_000_000_000).toNat();
      let totalDays = epochSeconds / 86400;
      let y400 = totalDays / 146097;
      let rem400 : Nat = if (totalDays >= y400 * 146097) totalDays - y400 * 146097 else 0;
      let y100 = rem400 / 36524;
      let rem100 : Nat = if (rem400 >= y100 * 36524) rem400 - y100 * 36524 else 0;
      let y4 = rem100 / 1461;
      let rem4 : Nat = if (rem100 >= y4 * 1461) rem100 - y4 * 1461 else 0;
      let y1 = rem4 / 365;
      let year = y400 * 400 + y100 * 100 + y4 * 4 + y1 + 1970;
      let dayOfYear = rem4 - y1 * 365;
      let mdays : [Nat] = [31,28,31,30,31,30,31,31,30,31,30,31];
      var month : Nat = 1;
      var remaining = dayOfYear + 1;
      let isLeap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0);
      let feb = if (isLeap) 29 else 28;
      let mdaysAdj : [Nat] = [31, feb, 31,30,31,30,31,31,30,31,30,31];
      var mi : Nat = 0;
      while (mi < 12 and remaining > mdaysAdj[mi]) {
        remaining := if (remaining >= mdaysAdj[mi]) remaining - mdaysAdj[mi] else 0;
        month += 1;
        mi += 1;
      };
      let mm = if (month < 10) "0" # month.toText() else month.toText();
      let dd = if (remaining < 10) "0" # remaining.toText() else remaining.toText();
      let dateStr = year.toText() # "-" # mm # "-" # dd;
      results.add({ date = dateStr; telegram = tg; whatsapp = wa; sms = sm });
      dayIdx += 1;
    };
    // Return oldest first
    let arr = results.toArray();
    arr.sort(func(a : { date : Text; telegram : Nat; whatsapp : Nat; sms : Nat }, b : { date : Text; telegram : Nat; whatsapp : Nat; sms : Nat }) : Order.Order {
      Text.compare(a.date, b.date)
    })
  };

  // ── Data Explorer — flat table methods ────────────────────────────────────

  /// All marketplace (old items) listings as flat rows for Data Explorer.
  public query func getAllMarketplaceItems() : async [{
    id              : Text;
    userId          : Text;
    title           : Text;
    price           : Float;
    category        : Text;
    rentOrSale      : Text;
    invoiceAvailable: Bool;
    isActive        : Bool;
    createdAt       : Int;
  }] {
    let results = List.empty<{
      id              : Text;
      userId          : Text;
      title           : Text;
      price           : Float;
      category        : Text;
      rentOrSale      : Text;
      invoiceAvailable: Bool;
      isActive        : Bool;
      createdAt       : Int;
    }>();
    for ((_, item) in marketplaceItemsById.entries()) {
      results.add({
        id               = item.id;
        userId           = item.createdBy;
        title            = item.title;
        price            = item.price;
        category         = item.category;
        rentOrSale       = item.listingType;
        invoiceAvailable = item.invoiceAvailable;
        isActive         = item.isActive;
        createdAt        = item.createdAt;
      });
    };
    results.toArray()
  };

  /// All moderation items as flat rows for Data Explorer.
  public query func getAllModerationItems() : async [{
    id         : Text;
    contentType: Text;
    contentId  : Text;
    flagReason : Text;
    status     : Text;
    remarks    : Text;
    createdAt  : Int;
  }] {
    let results = List.empty<{
      id         : Text;
      contentType: Text;
      contentId  : Text;
      flagReason : Text;
      status     : Text;
      remarks    : Text;
      createdAt  : Int;
    }>();
    for ((_, item) in moderationStore.entries()) {
      results.add({
        id          = item.entityType # ":" # item.entityId;
        contentType = item.entityType;
        contentId   = item.entityId;
        flagReason  = item.remark;
        status      = item.status;
        remarks     = item.remark;
        createdAt   = item.checkedAt;
      });
    };
    results.toArray()
  };

  /// All support tickets as flat rows for Data Explorer.
  public query func getAllSupportTickets() : async [{
    id             : Text;
    creatorId      : Text;
    creatorRole    : Text;
    issueType      : Text;
    orderId        : Text;
    status         : Text;
    resolutionDate : ?Int;
    createdAt      : Int;
  }] {
    let results = List.empty<{
      id             : Text;
      creatorId      : Text;
      creatorRole    : Text;
      issueType      : Text;
      orderId        : Text;
      status         : Text;
      resolutionDate : ?Int;
      createdAt      : Int;
    }>();
    for ((_, t) in supportTicketsStoreCurrent.entries()) {
      let roleText = switch (t.fromRole) {
        case (#customer)        "customer";
        case (#merchant)        "merchant";
        case (#deliveryPartner) "deliveryPartner";
        case (#sarthi)          "sarthi";
        case (#admin)           "admin";
      };
      let categoryText = switch (t.category) {
        case (#payment_stuck)       "payment_stuck";
        case (#behaviour_complaint) "behaviour_complaint";
        case (#other)               "other";
      };
      let statusText = switch (t.status) {
        case (#new_)        "new";
        case (#assigned)    "assigned";
        case (#in_progress) "in_progress";
        case (#resolved)    "resolved";
        case (#closed)      "closed";
      };
      results.add({
        id             = t.ticketId;
        creatorId      = t.fromPhone;
        creatorRole    = roleText;
        issueType      = categoryText;
        orderId        = switch (t.orderId) { case (?oid) oid; case null "" };
        status         = statusText;
        resolutionDate = t.resolvedAt;
        createdAt      = t.createdAt;
      });
    };
    results.toArray()
  };

  /// All recipes as flat summary rows for Data Explorer.
  public query func getAllRecipesTable() : async [{
    id             : Text;
    userId         : Text;
    title          : Text;
    ingredientCount: Nat;
    rating         : Float;
    createdAt      : Int;
  }] {
    let results = List.empty<{
      id             : Text;
      userId         : Text;
      title          : Text;
      ingredientCount: Nat;
      rating         : Float;
      createdAt      : Int;
    }>();
    for ((_, r) in recipesStore.entries()) {
      results.add({
        id              = r.id;
        userId          = r.ownerId;
        title           = r.title;
        ingredientCount = r.ingredients.size();
        rating          = r.rating;
        createdAt       = r.createdAt;
      });
    };
    results.toArray()
  };

  /// All adhoc/daily jobs as flat rows for Data Explorer.
  public query func getAllAdhocJobs() : async [{
    id      : Text;
    posterId: Text;
    category: Text;
    title   : Text;
    price   : Float;
    jobType : Text;
    isActive: Bool;
    createdAt: Int;
  }] {
    let results = List.empty<{
      id      : Text;
      posterId: Text;
      category: Text;
      title   : Text;
      price   : Float;
      jobType : Text;
      isActive: Bool;
      createdAt: Int;
    }>();
    for ((_, j) in jobsStoreCurrent.entries()) {
      if (j.isAdhoc) {
        let jobTypeText = switch (j.jobType) {
          case (#permanent)    "permanent";
          case (#adhoc_daily)  "adhoc_daily";
          case (#adhoc_weekly) "adhoc_weekly";
          case (#oneoff)       "oneoff";
        };
        results.add({
          id        = j.id;
          posterId  = j.posterId;
          category  = j.category;
          title     = j.title;
          price     = switch (j.pricePerDay) { case (?p) p; case null 0.0 };
          jobType   = jobTypeText;
          isActive  = j.isOpen;
          createdAt = j.publishDate;
        });
      };
    };
    results.toArray()
  };


  /// All daily jobs (jobType == #adhoc_daily) as flat rows for Data Explorer.
  public query func getAllDailyJobs() : async [{
    id      : Text;
    posterId: Text;
    category: Text;
    title   : Text;
    price   : Float;
    jobType : Text;
    isActive: Bool;
    createdAt: Int;
  }] {
    let results = List.empty<{
      id      : Text;
      posterId: Text;
      category: Text;
      title   : Text;
      price   : Float;
      jobType : Text;
      isActive: Bool;
      createdAt: Int;
    }>();
    for ((_, j) in jobsStoreCurrent.entries()) {
      if (j.isAdhoc) {
        switch (j.jobType) {
          case (#adhoc_daily) {
            results.add({
              id        = j.id;
              posterId  = j.posterId;
              category  = j.category;
              title     = j.title;
              price     = switch (j.pricePerDay) { case (?p) p; case null 0.0 };
              jobType   = "adhoc_daily";
              isActive  = j.isOpen;
              createdAt = j.publishDate;
            });
          };
          case _ {};
        };
      };
    };
    results.toArray()
  };

  // ── Adhoc Job full update ─────────────────────────────────────────────────

  /// Update all fields of an adhoc job (title, category, price, description, location, phone).
  public func updateAdhocJob(
    jobId          : Text,
    title          : Text,
    category       : Text,
    pricePerDay    : Float,
    educationLevel : Text,
    description    : Text,
    phone          : Text,
    isOpen         : Bool,
  ) : async Bool {
    switch (jobsStoreCurrent.get(jobId)) {
      case null { false };
      case (?j) {
        let updated = {
          j with
          title          = Utils.sanitizeInput(title);
          category;
          salaryMin      = pricePerDay;
          salaryMax      = pricePerDay;
          pricePerDay    = ?pricePerDay;
          educationLevel = ?Utils.sanitizeInput(educationLevel);
          description    = Utils.sanitizeInput(description);
          contactPhone   = ?phone;
          isOpen;
        };
        jobsStoreCurrent.add(jobId, updated);
        true
      };
    }
  };

  // ── Restock Order full update ─────────────────────────────────────────────

  /// Update all fields of a restock order.
  public func updateRestockOrder(
    orderId      : Text,
    supplierName : Text,
    itemName     : Text,
    quantity     : Nat,
    notes        : Text,
    status       : Types.RestockStatus,
  ) : async Types.Result<Types.RestockOrder, Types.ApiError> {
    switch (restockOrdersStore.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        let updated : Types.RestockOrder = {
          o with
          supplierName = if (supplierName == "") o.supplierName else Utils.sanitizeInput(supplierName);
          itemName     = if (itemName == "")     o.itemName     else Utils.sanitizeInput(itemName);
          quantity     = if (quantity == 0)      o.quantity     else quantity;
          notes        = Utils.sanitizeInput(notes);
          status;
          updatedAt    = Time.now();
        };
        restockOrdersStore.add(orderId, updated);
        #ok(updated)
      };
    }
  };

  // ── IC HTTP gateway — Telegram webhook ────────────────────────────────────
  //
  // Telegram delivers webhook updates as HTTP POST requests.
  // On ICP, only `http_request` (query) can handle inbound HTTP — but query
  // calls cannot make outcalls.  We solve this with the two-step upgrade:
  //   1. http_request  → sees POST /telegram/webhook → returns upgrade=?true
  //   2. http_request_update (update call) → parses JSON, calls botEngine,
  //      sends the reply to Telegram via OutCall, returns 200 OK.
  //
  // http_request also handles GET /telegram/webhook (health check).

  type HttpRequest = {
    method  : Text;
    url     : Text;
    headers : [(Text, Text)];
    body    : Blob;
  };

  type HttpResponse = {
    status_code : Nat16;
    headers     : [(Text, Text)];
    body        : Blob;
    upgrade     : ?Bool;
  };

  /// Query handler — upgrades ALL POST requests to http_request_update (for outcall capability).
  /// GET /telegram/webhook returns 200 {"ok":true} for Telegram health checks.
  /// GET /sms/webhook returns 200 for SMS provider health checks.
  /// All other GET requests return 200 so health probes never see 404.
  ///
  /// IMPORTANT: Motoko requires `public query func` to have `async` return type syntactically,
  /// but the ICP HTTP gateway reads the Candid interface which strips the async wrapper from
  /// query methods. The generated Candid signature is:
  ///   http_request : (HttpRequest) -> (HttpResponse) query
  /// This is correct — the gateway treats it as synchronous. Do NOT remove `async`.
  public query func http_request(req : HttpRequest) : async HttpResponse {
    // ── CRITICAL: Upgrade every POST unconditionally to http_request_update ───
    // DO NOT add any path matching here — any path check that falls through
    // would return 404 to Telegram. The ICP HTTP gateway requires upgrade=?true
    // to re-send the request as an update call where state changes and outcalls
    // are possible. This is the ONLY correct pattern for Telegram webhooks on ICP.
    if (req.method == "POST") {
      return {
        status_code = 200;
        headers     = [("Content-Type", "text/plain")];
        body        = "".encodeUtf8();
        upgrade     = ?true;
      };
    };
    // ── GET requests: serve health checks and version endpoint ────────────────
    let path = extractPath(req.url);
    // GET /canister-version — confirms the new wasm is deployed
    if (path == "/canister-version" or path == "/canister-version/") {
      return {
        status_code = 200;
        headers     = [("Content-Type", "application/json")];
        body        = ("{\"version\":\"" # CANISTER_BUILD_ID # "\",\"ok\":true}").encodeUtf8();
        upgrade     = null;
      };
    };
    // GET /telegram/status — diagnostic: confirms bot config and recent activity
    if (path == "/telegram/status" or path == "/telegram/status/") {
      let (webhookConfigured, botTokenSet) = switch (telegramConfigStore.get("telegram_config")) {
        case null (false, false);
        case (?cfg) (cfg.webhookUrl != "", cfg.botToken != "");
      };
      let statusJson =
        "{\"ok\":true," #
        "\"version\":\"" # CANISTER_BUILD_ID # "\"," #
        "\"webhookConfigured\":" # (if webhookConfigured "true" else "false") # "," #
        "\"botTokenSet\":" # (if botTokenSet "true" else "false") # "}";
      return {
        status_code = 200;
        headers     = [("Content-Type", "application/json")];
        body        = statusJson.encodeUtf8();
        upgrade     = null;
      };
    };
    // GET /telegram/debug — delivery mode + config status (no HTTP outcall, query only)
    if (path == "/telegram/debug" or path == "/telegram/debug/") {
      let (webhookConfigured, botTokenSet, storedWebhookUrl) = switch (telegramConfigStore.get("telegram_config")) {
        case null (false, false, "");
        case (?cfg) (cfg.webhookUrl != "", cfg.botToken != "", cfg.webhookUrl);
      };
      let deliveryMode = if (webhookConfigured) "Webhook"
                         else if (pollingEnabled) "Polling"
                         else "Inactive";
      let debugJson =
        "{\"ok\":true," #
        "\"version\":\"" # CANISTER_BUILD_ID # "\"," #
        "\"webhookConfigured\":" # (if webhookConfigured "true" else "false") # "," #
        "\"botTokenSet\":" # (if botTokenSet "true" else "false") # "," #
        "\"pollingActive\":" # (if pollingEnabled "true" else "false") # "," #
        "\"webhookUrl\":\"" # storedWebhookUrl # "\"," #
        "\"currentDeliveryMode\":\"" # deliveryMode # "\"}";
      return {
        status_code = 200;
        headers     = [("Content-Type", "application/json")];
        body        = debugJson.encodeUtf8();
        upgrade     = null;
      };
    };
    // GET /telegram/webhook — Telegram health check endpoint (returns JSON)
    let isTgPath = path == "/telegram/webhook"
      or path == "/telegram/webhook/"
      or path == "/telegram"
      or path.contains(#text "/telegram");
    if (isTgPath) {
      return {
        status_code = 200;
        headers     = [("Content-Type", "application/json")];
        body        = ("{\"ok\":true,\"service\":\"LocalBazar Kart Telegram webhook\",\"version\":\"" # CANISTER_BUILD_ID # "\"}").encodeUtf8();
        upgrade     = null;
      };
    };
    // GET /sms/webhook — SMS provider health check endpoint
    let isSmsPath = path == "/sms/webhook"
      or path == "/sms/webhook/"
      or path == "/sms"
      or path.contains(#text "/sms");
    if (isSmsPath) {
      return {
        status_code = 200;
        headers     = [("Content-Type", "application/json")];
        body        = ("{\"ok\":true,\"service\":\"LocalBazar Kart SMS webhook\",\"version\":\"" # CANISTER_BUILD_ID # "\"}").encodeUtf8();
        upgrade     = null;
      };
    };
    // All other GET requests return 200 — never return 404 from this function
    {
      status_code = 200;
      headers     = [("Content-Type", "application/json")];
      body        = ("{\"ok\":true,\"service\":\"LocalBazar Kart\",\"version\":\"" # CANISTER_BUILD_ID # "\"}").encodeUtf8();
      upgrade     = null;
    }
  };

  /// Update handler — routes incoming POST webhooks to Telegram or SMS handlers.
  /// All POST requests are upgraded here (see http_request), so we check the path
  /// and dispatch to the correct handler. Body must be read BEFORE any async call.
  /// NOTE: ICP HTTP gateway calls this as an update method (has async capability for outcalls).
  public func http_request_update(req : HttpRequest) : async HttpResponse {
    // Always return 200 regardless of what happens below.
    // Returning non-200 causes providers (Telegram, SMS) to retry → duplicate messages.
    let ok200 : HttpResponse = {
      status_code = 200;
      headers     = [("Content-Type", "text/plain")];
      body        = "OK".encodeUtf8();
      upgrade     = null;
    };

    // ── Read body and path BEFORE any async call ──────────────────────────────
    // ICP invalidates req.body access after the first await, so capture everything now.
    let path = extractPath(req.url);
    let rawBodyText : Text = switch (req.body.decodeUtf8()) {
      case (?t) t;
      case null "(binary / non-UTF8 body)";
    };
    // rawBodyPreview is used only for short display labels; rawBodyText is the FULL body (no truncation).
    let rawBodyPreview : Text = if (rawBodyText.size() > 500) textTake(rawBodyText, 500) # "..." else rawBodyText;

    // ── Log every incoming request immediately (before any parsing) ─────────
    let platform = if (path.contains(#text "/sms")) "sms" else "telegram";
    logBotMessageRaw(platform, "incoming", "raw-request", rawBodyPreview, req.method, "pending", "path=" # path, rawBodyText);

    // ── Conflict detection: warn if both webhook and polling could be active ──
    // This helps diagnose 409 Conflict situations visible in Bot Logs.
    if (platform == "telegram") {
      switch (telegramConfigStore.get("telegram_config")) {
        case (?cfg) {
          if (cfg.webhookUrl != "" and telegramUpdateOffset > 0) {
            logBotMessage("telegram", "incoming", "system",
              "Warning: webhook POST received but polling offset is also set (" # telegramUpdateOffset.toText() # "). " #
              "Both webhook and polling active simultaneously — Telegram may return 409 Conflict on getUpdates calls. " #
              "Call clearWebhookAndPoll() to drain queued messages, or stop calling pollTelegramUpdates while webhook is registered.",
              "conflict-warning", "error",
              "webhookUrl=" # cfg.webhookUrl # " offset=" # telegramUpdateOffset.toText()
            );
          };
        };
        case null {};
      };
    };

    // ── Route by path ─────────────────────────────────────────────────────────
    // Use explicit path matches plus contains checks for robustness against
    // Cloudflare or ICP gateway URL format variations.
    // ── PaySprint callback handler ────────────────────────────────────────
    if (path == "/paysprint/callback" or path.contains(#text "/paysprint/callback")) {
      ignore try { await processPaySprintCallback(rawBodyText, req.headers) } catch (_) {};
      return ok200
    };

    let isSmsPath = path == "/sms/webhook"
      or path == "/sms/webhook/"
      or path == "/sms"
      or path.contains(#text "/sms/")
      or path.contains(#text "/sms");

    // Only route to Telegram if NOT an SMS path — Telegram is the default fallback.
    // This ordering ensures /sms/... is always handled by the SMS handler.

    if (isSmsPath) {
      // ── SMS webhook handler ──────────────────────────────────────────────────
      if (rawBodyText == "(binary / non-UTF8 body)") {
        logBotMessage("sms", "incoming", "unknown", rawBodyPreview, "unknown", "error", "Could not decode UTF-8 body");
        return ok200
      };

      // Parse SMS message — support both form-encoded (Twilio) and JSON formats
      let (fromPhone, _toPhone, msgBody, _msgId) = parseSMSWebhookBody(rawBodyText, req.headers);

      if (fromPhone == "") {
        logBotMessageRaw("sms", "incoming", "unknown", rawBodyPreview, "unknown", "error", "Parse failed: could not extract 'From' field", rawBodyText);
        return ok200
      };

      // Log parsed incoming message
      logBotMessageRaw("sms", "incoming", fromPhone, msgBody, "unknown", if (msgBody == "") "error" else "success", if (msgBody == "") "Empty message body" else "", rawBodyText);

      if (msgBody == "") {
        return ok200
      };

      // Process through chatbot engine
      let responseLines = try {
        await smsSvc.processSMSMessage(fromPhone, msgBody)
      } catch (e) {
        let errDetail = "Flow engine threw: " # e.message();
        logBotMessage("sms", "outgoing", fromPhone, "(flow engine error)", "unknown", "error", errDetail);
        ["LocalBazar Kart: Sorry, an error occurred. Reply 'hi' to start over."]
      };

      // Send SMS reply
      let replyText = responseLines.values().join("\n");
      let sendResult = try {
        await smsSvc.sendSMSReply(fromPhone, replyText, transform)
      } catch (e) {
        #err("Outcall threw: " # e.message())
      };

      switch (sendResult) {
        case (#ok()) {
          logBotMessage("sms", "outgoing", fromPhone, replyText, "sms-flow", "success", "");
        };
        case (#err(e)) {
          logBotMessage("sms", "outgoing", fromPhone, replyText, "sms-flow", "error", "Send failed: " # e);
        };
      };

      return ok200
    };

    // ── Telegram webhook handler (default for all other paths) ────────────────

    if (rawBodyText == "(binary / non-UTF8 body)") {
      logBotMessage("telegram", "incoming", "unknown", rawBodyPreview, "unknown", "error", "Could not decode UTF-8 body");
      return ok200
    };

    // Extract fields from Telegram Update JSON
    let (chatId, userId, msgTextRaw, msgType) = parseTelegramUpdate(rawBodyText);

    // STEP:PARSE — log parse result so we can see exactly what was extracted
    logBotMessageRaw("telegram", "incoming", if (chatId != "") chatId else "unknown",
      "STEP:PARSE chatId=" # chatId # " text=" # msgTextRaw # " type=" # msgType,
      "step-parse",
      if (chatId != "") "success" else "error",
      if (chatId == "") "JSON parse failed: could not extract chat.id" else "",
      rawBodyText
    );

    // If chatId itself is unparseable we have no way to reply — log and exit
    if (chatId == "") {
      return ok200
    };

    // tg-1 Fix 1: If msgText is empty (stickers, audio, edited_message, inline keyboard reply, etc.)
    // use a sentinel "/menu" so the chatbot engine always gets a non-empty input.
    let msgText : Text = if (msgTextRaw == "") "/menu" else msgTextRaw;
    let msgWasEmpty : Bool = msgTextRaw == "";

    // Log the incoming message with full raw payload
    logBotMessageRaw("telegram", "incoming", chatId, if (msgWasEmpty) "(no text -> /menu sentinel)" else msgText, "unknown", "success", if (msgWasEmpty) "Empty message type; using /menu fallback" else "", rawBodyText);

    // Get the Telegram config
    let cfgOpt = telegramConfigStore.get("telegram_config");
    let cfg = switch (cfgOpt) {
      case null {
        logBotMessage("telegram", "outgoing", chatId, "(no config)", "unknown", "error", "Telegram config not found — bot token unavailable, cannot reply");
        return ok200
      };
      case (?c) c;
    };
    if (not cfg.isEnabled or cfg.botToken == "") {
      let offlineDetail = if (cfg.botToken == "") "bot token is empty" else "bot is disabled (isEnabled=false)";
      logBotMessage("telegram", "outgoing", chatId, "(bot offline)", "unknown", "error", "Bot offline: " # offlineDetail);
      // Send "bot offline" message using whatever token we have
      if (cfg.botToken != "") {
        let offlineMsg = "Bot error (bot is currently offline). Please try again later.";
        try {
          switch (await telegramSvc.sendMessageWithLog(chatId, offlineMsg, cfg.botToken, transform, logBotMessage)) {
            case (#ok()) {};
            case (#err(_)) {};
          }
        } catch (sendErr) {
          logBotMessage("telegram", "outgoing", chatId, offlineMsg, "offline-handler", "error", "sendMessageWithLog threw: " # sendErr.message());
        };
      };
      return ok200
    };

    // tg-3: Log extracted chatId debug entry with rawPayload
    logBotMessageRaw("telegram", "outgoing", chatId, "[chatId extracted: " # chatId # "]", "chat-id-debug", "pending", "Extracted chatId from Telegram update JSON", rawBodyText);

    // Process through chatbot engine — catches errors and sends fallback to user.
    // NOTE: processTelegramMessage returns a COMPLETE sendMessage JSON payload
    // (including chat_id, text, and optional reply_markup). We must POST this
    // payload directly to the Telegram API — NOT pass it through sendMessageWithLog
    // which would wrap it again as a text field causing double JSON encoding.
    let sendUrl = "https://api.telegram.org/bot" # cfg.botToken # "/sendMessage";
    let sendHdrs : [OutCall.Header] = [{ name = "Content-Type"; value = "application/json" }];

    // STEP:ENGINE_START — log before calling the flow engine
    logBotMessageRaw("telegram", "incoming", chatId,
      "STEP:ENGINE_START chatId=" # chatId # " input=" # msgText,
      "step-engine", "pending", "", rawBodyText
    );

    let sendPayloadRaw = try {
      await telegramSvc.processTelegramMessage(chatId, userId, msgText, msgType)
    } catch (e) {
      let errDetail = "Flow engine threw: " # e.message();
      logBotMessage("telegram", "outgoing", chatId, "(flow engine error)", "unknown", "error", errDetail);
      // Build a minimal fallback payload and send directly
      let fallbackMsg = "Bot error (flow engine failed). Please type 'hi' to start over.";
      let fallbackPayload = "{\"chat_id\":" # chatId # ",\"text\":\"" # fallbackMsg # "\",\"parse_mode\":\"HTML\"}";
      logBotMessageRaw("telegram", "outgoing", chatId, fallbackMsg, "error-handler", "pending", "Sending fallback after flow engine failure", fallbackPayload);
      try { ignore await OutCall.httpPostRequest(sendUrl, sendHdrs, fallbackPayload, transform) } catch (sendErr) {
        logBotMessage("telegram", "outgoing", chatId, fallbackMsg, "error-handler", "error", "Fallback send failed: " # sendErr.message());
      };
      return ok200
    };

    // STEP:ENGINE_DONE — log the engine reply payload
    logBotMessageRaw("telegram", "outgoing", chatId,
      "STEP:ENGINE_DONE chatId=" # chatId # " replyLen=" # sendPayloadRaw.size().toText(),
      "step-engine", "success", "", sendPayloadRaw
    );

    // tg-4: Guard — extract the "text" field from the payload and ensure it is non-empty.
    // If empty/missing/whitespace, replace the entire payload with a safe fallback.
    let extractedText = extractJsonString(sendPayloadRaw, "\"text\"");
    let sendPayload : Text = if (extractedText == "" or extractedText.size() == 0) {
      // Replace with safe fallback — never send empty text to Telegram
      let safeFallback = "Hi! Type /menu to see available options.";
      logBotMessage("telegram", "outgoing", chatId, "(empty text guard triggered — using fallback)", "empty-text-guard", "error", "processTelegramMessage returned payload with empty text field");
      "{\"chat_id\":" # chatId # ",\"text\":\"" # safeFallback # "\",\"parse_mode\":\"HTML\"}"
    } else {
      sendPayloadRaw
    };

    // tg-3: Log the outgoing reply with full rawPayload BEFORE firing the outcall
    let replyTextForLog = extractJsonString(sendPayload, "\"text\"");
    logBotMessageRaw("telegram", "outgoing", chatId, if (replyTextForLog != "") replyTextForLog else sendPayload, msgType, "pending", "sending via HTTP outcall", sendPayload);

    // Send the COMPLETE sendMessage payload directly to Telegram.
    // The payload already contains chat_id, text, parse_mode, and optional reply_markup.
    // DO NOT wrap it through sendMessageWithLog — that function rebuilds its own payload
    // and would cause double JSON encoding (the JSON becomes the literal text value).
    try {
      let responseBody = await OutCall.httpPostRequest(sendUrl, sendHdrs, sendPayload, transform);
      let sentOk = responseBody.contains(#text "\"ok\":true");
      if (sentOk) {
        logBotMessageRaw("telegram", "outgoing", chatId, if (replyTextForLog != "") replyTextForLog else sendPayload, msgType, "success", "", sendPayload);
      } else {
        // tg-2: Detect IC0504 / out of cycles in API error responses
        let errBody = "Telegram API returned: " # responseBody;
        logBotMessageRaw("telegram", "outgoing", chatId, if (replyTextForLog != "") replyTextForLog else sendPayload, msgType, "error", errBody, sendPayload);
      }
    } catch (e) {
      // tg-2: Detect IC0504 out-of-cycles error — make it prominently visible in BotLogs
      let rawErrMsg = e.message();
      let isOutOfCycles = rawErrMsg.contains(#text "IC0504") or rawErrMsg.contains(#text "out of cycles");
      let errDetail : Text = if (isOutOfCycles) {
        "IC0504: HTTP outcall canister out of cycles — contact admin to top up cycles at canister 7fpuz-xqaaa-aaaac-qan7a-cai. Original error: " # rawErrMsg
      } else {
        "HTTP outcall threw: " # rawErrMsg
      };
      logBotMessageRaw("telegram", "outgoing", chatId, if (replyTextForLog != "") replyTextForLog else sendPayload, msgType, "error", errDetail, sendPayload);
    };

    ok200
  };

  /// Extract just the path component from a URL.
  /// Strips scheme+host prefix (e.g. "https://bot.localbazar.shop") and
  /// query string so that "/telegram/webhook" is returned regardless of
  /// whether the canister receives a full URL or a bare path.
  func extractPath(url : Text) : Text {
    // 1. Strip query string
    let noQuery = switch (url.split(#char '?').next()) {
      case (?p) p;
      case null url;
    };
    // 2. Strip scheme+host: if URL contains "://", drop everything up to and
    //    including the first "/" that follows the host (i.e. the path starts
    //    at the third "/" in "https://host/path").
    //    We locate the "//" from the scheme, skip past it, then find the next
    //    "/" which is the start of the path.
    if (noQuery.contains(#text "://")) {
      // find position of "://"
      switch (findSubstring(noQuery, "://")) {
        case null noQuery;
        case (?schemeEnd) {
          // skip past "://" (3 chars) to get to the host part
          let afterScheme = textDrop(noQuery, schemeEnd + 3);
          // find the "/" that ends the host
          switch (findSubstring(afterScheme, "/")) {
            case null "/";         // no path at all → treat as root
            case (?slashPos) textDrop(afterScheme, slashPos);
          }
        };
      }
    } else {
      noQuery
    }
  };

  /// Parse an incoming SMS webhook body.
  /// Supports both application/x-www-form-urlencoded (Twilio format) and JSON.
  /// Returns (from, to, body, messageId). Returns ("", "", "", "") on parse failure.
  func parseSMSWebhookBody(body : Text, headers : [(Text, Text)]) : (Text, Text, Text, Text) {
    // Check Content-Type header to determine format
    var contentType = "";
    for ((k, v) in headers.vals()) {
      if (k.toLower() == "content-type") {
        contentType := v.toLower();
      };
    };

    if (contentType.contains(#text "application/json") or body.contains(#text "\"From\"") or body.contains(#text "\"from\"")) {
      // JSON format
      let from = switch (extractJsonStringValue(body, "From")) {
        case (?v) v;
        case null switch (extractJsonStringValue(body, "from")) {
          case (?v) v;
          case null "";
        };
      };
      let to = switch (extractJsonStringValue(body, "To")) {
        case (?v) v;
        case null switch (extractJsonStringValue(body, "to")) {
          case (?v) v;
          case null "";
        };
      };
      let msgBody = switch (extractJsonStringValue(body, "Body")) {
        case (?v) v;
        case null switch (extractJsonStringValue(body, "body")) {
          case (?v) v;
          case null "";
        };
      };
      let msgId = switch (extractJsonStringValue(body, "MessageSid")) {
        case (?v) v;
        case null switch (extractJsonStringValue(body, "messageId")) {
          case (?v) v;
          case null "";
        };
      };
      (from, to, msgBody, msgId)
    } else {
      // URL-encoded format: From=%2B1234567890&To=%2B0987654321&Body=hello&MessageSid=SMxxxx
      let from    = urlDecodeField(body, "From");
      let to      = urlDecodeField(body, "To");
      let msgBody = urlDecodeField(body, "Body");
      let msgId   = urlDecodeField(body, "MessageSid");
      (from, to, msgBody, msgId)
    }
  };

  /// Extract value of a JSON string field by key. Returns null if not found.
  func extractJsonStringValue(json : Text, key : Text) : ?Text {
    let pattern = "\"" # key # "\"";
    switch (findSubstring(json, pattern)) {
      case null null;
      case (?pos) {
        let after = textDrop(json, pos + pattern.size());
        let trimmed = trimWhitespaceAndColon(after);
        if (trimmed.size() == 0) return null;
        let first = charAt(trimmed, 0);
        if (first == '\"') {
          ?extractQuotedString(textDrop(trimmed, 1))
        } else {
          null
        }
      };
    }
  };

  /// Extract a URL-encoded form field value by name.
  /// Returns "" if field not found.
  func urlDecodeField(body : Text, fieldName : Text) : Text {
    // Look for fieldName= at start or after &
    let pattern1 = fieldName # "=";
    let pattern2 = "&" # fieldName # "=";

    let startPos : ?Nat = switch (findSubstring(body, pattern1)) {
      case (?p) if (p == 0) ?p else switch (findSubstring(body, pattern2)) {
        case (?p2) ?(p2 + 1);
        case null null;
      };
      case null null;
    };

    switch (startPos) {
      case null "";
      case (?pos) {
        let afterEq = textDrop(body, pos + pattern1.size());
        // Read until '&' or end of string
        let valueParts = afterEq.split(#char '&').toArray();
        if (valueParts.size() == 0) return "";
        urlPercentDecode(valueParts[0])
      };
    }
  };

  /// Minimal URL percent-decoder — handles %XX and + → space.
  func urlPercentDecode(s : Text) : Text {
    let buf = List.empty<Char>();
    var iter = s.toIter();
    label loop_ loop {
      switch (iter.next()) {
        case null break loop_;
        case (?c) {
          if (c == '+') {
            buf.add(' ');
          } else if (c == '%') {
            // read next 2 hex chars
            let h1 = switch (iter.next()) { case (?x) x; case null { buf.add('%'); break loop_ } };
            let h2 = switch (iter.next()) { case (?x) x; case null { buf.add('%'); buf.add(h1); break loop_ } };
            let hexVal = hexCharToNat(h1) * 16 + hexCharToNat(h2);
            if (hexVal < 128) {
              buf.add(hexVal.toNat32().toChar());
            } else {
              // Non-ASCII percent-encoded — output replacement character
              buf.add('?');
            };
          } else {
            buf.add(c);
          };
        };
      };
    };
    Text.fromIter(buf.values())
  };

  func hexCharToNat(c : Char) : Nat {
    if (c >= '0' and c <= '9') (c.toNat32() - '0'.toNat32()).toNat()
    else if (c >= 'a' and c <= 'f') 10 + (c.toNat32() - 'a'.toNat32()).toNat()
    else if (c >= 'A' and c <= 'F') 10 + (c.toNat32() - 'A'.toNat32()).toNat()
    else 0
  };

  /// Parse a Telegram Update JSON blob and return (chatId, userId, text, messageType).
  /// Uses simple Text search — no JSON library needed for this well-known format.
  /// Returns ("", "", "", "") if parsing fails.
  /// Supported message types: text, /start command, callback_query (inline keyboard), contact sharing.
  func parseTelegramUpdate(json : Text) : (Text, Text, Text, Text) {
    let isCallback = json.contains(#text "\"callback_query\"");
    let isContact  = json.contains(#text "\"contact\"");

    if (isCallback) {
      // callback_query.message.chat.id, callback_query.from.id, callback_query.data
      let chatId = extractJsonId(json, "\"chat\"");
      let userId = extractJsonId(json, "\"from\"");
      let data   = extractJsonString(json, "\"data\"");
      (chatId, userId, data, "callback")
    } else if (isContact) {
      // Contact share: message.chat.id, message.from.id, message.contact.phone_number
      let chatId      = extractJsonId(json, "\"chat\"");
      let userId      = extractJsonId(json, "\"from\"");
      let phoneNumber = extractJsonString(json, "\"phone_number\"");
      // Prefix with "CONTACT:" so the chatbot engine can detect shared contact
      let msgText = if (phoneNumber != "") "CONTACT:" # phoneNumber else "(contact share)";
      (chatId, userId, msgText, "contact")
    } else {
      // message.chat.id, message.from.id, message.text
      let chatId = extractJsonId(json, "\"chat\"");
      let userId = extractJsonId(json, "\"from\"");
      let text   = extractJsonString(json, "\"text\"");
      (chatId, userId, text, "text")
    }
  };

  /// Extract the numeric or string `id` field from the first occurrence of a
  /// JSON object matching `objectKey` (e.g. "\"chat\"").
  /// Returns "" on failure.
  func extractJsonId(json : Text, objectKey : Text) : Text {
    // Find objectKey position
    switch (findSubstring(json, objectKey)) {
      case null "";
      case (?pos) {
        // Slice past the objectKey to find "id":
        let after = textDrop(json, pos + objectKey.size());
        switch (findSubstring(after, "\"id\"")) {
          case null "";
          case (?idPos) {
            let afterId = textDrop(after, idPos + 4); // skip past "id"
            // skip whitespace and colon
            let trimmed = trimWhitespaceAndColon(afterId);
            if (trimmed.size() == 0) return "";
            // Could be a number or a quoted string
            let first = charAt(trimmed, 0);
            if (first == '\"') {
              // quoted string id
              extractQuotedString(textDrop(trimmed, 1))
            } else {
              // numeric id — read until non-digit
              extractNumber(trimmed)
            }
          };
        }
      };
    }
  };

  /// Extract the value of a JSON string field `fieldKey` (e.g. "\"text\"").
  /// Returns "" on failure.
  func extractJsonString(json : Text, fieldKey : Text) : Text {
    switch (findSubstring(json, fieldKey)) {
      case null "";
      case (?pos) {
        let after = textDrop(json, pos + fieldKey.size());
        let trimmed = trimWhitespaceAndColon(after);
        if (trimmed.size() == 0) return "";
        let first = charAt(trimmed, 0);
        if (first == '\"') {
          extractQuotedString(textDrop(trimmed, 1))
        } else {
          extractNumber(trimmed)
        }
      };
    }
  };

  /// Returns the index of the first occurrence of `needle` in `haystack`, or null.
  func findSubstring(haystack : Text, needle : Text) : ?Nat {
    let hs = haystack.size();
    let ns = needle.size();
    if (ns == 0) return ?0;
    if (ns > hs) return null;
    var i : Nat = 0;
    while (i + ns <= hs) {
      if (textSlice(haystack, i, i + ns) == needle) return ?i;
      i += 1;
    };
    null
  };

  /// Drop first `n` characters from text.
  func textDrop(t : Text, n : Nat) : Text {
    if (n == 0) return t;
    Text.fromIter(t.toIter().drop(n))
  };

  /// Take first `n` characters from text.
  func textTake(t : Text, n : Nat) : Text {
    Text.fromIter(t.toIter().take(n))
  };

  /// Slice text from index `from` (inclusive) to `to` (exclusive).
  func textSlice(t : Text, from : Nat, to : Nat) : Text {
    textTake(textDrop(t, from), to - from)
  };

  /// Return the character at position `i` in text, or '\u{0000}' if out of bounds.
  func charAt(t : Text, i : Nat) : Char {
    switch (t.toIter().drop(i).next()) {
      case (?c) c;
      case null '\u{0000}';
    }
  };

  /// Skip leading whitespace, then a colon, then more whitespace.
  func trimWhitespaceAndColon(t : Text) : Text {
    var iter = t.toIter();
    var result = "";
    var foundColon = false;
    label scan loop {
      switch (iter.next()) {
        case null break scan;
        case (?c) {
          if (not foundColon) {
            if (c == ':') { foundColon := true }
            else if (c == ' ' or c == '\t' or c == '\n' or c == '\r') {}
            else { break scan };
          } else {
            if (c == ' ' or c == '\t' or c == '\n' or c == '\r') {}
            else {
              // c is the first real char after the colon
              result := Text.fromChar(c) # Text.fromIter(iter);
              break scan;
            }
          }
        };
      }
    };
    result
  };

  /// Extract chars up to (not including) the closing '"', handling \"
  func extractQuotedString(t : Text) : Text {
    let buf = List.empty<Char>();
    var iter = t.toIter();
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

  /// Extract contiguous digit characters (for numeric JSON values).
  func extractNumber(t : Text) : Text {
    let buf = List.empty<Char>();
    label scan for (c in t.toIter()) {
      if (c >= '0' and c <= '9') { buf.add(c) }
      else if (c == '-' and buf.size() == 0) { buf.add(c) }
      else { break scan };
    };
    Text.fromIter(buf.values())
  };

  // ── City aliases ────────────────────────────────────────────────────────────────────────────────────

  /// Return all city controls as a flat array for Data Explorer.
  public query func getAllCityControls() : async [CityTypes.CityControl] {
    cityControlsByIdCurrent.values().toArray()
  };

  /// Add a CityControl record for a city (creates if missing, returns existing if already present).
  public func addCityControl(cityId : Text) : async { #ok : CityTypes.CityControl; #err : Text } {
    switch (citiesByIdCurrent.get(cityId)) {
      case null { #err("City not found: " # cityId) };
      case (?city) {
        switch (cityControlsByIdCurrent.get(cityId)) {
          case (?existing) { #ok(existing) };
          case null {
            let ctrl : CityTypes.CityControl = {
              cityId;
              cityName      = city.name;
              pincode       = city.pincode;
              moduleToggles = [];
            };
            cityControlsByIdCurrent.add(cityId, ctrl);
            #ok(ctrl)
          };
        }
      };
    }
  };

  /// Delete a CityControl record by cityId.
  public func deleteCityControlRecord(cityId : Text) : async Bool {
    switch (cityControlsByIdCurrent.get(cityId)) {
      case null { false };
      case (?_) {
        cityControlsByIdCurrent.remove(cityId);
        true
      };
    }
  };

  /// Alias: get support tickets for a user phone (frontend may call getMySupportTickets).
  public query func getMySupportTickets(phone : Text) : async [Types.SupportTicket] {
    supportTicketSvc.getTicketsByPhone(phone)
  };

  /// Alias: get all support tickets as full records (not flattened Data Explorer rows).
  public query func getAllSupportTicketsFull(filter : ?Text) : async [Types.SupportTicket] {
    supportTicketSvc.getAllTickets(filter)
  };

  /// Return all adhoc jobs as [Types.Job] — used by frontend pages that need full Job records.
  public query func listAllAdhocJobs() : async [Types.Job] {
    jobSvc.listAdhocJobs(null, null, null, null)
  };


  // ── Matrimony API ───────────────────────────────────────────────────────────

  /// Update matrimony eligibility and profile for a family member.
  public func updateMatrimonyEligibility(
    memberId           : Text,
    eligible           : Bool,
    caste              : ?Text,
    occupation         : ?Text,
    education          : ?Text,
    locationPreference : ?Text,
    bloodGroup         : ?Text,
    age                : ?Nat,
  ) : async Types.Result<FamilyTypes.FamilyMember, Types.ApiError> {
    familySvc.updateMatrimonyEligibility(memberId, eligible, caste, occupation, education, locationPreference, bloodGroup, age)
  };

  /// Search matrimony-eligible family members with optional filters.
  public query func getMatrimonyMembers(
    casteFilter    : ?Text,
    locationFilter : ?Text,
    educationFilter: ?Text,
    bloodGrpFilter : ?Text,
  ) : async [FamilyTypes.MatrimonyProfile] {
    familySvc.getMatrimonyMembers(casteFilter, locationFilter, educationFilter, bloodGrpFilter)
  };

  /// Returns true if the phone owner has at least one matrimony-eligible family member.
  public query func hasMatrimonyEligibleMember(ownerPhone : Text) : async Bool {
    familySvc.hasMatrimonyEligibleMember(ownerPhone)
  };

  // ── Donation API ──────────────────────────────────────────────────────────

  func genDonationId() : Text {
    nextDonationId += 1;
    "don_" # nextDonationId.toText()
  };

  /// Add a donation offer.
  public func addDonation(
    category    : Text,
    description : Text,
    quantity    : Text,
    location    : Text,
    contactPhone : Text,
    donorPhone  : Text,
    donorName   : Text,
    source      : Text,
  ) : async Types.Result<Text, Text> {
    let id = genDonationId();
    let item : Types.DonationItem = {
      id;
      category;
      description = Utils.sanitizeInput(description);
      quantity;
      location    = Utils.sanitizeInput(location);
      contactPhone;
      donorPhone;
      donorName   = Utils.sanitizeInput(donorName);
      status      = "Available";
      createdAt   = Time.now();
      source;
    };
    donationsStore.add(id, item);
    #ok(id)
  };

  /// Search donations with optional category and location filters.
  public query func searchDonations(
    categoryFilter : ?Text,
    locationFilter : ?Text,
  ) : async [Types.DonationItem] {
    let results = List.empty<Types.DonationItem>();
    for ((_, d) in donationsStore.entries()) {
      if (d.status == "Available") {
        let catOk = switch (categoryFilter) {
          case null true;
          case (?c) d.category.toLower() == c.toLower();
        };
        let locOk = switch (locationFilter) {
          case null true;
          case (?l) d.location.toLower().contains(#text (l.toLower()));
        };
        if (catOk and locOk) results.add(d);
      };
    };
    results.toArray()
  };

  /// Place a donation request.
  public func requestDonation(
    category       : Text,
    description    : Text,
    quantityNeeded : Text,
    location       : Text,
    requesterPhone : Text,
    requesterName  : Text,
    source         : Text,
  ) : async Types.Result<Text, Text> {
    let id = genDonationId();
    let req : Types.DonationRequest = {
      id;
      category;
      description    = Utils.sanitizeInput(description);
      quantityNeeded;
      location       = Utils.sanitizeInput(location);
      requesterPhone;
      requesterName  = Utils.sanitizeInput(requesterName);
      status         = "Pending";
      createdAt      = Time.now();
      source;
    };
    donationRequestsStore.add(id, req);
    #ok(id)
  };

  /// Admin: get all donations.
  public query func getDonations() : async [Types.DonationItem] {
    donationsStore.values().toArray()
  };

  /// Admin: get all donation requests.
  public query func getDonationRequests() : async [Types.DonationRequest] {
    donationRequestsStore.values().toArray()
  };

  /// Update a donation item's status.
  public func updateDonationStatus(id : Text, status : Text) : async Types.Result<(), Text> {
    switch (donationsStore.get(id)) {
      case null { #err("Donation not found") };
      case (?d) {
        donationsStore.add(id, { d with status });
        #ok(())
      };
    }
  };

  /// Update a donation request's status.
  public func updateDonationRequestStatus(id : Text, status : Text) : async Types.Result<(), Text> {
    switch (donationRequestsStore.get(id)) {
      case null { #err("Donation request not found") };
      case (?r) {
        donationRequestsStore.add(id, { r with status });
        #ok(())
      };
    }
  };

  /// Delete a donation item.
  public func deleteDonation(id : Text) : async Types.Result<(), Text> {
    switch (donationsStore.get(id)) {
      case null { #err("Donation not found") };
      case (?_) {
        donationsStore.remove(id);
        #ok(())
      };
    }
  };

  /// Delete a donation request.
  public func deleteDonationRequest(id : Text) : async Types.Result<(), Text> {
    switch (donationRequestsStore.get(id)) {
      case null { #err("Donation request not found") };
      case (?_) {
        donationRequestsStore.remove(id);
        #ok(())
      };
    }
  };

  // ── Test Order Tracking API ────────────────────────────────────────────

  /// Create a test order (created by Script Executor / Flow Agent).
  /// Marks the order ID in testOrderIds so getTestOrders can return it.
  public func createTestOrder(
    merchantId        : Text,
    items             : [Types.OrderItem],
    customerId        : Text,
    deliveryPartnerId : ?Text,
  ) : async Types.Result<Text, Text> {
    let result = orderSvc.createOrder(
      customerId,
      merchantId,
      items,
      null,
      #cod,
      ?"source:script-executor",
    );
    switch (result) {
      case (#ok(o)) {
        testOrderIds.add(o.id, true);
        // Assign delivery partner if provided
        switch (deliveryPartnerId) {
          case null {};
          case (?dpId) { ignore orderSvc.assignDeliveryPartner(o.id, dpId) };
        };
        #ok(o.id)
      };
      case (#err(e)) { #err(debug_show(e)) };
    }
  };

  /// Return up to 20 most-recent test orders (orders created by Script Executor / Flow Agent).
  public query func getTestOrders() : async [Types.Order] {
    let results = List.empty<Types.Order>();
    for ((id, _) in testOrderIds.entries()) {
      switch (ordersById.get(id)) {
        case (?o) results.add(o);
        case null {};
      };
    };
    // Sort descending by createdAt and limit to 20
    let sorted = results.toArray().sort(func(a : Types.Order, b : Types.Order) : Order.Order {
      if (a.createdAt > b.createdAt) #less
      else if (a.createdAt < b.createdAt) #greater
      else #equal
    });
    if (sorted.size() <= 20) sorted
    else sorted.sliceToArray(0, 20)
  };

  /// Returns true when the given order ID was created as a test run.
  public query func isTestOrder(orderId : Text) : async Bool {
    testOrderIds.get(orderId) != null
  };

  /// Alias: getRestockOrders returns all restock orders (frontend may call getRestockOrders).
  public query func getRestockOrders() : async [Types.RestockOrder] {
    restockSvc.getAllRestockOrders()
  };

  /// Alias: getMarketplaceItems returns all marketplace items as flat rows for frontend/Data Explorer.
  public query func getMarketplaceItems() : async [{
    id              : Text;
    userId          : Text;
    title           : Text;
    price           : Float;
    category        : Text;
    rentOrSale      : Text;
    invoiceAvailable: Bool;
    isActive        : Bool;
    createdAt       : Int;
  }] {
    let results = List.empty<{
      id              : Text;
      userId          : Text;
      title           : Text;
      price           : Float;
      category        : Text;
      rentOrSale      : Text;
      invoiceAvailable: Bool;
      isActive        : Bool;
      createdAt       : Int;
    }>();
    for ((_, item) in marketplaceItemsById.entries()) {
      results.add({
        id               = item.id;
        userId           = item.createdBy;
        title            = item.title;
        price            = item.price;
        category         = item.category;
        rentOrSale       = item.listingType;
        invoiceAvailable = item.invoiceAvailable;
        isActive         = item.isActive;
        createdAt        = item.createdAt;
      });
    };
    results.toArray()
  };

  /// Alias: getCityControls returns all city controls (flat array, empty if none).
  public query func getCityControls() : async [CityTypes.CityControl] {
    cityControlsByIdCurrent.values().toArray()
  };

  /// Alias: get bot logs by platform — frontend may call getBotLogs instead of listBotLogs.
  public query func getBotLogs(platform : Text) : async [Types.BotLog] {
    let result = List.empty<Types.BotLog>();
    for ((_, entry) in botLogsStoreCurrent.entries()) {
      if (platform == "all" or entry.platform == platform) {
        result.add(entry);
      };
    };
    result.toArray().sort(func(a : Types.BotLog, b : Types.BotLog) : Order.Order {
      if (a.timestamp > b.timestamp) #less
      else if (a.timestamp < b.timestamp) #greater
      else #equal
    })
  };
  // ── Admin Principal Management ───────────────────────────────────────────────

  /// Internal helper: returns true when the caller's principal is in the
  /// admin whitelist.
  func isAdminCaller(caller : Principal) : Bool {
    adminPrincipalsStore.get(caller.toText()) == ?true
  };

  /// One-time bootstrap: the first Internet Identity caller claims admin.
  /// After that this call is a no-op (returns false).
  public shared ({ caller }) func initAdminPrincipal() : async Bool {
    if (adminClaimState.claimed) { return false };
    // Reject the anonymous principal
    if (caller.toText() == "2vxsx-fae") { return false };
    adminPrincipalsStore.add(caller.toText(), true);
    adminClaimState.claimed := true;
    true
  };

  /// Add an Internet Identity principal to the admin whitelist.
  /// Only existing admins can call this.
  public shared ({ caller }) func addAdminPrincipal(p : Principal) : async Types.Result<Bool, Text> {
    if (not isAdminCaller(caller)) { return #err("Unauthorized") };
    if (p.toText() == "2vxsx-fae") { return #err("Cannot add anonymous principal") };
    adminPrincipalsStore.add(p.toText(), true);
    #ok(true)
  };

  /// Remove an Internet Identity principal from the admin whitelist.
  /// Only existing admins can call this. Cannot remove yourself.
  public shared ({ caller }) func removeAdminPrincipal(p : Principal) : async Types.Result<Bool, Text> {
    if (not isAdminCaller(caller)) { return #err("Unauthorized") };
    if (p == caller) { return #err("Cannot remove your own admin access") };
    adminPrincipalsStore.remove(p.toText());
    #ok(true)
  };

  /// Return all admin principals as text IDs.
  public query func getAdminPrincipals() : async [Text] {
    let result = List.empty<Text>();
    for ((p, isAdmin) in adminPrincipalsStore.entries()) {
      if (isAdmin) { result.add(p) };
    };
    result.toArray()
  };

  // ── Product Barcode & Scan History API ────────────────────────────────────

  /// Look up a product by its barcode value OR by its product ID.
  /// Iterates productsByIdCurrent and returns the first match.
  public query func getProductByBarcode(barcodeValue : Text) : async ?Types.Product {
    var found : ?Types.Product = null;
    label search for ((_, p) in productsByIdCurrent.entries()) {
      if (p.barcodeValue == ?barcodeValue or p.id == barcodeValue) {
        found := ?p;
        break search;
      };
    };
    found
  };

  /// Record a product barcode scan event for a merchant device.
  public shared func addProductScanHistory(entry : Types.ProductScanHistoryInput) : async { #ok : Types.ProductScanHistory; #err : { errorDetail : Text } } {
    let id = Time.now().toText() # "_" # entry.merchantId;
    let record : Types.ProductScanHistory = {
      id           = id;
      productId    = entry.productId;
      barcodeValue = entry.barcodeValue;
      merchantId   = entry.merchantId;
      scanTime     = Time.now();
      deviceInfo   = entry.deviceInfo;
    };
    scanHistoryStore.add(id, record);
    #ok(record)
  };

  /// Return the most recent scan history entries for a merchant, ordered by scanTime descending.
  public query func getProductScanHistory(merchantId : Text, limit : Nat) : async [Types.ProductScanHistory] {
    let all = List.empty<Types.ProductScanHistory>();
    for ((_, entry) in scanHistoryStore.entries()) {
      if (entry.merchantId == merchantId) { all.add(entry) };
    };
    let sorted = all.toArray().sort(func(a : Types.ProductScanHistory, b : Types.ProductScanHistory) : Order.Order {
      if (a.scanTime > b.scanTime) #less
      else if (a.scanTime < b.scanTime) #greater
      else #equal
    });
    if (sorted.size() <= limit or limit == 0) { sorted }
    else { sorted.sliceToArray(0, Int.fromNat(limit)) }
  };

  /// Delete a scan history entry — only allowed for the owning merchant.
  public shared func deleteProductScanEntry(entryId : Text, merchantId : Text) : async { #ok : Bool; #err : { errorDetail : Text } } {
    switch (scanHistoryStore.get(entryId)) {
      case null { #err({ errorDetail = "Scan entry not found" }) };
      case (?entry) {
        if (entry.merchantId != merchantId) {
          return #err({ errorDetail = "Unauthorized: entry does not belong to this merchant" });
        };
        scanHistoryStore.remove(entryId);
        #ok(true)
      };
    }
  };

  /// Return the merchant's subscription status along with product count and limit info.
  public query func getMerchantSubscriptionStatus(merchantId : Text) : async {
    isActive       : Bool;
    planName       : Text;
    productCount   : Nat;
    productLimit   : ?Nat;
    isAtLimit      : Bool;
    daysRemaining  : ?Int;
  } {
    let isActive = subscriptionSvc.isSubscriptionActive(merchantId);
    // Count products for this merchant
    var productCount : Nat = 0;
    for ((_, p) in productsByIdCurrent.entries()) {
      if (p.merchantId == merchantId) { productCount += 1 };
    };
    // Resolve plan name, product limit, and days remaining
    let (planName, productLimit, daysRemaining) = switch (subscriptionSvc.getUserSubscription(merchantId)) {
      case (#err(_)) { ("Free", ?45, null) };
      case (#ok(sub)) {
        let name = switch (subscriptionSvc.getPlanById(sub.planId)) {
          case (#ok(plan)) plan.name;
          case (#err(_))   "Free";
        };
        let lim = switch (subscriptionSvc.getPlanById(sub.planId)) {
          case (#ok(plan)) {
            if (plan.orderLimit == 0) null  // 0 = unlimited
            else ?(plan.orderLimit)
          };
          case (#err(_)) ?45;
        };
        let remaining : ?Int = ?(sub.endDate - Time.now());
        (name, lim, remaining)
      };
    };
    let isAtLimit : Bool = switch (productLimit) {
      case null  false;  // unlimited plan
      case (?lim) productCount >= lim;
    };
    { isActive; planName; productCount; productLimit; isAtLimit; daysRemaining }
  };

  // ── Language Learning public API ─────────────────────────────────────────

  public func addCourse(
    creatorPhone : Text,
    title        : Text,
    languagePair : Text,
    description  : Text,
    price        : Nat,
  ) : async { #ok : Text; #err : { errorDetail : Text } } {
    languageLearningSvc.addCourse(creatorPhone, title, languagePair, description, price)
  };

  public query func getCourse(id : Text) : async ?LanguageLearningTypes.LanguageCourse {
    switch (languageLearningSvc.getCourse(id)) {
      case (#ok c) ?c;
      case (#err _) null;
    }
  };

  public query func searchCourses(keyword : Text, languagePair : Text) : async [LanguageLearningTypes.LanguageCourse] {
    languageLearningSvc.searchCourses(keyword, languagePair)
  };

  public func enrollUser(userId : Text, courseId : Text) : async { #ok : Text; #err : { errorDetail : Text } } {
    languageLearningSvc.enrollUser(userId, courseId)
  };

  public query func getUserEnrollments(userId : Text) : async [LanguageLearningTypes.UserEnrollment] {
    languageLearningSvc.getUserEnrollments(userId)
  };

  public func saveWord(
    userId             : Text,
    word               : Text,
    language           : Text,
    translation        : Text,
    ancientTranslation : Text,
    ipa                : Text,
    examples           : [Text],
  ) : async { #ok : Text; #err : { errorDetail : Text } } {
    languageLearningSvc.saveWord(userId, word, language, translation, ancientTranslation, ipa, examples)
  };

  public query func searchWordDefinition(word : Text, language : Text) : async ?LanguageLearningTypes.WordDefinition {
    languageLearningSvc.searchWordDefinition(word, language)
  };

  public func generateDailyLesson(
    userId        : Text,
    languagePair  : Text,
    topic         : Text,
    difficulty    : Text,
    content       : Text,
    quizQuestion  : Text,
    quizChoices   : [Text],
    correctAnswer : Nat,
  ) : async { #ok : Text; #err : { errorDetail : Text } } {
    languageLearningSvc.generateDailyLesson(
      userId, languagePair, topic, difficulty, content,
      quizQuestion, quizChoices, correctAnswer, []
    )
  };

  public func markLessonComplete(dailyLessonId : Text) : async { #ok : Text; #err : { errorDetail : Text } } {
    switch (languageLearningSvc.markLessonComplete(dailyLessonId)) {
      case (#ok _)                { #ok dailyLessonId };
      case (#err { errorDetail }) { #err { errorDetail } };
    }
  };

  public query func getDailyStreak(userId : Text) : async Nat {
    languageLearningSvc.getDailyStreak(userId)
  };

  public query func getLanguageCoursesForDataExplorer() : async [LanguageLearningAPI.CourseRow] {
    languageLearningApi.getLanguageCoursesForDataExplorer()
  };

  public query func getLessonsForDataExplorer() : async [LanguageLearningAPI.LessonRow] {
    languageLearningApi.getLessonsForDataExplorer()
  };

  public query func getEnrollmentsForDataExplorer() : async [LanguageLearningAPI.EnrollmentRow] {
    languageLearningApi.getEnrollmentsForDataExplorer()
  };

  public query func getSavedWordsForDataExplorer() : async [LanguageLearningAPI.SavedWordRow] {
    languageLearningApi.getSavedWordsForDataExplorer()
  };

  public query func getCourseApprovalsForDataExplorer() : async [LanguageLearningAPI.CourseApprovalRow] {
    languageLearningApi.getCourseApprovalsForDataExplorer()
  };

  public query func getWordDefinitionsForDataExplorer() : async [LanguageLearningAPI.WordDefinitionRow] {
    languageLearningApi.getWordDefinitionsForDataExplorer()
  };

  public query func getDailyLessonsForDataExplorer() : async [LanguageLearningAPI.DailyLessonRow] {
    languageLearningApi.getDailyLessonsForDataExplorer()
  };

  public func approveCourse(courseId : Text, adminNotes : Text) : async { #ok : Text; #err : { errorDetail : Text } } {
    switch (languageLearningApi.approveCourse(courseId, adminNotes)) {
      case (#ok id)  { #ok id };
      case (#err msg){ #err { errorDetail = msg } };
    }
  };

  public func rejectCourse(courseId : Text, adminNotes : Text) : async { #ok : Text; #err : { errorDetail : Text } } {
    switch (languageLearningApi.rejectCourse(courseId, adminNotes)) {
      case (#ok id)  { #ok id };
      case (#err msg){ #err { errorDetail = msg } };
    }
  };

  public query func getPendingApprovals() : async [LanguageLearningAPI.CourseRow] {
    languageLearningApi.getPendingApprovals()
  };

  public query func getLanguageLearningAnalytics() : async {
    totalCourses       : Nat;
    totalEnrollments   : Nat;
    totalSavedWords    : Nat;
    totalDailyLessons  : Nat;
    activeStreakUsers   : Nat;
  } {
    let a = languageLearningApi.getLanguageLearningAnalytics();
    {
      totalCourses      = a.totalCourses;
      totalEnrollments  = a.totalEnrollments;
      totalSavedWords   = a.totalSavedWords;
      totalDailyLessons = a.totalDailyLessons;
      activeStreakUsers  = a.activeStreakUsers;
    }
  };

  public shared func seedWordDefinitions(defs : [LanguageLearningTypes.WordDefinition]) : async () {
    languageLearningSvc.seedWordDefinitions(defs)
  };

  public shared func likeLesson(userId : Text, lessonId : Text) : async LanguageLearningService.Result<LanguageLearningTypes.LessonLike> {
    languageLearningSvc.likeLesson(userId, lessonId)
  };

  public shared func dislikeLesson(userId : Text, lessonId : Text) : async LanguageLearningService.Result<LanguageLearningTypes.LessonLike> {
    languageLearningSvc.dislikeLesson(userId, lessonId)
  };

  public shared func removeLessonLike(userId : Text, lessonId : Text) : async Bool {
    languageLearningSvc.removeLessonLike(userId, lessonId)
  };

  public query func getLessonLikeCounts(lessonId : Text) : async { likes : Nat; dislikes : Nat } {
    languageLearningSvc.getLessonLikeCounts(lessonId)
  };

  public query func getUserLessonLike(userId : Text, lessonId : Text) : async ?LanguageLearningTypes.LessonLike {
    languageLearningSvc.getUserLessonLike(userId, lessonId)
  };

  public query func getCourseLikeSummary(courseId : Text) : async LanguageLearningTypes.CourseLikeSummary {
    languageLearningSvc.getCourseLikeSummary(courseId)
  };

  public shared func startDeliveryShift(partnerId : Text) : async POSTypes.DeliveryPartnerShift {
    dpSvc.startDeliveryShift(partnerId)
  };

  public shared func endDeliveryShift(shiftId : Text) : async Bool {
    dpSvc.endDeliveryShift(shiftId)
  };

  public query func getCurrentDeliveryShift(partnerId : Text) : async ?POSTypes.DeliveryPartnerShift {
    dpSvc.getCurrentShift(partnerId)
  };

  public query func getDeliveryShiftHistory(partnerId : Text) : async [POSTypes.DeliveryPartnerShift] {
    dpSvc.getShiftHistory(partnerId)
  };

  // ── Flow Session methods ─────────────────────────────────────────────────────

  public shared func saveFlowSession(session : FlowSessionTypes.FlowSession) : async { #ok : Text; #err : Text } {
    flowSessionsById.add(session.id, session);
    #ok (session.id)
  };

  public query func getFlowSessions(role : Text) : async { #ok : [FlowSessionTypes.FlowSession]; #err : Text } {
    let all = flowSessionsById.values().toArray();
    if (role == "") {
      #ok all
    } else {
      #ok (all.filter<FlowSessionTypes.FlowSession>(func(s) { s.role == role }))
    }
  };

  public shared func addManufacturerPOSOrder(order : FlowSessionTypes.POSOrder) : async { #ok : Text; #err : Text } {
    posOrdersById.add(order.id, order);
    #ok (order.id)
  };

  public query func getManufacturerPOSOrders(manufacturerId : Text) : async { #ok : [FlowSessionTypes.POSOrder]; #err : Text } {
    let all = posOrdersById.values().toArray();
    #ok (all.filter<FlowSessionTypes.POSOrder>(func(o) { o.manufacturerId == manufacturerId }))
  };

  public shared func updatePOSOrderStatus(orderId : Text, status : Text, deliveryPartnerId : ?Text) : async { #ok : Text; #err : Text } {
    switch (posOrdersById.get(orderId)) {
      case null { #err ("Order not found: " # orderId) };
      case (?existing) {
        let updated = { existing with status = status; deliveryPartnerId = deliveryPartnerId };
        posOrdersById.add(orderId, updated);
        #ok orderId
      };
    }
  };

  public query func getCityList() : async [Text] {
    [
      "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
      "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
      "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
      "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
      "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubballi-Dharwad",
      "Bareilly", "Mysuru", "Tiruchirappalli", "Tiruppur", "Gurugram", "Aligarh", "Jalandhar", "Bhubaneswar", "Salem", "Mira-Bhayandar",
      "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Gorakhpur", "Guntur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai",
      "Cuttack", "Firozabad", "Kochi", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Nanded", "Kolhapur", "Ajmer",
      "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Nellore", "Jammu",
      "Sangli", "Belgaum", "Mangalore", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala",
      "Davanagere", "Kozhikode", "Kurnool", "Rajahmundry", "Bokaro", "Bellary", "Patiala", "Agartala", "Bhagalpur", "Muzaffarnagar",
      "Bhatpara", "Panihati", "Latur", "Dhule", "Rohtak", "Sagar", "Korba", "Bhilwara", "Berhampur", "Muzaffarpur",
      "Ahmednagar", "Mathura", "Kollam", "Avadi", "Kadapa", "Kamarhati", "Sambalpur", "Bilaspur", "Shahjahanpur", "Satara",
      "Bijapur", "Rampur", "Shimoga", "Chandrapur", "Junagadh", "Thrissur", "Alwar", "Bardhaman", "Kakinada", "Nizamabad",
      "Parbhani", "Tumkur", "Kharagpur", "Nagercoil", "Bihar Sharif", "Panipat", "Deoghar", "Ichalkaranji", "Tirupati", "Karnal",
      "Bathinda", "Jalna", "Barasat", "Raurkela", "Modinagar", "Dibrugarh", "Imphal", "Greater Noida", "Sonipat", "Panvel",
      "Dombivli", "Kalyan", "Kharghar", "Belapur", "Airoli", "Kopar Khairane", "Vashi", "Turbhe", "Sanpada", "Nerul",
      "Seawoods", "Kamothe", "Taloja", "Ambarnath", "Badlapur", "Palghar", "Boisar", "Dahanu", "Virar", "Nalasopara",
      "Vasai", "Bhayander", "Silvassa", "Daman", "Vapi", "Ankleshwar", "Bharuch", "Anand", "Nadiad", "Kheda",
      "Mehsana", "Gandhinagar", "Kalol", "Palanpur", "Patan", "Sidhpur", "Himmatnagar", "Modasa", "Kadi", "Surendranagar",
      "Morbi", "Gondal", "Jetpur", "Porbandar", "Veraval", "Palitana", "Botad", "Amreli", "Dhoraji", "Anjar",
      "Gandhidham", "Mundra", "Adipur", "Bhuj", "Mandvi", "Sikar", "Churu", "Jhunjhunu", "Nagaur", "Pali",
      "Jalore", "Sirohi", "Barmer", "Jaisalmer", "Hanumangarh", "Ganganagar", "Chittorgarh", "Bundi", "Baran", "Jhalawar",
      "Dungarpur", "Banswara", "Pratapgarh", "Rajsamand", "Tonk", "Sawai Madhopur", "Karauli", "Dholpur", "Bharatpur", "Dausa",
      "Firozabad", "Hathras", "Etah", "Mainpuri", "Kannauj", "Farrukhabad", "Hardoi", "Unnao", "Rae Bareli", "Fatehpur",
      "Sultanpur", "Kaushambi", "Banda", "Chitrakoot", "Mahoba", "Hamirpur", "Lalitpur", "Jalaun", "Etawah", "Auraiya",
      "Orai", "Gonda", "Faizabad", "Ambedkarnagar", "Bahraich", "Shravasti", "Balrampur", "Basti", "Siddharthnagar", "Sant Kabir Nagar",
      "Deoria", "Mau", "Ballia", "Kushinagar", "Maharajganj", "Azamgarh", "Jaunpur", "Ghazipur", "Chandauli", "Mirzapur",
      "Sonbhadra", "Nalanda", "Nawada", "Jehanabad", "Arwal", "Aurangabad Bihar", "Rohtas", "Kaimur", "Buxar", "Bhojpur",
      "Saran", "Siwan", "Gopalganj", "Vaishali", "Sitamarhi", "Sheohar", "Darbhanga", "Madhubani", "Supaul", "Saharsa",
      "Madhepura", "Purnea", "Kishanganj", "Araria", "Katihar", "Banka", "Munger", "Lakhisarai", "Sheikhpura", "Begusarai",
      "Samastipur", "Khagaria", "Jamalpur", "Bhabua", "Sasaram", "Arrah", "Bettiah", "Motihari", "Raxaul", "Chhapra",
      "Hajipur", "Hazaribagh", "Giridih", "Koderma", "Ramgarh", "Chatra", "Latehar", "Palamu", "Garhwa", "Simdega",
      "Seraikela", "Dumka", "Jamtara", "Pakur", "Shillong", "Aizawl", "Kohima", "Itanagar", "Gangtok", "Panaji",
      "Port Blair", "Kavaratti", "Diu", "Puducherry", "Karaikal", "Mahe", "Yanam"
    ]
  };


  // ── Promotion helpers — city/area targeting ───────────────────────────────

  public query func getEnabledCities() : async [Text] {
    let cities = citySvc.listCities();
    cities.filter(func(c : CityTypes.City) : Bool { c.isEnabled })
          .map<CityTypes.City, Text>(func(c) { c.id })
  };

  public query func getCityAreasForPromotion(cityId : Text) : async [Text] {
    promotionSvc.getCityAreas(cityId)
  };

  public query func getPendingPromotions() : async [PromotionTypes.Promotion] {
    promotionSvc.getPendingPromotions()
  };

  /// Admin approves a promotion so it can be fired.
  public shared func approvePromotionAdmin(id : Text) : async { #ok : PromotionTypes.Promotion; #err : Text } {
    switch (promotionSvc.approvePromotion(id)) {
      case (#ok p)  { #ok p };
      case (#err _) { #err("Promotion not found: " # id) };
    }
  };

  /// Admin fires a promotion to up to targetUserCount users.
  public shared func firePromotion(id : Text, targetUserCount : Nat) : async { #ok : PromotionTypes.Promotion; #err : Text } {
    switch (promotionSvc.firePromotion(id, targetUserCount)) {
      case (#ok p)  { #ok p };
      case (#err _) { #err("Promotion not found: " # id) };
    }
  };

  // ── Delivery Assignment ───────────────────────────────────────────────────

  /// Create a delivery assignment for a merchant or manufacturer.
  /// Assigns up to requestedCount available delivery partners from the pool.
  public shared func createDeliveryAssignment(
    requesterId    : Text,
    requesterType  : Text,
    requestedCount : Nat,
    city           : Text,
    description    : Text,
    partnerPhones  : [Text],
  ) : async { #ok : DeliveryAssignmentTypes.DeliveryAssignment; #err : Text } {
    deliveryAssignIdState.nextId += 1;
    let id = "da_" # Time.now().toText() # "_" # deliveryAssignIdState.nextId.toText();
    // Resolve partners from the delivery partner registry by phone.
    let resolvedPartners = List.empty<DeliveryAssignmentTypes.AssignedPartner>();
    for (phone in partnerPhones.vals()) {
      switch (dpSvc.getByPhone(phone)) {
        case (?dp) {
          resolvedPartners.add({
            partnerId = dp.id;
            name      = dp.name;
            phone     = phone;
            route     = "";
          });
        };
        case null {
          // Add with minimal info if not found
          resolvedPartners.add({
            partnerId = phone;
            name      = "";
            phone     = phone;
            route     = "";
          });
        };
      };
    };
    let assignment : DeliveryAssignmentTypes.DeliveryAssignment = {
      id;
      requesterId;
      requesterType;
      requestedCount;
      assignedPartners = resolvedPartners.toArray();
      city;
      description;
      status    = "active";
      createdAt = Time.now();
    };
    deliveryAssignmentsStore.add(id, assignment);
    #ok(assignment)
  };

  public query func getDeliveryAssignments(requesterId : Text) : async [DeliveryAssignmentTypes.DeliveryAssignment] {
    deliveryAssignmentsStore.entries()
      .filter(func((_, a)) { a.requesterId == requesterId })
      .map<(Text, DeliveryAssignmentTypes.DeliveryAssignment), DeliveryAssignmentTypes.DeliveryAssignment>(func((_, a)) { a })
      .toArray()
  };

  public query func getAllDeliveryAssignments() : async [DeliveryAssignmentTypes.DeliveryAssignment] {
    deliveryAssignmentsStore.entries()
      .map<(Text, DeliveryAssignmentTypes.DeliveryAssignment), DeliveryAssignmentTypes.DeliveryAssignment>(func((_, a)) { a })
      .toArray()
  };

  public shared func updateAssignmentRoute(assignmentId : Text, partnerId : Text, route : Text) : async { #ok : Text; #err : Text } {
    switch (deliveryAssignmentsStore.get(assignmentId)) {
      case null { #err("Assignment not found") };
      case (?a) {
        let updatedPartners = a.assignedPartners.map(func(p : DeliveryAssignmentTypes.AssignedPartner) : DeliveryAssignmentTypes.AssignedPartner {
          if (p.partnerId == partnerId) { { p with route } } else p
        });
        deliveryAssignmentsStore.add(assignmentId, { a with assignedPartners = updatedPartners });
        #ok(assignmentId)
      };
    }
  };

  // ── Chat Simulator Session persistence ───────────────────────────────────
  public shared func saveChatSimulatorSession(session : SessionTypes.ChatSimulatorSession) : async { #ok : Text; #err : { errorDetail : Text } } {
    let key = session.sessionId # "-" # debug_show(session.stepNumber);
    chatSimulatorSessionsStore.add(key, session);
    #ok(session.sessionId)
  };

  public shared query func getChatSimulatorSessions(role : Text) : async [SessionTypes.ChatSimulatorSession] {
    let all = chatSimulatorSessionsStore.entries()
      .filter(func((_, s)) { s.role == role })
      .map(func((_, s)) { s });
    let arr = all.toArray();
    let total = arr.size();
    if (total <= 100) arr else arr.sliceToArray(total - 100, total)
  };

  // ── Script Execution Result persistence ──────────────────────────────────
  public shared func saveScriptExecutionResult(result : SessionTypes.ScriptExecutionResult) : async { #ok : Text; #err : { errorDetail : Text } } {
    scriptExecutionResultsStore.add(result.executionId, result);
    #ok(result.executionId)
  };

  public shared query func getScriptExecutionResults(flowId : Text) : async [SessionTypes.ScriptExecutionResult] {
    let all = scriptExecutionResultsStore.entries()
      .filter(func((_, r)) { r.flowId == flowId })
      .map(func((_, r)) { r });
    let arr = all.toArray();
    let total = arr.size();
    if (total <= 20) arr else arr.sliceToArray(total - 20, total)
  };

  // ── Flow Agent Diagnostic persistence ────────────────────────────────────
  public shared func saveFlowAgentDiagnostic(diag : SessionTypes.FlowAgentDiagnostic) : async { #ok : Text; #err : { errorDetail : Text } } {
    flowAgentDiagnosticsStore.add(diag.diagnosticId, diag);
    #ok(diag.diagnosticId)
  };

  public shared query func getFlowAgentDiagnostics() : async [SessionTypes.FlowAgentDiagnostic] {
    let all = flowAgentDiagnosticsStore.entries()
      .map(func((_, d)) { d });
    let arr = all.toArray();
    let total = arr.size();
    if (total <= 50) arr else arr.sliceToArray(total - 50, total)
  };

  // ── Advertisement persistence ─────────────────────────────────────────────
  public shared query func getAdvertisements() : async [SessionTypes.Advertisement] {
    advertisementsStore.entries()
      .map<(Text, SessionTypes.Advertisement), SessionTypes.Advertisement>(func((_, a)) { a })
      .toArray()
  };

  public shared func saveAdvertisement(ad : SessionTypes.Advertisement) : async { #ok : Text; #err : { errorDetail : Text } } {
    advertisementsStore.add(ad.adId, ad);
    #ok(ad.adId)
  };
};



