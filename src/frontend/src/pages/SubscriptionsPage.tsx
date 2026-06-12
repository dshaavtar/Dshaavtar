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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Calendar,
  Calendar as CalendarIcon,
  CheckCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Home,
  IndianRupee,
  LayoutGrid,
  Megaphone,
  Pencil,
  Percent,
  Plus,
  QrCode,
  Save,
  Search,
  Settings,
  Smartphone,
  Sparkles,
  Tag,
  Trash2,
  TrendingUp,
  Truck,
  UserCheck,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useConfirmSubscriptionPayment,
  useConfirmSubscriptionQRPayment,
  useCreatePlan,
  useDeletePlan,
  useGenerateSubscriptionQR,
  useGetAdminUPIProfile,
  useGetSubscriptionDiscountForMerchant,
  usePlans,
  useSetAdminUPIProfile,
  useUpdatePlan,
} from "../hooks/useBackend";
import {
  generateSubscriptionOrderId,
  saveQRTimeoutMinutes,
  useQRTimeoutMinutes,
} from "../hooks/useBackend";
import type { SubscriptionPlan } from "../types";
import { SubscriptionPlanType, UserRole } from "../types";

// ─── QR Code generator (uses free API, no library needed) ────────────────────

function buildQrImageUrl(data: string, size = 200): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}

// ─── QR Timer Display (15-min countdown) ──────────────────────────────────────

function QRTimerDisplay({
  expiresAt,
  onExpire,
}: {
  expiresAt: number;
  onExpire?: () => void;
}) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, expiresAt - Date.now()),
  );

  useEffect(() => {
    const tick = setInterval(() => {
      const rem = Math.max(0, expiresAt - Date.now());
      setRemaining(rem);
      if (rem === 0) {
        clearInterval(tick);
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [expiresAt, onExpire]);

  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const isUrgent = remaining < 120000; // < 2 mins
  const expired = remaining === 0;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono ${
        expired
          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          : isUrgent
            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            : "bg-muted text-muted-foreground"
      }`}
    >
      <Clock className="w-3.5 h-3.5 shrink-0" />
      {expired ? (
        <span>QR Expired</span>
      ) : (
        <span>
          QR expires in{" "}
          <strong>
            {mins}:{secs.toString().padStart(2, "0")}
          </strong>
        </span>
      )}
    </div>
  );
}

// ─── Subscription Redirect Modal ──────────────────────────────────────────────

function SubscriptionRedirectModal({
  plans,
  userId,
  onSuccess,
}: {
  plans: SubscriptionPlan[];
  userId: string;
  onSuccess: () => void;
}) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null,
  );
  const [txRef, setTxRef] = useState("");
  const [step, setStep] = useState<"plans" | "qr" | "done">("plans");
  const [qrExpired, setQrExpired] = useState(false);
  const [orderId] = useState(() => generateSubscriptionOrderId());
  const confirmQR = useConfirmSubscriptionQRPayment();

  const { data: qrData } = useGenerateSubscriptionQR(
    selectedPlan?.id ?? "",
    userId,
  );

  const amount = selectedPlan
    ? Number(selectedPlan.flatFee ?? selectedPlan.priceFlat ?? 0)
    : 0;
  const isFree =
    selectedPlan?.planType === SubscriptionPlanType.free ||
    (selectedPlan &&
      amount === 0 &&
      Number(
        selectedPlan.percentageFee ?? selectedPlan.pricePercentage ?? 0,
      ) === 0);

  const qrUpiData = qrData
    ? qrData.qrData
    : selectedPlan && !isFree
      ? `upi://pay?pa=whatscart@upi&pn=WhatsCart&am=${amount}&cu=INR&tn=${encodeURIComponent(selectedPlan.name)}`
      : "";

  const qrExpiresAt = qrData
    ? Number(qrData.expiresAt)
    : Date.now() + 15 * 60 * 1000;

  async function handleConfirmPayment() {
    if (!selectedPlan) return;
    if (!isFree && !txRef.trim()) {
      toast.error("Please enter the transaction reference");
      return;
    }
    try {
      await confirmQR.mutateAsync({
        planId: selectedPlan.id,
        userId,
        transactionRef: isFree ? "FREE_PLAN" : txRef.trim(),
      });
      setStep("done");
    } catch {
      toast.error("Payment confirmation failed. Please try again.");
    }
  }

  if (step === "done") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-foreground">
            Subscription Active!
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your <strong>{selectedPlan?.name}</strong> plan is now active.
          </p>
        </div>
        <Button
          onClick={onSuccess}
          className="w-full max-w-xs"
          data-ocid="sub-redirect.done-button"
        >
          Continue to Dashboard
        </Button>
      </div>
    );
  }

  if (step === "qr" && selectedPlan) {
    return (
      <div className="space-y-5">
        <div className="bg-muted/40 rounded-xl p-4">
          <p className="font-semibold text-foreground">{selectedPlan.name}</p>
          <p className="text-2xl font-bold text-primary mt-1">
            {isFree ? "Free" : `₹${amount.toLocaleString("en-IN")}`}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              {selectedPlan.planType === SubscriptionPlanType.weekly
                ? "/week"
                : selectedPlan.planType === SubscriptionPlanType.monthly
                  ? "/month"
                  : ""}
            </span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-1 font-mono">
            Order ID:{" "}
            <span className="font-semibold text-foreground">{orderId}</span>
          </p>
        </div>

        {!isFree && (
          <>
            <div className="flex flex-col items-center gap-3">
              {qrExpired ? (
                <div className="w-48 h-48 rounded-xl border-2 border-dashed border-red-300 dark:border-red-700 flex flex-col items-center justify-center gap-2 bg-red-50 dark:bg-red-950/20">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    QR Expired
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQrExpired(false)}
                    className="text-xs"
                  >
                    Refresh QR
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
                  <img
                    src={buildQrImageUrl(qrUpiData, 180)}
                    alt="UPI Payment QR Code"
                    width={180}
                    height={180}
                    className="rounded-lg"
                    data-ocid="sub-redirect.qr-code"
                  />
                </div>
              )}
              <QRTimerDisplay
                expiresAt={qrExpiresAt}
                onExpire={() => setQrExpired(true)}
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span>Scan with PhonePe, GPay, Paytm</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Transaction Reference / UTR Number</Label>
              <Input
                value={txRef}
                onChange={(e) => setTxRef(e.target.value)}
                placeholder="e.g. 413456789012"
                data-ocid="sub-redirect.tx-ref-input"
              />
              <p className="text-xs text-muted-foreground">
                Enter the UTR or transaction reference from your UPI app after
                payment
              </p>
            </div>
          </>
        )}

        {isFree && (
          <p className="text-sm text-muted-foreground text-center">
            This is a free plan — click below to activate instantly.
          </p>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setStep("plans")}
            data-ocid="sub-redirect.back-button"
          >
            Back
          </Button>
          <Button
            className="flex-1"
            onClick={handleConfirmPayment}
            disabled={
              confirmQR.isPending || qrExpired || (!isFree && !txRef.trim())
            }
            data-ocid="sub-redirect.confirm-button"
          >
            {confirmQR.isPending
              ? "Activating…"
              : isFree
                ? "Activate Free Plan"
                : "Confirm Payment"}
          </Button>
        </div>
      </div>
    );
  }

  // Step: plans
  const visiblePlans = plans.filter((p) => p.isActive).slice(0, 6);
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose a plan to continue. Free plans include daily usage limits.
      </p>
      <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-1">
        {visiblePlans.map((plan) => {
          const planAmount = Number(plan.flatFee ?? plan.priceFlat ?? 0);
          const isFreeP =
            plan.planType === SubscriptionPlanType.free ||
            (planAmount === 0 &&
              Number(plan.percentageFee ?? plan.pricePercentage ?? 0) === 0);
          const isSelected = selectedPlan?.id === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlan(plan)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
              data-ocid={`sub-redirect.plan-${plan.id}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {plan.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {plan.features.slice(0, 2).join(" · ")}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-bold text-primary">
                    {isFreeP
                      ? "Free"
                      : `₹${planAmount.toLocaleString("en-IN")}`}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {plan.planType === SubscriptionPlanType.weekly
                      ? "/week"
                      : plan.planType === SubscriptionPlanType.monthly
                        ? "/month"
                        : ""}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <Button
        className="w-full"
        disabled={!selectedPlan}
        onClick={() => setStep("qr")}
        data-ocid="sub-redirect.next-button"
      >
        {selectedPlan
          ? `Continue with ${selectedPlan.name}`
          : "Select a plan to continue"}
      </Button>
    </div>
  );
}

// ─── Payment Modal ────────────────────────────────────────────────────────────

function PaymentModal({
  plan,
  onClose,
}: {
  plan: SubscriptionPlan;
  onClose: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [orderId] = useState(() => generateSubscriptionOrderId());
  const confirmPayment = useConfirmSubscriptionPayment();
  const isFree =
    plan.planType === SubscriptionPlanType.free ||
    (Number(plan.flatFee ?? plan.priceFlat ?? 0) === 0 &&
      Number(plan.percentageFee ?? plan.pricePercentage ?? 0) === 0);
  const amount = Number(plan.flatFee ?? plan.priceFlat ?? 0);
  const qrData =
    plan.qrCodeData ||
    `upi://pay?pa=whatscart@upi&pn=WhatsCart&am=${amount}&cu=INR&tn=${encodeURIComponent(plan.name)}`;

  async function handleConfirm() {
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    try {
      await confirmPayment.mutateAsync({
        planId: plan.id,
        phone: phone.trim(),
      });
      setConfirmed(true);
      toast.success("Subscription activated!");
    } catch {
      toast.error("Payment confirmation failed. Please try again.");
    }
  }

  if (confirmed) {
    return (
      <DialogContent className="sm:max-w-sm" data-ocid="payment.success_state">
        <DialogHeader>
          <DialogTitle className="font-display">Payment Confirmed!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{plan.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your subscription is now active
            </p>
          </div>
          <Button
            className="w-full"
            onClick={onClose}
            data-ocid="payment.close_button"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent
      className="sm:max-w-sm max-h-[92vh] overflow-y-auto"
      data-ocid="payment.dialog"
    >
      <DialogHeader>
        <DialogTitle className="font-display flex items-center gap-2">
          <QrCode className="w-4 h-4 text-primary" />
          {isFree ? "Activate Free Plan" : "Pay & Subscribe"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-5 pt-1">
        {/* Plan summary */}
        <div className="bg-muted/40 rounded-xl p-4 space-y-1">
          <p className="font-semibold text-foreground">{plan.name}</p>
          <p className="text-2xl font-bold text-primary">
            {isFree ? "Free" : `₹${amount.toLocaleString("en-IN")}`}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              {plan.planType === SubscriptionPlanType.weekly
                ? "/week"
                : plan.planType === SubscriptionPlanType.monthly
                  ? "/month"
                  : ""}
            </span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-1 font-mono">
            Order ID:{" "}
            <span className="font-semibold text-foreground">{orderId}</span>
          </p>
          <ul className="space-y-0.5 mt-2">
            {plan.features.slice(0, 3).map((f) => (
              <li
                key={f}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* QR Code — only for paid plans */}
        {!isFree && (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
              <img
                src={buildQrImageUrl(qrData, 200)}
                alt="UPI Payment QR Code"
                width={200}
                height={200}
                className="rounded-lg"
                data-ocid="payment.qr_code"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>Scan with any UPI app (PhonePe, GPay, Paytm)</span>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              UPI ID:{" "}
              <span className="font-mono text-foreground">whatscart@upi</span>
            </div>
          </div>
        )}

        {/* Phone number */}
        <div className="space-y-1.5">
          <Label className="text-sm">Your Phone Number</Label>
          <Input
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-ocid="payment.phone_input"
          />
          <p className="text-xs text-muted-foreground">
            Used to activate your subscription
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="payment.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleConfirm}
            disabled={confirmPayment.isPending || !phone.trim()}
            data-ocid="payment.confirm_button"
          >
            {confirmPayment.isPending
              ? "Activating…"
              : isFree
                ? "Activate Free Plan"
                : "I Have Paid"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

// ─── Mock active subscriptions ────────────────────────────────────────────────
const ACTIVE_SUBS = [
  {
    id: "sub1",
    userName: "Sharma Kirana Store",
    role: UserRole.merchant,
    planName: "Monthly Business",
    planType: SubscriptionPlanType.monthly,
    startDate: "2026-03-15",
    endDate: "2026-04-14",
    ordersUsed: 187,
    ordersLimit: 500,
    inquiriesUsed: 42,
    inquiriesLimit: 200,
    status: "active" as const,
  },
  {
    id: "sub2",
    userName: "Patel Fast Food",
    role: UserRole.merchant,
    planName: "Weekly Pro",
    planType: SubscriptionPlanType.weekly,
    startDate: "2026-04-10",
    endDate: "2026-04-17",
    ordersUsed: 61,
    ordersLimit: 100,
    inquiriesUsed: 28,
    inquiriesLimit: 50,
    status: "active" as const,
  },
  {
    id: "sub3",
    userName: "Ravi Thakur",
    role: UserRole.deliveryPartner,
    planName: "Delivery Monthly",
    planType: SubscriptionPlanType.monthly,
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    ordersUsed: 89,
    ordersLimit: 300,
    inquiriesUsed: 0,
    inquiriesLimit: 0,
    status: "expired" as const,
  },
  {
    id: "sub4",
    userName: "Rajesh Kumar",
    role: UserRole.customer,
    planName: "Category Food Deal",
    planType: SubscriptionPlanType.category,
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    ordersUsed: 8,
    ordersLimit: 20,
    inquiriesUsed: 3,
    inquiriesLimit: 5,
    status: "active" as const,
  },
  {
    id: "sub5",
    userName: "Meena Electronics",
    role: UserRole.merchant,
    planName: "90-Day Duration Plan",
    planType: SubscriptionPlanType.duration,
    startDate: "2026-02-01",
    endDate: "2026-05-01",
    ordersUsed: 230,
    ordersLimit: 1000,
    inquiriesUsed: 15,
    inquiriesLimit: 100,
    status: "active" as const,
  },
  {
    id: "sub6",
    userName: "Sunita Properties",
    role: UserRole.customer,
    planName: "Property Flat ₹199",
    planType: SubscriptionPlanType.flat,
    startDate: "2026-04-05",
    endDate: "2026-05-05",
    ordersUsed: 0,
    ordersLimit: 0,
    inquiriesUsed: 7,
    inquiriesLimit: 30,
    status: "active" as const,
  },
  {
    id: "sub7",
    userName: "Arjun Job Portal",
    role: UserRole.customer,
    planName: "5% Commission Plan",
    planType: SubscriptionPlanType.percentage,
    startDate: "2026-04-10",
    endDate: "2026-05-10",
    ordersUsed: 44,
    ordersLimit: 200,
    inquiriesUsed: 11,
    inquiriesLimit: 50,
    status: "expiring" as const,
  },
];

// ─── Color/style maps ────────────────────────────────────────────────────────

const PLAN_TYPE_CONFIG: Record<
  SubscriptionPlanType,
  { label: string; badgeCls: string; icon: React.ReactNode; tabCls: string }
> = {
  [SubscriptionPlanType.free]: {
    label: "Free",
    badgeCls: "bg-muted text-muted-foreground border-border",
    icon: <Users className="w-3.5 h-3.5" />,
    tabCls:
      "data-[active=true]:border-border data-[active=true]:text-foreground",
  },
  [SubscriptionPlanType.monthly]: {
    label: "Subscription",
    badgeCls:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700",
    icon: <CreditCard className="w-3.5 h-3.5" />,
    tabCls:
      "data-[active=true]:border-blue-500 data-[active=true]:text-blue-600",
  },
  [SubscriptionPlanType.weekly]: {
    label: "Subscription",
    badgeCls:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700",
    icon: <CreditCard className="w-3.5 h-3.5" />,
    tabCls:
      "data-[active=true]:border-blue-500 data-[active=true]:text-blue-600",
  },
  [SubscriptionPlanType.duration]: {
    label: "Duration",
    badgeCls:
      "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700",
    icon: <Clock className="w-3.5 h-3.5" />,
    tabCls:
      "data-[active=true]:border-purple-500 data-[active=true]:text-purple-600",
  },
  [SubscriptionPlanType.category]: {
    label: "Category",
    badgeCls:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700",
    icon: <Tag className="w-3.5 h-3.5" />,
    tabCls:
      "data-[active=true]:border-orange-500 data-[active=true]:text-orange-600",
  },
  [SubscriptionPlanType.flat]: {
    label: "Flat Rate",
    badgeCls:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700",
    icon: <IndianRupee className="w-3.5 h-3.5" />,
    tabCls:
      "data-[active=true]:border-emerald-500 data-[active=true]:text-emerald-600",
  },
  [SubscriptionPlanType.percentage]: {
    label: "Percentage",
    badgeCls:
      "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700",
    icon: <Percent className="w-3.5 h-3.5" />,
    tabCls:
      "data-[active=true]:border-yellow-500 data-[active=true]:text-yellow-600",
  },
};

const ROLE_COLORS: Record<string, string> = {
  merchant:
    "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-700",
  delivery:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700",
  customer:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700",
  jobPoster:
    "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-700",
  propertyPoster:
    "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-700",
};

const STATUS_MAP = {
  active:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
  expired: "bg-muted text-muted-foreground border-border",
  expiring:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function roleLabel(role: string) {
  if (role === UserRole.deliveryPartner) return "Delivery Partner";
  if (role === "jobPoster") return "Job Poster";
  if (role === "propertyPoster") return "Property";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function priceSummary(plan: SubscriptionPlan): string {
  const flat = Number(plan.flatFee ?? plan.priceFlat ?? 0);
  const pct = Number(plan.percentageFee ?? plan.pricePercentage ?? 0);
  if (flat > 0 && pct > 0) return `₹${flat.toLocaleString("en-IN")} + ${pct}%`;
  if (flat > 0) return `₹${flat.toLocaleString("en-IN")}`;
  if (pct > 0) return `${pct}% of txn`;
  return "Free";
}

function billingLabel(plan: SubscriptionPlan): string {
  if (plan.planType === SubscriptionPlanType.weekly) return "/week";
  if (plan.planType === SubscriptionPlanType.monthly) return "/month";
  if (plan.planType === SubscriptionPlanType.duration)
    return `/${Number(plan.durationDays)} days`;
  if (plan.planType === SubscriptionPlanType.category)
    return plan.categoryScope ? ` (${plan.categoryScope})` : "";
  return "";
}

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanTypeFilter = "all" | SubscriptionPlanType;

interface PlanFormState {
  name: string;
  planType: SubscriptionPlanType;
  targetRole: UserRole;
  applicableRoles: UserRole[];
  billingCycle: "weekly" | "monthly" | "yearly";
  priceFlat: string;
  pricePercentage: string;
  flatFee: string;
  percentageFee: string;
  minTransaction: string;
  maxTransaction: string;
  orderLimit: string;
  inquiryLimit: string;
  durationDays: string;
  categoryScope: string;
  features: string[];
  featureInput: string;
  isActive: boolean;
}

const DEFAULT_FORM: PlanFormState = {
  name: "",
  planType: SubscriptionPlanType.monthly,
  targetRole: UserRole.merchant,
  applicableRoles: [UserRole.merchant],
  billingCycle: "monthly",
  priceFlat: "0",
  pricePercentage: "0",
  flatFee: "0",
  percentageFee: "0",
  minTransaction: "0",
  maxTransaction: "0",
  orderLimit: "100",
  inquiryLimit: "50",
  durationDays: "30",
  categoryScope: "",
  features: [],
  featureInput: "",
  isActive: true,
};

const ALL_ROLES: { value: UserRole | string; label: string }[] = [
  { value: UserRole.customer, label: "Customer" },
  { value: UserRole.merchant, label: "Merchant" },
  { value: UserRole.deliveryPartner, label: "Delivery Partner" },
  { value: "sarthi", label: "Sarthi" },
  { value: "jobPoster", label: "Job Poster" },
  { value: "propertyPoster", label: "Property Poster" },
  { value: "eventOrganiser", label: "Event Organiser" },
  { value: "promoter", label: "Promoter" },
  { value: "business", label: "Business" },
];

// ─── Plan Templates ───────────────────────────────────────────────────────────

interface PlanTemplate {
  id: string;
  name: string;
  role: string;
  roleLabel: string;
  roleColor: string;
  planType: SubscriptionPlanType;
  price: number;
  billingCycle: "daily" | "weekly" | "monthly";
  orderLimit: number; // 0=unlimited
  inquiryLimit: number; // 0=unlimited
  assignedUsers?: number;
  features: string[];
  isFree: boolean;
  isPopular?: boolean;
  isEnterprise?: boolean;
}

const SUBSCRIPTION_PLAN_TEMPLATES: PlanTemplate[] = [
  // ── CUSTOMER ──────────────────────────────────────────────────────────────
  {
    id: "tpl_cust_free_auto",
    name: "Customer Free Auto",
    role: "customer",
    roleLabel: "Customer",
    roleColor:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "daily",
    orderLimit: 10,
    inquiryLimit: 5,
    features: [
      "10 orders/day",
      "5 inquiries/day",
      "Browse products",
      "Track orders",
    ],
    isFree: true,
  },
  {
    id: "tpl_cust_starter",
    name: "Customer Starter",
    role: "customer",
    roleLabel: "Customer",
    roleColor:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
    planType: SubscriptionPlanType.monthly,
    price: 49,
    billingCycle: "monthly",
    orderLimit: 45,
    inquiryLimit: 0,
    features: [
      "45 orders/month",
      "Unlimited inquiries",
      "Spend analysis",
      "Budget alerts",
    ],
    isFree: false,
  },
  {
    id: "tpl_cust_pro",
    name: "Customer Pro",
    role: "customer",
    roleLabel: "Customer",
    roleColor:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
    planType: SubscriptionPlanType.monthly,
    price: 149,
    billingCycle: "monthly",
    orderLimit: 200,
    inquiryLimit: 0,
    features: [
      "200 orders/month",
      "Priority support",
      "Advanced spend analytics",
      "Exclusive offers",
    ],
    isFree: false,
    isPopular: true,
  },
  // ── MERCHANT ──────────────────────────────────────────────────────────────
  {
    id: "tpl_merch_free",
    name: "Merchant Free",
    role: "merchant",
    roleLabel: "Merchant",
    roleColor:
      "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 30,
    inquiryLimit: 0,
    features: ["30 orders/month", "1 branch", "Basic analytics"],
    isFree: true,
  },
  {
    id: "tpl_merch_starter",
    name: "Merchant Starter",
    role: "merchant",
    roleLabel: "Merchant",
    roleColor:
      "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    planType: SubscriptionPlanType.monthly,
    price: 299,
    billingCycle: "monthly",
    orderLimit: 200,
    inquiryLimit: 0,
    features: [
      "200 orders/month",
      "Multi-branch",
      "Excel product upload",
      "Enhanced analytics",
    ],
    isFree: false,
  },
  {
    id: "tpl_merch_pro",
    name: "Merchant Pro",
    role: "merchant",
    roleLabel: "Merchant",
    roleColor:
      "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    planType: SubscriptionPlanType.monthly,
    price: 799,
    billingCycle: "monthly",
    orderLimit: 1000,
    inquiryLimit: 0,
    features: [
      "1000 orders/month",
      "Unlimited branches",
      "Bulk customer upload",
      "Promo broadcasts",
      "Priority listing",
    ],
    isFree: false,
    isPopular: true,
  },
  {
    id: "tpl_merch_enterprise",
    name: "Merchant Enterprise",
    role: "merchant",
    roleLabel: "Merchant",
    roleColor:
      "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    planType: SubscriptionPlanType.monthly,
    price: 1999,
    billingCycle: "monthly",
    orderLimit: 0,
    inquiryLimit: 0,
    features: [
      "Unlimited orders",
      "API access",
      "Dedicated support",
      "ONDC enrollment",
      "Fake order boost",
    ],
    isFree: false,
    isEnterprise: true,
  },
  // ── DELIVERY PARTNER ──────────────────────────────────────────────────────
  {
    id: "tpl_dp_free",
    name: "Delivery Free",
    role: "delivery_partner",
    roleLabel: "Delivery Partner",
    roleColor:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 20,
    inquiryLimit: 0,
    features: ["20 deliveries/month", "Basic earnings dashboard"],
    isFree: true,
  },
  {
    id: "tpl_dp_pro",
    name: "Delivery Pro",
    role: "delivery_partner",
    roleLabel: "Delivery Partner",
    roleColor:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
    planType: SubscriptionPlanType.monthly,
    price: 199,
    billingCycle: "monthly",
    orderLimit: 500,
    inquiryLimit: 0,
    features: [
      "500 deliveries/month",
      "Petrol expense tracking",
      "Earnings analytics",
      "Tips enabled",
    ],
    isFree: false,
    isPopular: true,
  },
  // ── SARTHI ────────────────────────────────────────────────────────────────
  {
    id: "tpl_sarthi_free",
    name: "Sarthi Free",
    role: "sarthi",
    roleLabel: "Sarthi",
    roleColor:
      "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 15,
    inquiryLimit: 0,
    features: ["15 rides/month", "Basic dashboard"],
    isFree: true,
  },
  {
    id: "tpl_sarthi_pro",
    name: "Sarthi Pro",
    role: "sarthi",
    roleLabel: "Sarthi",
    roleColor:
      "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400",
    planType: SubscriptionPlanType.monthly,
    price: 249,
    billingCycle: "monthly",
    orderLimit: 300,
    inquiryLimit: 0,
    features: [
      "300 rides/month",
      "Tips enabled",
      "Earnings analytics",
      "Ride history",
    ],
    isFree: false,
    isPopular: true,
  },
  // ── JOB POSTING ───────────────────────────────────────────────────────────
  {
    id: "tpl_job_basic",
    name: "Job Basic",
    role: "jobPoster",
    roleLabel: "Job Poster",
    roleColor:
      "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 3,
    inquiryLimit: 0,
    features: ["3 job postings/month", "Standard listing"],
    isFree: true,
  },
  {
    id: "tpl_job_starter",
    name: "Job Starter",
    role: "jobPoster",
    roleLabel: "Job Poster",
    roleColor:
      "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400",
    planType: SubscriptionPlanType.monthly,
    price: 199,
    billingCycle: "monthly",
    orderLimit: 10,
    inquiryLimit: 0,
    features: ["10 job postings/month", "Featured listing", "AI descriptions"],
    isFree: false,
  },
  {
    id: "tpl_job_pro",
    name: "Job Pro",
    role: "jobPoster",
    roleLabel: "Job Poster",
    roleColor:
      "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400",
    planType: SubscriptionPlanType.monthly,
    price: 499,
    billingCycle: "monthly",
    orderLimit: 50,
    inquiryLimit: 0,
    features: ["50 job postings/month", "Top placement", "Applicant analytics"],
    isFree: false,
    isPopular: true,
  },
  // ── PROPERTY POSTING ──────────────────────────────────────────────────────
  {
    id: "tpl_prop_basic",
    name: "Property Basic",
    role: "propertyPoster",
    roleLabel: "Property",
    roleColor:
      "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 2,
    inquiryLimit: 0,
    features: ["2 property listings/month", "Standard listing"],
    isFree: true,
  },
  {
    id: "tpl_prop_starter",
    name: "Property Starter",
    role: "propertyPoster",
    roleLabel: "Property",
    roleColor:
      "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
    planType: SubscriptionPlanType.monthly,
    price: 299,
    billingCycle: "monthly",
    orderLimit: 5,
    inquiryLimit: 0,
    features: [
      "5 listings/month",
      "Featured placement",
      "AI descriptions",
      "Inquiry analytics",
    ],
    isFree: false,
  },
  {
    id: "tpl_prop_pro",
    name: "Property Pro",
    role: "propertyPoster",
    roleLabel: "Property",
    roleColor:
      "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
    planType: SubscriptionPlanType.monthly,
    price: 799,
    billingCycle: "monthly",
    orderLimit: 20,
    inquiryLimit: 0,
    features: [
      "20 listings/month",
      "Priority listing",
      "Video tours",
      "Advanced analytics",
    ],
    isFree: false,
    isPopular: true,
  },
  // ── EVENT ORGANISER ───────────────────────────────────────────────────────
  {
    id: "tpl_event_basic",
    name: "Event Basic",
    role: "eventOrganiser",
    roleLabel: "Event Organiser",
    roleColor:
      "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 1,
    inquiryLimit: 0,
    features: ["1 event/month", "Standard listing", "Basic reach"],
    isFree: true,
  },
  {
    id: "tpl_event_starter",
    name: "Event Starter",
    role: "eventOrganiser",
    roleLabel: "Event Organiser",
    roleColor:
      "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400",
    planType: SubscriptionPlanType.monthly,
    price: 399,
    billingCycle: "monthly",
    orderLimit: 5,
    inquiryLimit: 0,
    features: [
      "5 events/month",
      "Featured listing",
      "Promotion reach",
      "Ticket management",
    ],
    isFree: false,
  },
  {
    id: "tpl_event_pro",
    name: "Event Pro",
    role: "eventOrganiser",
    roleLabel: "Event Organiser",
    roleColor:
      "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400",
    planType: SubscriptionPlanType.monthly,
    price: 999,
    billingCycle: "monthly",
    orderLimit: 20,
    inquiryLimit: 0,
    features: [
      "20 events/month",
      "Priority listing",
      "Multi-city reach",
      "Analytics dashboard",
    ],
    isFree: false,
    isPopular: true,
  },
  // ── PROMOTION / ADVERTISING ───────────────────────────────────────────────
  {
    id: "tpl_promo_basic",
    name: "Promo Basic",
    role: "promoter",
    roleLabel: "Promoter",
    roleColor:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
    planType: SubscriptionPlanType.free,
    price: 0,
    billingCycle: "monthly",
    orderLimit: 2,
    inquiryLimit: 0,
    features: ["2 promotions/month", "Standard reach", "Basic analytics"],
    isFree: true,
  },
  {
    id: "tpl_promo_starter",
    name: "Promo Starter",
    role: "promoter",
    roleLabel: "Promoter",
    roleColor:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
    planType: SubscriptionPlanType.monthly,
    price: 299,
    billingCycle: "monthly",
    orderLimit: 10,
    inquiryLimit: 0,
    features: ["10 promotions/month", "Enhanced reach", "Click analytics"],
    isFree: false,
  },
  {
    id: "tpl_promo_pro",
    name: "Promo Pro",
    role: "promoter",
    roleLabel: "Promoter",
    roleColor:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
    planType: SubscriptionPlanType.monthly,
    price: 799,
    billingCycle: "monthly",
    orderLimit: 50,
    inquiryLimit: 0,
    features: [
      "50 promotions/month",
      "Influencer network",
      "Advanced targeting",
      "ROI analytics",
    ],
    isFree: false,
    isPopular: true,
  },
  // ── BUSINESS DELIVERY ASSIGNMENT ──────────────────────────────────────────
  {
    id: "tpl_biz_25",
    name: "Business 25 Users",
    role: "business",
    roleLabel: "Business",
    roleColor:
      "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400",
    planType: SubscriptionPlanType.monthly,
    price: 2499,
    billingCycle: "monthly",
    orderLimit: 0,
    inquiryLimit: 0,
    assignedUsers: 25,
    features: [
      "25 dedicated delivery users",
      "Real-time tracking",
      "Utilization dashboard",
      "Priority assignment",
      "Prepaid monthly",
      "Custom SLA",
    ],
    isFree: false,
  },
  {
    id: "tpl_biz_50",
    name: "Business 50 Users",
    role: "business",
    roleLabel: "Business",
    roleColor:
      "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400",
    planType: SubscriptionPlanType.monthly,
    price: 4499,
    billingCycle: "monthly",
    orderLimit: 0,
    inquiryLimit: 0,
    assignedUsers: 50,
    features: [
      "50 dedicated delivery users",
      "Real-time tracking",
      "Advanced analytics",
      "Priority assignment",
      "Prepaid monthly",
      "Dedicated support",
      "Custom SLA",
    ],
    isFree: false,
    isPopular: true,
  },
  {
    id: "tpl_biz_75",
    name: "Business 75 Users",
    role: "business",
    roleLabel: "Business",
    roleColor:
      "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400",
    planType: SubscriptionPlanType.monthly,
    price: 6499,
    billingCycle: "monthly",
    orderLimit: 0,
    inquiryLimit: 0,
    assignedUsers: 75,
    features: [
      "75 dedicated delivery users",
      "Real-time tracking",
      "Enterprise analytics",
      "Priority assignment",
      "Prepaid monthly",
      "24/7 dedicated support",
      "Custom SLA",
      "API integration",
    ],
    isFree: false,
    isEnterprise: true,
  },
];

// Group templates by role for the tab display
const TEMPLATE_GROUPS = [
  {
    role: "customer",
    label: "Customer",
    icon: Users,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    role: "merchant",
    label: "Merchant",
    icon: Tag,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    role: "delivery_partner",
    label: "Delivery Partner",
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    role: "sarthi",
    label: "Sarthi",
    icon: Zap,
    color: "text-teal-600",
    bg: "bg-teal-50 dark:bg-teal-950/30",
  },
  {
    role: "jobPoster",
    label: "Job Posting",
    icon: Briefcase,
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    role: "propertyPoster",
    label: "Property",
    icon: Home,
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
  {
    role: "eventOrganiser",
    label: "Event Organiser",
    icon: CalendarIcon,
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    role: "promoter",
    label: "Promotion / Ads",
    icon: Megaphone,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    role: "business",
    label: "Business Delivery",
    icon: Truck,
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
];

// ─── Metric Card ─────────────────────────────────────────────────────────────

function MetricCard({
  icon,
  label,
  value,
  sub,
  colorCls,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  colorCls: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-4 shadow-sm">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorCls}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-xl font-bold text-foreground tabular-nums">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  onEdit,
  onAssign,
  onDelete,
  onPay,
}: {
  plan: SubscriptionPlan;
  onEdit: (p: SubscriptionPlan) => void;
  onAssign: (p: SubscriptionPlan) => void;
  onDelete: (id: string) => void;
  onPay: (p: SubscriptionPlan) => void;
}) {
  const cfg = PLAN_TYPE_CONFIG[plan.planType];
  const isPopular = plan.planType === SubscriptionPlanType.monthly;

  return (
    <div
      className={`bg-card border rounded-xl p-5 shadow-sm flex flex-col gap-3 transition-shadow hover:shadow-md ${
        isPopular ? "border-primary/40 ring-1 ring-primary/10" : "border-border"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {isPopular && (
            <div className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2">
              ⭐ Popular
            </div>
          )}
          <h3 className="font-display font-bold text-foreground text-sm leading-tight truncate">
            {plan.name}
          </h3>
          <p className="text-2xl font-bold text-primary mt-1">
            {priceSummary(plan)}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              {billingLabel(plan)}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.badgeCls}`}
          >
            {cfg.icon}
            {cfg.label}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
              plan.isActive
                ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {plan.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Roles */}
      <div className="flex flex-wrap gap-1">
        {(plan.applicableRoles.length > 0
          ? plan.applicableRoles
          : [plan.targetRole]
        ).map((r) => (
          <span
            key={r}
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${ROLE_COLORS[r] ?? ""}`}
          >
            {roleLabel(r)}
          </span>
        ))}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 text-xs bg-muted/40 rounded-lg p-3">
        <div>
          <span className="text-muted-foreground">Orders/period</span>
          <p className="font-semibold text-foreground">
            {Number(plan.orderLimit) === 0
              ? "Unlimited"
              : Number(plan.orderLimit)}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Inquiries/day</span>
          <p className="font-semibold text-foreground">
            {Number(plan.inquiryLimit) === 0
              ? "Unlimited"
              : Number(plan.inquiryLimit)}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Duration</span>
          <p className="font-semibold text-foreground">
            {Number(plan.durationDays)} days
          </p>
        </div>
        {plan.categoryScope && (
          <div>
            <span className="text-muted-foreground">Category</span>
            <p className="font-semibold text-foreground capitalize truncate">
              {plan.categoryScope}
            </p>
          </div>
        )}
        {(Number(plan.minTransactionAmount ?? 0) > 0 ||
          Number(plan.maxTransactionAmount ?? 0) > 0) && (
          <div className="col-span-2">
            <span className="text-muted-foreground">Transaction range</span>
            <p className="font-semibold text-foreground">
              ₹{Number(plan.minTransactionAmount ?? 0).toLocaleString("en-IN")}{" "}
              – ₹
              {Number(plan.maxTransactionAmount ?? 0).toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>

      {/* Features */}
      {plan.features.length > 0 && (
        <ul className="space-y-1 flex-1">
          {plan.features.slice(0, 4).map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
          {plan.features.length > 4 && (
            <li className="text-xs text-muted-foreground pl-5">
              +{plan.features.length - 4} more
            </li>
          )}
        </ul>
      )}

      {/* Actions */}
      <div className="space-y-1.5 pt-2 border-t border-border">
        <Button
          className="w-full text-xs gap-1.5"
          size="sm"
          onClick={() => onPay(plan)}
          data-ocid={`plan-pay-${plan.id}`}
        >
          <QrCode className="w-3.5 h-3.5" />
          {plan.planType === SubscriptionPlanType.free
            ? "Activate Free Plan"
            : "Pay & Subscribe"}
        </Button>
        <div className="grid grid-cols-3 gap-1.5">
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => onEdit(plan)}
            data-ocid={`plan-edit-${plan.id}`}
          >
            <Pencil className="w-3 h-3 mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => onAssign(plan)}
            data-ocid={`plan-assign-${plan.id}`}
          >
            <UserCheck className="w-3 h-3 mr-1" /> Assign
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs text-destructive hover:text-destructive"
            onClick={() => onDelete(plan.id)}
            data-ocid={`plan-delete-${plan.id}`}
          >
            <Trash2 className="w-3 h-3 mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const PLAN_TYPE_TABS: {
  key: PlanTypeFilter;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "all",
    label: "All Plans",
    icon: <LayoutGrid className="w-3.5 h-3.5" />,
  },
  {
    key: SubscriptionPlanType.monthly,
    label: "Subscription",
    icon: <CreditCard className="w-3.5 h-3.5" />,
  },
  {
    key: SubscriptionPlanType.duration,
    label: "Duration",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  {
    key: SubscriptionPlanType.category,
    label: "Category",
    icon: <Tag className="w-3.5 h-3.5" />,
  },
  {
    key: SubscriptionPlanType.flat,
    label: "Flat Rate",
    icon: <IndianRupee className="w-3.5 h-3.5" />,
  },
  {
    key: SubscriptionPlanType.percentage,
    label: "Percentage",
    icon: <Percent className="w-3.5 h-3.5" />,
  },
  {
    key: SubscriptionPlanType.free,
    label: "Free",
    icon: <Users className="w-3.5 h-3.5" />,
  },
];

export default function SubscriptionsPage() {
  const { data: plans = [], isLoading } = usePlans();
  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();
  const deletePlan = useDeletePlan();
  const { data: upiProfile, isLoading: upiLoading } = useGetAdminUPIProfile();
  const setUPIProfile = useSetAdminUPIProfile();

  const [activeTab, setActiveTab] = useState<
    "plans" | "subscriptions" | "payment-settings" | "templates"
  >("plans");
  const [showSubscriptionRedirect, setShowSubscriptionRedirect] =
    useState(false);

  // UPI profile state
  const [upiId, setUpiId] = useState("");
  const [upiName, setUpiName] = useState("");
  const [upiSaved, setUpiSaved] = useState(false);

  // QR Timeout config state
  const currentQRMinutes = useQRTimeoutMinutes();
  const [qrTimeoutInput, setQrTimeoutInput] = useState(
    String(currentQRMinutes),
  );
  const [qrTimeoutSaved, setQrTimeoutSaved] = useState(false);

  function handleSaveQRTimeout() {
    const mins = Number.parseInt(qrTimeoutInput);
    if (!Number.isFinite(mins) || mins < 1 || mins > 60) {
      toast.error("QR timeout must be between 1 and 60 minutes");
      return;
    }
    saveQRTimeoutMinutes(mins);
    setQrTimeoutSaved(true);
    toast.success(
      `QR payment timeout set to ${mins} minute${mins !== 1 ? "s" : ""}`,
    );
    setTimeout(() => setQrTimeoutSaved(false), 3000);
  }

  useEffect(() => {
    if (upiProfile) {
      setUpiId(upiProfile.upiId ?? "");
      setUpiName(upiProfile.name ?? "");
    }
  }, [upiProfile]);

  const previewQrData = upiId.trim()
    ? `upi://pay?pa=${encodeURIComponent(upiId.trim())}&pn=${encodeURIComponent(upiName.trim() || "WhatsCart Admin")}&cu=INR`
    : "";

  async function handleSaveUPI() {
    if (!upiId.trim()) {
      toast.error("UPI ID is required");
      return;
    }
    try {
      await setUPIProfile.mutateAsync({
        upiId: upiId.trim(),
        name: upiName.trim(),
      });
      setUpiSaved(true);
      toast.success("UPI settings saved");
      setTimeout(() => setUpiSaved(false), 3000);
    } catch {
      toast.error("Failed to save UPI settings");
    }
  }

  const [planTypeFilter, setPlanTypeFilter] = useState<PlanTypeFilter>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [editPlan, setEditPlan] = useState<SubscriptionPlan | null>(null);
  const [assignPlan, setAssignPlan] = useState<SubscriptionPlan | null>(null);
  const [payPlan, setPayPlan] = useState<SubscriptionPlan | null>(null);
  const [assignSearch, setAssignSearch] = useState("");
  const [assignedMerchantPhone, setAssignedMerchantPhone] = useState("");
  const { data: merchantDiscount = 0 } = useGetSubscriptionDiscountForMerchant(
    assignedMerchantPhone,
  );

  const [form, setForm] = useState<PlanFormState>(DEFAULT_FORM);

  // ── Filter plans
  const filteredPlans = plans.filter((p) => {
    if (planTypeFilter === "all") return true;
    if (
      planTypeFilter === SubscriptionPlanType.monthly &&
      (p.planType === SubscriptionPlanType.monthly ||
        p.planType === SubscriptionPlanType.weekly)
    )
      return true;
    return p.planType === planTypeFilter;
  });

  // ── Metrics
  const activePlans = plans.filter((p) => p.isActive).length;
  const activeSubCount = ACTIVE_SUBS.filter(
    (s) => s.status === "active",
  ).length;
  const revenueMonth = plans
    .filter((p) => p.isActive && Number(p.flatFee ?? p.priceFlat ?? 0) > 0)
    .reduce((acc, p) => acc + Number(p.flatFee ?? p.priceFlat ?? 0), 0);
  const avgPlanValue =
    plans.length > 0
      ? Math.round(
          plans.reduce(
            (acc, p) => acc + Number(p.flatFee ?? p.priceFlat ?? 0),
            0,
          ) / plans.length,
        )
      : 0;

  // ── Filtered subscriptions
  const filteredSubs = ACTIVE_SUBS.filter((s) => {
    if (roleFilter !== "all" && s.role !== roleFilter) return false;
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    return true;
  });

  // ── Handlers
  function openCreate() {
    setEditPlan(null);
    setForm(DEFAULT_FORM);
    setShowPlanModal(true);
  }

  function openEdit(plan: SubscriptionPlan) {
    setEditPlan(plan);
    setForm({
      name: plan.name,
      planType: plan.planType,
      targetRole: plan.targetRole,
      applicableRoles:
        plan.applicableRoles.length > 0
          ? [...plan.applicableRoles]
          : [plan.targetRole],
      billingCycle:
        plan.planType === SubscriptionPlanType.weekly ? "weekly" : "monthly",
      priceFlat: String(plan.priceFlat),
      pricePercentage: String(plan.pricePercentage),
      flatFee: String(Number(plan.flatFee ?? plan.priceFlat ?? 0)),
      percentageFee: String(
        Number(plan.percentageFee ?? plan.pricePercentage ?? 0),
      ),
      minTransaction: String(Number(plan.minTransactionAmount ?? 0)),
      maxTransaction: String(Number(plan.maxTransactionAmount ?? 0)),
      orderLimit: String(Number(plan.orderLimit)),
      inquiryLimit: String(Number(plan.inquiryLimit)),
      durationDays: String(Number(plan.durationDays)),
      categoryScope: plan.categoryScope ?? "",
      features: [...plan.features],
      featureInput: "",
      isActive: plan.isActive,
    });
    setShowPlanModal(true);
  }

  function openAssign(plan: SubscriptionPlan) {
    setAssignPlan(plan);
    setAssignSearch("");
    setShowAssignModal(true);
  }

  function openPay(plan: SubscriptionPlan) {
    setPayPlan(plan);
    setShowPayModal(true);
  }

  function handleDelete(id: string) {
    deletePlan.mutate(id, {
      onSuccess: () => toast.success("Plan deleted"),
      onError: () => toast.error("Failed to delete plan"),
    });
  }

  async function handleSavePlan() {
    const planData = {
      name: form.name,
      planType: form.planType,
      targetRole: form.targetRole,
      priceFlat: Number.parseFloat(form.priceFlat) || 0,
      pricePercentage: Number.parseFloat(form.pricePercentage) || 0,
      orderLimit: BigInt(Number.parseInt(form.orderLimit) || 100),
      inquiryLimit: BigInt(Number.parseInt(form.inquiryLimit) || 50),
      durationDays: BigInt(Number.parseInt(form.durationDays) || 30),
      features: form.features,
      categoryScope: form.categoryScope || undefined,
      flatFee: Number.parseFloat(form.flatFee) || undefined,
      percentageFee: Number.parseFloat(form.percentageFee) || undefined,
      minTransactionAmount: Number.parseFloat(form.minTransaction) || undefined,
      maxTransactionAmount: Number.parseFloat(form.maxTransaction) || undefined,
      applicableRoles: form.applicableRoles,
    };
    try {
      if (editPlan) {
        await updatePlan.mutateAsync({
          ...planData,
          id: editPlan.id,
          isActive: form.isActive,
        });
        toast.success("Plan updated");
      } else {
        await createPlan.mutateAsync(planData);
        toast.success("Plan created");
      }
      setShowPlanModal(false);
      setForm(DEFAULT_FORM);
      setEditPlan(null);
    } catch {
      toast.error("Failed to save plan");
    }
  }

  function addFeature() {
    const tag = form.featureInput.trim();
    if (tag && !form.features.includes(tag)) {
      setForm((f) => ({
        ...f,
        features: [...f.features, tag],
        featureInput: "",
      }));
    }
  }

  function toggleApplicableRole(role: UserRole) {
    setForm((f) => ({
      ...f,
      applicableRoles: f.applicableRoles.includes(role)
        ? f.applicableRoles.filter((r) => r !== role)
        : [...f.applicableRoles, role],
    }));
  }

  // Determine which extra fields to show
  const isSubscriptionType =
    form.planType === SubscriptionPlanType.monthly ||
    form.planType === SubscriptionPlanType.weekly;
  const isDurationBased = form.planType === SubscriptionPlanType.duration;
  const isCategoryBased = form.planType === SubscriptionPlanType.category;
  const isPercentage = form.planType === SubscriptionPlanType.percentage;
  const isFlatRate = form.planType === SubscriptionPlanType.flat;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Subscription Plans
          </h2>
          <p className="text-sm text-muted-foreground">
            {plans.length} plans · {activePlans} active · subscription
            enforcement enabled
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/subscription-dashboard">
            <Button
              variant="outline"
              data-ocid="subscription-manage-assignments"
            >
              <UserCheck className="w-4 h-4 mr-2" /> Manage Assignments
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => setShowSubscriptionRedirect(true)}
            data-ocid="subscription-test-redirect"
          >
            <QrCode className="w-4 h-4 mr-2" /> Test Subscription Flow
          </Button>
          {activeTab === "plans" && (
            <Button onClick={openCreate} data-ocid="subscription-create-plan">
              <Plus className="w-4 h-4 mr-2" /> Create Plan
            </Button>
          )}
        </div>
      </div>

      {/* Main tabs */}
      <div className="flex gap-1.5 bg-muted/40 p-1 rounded-xl border border-border">
        {[
          { key: "plans" as const, label: "Plans" },
          { key: "templates" as const, label: "Plan Templates" },
          { key: "subscriptions" as const, label: "User Subscriptions" },
          { key: "payment-settings" as const, label: "Payment Settings" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            data-ocid={`sub-tab-${tab.key}`}
            className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-medium transition-all border ${activeTab === tab.key ? "bg-card text-foreground border-border shadow-sm" : "text-muted-foreground border-transparent hover:text-foreground hover:bg-card/60"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "templates" && (
        <div className="space-y-8" data-ocid="sub.templates-tab">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">
                  Quick-Start Plan Templates
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {SUBSCRIPTION_PLAN_TEMPLATES.length} pre-built templates across{" "}
                {TEMPLATE_GROUPS.length} roles. Click Activate to make a plan
                live or Customize to prefill the create form.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"
              >
                {SUBSCRIPTION_PLAN_TEMPLATES.filter((t) => t.isFree).length}{" "}
                free tiers
              </Badge>
              <Badge
                variant="outline"
                className="text-blue-700 border-blue-300 bg-blue-50 dark:bg-blue-950/30"
              >
                ₹
                {Math.max(
                  ...SUBSCRIPTION_PLAN_TEMPLATES.map((t) => t.price),
                ).toLocaleString("en-IN")}{" "}
                max plan
              </Badge>
            </div>
          </div>

          {/* Summary stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground font-medium">
                Total Templates
              </p>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {SUBSCRIPTION_PLAN_TEMPLATES.length}
              </p>
              <p className="text-xs text-muted-foreground">
                {TEMPLATE_GROUPS.length} roles covered
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground font-medium">
                Revenue Potential
              </p>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                ₹
                {SUBSCRIPTION_PLAN_TEMPLATES.filter((t) => !t.isFree)
                  .reduce((s, t) => s + t.price, 0)
                  .toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted-foreground">
                if all paid plans activate
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground font-medium">
                Enterprise Plans
              </p>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {
                  SUBSCRIPTION_PLAN_TEMPLATES.filter((t) => t.isEnterprise)
                    .length
                }
              </p>
              <p className="text-xs text-muted-foreground">
                business-grade tiers
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground font-medium">
                Business Plans
              </p>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {
                  SUBSCRIPTION_PLAN_TEMPLATES.filter(
                    (t) => t.role === "business",
                  ).length
                }
              </p>
              <p className="text-xs text-muted-foreground">
                delivery assignment tiers
              </p>
            </div>
          </div>

          {/* Groups */}
          {TEMPLATE_GROUPS.map((group) => {
            const groupTemplates = SUBSCRIPTION_PLAN_TEMPLATES.filter(
              (t) => t.role === group.role,
            );
            if (groupTemplates.length === 0) return null;
            const GroupIcon = group.icon;
            return (
              <div
                key={group.role}
                className="space-y-3"
                data-ocid={`templates.group.${group.role}`}
              >
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 ${group.bg} border border-border rounded-xl`}
                >
                  <GroupIcon className={`w-4 h-4 ${group.color} shrink-0`} />
                  <h4 className="font-display font-semibold text-sm text-foreground">
                    {group.label}
                  </h4>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {groupTemplates.length} plans
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-1">
                    ₹
                    {groupTemplates
                      .filter((t) => !t.isFree)
                      .map((t) => t.price)
                      .join(" / ₹")}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupTemplates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className={`bg-card border rounded-xl p-4 flex flex-col gap-3 shadow-sm transition-shadow hover:shadow-md relative overflow-hidden ${
                        tpl.isEnterprise
                          ? "border-primary/50 ring-1 ring-primary/10"
                          : tpl.isPopular
                            ? "border-primary/30"
                            : "border-border"
                      }`}
                      data-ocid={`templates.card.${tpl.id}`}
                    >
                      {/* Badges */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          {tpl.isEnterprise && (
                            <div className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5">
                              <Sparkles className="w-2.5 h-2.5" /> Enterprise
                            </div>
                          )}
                          {tpl.isPopular && !tpl.isEnterprise && (
                            <div className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5">
                              ⭐ Popular
                            </div>
                          )}
                          <h5 className="font-display font-bold text-sm text-foreground truncate">
                            {tpl.name}
                          </h5>
                          <p className="text-xl font-bold text-primary mt-0.5">
                            {tpl.isFree
                              ? "Free"
                              : `₹${tpl.price.toLocaleString("en-IN")}`}
                            <span className="text-xs font-normal text-muted-foreground ml-1">
                              /{tpl.billingCycle}
                            </span>
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border shrink-0 ${tpl.roleColor}`}
                        >
                          {tpl.roleLabel}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 text-xs bg-muted/40 rounded-lg p-2.5">
                        <div>
                          <span className="text-muted-foreground">Orders</span>
                          <p className="font-semibold text-foreground">
                            {tpl.orderLimit === 0
                              ? "Unlimited"
                              : tpl.orderLimit}
                            /{tpl.billingCycle === "daily" ? "day" : "month"}
                          </p>
                        </div>
                        {tpl.inquiryLimit !== undefined && (
                          <div>
                            <span className="text-muted-foreground">
                              Inquiries
                            </span>
                            <p className="font-semibold text-foreground">
                              {tpl.inquiryLimit === 0
                                ? "Unlimited"
                                : tpl.inquiryLimit}
                            </p>
                          </div>
                        )}
                        {tpl.assignedUsers !== undefined && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground">
                              Assigned Users
                            </span>
                            <p className="font-semibold text-foreground">
                              {tpl.assignedUsers} dedicated delivery users
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-1 flex-1">
                        {tpl.features.slice(0, 4).map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-1.5 text-xs text-muted-foreground"
                          >
                            <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                        {tpl.features.length > 4 && (
                          <li className="text-xs text-muted-foreground pl-4.5">
                            +{tpl.features.length - 4} more
                          </li>
                        )}
                      </ul>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-border">
                        <Button
                          size="sm"
                          className="text-xs gap-1"
                          onClick={() => {
                            const formValues: Partial<PlanFormState> = {
                              name: tpl.name,
                              planType: tpl.planType,
                              targetRole: tpl.role as UserRole,
                              applicableRoles: [tpl.role as UserRole],
                              billingCycle:
                                tpl.billingCycle === "daily"
                                  ? "monthly"
                                  : tpl.billingCycle,
                              priceFlat: String(tpl.price),
                              flatFee: String(tpl.price),
                              orderLimit: String(tpl.orderLimit),
                              inquiryLimit: String(tpl.inquiryLimit),
                              durationDays: "30",
                              features: [...tpl.features],
                              isActive: true,
                            };
                            setForm({ ...DEFAULT_FORM, ...formValues });
                            setEditPlan(null);
                            setShowPlanModal(true);
                            setActiveTab("plans");
                          }}
                          data-ocid={`templates.${tpl.id}.customize_button`}
                        >
                          <Pencil className="w-3 h-3" />
                          Customize
                        </Button>
                        <Button
                          size="sm"
                          variant={tpl.isFree ? "outline" : "default"}
                          className="text-xs gap-1"
                          onClick={async () => {
                            try {
                              await createPlan.mutateAsync({
                                name: tpl.name,
                                planType: tpl.planType,
                                targetRole: tpl.role as UserRole,
                                priceFlat: tpl.price,
                                pricePercentage: 0,
                                orderLimit: BigInt(tpl.orderLimit),
                                inquiryLimit: BigInt(tpl.inquiryLimit),
                                durationDays: BigInt(30),
                                features: tpl.features,
                                flatFee: tpl.price,
                                applicableRoles: [tpl.role as UserRole],
                              });
                              toast.success(`"${tpl.name}" activated!`);
                              setActiveTab("plans");
                            } catch {
                              toast.error("Failed to activate plan");
                            }
                          }}
                          disabled={createPlan.isPending}
                          data-ocid={`templates.${tpl.id}.activate_button`}
                        >
                          <Zap className="w-3 h-3" />
                          Activate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "payment-settings" && (
        <div
          className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-5"
          data-ocid="sub.payment-settings"
        >
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-foreground">
              Admin UPI Settings
            </h3>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <IndianRupee className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <strong>
                These UPI details are used for all subscription payment QR
                codes.
              </strong>{" "}
              The QR code generated during subscription payment will use this
              UPI ID.
            </span>
          </div>
          <Separator />
          {upiLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="sub-upi-id">UPI ID</Label>
                  <Input
                    id="sub-upi-id"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    data-ocid="sub.upi-id-input"
                  />
                  <p className="text-xs text-muted-foreground">
                    e.g. whatscart@okicici
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sub-upi-name">Display Name</Label>
                  <Input
                    id="sub-upi-name"
                    value={upiName}
                    onChange={(e) => setUpiName(e.target.value)}
                    placeholder="WhatsCart Admin"
                    data-ocid="sub.upi-name-input"
                  />
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={handleSaveUPI}
                  disabled={setUPIProfile.isPending || !upiId.trim()}
                  data-ocid="sub.save-upi-button"
                >
                  {upiSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Saved!
                    </>
                  ) : setUPIProfile.isPending ? (
                    "Saving…"
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save UPI Settings
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Preview QR Code
                </p>
                {previewQrData ? (
                  <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
                    <img
                      src={buildQrImageUrl(previewQrData, 160)}
                      alt="UPI QR Preview"
                      width={160}
                      height={160}
                      className="rounded-lg"
                      data-ocid="sub.upi-qr-preview"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <QrCode className="w-8 h-8 opacity-30" />
                    <p className="text-xs text-center px-3">
                      Enter a UPI ID to see the preview
                    </p>
                  </div>
                )}
                {upiId.trim() && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                    <Smartphone className="w-3.5 h-3.5 shrink-0" />
                    <span>Scan with PhonePe, GPay, Paytm</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QR Timeout Settings */}
          <Separator />
          <div className="flex items-center gap-2 mt-2">
            <Settings className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-foreground">
              QR Payment Timeout
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Set how long generated QR codes remain valid before expiring.
            Shorter durations are more secure. Current: {currentQRMinutes}{" "}
            minute{currentQRMinutes !== 1 ? "s" : ""}.
          </p>
          <div className="flex items-end gap-3 max-w-xs">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="qr-timeout">Timeout (minutes)</Label>
              <Input
                id="qr-timeout"
                type="number"
                min="1"
                max="60"
                value={qrTimeoutInput}
                onChange={(e) => setQrTimeoutInput(e.target.value)}
                placeholder="2"
                data-ocid="sub.qr-timeout-input"
              />
            </div>
            <Button
              onClick={handleSaveQRTimeout}
              className="gap-2"
              data-ocid="sub.save-qr-timeout-button"
            >
              {qrTimeoutSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Recommended: 2–5 minutes. Applies to all QR codes across chatbot
            simulator, orders, and subscription payments.
          </p>
        </div>
      )}

      {activeTab === "subscriptions" && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard
              icon={<LayoutGrid className="w-5 h-5 text-primary" />}
              label="Total Plans"
              value={plans.length}
              sub={`${activePlans} active`}
              colorCls="bg-primary/10"
            />
            <MetricCard
              icon={<Users className="w-5 h-5 text-blue-600" />}
              label="Active Subscriptions"
              value={activeSubCount}
              sub={`${ACTIVE_SUBS.length - activeSubCount} expired`}
              colorCls="bg-blue-100 dark:bg-blue-900/30"
            />
            <MetricCard
              icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
              label="Revenue This Month"
              value={`₹${revenueMonth.toLocaleString("en-IN")}`}
              sub="flat fee plans"
              colorCls="bg-emerald-100 dark:bg-emerald-900/30"
            />
            <MetricCard
              icon={<IndianRupee className="w-5 h-5 text-amber-600" />}
              label="Avg Plan Value"
              value={`₹${avgPlanValue.toLocaleString("en-IN")}`}
              sub="across all plans"
              colorCls="bg-amber-100 dark:bg-amber-900/30"
            />
          </div>

          {/* Active Subscriptions Table - moved inline below */}
        </div>
      )}

      {activeTab === "plans" && (
        <div className="space-y-6">
          {/* Plan Type Tabs */}
          <div className="flex gap-1.5 flex-wrap bg-muted/40 p-1 rounded-xl border border-border">
            {PLAN_TYPE_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setPlanTypeFilter(tab.key)}
                data-active={planTypeFilter === tab.key}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
              ${
                planTypeFilter === tab.key
                  ? "bg-card text-foreground border-border shadow-sm"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:bg-card/60"
              }`}
                data-ocid={`plan-tab-${tab.key}`}
              >
                {tab.icon}
                {tab.label}
                <span className="bg-muted rounded-full px-1.5 py-0.5 text-[10px] tabular-nums">
                  {tab.key === "all"
                    ? plans.length
                    : tab.key === SubscriptionPlanType.monthly
                      ? plans.filter(
                          (p) =>
                            p.planType === SubscriptionPlanType.monthly ||
                            p.planType === SubscriptionPlanType.weekly,
                        ).length
                      : plans.filter((p) => p.planType === tab.key).length}
                </span>
              </button>
            ))}
          </div>

          {/* Plans Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                <div
                  key={k}
                  className="h-72 bg-muted animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : filteredPlans.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center bg-card border border-border rounded-xl"
              data-ocid="plans-empty-state"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <CreditCard className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No plans found</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Create your first plan to get started
              </p>
              <Button
                onClick={openCreate}
                size="sm"
                data-ocid="plans-empty-create"
              >
                <Plus className="w-4 h-4 mr-2" /> Create Plan
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onEdit={openEdit}
                  onAssign={openAssign}
                  onDelete={handleDelete}
                  onPay={openPay}
                />
              ))}
            </div>
          )}

          {/* Active Subscriptions Table */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  User Subscriptions
                </h3>
                <Badge variant="secondary">{ACTIVE_SUBS.length}</Badge>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="subscriptions-role-filter"
                >
                  <option value="all">All Roles</option>
                  <option value={UserRole.merchant}>Merchant</option>
                  <option value={UserRole.customer}>Customer</option>
                  <option value={UserRole.deliveryPartner}>
                    Delivery Partner
                  </option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="subscriptions-status-filter"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="expiring">Expiring Soon</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    {[
                      "User",
                      "Role",
                      "Plan",
                      "Type",
                      "Start",
                      "Expiry",
                      "Orders",
                      "Inquiries",
                      "Status",
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
                  {filteredSubs.map((sub) => {
                    const cfg = PLAN_TYPE_CONFIG[sub.planType];
                    return (
                      <tr
                        key={sub.id}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`sub-row-${sub.id}`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                          {sub.userName}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[sub.role] ?? ""}`}
                          >
                            {roleLabel(sub.role)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {sub.planName}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.badgeCls}`}
                          >
                            {cfg.icon}
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {sub.startDate}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {sub.endDate}
                        </td>
                        <td className="px-4 py-3 tabular-nums">
                          <div className="text-xs">
                            <span className="font-medium">
                              {sub.ordersUsed}
                            </span>
                            <span className="text-muted-foreground">
                              /{sub.ordersLimit === 0 ? "∞" : sub.ordersLimit}
                            </span>
                          </div>
                          {sub.ordersLimit > 0 && (
                            <div className="w-16 h-1 bg-muted rounded-full mt-1">
                              <div
                                className="h-1 bg-primary rounded-full"
                                style={{
                                  width: `${Math.min((sub.ordersUsed / sub.ordersLimit) * 100, 100)}%`,
                                }}
                              />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 tabular-nums">
                          <div className="text-xs">
                            <span className="font-medium">
                              {sub.inquiriesUsed}
                            </span>
                            <span className="text-muted-foreground">
                              /
                              {sub.inquiriesLimit === 0
                                ? "∞"
                                : sub.inquiriesLimit}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${
                              STATUS_MAP[sub.status] ?? ""
                            }`}
                          >
                            {sub.status === "expiring"
                              ? "Expiring Soon"
                              : sub.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Subscription Redirect Modal ─────────────────────────────────────── */}
      <Dialog
        open={showSubscriptionRedirect}
        onOpenChange={setShowSubscriptionRedirect}
      >
        <DialogContent
          className="sm:max-w-lg max-h-[92vh] overflow-y-auto"
          data-ocid="sub-redirect.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <QrCode className="w-4 h-4 text-primary" />
              Choose Your Plan
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground mb-2">
            To continue using WhatsCart, please select and activate a
            subscription plan.
          </div>
          <SubscriptionRedirectModal
            plans={plans}
            userId="demo_user"
            onSuccess={() => setShowSubscriptionRedirect(false)}
          />
        </DialogContent>
      </Dialog>

      {/* ── Create / Edit Plan Modal ───────────────────────────────────────── */}
      <Dialog open={showPlanModal} onOpenChange={setShowPlanModal}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              {editPlan ? "Edit Plan" : "Create Plan"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Name + Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label>Plan Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. Merchant Premium Monthly"
                  data-ocid="plan-form-name"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Plan Type</Label>
                <Select
                  value={form.planType}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      planType: v as SubscriptionPlanType,
                    }))
                  }
                >
                  <SelectTrigger data-ocid="plan-form-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SubscriptionPlanType.free}>
                      Free — No cost, basic limits
                    </SelectItem>
                    <SelectItem value={SubscriptionPlanType.monthly}>
                      Subscription (Recurring) — Weekly / Monthly
                    </SelectItem>
                    <SelectItem value={SubscriptionPlanType.duration}>
                      Duration-Based — Fixed number of days
                    </SelectItem>
                    <SelectItem value={SubscriptionPlanType.category}>
                      Category-Based — Specific product/merchant category
                    </SelectItem>
                    <SelectItem value={SubscriptionPlanType.flat}>
                      Flat Rate — Fixed ₹ amount per period
                    </SelectItem>
                    <SelectItem value={SubscriptionPlanType.percentage}>
                      Percentage — % of each transaction
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Billing Cycle (subscription only) */}
              {isSubscriptionType && (
                <div className="space-y-1.5">
                  <Label>Billing Cycle</Label>
                  <Select
                    value={form.billingCycle}
                    onValueChange={(v) =>
                      setForm((f) => ({
                        ...f,
                        billingCycle: v as PlanFormState["billingCycle"],
                      }))
                    }
                  >
                    <SelectTrigger data-ocid="plan-form-billing-cycle">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly (7 days)</SelectItem>
                      <SelectItem value="monthly">Monthly (30 days)</SelectItem>
                      <SelectItem value="yearly">Yearly (365 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Duration days (duration-based only) */}
              {isDurationBased && (
                <div className="space-y-1.5">
                  <Label>Duration (days)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={form.durationDays}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, durationDays: e.target.value }))
                    }
                    data-ocid="plan-form-duration"
                  />
                </div>
              )}

              {/* Category scope (category-based only) */}
              {isCategoryBased && (
                <div className="space-y-1.5">
                  <Label>Category Scope</Label>
                  <Input
                    value={form.categoryScope}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, categoryScope: e.target.value }))
                    }
                    placeholder="e.g. food, medical, salon"
                    data-ocid="plan-form-category-scope"
                  />
                </div>
              )}
            </div>

            {/* Applicable Roles multi-select */}
            <div className="space-y-2">
              <Label>Applicable Roles</Label>
              <div className="flex flex-wrap gap-2">
                {ALL_ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => {
                      if (
                        r.value === UserRole.merchant ||
                        r.value === UserRole.customer ||
                        r.value === UserRole.deliveryPartner
                      ) {
                        toggleApplicableRole(r.value as UserRole);
                      }
                    }}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                      form.applicableRoles.includes(r.value as UserRole)
                        ? `${ROLE_COLORS[r.value] ?? ""} ring-2 ring-primary/30`
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                    data-ocid={`plan-form-role-${r.value}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Pricing</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    {isFlatRate ? "Flat Fee (₹)" : "Base Price (₹)"}
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={isFlatRate ? form.flatFee : form.priceFlat}
                    onChange={(e) =>
                      setForm((f) =>
                        isFlatRate
                          ? {
                              ...f,
                              flatFee: e.target.value,
                              priceFlat: e.target.value,
                            }
                          : { ...f, priceFlat: e.target.value },
                      )
                    }
                    placeholder="0"
                    data-ocid="plan-form-price-flat"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    {isPercentage ? "Fee Percentage (%)" : "Commission (%)"}
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={
                      isPercentage ? form.percentageFee : form.pricePercentage
                    }
                    onChange={(e) =>
                      setForm((f) =>
                        isPercentage
                          ? {
                              ...f,
                              percentageFee: e.target.value,
                              pricePercentage: e.target.value,
                            }
                          : { ...f, pricePercentage: e.target.value },
                      )
                    }
                    placeholder="0"
                    data-ocid="plan-form-price-pct"
                  />
                </div>
              </div>

              {/* Transaction range (percentage / flat plans) */}
              {(isPercentage || isFlatRate) && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Min Transaction (₹)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={form.minTransaction}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          minTransaction: e.target.value,
                        }))
                      }
                      data-ocid="plan-form-min-txn"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Max Transaction (₹)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={form.maxTransaction}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          maxTransaction: e.target.value,
                        }))
                      }
                      data-ocid="plan-form-max-txn"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Limits */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Order Limit
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={form.orderLimit}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, orderLimit: e.target.value }))
                  }
                  placeholder="0=unlimited"
                  data-ocid="plan-form-order-limit"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Inquiry Limit/day
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={form.inquiryLimit}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, inquiryLimit: e.target.value }))
                  }
                  data-ocid="plan-form-inquiry-limit"
                />
              </div>
              {!isDurationBased && !isSubscriptionType && (
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Duration (days)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={form.durationDays}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, durationDays: e.target.value }))
                    }
                    data-ocid="plan-form-duration-fallback"
                  />
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex gap-2">
                <Input
                  value={form.featureInput}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featureInput: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                  placeholder="Add a feature bullet…"
                  data-ocid="plan-form-feature-input"
                />
                <Button type="button" variant="outline" onClick={addFeature}>
                  Add
                </Button>
              </div>
              {form.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 p-3 bg-muted/40 rounded-lg border border-border">
                  {form.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full text-xs font-medium"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {f}
                      <button
                        type="button"
                        onClick={() =>
                          setForm((s) => ({
                            ...s,
                            features: s.features.filter((x) => x !== f),
                          }))
                        }
                        className="hover:text-destructive ml-0.5 leading-none"
                        aria-label="Remove feature"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-3 py-2 border-t border-border">
              <Switch
                id="plan-active"
                checked={form.isActive}
                onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))}
                data-ocid="plan-form-active-toggle"
              />
              <Label htmlFor="plan-active" className="cursor-pointer">
                Active — show this plan to users
              </Label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPlanModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSavePlan}
                data-ocid="plan-form-save"
              >
                {editPlan ? "Save Changes" : "Create Plan"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Assign Plan Modal ──────────────────────────────────────────────── */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              Assign Plan
              {assignPlan && (
                <span
                  className={`ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border align-middle ${
                    PLAN_TYPE_CONFIG[assignPlan.planType].badgeCls
                  }`}
                >
                  {assignPlan.name}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Search User</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={assignSearch}
                  onChange={(e) => setAssignSearch(e.target.value)}
                  placeholder="Name, phone, or user ID…"
                  className="pl-9"
                  data-ocid="assign-user-search"
                />
              </div>
            </div>

            {/* Mock user results */}
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {[
                {
                  id: "u1",
                  name: "Sharma Kirana Store",
                  role: "merchant",
                  phone: "+91 98765 43210",
                },
                {
                  id: "u2",
                  name: "Patel Fast Food",
                  role: "merchant",
                  phone: "+91 87654 32109",
                },
                {
                  id: "u3",
                  name: "Ravi Thakur",
                  role: "delivery",
                  phone: "+91 76543 21098",
                },
                {
                  id: "u4",
                  name: "Rajesh Kumar",
                  role: "customer",
                  phone: "+91 65432 10987",
                },
                {
                  id: "u5",
                  name: "Meena Electronics",
                  role: "merchant",
                  phone: "+91 54321 09876",
                },
              ]
                .filter(
                  (u) =>
                    !assignSearch ||
                    u.name.toLowerCase().includes(assignSearch.toLowerCase()) ||
                    u.phone.includes(assignSearch),
                )
                .map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors cursor-pointer"
                    data-ocid={`assign-user-row-${u.id}`}
                  >
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {u.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{u.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[u.role] ?? ""}`}
                      >
                        {roleLabel(u.role)}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                        onClick={() => {
                          if (u.role === "merchant") {
                            setAssignedMerchantPhone(
                              u.phone.replace(/\s/g, ""),
                            );
                          }
                          setShowAssignModal(false);
                        }}
                        data-ocid={`assign-confirm-${u.id}`}
                      >
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Discount indicator for selected merchant */}
            {assignedMerchantPhone && merchantDiscount > 0 && assignPlan && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs">
                <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-semibold text-emerald-700">
                    {merchantDiscount}% loyalty discount applied!
                  </span>
                  <p className="text-muted-foreground mt-0.5">
                    Original: ₹
                    {Number(
                      assignPlan.flatFee ?? assignPlan.priceFlat ?? 0,
                    ).toLocaleString("en-IN")}
                    {" → "}
                    <strong>
                      ₹
                      {Math.round(
                        Number(
                          assignPlan.flatFee ?? assignPlan.priceFlat ?? 0,
                        ) *
                          (1 - merchantDiscount / 100),
                      ).toLocaleString("en-IN")}
                    </strong>
                    {" ("}
                    {merchantDiscount}% off for importing customers
                    {")"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2 border-t border-border">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Payment Modal ──────────────────────────────────────────────────── */}
      {payPlan && (
        <Dialog
          open={showPayModal}
          onOpenChange={(open) => {
            setShowPayModal(open);
            if (!open) setPayPlan(null);
          }}
        >
          <PaymentModal
            plan={payPlan}
            onClose={() => {
              setShowPayModal(false);
              setPayPlan(null);
            }}
          />
        </Dialog>
      )}
    </div>
  );
}
