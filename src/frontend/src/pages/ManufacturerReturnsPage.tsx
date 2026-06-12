import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, PackageX, RefreshCw, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ExpiryReturn } from "../backend.d";
import {
  useApproveExpiryReturn,
  useExpiryReturns,
  useRejectExpiryReturn,
} from "../hooks/useBackend";

type FilterStatus = "all" | "pending" | "approved" | "rejected";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  approved: "bg-green-500/10 text-green-600 border-green-500/30",
  rejected: "bg-red-500/10 text-red-600 border-red-500/30",
};

export default function ManufacturerReturnsPage() {
  const { data: returnsRaw = [], isLoading, refetch } = useExpiryReturns();
  const returns = returnsRaw as ExpiryReturn[];
  const approveMutation = useApproveExpiryReturn();
  const rejectMutation = useRejectExpiryReturn();
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filtered =
    filter === "all"
      ? returns
      : returns.filter((r) => String(r.status) === filter);

  async function handleApprove(id: string) {
    try {
      await approveMutation.mutateAsync(id);
      toast.success("Return approved");
    } catch (err) {
      toast.error(`Failed: ${String(err)}`);
    }
  }

  async function handleReject(id: string) {
    try {
      await rejectMutation.mutateAsync(id);
      toast.success("Return rejected");
    } catch (err) {
      toast.error(`Failed: ${String(err)}`);
    }
  }

  function getStatusLabel(status: ExpiryReturn["status"]): string {
    return String(status);
  }

  return (
    <div className="space-y-5" data-ocid="manufacturer.returns.page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <PackageX className="w-5 h-5 text-orange-500" />
            Expiry Returns
          </h1>
          <p className="text-sm text-muted-foreground">
            {
              returns.filter(
                (r: ExpiryReturn) => getStatusLabel(r.status) === "pending",
              ).length
            }{" "}
            pending review
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {(["all", "pending", "approved", "rejected"] as FilterStatus[]).map(
              (s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
                    filter === s
                      ? "bg-card shadow text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`manufacturer.returns.filter.${s}`}
                >
                  {s}
                </button>
              ),
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            data-ocid="manufacturer.returns.refresh_button"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-14 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 gap-3"
            data-ocid="manufacturer.returns.empty_state"
          >
            <PackageX className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No {filter === "all" ? "" : filter} returns found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((r: ExpiryReturn, i: number) => {
              const statusLabel = getStatusLabel(r.status);
              const isPending = statusLabel === "pending";
              return (
                <div
                  key={r.id}
                  className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
                  data-ocid={`manufacturer.returns.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">
                        {r.returnedBy}
                      </p>
                      <Badge
                        className={`text-xs border ${STATUS_COLORS[statusLabel] ?? ""}`}
                      >
                        {statusLabel}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Product ID: {r.productId} · Qty: {Number(r.quantity)} ·{" "}
                      {r.reason}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        Number(r.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {isPending && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-500/30 hover:bg-green-500/10"
                        onClick={() => handleApprove(r.id)}
                        disabled={approveMutation.isPending}
                        data-ocid={`manufacturer.returns.approve_button.${i + 1}`}
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-500/30 hover:bg-red-500/10"
                        onClick={() => handleReject(r.id)}
                        disabled={rejectMutation.isPending}
                        data-ocid={`manufacturer.returns.reject_button.${i + 1}`}
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
