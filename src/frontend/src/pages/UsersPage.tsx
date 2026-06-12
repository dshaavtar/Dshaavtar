import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import DataTable, { type ColumnDef } from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import { useDeliveryPartners, useUsers } from "../hooks/useBackend";
import { useDebounce, usePagination } from "../hooks/usePagination";
import { type DeliveryPartner, type User, UserRole } from "../types";

// Phone numbers are shown in full — no masking
function maskPhone(phone: string) {
  return phone;
}

// --- Customer detail drawer ---
function UserDetailSheet({
  user,
  onClose,
  onToggle,
}: { user: User | null; onClose: () => void; onToggle: (id: string) => void }) {
  if (!user) return null;
  const registrationDateStr = user.registrationDate
    ? new Date(Number(user.registrationDate)).toLocaleDateString("en-IN")
    : "—";

  return (
    <Sheet open={!!user} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display">{user.name}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "User ID", value: user.id },
              { label: "Role", value: user.role },
              { label: "Phone", value: maskPhone(user.phone) },
              { label: "OTP Verified", value: user.otpVerified ? "Yes" : "No" },
              { label: "Status", value: user.isActive ? "Active" : "Inactive" },
              { label: "Registered", value: registrationDateStr },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/30 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium mt-0.5 truncate">{value}</p>
              </div>
            ))}
          </div>
          {user.address && (
            <div className="bg-muted/20 rounded-xl p-3 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{user.address}</p>
            </div>
          )}
          <Button
            size="sm"
            variant={user.isActive ? "destructive" : "default"}
            onClick={() => onToggle(user.id)}
            className="w-full"
            data-ocid="user-detail-toggle"
          >
            {user.isActive ? "Deactivate User" : "Activate User"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// --- Delivery partner detail drawer ---
function DPDetailSheet({
  dp,
  onClose,
}: { dp: DeliveryPartner | null; onClose: () => void }) {
  if (!dp) return null;
  return (
    <Sheet open={!!dp} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display">{dp.name}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Partner ID", value: dp.id },
              { label: "Vehicle", value: dp.vehicleType },
              { label: "Rate/km", value: `₹${dp.ratePerKm}` },
              {
                label: "Rating",
                value: `${dp.avgRating} (${Number(dp.ratingCount)} ratings)`,
              },
              { label: "Online", value: dp.isOnline ? "Yes" : "No" },
              { label: "KYC", value: dp.isVerified ? "Verified" : "Pending" },
              {
                label: "ONDC",
                value: dp.isOndcEnrolled ? "Enrolled" : "Not Enrolled",
              },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/30 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium mt-0.5 truncate">{value}</p>
              </div>
            ))}
          </div>
          {dp.currentLocation && (
            <div className="bg-muted/20 rounded-xl p-3 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                {dp.currentLocation.address}
              </p>
            </div>
          )}
          {dp.otherPlatforms && dp.otherPlatforms.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Also on</p>
              <div className="flex flex-wrap gap-1.5">
                {dp.otherPlatforms.map((p) => (
                  <Badge key={p} variant="outline">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// --- Role badge helper ---
const ROLE_COLORS: Record<string, string> = {
  [UserRole.customer]:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  [UserRole.merchant]:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  [UserRole.deliveryPartner]:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  [UserRole.sarthi]:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  [UserRole.admin]:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

function RoleBadge({ role }: { role: string }) {
  const cls = ROLE_COLORS[role] ?? "bg-muted text-muted-foreground";
  const label = role
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .trim();
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${cls}`}
    >
      {label}
    </span>
  );
}

// --- All Users tab (replaces Customers tab) ---
function CustomersTab() {
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  // Load ALL users regardless of role
  const { data: users = [], isLoading } = useUsers();
  const [detailUser, setDetailUser] = useState<User | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      if (q && !u.name.toLowerCase().includes(q) && !u.phone.includes(q))
        return false;
      if (dateFrom && u.registrationDate) {
        if (Number(u.registrationDate) < new Date(dateFrom).getTime())
          return false;
      }
      if (dateTo && u.registrationDate) {
        if (Number(u.registrationDate) > new Date(dateTo).getTime())
          return false;
      }
      return true;
    });
  }, [users, search, dateFrom, dateTo]);

  const pagination = usePagination(filtered);
  const hasFilters = searchInput || dateFrom || dateTo;

  const COLUMNS: ColumnDef<User>[] = [
    {
      key: "role",
      header: "Role",
      render: (u) => <RoleBadge role={u.role} />,
    },
    {
      key: "name",
      header: "Name",
      render: (u) => (
        <button
          type="button"
          className="font-medium text-left hover:text-primary transition-colors"
          onClick={() => setDetailUser(u)}
          data-ocid="users-customer-row"
        >
          {u.name}
        </button>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (u) => (
        <span className="font-mono text-xs">{maskPhone(u.phone)}</span>
      ),
    },
    {
      key: "address",
      header: "Location",
      render: (u) => (
        <span className="text-muted-foreground truncate max-w-[120px] block">
          {u.address ?? "—"}
        </span>
      ),
    },
    {
      key: "joined",
      header: "Registered",
      render: (u) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {u.registrationDate
            ? new Date(Number(u.registrationDate)).toLocaleDateString("en-IN")
            : "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (u) => <StatusBadge type="boolean" value={u.isActive} />,
    },
    {
      key: "otp",
      header: "OTP",
      render: (u) => (
        <StatusBadge
          type="boolean"
          value={u.otpVerified}
          trueLabel="Verified"
          falseLabel="Pending"
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              pagination.resetPage();
            }}
            className="pl-9"
            placeholder="Search customers…"
            data-ocid="users-customer-search"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-xs text-muted-foreground whitespace-nowrap">
            From
          </Label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              pagination.resetPage();
            }}
            className="h-9 text-sm w-36"
            data-ocid="users-customer-date-from"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-xs text-muted-foreground whitespace-nowrap">
            To
          </Label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              pagination.resetPage();
            }}
            className="h-9 text-sm w-36"
            data-ocid="users-customer-date-to"
          />
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-1 text-muted-foreground"
            onClick={() => {
              setSearchInput("");
              setDateFrom("");
              setDateTo("");
              pagination.resetPage();
            }}
            data-ocid="users-customer-clear-filters"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {filtered.length} of {users.length} users
        {pagination.totalPages > 1 &&
          ` · Page ${pagination.page} of ${pagination.totalPages}`}
      </p>
      <DataTable
        columns={COLUMNS}
        data={pagination.items}
        rowKey={(u) => u.id}
        loading={isLoading}
        emptyMessage="No users found"
        data-ocid="users-customers-table"
      />
      {pagination.totalPages > 1 && (
        <div
          className="flex items-center justify-between pt-1"
          data-ocid="users.customers.pagination"
        >
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5"
            onClick={pagination.prevPage}
            disabled={pagination.page === 1}
            data-ocid="users.customers.pagination_prev"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {pagination.page} / {pagination.totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5"
            onClick={pagination.nextPage}
            disabled={pagination.page === pagination.totalPages}
            data-ocid="users.customers.pagination_next"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
      <UserDetailSheet
        user={detailUser}
        onClose={() => setDetailUser(null)}
        onToggle={() => setDetailUser(null)}
      />
    </div>
  );
}

// --- Delivery partners tab ---
function DeliveryPartnersTab() {
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);
  const { data: partners = [], isLoading } = useDeliveryPartners();
  const [detailDp, setDetailDp] = useState<DeliveryPartner | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return partners.filter((dp) => !q || dp.name.toLowerCase().includes(q));
  }, [partners, search]);

  const pagination = usePagination(filtered);

  const COLUMNS: ColumnDef<DeliveryPartner>[] = [
    {
      key: "name",
      header: "Name",
      render: (dp) => (
        <button
          type="button"
          className="font-medium text-left hover:text-primary transition-colors"
          onClick={() => setDetailDp(dp)}
          data-ocid="users-dp-row"
        >
          {dp.name}
        </button>
      ),
    },
    {
      key: "vehicle",
      header: "Vehicle",
      render: (dp) => (
        <span className="capitalize text-xs bg-muted px-2 py-0.5 rounded-full">
          {dp.vehicleType}
        </span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (dp) => (
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-sm font-medium">{dp.avgRating}</span>
          <span className="text-xs text-muted-foreground">
            ({Number(dp.ratingCount)})
          </span>
        </div>
      ),
    },
    {
      key: "online",
      header: "Online",
      render: (dp) => (
        <StatusBadge
          type="boolean"
          value={dp.isOnline}
          trueLabel="Online"
          falseLabel="Offline"
        />
      ),
    },
    {
      key: "kyc",
      header: "KYC",
      render: (dp) => (
        <StatusBadge
          type="boolean"
          value={dp.isVerified}
          trueLabel="Verified"
          falseLabel="Pending"
        />
      ),
    },
    {
      key: "ondc",
      header: "ONDC",
      render: (dp) => (
        <StatusBadge
          type="boolean"
          value={dp.isOndcEnrolled}
          trueLabel="Enrolled"
          falseLabel="No"
        />
      ),
    },
    {
      key: "registered",
      header: "Registered",
      render: (_dp) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          —
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            pagination.resetPage();
          }}
          className="pl-9"
          placeholder="Search partners…"
          data-ocid="users-dp-search"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {filtered.length} of {partners.length} partners
        {pagination.totalPages > 1 &&
          ` · Page ${pagination.page} of ${pagination.totalPages}`}
      </p>
      <DataTable
        columns={COLUMNS}
        data={pagination.items}
        rowKey={(dp) => dp.id}
        loading={isLoading}
        emptyMessage="No delivery partners found"
        data-ocid="users-dp-table"
      />
      {pagination.totalPages > 1 && (
        <div
          className="flex items-center justify-between pt-1"
          data-ocid="users.dp.pagination"
        >
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5"
            onClick={pagination.prevPage}
            disabled={pagination.page === 1}
            data-ocid="users.dp.pagination_prev"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {pagination.page} / {pagination.totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5"
            onClick={pagination.nextPage}
            disabled={pagination.page === pagination.totalPages}
            data-ocid="users.dp.pagination_next"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
      <DPDetailSheet dp={detailDp} onClose={() => setDetailDp(null)} />
    </div>
  );
}

// --- Merchants tab (redirect info) ---
function MerchantsTab() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
        <Truck className="w-8 h-8 text-purple-600" />
      </div>
      <div>
        <p className="font-semibold text-foreground">
          Merchant management is on a dedicated page
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          View detailed merchant cards, KYC documents, and store stats.
        </p>
      </div>
      <a href="/merchants">
        <Button className="gap-2" data-ocid="users-go-merchants">
          Go to Merchants
        </Button>
      </a>
    </div>
  );
}

export default function UsersPage() {
  const { data: allUsers = [] } = useUsers();

  const deliveryCount = allUsers.filter(
    (u) => u.role === UserRole.deliveryPartner,
  ).length;
  const merchantCount = allUsers.filter(
    (u) => u.role === UserRole.merchant,
  ).length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Users
        </h2>
        <p className="text-sm text-muted-foreground">
          {allUsers.length} registered users across all roles
        </p>
      </div>

      <Tabs defaultValue="customers" data-ocid="users-tabs">
        <TabsList className="mb-4">
          <TabsTrigger value="customers" data-ocid="users-tab-customers">
            All Users{" "}
            <span className="ml-1.5 text-xs opacity-70">
              ({allUsers.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="merchants" data-ocid="users-tab-merchants">
            Merchants{" "}
            <span className="ml-1.5 text-xs opacity-70">({merchantCount})</span>
          </TabsTrigger>
          <TabsTrigger value="delivery" data-ocid="users-tab-delivery">
            Delivery Partners
            <span className="ml-1.5 text-xs opacity-70">({deliveryCount})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <CustomersTab />
        </TabsContent>
        <TabsContent value="merchants">
          <MerchantsTab />
        </TabsContent>
        <TabsContent value="delivery">
          <DeliveryPartnersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
