import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  Globe,
  HelpCircle,
  Loader2,
  Search,
  Send,
  Truck,
  XCircle,
} from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useOndcEnrollments, useOndcProductSearch } from "../hooks/useBackend";
import type { OndcEnrollment } from "../types";
import { UserRole, VerificationStatus } from "../types";

// ─── constants ────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  [VerificationStatus.pending]: { label: "Pending", variant: "secondary" },
  [VerificationStatus.verified]: { label: "Verified", variant: "default" },
  [VerificationStatus.rejected]: { label: "Rejected", variant: "destructive" },
};

const TIMELINE_STEPS = ["Submitted", "Under Review", "Decision"];

const KYC_DOCS = [
  { label: "PAN Card", required: true },
  { label: "GSTIN Certificate", required: true },
  { label: "Aadhaar Card", required: true },
  { label: "Bank Statement (3 months)", required: true },
  { label: "Cancelled Cheque", required: true },
  { label: "FSSAI License (food merchants)", required: false },
  { label: "Shop Establishment Certificate", required: false },
];

const MERCHANT_STEPS = [
  {
    title: "Register on ONDC Portal",
    description:
      "Visit seller.ondc.org and create your seller account. You'll need your GST number, PAN, and Aadhaar ready.",
    action:
      "Go to seller.ondc.org → 'Register as Seller' → Fill in basic business details.",
    link: "https://seller.ondc.org",
    linkLabel: "seller.ondc.org",
  },
  {
    title: "Get Your NP ID (Network Participant ID)",
    description:
      "Once registered, ONDC issues a unique Network Participant ID. This is your identity on the ONDC network.",
    action:
      "After registration, check your email for the NP ID. Save this securely — required for all API calls.",
    link: null,
    linkLabel: null,
  },
  {
    title: "Setup BAP/BPP (Buyer/Seller Application Protocol)",
    description:
      "Configure the BPP (Buyer App Protocol) to list your products and receive orders. This connects your catalog to the ONDC network.",
    action:
      "Use ONDC's reference implementation or a certified TSP (Tech Service Provider) like Eunimart or Digiit to configure BPP endpoints.",
    link: "https://ondc-official.github.io/ONDC-RET-Specifications/",
    linkLabel: "ONDC API Spec",
  },
  {
    title: "KYC Verification",
    description:
      "Submit your KYC documents: PAN Card, Aadhaar, GSTIN certificate, bank account details, and cancelled cheque.",
    action:
      "Upload all documents in the ONDC portal under 'KYC & Compliance'. Verification takes 2–5 business days.",
    link: null,
    linkLabel: null,
  },
  {
    title: "Product Catalog Integration",
    description:
      "Upload your full product catalog via ONDC's catalog API. Products become discoverable across all ONDC buyer apps.",
    action:
      "Export products from WhatsCart dashboard → Upload to ONDC catalog API or use your TSP's sync tool.",
    link: null,
    linkLabel: null,
  },
  {
    title: "Order Management Integration (Configure Webhook)",
    description:
      "Set up webhook endpoints so ONDC can send order notifications to WhatsCart in real time.",
    action:
      "In WhatsCart admin, go to Settings → Webhooks → Copy ONDC endpoint URL. Paste in ONDC portal under 'Webhook Configuration'.",
    link: null,
    linkLabel: null,
  },
  {
    title: "Test on Staging Environment",
    description:
      "ONDC provides a staging network to test your integration end-to-end before going live.",
    action:
      "Use staging.ondc.org to place test orders. Verify catalog discovery, order flow, and webhook delivery.",
    link: "https://staging.ondc.org",
    linkLabel: "staging.ondc.org",
  },
  {
    title: "Go Live on ONDC Network",
    description:
      "Once testing is successful, request production access from ONDC. Your products will appear on all ONDC buyer apps.",
    action:
      "Submit a 'Go Live' request in the ONDC portal with your test completion report. Live access typically granted in 2–3 business days.",
    link: null,
    linkLabel: null,
  },
];

const DELIVERY_STEPS = [
  {
    title: "Register as LSP at ONDC Logistics Portal",
    description:
      "Visit logistics.ondc.org and register as a Logistics Service Provider (LSP). This is separate from the seller portal.",
    action:
      "Go to logistics.ondc.org → 'Register as LSP' → Provide company name, GST number, and service areas.",
    link: "https://logistics.ondc.org",
    linkLabel: "logistics.ondc.org",
  },
  {
    title: "Get Your LSP ID (Logistics Service Provider ID)",
    description:
      "After registration, you receive an LSP ID that uniquely identifies your logistics entity on the ONDC network.",
    action:
      "Check your registration email for LSP credentials. This ID is required for all subsequent API integrations.",
    link: null,
    linkLabel: null,
  },
  {
    title: "Setup Logistics API Endpoints",
    description:
      "Implement ONDC Logistics API endpoints for pickup confirmation, real-time tracking, and delivery confirmation.",
    action:
      "Configure pickup endpoint (/on_assign), tracking endpoint (/on_track), and delivery endpoint (/on_confirm) on your server.",
    link: "https://ondc-official.github.io/ONDC-LOG-Specifications/",
    linkLabel: "ONDC Logistics Spec",
  },
  {
    title: "KYC Verification for LSP",
    description:
      "Submit your company KYC: GST certificate, PAN of proprietor/company, cancelled cheque, and fleet details.",
    action:
      "Upload documents in the ONDC Logistics portal. KYC verification takes 3–7 business days.",
    link: null,
    linkLabel: null,
  },
  {
    title: "Rate Card Setup",
    description:
      "Configure your per-km delivery rates, weight-based pricing, and zone-specific charges on the ONDC network.",
    action:
      "In ONDC Logistics portal → 'Rate Cards' → Add base rate, per-km rate, and weight slabs. Set your serviceable pin codes.",
    link: null,
    linkLabel: null,
  },
  {
    title: "Test Logistics Integration",
    description:
      "Test end-to-end order assignment, pickup, and delivery flow on ONDC staging with mock orders.",
    action:
      "Use ONDC staging environment to simulate order assignments. Verify webhook delivery and real-time tracking updates.",
    link: "https://staging.ondc.org",
    linkLabel: "staging.ondc.org",
  },
  {
    title: "Go Live as ONDC Logistics Partner",
    description:
      "Submit your test completion certificate and service-level agreement to ONDC for final approval.",
    action:
      "Submit 'Go Live' request with test summary report. ONDC team reviews and activates your LSP ID within 2–3 business days.",
    link: null,
    linkLabel: null,
  },
];

const ONDC_FAQ = [
  {
    q: "What is ONDC and why should merchants join?",
    a: "ONDC (Open Network for Digital Commerce) is a government-backed open network that allows merchants to be discovered by millions of customers across multiple buyer apps (Paytm, Meesho, Pincode, etc.) with lower commissions than traditional platforms.",
  },
  {
    q: "Is ONDC enrollment mandatory for merchants on WhatsCart?",
    a: "No, ONDC enrollment is optional. Merchants can operate fully via WhatsApp orders on WhatsCart. ONDC enrollment extends reach to additional customer channels.",
  },
  {
    q: "How long does ONDC verification take?",
    a: "KYC verification typically takes 3–7 business days. After KYC approval, catalog integration and go-live can be completed in 2–5 additional days.",
  },
  {
    q: "What documents are required for ONDC merchant enrollment?",
    a: "PAN Card, Aadhaar Card, GSTIN certificate, bank account details, and cancelled cheque. Food businesses also need FSSAI license.",
  },
  {
    q: "What are the charges to join ONDC?",
    a: "ONDC itself charges a nominal transaction fee (typically 1–2%). There may be TSP (Tech Service Provider) charges for API integration support, which varies by provider.",
  },
  {
    q: "Can I use WhatsCart without ONDC integration?",
    a: "Yes, WhatsCart works completely independently with WhatsApp-based ordering, without any ONDC dependency.",
  },
  {
    q: "What is a Network Participant (NP) ID?",
    a: "It's your unique identifier on the ONDC network, assigned after registration. All API calls and order transactions reference this ID.",
  },
  {
    q: "What is a TSP (Tech Service Provider) and do I need one?",
    a: "TSPs like Eunimart, Digiit, and eSamudaay help merchants integrate technically with ONDC's APIs. Recommended for merchants without an in-house tech team.",
  },
  {
    q: "How does ONDC order management work with WhatsCart?",
    a: "ONDC orders are routed to WhatsCart via webhook. Merchants receive ONDC orders the same way they receive WhatsApp orders — through the WhatsCart dashboard and chatbot notification.",
  },
  {
    q: "Can delivery partners join ONDC separately from merchants?",
    a: "Yes. Delivery partners register as Logistics Service Providers (LSPs) on logistics.ondc.org — a separate registration from merchant enrollment on seller.ondc.org.",
  },
];

// ─── sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_BADGE[status] ?? {
    label: status,
    variant: "secondary" as const,
  };
  return (
    <Badge variant={cfg.variant} className="capitalize text-xs">
      {cfg.label}
    </Badge>
  );
}

function StatTile({
  label,
  value,
  color,
}: { label: string; value: number; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-card text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function StepperGuide({
  steps,
  completed,
  onToggle,
}: {
  steps: typeof MERCHANT_STEPS;
  completed: Set<number>;
  onToggle: (i: number) => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const isDone = completed.has(i);
        const isOpen = expanded === i;
        return (
          <div key={step.title} className="relative flex gap-4 pb-0">
            {/* Connector line */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onToggle(i)}
                aria-label={`Toggle step ${i + 1} completion`}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 transition-smooth ${
                  isDone
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "bg-card border-border text-muted-foreground hover:border-primary/60"
                }`}
              >
                {isDone ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`w-0.5 flex-1 my-1 min-h-[2rem] ${isDone ? "bg-emerald-400" : "bg-border"}`}
                />
              )}
            </div>

            {/* Step card */}
            <div className="flex-1 pb-4">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full text-left"
                data-ocid={`ondc-step-${i}`}
              >
                <div
                  className={`border rounded-xl overflow-hidden transition-smooth ${
                    isDone
                      ? "border-emerald-500/30 bg-emerald-50/10"
                      : isOpen
                        ? "border-primary/40 bg-card"
                        : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between px-4 py-3 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide flex-shrink-0 ${
                          isDone ? "text-emerald-600" : "text-muted-foreground"
                        }`}
                      >
                        Step {i + 1}
                      </span>
                      <span
                        className={`text-sm font-semibold truncate ${
                          isDone
                            ? "text-emerald-700 dark:text-emerald-400 line-through opacity-75"
                            : "text-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isDone && (
                        <Badge className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30 border">
                          Done
                        </Badge>
                      )}
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-4 border-t border-border space-y-3">
                      <p className="text-sm text-muted-foreground pt-3">
                        {step.description}
                      </p>
                      <div className="bg-muted/40 rounded-lg p-3">
                        <p className="text-xs font-semibold text-foreground mb-1">
                          📋 Action Required
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.action}
                        </p>
                      </div>
                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="w-3 h-3" /> {step.linkLabel} ↗
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggle(i);
                        }}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-smooth ${
                          isDone
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-muted/40"
                            : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                        }`}
                      >
                        {isDone ? "✓ Mark Incomplete" : "Mark as Complete"}
                      </button>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FaqAccordion({ items }: { items: typeof ONDC_FAQ }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={item.q}
          className="border border-border rounded-xl overflow-hidden bg-card"
        >
          <button
            type="button"
            className="w-full flex items-start justify-between px-4 py-3.5 text-left hover:bg-muted/20 transition-colors gap-3"
            onClick={() => setOpen(open === i ? null : i)}
            data-ocid={`ondc-faq-${i}`}
          >
            <div className="flex items-start gap-2.5 flex-1 min-w-0">
              <HelpCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-foreground">
                {item.q}
              </span>
            </div>
            {open === i ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            )}
          </button>
          {open === i && (
            <div className="px-4 pb-4 border-t border-border">
              <p className="text-sm text-muted-foreground pt-3 leading-relaxed">
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function EnrollmentRow({
  enrollment,
  onReview,
}: { enrollment: OndcEnrollment; onReview: (e: OndcEnrollment) => void }) {
  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
      <td className="px-4 py-3 font-medium text-foreground">
        {enrollment.businessName}
      </td>
      <td className="px-4 py-3">
        <span className="capitalize text-sm text-muted-foreground">
          {enrollment.role === UserRole.deliveryPartner
            ? "Delivery Partner"
            : enrollment.role}
        </span>
      </td>
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
        {enrollment.gstin ?? "—"}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
        {enrollment.bankAccount}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
        {enrollment.ifscCode}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {new Date(Number(enrollment.submittedAt)).toLocaleDateString("en-IN")}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={enrollment.enrollmentStatus} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onReview(enrollment)}
            data-ocid={`ondc-review-${enrollment.id}`}
          >
            <Eye className="w-3.5 h-3.5 mr-1" /> Review
          </Button>
          {enrollment.enrollmentStatus === VerificationStatus.pending && (
            <>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-2.5"
                data-ocid={`ondc-approve-${enrollment.id}`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-8 px-2.5"
                data-ocid={`ondc-reject-${enrollment.id}`}
              >
                <XCircle className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function OndcPage() {
  const { data: allEnrollments = [], isLoading } = useOndcEnrollments();
  const ondcSearch = useOndcProductSearch();

  const [statusFilter, setStatusFilter] = useState<VerificationStatus | "all">(
    "all",
  );
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<OndcEnrollment | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteSearch, setInviteSearch] = useState("");
  const [inviteMessage, setInviteMessage] = useState(
    "You are invited to join ONDC via LocalBazar Kart! Visit seller.ondc.org to register. Our team will guide you through each step.",
  );

  // ONDC Product Search state
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLat, setSearchLat] = useState("28.6");
  const [searchLng, setSearchLng] = useState("77.2");
  const [includeNetwork, setIncludeNetwork] = useState(true);
  const [searchFailed, setSearchFailed] = useState(false);
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: string;
      merchantName: string;
      title: string;
      merchantId: string;
      isOndc: boolean;
      category: string;
      price: number;
    }>
  >([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleOndcSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      toast.error("Enter a search keyword");
      return;
    }
    setSearchFailed(false);
    try {
      const results = await ondcSearch.mutateAsync({
        keyword: searchKeyword.trim(),
        lat: Number.parseFloat(searchLat) || 28.6,
        lng: Number.parseFloat(searchLng) || 77.2,
      });
      const resultsArr = (Array.isArray(results) ? results : []) as Array<{
        isOndc?: boolean;
        [key: string]: unknown;
      }>;
      const filtered = includeNetwork
        ? resultsArr
        : resultsArr.filter((r) => !r.isOndc);
      setSearchResults(filtered as typeof searchResults);
      setHasSearched(true);
    } catch {
      setSearchFailed(true);
      toast.error("ONDC network search failed — showing local results only");
      setHasSearched(true);
      setSearchResults([]);
    }
  }

  const [merchantCompleted, setMerchantCompleted] = useState<Set<number>>(
    new Set(),
  );
  const [deliveryCompleted, setDeliveryCompleted] = useState<Set<number>>(
    new Set(),
  );

  const total = allEnrollments.length;
  const pending = allEnrollments.filter(
    (e) => e.enrollmentStatus === VerificationStatus.pending,
  ).length;
  const verified = allEnrollments.filter(
    (e) => e.enrollmentStatus === VerificationStatus.verified,
  ).length;
  const rejected = allEnrollments.filter(
    (e) => e.enrollmentStatus === VerificationStatus.rejected,
  ).length;

  const merchants = allEnrollments.filter((e) => e.role === UserRole.merchant);
  const partners = allEnrollments.filter(
    (e) => e.role === UserRole.deliveryPartner,
  );

  function filterByStatus(list: OndcEnrollment[]) {
    if (statusFilter === "all") return list;
    return list.filter((e) => e.enrollmentStatus === statusFilter);
  }

  function getTimelineStep(status: string) {
    if (status === VerificationStatus.pending) return 1;
    return 2;
  }

  function toggleMerchantStep(i: number) {
    setMerchantCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function toggleDeliveryStep(i: number) {
    setDeliveryCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const STATUS_FILTERS: { label: string; value: VerificationStatus | "all" }[] =
    [
      { label: "All", value: "all" },
      { label: "Pending", value: VerificationStatus.pending },
      { label: "Verified", value: VerificationStatus.verified },
      { label: "Rejected", value: VerificationStatus.rejected },
    ];

  function EnrollmentTable({ data }: { data: OndcEnrollment[] }) {
    const filtered = filterByStatus(data);
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {[
                "Business Name",
                "Role",
                "GSTIN",
                "Bank Account",
                "IFSC",
                "Submitted",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-8 text-center text-muted-foreground text-sm"
                >
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center">
                  <Globe className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No enrollments found
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map((e) => (
                <EnrollmentRow
                  key={e.id}
                  enrollment={e}
                  onReview={(en) => {
                    setSelectedEnrollment(en);
                    setAdminNotes(en.notes ?? "");
                  }}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              ONDC Management
            </h2>
            <p className="text-sm text-muted-foreground">
              Open Network for Digital Commerce — Setup Guide &amp; Enrollment
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowInviteDialog(true)}
          className="gap-2"
          data-ocid="ondc-invite-btn"
        >
          <Send className="w-4 h-4" /> Send ONDC Invitation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile
          label="Total Enrollments"
          value={total}
          color="text-foreground"
        />
        <StatTile
          label="Pending Review"
          value={pending}
          color="text-amber-600"
        />
        <StatTile label="Verified" value={verified} color="text-emerald-600" />
        <StatTile label="Rejected" value={rejected} color="text-destructive" />
      </div>

      {/* ── ONDC Product Search Test Panel ──────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2 flex-wrap">
          <Search className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            ONDC Product Search
          </h3>
          {includeNetwork && (
            <span className="ml-2 text-xs text-emerald-600 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <Globe className="w-3 h-3" /> Powered by ONDC Network
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Include Network Partners
            </span>
            <Switch
              checked={includeNetwork}
              onCheckedChange={setIncludeNetwork}
              data-ocid="ondc-include-network-toggle"
            />
          </div>
        </div>
        {searchFailed && (
          <div className="px-5 py-2 bg-amber-50 border-b border-amber-200 text-xs text-amber-700 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            Network search unavailable — showing local results only
          </div>
        )}
        <form onSubmit={handleOndcSearch} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1 space-y-1.5">
              <Label htmlFor="ondcKeyword">Search Keyword</Label>
              <Input
                id="ondcKeyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="e.g. Dal, Rice, Masala..."
                data-ocid="ondc-search-keyword"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ondcLat">Latitude</Label>
              <Input
                id="ondcLat"
                value={searchLat}
                onChange={(e) => setSearchLat(e.target.value)}
                placeholder="28.6"
                type="number"
                step="0.001"
                data-ocid="ondc-search-lat"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ondcLng">Longitude</Label>
              <Input
                id="ondcLng"
                value={searchLng}
                onChange={(e) => setSearchLng(e.target.value)}
                placeholder="77.2"
                type="number"
                step="0.001"
                data-ocid="ondc-search-lng"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={ondcSearch.isPending}
            data-ocid="ondc-search-button"
            className="gap-2"
          >
            {ondcSearch.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {ondcSearch.isPending ? "Searching..." : "Search ONDC Network"}
          </Button>
        </form>
        {hasSearched && (
          <div className="border-t border-border">
            {searchResults.length === 0 ? (
              <div
                className="py-8 text-center"
                data-ocid="ondc-search-empty-state"
              >
                <Globe className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No ONDC products found for this search
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      {["Title", "Merchant", "Category", "Price", "ONDC"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((product, idx) => (
                      <tr
                        key={product.id}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20"
                        data-ocid={`ondc-result.${idx + 1}`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {product.title}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {product.merchantName}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-sm">
                          ₹{product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          {product.isOndc ? (
                            <Badge className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30 border">
                              ONDC
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Local
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Tabs: Setup Guide | Enrollment Management */}
      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList className="w-full sm:w-auto" data-ocid="ondc-main-tabs">
          <TabsTrigger value="setup" className="gap-2">
            <BookOpen className="w-4 h-4" /> Setup Guide
          </TabsTrigger>
          <TabsTrigger value="enrollments" className="gap-2">
            <FileText className="w-4 h-4" /> Enrollment Management
          </TabsTrigger>
        </TabsList>

        {/* ── Setup Guide Tab ─────────────────────────────────────── */}
        <TabsContent value="setup" className="space-y-6">
          {/* Setup Guide inner tabs */}
          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-5 pt-5 pb-0 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-foreground">
                  ONDC Step-by-Step Setup Guide
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Follow these steps to enroll your merchants and delivery
                partners on the ONDC network. Check off each step as you
                complete it.
              </p>
            </div>

            <Tabs defaultValue="merchant-guide">
              <div className="px-5 pt-4 border-b border-border">
                <TabsList>
                  <TabsTrigger
                    value="merchant-guide"
                    className="gap-1.5"
                    data-ocid="ondc-guide-tab-merchant"
                  >
                    <Building2 className="w-3.5 h-3.5" /> For Merchants (8
                    Steps)
                  </TabsTrigger>
                  <TabsTrigger
                    value="delivery-guide"
                    className="gap-1.5"
                    data-ocid="ondc-guide-tab-delivery"
                  >
                    <Truck className="w-3.5 h-3.5" /> For Delivery Partners (7
                    Steps)
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="merchant-guide" className="p-5 space-y-4">
                {/* Progress bar */}
                <div className="bg-muted/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground">
                      Merchant Setup Progress
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {merchantCompleted.size}/{MERCHANT_STEPS.length} completed
                    </span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-smooth"
                      style={{
                        width: `${(merchantCompleted.size / MERCHANT_STEPS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <StepperGuide
                  steps={MERCHANT_STEPS}
                  completed={merchantCompleted}
                  onToggle={toggleMerchantStep}
                />
              </TabsContent>

              <TabsContent value="delivery-guide" className="p-5 space-y-4">
                {/* Progress bar */}
                <div className="bg-muted/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground">
                      Delivery Partner Setup Progress
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {deliveryCompleted.size}/{DELIVERY_STEPS.length} completed
                    </span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-smooth"
                      style={{
                        width: `${(deliveryCompleted.size / DELIVERY_STEPS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <StepperGuide
                  steps={DELIVERY_STEPS}
                  completed={deliveryCompleted}
                  onToggle={toggleDeliveryStep}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* FAQ Section */}
          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-display font-bold text-foreground">
                  ONDC Frequently Asked Questions
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  10 common questions from merchants and delivery partners
                </p>
              </div>
            </div>
            <div className="p-5">
              <FaqAccordion items={ONDC_FAQ} />
            </div>
          </div>

          {/* Benefits & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Benefits */}
            <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  Why Join ONDC?
                </h3>
              </div>
              <div className="p-5 grid grid-cols-1 gap-4">
                {[
                  {
                    emoji: "🌐",
                    title: "Wider Reach",
                    desc: "Millions of customers on Paytm, Meesho, Pincode.",
                  },
                  {
                    emoji: "💰",
                    title: "Lower Commissions",
                    desc: "1–2% vs 20–30% on traditional platforms.",
                  },
                  {
                    emoji: "🔄",
                    title: "Interoperability",
                    desc: "List once, discovered everywhere on ONDC.",
                  },
                  {
                    emoji: "📊",
                    title: "Transparent Analytics",
                    desc: "Standardized order and payment reporting.",
                  },
                  {
                    emoji: "🛡️",
                    title: "Regulatory Compliance",
                    desc: "KYC meets RBI and GST norms automatically.",
                  },
                  {
                    emoji: "🚀",
                    title: "ONDC Delivery",
                    desc: "Access ONDC-certified delivery partners.",
                  },
                ].map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <span className="text-xl mt-0.5">{b.emoji}</span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {b.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KYC Requirements */}
            <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  KYC Documents Required
                </h3>
              </div>
              <div className="p-5">
                <ul className="space-y-2.5">
                  {KYC_DOCS.map((doc) => (
                    <li
                      key={doc.label}
                      className="flex items-center gap-3 text-sm"
                    >
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 ${doc.required ? "text-primary" : "text-muted-foreground/50"}`}
                      />
                      <span
                        className={
                          doc.required
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {doc.label}
                        {doc.required && (
                          <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                            Required
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Enrollment Management Tab ───────────────────────────── */}
        <TabsContent value="enrollments" className="space-y-4">
          {/* Filter row */}
          <div
            className="flex gap-1.5 flex-wrap"
            data-ocid="ondc-status-filter"
          >
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors font-medium ${
                  statusFilter === f.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Merchant / Delivery Partner tables */}
          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <Tabs defaultValue="merchants">
              <div className="border-b border-border px-5 pt-4">
                <TabsList className="mb-0">
                  <TabsTrigger value="merchants" data-ocid="ondc-tab-merchants">
                    Merchants ({merchants.length})
                  </TabsTrigger>
                  <TabsTrigger value="partners" data-ocid="ondc-tab-partners">
                    Delivery Partners ({partners.length})
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="merchants" className="p-0 mt-0">
                <EnrollmentTable data={merchants} />
              </TabsContent>
              <TabsContent value="partners" className="p-0 mt-0">
                <EnrollmentTable data={partners} />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Enrollment Review Drawer ──────────────────────────────── */}
      <Sheet
        open={!!selectedEnrollment}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedEnrollment(null);
            setRejectionReason("");
          }
        }}
      >
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-display">Enrollment Review</SheetTitle>
          </SheetHeader>
          {selectedEnrollment && (
            <div className="space-y-5 mt-5">
              {/* Status timeline */}
              <div className="flex items-center gap-0">
                {TIMELINE_STEPS.map((step, i) => {
                  const activeStep = getTimelineStep(
                    selectedEnrollment.enrollmentStatus,
                  );
                  const isActive = i <= activeStep;
                  const isFinal =
                    selectedEnrollment.enrollmentStatus !==
                    VerificationStatus.pending;
                  const isFinalStep = i === 2;
                  return (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                            isActive
                              ? isFinalStep &&
                                isFinal &&
                                selectedEnrollment.enrollmentStatus ===
                                  VerificationStatus.rejected
                                ? "bg-destructive border-destructive text-destructive-foreground"
                                : "bg-primary border-primary text-primary-foreground"
                              : "bg-muted border-border text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 text-center leading-tight">
                          {step}
                        </span>
                      </div>
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 -mt-4 ${isActive && i < activeStep ? "bg-primary" : "bg-border"}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Business Details */}
              <div className="bg-muted/40 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-sm text-foreground">
                  Business Details
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Business Name</span>
                    <p className="font-medium text-foreground mt-0.5">
                      {selectedEnrollment.businessName}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Role</span>
                    <p className="font-medium text-foreground mt-0.5 capitalize">
                      {selectedEnrollment.role}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">GSTIN</span>
                    <p className="font-mono font-medium text-foreground mt-0.5">
                      {selectedEnrollment.gstin ?? "Not provided"}
                    </p>
                  </div>
                  {selectedEnrollment.fssaiLicense && (
                    <div>
                      <span className="text-muted-foreground">FSSAI</span>
                      <p className="font-mono font-medium text-foreground mt-0.5">
                        {selectedEnrollment.fssaiLicense}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Bank Account</span>
                    <p className="font-mono font-medium text-foreground mt-0.5">
                      {selectedEnrollment.bankAccount}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">IFSC</span>
                    <p className="font-mono font-medium text-foreground mt-0.5">
                      {selectedEnrollment.ifscCode}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Submitted</span>
                    <p className="font-medium text-foreground mt-0.5">
                      {new Date(
                        Number(selectedEnrollment.submittedAt),
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  {selectedEnrollment.reviewedAt && (
                    <div>
                      <span className="text-muted-foreground">Reviewed</span>
                      <p className="font-medium text-foreground mt-0.5">
                        {new Date(
                          Number(selectedEnrollment.reviewedAt),
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* KYC Document Checklist */}
              <div className="bg-muted/40 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-sm text-foreground">
                  KYC Document Checklist
                </h4>
                <ul className="space-y-2">
                  {[
                    { label: "PAN Card", done: true },
                    {
                      label: "GSTIN Certificate",
                      done: !!selectedEnrollment.gstin,
                    },
                    { label: "Aadhaar Card", done: true },
                    { label: "Bank Statement", done: true },
                    { label: "Cancelled Cheque", done: true },
                    {
                      label: "FSSAI License",
                      done: !!selectedEnrollment.fssaiLicense,
                    },
                  ].map((doc) => (
                    <li
                      key={doc.label}
                      className="flex items-center gap-2 text-sm"
                    >
                      {doc.done ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                      )}
                      <span
                        className={
                          doc.done
                            ? "text-foreground"
                            : "text-muted-foreground/60 line-through"
                        }
                      >
                        {doc.label}
                      </span>
                      {doc.done ? (
                        <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-full">
                          Submitted
                        </span>
                      ) : (
                        <span className="ml-auto text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded-full">
                          Missing
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Current status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current Status
                </span>
                <StatusBadge status={selectedEnrollment.enrollmentStatus} />
              </div>

              {/* Admin notes */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Admin Notes</Label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add review notes, observations..."
                  rows={2}
                  data-ocid="ondc-admin-notes"
                />
              </div>

              {/* Rejection reason (only when rejecting) */}
              {selectedEnrollment.enrollmentStatus ===
                VerificationStatus.pending && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-destructive">
                    Rejection Reason{" "}
                    <span className="text-muted-foreground font-normal">
                      (required to reject)
                    </span>
                  </Label>
                  <Textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Specify reason for rejection — e.g. 'GSTIN certificate missing', 'Bank details mismatch'..."
                    rows={2}
                    data-ocid="ondc-rejection-reason"
                  />
                </div>
              )}

              {/* Actions */}
              {selectedEnrollment.enrollmentStatus ===
                VerificationStatus.pending && (
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setSelectedEnrollment(null)}
                    data-ocid="ondc-drawer-approve"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    disabled={!rejectionReason.trim()}
                    onClick={() => setSelectedEnrollment(null)}
                    data-ocid="ondc-drawer-reject"
                  >
                    <XCircle className="w-4 h-4 mr-2" /> Reject
                  </Button>
                </div>
              )}
              {selectedEnrollment.enrollmentStatus !==
                VerificationStatus.pending && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedEnrollment(null)}
                >
                  Close
                </Button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Send ONDC Invitation Dialog ───────────────────────────── */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" /> Send ONDC Invitation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Search Merchant or Delivery Partner</Label>
              <Input
                value={inviteSearch}
                onChange={(e) => setInviteSearch(e.target.value)}
                placeholder="Type name, phone, or business name..."
                data-ocid="ondc-invite-search"
              />
              <p className="text-xs text-muted-foreground">
                The invitation will be sent via WhatsApp chatbot notification.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Invitation Message</Label>
              <Textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                rows={4}
                data-ocid="ondc-invite-message"
              />
            </div>

            <div className="bg-muted/40 rounded-lg p-3 space-y-1.5">
              <p className="text-xs font-semibold text-foreground">
                What the invitation includes:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✅ Step-by-step ONDC registration link</li>
                <li>✅ Your custom message above</li>
                <li>✅ WhatsCart support contact for assistance</li>
                <li>✅ Direct link to seller.ondc.org / logistics.ondc.org</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowInviteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 gap-2"
                disabled={!inviteSearch.trim()}
                onClick={() => setShowInviteDialog(false)}
                data-ocid="ondc-invite-send"
              >
                <Send className="w-4 h-4" /> Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
