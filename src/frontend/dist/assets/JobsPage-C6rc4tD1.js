import { _ as useBackendActor, r as reactExports, a1 as useJobs, av as usePostJob, j as jsxRuntimeExports, p as ue, aw as ContactRequestStatus, ax as useMyJobListings, ay as useGetJobCitiesAvailable, az as useMarkEmployerFavorite, aA as useUnmarkEmployerFavorite, aB as useGetFavoriteEmployers, aC as useSearchJobsByCity, aD as useGetJobsByEmployer } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-g1LGwGv2.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { X } from "./x-Chksmd6i.js";
import { B as Briefcase } from "./briefcase-CIHVnHgq.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { C as ChevronUp } from "./chevron-up-BzRcvKHL.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { S as Star } from "./star-DbleSGPY.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./check-CO9wi49t.js";
import "./createLucideIcon-BGWdtUCJ.js";
function useAddJobLocation() {
  const { actor } = useBackendActor();
  return reactExports.useCallback(
    async (loc) => {
      if (!actor) throw new Error("Not connected");
      const fn = actor.addJobLocation;
      if (!fn) throw new Error("addJobLocation not available on backend");
      const result = await fn.call(
        actor,
        loc.jobId,
        loc.city,
        loc.pincode ?? []
      );
      return result;
    },
    [actor]
  );
}
function useGetJobLocations(jobId) {
  const { actor } = useBackendActor();
  const [locations, setLocations] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!actor || !jobId) {
      setLocations([]);
      return;
    }
    let cancelled = false;
    async function fetchLocations() {
      setLoading(true);
      setError(null);
      try {
        const fn = actor.getJobLocations;
        if (!fn) {
          setLocations([]);
          return;
        }
        const result = await fn.call(actor, jobId);
        if (cancelled) return;
        if (Array.isArray(result)) {
          const mapped = result.map(
            (item) => ({
              id: String(item.id ?? ""),
              jobId: String(item.jobId ?? ""),
              city: String(item.city ?? ""),
              pincode: Array.isArray(item.pincode) ? item.pincode.map((p) => String(p)) : [],
              createdAt: typeof item.createdAt === "bigint" ? item.createdAt : BigInt(0)
            })
          );
          setLocations(mapped);
        } else {
          setLocations([]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setLocations([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchLocations();
    return () => {
      cancelled = true;
    };
  }, [actor, jobId]);
  return { locations, loading, error };
}
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
  "Web & Mobile Dev"
].sort((a, b) => a.localeCompare(b));
const PAGE_SIZE = 20;
function StatCard({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-1 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold font-display ${color}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
function LeadsTable({
  leads,
  onApprove,
  onReject
}) {
  if (!leads.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground text-sm", children: "No leads yet" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 font-medium", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/50 hover:bg-muted/30 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-3 font-medium", children: lead.requesterName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-3 text-muted-foreground font-mono text-xs", children: lead.requesterPhone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-3 text-muted-foreground text-xs whitespace-nowrap", children: new Date(Number(lead.requestedAt)).toLocaleDateString("en-IN") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-3", children: lead.status === ContactRequestStatus.approved ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Approved" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-muted-foreground text-xs",
              children: "Pending"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", children: lead.status !== ContactRequestStatus.approved ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "h-6 px-2 text-xs",
                onClick: () => onApprove(lead.requesterId),
                "data-ocid": "lead-approve-btn",
                children: "Approve"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-6 px-2 text-xs",
                onClick: () => onReject(lead.requesterId),
                "data-ocid": "lead-reject-btn",
                children: "Reject"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) })
        ]
      },
      lead.requesterId
    )) })
  ] }) });
}
function JobLocationSelector({
  jobId,
  onSelect
}) {
  const { locations } = useGetJobLocations(jobId);
  if (locations.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Additional Locations" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: locations.map((loc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onSelect == null ? void 0 : onSelect(loc.city),
        className: "px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs border border-primary/20",
        children: loc.city
      },
      loc.id
    )) })
  ] });
}
function MyJobListingsTab() {
  const [phone, setPhone] = reactExports.useState("");
  const [queryPhone, setQueryPhone] = reactExports.useState("");
  const { data: myJobs = [], isLoading, error } = useMyJobListings(queryPhone);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "my-jobs.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-3", children: "Enter your phone number to view your posted jobs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "+91 98765 43210",
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            className: "max-w-xs",
            "data-ocid": "my-jobs.phone_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => setQueryPhone(phone.trim()),
            disabled: !phone.trim(),
            "data-ocid": "my-jobs.search_button",
            children: "View My Listings"
          }
        )
      ] })
    ] }),
    !queryPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "my-jobs.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Enter your phone number above to view your posted jobs" })
        ]
      }
    ),
    queryPhone && isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2", "s3"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, s)) }),
    queryPhone && !isLoading && (error || myJobs.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "my-jobs.no_results",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-8 h-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: error ? "Failed to load listings" : "No listings yet. Post your first one!" }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setQueryPhone(""),
              "data-ocid": "my-jobs.retry_button",
              children: "Retry"
            }
          )
        ]
      }
    ),
    queryPhone && !isLoading && myJobs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
        myJobs.length,
        " job",
        myJobs.length !== 1 ? "s" : "",
        " posted"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "my-jobs.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Salary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Posted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-3 font-medium", children: "Leads" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: myJobs.map((job, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
            "data-ocid": `my-jobs.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-medium text-foreground max-w-[160px] truncate", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground", children: job.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-xs tabular-nums font-medium whitespace-nowrap", children: [
                "₹",
                job.salaryMin.toLocaleString("en-IN"),
                " – ₹",
                job.salaryMax.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground max-w-[120px] truncate", children: job.location.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: job.isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Open" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-muted-foreground text-xs",
                  children: "Closed"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-xs text-muted-foreground whitespace-nowrap", children: new Date(Number(job.publishDate)).toLocaleDateString(
                "en-IN"
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-right tabular-nums font-semibold", children: job.leads.length })
            ]
          },
          job.id
        )) })
      ] }) })
    ] })
  ] });
}
function JobCitySearchTab() {
  const { data: citiesData = [], isLoading: citiesLoading } = useGetJobCitiesAvailable();
  const [selectedCity, setSelectedCity] = reactExports.useState("");
  const [willingToRelocate, setWillingToRelocate] = reactExports.useState(false);
  const [relocateCities, setRelocateCities] = reactExports.useState([]);
  const markFavorite = useMarkEmployerFavorite();
  const unmarkFavorite = useUnmarkEmployerFavorite();
  const { data: favorites = [] } = useGetFavoriteEmployers();
  const { data: cityJobs = [], isLoading: jobsLoading } = useSearchJobsByCity(
    selectedCity,
    willingToRelocate,
    relocateCities
  );
  const favoritePhones = new Set(
    favorites.map(
      (f) => String(f.employerPhone ?? "")
    )
  );
  function toggleRelocateCity(city) {
    setRelocateCities(
      (prev) => prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  }
  const otherCities = citiesData.filter((c) => c.city !== selectedCity);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "jobs.city-search.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5", children: "Select City" }),
        citiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full max-w-xs" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedCity, onValueChange: setSelectedCity, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "max-w-xs", "data-ocid": "jobs.city.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a city to find jobs" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: citiesData.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.city, children: [
            c.city,
            " (",
            c.jobCount,
            " job",
            c.jobCount !== 1 ? "s" : "",
            ")"
          ] }, c.city)) })
        ] })
      ] }),
      selectedCity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: willingToRelocate,
            onCheckedChange: setWillingToRelocate,
            "data-ocid": "jobs.city.relocate_toggle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm cursor-pointer", children: "Willing to relocate to other cities?" })
      ] }),
      willingToRelocate && otherCities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-2", children: "Also search in:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: otherCities.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => toggleRelocateCity(c.city),
            className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${relocateCities.includes(c.city) ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-foreground hover:bg-muted/70"}`,
            "data-ocid": `jobs.relocate.city.${c.city.toLowerCase()}`,
            children: [
              c.city,
              " (",
              c.jobCount,
              ")"
            ]
          },
          c.city
        )) })
      ] })
    ] }),
    !selectedCity && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "jobs.city-search.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Select a city above to browse jobs" })
        ]
      }
    ),
    selectedCity && jobsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2", "s3"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, s)) }),
    selectedCity && !jobsLoading && cityJobs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "jobs.city-search.no_results",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-8 h-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "No jobs found in ",
            selectedCity
          ] })
        ]
      }
    ),
    cityJobs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cityJobs.map((job, idx) => {
      const isFav = favoritePhones.has(String(job.posterId ?? ""));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-all",
          "data-ocid": `jobs.city-result.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground truncate", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: job.category }),
                job.isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Open" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-muted-foreground text-xs",
                    children: "Closed"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                  job.location.address
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium tabular-nums", children: [
                  "₹",
                  job.salaryMin.toLocaleString("en-IN"),
                  " – ₹",
                  job.salaryMax.toLocaleString("en-IN"),
                  "/mo"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": isFav ? "Remove from favorites" : "Mark employer as favorite",
                onClick: async () => {
                  const phone = String(job.posterId ?? "");
                  if (!phone) return;
                  try {
                    if (isFav) {
                      await unmarkFavorite.mutateAsync({
                        employerPhone: phone,
                        city: job.location.address
                      });
                      ue.success("Removed from favorites");
                    } else {
                      await markFavorite.mutateAsync({
                        employerPhone: phone,
                        city: job.location.address
                      });
                      ue.success("Employer marked as favorite!");
                    }
                  } catch {
                    ue.error("Failed to update favorites");
                  }
                },
                className: `p-2 rounded-lg transition-colors ${isFav ? "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20" : "text-muted-foreground hover:bg-muted"}`,
                "data-ocid": `jobs.city-result.favorite.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-5 h-5 ${isFav ? "fill-amber-500" : ""}`
                  }
                )
              }
            )
          ] })
        },
        job.id
      );
    }) })
  ] });
}
function FavoriteEmployersTab() {
  const { data: favorites = [], isLoading } = useGetFavoriteEmployers();
  const unmarkFavorite = useUnmarkEmployerFavorite();
  const [viewEmployerPhone, setViewEmployerPhone] = reactExports.useState(
    null
  );
  const { data: employerJobs = [], isLoading: employerJobsLoading } = useGetJobsByEmployer(viewEmployerPhone ?? "");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2", "s3"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, s)) });
  }
  if (favorites.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-card border border-border rounded-xl",
        "data-ocid": "jobs.favorites.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No favorite employers yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Use “Search by City” and tap the ★ star to mark employers." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "jobs.favorites.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: favorites.map((fav, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-3",
        "data-ocid": `jobs.favorite.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground font-mono text-sm", children: String(fav.employerPhone ?? "—") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
              String(fav.city ?? "—")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 text-xs gap-1",
                onClick: () => setViewEmployerPhone(
                  viewEmployerPhone === String(fav.employerPhone ?? "") ? null : String(fav.employerPhone ?? "")
                ),
                "data-ocid": `jobs.favorite.viewjobs_button.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3.5 h-3.5" }),
                  viewEmployerPhone === String(fav.employerPhone ?? "") ? "Hide Jobs" : "View Jobs"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-8 text-xs text-destructive",
                onClick: async () => {
                  try {
                    await unmarkFavorite.mutateAsync({
                      employerPhone: String(fav.employerPhone ?? ""),
                      city: String(fav.city ?? "")
                    });
                    ue.success("Removed from favorites");
                  } catch {
                    ue.error("Failed to remove");
                  }
                },
                "data-ocid": `jobs.favorite.remove_button.${idx + 1}`,
                children: "Remove"
              }
            )
          ] })
        ]
      },
      String(fav.id ?? idx)
    )) }),
    viewEmployerPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-muted/20 border border-border rounded-xl p-4 space-y-3",
        "data-ocid": "jobs.favorite.employer_jobs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground", children: [
            "Jobs by ",
            viewEmployerPhone
          ] }),
          employerJobsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, s)) }) : employerJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active jobs from this employer." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: employerJobs.map((job, idx2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-lg p-3",
              "data-ocid": `jobs.employer.job.${idx2 + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: job.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: job.category })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                  job.location.address,
                  " · ₹",
                  job.salaryMin.toLocaleString("en-IN"),
                  " – ₹",
                  job.salaryMax.toLocaleString("en-IN"),
                  "/mo"
                ] })
              ]
            },
            job.id
          )) })
        ]
      }
    )
  ] });
}
function JobsPage() {
  const { data: jobs = [], isLoading, isError, refetch } = useJobs();
  const postJobMutation = usePostJob();
  const [leadApprovals, setLeadApprovals] = reactExports.useState(
    {}
  );
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [locationSearch, setLocationSearch] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [selectedJob, setSelectedJob] = reactExports.useState(null);
  const [showPostModal, setShowPostModal] = reactExports.useState(false);
  const [showLookingForWork, setShowLookingForWork] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    category: "",
    description: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    address: ""
  });
  const [additionalLocations, setAdditionalLocations] = reactExports.useState([]);
  const [newLocationInput, setNewLocationInput] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const addJobLocation = useAddJobLocation();
  const totalJobs = jobs.length;
  const openJobs = jobs.filter((j) => j.isOpen).length;
  const closedJobs = jobs.filter((j) => !j.isOpen).length;
  const totalLeads = jobs.reduce((sum, j) => sum + j.leads.length, 0);
  const filtered = reactExports.useMemo(
    () => jobs.filter((j) => {
      if (statusFilter === "open" && !j.isOpen) return false;
      if (statusFilter === "closed" && j.isOpen) return false;
      if (categoryFilter !== "all" && j.category !== categoryFilter)
        return false;
      if (locationSearch && !j.location.address.toLowerCase().includes(locationSearch.toLowerCase()))
        return false;
      if (dateFrom && Number(j.publishDate) < new Date(dateFrom).getTime())
        return false;
      if (dateTo && Number(j.publishDate) > new Date(dateTo).getTime())
        return false;
      return true;
    }),
    [jobs, statusFilter, categoryFilter, locationSearch, dateFrom, dateTo]
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
          address: form.address || form.location || "India"
        }
      });
      if (additionalLocations.length > 0 && job && "id" in job) {
        const jobId = String(job.id);
        for (const city of additionalLocations) {
          try {
            await addJobLocation({ jobId, city, pincode: [] });
          } catch {
          }
        }
      }
      ue.success("Job posted successfully");
      setShowPostModal(false);
      setForm({
        title: "",
        category: "",
        description: "",
        salaryMin: "",
        salaryMax: "",
        location: "",
        address: ""
      });
      setAdditionalLocations([]);
      setNewLocationInput("");
    } catch {
      ue.error("Failed to post job");
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleApproveLead(jobId, requesterId) {
    setLeadApprovals((prev) => ({
      ...prev,
      [`${jobId}_${requesterId}`]: true
    }));
    if (selectedJob) {
      const lead = selectedJob.leads.find((l) => l.requesterId === requesterId);
      if (lead) lead.status = ContactRequestStatus.approved;
    }
  }
  function handleRejectLead(jobId, requesterId) {
    setLeadApprovals((prev) => ({
      ...prev,
      [`${jobId}_${requesterId}`]: false
    }));
  }
  const enrichedLeads = (job) => job.leads.map((lead) => ({
    ...lead,
    status: leadApprovals[`${job.id}_${lead.requesterId}`] !== void 0 ? leadApprovals[`${job.id}_${lead.requesterId}`] ? ContactRequestStatus.approved : ContactRequestStatus.declined : lead.status
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Job Listings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage job postings, leads, and applicants" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowPostModal(true),
          className: "gap-2 shrink-0",
          "data-ocid": "post-job-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Post Job (Admin)"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Jobs",
          value: totalJobs,
          color: "text-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Open Jobs", value: openJobs, color: "text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Closed Jobs",
          value: closedJobs,
          color: "text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Leads",
          value: totalLeads,
          color: "text-[oklch(0.6_0.18_202)]"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", "data-ocid": "jobs.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "jobs.tab.all", children: "All Jobs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "by-city", "data-ocid": "jobs.tab.city", children: "Search by City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "favorites", "data-ocid": "jobs.tab.favorites", children: "Favorite Employers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "my", "data-ocid": "jobs.tab.my", children: "My Listings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: statusFilter,
                onValueChange: (v) => {
                  setStatusFilter(v);
                  setPage(1);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-32 h-8 text-sm",
                      "data-ocid": "filter-status",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "open", children: "Open" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "closed", children: "Closed" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: categoryFilter,
                onValueChange: (v) => {
                  setCategoryFilter(v);
                  setPage(1);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-40 h-8 text-sm",
                      "data-ocid": "filter-category",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
                    JOB_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Location...",
                  value: locationSearch,
                  onChange: (e) => {
                    setLocationSearch(e.target.value);
                    setPage(1);
                  },
                  className: "pl-8 h-8 text-sm w-40",
                  "data-ocid": "filter-location"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: dateFrom,
                onChange: (e) => {
                  setDateFrom(e.target.value);
                  setPage(1);
                },
                className: "h-8 text-sm w-36",
                "data-ocid": "filter-date-from"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: dateTo,
                onChange: (e) => {
                  setDateTo(e.target.value);
                  setPage(1);
                },
                className: "h-8 text-sm w-36",
                "data-ocid": "filter-date-to"
              }
            ),
            (statusFilter !== "all" || categoryFilter !== "all" || locationSearch || dateFrom || dateTo) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 gap-1 text-muted-foreground",
                onClick: () => {
                  setStatusFilter("all");
                  setCategoryFilter("all");
                  setLocationSearch("");
                  setDateFrom("");
                  setDateTo("");
                  setPage(1);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                  " Clear"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            paginated.length,
            " of ",
            filtered.length,
            " listings (page",
            " ",
            page,
            " of ",
            totalPages,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["s1", "s2", "s3", "s4", "s5"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, s)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center",
            "data-ocid": "jobs.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Unable to load listings. Please try again." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => void refetch(),
                  "data-ocid": "jobs.retry_button",
                  children: "Retry"
                }
              )
            ]
          }
        ) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-16 text-center",
            "data-ocid": "jobs-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No job listings found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setShowPostModal(true),
                  children: "Post a Job"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "jobs-table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Salary Range" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Posted By" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Published" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Expires" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-medium", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-3 font-medium", children: "Leads" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.map((job, idx) => {
            const publishDate = new Date(Number(job.publishDate));
            const endDate = new Date(Number(job.endDate));
            const isExpired = endDate < /* @__PURE__ */ new Date();
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                "data-ocid": `job-row-${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground max-w-[160px] truncate block", children: job.title }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: job.category }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground max-w-[100px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: job.location.address })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums font-medium", children: [
                    "₹",
                    job.salaryMin.toLocaleString("en-IN"),
                    " – ₹",
                    job.salaryMax.toLocaleString("en-IN")
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: job.posterId }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: publishDate.toLocaleDateString("en-IN") }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs ${isExpired ? "text-destructive" : "text-muted-foreground"}`,
                      children: endDate.toLocaleDateString("en-IN")
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: job.isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Open" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-muted-foreground text-xs",
                      children: "Closed"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-semibold", children: job.leads.length }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 px-2 gap-1 text-xs",
                      onClick: () => setSelectedJob(job),
                      "data-ocid": `job-view-${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                        " View"
                      ]
                    }
                  ) })
                ]
              },
              job.id
            );
          }) })
        ] }) }) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page <= 1,
                onClick: () => setPage((p) => p - 1),
                "data-ocid": "jobs.pagination_prev",
                children: "Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page >= totalPages,
                onClick: () => setPage((p) => p + 1),
                "data-ocid": "jobs.pagination_next",
                children: "Next"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "my", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MyJobListingsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "by-city", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JobCitySearchTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "favorites", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FavoriteEmployersTab, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors",
          onClick: () => setShowLookingForWork((p) => !p),
          "data-ocid": "toggle-looking-for-work",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "Who's Looking for Work" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: jobs.length })
            ] }),
            showLookingForWork ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      showLookingForWork && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4", children: ["s1", "s2", "s3", "s4", "s5"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-lg" }, s)) }) : jobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-2 py-10 text-center",
          "data-ocid": "looking-for-work.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-8 h-8 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No jobs available" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4", children: jobs.slice(0, 10).map((job, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-background border border-border rounded-lg p-3 space-y-1.5",
          "data-ocid": `looking-for-work.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0", children: job.title[0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: job.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "₹",
                  job.salaryMin.toLocaleString("en-IN"),
                  "–₹",
                  job.salaryMax.toLocaleString("en-IN")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs w-full justify-center",
                children: job.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: job.location.address })
            ] })
          ]
        },
        job.id
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!selectedJob, onOpenChange: () => setSelectedJob(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SheetContent,
      {
        side: "right",
        className: "w-full sm:max-w-xl overflow-y-auto",
        children: selectedJob && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "pb-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-lg font-bold font-display", children: selectedJob.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: selectedJob.category }),
              selectedJob.isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: "Open" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-muted-foreground text-xs",
                  children: "Closed"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "details", className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "details", className: "flex-1", children: "Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "leads", className: "flex-1", children: [
                "Leads (",
                selectedJob.leads.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "details", className: "space-y-4 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: selectedJob.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Salary Range" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold tabular-nums", children: [
                    "₹",
                    selectedJob.salaryMin.toLocaleString("en-IN"),
                    " – ₹",
                    selectedJob.salaryMax.toLocaleString("en-IN"),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "/mo" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Posted By" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: selectedJob.posterId })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: selectedJob.location.address })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(JobLocationSelector, { jobId: selectedJob.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Published" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: new Date(
                    Number(selectedJob.publishDate)
                  ).toLocaleDateString("en-IN") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Expires" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-sm ${new Date(Number(selectedJob.endDate)) < /* @__PURE__ */ new Date() ? "text-destructive" : ""}`,
                      children: new Date(
                        Number(selectedJob.endDate)
                      ).toLocaleDateString("en-IN")
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "leads", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              LeadsTable,
              {
                leads: enrichedLeads(selectedJob),
                onApprove: (u) => handleApproveLead(selectedJob.id, u),
                onReject: (u) => handleRejectLead(selectedJob.id, u)
              }
            ) })
          ] })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPostModal, onOpenChange: setShowPostModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Post a Job" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Job Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. Senior Sales Executive",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              "data-ocid": "job-form-title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.category,
              onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "job-form-category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: JOB_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Describe the role, requirements, and benefits...",
              rows: 3,
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              "data-ocid": "job-form-description"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Salary Min (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "20000",
                value: form.salaryMin,
                onChange: (e) => setForm((f) => ({ ...f, salaryMin: e.target.value })),
                "data-ocid": "job-form-salary-min"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Salary Max (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "50000",
                value: form.salaryMax,
                onChange: (e) => setForm((f) => ({ ...f, salaryMax: e.target.value })),
                "data-ocid": "job-form-salary-max"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "City or area",
              value: form.location,
              onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
              "data-ocid": "job-form-location"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Full address",
              value: form.address,
              onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
              "data-ocid": "job-form-address"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Additional Job Locations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Add city e.g. Mumbai",
                value: newLocationInput,
                onChange: (e) => setNewLocationInput(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && newLocationInput.trim()) {
                    setAdditionalLocations((prev) => [
                      ...prev,
                      newLocationInput.trim()
                    ]);
                    setNewLocationInput("");
                  }
                },
                "data-ocid": "job-form-additional-location-input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => {
                  if (newLocationInput.trim()) {
                    setAdditionalLocations((prev) => [
                      ...prev,
                      newLocationInput.trim()
                    ]);
                    setNewLocationInput("");
                  }
                },
                "data-ocid": "job-form-add-location-btn",
                children: "Add"
              }
            )
          ] }),
          additionalLocations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: additionalLocations.map((loc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs",
              "data-ocid": `job-form-location-chip.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                loc,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAdditionalLocations(
                      (prev) => prev.filter((_, i) => i !== idx)
                    ),
                    className: "ml-1 hover:text-destructive",
                    "aria-label": `Remove ${loc}`,
                    "data-ocid": `job-form-remove-location.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            loc
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground", children: [
          "📅 Duration: auto-set to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "1 week" }),
          " from today (expires",
          " ",
          new Date(Date.now() + 7 * 864e5).toLocaleDateString("en-IN"),
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => setShowPostModal(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1",
              onClick: handleSubmitJob,
              disabled: isSubmitting || !form.title || !form.category || !form.description,
              "data-ocid": "job-form-submit",
              children: isSubmitting ? "Posting..." : "Post Job"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  JobsPage as default
};
