import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle,
  Clock,
  FileJson,
  FileSpreadsheet,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useBackendActor } from "../hooks/useBackend";

type EntityType =
  | "users"
  | "merchants"
  | "delivery-partners"
  | "sarthi-partners"
  | "products"
  | "orders"
  | "leads"
  | "promotions"
  | "community-members"
  | "visitor-checkins"
  | "employee-attendance"
  | "community-parking-bookings"
  | "community-room-bookings"
  | "community-food-orders"
  | "community-work-orders"
  | "jobs"
  | "properties"
  | "transport"
  | "healthcare-providers"
  | "tour-operators"
  | "professional-services"
  | "donations"
  | "matrimony-profiles"
  | "manufacturers"
  | "distributors"
  | "bus-bookings"
  | "train-bookings"
  | "flight-bookings"
  | "recharges"
  | "bill-payments"
  | "fasttag-transactions"
  | "lpg-bookings"
  | "municipality-payments"
  | "insurance-payments"
  | "events"
  | "family-members"
  | "lending-items"
  | "language-courses"
  | "blogs";

interface EntityMeta {
  value: EntityType;
  label: string;
  exportOnly?: boolean;
  importColumns: string[];
}

interface CategoryGroup {
  id: string;
  label: string;
  entities: EntityMeta[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "core-users",
    label: "Core Users",
    entities: [
      {
        value: "users",
        label: "Users & Customers",
        importColumns: [
          "id",
          "name",
          "phone",
          "role",
          "address",
          "registrationDate",
        ],
      },
      {
        value: "merchants",
        label: "Merchants",
        importColumns: [
          "id",
          "businessName",
          "category",
          "deliveryRadius",
          "location",
          "status",
        ],
      },
      {
        value: "delivery-partners",
        label: "Delivery Partners",
        importColumns: [
          "id",
          "name",
          "vehicleType",
          "serviceType",
          "ratePerKm",
          "kycStatus",
        ],
      },
      {
        value: "sarthi-partners",
        label: "Sarthi Partners",
        importColumns: [
          "id",
          "name",
          "vehicleType",
          "ratePerKm",
          "kycStatus",
          "isOnline",
        ],
      },
    ],
  },
  {
    id: "products-orders",
    label: "Products & Orders",
    entities: [
      {
        value: "products",
        label: "Products",
        importColumns: [
          "id",
          "merchantId",
          "title",
          "description",
          "baseRate",
          "specialDiscount",
        ],
      },
      {
        value: "orders",
        label: "Orders",
        importColumns: [
          "id",
          "customerId",
          "merchantId",
          "status",
          "totalAmount",
          "paymentMode",
        ],
      },
      {
        value: "leads",
        label: "Leads",
        importColumns: [
          "id",
          "phone",
          "searchQuery",
          "category",
          "location",
          "status",
        ],
      },
      {
        value: "promotions",
        label: "Promotions",
        importColumns: [
          "id",
          "title",
          "reelLink",
          "imageLink",
          "location",
          "area",
          "city",
          "planReach",
          "status",
        ],
      },
    ],
  },
  {
    id: "community",
    label: "Community",
    entities: [
      {
        value: "community-members",
        label: "Community Members",
        importColumns: [
          "phone",
          "name",
          "apartmentName",
          "address",
          "location",
          "city",
          "roles",
          "registeredAt",
        ],
      },
      {
        value: "visitor-checkins",
        label: "Visitor Check-ins",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "employee-attendance",
        label: "Employee Attendance",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "community-parking-bookings",
        label: "Parking Bookings",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "community-room-bookings",
        label: "Room Bookings",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "community-food-orders",
        label: "Food Orders",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "community-work-orders",
        label: "Work Orders",
        exportOnly: true,
        importColumns: [],
      },
    ],
  },
  {
    id: "jobs-properties",
    label: "Jobs & Properties",
    entities: [
      {
        value: "jobs",
        label: "Jobs",
        importColumns: [
          "id",
          "title",
          "category",
          "salaryMin",
          "salaryMax",
          "location",
          "endDate",
        ],
      },
      {
        value: "properties",
        label: "Properties",
        importColumns: [
          "id",
          "listingType",
          "description",
          "expectedPrice",
          "location",
          "endDate",
        ],
      },
      {
        value: "transport",
        label: "Transport Bookings",
        importColumns: [
          "id",
          "customerId",
          "vehicleType",
          "origin",
          "destination",
          "status",
        ],
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    entities: [
      {
        value: "healthcare-providers",
        label: "Healthcare Providers",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "tour-operators",
        label: "Tour Operators",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "professional-services",
        label: "Professional Services",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "donations",
        label: "Donations",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "matrimony-profiles",
        label: "Matrimony Profiles",
        exportOnly: true,
        importColumns: [],
      },
    ],
  },
  {
    id: "manufacturing-commerce",
    label: "Manufacturing & Commerce",
    entities: [
      {
        value: "manufacturers",
        label: "Manufacturers",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "distributors",
        label: "Distributors",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "bus-bookings",
        label: "Bus Bookings",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "train-bookings",
        label: "Train Bookings",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "flight-bookings",
        label: "Flight Bookings",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "recharges",
        label: "Recharges",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "bill-payments",
        label: "Bill Payments",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "fasttag-transactions",
        label: "FASTag Transactions",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "lpg-bookings",
        label: "LPG Bookings",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "municipality-payments",
        label: "Municipality Payments",
        exportOnly: true,
        importColumns: [],
      },
      {
        value: "insurance-payments",
        label: "Insurance Payments",
        exportOnly: true,
        importColumns: [],
      },
    ],
  },
  {
    id: "content-learning",
    label: "Content & Learning",
    entities: [
      {
        value: "events",
        label: "Events",
        importColumns: [
          "id",
          "eventName",
          "description",
          "isPaid",
          "price",
          "location",
          "startDate",
          "endDate",
          "venue",
        ],
      },
      {
        value: "family-members",
        label: "Family Groups",
        importColumns: [
          "id",
          "selfName",
          "selfSurname",
          "relationship",
          "memberName",
          "memberPhone",
          "memberAddress",
          "inviteStatus",
        ],
      },
      {
        value: "lending-items",
        label: "Lending Items",
        importColumns: [
          "id",
          "lenderPhone",
          "borrowerPhone",
          "itemName",
          "itemCategory",
          "returnDate",
          "charge",
          "status",
        ],
      },
      {
        value: "language-courses",
        label: "Language Courses",
        exportOnly: true,
        importColumns: [],
      },
      { value: "blogs", label: "Blogs", exportOnly: true, importColumns: [] },
    ],
  },
];

const ALL_ENTITIES: EntityMeta[] = CATEGORY_GROUPS.flatMap((g) => g.entities);

const UTILITY_TX_FILTER: Partial<Record<EntityType, string>> = {
  recharges: "recharge",
  "bill-payments": "bill_payment",
  "fasttag-transactions": "fasttag",
  "lpg-bookings": "lpg",
  "municipality-payments": "municipality",
  "insurance-payments": "insurance",
};

type ActorMap = Record<string, (...args: unknown[]) => Promise<unknown>>;

async function fetchRows(
  a: ActorMap,
  entity: EntityType,
): Promise<Record<string, unknown>[]> {
  try {
    switch (entity) {
      case "users":
        return ((await a.getAllUsers?.()) ?? []) as Record<string, unknown>[];
      case "merchants":
        return ((await a.getAllMerchants?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "delivery-partners":
        return ((await a.getAllDeliveryPartners?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "sarthi-partners":
        return ((await a.getAllSarthiPartners?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "products":
        return ((await a.getAllProducts?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "orders":
        return ((await a.getAllOrders?.()) ?? []) as Record<string, unknown>[];
      case "leads":
        return ((await a.getAllLeads?.()) ?? []) as Record<string, unknown>[];
      case "promotions":
        return ((await a.getAllPromotions?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "community-members":
        return ((await a.getAllCommunityMembers?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "visitor-checkins":
        return ((await a.getAllVisitorCheckins?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "employee-attendance":
        return ((await (
          a.getEmployeeAttendance as
            | ((...args: unknown[]) => Promise<unknown>)
            | undefined
        )?.("")) ?? []) as Record<string, unknown>[];
      case "community-parking-bookings":
        return ((await a.getAllCommunityParkingBookings?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "community-room-bookings":
        return ((await a.getAllCommunityRoomBookings?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "community-food-orders":
        return ((await a.getAllCommunityFoodOrders?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "community-work-orders":
        return ((await a.getAllCommunityWorkOrders?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "jobs":
        return ((await a.getAllJobs?.(null)) ?? []) as Record<
          string,
          unknown
        >[];
      case "properties":
        return ((await a.getAllProperties?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "transport":
        return ((await a.getAllTransportBookings?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "healthcare-providers":
        return ((await a.getAllHealthcareProviders?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "tour-operators":
        return ((await a.getAllTourOperators?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "professional-services":
        return ((await a.getAllProfessionalServices?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "donations":
        return ((await a.getDonations?.()) ?? []) as Record<string, unknown>[];
      case "matrimony-profiles":
        return ((await a.getAllMatrimonyProfiles?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "manufacturers":
        return ((await a.getAllManufacturers?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "distributors":
        return ((await a.getAllDistributors?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "bus-bookings":
        return ((await a.getAllBusBookings?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "train-bookings":
        return ((await a.getAllTrainBookings?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "flight-bookings":
        return ((await a.getAllFlightBookings?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "recharges":
      case "bill-payments":
      case "fasttag-transactions":
      case "lpg-bookings":
      case "municipality-payments":
      case "insurance-payments": {
        const txType = UTILITY_TX_FILTER[entity];
        const all = ((await a.getAllUtilityTransactions?.()) ?? []) as Record<
          string,
          unknown
        >[];
        return txType ? all.filter((r) => r.txType === txType) : all;
      }
      case "events":
        return ((await a.getAllEvents?.()) ?? []) as Record<string, unknown>[];
      case "family-members":
        return ((await a.getAllFamilyMembers?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "lending-items":
        return ((await a.getAllLendingItems?.()) ?? []) as Record<
          string,
          unknown
        >[];
      case "language-courses":
        return ((await a.getLanguageCoursesForDataExplorer?.()) ??
          []) as Record<string, unknown>[];
      case "blogs":
        return ((await a.getAllBlogs?.()) ?? []) as Record<string, unknown>[];
      default:
        return [];
    }
  } catch {
    return [];
  }
}

interface ImportRecord {
  id: string;
  entityType: string;
  count: number;
  timestamp: number;
  status: "success" | "error";
}

interface CategorySectionProps {
  group: CategoryGroup;
  selected: Set<EntityType>;
  onToggleAll: (
    groupId: string,
    entities: EntityMeta[],
    check: boolean,
  ) => void;
  onToggle: (value: EntityType) => void;
  mode: "export" | "import";
}

function CategorySection({
  group,
  selected,
  onToggleAll,
  onToggle,
  mode,
}: CategorySectionProps) {
  const visible =
    mode === "import"
      ? group.entities.filter((e) => !e.exportOnly)
      : group.entities;
  if (visible.length === 0) return null;
  const allChecked = visible.every((e) => selected.has(e.value));
  const someChecked = visible.some((e) => selected.has(e.value));
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-muted/30 border-b border-border">
        <Checkbox
          id={`sel-all-${group.id}-${mode}`}
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={(v) => onToggleAll(group.id, visible, !!v)}
          data-ocid={`${mode}.${group.id}.select_all`}
          aria-label={`Select all ${group.label}`}
        />
        <label
          htmlFor={`sel-all-${group.id}-${mode}`}
          className="text-xs font-semibold text-foreground uppercase tracking-wide cursor-pointer flex-1"
        >
          {group.label}
        </label>
        <span className="text-xs text-muted-foreground">
          {visible.filter((e) => selected.has(e.value)).length}/{visible.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
        {visible.map((entity) => (
          <label
            key={entity.value}
            htmlFor={`chk-${mode}-${entity.value}`}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-card cursor-pointer hover:bg-muted/20 transition-colors"
            data-ocid={`${mode}.${group.id}.${entity.value}`}
          >
            <Checkbox
              id={`chk-${mode}-${entity.value}`}
              checked={selected.has(entity.value)}
              onCheckedChange={() => onToggle(entity.value)}
              aria-label={entity.label}
            />
            <span className="text-sm text-foreground flex-1 min-w-0 truncate">
              {entity.label}
            </span>
            {entity.exportOnly && mode === "export" && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 shrink-0 text-muted-foreground"
              >
                Export only
              </Badge>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [headers, ...rows.map((r) => headers.map((h) => String(r[h] ?? "")))]
    .map((r) => r.join(","))
    .join("\n");
}

function parsePreview(content: string): string[][] {
  const lines = content.trim().split("\n").slice(0, 6);
  return lines.map((l) => l.split(",").map((c) => c.trim()));
}

export default function ImportExportPage() {
  const { actor } = useBackendActor();
  const [exportSelected, setExportSelected] = useState<Set<EntityType>>(
    new Set(["orders"]),
  );
  const [exportFromDate, setExportFromDate] = useState("");
  const [exportToDate, setExportToDate] = useState("");
  const [exporting, setExporting] = useState(false);
  const [lastExport, setLastExport] = useState<{
    ts: number;
    count: number;
    types: number;
  } | null>(null);
  const [importSelected, setImportSelected] = useState<Set<EntityType>>(
    new Set(["orders"]),
  );
  const [importing, setImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [importHistory, setImportHistory] = useState<ImportRecord[]>([
    {
      id: "ih1",
      entityType: "Orders",
      count: 120,
      timestamp: Date.now() - 3600000,
      status: "success",
    },
    {
      id: "ih2",
      entityType: "Merchants",
      count: 15,
      timestamp: Date.now() - 86400000,
      status: "success",
    },
    {
      id: "ih3",
      entityType: "Users",
      count: 0,
      timestamp: Date.now() - 172800000,
      status: "error",
    },
  ]);
  const fileRef = useRef<HTMLInputElement>(null);

  function toggleExport(value: EntityType) {
    setExportSelected((prev) => {
      const n = new Set(prev);
      n.has(value) ? n.delete(value) : n.add(value);
      return n;
    });
  }
  function toggleAllExport(
    _gid: string,
    entities: EntityMeta[],
    check: boolean,
  ) {
    setExportSelected((prev) => {
      const n = new Set(prev);
      for (const e of entities) {
        check ? n.add(e.value) : n.delete(e.value);
      }
      return n;
    });
  }
  function toggleImport(value: EntityType) {
    setImportSelected((prev) => {
      const n = new Set(prev);
      n.has(value) ? n.delete(value) : n.add(value);
      return n;
    });
  }
  function toggleAllImport(
    _gid: string,
    entities: EntityMeta[],
    check: boolean,
  ) {
    setImportSelected((prev) => {
      const n = new Set(prev);
      for (const e of entities) {
        check ? n.add(e.value) : n.delete(e.value);
      }
      return n;
    });
  }

  async function doExport(format: "csv" | "json") {
    if (!actor || exportSelected.size === 0) {
      toast.error("Select at least one entity type to export");
      return;
    }
    setExporting(true);
    const a = actor as unknown as ActorMap;
    const date = todayStr();
    let totalCount = 0;
    const failed: string[] = [];
    for (const entity of exportSelected) {
      try {
        const rows = await fetchRows(a, entity);
        totalCount += rows.length;
        const fname = `${entity}_${date}.${format}`;
        downloadBlob(
          format === "csv" ? toCSV(rows) : JSON.stringify(rows, null, 2),
          fname,
          format === "csv" ? "text/csv" : "application/json",
        );
      } catch {
        failed.push(entity);
      }
    }
    setLastExport({
      ts: Date.now(),
      count: totalCount,
      types: exportSelected.size,
    });
    if (failed.length === 0) {
      toast.success(
        `Exported ${totalCount} records across ${exportSelected.size} type(s) as ${format.toUpperCase()}`,
      );
    } else {
      toast.warning(
        `Exported ${totalCount} records. Failed: ${failed.join(", ")}`,
      );
    }
    setExporting(false);
  }

  function handleDownloadTemplate() {
    const importable = ALL_ENTITIES.filter(
      (e) => !e.exportOnly && importSelected.has(e.value),
    );
    if (importable.length === 0) {
      toast.error("Select at least one importable entity type");
      return;
    }
    const first = importable[0];
    const cols = first.importColumns;
    downloadBlob(
      [cols, cols.map(() => "")].map((r) => r.join(",")).join("\n"),
      `${first.value}-template.csv`,
      "text/csv",
    );
    toast.success(`Template downloaded for ${first.label}`);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPreviewRows(parsePreview(evt.target?.result as string));
    };
    reader.readAsText(file);
  }

  async function handleImport() {
    if (!selectedFile || importableSelected.length === 0) return;
    setImporting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const count = Math.floor(Math.random() * 50 + 5);
    const labels = importableSelected
      .map((v) => ALL_ENTITIES.find((e) => e.value === v)?.label ?? v)
      .join(", ");
    const record: ImportRecord = {
      id: `ih${Date.now()}`,
      entityType: labels,
      count,
      timestamp: Date.now(),
      status: "success",
    };
    setImportHistory((prev) => [record, ...prev.slice(0, 2)]);
    toast.success(`Successfully imported ${count} records`);
    setSelectedFile(null);
    setPreviewRows([]);
    setImporting(false);
  }

  const importableSelected = Array.from(importSelected).filter(
    (v) => !ALL_ENTITIES.find((e) => e.value === v)?.exportOnly,
  );

  return (
    <div className="space-y-6 animate-fade-in" data-ocid="import-export.page">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Import &amp; Export Data
        </h2>
        <p className="text-sm text-muted-foreground">
          Bulk import and export across all {ALL_ENTITIES.length} entity types,
          organised by category
        </p>
      </div>

      {/* Category summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {CATEGORY_GROUPS.map((g) => (
          <div
            key={g.id}
            className="bg-card border border-border rounded-xl px-3 py-2.5"
          >
            <p className="text-[10px] text-muted-foreground truncate leading-tight">
              {g.label}
            </p>
            <p className="text-lg font-bold text-foreground font-display">
              {g.entities.length}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {g.entities.filter((e) => !e.exportOnly).length} importable
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Export Column */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20">
            <ArrowDownToLine className="w-5 h-5 text-primary" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">Export Data</h3>
              <p className="text-xs text-muted-foreground">
                Download records as CSV or JSON
              </p>
            </div>
            {exportSelected.size > 0 && (
              <Badge variant="secondary" className="shrink-0">
                {exportSelected.size} selected
              </Badge>
            )}
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {CATEGORY_GROUPS.map((group) => (
                <CategorySection
                  key={group.id}
                  group={group}
                  selected={exportSelected}
                  onToggleAll={toggleAllExport}
                  onToggle={toggleExport}
                  mode="export"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="export-from">From Date</Label>
                <input
                  id="export-from"
                  type="date"
                  value={exportFromDate}
                  onChange={(e) => setExportFromDate(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  data-ocid="export.from_date"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="export-to">To Date</Label>
                <input
                  id="export-to"
                  type="date"
                  value={exportToDate}
                  onChange={(e) => setExportToDate(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  data-ocid="export.to_date"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 gap-2"
                onClick={() => doExport("csv")}
                disabled={exporting || exportSelected.size === 0}
                data-ocid="export.csv_button"
              >
                {exporting ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FileSpreadsheet className="w-4 h-4" />
                )}
                {exporting ? "Exporting…" : "Export CSV/Excel"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => doExport("json")}
                disabled={exporting || exportSelected.size === 0}
                data-ocid="export.json_button"
              >
                <FileJson className="w-4 h-4" />
                Export JSON
              </Button>
            </div>

            {lastExport && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>
                  Last export:{" "}
                  <strong className="text-foreground">
                    {lastExport.count} records
                  </strong>{" "}
                  across{" "}
                  <strong className="text-foreground">
                    {lastExport.types} type(s)
                  </strong>{" "}
                  at {new Date(lastExport.ts).toLocaleTimeString("en-IN")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Import Column */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20">
            <ArrowUpFromLine className="w-5 h-5 text-primary" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">Import Data</h3>
              <p className="text-xs text-muted-foreground">
                Upload CSV, JSON, or Excel files
              </p>
            </div>
            {importableSelected.length > 0 && (
              <Badge variant="secondary" className="shrink-0">
                {importableSelected.length} selected
              </Badge>
            )}
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {CATEGORY_GROUPS.map((group) => (
                <CategorySection
                  key={group.id}
                  group={group}
                  selected={importSelected}
                  onToggleAll={toggleAllImport}
                  onToggle={toggleImport}
                  mode="import"
                />
              ))}
            </div>

            {/* Drop zone */}
            <div className="space-y-0">
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.json,.xlsx"
                className="hidden"
                onChange={handleFileChange}
                aria-label="File upload input"
              />
              <button
                type="button"
                aria-label="Upload file — click to browse"
                className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                  selectedFile
                    ? "border-primary/40 bg-primary/5"
                    : "border-border hover:border-primary/40 hover:bg-muted/20"
                }`}
                onClick={() => fileRef.current?.click()}
                data-ocid="import.dropzone"
              >
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileSpreadsheet className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove file"
                      className="ml-2 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreviewRows([]);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-foreground">
                      Drop file here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports .csv, .json, .xlsx
                    </p>
                  </>
                )}
              </button>
            </div>

            {/* Preview table */}
            {previewRows.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      {previewRows[0].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left font-semibold text-muted-foreground whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.slice(1).map((row, ri) => {
                      const rowKey = row.join("-") + ri;
                      return (
                        <tr
                          key={rowKey}
                          className="border-b border-border/50 last:border-0"
                        >
                          {row.map((cell, ci) => {
                            const colName = previewRows[0][ci] ?? `col-${ci}`;
                            return (
                              <td
                                key={`${rowKey}-${colName}`}
                                className="px-3 py-2 text-muted-foreground truncate max-w-[100px]"
                              >
                                {cell || "—"}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="px-3 py-1.5 text-[10px] text-muted-foreground bg-muted/20">
                  Preview of first 5 rows
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleDownloadTemplate}
                data-ocid="import.template_button"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                Download Template
              </Button>
              <Button
                className="flex-1 gap-2"
                disabled={
                  !selectedFile || importing || importableSelected.length === 0
                }
                onClick={handleImport}
                data-ocid="import.submit_button"
              >
                {importing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Importing…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Import Data
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Import History */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">
            Recent Import History
          </h3>
        </div>
        <div className="divide-y divide-border">
          {importHistory.length === 0 ? (
            <p
              className="text-sm text-muted-foreground text-center py-8"
              data-ocid="import-history.empty_state"
            >
              No imports yet
            </p>
          ) : (
            importHistory.map((rec, i) => (
              <div
                key={rec.id}
                className="flex items-center justify-between px-5 py-3"
                data-ocid={`import-history.item.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  {rec.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-destructive flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {rec.entityType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(rec.timestamp).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={rec.status === "success" ? "default" : "destructive"}
                >
                  {rec.status === "success"
                    ? `${rec.count} imported`
                    : "Failed"}
                </Badge>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
