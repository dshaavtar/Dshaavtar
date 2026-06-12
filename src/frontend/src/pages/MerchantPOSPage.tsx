import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Info,
  LogOut,
  Package,
  QrCode,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  X,
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
import BuzzNotification from "../components/BuzzNotification";
import QRTimerDisplay from "../components/QRTimerDisplay";
import {
  type CustomerRatingEntry,
  type DisplayTotalOrders,
  useGenerateOrderPaymentQR,
  useGeneratePOSOTP,
  useGetCustomerRatingHistory,
  useGetDisplayTotalOrders,
  useMerchantAnalytics,
  useMerchantBranches,
  useMerchantEarnings,
  useMerchantPOSOrders,
  useMerchantTopProducts,
  useUpdateOrderStatus,
  useVerifyPOSOTP,
} from "../hooks/useBackend";
import type {
  MerchantAnalytics,
  Order,
  OrderPaymentQR,
  ProductRevenue,
} from "../types";
import { OrderStatus } from "../types";

const SESSION_KEY = "wc_merchant_session";

interface MerchantSession {
  phone: string;
  merchantId: string;
  name: string;
}

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

// ─── OTP Login Screen ─────────────────────────────────────────────────────────

function MerchantOTPLogin({
  onSuccess,
}: {
  onSuccess: (session: MerchantSession) => void;
}) {
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-2xl px-5 py-3 mb-4">
            <ShoppingCart className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-primary font-display">
              LocalBazar Kart
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Merchant POS
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in with your WhatsApp number
          </p>
        </div>

        <Card className="shadow-card">
          <CardContent className="pt-6 space-y-5">
            {step === "phone" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pos-phone">WhatsApp Number</Label>
                  <Input
                    id="pos-phone"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                    data-ocid="merchant_pos.login.phone_input"
                  />
                </div>
                {error && (
                  <p
                    className="text-sm text-destructive"
                    data-ocid="merchant_pos.login.error_state"
                  >
                    {error}
                  </p>
                )}
                <Button
                  className="w-full gap-2"
                  onClick={handleSendOTP}
                  disabled={generateOTP.isPending}
                  data-ocid="merchant_pos.login.send_otp_button"
                >
                  {generateOTP.isPending ? "Sending OTP…" : "Send OTP"}
                </Button>
              </>
            ) : (
              <>
                <div className="text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                  OTP sent to{" "}
                  <span className="font-medium text-foreground">{phone}</span>
                </div>

                {/* Dev mode info box */}
                {devOtp && (
                  <div
                    className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3"
                    data-ocid="merchant_pos.login.dev_otp_info"
                  >
                    <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-primary">
                        Dev Mode
                      </p>
                      <p className="text-sm font-mono font-bold text-foreground mt-0.5">
                        OTP: {devOtp}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Real WhatsApp not connected — using simulator OTP
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="pos-otp">Enter OTP</Label>
                  <Input
                    id="pos-otp"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    maxLength={6}
                    data-ocid="merchant_pos.login.otp_input"
                  />
                </div>
                {error && (
                  <p
                    className="text-sm text-destructive"
                    data-ocid="merchant_pos.login.error_state"
                  >
                    {error}
                  </p>
                )}
                <Button
                  className="w-full gap-2"
                  onClick={handleVerify}
                  disabled={verifyOTP.isPending}
                  data-ocid="merchant_pos.login.verify_otp_button"
                >
                  {verifyOTP.isPending ? "Verifying…" : "Verify OTP"}
                </Button>
                <div className="text-center">
                  {resendCountdown > 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Resend OTP in {resendCountdown}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="text-xs text-primary hover:underline"
                      data-ocid="merchant_pos.login.resend_button"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setError("");
                    setOtp("");
                    setDevOtp(null);
                  }}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="merchant_pos.login.back_button"
                >
                  ← Change number
                </button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Main POS Dashboard ───────────────────────────────────────────────────────

const EARN_SKELS = ["revenue", "orders", "avg", "payouts"] as const;
const LIST_SKELS = ["a", "b", "c"] as const;

interface OrderQRState {
  qr: OrderPaymentQR;
  expired: boolean;
}

export default function MerchantPOSPage() {
  const [session, setSession] = useState<MerchantSession | null>(getSession);

  if (!session) {
    return <MerchantOTPLogin onSuccess={setSession} />;
  }

  return (
    <MerchantDashboard
      session={session}
      onLogout={() => {
        clearSession();
        setSession(null);
      }}
    />
  );
}

function MerchantDashboard({
  session,
  onLogout,
}: {
  session: MerchantSession;
  onLogout: () => void;
}) {
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
  const MOCK_UPI_ID = localStorage.getItem("wc_upi_id") ?? "";
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
  const { data: topProducts = [], isLoading: loadingProducts } =
    useMerchantTopProducts(MERCHANT_ID);
  const { data: analytics } = useMerchantAnalytics(MERCHANT_ID);
  const { data: displayOrders } = useGetDisplayTotalOrders(MERCHANT_ID);
  const displayOrdersTyped = displayOrders ?? undefined;
  const { data: ratingHistory = [], isLoading: loadingRatings } =
    useGetCustomerRatingHistory(MERCHANT_ID);

  const generateQR = useGenerateOrderPaymentQR();
  const updateStatus = useUpdateOrderStatus();

  const unacknowledgedCount = pendingOrders.filter(
    (o) => !acknowledgedIds.has(String(o.id)),
  ).length;
  useEffect(() => {
    setHasNewOrder(unacknowledgedCount > 0);
  }, [unacknowledgedCount]);

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

  async function handleAcceptOrder(orderId: string) {
    await updateStatus.mutateAsync({
      id: orderId,
      status: OrderStatus.accepted,
    });
    setAcknowledgedIds((prev) => new Set([...prev, orderId]));
  }

  async function handleRejectOrder(orderId: string) {
    await updateStatus.mutateAsync({
      id: orderId,
      status: OrderStatus.rejected,
    });
    setAcknowledgedIds((prev) => new Set([...prev, orderId]));
  }

  async function handleGenerateOverlayQR(orderId: string, amount: number) {
    const qr = await generateQR.mutateAsync({
      orderId,
      amount,
      upiId: MOCK_UPI_ID,
    });
    setOverlayQR(qr as unknown as OrderPaymentQR);
  }

  async function handleGenerateInlineQR(orderId: string, amount: number) {
    const qr = await generateQR.mutateAsync({
      orderId,
      amount,
      upiId: MOCK_UPI_ID,
    });
    setOrderQRMap((prev) => ({
      ...prev,
      [orderId]: { qr: qr as unknown as OrderPaymentQR, expired: false },
    }));
  }

  const revenueTrend = analytics?.revenueTrend
    ? analytics.revenueTrend.slice(-7).map((d) => ({
        day: d.period.slice(-5),
        revenue: d.revenue,
      }))
    : Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
          day: `${d.getDate()}/${d.getMonth() + 1}`,
          revenue: Math.floor(Math.random() * 8000) + 1000,
        };
      });

  const totalPending = pendingOrders.length;
  const totalActive = acceptedOrders.length;
  const totalCompleted = completedOrders.length;

  // Rating summary
  const goodCount = ratingHistory.filter(
    (r) => r.ratingValue === "good",
  ).length;
  const pctGood =
    ratingHistory.length > 0
      ? Math.round((goodCount / ratingHistory.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* POS Header */}
      <header className="bg-card border-b border-border shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-primary" />
          <div>
            <p className="font-bold text-foreground font-display leading-tight">
              LocalBazar Kart 🛒
            </p>
            <p className="text-xs text-muted-foreground">
              Merchant POS · {session.name}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="gap-1.5 text-muted-foreground hover:text-destructive"
          data-ocid="merchant_pos.logout_button"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </header>

      <div className="p-4 space-y-5" data-ocid="merchant_pos.page">
        <BuzzNotification
          hasNewOrder={hasNewOrder}
          onAcknowledge={() => {
            setHasNewOrder(false);
            setAcknowledgedIds(new Set(pendingOrders.map((o) => String(o.id))));
          }}
        />

        {/* QR overlay */}
        {overlayQR && (
          <div
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center"
            data-ocid="qr_payment.dialog"
          >
            <div className="relative">
              <button
                type="button"
                className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-card rounded-full flex items-center justify-center border border-border shadow-card hover:bg-muted transition-colors"
                onClick={() => setOverlayQR(null)}
                aria-label="Close QR"
                data-ocid="qr_payment.close_button"
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

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">
              Merchant POS
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage orders, payments &amp; earnings
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <label
                htmlFor="pos-branch-select"
                className="text-xs text-muted-foreground font-medium"
              >
                Branch:
              </label>
              <select
                id="pos-branch-select"
                className="text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                data-ocid="merchant_pos.branch_select"
              >
                <option value="all">All Branches</option>
                {branches.map((b) => (
                  <option key={b.branchId} value={b.branchId}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <Badge
              variant={totalPending > 0 ? "destructive" : "secondary"}
              className="text-sm px-3 py-1"
              data-ocid="merchant_pos.pending_badge"
            >
              {totalPending} Pending
            </Badge>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          data-ocid="merchant_pos.stats_row"
        >
          {loadingEarnings ? (
            EARN_SKELS.map((k) => (
              <Skeleton key={k} className="h-24 rounded-xl" />
            ))
          ) : (
            <>
              <div
                className="earnings-card"
                data-ocid="merchant_pos.revenue_card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Revenue Today
                  </span>
                </div>
                <p className="text-2xl font-bold text-success">
                  ₹{(earnings?.totalRevenue ?? 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div
                className="earnings-card"
                data-ocid="merchant_pos.orders_card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Total Orders
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {Number(earnings?.orderCount ?? 0)}
                </p>
              </div>
              <div
                className="earnings-card"
                data-ocid="merchant_pos.pending_count_card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Pending
                  </span>
                </div>
                <p className="text-2xl font-bold text-warning">
                  {totalPending}
                </p>
              </div>
              <div
                className="earnings-card"
                data-ocid="merchant_pos.completed_count_card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Completed
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {totalCompleted}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Order tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto" data-ocid="merchant_pos.tabs">
            <TabsTrigger value="pending" data-ocid="merchant_pos.tab.pending">
              <Clock className="w-4 h-4 mr-1.5" />
              Pending
              {totalPending > 0 && (
                <span className="ml-1.5 bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5 font-bold">
                  {totalPending}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="active" data-ocid="merchant_pos.tab.active">
              <Package className="w-4 h-4 mr-1.5" />
              Active
              {totalActive > 0 && (
                <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 font-bold">
                  {totalActive}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              data-ocid="merchant_pos.tab.completed"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Completed ({totalCompleted})
            </TabsTrigger>
            <TabsTrigger value="earnings" data-ocid="merchant_pos.tab.earnings">
              <BarChart3 className="w-4 h-4 mr-1.5" />
              Earnings
            </TabsTrigger>
            <TabsTrigger value="ratings" data-ocid="merchant_pos.tab.ratings">
              <Star className="w-4 h-4 mr-1.5" />
              Ratings
            </TabsTrigger>
          </TabsList>

          {/* Pending tab */}
          <TabsContent value="pending" className="mt-4 space-y-3">
            {loadingPending ? (
              LIST_SKELS.map((k) => (
                <Skeleton key={k} className="h-32 rounded-xl" />
              ))
            ) : pendingOrders.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-muted-foreground"
                data-ocid="merchant_pos.pending.empty_state"
              >
                <Package className="w-12 h-12 mb-4 opacity-30" />
                <p className="font-semibold text-base">No pending orders</p>
                <p className="text-sm mt-1 opacity-60">
                  New orders will appear here automatically
                </p>
              </div>
            ) : (
              pendingOrders.map((order, idx) => (
                <PendingOrderCard
                  key={String(order.id)}
                  order={order}
                  index={idx + 1}
                  isProcessing={updateStatus.isPending}
                  onAccept={() => handleAcceptOrder(String(order.id))}
                  onReject={() => handleRejectOrder(String(order.id))}
                  onQRPay={() =>
                    handleGenerateOverlayQR(String(order.id), order.totalAmount)
                  }
                  formatTime={formatTime}
                />
              ))
            )}
          </TabsContent>

          {/* Active tab */}
          <TabsContent value="active" className="mt-4 space-y-3">
            {loadingActive ? (
              LIST_SKELS.map((k) => (
                <Skeleton key={k} className="h-32 rounded-xl" />
              ))
            ) : acceptedOrders.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-muted-foreground"
                data-ocid="merchant_pos.active.empty_state"
              >
                <CheckCircle2 className="w-12 h-12 mb-4 opacity-30" />
                <p className="font-semibold text-base">No active orders</p>
              </div>
            ) : (
              acceptedOrders.map((order, idx) => {
                const orderId = String(order.id);
                const qrState = orderQRMap[orderId];
                return (
                  <ActiveOrderCard
                    key={orderId}
                    order={order}
                    index={idx + 1}
                    qrState={qrState ?? null}
                    isGeneratingQR={generateQR.isPending}
                    onGenerateQR={() =>
                      handleGenerateInlineQR(orderId, order.totalAmount)
                    }
                    onQRExpire={() =>
                      setOrderQRMap((prev) => ({
                        ...prev,
                        [orderId]: { ...prev[orderId], expired: true },
                      }))
                    }
                    onQRRefresh={() =>
                      setOrderQRMap((prev) => {
                        const next = { ...prev };
                        delete next[orderId];
                        return next;
                      })
                    }
                    formatTime={formatTime}
                  />
                );
              })
            )}
          </TabsContent>

          {/* Completed tab */}
          <TabsContent value="completed" className="mt-4 space-y-3">
            {loadingCompleted ? (
              LIST_SKELS.map((k) => (
                <Skeleton key={k} className="h-20 rounded-xl" />
              ))
            ) : completedOrders.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-muted-foreground"
                data-ocid="merchant_pos.completed.empty_state"
              >
                <CheckCircle2 className="w-12 h-12 mb-4 opacity-30" />
                <p className="font-semibold text-base">
                  No completed orders yet
                </p>
              </div>
            ) : (
              completedOrders.map((order, idx) => (
                <CompletedOrderCard
                  key={String(order.id)}
                  order={order}
                  index={idx + 1}
                  formatTime={formatTime}
                  formatDate={formatDate}
                />
              ))
            )}
          </TabsContent>

          {/* Earnings tab */}
          <TabsContent value="earnings" className="mt-4 space-y-5">
            {/* Boosted order count */}
            <BoostedOrderCount displayOrders={displayOrdersTyped} />
            <EarningsDashboard
              revenueTrend={revenueTrend}
              topProducts={topProducts}
              loadingProducts={loadingProducts}
              analytics={analytics}
              earnings={earnings ?? undefined}
            />
          </TabsContent>

          {/* Ratings tab */}
          <TabsContent value="ratings" className="mt-4 space-y-4">
            <CustomerRatingsSection
              ratings={ratingHistory}
              loading={loadingRatings}
              pctGood={pctGood}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Boosted Order Count ──────────────────────────────────────────────────────

function BoostedOrderCount({
  displayOrders,
}: {
  displayOrders: DisplayTotalOrders | undefined;
}) {
  if (!displayOrders) return null;
  const isBoosted = displayOrders.displayed > displayOrders.actual;
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      data-ocid="merchant_pos.order_count_section"
    >
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          Actual Completed Orders
        </p>
        <p className="text-3xl font-bold text-foreground tabular-nums">
          {displayOrders.actual}
        </p>
      </div>
      {isBoosted ? (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <p className="text-xs text-primary uppercase tracking-wide font-semibold">
              Displayed to Customers
            </p>
            <Badge variant="secondary" className="text-xs">
              Boosted
            </Badge>
          </div>
          <p className="text-3xl font-bold text-primary tabular-nums">
            {displayOrders.displayed}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Boosted by admin to reflect promotional value
          </p>
        </div>
      ) : null}
    </div>
  );
}

// ─── Customer Ratings Section ─────────────────────────────────────────────────

function RatingIcon({ value }: { value: "good" | "neutral" | "bad" }) {
  if (value === "good")
    return <ThumbsUp className="w-4 h-4 text-success" aria-label="Good" />;
  if (value === "bad")
    return <ThumbsDown className="w-4 h-4 text-destructive" aria-label="Bad" />;
  return (
    <span className="w-4 h-4 inline-block text-warning font-bold text-center text-xs leading-4">
      —
    </span>
  );
}

function CustomerRatingsSection({
  ratings,
  loading,
  pctGood,
}: {
  ratings: CustomerRatingEntry[];
  loading: boolean;
  pctGood: number;
}) {
  return (
    <div className="space-y-4" data-ocid="merchant_pos.ratings.section">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            % Good Ratings
          </p>
          <p className="text-3xl font-bold text-success tabular-nums">
            {pctGood}%
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Total Rated Orders
          </p>
          <p className="text-3xl font-bold text-foreground tabular-nums">
            {ratings.length}
          </p>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-12 rounded-lg" />
          ))}
        </div>
      ) : ratings.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 text-muted-foreground border border-dashed border-border rounded-xl"
          data-ocid="merchant_pos.ratings.empty_state"
        >
          <Star className="w-10 h-10 mb-3 opacity-30" />
          <p className="font-semibold">No ratings yet</p>
          <p className="text-sm mt-1">
            Customer ratings appear after orders complete
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  "Customer",
                  "Phone",
                  "Rating",
                  "Orders with you",
                  "Last Order",
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
              {ratings.map((r, idx) => (
                <tr
                  key={r.customerId}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={`merchant_pos.rating.${idx + 1}`}
                >
                  <td className="px-4 py-3 font-medium truncate max-w-[120px]">
                    {r.customerName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs font-mono">
                    {r.customerPhone}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <RatingIcon value={r.ratingValue} />
                      <span
                        className={`text-xs font-medium capitalize ${
                          r.ratingValue === "good"
                            ? "text-success"
                            : r.ratingValue === "bad"
                              ? "text-destructive"
                              : "text-warning"
                        }`}
                      >
                        {r.ratingValue}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold">
                    {r.totalOrdersWithMerchant}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {r.lastOrderDate
                      ? new Date(r.lastOrderDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

interface PendingOrderCardProps {
  order: Order;
  index: number;
  isProcessing: boolean;
  onAccept: () => void;
  onReject: () => void;
  onQRPay: () => void;
  formatTime: (ts: bigint | number | undefined) => string;
}

function PendingOrderCard({
  order,
  index,
  isProcessing,
  onAccept,
  onReject,
  onQRPay,
  formatTime,
}: PendingOrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const items = order.items ?? [];
  const visibleItems = expanded ? items : items.slice(0, 3);
  const isONDC =
    (order as unknown as Record<string, unknown>).ondcSource === true;

  return (
    <div
      className="pos-order-card pos-order-card-pending"
      data-ocid={`merchant_pos.order.${index}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-sm text-foreground font-mono">
              #{String(order.id).slice(-8).toUpperCase()}
            </span>
            <Badge
              variant="outline"
              className="text-xs border-warning text-warning"
            >
              Pending
            </Badge>
            {isONDC && (
              <Badge className="text-xs bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-100">
                ONDC
              </Badge>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {formatTime(order.createdAt)}
            </span>
          </div>
          {order.customerId && (
            <p className="text-xs text-muted-foreground mb-2">
              Customer:{" "}
              <span className="font-medium text-foreground">
                {order.customerId}
              </span>
            </p>
          )}
          <div className="space-y-1 mb-2">
            {visibleItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-xs"
              >
                <span className="text-foreground">
                  {item.productName} × {Number(item.quantity)}
                </span>
                <span className="font-medium text-foreground">
                  ₹{Number(item.totalRate).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            {items.length > 3 && (
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded
                  ? "Show less"
                  : `+${items.length - 3} more item${items.length - 3 > 1 ? "s" : ""}`}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">
              Total: ₹{Number(order.totalAmount).toLocaleString("en-IN")}
            </span>
            {order.deliveryCharge && Number(order.deliveryCharge) > 0 && (
              <span className="text-xs text-muted-foreground">
                +₹{Number(order.deliveryCharge)} delivery
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Button
            size="sm"
            className="gap-1.5 bg-success hover:bg-success/90 text-success-foreground min-w-[80px]"
            onClick={onAccept}
            disabled={isProcessing}
            data-ocid={`merchant_pos.accept_button.${index}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 border-destructive text-destructive hover:bg-destructive/10 min-w-[80px]"
            onClick={onReject}
            disabled={isProcessing}
            data-ocid={`merchant_pos.reject_button.${index}`}
          >
            <X className="w-3.5 h-3.5" />
            Reject
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 min-w-[80px]"
            onClick={onQRPay}
            data-ocid={`merchant_pos.qr_button.${index}`}
          >
            <QrCode className="w-3.5 h-3.5" />
            QR Pay
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ActiveOrderCardProps {
  order: Order;
  index: number;
  qrState: OrderQRState | null;
  isGeneratingQR: boolean;
  onGenerateQR: () => void;
  onQRExpire: () => void;
  onQRRefresh: () => void;
  formatTime: (ts: bigint | number | undefined) => string;
}

function ActiveOrderCard({
  order,
  index,
  qrState,
  isGeneratingQR,
  onGenerateQR,
  onQRExpire,
  onQRRefresh,
  formatTime,
}: ActiveOrderCardProps) {
  const isONDC =
    (order as unknown as Record<string, unknown>).ondcSource === true;
  return (
    <div
      className="pos-order-card pos-order-card-confirmed"
      data-ocid={`merchant_pos.active_order.${index}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-sm text-foreground font-mono">
              #{String(order.id).slice(-8).toUpperCase()}
            </span>
            <Badge
              variant="outline"
              className="text-xs border-success text-success"
            >
              {String(order.status).charAt(0).toUpperCase() +
                String(order.status).slice(1)}
            </Badge>
            {isONDC && (
              <Badge className="text-xs bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-100">
                ONDC
              </Badge>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              Accepted {formatTime(order.acceptedAt)}
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
          {order.items?.length > 0 && (
            <p className="text-xs text-muted-foreground mb-2">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}{" "}
              &mdash;{" "}
              {order.items
                .slice(0, 2)
                .map((i) => i.productName)
                .join(", ")}
              {order.items.length > 2 && ` +${order.items.length - 2} more`}
            </p>
          )}
          <p className="text-sm font-bold text-foreground">
            ₹{Number(order.totalAmount).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex-shrink-0">
          {!qrState ? (
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={onGenerateQR}
              disabled={isGeneratingQR}
              data-ocid={`merchant_pos.active_qr_button.${index}`}
            >
              <QrCode className="w-3.5 h-3.5" />
              Generate QR
            </Button>
          ) : qrState.expired ? (
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-xs text-destructive font-semibold text-center">
                QR Expired
              </p>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-destructive text-destructive hover:bg-destructive/10"
                onClick={onQRRefresh}
                data-ocid={`merchant_pos.qr_refresh_button.${index}`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate
              </Button>
            </div>
          ) : (
            <QRTimerDisplay
              qrData={qrState.qr.qrData}
              amount={qrState.qr.amount}
              expiresAt={qrState.qr.expiresAt}
              onExpire={onQRExpire}
              onRefresh={onQRRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface CompletedOrderCardProps {
  order: Order;
  index: number;
  formatTime: (ts: bigint | number | undefined) => string;
  formatDate: (ts: bigint | number | undefined) => string;
}

function CompletedOrderCard({
  order,
  index,
  formatTime,
  formatDate,
}: CompletedOrderCardProps) {
  const isONDC =
    (order as unknown as Record<string, unknown>).ondcSource === true;
  return (
    <div
      className="pos-order-card border-l-4 border-l-muted-foreground"
      data-ocid={`merchant_pos.completed_order.${index}`}
    >
      <div className="flex items-center gap-4">
        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm font-mono">
              #{String(order.id).slice(-8).toUpperCase()}
            </span>
            {isONDC && (
              <Badge className="text-xs bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-100">
                ONDC
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {formatDate(order.completedAt ?? order.createdAt)}{" "}
              {formatTime(order.completedAt ?? order.createdAt)}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground mt-0.5">
            ₹{Number(order.totalAmount).toLocaleString("en-IN")}
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          Completed
        </Badge>
      </div>
    </div>
  );
}

// ─── Earnings Dashboard ────────────────────────────────────────────────────────

interface EarningsDashboardProps {
  revenueTrend: { day: string; revenue: number }[];
  topProducts: ProductRevenue[];
  loadingProducts: boolean;
  analytics: MerchantAnalytics | null | undefined;
  earnings:
    | {
        totalRevenue: number;
        orderCount: bigint;
        avgOrderValue: number;
        pendingPayouts: number;
      }
    | undefined;
}

function EarningsDashboard({
  revenueTrend,
  topProducts,
  loadingProducts,
  analytics,
  earnings,
}: EarningsDashboardProps) {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            Revenue Trend — Last 7 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={revenueTrend}
              margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  `₹${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`
                }
              />
              <Tooltip
                formatter={(value: number) => [
                  `₹${value.toLocaleString("en-IN")}`,
                  "Revenue",
                ]}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--success)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "var(--success)", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Top 5 Products by Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingProducts ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((k) => (
                <Skeleton key={k} className="h-8 rounded" />
              ))}
            </div>
          ) : topProducts.length === 0 ? (
            <p
              className="text-sm text-muted-foreground text-center py-8"
              data-ocid="merchant_pos.products.empty_state"
            >
              No product data yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={topProducts.slice(0, 5).map((p) => ({
                  name:
                    p.productName.length > 14
                      ? `${p.productName.slice(0, 14)}…`
                      : p.productName,
                  orders: Number(p.orderCount),
                  revenue: p.totalRevenue,
                }))}
                margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "revenue"
                      ? `₹${value.toLocaleString("en-IN")}`
                      : value,
                    name === "revenue" ? "Revenue" : "Orders",
                  ]}
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {topProducts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-warning" />
              Most Profitable Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.slice(0, 5).map((p, idx) => (
                <div
                  key={p.productId}
                  className="flex items-center gap-3"
                  data-ocid={`merchant_pos.product.${idx + 1}`}
                >
                  <span className="text-xs text-muted-foreground w-4 font-mono">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {p.productName}
                    </p>
                    <div className="mt-1 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-success h-1.5 rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, (p.totalRevenue / (topProducts[0]?.totalRevenue ?? 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-success">
                      ₹{p.totalRevenue.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Number(p.orderCount)} orders
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                Avg Order Value
              </p>
              <p className="text-xl font-bold text-foreground">
                ₹
                {Math.round(earnings?.avgOrderValue ?? 0).toLocaleString(
                  "en-IN",
                )}
              </p>
            </CardContent>
          </Card>
          {typeof analytics.customerRetentionRate === "number" && (
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                  Customer Retention
                </p>
                <p className="text-xl font-bold text-primary">
                  {Math.round(analytics.customerRetentionRate)}%
                </p>
              </CardContent>
            </Card>
          )}
          {analytics.runningProducts && (
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                  Running Products
                </p>
                <p className="text-xl font-bold text-foreground">
                  {analytics.runningProducts.length}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {(earnings?.pendingPayouts ?? 0) > 0 && (
        <div className="rounded-lg border border-warning bg-warning/10 p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-warning flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Pending Payouts:{" "}
              <span className="text-warning">
                ₹{(earnings?.pendingPayouts ?? 0).toLocaleString("en-IN")}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Payments awaiting settlement
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
