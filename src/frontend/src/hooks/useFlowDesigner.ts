import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { SavedFlowDefinition } from "../types/flowDesigner";

function useBackendActor() {
  return useActor(createActor);
}

export function useSaveFlow() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      environment,
      flowJson,
      existingId,
    }: {
      name: string;
      environment: string;
      flowJson: string;
      existingId?: string;
    }): Promise<string> => {
      if (!actor) throw new Error("Backend actor unavailable");
      const id =
        existingId ??
        `flow_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const nowNs = BigInt(Date.now()) * BigInt(1_000_000);

      const actorAny = actor as unknown as Record<string, unknown>;
      if (typeof actorAny.saveFlow === "function") {
        const backendFlow = {
          id,
          name,
          flowJson: flowJson?.trim().startsWith("{")
            ? flowJson
            : '{"blocks":[],"connections":[]}',
          environment,
          createdAt: nowNs,
          updatedAt: nowNs,
          version: BigInt(1),
        };
        await (actorAny.saveFlow as (f: unknown) => Promise<unknown>)(
          backendFlow,
        );
        return id;
      }
      // Fallback: try legacy saveFlowDefinition
      if (typeof actorAny.saveFlowDefinition === "function") {
        const result = await (
          actorAny.saveFlowDefinition as (
            n: string,
            env: string,
            j: string,
          ) => Promise<string>
        )(name, environment, flowJson);
        return result;
      }
      throw new Error("No saveFlow method available on backend");
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["flow-definitions", vars.environment],
      });
      qc.invalidateQueries({ queryKey: ["registry-flows"] });
    },
  });
}

export function useGetFlows(environment: string) {
  const { actor, isFetching } = useBackendActor();

  return useQuery<SavedFlowDefinition[]>({
    // live-data-only: removed localStorage flow cache; always read from backend via getAllFlows()
    queryKey: ["flow-definitions", environment],
    queryFn: async () => {
      if (!actor) throw new Error("Backend actor unavailable");
      const actorAny = actor as unknown as Record<string, unknown>;
      // PRIMARY: getAllFlows() — returns all flows regardless of environment tag
      if (typeof actorAny.getAllFlows === "function") {
        const raw = await (
          actorAny.getAllFlows as () => Promise<SavedFlowDefinition[]>
        )();
        return (raw ?? []).map((f) => ({
          ...f,
          flowJson:
            typeof f.flowJson === "string" && f.flowJson.trim().startsWith("{")
              ? f.flowJson
              : '{"blocks":[],"connections":[]}',
          version: Number(f.version),
          createdAt: Number(f.createdAt),
          updatedAt: Number(f.updatedAt),
        }));
      }
      // Fallback: listFlows (all environments) — no environment filter applied
      if (typeof actorAny.listFlows === "function") {
        const raw = await (
          actorAny.listFlows as () => Promise<
            Array<{
              id: string;
              name: string;
              flowJson: string;
              environment: string;
              createdAt: bigint | number;
              updatedAt: bigint | number;
              version: bigint | number;
            }>
          >
        )();
        return (raw ?? []).map((f) => ({
          id: f.id,
          name: f.name,
          environment: f.environment ?? "live",
          flowJson:
            typeof f.flowJson === "string" && f.flowJson.trim().startsWith("{")
              ? f.flowJson
              : '{"blocks":[],"connections":[]}',
          version: Number(f.version),
          createdAt: Number(f.createdAt),
          updatedAt: Number(f.updatedAt),
        }));
      }
      throw new Error("No flow query method available on backend");
    },
    enabled: !isFetching,
    staleTime: 5_000,
    refetchInterval: 15_000,
  });
}

/**
 * Fetch all flows from the backend via listFlows().
 * Used by the Flow Designer load panel and registry init.
 */
export function useListFlows() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<
    Array<{
      id: string;
      name: string;
      flowJson: string;
      environment: string;
      createdAt: number;
      updatedAt: number;
      version: number;
    }>
  >({
    queryKey: ["registry-flows"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend actor unavailable");
      const actorAny = actor as unknown as Record<string, unknown>;
      if (typeof actorAny.listFlows === "function") {
        const raw = await (
          actorAny.listFlows as () => Promise<
            Array<{
              id: string;
              name: string;
              flowJson: string;
              environment: string;
              createdAt: bigint | number;
              updatedAt: bigint | number;
              version: bigint | number;
            }>
          >
        )();
        return (raw ?? []).map((f) => ({
          id: f.id,
          name: f.name,
          flowJson: f.flowJson ?? "",
          environment: f.environment ?? "live",
          createdAt: Number(f.createdAt),
          updatedAt: Number(f.updatedAt),
          version: Number(f.version),
        }));
      }
      throw new Error("listFlows not available on backend");
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
    refetchInterval: 30_000,
  });
}

export function useDeployToLive() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (flowId: string): Promise<boolean> => {
      if (!actor) throw new Error("Backend actor unavailable");
      const actorAny = actor as unknown as Record<string, unknown>;
      if (typeof actorAny.deployFlowToLive === "function") {
        return (actorAny.deployFlowToLive as (id: string) => Promise<boolean>)(
          flowId,
        );
      }
      throw new Error("deployFlowToLive not available on backend");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["flow-definitions", "live"] });
      qc.invalidateQueries({ queryKey: ["flow-definitions", "test"] });
      qc.invalidateQueries({ queryKey: ["registry-flows"] });
    },
  });
}
