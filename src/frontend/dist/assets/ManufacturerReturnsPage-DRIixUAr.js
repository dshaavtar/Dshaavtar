import { ei as useExpiryReturns, es as useApproveExpiryReturn, et as useRejectExpiryReturn, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["path", { d: "m17 13 5 5m-5 0 5-5", key: "im3w4b" }]
];
const PackageX = createLucideIcon("package-x", __iconNode);
const STATUS_COLORS = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  approved: "bg-green-500/10 text-green-600 border-green-500/30",
  rejected: "bg-red-500/10 text-red-600 border-red-500/30"
};
function ManufacturerReturnsPage() {
  const { data: returnsRaw = [], isLoading, refetch } = useExpiryReturns();
  const returns = returnsRaw;
  const approveMutation = useApproveExpiryReturn();
  const rejectMutation = useRejectExpiryReturn();
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = filter === "all" ? returns : returns.filter((r) => String(r.status) === filter);
  async function handleApprove(id) {
    try {
      await approveMutation.mutateAsync(id);
      ue.success("Return approved");
    } catch (err) {
      ue.error(`Failed: ${String(err)}`);
    }
  }
  async function handleReject(id) {
    try {
      await rejectMutation.mutateAsync(id);
      ue.success("Return rejected");
    } catch (err) {
      ue.error(`Failed: ${String(err)}`);
    }
  }
  function getStatusLabel(status) {
    return String(status);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "manufacturer.returns.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PackageX, { className: "w-5 h-5 text-orange-500" }),
          "Expiry Returns"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          returns.filter(
            (r) => getStatusLabel(r.status) === "pending"
          ).length,
          " ",
          "pending review"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-muted rounded-lg p-1", children: ["all", "pending", "approved", "rejected"].map(
          (s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilter(s),
              className: `px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${filter === s ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `manufacturer.returns.filter.${s}`,
              children: s
            },
            s
          )
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => refetch(),
            "data-ocid": "manufacturer.returns.refresh_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-3",
        "data-ocid": "manufacturer.returns.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PackageX, { className: "w-10 h-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "No ",
            filter === "all" ? "" : filter,
            " returns found"
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: filtered.map((r, i) => {
      const statusLabel = getStatusLabel(r.status);
      const isPending = statusLabel === "pending";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3",
          "data-ocid": `manufacturer.returns.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: r.returnedBy }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs border ${STATUS_COLORS[statusLabel] ?? ""}`,
                    children: statusLabel
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Product ID: ",
                r.productId,
                " · Qty: ",
                Number(r.quantity),
                " ·",
                " ",
                r.reason
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
                Number(r.createdAt) / 1e6
              ).toLocaleDateString() })
            ] }),
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-green-600 border-green-500/30 hover:bg-green-500/10",
                  onClick: () => handleApprove(r.id),
                  disabled: approveMutation.isPending,
                  "data-ocid": `manufacturer.returns.approve_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mr-1" }),
                    " Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-red-600 border-red-500/30 hover:bg-red-500/10",
                  onClick: () => handleReject(r.id),
                  disabled: rejectMutation.isPending,
                  "data-ocid": `manufacturer.returns.reject_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1" }),
                    " Reject"
                  ]
                }
              )
            ] })
          ]
        },
        r.id
      );
    }) }) })
  ] });
}
export {
  ManufacturerReturnsPage as default
};
