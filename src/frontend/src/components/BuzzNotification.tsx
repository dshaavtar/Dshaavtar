import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface BuzzNotificationProps {
  hasNewOrder: boolean;
  onAcknowledge: () => void;
}

export default function BuzzNotification({
  hasNewOrder,
  onAcknowledge,
}: BuzzNotificationProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const buzzIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [pulse, setPulse] = useState(false);

  const playBuzz = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.4);
    } catch {
      // AudioContext may be blocked; ignore
    }
  }, []);

  useEffect(() => {
    if (hasNewOrder) {
      // Play immediately then loop
      playBuzz();
      setPulse(true);
      buzzIntervalRef.current = setInterval(() => {
        playBuzz();
      }, 2000);
    } else {
      setPulse(false);
      if (buzzIntervalRef.current) {
        clearInterval(buzzIntervalRef.current);
        buzzIntervalRef.current = null;
      }
    }
    return () => {
      if (buzzIntervalRef.current) {
        clearInterval(buzzIntervalRef.current);
        buzzIntervalRef.current = null;
      }
    };
  }, [hasNewOrder, playBuzz]);

  if (!hasNewOrder) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 bg-destructive text-destructive-foreground rounded-xl px-4 py-3 shadow-elevated transition-all ${
        pulse ? "animate-pulse" : ""
      }`}
      data-ocid="buzz_notification.toast"
      role="alert"
      aria-live="assertive"
    >
      <div className="relative">
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm tracking-wide uppercase">
          New Order!
        </span>
        <span className="text-xs opacity-90">Tap to acknowledge</span>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="text-destructive-foreground hover:bg-destructive-foreground/20 gap-1.5"
        onClick={onAcknowledge}
        data-ocid="buzz_notification.acknowledge_button"
      >
        <X className="w-4 h-4" />
        Dismiss
      </Button>
    </div>
  );
}
