import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Briefcase,
  Clock,
  Edit2,
  Filter,
  GraduationCap,
  IndianRupee,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Settings,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAdhocJobCategories,
  useAdhocJobStats,
  useAdhocJobs,
  useCreateAdhocJob,
  useCreateAdhocJobAdmin,
  useDeleteAdhocJobAdmin,
  useListAdhocJobsAdmin,
  useUpdateAdhocJobStatusAdmin,
} from "../hooks/useBackend";
import { JobType } from "../types";
import type { Job } from "../types";

// ─── Category color map ───────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Delivery: "bg-blue-500/10 text-blue-600",
  Construction: "bg-orange-500/10 text-orange-600",
  Cleaning: "bg-cyan-500/10 text-cyan-600",
  Agriculture: "bg-green-600/10 text-green-700",
  Security: "bg-slate-500/10 text-slate-600",
  Driving: "bg-indigo-500/10 text-indigo-600",
  Education: "bg-violet-500/10 text-violet-600",
  Healthcare: "bg-rose-500/10 text-rose-600",
  Cooking: "bg-amber-500/10 text-amber-600",
  IT: "bg-teal-500/10 text-teal-600",
};
function getCategoryColor(cat: string): string {
  for (const [k, v] of Object.entries(CATEGORY_COLORS)) {
    if (cat.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return "bg-primary/10 text-primary";
}

// ─── Job categories (matches backend ADHOC_JOB_CATEGORIES) ──────────────────
const JOB_CATEGORIES = [
  "Daily Wages",
  "Construction",
  "Cleaning",
  "Moving",
  "Farming",
  "Security",
  "Event Helper",
  "Driver",
  "Domestic Help",
  "Plumbing",
  "Electrical",
  "Painting",
  "Carpentry",
  "Gardening",
  "Cooking",
  "Catering",
  "Loading/Unloading",
  "Delivery Helper",
  "Watchman",
  "Sanitation",
  "Tailoring",
  "Beauty/Salon",
  "Babysitting",
  "Elder Care",
  "Animal Care",
  "Delivery",
  "Packing",
  "Assembly",
  "Photography",
  "Other",
];

// ─── Education levels ──────────────────────────────────────────────────────────
const EDUCATION_LEVELS = [
  "No requirement",
  "10th Pass",
  "12th Pass",
  "Graduate",
  "Post Graduate",
];

// ─── Job type labels ───────────────────────────────────────────────────────────
const JOB_TYPE_LABELS: Record<string, string> = {
  [JobType.oneoff]: "One-off",
  [JobType.adhoc_daily]: "Daily",
  [JobType.adhoc_weekly]: "Weekly",
  [JobType.permanent]: "Permanent",
};

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(expiresAt: bigint | undefined): string | null {
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);
  if (!expiresAt) return null;
  const diff = Number(expiresAt) / 1_000_000 - Date.now();
  if (diff <= 0) return "Expired";
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  if (h < 2) return `${h}h ${m}m remaining`;
  return null;
}

// ─── Post Job Modal ───────────────────────────────────────────────────────────
const STEPS = [
  "Title",
  "Category",
  "Price & Type",
  "Education",
  "Description",
  "Location",
  "Contact",
];

interface PostJobModalProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
}

function PostJobModal({ open, onClose, categories }: PostJobModalProps) {
  const create = useCreateAdhocJob();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    jobType: JobType.adhoc_daily,
    education: "No requirement",
    description: "",
    location: "",
    phone: "",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function canNext(): boolean {
    if (step === 0) return form.title.trim().length > 1;
    if (step === 1) return !!form.category;
    if (step === 2) return Number(form.price) > 0;
    if (step === 6) return form.phone.trim().length >= 10;
    return true;
  }

  async function handleSubmit() {
    try {
      await create.mutateAsync({
        title: form.title.trim(),
        category: form.category,
        pricePerDay: Number(form.price),
        educationLevel: form.education,
        location: { address: form.location.trim(), lat: 0, lng: 0 },
        phone: form.phone.trim(),
        description: form.description.trim(),
        posterId: "admin",
        jobType: form.jobType,
      });
      toast.success("Job posted successfully!");
      onClose();
      setStep(0);
      setForm({
        title: "",
        category: "",
        price: "",
        jobType: JobType.adhoc_daily,
        education: "No requirement",
        description: "",
        location: "",
        phone: "",
      });
    } catch (err) {
      toast.error(`Failed to post job: ${String(err)}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-md"
        data-ocid="post-job.dialog"
        aria-describedby="post-job-desc"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Post a Daily Job
          </DialogTitle>
          <p id="post-job-desc" className="sr-only">
            Post a new daily job in {STEPS.length} steps
          </p>
        </DialogHeader>

        {/* Progress */}
        <div className="flex gap-1">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={[
                "h-1 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-muted",
              ].join(" ")}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>

        {/* Step content */}
        <div className="min-h-[120px]">
          {step === 0 && (
            <div className="space-y-2">
              <Label htmlFor="pj-title">Job Title</Label>
              <Input
                id="pj-title"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Loading helper needed"
                data-ocid="post-job.title.input"
                autoFocus
              />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => set("category", v)}
              >
                <SelectTrigger data-ocid="post-job.category.select">
                  <SelectValue placeholder="Select category…" />
                </SelectTrigger>
                <SelectContent className="max-h-56 overflow-y-auto">
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pj-price">Price per day (₹)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="pj-price"
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    className="pl-9"
                    placeholder="500"
                    data-ocid="post-job.price.input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Job Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      [JobType.oneoff, "One-off"],
                      [JobType.adhoc_daily, "Daily"],
                      [JobType.adhoc_weekly, "Weekly"],
                      [JobType.permanent, "Permanent"],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      data-ocid={`post-job.type-${val}.toggle`}
                      onClick={() => set("jobType", val)}
                      className={[
                        "py-2 px-3 rounded-md border text-sm transition-colors",
                        form.jobType === val
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-input text-muted-foreground hover:border-primary/50",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-2">
              <Label>Education Requirement</Label>
              <Select
                value={form.education}
                onValueChange={(v) => set("education", v)}
              >
                <SelectTrigger data-ocid="post-job.education.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-2">
              <Label htmlFor="pj-desc">Brief Description</Label>
              <Textarea
                id="pj-desc"
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe duties, timings, requirements…"
                data-ocid="post-job.description.textarea"
              />
              <p className="text-xs text-muted-foreground">
                AI will expand your description automatically.
              </p>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-2">
              <Label htmlFor="pj-loc">Location / Area</Label>
              <Input
                id="pj-loc"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="e.g. Andheri West, Mumbai"
                data-ocid="post-job.location.input"
              />
            </div>
          )}
          {step === 6 && (
            <div className="space-y-2">
              <Label htmlFor="pj-phone">Contact Phone</Label>
              <Input
                id="pj-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+91 98765 43210"
                data-ocid="post-job.phone.input"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
            data-ocid="post-job.back.button"
          >
            {step === 0 ? "Cancel" : "Back"}
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              size="sm"
              disabled={!canNext()}
              onClick={() => setStep((s) => s + 1)}
              data-ocid="post-job.next.button"
            >
              Next
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={!canNext() || create.isPending}
              onClick={handleSubmit}
              data-ocid="post-job.submit_button"
            >
              {create.isPending ? "Posting…" : "Post Job"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Apply Modal ───────────────────────────────────────────────────────────────
interface ApplyModalProps {
  job: Job | null;
  onClose: () => void;
}

function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  function handleApply() {
    if (!name.trim() || phone.trim().length < 10) {
      toast.error("Please enter your name and a valid phone number.");
      return;
    }
    setSubmitted(true);
    toast.success("Application sent to employer!");
  }

  return (
    <Dialog open={!!job} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="apply-job.dialog">
        <DialogHeader>
          <DialogTitle>Apply: {job.title}</DialogTitle>
        </DialogHeader>
        {submitted ? (
          <div
            className="text-center py-6 space-y-2"
            data-ocid="apply-job.success_state"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <p className="font-medium">Application Submitted!</p>
            <p className="text-sm text-muted-foreground">
              The employer will contact you at{" "}
              <span className="font-medium">{phone}</span>
            </p>
            {job.contactPhone && (
              <p className="text-sm text-muted-foreground">
                Employer:{" "}
                <a
                  href={`tel:${job.contactPhone}`}
                  className="text-primary font-medium"
                >
                  {job.contactPhone}
                </a>
              </p>
            )}
            <Button
              size="sm"
              onClick={onClose}
              data-ocid="apply-job.close_button"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                ₹{job.pricePerDay ?? 0}/day ·{" "}
                {JOB_TYPE_LABELS[job.jobType] ?? "Daily"}
              </p>
              <p className="text-sm text-muted-foreground">
                {job?.location?.address ?? ""}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apply-name">Your Name</Label>
              <Input
                id="apply-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                data-ocid="apply-job.name.input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apply-phone">Your Phone</Label>
              <Input
                id="apply-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                data-ocid="apply-job.phone.input"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                data-ocid="apply-job.cancel_button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                data-ocid="apply-job.submit_button"
              >
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Job Card ──────────────────────────────────────────────────────────────────
interface JobCardProps {
  job: Job;
  index: number;
  onApply: (job: Job) => void;
}

function JobCard({ job, index, onApply }: JobCardProps) {
  const countdown = useCountdown(job.expiresAt);
  const postedAgo = useMemo(() => {
    const diff = Date.now() - Number(job.publishDate) / 1_000_000;
    const h = Math.floor(diff / 3_600_000);
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }, [job.publishDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      data-ocid={`adhoc-job.item.${index + 1}`}
    >
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <CardContent className="pt-4 pb-3 flex flex-col gap-3 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 flex-1">
              {job.title}
            </h3>
            <Badge
              className={`text-[10px] px-1.5 py-0.5 shrink-0 border-0 ${getCategoryColor(job.category)}`}
            >
              {job.category}
            </Badge>
          </div>

          {/* Price & Type */}
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 font-bold text-primary">
              <IndianRupee className="w-3.5 h-3.5" />
              {job.pricePerDay ?? 0}
              <span className="text-muted-foreground font-normal">
                /{JOB_TYPE_LABELS[job.jobType] === "One-off" ? "job" : "day"}
              </span>
            </span>
            <Badge variant="outline" className="text-[10px]">
              {JOB_TYPE_LABELS[job.jobType] ?? "Daily"}
            </Badge>
          </div>

          {/* Meta */}
          <div className="space-y-1.5">
            {job.educationLevel && job.educationLevel !== "No requirement" && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                Requires: {job.educationLevel}
              </p>
            )}
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {job?.location?.address ?? "Location not specified"}
              </span>
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Posted {postedAgo}
            </p>
          </div>

          {/* Expiry countdown */}
          {countdown && (
            <p
              className={`text-xs font-medium flex items-center gap-1 ${countdown === "Expired" ? "text-destructive" : "text-amber-600"}`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {countdown === "Expired" ? "Expired" : `Expires in ${countdown}`}
            </p>
          )}

          {/* Description snippet */}
          {job.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {job.description}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto pt-2 flex items-center justify-between gap-2">
            {job.contactPhone && (
              <a
                href={`tel:${job.contactPhone}`}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Phone className="w-3 h-3" />
                {job.contactPhone}
              </a>
            )}
            <Button
              size="sm"
              className="ml-auto"
              disabled={!job.isOpen || countdown === "Expired"}
              onClick={() => onApply(job)}
              data-ocid={`adhoc-job.apply_button.${index + 1}`}
            >
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Admin categories ───────────────────────────────────────────────────────
const ADHOC_ADMIN_CATEGORIES = [
  "Daily Wages",
  "Construction",
  "Cleaning",
  "Moving",
  "Farming",
  "Security",
  "Event Helper",
  "Delivery",
  "Cooking",
  "Gardening",
  "Painting",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Driving",
  "Teaching",
  "Healthcare",
  "IT Support",
  "Customer Service",
  "Sales",
  "Agriculture",
  "Loading / Unloading",
  "Factory / Production",
  "Tailoring",
  "Data Entry",
  "Others",
];

const JOB_STATUS_OPTIONS = ["open", "in-progress", "completed", "cancelled"];

// ─── Admin Job Form Modal ─────────────────────────────────────────────────────
interface AdminJobFormProps {
  open: boolean;
  initial?: Record<string, unknown> | null;
  onClose: () => void;
  onRefresh: () => void;
}

function AdminJobFormModal({
  open,
  initial,
  onClose,
  onRefresh,
}: AdminJobFormProps) {
  const isEdit = !!initial;
  const createAdmin = useCreateAdhocJobAdmin();
  const [title, setTitle] = useState(String(initial?.title ?? ""));
  const [category, setCategory] = useState(
    String(initial?.category ?? ADHOC_ADMIN_CATEGORIES[0]),
  );
  const [location, setLocation] = useState(
    String((initial?.location as Record<string, unknown>)?.address ?? ""),
  );
  const [pricePerDay, setPricePerDay] = useState(
    String(initial?.pricePerDay ?? initial?.budget ?? "0"),
  );
  const [description, setDescription] = useState(
    String(initial?.description ?? ""),
  );

  // Reset form when modal opens with new data
  useEffect(() => {
    if (open) {
      setTitle(String(initial?.title ?? ""));
      setCategory(String(initial?.category ?? ADHOC_ADMIN_CATEGORIES[0]));
      setLocation(
        String((initial?.location as Record<string, unknown>)?.address ?? ""),
      );
      setPricePerDay(String(initial?.pricePerDay ?? initial?.budget ?? "0"));
      setDescription(String(initial?.description ?? ""));
    }
  }, [open, initial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Job title is required");
      return;
    }
    try {
      await createAdmin.mutateAsync({
        title: title.trim(),
        category,
        location,
        budget: Number(pricePerDay),
        description: description.trim(),
      });
      toast.success(isEdit ? "Job updated" : "Job posted successfully!");
      onRefresh();
      onClose();
    } catch (err) {
      toast.error(
        `Failed to save job: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md" data-ocid="admin-job.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            {isEdit ? "Edit Job" : "Add Daily Job"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="aj-title">Job Title *</Label>
            <Input
              id="aj-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Loading helper needed"
              required
              data-ocid="admin-job.title.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-ocid="admin-job.category.select">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="max-h-56 overflow-y-auto">
                {ADHOC_ADMIN_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="aj-price">Pay Rate (₹/day)</Label>
              <Input
                id="aj-price"
                type="number"
                min={0}
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
                placeholder="500"
                data-ocid="admin-job.price.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="aj-loc">Location</Label>
              <Input
                id="aj-loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mumbai"
                data-ocid="admin-job.location.input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="aj-desc">Description</Label>
            <Textarea
              id="aj-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe duties, timings, requirements…"
              data-ocid="admin-job.description.textarea"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              data-ocid="admin-job.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createAdmin.isPending}
              data-ocid="admin-job.submit_button"
            >
              {createAdmin.isPending
                ? "Saving…"
                : isEdit
                  ? "Save Changes"
                  : "Post Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
const ADMIN_PAGE_SIZE = 10;

function AdminPanel() {
  const {
    data: jobs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useListAdhocJobsAdmin();
  const updateStatus = useUpdateAdhocJobStatusAdmin();
  const deleteJob = useDeleteAdhocJobAdmin();
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editJob, setEditJob] = useState<Record<string, unknown> | null>(null);

  const totalPages = Math.max(1, Math.ceil(jobs.length / ADMIN_PAGE_SIZE));
  const paged = jobs.slice(
    (page - 1) * ADMIN_PAGE_SIZE,
    page * ADMIN_PAGE_SIZE,
  );

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Status updated");
      refetch();
    } catch (err) {
      toast.error(
        `Failed to update status: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this job? This cannot be undone.")) return;
    try {
      await deleteJob.mutateAsync(id);
      toast.success("Job deleted");
      refetch();
    } catch (err) {
      toast.error(
        `Failed to delete: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return (
    <div className="space-y-4 p-6" data-ocid="adhoc-jobs.admin.panel">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Daily Jobs Admin</h2>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading…" : `${jobs.length} total jobs`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            data-ocid="adhoc-jobs.admin.refresh.button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditJob(null);
              setFormOpen(true);
            }}
            data-ocid="adhoc-jobs.admin.add.primary_button"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Job
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2" data-ocid="adhoc-jobs.admin.loading_state">
          {Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div
          className="flex flex-col items-center py-16 gap-3"
          data-ocid="adhoc-jobs.admin.error_state"
        >
          <AlertCircle className="w-10 h-10 text-destructive/50" />
          <p className="text-sm font-medium text-destructive">
            Failed to load daily jobs
          </p>
          <p className="text-xs text-muted-foreground max-w-xs text-center">
            {error instanceof Error
              ? error.message
              : "Could not connect to backend. Ensure the canister is deployed and try again."}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            data-ocid="adhoc-jobs.admin.retry.button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Retry
          </Button>
        </div>
      ) : jobs.length === 0 ? (
        <div
          className="flex flex-col items-center py-16 gap-3"
          data-ocid="adhoc-jobs.admin.empty_state"
        >
          <Briefcase className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No daily/adhoc jobs found. Create the first one using the form
            below.
          </p>
          <Button
            size="sm"
            onClick={() => {
              setEditJob(null);
              setFormOpen(true);
            }}
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Job
          </Button>
        </div>
      ) : (
        <>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted/60 border-b border-border">
                <tr>
                  {[
                    "Job Title",
                    "Category",
                    "Location",
                    "Pay Rate",
                    "Posted By",
                    "Status",
                    "Posted Date",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((job, idx) => (
                  <tr
                    key={job.id}
                    className="border-b border-border/40 hover:bg-muted/20"
                    data-ocid={`adhoc-jobs.admin.item.${(page - 1) * ADMIN_PAGE_SIZE + idx + 1}`}
                  >
                    <td className="py-2 px-3 font-medium max-w-[160px] truncate">
                      {job.title}
                    </td>
                    <td className="py-2 px-3">
                      <Badge
                        className={`text-[10px] border-0 ${getCategoryColor(job.category)}`}
                      >
                        {job.category}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-muted-foreground max-w-[120px] truncate">
                      {job.location?.address ?? "—"}
                    </td>
                    <td className="py-2 px-3 font-medium">
                      ₹{job.pricePerDay ?? 0}/day
                    </td>
                    <td className="py-2 px-3 text-muted-foreground max-w-[100px] truncate">
                      {job.posterId ?? "admin"}
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={job.isOpen ? "open" : "closed"}
                        onChange={(e) =>
                          handleStatusChange(job.id, e.target.value)
                        }
                        className="text-xs h-7 px-1.5 rounded border border-border bg-muted/30 text-foreground"
                        data-ocid={`adhoc-jobs.admin.status.${(page - 1) * ADMIN_PAGE_SIZE + idx + 1}`}
                      >
                        {JOB_STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-3 text-muted-foreground whitespace-nowrap">
                      {job.publishDate
                        ? new Date(
                            Number(job.publishDate) / 1_000_000,
                          ).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => {
                            setEditJob(
                              job as unknown as Record<string, unknown>,
                            );
                            setFormOpen(true);
                          }}
                          data-ocid={`adhoc-jobs.admin.edit_button.${(page - 1) * ADMIN_PAGE_SIZE + idx + 1}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(job.id)}
                          data-ocid={`adhoc-jobs.admin.delete_button.${(page - 1) * ADMIN_PAGE_SIZE + idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span>
                Page {page} of {totalPages} &middot; {jobs.length} jobs
              </span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  data-ocid="adhoc-jobs.admin.pagination_prev"
                >
                  Prev
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  data-ocid="adhoc-jobs.admin.pagination_next"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <AdminJobFormModal
        open={formOpen}
        initial={editJob}
        onClose={() => {
          setFormOpen(false);
          setEditJob(null);
        }}
        onRefresh={() => refetch()}
      />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AdhocJobsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
  const [educationFilter, setEducationFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState(Date.now());
  const [showFilters, setShowFilters] = useState(false);
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  const { data: backendCategories = [], isLoading: catsLoading } =
    useAdhocJobCategories();
  // Use backend categories when available; fall back to hardcoded list so the
  // dropdown always shows options even before the backend returns data.
  const categories =
    backendCategories.length > 0 ? backendCategories : JOB_CATEGORIES;
  const { data: stats } = useAdhocJobStats();
  const {
    data: jobs = [],
    isLoading: jobsLoading,
    refetch,
    dataUpdatedAt,
  } = useAdhocJobs(
    categoryFilter || undefined,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined,
    locationFilter || undefined,
  );

  // Update "last refreshed" when data updates
  useEffect(() => {
    if (dataUpdatedAt) setLastRefreshed(dataUpdatedAt);
  }, [dataUpdatedAt]);

  // Human-readable time since last refresh
  const [, tick] = useState(0);
  useEffect(() => {
    refreshTimerRef.current = setInterval(() => tick((n) => n + 1), 30_000);
    return () => clearInterval(refreshTimerRef.current);
  }, []);
  const refreshedAgo = useMemo(() => {
    const diff = Date.now() - lastRefreshed;
    const m = Math.floor(diff / 60_000);
    if (m < 1) return "just now";
    return `${m}m ago`;
  }, [lastRefreshed /* tick dep via state */]);

  // Client-side additional filtering
  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (jobTypeFilter !== "all" && j.jobType !== jobTypeFilter) return false;
      if (
        educationFilter !== "all" &&
        (j.educationLevel ?? "No requirement") !== educationFilter
      )
        return false;
      return true;
    });
  }, [jobs, jobTypeFilter, educationFilter]);

  const clearFilters = useCallback(() => {
    setCategoryFilter("");
    setMinPrice("");
    setMaxPrice("");
    setJobTypeFilter("all");
    setEducationFilter("all");
    setLocationFilter("");
  }, []);

  const hasFilters =
    !!categoryFilter ||
    !!minPrice ||
    !!maxPrice ||
    jobTypeFilter !== "all" ||
    educationFilter !== "all" ||
    !!locationFilter;

  // Stats derived
  const totalActive = stats ? Number(stats.totalActive) : filtered.length;
  const popularCategory =
    stats && stats.categoryBreakdown.length > 0
      ? stats.categoryBreakdown.reduce((a, b) => (a[1] > b[1] ? a : b))[0]
      : null;
  const avgPrice =
    jobs.length > 0
      ? Math.round(
          jobs.reduce((s, j) => s + (j.pricePerDay ?? 0), 0) / jobs.length,
        )
      : 0;

  return (
    <div
      className="flex flex-col gap-0 max-w-7xl mx-auto"
      data-ocid="adhoc-jobs.page"
    >
      <Tabs defaultValue="browse" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 pt-6 pb-3">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">
              Daily Jobs
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Updated today ·{" "}
              <span className="text-foreground font-medium">{totalActive}</span>{" "}
              jobs available now
            </p>
          </div>
          <TabsList data-ocid="adhoc-jobs.view.tab">
            <TabsTrigger value="browse">
              <Briefcase className="w-3.5 h-3.5 mr-1.5" />
              Browse
            </TabsTrigger>
            <TabsTrigger value="admin">
              <Settings className="w-3.5 h-3.5 mr-1.5" />
              Admin
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="browse" className="mt-0">
          <div className="flex flex-col gap-6 px-6 pb-6">
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Refreshed {refreshedAgo}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                data-ocid="adhoc-jobs.refresh.button"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Refresh
              </Button>
              <Button
                size="sm"
                onClick={() => setPostModalOpen(true)}
                data-ocid="adhoc-jobs.post_job.primary_button"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Post a Job
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Briefcase className="w-4 h-4 text-primary" />,
                  label: "Total Active Today",
                  value: jobsLoading ? "\u2014" : String(totalActive),
                  ocid: "adhoc-jobs.stat-total.card",
                },
                {
                  icon: <TrendingUp className="w-4 h-4 text-amber-500" />,
                  label: "Most Popular Category",
                  value: jobsLoading ? "\u2014" : (popularCategory ?? "\u2014"),
                  ocid: "adhoc-jobs.stat-popular.card",
                },
                {
                  icon: <IndianRupee className="w-4 h-4 text-green-600" />,
                  label: "Avg. Price Today",
                  value: jobsLoading
                    ? "\u2014"
                    : avgPrice > 0
                      ? `\u20b9${avgPrice}`
                      : "\u2014",
                  ocid: "adhoc-jobs.stat-avg.card",
                },
              ].map((s) => (
                <Card key={s.label} data-ocid={s.ocid}>
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        {s.icon}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {s.label}
                        </p>
                        <p className="text-lg font-bold leading-tight">
                          {s.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters((v) => !v)}
                data-ocid="adhoc-jobs.filters.toggle"
              >
                <Filter className="w-3.5 h-3.5 mr-1.5" />
                Filters
                {hasFilters && (
                  <span className="ml-1.5 w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold">
                    !
                  </span>
                )}
              </Button>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  data-ocid="adhoc-jobs.clear-filters.button"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Clear
                </Button>
              )}
              <p className="ml-auto text-xs text-muted-foreground">
                {filtered.length} results
              </p>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  key="filters"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Card>
                    <CardHeader className="pb-3 pt-4">
                      <CardTitle className="text-sm">Filter Jobs</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Category</Label>
                          <Select
                            value={categoryFilter || "all"}
                            onValueChange={(v) =>
                              setCategoryFilter(v === "all" ? "" : v)
                            }
                          >
                            <SelectTrigger
                              className="h-8 text-xs"
                              data-ocid="adhoc-jobs.filter-category.select"
                            >
                              <SelectValue placeholder="All categories" />
                            </SelectTrigger>
                            <SelectContent className="max-h-56 overflow-y-auto">
                              <SelectItem value="all">
                                All categories
                              </SelectItem>
                              {catsLoading ? (
                                <SelectItem value="loading" disabled>
                                  Loading\u2026
                                </SelectItem>
                              ) : (
                                categories.map((c) => (
                                  <SelectItem key={c} value={c}>
                                    {c}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Job Type</Label>
                          <Select
                            value={jobTypeFilter}
                            onValueChange={setJobTypeFilter}
                          >
                            <SelectTrigger
                              className="h-8 text-xs"
                              data-ocid="adhoc-jobs.filter-type.select"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All types</SelectItem>
                              <SelectItem value={JobType.oneoff}>
                                One-off
                              </SelectItem>
                              <SelectItem value={JobType.adhoc_daily}>
                                Daily
                              </SelectItem>
                              <SelectItem value={JobType.adhoc_weekly}>
                                Weekly
                              </SelectItem>
                              <SelectItem value={JobType.permanent}>
                                Permanent
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Education</Label>
                          <Select
                            value={educationFilter}
                            onValueChange={setEducationFilter}
                          >
                            <SelectTrigger
                              className="h-8 text-xs"
                              data-ocid="adhoc-jobs.filter-education.select"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Any education</SelectItem>
                              {EDUCATION_LEVELS.map((l) => (
                                <SelectItem key={l} value={l}>
                                  {l}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Min Price (\u20b9)</Label>
                          <Input
                            type="number"
                            min={0}
                            className="h-8 text-xs"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="0"
                            data-ocid="adhoc-jobs.filter-min-price.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Max Price (\u20b9)</Label>
                          <Input
                            type="number"
                            min={0}
                            className="h-8 text-xs"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="No limit"
                            data-ocid="adhoc-jobs.filter-max-price.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">
                            Location{" "}
                            <span className="ml-1 text-muted-foreground">
                              (city / area)
                            </span>
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                            <Input
                              className="h-8 text-xs pl-8"
                              value={locationFilter}
                              onChange={(e) =>
                                setLocationFilter(e.target.value)
                              }
                              placeholder="e.g. Mumbai"
                              data-ocid="adhoc-jobs.filter-location.input"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {jobsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map(
                  (key, i) => (
                    <Card
                      key={key}
                      data-ocid={`adhoc-jobs.loading_state.${i + 1}`}
                    >
                      <CardContent className="pt-4 space-y-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-8 w-full mt-2" />
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 text-center gap-3"
                data-ocid="adhoc-jobs.empty_state"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold">No jobs found</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {hasFilters
                    ? "Try adjusting your filters or clear them to see all jobs."
                    : "No daily jobs posted yet. Be the first to post one!"}
                </p>
                {hasFilters ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    data-ocid="adhoc-jobs.empty-clear-filters.button"
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setPostModalOpen(true)}
                    data-ocid="adhoc-jobs.empty-post.primary_button"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Post a Job
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((job, i) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    index={i}
                    onApply={setApplyJob}
                  />
                ))}
              </div>
            )}

            <PostJobModal
              open={postModalOpen}
              onClose={() => setPostModalOpen(false)}
              categories={categories}
            />
            <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
          </div>
        </TabsContent>

        <TabsContent value="admin" className="mt-0">
          <AdminPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
