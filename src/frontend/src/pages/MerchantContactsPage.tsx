import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
  CheckCircle,
  Contact,
  Gift,
  Send,
  Tag,
  Upload,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetMerchantImportStats,
  useGetSubscriptionDiscountForMerchant,
  useImportMerchantContacts,
  useMerchants,
  useSendMerchantPromotion,
} from "../hooks/useBackend";

export default function MerchantContactsPage() {
  const { data: merchants = [], isLoading: merchantsLoading } = useMerchants();
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>("");
  const [contactsText, setContactsText] = useState("");
  const [promoText, setPromoText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [importResult, setImportResult] = useState<{
    imported: number;
    duplicates: number;
    skippedMerchants: number;
    skippedDPs: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedMerchant = merchants.find((m) => m.id === selectedMerchantId);
  const merchantPhone = selectedMerchant?.location?.address?.startsWith("+")
    ? selectedMerchant.location.address
    : "+919876543211"; // fallback for demo

  const importContacts = useImportMerchantContacts();
  const sendPromotion = useSendMerchantPromotion();

  const { data: importStats, isLoading: statsLoading } =
    useGetMerchantImportStats(merchantPhone);
  const { data: discount = 0, isLoading: discountLoading } =
    useGetSubscriptionDiscountForMerchant(merchantPhone);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      // Parse CSV/text — extract phone numbers
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.split(",")[0].trim())
        .filter((l) => l.length > 5);
      setContactsText(lines.join("\n"));
      toast.success(`Loaded ${lines.length} contacts from file`);
    };
    reader.readAsText(file);
  }

  async function handleImport() {
    if (!selectedMerchantId) {
      toast.error("Please select a merchant first");
      return;
    }
    const phones = contactsText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 5);
    if (phones.length === 0) {
      toast.error("Please enter or upload phone numbers");
      return;
    }
    try {
      const result = await importContacts.mutateAsync({
        merchantPhone,
        contacts: phones,
      });
      setImportResult(result);
      setContactsText("");
      toast.success(`Import complete: ${result.imported} contacts added`);
    } catch {
      toast.error("Import failed");
    }
  }

  async function handleSendPromotion() {
    if (!selectedMerchantId || !promoText.trim()) return;
    try {
      const result = await sendPromotion.mutateAsync({
        merchantPhone,
        messageText: promoText,
      });
      setShowConfirm(false);
      setPromoText("");
      toast.success(
        `Promotion sent to ${result.sent} customers. ${result.skipped} opted out.`,
      );
    } catch {
      toast.error("Failed to send promotion");
    }
  }

  const importedCustomerCount = importStats?.totalImported ?? 0;
  const discountPercent = discount;
  const nextDiscountAt = Math.ceil(importedCustomerCount / 150) * 150;
  const currentTierBase = Math.floor(importedCustomerCount / 150) * 150;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <Contact className="w-5 h-5 text-primary" />
          Merchant Contacts
        </h2>
        <p className="text-sm text-muted-foreground">
          Import customer contacts for merchants, manage promotions, and track
          subscription discounts
        </p>
      </div>

      {/* Merchant selector */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Select Merchant
        </p>
        {merchantsLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select
            value={selectedMerchantId}
            onValueChange={setSelectedMerchantId}
          >
            <SelectTrigger data-ocid="merchant-contacts.merchant-select">
              <SelectValue placeholder="Choose a verified merchant…" />
            </SelectTrigger>
            <SelectContent>
              {merchants
                .filter((m) => m.isVerified)
                .map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.businessName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Import Stats */}
      {selectedMerchantId && (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            Import Stats &amp; Subscription Discount
          </p>
          {statsLoading || discountLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["s1", "s2", "s3"].map((k) => (
                <Skeleton key={k} className="h-20 rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold font-display text-primary">
                    {importedCustomerCount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total Imported
                  </p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold font-display text-foreground">
                    {importStats?.totalBatches ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Batches</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold font-display text-emerald-600">
                    {discountPercent}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current Discount
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <Gift className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    Every 150 customers = 5% subscription discount
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {discountPercent > 0
                      ? `This merchant is saving ${discountPercent}% on subscription (${currentTierBase} customers imported).`
                      : `Import ${nextDiscountAt - importedCustomerCount} more customers to unlock 5% discount.`}
                  </p>
                  {discountPercent < 25 && (
                    <p className="text-xs text-emerald-600">
                      Next tier at {nextDiscountAt} customers (+5% off, up to
                      25% max)
                    </p>
                  )}
                  {importStats?.lastImportDate &&
                    importStats.lastImportDate > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Last import:{" "}
                        {new Date(
                          importStats.lastImportDate,
                        ).toLocaleDateString("en-IN")}
                      </p>
                    )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Upload Customer Contacts */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Upload className="w-4 h-4 text-primary" />
          Upload Customer Contacts
        </p>
        <p className="text-xs text-muted-foreground">
          Paste phone numbers (one per line) or upload a CSV file. Existing
          merchants and delivery partners will be skipped automatically.
        </p>

        {/* File upload */}
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt,.xlsx"
            className="hidden"
            onChange={handleFileUpload}
            data-ocid="merchant-contacts.file-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => fileInputRef.current?.click()}
            data-ocid="merchant-contacts.upload-button"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload CSV / TXT
          </Button>
          <span className="text-xs text-muted-foreground">
            or paste numbers below
          </span>
        </div>

        <div className="space-y-1.5">
          <Label>Phone Numbers (one per line)</Label>
          <Textarea
            placeholder={"+919876543210\n+919765432109\n+919654321098\n…"}
            rows={6}
            value={contactsText}
            onChange={(e) => setContactsText(e.target.value)}
            className="font-mono text-xs"
            data-ocid="merchant-contacts.phones-textarea"
          />
          <p className="text-xs text-muted-foreground">
            {
              contactsText.split(/\r?\n/).filter((l) => l.trim().length > 5)
                .length
            }{" "}
            phone numbers entered
          </p>
        </div>

        <Button
          onClick={handleImport}
          disabled={
            importContacts.isPending ||
            !selectedMerchantId ||
            !contactsText.trim()
          }
          className="gap-1.5"
          data-ocid="merchant-contacts.import-button"
        >
          {importContacts.isPending ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {importContacts.isPending ? "Importing…" : "Import Contacts"}
        </Button>

        {/* Result card */}
        {importResult && (
          <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Import Complete
              </p>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>
                  ✅ <strong>{importResult.imported}</strong> new contacts
                  imported
                </p>
                <p>
                  🔁 <strong>{importResult.duplicates}</strong> duplicates
                  skipped
                </p>
                <p>
                  🏪 <strong>{importResult.skippedMerchants}</strong> existing
                  merchants skipped
                </p>
                <p>
                  🚴 <strong>{importResult.skippedDPs}</strong> delivery
                  partners skipped
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Send Promotion */}
      {selectedMerchantId && (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Send className="w-4 h-4 text-primary" />
            Send Promotion Message
          </p>
          <p className="text-xs text-muted-foreground">
            Send a promotional text message to all imported customers who have
            not opted out. Customers can reply "STOP" to opt out.
          </p>
          <div className="space-y-1.5">
            <Label>Promotion Message</Label>
            <Textarea
              placeholder="e.g. 🎉 Sharma Kirana Store — Flat 20% off on all orders today! Use code SAVE20. Shop now: [link]"
              rows={4}
              value={promoText}
              onChange={(e) => setPromoText(e.target.value)}
              data-ocid="merchant-contacts.promo-textarea"
            />
            <p className="text-xs text-muted-foreground">
              {promoText.length} characters
            </p>
          </div>
          <Button
            onClick={() => setShowConfirm(true)}
            disabled={!promoText.trim()}
            variant="default"
            className="gap-1.5"
            data-ocid="merchant-contacts.send-promo-button"
          >
            <Send className="w-4 h-4" />
            Send to All Customers
          </Button>
        </div>
      )}

      {/* Confirm dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent
          className="sm:max-w-md"
          data-ocid="merchant-contacts.confirm-dialog"
        >
          <DialogHeader>
            <DialogTitle>Confirm Promotion Send</DialogTitle>
            <DialogDescription>
              This will send the promotion message to all customers imported for{" "}
              <strong>{selectedMerchant?.businessName}</strong> who have not
              opted out. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/20 rounded-xl p-3 text-sm text-foreground">
            {promoText}
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowConfirm(false)}
              data-ocid="merchant-contacts.cancel-button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 gap-1.5"
              onClick={handleSendPromotion}
              disabled={sendPromotion.isPending}
              data-ocid="merchant-contacts.confirm-button"
            >
              <Send className="w-4 h-4" />
              {sendPromotion.isPending ? "Sending…" : "Send Promotion"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
