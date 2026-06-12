import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle2,
  IndianRupee,
  QrCode,
  Save,
  Settings,
  Smartphone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetAdminUPIProfile,
  useSetAdminUPIProfile,
} from "../hooks/useBackend";

function buildQrImageUrl(data: string, size = 200): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}

export default function ProfilePage() {
  const { data: upiProfile, isLoading } = useGetAdminUPIProfile();
  const setUPIProfile = useSetAdminUPIProfile();

  const [upiId, setUpiId] = useState("");
  const [upiName, setUpiName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (upiProfile) {
      setUpiId(upiProfile.upiId ?? "");
      setUpiName(upiProfile.name ?? "");
    }
  }, [upiProfile]);

  const previewQrData = upiId.trim()
    ? `upi://pay?pa=${encodeURIComponent(upiId.trim())}&pn=${encodeURIComponent(upiName.trim() || "WhatsCart Admin")}&cu=INR`
    : "";

  async function handleSave() {
    if (!upiId.trim()) {
      toast.error("UPI ID is required");
      return;
    }
    try {
      await setUPIProfile.mutateAsync({
        upiId: upiId.trim(),
        name: upiName.trim(),
      });
      setSaved(true);
      toast.success("UPI settings saved successfully");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error("Failed to save UPI settings");
    }
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Admin Profile
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your admin account settings and payment details
          </p>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Account Settings
          </h3>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Username</Label>
            <div className="px-3 py-2 bg-muted/40 rounded-lg text-sm font-medium text-foreground border border-border">
              admin
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Role</Label>
            <div className="px-3 py-2 bg-primary/10 rounded-lg text-sm font-medium text-primary border border-primary/20">
              Super Admin
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
          Admin credentials are managed server-side. Contact support to change
          your password.
        </div>
      </div>

      {/* UPI Payment Settings */}
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-5"
        data-ocid="profile.upi-settings"
      >
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Payment Settings
          </h3>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
          <IndianRupee className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            <strong>
              These UPI details are used for all subscription payment QR codes.
            </strong>{" "}
            Make sure the UPI ID is active and linked to a valid account before
            saving.
          </span>
        </div>

        <Separator />

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form side */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input
                  id="upi-id"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  data-ocid="profile.upi-id-input"
                />
                <p className="text-xs text-muted-foreground">
                  e.g. whatscart@okicici, business@ybl
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="upi-name">Display Name</Label>
                <Input
                  id="upi-name"
                  value={upiName}
                  onChange={(e) => setUpiName(e.target.value)}
                  placeholder="WhatsCart Admin"
                  data-ocid="profile.upi-name-input"
                />
                <p className="text-xs text-muted-foreground">
                  Shown on the UPI payment screen
                </p>
              </div>
              <Button
                className="w-full gap-2"
                onClick={handleSave}
                disabled={setUPIProfile.isPending || !upiId.trim()}
                data-ocid="profile.save-upi-button"
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Saved!
                  </>
                ) : setUPIProfile.isPending ? (
                  "Saving…"
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save UPI Settings
                  </>
                )}
              </Button>
            </div>

            {/* QR preview side */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Preview QR Code
              </p>
              {previewQrData ? (
                <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
                  <img
                    src={buildQrImageUrl(previewQrData, 180)}
                    alt="UPI Payment QR Preview"
                    width={180}
                    height={180}
                    className="rounded-lg"
                    data-ocid="profile.upi-qr-preview"
                  />
                </div>
              ) : (
                <div className="w-[180px] h-[180px] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <QrCode className="w-8 h-8 opacity-30" />
                  <p className="text-xs text-center px-3">
                    Enter a UPI ID to see the preview
                  </p>
                </div>
              )}
              {upiId.trim() && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 w-full justify-center">
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span>Scan with PhonePe, GPay, Paytm</span>
                </div>
              )}
              {upiId.trim() && (
                <p className="text-xs text-center text-muted-foreground">
                  UPI ID:{" "}
                  <span className="font-mono text-foreground">{upiId}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
