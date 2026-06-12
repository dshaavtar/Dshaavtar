import { ej as useManufacturerComplaints, eu as useResolveComplaint, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
const STATUS_COLORS = {
  open: "bg-red-500/10 text-red-600 border-red-500/30",
  inprogress: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  resolved: "bg-green-500/10 text-green-600 border-green-500/30"
};
function ManufacturerComplaintsPage() {
  const {
    data: complaintsRaw = [],
    isLoading,
    refetch
  } = useManufacturerComplaints();
  const complaints = complaintsRaw;
  const resolveMutation = useResolveComplaint();
  const [filter, setFilter] = reactExports.useState("all");
  function getStatusLabel(status) {
    return String(status);
  }
  const filtered = filter === "all" ? complaints : complaints.filter(
    (c) => getStatusLabel(c.status).toLowerCase() === filter
  );
  async function handleResolve(id) {
    try {
      await resolveMutation.mutateAsync(id);
      ue.success("Complaint resolved");
    } catch (err) {
      ue.error(`Failed: ${String(err)}`);
    }
  }
  const openCount = complaints.filter(
    (c) => getStatusLabel(c.status) === "open"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "manufacturer.complaints.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-500" }),
          "Complaints"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          openCount,
          " open complaint",
          openCount !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-muted rounded-lg p-1", children: ["all", "open", "resolved"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilter(s),
            className: `px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${filter === s ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `manufacturer.complaints.filter.${s}`,
            children: s
          },
          s
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => refetch(),
            "data-ocid": "manufacturer.complaints.refresh_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-3",
        "data-ocid": "manufacturer.complaints.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: filter === "all" ? "No complaints filed" : `No ${filter} complaints` })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: filtered.map((c, i) => {
      const statusLabel = getStatusLabel(c.status);
      const isOpen = statusLabel === "open";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-4 py-3 flex flex-col sm:flex-row sm:items-start gap-3",
          "data-ocid": `manufacturer.complaints.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: c.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs border ${STATUS_COLORS[statusLabel] ?? ""}`,
                    children: statusLabel
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Filed by: ",
                c.filedBy
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Product ID:",
                " ",
                String(
                  c.productId ?? ""
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: c.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: new Date(
                Number(c.createdAt) / 1e6
              ).toLocaleDateString() })
            ] }),
            isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "text-green-600 border-green-500/30 hover:bg-green-500/10 flex-shrink-0",
                onClick: () => handleResolve(c.id),
                disabled: resolveMutation.isPending,
                "data-ocid": `manufacturer.complaints.resolve_button.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mr-1" }),
                  " Resolve"
                ]
              }
            )
          ]
        },
        c.id
      );
    }) }) })
  ] });
}
export {
  ManufacturerComplaintsPage as default
};
