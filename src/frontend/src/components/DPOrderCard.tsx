import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, MapPin, Package, QrCode, X } from "lucide-react";
import { useState } from "react";
import type { DeliveryPaymentQR } from "../types";
import QRTimerDisplay from "./QRTimerDisplay";

interface DPOrder {
  id: string;
  status: string;
  customerName?: string;
  customerAddress?: { address?: string };
  merchantName?: string;
  merchantAddress?: { address?: string };
  items?: Array<{ productName?: string; title?: string; quantity?: number }>;
  totalAmount?: number;
  deliveryCharge?: number;
  createdAt?: bigint | number;
}

interface DPOrderCardProps {
  order: DPOrder;
  index: number;
  /** Returns a DeliveryPaymentQR or throws */
  generateQR: (orderId: string, amount: number) => Promise<DeliveryPaymentQR>;
  onMarkCollected: (orderId: string) => Promise<void>;
  isMarkingCollected: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  assigned: "text-warning border-warning",
  pickedUp: "text-primary border-primary",
  onTheWay: "text-blue-500 border-blue-500",
  delivered: "text-success border-success",
  paymentCollected: "text-success border-success",
};

export default function DPOrderCard({
  order,
  index,
  generateQR,
  onMarkCollected,
  isMarkingCollected,
}: DPOrderCardProps) {
  const [activeQR, setActiveQR] = useState<DeliveryPaymentQR | null>(null);
  const [generating, setGenerating] = useState(false);

  const orderRaw = order as unknown as Record<string, unknown>;
  const pickupAddr =
    order.merchantAddress?.address ??
    (orderRaw.pickupAddress as string | undefined) ??
    "Pickup address N/A";
  const dropoffAddr =
    order.customerAddress?.address ??
    (orderRaw.dropoffAddress as string | undefined) ??
    "Dropoff address N/A";
  const items = order.items ?? [];
  const deliveryAmt = Number(order.deliveryCharge ?? 0);
  const statusColor =
    STATUS_COLORS[order.status] ?? "text-muted-foreground border-border";

  function formatTime(ts: bigint | number | undefined) {
    if (!ts) return "—";
    return new Date(Number(ts)).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleGenerate() {
    setGenerating(true);
    try {
      const qr = await generateQR(order.id, deliveryAmt);
      setActiveQR(qr);
    } catch {
      // ignore — parent toasts errors
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div
      className={`pos-order-card ${order.status === "assigned" ? "pos-order-card-pending" : "pos-order-card-confirmed"}`}
      data-ocid={`delivery_pos.order.${index}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="font-semibold text-sm font-mono">
              #{String(order.id).slice(-8).toUpperCase()}
            </span>
            <Badge
              variant="outline"
              className={`text-xs capitalize ${statusColor}`}
            >
              {order.status}
            </Badge>
          </div>
          {order.customerName && (
            <p className="text-sm font-medium text-foreground truncate">
              {order.customerName}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-sm">
            ₹{Number(order.totalAmount ?? 0).toLocaleString("en-IN")}
          </p>
          {deliveryAmt > 0 && (
            <p className="text-xs text-muted-foreground">
              +₹{deliveryAmt} delivery
            </p>
          )}
        </div>
      </div>

      {/* Addresses */}
      <div className="space-y-1 mb-3">
        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-warning" />
          <span className="min-w-0">
            <span className="font-medium text-foreground">Pickup: </span>
            <span className="truncate">{pickupAddr}</span>
          </span>
        </div>
        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-primary" />
          <span className="min-w-0">
            <span className="font-medium text-foreground">Dropoff: </span>
            <span className="truncate">{dropoffAddr}</span>
          </span>
        </div>
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div className="flex items-start gap-1.5 mb-3">
          <Package className="w-3 h-3 shrink-0 mt-0.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground line-clamp-2">
            {items
              .map(
                (it) =>
                  `${it.productName ?? it.title ?? "Item"}${
                    it.quantity && it.quantity > 1 ? ` ×${it.quantity}` : ""
                  }`,
              )
              .join(", ")}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {formatTime(order.createdAt)}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1 text-xs h-8 px-2.5"
            onClick={handleGenerate}
            disabled={generating || deliveryAmt <= 0}
            data-ocid={`delivery_pos.qr_button.${index}`}
          >
            <QrCode className="w-3.5 h-3.5" />
            {generating ? "..." : "Collect Pay"}
          </Button>
          <Button
            size="sm"
            className="gap-1 text-xs h-8 px-2.5 bg-success hover:bg-success/90 text-success-foreground"
            onClick={() => onMarkCollected(order.id)}
            disabled={isMarkingCollected}
            data-ocid={`delivery_pos.collected_button.${index}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </Button>
        </div>
      </div>

      {/* Per-card QR dialog */}
      {activeQR && (
        <dialog
          open
          className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center m-0 p-0 border-0 w-screen h-screen max-w-none max-h-none"
          aria-label="Payment QR Code"
          data-ocid="qr_payment.dialog"
          onKeyDown={(e) => e.key === "Escape" && setActiveQR(null)}
        >
          <div className="relative">
            <button
              type="button"
              className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-card rounded-full flex items-center justify-center border border-border shadow-card hover:bg-muted transition-colors"
              onClick={() => setActiveQR(null)}
              aria-label="Close QR"
              data-ocid="qr_payment.close_button"
            >
              <X className="w-4 h-4" />
            </button>
            <QRTimerDisplay
              qrData={activeQR.qrData}
              amount={activeQR.amount}
              expiresAt={activeQR.expiresAt}
              onExpire={() => {}}
              onRefresh={() => setActiveQR(null)}
            />
          </div>
        </dialog>
      )}
    </div>
  );
}
