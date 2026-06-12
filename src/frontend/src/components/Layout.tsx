import { Outlet } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import Header from "./Header";
import type { PipelineEnv } from "./PipelineSelector";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pipelineEnv, setPipelineEnv] = useState<PipelineEnv>(() => {
    const stored = localStorage.getItem("wc_pipeline_env");
    if (stored === "live" || stored === "test") return stored;
    return "live";
  });

  // Keep in sync with storage changes from PipelineSelector
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (
        e.key === "wc_pipeline_env" &&
        (e.newValue === "live" || e.newValue === "test")
      ) {
        setPipelineEnv(e.newValue);
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/50 lg:hidden w-full h-full border-0 cursor-default"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar — always visible on lg+, slide-in on mobile */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 flex-shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onEnvChange={setPipelineEnv}
        />

        {/* Test mode banner */}
        {pipelineEnv === "test" && (
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500/15 border-b border-yellow-500/30 flex-shrink-0"
            data-ocid="pipeline.test_banner"
          >
            <FlaskConical className="w-3.5 h-3.5 text-yellow-500" />
            <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
              You are in <strong>TEST mode</strong> — changes only affect the
              simulator
            </p>
          </div>
        )}

        <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
          <ErrorBoundary section="Page">
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
