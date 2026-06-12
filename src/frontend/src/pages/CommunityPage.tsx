import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Car,
  CheckCircle,
  Clock,
  DoorOpen,
  LogOut,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  UtensilsCrossed,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useGetAllCommunityFoodOrders,
  useGetAllCommunityMembers,
  useGetAllCommunityParkingBookings,
  useGetAllCommunityRoomBookings,
  useGetAllCommunityWorkOrders,
  useGetCommunityMemberByPhone,
  useRemoveCommunityMember,
  useSearchCommunityMembers,
} from "../hooks/useBackend";
import {
  useAddVisitorCheckin,
  useApproveVisitorEntry,
  useCheckOutVisitor,
  useGetCityList,
  useGetVisitorsByDate,
  useVisitorHistory,
} from "../hooks/useVisitorCheckin";

const PAGE_SIZE = 50;

type MainTab = "checkin" | "pending" | "history" | "members";

const ROLE_COLOR: Record<string, string> = {
  customer: "bg-blue-100 text-blue-700 border-blue-200",
  merchant: "bg-emerald-100 text-emerald-700 border-emerald-200",
  delivery: "bg-amber-100 text-amber-700 border-amber-200",
  sarthi: "bg-violet-100 text-violet-700 border-violet-200",
};

function RoleBadge({ role }: { role: string }) {
  const cls =
    ROLE_COLOR[role.toLowerCase()] ??
    "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${cls}`}
    >
      {role}
    </span>
  );
}

// ─── Visitor Shared Helpers ─────────────────────────────────────────────────

const PURPOSES = ["Guest", "Delivery", "Service", "Official", "Other"] as const;
type Purpose = (typeof PURPOSES)[number];

function ApprovalBadge({ status }: { status: string }) {
  if (status === "approved")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
        <CheckCircle className="w-3 h-3" /> Approved
      </span>
    );
  if (status === "denied")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 border border-red-200">
        <UserX className="w-3 h-3" /> Denied
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

function formatTime(ns: bigint | undefined): string {
  if (ns === undefined) return "";
  return new Date(Number(ns) / 1_000_000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function todayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ─── Check-in Visitor Tab ───────────────────────────────────────────────────

function CheckInVisitorTab({ onSuccess }: { onSuccess: () => void }) {
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [residentName, setResidentName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [purpose, setPurpose] = useState<Purpose>("Guest");
  const [hostPhone, setHostPhone] = useState("");

  const { data: hostMember } = useGetCommunityMemberByPhone(
    hostPhone.length >= 10 ? hostPhone : "",
  );
  const addCheckin = useAddVisitorCheckin();

  async function handleSubmit() {
    if (!visitorName.trim() || !visitorPhone.trim()) {
      toast.error("Visitor name and phone are required");
      return;
    }
    if (visitorPhone.trim().length < 10) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    const memberId = (hostMember as { id?: string } | undefined)?.id ?? "";
    const communityId =
      (hostMember as { city?: string } | undefined)?.city ?? "default";
    const purposeText =
      purpose +
      (residentName
        ? ` – visiting ${residentName}${unitNumber ? ` (${unitNumber})` : ""}`
        : "");
    try {
      const result = await addCheckin.mutateAsync({
        visitorName: visitorName.trim(),
        visitorPhone: visitorPhone.trim(),
        purpose: purposeText,
        communityId,
        communityMemberId: memberId,
        vehicleDetails: "",
      });
      toast.success(
        `${visitorName} checked in — ID: ${(result as { id?: string })?.id ?? "recorded"}`,
      );
      setVisitorName("");
      setVisitorPhone("");
      setResidentName("");
      setUnitNumber("");
      setPurpose("Guest");
      setHostPhone("");
      onSuccess();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Check-in failed");
    }
  }

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs" htmlFor="v-name">
            Visitor Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="v-name"
            placeholder="Full name"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            className="h-8 text-xs"
            data-ocid="visitor.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs" htmlFor="v-phone">
            Visitor Phone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="v-phone"
            placeholder="+91 XXXXXXXXXX"
            value={visitorPhone}
            onChange={(e) => setVisitorPhone(e.target.value)}
            className="h-8 text-xs"
            data-ocid="visitor.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs" htmlFor="v-resident">
            Visiting Resident Name
          </Label>
          <Input
            id="v-resident"
            placeholder="Resident's name"
            value={residentName}
            onChange={(e) => setResidentName(e.target.value)}
            className="h-8 text-xs"
            data-ocid="visitor.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs" htmlFor="v-unit">
            Unit / Flat Number
          </Label>
          <Input
            id="v-unit"
            placeholder="e.g. A-304"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            className="h-8 text-xs"
            data-ocid="visitor.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs" htmlFor="v-purpose">
            Purpose <span className="text-muted-foreground">(optional)</span>
          </Label>
          <select
            id="v-purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as Purpose)}
            className="w-full text-xs bg-muted border border-border rounded-lg px-3 py-1.5 h-8 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            data-ocid="visitor.select"
          >
            {PURPOSES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs" htmlFor="v-host">
            Host Member Phone{" "}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <div className="relative">
            <Input
              id="v-host"
              placeholder="Resident's registered phone"
              value={hostPhone}
              onChange={(e) => setHostPhone(e.target.value)}
              className="h-8 text-xs"
              data-ocid="visitor.input"
            />
            {hostMember && (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-emerald-600 font-medium">
                ✓ {(hostMember as { name?: string })?.name || "Member found"}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button
          className="gap-2 h-8 text-xs"
          onClick={handleSubmit}
          disabled={addCheckin.isPending}
          data-ocid="visitor.submit_button"
        >
          {addCheckin.isPending ? "Checking in…" : "Check In Visitor"}
        </Button>
      </div>
    </div>
  );
}

// ─── Pending Approvals Tab ───────────────────────────────────────────────────

function PendingApprovalsTab() {
  const today = todayDateString();
  const {
    data: todayVisitors = [],
    isLoading,
    refetch,
  } = useGetVisitorsByDate(today);
  const approveEntry = useApproveVisitorEntry();
  const checkout = useCheckOutVisitor();

  const pending = todayVisitors.filter((v) => v.approvalStatus === "pending");
  const approved = todayVisitors.filter(
    (v) =>
      v.approvalStatus === "approved" &&
      (v.checkOutTime === undefined || v.checkOutTime === null),
  );

  async function handleApprove(id: string, status: "approved" | "denied") {
    try {
      await approveEntry.mutateAsync({ id, status });
      toast.success(`Entry ${status}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Action failed");
    }
  }

  async function handleCheckout(id: string, name: string) {
    try {
      await checkout.mutateAsync(id);
      toast.success(`${name} checked out`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Checkout failed");
    }
  }

  if (isLoading) {
    return (
      <div className="p-4 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <Skeleton key={i} className="h-14 w-full rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {pending.length} pending · {approved.length} approved (inside)
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 h-7 text-xs"
          onClick={() => refetch()}
        >
          <RefreshCw className="w-3 h-3" /> Refresh
        </Button>
      </div>

      {/* Pending list */}
      {pending.length === 0 && approved.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 gap-2"
          data-ocid="visitor.empty_state"
        >
          <UserCheck className="w-8 h-8 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No pending approvals</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-2">
                Awaiting Approval
              </p>
              <div className="space-y-2">
                {pending.map((v, idx) => (
                  <div
                    key={v.id}
                    className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2.5"
                    data-ocid={`visitor.item.${idx + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {v.visitorName}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {v.visitorPhone}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {v.purpose}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-muted-foreground">
                        {formatTime(v.checkInTime)}
                      </p>
                      <ApprovalBadge status={String(v.approvalStatus)} />
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        className="h-7 px-2.5 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleApprove(v.id, "approved")}
                        disabled={approveEntry.isPending}
                        data-ocid={`visitor.confirm_button.${idx + 1}`}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2.5 text-[11px] text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleApprove(v.id, "denied")}
                        disabled={approveEntry.isPending}
                        data-ocid={`visitor.delete_button.${idx + 1}`}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approved/inside list with check-out button */}
          {approved.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-2">
                Currently Inside
              </p>
              <div className="space-y-2">
                {approved.map((v, idx) => (
                  <div
                    key={v.id}
                    className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg px-3 py-2.5"
                    data-ocid={`visitor.item.${pending.length + idx + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {v.visitorName}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {v.visitorPhone}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {v.purpose}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-muted-foreground">
                        In: {formatTime(v.checkInTime)}
                      </p>
                      <ApprovalBadge status="approved" />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-[11px] gap-1 shrink-0 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      onClick={() => handleCheckout(v.id, v.visitorName)}
                      disabled={checkout.isPending}
                      data-ocid={`visitor.edit_button.${idx + 1}`}
                    >
                      <LogOut className="w-3 h-3" /> Check-out
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Daily History Tab ───────────────────────────────────────────────────────

type VisitorCheckinRecord = {
  id: string;
  visitorName: string;
  visitorPhone: string;
  purpose: string;
  checkInTime: bigint | undefined;
  checkOutTime: bigint | undefined;
  approvalStatus: string | undefined;
};

function DailyHistoryTab() {
  const today = todayDateString();
  const [historyDate, setHistoryDate] = useState(today);
  const { data: visitors = [], isLoading } = useVisitorHistory(historyDate);

  function calcDuration(
    checkIn: bigint | undefined,
    checkOut: bigint | undefined,
  ): string {
    if (!checkIn || !checkOut) return "—";
    const diffMs = Number(checkOut - checkIn) / 1_000_000;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  }

  return (
    <div>
      <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center gap-3">
        <CalendarDays className="w-4 h-4 text-muted-foreground" />
        <Label className="text-xs font-medium" htmlFor="hist-date">
          Date:
        </Label>
        <input
          id="hist-date"
          type="date"
          value={historyDate}
          max={today}
          onChange={(e) => setHistoryDate(e.target.value)}
          className="text-xs bg-muted border border-border rounded-lg px-3 py-1 h-7 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          data-ocid="visitor.input"
        />
        <span className="text-[11px] text-muted-foreground ml-auto">
          {visitors.length} record{visitors.length !== 1 ? "s" : ""}
        </span>
      </div>
      {isLoading ? (
        <div className="p-4 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Skeleton key={i} className="h-10 w-full rounded" />
          ))}
        </div>
      ) : visitors.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 gap-2"
          data-ocid="visitor.empty_state"
        >
          <ShieldCheck className="w-8 h-8 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            No visitor records for this date
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-muted/60 border-b border-border">
              <tr>
                {[
                  "Visitor",
                  "Phone",
                  "Check-in",
                  "Check-out",
                  "Duration",
                  "Status",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(visitors as VisitorCheckinRecord[]).map((v, idx) => (
                <tr
                  key={v.id}
                  className="border-b border-border/40 hover:bg-muted/20 transition-colors"
                  data-ocid={`visitor.item.${idx + 1}`}
                >
                  <td className="py-2 px-3 font-medium max-w-[120px] truncate">
                    {v.visitorName}
                  </td>
                  <td className="py-2 px-3 font-mono">{v.visitorPhone}</td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    {formatTime(v.checkInTime)}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    {v.checkOutTime ? (
                      formatTime(v.checkOutTime)
                    ) : (
                      <span className="text-emerald-600">Still inside</span>
                    )}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    {calcDuration(v.checkInTime, v.checkOutTime)}
                  </td>
                  <td className="py-2 px-3">
                    <ApprovalBadge
                      status={String(v.approvalStatus ?? "pending")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const [mainTab, setMainTab] = useState<MainTab>("checkin");
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [removePhone, setRemovePhone] = useState<string | null>(null);

  const {
    data: allMembers = [],
    isLoading,
    error,
    refetch,
  } = useGetAllCommunityMembers();
  const { data: searchResults = [], isLoading: isSearching } =
    useSearchCommunityMembers(search);
  const removeMember = useRemoveCommunityMember();

  // Community service counters
  const { data: parkingBookings = [] } = useGetAllCommunityParkingBookings();
  const { data: roomBookings = [] } = useGetAllCommunityRoomBookings();
  const { data: foodOrders = [] } = useGetAllCommunityFoodOrders();
  const { data: workOrders = [] } = useGetAllCommunityWorkOrders();
  const activeParkings = parkingBookings.filter(
    (b) =>
      (b as Record<string, unknown>).status === "confirmed" ||
      (b as Record<string, unknown>).status === "pending",
  ).length;
  const activeRooms = roomBookings.filter(
    (b) =>
      (b as Record<string, unknown>).status === "confirmed" ||
      (b as Record<string, unknown>).status === "pending",
  ).length;
  const activeFoodOrders = foodOrders.filter(
    (o) =>
      (o as Record<string, unknown>).status === "pending" ||
      (o as Record<string, unknown>).status === "preparing",
  ).length;
  const activeWorkOrders = workOrders.filter((w) => {
    const s = (w as Record<string, unknown>).status;
    return s === "pending" || s === "assigned" || s === "in-progress";
  }).length;

  // Full city list from backend
  const { data: cityList = [] } = useGetCityList();
  const cities = useMemo(() => [...cityList].sort(), [cityList]);

  const source = search.trim().length > 0 ? searchResults : allMembers;

  const filtered = useMemo(() => {
    if (cityFilter === "all") return source;
    return source.filter((m) => m.city === cityFilter);
  }, [source, cityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearchChange(v: string) {
    setSearch(v);
    setPage(1);
  }

  async function handleRemove() {
    if (!removePhone) return;
    try {
      await removeMember.mutateAsync(removePhone);
      toast.success(`Member ${removePhone} removed from community`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to remove member");
    } finally {
      setRemovePhone(null);
    }
  }

  const loading = isLoading || isSearching;

  const today = todayDateString();
  const { data: todayVisitors = [] } = useGetVisitorsByDate(today);
  const pendingCount = todayVisitors.filter(
    (v) => v.approvalStatus === "pending",
  ).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Community Service Summary Cards */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-ocid="community.services_summary"
      >
        {(
          [
            {
              label: "Active Parking",
              count: activeParkings,
              total: parkingBookings.length,
              Icon: Car,
              bg: "bg-blue-50 dark:bg-blue-950/30",
              ic: "text-blue-600",
              border: "border-blue-200",
            },
            {
              label: "Room Bookings",
              count: activeRooms,
              total: roomBookings.length,
              Icon: DoorOpen,
              bg: "bg-violet-50 dark:bg-violet-950/30",
              ic: "text-violet-600",
              border: "border-violet-200",
            },
            {
              label: "Food Orders",
              count: activeFoodOrders,
              total: foodOrders.length,
              Icon: UtensilsCrossed,
              bg: "bg-amber-50 dark:bg-amber-950/30",
              ic: "text-amber-600",
              border: "border-amber-200",
            },
            {
              label: "Work Orders",
              count: activeWorkOrders,
              total: workOrders.length,
              Icon: Wrench,
              bg: "bg-emerald-50 dark:bg-emerald-950/30",
              ic: "text-emerald-600",
              border: "border-emerald-200",
            },
          ] as const
        ).map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border ${card.border} px-4 py-3 flex items-center gap-3 bg-card`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${card.bg}`}
            >
              <card.Icon className={`w-4 h-4 ${card.ic}`} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground leading-none">
                {card.count}
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  / {card.total}
                </span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Tabbed Layout */}
      <Tabs
        value={mainTab}
        onValueChange={(v) => setMainTab(v as MainTab)}
        className="w-full"
        data-ocid="community.tabs"
      >
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-foreground text-sm">
                  Community Management
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  {allMembers.length} member{allMembers.length !== 1 ? "s" : ""}{" "}
                  · {todayVisitors.length} visitor
                  {todayVisitors.length !== 1 ? "s" : ""} today
                </p>
              </div>
            </div>
          </div>

          <TabsList className="w-full rounded-none border-b border-border bg-muted/20 h-10 p-0 flex">
            <TabsTrigger
              value="checkin"
              className="flex-1 rounded-none h-full text-xs gap-1.5"
              data-ocid="community.checkin_tab"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Check-in Visitor
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="flex-1 rounded-none h-full text-xs gap-1.5 relative"
              data-ocid="community.pending_tab"
            >
              <Clock className="w-3.5 h-3.5" />
              Pending Approvals
              {pendingCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex-1 rounded-none h-full text-xs gap-1.5"
              data-ocid="community.history_tab"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              Daily History
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="flex-1 rounded-none h-full text-xs gap-1.5"
              data-ocid="community.members_tab"
            >
              <Users className="w-3.5 h-3.5" />
              Community Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checkin" className="mt-0">
            <CheckInVisitorTab onSuccess={() => setMainTab("pending")} />
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            <PendingApprovalsTab />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <DailyHistoryTab />
          </TabsContent>

          <TabsContent value="members" className="mt-0">
            <div className="p-4 space-y-4">
              {/* Filter bar */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search by phone, name, city, location…"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-8 h-8 text-xs"
                    data-ocid="community.search_input"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => handleSearchChange("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <select
                  value={cityFilter}
                  onChange={(e) => {
                    setCityFilter(e.target.value);
                    setPage(1);
                  }}
                  className="text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="community.city_filter"
                >
                  <option value="all">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => refetch()}
                  disabled={loading}
                  data-ocid="community.refresh_button"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>

              {/* Error state */}
              {error && (
                <div
                  className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-center justify-between"
                  data-ocid="community.error_state"
                >
                  <span>Failed to load community members. Please retry.</span>
                  <Button variant="outline" size="sm" onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              )}

              {/* Table */}
              <div className="bg-background border border-border rounded-xl overflow-hidden">
                {loading ? (
                  <div className="p-4 space-y-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                      <Skeleton key={i} className="h-10 w-full rounded" />
                    ))}
                  </div>
                ) : paginated.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-16 gap-3"
                    data-ocid="community.empty_state"
                  >
                    <Users className="w-10 h-10 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground font-medium">
                      {search || cityFilter !== "all"
                        ? "No members match your filter"
                        : "No community members yet. Members are added automatically when any phone number registers."}
                    </p>
                    {(search || cityFilter !== "all") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearch("");
                          setCityFilter("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0 bg-muted/60 border-b border-border">
                        <tr>
                          {[
                            "Phone",
                            "Name",
                            "Apartment",
                            "Address",
                            "City",
                            "Location",
                            "Roles",
                            "Registered",
                            "Actions",
                          ].map((col) => (
                            <th
                              key={col}
                              className="text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginated.map((member, idx) => (
                          <tr
                            key={member.phone}
                            className="border-b border-border/40 hover:bg-muted/20 transition-colors"
                            data-ocid={`community.item.${idx + 1}`}
                          >
                            <td className="py-2 px-3 font-mono">
                              {member.phone}
                            </td>
                            <td className="py-2 px-3 font-medium max-w-[120px] truncate">
                              {member.name || "—"}
                            </td>
                            <td className="py-2 px-3 max-w-[100px] truncate">
                              {member.apartmentName || "—"}
                            </td>
                            <td className="py-2 px-3 max-w-[140px] truncate">
                              {member.address || "—"}
                            </td>
                            <td className="py-2 px-3">
                              {member.city ? (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-muted-foreground" />
                                  {member.city}
                                </span>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className="py-2 px-3 max-w-[100px] truncate">
                              {member.location || "—"}
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex flex-wrap gap-1">
                                {member.roles.length > 0 ? (
                                  member.roles.map((r) => (
                                    <RoleBadge key={r} role={r} />
                                  ))
                                ) : (
                                  <span className="text-muted-foreground">
                                    —
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              {member.registeredAt
                                ? new Date(
                                    Number(member.registeredAt) / 1_000_000,
                                  ).toLocaleDateString("en-IN")
                                : "—"}
                            </td>
                            <td className="py-2 px-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 px-2 text-[10px]"
                                onClick={() => setRemovePhone(member.phone)}
                                data-ocid={`community.delete_button.${idx + 1}`}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Showing {(page - 1) * PAGE_SIZE + 1}–
                    {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                    {filtered.length}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      data-ocid="community.pagination_prev"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      data-ocid="community.pagination_next"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Confirm Remove Dialog */}
      <AlertDialog
        open={!!removePhone}
        onOpenChange={(open) => {
          if (!open) setRemovePhone(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Community Member</AlertDialogTitle>
            <AlertDialogDescription>
              Remove <strong>{removePhone}</strong> from the community
              directory? This only removes them from the community view — their
              account remains active.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="community.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700"
              data-ocid="community.confirm_button"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
