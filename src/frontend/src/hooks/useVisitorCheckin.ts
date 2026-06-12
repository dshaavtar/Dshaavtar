import { createActor } from "@/backend";
import type { VisitorApprovalStatus, VisitorCheckin } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { VisitorCheckin, VisitorApprovalStatus };

function unwrapResult<T>(res: { ok?: T; err?: string } | T): T {
  if (res && typeof res === "object" && ("ok" in res || "err" in res)) {
    const r = res as { ok?: T; err?: string };
    if (r.err !== undefined) throw new Error(r.err);
    return r.ok as T;
  }
  return res as T;
}

// ─── Alias: useCheckInVisitor ─────────────────────────────────────────────────
export const useCheckInVisitor = useAddVisitorCheckin;

// ─── useVisitorHistory ────────────────────────────────────────────────────────
export function useVisitorHistory(date?: string) {
  const today = new Date().toISOString().split("T")[0];
  return useGetVisitorsByDate(date ?? today);
}

export function useGetCityList() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["cityList"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCityList();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60, // city list rarely changes
  });
}

export function useGetCommunityVisitorHistory(communityId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VisitorCheckin[]>({
    queryKey: ["communityVisitorHistory", communityId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCommunityVisitorHistory(communityId);
    },
    enabled: !!actor && !isFetching && !!communityId,
  });
}

export function useGetVisitorsByDate(date: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VisitorCheckin[]>({
    queryKey: ["visitorsByDate", date],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisitorsByDate(date);
    },
    enabled: !!actor && !isFetching && !!date,
  });
}

export function useAddVisitorCheckin() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      visitorName,
      visitorPhone,
      purpose,
      communityId,
      communityMemberId,
      vehicleDetails,
    }: {
      visitorName: string;
      visitorPhone: string;
      purpose: string;
      communityId: string;
      communityMemberId: string;
      vehicleDetails: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.addVisitorCheckin(
        visitorName,
        visitorPhone,
        purpose,
        communityId,
        communityMemberId,
        vehicleDetails,
      );
      return unwrapResult(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorsByDate"] });
      queryClient.invalidateQueries({ queryKey: ["communityVisitorHistory"] });
    },
  });
}

export function useCheckOutVisitor() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.checkOutVisitor(id);
      return unwrapResult(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorsByDate"] });
      queryClient.invalidateQueries({ queryKey: ["communityVisitorHistory"] });
    },
  });
}

export function useApproveVisitorEntry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.approveVisitorEntry(id, status);
      return unwrapResult(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitorsByDate"] });
      queryClient.invalidateQueries({ queryKey: ["communityVisitorHistory"] });
    },
  });
}
