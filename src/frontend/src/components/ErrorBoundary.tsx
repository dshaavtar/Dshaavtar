import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /** Section label shown in error UI */
  section?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `[ErrorBoundary] ${this.props.section ?? "Unknown"} crashed:`,
      error,
      info,
    );
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      const { error, showDetails } = this.state;
      return (
        <div
          className="flex flex-col items-center justify-center min-h-[200px] p-8 gap-4"
          data-ocid="error_boundary.error_state"
        >
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="text-center max-w-lg w-full">
            <p className="font-semibold text-foreground">
              {this.props.section
                ? `${this.props.section} failed to load`
                : "Something went wrong"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {error?.message ?? "An unexpected error occurred"}
            </p>
            {/* Collapsible technical details */}
            <div className="mt-3 text-left">
              <button
                type="button"
                className="text-xs text-primary hover:underline flex items-center gap-1 mx-auto"
                onClick={() =>
                  this.setState((s) => ({ showDetails: !s.showDetails }))
                }
              >
                <span>{showDetails ? "▾" : "▸"}</span>
                Show technical details
              </button>
              {showDetails && (
                <pre
                  className="mt-2 text-[10px] text-left bg-muted/50 border border-border rounded p-3 overflow-auto max-h-48 text-muted-foreground whitespace-pre-wrap break-all"
                  data-ocid="error_boundary.technical_details"
                >
                  {error?.name}: {error?.message}
                  {"\n\n"}
                  {error?.stack ?? "(no stack trace available)"}
                </pre>
              )}
            </div>
          </div>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
            onClick={() =>
              this.setState({
                hasError: false,
                error: null,
                showDetails: false,
              })
            }
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
