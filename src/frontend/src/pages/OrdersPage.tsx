import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Package,
  QrCode,
  RefreshCw,
  Search,
  ShoppingCart,
  Star,
  Truck,
  User,
} from "lucide-react";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import {
  useAssignDeliveryPartner,
  useDeliveryOrders,
  useDeliveryPartners,
  useOrders,
  useSarthiRideBookings,
  useUpdateOrderStatus,
} from "../hooks/useBackend";
import { useDebounce, usePagination } from "../hooks/usePagination";
import {
  type Order,
  OrderStatus,
  type TransportBooking,
  TransportStatus,
} from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUSES: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New Order", value: OrderStatus.new_ },
  { label: "Waiting for Merchant", value: OrderStatus.pending },
  { label: "Merchant Accepted", value: OrderStatus.accepted },
  { label: "Rejected", value: OrderStatus.rejected },
  { label: "DP Assigned", value: OrderStatus.assigned },
  { label: "Out for Delivery", value: OrderStatus.inTransit },
  { label: "Delivered", value: OrderStatus.delivered },
  { label: "Payment Collected", value: OrderStatus.paymentCollected },
  { label: "Vendor Settled", value: OrderStatus.vendorSettled },
  { label: "Order Completed", value: OrderStatus.completed },
  { label: "Cancelled", value: OrderStatus.cancelled },
];

const STATUS_OPTIONS = [
  { label: "New Order", value: OrderStatus.new_ },
  { label: "Waiting for Merchant", value: OrderStatus.pending },
  { label: "Merchant Accepted", value: OrderStatus.accepted },
  { label: "Rejected", value: OrderStatus.rejected },
  { label: "Delivery Partner Assigned", value: OrderStatus.assigned },
  { label: "Out for Delivery", value: OrderStatus.inTransit },
  { label: "Delivered", value: OrderStatus.delivered },
  { label: "Payment Collected", value: OrderStatus.paymentCollected },
  { label: "Vendor Settled", value: OrderStatus.vendorSettled },
  { label: "Order Completed", value: OrderStatus.completed },
  { label: "Cancelled", value: OrderStatus.cancelled },
];

type TabId = "commerce" | "delivery" | "sarthi";

const TRANSPORT_STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  [TransportStatus.pending]: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  [TransportStatus.accepted]: {
    label: "Accepted",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  [TransportStatus.headingToPickup]: {
    label: "Heading to Pickup",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  [TransportStatus.arrived]: {
    label: "Arrived",
    className: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  [TransportStatus.rideStarted]: {
    label: "Ride Started",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  [TransportStatus.onTheWay]: {
    label: "On the Way",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  [TransportStatus.arrivedDestination]: {
    label: "Arrived Destination",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  [TransportStatus.paymentCollected]: {
    label: "Payment Collected",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  [TransportStatus.completed]: {
    label: "Completed",
    className: "bg-muted text-muted-foreground border-border",
  },
  [TransportStatus.cancelled]: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

// ─── Export helpers ───────────────────────────────────────────────────────────

function exportToCSV(orders: Order[]) {
  const headers = [
    "Order ID",
    "Customer",
    "Merchant",
    "Items",
    "Total",
    "Delivery",
    "Status",
    "Payment",
    "Created At",
  ];
  const rows = orders.map((o) => [
    o.id,
    o.customerId,
    o.merchantId,
    o.items.length,
    o.totalAmount,
    o.deliveryCharge,
    o.status,
    o.paymentMode,
    new Date(Number(o.createdAt)).toLocaleDateString("en-IN"),
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orders-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── QR Payment helpers ───────────────────────────────────────────────────────

function buildUpiQrUrl(
  upiId: string,
  name: string,
  amount: number,
  ref: string,
) {
  const data = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(ref)}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
}

function useQRTimer(active: boolean) {
  const TWO_MIN = 120_000;
  const [secondsLeft, setSecondsLeft] = useState(TWO_MIN / 1000);
  const [expired, setExpired] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: refreshCount triggers timer restart
  useEffect(() => {
    if (!active) return;
    setExpired(false);
    setSecondsLeft(TWO_MIN / 1000);
    const end = Date.now() + TWO_MIN;
    const iv = setInterval(() => {
      const rem = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setSecondsLeft(rem);
      if (rem === 0) {
        setExpired(true);
        clearInterval(iv);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [active, refreshCount]);

  return {
    secondsLeft,
    expired,
    refresh: () => setRefreshCount((c) => c + 1),
  };
}

function PaymentQRModal({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) {
  const { secondsLeft, expired, refresh } = useQRTimer(!!order);

  if (!order) return null;

  const upiId = "localbazar@upi";
  const merchantName = order.merchantId ?? "Merchant";
  const amount = order.totalAmount;
  const orderId = order.id;
  const isCritical = secondsLeft <= 30 && !expired;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const qrUrl = buildUpiQrUrl(upiId, merchantName, amount, `Order-${orderId}`);

  return (
    <Dialog open={!!order} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="order_payment.dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <QrCode className="w-4 h-4 text-primary" />
            Payment QR — Order {orderId}
          </DialogTitle>
        </DialogHeader>

        {/* Order summary */}
        <div className="bg-muted/40 rounded-xl p-3 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Merchant</span>
            <span className="font-medium">{merchantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items</span>
            <span className="font-medium">{order.items.length}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-1 mt-1">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-primary">
              ₹{amount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-3">
          {expired ? (
            <div className="w-[200px] h-[200px] bg-muted rounded-xl border-2 border-dashed border-destructive flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-8 h-8 text-destructive" />
              <p className="text-sm font-semibold text-destructive text-center">
                QR Expired
              </p>
              <p className="text-xs text-muted-foreground text-center px-4">
                Do not accept payment on this QR
              </p>
            </div>
          ) : (
            <div className="bg-card border-2 border-border rounded-xl p-2 shadow-sm">
              <img
                src={qrUrl}
                alt="Payment QR Code"
                width={200}
                height={200}
                className={`rounded-lg transition-all ${isCritical ? "animate-qr-pulse" : ""}`}
                data-ocid="order_payment.qr_code"
              />
            </div>
          )}

          {/* Timer */}
          {!expired ? (
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-muted-foreground">Expires in</p>
              <span
                className={`font-mono text-xl font-semibold tabular-nums ${isCritical ? "text-destructive" : "text-foreground"}`}
                data-ocid="order_payment.timer"
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
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={refresh}
              data-ocid="order_payment.refresh_button"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Generate New QR
            </Button>
          )}

          <p className="text-[10px] text-muted-foreground text-center max-w-[180px]">
            Use any UPI app to scan. Valid for 2 minutes only.
          </p>
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="order_payment.cancel_button"
          >
            Cancel Order
          </Button>
          <Button
            className="flex-1"
            onClick={onClose}
            data-ocid="order_payment.paid_button"
          >
            I've Paid ✓
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      data-ocid="orders.empty_state"
    >
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Package className="w-7 h-7 text-muted-foreground" />
      </div>
      <p className="font-semibold text-foreground mb-1">
        No {label} records yet
      </p>
      <p className="text-sm text-muted-foreground max-w-xs">
        Load sample data from the dashboard to get started, or wait for new
        records to appear.
      </p>
    </div>
  );
}

// ─── Order Detail Sheet ───────────────────────────────────────────────────────

function OrderDetailSheet({
  order,
  onClose,
}: { order: Order | null; onClose: () => void }) {
  if (!order) return null;
  return (
    <Sheet open={!!order} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <span className="font-mono text-base">{order.id}</span>
            <StatusBadge type="order" value={order.status} />
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-5">
          <div className="bg-muted/30 rounded-xl p-4 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Customer
            </p>
            <div className="flex items-center gap-2 mt-1">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{order.customerId}</span>
            </div>
            {order.customerAddress && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {order.customerAddress.address}
                </span>
              </div>
            )}
          </div>

          <div className="bg-muted/30 rounded-xl p-4 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Merchant
            </p>
            <span className="text-sm font-medium">{order.merchantId}</span>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Items
            </p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {Number(item.quantity)} × ₹{item.unitRate}
                    </p>
                  </div>
                  <span className="font-medium text-sm">
                    ₹{item.totalRate.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-xl overflow-hidden">
            <div className="flex justify-between px-4 py-2.5 bg-muted/20 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>
                ₹
                {(
                  order.totalAmount -
                  order.deliveryCharge -
                  (order.surgeCharge ?? 0)
                ).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5 text-sm border-t border-border/40">
              <span className="text-muted-foreground">Delivery</span>
              <span>₹{order.deliveryCharge}</span>
            </div>
            {(order.surgeCharge ?? 0) > 0 && (
              <div className="flex justify-between px-4 py-2.5 text-sm border-t border-border/40">
                <span className="text-muted-foreground">Surge</span>
                <span>₹{order.surgeCharge}</span>
              </div>
            )}
            <div className="flex justify-between px-4 py-2.5 text-sm font-semibold border-t border-border">
              <span>Total</span>
              <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-muted/20 rounded-xl p-4">
            <span className="text-sm text-muted-foreground">Payment</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{order.paymentMode}</Badge>
              <StatusBadge type="custom" value={order.paymentStatus} />
            </div>
          </div>

          {order.deliveryPartnerId && (
            <div className="bg-muted/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Delivery Partner
              </p>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {order.deliveryPartnerId}
                </span>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Status Timeline
            </p>
            {order.statusHistory && order.statusHistory.length > 0 ? (
              <div className="space-y-1.5">
                {order.statusHistory.map((h, i) => (
                  <div
                    key={`${h.status}-${i}`}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className="flex flex-col items-center gap-0.5 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      {i < order.statusHistory.length - 1 && (
                        <div className="w-px h-4 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <StatusBadge type="order" value={h.status} />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(Number(h.timestamp)).toLocaleString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                        by {String(h.actor).replace(/([A-Z])/g, " $1")}
                        {h.note ? ` · ${h.note}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {[
                  { label: "Order Created", ts: order.createdAt },
                  { label: "Merchant Accepted", ts: order.merchantAcceptedAt },
                  { label: "DP Assigned", ts: order.assignedAt },
                  { label: "Picked Up", ts: order.pickedUpAt },
                  { label: "Delivered", ts: order.deliveredAt },
                  { label: "Payment Collected", ts: order.paymentCollectedAt },
                  { label: "Vendor Settled", ts: order.vendorSettledAt },
                  { label: "Order Completed", ts: order.completedAt },
                  { label: "Cancelled", ts: order.cancelledAt },
                ]
                  .filter((e) => e.ts)
                  .map((e) => (
                    <div
                      key={e.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{e.label}</span>
                      <span className="text-xs">
                        {new Date(Number(e.ts)).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Sarthi Booking Detail Sheet ──────────────────────────────────────────────

function SarthiDetailSheet({
  booking,
  onClose,
}: { booking: TransportBooking | null; onClose: () => void }) {
  if (!booking) return null;
  const cfg = TRANSPORT_STATUS_CONFIG[String(booking.status)] ?? {
    label: String(booking.status),
    className: "bg-muted text-muted-foreground",
  };
  return (
    <Sheet open={!!booking} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2 flex-wrap">
            <span className="font-mono text-base">{booking.id}</span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`}
            >
              {cfg.label}
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-5">
          <div className="bg-muted/30 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Customer
            </p>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{booking.customerId}</span>
            </div>
          </div>

          {booking.sarthiPartnerId && (
            <div className="bg-muted/30 rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Sarthi Partner
              </p>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {booking.sarthiPartnerId}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/20 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">From</p>
              <p className="text-sm font-medium">{booking.origin.address}</p>
            </div>
            <div className="bg-muted/20 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">To</p>
              <p className="text-sm font-medium">
                {booking.destination.address}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/20 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
              <p className="text-sm font-medium capitalize">
                {String(booking.vehicleType)}
              </p>
            </div>
            <div className="bg-muted/20 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Est. Charge</p>
              <p className="text-sm font-semibold">
                ₹{booking.estimatedCharge.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="bg-muted/20 rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">Created</p>
            <p className="text-sm">
              {new Date(Number(booking.createdAt)).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {booking.statusHistory && booking.statusHistory.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Status Timeline
              </p>
              <div className="space-y-1.5">
                {booking.statusHistory.map((h, i) => (
                  <div
                    key={`${String(h.status)}-${i}`}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className="flex flex-col items-center gap-0.5 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      {i < booking.statusHistory.length - 1 && (
                        <div className="w-px h-4 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium capitalize">
                        {String(h.status).replace(/([A-Z])/g, " $1")}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(Number(h.timestamp)).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Assign DP Modal ──────────────────────────────────────────────────────────

function AssignDPModal({
  order,
  onClose,
  onAssigned,
}: {
  order: Order | null;
  onClose: () => void;
  onAssigned: () => void;
}) {
  const { data: dps = [] } = useDeliveryPartners();
  const [selectedDp, setSelectedDp] = useState<string>("");
  const assignDP = useAssignDeliveryPartner();

  if (!order) return null;

  async function handleAssign() {
    if (!selectedDp || !order) return;
    try {
      await assignDP.mutateAsync({ orderId: order.id, dpId: selectedDp });
      onAssigned();
      onClose();
    } catch {
      // error handled by mutation
    }
  }

  return (
    <Dialog open={!!order} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Delivery Partner</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Order: <span className="font-mono font-medium">{order.id}</span>
        </p>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {dps.map((dp) => (
            <button
              key={dp.id}
              type="button"
              onClick={() => setSelectedDp(dp.id)}
              className={`w-full text-left p-3 rounded-xl border transition-colors ${
                selectedDp === dp.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{dp.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {dp.vehicleType} · ₹{dp.ratePerKm}/km
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs">{dp.avgRating}</span>
                  </div>
                  <span
                    className={`text-xs font-medium ${dp.isOnline ? "text-emerald-600" : "text-muted-foreground"}`}
                  >
                    {dp.isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleAssign}
            disabled={!selectedDp || assignDP.isPending}
            data-ocid="assign-dp-confirm"
          >
            {assignDP.isPending ? "Assigning…" : "Assign"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Update Status Modal ──────────────────────────────────────────────────────

function UpdateStatusModal({
  order,
  onClose,
  onUpdated,
}: {
  order: Order | null;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [newStatus, setNewStatus] = useState<OrderStatus | "">("");
  const updateStatus = useUpdateOrderStatus();

  if (!order) return null;

  async function handleUpdate() {
    if (!newStatus || !order) return;
    try {
      await updateStatus.mutateAsync({
        id: order.id,
        status: newStatus as OrderStatus,
      });
      onUpdated();
      onClose();
    } catch {
      // error handled by mutation
    }
  }

  return (
    <Dialog open={!!order} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Order: <span className="font-mono font-medium">{order.id}</span>
        </p>
        <div className="space-y-3">
          <Label htmlFor="new-status">New Status</Label>
          <Select
            value={newStatus}
            onValueChange={(v) => setNewStatus(v as OrderStatus)}
          >
            <SelectTrigger id="new-status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleUpdate}
            disabled={!newStatus || updateStatus.isPending}
            data-ocid="update-status-confirm"
          >
            {updateStatus.isPending ? "Updating…" : "Update Status"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Commerce Orders Tab ──────────────────────────────────────────────────────

function CommerceOrdersTab() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [ondcFilter, setOndcFilter] = useState<"all" | "ondc" | "regular">(
    "all",
  );
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [assignDPOrder, setAssignDPOrder] = useState<Order | null>(null);
  const [updateStatusOrder, setUpdateStatusOrder] = useState<Order | null>(
    null,
  );
  const [paymentQROrder, setPaymentQROrder] = useState<Order | null>(null);
  const [bulkStatusDialog, setBulkStatusDialog] = useState(false);
  const [bulkNewStatus, setBulkNewStatus] = useState<OrderStatus | "">("");
  const [orderIdSort, setOrderIdSort] = useState<"asc" | "desc" | null>(null);

  const { data: allOrders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();

  const ondcCount = allOrders.filter(
    (o) => (o as unknown as Record<string, unknown>).ondcSource === true,
  ).length;

  const filtered = useMemo(() => {
    let result = allOrders;
    if (statusFilter !== "all")
      result = result.filter((o) => o.status === statusFilter);
    if (ondcFilter === "ondc")
      result = result.filter(
        (o) => (o as unknown as Record<string, unknown>).ondcSource === true,
      );
    else if (ondcFilter === "regular")
      result = result.filter(
        (o) => (o as unknown as Record<string, unknown>).ondcSource !== true,
      );
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerId.toLowerCase().includes(q) ||
          o.merchantId.toLowerCase().includes(q),
      );
    }
    if (orderIdSort === "asc")
      result = [...result].sort((a, b) => a.id.localeCompare(b.id));
    else if (orderIdSort === "desc")
      result = [...result].sort((a, b) => b.id.localeCompare(a.id));
    return result;
  }, [allOrders, statusFilter, ondcFilter, search, orderIdSort]);

  const pagination = usePagination(filtered);

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((o) => o.id)));
  }

  async function handleBulkUpdate() {
    if (!bulkNewStatus) return;
    try {
      await Promise.all(
        Array.from(selected).map((id) =>
          updateStatus.mutateAsync({
            id,
            status: bulkNewStatus as OrderStatus,
          }),
        ),
      );
      setSelected(new Set());
      setBulkStatusDialog(false);
      setBulkNewStatus("");
    } catch {
      // handled
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, customer, merchant…"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              pagination.resetPage();
            }}
            className="pl-9"
            data-ocid="orders-search"
          />
        </div>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBulkStatusDialog(true)}
              data-ocid="orders-bulk-update"
            >
              Bulk Update ({selected.size})
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(filtered)}
            className="gap-2"
            data-ocid="orders-export"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Status pills */}
      <div className="flex gap-1.5 flex-wrap" data-ocid="orders-status-filter">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setStatusFilter(s.value)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors font-medium ${
              statusFilter === s.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {s.label}
            {s.value !== "all" && (
              <span className="ml-1.5 opacity-70">
                {allOrders.filter((o) => o.status === s.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ONDC filter */}
      <div className="flex gap-1.5" data-ocid="orders.ondc_filter">
        {(
          [
            { label: "All Sources", value: "all" as const },
            {
              label: `ONDC (${ondcCount})`,
              value: "ondc" as const,
            },
            { label: "Regular", value: "regular" as const },
          ] as const
        ).map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setOndcFilter(f.value)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors font-medium ${
              ondcFilter === f.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-card text-muted-foreground border-border hover:border-blue-400 hover:text-foreground"
            }`}
            data-ocid={`orders.ondc_filter.${f.value}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 w-10">
                <Checkbox
                  checked={
                    selected.size === filtered.length && filtered.length > 0
                  }
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                  data-ocid="orders-select-all"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                <button
                  type="button"
                  onClick={() =>
                    setOrderIdSort((prev) =>
                      prev === null ? "asc" : prev === "asc" ? "desc" : null,
                    )
                  }
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  data-ocid="orders.order-id-sort"
                  aria-label="Sort by Order ID"
                >
                  Order ID
                  <span className="text-base leading-none">
                    {orderIdSort === "asc"
                      ? "↑"
                      : orderIdSort === "desc"
                        ? "↓"
                        : "↕"}
                  </span>
                </button>
              </th>
              {[
                "Customer",
                "Merchant",
                "Items",
                "Total (₹)",
                "Delivery (₹)",
                "Status",
                "Payment",
                "Created",
                "Actions",
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
            {isLoading ? (
              Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((id) => (
                <tr key={id} className="border-b border-border/50">
                  {Array.from({ length: 10 }, (_, j) => `sk-cell-${j}`).map(
                    (cid) => (
                      <td key={cid} className="px-4 py-3">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                      </td>
                    ),
                  )}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={11}>
                  <EmptyState label="commerce order" />
                </td>
              </tr>
            ) : (
              pagination.items.map((order, idx) => (
                <tr
                  key={order.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={`commerce-orders.item.${idx + 1}`}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selected.has(order.id)}
                      onCheckedChange={() => toggleRow(order.id)}
                      aria-label={`Select order ${order.id}`}
                      data-ocid="orders-row-checkbox"
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs font-medium">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {order.id}
                      {(order as unknown as Record<string, unknown>)
                        .ondcSource === true && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                          ONDC
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground truncate max-w-[100px]">
                    {order.customerId}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground truncate max-w-[100px]">
                    {order.merchantId}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {order.items.length}
                  </td>
                  <td className="px-4 py-3 font-medium tabular-nums">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">
                    ₹{order.deliveryCharge}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge type="order" value={order.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {order.paymentMode}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(Number(order.createdAt)).toLocaleDateString(
                      "en-IN",
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 flex-nowrap">
                      <button
                        type="button"
                        onClick={() => setDetailOrder(order)}
                        className="px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors whitespace-nowrap"
                        data-ocid="orders-view-detail"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateStatusOrder(order)}
                        className="px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors whitespace-nowrap"
                        data-ocid="orders-update-status"
                      >
                        Status
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentQROrder(order)}
                        className="px-2 py-1 text-xs rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors whitespace-nowrap"
                        data-ocid="orders-show-payment-qr"
                        aria-label="Show payment QR"
                        title="Show Payment QR"
                      >
                        <QrCode className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssignDPOrder(order)}
                        className="px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors whitespace-nowrap"
                        data-ocid="orders-assign-dp"
                        aria-label="Assign delivery partner"
                      >
                        <Truck className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div
          className="flex items-center justify-between"
          data-ocid="commerce-orders.pagination"
        >
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} ·{" "}
            {filtered.length} orders
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={pagination.prevPage}
              disabled={pagination.page === 1}
              data-ocid="commerce-orders.pagination_prev"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from(
              { length: Math.min(pagination.totalPages, 7) },
              (_, i) => {
                const start = Math.max(1, pagination.page - 3);
                const p = start + i;
                if (p > pagination.totalPages) return null;
                return (
                  <Button
                    key={p}
                    size="sm"
                    variant={p === pagination.page ? "default" : "outline"}
                    className="h-8 w-8 p-0 text-xs"
                    onClick={() => pagination.goToPage(p)}
                    data-ocid={`commerce-orders.pagination.page.${p}`}
                  >
                    {p}
                  </Button>
                );
              },
            )}
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={pagination.nextPage}
              disabled={pagination.page === pagination.totalPages}
              data-ocid="commerce-orders.pagination_next"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Bulk status dialog */}
      <Dialog
        open={bulkStatusDialog}
        onOpenChange={(o) => !o && setBulkStatusDialog(false)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Bulk Update Status</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {selected.size} orders selected
          </p>
          <Select
            value={bulkNewStatus}
            onValueChange={(v) => setBulkNewStatus(v as OrderStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2 justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBulkStatusDialog(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleBulkUpdate}
              disabled={!bulkNewStatus || updateStatus.isPending}
              data-ocid="orders-bulk-confirm"
            >
              {updateStatus.isPending
                ? "Updating…"
                : `Update ${selected.size} Orders`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <OrderDetailSheet
        order={detailOrder}
        onClose={() => setDetailOrder(null)}
      />
      <AssignDPModal
        order={assignDPOrder}
        onClose={() => setAssignDPOrder(null)}
        onAssigned={() => {}}
      />
      <UpdateStatusModal
        order={updateStatusOrder}
        onClose={() => setUpdateStatusOrder(null)}
        onUpdated={() => {}}
      />
      <PaymentQRModal
        order={paymentQROrder}
        onClose={() => setPaymentQROrder(null)}
      />
    </div>
  );
}

// ─── Delivery Orders Tab ──────────────────────────────────────────────────────

function DeliveryOrdersTab() {
  const { data: deliveryOrders = [], isLoading } = useDeliveryOrders();
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [updateStatusOrder, setUpdateStatusOrder] = useState<Order | null>(
    null,
  );
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);

  const filtered = useMemo(() => {
    if (!search.trim()) return deliveryOrders;
    const q = search.toLowerCase();
    return deliveryOrders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customerId.toLowerCase().includes(q) ||
        o.merchantId.toLowerCase().includes(q) ||
        (o.deliveryPartnerId ?? "").toLowerCase().includes(q),
    );
  }, [deliveryOrders, search]);

  const pagination = usePagination(filtered);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, customer, merchant, DP…"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              pagination.resetPage();
            }}
            className="pl-9"
            data-ocid="delivery-orders-search"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {[
                "Order ID",
                "Customer",
                "Merchant",
                "Delivery Partner",
                "Items",
                "Total (₹)",
                "Status",
                "Updated At",
                "Actions",
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
            {isLoading ? (
              Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((id) => (
                <tr key={id} className="border-b border-border/50">
                  {Array.from({ length: 9 }, (_, j) => `sk-${j}`).map((cid) => (
                    <td key={cid} className="px-4 py-3">
                      <div className="h-4 bg-muted animate-pulse rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={9}>
                  <EmptyState label="delivery order" />
                </td>
              </tr>
            ) : (
              pagination.items.map((order, idx) => (
                <tr
                  key={order.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={`delivery-orders.item.${idx + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs font-medium">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground truncate max-w-[100px]">
                    {order.customerId}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground truncate max-w-[100px]">
                    {order.merchantId}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs truncate max-w-[100px]">
                        {order.deliveryPartnerId ?? "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {order.items.length}
                  </td>
                  <td className="px-4 py-3 font-medium tabular-nums">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge type="order" value={order.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(
                      Number(
                        order.deliveredAt ??
                          order.assignedAt ??
                          order.acceptedAt ??
                          order.createdAt,
                      ),
                    ).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDetailOrder(order)}
                        className="px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors"
                        data-ocid="delivery-orders-view-detail"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateStatusOrder(order)}
                        className="px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors"
                        data-ocid="delivery-orders-update-status"
                      >
                        Status
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OrderDetailSheet
        order={detailOrder}
        onClose={() => setDetailOrder(null)}
      />
      <UpdateStatusModal
        order={updateStatusOrder}
        onClose={() => setUpdateStatusOrder(null)}
        onUpdated={() => {}}
      />
      {pagination.totalPages > 1 && (
        <div
          className="flex items-center justify-between"
          data-ocid="delivery-orders.pagination"
        >
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} ·{" "}
            {filtered.length} orders
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5"
              onClick={pagination.prevPage}
              disabled={pagination.page === 1}
              data-ocid="delivery-orders.pagination_prev"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </Button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {pagination.page} / {pagination.totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5"
              onClick={pagination.nextPage}
              disabled={pagination.page === pagination.totalPages}
              data-ocid="delivery-orders.pagination_next"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sarthi Rides Tab ─────────────────────────────────────────────────────────

function SarthiRidesTab() {
  const { data: rides = [], isLoading } = useSarthiRideBookings();
  const [detailBooking, setDetailBooking] = useState<TransportBooking | null>(
    null,
  );
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);

  const filtered = useMemo(() => {
    if (!search.trim()) return rides;
    const q = search.toLowerCase();
    return rides.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.customerId.toLowerCase().includes(q) ||
        (r.sarthiPartnerId ?? "").toLowerCase().includes(q) ||
        r.origin.address.toLowerCase().includes(q) ||
        r.destination.address.toLowerCase().includes(q),
    );
  }, [rides, search]);

  const pagination = usePagination(filtered);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by booking ID, customer, partner, location…"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              pagination.resetPage();
            }}
            className="pl-9"
            data-ocid="sarthi-rides-search"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {[
                "Booking ID",
                "Customer",
                "Sarthi Partner",
                "Vehicle",
                "Origin",
                "Destination",
                "Charge (₹)",
                "Status",
                "Created At",
                "Actions",
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
            {isLoading ? (
              Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((id) => (
                <tr key={id} className="border-b border-border/50">
                  {Array.from({ length: 10 }, (_, j) => `sk-${j}`).map(
                    (cid) => (
                      <td key={cid} className="px-4 py-3">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                      </td>
                    ),
                  )}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={10}>
                  <EmptyState label="Sarthi ride" />
                </td>
              </tr>
            ) : (
              pagination.items.map((ride, idx) => {
                const cfg = TRANSPORT_STATUS_CONFIG[String(ride.status)] ?? {
                  label: String(ride.status),
                  className: "bg-muted text-muted-foreground border-border",
                };
                return (
                  <tr
                    key={ride.id}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`sarthi-rides.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium">
                      {ride.id}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[90px]">
                      {ride.customerId}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[90px]">
                      {ride.sarthiPartnerId ?? "—"}
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">
                      {String(ride.vehicleType)}
                    </td>
                    <td className="px-4 py-3 truncate max-w-[100px] text-muted-foreground">
                      {ride.origin.address}
                    </td>
                    <td className="px-4 py-3 truncate max-w-[100px] text-muted-foreground">
                      {ride.destination.address}
                    </td>
                    <td className="px-4 py-3 font-medium tabular-nums">
                      ₹{ride.estimatedCharge.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`}
                      >
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                      {new Date(Number(ride.createdAt)).toLocaleDateString(
                        "en-IN",
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setDetailBooking(ride)}
                        className="px-2 py-1 text-xs rounded-md border border-border hover:bg-muted transition-colors"
                        data-ocid="sarthi-rides-view-detail"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <SarthiDetailSheet
        booking={detailBooking}
        onClose={() => setDetailBooking(null)}
      />
      {pagination.totalPages > 1 && (
        <div
          className="flex items-center justify-between"
          data-ocid="sarthi-rides.pagination"
        >
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} ·{" "}
            {filtered.length} rides
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5"
              onClick={pagination.prevPage}
              disabled={pagination.page === 1}
              data-ocid="sarthi-rides.pagination_prev"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </Button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {pagination.page} / {pagination.totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5"
              onClick={pagination.nextPage}
              disabled={pagination.page === pagination.totalPages}
              data-ocid="sarthi-rides.pagination_next"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  // Persist active tab in URL query param
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const initialTab = (searchParams.get("tab") as TabId | null) ?? "commerce";
  const [activeTab, setActiveTab] = useState<TabId>(
    ["commerce", "delivery", "sarthi"].includes(initialTab)
      ? initialTab
      : "commerce",
  );

  const { data: allOrders = [] } = useOrders();
  const { data: deliveryOrders = [] } = useDeliveryOrders();
  const { data: sarthiRides = [] } = useSarthiRideBookings();

  function switchTab(tab: TabId) {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
  }

  const tabs: { id: TabId; label: string; icon: ReactNode; count: number }[] = [
    {
      id: "commerce",
      label: "Commerce Orders",
      icon: <ShoppingCart className="w-4 h-4" />,
      count: allOrders.length,
    },
    {
      id: "delivery",
      label: "Delivery Orders",
      icon: <Truck className="w-4 h-4" />,
      count: deliveryOrders.length,
    },
    {
      id: "sarthi",
      label: "Sarthi Rides",
      icon: <MapPin className="w-4 h-4" />,
      count: sarthiRides.length,
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Orders
        </h2>
        <p className="text-sm text-muted-foreground">
          {allOrders.length} commerce · {deliveryOrders.length} delivery ·{" "}
          {sarthiRides.length} rides
        </p>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-0.5 bg-muted/40 rounded-xl p-1 w-fit border border-border"
        data-ocid="orders.tab"
        role="tablist"
        aria-label="Orders tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => switchTab(tab.id)}
            data-ocid={`orders.tab.${tab.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground hover:bg-card/60"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">
              {tab.id === "commerce"
                ? "Commerce"
                : tab.id === "delivery"
                  ? "Delivery"
                  : "Sarthi"}
            </span>
            <span
              className={`min-w-[20px] text-center text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div role="tabpanel">
        {activeTab === "commerce" && <CommerceOrdersTab />}
        {activeTab === "delivery" && <DeliveryOrdersTab />}
        {activeTab === "sarthi" && <SarthiRidesTab />}
      </div>
    </div>
  );
}
