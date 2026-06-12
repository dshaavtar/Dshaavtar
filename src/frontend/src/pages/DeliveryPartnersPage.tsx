import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  ExternalLink,
  IndianRupee,
  Lock,
  MapPin,
  Package,
  Search,
  Star,
  Truck,
  Unlock,
  Upload,
  Wifi,
  WifiOff,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import StatusBadge from "../components/StatusBadge";
import {
  useActiveDeliveryForPartner,
  useDeliveryPartners,
  useManualUnblock,
  usePartnerEarnings,
  useSetDPOnlineStatus,
  useUpdateDeliveryPartnerKYC,
  useVerifyDeliveryPartner,
} from "../hooks/useBackend";
import type { DeliveryPartner } from "../types";

// ─── Country flag helper ──────────────────────────────────────────────────────
function countryFlagEmoji(phone: string): string {
  let cc = "IN";
  if (phone.startsWith("+91") || phone.startsWith("91")) cc = "IN";
  else if (phone.startsWith("+1")) cc = "US";
  else if (phone.startsWith("+44")) cc = "GB";
  else if (phone.startsWith("+971")) cc = "AE";
  if (cc.length !== 2) return "🌐";
  const codePoints = [...cc.toUpperCase()].map(
    (c) => 0x1f1e6 + c.charCodeAt(0) - 65,
  );
  return String.fromCodePoint(...codePoints);
}

// ─── File Picker Field ────────────────────────────────────────────────────────
function FilePickerField({
  label,
  existingUrl,
  onUrlChange,
  ocid,
}: {
  label: string;
  existingUrl: string;
  onUrlChange: (url: string) => void;
  ocid: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(existingUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      setPreview(dataUrl);
      onUrlChange(dataUrl);
      setUploading(false);
      toast.success(`${label} uploaded`);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={handleFile}
          aria-label={`Upload ${label}`}
          data-ocid={ocid}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 text-xs flex-1"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-3 h-3" />
          )}
          {preview ? "Replace" : "Upload"}
        </Button>
        {preview && (
          <a
            href={preview}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
      {preview && (
        <p className="text-xs text-emerald-600 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Uploaded
        </p>
      )}
    </div>
  );
}

// ─── KYC Tab ──────────────────────────────────────────────────────────────────
function DPKYCTab({
  dp,
  onVerify,
  onReject,
}: {
  dp: DeliveryPartner;
  onVerify: () => void;
  onReject: () => void;
}) {
  const updateKYC = useUpdateDeliveryPartnerKYC();
  const [form, setForm] = useState({
    aadhaarNo: dp.aadhaarNo ?? "",
    rcBook: dp.rcBook ?? "",
    panNo: dp.panNo ?? "",
    aadhaarUrl: "",
    rcUrl: "",
    panUrl: "",
  });

  // Retrieve stored rejection reason
  const storedRejectReason =
    typeof window !== "undefined"
      ? (localStorage.getItem(`dp_reject_reason_${dp.id}`) ?? "")
      : "";

  async function handleSave() {
    try {
      await updateKYC.mutateAsync({
        dpId: dp.id,
        aadhaarNo: form.aadhaarNo,
        rcBook: form.rcBook || form.rcUrl,
        panNo: form.panNo,
      });
      toast.success("KYC documents saved");
    } catch {
      toast.error("Failed to save KYC");
    }
  }

  const docs = [
    { label: "Aadhaar Number", ok: !!dp.aadhaarNo },
    { label: "RC Book", ok: !!dp.rcBook },
    { label: "PAN Number", ok: !!dp.panNo },
  ];

  const isRejected = !dp.isVerified && storedRejectReason;

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">KYC Status:</p>
        <Badge
          variant={dp.isVerified ? "default" : "outline"}
          className={dp.isVerified ? "bg-emerald-100 text-emerald-700" : ""}
        >
          {dp.isVerified ? "Verified" : "Pending"}
        </Badge>
      </div>

      {/* Rejection reason banner */}
      {isRejected && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
          <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-destructive mb-0.5">
              Rejection Reason
            </p>
            <p className="text-xs text-muted-foreground">
              {storedRejectReason}
            </p>
          </div>
        </div>
      )}

      {/* Checklist */}
      <div className="grid grid-cols-3 gap-2">
        {docs.map((doc) => (
          <div
            key={doc.label}
            className="flex items-center gap-1.5 p-2 bg-muted/20 rounded-lg text-xs"
          >
            {doc.ok ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            )}
            {doc.label}
          </div>
        ))}
      </div>

      {/* Update form */}
      <div className="border border-border rounded-xl p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Update KYC Documents
        </p>
        <div className="space-y-1">
          <Label className="text-xs">Aadhaar Number</Label>
          <Input
            className="h-8 text-xs"
            value={form.aadhaarNo}
            onChange={(e) =>
              setForm((f) => ({ ...f, aadhaarNo: e.target.value }))
            }
            placeholder="1234 5678 9012"
            data-ocid="dp-kyc-aadhaar-no"
          />
        </div>
        <FilePickerField
          label="Aadhaar Document"
          existingUrl={form.aadhaarUrl}
          onUrlChange={(url) => setForm((f) => ({ ...f, aadhaarUrl: url }))}
          ocid="dp-kyc-aadhaar-upload"
        />
        <div className="space-y-1">
          <Label className="text-xs">RC Book Number</Label>
          <Input
            className="h-8 text-xs"
            value={form.rcBook}
            onChange={(e) => setForm((f) => ({ ...f, rcBook: e.target.value }))}
            placeholder="RC number"
            data-ocid="dp-kyc-rc-no"
          />
        </div>
        <FilePickerField
          label="RC Book Document"
          existingUrl={form.rcUrl}
          onUrlChange={(url) => setForm((f) => ({ ...f, rcUrl: url }))}
          ocid="dp-kyc-rc-upload"
        />
        <div className="space-y-1">
          <Label className="text-xs">PAN Number</Label>
          <Input
            className="h-8 text-xs"
            value={form.panNo}
            onChange={(e) => setForm((f) => ({ ...f, panNo: e.target.value }))}
            placeholder="ABCDE1234F"
            data-ocid="dp-kyc-pan-no"
          />
        </div>
        <FilePickerField
          label="PAN Document"
          existingUrl={form.panUrl}
          onUrlChange={(url) => setForm((f) => ({ ...f, panUrl: url }))}
          ocid="dp-kyc-pan-upload"
        />
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={handleSave}
          disabled={updateKYC.isPending}
          data-ocid="dp-kyc-save"
        >
          {updateKYC.isPending ? "Saving…" : "Save KYC Documents"}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          disabled={dp.isVerified}
          onClick={onVerify}
          data-ocid="dp-kyc-verify"
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          {dp.isVerified ? "Verified" : "Verify"}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="flex-1"
          onClick={onReject}
          data-ocid="dp-kyc-reject"
        >
          <XCircle className="w-4 h-4 mr-1" /> Reject
        </Button>
      </div>
    </div>
  );
}

// ─── Active Delivery Tab ──────────────────────────────────────────────────────
function ActiveDeliveryTab({ dpId }: { dpId: string }) {
  const { data: order, isLoading } = useActiveDeliveryForPartner(dpId);

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="text-center py-8 text-muted-foreground text-sm"
        data-ocid="dp.active_delivery.empty_state"
      >
        No active delivery at the moment
      </div>
    );
  }

  return (
    <div className="space-y-3 py-4" data-ocid="dp.active_delivery.panel">
      <div className="flex items-center gap-2">
        <StatusBadge type="order" value={order.status} />
        <span className="text-xs text-muted-foreground font-mono">
          {order.id}
        </span>
      </div>
      <div className="bg-muted/30 rounded-xl p-3 space-y-1.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Customer
        </p>
        <p className="text-sm font-medium">{order.customerId}</p>
        {order.customerAddress && (
          <div className="flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              {order.customerAddress.address}
            </p>
          </div>
        )}
      </div>
      <div className="bg-muted/30 rounded-xl p-3 space-y-1.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Merchant / Pickup
        </p>
        <p className="text-sm font-medium">{order.merchantId}</p>
      </div>
      <div className="bg-muted/30 rounded-xl p-3 space-y-1.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Order Items
        </p>
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between text-xs">
            <span>
              {item.productName} × {Number(item.quantity)}
            </span>
            <span className="font-medium">
              ₹{item.totalRate.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm bg-muted/20 rounded-xl p-3">
        <span className="text-muted-foreground">Delivery Charge</span>
        <span className="font-semibold">₹{order.deliveryCharge}</span>
      </div>
    </div>
  );
}

// ─── Earnings Tab ─────────────────────────────────────────────────────────────
function EarningsTab({ dpId }: { dpId: string }) {
  const { data: earnings, isLoading } = usePartnerEarnings(dpId);

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!earnings) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No earnings data
      </p>
    );
  }

  return (
    <div className="space-y-3 py-4" data-ocid="dp.earnings.panel">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Today", value: earnings.today, color: "text-primary" },
          {
            label: "This Month",
            value: earnings.thisMonth,
            color: "text-emerald-600",
          },
          {
            label: "Total Earned",
            value: earnings.total,
            color: "text-foreground",
          },
          {
            label: "Deliveries",
            value: earnings.deliveriesCount,
            color: "text-amber-600",
            isCount: true,
          },
        ].map(({ label, value, color, isCount }) => (
          <div key={label} className="bg-muted/30 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <div className={`flex items-center justify-center gap-1 ${color}`}>
              {!isCount && <IndianRupee className="w-4 h-4" />}
              <p className="text-xl font-bold font-display">
                {isCount ? value : value.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Earnings calculated from completed deliveries (delivery charges)
      </p>
    </div>
  );
}

// ─── Detail Sheet ─────────────────────────────────────────────────────────────
function DPDetailSheet({
  dp,
  onClose,
}: { dp: DeliveryPartner | null; onClose: () => void }) {
  const verifyDP = useVerifyDeliveryPartner();
  const unblockDP = useManualUnblock();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  if (!dp) return null;

  const isBlocked =
    dp.blockedUntil !== undefined &&
    dp.blockedUntil !== null &&
    Number(dp.blockedUntil) > Date.now();

  async function handleVerify() {
    try {
      await verifyDP.mutateAsync({ id: dp!.id, isApproved: true, reason: "" });
      toast.success("Delivery Partner Approved — notification sent");
    } catch {
      toast.error("Failed to verify");
    }
  }

  async function handleReject() {
    try {
      const reason = rejectReason || "Documents incomplete";
      await verifyDP.mutateAsync({
        id: dp!.id,
        isApproved: false,
        reason,
      });
      // Persist rejection reason for display in KYC tab
      localStorage.setItem(`dp_reject_reason_${dp!.id}`, reason);
      setShowRejectDialog(false);
      setRejectReason("");
      toast.success("Delivery Partner Rejected — reason sent");
    } catch {
      toast.error("Failed to reject");
    }
  }

  async function handleUnblock() {
    try {
      await unblockDP.mutateAsync({
        entityId: dp!.id,
        entityType: "deliveryPartner",
      });
      toast.success("Partner unblocked successfully");
    } catch {
      toast.error("Failed to unblock");
    }
  }

  return (
    <>
      <Sheet open={!!dp} onOpenChange={(o) => !o && onClose()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle className="font-display">{dp.name}</SheetTitle>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="outline" className="capitalize text-xs">
                {dp.vehicleType}
              </Badge>
              <StatusBadge
                type="boolean"
                value={dp.isOnline}
                trueLabel="Online"
                falseLabel="Offline"
              />
              <StatusBadge
                type="boolean"
                value={dp.isVerified}
                trueLabel="Verified"
                falseLabel="Pending KYC"
              />
              {isBlocked && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                  <Lock className="w-3 h-3" /> Blocked
                </span>
              )}
            </div>
          </SheetHeader>

          <div className="mt-3 flex gap-2 flex-wrap">
            <Button
              size="sm"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={dp.isVerified || verifyDP.isPending}
              onClick={handleVerify}
              data-ocid="dp-sheet-verify"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              {dp.isVerified ? "Verified" : "Verify"}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              disabled={verifyDP.isPending}
              onClick={() => setShowRejectDialog(true)}
              data-ocid="dp-sheet-reject"
            >
              <XCircle className="w-4 h-4 mr-1" /> Reject
            </Button>
            {isBlocked && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-amber-600 border-amber-300 hover:bg-amber-50 gap-1.5"
                disabled={unblockDP.isPending}
                onClick={handleUnblock}
                data-ocid="dp-sheet-unblock"
              >
                <Unlock className="w-3.5 h-3.5" />
                {unblockDP.isPending ? "Unblocking…" : "Unblock"}
              </Button>
            )}
          </div>

          <Tabs defaultValue="profile" className="mt-4">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="profile" className="text-xs">
                Profile
              </TabsTrigger>
              <TabsTrigger value="kyc" className="text-xs">
                KYC
              </TabsTrigger>
              <TabsTrigger value="delivery" className="text-xs">
                Active
              </TabsTrigger>
              <TabsTrigger value="earnings" className="text-xs">
                Earnings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-2 gap-3 py-4">
                {[
                  { label: "Partner ID", value: dp.id },
                  { label: "Service Type", value: dp.serviceType },
                  { label: "Vehicle Type", value: dp.vehicleType },
                  { label: "Rate/km", value: `₹${dp.ratePerKm}` },
                  {
                    label: "Rating",
                    value: `${dp.avgRating} (${Number(dp.ratingCount)} ratings)`,
                  },
                  {
                    label: "ONDC",
                    value: dp.isOndcEnrolled ? "Enrolled" : "Not Enrolled",
                  },
                  {
                    label: "Registered",
                    value: "—",
                  },
                  {
                    label: "Joined",
                    value: "—",
                  },
                  {
                    label: "KYC Status",
                    value: dp.kycStatus,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-muted/30 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium mt-0.5 capitalize truncate">
                      {value}
                    </p>
                  </div>
                ))}
                {dp.currentLocation && (
                  <div className="col-span-2 bg-muted/20 rounded-xl p-3 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {dp.currentLocation.address}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="kyc">
              <DPKYCTab
                dp={dp}
                onVerify={handleVerify}
                onReject={() => setShowRejectDialog(true)}
              />
            </TabsContent>

            <TabsContent value="delivery">
              <ActiveDeliveryTab dpId={dp.id} />
            </TabsContent>

            <TabsContent value="earnings">
              <EarningsTab dpId={dp.id} />
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* Reject dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-md" data-ocid="dp-reject-dialog">
          <DialogHeader>
            <DialogTitle>Reject Delivery Partner — {dp.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Provide a rejection reason. The partner will be notified.
            </p>
            <div className="space-y-1.5">
              <Label>Rejection Reason</Label>
              <Textarea
                placeholder="e.g. Aadhaar document missing, RC book expired…"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                data-ocid="dp-reject-reason"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowRejectDialog(false)}
                data-ocid="dp-reject-cancel"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleReject}
                disabled={verifyDP.isPending}
                data-ocid="dp-reject-confirm"
              >
                {verifyDP.isPending ? "Rejecting…" : "Reject"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function DeliveryPartnersPage() {
  const { data: partners = [], isLoading } = useDeliveryPartners();
  const setOnlineStatus = useSetDPOnlineStatus();
  const [search, setSearch] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [kycFilter, setKycFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedDP, setSelectedDP] = useState<DeliveryPartner | null>(null);

  const filtered = partners.filter((dp) => {
    if (search && !dp.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (vehicleFilter !== "all" && dp.vehicleType !== vehicleFilter)
      return false;
    if (kycFilter === "verified" && !dp.isVerified) return false;
    if (kycFilter === "pending" && dp.isVerified) return false;
    if (serviceFilter !== "all" && dp.serviceType !== serviceFilter)
      return false;
    if (showOnlineOnly && !dp.isOnline) return false;
    return true;
  });

  async function handleToggleOnline(dp: DeliveryPartner) {
    try {
      await setOnlineStatus.mutateAsync({
        phone: dp.id,
        isOnline: !dp.isOnline,
      });
      toast.success(`${dp.name} marked ${!dp.isOnline ? "Online" : "Offline"}`);
    } catch {
      toast.error("Failed to update online status");
    }
  }

  const totalDP = partners.length;
  const verified = partners.filter((dp) => dp.isVerified).length;
  const online = partners.filter((dp) => dp.isOnline).length;
  const sarthi = partners.filter((dp) => dp.serviceType === "sarthi").length;

  const vehicleTypes = Array.from(
    new Set(partners.map((dp) => dp.vehicleType)),
  );
  const serviceTypes = Array.from(
    new Set(partners.map((dp) => dp.serviceType)),
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Delivery Partners & Sarthi
        </h2>
        <p className="text-sm text-muted-foreground">
          {partners.length} registered partners
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Partners", value: totalDP, color: "text-foreground" },
          { label: "Verified KYC", value: verified, color: "text-emerald-600" },
          { label: "Online Now", value: online, color: "text-primary" },
          { label: "Sarthi/Ride", value: sarthi, color: "text-amber-600" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-3 flex flex-col gap-1"
          >
            <p className={`text-2xl font-bold font-display ${color}`}>
              {value}
            </p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            placeholder="Search partners…"
            data-ocid="dp-search"
          />
        </div>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger
            className="w-full sm:w-36"
            data-ocid="dp-filter-service"
          >
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {serviceTypes.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
          <SelectTrigger
            className="w-full sm:w-36"
            data-ocid="dp-filter-vehicle"
          >
            <SelectValue placeholder="Vehicle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vehicles</SelectItem>
            {vehicleTypes.map((v) => (
              <SelectItem key={v} value={v} className="capitalize">
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={kycFilter} onValueChange={setKycFilter}>
          <SelectTrigger className="w-full sm:w-32" data-ocid="dp-filter-kyc">
            <SelectValue placeholder="KYC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All KYC</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
          <Switch
            checked={showOnlineOnly}
            onCheckedChange={setShowOnlineOnly}
            id="dp-online-filter"
            data-ocid="dp-filter-online-toggle"
          />
          <Label
            htmlFor="dp-online-filter"
            className="text-xs cursor-pointer flex items-center gap-1"
          >
            {showOnlineOnly ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-muted-foreground" />
            )}
            Online Only
          </Label>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {["d1", "d2", "d3", "d4", "d5"].map((s) => (
              <Skeleton key={s} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center gap-3 py-16 text-center"
            data-ocid="dp.empty_state"
          >
            <Truck className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">
              No delivery partners found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="dp.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-3 font-medium">Service</th>
                  <th className="text-left py-3 px-3 font-medium">Vehicle</th>
                  <th className="text-left py-3 px-3 font-medium">Rate/km</th>
                  <th className="text-left py-3 px-3 font-medium">Rating</th>
                  <th className="text-left py-3 px-3 font-medium">Online</th>
                  <th className="text-left py-3 px-3 font-medium">KYC</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Registered
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dp, idx) => {
                  const dpBlocked =
                    dp.blockedUntil !== undefined &&
                    dp.blockedUntil !== null &&
                    Number(dp.blockedUntil) > Date.now();
                  return (
                    <tr
                      key={dp.id}
                      className={[
                        "border-b border-border/50 transition-colors",
                        dpBlocked
                          ? "bg-red-50/50 dark:bg-red-950/10 hover:bg-red-50 dark:hover:bg-red-950/20"
                          : "hover:bg-muted/20",
                      ].join(" ")}
                      data-ocid={`dp.item.${idx + 1}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base" title="Country">
                            {countryFlagEmoji("+91")}
                          </span>
                          <div>
                            <button
                              type="button"
                              className="font-medium text-foreground hover:text-primary transition-colors text-left"
                              onClick={() => setSelectedDP(dp)}
                              data-ocid={`dp.view_button.${idx + 1}`}
                            >
                              {dp.name}
                            </button>
                            {dpBlocked && (
                              <div className="flex items-center gap-0.5 mt-0.5">
                                <Lock className="w-2.5 h-2.5 text-destructive" />
                                <span className="text-xs text-destructive">
                                  Blocked
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs capitalize text-muted-foreground">
                          {dp.serviceType}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs capitalize bg-muted px-2 py-0.5 rounded-full">
                          {dp.vehicleType}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs tabular-nums">
                        ₹{dp.ratePerKm}/km
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs">{dp.avgRating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={dp.isOnline}
                            onCheckedChange={() => handleToggleOnline(dp)}
                            disabled={setOnlineStatus.isPending}
                            data-ocid={`dp.online-toggle.${idx + 1}`}
                            aria-label={`Toggle online status for ${dp.name}`}
                          />
                          <span
                            className={`text-xs font-medium ${dp.isOnline ? "text-emerald-600" : "text-muted-foreground"}`}
                          >
                            {dp.isOnline ? (
                              <span className="flex items-center gap-0.5">
                                <Wifi className="w-3 h-3" /> Online
                              </span>
                            ) : (
                              <span className="flex items-center gap-0.5">
                                <WifiOff className="w-3 h-3" /> Offline
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        {dp.isVerified ? (
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                            Verified
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-xs text-amber-600 border-amber-300"
                          >
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-muted-foreground">
                        —
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs"
                            onClick={() => setSelectedDP(dp)}
                            data-ocid={`dp.details_button.${idx + 1}`}
                          >
                            Details
                          </Button>
                          {!dp.isVerified && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs text-emerald-600 hover:bg-emerald-50"
                              onClick={() => setSelectedDP(dp)}
                              data-ocid={`dp.verify_button.${idx + 1}`}
                            >
                              <CheckCircle className="w-3.5 h-3.5 mr-0.5" />
                              KYC
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DPDetailSheet dp={selectedDP} onClose={() => setSelectedDP(null)} />
    </div>
  );
}
