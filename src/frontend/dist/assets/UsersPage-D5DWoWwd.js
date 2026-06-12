import { r as reactExports, j as jsxRuntimeExports, B as useUsers, U as UserRole, y as useDeliveryPartners } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-g1LGwGv2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { C as ChevronLeft } from "./chevron-left-DzxTPwXv.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { S as StatusBadge } from "./StatusBadge-DNkrizJz.js";
import { u as useDebounce, a as usePagination } from "./usePagination-hWnqFD6I.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { X } from "./x-Chksmd6i.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { S as Star } from "./star-DbleSGPY.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-yUS8KoxU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
function DataTable({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = "No data found",
  emptyIcon,
  pageSize = 10,
  "data-ocid": dataOcid
}) {
  const [page, setPage] = reactExports.useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
          children: col.header
        },
        col.key
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Array.from({ length: 4 }, (_, i) => `skeleton-row-${i}`).map(
        (rowId) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "tr",
          {
            className: "border-b border-border/50 last:border-0",
            children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full max-w-[120px]" }) }, col.key))
          },
          rowId
        )
      ) })
    ] }) });
  }
  if (data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto rounded-xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "data-table", children: /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
          children: col.header
        },
        col.key
      )) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
          "data-ocid": "table-empty-state",
          children: [
            emptyIcon ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-10 h-10 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: emptyMessage })
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": dataOcid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: `px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap ${col.className ?? ""}`,
          children: col.header
        },
        col.key
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedData.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "tr",
        {
          className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
          "data-ocid": "table-row",
          children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: `px-4 py-3 text-sm text-foreground ${col.className ?? ""}`,
              children: col.render(row)
            },
            col.key
          ))
        },
        rowKey ? rowKey(row, i) : `row-${(page - 1) * pageSize + i}`
      )) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Showing ",
        (page - 1) * pageSize + 1,
        "–",
        Math.min(page * pageSize, data.length),
        " of ",
        data.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            disabled: page === 1,
            className: "p-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
            "aria-label": "Previous page",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-2", children: [
          page,
          " / ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            disabled: page === totalPages,
            className: "p-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
            "aria-label": "Next page",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          }
        )
      ] })
    ] })
  ] });
}
function maskPhone(phone) {
  return phone;
}
function UserDetailSheet({
  user,
  onClose,
  onToggle
}) {
  if (!user) return null;
  const registrationDateStr = user.registrationDate ? new Date(Number(user.registrationDate)).toLocaleDateString("en-IN") : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!user, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-md overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: user.name }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
        { label: "User ID", value: user.id },
        { label: "Role", value: user.role },
        { label: "Phone", value: maskPhone(user.phone) },
        { label: "OTP Verified", value: user.otpVerified ? "Yes" : "No" },
        { label: "Status", value: user.isActive ? "Active" : "Inactive" },
        { label: "Registered", value: registrationDateStr }
      ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mt-0.5 truncate", children: value })
      ] }, label)) }),
      user.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3 flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: user.address })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: user.isActive ? "destructive" : "default",
          onClick: () => onToggle(user.id),
          className: "w-full",
          "data-ocid": "user-detail-toggle",
          children: user.isActive ? "Deactivate User" : "Activate User"
        }
      )
    ] })
  ] }) });
}
function DPDetailSheet({
  dp,
  onClose
}) {
  if (!dp) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!dp, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-md overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: dp.name }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
        { label: "Partner ID", value: dp.id },
        { label: "Vehicle", value: dp.vehicleType },
        { label: "Rate/km", value: `₹${dp.ratePerKm}` },
        {
          label: "Rating",
          value: `${dp.avgRating} (${Number(dp.ratingCount)} ratings)`
        },
        { label: "Online", value: dp.isOnline ? "Yes" : "No" },
        { label: "KYC", value: dp.isVerified ? "Verified" : "Pending" },
        {
          label: "ONDC",
          value: dp.isOndcEnrolled ? "Enrolled" : "Not Enrolled"
        }
      ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mt-0.5 truncate", children: value })
      ] }, label)) }),
      dp.currentLocation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-3 flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: dp.currentLocation.address })
      ] }),
      dp.otherPlatforms && dp.otherPlatforms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5", children: "Also on" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: dp.otherPlatforms.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: p }, p)) })
      ] })
    ] })
  ] }) });
}
const ROLE_COLORS = {
  [UserRole.customer]: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  [UserRole.merchant]: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  [UserRole.deliveryPartner]: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  [UserRole.sarthi]: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  [UserRole.admin]: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
};
function RoleBadge({ role }) {
  const cls = ROLE_COLORS[role] ?? "bg-muted text-muted-foreground";
  const label = role.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${cls}`,
      children: label
    }
  );
}
function CustomersTab() {
  const [searchInput, setSearchInput] = reactExports.useState("");
  const search = useDebounce(searchInput, 300);
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const { data: users = [], isLoading } = useUsers();
  const [detailUser, setDetailUser] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
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
  const COLUMNS = [
    {
      key: "role",
      header: "Role",
      render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: u.role })
    },
    {
      key: "name",
      header: "Name",
      render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "font-medium text-left hover:text-primary transition-colors",
          onClick: () => setDetailUser(u),
          "data-ocid": "users-customer-row",
          children: u.name
        }
      )
    },
    {
      key: "phone",
      header: "Phone",
      render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: maskPhone(u.phone) })
    },
    {
      key: "address",
      header: "Location",
      render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate max-w-[120px] block", children: u.address ?? "—" })
    },
    {
      key: "joined",
      header: "Registered",
      render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: u.registrationDate ? new Date(Number(u.registrationDate)).toLocaleDateString("en-IN") : "—" })
    },
    {
      key: "status",
      header: "Status",
      render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "boolean", value: u.isActive })
    },
    {
      key: "otp",
      header: "OTP",
      render: (u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          type: "boolean",
          value: u.otpVerified,
          trueLabel: "Verified",
          falseLabel: "Pending"
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: searchInput,
            onChange: (e) => {
              setSearchInput(e.target.value);
              pagination.resetPage();
            },
            className: "pl-9",
            placeholder: "Search customers…",
            "data-ocid": "users-customer-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground whitespace-nowrap", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateFrom,
            onChange: (e) => {
              setDateFrom(e.target.value);
              pagination.resetPage();
            },
            className: "h-9 text-sm w-36",
            "data-ocid": "users-customer-date-from"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground whitespace-nowrap", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateTo,
            onChange: (e) => {
              setDateTo(e.target.value);
              pagination.resetPage();
            },
            className: "h-9 text-sm w-36",
            "data-ocid": "users-customer-date-to"
          }
        )
      ] }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-9 gap-1 text-muted-foreground",
          onClick: () => {
            setSearchInput("");
            setDateFrom("");
            setDateTo("");
            pagination.resetPage();
          },
          "data-ocid": "users-customer-clear-filters",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
            " Clear"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      filtered.length,
      " of ",
      users.length,
      " users",
      pagination.totalPages > 1 && ` · Page ${pagination.page} of ${pagination.totalPages}`
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns: COLUMNS,
        data: pagination.items,
        rowKey: (u) => u.id,
        loading: isLoading,
        emptyMessage: "No users found",
        "data-ocid": "users-customers-table"
      }
    ),
    pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between pt-1",
        "data-ocid": "users.customers.pagination",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1.5",
              onClick: pagination.prevPage,
              disabled: pagination.page === 1,
              "data-ocid": "users.customers.pagination_prev",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                " Prev"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground tabular-nums", children: [
            pagination.page,
            " / ",
            pagination.totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1.5",
              onClick: pagination.nextPage,
              disabled: pagination.page === pagination.totalPages,
              "data-ocid": "users.customers.pagination_next",
              children: [
                "Next ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserDetailSheet,
      {
        user: detailUser,
        onClose: () => setDetailUser(null),
        onToggle: () => setDetailUser(null)
      }
    )
  ] });
}
function DeliveryPartnersTab() {
  const [searchInput, setSearchInput] = reactExports.useState("");
  const search = useDebounce(searchInput, 300);
  const { data: partners = [], isLoading } = useDeliveryPartners();
  const [detailDp, setDetailDp] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase();
    return partners.filter((dp) => !q || dp.name.toLowerCase().includes(q));
  }, [partners, search]);
  const pagination = usePagination(filtered);
  const COLUMNS = [
    {
      key: "name",
      header: "Name",
      render: (dp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "font-medium text-left hover:text-primary transition-colors",
          onClick: () => setDetailDp(dp),
          "data-ocid": "users-dp-row",
          children: dp.name
        }
      )
    },
    {
      key: "vehicle",
      header: "Vehicle",
      render: (dp) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-xs bg-muted px-2 py-0.5 rounded-full", children: dp.vehicleType })
    },
    {
      key: "rating",
      header: "Rating",
      render: (dp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-amber-500 fill-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: dp.avgRating }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          Number(dp.ratingCount),
          ")"
        ] })
      ] })
    },
    {
      key: "online",
      header: "Online",
      render: (dp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          type: "boolean",
          value: dp.isOnline,
          trueLabel: "Online",
          falseLabel: "Offline"
        }
      )
    },
    {
      key: "kyc",
      header: "KYC",
      render: (dp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          type: "boolean",
          value: dp.isVerified,
          trueLabel: "Verified",
          falseLabel: "Pending"
        }
      )
    },
    {
      key: "ondc",
      header: "ONDC",
      render: (dp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          type: "boolean",
          value: dp.isOndcEnrolled,
          trueLabel: "Enrolled",
          falseLabel: "No"
        }
      )
    },
    {
      key: "registered",
      header: "Registered",
      render: (_dp) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: "—" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: searchInput,
          onChange: (e) => {
            setSearchInput(e.target.value);
            pagination.resetPage();
          },
          className: "pl-9",
          placeholder: "Search partners…",
          "data-ocid": "users-dp-search"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      filtered.length,
      " of ",
      partners.length,
      " partners",
      pagination.totalPages > 1 && ` · Page ${pagination.page} of ${pagination.totalPages}`
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns: COLUMNS,
        data: pagination.items,
        rowKey: (dp) => dp.id,
        loading: isLoading,
        emptyMessage: "No delivery partners found",
        "data-ocid": "users-dp-table"
      }
    ),
    pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between pt-1",
        "data-ocid": "users.dp.pagination",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1.5",
              onClick: pagination.prevPage,
              disabled: pagination.page === 1,
              "data-ocid": "users.dp.pagination_prev",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                " Prev"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground tabular-nums", children: [
            pagination.page,
            " / ",
            pagination.totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1.5",
              onClick: pagination.nextPage,
              disabled: pagination.page === pagination.totalPages,
              "data-ocid": "users.dp.pagination_next",
              children: [
                "Next ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DPDetailSheet, { dp: detailDp, onClose: () => setDetailDp(null) })
  ] });
}
function MerchantsTab() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-8 h-8 text-purple-600" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Merchant management is on a dedicated page" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "View detailed merchant cards, KYC documents, and store stats." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/merchants", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "gap-2", "data-ocid": "users-go-merchants", children: "Go to Merchants" }) })
  ] });
}
function UsersPage() {
  const { data: allUsers = [] } = useUsers();
  const deliveryCount = allUsers.filter(
    (u) => u.role === UserRole.deliveryPartner
  ).length;
  const merchantCount = allUsers.filter(
    (u) => u.role === UserRole.merchant
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Users" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        allUsers.length,
        " registered users across all roles"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "customers", "data-ocid": "users-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "customers", "data-ocid": "users-tab-customers", children: [
          "All Users",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
            "(",
            allUsers.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "merchants", "data-ocid": "users-tab-merchants", children: [
          "Merchants",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
            "(",
            merchantCount,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "delivery", "data-ocid": "users-tab-delivery", children: [
          "Delivery Partners",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
            "(",
            deliveryCount,
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "customers", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomersTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "merchants", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MerchantsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "delivery", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryPartnersTab, {}) })
    ] })
  ] });
}
export {
  UsersPage as default
};
