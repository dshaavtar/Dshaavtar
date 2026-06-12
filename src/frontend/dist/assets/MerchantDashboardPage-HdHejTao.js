import { j as jsxRuntimeExports, bG as useActor, bE as useQuery, ao as useQueryClient, bF as useMutation, bH as createActor, r as reactExports, d3 as useOrdersByMerchant, d4 as useTestOrders, d5 as useGetMerchantSubscriptionStatus, K as useProducts, d6 as useGetProductScanHistory, d7 as useAddProductScanHistory, d8 as useDeleteProductScanEntry, d9 as useGetProductByBarcode, p as ue, da as useGeneratePOSOTP, db as useVerifyPOSOTP, dc as useMerchantBranches, dd as useMerchantPOSOrders, de as useMerchantEarnings, df as useMerchantTopProducts, aJ as useMerchantAnalytics, dg as useGenerateOrderPaymentQR, w as useUpdateOrderStatus, x as OrderStatus } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent } from "./card-Dx8tJeYi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { B as BuzzNotification, L as LineChart, a as Line } from "./BuzzNotification-SbYuHcfI.js";
import { D as DashboardLinkBanner, L as LendingSection, C as CommunitySection } from "./LendingSection-DCcY51Rg.js";
import { Q as QRTimerDisplay } from "./QRTimerDisplay-DIQaJZWT.js";
import { S as Store } from "./store-CaCzKt5a.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { L as Lock } from "./lock-_3m7dyMM.js";
import { S as ShoppingBag } from "./shopping-bag-DlKZ3RXf.js";
import { P as Package } from "./package-CosknzeL.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { Q as QrCode } from "./qr-code-CVNmsjZi.js";
import { H as HandCoins } from "./hand-coins-D5RW6D6g.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { W as Wrench } from "./wrench-B6FcmCok.js";
import { S as Star } from "./star-DbleSGPY.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { R as ResponsiveContainer, T as Tooltip, B as Bar } from "./generateCategoricalChart--dgqj_9a.js";
import { B as BarChart } from "./BarChart-fezhxBKo.js";
import { X as XAxis, Y as YAxis, C as CartesianGrid } from "./YAxis-BEF0I4n4.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { I as IndianRupee } from "./indian-rupee-4FVPRNFh.js";
import { X } from "./x-Chksmd6i.js";
import { L as LockOpen } from "./lock-open-BwR0r970.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { L as LogOut } from "./log-out-Bs9IUFS8.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as ChartColumn } from "./chart-column-1UICj-Tf.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
import "./bell-Bilc9tB3.js";
import "./phone-sT0WBdc4.js";
import "./map-pin-DGvTRx32.js";
import "./copy-ox5Tlh0O.js";
import "./rotate-ccw-BCahGsp7.js";
import "./triangle-alert-BhhO8CMW.js";
const CODE128_PATTERNS = [
  [2, 1, 2, 2, 2, 2],
  [2, 2, 2, 1, 2, 2],
  [2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 2, 3],
  [1, 2, 1, 3, 2, 2],
  [1, 3, 1, 2, 2, 2],
  [1, 2, 2, 2, 1, 3],
  [1, 2, 2, 3, 1, 2],
  [1, 3, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 3],
  [2, 2, 1, 3, 1, 2],
  [2, 3, 1, 2, 1, 2],
  [1, 1, 2, 2, 3, 2],
  [1, 2, 2, 1, 3, 2],
  [1, 2, 2, 2, 3, 1],
  [1, 1, 3, 2, 2, 2],
  [1, 2, 3, 1, 2, 2],
  [1, 2, 3, 2, 2, 1],
  [2, 2, 3, 2, 1, 1],
  [2, 2, 1, 1, 3, 2],
  [2, 2, 1, 2, 3, 1],
  [2, 1, 3, 2, 1, 2],
  [2, 2, 3, 1, 1, 2],
  [3, 1, 2, 1, 3, 1],
  [3, 1, 1, 2, 2, 2],
  [3, 2, 1, 1, 2, 2],
  [3, 2, 1, 2, 2, 1],
  [3, 1, 2, 2, 1, 2],
  [3, 2, 2, 1, 1, 2],
  [3, 2, 2, 2, 1, 1],
  [2, 1, 2, 1, 2, 3],
  [2, 1, 2, 3, 2, 1],
  [2, 3, 2, 1, 2, 1],
  [1, 1, 1, 3, 2, 3],
  [1, 3, 1, 1, 2, 3],
  [1, 3, 1, 3, 2, 1],
  [1, 1, 2, 3, 1, 3],
  [1, 3, 2, 1, 1, 3],
  [1, 3, 2, 3, 1, 1],
  [2, 1, 1, 3, 1, 3],
  [2, 3, 1, 1, 1, 3],
  [2, 3, 1, 3, 1, 1],
  [1, 1, 2, 1, 3, 3],
  [1, 1, 2, 3, 3, 1],
  [1, 3, 2, 1, 3, 1],
  [1, 1, 3, 1, 2, 3],
  [1, 1, 3, 3, 2, 1],
  [1, 3, 3, 1, 2, 1],
  [3, 1, 3, 1, 2, 1],
  [2, 1, 1, 3, 3, 1],
  [2, 3, 1, 1, 3, 1],
  [2, 1, 3, 1, 1, 3],
  [2, 1, 3, 3, 1, 1],
  [2, 1, 3, 1, 3, 1],
  [3, 1, 1, 1, 2, 3],
  [3, 1, 1, 3, 2, 1],
  [3, 3, 1, 1, 2, 1],
  [3, 1, 2, 1, 1, 3],
  [3, 1, 2, 3, 1, 1],
  [3, 3, 2, 1, 1, 1],
  [3, 1, 4, 1, 1, 1],
  [2, 2, 1, 4, 1, 1],
  [4, 3, 1, 1, 1, 1],
  [1, 1, 1, 2, 2, 4],
  [1, 1, 1, 4, 2, 2],
  [1, 2, 1, 1, 2, 4],
  [1, 2, 1, 4, 2, 1],
  [1, 4, 1, 1, 2, 2],
  [1, 4, 1, 2, 2, 1],
  [1, 1, 2, 2, 1, 4],
  [1, 1, 2, 4, 1, 2],
  [1, 2, 2, 1, 1, 4],
  [1, 2, 2, 4, 1, 1],
  [1, 4, 2, 1, 1, 2],
  [1, 4, 2, 2, 1, 1],
  [2, 4, 1, 2, 1, 1],
  [2, 2, 1, 1, 1, 4],
  [4, 1, 3, 1, 1, 1],
  [2, 4, 1, 1, 1, 2],
  [1, 3, 4, 1, 1, 1],
  [1, 1, 1, 2, 4, 2],
  [1, 2, 1, 1, 4, 2],
  [1, 2, 1, 2, 4, 1],
  [1, 1, 4, 2, 1, 2],
  [1, 2, 4, 1, 1, 2],
  [1, 2, 4, 2, 1, 1],
  [4, 1, 1, 2, 1, 2],
  [4, 2, 1, 1, 1, 2],
  [4, 2, 1, 2, 1, 1],
  [2, 1, 2, 1, 4, 1],
  [2, 1, 4, 1, 2, 1],
  [4, 1, 2, 1, 2, 1],
  [1, 1, 1, 1, 4, 3],
  [1, 1, 1, 3, 4, 1],
  [1, 3, 1, 1, 4, 1],
  [1, 1, 4, 1, 1, 3],
  [1, 1, 4, 3, 1, 1],
  [4, 1, 1, 1, 1, 3],
  [4, 1, 1, 3, 1, 1],
  [1, 1, 3, 1, 4, 1],
  [1, 1, 4, 1, 3, 1],
  [3, 1, 1, 1, 4, 1],
  [4, 1, 1, 1, 3, 1],
  [2, 1, 1, 4, 1, 2],
  [2, 1, 1, 2, 1, 4],
  [2, 1, 1, 2, 3, 2],
  [2, 3, 3, 1, 1, 1],
  [1, 1, 2, 1, 2, 1]
  // stop pattern (index 106)
];
const START_B = 104;
const STOP = 106;
function charToCode128B(char) {
  const code = char.charCodeAt(0) - 32;
  if (code < 0 || code > 94) return 0;
  return code;
}
function buildModules(value) {
  const codes = [START_B];
  for (const ch of value) codes.push(charToCode128B(ch));
  let check = START_B;
  value.split("").forEach((ch, i) => {
    check += charToCode128B(ch) * (i + 1);
  });
  codes.push(check % 103);
  codes.push(STOP);
  const modules = [];
  for (const code of codes) {
    const pattern = CODE128_PATTERNS[code] ?? CODE128_PATTERNS[0];
    for (let i = 0; i < pattern.length; i++) {
      const isBar = i % 2 === 0;
      for (let w = 0; w < pattern[i]; w++) modules.push(isBar);
    }
    if (code === STOP) {
      modules.push(true);
      modules.push(true);
    }
  }
  return [
    ...Array(10).fill(false),
    ...modules,
    ...Array(10).fill(false)
  ];
}
function BarcodeDisplay({
  value,
  width = 200,
  height = 60,
  showText = true,
  className = ""
}) {
  if (!value) return null;
  const modules = buildModules(value);
  const totalModules = modules.length;
  const textHeight = showText ? 14 : 0;
  const barcodeHeight = height - textHeight;
  const moduleWidth = width / totalModules;
  const rects = [];
  let i = 0;
  while (i < modules.length) {
    if (!modules[i]) {
      i++;
      continue;
    }
    let j = i;
    while (j < modules.length && modules[j]) j++;
    rects.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "rect",
        {
          x: i * moduleWidth,
          y: 0,
          width: (j - i) * moduleWidth,
          height: barcodeHeight,
          fill: "currentColor"
        },
        i
      )
    );
    i = j;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${width} ${height}`,
      width,
      height,
      className: `text-foreground ${className}`,
      role: "img",
      "aria-label": `Barcode: ${value}`,
      children: [
        rects,
        showText && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: width / 2,
            y: height - 2,
            textAnchor: "middle",
            fontSize: "10",
            fontFamily: "monospace",
            fill: "currentColor",
            children: value
          }
        )
      ]
    }
  );
}
function useListMerchantEmployees(merchantId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["merchantEmployees", merchantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMerchantEmployees(merchantId);
    },
    enabled: !!actor && !isFetching && !!merchantId
  });
}
function useAddMerchantEmployee() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      merchantId,
      name,
      phone,
      role
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addMerchantEmployee(merchantId, name, phone, role);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["merchantEmployees", vars.merchantId]
      });
    }
  });
}
function useSetMerchantEmployeeActive() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isActive
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setMerchantEmployeeActive(id, isActive);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["merchantEmployees", vars.merchantId]
      });
    }
  });
}
function useEmployeeCheckIn() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      employeeId,
      merchantId,
      notes
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.employeeCheckIn(employeeId, merchantId, notes);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["todayAttendance", vars.merchantId] });
    }
  });
}
function useEmployeeCheckOut() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      attendanceId
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.employeeCheckOut(attendanceId);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["todayAttendance", vars.merchantId] });
    }
  });
}
function useGetTodayAttendance(merchantId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["todayAttendance", merchantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTodayAttendance(merchantId);
    },
    enabled: !!actor && !isFetching && !!merchantId
  });
}
function useGetMerchantPendingLeaves(merchantId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pendingLeaves", merchantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMerchantPendingLeaves(merchantId);
    },
    enabled: !!actor && !isFetching && !!merchantId
  });
}
function useApproveLeave() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      approverNote
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.approveLeave(id, approverNote);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["pendingLeaves", vars.merchantId] });
    }
  });
}
function useRejectLeave() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      approverNote
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rejectLeave(id, approverNote);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["pendingLeaves", vars.merchantId] });
    }
  });
}
const SESSION_KEY = "wc_merchant_session";
function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return null;
}
function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
const TOOLTIP_STYLE = {
  background: "var(--color-card, #1e293b)",
  border: "1px solid var(--color-border, #334155)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--color-card-foreground, #f1f5f9)"
};
function MerchantOTPLogin({
  onSuccess
}) {
  const [phone, setPhone] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [step, setStep] = reactExports.useState("phone");
  const [devOtp, setDevOtp] = reactExports.useState(null);
  const [resendCountdown, setResendCountdown] = reactExports.useState(0);
  const [error, setError] = reactExports.useState("");
  const generateOTP = useGeneratePOSOTP();
  const verifyOTP = useVerifyPOSOTP();
  reactExports.useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setInterval(() => setResendCountdown((c) => c - 1), 1e3);
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
        role: "merchant"
      });
      if (result.success) {
        const session = {
          phone,
          merchantId: result.merchantId ?? result.userId ?? `m_${phone}`,
          name: result.name ?? phone
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6",
      "data-ocid": "merchant.pos-login-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5 text-amber-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Merchant POS Login" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sign in with your WhatsApp number to access POS" })
          ] })
        ] }),
        step === "phone" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pos-phone", children: "WhatsApp Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pos-phone",
                placeholder: "+91 98765 43210",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleSendOTP(),
                "data-ocid": "merchant.pos.phone_input"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-destructive",
              "data-ocid": "merchant.pos.error_state",
              children: error
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full bg-amber-500 hover:bg-amber-600 text-white",
              onClick: handleSendOTP,
              disabled: generateOTP.isPending,
              "data-ocid": "merchant.pos.send_otp_button",
              children: generateOTP.isPending ? "Sending OTP…" : "Send OTP via WhatsApp"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
            "OTP sent to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: phone })
          ] }),
          devOtp && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3",
              "data-ocid": "merchant.pos.dev_otp_info",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary", children: [
                  "Dev Mode — OTP:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold", children: devOtp })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pos-otp", children: "Enter OTP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pos-otp",
                placeholder: "6-digit OTP",
                value: otp,
                onChange: (e) => setOtp(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleVerify(),
                maxLength: 6,
                "data-ocid": "merchant.pos.otp_input"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-destructive",
              "data-ocid": "merchant.pos.error_state",
              children: error
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full bg-amber-500 hover:bg-amber-600 text-white",
              onClick: handleVerify,
              disabled: verifyOTP.isPending,
              "data-ocid": "merchant.pos.verify_otp_button",
              children: verifyOTP.isPending ? "Verifying…" : "Verify & Enter POS"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            resendCountdown > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Resend in ",
              resendCountdown,
              "s"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSendOTP,
                className: "text-primary hover:underline",
                "data-ocid": "merchant.pos.resend_button",
                children: "Resend OTP"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setStep("phone");
                  setError("");
                  setOtp("");
                  setDevOtp(null);
                },
                className: "text-muted-foreground hover:text-foreground",
                "data-ocid": "merchant.pos.back_button",
                children: "← Change number"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function MerchantPOSPanel({
  session,
  onLogout
}) {
  const [activeTab, setActiveTab] = reactExports.useState("pending");
  const [selectedBranch, setSelectedBranch] = reactExports.useState("all");
  const [hasNewOrder, setHasNewOrder] = reactExports.useState(false);
  const [acknowledgedIds, setAcknowledgedIds] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [orderQRMap, setOrderQRMap] = reactExports.useState(
    {}
  );
  const [overlayQR, setOverlayQR] = reactExports.useState(null);
  const MERCHANT_ID = session.merchantId;
  const merchantUPI = (session == null ? void 0 : session.upiId) ?? "";
  const { data: branches = [] } = useMerchantBranches(MERCHANT_ID);
  const { data: pendingOrders = [], isLoading: loadingPending } = useMerchantPOSOrders();
  const { data: acceptedOrders = [], isLoading: loadingActive } = useMerchantPOSOrders();
  const { data: completedOrders = [], isLoading: loadingCompleted } = useMerchantPOSOrders();
  const { data: earnings, isLoading: loadingEarnings } = useMerchantEarnings();
  const { data: topProducts = [] } = useMerchantTopProducts();
  const { data: analytics } = useMerchantAnalytics(MERCHANT_ID);
  const generateQR = useGenerateOrderPaymentQR();
  const updateStatus = useUpdateOrderStatus();
  const unacknowledgedCount = pendingOrders.filter(
    (o) => !acknowledgedIds.has(String(o.id))
  ).length;
  reactExports.useEffect(() => {
    setHasNewOrder(unacknowledgedCount > 0);
  }, [unacknowledgedCount]);
  const totalPending = pendingOrders.length;
  const totalCompleted = completedOrders.length;
  const revenueTrend = (analytics == null ? void 0 : analytics.revenueTrend) ? analytics.revenueTrend.slice(-7).map((d) => ({ day: d.period.slice(-5), revenue: Number(d.revenue) })) : [];
  function formatTime(ts) {
    if (!ts) return "—";
    return new Date(Number(ts)).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  function formatDate(ts) {
    if (!ts) return "—";
    return new Date(Number(ts)).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    });
  }
  async function handleAccept(orderId) {
    await updateStatus.mutateAsync({
      id: orderId,
      status: OrderStatus.accepted
    });
    setAcknowledgedIds((prev) => /* @__PURE__ */ new Set([...prev, orderId]));
  }
  async function handleReject(orderId) {
    await updateStatus.mutateAsync({
      id: orderId,
      status: OrderStatus.rejected
    });
    setAcknowledgedIds((prev) => /* @__PURE__ */ new Set([...prev, orderId]));
  }
  async function handleOverlayQR(orderId, amount) {
    const qr = await generateQR.mutateAsync({
      orderId,
      amount,
      upiId: merchantUPI
    });
    setOverlayQR(qr);
  }
  async function handleInlineQR(orderId, amount) {
    const qr = await generateQR.mutateAsync({
      orderId,
      amount,
      upiId: merchantUPI
    });
    setOrderQRMap((prev) => ({
      ...prev,
      [orderId]: { qr, expired: false }
    }));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "merchant.pos.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
          "POS — ",
          session.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: session.phone })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "pos-branch",
              className: "text-xs text-muted-foreground",
              children: "Branch:"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "pos-branch",
              className: "text-sm border border-border rounded-md px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              value: selectedBranch,
              onChange: (e) => setSelectedBranch(e.target.value),
              "data-ocid": "merchant.pos.branch_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Branches" }),
                branches.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.branchId, children: b.name }, b.branchId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: onLogout,
            className: "gap-1.5 text-muted-foreground hover:text-destructive",
            "data-ocid": "merchant.pos.logout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign Out" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BuzzNotification,
      {
        hasNewOrder,
        onAcknowledge: () => {
          setHasNewOrder(false);
          setAcknowledgedIds(new Set(pendingOrders.map((o) => String(o.id))));
        }
      }
    ),
    overlayQR && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/60 z-50 flex items-center justify-center",
        "data-ocid": "merchant.pos.qr.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute -top-3 -right-3 z-10 w-8 h-8 bg-card rounded-full flex items-center justify-center border border-border shadow-card hover:bg-muted",
              onClick: () => setOverlayQR(null),
              "aria-label": "Close QR",
              "data-ocid": "merchant.pos.qr.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QRTimerDisplay,
            {
              qrData: overlayQR.qrData,
              amount: overlayQR.amount,
              expiresAt: overlayQR.expiresAt,
              onExpire: () => {
              },
              onRefresh: () => setOverlayQR(null)
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: loadingEarnings ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "earnings-card",
          "data-ocid": "merchant.pos.revenue_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-success" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Revenue Today" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-success", children: [
              "₹",
              ((earnings == null ? void 0 : earnings.totalRevenue) ?? 0).toLocaleString("en-IN")
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "earnings-card", "data-ocid": "merchant.pos.orders_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Orders" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: Number((earnings == null ? void 0 : earnings.orderCount) ?? 0) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "earnings-card",
          "data-ocid": "merchant.pos.pending_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-warning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Pending" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-warning", children: totalPending })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "earnings-card",
          "data-ocid": "merchant.pos.completed_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Completed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: totalCompleted })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", "data-ocid": "merchant.pos.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pending", "data-ocid": "merchant.pos.tab.pending", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 mr-1" }),
          "Pending",
          totalPending > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5 font-bold", children: totalPending })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "active", "data-ocid": "merchant.pos.tab.active", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 mr-1" }),
          "Active"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "completed", "data-ocid": "merchant.pos.tab.completed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1" }),
          "Done (",
          totalCompleted,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "earnings", "data-ocid": "merchant.pos.tab.earnings", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3.5 h-3.5 mr-1" }),
          "Earnings"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "mt-3 space-y-2", children: loadingPending ? ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) : pendingOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-12 text-center text-muted-foreground",
          "data-ocid": "merchant.pos.pending.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 mb-3 mx-auto opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No pending orders" })
          ]
        }
      ) : pendingOrders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pos-order-card pos-order-card-pending",
          "data-ocid": `merchant.pos.order.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm font-mono", children: [
                  "#",
                  String(order.id).slice(-8).toUpperCase()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-warning text-warning",
                    children: "Pending"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: formatTime(order.createdAt) })
              ] }),
              order.customerId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1", children: [
                "Customer:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: order.customerId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                "₹",
                Number(order.totalAmount).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "gap-1 bg-success hover:bg-success/90 text-success-foreground min-w-[72px]",
                  onClick: () => handleAccept(String(order.id)),
                  disabled: updateStatus.isPending,
                  "data-ocid": `merchant.pos.accept_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                    "Accept"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1 border-destructive text-destructive hover:bg-destructive/10 min-w-[72px]",
                  onClick: () => handleReject(String(order.id)),
                  disabled: updateStatus.isPending,
                  "data-ocid": `merchant.pos.reject_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                    "Reject"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1 min-w-[72px]",
                  onClick: () => handleOverlayQR(String(order.id), order.totalAmount),
                  "data-ocid": `merchant.pos.qr_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3 h-3" }),
                    "QR Pay"
                  ]
                }
              )
            ] })
          ] })
        },
        String(order.id)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", className: "mt-3 space-y-2", children: loadingActive ? ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) : acceptedOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-12 text-center text-muted-foreground",
          "data-ocid": "merchant.pos.active.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 mb-3 mx-auto opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No active orders" })
          ]
        }
      ) : acceptedOrders.map((order, idx) => {
        const orderId = String(order.id);
        const qrState = orderQRMap[orderId];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pos-order-card pos-order-card-confirmed",
            "data-ocid": `merchant.pos.active_order.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm font-mono", children: [
                    "#",
                    orderId.slice(-8).toUpperCase()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs border-success text-success",
                      children: "Active"
                    }
                  )
                ] }),
                order.customerId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Customer:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: order.customerId })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground mt-1", children: [
                  "₹",
                  Number(order.totalAmount).toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: !qrState ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1",
                  onClick: () => handleInlineQR(orderId, order.totalAmount),
                  disabled: generateQR.isPending,
                  "data-ocid": `merchant.pos.generate_qr.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" }),
                    "Generate QR"
                  ]
                }
              ) : qrState.expired ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1 border-destructive text-destructive",
                  onClick: () => setOrderQRMap((p) => {
                    const n = { ...p };
                    delete n[orderId];
                    return n;
                  }),
                  "data-ocid": `merchant.pos.qr_expired.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                    "Regenerate"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                QRTimerDisplay,
                {
                  qrData: qrState.qr.qrData,
                  amount: qrState.qr.amount,
                  expiresAt: qrState.qr.expiresAt,
                  onExpire: () => setOrderQRMap((p) => ({
                    ...p,
                    [orderId]: { ...p[orderId], expired: true }
                  })),
                  onRefresh: () => setOrderQRMap((p) => {
                    const n = { ...p };
                    delete n[orderId];
                    return n;
                  })
                }
              ) })
            ] })
          },
          orderId
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "completed", className: "mt-3 space-y-2", children: loadingCompleted ? ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) : completedOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-12 text-center text-muted-foreground",
          "data-ocid": "merchant.pos.completed.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 mb-3 mx-auto opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No completed orders yet" })
          ]
        }
      ) : completedOrders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pos-order-card border-l-4 border-l-muted-foreground",
          "data-ocid": `merchant.pos.completed_order.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm font-mono", children: [
                  "#",
                  String(order.id).slice(-8).toUpperCase()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  formatDate(order.completedAt ?? order.createdAt),
                  " ",
                  formatTime(order.completedAt ?? order.createdAt)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                "₹",
                Number(order.totalAmount).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Completed" })
          ] })
        },
        String(order.id)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "earnings", className: "mt-3 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-success" }),
            "Revenue Trend — Last 7 Days"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            LineChart,
            {
              data: revenueTrend,
              margin: { top: 4, right: 4, bottom: 0, left: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "day",
                    tick: { fontSize: 10 },
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 10 },
                    axisLine: false,
                    tickLine: false,
                    tickFormatter: (v) => `₹${v >= 1e3 ? `${(v / 1e3).toFixed(0)}k` : v}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    formatter: (v) => [
                      `₹${v.toLocaleString("en-IN")}`,
                      "Revenue"
                    ],
                    contentStyle: {
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: 11
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: "revenue",
                    stroke: "var(--success)",
                    strokeWidth: 2.5,
                    dot: { r: 3, fill: "var(--success)", strokeWidth: 0 },
                    activeDot: { r: 5 }
                  }
                )
              ]
            }
          ) })
        ] }),
        topProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-primary" }),
            "Top Products"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topProducts.slice(0, 5).map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3",
              "data-ocid": `merchant.pos.product.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-4 font-mono", children: idx + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: p.productName }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold", children: [
                  Number(p.orderCount),
                  " orders"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "₹",
                  p.totalRevenue.toLocaleString("en-IN")
                ] })
              ]
            },
            p.productId
          )) })
        ] })
      ] })
    ] })
  ] });
}
function SubscriptionLockGate({ onUnlock }) {
  const [passdigit, setPassdigit] = reactExports.useState("");
  const [qrCountdown, setQrCountdown] = reactExports.useState(120);
  const [timerStarted, setTimerStarted] = reactExports.useState(false);
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
    }, 1e3);
  }
  function handleUnlock() {
    if (passdigit.length < 4) {
      ue.error("Enter your 4-digit Passdigit to unlock");
      return;
    }
    onUnlock();
    ue.success("Subscription activated! Dashboard unlocked.");
  }
  const mins = Math.floor(qrCountdown / 60).toString().padStart(2, "0");
  const secs = (qrCountdown % 60).toString().padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-6",
      "data-ocid": "merchant.subscription-lock-gate",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-amber-600 dark:text-amber-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg", children: "Subscription Required" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Activate your Passdigit subscription to access your merchant dashboard." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-auto bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-700", children: "Locked" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-4 h-4 text-amber-500" }),
              " Enter Passdigit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                maxLength: 6,
                placeholder: "Enter 4–6 digit Passdigit",
                value: passdigit,
                onChange: (e) => setPassdigit(e.target.value),
                className: "mb-3 font-mono tracking-widest",
                "data-ocid": "merchant.passdigit.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full bg-amber-500 hover:bg-amber-600 text-white",
                onClick: handleUnlock,
                "data-ocid": "merchant.passdigit.submit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-4 h-4 mr-2" }),
                  " Unlock Dashboard"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-emerald-500" }),
              " Pay via UPI / Scan QR"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-32 h-32 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-border hover:border-amber-400 transition-colors",
                onClick: startTimer,
                title: "Click to generate QR",
                "data-ocid": "merchant.subscription-qr",
                children: timerStarted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-mono font-bold text-amber-500", children: [
                    mins,
                    ":",
                    secs
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "QR Valid" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-8 h-8 text-muted-foreground mx-auto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Click to generate" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "UPI: merchant@localbazar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center font-semibold text-foreground mt-1", children: "₹499/month — Premium Plan" })
          ] })
        ] })
      ]
    }
  );
}
function MerchantStatCard({
  title,
  value,
  icon: Icon,
  sublabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-l-4 border-l-amber-400 border border-border rounded-xl p-4 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-1", children: value }),
      sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sublabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-amber-600 dark:text-amber-400" }) })
  ] }) });
}
function BookingStatusBadge({ status }) {
  const MAP = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    accepted: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${MAP[status]}`,
      children: status
    }
  );
}
function ServiceTypeBadge({ type }) {
  const MAP = {
    appointment: {
      label: "Appointment",
      color: "text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-300"
    },
    rental: {
      label: "Rental",
      color: "text-violet-600 bg-violet-100 dark:bg-violet-900/30 dark:text-violet-300"
    },
    booking: {
      label: "Booking",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
    },
    scheduling: {
      label: "Scheduling",
      color: "text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-300"
    }
  };
  const { label, color } = MAP[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`,
      children: label
    }
  );
}
function EmployeesTab({ merchantId }) {
  const { data: employees = [] } = useListMerchantEmployees(merchantId);
  const { data: attendance = [] } = useGetTodayAttendance(merchantId);
  const { data: pendingLeaves = [] } = useGetMerchantPendingLeaves(merchantId);
  const addEmployee = useAddMerchantEmployee();
  const setActive = useSetMerchantEmployeeActive();
  const checkIn = useEmployeeCheckIn();
  const checkOut = useEmployeeCheckOut();
  const approveLeave = useApproveLeave();
  const rejectLeave = useRejectLeave();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [newPhone, setNewPhone] = reactExports.useState("");
  const [newRole, setNewRole] = reactExports.useState("cashier");
  const [checkInEmployeeId, setCheckInEmployeeId] = reactExports.useState("");
  const handleAddEmployee = async () => {
    if (!newName || !newPhone) return;
    await addEmployee.mutateAsync({
      merchantId,
      name: newName,
      phone: newPhone,
      role: newRole
    });
    setNewName("");
    setNewPhone("");
    setNewRole("cashier");
    setShowAdd(false);
  };
  const roleLabel = (role) => role === "cashier" ? "Cashier" : role === "store_manager" ? "Store Manager" : "Delivery Coordinator";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "staff", className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "staff", children: "Staff" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "attendance", children: "Attendance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "leave", children: "Leave" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "staff", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Employees" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: () => setShowAdd(true),
            "data-ocid": "employees.add_button",
            children: "Add Employee"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Employee" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: newName,
                onChange: (e) => setNewName(e.target.value),
                "data-ocid": "employees.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: newPhone,
                onChange: (e) => setNewPhone(e.target.value),
                "data-ocid": "employees.phone_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newRole, onValueChange: setNewRole, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "employees.role_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cashier", children: "Cashier" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "store_manager", children: "Store Manager" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "delivery_coordinator", children: "Delivery Coordinator" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: handleAddEmployee,
              "data-ocid": "employees.submit_button",
              children: "Add"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: employees.map((emp) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "employees.item", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between py-3 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: emp.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            emp.phone,
            " · ",
            roleLabel(emp.role)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: emp.isActive ? "default" : "secondary", children: emp.isActive ? "Active" : "Inactive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setActive.mutate({
                id: emp.id,
                merchantId,
                isActive: !emp.isActive
              }),
              children: emp.isActive ? "Deactivate" : "Activate"
            }
          )
        ] })
      ] }) }, emp.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "attendance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Today's Attendance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Employee ID",
              value: checkInEmployeeId,
              onChange: (e) => setCheckInEmployeeId(e.target.value),
              className: "w-40",
              "data-ocid": "attendance.employee_id_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: () => {
                if (checkInEmployeeId)
                  checkIn.mutate({
                    employeeId: checkInEmployeeId,
                    merchantId,
                    notes: ""
                  });
              },
              "data-ocid": "attendance.check_in_button",
              children: "Check In"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        attendance.map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "attendance.item", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between py-3 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
              rec.employeeId.slice(0, 8),
              "…"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "In:",
              " ",
              new Date(
                Number(rec.checkInTime / 1000000n)
              ).toLocaleTimeString(),
              " ",
              "·",
              " ",
              rec.checkOutTime ? `Out: ${new Date(Number(rec.checkOutTime / 1000000n)).toLocaleTimeString()}` : "On duty"
            ] })
          ] }),
          !rec.checkOutTime && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => checkOut.mutate({ attendanceId: rec.id, merchantId }),
              "data-ocid": "attendance.check_out_button",
              children: "Check Out"
            }
          )
        ] }) }, rec.id)),
        attendance.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "No attendance records for today." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "leave", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Pending Leave Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        pendingLeaves.map((lv) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "leave.item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
              lv.employeeId.slice(0, 8),
              "…"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              lv.startDate,
              " → ",
              lv.endDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: lv.reason })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: () => approveLeave.mutate({
                  id: lv.id,
                  merchantId,
                  approverNote: ""
                }),
                "data-ocid": "leave.approve_button",
                children: "Approve"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => rejectLeave.mutate({
                  id: lv.id,
                  merchantId,
                  approverNote: ""
                }),
                "data-ocid": "leave.reject_button",
                children: "Reject"
              }
            )
          ] })
        ] }) }) }, lv.id)),
        pendingLeaves.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "No pending leave requests." })
      ] })
    ] })
  ] });
}
function MerchantDashboardPage() {
  const [isUnlocked, setIsUnlocked] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [bookings, setBookings] = reactExports.useState([]);
  const [earningsView, setEarningsView] = reactExports.useState(
    "week"
  );
  const [posSession, setPosSession] = reactExports.useState(
    getSession
  );
  const merchantPhone = (posSession == null ? void 0 : posSession.phone) ?? "";
  const merchantId = posSession == null ? void 0 : posSession.merchantId;
  const merchantName = (posSession == null ? void 0 : posSession.name) ?? "Merchant";
  const {
    data: orders = [],
    isLoading: ordersLoading,
    refetch: refetchOrders,
    dataUpdatedAt
  } = useOrdersByMerchant(merchantId);
  const recentOrders = orders.slice(0, 10);
  const { data: testOrdersList = [] } = useTestOrders();
  const testOrderIds = new Set(testOrdersList.map((o) => o.id));
  const [lastRefreshed, setLastRefreshed] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    if (dataUpdatedAt) setLastRefreshed(new Date(dataUpdatedAt));
  }, [dataUpdatedAt]);
  const { data: subscriptionStatus } = useGetMerchantSubscriptionStatus(
    merchantId ?? ""
  );
  const { data: backendProducts = [] } = useProducts(merchantId ?? "");
  const { data: scanHistory = [] } = useGetProductScanHistory(
    merchantId ?? "",
    10
  );
  const addScan = useAddProductScanHistory();
  const deleteScan = useDeleteProductScanEntry();
  const lookupBarcode = useGetProductByBarcode();
  const [scanModalOpen, setScanModalOpen] = reactExports.useState(false);
  const [scanInput, setScanInput] = reactExports.useState("");
  const [scanResult, setScanResult] = reactExports.useState(null);
  const [scanError, setScanError] = reactExports.useState("");
  const [scanLoading, setScanLoading] = reactExports.useState(false);
  const isRestricted = !!(subscriptionStatus && (!subscriptionStatus.isActive || subscriptionStatus.isAtLimit));
  const restrictionMsg = (subscriptionStatus == null ? void 0 : subscriptionStatus.isActive) === false ? `Your plan "${(subscriptionStatus == null ? void 0 : subscriptionStatus.planName) ?? "Free"}" has expired. Please upgrade to add products.` : (subscriptionStatus == null ? void 0 : subscriptionStatus.isAtLimit) ? `You've reached the product limit (${(subscriptionStatus == null ? void 0 : subscriptionStatus.productLimit) ?? 0}) for your current plan. Upgrade to add more.` : "";
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
          barcodeValue: scanInput.trim()
        });
        await addScan.mutateAsync({
          merchantId: merchantId ?? "",
          productId: product.id,
          barcodeValue: scanInput.trim()
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
  function printLabel(name, price, barcode) {
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
  function handleBookingAction(id, action) {
    setBookings(
      (prev) => prev.map((b) => {
        if (b.id !== id) return b;
        return {
          ...b,
          status: {
            accept: "accepted",
            reject: "rejected",
            complete: "completed"
          }[action]
        };
      })
    );
    ue.success(
      `Booking ${id} ${action === "accept" ? "accepted" : action === "reject" ? "rejected" : "completed"}`
    );
  }
  const earningsTotal = { today: 0, week: 0, month: 0 };
  const revenueTrend = [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "role-header-merchant rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-5 h-5 text-amber-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Merchant Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          merchantName,
          merchantPhone ? ` · 📱 ${merchantPhone}` : "",
          " · Premium Plan"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-2", children: isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
        " Active"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 mr-1" }),
        " Subscription Required"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DashboardLinkBanner,
      {
        dashboardUrl: `${window.location.origin}/merchant-dashboard`,
        roleLabel: "Merchant",
        accentClass: "border-amber-300 dark:border-amber-700/50",
        iconBgClass: "bg-amber-100 dark:bg-amber-900/30",
        iconColorClass: "text-amber-600"
      }
    ),
    !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionLockGate, { onUnlock: () => setIsUnlocked(true) }),
    isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", "data-ocid": "merchant.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "overview", "data-ocid": "merchant.tab.overview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-3.5 h-3.5 mr-1" }),
          "Overview"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "orders", "data-ocid": "merchant.tab.orders", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5 mr-1" }),
          "Orders"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "products", "data-ocid": "merchant.tab.products", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 mr-1" }),
          "Products & Services"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "bookings", "data-ocid": "merchant.tab.bookings", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 mr-1" }),
          "Bookings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pos", "data-ocid": "merchant.tab.pos", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5 mr-1" }),
          "POS"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "lending", "data-ocid": "merchant.tab.lending", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-3.5 h-3.5 mr-1" }),
          "Lending"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "community", "data-ocid": "merchant.tab.community", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 mr-1" }),
          "Community"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "employees", "data-ocid": "merchant.tab.employees", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5 mr-1" }),
          "Employees"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "mt-4 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
            "data-ocid": "merchant.stats-grid",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MerchantStatCard,
                {
                  title: "Total Products",
                  value: "48",
                  icon: Package,
                  sublabel: "12 added this month"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MerchantStatCard,
                {
                  title: "Total Bookings",
                  value: "127",
                  icon: Calendar,
                  sublabel: "8 pending today"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MerchantStatCard,
                {
                  title: "Appointments",
                  value: "34",
                  icon: Clock,
                  sublabel: "3 upcoming today"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MerchantStatCard,
                {
                  title: "Rentals Active",
                  value: "7",
                  icon: Wrench,
                  sublabel: "2 ending today"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 text-center shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Customers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground mt-1", children: "342" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-500 mt-0.5", children: "+18 this month" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 text-center shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Avg Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-amber-500 mt-1", children: [
              "4.7 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 inline fill-amber-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "From 89 reviews" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 text-center shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Active Listings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground mt-1", children: "23" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Products + Services" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-card",
              "data-ocid": "merchant.pending-bookings-card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Pending Bookings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                    bookings.filter((b) => b.status === "pending").length,
                    " ",
                    "pending"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: bookings.slice(0, 3).map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border",
                    "data-ocid": `merchant.booking.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground truncate", children: booking.customerName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceTypeBadge, { type: booking.serviceType })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                          booking.date,
                          " · ",
                          booking.time,
                          " · ₹",
                          booking.amount
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status }),
                      booking.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => handleBookingAction(booking.id, "accept"),
                            className: "p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 text-emerald-600 transition-colors",
                            "aria-label": "Accept",
                            "data-ocid": `merchant.booking.accept.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => handleBookingAction(booking.id, "reject"),
                            className: "p-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 text-red-600 transition-colors",
                            "aria-label": "Reject",
                            "data-ocid": `merchant.booking.reject.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    ]
                  },
                  booking.id
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-5 shadow-card",
              "data-ocid": "merchant.earnings-card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Earnings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["today", "week", "month"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setEarningsView(v),
                      className: `px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${earningsView === v ? "bg-amber-500 text-white" : "text-muted-foreground hover:bg-muted"}`,
                      "data-ocid": `merchant.earnings.${v}`,
                      children: v.charAt(0).toUpperCase() + v.slice(1)
                    },
                    v
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-foreground", children: [
                    "₹",
                    earningsTotal[earningsView].toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-500 mt-1", children: [
                    "+12% vs last ",
                    earningsView
                  ] })
                ] }),
                earningsTotal[earningsView] > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  BarChart,
                  {
                    data: revenueTrend,
                    margin: { top: 0, right: 0, left: -20, bottom: 0 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        XAxis,
                        {
                          dataKey: "day",
                          tick: { fontSize: 10 },
                          tickLine: false
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        YAxis,
                        {
                          tick: { fontSize: 9 },
                          tickLine: false,
                          axisLine: false
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Tooltip,
                        {
                          contentStyle: TOOLTIP_STYLE,
                          formatter: (v) => [
                            `₹${v.toLocaleString("en-IN")}`,
                            "Earnings"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Bar,
                        {
                          dataKey: "revenue",
                          fill: "#f59e0b",
                          radius: [3, 3, 0, 0]
                        }
                      )
                    ]
                  }
                ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-[120px] text-muted-foreground text-sm", children: "No earnings data yet" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "merchant.orders-table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Live Orders" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                  "Auto-refreshes every 15s · Last updated",
                  " ",
                  lastRefreshed.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5",
                  onClick: () => refetchOrders(),
                  "data-ocid": "merchant.orders.refresh_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                    " Refresh"
                  ]
                }
              )
            ] }),
            ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }, i)) }) : recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-8 text-center",
                "data-ocid": "merchant.orders.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No orders yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              recentOrders.map((order, i) => {
                const o = order;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors",
                    "data-ocid": `merchant.order.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground w-16 truncate", children: String(o.id ?? "") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground truncate", children: String(o.customerId ?? "") }),
                      Boolean(o.customerPhone ?? o.deliveryPhone) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono hidden sm:inline", children: String(o.customerPhone ?? o.deliveryPhone ?? "") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium tabular-nums", children: [
                        "₹",
                        Number(o.totalAmount ?? 0).toLocaleString("en-IN")
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                        testOrderIds.has(String(o.id ?? "")) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-semibold", children: "Test Run" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: "text-xs capitalize",
                            children: String(o.status ?? "")
                          }
                        )
                      ] })
                    ]
                  },
                  String(o.id ?? i)
                );
              }),
              ")"
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "products", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "merchant.products-section",
          children: [
            isRestricted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mb-4 flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4",
                "data-ocid": "merchant.subscription.warning",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-destructive flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive", children: "Plan Limit Reached" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive/80 mt-0.5", children: restrictionMsg })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "gap-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-shrink-0",
                      "data-ocid": "merchant.subscription.buy_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5" }),
                        "Upgrade Plan"
                      ]
                    }
                  )
                ]
              }
            ),
            subscriptionStatus && !isRestricted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3 bg-success/10 border border-success/20 rounded-xl px-4 py-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-success flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-success flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: subscriptionStatus.planName }),
                " ",
                "plan active",
                subscriptionStatus.daysRemaining !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  " ",
                  "• ",
                  Number(subscriptionStatus.daysRemaining),
                  " days remaining"
                ] }),
                subscriptionStatus.productLimit !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  " ",
                  "• ",
                  Number(subscriptionStatus.productCount ?? 0),
                  "/",
                  Number(subscriptionStatus.productLimit),
                  " products"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Products & Services" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "gap-1.5",
                    onClick: () => {
                      setScanModalOpen(true);
                      setScanInput("");
                      setScanResult(null);
                      setScanError("");
                    },
                    "data-ocid": "merchant.scan_product_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" }),
                      "Scan Product"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "gap-1.5",
                    disabled: isRestricted,
                    title: isRestricted ? restrictionMsg : void 0,
                    "data-ocid": "merchant.add_product_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5" }),
                      "Add Product"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "gap-1.5 bg-amber-500 hover:bg-amber-600 text-white",
                    disabled: isRestricted,
                    title: isRestricted ? restrictionMsg : void 0,
                    "data-ocid": "merchant.add_service_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-3.5 h-3.5" }),
                      "Add Service"
                    ]
                  }
                )
              ] })
            ] }),
            scanModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4",
                "data-ocid": "merchant.scan.dialog",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-lg", children: "Scan / Enter Barcode" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setScanModalOpen(false),
                        className: "text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Close",
                        "data-ocid": "merchant.scan.close_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "barcode-input",
                        className: "text-sm text-muted-foreground",
                        children: "Barcode / SKU"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "barcode-input",
                          placeholder: "e.g. 8901234567890",
                          value: scanInput,
                          onChange: (e) => setScanInput(e.target.value),
                          onKeyDown: (e) => e.key === "Enter" && handleScanLookup(),
                          className: "flex-1",
                          "data-ocid": "merchant.scan.input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          onClick: handleScanLookup,
                          disabled: scanLoading || !scanInput.trim(),
                          "data-ocid": "merchant.scan.submit_button",
                          children: scanLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "flex items-center gap-2 text-xs text-primary cursor-pointer hover:underline w-fit",
                        "data-ocid": "merchant.scan.camera_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "file",
                              accept: "image/*",
                              capture: "environment",
                              className: "sr-only",
                              onChange: (e) => {
                                var _a;
                                const file = (_a = e.target.files) == null ? void 0 : _a[0];
                                if (file) {
                                  ue.info(
                                    "Photo captured. Enter the barcode number above."
                                  );
                                }
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" }),
                          "Use Camera to Capture Barcode"
                        ]
                      }
                    )
                  ] }),
                  scanError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2",
                      "data-ocid": "merchant.scan.error_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 flex-shrink-0" }),
                        scanError
                      ]
                    }
                  ),
                  scanResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "bg-success/10 border border-success/20 rounded-xl p-4 space-y-3",
                      "data-ocid": "merchant.scan.success_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: scanResult.title }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-amber-500", children: [
                              "₹",
                              scanResult.baseRate
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "outline",
                              className: "gap-1.5 flex-shrink-0",
                              onClick: () => printLabel(
                                scanResult.title,
                                scanResult.baseRate,
                                scanResult.barcodeValue
                              ),
                              "data-ocid": "merchant.scan.print_button",
                              children: "Print Label"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          BarcodeDisplay,
                          {
                            value: scanResult.barcodeValue,
                            width: 2,
                            height: 60,
                            showText: true,
                            className: "mx-auto"
                          }
                        ) })
                      ]
                    }
                  )
                ] })
              }
            ),
            backendProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-12 text-center text-muted-foreground",
                "data-ocid": "merchant.products.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 mb-3 mx-auto opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No products yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Add your first product or scan a barcode above." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: backendProducts.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/30 border border-border rounded-xl p-3 space-y-2",
                "data-ocid": `merchant.product.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs capitalize ml-1 flex-shrink-0",
                        children: "product"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-amber-500", children: [
                    "₹",
                    Number(item.baseRate)
                  ] }),
                  item.barcodeValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    BarcodeDisplay,
                    {
                      value: String(item.barcodeValue),
                      width: 1.5,
                      height: 40,
                      showText: false,
                      className: "w-full"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "flex-1 text-xs gap-1",
                        disabled: isRestricted,
                        title: isRestricted ? restrictionMsg : "Edit product",
                        "data-ocid": `merchant.product.edit_button.${i + 1}`,
                        children: "Edit"
                      }
                    ),
                    item.barcodeValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "flex-1 text-xs gap-1",
                        onClick: () => printLabel(
                          item.title,
                          Number(item.baseRate),
                          String(item.barcodeValue)
                        ),
                        "data-ocid": `merchant.product.print_button.${i + 1}`,
                        children: "Print"
                      }
                    )
                  ] })
                ]
              },
              String(item.id ?? i)
            )) }),
            scanHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Recent Scans" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  scanHistory.length,
                  " entries"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: scanHistory.slice(0, 5).map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 bg-muted/20 border border-border/50 rounded-lg px-3 py-2",
                  "data-ocid": `merchant.scan.history.item.${entry.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: entry.barcodeValue }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: entry.barcodeValue })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-muted-foreground hover:text-destructive transition-colors ml-auto",
                        onClick: () => deleteScan.mutate({
                          entryId: entry.id,
                          merchantId: merchantId ?? ""
                        }),
                        "aria-label": "Remove scan entry",
                        "data-ocid": "merchant.scan.history.delete_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ]
                },
                entry.id
              )) })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bookings", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "merchant.bookings-section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "All Bookings & Appointments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: bookings.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border",
                "data-ocid": `merchant.booking.full.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground", children: booking.customerName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceTypeBadge, { type: booking.serviceType })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      booking.date,
                      " · ",
                      booking.time,
                      " · ₹",
                      booking.amount
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status }),
                  booking.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-1 border-emerald-400 text-emerald-600 hover:bg-emerald-50",
                        onClick: () => handleBookingAction(booking.id, "accept"),
                        "data-ocid": `merchant.booking.full.accept.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                          "Accept"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-1 border-red-400 text-red-600 hover:bg-red-50",
                        onClick: () => handleBookingAction(booking.id, "reject"),
                        "data-ocid": `merchant.booking.full.reject.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                          "Reject"
                        ]
                      }
                    )
                  ] }),
                  booking.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "gap-1 border-blue-400 text-blue-600 hover:bg-blue-50",
                      onClick: () => handleBookingAction(booking.id, "complete"),
                      "data-ocid": `merchant.booking.full.complete.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                        "Mark Done"
                      ]
                    }
                  )
                ]
              },
              booking.id
            )) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pos", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", "data-ocid": "merchant.pos-section", children: !posSession ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        MerchantOTPLogin,
        {
          onSuccess: (s) => {
            saveSession(s);
            setPosSession(s);
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        MerchantPOSPanel,
        {
          session: posSession,
          onLogout: () => {
            clearSession();
            setPosSession(null);
          }
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "lending", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "merchant.lending-section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-4 h-4 text-amber-500" }),
              " Lending"
            ] }),
            (posSession == null ? void 0 : posSession.phone) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              LendingSection,
              {
                phone: posSession.phone,
                accentClass: "bg-amber-50/50 dark:bg-amber-950/20"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Log in via POS tab to view your lending items." })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "community", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 shadow-card",
          "data-ocid": "merchant.community-section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
              " Nearby Community"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySection, { city: "Gandhidham", maxItems: 10 })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "employees", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeesTab, { merchantId: (posSession == null ? void 0 : posSession.merchantId) ?? "" }) })
    ] }) }),
    !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 opacity-40 pointer-events-none",
          "aria-hidden": true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Advanced Analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 bg-muted rounded-lg animate-pulse" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center bg-destructive/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Activate Passdigit to unlock" })
      ] }) })
    ] })
  ] });
}
export {
  MerchantDashboardPage as default
};
