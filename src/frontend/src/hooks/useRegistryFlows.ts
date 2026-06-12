/**
 * useRegistryFlows
 *
 * Returns all flows from the unified flow registry.
 * Re-renders automatically when the backend finishes loading flows.
 *
 * Usage:
 *   const { flows, loading } = useRegistryFlows();
 *   const orderedFlows = useOrderedFlows(); // registration-first order
 */

import { useCallback, useEffect, useState } from "react";
import { useRegistryContext } from "../components/FlowRegistryProvider";
import {
  type FlowDefinition,
  getAllRegistryFlows,
  getEnabledFlows,
  getOrderedFlowsForExecution,
  subscribeRegistryChanges,
} from "../lib/flowRegistry";

// ─── All flows (reactive) ─────────────────────────────────────────────────────

export function useRegistryFlows(): {
  flows: FlowDefinition[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  return useRegistryContext();
}

// ─── Ordered flows (registration-first, reactive) ─────────────────────────────

export function useOrderedFlows(): FlowDefinition[] {
  const [ordered, setOrdered] = useState<FlowDefinition[]>(() =>
    getOrderedFlowsForExecution(),
  );

  useEffect(() => {
    const unsub = subscribeRegistryChanges(() => {
      setOrdered([...getOrderedFlowsForExecution()]);
    });
    return unsub;
  }, []);

  return ordered;
}

// ─── Enabled flows (filtered by module status, reactive) ─────────────────────

export function useEnabledFlows(): FlowDefinition[] {
  const [enabled, setEnabled] = useState<FlowDefinition[]>(() =>
    getEnabledFlows({}),
  );

  useEffect(() => {
    const unsub = subscribeRegistryChanges(() => {
      setEnabled([...getEnabledFlows({})]);
    });
    return unsub;
  }, []);

  return enabled;
}

// ─── Flow count (cheap, for labels) ──────────────────────────────────────────

export function useFlowCount(): number {
  const [count, setCount] = useState(() => getAllRegistryFlows().length);

  useEffect(() => {
    const unsub = subscribeRegistryChanges(() => {
      setCount(getAllRegistryFlows().length);
    });
    return unsub;
  }, []);

  return count;
}
