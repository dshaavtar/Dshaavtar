import { j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { M as Minus } from "./minus-BPUUsZPQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  loading = false
}) {
  const isPositive = change !== void 0 && change > 0;
  const isNegative = change !== void 0 && change < 0;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-24 bg-muted animate-pulse rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-16 bg-muted animate-pulse rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-32 bg-muted animate-pulse rounded" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted animate-pulse" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 mr-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide truncate", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-display font-bold text-foreground tabular-nums", children: value }),
      change !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
        isPositive && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-emerald-600 flex-shrink-0" }),
        isNegative && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5 text-destructive flex-shrink-0" }),
        !isPositive && !isNegative && /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `text-xs font-medium ${isPositive ? "text-emerald-600" : isNegative ? "text-destructive" : "text-muted-foreground"}`,
            children: [
              change > 0 ? "+" : "",
              change,
              "%"
            ]
          }
        ),
        changeLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: changeLabel })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${iconColor}` })
      }
    )
  ] }) });
}
export {
  StatCard as S
};
