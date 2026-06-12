import { ChevronDown, Flame, FlaskConical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useGetPipelineEnvironment,
  useSetPipelineEnvironment,
} from "../hooks/useBackend";

export type PipelineEnv = "live" | "test";

interface PipelineSelectorProps {
  onEnvChange?: (env: PipelineEnv) => void;
}

export default function PipelineSelector({
  onEnvChange,
}: PipelineSelectorProps) {
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const { data: backendEnv } = useGetPipelineEnvironment();
  const { mutate: setEnv } = useSetPipelineEnvironment();

  const [env, setLocalEnv] = useState<PipelineEnv>(() => {
    const stored = localStorage.getItem("wc_pipeline_env");
    if (stored === "live" || stored === "test") return stored;
    return "live";
  });

  // Sync from backend on mount
  useEffect(() => {
    if (backendEnv === "live" || backendEnv === "test") {
      setLocalEnv(backendEnv);
      localStorage.setItem("wc_pipeline_env", backendEnv);
    }
  }, [backendEnv]);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function select(next: PipelineEnv) {
    setLocalEnv(next);
    localStorage.setItem("wc_pipeline_env", next);
    setEnv(next);
    onEnvChange?.(next);
    setOpen(false);
  }

  const isLive = env === "live";

  return (
    <div className="relative" ref={dropRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        data-ocid="pipeline.selector_toggle"
        title={
          isLive
            ? "Live: changes affect all users"
            : "Test: safe for simulator testing only"
        }
        className={[
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all",
          isLive
            ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20"
            : "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20",
        ].join(" ")}
        aria-label={`Pipeline: ${isLive ? "Live" : "Test"} environment`}
        aria-expanded={open}
      >
        <span
          className={[
            "w-2 h-2 rounded-full flex-shrink-0",
            isLive ? "bg-green-500 animate-pulse" : "bg-yellow-400",
          ].join(" ")}
        />
        <span className="hidden sm:inline">{isLive ? "Live" : "Test"}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10 w-full h-full border-0 bg-transparent cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close pipeline selector"
          />
          <div className="absolute right-0 top-full mt-1.5 w-52 bg-popover border border-border rounded-xl shadow-elevated z-20 py-1.5 overflow-hidden animate-slide-up">
            <p className="px-3 pt-1 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Pipeline Environment
            </p>
            <button
              type="button"
              onClick={() => select("live")}
              data-ocid="pipeline.live_option"
              className={[
                "flex items-center gap-3 w-full px-3 py-2.5 text-sm transition-colors",
                env === "live"
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "text-foreground hover:bg-muted",
              ].join(" ")}
            >
              <Flame className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium truncate">Live Environment</p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Changes affect all users
                </p>
              </div>
              {env === "live" && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              )}
            </button>
            <button
              type="button"
              onClick={() => select("test")}
              data-ocid="pipeline.test_option"
              className={[
                "flex items-center gap-3 w-full px-3 py-2.5 text-sm transition-colors",
                env === "test"
                  ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                  : "text-foreground hover:bg-muted",
              ].join(" ")}
            >
              <FlaskConical className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium truncate">Test Environment</p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Simulator only — safe to test
                </p>
              </div>
              {env === "test" && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
