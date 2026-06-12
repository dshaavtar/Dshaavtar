import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Brush,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Dumbbell,
  Home,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ServiceBooking } from "../backend.d";
import type { ProfessionalService } from "../hooks/useBackend";
import {
  useAddProfessionalService,
  useBookProfessionalService,
  useCityAreas,
  useGetServiceBookings,
  useProfessionalServices,
} from "../hooks/useBackend";

// ─── Types ─────────────────────────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  Massage: {
    icon: Brush,
    color: "text-pink-500 bg-pink-100 dark:bg-pink-900/30",
  },
  Plumbing: {
    icon: Wrench,
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
  },
  Electrical: {
    icon: Zap,
    color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30",
  },
  Training: {
    icon: Dumbbell,
    color: "text-green-500 bg-green-100 dark:bg-green-900/30",
  },
  Cleaning: {
    icon: Home,
    color: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30",
  },
  Beauty: {
    icon: Brush,
    color: "text-violet-500 bg-violet-100 dark:bg-violet-900/30",
  },
  Carpentry: {
    icon: Wrench,
    color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
  },
  default: { icon: Wrench, color: "text-muted-foreground bg-muted" },
};

const TIME_SLOTS = [
  { value: "morning", label: "Morning (8am \u2013 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm \u2013 4pm)" },
  { value: "evening", label: "Evening (4pm \u2013 8pm)" },
];
const DURATION_OPTIONS = [1, 2, 3, 4];

function getCategoryMeta(serviceType: string) {
  const lower = serviceType.toLowerCase();
  for (const [key, meta] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key.toLowerCase())) return meta;
  }
  return CATEGORY_ICONS.default;
}

// ─── Booking Panel ──────────────────────────────────────────────────────────────────────────────────────

function BookingPanel({
  service,
  customerArea,
  onClose,
}: {
  service: ProfessionalService;
  customerArea: string | null;
  onClose: () => void;
}) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState(1);
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const bookMutation = useBookProfessionalService();

  // Use appliedRate (area-specific or global) when area is selected, else global
  const effectiveRate =
    customerArea && service.appliedRate != null && service.appliedRate > 0
      ? service.appliedRate
      : (service.pricePerHour ?? 0);
  const total = duration * effectiveRate;
  const { icon: Icon, color } = getCategoryMeta(service.skillType);

  async function handleBook() {
    if (!date || !timeSlot) {
      toast.error("Select date and time slot");
      return;
    }
    setBookingError(null);
    try {
      const result = await bookMutation.mutateAsync({
        serviceId: service.id,
        customerPhone: "9999999999",
        date,
        timeSlot,
        duration,
        notes,
        customerArea: customerArea ?? null,
      });
      setBookingId(String(result.id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Booking failed";
      setBookingError(`Booking failed: ${msg}`);
    }
  }

  if (bookingId) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        data-ocid="services.booking.success_state"
      >
        <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm text-center p-8">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="font-display font-bold text-foreground mb-1">
            Service Booked!
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Your booking with{" "}
            <strong>{service.name || service.skillType}</strong> is confirmed.
          </p>
          <p className="text-xs font-mono bg-muted rounded-lg px-3 py-2 mb-4">
            Booking ID: {bookingId}
          </p>
          <Button
            className="w-full"
            onClick={onClose}
            data-ocid="services.booking.close_button"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      data-ocid="services.booking.dialog"
    >
      <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-foreground">
              Book Service
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-muted"
              aria-label="Close"
              data-ocid="services.booking.close_button"
            >
              <XCircle className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {service.name || service.skillType}
              </p>
              <p className="text-xs text-muted-foreground">
                {service.description || service.skillType}
                {effectiveRate > 0 ? ` \u00b7 \u20b9${effectiveRate}/hr` : ""}
              </p>
            </div>
          </div>
          {customerArea && (
            <div className="mt-2 px-1">
              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Area: {customerArea}
              </span>
            </div>
          )}
        </div>
        <div className="p-5 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              data-ocid="services.booking.date.input"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Time Slot
            </Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger data-ocid="services.booking.timeslot.select">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Duration (hours)
            </Label>
            <Select
              value={String(duration)}
              onValueChange={(v) => setDuration(Number(v))}
            >
              <SelectTrigger data-ocid="services.booking.duration.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    {d} hour{d > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Notes (Optional)
            </Label>
            <Textarea
              placeholder="Describe the work needed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none h-20"
              data-ocid="services.booking.notes.textarea"
            />
          </div>
          {effectiveRate > 0 && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {duration}hr \u00d7 \u20b9{effectiveRate}
                </span>
                <span className="text-lg font-bold text-amber-500">
                  \u20b9{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}
          {bookingError && (
            <p
              className="text-xs text-destructive"
              data-ocid="services.booking.error_state"
            >
              {bookingError}
            </p>
          )}
        </div>
        <div className="p-5 border-t border-border flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="services.booking.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleBook}
            disabled={bookMutation.isPending}
            data-ocid="services.booking.confirm_button"
          >
            {bookMutation.isPending
              ? "Booking..."
              : effectiveRate > 0
                ? `Book \u00b7 \u20b9${total.toLocaleString("en-IN")}`
                : "Book Service"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Area Rates Section ────────────────────────────────────────────────────────────────────────────────

function AreaRatesSection({
  city,
  areaRates,
  onChange,
}: {
  city: string;
  areaRates: Record<string, string>;
  onChange: (updated: Record<string, string>) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { data: areas = [], isLoading } = useCityAreas(city);

  if (!city.trim()) return null;

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-sm font-medium text-foreground"
        data-ocid="services.register.arearates.toggle"
      >
        <span>Area Rates (Optional)</span>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {expanded && (
        <div className="p-4 space-y-3 bg-card">
          <p className="text-xs text-muted-foreground">
            Set a specific rate for each area. Leave blank to use the global
            rate.
          </p>
          {isLoading && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
            </div>
          )}
          {!isLoading && areas.length === 0 && (
            <p className="text-xs text-muted-foreground italic">
              No areas found for \u201c{city}\u201d. Enter a valid city name
              above.
            </p>
          )}
          {!isLoading &&
            areas.map((area) => (
              <div key={area} className="flex items-center gap-3">
                <span className="text-sm text-foreground w-36 shrink-0 truncate">
                  {area}
                </span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    \u20b9
                  </span>
                  <Input
                    type="number"
                    placeholder="e.g. 400"
                    className="pl-7"
                    value={areaRates[area] ?? ""}
                    onChange={(e) =>
                      onChange({ ...areaRates, [area]: e.target.value })
                    }
                    data-ocid={`services.register.arearate.${area.toLowerCase().replace(/\s+/g, "-")}.input`}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ─── Register Form ─────────────────────────────────────────────────────────────────────────────────────────

const ALL_SERVICE_CATEGORIES = [
  "Massage/Spa",
  "Plumbing",
  "Electrical",
  "Personal Training",
  "Cleaning",
  "Beauty/Salon",
  "Carpentry",
  "Other",
];

function RegisterServiceForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    serviceType: "",
    specialization: "",
    pricePerHour: "",
    address: "",
    city: "",
    availability: "",
    phone: "",
  });
  const [areaRates, setAreaRates] = useState<Record<string, string>>({});
  const addService = useAddProfessionalService();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.serviceType || !form.specialization) {
      toast.error("Fill all required fields");
      return;
    }
    try {
      // Convert areaRates record to array of [area, rate] tuples, skipping blanks
      const areaRatesPairs: Array<[string, number]> = Object.entries(areaRates)
        .filter(([, v]) => v.trim() !== "")
        .map(([area, v]) => [area, Number.parseFloat(v)] as [string, number]);

      const result = await addService.mutateAsync({
        name: form.specialization,
        serviceType: form.serviceType,
        location: [form.address, form.city].filter(Boolean).join(", "),
        phone: form.phone,
        experience: form.availability,
        hourlyRate: Number.parseFloat(form.pricePerHour) || 0,
        description: form.specialization,
        areaRates: areaRatesPairs,
      });
      const id =
        result && typeof result === "object" && "id" in result
          ? String((result as Record<string, unknown>).id)
          : "";
      toast.success(
        id
          ? `Service registered successfully! ID: ${id}`
          : "Service registered successfully!",
      );
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      toast.error(`Failed to register: ${msg}`);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      data-ocid="services.register.dialog"
    >
      <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground">
            Register Your Service
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg hover:bg-muted"
            data-ocid="services.register.close_button"
          >
            <XCircle className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Service Type
            </Label>
            <Select
              value={form.serviceType}
              onValueChange={(v) => setForm((f) => ({ ...f, serviceType: v }))}
            >
              <SelectTrigger data-ocid="services.register.servicetype.select">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {ALL_SERVICE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(
            [
              {
                key: "specialization" as const,
                label: "Specialization",
                placeholder: "e.g. Home Wiring & Repairs",
                type: "text",
              },
              {
                key: "pricePerHour" as const,
                label: "Global Rate Per Hour (\u20b9)",
                placeholder: "350",
                type: "number",
              },
              {
                key: "address" as const,
                label: "Service Area / Address",
                placeholder: "Green Park, Delhi",
                type: "text",
              },
              {
                key: "city" as const,
                label: "City",
                placeholder: "Delhi",
                type: "text",
              },
              {
                key: "availability" as const,
                label: "Availability",
                placeholder: "Mon\u2013Sat, 8am\u20136pm",
                type: "text",
              },
              {
                key: "phone" as const,
                label: "Phone Number",
                placeholder: "9876543210",
                type: "text",
              },
            ] as Array<{
              key: keyof typeof form;
              label: string;
              placeholder: string;
              type: string;
            }>
          ).map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <Label className="text-xs text-muted-foreground mb-1.5">
                {label}
              </Label>
              <Input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                data-ocid={`services.register.${key}.input`}
              />
            </div>
          ))}
          {/* Area Rates expandable section */}
          <AreaRatesSection
            city={form.city}
            areaRates={areaRates}
            onChange={setAreaRates}
          />
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="services.register.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              disabled={addService.isPending}
              data-ocid="services.register.submit_button"
            >
              {addService.isPending ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  onBook,
}: {
  service: ProfessionalService;
  onBook: (s: ProfessionalService) => void;
}) {
  const { icon: Icon, color } = getCategoryMeta(service.skillType);
  // Show appliedRate when it's present (area-specific search result), else global rate
  const displayRate =
    service.appliedRate != null && service.appliedRate > 0
      ? service.appliedRate
      : (service.pricePerHour ?? 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-amber-300 dark:hover:border-amber-700 transition-all shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">
            {service.name || service.skillType}
          </h4>
          <Badge variant="outline" className="text-xs mt-0.5">
            {service.skillType}
          </Badge>
        </div>
        {displayRate > 0 && (
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-amber-500">\u20b9{displayRate}/hr</p>
          </div>
        )}
      </div>
      {service.description && (
        <p className="text-sm text-muted-foreground mb-3">
          {service.description}
        </p>
      )}
      <div className="space-y-1.5 mb-4 text-xs text-muted-foreground">
        {service.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate">{service.location}</span>
          </div>
        )}
        {service.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{service.phone}</span>
          </div>
        )}
      </div>
      <Button
        className="w-full bg-amber-500 hover:bg-amber-600 text-white"
        size="sm"
        onClick={() => onBook(service)}
        data-ocid="services.provider.book_button"
      >
        <Calendar className="w-4 h-4 mr-2" /> Book Service
      </Button>
    </div>
  );
}

// ─── My Bookings Tab ─────────────────────────────────────────────────────────────────────────

function MyBookingsTab() {
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useGetServiceBookings(null, null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="py-16 text-center"
        data-ocid="services.bookings.error_state"
      >
        <XCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
        <p className="font-semibold text-foreground">Failed to load bookings</p>
        <p className="text-sm text-muted-foreground mt-1">
          Please refresh and try again.
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div
        className="py-16 text-center"
        data-ocid="services.bookings.empty_state"
      >
        <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="font-semibold text-foreground">No bookings yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Browse services and book your first appointment
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="services.bookings.list">
      {(bookings as ServiceBooking[]).map((b, i) => (
        <div
          key={b.id}
          className="bg-card border border-border rounded-xl p-4"
          data-ocid={`services.bookings.item.${i + 1}`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold text-sm text-foreground">
              Booking #{b.id.slice(-6).toUpperCase()}
            </p>
            <Badge variant="outline" className="text-xs capitalize">
              {String(b.status)}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {b.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {b.timeSlot}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {b.customerPhone}
            </span>
          </div>
          {b.notes && (
            <p className="mt-1 text-xs text-muted-foreground italic">
              {b.notes}
            </p>
          )}
          <p className="mt-2 text-sm font-medium text-foreground">
            ₹{b.totalPrice.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────────────────────────────────────

export default function ProfessionalServicesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookingService, setBookingService] =
    useState<ProfessionalService | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("__none__");

  // Derive the committed city value (only trigger queries after the user stops typing)
  const [committedCity, setCommittedCity] = useState("");

  const customerArea =
    selectedArea && selectedArea !== "__none__" ? selectedArea : null;

  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useProfessionalServices(customerArea);

  const { data: areas = [], isLoading: areasLoading } =
    useCityAreas(committedCity);

  const categories = [
    "All",
    ...Array.from(new Set(services.map((s) => s.skillType).filter(Boolean))),
  ];

  const filtered = services.filter((s) => {
    const matchSearch =
      (s.name || s.skillType).toLowerCase().includes(search.toLowerCase()) ||
      (s.description ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || s.skillType === activeCategory;
    return matchSearch && matchCat;
  });

  function handleCityBlur() {
    setCommittedCity(cityInput.trim());
    // Reset area when city changes
    setSelectedArea("__none__");
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-500" /> Professional Services
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Book skilled professionals for home and personal services
          </p>
        </div>
        <Button
          className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => setShowRegister(true)}
          data-ocid="services.register.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Register Your Service
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div
        className="flex flex-wrap gap-2"
        data-ocid="services.category-filter"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const meta = cat !== "All" ? getCategoryMeta(cat) : null;
          const Icon = meta?.icon;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              data-ocid={`services.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {cat}
            </button>
          );
        })}
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="mb-4" data-ocid="services.tabs">
          <TabsTrigger value="browse" data-ocid="services.browse.tab">
            Browse Services
          </TabsTrigger>
          <TabsTrigger value="bookings" data-ocid="services.bookings.tab">
            My Bookings
          </TabsTrigger>
        </TabsList>

        {/* Browse Tab */}
        <TabsContent value="browse" className="space-y-4">
          {/* Search + City + Area row */}
          <div className="flex flex-wrap gap-3 items-end">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-9 w-52"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="services.search.search_input"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground">City</Label>
              <Input
                placeholder="e.g. Mumbai"
                className="w-40"
                value={cityInput}
                onChange={(e) => {
                  setCityInput(e.target.value);
                  if (selectedArea !== "__none__") setSelectedArea("__none__");
                }}
                onBlur={handleCityBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setCommittedCity(cityInput.trim());
                    setSelectedArea("__none__");
                  }
                }}
                data-ocid="services.search.city.input"
              />
            </div>
            {committedCity && (
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground">
                  Your area
                </Label>
                <Select
                  value={selectedArea}
                  onValueChange={(v) => setSelectedArea(v)}
                  disabled={areasLoading}
                >
                  <SelectTrigger
                    className="w-48"
                    data-ocid="services.search.area.select"
                  >
                    <SelectValue placeholder="Select your area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">All areas</SelectItem>
                    {areas.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                    {!areasLoading && areas.length === 0 && (
                      <SelectItem value="__none__" disabled>
                        No areas found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            {customerArea && (
              <div className="flex items-end pb-0.5">
                <Badge
                  variant="outline"
                  className="border-amber-300 text-amber-600 dark:text-amber-400 gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  {customerArea}
                </Badge>
              </div>
            )}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="flex gap-3 mb-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-full mt-4" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!isLoading && isError && (
            <div
              className="py-16 text-center bg-card border border-border rounded-xl"
              data-ocid="services.providers.error_state"
            >
              <Wrench className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                Unable to load services
              </p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Could not connect to the backend. Please try again.
              </p>
              <Button
                variant="outline"
                onClick={() => void refetch()}
                className="gap-2"
                data-ocid="services.providers.retry_button"
              >
                <RefreshCw className="w-4 h-4" /> Retry
              </Button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && filtered.length === 0 && (
            <div
              className="py-16 text-center"
              data-ocid="services.providers.empty_state"
            >
              <Wrench className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                {services.length === 0
                  ? "No services registered yet"
                  : "No services found"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {services.length === 0
                  ? "Register a professional service to get started"
                  : "Try a different category or search term"}
              </p>
              {services.length === 0 && (
                <Button
                  className="mt-4 gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={() => setShowRegister(true)}
                  data-ocid="services.providers.empty_register_button"
                >
                  <Plus className="w-4 h-4" /> Register Service
                </Button>
              )}
            </div>
          )}

          {/* Services Grid */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              data-ocid="services.providers.list"
            >
              {filtered.map((service, i) => (
                <div
                  key={service.id}
                  data-ocid={`services.provider.item.${i + 1}`}
                >
                  <ServiceCard service={service} onBook={setBookingService} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* My Bookings Tab */}
        <TabsContent value="bookings" className="space-y-3">
          <MyBookingsTab />
        </TabsContent>
      </Tabs>

      {bookingService && (
        <BookingPanel
          service={bookingService}
          customerArea={customerArea}
          onClose={() => setBookingService(null)}
        />
      )}
      {showRegister && (
        <RegisterServiceForm onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}
