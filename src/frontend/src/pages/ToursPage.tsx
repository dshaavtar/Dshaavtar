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
import {
  Calendar,
  Clock,
  Compass,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { TourOperator } from "../hooks/useBackend";
import {
  useAddTourOperator,
  useBookTour,
  useTourOperators,
} from "../hooks/useBackend";

// ─── Types ────────────────────────────────────────────────────────────────────

const TOUR_TYPES = [
  { value: "all", label: "All Types" },
  { value: "day_trip", label: "Day Trip" },
  { value: "overnight", label: "Overnight" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
];

// ─── Booking Panel ────────────────────────────────────────────────────────────

function BookingPanel({
  operator,
  onClose,
}: { operator: TourOperator; onClose: () => void }) {
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const bookMutation = useBookTour();
  const pricePerPerson = operator.price ?? 0;
  const total = passengers * pricePerPerson;

  async function handleBook() {
    if (!date) {
      toast.error("Please select a tour date");
      return;
    }
    setBookingError(null);
    try {
      const result = await bookMutation.mutateAsync({
        operatorId: operator.id,
        customerPhone: "9999999999",
        destination: operator.destination,
        tourType: operator.tourType || "day_trip",
        date,
        passengerCount: passengers,
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
        data-ocid="tours.booking.success_state"
      >
        <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm text-center p-8">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="font-display font-bold text-foreground mb-1">
            Tour Booked!
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Your tour with <strong>{operator.name}</strong> is confirmed.
          </p>
          <p className="text-xs font-mono bg-muted rounded-lg px-3 py-2 mb-4">
            Booking ID: {bookingId}
          </p>
          <Button
            className="w-full"
            onClick={onClose}
            data-ocid="tours.booking.close_button"
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
      data-ocid="tours.booking.dialog"
    >
      <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-foreground">
              Book Tour
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-muted"
              aria-label="Close"
              data-ocid="tours.booking.close_button"
            >
              <XCircle className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {operator.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {operator.duration} · from ₹{pricePerPerson}/person
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Tour Date
            </Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              data-ocid="tours.booking.date.input"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Number of Passengers
            </Label>
            <Input
              type="number"
              min={1}
              max={20}
              value={passengers}
              onChange={(e) =>
                setPassengers(Math.max(1, Math.min(20, Number(e.target.value))))
              }
              data-ocid="tours.booking.passengers.input"
            />
          </div>
          {pricePerPerson > 0 && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {passengers} × ₹{pricePerPerson}
                </span>
                <span className="text-lg font-bold text-blue-500">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}
          {bookingError && (
            <p
              className="text-xs text-destructive mt-2"
              data-ocid="tours.booking.error_state"
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
            data-ocid="tours.booking.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleBook}
            disabled={bookMutation.isPending}
            data-ocid="tours.booking.confirm_button"
          >
            {bookMutation.isPending
              ? "Booking..."
              : pricePerPerson > 0
                ? `Book · ₹${total.toLocaleString("en-IN")}`
                : "Book Tour"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Register Form ────────────────────────────────────────────────────────────

function RegisterOperatorForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    destinations: "",
    tourTypes: "",
    duration: "",
    price: "",
    phone: "",
    city: "",
  });
  const addOperator = useAddTourOperator();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.destinations) {
      toast.error("Fill all required fields");
      return;
    }
    try {
      const result = await addOperator.mutateAsync({
        name: form.name,
        destination: form.destinations,
        tourType: form.tourTypes || "day_trip",
        duration: form.duration,
        price: Number.parseFloat(form.price) || 0,
        phone: form.phone,
        description: form.city ? `City: ${form.city}` : "",
      });
      const id =
        result && typeof result === "object" && "id" in result
          ? String((result as Record<string, unknown>).id)
          : "";
      toast.success(
        id
          ? `Tour operator registered! ID: ${id}`
          : "Tour operator registered!",
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
      data-ocid="tours.register.dialog"
    >
      <div className="bg-card border border-border rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground">
            Register as Tour Operator
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg hover:bg-muted"
            data-ocid="tours.register.close_button"
          >
            <XCircle className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {[
            {
              key: "name",
              label: "Operator/Company Name",
              placeholder: "Himalayan Adventures",
            },
            {
              key: "destinations",
              label: "Destinations (comma separated)",
              placeholder: "Shimla, Manali",
            },
            {
              key: "tourTypes",
              label: "Tour Types (comma separated)",
              placeholder: "day_trip, adventure",
            },
            { key: "duration", label: "Duration", placeholder: "2–5 days" },
            {
              key: "price",
              label: "Price Per Person (₹)",
              placeholder: "3500",
              type: "number",
            },
            { key: "phone", label: "Contact Phone", placeholder: "9876543210" },
            { key: "city", label: "City", placeholder: "Delhi" },
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
                data-ocid={`tours.register.${key}.input`}
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="tours.register.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              disabled={addOperator.isPending}
              data-ocid="tours.register.submit_button"
            >
              {addOperator.isPending ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Operator Card ────────────────────────────────────────────────────────────

function OperatorCard({
  operator,
  onBook,
}: { operator: TourOperator; onBook: (o: TourOperator) => void }) {
  const destinations = operator.destination
    ? operator.destination.split(",").map((d) => d.trim())
    : [];
  const tourTypeLabel =
    TOUR_TYPES.find((t) => t.value === operator.tourType)?.label ??
    operator.tourType;

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-blue-500/15 flex items-center justify-center flex-shrink-0">
          <Compass className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">
            {operator.name}
          </h4>
          {operator.duration && (
            <p className="text-xs text-muted-foreground mt-0.5">
              ⏱ {operator.duration}
            </p>
          )}
        </div>
        {operator.price > 0 && (
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-blue-500">₹{operator.price}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
        )}
      </div>
      {destinations.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {destinations.slice(0, 4).map((d) => (
            <Badge key={d} variant="outline" className="text-xs">
              {d}
            </Badge>
          ))}
        </div>
      )}
      <div className="space-y-1.5 mb-4 text-xs text-muted-foreground">
        {operator.tourType && (
          <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium capitalize">
            {tourTypeLabel}
          </span>
        )}
        {operator.phone && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>{operator.phone}</span>
          </div>
        )}
      </div>
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        size="sm"
        onClick={() => onBook(operator)}
        data-ocid="tours.operator.book_button"
      >
        <Calendar className="w-4 h-4 mr-2" /> Book Tour
      </Button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ToursPage() {
  const {
    data: operators = [],
    isLoading,
    isError,
    refetch,
  } = useTourOperators();
  const [search, setSearch] = useState("");
  const [tourType, setTourType] = useState("all");
  const [bookingOperator, setBookingOperator] = useState<TourOperator | null>(
    null,
  );
  const [showRegister, setShowRegister] = useState(false);

  const filtered = operators.filter((o) => {
    const matchSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.destination.toLowerCase().includes(search.toLowerCase());
    const matchType =
      tourType === "all" ||
      o.tourType.toLowerCase().includes(tourType.toLowerCase());
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-500" /> Tours & Travel
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Discover and book curated tours across India
          </p>
        </div>
        <Button
          className="gap-2 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setShowRegister(true)}
          data-ocid="tours.register.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Register as Operator
        </Button>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="mb-4" data-ocid="tours.tabs">
          <TabsTrigger value="browse" data-ocid="tours.browse.tab">
            Browse Tours
          </TabsTrigger>
          <TabsTrigger value="bookings" data-ocid="tours.bookings.tab">
            My Bookings
          </TabsTrigger>
        </TabsList>

        {/* Browse Tab */}
        <TabsContent value="browse" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tours or destinations..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="tours.search.search_input"
              />
            </div>
            <Select value={tourType} onValueChange={setTourType}>
              <SelectTrigger
                className="w-44"
                data-ocid="tours.filter.type.select"
              >
                <SelectValue placeholder="Tour Type" />
              </SelectTrigger>
              <SelectContent>
                {TOUR_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
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
              data-ocid="tours.operators.error_state"
            >
              <Compass className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                Unable to load tours
              </p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Could not connect to the backend. Please try again.
              </p>
              <Button
                variant="outline"
                onClick={() => void refetch()}
                className="gap-2"
                data-ocid="tours.operators.retry_button"
              >
                <RefreshCw className="w-4 h-4" /> Retry
              </Button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && filtered.length === 0 && (
            <div
              className="py-16 text-center"
              data-ocid="tours.operators.empty_state"
            >
              <Compass className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">
                {operators.length === 0
                  ? "No tour operators registered yet"
                  : "No tours found"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {operators.length === 0
                  ? "Register a tour operator to get started"
                  : "Try adjusting your search or filters"}
              </p>
              {operators.length === 0 && (
                <Button
                  className="mt-4 gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => setShowRegister(true)}
                  data-ocid="tours.operators.empty_register_button"
                >
                  <Plus className="w-4 h-4" /> Register Operator
                </Button>
              )}
            </div>
          )}

          {/* Operator Grid */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              data-ocid="tours.operators.list"
            >
              {filtered.map((operator, i) => (
                <div
                  key={operator.id}
                  data-ocid={`tours.operator.item.${i + 1}`}
                >
                  <OperatorCard
                    operator={operator}
                    onBook={setBookingOperator}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* My Bookings Tab */}
        <TabsContent value="bookings" className="space-y-3">
          <div
            className="py-16 text-center"
            data-ocid="tours.bookings.empty_state"
          >
            <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-foreground">No bookings yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Browse tours and book your next adventure
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {bookingOperator && (
        <BookingPanel
          operator={bookingOperator}
          onClose={() => setBookingOperator(null)}
        />
      )}
      {showRegister && (
        <RegisterOperatorForm onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}
