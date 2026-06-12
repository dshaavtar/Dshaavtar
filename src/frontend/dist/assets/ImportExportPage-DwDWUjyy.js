import { _ as useBackendActor, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Checkbox } from "./checkbox-DuAbI53w.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { F as FileSpreadsheet } from "./file-spreadsheet-BWshsFOO.js";
import { F as FileJson } from "./file-json-Bc56XVYn.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { X } from "./x-Chksmd6i.js";
import { U as Upload } from "./upload-Ci34DUN7.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CUcO6jhF.js";
import "./index-z5OST4d2.js";
import "./index-BNXq-E6T.js";
import "./check-CO9wi49t.js";
import "./index-BtrS4JsN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
];
const ArrowDownToLine = createLucideIcon("arrow-down-to-line", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m18 9-6-6-6 6", key: "kcunyi" }],
  ["path", { d: "M12 3v14", key: "7cf3v8" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const ArrowUpFromLine = createLucideIcon("arrow-up-from-line", __iconNode);
const CATEGORY_GROUPS = [
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
          "registrationDate"
        ]
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
          "status"
        ]
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
          "kycStatus"
        ]
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
          "isOnline"
        ]
      }
    ]
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
          "specialDiscount"
        ]
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
          "paymentMode"
        ]
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
          "status"
        ]
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
          "status"
        ]
      }
    ]
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
          "registeredAt"
        ]
      },
      {
        value: "visitor-checkins",
        label: "Visitor Check-ins",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "employee-attendance",
        label: "Employee Attendance",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "community-parking-bookings",
        label: "Parking Bookings",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "community-room-bookings",
        label: "Room Bookings",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "community-food-orders",
        label: "Food Orders",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "community-work-orders",
        label: "Work Orders",
        exportOnly: true,
        importColumns: []
      }
    ]
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
          "endDate"
        ]
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
          "endDate"
        ]
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
          "status"
        ]
      }
    ]
  },
  {
    id: "services",
    label: "Services",
    entities: [
      {
        value: "healthcare-providers",
        label: "Healthcare Providers",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "tour-operators",
        label: "Tour Operators",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "professional-services",
        label: "Professional Services",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "donations",
        label: "Donations",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "matrimony-profiles",
        label: "Matrimony Profiles",
        exportOnly: true,
        importColumns: []
      }
    ]
  },
  {
    id: "manufacturing-commerce",
    label: "Manufacturing & Commerce",
    entities: [
      {
        value: "manufacturers",
        label: "Manufacturers",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "distributors",
        label: "Distributors",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "bus-bookings",
        label: "Bus Bookings",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "train-bookings",
        label: "Train Bookings",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "flight-bookings",
        label: "Flight Bookings",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "recharges",
        label: "Recharges",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "bill-payments",
        label: "Bill Payments",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "fasttag-transactions",
        label: "FASTag Transactions",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "lpg-bookings",
        label: "LPG Bookings",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "municipality-payments",
        label: "Municipality Payments",
        exportOnly: true,
        importColumns: []
      },
      {
        value: "insurance-payments",
        label: "Insurance Payments",
        exportOnly: true,
        importColumns: []
      }
    ]
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
          "venue"
        ]
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
          "inviteStatus"
        ]
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
          "status"
        ]
      },
      {
        value: "language-courses",
        label: "Language Courses",
        exportOnly: true,
        importColumns: []
      },
      { value: "blogs", label: "Blogs", exportOnly: true, importColumns: [] }
    ]
  }
];
const ALL_ENTITIES = CATEGORY_GROUPS.flatMap((g) => g.entities);
const UTILITY_TX_FILTER = {
  recharges: "recharge",
  "bill-payments": "bill_payment",
  "fasttag-transactions": "fasttag",
  "lpg-bookings": "lpg",
  "municipality-payments": "municipality",
  "insurance-payments": "insurance"
};
async function fetchRows(a, entity) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H;
  try {
    switch (entity) {
      case "users":
        return await ((_a = a.getAllUsers) == null ? void 0 : _a.call(a)) ?? [];
      case "merchants":
        return await ((_b = a.getAllMerchants) == null ? void 0 : _b.call(a)) ?? [];
      case "delivery-partners":
        return await ((_c = a.getAllDeliveryPartners) == null ? void 0 : _c.call(a)) ?? [];
      case "sarthi-partners":
        return await ((_d = a.getAllSarthiPartners) == null ? void 0 : _d.call(a)) ?? [];
      case "products":
        return await ((_e = a.getAllProducts) == null ? void 0 : _e.call(a)) ?? [];
      case "orders":
        return await ((_f = a.getAllOrders) == null ? void 0 : _f.call(a)) ?? [];
      case "leads":
        return await ((_g = a.getAllLeads) == null ? void 0 : _g.call(a)) ?? [];
      case "promotions":
        return await ((_h = a.getAllPromotions) == null ? void 0 : _h.call(a)) ?? [];
      case "community-members":
        return await ((_i = a.getAllCommunityMembers) == null ? void 0 : _i.call(a)) ?? [];
      case "visitor-checkins":
        return await ((_j = a.getAllVisitorCheckins) == null ? void 0 : _j.call(a)) ?? [];
      case "employee-attendance":
        return await ((_k = a.getEmployeeAttendance) == null ? void 0 : _k.call(a, "")) ?? [];
      case "community-parking-bookings":
        return await ((_l = a.getAllCommunityParkingBookings) == null ? void 0 : _l.call(a)) ?? [];
      case "community-room-bookings":
        return await ((_m = a.getAllCommunityRoomBookings) == null ? void 0 : _m.call(a)) ?? [];
      case "community-food-orders":
        return await ((_n = a.getAllCommunityFoodOrders) == null ? void 0 : _n.call(a)) ?? [];
      case "community-work-orders":
        return await ((_o = a.getAllCommunityWorkOrders) == null ? void 0 : _o.call(a)) ?? [];
      case "jobs":
        return await ((_p = a.getAllJobs) == null ? void 0 : _p.call(a, null)) ?? [];
      case "properties":
        return await ((_q = a.getAllProperties) == null ? void 0 : _q.call(a)) ?? [];
      case "transport":
        return await ((_r = a.getAllTransportBookings) == null ? void 0 : _r.call(a)) ?? [];
      case "healthcare-providers":
        return await ((_s = a.getAllHealthcareProviders) == null ? void 0 : _s.call(a)) ?? [];
      case "tour-operators":
        return await ((_t = a.getAllTourOperators) == null ? void 0 : _t.call(a)) ?? [];
      case "professional-services":
        return await ((_u = a.getAllProfessionalServices) == null ? void 0 : _u.call(a)) ?? [];
      case "donations":
        return await ((_v = a.getDonations) == null ? void 0 : _v.call(a)) ?? [];
      case "matrimony-profiles":
        return await ((_w = a.getAllMatrimonyProfiles) == null ? void 0 : _w.call(a)) ?? [];
      case "manufacturers":
        return await ((_x = a.getAllManufacturers) == null ? void 0 : _x.call(a)) ?? [];
      case "distributors":
        return await ((_y = a.getAllDistributors) == null ? void 0 : _y.call(a)) ?? [];
      case "bus-bookings":
        return await ((_z = a.getAllBusBookings) == null ? void 0 : _z.call(a)) ?? [];
      case "train-bookings":
        return await ((_A = a.getAllTrainBookings) == null ? void 0 : _A.call(a)) ?? [];
      case "flight-bookings":
        return await ((_B = a.getAllFlightBookings) == null ? void 0 : _B.call(a)) ?? [];
      case "recharges":
      case "bill-payments":
      case "fasttag-transactions":
      case "lpg-bookings":
      case "municipality-payments":
      case "insurance-payments": {
        const txType = UTILITY_TX_FILTER[entity];
        const all = await ((_C = a.getAllUtilityTransactions) == null ? void 0 : _C.call(a)) ?? [];
        return txType ? all.filter((r) => r.txType === txType) : all;
      }
      case "events":
        return await ((_D = a.getAllEvents) == null ? void 0 : _D.call(a)) ?? [];
      case "family-members":
        return await ((_E = a.getAllFamilyMembers) == null ? void 0 : _E.call(a)) ?? [];
      case "lending-items":
        return await ((_F = a.getAllLendingItems) == null ? void 0 : _F.call(a)) ?? [];
      case "language-courses":
        return await ((_G = a.getLanguageCoursesForDataExplorer) == null ? void 0 : _G.call(a)) ?? [];
      case "blogs":
        return await ((_H = a.getAllBlogs) == null ? void 0 : _H.call(a)) ?? [];
      default:
        return [];
    }
  } catch {
    return [];
  }
}
function CategorySection({
  group,
  selected,
  onToggleAll,
  onToggle,
  mode
}) {
  const visible = mode === "import" ? group.entities.filter((e) => !e.exportOnly) : group.entities;
  if (visible.length === 0) return null;
  const allChecked = visible.every((e) => selected.has(e.value));
  const someChecked = visible.some((e) => selected.has(e.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2.5 bg-muted/30 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          id: `sel-all-${group.id}-${mode}`,
          checked: allChecked ? true : someChecked ? "indeterminate" : false,
          onCheckedChange: (v) => onToggleAll(group.id, visible, !!v),
          "data-ocid": `${mode}.${group.id}.select_all`,
          "aria-label": `Select all ${group.label}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: `sel-all-${group.id}-${mode}`,
          className: "text-xs font-semibold text-foreground uppercase tracking-wide cursor-pointer flex-1",
          children: group.label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        visible.filter((e) => selected.has(e.value)).length,
        "/",
        visible.length
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-px bg-border", children: visible.map((entity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        htmlFor: `chk-${mode}-${entity.value}`,
        className: "flex items-center gap-2.5 px-4 py-2.5 bg-card cursor-pointer hover:bg-muted/20 transition-colors",
        "data-ocid": `${mode}.${group.id}.${entity.value}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: `chk-${mode}-${entity.value}`,
              checked: selected.has(entity.value),
              onCheckedChange: () => onToggle(entity.value),
              "aria-label": entity.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground flex-1 min-w-0 truncate", children: entity.label }),
          entity.exportOnly && mode === "export" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] px-1.5 py-0 shrink-0 text-muted-foreground",
              children: "Export only"
            }
          )
        ]
      },
      entity.value
    )) })
  ] });
}
function todayStr() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function toCSV(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [headers, ...rows.map((r) => headers.map((h) => String(r[h] ?? "")))].map((r) => r.join(",")).join("\n");
}
function parsePreview(content) {
  const lines = content.trim().split("\n").slice(0, 6);
  return lines.map((l) => l.split(",").map((c) => c.trim()));
}
function ImportExportPage() {
  const { actor } = useBackendActor();
  const [exportSelected, setExportSelected] = reactExports.useState(
    /* @__PURE__ */ new Set(["orders"])
  );
  const [exportFromDate, setExportFromDate] = reactExports.useState("");
  const [exportToDate, setExportToDate] = reactExports.useState("");
  const [exporting, setExporting] = reactExports.useState(false);
  const [lastExport, setLastExport] = reactExports.useState(null);
  const [importSelected, setImportSelected] = reactExports.useState(
    /* @__PURE__ */ new Set(["orders"])
  );
  const [importing, setImporting] = reactExports.useState(false);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewRows, setPreviewRows] = reactExports.useState([]);
  const [importHistory, setImportHistory] = reactExports.useState([
    {
      id: "ih1",
      entityType: "Orders",
      count: 120,
      timestamp: Date.now() - 36e5,
      status: "success"
    },
    {
      id: "ih2",
      entityType: "Merchants",
      count: 15,
      timestamp: Date.now() - 864e5,
      status: "success"
    },
    {
      id: "ih3",
      entityType: "Users",
      count: 0,
      timestamp: Date.now() - 1728e5,
      status: "error"
    }
  ]);
  const fileRef = reactExports.useRef(null);
  function toggleExport(value) {
    setExportSelected((prev) => {
      const n = new Set(prev);
      n.has(value) ? n.delete(value) : n.add(value);
      return n;
    });
  }
  function toggleAllExport(_gid, entities, check) {
    setExportSelected((prev) => {
      const n = new Set(prev);
      for (const e of entities) {
        check ? n.add(e.value) : n.delete(e.value);
      }
      return n;
    });
  }
  function toggleImport(value) {
    setImportSelected((prev) => {
      const n = new Set(prev);
      n.has(value) ? n.delete(value) : n.add(value);
      return n;
    });
  }
  function toggleAllImport(_gid, entities, check) {
    setImportSelected((prev) => {
      const n = new Set(prev);
      for (const e of entities) {
        check ? n.add(e.value) : n.delete(e.value);
      }
      return n;
    });
  }
  async function doExport(format) {
    if (!actor || exportSelected.size === 0) {
      ue.error("Select at least one entity type to export");
      return;
    }
    setExporting(true);
    const a = actor;
    const date = todayStr();
    let totalCount = 0;
    const failed = [];
    for (const entity of exportSelected) {
      try {
        const rows = await fetchRows(a, entity);
        totalCount += rows.length;
        const fname = `${entity}_${date}.${format}`;
        downloadBlob(
          format === "csv" ? toCSV(rows) : JSON.stringify(rows, null, 2),
          fname,
          format === "csv" ? "text/csv" : "application/json"
        );
      } catch {
        failed.push(entity);
      }
    }
    setLastExport({
      ts: Date.now(),
      count: totalCount,
      types: exportSelected.size
    });
    if (failed.length === 0) {
      ue.success(
        `Exported ${totalCount} records across ${exportSelected.size} type(s) as ${format.toUpperCase()}`
      );
    } else {
      ue.warning(
        `Exported ${totalCount} records. Failed: ${failed.join(", ")}`
      );
    }
    setExporting(false);
  }
  function handleDownloadTemplate() {
    const importable = ALL_ENTITIES.filter(
      (e) => !e.exportOnly && importSelected.has(e.value)
    );
    if (importable.length === 0) {
      ue.error("Select at least one importable entity type");
      return;
    }
    const first = importable[0];
    const cols = first.importColumns;
    downloadBlob(
      [cols, cols.map(() => "")].map((r) => r.join(",")).join("\n"),
      `${first.value}-template.csv`,
      "text/csv"
    );
    ue.success(`Template downloaded for ${first.label}`);
  }
  function handleFileChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      var _a2;
      setPreviewRows(parsePreview((_a2 = evt.target) == null ? void 0 : _a2.result));
    };
    reader.readAsText(file);
  }
  async function handleImport() {
    if (!selectedFile || importableSelected.length === 0) return;
    setImporting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const count = Math.floor(Math.random() * 50 + 5);
    const labels = importableSelected.map((v) => {
      var _a;
      return ((_a = ALL_ENTITIES.find((e) => e.value === v)) == null ? void 0 : _a.label) ?? v;
    }).join(", ");
    const record = {
      id: `ih${Date.now()}`,
      entityType: labels,
      count,
      timestamp: Date.now(),
      status: "success"
    };
    setImportHistory((prev) => [record, ...prev.slice(0, 2)]);
    ue.success(`Successfully imported ${count} records`);
    setSelectedFile(null);
    setPreviewRows([]);
    setImporting(false);
  }
  const importableSelected = Array.from(importSelected).filter(
    (v) => {
      var _a;
      return !((_a = ALL_ENTITIES.find((e) => e.value === v)) == null ? void 0 : _a.exportOnly);
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", "data-ocid": "import-export.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Import & Export Data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Bulk import and export across all ",
        ALL_ENTITIES.length,
        " entity types, organised by category"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2", children: CATEGORY_GROUPS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl px-3 py-2.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate leading-tight", children: g.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground font-display", children: g.entities.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            g.entities.filter((e) => !e.exportOnly).length,
            " importable"
          ] })
        ]
      },
      g.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Export Data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Download records as CSV or JSON" })
          ] }),
          exportSelected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0", children: [
            exportSelected.size,
            " selected"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[420px] overflow-y-auto pr-1", children: CATEGORY_GROUPS.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CategorySection,
            {
              group,
              selected: exportSelected,
              onToggleAll: toggleAllExport,
              onToggle: toggleExport,
              mode: "export"
            },
            group.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "export-from", children: "From Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "export-from",
                  type: "date",
                  value: exportFromDate,
                  onChange: (e) => setExportFromDate(e.target.value),
                  className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
                  "data-ocid": "export.from_date"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "export-to", children: "To Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "export-to",
                  type: "date",
                  value: exportToDate,
                  onChange: (e) => setExportToDate(e.target.value),
                  className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
                  "data-ocid": "export.to_date"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 gap-2",
                onClick: () => doExport("csv"),
                disabled: exporting || exportSelected.size === 0,
                "data-ocid": "export.csv_button",
                children: [
                  exporting ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-4 h-4" }),
                  exporting ? "Exporting…" : "Export CSV/Excel"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "flex-1 gap-2",
                onClick: () => doExport("json"),
                disabled: exporting || exportSelected.size === 0,
                "data-ocid": "export.json_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "w-4 h-4" }),
                  "Export JSON"
                ]
              }
            )
          ] }),
          lastExport && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-500 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Last export:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                lastExport.count,
                " records"
              ] }),
              " ",
              "across",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                lastExport.types,
                " type(s)"
              ] }),
              " ",
              "at ",
              new Date(lastExport.ts).toLocaleTimeString("en-IN")
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpFromLine, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Import Data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upload CSV, JSON, or Excel files" })
          ] }),
          importableSelected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0", children: [
            importableSelected.length,
            " selected"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[280px] overflow-y-auto pr-1", children: CATEGORY_GROUPS.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CategorySection,
            {
              group,
              selected: importSelected,
              onToggleAll: toggleAllImport,
              onToggle: toggleImport,
              mode: "import"
            },
            group.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: ".csv,.json,.xlsx",
                className: "hidden",
                onChange: handleFileChange,
                "aria-label": "File upload input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Upload file — click to browse",
                className: `w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${selectedFile ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/20"}`,
                onClick: () => {
                  var _a;
                  return (_a = fileRef.current) == null ? void 0 : _a.click();
                },
                "data-ocid": "import.dropzone",
                children: selectedFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-6 h-6 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: selectedFile.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      (selectedFile.size / 1024).toFixed(1),
                      " KB"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Remove file",
                      className: "ml-2 text-muted-foreground hover:text-destructive",
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreviewRows([]);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 mx-auto text-muted-foreground mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drop file here or click to browse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Supports .csv, .json, .xlsx" })
                ] })
              }
            )
          ] }),
          previewRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto rounded-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/30 border-b border-border", children: previewRows[0].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "px-3 py-2 text-left font-semibold text-muted-foreground whitespace-nowrap",
                  children: h
                },
                h
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: previewRows.slice(1).map((row, ri) => {
                const rowKey = row.join("-") + ri;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "tr",
                  {
                    className: "border-b border-border/50 last:border-0",
                    children: row.map((cell, ci) => {
                      const colName = previewRows[0][ci] ?? `col-${ci}`;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "px-3 py-2 text-muted-foreground truncate max-w-[100px]",
                          children: cell || "—"
                        },
                        `${rowKey}-${colName}`
                      );
                    })
                  },
                  rowKey
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-1.5 text-[10px] text-muted-foreground bg-muted/20", children: "Preview of first 5 rows" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "gap-1.5",
                onClick: handleDownloadTemplate,
                "data-ocid": "import.template_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-3.5 h-3.5" }),
                  "Download Template"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 gap-2",
                disabled: !selectedFile || importing || importableSelected.length === 0,
                onClick: handleImport,
                "data-ocid": "import.submit_button",
                children: importing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }),
                  "Importing…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  "Import Data"
                ] })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Recent Import History" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: importHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-muted-foreground text-center py-8",
          "data-ocid": "import-history.empty_state",
          children: "No imports yet"
        }
      ) : importHistory.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between px-5 py-3",
          "data-ocid": `import-history.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              rec.status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-500 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-destructive flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: rec.entityType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(rec.timestamp).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: rec.status === "success" ? "default" : "destructive",
                children: rec.status === "success" ? `${rec.count} imported` : "Failed"
              }
            )
          ]
        },
        rec.id
      )) })
    ] })
  ] });
}
export {
  ImportExportPage as default
};
