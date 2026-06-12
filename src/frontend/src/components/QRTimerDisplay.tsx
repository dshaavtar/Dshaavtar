import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface QRTimerDisplayProps {
  qrData: string;
  amount: number;
  expiresAt: bigint | number; // ms timestamp (or bigint from backend)
  onExpire: () => void;
  onRefresh: () => void;
  onClose?: () => void;
  /** Optional: total validity duration in minutes, shown in hint text. Defaults to 2. */
  validMinutes?: number;
}

export default function QRTimerDisplay({
  qrData,
  amount,
  expiresAt,
  onExpire,
  onRefresh,
  onClose,
  validMinutes = 2,
}: QRTimerDisplayProps) {
  const expiresAtMs =
    typeof expiresAt === "bigint" ? Number(expiresAt) : expiresAt;
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1000)),
  );
  const [expired, setExpired] = useState(secondsLeft <= 0);
  const expiredRef = useRef(false);

  useEffect(() => {
    expiredRef.current = false;
    setExpired(false);
    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAtMs - Date.now()) / 1000),
      );
      setSecondsLeft(remaining);
      if (remaining <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        setExpired(true);
        onExpire();
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiresAtMs, onExpire]);

  const isCritical = secondsLeft <= 30 && !expired;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const encodedQR = encodeURIComponent(qrData);
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedQR}`;

  return (
    <div className="pos-qr-container relative" data-ocid="qr_payment.dialog">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
          aria-label="Close QR"
          data-ocid="qr_payment.close_button"
        >
          <X size={16} />
        </button>
      )}
      <div className="flex flex-col items-center gap-3">
        {/* Amount */}
        <p className="text-sm text-muted-foreground font-medium">Scan to Pay</p>
        <p className="text-2xl font-bold text-foreground">
          ₹{amount.toLocaleString("en-IN")}
        </p>

        {/* QR Code */}
        <div className="relative">
          {expired ? (
            <div className="w-[200px] h-[200px] bg-muted rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-destructive">
              <RefreshCw className="w-8 h-8 text-destructive" />
              <p className="text-sm font-semibold text-destructive text-center px-4">
                QR Expired
              </p>
            </div>
          ) : (
            <img
              src={qrImageUrl}
              alt="Payment QR Code"
              width={200}
              height={200}
              className={`rounded-lg border-2 transition-all ${
                isCritical
                  ? "border-destructive animate-qr-pulse"
                  : "border-border"
              }`}
            />
          )}
        </div>

        {/* Timer */}
        {!expired ? (
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-muted-foreground">Expires in</p>
            <span
              className={`pos-timer ${isCritical ? "pos-timer-critical" : "text-foreground"}`}
              data-ocid="qr_payment.timer"
            >
              {timeStr}
            </span>
            {isCritical && (
              <p className="text-xs text-destructive font-medium">
                QR expiring soon!
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-destructive font-semibold">
              QR Expired — Do not accept payment
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={onRefresh}
              className="gap-2"
              data-ocid="qr_payment.refresh_button"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Generate New QR
            </Button>
          </div>
        )}

        {/* UPI hint */}
        {!expired && (
          <p className="text-[10px] text-muted-foreground text-center max-w-[180px]">
            Use any UPI app to scan. Valid for {validMinutes}{" "}
            {validMinutes === 1 ? "minute" : "minutes"} only.
          </p>
        )}
      </div>
    </div>
  );
}
