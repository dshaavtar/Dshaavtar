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
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Globe,
  Loader2,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ModerationItem as BackendModerationItem } from "../backend.d";
import {
  useApproveModerationItem,
  useBackendActor,
  useCheckItemModeration,
  useGetAllLendingItems,
  useModerationQueue,
  useRejectModerationItem,
} from "../hooks/useBackend";

type FilterTab = "all" | "pending" | "approved" | "flagged" | "rejected";

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  pending: {
    label: "Pending",
    cls: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  approved: {
    label: "Approved",
    cls: "bg-green-100 text-green-700 border-green-200",
  },
  flagged: {
    label: "Flagged",
    cls: "bg-orange-100 text-orange-700 border-orange-200",
  },
  rejected: {
    label: "Rejected",
    cls: "bg-red-100 text-red-700 border-red-200",
  },
};

function statusBadge(status: string) {
  const m = STATUS_LABELS[status] ?? STATUS_LABELS.pending;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${m.cls}`}
    >
      {m.label}
    </span>
  );
}

function categoryLabel(et: string): string {
  const map: Record<string, string> = {
    merchant: "Merchant",
    product: "Product",
    customOrder: "Custom Order",
    job: "Job",
    property: "Property",
    deliveryPartner: "Delivery Partner",
    promotion: "Promotion",
    event: "Event",
    lendingItem: "Lending Item",
  };
  return map[et] ?? et;
}

export default function ModerationPage() {
  const [search, setSearch] = useState("");
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<FilterTab>("all");
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("all");
  const [internetResults, setInternetResults] = useState<
    Record<string, { approved: boolean; reason: string } | "checking">
  >({});

  // Always call hooks at the top level — no conditional hook calls
  const { actor } = useBackendActor();
  const { data: queueItems = [], isLoading } = useModerationQueue();
  const approveItem = useApproveModerationItem();
  const rejectItem = useRejectModerationItem();
  const checkModeration = useCheckItemModeration();
  const { data: allLendingItems = [] } = useGetAllLendingItems();

  // Build disputed lending items for moderation
  const disputedLendingItems = allLendingItems
    .filter((item) => item.status === "disputed")
    .map((item) => ({
      id: item.id,
      entityType: "lendingItem",
      title: `Lending Item — ${item.itemName}`,
      subtitle: `Lender: ${item.lenderPhone} · Borrower: ${item.borrowerPhone} · ₹${item.charge}`,
      status: "pending" as const,
      remark: "Disputed by one of the parties",
      createdAt: Number(item.createdAt),
      rawContent: `${item.itemName} ${item.itemDescription}`,
    }));

  // Normalize queue items — backend ModerationItem has entityType/entityId/status/remark
  const backendItems = queueItems.map((item: BackendModerationItem) => ({
    id: item.entityId,
    entityType: item.entityType,
    title: `${categoryLabel(item.entityType)} — ${item.entityId}`,
    subtitle: item.remark
      ? `Remark: ${item.remark}`
      : `Checked: ${new Date(Number(item.checkedAt) / 1_000_000 || 0).toLocaleDateString("en-IN")}`,
    status: item.status,
    remark: item.remark,
    createdAt: Number(item.checkedAt),
    rawContent: `${item.entityType} ${item.entityId}`,
  }));

  const items = [
    ...backendItems,
    ...disputedLendingItems.filter(
      (li) => !backendItems.some((bi) => bi.id === li.id),
    ),
  ];

  const CONTENT_TYPES = [
    { value: "all", label: "All Types" },
    { value: "merchant", label: "Merchant" },
    { value: "product", label: "Product" },
    { value: "deliveryPartner", label: "Delivery Partner" },
    { value: "promotion", label: "Promotion" },
    { value: "event", label: "Event" },
    { value: "lendingItem", label: "Lending Item" },
  ];

  const filtered = items.filter((item) => {
    if (tab !== "all" && item.status !== tab) return false;
    if (contentTypeFilter !== "all" && item.entityType !== contentTypeFilter)
      return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    all: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    approved: items.filter((i) => i.status === "approved").length,
    flagged: items.filter((i) => i.status === "flagged").length,
    rejected: items.filter((i) => i.status === "rejected").length,
  };

  async function handleApprove(item: (typeof items)[0]) {
    try {
      await approveItem.mutateAsync({
        entityType: item.entityType,
        entityId: item.id,
      });
      toast.success(`${categoryLabel(item.entityType)} approved`);
    } catch {
      toast.error("Failed to approve");
    }
  }

  async function handleReject(item: (typeof items)[0]) {
    const reason = rejectReason[item.id] ?? "";
    if (!reason.trim()) {
      toast.error("Please enter a rejection reason");
      return;
    }
    try {
      await rejectItem.mutateAsync({
        entityType: item.entityType,
        entityId: item.id,
        remark: reason,
      });
      toast.success(`${categoryLabel(item.entityType)} rejected`);
      setRejectReason((r) => ({ ...r, [item.id]: "" }));
    } catch {
      toast.error("Failed to reject");
    }
  }

  async function handleInternetCheck(item: (typeof items)[0]) {
    setInternetResults((r) => ({ ...r, [item.id]: "checking" }));
    try {
      const result = await checkModeration.mutateAsync({
        itemType: item.entityType,
        itemId: item.id,
        content: item.rawContent ?? item.title,
      });
      const checkResult = result as { approved: boolean; reason: string };
      setInternetResults((r) => ({ ...r, [item.id]: checkResult }));
      if (!checkResult.approved) {
        toast.warning(`Flagged: ${checkResult.reason}`);
        // Mark as flagged in backend via actor
        if (actor) {
          await actor.updateModerationStatus(
            item.entityType,
            item.id,
            "flagged",
            checkResult.reason,
          );
        }
      } else {
        toast.success("Internet check passed — no illegal content detected");
      }
    } catch {
      setInternetResults((r) => {
        const next = { ...r };
        delete next[item.id];
        return next;
      });
      toast.error("Internet check failed");
    }
  }

  const TAB_OPTIONS: { value: FilterTab; label: string }[] = [
    { value: "all", label: `All (${counts.all})` },
    { value: "pending", label: `Pending (${counts.pending})` },
    { value: "approved", label: `Approved (${counts.approved})` },
    { value: "flagged", label: `Flagged (${counts.flagged})` },
    { value: "rejected", label: `Rejected (${counts.rejected})` },
  ];

  return (
    <div className="flex flex-col gap-6 p-6" data-ocid="moderation.page">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            AI Moderation Queue
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and approve content flagged by the AI moderation system
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {counts.pending > 0 && (
            <Badge
              variant="outline"
              className="text-yellow-700 border-yellow-300 bg-yellow-50 gap-1"
            >
              <Clock className="w-3 h-3" /> {counts.pending} Pending
            </Badge>
          )}
          {counts.flagged > 0 && (
            <Badge
              variant="outline"
              className="text-orange-700 border-orange-300 bg-orange-50 gap-1"
            >
              <AlertTriangle className="w-3 h-3" /> {counts.flagged} Flagged
            </Badge>
          )}
        </div>
      </div>

      {/* Filter tabs + search */}
      <div className="flex gap-3 flex-wrap items-center">
        <div className="flex gap-1 bg-muted/40 rounded-lg p-1">
          {TAB_OPTIONS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              data-ocid={`moderation.tab.${t.value}`}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                tab === t.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
          <SelectTrigger
            className="w-40 h-8 text-xs"
            data-ocid="moderation.content-type_select"
          >
            <SelectValue placeholder="Content type" />
          </SelectTrigger>
          <SelectContent>
            {CONTENT_TYPES.map((ct) => (
              <SelectItem key={ct.value} value={ct.value} className="text-xs">
                {ct.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="moderation.search_input"
          />
        </div>
      </div>

      {/* Queue */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="moderation.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="moderation.empty_state"
        >
          <ShieldCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No items to moderate</p>
          <p className="text-sm mt-1">
            {tab !== "all"
              ? `No ${tab} items — try switching tabs`
              : "The moderation queue is empty"}
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[calc(100vh-360px)] overflow-y-auto pr-1">
          {filtered.map((item, idx) => {
            const internetResult = internetResults[item.id];
            const isChecking = internetResult === "checking";
            const checkResult =
              typeof internetResult === "object" ? internetResult : null;

            return (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3"
                data-ocid={`moderation.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-foreground truncate">
                        {item.title}
                      </span>
                      {statusBadge(item.status)}
                      <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                        {categoryLabel(item.entityType)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                    {item.remark && (
                      <p className="text-xs text-orange-600 mt-1">
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        {item.remark}
                      </p>
                    )}
                    {checkResult && (
                      <div
                        className={`mt-1 flex items-center gap-1 text-xs ${checkResult.approved ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {checkResult.approved ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> ✅ Internet
                            check passed
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" /> 🚨
                            Flagged: {checkResult.reason}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                      onClick={() => handleInternetCheck(item)}
                      disabled={isChecking || checkModeration.isPending}
                      data-ocid={`moderation.internet-check-button.${idx + 1}`}
                    >
                      {isChecking ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Globe className="w-3.5 h-3.5" />
                      )}
                      {isChecking ? "Checking…" : "Internet Check"}
                    </Button>
                    {item.status !== "approved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => handleApprove(item)}
                        disabled={approveItem.isPending}
                        data-ocid={`moderation.approve_button.${idx + 1}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                      </Button>
                    )}
                    {item.status !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs border-red-300 text-red-700 hover:bg-red-50"
                        onClick={() => handleReject(item)}
                        disabled={
                          rejectItem.isPending || !rejectReason[item.id]?.trim()
                        }
                        data-ocid={`moderation.reject_button.${idx + 1}`}
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                      </Button>
                    )}
                  </div>
                </div>
                {item.status !== "rejected" && (
                  <Textarea
                    placeholder="Enter rejection reason (required to reject)..."
                    value={rejectReason[item.id] ?? ""}
                    onChange={(e) =>
                      setRejectReason((r) => ({
                        ...r,
                        [item.id]: e.target.value,
                      }))
                    }
                    className="text-xs h-14 resize-none"
                    data-ocid={`moderation.reject_reason.${idx + 1}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
