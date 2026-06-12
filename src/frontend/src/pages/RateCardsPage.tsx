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
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  Calculator,
  Pencil,
  Plus,
  Trash2,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateRateCard,
  useDeleteRateCard,
  useFreeRideSarthis,
  useRateCards,
  useRegisterFreeRideSarthi,
  useToggleFreeRideSarthiStatus,
  useUpdateRateCard,
} from "../hooks/useBackend";
import type { DeliveryRateCard, ServiceType } from "../types";
import { VehicleType } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const VEHICLE_EMOJI: Record<string, string> = {
  bike: "🏍️",
  scooter: "🛵",
  car: "🚗",
  auto: "🛺",
  van: "🚐",
  truck: "🚛",
  tempo: "🚌",
  bus: "🚌",
};

const VEHICLE_DISPLAY: Record<string, string> = {
  bike: "Bike",
  scooter: "Scooter",
  car: "Car",
  auto: "Auto",
  van: "Van",
  truck: "Truck",
  tempo: "Tempo",
  bus: "Bus",
};

const SERVICE_LABELS: Record<string, string> = {
  delivery: "Delivery",
  sarthi: "Sarthi (Passenger)",
};

// NOTE: Shuttle Routes are managed from the dedicated Shuttle Routes page (/admin/shuttle-routes).
// This page only manages Rate Cards and Free Ride Sarthi registrations.

type TabKey = "ratecards" | "freeride";

// ─── Rate Card form ───────────────────────────────────────────────────────────

interface CardForm {
  vehicleType: string;
  serviceType: string;
  baseRate: string;
  perKmRate: string;
  surgeMultiplier: string;
  isActive: boolean;
}

const EMPTY_FORM: CardForm = {
  vehicleType: "",
  serviceType: "delivery",
  baseRate: "0",
  perKmRate: "0",
  surgeMultiplier: "1.0",
  isActive: true,
};

function sampleFare(base: number, perKm: number, surge: number, km: number) {
  return ((base + perKm * km) * surge).toFixed(2);
}

function CardFormModal({
  title,
  form,
  setForm,
  onSave,
  onClose,
  isNew,
}: {
  title: string;
  form: CardForm;
  setForm: React.Dispatch<React.SetStateAction<CardForm>>;
  onSave: () => void;
  onClose: () => void;
  isNew: boolean;
}) {
  const base = Number.parseFloat(form.baseRate) || 0;
  const perKm = Number.parseFloat(form.perKmRate) || 0;
  const surge = Number.parseFloat(form.surgeMultiplier) || 1;
  const preview = sampleFare(base, perKm, surge, 5);

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          {isNew && (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="modal-vehicle">Vehicle Type</Label>
                <Select
                  value={form.vehicleType}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, vehicleType: v }))
                  }
                >
                  <SelectTrigger
                    id="modal-vehicle"
                    data-ocid="rate-form.vehicle_select"
                  >
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(VehicleType).map(([, v]) => (
                      <SelectItem key={v} value={v}>
                        {VEHICLE_EMOJI[v] ?? "🚗"} {VEHICLE_DISPLAY[v] ?? v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="modal-service">Service Type</Label>
                <Select
                  value={form.serviceType}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, serviceType: v }))
                  }
                >
                  <SelectTrigger
                    id="modal-service"
                    data-ocid="rate-form.service_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="sarthi">Sarthi (Passenger)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          {!isNew && (
            <div className="space-y-1.5">
              <Label htmlFor="modal-service-edit">Service Type</Label>
              <Select
                value={form.serviceType}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, serviceType: v }))
                }
              >
                <SelectTrigger
                  id="modal-service-edit"
                  data-ocid="rate-form.service_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="sarthi">Sarthi (Passenger)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="modal-base">Base Rate (₹)</Label>
            <Input
              id="modal-base"
              type="number"
              min="0"
              value={form.baseRate}
              onChange={(e) =>
                setForm((f) => ({ ...f, baseRate: e.target.value }))
              }
              data-ocid="rate-form.base_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="modal-perkm">Per Km Rate (₹/km)</Label>
            <Input
              id="modal-perkm"
              type="number"
              min="0"
              value={form.perKmRate}
              onChange={(e) =>
                setForm((f) => ({ ...f, perKmRate: e.target.value }))
              }
              data-ocid="rate-form.perkm_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="modal-surge">
              Surge Multiplier ({form.surgeMultiplier}×)
            </Label>
            <input
              id="modal-surge"
              type="range"
              min="1.0"
              max="3.0"
              step="0.1"
              value={form.surgeMultiplier}
              onChange={(e) =>
                setForm((f) => ({ ...f, surgeMultiplier: e.target.value }))
              }
              className="w-full accent-primary"
              data-ocid="rate-form.surge_input"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1.0× Normal</span>
              <span>3.0× Peak</span>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
            <span className="text-muted-foreground">Sample fare (5 km): </span>
            <span className="font-bold text-primary">₹{preview}</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="modal-active"
              checked={form.isActive}
              onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))}
              data-ocid="rate-form.active_toggle"
            />
            <Label htmlFor="modal-active">Rate card active</Label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={onSave}
              data-ocid="rate-form.save_button"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Free Ride Registration dialog ───────────────────────────────────────────

interface FreeRideForm {
  phone: string;
  name: string;
  vehicleType: string;
  aadhaarNo: string;
  rcBook: string;
  panNo: string;
}

const EMPTY_FREE_RIDE: FreeRideForm = {
  phone: "",
  name: "",
  vehicleType: "bike",
  aadhaarNo: "",
  rcBook: "",
  panNo: "",
};

function FreeRideFormModal({ onClose }: { onClose: () => void }) {
  const register = useRegisterFreeRideSarthi();
  const [form, setForm] = useState<FreeRideForm>(EMPTY_FREE_RIDE);

  async function handleSave() {
    if (!form.phone || !form.name) {
      toast.error("Phone and name are required");
      return;
    }
    try {
      await register.mutateAsync({
        phone: form.phone,
        name: form.name,
        vehicleType: form.vehicleType as VehicleType,
        aadhaarNo: form.aadhaarNo,
        rcBook: form.rcBook,
        panNo: form.panNo,
      });
      toast.success("Free ride sarthi registered");
      onClose();
    } catch (e) {
      toast.error(
        `Registration failed: ${e instanceof Error ? e.message : "unknown error"}`,
      );
    }
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" /> Register Free Ride
            Sarthi
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label>Phone Number</Label>
            <Input
              placeholder="+91XXXXXXXXXX"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              data-ocid="free-ride-form.phone_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              data-ocid="free-ride-form.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Vehicle Type</Label>
            <Select
              value={form.vehicleType}
              onValueChange={(v) => setForm((f) => ({ ...f, vehicleType: v }))}
            >
              <SelectTrigger data-ocid="free-ride-form.vehicle_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VehicleType).map(([, v]) => (
                  <SelectItem key={v} value={v}>
                    {VEHICLE_EMOJI[v] ?? "🚗"} {VEHICLE_DISPLAY[v] ?? v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Aadhaar Number</Label>
            <Input
              placeholder="XXXX XXXX XXXX"
              value={form.aadhaarNo}
              onChange={(e) =>
                setForm((f) => ({ ...f, aadhaarNo: e.target.value }))
              }
              data-ocid="free-ride-form.aadhaar_input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>RC Book No.</Label>
              <Input
                value={form.rcBook}
                onChange={(e) =>
                  setForm((f) => ({ ...f, rcBook: e.target.value }))
                }
                data-ocid="free-ride-form.rc_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>PAN Number</Label>
              <Input
                value={form.panNo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, panNo: e.target.value }))
                }
                data-ocid="free-ride-form.pan_input"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="free-ride-form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSave}
              disabled={register.isPending}
              data-ocid="free-ride-form.submit_button"
            >
              Register
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Free Ride Sarthi section ─────────────────────────────────────────────────

function FreeRideSection() {
  const { data: sarthis = [], isLoading } = useFreeRideSarthis();
  const toggle = useToggleFreeRideSarthiStatus();
  const [addOpen, setAddOpen] = useState(false);

  async function handleToggle(id: string, current: boolean) {
    try {
      await toggle.mutateAsync({ dpId: id, isActive: !current });
      toast.success(`Sarthi ${!current ? "activated" : "deactivated"}`);
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Free Ride Sarthis
          </h3>
          <p className="text-sm text-muted-foreground">
            Sarthi partners registered for free passenger-sharing service
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="gap-2"
          data-ocid="free-ride.register_button"
        >
          <Plus className="w-4 h-4" /> Register Free Ride Sarthi
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((k) => (
            <div key={k} className="h-16 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : sarthis.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground text-sm"
          data-ocid="free-ride.empty_state"
        >
          <UserCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No free-ride sarthis registered</p>
          <p className="mt-1">
            Register the first one to enable passenger sharing
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                {[
                  "Name",
                  "Vehicle Type",
                  "RC / Plate",
                  "Service Area",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sarthis.map((s, i) => (
                <tr
                  key={s.id}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`free-ride.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {s.name}
                  </td>
                  <td className="px-4 py-3">
                    {VEHICLE_EMOJI[s.vehicleType] ?? "🚗"}{" "}
                    {VEHICLE_DISPLAY[s.vehicleType] ?? s.vehicleType}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                    {s.vehiclePlate || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {s.serviceArea}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={s.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {s.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Switch
                      checked={s.status === "active"}
                      onCheckedChange={() =>
                        handleToggle(s.id, s.status === "active")
                      }
                      data-ocid={`free-ride.toggle.${i + 1}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {addOpen && <FreeRideFormModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}

// ─── Rate Card item (shared) ──────────────────────────────────────────────────

function RateCardItem({
  card,
  onEdit,
  onDelete,
}: {
  card: DeliveryRateCard;
  onEdit: (c: DeliveryRateCard) => void;
  onDelete: (c: DeliveryRateCard) => void;
}) {
  const fare5km = sampleFare(
    card.baseRate,
    card.perKmRate,
    card.surgeMultiplier,
    5,
  );
  const serviceType = card.serviceType ?? "delivery";
  return (
    <div
      className={`bg-card border rounded-xl p-5 shadow-card flex flex-col gap-4 transition-all hover:shadow-md ${!card.isActive ? "opacity-60" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {VEHICLE_EMOJI[card.vehicleType] ?? "🚗"}
          </span>
          <div>
            <h3 className="font-display font-bold text-foreground capitalize">
              {VEHICLE_DISPLAY[card.vehicleType] ?? card.vehicleType}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <Badge
                variant={card.isActive ? "default" : "secondary"}
                className="text-xs"
              >
                {card.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${serviceType === "sarthi" ? "border-amber-400 text-amber-600" : "border-blue-400 text-blue-600"}`}
              >
                {serviceType === "sarthi" ? "🚗 Sarthi" : "🚴 Delivery"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center bg-muted/40 rounded-lg p-3">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Base
          </p>
          <p className="font-bold text-foreground text-sm mt-0.5">
            ₹{card.baseRate}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Per Km
          </p>
          <p className="font-bold text-foreground text-sm mt-0.5">
            ₹{card.perKmRate}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Surge
          </p>
          <p
            className={`font-bold text-sm mt-0.5 ${card.surgeMultiplier > 1.5 ? "text-amber-600" : "text-foreground"}`}
          >
            ×{card.surgeMultiplier}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          5 km est:{" "}
          <span className="font-semibold text-foreground">₹{fare5km}</span>
        </div>
        <div className="flex gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(card)}
            data-ocid={`rate-card.edit.${card.id}`}
          >
            <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-destructive border-destructive/30 hover:bg-destructive/5"
            onClick={() => onDelete(card)}
            data-ocid={`rate-card.delete.${card.id}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Rate Card section ────────────────────────────────────────────────────────

function RateCardsSection() {
  const { data: rateCards = [], isLoading } = useRateCards();
  const updateRateCard = useUpdateRateCard();
  const createRateCard = useCreateRateCard();
  const deleteRateCard = useDeleteRateCard();
  const [editCard, setEditCard] = useState<DeliveryRateCard | null>(null);
  const [editForm, setEditForm] = useState<CardForm>(EMPTY_FORM);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<CardForm>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<DeliveryRateCard | null>(
    null,
  );
  const [calcVehicle, setCalcVehicle] = useState<string>("");
  const [calcService, setCalcService] = useState<string>("delivery");
  const [calcDist, setCalcDist] = useState<string>("5");
  const [serviceFilter, setServiceFilter] = useState<
    "all" | "delivery" | "sarthi"
  >("all");

  function openEdit(card: DeliveryRateCard) {
    setEditCard(card);
    setEditForm({
      vehicleType: card.vehicleType,
      serviceType: card.serviceType ?? "delivery",
      baseRate: String(card.baseRate),
      perKmRate: String(card.perKmRate),
      surgeMultiplier: String(card.surgeMultiplier),
      isActive: card.isActive,
    });
  }

  async function handleSaveEdit() {
    if (!editCard) return;
    try {
      await updateRateCard.mutateAsync({
        id: editCard.id,
        baseRate: Number.parseFloat(editForm.baseRate) || 0,
        perKmRate: Number.parseFloat(editForm.perKmRate) || 0,
        surgeMultiplier: Number.parseFloat(editForm.surgeMultiplier) || 1,
      });
      toast.success("Rate card updated");
      setEditCard(null);
    } catch {
      toast.error("Failed to update rate card");
    }
  }

  async function handleAdd() {
    if (!addForm.vehicleType) {
      toast.error("Select a vehicle type");
      return;
    }
    try {
      await createRateCard.mutateAsync({
        vehicleType: addForm.vehicleType as VehicleType,
        serviceType: addForm.serviceType as ServiceType,
        baseRate: Number.parseFloat(addForm.baseRate) || 0,
        perKmRate: Number.parseFloat(addForm.perKmRate) || 0,
        surgeMultiplier: Number.parseFloat(addForm.surgeMultiplier) || 1,
      });
      toast.success(
        `Rate card for ${VEHICLE_DISPLAY[addForm.vehicleType] ?? addForm.vehicleType} (${SERVICE_LABELS[addForm.serviceType]}) added`,
      );
      setAddOpen(false);
      setAddForm(EMPTY_FORM);
    } catch {
      toast.error("Failed to add rate card");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteRateCard.mutateAsync(deleteTarget.id);
      toast.success("Rate card deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete");
    }
  }

  const filtered = rateCards.filter(
    (c) =>
      serviceFilter === "all" ||
      (c.serviceType ?? "delivery") === serviceFilter,
  );
  const deliveryCards = filtered.filter(
    (c) => (c.serviceType ?? "delivery") === "delivery",
  );
  const sarthiCards = filtered.filter(
    (c) => (c.serviceType ?? "delivery") === "sarthi",
  );

  const calcCard = rateCards.find(
    (r) =>
      r.vehicleType === calcVehicle &&
      (r.serviceType ?? "delivery") === calcService,
  );
  const calcDistNum = Number.parseFloat(calcDist) || 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Rate Cards
          </h3>
          <p className="text-sm text-muted-foreground">
            Pricing rules for delivery and Sarthi (passenger) partners
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="gap-2"
          data-ocid="rate-cards.add_button"
        >
          <Plus className="w-4 h-4" /> Add Rate Card
        </Button>
      </div>

      <div className="flex gap-2" data-ocid="rate-cards.service_filter">
        {(["all", "delivery", "sarthi"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setServiceFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              serviceFilter === s
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
            data-ocid={`rate-cards.filter.${s}`}
          >
            {s === "all"
              ? "All"
              : s === "delivery"
                ? "🚴 Delivery"
                : "🚗 Sarthi (Passenger)"}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
            <div key={k} className="h-48 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {(serviceFilter === "all" || serviceFilter === "delivery") &&
            deliveryCards.length > 0 && (
              <div>
                {serviceFilter === "all" && (
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    🚴 Delivery
                  </h4>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deliveryCards.map((card) => (
                    <RateCardItem
                      key={card.id}
                      card={card}
                      onEdit={openEdit}
                      onDelete={setDeleteTarget}
                    />
                  ))}
                </div>
              </div>
            )}
          {(serviceFilter === "all" || serviceFilter === "sarthi") &&
            sarthiCards.length > 0 && (
              <div>
                {serviceFilter === "all" && (
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    🚗 Sarthi (Passenger Pickup)
                  </h4>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sarthiCards.map((card) => (
                    <RateCardItem
                      key={card.id}
                      card={card}
                      onEdit={openEdit}
                      onDelete={setDeleteTarget}
                    />
                  ))}
                </div>
              </div>
            )}
          {filtered.length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground text-sm"
              data-ocid="rate-cards.empty_state"
            >
              No rate cards for this service type.
            </div>
          )}
        </>
      )}

      {/* Fare Calculator */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20">
          <Calculator className="w-5 h-5 text-primary" />
          <div>
            <h4 className="font-display font-semibold text-foreground">
              Fare Calculator
            </h4>
            <p className="text-xs text-muted-foreground">
              Estimate delivery or sarthi cost by distance and vehicle
            </p>
          </div>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="calc-from">From Location</Label>
              <Input
                id="calc-from"
                placeholder="e.g. Connaught Place, Delhi"
                data-ocid="fare-calc.from_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="calc-to">To Location</Label>
              <Input
                id="calc-to"
                placeholder="e.g. Karol Bagh, Delhi"
                data-ocid="fare-calc.to_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="calc-dist">Distance (km)</Label>
              <Input
                id="calc-dist"
                type="number"
                min="0.5"
                step="0.5"
                value={calcDist}
                onChange={(e) => setCalcDist(e.target.value)}
                data-ocid="fare-calc.distance_input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="calc-service">Service Type</Label>
              <Select value={calcService} onValueChange={setCalcService}>
                <SelectTrigger
                  id="calc-service"
                  data-ocid="fare-calc.service_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="sarthi">Sarthi (Passenger)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="calc-vehicle">Vehicle Type</Label>
              <Select value={calcVehicle} onValueChange={setCalcVehicle}>
                <SelectTrigger
                  id="calc-vehicle"
                  data-ocid="fare-calc.vehicle_select"
                >
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {rateCards
                    .filter(
                      (r) => (r.serviceType ?? "delivery") === calcService,
                    )
                    .map((r) => (
                      <SelectItem key={r.id} value={r.vehicleType}>
                        {VEHICLE_EMOJI[r.vehicleType]}{" "}
                        {VEHICLE_DISPLAY[r.vehicleType] ?? r.vehicleType}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {calcCard && calcDistNum > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">
                {VEHICLE_EMOJI[calcCard.vehicleType]}{" "}
                {VEHICLE_DISPLAY[calcCard.vehicleType]} ·{" "}
                {SERVICE_LABELS[calcCard.serviceType ?? "delivery"]} —{" "}
                {calcDistNum} km
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div>
                  Base:{" "}
                  <span className="font-medium text-foreground">
                    ₹{calcCard.baseRate}
                  </span>
                </div>
                <div>
                  Distance:{" "}
                  <span className="font-medium text-foreground">
                    ₹{(calcCard.perKmRate * calcDistNum).toFixed(0)}
                  </span>
                </div>
                <div>
                  Surge ×{calcCard.surgeMultiplier}:{" "}
                  <span className="font-medium text-amber-600">
                    +
                    {(
                      (calcCard.baseRate + calcCard.perKmRate * calcDistNum) *
                      (calcCard.surgeMultiplier - 1)
                    ).toFixed(0)}
                  </span>
                </div>
              </div>
              <p className="text-xl font-bold text-primary">
                ₹
                {sampleFare(
                  calcCard.baseRate,
                  calcCard.perKmRate,
                  calcCard.surgeMultiplier,
                  calcDistNum,
                )}
                <span className="text-xs font-normal text-muted-foreground ml-2">
                  estimated fare
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {editCard && (
        <CardFormModal
          title={`${VEHICLE_EMOJI[editCard.vehicleType] ?? "🚗"} Edit ${VEHICLE_DISPLAY[editCard.vehicleType] ?? editCard.vehicleType} Rate Card`}
          form={editForm}
          setForm={setEditForm}
          onSave={handleSaveEdit}
          onClose={() => setEditCard(null)}
          isNew={false}
        />
      )}
      {addOpen && (
        <CardFormModal
          title="Add Rate Card"
          form={addForm}
          setForm={setAddForm}
          onSave={handleAdd}
          onClose={() => {
            setAddOpen(false);
            setAddForm(EMPTY_FORM);
          }}
          isNew
        />
      )}
      {deleteTarget && (
        <Dialog open onOpenChange={(o) => !o && setDeleteTarget(null)}>
          <DialogContent className="max-w-sm" data-ocid="delete-rate.dialog">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive font-display">
                <AlertTriangle className="w-5 h-5" /> Delete Rate Card
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground mt-2">
              Delete the{" "}
              <strong>
                {VEHICLE_DISPLAY[deleteTarget.vehicleType] ??
                  deleteTarget.vehicleType}
              </strong>{" "}
              ({SERVICE_LABELS[deleteTarget.serviceType ?? "delivery"]}) rate
              card? This cannot be undone.
            </p>
            <div className="flex gap-2 justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                data-ocid="delete-rate.cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                data-ocid="delete-rate.confirm_button"
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RateCardsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("ratecards");

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "ratecards", label: "Rate Cards", icon: "💰" },
    { key: "freeride", label: "Free Ride Sarthis", icon: "🤝" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Transport Management
        </h2>
        <p className="text-sm text-muted-foreground">
          Rate cards and free-ride sarthi registrations. Shuttle routes are
          managed from the Shuttle Routes page.
        </p>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-2 border-b border-border pb-px overflow-x-auto"
        data-ocid="transport.tab"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap -mb-px ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`transport.${tab.key}_tab`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "ratecards" && <RateCardsSection />}
      {activeTab === "freeride" && <FreeRideSection />}
    </div>
  );
}
