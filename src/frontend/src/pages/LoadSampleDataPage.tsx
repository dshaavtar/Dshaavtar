import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Database,
  Loader2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSeedSampleData } from "../hooks/useBackend";

const ENTITY_ORDER = [
  { key: "cities", label: "Cities" },
  { key: "users", label: "Users (Customers)" },
  { key: "merchants", label: "Merchants" },
  { key: "deliveryPartners", label: "Delivery Partners" },
  { key: "products", label: "Products" },
  { key: "orders", label: "Orders" },
  { key: "jobs", label: "Jobs" },
  { key: "properties", label: "Properties" },
  { key: "events", label: "Events" },
  { key: "healthcare", label: "Healthcare Providers" },
  { key: "tours", label: "Tours & Travel" },
  { key: "professionalServices", label: "Professional Services" },
  { key: "manufacturers", label: "Manufacturers" },
  { key: "manufacturerProducts", label: "Mfr. Products" },
  { key: "distributors", label: "Distributors" },
  { key: "expiryReturns", label: "Expiry Returns" },
  { key: "donations", label: "Donations" },
  { key: "matrimony", label: "Matrimony Profiles" },
  { key: "communityGroups", label: "Community Groups" },
  { key: "languageCourses", label: "Language Courses" },
  { key: "blogPosts", label: "Blog Posts" },
  { key: "lendingRecords", label: "Lending Records" },
] as const;

type EntityKey = (typeof ENTITY_ORDER)[number]["key"];
type EntityStatus = "pending" | "running" | "done" | "error";

interface EntityState {
  status: EntityStatus;
  count: number;
  error?: string;
}

function StatusBadge({ status }: { status: EntityStatus }) {
  if (status === "pending")
    return (
      <Badge variant="outline" className="text-muted-foreground">
        Pending
      </Badge>
    );
  if (status === "running")
    return (
      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-0">
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
        Running
      </Badge>
    );
  if (status === "done")
    return (
      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-0">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Done
      </Badge>
    );
  return (
    <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0">
      <XCircle className="w-3 h-3 mr-1" />
      Error
    </Badge>
  );
}

export default function LoadSampleDataPage() {
  const seedMutation = useSeedSampleData();
  const [entityStates, setEntityStates] = useState<
    Partial<Record<EntityKey, EntityState>>
  >({});
  const [totalCreated, setTotalCreated] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(-1);

  async function runAnimation() {
    setAnimating(true);
    setEntityStates({});
    setTotalCreated(null);
    setCurrentIdx(-1);

    // Animate through each entity showing "running"
    for (let i = 0; i < ENTITY_ORDER.length; i++) {
      setCurrentIdx(i);
      setEntityStates((prev) => ({
        ...prev,
        [ENTITY_ORDER[i].key]: { status: "running", count: 0 },
      }));
      await new Promise((res) => setTimeout(res, 120));
    }
  }

  async function handleLoadAll() {
    void runAnimation();
    try {
      const summary = await seedMutation.mutateAsync();
      // Map summary fields to entity keys
      const counts: Partial<Record<EntityKey, number>> = {
        users: summary.customers ?? 0,
        merchants: summary.merchants ?? 0,
        deliveryPartners: summary.deliveryPartners ?? 0,
        products: summary.products ?? 0,
        jobs: summary.jobs ?? 0,
        properties: summary.properties ?? 0,
        events: summary.events ?? 0,
        donations: summary.donations ?? 0,
        lendingRecords:
          (summary as unknown as Record<string, number>).lendingItems ?? 0,
        manufacturers:
          (summary as unknown as Record<string, number>).manufacturers ?? 0,
        manufacturerProducts:
          (summary as unknown as Record<string, number>).manufacturerProducts ??
          0,
        distributors:
          (summary as unknown as Record<string, number>).distributors ?? 0,
      };
      const done: Partial<Record<EntityKey, EntityState>> = {};
      for (const e of ENTITY_ORDER) {
        done[e.key] = {
          status: "done",
          count: counts[e.key] ?? 0,
        };
      }
      setEntityStates(done);
      const total = Object.values(counts).reduce((s, v) => s + (v ?? 0), 0);
      setTotalCreated(total);
      setAnimating(false);
      toast.success(`Sample data loaded — ${total} records created`);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unknown error loading sample data";
      setEntityStates((prev) => {
        const updated = { ...prev };
        for (const e of ENTITY_ORDER) {
          if (updated[e.key]?.status === "running") {
            updated[e.key] = { status: "error", count: 0, error: msg };
          }
        }
        return updated;
      });
      setAnimating(false);
      toast.error(msg);
    }
  }

  const isLoading = seedMutation.isPending || animating;

  return (
    <div className="space-y-6" data-ocid="load-sample-data.page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            Load Sample Data
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Seeds unique sample records in the correct dependency order. Each
            run creates new records with timestamps and random suffixes, so you
            can run it multiple times without duplicates.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleLoadAll}
          disabled={isLoading}
          size="lg"
          className="flex-shrink-0"
          data-ocid="load-sample-data.load_all_button"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          {isLoading ? "Loading…" : "Load All Sample Data"}
        </Button>
      </div>

      {/* Success summary */}
      {totalCreated !== null && !isLoading && (
        <div
          className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900 px-4 py-3"
          data-ocid="load-sample-data.success_state"
        >
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            ✅ Sample data loaded successfully —{" "}
            <strong>{totalCreated} total records</strong> created across{" "}
            {ENTITY_ORDER.length} entity types.
          </p>
        </div>
      )}

      {/* Entity grid */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            Entity Types — Seeding Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ENTITY_ORDER.map((entity, idx) => {
              const state = entityStates[entity.key];
              const status: EntityStatus =
                state?.status ??
                (isLoading && idx <= currentIdx ? "running" : "pending");
              const count = state?.count ?? 0;
              return (
                <div
                  key={entity.key}
                  className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2"
                  data-ocid={`load-sample-data.entity.${idx + 1}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-mono text-muted-foreground w-5 text-right flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="text-sm font-medium text-foreground truncate">
                      {entity.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {status === "done" && count > 0 && (
                      <span className="text-xs text-muted-foreground">
                        +{count}
                      </span>
                    )}
                    <StatusBadge status={status} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <p className="text-xs text-muted-foreground">
        💡 Tip: Each run adds new unique records with timestamps. Existing
        records are not modified. Run 2–3 times to build a realistic test
        dataset.
      </p>
    </div>
  );
}
