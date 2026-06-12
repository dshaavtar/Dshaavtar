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
  Calendar,
  Clock,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Star,
  Stethoscope,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { HealthcareProvider } from "../hooks/useBackend";
import {
  useAddHealthcareProvider,
  useBookHealthcareAppointment,
  useHealthcareProviders,
} from "../hooks/useBackend";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppointmentLocal {
  id: string;
  providerName: string;
  specialization: string;
  date: string;
  timeSlot: string;
  fee: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const SPECIALIZATIONS = [
  "All",
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Cardiologist",
  "Orthopedist",
  "Dentist",
  "Psychiatrist",
  "Neurologist",
];
const TIME_SLOTS = [
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 4pm)" },
  { value: "evening", label: "Evening (4pm – 8pm)" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function _AppointmentStatusBadge({
  status,
}: { status: AppointmentLocal["status"] }) {
  const MAP: Record<AppointmentLocal["status"], string> = {
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    confirmed:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${MAP[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Booking Panel ────────────────────────────────────────────────────────────

function BookingPanel({
  provider,
  onClose,
}: { provider: HealthcareProvider; onClose: () => void }) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const bookMutation = useBookHealthcareAppointment();

  async function handleBook() {
    if (!date || !timeSlot) {
      toast.error("Please select date and time slot");
      return;
    }
    setBookingError(null);
    try {
      const result = await bookMutation.mutateAsync({
        providerId: provider.id,
        customerPhone: "9999999999",
        date,
        timeSlot,
        notes,
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
        data-ocid="healthcare.booking.success_state"
      >
        <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm text-center p-8">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="font-display font-bold text-foreground mb-1">
            Booking Confirmed!
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Your appointment with <strong>{provider.name}</strong> is booked.
          </p>
          <p className="text-xs font-mono bg-muted rounded-lg px-3 py-2 mb-4">
            Booking ID: {bookingId}
          </p>
          <Button
            className="w-full"
            onClick={onClose}
            data-ocid="healthcare.booking.close_button"
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
      data-ocid="healthcare.booking.dialog"
    >
      <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-foreground">
              Book Appointment
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close"
              data-ocid="healthcare.booking.close_button"
            >
              <XCircle className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-3 p-3 bg-pink-50 dark:bg-pink-950/20 rounded-xl border border-pink-100 dark:border-pink-900/30">
            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {provider.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {provider.specialization}
                {provider.fee ? ` · ₹${provider.fee}` : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Appointment Date
            </Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              data-ocid="healthcare.booking.date.input"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Time Slot
            </Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger data-ocid="healthcare.booking.timeslot.select">
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
              Notes (Optional)
            </Label>
            <Textarea
              placeholder="Describe symptoms or any specific concern..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none h-24"
              data-ocid="healthcare.booking.notes.textarea"
            />
          </div>
          {bookingError && (
            <p
              className="text-xs text-destructive mt-2"
              data-ocid="healthcare.booking.error_state"
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
            data-ocid="healthcare.booking.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            onClick={handleBook}
            disabled={bookMutation.isPending}
            data-ocid="healthcare.booking.confirm_button"
          >
            {bookMutation.isPending
              ? "Booking..."
              : provider.fee
                ? `Book · ₹${provider.fee}`
                : "Book Appointment"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Register Form ────────────────────────────────────────────────────────────

function RegisterProviderForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    fee: "",
    address: "",
    city: "",
    availability: "",
    phone: "",
  });
  const addProvider = useAddHealthcareProvider();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.specialization || !form.fee) {
      toast.error("Fill all required fields");
      return;
    }
    try {
      const result = await addProvider.mutateAsync({
        name: form.name,
        specialization: form.specialization,
        location: [form.address, form.city].filter(Boolean).join(", "),
        phone: form.phone,
        availableDays: form.availability,
        fee: Number.parseFloat(form.fee),
      });
      const id =
        result && typeof result === "object" && "id" in result
          ? String((result as Record<string, unknown>).id)
          : "";
      toast.success(
        id ? `Provider registered! ID: ${id}` : "Provider registered!",
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
      data-ocid="healthcare.register.dialog"
    >
      <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground">
            Register as Healthcare Provider
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg hover:bg-muted"
            data-ocid="healthcare.register.close_button"
          >
            <XCircle className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {[
            { key: "name", label: "Full Name", placeholder: "Dr. John Doe" },
            {
              key: "fee",
              label: "Consultation Fee (₹)",
              placeholder: "500",
              type: "number",
            },
            {
              key: "address",
              label: "Clinic Address",
              placeholder: "123 Main Street",
            },
            { key: "city", label: "City", placeholder: "Delhi" },
            {
              key: "availability",
              label: "Availability",
              placeholder: "Mon–Sat, 9am–5pm",
            },
            { key: "phone", label: "Phone Number", placeholder: "9876543210" },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <Label className="text-xs text-muted-foreground mb-1.5">
                {label}
              </Label>
              <Input
                type={type ?? "text"}
                placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                data-ocid={`healthcare.register.${key}.input`}
              />
            </div>
          ))}
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Specialization
            </Label>
            <Select
              value={form.specialization}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, specialization: v }))
              }
            >
              <SelectTrigger data-ocid="healthcare.register.specialization.select">
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALIZATIONS.filter((s) => s !== "All").map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="healthcare.register.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
              disabled={addProvider.isPending}
              data-ocid="healthcare.register.submit_button"
            >
              {addProvider.isPending ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Provider Card ────────────────────────────────────────────────────────────

function ProviderCard({
  provider,
  onBook,
}: { provider: HealthcareProvider; onBook: (p: HealthcareProvider) => void }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-pink-300 dark:hover:border-pink-700 transition-all shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-pink-500/15 flex items-center justify-center flex-shrink-0">
          <Stethoscope className="w-6 h-6 text-pink-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">
            {provider.name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {provider.specialization}
          </p>
          {provider.availableDays && (
            <p className="text-xs text-muted-foreground mt-0.5">
              🕐 {provider.availableDays}
            </p>
          )}
        </div>
        {provider.fee ? (
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-pink-500">₹{provider.fee}</p>
            <p className="text-xs text-muted-foreground">per visit</p>
          </div>
        ) : null}
      </div>
      <div className="space-y-1.5 mb-4">
        {provider.location && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-pink-400" />
            <span className="truncate">{provider.location}</span>
          </div>
        )}
        {provider.phone && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="w-3.5 h-3.5 text-pink-400" />
            <span>{provider.phone}</span>
          </div>
        )}
      </div>
      <Button
        className="w-full bg-pink-500 hover:bg-pink-600 text-white"
        size="sm"
        onClick={() => onBook(provider)}
        data-ocid="healthcare.provider.book_button"
      >
        <Calendar className="w-4 h-4 mr-2" /> Book Appointment
      </Button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HealthcarePage() {
  const {
    data: providers = [],
    isLoading,
    isError,
    refetch,
  } = useHealthcareProviders();
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [bookingProvider, setBookingProvider] =
    useState<HealthcareProvider | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const filtered = providers.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchSpec =
      specialization === "All" ||
      p.specialization.toLowerCase().includes(specialization.toLowerCase());
    return matchSearch && matchSpec;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-pink-500" /> Healthcare
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Book consultations with qualified healthcare professionals
          </p>
        </div>
        <Button
          className="gap-2 bg-pink-500 hover:bg-pink-600 text-white"
          onClick={() => setShowRegister(true)}
          data-ocid="healthcare.register.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Register as Provider
        </Button>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="mb-4" data-ocid="healthcare.tabs">
          <TabsTrigger value="browse" data-ocid="healthcare.browse.tab">
            Browse Providers
          </TabsTrigger>
          <TabsTrigger
            value="appointments"
            data-ocid="healthcare.appointments.tab"
          >
            My Appointments
          </TabsTrigger>
        </TabsList>

        {/* Browse Tab */}
        <TabsContent value="browse" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="healthcare.search.search_input"
              />
            </div>
            <Select value={specialization} onValueChange={setSpecialization}>
              <SelectTrigger
                className="w-48"
                data-ocid="healthcare.filter.specialization.select"
              >
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALIZATIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              data-ocid="healthcare.providers.error_state"
            >
              <Stethoscope className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                Unable to load providers
              </p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Could not connect to the backend. Please try again.
              </p>
              <Button
                variant="outline"
                onClick={() => void refetch()}
                className="gap-2"
                data-ocid="healthcare.providers.retry_button"
              >
                <RefreshCw className="w-4 h-4" /> Retry
              </Button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && filtered.length === 0 && (
            <div
              className="py-16 text-center"
              data-ocid="healthcare.providers.empty_state"
            >
              <Stethoscope className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                {providers.length === 0
                  ? "No providers registered yet"
                  : "No providers found"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {providers.length === 0
                  ? "Register a healthcare provider to get started"
                  : "Try adjusting your filters"}
              </p>
              {providers.length === 0 && (
                <Button
                  className="mt-4 gap-2 bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={() => setShowRegister(true)}
                  data-ocid="healthcare.providers.empty_register_button"
                >
                  <Plus className="w-4 h-4" /> Register Provider
                </Button>
              )}
            </div>
          )}

          {/* Provider Grid */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              data-ocid="healthcare.providers.list"
            >
              {filtered.map((provider, i) => (
                <div
                  key={provider.id}
                  data-ocid={`healthcare.provider.item.${i + 1}`}
                >
                  <ProviderCard
                    provider={provider}
                    onBook={setBookingProvider}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* My Appointments Tab */}
        <TabsContent value="appointments" className="space-y-3">
          <div
            className="py-16 text-center"
            data-ocid="healthcare.appointments.empty_state"
          >
            <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-foreground">No appointments yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Browse providers and book your first appointment
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {bookingProvider && (
        <BookingPanel
          provider={bookingProvider}
          onClose={() => setBookingProvider(null)}
        />
      )}
      {showRegister && (
        <RegisterProviderForm onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}
