import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  Package,
  Search,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  type RestockOrder,
  useRestockOrders,
  useUpdateRestockStatus,
} from "../hooks/useBackend";

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadgeRestock({ status }: { status: RestockOrder["status"] }) {
  const map: Record<
    RestockOrder["status"],
    { label: string; className: string }
  > = {
    pending: {
      label: "Pending",
      className:
        "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
    },
    accepted: {
      label: "Accepted",
      className:
        "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
    },
    delivered: {
      label: "Delivered",
      className:
        "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800",
    },
    cancelled: {
      label: "Cancelled",
      className:
        "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800",
    },
  };
  const { label, className } = map[status] ?? map.pending;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}
    >
      {label}
    </span>
  );
}

// ─── Row actions ──────────────────────────────────────────────────────────────

function RestockRowActions({
  order,
  onUpdate,
}: {
  order: RestockOrder;
  onUpdate: (orderId: string, status: RestockOrder["status"]) => Promise<void>;
}) {
  if (order.status === "delivered" || order.status === "cancelled") {
    return (
      <span className="text-xs text-muted-foreground italic">
        {order.status === "delivered" ? "Completed" : "Cancelled"}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      {order.status === "pending" && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={() => onUpdate(order.id, "accepted")}
          data-ocid="restock.accept_button"
        >
          <CheckCircle className="w-3 h-3" /> Accept
        </Button>
      )}
      {order.status === "accepted" && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs gap-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
          onClick={() => onUpdate(order.id, "delivered")}
          data-ocid="restock.delivered_button"
        >
          <Truck className="w-3 h-3" /> Mark Delivered
        </Button>
      )}
      <Button
        size="sm"
        variant="ghost"
        className="h-7 text-xs gap-1 text-destructive hover:bg-destructive/10"
        onClick={() => onUpdate(order.id, "cancelled")}
        data-ocid="restock.cancel_button"
      >
        <XCircle className="w-3 h-3" /> Cancel
      </Button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RestockOrdersPage() {
  const { data: orders = [], isLoading } = useRestockOrders();
  const updateStatus = useUpdateRestockStatus();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | RestockOrder["status"]
  >("all");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (
        search &&
        !o.merchantName.toLowerCase().includes(search.toLowerCase()) &&
        !o.itemName.toLowerCase().includes(search.toLowerCase()) &&
        !o.supplierName.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [orders, search, statusFilter]);

  const counts = useMemo(() => {
    const c = { pending: 0, accepted: 0, delivered: 0, cancelled: 0 };
    for (const o of orders) c[o.status]++;
    return c;
  }, [orders]);

  async function handleUpdate(orderId: string, status: RestockOrder["status"]) {
    try {
      await updateStatus.mutateAsync({ orderId, status });
      toast.success(`Order marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="space-y-5 animate-fade-in" data-ocid="restock_orders.page">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Restock Orders
          </h2>
          <p className="text-sm text-muted-foreground">
            Merchant supplier restock requests — accept, deliver, or cancel
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            {
              label: "Pending",
              value: counts.pending,
              color: "text-amber-600",
            },
            {
              label: "Accepted",
              value: counts.accepted,
              color: "text-blue-600",
            },
            {
              label: "Delivered",
              value: counts.delivered,
              color: "text-emerald-600",
            },
            {
              label: "Cancelled",
              value: counts.cancelled,
              color: "text-muted-foreground",
            },
          ] as { label: string; value: number; color: string }[]
        ).map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-3 text-center"
          >
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by merchant, item, supplier…"
            className="pl-9"
            data-ocid="restock_orders.search_input"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v as "all" | RestockOrder["status"])
          }
        >
          <SelectTrigger
            className="w-full sm:w-44"
            data-ocid="restock_orders.status_filter"
          >
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="restock_orders.table">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  "Merchant",
                  "Supplier",
                  "Item",
                  "Qty",
                  "Status",
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
                    {Array.from({ length: 7 }, (_, j) => `cell-${j}`).map(
                      (cellId) => (
                        <td key={cellId} className="px-4 py-3">
                          <Skeleton className="h-4 w-20" />
                        </td>
                      ),
                    )}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Package className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p
                      className="text-sm text-muted-foreground font-medium"
                      data-ocid="restock_orders.empty_state"
                    >
                      {search || statusFilter !== "all"
                        ? "No restock orders match your filters"
                        : "No restock orders yet"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Merchants can place restock orders from their chatbot menu
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((order, idx) => (
                  <tr
                    key={order.id}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`restock_orders.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {order.merchantName}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {order.merchantPhone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.supplierName}
                    </td>
                    <td className="px-4 py-3 font-medium">{order.itemName}</td>
                    <td className="px-4 py-3 tabular-nums">{order.quantity}</td>
                    <td className="px-4 py-3">
                      <StatusBadgeRestock status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(Number(order.createdAt)).toLocaleDateString(
                        "en-IN",
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <RestockRowActions
                        order={order}
                        onUpdate={handleUpdate}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-right">
          Showing {filtered.length} of {orders.length} restock orders
        </p>
      )}
    </div>
  );
}
