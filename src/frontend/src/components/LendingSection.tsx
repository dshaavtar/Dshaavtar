import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  HandCoins,
  IndianRupee,
  Package,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import type { LendingItem } from "../backend.d";
import {
  useGetLendingItemsByBorrower,
  useGetLendingItemsByLender,
  useTriggerLendingReminder,
  useUpdateLendingStatus,
} from "../hooks/useBackend";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysUntil(returnDateBigInt: bigint): number {
  const returnMs = Number(returnDateBigInt);
  const nowMs = Date.now();
  return Math.ceil((returnMs - nowMs) / (1000 * 60 * 60 * 24));
}

function returnDateLabel(returnDateBigInt: bigint): string {
  return new Date(Number(returnDateBigInt)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function LendingStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    returned:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    disputed:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
        map[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}

function CountdownBadge({ days }: { days: number }) {
  if (days < 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs text-destructive font-semibold">
        <AlertTriangle className="w-3 h-3" /> {Math.abs(days)}d overdue
      </span>
    );
  if (days === 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs text-orange-600 font-semibold">
        <Clock className="w-3 h-3" /> Due today
      </span>
    );
  if (days <= 7)
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-semibold">
        <Clock className="w-3 h-3" /> {days}d left
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Calendar className="w-3 h-3" /> {days}d left
    </span>
  );
}

// ─── Lent Items Table ────────────────────────────────────────────────────────

function LentItemRow({ item, idx }: { item: LendingItem; idx: number }) {
  const triggerReminder = useTriggerLendingReminder();
  const days = daysUntil(item.returnDate);

  async function handleRemind() {
    try {
      await triggerReminder.mutateAsync(item.id);
      toast.success("Reminder sent to both parties");
    } catch {
      toast.error("Failed to send reminder");
    }
  }

  return (
    <div
      className="flex items-start gap-3 p-3 bg-muted/20 border border-border rounded-xl"
      data-ocid={`lending.lent.item.${idx + 1}`}
    >
      <Package className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm text-foreground truncate">
            {item.itemName}
          </span>
          <LendingStatusBadge status={item.status} />
          <CountdownBadge days={days} />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          Borrower:{" "}
          <span className="font-medium text-foreground">
            {item.borrowerPhone}
          </span>
        </p>
        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
          <span>Return: {returnDateLabel(item.returnDate)}</span>
          <span className="flex items-center gap-0.5">
            <IndianRupee className="w-3 h-3" />
            {item.charge}
          </span>
          {item.reminderFrequency && (
            <span className="capitalize">{item.reminderFrequency}</span>
          )}
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="gap-1 text-xs shrink-0"
        onClick={handleRemind}
        disabled={triggerReminder.isPending}
        data-ocid={`lending.lent.remind.${idx + 1}`}
      >
        <Bell className="w-3.5 h-3.5" /> Remind
      </Button>
    </div>
  );
}

// ─── Borrowed Items Table ─────────────────────────────────────────────────────

function BorrowedItemRow({
  item,
  idx,
  showMarkReturned,
}: { item: LendingItem; idx: number; showMarkReturned?: boolean }) {
  const updateStatus = useUpdateLendingStatus();
  const days = daysUntil(item.returnDate);

  async function handleMarkReturned() {
    try {
      await updateStatus.mutateAsync({ id: item.id, status: "returned" });
      toast.success("Item marked as returned");
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <div
      className="flex items-start gap-3 p-3 bg-muted/20 border border-border rounded-xl"
      data-ocid={`lending.borrowed.item.${idx + 1}`}
    >
      <RotateCcw className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm text-foreground truncate">
            {item.itemName}
          </span>
          <LendingStatusBadge status={item.status} />
          <CountdownBadge days={days} />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          Lender:{" "}
          <span className="font-medium text-foreground">
            {item.lenderPhone}
          </span>
        </p>
        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
          <span>Return by: {returnDateLabel(item.returnDate)}</span>
          <span className="flex items-center gap-0.5">
            <IndianRupee className="w-3 h-3" />
            {item.charge} owed
          </span>
        </div>
      </div>
      {showMarkReturned && item.status === "active" && (
        <Button
          size="sm"
          variant="outline"
          className="gap-1 text-xs shrink-0 border-emerald-400 text-emerald-600 hover:bg-emerald-50"
          onClick={handleMarkReturned}
          disabled={updateStatus.isPending}
          data-ocid={`lending.borrowed.return.${idx + 1}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Returned
        </Button>
      )}
    </div>
  );
}

// ─── Summary Stats ────────────────────────────────────────────────────────────

function LendingSummary({
  lentItems,
  accentClass,
}: {
  lentItems: LendingItem[];
  borrowedItems?: LendingItem[];
  accentClass: string;
}) {
  const totalLent = lentItems.length;
  const activeLent = lentItems.filter((i) => i.status === "active").length;
  const overdueLent = lentItems.filter(
    (i) => i.status === "overdue" || daysUntil(i.returnDate) < 0,
  ).length;
  const chargePending = lentItems
    .filter((i) => i.status === "active")
    .reduce((s, i) => s + i.charge, 0);

  const stats = [
    { label: "Total Lent", value: totalLent },
    { label: "Active", value: activeLent },
    { label: "Overdue", value: overdueLent },
    { label: "Charge Pending", value: `₹${chargePending}` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-xl border border-border p-3 text-center ${accentClass}`}
        >
          <p className="text-xs text-muted-foreground">{s.label}</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Main LendingSection Export ───────────────────────────────────────────────

export interface LendingSectionProps {
  phone: string;
  showMarkReturned?: boolean;
  accentClass?: string;
}

export default function LendingSection({
  phone,
  showMarkReturned,
  accentClass = "bg-card",
}: LendingSectionProps) {
  const { data: lentItems = [], isLoading: lentLoading } =
    useGetLendingItemsByLender(phone);
  const { data: borrowedItems = [], isLoading: borrowedLoading } =
    useGetLendingItemsByBorrower(phone);

  const isLoading = lentLoading || borrowedLoading;

  return (
    <div className="space-y-4" data-ocid="lending.section">
      {/* Summary row */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((k) => (
            <Skeleton key={k} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : (
        <LendingSummary lentItems={lentItems} accentClass={accentClass} />
      )}

      {/* Items Lent Out */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <HandCoins className="w-4 h-4 text-amber-500" />
          <h4 className="font-semibold text-sm text-foreground">
            Items Lent Out
          </h4>
          <Badge variant="outline" className="text-xs">
            {lentItems.length}
          </Badge>
        </div>
        {isLoading ? (
          <Skeleton className="h-16 rounded-xl" />
        ) : lentItems.length === 0 ? (
          <div
            className="text-center py-6 text-muted-foreground text-sm"
            data-ocid="lending.lent.empty_state"
          >
            No items lent out
          </div>
        ) : (
          <div className="space-y-2">
            {lentItems.map((item, idx) => (
              <LentItemRow key={item.id} item={item} idx={idx} />
            ))}
          </div>
        )}
      </div>

      {/* Items Borrowed */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <RotateCcw className="w-4 h-4 text-violet-500" />
          <h4 className="font-semibold text-sm text-foreground">
            Items Borrowed
          </h4>
          <Badge variant="outline" className="text-xs">
            {borrowedItems.length}
          </Badge>
        </div>
        {isLoading ? (
          <Skeleton className="h-16 rounded-xl" />
        ) : borrowedItems.length === 0 ? (
          <div
            className="text-center py-6 text-muted-foreground text-sm"
            data-ocid="lending.borrowed.empty_state"
          >
            No items borrowed
          </div>
        ) : (
          <div className="space-y-2">
            {borrowedItems.map((item, idx) => (
              <BorrowedItemRow
                key={item.id}
                item={item}
                idx={idx}
                showMarkReturned={showMarkReturned}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
