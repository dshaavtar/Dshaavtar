import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Plus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { DistributorNetwork } from "../backend.d";
import {
  useAddDeliveryPartnerToDistributor,
  useAddDistributorToNetwork,
  useDistributorNetwork,
  useManufacturerByUser,
  useValidateMerchantForDistributor,
} from "../hooks/useBackend";

const EMPTY_FORM = {
  distributorName: "",
  distributorPhone: "",
  city: "",
  pincode: "",
  schemeApplicable: "",
  marginPercent: "",
  routeDescription: "",
};

export default function ManufacturerDistributorNetworkPage() {
  const { data: distributors = [], isLoading } = useDistributorNetwork();
  const { data: mfrRaw } = useManufacturerByUser();
  const mfr = mfrRaw as { id: string } | null;
  const addMutation = useAddDistributorToNetwork();
  const validateMutation = useValidateMerchantForDistributor();
  const addDeliveryPartnerMutation = useAddDeliveryPartnerToDistributor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [cityFilter, setCityFilter] = useState("");
  const [phoneValid, setPhoneValid] = useState<boolean | null>(null);
  const [validatingPhone, setValidatingPhone] = useState(false);
  const [assigningPartnerId, setAssigningPartnerId] = useState<string | null>(
    null,
  );
  const [partnerForm, setPartnerForm] = useState({
    phone: "",
    name: "",
    route: "",
  });
  const [partnerSaving, setPartnerSaving] = useState(false);

  const filtered = cityFilter
    ? distributors.filter(
        (d: DistributorNetwork) =>
          d.city.toLowerCase().includes(cityFilter.toLowerCase()) ||
          d.pincode.includes(cityFilter),
      )
    : distributors;

  function field(key: keyof typeof EMPTY_FORM) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.distributorName || !form.city || !form.pincode) {
      toast.error("Name, city and pincode are required");
      return;
    }
    try {
      if (!mfr) {
        toast.error("Manufacturer profile not loaded");
        return;
      }
      await addMutation.mutateAsync({
        manufacturerId: mfr.id,
        distributorName: form.distributorName,
        distributorPhone: form.distributorPhone,
        city: form.city,
        pincode: form.pincode,
        schemeApplicable: form.schemeApplicable,
        marginPercent: Number(form.marginPercent),
        routeDescription: form.routeDescription,
      });
      toast.success("Distributor added!");
      setDialogOpen(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      toast.error(`Failed: ${String(err)}`);
    }
  }

  async function savePartner() {
    if (!partnerForm.phone || !partnerForm.name) {
      toast.error("Phone and name required");
      return;
    }
    setPartnerSaving(true);
    try {
      await addDeliveryPartnerMutation.mutateAsync({
        distributorId: assigningPartnerId!,
        phone: partnerForm.phone,
        name: partnerForm.name,
        route: partnerForm.route,
      });
      toast.success(`${partnerForm.name} assigned`);
      setAssigningPartnerId(null);
      setPartnerForm({ phone: "", name: "", route: "" });
    } catch (err) {
      toast.error(`Failed: ${String(err)}`);
    } finally {
      setPartnerSaving(false);
    }
  }

  const activeCount = distributors.filter(
    (d: DistributorNetwork) => d.status === "active",
  ).length;

  return (
    <div className="space-y-5" data-ocid="manufacturer.distributors.page">
      {/* Delivery Partner Inline Form */}
      {assigningPartnerId && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-foreground">
              Assign Delivery Partner
            </p>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground text-xs"
              onClick={() => setAssigningPartnerId(null)}
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input
              placeholder="Phone"
              value={partnerForm.phone}
              onChange={(e) =>
                setPartnerForm((f) => ({ ...f, phone: e.target.value }))
              }
              data-ocid="manufacturer.distributors.partner_phone_input"
            />
            <Input
              placeholder="Name"
              value={partnerForm.name}
              onChange={(e) =>
                setPartnerForm((f) => ({ ...f, name: e.target.value }))
              }
              data-ocid="manufacturer.distributors.partner_name_input"
            />
            <Input
              placeholder="Route / Zone"
              value={partnerForm.route}
              onChange={(e) =>
                setPartnerForm((f) => ({ ...f, route: e.target.value }))
              }
              data-ocid="manufacturer.distributors.partner_route_input"
            />
          </div>
          <Button
            type="button"
            size="sm"
            disabled={partnerSaving}
            onClick={() => {
              void savePartner();
            }}
            data-ocid="manufacturer.distributors.partner_save_button"
          >
            {partnerSaving ? "Saving…" : "Save Partner"}
          </Button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Distributor Network
          </h1>
          <p className="text-sm text-muted-foreground">
            {activeCount} active of {distributors.length} distributors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filter by city / pincode…"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-48"
            data-ocid="manufacturer.distributors.search_input"
          />
          <Button
            onClick={() => setDialogOpen(true)}
            data-ocid="manufacturer.distributors.add_button"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Distributor
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 gap-3"
            data-ocid="manufacturer.distributors.empty_state"
          >
            <Users className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              {cityFilter
                ? "No distributors match your filter"
                : "No distributors yet. Add your first distributor."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  {[
                    "Name",
                    "Contact",
                    "City",
                    "Pincode",
                    "Scheme",
                    "Margin %",
                    "Earned",
                    "Orders",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((d: DistributorNetwork, i: number) => (
                  <tr
                    key={d.id}
                    className="hover:bg-muted/20 transition-colors"
                    data-ocid={`manufacturer.distributors.item.${i + 1}`}
                  >
                    <td className="px-4 py-2.5 font-medium text-foreground">
                      {d.distributorName}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">
                      {d.distributorPhone || "—"}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {d.city}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">
                      {d.pincode}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">
                      {d.schemeApplicable || "—"}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold">
                      {d.marginPercent}%
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      ₹{d.marginEarned.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {Number(d.totalOrders)}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-col gap-1">
                        <Badge
                          variant={
                            d.status === "active" ? "outline" : "secondary"
                          }
                          className="text-xs"
                        >
                          {String(d.status)}
                        </Badge>
                        {!!(d as unknown as Record<string, unknown>)
                          .distributorCode && (
                          <Badge className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/30">
                            Code:{" "}
                            {String(
                              (d as unknown as Record<string, unknown>)
                                .distributorCode,
                            )}
                          </Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs mt-0.5"
                          onClick={() => {
                            setAssigningPartnerId(d.id);
                            setPartnerForm({ phone: "", name: "", route: "" });
                          }}
                          data-ocid={`manufacturer.distributors.assign_partner_button.${i + 1}`}
                        >
                          Assign Partner
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="sm:max-w-md"
          data-ocid="manufacturer.distributors.dialog"
        >
          <DialogHeader>
            <DialogTitle>Add Distributor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Distributor Name *</Label>
              <Input
                placeholder="Business / Person name"
                {...field("distributorName")}
                data-ocid="manufacturer.distributors.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                placeholder="+91 98765 43210"
                {...field("distributorPhone")}
                onBlur={async () => {
                  if (!form.distributorPhone) {
                    setPhoneValid(null);
                    return;
                  }
                  setValidatingPhone(true);
                  try {
                    await validateMutation.mutateAsync(form.distributorPhone);
                    setPhoneValid(true);
                  } catch {
                    setPhoneValid(false);
                  } finally {
                    setValidatingPhone(false);
                  }
                }}
                data-ocid="manufacturer.distributors.phone_input"
              />
              {validatingPhone && (
                <p className="text-xs text-muted-foreground">Validating…</p>
              )}
              {!validatingPhone && phoneValid === true && (
                <p className="text-xs text-green-600">✓ Verified merchant</p>
              )}
              {!validatingPhone && phoneValid === false && (
                <p className="text-xs text-red-600">
                  ✗ Not a registered merchant
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>City *</Label>
                <Input
                  placeholder="Mumbai"
                  {...field("city")}
                  data-ocid="manufacturer.distributors.city_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Pincode *</Label>
                <Input
                  placeholder="400001"
                  {...field("pincode")}
                  data-ocid="manufacturer.distributors.pincode_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Scheme Applicable</Label>
                <Input
                  placeholder="e.g. Festive Offer"
                  {...field("schemeApplicable")}
                  data-ocid="manufacturer.distributors.scheme_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Margin %</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="15"
                  {...field("marginPercent")}
                  data-ocid="manufacturer.distributors.margin_input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="manufacturer.distributors.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addMutation.isPending || phoneValid === false}
                data-ocid="manufacturer.distributors.submit_button"
              >
                {addMutation.isPending ? "Adding…" : "Add Distributor"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
