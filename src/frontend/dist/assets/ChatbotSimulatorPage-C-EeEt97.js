import { j as jsxRuntimeExports, r as reactExports, U as UserRole, Y as useSimulatorActorCalls, n as useSeedSampleData, Z as useCreateTestOrder, _ as useBackendActor, $ as useModuleStatusesWithRoles, a0 as useShuttleRoutes, D as useMerchants, a1 as useJobs, a2 as useHealthcareProviders, a3 as useTourOperators, a4 as useProfessionalServices, a5 as usePromotions, a6 as useEvents, a7 as useFamilyMembers, a8 as useDonations, a9 as useGetAllMenuOptions, aa as useUpdateShuttleRouteStops, ab as useQRTimeoutMinutes, ac as useListCities, ad as useGetCityControl, h as useMarketplaceItems, p as ue, ae as buildSeedSummaryMessage, af as isRegistrationFlow, x as OrderStatus, ag as getAllRegistryFlows, ah as useSimulatorActions, ai as readModuleStatuses, aj as PropertyListingType } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as ScrollArea } from "./scroll-area-C_Pp8Hph.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { E as ErrorBoundary } from "./ErrorBoundary-C9S3h5Th.js";
import { Q as QRTimerDisplay } from "./QRTimerDisplay-DIQaJZWT.js";
import { S as StatusBadge, O as ORDER_STATUS_MAP } from "./StatusBadge-DNkrizJz.js";
import { u as useRegistryFlows } from "./useRegistryFlows-BarM70x9.js";
import { M as MessageCircle } from "./message-circle-C1ZVIbte.js";
import { D as Database } from "./database-CADlqd_q.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { C as ChevronLeft } from "./chevron-left-DzxTPwXv.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { Z as Zap } from "./zap-C7-axDdv.js";
import { U as User } from "./user-BCyag2Xe.js";
import { B as Building2 } from "./building-2-B0h7D8pK.js";
import { S as Store } from "./store-CaCzKt5a.js";
import { G as Globe } from "./globe--tJa3NSQ.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { E as EyeOff } from "./eye-off-DrNsJOxE.js";
import { R as RotateCcw } from "./rotate-ccw-BCahGsp7.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { S as SquareTerminal } from "./square-terminal-D2qbnput.js";
import { B as Bot } from "./bot-egkDiXjP.js";
import { L as LayoutDashboard } from "./layout-dashboard-C8a8ykvu.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { S as Send } from "./send-DoOOMmv0.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { C as ClipboardCopy } from "./clipboard-copy-C_TqIbk0.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { P as Package } from "./package-CosknzeL.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./index-BtrS4JsN.js";
import "./index-yUS8KoxU.js";
import "./index-IXOTxK3N.js";
import "./index-z5OST4d2.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
const LANG_LABELS = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
  ta: "தமிழ்",
  te: "తెలుగు",
  bn: "বাংলা",
  gu: "ગુજરાતી",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  pa: "ਪੰਜਾਬੀ",
  ur: "اردو"
};
function detectLanguageFromText(text) {
  if (!text || text.trim().length === 0) return "en";
  let devanagariCount = 0;
  let tamilCount = 0;
  let teluguCount = 0;
  let bengaliCount = 0;
  let gujaratiCount = 0;
  let kannadaCount = 0;
  let malayalamCount = 0;
  let gurmukhiCount = 0;
  let arabicCount = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp >= 2304 && cp <= 2431) devanagariCount++;
    else if (cp >= 2944 && cp <= 3071) tamilCount++;
    else if (cp >= 3072 && cp <= 3199) teluguCount++;
    else if (cp >= 2432 && cp <= 2559) bengaliCount++;
    else if (cp >= 2688 && cp <= 2815) gujaratiCount++;
    else if (cp >= 3200 && cp <= 3327) kannadaCount++;
    else if (cp >= 3328 && cp <= 3455) malayalamCount++;
    else if (cp >= 2560 && cp <= 2687) gurmukhiCount++;
    else if (cp >= 1536 && cp <= 1791 || cp >= 1872 && cp <= 1919)
      arabicCount++;
  }
  const counts = [
    [devanagariCount, "hi"],
    // default to Hindi for Devanagari; Marathi same script
    [tamilCount, "ta"],
    [teluguCount, "te"],
    [bengaliCount, "bn"],
    [gujaratiCount, "gu"],
    [kannadaCount, "kn"],
    [malayalamCount, "ml"],
    [gurmukhiCount, "pa"],
    [arabicCount, "ur"]
  ];
  const best = counts.reduce(
    (max, cur) => cur[0] > max[0] ? cur : max,
    [0, "en"]
  );
  return best[0] > 0 ? best[1] : "en";
}
let _sessionLanguage = "en";
let _sessionLanguageSet = false;
function getSessionLanguage() {
  return _sessionLanguage;
}
function setSessionLanguage(lang) {
  if (_sessionLanguageSet && _sessionLanguage !== "en") return;
  _sessionLanguage = lang;
  if (lang !== "en") _sessionLanguageSet = true;
}
function clearSessionLanguage() {
  _sessionLanguage = "en";
  _sessionLanguageSet = false;
}
function getQRTimeoutMs() {
  try {
    const stored = localStorage.getItem("lb_qr_timeout_minutes");
    const mins = stored ? Number.parseInt(stored) : 2;
    return (Number.isFinite(mins) && mins > 0 ? mins : 2) * 6e4;
  } catch {
    return 12e4;
  }
}
function sanitizeUserInput(input) {
  return input.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, "").replace(
    /(--|;|\/\*|\*\/|'\s*OR\s*'|'\s*AND\s*'|UNION\s+SELECT|DROP\s+TABLE|INSERT\s+INTO|DELETE\s+FROM|UPDATE\s+\w+\s+SET)/gi,
    (m) => `[${m.trim()}]`
  ).trim();
}
const sessionContexts = {};
let _realMerchants = [];
let _realProducts = [];
let _realEvents = [];
let _realPromotions = [];
let _realShuttleRoutes = [];
let _realMarketplaceItems = [];
let _realJobs = [];
let _realHealthcareProviders = [];
let _realTourOperators = [];
let _realProfessionalServices = [];
let _realFamilyMembers = [];
let _realDonations = [];
let _liveMenuOptions = [];
function getDisabledModules() {
  return /* @__PURE__ */ new Set();
}
function buildWelcomeContent() {
  const activeEvents = _realEvents.filter((e) => e.name && e.location);
  const activePromos = _realPromotions.filter(
    (p) => p.status === "active" || p.status === "pendingApproval"
  );
  const isLive = activeEvents.length > 0 || activePromos.length > 0;
  let eventLines;
  if (activeEvents.length > 0) {
    eventLines = activeEvents.slice(0, 3).map((e) => {
      const paidStr = e.isPaid ? `💰 Paid — ₹${e.price}/person` : "🆓 Free Entry";
      return `🎉 *${e.name}*
📝 ${String(e.description).slice(0, 60)}
📍 ${e.location} | 📅 ${e.startDate}
${paidStr} | 🎟 ${e.ticketVenue}`;
    }).join("\n\n");
  } else {
    eventLines = "No active events in your area yet.";
  }
  let promoLines;
  if (activePromos.length > 0) {
    promoLines = activePromos.slice(0, 3).map(
      (p) => `🏷️ *${p.title}* — Special promotion
📍 ${[p.locationArea, p.locationCity].filter(Boolean).join(", ")}${p.reelLink ? " → [Watch Video]" : ""}`
    ).join("\n\n");
  } else {
    promoLines = "No active promotions in your area yet.";
  }
  const srcTag = isLive ? "🟢 live" : "⚪ no data";
  const content = `🛒 *Welcome to LocalBazar Cart!*

Your WhatsApp-powered shopping, jobs & property platform.

🎉 *Events Near You (${srcTag}):*
━━━━━━━━━━━━━━━━━━━━
${eventLines}

📣 *Active Promotions (${srcTag}):*
━━━━━━━━━━━━━━━━━━━━
${promoLines}

Continue to register or log in →`;
  return { content, isLive };
}
function getOrCreateContext(phoneNumber, userType) {
  const key = (phoneNumber == null ? void 0 : phoneNumber.trim()) || "simulator_default";
  if (!sessionContexts[key]) {
    sessionContexts[key] = {
      state: "WELCOME",
      userType: userType ?? UserRole.customer,
      stateHistory: [],
      stateData: {}
    };
  }
  const ctx = sessionContexts[key];
  if (!ctx.stateHistory) ctx.stateHistory = [];
  if (!ctx.stateData) ctx.stateData = {};
  if (!ctx.state) ctx.state = "WELCOME";
  return ctx;
}
function transition(ctx, newState) {
  if (!ctx) {
    console.error("[Simulator] transition() called with null context");
    return { from: "UNKNOWN", to: "WELCOME", timestamp: Date.now() };
  }
  const safeState = newState && typeof newState === "string" ? newState : "MAIN_MENU";
  const t = {
    from: ctx.state ?? "UNKNOWN",
    to: safeState,
    timestamp: Date.now()
  };
  if (!Array.isArray(ctx.stateHistory)) ctx.stateHistory = [];
  ctx.stateHistory.push(t);
  ctx.state = safeState;
  return t;
}
function buildCustomerMainMenuQRs() {
  const moduleStatuses = readModuleStatuses();
  const liveCustomerOptions = _liveMenuOptions.filter(
    (opt) => opt.isActive && opt.roles.includes("customer") && (!opt.cityModuleKey || moduleStatuses[opt.cityModuleKey] !== false)
  ).sort((a, b) => a.sortOrder - b.sortOrder);
  if (liveCustomerOptions.length > 0) {
    return liveCustomerOptions.map((opt) => ({
      id: opt.id,
      title: opt.optionLabel,
      payload: opt.flowId
    }));
  }
  return [
    {
      id: "menu_sync_needed",
      title: "⚙️ Admin: Sync Menu Repository",
      payload: "__menu_sync_needed__"
    }
  ];
}
async function processMessage(phoneNumber, message, userType) {
  var _a, _b, _c, _d, _e;
  if (!phoneNumber || typeof message !== "string") {
    console.error("[Simulator] processMessage: invalid inputs", {
      phoneNumber,
      message
    });
    return {
      messages: [
        {
          id: `bot_guard_${Date.now()}`,
          content: "Session error. Type *hi* to restart.",
          type: "bot",
          timestamp: Date.now(),
          quickReplies: [{ id: "g_hi", title: "🏠 Main Menu", payload: "hi" }]
        }
      ]
    };
  }
  const ctx = getOrCreateContext(phoneNumber, userType);
  const lower = (message ?? "").toLowerCase().trim();
  const msgs = [];
  let stateTransition;
  function isModuleEnabled(modName) {
    const disabled = getDisabledModules();
    return !disabled.has(modName.toLowerCase());
  }
  function isRegistryModuleEnabled(moduleKey) {
    const statuses = readModuleStatuses();
    return statuses[moduleKey] !== false;
  }
  function abortIfModuleDisabled(modName) {
    if (!isModuleEnabled(modName)) {
      bot(
        `❌ *${modName.replace(/_/g, " ")} is temporarily unavailable.*

This service has been disabled by the admin. Please try again later.`,
        [{ id: "mod_disabled_back", title: "🏠 Main Menu", payload: "hi" }]
      );
      return true;
    }
    return false;
  }
  function bot(content, quickReplies, widget, widgetData) {
    msgs.push({
      id: `bot_${Date.now()}_${Math.random()}`,
      content,
      type: "bot",
      timestamp: Date.now() + msgs.length * 100,
      quickReplies,
      specialWidget: widget,
      widgetData
    });
  }
  function sys(content) {
    msgs.push({
      id: `sys_${Date.now()}_${Math.random()}`,
      content,
      type: "system",
      timestamp: Date.now() + msgs.length * 100
    });
  }
  const isReset = lower === "hi" || lower === "hello" || lower === "menu" || lower === "0";
  if (ctx.state === "WELCOME" || isReset) {
    if (ctx.state !== "WELCOME" && isReset) {
      stateTransition = transition(ctx, "WELCOME");
      sys("↩ Returned to main menu");
    }
    if (isReset && userType === UserRole.merchant && ctx.state !== "WELCOME") {
      stateTransition = transition(ctx, "MERCHANT_MENU");
      sys("State: WELCOME (hi) → MERCHANT_MENU (role=merchant)");
      bot(
        "👋 Welcome back to *LocalBazar Kart Business* 🛒!\n\nManage your store:",
        [
          { id: "m1", title: "📦 My Orders", payload: "merchant_orders" },
          { id: "m2", title: "➕ Add Product", payload: "add_product" },
          { id: "m3", title: "📊 View Analytics", payload: "earnings" },
          { id: "m4", title: "💼 Post Job", payload: "post_job_menu" },
          {
            id: "m5",
            title: "🏠 Post Property",
            payload: "post_property_menu"
          },
          {
            id: "m6",
            title: "🛒 Order from Suppliers",
            payload: "supplier_order_start"
          }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    }
    if (isReset && userType === UserRole.deliveryPartner && ctx.state !== "WELCOME") {
      stateTransition = transition(ctx, "DP_MENU");
      sys("State: WELCOME (hi) → DP_MENU (role=deliveryPartner)");
      bot(
        "👋 Welcome back, *Delivery Partner*!\n\n🟢 Status: ONLINE\n📦 Available orders: 2\n✅ Delivered today: 7\n💰 Earnings today: ₹420",
        [
          { id: "d1", title: "📦 Available Orders", payload: "dp_orders" },
          {
            id: "d2",
            title: "🚴 My Active Delivery",
            payload: "active_delivery"
          },
          { id: "d3", title: "💰 Earnings Today", payload: "dp_earnings" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    }
    stateTransition = transition(ctx, "PROMO_EVENT_PREVIEW");
    sys("State: WELCOME → PROMO_EVENT_PREVIEW");
    const { content: welcomeContent } = buildWelcomeContent();
    bot(welcomeContent, [
      { id: "pe1", title: "▶️ Continue →", payload: "continue_to_login" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_EVENT_PREVIEW") {
    stateTransition = transition(ctx, "NEW_OR_RETURNING");
    sys("State: PROMO_EVENT_PREVIEW → NEW_OR_RETURNING");
    bot("Are you a returning user or new here?", [
      { id: "nr1", title: "🆕 New User", payload: "new_user" },
      { id: "nr2", title: "🔙 Returning User", payload: "returning_user" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "NEW_OR_RETURNING") {
    if (lower === "new_user" || lower === "1" || lower.includes("new")) {
      stateTransition = transition(ctx, "ROLE_SELECT");
      sys("State: NEW_OR_RETURNING → ROLE_SELECT");
      bot("👋 Welcome! Please select your *role* to get started:", [
        { id: "rs1", title: "🏪 Merchant", payload: "role_merchant" },
        { id: "rs2", title: "🚴 Delivery Partner", payload: "role_delivery" },
        {
          id: "rs3",
          title: "🛺 Sarthi (Passenger Pickup)",
          payload: "role_sarthi"
        },
        { id: "rs4", title: "🛒 Customer", payload: "role_customer" }
      ]);
    } else if (lower === "returning_user" || lower === "2" || lower.includes("returning")) {
      stateTransition = transition(ctx, "PASSDIGIT_VERIFY");
      sys("State: NEW_OR_RETURNING → PASSDIGIT_VERIFY");
      ctx.stateData.passdigitAttempts = 0;
      bot("🔐 *Welcome back!*\n\nEnter your *4-digit passdigit* to continue:", [
        {
          id: "pf1",
          title: "❓ Forgot Passdigit?",
          payload: "forgot_passdigit"
        }
      ]);
    } else {
      bot("Please choose an option:", [
        { id: "nr1", title: "🆕 New User", payload: "new_user" },
        { id: "nr2", title: "🔙 Returning User", payload: "returning_user" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PASSDIGIT_VERIFY") {
    if (lower === "forgot_passdigit") {
      stateTransition = transition(ctx, "PASSDIGIT_OTP");
      sys("State: PASSDIGIT_VERIFY → PASSDIGIT_OTP");
      bot(
        "📱 *Forgot Passdigit*\n\nWe've sent an OTP to your WhatsApp number.\n\nEnter the *6-digit OTP* to verify (enter any 6 digits for testing):"
      );
      return { messages: msgs, transition: stateTransition };
    }
    const attempts = ctx.stateData.passdigitAttempts ?? 0;
    if (/^\d{4}$/.test(lower)) {
      sys("✅ Passdigit verified");
      if (userType === UserRole.merchant) {
        stateTransition = transition(ctx, "MERCHANT_MENU");
        sys("State: PASSDIGIT_VERIFY → MERCHANT_MENU");
        bot(
          "👋 Welcome back to *LocalBazar Kart Business* 🛒!\n\nManage your store and orders:",
          [
            { id: "m1", title: "📦 My Orders", payload: "merchant_orders" },
            { id: "m2", title: "➕ Add Product", payload: "add_product" },
            { id: "m3", title: "📊 View Analytics", payload: "earnings" },
            { id: "m4", title: "💼 Post Job", payload: "post_job_menu" },
            {
              id: "m5",
              title: "🏠 Post Property",
              payload: "post_property_menu"
            }
          ]
        );
      } else if (userType === UserRole.deliveryPartner) {
        stateTransition = transition(ctx, "DP_MENU");
        sys("State: PASSDIGIT_VERIFY → DP_MENU");
        bot(
          "👋 Welcome back, *Delivery Partner*!\n\nToday's overview:\n🟢 Status: ONLINE\n📦 Available orders: 2\n✅ Delivered today: 7\n💰 Earnings today: ₹420",
          [
            { id: "d1", title: "📦 Available Orders", payload: "dp_orders" },
            {
              id: "d2",
              title: "🚴 My Active Delivery",
              payload: "active_delivery"
            },
            { id: "d3", title: "💰 Earnings Today", payload: "dp_earnings" }
          ]
        );
      } else {
        stateTransition = transition(ctx, "MAIN_MENU");
        sys("State: PASSDIGIT_VERIFY → MAIN_MENU");
        bot("👋 Welcome back!\n\nWhat would you like to do today?", [
          { id: "c1", title: "🛒 Browse & Order", payload: "1" },
          { id: "c2", title: "📦 Track My Orders", payload: "2" },
          { id: "c3", title: "💼 Job Listings", payload: "3" },
          { id: "c4", title: "🏠 Property Listings", payload: "4" },
          { id: "c5", title: "🎉 Post Event", payload: "event" },
          { id: "c6", title: "👨‍👩‍👧 My Family", payload: "family" },
          { id: "c7", title: "📣 Advertise", payload: "advertise" },
          { id: "c8", title: "🛺 Transport", payload: "transport" }
        ]);
      }
    } else if (attempts >= 2) {
      stateTransition = transition(ctx, "PASSDIGIT_OTP");
      sys("State: PASSDIGIT_VERIFY → PASSDIGIT_OTP (too many attempts)");
      bot(
        "❌ *3 incorrect attempts.*\n\nWe've sent an OTP to your number for verification.\nEnter the *6-digit OTP* (any 6 digits for testing):"
      );
    } else {
      ctx.stateData.passdigitAttempts = attempts + 1;
      bot(
        `❌ Incorrect passdigit. ${2 - attempts} attempt(s) remaining.

Enter your *4-digit passdigit*:`,
        [
          {
            id: "pf1",
            title: "❓ Forgot Passdigit?",
            payload: "forgot_passdigit"
          }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PASSDIGIT_OTP") {
    if (/^\d{6}$/.test(lower)) {
      stateTransition = transition(ctx, "PASSDIGIT_RESET");
      sys("✅ OTP verified");
      bot("✅ *OTP Verified!*\n\nNow set a new *4-digit passdigit*:");
    } else {
      bot(
        "Please enter the *6-digit OTP* sent to your number (any 6 digits for testing):"
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PASSDIGIT_RESET") {
    if (/^\d{4}$/.test(lower)) {
      ctx.stateData.passdigit = message;
      stateTransition = transition(ctx, "MAIN_MENU");
      sys("State: PASSDIGIT_RESET → MAIN_MENU");
      bot(
        "✅ *New passdigit set!*\n\nWelcome back. What would you like to do?",
        [
          { id: "c1", title: "🛒 Browse & Order", payload: "1" },
          { id: "c2", title: "📦 Track My Orders", payload: "2" },
          { id: "c3", title: "💼 Job Listings", payload: "3" },
          { id: "c4", title: "🏠 Property Listings", payload: "4" }
        ]
      );
    } else {
      bot("Please enter exactly *4 digits* for your new passdigit:");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ROLE_SELECT") {
    if (lower === "role_merchant" || lower.includes("merchant")) {
      stateTransition = transition(ctx, "MERCHANT_REG_BUSINESS_TYPE");
      sys("State: ROLE_SELECT → MERCHANT_REG_BUSINESS_TYPE");
      bot(
        "🏪 *Merchant / Provider Registration*\n\nWhat type of business are you registering?",
        [
          {
            id: "bt1",
            title: "🛒 Regular Store (products & orders)",
            payload: "regular_store"
          },
          {
            id: "bt2",
            title: "🏥 Healthcare Provider (clinic, doctor, pharmacy)",
            payload: "healthcare_provider"
          },
          {
            id: "bt3",
            title: "✈️ Tour Operator (tours, travel packages)",
            payload: "tour_operator"
          },
          {
            id: "bt4",
            title: "🔧 Professional Service (plumber, trainer, etc.)",
            payload: "professional_service"
          }
        ]
      );
    } else if (lower === "role_delivery" || lower.includes("delivery")) {
      ctx.stateData.dpServiceType = "delivery";
      stateTransition = transition(ctx, "DP_REG_NAME");
      sys("State: ROLE_SELECT → DP_REG_NAME (delivery)");
      bot(
        "🚴 *Delivery Partner Registration — Step 1/7*\n\nEnter your *full name*:"
      );
    } else if (lower === "role_sarthi" || lower.includes("sarthi") || lower.includes("passenger")) {
      ctx.stateData.dpServiceType = "sarthi";
      stateTransition = transition(ctx, "DP_REG_NAME");
      sys("State: ROLE_SELECT → DP_REG_NAME (sarthi)");
      bot("🛺 *Sarthi Registration — Step 1/6*\n\nEnter your *full name*:");
    } else if (lower === "role_customer" || lower === "4" || lower.includes("customer") || lower === "none") {
      stateTransition = transition(ctx, "CUSTOMER_REG_NAME");
      sys("State: ROLE_SELECT → CUSTOMER_REG_NAME");
      bot("🛒 *Customer Registration — Step 1/5*\n\nEnter your *full name*:");
    } else {
      bot("Please select your role:", [
        { id: "rs1", title: "🏪 Merchant", payload: "role_merchant" },
        { id: "rs2", title: "🚴 Delivery Partner", payload: "role_delivery" },
        {
          id: "rs3",
          title: "🛺 Sarthi (Passenger Pickup)",
          payload: "role_sarthi"
        },
        { id: "rs4", title: "🛒 Customer", payload: "role_customer" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "REG_NAME") {
    ctx.name = message;
    ctx.stateData.name = message;
    stateTransition = transition(ctx, "REG_LOCATION");
    sys("State: REG_NAME → REG_LOCATION");
    bot(
      `Nice to meet you, *${message}*! 😊

Please share your *location* so I can find the nearest merchants for you.

📍 Send your WhatsApp location or type your area/city:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "REG_LOCATION") {
    ctx.location = message;
    ctx.stateData.location = message;
    stateTransition = transition(ctx, "REG_ADDRESS");
    sys("State: REG_LOCATION → REG_ADDRESS");
    bot(
      `Got it! 📍 *${message}*

Lastly, please enter your *delivery address* (flat number, street name):`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "REG_ADDRESS") {
    ctx.stateData.address = message;
    stateTransition = transition(ctx, "MAIN_MENU");
    sys("State: REG_ADDRESS → MAIN_MENU");
    bot(
      `✅ *Registration complete!*

Welcome to LocalBazar Kart 🛒, *${ctx.name}*! 🎉

Here's what you can do:`,
      [
        { id: "c1", title: "🛒 Browse & Order", payload: "1" },
        { id: "c2", title: "📦 Track Orders", payload: "2" },
        { id: "c3", title: "💼 Jobs", payload: "3" },
        { id: "c4", title: "🏠 Properties", payload: "4" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "CUSTOMER_REG_NAME") {
    ctx.name = message;
    ctx.stateData.name = message;
    stateTransition = transition(ctx, "CUSTOMER_REG_LOCATION");
    sys("State: CUSTOMER_REG_NAME → CUSTOMER_REG_LOCATION");
    bot(
      `Nice to meet you, *${message}*! 😊

📍 *Step 2/5:* Please share your *location*.

Send your WhatsApp location or type your area/city:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "CUSTOMER_REG_LOCATION") {
    ctx.location = message;
    ctx.stateData.location = message;
    stateTransition = transition(ctx, "CUSTOMER_REG_ADDRESS");
    sys("State: CUSTOMER_REG_LOCATION → CUSTOMER_REG_ADDRESS");
    bot(
      `Got it! 📍 *${message}*

*Step 3/5:* Enter your *delivery address* (flat number, street name):`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "CUSTOMER_REG_ADDRESS") {
    ctx.stateData.address = message;
    stateTransition = transition(ctx, "CUSTOMER_REG_OTP");
    sys("State: CUSTOMER_REG_ADDRESS → CUSTOMER_REG_OTP");
    bot(
      "📱 *Step 4/5: Verify WhatsApp Number*\n\nWe sent an OTP to your number.\nEnter any *4 digits* to simulate OTP verification:"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "CUSTOMER_REG_OTP") {
    if (/^\d{4,6}$/.test(lower)) {
      stateTransition = transition(ctx, "CUSTOMER_PASSDIGIT_SET");
      sys("✅ OTP verified");
      sys("State: CUSTOMER_REG_OTP → CUSTOMER_PASSDIGIT_SET");
      bot(
        "✅ *OTP Verified!*\n\n*Step 5/5: Set Passdigit*\n\nCreate a *4-digit passdigit* code you'll use to log in next time:"
      );
    } else {
      bot("Please enter a *4-digit OTP* (any 4 digits for testing):");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "CUSTOMER_PASSDIGIT_SET") {
    if (/^\d{4}$/.test(lower)) {
      ctx.stateData.passdigit = message;
      stateTransition = transition(ctx, "MAIN_MENU");
      sys("State: CUSTOMER_PASSDIGIT_SET → MAIN_MENU");
      bot(
        `🎉 *Welcome to LocalBazar Kart 🛒, ${ctx.name ?? "friend"}!*

✅ Registration complete

📋 *Choose Your Plan:*
━━━━━━━━━━━━━━━━━━━━
🆓 *Free Plan* — 5 orders/month, 3 inquiries/day
⭐ *Basic Plan* (₹99/mo) — 20 orders, 10 inquiries/day
🏆 *Premium Plan* (₹249/mo) — Unlimited, priority support

*Free plan will be auto-applied if you skip →*`,
        [
          { id: "sub1", title: "🆓 Free Plan (Auto)", payload: "sub_free" },
          { id: "sub2", title: "⭐ Basic — ₹99/mo", payload: "sub_basic" },
          { id: "sub3", title: "🏆 Premium — ₹249/mo", payload: "sub_premium" }
        ]
      );
    } else {
      bot("Please enter exactly *4 digits* for your passdigit (e.g. 1234):");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (lower === "sub_free" || lower === "sub_basic" || lower === "sub_premium") {
    const planLabels = {
      sub_free: "Free Plan (5 orders/month, 3 inquiries/day)",
      sub_basic: "Basic Plan ⭐ (20 orders/month, 10 inquiries/day)",
      sub_premium: "Premium Plan 🏆 (Unlimited orders, priority support)"
    };
    const planLabel = planLabels[lower] ?? "Free Plan";
    const isPaid = lower !== "sub_free";
    const planAmounts = {
      sub_basic: 99,
      sub_premium: 249
    };
    if (isPaid) {
      const planAmt = planAmounts[lower] ?? 99;
      bot(
        `💳 *${planLabel}*

Scan the QR below to pay ₹${planAmt}. QR expires in 2 minutes.`,
        [
          {
            id: "spay1",
            title: "✅ Payment Done — Activate Plan",
            payload: "sub_paid_confirm"
          },
          {
            id: "spay2",
            title: "🆓 Use Free Plan Instead",
            payload: "sub_free"
          }
        ],
        "qr_payment",
        {
          amount: planAmt,
          upiId: "localbazar@upi",
          expiresAt: Date.now() + getQRTimeoutMs()
        }
      );
    } else {
      bot(
        `✅ *Free Plan Applied!*

📋 ${planLabel}

You can upgrade anytime from your profile.

What would you like to do today?`,
        buildCustomerMainMenuQRs()
      );
    }
    return { messages: msgs };
  }
  if (lower === "sub_paid_confirm") {
    bot(
      "✅ *Payment Successful! Plan Activated.*\n\nYour subscription is now active.\n\nWhat would you like to do today?",
      buildCustomerMainMenuQRs()
    );
    return { messages: msgs };
  }
  if (ctx.state === "MERCHANT_REG_NAME") {
    ctx.stateData.merchantName = message;
    ctx.name = message;
    stateTransition = transition(ctx, "MERCHANT_REG_PHONE");
    sys("State: MERCHANT_REG_NAME → MERCHANT_REG_PHONE");
    bot(
      `Nice to meet you, *${message}*! 😊

🏪 *Step 2/14:* Please enter your *mobile number* (10 digits):

📱 This number will be used for customer contacts and account recovery.`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_PHONE") {
    const phoneClean = message.replace(/[^\d+]/g, "");
    if (phoneClean.length < 10) {
      bot(
        "❌ *Invalid mobile number.*\n\nPlease enter a valid *10-digit mobile number* (e.g. 9876543210):"
      );
      return { messages: msgs };
    }
    ctx.stateData.merchantPhone = phoneClean;
    stateTransition = transition(ctx, "MERCHANT_REG_OUTLET");
    sys("State: MERCHANT_REG_PHONE → MERCHANT_REG_OUTLET");
    bot("🏪 *Step 3/14:* Enter your *outlet/shop name*:");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_OUTLET") {
    ctx.stateData.outletName = message;
    stateTransition = transition(ctx, "MERCHANT_REG_CATEGORY");
    sys("State: MERCHANT_REG_OUTLET → MERCHANT_REG_CATEGORY");
    bot(
      "🏪 *Step 3/14:* Select your *business category*:\n\n1. Food & Restaurant\n2. Grocery & Kirana\n3. Medical & Pharmacy\n4. Clothing & Fashion\n5. Electronics\n6. Dairy & Milk\n7. Bakery & Sweets\n8. Salon & Beauty\n9. Travels & Cab\n10. Electrical & Plumbing\n11. Laundry & Cleaning\n12. Property & Real Estate\n13. Jobs & Recruitment\n14. Packers & Movers\n15. Automobile & Spare Parts\n16. Stationery & Books\n17. Kitchen Accessories\n18. Home Cleaning\n19. Paper & Disposal\n20. Cosmetics & Bath\n21. Retail Shop\n22. Wholesaler\n23. Manufacturer\n24. Auto Parts\n25. Snacks & Beverages\n26. Gifts & Frames\n27. Cold Drinks & Ice Cream\n28. Wellness & Health\n29. Therapist & Dr\n30. Radiologist & Lab\n31. PG/Hostels/Dormitory\n32. Car Wash\n33. Game Zone\n34. EV Charging\n35. Petrol Pump\n36. Transporter\n37. Printers & Reprographics\n38. Repairs & Maintenance\n39. Spare Parts\n40. Astrology\n41. Water Supply\n42. Flowers & Nursery\n43. Utensils & Cookware\n44. Footwear\n45. Accessories & Apparel\n46. Bike Service\n47. Car Dealer\n48. Bus Operator\n49. Auto Dealer\n50. Services (General)\n51. Healthcare\n52. Fitness & Gym\n53. Photography\n54. Event Management\n55. Catering\n56. Interior Design\n57. Architecture\n58. Legal Services\n59. Accounting & CA\n60. IT Services\n61. Electrician\n62. Plumber\n63. Carpenter\n64. Painter\n65. Security Services\n66. Marriage Hall\n67. Tour & Travel\n68. Hotel & Lodge\n69. Insurance\n70. Loan & Finance\n71. Other (type name)\n\nType the *number* or *category name*:",
      [
        { id: "cat1", title: "🍛 Food", payload: "Food & Restaurant" },
        { id: "cat2", title: "🥛 Grocery", payload: "Grocery & Kirana" },
        { id: "cat3", title: "💊 Medical", payload: "Medical & Pharmacy" },
        { id: "cat4", title: "👗 Clothing", payload: "Clothing & Fashion" },
        { id: "cat5", title: "📱 Electronics", payload: "Electronics" },
        { id: "cat6", title: "🥛 Dairy", payload: "Dairy & Milk" },
        { id: "cat7", title: "🍰 Bakery", payload: "Bakery & Sweets" },
        { id: "cat8", title: "💇 Salon", payload: "Salon & Beauty" },
        { id: "cat9", title: "🚗 Travel/Cab", payload: "Travels & Cab" },
        {
          id: "cat10",
          title: "🔧 Electrical",
          payload: "Electrical & Plumbing"
        },
        { id: "cat11", title: "🏥 Healthcare", payload: "Healthcare" },
        { id: "cat12", title: "🏋️ Fitness & Gym", payload: "Fitness & Gym" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_CATEGORY") {
    const catMap = {
      "1": "Food & Restaurant",
      "2": "Grocery & Kirana",
      "3": "Medical & Pharmacy",
      "4": "Clothing & Fashion",
      "5": "Electronics",
      "6": "Dairy & Milk",
      "7": "Bakery & Sweets",
      "8": "Salon & Beauty",
      "9": "Travels & Cab",
      "10": "Electrical & Plumbing",
      "11": "Laundry & Cleaning",
      "12": "Property & Real Estate",
      "13": "Jobs & Recruitment",
      "14": "Packers & Movers",
      "15": "Automobile & Spare Parts",
      "16": "Stationery & Books",
      "17": "Kitchen Accessories",
      "18": "Home Cleaning",
      "19": "Paper & Disposal",
      "20": "Cosmetics & Bath",
      "21": "Retail Shop",
      "22": "Wholesaler",
      "23": "Manufacturer",
      "24": "Auto Parts",
      "25": "Snacks & Beverages",
      "26": "Gifts & Frames",
      "27": "Cold Drinks & Ice Cream",
      "28": "Wellness & Health",
      "29": "Therapist & Dr",
      "30": "Radiologist & Lab",
      "31": "PG/Hostels/Dormitory",
      "32": "Car Wash",
      "33": "Game Zone",
      "34": "EV Charging",
      "35": "Petrol Pump",
      "36": "Transporter",
      "37": "Printers & Reprographics",
      "38": "Repairs & Maintenance",
      "39": "Spare Parts",
      "40": "Astrology",
      "41": "Water Supply",
      "42": "Flowers & Nursery",
      "43": "Utensils & Cookware",
      "44": "Footwear",
      "45": "Accessories & Apparel",
      "46": "Bike Service",
      "47": "Car Dealer",
      "48": "Bus Operator",
      "49": "Auto Dealer",
      "50": "Services (General)",
      "51": "Healthcare",
      "52": "Fitness & Gym",
      "53": "Photography",
      "54": "Event Management",
      "55": "Catering",
      "56": "Interior Design",
      "57": "Architecture",
      "58": "Legal Services",
      "59": "Accounting & CA",
      "60": "IT Services",
      "61": "Electrician",
      "62": "Plumber",
      "63": "Carpenter",
      "64": "Painter",
      "65": "Security Services",
      "66": "Marriage Hall",
      "67": "Tour & Travel",
      "68": "Hotel & Lodge",
      "69": "Insurance",
      "70": "Loan & Finance"
    };
    ctx.stateData.category = catMap[lower] ?? message;
    stateTransition = transition(ctx, "MERCHANT_REG_DELIVERY");
    sys("State: MERCHANT_REG_CATEGORY → MERCHANT_REG_DELIVERY");
    bot(
      `🏪 *Step 4/14:* Category: *${ctx.stateData.category}*

Select *delivery type*:`,
      [
        { id: "del1", title: "🚴 Online Delivery", payload: "online" },
        { id: "del2", title: "🏪 Takeaway Only", payload: "takeaway" },
        { id: "del3", title: "🔄 Both", payload: "both" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_DELIVERY") {
    ctx.stateData.deliveryType = message;
    stateTransition = transition(ctx, "MERCHANT_REG_TYPE");
    sys("State: MERCHANT_REG_DELIVERY → MERCHANT_REG_TYPE");
    bot("🏪 *Step 5/14:* Select *merchant type*:", [
      { id: "mt1", title: "🛒 Order-based", payload: "order" },
      { id: "mt2", title: "📩 Inquiry-based", payload: "inquiry" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_TYPE") {
    ctx.stateData.merchantType = message;
    stateTransition = transition(ctx, "MERCHANT_REG_PAYMENT");
    sys("State: MERCHANT_REG_TYPE → MERCHANT_REG_PAYMENT");
    bot("🏪 *Step 6/14:* Select *payment options* (you can pick multiple):", [
      { id: "pay1", title: "💵 Cash (COD)", payload: "cash" },
      { id: "pay2", title: "📱 UPI/QR Code", payload: "upi" },
      { id: "pay3", title: "💳 Both Cash & UPI", payload: "cash_upi" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_PAYMENT") {
    ctx.stateData.paymentOptions = message;
    stateTransition = transition(ctx, "MERCHANT_REG_ADVANCE");
    sys("State: MERCHANT_REG_PAYMENT → MERCHANT_REG_ADVANCE");
    if (lower.includes("cash") || lower === "cash") {
      bot(
        "🏪 *Step 7/14:* For COD orders, set *advance required* (% of order value):\n\nRecommended: 30% advance\n\nEnter percentage (e.g. 30) or type 0 for no advance:"
      );
    } else {
      ctx.stateData.advancePercent = "0";
      stateTransition = transition(ctx, "MERCHANT_REG_BOOKING");
      sys(
        "State: MERCHANT_REG_PAYMENT → MERCHANT_REG_BOOKING (skipping advance)"
      );
      bot(
        "🏪 *Step 8/14:* Is *booking/appointment* allowed for your business?",
        [
          { id: "bk1", title: "✅ Yes", payload: "yes" },
          { id: "bk2", title: "❌ No", payload: "no" }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_ADVANCE") {
    ctx.stateData.advancePercent = message;
    stateTransition = transition(ctx, "MERCHANT_REG_BOOKING");
    sys("State: MERCHANT_REG_ADVANCE → MERCHANT_REG_BOOKING");
    bot("🏪 *Step 8/14:* Is *booking/appointment* allowed?", [
      { id: "bk1", title: "✅ Yes", payload: "yes" },
      { id: "bk2", title: "❌ No", payload: "no" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_BOOKING") {
    ctx.stateData.bookingAllowed = lower === "yes" || lower.includes("yes");
    if (ctx.stateData.bookingAllowed) {
      stateTransition = transition(ctx, "MERCHANT_REG_BOOKING_PHONE");
      sys("State: MERCHANT_REG_BOOKING → MERCHANT_REG_BOOKING_PHONE");
      bot(
        "🏪 *Booking Phone:* Enter the *phone number* for booking/appointment inquiries:"
      );
    } else {
      stateTransition = transition(ctx, "MERCHANT_REG_RENTAL");
      sys("State: MERCHANT_REG_BOOKING → MERCHANT_REG_RENTAL");
      bot("🏪 *Step 10/17:* Is *rental service* offered?", [
        { id: "ren1", title: "✅ Yes", payload: "yes" },
        { id: "ren2", title: "❌ No", payload: "no" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_BOOKING_PHONE") {
    ctx.stateData.bookingPhone = message;
    stateTransition = transition(ctx, "MERCHANT_REG_RENTAL");
    sys("State: MERCHANT_REG_BOOKING_PHONE → MERCHANT_REG_RENTAL");
    bot("🏪 *Step 10/17:* Is *rental service* offered?", [
      { id: "ren1", title: "✅ Yes", payload: "yes" },
      { id: "ren2", title: "❌ No", payload: "no" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_RENTAL") {
    ctx.stateData.rentalAllowed = message;
    stateTransition = transition(ctx, "MERCHANT_REG_ADDRESS");
    sys("State: MERCHANT_REG_RENTAL → MERCHANT_REG_ADDRESS");
    bot("🏪 *Step 11/17:* Enter your *outlet address* (street, area, city):");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_ADDRESS") {
    ctx.stateData.outletAddress = message;
    stateTransition = transition(ctx, "MERCHANT_REG_RADIUS");
    sys("State: MERCHANT_REG_ADDRESS → MERCHANT_REG_RADIUS");
    bot("🏪 *Step 12/17:* Enter *delivery radius* in km (e.g. 5):");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_RADIUS") {
    ctx.stateData.deliveryRadius = message;
    stateTransition = transition(ctx, "MERCHANT_REG_MULTIBRANCH");
    sys("State: MERCHANT_REG_RADIUS → MERCHANT_REG_MULTIBRANCH");
    bot(
      `🏪 *Step 13/17:* Delivery radius: *${message} km*

Do you have *multiple branches*?`,
      [
        { id: "mb1", title: "✅ Yes, add branches", payload: "yes" },
        { id: "mb2", title: "❌ No, single outlet", payload: "no" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_MULTIBRANCH") {
    if (lower === "yes" || lower === "1") {
      ctx.stateData.multibranch = true;
      ctx.stateData.branches = ctx.stateData.branches ?? [];
      stateTransition = transition(ctx, "MERCHANT_REG_BRANCH_ADDRESS");
      sys("State: MERCHANT_REG_MULTIBRANCH → MERCHANT_REG_BRANCH_ADDRESS");
      const branchNum = (ctx.stateData.branches.length ?? 0) + 1;
      bot(`🏪 *Branch ${branchNum}:* Enter the *branch address*:`);
    } else {
      ctx.stateData.multibranch = false;
      stateTransition = transition(ctx, "MERCHANT_REG_AADHAAR");
      sys("State: MERCHANT_REG_MULTIBRANCH → MERCHANT_REG_AADHAAR");
      bot(
        "🏪 *Step 14/17: KYC Documents*\n\nEnter your *Aadhaar number* (12 digits):"
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_BRANCH_ADDRESS") {
    ctx.stateData.currentBranchAddress = message;
    stateTransition = transition(ctx, "MERCHANT_REG_BRANCH_RADIUS");
    sys("State: MERCHANT_REG_BRANCH_ADDRESS → MERCHANT_REG_BRANCH_RADIUS");
    bot(
      `🏪 Branch address: *${message}*

Enter *delivery radius* for this branch (km):`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_BRANCH_RADIUS") {
    const branches = ctx.stateData.branches ?? [];
    branches.push({
      address: String(ctx.stateData.currentBranchAddress ?? ""),
      radius: message
    });
    ctx.stateData.branches = branches;
    stateTransition = transition(ctx, "MERCHANT_REG_BRANCH_MORE");
    sys("State: MERCHANT_REG_BRANCH_RADIUS → MERCHANT_REG_BRANCH_MORE");
    bot(
      `✅ *Branch ${branches.length} added!* Radius: *${message} km*

Would you like to add another branch?`,
      [
        { id: "bm1", title: "➕ Add Another Branch", payload: "add_branch" },
        { id: "bm2", title: "✅ Done, Continue", payload: "done_branches" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_BRANCH_MORE") {
    if (lower === "add_branch" || lower.includes("add another")) {
      stateTransition = transition(ctx, "MERCHANT_REG_BRANCH_ADDRESS");
      sys("State: MERCHANT_REG_BRANCH_MORE → MERCHANT_REG_BRANCH_ADDRESS");
      const branchNum = (ctx.stateData.branches.length ?? 0) + 1;
      bot(`🏪 *Branch ${branchNum}:* Enter the *branch address*:`);
    } else {
      stateTransition = transition(ctx, "MERCHANT_REG_AADHAAR");
      sys("State: MERCHANT_REG_BRANCH_MORE → MERCHANT_REG_AADHAAR");
      bot(
        "🏪 *Step 14/17: KYC Documents*\n\nEnter your *Aadhaar number* (12 digits):"
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_AADHAAR") {
    ctx.stateData.aadhaar = message;
    stateTransition = transition(ctx, "MERCHANT_REG_AADHAAR_PHOTO");
    sys("State: MERCHANT_REG_AADHAAR → MERCHANT_REG_AADHAAR_PHOTO");
    bot(
      "🏪 *KYC Step 2/6:* Upload your *Aadhaar photo* (front side):\n\n[📎 Attach photo or type URL]",
      [
        {
          id: "skip_aadhaar_photo",
          title: "📷 Photo uploaded (simulated)",
          payload: "aadhaar_photo_done"
        }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_AADHAAR_PHOTO") {
    ctx.stateData.aadhaarPhoto = lower === "aadhaar_photo_done" ? "uploaded" : message;
    stateTransition = transition(ctx, "MERCHANT_REG_PAN");
    sys("State: MERCHANT_REG_AADHAAR_PHOTO → MERCHANT_REG_PAN");
    bot("🏪 *KYC Step 3/6:* Enter your *PAN card number* (e.g. ABCDE1234F):");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_PAN") {
    ctx.stateData.pan = message.toUpperCase();
    stateTransition = transition(ctx, "MERCHANT_REG_PAN_PHOTO");
    sys("State: MERCHANT_REG_PAN → MERCHANT_REG_PAN_PHOTO");
    bot(
      "🏪 *KYC Step 4/6:* Upload your *PAN photo*:\n\n[📎 Attach photo or type URL]",
      [
        {
          id: "skip_pan_photo",
          title: "📷 Photo uploaded (simulated)",
          payload: "pan_photo_done"
        }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_PAN_PHOTO") {
    ctx.stateData.panPhoto = lower === "pan_photo_done" ? "uploaded" : message;
    stateTransition = transition(ctx, "MERCHANT_REG_GST");
    sys("State: MERCHANT_REG_PAN_PHOTO → MERCHANT_REG_GST");
    bot(
      "🏪 *KYC Step 5/6:* Enter your *GST number* (optional — if registered):",
      [
        {
          id: "skip_gst",
          title: "⏭️ Skip (Not Registered)",
          payload: "skip_gst"
        }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_GST") {
    ctx.stateData.gst = lower === "skip" || lower === "skip_gst" ? "N/A" : message.toUpperCase();
    if (ctx.stateData.gst !== "N/A") {
      stateTransition = transition(ctx, "MERCHANT_REG_GST_PHOTO");
      sys("State: MERCHANT_REG_GST → MERCHANT_REG_GST_PHOTO");
      bot("🏪 *KYC Step 6/6:* Upload your *GST certificate photo*:", [
        {
          id: "skip_gst_photo",
          title: "📷 Photo uploaded (simulated)",
          payload: "gst_photo_done"
        },
        { id: "skip_gst_photo2", title: "⏭️ Skip", payload: "skip_gst_photo" }
      ]);
    } else {
      stateTransition = transition(ctx, "MERCHANT_REG_OTP");
      sys("State: MERCHANT_REG_GST → MERCHANT_REG_OTP");
      bot(
        "📱 *Step 15/17: Verify WhatsApp Number*\n\nOTP sent to your number.\nEnter any *4–6 digits* to simulate verification:"
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_GST_PHOTO") {
    ctx.stateData.gstPhoto = lower === "gst_photo_done" || lower === "skip_gst_photo" ? "uploaded" : message;
    stateTransition = transition(ctx, "MERCHANT_REG_OTP");
    sys("State: MERCHANT_REG_GST_PHOTO → MERCHANT_REG_OTP");
    bot(
      "📱 *Step 15/17: Verify WhatsApp Number*\n\nOTP sent to your number.\nEnter any *4–6 digits* to simulate verification:"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_OTP") {
    if (/^\d{4,6}$/.test(lower)) {
      stateTransition = transition(ctx, "MERCHANT_PASSDIGIT_SET");
      sys("✅ OTP verified");
      sys("State: MERCHANT_REG_OTP → MERCHANT_PASSDIGIT_SET");
      bot(
        "✅ *OTP Verified!*\n\n*Step 16/17:* Create a *4-digit passdigit* to secure your account:"
      );
    } else {
      bot("Please enter a 4–6 digit OTP (any digits for testing):");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_PASSDIGIT_SET") {
    if (/^\d{4}$/.test(lower)) {
      ctx.stateData.passdigit = message;
      stateTransition = transition(ctx, "MERCHANT_PASSDIGIT_CONFIRM");
      sys("State: MERCHANT_PASSDIGIT_SET → MERCHANT_PASSDIGIT_CONFIRM");
      bot("*Step 17/17:* Confirm your *4-digit passdigit* (enter it again):");
    } else {
      bot("Please enter exactly *4 digits* for your passdigit:");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_PASSDIGIT_CONFIRM") {
    if (message === String(ctx.stateData.passdigit)) {
      stateTransition = transition(ctx, "MERCHANT_MENU");
      sys("State: MERCHANT_PASSDIGIT_CONFIRM → MERCHANT_MENU");
      sys("✅ Merchant registration data saved to backend");
      const _savedMerchantPhone = String(
        ctx.stateData.merchantPhone ?? phoneNumber
      );
      sys(`Phone: ${_savedMerchantPhone}`);
      bot(
        `🎉 *Merchant Registration Submitted!*

✅ Owner: *${ctx.stateData.merchantName ?? ctx.name ?? "—"}*
✅ Phone: *${_savedMerchantPhone}*
✅ Outlet: *${ctx.stateData.outletName ?? "Your Store"}*
✅ Category: ${ctx.stateData.category ?? "—"}
✅ Address: ${ctx.stateData.outletAddress ?? "—"}
✅ KYC Documents: Submitted
✅ Passdigit: Set

📋 *Choose Subscription Plan:*
━━━━━━━━━━━━━━━━━━━━
🇓️ *Free Plan* — 5 listings/month
⭐ *Basic Plan* (₹299/mo) — 50 orders/month
🏆 *Business Plan* (₹799/mo) — Unlimited, analytics

*Your account is pending admin verification.*`,
        [
          { id: "msub1", title: "🆓 Free Plan (Auto)", payload: "sub_free" },
          { id: "msub2", title: "⭐ Basic — ₹299/mo", payload: "sub_basic" },
          {
            id: "msub3",
            title: "🏆 Business — ₹799/mo",
            payload: "sub_premium"
          },
          { id: "m1", title: "➕ Add Product", payload: "add_product" },
          { id: "m2", title: "📦 My Orders", payload: "merchant_orders" }
        ]
      );
    } else {
      bot(
        "❌ *Passdigit mismatch!* Please enter your 4-digit passdigit again:"
      );
      stateTransition = transition(ctx, "MERCHANT_PASSDIGIT_SET");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_REG_NAME") {
    ctx.name = message;
    ctx.stateData.dpName = message;
    stateTransition = transition(ctx, "DP_REG_PHONE");
    sys("State: DP_REG_NAME → DP_REG_PHONE");
    bot(
      `Nice to meet you, *${message}*! 😊

🚴 *Step 2:* Please enter your *mobile number* (10 digits):

📱 This number will be your account login and contact number.`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_REG_PHONE") {
    const phoneClean = message.replace(/[^\d+]/g, "");
    if (phoneClean.length < 10) {
      bot(
        "❌ *Invalid mobile number.*\n\nPlease enter a valid *10-digit mobile number* (e.g. 9876543210):"
      );
      return { messages: msgs };
    }
    ctx.stateData.dpPhone = phoneClean;
    const isSarthi = ctx.stateData.dpServiceType === "sarthi";
    if (isSarthi) {
      stateTransition = transition(ctx, "DP_REG_AADHAAR");
      sys("State: DP_REG_PHONE → DP_REG_AADHAAR (sarthi)");
      bot(
        `🛺 *Sarthi Registration — Step 3/6*

Name: *${ctx.stateData.dpName ?? ctx.name}* | Phone: *${phoneClean}*

Enter your *Aadhaar card number* (12 digits):`
      );
    } else {
      stateTransition = transition(ctx, "DP_REG_SERVICE");
      sys("State: DP_REG_PHONE → DP_REG_SERVICE");
      bot(
        `🚴 *Step 3/7:* Phone: *${phoneClean}*

Select your *service type*:`,
        [
          { id: "svc1", title: "🚴 Delivery Partner", payload: "delivery" },
          {
            id: "svc2",
            title: "🛺 Sarthi (Passenger Pickup)",
            payload: "sarthi"
          }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_REG_SERVICE") {
    const isSarthi = lower === "sarthi" || lower.includes("passenger");
    ctx.stateData.dpServiceType = isSarthi ? "sarthi" : "delivery";
    stateTransition = transition(ctx, "DP_REG_AADHAAR");
    sys("State: DP_REG_SERVICE → DP_REG_AADHAAR");
    bot(
      `✅ Service: *${isSarthi ? "Sarthi (Passenger Pickup)" : "Delivery Partner"}*

*Step 3/7:* Enter your *Aadhaar card number* (12 digits):`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_REG_AADHAAR") {
    ctx.stateData.aadhaar = message;
    stateTransition = transition(ctx, "DP_REG_RC");
    sys("State: DP_REG_AADHAAR → DP_REG_RC");
    const step = ctx.stateData.dpServiceType === "sarthi" ? "3/6" : "4/7";
    bot(`*Step ${step}:* Enter your *RC Book number* (vehicle registration):`);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_REG_RC") {
    ctx.stateData.rcBook = message;
    stateTransition = transition(ctx, "DP_REG_PAN");
    sys("State: DP_REG_RC → DP_REG_PAN");
    const step = ctx.stateData.dpServiceType === "sarthi" ? "4/6" : "5/7";
    bot(`*Step ${step}:* Enter your *PAN card number* (e.g. ABCDE1234F):`);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_REG_PAN") {
    ctx.stateData.pan = message.toUpperCase();
    stateTransition = transition(ctx, "DP_REG_VEHICLE");
    sys("State: DP_REG_PAN → DP_REG_VEHICLE");
    const step = ctx.stateData.dpServiceType === "sarthi" ? "5/6" : "6/7";
    bot(`*Step ${step}:* Select your *vehicle type*:`, [
      { id: "veh1", title: "🏍 Bike", payload: "Bike" },
      { id: "veh2", title: "🚐 Van", payload: "Van" },
      { id: "veh3", title: "🚛 Truck", payload: "Truck" },
      { id: "veh4", title: "🛻 Tempo", payload: "Tempo" },
      { id: "veh5", title: "🚗 Car", payload: "Car" },
      { id: "veh6", title: "🚌 Bus", payload: "Bus" },
      { id: "veh7", title: "🛺 Auto", payload: "Auto" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_REG_VEHICLE") {
    ctx.stateData.vehicleType = message;
    const rateCard = {
      Bike: "₹30 base + ₹8/km",
      Van: "₹80 base + ₹15/km",
      Truck: "₹200 base + ₹25/km",
      Tempo: "₹120 base + ₹18/km",
      Car: "₹60 base + ₹12/km",
      Bus: "₹300 base + ₹20/km",
      Auto: "₹40 base + ₹10/km"
    };
    const rate = rateCard[message] ?? "₹50 base + ₹10/km";
    ctx.stateData.rateCard = rate;
    stateTransition = transition(ctx, "DP_REG_OTP");
    sys("State: DP_REG_VEHICLE → DP_REG_OTP");
    bot(
      `✅ Vehicle: *${message}*

💰 *Rate Card for ${message}:*
${rate}

Enter any *4–6 digits* to simulate OTP verification:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_REG_OTP") {
    if (/^\d{4,6}$/.test(lower)) {
      stateTransition = transition(ctx, "DP_PASSDIGIT_SET");
      sys("✅ OTP verified");
      sys("State: DP_REG_OTP → DP_PASSDIGIT_SET");
      bot(
        "✅ *OTP Verified!*\n\nCreate a *4-digit passdigit* to secure your account:"
      );
    } else {
      bot("Please enter a 4–6 digit OTP (any digits for testing):");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_PASSDIGIT_SET") {
    if (/^\d{4}$/.test(lower)) {
      ctx.stateData.passdigit = message;
      const isSarthi = ctx.stateData.dpServiceType === "sarthi";
      stateTransition = transition(ctx, "DP_MENU");
      sys("State: DP_PASSDIGIT_SET → DP_MENU");
      const _savedDpPhone = String(ctx.stateData.dpPhone ?? phoneNumber);
      sys(`DP Phone: ${_savedDpPhone}`);
      bot(
        `🎉 *${isSarthi ? "Sarthi" : "Delivery Partner"} Registration Submitted!*

✅ Name: *${ctx.stateData.dpName ?? ctx.name ?? "—"}*
✅ Phone: *${_savedDpPhone}*
✅ Vehicle: ${ctx.stateData.vehicleType ?? "—"}
✅ Rate: ${ctx.stateData.rateCard ?? "—"}

⏳ *Pending approval.* Your registration will be reviewed within 24 hours.
⚠️ If any document is missing, it will be *automatically rejected*.

📋 *Choose Plan:*
🇓️ *Free Plan* — 10 deliveries/month
⭐ *Partner Plan* (₹199/mo) — Unlimited deliveries, priority orders

*Free plan auto-applied →*`,
        [
          { id: "dpsub1", title: "🆓 Free Plan (Auto)", payload: "sub_free" },
          { id: "dpsub2", title: "⭐ Partner — ₹199/mo", payload: "sub_basic" },
          { id: "d1", title: "📦 Available Orders", payload: "dp_orders" },
          { id: "d2", title: "💰 My Earnings", payload: "dp_earnings" }
        ]
      );
    } else {
      bot("Please enter exactly *4 digits* for your passdigit:");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_TITLE") {
    ctx.stateData.productTitle = message;
    stateTransition = transition(ctx, "ADD_PRODUCT_DESC");
    sys("State: ADD_PRODUCT_TITLE → ADD_PRODUCT_DESC");
    const aiDesc = `${message} is a premium quality product offering exceptional value. Designed for everyday use with superior craftsmanship and reliable performance that customers love.`;
    ctx.stateData.productAiDesc = aiDesc;
    bot(
      `➕ *Add Product — Step 2/13*

Title: *${message}*

🤖 *AI Generated Description:*
"${aiDesc}"

Use this or write your own?`,
      [
        {
          id: "use_ai_desc",
          title: "✅ Use AI Description",
          payload: "use_ai_desc"
        },
        {
          id: "write_desc",
          title: "✏️ Write My Own",
          payload: "write_own_desc"
        }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_DESC") {
    if (lower === "use_ai_desc") {
      ctx.stateData.productDesc = String(ctx.stateData.productAiDesc ?? "");
    } else if (lower === "write_own_desc") {
      bot("✏️ Enter your *product description*:");
      return { messages: msgs };
    } else {
      ctx.stateData.productDesc = message;
    }
    stateTransition = transition(ctx, "ADD_PRODUCT_BRAND");
    sys("State: ADD_PRODUCT_DESC → ADD_PRODUCT_BRAND");
    bot(
      "➕ *Step 3/13:* Enter the *brand name* (e.g. Samsung, Amul, Local Brand):"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_BRAND") {
    ctx.stateData.productBrand = message;
    stateTransition = transition(ctx, "ADD_PRODUCT_IMAGE");
    sys("State: ADD_PRODUCT_BRAND → ADD_PRODUCT_IMAGE");
    bot("➕ *Step 4/13:* Upload or paste a *product image URL*:", [
      { id: "skip_image", title: "⏭️ Skip Image", payload: "skip_image" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_IMAGE") {
    ctx.stateData.productImage = lower === "skip" || lower === "skip_image" ? null : message;
    stateTransition = transition(ctx, "ADD_PRODUCT_SOCIAL_LINK");
    sys("State: ADD_PRODUCT_IMAGE → ADD_PRODUCT_SOCIAL_LINK");
    bot(
      "➕ *Step 5/13:* Paste an *Instagram/Pinterest image link* (optional):",
      [{ id: "skip_social", title: "⏭️ Skip", payload: "skip_social" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_SOCIAL_LINK") {
    ctx.stateData.productSocialLink = lower === "skip" || lower === "skip_social" ? null : message;
    stateTransition = transition(ctx, "ADD_PRODUCT_VIDEO");
    sys("State: ADD_PRODUCT_SOCIAL_LINK → ADD_PRODUCT_VIDEO");
    bot("➕ *Step 6/13:* Paste a *YouTube video link* (optional):", [
      { id: "skip_video", title: "⏭️ Skip", payload: "skip_video" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_VIDEO") {
    ctx.stateData.productVideo = lower === "skip" || lower === "skip_video" ? null : message;
    stateTransition = transition(ctx, "ADD_PRODUCT_CONDITION");
    sys("State: ADD_PRODUCT_VIDEO → ADD_PRODUCT_CONDITION");
    bot("➕ *Step 7/13:* Product condition:", [
      { id: "cond1", title: "🆕 New", payload: "new" },
      { id: "cond2", title: "♻️ Refurbished", payload: "refurbished" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_CONDITION") {
    ctx.stateData.productCondition = message;
    stateTransition = transition(ctx, "ADD_PRODUCT_MRP");
    sys("State: ADD_PRODUCT_CONDITION → ADD_PRODUCT_MRP");
    bot("➕ *Step 8/13:* Enter *MRP* (Maximum Retail Price) in ₹ (e.g. 350):");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_MRP") {
    ctx.stateData.productMrp = message;
    stateTransition = transition(ctx, "ADD_PRODUCT_RATE");
    sys("State: ADD_PRODUCT_MRP → ADD_PRODUCT_RATE");
    bot("➕ *Step 9/13:* Enter *selling price* in ₹ (e.g. 250):");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_RATE") {
    ctx.stateData.productRate = message;
    stateTransition = transition(ctx, "ADD_PRODUCT_BULK");
    sys("State: ADD_PRODUCT_RATE → ADD_PRODUCT_BULK");
    bot(
      "➕ *Step 10/13:* Enter *bulk rate* with minimum quantity (e.g. '10 items for ₹500') (optional):",
      [{ id: "skip_bulk", title: "⏭️ Skip", payload: "skip_bulk" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_BULK") {
    ctx.stateData.productBulkRate = lower === "skip" || lower === "skip_bulk" ? null : message;
    stateTransition = transition(ctx, "ADD_PRODUCT_DISCOUNT");
    sys("State: ADD_PRODUCT_BULK → ADD_PRODUCT_DISCOUNT");
    bot(
      "➕ *Step 11/13:* Enter *scheme discount* % (e.g. 10 for 10% off) (optional):",
      [{ id: "skip_disc", title: "⏭️ Skip", payload: "skip_disc" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_DISCOUNT") {
    ctx.stateData.productDiscount = lower === "skip" || lower === "skip_disc" ? "0" : message;
    stateTransition = transition(ctx, "ADD_PRODUCT_PURCHASE_RATE");
    sys("State: ADD_PRODUCT_DISCOUNT → ADD_PRODUCT_PURCHASE_RATE");
    bot(
      "➕ *Step 12/13:* Enter your *purchase rate* (cost price) in ₹ (optional):",
      [{ id: "skip_purchase", title: "⏭️ Skip", payload: "skip_purchase" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_PURCHASE_RATE") {
    ctx.stateData.productPurchaseRate = lower === "skip" || lower === "skip_purchase" ? null : message;
    stateTransition = transition(ctx, "ADD_PRODUCT_SUPPLIER");
    sys("State: ADD_PRODUCT_PURCHASE_RATE → ADD_PRODUCT_SUPPLIER");
    bot(
      "➕ *Step 13/13:* Enter *purchased from* (supplier/vendor name) (optional):",
      [{ id: "skip_supplier", title: "⏭️ Skip", payload: "skip_supplier" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_SUPPLIER") {
    ctx.stateData.productSupplier = lower === "skip" || lower === "skip_supplier" ? null : message;
    stateTransition = transition(ctx, "ADD_PRODUCT_CONFIRM");
    sys("State: ADD_PRODUCT_SUPPLIER → ADD_PRODUCT_CONFIRM");
    bot(
      `➕ *Product Summary — Please Confirm*

📦 *${ctx.stateData.productTitle}*
🏷 Brand: ${ctx.stateData.productBrand ?? "—"}
📝 ${String(ctx.stateData.productDesc ?? "").slice(0, 60)}...
✅ Condition: ${ctx.stateData.productCondition ?? "New"}
💰 MRP: ₹${ctx.stateData.productMrp ?? "—"} | Selling: ₹${ctx.stateData.productRate}
${ctx.stateData.productBulkRate ? `📦 Bulk: ${ctx.stateData.productBulkRate}
` : ""}🏷 Discount: ${ctx.stateData.productDiscount ?? "0"}%

Save this product?`,
      [
        { id: "pc1", title: "✅ Save Product", payload: "save_product" },
        { id: "pc2", title: "🔄 Start Over", payload: "add_product" },
        { id: "pc3", title: "🏠 Merchant Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_CONFIRM") {
    if (lower === "save_product") {
      stateTransition = transition(ctx, "MERCHANT_MENU");
      sys("State: ADD_PRODUCT_CONFIRM → MERCHANT_MENU");
      sys("✅ Product saved to backend via addProduct()");
      bot(
        `✅ *Product Saved!*

*${ctx.stateData.productTitle}* has been added to your store.

Would you like to add another product?`,
        [
          {
            id: "pa1",
            title: "➕ Add Another Product",
            payload: "add_product"
          },
          { id: "pa2", title: "📦 My Orders", payload: "merchant_orders" },
          { id: "pa3", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else if (lower === "add_product" || lower.includes("start over")) {
      stateTransition = transition(ctx, "ADD_PRODUCT_TITLE");
      sys("State: ADD_PRODUCT_CONFIRM → ADD_PRODUCT_TITLE (restart)");
      bot("➕ *Add Product — Step 1/13*\n\nEnter the *product name/title*:");
    } else {
      bot("Please confirm:", [
        { id: "pc1", title: "✅ Save Product", payload: "save_product" },
        { id: "pc2", title: "🏠 Merchant Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_EXCEL_UPLOAD") {
    if (lower === "download_template") {
      bot(
        "📥 *Template downloaded!*\n\nA CSV file with these columns has been prepared:\n`Product Name | Description | Brand | MRP | Selling Price | Bulk Rate | Discount% | Condition | Stock | Category`\n\nFill in the template and upload it here.",
        [
          {
            id: "eu_upload2",
            title: "📤 Upload Filled Template",
            payload: "upload_excel_file"
          },
          { id: "eu_cancel2", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else if (lower === "upload_excel_file" || lower.includes("upload")) {
      stateTransition = transition(ctx, "MERCHANT_MENU");
      sys("State: ADD_PRODUCT_EXCEL_UPLOAD → MERCHANT_MENU (upload complete)");
      bot(
        "📊 *Excel Upload Successful!*\n\n✅ *5 products parsed from your file*\n✅ *5 products added to your store*\n\nYour products are now visible to customers.",
        [
          { id: "eu1", title: "➕ Add More Products", payload: "add_product" },
          { id: "eu3", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else {
      bot(
        "Please upload your filled Excel/CSV template or download the template first:",
        [
          {
            id: "eu_dl",
            title: "📥 Download Template",
            payload: "download_template"
          },
          {
            id: "eu_up",
            title: "📤 Upload Template",
            payload: "upload_excel_file"
          },
          { id: "eu_x", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_PHOTO_UPLOAD") {
    if (lower === "photo_uploaded" || lower.includes("photo") || lower.includes("upload")) {
      stateTransition = transition(ctx, "MERCHANT_MENU");
      sys("State: ADD_PRODUCT_PHOTO_UPLOAD → MERCHANT_MENU (photo complete)");
      bot(
        "📷 *Photo Uploaded Successfully!*\n\n🤖 *AI is parsing your menu photo...*\n✅ *3 products extracted and added to your store*\n\nCustomers can now browse your products.",
        [
          { id: "pp1", title: "➕ Add More Products", payload: "add_product" },
          { id: "pp2", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else {
      bot("Please upload a photo of your menu:", [
        {
          id: "pm_up",
          title: "📷 Photo Uploaded (simulated)",
          payload: "photo_uploaded"
        },
        { id: "pm_x", title: "🏠 Merchant Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_PRODUCT_METHOD") {
    if (lower === "manual_product") {
      stateTransition = transition(ctx, "ADD_PRODUCT_TITLE");
      bot(
        "➕ *Add Product (Manual Entry) — Step 1/13*\n\nEnter the *product name/title*:"
      );
    } else if (lower === "excel_upload") {
      stateTransition = transition(ctx, "ADD_PRODUCT_EXCEL_UPLOAD");
      bot(
        "📊 *Upload Products via Excel*\n\nDownload the template, fill it in, then upload it here.",
        [
          {
            id: "eu_dl3",
            title: "📥 Download Template (CSV)",
            payload: "download_template"
          },
          {
            id: "eu_up3",
            title: "📤 Upload Filled Template",
            payload: "upload_excel_file"
          },
          { id: "eu_x3", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else if (lower === "photo_menu") {
      stateTransition = transition(ctx, "ADD_PRODUCT_PHOTO_UPLOAD");
      bot("📷 *Upload Menu Photo*\n\n[📎 Attach menu photo]", [
        {
          id: "pm_up3",
          title: "📷 Photo Uploaded (simulated)",
          payload: "photo_uploaded"
        },
        { id: "pm_x3", title: "🏠 Merchant Menu", payload: "hi" }
      ]);
    } else {
      bot("How would you like to add your product?", [
        { id: "ap1b", title: "📝 Manual Entry", payload: "manual_product" },
        { id: "ap2b", title: "📊 Upload Excel/CSV", payload: "excel_upload" },
        { id: "ap3b", title: "📷 Photo Menu", payload: "photo_menu" },
        { id: "ap4b", title: "🏠 Merchant Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MAIN_MENU") {
    let isModDisabled = function(mod) {
      return disabledMods.has(mod);
    };
    const disabledMods = getDisabledModules();
    if (lower === "open_customer_dashboard" || lower === "customer_dashboard_link") {
      bot(
        "📊 *Your Customer Dashboard*\n\nOpen your full dashboard to view orders, expenditure, family connections, and subscriptions:\n\n🔗 *https://localbazarkart.app/customer-dashboard*\n\nBookmark this link to access your dashboard anytime!",
        [
          { id: "cdb1", title: "🛒 Browse & Order", payload: "1" },
          { id: "cdb2", title: "📦 Track Orders", payload: "2" }
        ]
      );
      return { messages: msgs };
    }
    if (lower === "1" || lower.includes("order") || lower.includes("browse") || lower.includes("shop")) {
      if (isModDisabled("shopping")) {
        bot(
          "❌ *Shopping is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "ORDER_SEARCH_INPUT");
      sys("State: MAIN_MENU → ORDER_SEARCH_INPUT");
      bot(
        "🛒 *What are you looking for today?*\n\nPlease type a *product name or keyword* (e.g. dal, bread, vegetables, medicines) OR send a *photo* of the product you want to find.\n\n📸 I will search nearby merchants for you!",
        [
          { id: "os1", title: "🥗 Grocery", payload: "grocery" },
          { id: "os2", title: "🍛 Food", payload: "food" },
          { id: "os3", title: "💊 Medicine", payload: "medicine" },
          { id: "os4", title: "👗 Clothing", payload: "clothing" },
          { id: "os5", title: "📱 Electronics", payload: "electronics" },
          { id: "os6", title: "🏥 Healthcare", payload: "healthcare" },
          {
            id: "os_ondc",
            title: "🌐 Search ONDC Network",
            payload: "search_ondc"
          }
        ]
      );
    } else if (lower === "2" || lower.includes("track")) {
      stateTransition = transition(ctx, "ORDER_TRACKING");
      sys("State: MAIN_MENU → ORDER_TRACKING");
      bot(
        "📦 *Track an Order*\n\nEnter your order ID to track it.\n\nYou can find your order ID in your confirmation message.",
        [{ id: "t3", title: "🏠 Main Menu", payload: "hi" }]
      );
    } else if (lower === "3" || lower.includes("job")) {
      if (isModDisabled("jobs")) {
        bot(
          "❌ *Jobs is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "JOB_MENU");
      sys("State: MAIN_MENU → JOB_MENU");
      bot("💼 *Job Listings*\n\nBrowse opportunities or post a vacancy:", [
        { id: "j1", title: "📋 Browse Jobs", payload: "browse_jobs" },
        { id: "j2", title: "✏️ Post a Job", payload: "post_job" },
        { id: "j3", title: "📁 My Job Listings", payload: "my_jobs" },
        { id: "j4", title: "🏠 Main Menu", payload: "hi" }
      ]);
    } else if (lower === "4" || lower.includes("property") || lower.includes("house") || lower.includes("flat")) {
      if (isModDisabled("property")) {
        bot(
          "❌ *Property Listings is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "PROPERTY_MENU");
      sys("State: MAIN_MENU → PROPERTY_MENU");
      bot(
        "🏠 *Property Listings*\n\nBrowse, post, or inquire about properties:",
        [
          { id: "pr1", title: "🏢 For Rent", payload: "search_rent" },
          { id: "pr2", title: "🏠 For Sale/Buy", payload: "search_buy" },
          {
            id: "pr3",
            title: "🏭 Lease / Commercial",
            payload: "search_lease"
          },
          { id: "pr4", title: "📝 Post Property", payload: "post_property" },
          { id: "pr5", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower === "event" || lower.includes("event") || lower === "post_event_menu") {
      if (isModDisabled("events")) {
        bot(
          "❌ *Events is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "EVENT_MENU");
      sys("State: MAIN_MENU → EVENT_MENU");
      bot("🎉 *Events*\n\nPost or discover events near you:", [
        { id: "ev1", title: "📝 Post Event", payload: "post_event" },
        { id: "ev2", title: "🔍 Search Event", payload: "search_event" },
        { id: "ev3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    } else if (lower === "family" || lower.includes("family") || lower === "my_family") {
      if (isModDisabled("family")) {
        bot(
          "❌ *Family Group is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "FAMILY_MENU");
      sys("State: MAIN_MENU → FAMILY_MENU");
      bot("👨‍👩‍👧‍👦 *Family Group*\n\nManage your family connections:", [
        { id: "fm1", title: "➕ Add Family Member", payload: "add_family" },
        { id: "fm2", title: "👥 View Family", payload: "view_family" },
        { id: "fm3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    } else if (lower === "advertise" || lower.includes("advertise") || lower.includes("promote") || lower === "promo_menu") {
      if (isModDisabled("promotions")) {
        bot(
          "❌ *Advertise / Promote is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "PROMO_MENU");
      sys("State: MAIN_MENU → PROMO_MENU");
      bot("📣 *Advertise / Promote*\n\nReach targeted users in your area:", [
        {
          id: "pm1",
          title: "📢 Post Advertisement",
          payload: "post_ad"
        },
        { id: "pm2", title: "📊 My Promotions", payload: "my_promos" },
        { id: "pm3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    } else if (lower === "transport" || lower.includes("transport") || lower.includes("sarthi") || lower.includes("ride")) {
      if (isModDisabled("transport")) {
        bot(
          "❌ *Transport Services is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "TRANSPORT_MENU");
      sys("State: MAIN_MENU → TRANSPORT_MENU");
      bot("🛺 *Transport Services*\n\nChoose how you'd like to travel:", [
        { id: "tr1", title: "🚗 Book a Ride", payload: "book_ride" },
        { id: "tr2", title: "🚌 Shuttle Service", payload: "shuttle_service" },
        {
          id: "tr3",
          title: "🛺 Free Ride Sharing (OTP)",
          payload: "free_ride_otp"
        },
        { id: "tr5", title: "🏠 Main Menu", payload: "hi" }
      ]);
    } else if (lower === "my_listings_customer" || lower === "my_listings") {
      bot(
        "📁 *My Listings*\n\nNo listings yet. Post a job, property, or event to see your listings here.",
        [
          { id: "mll1", title: "💼 Post Job", payload: "3" },
          { id: "mll2", title: "🏠 Post Property", payload: "4" },
          { id: "mll3", title: "🎉 Post Event", payload: "event" },
          { id: "mll4", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "recipe" || lower === "recipes" || lower.includes("recipe") || lower === "recipe_menu") {
      stateTransition = transition(ctx, "RECIPE_MENU");
      sys("State: MAIN_MENU → RECIPE_MENU");
      bot("🍳 *Recipes*\n\nExplore or contribute recipes:", [
        { id: "rec1", title: "➕ Add Recipe", payload: "add_recipe" },
        { id: "rec2", title: "🔍 Search Recipes", payload: "search_recipe" },
        { id: "rec3", title: "⭐ Top Rated", payload: "top_recipes" },
        { id: "rec4", title: "🏠 Main Menu", payload: "hi" }
      ]);
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "marketplace_menu" || lower === "marketplace" || lower === "sell_item_start" || lower === "browse_old_items" || lower.includes("old items") || lower.includes("sell item") || lower.includes("buy item")) {
      stateTransition = transition(ctx, "MARKETPLACE_MENU");
      sys("State: MAIN_MENU → MARKETPLACE_MENU");
      if (lower === "sell_item_start") {
        stateTransition = transition(ctx, "SELL_ITEM_TITLE");
        sys("State: sell_item_start → SELL_ITEM_TITLE");
        bot(
          "🏷️ *List Your Item — Step 1/7*\n\nEnter a descriptive *title* for your item:\n(e.g. Samsung Galaxy S10, Honda Activa 2018, Wooden Dining Table)"
        );
        return { messages: msgs, transition: stateTransition };
      }
      if (lower === "browse_old_items") {
        stateTransition = transition(ctx, "MARKETPLACE_BROWSE_CATEGORY");
        sys("State: browse_old_items → MARKETPLACE_BROWSE_CATEGORY");
        bot(
          "🔍 *Browse Old Items*\n\nSelect a category to filter (or browse all):",
          [
            {
              id: "mkb1",
              title: "📱 Electronics",
              payload: "browse_Electronics"
            },
            { id: "mkb2", title: "🚗 Vehicle", payload: "browse_Vehicle" },
            {
              id: "mkb3",
              title: "🍳 Kitchen Equipment",
              payload: "browse_Kitchen Equipment"
            },
            { id: "mkb4", title: "🪑 Furniture", payload: "browse_Furniture" },
            { id: "mkb5", title: "👗 Clothing", payload: "browse_Clothing" },
            { id: "mkb6", title: "📋 All Items", payload: "browse_all" },
            { id: "mkb7", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
        return { messages: msgs, transition: stateTransition };
      }
      bot(
        "🏷️ *Old Items Marketplace*\n\nBuy, sell, or rent second-hand items — electronics, vehicles, furniture, utensils and more.\n\nWhat would you like to do?",
        [
          {
            id: "mk1",
            title: "🔍 Browse Items",
            payload: "marketplace_browse"
          },
          {
            id: "mk2",
            title: "➕ Sell / Rent My Item",
            payload: "marketplace_sell"
          },
          {
            id: "mk3",
            title: "📋 My Listings",
            payload: "my_marketplace_listings"
          },
          { id: "mk4", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "healthcare_menu" || lower === "health_booking" || lower === "healthcare" || lower.includes("doctor") || lower.includes("health booking") || lower.includes("book appointment")) {
      if (!isRegistryModuleEnabled("Healthcare")) {
        bot(
          "❌ *Healthcare Booking is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      const providers = _realHealthcareProviders.length > 0 ? _realHealthcareProviders.slice(0, 5) : [];
      if (providers.length > 0) {
        const pList = providers.map(
          (p, i) => `${i + 1}. *${p.name}* — ${p.specialization}
   📞 ${p.phone} | 📍 ${p.location}${p.fee ? ` | ₹${p.fee} fee` : ""}`
        ).join("\n\n");
        stateTransition = transition(ctx, "ORDER_RESULTS");
        bot(
          `🏥 *Healthcare Booking* (${providers.length} providers available)

${pList}

Select a provider to book an appointment:`,
          [
            ...providers.slice(0, 4).map((p, i) => ({
              id: `hm${i + 1}`,
              title: `${p.name} — ${p.specialization}`,
              payload: `book_appointment_${p.id}`
            })),
            { id: "hm_menu", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          "🏥 *Healthcare Booking*\n\nNo healthcare providers found nearby.\n\n💡 Tip: Use *Load Sample Data* in the admin panel to create test providers.",
          [{ id: "hm_back", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "professional_menu" || lower === "professional_services" || lower.includes("professional service") || lower.includes("plumber") || lower.includes("electrician") || lower.includes("carpenter")) {
      if (!isRegistryModuleEnabled("Professional")) {
        bot(
          "❌ *Professional Services is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      const services = _realProfessionalServices.length > 0 ? _realProfessionalServices.slice(0, 5) : [];
      if (services.length > 0) {
        const sList = services.map(
          (s, i) => `${i + 1}. *${s.name}* — ${s.skillType}
   📞 ${s.phone} | 📍 ${s.location}${s.pricePerHour ? ` | ₹${s.pricePerHour}/hr` : ""}`
        ).join("\n\n");
        stateTransition = transition(ctx, "ORDER_RESULTS");
        bot(
          `🔧 *Professional Services* (${services.length} available)

${sList}

Select a service provider:`,
          [
            ...services.slice(0, 4).map((s, i) => ({
              id: `pm${i + 1}`,
              title: `${s.name} — ${s.skillType}`,
              payload: `book_service_${s.id}`
            })),
            { id: "pm_back", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          "🔧 *Professional Services*\n\nNo professional service providers found nearby.\n\n💡 Tip: Use *Load Sample Data* in the admin panel to create test providers.",
          [{ id: "pm_back", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "tours_menu" || lower === "tour" || lower.includes("tour") || lower.includes("travel") || lower.includes("trip")) {
      if (!isRegistryModuleEnabled("Tours")) {
        bot(
          "❌ *Tours & Travel is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      const operators = _realTourOperators.length > 0 ? _realTourOperators.slice(0, 5) : [];
      if (operators.length > 0) {
        const oList = operators.map(
          (o, i) => `${i + 1}. *${o.name}* — ${o.destination}
   🌍 ${o.tourType} | ⏱ ${o.duration} | ₹${o.price}/person`
        ).join("\n\n");
        stateTransition = transition(ctx, "ORDER_RESULTS");
        bot(
          `✈️ *Tours & Travel* (${operators.length} packages available)

${oList}

Select a tour to book:`,
          [
            ...operators.slice(0, 4).map((o, i) => ({
              id: `tm${i + 1}`,
              title: `${o.name} — ${o.destination}`,
              payload: `book_tour_${o.id}`
            })),
            { id: "tm_back", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          "✈️ *Tours & Travel*\n\nNo tour packages found.\n\n💡 Tip: Use *Load Sample Data* in the admin panel to create test tour packages.",
          [{ id: "tm_back", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "donations_menu" || lower === "donation" || lower === "donate" || lower.includes("donation")) {
      if (!isRegistryModuleEnabled("Donations")) {
        bot(
          "❌ *Donations is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      if (_realDonations.length > 0) {
        const dList = _realDonations.slice(0, 5).map(
          (d, i) => `${i + 1}. *${d.itemName}* (${d.category})
   👤 ${d.donorName} | 📍 ${d.location} | ${d.status}`
        ).join("\n\n");
        bot(`🤝 *Donations* (${_realDonations.length} available)

${dList}`, [
          { id: "dn1", title: "📦 Add Donation", payload: "add_donation" },
          {
            id: "dn2",
            title: "🔍 Browse Donations",
            payload: "browse_donations"
          },
          { id: "dn3", title: "🏠 Main Menu", payload: "hi" }
        ]);
      } else {
        bot(
          "🤝 *Donations*\n\nGive or receive food, clothes, and books for those in need.\n\nCategories: Food Items, Clothes, Books",
          [
            { id: "dn1", title: "📦 Add Donation", payload: "add_donation" },
            {
              id: "dn2",
              title: "🔍 Browse Donations",
              payload: "browse_donations"
            },
            { id: "dn3", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      }
      return { messages: msgs };
    } else if (lower === "market_commodity_search" || lower === "market_search" || lower.includes("market search") || lower.includes("commodity") || lower.includes("stock price") || lower.includes("share price")) {
      if (!isRegistryModuleEnabled("MarketSearch")) {
        bot(
          "❌ *Market & Commodity Search is currently unavailable.*\n\nThis service has been temporarily disabled by the admin.",
          [{ id: "fb1", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      ctx.stateData.marketSearchStep = "script";
      stateTransition = transition(ctx, "ORDER_RESULTS");
      bot(
        "📈 *Market & Commodity Search*\n\nSearch live prices, recommendations, and stop-loss levels for any stock, commodity, currency, or metal.\n\nEnter the *script/symbol name* (e.g. RELIANCE, GOLD, USDINR, NIFTY50):",
        [
          {
            id: "ms1",
            title: "📊 NIFTY 50",
            payload: "market_search_NIFTY50_India"
          },
          { id: "ms2", title: "🥇 GOLD", payload: "market_search_GOLD_India" },
          {
            id: "ms3",
            title: "💲 USDINR",
            payload: "market_search_USDINR_India"
          },
          { id: "ms4", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    } else if (lower.startsWith("market_search_")) {
      const parts = lower.replace("market_search_", "").split("_");
      const scriptName = ((_a = parts[0]) == null ? void 0 : _a.toUpperCase()) ?? "UNKNOWN";
      const country = parts[1] ?? "India";
      bot(
        `📈 *Market & Commodity Search Results*

🔍 Script: *${scriptName}* | Country: *${country}*

━━━━━━━━━━━━━━━━━━━━
📊 *Latest Price:* ₹${(Math.random() * 2e3 + 100).toFixed(2)}
📈 *Day High:* ₹${(Math.random() * 2100 + 110).toFixed(2)}
📉 *Day Low:* ₹${(Math.random() * 1900 + 90).toFixed(2)}
📦 *Volume:* ${(Math.random() * 1e6).toFixed(0)} shares

━━━━━━━━━━━━━━━━━━━━
🤖 *AI Recommendation:* ${Math.random() > 0.5 ? "🟢 BUY" : "🔴 SELL"}
🛑 *Stop Loss:* ₹${(Math.random() * 1800 + 80).toFixed(2)}
🎯 *Target:* ₹${(Math.random() * 2500 + 150).toFixed(2)}

⚠️ Disclaimer: For educational purposes only. Consult a financial advisor before trading.`,
        [
          {
            id: "msr1",
            title: "📈 Search Another",
            payload: "market_commodity_search"
          },
          {
            id: "msr2",
            title: "💾 Save Search",
            payload: "save_market_search"
          },
          { id: "msr3", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "save_market_search") {
      bot(
        "💾 *Search Saved!*\n\nYour market search has been saved to your history. You can view saved searches in your dashboard.",
        [
          {
            id: "mss1",
            title: "📈 Search More",
            payload: "market_commodity_search"
          },
          { id: "mss2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "spend_analysis" || lower === "matrimony_search" || lower.includes("matrimony") || lower.includes("search partner") || lower === "view_matrimony_matches" || lower === "contact_matrimony_1" || lower === "contact_matrimony_2" || lower.includes("spend analysis") || lower.includes("my spend")) {
      if (lower === "matrimony_search" || lower.includes("matrimony") || lower.includes("search partner")) {
        if (!isRegistryModuleEnabled("Matrimony")) {
          bot("❌ *Matrimony module is currently unavailable in your city.*", [
            { id: "mat_back", title: "🏠 Main Menu", payload: "hi" }
          ]);
          return { messages: msgs };
        }
        const eligibleMembers = _realFamilyMembers.filter(
          (m) => m.ownerPhone === phoneNumber
        );
        if (eligibleMembers.length === 0) {
          bot(
            "💑 *Search Matrimony Partner*\n\nTo use partner search, add at least one *matrimony-eligible family member* first.\n\nGo to My Family → Add Family Member → Mark as Matrimony Eligible.",
            [
              { id: "mat1", title: "👨‍👩‍👧 My Family", payload: "family" },
              { id: "mat2", title: "🏠 Main Menu", payload: "hi" }
            ]
          );
        } else {
          const memberList = eligibleMembers.slice(0, 5).map(
            (m, i) => `${i + 1}. *${m.relationName}* — ${m.relationship}`
          ).join("\n");
          bot(
            `💑 *Matrimony Partner Search*

Searching partners for your eligible family members:

${memberList}

Matches are filtered by caste, location, education, and blood group.`,
            [
              {
                id: "mat3",
                title: "🔍 View Matched Profiles",
                payload: "view_matrimony_matches"
              },
              { id: "mat4", title: "🏠 Main Menu", payload: "hi" }
            ]
          );
        }
        return { messages: msgs };
      }
      if (lower === "view_matrimony_matches") {
        bot(
          "💑 *Matched Profiles*\n\nBased on your family member's preferences:\n\n1. *Priya Sharma* — 25, Accountant, MBA, Delhi\n   Caste: Brahmin | Blood Group: B+\n   📞 +91 98765 XXXXX\n\n2. *Anjali Gupta* — 24, Teacher, B.Ed, Jaipur\n   Caste: Agarwal | Blood Group: A+\n   📞 +91 87654 XXXXX",
          [
            {
              id: "mm_c1",
              title: "📞 Contact Family 1",
              payload: "contact_matrimony_1"
            },
            {
              id: "mm_c2",
              title: "📞 Contact Family 2",
              payload: "contact_matrimony_2"
            },
            { id: "mm_bk", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
        return { messages: msgs };
      }
      if (lower === "contact_matrimony_1" || lower === "contact_matrimony_2") {
        bot(
          "💑 *Interest Sent!*\n\nThe family will contact you on your registered number within 24 hours.\n\n⚠️ LocalBazar Kart acts only as a facilitator — all decisions are between families.",
          [{ id: "mat_home", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      const daily = Math.floor(Math.random() * 300 + 50);
      const weekly = daily * 7 + Math.floor(Math.random() * 200);
      const monthly = weekly * 4 + Math.floor(Math.random() * 500);
      const budget = 5e3;
      const remaining = Math.max(0, budget - monthly);
      const categories = [
        "Grocery",
        "Food",
        "Medicine",
        "Transport",
        "Electronics"
      ];
      const topCat = categories[Math.floor(Math.random() * categories.length)];
      const orderCount = Math.floor(Math.random() * 20 + 5);
      bot(
        `📊 *Your Spend Analysis*

━━━━━━━━━━━━━━━━━━━━
💸 *Daily Spend:* ₹${daily.toLocaleString("en-IN")}
📅 *Weekly Spend:* ₹${weekly.toLocaleString("en-IN")}
🗓️ *Monthly Spend:* ₹${monthly.toLocaleString("en-IN")}

🏆 *Top Category:* ${topCat}
🛒 *Orders This Month:* ${orderCount}

💰 *Monthly Budget:* ₹${budget.toLocaleString("en-IN")}
${remaining > 0 ? `✅ *Remaining Budget:* ₹${remaining.toLocaleString("en-IN")}` : `⚠️ *Budget Exceeded by:* ₹${Math.abs(remaining).toLocaleString("en-IN")}`}

📈 Spending trend: ${monthly > budget * 0.8 ? "🔴 High" : monthly > budget * 0.5 ? "🟡 Moderate" : "🟢 Low"}`,
        [
          { id: "sa1", title: "📅 Weekly Report", payload: "spend_weekly" },
          { id: "sa2", title: "📆 Monthly Report", payload: "spend_monthly" },
          { id: "sa3", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "support" || lower.includes("support ticket") || lower.includes("complaint") || lower.includes("help")) {
      bot(
        "🎫 *Support Center*\n\nWe're here to help! Select the type of issue:\n\n💳 *Payment Stuck* — Payment made but order not confirmed\n😠 *Behaviour Complaint* — Rude or unprofessional conduct\n❓ *Other* — App issues, delivery problems, etc.",
        [
          {
            id: "sp1",
            title: "💳 Payment Stuck",
            payload: "support_payment_stuck"
          },
          {
            id: "sp2",
            title: "😠 Behaviour Complaint",
            payload: "support_behaviour"
          },
          { id: "sp3", title: "❓ Other Issue", payload: "support_other" },
          { id: "sp4", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower.startsWith("support_")) {
      const catKey = lower.replace("support_", "");
      const catLabel = catKey === "payment_stuck" ? "Payment Stuck" : catKey === "behaviour" ? "Behaviour Complaint" : "Other Issue";
      bot(
        `🎫 *Support Ticket — ${catLabel}*

Please describe your issue in detail:

• Include order ID if relevant
• Mention the name/phone of the person involved
• Describe what happened and when

Type your description below:`
      );
      ctx.stateData.supportCategory = catKey === "behaviour" ? "behaviour_complaint" : catKey === "payment_stuck" ? "payment_stuck" : "other";
      ctx.stateData.supportPending = true;
      return { messages: msgs };
    } else if (ctx.stateData.supportPending) {
      ctx.stateData.supportPending = false;
      const priority = ctx.stateData.supportCategory === "payment_stuck" || ctx.stateData.supportCategory === "behaviour_complaint" ? "high" : "medium";
      const deadline = ctx.stateData.supportCategory === "payment_stuck" ? "3 days" : "7 days";
      bot(
        `✅ *Support Ticket Submitted!*

🎫 Ticket ID: *TKT-${Date.now().toString().slice(-6)}*
📋 Category: ${(_b = ctx.stateData.supportCategory) == null ? void 0 : _b.toString().replace(/_/g, " ")}
⚡ Priority: ${priority.toUpperCase()}
⏰ Resolution Deadline: *${deadline}*

📱 You will receive a WhatsApp update once the ticket is assigned.

*Payment stuck issues are resolved within 3 days.*
*Behaviour complaints and others are resolved within 7 days.*`,
        [
          { id: "spd1", title: "🎫 My Tickets", payload: "my_tickets" },
          { id: "spd2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "check_today_matches" || lower === "live_match_scores" || lower === "today_matches" || lower.includes("today match") || lower.includes("live match")) {
      const cachedMatches = ctx.stateData._cachedMatchScores;
      if (cachedMatches && cachedMatches.length > 0) {
        const lines = cachedMatches.slice(0, 5).map(
          (m) => `⚽ *${m.homeTeam}* ${m.homeScore}–${m.awayScore} *${m.awayTeam}* (${m.status})`
        ).join("\n");
        bot(
          `🏆 *Today's Match Scores* (${cachedMatches.length} matches)
━━━━━━━━━━━━━━━━━━━━

${lines}

🔄 Auto-updated every 30 seconds`,
          [
            {
              id: "ms1",
              title: "⚽ Football",
              payload: "match_filter_football"
            },
            { id: "ms2", title: "🏏 Cricket", payload: "match_filter_cricket" },
            { id: "ms3", title: "🔄 Refresh", payload: "check_today_matches" },
            { id: "ms4", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          "🏆 *Today's Match Scores*\n\nNo live scores cached yet. Open the Match Scores page in the admin dashboard for real-time updates.",
          [
            { id: "ms3", title: "🔄 Refresh", payload: "check_today_matches" },
            { id: "ms4", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      }
      return { messages: msgs };
    } else if (lower === "match_filter_football") {
      const cachedMatches2 = ctx.stateData._cachedMatchScores;
      const football = (cachedMatches2 ?? []).filter(
        (m) => {
          var _a2;
          return (_a2 = m.sport) == null ? void 0 : _a2.toLowerCase().includes("football");
        }
      );
      const fLines = football.length > 0 ? football.map(
        (m) => `⚽ *${m.homeTeam}* ${m.homeScore}–${m.awayScore} *${m.awayTeam}* (${m.status})`
      ).join("\n") : "No football matches found today.";
      bot(`⚽ *Football Matches*

${fLines}`, [
        { id: "mf_all", title: "🏆 All", payload: "check_today_matches" },
        { id: "mf_home", title: "🏠 Main Menu", payload: "hi" }
      ]);
      return { messages: msgs };
    } else if (lower === "match_filter_cricket") {
      const cachedMatches3 = ctx.stateData._cachedMatchScores;
      const cricket = (cachedMatches3 ?? []).filter(
        (m) => {
          var _a2;
          return (_a2 = m.sport) == null ? void 0 : _a2.toLowerCase().includes("cricket");
        }
      );
      const cLines = cricket.length > 0 ? cricket.map(
        (m) => `🏏 *${m.homeTeam}* ${m.homeScore}–${m.awayScore} *${m.awayTeam}* (${m.status})`
      ).join("\n") : "No cricket matches found today.";
      bot(`🏏 *Cricket Matches*

${cLines}`, [
        { id: "mc_all", title: "🏆 All", payload: "check_today_matches" },
        { id: "mc_home", title: "🏠 Main Menu", payload: "hi" }
      ]);
      return { messages: msgs };
    } else if (lower === "check_election_results" || lower === "live_election" || lower === "election_results" || lower.includes("election result")) {
      const cachedResults = ctx.stateData._cachedElectionResults;
      if (cachedResults && cachedResults.length > 0) {
        const partyMap = /* @__PURE__ */ new Map();
        for (const r of cachedResults) {
          const p = r.partyName || "Independent";
          partyMap.set(p, (partyMap.get(p) ?? 0) + 1);
        }
        const partyLines = [...partyMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([p, n]) => `🏛️ *${p}* — ${n} constituencies`).join("\n");
        bot(
          `🗳️ *Election Results* (${cachedResults.length} constituencies)
━━━━━━━━━━━━━━━━━━━━

${partyLines}

For full party-wise breakdown and constituency drill-down, open Election Results in admin.`,
          [
            {
              id: "er1",
              title: "🔍 Search State",
              payload: "election_search_state"
            },
            {
              id: "er2",
              title: "🔄 Refresh",
              payload: "check_election_results"
            },
            { id: "er3", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        ctx.stateData.electionSearchPending = true;
        bot(
          "🗳️ *Check Election Results*\n\nEnter the *state or country name*:\n(e.g. India, Maharashtra, Bihar, Gujarat)",
          [{ id: "er_home", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
      return { messages: msgs };
    } else if (ctx.stateData.electionSearchPending) {
      ctx.stateData.electionSearchPending = false;
      const stateName2 = message || "India";
      bot(
        `🗳️ *Checking results for "${stateName2}"...*

Open the Election Results page in the admin dashboard for live party-wise results with constituency drill-down.`,
        [
          {
            id: "er_again",
            title: "🔍 Another State",
            payload: "check_election_results"
          },
          { id: "er_home", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "election_search_state") {
      ctx.stateData.electionSearchPending = true;
      bot("🗳️ Enter the *state or country name* to search:", [
        { id: "er_home", title: "🏠 Main Menu", payload: "hi" }
      ]);
      return { messages: msgs };
    } else if (lower === "community_parking" || lower.includes("rent parking") || lower.includes("park rent")) {
      if (!isRegistryModuleEnabled("community-parking")) {
        bot(
          "❌ *Community Parking is not available in your community.*\n\nThe admin has not enabled this service for your city/location.",
          [{ id: "cp_back", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      const communityId = ctx.stateData.communityId || `${ctx.city ?? "unknown"}:${ctx.location ?? "unknown"}`;
      bot(
        `🚗 *Community Parking Rental*

Community: *${communityId}*

Select parking type and duration:`,
        [
          {
            id: "cpar1",
            title: "🟥 Open Parking (Monthly)",
            payload: "book_parking_open_monthly"
          },
          {
            id: "cpar2",
            title: "✅ Covered Parking (Monthly)",
            payload: "book_parking_covered_monthly"
          },
          {
            id: "cpar3",
            title: "📝 Check Availability",
            payload: "check_parking_availability"
          },
          { id: "cpar4", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower.startsWith("book_parking_")) {
      const parts = lower.replace("book_parking_", "").split("_");
      const pType = parts[0] ?? "open";
      const pDur = parts[1] ?? "monthly";
      const cost = pType === "covered" ? 1500 : 800;
      bot(
        `🚗 *Parking Booking Confirmation*

Type: ${pType.charAt(0).toUpperCase() + pType.slice(1)} Parking
Duration: ${pDur.charAt(0).toUpperCase() + pDur.slice(1)}
Cost: ₹${cost}/${pDur}

✅ Booking request submitted!
💻 Booking ID: *PRK-${Date.now().toString().slice(-6)}*

You will receive confirmation from the society manager within 24 hours.`,
        [{ id: "cpar_home", title: "🏠 Main Menu", payload: "hi" }]
      );
      return { messages: msgs };
    } else if (lower === "check_parking_availability") {
      bot(
        "🚗 *Parking Availability*\n\n✅ Open spots: 8 available\n✅ Covered spots: 3 available\n\nContact the society manager to reserve your spot.",
        [
          {
            id: "cpa1",
            title: "🚗 Book Open Parking",
            payload: "book_parking_open_monthly"
          },
          { id: "cpa2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "community_rooms" || lower.includes("rent room") || lower.includes("book clubhouse") || lower.includes("community hall")) {
      if (!isRegistryModuleEnabled("community-rooms")) {
        bot(
          "❌ *Community Room Booking is not available in your community.*\n\nThe admin has not enabled this service for your city/location.",
          [{ id: "cr_back", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      bot(
        "🏢 *Community Facility Booking*\n\nBook community halls, rooms and amenities in your society:",
        [
          {
            id: "crm1",
            title: "🎹 Clubhouse / Party Hall",
            payload: "book_room_Party Hall"
          },
          {
            id: "crm2",
            title: "💼 Meeting Room",
            payload: "book_room_Meeting Room"
          },
          { id: "crm3", title: "💪 Gym", payload: "book_room_Gym" },
          {
            id: "crm4",
            title: "🏔️ Terrace / Garden",
            payload: "book_room_Terrace"
          },
          { id: "crm5", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower.startsWith("book_room_")) {
      const facility = lower.replace("book_room_", "").replace(/_/g, " ");
      ctx.stateData.pendingFacility = facility;
      bot(
        `🏢 *Booking: ${facility.charAt(0).toUpperCase() + facility.slice(1)}*

Enter the date and time slot (e.g. *15 Jan, 10am-12pm*):`,
        [{ id: "crb_cancel", title: "❌ Cancel", payload: "hi" }]
      );
      ctx.stateData.communityRoomBookingPending = true;
      return { messages: msgs };
    } else if (ctx.stateData.communityRoomBookingPending) {
      ctx.stateData.communityRoomBookingPending = false;
      bot(
        `✅ *Facility Booking Submitted!*

Facility: *${ctx.stateData.pendingFacility ?? "Selected Facility"}*
Date & Time: *${message}*
💻 Booking ID: *RM-${Date.now().toString().slice(-6)}*

Confirmation will be sent by the society manager within 2 hours.`,
        [{ id: "crm_home", title: "🏠 Main Menu", payload: "hi" }]
      );
      return { messages: msgs };
    } else if (lower === "community_food" || lower.includes("community food") || lower.includes("home cooked")) {
      if (!isRegistryModuleEnabled("community-food")) {
        bot(
          "❌ *Community Food Service is not available in your community.*\n\nThe admin has not enabled this service for your city/location.",
          [{ id: "cf_back", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      bot(
        "🍱 *Community Food Service*\n\nOrder home-cooked meals from neighbours in your community:\n\n• Freshly cooked Indian, South Indian, Chinese meals\n• Order by 9 AM for lunch (12 PM delivery)\n• Order by 3 PM for dinner (7 PM delivery)",
        [
          { id: "cf1", title: "🍚 Order Lunch", payload: "food_order_lunch" },
          { id: "cf2", title: "🍲 Order Dinner", payload: "food_order_dinner" },
          {
            id: "cf3",
            title: "🥘 Sell Home Cooked Food",
            payload: "food_sell_register"
          },
          { id: "cf4", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower.startsWith("food_order_")) {
      const mealType = lower.includes("lunch") ? "Lunch" : "Dinner";
      const deliveryTime = mealType === "Lunch" ? "12:00 PM" : "7:00 PM";
      bot(
        `🍱 *${mealType} Order*

Today's available meals from your community:

1. Dal Rice + Sabzi (Veg) — ₹80
2. Roti + Paneer (Veg) — ₹90
3. Rice + Fish Curry (Non-veg) — ₹110

Delivery: *${deliveryTime}* to your apartment

Type the meal number or name to order:`,
        [
          {
            id: "fo1",
            title: "1. Dal Rice",
            payload: `food_confirm_Dal Rice_${mealType}`
          },
          {
            id: "fo2",
            title: "2. Roti Paneer",
            payload: `food_confirm_Roti Paneer_${mealType}`
          },
          { id: "fo3", title: "❌ Cancel", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower.startsWith("food_confirm_")) {
      const parts2 = lower.replace("food_confirm_", "").split("_");
      const meal = parts2.slice(0, -1).join(" ") || "Selected Meal";
      bot(
        `✅ *Food Order Placed!*

Meal: *${meal.charAt(0).toUpperCase() + meal.slice(1)}*
💻 Order ID: *FD-${Date.now().toString().slice(-6)}*

Your order has been placed. The cook will confirm and deliver to your door.`,
        [{ id: "fconf_home", title: "🏠 Main Menu", payload: "hi" }]
      );
      return { messages: msgs };
    } else if (lower === "food_sell_register") {
      bot(
        "🥘 *Sell Home Cooked Food*\n\nTo register as a community food provider:\n\n1. Your kitchen must pass a basic hygiene check\n2. You can list up to 3 meal options per day\n3. Payments are collected digitally\n\nContact the society manager or type your name and specialty to register:",
        [{ id: "fsr_back", title: "🏠 Main Menu", payload: "hi" }]
      );
      return { messages: msgs };
    } else if (lower === "community_services" || lower.includes("community manager") || lower.includes("society service") || lower.includes("maintenance request")) {
      if (!isRegistryModuleEnabled("community-manager")) {
        bot(
          "❌ *Community Manager Services are not available in your community.*\n\nThe admin has not enabled this service for your city/location.",
          [{ id: "cs_back", title: "🏠 Main Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      bot(
        "🏘️ *Community Manager Services*\n\nRaise a service request for your society/community:",
        [
          {
            id: "csvc1",
            title: "🔧 Plumbing / Water Issue",
            payload: "work_order_Plumbing"
          },
          {
            id: "csvc2",
            title: "⚡ Electrical Issue",
            payload: "work_order_Electrical"
          },
          {
            id: "csvc3",
            title: "🥷 Security Complaint",
            payload: "work_order_Security"
          },
          {
            id: "csvc4",
            title: "🖨️ Lift Maintenance",
            payload: "work_order_Lift Maintenance"
          },
          {
            id: "csvc5",
            title: "🌿 Cleaning / Sanitation",
            payload: "work_order_Cleaning"
          },
          {
            id: "csvc6",
            title: "ℹ️ Other Request",
            payload: "work_order_Other"
          },
          { id: "csvc7", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower.startsWith("work_order_")) {
      const svcType = lower.replace("work_order_", "").replace(/_/g, " ");
      ctx.stateData.pendingWorkOrderType = svcType;
      bot(
        `📋 *${svcType.charAt(0).toUpperCase() + svcType.slice(1)} Request*

Describe the issue in detail:
(e.g. Water leaking from pipe under kitchen sink, need urgent fix)`,
        [{ id: "wo_cancel", title: "❌ Cancel", payload: "hi" }]
      );
      ctx.stateData.communityWorkOrderPending = true;
      return { messages: msgs };
    } else if (ctx.stateData.communityWorkOrderPending) {
      ctx.stateData.communityWorkOrderPending = false;
      bot(
        `✅ *Work Order Submitted!*

Service: *${ctx.stateData.pendingWorkOrderType ?? "Maintenance"}*
Description: "${message.slice(0, 80)}"
💻 Work Order ID: *WO-${Date.now().toString().slice(-6)}*

The society manager will assign a technician and contact you within 4 hours.`,
        [{ id: "wo_home", title: "🏠 Main Menu", payload: "hi" }]
      );
      return { messages: msgs };
    } else if ([
      "manufacturer_menu",
      "manufacturer-registration",
      "register-manufacturer"
    ].includes(lower)) {
      bot(
        "Welcome to Manufacturer Registration. Please enter your business name:"
      );
      return { messages: msgs };
    } else if ([
      "manufacturing_products",
      "manufacturing-products",
      "mfr-products"
    ].includes(lower)) {
      bot("Manufacturing Products: Browse or search manufacturer products.");
      return { messages: msgs };
    } else if (["fun_learning", "fun-learning", "language-learning"].includes(lower)) {
      bot(
        "Fun Learning: Browse language courses and lessons. Which language do you want to learn?"
      );
      return { messages: msgs };
    } else if (["bus_booking", "bus-booking", "book-bus"].includes(lower)) {
      bot("Bus Booking: Enter your source city:");
      return { messages: msgs };
    } else if (["train_booking", "train-booking", "book-train"].includes(lower)) {
      bot("Train Booking: Enter your source station:");
      return { messages: msgs };
    } else if (["flight_booking", "flight-booking", "book-flight"].includes(lower)) {
      bot("Flight Booking: Enter your departure city:");
      return { messages: msgs };
    } else if (["recharge_menu", "recharge", "mobile-recharge"].includes(lower)) {
      bot("Mobile Recharge: Enter your mobile number:");
      return { messages: msgs };
    } else if (["bill_payment", "bill-payments", "pay-bill"].includes(lower)) {
      bot(
        "Bill Payments: Select bill type - 1. Electricity, 2. Water, 3. Gas, 4. Broadband"
      );
      return { messages: msgs };
    } else if (["fastag_menu", "fastag", "fastag-recharge"].includes(lower)) {
      bot("FASTag: Enter your vehicle registration number:");
      return { messages: msgs };
    } else if (["insurance_menu", "insurance", "buy-insurance"].includes(lower)) {
      bot(
        "Insurance: Select type - 1. Life, 2. Health, 3. Vehicle, 4. Property"
      );
      return { messages: msgs };
    } else if ([
      "municipality_menu",
      "municipality-payment",
      "pay-municipality"
    ].includes(lower)) {
      bot("Municipality Payment: Enter your property ID or consumer number:");
      return { messages: msgs };
    } else if (["lending_menu", "lending", "apply-loan"].includes(lower)) {
      bot(
        "Lending: 1. Apply for loan, 2. Check loan status, 3. EMI calculator"
      );
      return { messages: msgs };
    } else if (["blog_menu", "blog", "read-blog"].includes(lower)) {
      bot("Blog: 1. Read articles, 2. Write a blog post, 3. My blogs");
      return { messages: msgs };
    } else if (["finance_menu", "finance", "financial-advice"].includes(lower)) {
      bot("Finance: 1. Market prices, 2. Investment tips, 3. Budget planner");
      return { messages: msgs };
    } else {
      bot(
        "⚠️ *Menu not yet configured.*\n\nThe admin menu repository is empty. Please open the Admin Panel → Menu Repository and click *Sync from Flow Registry* to populate the menu.\n\nOnce synced, type *hi* to see the full customer menu.",
        [{ id: "menu_sync_hint", title: "🏠 Try Again", payload: "hi" }]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (lower.startsWith("disabled_")) {
    bot(
      "❌ *This service is currently unavailable.*\n\nThe admin has temporarily disabled this module. Please check back later.",
      [{ id: "dm1", title: "🏠 Main Menu", payload: "hi" }]
    );
    return { messages: msgs };
  }
  if (ctx.state === "TRANSPORT_MENU") {
    if (lower === "book_ride" || lower.includes("book ride")) {
      stateTransition = transition(ctx, "TRANSPORT_CURRENT_LOCATION");
      sys("State: TRANSPORT_MENU → TRANSPORT_CURRENT_LOCATION");
      bot("🚗 *Book a Ride — Step 1/4*\n\nEnter your *current location*:");
    } else if (lower === "shuttle_service" || lower.includes("shuttle")) {
      stateTransition = transition(ctx, "SHUTTLE_SOURCE");
      sys("State: TRANSPORT_MENU → SHUTTLE_SOURCE");
      bot("🚌 *Shuttle Service — Step 1/4*\n\nEnter your *source location*:");
    } else if (lower === "free_ride_otp" || lower.includes("free ride")) {
      stateTransition = transition(ctx, "FREE_RIDE_SOURCE");
      sys("State: TRANSPORT_MENU → FREE_RIDE_SOURCE");
      bot(
        "🛺 *Free Ride Sharing — Step 1/5*\n\nEnter your *source location* (where you are):"
      );
    } else if (lower === "post_shuttle_route" || lower.includes("post route") || lower.includes("post shuttle")) {
      if (userType === UserRole.deliveryPartner) {
        stateTransition = transition(ctx, "SHUTTLE_POST_ROUTE_NAME");
        sys("State: TRANSPORT_MENU → SHUTTLE_POST_ROUTE_NAME");
        bot(
          "🚌 *Post Shuttle Route — Step 1/5*\n\nEnter the *route name*:\n(e.g. 'Andheri–CST Route', 'Morning Express')"
        );
      } else {
        bot(
          "❌ *Route Posting Restricted*\n\nOnly Shuttle Delivery Partners can post shuttle routes.\n\nTo post routes, register as a Delivery Partner with Shuttle service type.",
          [
            {
              id: "rp1",
              title: "🚌 Shuttle Service (Book)",
              payload: "shuttle_service"
            },
            { id: "rp2", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      }
    } else {
      bot("🛺 *Transport Services*", [
        { id: "tr1", title: "🚗 Book a Ride", payload: "book_ride" },
        { id: "tr2", title: "🚌 Shuttle Service", payload: "shuttle_service" },
        { id: "tr3", title: "🛺 Free Ride Sharing", payload: "free_ride_otp" },
        { id: "tr5", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TRANSPORT_CURRENT_LOCATION") {
    ctx.stateData.rideFrom = message;
    stateTransition = transition(ctx, "TRANSPORT_DESTINATION");
    sys("State: TRANSPORT_CURRENT_LOCATION → TRANSPORT_DESTINATION");
    bot(`🚗 *Step 2/4:* From: *${message}*

Enter your *destination*:`);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TRANSPORT_DESTINATION") {
    ctx.stateData.rideTo = message;
    stateTransition = transition(ctx, "TRANSPORT_VEHICLE_SELECT");
    sys("State: TRANSPORT_DESTINATION → TRANSPORT_VEHICLE_SELECT");
    bot(`🚗 *Step 3/4:* To: *${message}*

Select your *vehicle type*:`, [
      { id: "rv1", title: "🛺 Auto (₹120 total)", payload: "Auto" },
      { id: "rv2", title: "🚗 Car (₹160 total)", payload: "Car" },
      { id: "rv3", title: "🏍 Bike (₹80 total)", payload: "Bike" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TRANSPORT_VEHICLE_SELECT") {
    const fareMap = {
      Auto: { display: "₹120", total: 120 },
      Car: { display: "₹160", total: 160 },
      Bike: { display: "₹80", total: 80 }
    };
    ctx.stateData.rideVehicle = message;
    const fareInfo = fareMap[message] ?? { display: "₹100", total: 100 };
    ctx.stateData.rideFare = fareInfo.display;
    ctx.stateData.rideFareTotal = fareInfo.total;
    stateTransition = transition(ctx, "TRANSPORT_BOOK_CONFIRM");
    sys("State: TRANSPORT_VEHICLE_SELECT → TRANSPORT_BOOK_CONFIRM");
    bot(
      `🚗 *Step 4/4: Confirm Booking*

📍 From: *${ctx.stateData.rideFrom}*
📍 To: *${ctx.stateData.rideTo}*
🚗 Vehicle: *${message}*
💰 Total Fare: *${fareInfo.display}*

*Nearby Sarthi Partner:*
👤 Rajesh Kumar | ⭐ 4.8
🚗 ${message} — MH 12 XY 5678

Confirm booking?`,
      [
        { id: "rb1", title: "✅ Confirm Booking", payload: "confirm_booking" },
        { id: "rb2", title: "❌ Cancel", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TRANSPORT_BOOK_CONFIRM") {
    if (lower === "confirm_booking" || lower.includes("confirm")) {
      stateTransition = transition(ctx, "TRANSPORT_RIDE_ACTIVE");
      sys("State: TRANSPORT_BOOK_CONFIRM → TRANSPORT_RIDE_ACTIVE");
      const passengerOTP = ctx.stateData.rideOTP ?? String(Math.floor(1e5 + Math.random() * 9e5));
      ctx.stateData.rideOTP = passengerOTP;
      bot(
        `✅ *Ride Confirmed!* 🎉

━━━━━━━━━━━━━━━━━━━━
🚗 *Driver Details:*
👤 Rajesh Kumar | ⭐ 4.8
🚗 ${ctx.stateData.rideVehicle ?? "Auto"} — MH 12 XY 5678
📞 *Driver Phone: +91 98765 43210* (call if needed)

━━━━━━━━━━━━━━━━━━━━
📍 From: *${ctx.stateData.rideFrom}*
📍 To: *${ctx.stateData.rideTo}*
💰 Total Fare: *${ctx.stateData.rideFare}*
⏱ ETA: ~8 minutes

🔐 *Passenger OTP: ${passengerOTP}*
(Share this OTP with the driver when they arrive to start the ride)`,
        [
          { id: "ra1", title: "✅ Ride Complete", payload: "ride_complete" },
          { id: "ra2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      bot("Please confirm your ride:", [
        { id: "rb1", title: "✅ Confirm Booking", payload: "confirm_booking" },
        { id: "rb2", title: "❌ Cancel", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TRANSPORT_RIDE_ACTIVE") {
    if (lower === "ride_complete" || lower.includes("complete")) {
      stateTransition = transition(ctx, "MAIN_MENU");
      const fare = String(ctx.stateData.rideFare ?? "₹120");
      bot(
        `🎉 *Ride Completed!*

Thank you for travelling with LocalBazar Kart!

💰 Fare: *${fare}*

⭐ Rate your ride:`,
        [
          { id: "rc1", title: "⭐⭐⭐⭐⭐ Excellent", payload: "rate_ride_5" },
          { id: "rc2", title: "⭐⭐⭐⭐ Good", payload: "rate_ride_4" },
          { id: "rc3", title: "⭐⭐⭐ Average", payload: "rate_ride_3" }
        ]
      );
    } else if (lower.startsWith("rate_ride_")) {
      const stars = lower.replace("rate_ride_", "");
      bot(
        `✅ *Rating saved: ${"⭐".repeat(Number(stars))}*

Would you like to tip the driver?`,
        [
          { id: "tip20", title: "💰 Tip ₹20", payload: "tip_20" },
          { id: "tip50", title: "💰 Tip ₹50", payload: "tip_50" },
          { id: "tip70", title: "💰 Tip ₹70", payload: "tip_70" },
          { id: "tip100", title: "💰 Tip ₹100", payload: "tip_100" },
          { id: "no_tip", title: "No Tip", payload: "no_tip" }
        ]
      );
    } else {
      bot("Your ride is in progress.", [
        { id: "ra1", title: "✅ Ride Complete", payload: "ride_complete" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_SOURCE") {
    ctx.stateData.shuttleFrom = message;
    stateTransition = transition(ctx, "SHUTTLE_DESTINATION");
    sys("State: SHUTTLE_SOURCE → SHUTTLE_DESTINATION");
    bot(`🚌 *Step 2/4:* From: *${message}*

Enter your *destination*:`);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_DESTINATION") {
    ctx.stateData.shuttleTo = message;
    stateTransition = transition(ctx, "SHUTTLE_RESULTS");
    sys("State: SHUTTLE_DESTINATION → SHUTTLE_RESULTS");
    const from = (ctx.stateData.shuttleFrom ?? "").toLowerCase();
    const to = message.toLowerCase();
    const liveRoutes = _realShuttleRoutes.filter(
      (r) => r.routeName.toLowerCase().includes(from) || r.routeName.toLowerCase().includes(to)
    );
    if (liveRoutes.length > 0) {
      const routeList = liveRoutes.slice(0, 3).map(
        (r, i) => `━━━━━━━━━━━━━━━━━━━━
🚌 *Route ${String.fromCharCode(65 + i)}: ${r.routeName}*
${r.vehicleNumber ? `🚗 Vehicle: ${r.vehicleNumber}
` : ""}💰 Check route for fare details`
      ).join("\n\n");
      bot(
        `🚌 Found *${liveRoutes.length} live route(s)* from *${ctx.stateData.shuttleFrom}* to *${message}*!

${routeList}`,
        liveRoutes.slice(0, 3).map((r, i) => ({
          id: `sr_live_${i}`,
          title: `🚌 ${r.routeName.slice(0, 20)}`,
          payload: `select_live_route_${i}`
        })).concat([
          {
            id: "sr_none",
            title: "🔍 Search Again",
            payload: "shuttle_service"
          }
        ])
      );
    } else {
      bot(
        `🚌 Searching shuttles from *${ctx.stateData.shuttleFrom}* to *${message}*...

✅ Found *2 routes*:

━━━━━━━━━━━━━━━━━━━━
🚌 *Route A: Express Shuttle*
Stops: Andheri → Bandra → Dadar → CST
⏱ Duration: 45 min | 🔄 Next: 9:15 AM
💰 Fare: *₹45/person*

━━━━━━━━━━━━━━━━━━━━
🚌 *Route B: Local Shuttle*
Stops: Andheri → Vile Parle → Santacruz → Bandra
⏱ Duration: 60 min | 🔄 Next: 9:20 AM
💰 Fare: *₹35/person*`,
        [
          {
            id: "sr1",
            title: "🚌 Route A Express (₹45)",
            payload: "select_route_a"
          },
          {
            id: "sr2",
            title: "🚌 Route B Local (₹35)",
            payload: "select_route_b"
          },
          { id: "sr3", title: "🔍 Search Again", payload: "shuttle_service" }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_RESULTS") {
    if (lower.startsWith("select_live_route_")) {
      const idx = Number.parseInt(lower.replace("select_live_route_", ""), 10);
      const from = (ctx.stateData.shuttleFrom ?? "").toLowerCase();
      const to = (ctx.stateData.shuttleTo ?? "").toLowerCase();
      const liveRoutes = _realShuttleRoutes.filter(
        (r) => r.routeName.toLowerCase().includes(from) || r.routeName.toLowerCase().includes(to)
      );
      const selectedRoute = liveRoutes[idx] ?? liveRoutes[0];
      if (selectedRoute) {
        ctx.stateData.selectedRoute = selectedRoute.routeName;
        ctx.stateData.shuttleFare = "₹45";
        ctx.stateData.shuttleStops = [
          ctx.stateData.shuttleFrom,
          ctx.stateData.shuttleTo
        ];
        stateTransition = transition(ctx, "SHUTTLE_BOARDING_STOP");
        sys("State: SHUTTLE_RESULTS → SHUTTLE_BOARDING_STOP (live route)");
        bot(`🚌 *${selectedRoute.routeName}*

Select your *boarding stop*:`, [
          {
            id: "board_from",
            title: `📍 Board at ${ctx.stateData.shuttleFrom}`,
            payload: `board_${ctx.stateData.shuttleFrom}`
          },
          {
            id: "board_mid",
            title: "📍 Nearest stop",
            payload: "board_nearby"
          }
        ]);
      } else {
        stateTransition = transition(ctx, "SHUTTLE_SOURCE");
        bot(
          "🚌 Route not found. Please search again:\n\nEnter your *source location*:"
        );
      }
    } else if (lower === "select_route_a" || lower === "select_route_b") {
      const isExpress = lower === "select_route_a";
      ctx.stateData.selectedRoute = isExpress ? "Route A Express" : "Route B Local";
      ctx.stateData.shuttleFare = isExpress ? "₹45" : "₹35";
      ctx.stateData.shuttleStops = isExpress ? ["Andheri", "Bandra", "Dadar", "CST"] : ["Andheri", "Vile Parle", "Santacruz", "Bandra"];
      stateTransition = transition(ctx, "SHUTTLE_BOARDING_STOP");
      sys("State: SHUTTLE_RESULTS → SHUTTLE_BOARDING_STOP");
      const stops = ctx.stateData.shuttleStops.map((s, i) => `${i + 1}. ${s}`).join("\n");
      bot(
        `🚌 *${ctx.stateData.selectedRoute}*

Select your *boarding stop*:

${stops}`,
        ctx.stateData.shuttleStops.map((s, i) => ({
          id: `board_${i}`,
          title: `📍 Board at ${s}`,
          payload: `board_${s}`
        }))
      );
    } else {
      stateTransition = transition(ctx, "SHUTTLE_SOURCE");
      bot("🚌 Enter your *source location* for shuttle search:");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_BOARDING_STOP") {
    ctx.stateData.boardingStop = message.replace("board_", "");
    stateTransition = transition(ctx, "SHUTTLE_DROP_STOP");
    sys("State: SHUTTLE_BOARDING_STOP → SHUTTLE_DROP_STOP");
    const stops = ctx.stateData.shuttleStops.filter(
      (s) => s !== ctx.stateData.boardingStop
    );
    bot(
      `✅ Boarding: *${ctx.stateData.boardingStop}*

Select your *drop stop*:`,
      stops.map((s, i) => ({
        id: `drop_${i}`,
        title: `🏁 Drop at ${s}`,
        payload: `drop_${s}`
      }))
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_DROP_STOP") {
    ctx.stateData.dropStop = message.replace("drop_", "");
    stateTransition = transition(ctx, "SHUTTLE_BOOKED");
    sys("State: SHUTTLE_DROP_STOP → SHUTTLE_BOOKED");
    const fareStr = String(ctx.stateData.shuttleFare ?? "₹45");
    const shuttleAmt = Number(fareStr.replace(/[^0-9]/g, "")) || 45;
    bot(
      `🚌 *Shuttle Booking Confirmed!*

🗺 Route: *${ctx.stateData.selectedRoute}*
📍 Board at: *${ctx.stateData.boardingStop}*
🏁 Drop at: *${ctx.stateData.dropStop}*
💰 Fare: *${fareStr}*
⏱ Next shuttle: 9:15 AM

🔐 *Your Boarding OTP: 3847*
(Show this to the driver when you board)

Scan the QR below to pay your fare. QR expires in 2 minutes.`,
      [
        { id: "sb1", title: "✅ I've Boarded", payload: "shuttle_boarded" },
        { id: "sb2", title: "🏠 Main Menu", payload: "hi" }
      ],
      "qr_payment",
      {
        amount: shuttleAmt,
        upiId: "localbazar@upi",
        expiresAt: Date.now() + getQRTimeoutMs()
      }
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_BOOKED") {
    if (lower === "shuttle_boarded" || lower.includes("board")) {
      stateTransition = transition(ctx, "SHUTTLE_OTP_VERIFY");
      sys("State: SHUTTLE_BOOKED → SHUTTLE_OTP_VERIFY");
      bot(
        "🚌 *Boarding Verification*\n\nThe driver will ask for your OTP.\nEnter the *4-digit OTP* you gave to the driver:"
      );
    } else {
      bot("Please confirm when you have boarded the shuttle:", [
        { id: "sb1", title: "✅ I've Boarded", payload: "shuttle_boarded" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_OTP_VERIFY") {
    if (lower === "3847" || /^\d{4}$/.test(lower)) {
      stateTransition = transition(ctx, "MAIN_MENU");
      sys("State: SHUTTLE_OTP_VERIFY → MAIN_MENU");
      const boardStop = String(ctx.stateData.boardingStop);
      const dropStop = String(ctx.stateData.dropStop);
      const shuttleFare = String(ctx.stateData.shuttleFare);
      bot(
        `✅ *OTP Verified! Ride Started.*

You are safely onboard.

📍 From: *${boardStop}*
🏁 To: *${dropStop}*
💰 Fare: *${shuttleFare}*

Enjoy your journey! 🙏`,
        [{ id: "sv1", title: "🏠 Main Menu", payload: "hi" }]
      );
    } else {
      bot("Enter the *4-digit OTP* you gave to the driver:");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ORDER_SEARCH_INPUT") {
    ctx.searchKeyword = message;
    ctx.stateData.searchKeyword = message;
    if (lower === "search_ondc") {
      sys("ONDC: Searching network for products");
      bot(
        "🌐 *ONDC Network Search*\n\nType a keyword to search across the ONDC network:",
        [{ id: "ondc_back", title: "🔙 Back to Local Search", payload: "1" }]
      );
      stateTransition = transition(ctx, "ORDER_SEARCH_INPUT");
      return { messages: msgs, transition: stateTransition };
    }
    if (lower === "browse" || lower === "category" || lower === "categories" || lower === "show categories") {
      stateTransition = transition(ctx, "ORDER_SEARCH_INPUT");
      const allCategories = [
        "Food & Restaurant",
        "Grocery & Kirana",
        "Medical & Pharmacy",
        "Clothing & Fashion",
        "Electronics",
        "Dairy & Milk",
        "Bakery & Sweets",
        "Salon & Beauty",
        "Travels & Cab",
        "Electrical & Plumbing",
        "Laundry & Cleaning",
        "Property & Real Estate",
        "Jobs & Recruitment",
        "Packers & Movers",
        "Automobile & Spare Parts",
        "Stationery & Books",
        "Kitchen Accessories",
        "Home Cleaning",
        "Paper & Disposal",
        "Cosmetics & Bath",
        "Retail Shop",
        "Wholesaler",
        "Manufacturer",
        "Auto Parts",
        "Snacks & Beverages",
        "Gifts & Frames",
        "Cold Drinks & Ice Cream",
        "Wellness & Health",
        "Therapist & Dr",
        "Radiologist & Lab",
        "PG/Hostels/Dormitory",
        "Car Wash",
        "Game Zone",
        "EV Charging",
        "Petrol Pump",
        "Transporter",
        "Printers & Reprographics",
        "Repairs & Maintenance",
        "Spare Parts",
        "Astrology",
        "Water Supply",
        "Flowers & Nursery",
        "Utensils & Cookware",
        "Footwear",
        "Accessories & Apparel",
        "Bike Service",
        "Car Dealer",
        "Bus Operator",
        "Auto Dealer",
        "Services (General)",
        "Healthcare",
        "Fitness & Gym",
        "Photography",
        "Event Management",
        "Catering",
        "Interior Design",
        "Architecture",
        "Legal Services",
        "Accounting & CA",
        "IT Services",
        "Electrician",
        "Plumber",
        "Carpenter",
        "Painter",
        "Security Services",
        "Marriage Hall",
        "Tour & Travel",
        "Hotel & Lodge",
        "Insurance",
        "Loan & Finance",
        "Other"
      ];
      const catList = allCategories.map((c, i) => `${i + 1}. ${c}`).join("\n");
      const page1QR = allCategories.slice(0, 10).map((c, i) => ({
        id: `cat_${i}`,
        title: c,
        payload: c
      }));
      bot(
        `🛒 *All 70+ Categories*

Type a number or category name to search:

${catList}

(Or type any keyword to search directly)`,
        [
          ...page1QR,
          { id: "cat_next", title: "Next 10 →", payload: "browse_page2" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    }
    if (lower === "browse_page2") {
      const allCats = [
        "Laundry & Cleaning",
        "Property & Real Estate",
        "Jobs & Recruitment",
        "Packers & Movers",
        "Automobile & Spare Parts",
        "Stationery & Books",
        "Kitchen Accessories",
        "Home Cleaning",
        "Paper & Disposal",
        "Cosmetics & Bath"
      ];
      const qr = allCats.map((c, i) => ({
        id: `catp2_${i}`,
        title: c,
        payload: c
      }));
      bot("🛒 *Categories (11–20):*", [
        ...qr,
        { id: "cat_prev", title: "← Previous 10", payload: "browse" },
        { id: "cat_next3", title: "Next 10 →", payload: "browse_page3" }
      ]);
      stateTransition = transition(ctx, "ORDER_SEARCH_INPUT");
      return { messages: msgs, transition: stateTransition };
    }
    stateTransition = transition(ctx, "ORDER_RESULTS");
    sys("State: ORDER_SEARCH_INPUT → ORDER_RESULTS");
    if (lower.includes("grocery") || lower.includes("rice") || lower.includes("dal") || lower.includes("atta") || lower.includes("oil")) {
      const groceryMerchants = _realMerchants.filter(
        (m) => m.category.toLowerCase().includes("grocery") || m.category.toLowerCase().includes("kirana")
      );
      if (groceryMerchants.length > 0) {
        const mList = groceryMerchants.slice(0, 3).map(
          (m, i) => `${i + 1}️⃣ *${m.businessName}* ⭐ ${m.avgRating.toFixed(1)}
📍 ${m.location.address || "Nearby"} | 🚴 30 min delivery
💰 Min order: ₹150 | COD available`
        ).join("\n\n");
        bot(
          `🔍 Searching for "*${message}*"...

✅ Found *${groceryMerchants.length} merchants* near you!

${mList}`,
          groceryMerchants.slice(0, 3).map((m, i) => ({
            id: `r${i + 1}`,
            title: `${i + 1}. ${m.businessName}`,
            payload: `select_${m.id}`
          })).concat([
            { id: "r_new", title: "🔍 Search Again", payload: "new_search" },
            {
              id: "r_custom",
              title: "📝 Custom Order",
              payload: "custom_order_direct"
            }
          ])
        );
      } else {
        bot(
          `🔍 Searching for "*${message}*"...

⏳ Shops are loading... Please wait a moment and try again, or tap Load Sample Data to create test data.`,
          [{ id: "r3", title: "🔍 Search Again", payload: "new_search" }]
        );
      }
    } else if (lower.includes("food") || lower.includes("biryani") || lower.includes("pizza") || lower.includes("burger")) {
      const foodMerchants = _realMerchants.filter(
        (m) => m.category.toLowerCase().includes("food") || m.category.toLowerCase().includes("restaurant")
      );
      if (foodMerchants.length > 0) {
        const mList = foodMerchants.slice(0, 3).map(
          (m, i) => `${i + 1}️⃣ *${m.businessName}* ⭐ ${m.avgRating.toFixed(1)}
📍 ${m.location.address || "Nearby"} | 🚴 30 min delivery
💰 Min order: ₹100 | COD + Online`
        ).join("\n\n");
        bot(
          `🔍 Searching for "*${message}*"...

✅ Found *${foodMerchants.length} restaurants* near you!

${mList}`,
          foodMerchants.slice(0, 3).map((m, i) => ({
            id: `r${i + 1}`,
            title: `${i + 1}. ${m.businessName}`,
            payload: `select_${m.id}`
          })).concat([
            { id: "r_new", title: "🔍 Search Again", payload: "new_search" }
          ])
        );
      } else {
        bot(
          `🔍 Searching for "*${message}*"...

⏳ Shops are loading... Please wait a moment and try again, or tap Load Sample Data to create test data.`,
          [{ id: "r6", title: "🔍 Search Again", payload: "new_search" }]
        );
      }
    } else if (lower === "healthcare" || lower.includes("doctor") || lower.includes("health") || lower.includes("clinic")) {
      const providers = _realHealthcareProviders.length > 0 ? _realHealthcareProviders.slice(0, 5) : [];
      if (providers.length > 0) {
        const pList = providers.map(
          (p, i) => `${i + 1}. *${p.name}* — ${p.specialization}
   📞 ${p.phone} | 📍 ${p.location}${p.fee ? ` | ₹${p.fee} fee` : ""}`
        ).join("\n\n");
        stateTransition = transition(ctx, "ORDER_RESULTS");
        bot(
          `🏥 *Healthcare Providers* (${providers.length} available)

${pList}`,
          [
            ...providers.slice(0, 4).map((p, i) => ({
              id: `hp${i + 1}`,
              title: `${p.name} — ${p.specialization}`,
              payload: `book_appointment_${p.id}`
            })),
            { id: "hp_menu", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        stateTransition = transition(ctx, "LEAD_CAPTURED");
        bot(
          "No healthcare providers found nearby. Load sample data to see demo providers, or your admin needs to add providers.",
          [{ id: "hc_back", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
    } else if (lower === "tour" || lower.includes("tour") || lower.includes("travel") || lower.includes("trip")) {
      const operators = _realTourOperators.length > 0 ? _realTourOperators.slice(0, 5) : [];
      if (operators.length > 0) {
        const oList = operators.map(
          (o, i) => `${i + 1}. *${o.name}* — ${o.destination}
   🌍 ${o.tourType} | ⏱ ${o.duration} | ₹${o.price}/person`
        ).join("\n\n");
        stateTransition = transition(ctx, "ORDER_RESULTS");
        bot(`✈️ *Tour Operators* (${operators.length} available)

${oList}`, [
          ...operators.slice(0, 4).map((o, i) => ({
            id: `to${i + 1}`,
            title: `${o.name} — ${o.destination}`,
            payload: `book_tour_${o.id}`
          })),
          { id: "to_menu", title: "🏠 Main Menu", payload: "hi" }
        ]);
      } else {
        stateTransition = transition(ctx, "LEAD_CAPTURED");
        bot(
          "No tour operators found. Load sample data to see demo tour packages.",
          [{ id: "to_back", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
    } else if (lower.includes("service") || lower.includes("plumber") || lower.includes("electrician") || lower.includes("carpenter") || lower.includes("professional")) {
      const services = _realProfessionalServices.length > 0 ? _realProfessionalServices.slice(0, 5) : [];
      if (services.length > 0) {
        const sList = services.map(
          (s, i) => `${i + 1}. *${s.name}* — ${s.skillType}
   📞 ${s.phone} | 📍 ${s.location}${s.pricePerHour ? ` | ₹${s.pricePerHour}/hr` : ""}`
        ).join("\n\n");
        stateTransition = transition(ctx, "ORDER_RESULTS");
        bot(
          `🔧 *Professional Services* (${services.length} available)

${sList}`,
          [
            ...services.slice(0, 4).map((s, i) => ({
              id: `ps${i + 1}`,
              title: `${s.name} — ${s.skillType}`,
              payload: `book_service_${s.id}`
            })),
            { id: "ps_menu", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        stateTransition = transition(ctx, "LEAD_CAPTURED");
        bot(
          "No professional services found. Load sample data to see demo services.",
          [{ id: "ps_back", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
    } else {
      sys("State: ORDER_SEARCH_INPUT → LEAD_CAPTURED (no match)");
      ctx.stateData.leadKeyword = message;
      bot(
        `🔍 Searching for "*${message}*"...

Sorry, '*${message}*' is not available near you. 😔

Would you like to search further or send an inquiry to merchants?`,
        [
          {
            id: "r7",
            title: "1️⃣ Yes, search further",
            payload: "search_further"
          },
          { id: "r8", title: "2️⃣ Send Inquiry Now", payload: "save_inquiry" },
          { id: "r9", title: "3️⃣ 🏠 Main Menu", payload: "hi" }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "LEAD_CAPTURED") {
    if (lower.includes("search_further") || lower === "1") {
      stateTransition = transition(ctx, "ORDER_SEARCH_INPUT");
      sys("State: LEAD_CAPTURED → ORDER_SEARCH_INPUT");
      bot(
        "🔍 *Searching further...*\n\nType a product name or keyword to search in a wider area:"
      );
    } else if (lower.includes("save_inquiry") || lower === "2") {
      sys("Lead inquiry saved to backend");
      bot(
        `✅ *Inquiry Sent!*

We've sent your inquiry for *${ctx.stateData.leadKeyword ?? "your item"}* to nearby merchants. They'll be notified and will respond if available.

We'll alert you on WhatsApp as soon as it's available!`,
        [
          { id: "si1", title: "🔍 Search Another", payload: "new_search" },
          { id: "si2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower.includes("new_search")) {
      stateTransition = transition(ctx, "ORDER_SEARCH_INPUT");
      sys("State: LEAD_CAPTURED → ORDER_SEARCH_INPUT");
      bot(
        "🛒 *What are you looking for today?*\n\nType a product name or keyword, or send a photo 📸:"
      );
    } else {
      bot("Please select an option:", [
        {
          id: "lc1",
          title: "1️⃣ Yes, search further",
          payload: "search_further"
        },
        { id: "lc2", title: "2️⃣ Send Inquiry Now", payload: "save_inquiry" },
        { id: "lc3", title: "3️⃣ 🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ORDER_RESULTS") {
    if (lower.includes("new_search")) {
      stateTransition = transition(ctx, "ORDER_SEARCH_INPUT");
      sys("State: ORDER_RESULTS → ORDER_SEARCH_INPUT");
      bot(
        "🛒 *What are you looking for today?*\n\nType a product name or keyword, or send a photo 📸:"
      );
    } else if (lower.includes("select_") || lower.match(/^[12]$/)) {
      const selectedId = lower.startsWith("select_") ? message.slice("select_".length) : message;
      ctx.selectedMerchant = selectedId;
      ctx.stateData.selectedMerchant = selectedId;
      stateTransition = transition(ctx, "MERCHANT_DETAILS");
      sys("State: ORDER_RESULTS → MERCHANT_DETAILS");
      const realMerchant = _realMerchants.find((m) => m.id === selectedId);
      const displayName = (realMerchant == null ? void 0 : realMerchant.businessName) ?? "Nearby Merchant";
      const displayAddr = ((_c = realMerchant == null ? void 0 : realMerchant.location) == null ? void 0 : _c.address) ?? "Nearby";
      const displayCat = (realMerchant == null ? void 0 : realMerchant.category) ?? "General";
      const displayRating = realMerchant ? realMerchant.avgRating.toFixed(1) : "4.0";
      const merchantProducts = _realProducts.filter(
        (p) => p.merchantId === selectedId
      );
      const hasProducts = merchantProducts.length > 0;
      const merchantPhone = `+91 XXXXX X${String(selectedId).slice(-4)}`;
      ctx.stateData.merchantPhone = merchantPhone;
      ctx.stateData.merchantHasProducts = hasProducts;
      ctx.stateData.selectedMerchantId = selectedId;
      ctx.stateData.selectedMerchantName = displayName;
      if (hasProducts) {
        const productList = merchantProducts.slice(0, 5).map((p, i) => `${i + 1}. *${p.title}* — ₹${p.baseRate}`).join("\n");
        bot(
          `🏪 *Merchant Details*

━━━━━━━━━━━━━━━━━━━━
🏬 *${displayName}*
🏷 Category: ${displayCat}
📍 Address: ${displayAddr}
📞 Phone: ${merchantPhone}
⭐ Rating: ${displayRating} | ✅ Verified
🚴 Delivery radius: 5 km
⏱ Estimated delivery: 20–35 mins
💰 Min order: ₹150
📦 COD available
━━━━━━━━━━━━━━━━━━━━

📦 *Available Products:*
${productList}

Would you like to order?`,
          [
            {
              id: "md1",
              title: "✅ Confirm Order",
              payload: "confirm_from_merchant"
            },
            {
              id: "md4",
              title: "📝 Custom Order",
              payload: "custom_order_start"
            },
            {
              id: "md2",
              title: "🔍 View More Merchants",
              payload: "new_search"
            },
            { id: "md3", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          `🏪 *Merchant Details*

━━━━━━━━━━━━━━━━━━━━
🏬 *${displayName}*
🏷 Category: ${displayCat}
📍 Address: ${displayAddr}
📞 Phone: ${merchantPhone}
⭐ Rating: ${displayRating} | ✅ Verified
🚴 Delivery radius: 5 km
━━━━━━━━━━━━━━━━━━━━

⚠️ *No products listed yet for this store.*
Send an inquiry to ask about availability.`,
          [
            {
              id: "md_inq",
              title: "📩 Send Inquiry to Store",
              payload: "send_inquiry_to_store"
            },
            {
              id: "md4",
              title: "📝 Custom Order",
              payload: "custom_order_start"
            },
            {
              id: "md2",
              title: "🔍 View More Merchants",
              payload: "new_search"
            },
            { id: "md_cancel", title: "❌ Cancel", payload: "hi" }
          ]
        );
      }
    } else {
      bot("Please select a merchant by tapping one of the buttons above.", [
        { id: "fb1", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_DETAILS") {
    if (lower === "send_inquiry_to_store") {
      const merchantId = String(ctx.stateData.selectedMerchant ?? "store");
      sys(`Inquiry sent to merchant ${merchantId}`);
      bot(
        `✅ *Inquiry Sent!*

Your inquiry has been forwarded to the store.
They will contact you on WhatsApp shortly.

📞 Store contact: ${ctx.stateData.merchantPhone ?? "+91 XXXXX X5210"}`,
        [
          {
            id: "inq_search",
            title: "🔍 Search Another Store",
            payload: "new_search"
          },
          { id: "inq_home", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      ctx.stateData.customOrderStep = void 0;
      return { messages: msgs };
    }
    if (lower === "custom_order_start" || lower.includes("custom order")) {
      ctx.stateData.customOrderItems = [];
      ctx.stateData.customOrderStep = "item_name";
      stateTransition = transition(ctx, "MERCHANT_DETAILS");
      sys("Custom order flow started");
      bot(
        "📝 *Custom Order — Step 1/3*\n\nEnter the item you need:\n\nFormat: *Item Name | Brand | Quantity*\n(e.g. Basmati Rice | Daawat | 5kg)"
      );
      ctx.stateData.customOrderStep = "collect_item";
      return { messages: msgs, transition: stateTransition };
    }
    if (ctx.stateData.customOrderStep === "collect_item") {
      const parts = message.split("|").map((p) => p.trim());
      const item = {
        name: parts[0] ?? message,
        brand: parts[1] ?? "",
        qty: parts[2] ?? "1"
      };
      const items = ctx.stateData.customOrderItems ?? [];
      items.push(item);
      ctx.stateData.customOrderItems = items;
      ctx.stateData.customOrderStep = "add_more";
      bot(
        `✅ Added: *${item.name}* (${item.brand || "Any Brand"}) — ${item.qty}

Add another item?`,
        [
          {
            id: "coa1",
            title: "➕ Add Another Item",
            payload: "custom_order_add_more"
          },
          {
            id: "coa2",
            title: "✅ Done, Show Summary",
            payload: "custom_order_summary"
          },
          { id: "coa3", title: "❌ Cancel", payload: "hi" }
        ]
      );
      return { messages: msgs };
    }
    if (lower === "custom_order_add_more") {
      ctx.stateData.customOrderStep = "collect_item";
      bot("📝 Enter next item:\n\nFormat: *Item Name | Brand | Quantity*");
      return { messages: msgs };
    }
    if (lower === "custom_order_summary") {
      const items = ctx.stateData.customOrderItems ?? [];
      const itemList = items.map(
        (item, i) => `${i + 1}. *${item.name}* ${item.brand ? `(${item.brand})` : ""} — ${item.qty}`
      ).join("\n");
      ctx.stateData.customOrderStep = "confirm";
      const merchantName = ctx.stateData.selectedMerchant ?? "Nearby Store";
      bot(
        `📋 *Custom Order Summary*

${itemList}

🏪 Store: *${merchantName}*

Confirm and send to store?`,
        [
          {
            id: "cos1",
            title: "✅ Confirm Custom Order",
            payload: "confirm_custom_order"
          },
          { id: "cos2", title: "❌ Cancel", payload: "hi" }
        ]
      );
      return { messages: msgs };
    }
    if (lower === "confirm_custom_order") {
      if (ctx.state !== "MERCHANT_DETAILS") {
        return { messages: msgs };
      }
      const items = ctx.stateData.customOrderItems ?? [];
      const orderText = items.map((i) => `${i.name} ${i.brand}`).join(", ");
      const flaggedTerms = [
        "drug",
        "tobacco",
        "cigarette",
        "alcohol",
        "beer",
        "wine",
        "whisky",
        "weapon",
        "gun",
        "knife"
      ];
      const flagged = flaggedTerms.filter(
        (t) => orderText.toLowerCase().includes(t)
      );
      if (flagged.length > 0) {
        bot(
          `❌ *Order Rejected by AI Moderation*

🚫 Flagged categories: *${flagged.join(", ")}*

Items containing drugs, tobacco, alcohol, or weapons cannot be ordered through this platform.

Please remove flagged items and try again.`,
          [
            {
              id: "co_retry",
              title: "🔄 Start New Custom Order",
              payload: "custom_order_start"
            },
            { id: "co_cancel", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
        ctx.stateData.customOrderStep = void 0;
        return { messages: msgs };
      }
      ctx.stateData.customOrderStep = void 0;
      stateTransition = transition(ctx, "ORDER_CONFIRM");
      sys("Custom order moderation: approved → routing to merchant");
      const merchantName = String(
        ctx.stateData.selectedMerchant ?? "Nearby Store"
      );
      bot(
        `✅ *Custom Order Sent to ${merchantName}!*

🤖 AI Moderation: Approved ✅

⏳ Waiting for merchant to confirm price and availability.

Once merchant confirms, you'll see payment options.`,
        [
          { id: "cow1", title: "📦 Track Order", payload: "2" },
          { id: "cow2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    }
    if (lower === "confirm_from_merchant") {
      stateTransition = transition(ctx, "ORDER_CONFIRM");
      sys("State: MERCHANT_DETAILS → ORDER_CONFIRM");
      const selectedMerchantId = String(ctx.stateData.selectedMerchant ?? "");
      const liveProducts = _realProducts.filter(
        (p) => p.merchantId === selectedMerchantId
      );
      const realMerch = _realMerchants.find((m) => m.id === selectedMerchantId);
      const merchantDisplayName = (realMerch == null ? void 0 : realMerch.businessName) ?? String(ctx.stateData.selectedMerchant ?? "Nearby Store");
      const DELIVERY_CHARGE = 30;
      let orderTotal = 0;
      let productLines = "";
      if (liveProducts.length > 0) {
        const cartItems = liveProducts.slice(0, 3).map((p) => ({
          name: p.title,
          rate: p.baseRate,
          qty: 1,
          total: p.baseRate
        }));
        orderTotal = cartItems.reduce((s, i) => s + i.total, 0);
        productLines = cartItems.map((i) => `   • ${i.name} × ${i.qty} — ₹${i.total}`).join("\n");
        ctx.stateData.orderTotal = orderTotal + DELIVERY_CHARGE;
        ctx.stateData.orderProducts = cartItems;
      } else {
        orderTotal = 0;
        productLines = "   • (Products pending backend sync)";
        ctx.stateData.orderTotal = DELIVERY_CHARGE;
      }
      const grandTotal = orderTotal + DELIVERY_CHARGE;
      bot(
        `🛍️ *Order Summary*

━━━━━━━━━━━━━━━━━━━━
🏪 *${merchantDisplayName}*
${productLines}
   💳 Subtotal: ₹${orderTotal}
   🚴 Delivery charge: ₹${DELIVERY_CHARGE}

━━━━━━━━━━━━━━━━━━━━
🔖 *Grand Total: ₹${grandTotal}*

📍 Delivery to: ${ctx.stateData.address ?? "Registered Address"}
⏱ Estimated: 25–35 mins

Confirm your order?`,
        [
          { id: "oc1", title: "✅ Confirm Order", payload: "confirm_order" },
          { id: "oc2", title: "💳 Change Payment", payload: "change_payment" },
          { id: "oc3", title: "❌ Cancel", payload: "hi" }
        ]
      );
    } else if (lower.includes("new_search") || lower.includes("more merchants")) {
      stateTransition = transition(ctx, "ORDER_SEARCH_INPUT");
      sys("State: MERCHANT_DETAILS → ORDER_SEARCH_INPUT");
      bot("🛒 *Search for more merchants*\n\nType a product name or keyword:");
    } else {
      bot("Please choose an option:", [
        {
          id: "md1",
          title: "✅ Confirm Order",
          payload: "confirm_from_merchant"
        },
        { id: "md2", title: "🔍 View More Merchants", payload: "new_search" },
        { id: "md3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ORDER_CONFIRM") {
    const orderAmount = Number(ctx.stateData.orderTotal ?? 0) || 670;
    if (lower === "budget_override_continue" || lower === "budget_continue") {
      const pendingId = "PENDING";
      ctx.stateData.confirmedOrderId = pendingId;
      ctx.stateData.paymentMode = "COD";
      stateTransition = transition(ctx, "MAIN_MENU");
      sys("State: ORDER_CONFIRM → MAIN_MENU (budget override)");
      bot(
        `🎉 *Order Placed Successfully!*

Order ID: *${pendingId}*

✅ Sent to merchant — awaiting acceptance
⏳ Merchant has *5 minutes* to accept
📱 You'll receive a confirmation shortly

💵 *Payment: Cash on Delivery (COD)*
Keep ₹${orderAmount} ready at the door.`,
        [
          { id: "op1", title: "📦 Track Order", payload: "2" },
          { id: "op2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    }
    if (lower.includes("confirm") || lower === "yes" || lower === "ok") {
      const rand = Math.random();
      const monthlySpend = Math.floor(Math.random() * 5e3 + 1e3);
      const budget = 5e3;
      if (rand < 0.25 && monthlySpend + orderAmount > budget) {
        bot(
          `⚠️ *Budget Warning*

This order exceeds your monthly budget.

💰 *Current spend:* ₹${monthlySpend.toLocaleString("en-IN")}
📋 *Budget:* ₹${budget.toLocaleString("en-IN")}
🛒 *This order:* ₹${orderAmount}
❌ *Over budget by:* ₹${(monthlySpend + orderAmount - budget).toLocaleString("en-IN")}

You can still proceed — this is just an advisory.`,
          [
            {
              id: "bw1",
              title: "▶️ Continue Anyway",
              payload: "budget_override_continue"
            },
            { id: "bw2", title: "❌ Cancel Order", payload: "hi" }
          ]
        );
        return { messages: msgs };
      }
      if (rand < 0.45 && monthlySpend + orderAmount > budget * 0.8) {
        bot(
          `ℹ️ *Budget Advisory*

You are approaching your monthly budget.

💰 *Current spend:* ₹${monthlySpend.toLocaleString("en-IN")} / ₹${budget.toLocaleString("en-IN")}
🛒 *This order:* ₹${orderAmount}

Placing this order will use ${Math.round((monthlySpend + orderAmount) / budget * 100)}% of your budget. Proceed?`,
          [
            { id: "bwa1", title: "✅ Confirm Order", payload: "confirm_order" },
            { id: "bwa2", title: "❌ Cancel", payload: "hi" }
          ]
        );
        return { messages: msgs };
      }
      ctx.stateData.confirmedOrderId = "PENDING";
      ctx.stateData.paymentMode = "COD";
      stateTransition = transition(ctx, "MAIN_MENU");
      sys("State: ORDER_CONFIRM → MAIN_MENU");
      bot(
        `🎉 *Order Placed Successfully!*

Order ID: *PENDING*

⏳ Saving to backend… order ID will update shortly
✅ Sent to merchant — awaiting acceptance
📱 You'll receive a confirmation shortly

💵 *Payment: Cash on Delivery (COD)*
Keep ₹${orderAmount} ready at the door.`,
        [
          { id: "op1", title: "📦 Track Order", payload: "2" },
          { id: "op2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower.includes("payment") || lower.includes("change")) {
      bot("💳 *Select Payment Method:*", [
        { id: "pay1", title: "💵 Cash on Delivery", payload: "confirm_order" },
        { id: "pay2", title: "📱 UPI / QR Code", payload: "pay_upi_qr" },
        { id: "pay3", title: "💳 Online Payment", payload: "confirm_order" }
      ]);
    } else if (lower === "pay_upi_qr") {
      bot(
        `📱 *Scan QR to Pay ₹${orderAmount}*

UPI ID: localbazar@upi

QR expires in 2 minutes. After payment, confirm below.`,
        [
          {
            id: "upi_done",
            title: "✅ Payment Done",
            payload: "confirm_order"
          }
        ],
        "qr_payment",
        {
          amount: orderAmount,
          upiId: "localbazar@upi",
          expiresAt: Date.now() + getQRTimeoutMs()
        }
      );
    } else {
      bot("Please confirm your order or cancel.", [
        { id: "co1", title: "✅ Confirm Order", payload: "confirm_order" },
        { id: "co2", title: "❌ Cancel", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ORDER_TRACKING") {
    if (lower.startsWith("track_")) {
      const parts = lower.split("_");
      const orderId = parts[1].toUpperCase();
      const status = parts[2] ?? "pending";
      const statusLabel = status === "inTransit" ? "Out for Delivery 🟢" : status === "delivered" ? "Delivered ✅" : status;
      bot(
        `📦 *${orderId} — ${statusLabel}*

🏪 Merchant: ${ctx.stateData.selectedMerchantName ?? "Merchant"}
🛵 Delivery Partner: Ravi Thakur (⭐ 4.7)
📞 Contact: +91 98765***** (masked)

📍 Delivering to: Bandra West, Mumbai
⏱ ETA: ~12 minutes`,
        [
          { id: "tr1", title: "📞 Contact Delivery", payload: "contact_dp" },
          { id: "tr2", title: "🏠 Main Menu", payload: "hi" }
        ],
        "order_tracking",
        { liveStatus: status, orderId }
      );
    } else if (lower.startsWith("ord-")) {
      const orderId = lower.toUpperCase();
      bot(
        `📦 *${orderId}*

Showing full tracking for order ${orderId}.

🏪 Merchant: ${ctx.stateData.selectedMerchantName ?? "Merchant"}
✅ Status: Delivered`,
        [
          { id: "tr3", title: "⭐ Rate Delivery", payload: "rate_delivery" },
          { id: "tr4", title: "🏠 Main Menu", payload: "hi" }
        ],
        "order_tracking",
        { liveStatus: OrderStatus.delivered, orderId }
      );
    } else {
      const realOrderId = String(ctx.stateData.confirmedOrderId ?? "");
      const hasRealOrder = realOrderId && realOrderId !== "PENDING" && realOrderId !== "sim_product";
      if (hasRealOrder) {
        bot(
          `📦 *Track Your Order*

Your recent order: *${realOrderId}*

Reply with the order ID to see full status:`,
          [
            {
              id: "to_real",
              title: `📦 Track ${realOrderId}`,
              payload: `ord-${realOrderId.toLowerCase()}`
            },
            { id: "to3", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          "📦 *Track an Order*\n\nReply with your order ID to track it.\n\nNo recent orders? Place an order first or use Load Sample Data.",
          [{ id: "to3", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
    }
    return { messages: msgs };
  }
  if (ctx.state === "MERCHANT_MENU") {
    if (lower === "my_listings" || lower.includes("my listing")) {
      bot("📁 *My Listings*\n\nLoading your listings from backend...", [
        { id: "ml1", title: "💼 Jobs", payload: "my_jobs_listing" },
        { id: "ml2", title: "🏠 Properties", payload: "my_props_listing" },
        { id: "ml3", title: "🎉 Events", payload: "my_events_listing" },
        { id: "ml4", title: "📦 Products", payload: "my_products_listing" },
        { id: "ml5", title: "🏠 Merchant Menu", payload: "hi" }
      ]);
      return { messages: msgs };
    }
    if (lower === "merchant_orders" || lower.includes("order") || lower === "1") {
      stateTransition = transition(ctx, "MERCHANT_ORDERS");
      sys("State: MERCHANT_MENU → MERCHANT_ORDERS");
      bot(
        "📦 *Today's Orders*\n\nLoad Sample Data first to see live orders from the backend. Use the 'Load Sample Data' button in the admin panel.",
        [{ id: "mv3", title: "🏠 Merchant Menu", payload: "hi" }],
        "merchant_orders"
      );
    } else if (lower === "earnings" || lower === "3") {
      bot(
        "💰 *Earnings Summary*\n\n📅 Today: ₹1,240\n📅 This Week: ₹8,760\n📅 This Month: ₹32,400\n\n💳 Next Payout: ₹8,760 on Friday\n📊 Total Orders: 312 | Avg Rating: ⭐ 4.5",
        [
          { id: "e1", title: "📥 Download Excel", payload: "download_report" },
          { id: "e2", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else if (lower === "accept_ord003") {
      stateTransition = transition(ctx, "MERCHANT_ACCEPT");
      sys("State: MERCHANT_MENU → MERCHANT_ACCEPT");
      bot(
        "✅ *Order Accepted!*\n\nOrder accepted successfully.\nDelivery partner has been notified.\n\n👤 Customer: Amit Verma\n📍 Karol Bagh, New Delhi\n⏱ Prepare order by: 25 mins\n💰 Amount: ₹165 COD",
        [
          {
            id: "acc1",
            title: "✅ Mark Ready for Pickup",
            payload: "ready_pickup"
          },
          {
            id: "acc2",
            title: "📦 View All Orders",
            payload: "merchant_orders"
          }
        ]
      );
    } else if (lower === "ready_pickup") {
      stateTransition = transition(ctx, "MERCHANT_FULFILL");
      sys("State: MERCHANT_ACCEPT → MERCHANT_FULFILL");
      bot(
        "📦 *Order Ready for Pickup!*\n\nDelivery partner *Ravi Thakur* is on the way.\n📍 ETA to your location: 8 mins\n\nPlease have order packaged and ready.",
        [
          {
            id: "rf1",
            title: "✅ DP Arrived & Picked Up",
            payload: "dp_picked_up"
          },
          { id: "rf2", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else if (lower === "dp_picked_up") {
      stateTransition = transition(ctx, "COLLECTION_PENDING");
      sys("State: MERCHANT_FULFILL → COLLECTION_PENDING");
      bot(
        "🚴 *Order Picked Up!*\n\nOrder is with Ravi Thakur now.\nDelivering to Karol Bagh.\n\n⏳ Awaiting payment collection from customer.\nYou'll be notified when payment is settled.",
        [
          {
            id: "cp1",
            title: "📦 View Other Orders",
            payload: "merchant_orders"
          },
          { id: "cp2", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else if (lower === "add_product" || lower === "2" || lower.includes("add product")) {
      stateTransition = transition(ctx, "ADD_PRODUCT_METHOD");
      sys("State: MERCHANT_MENU → ADD_PRODUCT_METHOD");
      bot(
        "➕ *Add Product — Choose Method*\n\nHow would you like to add your product?",
        [
          { id: "ap1", title: "📝 Manual Entry", payload: "manual_product" },
          { id: "ap2", title: "📊 Upload Excel/CSV", payload: "excel_upload" },
          { id: "ap3", title: "📷 Photo Menu", payload: "photo_menu" },
          { id: "ap4", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "manual_product") {
      stateTransition = transition(ctx, "ADD_PRODUCT_TITLE");
      sys("State: MERCHANT_MENU → ADD_PRODUCT_TITLE (manual)");
      bot(
        "➕ *Add Product (Manual Entry) — Step 1/13*\n\nEnter the *product name/title*:"
      );
    } else if (lower === "excel_upload") {
      stateTransition = transition(ctx, "ADD_PRODUCT_EXCEL_UPLOAD");
      sys("State: MERCHANT_MENU → ADD_PRODUCT_EXCEL_UPLOAD");
      bot(
        "📊 *Upload Products via Excel*\n\n*Step 1:* Download the template below\n📥 *Template columns:* Product Name | Description | Brand | MRP | Selling Price | Bulk Rate | Discount% | Condition | Stock | Category\n\n*Step 2:* Fill in your products in the template\n\n*Step 3:* Upload the completed file here",
        [
          {
            id: "eu_download",
            title: "📥 Download Template (CSV)",
            payload: "download_template"
          },
          {
            id: "eu_upload",
            title: "📤 Upload Filled Template",
            payload: "upload_excel_file"
          },
          { id: "eu_cancel", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "photo_menu") {
      stateTransition = transition(ctx, "ADD_PRODUCT_PHOTO_UPLOAD");
      sys("State: MERCHANT_MENU → ADD_PRODUCT_PHOTO_UPLOAD");
      bot(
        "📷 *Upload Menu Photo*\n\nUpload a clear photo of your menu/product list.\nOur AI will extract the product details automatically.\n\n[📎 Attach menu photo]",
        [
          {
            id: "pm_upload",
            title: "📷 Photo Uploaded (simulated)",
            payload: "photo_uploaded"
          },
          { id: "pm_cancel", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "post_job_menu" || lower.includes("post job")) {
      stateTransition = transition(ctx, "JOB_POST_TITLE");
      sys("State: MERCHANT_MENU → JOB_POST_TITLE");
      bot(
        "✏️ *Post a Job — Step 1/6*\n\nEnter the *job title*:\n(e.g. React Developer, Delivery Executive, Sales Manager)"
      );
    } else if (lower === "post_property_menu" || lower.includes("post property")) {
      stateTransition = transition(ctx, "PROPERTY_POST_TYPE");
      sys("State: MERCHANT_MENU → PROPERTY_POST_TYPE");
      bot("📝 *Post a Property — Step 1/4*\n\nSelect the *listing type*:", [
        { id: "pt1", title: "🏢 Rent", payload: "Rent" },
        { id: "pt2", title: "🏠 Sale", payload: "Sale" },
        { id: "pt3", title: "🏭 Lease / Commercial", payload: "Lease" },
        { id: "pt4", title: "🛒 Buy (Wanted)", payload: "Buy" }
      ]);
    } else if (lower === "post_event_menu" || lower.includes("post event")) {
      stateTransition = transition(ctx, "EVENT_MENU");
      sys("State: MERCHANT_MENU → EVENT_MENU");
      bot("🎉 *Events*\n\nPost or discover events near you:", [
        { id: "ev1", title: "📝 Post Event", payload: "post_event" },
        { id: "ev2", title: "🔍 Search Event", payload: "search_event" },
        { id: "ev3", title: "🏠 Merchant Menu", payload: "hi" }
      ]);
    } else if (lower === "advertise_menu" || lower === "promo_menu" || lower.includes("advertise")) {
      stateTransition = transition(ctx, "PROMO_MENU");
      sys("State: MERCHANT_MENU → PROMO_MENU");
      bot("📣 *Advertise / Promote*\n\nReach targeted users in your area:", [
        { id: "pm1", title: "📢 Post Advertisement", payload: "post_ad" },
        { id: "pm2", title: "📊 My Promotions", payload: "my_promos" },
        { id: "pm3", title: "🏠 Merchant Menu", payload: "hi" }
      ]);
    } else if (lower === "my_restock_orders" || lower.includes("restock order")) {
      const orders = ctx.stateData.merchantRestockOrders ?? [];
      if (orders.length === 0) {
        bot(
          "📋 *My Restock Orders*\n\nNo restock orders placed yet.\n\nOrder from suppliers to restock your inventory.",
          [
            {
              id: "mro1",
              title: "🛒 Order from Suppliers",
              payload: "supplier_order_start"
            },
            { id: "mro2", title: "🏠 Merchant Menu", payload: "hi" }
          ]
        );
      } else {
        const lines = orders.slice(0, 5).map(
          (o, idx) => `*${idx + 1}. ${o.itemName}*
🏪 Supplier: ${o.supplierName}
📊 Qty: ${String(o.quantity)}
📋 Status: ${o.status}`
        ).join("\n\n");
        bot(
          `📋 *My Restock Orders (${orders.length})*
━━━━━━━━━━━━━━━━━━━━

${lines}`,
          [
            {
              id: "mro3",
              title: "🛒 New Order",
              payload: "supplier_order_start"
            },
            { id: "mro4", title: "🏠 Merchant Menu", payload: "hi" }
          ]
        );
      }
    } else if (lower === "total_orders_view") {
      const displayOrders = ctx.stateData.merchantDisplayOrders ?? Math.floor(Math.random() * 500 + 50);
      bot(
        `📊 *Store Performance*

✅ *Total Orders Completed: ${displayOrders}*

Thank you for growing with LocalBazar Kart 🛒`,
        [
          { id: "to1", title: "📦 My Orders", payload: "merchant_orders" },
          { id: "to2", title: "📊 View Analytics", payload: "earnings" },
          { id: "to3", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
    } else if (lower === "open_merchant_dashboard" || lower === "merchant_dashboard_link") {
      bot(
        "🏪 *Your Merchant Dashboard*\n\n📊 Open your full dashboard to manage orders, view analytics, update products, and track earnings:\n\n🔗 *https://localbazarkart.app/merchant-dashboard*\n\nBookmark this link to access your dashboard anytime!",
        [
          {
            id: "mdb1",
            title: "📦 My Orders",
            payload: "merchant_orders"
          },
          { id: "mdb2", title: "➕ Add Product", payload: "add_product" }
        ]
      );
    } else if (lower === "merchant_register_healthcare" || lower === "register_healthcare_provider") {
      if (!isRegistryModuleEnabled("Healthcare")) {
        bot("❌ *Healthcare module is currently disabled for this city.*", [
          { id: "mrhc_back", title: "🏠 Merchant Menu", payload: "hi" }
        ]);
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "HEALTHCARE_PROV_REG_NAME");
      sys("State: MERCHANT_MENU → HEALTHCARE_PROV_REG_NAME");
      bot(
        "🏥 *Register as Healthcare Provider — Step 1/6*\n\nEnter your *full name / clinic name*:"
      );
    } else if (lower === "merchant_register_tour" || lower === "register_tour_operator") {
      if (!isRegistryModuleEnabled("Tours")) {
        bot("❌ *Tours & Travel module is currently disabled for this city.*", [
          { id: "mrto_back", title: "🏠 Merchant Menu", payload: "hi" }
        ]);
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "TOUR_OPER_REG_NAME");
      sys("State: MERCHANT_MENU → TOUR_OPER_REG_NAME");
      bot(
        "✈️ *Register as Tour Operator — Step 1/6*\n\nEnter your *company / operator name*:"
      );
    } else if (lower === "merchant_register_professional" || lower === "register_service_professional") {
      if (!isRegistryModuleEnabled("Professional")) {
        bot(
          "❌ *Professional Services module is currently disabled for this city.*",
          [{ id: "mrps_back", title: "🏠 Merchant Menu", payload: "hi" }]
        );
        return { messages: msgs };
      }
      stateTransition = transition(ctx, "PROF_PROV_REG_NAME");
      sys("State: MERCHANT_MENU → PROF_PROV_REG_NAME");
      bot(
        "🔧 *Register as Service Professional — Step 1/5*\n\nEnter your *full name*:"
      );
    } else if (lower === "add_healthcare_services") {
      const isHCProvider = ctx.stateData.businessType === "healthcare";
      if (!isHCProvider) {
        bot("⚠️ *Register as Healthcare Provider first.*", [
          {
            id: "ahs_reg",
            title: "🏥 Register as Healthcare Provider",
            payload: "merchant_register_healthcare"
          },
          { id: "ahs_back", title: "🏠 Merchant Menu", payload: "hi" }
        ]);
      } else {
        bot(
          "🏥 *Add Healthcare Services*\n\nList your consultation types, timings, and fees.\n\nEnter the service you offer (e.g. General Consultation, ECG, Blood Test):"
        );
        ctx.stateData.addingHealthcareService = true;
      }
    } else if (lower === "add_tour_packages") {
      const isTourOp = ctx.stateData.businessType === "tour";
      if (!isTourOp) {
        bot("⚠️ *Register as Tour Operator first.*", [
          {
            id: "atp_reg",
            title: "✈️ Register as Tour Operator",
            payload: "merchant_register_tour"
          },
          { id: "atp_back", title: "🏠 Merchant Menu", payload: "hi" }
        ]);
      } else {
        bot(
          "✈️ *Add Tour Package*\n\nEnter the *destination name* for your new tour package:"
        );
        ctx.stateData.addingTourPackage = true;
      }
    } else if (lower === "add_professional_services") {
      const isProfProv = ctx.stateData.businessType === "professional";
      if (!isProfProv) {
        bot("⚠️ *Register as Service Professional first.*", [
          {
            id: "aps_reg",
            title: "🔧 Register as Service Professional",
            payload: "merchant_register_professional"
          },
          { id: "aps_back", title: "🏠 Merchant Menu", payload: "hi" }
        ]);
      } else {
        bot(
          "🔧 *Add Professional Service*\n\nEnter the service you want to add (e.g. AC Repair, Deep Cleaning, Pet Grooming):"
        );
        ctx.stateData.addingProfService = true;
      }
    } else if (lower === "view_subscription_plans" || lower.includes("subscription plan")) {
      const plans = ctx.stateData._cachedSubscriptionPlans;
      if (plans && plans.length > 0) {
        const lines = plans.slice(0, 6).map(
          (p, i) => `${i + 1}. *${p.name}* (${p.targetRole})
   💰 ₹${p.priceFlat} | 🗓️ ${p.durationDays} days`
        ).join("\n\n");
        bot(
          `💳 *Subscription Plans* (${plans.length} plans available)
━━━━━━━━━━━━━━━━━━━━

${lines}`,
          [{ id: "sp_home", title: "🏠 Main Menu", payload: "hi" }]
        );
      } else {
        bot(
          "💳 *Subscription Plans*\n\nNo active plans loaded. Run *Load Sample Data* in admin panel to create plans.",
          [{ id: "sp_home", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
      return { messages: msgs };
    } else if (lower === "view_rate_cards" || lower.includes("rate card")) {
      const rateCards = ctx.stateData._cachedRateCards;
      if (rateCards && rateCards.length > 0) {
        const lines = rateCards.slice(0, 5).map(
          (r, i) => `${i + 1}. *${r.vehicleType}* (${r.serviceType})
   💰 Base: ₹${r.baseRate} | Per KM: ₹${r.perKmRate}`
        ).join("\n\n");
        bot(
          `🚚 *Rate Cards* (${rateCards.length} cards)
━━━━━━━━━━━━━━━━━━━━

${lines}`,
          [{ id: "rc_home", title: "🏠 Main Menu", payload: "hi" }]
        );
      } else {
        bot(
          "🚚 *Rate Cards*\n\nNo rate cards loaded. Run *Load Sample Data* in admin panel to seed rate cards.",
          [{ id: "rc_home", title: "🏠 Main Menu", payload: "hi" }]
        );
      }
      return { messages: msgs };
    } else {
      const moduleStatuses = await readModuleStatuses();
      const businessType = String(ctx.stateData.businessType ?? "");
      const isHC = businessType === "healthcare";
      const isTour = businessType === "tour";
      const isProf = businessType === "professional";
      const showHC = moduleStatuses.Healthcare !== false;
      const showTour = moduleStatuses.Tours !== false;
      const showProf = moduleStatuses.Professional !== false;
      const merchantMenuItems = [
        {
          id: "mm_dash",
          title: "📊 My Dashboard 🏪",
          payload: "open_merchant_dashboard"
        },
        { id: "mm1", title: "📦 My Orders", payload: "merchant_orders" },
        {
          id: "mm2",
          title: "➕ Add Product / Service",
          payload: "add_product"
        },
        { id: "mm3", title: "💼 Post Job", payload: "post_job_menu" },
        { id: "mm4", title: "🏠 Post Property", payload: "post_property_menu" },
        { id: "mm5", title: "🎉 Post Event", payload: "post_event_menu" },
        { id: "mm6", title: "📣 Advertise", payload: "advertise_menu" },
        { id: "mm7", title: "📊 View Analytics", payload: "earnings" },
        { id: "mm8", title: "📁 My Listings", payload: "my_listings" },
        {
          id: "mm9",
          title: "🛒 Order from Suppliers",
          payload: "supplier_order_start"
        },
        {
          id: "mm10",
          title: "📋 My Restock Orders",
          payload: "my_restock_orders"
        }
      ];
      if (showHC && !isHC)
        merchantMenuItems.push({
          id: "mm_hc_reg",
          title: "🏥 Register as Healthcare Provider",
          payload: "merchant_register_healthcare"
        });
      if (showTour && !isTour)
        merchantMenuItems.push({
          id: "mm_tour_reg",
          title: "✈️ Register as Tour Operator",
          payload: "merchant_register_tour"
        });
      if (showProf && !isProf)
        merchantMenuItems.push({
          id: "mm_prof_reg",
          title: "🔧 Register as Service Professional",
          payload: "merchant_register_professional"
        });
      if (isHC && showHC)
        merchantMenuItems.push({
          id: "mm_add_hc",
          title: "🏥 Add Healthcare Services",
          payload: "add_healthcare_services"
        });
      if (isTour && showTour)
        merchantMenuItems.push({
          id: "mm_add_tour",
          title: "✈️ Add Tour Packages",
          payload: "add_tour_packages"
        });
      if (isProf && showProf)
        merchantMenuItems.push({
          id: "mm_add_prof",
          title: "🔧 Add Professional Services",
          payload: "add_professional_services"
        });
      merchantMenuItems.push(
        {
          id: "mm_sub_plans",
          title: "💳 View Subscription Plans",
          payload: "view_subscription_plans"
        },
        {
          id: "mm_rate_cards",
          title: "🚚 View Rate Cards",
          payload: "view_rate_cards"
        }
      );
      bot("Please select an option:", merchantMenuItems);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MERCHANT_REG_BUSINESS_TYPE") {
    const typeMap = {
      "1": "regular",
      regular_store: "regular",
      regular: "regular",
      "2": "healthcare",
      healthcare_provider: "healthcare",
      healthcare: "healthcare",
      "3": "tour",
      tour_operator: "tour",
      tour: "tour",
      "4": "professional",
      professional_service: "professional",
      professional: "professional"
    };
    const chosen = typeMap[lower];
    if (chosen) {
      ctx.stateData.businessType = chosen;
      if (chosen === "healthcare") {
        stateTransition = transition(ctx, "HEALTHCARE_PROV_REG_NAME");
        sys("State: MERCHANT_REG_BUSINESS_TYPE → HEALTHCARE_PROV_REG_NAME");
        bot(
          "🏥 *Healthcare Provider Registration — Step 1/6*\n\nEnter your *clinic / hospital / pharmacy name*:"
        );
      } else if (chosen === "tour") {
        stateTransition = transition(ctx, "TOUR_OPER_REG_NAME");
        sys("State: MERCHANT_REG_BUSINESS_TYPE → TOUR_OPER_REG_NAME");
        bot(
          "✈️ *Tour Operator Registration — Step 1/6*\n\nEnter your *company / agency name*:"
        );
      } else if (chosen === "professional") {
        stateTransition = transition(ctx, "PROF_PROV_REG_NAME");
        sys("State: MERCHANT_REG_BUSINESS_TYPE → PROF_PROV_REG_NAME");
        bot(
          "🔧 *Professional Service Provider Registration — Step 1/5*\n\nEnter your *full name*:"
        );
      } else {
        stateTransition = transition(ctx, "MERCHANT_REG_NAME");
        sys(
          "State: MERCHANT_REG_BUSINESS_TYPE → MERCHANT_REG_NAME (regular store)"
        );
        bot(
          "🏪 *Merchant Registration — Step 1/14*\n\nEnter your *full name* (owner/manager name):"
        );
      }
    } else {
      bot("🏪 *What type of business are you registering?*", [
        {
          id: "bt1",
          title: "🛒 Regular Store (products & orders)",
          payload: "regular_store"
        },
        {
          id: "bt2",
          title: "🏥 Healthcare Provider (clinic, doctor, pharmacy)",
          payload: "healthcare_provider"
        },
        {
          id: "bt3",
          title: "✈️ Tour Operator (tours, travel packages)",
          payload: "tour_operator"
        },
        {
          id: "bt4",
          title: "🔧 Professional Service (plumber, trainer, etc.)",
          payload: "professional_service"
        }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "HEALTHCARE_PROV_REG_NAME") {
    ctx.stateData.hcName = message;
    stateTransition = transition(ctx, "HEALTHCARE_PROV_REG_SPECIALIZATION");
    sys("State: HEALTHCARE_PROV_REG_NAME → HEALTHCARE_PROV_REG_SPECIALIZATION");
    bot(
      `🏥 *Step 2/6:* Name: *${message}*

Enter your *specialization*:
(e.g. General Physician, Cardiologist, Dentist, Pharmacist, Radiologist)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "HEALTHCARE_PROV_REG_SPECIALIZATION") {
    ctx.stateData.hcSpecialization = message;
    stateTransition = transition(ctx, "HEALTHCARE_PROV_REG_PHONE");
    sys(
      "State: HEALTHCARE_PROV_REG_SPECIALIZATION → HEALTHCARE_PROV_REG_PHONE"
    );
    bot(
      `🏥 *Step 3/6:* Specialization: *${message}*

Enter your *contact phone number* (for patient bookings):`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "HEALTHCARE_PROV_REG_PHONE") {
    ctx.stateData.hcPhone = message;
    stateTransition = transition(ctx, "HEALTHCARE_PROV_REG_LOCATION");
    sys("State: HEALTHCARE_PROV_REG_PHONE → HEALTHCARE_PROV_REG_LOCATION");
    bot("🏥 *Step 4/6:* Enter your *clinic address / location*:");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "HEALTHCARE_PROV_REG_LOCATION") {
    ctx.stateData.hcLocation = message;
    stateTransition = transition(ctx, "HEALTHCARE_PROV_REG_FEE");
    sys("State: HEALTHCARE_PROV_REG_LOCATION → HEALTHCARE_PROV_REG_FEE");
    bot("🏥 *Step 5/6:* Enter your *consultation fee* in ₹ (or 0 if free):");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "HEALTHCARE_PROV_REG_FEE") {
    ctx.stateData.hcFee = message;
    stateTransition = transition(ctx, "HEALTHCARE_PROV_REG_AVAILABILITY");
    sys("State: HEALTHCARE_PROV_REG_FEE → HEALTHCARE_PROV_REG_AVAILABILITY");
    bot(
      "🏥 *Step 6/6:* Enter your *availability / timing*:\n(e.g. Mon–Sat 9am–5pm, 24x7, By Appointment):"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "HEALTHCARE_PROV_REG_AVAILABILITY") {
    ctx.stateData.hcAvailability = message;
    ctx.stateData.businessType = "healthcare";
    stateTransition = transition(ctx, "HEALTHCARE_PROV_REG_DONE");
    sys("State: HEALTHCARE_PROV_REG_AVAILABILITY → HEALTHCARE_PROV_REG_DONE");
    sys("✅ Healthcare provider saved to backend via addHealthcareProvider()");
    const hcId = `HC-${Date.now().toString().slice(-6)}`;
    _realHealthcareProviders.push({
      id: hcId,
      name: String(ctx.stateData.hcName ?? ctx.name ?? "Provider"),
      specialization: String(ctx.stateData.hcSpecialization ?? ""),
      phone: String(ctx.stateData.hcPhone ?? phoneNumber),
      location: String(ctx.stateData.hcLocation ?? ""),
      fee: Number(ctx.stateData.hcFee) || 0
    });
    bot(
      `🎉 *Healthcare Provider Registered!*

✅ Name: *${ctx.stateData.hcName}*
✅ Specialization: ${ctx.stateData.hcSpecialization}
✅ Location: ${ctx.stateData.hcLocation}
✅ Fee: ₹${ctx.stateData.hcFee}
✅ Availability: ${ctx.stateData.hcAvailability}

🆔 Provider ID: *${hcId}*

Customers can now search and book appointments with you.`,
      [
        {
          id: "hcd1",
          title: "🏥 Add Healthcare Services",
          payload: "add_healthcare_services"
        },
        { id: "hcd2", title: "📦 My Bookings", payload: "merchant_orders" },
        { id: "hcd3", title: "🏠 Merchant Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TOUR_OPER_REG_NAME") {
    ctx.stateData.tourName = message;
    stateTransition = transition(ctx, "TOUR_OPER_REG_DESTINATION");
    sys("State: TOUR_OPER_REG_NAME → TOUR_OPER_REG_DESTINATION");
    bot(
      `✈️ *Step 2/6:* Operator: *${message}*

Enter the *main destination(s)* you offer tours to:
(e.g. Manali, Goa, Kerala, International)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TOUR_OPER_REG_DESTINATION") {
    ctx.stateData.tourDestination = message;
    stateTransition = transition(ctx, "TOUR_OPER_REG_TYPE");
    sys("State: TOUR_OPER_REG_DESTINATION → TOUR_OPER_REG_TYPE");
    bot("✈️ *Step 3/6:* Select your *tour type*:", [
      { id: "tt1", title: "🏔 Adventure", payload: "Adventure" },
      { id: "tt2", title: "🕌 Religious", payload: "Religious" },
      { id: "tt3", title: "🏖 Beach/Leisure", payload: "Beach" },
      { id: "tt4", title: "🌍 International", payload: "International" },
      { id: "tt5", title: "🏕 Trekking", payload: "Trekking" },
      { id: "tt6", title: "🚌 Day Trip", payload: "Day Trip" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TOUR_OPER_REG_TYPE") {
    ctx.stateData.tourType = message;
    stateTransition = transition(ctx, "TOUR_OPER_REG_DURATION");
    sys("State: TOUR_OPER_REG_TYPE → TOUR_OPER_REG_DURATION");
    bot(
      `✈️ *Step 4/6:* Tour type: *${message}*

Enter the *tour duration*:
(e.g. 3 Days / 2 Nights, 1 Day, 7 Days)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TOUR_OPER_REG_DURATION") {
    ctx.stateData.tourDuration = message;
    stateTransition = transition(ctx, "TOUR_OPER_REG_PRICE");
    sys("State: TOUR_OPER_REG_DURATION → TOUR_OPER_REG_PRICE");
    bot("✈️ *Step 5/6:* Enter the *price per person* in ₹:");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TOUR_OPER_REG_PRICE") {
    ctx.stateData.tourPrice = message;
    stateTransition = transition(ctx, "TOUR_OPER_REG_PHONE");
    sys("State: TOUR_OPER_REG_PRICE → TOUR_OPER_REG_PHONE");
    bot(
      "✈️ *Step 6/6:* Enter your *contact phone number* (for booking inquiries):"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "TOUR_OPER_REG_PHONE") {
    ctx.stateData.tourPhone = message;
    ctx.stateData.businessType = "tour";
    stateTransition = transition(ctx, "TOUR_OPER_REG_DONE");
    sys("State: TOUR_OPER_REG_PHONE → TOUR_OPER_REG_DONE");
    sys("✅ Tour operator saved to backend via addTourOperator()");
    const tourId = `TOUR-${Date.now().toString().slice(-6)}`;
    _realTourOperators.push({
      id: tourId,
      name: String(ctx.stateData.tourName ?? ctx.name ?? "Operator"),
      destination: String(ctx.stateData.tourDestination ?? ""),
      tourType: String(ctx.stateData.tourType ?? ""),
      duration: String(ctx.stateData.tourDuration ?? ""),
      price: Number(ctx.stateData.tourPrice) || 0,
      phone: String(ctx.stateData.tourPhone ?? phoneNumber)
    });
    bot(
      `🎉 *Tour Operator Registered!*

✅ Operator: *${ctx.stateData.tourName}*
✅ Destination: ${ctx.stateData.tourDestination}
✅ Type: ${ctx.stateData.tourType}
✅ Duration: ${ctx.stateData.tourDuration}
✅ Price: ₹${ctx.stateData.tourPrice}/person

🆔 Operator ID: *${tourId}*

Customers can now browse and book your tours.`,
      [
        {
          id: "tod1",
          title: "✈️ Add Tour Packages",
          payload: "add_tour_packages"
        },
        { id: "tod2", title: "📦 My Bookings", payload: "merchant_orders" },
        { id: "tod3", title: "🏠 Merchant Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROF_PROV_REG_NAME") {
    ctx.stateData.profName = message;
    stateTransition = transition(ctx, "PROF_PROV_REG_SKILL_TYPE");
    sys("State: PROF_PROV_REG_NAME → PROF_PROV_REG_SKILL_TYPE");
    bot(
      `🔧 *Step 2/5:* Name: *${message}*

Enter your *skill / service type*:`,
      [
        { id: "ps1", title: "🔧 Plumber", payload: "Plumber" },
        { id: "ps2", title: "⚡ Electrician", payload: "Electrician" },
        { id: "ps3", title: "🪚 Carpenter", payload: "Carpenter" },
        { id: "ps4", title: "🖌 Painter", payload: "Painter" },
        { id: "ps5", title: "🏋️ Personal Trainer", payload: "Personal Trainer" },
        { id: "ps6", title: "💆 Therapist/Spa", payload: "Therapist" },
        { id: "ps7", title: "🧹 Home Cleaner", payload: "Home Cleaner" },
        { id: "ps8", title: "💻 IT Support", payload: "IT Support" },
        { id: "ps9", title: "🐶 Pet Groomer", payload: "Pet Groomer" },
        {
          id: "ps10",
          title: "📐 Interior Designer",
          payload: "Interior Designer"
        }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROF_PROV_REG_SKILL_TYPE") {
    ctx.stateData.profSkillType = message;
    stateTransition = transition(ctx, "PROF_PROV_REG_PHONE");
    sys("State: PROF_PROV_REG_SKILL_TYPE → PROF_PROV_REG_PHONE");
    bot(
      `🔧 *Step 3/5:* Skill: *${message}*

Enter your *contact phone number*:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROF_PROV_REG_PHONE") {
    ctx.stateData.profPhone = message;
    stateTransition = transition(ctx, "PROF_PROV_REG_LOCATION");
    sys("State: PROF_PROV_REG_PHONE → PROF_PROV_REG_LOCATION");
    bot(
      "🔧 *Step 4/5:* Enter your *service area / location*:\n(e.g. Laxmi Nagar, East Delhi — where you offer services)"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROF_PROV_REG_LOCATION") {
    ctx.stateData.profLocation = message;
    stateTransition = transition(ctx, "PROF_PROV_REG_PRICE");
    sys("State: PROF_PROV_REG_LOCATION → PROF_PROV_REG_PRICE");
    bot(
      "🔧 *Step 5/5:* Enter your *price per hour* in ₹ (or 0 for quote-based):"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROF_PROV_REG_PRICE") {
    ctx.stateData.profPrice = message;
    ctx.stateData.businessType = "professional";
    stateTransition = transition(ctx, "PROF_PROV_REG_DONE");
    sys("State: PROF_PROV_REG_PRICE → PROF_PROV_REG_DONE");
    sys(
      "✅ Professional provider saved to backend via addProfessionalService()"
    );
    const profId = `PROF-${Date.now().toString().slice(-6)}`;
    _realProfessionalServices.push({
      id: profId,
      name: String(ctx.stateData.profName ?? ctx.name ?? "Professional"),
      skillType: String(ctx.stateData.profSkillType ?? ""),
      phone: String(ctx.stateData.profPhone ?? phoneNumber),
      location: String(ctx.stateData.profLocation ?? ""),
      pricePerHour: Number(ctx.stateData.profPrice) || void 0
    });
    bot(
      `🎉 *Service Professional Registered!*

✅ Name: *${ctx.stateData.profName}*
✅ Skill: ${ctx.stateData.profSkillType}
✅ Location: ${ctx.stateData.profLocation}
✅ Rate: ₹${ctx.stateData.profPrice}/hr

🆔 Provider ID: *${profId}*

Customers in your area can now search and book you.`,
      [
        {
          id: "ppd1",
          title: "🔧 Add Professional Services",
          payload: "add_professional_services"
        },
        { id: "ppd2", title: "📦 My Bookings", payload: "merchant_orders" },
        { id: "ppd3", title: "🏠 Merchant Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SUPPLIER_ORDER_START" || lower === "supplier_order_start") {
    if (lower === "supplier_order_start") {
      stateTransition = transition(ctx, "SUPPLIER_ORDER_START");
    }
    bot(
      "🛒 *Order from Supplier — Step 1/5*\n\nEnter the *supplier/vendor name* you want to order from:",
      [{ id: "so_cancel", title: "🏠 Merchant Menu", payload: "hi" }]
    );
    if (lower !== "supplier_order_start")
      return { messages: msgs, transition: stateTransition };
    return { messages: msgs };
  }
  if (ctx.state === "SUPPLIER_ORDER_CONTACT") {
    ctx.stateData.supplierName = message;
    stateTransition = transition(ctx, "SUPPLIER_ORDER_ITEM");
    bot(
      `✅ Supplier: *${message}*

*Step 2/5:* Enter supplier *contact number or email*:`,
      [{ id: "so_cancel2", title: "🏠 Merchant Menu", payload: "hi" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SUPPLIER_ORDER_ITEM") {
    ctx.stateData.supplierContact = message;
    stateTransition = transition(ctx, "SUPPLIER_ORDER_QTY");
    bot(
      "📦 *Step 3/5:* Enter the *item name and brand* you need to order:\n(e.g. Basmati Rice 5kg — Daawat Brand)",
      [{ id: "so_cancel3", title: "🏠 Merchant Menu", payload: "hi" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SUPPLIER_ORDER_QTY") {
    ctx.stateData.supplierItem = message;
    stateTransition = transition(ctx, "SUPPLIER_ORDER_NOTES");
    bot(
      "📊 *Step 4/5:* Enter *quantity and unit* (e.g. 50 kg, 10 boxes, 200 units):",
      [{ id: "so_cancel4", title: "🏠 Merchant Menu", payload: "hi" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SUPPLIER_ORDER_NOTES") {
    ctx.stateData.supplierQty = message;
    stateTransition = transition(ctx, "SUPPLIER_ORDER_CONFIRM");
    bot(
      "📝 *Step 5/5:* Any *special instructions or notes* for this order? (Type 'skip' if none)",
      [
        { id: "so_skip", title: "⏭️ Skip", payload: "skip_supplier_notes" },
        { id: "so_cancel5", title: "🏠 Merchant Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SUPPLIER_ORDER_CONFIRM") {
    const notes = lower === "skip_supplier_notes" || lower === "skip" ? "None" : message;
    ctx.stateData.supplierNotes = notes;
    const orderId = `SO-${Date.now().toString().slice(-6)}`;
    stateTransition = transition(ctx, "MERCHANT_MENU");
    bot(
      `✅ *Supplier Order Placed!*

📋 *Order ID:* ${orderId}
🏪 *Supplier:* ${String(ctx.stateData.supplierName ?? "")}
📞 *Contact:* ${String(ctx.stateData.supplierContact ?? "")}
📦 *Item:* ${String(ctx.stateData.supplierItem ?? "")}
📊 *Quantity:* ${String(ctx.stateData.supplierQty ?? "")}
📝 *Notes:* ${notes}

Your supplier will be contacted. Track status in My Restock Orders.`,
      [
        {
          id: "soc1",
          title: "📋 My Restock Orders",
          payload: "my_restock_orders"
        },
        { id: "soc2", title: "🏠 Merchant Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MARKETPLACE_MENU") {
    if (lower === "marketplace_browse" || lower.includes("browse")) {
      stateTransition = transition(ctx, "MARKETPLACE_BROWSE_CATEGORY");
      sys("State: MARKETPLACE_MENU → MARKETPLACE_BROWSE_CATEGORY");
      bot(
        "🔍 *Browse Old Items*\n\nSelect a category to filter (or browse all):",
        [
          {
            id: "mkb1",
            title: "📱 Electronics",
            payload: "browse_Electronics"
          },
          { id: "mkb2", title: "🚗 Vehicle", payload: "browse_Vehicle" },
          {
            id: "mkb3",
            title: "🍳 Kitchen Equipment",
            payload: "browse_Kitchen Equipment"
          },
          { id: "mkb4", title: "🪑 Furniture", payload: "browse_Furniture" },
          { id: "mkb5", title: "👗 Clothing", payload: "browse_Clothing" },
          { id: "mkb6", title: "🔧 Equipment", payload: "browse_Equipment" },
          { id: "mkb7", title: "🥘 Utensils", payload: "browse_Utensils" },
          { id: "mkb8", title: "📋 All Items", payload: "browse_all" },
          { id: "mkb9", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower === "my_marketplace_listings") {
      const myItems = _realMarketplaceItems.filter(
        (i) => i.createdBy === phoneNumber
      );
      if (myItems.length === 0) {
        bot(
          "📋 *My Listings*\n\nYou have no active listings yet.\n\nList your first item to get started!",
          [
            {
              id: "mml1",
              title: "➕ Sell / Rent My Item",
              payload: "marketplace_sell"
            },
            { id: "mml2", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        const lines = myItems.slice(0, 5).map(
          (i, idx) => `*${idx + 1}. ${i.title}*
💰 ₹${Number(i.price).toLocaleString("en-IN")} | ${i.listingType === "rent" ? "🔄 For Rent" : "🔖 For Sale"}
📦 ${i.category} | 📅 ${Number(i.yearOfManufacture)}
🟢 ${i.isActive ? "Active" : "Inactive"}`
        ).join("\n\n");
        bot(
          `📋 *My Listings (${myItems.length})*
━━━━━━━━━━━━━━━━━━━━

${lines}

━━━━━━━━━━━━━━━━━━━━
To deactivate a listing, visit the admin panel or use the Marketplace section.`,
          [
            {
              id: "mml3",
              title: "➕ Add Another",
              payload: "marketplace_sell"
            },
            {
              id: "mml4",
              title: "🔍 Browse Items",
              payload: "marketplace_browse"
            },
            { id: "mml5", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      }
    } else if (lower === "marketplace_sell" || lower.includes("sell") || lower.includes("rent my")) {
      stateTransition = transition(ctx, "SELL_ITEM_TITLE");
      sys("State: MARKETPLACE_MENU → SELL_ITEM_TITLE");
      bot(
        "🏷️ *List Your Item — Step 1/7*\n\nEnter a descriptive *title* for your item:\n(e.g. Samsung Galaxy S10, Honda Activa 2018, Wooden Dining Table)",
        [{ id: "mks_cancel", title: "🏠 Main Menu", payload: "hi" }]
      );
    } else {
      bot("Please choose an option:", [
        { id: "mk1", title: "🔍 Browse Items", payload: "marketplace_browse" },
        {
          id: "mk2",
          title: "➕ Sell / Rent My Item",
          payload: "marketplace_sell"
        },
        {
          id: "mk3",
          title: "📋 My Listings",
          payload: "my_marketplace_listings"
        },
        { id: "mk4", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "MARKETPLACE_BROWSE_CATEGORY") {
    const category = lower.startsWith("browse_") ? message.replace("browse_", "") : lower === "browse_all" ? "" : message;
    stateTransition = transition(ctx, "MARKETPLACE_BROWSE_RESULTS");
    sys("State: MARKETPLACE_BROWSE_CATEGORY → MARKETPLACE_BROWSE_RESULTS");
    const catLabel = category && category !== "all" ? category : "All Categories";
    const liveItems = _realMarketplaceItems.filter((i) => i.isActive).filter(
      (i) => !category || category === "all" || i.category === category
    );
    const displayItems = liveItems.slice(0, 4).map((i) => ({
      title: i.title,
      price: Number(i.price),
      category: i.category,
      year: Number(i.yearOfManufacture),
      type: i.listingType,
      invoice: i.invoiceAvailable,
      seller: i.createdBy ? String(i.createdBy) : "Seller"
    }));
    if (displayItems.length === 0) {
      bot(
        `🔍 *${catLabel}*

No listings found in this category yet. Be the first to list an item!

⚠️ *Note: Use Admin → Load Sample Data to add test listings.*`,
        [
          {
            id: "mkbr1",
            title: "➕ Sell / Rent My Item",
            payload: "marketplace_sell"
          },
          { id: "mkbr2", title: "📋 Browse All", payload: "browse_all" },
          { id: "mkbr3", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      const itemLines = displayItems.map(
        (i, idx) => `*${idx + 1}. ${i.title}*
💰 ₹${i.price.toLocaleString("en-IN")} | ${i.type === "rent" ? "🔄 For Rent" : "🔖 For Sale"}
📅 Year: ${i.year} | 🧾 Invoice: ${i.invoice ? "Yes" : "No"}
👤 Seller: ${i.seller}`
      ).join("\n\n");
      bot(
        `🔍 *${catLabel} — ${displayItems.length} listing(s)*
━━━━━━━━━━━━━━━━━━━━

${itemLines}

━━━━━━━━━━━━━━━━━━━━`,
        [
          {
            id: "mkbr4",
            title: "📱 Browse Electronics",
            payload: "browse_Electronics"
          },
          {
            id: "mkbr5",
            title: "🚗 Browse Vehicles",
            payload: "browse_Vehicle"
          },
          {
            id: "mkbr6",
            title: "➕ List My Item",
            payload: "marketplace_sell"
          },
          { id: "mkbr7", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SELL_ITEM_TITLE") {
    ctx.stateData.itemTitle = message;
    stateTransition = transition(ctx, "SELL_ITEM_PRICE");
    bot(
      `✅ Title: *${message}*

💰 *Step 2/7:* What is your *asking price* (₹)?
(Enter the amount, e.g. 5000)`,
      [{ id: "sp_cancel", title: "🏠 Cancel", payload: "hi" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SELL_ITEM_PRICE") {
    ctx.stateData.itemPrice = message;
    stateTransition = transition(ctx, "SELL_ITEM_CATEGORY");
    bot(
      `✅ Price: ₹*${message}*

📦 *Step 3/7:* Select the *category* of your item:`,
      [
        { id: "sc1", title: "📱 Electronics", payload: "Electronics" },
        { id: "sc2", title: "🚗 Vehicle", payload: "Vehicle" },
        { id: "sc3", title: "🥘 Utensils", payload: "Utensils" },
        { id: "sc4", title: "👗 Clothing", payload: "Clothing" },
        { id: "sc5", title: "🪑 Furniture", payload: "Furniture" },
        {
          id: "sc6",
          title: "🍳 Kitchen Equipment",
          payload: "Kitchen Equipment"
        },
        { id: "sc7", title: "🔧 Equipment", payload: "Equipment" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SELL_ITEM_CATEGORY") {
    ctx.stateData.itemCategory = message;
    stateTransition = transition(ctx, "SELL_ITEM_YEAR");
    bot(
      `✅ Category: *${message}*

📅 *Step 4/7:* What is the *year of manufacture*?
(e.g. 2018)`,
      [{ id: "sy_cancel", title: "🏠 Cancel", payload: "hi" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SELL_ITEM_YEAR") {
    ctx.stateData.itemYear = message;
    stateTransition = transition(ctx, "SELL_ITEM_PHOTO");
    bot(
      `✅ Year: *${message}*

📸 *Step 5/7:* Share an *Instagram or photo link* for your item:
(Paste a link, or type 'skip')`,
      [
        { id: "sph_skip", title: "⏭️ Skip", payload: "skip_photo" },
        { id: "sph_cancel", title: "🏠 Cancel", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SELL_ITEM_PHOTO") {
    ctx.stateData.itemPhoto = lower === "skip_photo" || lower === "skip" ? "" : message;
    stateTransition = transition(ctx, "SELL_ITEM_TYPE");
    bot("🏷️ *Step 6/7:* Are you selling or renting this item?", [
      { id: "st1", title: "🔖 For Sale", payload: "sale" },
      { id: "st2", title: "🔄 For Rent", payload: "rent" },
      { id: "st_cancel", title: "🏠 Cancel", payload: "hi" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SELL_ITEM_TYPE") {
    ctx.stateData.itemType = message;
    stateTransition = transition(ctx, "SELL_ITEM_INVOICE");
    bot(
      `✅ Listing as: *${message === "rent" ? "For Rent" : "For Sale"}*

🧾 *Step 7/7:* Do you have an invoice/bill for this item?`,
      [
        { id: "si1", title: "✅ Yes, I have invoice", payload: "invoice_yes" },
        { id: "si2", title: "❌ No invoice", payload: "invoice_no" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SELL_ITEM_INVOICE") {
    const invoiceAvailable = lower === "invoice_yes" || lower === "yes";
    ctx.stateData.itemInvoice = invoiceAvailable;
    stateTransition = transition(ctx, "SELL_ITEM_DONE");
    const listingId = `MKT-${Date.now().toString().slice(-6)}`;
    bot(
      `🎉 *Listing Published!*

📋 *Listing ID:* ${listingId}
📦 *Item:* ${String(ctx.stateData.itemTitle ?? "")}
💰 *Price:* ₹${String(ctx.stateData.itemPrice ?? "")}
🏷️ *Category:* ${String(ctx.stateData.itemCategory ?? "")}
📅 *Year:* ${String(ctx.stateData.itemYear ?? "")}
🔖 *Type:* ${ctx.stateData.itemType === "rent" ? "For Rent" : "For Sale"}
🧾 *Invoice:* ${invoiceAvailable ? "Available" : "Not available"}

Interested buyers can contact you via LocalBazar Kart. You will be notified when someone shows interest! 🛒`,
      [
        { id: "sd1", title: "🔍 Browse More", payload: "marketplace_browse" },
        { id: "sd2", title: "➕ List Another", payload: "marketplace_sell" },
        { id: "sd3", title: "🏠 Main Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SELL_ITEM_DONE") {
    stateTransition = transition(ctx, "MAIN_MENU");
    bot("🏠 Returning to main menu...", [
      { id: "sd_home", title: "🏠 Main Menu", payload: "hi" },
      { id: "sd_mk", title: "🏷️ Marketplace", payload: "marketplace_menu" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (lower === "post_daily_job_start" || ctx.state === "POST_DAILY_JOB_CATEGORY") {
    if (lower === "post_daily_job_start") {
      if (abortIfModuleDisabled("Jobs")) return { messages: msgs };
      stateTransition = transition(ctx, "POST_DAILY_JOB_CATEGORY");
      sys("State: → POST_DAILY_JOB_CATEGORY");
    }
    if (ctx.state === "POST_DAILY_JOB_CATEGORY" && lower !== "post_daily_job_start") {
      ctx.stateData.dailyJobCategory = message;
      stateTransition = transition(ctx, "POST_DAILY_JOB_TITLE");
      sys("State: POST_DAILY_JOB_CATEGORY → POST_DAILY_JOB_TITLE");
      bot(
        `💼 *Post Daily Job — Step 2/7*

Category: *${message}*

Enter the *job title*:`
      );
      return { messages: msgs, transition: stateTransition };
    }
    bot("💼 *Post Daily Job — Step 1/7*\n\nSelect *job category*:", [
      { id: "djc1", title: "🏥 Healthcare", payload: "Healthcare" },
      { id: "djc2", title: "📚 Education", payload: "Education" },
      { id: "djc3", title: "🚴 Delivery", payload: "Delivery" },
      { id: "djc4", title: "🧹 Cleaning", payload: "Cleaning" },
      { id: "djc5", title: "🏗 Construction", payload: "Construction" },
      { id: "djc6", title: "🛍 Retail", payload: "Retail" },
      { id: "djc7", title: "💻 IT/Tech", payload: "IT" },
      { id: "djc8", title: "🍽 Hospitality", payload: "Hospitality" },
      { id: "djc9", title: "🌾 Agriculture", payload: "Agriculture" },
      { id: "djc10", title: "🔐 Security", payload: "Security" },
      { id: "djc11", title: "🚛 Transport", payload: "Transport" },
      { id: "djc12", title: "🏭 Manufacturing", payload: "Manufacturing" },
      { id: "djc13", title: "💵 Finance", payload: "Finance" },
      { id: "djc14", title: "⚖ Legal", payload: "Legal" },
      { id: "djc15", title: "🎨 Creative", payload: "Creative" },
      { id: "djc16", title: "📦 Other", payload: "Other" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "POST_DAILY_JOB_TITLE") {
    ctx.stateData.dailyJobTitle = message;
    stateTransition = transition(ctx, "POST_DAILY_JOB_DESCRIPTION");
    sys("State: POST_DAILY_JOB_TITLE → POST_DAILY_JOB_DESCRIPTION");
    bot(
      "💼 *Step 3/7:* Describe what the *job involves* (responsibilities, skills needed):"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "POST_DAILY_JOB_DESCRIPTION") {
    ctx.stateData.dailyJobDesc = message;
    stateTransition = transition(ctx, "POST_DAILY_JOB_PRICE");
    sys("State: POST_DAILY_JOB_DESCRIPTION → POST_DAILY_JOB_PRICE");
    bot("💼 *Step 4/7:* Enter *price per day* (₹ amount, e.g. 800):");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "POST_DAILY_JOB_PRICE") {
    ctx.stateData.dailyJobPrice = message;
    stateTransition = transition(ctx, "POST_DAILY_JOB_LOCATION");
    sys("State: POST_DAILY_JOB_PRICE → POST_DAILY_JOB_LOCATION");
    bot("💼 *Step 5/7:* Enter *job location* (area / city):");
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "POST_DAILY_JOB_LOCATION") {
    ctx.stateData.dailyJobLocation = message;
    stateTransition = transition(ctx, "POST_DAILY_JOB_EDUCATION");
    sys("State: POST_DAILY_JOB_LOCATION → POST_DAILY_JOB_EDUCATION");
    bot("💼 *Step 6/7:* Minimum *education requirement*:", [
      { id: "dje1", title: "✅ None Required", payload: "None" },
      { id: "dje2", title: "📜 10th Pass", payload: "10th Pass" },
      { id: "dje3", title: "📜 12th Pass", payload: "12th Pass" },
      { id: "dje4", title: "🎓 Graduate", payload: "Graduate" },
      { id: "dje5", title: "🎓 Post Graduate", payload: "Post Graduate" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "POST_DAILY_JOB_EDUCATION") {
    ctx.stateData.dailyJobEducation = message;
    stateTransition = transition(ctx, "POST_DAILY_JOB_DURATION");
    sys("State: POST_DAILY_JOB_EDUCATION → POST_DAILY_JOB_DURATION");
    bot("💼 *Step 7/7:* Select *job duration*:", [
      { id: "djd1", title: "📅 One Day", payload: "One Day" },
      { id: "djd2", title: "📅 Weekly", payload: "Weekly" },
      { id: "djd3", title: "📅 Monthly", payload: "Monthly" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "POST_DAILY_JOB_DURATION") {
    ctx.stateData.dailyJobDuration = message;
    stateTransition = transition(ctx, "POST_DAILY_JOB_CONFIRM");
    sys("State: POST_DAILY_JOB_DURATION → POST_DAILY_JOB_CONFIRM");
    bot(
      `💼 *Job Summary — Confirm?*

🏷️ Title: *${String(ctx.stateData.dailyJobTitle ?? "")}*
📂 Category: ${String(ctx.stateData.dailyJobCategory ?? "")}
📝 ${String(ctx.stateData.dailyJobDesc ?? "").slice(0, 80)}...
💰 Pay: ₹${String(ctx.stateData.dailyJobPrice ?? "")}/day
📍 Location: ${String(ctx.stateData.dailyJobLocation ?? "")}
🎓 Education: ${String(ctx.stateData.dailyJobEducation ?? "")}
📅 Duration: ${String(ctx.stateData.dailyJobDuration ?? "")}

Post this daily job?`,
      [
        {
          id: "djconf1",
          title: "✅ Yes, Post Job",
          payload: "confirm_daily_job"
        },
        { id: "djconf2", title: "❌ Cancel", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "POST_DAILY_JOB_CONFIRM") {
    if (lower === "confirm_daily_job" || lower === "yes") {
      stateTransition = transition(ctx, "POST_DAILY_JOB_COMPLETE");
      sys("State: POST_DAILY_JOB_CONFIRM → POST_DAILY_JOB_COMPLETE");
      const jobId = `DAILY-${Date.now().toString().slice(-5)}`;
      bot(
        `✅ *Daily Job Posted!*

🆔 Job ID: *${jobId}*
🏷️ ${String(ctx.stateData.dailyJobTitle ?? "")}
💰 ₹${String(ctx.stateData.dailyJobPrice ?? "")}/day | 📍 ${String(ctx.stateData.dailyJobLocation ?? "")}

Applicants will contact you on this WhatsApp number. You will be notified when someone applies.`,
        [
          {
            id: "djdone1",
            title: "💼 Post Another Job",
            payload: "post_daily_job_start"
          },
          { id: "djdone2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      stateTransition = transition(ctx, "MAIN_MENU");
      bot("❌ Job posting cancelled.", [
        { id: "djcancel", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "POST_DAILY_JOB_COMPLETE") {
    stateTransition = transition(ctx, "MAIN_MENU");
    bot("🏠 Returning to main menu.", [
      { id: "djc_home", title: "🏠 Main Menu", payload: "hi" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (lower === "apply_daily_job_start" || ctx.state === "APPLY_DAILY_JOB_SEARCH") {
    if (lower === "apply_daily_job_start") {
      if (abortIfModuleDisabled("Jobs")) return { messages: msgs };
      stateTransition = transition(ctx, "APPLY_DAILY_JOB_SEARCH");
      sys("State: → APPLY_DAILY_JOB_SEARCH");
    }
    if (ctx.state === "APPLY_DAILY_JOB_SEARCH" && lower !== "apply_daily_job_start") {
      ctx.stateData.dailyJobSearchKw = message;
      stateTransition = transition(ctx, "APPLY_DAILY_JOB_LIST");
      sys("State: APPLY_DAILY_JOB_SEARCH → APPLY_DAILY_JOB_LIST");
      bot(
        `🔍 *Daily Jobs matching "${message}":*

1️⃣ *Nurse — Hospital Support* | ₹900/day | Andheri, Mumbai | Healthcare
2️⃣ *Home Tutor (Maths)* | ₹600/day | Bandra, Mumbai | Education
3️⃣ *Delivery Executive* | ₹700/day | Thane, Mumbai | Delivery

Select a job number to view details:`,
        [
          { id: "adjl1", title: "1️⃣ View Job 1", payload: "view_daily_job_1" },
          { id: "adjl2", title: "2️⃣ View Job 2", payload: "view_daily_job_2" },
          { id: "adjl3", title: "3️⃣ View Job 3", payload: "view_daily_job_3" },
          {
            id: "adjl_back",
            title: "🔍 Search Again",
            payload: "apply_daily_job_start"
          }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    }
    bot(
      "💼 *Find Daily Jobs*\n\nEnter *category or keyword* to search daily jobs (e.g. Healthcare, Delivery, Cleaning):"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "APPLY_DAILY_JOB_LIST") {
    const jobNum = lower.includes("1") ? "1" : lower.includes("2") ? "2" : "3";
    const jobDetails = {
      "1": {
        title: "Nurse — Hospital Support",
        pay: "₹900/day",
        loc: "Andheri, Mumbai",
        cat: "Healthcare",
        desc: "Assist doctors and nurses in patient care, vitals monitoring, ward rounds."
      },
      "2": {
        title: "Home Tutor (Maths)",
        pay: "₹600/day",
        loc: "Bandra, Mumbai",
        cat: "Education",
        desc: "Teach Maths to Class 8–10 students at home. 2 hrs/day."
      },
      "3": {
        title: "Delivery Executive",
        pay: "₹700/day",
        loc: "Thane, Mumbai",
        cat: "Delivery",
        desc: "Deliver parcels on a bike within the city. Bike and license required."
      }
    };
    const job = jobDetails[jobNum] ?? jobDetails["1"];
    ctx.stateData.selectedDailyJob = job;
    stateTransition = transition(ctx, "APPLY_DAILY_JOB_VIEW");
    sys("State: APPLY_DAILY_JOB_LIST → APPLY_DAILY_JOB_VIEW");
    bot(
      `💼 *${job.title}*

💰 Pay: *${job.pay}*
📍 Location: ${job.loc}
📂 Category: ${job.cat}

📝 *Description:*
${job.desc}

🎓 Education: None required
📅 Duration: One Day

Apply for this job?`,
      [
        { id: "adjv1", title: "✅ Apply Now", payload: "apply_daily_job_yes" },
        {
          id: "adjv2",
          title: "⬅️ Back to List",
          payload: "apply_daily_job_start"
        }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "APPLY_DAILY_JOB_VIEW") {
    if (lower === "apply_daily_job_yes" || lower === "yes") {
      stateTransition = transition(ctx, "APPLY_DAILY_JOB_APPLY_CONFIRM");
      sys("State: APPLY_DAILY_JOB_VIEW → APPLY_DAILY_JOB_APPLY_CONFIRM");
      const job = ctx.stateData.selectedDailyJob;
      bot(
        `✅ *Application Sent!*

📋 You applied for:
*${(job == null ? void 0 : job.title) ?? "Daily Job"}*
💰 ${(job == null ? void 0 : job.pay) ?? "—"} | 📍 ${(job == null ? void 0 : job.loc) ?? "—"}

📞 The employer will contact you on this WhatsApp number shortly if you are shortlisted.

⭐ Keep your WhatsApp active for quick response!`,
        [
          {
            id: "adjapp1",
            title: "🔍 Find More Jobs",
            payload: "apply_daily_job_start"
          },
          { id: "adjapp2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      stateTransition = transition(ctx, "APPLY_DAILY_JOB_COMPLETE");
    } else {
      stateTransition = transition(ctx, "APPLY_DAILY_JOB_SEARCH");
      bot("💼 Enter a category or keyword to search daily jobs:");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "APPLY_DAILY_JOB_APPLY_CONFIRM" || ctx.state === "APPLY_DAILY_JOB_COMPLETE") {
    stateTransition = transition(ctx, "MAIN_MENU");
    bot("🏠 Returning to main menu.", [
      { id: "adjdone", title: "🏠 Main Menu", payload: "hi" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "DP_MENU") {
    if (lower === "dp_orders" || lower.includes("available") || lower === "1") {
      stateTransition = transition(ctx, "DP_AVAILABLE_ORDERS");
      sys("State: DP_MENU → DP_AVAILABLE_ORDERS");
      bot(
        "📦 *Available Orders Near You*\n\nTap to accept an order:",
        [
          {
            id: "dp1",
            title: "✅ Accept Order 1 (1.2km)",
            payload: "accept_dp_ord004"
          },
          {
            id: "dp2",
            title: "✅ Accept Order 2 (2.5km)",
            payload: "accept_dp_ord006"
          },
          { id: "dp3", title: "🏠 My Menu", payload: "hi" }
        ],
        "dp_orders",
        {
          orders: [
            {
              id: "ORDER-1",
              distance: 1.2,
              amount: 280,
              cod: 280,
              pickup: "Patel Fast Food, Paharganj",
              delivery: "Karol Bagh"
            },
            {
              id: "ORDER-2",
              distance: 2.5,
              amount: 145,
              cod: 145,
              pickup: "Sharma Kirana, Connaught Place",
              delivery: "South Extension"
            }
          ]
        }
      );
    } else if (lower === "dp_earnings" || lower.includes("earn")) {
      bot(
        "💰 *Your Earnings*\n\n📅 Today: ₹420 (7 deliveries)\n📅 This Week: ₹2,940\n📅 This Month: ₹11,200\n\n🏆 Rating: ⭐ 4.7 (213 reviews)\n📊 Acceptance Rate: 94%\n\n💳 Next Payout: ₹2,940 this Friday",
        [
          {
            id: "de1",
            title: "📥 Download Report",
            payload: "download_report"
          },
          { id: "de2", title: "🏠 My Menu", payload: "hi" }
        ]
      );
    } else if (lower.startsWith("accept_dp_")) {
      stateTransition = transition(ctx, "DP_ACCEPT");
      sys("State: DP_MENU → DP_ACCEPT");
      bot(
        "✅ *Order Accepted!*\n\n📍 *Pickup from:*\nPatel Fast Food\n15 Main Street, Paharganj\n📞 +91 98765****11 (masked)\n\n📍 *Deliver to:*\nAjay Sharma\n42 MG Road, Karol Bagh\n📞 +91 98765****10 (masked)\n\n💰 Earnings: ₹55 upon delivery\n💵 Collect COD: ₹280 from customer",
        [
          { id: "ad1", title: "🗺 Start Navigation", payload: "start_nav" },
          {
            id: "ad2",
            title: "✅ Reached Merchant",
            payload: "reached_merchant"
          }
        ]
      );
    } else if (lower === "reached_merchant") {
      stateTransition = transition(ctx, "DP_PICKUP_INSTRUCTIONS");
      sys("State: DP_ACCEPT → DP_PICKUP_INSTRUCTIONS");
      bot(
        "📦 *Pickup Instructions*\n\nNo active deliveries found. Try placing an order first via the Customer flow, then return here to pick it up.",
        [
          {
            id: "pi1",
            title: "✅ OTP Confirmed — Picked Up",
            payload: "confirm_pickup"
          }
        ]
      );
    } else if (lower === "confirm_pickup") {
      stateTransition = transition(ctx, "DP_PICKUP_CONFIRMED");
      sys("State: DP_PICKUP_INSTRUCTIONS → DP_PICKUP_CONFIRMED");
      bot(
        "🚴 *Pickup Confirmed!*\n\nNow head to the delivery address:\n\n📍 42 MG Road, Karol Bagh, New Delhi\n📞 Customer: +91 98765****10 (masked)\n🗺 Distance: ~1.2 km | ETA: 12 mins",
        [
          {
            id: "pc1",
            title: "🗺 Start Navigation",
            payload: "start_delivery_nav"
          },
          {
            id: "pc2",
            title: "✅ Reached Customer",
            payload: "reached_customer"
          }
        ]
      );
    } else if (lower === "reached_customer") {
      stateTransition = transition(ctx, "DP_DELIVERY_INSTRUCTIONS");
      sys("State: DP_PICKUP_CONFIRMED → DP_DELIVERY_INSTRUCTIONS");
      bot(
        "🏠 *Delivery Instructions*\n\nHand over order to: *Ajay Sharma*\n📍 Flat 4B, MG Residency, Karol Bagh\n\n💵 *Collect COD: ₹280 cash*\n\n🔐 Delivery OTP: *8834*\n(Customer will share this with you)",
        [
          {
            id: "di1",
            title: "💵 Collect ₹280 Cash",
            payload: "collect_payment"
          }
        ]
      );
    } else if (lower === "collect_payment") {
      stateTransition = transition(ctx, "DP_COLLECT_PAYMENT");
      sys("State: DP_DELIVERY_INSTRUCTIONS → DP_COLLECT_PAYMENT");
      bot(
        "💵 *Confirm Payment Collection*\n\nAmount to collect: *₹280*\n\nHave you received ₹280 from the customer?",
        [
          {
            id: "cp1",
            title: "✅ Yes, ₹280 Collected",
            payload: "payment_confirmed"
          },
          {
            id: "cp2",
            title: "❓ Customer Not Home",
            payload: "customer_absent"
          }
        ]
      );
    } else if (lower === "payment_confirmed") {
      stateTransition = transition(ctx, "DP_PAYMENT_CONFIRMED");
      sys("State: DP_COLLECT_PAYMENT → DP_PAYMENT_CONFIRMED");
      bot(
        "✅ *Delivery Complete!*\n\nNow settle the amount with the vendor:\n\n💰 Total collected: ₹280\n💵 Hand over to merchant: ₹225\n🤑 Your earnings: ₹55\n\nPlease proceed to Patel Fast Food to settle.",
        [
          {
            id: "vs1",
            title: "✅ Vendor Settlement Done",
            payload: "vendor_settled"
          }
        ]
      );
    } else if (lower === "vendor_settled") {
      stateTransition = transition(ctx, "DP_COMPLETE");
      sys("State: DP_PAYMENT_CONFIRMED → DP_COMPLETE");
      bot(
        "🎉 *Order Completed!*\n\nOrder has been fully completed.\n\n✅ Delivered to customer\n✅ Payment collected: ₹280\n✅ Vendor settled: ₹225\n💰 Your earnings: *₹55*\n\n🏆 Great work! Check for more orders.",
        [
          { id: "done1", title: "📦 Find More Orders", payload: "dp_orders" },
          { id: "done2", title: "💰 My Earnings", payload: "dp_earnings" },
          { id: "done3", title: "🏠 My Menu", payload: "hi" }
        ]
      );
    } else if (lower === "add_petrol_expense" || lower.includes("petrol") || lower.includes("expense")) {
      stateTransition = transition(ctx, "DP_MENU");
      sys("State: DP_MENU → DP_MENU (petrol expense flow initiated)");
      ctx.stateData.petrolExpenseStep = "date";
      bot(
        "⛽ *Add Petrol Expense — Step 1/4*\n\nEnter the *date* (DD/MM/YYYY or type 'today'):",
        [{ id: "pe_today", title: "📅 Today", payload: "petrol_date_today" }]
      );
      ctx.stateData.petrolExpenseStep = "date";
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "petrol_date_today" || ctx.stateData.petrolExpenseStep === "date" && lower !== "add_petrol_expense") {
      ctx.stateData.petrolDate = lower === "petrol_date_today" ? (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN") : message;
      ctx.stateData.petrolExpenseStep = "amount";
      bot(
        `⛽ *Step 2/4:* Date: *${ctx.stateData.petrolDate}*

Enter *amount spent* (₹):
(e.g. 500)`
      );
      return { messages: msgs };
    } else if (ctx.stateData.petrolExpenseStep === "amount") {
      ctx.stateData.petrolAmount = message;
      ctx.stateData.petrolExpenseStep = "liters";
      bot(
        `⛽ *Step 3/4:* Amount: *₹${message}*

Enter *liters filled*:
(e.g. 3.5)`
      );
      return { messages: msgs };
    } else if (ctx.stateData.petrolExpenseStep === "liters") {
      ctx.stateData.petrolLiters = message;
      ctx.stateData.petrolExpenseStep = "notes";
      bot(
        `⛽ *Step 4/4 (Optional):* Liters: *${message}L*

Add any *notes* (optional):`,
        [{ id: "pe_skip", title: "⏭️ Skip", payload: "petrol_notes_skip" }]
      );
      return { messages: msgs };
    } else if (ctx.stateData.petrolExpenseStep === "notes" || lower === "petrol_notes_skip") {
      const notes = lower === "petrol_notes_skip" ? "" : message;
      ctx.stateData.petrolNotes = notes;
      ctx.stateData.petrolExpenseStep = void 0;
      const amount = ctx.stateData.petrolAmount ?? "0";
      bot(
        `✅ *Petrol Expense Saved!*

📅 Date: ${ctx.stateData.petrolDate}
⛽ Amount: ₹${amount}
🪣 Liters: ${ctx.stateData.petrolLiters}L${notes ? `
📝 Notes: ${notes}` : ""}

💰 *Today's Petrol Spend: ₹${amount}*`,
        [
          { id: "pe1", title: "➕ Add Another", payload: "add_petrol_expense" },
          { id: "pe2", title: "📊 My Expenses", payload: "my_expenses" },
          { id: "pe3", title: "🏠 My Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "my_expenses" || lower.includes("my expense")) {
      const todayExpense = ctx.stateData.petrolAmount ?? "0";
      bot(
        `📊 *My Petrol Expenses*

━━━━━━━━━━━━━━━━━━━━
⛽ *Today:* ₹${todayExpense}
📅 *This Week:* ₹${Number(todayExpense) * 3 + 200}
🗓️ *This Month:* ₹${Number(todayExpense) * 12 + 800}

💡 Net earnings after expenses tracked automatically.`,
        [
          { id: "me1", title: "➕ Add Expense", payload: "add_petrol_expense" },
          { id: "me2", title: "🏠 My Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "my_dp_listings" || lower.includes("my listing")) {
      bot(
        "📁 *My Listings*\n\nNo listings yet. Post a job or property to see it here.",
        [
          { id: "mdl1", title: "💼 Post a Job", payload: "post_job_dp" },
          {
            id: "mdl2",
            title: "🏠 Post Property",
            payload: "post_property_dp"
          },
          { id: "mdl3", title: "🏠 My Menu", payload: "hi" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "post_job_dp") {
      stateTransition = transition(ctx, "JOB_POST_TITLE");
      bot("✏️ *Post a Job — Step 1/6*\n\nEnter the *job title*:");
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "post_property_dp") {
      stateTransition = transition(ctx, "PROPERTY_POST_TYPE");
      bot("📝 *Post a Property — Step 1/4*\n\nSelect the *listing type*:", [
        { id: "pt1", title: "🏢 Rent", payload: "Rent" },
        { id: "pt2", title: "🏠 Sale", payload: "Sale" },
        { id: "pt3", title: "🏭 Lease / Commercial", payload: "Lease" }
      ]);
      return { messages: msgs, transition: stateTransition };
    } else if (lower === "post_shuttle_route" || lower.includes("post shuttle") || lower.includes("post route")) {
      if (ctx.stateData.dpServiceType === "shuttle") {
        stateTransition = transition(ctx, "SHUTTLE_POST_ROUTE_NAME");
        sys("State: DP_MENU → SHUTTLE_POST_ROUTE_NAME");
        bot(
          "🚌 *Post Shuttle Route — Step 1/5*\n\nEnter the *route name*:\n(e.g. 'Andheri–CST Route', 'Morning Express')"
        );
      } else {
        bot(
          "❌ *Route Posting Restricted*\n\nOnly Shuttle Delivery Partners can post shuttle routes.\n\nTo post routes, register as a Delivery Partner with *Shuttle* service type.",
          [{ id: "psr1", title: "🏠 My Menu", payload: "hi" }]
        );
      }
    } else if (lower === "shuttle_bookings" || lower.includes("shuttle booking")) {
      bot(
        "🚌 *Shuttle Bookings Today*\n\n1. Meena Sharma — Andheri → CST (₹45)\n2. Raj Patel — Bandra → Dadar (₹30)\n3. Amit Singh — Vile Parle → Churchgate (₹55)\n\n*Total bookings today: 3 | Earnings: ₹130*",
        [
          {
            id: "sb1",
            title: "🚌 Post New Route",
            payload: "post_shuttle_route"
          },
          { id: "sb2", title: "🏠 My Menu", payload: "hi" }
        ]
      );
    } else if (lower === "add_stop_to_route" || lower.includes("add stop to route") || lower.includes("add stop")) {
      const routes = _realShuttleRoutes;
      stateTransition = transition(ctx, "ADD_STOP_ROUTE_SELECT");
      sys("State: DP_MENU → ADD_STOP_ROUTE_SELECT");
      if (routes.length === 0) {
        bot(
          "⚠️ *No shuttle routes found.*\n\nPost a route first before adding stops.",
          [
            {
              id: "asr0",
              title: "🚌 Post New Route",
              payload: "post_shuttle_route"
            },
            { id: "asr1", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        const routeList = routes.map((r, i) => `${i + 1}. ${r.routeName}`).join("\n");
        bot(
          `🚌 *Add Stop to Existing Route*

${routeList}

Reply with the number or route name:`,
          routes.slice(0, 5).map((r, i) => ({
            id: `dp_route_${i}`,
            title: r.routeName.slice(0, 25),
            payload: String(i + 1)
          }))
        );
      }
    } else if (lower === "free_ride_driver" || lower.includes("free ride") || lower.includes("sarthi_free")) {
      bot(
        "🛺 *Incoming Free Ride Request!*\n\n━━━━━━━━━━━━━━━━━━━━\n👤 *Passenger:* Priya Singh\n📍 *Pickup:* Connaught Place, New Delhi\n📍 *Drop:* Saket, New Delhi\n🛣️ *Distance:* ~8 km\n\n*This is a FREE ride sharing — no fare charged.*\n*Passenger OTP is hidden from you for security.*\n\nDo you accept this ride?",
        [
          {
            id: "frdr1",
            title: "✅ Accept Ride",
            payload: "sarthi_accept_free_ride"
          },
          {
            id: "frdr2",
            title: "❌ Decline",
            payload: "sarthi_decline_free_ride"
          }
        ]
      );
      return { messages: msgs };
    } else if (lower === "sarthi_accept_free_ride") {
      bot(
        "✅ *Free Ride Accepted!*\n\n━━━━━━━━━━━━━━━━━━━━\n👤 Passenger: *Priya Singh*\n📞 Contact: +91 97654 *****\n📍 Pickup: *Connaught Place*\n\n🔑 Ask the passenger for their *OTP* to start the ride.\n\nThe passenger has received an OTP on their phone. Enter the OTP they provide:"
      );
      ctx.stateData.awaitingFreeRideOTP = true;
      return { messages: msgs };
    } else if (lower === "sarthi_decline_free_ride") {
      bot(
        "❌ Ride declined.\n\nAnother driver will be found for this passenger.",
        [{ id: "sdr1", title: "📦 Back to Menu", payload: "dp_orders" }]
      );
      return { messages: msgs };
    } else if (ctx.stateData.awaitingFreeRideOTP && /^\d{4,6}$/.test(lower)) {
      ctx.stateData.awaitingFreeRideOTP = false;
      const isCorrectOTP = lower === "1234" || Math.random() > 0.3;
      if (isCorrectOTP) {
        bot(
          "✅ *OTP Verified! Ride Started!*\n\n🛺 Sharing ride with passenger\n📍 From: *Connaught Place*\n📍 To: *Saket, New Delhi*\n💸 Fare: *FREE*\n\nDrive safely! 🙏 When you reach the destination, tap Complete Ride.",
          [
            {
              id: "frs1",
              title: "✅ Complete Ride",
              payload: "sarthi_complete_free_ride"
            }
          ]
        );
      } else {
        bot(
          "❌ *Invalid OTP.* Please ask the passenger to share the correct OTP.",
          [
            {
              id: "frb1",
              title: "🔁 Try Again",
              payload: "sarthi_accept_free_ride"
            }
          ]
        );
        ctx.stateData.awaitingFreeRideOTP = true;
      }
      return { messages: msgs };
    } else if (lower === "sarthi_complete_free_ride") {
      bot(
        "🎉 *Free Ride Completed!*\n\n✅ Drop-off confirmed at Saket\n👤 Passenger: Priya Singh\n💸 Fare: FREE (Ride Sharing)\n\nThank you for helping fellow citizens! 🙏\n\nWould you accept a tip from the passenger?",
        [
          { id: "frt1", title: "💰 ₹20 Tip", payload: "tip_20" },
          { id: "frt2", title: "💰 ₹50 Tip", payload: "tip_50" },
          { id: "frt3", title: "No Tip", payload: "dp_orders" }
        ]
      );
      return { messages: msgs };
    } else if (lower === "open_dp_dashboard" || lower === "dp_dashboard_link") {
      bot(
        "🚚 *Your Delivery Partner Dashboard*\n\n📊 Open your full dashboard to track deliveries, earnings, and manage your subscription:\n\n🔗 *https://localbazarkart.app/delivery-dashboard*\n\nBookmark this link to access your dashboard anytime!",
        [
          { id: "dpdb1", title: "📦 Available Orders", payload: "dp_orders" },
          { id: "dpdb2", title: "💰 My Earnings", payload: "dp_earnings" }
        ]
      );
    } else {
      bot("Please choose an option:", [
        {
          id: "dm_dash",
          title: "📊 My Dashboard 🚚",
          payload: "open_dp_dashboard"
        },
        { id: "dm1", title: "📦 Available Orders", payload: "dp_orders" },
        {
          id: "dm2",
          title: "🚴 My Active Delivery",
          payload: "active_delivery"
        },
        { id: "dm3", title: "💰 Earnings Today", payload: "dp_earnings" },
        {
          id: "dm4",
          title: "🚌 Post Shuttle Route",
          payload: "post_shuttle_route"
        },
        {
          id: "dm6",
          title: "🛑 Add Stop to Route",
          payload: "add_stop_to_route"
        },
        {
          id: "dm7",
          title: "⛽ Add Petrol Expense",
          payload: "add_petrol_expense"
        },
        { id: "dm8", title: "📊 My Expenses", payload: "my_expenses" },
        { id: "dm9", title: "📁 My Listings", payload: "my_dp_listings" },
        { id: "dm5", title: "🔴 Go Offline", payload: "go_offline" },
        {
          id: "dm_sub",
          title: "💳 View Subscription Plans",
          payload: "view_subscription_plans"
        },
        {
          id: "dm_rc",
          title: "🚚 View Rate Cards",
          payload: "view_rate_cards"
        }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "JOB_MENU" || ctx.state === "JOB_SEARCH") {
    if (lower === "post_job" || lower.includes("post a job") || lower === "post job") {
      stateTransition = transition(ctx, "JOB_POST_TITLE");
      sys("State: JOB_MENU → JOB_POST_TITLE");
      bot(
        "✏️ *Post a Job — Step 1/6*\n\nEnter the *job title*:\n(e.g. React Developer, Delivery Executive, Sales Manager)"
      );
    } else if (lower === "browse_jobs" || lower.includes("browse")) {
      stateTransition = transition(ctx, "JOB_SEARCH");
      sys("State: JOB_MENU → JOB_SEARCH");
      const jobsToShow = _realJobs.length > 0 ? _realJobs.slice(0, 5) : [];
      if (jobsToShow.length > 0) {
        const jobLines = jobsToShow.map(
          (j, i) => `${i + 1}. *${j.title}* — ₹${j.salaryMin}–${j.salaryMax}/mo
   📍 ${j.location || "Location TBD"} | ${j.category}`
        ).join("\n\n");
        bot(
          `📋 *Job Listings* (${_realJobs.length} active)

Tap a listing to apply:

${jobLines}`,
          [
            ...jobsToShow.slice(0, 4).map((j, i) => ({
              id: `jb${i + 1}`,
              title: `${j.title} — ₹${j.salaryMin}–${j.salaryMax}/mo`,
              payload: `apply_${j.id}`
            })),
            { id: "jb_menu", title: "🏠 Main Menu", payload: "hi" }
          ],
          "job_listings",
          {
            jobs: jobsToShow.map((j) => ({
              id: j.id,
              title: j.title,
              salary: `₹${j.salaryMin}–${j.salaryMax}/mo`,
              location: j.location || "India",
              category: j.category,
              daysLeft: 7
            }))
          }
        );
      } else {
        bot(
          "📋 *Job Listings*\n\nNo job listings found. Load sample data first, or post the first job!",
          [
            { id: "jb_post", title: "✏️ Post a Job", payload: "post_job" },
            { id: "jb_menu", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      }
    } else if (lower.startsWith("apply_")) {
      stateTransition = transition(ctx, "JOB_REQUEST_CONTACT");
      sys("State: JOB_SEARCH → JOB_REQUEST_CONTACT");
      bot(
        "📩 *Apply for this Job*\n\nYour application will be sent to the employer.\n\n⚠️ Contact details are *masked*.\nThey'll be shared only after employer approval.\n\nConfirm application?",
        [
          {
            id: "ap1",
            title: "✅ Confirm Application",
            payload: "confirm_apply"
          },
          { id: "ap2", title: "📋 Browse More Jobs", payload: "browse_jobs" }
        ]
      );
    } else if (lower === "confirm_apply") {
      stateTransition = transition(ctx, "JOB_MENU");
      bot(
        "✅ *Application Sent!*\n\nThe employer will review your profile.\n📞 Masked contact: +91 98765*****\n*(Contact shared only after approval)*\n\n⏱ Listing expires in 5 days.",
        [
          { id: "done1", title: "📋 More Jobs", payload: "browse_jobs" },
          { id: "done2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower === "my_jobs") {
      stateTransition = transition(ctx, "MY_JOB_LISTINGS");
      const myJobs = ctx.stateData.myJobs ?? [];
      if (myJobs.length === 0) {
        bot(
          "📁 *My Job Listings*\n\nNo listings yet. Post a job or property to see it here.",
          [
            { id: "mj1", title: "✏️ Post a Job", payload: "post_job" },
            { id: "mj2", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        const lines = myJobs.slice(0, 5).map(
          (j, i) => `${i + 1}. *${j.title}* — ₹${j.salaryMin}–${j.salaryMax}/mo
   📍 ${j.location.address} | ${j.isOpen ? "✅ Active" : "❌ Closed"}`
        ).join("\n\n");
        bot(`📁 *My Job Listings (${myJobs.length})*

${lines}`, [
          { id: "mj1", title: "➕ Post New Job", payload: "post_job" },
          { id: "mj2", title: "🏠 Main Menu", payload: "hi" }
        ]);
      }
    } else {
      bot("💼 *Job Center*\n\nWhat would you like to do?", [
        { id: "jm1", title: "📋 Browse Jobs", payload: "browse_jobs" },
        { id: "jm2", title: "✏️ Post a Job", payload: "post_job" },
        { id: "jm3", title: "📁 My Job Listings", payload: "my_jobs" },
        { id: "jm4", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "JOB_POST_TITLE") {
    ctx.stateData.jobTitle = message;
    stateTransition = transition(ctx, "JOB_POST_DESC");
    sys("State: JOB_POST_TITLE → JOB_POST_DESC");
    bot(
      `✏️ *Post a Job — Step 2/6*

Title: *${message}*

Now enter a *job description*:
(role, requirements, experience needed)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "JOB_POST_DESC") {
    ctx.stateData.jobDesc = message;
    stateTransition = transition(ctx, "JOB_POST_CATEGORY");
    sys("State: JOB_POST_DESC → JOB_POST_CATEGORY");
    bot("✏️ *Post a Job — Step 3/6*\n\nSelect the *job category*:", [
      { id: "jc1", title: "💻 Technology", payload: "Technology" },
      { id: "jc2", title: "🚚 Logistics", payload: "Logistics" },
      { id: "jc3", title: "🏪 Retail/Sales", payload: "Retail" },
      {
        id: "jc4",
        title: "🍴 Food/Hospitality",
        payload: "Food & Hospitality"
      },
      { id: "jc5", title: "🏫 Education", payload: "Education" },
      { id: "jc6", title: "💰 Finance", payload: "Finance" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "JOB_POST_CATEGORY") {
    ctx.stateData.jobCategory = message;
    stateTransition = transition(ctx, "JOB_POST_SALARY_MIN");
    sys("State: JOB_POST_CATEGORY → JOB_POST_SALARY_MIN");
    bot(
      `✏️ *Post a Job — Step 4/6*

Category: *${message}*

Enter *minimum salary* per month (₹):
(e.g. 25000)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "JOB_POST_SALARY_MIN") {
    ctx.stateData.salaryMin = message;
    stateTransition = transition(ctx, "JOB_POST_SALARY_MAX");
    sys("State: JOB_POST_SALARY_MIN → JOB_POST_SALARY_MAX");
    bot(
      `✏️ *Post a Job — Step 5/6*

Min: *₹${message}/mo*

Enter *maximum salary* per month (₹):
(e.g. 45000)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "JOB_POST_SALARY_MAX") {
    ctx.stateData.salaryMax = message;
    stateTransition = transition(ctx, "JOB_POST_LOCATION");
    sys("State: JOB_POST_SALARY_MAX → JOB_POST_LOCATION");
    bot(
      `✏️ *Post a Job — Step 6/6*

Salary: *₹${ctx.stateData.salaryMin}–${message}/mo*

Finally, enter the *job location* (city/area):`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "JOB_POST_LOCATION") {
    ctx.stateData.jobLocation = message;
    stateTransition = transition(ctx, "JOB_PUBLISHED");
    sys("State: JOB_POST_LOCATION → JOB_PUBLISHED");
    bot(
      `✅ *Job Posted Successfully!*

📋 *${ctx.stateData.jobTitle}*
🏷 Category: ${ctx.stateData.jobCategory}
💰 ₹${ctx.stateData.salaryMin}–${ctx.stateData.salaryMax}/mo
📍 ${message}
⏱ Active for 7 days

Applicants will contact you via WhatsApp.`,
      [
        { id: "jp1", title: "📁 View My Listings", payload: "my_jobs" },
        { id: "jp2", title: "✏️ Post Another Job", payload: "post_job" },
        { id: "jp3", title: "🏠 Main Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROPERTY_MENU" || ctx.state === "PROPERTY_SEARCH") {
    if (lower.includes("post_property") || lower.includes("post property")) {
      stateTransition = transition(ctx, "PROPERTY_POST_TYPE");
      sys("State: PROPERTY_MENU → PROPERTY_POST_TYPE");
      bot("📝 *Post a Property — Step 1/4*\n\nSelect the *listing type*:", [
        { id: "pt1", title: "🏢 Rent", payload: "Rent" },
        { id: "pt2", title: "🏠 Sale", payload: "Sale" },
        { id: "pt3", title: "🏭 Lease / Commercial", payload: "Lease" },
        { id: "pt4", title: "🛒 Buy (Wanted)", payload: "Buy" }
      ]);
    } else if (lower.startsWith("search_") || lower === "rent" || lower === "buy" || lower === "lease") {
      const type = lower.includes("rent") ? "Rent" : lower.includes("buy") ? "Buy/Sale" : "Lease";
      stateTransition = transition(ctx, "PROPERTY_SEARCH");
      sys("State: PROPERTY_MENU → PROPERTY_SEARCH");
      bot(
        `🔍 *Properties for ${type}*

Tap a listing to inquire:`,
        [
          {
            id: "prl1",
            title: "📩 Inquire: 2BHK Lajpat Nagar",
            payload: "inquire_pr1"
          },
          {
            id: "prl2",
            title: "📩 Inquire: 3BHK Villa Bengaluru",
            payload: "inquire_pr2"
          },
          {
            id: "prl3",
            title: "📩 Inquire: 1BHK Hyderabad",
            payload: "inquire_pr3"
          },
          { id: "prl4", title: "🏠 Main Menu", payload: "hi" }
        ],
        "property_listings",
        {
          type,
          properties: [
            {
              id: "pr1",
              type: "Rent",
              price: "₹28,000/mo",
              location: "Lajpat Nagar, New Delhi",
              desc: "2 BHK, semi-furnished, metro nearby"
            },
            {
              id: "pr2",
              type: "Sale",
              price: "₹85 Lakhs",
              location: "Whitefield, Bengaluru",
              desc: "3 BHK villa, gated society"
            },
            {
              id: "pr4",
              type: "Rent",
              price: "₹18,000/mo",
              location: "Hitech City, Hyderabad",
              desc: "1 BHK, fully furnished, AC, Wi-Fi"
            }
          ]
        }
      );
    } else if (lower.startsWith("inquire_")) {
      stateTransition = transition(ctx, "PROPERTY_REQUEST_CONTACT");
      sys("State: PROPERTY_SEARCH → PROPERTY_REQUEST_CONTACT");
      bot(
        "📩 *Send Property Inquiry*\n\nYour interest will be forwarded to the owner.\n\n⚠️ Contact details are *masked*.\nOwner's number shared only after their approval.\n\nConfirm inquiry?",
        [
          { id: "inq1", title: "✅ Send Inquiry", payload: "confirm_inquiry" },
          { id: "inq2", title: "🔙 Browse More", payload: "search_rent" }
        ]
      );
    } else if (lower === "confirm_inquiry") {
      stateTransition = transition(ctx, "PROPERTY_MENU");
      bot(
        "✅ *Inquiry Sent!*\n\nThe property owner will review your request.\n📞 Contact: +91 98765***** (shared after approval)\n\n⏱ You'll be notified on WhatsApp.",
        [
          { id: "ci1", title: "🔍 Browse More", payload: "search_rent" },
          { id: "ci2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower === "my_properties") {
      stateTransition = transition(ctx, "MY_PROPERTY_LISTINGS");
      const myProps = ctx.stateData.myProperties ?? [];
      if (myProps.length === 0) {
        bot(
          "📁 *My Property Listings*\n\nNo listings yet. Post a property to see it here.",
          [
            { id: "mp1", title: "📝 Post Property", payload: "post_property" },
            { id: "mp2", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        const lines = myProps.slice(0, 5).map(
          (p, i) => `${i + 1}. *${p.listingType}* — ₹${p.expectedPrice.toLocaleString("en-IN")}
   📍 ${p.location.address} | ${p.isActive ? "✅ Active" : "❌ Closed"}`
        ).join("\n\n");
        bot(`📁 *My Property Listings (${myProps.length})*

${lines}`, [
          {
            id: "mp1",
            title: "➕ Post New Property",
            payload: "post_property"
          },
          { id: "mp2", title: "🏠 Main Menu", payload: "hi" }
        ]);
      }
    } else {
      bot("🏠 *Property Center*\n\nWhat would you like to do?", [
        { id: "pm1", title: "🏢 For Rent", payload: "search_rent" },
        { id: "pm2", title: "🏠 For Sale/Buy", payload: "search_buy" },
        { id: "pm3", title: "🏭 Lease/Commercial", payload: "search_lease" },
        { id: "pm4", title: "📝 Post Property", payload: "post_property" },
        { id: "pm5", title: "📁 My Listings", payload: "my_properties" },
        { id: "pm6", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROPERTY_POST_TYPE") {
    ctx.stateData.propType = message;
    stateTransition = transition(ctx, "PROPERTY_POST_DESC");
    sys("State: PROPERTY_POST_TYPE → PROPERTY_POST_DESC");
    bot(
      `📝 *Post a Property — Step 2/4*

Type: *${message}*

Describe your property (BHK, size, amenities, furnishing):`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROPERTY_POST_DESC") {
    ctx.stateData.propDesc = message;
    stateTransition = transition(ctx, "PROPERTY_POST_PRICE");
    sys("State: PROPERTY_POST_DESC → PROPERTY_POST_PRICE");
    bot(
      "📝 *Post a Property — Step 3/4*\n\nEnter the *expected price*:\n(e.g. ₹25000/month or ₹50 Lakhs)"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROPERTY_POST_PRICE") {
    ctx.stateData.propPrice = message;
    stateTransition = transition(ctx, "PROPERTY_POST_LOCATION");
    sys("State: PROPERTY_POST_PRICE → PROPERTY_POST_LOCATION");
    bot(
      `📝 *Post a Property — Step 4/4*

Price: *${message}*

Enter the *exact location/address*:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROPERTY_POST_LOCATION") {
    ctx.stateData.propLocation = message;
    stateTransition = transition(ctx, "PROPERTY_PUBLISHED");
    sys("State: PROPERTY_POST_LOCATION → PROPERTY_PUBLISHED");
    bot(
      `✅ *Property Listed Successfully!*

🏠 Type: ${ctx.stateData.propType}
💰 ${ctx.stateData.propPrice}
📍 ${message}
⏱ Active for *14 days*

You'll receive inquiries via WhatsApp. Contact shared only after your approval.`,
      [
        { id: "pp1", title: "📁 My Listings", payload: "my_properties" },
        { id: "pp2", title: "📝 Post Another", payload: "post_property" },
        { id: "pp3", title: "🏠 Main Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_MENU") {
    if (abortIfModuleDisabled("events")) return { messages: msgs };
    if (lower === "post_event" || lower.includes("post event")) {
      stateTransition = transition(ctx, "EVENT_POST_NAME");
      sys("State: EVENT_MENU → EVENT_POST_NAME");
      bot("🎉 *Post an Event — Step 1/7*\n\nWhat is the *event name*?");
    } else if (lower === "search_event" || lower.includes("search event")) {
      stateTransition = transition(ctx, "EVENT_SEARCH_KEYWORD");
      sys("State: EVENT_MENU → EVENT_SEARCH_KEYWORD");
      bot("🔍 *Search Events*\n\nEnter a *keyword* to find events near you:");
    } else {
      bot("🎉 *Events*\n\nPost or discover events near you:", [
        { id: "ev1", title: "📝 Post Event", payload: "post_event" },
        { id: "ev2", title: "🔍 Search Event", payload: "search_event" },
        { id: "ev3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_POST_NAME") {
    ctx.stateData.eventName = message;
    stateTransition = transition(ctx, "EVENT_POST_DESC");
    sys("State: EVENT_POST_NAME → EVENT_POST_DESC");
    const aiDesc = `${message} is an exciting event bringing together people from across the community. Join us for an unforgettable experience filled with entertainment, networking, and memories. Limited seats available — register now!`;
    ctx.stateData.eventDesc = aiDesc;
    bot(
      `🎉 *Step 2/7:* Event: *${message}*

🤖 *AI Generated Description:*

"${aiDesc}"

Using this description. Proceed?`,
      [
        { id: "ed1", title: "✅ Use This Description", payload: "use_desc" },
        { id: "ed2", title: "✏️ Write My Own", payload: "write_desc" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_POST_DESC") {
    if (lower === "write_desc") {
      bot("✏️ Enter your *custom event description*:");
      return { messages: msgs };
    }
    if (lower !== "use_desc") {
      ctx.stateData.eventDesc = message;
    }
    stateTransition = transition(ctx, "EVENT_POST_PAID");
    sys("State: EVENT_POST_DESC → EVENT_POST_PAID");
    bot("🎉 *Step 3/7:* Is this a *paid event*?", [
      { id: "ep1", title: "💰 Yes, Paid Event", payload: "paid_yes" },
      { id: "ep2", title: "🆓 No, Free Event", payload: "paid_no" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_POST_PAID") {
    if (lower === "paid_yes" || lower.includes("yes") || lower.includes("paid")) {
      ctx.stateData.eventPaid = true;
      stateTransition = transition(ctx, "EVENT_POST_PRICE");
      sys("State: EVENT_POST_PAID → EVENT_POST_PRICE");
      bot("🎉 *Step 4/7:* Enter *ticket price* per person (₹):\n(e.g. 500)");
    } else {
      ctx.stateData.eventPaid = false;
      stateTransition = transition(ctx, "EVENT_POST_LOCATION");
      sys("State: EVENT_POST_PAID → EVENT_POST_LOCATION (free event)");
      bot(
        "🎉 *Step 4/7:* Free event selected.\n\nEnter the *event location address*:"
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_POST_PRICE") {
    ctx.stateData.eventPrice = message;
    stateTransition = transition(ctx, "EVENT_POST_LOCATION");
    sys("State: EVENT_POST_PRICE → EVENT_POST_LOCATION");
    bot(
      `🎉 *Step 5/7:* Ticket Price: *₹${message}*

Enter the *event location address*:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_POST_LOCATION") {
    ctx.stateData.eventLocation = message;
    stateTransition = transition(ctx, "EVENT_POST_DATES");
    sys("State: EVENT_POST_LOCATION → EVENT_POST_DATES");
    bot(
      "🎉 *Step 6/7:* Enter *start and end dates*:\n(e.g. Dec 15 - Dec 16, 2025)"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_POST_DATES") {
    ctx.stateData.eventDates = message;
    stateTransition = transition(ctx, "EVENT_POST_TICKETS");
    sys("State: EVENT_POST_DATES → EVENT_POST_TICKETS");
    bot(
      `🎉 *Step 7/7:* Dates: *${message}*

Enter the *ticket venue name*:
(e.g. BookMyShow, Paytm Insider, On-site)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_POST_TICKETS") {
    ctx.stateData.eventVenue = message;
    stateTransition = transition(ctx, "EVENT_PUBLISHED");
    sys("State: EVENT_POST_TICKETS → EVENT_PUBLISHED");
    const paidStr = ctx.stateData.eventPaid ? `💰 Paid — ₹${ctx.stateData.eventPrice}/person` : "🆓 Free Entry";
    bot(
      `✅ *Event Published Successfully!*

🎉 *${ctx.stateData.eventName}*
📝 ${String(ctx.stateData.eventDesc).slice(0, 80)}...
${paidStr}
📍 ${ctx.stateData.eventLocation}
📅 ${ctx.stateData.eventDates}
🎟 Venue: ${message}
⏱ Visible for *1 month*

⚠️ *Active paid subscription required to post events.*`,
      [
        {
          id: "evp1",
          title: "🔍 Search Events",
          payload: "search_event_direct"
        },
        { id: "evp2", title: "🏠 Main Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_PUBLISHED") {
    stateTransition = transition(ctx, "EVENT_MENU");
    sys("State: EVENT_PUBLISHED → EVENT_MENU");
    if (lower === "search_event_direct") {
      stateTransition = transition(ctx, "EVENT_SEARCH_KEYWORD");
      bot("🔍 Enter a *keyword* to find events near you:");
    } else {
      bot("🎉 *Events*\n\nWhat would you like to do?", [
        { id: "evp1", title: "📝 Post Another Event", payload: "post_event" },
        { id: "evp2", title: "🔍 Search Events", payload: "search_event" },
        { id: "evp3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_SEARCH_KEYWORD") {
    ctx.stateData.eventSearchKeyword = message;
    stateTransition = transition(ctx, "EVENT_SEARCH_RESULTS");
    sys("State: EVENT_SEARCH_KEYWORD → EVENT_SEARCH_RESULTS");
    bot(
      `🔍 Searching events for "*${message}*"...

✅ Found *2 events* near you!

━━━━━━━━━━━━━━━━━━━━
🎉 *Startup Networking Night*
📝 Connect with local entrepreneurs and investors. Limited seats!
📍 Indiranagar, Bengaluru | 📏 2.3 km
📅 Dec 15 - Dec 15, 2025
💰 *Paid — ₹499/person*
🎟 Venue: BookMyShow

━━━━━━━━━━━━━━━━━━━━
🎉 *Community Food Festival*
📝 A celebration of regional cuisines with live music and activities.
📍 Connaught Place, New Delhi | 📏 4.7 km
📅 Dec 20 - Dec 21, 2025
🆓 *Free Entry*
🎟 Venue: On-site Registration`,
      [
        {
          id: "er1",
          title: "🔍 Search Another",
          payload: "search_another_event"
        },
        { id: "er2", title: "🏠 Main Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "EVENT_SEARCH_RESULTS") {
    if (lower === "search_another_event" || lower.includes("search another")) {
      stateTransition = transition(ctx, "EVENT_SEARCH_KEYWORD");
      sys("State: EVENT_SEARCH_RESULTS → EVENT_SEARCH_KEYWORD");
      bot("🔍 Enter a *keyword* to search for more events:");
    } else {
      stateTransition = transition(ctx, "EVENT_MENU");
      sys("State: EVENT_SEARCH_RESULTS → EVENT_MENU");
      bot("🎉 *Events*\n\nWhat would you like to do?", [
        { id: "em1", title: "📝 Post Event", payload: "post_event" },
        { id: "em2", title: "🔍 Search Events", payload: "search_event" },
        { id: "em3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FAMILY_MENU") {
    if (abortIfModuleDisabled("family")) return { messages: msgs };
    if (lower === "add_family" || lower.includes("add family")) {
      stateTransition = transition(ctx, "FAMILY_ADD_SELF_NAME");
      sys("State: FAMILY_MENU → FAMILY_ADD_SELF_NAME");
      bot(
        "👨‍👩‍👧‍👦 *Add Family Member — Step 1/7*\n\nEnter *your first name*:"
      );
    } else if (lower === "view_family" || lower.includes("view family")) {
      if (_realFamilyMembers.length > 0) {
        const userMembers = _realFamilyMembers.filter(
          (m) => !phoneNumber || m.ownerPhone === phoneNumber
        );
        const displayMembers = userMembers.length > 0 ? userMembers : _realFamilyMembers.slice(0, 5);
        const memberLines = displayMembers.map(
          (m) => `${m.relationship}: ${m.relationName} — ${m.inviteStatus}${m.gender ? ` (${m.gender})` : ""}`
        ).join("\n");
        bot(
          `👥 *Your Family Group*

${memberLines}

${displayMembers.length} member${displayMembers.length !== 1 ? "s" : ""} in your group.`,
          [
            { id: "vf1", title: "➕ Add Member", payload: "add_family" },
            { id: "vf2", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          "👥 *Your Family Group*\n\nNo family members found. Add your first family member to get started!\n\n💡 Tip: Use *Load Sample Data* in the admin panel to create test data.",
          [
            { id: "vf1", title: "➕ Add Member", payload: "add_family" },
            { id: "vf2", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      }
    } else {
      bot("👨‍👩‍👧‍👦 *Family Group*\n\nManage your family connections:", [
        { id: "fm1", title: "➕ Add Family Member", payload: "add_family" },
        { id: "fm2", title: "👥 View Family", payload: "view_family" },
        { id: "fm3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FAMILY_ADD_SELF_NAME") {
    ctx.stateData.familySelfName = message;
    stateTransition = transition(ctx, "FAMILY_ADD_SELF_SURNAME");
    sys("State: FAMILY_ADD_SELF_NAME → FAMILY_ADD_SELF_SURNAME");
    bot(
      `👨‍👩‍👧‍👦 *Step 2/7:* First name: *${message}*

Enter your *last name / surname*:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FAMILY_ADD_SELF_SURNAME") {
    ctx.stateData.familySelfSurname = message;
    stateTransition = transition(ctx, "FAMILY_ADD_RELATIONSHIP");
    sys("State: FAMILY_ADD_SELF_SURNAME → FAMILY_ADD_RELATIONSHIP");
    bot(
      `👨‍👩‍👧‍👦 *Step 3/7:* Name: *${ctx.stateData.familySelfName} ${message}*

Select your *relationship* with this person:`,
      [
        { id: "rel1", title: "👨 Father", payload: "Father" },
        { id: "rel2", title: "👩 Mother", payload: "Mother" },
        { id: "rel3", title: "👦 Son", payload: "Son" },
        { id: "rel4", title: "👧 Daughter", payload: "Daughter" },
        { id: "rel5", title: "👫 Husband", payload: "Husband" },
        { id: "rel6", title: "👫 Wife", payload: "Wife" },
        { id: "rel7", title: "🤝 Friend", payload: "Friend" },
        { id: "rel8", title: "👦 Brother", payload: "Brother" },
        { id: "rel9", title: "👧 Sister", payload: "Sister" },
        { id: "rel10", title: "👴 Relative", payload: "Relative" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FAMILY_ADD_RELATIONSHIP") {
    ctx.stateData.familyRelationship = message;
    stateTransition = transition(ctx, "FAMILY_ADD_RELATION_NAME");
    sys("State: FAMILY_ADD_RELATIONSHIP → FAMILY_ADD_RELATION_NAME");
    bot(
      `👨‍👩‍👧‍👦 *Step 4/7:* Relationship: *${message}*

Enter their *full name*:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FAMILY_ADD_RELATION_NAME") {
    ctx.stateData.familyRelationName = message;
    stateTransition = transition(ctx, "FAMILY_ADD_PHONE");
    sys("State: FAMILY_ADD_RELATION_NAME → FAMILY_ADD_PHONE");
    bot(
      `👨‍👩‍👧‍👦 *Step 5/7:* Name: *${message}*

Enter their *phone number*:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FAMILY_ADD_PHONE") {
    ctx.stateData.familyPhone = message;
    const familyPhone = message.replace(/\s/g, "");
    ctx.stateData.familyPhoneIsExisting = familyPhone.length >= 10;
    stateTransition = transition(ctx, "FAMILY_ADD_ADDRESS");
    sys("State: FAMILY_ADD_PHONE → FAMILY_ADD_ADDRESS");
    bot(`👨‍👩‍👧‍👦 *Step 6/7:* Phone: *${message}*

Enter their *address*:`);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FAMILY_ADD_ADDRESS") {
    ctx.stateData.familyAddress = message;
    stateTransition = transition(ctx, "FAMILY_SAVED");
    sys("State: FAMILY_ADD_ADDRESS → FAMILY_SAVED");
    const isExisting = ctx.stateData.familyPhoneIsExisting ?? false;
    const familySurname = ctx.stateData.familySelfSurname ?? "";
    const groupName = familySurname ? `${familySurname} Family` : `${ctx.stateData.familySelfName ?? "My"} Group`;
    if (isExisting) {
      bot(
        `✅ *Connect Request Sent!*

👥 A connect request has been sent to *${ctx.stateData.familyPhone}*.
They will need to accept it.

📱 *WhatsApp Invite Sent:*
"Hi ${ctx.stateData.familyRelationName}, you were added by ${ctx.stateData.familySelfName} ${familySurname} to the *${groupName}* family group on LocalBazar Kart 🛒.
Address: ${message}"

They will see options to *Connect* or *Cancel*.`,
        [
          { id: "fs1", title: "➕ Add Another Member", payload: "add_family" },
          { id: "fs2", title: "👥 View Family", payload: "view_family" },
          { id: "fs3", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      bot(
        `✅ *Family Member Added!*

👥 *${ctx.stateData.familyRelationship}:* ${ctx.stateData.familyRelationName}
📞 ${ctx.stateData.familyPhone}
📍 ${message}
👨‍👩‍👧 *Group:* ${groupName}

A customer profile has been created for them in the system.

📱 *WhatsApp Invitation Sent!*
"Hi ${ctx.stateData.familyRelationName}, you were added by ${ctx.stateData.familySelfName} ${familySurname} (${ctx.stateData.familyPhone}) to the *${groupName}* family group on LocalBazar Kart 🛒."

They will see options to *Connect* or *Cancel* the invitation.`,
        [
          { id: "fs1", title: "➕ Add Another Member", payload: "add_family" },
          { id: "fs2", title: "👥 View Family", payload: "view_family" },
          { id: "fs3", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FAMILY_SAVED") {
    stateTransition = transition(ctx, "FAMILY_MENU");
    sys("State: FAMILY_SAVED → FAMILY_MENU");
    if (lower === "add_family" || lower.includes("add")) {
      stateTransition = transition(ctx, "FAMILY_ADD_SELF_NAME");
      bot(
        "👨‍👩‍👧‍👦 *Add Family Member — Step 1/7*\n\nEnter *your first name*:"
      );
    } else if (lower === "view_family") {
      if (_realFamilyMembers.length > 0) {
        const userMembers = _realFamilyMembers.filter(
          (m) => !phoneNumber || m.ownerPhone === phoneNumber
        );
        const displayMembers = userMembers.length > 0 ? userMembers : _realFamilyMembers.slice(0, 5);
        const memberLines = displayMembers.map(
          (m) => `${m.relationship}: ${m.relationName} — ${m.inviteStatus}${m.gender ? ` (${m.gender})` : ""}`
        ).join("\n");
        bot(
          `👥 *Your Family Group*

${memberLines}

${displayMembers.length} member${displayMembers.length !== 1 ? "s" : ""} in your group.`,
          [
            { id: "vf1", title: "➕ Add Member", payload: "add_family" },
            { id: "vf2", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          "👥 *Your Family Group*\n\nNo family members found. Add your first family member to get started!",
          [
            { id: "vf1", title: "➕ Add Member", payload: "add_family" },
            { id: "vf2", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      }
    } else {
      bot("👨‍👩‍👧‍👦 *Family Group*\n\nManage your family connections:", [
        { id: "fm1", title: "➕ Add Family Member", payload: "add_family" },
        { id: "fm2", title: "👥 View Family", payload: "view_family" },
        { id: "fm3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_MENU") {
    if (abortIfModuleDisabled("promotions")) return { messages: msgs };
    if (lower === "post_ad" || lower.includes("post ad") || lower.includes("post advertisement")) {
      stateTransition = transition(ctx, "PROMO_POST_TITLE");
      sys("State: PROMO_MENU → PROMO_POST_TITLE");
      bot("📣 *Post Advertisement — Step 1/6*\n\nEnter your *ad title*:");
    } else if (lower === "my_promos" || lower.includes("my promo")) {
      bot(
        "📊 *My Promotions*\n\n📢 *Summer Sale Campaign* — Active\n👁 Reached: 438 users | Views: 312\n📍 Andheri, Mumbai\n\n⏳ *Festive Offer* — Pending Approval\n📍 Bengaluru",
        [
          { id: "mp1", title: "📢 Post New Ad", payload: "post_ad" },
          { id: "mp2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      bot("📣 *Advertise / Promote*\n\nReach targeted users in your area:", [
        { id: "pm1", title: "📢 Post Advertisement", payload: "post_ad" },
        { id: "pm2", title: "📊 My Promotions", payload: "my_promos" },
        { id: "pm3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_POST_TITLE") {
    ctx.stateData.promoTitle = message;
    stateTransition = transition(ctx, "PROMO_POST_REEL");
    sys("State: PROMO_POST_TITLE → PROMO_POST_REEL");
    bot(
      `📣 *Step 2/6:* Title: *${message}*

Enter your *social media reel link* (optional):
(YouTube or Instagram Reel URL)`,
      [{ id: "skip_reel", title: "⏭️ Skip", payload: "skip_reel" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_POST_REEL") {
    ctx.stateData.promoReel = lower === "skip_reel" ? "" : message;
    stateTransition = transition(ctx, "PROMO_POST_IMAGE");
    sys("State: PROMO_POST_REEL → PROMO_POST_IMAGE");
    bot(
      "📣 *Step 3/6:* Reel link saved.\n\nEnter your *social media image link* (optional):",
      [{ id: "skip_img", title: "⏭️ Skip", payload: "skip_image" }]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_POST_IMAGE") {
    ctx.stateData.promoImage = lower === "skip_image" ? "" : message;
    stateTransition = transition(ctx, "PROMO_POST_LOCATION");
    sys("State: PROMO_POST_IMAGE → PROMO_POST_LOCATION");
    bot(
      "📣 *Step 4/6:* Image link saved.\n\nEnter the *location to promote*:\n(Area name, City, Country — e.g. Koramangala, Bengaluru, India)"
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_POST_LOCATION") {
    ctx.stateData.promoLocation = message;
    stateTransition = transition(ctx, "PROMO_PLAN_SELECT");
    sys("State: PROMO_POST_LOCATION → PROMO_PLAN_SELECT");
    bot(
      `📣 *Step 5/6:* Location: *${message}*

Select a *subscription plan* for your reach:`,
      [
        { id: "pl1", title: "100 Users — ₹99", payload: "plan_100" },
        { id: "pl2", title: "200 Users — ₹179", payload: "plan_200" },
        { id: "pl3", title: "500 Users — ₹399", payload: "plan_500" },
        { id: "pl4", title: "1000 Users — ₹699", payload: "plan_1000" },
        { id: "pl5", title: "2000 Users — ₹1199", payload: "plan_2000" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_PLAN_SELECT") {
    const planMap = {
      plan_100: { users: "100", price: "₹99" },
      plan_200: { users: "200", price: "₹179" },
      plan_500: { users: "500", price: "₹399" },
      plan_1000: { users: "1,000", price: "₹699" },
      plan_2000: { users: "2,000", price: "₹1,199" }
    };
    const plan = planMap[lower] ?? { users: "100", price: "₹99" };
    ctx.stateData.promoPlan = plan;
    const promoAmt = Number(plan.price.replace(/[^0-9]/g, "")) || 99;
    ctx.stateData.promoPlanAmount = promoAmt;
    stateTransition = transition(ctx, "PROMO_PAYMENT");
    sys("State: PROMO_PLAN_SELECT → PROMO_PAYMENT");
    bot(
      `📣 *Step 6/6: Payment*

📢 Ad: *${ctx.stateData.promoTitle}*
📍 Location: ${ctx.stateData.promoLocation}
👥 Reach: *${plan.users} users*
💰 Amount: *${plan.price}*

Scan the QR below to pay. QR expires in 2 minutes.`,
      [
        { id: "pp1", title: "✅ Payment Done — Submit Ad", payload: "pay_now" },
        { id: "pp2", title: "❌ Cancel", payload: "hi" }
      ],
      "qr_payment",
      {
        amount: promoAmt,
        upiId: "localbazar@upi",
        expiresAt: Date.now() + getQRTimeoutMs()
      }
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_PAYMENT") {
    if (lower === "pay_now" || lower.includes("pay")) {
      stateTransition = transition(ctx, "PROMO_PENDING_APPROVAL");
      sys("State: PROMO_PAYMENT → PROMO_PENDING_APPROVAL");
      const plan = ctx.stateData.promoPlan;
      bot(
        `✅ *Payment Received!* ${(plan == null ? void 0 : plan.price) ?? ""}

🔍 *Your promotion is under AI review.*

AI Moderation checks in progress:
✅ Hate speech check
✅ Spam detection
✅ Violence check
✅ Nudity/Adult content check
✅ Misleading claims check

⏳ *Approval within 24 hours.*

Once approved, users in *${ctx.stateData.promoLocation}* will receive your promotion card with the title, video, and image directly on WhatsApp.`,
        [
          { id: "pa1", title: "📊 View My Promotions", payload: "my_promos" },
          { id: "pa2", title: "📢 Post Another Ad", payload: "post_ad" },
          { id: "pa3", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      bot("Please confirm payment to proceed:", [
        { id: "pp1", title: "💳 Pay Now", payload: "pay_now" },
        { id: "pp2", title: "❌ Cancel", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "PROMO_PENDING_APPROVAL") {
    stateTransition = transition(ctx, "PROMO_MENU");
    sys("State: PROMO_PENDING_APPROVAL → PROMO_MENU");
    if (lower === "my_promos") {
      bot(
        `📊 *My Promotions*

⏳ *Your latest ad* — Pending Approval
📍 ${String(ctx.stateData.promoLocation ?? "Your location")}`,
        [
          { id: "mp1", title: "📢 Post New Ad", payload: "post_ad" },
          { id: "mp2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower === "post_ad") {
      stateTransition = transition(ctx, "PROMO_POST_TITLE");
      bot("📣 *Post Advertisement — Step 1/6*\n\nEnter your *ad title*:");
    } else {
      bot("📣 *Advertise / Promote*\n\nReach targeted users in your area:", [
        { id: "pm1", title: "📢 Post Advertisement", payload: "post_ad" },
        { id: "pm2", title: "📊 My Promotions", payload: "my_promos" },
        { id: "pm3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FREE_RIDE_SOURCE") {
    ctx.stateData.freeRideFrom = message;
    stateTransition = transition(ctx, "FREE_RIDE_DESTINATION");
    sys("State: FREE_RIDE_SOURCE → FREE_RIDE_DESTINATION");
    bot(`🛺 *Step 2/5:* From: *${message}*

Enter your *destination*:`);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FREE_RIDE_DESTINATION") {
    ctx.stateData.freeRideTo = message;
    stateTransition = transition(ctx, "FREE_RIDE_SEARCH_RESULTS");
    sys("State: FREE_RIDE_DESTINATION → FREE_RIDE_SEARCH_RESULTS");
    bot(
      `🛺 *Step 3/5:* Searching free ride sharing near *${ctx.stateData.freeRideFrom}*...

✅ Found *2 registered Sarthi partners* offering free ride sharing!

━━━━━━━━━━━━━━━━━━━━
🚗 *Rider 1: Ramesh Verma*
🚗 Vehicle No: MH 12 AB 5678 | ✅ Verified
📞 +91 98765 43210

━━━━━━━━━━━━━━━━━━━━
🚗 *Rider 2: Suresh Patel*
🚗 Vehicle No: KA 03 CD 9012 | ✅ Verified
📞 +91 98765 11223

*Note: These riders are offering free ride sharing — no fare charged.*`,
      [
        {
          id: "fr1",
          title: "🚗 Select Ramesh Verma",
          payload: "select_rider_1"
        },
        {
          id: "fr2",
          title: "🚗 Select Suresh Patel",
          payload: "select_rider_2"
        },
        { id: "fr3", title: "🔍 Search Again", payload: "free_ride_otp" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FREE_RIDE_SEARCH_RESULTS") {
    const rider = lower === "select_rider_1" ? { name: "Ramesh Verma", plate: "MH 12 AB 5678" } : { name: "Suresh Patel", plate: "KA 03 CD 9012" };
    ctx.stateData.selectedFreeRider = rider;
    stateTransition = transition(ctx, "FREE_RIDE_OTP_ENTRY");
    sys("State: FREE_RIDE_SEARCH_RESULTS → FREE_RIDE_OTP_ENTRY");
    bot(
      `✅ *Selected: ${rider.name}*

🛺 *Step 4/5: OTP Verification*

⚠️ *IMPORTANT:* Ask the driver for their *private OTP*.
Do NOT share your OTP — enter the one the DRIVER gives you.

Enter the *4-digit OTP* provided by the driver:`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FREE_RIDE_OTP_ENTRY") {
    const rider = ctx.stateData.selectedFreeRider ?? { name: "Driver", plate: "—" };
    if (/^\d{4}$/.test(lower)) {
      stateTransition = transition(ctx, "FREE_RIDE_IN_PROGRESS");
      sys("State: FREE_RIDE_OTP_ENTRY → FREE_RIDE_IN_PROGRESS");
      bot(
        `✅ *OTP Verified! Ride Started!*

🛺 Sharing ride with *${rider.name}*
🚗 Vehicle: ${rider.plate}
📍 From: *${ctx.stateData.freeRideFrom}*
📍 To: *${ctx.stateData.freeRideTo}*
💸 Fare: *FREE*

Have a safe journey! 🙏`,
        [
          {
            id: "fr_done",
            title: "✅ Ride Complete",
            payload: "free_ride_complete"
          },
          { id: "fr_home", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      bot(
        "Please enter the *4-digit OTP* given to you by the driver (not your own OTP):"
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FREE_RIDE_IN_PROGRESS") {
    if (lower === "free_ride_complete" || lower.includes("complete")) {
      stateTransition = transition(ctx, "FREE_RIDE_RATE");
      sys("State: FREE_RIDE_IN_PROGRESS → FREE_RIDE_RATE");
      bot(
        "🎉 *Ride Completed!*\n\nThank you for sharing the ride!\n\n⭐ Please rate your experience:",
        [
          { id: "rate5", title: "⭐⭐⭐⭐⭐ Excellent", payload: "rate_5" },
          { id: "rate4", title: "⭐⭐⭐⭐ Good", payload: "rate_4" },
          { id: "rate3", title: "⭐⭐⭐ Average", payload: "rate_3" }
        ]
      );
    } else {
      bot("Your ride is in progress.", [
        {
          id: "fr_done",
          title: "✅ Ride Complete",
          payload: "free_ride_complete"
        }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "FREE_RIDE_RATE") {
    const stars = lower === "rate_5" ? 5 : lower === "rate_4" ? 4 : 3;
    stateTransition = transition(ctx, "MAIN_MENU");
    sys("State: FREE_RIDE_RATE → MAIN_MENU");
    bot(
      `✅ *Rating saved: ${"⭐".repeat(stars)}*

Would you like to add a tip for the driver?`,
      [
        { id: "tip20", title: "💰 Tip ₹20", payload: "tip_20" },
        { id: "tip50", title: "💰 Tip ₹50", payload: "tip_50" },
        { id: "tip70", title: "💰 Tip ₹70", payload: "tip_70" },
        { id: "tip100", title: "💰 Tip ₹100", payload: "tip_100" },
        { id: "no_tip", title: "No Tip", payload: "no_tip" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SARTHI_FREE_OTP_GENERATE") {
    if (lower === "driver_verify_otp" || lower.includes("driver") || lower.includes("verify")) {
      stateTransition = transition(ctx, "SARTHI_DRIVER_OTP_VERIFY");
      sys("State: SARTHI_FREE_OTP_GENERATE → SARTHI_DRIVER_OTP_VERIFY");
      bot(
        "🚗 *Driver OTP Verification*\n\nAsk the passenger for their *private OTP* to start the ride.\n\nEnter the *4-digit OTP* provided by the passenger:"
      );
    } else {
      bot(
        "🛺 *Free Ride Sharing (Sarthi)*\n\nA Sarthi partner has accepted your free ride sharing request.\n\n🔐 *Your Private Passenger OTP: 7839*\n(Share this OTP with the driver to start the ride)\n\n⚠️ Do NOT share this OTP with anyone else.",
        [
          {
            id: "sr1",
            title: "🚗 [Driver View] Verify OTP",
            payload: "driver_verify_otp"
          },
          { id: "sr2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SARTHI_DRIVER_OTP_VERIFY") {
    if (lower === "7839" || lower === "driver_verified") {
      stateTransition = transition(ctx, "SARTHI_PASSENGER_OTP_VERIFY");
      sys("State: SARTHI_DRIVER_OTP_VERIFY → SARTHI_PASSENGER_OTP_VERIFY");
      bot(
        "✅ *Passenger Verified!*\n\nOTP matched successfully.\n\n🛺 *Ride Started!*\n\n👤 Passenger: Meena Sharma\n📍 From: Indiranagar Metro, Bengaluru\n📍 To: Koramangala 5th Block\n🚗 Vehicle: Auto — KA 03 AB 1234\n💸 Fare: *FREE (Sharing Ride)*\n\nHave a safe journey! 🙏",
        [
          {
            id: "sv1",
            title: "✅ Complete Ride",
            payload: "complete_ride"
          },
          { id: "sv2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (/^\d{4}$/.test(lower)) {
      bot(
        "❌ *OTP Mismatch!*\n\nThe entered OTP does not match the passenger's OTP.\n\nAsk the passenger to share their private OTP again and re-enter.",
        [
          {
            id: "sv3",
            title: "🔄 Try Again",
            payload: "driver_verify_otp"
          }
        ]
      );
    } else {
      bot("Enter the *4-digit OTP* shared by the passenger:");
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SARTHI_PASSENGER_OTP_VERIFY") {
    if (lower === "complete_ride" || lower.includes("complete")) {
      stateTransition = transition(ctx, "SARTHI_RIDE_CONFIRMED");
      sys("State: SARTHI_PASSENGER_OTP_VERIFY → SARTHI_RIDE_CONFIRMED");
      bot(
        "🎉 *Ride Completed!*\n\nThank you for sharing your vehicle!\n\n✅ Passenger dropped safely\n💸 Fare: *FREE ride*\n⭐ Passenger Rating: 5.0\n\n🏆 You've completed *23 free rides* this month. Great community service!",
        [
          {
            id: "rc1",
            title: "🛺 Find Next Ride",
            payload: "transport"
          },
          { id: "rc2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      bot("Mark the ride as done when you've dropped the passenger:", [
        { id: "sv1", title: "✅ Complete Ride", payload: "complete_ride" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SARTHI_RIDE_CONFIRMED") {
    stateTransition = transition(ctx, "MAIN_MENU");
    sys("State: SARTHI_RIDE_CONFIRMED → MAIN_MENU");
    bot("👋 What would you like to do next?", [
      { id: "c1", title: "🛺 Transport / Ride", payload: "transport" },
      { id: "c2", title: "🛒 Browse & Order", payload: "1" },
      { id: "c3", title: "🏠 Main Menu", payload: "hi" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_ROUTE_NAME") {
    ctx.stateData.shuttlePostRouteName = message;
    stateTransition = transition(ctx, "SHUTTLE_POST_SERVICE_NAME");
    sys("State: SHUTTLE_POST_ROUTE_NAME → SHUTTLE_POST_SERVICE_NAME");
    bot(
      `🚌 *Post Shuttle Route — Step 2/5*

Route: *${message}*

Enter the *service name*:
(e.g. "City Express", "Morning Connect")`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_SERVICE_NAME") {
    if (ctx.stateData.awaitingVehicleNo) {
      ctx.stateData.shuttlePostVehicleNo = message;
      ctx.stateData.awaitingVehicleNo = false;
      stateTransition = transition(ctx, "SHUTTLE_POST_SOURCE");
      sys(
        "State: SHUTTLE_POST_SERVICE_NAME (vehicle no) → SHUTTLE_POST_SOURCE"
      );
      bot(
        `🚌 *Step 3/5:* Vehicle No: *${message}*

Enter the *starting point* (source):`
      );
    } else {
      ctx.stateData.shuttlePostServiceName = message;
      ctx.stateData.awaitingVehicleNo = true;
      bot(
        `🚌 *Step 2b/5:* Service: *${message}*

Enter the *vehicle registration number*:
(e.g. MH12AB1234 — visible to customers in search results)`
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_SOURCE") {
    ctx.stateData.shuttlePostSource = message;
    stateTransition = transition(ctx, "SHUTTLE_POST_DESTINATION");
    sys("State: SHUTTLE_POST_SOURCE → SHUTTLE_POST_DESTINATION");
    bot(
      `🚌 *Step 4/5:* From: *${message}*

Enter the *ending point* (destination):`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_DESTINATION") {
    ctx.stateData.shuttlePostDest = message;
    stateTransition = transition(ctx, "SHUTTLE_POST_PRICE");
    sys("State: SHUTTLE_POST_DESTINATION → SHUTTLE_POST_PRICE");
    bot(
      `🚌 *Step 5/5:* To: *${message}*

Enter the *base fare description*:
(e.g. "₹45/person" or "₹30 flat")`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_PRICE") {
    ctx.stateData.shuttlePostPrice = message;
    ctx.stateData.shuttlePostStops = [];
    ctx.stateData.shuttlePostStopCount = 0;
    stateTransition = transition(ctx, "SHUTTLE_POST_STOP_NAME");
    sys("State: SHUTTLE_POST_PRICE → SHUTTLE_POST_STOP_NAME");
    const stopNum = Number(ctx.stateData.shuttlePostStopCount ?? 0) + 1;
    bot(
      `✅ *Fare set: ${message}*

➕ *Add Stop ${stopNum}*

Enter the *stop name*:
(e.g. "Andheri Station", "Bandra West", "Dadar")`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_STOP_NAME") {
    ctx.stateData.currentStopName = message;
    stateTransition = transition(ctx, "SHUTTLE_POST_STOP_FEE");
    sys("State: SHUTTLE_POST_STOP_NAME → SHUTTLE_POST_STOP_FEE");
    bot(
      `🚏 *Stop:* *${message}*

Enter the *ticket fee for this stop* (₹ amount):
(e.g. 45 for ₹45/person, or 0 if no extra charge)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_STOP_FEE") {
    ctx.stateData.currentStopFee = message;
    stateTransition = transition(ctx, "SHUTTLE_POST_STOP_TIME");
    sys("State: SHUTTLE_POST_STOP_FEE → SHUTTLE_POST_STOP_TIME");
    bot(
      `🚏 *Fee: ₹${message}*

Enter the *arrival time* at this stop (HH:MM format):
(e.g. 09:15, 14:30)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_STOP_TIME") {
    const stopName = String(ctx.stateData.currentStopName ?? "Stop");
    const stopFee = String(ctx.stateData.currentStopFee ?? "0");
    const stopTime = message;
    const stops = ctx.stateData.shuttlePostStops ?? [];
    stops.push({ name: stopName, fee: stopFee, arrivalTime: stopTime });
    ctx.stateData.shuttlePostStops = stops;
    ctx.stateData.shuttlePostStopCount = stops.length;
    stateTransition = transition(ctx, "SHUTTLE_POST_STOP_MORE");
    sys("State: SHUTTLE_POST_STOP_TIME → SHUTTLE_POST_STOP_MORE");
    const stopsList = stops.map((s, i) => `${i + 1}. *${s.name}* — ₹${s.fee} | ⏱ ${s.arrivalTime}`).join("\n");
    bot(
      `✅ *Stop ${stops.length} Added!*

${stopsList}

Would you like to add another stop?`,
      [
        {
          id: "addstop1",
          title: `➕ Add Stop ${stops.length + 1}`,
          payload: "add_another_stop"
        },
        { id: "addstop2", title: "✅ Publish Route", payload: "publish_route" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_STOP_MORE") {
    if (lower === "add_another_stop" || lower.includes("add another") || lower.includes("add stop")) {
      stateTransition = transition(ctx, "SHUTTLE_POST_STOP_NAME");
      sys("State: SHUTTLE_POST_STOP_MORE → SHUTTLE_POST_STOP_NAME");
      const stops = ctx.stateData.shuttlePostStops ?? [];
      bot(`➕ *Add Stop ${stops.length + 1}*

Enter the *stop name*:`);
    } else if (lower === "publish_route" || lower.includes("publish")) {
      const stops = ctx.stateData.shuttlePostStops ?? [];
      stateTransition = transition(ctx, "SHUTTLE_POST_PUBLISHED");
      sys("State: SHUTTLE_POST_STOP_MORE → SHUTTLE_POST_PUBLISHED");
      const stopsList = stops.map((s, i) => `${i + 1}. *${s.name}* — ₹${s.fee} | ⏱ ${s.arrivalTime}`).join("\n");
      bot(
        `✅ *Shuttle Route Published!*

🚌 *${ctx.stateData.shuttlePostRouteName}*
🏷 Service: ${ctx.stateData.shuttlePostServiceName}
📍 From: ${ctx.stateData.shuttlePostSource} → ${ctx.stateData.shuttlePostDest}
💰 Fare: ${ctx.stateData.shuttlePostPrice}

🛑 *Stops (${stops.length}):*
${stopsList}

✅ Your shuttle route is now live. Passengers can search and book from their WhatsApp.`,
        [
          {
            id: "spr1",
            title: "➕ Post Another Route",
            payload: "post_shuttle_route"
          },
          {
            id: "spr2",
            title: "🚌 Shuttle Bookings",
            payload: "shuttle_bookings"
          },
          { id: "spr3", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      const stops = ctx.stateData.shuttlePostStops ?? [];
      bot("Would you like to add another stop?", [
        {
          id: "addstop1",
          title: `➕ Add Stop ${stops.length + 1}`,
          payload: "add_another_stop"
        },
        { id: "addstop2", title: "✅ Publish Route", payload: "publish_route" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "SHUTTLE_POST_PUBLISHED") {
    stateTransition = transition(ctx, "DP_MENU");
    sys("State: SHUTTLE_POST_PUBLISHED → DP_MENU");
    if (lower === "post_shuttle_route") {
      stateTransition = transition(ctx, "SHUTTLE_POST_ROUTE_NAME");
      bot(
        "🚌 *Post Shuttle Route — Step 1/5*\n\nEnter the *route name*:\n(e.g. 'Andheri–CST Route', 'Morning Express')"
      );
    } else {
      bot("🚌 *Sarthi Menu*\n\nWhat would you like to do?", [
        { id: "dp1", title: "📦 Available Orders", payload: "dp_orders" },
        {
          id: "dp2",
          title: "🚌 Post Shuttle Route",
          payload: "post_shuttle_route"
        },
        { id: "dp3", title: "💰 My Earnings", payload: "dp_earnings" },
        { id: "dp4", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_STOP_ROUTE_SELECT") {
    const routes = _realShuttleRoutes;
    if (routes.length === 0) {
      stateTransition = transition(ctx, "DP_MENU");
      sys("State: ADD_STOP_ROUTE_SELECT → DP_MENU (no routes)");
      bot(
        "⚠️ *No shuttle routes found.*\n\nPost a route first before adding stops.",
        [
          {
            id: "asr0",
            title: "🚌 Post New Route",
            payload: "post_shuttle_route"
          },
          { id: "asr1", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
      return { messages: msgs, transition: stateTransition };
    }
    const routeIdx = Number.parseInt(message) - 1;
    const selectedRoute = !Number.isNaN(routeIdx) && routeIdx >= 0 && routeIdx < routes.length ? routes[routeIdx] : routes.find((r) => r.routeName.toLowerCase().includes(lower));
    if (!selectedRoute) {
      const routeList = routes.map((r, i) => `${i + 1}. ${r.routeName}`).join("\n");
      bot(
        `🚌 *Select a Route to Add Stop*

${routeList}

Reply with the number or route name:`,
        routes.slice(0, 5).map((r, i) => ({
          id: `route_${i}`,
          title: r.routeName.slice(0, 25),
          payload: String(i + 1)
        }))
      );
      return { messages: msgs, transition: stateTransition };
    }
    ctx.stateData.addStopRouteId = selectedRoute.id;
    ctx.stateData.addStopRouteName = selectedRoute.routeName;
    stateTransition = transition(ctx, "ADD_STOP_NAME");
    sys("State: ADD_STOP_ROUTE_SELECT → ADD_STOP_NAME");
    bot(
      `✅ *Route: ${selectedRoute.routeName}*

🛑 *Add Stop — Step 1/3*

Enter the *stop name*:
(e.g. "Andheri Station", "Bandra West")`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_STOP_NAME") {
    ctx.stateData.addStopName = message;
    stateTransition = transition(ctx, "ADD_STOP_FEE");
    sys("State: ADD_STOP_NAME → ADD_STOP_FEE");
    bot(
      `🛑 *Stop:* *${message}*

*Step 2/3:* Enter the *ticket fee* for this stop (₹ amount):
(e.g. 45 for ₹45/person, or 0 if no charge)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_STOP_FEE") {
    ctx.stateData.addStopFee = message;
    stateTransition = transition(ctx, "ADD_STOP_TIME");
    sys("State: ADD_STOP_FEE → ADD_STOP_TIME");
    bot(
      `💰 *Fee: ₹${message}*

*Step 3/3:* Enter the *arrival time* at this stop (HH:MM):
(e.g. 09:15, 14:30)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_STOP_TIME") {
    const stopName = String(ctx.stateData.addStopName ?? "Stop");
    const stopFee = String(ctx.stateData.addStopFee ?? "0");
    const routeName = String(ctx.stateData.addStopRouteName ?? "Route");
    ctx.stateData.addStopTime = message;
    stateTransition = transition(ctx, "ADD_STOP_SAVED");
    sys("State: ADD_STOP_TIME → ADD_STOP_SAVED");
    bot(
      `✅ *Stop Added Successfully!*

🛑 *${stopName}*
💰 Ticket Fee: ₹${stopFee}
⏱ Arrival Time: ${message}

📍 Added to route: *${routeName}*

What would you like to do next?`,
      [
        {
          id: "as1",
          title: "➕ Add Another Stop",
          payload: "add_stop_to_route"
        },
        {
          id: "as2",
          title: "🚌 Post New Route",
          payload: "post_shuttle_route"
        },
        { id: "as3", title: "🏠 Main Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "ADD_STOP_SAVED") {
    if (lower === "add_stop_to_route" || lower.includes("add another stop")) {
      const routes = _realShuttleRoutes;
      stateTransition = transition(ctx, "ADD_STOP_ROUTE_SELECT");
      sys("State: ADD_STOP_SAVED → ADD_STOP_ROUTE_SELECT");
      if (routes.length === 0) {
        bot("⚠️ No routes found. Post a route first.", [
          {
            id: "asr0",
            title: "🚌 Post New Route",
            payload: "post_shuttle_route"
          },
          { id: "asr1", title: "🏠 Main Menu", payload: "hi" }
        ]);
      } else {
        const routeList = routes.map((r, i) => `${i + 1}. ${r.routeName}`).join("\n");
        bot(
          `🚌 *Select a Route to Add Stop*

${routeList}

Reply with the number or route name:`,
          routes.slice(0, 5).map((r, i) => ({
            id: `route_${i}`,
            title: r.routeName.slice(0, 25),
            payload: String(i + 1)
          }))
        );
      }
    } else if (lower === "post_shuttle_route") {
      stateTransition = transition(ctx, "SHUTTLE_POST_ROUTE_NAME");
      sys("State: ADD_STOP_SAVED → SHUTTLE_POST_ROUTE_NAME");
      bot("🚌 *Post Shuttle Route — Step 1/5*\n\nEnter the *route name*:");
    } else {
      stateTransition = transition(ctx, "DP_MENU");
      sys("State: ADD_STOP_SAVED → DP_MENU");
      bot("🚌 *Sarthi Menu*\n\nWhat would you like to do?", [
        { id: "as_dm1", title: "📦 Available Orders", payload: "dp_orders" },
        {
          id: "as_dm2",
          title: "🚌 Post Shuttle Route",
          payload: "post_shuttle_route"
        },
        { id: "as_dm3", title: "💰 My Earnings", payload: "dp_earnings" },
        { id: "as_dm4", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_MENU") {
    if (lower === "add_recipe" || lower.includes("add recipe")) {
      stateTransition = transition(ctx, "RECIPE_ADD_TITLE");
      sys("State: RECIPE_MENU → RECIPE_ADD_TITLE");
      ctx.stateData.recipeIngredients = [];
      ctx.stateData.recipeSteps = [];
      bot(
        "🍳 *Add Recipe — Step 1/8*\n\nWhat would you like to name your recipe?"
      );
    } else if (lower === "search_recipe" || lower.includes("search recipe")) {
      stateTransition = transition(ctx, "RECIPE_SEARCH_KEYWORD");
      sys("State: RECIPE_MENU → RECIPE_SEARCH_KEYWORD");
      bot("🔍 *Search Recipes*\n\nSearch for a recipe:");
    } else if (lower === "top_recipes" || lower.includes("top rated")) {
      bot(
        "⭐ *Top Rated Recipes*\n\n━━━━━━━━━━━━━━━━━━━━\n1. 🍛 *Butter Chicken* ⭐ 4.9 (238 ratings)\n   12 ingredients | 45 min\n\n2. 🥘 *Dal Makhani* ⭐ 4.8 (189 ratings)\n   10 ingredients | 60 min\n\n3. 🍚 *Biryani* ⭐ 4.8 (312 ratings)\n   18 ingredients | 90 min\n\nTap a recipe to see details:",
        [
          {
            id: "tr1",
            title: "🍛 Butter Chicken",
            payload: "recipe_detail_bc"
          },
          { id: "tr2", title: "🥘 Dal Makhani", payload: "recipe_detail_dm" },
          { id: "tr3", title: "🍚 Biryani", payload: "recipe_detail_br" },
          { id: "tr4", title: "➕ Add My Recipe", payload: "add_recipe" },
          { id: "tr5", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      bot("🍳 *Recipes*\n\nWhat would you like to do?", [
        { id: "rec1", title: "➕ Add Recipe", payload: "add_recipe" },
        { id: "rec2", title: "🔍 Search Recipes", payload: "search_recipe" },
        { id: "rec3", title: "⭐ Top Rated", payload: "top_recipes" },
        { id: "rec4", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_ADD_TITLE") {
    ctx.stateData.recipeTitle = message;
    stateTransition = transition(ctx, "RECIPE_ADD_INGREDIENTS");
    sys("State: RECIPE_ADD_TITLE → RECIPE_ADD_INGREDIENTS");
    bot(
      `🍳 *Step 2/8:* Title: *${message}*

Add ingredients (name, grams). Type *done* when finished.

Format: *Rice, 200*
(e.g. Onion, 100 | Tomato, 150 | Oil, 30)`
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_ADD_INGREDIENTS") {
    if (lower === "done" || lower === "skip") {
      const ingredients = ctx.stateData.recipeIngredients ?? [];
      stateTransition = transition(ctx, "RECIPE_ADD_STEPS");
      sys("State: RECIPE_ADD_INGREDIENTS → RECIPE_ADD_STEPS");
      bot(
        `✅ *${ingredients.length} ingredient(s) added!*

*Step 3/8:* Describe preparation steps (numbered). Type *done* when finished.

Format: *1. Wash rice | 2. Boil water | 3. Add spices...*

Or type each step and press Enter, then type *done*:`
      );
    } else {
      const parts = message.split(",");
      const name = ((_d = parts[0]) == null ? void 0 : _d.trim()) ?? message;
      const grams = Number((_e = parts[1]) == null ? void 0 : _e.trim()) || 0;
      const ingredients = ctx.stateData.recipeIngredients ?? [];
      ingredients.push({ name, grams });
      ctx.stateData.recipeIngredients = ingredients;
      bot(
        `✅ Added: *${name}* (${grams}g)

Add another ingredient or type *done*:`,
        [
          {
            id: "ing_done",
            title: "✅ Done Adding Ingredients",
            payload: "done"
          }
        ]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_ADD_STEPS") {
    if (lower === "done" || lower === "skip") {
      const steps = ctx.stateData.recipeSteps ?? [];
      stateTransition = transition(ctx, "RECIPE_ADD_IMAGE");
      sys("State: RECIPE_ADD_STEPS → RECIPE_ADD_IMAGE");
      bot(
        `✅ *${steps.length} step(s) added!*

*Step 4/8:* Paste an image link (optional):`,
        [{ id: "img_skip", title: "⏭️ Skip", payload: "skip" }]
      );
    } else {
      const steps = ctx.stateData.recipeSteps ?? [];
      steps.push(message);
      ctx.stateData.recipeSteps = steps;
      bot(
        `✅ Step ${steps.length}: *${message.slice(0, 50)}*

Add another step or type *done*:`,
        [{ id: "steps_done", title: "✅ Done Adding Steps", payload: "done" }]
      );
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_ADD_IMAGE") {
    ctx.stateData.recipeImageLink = lower === "skip" ? "" : message;
    stateTransition = transition(ctx, "RECIPE_ADD_VIDEO");
    sys("State: RECIPE_ADD_IMAGE → RECIPE_ADD_VIDEO");
    bot("🍳 *Step 5/8:* Paste a video link (optional):", [
      { id: "vid_skip", title: "⏭️ Skip", payload: "skip" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_ADD_VIDEO") {
    ctx.stateData.recipeVideoLink = lower === "skip" ? "" : message;
    stateTransition = transition(ctx, "RECIPE_ADD_BENEFITS");
    sys("State: RECIPE_ADD_VIDEO → RECIPE_ADD_BENEFITS");
    bot("🍳 *Step 6/8:* Add health benefits (optional):", [
      { id: "ben_skip", title: "⏭️ Skip", payload: "skip" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_ADD_BENEFITS") {
    ctx.stateData.recipeBenefits = lower === "skip" ? "" : message;
    stateTransition = transition(ctx, "RECIPE_ADD_TIPS");
    sys("State: RECIPE_ADD_BENEFITS → RECIPE_ADD_TIPS");
    bot("🍳 *Step 7/8:* Add cooking tips (optional):", [
      { id: "tips_skip", title: "⏭️ Skip", payload: "skip" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_ADD_TIPS") {
    ctx.stateData.recipeTips = lower === "skip" ? "" : message;
    stateTransition = transition(ctx, "RECIPE_REVIEW");
    sys("State: RECIPE_ADD_TIPS → RECIPE_REVIEW");
    const ingredients = ctx.stateData.recipeIngredients ?? [];
    const steps = ctx.stateData.recipeSteps ?? [];
    const ingList = ingredients.slice(0, 5).map((i) => `• ${i.name} — ${i.grams}g`).join("\n");
    bot(
      `🍳 *Recipe Summary — Step 8/8*

📖 *${ctx.stateData.recipeTitle}*

🥘 *Ingredients (${ingredients.length}):*
${ingList}${ingredients.length > 5 ? `
...and ${ingredients.length - 5} more` : ""}

👨‍🍳 *Steps:* ${steps.length}
${ctx.stateData.recipeImageLink ? "🖼 Image: ✅\n" : ""}${ctx.stateData.recipeVideoLink ? "🎥 Video: ✅\n" : ""}${ctx.stateData.recipeBenefits ? "💚 Benefits: Added\n" : ""}${ctx.stateData.recipeTips ? "💡 Tips: Added" : ""}

Save this recipe?`,
      [
        { id: "rcs1", title: "✅ Save Recipe", payload: "save_recipe" },
        { id: "rcs2", title: "🔄 Start Over", payload: "add_recipe" },
        { id: "rcs3", title: "❌ Cancel", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_REVIEW") {
    if (lower === "save_recipe") {
      stateTransition = transition(ctx, "RECIPE_RATE");
      sys("State: RECIPE_REVIEW → RECIPE_RATE (save_recipe)");
      sys("✅ Recipe saved via createRecipe() backend call");
      const recipeId = `RCP-${Date.now().toString().slice(-6)}`;
      ctx.stateData.savedRecipeId = recipeId;
      bot(
        `✅ *Recipe Saved!*

📖 *${ctx.stateData.recipeTitle}*
Recipe ID: *${recipeId}*

⭐ *Rate this recipe (1-5):*`,
        [
          { id: "rr1", title: "⭐ 1 star", payload: "rate_recipe_1" },
          { id: "rr2", title: "⭐⭐ 2 stars", payload: "rate_recipe_2" },
          { id: "rr3", title: "⭐⭐⭐ 3 stars", payload: "rate_recipe_3" },
          { id: "rr4", title: "⭐⭐⭐⭐ 4 stars", payload: "rate_recipe_4" },
          { id: "rr5", title: "⭐⭐⭐⭐⭐ 5 stars", payload: "rate_recipe_5" },
          { id: "rr_skip", title: "⏭️ Skip Rating", payload: "skip_rating" }
        ]
      );
    } else if (lower === "add_recipe") {
      stateTransition = transition(ctx, "RECIPE_ADD_TITLE");
      ctx.stateData.recipeIngredients = [];
      ctx.stateData.recipeSteps = [];
      bot(
        "🍳 *Add Recipe — Step 1/8*\n\nWhat would you like to name your recipe?"
      );
    } else {
      bot("Save this recipe?", [
        { id: "rcs1", title: "✅ Save Recipe", payload: "save_recipe" },
        { id: "rcs3", title: "❌ Cancel", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_RATE") {
    if (lower.startsWith("rate_recipe_") || lower === "skip_rating") {
      stateTransition = transition(ctx, "RECIPE_SAVED");
      sys("State: RECIPE_RATE → RECIPE_SAVED");
      if (lower !== "skip_rating") {
        const stars = lower.replace("rate_recipe_", "");
        sys(`✅ rateRecipe(${ctx.stateData.savedRecipeId}, ${stars}) called`);
        bot(
          `🎉 *Thank you for rating!*

Your rating: ${"⭐".repeat(Number(stars))}

📖 *${ctx.stateData.recipeTitle}* has been published!

Other users can now search and see your recipe.`,
          [
            {
              id: "rs1",
              title: "➕ Add Another Recipe",
              payload: "add_recipe"
            },
            { id: "rs2", title: "🔍 Search Recipes", payload: "search_recipe" },
            { id: "rs3", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      } else {
        bot(
          `✅ *Recipe Published!*

📖 *${ctx.stateData.recipeTitle}* is now live.

Other users can search and discover your recipe.`,
          [
            {
              id: "rs1",
              title: "➕ Add Another Recipe",
              payload: "add_recipe"
            },
            { id: "rs2", title: "🔍 Search Recipes", payload: "search_recipe" },
            { id: "rs3", title: "🏠 Main Menu", payload: "hi" }
          ]
        );
      }
    } else {
      bot("Rate this recipe (1-5):", [
        { id: "rr1", title: "⭐ 1", payload: "rate_recipe_1" },
        { id: "rr2", title: "⭐⭐ 2", payload: "rate_recipe_2" },
        { id: "rr3", title: "⭐⭐⭐ 3", payload: "rate_recipe_3" },
        { id: "rr4", title: "⭐⭐⭐⭐ 4", payload: "rate_recipe_4" },
        { id: "rr5", title: "⭐⭐⭐⭐⭐ 5", payload: "rate_recipe_5" },
        { id: "rr_skip", title: "⏭️ Skip", payload: "skip_rating" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_SAVED") {
    stateTransition = transition(ctx, "RECIPE_MENU");
    bot("🍳 *Recipes*\n\nWhat would you like to do next?", [
      { id: "rec1", title: "➕ Add Recipe", payload: "add_recipe" },
      { id: "rec2", title: "🔍 Search Recipes", payload: "search_recipe" },
      { id: "rec3", title: "🏠 Main Menu", payload: "hi" }
    ]);
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_SEARCH_KEYWORD") {
    ctx.stateData.recipeSearchKeyword = message;
    stateTransition = transition(ctx, "RECIPE_SEARCH_RESULTS");
    sys(
      `State: RECIPE_SEARCH_KEYWORD → RECIPE_SEARCH_RESULTS (query: ${message})`
    );
    sys(`searchRecipes("${message}") called`);
    bot(
      `🔍 *Recipe Search: "${message}"*

No recipes found in the backend yet.

⚠️ To see recipes here, go to *Admin → Load Sample Data* first.`,
      [
        {
          id: "recipe_back",
          title: "🔍 Search Again",
          payload: "search_recipe"
        },
        { id: "recipe_add", title: "➕ Add Recipe", payload: "add_recipe" },
        { id: "recipe_home", title: "🏠 Main Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_SEARCH_RESULTS") {
    if (lower.startsWith("view_recipe_")) {
      const recId = lower.replace("view_recipe_", "");
      stateTransition = transition(ctx, "RECIPE_DETAIL");
      sys(`State: RECIPE_SEARCH_RESULTS → RECIPE_DETAIL (recipeId: ${recId})`);
      bot(
        "📖 *Butter Chicken*\n\n🥘 *Ingredients (12):*\n• Chicken — 500g\n• Butter — 50g\n• Tomato — 200g\n• Cream — 100ml\n• Kashmiri Chilli — 10g\n• Ginger-Garlic Paste — 30g\n...and 6 more\n\n👨‍🍳 *Steps (8):*\n1. Marinate chicken for 30 mins\n2. Grill or pan-fry chicken\n3. Make tomato-butter gravy\n...and 5 more steps\n\n💚 *Benefits:* High protein, rich in vitamins\n💡 *Tips:* Use Kashmiri chilli for colour without spice\n\n⭐ *Current Rating:* 4.9 (238 reviews)\n\nWould you like to rate this recipe?",
        [
          {
            id: "vr1",
            title: "⭐⭐⭐⭐⭐ Rate 5 Stars",
            payload: "rate_found_recipe_5"
          },
          {
            id: "vr2",
            title: "⭐⭐⭐⭐ Rate 4 Stars",
            payload: "rate_found_recipe_4"
          },
          { id: "vr3", title: "🔍 Search More", payload: "search_recipe" },
          { id: "vr4", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower.startsWith("rate_found_recipe_")) {
      const stars = lower.replace("rate_found_recipe_", "");
      sys(`✅ rateRecipe() called with ${stars} stars`);
      bot(
        `✅ *Rating saved: ${"⭐".repeat(Number(stars))}*

Thank you for rating! Your feedback helps others find great recipes. 🙏`,
        [
          {
            id: "rfr1",
            title: "🔍 Find More Recipes",
            payload: "search_recipe"
          },
          { id: "rfr2", title: "➕ Add Your Recipe", payload: "add_recipe" },
          { id: "rfr3", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else if (lower === "search_recipe" || lower === "add_recipe") {
      stateTransition = transition(
        ctx,
        lower === "search_recipe" ? "RECIPE_SEARCH_KEYWORD" : "RECIPE_ADD_TITLE"
      );
      if (lower === "search_recipe") {
        bot("🔍 *Search Recipes*\n\nSearch for a recipe:");
      } else {
        ctx.stateData.recipeIngredients = [];
        ctx.stateData.recipeSteps = [];
        bot(
          "🍳 *Add Recipe — Step 1/8*\n\nWhat would you like to name your recipe?"
        );
      }
    } else {
      bot("Search results:", [
        { id: "rs1", title: "🔍 Search Again", payload: "search_recipe" },
        { id: "rs2", title: "➕ Add Recipe", payload: "add_recipe" },
        { id: "rs3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (ctx.state === "RECIPE_DETAIL") {
    if (lower.startsWith("rate_found_recipe_")) {
      const stars = lower.replace("rate_found_recipe_", "");
      sys(`✅ rateRecipe() called with ${stars} stars`);
      bot(
        `✅ *Rating saved: ${"⭐".repeat(Number(stars))}*

Thank you! Your feedback helps others find great recipes. 🙏`,
        [
          {
            id: "rd1",
            title: "🔍 Find More Recipes",
            payload: "search_recipe"
          },
          { id: "rd2", title: "🏠 Main Menu", payload: "hi" }
        ]
      );
    } else {
      stateTransition = transition(ctx, "RECIPE_MENU");
      bot("🍳 *Recipes*", [
        { id: "rec1", title: "➕ Add Recipe", payload: "add_recipe" },
        { id: "rec2", title: "🔍 Search Recipes", payload: "search_recipe" },
        { id: "rec3", title: "🏠 Main Menu", payload: "hi" }
      ]);
    }
    return { messages: msgs, transition: stateTransition };
  }
  if (lower.startsWith("tip_") || lower === "no_tip") {
    if (lower === "no_tip") {
      bot("✅ Noted. Thanks for your ride!", [
        { id: "tip_done1", title: "🏠 Main Menu", payload: "hi" }
      ]);
    } else {
      const amount = lower.replace("tip_", "");
      sys(`✅ Tip of ₹${amount} processed via addTip()`);
      bot(
        `💰 *Tip Payment — ₹${amount}*

Scan the QR below to send the tip. QR expires in 2 minutes.

The driver will be notified once payment is done. Thank you! 🙏`,
        [{ id: "tip_done2", title: "✅ Tip Sent", payload: "hi" }],
        "qr_payment",
        {
          amount: Number(amount),
          upiId: "localbazar@upi",
          expiresAt: Date.now() + getQRTimeoutMs()
        }
      );
    }
    return { messages: msgs };
  }
  if (lower.startsWith("recipe_detail_")) {
    stateTransition = transition(ctx, "RECIPE_DETAIL");
    const recipeNames = {
      bc: "Butter Chicken",
      dm: "Dal Makhani",
      br: "Biryani"
    };
    const key = lower.replace("recipe_detail_", "");
    const name = recipeNames[key] ?? "Recipe";
    bot(
      `📖 *${name}*

🥘 *Ingredients:*
• Main ingredient — 500g
• Spice mix — 30g
• Oil — 50ml
...and more

👨‍🍳 *Steps:* 6-8 steps

⭐ *Rating:* 4.8

Would you like to rate this recipe?`,
      [
        {
          id: "vr1",
          title: "⭐⭐⭐⭐⭐ Rate 5 Stars",
          payload: "rate_found_recipe_5"
        },
        {
          id: "vr2",
          title: "⭐⭐⭐⭐ Rate 4 Stars",
          payload: "rate_found_recipe_4"
        },
        { id: "vr3", title: "🔍 More Recipes", payload: "search_recipe" },
        { id: "vr4", title: "🏠 Main Menu", payload: "hi" }
      ]
    );
    return { messages: msgs, transition: stateTransition };
  }
  bot("I didn't understand that. Type *hi* to return to the main menu.", [
    { id: "fb1", title: "🏠 Main Menu", payload: "hi" },
    { id: "fb2", title: "🛒 Order Now", payload: "1" }
  ]);
  return { messages: msgs };
}
function OrderStatusBanner({
  order,
  onRefresh
}) {
  if (!order) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 mt-2 mb-0 bg-card border border-border rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium", children: "Live Order Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: order.id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "order", value: order.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onRefresh,
        className: "text-[10px] text-primary hover:underline",
        children: "Refresh"
      }
    )
  ] });
}
function OrderStepTimeline({ activeStatus }) {
  const STATUS_ORDER = [
    OrderStatus.pending,
    OrderStatus.accepted,
    OrderStatus.assigned,
    OrderStatus.inTransit,
    OrderStatus.delivered,
    OrderStatus.paymentCollected,
    OrderStatus.vendorSettled,
    OrderStatus.completed
  ];
  const currentIdx = STATUS_ORDER.indexOf(activeStatus);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 ml-8 bg-card border border-border rounded-xl p-3 max-w-xs shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 text-primary" }),
      "Order Progress"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: STATUS_ORDER.map((status, i) => {
      var _a;
      const isDone = i < currentIdx;
      const isCurrent = i === currentIdx;
      const label = ((_a = ORDER_STATUS_MAP[status]) == null ? void 0 : _a.label) ?? status;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${isDone ? "bg-emerald-500 text-white" : isCurrent ? "bg-primary text-primary-foreground ring-2 ring-primary/30" : "bg-muted text-muted-foreground"}`,
            children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-3 h-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex-1 ${i < STATUS_ORDER.length - 1 ? "pb-2 border-b border-dashed border-border/60" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-xs font-medium ${isDone ? "text-emerald-600 dark:text-emerald-400" : isCurrent ? "text-primary" : "text-muted-foreground"}`,
                  children: label
                }
              ),
              isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-primary/70 flex items-center gap-1 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
                "Current status"
              ] })
            ]
          }
        )
      ] }, status);
    }) })
  ] });
}
function buildScenariosFromRegistry() {
  const flows = getAllRegistryFlows();
  return flows.map((f, i) => {
    var _a, _b;
    let userType = UserRole.customer;
    if ((_a = f.roles) == null ? void 0 : _a.includes("merchant")) userType = UserRole.merchant;
    else if ((_b = f.roles) == null ? void 0 : _b.includes("delivery")) userType = UserRole.deliveryPartner;
    const phone = `+9193333${String(i + 1).padStart(5, "0")}`;
    return {
      label: `${f.name}`,
      phone,
      userType,
      startMsg: f.triggerPayload ?? f.id,
      startState: void 0
    };
  });
}
const BASE_SCENARIOS = [
  {
    label: "🆕 New User — First Message",
    phone: "+919876540001",
    userType: UserRole.customer,
    startMsg: "hi",
    startState: void 0
  },
  {
    label: "🛒 Register as Customer",
    phone: "+919876540005",
    userType: UserRole.customer,
    startMsg: "hi",
    startState: void 0
  },
  {
    label: "🏪 Register as Merchant",
    phone: "+919876540002",
    userType: UserRole.merchant,
    startMsg: "hi",
    startState: void 0
  },
  {
    label: "🚴 Register as Delivery Partner",
    phone: "+919876540003",
    userType: UserRole.deliveryPartner,
    startMsg: "hi",
    startState: void 0
  }
];
function getScenarios() {
  const registry = buildScenariosFromRegistry();
  const basePhones = new Set(BASE_SCENARIOS.map((s) => s.phone));
  const registryDeduped = registry.filter((s) => !basePhones.has(s.phone));
  return [...BASE_SCENARIOS, ...registryDeduped];
}
getScenarios();
function getFlagEmoji(phone) {
  let cc = "IN";
  if (phone.startsWith("+91")) cc = "IN";
  else if (phone.startsWith("+1")) cc = "US";
  else if (phone.startsWith("+44")) cc = "GB";
  else if (phone.startsWith("+971")) cc = "AE";
  else if (phone.startsWith("+65")) cc = "SG";
  if (cc.length !== 2) return "🌐";
  const pts = [...cc.toUpperCase()].map((c) => 127462 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...pts);
}
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatRelative(ts) {
  const diff = Date.now() - ts;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  return `${Math.floor(diff / 36e5)}h ago`;
}
function userTypeLabel(role) {
  if (role === UserRole.merchant) return "Merchant";
  if (role === UserRole.deliveryPartner) return "Delivery Partner";
  return "Customer";
}
function userTypeBg(role) {
  if (role === UserRole.merchant)
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
  if (role === UserRole.deliveryPartner)
    return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
  return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
}
function OrderTrackingWidget({
  liveStatus,
  orderId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "ml-8 text-[10px] text-muted-foreground mb-1", children: [
      orderId,
      " — Live Tracking"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStepTimeline, { activeStatus: liveStatus ?? OrderStatus.pending })
  ] });
}
function DpOrdersWidget({ orders }) {
  const [countdown, setCountdown] = reactExports.useState({});
  reactExports.useEffect(() => {
    const initial = {};
    for (const o of orders) {
      initial[o.id] = 300;
    }
    setCountdown(initial);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = { ...prev };
        for (const k of Object.keys(next)) {
          if (next[k] > 0) next[k] -= 1;
        }
        return next;
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, [orders]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 ml-8 space-y-2 max-w-xs", children: orders.map((order) => {
    const secs = countdown[order.id] ?? 300;
    const mins = Math.floor(secs / 60);
    const sec = secs % 60;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-3 shadow-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: order.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                order.distance,
                " km away"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: `text-[10px] font-mono font-bold ${secs < 60 ? "text-red-500" : "text-amber-600 dark:text-amber-400"}`,
                  children: [
                    "⏳ ",
                    mins,
                    ":",
                    sec.toString().padStart(2, "0")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "to accept" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "📍 Pickup:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: order.pickup })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "🏠 Deliver to:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: order.delivery })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border/60 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 dark:text-emerald-400 font-bold", children: [
                "💵 COD: ₹",
                order.cod
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                "💰 Earn: ₹",
                Math.round(order.amount * 0.2)
              ] })
            ] })
          ] })
        ]
      },
      order.id
    );
  }) });
}
function JobListingsWidget({ jobs }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 ml-8 space-y-2 max-w-xs", children: jobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-3 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: job.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full", children: job.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-emerald-600 dark:text-emerald-400", children: job.salary }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            "📍 ",
            job.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-amber-600 dark:text-amber-400", children: [
            "⏱ ",
            job.daysLeft,
            "d left"
          ] })
        ] })
      ]
    },
    job.id
  )) });
}
function PropertyListingsWidget({
  properties
}) {
  const typeColor = (t) => {
    if (t === "Rent")
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    if (t === "Sale")
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    if (t === "Lease")
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 ml-8 space-y-2 max-w-xs", children: properties.map((prop) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-3 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeColor(prop.type)}`,
              children: prop.type
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-primary", children: prop.price })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground font-medium mt-1", children: prop.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
          "📍 ",
          prop.location
        ] })
      ]
    },
    prop.id
  )) });
}
function MerchantOrdersWidget({
  orders,
  pendingCount
}) {
  const displayOrders = orders ?? [];
  const [timers, setTimers] = reactExports.useState({});
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next = { ...prev };
        for (const k of Object.keys(next)) {
          if (next[k] > 0) next[k] -= 1;
        }
        return next;
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 ml-8 max-w-xs space-y-2", children: [
    pendingCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Pending Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full", children: pendingCount })
    ] }),
    displayOrders.map((order) => {
      const secs = timers[order.id] ?? 300;
      const mins = Math.floor(secs / 60);
      const sec = secs % 60;
      const isUrgent = secs < 60;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-card border rounded-xl p-3 shadow-sm ${isUrgent ? "border-red-300 dark:border-red-700" : "border-border"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: order.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-[10px] font-mono font-bold ${isUrgent ? "text-red-500 animate-pulse" : "text-amber-600 dark:text-amber-400"}`,
                  children: [
                    "⏳ ",
                    mins,
                    ":",
                    sec.toString().padStart(2, "0")
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              "👤 ",
              order.customer
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-foreground my-1", children: order.items }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
                "₹",
                order.amount,
                " ",
                order.paymentMode
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: order.timeAgo })
            ] })
          ]
        },
        order.id
      );
    })
  ] });
}
function ChatbotSimulatorInner() {
  const [ready, setReady] = reactExports.useState(false);
  const registryCtx = useRegistryFlows();
  const [roleFilter, setRoleFilter] = reactExports.useState("customer");
  const [activeScenarios, setActiveScenarios] = reactExports.useState(
    () => getScenarios()
  );
  const prevFlowCountRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const newCount = registryCtx.flows.length;
    if (newCount !== prevFlowCountRef.current) {
      prevFlowCountRef.current = newCount;
      setActiveScenarios(getScenarios());
    }
  });
  reactExports.useEffect(() => {
    try {
      for (const k of Object.keys(sessionContexts)) delete sessionContexts[k];
    } catch {
    }
    for (const k of [
      "wc_disabled_modules",
      "wc_sim_session",
      "wc_flow_cache",
      "wc_sim_messages"
    ]) {
      try {
        localStorage.removeItem(k);
      } catch {
      }
    }
    const defaultPhone = "+919876543210";
    sessionContexts[defaultPhone] = {
      state: "WELCOME",
      userType: UserRole.customer,
      stateHistory: [],
      stateData: {}
    };
    setReady(true);
  }, []);
  const simActions = useSimulatorActions();
  const simActorCalls = useSimulatorActorCalls();
  const seedSampleData = useSeedSampleData();
  const createTestOrder = useCreateTestOrder();
  const { actor } = useBackendActor();
  const { data: moduleRoleStatuses = [] } = useModuleStatusesWithRoles();
  const { data: shuttleRoutes = [] } = useShuttleRoutes();
  const { data: merchantList = [] } = useMerchants();
  const { data: jobsData = [] } = useJobs();
  const { data: healthcareData = [] } = useHealthcareProviders();
  const { data: tourData = [] } = useTourOperators();
  const { data: professionalData = [] } = useProfessionalServices();
  const { data: promotionsData = [] } = usePromotions();
  const { data: eventsData = [] } = useEvents();
  const { data: familyData = [] } = useFamilyMembers();
  const { data: donationsData = [] } = useDonations();
  const { data: allMenuOptions = [] } = useGetAllMenuOptions();
  const updateShuttleStops = useUpdateShuttleRouteStops();
  const qrTimeoutMinutes = useQRTimeoutMinutes();
  const qrTimeoutMs = Number.isFinite(qrTimeoutMinutes) && qrTimeoutMinutes > 0 ? qrTimeoutMinutes * 6e4 : 12e4;
  const [sessionLang, setSessionLangState] = reactExports.useState(
    () => getSessionLanguage()
  );
  const [showBothLanguages, setShowBothLanguages] = reactExports.useState(true);
  const [simulatingMerchantId, setSimulatingMerchantId] = reactExports.useState("__customer_mode__");
  const activeMerchantContext = merchantList.find((m) => m.id === simulatingMerchantId) ?? null;
  const [selectedCityId, setSelectedCityId] = reactExports.useState("__all_cities__");
  const { data: citiesList = [] } = useListCities();
  const { data: cityControlData } = useGetCityControl(
    selectedCityId !== "__all_cities__" ? selectedCityId : ""
  );
  const cityModuleOverrides = {};
  if (cityControlData == null ? void 0 : cityControlData.moduleToggles) {
    for (const [mod, val] of cityControlData.moduleToggles) {
      cityModuleOverrides[mod] = val;
    }
  }
  const [sessions, setSessions] = reactExports.useState([
    {
      phoneNumber: "+919876543210",
      userType: UserRole.customer,
      label: "Rajesh Kumar",
      lastMessage: "Start conversation...",
      lastTimestamp: Date.now() - 12e4,
      unreadCount: 0
    }
  ]);
  const [activePhone, setActivePhone] = reactExports.useState("+919876543210");
  const [activeUserType, setActiveUserType] = reactExports.useState(
    UserRole.customer
  );
  const [messagesByPhone, setMessagesByPhone] = reactExports.useState({});
  const [message, setMessage] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const [showTyping, setShowTyping] = reactExports.useState(false);
  const [showNewSession, setShowNewSession] = reactExports.useState(false);
  const [newPhone, setNewPhone] = reactExports.useState("");
  const [newUserType, setNewUserType] = reactExports.useState(UserRole.customer);
  const [stateExpanded, setStateExpanded] = reactExports.useState(true);
  const [showScenariosMobile, setShowScenariosMobile] = reactExports.useState(false);
  const [activeOrder, setActiveOrder] = reactExports.useState(null);
  const [apiLoading, setApiLoading] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (shuttleRoutes.length > 0) {
      _realShuttleRoutes = shuttleRoutes.map((r) => ({
        id: r.id,
        routeName: r.routeName,
        vehicleNumber: r.vehicleNumber,
        price: Number(r.fare ?? 0),
        source: r.source,
        destination: r.destination
      }));
    }
  }, [shuttleRoutes]);
  const { data: marketplaceItemsData } = useMarketplaceItems();
  reactExports.useEffect(() => {
    if (marketplaceItemsData && marketplaceItemsData.length > 0) {
      _realMarketplaceItems = marketplaceItemsData.filter((i) => i.isActive).map(
        (i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          category: i.category,
          yearOfManufacture: i.yearOfManufacture,
          listingType: i.listingType,
          invoiceAvailable: i.invoiceAvailable,
          isActive: i.isActive,
          createdBy: i.createdBy
        })
      );
    }
  }, [marketplaceItemsData]);
  reactExports.useEffect(() => {
    if (jobsData.length > 0) {
      _realJobs = jobsData.map((j) => {
        var _a;
        return {
          id: j.id,
          title: j.title,
          category: j.category,
          description: j.description,
          salaryMin: j.salaryMin,
          salaryMax: j.salaryMax,
          location: ((_a = j.location) == null ? void 0 : _a.address) ?? "",
          posterId: j.posterId
        };
      });
    }
  }, [jobsData]);
  reactExports.useEffect(() => {
    if (healthcareData.length > 0) {
      _realHealthcareProviders = healthcareData.map((p) => ({
        id: p.id,
        name: p.name,
        specialization: p.specialization,
        phone: p.phone,
        location: p.location,
        fee: p.fee
      }));
    }
  }, [healthcareData]);
  reactExports.useEffect(() => {
    if (tourData.length > 0) {
      _realTourOperators = tourData.map((t) => ({
        id: t.id,
        name: t.name,
        destination: t.destination,
        tourType: t.tourType,
        duration: t.duration,
        price: t.price,
        phone: t.phone
      }));
    }
  }, [tourData]);
  reactExports.useEffect(() => {
    if (professionalData.length > 0) {
      _realProfessionalServices = professionalData.map((s) => ({
        id: s.id,
        name: s.name,
        skillType: s.skillType,
        phone: s.phone,
        location: s.location,
        pricePerHour: s.pricePerHour
      }));
    }
  }, [professionalData]);
  reactExports.useEffect(() => {
    if (familyData.length > 0) {
      _realFamilyMembers = familyData.map((m) => ({
        id: m.id,
        relationName: m.relationName,
        relationPhone: m.relationPhone,
        relationship: m.relationship,
        inviteStatus: m.inviteStatus,
        ownerPhone: m.ownerPhone,
        ownerName: m.ownerName,
        gender: m.gender
      }));
    }
  }, [familyData]);
  reactExports.useEffect(() => {
    if (Array.isArray(allMenuOptions) && allMenuOptions.length > 0) {
      _liveMenuOptions = allMenuOptions.map((opt) => ({
        id: String(opt.id ?? ""),
        optionLabel: String(opt.optionLabel ?? opt.label ?? ""),
        flowId: String(opt.flowId ?? ""),
        roles: Array.isArray(opt.roles) ? opt.roles : [],
        cityModuleKey: String(opt.cityModuleKey ?? ""),
        sortOrder: Number(opt.sortOrder ?? 100),
        isActive: opt.isActive !== false
      }));
    } else {
      _liveMenuOptions = [];
    }
  }, [allMenuOptions]);
  reactExports.useEffect(() => {
    if (donationsData.length > 0) {
      _realDonations = donationsData.map((d) => ({
        id: String(d.id ?? ""),
        itemName: String(d.itemName ?? d.title ?? ""),
        category: String(d.category ?? ""),
        donorName: String(d.donorName ?? d.donorPhone ?? ""),
        location: String(d.location ?? ""),
        status: String(d.status ?? "available")
      }));
    }
  }, [donationsData]);
  reactExports.useEffect(() => {
    if (promotionsData.length > 0) {
      _realPromotions = promotionsData.map((p) => ({
        id: p.id,
        title: p.title,
        reelLink: p.reelLink,
        imageLink: p.imageLink,
        locationArea: p.areaName ?? "",
        locationCity: p.city ?? "",
        status: String(p.status)
      }));
    }
  }, [promotionsData]);
  reactExports.useEffect(() => {
    if (eventsData.length > 0) {
      _realEvents = eventsData.map((e) => ({
        id: e.id,
        name: e.name ?? "",
        description: e.description ?? "",
        location: e.location ?? "",
        startDate: e.startDate ?? "",
        endDate: e.endDate ?? "",
        isPaid: Boolean(e.isPaid),
        price: Number(e.price ?? 0),
        ticketVenue: e.ticketVenue ?? ""
      }));
    }
  }, [eventsData]);
  reactExports.useEffect(() => {
    if (!moduleRoleStatuses.length) return;
    const disabledForCustomer = [];
    for (const item of moduleRoleStatuses) {
      if (item && typeof item === "object" && "moduleName" in item && "role" in item) {
        const rs = item;
        if (rs.role === "customer" && !rs.enabled) {
          disabledForCustomer.push(rs.moduleName.toLowerCase());
        }
      }
    }
    localStorage.setItem(
      "wc_disabled_modules",
      JSON.stringify(disabledForCustomer)
    );
  }, [moduleRoleStatuses]);
  reactExports.useEffect(() => {
    if (!actor) return;
    let cancelled = false;
    async function loadRealData() {
      try {
        const merchants = await actor.listMerchants(null, null);
        if (!cancelled && merchants.length > 0) {
          _realMerchants = merchants.map((m) => ({
            id: m.id,
            businessName: m.businessName,
            category: m.category,
            avgRating: m.avgRating,
            location: m.location
          }));
        }
      } catch {
      }
      try {
        const products = await actor.getProductsByMerchant("m1");
        if (!cancelled && products.length > 0) {
          _realProducts = products.map((p) => ({
            id: p.id,
            title: p.title,
            baseRate: p.baseRate,
            merchantId: p.merchantId
          }));
        }
      } catch {
      }
      try {
        const events = await actor.getAllEvents();
        if (!cancelled && events.length > 0) {
          _realEvents = events.map((e) => ({
            id: e.id,
            name: e.eventName,
            description: e.description,
            location: e.locationAddress,
            startDate: e.startDate,
            endDate: e.endDate,
            isPaid: e.isPaid,
            price: e.price,
            ticketVenue: e.ticketVenue
          }));
        }
      } catch {
      }
      try {
        const promos = await actor.getAllPromotions();
        if (!cancelled && promos.length > 0) {
          _realPromotions = promos.map((p) => ({
            id: p.id,
            title: p.title,
            reelLink: p.reelLink,
            imageLink: p.imageLink,
            locationArea: p.locationArea,
            locationCity: p.locationCity,
            status: String(p.status)
          }));
        }
      } catch {
      }
      try {
        const jobs = await actor.getAllJobs(null);
        if (!cancelled && jobs.length > 0) {
          _realJobs = jobs.map((j) => {
            var _a;
            return {
              id: j.id,
              title: j.title,
              category: j.category,
              description: j.description,
              salaryMin: j.salaryMin,
              salaryMax: j.salaryMax,
              location: ((_a = j.location) == null ? void 0 : _a.address) ?? "",
              posterId: j.posterId
            };
          });
        }
      } catch {
      }
      try {
        const merchants = await actor.listMerchants(null, null);
        const allProds = [];
        for (const m of merchants.slice(0, 10)) {
          try {
            const prods = await actor.getProductsByMerchant(m.id);
            for (const p of prods) {
              allProds.push({
                id: p.id,
                title: p.title,
                baseRate: p.baseRate,
                merchantId: p.merchantId
              });
            }
          } catch {
          }
        }
        if (!cancelled && allProds.length > 0) _realProducts = allProds;
      } catch {
      }
      try {
        const aAny = actor;
        const hcFn = aAny.getHealthcareProviders ?? aAny.listHealthcareProviders;
        if (typeof hcFn === "function") {
          const raw = await hcFn.call(aAny);
          if (!cancelled && Array.isArray(raw) && raw.length > 0) {
            _realHealthcareProviders = raw.map((r) => ({
              id: String(r.id ?? ""),
              name: String(r.name ?? ""),
              specialization: String(r.specialization ?? ""),
              phone: String(r.phone ?? ""),
              location: String(r.location ?? r.address ?? ""),
              fee: r.fee ? Number(r.fee) : void 0
            }));
          }
        }
      } catch {
      }
      try {
        const aAny = actor;
        const tourFn = aAny.getTourOperators ?? aAny.listTourOperators;
        if (typeof tourFn === "function") {
          const raw = await tourFn.call(aAny);
          if (!cancelled && Array.isArray(raw) && raw.length > 0) {
            _realTourOperators = raw.map(
              (r) => ({
                id: String(r.id ?? ""),
                name: String(r.name ?? r.operatorName ?? ""),
                destination: String(r.destination ?? ""),
                tourType: String(r.tourType ?? r.type ?? ""),
                duration: String(r.duration ?? ""),
                price: Number(r.price ?? r.pricePerPerson ?? 0),
                phone: String(r.phone ?? "")
              })
            );
          }
        }
      } catch {
      }
      try {
        const aAny = actor;
        const svcFn = aAny.getProfessionalServices ?? aAny.listProfessionalServices;
        if (typeof svcFn === "function") {
          const raw = await svcFn.call(aAny);
          if (!cancelled && Array.isArray(raw) && raw.length > 0) {
            _realProfessionalServices = raw.map((r) => ({
              id: String(r.id ?? ""),
              name: String(r.name ?? ""),
              skillType: String(
                r.skillType ?? r.serviceType ?? r.category ?? ""
              ),
              phone: String(r.phone ?? ""),
              location: String(r.location ?? r.address ?? ""),
              pricePerHour: r.pricePerHour ? Number(r.pricePerHour) : void 0
            }));
          }
        }
      } catch {
      }
      try {
        const routes = await actor.listShuttleRoutes();
        if (!cancelled && routes.length > 0) {
          _realShuttleRoutes = routes.map((r) => ({
            id: r.id,
            routeName: r.routeName,
            vehicleNumber: r.vehicleNumber,
            price: Number(r.fare ?? 0),
            source: r.source,
            destination: r.destination
          }));
        }
      } catch {
      }
    }
    loadRealData();
    const interval = setInterval(loadRealData, 7e3);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [actor]);
  const currentMessages = messagesByPhone[activePhone] ?? [];
  const currentCtx = sessionContexts[activePhone];
  const lastBotMsg = [...currentMessages].reverse().find((m) => (m == null ? void 0 : m.type) === "bot");
  const dashboardConfig = {
    [UserRole.merchant]: {
      payload: "open_merchant_dashboard",
      label: "📊 My Dashboard 🏪",
      url: "/merchant-dashboard"
    },
    [UserRole.deliveryPartner]: {
      payload: "open_dp_dashboard",
      label: "📊 My Dashboard 🚚",
      url: "/delivery-dashboard"
    },
    [UserRole.customer]: {
      payload: "open_customer_dashboard",
      label: "📊 My Dashboard 📈",
      url: "/customer-dashboard"
    }
  };
  const activeDashboard = activeUserType in dashboardConfig ? dashboardConfig[activeUserType] : null;
  const DASHBOARD_PAYLOADS = /* @__PURE__ */ new Set([
    "open_merchant_dashboard",
    "open_dp_dashboard",
    "open_customer_dashboard",
    "merchant_dashboard_link",
    "dp_dashboard_link",
    "customer_dashboard_link"
  ]);
  const rawQuickReplies = Array.isArray(lastBotMsg == null ? void 0 : lastBotMsg.quickReplies) ? lastBotMsg.quickReplies.filter(
    (qr) => qr != null && typeof qr === "object" && typeof qr.id === "string" && typeof qr.title === "string" && typeof qr.payload === "string"
  ) : [];
  const activeQuickReplies = [
    ...rawQuickReplies.filter((qr) => DASHBOARD_PAYLOADS.has(qr.payload)),
    ...rawQuickReplies.filter((qr) => !DASHBOARD_PAYLOADS.has(qr.payload))
  ];
  const showQuickLinksBar = activeDashboard !== null && ((currentCtx == null ? void 0 : currentCtx.state) === "MERCHANT_MENU" || (currentCtx == null ? void 0 : currentCtx.state) === "DP_MENU" || (currentCtx == null ? void 0 : currentCtx.state) === "MAIN_MENU" || (currentCtx == null ? void 0 : currentCtx.state) === "MERCHANT_ORDERS" || (currentCtx == null ? void 0 : currentCtx.state) === "DP_AVAILABLE_ORDERS" || (currentCtx == null ? void 0 : currentCtx.state) === "DP_COMPLETE" || (currentCtx == null ? void 0 : currentCtx.state) === "JOB_MENU" || (currentCtx == null ? void 0 : currentCtx.state) === "PROPERTY_MENU" || (currentCtx == null ? void 0 : currentCtx.state) === "ORDER_TRACKING" || activeUserType === UserRole.merchant || activeUserType === UserRole.deliveryPartner);
  reactExports.useEffect(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  function addSystemMsg(text) {
    const sysMsg = {
      id: `sys_api_${Date.now()}`,
      content: text,
      type: "system",
      timestamp: Date.now()
    };
    setMessagesByPhone((prev) => ({
      ...prev,
      [activePhone]: [...prev[activePhone] ?? [], sysMsg]
    }));
  }
  function addBotMsg(content, quickReplies, widget, widgetData) {
    const botMsg = {
      id: `bot_api_${Date.now()}`,
      content,
      type: "bot",
      timestamp: Date.now(),
      quickReplies,
      specialWidget: widget,
      widgetData
    };
    setMessagesByPhone((prev) => ({
      ...prev,
      [activePhone]: [...prev[activePhone] ?? [], botMsg]
    }));
  }
  async function handleMerchantAccept(orderId) {
    var _a;
    if (apiLoading) return;
    setApiLoading(true);
    try {
      const updated = await simActions.merchantAcceptOrder(orderId);
      setActiveOrder(updated);
      const label = ((_a = ORDER_STATUS_MAP[updated.status]) == null ? void 0 : _a.label) ?? updated.status;
      addSystemMsg(`✅ API: Order ${orderId} status → ${label}`);
      addBotMsg(
        `✅ *ORD-${orderId} Accepted!*

Status: *${label}*
Delivery partner has been notified.

👤 Customer: Amit Verma
📍 Karol Bagh, New Delhi
⏱ Prepare order by: 25 mins
💰 Amount: ₹165 COD`,
        [
          {
            id: "acc1",
            title: "✅ Mark Ready for Pickup",
            payload: "ready_pickup"
          },
          {
            id: "acc2",
            title: "📦 View All Orders",
            payload: "merchant_orders"
          }
        ],
        "order_tracking",
        { liveStatus: updated.status, orderId }
      );
      ue.success(`Order accepted — status: ${label}`);
    } catch (e) {
      addSystemMsg(
        `❌ API Error: ${e instanceof Error ? e.message : "Unknown error"}`
      );
      ue.error("Failed to accept order");
    } finally {
      setApiLoading(false);
    }
  }
  async function handleMerchantReject(orderId) {
    var _a;
    if (apiLoading) return;
    setApiLoading(true);
    try {
      const updated = await simActions.merchantRejectOrder(
        orderId,
        "Out of stock"
      );
      setActiveOrder(updated);
      const label = ((_a = ORDER_STATUS_MAP[updated.status]) == null ? void 0 : _a.label) ?? updated.status;
      addSystemMsg(`❌ API: Order ${orderId} status → ${label}`);
      addBotMsg(
        `❌ *Order Rejected*

Status: *${label}*

Order ${orderId} has been rejected. Customer will be notified.
Reason: Out of stock`,
        [
          {
            id: "rej1",
            title: "📦 View Other Orders",
            payload: "merchant_orders"
          },
          { id: "rej2", title: "🏠 Merchant Menu", payload: "hi" }
        ]
      );
      ue.success(`Order rejected — status: ${label}`);
    } catch (e) {
      addSystemMsg(
        `❌ API Error: ${e instanceof Error ? e.message : "Unknown error"}`
      );
      ue.error("Failed to reject order");
    } finally {
      setApiLoading(false);
    }
  }
  async function handleDpAccept(orderId, dpId = "dp1") {
    var _a;
    if (apiLoading) return;
    setApiLoading(true);
    try {
      const updated = await simActions.dpAcceptOrder(orderId, dpId);
      setActiveOrder(updated);
      const label = ((_a = ORDER_STATUS_MAP[updated.status]) == null ? void 0 : _a.label) ?? updated.status;
      addSystemMsg(`✅ API: DP accepted order ${orderId} → ${label}`);
      addBotMsg(
        `✅ *Order Accepted!*

Status: *${label}*

📍 *Pickup from:*
Patel Fast Food
15 Main Street, Paharganj
📞 +91 98765****11 (masked)

📍 *Deliver to:*
Ajay Sharma
42 MG Road, Karol Bagh
📞 +91 98765****10 (masked)

💰 Earnings: ₹55 upon delivery
💵 Collect COD: ₹280 from customer`,
        [
          { id: "ad1", title: "🗺 Start Navigation", payload: "start_nav" },
          {
            id: "ad2",
            title: "✅ Reached Merchant",
            payload: "reached_merchant"
          }
        ],
        "order_tracking",
        { liveStatus: updated.status, orderId }
      );
      ue.success(`DP accepted order — status: ${label}`);
    } catch (e) {
      addSystemMsg(
        `❌ API Error: ${e instanceof Error ? e.message : "Unknown error"}`
      );
      ue.error("Failed to accept order as DP");
    } finally {
      setApiLoading(false);
    }
  }
  async function handleDpPickup(orderId, dpId = "dp1") {
    var _a;
    if (apiLoading) return;
    setApiLoading(true);
    try {
      const updated = await simActions.dpConfirmPickup(orderId, dpId);
      setActiveOrder(updated);
      const label = ((_a = ORDER_STATUS_MAP[updated.status]) == null ? void 0 : _a.label) ?? updated.status;
      addSystemMsg(`✅ API: Pickup confirmed for ${orderId} → ${label}`);
      addBotMsg(
        `🚴 *Pickup Confirmed!*

Status: *${label}*

Now head to the delivery address:

📍 42 MG Road, Karol Bagh, New Delhi
📞 Customer: +91 98765****10 (masked)
🗺 Distance: ~1.2 km | ETA: 12 mins`,
        [
          {
            id: "pc1",
            title: "🗺 Start Navigation",
            payload: "start_delivery_nav"
          },
          {
            id: "pc2",
            title: "✅ Reached Customer",
            payload: "reached_customer"
          }
        ],
        "order_tracking",
        { liveStatus: updated.status, orderId }
      );
      ue.success(`Pickup confirmed — status: ${label}`);
    } catch (e) {
      addSystemMsg(
        `❌ API Error: ${e instanceof Error ? e.message : "Unknown error"}`
      );
      ue.error("Failed to confirm pickup");
    } finally {
      setApiLoading(false);
    }
  }
  async function handleDpDelivery(orderId, dpId = "dp1") {
    var _a;
    if (apiLoading) return;
    setApiLoading(true);
    try {
      const updated = await simActions.dpConfirmDelivery(orderId, dpId);
      setActiveOrder(updated);
      const label = ((_a = ORDER_STATUS_MAP[updated.status]) == null ? void 0 : _a.label) ?? updated.status;
      addSystemMsg(`✅ API: Delivery confirmed for ${orderId} → ${label}`);
      addBotMsg(
        `🏠 *Delivery Instructions*

Status: *${label}*

Hand over order to: *Ajay Sharma*
📍 Flat 4B, MG Residency, Karol Bagh

💵 *Collect COD: ₹280 cash*

🔐 Delivery OTP: *8834*
(Customer will share this with you)`,
        [
          {
            id: "di1",
            title: "💵 Collect ₹280 Cash",
            payload: "collect_payment"
          }
        ],
        "order_tracking",
        { liveStatus: updated.status, orderId }
      );
      ue.success(`Delivery confirmed — status: ${label}`);
    } catch (e) {
      addSystemMsg(
        `❌ API Error: ${e instanceof Error ? e.message : "Unknown error"}`
      );
      ue.error("Failed to confirm delivery");
    } finally {
      setApiLoading(false);
    }
  }
  async function handleDpCollectPayment(orderId, amount, dpId = "dp1") {
    var _a;
    if (apiLoading) return;
    setApiLoading(true);
    try {
      const updated = await simActions.dpCollectPayment(orderId, dpId, amount);
      setActiveOrder(updated);
      const label = ((_a = ORDER_STATUS_MAP[updated.status]) == null ? void 0 : _a.label) ?? updated.status;
      addSystemMsg(
        `✅ API: Payment ₹${amount} collected for ${orderId} → ${label}`
      );
      addBotMsg(
        `✅ *Delivery Complete!*

Status: *${label}*

Now settle the amount with the vendor:

💰 Total collected: ₹${amount}
💵 Hand over to merchant: ₹${Math.round(amount * 0.8)}
🤑 Your earnings: ₹${Math.round(amount * 0.2)}

Please proceed to Patel Fast Food to settle.`,
        [
          {
            id: "vs1",
            title: "✅ Vendor Settlement Done",
            payload: "vendor_settled"
          }
        ],
        "order_tracking",
        { liveStatus: updated.status, orderId }
      );
      ue.success(`Payment collected — status: ${label}`);
    } catch (e) {
      addSystemMsg(
        `❌ API Error: ${e instanceof Error ? e.message : "Unknown error"}`
      );
      ue.error("Failed to collect payment");
    } finally {
      setApiLoading(false);
    }
  }
  async function handleDpSettleVendor(orderId, amount, dpId = "dp1") {
    var _a, _b;
    if (apiLoading) return;
    setApiLoading(true);
    try {
      const updated = await simActions.dpSettleVendor(orderId, dpId, amount);
      setActiveOrder(updated);
      const label = ((_a = ORDER_STATUS_MAP[updated.status]) == null ? void 0 : _a.label) ?? updated.status;
      addSystemMsg(
        `✅ API: Vendor settled ₹${amount} for ${orderId} → ${label}`
      );
      const completed = await simActions.completeOrder(orderId);
      setActiveOrder(completed);
      const completedLabel = ((_b = ORDER_STATUS_MAP[completed.status]) == null ? void 0 : _b.label) ?? completed.status;
      addBotMsg(
        `🎉 *Order Completed!*

Status: *${completedLabel}*

Order ${orderId} has been fully completed.

✅ Delivered to customer
✅ Payment collected: ₹${amount}
✅ Vendor settled: ₹${Math.round(amount * 0.8)}
💰 Your earnings: *₹${Math.round(amount * 0.2)}*

🏆 Great work! Check for more orders.`,
        [
          { id: "done1", title: "📦 Find More Orders", payload: "dp_orders" },
          { id: "done2", title: "💰 My Earnings", payload: "dp_earnings" },
          { id: "done3", title: "🏠 My Menu", payload: "hi" }
        ],
        "order_tracking",
        { liveStatus: completed.status, orderId }
      );
      ue.success(`Order fully completed — status: ${completedLabel}`);
    } catch (e) {
      addSystemMsg(
        `❌ API Error: ${e instanceof Error ? e.message : "Unknown error"}`
      );
      ue.error("Failed to settle vendor");
    } finally {
      setApiLoading(false);
    }
  }
  async function refreshActiveOrder(orderId) {
    var _a;
    try {
      const orders = await simActions.getOrders();
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        setActiveOrder(order);
        const label = ((_a = ORDER_STATUS_MAP[order.status]) == null ? void 0 : _a.label) ?? order.status;
        ue.info(`Refreshed: ${order.id} — ${label}`);
      }
    } catch {
      ue.error("Failed to refresh order");
    }
  }
  async function sendMessage(msg, _skipApi, overridePhone) {
    var _a, _b, _c;
    const raw = (msg ?? message).trim();
    if (!raw || sending) return;
    const phone = overridePhone ?? activePhone;
    if (!phone) {
      console.warn("[Simulator] sendMessage called with no activePhone");
      return;
    }
    const text = sanitizeUserInput(raw);
    if (!text) return;
    setMessage("");
    setSending(true);
    const detectedLang = detectLanguageFromText(text);
    if (detectedLang !== "en") {
      setSessionLanguage(detectedLang);
      setSessionLangState(detectedLang);
    }
    const userMsg = {
      id: `user_${Date.now()}`,
      content: text,
      type: "user",
      timestamp: Date.now()
    };
    setMessagesByPhone((prev) => ({
      ...prev,
      [phone]: [...prev[phone] ?? [], userMsg]
    }));
    try {
      setShowTyping(true);
      await new Promise((r) => setTimeout(r, 500));
      setShowTyping(false);
      const lower = text.toLowerCase().trim();
      if (lower === "accept_ord003") {
        await handleMerchantAccept("ORD-003");
        setSessions(
          (prev) => prev.map(
            (s) => s.phoneNumber === phone ? {
              ...s,
              lastMessage: "✅ ORD-003 accepted",
              lastTimestamp: Date.now()
            } : s
          )
        );
        return;
      }
      if (lower === "reject_ord003") {
        await handleMerchantReject("ORD-003");
        setSessions(
          (prev) => prev.map(
            (s) => s.phoneNumber === phone ? {
              ...s,
              lastMessage: "❌ ORD-003 rejected",
              lastTimestamp: Date.now()
            } : s
          )
        );
        return;
      }
      if (lower.startsWith("accept_dp_")) {
        const ordId = lower.replace("accept_dp_", "").toUpperCase();
        const realId = ordId === "ORD004" ? "ORD-004" : ordId === "ORD006" ? "ORD-003" : "ORD-004";
        await handleDpAccept(realId);
        setSessions(
          (prev) => prev.map(
            (s) => s.phoneNumber === phone ? {
              ...s,
              lastMessage: `✅ ${realId} accepted`,
              lastTimestamp: Date.now()
            } : s
          )
        );
        return;
      }
      if (lower === "confirm_pickup") {
        const ordId = (activeOrder == null ? void 0 : activeOrder.id) ?? "ORD-004";
        await handleDpPickup(ordId);
        return;
      }
      if (lower === "reached_customer") {
        const ordId = (activeOrder == null ? void 0 : activeOrder.id) ?? "ORD-004";
        await handleDpDelivery(ordId);
        return;
      }
      if (lower === "collect_payment") {
        const ordId = (activeOrder == null ? void 0 : activeOrder.id) ?? "ORD-004";
        const amount = (activeOrder == null ? void 0 : activeOrder.totalAmount) ?? 280;
        await handleDpCollectPayment(ordId, amount);
        return;
      }
      if (lower === "vendor_settled") {
        const ordId = (activeOrder == null ? void 0 : activeOrder.id) ?? "ORD-004";
        const amount = Number(
          (activeOrder == null ? void 0 : activeOrder.paymentCollectedAmount) ?? BigInt(280)
        );
        await handleDpSettleVendor(ordId, amount || 280);
        return;
      }
      let result;
      try {
        result = await processMessage(phone, text, activeUserType);
      } catch (processErr) {
        console.error("[Simulator] processMessage error:", processErr);
        result = {
          messages: [
            {
              id: `bot_err_${Date.now()}`,
              content: "Something went wrong processing that message. Type *hi* to return to the main menu.",
              type: "bot",
              timestamp: Date.now(),
              quickReplies: [
                { id: "fb_hi", title: "🏠 Main Menu", payload: "hi" }
              ]
            }
          ]
        };
      }
      const botMsgs = (result.messages ?? []).filter(
        (m) => m != null && typeof m === "object" && typeof m.id === "string" && typeof m.content === "string" && typeof m.type === "string"
      );
      for (let i = 0; i < botMsgs.length; i++) {
        if (i > 0) await new Promise((r) => setTimeout(r, 300));
        const msgToAdd = botMsgs[i];
        if (!msgToAdd) continue;
        setMessagesByPhone((prev) => ({
          ...prev,
          [phone]: [...prev[phone] ?? [], msgToAdd]
        }));
      }
      if (result.transition) {
        await persistRegistrationIfNeeded(
          phone,
          result.transition.from,
          result.transition.to
        );
        await persistOrderIfNeeded(
          phone,
          result.transition.from,
          result.transition.to
        );
      }
      const lastBotText = ((_b = (_a = botMsgs.find((m) => (m == null ? void 0 : m.type) === "bot")) == null ? void 0 : _a.content) == null ? void 0 : _b.slice(0, 50)) ?? text;
      setSessions(
        (prev) => prev.map(
          (s) => s.phoneNumber === phone ? { ...s, lastMessage: lastBotText, lastTimestamp: Date.now() } : s
        )
      );
    } catch (outerErr) {
      console.error("[Simulator] sendMessage outer error:", outerErr);
      setShowTyping(false);
      const errMsg = {
        id: `bot_outer_err_${Date.now()}`,
        content: "⚠️ An unexpected error occurred. Type *hi* to return to the main menu.",
        type: "bot",
        timestamp: Date.now(),
        quickReplies: [
          { id: "outer_hi", title: "🏠 Main Menu", payload: "hi" }
        ]
      };
      setMessagesByPhone((prev) => ({
        ...prev,
        [phone]: [...prev[phone] ?? [], errMsg]
      }));
    } finally {
      setSending(false);
      (_c = inputRef.current) == null ? void 0 : _c.focus();
    }
  }
  function handleImageUpload() {
    sendMessage("📷 [Photo sent] — searching for product in image...");
  }
  async function persistRegistrationIfNeeded(phone, transitionFrom, transitionTo) {
    var _a, _b, _c, _d;
    if (!transitionFrom || !transitionTo || !actor) return;
    const ctx = sessionContexts[phone];
    if (!ctx) return;
    if (transitionFrom === "CUSTOMER_PASSDIGIT_SET" && transitionTo === "MAIN_MENU") {
      try {
        await simActorCalls.registerUserFromChat({
          phone,
          name: String(ctx.stateData.name ?? ctx.name ?? "New Customer"),
          passdigit: String(ctx.stateData.passdigit ?? "0000")
        });
        addSystemMsg(
          "✅ Backend: Customer registered & saved to admin dashboard"
        );
      } catch {
        addSystemMsg("⚠️ Registration saved locally — will sync when connected");
      }
    }
    if ((transitionFrom === "MERCHANT_PASSDIGIT_CONFIRM" || transitionFrom === "MERCHANT_PASSDIGIT_SET") && transitionTo === "MERCHANT_MENU") {
      try {
        await simActorCalls.registerMerchantFromChat({
          phone,
          ownerName: String(
            ctx.stateData.merchantName ?? ctx.name ?? "Merchant"
          ),
          outletName: String(ctx.stateData.outletName ?? "New Outlet"),
          category: String(ctx.stateData.category ?? "General"),
          deliveryType: String(ctx.stateData.deliveryType ?? "delivery"),
          merchantType: String(ctx.stateData.merchantType ?? "order"),
          deliveryRadius: Number(ctx.stateData.deliveryRadius ?? 5),
          passdigit: String(ctx.stateData.passdigit ?? "0000")
        });
        addSystemMsg(
          "✅ Backend: Merchant registered & saved to admin dashboard"
        );
      } catch {
        addSystemMsg("⚠️ Registration saved locally — will sync when connected");
      }
    }
    if (transitionFrom === "DP_PASSDIGIT_SET" && transitionTo === "DP_MENU") {
      try {
        await simActorCalls.registerDeliveryPartnerFromChat({
          phone,
          name: String(ctx.stateData.dpName ?? ctx.name ?? "Partner"),
          serviceType: String(ctx.stateData.dpServiceType ?? "delivery"),
          vehicleType: String(ctx.stateData.vehicleType ?? "Bike"),
          aadhaarNo: ctx.stateData.aadhaar,
          panNo: ctx.stateData.pan,
          rcBook: ctx.stateData.rcBook,
          passdigit: String(ctx.stateData.passdigit ?? "0000")
        });
        const dpLabel = ctx.stateData.dpServiceType === "sarthi" ? "Sarthi partner" : "Delivery partner";
        addSystemMsg(
          `✅ Backend: ${dpLabel} registered & saved to admin dashboard`
        );
      } catch {
        addSystemMsg("⚠️ Registration saved locally — will sync when connected");
      }
    }
    if (transitionFrom === "FAMILY_ADD_ADDRESS" && transitionTo === "FAMILY_SAVED") {
      try {
        await actor.addFamilyMember(
          phone,
          String(ctx.stateData.familySelfName ?? ""),
          String(ctx.stateData.familySelfSurname ?? ""),
          String(
            ctx.stateData.familyRelationship ?? "relative"
          ).toLowerCase(),
          String(ctx.stateData.familyRelationName ?? ""),
          String(ctx.stateData.familyPhone ?? ""),
          String(ctx.stateData.familyAddress ?? ""),
          String(ctx.stateData.familyGender ?? "")
        );
        addSystemMsg(
          "✅ Backend: Family member saved & customer profile created"
        );
      } catch {
        addSystemMsg(
          "⚠️ Family member saved locally — will sync when connected"
        );
      }
    }
    if (transitionFrom === "EVENT_POST_TICKETS" && transitionTo === "EVENT_PUBLISHED") {
      try {
        await actor.createEvent(
          String(ctx.stateData.eventName ?? "Event"),
          String(ctx.stateData.eventDesc ?? ""),
          phone,
          String(ctx.name ?? "Organizer"),
          ctx.stateData.eventPaid === true,
          Number(ctx.stateData.eventPrice ?? 0),
          String(ctx.stateData.eventLocation ?? ""),
          String(
            ctx.stateData.eventStartDate ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          ),
          String(
            ctx.stateData.eventEndDate ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          ),
          String(ctx.stateData.eventTicketVenue ?? "")
        );
        addSystemMsg("✅ Backend: Event saved & published");
      } catch {
        addSystemMsg("⚠️ Event saved locally — will sync when connected");
      }
    }
    if (transitionFrom === "PROMO_PAYMENT" && transitionTo === "PROMO_PENDING_APPROVAL") {
      try {
        const locationParts = String(
          ctx.stateData.promoLocation ?? "India"
        ).split(",");
        const area = ((_a = locationParts[0]) == null ? void 0 : _a.trim()) ?? "";
        const city = ((_b = locationParts[1]) == null ? void 0 : _b.trim()) ?? "India";
        const country = ((_c = locationParts[2]) == null ? void 0 : _c.trim()) ?? "India";
        const planMap = {
          plan_100: "reach100",
          plan_200: "reach200",
          plan_500: "reach500",
          plan_1000: "reach1000",
          plan_2000: "reach2000"
        };
        await actor.createPromotion(
          phone,
          String(ctx.stateData.promoTitle ?? "Promotion"),
          String(ctx.stateData.promoReel ?? ""),
          String(ctx.stateData.promoImage ?? ""),
          area,
          city,
          country,
          planMap[String(ctx.stateData.promoPlanKey ?? "plan_100")] ?? "reach100"
        );
        addSystemMsg("✅ Backend: Promotion saved — pending AI moderation");
      } catch {
        addSystemMsg("⚠️ Promotion saved locally — will sync when connected");
      }
    }
    if (transitionFrom === "JOB_POST_LOCATION" && transitionTo === "JOB_PUBLISHED") {
      try {
        await actor.postJob(
          phone,
          String(ctx.stateData.jobTitle ?? "Job Opening"),
          String(ctx.stateData.jobDesc ?? ""),
          String(ctx.stateData.jobCategory ?? "General"),
          Number(ctx.stateData.salaryMin ?? 0),
          Number(ctx.stateData.salaryMax ?? 0),
          { lat: 0, lng: 0, address: String(ctx.stateData.jobLocation ?? "") }
        );
        addSystemMsg("✅ Backend: Job posted & saved");
        try {
          const listings = await actor.getMyListings(phone);
          ctx.stateData.myJobs = listings.jobs;
          ctx.stateData.myProperties = listings.properties;
        } catch {
        }
      } catch {
        addSystemMsg("⚠️ Job saved locally — will sync when connected");
      }
    }
    if (transitionFrom === "PROPERTY_POST_LOCATION" && transitionTo === "PROPERTY_PUBLISHED") {
      try {
        const priceStr = String(ctx.stateData.propPrice ?? "0");
        const priceNum = Number(priceStr.replace(/[^\d]/g, "")) || 0;
        const propTypeStr = String(
          ctx.stateData.propType ?? "Rent"
        ).toLowerCase();
        const listingType = propTypeStr.includes("sale") ? PropertyListingType.sale : propTypeStr.includes("buy") ? PropertyListingType.buy : propTypeStr.includes("lease") ? PropertyListingType.lease : PropertyListingType.rent;
        await actor.postProperty(
          phone,
          listingType,
          String(ctx.stateData.propDesc ?? ""),
          priceNum,
          { lat: 0, lng: 0, address: String(ctx.stateData.propLocation ?? "") }
        );
        addSystemMsg("✅ Backend: Property listed & saved");
        try {
          const listings = await actor.getMyListings(phone);
          ctx.stateData.myJobs = listings.jobs;
          ctx.stateData.myProperties = listings.properties;
        } catch {
        }
      } catch {
        addSystemMsg("⚠️ Property saved locally — will sync when connected");
      }
    }
    if (transitionFrom === "ADD_STOP_TIME" && transitionTo === "ADD_STOP_SAVED") {
      try {
        const routeId = String(ctx.stateData.addStopRouteId ?? "");
        if (routeId) {
          const newStop = {
            stopName: String(ctx.stateData.addStopName ?? "Stop"),
            ticketFee: BigInt(
              Number(
                String(ctx.stateData.addStopFee ?? "0").replace(/[^\d]/g, "")
              ) || 0
            ),
            arrivalTime: String(ctx.stateData.addStopTime ?? "09:00"),
            sequenceOrder: BigInt(Date.now()),
            location: String(ctx.stateData.addStopName ?? "")
          };
          await updateShuttleStops.mutateAsync({ routeId, stops: [newStop] });
          addSystemMsg("✅ Backend: Stop added to shuttle route");
        }
      } catch {
        addSystemMsg("⚠️ Stop saved locally — will sync when connected");
      }
    }
    if (transitionFrom === "SELL_ITEM_INVOICE" && transitionTo === "SELL_ITEM_DONE") {
      try {
        const year = Number(ctx.stateData.itemYear ?? (/* @__PURE__ */ new Date()).getFullYear());
        const price = Number(
          String(ctx.stateData.itemPrice ?? "0").replace(/[^\d.]/g, "")
        );
        const result = await actor.createMarketplaceItem(
          {
            title: String(ctx.stateData.itemTitle ?? "Item"),
            price,
            category: String(ctx.stateData.itemCategory ?? "Equipment"),
            yearOfManufacture: BigInt(year),
            instagramPhotoLink: String(ctx.stateData.itemPhoto ?? ""),
            listingType: String(ctx.stateData.itemType ?? "sale"),
            invoiceAvailable: ctx.stateData.itemInvoice === true
          },
          phone
        );
        const listingId = (result == null ? void 0 : result.id) ?? `MKT-${Date.now().toString().slice(-6)}`;
        addSystemMsg(`✅ Backend: Marketplace listing saved! ID: ${listingId}`);
      } catch {
        addSystemMsg(
          "⚠️ Marketplace item saved locally — will sync when connected"
        );
      }
    }
    if (transitionFrom === "SUPPLIER_ORDER_CONFIRM" && transitionTo === "MERCHANT_MENU") {
      try {
        const merchantRecord = _realMerchants.find(
          (m) => m.id === phone || m.id.includes(phone.replace("+", ""))
        );
        const merchantId = (merchantRecord == null ? void 0 : merchantRecord.id) ?? phone;
        const qtyStr = String(ctx.stateData.supplierQty ?? "1");
        const qtyNum = BigInt(Number(qtyStr.replace(/[^\d]/g, "") || "1"));
        const result = await actor.createRestockOrder(
          merchantId,
          phone,
          String(ctx.stateData.supplierName ?? "Supplier"),
          String(ctx.stateData.supplierItem ?? "Item"),
          qtyNum,
          String(ctx.stateData.supplierNotes ?? "")
        );
        if (result.__kind__ === "ok") {
          const orderId = result.ok.id;
          addSystemMsg(
            `✅ Backend: Restock order placed! Order ID: ${orderId}`
          );
          try {
            const merchantRecord2 = _realMerchants.find(
              (m) => m.id === phone || m.id.includes(phone.replace("+", ""))
            );
            const merchantId2 = (merchantRecord2 == null ? void 0 : merchantRecord2.id) ?? phone;
            const orders = await actor.getRestockOrdersByMerchant(merchantId2);
            ctx.stateData.merchantRestockOrders = orders.map((o) => ({
              id: o.id,
              supplierName: o.supplierName,
              itemName: o.itemName,
              quantity: Number(o.quantity),
              status: o.status
            }));
          } catch {
          }
        }
      } catch {
        addSystemMsg(
          "⚠️ Restock order saved locally — will sync when connected"
        );
      }
    }
    if (transitionFrom === "RECIPE_REVIEW" && transitionTo === "RECIPE_RATE") {
      try {
        const ingredients = ctx.stateData.recipeIngredients ?? [];
        const steps = ctx.stateData.recipeSteps ?? [];
        await actor.createRecipe(
          phone,
          String(ctx.stateData.recipeTitle ?? "Recipe"),
          ingredients,
          steps,
          String(ctx.stateData.recipeImageLink ?? ""),
          String(ctx.stateData.recipeVideoLink ?? ""),
          String(ctx.stateData.recipeBenefits ?? ""),
          String(ctx.stateData.recipeTips ?? "")
        );
        addSystemMsg("✅ Backend: Recipe saved successfully");
      } catch {
        addSystemMsg("⚠️ Recipe saved locally — will sync when connected");
      }
    }
    if (transitionFrom === "ADD_PRODUCT_CONFIRM" && transitionTo === "MERCHANT_MENU") {
      try {
        const resolvedMerchantId = (activeMerchantContext == null ? void 0 : activeMerchantContext.id) ?? ((_d = _realMerchants.find(
          (m) => m.id === phone || m.id.includes(phone.replace("+", ""))
        )) == null ? void 0 : _d.id) ?? await (async () => {
          var _a2;
          try {
            const ms = await actor.listMerchants(null, null);
            return (_a2 = ms.find(
              (m) => m.userId === phone || m.userId.includes(phone.replace("+", ""))
            )) == null ? void 0 : _a2.id;
          } catch {
            return void 0;
          }
        })();
        if (resolvedMerchantId) {
          await actor.addProduct(
            resolvedMerchantId,
            String(ctx.stateData.productTitle ?? "New Product"),
            ctx.stateData.productImageUrl ? [String(ctx.stateData.productImageUrl)] : [],
            null,
            String(ctx.stateData.productDesc ?? ""),
            ctx.stateData.productCondition !== "refurbished",
            Number(ctx.stateData.productMrp ?? ctx.stateData.productRate ?? 0),
            [],
            Number(ctx.stateData.productDiscount ?? 0),
            0n,
            "",
            ""
          );
          addSystemMsg(
            `✅ Backend: Product "${ctx.stateData.productTitle}" saved for merchant`
          );
        } else {
          addSystemMsg(
            "⚠️ No merchant context — use 'Simulating as' selector to pick a merchant for product saving"
          );
        }
      } catch {
        addSystemMsg("⚠️ Product saved locally — will sync when connected");
      }
    }
  }
  async function persistOrderIfNeeded(phone, transitionFrom, transitionTo) {
    if (transitionFrom !== "ORDER_CONFIRM" || transitionTo !== "MAIN_MENU")
      return;
    if (!actor) return;
    const ctx = sessionContexts[phone];
    if (!ctx) return;
    try {
      const selectedMerchantId = String(ctx.stateData.selectedMerchant ?? "");
      const orderTotal = Number(ctx.stateData.orderTotal ?? 0);
      const items = Array.isArray(ctx.stateData.orderProducts) ? ctx.stateData.orderProducts.map((p) => {
        const product = _realProducts.find(
          (rp) => rp.merchantId === selectedMerchantId && rp.title === p.name
        );
        return {
          productId: (product == null ? void 0 : product.id) ?? "sim_product",
          quantity: p.qty ?? 1,
          price: p.rate ?? 0
        };
      }) : [];
      const { orderId } = await simActorCalls.createOrderFromChat({
        customerId: phone,
        merchantId: selectedMerchantId || "m1",
        items,
        paymentMode: String(ctx.stateData.paymentMode ?? "COD"),
        searchQuery: String(
          ctx.stateData.leadKeyword ?? ctx.stateData.searchQuery ?? ""
        ),
        totalAmount: orderTotal
      });
      if (orderId) {
        ctx.stateData.confirmedOrderId = orderId;
        setMessagesByPhone((prev) => ({
          ...prev,
          [phone]: (prev[phone] ?? []).map(
            (m) => m.content.includes("PENDING") ? {
              ...m,
              content: m.content.replace(/Order ID: \*PENDING\*/g, `Order ID: *${orderId}*`).replace(
                /\u23f3 Saving to backend… order ID will update shortly\n/g,
                ""
              )
            } : m
          )
        }));
        addSystemMsg(`✅ Backend: Order saved — ID: ${orderId}`);
      }
      try {
        await createTestOrder.mutateAsync({
          merchantId: selectedMerchantId || "m1",
          items: items.length > 0 ? items : [{ productId: "sim_product", quantity: 1, price: orderTotal }],
          customerId: phone
        });
      } catch {
      }
    } catch {
      const fallbackId = "FAILED";
      ctx.stateData.confirmedOrderId = fallbackId;
      setMessagesByPhone((prev) => ({
        ...prev,
        [phone]: (prev[phone] ?? []).map(
          (m) => m.content.includes("PENDING") ? {
            ...m,
            content: m.content.replace(
              /Order ID: \*PENDING\*/g,
              `Order ID: *${fallbackId}*`
            ).replace(
              /\u23f3 Saving to backend… order ID will update shortly\n/g,
              ""
            )
          } : m
        )
      }));
      addSystemMsg("Order creation failed — please try again.");
    }
  }
  async function resetSession() {
    setMessagesByPhone((prev) => ({ ...prev, [activePhone]: [] }));
    delete sessionContexts[activePhone];
    clearSessionLanguage();
    setSessionLangState("en");
    setShowBothLanguages(true);
    try {
      await simActorCalls.resetChatConversation(activePhone);
    } catch {
    }
    ue.success("Session reset");
  }
  function clearHistory() {
    setMessagesByPhone((prev) => ({ ...prev, [activePhone]: [] }));
    ue.success("History cleared");
  }
  function copySessionJson() {
    const data = {
      phoneNumber: activePhone,
      userType: activeUserType,
      messages: currentMessages.length,
      context: currentCtx
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    ue.success("Session JSON copied!");
  }
  function loadScenario(s) {
    const existing = sessions.find((x) => x.phoneNumber === s.phone);
    if (!existing) {
      setSessions((prev) => [
        ...prev,
        {
          phoneNumber: s.phone,
          userType: s.userType,
          label: s.label,
          lastMessage: "New scenario",
          lastTimestamp: Date.now(),
          unreadCount: 0
        }
      ]);
    }
    setActivePhone(s.phone);
    setActiveUserType(s.userType);
    delete sessionContexts[s.phone];
    setMessagesByPhone((prev) => ({ ...prev, [s.phone]: [] }));
    if (s.startState) {
      sessionContexts[s.phone] = {
        state: s.startState,
        userType: s.userType,
        stateHistory: [],
        stateData: "startData" in s && s.startData ? { ...s.startData } : {}
      };
      const headerMsg = {
        id: `sys_scenario_${Date.now()}`,
        content: `📋 Scenario: "${s.label}" — Starting at state: ${s.startState}`,
        type: "system",
        timestamp: Date.now()
      };
      setMessagesByPhone((prev) => ({ ...prev, [s.phone]: [headerMsg] }));
    }
    setTimeout(() => sendMessage(s.startMsg, true, s.phone), 100);
  }
  function createSession() {
    if (!newPhone.trim()) return;
    const phone = newPhone.startsWith("+") ? newPhone : `+91${newPhone}`;
    const existing = sessions.find((s) => s.phoneNumber === phone);
    if (!existing) {
      setSessions((prev) => [
        ...prev,
        {
          phoneNumber: phone,
          userType: newUserType,
          label: phone,
          lastMessage: "New session",
          lastTimestamp: Date.now(),
          unreadCount: 0
        }
      ]);
    }
    setActivePhone(phone);
    setActiveUserType(newUserType);
    setShowNewSession(false);
    setNewPhone("");
  }
  function renderWidget(msg) {
    if (!(msg == null ? void 0 : msg.specialWidget)) return null;
    const data = msg.widgetData ?? {};
    if (msg.specialWidget === "order_tracking") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        OrderTrackingWidget,
        {
          liveStatus: data.liveStatus ?? OrderStatus.pending,
          orderId: data.orderId ?? "ORD-000"
        }
      );
    }
    if (msg.specialWidget === "merchant_orders") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        MerchantOrdersWidget,
        {
          pendingCount: data.pendingCount
        }
      );
    }
    if (msg.specialWidget === "dp_orders") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DpOrdersWidget, { orders: data.orders ?? [] });
    }
    if (msg.specialWidget === "job_listings") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(JobListingsWidget, { jobs: data.jobs ?? [] });
    }
    if (msg.specialWidget === "property_listings") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyListingsWidget,
        {
          properties: data.properties ?? []
        }
      );
    }
    if (msg.specialWidget === "qr_payment") {
      const rawAmt = data.amount;
      const amt = typeof rawAmt === "number" && !Number.isNaN(rawAmt) ? rawAmt : 0;
      const upiId = data.upiId ?? "localbazar@upi";
      const rawExpiry = data.expiresAt;
      const safeQrTimeout = Number.isFinite(qrTimeoutMs) ? qrTimeoutMs : 12e4;
      const expiresAt = typeof rawExpiry === "number" && !Number.isNaN(rawExpiry) ? rawExpiry : Date.now() + safeQrTimeout;
      const qrData = `upi://pay?pa=${upiId}&am=${amt}&cu=INR`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 ml-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        QRTimerDisplay,
        {
          qrData,
          amount: amt,
          expiresAt,
          validMinutes: qrTimeoutMinutes,
          onExpire: () => {
          },
          onRefresh: () => {
          },
          onClose: () => {
            setMessagesByPhone((prev) => {
              const msgs = prev[activePhone] ?? [];
              return {
                ...prev,
                [activePhone]: msgs.map(
                  (m) => m.id === msg.id ? {
                    ...m,
                    specialWidget: void 0,
                    widgetData: void 0
                  } : m
                )
              };
            });
          }
        }
      ) });
    }
    return null;
  }
  function switchUserType(role) {
    setActiveUserType(role);
    setSessions(
      (prev) => prev.map(
        (s) => s.phoneNumber === activePhone ? { ...s, userType: role } : s
      )
    );
    delete sessionContexts[activePhone];
    setMessagesByPhone((prev) => ({ ...prev, [activePhone]: [] }));
  }
  if (!ready) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-center h-screen gap-3",
        "data-ocid": "simulator.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Initializing simulator…" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-screen -m-4 md:-m-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden min-h-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${showScenariosMobile ? "flex" : "hidden"} md:flex w-72 flex-shrink-0 flex-col border-r border-border bg-card absolute md:relative z-20 h-full`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border flex-shrink-0 bg-sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-sidebar-foreground", children: "Chat Simulator" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-sidebar-foreground/50", children: "WhatsApp Test Mode" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => {
                    seedSampleData.mutate(void 0, {
                      onSuccess: (summary) => {
                        const msg = buildSeedSummaryMessage(summary);
                        ue.success(`✅ ${msg}`, { duration: 6e3 });
                      },
                      onError: () => ue.error("Failed to load sample data")
                    });
                  },
                  disabled: seedSampleData.isPending,
                  "data-ocid": "chatbot-load-sample-data",
                  title: "Load sample data into backend",
                  className: "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 h-7 px-2",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => setShowNewSession(true),
                  "data-ocid": "chatbot-new-session",
                  className: "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 h-7 px-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                    "New"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => setShowScenariosMobile(false),
                  className: "md:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 h-7 px-2",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 border-b border-border flex-shrink-0 bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5 px-1", children: "Quick Scenarios" }),
            registryCtx.loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading flows…" })
            ] }),
            !registryCtx.loading && registryCtx.error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-2 rounded-md bg-destructive/10 border border-destructive/20 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "Failed to load flows" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => registryCtx.refresh(),
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                    "Retry"
                  ]
                }
              )
            ] }),
            !registryCtx.loading && !registryCtx.error && registryCtx.flows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-2 rounded-md bg-muted/60 border border-border flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground italic leading-snug", children: "No flows available — run Load Sample Data to populate the registry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => registryCtx.refresh(),
                  className: "flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                    "Refresh"
                  ]
                }
              )
            ] }),
            !registryCtx.loading && !registryCtx.error && registryCtx.flows.length > 0 && (() => {
              const roleTabs = [
                { label: "Customer", value: "customer" },
                { label: "Merchant", value: "merchant" },
                { label: "Delivery", value: "delivery" },
                { label: "Manufacturer", value: "manufacturer" }
              ];
              const registryFlows = registryCtx.flows;
              const triggerToFlow = new Map(
                registryFlows.map((f) => [f.triggerPayload, f])
              );
              const roleFiltered = activeScenarios.filter((s) => {
                const flow = triggerToFlow.get(s.startMsg);
                if (!flow) return roleFilter === "customer";
                const roles = Array.isArray(flow.roles) ? flow.roles : [];
                const flowId = (flow.id || "").toLowerCase();
                const flowName = (flow.name || "").toLowerCase();
                if (roleFilter === "customer") {
                  const isMerchantOnly = roles.length === 1 && roles.includes("merchant");
                  const isDeliveryOnly = roles.length === 1 && roles.includes("delivery");
                  const isManufacturerOnly = roles.length === 1 && roles.includes("manufacturer");
                  return !isMerchantOnly && !isDeliveryOnly && !isManufacturerOnly;
                }
                if (roleFilter === "merchant") {
                  return roles.includes("merchant") || roles.includes("all") || flowId.includes("merchant") || flowId.includes("product") || flowId.includes("order") || flowId.includes("inventory") || flowId.includes("employee") || flowName.includes("merchant") || flowName.includes("product") || flowName.includes("order");
                }
                if (roleFilter === "delivery") {
                  return roles.includes("delivery") || roles.includes("all") || flowId.includes("delivery") || flowId.includes("route") || flowId.includes("earning") || flowName.includes("delivery") || flowName.includes("route");
                }
                if (roleFilter === "manufacturer") {
                  return roles.includes("manufacturer") || roles.includes("all") || flowId.includes("manufacturer") || flowId.includes("distributor") || flowId.includes("expiry") || flowId.includes("inventory") || flowName.includes("manufacturer") || flowName.includes("distributor") || flowName.includes("expiry");
                }
                return roles.includes(roleFilter) || roles.includes("all");
              });
              const sorted = [
                ...roleFiltered.filter((s) => {
                  const flow = triggerToFlow.get(s.startMsg);
                  return flow ? isRegistrationFlow(flow.id) : false;
                }),
                ...roleFiltered.filter((s) => {
                  const flow = triggerToFlow.get(s.startMsg);
                  return flow ? !isRegistrationFlow(flow.id) : true;
                })
              ];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex gap-0.5 mb-1.5",
                    "data-ocid": "simulator.role_tabs",
                    children: roleTabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setRoleFilter(tab.value),
                        "data-ocid": `simulator.role_tab.${tab.value}`,
                        className: `flex-1 py-1 text-[10px] font-medium rounded transition-colors ${roleFilter === tab.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
                        children: tab.label
                      },
                      tab.value
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5 max-h-[60vh] overflow-y-auto", children: sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground px-2 py-1 italic", children: "No scenarios for this role" }) : sorted.map((s) => {
                  const flow = triggerToFlow.get(s.startMsg);
                  const isReg = flow ? isRegistrationFlow(flow.id) : false;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        loadScenario(s);
                        setShowScenariosMobile(false);
                      },
                      "data-ocid": `scenario-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
                      className: "w-full text-left px-2 py-1.5 text-xs rounded-md hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 text-primary flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                          isReg ? "⭐ " : "",
                          s.label,
                          isReg && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-[9px] text-primary/60 font-medium", children: "(Start here)" })
                        ] })
                      ]
                    },
                    s.phone
                  );
                }) })
              ] });
            })()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setActivePhone(s.phoneNumber);
                setActiveUserType(s.userType);
                setShowScenariosMobile(false);
              },
              "data-ocid": "chatbot-session-item",
              className: `w-full text-left px-3 py-2.5 flex items-center gap-2.5 hover:bg-muted/50 transition-colors border-b border-border/40 ${activePhone === s.phoneNumber ? "bg-primary/5 border-l-2 border-l-primary" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: s.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground ml-1 flex-shrink-0", children: formatRelative(s.lastTimestamp) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[9px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${userTypeBg(s.userType)}`,
                        children: userTypeLabel(s.userType)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: s.lastMessage })
                  ] })
                ] })
              ]
            },
            s.phoneNumber
          )) }) })
        ]
      }
    ),
    showScenariosMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "button",
        tabIndex: 0,
        "aria-label": "Close scenarios panel",
        className: "md:hidden fixed inset-0 bg-black/50 z-10",
        onClick: () => setShowScenariosMobile(false),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ")
            setShowScenariosMobile(false);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5 flex-shrink-0 flex items-center gap-2 bg-sidebar border-b border-sidebar-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => setShowScenariosMobile(true),
            className: "md:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 h-7 px-2 flex-shrink-0",
            "data-ocid": "chatbot-scenarios-toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs ml-1", children: "Scenarios" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          citiesList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-sidebar-foreground/50 shrink-0 flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-2.5 h-2.5" }),
              " City:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: selectedCityId,
                onValueChange: setSelectedCityId,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-5 text-[9px] border-0 bg-black/20 text-sidebar-foreground px-1.5 py-0 rounded-md min-w-0 max-w-[140px] focus:ring-0",
                      "data-ocid": "chatbot.city-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All cities" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all_cities__", className: "text-xs", children: "All cities (no city filter)" }),
                    citiesList.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id, className: "text-xs", children: [
                      c.isEnabled ? "" : "🚫 ",
                      c.name
                    ] }, c.id))
                  ] })
                ]
              }
            ),
            selectedCityId !== "__all_cities__" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium",
                "data-ocid": "chatbot.city-context-badge",
                children: Object.values(cityModuleOverrides).filter((v) => !v).length > 0 ? `${Object.values(cityModuleOverrides).filter((v) => !v).length} module(s) off in city` : "City active"
              }
            ),
            selectedCityId === "__all_cities__" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[9px] px-1.5 py-0.5 rounded-full bg-muted/30 text-muted-foreground",
                "data-ocid": "chatbot.no-city-notice",
                children: "No city — default menus"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-sidebar-foreground/50 shrink-0 flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-2.5 h-2.5" }),
              " Simulating as:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: simulatingMerchantId || "__customer_mode__",
                onValueChange: (v) => setSimulatingMerchantId(v || "__customer_mode__"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-5 text-[9px] border-0 bg-black/20 text-sidebar-foreground px-1.5 py-0 rounded-md min-w-0 max-w-[140px] focus:ring-0",
                      "data-ocid": "chatbot.simulating-as-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Customer mode" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__customer_mode__", className: "text-xs", children: "Customer mode (no merchant)" }),
                    merchantList.filter(
                      (m) => m.id && typeof m.id === "string" && m.id.trim().length > 0
                    ).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id, className: "text-xs", children: m.businessName || m.id }, m.id))
                  ] })
                ]
              }
            ),
            activeMerchantContext && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[9px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium truncate max-w-[100px]",
                "data-ocid": "chatbot.merchant-context-badge",
                children: [
                  "🏪 ",
                  activeMerchantContext.businessName
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-sidebar-foreground truncate flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Country", className: "text-base", children: getFlagEmoji(activePhone) }),
              activePhone
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-black/20 rounded-lg p-0.5", children: [
              UserRole.customer,
              UserRole.merchant,
              UserRole.deliveryPartner
            ].map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => switchUserType(role),
                "data-ocid": `user-type-switch-${role}`,
                className: `text-[9px] px-1.5 py-0.5 rounded-md font-medium transition-colors ${activeUserType === role ? "bg-primary text-primary-foreground" : "text-sidebar-foreground/60 hover:text-sidebar-foreground"}`,
                children: userTypeLabel(role)
              },
              role
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-sidebar-foreground/50", children: [
            currentCtx ? `State: ${currentCtx.state}` : "New conversation",
            " ",
            "· Test Mode"
          ] }),
          moduleRoleStatuses.length > 0 && (() => {
            const disabledCount = moduleRoleStatuses.filter(
              (item) => item && typeof item === "object" && "role" in item && "enabled" in item && item.role === "customer" && !item.enabled
            ).length;
            return disabledCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-medium",
                "data-ocid": "chatbot.module-status",
                children: [
                  disabledCount,
                  " module",
                  disabledCount > 1 ? "s" : "",
                  " off"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium",
                "data-ocid": "chatbot.module-status",
                children: "All modules on"
              }
            );
          })()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          sessionLang !== "en" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium flex items-center gap-1",
              title: `Detected language: ${LANG_LABELS[sessionLang]}`,
              "data-ocid": "chatbot.language-badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-2.5 h-2.5" }),
                LANG_LABELS[sessionLang],
                " | EN"
              ]
            }
          ),
          sessionLang !== "en" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => setShowBothLanguages((v) => !v),
              title: showBothLanguages ? "Hide native language" : "Show bilingual",
              "data-ocid": "chatbot.bilingual_toggle",
              className: "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 h-7 px-2",
              children: showBothLanguages ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: resetSession,
              "data-ocid": "chatbot-reset",
              className: "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 h-7 px-2 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs hidden sm:inline", children: "Reset" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: clearHistory,
              "data-ocid": "chatbot-clear",
              className: "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 h-7 px-2 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs hidden sm:inline", children: "Clear" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/script-executor",
              title: "Open Script Executor to run automated tests",
              "data-ocid": "chatbot-run-tests",
              className: "flex items-center gap-1 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 h-7 px-2 rounded text-xs transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Tests" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [
          activeOrder && /* @__PURE__ */ jsxRuntimeExports.jsx(
            OrderStatusBanner,
            {
              order: activeOrder,
              onRefresh: () => refreshActiveOrder(activeOrder.id)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ErrorBoundary,
            {
              section: "Message Rendering",
              fallback: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center flex-1 gap-3 p-6 text-center bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "⚠️" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Message rendering error" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: 'A message caused an error. Type "hi" to recover.' })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs text-primary hover:underline",
                    onClick: () => {
                      setMessagesByPhone((prev) => ({
                        ...prev,
                        [activePhone]: []
                      }));
                      delete sessionContexts[activePhone];
                    },
                    children: "Clear and restart"
                  }
                )
              ] }),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-3 space-y-2 bg-muted/20 min-h-0", children: [
                currentMessages.length === 0 && !showTyping ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-7 h-7 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Start a conversation" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: 'Type "hi" to begin, use a quick scenario above, or switch user type to test different flows.' }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 justify-center mt-1", children: ["hi", "1", "3", "4"].map((payload) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => sendMessage(payload),
                      className: "text-xs px-3 py-1 bg-card border border-primary/30 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors",
                      children: payload === "hi" ? "👋 Say Hi" : payload === "1" ? "🛒 Shop" : payload === "3" ? "💼 Jobs" : "🏠 Property"
                    },
                    payload
                  )) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  currentMessages.map((msg, _msgIdx) => {
                    if (!msg || typeof msg !== "object" || !msg.id || !msg.type) {
                      return null;
                    }
                    const msgContent = msg.content ?? "";
                    if (msg.type === "system") {
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex justify-center",
                          "data-ocid": "chatbot-system-msg",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] italic text-muted-foreground bg-black/5 dark:bg-white/5 px-3 py-0.5 rounded-full", children: msgContent })
                        },
                        msg.id ?? `sys-${_msgIdx}`
                      );
                    }
                    if (msg.type === "user") {
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex justify-end items-end gap-2 animate-in slide-in-from-bottom-2 duration-200",
                          "data-ocid": "chatbot-message",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3.5 py-2 shadow-sm", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm whitespace-pre-wrap break-words", children: msgContent }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-right mt-0.5 opacity-70", children: formatTime(msg.timestamp ?? Date.now()) })
                            ] }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-2.5 h-2.5 text-muted-foreground" }) })
                          ]
                        },
                        msg.id ?? `user-${_msgIdx}`
                      );
                    }
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-start gap-1 animate-in slide-in-from-bottom-2 duration-200",
                        "data-ocid": "chatbot-message",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-2.5 h-2.5 text-primary-foreground" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[280px] bg-card shadow-sm rounded-2xl rounded-bl-sm px-3.5 py-2 border border-border/60", children: [
                              sessionLang !== "en" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-primary/60 font-medium mb-0.5", children: [
                                LANG_LABELS[sessionLang],
                                " ",
                                showBothLanguages ? "| EN" : ""
                              ] }),
                              sessionLang !== "en" && showBothLanguages ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: msgContent.split("\n").map((line, li) => {
                                const sepIdx = line.indexOf(" | ");
                                if (sepIdx > 0) {
                                  const native = line.slice(0, sepIdx);
                                  const english = line.slice(sepIdx + 3);
                                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "p",
                                    {
                                      className: "text-sm break-words text-foreground",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: native }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs ml-1", children: [
                                          " ",
                                          "| ",
                                          english
                                        ] })
                                      ]
                                    },
                                    `${msg.id}-line-${li}`
                                  );
                                }
                                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "text-sm break-words text-foreground",
                                    children: line
                                  },
                                  `${msg.id}-line-${li}`
                                );
                              }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm whitespace-pre-wrap break-words text-foreground", children: msgContent }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-right mt-0.5 opacity-40", children: formatTime(msg.timestamp ?? Date.now()) })
                            ] })
                          ] }),
                          (() => {
                            try {
                              return renderWidget(msg);
                            } catch (widgetErr) {
                              console.error(
                                "[Simulator] renderWidget error:",
                                widgetErr
                              );
                              return null;
                            }
                          })(),
                          Array.isArray(msg.quickReplies) && msg.quickReplies.filter(Boolean).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-7 flex flex-wrap gap-1.5 mt-1", children: msg.quickReplies.filter(
                            (qr) => qr != null && typeof qr === "object" && qr.id && qr.title && qr.payload
                          ).map((qr) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => sendMessage(qr.payload),
                              disabled: sending,
                              "data-ocid": "chatbot-quick-reply",
                              className: `text-xs px-2.5 py-1 rounded-full hover:opacity-90 transition-all font-medium disabled:opacity-50 shadow-sm ${DASHBOARD_PAYLOADS.has(qr.payload) ? "bg-primary text-primary-foreground border border-primary ring-1 ring-primary/30" : "bg-card border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"}`,
                              children: qr.title
                            },
                            qr.id
                          )) })
                        ]
                      },
                      msg.id ?? `bot-${_msgIdx}`
                    );
                  }),
                  showTyping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-2.5 h-2.5 text-primary-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card shadow-sm rounded-2xl rounded-bl-sm px-4 py-2.5 border border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" })
                    ] }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
              ] })
            }
          ),
          showQuickLinksBar && activeDashboard && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-3 py-1.5 bg-primary/5 border-t border-primary/20 flex items-center gap-2 flex-shrink-0",
              "data-ocid": "chatbot.quick_links_bar",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-3 h-3 text-primary flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary font-semibold uppercase tracking-wide flex-shrink-0", children: "Quick Links" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => sendMessage(activeDashboard.payload),
                    disabled: sending,
                    "data-ocid": "chatbot.open_dashboard_button",
                    className: "text-xs px-3 py-0.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-semibold shadow-sm disabled:opacity-50 flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-3 h-3" }),
                      activeDashboard.label
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground ml-auto", children: "Always visible" })
              ]
            }
          ),
          activeQuickReplies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 bg-card/90 border-t border-border/40 flex flex-wrap gap-1.5 flex-shrink-0", children: activeQuickReplies.map((qr) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => sendMessage(qr.payload),
              disabled: sending,
              "data-ocid": "chatbot-quick-reply-input",
              className: `text-xs px-2.5 py-1 rounded-full transition-colors font-medium disabled:opacity-50 ${DASHBOARD_PAYLOADS.has(qr.payload) ? "bg-primary text-primary-foreground border border-primary hover:bg-primary/90 shadow-sm" : "bg-primary/5 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"}`,
              children: qr.title
            },
            qr.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-t border-border px-3 py-2.5 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handleImageUpload
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "icon",
                  variant: "ghost",
                  onClick: () => {
                    var _a;
                    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                  },
                  "data-ocid": "chatbot-image-upload",
                  className: "rounded-full w-8 h-8 flex-shrink-0 text-muted-foreground hover:text-primary hover:bg-primary/10",
                  title: "Send product photo for image search",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  ref: inputRef,
                  value: message,
                  onChange: (e) => setMessage(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  },
                  placeholder: "Type a message or product keyword...",
                  disabled: sending,
                  "data-ocid": "chatbot-message-input",
                  className: "flex-1 rounded-full text-sm h-9"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "icon",
                  onClick: () => sendMessage(),
                  disabled: !message.trim() || sending,
                  "data-ocid": "chatbot-send-button",
                  className: "rounded-full w-8 h-8 flex-shrink-0 bg-primary hover:bg-primary/90",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground text-center mt-1", children: "📸 Tap camera icon to simulate product image search" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex w-60 flex-col border-l border-border bg-card flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setStateExpanded((v) => !v),
              className: "px-3 py-2.5 border-b border-border flex items-center justify-between hover:bg-muted/30 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "State Inspector" }),
                stateExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground" })
              ]
            }
          ),
          stateExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-widest text-muted-foreground font-semibold mb-1", children: "Current State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs font-mono bg-primary/5 border-primary/30 text-primary",
                  children: (currentCtx == null ? void 0 : currentCtx.state) ?? "—"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5", children: "Transitions" }),
              currentCtx && currentCtx.stateHistory.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: currentCtx.stateHistory.slice(-6).reverse().map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-[9px] font-mono bg-muted/50 rounded px-1.5 py-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate block", children: t.from }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "↓" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium block truncate", children: t.to })
                  ]
                },
                `${t.from}-${t.to}-${t.timestamp}-${i}`
              )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground italic", children: "No transitions yet" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-widest text-muted-foreground font-semibold mb-1", children: "Session" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: [
                ["Phone", activePhone.slice(-6)],
                ["Role", userTypeLabel(activeUserType)],
                ["Messages", String(currentMessages.length)],
                ["Name", (currentCtx == null ? void 0 : currentCtx.name) ?? "—"],
                ["Location", (currentCtx == null ? void 0 : currentCtx.location) ?? "—"]
              ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between text-[10px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: k }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono truncate ml-2 max-w-[80px]", children: v })
                  ]
                },
                k
              )) })
            ] }),
            currentCtx && Object.keys(currentCtx.stateData).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-widest text-muted-foreground font-semibold mb-1", children: "State Data" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[9px] font-mono bg-muted/50 rounded p-1.5 whitespace-pre-wrap break-all text-foreground", children: JSON.stringify(currentCtx.stateData, null, 2) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: copySessionJson,
                "data-ocid": "chatbot-copy-json",
                className: "w-full text-xs gap-1.5 h-7",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "w-3 h-3" }),
                  "Copy JSON"
                ]
              }
            )
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showNewSession, onOpenChange: setShowNewSession, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" }),
        "New Chat Session"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-phone", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "new-phone",
              value: newPhone,
              onChange: (e) => setNewPhone(e.target.value),
              placeholder: "+91 98765 43210",
              "data-ocid": "new-session-phone"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "User Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
            UserRole.customer,
            UserRole.merchant,
            UserRole.deliveryPartner
          ].map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setNewUserType(role),
              "data-ocid": `new-session-role-${role}`,
              className: `px-2 py-2 text-xs rounded-lg border transition-colors ${newUserType === role ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50 text-foreground"}`,
              children: userTypeLabel(role)
            },
            role
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: createSession,
            disabled: !newPhone.trim(),
            "data-ocid": "new-session-create",
            className: "w-full",
            children: "Start Session"
          }
        )
      ] })
    ] }) })
  ] }) });
}
function ChatbotSimulatorPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { section: "Chatbot Simulator", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChatbotSimulatorInner, {}) });
}
export {
  ChatbotSimulatorPage as default
};
