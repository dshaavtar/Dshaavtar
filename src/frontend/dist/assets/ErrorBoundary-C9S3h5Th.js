import { r as reactExports, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
class ErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error(
      `[ErrorBoundary] ${this.props.section ?? "Unknown"} crashed:`,
      error,
      info
    );
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      const { error, showDetails } = this.state;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center min-h-[200px] p-8 gap-4",
          "data-ocid": "error_boundary.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "⚠️" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-lg w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: this.props.section ? `${this.props.section} failed to load` : "Something went wrong" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: (error == null ? void 0 : error.message) ?? "An unexpected error occurred" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "text-xs text-primary hover:underline flex items-center gap-1 mx-auto",
                    onClick: () => this.setState((s) => ({ showDetails: !s.showDetails })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: showDetails ? "▾" : "▸" }),
                      "Show technical details"
                    ]
                  }
                ),
                showDetails && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "pre",
                  {
                    className: "mt-2 text-[10px] text-left bg-muted/50 border border-border rounded p-3 overflow-auto max-h-48 text-muted-foreground whitespace-pre-wrap break-all",
                    "data-ocid": "error_boundary.technical_details",
                    children: [
                      error == null ? void 0 : error.name,
                      ": ",
                      error == null ? void 0 : error.message,
                      "\n\n",
                      (error == null ? void 0 : error.stack) ?? "(no stack trace available)"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs text-primary hover:underline",
                onClick: () => this.setState({
                  hasError: false,
                  error: null,
                  showDetails: false
                }),
                children: "Try again"
              }
            )
          ]
        }
      );
    }
    return this.props.children;
  }
}
export {
  ErrorBoundary as E
};
