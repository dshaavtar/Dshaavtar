import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart2,
  CheckCircle2,
  Clock,
  DollarSign,
  Fuel,
  Info,
  LogOut,
  Package,
  QrCode,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import BuzzNotification from "../components/BuzzNotification";
import DPOrderCard from "../components/DPOrderCard";
import {
  useAddDPPetrolExpense,
  useDPActiveDeliveries,
  useDPAnalytics,
  useDPEarnings,
  useDPEarningsWithExpenses,
  useDPPetrolExpenses,
  useGenerateDeliveryPaymentQR,
  useGeneratePOSOTP,
  useMarkDeliveryPaymentCollected,
  useVerifyPOSOTP,
} from "../hooks/useBackend";
import type { DeliveryPaymentQR } from "../types";

const SESSION_KEY = "wc_dp_session";

interface DPSession {
  phone: string;
  dpId: string;
  name: string;
}

function getDPSession(): DPSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as DPSession;
  } catch {
    // ignore
  }
  return null;
}

function saveDPSession(session: DPSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearDPSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ─── OTP Login Screen ─────────────────────────────────────────────────────────

function DeliveryOTPLogin({
  onSuccess,
}: {
  onSuccess: (session: DPSession) => void;
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
      const result = await generateOTP.mutateAsync({
        phone,
        role: "deliveryPartner",
      });
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
        role: "deliveryPartner",
      });
      if (result.success) {
        const session: DPSession = {
          phone,
          dpId: result.dpId ?? result.userId ?? `dp_${phone}`,
          name: result.name ?? phone,
        };
        saveDPSession(session);
        localStorage.setItem("wc_dp_id", session.dpId);
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-2xl px-5 py-3 mb-4">
            <ShoppingCart className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-primary font-display">
              LocalBazar Kart
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Delivery POS
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
                  <Label htmlFor="dp-phone">WhatsApp Number</Label>
                  <Input
                    id="dp-phone"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                    data-ocid="delivery_pos.login.phone_input"
                  />
                </div>
                {error && (
                  <p
                    className="text-sm text-destructive"
                    data-ocid="delivery_pos.login.error_state"
                  >
                    {error}
                  </p>
                )}
                <Button
                  className="w-full"
                  onClick={handleSendOTP}
                  disabled={generateOTP.isPending}
                  data-ocid="delivery_pos.login.send_otp_button"
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

                {devOtp && (
                  <div
                    className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3"
                    data-ocid="delivery_pos.login.dev_otp_info"
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
                  <Label htmlFor="dp-otp">Enter OTP</Label>
                  <Input
                    id="dp-otp"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    maxLength={6}
                    data-ocid="delivery_pos.login.otp_input"
                  />
                </div>
                {error && (
                  <p
                    className="text-sm text-destructive"
                    data-ocid="delivery_pos.login.error_state"
                  >
                    {error}
                  </p>
                )}
                <Button
                  className="w-full"
                  onClick={handleVerify}
                  disabled={verifyOTP.isPending}
                  data-ocid="delivery_pos.login.verify_otp_button"
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
                      data-ocid="delivery_pos.login.resend_button"
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
                  data-ocid="delivery_pos.login.back_button"
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

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const STAT_SKELS = ["a", "b", "c", "d"];
const DELIV_SKELS = ["a", "b", "c"];

export default function DeliveryPOSPage() {
  const [session, setSession] = useState<DPSession | null>(getDPSession);

  if (!session) {
    return <DeliveryOTPLogin onSuccess={setSession} />;
  }

  return (
    <DeliveryDashboard
      session={session}
      onLogout={() => {
        clearDPSession();
        setSession(null);
      }}
    />
  );
}

function DeliveryDashboard({
  session,
  onLogout,
}: {
  session: DPSession;
  onLogout: () => void;
}) {
  const DP_ID = session.dpId;
  const MOCK_UPI_ID = localStorage.getItem("wc_upi_id") ?? "";

  const [activeTab, setActiveTab] = useState("deliveries");
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(
    new Set(),
  );
  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    liters: "",
    notes: "",
  });

  // 30-day date range for petrol expenses
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);
  const fromDateStr = fromDate.toISOString().split("T")[0];

  const { data: activeDeliveries = [], isLoading: loadingDeliveries } =
    useDPActiveDeliveries(DP_ID);
  const { data: earningsData, isLoading: loadingEarnings } =
    useDPEarningsWithExpenses(DP_ID, fromDateStr);
  const { data: dpEarnings } = useDPEarnings(DP_ID);
  const { data: analytics } = useDPAnalytics(DP_ID);
  const { data: allExpenses = [] } = useDPPetrolExpenses(DP_ID, fromDateStr);

  const generateQR = useGenerateDeliveryPaymentQR();
  const markCollected = useMarkDeliveryPaymentCollected();
  const addExpense = useAddDPPetrolExpense();

  const deliveriesArr = Array.isArray(activeDeliveries) ? activeDeliveries : [];
  const assignedUnacked = deliveriesArr.filter((d) => {
    const rec = d as Record<string, unknown>;
    return rec.status === "assigned" && !acknowledgedIds.has(String(rec.id));
  });
  const hasNewOrder = assignedUnacked.length > 0;

  function acknowledge() {
    const ids = new Set<string>(
      (deliveriesArr as Array<Record<string, unknown>>).map((d) =>
        String(d.id),
      ),
    );
    setAcknowledgedIds(ids);
  }

  async function generateDeliveryQR(
    orderId: string,
    amount: number,
  ): Promise<DeliveryPaymentQR> {
    const qr = await generateQR.mutateAsync({
      orderId,
      amount,
      partnerId: DP_ID,
    });
    return qr as unknown as DeliveryPaymentQR;
  }

  async function handleMarkCollected(orderId: string) {
    await markCollected.mutateAsync({ orderId, partnerId: DP_ID });
    toast.success("Payment collected & delivery marked complete");
  }

  async function handleAddExpense() {
    if (!expenseForm.amount) return;
    await addExpense.mutateAsync({
      partnerId: DP_ID,
      date: expenseForm.date,
      amount: Number(expenseForm.amount),
      liters: Number(expenseForm.liters) || 0,
      notes: expenseForm.notes,
    });
    setExpenseForm({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      liters: "",
      notes: "",
    });
    toast.success("Petrol expense logged");
  }

  // Derived stats
  const completedToday = Number(dpEarnings?.completedCount ?? 0);
  const earnedToday = earningsData?.totalEarned ?? 0;
  const totalExpenses = earningsData?.totalExpenses ?? 0;
  const netProfit = earningsData?.netProfit ?? 0;
  const expenseEntries = earningsData?.expenseEntries ?? allExpenses;

  // Today's expenses
  const todayStr = new Date().toISOString().split("T")[0];
  const todayExpenses = expenseEntries
    .filter((e) => e.date === todayStr)
    .reduce((sum, e) => sum + e.amount, 0);

  const revenueTrend = (analytics?.revenueTrend ?? []).map((e) => ({
    period: e.period,
    revenue: Number(e.revenue),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-primary" />
          <div>
            <p className="font-bold text-foreground font-display leading-tight">
              LocalBazar Kart 🛒
            </p>
            <p className="text-xs text-muted-foreground">
              Delivery POS · {session.name}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="gap-1.5 text-muted-foreground hover:text-destructive"
          data-ocid="delivery_pos.logout_button"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </header>

      <div className="p-4 space-y-5 pb-8" data-ocid="delivery_pos.page">
        <BuzzNotification
          hasNewOrder={hasNewOrder}
          onAcknowledge={acknowledge}
        />

        {/* Title row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-display flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Delivery POS
            </h1>
            <p className="text-sm text-muted-foreground">
              Orders · Payments · Earnings · Expenses
            </p>
          </div>
          <Badge
            variant={deliveriesArr.length > 0 ? "default" : "secondary"}
            className="text-sm px-3 py-1"
            data-ocid="delivery_pos.active_badge"
          >
            {deliveriesArr.length} Active
          </Badge>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {loadingEarnings ? (
            STAT_SKELS.map((k) => (
              <Skeleton key={k} className="h-[76px] rounded-lg" />
            ))
          ) : (
            <>
              <div
                className="earnings-card"
                data-ocid="delivery_pos.stat.active"
              >
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <Package className="w-3 h-3" /> Active Deliveries
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {deliveriesArr.length}
                </p>
              </div>
              <div
                className="earnings-card"
                data-ocid="delivery_pos.stat.completed"
              >
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed Today
                </p>
                <p className="text-2xl font-bold tabular-nums text-success">
                  {completedToday}
                </p>
              </div>
              <div
                className="earnings-card"
                data-ocid="delivery_pos.stat.earned"
              >
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3" /> Earned
                </p>
                <p className="text-2xl font-bold tabular-nums text-success">
                  ₹{earnedToday.toLocaleString("en-IN")}
                </p>
              </div>
              <div
                className={`earnings-card ${netProfit < 0 ? "border-destructive/30" : ""}`}
                data-ocid="delivery_pos.stat.profit"
              >
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  {netProfit >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}{" "}
                  Net Profit
                </p>
                <p
                  className={`text-2xl font-bold tabular-nums ${netProfit >= 0 ? "text-success" : "text-destructive"}`}
                >
                  ₹{netProfit.toLocaleString("en-IN")}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full" data-ocid="delivery_pos.tabs">
            <TabsTrigger
              value="deliveries"
              className="flex-1"
              data-ocid="delivery_pos.tab.deliveries"
            >
              <Package className="w-4 h-4 mr-1.5" />
              Deliveries
              {deliveriesArr.length > 0 && (
                <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {deliveriesArr.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="flex-1"
              data-ocid="delivery_pos.tab.expenses"
            >
              <Fuel className="w-4 h-4 mr-1.5" />
              Expenses
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex-1"
              data-ocid="delivery_pos.tab.analytics"
            >
              <BarChart2 className="w-4 h-4 mr-1.5" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Deliveries tab */}
          <TabsContent value="deliveries" className="mt-4 space-y-3">
            {loadingDeliveries ? (
              DELIV_SKELS.map((k) => (
                <Skeleton key={k} className="h-36 rounded-lg" />
              ))
            ) : deliveriesArr.length === 0 ? (
              <div
                className="text-center py-14 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border"
                data-ocid="delivery_pos.deliveries.empty_state"
              >
                <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No active deliveries</p>
                <p className="text-sm mt-1">
                  New orders will appear here instantly
                </p>
              </div>
            ) : (
              (deliveriesArr as Array<Record<string, unknown>>).map(
                (order, idx) => (
                  <DPOrderCard
                    key={String(order.id)}
                    order={
                      order as unknown as Parameters<
                        typeof DPOrderCard
                      >[0]["order"]
                    }
                    index={idx + 1}
                    generateQR={generateDeliveryQR}
                    onMarkCollected={handleMarkCollected}
                    isMarkingCollected={markCollected.isPending}
                  />
                ),
              )
            )}

            {/* UPI QR */}
            <Card className="border-primary/30 bg-card mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                  <QrCode className="w-4 h-4 text-primary" />
                  My UPI — Receive Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-6 py-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                    `upi://pay?pa=${MOCK_UPI_ID}&pn=Delivery+Partner&cu=INR`,
                  )}`}
                  alt="My UPI QR"
                  className="rounded-lg border border-border"
                  width={140}
                  height={140}
                  loading="lazy"
                />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">UPI ID</p>
                  <p className="font-mono font-semibold text-foreground text-base">
                    {MOCK_UPI_ID}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Show this to customers for direct payment.
                    <br />
                    Valid for all UPI apps (PhonePe, GPay, Paytm).
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenses tab */}
          <TabsContent value="expenses" className="mt-4 space-y-4">
            {/* Summary cards — today + monthly */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              data-ocid="delivery_pos.expense_summary.section"
            >
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Fuel className="w-3 h-3" /> Today's Petrol
                </p>
                <p className="text-2xl font-bold text-warning tabular-nums">
                  ₹{todayExpenses.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Fuel className="w-3 h-3" /> Monthly Total
                </p>
                <p className="text-2xl font-bold text-warning tabular-nums">
                  ₹{totalExpenses.toLocaleString("en-IN")}
                </p>
              </div>
              <div
                className={`bg-card border rounded-xl p-4 ${netProfit < 0 ? "border-destructive/30" : "border-border"}`}
              >
                <p className="text-xs text-muted-foreground mb-1">
                  Net Earnings
                </p>
                <p
                  className={`text-2xl font-bold tabular-nums ${netProfit >= 0 ? "text-success" : "text-destructive"}`}
                >
                  ₹{netProfit.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Gross − Expenses
                </p>
              </div>
            </div>

            {/* Log Expense form */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-warning" />
                  Log Petrol Expense
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="exp-date" className="text-xs">
                      Date
                    </Label>
                    <Input
                      id="exp-date"
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) =>
                        setExpenseForm((p) => ({ ...p, date: e.target.value }))
                      }
                      data-ocid="delivery_pos.expense_date.input"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="exp-amount" className="text-xs">
                      Amount (₹)
                    </Label>
                    <Input
                      id="exp-amount"
                      type="number"
                      placeholder="e.g. 500"
                      value={expenseForm.amount}
                      onChange={(e) =>
                        setExpenseForm((p) => ({
                          ...p,
                          amount: e.target.value,
                        }))
                      }
                      data-ocid="delivery_pos.expense_amount.input"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="exp-liters" className="text-xs">
                      Liters (optional)
                    </Label>
                    <Input
                      id="exp-liters"
                      type="number"
                      placeholder="e.g. 5"
                      value={expenseForm.liters}
                      onChange={(e) =>
                        setExpenseForm((p) => ({
                          ...p,
                          liters: e.target.value,
                        }))
                      }
                      data-ocid="delivery_pos.expense_liters.input"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="exp-notes" className="text-xs">
                      Notes
                    </Label>
                    <Input
                      id="exp-notes"
                      placeholder="e.g. HP Petrol, NH-8"
                      value={expenseForm.notes}
                      onChange={(e) =>
                        setExpenseForm((p) => ({
                          ...p,
                          notes: e.target.value,
                        }))
                      }
                      data-ocid="delivery_pos.expense_notes.input"
                    />
                  </div>
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={handleAddExpense}
                  disabled={!expenseForm.amount || addExpense.isPending}
                  data-ocid="delivery_pos.add_expense.submit_button"
                >
                  <DollarSign className="w-4 h-4" />
                  {addExpense.isPending ? "Logging..." : "Log Expense"}
                </Button>
              </CardContent>
            </Card>

            {/* Expense history (last 30 days) */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                History — Last 30 Days
              </p>
              {expenseEntries.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-xl"
                  data-ocid="delivery_pos.expenses.empty_state"
                >
                  <Fuel className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">No expenses logged yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {expenseEntries.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                      data-ocid={`delivery_pos.expense.${idx + 1}`}
                    >
                      <div>
                        <p className="text-sm font-medium">{exp.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {exp.notes || "Petrol expense"}
                          {exp.liters > 0 && ` · ${exp.liters}L`}
                        </p>
                      </div>
                      <p className="font-semibold text-warning">
                        ₹{exp.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Analytics tab */}
          <TabsContent value="analytics" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">
                      Completion Rate
                    </p>
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-2xl font-bold text-success tabular-nums">
                    {analytics
                      ? `${(analytics.completionRate * 100).toFixed(0)}%`
                      : "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Orders completed on time
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">
                      Avg Delivery
                    </p>
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold tabular-nums">
                    {analytics
                      ? `${Math.round(analytics.avgDeliveryMinutes)}m`
                      : "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Average delivery time
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Revenue Trend — Last 7 Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                {revenueTrend.length === 0 ? (
                  <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                    No data yet — start completing deliveries to see trends
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart
                      data={revenueTrend}
                      margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="period"
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `₹${v}`}
                        width={46}
                      />
                      <Tooltip
                        formatter={(value: number) => [
                          `₹${value.toLocaleString("en-IN")}`,
                          "Revenue",
                        ]}
                        contentStyle={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius)",
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "var(--primary)" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {analytics?.avgRating !== undefined && (
              <Card>
                <CardContent className="pt-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {analytics.avgRating.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Average Rating</p>
                    <p className="text-xs text-muted-foreground">
                      Based on customer feedback
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
