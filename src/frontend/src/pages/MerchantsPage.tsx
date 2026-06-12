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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Lock,
  MapPin,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  Star,
  Store,
  Trash2,
  TrendingUp,
  Unlock,
  Upload,
  Users,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import StatusBadge from "../components/StatusBadge";
import {
  useAddMerchantBranch,
  useClearFlowCache,
  useCreateMerchant,
  useDeactivateMerchant,
  useEntityLeads,
  useManualUnblock,
  useMerchants,
  useProducts,
  useSetBoostedOrderCount,
  useUpdateMerchantKYCDocuments,
  useVerifyMerchant,
} from "../hooks/useBackend";
import { useDebounce, usePagination } from "../hooks/usePagination";
import type { Merchant } from "../types";
import { VerificationStatus } from "../types";
import { PHONE_ERROR_MSG, validatePhone } from "../utils";

// ─── Country flag helper ──────────────────────────────────────────────────────
function countryFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const code = countryCode.toUpperCase();
  const codePoints = [...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}

function getCountryFromPhone(phone: string): string {
  if (phone.startsWith("+91") || phone.startsWith("91")) return "IN";
  if (phone.startsWith("+1")) return "US";
  if (phone.startsWith("+44")) return "GB";
  if (phone.startsWith("+971")) return "AE";
  if (phone.startsWith("+65")) return "SG";
  return "IN";
}

const CATEGORY_COLORS: Record<string, string> = {
  Grocery: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Food & Beverages": "bg-orange-100 text-orange-700 border-orange-200",
  Electronics: "bg-blue-100 text-blue-700 border-blue-200",
  Clothing: "bg-purple-100 text-purple-700 border-purple-200",
  Medicine: "bg-red-100 text-red-700 border-red-200",
};

function CategoryBadge({ category }: { category: string }) {
  const cls =
    CATEGORY_COLORS[category] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      {category}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ─── KYC File picker helper ───────────────────────────────────────────────────

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
  const [previewUrl, setPreviewUrl] = useState(existingUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Read file as data URL for preview; in production this would upload via object-storage
      const reader = new FileReader();
      reader.onload = (evt) => {
        const dataUrl = evt.target?.result as string;
        setPreviewUrl(dataUrl);
        onUrlChange(dataUrl);
        setUploading(false);
        toast.success(`${label} uploaded`);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
      toast.error(`Failed to upload ${label}`);
    }
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
          {previewUrl ? "Replace File" : "Upload File"}
        </Button>
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
            title="View uploaded document"
          >
            <ExternalLink className="w-3 h-3" />
            View
          </a>
        )}
      </div>
      {previewUrl && (
        <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5">
          <CheckCircle className="w-3 h-3" /> Document uploaded
        </p>
      )}
    </div>
  );
}

// ─── KYC doc upload tab ---
function KYCTab({
  merchant,
  onVerify,
  onReject,
}: {
  merchant: Merchant;
  onVerify: () => void;
  onReject: () => void;
}) {
  const updateKYC = useUpdateMerchantKYCDocuments();
  const [form, setForm] = useState({
    panNo: merchant.kyc.panNumber ?? "",
    panUrl: merchant.kyc.panImageUrl ?? "",
    aadhaarNo: merchant.kyc.aadhaarNumber ?? "",
    aadhaarUrl: merchant.kyc.aadhaarImageUrl ?? "",
    gstNo: merchant.kyc.gstNumber ?? "",
    gstUrl: merchant.kyc.gstImageUrl ?? "",
    outletPhotoUrl: merchant.kyc.outletPhotoUrl ?? "",
    chequeUrl: merchant.kyc.cancelledChequeUrl ?? "",
    qrUrl: merchant.kyc.personalQRUrl ?? "",
  });

  // Show rejection reason from backend data
  const storedReason = merchant.rejectionReason ?? "";

  const docs = [
    {
      label: "PAN Number",
      value: merchant.kyc.panNumber,
      ok: !!merchant.kyc.panNumber,
    },
    {
      label: "PAN Document",
      value: merchant.kyc.panImageUrl ? "Uploaded" : undefined,
      ok: !!merchant.kyc.panImageUrl,
    },
    {
      label: "Aadhaar Number",
      value: merchant.kyc.aadhaarNumber,
      ok: !!merchant.kyc.aadhaarNumber,
    },
    {
      label: "Aadhaar Document",
      value: merchant.kyc.aadhaarImageUrl ? "Uploaded" : undefined,
      ok: !!merchant.kyc.aadhaarImageUrl,
    },
    {
      label: "GST Number",
      value: merchant.kyc.gstNumber,
      ok: !!merchant.kyc.gstNumber,
    },
    {
      label: "Outlet Photo",
      value: merchant.kyc.outletPhotoUrl ? "Uploaded" : undefined,
      ok: !!merchant.kyc.outletPhotoUrl,
    },
    {
      label: "Cancelled Cheque",
      value: merchant.kyc.cancelledChequeUrl ? "Uploaded" : undefined,
      ok: !!merchant.kyc.cancelledChequeUrl,
    },
    {
      label: "UPI/QR Code",
      value: merchant.kyc.personalQRUrl ? "Uploaded" : undefined,
      ok: !!merchant.kyc.personalQRUrl,
    },
  ];

  async function handleSaveDocuments() {
    try {
      await updateKYC.mutateAsync({ merchantId: merchant.id, ...form });
      toast.success("KYC documents saved");
    } catch {
      toast.error("Failed to save KYC documents");
    }
  }

  const isVerified =
    merchant.kyc.verificationStatus === VerificationStatus.verified;
  const isRejected =
    merchant.kyc.verificationStatus === VerificationStatus.rejected;

  return (
    <div className="space-y-3 py-4">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm text-muted-foreground">Verification Status:</p>
        <StatusBadge
          type="verification"
          value={merchant.kyc.verificationStatus}
        />
      </div>

      {/* Rejection reason banner */}
      {isRejected && storedReason && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
          <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-destructive mb-0.5">
              Rejection Reason
            </p>
            <p className="text-xs text-muted-foreground">{storedReason}</p>
          </div>
        </div>
      )}
      {isRejected && !storedReason && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-destructive">
          <XCircle className="w-4 h-4 shrink-0" />
          Merchant verification was rejected. Use the Reject button to provide a
          reason.
        </div>
      )}

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-2">
        {docs.map((doc) => (
          <div
            key={doc.label}
            className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg"
          >
            {doc.ok ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            )}
            <span className="text-xs truncate">{doc.label}</span>
          </div>
        ))}
      </div>

      {/* Edit KYC documents */}
      <div className="border border-border rounded-xl p-4 space-y-3 mt-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Update KYC Documents
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">PAN Number</Label>
            <Input
              className="h-8 text-xs"
              value={form.panNo}
              onChange={(e) =>
                setForm((f) => ({ ...f, panNo: e.target.value }))
              }
              placeholder="ABCDE1234F"
              data-ocid="merchant-kyc-pan-no"
            />
          </div>
          <FilePickerField
            label="PAN Document"
            existingUrl={form.panUrl}
            onUrlChange={(url) => setForm((f) => ({ ...f, panUrl: url }))}
            ocid="merchant-kyc-pan-upload"
          />
          <div className="space-y-1">
            <Label className="text-xs">Aadhaar Number</Label>
            <Input
              className="h-8 text-xs"
              value={form.aadhaarNo}
              onChange={(e) =>
                setForm((f) => ({ ...f, aadhaarNo: e.target.value }))
              }
              placeholder="1234 5678 9012"
              data-ocid="merchant-kyc-aadhaar-no"
            />
          </div>
          <FilePickerField
            label="Aadhaar Document"
            existingUrl={form.aadhaarUrl}
            onUrlChange={(url) => setForm((f) => ({ ...f, aadhaarUrl: url }))}
            ocid="merchant-kyc-aadhaar-upload"
          />
          <div className="space-y-1">
            <Label className="text-xs">GST Number (optional)</Label>
            <Input
              className="h-8 text-xs"
              value={form.gstNo}
              onChange={(e) =>
                setForm((f) => ({ ...f, gstNo: e.target.value }))
              }
              placeholder="29ABCDE1234F1Z5"
              data-ocid="merchant-kyc-gst-no"
            />
          </div>
          <FilePickerField
            label="GST Document"
            existingUrl={form.gstUrl}
            onUrlChange={(url) => setForm((f) => ({ ...f, gstUrl: url }))}
            ocid="merchant-kyc-gst-upload"
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <FilePickerField
            label="Outlet Photo"
            existingUrl={form.outletPhotoUrl}
            onUrlChange={(url) =>
              setForm((f) => ({ ...f, outletPhotoUrl: url }))
            }
            ocid="merchant-kyc-outlet-upload"
          />
          <FilePickerField
            label="Cancelled Cheque"
            existingUrl={form.chequeUrl}
            onUrlChange={(url) => setForm((f) => ({ ...f, chequeUrl: url }))}
            ocid="merchant-kyc-cheque-upload"
          />
          <FilePickerField
            label="UPI / QR Code"
            existingUrl={form.qrUrl}
            onUrlChange={(url) => setForm((f) => ({ ...f, qrUrl: url }))}
            ocid="merchant-kyc-qr-upload"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full gap-1.5"
          onClick={handleSaveDocuments}
          disabled={updateKYC.isPending}
          data-ocid="merchant-kyc-save-docs"
        >
          {updateKYC.isPending ? "Saving…" : "Save Documents"}
        </Button>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          size="sm"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          disabled={isVerified || updateKYC.isPending}
          onClick={onVerify}
          data-ocid="merchant-kyc-verify"
        >
          <CheckCircle className="w-4 h-4 mr-1" />{" "}
          {isVerified ? "Verified" : "Verify"}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="flex-1"
          onClick={onReject}
          data-ocid="merchant-kyc-reject"
        >
          <XCircle className="w-4 h-4 mr-1" /> Reject
        </Button>
      </div>
    </div>
  );
}

// --- Leads tab ---
function LeadsTab({ merchantId }: { merchantId: string }) {
  const { data: leads, isLoading } = useEntityLeads("merchant", merchantId);
  if (isLoading)
    return (
      <div className="py-8 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  if (!leads || leads.views === 0)
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No leads yet for this merchant
      </p>
    );
  return (
    <div className="space-y-3 py-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/30 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Total Views</p>
          <p className="text-2xl font-bold font-display text-primary">
            {leads.views}
          </p>
        </div>
        <div className="bg-muted/30 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Interested</p>
          <p className="text-2xl font-bold font-display text-emerald-600">
            {leads.interested}
          </p>
        </div>
      </div>
      {leads.viewers.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Recent Viewers
          </p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {leads.viewers.map((v, i) => (
              <div
                key={`${v.phone}-${i}`}
                className="flex items-center justify-between p-2 bg-muted/20 rounded-lg"
              >
                <span className="text-sm font-mono text-foreground">
                  {v.phone}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(v.timestamp).toLocaleDateString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductsTab({ merchantId }: { merchantId: string }) {
  const { data: products = [], isLoading } = useProducts(merchantId);
  const merchantProducts = products.filter((p) => p.merchantId === merchantId);
  if (isLoading)
    return (
      <div className="space-y-2 py-4">
        {Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((id) => (
          <Skeleton key={id} className="h-12 w-full" />
        ))}
      </div>
    );
  if (merchantProducts.length === 0)
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No products listed
      </p>
    );
  return (
    <div className="space-y-2 py-4">
      {merchantProducts.map((p) => (
        <div
          key={p.id}
          className="flex items-center justify-between p-3 bg-muted/20 rounded-xl"
        >
          <div>
            <p className="text-sm font-medium">{p.title}</p>
            <p className="text-xs text-muted-foreground">{p.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-semibold">
              ₹{p.baseRate.toLocaleString("en-IN")}
            </p>
            <StatusBadge type="boolean" value={p.isActive} />
          </div>
        </div>
      ))}
    </div>
  );
}

function BranchesTab({ merchant }: { merchant: Merchant }) {
  const addBranchMutation = useAddMerchantBranch();
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [branchAddress, setBranchAddress] = useState("");
  const [branchRadius, setBranchRadius] = useState("5");

  const mainBranch = {
    id: "main",
    name: "Main Branch",
    address: merchant.location.address,
  };
  const extraBranches = merchant.branches.map((b, i) => ({
    id: `b-${i}`,
    name: `Branch ${i + 1}`,
    address: b.address,
  }));

  async function handleAddBranch(e: React.FormEvent) {
    e.preventDefault();
    if (!branchAddress.trim()) {
      toast.error("Branch address is required");
      return;
    }
    try {
      if (addBranchMutation) {
        await addBranchMutation.mutateAsync({
          merchantId: merchant.id,
          address: branchAddress.trim(),
          radiusKm: Number(branchRadius) || 5,
        });
      }
      toast.success("Branch added successfully");
      setBranchAddress("");
      setBranchRadius("5");
      setShowAddBranch(false);
    } catch {
      toast.error("Failed to add branch");
    }
  }

  return (
    <div className="space-y-2 py-4">
      {[mainBranch, ...extraBranches].map((branch) => (
        <div key={branch.id} className="p-3 bg-muted/20 rounded-xl">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">{branch.name}</p>
              <p className="text-xs text-muted-foreground">{branch.address}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="pt-2">
        {!showAddBranch ? (
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-1.5 text-xs"
            onClick={() => setShowAddBranch(true)}
            data-ocid="merchant-branches-add-branch-button"
          >
            <Plus className="w-3.5 h-3.5" /> Add Branch
          </Button>
        ) : (
          <form
            onSubmit={handleAddBranch}
            className="bg-muted/20 border border-border rounded-xl p-3 space-y-2"
            data-ocid="merchant-branches-add-form"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              New Branch
            </p>
            <div className="space-y-1">
              <Label className="text-xs">Branch Address *</Label>
              <Input
                className="h-8 text-xs"
                value={branchAddress}
                onChange={(e) => setBranchAddress(e.target.value)}
                placeholder="Street, area, city"
                required
                data-ocid="merchant-branches-address-input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Delivery Radius (km)</Label>
              <Input
                className="h-8 text-xs"
                type="number"
                min={1}
                value={branchRadius}
                onChange={(e) => setBranchRadius(e.target.value)}
                placeholder="5"
                data-ocid="merchant-branches-radius-input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="flex-1 text-xs h-8"
                onClick={() => setShowAddBranch(false)}
                data-ocid="merchant-branches-cancel-button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="flex-1 text-xs h-8"
                disabled={addBranchMutation?.isPending}
                data-ocid="merchant-branches-save-button"
              >
                {addBranchMutation?.isPending ? "Adding…" : "Save Branch"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function MerchantDetailSheet({
  merchant,
  onClose,
}: { merchant: Merchant | null; onClose: () => void }) {
  const verifyMerchant = useVerifyMerchant();
  const deactivateMerchant = useDeactivateMerchant();
  const setBoostedCount = useSetBoostedOrderCount();
  const unblockMerchant = useManualUnblock();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [boostedInput, setBoostedInput] = useState("");

  if (!merchant) return null;
  const currentMerchant = merchant;
  const isVerified =
    currentMerchant.kyc.verificationStatus === VerificationStatus.verified;
  const isBlocked =
    merchant.blockedUntil !== undefined &&
    merchant.blockedUntil !== null &&
    Number(merchant.blockedUntil) > Date.now();

  async function handleVerify() {
    try {
      await verifyMerchant.mutateAsync({
        id: currentMerchant.id,
        isApproved: true,
        reason: "",
      });
      toast.success("Merchant Approved — notification sent to merchant");
    } catch {
      toast.error("Failed to verify merchant");
    }
  }

  async function handleReject() {
    try {
      const reason = rejectReason || "Does not meet requirements";
      await verifyMerchant.mutateAsync({
        id: currentMerchant.id,
        isApproved: false,
        reason,
      });
      setShowRejectDialog(false);
      setRejectReason("");
      toast.success("Merchant Rejected — reason sent to merchant");
    } catch {
      toast.error("Failed to reject merchant");
    }
  }

  async function handleToggleActive() {
    try {
      await deactivateMerchant.mutateAsync({
        id: currentMerchant.id,
        isActive: !currentMerchant.isActive,
      });
      toast.success(
        currentMerchant.isActive
          ? "Merchant deactivated"
          : "Merchant activated",
      );
    } catch {
      toast.error("Failed to update merchant status");
    }
  }

  async function handleUnblock() {
    try {
      await unblockMerchant.mutateAsync({
        entityId: currentMerchant.id,
        entityType: "merchant",
      });
      toast.success("Merchant unblocked successfully");
    } catch {
      toast.error("Failed to unblock merchant");
    }
  }

  async function handleSaveBoostedCount() {
    const count = Number.parseInt(boostedInput);
    if (Number.isNaN(count) || count < 0) {
      toast.error("Enter a valid number");
      return;
    }
    try {
      await setBoostedCount.mutateAsync({
        merchantId: currentMerchant.id,
        count,
      });
      toast.success(`Boosted order count set to ${count}`);
      setBoostedInput("");
    } catch {
      toast.error("Failed to set boosted count");
    }
  }

  return (
    <>
      <Sheet open={!!merchant} onOpenChange={(o) => !o && onClose()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <SheetTitle className="font-display truncate">
                  {merchant.businessName}
                </SheetTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <CategoryBadge category={merchant.category} />
                  <StatusBadge type="boolean" value={merchant.isActive} />
                  <StatusBadge
                    type="verification"
                    value={merchant.kyc.verificationStatus}
                  />
                  {isBlocked && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                      <Lock className="w-3 h-3" /> Blocked until{" "}
                      {new Date(
                        Number(merchant.blockedUntil),
                      ).toLocaleDateString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-2 flex gap-2 flex-wrap">
            <Button
              size="sm"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={isVerified || verifyMerchant.isPending}
              onClick={handleVerify}
              data-ocid="merchant-sheet-verify"
            >
              <CheckCircle className="w-4 h-4 mr-1" />{" "}
              {isVerified ? "Verified" : "Verify Merchant"}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              disabled={verifyMerchant.isPending}
              onClick={() => setShowRejectDialog(true)}
              data-ocid="merchant-sheet-reject"
            >
              <XCircle className="w-4 h-4 mr-1" /> Reject
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              disabled={deactivateMerchant.isPending}
              onClick={handleToggleActive}
              data-ocid="merchant-sheet-toggle-active"
            >
              {merchant.isActive ? "Deactivate" : "Activate"}
            </Button>
            {isBlocked && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-amber-600 border-amber-300 hover:bg-amber-50 gap-1.5"
                disabled={unblockMerchant.isPending}
                onClick={handleUnblock}
                data-ocid="merchant-sheet-unblock"
              >
                <Unlock className="w-3.5 h-3.5" />
                {unblockMerchant.isPending ? "Unblocking…" : "Unblock"}
              </Button>
            )}
          </div>

          <Tabs defaultValue="profile" className="mt-4">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="profile" className="text-xs">
                Profile
              </TabsTrigger>
              <TabsTrigger value="kyc" className="text-xs">
                KYC
              </TabsTrigger>
              <TabsTrigger value="products" className="text-xs">
                Products
              </TabsTrigger>
              <TabsTrigger value="branches" className="text-xs">
                Branches
              </TabsTrigger>
              <TabsTrigger
                value="leads"
                className="text-xs"
                data-ocid="merchant-leads-tab"
              >
                Leads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-2 gap-3 py-4">
                {(
                  [
                    { label: "Merchant ID", value: merchant.id },
                    { label: "Merchant Type", value: merchant.merchantType },
                    { label: "Delivery Type", value: merchant.deliveryType },
                    {
                      label: "ONDC",
                      value: merchant.isOndcEnrolled
                        ? "Enrolled"
                        : "Not Enrolled",
                    },
                    { label: "Category", value: merchant.category },
                    { label: "Rating", value: merchant.avgRating.toFixed(1) },
                  ] as { label: string; value: string }[]
                ).map(({ label, value }) => (
                  <div key={label} className="bg-muted/30 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium mt-0.5 capitalize">
                      {value}
                    </p>
                  </div>
                ))}
                <div className="col-span-2 bg-muted/20 rounded-xl p-3 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    {merchant.location.address}
                  </p>
                </div>
                {/* Boosted Orders section */}
                <div className="col-span-2 bg-muted/20 rounded-xl p-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Boosted Order Count (Admin)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Set a minimum displayed order count to boost merchant
                    credibility. Real orders are unaffected.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={0}
                      value={boostedInput}
                      onChange={(e) => setBoostedInput(e.target.value)}
                      placeholder="e.g. 500"
                      className="h-8 text-xs flex-1"
                      data-ocid="merchant-boosted-orders-input"
                    />
                    <Button
                      size="sm"
                      className="h-8 text-xs"
                      onClick={handleSaveBoostedCount}
                      disabled={setBoostedCount.isPending || !boostedInput}
                      data-ocid="merchant-boosted-orders-save"
                    >
                      Set
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="kyc">
              <KYCTab
                merchant={merchant}
                onVerify={handleVerify}
                onReject={() => setShowRejectDialog(true)}
              />
            </TabsContent>
            <TabsContent value="products">
              <ProductsTab merchantId={merchant.id} />
            </TabsContent>
            <TabsContent value="branches">
              <BranchesTab merchant={merchant} />
            </TabsContent>
            <TabsContent value="leads">
              <LeadsTab merchantId={merchant.id} />
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* Reject reason dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent
          className="sm:max-w-md"
          data-ocid="merchant-reject-dialog"
        >
          <DialogHeader>
            <DialogTitle>Reject Merchant — {merchant.businessName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Provide a reason for rejection. This helps the merchant understand
              what's required.
            </p>
            <div className="space-y-1.5">
              <Label>Rejection Reason</Label>
              <Textarea
                placeholder="e.g. KYC documents incomplete, PAN card missing…"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                data-ocid="merchant-reject-reason"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowRejectDialog(false)}
                data-ocid="merchant-reject-cancel"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleReject}
                disabled={verifyMerchant.isPending}
                data-ocid="merchant-reject-confirm"
              >
                {verifyMerchant.isPending ? "Rejecting…" : "Reject Merchant"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function MerchantCard({
  merchant,
  onClick,
}: { merchant: Merchant; onClick: () => void }) {
  const userPhone = merchant.location?.address?.startsWith("+")
    ? merchant.location.address
    : "+919876543210";
  const cc = getCountryFromPhone(userPhone);
  const flag = countryFlagEmoji(cc);
  const isBlocked =
    merchant.blockedUntil !== undefined &&
    merchant.blockedUntil !== null &&
    Number(merchant.blockedUntil) > Date.now();

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-2xl p-4 hover:border-primary/50 hover:shadow-md transition-all space-y-3 group"
      data-ocid="merchants-card"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Store className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
              {merchant.businessName}
            </p>
            <CategoryBadge category={merchant.category} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isBlocked && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
              <Lock className="w-3 h-3" /> Blocked
            </span>
          )}
          <StatusBadge type="boolean" value={merchant.isActive} />
        </div>
      </div>
      <Stars rating={merchant.avgRating} />
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <Users className="w-2.5 h-2.5" />
          {Number(merchant.customerCount ?? 0).toLocaleString("en-IN")}{" "}
          customers
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <ShoppingCart className="w-2.5 h-2.5" />
          {Number(merchant.orderCount ?? 0).toLocaleString("en-IN")} orders
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <StatusBadge
          type="verification"
          value={merchant.kyc.verificationStatus}
        />
        {merchant.isOndcEnrolled && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-blue-100 text-blue-700 border-blue-200">
            ONDC
          </span>
        )}
        {merchant.codAvailable && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-muted text-muted-foreground border-border">
            COD
          </span>
        )}
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-muted text-muted-foreground border-border capitalize">
          {merchant.deliveryType}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span>{flag}</span>
        <MapPin className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">{merchant.location.address}</span>
      </div>
    </button>
  );
}

// ─── 70+ Merchant categories ────────────────────────────────────────────────
const MERCHANT_CATEGORIES = [
  "Food & Restaurant",
  "Grocery & Kirana",
  "Medical & Pharmacy",
  "Clothing & Fashion",
  "Electronics",
  "Dairy & Milk",
  "Bakery & Sweets",
  "Salon & Beauty",
  "Travels & Cab",
  "Electrical & Plumbing",
  "Laundry & Cleaning",
  "Property & Real Estate",
  "Jobs & Recruitment",
  "Packers & Movers",
  "Automobile & Spare Parts",
  "Stationery & Books",
  "Kitchen Accessories",
  "Home Cleaning",
  "Paper & Disposal",
  "Cosmetics & Bath",
  "Retail Shop",
  "Wholesaler",
  "Manufacturer",
  "Auto Parts",
  "Snacks & Beverages",
  "Gifts & Frames",
  "Cold Drinks & Ice Cream",
  "Wellness & Health",
  "Therapist & Dr",
  "Radiologist & Lab",
  "PG/Hostels/Dormitory",
  "Car Wash",
  "Game Zone",
  "EV Charging",
  "Petrol Pump",
  "Transporter",
  "Printers & Reprographics",
  "Repairs & Maintenance",
  "Spare Parts",
  "Astrology",
  "Water Supply",
  "Flowers & Nursery",
  "Utensils & Cookware",
  "Footwear",
  "Accessories & Apparel",
  "Bike Service",
  "Car Dealer",
  "Bus Operator",
  "Auto Dealer",
  "Services (General)",
  "Healthcare",
  "Fitness & Gym",
  "Photography",
  "Event Management",
  "Catering",
  "Interior Design",
  "Architecture",
  "Legal Services",
  "Accounting & CA",
  "IT Services",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Security Services",
  "Marriage Hall",
  "Tour & Travel",
  "Hotel & Lodge",
  "Insurance",
  "Loan & Finance",
  "Other",
];

// ─── Add Merchant Dialog ─────────────────────────────────────────────────────

interface BranchEntry {
  id: string;
  address: string;
  deliveryRadius: string;
}

function AddMerchantDialog({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const createMerchant = useCreateMerchant();
  const [form, setForm] = useState({
    ownerPhone: "",
    ownerName: "",
    outletName: "",
    category: "",
    deliveryType: "delivery",
    merchantType: "order",
    deliveryRadius: "5",
    address: "",
    passdigit: "",
  });
  const [branches, setBranches] = useState<BranchEntry[]>([]);
  const [phoneError, setPhoneError] = useState("");

  function update(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    if (key === "ownerPhone") {
      setPhoneError(val && !validatePhone(val) ? PHONE_ERROR_MSG : "");
    }
  }

  function addBranch() {
    setBranches((b) => [
      ...b,
      { id: `br-${Date.now()}`, address: "", deliveryRadius: "5" },
    ]);
  }

  function removeBranch(id: string) {
    setBranches((b) => b.filter((br) => br.id !== id));
  }

  function updateBranch(
    id: string,
    field: "address" | "deliveryRadius",
    val: string,
  ) {
    setBranches((b) =>
      b.map((br) => (br.id === id ? { ...br, [field]: val } : br)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.ownerPhone ||
      !form.ownerName ||
      !form.outletName ||
      !form.category
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!validatePhone(form.ownerPhone)) {
      toast.error(PHONE_ERROR_MSG);
      return;
    }
    try {
      await createMerchant.mutateAsync({
        ownerPhone: form.ownerPhone.trim(),
        ownerName: form.ownerName.trim(),
        outletName: form.outletName.trim(),
        category: form.category,
        deliveryType: form.deliveryType,
        merchantType: form.merchantType,
        deliveryRadius: Number(form.deliveryRadius) || 5,
        address: form.address.trim(),
        passdigit: form.passdigit.trim() || undefined,
      });
      toast.success(
        `Merchant "${form.outletName}" added successfully${branches.length > 0 ? ` with ${branches.length} extra branch${branches.length > 1 ? "es" : ""}` : ""}`,
      );
      setForm({
        ownerPhone: "",
        ownerName: "",
        outletName: "",
        category: "",
        deliveryType: "delivery",
        merchantType: "order",
        deliveryRadius: "5",
        address: "",
        passdigit: "",
      });
      setBranches([]);
      onClose();
    } catch (err) {
      toast.error(
        `Failed to add merchant: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="sm:max-w-lg overflow-y-auto max-h-[90vh]"
        data-ocid="add-merchant.dialog"
      >
        <DialogHeader>
          <DialogTitle>Add New Merchant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="am-phone" className="text-xs">
                Owner Phone *
              </Label>
              <Input
                id="am-phone"
                value={form.ownerPhone}
                onChange={(e) => update("ownerPhone", e.target.value)}
                placeholder="+919876543210"
                required
                data-ocid="add-merchant.phone-input"
              />
              {phoneError && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="add-merchant.phone-error"
                >
                  {phoneError}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="am-name" className="text-xs">
                Owner Name *
              </Label>
              <Input
                id="am-name"
                value={form.ownerName}
                onChange={(e) => update("ownerName", e.target.value)}
                placeholder="Ramesh Kumar"
                required
                data-ocid="add-merchant.owner-name-input"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label htmlFor="am-outlet" className="text-xs">
                Outlet Name *
              </Label>
              <Input
                id="am-outlet"
                value={form.outletName}
                onChange={(e) => update("outletName", e.target.value)}
                placeholder="Sharma Kirana Store"
                required
                data-ocid="add-merchant.outlet-name-input"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs">Business Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => update("category", v)}
                required
              >
                <SelectTrigger data-ocid="add-merchant.category-select">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="max-h-56 overflow-y-auto">
                  {MERCHANT_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Delivery Type</Label>
              <Select
                value={form.deliveryType}
                onValueChange={(v) => update("deliveryType", v)}
              >
                <SelectTrigger data-ocid="add-merchant.delivery-type-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Online Delivery</SelectItem>
                  <SelectItem value="takeaway">Takeaway Only</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Order Acceptance</Label>
              <Select
                value={form.merchantType}
                onValueChange={(v) => update("merchantType", v)}
              >
                <SelectTrigger data-ocid="add-merchant.merchant-type-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">Order-based</SelectItem>
                  <SelectItem value="inquiry">Inquiry-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="am-radius" className="text-xs">
                Main Outlet Radius (km)
              </Label>
              <Input
                id="am-radius"
                type="number"
                min={1}
                value={form.deliveryRadius}
                onChange={(e) => update("deliveryRadius", e.target.value)}
                placeholder="5"
                data-ocid="add-merchant.radius-input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="am-passdigit" className="text-xs">
                Passdigit (4 digits)
              </Label>
              <Input
                id="am-passdigit"
                maxLength={4}
                value={form.passdigit}
                onChange={(e) => update("passdigit", e.target.value)}
                placeholder="1234"
                data-ocid="add-merchant.passdigit-input"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label htmlFor="am-address" className="text-xs">
                Main Outlet Address
              </Label>
              <Textarea
                id="am-address"
                rows={2}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Shop 12, MG Road, Bengaluru"
                data-ocid="add-merchant.address-input"
              />
            </div>
          </div>

          {/* ── Branches section ── */}
          <div className="border border-border rounded-xl p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Additional Branches
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-xs"
                onClick={addBranch}
                data-ocid="add-merchant.add-branch-button"
              >
                <Plus className="w-3 h-3" /> Add Branch
              </Button>
            </div>

            {branches.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">
                No additional branches — click "Add Branch" to add one
              </p>
            ) : (
              <div className="space-y-2">
                {branches.map((br, idx) => (
                  <div
                    key={br.id}
                    className="bg-muted/20 border border-border rounded-lg p-3 space-y-2"
                    data-ocid={`add-merchant.branch.${idx + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        Branch #{idx + 1}
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-destructive"
                        onClick={() => removeBranch(br.id)}
                        data-ocid={`add-merchant.remove-branch.${idx + 1}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-2 space-y-0.5">
                        <Label className="text-xs">Branch Address</Label>
                        <Input
                          className="h-8 text-xs"
                          value={br.address}
                          onChange={(e) =>
                            updateBranch(br.id, "address", e.target.value)
                          }
                          placeholder="Branch street address"
                          data-ocid={`add-merchant.branch-address.${idx + 1}`}
                        />
                      </div>
                      <div className="space-y-0.5">
                        <Label className="text-xs">Delivery Radius (km)</Label>
                        <Input
                          className="h-8 text-xs"
                          type="number"
                          min={1}
                          value={br.deliveryRadius}
                          onChange={(e) =>
                            updateBranch(
                              br.id,
                              "deliveryRadius",
                              e.target.value,
                            )
                          }
                          placeholder="5"
                          data-ocid={`add-merchant.branch-radius.${idx + 1}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="add-merchant.cancel-button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={createMerchant.isPending}
              data-ocid="add-merchant.submit-button"
            >
              {createMerchant.isPending ? "Adding…" : "Add Merchant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function MerchantsPage() {
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);
  const [catFilter, setCatFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [ondcFilter, setOndcFilter] = useState("all");
  const [sortKey, setSortKey] = useState<
    "customers" | "orders" | "alphabetical"
  >("customers");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [detailMerchant, setDetailMerchant] = useState<Merchant | null>(null);
  const [showAddMerchant, setShowAddMerchant] = useState(false);
  const [showClearCacheConfirm, setShowClearCacheConfirm] = useState(false);
  const clearFlowCache = useClearFlowCache();

  const { data: merchants = [], isLoading } = useMerchants();

  const categories = Array.from(
    new Set(["all", ...merchants.map((m) => m.category)]),
  );

  const pendingKyc = merchants.filter(
    (m) => m.kyc.verificationStatus !== VerificationStatus.verified,
  ).length;

  const filtered = [...merchants]
    .filter((m) => {
      if (
        search &&
        !m.businessName.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (catFilter !== "all" && m.category !== catFilter) return false;
      if (
        verifiedFilter === "yes" &&
        m.kyc.verificationStatus !== VerificationStatus.verified
      )
        return false;
      if (
        verifiedFilter === "no" &&
        m.kyc.verificationStatus === VerificationStatus.verified
      )
        return false;
      if (activeFilter === "yes" && !m.isActive) return false;
      if (activeFilter === "no" && m.isActive) return false;
      if (ondcFilter === "yes" && !m.isOndcEnrolled) return false;
      if (ondcFilter === "no" && m.isOndcEnrolled) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortKey === "alphabetical") {
        const diff = a.businessName.localeCompare(b.businessName);
        return sortDir === "desc" ? -diff : diff;
      }
      const getVal = (m: Merchant) => {
        if (sortKey === "customers") return Number(m.customerCount ?? 0);
        return Number(m.orderCount ?? 0);
      };
      const diff = getVal(b) - getVal(a);
      return sortDir === "desc" ? diff : -diff;
    });

  const pagination = usePagination(filtered);

  async function handleClearCache() {
    try {
      await clearFlowCache.mutateAsync(undefined);
      toast.success("Flow cache cleared — all stuck order states reset");
    } catch {
      toast.error("Failed to clear cache");
    } finally {
      setShowClearCacheConfirm(false);
    }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Merchants
          </h2>
          <p className="text-sm text-muted-foreground">
            {merchants.length} registered merchants
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {pendingKyc > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-300">
              <Package className="w-4 h-4" />
              <span>
                <strong>{pendingKyc}</strong> pending KYC
              </span>
            </div>
          )}
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => setShowClearCacheConfirm(true)}
            data-ocid="merchants.clear-cache-button"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear Flow Cache
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => setShowAddMerchant(true)}
            data-ocid="merchants.add-merchant-button"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Merchant
          </Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: merchants.length,
            icon: Store,
            color: "text-foreground",
          },
          {
            label: "Verified",
            value: merchants.filter(
              (m) => m.kyc.verificationStatus === VerificationStatus.verified,
            ).length,
            icon: CheckCircle,
            color: "text-emerald-600",
          },
          {
            label: "Pending KYC",
            value: pendingKyc,
            icon: Package,
            color: "text-amber-600",
          },
          {
            label: "Active",
            value: merchants.filter((m) => m.isActive).length,
            icon: TrendingUp,
            color: "text-primary",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <p className={`text-xl font-bold font-display ${color}`}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
            placeholder="Search merchants…"
            data-ocid="merchants-search"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger
            className="w-full sm:w-44"
            data-ocid="merchants-filter-category"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
          <SelectTrigger
            className="w-full sm:w-36"
            data-ocid="merchants-filter-verified"
          >
            <SelectValue placeholder="KYC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All KYC</SelectItem>
            <SelectItem value="yes">Verified</SelectItem>
            <SelectItem value="no">Pending/Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={activeFilter} onValueChange={setActiveFilter}>
          <SelectTrigger
            className="w-full sm:w-32"
            data-ocid="merchants-filter-active"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="yes">Active</SelectItem>
            <SelectItem value="no">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ondcFilter} onValueChange={setOndcFilter}>
          <SelectTrigger
            className="w-full sm:w-36"
            data-ocid="merchants-filter-ondc"
          >
            <SelectValue placeholder="ONDC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ONDC</SelectItem>
            <SelectItem value="yes">Enrolled</SelectItem>
            <SelectItem value="no">Not Enrolled</SelectItem>
          </SelectContent>
        </Select>
        {/* Sort control */}
        <div className="flex items-center gap-1.5">
          <Select
            value={sortKey}
            onValueChange={(v) =>
              setSortKey(v as "customers" | "orders" | "alphabetical")
            }
          >
            <SelectTrigger
              className="w-full sm:w-44"
              data-ocid="merchants-sort-key"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customers">Most Customers</SelectItem>
              <SelectItem value="orders">Most Orders</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="h-9 px-2 flex-shrink-0"
            onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
            title={`Sort ${sortDir === "desc" ? "ascending" : "descending"}`}
            data-ocid="merchants-sort-dir"
          >
            {sortDir === "desc" ? "↓" : "↑"}
          </Button>
        </div>
      </div>

      {/* Sort indicator */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {filtered.length} merchant{filtered.length !== 1 ? "s" : ""}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
          <TrendingUp className="w-3 h-3" />
          Sorted by:{" "}
          {sortKey === "customers"
            ? "Most Customers"
            : sortKey === "orders"
              ? "Most Orders"
              : "Alphabetical"}
          {sortDir === "asc" ? " ↑" : " ↓"}
        </span>
      </div>

      {/* Cards grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((id) => (
            <div key={id} className="h-48 bg-muted animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <Store className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">
            No merchants match your filters
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pagination.items.map((merchant) => (
              <MerchantCard
                key={merchant.id}
                merchant={merchant}
                onClick={() => setDetailMerchant(merchant)}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div
              className="flex items-center justify-between pt-2"
              data-ocid="merchants.pagination"
            >
              <p className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages} ·{" "}
                {filtered.length} merchants
              </p>
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={pagination.prevPage}
                  disabled={pagination.page === 1}
                  data-ocid="merchants.pagination_prev"
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
                        data-ocid={`merchants.pagination.page.${p}`}
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
                  data-ocid="merchants.pagination_next"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <MerchantDetailSheet
        merchant={detailMerchant}
        onClose={() => setDetailMerchant(null)}
      />

      {/* Add Merchant Dialog */}
      <AddMerchantDialog
        open={showAddMerchant}
        onClose={() => setShowAddMerchant(false)}
      />

      {/* Clear Cache Confirm Dialog */}
      <Dialog
        open={showClearCacheConfirm}
        onOpenChange={setShowClearCacheConfirm}
      >
        <DialogContent className="sm:max-w-sm" data-ocid="clear-cache.dialog">
          <DialogHeader>
            <DialogTitle>Clear Flow Cache</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will reset all stuck order states. Active orders will not be
            affected — only the pending flow cache will be flushed.
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowClearCacheConfirm(false)}
              data-ocid="clear-cache.cancel-button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleClearCache}
              disabled={clearFlowCache.isPending}
              data-ocid="clear-cache.confirm-button"
            >
              {clearFlowCache.isPending ? "Clearing…" : "Clear Cache"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
