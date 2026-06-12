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
  Briefcase,
  ChevronDown,
  ChevronUp,
  Eye,
  MapPin,
  Plus,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useGetFavoriteEmployers,
  useGetJobCitiesAvailable,
  useGetJobsByEmployer,
  useJobs,
  useMarkEmployerFavorite,
  useMyJobListings,
  usePostJob,
  useSearchJobsByCity,
  useUnmarkEmployerFavorite,
} from "../hooks/useBackend";
import {
  useAddJobLocation,
  useGetJobLocations,
} from "../hooks/useJobLocations";
import type { ContactRequest, Job } from "../types";
import { ContactRequestStatus } from "../types";

const JOB_CATEGORIES = [
  "Accounting & Finance",
  "Administration",
  "Advertising & PR",
  "Architecture & Design",
  "Automobile & Auto",
  "Banking & Insurance",
  "Beauty & Wellness",
  "BPO & Call Centre",
  "Catering & Food",
  "Civil Engineering",
  "Cleaning & Housekeeping",
  "Construction",
  "Content & Writing",
  "Courier & Delivery",
  "Customer Service",
  "Data Entry",
  "Data Science & Analytics",
  "Defence & Security",
  "Driver & Transport",
  "Education & Teaching",
  "Electrical & Electronics",
  "Event Management",
  "Fashion & Textile",
  "Finance",
  "Food & Hospitality",
  "General Labour",
  "General",
  "Graphic Design",
  "Hardware & IT Support",
  "Healthcare & Medical",
  "HR & Recruitment",
  "Interior Design",
  "IT & Software",
  "Journalism & Media",
  "Legal & Law",
  "Logistics",
  "Management",
  "Manufacturing",
  "Marketing & Sales",
  "Mechanical Engineering",
  "Operations",
  "Photography & Video",
  "Plumbing & Sanitation",
  "Project Management",
  "Real Estate",
  "Research & Development",
  "Retail & Store",
  "Security Services",
  "Social Media",
  "Supply Chain",
  "Technology",
  "Telecalling",
  "Tourism & Travel",
  "Training & Coaching",
  "Warehouse",
  "Web & Mobile Dev",
].sort((a, b) => a.localeCompare(b));

const PAGE_SIZE = 20;

function StatCard({
  label,
  value,
  color,
}: { label: string; value: number; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1 shadow-sm">
      <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function LeadsTable({
  leads,
  onApprove,
  onReject,
}: {
  leads: ContactRequest[];
  onApprove: (requesterId: string) => void;
  onReject: (requesterId: string) => void;
}) {
  if (!leads.length) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No leads yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-xs">
            <th className="text-left py-2 pr-3 font-medium">Name</th>
            <th className="text-left py-2 pr-3 font-medium">Phone</th>
            <th className="text-left py-2 pr-3 font-medium">Date</th>
            <th className="text-left py-2 pr-3 font-medium">Status</th>
            <th className="text-left py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.requesterId}
              className="border-b border-border/50 hover:bg-muted/30 transition-colors"
            >
              <td className="py-2.5 pr-3 font-medium">{lead.requesterName}</td>
              <td className="py-2.5 pr-3 text-muted-foreground font-mono text-xs">
                {lead.requesterPhone}
              </td>
              <td className="py-2.5 pr-3 text-muted-foreground text-xs whitespace-nowrap">
                {new Date(Number(lead.requestedAt)).toLocaleDateString("en-IN")}
              </td>
              <td className="py-2.5 pr-3">
                {lead.status === ContactRequestStatus.approved ? (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    Approved
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-muted-foreground text-xs"
                  >
                    Pending
                  </Badge>
                )}
              </td>
              <td className="py-2.5">
                {lead.status !== ContactRequestStatus.approved ? (
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => onApprove(lead.requesterId)}
                      data-ocid="lead-approve-btn"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-xs"
                      onClick={() => onReject(lead.requesterId)}
                      data-ocid="lead-reject-btn"
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── My Job Listings Tab ──────────────────────────────────────────────────────

function JobLocationSelector({
  jobId,
  onSelect,
}: { jobId: string; onSelect?: (city: string) => void }) {
  const { locations } = useGetJobLocations(jobId);
  if (locations.length === 0) return null;
  return (
    <div className="bg-muted/30 rounded-lg p-3">
      <p className="text-xs font-medium text-muted-foreground mb-1">
        Additional Locations
      </p>
      <div className="flex flex-wrap gap-1.5">
        {locations.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => onSelect?.(loc.city)}
            className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs border border-primary/20"
          >
            {loc.city}
          </button>
        ))}
      </div>
    </div>
  );
}

function MyJobListingsTab() {
  const [phone, setPhone] = useState("");
  const [queryPhone, setQueryPhone] = useState("");
  const { data: myJobs = [], isLoading, error } = useMyJobListings(queryPhone);

  return (
    <div className="space-y-4" data-ocid="my-jobs.section">
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-sm font-medium text-foreground mb-3">
          Enter your phone number to view your posted jobs
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="max-w-xs"
            data-ocid="my-jobs.phone_input"
          />
          <Button
            onClick={() => setQueryPhone(phone.trim())}
            disabled={!phone.trim()}
            data-ocid="my-jobs.search_button"
          >
            View My Listings
          </Button>
        </div>
      </div>

      {!queryPhone && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="my-jobs.empty_state"
        >
          <Briefcase className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            Enter your phone number above to view your posted jobs
          </p>
        </div>
      )}

      {queryPhone && isLoading && (
        <div className="space-y-3">
          {["s1", "s2", "s3"].map((s) => (
            <Skeleton key={s} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      )}

      {queryPhone && !isLoading && (error || myJobs.length === 0) && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="my-jobs.no_results"
        >
          <Briefcase className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            {error
              ? "Failed to load listings"
              : "No listings yet. Post your first one!"}
          </p>
          {error && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQueryPhone("")}
              data-ocid="my-jobs.retry_button"
            >
              Retry
            </Button>
          )}
        </div>
      )}

      {queryPhone && !isLoading && myJobs.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              {myJobs.length} job{myJobs.length !== 1 ? "s" : ""} posted
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="my-jobs.table">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-3 font-medium">Category</th>
                  <th className="text-left py-3 px-3 font-medium">Salary</th>
                  <th className="text-left py-3 px-3 font-medium">Location</th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium">Posted</th>
                  <th className="text-right py-3 px-3 font-medium">Leads</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((job, i) => (
                  <tr
                    key={job.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`my-jobs.item.${i + 1}`}
                  >
                    <td className="py-3 px-4 font-medium text-foreground max-w-[160px] truncate">
                      {job.title}
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">
                      {job.category}
                    </td>
                    <td className="py-3 px-3 text-xs tabular-nums font-medium whitespace-nowrap">
                      ₹{job.salaryMin.toLocaleString("en-IN")} – ₹
                      {job.salaryMax.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground max-w-[120px] truncate">
                      {job.location.address}
                    </td>
                    <td className="py-3 px-3">
                      {job.isOpen ? (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          Open
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground text-xs"
                        >
                          Closed
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(Number(job.publishDate)).toLocaleDateString(
                        "en-IN",
                      )}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums font-semibold">
                      {job.leads.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Job City Search Tab ──────────────────────────────────────────────────

function JobCitySearchTab() {
  const { data: citiesData = [], isLoading: citiesLoading } =
    useGetJobCitiesAvailable();
  const [selectedCity, setSelectedCity] = useState("");
  const [willingToRelocate, setWillingToRelocate] = useState(false);
  const [relocateCities, setRelocateCities] = useState<string[]>([]);
  const markFavorite = useMarkEmployerFavorite();
  const unmarkFavorite = useUnmarkEmployerFavorite();
  const { data: favorites = [] } = useGetFavoriteEmployers();

  const { data: cityJobs = [], isLoading: jobsLoading } = useSearchJobsByCity(
    selectedCity,
    willingToRelocate,
    relocateCities,
  );

  const favoritePhones = new Set(
    favorites.map((f: Record<string, unknown>) =>
      String(f.employerPhone ?? ""),
    ),
  );

  function toggleRelocateCity(city: string) {
    setRelocateCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    );
  }

  const otherCities = citiesData.filter((c) => c.city !== selectedCity);

  return (
    <div className="space-y-4" data-ocid="jobs.city-search.section">
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5">
            Select City
          </Label>
          {citiesLoading ? (
            <Skeleton className="h-9 w-full max-w-xs" />
          ) : (
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="max-w-xs" data-ocid="jobs.city.select">
                <SelectValue placeholder="Choose a city to find jobs" />
              </SelectTrigger>
              <SelectContent>
                {citiesData.map((c) => (
                  <SelectItem key={c.city} value={c.city}>
                    {c.city} ({c.jobCount} job{c.jobCount !== 1 ? "s" : ""})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {selectedCity && (
          <div className="flex items-center gap-3">
            <Switch
              checked={willingToRelocate}
              onCheckedChange={setWillingToRelocate}
              data-ocid="jobs.city.relocate_toggle"
            />
            <Label className="text-sm cursor-pointer">
              Willing to relocate to other cities?
            </Label>
          </div>
        )}

        {willingToRelocate && otherCities.length > 0 && (
          <div>
            <Label className="text-xs text-muted-foreground mb-2">
              Also search in:
            </Label>
            <div className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <button
                  key={c.city}
                  type="button"
                  onClick={() => toggleRelocateCity(c.city)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    relocateCities.includes(c.city)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted border-border text-foreground hover:bg-muted/70"
                  }`}
                  data-ocid={`jobs.relocate.city.${c.city.toLowerCase()}`}
                >
                  {c.city} ({c.jobCount})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {!selectedCity && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="jobs.city-search.empty_state"
        >
          <MapPin className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            Select a city above to browse jobs
          </p>
        </div>
      )}

      {selectedCity && jobsLoading && (
        <div className="space-y-3">
          {["s1", "s2", "s3"].map((s) => (
            <Skeleton key={s} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {selectedCity && !jobsLoading && cityJobs.length === 0 && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
          data-ocid="jobs.city-search.no_results"
        >
          <Briefcase className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">
            No jobs found in {selectedCity}
          </p>
        </div>
      )}

      {cityJobs.length > 0 && (
        <div className="space-y-3">
          {cityJobs.map((job, idx) => {
            const isFav = favoritePhones.has(String(job.posterId ?? ""));
            return (
              <div
                key={job.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-all"
                data-ocid={`jobs.city-result.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {job.category}
                      </Badge>
                      {job.isOpen ? (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          Open
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground text-xs"
                        >
                          Closed
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location.address}
                      </span>
                      <span className="font-medium tabular-nums">
                        ₹{job.salaryMin.toLocaleString("en-IN")} – ₹
                        {job.salaryMax.toLocaleString("en-IN")}/mo
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={
                      isFav
                        ? "Remove from favorites"
                        : "Mark employer as favorite"
                    }
                    onClick={async () => {
                      const phone = String(job.posterId ?? "");
                      if (!phone) return;
                      try {
                        if (isFav) {
                          await unmarkFavorite.mutateAsync({
                            employerPhone: phone,
                            city: job.location.address,
                          });
                          toast.success("Removed from favorites");
                        } else {
                          await markFavorite.mutateAsync({
                            employerPhone: phone,
                            city: job.location.address,
                          });
                          toast.success("Employer marked as favorite!");
                        }
                      } catch {
                        toast.error("Failed to update favorites");
                      }
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isFav
                        ? "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    data-ocid={`jobs.city-result.favorite.${idx + 1}`}
                  >
                    <Star
                      className={`w-5 h-5 ${isFav ? "fill-amber-500" : ""}`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Favorite Employers Tab ─────────────────────────────────────────────────

function FavoriteEmployersTab() {
  const { data: favorites = [], isLoading } = useGetFavoriteEmployers();
  const unmarkFavorite = useUnmarkEmployerFavorite();
  const [viewEmployerPhone, setViewEmployerPhone] = useState<string | null>(
    null,
  );
  const { data: employerJobs = [], isLoading: employerJobsLoading } =
    useGetJobsByEmployer(viewEmployerPhone ?? "");

  if (isLoading) {
    return (
      <div className="space-y-2">
        {["s1", "s2", "s3"].map((s) => (
          <Skeleton key={s} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl"
        data-ocid="jobs.favorites.empty_state"
      >
        <Star className="w-10 h-10 text-muted-foreground/40" />
        <p className="text-muted-foreground text-sm">
          No favorite employers yet.
        </p>
        <p className="text-xs text-muted-foreground">
          Use &ldquo;Search by City&rdquo; and tap the ★ star to mark employers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="jobs.favorites.section">
      <div className="space-y-2">
        {favorites.map((fav: Record<string, unknown>, idx: number) => (
          <div
            key={String(fav.id ?? idx)}
            className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-3"
            data-ocid={`jobs.favorite.item.${idx + 1}`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground font-mono text-sm">
                {String(fav.employerPhone ?? "—")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {String(fav.city ?? "—")}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs gap-1"
                onClick={() =>
                  setViewEmployerPhone(
                    viewEmployerPhone === String(fav.employerPhone ?? "")
                      ? null
                      : String(fav.employerPhone ?? ""),
                  )
                }
                data-ocid={`jobs.favorite.viewjobs_button.${idx + 1}`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                {viewEmployerPhone === String(fav.employerPhone ?? "")
                  ? "Hide Jobs"
                  : "View Jobs"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-xs text-destructive"
                onClick={async () => {
                  try {
                    await unmarkFavorite.mutateAsync({
                      employerPhone: String(fav.employerPhone ?? ""),
                      city: String(fav.city ?? ""),
                    });
                    toast.success("Removed from favorites");
                  } catch {
                    toast.error("Failed to remove");
                  }
                }}
                data-ocid={`jobs.favorite.remove_button.${idx + 1}`}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {viewEmployerPhone && (
        <div
          className="bg-muted/20 border border-border rounded-xl p-4 space-y-3"
          data-ocid="jobs.favorite.employer_jobs"
        >
          <h4 className="text-sm font-semibold text-foreground">
            Jobs by {viewEmployerPhone}
          </h4>
          {employerJobsLoading ? (
            <div className="space-y-2">
              {["s1", "s2"].map((s) => (
                <Skeleton key={s} className="h-12 w-full" />
              ))}
            </div>
          ) : employerJobs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No active jobs from this employer.
            </p>
          ) : (
            <div className="space-y-2">
              {employerJobs.map((job, idx2) => (
                <div
                  key={job.id}
                  className="bg-card border border-border rounded-lg p-3"
                  data-ocid={`jobs.employer.job.${idx2 + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{job.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {job.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location.address} · ₹
                    {job.salaryMin.toLocaleString("en-IN")} – ₹
                    {job.salaryMax.toLocaleString("en-IN")}/mo
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function JobsPage() {
  const { data: jobs = [], isLoading, isError, refetch } = useJobs();
  const postJobMutation = usePostJob();

  const [leadApprovals, setLeadApprovals] = useState<Record<string, boolean>>(
    {},
  );
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">(
    "all",
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationSearch, setLocationSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showLookingForWork, setShowLookingForWork] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    address: "",
  });
  const [additionalLocations, setAdditionalLocations] = useState<string[]>([]);
  const [newLocationInput, setNewLocationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addJobLocation = useAddJobLocation();

  const totalJobs = jobs.length;
  const openJobs = jobs.filter((j) => j.isOpen).length;
  const closedJobs = jobs.filter((j) => !j.isOpen).length;
  const totalLeads = jobs.reduce((sum, j) => sum + j.leads.length, 0);

  const filtered = useMemo(
    () =>
      jobs.filter((j) => {
        if (statusFilter === "open" && !j.isOpen) return false;
        if (statusFilter === "closed" && j.isOpen) return false;
        if (categoryFilter !== "all" && j.category !== categoryFilter)
          return false;
        if (
          locationSearch &&
          !j.location.address
            .toLowerCase()
            .includes(locationSearch.toLowerCase())
        )
          return false;
        if (dateFrom && Number(j.publishDate) < new Date(dateFrom).getTime())
          return false;
        if (dateTo && Number(j.publishDate) > new Date(dateTo).getTime())
          return false;
        return true;
      }),
    [jobs, statusFilter, categoryFilter, locationSearch, dateFrom, dateTo],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleSubmitJob() {
    if (!form.title || !form.category || !form.description) return;
    setIsSubmitting(true);
    try {
      const job = await postJobMutation.mutateAsync({
        posterId: "admin",
        title: form.title,
        category: form.category,
        description: form.description,
        salaryMin: Number.parseInt(form.salaryMin) || 0,
        salaryMax: Number.parseInt(form.salaryMax) || 0,
        location: {
          lat: 28.6139,
          lng: 77.209,
          address: form.address || form.location || "India",
        },
      });
      // Save additional locations
      if (additionalLocations.length > 0 && job && "id" in job) {
        const jobId = String(job.id);
        for (const city of additionalLocations) {
          try {
            await addJobLocation({ jobId, city, pincode: [] });
          } catch {
            // silently skip individual location failures
          }
        }
      }
      toast.success("Job posted successfully");
      setShowPostModal(false);
      setForm({
        title: "",
        category: "",
        description: "",
        salaryMin: "",
        salaryMax: "",
        location: "",
        address: "",
      });
      setAdditionalLocations([]);
      setNewLocationInput("");
    } catch {
      toast.error("Failed to post job");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleApproveLead(jobId: string, requesterId: string) {
    setLeadApprovals((prev) => ({
      ...prev,
      [`${jobId}_${requesterId}`]: true,
    }));
    if (selectedJob) {
      const lead = selectedJob.leads.find((l) => l.requesterId === requesterId);
      if (lead) lead.status = ContactRequestStatus.approved;
    }
  }

  function handleRejectLead(jobId: string, requesterId: string) {
    setLeadApprovals((prev) => ({
      ...prev,
      [`${jobId}_${requesterId}`]: false,
    }));
  }

  const enrichedLeads = (job: Job): ContactRequest[] =>
    job.leads.map((lead) => ({
      ...lead,
      status:
        leadApprovals[`${job.id}_${lead.requesterId}`] !== undefined
          ? leadApprovals[`${job.id}_${lead.requesterId}`]
            ? ContactRequestStatus.approved
            : ContactRequestStatus.declined
          : lead.status,
    }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Job Listings
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage job postings, leads, and applicants
          </p>
        </div>
        <Button
          onClick={() => setShowPostModal(true)}
          className="gap-2 shrink-0"
          data-ocid="post-job-btn"
        >
          <Plus className="w-4 h-4" /> Post Job (Admin)
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Jobs"
          value={totalJobs}
          color="text-foreground"
        />
        <StatCard label="Open Jobs" value={openJobs} color="text-primary" />
        <StatCard
          label="Closed Jobs"
          value={closedJobs}
          color="text-muted-foreground"
        />
        <StatCard
          label="Total Leads"
          value={totalLeads}
          color="text-[oklch(0.6_0.18_202)]"
        />
      </div>

      {/* Tabs: All Jobs / My Listings */}
      <Tabs defaultValue="all" data-ocid="jobs.tabs">
        <TabsList className="mb-4">
          <TabsTrigger value="all" data-ocid="jobs.tab.all">
            All Jobs
          </TabsTrigger>
          <TabsTrigger value="by-city" data-ocid="jobs.tab.city">
            Search by City
          </TabsTrigger>
          <TabsTrigger value="favorites" data-ocid="jobs.tab.favorites">
            Favorite Employers
          </TabsTrigger>
          <TabsTrigger value="my" data-ocid="jobs.tab.my">
            My Listings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3 mb-4">
            <div className="flex flex-wrap gap-3">
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v as "all" | "open" | "closed");
                  setPage(1);
                }}
              >
                <SelectTrigger
                  className="w-32 h-8 text-sm"
                  data-ocid="filter-status"
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={categoryFilter}
                onValueChange={(v) => {
                  setCategoryFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger
                  className="w-40 h-8 text-sm"
                  data-ocid="filter-category"
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {JOB_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Location..."
                  value={locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-8 h-8 text-sm w-40"
                  data-ocid="filter-location"
                />
              </div>

              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setPage(1);
                }}
                className="h-8 text-sm w-36"
                data-ocid="filter-date-from"
              />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setPage(1);
                }}
                className="h-8 text-sm w-36"
                data-ocid="filter-date-to"
              />

              {(statusFilter !== "all" ||
                categoryFilter !== "all" ||
                locationSearch ||
                dateFrom ||
                dateTo) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-muted-foreground"
                  onClick={() => {
                    setStatusFilter("all");
                    setCategoryFilter("all");
                    setLocationSearch("");
                    setDateFrom("");
                    setDateTo("");
                    setPage(1);
                  }}
                >
                  <X className="w-3.5 h-3.5" /> Clear
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Showing {paginated.length} of {filtered.length} listings (page{" "}
              {page} of {totalPages})
            </p>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {["s1", "s2", "s3", "s4", "s5"].map((s) => (
                  <Skeleton key={s} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <div
                className="flex flex-col items-center gap-3 py-16 text-center"
                data-ocid="jobs.error_state"
              >
                <Briefcase className="w-10 h-10 text-muted-foreground/40" />
                <p className="text-muted-foreground text-sm font-medium">
                  Unable to load listings. Please try again.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void refetch()}
                  data-ocid="jobs.retry_button"
                >
                  Retry
                </Button>
              </div>
            ) : paginated.length === 0 ? (
              <div
                className="flex flex-col items-center gap-3 py-16 text-center"
                data-ocid="jobs-empty-state"
              >
                <Briefcase className="w-10 h-10 text-muted-foreground/40" />
                <p className="text-muted-foreground text-sm">
                  No job listings found
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPostModal(true)}
                >
                  Post a Job
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-ocid="jobs-table">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr className="text-muted-foreground text-xs">
                      <th className="text-left py-3 px-4 font-medium">Title</th>
                      <th className="text-left py-3 px-3 font-medium">
                        Category
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Location
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Salary Range
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Posted By
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Published
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Expires
                      </th>
                      <th className="text-left py-3 px-3 font-medium">
                        Status
                      </th>
                      <th className="text-right py-3 px-3 font-medium">
                        Leads
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((job, idx) => {
                      const publishDate = new Date(Number(job.publishDate));
                      const endDate = new Date(Number(job.endDate));
                      const isExpired = endDate < new Date();
                      return (
                        <tr
                          key={job.id}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          data-ocid={`job-row-${idx + 1}`}
                        >
                          <td className="py-3 px-4">
                            <span className="font-medium text-foreground max-w-[160px] truncate block">
                              {job.title}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-muted-foreground text-xs">
                              {job.category}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[100px]">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">
                                {job.location.address}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-xs tabular-nums font-medium">
                              ₹{job.salaryMin.toLocaleString("en-IN")} – ₹
                              {job.salaryMax.toLocaleString("en-IN")}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-xs text-muted-foreground">
                              {job.posterId}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-xs text-muted-foreground">
                              {publishDate.toLocaleDateString("en-IN")}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`text-xs ${isExpired ? "text-destructive" : "text-muted-foreground"}`}
                            >
                              {endDate.toLocaleDateString("en-IN")}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            {job.isOpen ? (
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                Open
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-muted-foreground text-xs"
                              >
                                Closed
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className="tabular-nums font-semibold">
                              {job.leads.length}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 gap-1 text-xs"
                              onClick={() => setSelectedJob(job)}
                              data-ocid={`job-view-${idx + 1}`}
                            >
                              <Eye className="w-3.5 h-3.5" /> View
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  data-ocid="jobs.pagination_prev"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  data-ocid="jobs.pagination_next"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my">
          <MyJobListingsTab />
        </TabsContent>

        <TabsContent value="by-city">
          <JobCitySearchTab />
        </TabsContent>

        <TabsContent value="favorites">
          <FavoriteEmployersTab />
        </TabsContent>
      </Tabs>

      {/* Who's Looking for Work — real job listings */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors"
          onClick={() => setShowLookingForWork((p) => !p)}
          data-ocid="toggle-looking-for-work"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Who's Looking for Work</span>
            <Badge variant="outline" className="text-xs">
              {jobs.length}
            </Badge>
          </div>
          {showLookingForWork ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showLookingForWork && (
          <div className="border-t border-border">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4">
                {["s1", "s2", "s3", "s4", "s5"].map((s) => (
                  <Skeleton key={s} className="h-24 rounded-lg" />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div
                className="flex flex-col items-center gap-2 py-10 text-center"
                data-ocid="looking-for-work.empty_state"
              >
                <Briefcase className="w-8 h-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No jobs available
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4">
                {jobs.slice(0, 10).map((job, idx) => (
                  <div
                    key={job.id}
                    className="bg-background border border-border rounded-lg p-3 space-y-1.5"
                    data-ocid={`looking-for-work.item.${idx + 1}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                        {job.title[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {job.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₹{job.salaryMin.toLocaleString("en-IN")}–₹
                          {job.salaryMax.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs w-full justify-center"
                    >
                      {job.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{job.location.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Job Detail Sheet */}
      <Sheet open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
        >
          {selectedJob && (
            <>
              <SheetHeader className="pb-4 border-b border-border">
                <SheetTitle className="text-lg font-bold font-display">
                  {selectedJob.title}
                </SheetTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {selectedJob.category}
                  </Badge>
                  {selectedJob.isOpen ? (
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                      Open
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-muted-foreground text-xs"
                    >
                      Closed
                    </Badge>
                  )}
                </div>
              </SheetHeader>
              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="leads" className="flex-1">
                    Leads ({selectedJob.leads.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Description
                    </p>
                    <p className="text-sm leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Salary Range
                      </p>
                      <p className="text-sm font-semibold tabular-nums">
                        ₹{selectedJob.salaryMin.toLocaleString("en-IN")} – ₹
                        {selectedJob.salaryMax.toLocaleString("en-IN")}
                        <span className="font-normal text-muted-foreground">
                          /mo
                        </span>
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Posted By
                      </p>
                      <p className="text-sm font-medium">
                        {selectedJob.posterId}
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Location
                    </p>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-sm">{selectedJob.location.address}</p>
                    </div>
                  </div>
                  <JobLocationSelector jobId={selectedJob.id} />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Published
                      </p>
                      <p className="text-sm">
                        {new Date(
                          Number(selectedJob.publishDate),
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Expires
                      </p>
                      <p
                        className={`text-sm ${new Date(Number(selectedJob.endDate)) < new Date() ? "text-destructive" : ""}`}
                      >
                        {new Date(
                          Number(selectedJob.endDate),
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="leads" className="mt-4">
                  <LeadsTable
                    leads={enrichedLeads(selectedJob)}
                    onApprove={(u) => handleApproveLead(selectedJob.id, u)}
                    onReject={(u) => handleRejectLead(selectedJob.id, u)}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Post Job Modal */}
      <Dialog open={showPostModal} onOpenChange={setShowPostModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Post a Job</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Job Title *</Label>
              <Input
                placeholder="e.g. Senior Sales Executive"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="job-form-title"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger data-ocid="job-form-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Description *</Label>
              <Textarea
                placeholder="Describe the role, requirements, and benefits..."
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                data-ocid="job-form-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Salary Min (₹)</Label>
                <Input
                  type="number"
                  placeholder="20000"
                  value={form.salaryMin}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, salaryMin: e.target.value }))
                  }
                  data-ocid="job-form-salary-min"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Salary Max (₹)</Label>
                <Input
                  type="number"
                  placeholder="50000"
                  value={form.salaryMax}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, salaryMax: e.target.value }))
                  }
                  data-ocid="job-form-salary-max"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input
                placeholder="City or area"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                data-ocid="job-form-location"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Full Address</Label>
              <Input
                placeholder="Full address"
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                data-ocid="job-form-address"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Additional Job Locations</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add city e.g. Mumbai"
                  value={newLocationInput}
                  onChange={(e) => setNewLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newLocationInput.trim()) {
                      setAdditionalLocations((prev) => [
                        ...prev,
                        newLocationInput.trim(),
                      ]);
                      setNewLocationInput("");
                    }
                  }}
                  data-ocid="job-form-additional-location-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (newLocationInput.trim()) {
                      setAdditionalLocations((prev) => [
                        ...prev,
                        newLocationInput.trim(),
                      ]);
                      setNewLocationInput("");
                    }
                  }}
                  data-ocid="job-form-add-location-btn"
                >
                  Add
                </Button>
              </div>
              {additionalLocations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {additionalLocations.map((loc, idx) => (
                    <div
                      key={loc}
                      className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs"
                      data-ocid={`job-form-location-chip.${idx + 1}`}
                    >
                      <MapPin className="w-3 h-3" />
                      {loc}
                      <button
                        type="button"
                        onClick={() =>
                          setAdditionalLocations((prev) =>
                            prev.filter((_, i) => i !== idx),
                          )
                        }
                        className="ml-1 hover:text-destructive"
                        aria-label={`Remove ${loc}`}
                        data-ocid={`job-form-remove-location.${idx + 1}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground">
              📅 Duration: auto-set to <strong>1 week</strong> from today
              (expires{" "}
              {new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-IN")})
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPostModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmitJob}
                disabled={
                  isSubmitting ||
                  !form.title ||
                  !form.category ||
                  !form.description
                }
                data-ocid="job-form-submit"
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
