/**
 * FlowRegistryProvider
 *
 * Wires the backend actor into the unified flow registry as soon as it becomes
 * available. All pages that call getAllRegistryFlows() / useRegistryFlows()
 * will automatically receive the 35+ flows seeded in the backend.
 *
 * Mount this ONCE inside QueryClientProvider but outside individual pages.
 */

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useBackendActor } from "../hooks/useBackend";
import {
  type FlowDefinition,
  forceRefreshRegistry,
  getAllRegistryFlows,
  initRegistryFromBackend,
  setRegistryActor,
  subscribeRegistryChanges,
} from "../lib/flowRegistry";

// ─── Context ──────────────────────────────────────────────────────────────────

interface FlowRegistryContextValue {
  /** All flows loaded from backend registry + localStorage. */
  flows: FlowDefinition[];
  /** True while the initial backend load is still in flight. */
  loading: boolean;
  /** Non-null if the backend load failed (non-fatal). */
  error: string | null;
  /** Manually trigger a fresh reload from backend. */
  refresh: () => void;
}

const FlowRegistryContext = createContext<FlowRegistryContextValue>({
  flows: [],
  loading: false,
  error: null,
  refresh: () => {},
});

export function useRegistryContext(): FlowRegistryContextValue {
  return useContext(FlowRegistryContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function FlowRegistryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { actor, isFetching } = useBackendActor();
  const [flows, setFlows] = useState<FlowDefinition[]>(() =>
    getAllRegistryFlows(),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedActorRef = useRef<unknown>(null);

  // Subscribe to registry changes so we update when localStorage or backend loads
  useEffect(() => {
    const unsub = subscribeRegistryChanges(() => {
      setFlows([...getAllRegistryFlows()]);
    });
    return unsub;
  }, []);

  // Initialize registry from backend once actor is ready
  useEffect(() => {
    if (!actor || isFetching) return;
    // Skip if already loaded for this exact actor instance
    if (loadedActorRef.current === actor) return;
    loadedActorRef.current = actor;

    setLoading(true);
    setError(null);

    const actorRecord = actor as unknown as Record<string, unknown>;
    setRegistryActor(actorRecord);

    initRegistryFromBackend(actorRecord)
      .then(() => {
        setFlows([...getAllRegistryFlows()]);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Registry load failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [actor, isFetching]);

  function refresh() {
    if (!actor) return;
    const actorRecord = actor as unknown as Record<string, unknown>;
    setLoading(true);
    setError(null);
    loadedActorRef.current = null; // allow re-run

    forceRefreshRegistry(actorRecord)
      .then(() => setFlows([...getAllRegistryFlows()]))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Refresh failed"),
      )
      .finally(() => setLoading(false));
  }

  return (
    <FlowRegistryContext.Provider value={{ flows, loading, error, refresh }}>
      {children}
    </FlowRegistryContext.Provider>
  );
}
