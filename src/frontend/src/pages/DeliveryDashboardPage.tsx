import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  HandCoins,
  IndianRupee,
  Info,
  Lock,
  LogOut,
  MapPin,
  Navigation,
  Package,
  Phone,
  QrCode,
  RefreshCw,
  Star,
  Timer,
  TrendingUp,
  Truck,
  Unlock,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
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
import CommunitySection from "../components/CommunitySection";
import DPOrderCard from "../components/DPOrderCard";
import DashboardLinkBanner from "../components/DashboardLinkBanner";
import LendingSection from "../components/LendingSection";
import {
  useAddDPPetrolExpense,
  useDPActiveDeliveries,
  useDPAnalytics,
  useDPEarnings,
  useDPEarningsWithExpenses,
  useDPPetrolExpenses,
  useDeliveryOrders,
  useDeliveryShift,
  useGenerateDeliveryPaymentQR,
  useGeneratePOSOTP,
  useGetPartnerTips,
  useGetTotalTipsEarned,
  useMarkDeliveryPaymentCollected,
  useOrdersByDeliveryPartner,
  useTestOrders,
  useVerifyPOSOTP,
} from "../hooks/useBackend";
import type { DeliveryPaymentQR } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DPSession {
  phone: string;
  dpId: string;
  name: string;
}

const SESSION_KEY = "wc_dp_session";

function getDPSession(): DPSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as DPSession;
  } catch {
    /* ignore */
  }
  return null;
}

function saveDPSession(session: DPSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearDPSession() {
  localStorage.removeItem(SESSION_KEY);
}

const TOOLTIP_STYLE = {
  background: "var(--color-card, #1e293b)",
  border: "1px solid var(--color-border, #334155)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--color-card-foreground, #f1f5f9)",
};

// ─── OTP Login ────────────────────────────────────────────────────────────────

function DeliveryOTPLogin({
  onSuccess,
}: { onSuccess: (session: DPSession) => void }) {
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
    <div
      className="bg-card border border-cyan-200 dark:border-cyan-800/50 rounded-2xl p-6"
      data-ocid="delivery.pos-login-panel"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
          <Truck className="w-5 h-5 text-cyan-600" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground">
            Delivery Partner POS Login
          </h3>
          <p className="text-xs text-muted-foreground">
            Sign in with your WhatsApp number to access POS
          </p>
        </div>
      </div>
      {step === "phone" ? (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="dp-pos-phone">WhatsApp Number</Label>
            <Input
              id="dp-pos-phone"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
              data-ocid="delivery.pos.phone_input"
            />
          </div>
          {error && (
            <p
              className="text-sm text-destructive"
              data-ocid="delivery.pos.error_state"
            >
              {error}
            </p>
          )}
          <Button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
            onClick={handleSendOTP}
            disabled={generateOTP.isPending}
            data-ocid="delivery.pos.send_otp_button"
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
              data-ocid="delivery.pos.dev_otp_info"
            >
              <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-primary">
                Dev Mode — OTP:{" "}
                <span className="font-mono font-bold">{devOtp}</span>
              </p>
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="dp-pos-otp">Enter OTP</Label>
            <Input
              id="dp-pos-otp"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              maxLength={6}
              data-ocid="delivery.pos.otp_input"
            />
          </div>
          {error && (
            <p
              className="text-sm text-destructive"
              data-ocid="delivery.pos.error_state"
            >
              {error}
            </p>
          )}
          <Button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
            onClick={handleVerify}
            disabled={verifyOTP.isPending}
            data-ocid="delivery.pos.verify_otp_button"
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
                data-ocid="delivery.pos.resend_button"
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
              data-ocid="delivery.pos.back_button"
            >
              ← Change number
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── POS Panel ────────────────────────────────────────────────────────────────

function DeliveryPOSPanel({
  session,
  onLogout,
}: { session: DPSession; onLogout: () => void }) {
  const DP_ID = session.dpId;
  const [activeTab, setActiveTab] = useState("deliveries");
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(
    new Set(),
  );
  const [seenTipIds, setSeenTipIds] = useState<Set<string>>(new Set());
  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    liters: "",
    notes: "",
  });

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
  const { data: posTips = [], refetch: refetchPosTips } =
    useGetPartnerTips(DP_ID);
  const { data: posTotalTips = 0, refetch: refetchPosTotalTips } =
    useGetTotalTipsEarned(DP_ID);
  const posTipIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    posTipIntervalRef.current = setInterval(() => {
      refetchPosTips();
      refetchPosTotalTips();
    }, 30_000);
    return () => {
      if (posTipIntervalRef.current) clearInterval(posTipIntervalRef.current);
    };
  }, [refetchPosTips, refetchPosTotalTips]);
  const newPosTipCount = posTips.filter((t) => !seenTipIds.has(t.id)).length;
  const posTodayTips = posTips.filter((t) => {
    const d = new Date(t.createdAt > 1e12 ? t.createdAt / 1e6 : t.createdAt);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });
  const generateQR = useGenerateDeliveryPaymentQR();
  const markCollected = useMarkDeliveryPaymentCollected();
  const addExpense = useAddDPPetrolExpense();

  const deliveriesArr = Array.isArray(activeDeliveries) ? activeDeliveries : [];
  const hasNewOrder =
    deliveriesArr.filter((d) => {
      const rec = d as Record<string, unknown>;
      return rec.status === "assigned" && !acknowledgedIds.has(String(rec.id));
    }).length > 0;

  const completedToday = Number(dpEarnings?.completedCount ?? 0);
  const earnedToday = earningsData?.totalEarned ?? 0;
  const netProfit = earningsData?.netProfit ?? 0;
  const expenseEntries = earningsData?.expenseEntries ?? allExpenses;

  const revenueTrend = (analytics?.revenueTrend ?? []).map((e) => ({
    period: e.period,
    revenue: Number(e.revenue),
  }));

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
    if (!expenseForm.amount) {
      toast.error("Enter amount");
      return;
    }
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

  return (
    <div className="space-y-4" data-ocid="delivery.pos.panel">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">POS — {session.name}</p>
          <p className="text-xs text-muted-foreground">{session.phone}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="gap-1.5 text-muted-foreground hover:text-destructive"
          data-ocid="delivery.pos.logout_button"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>

      <BuzzNotification
        hasNewOrder={hasNewOrder}
        onAcknowledge={() =>
          setAcknowledgedIds(
            new Set(
              (deliveriesArr as Array<Record<string, unknown>>).map((d) =>
                String(d.id),
              ),
            ),
          )
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {loadingEarnings ? (
          ["a", "b", "c", "d"].map((k) => (
            <Skeleton key={k} className="h-20 rounded-xl" />
          ))
        ) : (
          <>
            <div className="earnings-card" data-ocid="delivery.pos.earned_card">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-success" />
                <span className="text-xs text-muted-foreground">
                  Earned Today
                </span>
              </div>
              <p className="text-xl font-bold text-success">
                ₹{earnedToday.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="earnings-card" data-ocid="delivery.pos.net_card">
              <div className="flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Net Profit
                </span>
              </div>
              <p className="text-xl font-bold text-foreground">
                ₹{netProfit.toLocaleString("en-IN")}
              </p>
            </div>
            <div
              className="earnings-card"
              data-ocid="delivery.pos.completed_card"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {completedToday}
              </p>
            </div>
            <div className="earnings-card" data-ocid="delivery.pos.active_card">
              <div className="flex items-center gap-1.5 mb-1">
                <Package className="w-3.5 h-3.5 text-warning" />
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              <p className="text-xl font-bold text-warning">
                {deliveriesArr.length}
              </p>
            </div>
          </>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto" data-ocid="delivery.pos.tabs">
          <TabsTrigger
            value="deliveries"
            data-ocid="delivery.pos.tab.deliveries"
          >
            <Truck className="w-3.5 h-3.5 mr-1" />
            Active Jobs
          </TabsTrigger>
          <TabsTrigger value="earnings" data-ocid="delivery.pos.tab.earnings">
            <BarChart2 className="w-3.5 h-3.5 mr-1" />
            Earnings
          </TabsTrigger>
          <TabsTrigger value="expenses" data-ocid="delivery.pos.tab.expenses">
            <DollarSign className="w-3.5 h-3.5 mr-1" />
            Expenses
          </TabsTrigger>
          <TabsTrigger
            value="tips"
            data-ocid="delivery.pos.tab.tips"
            onClick={() => setSeenTipIds(new Set(posTips.map((t) => t.id)))}
            className="relative"
          >
            <IndianRupee className="w-3.5 h-3.5 mr-1" />
            Tips
            {newPosTipCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                {newPosTipCount > 9 ? "9+" : newPosTipCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="tips"
          className="mt-3 space-y-4"
          data-ocid="delivery.pos.tips.section"
        >
          <div className="grid grid-cols-2 gap-3">
            <div
              className="earnings-card"
              data-ocid="delivery.pos.tips.total_card"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-success" />
                <span className="text-xs text-muted-foreground">
                  Total Tips
                </span>
              </div>
              <p className="text-xl font-bold text-success">
                ₹{Number(posTotalTips).toLocaleString("en-IN")}
              </p>
            </div>
            <div
              className="earnings-card"
              data-ocid="delivery.pos.tips.today_card"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 text-warning" />
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {posTodayTips.length} tips
              </p>
            </div>
          </div>
          {posTips.length === 0 ? (
            <div
              className="py-10 text-center text-muted-foreground"
              data-ocid="delivery.pos.tips.empty_state"
            >
              <IndianRupee className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No tips received yet</p>
              <p className="text-xs mt-1">
                Tips from customers will appear here
              </p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/20">
                <h4 className="font-semibold text-sm text-foreground">
                  Tip History
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/10">
                      <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">
                        Date
                      </th>
                      <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">
                        Customer
                      </th>
                      <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">
                        Order ID
                      </th>
                      <th className="text-right px-4 py-2 text-xs text-muted-foreground font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {posTips.map((tip, idx) => {
                      const ts =
                        tip.createdAt > 1e12
                          ? tip.createdAt / 1e6
                          : tip.createdAt;
                      const dateStr = new Date(ts).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });
                      const isNew = !seenTipIds.has(tip.id);
                      return (
                        <tr
                          key={tip.id}
                          className={`hover:bg-muted/20 transition-colors ${isNew ? "bg-success/5" : ""}`}
                          data-ocid={`delivery.pos.tip.item.${idx + 1}`}
                        >
                          <td className="px-4 py-2.5 text-xs text-muted-foreground">
                            {dateStr}
                          </td>
                          <td className="px-4 py-2.5 text-xs text-foreground">
                            {tip.customerName}
                            {isNew && (
                              <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-destructive" />
                            )}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                            {tip.orderId.slice(0, 10)}…
                          </td>
                          <td className="px-4 py-2.5 text-right font-bold text-success">
                            ₹{Number(tip.amount).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="deliveries" className="mt-3 space-y-3">
          {loadingDeliveries ? (
            ["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-28 rounded-xl" />
            ))
          ) : deliveriesArr.length === 0 ? (
            <div
              className="py-12 text-center text-muted-foreground"
              data-ocid="delivery.pos.deliveries.empty_state"
            >
              <Truck className="w-10 h-10 mb-3 mx-auto opacity-30" />
              <p>No active deliveries</p>
            </div>
          ) : (
            deliveriesArr.map((delivery, idx) => (
              <DPOrderCard
                key={String((delivery as Record<string, unknown>).id ?? idx)}
                order={delivery as Parameters<typeof DPOrderCard>[0]["order"]}
                index={idx + 1}
                generateQR={generateDeliveryQR}
                onMarkCollected={handleMarkCollected}
                isMarkingCollected={generateQR.isPending}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="earnings" className="mt-3 space-y-4">
          {revenueTrend.length > 0 && (
            <div className="bg-muted/30 border border-border rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                Revenue Trend
              </h4>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart
                  data={revenueTrend}
                  margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 9 }}
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
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#22d3ee", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="bg-muted/30 border border-border rounded-xl p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  Earned (30 days)
                </p>
                <p className="text-xl font-bold text-success">
                  ₹{earnedToday.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Net Profit</p>
                <p className="text-xl font-bold text-foreground">
                  ₹{netProfit.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="mt-3 space-y-4">
          <div className="bg-muted/30 border border-border rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-4">
              Log Petrol Expense
            </h4>
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
                  data-ocid="delivery.pos.expense.date_input"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="exp-amount" className="text-xs">
                  Amount (₹)
                </Label>
                <Input
                  id="exp-amount"
                  type="number"
                  placeholder="Amount"
                  value={expenseForm.amount}
                  onChange={(e) =>
                    setExpenseForm((p) => ({ ...p, amount: e.target.value }))
                  }
                  data-ocid="delivery.pos.expense.amount_input"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="exp-liters" className="text-xs">
                  Liters
                </Label>
                <Input
                  id="exp-liters"
                  type="number"
                  placeholder="Liters"
                  value={expenseForm.liters}
                  onChange={(e) =>
                    setExpenseForm((p) => ({ ...p, liters: e.target.value }))
                  }
                  data-ocid="delivery.pos.expense.liters_input"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="exp-notes" className="text-xs">
                  Notes
                </Label>
                <Input
                  id="exp-notes"
                  placeholder="Optional"
                  value={expenseForm.notes}
                  onChange={(e) =>
                    setExpenseForm((p) => ({ ...p, notes: e.target.value }))
                  }
                  data-ocid="delivery.pos.expense.notes_input"
                />
              </div>
            </div>
            <Button
              className="mt-3 w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              onClick={handleAddExpense}
              disabled={addExpense.isPending}
              data-ocid="delivery.pos.expense.submit_button"
            >
              {addExpense.isPending ? "Logging…" : "Log Expense"}
            </Button>
          </div>
          {expenseEntries.length > 0 && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/20">
                <h4 className="font-semibold text-sm text-foreground">
                  Recent Expenses
                </h4>
              </div>
              <div className="divide-y divide-border">
                {expenseEntries.slice(0, 10).map((e, i) => (
                  <div
                    key={`${e.date}-${i}`}
                    className="flex items-center gap-3 px-4 py-2.5"
                    data-ocid={`delivery.pos.expense.item.${i + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{e.date}</p>
                      {e.notes && (
                        <p className="text-xs text-muted-foreground truncate">
                          {e.notes}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-bold text-destructive">
                      -₹{e.amount}
                    </span>
                    {e.liters > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {e.liters}L
                      </span>
                    )}
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
      className="rounded-2xl border border-cyan-200 dark:border-cyan-800/50 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/20 p-6"
      data-ocid="delivery.subscription-lock-gate"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center flex-shrink-0">
          <Lock className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-lg">
            Subscription Required
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Activate your Passdigit subscription to access your delivery
            dashboard.
          </p>
        </div>
        <Badge className="ml-auto bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700">
          Locked
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Unlock className="w-4 h-4 text-cyan-500" /> Enter Passdigit
          </p>
          <Input
            type="password"
            maxLength={6}
            placeholder="Enter 4–6 digit Passdigit"
            value={passdigit}
            onChange={(e) => setPassdigit(e.target.value)}
            className="mb-3 font-mono tracking-widest"
            data-ocid="delivery.passdigit.input"
          />
          <Button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
            onClick={handleUnlock}
            data-ocid="delivery.passdigit.submit_button"
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
            className="w-32 h-32 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-border hover:border-cyan-400 transition-colors"
            onClick={startTimer}
            title="Click to generate QR"
            data-ocid="delivery.subscription-qr"
          >
            {timerStarted ? (
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-cyan-500">
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
            UPI: delivery@localbazar
          </p>
          <p className="text-xs text-center font-semibold text-foreground mt-1">
            ₹299/month — Delivery Plan
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Delivery Stat Card ───────────────────────────────────────────────────────

function DeliveryStatCard({
  title,
  value,
  icon: Icon,
  sublabel,
  highlight,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  sublabel?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-card border-l-4 ${highlight ? "border-l-cyan-400" : "border-l-teal-400"} border border-border rounded-xl p-4 shadow-card`}
    >
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
        <div className="w-9 h-9 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
        </div>
      </div>
    </div>
  );
}

// ─── Shift Status Card ────────────────────────────────────────────────────────

function formatElapsed(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatTs(ms: number | null): string {
  if (!ms) return "—";
  return new Date(ms).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(startMs: number, endMs: number): string {
  const mins = Math.floor((endMs - startMs) / 60_000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

interface ShiftCardProps {
  dpId: string | undefined;
}

function ShiftStatusCard({ dpId }: ShiftCardProps) {
  const shift = useDeliveryShift(dpId);
  const [elapsed, setElapsed] = useState(shift.elapsedMinutes);
  const [showConfirm, setShowConfirm] = useState(false);
  const [completedShift, setCompletedShift] = useState<{
    startMs: number;
    endMs: number;
    orders: number;
    earnings: number;
  } | null>(null);

  useEffect(() => {
    if (!shift.isActive) return;
    const interval = setInterval(() => {
      setElapsed(
        Math.floor((Date.now() - (shift.checkInTime ?? Date.now())) / 60_000),
      );
    }, 60_000);
    setElapsed(shift.elapsedMinutes);
    return () => clearInterval(interval);
  }, [shift.isActive, shift.checkInTime, shift.elapsedMinutes]);

  async function handleStartShift() {
    if (!dpId) return;
    shift.startShift(dpId);
    toast.success("Shift started!");
  }

  function handleEndShift() {
    setShowConfirm(true);
  }

  async function confirmEndShift() {
    if (!shift.currentShift) return;
    const startMs = shift.checkInTime ?? Date.now();
    const endMs = Date.now();
    const orders = Number(
      (shift.currentShift as { ordersCompleted?: bigint }).ordersCompleted ?? 0,
    );
    const earnings =
      (shift.currentShift as { earningsDuringShift?: number })
        .earningsDuringShift ?? 0;
    shift.endShift(shift.currentShift.id);
    setShowConfirm(false);
    setCompletedShift({ startMs, endMs, orders, earnings });
    toast.success("Shift ended");
  }

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 shadow-card space-y-4"
      data-ocid="delivery.shift.card"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <Timer className="w-4 h-4 text-cyan-500" /> Shift Status
        </h3>
        <Badge
          className={
            shift.isActive
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200"
              : "bg-muted text-muted-foreground"
          }
          data-ocid="delivery.shift.status_badge"
        >
          {shift.isActive ? (
            <>
              <CheckCircle className="w-3 h-3 mr-1" /> On Shift
            </>
          ) : (
            <>
              <Clock className="w-3 h-3 mr-1" /> Off Duty
            </>
          )}
        </Badge>
      </div>

      {/* Active shift info */}
      {shift.isActive && (
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Checked in at</p>
            <p className="font-semibold text-foreground">
              {formatTs(shift.checkInTime)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Elapsed</p>
            <p className="font-mono font-bold text-cyan-600">
              {formatElapsed(elapsed)}
            </p>
          </div>
        </div>
      )}

      {/* Completed shift summary */}
      {completedShift && !shift.isActive && (
        <div
          className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-3 text-sm"
          data-ocid="delivery.shift.summary"
        >
          <p className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
            Shift Completed ✓
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Start</p>
              <p className="font-medium text-foreground">
                {formatTs(completedShift.startMs)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">End</p>
              <p className="font-medium text-foreground">
                {formatTs(completedShift.endMs)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-medium text-foreground">
                {formatDuration(completedShift.startMs, completedShift.endMs)}
              </p>
            </div>
          </div>
          {(completedShift.orders > 0 || completedShift.earnings > 0) && (
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-emerald-200 dark:border-emerald-800/50">
              <div>
                <p className="text-xs text-muted-foreground">Orders</p>
                <p className="font-semibold text-foreground">
                  {completedShift.orders}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Earnings</p>
                <p className="font-semibold text-success">
                  ₹{completedShift.earnings.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      {shift.isActive ? (
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleEndShift}
          disabled={shift.isEnding}
          data-ocid="delivery.shift.end_button"
        >
          {shift.isEnding ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Ending...
            </>
          ) : (
            <>
              <X className="w-4 h-4 mr-2" /> End Shift
            </>
          )}
        </Button>
      ) : (
        <Button
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
          onClick={handleStartShift}
          disabled={shift.isStarting || !dpId}
          data-ocid="delivery.shift.start_button"
        >
          {shift.isStarting ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Starting...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" /> Start Shift
            </>
          )}
        </Button>
      )}

      {/* End shift confirmation dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
          data-ocid="delivery.shift.confirm_dialog"
        >
          <div className="bg-card border border-border rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">End your shift?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Are you sure you want to end your shift? Your check-out time
                  and earnings will be recorded.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirm(false)}
                disabled={shift.isEnding}
                data-ocid="delivery.shift.cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={confirmEndShift}
                disabled={shift.isEnding}
                data-ocid="delivery.shift.confirm_button"
              >
                {shift.isEnding ? "Ending..." : "Yes, End Shift"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shift History Table ──────────────────────────────────────────────────────

function ShiftHistoryTable({ dpId }: ShiftCardProps) {
  const shift = useDeliveryShift(dpId);
  const history = shift.shiftHistory.slice(0, 7);

  if (!dpId) return null;

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 shadow-card"
      data-ocid="delivery.shift.history"
    >
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-cyan-500" /> Shift History
        <span className="text-xs text-muted-foreground font-normal ml-1">
          (last 7 days)
        </span>
      </h3>
      {shift.isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 rounded-lg" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div
          className="py-8 text-center text-muted-foreground text-sm"
          data-ocid="delivery.shift.history.empty_state"
        >
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
          No shift history yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="pb-2 pr-4 font-medium">Date</th>
                <th className="pb-2 pr-4 font-medium">Check In</th>
                <th className="pb-2 pr-4 font-medium">Check Out</th>
                <th className="pb-2 pr-4 font-medium">Duration</th>
                <th className="pb-2 font-medium text-right">Orders</th>
              </tr>
            </thead>
            <tbody>
              {history.map((s, idx) => {
                const startMs = Number(s.checkInTime) / 1_000_000;
                const endMs = s.checkOutTime
                  ? Number(s.checkOutTime) / 1_000_000
                  : null;
                const date = new Date(startMs).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                });
                return (
                  <tr
                    key={s.id}
                    className="border-b border-border/50 last:border-0"
                    data-ocid={`delivery.shift.history.item.${idx + 1}`}
                  >
                    <td className="py-2.5 pr-4 text-foreground font-medium">
                      {date}
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">
                      {formatTs(startMs)}
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">
                      {endMs ? (
                        formatTs(endMs)
                      ) : (
                        <span className="text-emerald-500 text-xs font-medium">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">
                      {endMs ? formatDuration(startMs, endMs) : "—"}
                    </td>
                    <td className="py-2.5 text-right font-semibold text-foreground">
                      {Number(s.ordersCompleted)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DeliveryDashboardPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [seenMainTipIds, setSeenMainTipIds] = useState<Set<string>>(new Set());
  const [posSession, setPosSession] = useState<DPSession | null>(getDPSession);
  const dpPhone = posSession?.phone ?? "";
  const dpId = posSession?.dpId;
  const dpName = posSession?.name ?? "Partner";
  const {
    data: liveOrdersForDp = [],
    isLoading,
    refetch: refetchDpOrders,
    dataUpdatedAt: dpOrdersUpdatedAt,
  } = useOrdersByDeliveryPartner(dpId);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  useEffect(() => {
    if (dpOrdersUpdatedAt) setLastRefreshed(new Date(dpOrdersUpdatedAt));
  }, [dpOrdersUpdatedAt]);
  const { data: testOrdersList = [] } = useTestOrders();
  const testOrderIds = new Set(testOrdersList.map((o) => o.id));
  const { isLoading: _isLoading } = useDeliveryOrders();
  const { data: mainAnalytics } = useDPAnalytics(dpId ?? "");
  const { data: mainTips = [], refetch: refetchMainTips } =
    useGetPartnerTips(dpId);
  const { data: mainTotalTips = 0, refetch: refetchMainTotalTips } =
    useGetTotalTipsEarned(dpId);
  const tipIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    tipIntervalRef.current = setInterval(() => {
      refetchMainTips();
      refetchMainTotalTips();
    }, 30_000);
    return () => {
      if (tipIntervalRef.current) clearInterval(tipIntervalRef.current);
    };
  }, [refetchMainTips, refetchMainTotalTips]);
  const newMainTipCount = mainTips.filter(
    (t) => !seenMainTipIds.has(t.id),
  ).length;
  const mainTodayTips = mainTips.filter((t) => {
    const d = new Date(t.createdAt > 1e12 ? t.createdAt / 1e6 : t.createdAt);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });
  const mainRevenueTrend = (mainAnalytics?.revenueTrend ?? []).map((e) => ({
    period: e.period,
    revenue: Number(e.revenue),
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role Header */}
      <div className="role-header-delivery rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Truck className="w-5 h-5 text-cyan-500" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Delivery Partner Dashboard
            </h2>
            <p className="text-sm text-muted-foreground">
              {dpName}
              {dpPhone ? ` · 📱 ${dpPhone}` : ""} · Active Partner
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {isUnlocked ? (
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200">
                <CheckCircle className="w-3 h-3 mr-1" /> Active
              </Badge>
            ) : (
              <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200">
                <Lock className="w-3 h-3 mr-1" /> Subscription Required
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Link Banner */}
      <DashboardLinkBanner
        dashboardUrl={`${window.location.origin}/delivery-dashboard`}
        roleLabel="Delivery Partner"
        accentClass="border-cyan-300 dark:border-cyan-700/50"
        iconBgClass="bg-cyan-100 dark:bg-cyan-900/30"
        iconColorClass="text-cyan-600"
      />

      {/* Lock Gate */}
      {!isUnlocked && (
        <SubscriptionLockGate onUnlock={() => setIsUnlocked(true)} />
      )}

      {isUnlocked && (
        <>
          {/* Shift Status Card — always visible at top when logged in */}
          <ShiftStatusCard dpId={dpId} />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full sm:w-auto" data-ocid="delivery.tabs">
              <TabsTrigger value="overview" data-ocid="delivery.tab.overview">
                <Truck className="w-3.5 h-3.5 mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="shift" data-ocid="delivery.tab.shift">
                <Timer className="w-3.5 h-3.5 mr-1" />
                Shift
              </TabsTrigger>
              <TabsTrigger value="active" data-ocid="delivery.tab.active">
                <Navigation className="w-3.5 h-3.5 mr-1" />
                Active Jobs
              </TabsTrigger>
              <TabsTrigger value="completed" data-ocid="delivery.tab.completed">
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="earnings" data-ocid="delivery.tab.earnings">
                <IndianRupee className="w-3.5 h-3.5 mr-1" />
                Earnings
              </TabsTrigger>
              <TabsTrigger value="pos" data-ocid="delivery.tab.pos">
                <QrCode className="w-3.5 h-3.5 mr-1" />
                POS
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                data-ocid="delivery.tab.tips"
                onClick={() =>
                  setSeenMainTipIds(new Set(mainTips.map((t) => t.id)))
                }
                className="relative"
              >
                <IndianRupee className="w-3.5 h-3.5 mr-1" />
                Tips
                {newMainTipCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {newMainTipCount > 9 ? "9+" : newMainTipCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="lending" data-ocid="delivery.tab.lending">
                <HandCoins className="w-3.5 h-3.5 mr-1" />
                Lending
              </TabsTrigger>
              <TabsTrigger value="community" data-ocid="delivery.tab.community">
                <Users className="w-3.5 h-3.5 mr-1" />
                Community
              </TabsTrigger>
            </TabsList>

            {/* ── Shift ─────────────────────────────────────────────────── */}
            <TabsContent value="shift" className="mt-4 space-y-4">
              <ShiftStatusCard dpId={dpId} />
              <ShiftHistoryTable dpId={dpId} />
            </TabsContent>

            {/* ── Overview ──────────────────────────────────────────────── */}
            <TabsContent value="overview" className="mt-4 space-y-5">
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                data-ocid="delivery.stats-grid"
              >
                <DeliveryStatCard
                  title="Active Today"
                  value="3"
                  icon={Navigation}
                  sublabel="2 en route"
                  highlight
                />
                <DeliveryStatCard
                  title="Earnings (Month)"
                  value="₹14,280"
                  icon={IndianRupee}
                  sublabel="+8% vs last month"
                />
                <DeliveryStatCard
                  title="Completed"
                  value="847"
                  icon={CheckCircle}
                  sublabel="Total deliveries"
                />
                <DeliveryStatCard
                  title="Rating"
                  value="4.8 ★"
                  icon={Star}
                  sublabel="From 312 reviews"
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Live Deliveries */}
                <div
                  className="xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-card"
                  data-ocid="delivery.live-deliveries"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        Live Deliveries
                      </h3>
                      {dpId && (
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Auto-refreshes every 15s · Last{" "}
                          {lastRefreshed.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={() => refetchDpOrders()}
                        data-ocid="delivery.live-deliveries.refresh_button"
                      >
                        <RefreshCw className="w-3 h-3" /> Refresh
                      </Button>
                      <Badge
                        variant="outline"
                        className="text-xs animate-pulse"
                      >
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 inline-block" />
                        Live
                      </Badge>
                    </div>
                  </div>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : liveOrdersForDp.length === 0 ? (
                    <div
                      className="py-8 text-center"
                      data-ocid="delivery.live-deliveries.empty_state"
                    >
                      <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {dpId
                          ? "No active deliveries"
                          : "Log in via POS tab to see your live orders"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {liveOrdersForDp.slice(0, 5).map((order, i) => {
                        const o = order as Record<string, unknown>;
                        return (
                          <div
                            key={String(o.id ?? i)}
                            className="p-4 bg-muted/30 rounded-xl border border-border"
                            data-ocid={`delivery.delivery.item.${i + 1}`}
                          >
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <p className="font-mono text-xs font-bold text-foreground">
                                {String(o.id ?? "").slice(0, 14)}
                              </p>
                              <div className="flex items-center gap-1.5">
                                {testOrderIds.has(String(o.id ?? "")) && (
                                  <Badge className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-semibold">
                                    Test Run
                                  </Badge>
                                )}
                                <Badge
                                  variant="outline"
                                  className="text-xs capitalize"
                                >
                                  {String(o.status ?? "pending")}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {String(
                                    o.customerPhone ?? o.customerId ?? "—",
                                  )}
                                </span>
                              </div>
                              <span className="font-medium text-foreground">
                                ₹
                                {Number(
                                  o.totalAmount ?? o.total ?? 0,
                                ).toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Performance */}
                <div
                  className="bg-card border border-border rounded-xl p-5 shadow-card space-y-4"
                  data-ocid="delivery.performance-card"
                >
                  <h3 className="font-display font-semibold text-foreground">
                    Performance
                  </h3>
                  {[
                    {
                      label: "On-time Rate",
                      value: "86.7%",
                      color: "text-emerald-500",
                      pct: 87,
                    },
                    {
                      label: "Cancellation Rate",
                      value: "2.1%",
                      color: "text-red-400",
                      pct: 2,
                    },
                    {
                      label: "Total Trips",
                      value: "847",
                      color: "text-cyan-500",
                      pct: 100,
                    },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">
                          {metric.label}
                        </span>
                        <span className={`text-sm font-bold ${metric.color}`}>
                          {metric.value}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full transition-all"
                          style={{ width: `${metric.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-3">
                      Deliveries by Type
                    </p>
                    {[
                      { type: "Regular", count: 612, pct: 72 },
                      { type: "Shuttle", count: 189, pct: 22 },
                      { type: "Adhoc", count: 46, pct: 6 },
                    ].map((t) => (
                      <div
                        key={t.type}
                        className="flex items-center gap-2 mb-2"
                      >
                        <span className="text-xs text-muted-foreground w-14">
                          {t.type}
                        </span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-400 rounded-full"
                            style={{ width: `${t.pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground w-8 text-right">
                          {t.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Active Jobs ────────────────────────────────────────────── */}
            <TabsContent value="active" className="mt-4">
              <div
                className="bg-card border border-border rounded-xl p-5 shadow-card"
                data-ocid="delivery.active-jobs-section"
              >
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Active Assigned Jobs
                </h3>
                <div className="space-y-3">
                  {(() => {
                    const activeJobs = liveOrdersForDp.filter((o) => {
                      const rec = o as Record<string, unknown>;
                      const st = String(rec.status ?? "").toLowerCase();
                      return st !== "delivered" && st !== "completed";
                    });
                    if (isLoading) {
                      return [1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-16 w-full rounded-xl bg-muted/30 animate-pulse"
                        />
                      ));
                    }
                    if (activeJobs.length === 0) {
                      return (
                        <div
                          className="py-10 text-center"
                          data-ocid="delivery.active.empty_state"
                        >
                          <Navigation className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No active deliveries
                          </p>
                        </div>
                      );
                    }
                    return activeJobs.map((o, i) => {
                      const rec = o as Record<string, unknown>;
                      return (
                        <div
                          key={String(rec.id ?? i)}
                          className="p-4 bg-muted/30 rounded-xl border border-border"
                          data-ocid={`delivery.active.item.${i + 1}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-mono text-sm font-bold">
                                {String(rec.id ?? "").slice(0, 14)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                ₹
                                {Number(
                                  rec.totalAmount ?? rec.total ?? 0,
                                ).toLocaleString("en-IN")}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {String(rec.status ?? "pending")}
                            </Badge>
                          </div>
                          <div className="text-xs space-y-1">
                            {!!rec.deliveryAddress && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3 text-emerald-500" />
                                <span className="text-muted-foreground">
                                  {String(rec.deliveryAddress)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </TabsContent>

            {/* ── Completed ──────────────────────────────────────────────── */}
            <TabsContent value="completed" className="mt-4">
              <div
                className="bg-card border border-border rounded-xl p-5 shadow-card"
                data-ocid="delivery.completed-section"
              >
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Completed Deliveries
                </h3>
                <div className="space-y-2">
                  {(() => {
                    const completedJobs = liveOrdersForDp.filter((o) => {
                      const rec = o as Record<string, unknown>;
                      const st = String(rec.status ?? "").toLowerCase();
                      return st === "delivered" || st === "completed";
                    });
                    if (isLoading) {
                      return [1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-12 w-full rounded-xl bg-muted/20 animate-pulse"
                        />
                      ));
                    }
                    if (completedJobs.length === 0) {
                      return (
                        <div
                          className="py-10 text-center"
                          data-ocid="delivery.completed.empty_state"
                        >
                          <CheckCircle2 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No completed deliveries yet
                          </p>
                        </div>
                      );
                    }
                    return completedJobs.map((o, i) => {
                      const rec = o as Record<string, unknown>;
                      return (
                        <div
                          key={String(rec.id ?? i)}
                          className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border"
                          data-ocid={`delivery.completed.item.${i + 1}`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-mono text-sm font-bold">
                              {String(rec.id ?? "").slice(0, 14)}
                            </p>
                            {!!rec.deliveryAddress && (
                              <p className="text-xs text-muted-foreground truncate">
                                {String(rec.deliveryAddress)}
                              </p>
                            )}
                          </div>
                          <span className="text-sm font-bold text-foreground">
                            ₹
                            {Number(
                              rec.totalAmount ?? rec.total ?? 0,
                            ).toLocaleString("en-IN")}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Done
                          </Badge>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </TabsContent>

            {/* ── Tips ─────────────────────────────────────────────────── */}
            <TabsContent
              value="tips"
              className="mt-4 space-y-4"
              data-ocid="delivery.tips.section"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  className="bg-card border border-border rounded-xl p-4 shadow-card"
                  data-ocid="delivery.tips.total_card"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <IndianRupee className="w-3.5 h-3.5 text-success" />
                    <span className="text-xs text-muted-foreground">
                      Total Tips Earned
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-success">
                    ₹{Number(mainTotalTips).toLocaleString("en-IN")}
                  </p>
                </div>
                <div
                  className="bg-card border border-border rounded-xl p-4 shadow-card"
                  data-ocid="delivery.tips.today_card"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star className="w-3.5 h-3.5 text-warning" />
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {mainTodayTips.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ₹
                    {mainTodayTips
                      .reduce((s, t) => s + Number(t.amount), 0)
                      .toLocaleString("en-IN")}{" "}
                    today
                  </p>
                </div>
                <div
                  className="bg-card border border-border rounded-xl p-4 shadow-card col-span-2 md:col-span-1"
                  data-ocid="delivery.tips.alltime_card"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      All Time
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {mainTips.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    tips received
                  </p>
                </div>
              </div>
              {mainTips.length === 0 ? (
                <div
                  className="bg-card border border-border rounded-xl py-12 text-center"
                  data-ocid="delivery.tips.empty_state"
                >
                  <IndianRupee className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium text-foreground">
                    No tips yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Customers can add a tip when placing orders
                  </p>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
                  <div className="px-5 py-3.5 border-b border-border bg-muted/20 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-foreground text-sm">
                      Tip History
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {mainTips.length} tips
                    </Badge>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/10">
                          <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium">
                            Date
                          </th>
                          <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium">
                            Customer
                          </th>
                          <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium">
                            Order ID
                          </th>
                          <th className="text-right px-5 py-2.5 text-xs text-muted-foreground font-medium">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {mainTips.map((tip, idx) => {
                          const ts =
                            tip.createdAt > 1e12
                              ? tip.createdAt / 1e6
                              : tip.createdAt;
                          const dateStr = new Date(ts).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" },
                          );
                          const isNew = !seenMainTipIds.has(tip.id);
                          return (
                            <tr
                              key={tip.id}
                              className={`hover:bg-muted/20 transition-colors ${isNew ? "bg-success/5" : ""}`}
                              data-ocid={`delivery.tip.item.${idx + 1}`}
                            >
                              <td className="px-5 py-3 text-xs text-muted-foreground">
                                {dateStr}
                              </td>
                              <td className="px-5 py-3 text-xs text-foreground">
                                {tip.customerName}
                                {isNew && (
                                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-destructive" />
                                )}
                              </td>
                              <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                                {tip.orderId.slice(0, 12)}…
                              </td>
                              <td className="px-5 py-3 text-right font-bold text-success">
                                ₹{Number(tip.amount).toLocaleString("en-IN")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* ── Earnings ───────────────────────────────────────────────── */}
            <TabsContent value="earnings" className="mt-4">
              <div
                className="bg-card border border-border rounded-xl p-5 shadow-card"
                data-ocid="delivery.earnings-chart"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">
                    Earnings Trend
                  </h3>
                  {mainRevenueTrend.length > 0 && (
                    <p className="text-sm font-bold text-cyan-500">
                      Total: ₹
                      {mainRevenueTrend
                        .reduce((s, d) => s + d.revenue, 0)
                        .toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
                {mainRevenueTrend.length === 0 ? (
                  <div
                    className="py-10 text-center"
                    data-ocid="delivery.earnings.empty_state"
                  >
                    <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No earnings data yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete deliveries to see your earnings trend
                    </p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      data={mainRevenueTrend}
                      margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="period"
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={TOOLTIP_STYLE}
                        formatter={(v: number) => [`₹${v}`, ""]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#22d3ee"
                        fill="#22d3ee33"
                        name="Revenue"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </TabsContent>

            {/* ── POS ────────────────────────────────────────────────────── */}
            <TabsContent value="pos" className="mt-4">
              <div className="space-y-5" data-ocid="delivery.pos-section">
                {!posSession ? (
                  <DeliveryOTPLogin
                    onSuccess={(s) => {
                      saveDPSession(s);
                      setPosSession(s);
                    }}
                  />
                ) : (
                  <DeliveryPOSPanel
                    session={posSession}
                    onLogout={() => {
                      clearDPSession();
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
                data-ocid="delivery.lending-section"
              >
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <HandCoins className="w-4 h-4 text-cyan-500" /> Lending
                </h3>
                {posSession?.phone ? (
                  <LendingSection
                    phone={posSession.phone}
                    accentClass="bg-cyan-50/50 dark:bg-cyan-950/20"
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
                data-ocid="delivery.community-section"
              >
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Nearby Community
                </h3>
                <CommunitySection city="Gandhidham" maxItems={10} />
              </div>
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
              Subscription-gated Exclusive Offers
            </h3>
            <div className="h-24 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl">
            <div className="text-center">
              <Lock className="w-8 h-8 text-destructive mx-auto mb-2" />
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
