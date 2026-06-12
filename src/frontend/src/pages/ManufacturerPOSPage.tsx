import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetManufacturerPOSOrders,
  useManufacturerByUser,
  useUpdatePOSOrderStatus,
} from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
  Search,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type OrderStatus = "Pending" | "Confirmed" | "Dispatched" | "Delivered";

interface POSOrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface POSOrder {
  id: string;
  manufacturerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerType: "Customer" | "Distributor";
  items: POSOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: bigint | number;
  deliveryPartnerPhone?: string;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatTimestamp(ts: bigint | number | undefined): string {
  if (ts === undefined || ts === null) return "—";
  const ms = Number(ts) / 1e6;
  if (!ms || Number.isNaN(ms)) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusBadge(status: OrderStatus) {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    Pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    Confirmed: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    Dispatched: {
      label: "Dispatched",
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
    Delivered: {
      label: "Delivered",
      className: "bg-green-100 text-green-800 border-green-200",
    },
  };
  const s = map[status] ?? { label: status, className: "" };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${s.className}`}
    >
      {s.label}
    </span>
  );
}

function SourceBadge({ type }: { type: "Customer" | "Distributor" }) {
  return type === "Distributor" ? (
    <Badge className="bg-green-600 text-white text-xs">Distributor</Badge>
  ) : (
    <Badge className="bg-blue-600 text-white text-xs">Direct Customer</Badge>
  );
}

function OrderSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Card key={`item-${i}`}>
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DeliveryAssignForm({
  onDispatch,
  onCancel,
}: {
  onDispatch: (phone: string) => void;
  onCancel: () => void;
}) {
  const [phone, setPhone] = useState("");
  return (
    <div className="mt-2 flex gap-2 items-center">
      <Input
        placeholder="Delivery partner phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-8 w-48 text-sm"
        data-ocid="pos.delivery_phone_input"
      />
      <Button
        size="sm"
        onClick={() => onDispatch(phone)}
        disabled={!phone.trim()}
        data-ocid="pos.dispatch_button"
      >
        Dispatch
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onCancel}
        data-ocid="pos.cancel_assign_button"
        type="button"
      >
        Cancel
      </Button>
    </div>
  );
}

function OrderCard({
  order,
  onAction,
}: {
  order: POSOrder;
  onAction: (
    orderId: string,
    status: OrderStatus,
    deliveryPhone?: string,
  ) => void;
}) {
  const [assigningDelivery, setAssigningDelivery] = useState(false);

  return (
    <Card className="border border-border hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <SourceBadge type={order.buyerType} />
            {statusBadge(order.status)}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(order.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-sm font-medium">{order.buyerName}</span>
          <span className="text-xs text-muted-foreground">
            {order.buyerPhone}
          </span>
        </div>

        <div className="my-2 space-y-1">
          {(order.items ?? []).map((item, idx) => (
            <div
              key={`${item.productName}-${idx}`}
              className="flex items-center justify-between text-xs text-muted-foreground"
            >
              <span>
                <Package className="inline w-3 h-3 mr-1" />
                {item.productName} × {item.quantity}
              </span>
              <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
          <span className="text-sm font-semibold">
            Total: {formatCurrency(order.total)}
          </span>
          <div className="flex gap-2">
            {order.status === "Pending" && (
              <Button
                size="sm"
                onClick={() => onAction(order.id, "Confirmed")}
                data-ocid="pos.accept_button"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Accept
              </Button>
            )}
            {order.status === "Confirmed" && !assigningDelivery && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setAssigningDelivery(true)}
                data-ocid="pos.assign_delivery_button"
              >
                <Truck className="w-3.5 h-3.5 mr-1" />
                Assign & Dispatch
              </Button>
            )}
            {order.status === "Dispatched" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAction(order.id, "Delivered")}
                data-ocid="pos.mark_delivered_button"
              >
                Mark Delivered
              </Button>
            )}
          </div>
        </div>

        {order.status === "Confirmed" && assigningDelivery && (
          <DeliveryAssignForm
            onDispatch={(phone) => {
              setAssigningDelivery(false);
              onAction(order.id, "Dispatched", phone);
            }}
            onCancel={() => setAssigningDelivery(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}

const STATUS_TABS: Array<{
  label: string;
  value: string;
  icon: React.ElementType;
}> = [
  { label: "All", value: "all", icon: Package },
  { label: "Pending", value: "Pending", icon: Clock },
  { label: "Confirmed", value: "Confirmed", icon: CheckCircle2 },
  { label: "Dispatched", value: "Dispatched", icon: Truck },
  { label: "Delivered", value: "Delivered", icon: CheckCircle2 },
];

export default function ManufacturerPOSPage() {
  const { data: manufacturer, isLoading: mfrLoading } = useManufacturerByUser();
  const mfrId = (manufacturer as { id?: string } | null)?.id ?? "";

  const { data: rawOrders, isLoading: ordersLoading } =
    useGetManufacturerPOSOrders(mfrId);

  const updateStatus = useUpdatePOSOrderStatus();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const orders: POSOrder[] = (rawOrders as POSOrder[] | null) ?? [];

  const filtered = orders
    .filter((o) => (activeTab === "all" ? true : o.status === activeTab))
    .filter((o) => o.buyerName?.toLowerCase().includes(search.toLowerCase()));

  function handleAction(
    orderId: string,
    status: OrderStatus,
    deliveryPartnerPhone?: string,
  ) {
    updateStatus.mutate(
      { orderId, status, deliveryPartnerPhone: deliveryPartnerPhone ?? "" },
      {
        onSuccess: () => toast.success(`Order marked as ${status}`),
        onError: () => toast.error("Failed to update order status"),
      },
    );
  }

  if (mfrLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-48 mb-6" />
        <OrderSkeleton />
      </div>
    );
  }

  if (!manufacturer) {
    return (
      <div
        className="p-6 max-w-2xl mx-auto"
        data-ocid="pos.no_manufacturer_state"
      >
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <AlertCircle className="w-10 h-10 text-amber-500" />
            <h2 className="text-lg font-semibold">
              Register as Manufacturer First
            </h2>
            <p className="text-sm text-muted-foreground">
              You need a manufacturer profile before orders can be tracked here.
            </p>
            <Button asChild className="mt-1">
              <Link to="/manufacturer-registration">Register Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Stats per status
  const stats = STATUS_TABS.filter((t) => t.value !== "all").map((t) => ({
    label: t.label,
    count: orders.filter((o) => o.status === t.value).length,
    revenue: orders
      .filter((o) => o.status === t.value)
      .reduce((s, o) => s + (o.total ?? 0), 0),
  }));

  return (
    <div
      className="p-4 md:p-6 max-w-4xl mx-auto space-y-5"
      data-ocid="pos.page"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manufacturer POS</h1>
        <p className="text-sm text-muted-foreground">
          Unified view of direct customer and distributor orders
        </p>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-ocid="pos.stats_panel"
      >
        {stats.map((s) => (
          <Card key={s.label} className="bg-card">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold">{s.count}</p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(s.revenue)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by buyer name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="pos.search_input"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap gap-1 h-auto">
          {STATUS_TABS.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              data-ocid={`pos.tab.${t.value.toLowerCase()}`}
              className="text-xs"
            >
              {t.label}
              {t.value !== "all" && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({orders.filter((o) => o.status === t.value).length})
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {STATUS_TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} className="mt-4 space-y-3">
            {ordersLoading ? (
              <OrderSkeleton />
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="pos.empty_state"
              >
                <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">
                  No orders yet. Orders appear when customers or distributors
                  place them.
                </p>
              </div>
            ) : (
              filtered.map((order, idx) => (
                <div key={order.id} data-ocid={`pos.item.${idx + 1}`}>
                  <OrderCard order={order} onAction={handleAction} />
                </div>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
