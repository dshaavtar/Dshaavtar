import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ManufacturerComplaint } from "../backend.d";
import {
  useManufacturerComplaints,
  useResolveComplaint,
} from "../hooks/useBackend";

type FilterStatus = "all" | "open" | "resolved";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-red-500/10 text-red-600 border-red-500/30",
  inprogress: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  resolved: "bg-green-500/10 text-green-600 border-green-500/30",
};

export default function ManufacturerComplaintsPage() {
  const {
    data: complaintsRaw = [],
    isLoading,
    refetch,
  } = useManufacturerComplaints();
  const complaints = complaintsRaw as ManufacturerComplaint[];
  const resolveMutation = useResolveComplaint();
  const [filter, setFilter] = useState<FilterStatus>("all");

  function getStatusLabel(status: ManufacturerComplaint["status"]): string {
    return String(status);
  }

  const filtered =
    filter === "all"
      ? complaints
      : complaints.filter(
          (c: ManufacturerComplaint) =>
            getStatusLabel(c.status).toLowerCase() === filter,
        );

  async function handleResolve(id: string) {
    try {
      await resolveMutation.mutateAsync(id);
      toast.success("Complaint resolved");
    } catch (err) {
      toast.error(`Failed: ${String(err)}`);
    }
  }

  const openCount = complaints.filter(
    (c: ManufacturerComplaint) => getStatusLabel(c.status) === "open",
  ).length;

  return (
    <div className="space-y-5" data-ocid="manufacturer.complaints.page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Complaints
          </h1>
          <p className="text-sm text-muted-foreground">
            {openCount} open complaint{openCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {(["all", "open", "resolved"] as FilterStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
                  filter === s
                    ? "bg-card shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`manufacturer.complaints.filter.${s}`}
              >
                {s}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            data-ocid="manufacturer.complaints.refresh_button"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-16 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 gap-3"
            data-ocid="manufacturer.complaints.empty_state"
          >
            <AlertCircle className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              {filter === "all"
                ? "No complaints filed"
                : `No ${filter} complaints`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((c: ManufacturerComplaint, i: number) => {
              const statusLabel = getStatusLabel(c.status);
              const isOpen = statusLabel === "open";
              return (
                <div
                  key={c.id}
                  className="px-4 py-3 flex flex-col sm:flex-row sm:items-start gap-3"
                  data-ocid={`manufacturer.complaints.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground">
                        {c.subject}
                      </p>
                      <Badge
                        className={`text-xs border ${STATUS_COLORS[statusLabel] ?? ""}`}
                      >
                        {statusLabel}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Filed by: {c.filedBy}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Product ID:{" "}
                      {String(
                        (c as unknown as Record<string, unknown>).productId ??
                          "",
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {c.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(
                        Number(c.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {isOpen && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-500/30 hover:bg-green-500/10 flex-shrink-0"
                      onClick={() => handleResolve(c.id)}
                      disabled={resolveMutation.isPending}
                      data-ocid={`manufacturer.complaints.resolve_button.${i + 1}`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Resolve
                    </Button>
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
