import { be as useOndcEnrollments, bf as useOndcProductSearch, r as reactExports, V as VerificationStatus, U as UserRole, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-g1LGwGv2.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { G as Globe } from "./globe--tJa3NSQ.js";
import { S as Send } from "./send-DoOOMmv0.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { T as TriangleAlert } from "./triangle-alert-BhhO8CMW.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { F as FileText } from "./file-text-ZAufnVPm.js";
import { B as Building2 } from "./building-2-B0h7D8pK.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { C as CircleHelp } from "./circle-help-CUB1AuXK.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { C as ChevronUp } from "./chevron-up-BzRcvKHL.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./index-BtrS4JsN.js";
import "./index-z5OST4d2.js";
import "./index-yUS8KoxU.js";
const STATUS_BADGE = {
  [VerificationStatus.pending]: { label: "Pending", variant: "secondary" },
  [VerificationStatus.verified]: { label: "Verified", variant: "default" },
  [VerificationStatus.rejected]: { label: "Rejected", variant: "destructive" }
};
const TIMELINE_STEPS = ["Submitted", "Under Review", "Decision"];
const KYC_DOCS = [
  { label: "PAN Card", required: true },
  { label: "GSTIN Certificate", required: true },
  { label: "Aadhaar Card", required: true },
  { label: "Bank Statement (3 months)", required: true },
  { label: "Cancelled Cheque", required: true },
  { label: "FSSAI License (food merchants)", required: false },
  { label: "Shop Establishment Certificate", required: false }
];
const MERCHANT_STEPS = [
  {
    title: "Register on ONDC Portal",
    description: "Visit seller.ondc.org and create your seller account. You'll need your GST number, PAN, and Aadhaar ready.",
    action: "Go to seller.ondc.org → 'Register as Seller' → Fill in basic business details.",
    link: "https://seller.ondc.org",
    linkLabel: "seller.ondc.org"
  },
  {
    title: "Get Your NP ID (Network Participant ID)",
    description: "Once registered, ONDC issues a unique Network Participant ID. This is your identity on the ONDC network.",
    action: "After registration, check your email for the NP ID. Save this securely — required for all API calls.",
    link: null,
    linkLabel: null
  },
  {
    title: "Setup BAP/BPP (Buyer/Seller Application Protocol)",
    description: "Configure the BPP (Buyer App Protocol) to list your products and receive orders. This connects your catalog to the ONDC network.",
    action: "Use ONDC's reference implementation or a certified TSP (Tech Service Provider) like Eunimart or Digiit to configure BPP endpoints.",
    link: "https://ondc-official.github.io/ONDC-RET-Specifications/",
    linkLabel: "ONDC API Spec"
  },
  {
    title: "KYC Verification",
    description: "Submit your KYC documents: PAN Card, Aadhaar, GSTIN certificate, bank account details, and cancelled cheque.",
    action: "Upload all documents in the ONDC portal under 'KYC & Compliance'. Verification takes 2–5 business days.",
    link: null,
    linkLabel: null
  },
  {
    title: "Product Catalog Integration",
    description: "Upload your full product catalog via ONDC's catalog API. Products become discoverable across all ONDC buyer apps.",
    action: "Export products from WhatsCart dashboard → Upload to ONDC catalog API or use your TSP's sync tool.",
    link: null,
    linkLabel: null
  },
  {
    title: "Order Management Integration (Configure Webhook)",
    description: "Set up webhook endpoints so ONDC can send order notifications to WhatsCart in real time.",
    action: "In WhatsCart admin, go to Settings → Webhooks → Copy ONDC endpoint URL. Paste in ONDC portal under 'Webhook Configuration'.",
    link: null,
    linkLabel: null
  },
  {
    title: "Test on Staging Environment",
    description: "ONDC provides a staging network to test your integration end-to-end before going live.",
    action: "Use staging.ondc.org to place test orders. Verify catalog discovery, order flow, and webhook delivery.",
    link: "https://staging.ondc.org",
    linkLabel: "staging.ondc.org"
  },
  {
    title: "Go Live on ONDC Network",
    description: "Once testing is successful, request production access from ONDC. Your products will appear on all ONDC buyer apps.",
    action: "Submit a 'Go Live' request in the ONDC portal with your test completion report. Live access typically granted in 2–3 business days.",
    link: null,
    linkLabel: null
  }
];
const DELIVERY_STEPS = [
  {
    title: "Register as LSP at ONDC Logistics Portal",
    description: "Visit logistics.ondc.org and register as a Logistics Service Provider (LSP). This is separate from the seller portal.",
    action: "Go to logistics.ondc.org → 'Register as LSP' → Provide company name, GST number, and service areas.",
    link: "https://logistics.ondc.org",
    linkLabel: "logistics.ondc.org"
  },
  {
    title: "Get Your LSP ID (Logistics Service Provider ID)",
    description: "After registration, you receive an LSP ID that uniquely identifies your logistics entity on the ONDC network.",
    action: "Check your registration email for LSP credentials. This ID is required for all subsequent API integrations.",
    link: null,
    linkLabel: null
  },
  {
    title: "Setup Logistics API Endpoints",
    description: "Implement ONDC Logistics API endpoints for pickup confirmation, real-time tracking, and delivery confirmation.",
    action: "Configure pickup endpoint (/on_assign), tracking endpoint (/on_track), and delivery endpoint (/on_confirm) on your server.",
    link: "https://ondc-official.github.io/ONDC-LOG-Specifications/",
    linkLabel: "ONDC Logistics Spec"
  },
  {
    title: "KYC Verification for LSP",
    description: "Submit your company KYC: GST certificate, PAN of proprietor/company, cancelled cheque, and fleet details.",
    action: "Upload documents in the ONDC Logistics portal. KYC verification takes 3–7 business days.",
    link: null,
    linkLabel: null
  },
  {
    title: "Rate Card Setup",
    description: "Configure your per-km delivery rates, weight-based pricing, and zone-specific charges on the ONDC network.",
    action: "In ONDC Logistics portal → 'Rate Cards' → Add base rate, per-km rate, and weight slabs. Set your serviceable pin codes.",
    link: null,
    linkLabel: null
  },
  {
    title: "Test Logistics Integration",
    description: "Test end-to-end order assignment, pickup, and delivery flow on ONDC staging with mock orders.",
    action: "Use ONDC staging environment to simulate order assignments. Verify webhook delivery and real-time tracking updates.",
    link: "https://staging.ondc.org",
    linkLabel: "staging.ondc.org"
  },
  {
    title: "Go Live as ONDC Logistics Partner",
    description: "Submit your test completion certificate and service-level agreement to ONDC for final approval.",
    action: "Submit 'Go Live' request with test summary report. ONDC team reviews and activates your LSP ID within 2–3 business days.",
    link: null,
    linkLabel: null
  }
];
const ONDC_FAQ = [
  {
    q: "What is ONDC and why should merchants join?",
    a: "ONDC (Open Network for Digital Commerce) is a government-backed open network that allows merchants to be discovered by millions of customers across multiple buyer apps (Paytm, Meesho, Pincode, etc.) with lower commissions than traditional platforms."
  },
  {
    q: "Is ONDC enrollment mandatory for merchants on WhatsCart?",
    a: "No, ONDC enrollment is optional. Merchants can operate fully via WhatsApp orders on WhatsCart. ONDC enrollment extends reach to additional customer channels."
  },
  {
    q: "How long does ONDC verification take?",
    a: "KYC verification typically takes 3–7 business days. After KYC approval, catalog integration and go-live can be completed in 2–5 additional days."
  },
  {
    q: "What documents are required for ONDC merchant enrollment?",
    a: "PAN Card, Aadhaar Card, GSTIN certificate, bank account details, and cancelled cheque. Food businesses also need FSSAI license."
  },
  {
    q: "What are the charges to join ONDC?",
    a: "ONDC itself charges a nominal transaction fee (typically 1–2%). There may be TSP (Tech Service Provider) charges for API integration support, which varies by provider."
  },
  {
    q: "Can I use WhatsCart without ONDC integration?",
    a: "Yes, WhatsCart works completely independently with WhatsApp-based ordering, without any ONDC dependency."
  },
  {
    q: "What is a Network Participant (NP) ID?",
    a: "It's your unique identifier on the ONDC network, assigned after registration. All API calls and order transactions reference this ID."
  },
  {
    q: "What is a TSP (Tech Service Provider) and do I need one?",
    a: "TSPs like Eunimart, Digiit, and eSamudaay help merchants integrate technically with ONDC's APIs. Recommended for merchants without an in-house tech team."
  },
  {
    q: "How does ONDC order management work with WhatsCart?",
    a: "ONDC orders are routed to WhatsCart via webhook. Merchants receive ONDC orders the same way they receive WhatsApp orders — through the WhatsCart dashboard and chatbot notification."
  },
  {
    q: "Can delivery partners join ONDC separately from merchants?",
    a: "Yes. Delivery partners register as Logistics Service Providers (LSPs) on logistics.ondc.org — a separate registration from merchant enrollment on seller.ondc.org."
  }
];
function StatusBadge({ status }) {
  const cfg = STATUS_BADGE[status] ?? {
    label: status,
    variant: "secondary"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: cfg.variant, className: "capitalize text-xs", children: cfg.label });
}
function StatTile({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 shadow-card text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${color}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: label })
  ] });
}
function StepperGuide({
  steps,
  completed,
  onToggle
}) {
  const [expanded, setExpanded] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: steps.map((step, i) => {
    const isDone = completed.has(i);
    const isOpen = expanded === i;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-4 pb-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onToggle(i),
            "aria-label": `Toggle step ${i + 1} completion`,
            className: `w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 transition-smooth ${isDone ? "bg-emerald-500 border-emerald-500 text-white" : "bg-card border-border text-muted-foreground hover:border-primary/60"}`,
            children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }) : i + 1
          }
        ),
        i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-0.5 flex-1 my-1 min-h-[2rem] ${isDone ? "bg-emerald-400" : "bg-border"}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setExpanded(isOpen ? null : i),
          className: "w-full text-left",
          "data-ocid": `ondc-step-${i}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `border rounded-xl overflow-hidden transition-smooth ${isDone ? "border-emerald-500/30 bg-emerald-50/10" : isOpen ? "border-primary/40 bg-card" : "border-border bg-card hover:border-primary/30"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-xs font-semibold uppercase tracking-wide flex-shrink-0 ${isDone ? "text-emerald-600" : "text-muted-foreground"}`,
                        children: [
                          "Step ",
                          i + 1
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-sm font-semibold truncate ${isDone ? "text-emerald-700 dark:text-emerald-400 line-through opacity-75" : "text-foreground"}`,
                        children: step.title
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                    isDone && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30 border", children: "Done" }),
                    isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
                  ] })
                ] }),
                isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 border-t border-border space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground pt-3", children: step.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1", children: "📋 Action Required" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: step.action })
                  ] }),
                  step.link && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: step.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium",
                      onClick: (e) => e.stopPropagation(),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }),
                        " ",
                        step.linkLabel,
                        " ↗"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        onToggle(i);
                      },
                      className: `text-xs px-3 py-1.5 rounded-full border font-medium transition-smooth ${isDone ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-muted/40" : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"}`,
                      children: isDone ? "✓ Mark Incomplete" : "Mark as Complete"
                    }
                  )
                ] })
              ]
            }
          )
        }
      ) })
    ] }, step.title);
  }) });
}
function FaqAccordion({ items }) {
  const [open, setOpen] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-xl overflow-hidden bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-start justify-between px-4 py-3.5 text-left hover:bg-muted/20 transition-colors gap-3",
            onClick: () => setOpen(open === i ? null : i),
            "data-ocid": `ondc-faq-${i}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: item.q })
              ] }),
              open === i ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" })
            ]
          }
        ),
        open === i && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground pt-3 leading-relaxed", children: item.a }) })
      ]
    },
    item.q
  )) });
}
function EnrollmentRow({
  enrollment,
  onReview
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: enrollment.businessName }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-sm text-muted-foreground", children: enrollment.role === UserRole.deliveryPartner ? "Delivery Partner" : enrollment.role }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: enrollment.gstin ?? "—" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: enrollment.bankAccount }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: enrollment.ifscCode }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: new Date(Number(enrollment.submittedAt)).toLocaleDateString("en-IN") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: enrollment.enrollmentStatus }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: () => onReview(enrollment),
          "data-ocid": `ondc-review-${enrollment.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 mr-1" }),
            " Review"
          ]
        }
      ),
      enrollment.enrollmentStatus === VerificationStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-2.5",
            "data-ocid": `ondc-approve-${enrollment.id}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "destructive",
            className: "h-8 px-2.5",
            "data-ocid": `ondc-reject-${enrollment.id}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] }) })
  ] });
}
function OndcPage() {
  const { data: allEnrollments = [], isLoading } = useOndcEnrollments();
  const ondcSearch = useOndcProductSearch();
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [selectedEnrollment, setSelectedEnrollment] = reactExports.useState(null);
  const [adminNotes, setAdminNotes] = reactExports.useState("");
  const [rejectionReason, setRejectionReason] = reactExports.useState("");
  const [showInviteDialog, setShowInviteDialog] = reactExports.useState(false);
  const [inviteSearch, setInviteSearch] = reactExports.useState("");
  const [inviteMessage, setInviteMessage] = reactExports.useState(
    "You are invited to join ONDC via LocalBazar Kart! Visit seller.ondc.org to register. Our team will guide you through each step."
  );
  const [searchKeyword, setSearchKeyword] = reactExports.useState("");
  const [searchLat, setSearchLat] = reactExports.useState("28.6");
  const [searchLng, setSearchLng] = reactExports.useState("77.2");
  const [includeNetwork, setIncludeNetwork] = reactExports.useState(true);
  const [searchFailed, setSearchFailed] = reactExports.useState(false);
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [hasSearched, setHasSearched] = reactExports.useState(false);
  async function handleOndcSearch(e) {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      ue.error("Enter a search keyword");
      return;
    }
    setSearchFailed(false);
    try {
      const results = await ondcSearch.mutateAsync({
        keyword: searchKeyword.trim(),
        lat: Number.parseFloat(searchLat) || 28.6,
        lng: Number.parseFloat(searchLng) || 77.2
      });
      const resultsArr = Array.isArray(results) ? results : [];
      const filtered = includeNetwork ? resultsArr : resultsArr.filter((r) => !r.isOndc);
      setSearchResults(filtered);
      setHasSearched(true);
    } catch {
      setSearchFailed(true);
      ue.error("ONDC network search failed — showing local results only");
      setHasSearched(true);
      setSearchResults([]);
    }
  }
  const [merchantCompleted, setMerchantCompleted] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [deliveryCompleted, setDeliveryCompleted] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const total = allEnrollments.length;
  const pending = allEnrollments.filter(
    (e) => e.enrollmentStatus === VerificationStatus.pending
  ).length;
  const verified = allEnrollments.filter(
    (e) => e.enrollmentStatus === VerificationStatus.verified
  ).length;
  const rejected = allEnrollments.filter(
    (e) => e.enrollmentStatus === VerificationStatus.rejected
  ).length;
  const merchants = allEnrollments.filter((e) => e.role === UserRole.merchant);
  const partners = allEnrollments.filter(
    (e) => e.role === UserRole.deliveryPartner
  );
  function filterByStatus(list) {
    if (statusFilter === "all") return list;
    return list.filter((e) => e.enrollmentStatus === statusFilter);
  }
  function getTimelineStep(status) {
    if (status === VerificationStatus.pending) return 1;
    return 2;
  }
  function toggleMerchantStep(i) {
    setMerchantCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }
  function toggleDeliveryStep(i) {
    setDeliveryCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }
  const STATUS_FILTERS = [
    { label: "All", value: "all" },
    { label: "Pending", value: VerificationStatus.pending },
    { label: "Verified", value: VerificationStatus.verified },
    { label: "Rejected", value: VerificationStatus.rejected }
  ];
  function EnrollmentTable({ data }) {
    const filtered = filterByStatus(data);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: [
        "Business Name",
        "Role",
        "GSTIN",
        "Bank Account",
        "IFSC",
        "Submitted",
        "Status",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 8,
          className: "py-8 text-center text-muted-foreground text-sm",
          children: "Loading..."
        }
      ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 8, className: "py-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-8 h-8 text-muted-foreground/40 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No enrollments found" })
      ] }) }) : filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnrollmentRow,
        {
          enrollment: e,
          onReview: (en) => {
            setSelectedEnrollment(en);
            setAdminNotes(en.notes ?? "");
          }
        },
        e.id
      )) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "ONDC Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Open Network for Digital Commerce — Setup Guide & Enrollment" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowInviteDialog(true),
          className: "gap-2",
          "data-ocid": "ondc-invite-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
            " Send ONDC Invitation"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatTile,
        {
          label: "Total Enrollments",
          value: total,
          color: "text-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatTile,
        {
          label: "Pending Review",
          value: pending,
          color: "text-amber-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Verified", value: verified, color: "text-emerald-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Rejected", value: rejected, color: "text-destructive" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "ONDC Product Search" }),
        includeNetwork && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-emerald-600 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }),
          " Powered by ONDC Network"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Include Network Partners" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: includeNetwork,
              onCheckedChange: setIncludeNetwork,
              "data-ocid": "ondc-include-network-toggle"
            }
          )
        ] })
      ] }),
      searchFailed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-2 bg-amber-50 border-b border-amber-200 text-xs text-amber-700 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
        "Network search unavailable — showing local results only"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleOndcSearch, className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ondcKeyword", children: "Search Keyword" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ondcKeyword",
                value: searchKeyword,
                onChange: (e) => setSearchKeyword(e.target.value),
                placeholder: "e.g. Dal, Rice, Masala...",
                "data-ocid": "ondc-search-keyword"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ondcLat", children: "Latitude" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ondcLat",
                value: searchLat,
                onChange: (e) => setSearchLat(e.target.value),
                placeholder: "28.6",
                type: "number",
                step: "0.001",
                "data-ocid": "ondc-search-lat"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ondcLng", children: "Longitude" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ondcLng",
                value: searchLng,
                onChange: (e) => setSearchLng(e.target.value),
                placeholder: "77.2",
                type: "number",
                step: "0.001",
                "data-ocid": "ondc-search-lng"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: ondcSearch.isPending,
            "data-ocid": "ondc-search-button",
            className: "gap-2",
            children: [
              ondcSearch.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
              ondcSearch.isPending ? "Searching..." : "Search ONDC Network"
            ]
          }
        )
      ] }),
      hasSearched && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: searchResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-8 text-center",
          "data-ocid": "ondc-search-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-8 h-8 text-muted-foreground/30 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No ONDC products found for this search" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: ["Title", "Merchant", "Category", "Price", "ONDC"].map(
          (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: h
            },
            h
          )
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: searchResults.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 last:border-0 hover:bg-muted/20",
            "data-ocid": `ondc-result.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: product.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: product.merchantName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: product.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-sm", children: [
                "₹",
                product.price.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: product.isOndc ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30 border", children: "ONDC" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Local" }) })
            ]
          },
          product.id
        )) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "setup", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", "data-ocid": "ondc-main-tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "setup", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
          " Setup Guide"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "enrollments", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
          " Enrollment Management"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "setup", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-5 pb-0 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "ONDC Step-by-Step Setup Guide" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Follow these steps to enroll your merchants and delivery partners on the ONDC network. Check off each step as you complete it." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "merchant-guide", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "merchant-guide",
                  className: "gap-1.5",
                  "data-ocid": "ondc-guide-tab-merchant",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5" }),
                    " For Merchants (8 Steps)"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "delivery-guide",
                  className: "gap-1.5",
                  "data-ocid": "ondc-guide-tab-delivery",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
                    " For Delivery Partners (7 Steps)"
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "merchant-guide", className: "p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Merchant Setup Progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    merchantCompleted.size,
                    "/",
                    MERCHANT_STEPS.length,
                    " completed"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-emerald-500 rounded-full transition-smooth",
                    style: {
                      width: `${merchantCompleted.size / MERCHANT_STEPS.length * 100}%`
                    }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StepperGuide,
                {
                  steps: MERCHANT_STEPS,
                  completed: merchantCompleted,
                  onToggle: toggleMerchantStep
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "delivery-guide", className: "p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Delivery Partner Setup Progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    deliveryCompleted.size,
                    "/",
                    DELIVERY_STEPS.length,
                    " completed"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-emerald-500 rounded-full transition-smooth",
                    style: {
                      width: `${deliveryCompleted.size / DELIVERY_STEPS.length * 100}%`
                    }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StepperGuide,
                {
                  steps: DELIVERY_STEPS,
                  completed: deliveryCompleted,
                  onToggle: toggleDeliveryStep
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "ONDC Frequently Asked Questions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "10 common questions from merchants and delivery partners" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaqAccordion, { items: ONDC_FAQ }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Why Join ONDC?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 grid grid-cols-1 gap-4", children: [
              {
                emoji: "🌐",
                title: "Wider Reach",
                desc: "Millions of customers on Paytm, Meesho, Pincode."
              },
              {
                emoji: "💰",
                title: "Lower Commissions",
                desc: "1–2% vs 20–30% on traditional platforms."
              },
              {
                emoji: "🔄",
                title: "Interoperability",
                desc: "List once, discovered everywhere on ONDC."
              },
              {
                emoji: "📊",
                title: "Transparent Analytics",
                desc: "Standardized order and payment reporting."
              },
              {
                emoji: "🛡️",
                title: "Regulatory Compliance",
                desc: "KYC meets RBI and GST norms automatically."
              },
              {
                emoji: "🚀",
                title: "ONDC Delivery",
                desc: "Access ONDC-certified delivery partners."
              }
            ].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl mt-0.5", children: b.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: b.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: b.desc })
              ] })
            ] }, b.title)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "KYC Documents Required" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: KYC_DOCS.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheckBig,
                    {
                      className: `w-4 h-4 flex-shrink-0 ${doc.required ? "text-primary" : "text-muted-foreground/50"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: doc.required ? "text-foreground font-medium" : "text-muted-foreground",
                      children: [
                        doc.label,
                        doc.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold", children: "Required" })
                      ]
                    }
                  )
                ]
              },
              doc.label
            )) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "enrollments", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1.5 flex-wrap",
            "data-ocid": "ondc-status-filter",
            children: STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setStatusFilter(f.value),
                className: `px-3 py-1.5 text-xs rounded-full border transition-colors font-medium ${statusFilter === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`,
                children: f.label
              },
              f.value
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "merchants", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-5 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "merchants", "data-ocid": "ondc-tab-merchants", children: [
              "Merchants (",
              merchants.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "partners", "data-ocid": "ondc-tab-partners", children: [
              "Delivery Partners (",
              partners.length,
              ")"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "merchants", className: "p-0 mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnrollmentTable, { data: merchants }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "partners", className: "p-0 mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnrollmentTable, { data: partners }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sheet,
      {
        open: !!selectedEnrollment,
        onOpenChange: (open) => {
          if (!open) {
            setSelectedEnrollment(null);
            setRejectionReason("");
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { className: "w-full sm:max-w-lg overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: "Enrollment Review" }) }),
          selectedEnrollment && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0", children: TIMELINE_STEPS.map((step, i) => {
              const activeStep = getTimelineStep(
                selectedEnrollment.enrollmentStatus
              );
              const isActive = i <= activeStep;
              const isFinal = selectedEnrollment.enrollmentStatus !== VerificationStatus.pending;
              const isFinalStep = i === 2;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${isActive ? isFinalStep && isFinal && selectedEnrollment.enrollmentStatus === VerificationStatus.rejected ? "bg-destructive border-destructive text-destructive-foreground" : "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground"}`,
                      children: i + 1
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground mt-1 text-center leading-tight", children: step })
                ] }),
                i < TIMELINE_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-0.5 flex-1 -mt-4 ${isActive && i < activeStep ? "bg-primary" : "bg-border"}`
                  }
                )
              ] }, step);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "Business Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Business Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mt-0.5", children: selectedEnrollment.businessName })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Role" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mt-0.5 capitalize", children: selectedEnrollment.role })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GSTIN" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-medium text-foreground mt-0.5", children: selectedEnrollment.gstin ?? "Not provided" })
                ] }),
                selectedEnrollment.fssaiLicense && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "FSSAI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-medium text-foreground mt-0.5", children: selectedEnrollment.fssaiLicense })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Bank Account" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-medium text-foreground mt-0.5", children: selectedEnrollment.bankAccount })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "IFSC" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-medium text-foreground mt-0.5", children: selectedEnrollment.ifscCode })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Submitted" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mt-0.5", children: new Date(
                    Number(selectedEnrollment.submittedAt)
                  ).toLocaleDateString("en-IN") })
                ] }),
                selectedEnrollment.reviewedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Reviewed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mt-0.5", children: new Date(
                    Number(selectedEnrollment.reviewedAt)
                  ).toLocaleDateString("en-IN") })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "KYC Document Checklist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
                { label: "PAN Card", done: true },
                {
                  label: "GSTIN Certificate",
                  done: !!selectedEnrollment.gstin
                },
                { label: "Aadhaar Card", done: true },
                { label: "Bank Statement", done: true },
                { label: "Cancelled Cheque", done: true },
                {
                  label: "FSSAI License",
                  done: !!selectedEnrollment.fssaiLicense
                }
              ].map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-2 text-sm",
                  children: [
                    doc.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-500 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: doc.done ? "text-foreground" : "text-muted-foreground/60 line-through",
                        children: doc.label
                      }
                    ),
                    doc.done ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-full", children: "Submitted" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded-full", children: "Missing" })
                  ]
                },
                doc.label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Current Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: selectedEnrollment.enrollmentStatus })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Admin Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: adminNotes,
                  onChange: (e) => setAdminNotes(e.target.value),
                  placeholder: "Add review notes, observations...",
                  rows: 2,
                  "data-ocid": "ondc-admin-notes"
                }
              )
            ] }),
            selectedEnrollment.enrollmentStatus === VerificationStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium text-destructive", children: [
                "Rejection Reason",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(required to reject)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: rejectionReason,
                  onChange: (e) => setRejectionReason(e.target.value),
                  placeholder: "Specify reason for rejection — e.g. 'GSTIN certificate missing', 'Bank details mismatch'...",
                  rows: 2,
                  "data-ocid": "ondc-rejection-reason"
                }
              )
            ] }),
            selectedEnrollment.enrollmentStatus === VerificationStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white",
                  onClick: () => setSelectedEnrollment(null),
                  "data-ocid": "ondc-drawer-approve",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-2" }),
                    " Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  className: "flex-1",
                  disabled: !rejectionReason.trim(),
                  onClick: () => setSelectedEnrollment(null),
                  "data-ocid": "ondc-drawer-reject",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mr-2" }),
                    " Reject"
                  ]
                }
              )
            ] }),
            selectedEnrollment.enrollmentStatus !== VerificationStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "w-full",
                onClick: () => setSelectedEnrollment(null),
                children: "Close"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showInviteDialog, onOpenChange: setShowInviteDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5 text-primary" }),
        " Send ONDC Invitation"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search Merchant or Delivery Partner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: inviteSearch,
              onChange: (e) => setInviteSearch(e.target.value),
              placeholder: "Type name, phone, or business name...",
              "data-ocid": "ondc-invite-search"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The invitation will be sent via WhatsApp chatbot notification." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Invitation Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: inviteMessage,
              onChange: (e) => setInviteMessage(e.target.value),
              rows: 4,
              "data-ocid": "ondc-invite-message"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "What the invitation includes:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Step-by-step ONDC registration link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Your custom message above" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ WhatsCart support contact for assistance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Direct link to seller.ondc.org / logistics.ondc.org" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => setShowInviteDialog(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1 gap-2",
              disabled: !inviteSearch.trim(),
              onClick: () => setShowInviteDialog(false),
              "data-ocid": "ondc-invite-send",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                " Send Invitation"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  OndcPage as default
};
