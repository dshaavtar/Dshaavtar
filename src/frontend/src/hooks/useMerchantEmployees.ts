import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useListMerchantEmployees(merchantId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["merchantEmployees", merchantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMerchantEmployees(merchantId);
    },
    enabled: !!actor && !isFetching && !!merchantId,
  });
}

export function useAddMerchantEmployee() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      merchantId,
      name,
      phone,
      role,
    }: {
      merchantId: string;
      name: string;
      phone: string;
      role: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addMerchantEmployee(merchantId, name, phone, role);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["merchantEmployees", vars.merchantId],
      });
    },
  });
}

export function useSetMerchantEmployeeActive() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isActive,
    }: {
      id: string;
      isActive: boolean;
      merchantId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setMerchantEmployeeActive(id, isActive);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["merchantEmployees", vars.merchantId],
      });
    },
  });
}

export function useEmployeeCheckIn() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      employeeId,
      merchantId,
      notes,
    }: {
      employeeId: string;
      merchantId: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.employeeCheckIn(employeeId, merchantId, notes);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["todayAttendance", vars.merchantId] });
    },
  });
}

export function useEmployeeCheckOut() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      attendanceId,
    }: {
      attendanceId: string;
      merchantId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.employeeCheckOut(attendanceId);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["todayAttendance", vars.merchantId] });
    },
  });
}

export function useGetTodayAttendance(merchantId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["todayAttendance", merchantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTodayAttendance(merchantId);
    },
    enabled: !!actor && !isFetching && !!merchantId,
  });
}

export function useApplyLeave() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      employeeId,
      merchantId,
      startDate,
      endDate,
      reason,
    }: {
      employeeId: string;
      merchantId: string;
      startDate: string;
      endDate: string;
      reason: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.applyLeave(
        employeeId,
        merchantId,
        startDate,
        endDate,
        reason,
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["pendingLeaves", vars.merchantId] });
    },
  });
}

export function useGetMerchantPendingLeaves(merchantId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pendingLeaves", merchantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMerchantPendingLeaves(merchantId);
    },
    enabled: !!actor && !isFetching && !!merchantId,
  });
}

export function useApproveLeave() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      approverNote,
    }: {
      id: string;
      approverNote: string;
      merchantId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.approveLeave(id, approverNote);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["pendingLeaves", vars.merchantId] });
    },
  });
}

export function useRejectLeave() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      approverNote,
    }: {
      id: string;
      approverNote: string;
      merchantId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rejectLeave(id, approverNote);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["pendingLeaves", vars.merchantId] });
    },
  });
}
