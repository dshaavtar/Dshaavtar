import { r as reactExports, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { X } from "./x-Chksmd6i.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
function QRTimerDisplay({
  qrData,
  amount,
  expiresAt,
  onExpire,
  onRefresh,
  onClose,
  validMinutes = 2
}) {
  const expiresAtMs = typeof expiresAt === "bigint" ? Number(expiresAt) : expiresAt;
  const [secondsLeft, setSecondsLeft] = reactExports.useState(
    () => Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1e3))
  );
  const [expired, setExpired] = reactExports.useState(secondsLeft <= 0);
  const expiredRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    expiredRef.current = false;
    setExpired(false);
    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAtMs - Date.now()) / 1e3)
      );
      setSecondsLeft(remaining);
      if (remaining <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        setExpired(true);
        onExpire();
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1e3);
    return () => clearInterval(interval);
  }, [expiresAtMs, onExpire]);
  const isCritical = secondsLeft <= 30 && !expired;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const encodedQR = encodeURIComponent(qrData);
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedQR}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pos-qr-container relative", "data-ocid": "qr_payment.dialog", children: [
    onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onClose,
        className: "absolute top-2 right-2 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10",
        "aria-label": "Close QR",
        "data-ocid": "qr_payment.close_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Scan to Pay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground", children: [
        "₹",
        amount.toLocaleString("en-IN")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: expired ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[200px] h-[200px] bg-muted rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive text-center px-4", children: "QR Expired" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: qrImageUrl,
          alt: "Payment QR Code",
          width: 200,
          height: 200,
          className: `rounded-lg border-2 transition-all ${isCritical ? "border-destructive animate-qr-pulse" : "border-border"}`
        }
      ) }),
      !expired ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Expires in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `pos-timer ${isCritical ? "pos-timer-critical" : "text-foreground"}`,
            "data-ocid": "qr_payment.timer",
            children: timeStr
          }
        ),
        isCritical && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-medium", children: "QR expiring soon!" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-semibold", children: "QR Expired — Do not accept payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: onRefresh,
            className: "gap-2",
            "data-ocid": "qr_payment.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
              "Generate New QR"
            ]
          }
        )
      ] }),
      !expired && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground text-center max-w-[180px]", children: [
        "Use any UPI app to scan. Valid for ",
        validMinutes,
        " ",
        validMinutes === 1 ? "minute" : "minutes",
        " only."
      ] })
    ] })
  ] });
}
export {
  QRTimerDisplay as Q
};
