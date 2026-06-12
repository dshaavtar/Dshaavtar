import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Clock,
  HandCoins,
  IndianRupee,
  Info,
  Lock,
  LogOut,
  Package,
  Phone,
  QrCode,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  Star,
  Store,
  TrendingUp,
  Truck,
  Unlock,
  UserCheck,
  Users,
  Wrench,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import BarcodeDisplay from "../components/BarcodeDisplay";
import BuzzNotification from "../components/BuzzNotification";
import CommunitySection from "../components/CommunitySection";
import DashboardLinkBanner from "../components/DashboardLinkBanner";
import LendingSection from "../components/LendingSection";
import QRTimerDisplay from "../components/QRTimerDisplay";
import {
  useAddProductScanHistory,
  useDeleteProductScanEntry,
  useGenerateOrderPaymentQR,
  useGeneratePOSOTP,
  useGetCommunityMembersByCity,
  useGetLendingItemsByBorrower,
  useGetLendingItemsByLender,
  useGetMerchantSubscriptionStatus,
  useGetProductByBarcode,
  useGetProductScanHistory,
  useMerchantAnalytics,
  useMerchantBranches,
  useMerchantEarnings,
  useMerchantPOSOrders,
  useMerchantTopProducts,
  useOrders,
  useOrdersByMerchant,
  useProducts,
  useTestOrders,
  useUpdateOrderStatus,
  useVerifyPOSOTP,
} from "../hooks/useBackend";
import {
  useAddMerchantEmployee,
  useApproveLeave,
  useEmployeeCheckIn,
  useEmployeeCheckOut,
  useGetMerchantPendingLeaves,
  useGetTodayAttendance,
  useListMerchantEmployees,
  useRejectLeave,
  useSetMerchantEmployeeActive,
} from "../hooks/useMerchantEmployees";
import type { Order, OrderPaymentQR } from "../types";
import { OrderStatus } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingEntry {
  id: string;
  customerName: string;
  serviceType: "appointment" | "rental" | "booking" | "scheduling";
  date: string;
  time: string;
  amount: number;
  status: "pending" | "accepted" | "completed" | "rejected";
}

interface MerchantSession {
  phone: string;
  merchantId: string;
  name: string;
  upiId?: string;
}

const SESSION_KEY = "wc_merchant_session";

function getSession(): MerchantSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as MerchantSession;
  } catch {
    // ignore
  }
  return null;
}

function saveSession(session: MerchantSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
  background: "var(--color-card, #1e293b)",
  border: "1px solid var(--color-border, #334155)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--color-card-foreground, #f1f5f9)",
};

interface OrderQRState {
  qr: OrderPaymentQR;
  expired: boolean;
}

// ─── OTP Login Screen ─────────────────────────────────────────────────────────

function MerchantOTPLogin({
  onSuccess,
}: { onSuccess: (session: MerchantSession) => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [error, setError] = useState("");
  const generateOTP = useGeneratePOSOTP();
  const verifyOTP = useVerifyPOSOTP();

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setInterval(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCountdown]);

  async function handleSendOTP() {
    setError("");
    if (!phone.trim()) {
      setError("Please enter your WhatsApp number");
      return;
    }
    try {
      const result = await generateOTP.mutateAsync({ phone, role: "merchant" });
      if (result.otp) setDevOtp(result.otp);
      setStep("otp");
      setResendCountdown(30);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send OTP");
    }
  }

  async function handleVerify() {
    setError("");
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }
    try {
      const result = await verifyOTP.mutateAsync({
        phone,
        otp,
        role: "merchant",
      });
      if (result.success) {
        const session: MerchantSession = {
          phone,
          merchantId: result.merchantId ?? result.userId ?? `m_${phone}`,
          name: result.name ?? phone,
        };
        saveSession(session);
        localStorage.setItem("wc_merchant_id", session.merchantId);
        onSuccess(session);
      } else {
        setError("OTP verification failed");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid OTP");
    }
  }

  return (
    <div
      className="bg-card border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6"
      data-ocid="merchant.pos-login-panel"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground">
            Merchant POS Login
          </h3>
          <p className="text-xs text-muted-foreground">
            Sign in with your WhatsApp number to access POS
          </p>
        </div>
      </div>
      {step === "phone" ? (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="pos-phone">WhatsApp Number</Label>
            <Input
              id="pos-phone"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
              data-ocid="merchant.pos.phone_input"
            />
          </div>
          {error && (
            <p
              className="text-sm text-destructive"
              data-ocid="merchant.pos.error_state"
            >
              {error}
            </p>
          )}
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleSendOTP}
            disabled={generateOTP.isPending}
            data-ocid="merchant.pos.send_otp_button"
          >
            {generateOTP.isPending ? "Sending OTP…" : "Send OTP via WhatsApp"}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
            OTP sent to{" "}
            <span className="font-medium text-foreground">{phone}</span>
          </p>
          {devOtp && (
            <div
              className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3"
              data-ocid="merchant.pos.dev_otp_info"
            >
              <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-primary">
                  Dev Mode — OTP:{" "}
                  <span className="font-mono font-bold">{devOtp}</span>
                </p>
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="pos-otp">Enter OTP</Label>
            <Input
              id="pos-otp"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              maxLength={6}
              data-ocid="merchant.pos.otp_input"
            />
          </div>
          {error && (
            <p
              className="text-sm text-destructive"
              data-ocid="merchant.pos.error_state"
            >
              {error}
            </p>
          )}
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleVerify}
            disabled={verifyOTP.isPending}
            data-ocid="merchant.pos.verify_otp_button"
          >
            {verifyOTP.isPending ? "Verifying…" : "Verify & Enter POS"}
          </Button>
          <div className="flex items-center justify-between text-xs">
            {resendCountdown > 0 ? (
              <span className="text-muted-foreground">
                Resend in {resendCountdown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSendOTP}
                className="text-primary hover:underline"
                data-ocid="merchant.pos.resend_button"
              >
                Resend OTP
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setError("");
                setOtp("");
                setDevOtp(null);
              }}
              className="text-muted-foreground hover:text-foreground"
              data-ocid="merchant.pos.back_button"
            >
              ← Change number
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── POS Panel (shown after OTP login) ────────────────────────────────────────

function MerchantPOSPanel({
  session,
  onLogout,
}: { session: MerchantSession; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [hasNewOrder, setHasNewOrder] = useState(false);
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(
    new Set(),
  );
  const [orderQRMap, setOrderQRMap] = useState<Record<string, OrderQRState>>(
    {},
  );
  const [overlayQR, setOverlayQR] = useState<OrderPaymentQR | null>(null);

  const MERCHANT_ID = session.merchantId;
  const merchantUPI = session?.upiId ?? "";
  const branchId = selectedBranch === "all" ? undefined : selectedBranch;

  const { data: branches = [] } = useMerchantBranches(MERCHANT_ID);
  const { data: pendingOrders = [], isLoading: loadingPending } =
    useMerchantPOSOrders(MERCHANT_ID, branchId, "pending") as {
      data: Order[];
      isLoading: boolean;
    };
  const { data: acceptedOrders = [], isLoading: loadingActive } =
    useMerchantPOSOrders(MERCHANT_ID, branchId, "accepted") as {
      data: Order[];
      isLoading: boolean;
    };
  const { data: completedOrders = [], isLoading: loadingCompleted } =
    useMerchantPOSOrders(MERCHANT_ID, branchId, "completed") as {
      data: Order[];
      isLoading: boolean;
    };
  const { data: earnings, isLoading: loadingEarnings } = useMerchantEarnings(
    MERCHANT_ID,
    branchId,
  );
  const { data: topProducts = [] } = useMerchantTopProducts(MERCHANT_ID);
  const { data: analytics } = useMerchantAnalytics(MERCHANT_ID);

  const generateQR = useGenerateOrderPaymentQR();

  const updateStatus = useUpdateOrderStatus();

  const unacknowledgedCount = pendingOrders.filter(
    (o) => !acknowledgedIds.has(String(o.id)),
  ).length;
  useEffect(() => {
    setHasNewOrder(unacknowledgedCount > 0);
  }, [unacknowledgedCount]);

  const totalPending = pendingOrders.length;
  const totalCompleted = completedOrders.length;

  const revenueTrend = analytics?.revenueTrend
    ? analytics.revenueTrend
        .slice(-7)
        .map((d) => ({ day: d.period.slice(-5), revenue: Number(d.revenue) }))
    : [];

  function formatTime(ts: bigint | number | undefined): string {
    if (!ts) return "—";
    return new Date(Number(ts)).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  function formatDate(ts: bigint | number | undefined): string {
    if (!ts) return "—";
    return new Date(Number(ts)).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  }

  async function handleAccept(orderId: string) {
    await updateStatus.mutateAsync({
      id: orderId,
      status: OrderStatus.accepted,
    });
    setAcknowledgedIds((prev) => new Set([...prev, orderId]));
  }
  async function handleReject(orderId: string) {
    await updateStatus.mutateAsync({
      id: orderId,
      status: OrderStatus.rejected,
    });
    setAcknowledgedIds((prev) => new Set([...prev, orderId]));
  }
  async function handleOverlayQR(orderId: string, amount: number) {
    const qr = await generateQR.mutateAsync({
      orderId,
      amount,
      upiId: merchantUPI,
    });
    setOverlayQR(qr as unknown as OrderPaymentQR);
  }
  async function handleInlineQR(orderId: string, amount: number) {
    const qr = await generateQR.mutateAsync({
      orderId,
      amount,
      upiId: merchantUPI,
    });
    setOrderQRMap((prev) => ({
      ...prev,
      [orderId]: { qr: qr as unknown as OrderPaymentQR, expired: false },
    }));
  }

  return (
    <div className="space-y-4" data-ocid="merchant.pos.panel">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">POS — {session.name}</p>
          <p className="text-xs text-muted-foreground">{session.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <label
              htmlFor="pos-branch"
              className="text-xs text-muted-foreground"
            >
              Branch:
            </label>
            <select
              id="pos-branch"
              className="text-sm border border-border rounded-md px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              data-ocid="merchant.pos.branch_select"
            >
              <option value="all">All Branches</option>
              {branches.map((b) => (
                <option key={b.branchId} value={b.branchId}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="gap-1.5 text-muted-foreground hover:text-destructive"
            data-ocid="merchant.pos.logout_button"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>

      <BuzzNotification
        hasNewOrder={hasNewOrder}
        onAcknowledge={() => {
          setHasNewOrder(false);
          setAcknowledgedIds(new Set(pendingOrders.map((o) => String(o.id))));
        }}
      />

      {overlayQR && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          data-ocid="merchant.pos.qr.dialog"
        >
          <div className="relative">
            <button
              type="button"
              className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-card rounded-full flex items-center justify-center border border-border shadow-card hover:bg-muted"
              onClick={() => setOverlayQR(null)}
              aria-label="Close QR"
              data-ocid="merchant.pos.qr.close_button"
            >
              <X className="w-4 h-4" />
            </button>
            <QRTimerDisplay
              qrData={overlayQR.qrData}
              amount={overlayQR.amount}
              expiresAt={overlayQR.expiresAt}
              onExpire={() => {}}
              onRefresh={() => setOverlayQR(null)}
            />
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {loadingEarnings ? (
          ["a", "b", "c", "d"].map((k) => (
            <Skeleton key={k} className="h-20 rounded-xl" />
          ))
        ) : (
          <>
            <div
              className="earnings-card"
              data-ocid="merchant.pos.revenue_card"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-success" />
                <span className="text-xs text-muted-foreground">
                  Revenue Today
                </span>
              </div>
              <p className="text-xl font-bold text-success">
                ₹{(earnings?.totalRevenue ?? 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="earnings-card" data-ocid="merchant.pos.orders_card">
              <div className="flex items-center gap-1.5 mb-1">
                <ShoppingBag className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Total Orders
                </span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {Number(earnings?.orderCount ?? 0)}
              </p>
            </div>
            <div
              className="earnings-card"
              data-ocid="merchant.pos.pending_card"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-warning" />
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              <p className="text-xl font-bold text-warning">{totalPending}</p>
            </div>
            <div
              className="earnings-card"
              data-ocid="merchant.pos.completed_card"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {totalCompleted}
              </p>
            </div>
          </>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto" data-ocid="merchant.pos.tabs">
          <TabsTrigger value="pending" data-ocid="merchant.pos.tab.pending">
            <Clock className="w-3.5 h-3.5 mr-1" />
            Pending
            {totalPending > 0 && (
              <span className="ml-1.5 bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5 font-bold">
                {totalPending}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="active" data-ocid="merchant.pos.tab.active">
            <Package className="w-3.5 h-3.5 mr-1" />
            Active
          </TabsTrigger>
          <TabsTrigger value="completed" data-ocid="merchant.pos.tab.completed">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Done ({totalCompleted})
          </TabsTrigger>
          <TabsTrigger value="earnings" data-ocid="merchant.pos.tab.earnings">
            <BarChart3 className="w-3.5 h-3.5 mr-1" />
            Earnings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-3 space-y-2">
          {loadingPending ? (
            ["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-28 rounded-xl" />
            ))
          ) : pendingOrders.length === 0 ? (
            <div
              className="py-12 text-center text-muted-foreground"
              data-ocid="merchant.pos.pending.empty_state"
            >
              <Package className="w-10 h-10 mb-3 mx-auto opacity-30" />
              <p>No pending orders</p>
            </div>
          ) : (
            pendingOrders.map((order, idx) => (
              <div
                key={String(order.id)}
                className="pos-order-card pos-order-card-pending"
                data-ocid={`merchant.pos.order.${idx + 1}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm font-mono">
                        #{String(order.id).slice(-8).toUpperCase()}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs border-warning text-warning"
                      >
                        Pending
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatTime(order.createdAt)}
                      </span>
                    </div>
                    {order.customerId && (
                      <p className="text-xs text-muted-foreground mb-1">
                        Customer:{" "}
                        <span className="font-medium text-foreground">
                          {order.customerId}
                        </span>
                      </p>
                    )}
                    <p className="text-sm font-bold text-foreground">
                      ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <Button
                      size="sm"
                      className="gap-1 bg-success hover:bg-success/90 text-success-foreground min-w-[72px]"
                      onClick={() => handleAccept(String(order.id))}
                      disabled={updateStatus.isPending}
                      data-ocid={`merchant.pos.accept_button.${idx + 1}`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 border-destructive text-destructive hover:bg-destructive/10 min-w-[72px]"
                      onClick={() => handleReject(String(order.id))}
                      disabled={updateStatus.isPending}
                      data-ocid={`merchant.pos.reject_button.${idx + 1}`}
                    >
                      <X className="w-3 h-3" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 min-w-[72px]"
                      onClick={() =>
                        handleOverlayQR(String(order.id), order.totalAmount)
                      }
                      data-ocid={`merchant.pos.qr_button.${idx + 1}`}
                    >
                      <QrCode className="w-3 h-3" />
                      QR Pay
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-3 space-y-2">
          {loadingActive ? (
            ["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-28 rounded-xl" />
            ))
          ) : acceptedOrders.length === 0 ? (
            <div
              className="py-12 text-center text-muted-foreground"
              data-ocid="merchant.pos.active.empty_state"
            >
              <CheckCircle2 className="w-10 h-10 mb-3 mx-auto opacity-30" />
              <p>No active orders</p>
            </div>
          ) : (
            acceptedOrders.map((order, idx) => {
              const orderId = String(order.id);
              const qrState = orderQRMap[orderId];
              return (
                <div
                  key={orderId}
                  className="pos-order-card pos-order-card-confirmed"
                  data-ocid={`merchant.pos.active_order.${idx + 1}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-sm font-mono">
                          #{orderId.slice(-8).toUpperCase()}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs border-success text-success"
                        >
                          Active
                        </Badge>
                      </div>
                      {order.customerId && (
                        <p className="text-xs text-muted-foreground">
                          Customer:{" "}
                          <span className="font-medium">
                            {order.customerId}
                          </span>
                        </p>
                      )}
                      <p className="text-sm font-bold text-foreground mt-1">
                        ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {!qrState ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() =>
                            handleInlineQR(orderId, order.totalAmount)
                          }
                          disabled={generateQR.isPending}
                          data-ocid={`merchant.pos.generate_qr.${idx + 1}`}
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          Generate QR
                        </Button>
                      ) : qrState.expired ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 border-destructive text-destructive"
                          onClick={() =>
                            setOrderQRMap((p) => {
                              const n = { ...p };
                              delete n[orderId];
                              return n;
                            })
                          }
                          data-ocid={`merchant.pos.qr_expired.${idx + 1}`}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Regenerate
                        </Button>
                      ) : (
                        <QRTimerDisplay
                          qrData={qrState.qr.qrData}
                          amount={qrState.qr.amount}
                          expiresAt={qrState.qr.expiresAt}
                          onExpire={() =>
                            setOrderQRMap((p) => ({
                              ...p,
                              [orderId]: { ...p[orderId], expired: true },
                            }))
                          }
                          onRefresh={() =>
                            setOrderQRMap((p) => {
                              const n = { ...p };
                              delete n[orderId];
                              return n;
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-3 space-y-2">
          {loadingCompleted ? (
            ["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-16 rounded-xl" />
            ))
          ) : completedOrders.length === 0 ? (
            <div
              className="py-12 text-center text-muted-foreground"
              data-ocid="merchant.pos.completed.empty_state"
            >
              <CheckCircle2 className="w-10 h-10 mb-3 mx-auto opacity-30" />
              <p>No completed orders yet</p>
            </div>
          ) : (
            completedOrders.map((order, idx) => (
              <div
                key={String(order.id)}
                className="pos-order-card border-l-4 border-l-muted-foreground"
                data-ocid={`merchant.pos.completed_order.${idx + 1}`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm font-mono">
                        #{String(order.id).slice(-8).toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(order.completedAt ?? order.createdAt)}{" "}
                        {formatTime(order.completedAt ?? order.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Completed
                  </Badge>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="earnings" className="mt-3 space-y-4">
          <div className="bg-muted/30 border border-border rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              Revenue Trend — Last 7 Days
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart
                data={revenueTrend}
                margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`
                  }
                />
                <Tooltip
                  formatter={(v: number) => [
                    `₹${v.toLocaleString("en-IN")}`,
                    "Revenue",
                  ]}
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: 11,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--success)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "var(--success)", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {topProducts.length > 0 && (
            <div className="bg-muted/30 border border-border rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Top Products
              </h4>
              <div className="space-y-2">
                {topProducts.slice(0, 5).map((p, idx) => (
                  <div
                    key={p.productId}
                    className="flex items-center gap-3"
                    data-ocid={`merchant.pos.product.${idx + 1}`}
                  >
                    <span className="text-xs text-muted-foreground w-4 font-mono">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {p.productName}
                      </p>
                    </div>
                    <span className="text-xs font-bold">
                      {Number(p.orderCount)} orders
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ₹{p.totalRevenue.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Subscription Lock Gate ───────────────────────────────────────────────────

function SubscriptionLockGate({ onUnlock }: { onUnlock: () => void }) {
  const [passdigit, setPassdigit] = useState("");
  const [qrCountdown, setQrCountdown] = useState(120);
  const [timerStarted, setTimerStarted] = useState(false);

  function startTimer() {
    if (timerStarted) return;
    setTimerStarted(true);
    const interval = setInterval(() => {
      setQrCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  function handleUnlock() {
    if (passdigit.length < 4) {
      toast.error("Enter your 4-digit Passdigit to unlock");
      return;
    }
    onUnlock();
    toast.success("Subscription activated! Dashboard unlocked.");
  }

  const mins = Math.floor(qrCountdown / 60)
    .toString()
    .padStart(2, "0");
  const secs = (qrCountdown % 60).toString().padStart(2, "0");

  return (
    <div
      className="rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-6"
      data-ocid="merchant.subscription-lock-gate"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
          <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-lg">
            Subscription Required
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Activate your Passdigit subscription to access your merchant
            dashboard.
          </p>
        </div>
        <Badge className="ml-auto bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-700">
          Locked
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Unlock className="w-4 h-4 text-amber-500" /> Enter Passdigit
          </p>
          <Input
            type="password"
            maxLength={6}
            placeholder="Enter 4–6 digit Passdigit"
            value={passdigit}
            onChange={(e) => setPassdigit(e.target.value)}
            className="mb-3 font-mono tracking-widest"
            data-ocid="merchant.passdigit.input"
          />
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleUnlock}
            data-ocid="merchant.passdigit.submit_button"
          >
            <Unlock className="w-4 h-4 mr-2" /> Unlock Dashboard
          </Button>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-500" /> Pay via UPI /
            Scan QR
          </p>
          <button
            type="button"
            className="w-32 h-32 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-border hover:border-amber-400 transition-colors"
            onClick={startTimer}
            title="Click to generate QR"
            data-ocid="merchant.subscription-qr"
          >
            {timerStarted ? (
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-amber-500">
                  {mins}:{secs}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  QR Valid
                </div>
              </div>
            ) : (
              <div className="text-center">
                <IndianRupee className="w-8 h-8 text-muted-foreground mx-auto" />
                <p className="text-xs text-muted-foreground mt-1">
                  Click to generate
                </p>
              </div>
            )}
          </button>
          <p className="text-xs text-center text-muted-foreground">
            UPI: merchant@localbazar
          </p>
          <p className="text-xs text-center font-semibold text-foreground mt-1">
            ₹499/month — Premium Plan
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function MerchantStatCard({
  title,
  value,
  icon: Icon,
  sublabel,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  sublabel?: string;
}) {
  return (
    <div className="bg-card border-l-4 border-l-amber-400 border border-border rounded-xl p-4 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {sublabel && (
            <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
          )}
        </div>
        <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
      </div>
    </div>
  );
}

function BookingStatusBadge({ status }: { status: BookingEntry["status"] }) {
  const MAP = {
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    accepted:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${MAP[status]}`}
    >
      {status}
    </span>
  );
}

function ServiceTypeBadge({ type }: { type: BookingEntry["serviceType"] }) {
  const MAP = {
    appointment: {
      label: "Appointment",
      color: "text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-300",
    },
    rental: {
      label: "Rental",
      color:
        "text-violet-600 bg-violet-100 dark:bg-violet-900/30 dark:text-violet-300",
    },
    booking: {
      label: "Booking",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300",
    },
    scheduling: {
      label: "Scheduling",
      color: "text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-300",
    },
  };
  const { label, color } = MAP[type];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
}

// ─── Employees Tab ────────────────────────────────────────────────────────────

function EmployeesTab({ merchantId }: { merchantId: string }) {
  const { data: employees = [] } = useListMerchantEmployees(merchantId);
  const { data: attendance = [] } = useGetTodayAttendance(merchantId);
  const { data: pendingLeaves = [] } = useGetMerchantPendingLeaves(merchantId);

  const addEmployee = useAddMerchantEmployee();
  const setActive = useSetMerchantEmployeeActive();
  const checkIn = useEmployeeCheckIn();
  const checkOut = useEmployeeCheckOut();
  const approveLeave = useApproveLeave();
  const rejectLeave = useRejectLeave();

  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRole, setNewRole] = useState("cashier");
  const [checkInEmployeeId, setCheckInEmployeeId] = useState("");

  const handleAddEmployee = async () => {
    if (!newName || !newPhone) return;
    await addEmployee.mutateAsync({
      merchantId,
      name: newName,
      phone: newPhone,
      role: newRole,
    });
    setNewName("");
    setNewPhone("");
    setNewRole("cashier");
    setShowAdd(false);
  };

  const roleLabel = (role: string) =>
    role === "cashier"
      ? "Cashier"
      : role === "store_manager"
        ? "Store Manager"
        : "Delivery Coordinator";

  return (
    <Tabs defaultValue="staff" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="staff">Staff</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="leave">Leave</TabsTrigger>
      </TabsList>

      {/* Staff */}
      <TabsContent value="staff">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-foreground">Employees</h3>
          <Button
            size="sm"
            onClick={() => setShowAdd(true)}
            data-ocid="employees.add_button"
          >
            Add Employee
          </Button>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  data-ocid="employees.name_input"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  data-ocid="employees.phone_input"
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger data-ocid="employees.role_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cashier">Cashier</SelectItem>
                    <SelectItem value="store_manager">Store Manager</SelectItem>
                    <SelectItem value="delivery_coordinator">
                      Delivery Coordinator
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                size="sm"
                onClick={handleAddEmployee}
                data-ocid="employees.submit_button"
              >
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="space-y-2">
          {employees.map((emp) => (
            <Card key={emp.id} data-ocid="employees.item">
              <CardContent className="flex items-center justify-between py-3 px-4">
                <div>
                  <p className="font-medium text-sm">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {emp.phone} · {roleLabel(emp.role)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={emp.isActive ? "default" : "secondary"}>
                    {emp.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setActive.mutate({
                        id: emp.id,
                        merchantId,
                        isActive: !emp.isActive,
                      })
                    }
                  >
                    {emp.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Attendance */}
      <TabsContent value="attendance">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-foreground">Today's Attendance</h3>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Employee ID"
              value={checkInEmployeeId}
              onChange={(e) => setCheckInEmployeeId(e.target.value)}
              className="w-40"
              data-ocid="attendance.employee_id_input"
            />
            <Button
              size="sm"
              onClick={() => {
                if (checkInEmployeeId)
                  checkIn.mutate({
                    employeeId: checkInEmployeeId,
                    merchantId,
                    notes: "",
                  });
              }}
              data-ocid="attendance.check_in_button"
            >
              Check In
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {attendance.map((rec) => (
            <Card key={rec.id} data-ocid="attendance.item">
              <CardContent className="flex items-center justify-between py-3 px-4">
                <div>
                  <p className="text-sm font-medium">
                    {rec.employeeId.slice(0, 8)}…
                  </p>
                  <p className="text-xs text-muted-foreground">
                    In:{" "}
                    {new Date(
                      Number(rec.checkInTime / 1000000n),
                    ).toLocaleTimeString()}{" "}
                    ·{" "}
                    {rec.checkOutTime
                      ? `Out: ${new Date(Number(rec.checkOutTime / 1000000n)).toLocaleTimeString()}`
                      : "On duty"}
                  </p>
                </div>
                {!rec.checkOutTime && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      checkOut.mutate({ attendanceId: rec.id, merchantId })
                    }
                    data-ocid="attendance.check_out_button"
                  >
                    Check Out
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          {attendance.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No attendance records for today.
            </p>
          )}
        </div>
      </TabsContent>

      {/* Leave */}
      <TabsContent value="leave">
        <h3 className="font-semibold text-foreground mb-3">
          Pending Leave Requests
        </h3>
        <div className="space-y-2">
          {pendingLeaves.map((lv) => (
            <Card key={lv.id} data-ocid="leave.item">
              <CardContent className="py-3 px-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">
                      {lv.employeeId.slice(0, 8)}…
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lv.startDate} → {lv.endDate}
                    </p>
                    <p className="text-xs mt-1">{lv.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        approveLeave.mutate({
                          id: lv.id,
                          merchantId,
                          approverNote: "",
                        })
                      }
                      data-ocid="leave.approve_button"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        rejectLeave.mutate({
                          id: lv.id,
                          merchantId,
                          approverNote: "",
                        })
                      }
                      data-ocid="leave.reject_button"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {pendingLeaves.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No pending leave requests.
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MerchantDashboardPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [earningsView, setEarningsView] = useState<"today" | "week" | "month">(
    "week",
  );
  const [posSession, setPosSession] = useState<MerchantSession | null>(
    getSession,
  );
  const merchantPhone = posSession?.phone ?? "";
  const merchantId = posSession?.merchantId;
  const merchantName = posSession?.name ?? "Merchant";
  const {
    data: orders = [],
    isLoading: ordersLoading,
    refetch: refetchOrders,
    dataUpdatedAt,
  } = useOrdersByMerchant(merchantId);
  const recentOrders = orders.slice(0, 10);
  const { data: testOrdersList = [] } = useTestOrders();
  const testOrderIds = new Set(testOrdersList.map((o) => o.id));
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  useEffect(() => {
    if (dataUpdatedAt) setLastRefreshed(new Date(dataUpdatedAt));
  }, [dataUpdatedAt]);

  // ── Scanner & Subscription hooks ────────────────────────────────────────
  const { data: subscriptionStatus } = useGetMerchantSubscriptionStatus(
    merchantId ?? "",
  );
  const { data: backendProducts = [] } = useProducts(merchantId ?? "");
  const { data: scanHistory = [] } = useGetProductScanHistory(
    merchantId ?? "",
    10,
  );
  const addScan = useAddProductScanHistory();
  const deleteScan = useDeleteProductScanEntry();
  const lookupBarcode = useGetProductByBarcode();

  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState<{
    title: string;
    baseRate: number;
    barcodeValue: string;
  } | null>(null);
  const [scanError, setScanError] = useState("");
  const [scanLoading, setScanLoading] = useState(false);

  const isRestricted = !!(
    subscriptionStatus &&
    (!subscriptionStatus.isActive || subscriptionStatus.isAtLimit)
  );
  const restrictionMsg =
    subscriptionStatus?.isActive === false
      ? `Your plan "${subscriptionStatus?.planName ?? "Free"}" has expired. Please upgrade to add products.`
      : subscriptionStatus?.isAtLimit
        ? `You've reached the product limit (${subscriptionStatus?.productLimit ?? 0}) for your current plan. Upgrade to add more.`
        : "";

  async function handleScanLookup() {
    if (!scanInput.trim()) return;
    setScanLoading(true);
    setScanError("");
    setScanResult(null);
    try {
      const product = await lookupBarcode.mutateAsync(scanInput.trim());
      if (product) {
        setScanResult({
          title: product.title,
          baseRate: Number(product.baseRate),
          barcodeValue: scanInput.trim(),
        });
        await addScan.mutateAsync({
          merchantId: merchantId ?? "",
          productId: product.id,
          barcodeValue: scanInput.trim(),
        });
      } else {
        setScanError("No product found for this barcode.");
      }
    } catch {
      setScanError("Scan lookup failed. Please try again.");
    } finally {
      setScanLoading(false);
    }
  }

  function printLabel(name: string, price: number, barcode: string) {
    const win = window.open("", "_blank", "width=400,height=300");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html><html><head><title>Label</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding: 20px; }
        .name { font-size: 18px; font-weight: bold; margin-bottom: 4px; }
        .price { font-size: 22px; color: #d97706; font-weight: bold; margin-bottom: 8px; }
        .barcode { font-size: 13px; letter-spacing: 2px; font-family: monospace; }
        @media print { body { margin: 0; } }
      </style></head><body>
      <div class="name">${name}</div>
      <div class="price">&#8377;${price}</div>
      <div class="barcode">${barcode}</div>
      <script>window.onload=()=>{window.print();window.close();}<\/script>
      </body></html>
    `);
    win.document.close();
  }

  function handleBookingAction(
    id: string,
    action: "accept" | "reject" | "complete",
  ) {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        return {
          ...b,
          status: {
            accept: "accepted" as const,
            reject: "rejected" as const,
            complete: "completed" as const,
          }[action],
        };
      }),
    );
    toast.success(
      `Booking ${id} ${action === "accept" ? "accepted" : action === "reject" ? "rejected" : "completed"}`,
    );
  }

  const earningsTotal = { today: 0, week: 0, month: 0 };
  const revenueTrend: { day: string; revenue: number }[] = [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role Header */}
      <div className="role-header-merchant rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Store className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Merchant Dashboard
            </h2>
            <p className="text-sm text-muted-foreground">
              {merchantName}
              {merchantPhone ? ` · 📱 ${merchantPhone}` : ""} · Premium Plan
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {isUnlocked ? (
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200">
                <CheckCircle className="w-3 h-3 mr-1" /> Active
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200">
                <Lock className="w-3 h-3 mr-1" /> Subscription Required
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Link Banner */}
      <DashboardLinkBanner
        dashboardUrl={`${window.location.origin}/merchant-dashboard`}
        roleLabel="Merchant"
        accentClass="border-amber-300 dark:border-amber-700/50"
        iconBgClass="bg-amber-100 dark:bg-amber-900/30"
        iconColorClass="text-amber-600"
      />

      {/* Subscription Lock Gate */}
      {!isUnlocked && (
        <SubscriptionLockGate onUnlock={() => setIsUnlocked(true)} />
      )}
      {isUnlocked && (
        <>
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full sm:w-auto" data-ocid="merchant.tabs">
              <TabsTrigger value="overview" data-ocid="merchant.tab.overview">
                <Store className="w-3.5 h-3.5 mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="orders" data-ocid="merchant.tab.orders">
                <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="products" data-ocid="merchant.tab.products">
                <Package className="w-3.5 h-3.5 mr-1" />
                Products &amp; Services
              </TabsTrigger>
              <TabsTrigger value="bookings" data-ocid="merchant.tab.bookings">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="pos" data-ocid="merchant.tab.pos">
                <QrCode className="w-3.5 h-3.5 mr-1" />
                POS
              </TabsTrigger>
              <TabsTrigger value="lending" data-ocid="merchant.tab.lending">
                <HandCoins className="w-3.5 h-3.5 mr-1" />
                Lending
              </TabsTrigger>
              <TabsTrigger value="community" data-ocid="merchant.tab.community">
                <Users className="w-3.5 h-3.5 mr-1" />
                Community
              </TabsTrigger>
              <TabsTrigger value="employees" data-ocid="merchant.tab.employees">
                <UserCheck className="w-3.5 h-3.5 mr-1" />
                Employees
              </TabsTrigger>
            </TabsList>

            {/* ── Overview ──────────────────────────────────────────── */}
            <TabsContent value="overview" className="mt-4 space-y-5">
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                data-ocid="merchant.stats-grid"
              >
                <MerchantStatCard
                  title="Total Products"
                  value="48"
                  icon={Package}
                  sublabel="12 added this month"
                />
                <MerchantStatCard
                  title="Total Bookings"
                  value="127"
                  icon={Calendar}
                  sublabel="8 pending today"
                />
                <MerchantStatCard
                  title="Appointments"
                  value="34"
                  icon={Clock}
                  sublabel="3 upcoming today"
                />
                <MerchantStatCard
                  title="Rentals Active"
                  value="7"
                  icon={Wrench}
                  sublabel="2 ending today"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
                  <p className="text-xs text-muted-foreground">
                    Total Customers
                  </p>
                  <p className="text-xl font-bold text-foreground mt-1">342</p>
                  <p className="text-xs text-emerald-500 mt-0.5">
                    +18 this month
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                  <p className="text-xl font-bold text-amber-500 mt-1">
                    4.7 <Star className="w-4 h-4 inline fill-amber-500" />
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    From 89 reviews
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
                  <p className="text-xs text-muted-foreground">
                    Active Listings
                  </p>
                  <p className="text-xl font-bold text-foreground mt-1">23</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Products + Services
                  </p>
                </div>
              </div>
              {/* Earnings Card */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div
                  className="xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-card"
                  data-ocid="merchant.pending-bookings-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">
                      Pending Bookings
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {bookings.filter((b) => b.status === "pending").length}{" "}
                      pending
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((booking, i) => (
                      <div
                        key={booking.id}
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border"
                        data-ocid={`merchant.booking.item.${i + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm text-foreground truncate">
                              {booking.customerName}
                            </span>
                            <ServiceTypeBadge type={booking.serviceType} />
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {booking.date} · {booking.time} · ₹{booking.amount}
                          </p>
                        </div>
                        <BookingStatusBadge status={booking.status} />
                        {booking.status === "pending" && (
                          <div className="flex gap-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                handleBookingAction(booking.id, "accept")
                              }
                              className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 text-emerald-600 transition-colors"
                              aria-label="Accept"
                              data-ocid={`merchant.booking.accept.${i + 1}`}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleBookingAction(booking.id, "reject")
                              }
                              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 text-red-600 transition-colors"
                              aria-label="Reject"
                              data-ocid={`merchant.booking.reject.${i + 1}`}
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="bg-card border border-border rounded-xl p-5 shadow-card"
                  data-ocid="merchant.earnings-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">
                      Earnings
                    </h3>
                    <div className="flex gap-1">
                      {(["today", "week", "month"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setEarningsView(v)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${earningsView === v ? "bg-amber-500 text-white" : "text-muted-foreground hover:bg-muted"}`}
                          data-ocid={`merchant.earnings.${v}`}
                        >
                          {v.charAt(0).toUpperCase() + v.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold text-foreground">
                      ₹{earningsTotal[earningsView].toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-emerald-500 mt-1">
                      +12% vs last {earningsView}
                    </p>
                  </div>
                  {earningsTotal[earningsView] > 0 ? (
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart
                        data={revenueTrend}
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                      >
                        <XAxis
                          dataKey="day"
                          tick={{ fontSize: 10 }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 9 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={TOOLTIP_STYLE}
                          formatter={(v: number) => [
                            `₹${v.toLocaleString("en-IN")}`,
                            "Earnings",
                          ]}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#f59e0b"
                          radius={[3, 3, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[120px] text-muted-foreground text-sm">
                      No earnings data yet
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* ── Orders ──────────────────────────────────────────────── */}
            <TabsContent value="orders" className="mt-4">
              <div
                className="bg-card border border-border rounded-xl p-5 shadow-card"
                data-ocid="merchant.orders-table"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      Live Orders
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Auto-refreshes every 15s · Last updated{" "}
                      {lastRefreshed.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => refetchOrders()}
                    data-ocid="merchant.orders.refresh_button"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Refresh
                  </Button>
                </div>
                {ordersLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-10 w-full rounded-lg" />
                    ))}
                  </div>
                ) : recentOrders.length === 0 ? (
                  <div
                    className="py-8 text-center"
                    data-ocid="merchant.orders.empty_state"
                  >
                    <ShoppingBag className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No orders yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentOrders.map((order, i) => {
                      const o = order as unknown as Record<string, unknown>;
                      return (
                        <div
                          key={String(o.id ?? i)}
                          className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors"
                          data-ocid={`merchant.order.item.${i + 1}`}
                        >
                          <span className="font-mono text-xs text-muted-foreground w-16 truncate">
                            {String(o.id ?? "")}
                          </span>
                          <span className="flex-1 text-sm text-foreground truncate">
                            {String(o.customerId ?? "")}
                          </span>
                          {Boolean(o.customerPhone ?? o.deliveryPhone) && (
                            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                              {String(o.customerPhone ?? o.deliveryPhone ?? "")}
                            </span>
                          )}
                          <span className="text-sm font-medium tabular-nums">
                            ₹
                            {Number(o.totalAmount ?? 0).toLocaleString("en-IN")}
                          </span>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {testOrderIds.has(String(o.id ?? "")) && (
                              <Badge className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-semibold">
                                Test Run
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {String(o.status ?? "")}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                    )
                  </div>
                )}
              </div>
            </TabsContent>

            {/* ── Products & Services ──────────────────────────────── */}
            <TabsContent value="products" className="mt-4">
              <div
                className="bg-card border border-border rounded-xl p-5 shadow-card"
                data-ocid="merchant.products-section"
              >
                {/* ── Subscription Warning Banner ────────────────── */}
                {isRestricted && (
                  <div
                    className="mb-4 flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4"
                    data-ocid="merchant.subscription.warning"
                  >
                    <Lock className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-destructive">
                        Plan Limit Reached
                      </p>
                      <p className="text-xs text-destructive/80 mt-0.5">
                        {restrictionMsg}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="gap-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-shrink-0"
                      data-ocid="merchant.subscription.buy_button"
                    >
                      <IndianRupee className="w-3.5 h-3.5" />
                      Upgrade Plan
                    </Button>
                  </div>
                )}

                {/* ── Subscription Info Bar ─────────────────────── */}
                {subscriptionStatus && !isRestricted && (
                  <div className="mb-4 flex items-center gap-3 bg-success/10 border border-success/20 rounded-xl px-4 py-2.5">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <p className="text-xs text-success flex-1">
                      <span className="font-semibold">
                        {subscriptionStatus.planName}
                      </span>{" "}
                      plan active
                      {subscriptionStatus.daysRemaining !== undefined && (
                        <>
                          {" "}
                          &bull; {Number(subscriptionStatus.daysRemaining)} days
                          remaining
                        </>
                      )}
                      {subscriptionStatus.productLimit !== undefined && (
                        <>
                          {" "}
                          &bull; {Number(subscriptionStatus.productCount ?? 0)}/
                          {Number(subscriptionStatus.productLimit)} products
                        </>
                      )}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">
                    Products &amp; Services
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      onClick={() => {
                        setScanModalOpen(true);
                        setScanInput("");
                        setScanResult(null);
                        setScanError("");
                      }}
                      data-ocid="merchant.scan_product_button"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      Scan Product
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      disabled={isRestricted}
                      title={isRestricted ? restrictionMsg : undefined}
                      data-ocid="merchant.add_product_button"
                    >
                      <Package className="w-3.5 h-3.5" />
                      Add Product
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1.5 bg-amber-500 hover:bg-amber-600 text-white"
                      disabled={isRestricted}
                      title={isRestricted ? restrictionMsg : undefined}
                      data-ocid="merchant.add_service_button"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      Add Service
                    </Button>
                  </div>
                </div>

                {/* ── Scan Modal ────────────────────────────────── */}
                {scanModalOpen && (
                  <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    data-ocid="merchant.scan.dialog"
                  >
                    <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground text-lg">
                          Scan / Enter Barcode
                        </h4>
                        <button
                          type="button"
                          onClick={() => setScanModalOpen(false)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Close"
                          data-ocid="merchant.scan.close_button"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="barcode-input"
                          className="text-sm text-muted-foreground"
                        >
                          Barcode / SKU
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="barcode-input"
                            placeholder="e.g. 8901234567890"
                            value={scanInput}
                            onChange={(e) => setScanInput(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleScanLookup()
                            }
                            className="flex-1"
                            data-ocid="merchant.scan.input"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleScanLookup}
                            disabled={scanLoading || !scanInput.trim()}
                            data-ocid="merchant.scan.submit_button"
                          >
                            {scanLoading ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <QrCode className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        {/* Camera capture for mobile */}
                        <label
                          className="flex items-center gap-2 text-xs text-primary cursor-pointer hover:underline w-fit"
                          data-ocid="merchant.scan.camera_button"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // Camera capture — user can type the barcode from photo
                                toast.info(
                                  "Photo captured. Enter the barcode number above.",
                                );
                              }
                            }}
                          />
                          <QrCode className="w-3.5 h-3.5" />
                          Use Camera to Capture Barcode
                        </label>
                      </div>

                      {scanError && (
                        <div
                          className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2"
                          data-ocid="merchant.scan.error_state"
                        >
                          <XCircle className="w-4 h-4 flex-shrink-0" />
                          {scanError}
                        </div>
                      )}

                      {scanResult && (
                        <div
                          className="bg-success/10 border border-success/20 rounded-xl p-4 space-y-3"
                          data-ocid="merchant.scan.success_state"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-foreground">
                                {scanResult.title}
                              </p>
                              <p className="text-xl font-bold text-amber-500">
                                ₹{scanResult.baseRate}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5 flex-shrink-0"
                              onClick={() =>
                                printLabel(
                                  scanResult.title,
                                  scanResult.baseRate,
                                  scanResult.barcodeValue,
                                )
                              }
                              data-ocid="merchant.scan.print_button"
                            >
                              Print Label
                            </Button>
                          </div>
                          <div className="border-t border-border pt-3">
                            <BarcodeDisplay
                              value={scanResult.barcodeValue}
                              width={2}
                              height={60}
                              showText
                              className="mx-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Products Grid ─────────────────────────────── */}
                {backendProducts.length === 0 ? (
                  <div
                    className="py-12 text-center text-muted-foreground"
                    data-ocid="merchant.products.empty_state"
                  >
                    <Package className="w-10 h-10 mb-3 mx-auto opacity-30" />
                    <p className="font-medium">No products yet</p>
                    <p className="text-xs mt-1">
                      Add your first product or scan a barcode above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {backendProducts.map((item, i) => (
                      <div
                        key={String(item.id ?? i)}
                        className="bg-muted/30 border border-border rounded-xl p-3 space-y-2"
                        data-ocid={`merchant.product.item.${i + 1}`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-sm font-medium text-foreground truncate">
                            {item.title}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize ml-1 flex-shrink-0"
                          >
                            {"product"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="text-sm font-bold text-amber-500">
                          ₹{Number(item.baseRate)}
                        </p>
                        {item.barcodeValue && (
                          <BarcodeDisplay
                            value={String(item.barcodeValue)}
                            width={1.5}
                            height={40}
                            showText={false}
                            className="w-full"
                          />
                        )}
                        <div className="flex gap-1.5 pt-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs gap-1"
                            disabled={isRestricted}
                            title={
                              isRestricted ? restrictionMsg : "Edit product"
                            }
                            data-ocid={`merchant.product.edit_button.${i + 1}`}
                          >
                            Edit
                          </Button>
                          {item.barcodeValue && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs gap-1"
                              onClick={() =>
                                printLabel(
                                  item.title,
                                  Number(item.baseRate),
                                  String(item.barcodeValue),
                                )
                              }
                              data-ocid={`merchant.product.print_button.${i + 1}`}
                            >
                              Print
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Recent Scans ──────────────────────────────── */}
                {scanHistory.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-foreground">
                        Recent Scans
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {scanHistory.length} entries
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {scanHistory.slice(0, 5).map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center gap-3 bg-muted/20 border border-border/50 rounded-lg px-3 py-2"
                          data-ocid={`merchant.scan.history.item.${entry.id}`}
                        >
                          <QrCode className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">
                              {entry.barcodeValue}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {entry.barcodeValue}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-destructive transition-colors ml-auto"
                            onClick={() =>
                              deleteScan.mutate({
                                entryId: entry.id,
                                merchantId: merchantId ?? "",
                              })
                            }
                            aria-label="Remove scan entry"
                            data-ocid="merchant.scan.history.delete_button"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* ── Bookings ──────────────────────────────────────────── */}
            <TabsContent value="bookings" className="mt-4">
              <div
                className="bg-card border border-border rounded-xl p-5 shadow-card"
                data-ocid="merchant.bookings-section"
              >
                <h3 className="font-display font-semibold text-foreground mb-4">
                  All Bookings &amp; Appointments
                </h3>
                <div className="space-y-3">
                  {bookings.map((booking, i) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border"
                      data-ocid={`merchant.booking.full.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-foreground">
                            {booking.customerName}
                          </span>
                          <ServiceTypeBadge type={booking.serviceType} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {booking.date} · {booking.time} · ₹{booking.amount}
                        </p>
                      </div>
                      <BookingStatusBadge status={booking.status} />
                      {booking.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 border-emerald-400 text-emerald-600 hover:bg-emerald-50"
                            onClick={() =>
                              handleBookingAction(booking.id, "accept")
                            }
                            data-ocid={`merchant.booking.full.accept.${i + 1}`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 border-red-400 text-red-600 hover:bg-red-50"
                            onClick={() =>
                              handleBookingAction(booking.id, "reject")
                            }
                            data-ocid={`merchant.booking.full.reject.${i + 1}`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </Button>
                        </div>
                      )}
                      {booking.status === "accepted" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 border-blue-400 text-blue-600 hover:bg-blue-50"
                          onClick={() =>
                            handleBookingAction(booking.id, "complete")
                          }
                          data-ocid={`merchant.booking.full.complete.${i + 1}`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Mark Done
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* ── POS ───────────────────────────────────────────────── */}
            <TabsContent value="pos" className="mt-4">
              <div className="space-y-5" data-ocid="merchant.pos-section">
                {!posSession ? (
                  <MerchantOTPLogin
                    onSuccess={(s) => {
                      saveSession(s);
                      setPosSession(s);
                    }}
                  />
                ) : (
                  <MerchantPOSPanel
                    session={posSession}
                    onLogout={() => {
                      clearSession();
                      setPosSession(null);
                    }}
                  />
                )}
              </div>
            </TabsContent>

            {/* ── Lending ───────────────────────────────────────────────── */}
            <TabsContent value="lending" className="mt-4">
              <div
                className="bg-card border border-border rounded-xl p-5 shadow-card"
                data-ocid="merchant.lending-section"
              >
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <HandCoins className="w-4 h-4 text-amber-500" /> Lending
                </h3>
                {posSession?.phone ? (
                  <LendingSection
                    phone={posSession.phone}
                    accentClass="bg-amber-50/50 dark:bg-amber-950/20"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Log in via POS tab to view your lending items.
                  </p>
                )}
              </div>
            </TabsContent>

            {/* ── Community ─────────────────────────────────────────────── */}
            <TabsContent value="community" className="mt-4">
              <div
                className="bg-card border border-border rounded-xl p-5 shadow-card"
                data-ocid="merchant.community-section"
              >
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Nearby Community
                </h3>
                <CommunitySection city="Gandhidham" maxItems={10} />
              </div>
            </TabsContent>

            {/* ── Employees ─────────────────────────────────────────────── */}
            <TabsContent value="employees" className="mt-4">
              <EmployeesTab merchantId={posSession?.merchantId ?? ""} />
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Locked Preview */}
      {!isUnlocked && (
        <div className="relative rounded-xl overflow-hidden">
          <div
            className="bg-card border border-border rounded-xl p-5 opacity-40 pointer-events-none"
            aria-hidden
          >
            <h3 className="font-display font-semibold text-foreground mb-4">
              Advanced Analytics
            </h3>
            <div className="h-32 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center bg-destructive/15">
                <Lock className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Activate Passdigit to unlock
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
