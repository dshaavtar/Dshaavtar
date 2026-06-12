import { bG as useActor, bE as useQuery, ao as useQueryClient, bF as useMutation, bH as createActor, r as reactExports, bn as useGetAllCommunityMembers, dP as useSearchCommunityMembers, dQ as useRemoveCommunityMember, dR as useGetAllCommunityParkingBookings, dS as useGetAllCommunityRoomBookings, dT as useGetAllCommunityFoodOrders, dU as useGetAllCommunityWorkOrders, j as jsxRuntimeExports, p as ue, dV as useGetCommunityMemberByPhone } from "./index-D4mmtgjo.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DEwfo3GB.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { C as Car } from "./car-C3Ivr9eE.js";
import { D as DoorOpen, U as UtensilsCrossed } from "./utensils-crossed-DJHwAEoW.js";
import { W as Wrench } from "./wrench-B6FcmCok.js";
import { S as ShieldCheck } from "./shield-check-DNUGUjo-.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { C as CalendarDays } from "./calendar-days-B91JrBZZ.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { X } from "./x-Chksmd6i.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { U as UserCheck } from "./user-check-GyRaKvZW.js";
import { L as LogOut } from "./log-out-Bs9IUFS8.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import "./index-CUcO6jhF.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./index-BtrS4JsN.js";
import "./index-yUS8KoxU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function unwrapResult(res) {
  if (res && typeof res === "object" && ("ok" in res || "err" in res)) {
    const r = res;
    if (r.err !== void 0) throw new Error(r.err);
    return r.ok;
  }
  return res;
}
function useVisitorHistory(date) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return useGetVisitorsByDate(date ?? today);
}
function useGetCityList() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["cityList"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCityList();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 60
    // city list rarely changes
  });
}
function useGetVisitorsByDate(date) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visitorsByDate", date],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisitorsByDate(date);
    },
    enabled: !!actor && !isFetching && !!date
  });
}
function useAddVisitorCheckin() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      visitorName,
      visitorPhone,
      purpose,
      communityId,
      communityMemberId,
      vehicleDetails
    }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.addVisitorCheckin(
        visitorName,
        visitorPhone,
        purpose,
        communityId,
        communityMemberId,
        vehicleDetails
      );
      return unwrapResult(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorsByDate"] });
      queryClient.invalidateQueries({ queryKey: ["communityVisitorHistory"] });
    }
  });
}
function useCheckOutVisitor() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.checkOutVisitor(id);
      return unwrapResult(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorsByDate"] });
      queryClient.invalidateQueries({ queryKey: ["communityVisitorHistory"] });
    }
  });
}
function useApproveVisitorEntry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.approveVisitorEntry(id, status);
      return unwrapResult(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorsByDate"] });
      queryClient.invalidateQueries({ queryKey: ["communityVisitorHistory"] });
    }
  });
}
const PAGE_SIZE = 50;
const ROLE_COLOR = {
  customer: "bg-blue-100 text-blue-700 border-blue-200",
  merchant: "bg-emerald-100 text-emerald-700 border-emerald-200",
  delivery: "bg-amber-100 text-amber-700 border-amber-200",
  sarthi: "bg-violet-100 text-violet-700 border-violet-200"
};
function RoleBadge({ role }) {
  const cls = ROLE_COLOR[role.toLowerCase()] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${cls}`,
      children: role
    }
  );
}
const PURPOSES = ["Guest", "Delivery", "Service", "Official", "Other"];
function ApprovalBadge({ status }) {
  if (status === "approved")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
      " Approved"
    ] });
  if (status === "denied")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 border border-red-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3 h-3" }),
      " Denied"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    " Pending"
  ] });
}
function formatTime(ns) {
  if (ns === void 0) return "";
  return new Date(Number(ns) / 1e6).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function todayDateString() {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function CheckInVisitorTab({ onSuccess }) {
  const [visitorName, setVisitorName] = reactExports.useState("");
  const [visitorPhone, setVisitorPhone] = reactExports.useState("");
  const [residentName, setResidentName] = reactExports.useState("");
  const [unitNumber, setUnitNumber] = reactExports.useState("");
  const [purpose, setPurpose] = reactExports.useState("Guest");
  const [hostPhone, setHostPhone] = reactExports.useState("");
  const { data: hostMember } = useGetCommunityMemberByPhone(
    hostPhone.length >= 10 ? hostPhone : ""
  );
  const addCheckin = useAddVisitorCheckin();
  async function handleSubmit() {
    if (!visitorName.trim() || !visitorPhone.trim()) {
      ue.error("Visitor name and phone are required");
      return;
    }
    if (visitorPhone.trim().length < 10) {
      ue.error("Enter a valid 10-digit phone number");
      return;
    }
    const memberId = (hostMember == null ? void 0 : hostMember.id) ?? "";
    const communityId = (hostMember == null ? void 0 : hostMember.city) ?? "default";
    const purposeText = purpose + (residentName ? ` – visiting ${residentName}${unitNumber ? ` (${unitNumber})` : ""}` : "");
    try {
      const result = await addCheckin.mutateAsync({
        visitorName: visitorName.trim(),
        visitorPhone: visitorPhone.trim(),
        purpose: purposeText,
        communityId,
        communityMemberId: memberId,
        vehicleDetails: ""
      });
      ue.success(
        `${visitorName} checked in — ID: ${(result == null ? void 0 : result.id) ?? "recorded"}`
      );
      setVisitorName("");
      setVisitorPhone("");
      setResidentName("");
      setUnitNumber("");
      setPurpose("Guest");
      setHostPhone("");
      onSuccess();
    } catch (e) {
      ue.error(e instanceof Error ? e.message : "Check-in failed");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", htmlFor: "v-name", children: [
          "Visitor Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "v-name",
            placeholder: "Full name",
            value: visitorName,
            onChange: (e) => setVisitorName(e.target.value),
            className: "h-8 text-xs",
            "data-ocid": "visitor.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", htmlFor: "v-phone", children: [
          "Visitor Phone ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "v-phone",
            placeholder: "+91 XXXXXXXXXX",
            value: visitorPhone,
            onChange: (e) => setVisitorPhone(e.target.value),
            className: "h-8 text-xs",
            "data-ocid": "visitor.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", htmlFor: "v-resident", children: "Visiting Resident Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "v-resident",
            placeholder: "Resident's name",
            value: residentName,
            onChange: (e) => setResidentName(e.target.value),
            className: "h-8 text-xs",
            "data-ocid": "visitor.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", htmlFor: "v-unit", children: "Unit / Flat Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "v-unit",
            placeholder: "e.g. A-304",
            value: unitNumber,
            onChange: (e) => setUnitNumber(e.target.value),
            className: "h-8 text-xs",
            "data-ocid": "visitor.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", htmlFor: "v-purpose", children: [
          "Purpose ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "v-purpose",
            value: purpose,
            onChange: (e) => setPurpose(e.target.value),
            className: "w-full text-xs bg-muted border border-border rounded-lg px-3 py-1.5 h-8 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
            "data-ocid": "visitor.select",
            children: PURPOSES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", htmlFor: "v-host", children: [
          "Host Member Phone",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "v-host",
              placeholder: "Resident's registered phone",
              value: hostPhone,
              onChange: (e) => setHostPhone(e.target.value),
              className: "h-8 text-xs",
              "data-ocid": "visitor.input"
            }
          ),
          hostMember && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-emerald-600 font-medium", children: [
            "✓ ",
            (hostMember == null ? void 0 : hostMember.name) || "Member found"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "gap-2 h-8 text-xs",
        onClick: handleSubmit,
        disabled: addCheckin.isPending,
        "data-ocid": "visitor.submit_button",
        children: addCheckin.isPending ? "Checking in…" : "Check In Visitor"
      }
    ) })
  ] });
}
function PendingApprovalsTab() {
  const today = todayDateString();
  const {
    data: todayVisitors = [],
    isLoading,
    refetch
  } = useGetVisitorsByDate(today);
  const approveEntry = useApproveVisitorEntry();
  const checkout = useCheckOutVisitor();
  const pending = todayVisitors.filter((v) => v.approvalStatus === "pending");
  const approved = todayVisitors.filter(
    (v) => v.approvalStatus === "approved" && (v.checkOutTime === void 0 || v.checkOutTime === null)
  );
  async function handleApprove(id, status) {
    try {
      await approveEntry.mutateAsync({ id, status });
      ue.success(`Entry ${status}`);
    } catch (e) {
      ue.error(e instanceof Error ? e.message : "Action failed");
    }
  }
  async function handleCheckout(id, name) {
    try {
      await checkout.mutateAsync(id);
      ue.success(`${name} checked out`);
    } catch (e) {
      ue.error(e instanceof Error ? e.message : "Checkout failed");
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded" }, i)
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        pending.length,
        " pending · ",
        approved.length,
        " approved (inside)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "gap-1 h-7 text-xs",
          onClick: () => refetch(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
            " Refresh"
          ]
        }
      )
    ] }),
    pending.length === 0 && approved.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-2",
        "data-ocid": "visitor.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-8 h-8 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No pending approvals" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-2", children: "Awaiting Approval" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pending.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2.5",
            "data-ocid": `visitor.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: v.visitorName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono", children: v.visitorPhone }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: v.purpose })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: formatTime(v.checkInTime) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ApprovalBadge, { status: String(v.approvalStatus) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "h-7 px-2.5 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white",
                    onClick: () => handleApprove(v.id, "approved"),
                    disabled: approveEntry.isPending,
                    "data-ocid": `visitor.confirm_button.${idx + 1}`,
                    children: "Approve"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 px-2.5 text-[11px] text-red-600 border-red-200 hover:bg-red-50",
                    onClick: () => handleApprove(v.id, "denied"),
                    disabled: approveEntry.isPending,
                    "data-ocid": `visitor.delete_button.${idx + 1}`,
                    children: "Reject"
                  }
                )
              ] })
            ]
          },
          v.id
        )) })
      ] }),
      approved.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-2", children: "Currently Inside" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: approved.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg px-3 py-2.5",
            "data-ocid": `visitor.item.${pending.length + idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: v.visitorName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono", children: v.visitorPhone }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: v.purpose })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                  "In: ",
                  formatTime(v.checkInTime)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ApprovalBadge, { status: "approved" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-7 px-2.5 text-[11px] gap-1 shrink-0 border-emerald-300 text-emerald-700 hover:bg-emerald-50",
                  onClick: () => handleCheckout(v.id, v.visitorName),
                  disabled: checkout.isPending,
                  "data-ocid": `visitor.edit_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3" }),
                    " Check-out"
                  ]
                }
              )
            ]
          },
          v.id
        )) })
      ] })
    ] })
  ] });
}
function DailyHistoryTab() {
  const today = todayDateString();
  const [historyDate, setHistoryDate] = reactExports.useState(today);
  const { data: visitors = [], isLoading } = useVisitorHistory(historyDate);
  function calcDuration(checkIn, checkOut) {
    if (!checkIn || !checkOut) return "—";
    const diffMs = Number(checkOut - checkIn) / 1e6;
    const mins = Math.floor(diffMs / 6e4);
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border bg-muted/20 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", htmlFor: "hist-date", children: "Date:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "hist-date",
          type: "date",
          value: historyDate,
          max: today,
          onChange: (e) => setHistoryDate(e.target.value),
          className: "text-xs bg-muted border border-border rounded-lg px-3 py-1 h-7 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
          "data-ocid": "visitor.input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground ml-auto", children: [
        visitors.length,
        " record",
        visitors.length !== 1 ? "s" : ""
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: Array.from({ length: 5 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded" }, i)
    )) }) : visitors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-2",
        "data-ocid": "visitor.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No visitor records for this date" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/60 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "Visitor",
        "Phone",
        "Check-in",
        "Check-out",
        "Duration",
        "Status"
      ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap",
          children: col
        },
        col
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: visitors.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/40 hover:bg-muted/20 transition-colors",
          "data-ocid": `visitor.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-medium max-w-[120px] truncate", children: v.visitorName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono", children: v.visitorPhone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: formatTime(v.checkInTime) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: v.checkOutTime ? formatTime(v.checkOutTime) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600", children: "Still inside" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: calcDuration(v.checkInTime, v.checkOutTime) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ApprovalBadge,
              {
                status: String(v.approvalStatus ?? "pending")
              }
            ) })
          ]
        },
        v.id
      )) })
    ] }) })
  ] });
}
function CommunityPage() {
  const [mainTab, setMainTab] = reactExports.useState("checkin");
  const [search, setSearch] = reactExports.useState("");
  const [cityFilter, setCityFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const [removePhone, setRemovePhone] = reactExports.useState(null);
  const {
    data: allMembers = [],
    isLoading,
    error,
    refetch
  } = useGetAllCommunityMembers();
  const { data: searchResults = [], isLoading: isSearching } = useSearchCommunityMembers(search);
  const removeMember = useRemoveCommunityMember();
  const { data: parkingBookings = [] } = useGetAllCommunityParkingBookings();
  const { data: roomBookings = [] } = useGetAllCommunityRoomBookings();
  const { data: foodOrders = [] } = useGetAllCommunityFoodOrders();
  const { data: workOrders = [] } = useGetAllCommunityWorkOrders();
  const activeParkings = parkingBookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  ).length;
  const activeRooms = roomBookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  ).length;
  const activeFoodOrders = foodOrders.filter(
    (o) => o.status === "pending" || o.status === "preparing"
  ).length;
  const activeWorkOrders = workOrders.filter((w) => {
    const s = w.status;
    return s === "pending" || s === "assigned" || s === "in-progress";
  }).length;
  const { data: cityList = [] } = useGetCityList();
  const cities = reactExports.useMemo(() => [...cityList].sort(), [cityList]);
  const source = search.trim().length > 0 ? searchResults : allMembers;
  const filtered = reactExports.useMemo(() => {
    if (cityFilter === "all") return source;
    return source.filter((m) => m.city === cityFilter);
  }, [source, cityFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  function handleSearchChange(v) {
    setSearch(v);
    setPage(1);
  }
  async function handleRemove() {
    if (!removePhone) return;
    try {
      await removeMember.mutateAsync(removePhone);
      ue.success(`Member ${removePhone} removed from community`);
    } catch (e) {
      ue.error(e instanceof Error ? e.message : "Failed to remove member");
    } finally {
      setRemovePhone(null);
    }
  }
  const loading = isLoading || isSearching;
  const today = todayDateString();
  const { data: todayVisitors = [] } = useGetVisitorsByDate(today);
  const pendingCount = todayVisitors.filter(
    (v) => v.approvalStatus === "pending"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        "data-ocid": "community.services_summary",
        children: [
          {
            label: "Active Parking",
            count: activeParkings,
            total: parkingBookings.length,
            Icon: Car,
            bg: "bg-blue-50 dark:bg-blue-950/30",
            ic: "text-blue-600",
            border: "border-blue-200"
          },
          {
            label: "Room Bookings",
            count: activeRooms,
            total: roomBookings.length,
            Icon: DoorOpen,
            bg: "bg-violet-50 dark:bg-violet-950/30",
            ic: "text-violet-600",
            border: "border-violet-200"
          },
          {
            label: "Food Orders",
            count: activeFoodOrders,
            total: foodOrders.length,
            Icon: UtensilsCrossed,
            bg: "bg-amber-50 dark:bg-amber-950/30",
            ic: "text-amber-600",
            border: "border-amber-200"
          },
          {
            label: "Work Orders",
            count: activeWorkOrders,
            total: workOrders.length,
            Icon: Wrench,
            bg: "bg-emerald-50 dark:bg-emerald-950/30",
            ic: "text-emerald-600",
            border: "border-emerald-200"
          }
        ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-xl border ${card.border} px-4 py-3 flex items-center gap-3 bg-card`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${card.bg}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.Icon, { className: `w-4 h-4 ${card.ic}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground leading-none", children: [
                  card.count,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground ml-1", children: [
                    "/ ",
                    card.total
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 truncate", children: card.label })
              ] })
            ]
          },
          card.label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        value: mainTab,
        onValueChange: (v) => setMainTab(v),
        className: "w-full",
        "data-ocid": "community.tabs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-sm", children: "Community Management" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                allMembers.length,
                " member",
                allMembers.length !== 1 ? "s" : "",
                " ",
                "· ",
                todayVisitors.length,
                " visitor",
                todayVisitors.length !== 1 ? "s" : "",
                " today"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full rounded-none border-b border-border bg-muted/20 h-10 p-0 flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "checkin",
                className: "flex-1 rounded-none h-full text-xs gap-1.5",
                "data-ocid": "community.checkin_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
                  "Check-in Visitor"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "pending",
                className: "flex-1 rounded-none h-full text-xs gap-1.5 relative",
                "data-ocid": "community.pending_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                  "Pending Approvals",
                  pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold", children: pendingCount })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "history",
                className: "flex-1 rounded-none h-full text-xs gap-1.5",
                "data-ocid": "community.history_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
                  "Daily History"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "members",
                className: "flex-1 rounded-none h-full text-xs gap-1.5",
                "data-ocid": "community.members_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
                  "Community Members"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "checkin", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckInVisitorTab, { onSuccess: () => setMainTab("pending") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PendingApprovalsTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DailyHistoryTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "members", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Search by phone, name, city, location…",
                    value: search,
                    onChange: (e) => handleSearchChange(e.target.value),
                    className: "pl-8 h-8 text-xs",
                    "data-ocid": "community.search_input"
                  }
                ),
                search && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSearchChange(""),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                    "aria-label": "Clear search",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: cityFilter,
                  onChange: (e) => {
                    setCityFilter(e.target.value);
                    setPage(1);
                  },
                  className: "text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  "data-ocid": "community.city_filter",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Cities" }),
                    cities.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "gap-2",
                  onClick: () => refetch(),
                  disabled: loading,
                  "data-ocid": "community.refresh_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      RefreshCw,
                      {
                        className: `w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`
                      }
                    ),
                    "Refresh"
                  ]
                }
              )
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-center justify-between",
                "data-ocid": "community.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed to load community members. Please retry." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => refetch(), children: "Retry" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background border border-border rounded-xl overflow-hidden", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded" }, i)
            )) }) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-16 gap-3",
                "data-ocid": "community.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground/30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: search || cityFilter !== "all" ? "No members match your filter" : "No community members yet. Members are added automatically when any phone number registers." }),
                  (search || cityFilter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => {
                        setSearch("");
                        setCityFilter("all");
                      },
                      children: "Clear filters"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/60 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                "Phone",
                "Name",
                "Apartment",
                "Address",
                "City",
                "Location",
                "Roles",
                "Registered",
                "Actions"
              ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-left py-2.5 px-3 font-semibold text-muted-foreground uppercase tracking-wider text-[10px] whitespace-nowrap",
                  children: col
                },
                col
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.map((member, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/40 hover:bg-muted/20 transition-colors",
                  "data-ocid": `community.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono", children: member.phone }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-medium max-w-[120px] truncate", children: member.name || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 max-w-[100px] truncate", children: member.apartmentName || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 max-w-[140px] truncate", children: member.address || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: member.city ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground" }),
                      member.city
                    ] }) : "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 max-w-[100px] truncate", children: member.location || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: member.roles.length > 0 ? member.roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: r }, r)) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 whitespace-nowrap", children: member.registeredAt ? new Date(
                      Number(member.registeredAt) / 1e6
                    ).toLocaleDateString("en-IN") : "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "text-red-500 hover:text-red-700 hover:bg-red-50 h-6 px-2 text-[10px]",
                        onClick: () => setRemovePhone(member.phone),
                        "data-ocid": `community.delete_button.${idx + 1}`,
                        children: "Remove"
                      }
                    ) })
                  ]
                },
                member.phone
              )) })
            ] }) }) }),
            totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Showing ",
                (page - 1) * PAGE_SIZE + 1,
                "–",
                Math.min(page * PAGE_SIZE, filtered.length),
                " of",
                " ",
                filtered.length
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setPage((p) => Math.max(1, p - 1)),
                    disabled: page === 1,
                    "data-ocid": "community.pagination_prev",
                    children: "Previous"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                    disabled: page === totalPages,
                    "data-ocid": "community.pagination_next",
                    children: "Next"
                  }
                )
              ] })
            ] })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!removePhone,
        onOpenChange: (open) => {
          if (!open) setRemovePhone(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove Community Member" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Remove ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: removePhone }),
              " from the community directory? This only removes them from the community view — their account remains active."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "community.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleRemove,
                className: "bg-red-600 hover:bg-red-700",
                "data-ocid": "community.confirm_button",
                children: "Remove"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  CommunityPage as default
};
