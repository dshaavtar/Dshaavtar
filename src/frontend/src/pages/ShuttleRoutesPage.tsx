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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bus,
  CheckCircle,
  MapPin,
  Plus,
  PlusCircle,
  Search,
  Ticket,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { VehicleType } from "../backend";
import {
  useActivateShuttleRoute,
  useDeactivateShuttleRoute,
  usePostShuttleRoute,
  useShuttleRoutes,
} from "../hooks/useBackend";
import type { AppShuttleRoute } from "../types";

interface StopForm {
  stopName: string;
  ticketFee: string;
  arrivalTime: string;
}

// ─── Add Route Dialog ─────────────────────────────────────────────────────────

function AddRouteDialog({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [routeName, setRouteName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [pricePerTicket, setPricePerTicket] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [stops, setStops] = useState<StopForm[]>([
    { stopName: "", ticketFee: "0", arrivalTime: "" },
    { stopName: "", ticketFee: "0", arrivalTime: "" },
  ]);
  const postShuttleRoute = usePostShuttleRoute();

  function addStop() {
    setStops((s) => [...s, { stopName: "", ticketFee: "0", arrivalTime: "" }]);
  }

  function removeStop(idx: number) {
    if (stops.length <= 2) return;
    setStops((s) => s.filter((_, i) => i !== idx));
  }

  function updateStop(idx: number, field: keyof StopForm, value: string) {
    setStops((s) =>
      s.map((stop, i) => (i === idx ? { ...stop, [field]: value } : stop)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!routeName || !serviceName || stops.some((s) => !s.stopName)) {
      toast.error("Route name, service name, and all stop names are required");
      return;
    }
    const source = stops[0]?.stopName ?? routeName;
    const destination = stops[stops.length - 1]?.stopName ?? routeName;
    const firstStop = stops[0];
    const lastStop = stops[stops.length - 1];
    try {
      await postShuttleRoute.mutateAsync({
        routeName,
        source,
        destination,
        stops: stops.map((s) => s.stopName),
        vehicleType: VehicleType.bus,
        vehicleNumber: vehicleNumber || undefined,
        departureTime: firstStop?.arrivalTime ?? "",
        arrivalTime: lastStop?.arrivalTime ?? "",
        fare: Number.parseFloat(pricePerTicket) || 0,
        availableSeats: 20,
        driverId: postedBy || "admin",
      });
      toast.success(
        `Shuttle route created successfully${vehicleNumber ? ` (Vehicle: ${vehicleNumber})` : ""}`,
      );
      onClose();
    } catch {
      toast.error("Failed to create shuttle route");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="shuttle.add-route-dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Bus className="w-5 h-5 text-primary" /> Add Shuttle Route
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Route Name</Label>
              <Input
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="e.g. Connaught Place → Gurgaon"
                data-ocid="shuttle.route-name-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Service Name</Label>
              <Input
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g. City Shuttle Express"
                data-ocid="shuttle.service-name-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Vehicle Number *</Label>
              <Input
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. MH12AB1234"
                data-ocid="shuttle.vehicle-number-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Base Price per Ticket (₹)</Label>
              <Input
                type="number"
                value={pricePerTicket}
                onChange={(e) => setPricePerTicket(e.target.value)}
                placeholder="50"
                data-ocid="shuttle.price-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Posted By (phone)</Label>
              <Input
                value={postedBy}
                onChange={(e) => setPostedBy(e.target.value)}
                placeholder="+91 98765 43210"
                data-ocid="shuttle.posted-by-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Stops ({stops.length})</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs h-7"
                onClick={addStop}
                data-ocid="shuttle.add-stop-button"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add Stop
              </Button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {stops.map((stop, idx) => (
                <div
                  key={`stop-${idx + 1}`}
                  className="bg-muted/30 rounded-lg p-3 space-y-2"
                  data-ocid={`shuttle.stop.${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary" /> Stop {idx + 1}
                    </span>
                    {stops.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-destructive"
                        onClick={() => removeStop(idx)}
                        data-ocid={`shuttle.remove-stop.${idx + 1}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-0.5">
                      <Label className="text-xs">Stop Name</Label>
                      <Input
                        className="h-7 text-xs"
                        value={stop.stopName}
                        onChange={(e) =>
                          updateStop(idx, "stopName", e.target.value)
                        }
                        placeholder="Stop name"
                        data-ocid={`shuttle.stop-name.${idx + 1}`}
                      />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-xs">Ticket Fee (₹)</Label>
                      <Input
                        className="h-7 text-xs"
                        type="number"
                        value={stop.ticketFee}
                        onChange={(e) =>
                          updateStop(idx, "ticketFee", e.target.value)
                        }
                        placeholder="0"
                        data-ocid={`shuttle.stop-fee.${idx + 1}`}
                      />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-xs">Arrival Time</Label>
                      <Input
                        className="h-7 text-xs"
                        value={stop.arrivalTime}
                        onChange={(e) =>
                          updateStop(idx, "arrivalTime", e.target.value)
                        }
                        placeholder="08:00 AM"
                        data-ocid={`shuttle.stop-time.${idx + 1}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="shuttle.add-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={postShuttleRoute.isPending}
              data-ocid="shuttle.add-submit"
            >
              {postShuttleRoute.isPending ? "Creating…" : "Create Route"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ShuttleRoutesPage() {
  const { data: rawRoutes = [], isLoading } = useShuttleRoutes();
  const routes: AppShuttleRoute[] = rawRoutes.map((r) => ({
    ...r,
    price: Number(
      (r as { fare?: bigint; price?: number }).fare ??
        (r as { price?: number }).price ??
        0,
    ),
    status: (r.isActive ? "active" : "inactive") as "active" | "inactive",
    availableSeats: Number(r.availableSeats),
    vehicleType: String(r.vehicleType),
    createdAt: r.createdAt ? Number(r.createdAt) : undefined,
  }));
  const deactivate = useDeactivateShuttleRoute();
  const activate = useActivateShuttleRoute();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filtered = routes.filter((r) => {
    if (statusFilter === "active" && r.status !== "active") return false;
    if (statusFilter === "inactive" && r.status !== "inactive") return false;
    if (
      search &&
      !r.routeName.toLowerCase().includes(search.toLowerCase()) &&
      !r.serviceName.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const activeCount = routes.filter((r) => r.status === "active").length;

  async function handleToggle(routeId: string, currentlyActive: boolean) {
    try {
      if (currentlyActive) {
        await deactivate.mutateAsync(routeId);
        toast.success("Route deactivated");
      } else {
        await activate.mutateAsync(routeId);
        toast.success("Route activated");
      }
    } catch {
      toast.error("Failed to update route status");
    }
  }

  return (
    <div className="space-y-5 animate-fade-in" data-ocid="shuttle-routes.page">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Bus className="w-5 h-5 text-primary" /> Shuttle Routes
          </h2>
          <p className="text-sm text-muted-foreground">
            {routes.length} routes · {activeCount} active
          </p>
        </div>
        <Button
          className="gap-2 shrink-0"
          onClick={() => setShowAddDialog(true)}
          data-ocid="shuttle-routes.add-button"
        >
          <Plus className="w-4 h-4" /> Add Route
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Routes",
            value: routes.length,
            color: "text-foreground",
          },
          { label: "Active", value: activeCount, color: "text-emerald-600" },
          {
            label: "Inactive",
            value: routes.length - activeCount,
            color: "text-muted-foreground",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-3"
          >
            <p className={`text-2xl font-bold font-display ${color}`}>
              {value}
            </p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            placeholder="Search routes…"
            data-ocid="shuttle-routes.search_input"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
        >
          <SelectTrigger
            className="w-full sm:w-36"
            data-ocid="shuttle-routes.status-filter"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Show All</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Inactive Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {["r1", "r2", "r3"].map((k) => (
              <Skeleton key={k} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center gap-3 py-16 text-center"
            data-ocid="shuttle-routes.empty_state"
          >
            <Bus className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">
              No shuttle routes found
            </p>
            <Button
              size="sm"
              onClick={() => setShowAddDialog(true)}
              data-ocid="shuttle-routes.empty-add-button"
            >
              Add First Route
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="shuttle-routes.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Route</th>
                  <th className="text-left py-3 px-3 font-medium">Service</th>
                  <th className="text-left py-3 px-3 font-medium">
                    Route Info
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Price</th>
                  <th className="text-left py-3 px-3 font-medium hidden md:table-cell">
                    Vehicle No.
                  </th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">
                    Driver ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((route: AppShuttleRoute, idx: number) => {
                  const isActive = route.status === "active";
                  return (
                    <tr
                      key={route.id}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      data-ocid={`shuttle-routes.item.${idx + 1}`}
                    >
                      <td className="py-3 px-4">
                        <p className="font-medium text-sm text-foreground">
                          {route.routeName}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {route.id}
                        </p>
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground">
                        {route.serviceName}
                      </td>
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate max-w-[100px]">
                              {route.source}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground px-3">
                            ↓
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-2.5 h-2.5 shrink-0 text-primary" />
                            <span className="truncate max-w-[100px]">
                              {route.destination}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <Ticket className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs font-medium">
                            ₹{route.price}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 hidden md:table-cell text-xs font-mono text-muted-foreground">
                        {route.vehicleNumber ?? "—"}
                      </td>
                      <td className="py-3 px-3">
                        {isActive ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs gap-1">
                            <CheckCircle className="w-3 h-3" /> Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground text-xs gap-1"
                          >
                            <XCircle className="w-3 h-3" /> Inactive
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-3 hidden lg:table-cell text-xs text-muted-foreground font-mono">
                        {route.driverId}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant={isActive ? "destructive" : "outline"}
                          className={`h-7 text-xs ${!isActive ? "text-emerald-700 border-emerald-300 hover:bg-emerald-50" : ""}`}
                          onClick={() => handleToggle(route.id, isActive)}
                          disabled={deactivate.isPending || activate.isPending}
                          data-ocid={`shuttle-routes.toggle-button.${idx + 1}`}
                        >
                          {isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddRouteDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
      />
    </div>
  );
}
