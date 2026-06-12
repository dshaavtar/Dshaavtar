import { j as jsxRuntimeExports, ez as useGetManufacturerEmployees, eA as useAddManufacturerEmployee, eB as useUpdateManufacturerEmployee, r as reactExports, eC as useRecordManufacturerEmployeeAttendance, eD as useGetManufacturerEmployeeAttendance, eE as useGetManufacturerLeaveRequests, eF as useApproveManufacturerLeave, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent } from "./card-Dx8tJeYi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { C as Calendar } from "./calendar-DOvJee1H.js";
import { L as LogOut } from "./log-out-Bs9IUFS8.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
const EMPLOYEE_ROLES = [
  "Sale",
  "Purchase",
  "Restock",
  "Inventory",
  "Expiry",
  "Complaints",
  "Accounts",
  "Bills",
  "General"
];
const MFR_ID = "manufacturer-1";
function EmployeesTab() {
  const { data: employees = [], isLoading } = useGetManufacturerEmployees(MFR_ID);
  const addEmployee = useAddManufacturerEmployee();
  const updateEmployee = useUpdateManufacturerEmployee();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ name: "", phone: "", role: "General" });
  const handleAdd = async () => {
    if (!form.name || !form.phone) {
      ue.error("Name and phone are required");
      return;
    }
    try {
      await addEmployee.mutateAsync({ manufacturerId: MFR_ID, ...form });
      ue.success("Employee added");
      setShowAdd(false);
      setForm({ name: "", phone: "", role: "General" });
    } catch (e) {
      ue.error(e.message);
    }
  };
  const toggleActive = async (id, mfrId, current) => {
    try {
      await updateEmployee.mutateAsync({
        employeeId: id,
        manufacturerId: mfrId,
        isActive: !current
      });
      ue.success(current ? "Employee deactivated" : "Employee activated");
    } catch (e) {
      ue.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Team Members" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => setShowAdd(true),
          "data-ocid": "mfr-employees.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
            " Add Employee"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : employees.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContent,
      {
        className: "flex flex-col items-center gap-2 py-12 text-center",
        "data-ocid": "mfr-employees.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No employees yet. Add your first team member." })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: employees.map((emp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20",
          "data-ocid": `mfr-employees.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: emp.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: emp.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: emp.role }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: emp.isActive ? "default" : "outline", children: emp.isActive ? "Active" : "Inactive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => toggleActive(emp.id, emp.manufacturerId, emp.isActive),
                "data-ocid": `mfr-employees.toggle.${i + 1}`,
                children: emp.isActive ? "Deactivate" : "Activate"
              }
            ) })
          ]
        },
        emp.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "mfr-employees.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Employee" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "Full name",
              "data-ocid": "mfr-employees.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
              placeholder: "+91 XXXXX XXXXX",
              "data-ocid": "mfr-employees.phone_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.role,
              onValueChange: (v) => setForm((f) => ({ ...f, role: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "mfr-employees.role_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EMPLOYEE_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowAdd(false),
              "data-ocid": "mfr-employees.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleAdd,
              disabled: addEmployee.isPending,
              "data-ocid": "mfr-employees.submit_button",
              children: addEmployee.isPending ? "Adding..." : "Add Employee"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function AttendanceTab() {
  const { data: employees = [] } = useGetManufacturerEmployees(MFR_ID);
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = reactExports.useState(today);
  const [selectedEmp, setSelectedEmp] = reactExports.useState("");
  const [showRecord, setShowRecord] = reactExports.useState(false);
  const [action, setAction] = reactExports.useState("checkin");
  const [notes, setNotes] = reactExports.useState("");
  const recordAttendance = useRecordManufacturerEmployeeAttendance();
  const { data: records = [], isLoading } = useGetManufacturerEmployeeAttendance(selectedEmp, selectedDate);
  const handleRecord = async () => {
    if (!selectedEmp) {
      ue.error("Select an employee");
      return;
    }
    try {
      await recordAttendance.mutateAsync({
        employeeId: selectedEmp,
        manufacturerId: MFR_ID,
        date: selectedDate,
        action,
        notes
      });
      ue.success(
        `${action === "checkin" ? "Check-in" : "Check-out"} recorded`
      );
      setShowRecord(false);
      setNotes("");
    } catch (e) {
      ue.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: selectedDate,
            onChange: (e) => setSelectedDate(e.target.value),
            className: "w-40",
            "data-ocid": "mfr-attendance.date_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Employee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedEmp, onValueChange: setSelectedEmp, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "w-48",
              "data-ocid": "mfr-attendance.employee_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All employees" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: employees.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: e.id, children: e.name }, e.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => setShowRecord(true),
          "data-ocid": "mfr-attendance.record_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mr-1 h-4 w-4" }),
            " Record Attendance"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }) : records.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContent,
      {
        className: "flex flex-col items-center gap-2 py-10 text-center",
        "data-ocid": "mfr-attendance.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No attendance records for this selection." })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Employee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Check In" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Check Out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Notes" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: records.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20",
          "data-ocid": `mfr-attendance.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: r.employeeId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: r.checkInTime ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3 w-3" }),
              r.checkInTime
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: r.checkOutTime ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-orange-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3 w-3" }),
              r.checkOutTime
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: r.notes ?? "—" })
          ]
        },
        r.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showRecord, onOpenChange: setShowRecord, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "mfr-attendance.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Record Attendance" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Employee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedEmp, onValueChange: setSelectedEmp, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "mfr-attendance.dialog_employee_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select employee" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: employees.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: e.id, children: e.name }, e.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: action,
              onValueChange: (v) => setAction(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "mfr-attendance.action_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "checkin", children: "Check In" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "checkout", children: "Check Out" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Optional notes",
              "data-ocid": "mfr-attendance.notes_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowRecord(false),
              "data-ocid": "mfr-attendance.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleRecord,
              disabled: recordAttendance.isPending,
              "data-ocid": "mfr-attendance.submit_button",
              children: recordAttendance.isPending ? "Saving..." : "Record"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function LeaveRequestsTab() {
  const { data: leaves = [], isLoading } = useGetManufacturerLeaveRequests(MFR_ID);
  const approve = useApproveManufacturerLeave();
  const handleAction = async (leaveId, approv) => {
    try {
      await approve.mutateAsync({
        leaveId,
        manufacturerId: MFR_ID,
        approve: approv
      });
      ue.success(approv ? "Leave approved" : "Leave rejected");
    } catch (e) {
      ue.error(e.message);
    }
  };
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Leave Requests" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, k)) }) : leaves.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContent,
      {
        className: "flex flex-col items-center gap-2 py-10 text-center",
        "data-ocid": "mfr-leaves.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No leave requests found." })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: leaves.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": `mfr-leaves.item.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: l.employeeName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[l.status] ?? ""}`,
              children: l.status
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          l.leaveType,
          " · ",
          l.startDate,
          " to ",
          l.endDate
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: l.reason })
      ] }),
      l.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            className: "border-green-500 text-green-600 hover:bg-green-50",
            onClick: () => handleAction(l.id, true),
            "data-ocid": `mfr-leaves.approve_button.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-1 h-3 w-3" }),
              " Approve"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            className: "border-red-400 text-red-500 hover:bg-red-50",
            onClick: () => handleAction(l.id, false),
            "data-ocid": `mfr-leaves.reject_button.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mr-1 h-3 w-3" }),
              " Reject"
            ]
          }
        )
      ] })
    ] }) }, l.id)) })
  ] });
}
function ManufacturerEmployeesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-primary/10 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Employee Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage team, attendance, and leave requests" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "employees", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "mfr-employees.tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "employees", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mr-1 h-4 w-4" }),
          "Employees"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "attendance", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mr-1 h-4 w-4" }),
          "Attendance"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "leaves", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "mr-1 h-4 w-4" }),
          "Leave Requests"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "employees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeesTab, {}) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "attendance", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceTab, {}) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "leaves", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeaveRequestsTab, {}) }) }) })
    ] })
  ] });
}
export {
  ManufacturerEmployeesPage as default
};
