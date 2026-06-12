import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAllMenuOptions,
  useGetMenuRepositoryHealth,
} from "@/hooks/useBackend";
import type { FlowDefinition } from "@/lib/flowRegistry";
import {
  AlertCircle,
  BookOpen,
  Cpu,
  Database,
  FileText,
  Globe,
  Layers,
  MessageSquare,
  Package,
  Printer,
  RefreshCw,
  Settings,
  ShieldCheck,
  Terminal,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useBackendActor } from "../hooks/useBackend";

// ─── Static reference data (UI-only, non-backend sections) ────────────────────

const PLATFORM_SURFACES = [
  {
    label: "WhatsApp",
    icon: "💬",
    desc: "Main chatbot via WhatsApp Business API",
  },
  {
    label: "Telegram",
    icon: "✈️",
    desc: "Full bot via webhook (https://bot.localbazar.shop/telegram/webhook)",
  },
  { label: "SMS", icon: "📱", desc: "Two-way SMS chatbot for feature phones" },
  {
    label: "Web Admin",
    icon: "🌐",
    desc: "React + TypeScript admin dashboard",
  },
  {
    label: "iOS App",
    icon: "🍎",
    desc: "Cross-platform (version-tracked per brand)",
  },
  {
    label: "Android App",
    icon: "🤖",
    desc: "Cross-platform (version-tracked per brand)",
  },
];

const _CITY_MODULES = [
  { key: "Shopping", desc: "Product catalog, orders, POS" },
  { key: "Jobs", desc: "Job postings and applications" },
  { key: "AdhocJobs", desc: "Daily and ad-hoc job matching" },
  { key: "Property", desc: "Property listings (buy/rent)" },
  { key: "Transport", desc: "Sarthi ride booking" },
  { key: "Shuttle", desc: "Community shuttle service" },
  { key: "FreeRide", desc: "Free ride sharing for Sarthi partners" },
  { key: "Events", desc: "Event listing and ticketing" },
  { key: "Matrimony", desc: "Elite matrimony matching" },
  { key: "Donations", desc: "Donation requests and fulfillment" },
  { key: "Family", desc: "Family group management" },
  { key: "Recipes", desc: "Recipe sharing and discovery" },
  { key: "Promotions", desc: "Influencer advertising" },
  { key: "SupportTickets", desc: "Support ticket system" },
  { key: "ONDC", desc: "ONDC e-commerce enrollment" },
  { key: "old_items", desc: "Old / second-hand item marketplace" },
  { key: "Healthcare", desc: "Healthcare appointment booking" },
  { key: "Tours", desc: "Tour packages" },
  { key: "ProfessionalServices", desc: "Multi-rate professional services" },
  { key: "Lending", desc: "Lending with reminders" },
  { key: "MarketSearch", desc: "Market & commodity price search" },
  { key: "Sports", desc: "Live cricket/football scores (India leagues)" },
  { key: "Elections", desc: "Election results (India, upcoming + past)" },
  { key: "Community", desc: "Rent parking, room, food service, manager" },
  {
    key: "LanguageLearning",
    desc: "Language courses, AI assistant, word search",
  },
  {
    key: "Manufacturer",
    desc: "Manufacturer direct-sell, distributor network",
  },
  { key: "BusBooking", desc: "Bus ticket booking via PaySprint" },
  { key: "TrainBooking", desc: "Train ticket booking via PaySprint" },
  { key: "FlightBooking", desc: "Flight booking via PaySprint" },
];

const BACKEND_ENTITIES: { name: string; fields: string[] }[] = [
  {
    name: "User (Customer)",
    fields: [
      "id",
      "phone",
      "name",
      "city",
      "pincode",
      "role",
      "subscriptionPlanId",
      "registrationDate",
      "isActive",
    ],
  },
  {
    name: "Merchant",
    fields: [
      "id",
      "phone",
      "businessName",
      "category",
      "location",
      "isManufacturer",
      "isActive",
      "orderCount",
      "avgRating",
      "branches",
      "kyc",
    ],
  },
  {
    name: "Delivery Partner",
    fields: [
      "id",
      "phone",
      "name",
      "city",
      "vehicleType",
      "status",
      "earnings",
      "totalTrips",
    ],
  },
  {
    name: "Manufacturer",
    fields: [
      "id",
      "businessName",
      "productCategories",
      "customerCarePhone",
      "customerCareEmail",
      "registeredCity",
      "createdAt",
    ],
  },
  {
    name: "Distributor Network",
    fields: [
      "id",
      "manufacturerId",
      "distributorPhone",
      "distributorCode",
      "city",
      "pincode",
      "schemeApplicable",
      "marginPercent",
      "marginEarned",
      "routeDescription",
      "assignedDeliveryPartnerPhone",
    ],
  },
  {
    name: "Product",
    fields: [
      "id",
      "merchantId",
      "title",
      "baseRate",
      "qty",
      "category",
      "barcodeValue",
      "isActive",
      "bulkRates",
      "expiry",
    ],
  },
  {
    name: "Manufacturer Product",
    fields: [
      "id",
      "manufacturerId",
      "productName",
      "hsnCode",
      "batchCode",
      "batchNumber",
      "expiryDate",
      "manufactureDate",
      "originCity",
      "priceToCustomer",
      "priceToDistributor",
      "bulkPricingTiers",
      "isReturnable",
      "isDiscontinued",
      "b2bCode",
      "stockQty",
    ],
  },
  {
    name: "Order",
    fields: [
      "id",
      "customerId",
      "merchantId",
      "deliveryPartnerId",
      "items",
      "total",
      "status",
      "tip",
      "createdAt",
    ],
  },
  {
    name: "Job",
    fields: [
      "id",
      "posterId",
      "title",
      "description",
      "category",
      "location",
      "salaryMin",
      "salaryMax",
      "jobType",
      "isAdhoc",
      "isOpen",
      "endDate",
    ],
  },
  {
    name: "Property",
    fields: [
      "id",
      "ownerId",
      "type",
      "title",
      "description",
      "price",
      "city",
      "pincode",
      "status",
    ],
  },
  {
    name: "Healthcare Appointment",
    fields: [
      "id",
      "customerId",
      "providerId",
      "date",
      "timeSlot",
      "status",
      "notes",
      "createdAt",
    ],
  },
  {
    name: "Tour Package",
    fields: [
      "id",
      "operatorId",
      "destination",
      "title",
      "price",
      "duration",
      "maxPassengers",
      "rating",
    ],
  },
  {
    name: "Professional Service",
    fields: [
      "id",
      "merchantPhone",
      "serviceType",
      "specialization",
      "pricePerHour",
      "areaRates",
      "city",
      "availability",
      "rating",
    ],
  },
  {
    name: "Lending Record",
    fields: [
      "id",
      "lenderPhone",
      "borrowerPhone",
      "itemName",
      "itemCategory",
      "returnDate",
      "charge",
      "reminderFrequency",
      "status",
    ],
  },
  {
    name: "Language Course",
    fields: [
      "id",
      "creatorPhone",
      "title",
      "languagePair",
      "price",
      "status",
      "enrollmentCount",
      "lessons",
      "createdDate",
    ],
  },
  {
    name: "Word Definition",
    fields: [
      "id",
      "word",
      "language",
      "ipa",
      "ancientTranslation",
      "translations",
      "examples",
    ],
  },
  {
    name: "Bus / Train / Flight Booking",
    fields: [
      "id",
      "customerId",
      "serviceType",
      "from",
      "to",
      "date",
      "fare",
      "referenceId",
      "status",
      "paySprintRef",
    ],
  },
  {
    name: "Support Ticket",
    fields: [
      "id",
      "raisedBy",
      "role",
      "subject",
      "description",
      "status",
      "createdAt",
    ],
  },
  {
    name: "Blog",
    fields: [
      "id",
      "authorId",
      "title",
      "location",
      "category",
      "content",
      "reviews",
    ],
  },
  {
    name: "Community Member",
    fields: [
      "id",
      "phone",
      "name",
      "city",
      "pincode",
      "communityId",
      "approvedAt",
    ],
  },
  {
    name: "Visitor Check-In",
    fields: [
      "id",
      "visitorPhone",
      "visitorName",
      "communityId",
      "reason",
      "checkinAt",
      "checkoutAt",
      "approvedBy",
    ],
  },
  {
    name: "Menu Option",
    fields: [
      "id",
      "optionLabel",
      "flowId",
      "sortOrder",
      "roles",
      "cityModuleKey",
      "isActive",
      "createdAt",
      "updatedAt",
    ],
  },
  {
    name: "Flow Definition",
    fields: [
      "id",
      "name",
      "flowJson",
      "environment",
      "version",
      "createdAt",
      "updatedAt",
    ],
  },
  {
    name: "Bot Log",
    fields: [
      "id",
      "platform",
      "senderId",
      "messageText",
      "flowTriggered",
      "direction",
      "status",
      "errorDetail",
      "timestamp",
      "rawPayload",
    ],
  },
  {
    name: "PaySprint Credential",
    fields: [
      "id",
      "serviceType",
      "environment",
      "partnerId",
      "authorisedKey",
      "partnerKey",
      "baseUrl",
      "isActive",
      "lastTestResult",
      "lastTestedAt",
    ],
  },
  {
    name: "PaySprint API Log",
    fields: [
      "id",
      "serviceType",
      "environment",
      "endpoint",
      "requestBody",
      "responseBody",
      "httpStatus",
      "latencyMs",
      "isError",
      "errorMessage",
      "createdAt",
    ],
  },
  {
    name: "Employee",
    fields: [
      "id",
      "merchantId",
      "name",
      "phone",
      "role",
      "isActive",
      "hireDate",
    ],
  },
  {
    name: "Employee Attendance",
    fields: [
      "id",
      "employeeId",
      "date",
      "checkInTime",
      "checkOutTime",
      "notes",
    ],
  },
  {
    name: "Employee Leave Request",
    fields: [
      "id",
      "employeeId",
      "leaveType",
      "fromDate",
      "toDate",
      "reason",
      "status",
      "createdAt",
    ],
  },
  {
    name: "Inventory Item",
    fields: [
      "id",
      "manufacturerId",
      "productId",
      "productName",
      "currentStock",
      "reorderLevel",
      "batchCode",
      "expiryDate",
      "lastUpdated",
    ],
  },
  {
    name: "Expiry Return",
    fields: [
      "id",
      "manufacturerId",
      "productId",
      "returnedById",
      "returnedBy",
      "quantity",
      "reason",
      "status",
      "createdAt",
    ],
  },
  {
    name: "Manufacturer Complaint",
    fields: [
      "id",
      "manufacturerId",
      "filedById",
      "filedBy",
      "subject",
      "description",
      "status",
      "createdAt",
    ],
  },
  {
    name: "Sale Record",
    fields: [
      "id",
      "manufacturerId",
      "buyerId",
      "buyerType",
      "invoiceNo",
      "items",
      "totalAmount",
      "paymentStatus",
      "createdAt",
    ],
  },
  {
    name: "App Version",
    fields: [
      "id",
      "brandName",
      "platform",
      "version",
      "buildNumber",
      "releaseDate",
      "isActive",
      "createdAt",
    ],
  },
  {
    name: "Subscription Plan",
    fields: [
      "id",
      "name",
      "targetRole",
      "orderLimit",
      "durationDays",
      "priceFlat",
      "features",
      "isActive",
    ],
  },
  {
    name: "Customer Rating",
    fields: [
      "id",
      "customerId",
      "orderId",
      "rating",
      "comment",
      "ratedById",
      "ratedByRole",
      "createdAt",
    ],
  },
  {
    name: "Tip Record",
    fields: [
      "id",
      "toPartnerId",
      "fromCustomerId",
      "amount",
      "entityId",
      "entityType",
      "timestamp",
    ],
  },
];

const ADMIN_FORMS: {
  name: string;
  saves: string;
  fields: { name: string; type: string; notes: string }[];
}[] = [
  {
    name: "User Registration",
    saves: "Customer profile; triggers city-gated menu loading",
    fields: [
      { name: "Phone", type: "tel", notes: "10-digit Indian mobile" },
      { name: "Name", type: "text", notes: "Full name" },
      { name: "City", type: "select", notes: "From full city list" },
      { name: "Pincode", type: "text", notes: "6-digit postal code" },
    ],
  },
  {
    name: "Merchant Registration",
    saves: "Merchant record; activates Merchant tab",
    fields: [
      { name: "Business Name", type: "text", notes: "" },
      { name: "Owner Name", type: "text", notes: "" },
      { name: "Phone", type: "tel", notes: "Validated, unique" },
      { name: "City", type: "select", notes: "" },
      { name: "Pincode", type: "text", notes: "6-digit" },
      { name: "Category", type: "select", notes: "From 70+ category list" },
      { name: "GST Number", type: "text", notes: "Optional" },
      {
        name: "Is Manufacturer",
        type: "checkbox",
        notes: "Unlocks manufacturer documents",
      },
    ],
  },
  {
    name: "Manufacturer Registration",
    saves:
      "Manufacturer profile; activates Manufacturer tab; generates DIST-XXXXX codes",
    fields: [
      { name: "Business Name", type: "text", notes: "" },
      { name: "Product Categories", type: "multi-select", notes: "" },
      { name: "Customer Care Phone", type: "tel", notes: "" },
      { name: "Customer Care Email", type: "email", notes: "" },
      { name: "GST Certificate", type: "file", notes: "Required document" },
      { name: "PAN", type: "text", notes: "Required document" },
      {
        name: "Business Registration",
        type: "file",
        notes: "Required document",
      },
    ],
  },
  {
    name: "Manufacturer Product",
    saves:
      "ManufacturerProduct; discontinued products hidden from distributors and customers",
    fields: [
      { name: "Product Name", type: "text", notes: "" },
      { name: "HSN Code", type: "text", notes: "Mandatory for GST" },
      { name: "Batch Code", type: "text", notes: "" },
      { name: "Batch Number", type: "text", notes: "" },
      { name: "Origin City", type: "select", notes: "City of manufacture" },
      {
        name: "Manufacture Date",
        type: "date-range",
        notes: "1 week / 1 month / 1 year range",
      },
      { name: "Expiry Date", type: "date", notes: "Optional" },
      { name: "Price to Customer", type: "number", notes: "" },
      { name: "Price to Distributor", type: "number", notes: "" },
      {
        name: "Bulk Pricing Tiers",
        type: "multi-input",
        notes: "minQty / maxQty / pricePerUnit",
      },
      {
        name: "Is B2B",
        type: "checkbox",
        notes: "Enables returnable/exchange flag",
      },
      { name: "Is Returnable", type: "checkbox", notes: "B2B only" },
      {
        name: "B2B Code",
        type: "text",
        notes: "Auto-generated for registered distributors",
      },
    ],
  },
  {
    name: "Distributor Add",
    saves:
      "DistributorNetwork; validated against merchant registry; generates distributor code",
    fields: [
      {
        name: "Merchant Phone",
        type: "tel",
        notes: "Validated against merchant registration",
      },
      { name: "City", type: "select", notes: "" },
      { name: "Pincode", type: "text", notes: "" },
      { name: "Scheme", type: "text", notes: "Discount/pricing scheme name" },
      { name: "Margin %", type: "number", notes: "" },
      { name: "Route Description", type: "textarea", notes: "" },
      {
        name: "Delivery Partner Phone",
        type: "tel",
        notes: "Optional assignment",
      },
    ],
  },
  {
    name: "Product Add / Edit",
    saves: "Product record; merchant catalog",
    fields: [
      { name: "Name", type: "text", notes: "" },
      { name: "Description", type: "textarea", notes: "" },
      { name: "Price", type: "number", notes: "Base price" },
      {
        name: "Location Prices",
        type: "multi-input",
        notes: "Per city/branch pricing",
      },
      { name: "Stock", type: "number", notes: "" },
      { name: "Category", type: "select", notes: "" },
      {
        name: "Barcode (EAN-13)",
        type: "text",
        notes: "Auto-generated or manual",
      },
      { name: "Expiry Date", type: "date", notes: "Optional" },
    ],
  },
  {
    name: "PaySprint API Config",
    saves:
      "PaySprintCredential per service; used for all booking/payment flows",
    fields: [
      { name: "Partner ID", type: "text", notes: "UAT and Live separate" },
      { name: "Authorised Key", type: "password", notes: "JWT/API key" },
      { name: "Partner Key", type: "password", notes: "" },
      { name: "Environment", type: "select", notes: "UAT / Live" },
      {
        name: "Service Type",
        type: "select",
        notes:
          "Bus / Train / Flight / Recharge / Bill / FastTag / LPG / Municipality / Insurance",
      },
      { name: "Base URL", type: "url", notes: "Override for UAT/Live" },
    ],
  },
  {
    name: "City Module Toggle",
    saves: "Module on/off per city; menus and flows reflect immediately",
    fields: [
      { name: "City", type: "select", notes: "" },
      { name: "Module", type: "select", notes: "One of 29+ modules" },
      { name: "Enabled", type: "toggle", notes: "" },
    ],
  },
  {
    name: "Branding",
    saves: "BrandingConfig; updates welcome message in all flow registry flows",
    fields: [
      {
        name: "Brand Name",
        type: "text",
        notes: "Admin-only; Internet Identity required",
      },
      {
        name: "iOS Version",
        type: "text",
        notes: "Tracked per brand; locked on update",
      },
      {
        name: "Android Version",
        type: "text",
        notes: "Tracked per brand; locked on update",
      },
    ],
  },
  {
    name: "Professional Service — Area Rates",
    saves:
      "ProfessionalService with areaRates array; customers see their area rate during search",
    fields: [
      { name: "Service Type", type: "text", notes: "" },
      {
        name: "Global Rate (₹/hr)",
        type: "number",
        notes: "Fallback if no area rate set",
      },
      { name: "City", type: "select", notes: "" },
      {
        name: "Area",
        type: "select",
        notes: "Fixed list per city (e.g. Andheri, Bandra)",
      },
      {
        name: "Area Rate (₹/hr)",
        type: "number",
        notes: "Overrides global rate for this area",
      },
    ],
  },
  {
    name: "Job Posting",
    saves: "Job record with multi-location opportunities",
    fields: [
      { name: "Title", type: "text", notes: "" },
      { name: "Description", type: "textarea", notes: "" },
      { name: "Category", type: "select", notes: "" },
      {
        name: "Locations",
        type: "multi-input",
        notes: "Multiple cities/areas per posting",
      },
      { name: "Salary Min / Max", type: "number", notes: "" },
      {
        name: "Willing to Relocate",
        type: "checkbox",
        notes: "Shows in city-filter searches",
      },
    ],
  },
  {
    name: "Language Course",
    saves:
      "LanguageCourse (pending admin approval); commission applied on paid sale",
    fields: [
      { name: "Title", type: "text", notes: "" },
      { name: "Language Pair", type: "text", notes: "e.g. Hindi → English" },
      { name: "Price", type: "number", notes: "0 = free" },
      { name: "Description", type: "textarea", notes: "" },
      {
        name: "Lessons",
        type: "multi-input",
        notes: "Each with title, content, quiz",
      },
    ],
  },
  {
    name: "Employee Add (Merchant)",
    saves: "Employee record; enables attendance and leave tracking",
    fields: [
      { name: "Name", type: "text", notes: "" },
      { name: "Phone", type: "tel", notes: "" },
      {
        name: "Role",
        type: "select",
        notes: "Sale / Purchase / Restock / Accounts / etc.",
      },
      { name: "Hire Date", type: "date", notes: "" },
    ],
  },
  {
    name: "Visitor Check-In",
    saves: "VisitorRecord in community; approval required by community member",
    fields: [
      { name: "Visitor Phone", type: "tel", notes: "" },
      { name: "Visitor Name", type: "text", notes: "" },
      { name: "Community ID", type: "select", notes: "" },
      { name: "Reason for Visit", type: "textarea", notes: "" },
    ],
  },
];

const CHANNEL_SCRIPTS = [
  {
    channel: "Telegram",
    icon: "✈️",
    steps: [
      "Create a bot with @BotFather and copy the HTTP API token",
      "In Admin → Telegram Configuration, enter the token and save",
      "Set webhook URL to https://bot.localbazar.shop/telegram/webhook",
      "Use 'Test Connection' to verify the bot responds",
      "Debug tools available: Poll Now, Webhook Diagnostics, Force Clear Webhook, Test HTTP Outcall",
      "Bot Logs captures every incoming payload with raw request body",
    ],
  },
  {
    channel: "WhatsApp",
    icon: "💬",
    steps: [
      "Apply for WhatsApp Business API access (Meta Business Manager)",
      "In Admin → WhatsApp Configuration, enter API key and Phone Number ID",
      "Set callback URL to https://bot.localbazar.shop",
      "Verify webhook with the token from Admin → WhatsApp Config",
      "All 75+ chatbot flows available after setup",
    ],
  },
  {
    channel: "SMS",
    icon: "📱",
    steps: [
      "Obtain long-code or short-code from an SMS provider",
      "In Admin → SMS Configuration, enter sender ID, API key, and route",
      "Point inbound SMS webhook to https://bot.localbazar.shop/sms",
      "All major flows available via SMS (text-only, no media attachments)",
    ],
  },
];

const _PAYSPRINT_SERVICES = [
  {
    name: "Bus Booking",
    endpoint: "/api/v1/service/bus/search",
    desc: "Search trips, block seats, confirm booking",
  },
  {
    name: "Train Booking",
    endpoint: "/api/v1/service/train/search",
    desc: "Search trains, book tickets, PNR tracking",
  },
  {
    name: "Flight Booking",
    endpoint: "/api/v1/service/flight/search",
    desc: "Search flights, book seats, e-ticket",
  },
  {
    name: "Mobile Recharge",
    endpoint: "/api/v1/service/recharge",
    desc: "Prepaid/postpaid mobile recharge",
  },
  {
    name: "Bill Payment (BBPS)",
    endpoint: "/api/v1/service/bbps/fetchbill",
    desc: "Electricity, gas, water, broadband",
  },
  {
    name: "FastTag Recharge",
    endpoint: "/api/v1/service/fasttag/recharge",
    desc: "NETC FASTag top-up",
  },
  {
    name: "LPG Booking",
    endpoint: "/api/v1/service/lpg/booking",
    desc: "LPG cylinder booking",
  },
  {
    name: "Municipality Tax",
    endpoint: "/api/v1/service/municipality/pay",
    desc: "Property tax, water tax payments",
  },
  {
    name: "Insurance Premium",
    endpoint: "/api/v1/service/insurance/premium",
    desc: "Motor, health, life premium payments",
  },
];

const _ROLES_MATRIX: { role: string; accesses: string[] }[] = [
  {
    role: "Customer",
    accesses: [
      "Browse merchant products and place orders",
      "Book rides (Sarthi), shuttles, buses, trains, flights",
      "Search jobs, browse and apply with location preference",
      "Search professional services by area (see area-specific rates)",
      "Browse manufacturer products (if distributor-linked)",
      "Mobile recharge, bill payment, FastTag, LPG, municipality payments",
      "Search properties, book healthcare, tour packages",
      "Enroll in language courses, search word definitions",
      "Post and read blogs, donate, create matrimony profile",
      "Family group management and marketplace (old items)",
      "Search market/commodity prices with AI recommendations",
      "View live cricket/football scores and election results",
      "Rate merchants, delivery partners, and manufacturer products",
      "Manage lending records with reminders",
    ],
  },
  {
    role: "Merchant",
    accesses: [
      "Manage product catalog with EAN-13 barcodes and location-specific prices",
      "Receive and process orders (restricted when plan expired)",
      "View customer ratings and reviews (paid subscription)",
      "Add and manage employees: attendance, leave, check-in/checkout",
      "Generate thermal-print receipts via browser print dialog",
      "Scan product barcodes to look up and edit products",
      "Manage restock orders and supplier relationships",
      "Browse manufacturer products (requires distributor registration)",
      "Be marked as manufacturer — access manufacturer dashboard",
      "Multi-branch POS with branch-specific pricing",
    ],
  },
  {
    role: "Delivery Partner",
    accesses: [
      "Accept and fulfill delivery orders",
      "Track earnings, tips, and petrol expenses",
      "Shift check-in/check-out with daily summary",
      "Rate customers after completed orders",
      "Visitor check-in at society gates",
      "View delivery route assignments from manufacturer/distributor",
    ],
  },
  {
    role: "Manufacturer",
    accesses: [
      "Register business with GST, PAN, and business registration",
      "Add products with HSN/batch codes, bulk pricing, B2B codes, expiry",
      "Manage distributor network (city/pincode/scheme/margin)",
      "Sell direct to distributors and customers",
      "Process expiry returns (distributor-gated)",
      "View and respond to product complaints",
      "Track product ratings and reviews",
      "Add employees and assign to sale/purchase/restock/accounts roles",
      "Manage inventory register with batch tracking",
      "Accounts and bills with pending payment tracking",
      "Assign delivery partners with route descriptions",
      "Discontinue products (hidden from distributors and customers)",
    ],
  },
  {
    role: "Admin",
    accesses: [
      "Full dashboard: users, merchants, orders, deliveries, analytics",
      "City module toggles (29+ modules per city)",
      "Single unified flow registry: create, edit, seed, health-check",
      "Menu repository: sync, add, edit, delete options per role",
      "Branding page (Internet Identity required): change app name",
      "App version management (iOS + Android per brand)",
      "PaySprint API configuration (UAT + Live per service)",
      "Telegram, WhatsApp, SMS channel configuration",
      "Flow Health Agent: diagnostics + auto-fix proposals",
      "Script Executor: run all flows with auto-generated test data",
      "Multi-Role Simulator: Customer + Merchant + Delivery side-by-side",
      "Data Explorer: view, add, edit, delete all 36+ entity tables",
      "Import/Export: all modules with category-level checkboxes",
      "Load Sample Data: 12-step seeding in dependency order",
      "Bot Logs: full payload inspection for Telegram/WhatsApp/SMS",
      "Community member management and city list control",
      "Language course approval with commission settings",
    ],
  },
];

// ─── Role colour helpers ──────────────────────────────────────────────────────

const ROLE_TABS: { role: string; label: string; color: string }[] = [
  {
    role: "customer",
    label: "Customer",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    role: "merchant",
    label: "Merchant",
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  {
    role: "delivery",
    label: "Delivery Partner",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  {
    role: "sarthi",
    label: "Manufacturer / Sarthi",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  },
  {
    role: "all",
    label: "Admin / All Roles",
    color: "bg-muted text-muted-foreground",
  },
];

function roleBadgeColor(role: string): string {
  return (
    ROLE_TABS.find((r) => r.role === role)?.color ??
    "bg-muted text-muted-foreground"
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
}: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6 pb-4 border-b border-border print:border-border">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function FlowList({ flows }: { flows: FlowDefinition[] }) {
  const safeFlows = (flows ?? []).filter(Boolean);
  if (safeFlows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic py-4">
        No flows found for this role in the registry.
      </p>
    );
  }
  return (
    <Accordion type="multiple" className="space-y-1">
      {safeFlows.map((flow) => (
        <AccordionItem
          key={flow.id}
          value={flow.id}
          className="border border-border rounded-lg px-4 bg-card"
          data-ocid={`flow.item.${flow.id}`}
        >
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <span className="font-medium text-sm text-foreground">
                {flow.name}
              </span>
              {flow.moduleKey && (
                <Badge variant="secondary" className="text-xs">
                  {flow.moduleKey}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <p className="text-sm text-muted-foreground mb-3">
              {flow.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(flow.roles ?? []).map((r) => (
                <span
                  key={r}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColor(r)}`}
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Trigger Payload
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                {flow.triggerPayload}
              </code>
            </div>
            {flow.flowJson &&
              (() => {
                try {
                  const json = JSON.parse(flow.flowJson) as Record<
                    string,
                    unknown
                  >;
                  const nodes = json.nodes as
                    | Array<Record<string, unknown>>
                    | undefined;
                  if (Array.isArray(nodes) && nodes.length > 0) {
                    return (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Steps ({nodes.length})
                        </p>
                        <ol className="space-y-1">
                          {nodes.map((node, i) => {
                            const data = (node.data ?? {}) as Record<
                              string,
                              unknown
                            >;
                            return (
                              <li
                                key={String(node.id ?? i)}
                                className="flex gap-2 text-xs"
                              >
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-center leading-5 font-semibold">
                                  {i + 1}
                                </span>
                                <span className="text-foreground">
                                  {String(
                                    data.label ??
                                      data.prompt ??
                                      data.name ??
                                      `Step ${i + 1}`,
                                  )}
                                  {typeof data.inputType === "string" ? (
                                    <span className="ml-1 text-muted-foreground">
                                      — <em>{data.inputType}</em>
                                    </span>
                                  ) : data.inputType != null ? (
                                    <span className="ml-1 text-muted-foreground">
                                      — <em>{String(data.inputType)}</em>
                                    </span>
                                  ) : null}
                                </span>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    );
                  }
                } catch {
                  // Not parseable — skip step list
                }
                return null;
              })()}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProjectDocumentationPage() {
  const [flows, setFlows] = useState<FlowDefinition[]>([]);
  const [flowsLoading, setFlowsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: menuOptions = [],
    isLoading: menuLoading,
    error: menuError,
  } = useGetAllMenuOptions();
  const { data: health } = useGetMenuRepositoryHealth();

  const { actor } = useBackendActor();

  useEffect(() => {
    if (!actor) return;
    setFlowsLoading(true);
    const actorAny = actor as unknown as Record<string, () => Promise<unknown>>;
    if (typeof actorAny.getAllFlows === "function") {
      actorAny
        .getAllFlows()
        .then((result) => {
          // Unwrap Motoko Result variant ({ ok: [...] } or { err: ... }) or plain array
          const raw =
            result != null &&
            typeof result === "object" &&
            "ok" in (result as object)
              ? (result as { ok: unknown }).ok
              : result;
          const allFlowsResult = Array.isArray(raw)
            ? (raw as FlowDefinition[])
            : [];
          setFlows(
            allFlowsResult.map((f) => ({
              ...f,
              id: String(f?.id ?? ""),
              name: String(f?.name ?? ""),
              description: String(f?.description ?? ""),
              category: (f?.category ??
                "customer") as FlowDefinition["category"],
              triggerPayload: String(f?.triggerPayload ?? ""),
              roles: Array.isArray(f?.roles) ? f.roles : [],
            })),
          );
        })
        .catch(() => setFlows([]))
        .finally(() => setFlowsLoading(false));
    } else {
      setFlowsLoading(false);
    }
  }, [actor]);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const actorAny = actor as unknown as Record<
        string,
        () => Promise<unknown>
      >;
      if (actor && typeof actorAny.getAllFlows === "function") {
        const result = await actorAny.getAllFlows();
        const raw =
          result != null &&
          typeof result === "object" &&
          "ok" in (result as object)
            ? (result as { ok: unknown }).ok
            : result;
        const allFlowsResult = Array.isArray(raw)
          ? (raw as FlowDefinition[])
          : [];
        setFlows(
          allFlowsResult.map((f) => ({
            ...f,
            id: String(f?.id ?? ""),
            name: String(f?.name ?? ""),
            description: String(f?.description ?? ""),
            category: (f?.category ?? "customer") as FlowDefinition["category"],
            triggerPayload: String(f?.triggerPayload ?? ""),
            roles: Array.isArray(f?.roles) ? f.roles : [],
          })),
        );
      }
    } catch {
      // ignore
    }
    setRefreshing(false);
  }

  const flowsByRole = ROLE_TABS.reduce<Record<string, FlowDefinition[]>>(
    (acc, { role }) => {
      acc[role] = flows.filter((f) => {
        const roles = Array.isArray(f.roles) ? f.roles : [];
        if (role === "all") return roles.includes("all");
        return roles.includes(role as FlowDefinition["roles"][number]);
      });
      return acc;
    },
    {},
  );

  // Group live menu options by role — null-safe
  const menuByRole: Record<string, Record<string, unknown>[]> = {
    customer: [],
    merchant: [],
    delivery_partner: [],
    manufacturer: [],
    all: [],
  };
  for (const opt of menuOptions ?? []) {
    if (opt == null) continue;
    const roles = Array.isArray(opt.roles) ? (opt.roles as string[]) : [];
    for (const role of roles) {
      if (!role) continue;
      const key = String(role).toLowerCase().replace(/\s+/g, "_");
      if (key in menuByRole) {
        menuByRole[key].push(opt as Record<string, unknown>);
      } else {
        menuByRole.all.push(opt as Record<string, unknown>);
      }
    }
    if (roles.length === 0) menuByRole.all.push(opt as Record<string, unknown>);
  }

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          body { background: #fff !important; color: #000 !important; }
          [data-sidebar], aside, nav, .no-print, header { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; width: 100% !important; }
          .print-hidden { display: none !important; }
          details, details[open], [data-state="closed"] > div { display: block !important; }
          [data-state] > div { display: block !important; height: auto !important; overflow: visible !important; }
          * { box-shadow: none !important; }
          a { text-decoration: none !important; color: inherit !important; }
          h1, h2, h3 { page-break-after: avoid; }
          tr, li, section { page-break-inside: avoid; }
        }
      `}</style>

      <div
        className="max-w-5xl mx-auto px-4 py-8 space-y-12"
        data-ocid="project-docs.page"
      >
        {/* Page header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              LocalBazar Kart 🛒
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Complete project documentation — features, flows, menus, admin
              forms, integrations, and setup
            </p>
            {health && (
              <div className="flex gap-3 mt-2">
                <Badge variant="secondary">
                  {health.flowCount} flows in registry
                </Badge>
                <Badge variant="secondary">
                  {health.menuOptionCount ?? 0} menu options
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 print-hidden no-print">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              data-ocid="project-docs.refresh_button"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh Flows
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => window.print()}
              data-ocid="project-docs.print_button"
            >
              <Printer className="h-3.5 w-3.5 mr-1.5" />
              Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* ── (1) Project Overview ── */}
        <section data-ocid="project-docs.overview_section">
          <SectionHeader
            icon={<BookOpen className="h-5 w-5" />}
            title="Project Overview"
            subtitle="Platform-wide statistics and surface summary"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Surfaces", value: PLATFORM_SURFACES.length },
              { label: "Flows", value: flowsLoading ? "…" : flows.length },
              { label: "Admin Forms", value: ADMIN_FORMS.length },
              { label: "Data Entities", value: BACKEND_ENTITIES.length },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-card p-4 text-center"
              >
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PLATFORM_SURFACES.map((s) => (
              <div
                key={s.label}
                className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── (2) All Flows by Role ── */}
        <section data-ocid="project-docs.flows_section">
          <SectionHeader
            icon={<Layers className="h-5 w-5" />}
            title="All Flows by Role"
            subtitle={
              flowsLoading
                ? "Loading flows from registry…"
                : `${flows.length} flows loaded from the single unified flow registry`
            }
          />
          {flowsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : (
            <Tabs defaultValue="customer" data-ocid="project-docs.role_tabs">
              <TabsList className="mb-4 flex-wrap h-auto gap-1">
                {ROLE_TABS.map(({ role, label }) => (
                  <TabsTrigger
                    key={role}
                    value={role}
                    data-ocid={`project-docs.role_tab.${role}`}
                  >
                    {label}
                    <span className="ml-1.5 text-xs opacity-60">
                      ({(flowsByRole[role] ?? []).length})
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {ROLE_TABS.map(({ role, label }) => (
                <TabsContent
                  key={role}
                  value={role}
                  data-ocid={`project-docs.flows_list.${role}`}
                >
                  <p className="text-xs text-muted-foreground mb-3">
                    <strong className="text-foreground">
                      {(flowsByRole[role] ?? []).length}
                    </strong>{" "}
                    flows tagged for {label}
                  </p>
                  <FlowList flows={flowsByRole[role] ?? []} />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </section>

        {/* ── (3) Menu Options by Role (live from backend) ── */}
        <section data-ocid="project-docs.menus_section">
          <SectionHeader
            icon={<MessageSquare className="h-5 w-5" />}
            title="Menu Repository"
            subtitle="Live menu options synced from the single unified flow registry"
          />
          {menuError ? (
            <div className="flex items-center gap-2 p-3 rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {menuError instanceof Error
                ? menuError.message
                : String(
                    (menuError as Record<string, unknown>)?.errorDetail ??
                      "Failed to load menu options",
                  )}
            </div>
          ) : menuLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 rounded" />
              ))}
            </div>
          ) : (
            <Tabs defaultValue="customer" data-ocid="project-docs.menu_tabs">
              <TabsList className="mb-4 flex-wrap h-auto gap-1">
                {[
                  { key: "customer", label: "Customer" },
                  { key: "merchant", label: "Merchant" },
                  { key: "delivery_partner", label: "Delivery Partner" },
                  { key: "manufacturer", label: "Manufacturer" },
                  { key: "all", label: "All Roles" },
                ].map(({ key, label }) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    data-ocid={`project-docs.menu_tab.${key}`}
                  >
                    {label}
                    <span className="ml-1.5 text-xs opacity-60">
                      ({(menuByRole[key] ?? []).length})
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {[
                { key: "customer", label: "Customer" },
                { key: "merchant", label: "Merchant" },
                { key: "delivery_partner", label: "Delivery Partner" },
                { key: "manufacturer", label: "Manufacturer" },
                { key: "all", label: "All Roles" },
              ].map(({ key, label }) => (
                <TabsContent
                  key={key}
                  value={key}
                  data-ocid={`project-docs.menu_list.${key}`}
                >
                  {(menuByRole[key] ?? []).length === 0 ? (
                    <p className="text-sm text-muted-foreground italic py-4">
                      No menu options for {label}. Open Menu Repository → Sync
                      to populate.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {(menuByRole[key] ?? []).map((opt, idx) => (
                        <div
                          key={String(opt.id ?? idx)}
                          className="flex items-center justify-between px-3 py-2 rounded border border-border bg-card text-sm"
                          data-ocid={`project-docs.menu_item.${idx + 1}`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-medium text-foreground truncate">
                              {String(opt.optionLabel ?? opt.label ?? "—")}
                            </span>
                            {opt.flowId != null && (
                              <Badge
                                variant="secondary"
                                className="text-xs shrink-0"
                              >
                                {String(opt.flowId as string)}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {opt.cityModuleKey != null && (
                              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                {String(opt.cityModuleKey as string)}
                              </code>
                            )}
                            <Badge
                              variant={opt.isActive ? "default" : "outline"}
                              className="text-xs"
                            >
                              {opt.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </section>

        {/* ── (4) Backend Data Tables ── */}
        <section data-ocid="project-docs.data_section">
          <SectionHeader
            icon={<Database className="h-5 w-5" />}
            title="Backend Data Tables"
            subtitle={`${BACKEND_ENTITIES.length} entity types with their key fields`}
          />
          <Accordion type="multiple" className="space-y-2">
            {BACKEND_ENTITIES.map((entity, idx) => (
              <AccordionItem
                key={entity.name}
                value={entity.name}
                className="border border-border rounded-lg px-4 bg-card"
                data-ocid={`project-docs.entity.${idx + 1}`}
              >
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="font-medium text-sm text-foreground">
                    {entity.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {entity.fields.map((f) => (
                      <code
                        key={f}
                        className="text-xs bg-muted px-2 py-0.5 rounded font-mono"
                      >
                        {f}
                      </code>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── (5) City-Toggleable Modules ── */}
        <section data-ocid="project-docs.modules_section">
          <SectionHeader
            icon={<Cpu className="h-5 w-5" />}
            title="City-Toggleable Modules"
            subtitle={`${_CITY_MODULES.length} modules — each can be enabled/disabled per city from the admin panel`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {_CITY_MODULES.map((mod, idx) => (
              <div
                key={mod.key}
                className="flex items-start gap-2 px-3 py-2.5 rounded border border-border bg-card"
                data-ocid={`project-docs.module.${idx + 1}`}
              >
                <Badge variant="secondary" className="text-xs shrink-0 mt-0.5">
                  {mod.key}
                </Badge>
                <p className="text-xs text-muted-foreground">{mod.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── (6) Admin Forms Reference ── */}
        <section data-ocid="project-docs.forms_section">
          <SectionHeader
            icon={<FileText className="h-5 w-5" />}
            title="Admin Forms Reference"
            subtitle="All major forms with fields, input types, and what they save"
          />
          <Accordion type="multiple" className="space-y-2">
            {ADMIN_FORMS.map((form, idx) => (
              <AccordionItem
                key={form.name}
                value={form.name}
                className="border border-border rounded-lg px-4 bg-card"
                data-ocid={`project-docs.form.${idx + 1}`}
              >
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="font-medium text-sm text-foreground">
                    {form.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-xs text-muted-foreground mb-3">
                    <strong>Saves:</strong> {form.saves}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-1.5 pr-4 font-semibold text-muted-foreground">
                            Field
                          </th>
                          <th className="text-left py-1.5 pr-4 font-semibold text-muted-foreground">
                            Input Type
                          </th>
                          <th className="text-left py-1.5 font-semibold text-muted-foreground">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.fields.map((f) => (
                          <tr
                            key={f.name}
                            className="border-b border-border/50 last:border-0"
                          >
                            <td className="py-1.5 pr-4 font-medium text-foreground">
                              {f.name}
                            </td>
                            <td className="py-1.5 pr-4">
                              <code className="bg-muted px-1.5 py-0.5 rounded text-[11px]">
                                {f.type}
                              </code>
                            </td>
                            <td className="py-1.5 text-muted-foreground">
                              {f.notes || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── (7) Channel Scripts ── */}
        <section data-ocid="project-docs.channels_section">
          <SectionHeader
            icon={<Globe className="h-5 w-5" />}
            title="Channel Scripts & Setup"
            subtitle="Step-by-step setup instructions for all chatbot channels"
          />
          <div className="space-y-4">
            {CHANNEL_SCRIPTS.map((ch) => (
              <div
                key={ch.channel}
                className="border border-border rounded-lg bg-card"
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30 rounded-t-lg">
                  <span className="text-xl">{ch.icon}</span>
                  <h3 className="font-semibold text-foreground">
                    {ch.channel}
                  </h3>
                </div>
                <ol className="px-4 py-3 space-y-2">
                  {ch.steps.map((step, i) => (
                    <li key={step} className="flex gap-2 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-center text-xs leading-5 font-bold">
                        {i + 1}
                      </span>
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
            <div className="border border-border rounded-lg bg-card px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  Key Endpoints
                </h3>
              </div>
              <div className="space-y-1">
                {[
                  ["Telegram Webhook", "POST /telegram/webhook"],
                  ["WhatsApp Callback", "POST / (root)"],
                  ["SMS Inbound", "POST /sms"],
                  ["Canister Version", "GET /canister-version"],
                  ["Canister Status", "GET /canister-status"],
                  ["Telegram Debug", "GET /telegram/debug"],
                ].map(([label, endpoint]) => (
                  <div key={label} className="flex gap-3 text-xs">
                    <span className="text-muted-foreground w-36 flex-shrink-0">
                      {label}
                    </span>
                    <code className="font-mono bg-muted px-2 py-0.5 rounded">
                      {endpoint}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── (8) Roles and Permissions Matrix ── */}
        <section data-ocid="project-docs.roles_section">
          <SectionHeader
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Roles & Permissions"
            subtitle="What each role can access across all surfaces"
          />
          <Accordion type="multiple" className="space-y-2">
            {_ROLES_MATRIX.map((entry, idx) => (
              <AccordionItem
                key={entry.role}
                value={entry.role}
                className="border border-border rounded-lg px-4 bg-card"
                data-ocid={`project-docs.role.${idx + 1}`}
              >
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm text-foreground">
                      {entry.role}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {entry.accesses.length} capabilities
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <ul className="space-y-1">
                    {entry.accesses.map((access) => (
                      <li key={access} className="flex gap-2 text-sm">
                        <span className="text-primary text-xs mt-0.5">▸</span>
                        <span className="text-foreground">{access}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── (9) PaySprint Integration ── */}
        <section data-ocid="project-docs.paysprint_section">
          <SectionHeader
            icon={<Package className="h-5 w-5" />}
            title="PaySprint Integration"
            subtitle="9 payment and booking services via PaySprint API (UAT + Live)"
          />
          <div className="space-y-2">
            {_PAYSPRINT_SERVICES.map((svc, idx) => (
              <div
                key={svc.name}
                className="flex items-start justify-between gap-3 px-4 py-3 rounded-lg border border-border bg-card"
                data-ocid={`project-docs.paysprint.${idx + 1}`}
              >
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground">
                    {svc.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {svc.desc}
                  </p>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono shrink-0">
                  {svc.endpoint}
                </code>
              </div>
            ))}
            <div className="mt-4 p-4 rounded-lg border border-border bg-muted/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Admin Configuration
              </p>
              <p className="text-sm text-foreground">
                Navigate to <strong>Admin → PaySprint API</strong>. Each service
                has separate UAT and Live credential rows (Partner ID,
                Authorised Key, Partner Key, Base URL). Use the{" "}
                <strong>Test Connection</strong> button per service to verify
                credentials before going live.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Callback URL:{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                  https://bot.localbazar.shop
                </code>
              </p>
            </div>
          </div>
        </section>

        {/* ── (10) Manufacturer Flow Details ── */}
        <section data-ocid="project-docs.manufacturer_section">
          <SectionHeader
            icon={<Cpu className="h-5 w-5" />}
            title="Manufacturer Flow"
            subtitle="Direct-to-customer and direct-to-distributor sales with full supply chain"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Registration & Setup",
                items: [
                  "Register with GST certificate, PAN, and business registration document",
                  "Define product categories (multi-select)",
                  "Set customer care phone and email (visible to customers and distributors)",
                  "Mark as manufacturer from merchant account to access both dashboards",
                ],
              },
              {
                title: "Product Management",
                items: [
                  "Add products with HSN code, batch code, batch number, expiry date (optional)",
                  "Set origin city and manufacture date range (1 week / 1 month / 1 year)",
                  "Configure bulk pricing tiers (1–50 / 51–100 / 100+ units)",
                  "Auto-generate B2B product codes for distributor-registered buyers",
                  "Mark products as B2B — enables returnable/exchange flag",
                  "Discontinue products — immediately hidden from distributors and customers",
                ],
              },
              {
                title: "Distributor Network",
                items: [
                  "Add distributors with city, pincode, scheme name, and margin %",
                  "Distributor must be validated against existing merchant phone registration",
                  "Auto-generate unique distributor code (DIST-XXXXX) on registration",
                  "Assign delivery partner with route description and phone number",
                  "Expiry returns only allowed for registered distributor network members",
                ],
              },
              {
                title: "Operations & Analytics",
                items: [
                  "Track direct customer orders and distributor wholesale orders in one POS view",
                  "Manage employees with roles: sale, purchase, restock, inventory, accounts",
                  "Inventory register with batch tracking and reorder levels",
                  "Accounts and bills with pending payment tracking per merchant party",
                  "View product ratings and complaints from customers and distributors",
                ],
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-lg border border-border bg-card px-4 py-4"
              >
                <h3 className="font-semibold text-sm text-foreground mb-3">
                  {block.title}
                </h3>
                <ul className="space-y-1.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2 text-xs">
                      <span className="text-primary mt-0.5">▸</span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── (11) Professional Services Multi-Rate ── */}
        <section data-ocid="project-docs.proservices_section">
          <SectionHeader
            icon={<Settings className="h-5 w-5" />}
            title="Professional Services — Multi-Rate"
            subtitle="Area-specific pricing for service professionals"
          />
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-card px-4 py-4">
              <h3 className="font-semibold text-sm text-foreground mb-3">
                How It Works
              </h3>
              <ol className="space-y-2">
                {[
                  "Service professional sets a global default rate (₹/hr) during registration",
                  "Optionally adds area-specific rates for key areas in their city (fixed list per city: e.g. Andheri, Bandra, Borivali in Mumbai)",
                  "Customer searches for a service — selects their area from the dropdown",
                  "System returns the area-specific rate if set; otherwise falls back to the global default rate silently",
                  "Only the single applicable rate is shown per professional — no side-by-side comparison",
                ].map((step, i) => (
                  <li key={step} className="flex gap-2 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-center text-xs leading-5 font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">
                Data Model: areaRates
              </h3>
              <code className="block text-xs bg-muted p-3 rounded font-mono whitespace-pre">{`areaRates: Array<{
  area: string;        // e.g. "Andheri"
  ratePerHour: number; // overrides globalRate for this area
}>`}</code>
            </div>
          </div>
        </section>

        {/* ── (12) Language Learning Module ── */}
        <section data-ocid="project-docs.language_section">
          <SectionHeader
            icon={<BookOpen className="h-5 w-5" />}
            title="Language Learning Module"
            subtitle="User-created and AI-powered courses, word search, and daily learning"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Language Courses",
                items: [
                  "Browse free and paid courses filtered by language pair and difficulty",
                  "Users create courses with title, lessons (text + quiz), and price",
                  "Admin approval required before a user-created course goes live",
                  "Commission applicable on paid course sales (set in admin)",
                  "Pay per course individually — not bundled in subscription",
                  "Enrolled courses shown in My Learning with progress bars and daily streak",
                ],
              },
              {
                title: "Word Search",
                items: [
                  "Search any word or phrase — returns translations in 10+ languages",
                  "Ancient translations included: Sanskrit, Latin, Ancient Greek, IPA pronunciation",
                  "Example sentences provided with each definition",
                  "Seeded reference table of root words as fallback",
                  "Available as a quick widget on all main pages",
                ],
              },
              {
                title: "AI Learning Assistant",
                items: [
                  "Daily guided lessons auto-triggered at a set time for each enrolled learner",
                  "Vocabulary drills, grammar tips, and contextual corrections",
                  "Chat interface: ask questions and receive real-time feedback",
                  "HTTP outcalls to AI service for personalised guidance",
                ],
              },
              {
                title: "Chatbot Flow",
                items: [
                  "Flow ID: fun-learning or language-learning",
                  "Steps: search words, browse courses, enroll, daily practice reminders",
                  "Available via WhatsApp, Telegram, SMS, and the Chat Simulator",
                  "Like/dislike on course lessons with real-time vote counts",
                ],
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-lg border border-border bg-card px-4 py-4"
              >
                <h3 className="font-semibold text-sm text-foreground mb-3">
                  {block.title}
                </h3>
                <ul className="space-y-1.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2 text-xs">
                      <span className="text-primary mt-0.5">▸</span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── (13) Community Services ── */}
        <section data-ocid="project-docs.community_section">
          <SectionHeader
            icon={<Users className="h-5 w-5" />}
            title="Community Services"
            subtitle="Resident-facing features for societies and communities"
          />
          <div className="space-y-3">
            {[
              {
                title: "Visitor Check-In / Check-Out",
                desc: "Visitors arrive → enter phone and reason → community member approves → check-in timestamped → check-out recorded. Full daily history visible in community panel. Delivery partners also check in/out when visiting society gates.",
              },
              {
                title: "Community Member Management",
                desc: "Every registered phone number is auto-added to a community panel. Searchable by phone, name, or location. City dropdown shows all available cities. Community ID auto-assigned on registration.",
              },
              {
                title: "Parking, Room & Food Service",
                desc: "Admin-enabled communities get: Rent Parking (book community parking slots), Rent Room (book common rooms), Food Service (order community meals), and Community Manager Services. All gated by city module toggle.",
              },
              {
                title: "Employee Attendance (Merchant)",
                desc: "Merchants add employees with roles (sale, purchase, restock, inventory, accounts). Employees check in/out daily. Leave applications submitted by employee, approved/rejected by merchant. Full attendance history per employee.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card px-4 py-4"
              >
                <h3 className="font-semibold text-sm text-foreground mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sample Data & Simulator ── */}
        <section data-ocid="project-docs.sample_data_section">
          <SectionHeader
            icon={<Settings className="h-5 w-5" />}
            title="Sample Data & Simulator"
            subtitle="Built-in tools to populate and test the platform"
          />
          <div className="space-y-4">
            <div className="border border-border rounded-lg bg-card px-4 py-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">
                Load Sample Data
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Navigate to <strong>Admin → Dashboard</strong> and click{" "}
                <strong>Load Sample Data</strong>. The loader creates records in
                strict dependency order:
              </p>
              <ol className="space-y-1.5 text-sm">
                {[
                  ["1", "Customers (3 records)"],
                  ["2", "Merchants (3 records, with products)"],
                  ["3", "Delivery Partners (2 records)"],
                  [
                    "4",
                    "Manufacturers (3 records) + Products (with HSN/batch/expiry)",
                  ],
                  [
                    "5",
                    "Distributors (linked to manufacturers, validated against merchants)",
                  ],
                  ["6", "Jobs (with multiple location opportunities)"],
                  ["7", "Properties, Healthcare Providers, Tour Packages"],
                  ["8", "Professional Services (with area rates)"],
                  ["9", "Events, Donations, Matrimony profiles"],
                  [
                    "10",
                    "Orders (linking customers, merchants, delivery partners)",
                  ],
                  ["11", "Bus / Train / Flight Bookings"],
                  ["12", "Language Courses (approved) + Word Definitions"],
                ].map(([num, label]) => (
                  <li key={num} className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-center text-xs leading-5 font-semibold">
                      {num}
                    </span>
                    <span className="text-foreground">{label}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border border-border rounded-lg bg-card px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  Script Executor
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Navigate to <strong>Admin → Script Executor</strong>. Select any
                flow and click <strong>Run Flow</strong>.
              </p>
              <ul className="space-y-1 text-sm">
                {[
                  "Each step runs with auto-generated valid test values",
                  "Blue bubbles show input sent; grey bubbles show bot response",
                  "Green/red badges show pass/fail per step",
                  "All entities created during the run are saved to backend tables",
                  "Run All executes every flow and shows a health report",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary text-xs mt-0.5">▸</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 pb-2 text-xs text-muted-foreground print:block">
          <p>
            © {new Date().getFullYear()} LocalBazar Kart. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1">
            Documentation auto-generated from the single unified flow registry.
          </p>
        </footer>
      </div>
    </>
  );
}
